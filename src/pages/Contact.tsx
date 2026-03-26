import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting Track & Trace Adventures. We'll get back to you within 24 hours.",
    });
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Get in Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl mb-4">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg opacity-80 max-w-2xl mx-auto">
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
                    <option value="travel-consultation">Travel Consultation</option>
                    <option value="corporate">Corporate Transport</option>
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
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Contact Information</h2>

              <div className="space-y-6 mb-10">
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
                    <a href="mailto:info@tracktraceadventures.co.ke" className="font-sans text-sm text-accent hover:underline">info@tracktraceadventures.co.ke</a>
                  </div>
                </div>
              </div>

              <div className="aspect-[4/3] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.978!2d36.8463!3d-1.2082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTInMzAuMCJTIDM2wrA1MCc0Ni43IkU!5e0!3m2!1sen!2ske!4v1000000000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Track & Trace Adventures office location on Google Maps - Milestone Business Center, Northern Bypass Road, Nairobi, Kenya"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
