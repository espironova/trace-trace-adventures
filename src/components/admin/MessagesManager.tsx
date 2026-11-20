"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Phone, Trash2, CheckCircle2, Circle } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  service_label: string;
  message: string;
  status: "new" | "read";
  created_at: string;
};

function when(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessagesManager() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setItems(data as Message[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: "new" | "read") {
    const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message permanently?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Message deleted");
    load();
  }

  const unread = items.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-serif text-xl">
          Messages ({items.length})
          {unread > 0 && (
            <span className="ml-3 inline-block bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {unread} new
            </span>
          )}
        </h3>
        <Button variant="outline" size="sm" onClick={load}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading messages...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-dashed border-border p-8 text-center rounded-md">
          No messages yet. Messages sent from the Contact page appear here.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((m) => (
            <div
              key={m.id}
              className={`bg-card border p-5 rounded-md space-y-3 ${
                m.status === "new" ? "border-accent" : "border-border"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm">{m.name}</span>
                    <span className="text-xs uppercase tracking-wider text-accent font-bold">{m.service_label}</span>
                    {m.status === "new" && (
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{when(m.created_at)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStatus(m.id, m.status === "new" ? "read" : "new")}
                  >
                    {m.status === "new" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Mark read
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 mr-1" /> Mark new
                      </>
                    )}
                  </Button>
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + m.service_label)}`}>
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-1" /> Reply
                    </Button>
                  </a>
                  <Button size="sm" variant="destructive" onClick={() => remove(m.id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>

              <p className="text-sm whitespace-pre-wrap border-t border-border pt-3">{m.message}</p>

              <div className="flex flex-wrap gap-4 text-sm pt-1">
                <a href={`mailto:${m.email}`} className="text-accent hover:underline inline-flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> {m.email}
                </a>
                {m.phone && (
                  <a href={`tel:${m.phone}`} className="text-accent hover:underline inline-flex items-center gap-1.5">
                    <Phone className="w-4 h-4" /> {m.phone}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
