/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  // 性能优化配置
  compress: true,
  poweredByHeader: false,

  // 实验性功能
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Turbopack配置
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // 图片优化配置
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod.spline.design',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 注意：由于使用 output: 'export'，headers 配置在静态导出中不会生效
  // 缓存策略将通过 Nginx 配置实现

  // 重写规则
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
