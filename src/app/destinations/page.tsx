import type { Metadata } from 'next'
import { DestinationsClient } from './_client'

export const metadata: Metadata = {
  title: "Safari Destinations Kenya & East Africa | Maasai Mara, Zanzibar, Kilimanjaro & More",
  description: "Explore iconic East African destinations with Track & Trace Adventures. Maasai Mara, Amboseli, Zanzibar, Bwindi, Kilimanjaro, Lake Nakuru, Diani Beach and more. Reliable transport for every destination.",
  keywords: "Maasai Mara safari transport, Amboseli tour transport, Zanzibar travel Kenya, Kilimanjaro trip transport, Bwindi gorilla trekking transport, Lake Nakuru safari, Diani beach transfer, East Africa safari destinations, Kenya safari destinations, Serengeti transport",
  robots: "index, follow",
}

export default function DestinationsPage() {
  return <DestinationsClient />
}
