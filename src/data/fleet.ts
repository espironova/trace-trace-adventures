import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetNoahBoot from "@/assets/fleet-noah-boot.jpg";
import fleetCoaster from "@/assets/fleet-coaster.jpg";
import fleetCoasterIntBlue from "@/assets/fleet-coaster-int-blue.jpg";
import fleetCoasterInt2 from "@/assets/fleet-coaster-int-2.jpg";
import fleetVan from "@/assets/fleet-van.jpg";
import fleetNv350Interior from "@/assets/fleet-nv350-interior.jpg";
import fleetNv350Int2 from "@/assets/fleet-nv350-int-2.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";
import fleetHiaceInterior from "@/assets/fleet-hiace-interior.jpg";
import fleetFord from "@/assets/fleet-ford.jpg";
import fleetBus from "@/assets/fleet-bus.jpg";
import fleetMercedesInterior from "@/assets/fleet-mercedes-interior.jpg";
import fleetBusInterior from "@/assets/fleet-bus-interior.jpg";
import fleetLandcruiser from "@/assets/fleet-landcruiser.jpg";
import fleetGoldenDragon from "@/assets/fleet-golden-dragon.jpg";
import fleetGoldenInterior from "@/assets/fleet-golden-interior.jpg";
import fleetGoldenInt2 from "@/assets/fleet-golden-int-2.jpg";
import fleetIsuzu from "@/assets/fleet-isuzu.jpg";
import fleetIsuzuRear from "@/assets/fleet-isuzu-rear.jpg";
import fleetIsuzuInterior from "@/assets/fleet-isuzu-interior.jpg";

export type FleetUnit = {
  id: string;
  /** Dedupes hero carousel to one slide per model */
  modelKey: string;
  modelName: string;
  registration: string;
  images: string[];
  alt: string;
  capacity: string;
  idealFor: string;
  features: string[];
};

const mercedesImages = [fleetBus, fleetMercedesInterior, fleetBusInterior];
const goldenImages = [fleetGoldenDragon, fleetGoldenInterior, fleetGoldenInt2];
const fordImages = [fleetFord];
const landCruiserImages = [fleetLandcruiser];
const noahImages = [fleetSedan, fleetNoahBoot];
const coasterImages = [fleetCoaster, fleetCoasterIntBlue, fleetCoasterInt2];
const isuzuImages = [fleetIsuzu, fleetIsuzuRear, fleetIsuzuInterior];
const hiaceImages = [fleetHiace, fleetHiaceInterior];
const nissanImages = [fleetVan, fleetNv350Interior, fleetNv350Int2];

/** One row per registered vehicle; same model reuses imagery. */
export const fleetUnits: FleetUnit[] = [
  {
    id: "kcu-249x",
    modelKey: "mercedes-tour-bus",
    modelName: "Mercedes Tour Bus",
    registration: "KCU 249X",
    images: mercedesImages,
    alt: "Mercedes tour bus for long-distance transfers and corporate transport in Kenya",
    capacity: "33–45 passengers",
    idealFor: "Long-distance transfers, corporate events, wedding transport",
    features: ["Reclining seats", "Air conditioning", "Entertainment system", "Generous luggage bay"],
  },
  {
    id: "kcu-955s",
    modelKey: "mercedes-tour-bus",
    modelName: "Mercedes Tour Bus",
    registration: "KCU 955S",
    images: mercedesImages,
    alt: "Mercedes tour bus for long-distance transfers and corporate transport in Kenya",
    capacity: "33–45 passengers",
    idealFor: "Long-distance transfers, corporate events, wedding transport",
    features: ["Reclining seats", "Air conditioning", "Entertainment system", "Generous luggage bay"],
  },
  {
    id: "kdr-982m",
    modelKey: "mercedes-tour-bus",
    modelName: "Mercedes Tour Bus",
    registration: "KDR 982M",
    images: mercedesImages,
    alt: "Mercedes tour bus for long-distance transfers and corporate transport in Kenya",
    capacity: "33–45 passengers",
    idealFor: "Long-distance transfers, corporate events, wedding transport",
    features: ["Reclining seats", "Air conditioning", "Entertainment system", "Generous luggage bay"],
  },
  {
    id: "kdn-267x",
    modelKey: "mercedes-tour-bus",
    modelName: "Mercedes Tour Bus",
    registration: "KDN 267X",
    images: mercedesImages,
    alt: "Mercedes tour bus for long-distance transfers and corporate transport in Kenya",
    capacity: "33–45 passengers",
    idealFor: "Long-distance transfers, corporate events, wedding transport",
    features: ["Reclining seats", "Air conditioning", "Entertainment system", "Generous luggage bay"],
  },
  {
    id: "golden-dragon-1",
    modelKey: "golden-dragon-bus",
    modelName: "Golden Dragon Bus",
    registration: "Registration on request",
    images: goldenImages,
    alt: "Golden Dragon luxury bus for long distance transport in Kenya",
    capacity: "45–55 passengers",
    idealFor: "Large group transfers, intercity travel, events",
    features: ["Luxury reclining seats", "Air conditioning", "Spacious luggage bay", "Entertainment system"],
  },
  {
    id: "kdb-021n",
    modelKey: "ford-ranger",
    modelName: "Ford Ranger 4x4",
    registration: "KDB 021N",
    images: fordImages,
    alt: "Ford Ranger 4x4 pickup for off-road adventures and safari in Kenya",
    capacity: "2–4 passengers",
    idealFor: "Off-road adventures, safari expeditions, rough terrain",
    features: ["Four-wheel drive", "Rugged off-road capability", "Spacious cabin", "Tow-ready"],
  },
  {
    id: "kbv-403a",
    modelKey: "toyota-land-cruiser",
    modelName: "Toyota Land Cruiser",
    registration: "KBV 403A",
    images: landCruiserImages,
    alt: "Toyota Land Cruiser 4x4 safari vehicle for guided tours in Maasai Mara Kenya",
    capacity: "4–6 passengers",
    idealFor: "Safari expeditions, luxury tours, rough terrain",
    features: ["Four-wheel drive", "Pop-up roof", "Fridge/cooler box", "Professional guide seat"],
  },
  {
    id: "kdr-090k",
    modelKey: "toyota-noah",
    modelName: "Toyota Noah",
    registration: "KDR 090K",
    images: noahImages,
    alt: "White Toyota Noah for airport transfers and city transport in Nairobi",
    capacity: "1–6 passengers",
    idealFor: "Airport transfers, business trips, city tours",
    features: ["Air conditioning", "Comfortable seating", "Luggage space", "Fuel efficient"],
  },
  {
    id: "kct-963j",
    modelKey: "toyota-coaster",
    modelName: "Toyota Coaster",
    registration: "KCT 963J",
    images: coasterImages,
    alt: "Toyota Coaster bus for group transport and corporate events in Kenya",
    capacity: "25–29 passengers",
    idealFor: "Large groups, corporate events, conferences",
    features: ["Reclining seats", "PA system", "Air conditioning", "Generous luggage compartment"],
  },
  {
    id: "kcw-515z",
    modelKey: "toyota-coaster",
    modelName: "Toyota Coaster",
    registration: "KCW 515Z",
    images: coasterImages,
    alt: "Toyota Coaster bus for group transport and corporate events in Kenya",
    capacity: "25–29 passengers",
    idealFor: "Large groups, corporate events, conferences",
    features: ["Reclining seats", "PA system", "Air conditioning", "Generous luggage compartment"],
  },
  {
    id: "kcb-785t",
    modelKey: "toyota-coaster",
    modelName: "Toyota Coaster",
    registration: "KCB 785T",
    images: coasterImages,
    alt: "Toyota Coaster bus for group transport and corporate events in Kenya",
    capacity: "25–29 passengers",
    idealFor: "Large groups, corporate events, conferences",
    features: ["Reclining seats", "PA system", "Air conditioning", "Generous luggage compartment"],
  },
  {
    id: "kds-927n",
    modelKey: "isuzu-coaster",
    modelName: "Isuzu Coaster",
    registration: "KDS 927N",
    images: isuzuImages,
    alt: "Isuzu Coaster bus for group transport and corporate shuttles in Kenya",
    capacity: "25–29 passengers",
    idealFor: "Group transport, school trips, corporate shuttles",
    features: ["Comfortable seating", "Air conditioning", "Spacious interior", "Reliable performance"],
  },
  {
    id: "kcr-090x",
    modelKey: "toyota-hiace",
    modelName: "Toyota Hiace",
    registration: "KCR 090X",
    images: hiaceImages,
    alt: "Toyota Hiace safari van for tour groups and safari trips in Kenya",
    capacity: "7–14 passengers",
    idealFor: "Safari tours, group travel, sightseeing",
    features: ["Pop-up roof option", "Extended leg room", "Charging ports", "Large luggage area"],
  },
  {
    id: "kcn-030m",
    modelKey: "nissan-nv350",
    modelName: "Nissan NV350",
    registration: "KCN 030M",
    images: nissanImages,
    alt: "Nissan NV350 van for car hire and group travel in Nairobi Kenya",
    capacity: "8–14 passengers",
    idealFor: "Group travel, hotel shuttles, family trips",
    features: ["Sliding doors", "Spacious interior", "Air conditioning", "Comfortable seating"],
  },
  {
    id: "kdl-731t",
    modelKey: "nissan-nv350",
    modelName: "Nissan NV350",
    registration: "KDL 731T",
    images: nissanImages,
    alt: "Nissan NV350 van for car hire and group travel in Nairobi Kenya",
    capacity: "8–14 passengers",
    idealFor: "Group travel, hotel shuttles, family trips",
    features: ["Sliding doors", "Spacious interior", "Air conditioning", "Comfortable seating"],
  },
];

/** One representative unit per model for the hero carousel (avoids 15 dots). */
export const fleetHeroSlides: FleetUnit[] = (() => {
  const seen = new Set<string>();
  const out: FleetUnit[] = [];
  for (const u of fleetUnits) {
    if (seen.has(u.modelKey)) continue;
    seen.add(u.modelKey);
    out.push(u);
  }
  return out;
})();

export function fleetBookingLabel(unit: FleetUnit): string {
  return `${unit.modelName} — ${unit.registration}`;
}
