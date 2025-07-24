'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const mediaCategories = [
  {
    id: 'monster-siren',
    title: 'MONSTER SIREN',
    titleCn: '塞壬唱片',
    description: '一个专注于电子音乐的厂牌',
    fullDescription: '塞壬唱片是明日方舟官方音乐厂牌，致力于为游戏制作高质量的原创音乐。我们的音乐涵盖了电子、古典、摇滚等多种风格，为玩家带来沉浸式的听觉体验。',
    website: 'HTTPS://AK.HYPERGRYPH.COM/',
    image: '/images/media/monster-siren-bg.jpg',
    logo: '/images/media/monster-siren-logo.png',
    items: [
      {
        id: 1,
        title: '谢拉格',
        subtitle: '#哈兰贸易#',
        year: '2021',
        image: '/images/media/siesta-1.jpg',
        description: '谢拉格地区的贸易活动记录，展现了当地独特的商业文化和传统。'
      },
      {
        id: 2,
        title: '龙门',
        subtitle: '#都市发展#',
        year: '2021',
        image: '/images/media/lungmen-1.jpg',
        description: '龙门作为现代化都市的发展历程，科技与传统的完美融合。'
      },
      {
        id: 3,
        title: '炎国',
        subtitle: '#文化传承#',
        year: '2021',
        image: '/images/media/yan-1.jpg',
        description: '炎国深厚的文化底蕴和历史传承，古老智慧的现代体现。'
      },
      {
        id: 4,
        title: '维多利亚',
        subtitle: '#工业革命#',
        year: '2021',
        image: '/images/media/victoria-1.jpg',
        description: '维多利亚的工业发展和社会变革，蒸汽时代的辉煌。'
      }
    ]
  },
  {
    id: 'gallery',
    title: 'GALLERY',
    titleCn: '画廊',
    description: '游戏内的精美插画作品集',
    fullDescription: '画廊收录了明日方舟游戏中的精美插画、角色立绘和概念设计作品。每一幅作品都展现了泰拉世界的独特魅力和艺术价值。',
    website: 'HTTPS://AK.HYPERGRYPH.COM/',
    image: '/images/media/gallery-bg.jpg',
    logo: '/images/media/gallery-logo.png',
    items: [
      {
        id: 1,
        title: '角色立绘',
        subtitle: '#干员档案#',
        year: '2021',
        image: '/images/media/operators-1.jpg',
        description: '精美的干员立绘作品，展现每个角色的独特魅力。'
      },
      {
        id: 2,
        title: '场景概念',
        subtitle: '#世界设定#',
        year: '2021',
        image: '/images/media/scenes-1.jpg',
        description: '泰拉世界各地的场景概念设计，构建完整的世界观。'
      }
    ]
  },
  {
    id: 'operator',
    title: 'OPERATOR',
    titleCn: '干员档案',
    description: '详细的干员资料和背景',
    fullDescription: '干员档案包含了所有干员的详细资料、技能介绍和背景故事。深入了解每个干员的过往经历和个人特色。',
    website: 'HTTPS://AK.HYPERGRYPH.COM/',
    image: '/images/media/operator-bg.jpg',
    logo: '/images/media/operator-logo.png',
    items: [
      {
        id: 1,
        title: '精英干员',
        subtitle: '#高级档案#',
        year: '2021',
        image: '/images/media/elite-ops-1.jpg',
        description: '精英干员的详细档案和战斗记录。'
      }
    ]
  },
  {
    id: 'video',
    title: 'VIDEO',
    titleCn: '影像资料',
    description: '游戏相关的视频内容',
    fullDescription: '影像资料收录了游戏宣传片、PV、动画短片等视频内容。通过影像的方式展现泰拉世界的精彩故事。',
    website: 'HTTPS://AK.HYPERGRYPH.COM/',
    image: '/images/media/video-bg.jpg',
    logo: '/images/media/video-logo.png',
    items: [
      {
        id: 1,
        title: '宣传片',
        subtitle: '#官方PV#',
        year: '2021',
        image: '/images/media/pv-1.jpg',
        description: '官方制作的游戏宣传片和预告片。'
      }
    ]
  },
]

export default function MediaSection() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [activeCategory, setActiveCategory] = useState(mediaCategories[0])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const handleCategorySelect = (category: typeof mediaCategories[0]) => {
    setActiveCategory(category)
  }

  const handleViewDetails = () => {
    setCurrentItemIndex(0)
    setViewMode('detail')
  }

  const handleBack = () => {
    setViewMode('list')
  }

  const handlePrevious = () => {
    const items = activeCategory.items
    setCurrentItemIndex(currentItemIndex > 0 ? currentItemIndex - 1 : items.length - 1)
  }

  const handleNext = () => {
    const items = activeCategory.items
    setCurrentItemIndex(currentItemIndex < items.length - 1 ? currentItemIndex + 1 : 0)
  }

  return (
    <section className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          // 列表视图
          <motion.div
            key="list"
            className="min-h-screen relative bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-screen">
              {/* 左侧导航菜单 */}
              <div className="w-80 bg-black/80 border-r border-red-600 p-8 flex flex-col">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-red-500 text-sm font-mono mb-2">泰拉万象 - 多媒体资料</div>
                  <h2 className="text-white text-2xl font-bold border border-red-600 px-4 py-2">
                    ABOUT TERRA
                  </h2>
                </motion.div>

                <div className="space-y-2 flex-1">
                  {mediaCategories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      className={`w-full text-left p-3 border transition-all duration-300 ${activeCategory.id === category.id
                          ? 'bg-red-600/20 border-red-500 text-white'
                          : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                        }`}
                      onClick={() => handleCategorySelect(category)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-sm">{category.title}</div>
                          <div className="text-xs opacity-70">{category.titleCn}</div>
                        </div>
                        {activeCategory.id === category.id && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 右侧内容区域 */}
              <div className="flex-1 relative">
                {/* 背景图片 */}
                <div className="absolute inset-0">
                  <Image
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>

                {/* 内容 */}
                <div className="relative z-10 h-full flex flex-col justify-center px-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory.id}
                      className="max-w-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Logo区域 */}
                      <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="w-32 h-32 bg-cyan-400 rounded-lg flex items-center justify-center mb-6">
                          <div className="text-black font-bold text-2xl">
                            {activeCategory.title.split(' ').map(word => word[0]).join('')}
                          </div>
                        </div>
                      </motion.div>

                      {/* 标题和描述 */}
                      <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h1 className="text-4xl font-bold text-white mb-4">
                          {activeCategory.title}
                        </h1>
                        <h2 className="text-2xl text-cyan-400 mb-6">
                          {activeCategory.titleCn}
                        </h2>
                        <div className="w-20 h-1 bg-cyan-400 mb-6"></div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-4">
                          {activeCategory.fullDescription}
                        </p>
                        <div className="text-cyan-400 text-sm font-mono">
                          {activeCategory.website}
                        </div>
                      </motion.div>

                      {/* 查看详情按钮 */}
                      <motion.button
                        className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded transition-colors duration-300 flex items-center space-x-2"
                        onClick={handleViewDetails}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>查看详情</span>
                        <span className="text-sm">READ MORE</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // 详情视图
          <motion.div
            key="detail"
            className="min-h-screen relative bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeCategory.items.length > 0 && (
              <>
                {/* 全屏背景图 */}
                <div className="absolute inset-0">
                  <Image
                    src={activeCategory.items[currentItemIndex]?.image || activeCategory.image}
                    alt={activeCategory.items[currentItemIndex]?.title || activeCategory.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* 左侧时间轴 */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-white text-sm font-mono">TIMELINE</div>
                    <div className="text-white text-3xl font-bold">2021</div>
                    <div className="text-cyan-400 text-sm">← 2021</div>

                    {/* 时间点列表 */}
                    <div className="space-y-2 mt-8">
                      {['01', '02', '03', '04', '05', '06'].map((num, index) => (
                        <div
                          key={num}
                          className={`text-sm font-mono ${index === currentItemIndex ? 'text-cyan-400' : 'text-gray-500'
                            }`}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* 左右导航箭头 */}
                <motion.button
                  className="absolute left-8 bottom-8 w-12 h-12 border border-white/50 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all duration-300 z-20"
                  onClick={handlePrevious}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  className="absolute right-8 bottom-8 w-12 h-12 border border-white/50 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all duration-300 z-20"
                  onClick={handleNext}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* 底部内容信息 */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                  <div className="bg-gradient-to-t from-black/80 to-transparent p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentItemIndex}
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h1 className="text-4xl font-bold text-white mb-2">
                          {activeCategory.items[currentItemIndex]?.title}
                        </h1>
                        <p className="text-cyan-400 text-lg mb-4">
                          {activeCategory.items[currentItemIndex]?.subtitle}
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                          {activeCategory.items[currentItemIndex]?.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* 底部缩略图 */}
                    <div className="flex space-x-4 mt-8">
                      {activeCategory.items.slice(0, 4).map((item, index) => (
                        <motion.button
                          key={item.id}
                          className={`w-20 h-12 rounded border-2 overflow-hidden transition-all duration-300 ${index === currentItemIndex ? 'border-cyan-400' : 'border-gray-600 hover:border-gray-400'
                            }`}
                          onClick={() => setCurrentItemIndex(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={80}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 返回按钮 */}
                <motion.button
                  className="absolute top-8 right-8 flex items-center space-x-2 bg-black/50 hover:bg-black/70 border border-gray-600 hover:border-gray-400 px-6 py-3 rounded transition-all duration-300 z-20"
                  onClick={handleBack}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-gray-300">返回</span>
                  <span className="text-gray-400 text-sm">GO BACK</span>
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
