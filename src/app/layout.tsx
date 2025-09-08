import type { Metadata } from 'next'
import './globals.css'

/* 引入镂空文字效果样式 */
import '../styles/hollow-text.css'
import { LayoutProvider } from '@/components/providers/LayoutProvider'

export const metadata: Metadata = {
  title: 'Evercall',
  description: '心流元素官方网站',
  keywords: '心流元素,二次元',
  authors: [{ name: 'shangwenxue' }],
  openGraph: {
    title: 'Evercall',
    description: '心流元素官方网站',
    type: 'website',
    locale: 'zh_CN',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0099ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* DNS预解析优化 */}
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* 预连接到关键外部资源 */}
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="" />

        {/* 预加载关键字体 */}
        <link
          rel="preload"
          href="/fonts/SourceHanSansSC-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Novecentosanswide-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Oswald-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        {/* Favicon */}
        <link rel="icon" href="/images/favicon.png" type="image/png" />

        {/* 性能提示 */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* 资源提示 */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className="bg-ak-dark text-ak-text antialiased font-ak-primary font-medium">
        {/* SVG Definitions */}
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <defs>
            {/* Evercall Logo */}
            <g id="svg_def-title_arknights">
              <text x="0" y="60" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="currentColor">
                Evercall
              </text>
            </g>

            {/* Rhodes Island Logo */}
            <g id="svg_def-logo_rhodes_island">
              <circle cx="229.55" cy="187.2" r="180" fill="none" stroke="currentColor" strokeWidth="4"/>
              <polygon points="229.55,50 180,150 279.1,150" fill="currentColor"/>
              <rect x="200" y="200" width="59.1" height="59.1" fill="currentColor"/>
            </g>

            {/* Arrow Icon */}
            <g id="svg_def-icon_arrow">
              <path d="M1 1 L6 7.5 L1 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>

            {/* Horizontal Arrow Icon */}
            <g id="svg_def-icon_arrow_hrz">
              <path d="M1 3.75 L38 3.75 M32 1 L38 3.75 L32 6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>

            {/* Copyright Mini */}
            <g id="svg_def-copyright_mini">
              <text x="0" y="12" fontFamily="Arial, sans-serif" fontSize="10" fill="currentColor" opacity="0.6">
                © 2017-2025 Hypergryph Co., Ltd. All Rights Reserved.
              </text>
            </g>

            {/* iOS Icon */}
            <g id="svg_def-icon_iOS">
              <path d="M180.5 0C81.1 0 0 81.1 0 180.5v125.3C0 405.2 81.1 486.3 180.5 486.3h64.2c99.4 0 180.5-81.1 180.5-180.5V180.5C425.2 81.1 344.1 0 244.7 0H180.5z" fill="currentColor"/>
              <path d="M212.6 150.8c-8.8 0-15.9-7.1-15.9-15.9s7.1-15.9 15.9-15.9 15.9 7.1 15.9 15.9-7.1 15.9-15.9 15.9zm0 31.8c8.8 0 15.9 7.1 15.9 15.9v79.5c0 8.8-7.1 15.9-15.9 15.9s-15.9-7.1-15.9-15.9v-79.5c0-8.8 7.1-15.9 15.9-15.9z" fill="white"/>
            </g>

            {/* Android Icon */}
            <g id="svg_def-icon_Android">
              <path d="M48.9 81.9c0-26.9 21.8-48.7 48.7-48.7h48.7c26.9 0 48.7 21.8 48.7 48.7v146.1c0 26.9-21.8 48.7-48.7 48.7H97.6c-26.9 0-48.7-21.8-48.7-48.7V81.9z" fill="currentColor"/>
              <circle cx="121.5" cy="130" r="8" fill="white"/>
              <circle cx="121.5" cy="160" r="8" fill="white"/>
              <circle cx="121.5" cy="190" r="8" fill="white"/>
            </g>

            {/* TapTap Icon */}
            <g id="svg_def-icon_TapTap">
              <rect width="50" height="50" rx="10" fill="currentColor"/>
              <text x="25" y="30" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">TAP</text>
            </g>

            {/* Voice Icon */}
            <g id="svg_def-icon_voice">
              <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 15 L29 29 M29 15 L15 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </g>

            {/* Elite Phase Icons */}
            <g id="svg_def-elite_phase_1">
              <polygon points="63.85,10 10,67.9 117.7,67.9" fill="currentColor"/>
            </g>

            <g id="svg_def-elite_phase_2">
              <polygon points="63.85,10 10,67.9 117.7,67.9" fill="currentColor"/>
              <polygon points="63.85,35 35,93.7 92.7,93.7" fill="currentColor"/>
            </g>

            {/* Mini Play Button */}
            <g id="svg_def-icon_mini_play_btn">
              <circle cx="22" cy="21" r="20" fill="currentColor"/>
              <polygon points="18,15 18,27 28,21" fill="white"/>
            </g>

            {/* Mini Link Button */}
            <g id="svg_def-icon_mini_link_btn">
              <circle cx="22" cy="21" r="20" fill="currentColor"/>
              <path d="M15 15 L29 29 M29 15 L15 29" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </g>

            {/* Social Icon */}
            <g id="svg_def-icon_social">
              <circle cx="13.5" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="13.5" cy="25" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
              <line x1="7.5" y1="8" x2="19.5" y2="8" stroke="currentColor" strokeWidth="2"/>
              <line x1="7.5" y1="25" x2="19.5" y2="25" stroke="currentColor" strokeWidth="2"/>
            </g>

            {/* Sound Icon */}
            <g id="svg_def-icon_sound">
              <path d="M8 6v22l8-6V12l-8-6z" fill="currentColor"/>
              <path d="M20 9v16M24 11v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </g>

            {/* User Icon */}
            <g id="svg_def-icon_user">
              <circle cx="14" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 30v-4a8 8 0 0 1 8-8h8a8 8 0 0 1 8 8v4" fill="none" stroke="currentColor" strokeWidth="2"/>
            </g>
          </defs>
        </svg>

        <div id="root" className="min-h-screen">
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </div>
      </body>
    </html>
  )
}
