"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Rate = {
  id: string;
  vehicle_key: string;
  name: string;
  sort_order: number;
  day_rate_type: "fixed" | "inquire";
  base_day: number;
  per_km_overage: number;
  included_km: number;
  starting_from: number;
  airport: number;
  hotel: number;
  dinner: number;
  cocktail: number;
  standby: number;
  driver_allowance: number;
};

const empty: Omit<Rate, "id"> = {
  vehicle_key: "",
  name: "",
  sort_order: 0,
  day_rate_type: "fixed",
  base_day: 0,
  per_km_overage: 0,
  included_km: 120,
  starting_from: 0,
  airport: 0,
  hotel: 0,
  dinner: 0,
  cocktail: 0,
  standby: 0,
  driver_allowance: 0,
};

export default function RatesManager() {
  const [items, setItems] = useState<Rate[]>([]);
  const [editing, setEditing] = useState<Rate | null>(null);
  const [form, setForm] = useState<Omit<Rate, "id">>(empty);

  async function load() {
    const { data, error } = await supabase.from("vehicle_rates").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setItems(data as Rate[]);
  }
  useEffect(() => { load(); }, []);

  function startEdit(r: Rate) {
    setEditing(r);
    const { id, ...rest } = r;
    setForm(rest);
  }
  function reset() { setEditing(null); setForm(empty); }

  function num(v: string) { return Number(v) || 0; }

  async function save() {
    if (!form.vehicle_key.trim() || !form.name.trim()) {
      return toast.error("Vehicle key and name are required");
    }
    if (editing) {
      const { error } = await supabase.from("vehicle_rates").update(form).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Rate updated");
    } else {
      const { error } = await supabase.from("vehicle_rates").insert(form);
      if (error) return toast.error(error.message);
      toast.success("Vehicle added");
    }
    reset(); load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this vehicle rate row?")) return;
    const { error } = await supabase.from("vehicle_rates").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  const isFixed = form.day_rate_type === "fixed";

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border p-6 rounded-md space-y-4">
        <h3 className="font-serif text-xl">{editing ? `Edit ${editing.name}` : "Add new vehicle"}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Vehicle key (slug)</Label>
            <Input value={form.vehicle_key} disabled={!!editing} onChange={e => setForm({ ...form, vehicle_key: e.target.value })} placeholder="e.g. noah-5" />
          </div>
          <div className="md:col-span-2">
            <Label>Display name</Label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Sort order</Label>
            <Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: num(e.target.value) })} />
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-4">
          <div>
            <Label>Day rate type</Label>
            <select
              value={form.day_rate_type}
              onChange={e => setForm({ ...form, day_rate_type: e.target.value as "fixed" | "inquire" })}
              className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
            >
              <option value="fixed">Fixed (calculated price)</option>
              <option value="inquire">Inquire only (starting-from price)</option>
            </select>
          </div>

          {isFixed ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Base day rate (KES)</Label>
                <Input type="number" value={form.base_day} onChange={e => setForm({ ...form, base_day: num(e.target.value) })} />
              </div>
              <div>
                <Label>Per km overage (KES)</Label>
                <Input type="number" value={form.per_km_overage} onChange={e => setForm({ ...form, per_km_overage: num(e.target.value) })} />
              </div>
              <div>
                <Label>Included km / day</Label>
                <Input type="number" value={form.included_km} onChange={e => setForm({ ...form, included_km: num(e.target.value) })} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Starting from (KES / day)</Label>
                <Input type="number" value={form.starting_from} onChange={e => setForm({ ...form, starting_from: num(e.target.value) })} />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><Label>Airport transfer</Label><Input type="number" value={form.airport} onChange={e => setForm({ ...form, airport: num(e.target.value) })} /></div>
          <div><Label>Hotel transfer</Label><Input type="number" value={form.hotel} onChange={e => setForm({ ...form, hotel: num(e.target.value) })} /></div>
          <div><Label>Dinner</Label><Input type="number" value={form.dinner} onChange={e => setForm({ ...form, dinner: num(e.target.value) })} /></div>
          <div><Label>Cocktail</Label><Input type="number" value={form.cocktail} onChange={e => setForm({ ...form, cocktail: num(e.target.value) })} /></div>
          <div><Label>Standby</Label><Input type="number" value={form.standby} onChange={e => setForm({ ...form, standby: num(e.target.value) })} /></div>
          <div><Label>Driver allowance / day</Label><Input type="number" value={form.driver_allowance} onChange={e => setForm({ ...form, driver_allowance: num(e.target.value) })} /></div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={save}>{editing ? "Save changes" : "Add vehicle"}</Button>
          {editing && <Button variant="outline" onClick={reset}>Cancel</Button>}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-xl">Vehicle rates ({items.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted text-left">
                <th className="px-3 py-2">Vehicle</th>
                <th className="px-3 py-2 text-right">Day</th>
                <th className="px-3 py-2 text-right">/km</th>
                <th className="px-3 py-2 text-right">Airport</th>
                <th className="px-3 py-2 text-right">Hotel</th>
                <th className="px-3 py-2 text-right">Dinner</th>
                <th className="px-3 py-2 text-right">Cocktail</th>
                <th className="px-3 py-2 text-right">Standby</th>
                <th className="px-3 py-2 text-right">Driver</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map(r => (
                <tr key={r.id} className="border-b border-border">
                  <td className="px-3 py-2">
                    <div className="font-bold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.vehicle_key}</div>
                  </td>
                  <td className="px-3 py-2 text-right">{r.day_rate_type === "fixed" ? r.base_day.toLocaleString() : `From ${r.starting_from.toLocaleString()}`}</td>
                  <td className="px-3 py-2 text-right">{r.day_rate_type === "fixed" ? r.per_km_overage : "—"}</td>
                  <td className="px-3 py-2 text-right">{r.airport.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{r.hotel.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{r.dinner.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{r.cocktail.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">{r.standby.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-accent font-bold">{r.driver_allowance.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <Button size="sm" variant="outline" onClick={() => startEdit(r)}>Edit</Button>
                    <Button size="sm" variant="destructive" className="ml-2" onClick={() => remove(r.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}