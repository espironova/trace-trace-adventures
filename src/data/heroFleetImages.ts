import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetVan from "@/assets/fleet-van.jpg";
import fleetLandcruiser from "@/assets/fleet-landcruiser.jpg";
import fleetBus from "@/assets/fleet-bus.jpg";
import fleetCoasterExt from "@/assets/fleet-coaster-ext.jpg";
import fleetInterior from "@/assets/fleet-interior.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";
import fleetGoldenDragon from "@/assets/fleet-golden-dragon.jpg";
import fleetFord from "@/assets/fleet-ford.jpg";
import fleetIsuzu from "@/assets/fleet-isuzu.jpg";

/** Canonical marketing image per fleet model; matches home hero where applicable. */
export const heroFleetImageByModelKey: Record<string, string> = {
  "toyota-noah": fleetSedan,
  "nissan-nv350": fleetVan,
  "toyota-land-cruiser": fleetLandcruiser,
  "mercedes-tour-bus": fleetBus,
  "toyota-hiace": fleetHiace,
  "toyota-coaster": fleetCoasterExt,
  "golden-dragon-bus": fleetGoldenDragon,
  "ford-ranger": fleetFord,
  "isuzu-coaster": fleetIsuzu,
};

export function fleetHeroImageForModelKey(modelKey: string, fallback: string): string {
  return heroFleetImageByModelKey[modelKey] ?? fallback;
}

/** Home page hero slideshow — single source for images with HeroSection copy. */
export const homeHeroSlides = [
  {
    image: fleetSedan,
    alt: "Toyota Noah sedan for airport transfers in Nairobi",
    label: "Airport Transfers",
    subtitle: "Seamless JKIA & Wilson Airport pickups with professional drivers",
  },
  {
    image: fleetVan,
    alt: "Nissan NV350 van available for hire across East Africa",
    label: "Car Hire",
    subtitle: "Self-drive and chauffeur-driven vehicles for every occasion",
  },
  {
    image: fleetLandcruiser,
    alt: "Toyota Land Cruiser for safari tours across East Africa",
    label: "Safari Tours",
    subtitle: "Guided adventures to Maasai Mara, Serengeti, Bwindi, and beyond",
  },
  {
    image: fleetBus,
    alt: "Mercedes tour bus for long-distance transport across East Africa",
    label: "Long-Distance Transport",
    subtitle: "Comfortable intercity and cross-border travel in style",
  },
  {
    image: fleetHiace,
    alt: "Toyota Hiace van for Kenya SGR station pickup and drop-off for groups and luggage",
    label: "SGR Transfers",
    subtitle:
      "Road connections to Nairobi Terminus, Syokimau, and Mombasa Terminus—vehicles sized for your group and luggage",
  },
  {
    image: fleetCoasterExt,
    alt: "Toyota Coaster for conference and corporate event transport",
    label: "Conference & Corporate Transport",
    subtitle: "Professional transport for conferences, corporate events, and business travel",
  },
  {
    image: fleetInterior,
    alt: "Comfortable bus interior for school and group transport",
    label: "Schools & Group Transport",
    subtitle: "Reliable school trips, sports events, and group excursions across East Africa",
  },
];
