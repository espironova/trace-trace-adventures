'use client'
import dynamic from 'next/dynamic'

const NotFoundDynamic = dynamic(() => import('../routes/NotFound.tsx'), { ssr: false })

export function NotFoundClient() {
  return <NotFoundDynamic />
}
