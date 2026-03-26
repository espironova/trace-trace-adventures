import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import fleetInterior from "@/assets/fleet-interior.jpg";
import { Shield, Users, Clock, Award } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 },
};

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src={fleetInterior} alt="Interior of Track and Trace Adventures tour bus showing comfortable seating" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-white/80 mb-3">About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl text-white">Our Story</motion.h1>
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
                  Track and Trace Adventures is a leading car hire service in Nairobi, Kenya, with over 10 years of experience. We offer a diverse fleet of well-maintained vehicles, catering to various client needs, from individual travelers to large groups.
                </p>
                <p>
                  Our dedicated team of professional drivers is trained to prioritize safety and customer satisfaction, ensuring that your travel experience with us is seamless and enjoyable. From executive sedans for airport transfers to rugged 4x4 Land Cruisers built for Kenya's wildest terrains — we have it all.
                </p>
                <p>
                  Whether you need a JKIA airport pickup at 3 AM, a week-long safari through the Maasai Mara, or a reliable van hire for your group — we deliver every time. We also offer personalized travel consultations to help you plan the perfect Kenyan adventure.
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
              {[
                { icon: Shield, label: "Licensed & Insured", desc: "Fully licensed fleet with comprehensive insurance coverage" },
                { icon: Users, label: "Expert Team", desc: "Professional drivers with years of local experience" },
                { icon: Clock, label: "24/7 Available", desc: "Round-the-clock service for all your transport needs" },
                { icon: Award, label: "10+ Years", desc: "Over a decade of reliable service across Kenya" },
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
                To provide exceptional transportation solutions in Kenya, ensuring every journey is reliable, comfortable, and unforgettable.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} className="text-center border border-border bg-card p-10">
              <h2 className="font-serif text-3xl md:text-4xl mb-6 text-accent">Our Mission</h2>
              <p className="font-sans text-lg text-foreground/80 leading-relaxed">
                To be the preferred car hire service in Nairobi, offering top-notch vehicles and unparalleled customer service. We strive to exceed our clients' expectations by providing reliable, safe, and personalized transportation solutions that enhance their travel experiences.
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
              { title: "Local Knowledge", desc: "Born and raised in Kenya, our team offers insider knowledge of routes, wildlife, and hidden gems." },
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
    </Layout>
  );
};

export default About;
