"use client";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogsManager from "@/components/admin/BlogsManager";
import ReviewsManager from "@/components/admin/ReviewsManager";
import FleetManager from "@/components/admin/FleetManager";
import RatesManager from "@/components/admin/RatesManager";
import AdminsManager from "@/components/admin/AdminsManager";
import { toast } from "sonner";
import Layout from "@/components/Layout";

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!user) {
    return (
      <Layout>
        <section className="min-h-[70vh] flex items-center justify-center py-16 px-4">
          <form onSubmit={submit} className="w-full max-w-md bg-card border border-border p-8 rounded-md space-y-4">
            <h1 className="font-serif text-2xl">Admin {mode === "signup" ? "sign up" : "sign in"}</h1>
            <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} /></div>
            <Button type="submit" disabled={busy} className="w-full">{busy ? "..." : mode === "signup" ? "Create account" : "Sign in"}</Button>
            <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-sm text-accent underline w-full">
              {mode === "signin" ? "First time? Create account" : "Already have an account? Sign in"}
            </button>
          </form>
        </section>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="font-serif text-2xl">Not authorized</h1>
          <p className="text-muted-foreground">Your account ({user.email}) does not have admin access.</p>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Signed in as {user.email}</p>
          </div>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </div>
        <Tabs defaultValue="blogs">
          <TabsList>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="fleet">Fleet</TabsTrigger>
            <TabsTrigger value="rates">Rates</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>
          <TabsContent value="blogs" className="mt-6"><BlogsManager /></TabsContent>
          <TabsContent value="reviews" className="mt-6"><ReviewsManager /></TabsContent>
          <TabsContent value="fleet" className="mt-6"><FleetManager /></TabsContent>
          <TabsContent value="rates" className="mt-6"><RatesManager /></TabsContent>
          <TabsContent value="admins" className="mt-6"><AdminsManager /></TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}