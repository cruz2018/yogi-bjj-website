-- Yogi BJJ — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).

create table if not exists leads (
  id               uuid        primary key default gen_random_uuid(),
  type             text        not null check (type in ('child', 'adult')),
  first_name       text        not null,
  last_name        text        not null,
  email            text        not null,
  phone            text        not null,
  student_age      text,
  group_interest   text        not null,
  message          text,
  source           text        not null default 'website-form',
  whatsapp_opt_in  boolean     not null default false,
  created_at       timestamptz not null default now()
);

-- Disable public read access; the service role key used by the backend
-- bypasses RLS, so only your server can read or write leads.
alter table leads enable row level security;
