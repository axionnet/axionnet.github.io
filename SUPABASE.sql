-- Execute no SQL Editor do Supabase.
-- Esta versão deixa novas avaliações pendentes para evitar spam público.

create table if not exists public.avaliacoes (
  id uuid primary key default gen_random_uuid(),
  nome varchar(60) not null,
  servico varchar(80) not null,
  nota smallint not null check (nota between 1 and 5),
  texto varchar(700) not null,
  foto_url text default '',
  aprovada boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.avaliacoes alter column aprovada set default false;
alter table public.avaliacoes enable row level security;

revoke all on public.avaliacoes from anon;
grant select, insert on public.avaliacoes to anon;

drop policy if exists "Avaliações aprovadas são públicas" on public.avaliacoes;
create policy "Avaliações aprovadas são públicas"
on public.avaliacoes for select
to anon
using (aprovada = true);

drop policy if exists "Visitantes podem criar avaliações" on public.avaliacoes;
drop policy if exists "Visitantes podem criar avaliações pendentes" on public.avaliacoes;
create policy "Visitantes podem criar avaliações pendentes"
on public.avaliacoes for insert
to anon
with check (
  aprovada = false
  and length(nome) between 2 and 60
  and length(servico) between 2 and 80
  and length(texto) between 10 and 700
  and nota between 1 and 5
);

-- No Storage, crie um bucket público chamado: avaliacoes-fotos
-- Configure no bucket: limite de 5 MB e MIME types image/jpeg,image/png,image/webp.

drop policy if exists "Fotos de avaliações são públicas" on storage.objects;
create policy "Fotos de avaliações são públicas"
on storage.objects for select
using (bucket_id = 'avaliacoes-fotos');

drop policy if exists "Visitantes podem enviar fotos de avaliações" on storage.objects;
drop policy if exists "Visitantes podem enviar fotos WebP pendentes" on storage.objects;
create policy "Visitantes podem enviar fotos WebP pendentes"
on storage.objects for insert
to anon
with check (
  bucket_id = 'avaliacoes-fotos'
  and (storage.foldername(name))[1] = 'public'
  and lower(storage.extension(name)) = 'webp'
);

-- Para aprovar uma avaliação manualmente:
-- update public.avaliacoes set aprovada = true where id = 'ID_DA_AVALIACAO';
