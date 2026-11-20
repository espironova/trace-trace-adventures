import type { Metadata } from 'next'
import { FleetClientNoSSR } from './_nossr'
export const metadata: Metadata = {
  title: "Our Fleet | Sedans, 4x4 Land Cruisers, Safari Vans & Buses for Hire — Kenya",
  description: "Hire from our premium fleet of sedans, 4x4 Land Cruisers, Toyota Hiace safari vans, coaster buses and minibuses across Kenya and East Africa. Well-maintained, GPS-tracked vehicles.",
  keywords: "4x4 Land Cruiser hire Kenya, Toyota Hiace hire Nairobi, coaster bus hire Kenya, minibus hire Nairobi, safari van hire Kenya, sedan car hire Nairobi, GPS tracked vehicles Kenya, self drive 4x4 Kenya, fleet car hire Nairobi, Mercedes bus hire Kenya",
  robots: "index, follow",
}

export default function FleetPage() {
  return <FleetClientNoSSR />
}