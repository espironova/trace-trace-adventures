import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetNoahBoot from "@/assets/fleet-noah-boot.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";
import fleetHiaceInterior from "@/assets/fleet-hiace-interior.jpg";
import fleetFord from "@/assets/fleet-ford.jpg";
import fleetLandcruiser from "@/assets/fleet-landcruiser.jpg";
import fleetGoldenDragon from "@/assets/fleet-golden-dragon.jpg";
import fleetGoldenInterior from "@/assets/fleet-golden-interior.jpg";
import fleetGoldenInt2 from "@/assets/fleet-golden-int-2.jpg";
import fleetIsuzu from "@/assets/fleet-isuzu.jpg";
import fleetIsuzuRear from "@/assets/fleet-isuzu-rear.jpg";
import fleetIsuzuInterior from "@/assets/fleet-isuzu-interior.jpg";
import fleetMercedesInterior from "@/assets/fleet-mercedes-interior.jpg";
import fleetCoasterIntBlue from "@/assets/fleet-coaster-int-blue.jpg";
import fleetCoasterInt2 from "@/assets/fleet-coaster-int-2.jpg";
import fleetNv350Int2 from "@/assets/fleet-nv350-int-2.jpg";

import mercedesKcu249x1 from "@/assets/fleet-unit-kcu-249x-1.jpg";
import mercedesKcu249x2 from "@/assets/fleet-unit-kcu-249x-2.jpg";
import mercedesKcu249x3 from "@/assets/fleet-unit-kcu-249x-3.jpg";
import mercedesKcu955s1 from "@/assets/fleet-unit-kcu-955s-1.jpg";
import mercedesKcu955s2 from "@/assets/fleet-unit-kcu-955s-2.jpg";
import mercedesKcu955s3 from "@/assets/fleet-unit-kcu-955s-3.jpg";
import mercedesKdr982m1 from "@/assets/fleet-unit-kdr-982m-1.jpg";
import mercedesKdr982m2 from "@/assets/fleet-unit-kdr-982m-2.jpg";
import mercedesKdr982m3 from "@/assets/fleet-unit-kdr-982m-3.jpg";
import mercedesKdn267x1 from "@/assets/fleet-unit-kdn-267x-1.jpg";
import mercedesKdn267x2 from "@/assets/fleet-unit-kdn-267x-2.jpg";
import mercedesKdn267x3 from "@/assets/fleet-unit-kdn-267x-3.jpg";

import coasterKct963j1 from "@/assets/fleet-unit-kct-963j-1.jpg";
import coasterKct963j2 from "@/assets/fleet-unit-kct-963j-2.jpg";
import coasterKct963j3 from "@/assets/fleet-unit-kct-963j-3.jpg";
import coasterKcw515z1 from "@/assets/fleet-unit-kcw-515z-1.jpg";
import coasterKcw515z2 from "@/assets/fleet-unit-kcw-515z-2.jpg";
import coasterKcw515z3 from "@/assets/fleet-unit-kcw-515z-3.jpg";
import coasterKcb785t1 from "@/assets/fleet-unit-kcb-785t-1.jpg";
import coasterKcb785t2 from "@/assets/fleet-unit-kcb-785t-2.jpg";
import coasterKcb785t3 from "@/assets/fleet-unit-kcb-785t-3.jpg";

import nissanKcn030m1 from "@/assets/fleet-unit-kcn-030m-1.jpg";
import nissanKcn030m2 from "@/assets/fleet-unit-kcn-030m-2.jpg";
import nissanKcn030m3 from "@/assets/fleet-unit-kcn-030m-3.jpg";

import hiaceKcr090x1 from "@/assets/fleet-unit-kcr-090x-1.jpg";
import hiaceKdl731t1 from "@/assets/fleet-unit-kdl-731t-1.jpg";
import nissanKdl731t2 from "@/assets/fleet-unit-kdl-731t-2.jpg";
import nissanKdl731t3 from "@/assets/fleet-unit-kdl-731t-3.jpg";
import hiaceKdp213s1 from "@/assets/fleet-unit-kdp-213s-1.jpg";

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

const goldenImages = [fleetGoldenDragon, fleetGoldenInterior, fleetGoldenInt2];
const fordImages = [fleetFord];
const landCruiserImages = [fleetLandcruiser];
const noahImages = [fleetSedan, fleetNoahBoot];
const isuzuImages = [fleetIsuzu, fleetIsuzuRear, fleetIsuzuInterior];

/** One row per registered vehicle; each unit has its own image set. Smallest to largest by passenger capacity. */
export const fleetUnits: FleetUnit[] = [
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
    id: "kcr-090x",
    modelKey: "toyota-hiace",
    modelName: "Toyota Hiace",
    registration: "KCR 090X",
    images: [hiaceKcr090x1, fleetHiace, fleetHiaceInterior],
    alt: "Toyota Hiace safari van for tour groups and safari trips in Kenya",
    capacity: "7–14 passengers",
    idealFor: "Airport/SGR transfers, Conference & Corporate Transport",
    features: ["Spacious interior", "Extended leg room", "Charging ports", "Top-mounted cargo carrier"],
  },
  {
    id: "kdl-731t",
    modelKey: "toyota-hiace",
    modelName: "Toyota Hiace",
    registration: "KDL 731T",
    images: [hiaceKdl731t1, nissanKdl731t2, nissanKdl731t3, fleetHiaceInterior],
    alt: "Toyota Hiace van for safari tours and group travel in Kenya",
    capacity: "7–14 passengers",
    idealFor: "Game Drives, Safari tours",
    features: ["Pop-up roof option", "Extended leg room", "Charging ports", "Large luggage area"],
  },
  {
    id: "kdp-213s",
    modelKey: "toyota-hiace",
    modelName: "Toyota Hiace 9L High Roof",
    registration: "KDP 213S",
    images: [hiaceKdp213s1],
    alt: "Toyota Hiace 9L high-roof safari van with pop-up roof for game drives in Kenya",
    capacity: "7–14 passengers",
    idealFor: "Game Drives, Safari Tours",
    features: ["Pop-up roof", "High roof wide & long body", "Extended leg room", "Charging ports"],
  },
  {
    id: "kcn-030m",
    modelKey: "nissan-nv350",
    modelName: "Nissan NV350",
    registration: "KCN 030M",
    images: [nissanKcn030m1, nissanKcn030m2, nissanKcn030m3, fleetNv350Int2],
    alt: "Nissan NV350 van for car hire and group travel in Nairobi Kenya",
    capacity: "8–14 passengers",
    idealFor: "Group travel, hotel shuttles, family trips",
    features: ["Sliding doors", "Spacious interior", "Air conditioning", "Comfortable seating"],
  },
  {
    id: "kct-963j",
    modelKey: "toyota-coaster",
    modelName: "Toyota Coaster",
    registration: "KCT 963J",
    images: [coasterKct963j1, coasterKct963j2, coasterKct963j3, fleetCoasterIntBlue, fleetCoasterInt2],
    alt: "Toyota Coaster bus for group transport and corporate events in Kenya",
    capacity: "21 passengers",
    idealFor: "Large groups, corporate events, conferences",
    features: ["Reclining seats", "PA system", "Air conditioning", "Top-mounted cargo carrier"],
  },
  {
    id: "kcw-515z",
    modelKey: "toyota-coaster",
    modelName: "Toyota Coaster",
    registration: "KCW 515Z",
    images: [coasterKcw515z1, coasterKcw515z2, coasterKcw515z3, fleetCoasterIntBlue, fleetCoasterInt2],
    alt: "Toyota Coaster bus for group transport and corporate events in Kenya",
    capacity: "21 passengers",
    idealFor: "Large groups, corporate events, conferences",
    features: ["Reclining seats", "PA system", "Air conditioning", "Top-mounted cargo carrier"],
  },
  {
    id: "kcb-785t",
    modelKey: "toyota-coaster",
    modelName: "Toyota Coaster",
    registration: "KCB 785T",
    images: [coasterKcb785t1, coasterKcb785t2, coasterKcb785t3, fleetCoasterIntBlue, fleetCoasterInt2],
    alt: "Toyota Coaster bus for group transport and corporate events in Kenya",
    capacity: "21 passengers",
    idealFor: "Large groups, corporate events, conferences",
    features: ["Reclining seats", "PA system", "Air conditioning", "Generous luggage compartment"],
  },
  {
    id: "kds-927n",
    modelKey: "toyota-coaster",
    modelName: "Toyota Coaster",
    registration: "KDS 927N",
    images: isuzuImages,
    alt: "Isuzu Coaster bus for group transport and corporate shuttles in Kenya",
    capacity: "25–29 passengers",
    idealFor: "Group transport, school trips, corporate shuttles",
    features: ["Comfortable seating", "Air conditioning", "Spacious interior", "Reliable performance"],
  },
  {
    id: "kcu-249x",
    modelKey: "mercedes-tour-bus",
    modelName: "Mercedes Tour Bus",
    registration: "KCU 249X",
    images: [mercedesKcu249x1, mercedesKcu249x2, mercedesKcu249x3, fleetMercedesInterior],
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
    images: [mercedesKcu955s1, mercedesKcu955s2, mercedesKcu955s3, fleetMercedesInterior],
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
    images: [mercedesKdr982m1, mercedesKdr982m2, mercedesKdr982m3, fleetMercedesInterior],
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
    images: [mercedesKdn267x1, mercedesKdn267x2, mercedesKdn267x3, fleetMercedesInterior],
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
];

export function fleetBookingLabel(unit: FleetUnit): string {
  return `${unit.modelName} — ${unit.registration}`;
}
