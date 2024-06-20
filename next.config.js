/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '',
  assetPrefix: '',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://testapi.intercars.ru/api/:path*',
      },
      
    
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'testkurs.intercars-tickets.com',
        port: '',
        pathname: '/Images/**',
      },
    ],
    unoptimized: true
  },
  
}

module.exports = nextConfig
