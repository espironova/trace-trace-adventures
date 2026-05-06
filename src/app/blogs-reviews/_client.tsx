'use client'
import dynamic from 'next/dynamic'

const BlogsReviewsDynamic = dynamic(() => import('../../routes/BlogsReviews.tsx'), { ssr: false })

export function BlogsReviewsClient() {
  return <BlogsReviewsDynamic />
}
