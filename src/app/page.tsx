import type { Metadata } from 'next'
import { IndexClient } from './_client'

export const metadata: Metadata = {
  title: "Track & Trace Adventures | Car Hire, Airport Transfers & Safari Tours in Nairobi, Kenya",
  description: "Premium car hire, airport transfers, safari tours, SGR station transfers, and long-distance transport in Nairobi, Kenya. Book your JKIA airport pickup or Maasai Mara safari vehicle today.",
}

export default function IndexPage() {
  return <IndexClient />
}
