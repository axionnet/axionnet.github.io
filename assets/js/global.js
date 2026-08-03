'use strict';

window.AxionNetwork = {
  whatsapp: '5567991705278',
  storageKeys: {
    cliente: 'axionnetwork_cliente',
    pedido: 'axionnetwork_pedido',
    atendimentoCliente: 'axionnetwork_atendimento_cliente'
  },

  salvarJSON(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      console.warn('Não foi possível salvar os dados localmente.', erro);
    }
  },

  lerJSON(chave, valorPadrao = null) {
    try {
      const valor = localStorage.getItem(chave);
      return valor ? JSON.parse(valor) : valorPadrao;
    } catch (erro) {
      console.warn('Não foi possível ler os dados locais.', erro);
      return valorPadrao;
    }
  },

  criarLinkWhatsApp(mensagem) {
    return `https://wa.me/${this.whatsapp}?text=${encodeURIComponent(mensagem)}`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const ano = document.querySelector('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();

  const cabecalho = document.querySelector('.cabecalho-site');
  const atualizarCabecalho = () => cabecalho?.classList.toggle('rolado', window.scrollY > 12);
  atualizarCabecalho();
  window.addEventListener('scroll', atualizarCabecalho, { passive: true });
});
