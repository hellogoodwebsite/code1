-- ERPP schema and RLS policies

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role text not null check (role in ('admin', 'case_worker', 'read_only')),
  full_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  is_active boolean not null default true
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  program_id uuid references public.programs(id) on delete set null,
  assigned_user_id uuid references auth.users(id) on delete set null,
  status text not null check (status in ('intake', 'active', 'placed', 'inactive')),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  preferred_language text,
  immigration_status text,
  education_level text not null,
  english_level int not null,
  immediate_income_need boolean not null default false,
  work_experience_country text,
  work_experience_years int not null default 0,
  notes text,
  deleted_at timestamptz
);

create index if not exists clients_org_idx on public.clients (organization_id);
create index if not exists clients_program_idx on public.clients (program_id);
create index if not exists clients_assigned_idx on public.clients (assigned_user_id);

create table if not exists public.client_assessments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  created_at timestamptz not null default now(),
  created_by_user_id uuid references auth.users(id),
  readiness_score_total int not null,
  subscore_language int not null,
  subscore_experience int not null,
  subscore_credentials int not null,
  subscore_jobsearch int not null,
  scoring_version text not null,
  scoring_breakdown_json jsonb not null default '{}'::jsonb
);

create table if not exists public.client_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  assessment_id uuid references public.client_assessments(id) on delete set null,
  created_at timestamptz not null default now(),
  plan_items jsonb not null default '[]'::jsonb,
  completed_item_ids jsonb not null default '[]'::jsonb
);

create table if not exists public.placements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  created_at timestamptz not null default now(),
  created_by_user_id uuid references auth.users(id),
  employer_name text not null,
  job_title text not null,
  wage_hourly numeric,
  employment_type text not null check (employment_type in ('full_time', 'part_time', 'temporary')),
  start_date date,
  retention_30 boolean,
  retention_90 boolean,
  retention_notes text
);

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  created_at timestamptz not null default now(),
  created_by_user_id uuid references auth.users(id),
  type text not null check (type in ('note', 'call', 'email', 'meeting', 'workshop')),
  content text not null
);

create table if not exists public.client_auth (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  auth_user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.user_profiles enable row level security;
alter table public.programs enable row level security;
alter table public.clients enable row level security;
alter table public.client_assessments enable row level security;
alter table public.client_plans enable row level security;
alter table public.placements enable row level security;
alter table public.interactions enable row level security;
alter table public.client_auth enable row level security;

create or replace function public.current_org_id()
returns uuid
language sql stable
as $$
  select organization_id from public.user_profiles where id = auth.uid();
$$;

create or replace function public.current_role()
returns text
language sql stable
as $$
  select role from public.user_profiles where id = auth.uid();
$$;

create policy "org members can view org" on public.organizations
  for select using (id = public.current_org_id());

create policy "org members manage org" on public.organizations
  for update using (id = public.current_org_id() and public.current_role() = 'admin');

create policy "profiles in org" on public.user_profiles
  for select using (organization_id = public.current_org_id());

create policy "admins manage profiles" on public.user_profiles
  for all using (organization_id = public.current_org_id() and public.current_role() = 'admin')
  with check (organization_id = public.current_org_id() and public.current_role() = 'admin');

create policy "org programs" on public.programs
  for select using (organization_id = public.current_org_id());

create policy "admin manage programs" on public.programs
  for all using (organization_id = public.current_org_id() and public.current_role() = 'admin')
  with check (organization_id = public.current_org_id() and public.current_role() = 'admin');

create policy "org clients view" on public.clients
  for select using (organization_id = public.current_org_id());

create policy "admin or assigned edit" on public.clients
  for update using (
    organization_id = public.current_org_id()
    and (public.current_role() = 'admin' or assigned_user_id = auth.uid())
  )
  with check (
    organization_id = public.current_org_id()
    and (public.current_role() = 'admin' or assigned_user_id = auth.uid())
  );

create policy "admin or caseworker create" on public.clients
  for insert with check (
    organization_id = public.current_org_id()
    and public.current_role() in ('admin', 'case_worker')
  );

create policy "readonly blocks delete" on public.clients
  for delete using (public.current_role() = 'admin');

create policy "org assessments" on public.client_assessments
  for select using (
    exists (
      select 1 from public.clients
      where clients.id = client_assessments.client_id
      and clients.organization_id = public.current_org_id()
    )
  );

create policy "admin or caseworker manage assessments" on public.client_assessments
  for all using (
    public.current_role() in ('admin', 'case_worker')
    and exists (
      select 1 from public.clients
      where clients.id = client_assessments.client_id
      and clients.organization_id = public.current_org_id()
    )
  )
  with check (
    public.current_role() in ('admin', 'case_worker')
    and exists (
      select 1 from public.clients
      where clients.id = client_assessments.client_id
      and clients.organization_id = public.current_org_id()
    )
  );

create policy "org plans" on public.client_plans
  for select using (
    exists (
      select 1 from public.clients
      where clients.id = client_plans.client_id
      and clients.organization_id = public.current_org_id()
    )
  );

create policy "admin or caseworker manage plans" on public.client_plans
  for all using (
    public.current_role() in ('admin', 'case_worker')
    and exists (
      select 1 from public.clients
      where clients.id = client_plans.client_id
      and clients.organization_id = public.current_org_id()
    )
  )
  with check (
    public.current_role() in ('admin', 'case_worker')
    and exists (
      select 1 from public.clients
      where clients.id = client_plans.client_id
      and clients.organization_id = public.current_org_id()
    )
  );

create policy "org placements" on public.placements
  for select using (
    exists (
      select 1 from public.clients
      where clients.id = placements.client_id
      and clients.organization_id = public.current_org_id()
    )
  );

create policy "admin or caseworker manage placements" on public.placements
  for all using (
    public.current_role() in ('admin', 'case_worker')
    and exists (
      select 1 from public.clients
      where clients.id = placements.client_id
      and clients.organization_id = public.current_org_id()
    )
  )
  with check (
    public.current_role() in ('admin', 'case_worker')
    and exists (
      select 1 from public.clients
      where clients.id = placements.client_id
      and clients.organization_id = public.current_org_id()
    )
  );

create policy "org interactions" on public.interactions
  for select using (
    exists (
      select 1 from public.clients
      where clients.id = interactions.client_id
      and clients.organization_id = public.current_org_id()
    )
  );

create policy "admin or caseworker manage interactions" on public.interactions
  for all using (
    public.current_role() in ('admin', 'case_worker')
    and exists (
      select 1 from public.clients
      where clients.id = interactions.client_id
      and clients.organization_id = public.current_org_id()
    )
  )
  with check (
    public.current_role() in ('admin', 'case_worker')
    and exists (
      select 1 from public.clients
      where clients.id = interactions.client_id
      and clients.organization_id = public.current_org_id()
    )
  );

create policy "client auth self" on public.client_auth
  for select using (auth_user_id = auth.uid());

create policy "client auth manage" on public.client_auth
  for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');
