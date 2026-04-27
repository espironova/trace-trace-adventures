export const SITE_URL = "https://tracktraceadventures.co.ke";

/** Shared OG / Twitter preview image (matches index.html) */
export const DEFAULT_OG_IMAGE = "https://tracktraceadventures.co.ke/og-image.png";

export type SeoEntry = {
  title: string;
  description: string;
  /** When true, emit robots noindex,nofollow */
  noindex?: boolean;
};

const ROUTE_SEO: Record<string, SeoEntry> = {
  "/": {
    title: "Track & Trace Adventures | Car Hire, Airport Transfers & Safari Tours in Nairobi, Kenya",
    description:
      "Track & Trace Adventures offers premium car hire, airport transfers, safari tours, and long-distance transport in Nairobi, Kenya. Book JKIA pickup or a Maasai Mara safari vehicle today.",
  },
  "/about": {
    title: "About Us | Track & Trace Adventures — Car Hire in Nairobi, Kenya",
    description:
      "Learn about Track & Trace Adventures: 20+ years of car hire in East Africa, education for children in need, licensed fleet and expert drivers—based in Nairobi.",
  },
  "/services": {
    title: "Our Services | Airport Transfers, Safari Tours & Car Hire — Track & Trace Adventures",
    description:
      "Airport transfers (JKIA & Wilson), guided safari tours, car and van hire, long-distance and SGR station transfers across Kenya and East Africa. Book with Track & Trace Adventures.",
  },
  "/fleet": {
    title: "Our Fleet | Vehicles for Safari, Airport & Group Travel — Track & Trace Adventures",
    description:
      "Browse our licensed Nairobi fleet by vehicle and registration: sedans, 4x4s, safari vans, coasters, and luxury coaches for airport runs, safaris, and long-distance travel.",
  },
  "/destinations": {
    title: "Destinations | Maasai Mara, Amboseli & East Africa — Track & Trace Adventures",
    description:
      "Plan travel to the Maasai Mara, Amboseli, Serengeti, and beyond. Comfortable vehicles and local expertise for Kenya, Tanzania, Uganda, and Rwanda.",
  },
  "/blogs-reviews": {
    title: "Blogs & Reviews | Travel Tips & Client Stories — Track & Trace Adventures",
    description:
      "Safari tips, Nairobi airport advice, and real reviews from travellers who used Track & Trace for transfers, car hire, and tours in Kenya.",
  },
  "/contact": {
    title: "Contact Us | Book a Transfer or Safari — Track & Trace Adventures, Nairobi",
    description:
      "Get a quote for airport transfers, safari tours, or car hire. Reach Track & Trace Adventures in Nairobi by phone, email, or our contact form—we reply within 24 hours.",
  },
};

const NOT_FOUND: SeoEntry = {
  title: "Page Not Found | Track & Trace Adventures",
  description: "The page you are looking for does not exist. Return to Track & Trace Adventures for car hire, transfers, and safari transport in Kenya.",
  noindex: true,
};

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function getSeoForPath(pathname: string): SeoEntry & { canonical: string } {
  const path = normalizePathname(pathname);
  const entry = ROUTE_SEO[path] ?? NOT_FOUND;
  return {
    ...entry,
    canonical: `${SITE_URL}${path}`,
  };
}

export function buildWebPageJsonLd(params: {
  canonical: string;
  title: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${params.canonical}#webpage`,
    url: params.canonical,
    name: params.title,
    description: params.description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Track & Trace Adventures",
    },
  };
}
