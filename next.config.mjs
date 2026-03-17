/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  images: {
    remotePatterns: [{ hostname: 'firebasestorage.googleapis.com' }],
  },
}

export default nextConfig
