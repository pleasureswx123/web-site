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
    description: '专为【深度陪伴】打造的拟人化 AI 数字人体验系统，Live2D动态表现、长期记忆、情绪识别、真实对话节奏。',
    image: '/images/more/bg3.jpg',
    icon: '/images/more/bg3.jpg',
    backgroundImage: '/images/more/bg3.jpg',
    tabs: [
      {
        id: 'overview',
        title: '什么是 Evercall？',
        content: '它是一款专为【深度陪伴】打造的拟人化 AI 数字人体验系统，Live2D动态表现、长期记忆、情绪识别、真实对话节奏，让你在虚拟世界中，拥有一个只属于你的她。',
        image: '/images/more/bg3.jpg'
      },
      {
        id: 'features',
        title: '核心功能',
        content: '1. 高拟真对话系统：支持多轮上下文记忆、情绪识别、语速调节与自然断句。\n2. 情感陪伴机制：内建陪伴节奏（早安、午间、晚安等）、节日与纪念日互动。\n3. 个性化定制：支持角色性格选择、声音风格、着装搭配、场景模式自定义。\n4. 长期记忆库：可记录与用户的对话、事件、偏好与变化，持续成长。\n5. 表情与动作：同步表情包、Live2D动作演绎，打造沉浸互动体验。\n6. 交互场景：您的虚拟伙伴既可以出现在其专属场景，也可以直接出现在您的桌面上。',
        image: '/images/more/bg3.jpg'
      },
      {
        id: 'audience',
        title: '适用人群',
        content: '- 喜欢二次元拟人角色与情感互动的用户\n- 希望获得情绪出口或情感价值人群\n- 热爱体验前沿AI技术与数字人互动方式的探索者',
        image: '/images/more/bg3.jpg'
      },
      {
        id: 'goal',
        title: 'Evercall 的目标',
        content: '我们希望通过Evercall，在数字时代重新定义"陪伴"的意义。让每个用户在虚拟世界中，也能感受到被理解、被回应与被珍惜的情感连接。',
        image: '/images/more/bg3.jpg'
      }
    ]
  },
  {
    id: 'privacy-policy',
    title: '隐私政策和服务条款',
    titleEn: 'PRIVACY POLICY & TERMS',
    description: 'EVERCALL 隐私政策和服务条款，保护用户权益，规范服务使用，确保安全合规的使用体验。',
    image: '/images/more/bg2.webp',
    icon: '/images/more/bg2.webp',
    backgroundImage: '/images/more/bg2.webp',
    tabs: [
      {
        id: 'privacy-overview',
        title: '隐私政策概述',
        content: '本隐私政策自 2025 年 8 月 27 日起生效。描述了EVERCALL从您那里收集和处理的关于您的信息类型。我们致力于保护您的隐私权益，确保信息安全。',
        image: '/images/more/bg2.webp'
      },
      {
        id: 'data-collection',
        title: '信息收集',
        content: '我们收集您直接提供的信息（如姓名、邮箱、电话等）、使用服务时自动获得的数据（如设备信息、使用记录等）以及从其他来源获得的信息。收集信息仅用于提供更好的服务体验。',
        image: '/images/more/bg2.webp'
      },
      {
        id: 'data-usage',
        title: '信息使用',
        content: '我们使用收集的信息来：提供、管理和运营服务；生成和分析服务使用情况；根据您的偏好定制服务；与您沟通；分析、维护、改进服务；开发新功能和服务；处理付款；检测和防止欺诈等。',
        image: '/images/more/bg2.webp'
      },
      {
        id: 'terms-service',
        title: '服务条款',
        content: '使用EVERCALL服务即表示您同意遵守我们的服务条款。包括用户行为规范、内容审核政策、知识产权保护、未成年人保护等重要条款。我们保留根据法律法规终止违规服务的权利。',
        image: '/images/more/bg2.webp'
      }
    ]
  },
  {
    id: 'animation-demo',
    title: '动画演示',
    titleEn: 'ANIMATION DEMO',
    description: 'EVERCALL 动画演示展示，体验 Live2D 动态表现和情感互动的魅力，感受虚拟陪伴的真实体验。',
    image: '/images/more/bg.png',
    icon: '/images/more/bg.png',
    backgroundImage: '/images/more/bg.png',
    tabs: [
      {
        id: 'live2d-demo',
        title: 'Live2D 演示',
        content: '这里放演示动画 - 体验 EVERCALL 的 Live2D 动态表现技术，观看虚拟角色的自然动作和表情变化，感受真实的互动体验。',
        image: '/images/more/bg.png'
      },
      {
        id: 'interaction-demo',
        title: '互动演示',
        content: '展示 EVERCALL 的情感互动功能，包括语音对话、情绪识别、个性化回应等核心特性，让您提前体验深度陪伴的魅力。',
        image: '/images/more/bg.png'
      },
      {
        id: 'customization-demo',
        title: '定制演示',
        content: '演示角色个性化定制功能，包括外观设计、性格设定、声音风格等多维度自定义选项，打造专属于您的虚拟伙伴。',
        image: '/images/more/bg.png'
      },
      {
        id: 'scene-demo',
        title: '场景演示',
        content: '展示多样化的交互场景，从专属房间到桌面陪伴，体验不同环境下的虚拟陪伴模式，感受无处不在的温暖陪伴。',
        image: '/images/more/bg.png'
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
                    <div className="relative z-10 min-h-screen flex overflow-hidden">
                      {/* 左侧主要内容 */}
                      <div className="flex-1 flex items-start px-12 py-16 overflow-y-auto max-h-screen">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${selectedContent.id}-${activeTab}`}
                            className="max-w-2xl w-full"
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
                              className="space-y-6 mb-8"
                              initial={{opacity: 0, y: 20}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.4}}
                            >
                              <h3 className="text-2xl font-bold text-white mb-4">
                                {selectedContent.tabs[activeTab]?.title}
                              </h3>
                              <div className="bg-black/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6">
                                <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                                  {selectedContent.tabs[activeTab]?.content}
                                </div>
                              </div>
                            </motion.div>

                            <motion.div
                              className="flex space-x-4"
                              initial={{opacity: 0, y: 20}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.6}}
                            >
                              <motion.button
                                className="bg-ak-secondary hover:bg-ak-secondary/80 text-white px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg shadow-ak-secondary/30 hover:shadow-ak-secondary/50 font-medium"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                              >
                                访问官网
                              </motion.button>
                              <motion.button
                                className="bg-transparent hover:bg-white/10 text-white border border-gray-400 hover:border-white px-8 py-3 rounded-lg transition-all duration-300 font-medium"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                              >
                                了解更多
                              </motion.button>
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* 右侧Tab导航 */}
                      <div className="w-80 flex flex-col justify-start pr-8 py-16 max-h-screen overflow-y-auto">
                        <motion.div
                          className="space-y-4"
                          initial={{opacity: 0, x: 50}}
                          animate={{opacity: 1, x: 0}}
                          transition={{duration: 0.6, delay: 0.3}}
                        >
                          <div className="mb-6">
                            <h4 className="text-white text-lg font-bold mb-2">内容导航</h4>
                            <div className="w-12 h-0.5 bg-ak-secondary"></div>
                          </div>
                          {selectedContent.tabs.map((tab, index) => (
                            <motion.button
                              key={tab.id}
                              className={`w-full text-left p-4 rounded-lg border transition-all duration-300 backdrop-blur-sm ${activeTab === index
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
                                <div className="flex items-center space-x-3">
                                  <div className={`w-2 h-2 rounded-full ${activeTab === index ? 'bg-ak-secondary' : 'bg-gray-500'}`}></div>
                                  <span className="font-medium">{tab.title}</span>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === index ? 'text-ak-secondary' : ''}`}/>
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
