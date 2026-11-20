'use client'
import dynamic from 'next/dynamic'

// Disable SSR for this page — uses localStorage at module level
const AdminClientDynamic = dynamic(
  () => import('./_client').then(m => ({ default: m.AdminClient })),
  { ssr: false }
)

export function AdminClientNoSSR() {
  return <AdminClientDynamic />
}
