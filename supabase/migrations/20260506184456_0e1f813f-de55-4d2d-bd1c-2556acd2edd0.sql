grant execute on function public.has_role(uuid, public.app_role) to authenticated, anon;

drop trigger if exists on_auth_user_created_admin on auth.users;
create trigger on_auth_user_created_admin
  after insert on auth.users
  for each row execute function public.handle_new_user_admin();

insert into public.user_roles (user_id, role)
select id, 'admin'::app_role from auth.users where email = 'espironova@gmail.com'
on conflict do nothing;