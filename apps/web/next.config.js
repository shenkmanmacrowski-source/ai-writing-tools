/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed: conflicts with middleware (needed for route protection)
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
