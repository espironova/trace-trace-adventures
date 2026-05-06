'use client'
import dynamic from 'next/dynamic'

const DestinationsDynamic = dynamic(() => import('../../routes/Destinations.tsx'), { ssr: false })

export function DestinationsClient() {
  return <DestinationsDynamic />
}
