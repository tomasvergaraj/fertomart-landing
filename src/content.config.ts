import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Content Collections — toda la "data" de la landing vive acá, tipada con Zod.
 * Editar contenido = editar un .json (no tocar componentes).
 *
 * Usamos el `file` loader: cada archivo es un array de entries.
 * Si en el futuro alguna collection crece mucho (ej: blog), conviene migrar
 * a `glob()` con un archivo por entry.
 */

const pillars = defineCollection({
  loader: file('src/content/pillars.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    text: z.string(),
  }),
});

const services = defineCollection({
  loader: file('src/content/services.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    text: z.string(),
  }),
});

const events = defineCollection({
  loader: file('src/content/events.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    icon: z.string(),
    title: z.string(),
    text: z.string(),
  }),
});

const gallery = defineCollection({
  loader: file('src/content/gallery.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    image: z.string(), // path bajo src/assets/events/
    alt: z.string(),
    caption: z.string(),
    featured: z.boolean().optional().default(false),
  }),
});

const processSteps = defineCollection({
  loader: file('src/content/process.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    text: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: file('src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    quote: z.string(),
    author: z.string(),
    context: z.string(),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    question: z.string(),
    answer: z.string(),
  }),
});

export const collections = {
  pillars,
  services,
  events,
  gallery,
  process: processSteps,
  testimonials,
  faq,
};
