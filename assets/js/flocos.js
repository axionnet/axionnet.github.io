'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const area = document.querySelector('[data-flocos]');
  if (!area || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const quantidade = window.innerWidth < 640 ? 6 : 12;
  const fragmento = document.createDocumentFragment();

  for (let indice = 0; indice < quantidade; indice += 1) {
    const particula = document.createElement('span');
    const tamanho = 3 + Math.random() * 4;
    particula.className = 'particula-roxa';
    particula.style.setProperty('--posicao-x', `${Math.random() * 100}vw`);
    particula.style.setProperty('--desvio-x', `${-40 + Math.random() * 80}px`);
    particula.style.setProperty('--tamanho', `${tamanho}px`);
    particula.style.setProperty('--duracao', `${18 + Math.random() * 14}s`);
    particula.style.setProperty('--atraso', `${Math.random() * -24}s`);
    particula.style.setProperty('--opacidade', `${0.12 + Math.random() * 0.24}`);
    fragmento.appendChild(particula);
  }

  area.appendChild(fragmento);

  document.addEventListener('visibilitychange', () => {
    area.style.animationPlayState = document.hidden ? 'paused' : 'running';
    area.querySelectorAll('.particula-roxa').forEach((particula) => {
      particula.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
  });
});
