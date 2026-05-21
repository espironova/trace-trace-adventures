import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Handshake,
  PlaneTakeoff,
  BadgeDollarSign,
  Clock,
  Luggage,
  Wifi,
  ArrowRight,
  Phone,
} from "lucide-react";
import Layout from "@/components/Layout";
import BookingModal from "@/components/BookingModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import heroImg from "@/assets/airport-transfers-hero.png";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetNoahBoot from "@/assets/fleet-noah-boot.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 },
};

const WHATSAPP_HREF =
  "https://wa.me/254721521009?text=Hello%2C%20I%20would%20like%20to%20book%20a%20service%20with%20Track%20%26%20Trace%20Adventures.";
const PHONE_HREF = "tel:+254721521009";
const PHONE_DISPLAY = "+254 721 521 009";

const highlights = [
  {
    icon: Handshake,
    title: "Meet & Greet at Arrivals",
    body: "A smartly dressed driver greets you with a personalized name board the moment you step out.",
  },
  {
    icon: PlaneTakeoff,
    title: "Real-Time Flight Tracking",
    body: "We monitor your flight and adjust pickup time automatically for delays or early arrivals.",
  },
  {
    icon: BadgeDollarSign,
    title: "Fixed Pricing, No Hidden Fees",
    body: "Transparent rates agreed up front. No surge pricing, no surprise charges on arrival.",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    body: "Early morning departures or late-night landings, our team is on standby every day.",
  },
  {
    icon: Luggage,
    title: "Luggage Assistance",
    body: "Our drivers help load and secure all your bags so you can travel comfortably and worry free.",
  },
  {
    icon: Wifi,
    title: "Free WiFi in Select Vehicles",
    body: "Stay connected on the road with complimentary WiFi available in select fleet vehicles.",
  },
];

const steps = [
  {
    n: "01",
    title: "Book via WhatsApp or online",
    body: "Send your flight details through WhatsApp or our online booking form and we confirm in minutes.",
  },
  {
    n: "02",
    title: "Driver meets you at arrivals",
    body: "Step out to find your driver waiting with a name board, ready to help with your luggage.",
  },
  {
    n: "03",
    title: "Comfortable ride to your destination",
    body: "Relax in an air-conditioned vehicle while we take care of the route, traffic, and timing.",
  },
];

const vehicles = [
  {
    img: fleetSedan,
    name: "Executive Sedan",
    blurb: "Ideal for solo travelers or couples seeking a quiet, comfortable transfer.",
    alt: "Executive sedan for JKIA and Wilson airport transfers in Nairobi",
  },
  {
    img: fleetNoahBoot,
    name: "Toyota Noah",
    blurb: "Spacious 5-seater minivan with generous luggage space for small families.",
    alt: "Toyota Noah minivan with luggage space for Nairobi airport transfers",
  },
  {
    img: fleetHiace,
    name: "Toyota Hiace",
    blurb: "14-seater van for groups, corporate teams, and travelers with extra luggage.",
    alt: "Toyota Hiace 14 seater van for group airport transfers in Nairobi",
  },
];

const AirportTransfers = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden py-24">
        <img
          src={heroImg}
          alt="Track and Trace Adventures driver welcoming guests with a name board at JKIA arrivals in Nairobi"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,196,48,0.22),transparent_55%)]" />
        <div className="absolute -top-24 left-[15%] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-sans text-sm uppercase tracking-[0.3em] text-heroGold mb-3"
          >
            Airport Transfers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl mb-4 text-primary-foreground drop-shadow-sm"
          >
            JKIA & Wilson Airport Transfers Nairobi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-sans text-lg text-primary-foreground/85 max-w-2xl mx-auto"
          >
            Professional 24/7 airport pickup and drop-off. Meet and greet service, real-time flight tracking, fixed pricing with no hidden fees.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center gap-2 bg-heroGold text-primary px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-heroGold/90 transition-colors"
            >
              Hire a Vehicle <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary-foreground/70 text-primary-foreground px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Service highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent font-bold mb-3">
              Why Travelers Choose Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Effortless Arrivals and Departures
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-card border border-border p-7 transition-shadow hover:shadow-lg"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-heroGold/15 text-accent mb-5">
                  <h.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{h.title}</h3>
                <p className="font-sans text-sm text-foreground/70 leading-relaxed">{h.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent font-bold mb-3">
              How It Works
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Three Simple Steps to a Smooth Transfer
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-heroGold text-primary font-serif text-2xl flex items-center justify-center shadow-md">
                  {s.n}
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{s.title}</h3>
                <p className="font-sans text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles available */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent font-bold mb-3">
              Vehicles Available
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Choose the Right Vehicle for Your Trip
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-card border border-border overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-foreground mb-2">{v.name}</h3>
                  <p className="font-sans text-sm text-foreground/70 leading-relaxed">{v.blurb}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent font-bold mb-3">
              Coverage
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-5">
              We Cover All of Nairobi & Beyond
            </h2>
            <p className="font-sans text-foreground/80 leading-relaxed">
              We provide airport transfers to and from JKIA and Wilson Airport to all destinations across Nairobi, and long-distance transfers to other major towns across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,196,48,0.22),transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">
              Ready to Book Your Airport Transfer?
            </h2>
            <p className="font-sans text-primary-foreground/85 mb-8">
              Talk to our team on WhatsApp, call us directly, or fill in the online booking form. We respond fast, day or night.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-2 bg-heroGold text-primary px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-heroGold/90 transition-colors"
              >
                Hire a Vehicle <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-[#1ebe57] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp Us
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 border border-primary-foreground/70 text-primary-foreground px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialServiceId="airport-transfers"
      />
    </Layout>
  );
};

export default AirportTransfers;