import type { Metadata } from 'next'
import { ContactClient } from './_client'

export const metadata: Metadata = {
  title: "Contact Us | Track & Trace Adventures — Book Car Hire & Transfers in Nairobi",
  description: "Get in touch with Track & Trace Adventures for car hire, airport transfers, safari tours, and transport bookings in Nairobi, Kenya. Available 24/7.",
}

export default function ContactPage() {
  return <ContactClient />
}
