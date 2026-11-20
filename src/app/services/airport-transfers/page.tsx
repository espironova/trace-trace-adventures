import type { Metadata } from 'next'
import { AirportTransfersClient } from './_client'

export const metadata: Metadata = {
  title: "JKIA Airport Transfers Nairobi | 24/7 Pickup & Drop-Off — Track & Trace Adventures",
  description: "Professional JKIA and Wilson Airport transfers in Nairobi. Meet & greet service, real-time flight tracking, fixed pricing, no hidden fees. Available 24/7. Book via WhatsApp today.",
  keywords: "JKIA airport transfer Nairobi, Wilson Airport transfer, airport pickup Nairobi, airport drop off Nairobi, meet and greet airport Kenya, 24 hour airport taxi Nairobi, JKIA pickup service, flight tracking airport transfer Kenya, fixed price airport transfer Nairobi",
  robots: "index, follow",
}

export default function AirportTransfersPage() {
  return <AirportTransfersClient />
}
