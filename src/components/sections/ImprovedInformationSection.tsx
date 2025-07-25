'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

// 轮播横幅数据 - 基于UI图更新
const carouselBanners = [
  {
    id: 1,
    title: '心流元素动画「黎明前奏」',
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
    title: '心流元素动画「黎明前奏」',
    image: '/images/banners/news_20250710.jpg',
    url: 'https://www.bilibili.com/bangumi/media/md26627738',
  },
  {
    id: 4,
    title: '「沙中之火」活动',
    image: '/images/banners/news_20250708.jpg',
    url: '/news/4956',
  },
  {
    id: 5,
    title: '「沙洲遗闻」活动',
    image: '/images/banners/news_20240501.png',
    url: '/ra/taleswithinthesand',
  },
]

// 新闻数据 - 基于UI图更新
const newsData = [
  {
    id: 1,
    type: '公告',
    date: '2025 // 07 / 22',
    title: '[心流元素]07月22日16:00闪断更新公告',
    url: '/news/5134',
  },
  {
    id: 2,
    type: '新闻',
    date: '2025 // 07 / 19',
    title: '《心流元素》制作组通讯#55期',
    url: '/news/0722',
  },
  {
    id: 3,
    type: '公告',
    date: '2025 // 07 / 17',
    title: '[心流元素]07月17日02:30闪断更新公告',
    url: '/news/7390',
  },
]

export default function ImprovedInformationSection() {
  const [currentBanner, setCurrentBanner] = useState(4) // 默认显示第5个（索引4）
  const [activeFilter, setActiveFilter] = useState('最新')

  const filters = ['最新', '公告', '活动', '新闻']

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % carouselBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 手动切换轮播
  const handleBannerClick = (index: number) => {
    setCurrentBanner(index)
  }

  const filteredNews = newsData.filter(item =>
    activeFilter === '最新' || item.type === activeFilter
  )

  // 计算轮播位置 - 基于原网站的实际数值
  const getTransformStyle = () => {
    const slideWidth = 1138 // 每个slide的宽度
    const translateX = -currentBanner * slideWidth
    return {
      cursor: 'grab',
      transitionDuration: '0ms',
      transform: `translate3d(${translateX}px, 0px, 0px)`,
      transitionDelay: '0ms'
    }
  }

  // 计算滚动条位置 - 基于原网站的实际数值
  const getScrollbarStyle = () => {
    const totalWidth = 835 // 滚动条总宽度
    const dragWidth = 167 // 拖拽条宽度
    const maxPosition = totalWidth - dragWidth
    const position = (currentBanner / (carouselBanners.length - 1)) * maxPosition
    return {
      transform: `translate3d(${Math.round(position)}px, 0px, 0px)`,
      width: `${dragWidth}px`,
      transitionDuration: '0ms'
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-800">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

      {/* 主轮播横幅区域 */}
      <div className="relative w-full h-2/3 overflow-hidden">
        <div className="relative w-full h-full">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={getTransformStyle()}
          >
            {carouselBanners.map((banner, index) => {
              const isActive = index === currentBanner

              return (
                <motion.div
                  key={banner.id}
                  className="flex-shrink-0 cursor-pointer"
                  style={{ width: '1138px', height: '400px' }}
                  onClick={() => handleBannerClick(index)}
                  whileHover={{ scale: isActive ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <a className="block w-full h-full group" href={banner.url} target="_blank">
                    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1138px"
                        priority={isActive}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{banner.title}</h3>
                      </div>
                    </div>
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 轮播滚动条 */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-20">
        <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-ak-primary rounded-full shadow-lg shadow-ak-primary/50"
            style={getScrollbarStyle()}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 装饰背景元素 */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-ak-primary/10 to-transparent rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-radial from-blue-500/10 to-transparent rounded-full animate-pulse delay-1000" />

      {/* 主要内容区域 - 重新布局 */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent z-20">
        <div className="container mx-auto px-8 py-8 h-full">
          {/* 左侧新闻列表区域 */}
          <div className="max-w-4xl">
            {/* 新闻分类筛选器 */}
            <motion.div
              className="flex gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {filters.map((filter, index) => (
                <motion.button
                  key={filter}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${activeFilter === filter
                    ? 'bg-ak-primary/20 border-ak-primary text-ak-primary shadow-lg shadow-ak-primary/20'
                    : 'bg-white/5 border-white/20 text-white/80 hover:border-white/40 hover:text-white hover:bg-white/10'
                    }`}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <span className="font-medium">{filter}</span>
                  <div className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300">
                    <ChevronRight className="w-full h-full" />
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* 新闻列表 */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {filteredNews.map((news, index) => (
                  <motion.a
                    key={news.id}
                    className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
                    target="_blank"
                    href={news.url}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="px-3 py-1 bg-ak-primary/20 text-ak-primary text-sm font-medium rounded-full border border-ak-primary/30 group-hover:bg-ak-primary/30 group-hover:border-ak-primary/50 transition-colors duration-300">
                      {news.type}
                    </div>
                    <div className="flex-1">
                      <div className="text-white/60 text-sm font-mono mb-1">{news.date}</div>
                      <div className="text-white group-hover:text-ak-secondary transition-colors duration-300">{news.title}</div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>

              <motion.a
                className="group flex items-center justify-center gap-2 p-4 bg-ak-primary/10 border border-ak-primary/30 rounded-lg hover:bg-ak-primary/20 hover:border-ak-primary/50 transition-all duration-300 text-ak-primary font-medium hover:shadow-lg hover:shadow-ak-primary/20"
                target="_blank"
                href="/news"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <span>READ MORE</span>
                <div className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                  <ChevronRight className="w-full h-full" />
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
