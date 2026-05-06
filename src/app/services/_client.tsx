'use client'
import dynamic from 'next/dynamic'

const ServicesDynamic = dynamic(() => import('../../routes/Services.tsx'), { ssr: false })

export function ServicesClient() {
  return <ServicesDynamic />
}
