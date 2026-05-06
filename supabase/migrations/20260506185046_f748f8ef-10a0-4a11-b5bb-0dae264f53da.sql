
-- Seed existing blogs (only if not already seeded)
insert into public.blogs (title, excerpt, category, read_time, published_at, image_url, alt, sort_order)
select * from (values
  ('Top 5 Safari Destinations in Kenya You Must Visit',
    'From the endless plains of the Maasai Mara to the elephant-filled landscapes of Amboseli, Kenya offers some of the world''s most spectacular safari experiences.',
    'Destinations', '5 min read', '2026-03-15'::date,
    'https://yzgbfzgcweryionddxjp.supabase.co/storage/v1/object/public/site-images/seed/maasai-mara.jpg',
    'Wildebeest herds in the Maasai Mara savanna during the Great Migration', 100),
  ('Airport Transfer Tips for First-Time Visitors to Nairobi',
    'Arriving at JKIA for the first time? From booking your transfer in advance to what to expect at arrivals, here''s everything you need for a smooth airport pickup.',
    'Travel Tips', '4 min read', '2026-03-08'::date,
    'https://yzgbfzgcweryionddxjp.supabase.co/storage/v1/object/public/site-images/seed/fleet-sedan.jpg',
    'Toyota Noah sedan ready for airport transfer at JKIA Nairobi', 90),
  ('Why Hire a 4x4 for Your Kenya Adventure',
    'Kenya''s national parks have rugged terrain that standard vehicles can''t handle. Learn why a 4x4 Land Cruiser is the best choice for your safari.',
    'Car Hire', '6 min read', '2026-02-28'::date,
    'https://yzgbfzgcweryionddxjp.supabase.co/storage/v1/object/public/site-images/seed/fleet-landcruiser.jpg',
    'Toyota Land Cruiser on a dusty safari road in Kenya', 80),
  ('Best Time to Visit the Maasai Mara: A Seasonal Guide',
    'The Maasai Mara is stunning year-round, but each season offers a different experience. Timing your visit makes all the difference.',
    'Safari Tours', '5 min read', '2026-02-15'::date,
    'https://yzgbfzgcweryionddxjp.supabase.co/storage/v1/object/public/site-images/seed/amboseli.jpg',
    'Elephants with Mount Kilimanjaro in the background at Amboseli', 70),
  ('Nairobi to Mombasa: Your Long-Distance Travel Options',
    'Planning a trip from Nairobi to the coast? We break down the best ways to travel and why hiring a dedicated vehicle might be your best bet.',
    'Long Distance', '4 min read', '2026-02-05'::date,
    'https://yzgbfzgcweryionddxjp.supabase.co/storage/v1/object/public/site-images/seed/fleet-bus-interior.jpg',
    'Comfortable bus interior for long distance travel across Kenya', 60)
) as v(title, excerpt, category, read_time, published_at, image_url, alt, sort_order)
where not exists (select 1 from public.blogs where blogs.title = v.title);

-- Seed existing reviews
insert into public.reviews (name, location, text, rating, service, sort_order)
select * from (values
  ('Sarah Mitchell', 'London, UK', 'Track & Trace picked us up from JKIA at midnight. The driver was already waiting with a name sign. Spotless vehicle, smooth ride to our hotel. Couldn''t have asked for a better first impression of Kenya.', 5, 'Airport Transfer', 100),
  ('James Kariuki', 'Nairobi, Kenya', 'Our 3-day Maasai Mara safari was absolutely life-changing. The Land Cruiser was in perfect condition, and our guide Joseph spotted animals we would have never seen on our own. Truly world-class.', 5, 'Safari Tour, Maasai Mara', 90),
  ('Priya Deshmukh', 'Mumbai, India', 'Rented a safari van for a week-long family trip across Kenya. From Nairobi to Amboseli to Lake Nakuru, the vehicle handled everything beautifully. Great value for money.', 5, 'Car Hire, Safari Van', 80),
  ('Robert Ochieng', 'Kisumu, Kenya', 'Used Track & Trace for a Nairobi to Mombasa group transfer. The bus was comfortable, driver was professional, and we arrived right on schedule. My go-to for long-distance travel now.', 5, 'Long Distance Transfer', 70),
  ('Emily Chen', 'Singapore', 'Booked an Amboseli safari with Track & Trace and it exceeded all expectations. Seeing elephants with Kilimanjaro in the background from our 4x4 roof hatch was a once-in-a-lifetime moment.', 5, 'Safari Tour, Amboseli', 60),
  ('David Thompson', 'Toronto, Canada', 'I''ve used many car hire services across Africa, and Track & Trace stands out. The vehicles are genuinely well-maintained, the pricing is transparent, and the team is incredibly responsive on WhatsApp.', 5, 'Car Hire, Land Cruiser', 50),
  ('Fatima Al-Rashid', 'Dubai, UAE', 'We hired a minibus for our corporate team building event. The driver was punctual, friendly, and knew exactly where to go. Excellent corporate transport option.', 5, 'Corporate Transport', 40),
  ('Michael Njoroge', 'Nairobi, Kenya', 'Track & Trace handled our wedding guest transport flawlessly. Three vehicles coordinated perfectly, all arrived on time, and our guests were thrilled.', 5, 'Event Transport', 30)
) as v(name, location, text, rating, service, sort_order)
where not exists (select 1 from public.reviews where reviews.name = v.name and reviews.text = v.text);

-- Admin: list users
create or replace function public.list_users_for_admin()
returns table(user_id uuid, email text, is_admin boolean, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.has_role(auth.uid(), 'admin'::app_role) then
    raise exception 'not authorized';
  end if;
  return query
    select u.id, u.email::text,
      exists(select 1 from public.user_roles r where r.user_id = u.id and r.role = 'admin'::app_role),
      u.created_at
    from auth.users u
    order by u.created_at desc;
end; $$;

grant execute on function public.list_users_for_admin() to authenticated;

-- Admin: grant role
create or replace function public.grant_admin(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.has_role(auth.uid(), 'admin'::app_role) then
    raise exception 'not authorized';
  end if;
  insert into public.user_roles (user_id, role) values (target_user_id, 'admin'::app_role)
  on conflict do nothing;
end; $$;

grant execute on function public.grant_admin(uuid) to authenticated;

-- Admin: revoke role
create or replace function public.revoke_admin(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.has_role(auth.uid(), 'admin'::app_role) then
    raise exception 'not authorized';
  end if;
  if target_user_id = auth.uid() then
    raise exception 'cannot remove your own admin role';
  end if;
  delete from public.user_roles where user_id = target_user_id and role = 'admin'::app_role;
end; $$;

grant execute on function public.revoke_admin(uuid) to authenticated;
