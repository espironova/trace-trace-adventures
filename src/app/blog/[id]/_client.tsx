'use client'
import dynamic from 'next/dynamic'

const BlogDetailDynamic = dynamic(() => import('../../../routes/BlogDetail'), { ssr: false })

export function BlogDetailClient() {
  return <BlogDetailDynamic />
}
