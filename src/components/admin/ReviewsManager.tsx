import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Review = { id: string; name: string; location: string; text: string; rating: number; service: string; sort_order: number };
const empty: Omit<Review, "id"> = { name: "", location: "", text: "", rating: 5, service: "", sort_order: 0 };

export default function ReviewsManager() {
  const [items, setItems] = useState<Review[]>([]);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState(empty);

  async function load() {
    const { data, error } = await supabase.from("reviews").select("*").order("sort_order").order("created_at", { ascending: false });
    if (error) toast.error(error.message); else setItems(data as Review[]);
  }
  useEffect(() => { load(); }, []);

  function startEdit(r: Review) { setEditing(r); setForm({ ...r }); }
  function reset() { setEditing(null); setForm(empty); }

  async function save() {
    if (!form.name || !form.text) return toast.error("Name and review text required");
    if (editing) {
      const { error } = await supabase.from("reviews").update(form).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Review updated");
    } else {
      const { error } = await supabase.from("reviews").insert(form);
      if (error) return toast.error(error.message);
      toast.success("Review added");
    }
    reset(); load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border p-6 rounded-md space-y-4">
        <h3 className="font-serif text-xl">{editing ? "Edit review" : "Add new review"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
          <div><Label>Service</Label><Input value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} /></div>
          <div><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} /></div>
          <div className="md:col-span-2"><Label>Review text</Label><Textarea rows={4} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} /></div>
        </div>
        <div className="flex gap-2">
          <Button onClick={save}>{editing ? "Save changes" : "Add review"}</Button>
          {editing && <Button variant="outline" onClick={reset}>Cancel</Button>}
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-serif text-xl">Existing reviews ({items.length})</h3>
        {items.map(r => (
          <div key={r.id} className="bg-card border border-border p-4 rounded flex gap-4">
            <div className="flex-1">
              <p className="font-bold">{r.name} <span className="text-xs text-muted-foreground">• {r.location}</span></p>
              <p className="text-xs text-accent">{r.service} • {"★".repeat(r.rating)}</p>
              <p className="text-sm mt-1 line-clamp-2">{r.text}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline" onClick={() => startEdit(r)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => remove(r.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}