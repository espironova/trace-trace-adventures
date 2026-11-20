'use client'
import dynamic from 'next/dynamic'

// Disable SSR for this page — uses localStorage at module level
const FleetClientDynamic = dynamic(
  () => import('./_client').then(m => ({ default: m.FleetClient })),
  { ssr: false }
)

export function FleetClientNoSSR() {
  return <FleetClientDynamic />
}
