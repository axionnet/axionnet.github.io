'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const app = window.AxionNetwork;
  const config = window.AXION_SUPABASE || {};
  const formulario = document.querySelector('#formulario-avaliacao');
  const lista = document.querySelector('[data-lista-avaliacoes]');

  if (!app || !formulario || !lista) return;

  const chaveLocal = 'axionnetwork_avaliacoes_demo';
  const modoOnline = Boolean(config.url && config.anonKey);
  let fotoProcessada = null;
  let avaliacoes = [];

  const elementos = {
    modal: document.querySelector('[data-modal-avaliacao]'),
    nome: document.querySelector('#avaliacao-nome'),
    servico: document.querySelector('#avaliacao-servico'),
    texto: document.querySelector('#avaliacao-texto'),
    foto: document.querySelector('#avaliacao-foto'),
    consentimento: document.querySelector('#avaliacao-consentimento'),
    contador: document.querySelector('[data-contador-avaliacao]'),
    preview: document.querySelector('[data-preview-foto]'),
    previewImagem: document.querySelector('[data-preview-imagem]'),
    filtro: document.querySelector('[data-filtro-servico]'),
    vazio: document.querySelector('[data-estado-vazio]'),
    media: document.querySelector('[data-media-avaliacoes]'),
    total: document.querySelector('[data-total-avaliacoes]'),
    enviar: document.querySelector('[data-enviar-avaliacao]')
  };

  const avaliacoesIniciais = [
    {
      id: 'demo-1',
      nome: 'Mariana S.',
      servico: 'Criação de Sites',
      nota: 5,
      texto: 'Atendimento muito organizado e o site ficou leve, bonito e fácil de usar no celular.',
      foto_url: '',
      created_at: '2026-07-26T14:00:00.000Z'
    },
    {
      id: 'demo-2',
      nome: 'Carlos R.',
      servico: 'Redes e Wi-Fi',
      nota: 5,
      texto: 'O sinal melhorou bastante e todos os cabos ficaram bem organizados.',
      foto_url: '',
      created_at: '2026-07-20T17:30:00.000Z'
    },
    {
      id: 'demo-3',
      nome: 'Ana P.',
      servico: 'Manutenção de Computadores',
      nota: 4,
      texto: 'Meu computador voltou mais rápido e recebi explicações claras sobre o serviço.',
      foto_url: '',
      created_at: '2026-07-14T10:15:00.000Z'
    }
  ];

  const apiHeaders = (extra = {}) => ({
    apikey: config.anonKey,
    Authorization: `Bearer ${config.anonKey}`,
    ...extra
  });

  const escaparHTML = (valor = '') => valor
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const formatarData = (data) => new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).format(new Date(data));

  const criarEstrelas = (nota) => `${'★'.repeat(nota)}${'☆'.repeat(5 - nota)}`;

  const renderizar = () => {
    const filtro = elementos.filtro.value;
    const filtradas = filtro === 'todos'
      ? avaliacoes
      : avaliacoes.filter((item) => item.servico === filtro);

    lista.innerHTML = filtradas.map((item) => {
      const inicial = escaparHTML(item.nome.trim().charAt(0).toUpperCase() || 'A');
      const foto = item.foto_url
        ? `<img class="avaliacao-foto" src="${escaparHTML(item.foto_url)}" alt="Foto enviada por ${escaparHTML(item.nome)}" loading="lazy" decoding="async">`
        : '';

      return `
        <article class="avaliacao-card">
          <div class="avaliacao-card-topo">
            <span class="avaliacao-avatar" aria-hidden="true">${inicial}</span>
            <div class="avaliacao-identidade">
              <strong>${escaparHTML(item.nome)}</strong>
              <small>${escaparHTML(item.servico)}</small>
            </div>
            <time class="avaliacao-data" datetime="${escaparHTML(item.created_at)}">${formatarData(item.created_at)}</time>
          </div>
          <div class="avaliacao-estrelas" aria-label="${item.nota} de 5 estrelas">${criarEstrelas(Number(item.nota))}</div>
          <p class="avaliacao-texto">${escaparHTML(item.texto)}</p>
          ${foto}
        </article>`;
    }).join('');

    elementos.vazio.hidden = filtradas.length > 0;
    const total = avaliacoes.length;
    const media = total
      ? avaliacoes.reduce((soma, item) => soma + Number(item.nota), 0) / total
      : 0;
    elementos.total.textContent = String(total);
    elementos.media.textContent = media ? media.toFixed(1).replace('.', ',') : '0,0';
  };

  const carregarAvaliacoes = async () => {
    if (!modoOnline) {
      avaliacoes = app.lerJSON(chaveLocal, avaliacoesIniciais);
      renderizar();
      return;
    }

    try {
      const resposta = await fetch(
        `${config.url}/rest/v1/${config.tabelaAvaliacoes}?select=*&aprovada=eq.true&order=created_at.desc`,
        { headers: apiHeaders() }
      );
      if (!resposta.ok) throw new Error('Falha ao carregar avaliações.');
      avaliacoes = await resposta.json();
    } catch (erro) {
      console.warn(erro);
      avaliacoes = app.lerJSON(chaveLocal, avaliacoesIniciais);
    }
    renderizar();
  };

  const abrirModal = () => {
    elementos.modal.hidden = false;
    document.body.style.overflow = 'hidden';
    elementos.nome.focus();
  };

  const fecharModal = () => {
    elementos.modal.hidden = true;
    document.body.style.overflow = '';
  };

  const limparErros = () => {
    formulario.querySelectorAll('[data-erro]').forEach((item) => { item.textContent = ''; });
  };

  const erro = (campo, mensagem) => {
    const elemento = formulario.querySelector(`[data-erro="${campo}"]`);
    if (elemento) elemento.textContent = mensagem;
  };

  const notaSelecionada = () => Number(formulario.querySelector('input[name="nota"]:checked')?.value || 0);

  const validar = () => {
    limparErros();
    let valido = true;
    if (elementos.nome.value.trim().length < 2) { erro('nome', 'Digite um nome válido.'); valido = false; }
    if (!elementos.servico.value) { erro('servico', 'Selecione um serviço.'); valido = false; }
    if (!notaSelecionada()) { erro('nota', 'Escolha uma nota.'); valido = false; }
    if (elementos.texto.value.trim().length < 10) { erro('texto', 'Escreva pelo menos 10 caracteres.'); valido = false; }
    if (!elementos.consentimento.checked) { erro('consentimento', 'Autorize a publicação para continuar.'); valido = false; }
    return valido;
  };

  const comprimirImagem = (arquivo) => new Promise((resolve, reject) => {
    const imagem = new Image();
    const url = URL.createObjectURL(arquivo);
    imagem.onload = () => {
      const limite = 1400;
      const escala = Math.min(1, limite / Math.max(imagem.width, imagem.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(imagem.width * escala);
      canvas.height = Math.round(imagem.height * escala);
      canvas.getContext('2d').drawImage(imagem, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        if (!blob) return reject(new Error('Não foi possível processar a imagem.'));
        resolve(blob);
      }, 'image/webp', 0.78);
    };
    imagem.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Imagem inválida.')); };
    imagem.src = url;
  });

  const enviarFoto = async (blob) => {
    if (!modoOnline || !blob) return '';
    const nomeArquivo = `${Date.now()}-${crypto.randomUUID()}.webp`;
    const resposta = await fetch(`${config.url}/storage/v1/object/${config.bucketFotos}/${nomeArquivo}`, {
      method: 'POST',
      headers: apiHeaders({ 'Content-Type': 'image/webp', 'x-upsert': 'false' }),
      body: blob
    });
    if (!resposta.ok) throw new Error('Não foi possível enviar a foto.');
    return `${config.url}/storage/v1/object/public/${config.bucketFotos}/${nomeArquivo}`;
  };

  const publicar = async (dados) => {
    if (!modoOnline) {
      avaliacoes.unshift({ id: crypto.randomUUID(), ...dados, created_at: new Date().toISOString() });
      app.salvarJSON(chaveLocal, avaliacoes);
      return;
    }

    const resposta = await fetch(`${config.url}/rest/v1/${config.tabelaAvaliacoes}`, {
      method: 'POST',
      headers: apiHeaders({ 'Content-Type': 'application/json', Prefer: 'return=representation' }),
      body: JSON.stringify({ ...dados, aprovada: true })
    });
    if (!resposta.ok) throw new Error('Não foi possível publicar a avaliação.');
    const [registro] = await resposta.json();
    avaliacoes.unshift(registro);
  };

  document.querySelectorAll('[data-abrir-avaliacao]').forEach((botao) => botao.addEventListener('click', abrirModal));
  document.querySelectorAll('[data-fechar-avaliacao]').forEach((botao) => botao.addEventListener('click', fecharModal));
  elementos.modal.addEventListener('click', (evento) => { if (evento.target === elementos.modal) fecharModal(); });
  elementos.filtro.addEventListener('change', renderizar);

  elementos.texto.addEventListener('input', () => {
    elementos.contador.textContent = String(elementos.texto.value.length);
  });

  elementos.foto.addEventListener('change', async () => {
    limparErros();
    const arquivo = elementos.foto.files?.[0];
    if (!arquivo) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(arquivo.type)) {
      erro('foto', 'Use uma imagem JPG, PNG ou WebP.');
      elementos.foto.value = '';
      return;
    }
    if (arquivo.size > 5 * 1024 * 1024) {
      erro('foto', 'A imagem deve ter no máximo 5 MB.');
      elementos.foto.value = '';
      return;
    }
    try {
      fotoProcessada = await comprimirImagem(arquivo);
      elementos.previewImagem.src = URL.createObjectURL(fotoProcessada);
      elementos.preview.hidden = false;
    } catch (erroImagem) {
      erro('foto', erroImagem.message);
    }
  });

  document.querySelector('[data-remover-foto]').addEventListener('click', () => {
    fotoProcessada = null;
    elementos.foto.value = '';
    elementos.preview.hidden = true;
    elementos.previewImagem.removeAttribute('src');
  });

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    if (!validar()) return;

    elementos.enviar.disabled = true;
    elementos.enviar.textContent = 'Publicando...';

    try {
      const fotoUrl = await enviarFoto(fotoProcessada);
      await publicar({
        nome: elementos.nome.value.trim(),
        servico: elementos.servico.value,
        nota: notaSelecionada(),
        texto: elementos.texto.value.trim(),
        foto_url: fotoUrl
      });
      renderizar();
      formulario.reset();
      elementos.contador.textContent = '0';
      fotoProcessada = null;
      elementos.preview.hidden = true;
      fecharModal();
    } catch (erroPublicacao) {
      erro('texto', erroPublicacao.message || 'Não foi possível publicar.');
    } finally {
      elementos.enviar.disabled = false;
      elementos.enviar.textContent = 'Publicar avaliação';
    }
  });

  carregarAvaliacoes();
});
