/**  @type {import('next').NextConfig}  */

const nextConfig = {
  basePath: '',
  assetPrefix: '',
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://rusv2.intercars-tickets.com/api/:path*', 
          },
        ];
      },
}

module.exports = nextConfig
