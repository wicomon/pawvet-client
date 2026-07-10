# Incidente: `next dev` colgado en "Compiling /" (CPU al 100%)

Registro del incidente y la causa raíz, para que quede presente si vuelve a
pasar algo parecido: esto llegó a congelar el equipo por completo mientras
`next dev` estaba corriendo.

## Síntoma

- `pnpm dev` se quedaba parado en `Compiling /` **indefinidamente** — no
  terminaba nunca, no soltaba la CPU.
- El proceso de Next consumía CPU al 100% de forma sostenida.
- El equipo (MacBook) llegó a congelarse por completo mientras el proceso
  seguía así.
- Ocurría con conexión a internet normal, sin VPN.

## Causa raíz

`src/app/layout.tsx` cargaba **4 familias de Google Fonts**
(`Plus_Jakarta_Sans`, `Inter`, `Sora`, `Manrope`) usando `next/font/google`,
en el **root layout** — es decir, se resuelven en toda compilación de
cualquier ruta.

`next/font/google` hace un `fetch` a `fonts.googleapis.com` /
`fonts.gstatic.com` **en tiempo de compilación**, para descargar y
self-hostear el archivo de fuente la primera vez. Ese `fetch` **no tiene
timeout**: si una de esas peticiones no resuelve (DNS lento, firewall,
proxy corporativo, hiccup puntual de red, etc.), el proceso de compilación
se queda esperando para siempre, sin fallar ni reintentar — y mientras
espera, Turbopack sigue reintentando trabajo y satura la CPU. Cargar 4
familias en vez de 1 multiplica la probabilidad de que alguna de esas
peticiones se cuelgue.

Como agravante secundario se encontró una caché `.next` de **617 MB** en
dev (tamaño anómalo), que contribuía al bloat de memoria.

Descartado como causa: Tailwind v4 respeta `.gitignore`, así que no escanea
`.next`/`node_modules`; Turbopack (bundler por defecto en Next 16) no tenía
ningún problema de configuración; los componentes del landing
(`src/components/landing/`) son server components ligeros sin librerías
pesadas.

## Fix aplicado

1. **Migrar las 4 fuentes de `next/font/google` a `next/font/local`**
   (`src/app/layout.tsx`). Los `.woff2` (variantes variable-font, subset
   latin) se descargaron una sola vez y quedaron commiteados en
   `src/assets/fonts/`. Con `next/font/local` la compilación **no hace ningún
   fetch de red** — es imposible que se cuelgue por esta causa, sin
   importar el estado de la conexión.
2. `rm -rf .next` para partir de una caché de dev limpia.
3. Se añadió `@source "../../src";` en `globals.css` tras
   `@import "tailwindcss";`, para acotar explícitamente qué directorio
   escanea Tailwind (blindaje adicional, no era la causa de este
   incidente).

Ver `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` para
la referencia oficial de `next/font/local` vs `next/font/google`.

## Qué tener presente a futuro

- **No volver a usar `next/font/google` en este proyecto** salvo que se
  entienda y acepte el riesgo del `fetch` sin timeout en build/dev. Preferir
  siempre `next/font/local` con el archivo commiteado en el repo.
- Si se agrega una fuente nueva: bajar el `.woff2` (variable font si existe,
  para no tener que declarar un archivo por peso) y agregarlo en
  `src/assets/fonts/`, siguiendo el mismo patrón que las 4 fuentes actuales.
- Si `next dev`/`next build` se queda colgado en "Compiling" sin avanzar y
  sube la CPU sin límite, sospechar primero de cualquier loader que haga
  fetch de red en build (fuentes de Google, imágenes remotas, etc.) antes de
  asumir que es un problema de Turbopack o del código de la app.

## Actualización: consolidación a una sola fuente

Además del fix de self-hosting, el proyecto se simplificó para usar
**una sola familia tipográfica en toda la app**: **Plus Jakarta Sans**
(variable, pesos 200–800), tanto en el landing como en el dashboard. Las
otras 3 fuentes (Inter, Sora, Manrope) se eliminaron por completo —
`src/app/layout.tsx` ya no las declara y sus `.woff2` se borraron de
`src/assets/fonts/`.

En `src/app/globals.css`, los cuatro tokens semánticos
(`--font-display`, `--font-sans`, `--font-heading`, `--font-body`) apuntan
ahora a la misma variable (`--font-jakarta`), así que ningún componente tuvo
que cambiar sus clases (`font-display`, `font-sans`, `font-heading`,
`font-body` siguen funcionando igual, solo que todos resuelven a Jakarta).
