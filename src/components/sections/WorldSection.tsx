'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react'
import { useMousePosition } from '@/hooks/useMousePosition'
import CSSStarfield from '@/components/effects/CSSStarfield'

const worldData = [
  {
    id: 'originiums',
    title: 'ORIGINIUMS',
    titleCn: '源石',
    description: '源石是泰拉世界的核心能源，推动着整个文明的发展。这种神秘的矿物蕴含着巨大的能量，但同时也是源石病的根源。',
    fullDescription: '源石是泰拉世界最重要的能源物质，它不仅推动了整个文明的科技进步，也带来了源石病这一无法治愈的疾病。接触源石的人有可能感染源石病，成为被社会歧视的感染者。源石的发现改变了整个世界的格局，各个国家和组织都在争夺这种珍贵的资源。',
    medicalRecord: 'MEDICAL RECORD',
    pageNumber: '01',
    totalPages: '06',
    hoverImage: '/images/originiums.svg',
  },
  {
    id: 'originium-arts',
    title: 'ORIGINIUM ARTS',
    titleCn: '源石技艺',
    description: '利用源石力量施展的特殊技能，是泰拉世界战斗和生活的重要组成部分。不同的人擅长不同类型的源石技艺。',
    fullDescription: '源石技艺是泰拉世界独有的能力体系，通过源石的力量，人们可以操控元素、治疗伤病、强化身体等。源石技艺的掌握程度往往决定了一个人在社会中的地位，强大的源石技艺师备受尊敬，同时也承担着更大的责任。',
    medicalRecord: 'MEDICAL RECORD',
    pageNumber: '02',
    totalPages: '06',
    hoverImage: '/images/originium-arts.svg',
  },
  {
    id: 'reunion',
    title: 'REUNION',
    titleCn: '整合运动',
    description: '由感染者组成的激进组织，致力于通过暴力手段改变感染者的地位，与罗德岛的理念形成鲜明对比。',
    fullDescription: '整合运动是一个由感染者组成的武装组织，他们认为只有通过暴力才能改变感染者被压迫的现状。虽然目标是为感染者争取权利，但他们的极端手段往往伤及无辜，这也是他们与罗德岛产生分歧的根本原因。',
    medicalRecord: 'MEDICAL RECORD',
    pageNumber: '03',
    totalPages: '06',
    hoverImage: '/images/reunion.svg',
  },
  {
    id: 'infected',
    title: 'INFECTED',
    titleCn: '感染者',
    description: '感染源石病的人群，在社会中遭受歧视和排斥。罗德岛致力于为他们提供医疗援助和社会支持。',
    fullDescription: '感染者是感染了源石病的人群，他们的身体会逐渐结晶化，最终死亡。由于疾病的传染性和社会的恐惧，感染者往往遭受严重的歧视和迫害，生活在社会的边缘。罗德岛的使命就是为这些被遗弃的人提供希望。',
    medicalRecord: 'MEDICAL RECORD',
    pageNumber: '04',
    totalPages: '06',
    hoverImage: '/images/infected.svg',
  },
  {
    id: 'nomadic-city',
    title: 'NOMADIC CITY',
    titleCn: '移动城邦',
    description: '为了躲避天灾而建造的可移动城市，是泰拉世界文明的主要形态，代表着人类的智慧和适应能力。',
    fullDescription: '由于天灾的威胁，泰拉世界的人们建造了能够移动的城市。这些移动城邦配备了先进的科技，可以在天灾来临前及时转移，保护城市中的居民。移动城邦的建造技术代表了各个文明的最高科技水平。',
    medicalRecord: 'MEDICAL RECORD',
    pageNumber: '05',
    totalPages: '06',
    hoverImage: '/images/nomadic-city.svg',
  },
  {
    id: 'rhodes-island',
    title: 'RHODES ISLAND',
    titleCn: '罗德岛',
    description: '致力于治疗源石病、保护感染者权益的医疗机构，同时也是一支强大的军事力量，在各种冲突中维持平衡。',
    fullDescription: '罗德岛是一个特殊的组织，表面上是医疗机构，实际上拥有强大的军事力量。他们致力于研究源石病的治疗方法，同时保护感染者的权益，在各种冲突中维持平衡。罗德岛代表着希望，是感染者最后的避难所。',
    medicalRecord: 'MEDICAL RECORD',
    pageNumber: '06',
    totalPages: '06',
    hoverImage: '/images/rhodes-island.svg',
  },
]

export default function WorldSection() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [selectedWorld, setSelectedWorld] = useState<typeof worldData[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<typeof worldData[0] | null>(null)
  const mousePosition = useMousePosition()

  const handleItemClick = (item: typeof worldData[0]) => {
    setSelectedWorld(item)
    setCurrentIndex(worldData.findIndex(w => w.id === item.id))
    setViewMode('detail')
  }

  const handleBack = () => {
    setViewMode('list')
    setSelectedWorld(null)
  }

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : worldData.length - 1
    setCurrentIndex(newIndex)
    setSelectedWorld(worldData[newIndex])
  }

  const handleNext = () => {
    const newIndex = currentIndex < worldData.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedWorld(worldData[newIndex])
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      {/* 网格背景 */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
         {/*备用的轻量级 CSS 星空效果 */}
         <CSSStarfield
          className="opacity-80"
          starCount={150}
          animationSpeed={1.2}
        />
      </div>

      <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {viewMode === 'list' ? (
              // 列表视图
              <motion.div key="list" className="relative z-10 flex w-full h-full" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}>
                {/* 左侧列表 */}
                <div className="w-1/3 min-w-32 flex flex-col justify-center px-12 pl-20 space-y-2">
                  {worldData.map((item, index) => (
                    <motion.button
                      key={item.id}
                      className="group text-left border-b border-gray-700 hover:border-ak-secondary pb-4 transition-all duration-300 hover:bg-ak-secondary/5 px-4 py-2"
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      initial={{opacity: 0, x: -50}}
                      animate={{opacity: 1, x: 0}}
                      transition={{duration: 0.6, delay: index * 0.1}}
                      whileHover={{x: 10}}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3
                            className="text-2xl font-bold text-white group-hover:text-ak-secondary transition-colors mb-2">
                            {item.titleCn}
                          </h3>
                          <p className="text-gray-400 text-sm font-mono tracking-wider">
                            {item.title}
                          </p>
                        </div>
                        <motion.div
                          className="text-gray-600 group-hover:text-ak-secondary transition-colors"
                          whileHover={{x: 5}}
                        >
                          <ChevronRight className="w-6 h-6"/>
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* 右侧装饰 */}
                <div className="flex-1 flex items-center justify-center relative">
                  <motion.div
                    className="text-center"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.8, delay: 0.3}}
                  >
                    {/* ASCII艺术风格的罗德岛标志 */}
                    <div className="font-mono text-cyan-400 text-xs leading-tight mb-8">
                      <div>{'    ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲'}</div>
                      <div>{'   ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲'}</div>
                      <div>{'  ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲'}</div>
                      <div>{'  ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲'}</div>
                      <div>{'  ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲'}</div>
                      <div>{'  ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲'}</div>
                      <div>{'   ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲'}</div>
                      <div>{'    ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲'}</div>
                    </div>
                    <div className="text-cyan-400 text-2xl font-bold tracking-wider mb-4">
                      RHODES ISLAND
                    </div>
                    <div className="text-gray-400 text-sm">
                      TERRA WORLD
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              // 详情视图
              <motion.div
                key="detail"
                className="relative z-10 flex w-full h-full"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
              >
                {/* 左侧导航箭头 */}
                <motion.button
                  className="absolute left-16 top-1/2 -translate-y-1/2 w-12 h-12 border border-white hover:bg-white/20 flex items-center justify-center transition-all duration-300 z-20 hover:shadow-lg hover:shadow-white/30"
                  onClick={handlePrevious}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}
                >
                  <ChevronLeft className="w-6 h-6 text-white"/>
                </motion.button>

                {/* 右侧导航箭头 */}
                <motion.button
                  className="absolute right-16 top-1/2 -translate-y-1/2 w-12 h-12 border border-white hover:bg-white/20 flex items-center justify-center transition-all duration-300 z-20 hover:shadow-lg hover:shadow-white/30"
                  onClick={handleNext}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}
                >
                  <ChevronRight className="w-6 h-6 text-white"/>
                </motion.button>

                {/* 中间内容区域 */}
                <div className="flex-1 flex items-center justify-center px-24">
                  <AnimatePresence mode="wait">
                    {selectedWorld && (
                      <motion.div
                        key={selectedWorld.id}
                        className="text-center max-w-4xl"
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -30}}
                        transition={{duration: 0.6}}
                      >
                        {/* 医疗记录标题 */}
                        <motion.div
                          className="text-ak-secondary text-sm font-mono tracking-wider mb-4"
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{delay: 0.2}}
                        >
                          {selectedWorld.medicalRecord}
                        </motion.div>

                        {/* 主标题 */}
                        <motion.h1
                          className="text-6xl font-bold text-white mb-4 tracking-wider"
                          initial={{opacity: 0, y: 20}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.3}}
                        >
                          {selectedWorld.titleCn}
                        </motion.h1>

                        <motion.h2
                          className="text-2xl text-ak-secondary font-mono mb-8"
                          initial={{opacity: 0, y: 20}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.4}}
                        >
                          {selectedWorld.title}
                        </motion.h2>

                        {/* 描述文本 */}
                        <motion.p
                          className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8"
                          initial={{opacity: 0, y: 20}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.5}}
                        >
                          {selectedWorld.fullDescription}
                        </motion.p>

                        {/* 页码指示器 */}
                        <motion.div
                          className="text-ak-secondary text-sm font-mono"
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{delay: 0.6}}
                        >
                          {selectedWorld.pageNumber} / {selectedWorld.totalPages}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 底部进度条 */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-800">
                  <motion.div
                    className="h-full bg-ak-secondary/50 shadow-lg shadow-ak-secondary/50"
                    initial={{width: 0}}
                    animate={{width: `${((currentIndex + 1) / worldData.length) * 100}%`}}
                    transition={{duration: 0.5}}
                  />
                </div>

                {/* 返回按钮 */}
                <motion.button
                  className="absolute bottom-8 right-8 flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 hover:border-gray-400 px-6 py-3 transition-all duration-300"
                  onClick={handleBack}
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.7}}
                >
                  <ArrowLeft className="w-4 h-4 text-gray-400"/>
                  <span className="text-gray-300">返回</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 跟随鼠标的图片 */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            className="fixed pointer-events-none z-[40]"
            style={{
              left: mousePosition.x - 120,
              top: mousePosition.y - 80,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-64 h-64 overflow-hidden">
              <img
                src={hoveredItem.hoverImage}
                alt={hoveredItem.titleCn}
                className="w-full h-full object-cover brightness-50 backdrop-blur-sm"
                onError={(e) => {
                  // 如果图片加载失败，显示一个占位符
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI1NiAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMTYwIiBmaWxsPSIjMTExODI3Ii8+CjxwYXRoIGQ9Ik0xMjggODBMMTQ0IDk2SDE0NFY5NkgxMTJWOTZMMTI4IDgwWiIgZmlsbD0iIzAwRkZGRiIvPgo8dGV4dCB4PSIxMjgiIHk9IjEyMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
)
}
