/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['go1-store.fly.dev'],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
