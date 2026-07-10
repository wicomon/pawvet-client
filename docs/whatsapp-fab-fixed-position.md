# Incidente: el FAB de WhatsApp no se veía "flotante" hasta el final de la página

Registro del bug y la causa raíz, porque el mecanismo (containing block de
`position: fixed`) es sutil y puede volver a aparecer en cualquier elemento
`fixed` nuevo que se agregue a la app.

## Síntoma

El botón flotante de WhatsApp (`src/components/landing/WhatsAppFab.tsx`,
`position: fixed; bottom: 24px; right: 24px`) no aparecía en la esquina
inferior derecha al cargar la página ni durante el scroll — solo se hacía
visible al llegar hasta el final absoluto del documento.

## Causa raíz

`src/app/template.tsx` envuelve **toda página de la app** (landing,
`/login`, `/dashboard` — cualquier ruta) en un `<div>` con la animación de
entrada `rise`:

```tsx
<div className="animate-[rise_400ms_var(--ease-out-strong)_both]">
  {children}
</div>
```

El keyframe `rise` (`globals.css`) termina en `transform: translateY(0)`, y
con `animation-fill-mode: both` ese valor final queda aplicado
**permanentemente** una vez termina la animación (no vuelve a `none`).

Por spec de CSS Transforms, **cualquier valor de `transform` (o de las
propiedades `translate`/`scale`/`rotate`/`filter`/`backdrop-filter`) distinto
del literal `none`** — incluido algo tan "inofensivo" como
`translateY(0)` — convierte a ese elemento en el **containing block** de sus
descendientes `position: fixed`/`absolute`, en vez de la ventana del
navegador. Es decir: el FAB dejaba de posicionarse relativo al viewport y
pasaba a posicionarse relativo al alto total de esa `<div>` (que es del
tamaño de toda la página) — por eso solo aparecía al hacer scroll hasta el
final.

Esto no era un bug exclusivo del landing: como `template.tsx` envuelve
**todas** las rutas, cualquier elemento `fixed` en cualquier página de la
app (modales, toasts, un FAB en `/dashboard`, etc.) habría quedado atrapado
de la misma forma.

Se verificó con Chrome headless + Puppeteer (`getComputedStyle` +
`getBoundingClientRect` sobre el ancestro chain del FAB) antes y después del
fix — confirmando el `transform: matrix(1,0,0,1,0,0)` en el wrapper de
`template.tsx` como containing block, y su desaparición tras el fix.

## Fix aplicado

`template.tsx` ahora usa un keyframe nuevo, `fade-in` (solo `opacity`, sin
ninguna propiedad de transform), en vez de `rise`. Una animación
opacity-only nunca crea containing block, así que ya no puede atrapar
ningún `fixed` descendiente, sin importar qué se agregue a la app a futuro.

El keyframe `rise` (con `transform: translateY`) se dejó intacto donde ya
se usa (`Hero.tsx`, `login/page.tsx`, `(auth)/layout.tsx`, `LoginForm.tsx`)
porque esos wrappers **no contienen ningún elemento `fixed` anidado** — ahí
`translateY` es seguro.

## Qué tener presente a futuro

- **Cualquier wrapper que envuelva toda una página o layout completo
  (`template.tsx`, `layout.tsx`, un provider a nivel raíz) no debe usar
  `transform`/`translate`/`scale`/`rotate`/`filter`/`backdrop-filter` con un
  valor distinto de `none`**, porque puede atrapar silenciosamente
  cualquier `position: fixed` que exista o se agregue después en cualquier
  parte de la app.
- Si un elemento `fixed` "no aparece hasta el final del scroll" o se
  comporta como si estuviera posicionado dentro del documento en vez de la
  ventana, sospechar primero de un ancestro con transform/filter — no del
  propio `fixed`.
- Al animar un `<div>` decorativo específico (sin hijos `fixed`), `rise`
  (opacity + translateY) sigue siendo seguro de usar.
