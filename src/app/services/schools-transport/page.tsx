import type { Metadata } from 'next'
import { SchoolsTransportClient } from './_client'

export const metadata: Metadata = {
  title: "International Schools Transport Nairobi | Field Trips & Sports Events — Track & Trace",
  description: "Trusted transport for international schools in Nairobi. Sports tournaments, educational field trips, co-curricular activities. Child safety trained drivers, coasters and buses.",
  keywords: "international schools transport Nairobi, school field trip transport Kenya, sports tournament transport Nairobi, school bus hire Nairobi, co-curricular transport Kenya, educational trip transport Nairobi, school coaster hire Kenya, inter-school transport Nairobi",
  robots: "index, follow",
}

export default function SchoolsTransportPage() {
  return <SchoolsTransportClient />
}
