import type { Metadata } from 'next'
import { ServicesClient } from './_client'

export const metadata: Metadata = {
  title: "Car Hire, Airport Transfers & Safari Tours Kenya | All Services — Track & Trace",
  description: "Complete transport services in Nairobi — airport transfers, safari tours, car hire, SGR transfers, long-distance transport, hotel transfers, corporate transport, and school trips. Available 24/7.",
  keywords: "car hire services Kenya, JKIA airport transfer, safari vehicle hire Nairobi, SGR station transfer, corporate transport Kenya, hotel transfers Nairobi, long distance bus hire Kenya, chauffeur drive Nairobi, school transport Nairobi",
  robots: "index, follow",
}

export default function ServicesPage() {
  return <ServicesClient />
}
