import type { Metadata } from 'next'
import { SafariToursClient } from './_client'

export const metadata: Metadata = {
  title: "Safari Tours Kenya | Maasai Mara, Amboseli & East Africa — Track & Trace Adventures",
  description: "Guided safari tours across Kenya and East Africa. 4x4 Land Cruisers with pop-up roofs, experienced guides, custom itineraries. Maasai Mara, Amboseli, Serengeti, Bwindi and more.",
  keywords: "safari tours Kenya, Maasai Mara safari vehicle hire, guided safari Kenya, 4x4 Land Cruiser safari, Amboseli safari tour, East Africa safari package, Kenya wildlife safari, custom safari itinerary Kenya, Serengeti tour vehicle, Bwindi gorilla safari transport",
  robots: "index, follow",
}

export default function SafariToursPage() {
  return <SafariToursClient />
}
