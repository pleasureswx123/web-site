'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, ArrowLeft } from 'lucide-react'

const moreContent = [
  {
    id: 'evercall-rules',
    title: 'Evercall_玩法说明',
    titleEn: 'EVERCALL RULES',
    description: 'Roguelike玩法模式，每次挑战都有不同的体验。在这个模式中，你需要运用策略和运气来克服各种挑战。',
    image: '/images/more/bg3.jpg',
    icon: '/images/more/bg3.jpg',
    backgroundImage: '/images/more/bg3.jpg',
    tabs: [
      {
        id: 'overview',
        title: '玩法概述',
        content: '集成战略是心流元素的Roguelike玩法模式，每次进入都会有不同的体验。玩家需要在随机生成的地图中做出选择，收集道具和招募临时干员。',
        image: '/images/more/is-overview.jpg'
      },
      {
        id: 'rewards',
        title: '奖励机制',
        content: '通过完成集成战略可以获得各种奖励，包括源石锭、材料、家具等。难度越高，奖励越丰厚。',
        image: '/images/more/is-rewards.jpg'
      },
      {
        id: 'strategy',
        title: '攻略技巧',
        content: '合理选择路线、平衡风险与收益、善用临时招募系统是通关的关键。每个主题都有独特的机制和策略。',
        image: '/images/more/is-strategy.jpg'
      },
      {
        id: 'updates',
        title: '版本更新',
        content: '集成战略会定期更新新的主题和内容，带来全新的挑战和体验。敬请期待更多精彩内容。',
        image: '/images/more/is-updates.jpg'
      }
    ]
  },
  {
    id: 'privacy-policy',
    title: '隐私政策和服务条款',
    titleEn: 'PRIVACY POLICY & TERMS',
    description: '全新的战略模拟玩法，体验不同的战术策略。在这个模式中建设基地，管理资源，制定长期发展策略。',
    image: '/images/more/bg2.webp',
    icon: '/images/more/bg2.webp',
    backgroundImage: '/images/more/bg2.webp',
    tabs: [
      {
        id: 'gameplay',
        title: '玩法介绍',
        content: '生息演算是一个战略模拟玩法，玩家需要建设和管理自己的基地，合理分配资源，制定发展策略。',
        image: '/images/more/ra-gameplay.jpg'
      },
      {
        id: 'construction',
        title: '建设系统',
        content: '通过建造各种设施来提升基地的功能，包括生产设施、防御设施、研究设施等。',
        image: '/images/more/ra-construction.jpg'
      },
      {
        id: 'resources',
        title: '资源管理',
        content: '合理管理各种资源，包括人力、物资、能源等，确保基地的正常运转和持续发展。',
        image: '/images/more/ra-resources.jpg'
      },
      {
        id: 'combat',
        title: '战斗系统',
        content: '派遣干员执行各种任务，包括探索、战斗、收集等，获取更多资源和情报。',
        image: '/images/more/ra-combat.jpg'
      }
    ]
  },
  {
    id: 'animation-demo',
    title: '动画演示',
    titleEn: 'ANIMATION DEMO',
    description: '心流元素官方动画作品，深入了解泰拉世界的故事和角色。高质量的动画制作带来沉浸式体验。',
    image: '/images/more/bg.png',
    icon: '/images/more/bg.png',
    backgroundImage: '/images/more/bg.png',
    tabs: [
      {
        id: 'prelude',
        title: '黎明前奏',
        content: '心流元素首部动画作品，讲述了罗德岛成立初期的故事，展现了阿米娅等角色的成长历程。',
        image: '/images/more/anime-prelude.jpg'
      },
      {
        id: 'perish',
        title: '灭亡序曲',
        content: '第二部动画作品，深入探讨了感染者问题和社会矛盾，剧情更加深刻和复杂。',
        image: '/images/more/anime-perish.jpg'
      },
      {
        id: 'holy-knight',
        title: '圣骑士光',
        content: '以卡西米尔为背景的动画作品，展现了骑士竞技和政治斗争的复杂关系。',
        image: '/images/more/anime-knight.jpg'
      },
      {
        id: 'future',
        title: '未来作品',
        content: '更多精彩的动画作品正在制作中，将为玩家带来更多泰拉世界的精彩故事。',
        image: '/images/more/anime-future.jpg'
      }
    ]
  }
]

export default function MoreSection() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [selectedContent, setSelectedContent] = useState<typeof moreContent[0] | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  const handleItemClick = (item: typeof moreContent[0]) => {
    setSelectedContent(item)
    setActiveTab(0)
    setViewMode('detail')
  }

  const handleBack = () => {
    setViewMode('list')
    setSelectedContent(null)
    setActiveTab(0)
  }

  const handleTabChange = (index: number) => {
    setActiveTab(index)
  }

  return (
    <section className="w-full h-full relative overflow-hidden">

      <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">
        <div className="relative w-full h-full z-[20]">
          <AnimatePresence mode="wait">
            {viewMode === 'list' ? (
              // 列表视图
              <motion.div
                key="list"
                className="h-full relative grid grid-cols-3 grid-rows-1"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
              >
                {/* 背景 */}
                {/*<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"/>*/}

                {moreContent.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className="group relative h-[100vh] overflow-hidden cursor-pointer -mt-28"
                    onClick={() => handleItemClick(item)}
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: index * 0.1}}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                  >
                    {/* 背景图片 */}
                    <div className="absolute inset-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div
                        className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"/>
                    </div>

                    {/* 内容 */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-left">
                      <h3
                        className="text-2xl font-bold text-white mb-2 group-hover:text-ak-secondary transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-300 text-sm font-mono tracking-wider mb-4">
                        {item.titleEn}
                      </p>

                      <div className="flex items-center text-ak-secondary text-sm">
                        <span>VIEW MORE</span>
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              // 详情视图
              <motion.div
                key="detail"
                className="h-full relative z-[20]"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
              >
                {selectedContent && (
                  <>
                    {/* 全屏背景图 */}
                    <div className="absolute inset-0">
                      <Image
                        src={selectedContent.tabs[activeTab]?.image || selectedContent.backgroundImage || selectedContent.image}
                        alt={selectedContent.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* 内容区域 */}
                    <div className="relative z-10 min-h-screen flex">
                      {/* 左侧主要内容 */}
                      <div className="flex-1 flex items-center px-12">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${selectedContent.id}-${activeTab}`}
                            className="max-w-2xl"
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 50}}
                            transition={{duration: 0.6}}
                          >
                            {/* 主标题 */}
                            <motion.div
                              className="mb-8"
                              initial={{opacity: 0, y: 20}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.2}}
                            >
                              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                                {selectedContent.titleEn}
                              </h1>
                              <h2 className="text-2xl text-ak-secondary mb-6">
                                {selectedContent.title}
                              </h2>
                              <div className="w-20 h-1 bg-ak-secondary shadow-lg shadow-ak-secondary/50"/>
                            </motion.div>

                            {/* Tab内容 */}
                            <motion.div
                              className="space-y-6"
                              initial={{opacity: 0, y: 20}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.4}}
                            >
                              <h3 className="text-xl font-bold text-white">
                                {selectedContent.tabs[activeTab]?.title}
                              </h3>
                              <p className="text-gray-300 text-lg leading-relaxed">
                                {selectedContent.tabs[activeTab]?.content}
                              </p>
                            </motion.div>

                            {/* 访问网站按钮 */}
                            <motion.div
                              className="mt-8 flex space-x-4"
                              initial={{opacity: 0, y: 20}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.6}}
                            >
                              <motion.button
                                className="bg-ak-secondary hover:bg-ak-secondary/80 text-white px-8 py-3 rounded transition-colors duration-300 shadow-lg shadow-ak-secondary/30 hover:shadow-ak-secondary/50"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                              >
                                访问官网
                              </motion.button>
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* 右侧Tab导航 */}
                      <div className="w-80 flex flex-col justify-center pr-8">
                        <motion.div
                          className="space-y-4"
                          initial={{opacity: 0, x: 50}}
                          animate={{opacity: 1, x: 0}}
                          transition={{duration: 0.6, delay: 0.3}}
                        >
                          {selectedContent.tabs.map((tab, index) => (
                            <motion.button
                              key={tab.id}
                              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${activeTab === index
                                ? 'bg-ak-secondary/20 border-ak-secondary text-white shadow-lg shadow-ak-secondary/20'
                                : 'bg-black/30 border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white hover:bg-black/40'
                              }`}
                              onClick={() => handleTabChange(index)}
                              initial={{opacity: 0, x: 20}}
                              animate={{opacity: 1, x: 0}}
                              transition={{duration: 0.5, delay: 0.5 + index * 0.1}}
                              whileHover={{scale: 1.02}}
                              whileTap={{scale: 0.98}}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{tab.title}</span>
                                <ChevronRight className="w-4 h-4"/>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    {/* 返回按钮 */}
                    <motion.button
                      className="absolute z-20 bottom-8 left-8 flex items-center space-x-2 bg-black/50 hover:bg-black/70 border border-gray-600 hover:border-gray-400 px-6 py-3 rounded transition-all duration-300"
                      onClick={handleBack}
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: 0.8}}
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                    >
                      <ArrowLeft className="w-4 h-4 text-gray-300"/>
                      <span className="text-gray-300">返回</span>
                    </motion.button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
)
}
