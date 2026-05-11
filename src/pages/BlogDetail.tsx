import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Layout from "@/components/Layout";
import { ArrowLeft, Calendar, Tag, Link2, Facebook, Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (!id) return;
    supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setBlog(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="font-sans text-muted-foreground">Loading…</p>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="font-sans text-muted-foreground">Blog post not found.</p>
          <button
            onClick={() => navigate("/blogs-reviews")}
            className="inline-flex items-center gap-2 text-accent font-sans text-sm hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs &amp; Reviews
          </button>
        </div>
      </Layout>
    );
  }

  const date = new Date(blog.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = blog.title;
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); toast.success("Link copied"); }
    catch { toast.error("Could not copy link"); }
  };

  return (
    <Layout>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50 bg-gradient-to-r from-heroGold via-accent to-heroGold"
      />
      {blog.image_url && (
        <div className="w-full h-[40vh] md:h-[55vh] overflow-hidden relative">
          <img
            src={blog.image_url}
            alt={blog.alt || blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      )}

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/blogs-reviews")}
            className="inline-flex items-center gap-2 text-accent font-sans text-sm mb-10 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs &amp; Reviews
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center gap-1 font-sans text-xs text-accent font-bold uppercase tracking-wider">
                <Tag className="w-3 h-3" /> {blog.category}
              </span>
              <span className="font-sans text-xs text-muted-foreground">{blog.read_time}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-5 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-10 border-b border-border">
              <span className="flex items-center gap-1 font-sans text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" /> {date}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground mr-1">Share</span>
                <button onClick={copyLink} aria-label="Copy link" className="p-2 rounded-full border border-border hover:bg-heroGold/20 hover:border-heroGold transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
                <a href={fbHref} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="p-2 rounded-full border border-border hover:bg-heroGold/20 hover:border-heroGold transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={liHref} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="p-2 rounded-full border border-border hover:bg-heroGold/20 hover:border-heroGold transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="font-sans text-base text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {blog.body || blog.excerpt}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
