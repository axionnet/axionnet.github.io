'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.revelar');
  if (!elementos.length) return;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  elementos.forEach((elemento) => observador.observe(elemento));
});
