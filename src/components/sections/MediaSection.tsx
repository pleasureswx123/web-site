'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const mediaCategories = [
  {
    id: 'monster-siren',
    title: 'MONSTER SIREN',
    titleCn: '塞壬唱片',
    description: '明日方舟官方音乐厂牌，为游戏制作高质量的原创音乐',
    icon: '🎵',
    active: true,
  },
  {
    id: 'gallery',
    title: 'GALLERY',
    titleCn: '画廊',
    description: '游戏内的精美插画、角色立绘和概念设计作品',
    icon: '🎨',
    active: false,
  },
  {
    id: 'operator',
    title: 'OPERATOR',
    titleCn: '干员档案',
    description: '详细的干员资料、技能介绍和背景故事',
    icon: '👤',
    active: false,
  },
  {
    id: 'video',
    title: 'VIDEO',
    titleCn: '影像资料',
    description: '游戏宣传片、PV、动画短片等视频内容',
    icon: '🎬',
    active: false,
  },
]

const musicData = [
  {
    id: 1,
    title: 'Arknights Main Theme',
    artist: 'Monster Siren Records',
    album: 'Arknights Original Soundtrack',
    duration: '3:42',
    cover: '/images/music/main-theme.jpg',
  },
  {
    id: 2,
    title: 'CC#5 Operation Pyrite',
    artist: 'Monster Siren Records',
    album: 'Contingency Contract',
    duration: '4:15',
    cover: '/images/music/cc5.jpg',
  },
  {
    id: 3,
    title: 'Lullabye',
    artist: 'Monster Siren Records',
    album: 'Episode 08',
    duration: '3:28',
    cover: '/images/music/lullabye.jpg',
  },
]

const galleryData = [
  {
    id: 1,
    title: '沙中之火',
    category: '活动插画',
    image: '/images/gallery/tales-within-sand.jpg',
  },
  {
    id: 2,
    title: '凯尔希立绘',
    category: '角色立绘',
    image: '/images/gallery/kaltsit.jpg',
  },
  {
    id: 3,
    title: '罗德岛概念图',
    category: '概念设计',
    image: '/images/gallery/rhodes-island.jpg',
  },
]

export default function MediaSection() {
  const [activeCategory, setActiveCategory] = useState(mediaCategories[0])
  const [selectedYear, setSelectedYear] = useState('2025')

  const years = ['2025', '2024', '2023', '2022', '2021']

  const renderContent = () => {
    switch (activeCategory.id) {
      case 'monster-siren':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-ak-primary mb-2">塞壬唱片</h3>
              <p className="text-ak-text-secondary">探索明日方舟的音乐世界</p>
            </div>

            <div className="grid gap-4">
              {musicData.map((track, index) => (
                <motion.div
                  key={track.id}
                  className="bg-ak-gray/30 border border-ak-border rounded-lg p-4 hover:border-ak-primary transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-ak-primary/20 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-ak-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-ak-text font-medium group-hover:text-ak-primary transition-colors">
                        {track.title}
                      </div>
                      <div className="text-ak-text-secondary text-sm">
                        {track.artist} • {track.album}
                      </div>
                    </div>
                    <div className="text-ak-text-secondary text-sm">
                      {track.duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'gallery':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-ak-primary mb-2">画廊</h3>
              <p className="text-ak-text-secondary">精美的游戏艺术作品</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-ak-primary/20 to-ak-secondary/20 rounded-lg border border-ak-border group-hover:border-ak-primary transition-all duration-300 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-ak-primary text-lg font-bold mb-2">
                          {item.title}
                        </div>
                        <div className="text-ak-text-secondary text-sm">
                          {item.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{activeCategory.icon}</div>
            <h3 className="text-2xl font-bold text-ak-primary mb-4">
              {activeCategory.titleCn}
            </h3>
            <p className="text-ak-text-secondary max-w-md mx-auto">
              {activeCategory.description}
            </p>
            <div className="mt-8">
              <span className="text-ak-text-secondary text-sm">内容即将上线</span>
            </div>
          </div>
        )
    }
  }

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ak-dark via-ak-gray to-ak-dark opacity-90"></div>
        {/* 音波效果 */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-ak-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-ak-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-ak-primary mb-4 font-ak-secondary">
            ABOUT TERRA
          </h2>
          <div className="text-ak-text text-xl mb-2">泰拉万象</div>
          <div className="text-ak-text-secondary font-ak-secondary text-sm">
            请选择您要查看的内容
          </div>
          <div className="text-ak-text-secondary font-ak-secondary text-xs mt-1">
            HTTPS://AK.HYPERGRYPH.COM/
          </div>
        </motion.div>

        {/* 分类导航 */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
            {mediaCategories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`group relative p-6 rounded-lg border transition-all duration-300 ${
                  activeCategory.id === category.id
                    ? 'bg-ak-primary/20 border-ak-primary'
                    : 'bg-ak-gray/30 border-ak-border hover:border-ak-primary hover:bg-ak-gray/50'
                }`}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <div className={`font-ak-secondary font-bold text-sm mb-1 transition-colors ${
                    activeCategory.id === category.id ? 'text-ak-primary' : 'text-ak-text group-hover:text-ak-primary'
                  }`}>
                    {category.title}
                  </div>
                  <div className="text-ak-text-secondary text-xs">
                    {category.titleCn}
                  </div>
                </div>

                {/* 活跃指示器 */}
                {activeCategory.id === category.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-ak-primary rounded-lg"
                    layoutId="activeMediaCategory"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 年份选择器 */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center space-x-4 bg-ak-gray/30 border border-ak-border rounded-lg p-2">
            {years.map((year) => (
              <motion.button
                key={year}
                className={`px-4 py-2 rounded-md font-ak-secondary text-sm transition-all duration-300 ${
                  selectedYear === year
                    ? 'bg-ak-primary text-white'
                    : 'text-ak-text-secondary hover:text-ak-primary'
                }`}
                onClick={() => setSelectedYear(year)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 内容展示区域 */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 底部链接 */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-ak-text-secondary font-ak-secondary text-sm mb-4">
            查看详情
          </div>
          <motion.button
            className="bg-ak-primary/20 hover:bg-ak-primary/30 border border-ak-primary rounded-lg px-8 py-3 text-ak-primary font-ak-secondary transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            READ MORE
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
