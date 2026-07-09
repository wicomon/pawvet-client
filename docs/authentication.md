# Arquitectura de autenticación

Guía de referencia del flujo de login/sesión de `pawvet-client` y receta para
proteger rutas nuevas. Basado en el patrón oficial de Next.js documentado en
`node_modules/next/dist/docs/01-app/02-guides/authentication.md`.

## TL;DR

**La "sesión" ES la cookie.** No hay estado guardado en el servidor ni un
segundo sistema de sesiones: la cookie `session` contiene directamente el JWT
que emite `pawvet-server`. Lo que existe alrededor de esa cookie no es un
reemplazo, es una **arquitectura de capas** (Proxy + DAL) para que el manejo
del token esté centralizado en un solo lugar en vez de repetido en cada
página. Si vas a proteger una ruta nueva, ve directo a la
[receta](#cómo-proteger-una-ruta-nueva).

## Anatomía de la sesión

`src/lib/session.ts` define y maneja la cookie `session`:

```ts
const SESSION_COOKIE = "session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 días

cookieStore.set(SESSION_COOKIE, token, {
  httpOnly: true,                              // no accesible desde JS del navegador
  secure: process.env.NODE_ENV === "production", // solo HTTPS en prod
  expires: expiresAt,
  sameSite: "lax",
  path: "/",
});
```

- `token` es el JWT crudo devuelto por el backend en `authLogin`. El cliente
  **no lo re-firma ni re-encripta**, solo lo almacena.
- Es una **stateless session**: toda la verdad sobre "quién es el usuario"
  vive en el backend; la cookie es solo el medio de transporte del JWT.
- `getSessionToken()` es la única forma soportada de leer el valor.

## Flujo de login paso a paso

1. `src/app/login/page.tsx` (Client Component) usa
   `useActionState(login, ...)` sobre un `<form action={login}>` — patrón de
   *progressive enhancement*, sin cliente GraphQL ni manejo de cookies en el
   navegador.
2. `login` (`src/app/actions/auth.ts`, Server Action `"use server"`):
   - Valida `email`/`password` con Yup (`LoginSchema`).
   - Hace `fetch` crudo al backend con la mutation `authLogin`
     (`src/graphql/auth.gql.ts`, impresa con `print()` de `graphql`).
   - Si responde `data.authLogin.token`, llama a `createSession(token)`.
   - `redirect("/dashboard")`.
3. Si el backend falla o las credenciales son inválidas, se retorna un
   `LoginFormState` con `message`/`errors` que el formulario renderiza.

## Las dos capas de control

Cada request a una ruta protegida pasa por **dos** chequeos distintos, con
responsabilidades deliberadamente separadas:

| Capa | Archivo | Qué verifica | ¿Llama al backend? | Cuándo corre |
|---|---|---|---|---|
| **Proxy (optimista)** | `src/proxy.ts` | Que la cookie `session` **exista** | ❌ Nunca | En *cada* request, incluidas rutas prefetcheadas por Next.js |
| **DAL (real)** | `src/lib/dal.ts` → `verifySession()` | Que el JWT sea **válido** (`authValidateToken`) | ✅ Sí, vía `isLogged()` | En el render del Server Component |

```ts
// src/proxy.ts
const PROTECTED_PREFIXES = ["/dashboard"];
// ...
const token = request.cookies.get("session")?.value;
if (!token) return NextResponse.redirect(new URL("/login", request.url));
```

El proxy **nunca** debe golpear el backend: Next.js lo ejecuta también para
prefetch especulativo de enlaces, así que validar el token ahí generaría
llamadas innecesarias y constantes al backend. Por eso solo responde
"¿existe la cookie? sí/no" — es una redirección **optimista**, no la
autorización real.

```ts
// src/lib/dal.ts
export const verifySession = cache(async () => {
  const token = await getSessionToken();
  if (!token || !(await isLogged(token))) {
    redirect("/login");
  }
  return { isAuth: true, token };
});
```

`verifySession()` es la **frontera de autorización real**. Valida el JWT
contra `authValidateToken` en el backend (`src/lib/isLogged.ts`) y redirige
por su cuenta si no es válido — los llamadores pueden asumir una sesión
válida una vez que resuelve. Está envuelta en `cache()` de React, así que se
memoiza por render: si varios componentes de la misma página la llaman, el
backend solo se consulta una vez.

## Lectura de datos del usuario

`getUser()` (también en `src/lib/dal.ts`, también memoizada con `cache()`):

```ts
export const getUser = cache(async (): Promise<ContextUser | null> => {
  const { token } = await verifySession(); // reusa el token ya validado
  const res = await fetch(backendUrl, {
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify({ query: print(AUTH_USER_INFO) }),
    cache: "no-store",
  });
  // ...
});
```

Primero garantiza sesión válida vía `verifySession()`, luego pide
`authUserInfo` al backend con el token como `Bearer`. `src/app/dashboard/page.tsx`
la llama directo desde un Server Component — no hay fetching de datos
protegidos en el cliente.

## Logout

```ts
// src/app/actions/auth.ts
export async function logout() {
  await deleteSession();
  redirect("/login");
}
```

`deleteSession()` borra la cookie `session`. No hay invalidación del JWT en
el backend (es stateless); simplemente el cliente deja de tener el token.

## Diagrama del flujo

```
Request a ruta protegida
        │
        ▼
┌───────────────────┐   sin cookie   ┌──────────────┐
│  src/proxy.ts      │───────────────►│  /login      │
│  (edge, optimista) │                └──────────────┘
└───────────────────┘
        │ cookie presente
        ▼
┌───────────────────────────┐  token inválido  ┌──────────────┐
│ Server Component           │─────────────────►│  /login      │
│  → dal.ts: verifySession() │                   └──────────────┘
│  (valida JWT en backend)   │
└───────────────────────────┘
        │ token válido
        ▼
┌───────────────────────────┐
│ dal.ts: getUser()          │──► authUserInfo (backend)
│  (memoizado con cache())   │
└───────────────────────────┘
```

## Cómo proteger una ruta nueva

Sigue estos pasos cada vez que agregues una ruta que requiera sesión:

1. **Agrega el prefijo al proxy** (`src/proxy.ts`):

   ```ts
   const PROTECTED_PREFIXES = ["/dashboard", "/mi-ruta-nueva"];
   ```

2. **Verifica la sesión dentro del Server Component de la ruta**, no en el
   proxy ni en el cliente:

   ```tsx
   // src/app/mi-ruta-nueva/page.tsx
   import { verifySession, getUser } from "@/lib/dal";

   export default async function MiRutaNuevaPage() {
     await verifySession();       // redirige a /login si no es válida
     const user = await getUser(); // si necesitas datos del usuario
     // ...
   }
   ```

   Si la ruta solo necesita saber "hay sesión válida" sin datos del usuario,
   basta con `await verifySession()`.

3. **¿Necesitas un dato nuevo del usuario/backend?** Extiende el DAL
   (`src/lib/dal.ts`) con una nueva función memoizada con `cache()`, siguiendo
   el patrón de `getUser()` (reusa el `token` de `verifySession()`, hace
   `fetch` con `Authorization: Bearer`). No repitas fetch+token en el
   componente.

4. **¿Es una Server Action que muta datos?** Sigue el patrón de `login`/`logout`
   en `src/app/actions/auth.ts`: `"use server"`, validar input, `fetch` al
   backend, y si necesita saber quién es el usuario, llama a `verifySession()`
   al inicio.

### Qué NO hacer

- ❌ No leas la cookie `session` directamente con `cookies()` fuera de
  `src/lib/session.ts`. Usa `getSessionToken()` o, mejor, `verifySession()`.
- ❌ No valides el JWT tú mismo en un componente o ruta nueva; usa `isLogged()`
  indirectamente a través de `verifySession()`.
- ❌ No hagas chequeos de autenticación en Client Components ni confíes en el
  proxy como autorización real — ambos son solo UX/optimismo.
- ❌ No dupliques la lógica de `fetch` + `Authorization: Bearer` en cada ruta;
  extiende el DAL.
- ❌ No metas roles/permisos ad-hoc en cada página; si se necesita ese tipo de
  chequeo, debe vivir en el DAL para mantener un único punto de verdad.

## Referencias

- `src/proxy.ts` — chequeo optimista de cookie.
- `src/lib/session.ts` — crear/leer/borrar la cookie `session`.
- `src/lib/isLogged.ts` — validación del JWT contra `authValidateToken`.
- `src/lib/dal.ts` — `verifySession()` y `getUser()`, frontera real de autorización.
- `src/app/actions/auth.ts` — Server Actions `login` y `logout`.
- `src/app/login/page.tsx` — formulario de login (`useActionState`).
- `src/app/dashboard/page.tsx` — ejemplo de ruta protegida ya existente.
- `node_modules/next/dist/docs/01-app/02-guides/authentication.md` — doc oficial
  de Next.js sobre el patrón (Stateless Sessions, DAL, Optimistic checks con
  Proxy).
