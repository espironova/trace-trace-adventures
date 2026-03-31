import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import BookingModal from "@/components/BookingModal";
import bgFleetHero from "@/assets/fleet-hero-bg.jpg";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetCoaster from "@/assets/fleet-coaster.jpg";
import fleetVan from "@/assets/fleet-van.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";
import fleetFord from "@/assets/fleet-ford.jpg";
import fleetBus from "@/assets/fleet-bus.jpg";
import fleetLandcruiser from "@/assets/fleet-landcruiser.jpg";
import fleetGoldenDragon from "@/assets/fleet-golden-dragon.jpg";
import { ArrowRight } from "lucide-react";

const vehicles = [
  {
    name: "Toyota Noah",
    image: fleetSedan,
    alt: "White Toyota Noah sedan for airport transfers and city transport in Nairobi",
    capacity: "1–6 passengers",
    idealFor: "Airport transfers, business trips, city tours",
    features: ["Air conditioning", "Comfortable seating", "Luggage space", "Fuel efficient"],
  },
  {
    name: "Toyota Coaster",
    image: fleetCoaster,
    alt: "Toyota Coaster bus for group transport and corporate events in Kenya",
    capacity: "25–29 passengers",
    idealFor: "Large groups, corporate events, conferences",
    features: ["Reclining seats", "PA system", "Air conditioning", "Generous luggage compartment"],
  },
  {
    name: "Nissan NV350",
    image: fleetVan,
    alt: "Nissan NV350 van for car hire and group travel in Nairobi Kenya",
    capacity: "8–14 passengers",
    idealFor: "Group travel, hotel shuttles, family trips",
    features: ["Sliding doors", "Spacious interior", "Air conditioning", "Comfortable seating"],
  },
  {
    name: "Toyota Hiace",
    image: fleetHiace,
    alt: "Toyota Hiace safari van for tour groups and safari trips in Kenya",
    capacity: "7–14 passengers",
    idealFor: "Safari tours, group travel, sightseeing",
    features: ["Pop-up roof option", "Extended leg room", "Charging ports", "Large luggage area"],
  },
  {
    name: "Ford Ranger 4x4",
    image: fleetFord,
    alt: "Ford Ranger 4x4 pickup for off-road adventures and safari in Kenya",
    capacity: "2–4 passengers",
    idealFor: "Off-road adventures, safari expeditions, rough terrain",
    features: ["Four-wheel drive", "Rugged off-road capability", "Spacious cabin", "Tow-ready"],
  },
  {
    name: "Mercedes Tour Bus",
    image: fleetBus,
    alt: "Mercedes tour bus for long-distance transfers and corporate transport in Kenya",
    capacity: "33–45 passengers",
    idealFor: "Long-distance transfers, corporate events, wedding transport",
    features: ["Reclining seats", "Air conditioning", "Entertainment system", "Generous luggage bay"],
  },
  {
    name: "Toyota Land Cruiser",
    image: fleetLandcruiser,
    alt: "Toyota Land Cruiser 4x4 safari vehicle for guided tours in Maasai Mara Kenya",
    capacity: "4–6 passengers",
    idealFor: "Safari expeditions, luxury tours, rough terrain",
    features: ["Four-wheel drive", "Pop-up roof", "Fridge/cooler box", "Professional guide seat"],
  },
  {
    name: "Golden Dragon Bus",
    image: fleetGoldenDragon,
    alt: "Golden Dragon luxury bus for long distance transport in Kenya",
    capacity: "45–55 passengers",
    idealFor: "Large group transfers, intercity travel, events",
    features: ["Luxury reclining seats", "Air conditioning", "Spacious luggage bay", "Entertainment system"],
  },
];

const Fleet = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const nextHero = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % vehicles.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextHero, 3500);
    return () => clearInterval(timer);
  }, [nextHero]);

  return (
    <Layout>
      {/* Hero with background image + animated fleet showcase */}
      <section className="relative py-24 min-h-[500px] flex items-center overflow-hidden">
        <img
          src={bgFleetHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="text-center md:text-left">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">
              Our Vehicles
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl text-white mb-4">
              Our Fleet
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg text-white/80 max-w-lg">
              A diverse fleet of well-maintained vehicles for every journey, from comfortable sedans to rugged 4x4 Land Cruisers.
            </motion.p>
          </div>

          {/* Right: Animated vehicle showcase */}
          <div className="relative h-[280px] md:h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={vehicles[heroIndex].image}
                  alt={vehicles[heroIndex].alt}
                  className="w-full h-full object-cover rounded-sm"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                  <p className="font-serif text-xl text-white">{vehicles[heroIndex].name}</p>
                  <p className="font-sans text-sm text-accent">{vehicles[heroIndex].capacity}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {vehicles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  aria-label={`Show ${vehicles[i].name}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === heroIndex ? "bg-accent scale-125" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={v.image}
                    alt={v.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2 text-foreground">{v.name}</h3>
                  <p className="font-sans text-sm text-accent font-bold mb-3">{v.capacity}</p>
                  <p className="font-sans text-sm text-muted-foreground mb-4">Ideal for: {v.idealFor}</p>
                  <ul className="space-y-1 mb-6">
                    {v.features.map((f, j) => (
                      <li key={j} className="font-sans text-xs text-foreground/60 flex items-center gap-2">
                        <span className="text-accent">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="inline-flex items-center gap-2 text-accent font-sans text-sm uppercase tracking-wider font-bold hover:gap-3 transition-all"
                  >
                    Hire This Vehicle <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </Layout>
  );
};

export default Fleet;
