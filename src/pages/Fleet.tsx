import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import BookingModal from "@/components/BookingModal";
import bgFleetHero from "@/assets/fleet-hero-bg.jpg";
import { fleetUnits, fleetBookingLabel, type FleetUnit } from "@/data/fleet";
import { ArrowRight } from "lucide-react";
import VehicleImageCarousel from "@/components/VehicleImageCarousel";

const Fleet = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingVehicleType, setBookingVehicleType] = useState<string | undefined>(undefined);
  const [heroIndex, setHeroIndex] = useState(0);

  const nextHero = useCallback(() => {
    setHeroIndex((prev) => (prev + 1) % fleetUnits.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextHero, 3500);
    return () => clearInterval(timer);
  }, [nextHero]);

  const openBooking = (unit: FleetUnit) => {
    setBookingVehicleType(fleetBookingLabel(unit));
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setBookingVehicleType(undefined);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 min-h-[500px] flex items-center overflow-hidden">
        <img
          src={bgFleetHero}
          alt="Track & Trace vehicle fleet on the road: sedans, vans, and coaches for hire in Kenya"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-heroGold mb-3">
              Our Vehicles
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl text-white mb-4">
              Our Fleet
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg text-white/80 max-w-lg">
              A diverse fleet of well-maintained vehicles for every journey, from comfortable sedans to rugged 4x4 Land Cruisers.
            </motion.p>
          </div>

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
                  src={fleetUnits[heroIndex].images[0]}
                  alt={fleetUnits[heroIndex].alt}
                  className="w-full h-full object-cover rounded-sm"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                  <p className="font-serif text-xl text-white">{fleetUnits[heroIndex].modelName}</p>
                  <p className="font-sans text-sm text-white/80 mt-0.5">{fleetUnits[heroIndex].registration}</p>
                  <p className="font-sans text-sm text-accent">{fleetUnits[heroIndex].capacity}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 max-w-full px-2">
              {fleetUnits.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setHeroIndex(i)}
                  aria-label={`Show ${slide.modelName} ${slide.registration}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === heroIndex ? "bg-heroGold scale-125" : "bg-white/40 hover:bg-white/60"
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
            {fleetUnits.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.5) }}
                className="bg-card border border-border overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={v.images[0]}
                    alt={v.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-1 text-foreground">{v.modelName}</h3>
                  <p className="font-sans text-sm text-muted-foreground mb-2">{v.registration}</p>
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
                    type="button"
                    onClick={() => openBooking(v)}
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

      <BookingModal open={bookingOpen} onClose={closeBooking} initialVehicleType={bookingVehicleType} />
    </Layout>
  );
};

export default Fleet;
