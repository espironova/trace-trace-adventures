import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import maasaiImg from "@/assets/maasai-mara.jpg";
import amboImg from "@/assets/amboseli.jpg";
import nairobiImg from "@/assets/nairobi-park.jpg";
import nakuruImg from "@/assets/lake-nakuru.jpg";
import tsavoImg from "@/assets/tsavo.jpg";
import samburuImg from "@/assets/samburu.jpg";
import aberdareImg from "@/assets/aberdare.jfif";
import bwindiImg from "@/assets/bwindi.jpg";
import murchisonImg from "@/assets/murchison-falls.jpg";
import rwenzoriImg from "@/assets/rwenzori.jpeg";
import kampalaImg from "@/assets/kampala.jfif";
import jinjaImg from "@/assets/jinja.jpg";
import kigaliImg from "@/assets/kigali.jpg";
import lakekivuImg from "@/assets/lake-kivu.jpg";
import nyungweImg from "@/assets/nyungwe.jfif";
import akageraImg from "@/assets/akagera.jfif";

type Destination = {
  name: string;
  description: string;
  image: string;
};

type Country = {
  name: string;
  flag: string;
  destinations: Destination[];
};

const ph = "/placeholder.svg";

const countries: Country[] = [
  {
    name: "Kenya",
    flag: "🇰🇪",
    destinations: [
      { name: "Maasai Mara National Reserve", description: "Home of the Great Wildebeest Migration and the Big Five — Kenya's most iconic safari destination.", image: maasaiImg },
      { name: "Amboseli National Park", description: "Famous for its large elephant herds and breathtaking views of Mount Kilimanjaro.", image: amboImg },
      { name: "Lake Nakuru National Park", description: "A birdwatcher's paradise famous for flamingo colonies and rhino sightings.", image: nakuruImg },
      { name: "Nairobi National Park", description: "The only national park in the world set against a city skyline — lions, giraffes, and more.", image: nairobiImg },
      { name: "Tsavo National Park", description: "Kenya's largest park, known for red elephants, volcanic landscapes, and raw wilderness.", image: tsavoImg },
      { name: "Samburu National Reserve", description: "Home to the Samburu Special Five — Grevy's zebra, reticulated giraffe, and gerenuk.", image: samburuImg },
      { name: "Mombasa", description: "Kenya's coastal gem — white sandy beaches, historic Fort Jesus, and vibrant Swahili culture.", image: ph },
      { name: "Diani Beach", description: "Award-winning tropical beach with crystal-clear waters, perfect for water sports and relaxation.", image: ph },
      { name: "Watamu", description: "Marine national park with stunning coral reefs, sea turtles, and pristine beaches.", image: ph },
      { name: "Malindi", description: "A blend of Swahili, Portuguese, and Italian heritage with beautiful marine parks.", image: ph },
      { name: "Lake Elementaita", description: "A serene soda lake sanctuary for flamingos and pelicans, a UNESCO World Heritage site.", image: ph },
      { name: "Lake Naivasha", description: "A freshwater lake teeming with hippos, birdlife, and surrounded by flower farms.", image: ph },
      { name: "Hell's Gate National Park", description: "Dramatic cliffs and gorges where you can cycle or hike among zebras and giraffes.", image: ph },
      { name: "Mount Kenya", description: "Africa's second-highest peak offering world-class trekking through diverse ecological zones.", image: ph },
      { name: "Aberdare National Park", description: "Misty mountain forests, waterfalls, and tree-top lodges for a unique safari experience.", image: ph },
      { name: "Kisumu", description: "Kenya's lakeside city on Lake Victoria — vibrant markets, Impala Sanctuary, and Kit Mikayi.", image: ph },
      { name: "14 Falls", description: "A spectacular series of waterfalls near Thika, perfect for a day trip from Nairobi.", image: ph },
      { name: "Ngare Ndare", description: "A pristine forest reserve with canopy walkways, waterfalls, and natural swimming pools.", image: ph },
      { name: "Camp Dunda", description: "An adventurous bush camp experience in the heart of Kenya's wild terrain.", image: ph },
      { name: "Nanyuki", description: "A charming highland town at the foot of Mount Kenya — gateway to Laikipia conservancies.", image: ph },
    ],
  },
  {
    name: "Tanzania",
    flag: "🇹🇿",
    destinations: [
      { name: "Mount Kilimanjaro", description: "Africa's highest peak and the world's tallest free-standing mountain — a bucket-list climb.", image: ph },
      { name: "Dar es Salaam", description: "Tanzania's bustling coastal metropolis — gateway to Zanzibar and the southern safari circuit.", image: ph },
      { name: "Zanzibar", description: "The Spice Island — turquoise waters, white sand beaches, and historic Stone Town.", image: ph },
      { name: "Lake Manyara", description: "A scenic park famous for tree-climbing lions, flamingos, and the Great Rift Valley escarpment.", image: ph },
      { name: "Arusha", description: "The safari capital of East Africa — gateway to Serengeti, Ngorongoro Crater, and Kilimanjaro.", image: ph },
    ],
  },
  {
    name: "Uganda",
    flag: "🇺🇬",
    destinations: [
      { name: "Bwindi Impenetrable National Park", description: "Home to half the world's mountain gorillas — a once-in-a-lifetime trekking experience.", image: ph },
      { name: "Murchison Falls National Park", description: "The world's most powerful waterfall, where the Nile forces through a narrow gorge.", image: ph },
      { name: "Rwenzori Mountains", description: "The legendary 'Mountains of the Moon' with snow-capped peaks on the equator.", image: ph },
      { name: "Kampala", description: "Uganda's vibrant capital — bustling markets, nightlife, and the Kasubi Tombs.", image: ph },
      { name: "Jinja", description: "The adventure capital of East Africa — source of the Nile, white-water rafting, and bungee jumping.", image: ph },
    ],
  },
  {
    name: "Rwanda",
    flag: "🇷🇼",
    destinations: [
      { name: "Kigali", description: "Africa's cleanest city — the Genocide Memorial, vibrant arts scene, and excellent dining.", image: ph },
      { name: "Lake Kivu", description: "A stunning freshwater lake surrounded by lush hills — kayaking, beaches, and island hopping.", image: ph },
      { name: "Nyungwe Forest National Park", description: "An ancient rainforest with chimpanzee trekking, canopy walks, and 300+ bird species.", image: ph },
      { name: "Akagera National Park", description: "Rwanda's Big Five safari destination — lions, elephants, rhinos, and stunning lake scenery.", image: ph },
    ],
  },
];

const DestinationCarousel = ({ destinations: dests }: { destinations: Destination[] }) => {
  const [index, setIndex] = useState(0);
  const itemsPerView = typeof window !== "undefined" && window.innerWidth >= 1024 ? 4 : typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;
  const maxIndex = Math.max(0, dests.length - itemsPerView);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${index * (100 / itemsPerView + 1.2)}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {dests.map((dest) => (
            <div key={dest.name} className="flex-shrink-0" style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)` }}>
              <div className="group relative overflow-hidden aspect-[3/4] bg-muted">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-lg text-white mb-1">{dest.name}</h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed line-clamp-2">{dest.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 mt-2 text-[#F4C430] text-xs font-sans uppercase tracking-wider font-bold"
                  >
                    Book Trip <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {dests.length > itemsPerView && (
        <>
          <button onClick={prev} className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center shadow-lg hover:bg-accent transition-colors z-10" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => next()} className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center shadow-lg hover:bg-accent transition-colors z-10" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

const Destinations = () => {
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Explore East Africa</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl mb-4">Destinations</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg opacity-80 max-w-2xl mx-auto">
            From the plains of the Maasai Mara to the gorilla forests of Bwindi — discover East Africa's most breathtaking destinations with the perfect vehicle.
          </motion.p>
        </div>
      </section>

      {countries.map((country, ci) => (
        <section key={country.name} className={`py-20 ${ci % 2 === 0 ? "bg-background" : "bg-muted"}`}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                <span className="mr-3 text-4xl">{country.flag}</span>
                {country.name} Destinations
              </h2>
              <p className="font-sans text-sm text-muted-foreground mt-2">{country.destinations.length} destinations</p>
            </motion.div>

            <DestinationCarousel destinations={country.destinations} />
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default Destinations;
