import type { Metadata } from 'next'
import { DestinationsClient } from './_client'

export const metadata: Metadata = {
  title: "Destinations | Track & Trace Adventures — East Africa Safari & Travel Destinations",
  description: "Discover iconic East African destinations — Maasai Mara, Zanzibar, Bwindi, Kilimanjaro, and more — with trusted transport from Track & Trace Adventures.",
}

export default function DestinationsPage() {
  return <DestinationsClient />
}
