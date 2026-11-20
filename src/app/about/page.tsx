import type { Metadata } from 'next'
import { AboutClient } from './_client'

export const metadata: Metadata = {
  title: "About Track & Trace Adventures | 20+ Years Car Hire & Safari Tours East Africa",
  description: "Over 20 years of experience in car hire, airport transfers, and safari tours across East Africa. Meet the team behind Kenya's most trusted transport and safari company.",
  keywords: "about Track & Trace Adventures, Kenya transport company, car hire company Nairobi history, trusted safari operator Kenya, East Africa transport experts, 20 years car hire Kenya",
  robots: "index, follow",
}

export default function AboutPage() {
  return <AboutClient />
}
