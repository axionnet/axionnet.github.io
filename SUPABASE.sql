-- Execute no SQL Editor do Supabase.
create table if not exists public.avaliacoes (
  id uuid primary key default gen_random_uuid(),
  nome varchar(60) not null,
  servico varchar(80) not null,
  nota smallint not null check (nota between 1 and 5),
  texto varchar(700) not null,
  foto_url text default '',
  aprovada boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.avaliacoes enable row level security;

create policy "Avaliações aprovadas são públicas"
on public.avaliacoes for select
using (aprovada = true);

create policy "Visitantes podem criar avaliações"
on public.avaliacoes for insert
to anon
with check (
  length(nome) between 2 and 60
  and length(texto) between 10 and 700
  and nota between 1 and 5
);

-- Depois, no painel Storage, crie um bucket público chamado: avaliacoes-fotos
-- Políticas do Storage para o bucket:
create policy "Fotos de avaliações são públicas"
on storage.objects for select
using (bucket_id = 'avaliacoes-fotos');

create policy "Visitantes podem enviar fotos de avaliações"
on storage.objects for insert
to anon
with check (bucket_id = 'avaliacoes-fotos');
