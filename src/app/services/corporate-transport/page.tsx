import type { Metadata } from 'next'
import { CorporateTransportClient } from './_client'

export const metadata: Metadata = {
  title: "Corporate Transport Nairobi | Events, Conferences & Executive Travel — Track & Trace",
  description: "Professional corporate transport in Nairobi for conferences, cocktail events, executive travel, and team building. Multi-vehicle coordination, uniformed drivers, punctual and reliable.",
  keywords: "corporate transport Nairobi, conference transport Kenya, corporate event transport Nairobi, executive car hire Nairobi, cocktail event transport Kenya, corporate shuttle Nairobi, business travel Kenya, team building transport Nairobi, conference delegate transport Kenya",
  robots: "index, follow",
}

export default function CorporateTransportPage() {
  return <CorporateTransportClient />
}
