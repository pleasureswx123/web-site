/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web.hycdn.cn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ak.hypergryph.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/#index',
      },
    ];
  },
};

module.exports = nextConfig;
