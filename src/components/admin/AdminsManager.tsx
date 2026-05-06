"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type UserRow = { user_id: string; email: string; is_admin: boolean; created_at: string };

export default function AdminsManager() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.rpc("list_users_for_admin");
    if (error) toast.error(error.message);
    else setUsers((data as UserRow[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function grant(id: string) {
    const { error } = await supabase.rpc("grant_admin", { target_user_id: id });
    if (error) return toast.error(error.message);
    toast.success("Admin granted");
    load();
  }
  async function revoke(id: string) {
    if (!confirm("Remove admin access from this user?")) return;
    const { error } = await supabase.rpc("revoke_admin", { target_user_id: id });
    if (error) return toast.error(error.message);
    toast.success("Admin revoked");
    load();
  }

  const admins = users.filter(u => u.is_admin);
  const pending = users.filter(u => !u.is_admin);

  return (
    <div className="space-y-8">
      <div className="bg-muted/40 border border-border p-4 rounded-md text-sm">
        <p className="font-bold mb-1">How to add a new admin</p>
        <p className="text-muted-foreground">
          Ask them to go to <code>/admin</code>, click "First time? Create account", and sign up with their email and password.
          They will see "Not authorized" until you grant access here. Find them under Pending users below and click Grant admin.
        </p>
      </div>

      <div>
        <h3 className="font-serif text-xl mb-3">Current admins ({admins.length})</h3>
        <div className="space-y-2">
          {admins.map(u => (
            <div key={u.user_id} className="flex items-center justify-between bg-card border border-border p-3 rounded">
              <div>
                <p className="font-bold text-sm">{u.email}</p>
                <p className="text-xs text-muted-foreground">Joined {new Date(u.created_at).toLocaleDateString()}</p>
              </div>
              {u.user_id === user?.id ? (
                <span className="text-xs text-muted-foreground">You</span>
              ) : (
                <Button size="sm" variant="destructive" onClick={() => revoke(u.user_id)}>Revoke admin</Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl mb-3">Pending users ({pending.length})</h3>
        {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
        {!loading && pending.length === 0 && (
          <p className="text-sm text-muted-foreground">No pending users. New signups will appear here.</p>
        )}
        <div className="space-y-2">
          {pending.map(u => (
            <div key={u.user_id} className="flex items-center justify-between bg-card border border-border p-3 rounded">
              <div>
                <p className="font-bold text-sm">{u.email}</p>
                <p className="text-xs text-muted-foreground">Signed up {new Date(u.created_at).toLocaleDateString()}</p>
              </div>
              <Button size="sm" onClick={() => grant(u.user_id)}>Grant admin</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}