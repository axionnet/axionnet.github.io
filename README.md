# AxionNetwork v3 — versão otimizada

Site institucional estático, preparado para GitHub Pages e para uso com domínio próprio no Cloudflare.

## Alterações desta versão

- novo objeto 3D interativo na página inicial;
- pedido com mensagem automática e redirecionamento confiável para o WhatsApp `5567991705278`;
- fonte externa removida, reduzindo uma requisição de terceiros;
- partículas reduzidas para 12 no computador e 6 no celular;
- cursor personalizado removido para melhorar desempenho e evitar desaparecimento do ponteiro;
- favicon corrigido;
- política CSP adicionada em todas as páginas;
- endereço da API Supabase corrigido;
- novas avaliações ficam pendentes de aprovação;
- `.nojekyll` incluído para GitHub Pages.

## Publicar

Envie todo o conteúdo desta pasta para a raiz do repositório publicado pelo GitHub Pages.

## Cloudflare

Siga o arquivo `GUIA-CLOUDFLARE.md`. É necessário possuir um domínio próprio; o endereço padrão `usuario.github.io` não pode ser administrado pelo Cloudflare.

## Supabase

1. Abra o SQL Editor.
2. Execute `SUPABASE.sql` novamente.
3. No bucket `avaliacoes-fotos`, configure limite de 5 MB e permita JPG, PNG e WebP.
4. Use apenas a chave pública `sb_publishable_...` no navegador.
5. Nunca coloque `sb_secret_...`, `service_role` ou outra chave secreta neste projeto.

Para aprovar avaliações, abra o Table Editor, entre na tabela `avaliacoes` e altere `aprovada` de `false` para `true`.
