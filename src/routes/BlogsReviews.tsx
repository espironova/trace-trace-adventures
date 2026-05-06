"use client";
import Image from 'next/image'
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from "lucide-react";
import placeholderImg from "@/assets/maasai-mara.jpg";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const BlogsReviews = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  useEffect(() => {
    supabase.from("blogs").select("*").order("published_at", { ascending: false }).then(({ data }) => {
      if (data) {
        setBlogs(data.map((b: any) => ({
          id: b.id,
          title: b.title,
          excerpt: b.excerpt,
          body: b.body || null,
          date: new Date(b.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          category: b.category,
          readTime: b.read_time,
          image: b.image_url || placeholderImg,
          alt: b.alt || b.title,
        })));
      }
    });
    supabase.from("reviews").select("*").order("sort_order", { ascending: false }).order("created_at", { ascending: false }).then(({ data }) => {
      if (data) {
        setReviews(data.map((r: any) => ({ name: r.name, location: r.location, text: r.text, rating: r.rating, service: r.service })));
      }
    });
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const getVisibleReviews = () => {
    if (!reviews.length) return [];
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(reviewIndex + i) % reviews.length]);
    }
    return visible;
  };

  return (
    <Layout>
      <section className="relative bg-primary text-primary-foreground py-14 md:py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(244,196,48,0.18),transparent_60%)]" />
        <div className="absolute -top-16 left-[10%] h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-[8%] h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="h-px w-16 bg-heroGold mx-auto mb-4" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm uppercase tracking-[0.3em] text-heroGold mb-3">Insights & Testimonials</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-4xl md:text-5xl mb-4">Blogs & Reviews</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-sans text-base md:text-lg opacity-80 max-w-2xl mx-auto">
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
                className="bg-card border border-border overflow-hidden group hover:border-accent/50 transition-colors cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <Image
          src={blog.image}
          alt={blog.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedBlog(blog); }}
                      className="inline-flex items-center gap-1 text-accent font-sans text-sm font-bold group-hover:gap-2 transition-all hover:underline"
                    >
                      Read More <ArrowRight className="w-3 h-3" />
                    </button>
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
              href="/contact"
              className="inline-flex bg-accent text-accent-foreground px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-bold hover:bg-accent/90 transition-colors"
            >
              Leave a Review
            </Link>
          </motion.div>
        </div>
      </section>

      <Dialog open={!!selectedBlog} onOpenChange={(open) => { if (!open) setSelectedBlog(null); }}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selectedBlog && (
            <>
              {selectedBlog.image && (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={selectedBlog.image}
                    alt={selectedBlog.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
              )}
              <div className="p-6 pb-2">
                <div className="flex items-center gap-4 mb-3">
                  <span className="inline-flex items-center gap-1 font-sans text-xs text-accent font-bold uppercase tracking-wider">
                    <Tag className="w-3 h-3" /> {selectedBlog.category}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">{selectedBlog.readTime}</span>
                  <span className="flex items-center gap-1 font-sans text-xs text-muted-foreground ml-auto">
                    <Calendar className="w-3 h-3" /> {selectedBlog.date}
                  </span>
                </div>
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-foreground leading-snug text-left">
                    {selectedBlog.title}
                  </DialogTitle>
                </DialogHeader>
              </div>
              <ScrollArea className="max-h-[50vh] px-6 pb-6">
                {selectedBlog.body ? (
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {selectedBlog.body}
                  </p>
                ) : (
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                    {selectedBlog.excerpt}
                  </p>
                )}
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BlogsReviews;
