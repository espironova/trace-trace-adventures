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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en_KE">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"Track & Trace Adventures\",\"description\":\"Premium car hire, airport transfers, safari tours, SGR station transfers, and long-distance transport services in Nairobi, Kenya. Book your JKIA airport pickup or Maasai Mara safari vehicle today.\",\"url\":\"https://tracktraceadventures.co.ke\",\"telephone\":\"+254721521009\",\"areaServed\":\"Kenya\",\"priceRange\":\"$$\",\"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"Milestone Business Center, Northern Bypass Road\",\"addressLocality\":\"Nairobi\",\"addressCountry\":\"KE\"}}" }}
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
