import type { Metadata } from 'next'
import { IndexClient } from './_client'

export const metadata: Metadata = {
  title: "Track & Trace Adventures | Car Hire, Airport Transfers & Safari Tours Nairobi",
  description: "Premium car hire, airport transfers, safari tours, SGR station transfers, and long-distance transport in Nairobi, Kenya. Book your JKIA airport pickup or Maasai Mara safari vehicle today.",
  keywords: "car hire Nairobi, airport transfers Nairobi, JKIA airport pickup, safari tours Kenya, SGR transfers Nairobi, transport Nairobi Kenya, Track & Trace Adventures",
  robots: "index, follow",
}

export default function IndexPage() {
  return <IndexClient />
}
