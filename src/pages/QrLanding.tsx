import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Plane,
  Building2,
  Briefcase,
  Mountain,
  Car,
  Bus,
  GraduationCap,
  PlaneLanding,
  Languages,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  MapPin,
  Mail,
  ArrowRight,
  Calculator,
} from "lucide-react";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/qr-hero-isuzu.jpg";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";
import fleetCoasterExt from "@/assets/fleet-coaster-ext.jpg";
import fleetBus from "@/assets/fleet-bus.jpg";
import BookingModal from "@/components/BookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const PHONE = "+254721521009";
const PHONE_DISPLAY = "+254 721 521 009";
const WA_URL = `https://wa.me/254721521009?text=${encodeURIComponent(
  "Hello Track & Trace Adventures! I'd like to enquire about transport services.",
)}`;

type Tile = {
  label: string;
  desc: string;
  Icon: typeof Plane;
  serviceId: string;
  vehicleType?: string;
};

const tiles: Tile[] = [
  { label: "Airport Transfers", desc: "JKIA, Wilson, SGR", Icon: Plane, serviceId: "airport" },
  { label: "Hotel Pickups", desc: "City & lodge transfers", Icon: Building2, serviceId: "hotel" },
  { label: "Corporate Travel", desc: "Meetings & events", Icon: Briefcase, serviceId: "fullDay" },
  { label: "Safari & Day Tours", desc: "Mara, Amboseli, Naivasha", Icon: Mountain, serviceId: "longDist", vehicleType: "8-Pax Safari Land Cruiser" },
  { label: "Car Hire", desc: "Self-drive or chauffeur", Icon: Car, serviceId: "fullDay" },
  { label: "Group Transport", desc: "Vans, coasters & buses", Icon: Bus, serviceId: "fullDay", vehicleType: "22-Pax Coaster Shuttle (Isuzu / Toyota Coaster)" },
  { label: "School Trips", desc: "Educational tours & camps", Icon: GraduationCap, serviceId: "longDist", vehicleType: "33/37-Pax Mercedes Bus" },
];

const fleetThumbs = [
  { src: fleetSedan, alt: "Toyota Noah for airport transfers" },
  { src: fleetHiace, alt: "Toyota Hiace safari van" },
  { src: fleetCoasterExt, alt: "Coaster shuttle" },
  { src: fleetBus, alt: "Mercedes tour bus" },
];

const benefits = [
  { Icon: PlaneLanding, text: "Flight tracking & meet and greet at JKIA & Wilson" },
  { Icon: Languages, text: "English and Kiswahili speaking professional drivers" },
  { Icon: ShieldCheck, text: "Safe, clean and well-maintained vehicles" },
  { Icon: BadgeCheck, text: "Competitive rates with no hidden fees" },
  { Icon: Headphones, text: "Real-time 24/7 support before and during your trip" },
];

const QrLanding = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillVehicle, setPrefillVehicle] = useState<string | undefined>();
  const [prefillService, setPrefillService] = useState<string | undefined>();

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = "Track & Trace Adventures | Quick Booking";
    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, []);

  const openBooking = (serviceId?: string, vehicleType?: string) => {
    setPrefillService(serviceId);
    setPrefillVehicle(vehicleType);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky mini-header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground border-b border-primary-foreground/10">
        <div className="px-4 py-3 flex items-center justify-between max-w-3xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Track & Trace Adventures" className="h-9 w-auto" />
            <span className="font-serif text-sm leading-tight hidden sm:block">
              Track &amp; Trace<br />
              <span className="text-accent text-[10px] tracking-[0.25em] uppercase">Adventures</span>
            </span>
          </Link>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-2 font-sans text-xs font-bold uppercase tracking-wider"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Track & Trace Adventures safari fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/95" />
        </div>
        <div className="relative z-10 px-4 py-14 sm:py-20 max-w-3xl mx-auto text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-3">East Africa Transport</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              Reliable Transport in East Africa, Anytime, Anywhere
            </h1>
            <p className="font-sans text-base sm:text-lg opacity-90 mb-8">
              Airport Transfers. Hotel Pickups. Corporate Travel. Safari Tours. Car Hire. School Trips.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => openBooking()}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground py-4 font-sans text-sm uppercase tracking-[0.2em] font-bold hover:bg-accent/90 transition-colors min-h-[56px]"
              >
                Get Instant Quote / Book Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-sans text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#1faa54] transition-colors min-h-[56px]"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Service Selector */}
      <section className="py-12 bg-background">
        <div className="px-4 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-2">What do you need?</p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">Tap a service to get started</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {tiles.map(({ label, desc, Icon, serviceId, vehicleType }) => (
              <button
                key={label}
                onClick={() => openBooking(serviceId, vehicleType)}
                className="group flex flex-col items-center text-center gap-2 border border-border bg-card p-4 hover:border-accent hover:shadow-md transition-all min-h-[140px]"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <p className="font-serif text-sm text-foreground leading-tight">{label}</p>
                <p className="font-sans text-[11px] text-muted-foreground leading-snug">{desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Booking / Quote */}
      <section className="py-12 bg-muted">
        <div className="px-4 max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-2">Instant Quote</p>
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">Plan your trip in under a minute</h2>
          <p className="font-sans text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Tell us your route and vehicle. Get a live budget estimate and send the request straight to our team on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openBooking()}
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-4 font-sans text-sm uppercase tracking-[0.2em] font-bold hover:bg-accent/90 transition-colors min-h-[56px]"
            >
              Open Booking Form
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/contact#rate-calculator"
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-4 font-sans text-sm uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-primary-foreground transition-colors min-h-[56px]"
            >
              <Calculator className="w-4 h-4" />
              View Rate Card
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Builders */}
      <section className="py-12 bg-background">
        <div className="px-4 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { stat: "20+", label: "Years Experience" },
              { stat: "5,000+", label: "Happy Clients" },
              { stat: "24/7", label: "Availability" },
            ].map((s) => (
              <div key={s.label} className="bg-primary text-primary-foreground p-4 text-center">
                <p className="font-serif text-2xl text-accent">{s.stat}</p>
                <p className="font-sans text-[11px] uppercase tracking-wider opacity-80 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-xs text-muted-foreground uppercase tracking-[0.2em] mb-6">
            Licensed &amp; Insured  |  Nairobi based, East Africa wide
          </p>
          <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-accent mb-4">Our Fleet</p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
            {fleetThumbs.map((t) => (
              <img
                key={t.alt}
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="h-28 w-44 object-cover flex-shrink-0 snap-start border border-border"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-muted">
        <div className="px-4 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-2">Why Choose Us</p>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">The Track &amp; Trace Difference</h2>
          </div>
          <ul className="space-y-3">
            {benefits.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3 bg-card border border-border p-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <p className="font-sans text-sm text-foreground leading-relaxed pt-1.5">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10 mt-auto">
        <div className="px-4 max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Track & Trace Adventures" className="h-10 w-auto" />
            <div>
              <p className="font-serif text-base">Track &amp; Trace Adventures</p>
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-accent">The Travel Solutions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-sm">
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4 text-accent" /> {PHONE_DISPLAY}
            </a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
            <a href="mailto:info@tracktraceadventures.co.ke" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4 text-accent" /> info@tracktraceadventures.co.ke
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              Milestone Business Center, Northern Bypass, Nairobi
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent font-sans text-sm font-bold uppercase tracking-[0.2em] hover:underline"
          >
            Visit our full website
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="font-sans text-[11px] opacity-60 pt-3 border-t border-primary-foreground/10">
            © {new Date().getFullYear()} Track &amp; Trace Adventures Ltd. All rights reserved.
          </p>
          <p className="font-sans text-[11px] opacity-60">
            Powered by Espiranova
          </p>
        </div>
      </footer>

      <WhatsAppButton />
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialVehicleType={prefillVehicle}
        initialServiceId={prefillService}
      />
    </div>
  );
};

export default QrLanding;