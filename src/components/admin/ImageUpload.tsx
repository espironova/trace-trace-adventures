import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ImageUpload({ onUploaded, label = "Upload image" }: { onUploaded: (url: string) => void; label?: string }) {
  const [busy, setBusy] = useState(false);

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("site-images").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      onUploaded(data.publicUrl);
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <label className="inline-block">
      <input type="file" accept="image/*" onChange={handle} className="hidden" disabled={busy} />
      <Button type="button" variant="outline" asChild disabled={busy}>
        <span>{busy ? "Uploading..." : label}</span>
      </Button>
    </label>
  );
}