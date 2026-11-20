'use client'
import dynamic from 'next/dynamic'

// Disable SSR for this page — uses localStorage at module level
const BlogsReviewsClientDynamic = dynamic(
  () => import('./_client').then(m => ({ default: m.BlogsReviewsClient })),
  { ssr: false }
)

export function BlogsReviewsClientNoSSR() {
  return <BlogsReviewsClientDynamic />
}
