/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/areas/:path*',
        destination: '/service-areas/:path*',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
