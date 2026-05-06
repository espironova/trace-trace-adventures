'use client'
import dynamic from 'next/dynamic'

const AboutDynamic = dynamic(() => import('../../routes/About.tsx'), { ssr: false })

export function AboutClient() {
  return <AboutDynamic />
}
