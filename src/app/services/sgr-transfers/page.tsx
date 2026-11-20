import type { Metadata } from 'next'
import { SgrTransfersClient } from './_client'

export const metadata: Metadata = {
  title: "SGR Station Transfers Nairobi & Mombasa | Syokimau Terminus — Track & Trace",
  description: "Reliable SGR station transfers to and from Nairobi Terminus (Syokimau) and Mombasa Terminus. Timed around your train schedule. Sedans, vans, and minibuses for solo and group travel.",
  keywords: "SGR transfer Nairobi, Syokimau station transfer, SGR Nairobi terminus pickup, Mombasa SGR transfer, SGR station taxi Nairobi, Standard Gauge Railway transfer Kenya, Syokimau pickup service, SGR station transport Nairobi",
  robots: "index, follow",
}

export default function SgrTransfersPage() {
  return <SgrTransfersClient />
}
