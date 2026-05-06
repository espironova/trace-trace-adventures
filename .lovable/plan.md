## Fix admin access

Two backend issues are blocking admin login for espironova@gmail.com.

### Problem 1: `has_role` function denies all callers
RLS policies on `user_roles`, `blogs`, `reviews`, and `fleet_units` all call `public.has_role(...)`, but the `authenticated` Postgres role has no EXECUTE permission on that function. Every call returns `42501 permission denied for function has_role`, so no user is ever recognized as admin.

### Problem 2: The admin-assignment trigger was never attached
The function `handle_new_user_admin()` exists, but no trigger on `auth.users` calls it. So when you signed up with espironova@gmail.com, no row was inserted into `user_roles`. Result: even after fixing Problem 1, the admin check still returns false.

### Fix (single migration)

```sql
-- 1. Let authenticated/anon execute the role check
grant execute on function public.has_role(uuid, public.app_role) to authenticated, anon;

-- 2. Attach the trigger so future admin emails get auto-promoted
drop trigger if exists on_auth_user_created_admin on auth.users;
create trigger on_auth_user_created_admin
  after insert on auth.users
  for each row execute function public.handle_new_user_admin();

-- 3. Backfill admin role for the existing espironova@gmail.com account
insert into public.user_roles (user_id, role)
select id, 'admin'::app_role from auth.users where email = 'espironova@gmail.com'
on conflict do nothing;
```

### After the migration
- Sign out and sign back in at `/admin` with espironova@gmail.com.
- The dashboard (Blogs / Reviews / Fleet tabs) will load.

No frontend changes needed.
