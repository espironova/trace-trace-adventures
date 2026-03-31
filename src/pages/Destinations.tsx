import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import bgDestinations from "@/assets/bg-destinations.png";
import maasaiImg from "@/assets/maasai-mara.jpg";
import amboImg from "@/assets/amboseli.jpg";
import nairobiImg from "@/assets/nairobi-park.jpg";
import nakuruImg from "@/assets/lake-nakuru.jpg";
import mombasaImg from "@/assets/mombasa.webp";
import dianiImg from "@/assets/diani.jfif";
import watamuImg from "@/assets/watamu.jfif";
import malindiImg from "@/assets/malindi.webp";
import elementaitaImg from "@/assets/lake-elementaita.jpg";
import naivashaImg from "@/assets/lake-naivasha.jpg";
import hellsGateImg from "@/assets/hells-gate.jpg";
import tsavoImg from "@/assets/tsavo.jpg";
import samburuImg from "@/assets/samburu.jpg";
import aberdareImg from "@/assets/aberdare.jfif";
import mtKenyaImg from "@/assets/mt-kenya.avif";
import kisumuImg from "@/assets/kisumu.jpg";
import bwindiImg from "@/assets/bwindi.jpg";
import murchisonImg from "@/assets/murchison-falls.jpg";
import rwenzoriImg from "@/assets/rwenzori.jpeg";
import kampalaImg from "@/assets/kampala.jfif";
import jinjaImg from "@/assets/jinja.jpg";
import kigaliImg from "@/assets/kigali.jpg";
import lakekivuImg from "@/assets/lake-kivu.jpg";
import nyungweImg from "@/assets/nyungwe.jfif";
import akageraImg from "@/assets/akagera.jfif";
import kilimanjaroImg from "@/assets/kilimanjaro.jpg";
import darImg from "@/assets/dar-es-salaam.webp";
import zanzibarImg from "@/assets/zanzibar.jpg";
import lakeManyaraImg from "@/assets/lake-manyara.jpg";
import arushaImg from "@/assets/arusha.webp";
import fourteenFallsImg from "@/assets/14-falls.gif";
import nanyukiImg from "@/assets/nanyuki.jpg";
import ngareNdareImg from "@/assets/ngare-ndare.jpg";
import campDundaImg from "@/assets/camp-dunda.jpg";

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
      { name: "Mombasa", description: "Kenya's coastal gem — white sandy beaches, historic Fort Jesus, and vibrant Swahili culture.", image: mombasaImg },
      { name: "Diani Beach", description: "Award-winning tropical beach with crystal-clear waters, perfect for water sports and relaxation.", image: dianiImg },
      { name: "Watamu", description: "Marine national park with stunning coral reefs, sea turtles, and pristine beaches.", image: watamuImg },
      { name: "Malindi", description: "A blend of Swahili, Portuguese, and Italian heritage with beautiful marine parks.", image: malindiImg },
      { name: "Lake Elementaita", description: "A serene soda lake sanctuary for flamingos and pelicans, a UNESCO World Heritage site.", image: elementaitaImg },
      { name: "Lake Naivasha", description: "A freshwater lake teeming with hippos, birdlife, and surrounded by flower farms.", image: naivashaImg },
      { name: "Hell's Gate National Park", description: "Dramatic cliffs and gorges where you can cycle or hike among zebras and giraffes.", image: hellsGateImg },
      { name: "Mount Kenya", description: "Africa's second-highest peak offering world-class trekking through diverse ecological zones.", image: mtKenyaImg },
      { name: "Aberdare National Park", description: "Misty mountain forests, waterfalls, and tree-top lodges for a unique safari experience.", image: aberdareImg },
      { name: "Kisumu", description: "Kenya's lakeside city on Lake Victoria — vibrant markets, Impala Sanctuary, and Kit Mikayi.", image: kisumuImg },
      { name: "14 Falls", description: "A spectacular series of waterfalls near Thika, perfect for a day trip from Nairobi.", image: fourteenFallsImg },
      { name: "Ngare Ndare", description: "A pristine forest reserve with canopy walkways, waterfalls, and natural swimming pools.", image: ngareNdareImg },
      { name: "Camp Dunda", description: "An adventurous bush camp experience in the heart of Kenya's wild terrain.", image: campDundaImg },
      { name: "Nanyuki", description: "A charming highland town at the foot of Mount Kenya — gateway to Laikipia conservancies.", image: nanyukiImg },
    ],
  },
  {
    name: "Tanzania",
    flag: "🇹🇿",
    destinations: [
      { name: "Mount Kilimanjaro", description: "Africa's highest peak and the world's tallest free-standing mountain — a bucket-list climb.", image: kilimanjaroImg },
      { name: "Dar es Salaam", description: "Tanzania's bustling coastal metropolis — gateway to Zanzibar and the southern safari circuit.", image: darImg },
      { name: "Zanzibar", description: "The Spice Island — turquoise waters, white sand beaches, and historic Stone Town.", image: zanzibarImg },
      { name: "Lake Manyara", description: "A scenic park famous for tree-climbing lions, flamingos, and the Great Rift Valley escarpment.", image: lakeManyaraImg },
      { name: "Arusha", description: "The safari capital of East Africa — gateway to Serengeti, Ngorongoro Crater, and Kilimanjaro.", image: arushaImg },
    ],
  },
  {
    name: "Uganda",
    flag: "🇺🇬",
    destinations: [
      { name: "Bwindi Impenetrable National Park", description: "Home to half the world's mountain gorillas — a once-in-a-lifetime trekking experience.", image: bwindiImg },
      { name: "Murchison Falls National Park", description: "The world's most powerful waterfall, where the Nile forces through a narrow gorge.", image: murchisonImg },
      { name: "Rwenzori Mountains", description: "The legendary 'Mountains of the Moon' with snow-capped peaks on the equator.", image: rwenzoriImg },
      { name: "Kampala", description: "Uganda's vibrant capital — bustling markets, nightlife, and the Kasubi Tombs.", image: kampalaImg },
      { name: "Jinja", description: "The adventure capital of East Africa — source of the Nile, white-water rafting, and bungee jumping.", image: jinjaImg },
    ],
  },
  {
    name: "Rwanda",
    flag: "🇷🇼",
    destinations: [
      { name: "Kigali", description: "Africa's cleanest city — the Genocide Memorial, vibrant arts scene, and excellent dining.", image: kigaliImg },
      { name: "Lake Kivu", description: "A stunning freshwater lake surrounded by lush hills — kayaking, beaches, and island hopping.", image: lakekivuImg },
      { name: "Nyungwe Forest National Park", description: "An ancient rainforest with chimpanzee trekking, canopy walks, and 300+ bird species.", image: nyungweImg },
      { name: "Akagera National Park", description: "Rwanda's Big Five safari destination — lions, elephants, rhinos, and stunning lake scenery.", image: akageraImg },
    ],
  },
];

const DestinationRow = ({ dest, index }: { dest: Destination; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10 items-center ${
        index > 0 ? "mt-16 md:mt-20" : ""
      }`}
    >
      {/* Text Side */}
      <motion.div
        initial={{ x: isEven ? -80 : 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`md:col-span-4 flex flex-col justify-center ${
          isEven ? "md:order-1" : "md:order-2"
        }`}
      >
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{dest.name}</h3>
        <p className="font-sans text-muted-foreground leading-relaxed mb-6">{dest.description}</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-accent font-sans text-sm uppercase tracking-[0.2em] font-bold hover:gap-3 transition-all w-fit"
        >
          Hire a Vehicle <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Image Side */}
      <motion.div
        initial={{ x: isEven ? 80 : -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`md:col-span-6 ${isEven ? "md:order-2" : "md:order-1"}`}
      >
        <div className="overflow-hidden group">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-[300px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width={800}
            height={500}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Destinations = () => {
  return (
    <Layout>
      {/* Hero with background image */}
      <section className="relative py-24 text-center overflow-hidden">
        <img
          src={bgDestinations}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">
            Explore East Africa
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl text-white mb-4">
            Destinations
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg text-white/80 max-w-2xl mx-auto">
            From the plains of the Maasai Mara to the gorilla forests of Bwindi — discover East Africa's most breathtaking destinations with the perfect vehicle.
          </motion.p>
        </div>
      </section>

      {/* Country sections with split layout */}
      {countries.map((country, ci) => (
        <section key={country.name} className={`py-20 ${ci % 2 === 0 ? "bg-background" : "bg-muted"}`}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                <span className="mr-3 text-4xl">{country.flag}</span>
                {country.name}
              </h2>
            </motion.div>

            {country.destinations.map((dest, di) => (
              <DestinationRow key={dest.name} dest={dest} index={di} />
            ))}
          </div>
        </section>
      ))}
    </Layout>
  );
};

export default Destinations;
