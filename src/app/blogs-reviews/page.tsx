import type { Metadata } from 'next'
import { BlogsReviewsClientNoSSR } from './_nossr'
export const metadata: Metadata = {
  title: "Kenya Travel Blog & Client Reviews | Safari Guides & Transport Tips — Track & Trace",
  description: "Kenya travel tips, safari destination guides, JKIA transfer advice, and verified client reviews. Plan your Kenya trip with expert insights from Track & Trace Adventures.",
  keywords: "Kenya travel blog, safari guide Kenya, JKIA airport transfer tips, Nairobi travel tips, Maasai Mara safari guide, Kenya road trip guide, Track & Trace reviews, car hire Kenya reviews, Kenya travel advice, East Africa travel blog",
  robots: "index, follow",
}

export default function BlogsReviewsPage() {
  return <BlogsReviewsClientNoSSR />
}