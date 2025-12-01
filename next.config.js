/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable, no experimental flag needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'poised-violet-narwhal.myfilebase.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig