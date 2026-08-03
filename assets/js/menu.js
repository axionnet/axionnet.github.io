'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('[data-botao-menu]');
  const menu = document.querySelector('[data-menu-links]');
  if (!botao || !menu) return;

  const fecharMenu = () => {
    botao.classList.remove('ativo');
    botao.setAttribute('aria-expanded', 'false');
    menu.classList.remove('aberto');
    document.body.classList.remove('menu-aberto');
  };

  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botao.classList.toggle('ativo', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    document.body.classList.toggle('menu-aberto', aberto);
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) fecharMenu();
  });
});
