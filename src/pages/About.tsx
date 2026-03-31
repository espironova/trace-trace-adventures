import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Shield, Users, Clock, Award, Star } from "lucide-react";
import iconDrivers from "@/assets/icon-drivers.png";
import iconFleet from "@/assets/icon-fleet.png";
import icon24h from "@/assets/icon-24hours.png";
import iconExpertise from "@/assets/icon-local-expertise.png";
import partnerBni from "@/assets/partner-bni.png";
import partnerTra from "@/assets/partner-tra.png";
import partnerEagles from "@/assets/partner-eagles.jfif";
import partnerMashariki from "@/assets/partner-mashariki.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 },
};

const whyUs = [
  {
    image: iconDrivers,
    title: "Experienced Drivers",
    desc: "Professional, licensed drivers with years of experience navigating East Africa's roads and national parks safely.",
    alt: "Illustration representing licensed drivers for Nairobi airport and safari transport",
  },
  {
    image: iconFleet,
    title: "Well-Maintained Fleet",
    desc: "Every vehicle is regularly serviced and inspected, from comfortable sedans to rugged 4x4 Land Cruisers.",
    alt: "Illustration representing a serviced vehicle fleet for hire in Kenya",
  },
  {
    image: icon24h,
    title: "24/7 Availability",
    desc: "Round-the-clock service for airport transfers, emergency travel, and last-minute bookings. We're always ready.",
    alt: "Icon representing 24-hour car hire and transfer availability in East Africa",
  },
  {
    image: iconExpertise,
    title: "Local Expertise",
    desc: "Over 20 years of experience. Our team knows every route, hidden gem, and the best safari experiences across East Africa.",
    alt: "Icon representing local travel expertise across Kenya, Tanzania, Uganda, and Rwanda",
  },
];

const partners = [
  { name: "BNI", image: partnerBni },
  { name: "Tourism Regulatory Authority", image: partnerTra },
  { name: "Eagles Management Consultants", image: partnerEagles },
  { name: "Mashariki Shuttles", image: partnerMashariki },
];

const About = () => {
  return (
    <Layout>
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-muted" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,196,48,0.22),transparent_55%)]" />
        <div className="absolute -top-24 left-[15%] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-heroGold mb-3">About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl text-primary-foreground drop-shadow-sm">
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Who We Are</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Car Hire Company for Destination Lovers</h2>
              <div className="space-y-4 font-sans text-foreground/80 leading-relaxed">
                <p>
                  Track and Trace Adventures is a leading car hire service headquartered in Nairobi, Kenya, with over 20 years of experience serving clients across East Africa. We offer a diverse fleet of well-maintained vehicles, catering to various client needs, from individual travelers to large groups.
                </p>
                <p>
                  Our dedicated team of professional drivers is trained to prioritize safety and customer satisfaction, ensuring that your travel experience with us is seamless and enjoyable. From executive sedans for airport transfers to rugged 4x4 Land Cruisers built for East Africa's wildest terrains, we have it all.
                </p>
                <p>
                  Whether you need a JKIA airport pickup at 3 AM, a week-long safari through the Maasai Mara, conference transport for your corporate event, or a reliable van hire for your group, we deliver every time. Train travellers can count on us for road links to and from Kenya SGR stations, including Nairobi Terminus and Mombasa Terminus. We also offer personalized travel consultations to help you plan the perfect East African adventure.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {/* 20 Years Badge */}
              <div className="col-span-2 flex justify-center mb-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="relative w-44 h-44 rounded-full border-4 border-accent bg-primary flex flex-col items-center justify-center text-center shadow-lg"
                >
                  <Star className="w-6 h-6 text-accent mb-1" />
                  <span className="font-serif text-4xl font-bold text-accent leading-none">20+</span>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-primary-foreground/80 mt-1">Years of</span>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-bold">Excellence</span>
                </motion.div>
              </div>

              {[
                { icon: Shield, label: "Licensed & Insured", desc: "Fully licensed fleet with comprehensive insurance coverage" },
                { icon: Users, label: "Expert Team", desc: "Professional drivers with years of local experience" },
                { icon: Clock, label: "24/7 Available", desc: "Round-the-clock service for all your transport needs" },
                { icon: Award, label: "East Africa Wide", desc: "Serving Kenya, Tanzania, Uganda, and Rwanda" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border p-6 text-center">
                  <item.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                  <h3 className="font-serif text-lg mb-2">{item.label}</h3>
                  <p className="font-sans text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div {...fadeInUp} className="text-center border border-border bg-card p-10">
              <h2 className="font-serif text-3xl md:text-4xl mb-6 text-accent">Our Vision</h2>
              <p className="font-sans text-lg text-foreground/80 leading-relaxed">
                To provide exceptional transportation solutions across East Africa, ensuring every journey is reliable, comfortable, and unforgettable.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} className="text-center border border-border bg-card p-10">
              <h2 className="font-serif text-3xl md:text-4xl mb-6 text-accent">Our Mission</h2>
              <p className="font-sans text-lg text-foreground/80 leading-relaxed">
                To be the preferred car hire service in East Africa, offering top-notch vehicles and unparalleled customer service. We strive to exceed our clients' expectations by providing reliable, safe, and personalized transportation solutions that enhance their travel experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Reliability", desc: "We arrive on time, every time. Your plans depend on us, and we never let you down." },
              { title: "Safety First", desc: "All vehicles undergo regular maintenance. Our drivers are trained professionals who prioritize your well-being." },
              { title: "Local Knowledge", desc: "With roots across East Africa, our team offers insider knowledge of routes, wildlife, and hidden gems in Kenya, Tanzania, Uganda, and Rwanda." },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border border-border bg-card p-8 text-center"
              >
                <h3 className="font-serif text-xl mb-3 text-accent">{v.title}</h3>
                <p className="font-sans text-sm text-foreground/80 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Track & Trace */}
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
                  <img src={item.image} alt={item.alt} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="font-sans text-sm opacity-80 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Regulation */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Trusted Partnerships</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Partners & Regulation</h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
              Working with trusted partners and operating under recognized authorities.
            </p>
          </motion.div>
        </div>

        {/* Auto-scrolling marquee carousel */}
        <div className="relative">
          <div className="flex animate-marquee">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 mx-8 bg-card rounded-xl shadow-md border border-border p-8 flex flex-col items-center justify-center gap-3 min-w-[220px] min-h-[160px]"
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="h-14 w-auto max-w-[160px] object-contain"
                  loading="lazy"
                />
                <p className="font-sans text-sm text-center text-foreground/90 font-medium leading-snug max-w-[200px]">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
