import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import maasaiImg from "@/assets/maasai-mara.jpg";
import amboImg from "@/assets/amboseli.jpg";
import nairobiImg from "@/assets/nairobi-park.jpg";
import nakuruImg from "@/assets/lake-nakuru.jpg";
import tsavoImg from "@/assets/tsavo.jpg";
import samburuImg from "@/assets/samburu.jpg";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Maasai Mara National Reserve",
    image: maasaiImg,
    alt: "Wildebeest Great Migration across golden grasslands in Maasai Mara Kenya",
    distance: "270 km from Nairobi (~5 hours)",
    vehicle: "4x4 Land Cruiser or Safari Van",
    description: "The crown jewel of Kenyan wildlife. Witness the Great Wildebeest Migration, spot the Big Five, and experience the vast, golden savanna that stretches to the horizon. Our guided tours include game drives, bush meals, and luxury camp stays.",
  },
  {
    name: "Amboseli National Park",
    image: amboImg,
    alt: "Elephants walking in front of Mount Kilimanjaro at Amboseli National Park Kenya",
    distance: "240 km from Nairobi (~4 hours)",
    vehicle: "4x4 Land Cruiser",
    description: "Famous for its large elephant herds and stunning views of Mount Kilimanjaro. Amboseli offers incredible wildlife photography opportunities with Africa's highest peak as the backdrop. Perfect for 2–3 day safari packages.",
  },
  {
    name: "Lake Nakuru National Park",
    image: nakuruImg,
    alt: "Thousands of flamingos on Lake Nakuru with pink water and surrounding acacia trees",
    distance: "160 km from Nairobi (~3 hours)",
    vehicle: "Safari Van or Land Cruiser",
    description: "A birdwatcher's paradise, Lake Nakuru is famous for its flamingo colonies that turn the lake pink. The park also hosts rhinos, lions, and leopards, making it a fantastic all-round wildlife destination.",
  },
  {
    name: "Nairobi National Park",
    image: nairobiImg,
    alt: "Giraffes and zebras with Nairobi city skyline visible at Nairobi National Park",
    distance: "7 km from Nairobi CBD",
    vehicle: "Sedan or Safari Van",
    description: "The only national park in the world set against a city skyline. Just minutes from downtown Nairobi, this park is home to lions, cheetahs, giraffes, and over 400 bird species. Perfect for a half-day game drive.",
  },
  {
    name: "Tsavo National Park",
    image: tsavoImg,
    alt: "Red elephants and baobab trees at dramatic sunset in Tsavo National Park Kenya",
    distance: "330 km from Nairobi (~5 hours)",
    vehicle: "4x4 Land Cruiser",
    description: "Kenya's largest national park, known for its famous red elephants, volcanic landscapes, and incredible diversity. Tsavo East and Tsavo West offer distinctly different experiences — vast open plains and rugged, hilly terrain.",
  },
  {
    name: "Samburu National Reserve",
    image: samburuImg,
    alt: "Reticulated giraffe in dry savanna landscape at Samburu National Reserve Kenya",
    distance: "350 km from Nairobi (~6 hours)",
    vehicle: "4x4 Land Cruiser",
    description: "Home to the 'Samburu Special Five' — Grevy's zebra, reticulated giraffe, Beisa oryx, Somali ostrich, and gerenuk. This remote, stunning reserve offers a true off-the-beaten-path safari experience.",
  },
];

const Destinations = () => {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Explore Kenya</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl mb-4">Destinations</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg opacity-80 max-w-2xl mx-auto">
            From the plains of the Maasai Mara to the flamingo-lined shores of Lake Nakuru — discover Kenya's most breathtaking destinations with the perfect safari vehicle.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 space-y-20">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "" : ""}`}
            >
              <div className={`relative overflow-hidden aspect-[16/10] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <img
                  src={dest.image}
                  alt={dest.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{dest.name}</h2>
                <div className="flex flex-wrap gap-4 mb-4 font-sans text-xs uppercase tracking-wider">
                  <span className="bg-muted px-3 py-1 text-muted-foreground">{dest.distance}</span>
                  <span className="bg-accent/10 text-accent px-3 py-1 font-bold">{dest.vehicle}</span>
                </div>
                <p className="font-sans text-foreground/80 leading-relaxed mb-6">{dest.description}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors"
                >
                  Book This Trip <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Destinations;
