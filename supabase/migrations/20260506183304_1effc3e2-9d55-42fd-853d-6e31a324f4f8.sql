
create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

revoke execute on function public.has_role(uuid, app_role) from public, anon, authenticated;
grant execute on function public.has_role(uuid, app_role) to authenticated;

revoke execute on function public.handle_new_user_admin() from public, anon, authenticated;

drop policy "Public read site-images" on storage.objects;
create policy "Public read site-images files" on storage.objects for select
  using (bucket_id = 'site-images' and (storage.foldername(name))[1] is not null);
