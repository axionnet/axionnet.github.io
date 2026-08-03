'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const ponto = document.createElement('div');
  const anel = document.createElement('div');
  ponto.className = 'cursor-ponto';
  anel.className = 'cursor-anel';
  document.body.append(ponto, anel);

  let mouseX = 0;
  let mouseY = 0;
  let anelX = 0;
  let anelY = 0;

  window.addEventListener('mousemove', (evento) => {
    mouseX = evento.clientX;
    mouseY = evento.clientY;
    ponto.style.left = `${mouseX}px`;
    ponto.style.top = `${mouseY}px`;
  });

  const animar = () => {
    anelX += (mouseX - anelX) * 0.16;
    anelY += (mouseY - anelY) * 0.16;
    anel.style.left = `${anelX}px`;
    anel.style.top = `${anelY}px`;
    requestAnimationFrame(animar);
  };
  animar();

  document.querySelectorAll('a, button, input, select, textarea').forEach((elemento) => {
    elemento.addEventListener('mouseenter', () => anel.classList.add('ativo'));
    elemento.addEventListener('mouseleave', () => anel.classList.remove('ativo'));
  });
});
