/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  devIndicators: false,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig
