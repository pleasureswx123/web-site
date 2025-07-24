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
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
