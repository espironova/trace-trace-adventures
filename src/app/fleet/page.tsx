import type { Metadata } from 'next'
import { FleetClient } from './_client'

export const metadata: Metadata = {
  title: "Our Fleet | Track & Trace Adventures — Sedans, 4x4s, Safari Vans & Minibuses",
  description: "Explore our premium, well-maintained fleet of sedans, 4x4 Land Cruisers, safari vans, and minibuses available for hire across Kenya and East Africa.",
}

export default function FleetPage() {
  return <FleetClient />
}
