import type { Metadata } from 'next'
import { ServicesClient } from './_client'

export const metadata: Metadata = {
  title: "Our Services | Track & Trace Adventures — Airport Transfers, Safari Tours & Car Hire",
  description: "Airport transfers, safari tours, car hire, SGR transfers, long-distance transport, hotel transfers, and corporate travel solutions in Nairobi, Kenya.",
}

export default function ServicesPage() {
  return <ServicesClient />
}
