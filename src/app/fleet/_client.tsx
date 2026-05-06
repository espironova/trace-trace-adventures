'use client'
import dynamic from 'next/dynamic'

const FleetDynamic = dynamic(() => import('../../routes/Fleet.tsx'), { ssr: false })

export function FleetClient() {
  return <FleetDynamic />
}
