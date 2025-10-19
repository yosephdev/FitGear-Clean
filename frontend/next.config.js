/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'via.placeholder.com', 'fit-gear-one.vercel.app'], // Add your image domains here
    unoptimized: process.env.NODE_ENV === 'development', // Optional: for development
  },
  env: {
    API_BASE_URL: process.env.NODE_ENV === 'production'
      ? `https://${process.env.VERCEL_URL || 'fit-gear-one.vercel.app'}/api`
      : 'http://localhost:8001/api',
  },
}

module.exports = nextConfig