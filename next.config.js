/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost']
  },
  serverExternalPackages: ['@prisma/client', 'bcryptjs']
}

module.exports = nextConfig