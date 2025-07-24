import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '明日方舟 - Arknights',
  description: '明日方舟官方网站 - 策略塔防手游',
  keywords: '明日方舟,Arknights,策略,塔防,手游,二次元',
  authors: [{ name: 'Hypergryph' }],
  openGraph: {
    title: '明日方舟 - Arknights',
    description: '明日方舟官方网站 - 策略塔防手游',
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://web.hycdn.cn" />
        <link rel="dns-prefetch" href="https://web.hycdn.cn" />
      </head>
      <body className="bg-ak-dark text-ak-text antialiased font-ak-primary">
        {/* SVG Definitions */}
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <defs>
            {/* Arknights Logo */}
            <g id="svg_def-title_arknights">
              <text x="0" y="60" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="currentColor">
                ARKNIGHTS
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
          {children}
        </div>
      </body>
    </html>
  )
}
