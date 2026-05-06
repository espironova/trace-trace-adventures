"use client";
import Image from 'next/image'
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import BookingModal from "@/components/BookingModal";
import RateCalculator from "@/components/RateCalculator";
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
import servicesHeroBg from "@/assets/services-hero-bg.jpg";
import { Plane, Map, Car, Bus, Train, Compass, ArrowRight, ChevronLeft, ChevronRight, Building, GlassWater, Users, GraduationCap, UtensilsCrossed } from "lucide-react";
import { repeatAfterUnique } from "@/lib/utils";

const MotionImage = motion(Image)

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
      "Real-time flight tracking; we adjust to delays",
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
    subtitle: "Guided Adventures Across East Africa",
    images: [fleetLandcruiser, fleetFord, fleetHiace],
    alt: "Toyota Land Cruiser safari vehicle for guided safari tour across East Africa",
    description: "Explore East Africa's world-renowned national parks and game reserves with our guided safari tours. From the Great Migration in the Maasai Mara to gorilla trekking in Bwindi, we create unforgettable wildlife experiences across Kenya, Tanzania, Uganda, and Rwanda.",
    features: [
      "Custom safari itineraries tailored to your interests",
      "4x4 Land Cruisers with pop-up roofs for game viewing",
      "Experienced safari guides with local expertise",
      "Multi-day packages: 2-day, 3-day, 5-day, and 7-day safaris",
      "Popular destinations: Maasai Mara, Amboseli, Serengeti, Bwindi, Akagera",
      "All-inclusive options with accommodation and meals",
    ],
  },
  {
    id: "car-hire",
    icon: Car,
    title: "Car Hire & Van Hire",
    subtitle: "Self-Drive & Chauffeur-Driven",
    images: [fleetVan, fleetVanInterior, fleetCoasterExt],
    alt: "Nissan NV350 van for car hire in Nairobi",
    description: "A diverse selection of vehicles for hire, ranging from comfortable sedans to spacious SUVs. Whether you need a sedan for business, a 4x4 for adventure, or a van for group travel, we've got the right vehicle at the right price.",
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
    alt: "Mercedes tour bus for long distance transfers across East Africa",
    description: "Travel comfortably between East Africa's cities and beyond with our long-distance transfer service. We connect Nairobi with Mombasa, Kisumu, Nakuru, Arusha, Kampala, Kigali, and cross-border destinations in style.",
    features: [
      "Nairobi to Mombasa, Kisumu, Nakuru, Eldoret, and more",
      "Cross-border transfers to Tanzania, Uganda, and Rwanda",
      "Complements SGR travel: road connections to and from railway stations",
      "Comfortable vehicles with reclining seats",
      "Professional, experienced long-haul drivers",
      "Flexible scheduling for individuals and groups",
      "Corporate and event transport packages available",
    ],
  },
  {
    id: "sgr-transfers",
    icon: Train,
    title: "SGR Transfers",
    subtitle: "Kenya Standard Gauge Railway",
    images: repeatAfterUnique([fleetHiace, fleetVan, fleetNoahBoot], 4),
    alt: "Toyota Hiace van for SGR station pickup and drop-off in Nairobi and Mombasa",
    description:
      "Connect seamlessly with Kenya's SGR service. We provide reliable road transfers to and from Nairobi Terminus (Syokimau), Mombasa Terminus, and other station access points—so your train journey starts and ends without stress. Whether you're a solo traveler, family, or group, we match you with the right vehicle and schedule.",
    features: [
      "Pickup and drop-off timed around train departures and arrivals",
      "Coverage for Nairobi Terminus, Syokimau, Mombasa Terminus, and related station routes",
      "Luggage-friendly sedans, vans, and minibuses for individuals and groups",
      "Advance booking recommended for weekends, holidays, and peak travel periods",
      "Professional drivers familiar with station access and traffic patterns",
      "Combine with hotel, airport, or long-distance transfers for a complete trip",
    ],
  },
  {
    id: "hotel-transfers",
    icon: Building,
    title: "Hotel-to-Hotel Transfers",
    subtitle: "Within Nairobi City Transfers",
    images: [fleetSedan, fleetVan],
    alt: "Comfortable sedan for hotel-to-hotel transfer within Nairobi",
    description: "Moving between hotels or from your hotel to a meeting, restaurant, or event venue? Our hotel-to-hotel transfer service provides prompt, comfortable, and affordable city transfers within Nairobi and its environs.",
    features: [
      "Door-to-door service between any Nairobi hotels",
      "Comfortable sedans, vans, and minibuses available",
      "Professional, smartly dressed drivers",
      "Fixed, transparent pricing with no metered surprises",
      "Available for individuals, couples, and groups",
      "Perfect for business travelers and tourists alike",
    ],
  },
  {
    id: "corporate-cocktail",
    icon: GlassWater,
    title: "Corporate Cocktail Transport",
    subtitle: "Event & Cocktail Transport",
    images: [fleetCoasterExt, fleetBus],
    alt: "Toyota Coaster for corporate cocktail event transport",
    description: "Make a lasting impression at your corporate cocktail events with our premium transport service. We provide elegant, punctual vehicle solutions for corporate gatherings, cocktail parties, gala dinners, and networking events.",
    features: [
      "Luxury and executive vehicle options available",
      "Group transport with coasters and buses for large events",
      "Professional, uniformed drivers",
      "On-time arrival guaranteed for event schedules",
      "Flexible pickup and drop-off at multiple venues",
      "Customizable packages for recurring corporate events",
    ],
  },
  {
    id: "conference-transport",
    icon: Users,
    title: "Conference Transport",
    subtitle: "Corporate Conferences & Meetings",
    images: [fleetBus, fleetGoldenDragon, fleetCoasterInterior],
    alt: "Mercedes bus for conference delegate transport",
    description: "Seamless transport logistics for conferences, seminars, and corporate meetings. Whether it's a 20-person workshop or a 500-delegate international conference, we coordinate fleet movements to keep your event running on time.",
    features: [
      "Multi-vehicle coordination for large conferences",
      "Airport-to-venue shuttle services for delegates",
      "Hotel-to-conference center daily transfers",
      "Branded vehicle signage available on request",
      "Dedicated transport coordinator for your event",
      "Fleet ranging from 8-seater vans to 45-seater buses",
    ],
  },
  {
    id: "schools-transport",
    icon: GraduationCap,
    title: "International Schools Transport",
    subtitle: "Sports, Education Trips & Co-Curricular Activities",
    images: [fleetCoasterExt, fleetGoldenDragon, fleetInterior],
    alt: "Bus for international school sports and education trips",
    description: "Trusted by leading international schools across Nairobi, our schools transport service covers sports tournaments, educational field trips, co-curricular activities, and inter-school events. Safety, reliability, and punctuality are our top priorities.",
    features: [
      "Regular sports event and tournament transport",
      "Educational field trips to national parks, museums, and reserves",
      "Co-curricular activity transport (music, drama, art competitions)",
      "Experienced drivers trained in child safety protocols",
      "Fleet includes coasters, shuttles, and full-size buses",
      "Long-term contracts available with discounted rates",
    ],
  },
  {
    id: "dinner-transport",
    icon: UtensilsCrossed,
    title: "Dinner Transport",
    subtitle: "Evening Event Pickups (6PM–11PM)",
    images: [fleetSedan, fleetNoahBoot],
    alt: "Sedan for evening dinner event transport in Nairobi",
    description: "Enjoy a worry-free evening out with our dedicated dinner transport service. We provide reliable pickups and drop-offs for dinner events, restaurant outings, and evening social gatherings across Nairobi so you can enjoy the night without worrying about the drive home.",
    features: [
      "Evening service window: 6 PM to 11 PM",
      "Pick up from home, hotel, or office to your dinner venue",
      "Return drop-off service included",
      "Perfect for couples, families, and group dining",
      "Clean, comfortable, and air-conditioned vehicles",
      "Ideal for date nights, birthday dinners, and celebrations",
    ],
  },
  {
    id: "travel-consultations",
    icon: Compass,
    title: "Travel Consultations",
    subtitle: "Expert Guidance for Your Journey",
    images: [fleetLandcruiser],
    alt: "Travel consultation planning session for East Africa adventure",
    description: "Personalized guidance from our expert travel consultants. Let us help you plan the perfect East African adventure, from choosing the right destinations and vehicles to crafting custom itineraries that match your interests and budget.",
    features: [
      "One-on-one consultation with experienced travel advisors",
      "Custom itinerary planning for any budget",
      "Destination recommendations across Kenya, Tanzania, Uganda, and Rwanda",
      "Accommodation and activity booking assistance",
      "Group and corporate travel planning",
      "Seasonal advice for the best wildlife viewing",
    ],
  },
];

const ImageCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [images.length, goNext]);

  if (images.length === 1) {
    return (
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden aspect-[4/3] group">
      <MotionImage
        key={current}
        src={images[current]}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="object-cover"
        loading="lazy"
          fill
          sizes="100vw"
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
      <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden py-24">
        <Image
          src={servicesHeroBg}
          alt="Aircraft at Jomo Kenyatta International Airport at sunset, ready for transfer service"
          fill
          className="absolute inset-0 object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,196,48,0.22),transparent_55%)]" />
        <div className="absolute -top-24 left-[15%] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-heroGold mb-3">What We Offer</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl mb-4 text-primary-foreground drop-shadow-sm">
            Car Hire & Transport Services in East Africa
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg text-primary-foreground/85 max-w-2xl mx-auto">
            Reliable car hire, airport transfers, safari vehicles, and corporate transport in Kenya and East Africa. Professional service, well-maintained vehicles, and competitive pricing for all your travel needs.
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

      <RateCalculator />

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </Layout>
  );
};

export default Services;
