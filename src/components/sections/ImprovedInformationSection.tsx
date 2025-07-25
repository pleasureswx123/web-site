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

// 新闻数据 - 根据UI图更新
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

  // 计算轮播位置 - 适配两列布局
  const getTransformStyle = () => {
    const slideWidth = 100 // 每个slide占100%宽度
    const translateX = -currentBanner * slideWidth
    return {
      cursor: 'grab',
      transitionDuration: '500ms',
      transform: `translate3d(${translateX}%, 0px, 0px)`,
      transitionDelay: '0ms'
    }
  }

  // 计算滚动条位置 - 适配两列布局
  const getScrollbarStyle = () => {
    const totalWidth = 100 // 滚动条总宽度百分比
    const dragWidth = 20 // 拖拽条宽度百分比
    const maxPosition = totalWidth - dragWidth
    const position = (currentBanner / (carouselBanners.length - 1)) * maxPosition
    return {
      transform: `translate3d(${Math.round(position)}%, 0px, 0px)`,
      width: `${dragWidth}%`,
      transitionDuration: '300ms'
    }
  }

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black/20 to-slate-800">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
      <div className="absolute -left-5 bottom-[70px] text-[100px] font-bold text-white/20 z-10]">
        GVERCALL NEWS
      </div>

      <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">
        <div className="relative w-full h-full">
          <div className="flex h-full">
            {/* 左侧新闻列表区域 - 根据UI图重构 */}
            <div className="w-1/5 min-w-80 flex flex-col pointer-events-auto p-5">
              {/* 新闻分类标签页 - 水平布局 */}
              <motion.div
                className="flex gap-1 mb-2 bg-black/20 backdrop-blur-sm border-b border-gray-600/100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {filters.map((filter, index) => (
                  <motion.button
                    key={filter}
                    className={`flex-1 px-1 py-1 text-sm font-medium transition-all duration-300 ${activeFilter === filter
                        ? 'bg-cyan-400 text-black shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    onClick={() => setActiveFilter(filter)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {filter}
                  </motion.button>
                ))}
              </motion.div>

              {/* 新闻列表 - 根据UI图重新设计 */}
              <motion.div
                className="flex-1 overflow-y-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  {filteredNews.map((news, index) => (
                    <motion.a
                      key={news.id}
                      className="group flex items-start gap-4 py-4 px-2 border-b border-gray-600/30 hover:bg-black/50 transition-all duration-300 block"
                      target="_blank"
                      href={news.url}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {/* 左侧类型标签 */}
                      <div className={`flex-shrink-0 px-2 py-1 text-sm font-medium rounded font-bold text-cyan-500`}>
                        {news.type}
                      </div>

                      {/* 右侧内容区域 */}
                      <div className="flex-1 min-w-0">
                        {/* 日期 */}
                        <div className="text-white/60 text-[9px] font-mono">
                          {news.date}
                        </div>
                        {/* 标题 */}
                        <div className="text-white text-sm group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                          {news.title}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>

                {/* READ MORE 按钮 */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <motion.a
                    className="group flex items-center gap-2 px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 text-white/80 hover:text-white text-sm w-[110px]"
                    target="_blank"
                    href="/news"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium text-[12px]">READ MORE</span>
                    <div className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                      <ChevronRight className="w-full h-full" />
                    </div>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>

            {/* 右侧主轮播横幅区域 - 较宽 */}
            <div className="flex-1 flex flex-col pointer-events-auto">
              {/* 主轮播横幅 */}
              <div className="relative -mt-20 -mr-60 overflow-hidden aspect-[16/11]">
                <div className="relative w-full h-full">
                  <div
                    className="flex transition-transform duration-500 ease-out h-full"
                    style={getTransformStyle()}
                  >
                    {carouselBanners.map((banner, index) => {
                      const isActive = index === currentBanner

                      return (
                        <motion.div
                          key={banner.id}
                          className="flex-shrink-0 cursor-pointer h-full"
                          style={{ width: '100%' }}
                          onClick={() => handleBannerClick(index)}
                          whileHover={{ scale: isActive ? 1.02 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <a className="block w-full h-full group" href={banner.url} target="_blank">
                            <div className="relative w-full h-full overflow-hidden shadow-2xl">
                              <Image
                                src={banner.image}
                                alt={banner.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                                priority={isActive}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">{banner.title}</h3>
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
              <div className="">
                <div className="relative w-full h-1 bg-white/20  overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-ak-primary/50  shadow-lg shadow-ak-primary/50"
                    style={getScrollbarStyle()}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* 轮播指示器 */}
              <div className="flex justify-center gap-2 mt-4">
                {carouselBanners.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 transition-all duration-300 ${index === currentBanner
                        ? 'bg-ak-primary shadow-lg shadow-ak-primary/50'
                        : 'bg-white/30 hover:bg-white/50'
                      }`}
                    onClick={() => handleBannerClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 装饰背景元素 */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-ak-primary/10 to-transparent rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-radial from-blue-500/10 to-transparent rounded-full animate-pulse delay-1000" />

    </section>
  )
}
