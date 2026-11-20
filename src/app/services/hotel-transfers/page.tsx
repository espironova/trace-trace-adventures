import type { Metadata } from 'next'
import { HotelTransfersClient } from './_client'

export const metadata: Metadata = {
  title: "Hotel Transfers Nairobi | Door-to-Door City Transport — Track & Trace Adventures",
  description: "Reliable hotel-to-hotel and city transfers across Nairobi. Door-to-door service, fixed transparent pricing, smartly dressed drivers. Available for individuals, couples, and groups.",
  keywords: "hotel transfer Nairobi, hotel to hotel transport Nairobi, city transfer Nairobi, door to door transport Nairobi, Nairobi city taxi, hotel pickup Nairobi, fixed price city transfer Kenya, corporate hotel transfer Nairobi",
  robots: "index, follow",
}

export default function HotelTransfersPage() {
  return <HotelTransfersClient />
}
