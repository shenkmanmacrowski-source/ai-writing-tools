/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled: conflicts with Supabase SSR and API routes
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
