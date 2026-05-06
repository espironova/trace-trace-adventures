'use client'
import dynamic from 'next/dynamic'

const QrLandingDynamic = dynamic(() => import('../../routes/QrLanding.tsx'), { ssr: false })

export function QrLandingClient() {
  return <QrLandingDynamic />
}
