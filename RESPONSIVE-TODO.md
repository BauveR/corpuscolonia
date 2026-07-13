# Responsividad — pendientes

Auditoría de responsividad del sitio (mobile / tablet / desktop / ultra-wide) realizada el 2026-07-13 en la rama `new-event`.

Ya resuelto en esta rama (commit "touch targets" — ver historial): botones de `DocumentosDetailPage.tsx` (cerrar/prev/next), flechas del carrusel en `DocumentosCarousel.tsx`, y el drawer móvil (`h-screen` → `h-[100dvh]`) en `NavBarSections.tsx`.

Queda pendiente lo siguiente:

## Gaps de breakpoints

- **`ThreeDPage.tsx`** — el modo landscape solo se ajusta desde `md:landscape:` (≥768px). Teléfonos reales en landscape (ancho lógico <768px, ej. iPhone en horizontal) no matchean esa regla y caen en las clases de portrait (`h-[40vh]`, `pt-20`) dentro de un viewport muy bajo → contenido probablemente aplastado o con scroll forzado. Falta una variante para teléfono en landscape, no solo tablet.
- **`ThreeDPage.tsx:20-32`** (`MANDIBULA_BREAKPOINTS` / `CRANEO_BREAKPOINTS`) — el breakpoint más chico definido es `768`. `resolveConfig` clampa cualquier ancho menor a ese valor, así que un teléfono de 375-430px usa el mismo zoom/FOV de cámara que una tablet de 768px, pero dentro de un contenedor mucho más angosto → los modelos 3D probablemente se ven muy chicos o descentrados en teléfono real. Falta un breakpoint explícito para mobile (ej. 375-430px) en ambos arrays.

## Buenas prácticas de industria faltantes

- **Sin `safe-area-inset-*` en todo el proyecto.** El header fijo (`top-0`) y el drawer (`left-0 top-0`) no reservan espacio para notch/Dynamic Island ni home-indicator. Relevante sobre todo en landscape de iPhone 14/15 Pro, donde el notch queda al costado y puede tapar contenido del header.
- **16 de 18 cards de `projects.ts` sin optimizar.** Imágenes locales de hasta 4MB servidas completas vía `<img src>` sin redimensionar, incluso en mobile/3G (ej. `pantallas-03.png` 4MB, `pantallas-02.png` 1.8MB, `desktop.png` 2.3MB). Solo las 2 cards de Cloudinary (incluida la del seminario "Cuerpos, Trabajo y Modos de Vida") usan `f_auto,q_auto,w_600`. Ideal: subir el resto a Cloudinary con la misma transformación, o generar variantes locales con `srcset`.
- **Hover-swap sin equivalente táctil** en `DocumentosCard.tsx` (`secondaryImage` + `whileHover`). No rompe nada hoy porque ninguna card usa `secondaryImage` actualmente, pero en cuanto se agregue una imagen secundaria, en touch (mobile/tablet) no habrá forma de activarla — tap/click no dispara `whileHover`. Necesita un `onClick`/`onTouchStart` alternativo o un toggle de estado para touch.
