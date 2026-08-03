# AxionNetwork V3

Site institucional da AxionNetwork com páginas separadas, fluxo de orçamento pelo WhatsApp e avaliações de clientes.

## Abrir localmente

Abra `index.html` no navegador. Para testar corretamente upload e integração online, use a extensão Live Server do Visual Studio Code.

## Avaliações

A página `clientes.html` funciona de duas formas:

1. **Modo demonstração:** sem configuração, avaliações ficam salvas apenas no navegador atual.
2. **Modo online:** avaliações e fotos ficam disponíveis para todos os visitantes usando Supabase.

### Ativar o modo online

1. Crie um projeto gratuito no Supabase.
2. Abra o SQL Editor e execute o arquivo `SUPABASE.sql`.
3. Em Storage, confirme que existe um bucket público chamado `avaliacoes-fotos`.
4. Abra `assets/js/supabase-config.js`.
5. Preencha `url` e `anonKey` com os dados públicos do projeto.

Nunca coloque a `service_role key` no site. Use somente a chave pública `anon`.

## Desempenho

- Imagens de avaliações são convertidas para WebP e redimensionadas antes do upload.
- Imagens nos cards usam carregamento preguiçoso (`loading="lazy"`).
- A quantidade de partículas foi reduzida para 20 no computador e 10 no celular.
- Animações são desligadas automaticamente quando o dispositivo solicita redução de movimento.
