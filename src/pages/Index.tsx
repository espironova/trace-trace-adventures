import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetLandcruiser from "@/assets/fleet-landcruiser.jpg";
import fleetVan from "@/assets/fleet-van.jpg";
import fleetBus from "@/assets/fleet-bus.jpg";
import fleetCoasterExt from "@/assets/fleet-coaster-ext.jpg";
import fleetInterior from "@/assets/fleet-interior.jpg";
import maasaiImg from "@/assets/maasai-mara.jpg";
import kampalaImg from "@/assets/kampala.jfif";
import kigaliImg from "@/assets/kigali.jpg";
import iconDrivers from "@/assets/icon-drivers.png";
import iconFleet from "@/assets/icon-fleet.png";
import icon24h from "@/assets/icon-24hours.png";
import iconExpertise from "@/assets/icon-local-expertise.png";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BookingModal from "@/components/BookingModal";
import RateCalculator from "@/components/RateCalculator";

const services = [
  {
    title: "Airport Transfers",
    desc: "Seamless JKIA & Wilson Airport pickup and drop-off with flight tracking, meet & greet, and comfortable vehicles.",
    image: fleetSedan,
    link: "/services",
    alt: "Toyota Noah sedan for professional airport transfer service in Nairobi",
  },
  {
    title: "Safari Tours",
    desc: "Guided safari adventures to East Africa's iconic national parks — Maasai Mara, Serengeti, Bwindi, and beyond.",
    image: fleetLandcruiser,
    link: "/services",
    alt: "Toyota Land Cruiser safari vehicle for guided tours across East Africa",
  },
  {
    title: "Car Hire & Van Hire",
    desc: "Self-drive and chauffeur-driven vehicles for every need — from sedans to 4x4 Land Cruisers and tour vans.",
    image: fleetVan,
    link: "/services",
    alt: "Nissan NV350 van available for hire across East Africa",
  },
  {
    title: "Long Distance Transfers",
    desc: "Comfortable intercity and cross-border transport across East Africa. Travel in style to any destination.",
    image: fleetBus,
    link: "/services",
    alt: "Mercedes tour bus for long distance transfers across East Africa",
  },
  {
    title: "Conference & Corporate Transport",
    desc: "Professional transport for conferences, corporate cocktails, and business events. Punctual, elegant fleet at your service.",
    image: fleetCoasterExt,
    link: "/services",
    alt: "Toyota Coaster for conference and corporate event transport",
  },
  {
    title: "Schools & Group Transport",
    desc: "Reliable transport for international schools — sports events, education trips, co-curricular activities, and field excursions.",
    image: fleetInterior,
    link: "/services",
    alt: "Comfortable bus interior for school and group transport",
  },
];

const destinations = [
  { name: "Maasai Mara", country: "Kenya 🇰🇪", image: maasaiImg, desc: "Home of the Great Migration", alt: "Wildebeest migration in Maasai Mara golden grasslands Kenya" },
  { name: "Arusha", country: "Tanzania 🇹🇿", image: "/placeholder.svg", desc: "Gateway to Serengeti & Kilimanjaro", alt: "Arusha Tanzania gateway to safari" },
  { name: "Kampala", country: "Uganda 🇺🇬", image: "/placeholder.svg", desc: "Pearl of Africa's vibrant capital", alt: "Kampala Uganda city view" },
  { name: "Kigali", country: "Rwanda 🇷🇼", image: "/placeholder.svg", desc: "The Land of a Thousand Hills", alt: "Kigali Rwanda green hills cityscape" },
];

const testimonials = [
  { name: "Sarah M.", text: "Incredible airport pickup service! Driver was on time, vehicle was spotless, and the ride to the city was smooth. Highly recommend Track & Trace for JKIA transfers.", rating: 5, service: "Airport Transfer" },
  { name: "James K.", text: "Our 3-day Maasai Mara safari was unforgettable. The Land Cruiser was well-equipped, and our guide knew every trail. Best safari experience in East Africa!", rating: 5, service: "Safari Tour" },
  { name: "Priya D.", text: "Rented a safari van for a family trip to Amboseli. The vehicle was in excellent condition and the pricing was very fair. Will definitely use again.", rating: 5, service: "Car Hire" },
  { name: "Robert O.", text: "Used Track & Trace for a Nairobi to Mombasa transfer. Comfortable bus, professional driver, and arrived right on schedule. Outstanding service.", rating: 5, service: "Long Distance" },
  { name: "Emily C.", text: "Booked an Amboseli safari with Track & Trace and it exceeded all expectations. Seeing elephants with Kilimanjaro in the background was a once-in-a-lifetime moment.", rating: 5, service: "Safari Tour" },
  { name: "David T.", text: "I've used many car hire services across Africa, and Track & Trace stands out. Vehicles are genuinely well-maintained and pricing is transparent.", rating: 5, service: "Car Hire" },
];

const whyUs = [
  { image: iconDrivers, title: "Experienced Drivers", desc: "Professional, licensed drivers with years of experience navigating East Africa's roads and national parks safely." },
  { image: iconFleet, title: "Well-Maintained Fleet", desc: "Every vehicle is regularly serviced and inspected — from comfortable sedans to rugged 4x4 Land Cruisers." },
  { image: icon24h, title: "24/7 Availability", desc: "Round-the-clock service for airport transfers, emergency travel, and last-minute bookings. We're always ready." },
  { image: iconExpertise, title: "Local Expertise", desc: "Over 20 years of experience. Our team knows every route, hidden gem, and the best safari experiences across East Africa." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 },
};

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 4000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(testimonialIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <Layout>
      <HeroSection />

      {/* Services Overview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">What We Offer</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Our Services</h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              From airport pickups to unforgettable safaris — we provide comprehensive transport solutions across East Africa with professional drivers and a well-maintained fleet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link to={service.link} className="group block relative overflow-hidden aspect-[16/10]">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl md:text-2xl text-white mb-2">{service.title}</h3>
                    <p className="font-sans text-sm text-white/70 leading-relaxed max-w-md">{service.desc}</p>
                    <span className="inline-flex items-center gap-2 mt-3 text-[#F4C430] text-sm font-sans uppercase tracking-wider font-bold group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Why Track & Trace</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">The Track & Trace Difference</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="font-sans text-sm opacity-80 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Explore East Africa</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Popular Destinations</h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              Discover East Africa's most breathtaking national parks, cities, and reserves. We'll get you there in comfort and style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link to="/destinations" className="group block relative overflow-hidden aspect-[3/4]">
                  <img
                    src={dest.image}
                    alt={dest.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#F4C430] mb-1">{dest.country}</p>
                    <h3 className="font-serif text-2xl text-white">{dest.name}</h3>
                    <p className="font-sans text-xs text-white/70 mt-1">{dest.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center mt-10">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors font-bold"
            >
              View All Destinations <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Rate Calculator */}
      <RateCalculator />

      {/* Testimonials Carousel */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Client Experiences</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">What Our Clients Say</h2>
          </motion.div>

          <div className="relative">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {getVisibleTestimonials().map((t, i) => (
                <div
                  key={`${testimonialIndex}-${i}`}
                  className="bg-card p-6 border border-border"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-accent">★</span>
                    ))}
                  </div>
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-4 italic">"{t.text}"</p>
                  <div className="border-t border-border pt-3">
                    <p className="font-sans font-bold text-sm text-foreground">{t.name}</p>
                    <p className="font-sans text-xs text-muted-foreground">{t.service}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === testimonialIndex ? "bg-accent scale-125" : "bg-border hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp}>
            <h2 className="font-serif text-3xl md:text-5xl mb-4">Ready to Explore East Africa?</h2>
            <p className="font-sans text-lg opacity-80 max-w-xl mx-auto mb-8">
              Whether it's an airport pickup, a weekend safari, or a cross-border journey — we're ready to take you there.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-accent text-accent-foreground px-10 py-4 font-sans text-sm uppercase tracking-[0.2em] font-bold hover:bg-accent/90 transition-colors"
              >
                Get a Free Quote
              </button>
              <a
                href="https://wa.me/254721521009"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary-foreground/40 px-10 py-4 font-sans text-sm uppercase tracking-[0.2em] hover:bg-primary-foreground/10 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </Layout>
  );
};

export default Index;
