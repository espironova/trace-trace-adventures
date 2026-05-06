'use client'
import dynamic from 'next/dynamic'

const ContactDynamic = dynamic(() => import('../../routes/Contact.tsx'), { ssr: false })

export function ContactClient() {
  return <ContactDynamic />
}
