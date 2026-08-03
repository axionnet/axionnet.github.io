# Configuração do Cloudflare + GitHub Pages

## Antes de começar
O Cloudflare precisa de um domínio próprio, como `axionnetwork.com.br`. Ele não consegue controlar o endereço padrão `usuario.github.io`.

## 1. Configure o domínio no GitHub
1. Abra o repositório no GitHub.
2. Entre em **Settings > Pages**.
3. Em **Custom domain**, informe seu domínio, por exemplo `www.seudominio.com.br`.
4. Salve e depois marque **Enforce HTTPS** quando a opção ficar disponível.
5. Verifique o domínio em sua conta GitHub para reduzir o risco de outra pessoa tentar vinculá-lo.

## 2. Adicione o domínio ao Cloudflare
1. Crie uma conta gratuita no Cloudflare.
2. Clique em **Add a domain** e informe apenas `seudominio.com.br`.
3. Escolha o plano Free.
4. No local onde comprou o domínio, troque os nameservers pelos dois mostrados pelo Cloudflare.

## 3. Crie os registros DNS
Para usar `www`:
- Tipo: `CNAME`
- Nome: `www`
- Destino: `SEUUSUARIO.github.io`
- Proxy: ligado, nuvem laranja

Para o domínio sem `www`, crie quatro registros A com nome `@`:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Comece com a nuvem cinza até o GitHub liberar o certificado HTTPS. Depois ligue a nuvem laranja.

## 4. SSL/TLS
No Cloudflare:
1. Abra **SSL/TLS > Overview**.
2. Escolha **Full (strict)**.
3. Em **Edge Certificates**, ligue **Always Use HTTPS**.
4. Só ligue HSTS depois que HTTPS estiver funcionando em todas as páginas. Comece com 6 meses e sem preload.

## 5. Desempenho
1. Em **Speed > Optimization**, mantenha a compressão ligada.
2. Ative **Early Hints**.
3. Deixe **Rocket Loader desligado** inicialmente, porque o site possui JavaScript interativo. Teste antes de ativar.
4. Em **Caching > Cache Rules**, crie uma regra para todo o domínio com **Eligible for cache** e Edge TTL de 1 hora. O site é estático.
5. Ao publicar uma atualização, limpe apenas as URLs alteradas em **Caching > Configuration > Purge Cache**.

## 6. Segurança
1. Em **Security > Bots**, ligue **Bot Fight Mode**.
2. Em **Security > Settings**, use nível de segurança Medium.
3. Em **Rules > Transform Rules > Modify Response Header**, aplique a todos os pedidos e crie estes cabeçalhos:

```text
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.supabase.co; connect-src 'self' https://*.supabase.co; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; frame-src 'none'; upgrade-insecure-requests
```

## 7. Supabase
1. Execute novamente o arquivo `SUPABASE.sql` no SQL Editor.
2. No bucket `avaliacoes-fotos`, defina limite de 5 MB e permita apenas JPG, PNG e WebP.
3. A chave `sb_publishable_...` pode ficar no navegador, mas nunca coloque uma chave `sb_secret_...` ou `service_role` no site.
4. Novas avaliações agora ficam com `aprovada = false`. Aprove manualmente no Table Editor.

## 8. Teste final
- Abra o site em uma janela anônima.
- Faça um pedido e confirme a abertura do WhatsApp com mensagem preenchida.
- Teste no celular.
- Verifique se o cadeado HTTPS aparece.
- No DevTools > Network, confirme que CSS e JS retornam `CF-Cache-Status: HIT` após recarregar.
