"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner";

type Unit = {
  id: string;
  model_key: string;
  model_name: string;
  registration: string;
  capacity: string;
  ideal_for: string;
  features: string[];
  alt: string;
  images: string[];
  sort_order: number;
};

const empty: Omit<Unit, "id"> = {
  model_key: "custom",
  model_name: "",
  registration: "Registration on request",
  capacity: "",
  ideal_for: "",
  features: [],
  alt: "",
  images: [],
  sort_order: 100,
};

export default function FleetManager() {
  const [items, setItems] = useState<Unit[]>([]);
  const [editing, setEditing] = useState<Unit | null>(null);
  const [form, setForm] = useState<Omit<Unit, "id">>(empty);
  const [featuresText, setFeaturesText] = useState("");

  async function load() {
    const { data, error } = await supabase.from("fleet_units").select("*").order("sort_order").order("created_at");
    if (error) toast.error(error.message); else setItems(data as Unit[]);
  }
  useEffect(() => { load(); }, []);

  function startEdit(u: Unit) {
    setEditing(u);
    setForm({ ...u });
    setFeaturesText(u.features.join("\n"));
  }
  function reset() { setEditing(null); setForm(empty); setFeaturesText(""); }

  async function save() {
    if (!form.model_name || !form.capacity) return toast.error("Model name and capacity required");
    const payload = { ...form, features: featuresText.split("\n").map(s => s.trim()).filter(Boolean) };
    if (editing) {
      const { error } = await supabase.from("fleet_units").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Vehicle updated");
    } else {
      const { error } = await supabase.from("fleet_units").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Vehicle added");
    }
    reset(); load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this vehicle?")) return;
    const { error } = await supabase.from("fleet_units").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border p-6 rounded-md space-y-4">
        <h3 className="font-serif text-xl">{editing ? "Edit vehicle" : "Add new vehicle"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Model name</Label><Input value={form.model_name} onChange={e => setForm({ ...form, model_name: e.target.value })} /></div>
          <div><Label>Registration</Label><Input value={form.registration} onChange={e => setForm({ ...form, registration: e.target.value })} /></div>
          <div><Label>Capacity (e.g. "14 passengers")</Label><Input value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} /></div>
          <div><Label>Ideal for</Label><Input value={form.ideal_for} onChange={e => setForm({ ...form, ideal_for: e.target.value })} /></div>
          <div className="md:col-span-2"><Label>Features (one per line)</Label><Textarea rows={4} value={featuresText} onChange={e => setFeaturesText(e.target.value)} placeholder="Air conditioning&#10;Reclining seats" /></div>
          <div className="md:col-span-2"><Label>Image alt text</Label><Input value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} /></div>
          <div className="md:col-span-2">
            <Label>Photos</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.images.map((src, i) => (
                <div key={i} className="relative">
                  <Image
          src={src}
          alt=""
          width={180}
          height={64}
          className="w-24 h-20 object-cover rounded w-auto"
        />
                  <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs">×</button>
                </div>
              ))}
            </div>
            <ImageUpload onUploaded={(url) => setForm({ ...form, images: [...form.images, url] })} label="Add photo" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={save}>{editing ? "Save changes" : "Add vehicle"}</Button>
          {editing && <Button variant="outline" onClick={reset}>Cancel</Button>}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-xl">Admin-added vehicles ({items.length})</h3>
        <p className="text-sm text-muted-foreground">The original built-in fleet is always shown on the Fleet page. New vehicles you add here appear alongside them.</p>
        {items.map(u => (
          <div key={u.id} className="flex items-center gap-4 bg-card border border-border p-3 rounded">
            {u.images[0] && <Image
          src={u.images[0]}
          alt={u.alt}
          width={180}
          height={64}
          className="w-20 h-14 object-cover rounded w-auto"
        />}
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{u.model_name}</p>
              <p className="text-xs text-muted-foreground">{u.registration} • {u.capacity}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => startEdit(u)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => remove(u.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}