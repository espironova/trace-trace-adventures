"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeHeroSlides } from "@/data/heroFleetImages";
import BookingModal from "@/components/BookingModal";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % homeHeroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <MotionImage
            key={current}
            src={homeHeroSlides[current].image}
            alt={homeHeroSlides[current].alt}
            className="absolute inset-0 object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          fill
          sizes="100vw"
        />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-sm md:text-base uppercase tracking-[0.3em] text-white/80 mb-6"
          >
            Car Hire Company for Destination Lovers
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl mx-auto mb-6"
          >
            Your Gateway to East Africa's <span className="italic text-heroGold">Greatest Adventures</span>
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="font-sans text-lg md:text-xl text-heroGold font-bold uppercase tracking-[0.2em] mb-2">
                {homeHeroSlides[current].label}
              </p>
              <p className="font-sans text-base md:text-lg text-white/80 max-w-2xl mx-auto">
                {homeHeroSlides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-accent text-accent-foreground px-10 py-4 font-sans text-sm uppercase tracking-[0.2em] font-bold hover:bg-accent/90 transition-colors"
            >
              Book Now
            </button>
            <a
              href="/services"
              className="border border-white/40 text-white px-10 py-4 font-sans text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
            >
              Our Services
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {homeHeroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current ? "bg-heroGold scale-125" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default HeroSection;
