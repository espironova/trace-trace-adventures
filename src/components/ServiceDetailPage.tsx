import { useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, type LucideIcon } from "lucide-react";
import Layout from "@/components/Layout";
import BookingModal from "@/components/BookingModal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

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

export type Highlight = { icon: LucideIcon; title: string; body: string };
export type Step = { n: string; title: string; body: string };
export type VehicleItem = { img: string; name: string; blurb: string; alt: string };
export type ImageCardItem = { img: string; title: string; body?: string; alt: string };
export type IconCardItem = { icon: LucideIcon; title: string; body?: string };

export type MidSection =
  | { kind: "vehicles"; kicker: string; heading: string; items: VehicleItem[] }
  | { kind: "image-cards"; kicker: string; heading: string; items: ImageCardItem[] }
  | { kind: "icon-cards"; kicker: string; heading: string; items: IconCardItem[] };

export interface ServiceDetailPageProps {
  serviceId?: string;
  heroImage: string;
  heroAlt: string;
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  highlightsKicker?: string;
  highlightsHeading?: string;
  highlights: Highlight[];
  stepsKicker?: string;
  stepsHeading?: string;
  steps: Step[];
  sections?: MidSection[];
  coverage?: { kicker?: string; heading: string; body: string };
  ctaHeading: string;
  ctaBody?: string;
  bgAlternate?: boolean;
}

const ServiceDetailPage = ({
  serviceId,
  heroImage,
  heroAlt,
  heroKicker,
  heroTitle,
  heroSubtitle,
  highlightsKicker = "Why Travelers Choose Us",
  highlightsHeading = "Service Highlights",
  highlights,
  stepsKicker = "How It Works",
  stepsHeading = "Three Simple Steps",
  steps,
  sections = [],
  coverage,
  ctaHeading,
  ctaBody = "Talk to our team on WhatsApp, call us directly, or fill in the online booking form. We respond fast, day or night.",
}: ServiceDetailPageProps) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  // Alternate bg starting after highlights (background) and how-it-works (muted).
  // sections start at index 2 in the overall sequence, so:
  const sectionBg = (idx: number) => (idx % 2 === 0 ? "bg-background" : "bg-muted");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden py-24">
        <img src={heroImage} alt={heroAlt} className="absolute inset-0 w-full h-full object-cover" />
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
            {heroKicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl mb-4 text-primary-foreground drop-shadow-sm"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-sans text-lg text-primary-foreground/85 max-w-2xl mx-auto"
          >
            {heroSubtitle}
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

      {/* Highlights */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent font-bold mb-3">
              {highlightsKicker}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">{highlightsHeading}</h2>
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

      {/* Steps */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent font-bold mb-3">
              {stepsKicker}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">{stepsHeading}</h2>
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

      {/* Dynamic sections */}
      {sections.map((sec, idx) => (
        <section key={`${sec.kind}-${idx}`} className={`py-24 ${sectionBg(idx)}`}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-14">
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent font-bold mb-3">
                {sec.kicker}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">{sec.heading}</h2>
            </motion.div>

            {sec.kind === "vehicles" && (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${sec.items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-8`}>
                {sec.items.map((v, i) => (
                  <motion.div
                    key={v.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
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
            )}

            {sec.kind === "image-cards" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sec.items.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="bg-card border border-border overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={c.img}
                        alt={c.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-foreground mb-2">{c.title}</h3>
                      {c.body && (
                        <p className="font-sans text-sm text-foreground/70 leading-relaxed">{c.body}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {sec.kind === "icon-cards" && (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${sec.items.length >= 4 ? "lg:grid-cols-3" : "lg:grid-cols-3"} gap-6`}>
                {sec.items.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="bg-card border border-border p-7 transition-shadow hover:shadow-lg"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-heroGold/15 text-accent mb-5">
                      <c.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-2">{c.title}</h3>
                    {c.body && (
                      <p className="font-sans text-sm text-foreground/70 leading-relaxed">{c.body}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Coverage */}
      {coverage && (
        <section className={`py-24 ${sections.length % 2 === 0 ? "bg-background" : "bg-muted"}`}>
          <div className="container mx-auto px-4">
            <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent font-bold mb-3">
                {coverage.kicker ?? "Coverage"}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-5">{coverage.heading}</h2>
              <p className="font-sans text-foreground/80 leading-relaxed">{coverage.body}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,196,48,0.22),transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">{ctaHeading}</h2>
            <p className="font-sans text-primary-foreground/85 mb-8">{ctaBody}</p>
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
        initialServiceId={serviceId}
      />
    </Layout>
  );
};

export default ServiceDetailPage;