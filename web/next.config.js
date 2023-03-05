/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/chat',
        destination: '/chat/0'
      },
      {
        source: '/',
        destination: '/chat/0'
      },
    ]
  },
}

module.exports = nextConfig
