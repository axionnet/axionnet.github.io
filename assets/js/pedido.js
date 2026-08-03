'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('#formulario-pedido');
  if (!formulario || !window.AxionNetwork) return;

  const campos = {
    nome: document.querySelector('#nome'),
    telefone: document.querySelector('#telefone'),
    servico: document.querySelector('#servico'),
    detalhes: document.querySelector('#detalhes')
  };

  const modal = document.querySelector('#modal-revisao');
  const botaoInicio = document.querySelector('#voltar-inicio');
  const botaoWhatsApp = document.querySelector('#enviar-whatsapp');
  const servicoResumo = document.querySelector('[data-servico-escolhido]');

  const parametros = new URLSearchParams(window.location.search);
  const servicoDaUrl = parametros.get('servico');
  const clienteSalvo = AxionNetwork.lerJSON(AxionNetwork.storageKeys.cliente, {});
  const pedidoSalvo = AxionNetwork.lerJSON(AxionNetwork.storageKeys.pedido, {});

  campos.nome.value = clienteSalvo.nome || '';
  campos.telefone.value = clienteSalvo.telefone || '';
  campos.servico.value = servicoDaUrl || pedidoSalvo.servico || '';
  campos.detalhes.value = pedidoSalvo.detalhes || '';

  const atualizarResumoServico = () => {
    servicoResumo.textContent = campos.servico.value || 'Nenhum serviço selecionado';
  };
  atualizarResumoServico();
  campos.servico.addEventListener('change', atualizarResumoServico);

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  };

  campos.telefone.addEventListener('input', () => {
    campos.telefone.value = formatarTelefone(campos.telefone.value);
  });

  const fecharModal = () => {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
  };

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;

    const cliente = {
      nome: campos.nome.value.trim(),
      telefone: campos.telefone.value.trim()
    };

    const pedido = {
      servico: campos.servico.value,
      detalhes: campos.detalhes.value.trim()
    };

    AxionNetwork.salvarJSON(AxionNetwork.storageKeys.cliente, cliente);
    AxionNetwork.salvarJSON(AxionNetwork.storageKeys.pedido, pedido);

    document.querySelector('[data-revisao-servico]').textContent = pedido.servico;
    document.querySelector('[data-revisao-nome]').textContent = cliente.nome;
    document.querySelector('[data-revisao-telefone]').textContent = cliente.telefone;
    document.querySelector('[data-revisao-detalhes]').textContent = pedido.detalhes || 'Não informado';

    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
  });

  botaoInicio.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  botaoWhatsApp.addEventListener('click', () => {
    const cliente = AxionNetwork.lerJSON(AxionNetwork.storageKeys.cliente, {});
    const pedido = AxionNetwork.lerJSON(AxionNetwork.storageKeys.pedido, {});

    const mensagem = [
      'Olá, AxionNetwork! Gostaria de pedir um orçamento.',
      '',
      `Serviço desejado: ${pedido.servico || 'Não informado'}`,
      `Nome do cliente: ${cliente.nome || 'Não informado'}`,
      `Telefone: ${cliente.telefone || 'Não informado'}`,
      `Detalhes: ${pedido.detalhes || 'Não informado'}`
    ].join('\n');

    const link = `https://wa.me/${AxionNetwork.whatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank', 'noopener,noreferrer');
  });

  modal.addEventListener('click', (evento) => {
    if (evento.target === modal) fecharModal();
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modal.classList.contains('aberto')) fecharModal();
  });
});
