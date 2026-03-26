import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import BookingModal from "@/components/BookingModal";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetLandcruiser from "@/assets/fleet-landcruiser.jpg";
import fleetVan from "@/assets/fleet-van.jpg";
import fleetBus from "@/assets/fleet-bus.jpg";
import fleetNoahBoot from "@/assets/fleet-noah-boot.jpg";
import fleetCoasterExt from "@/assets/fleet-coaster-ext.jpg";
import fleetCoasterInterior from "@/assets/fleet-coaster-interior.jpg";
import fleetVanInterior from "@/assets/fleet-van-interior.jpg";
import fleetHiace from "@/assets/fleet-hiace.jpg";
import fleetFord from "@/assets/fleet-ford.jpg";
import fleetGoldenDragon from "@/assets/fleet-golden-dragon.jpg";
import fleetInterior from "@/assets/fleet-interior.jpg";
import { Plane, Map, Car, Bus, Compass, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 },
};

const serviceData = [
  {
    id: "airport-transfers",
    icon: Plane,
    title: "Airport Transfers",
    subtitle: "JKIA & Wilson Airport",
    images: [fleetSedan, fleetNoahBoot],
    alt: "Toyota Noah sedan at Jomo Kenyatta International Airport for Nairobi airport transfer service",
    description: "Enjoy seamless, stress-free airport transfers with Track & Trace Adventures. We serve both Jomo Kenyatta International Airport (JKIA) and Wilson Airport with professional, reliable pickup and drop-off services.",
    features: [
      "Meet & greet service at arrivals",
      "Real-time flight tracking — we adjust to delays",
      "Comfortable, air-conditioned vehicles",
      "Fixed pricing with no hidden fees",
      "Available 24/7 for early morning and late-night flights",
      "Luggage assistance and free WiFi in select vehicles",
    ],
  },
  {
    id: "safari-tours",
    icon: Map,
    title: "Safari Tours",
    subtitle: "Guided Adventures Across Kenya",
    images: [fleetLandcruiser, fleetFord, fleetHiace],
    alt: "Toyota Land Cruiser safari vehicle for guided safari tour in Maasai Mara Kenya",
    description: "Explore Kenya's world-renowned national parks and game reserves with our guided safari tours. From the Great Migration in the Maasai Mara to the elephants of Amboseli — we create unforgettable wildlife experiences.",
    features: [
      "Custom safari itineraries tailored to your interests",
      "4x4 Land Cruisers with pop-up roofs for game viewing",
      "Experienced safari guides with local expertise",
      "Multi-day packages: 2-day, 3-day, 5-day, and 7-day safaris",
      "Popular destinations: Maasai Mara, Amboseli, Lake Nakuru, Tsavo, Samburu",
      "All-inclusive options with accommodation and meals",
    ],
  },
  {
    id: "car-hire",
    icon: Car,
    title: "Car Hire & Van Hire",
    subtitle: "Self-Drive & Chauffeur-Driven",
    images: [fleetVan, fleetVanInterior, fleetCoasterExt],
    alt: "Nissan NV350 van for car hire in Nairobi Kenya",
    description: "A diverse selection of vehicles for hire, ranging from comfortable sedans to spacious SUVs. Whether you need a sedan for business, a 4x4 for adventure, or a van for group travel — we've got the right vehicle at the right price.",
    features: [
      "Self-drive and chauffeur-driven options",
      "Fleet includes sedans, SUVs, 4x4s, safari vans, and minibuses",
      "Competitive daily, weekly, and monthly rates",
      "Comprehensive insurance included",
      "GPS navigation available on request",
      "Free delivery within Nairobi for rentals over 3 days",
    ],
  },
  {
    id: "long-distance",
    icon: Bus,
    title: "Long Distance Transfers",
    subtitle: "Intercity & Cross-Border Transport",
    images: [fleetBus, fleetGoldenDragon, fleetCoasterInterior, fleetInterior],
    alt: "Mercedes tour bus for long distance transfers through Kenyan countryside",
    description: "Travel comfortably between Kenya's cities and beyond with our long-distance transfer service. We connect Nairobi with Mombasa, Kisumu, Nakuru, Eldoret, and cross-border destinations in style.",
    features: [
      "Nairobi to Mombasa, Kisumu, Nakuru, Eldoret, and more",
      "Cross-border transfers to Tanzania and Uganda",
      "Comfortable vehicles with reclining seats",
      "Professional, experienced long-haul drivers",
      "Flexible scheduling for individuals and groups",
      "Corporate and event transport packages available",
    ],
  },
  {
    id: "travel-consultations",
    icon: Compass,
    title: "Travel Consultations",
    subtitle: "Expert Guidance for Your Journey",
    images: [fleetLandcruiser],
    alt: "Travel consultation planning session for Kenya safari adventure",
    description: "Personalized guidance from our expert travel consultants. Let us help you plan the perfect Kenyan adventure — from choosing the right destinations and vehicles to crafting custom itineraries that match your interests and budget.",
    features: [
      "One-on-one consultation with experienced travel advisors",
      "Custom itinerary planning for any budget",
      "Destination recommendations based on your interests",
      "Accommodation and activity booking assistance",
      "Group and corporate travel planning",
      "Seasonal advice for the best wildlife viewing",
    ],
  },
];

const ImageCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [current, setCurrent] = useState(0);

  if (images.length === 1) {
    return (
      <div className="overflow-hidden">
        <img src={images[0]} alt={alt} className="w-full h-auto object-cover aspect-[4/3]" loading="lazy" width={800} height={600} />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden aspect-[4/3] group">
      <motion.img
        key={current}
        src={images[current]}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full object-cover"
        loading="lazy"
        width={800}
        height={600}
      />
      <button
        onClick={() => setCurrent((current - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/50"}`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">What We Offer</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl mb-4">Our Services</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg opacity-80 max-w-2xl mx-auto">
            Comprehensive transport solutions across Kenya — from airport pickups to multi-day safari adventures. Professional service, reliable vehicles, competitive prices.
          </motion.p>
        </div>
      </section>

      {serviceData.map((service, i) => (
        <section key={service.id} id={service.id} className={`py-24 ${i % 2 === 0 ? "bg-background" : "bg-muted"}`}>
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
              <motion.div {...fadeInUp} className={i % 2 === 1 ? "lg:order-2" : ""}>
                <ImageCarousel images={service.images} alt={service.alt} />
              </motion.div>

              <motion.div {...fadeInUp} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                  <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent font-bold">{service.subtitle}</p>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{service.title}</h2>
                <p className="font-sans text-foreground/80 leading-relaxed mb-6">{service.description}</p>

                <ul className="space-y-2 mb-8">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 font-sans text-sm text-foreground/70">
                      <span className="text-accent mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setBookingOpen(true)}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors"
                >
                  Book This Service <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </Layout>
  );
};

export default Services;
