/**
 * Helpers para generar JSON-LD (Schema.org) a partir de los datos del sitio.
 * Mantener todo el SEO estructurado en un solo lugar evita inconsistencias.
 */
import { SITE, CONTACT, SOCIAL, GOOGLE } from '~/data/site';
import type { CollectionEntry } from 'astro:content';

/**
 * Coordenadas y dirección física de Fertomart.
 * Si cambia la dirección, actualizar también:
 *  - <meta name="ICBM"> y geo.position en SEO.astro
 *  - Google Business Profile
 */
const BUSINESS_LOCATION = {
  streetAddress: 'Manuel Rodríguez 6666',
  addressLocality: 'Hijuelas',
  addressRegion: 'Región de Valparaíso',
  addressCountry: 'CL',
  latitude: -32.835766,
  longitude: -71.112385,
} as const;

export function localBusinessSchema() {
  // Sólo agregamos aggregateRating si hay reseñas reales. Google penaliza
  // ratings inventados o sin reviews que los respalden.
  const rating = GOOGLE.aggregateRating;
  const aggregateRating =
    rating.count > 0 && rating.value > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating.value,
            reviewCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {};

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FoodEstablishment', 'CateringService'],
    '@id': `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description:
      'Servicios gastronómicos y banquetería para eventos. Especialistas en carnes y cordero al palo con 25 años de experiencia en la Región de Valparaíso.',
    url: `${SITE.url}/`,
    logo: `${SITE.url}/logo-mark.svg`,
    image: [
      `${SITE.url}/og-image.jpg`,
    ],
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: '$$',
    currenciesAccepted: 'CLP',
    paymentAccepted: 'Efectivo, Transferencia bancaria',
    servesCuisine: ['Carnes', 'Parrilla', 'Cordero al palo', 'Cocina Chilena'],
    foundingDate: SITE.foundingYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_LOCATION.streetAddress,
      addressLocality: BUSINESS_LOCATION.addressLocality,
      addressRegion: BUSINESS_LOCATION.addressRegion,
      addressCountry: BUSINESS_LOCATION.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_LOCATION.latitude,
      longitude: BUSINESS_LOCATION.longitude,
    },
    // Zona donde Fertomart presta servicio (no sólo donde está ubicado).
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Región de Valparaíso',
        '@id': 'https://www.wikidata.org/wiki/Q2073',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
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
      { '@type': 'Offer', name: 'Cumpleaños y celebraciones familiares' },
      { '@type': 'Offer', name: 'Parrilla en vivo y asados para eventos' },
      { '@type': 'Offer', name: 'Cordero al palo a domicilio' },
      { '@type': 'Offer', name: 'Coctelería y catering corporativo' },
    ],
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    ...aggregateRating,
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

/**
 * Schema para los reels en video. Permite que aparezcan como rich results
 * en Google Search y Google Videos.
 */
interface ReelInput {
  src: string; // path absoluto al .mp4 (relativo al sitio o URL completa)
  title: string;
  description?: string;
}

export function videoSchemasFromReels(reels: ReelInput[]) {
  const uploadDate = new Date().toISOString().split('T')[0];
  return reels.map((reel) => {
    const contentUrl = reel.src.startsWith('http') ? reel.src : `${SITE.url}${reel.src}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: `${reel.title} — ${SITE.name}`,
      description:
        reel.description ??
        `${reel.title}: momento real de un evento producido por ${SITE.name}, especialistas en banquetería en la Región de Valparaíso.`,
      thumbnailUrl: `${SITE.url}/og-image.jpg`,
      contentUrl,
      uploadDate,
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.url}/logo-mark.svg`,
        },
      },
    };
  });
}
