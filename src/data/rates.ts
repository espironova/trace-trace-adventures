// Shared rate-card data and helpers used by RateCalculator and BookingModal.
// 2026 rates: Day rate (Full-Day Disposal & Long Distance) covers first 120 km;
// extra km billed at the vehicle's per-km overage rate. Some vehicles are
// inquire-only for day-based services and show a "starting from" indicative price.

export const INCLUDED_KM = 120;

export type DayRate =
  | { type: "fixed"; baseDay: number; perKmOverage: number; includedKm: number }
  | { type: "inquire"; startingFrom: number };

export type RateVehicle = {
  id: string;
  name: string;
  dayRate: DayRate;
  airport: number;
  hotel: number;
  dinner: number;
  cocktail: number;
  standby: number;
  driverAllowance: number;
};

export const vehicles: RateVehicle[] = [
  { id: "noah-5", name: "5-Pax Toyota Noah Minivan", dayRate: { type: "fixed", baseDay: 12000, perKmOverage: 60, includedKm: INCLUDED_KM }, airport: 6000, hotel: 6000, dinner: 8000, cocktail: 8000, standby: 8000, driverAllowance: 2000 },
  { id: "safari-8", name: "8-Pax Safari Land Cruiser", dayRate: { type: "inquire", startingFrom: 25000 }, airport: 15000, hotel: 10000, dinner: 10000, cocktail: 10000, standby: 10000, driverAllowance: 2500 },
  { id: "van-8", name: "8-Pax Safari Van", dayRate: { type: "inquire", startingFrom: 20000 }, airport: 10000, hotel: 12000, dinner: 10000, cocktail: 12000, standby: 12000, driverAllowance: 2000 },
  { id: "coaster-14", name: "14-Pax Van", dayRate: { type: "fixed", baseDay: 14000, perKmOverage: 80, includedKm: INCLUDED_KM }, airport: 7000, hotel: 8000, dinner: 8000, cocktail: 10000, standby: 10000, driverAllowance: 2000 },
  { id: "mercedes-22", name: "22-Pax Coaster Shuttle", dayRate: { type: "fixed", baseDay: 17000, perKmOverage: 100, includedKm: INCLUDED_KM }, airport: 12000, hotel: 12000, dinner: 12000, cocktail: 12000, standby: 12000, driverAllowance: 2500 },
  { id: "bus-33", name: "33/37-Pax Mercedes Bus", dayRate: { type: "fixed", baseDay: 23000, perKmOverage: 130, includedKm: INCLUDED_KM }, airport: 15000, hotel: 15000, dinner: 15000, cocktail: 15000, standby: 15000, driverAllowance: 3000 },
  { id: "bus-45", name: "45-Pax Mercedes Bus", dayRate: { type: "fixed", baseDay: 35000, perKmOverage: 150, includedKm: INCLUDED_KM }, airport: 18000, hotel: 18000, dinner: 18000, cocktail: 15000, standby: 25000, driverAllowance: 4000 },
];

export const serviceTypes = [
  { id: "fullDay", name: "Full-Day Disposal" },
  { id: "longDist", name: "Long Distance" },
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
  /** True when this combo cannot produce a calculated price. */
  inquire: boolean;
  /** Indicative starting price for inquire combos (per day). */
  startingFrom?: number;
};

const DAY_SERVICES = new Set(["fullDay", "longDist"]);

export function isDayService(serviceId: string) {
  return DAY_SERVICES.has(serviceId);
}

export function getServiceMeta(vehicleId: string, serviceId: string) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const dayService = isDayService(serviceId);
  const inquire = !!(vehicle && dayService && vehicle.dayRate.type === "inquire");
  // For day-based services we always offer the km input (optional, defaults to 120).
  const needsKm = dayService && !inquire;
  const needsDays = dayService || serviceId === "standby";
  return { vehicle, isDayService: dayService, needsKm, needsDays, inquire };
}

export function calculateEstimate(input: EstimateInput): Estimate | null {
  const { vehicleId, serviceId } = input;
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const service = serviceTypes.find((s) => s.id === serviceId);
  if (!vehicle || !service) return null;

  const numDays = Math.max(1, parseInt(String(input.days ?? "1")) || 1);
  const dayService = isDayService(serviceId);
  const driverAllowance = vehicle.driverAllowance * numDays;

  // Inquire-only day services -> no calculated price.
  if (dayService && vehicle.dayRate.type === "inquire") {
    return {
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      serviceId: service.id,
      serviceName: service.name,
      baseCost: 0,
      driverAllowance,
      total: 0,
      breakdown: `Custom quote required for ${vehicle.name}.`,
      needsKm: false,
      needsDays: true,
      inquire: true,
      startingFrom: vehicle.dayRate.startingFrom,
    };
  }

  let baseCost = 0;
  let breakdown = "";

  if (dayService && vehicle.dayRate.type === "fixed") {
    const { baseDay, perKmOverage, includedKm } = vehicle.dayRate;
    const rawKm = parseInt(String(input.km ?? "")) || 0;
    const km = Math.max(0, rawKm);
    const extraKm = km > includedKm ? km - includedKm : 0;
    const perDay = baseDay + extraKm * perKmOverage;
    baseCost = perDay * numDays;
    if (extraKm > 0) {
      breakdown = `${baseDay.toLocaleString()} base + ${extraKm} km extra x ${perKmOverage} = ${perDay.toLocaleString()} / day x ${numDays} day(s)`;
    } else {
      breakdown = `${baseDay.toLocaleString()} KES / day (first ${includedKm} km included) x ${numDays} day(s)`;
    }
  } else {
    const rate = vehicle[serviceId as keyof RateVehicle];
    if (typeof rate !== "number") return null;
    baseCost = rate * numDays;
    breakdown = numDays > 1
      ? `${rate.toLocaleString()} KES x ${numDays} day(s)`
      : `${rate.toLocaleString()} KES`;
  }

  return {
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    serviceId: service.id,
    serviceName: service.name,
    baseCost,
    driverAllowance,
    total: baseCost + driverAllowance,
    breakdown,
    needsKm: dayService,
    needsDays: dayService || serviceId === "standby",
    inquire: false,
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
  if (t.includes("noah") || t.includes("5-pax") || t.includes("5 pax") || t.includes("sedan")) return "noah-5";
  if (t.includes("safari van") || t.includes("hiace") || t.includes("nv350") || t.includes("nissan")) return "van-8";
  if (t.includes("golden dragon")) return "bus-45";
  if (t.includes("mercedes")) return "bus-33";
  if (t.includes("van")) return "van-8";
  if (t.includes("bus")) return "bus-33";
  return null;
}
