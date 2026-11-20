import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import RateCalculator from "@/components/RateCalculator";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const CONTACT_EMAIL = "info@tracktraceadventures.co.ke";

const OFFICE_MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Milestone+Business+Center,+Northern+Bypass+Road,+Nairobi,+Kenya&output=embed&hl=en&z=16";

const serviceLabels: Record<string, string> = {
  "airport-transfer": "Airport Transfer",
  "safari-tour": "Safari Tour",
  "car-hire": "Car Hire / Van Hire",
  "long-distance": "Long Distance Transfer",
  "sgr-transfer": "SGR Transfers",
  "travel-consultation": "Travel Consultation",
  "corporate": "Corporate Transport",
  "leave-review": "Leave a review",
  other: "Other",
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ name: string; whatsappText: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    const serviceLabel = form.service ? serviceLabels[form.service] ?? form.service : "General inquiry";
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim().slice(0, 120),
      email: form.email.trim().slice(0, 200),
      phone: (form.phone || "").trim().slice(0, 40),
      service: form.service,
      service_label: serviceLabel.slice(0, 80),
      message: form.message.trim().slice(0, 4000),
    });
    setSending(false);

    if (error) {
      toast({
        title: "Message could not be saved",
        description: `Please email us directly at ${CONTACT_EMAIL} or call +254 721 521 009.`,
        variant: "destructive",
      });
      return;
    }

    setSent({
      name: form.name.trim(),
      whatsappText: `Hello Track & Trace, I'm ${form.name.trim()}. I just sent a message on your website about ${serviceLabel}.\n\n${form.message.trim()}`,
    });
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    toast({ title: "Message sent", description: "Thank you! We'll get back to you within 24 hours." });
  };

  return (
    <Layout>
      <section className="relative bg-primary text-primary-foreground py-14 md:py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(244,196,48,0.18),transparent_60%)]" />
        <div className="absolute -top-16 left-[10%] h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-[8%] h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="h-px w-16 bg-heroGold mx-auto mb-4" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-heroGold mb-3">Get in Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-5xl mb-4">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-base md:text-lg opacity-80 max-w-2xl mx-auto">
            Ready to book? Have questions? Reach out and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Send Us a Message</h2>
              {sent ? (
                <div className="border border-accent/40 bg-accent/5 p-8 space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                  <h3 className="font-serif text-2xl text-foreground">Thank you, {sent.name}!</h3>
                  <p className="font-sans text-sm text-foreground/80">
                    Your message has been received. Our team will get back to you within 24 hours.
                  </p>
                  <p className="font-sans text-sm text-foreground/80">Need a faster reply? Continue the conversation on WhatsApp.</p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`https://wa.me/254721521009?text=${encodeURIComponent(sent.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-sans text-xs uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSent(null)}
                      className="inline-flex items-center gap-2 border border-accent text-accent px-6 py-3 font-sans text-xs uppercase tracking-[0.15em] font-bold hover:bg-accent/10 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-sans text-sm text-foreground/80 block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-sm text-foreground/80 block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-sm text-foreground/80 block mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="+254..."
                    />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-sm text-foreground/80 block mb-1.5">Service Required *</label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select a service...</option>
                    <option value="airport-transfer">Airport Transfer</option>
                    <option value="safari-tour">Safari Tour</option>
                    <option value="car-hire">Car Hire / Van Hire</option>
                    <option value="long-distance">Long Distance Transfer</option>
                    <option value="sgr-transfer">SGR Transfers</option>
                    <option value="travel-consultation">Travel Consultation</option>
                    <option value="corporate">Corporate Transport</option>
                    <option value="leave-review">Leave a review</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-sans text-sm text-foreground/80 block mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Tell us about your trip — dates, destination, number of passengers..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" /> {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <p className="font-sans font-bold text-sm text-foreground">Our Office</p>
                    <p className="font-sans text-sm text-muted-foreground">Milestone Business Center, Northern Bypass Road, Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <p className="font-sans font-bold text-sm text-foreground">Phone / WhatsApp</p>
                    <a href="tel:+254721521009" className="font-sans text-sm text-accent hover:underline block">+254 721 521 009</a>
                    <a href="tel:+254736257553" className="font-sans text-sm text-muted-foreground hover:text-accent block">0736 257 553</a>
                    <a href="tel:+254722178334" className="font-sans text-sm text-muted-foreground hover:text-accent block">0722 178 334</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <div>
                    <p className="font-sans font-bold text-sm text-foreground">Email</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-sans text-sm text-accent hover:underline">{CONTACT_EMAIL}</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RateCalculator />

      <section className="w-full bg-muted border-t border-border" aria-label="Office location map">
        <div className="relative w-full h-[min(56vh,560px)] min-h-[320px]">
          <iframe
            src={OFFICE_MAP_EMBED_SRC}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Track & Trace Adventures office location on Google Maps - Milestone Business Center, Northern Bypass Road, Nairobi, Kenya"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
