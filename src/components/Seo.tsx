"use client";
import { Helmet } from "react-helmet-async";
import { buildWebPageJsonLd, DEFAULT_OG_IMAGE, getSeoForPath } from "@/lib/seo";

const Seo = () => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const { title, description, canonical, noindex } = getSeoForPath(pathname);
  const webPageJson = buildWebPageJsonLd({ canonical, title, description });

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content="Track & Trace Adventures" />
      <meta property="og:locale" content="en_KE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(webPageJson)}</script>
    </Helmet>
  );
};

export default Seo;
