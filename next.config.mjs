/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'yzgbfzgcweryionddxjp.supabase.co', pathname: '/**' },
    ],
  },
};

export default nextConfig;
