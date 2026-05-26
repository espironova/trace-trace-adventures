import type { Metadata } from 'next'
import { LongDistanceClient } from './_client'

export const metadata: Metadata = {
  title: "Long Distance Transfers Kenya | Nairobi to Mombasa, Kisumu & East Africa",
  description: "Comfortable long distance road transfers across Kenya and East Africa. Nairobi to Mombasa, Kisumu, Nakuru, Arusha, Kampala, Kigali. Professional drivers, flexible scheduling.",
  keywords: "long distance transfer Kenya, Nairobi to Mombasa transfer, Nairobi to Kisumu transport, Nairobi to Arusha transfer, cross border transport Kenya, intercity transfer Kenya, Nairobi Kampala transport, Nairobi Kigali transfer, long haul transport East Africa",
  robots: "index, follow",
}

export default function LongDistancePage() {
  return <LongDistanceClient />
}
