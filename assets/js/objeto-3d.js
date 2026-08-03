'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const area = document.querySelector('[data-objeto-3d]');
  const corpo = document.querySelector('[data-corpo-3d]');
  if (!area || !corpo) return;

  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rotacaoX = -12;
  let rotacaoY = 24;
  let arrastando = false;
  let ultimoX = 0;
  let ultimoY = 0;

  const limitar = (valor, minimo, maximo) => Math.min(maximo, Math.max(minimo, valor));
  const aplicar = () => {
    corpo.style.setProperty('--rotacao-x', `${rotacaoX}deg`);
    corpo.style.setProperty('--rotacao-y', `${rotacaoY}deg`);
  };

  area.addEventListener('pointermove', (evento) => {
    if (evento.pointerType === 'touch' && !arrastando) return;

    if (arrastando) {
      rotacaoY += (evento.clientX - ultimoX) * 0.55;
      rotacaoX -= (evento.clientY - ultimoY) * 0.55;
      rotacaoX = limitar(rotacaoX, -65, 65);
      ultimoX = evento.clientX;
      ultimoY = evento.clientY;
    } else if (!reduzirMovimento) {
      const caixa = area.getBoundingClientRect();
      const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
      const y = (evento.clientY - caixa.top) / caixa.height - 0.5;
      rotacaoY = x * 54;
      rotacaoX = -y * 38;
    }
    aplicar();
  }, { passive: true });

  area.addEventListener('pointerdown', (evento) => {
    arrastando = true;
    ultimoX = evento.clientX;
    ultimoY = evento.clientY;
    area.classList.add('arrastando');
    area.setPointerCapture?.(evento.pointerId);
  });

  const finalizarArrasto = (evento) => {
    arrastando = false;
    area.classList.remove('arrastando');
    if (area.hasPointerCapture?.(evento.pointerId)) area.releasePointerCapture(evento.pointerId);
  };

  area.addEventListener('pointerup', finalizarArrasto);
  area.addEventListener('pointercancel', finalizarArrasto);

  area.addEventListener('pointerleave', () => {
    if (arrastando || reduzirMovimento) return;
    rotacaoX = -12;
    rotacaoY = 24;
    aplicar();
  });

  area.addEventListener('keydown', (evento) => {
    const passos = { ArrowLeft: -8, ArrowRight: 8, ArrowUp: -8, ArrowDown: 8 };
    if (!(evento.key in passos)) return;
    evento.preventDefault();
    if (evento.key === 'ArrowLeft' || evento.key === 'ArrowRight') rotacaoY += passos[evento.key];
    else rotacaoX += passos[evento.key];
    rotacaoX = limitar(rotacaoX, -65, 65);
    aplicar();
  });

  aplicar();
});
