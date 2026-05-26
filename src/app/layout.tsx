import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { Providers } from './providers'
import '../index.css'

export const metadata: Metadata = {
  metadataBase: new URL("https://tracktraceadventures.co.ke"),
  title: {
    default: "Track & Trace Adventures | Car Hire, Airport Transfers & Safari Tours in Nairobi, Kenya",
    template: '%s | Track & Trace Adventures',
  },
  description: "Premium car hire, airport transfers, safari tours, SGR station transfers, and long-distance transport services in Nairobi, Kenya. Book your JKIA airport pickup or Maasai Mara safari vehicle today.",
  openGraph: {
    type: "website",
    url: "https://tracktraceadventures.co.ke",
    locale: "en_KE",
    siteName: "Track & Trace Adventures",
    title: "Track & Trace Adventures | Car Hire, Airport Transfers & Safari Tours in Nairobi, Kenya",
    description: "Premium car hire, airport transfers, safari tours, SGR station transfers, and long-distance transport services in Nairobi, Kenya. Book your JKIA airport pickup or Maasai Mara safari vehicle today.",
    images: [{ url: "https://tracktraceadventures.co.ke/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://tracktraceadventures.co.ke/og-image.png"],
  },
  alternates: { canonical: "https://tracktraceadventures.co.ke" },
}

// Polyfill bare `location` for SSR — some components reference location.href
// without window guard. This prevents "location is not defined" crashes.
if (typeof globalThis.location === 'undefined') {
  (globalThis as any).location = {
    href: '', pathname: '/', search: '', hash: '',
    host: '', hostname: '', origin: '', protocol: 'https:',
    assign: () => {}, replace: () => {}, reload: () => {},
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en_KE">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        <meta name="keywords" content="car hire Nairobi, airport transfers Nairobi, JKIA airport pickup, Maasai Mara safari vehicle hire, SGR station transfers, safari tours Kenya, long distance transport Kenya, self drive car hire Kenya, chauffeur services Nairobi, 4x4 Land Cruiser hire Kenya, minibus hire Nairobi, corporate car hire Kenya, wedding car hire Nairobi, school trip transport Kenya, hotel transfers Nairobi, Amboseli safari transport, Lake Nakuru tour, Diani beach transfer, Mombasa road trip, Nairobi to Maasai Mara, JKIA to city centre transfer, SGR Syokimau station transfer, affordable car hire Kenya, luxury safari van Kenya, Toyota Hiace hire Nairobi, coaster bus hire Kenya, track and trace adventures, best car hire company Nairobi, Kenya safari operator, East Africa transport company, reliable airport taxi Nairobi, 24 hour car hire Kenya" />
        <meta name="author" content="Track & Trace Adventures" />
        <meta name="publisher" content="Track & Trace Adventures" />
        <meta name="creator" content="Track & Trace Adventures" />
        <meta name="category" content="Travel & Transport" />
        <meta name="classification" content="Business" />
        <meta name="theme-color" content="#B8860B" />
        <meta name="revisit-after" content="7 days" />
        <meta name="geo.placename" content="Nairobi, Kenya" />
        <meta name="geo.region" content="KE-110" />
        <meta name="geo.position" content="-1.2832;36.8172" />
        <meta name="ICBM" content="-1.2832, 36.8172" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"Track & Trace Adventures\",\"description\":\"Premium car hire, airport transfers, safari tours, SGR station transfers, and long-distance transport services in Nairobi, Kenya.\",\"url\":\"https://tracktraceadventures.co.ke/\",\"telephone\":\"+254721521009\",\"image\":\"https://tracktraceadventures.co.ke/og-image.png\",\"areaServed\":\"Kenya\",\"priceRange\":\"$$\",\"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"Milestone Business Center, Northern Bypass Road\",\"addressLocality\":\"Nairobi\",\"postalCode\":\"00100\",\"addressCountry\":\"KE\"}}" }}
        />
        <div id="root">
          <Providers>
            <Toaster />
            <Sonner />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
