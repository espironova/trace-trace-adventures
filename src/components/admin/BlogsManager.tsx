"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  status: string;
};

const PRESET_CATEGORIES = [
  "Travel Tips",
  "Destinations",
  "Safari Guides",
  "Vehicle & Hire",
  "Corporate Travel",
  "Stories",
  "News",
];

function calcReadTime(text: string | null | undefined): string {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

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
  status: "published",
};

export default function BlogsManager() {
  const [items, setItems] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState(empty);
  const [customCategory, setCustomCategory] = useState(false);

  async function load() {
    const { data, error } = await supabase.from("blogs").select("*").order("published_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems(data as Blog[]);
  }
  useEffect(() => { load(); }, []);

  function startEdit(b: Blog) {
    setEditing(b);
    setForm({ ...b, status: b.status ?? "published" });
    setCustomCategory(!PRESET_CATEGORIES.includes(b.category));
  }
  function reset() { setEditing(null); setForm(empty); setCustomCategory(false); }

  async function save(targetStatus?: "draft" | "published") {
    if (!form.title || !form.excerpt) return toast.error("Title and excerpt required");
    const payload = {
      ...form,
      read_time: calcReadTime(form.body || form.excerpt),
      status: targetStatus ?? form.status ?? "published",
    };
    if (editing) {
      const { error } = await supabase.from("blogs").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success(payload.status === "draft" ? "Saved as draft" : "Blog published");
    } else {
      const { error } = await supabase.from("blogs").insert(payload);
      if (error) return toast.error(error.message);
      toast.success(payload.status === "draft" ? "Draft saved" : "Blog published");
    }
    reset(); load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this blog?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  const liveReadTime = calcReadTime(form.body || form.excerpt);

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border p-6 rounded-md space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h3 className="font-serif text-xl">{editing ? "Edit blog" : "Add new blog"}</h3>
          {editing && (
            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${form.status === "draft" ? "bg-muted text-muted-foreground" : "bg-heroGold/20 text-foreground"}`}>
              {form.status === "draft" ? "Draft" : "Published"}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div>
            <Label>Category</Label>
            {customCategory ? (
              <div className="flex gap-2">
                <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Custom category" />
                <Button type="button" variant="outline" size="sm" onClick={() => { setCustomCategory(false); setForm({ ...form, category: PRESET_CATEGORIES[0] }); }}>Presets</Button>
              </div>
            ) : (
              <Select
                value={PRESET_CATEGORIES.includes(form.category) ? form.category : ""}
                onValueChange={(v) => {
                  if (v === "__custom__") { setCustomCategory(true); setForm({ ...form, category: "" }); }
                  else setForm({ ...form, category: v });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  {PRESET_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  <SelectItem value="__custom__">+ Add custom…</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          <div>
            <Label>Read time (auto)</Label>
            <div className="h-10 flex items-center px-3 rounded border border-input bg-muted/40 font-sans text-sm text-muted-foreground">{liveReadTime}</div>
          </div>
          <div><Label>Published date</Label><Input type="date" value={form.published_at} onChange={e => setForm({ ...form, published_at: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>Excerpt</Label><Textarea rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>Full article body (optional)</Label><Textarea rows={8} value={form.body ?? ""} onChange={e => setForm({ ...form, body: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>Image alt text</Label><Input value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} /></div>
          <div className="md:col-span-2 flex items-center gap-4">
            {form.image_url ? <img
              src={form.image_url}
              alt=""
              className="w-32 h-20 object-cover rounded"
            /> : null}
            <ImageUpload onUploaded={(url) => setForm({ ...form, image_url: url })} label={form.image_url ? "Replace image" : "Upload image"} />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => save("published")} className="bg-heroGold text-foreground hover:bg-heroGold/90">
            {editing ? (form.status === "draft" ? "Publish now" : "Save & keep published") : "Publish"}
          </Button>
          <Button variant="outline" onClick={() => save("draft")}>
            {editing && form.status === "published" ? "Unpublish (save as draft)" : "Save as draft"}
          </Button>
          {editing && <Button variant="ghost" onClick={reset}>Cancel</Button>}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-xl">Existing blogs ({items.length})</h3>
        {items.map(b => (
          <div key={b.id} className="flex items-center gap-4 bg-card border border-border p-3 rounded">
            {b.image_url && <img
              src={b.image_url}
              alt={b.alt}
              className="w-20 h-14 object-cover rounded"
            />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold truncate">{b.title}</p>
                <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${b.status === "draft" ? "bg-muted text-muted-foreground" : "bg-heroGold/25 text-foreground"}`}>
                  {b.status === "draft" ? "Draft" : "Published"}
                </span>
              </div>
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