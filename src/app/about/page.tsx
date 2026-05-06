import type { Metadata } from 'next'
import { AboutClient } from './_client'

export const metadata: Metadata = {
  title: "About Us | Track & Trace Adventures — 20+ Years Serving East Africa",
  description: "Over 20 years of experience in car hire, airport transfers, and safari tours across East Africa. Meet the team behind Kenya's trusted transport company.",
}

export default function AboutPage() {
  return <AboutClient />
}
