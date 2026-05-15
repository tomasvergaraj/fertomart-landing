/**
 * Animaciones de entrada al hacer scroll.
 * Mejora progresiva: si no hay JS o el usuario prefiere movimiento reducido,
 * todo el contenido se muestra sin animación.
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  document.documentElement.classList.add('js-enabled');

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
}
