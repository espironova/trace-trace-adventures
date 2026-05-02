// Shared rate-card data and helpers used by RateCalculator and BookingModal.

export type LongDistRate =
  | { type: "perKm"; rate: number; minKm: number }
  | { type: "perDay"; rate: number };

export type RateVehicle = {
  id: string;
  name: string;
  longDist: LongDistRate;
  fullDay: number;
  airport: number;
  hotel: number;
  dinner: number;
  cocktail: number;
  standby: number;
  driverAllowance: number;
};

export const vehicles: RateVehicle[] = [
  { id: "safari-8", name: "8-Pax Safari Land Cruiser", longDist: { type: "perDay", rate: 25000 }, fullDay: 25000, airport: 15000, hotel: 10000, dinner: 10000, cocktail: 10000, standby: 10000, driverAllowance: 2500 },
  { id: "van-8", name: "8-Pax Safari Van", longDist: { type: "perKm", rate: 130, minKm: 120 }, fullDay: 20000, airport: 10000, hotel: 12000, dinner: 10000, cocktail: 12000, standby: 12000, driverAllowance: 2000 },
  { id: "coaster-14", name: "14-Pax Van", longDist: { type: "perKm", rate: 60, minKm: 120 }, fullDay: 12000, airport: 7000, hotel: 8000, dinner: 8000, cocktail: 10000, standby: 10000, driverAllowance: 2000 },
  { id: "mercedes-22", name: "22-Pax Coaster Shuttle", longDist: { type: "perKm", rate: 100, minKm: 120 }, fullDay: 17000, airport: 12000, hotel: 12000, dinner: 12000, cocktail: 12000, standby: 12000, driverAllowance: 2500 },
  { id: "bus-33", name: "33/37-Pax Mercedes Bus", longDist: { type: "perKm", rate: 130, minKm: 120 }, fullDay: 20000, airport: 15000, hotel: 15000, dinner: 15000, cocktail: 15000, standby: 15000, driverAllowance: 3000 },
  { id: "bus-45", name: "45-Pax Mercedes Bus", longDist: { type: "perKm", rate: 150, minKm: 120 }, fullDay: 30000, airport: 18000, hotel: 18000, dinner: 18000, cocktail: 15000, standby: 25000, driverAllowance: 4000 },
];

export const serviceTypes = [
  { id: "longDist", name: "Long Distance" },
  { id: "fullDay", name: "Full-Day Disposal" },
  { id: "airport", name: "Airport Transfer" },
  { id: "hotel", name: "Hotel-to-Hotel Transfer" },
  { id: "dinner", name: "Dinner Transport" },
  { id: "cocktail", name: "Corporate Cocktail" },
  { id: "standby", name: "Standby" },
] as const;

export type ServiceId = typeof serviceTypes[number]["id"];

export type EstimateInput = {
  vehicleId: string;
  serviceId: string;
  km?: string | number;
  days?: string | number;
};

export type Estimate = {
  vehicleId: string;
  vehicleName: string;
  serviceId: string;
  serviceName: string;
  baseCost: number;
  driverAllowance: number;
  total: number;
  breakdown: string;
  needsKm: boolean;
  needsDays: boolean;
};

export function getServiceMeta(vehicleId: string, serviceId: string) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const isLongDist = serviceId === "longDist";
  const needsKm = isLongDist && vehicle?.longDist.type === "perKm";
  const needsDays = isLongDist || serviceId === "fullDay" || serviceId === "standby";
  return { vehicle, isLongDist, needsKm: !!needsKm, needsDays };
}

export function calculateEstimate(input: EstimateInput): Estimate | null {
  const { vehicleId, serviceId } = input;
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const service = serviceTypes.find((s) => s.id === serviceId);
  if (!vehicle || !service) return null;

  const numDays = Math.max(1, parseInt(String(input.days ?? "1")) || 1);
  const isLongDist = serviceId === "longDist";
  const needsKm = isLongDist && vehicle.longDist.type === "perKm";
  const needsDays = isLongDist || serviceId === "fullDay" || serviceId === "standby";

  let baseCost = 0;
  let breakdown = "";

  if (isLongDist) {
    const ld = vehicle.longDist;
    if (ld.type === "perKm") {
      const numKm = Math.max(ld.minKm || 120, parseInt(String(input.km ?? "0")) || 0);
      baseCost = ld.rate * numKm * numDays;
      breakdown = `${ld.rate.toLocaleString()} KES/km x ${numKm} km x ${numDays} day(s)`;
    } else {
      baseCost = ld.rate * numDays;
      breakdown = `${ld.rate.toLocaleString()} KES/day x ${numDays} day(s)`;
    }
  } else {
    const rate = vehicle[serviceId as keyof RateVehicle] as number;
    if (typeof rate !== "number") return null;
    baseCost = rate * numDays;
    breakdown = numDays > 1 ? `${rate.toLocaleString()} KES x ${numDays} day(s)` : `${rate.toLocaleString()} KES`;
  }

  const driverAllowance = vehicle.driverAllowance * numDays;

  return {
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    serviceId: service.id,
    serviceName: service.name,
    baseCost,
    driverAllowance,
    total: baseCost + driverAllowance,
    breakdown,
    needsKm,
    needsDays,
  };
}

/**
 * Map a free-form vehicle label (from BookingModal vehicle dropdown or fleet
 * registration label like "Toyota Hiace - KCR 090X") to a rate-card vehicle id.
 * Returns null when no confident match exists.
 */
export function matchRateVehicle(vehicleType: string | undefined | null): string | null {
  if (!vehicleType) return null;
  const t = vehicleType.toLowerCase();

  // Order matters: more specific keywords checked first.
  if (t.includes("45")) return "bus-45";
  if (t.includes("33") || t.includes("37")) return "bus-33";
  if (t.includes("22") || t.includes("coaster") || t.includes("isuzu")) return "mercedes-22";
  if (t.includes("14")) return "coaster-14";
  if (t.includes("land cruiser") || t.includes("landcruiser")) return "safari-8";
  if (t.includes("ford") || t.includes("ranger")) return "safari-8";
  if (t.includes("safari van") || t.includes("hiace") || t.includes("nv350") || t.includes("nissan")) return "van-8";
  if (t.includes("noah") || t.includes("sedan")) return "van-8";
  if (t.includes("golden dragon")) return "bus-45";
  if (t.includes("mercedes")) return "bus-33";
  if (t.includes("van")) return "van-8";
  if (t.includes("bus")) return "bus-33";
  return null;
}
