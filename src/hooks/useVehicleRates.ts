"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { vehicles as fallback, type RateVehicle } from "@/data/rates";

type Row = {
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

function rowToVehicle(r: Row): RateVehicle {
  return {
    id: r.vehicle_key,
    name: r.name,
    dayRate:
      r.day_rate_type === "fixed"
        ? { type: "fixed", baseDay: r.base_day, perKmOverage: r.per_km_overage, includedKm: r.included_km }
        : { type: "inquire", startingFrom: r.starting_from },
    airport: r.airport,
    hotel: r.hotel,
    dinner: r.dinner,
    cocktail: r.cocktail,
    standby: r.standby,
    driverAllowance: r.driver_allowance,
  };
}

export function useVehicleRates() {
  const [vehicles, setVehicles] = useState<RateVehicle[]>(fallback);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data, error } = await supabase
      .from("vehicle_rates")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data && data.length) {
      setVehicles(data.map((r) => rowToVehicle(r as Row)));
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    const channel = supabase
      .channel("vehicle_rates_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "vehicle_rates" }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { vehicles, loading };
}