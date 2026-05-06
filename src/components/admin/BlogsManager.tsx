"use client";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  body: string | null;
  category: string;
  read_time: string;
  published_at: string;
  image_url: string | null;
  alt: string;
  sort_order: number;
};

const empty: Omit<Blog, "id"> = {
  title: "",
  excerpt: "",
  body: "",
  category: "Travel Tips",
  read_time: "5 min read",
  published_at: new Date().toISOString().slice(0, 10),
  image_url: "",
  alt: "",
  sort_order: 0,
};

export default function BlogsManager() {
  const [items, setItems] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState(empty);

  async function load() {
    const { data, error } = await supabase.from("blogs").select("*").order("published_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems(data as Blog[]);
  }
  useEffect(() => { load(); }, []);

  function startEdit(b: Blog) {
    setEditing(b);
    setForm({ ...b });
  }
  function reset() { setEditing(null); setForm(empty); }

  async function save() {
    if (!form.title || !form.excerpt) return toast.error("Title and excerpt required");
    if (editing) {
      const { error } = await supabase.from("blogs").update(form).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Blog updated");
    } else {
      const { error } = await supabase.from("blogs").insert(form);
      if (error) return toast.error(error.message);
      toast.success("Blog added");
    }
    reset(); load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this blog?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border p-6 rounded-md space-y-4">
        <h3 className="font-serif text-xl">{editing ? "Edit blog" : "Add new blog"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
          <div><Label>Read time</Label><Input value={form.read_time} onChange={e => setForm({ ...form, read_time: e.target.value })} /></div>
          <div><Label>Published date</Label><Input type="date" value={form.published_at} onChange={e => setForm({ ...form, published_at: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>Excerpt</Label><Textarea rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>Full article body (optional)</Label><Textarea rows={8} value={form.body ?? ""} onChange={e => setForm({ ...form, body: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>Image alt text</Label><Input value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} /></div>
          <div className="md:col-span-2 flex items-center gap-4">
            {form.image_url ? <Image
          src={form.image_url}
          alt=""
          width={180}
          height={64}
          className="w-32 h-20 object-cover rounded w-auto"
        /> : null}
            <ImageUpload onUploaded={(url) => setForm({ ...form, image_url: url })} label={form.image_url ? "Replace image" : "Upload image"} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={save}>{editing ? "Save changes" : "Add blog"}</Button>
          {editing && <Button variant="outline" onClick={reset}>Cancel</Button>}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-xl">Existing blogs ({items.length})</h3>
        {items.map(b => (
          <div key={b.id} className="flex items-center gap-4 bg-card border border-border p-3 rounded">
            {b.image_url && <Image
          src={b.image_url}
          alt={b.alt}
          width={180}
          height={64}
          className="w-20 h-14 object-cover rounded w-auto"
        />}
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{b.title}</p>
              <p className="text-xs text-muted-foreground">{b.category} • {b.published_at}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => startEdit(b)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => remove(b.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}