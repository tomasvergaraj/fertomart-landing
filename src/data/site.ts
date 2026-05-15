/**
 * Configuración global del sitio.
 * Centraliza datos que se repiten en muchos lugares (teléfono, RRSS, contacto)
 * para que un cambio se aplique a todo el sitio.
 */

export const SITE = {
  name: 'Fertomart',
  legalName: 'Servicios Gastronómicos y Eventos Fertomart SpA',
  url: 'https://fertomart.cl',
  description:
    'Servicios gastronómicos y banquetería Fertomart SpA. 25 años organizando matrimonios, cumpleaños y eventos corporativos. Especialistas en carnes.',
  shortDescription:
    'Especialistas en carnes y eventos a medida. Organizamos tu celebración de inicio a fin.',
  tagline: 'Eventos gastronómicos · Banquetería · Chile',
  foundingYear: '2000',
  locale: 'es-CL',
  themeColor: '#0F0E0C',
  rut: '76.XXX.XXX-X',
  schedule: 'Lun a Sáb · 9:00 – 20:00',
} as const;

export const CONTACT = {
  phone: '+56948593909',
  phoneDisplay: '+56 9 4859 3909',
  email: 'yayovergara71@gmail.com',
  whatsappNumber: '56948593909',
  whatsappDefaultText:
    'Hola, me gustaría cotizar un evento con Fertomart',
  whatsappUrl(text?: string) {
    const message = encodeURIComponent(text ?? this.whatsappDefaultText);
    return `https://wa.me/${this.whatsappNumber}?text=${message}`;
  },
} as const;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/eduardovergara2717/',
  facebook: 'https://www.facebook.com/yayo.vergara',
} as const;

export const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios', spy: 'servicios' },
  { href: '#nosotros', label: 'Nosotros', spy: 'nosotros' },
  { href: '#galeria', label: 'Galería', spy: 'galeria' },
  { href: '#proceso', label: 'Proceso', spy: 'proceso' },
  { href: '#faq', label: 'FAQ', spy: 'faq' },
] as const;
