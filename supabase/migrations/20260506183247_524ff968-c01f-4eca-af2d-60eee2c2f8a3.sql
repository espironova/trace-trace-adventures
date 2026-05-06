
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "Admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Blogs
create table public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  body text,
  category text not null default 'General',
  read_time text not null default '5 min read',
  published_at date not null default current_date,
  image_url text,
  alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.blogs enable row level security;
create policy "Anyone can view blogs" on public.blogs for select using (true);
create policy "Admins manage blogs" on public.blogs for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Reviews
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  text text not null,
  rating int not null default 5,
  service text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
create policy "Anyone can view reviews" on public.reviews for select using (true);
create policy "Admins manage reviews" on public.reviews for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Fleet units (admin-added vehicles)
create table public.fleet_units (
  id uuid primary key default gen_random_uuid(),
  model_key text not null default 'custom',
  model_name text not null,
  registration text not null default 'Registration on request',
  capacity text not null,
  ideal_for text not null default '',
  features text[] not null default '{}',
  alt text not null default '',
  images text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.fleet_units enable row level security;
create policy "Anyone can view fleet" on public.fleet_units for select using (true);
create policy "Admins manage fleet" on public.fleet_units for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger blogs_updated_at before update on public.blogs for each row execute function public.set_updated_at();
create trigger fleet_updated_at before update on public.fleet_units for each row execute function public.set_updated_at();

-- Storage bucket
insert into storage.buckets (id, name, public) values ('site-images', 'site-images', true);

create policy "Public read site-images" on storage.objects for select using (bucket_id = 'site-images');
create policy "Admins upload site-images" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and public.has_role(auth.uid(),'admin'));
create policy "Admins update site-images" on storage.objects for update to authenticated
  using (bucket_id = 'site-images' and public.has_role(auth.uid(),'admin'));
create policy "Admins delete site-images" on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and public.has_role(auth.uid(),'admin'));

-- Auto-grant admin role to specific email on signup
create or replace function public.handle_new_user_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.email = 'espironova@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user_admin();
