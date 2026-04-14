-- AI Writing Tools — Supabase Schema
-- Run this in your Supabase SQL editor

-- Users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text,
  plan text not null default 'free',  -- free | pro | team
  credits int not null default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Usage logs
create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  tool text not null,  -- rewriter | grammar | ai_detect | summarize | citation | plagiarism
  input_tokens int,
  output_tokens int,
  credits_used int not null default 1,
  created_at timestamptz default now()
);

-- Subscriptions
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  stripe_subscription_id text,
  stripe_customer_id text,
  plan text not null,  -- pro | team
  status text not null,  -- active | canceled | past_due | trialing
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_usage_logs_user_id on public.usage_logs(user_id);
create index if not exists idx_usage_logs_tool on public.usage_logs(tool);
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);

-- Credit deduction function
create or replace function public.deduct_credits(user_id uuid, amount int)
returns void as $$
declare
  current_credits int;
begin
  select credits into current_credits from public.users where id = user_id;
  if current_credits < amount then
    raise exception 'Insufficient credits';
  end if;
  update public.users set credits = credits - amount, updated_at = now() where id = user_id;
end;
$$ language plpgsql security definer;

-- RLS Policies
alter table public.users enable row level security;
alter table public.usage_logs enable row level security;
alter table public.subscriptions enable row level security;

-- Users can only see their own data
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Usage logs accessible by owner
create policy "Users can view own usage logs" on public.usage_logs
  for select using (auth.uid() = user_id);

create policy "Service role can manage usage logs" on public.usage_logs
  for all using (true);

-- Subscriptions accessible by owner
create policy "Users can view own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);
