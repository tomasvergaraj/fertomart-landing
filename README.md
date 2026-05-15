<p align="center">
  <img src="src/assets/logo.svg" alt="Fertomart" width="320" />
</p>

# Fertomart Landing · Astro + Tailwind

Migración del sitio estático original a [Astro 5](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), manteniendo el diseño editorial y mejorando la mantenibilidad.

---

## Empezar

```bash
npm install
npm run dev      # desarrollo en http://localhost:4321
npm run build    # build estático en dist/
npm run preview  # sirve el build localmente
```

Requiere Node 20+ (recomendado Node 22 LTS).

---

## Decisiones de arquitectura

### Por qué Astro

- HTML estático por defecto → carga rápida y buen SEO sin esfuerzo extra.
- Mismo proyecto puede crecer a blog, CMS u otras páginas sin refactor.
- Cero JavaScript en cliente para todo lo que no es interactivo (la mayoría del sitio).

### Por qué Tailwind v4

- Configuración 100% en CSS (`@theme` dentro de `global.css`) — sin `tailwind.config.js`.
- Los tokens del proyecto se exponen como utilidades sin duplicarlos.
- Se integra como plugin de Vite, sin paso de compilación separado.

### "Islas" + JS vanilla

Hay scripts (drawer móvil, lightbox, formulario, scroll-spy, FAB), pero **ninguno requiere React**. Cada uno vive como `<script>` dentro del componente Astro al que pertenece, en TypeScript. Es la recomendación oficial de Astro para interactividad simple.

### Diseño tokenizado

Toda la paleta, tipografías y curvas viven como variables CSS en `src/styles/global.css` y se exponen a Tailwind con `@theme`. Cambiar `--color-wine` en un solo lugar repinta el sitio entero. Permite tema oscuro/claro a futuro sin tocar markup.

### Content Collections para el contenido

Servicios, eventos, FAQ, testimonios, etc. viven en `src/content/*.json` validados con Zod. Para editar el texto del sitio, **no se toca código** — solo el JSON correspondiente.

---

## Estructura

```
fertomart-astro/
├── astro.config.mjs        # config: site, sitemap, prefetch, Tailwind
├── tsconfig.json           # alias ~/* → src/*
├── public/                 # archivos servidos tal cual (favicon, robots, manifest)
│
├── src/
│   ├── assets/             # imágenes optimizadas por Astro (<Image />)
│   │   ├── events/         # galería
│   │   ├── team/           # foto chef (reemplazar placeholder por la real)
│   │   └── *.svg           # logos, favicon
│   │
│   ├── components/
│   │   ├── SEO.astro       # <head> tags + JSON-LD
│   │   ├── ui/             # ATÓMICOS reutilizables
│   │   │   ├── Button.astro
│   │   │   ├── Icon.astro
│   │   │   └── SectionHead.astro
│   │   └── sections/       # COMPUESTOS de página
│   │       ├── Nav.astro
│   │       ├── Hero.astro
│   │       ├── Pillars.astro
│   │       ├── Services.astro
│   │       ├── About.astro
│   │       ├── Specialty.astro
│   │       ├── Events.astro
│   │       ├── Gallery.astro
│   │       ├── Process.astro
│   │       ├── Testimonials.astro
│   │       ├── Faq.astro
│   │       ├── Cta.astro
│   │       ├── Lightbox.astro
│   │       ├── WhatsAppFab.astro
│   │       └── Footer.astro
│   │
│   ├── content/            # CONTENIDO editable (no es código)
│   │   ├── pillars.json
│   │   ├── services.json
│   │   ├── events.json
│   │   ├── gallery.json
│   │   ├── process.json
│   │   ├── testimonials.json
│   │   └── faq.json
│   │
│   ├── content.config.ts   # schemas Zod de cada collection
│   │
│   ├── data/
│   │   └── site.ts         # config global: teléfono, redes, RUT, links
│   │
│   ├── lib/
│   │   └── seo.ts          # generadores de JSON-LD
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro  # <html> + <head> + SEO
│   │
│   ├── pages/
│   │   └── index.astro     # composición de secciones
│   │
│   ├── scripts/
│   │   └── scroll-reveal.ts  # animaciones de entrada globales
│   │
│   └── styles/
│       └── global.css      # tokens + reset + componentes base (btn, eyebrow, etc.)
```

---

## Tareas frecuentes

### Cambiar el teléfono / email / redes

Un solo lugar: `src/data/site.ts`. Se propaga a la nav, hero, CTA, footer, schema.org y formulario.

### Agregar un servicio o un FAQ

Editar el JSON correspondiente en `src/content/`. Por ejemplo, un nuevo FAQ:

```json
{
  "id": "estacionamientos",
  "order": 9,
  "question": "¿Necesitan estacionamiento?",
  "answer": "Solicitamos un espacio para nuestro vehículo de carga..."
}
```

El schema FAQ de Google se regenera automáticamente desde la misma collection (`src/lib/seo.ts`).

### Reemplazar imágenes de la galería

1. Subir el JPG/PNG real a `src/assets/events/`. Recomendado 1200×900 (4:3).
2. Editar `src/content/gallery.json` y apuntar `image` al nuevo archivo.
3. Listo — Astro genera WebP/AVIF y tamaños responsive en el build.

> **Importante:** las imágenes deben estar en `src/assets/` (no en `public/`) para que las optimice Astro.

### Reemplazar la foto del chef

1. Subir `chef.jpg` a `src/assets/team/`.
2. En `src/components/sections/About.astro` cambiar:
   ```ts
   import chefPhoto from '~/assets/team/chef-placeholder.svg';
   ```
   por:
   ```ts
   import chefPhoto from '~/assets/team/chef.jpg';
   ```
3. Mantener ratio 4:5 (ej: 600×750).

### Cambiar colores o tipografía

`src/styles/global.css`. Los tokens están al inicio del archivo bajo `:root` y `@theme`. Cambiar uno solo y el sitio entero se actualiza.

### Cambiar el dominio definitivo

`astro.config.mjs` → `site: 'https://tu-dominio.cl'`. Es necesario para sitemap, URLs canónicas y Open Graph.

---

## Performance & SEO

- **Imágenes:** Astro genera WebP/AVIF responsive automáticamente. Solo se sirve `<img>` real para SVG.
- **Fuentes:** Fraunces y Manrope desde `@fontsource-variable` (self-hosted). Sin round-trip a Google Fonts.
- **JS:** Solo se carga lo necesario por sección. Cada `<script>` de un `.astro` se bundles aparte.
- **CSS:** Scoped por componente; lo común vive en `global.css`.
- **Sitemap:** Generado automáticamente por `@astrojs/sitemap` durante el build.
- **Schema.org:** `LocalBusiness` + `FAQPage` generados desde las collections en `src/lib/seo.ts`.
- **Prefetch:** Activado en hover (config en `astro.config.mjs`).

### Auditar después de cada cambio fuerte

```bash
npm run build
npm run preview
# Abrir DevTools → Lighthouse y correr una auditoría
```

Esperar:

- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices = 100
- SEO = 100

---

## Pendientes para producción

- [ ] Reemplazar `chef-placeholder.svg` por la foto real (`src/assets/team/chef.jpg`).
- [ ] Reemplazar los 6 SVG de `src/assets/events/` por fotos reales.
- [ ] Exportar `og-image.svg` a JPG 1200×630 y subirlo como `public/og-image.jpg`, actualizar `src/components/SEO.astro` (cambiar la URL del fallback).
- [ ] Completar RUT real en `src/data/site.ts`.
- [ ] Verificar que `site` en `astro.config.mjs` apunte al dominio definitivo.
- [ ] Configurar deploy en Vercel / Netlify / Cloudflare Pages.

---

## Deploy

Cualquier hosting estático funciona, sin servidor.

**Vercel/Netlify:** conectar el repo, framework "Astro", build `npm run build`, output `dist/`.

**Cloudflare Pages:** mismo build, mismo output. Es probablemente la opción más rápida y barata para una landing estática.
