import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Shield, Users, Clock, Award, Star, GraduationCap, Heart, BookOpen, Eye, Target } from "lucide-react";
import iconDrivers from "@/assets/icon-drivers.png";
import iconFleet from "@/assets/icon-fleet.png";
import icon24h from "@/assets/icon-24hours.png";
import iconExpertise from "@/assets/icon-local-expertise.png";
import partnerBni from "@/assets/partner-bni.png";
import partnerTra from "@/assets/partner-tra.png";
import partnerEagles from "@/assets/partner-eagles.jfif";
import partnerMashariki from "@/assets/partner-mashariki.jpg";
import givingBackCommunity from "@/assets/giving-back-community.png";
import aboutHeroBg from "@/assets/about-hero-bg.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 },
};

const whyUs = [
  {
    image: iconDrivers,
    title: "Experienced, Licensed Drivers",
    desc: "20+ years of experience navigating East Africa's roads and national parks safely.",
    alt: "Illustration representing licensed drivers for Nairobi airport and safari transport",
  },
  {
    image: iconFleet,
    title: "Premium,Well-Maintained Fleet",
    desc: "Spotless sedans, 4x4 Land Cruisers, safari vans and minibuses all regularly serviced.",
    alt: "Illustration representing a serviced vehicle fleet for hire in Kenya",
  },
  {
    image: icon24h,
    title: "24/7 Availability",
    desc: "Late-night JKIA arrivals, early departures, emergency transfers we’re always ready.",
    alt: "Icon representing 24-hour car hire and transfer availability in East Africa",
  },
  {
    image: iconExpertise,
    title: "Local Expertise",
    desc: "We know the best routes, hidden gems, and the best safari experiences across East Africa.",
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
        <img
          src={aboutHeroBg}
          alt="Track & Trace Adventures fleet on a Kenyan road"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,196,48,0.22),transparent_55%)]" />
        <div className="absolute -top-24 left-[15%] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-heroGold mb-3">About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl text-primary-foreground drop-shadow-sm">
            Track & Trace Adventures Since 2005
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
                  Our dedicated team of professional drivers are trained to prioritize safety and customer satisfaction, ensuring that your travel experience with us is seamless and enjoyable.
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

      {/* Giving back — community & education */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_100%_0%,rgba(244,196,48,0.08),transparent_50%)]" />
        <div className="pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative mx-auto max-w-xl lg:max-w-none">
                <div
                  className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -bottom-6 -right-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
                  aria-hidden
                />
                <div
                  className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-white/40 via-accent/15 to-primary/10 backdrop-blur-md ring-1 ring-white/50 shadow-[0_8px_40px_-8px_hsl(24_30%_15%/0.2)] dark:from-white/5 dark:via-accent/10 dark:ring-white/10"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-[1.35rem] shadow-[0_24px_60px_-12px_hsl(24_30%_15%/0.28)] ring-1 ring-white/30 backdrop-blur-[2px] dark:ring-white/10">
                  <img
                    src={givingBackCommunity}
                    alt="School children in Kenya smiling, representing our education and community support initiatives"
                    className="aspect-[4/3] w-full object-cover object-[center_25%] sm:aspect-[16/10] lg:aspect-[5/4] lg:min-h-[380px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-heroGold/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md shadow-lg md:px-5 md:py-4">
                      <p className="font-sans text-sm leading-snug text-primary-foreground drop-shadow-sm md:text-base">
                        Investing in young learners and the communities that make every journey meaningful.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="space-y-6 lg:pl-2"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-card shadow-sm">
                <GraduationCap className="h-6 w-6 text-accent" aria-hidden />
              </div>
              <div>
                <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent">Beyond the Journey</p>
                <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  Giving Back to the Community
                </h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-heroGold" />
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-sans text-sm text-foreground/90 shadow-sm">
                  <Heart className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  Local community impact
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-sans text-sm text-foreground/90 shadow-sm">
                  <BookOpen className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  Education access
                </span>
              </div>

              <div className="space-y-4 border-l-2 border-accent/30 pl-6 font-sans leading-relaxed text-foreground/85">
                <p>
                  We believe every journey should leave a positive impact. As a trusted car hire company, our commitment goes beyond transportation. We invest in the communities that welcome our travellers, supporting meaningful and lasting change.
                </p>
                <p>
                  One of our key initiatives focuses on improving access to education for children in need. By helping create opportunities for learning, we aim to empower young lives and contribute to a stronger future for communities across Kenya.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(var(--accent)/0.12),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,hsl(var(--primary)/0.08),transparent_45%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/20 to-transparent opacity-70 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-gradient-to-tl from-heroGold/15 to-transparent opacity-60 blur-3xl"
          aria-hidden
        />
        <div className="container relative mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent">Direction</p>
            <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">Vision &amp; Mission</h2>
            <p className="mt-4 font-sans text-muted-foreground">
              What we aspire to and how we show up every day across East Africa.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            {[
              {
                title: "Our Vision",
                icon: Eye,
                body:
                  "To provide exceptional transportation solutions across East Africa, ensuring every journey is reliable, comfortable, and unforgettable.",
                accent: "from-accent/30 via-heroGold/20 to-primary/15",
                blob: "left-0 top-0 -translate-x-1/4 -translate-y-1/4",
              },
              {
                title: "Our Mission",
                icon: Target,
                body:
                  "To be the preferred car hire service in East Africa, offering top-notch vehicles and unparalleled customer service. We strive to exceed our clients' expectations by providing reliable, safe, and personalized transportation solutions that enhance their travel experiences.",
                accent: "from-primary/25 via-accent/20 to-heroGold/10",
                blob: "right-0 bottom-0 translate-x-1/4 translate-y-1/4",
              },
            ].map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex min-h-[min(100%,420px)] md:min-h-[28rem]"
              >
                <div
                  className={`pointer-events-none absolute ${block.blob} h-40 w-40 rounded-full bg-gradient-to-br ${block.accent} opacity-80 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  aria-hidden
                />
                <div className="relative flex h-full w-full flex-col rounded-[1.75rem] border border-white/50 bg-gradient-to-br from-background/70 via-background/50 to-muted/40 p-8 shadow-[0_12px_48px_-12px_hsl(24_30%_15%/0.15)] backdrop-blur-xl dark:border-white/10 dark:from-card/40 dark:via-card/25 dark:to-card/15 md:p-10">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent opacity-60" aria-hidden />
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/40 bg-white/30 shadow-inner backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                      <block.icon className="h-7 w-7 text-accent" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-accent/40 via-heroGold/30 to-transparent" aria-hidden />
                  </div>
                  <h3 className="font-serif text-2xl text-accent md:text-3xl">{block.title}</h3>
                  <div className="mt-5 flex flex-1 flex-col justify-center">
                    <p className="font-sans text-base leading-relaxed text-foreground/85 md:text-lg">
                      {block.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted">
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
