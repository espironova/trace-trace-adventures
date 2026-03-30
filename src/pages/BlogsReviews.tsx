import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import blogSafari from "@/assets/blog-safari-destinations.jpg";
import blogAirport from "@/assets/blog-airport-tips.jpg";
import blog4x4 from "@/assets/blog-4x4-adventure.jpg";
import blogMara from "@/assets/blog-maasai-mara-season.jpg";
import blogLongDist from "@/assets/blog-long-distance.jpg";

const blogs = [
  {
    title: "Top 5 Safari Destinations in Kenya You Must Visit",
    excerpt: "From the endless plains of the Maasai Mara to the elephant-filled landscapes of Amboseli, Kenya offers some of the world's most spectacular safari experiences.",
    date: "March 15, 2026",
    category: "Destinations",
    readTime: "5 min read",
    image: blogSafari,
    alt: "Aerial view of Maasai Mara savanna with wildebeest herds migrating",
  },
  {
    title: "Airport Transfer Tips for First-Time Visitors to Nairobi",
    excerpt: "Arriving at JKIA for the first time? From booking your transfer in advance to what to expect at arrivals, here's everything you need for a smooth airport pickup.",
    date: "March 8, 2026",
    category: "Travel Tips",
    readTime: "4 min read",
    image: blogAirport,
    alt: "Professional driver waiting at airport arrivals with name sign",
  },
  {
    title: "Why Hire a 4x4 for Your Kenya Adventure",
    excerpt: "Kenya's national parks have rugged terrain that standard vehicles can't handle. Learn why a 4x4 Land Cruiser is the best choice for your safari.",
    date: "February 28, 2026",
    category: "Car Hire",
    readTime: "6 min read",
    image: blog4x4,
    alt: "Toyota Land Cruiser driving on dusty safari road in Kenya",
  },
  {
    title: "Best Time to Visit the Maasai Mara: A Seasonal Guide",
    excerpt: "The Maasai Mara is stunning year-round, but each season offers a different experience. Timing your visit makes all the difference.",
    date: "February 15, 2026",
    category: "Safari Tours",
    readTime: "5 min read",
    image: blogMara,
    alt: "Wildebeest Great Migration river crossing in Maasai Mara",
  },
  {
    title: "Nairobi to Mombasa: Your Long-Distance Travel Options",
    excerpt: "Planning a trip from Nairobi to the coast? We break down the best ways to travel and why hiring a dedicated vehicle might be your best bet.",
    date: "February 5, 2026",
    category: "Long Distance",
    readTime: "4 min read",
    image: blogLongDist,
    alt: "Tour bus driving through scenic Kenyan countryside highway",
  },
];

const reviews = [
  { name: "Sarah Mitchell", location: "London, UK", text: "Track & Trace picked us up from JKIA at midnight — the driver was already waiting with a name sign. Spotless vehicle, smooth ride to our hotel. Couldn't have asked for a better first impression of Kenya.", rating: 5, service: "Airport Transfer" },
  { name: "James Kariuki", location: "Nairobi, Kenya", text: "Our 3-day Maasai Mara safari was absolutely life-changing. The Land Cruiser was in perfect condition, and our guide Joseph spotted animals we would have never seen on our own. Truly world-class.", rating: 5, service: "Safari Tour — Maasai Mara" },
  { name: "Priya Deshmukh", location: "Mumbai, India", text: "Rented a safari van for a week-long family trip across Kenya. From Nairobi to Amboseli to Lake Nakuru — the vehicle handled everything beautifully. Great value for money.", rating: 5, service: "Car Hire — Safari Van" },
  { name: "Robert Ochieng", location: "Kisumu, Kenya", text: "Used Track & Trace for a Nairobi to Mombasa group transfer. The bus was comfortable, driver was professional, and we arrived right on schedule. My go-to for long-distance travel now.", rating: 5, service: "Long Distance Transfer" },
  { name: "Emily Chen", location: "Singapore", text: "Booked an Amboseli safari with Track & Trace and it exceeded all expectations. Seeing elephants with Kilimanjaro in the background from our 4x4 roof hatch was a once-in-a-lifetime moment.", rating: 5, service: "Safari Tour — Amboseli" },
  { name: "David Thompson", location: "Toronto, Canada", text: "I've used many car hire services across Africa, and Track & Trace stands out. The vehicles are genuinely well-maintained, the pricing is transparent, and the team is incredibly responsive on WhatsApp.", rating: 5, service: "Car Hire — Land Cruiser" },
  { name: "Fatima Al-Rashid", location: "Dubai, UAE", text: "We hired a minibus for our corporate team building event. The driver was punctual, friendly, and knew exactly where to go. Excellent corporate transport option.", rating: 5, service: "Corporate Transport" },
  { name: "Michael Njoroge", location: "Nairobi, Kenya", text: "Track & Trace handled our wedding guest transport flawlessly. Three vehicles coordinated perfectly, all arrived on time, and our guests were thrilled.", rating: 5, service: "Event Transport" },
];

const BlogsReviews = () => {
  const [reviewIndex, setReviewIndex] = useState(0);

  const nextReview = useCallback(() => {
    setReviewIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextReview, 4000);
    return () => clearInterval(timer);
  }, [nextReview]);

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(reviewIndex + i) % reviews.length]);
    }
    return visible;
  };

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Insights & Testimonials</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-6xl mb-4">Blogs & Reviews</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-lg opacity-80 max-w-2xl mx-auto">
            Travel tips, destination guides, and real stories from our clients across Kenya.
          </motion.p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Latest Articles</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">From Our Blog</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border border-border overflow-hidden group hover:border-accent/50 transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={blog.image}
                    alt={blog.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={512}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-accent font-bold uppercase tracking-wider">
                      <Tag className="w-3 h-3" /> {blog.category}
                    </span>
                    <span className="font-sans text-xs text-muted-foreground">{blog.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-3 leading-snug">{blog.title}</h3>
                  <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 font-sans text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {blog.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-accent font-sans text-sm font-bold group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <section className="py-24 bg-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-accent mb-3">Testimonials</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">What Our Clients Say</h2>
          </motion.div>

          <div className="relative">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {getVisibleReviews().map((r, i) => (
                <div
                  key={`${reviewIndex}-${i}`}
                  className="bg-card border border-border p-8"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-6 italic">"{r.text}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-sans font-bold text-sm text-foreground">{r.name}</p>
                    <p className="font-sans text-xs text-muted-foreground">{r.location}</p>
                    <p className="font-sans text-xs text-accent font-bold mt-1">{r.service}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Carousel dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === reviewIndex ? "bg-accent scale-125" : "bg-border hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-12 bg-card border border-border"
          >
            <h2 className="font-serif text-2xl md:text-3xl mb-4">Had a Great Experience?</h2>
            <p className="font-sans text-muted-foreground mb-6 max-w-lg mx-auto">
              We'd love to hear from you! Share your experience with Track & Trace Adventures.
            </p>
            <Link
              to="/contact"
              className="inline-flex bg-accent text-accent-foreground px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors"
            >
              Leave a Review
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogsReviews;
