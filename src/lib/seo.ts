/**
 * Helpers para generar JSON-LD (Schema.org) a partir de los datos del sitio.
 * Mantener todo el SEO estructurado en un solo lugar evita inconsistencias.
 */
import { SITE, CONTACT, SOCIAL } from '~/data/site';
import type { CollectionEntry } from 'astro:content';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FoodEstablishment'],
    '@id': `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description:
      'Servicios gastronómicos y banquetería para eventos. Especialistas en carnes con 25 años de experiencia en Chile.',
    url: `${SITE.url}/`,
    logo: `${SITE.url}/assets/logo-mark.svg`,
    image: `${SITE.url}/assets/og-image.jpg`,
    telephone: CONTACT.phone,
    priceRange: '$$',
    servesCuisine: ['Carnes', 'Parrilla', 'Cocina Chilena'],
    foundingDate: SITE.foundingYear,
    areaServed: {
      '@type': 'Country',
      name: 'Chile',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hijuelas',
      addressRegion: 'Valparaíso',
      addressCountry: 'CL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'ventas',
      areaServed: 'CL',
      availableLanguage: 'Spanish',
    },
    makesOffer: [
      { '@type': 'Offer', name: 'Banquetería para matrimonios' },
      { '@type': 'Offer', name: 'Eventos corporativos' },
      { '@type': 'Offer', name: 'Cumpleaños y celebraciones' },
      { '@type': 'Offer', name: 'Parrilla y asados para eventos' },
    ],
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
  };
}

export function faqSchemaFromCollection(
  faqs: CollectionEntry<'faq'>[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.data.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.data.answer,
      },
    })),
  };
}
