// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio canónico — usado por @astrojs/sitemap y URLs absolutas.
  // Si cambia el dominio, actualizar también SITE.url en src/data/site.ts.
  site: 'https://fertomart.cl',

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CL',
        },
      },
    }),
  ],

  // Prefetch automático en hover/visible para que la nav se sienta instantánea.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  // Tailwind v4 se integra como plugin de Vite (sin tailwind.config.js).
  // Toda la configuración va dentro de src/styles/global.css con @theme.
  vite: {
    plugins: [tailwindcss()],
  },

  // SEO + accesibilidad: scoped styles van con hash, pero usamos `data-astro-cid-`.
  // Compresión de HTML por defecto.
  compressHTML: true,

  // No usamos View Transitions globales (puede activarse después si interesa).
});
