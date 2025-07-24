'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// 轮播横幅数据
const carouselBanners = [
  {
    id: 1,
    title: '明日方舟动画「黎明前奏」',
    image: '/images/banners/news_20250721.png',
    url: 'https://www.bilibili.com/video/BV1dwg5zCEBD',
  },
  {
    id: 2,
    title: '泰拉记事社',
    image: '/images/banners/news_20250714.jpg',
    url: 'https://terra-historicus.hypergryph.com/',
  },
  {
    id: 3,
    title: '明日方舟动画「黎明前奏」',
    image: '/images/banners/news_20250710.jpg',
    url: 'https://www.bilibili.com/bangumi/media/md26627738',
  },
  {
    id: 4,
    title: '「沙中之火」活动',
    image: '/images/banners/news_20250712.jpg',
    url: '/news/4956',
  },
  {
    id: 5,
    title: '「沙中之火」活动',
    image: '/images/banners/news_20250719.jpg',
    url: '/ra/taleswithinthesand',
  },
]

// 新闻数据
const newsData = [
  {
    id: 1,
    type: '公告',
    date: '2025 // 07 / 22',
    title: '[明日方舟]07月22日16:00闪断更新公告',
    url: '/news/5134',
  },
  {
    id: 2,
    type: '新闻',
    date: '2025 // 07 / 19',
    title: '《明日方舟》制作组通讯#55期',
    url: '/news/0722',
  },
  {
    id: 3,
    type: '公告',
    date: '2025 // 07 / 17',
    title: '[明日方舟]07月17日02:30闪断更新公告',
    url: '/news/7390',
  },
]

export default function ImprovedInformationSection() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [activeFilter, setActiveFilter] = useState('最新')

  const filters = ['最新', '公告', '活动', '新闻']

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % carouselBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredNews = newsData.filter(item =>
    activeFilter === '最新' || item.type === activeFilter
  )

  return (
    <section className="min-h-screen relative overflow-hidden bg-ak-dark">
      {/* 背景效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ak-dark via-ak-dark/95 to-ak-dark/90" />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 border border-ak-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 pt-20">
        {/* 轮播横幅区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 左侧：主轮播 */}
          <motion.div
            className="relative h-96 overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full">
              {carouselBanners.map((banner, index) => (
                <motion.div
                  key={banner.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentBanner ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                    <motion.a
                      href={banner.url}
                      className="inline-flex items-center text-ak-primary hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      查看详情
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 轮播指示器 */}
            <div className="absolute bottom-6 right-6 flex space-x-2">
              {carouselBanners.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentBanner ? 'bg-ak-primary' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentBanner(index)}
                />
              ))}
            </div>
          </motion.div>

          {/* 右侧：突发新闻 */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold text-ak-primary">BREAKING NEWS</h2>
              <div className="flex-1 h-px bg-ak-border" />
            </div>

            <div className="space-y-4">
              <div className="text-ak-text-secondary text-sm">
                2025 // 07 / 12
              </div>
              <div className="text-xs text-ak-text-secondary tracking-wider">
                HTTPS://AK.HYPERGRYPH.COM/
              </div>
              
              <motion.a
                href="https://www.bilibili.com/bangumi/media/md26627738"
                className="group flex items-center justify-between p-4 bg-ak-gray/20 rounded-lg hover:bg-ak-primary/10 transition-colors"
                whileHover={{ x: 5 }}
              >
                <div>
                  <div className="text-ak-primary text-sm mb-1">更多情报</div>
                  <div className="text-ak-text-secondary text-xs">READ MORE</div>
                </div>
                <svg className="w-5 h-5 text-ak-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* 新闻筛选和列表 */}
        <motion.div
          className="container mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* 筛选器 */}
          <div className="flex items-center space-x-8 mb-8">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                className={`group flex flex-col items-center transition-colors duration-300 ${
                  activeFilter === filter
                    ? 'text-ak-primary'
                    : 'text-ak-text-secondary hover:text-ak-primary'
                }`}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-ak-secondary text-sm font-bold mb-1">{filter}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {activeFilter === filter && (
                  <motion.div
                    className="w-8 h-0.5 bg-ak-primary mt-2"
                    layoutId="activeFilter"
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
                className="group flex items-center justify-between p-4 bg-ak-gray/10 rounded-lg hover:bg-ak-primary/10 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-ak-primary text-sm font-bold">{news.type}</span>
                  <div>
                    <div className="text-ak-text-secondary text-sm mb-1">{news.date}</div>
                    <div className="text-white group-hover:text-ak-primary transition-colors">
                      {news.title}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.a
              href="/news"
              className="group flex items-center justify-center p-4 border border-ak-border rounded-lg hover:border-ak-primary transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-ak-primary mr-2">READ MORE</span>
              <svg className="w-4 h-4 text-ak-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
