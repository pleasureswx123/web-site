'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const newsData = [
  {
    id: 1,
    type: '公告',
    date: '2025 // 07 / 22',
    title: '[明日方舟]07月22日16:00闪断更新公告',
    url: '/news/5134',
    featured: false,
  },
  {
    id: 2,
    type: '新闻',
    date: '2025 // 07 / 19',
    title: '《明日方舟》制作组通讯#55期',
    url: '/news/0722',
    featured: false,
  },
  {
    id: 3,
    type: '公告',
    date: '2025 // 07 / 17',
    title: '[明日方舟]07月17日02:30闪断更新公告',
    url: '/news/7390',
    featured: false,
  },
  {
    id: 4,
    type: '活动',
    date: '2025 // 07 / 12',
    title: '「沙中之火」活动即将开启',
    url: '/news/4956',
    featured: true,
  },
]

const bannerData = [
  {
    id: 1,
    title: '沙中之火',
    subtitle: 'TALES WITHIN THE SAND',
    image: '/images/banners/news_20250721.png',
    url: '/ra/taleswithinthesand',
  },
  {
    id: 2,
    title: '泰拉记事社',
    subtitle: 'TERRA HISTORICUS',
    image: '/images/banners/news_20250714.jpg',
    url: 'https://terra-historicus.hypergryph.com/',
  },
  {
    id: 3,
    title: '衍生动画',
    subtitle: 'ANIMATION',
    image: '/images/banners/news_20250710.jpg',
    url: 'https://ak.hypergryph.com/anime/',
  },
]

export default function InformationSection() {
  const [activeFilter, setActiveFilter] = useState('最新')
  const [currentBanner, setCurrentBanner] = useState(0)

  const filters = ['最新', '公告', '活动', '新闻']

  const filteredNews = newsData.filter(item =>
    activeFilter === '最新' || item.type === activeFilter
  )

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border border-ak-primary rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-ak-secondary rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* 轮播横幅区域 */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {bannerData.map((banner, index) => (
              <motion.a
                key={banner.id}
                href={banner.url}
                target={banner.url.startsWith('http') ? '_blank' : '_self'}
                rel={banner.url.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`group relative overflow-hidden rounded-lg border border-ak-border hover:border-ak-primary transition-all duration-300 ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setCurrentBanner(index)}
              >
                <div className="aspect-video relative">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-xl font-bold mb-1">
                      {banner.title}
                    </div>
                    <div className="text-sm opacity-80 font-ak-secondary">
                      {banner.subtitle}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-ak-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 突发新闻区域 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-ak-gray/50 border border-ak-border rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-ak-primary mb-2 font-ak-secondary">
                  BREAKING NEWS
                </h2>
                <div className="text-ak-text-secondary font-ak-secondary text-sm">
                  2025 // 07 / 21
                </div>
                <div className="text-ak-text-secondary font-ak-secondary text-xs">
                  HTTPS://AK.HYPERGRYPH.COM/
                </div>
              </div>
              <motion.a
                href="https://www.bilibili.com/video/BV1dwg5zCEBD"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 bg-ak-primary/20 hover:bg-ak-primary/30 border border-ak-primary rounded-lg px-6 py-3 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-ak-primary font-ak-secondary">更多情报</span>
                <span className="text-ak-primary font-ak-secondary text-sm">READ MORE</span>
                <svg className="w-4 h-4 text-ak-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* 新闻列表区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* 筛选器 */}
          <div className="flex items-center space-x-6 mb-8">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                className={`group relative font-ak-secondary transition-colors duration-300 ${
                  activeFilter === filter
                    ? 'text-ak-primary'
                    : 'text-ak-text-secondary hover:text-ak-primary'
                }`}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ y: -2 }}
              >
                <span className="text-lg font-bold">{filter}</span>
                {activeFilter === filter && (
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-ak-primary"
                    layoutId="activeFilter"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* 新闻列表 */}
          <div className="space-y-4">
            {filteredNews.map((news, index) => (
              <motion.a
                key={news.id}
                href={news.url}
                className="group block bg-ak-gray/30 hover:bg-ak-gray/50 border border-ak-border hover:border-ak-primary rounded-lg p-6 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-ak-secondary ${
                      news.type === '公告' ? 'bg-ak-accent/20 text-ak-accent' :
                      news.type === '活动' ? 'bg-ak-primary/20 text-ak-primary' :
                      'bg-ak-secondary/20 text-ak-secondary'
                    }`}>
                      {news.type}
                    </span>
                    <div>
                      <div className="text-ak-text-secondary font-ak-secondary text-sm mb-1">
                        {news.date}
                      </div>
                      <div className="text-ak-text group-hover:text-ak-primary transition-colors">
                        {news.title}
                      </div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-ak-text-secondary group-hover:text-ak-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>

          {/* 查看更多按钮 */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="/news"
              className="inline-flex items-center space-x-2 bg-ak-primary/20 hover:bg-ak-primary/30 border border-ak-primary rounded-lg px-8 py-3 text-ak-primary font-ak-secondary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>READ MORE</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
