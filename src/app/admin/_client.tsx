'use client'
import dynamic from 'next/dynamic'

const AdminDynamic = dynamic(() => import('../../routes/Admin.tsx'), { ssr: false })

export function AdminClient() {
  return <AdminDynamic />
}
