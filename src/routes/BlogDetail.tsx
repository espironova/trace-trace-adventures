"use client";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BlogDetail = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

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
            onClick={() => router.push("/blogs-reviews")}
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

  return (
    <Layout>
      {blog.image_url && (
        <div className="w-full h-[40vh] md:h-[55vh] overflow-hidden relative">
          <Image
            src={blog.image_url}
            alt={blog.alt || blog.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      )}

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push("/blogs-reviews")}
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

            <div className="flex items-center gap-1 font-sans text-xs text-muted-foreground mb-10 pb-10 border-b border-border">
              <Calendar className="w-3 h-3" /> {date}
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
