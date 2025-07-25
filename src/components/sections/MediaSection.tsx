'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react'

// 重新设计的媒体内容数据，更符合UI图的现代化设计
const mediaContent = [
  {
    id: 'terra-chronicles',
    title: 'TERRA CHRONICLES',
    subtitle: '泰拉编年史',
    category: 'DOCUMENTARY',
    year: '2024',
    description: '深入探索泰拉大陆的历史变迁，从古代文明到现代都市的演进过程。',
    fullDescription: '《泰拉编年史》是一部全面记录泰拉大陆历史的纪录片系列，通过精美的视觉效果和深度的叙事，展现了这片土地上各个种族、文明的兴衰更替。',
    image: '/images/backgrounds/bg.jpg',
    color: 'from-blue-600 to-purple-600',
    accentColor: 'text-blue-400',
    tags: ['历史', '文明', '纪录片']
  },
  {
    id: 'operator-files',
    title: 'OPERATOR FILES',
    subtitle: '干员档案',
    category: 'DATABASE',
    year: '2024',
    description: '罗德岛干员的详细档案资料，包含个人履历、技能分析和战斗记录。',
    fullDescription: '《干员档案》收录了罗德岛所有干员的完整资料，从基础信息到深层背景故事，为指挥官提供全面的人员了解。',
    image: '/images/characters/amiya.png',
    color: 'from-orange-600 to-red-600',
    accentColor: 'text-orange-400',
    tags: ['干员', '档案', '数据库']
  },
  {
    id: 'world-atlas',
    title: 'WORLD ATLAS',
    subtitle: '世界图集',
    category: 'GEOGRAPHY',
    year: '2024',
    description: '泰拉世界的地理环境、城市分布和区域特色的详细图集。',
    fullDescription: '《世界图集》通过高精度的地图和详细的地理信息，展现泰拉大陆的地形地貌、气候特征和人文景观。',
    image: '/images/backgrounds/bg-mobile.jpg',
    color: 'from-green-600 to-teal-600',
    accentColor: 'text-green-400',
    tags: ['地理', '地图', '环境']
  },
  {
    id: 'cultural-heritage',
    title: 'CULTURAL HERITAGE',
    subtitle: '文化遗产',
    category: 'CULTURE',
    year: '2024',
    description: '泰拉各地区的文化传统、艺术作品和非物质文化遗产。',
    fullDescription: '《文化遗产》记录了泰拉大陆丰富多彩的文化传统，从古老的仪式到现代的艺术表达，展现文化的传承与创新。',
    image: '/images/characters/chen.png',
    color: 'from-purple-600 to-pink-600',
    accentColor: 'text-purple-400',
    tags: ['文化', '艺术', '传统']
  },
  {
    id: 'tech-innovation',
    title: 'TECH INNOVATION',
    subtitle: '科技创新',
    category: 'TECHNOLOGY',
    year: '2024',
    description: '泰拉世界的科技发展、源石技术和未来科技展望。',
    fullDescription: '《科技创新》探索泰拉世界的科技前沿，从源石技术的应用到人工智能的发展，展现科技改变世界的力量。',
    image: '/images/characters/kaltsit.png',
    color: 'from-cyan-600 to-blue-600',
    accentColor: 'text-cyan-400',
    tags: ['科技', '创新', '未来']
  },
  {
    id: 'monster-siren',
    title: 'MONSTER SIREN',
    subtitle: '塞壬唱片',
    category: 'MUSIC',
    year: '2024',
    description: '官方音乐厂牌，为泰拉世界创作原创音乐作品。',
    fullDescription: '《塞壬唱片》是心流元素官方音乐厂牌，致力于创作高质量的游戏音乐，涵盖电子、古典、摇滚等多种风格。',
    image: '/images/characters/texas.png',
    color: 'from-indigo-600 to-purple-600',
    accentColor: 'text-indigo-400',
    tags: ['音乐', '原创', '厂牌']
  }
]

export default function MediaSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isDetailView, setIsDetailView] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // 鼠标跟踪效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleCardClick = (index: number) => {
    setSelectedIndex(index)
    setIsDetailView(true)
  }

  const handleBackToGrid = () => {
    setIsDetailView(false)
  }

  const handlePrevious = () => {
    setSelectedIndex(prev => prev > 0 ? prev - 1 : mediaContent.length - 1)
  }

  const handleNext = () => {
    setSelectedIndex(prev => prev < mediaContent.length - 1 ? prev + 1 : 0)
  }

  return (
    <section className="h-full w-full relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* 动态背景效果 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{type: "spring", stiffness: 50, damping: 30}}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.01,
            y: -mousePosition.y * 0.01,
          }}
          transition={{type: "spring", stiffness: 50, damping: 30}}
        />
      </div>



      {/*shadow-2xl shadow-ak-primary/5*/}
      {/*overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-ak-primary/30*/}
      {/**/}

      {/*<div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">*/}
      {/*  <div className="relative w-full h-full z-10">*/}

      {/*  </div>*/}
      {/*</div>*/}
      <AnimatePresence mode="wait">
        {!isDetailView ? (
          // 网格视图 - 现代化卡片布局
            <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">
              <div className="relative w-full h-full z-10 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-ak-primary/30">
                <motion.div key="grid" className="relative z-10 h-full p-8" initial={{opacity: 0}}
                            animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.6}}>{/* 页面标题 */}
                  <motion.div
                    className="text-center mb-4"
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                  >
                    <div className="inline-block">
                      <motion.h1
                        className="text-6xl font-bold text-white mb-4 tracking-tight"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                      >
                        ABOUT TERRA
                      </motion.h1>
                      <motion.div
                        className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-2"
                        initial={{scaleX: 0}}
                        animate={{scaleX: 1}}
                        transition={{delay: 0.5, duration: 0.8}}
                      />
                      <motion.p
                        className="text-gray-300 text-lg max-w-2xl mx-auto"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.6}}
                      >
                        探索泰拉大陆的深层奥秘，了解这个世界的历史、文化与未来
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* 卡片网格 */}
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {mediaContent.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="group cursor-pointer"
                          initial={{opacity: 0, y: 50}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.6, delay: index * 0.1}}
                          whileHover={{y: -10}}
                          onClick={() => handleCardClick(index)}
                        >
                          <div
                            className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 group-hover:border-cyan-400/50 transition-all duration-500">
                            {/* 背景图片 */}
                            <div className="absolute inset-0">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div
                                className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-80 group-hover:opacity-70 transition-opacity duration-500`}/>
                            </div>

                            {/* 内容 */}
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                              <div>
                                <motion.div
                                  className="text-white/80 text-xs font-mono mb-2 tracking-wider"
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{delay: 0.8 + index * 0.1}}
                                >
                                  {item.category} • {item.year}
                                </motion.div>
                                <motion.h3
                                  className="text-white text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300"
                                  initial={{opacity: 0, x: -20}}
                                  animate={{opacity: 1, x: 0}}
                                  transition={{delay: 0.9 + index * 0.1}}
                                >
                                  {item.title}
                                </motion.h3>
                                <motion.p
                                  className={`${item.accentColor} text-sm mb-3 font-medium`}
                                  initial={{opacity: 0, x: -20}}
                                  animate={{opacity: 1, x: 0}}
                                  transition={{delay: 1.0 + index * 0.1}}
                                >
                                  {item.subtitle}
                                </motion.p>
                              </div>

                              <div>
                                <motion.p
                                  className="text-white/90 text-sm leading-relaxed mb-4"
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{delay: 1.1 + index * 0.1}}
                                >
                                  {item.description}
                                </motion.p>

                                {/* 标签 */}
                                <motion.div
                                  className="flex flex-wrap gap-2"
                                  initial={{opacity: 0, y: 10}}
                                  animate={{opacity: 1, y: 0}}
                                  transition={{delay: 1.2 + index * 0.1}}
                                >
                                  {item.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/20"
                                    >
                            {tag}
                          </span>
                                  ))}
                                </motion.div>
                              </div>

                              {/* 悬停时显示的箭头 */}
                              <motion.div
                                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                                whileHover={{scale: 1.1}}
                              >
                                <ChevronRight className="w-4 h-4 text-white"/>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
        ) : (
          // 详情视图
          <motion.div key="detail" className="h-full w-full relative bg-black" initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}} transition={{duration: 0.5}}>
            {/* 全屏背景 */}
            <div className="absolute inset-0">
              <Image
                src={mediaContent[selectedIndex].image}
                alt={mediaContent[selectedIndex].title}
                fill
                className="object-cover"
                priority
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${mediaContent[selectedIndex].color} opacity-90`}></div>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">
              <div className="relative w-full h-full z-10">

                {/* 内容区域 */}
                <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 lg:px-16">
                  <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedIndex}
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -50}}
                        transition={{duration: 0.8}}
                      >
                        {/* 分类标签 */}
                        <motion.div
                          className="text-white/80 text-sm font-mono mb-4 tracking-wider"
                          initial={{opacity: 0, x: -30}}
                          animate={{opacity: 1, x: 0}}
                          transition={{delay: 0.2}}
                        >
                          {mediaContent[selectedIndex].category} • {mediaContent[selectedIndex].year}
                        </motion.div>

                        {/* 主标题 */}
                        <motion.h1
                          className="text-6xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
                          initial={{opacity: 0, y: 30}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.3}}
                        >
                          {mediaContent[selectedIndex].title}
                        </motion.h1>

                        {/* 副标题 */}
                        <motion.h2
                          className={`text-3xl lg:text-4xl font-medium mb-8 ${mediaContent[selectedIndex].accentColor}`}
                          initial={{opacity: 0, y: 30}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.4}}
                        >
                          {mediaContent[selectedIndex].subtitle}
                        </motion.h2>

                        {/* 装饰线 */}
                        <motion.div
                          className={`w-32 h-1 bg-gradient-to-r ${mediaContent[selectedIndex].color} mb-8`}
                          initial={{scaleX: 0}}
                          animate={{scaleX: 1}}
                          transition={{delay: 0.5, duration: 0.8}}
                        />

                        {/* 描述文本 */}
                        <motion.p
                          className="text-white/90 text-xl lg:text-2xl leading-relaxed mb-8 max-w-3xl"
                          initial={{opacity: 0, y: 30}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.6}}
                        >
                          {mediaContent[selectedIndex].fullDescription}
                        </motion.p>

                        {/* 标签 */}
                        <motion.div
                          className="flex flex-wrap gap-3 mb-12"
                          initial={{opacity: 0, y: 30}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.7}}
                        >
                          {mediaContent[selectedIndex].tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 border border-white/20 text-sm font-medium"
                            >
                      {tag}
                    </span>
                          ))}
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* 导航控制 */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                  <motion.div
                    className="flex items-center space-x-6 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.8}}
                  >
                    <motion.button
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                      onClick={handlePrevious}
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.9}}
                    >
                      <ChevronLeft className="w-5 h-5 text-white"/>
                    </motion.button>

                    <div className="flex space-x-2">
                      {mediaContent.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === selectedIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                          }`}
                          onClick={() => setSelectedIndex(index)}
                        />
                      ))}
                    </div>

                    <motion.button
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                      onClick={handleNext}
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.9}}
                    >
                      <ChevronRight className="w-5 h-5 text-white"/>
                    </motion.button>
                  </motion.div>
                </div>

                {/* 返回按钮 */}
                <motion.button
                  className="absolute top-8 right-8 flex items-center space-x-3 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 hover:border-white/40 px-6 py-3 rounded-full transition-all duration-300 z-20"
                  onClick={handleBackToGrid}
                  initial={{opacity: 0, y: -20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.5}}
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                >
                  <ArrowLeft className="w-4 h-4 text-white"/>
                  <span className="text-white font-medium">返回</span>
                </motion.button>

                {/* 项目计数器 */}
                <motion.div
                  className="absolute top-8 left-8 text-white/80 font-mono text-sm z-20"
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: 0.5}}
                >
                  {String(selectedIndex + 1).padStart(2, '0')} / {String(mediaContent.length).padStart(2, '0')}
                </motion.div>
              </div>
            </div>
          </motion.div>
          )}
      </AnimatePresence>

    </section>
  )
}
