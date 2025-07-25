import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gvercall',
  description: '心流元素官方网站',
  keywords: '心流元素,二次元',
  authors: [{ name: 'shangwenxue' }],
  openGraph: {
    title: 'Gvercall',
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
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </head>
      <body className="bg-ak-dark text-ak-text antialiased font-ak-primary font-medium">
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
