import type { Metadata } from 'next'
import { BlogsReviewsClient } from './_client'

export const metadata: Metadata = {
  title: "Blogs & Reviews | Track & Trace Adventures — Kenya Travel Tips & Safari Guides",
  description: "Travel tips, destination guides, and client reviews from Track & Trace Adventures — your trusted car hire and safari transport partner in Kenya.",
}

export default function BlogsReviewsPage() {
  return <BlogsReviewsClient />
}
