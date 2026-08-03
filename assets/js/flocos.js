'use strict';

/** Partículas decorativas leves, reduzidas para preservar desempenho. */
document.addEventListener('DOMContentLoaded', () => {
  const area = document.querySelector('[data-flocos]');
  if (!area || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const quantidade = window.innerWidth < 640 ? 10 : 20;
  const fragmento = document.createDocumentFragment();

  for (let indice = 0; indice < quantidade; indice += 1) {
    const particula = document.createElement('span');
    const tamanho = 3 + Math.random() * 5;
    particula.className = 'particula-roxa';
    particula.style.setProperty('--posicao-x', `${Math.random() * 100}vw`);
    particula.style.setProperty('--desvio-x', `${-45 + Math.random() * 90}px`);
    particula.style.setProperty('--tamanho', `${tamanho}px`);
    particula.style.setProperty('--duracao', `${16 + Math.random() * 14}s`);
    particula.style.setProperty('--atraso', `${Math.random() * -24}s`);
    particula.style.setProperty('--opacidade', `${0.12 + Math.random() * 0.3}`);
    fragmento.appendChild(particula);
  }

  area.appendChild(fragmento);
});
