import type { Metadata } from 'next'
import { CarHireClient } from './_client'

export const metadata: Metadata = {
  title: "Car Hire Nairobi | Self-Drive & Chauffeur-Driven Vehicles — Track & Trace Adventures",
  description: "Premium car hire in Nairobi. Self-drive and chauffeur-driven sedans, 4x4s, safari vans, and minibuses. Daily, weekly, and monthly rates. Comprehensive insurance included.",
  keywords: "car hire Nairobi, self drive car hire Kenya, chauffeur driven car Nairobi, 4x4 hire Kenya, sedan hire Nairobi, van hire Kenya, minibus hire Nairobi, daily car hire Kenya, weekly car hire Nairobi, comprehensive insurance car hire Kenya",
  robots: "index, follow",
}

export default function CarHirePage() {
  return <CarHireClient />
}
