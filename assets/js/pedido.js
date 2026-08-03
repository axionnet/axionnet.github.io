'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('#formulario-pedido');
  const app = window.AxionNetwork;
  if (!formulario || !app) return;

  const campos = {
    nome: document.querySelector('#nome'),
    telefone: document.querySelector('#telefone'),
    servico: document.querySelector('#servico'),
    detalhes: document.querySelector('#detalhes')
  };

  const modal = document.querySelector('#modal-revisao');
  const botaoVoltar = document.querySelector('#voltar-formulario');
  const botaoWhatsApp = document.querySelector('#enviar-whatsapp');
  const servicoResumo = document.querySelector('[data-servico-escolhido]');
  let pedidoAtual = null;

  const parametros = new URLSearchParams(window.location.search);
  const servicoDaUrl = parametros.get('servico');
  const clienteSalvo = app.lerJSON(app.storageKeys.cliente, {});
  const pedidoSalvo = app.lerJSON(app.storageKeys.pedido, {});

  campos.nome.value = clienteSalvo.nome || '';
  campos.telefone.value = clienteSalvo.telefone || '';
  campos.servico.value = servicoDaUrl || pedidoSalvo.servico || '';
  campos.detalhes.value = pedidoSalvo.detalhes || '';

  const atualizarResumoServico = () => {
    servicoResumo.textContent = campos.servico.value || 'Nenhum serviço selecionado';
  };

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  };

  const fecharModal = () => {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    campos.nome.focus();
  };

  atualizarResumoServico();
  campos.servico.addEventListener('change', atualizarResumoServico);
  campos.telefone.addEventListener('input', () => {
    campos.telefone.value = formatarTelefone(campos.telefone.value);
  });

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;

    pedidoAtual = {
      nome: campos.nome.value.trim(),
      telefone: campos.telefone.value.trim(),
      servico: campos.servico.value,
      detalhes: campos.detalhes.value.trim()
    };

    app.salvarJSON(app.storageKeys.cliente, {
      nome: pedidoAtual.nome,
      telefone: pedidoAtual.telefone
    });
    app.salvarJSON(app.storageKeys.pedido, {
      servico: pedidoAtual.servico,
      detalhes: pedidoAtual.detalhes
    });

    document.querySelector('[data-revisao-servico]').textContent = pedidoAtual.servico;
    document.querySelector('[data-revisao-nome]').textContent = pedidoAtual.nome;
    document.querySelector('[data-revisao-telefone]').textContent = pedidoAtual.telefone;
    document.querySelector('[data-revisao-detalhes]').textContent = pedidoAtual.detalhes || 'Não informado';

    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    botaoWhatsApp.focus();
  });

  botaoVoltar.addEventListener('click', fecharModal);

  botaoWhatsApp.addEventListener('click', () => {
    if (!pedidoAtual) return;

    const mensagem = [
      'Olá, AxionNetwork! Gostaria de solicitar um orçamento.',
      '',
      `Serviço desejado: ${pedidoAtual.servico}`,
      `Nome do cliente: ${pedidoAtual.nome}`,
      `Telefone para contato: ${pedidoAtual.telefone}`,
      `Detalhes do pedido: ${pedidoAtual.detalhes || 'Não informado'}`
    ].join('\n');

    // Redirecionamento na mesma aba: mais confiável em celulares e não é bloqueado como pop-up.
    window.location.assign(app.criarLinkWhatsApp(mensagem));
  });

  modal.addEventListener('click', (evento) => {
    if (evento.target === modal) fecharModal();
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modal.classList.contains('aberto')) fecharModal();
  });
});
