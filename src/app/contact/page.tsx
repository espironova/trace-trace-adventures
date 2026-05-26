import type { Metadata } from 'next'
import { ContactClient } from './_client'

export const metadata: Metadata = {
  title: "Contact Track & Trace Adventures | Book Car Hire & Airport Transfers Nairobi 24/7",
  description: "Book car hire, JKIA airport transfers, safari tours, and SGR station transfers in Nairobi. Available 24/7. Call +254 721 521 009 or WhatsApp us today.",
  keywords: "book car hire Nairobi, JKIA airport transfer booking, safari tour booking Kenya, contact Track & Trace Adventures, WhatsApp car hire Kenya, 24 hour transport Nairobi, book airport transfer Kenya, car hire enquiry Nairobi",
  robots: "index, follow",
}

export default function ContactPage() {
  return <ContactClient />
}
