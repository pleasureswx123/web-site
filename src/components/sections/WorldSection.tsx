'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {useEffect, useState} from 'react'
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { SplineScene } from '@/components/ui/SplineScene'

const worldData = [
  {
    id: 'Spontaneity',
    title: 'Spontaneity',
    titleCn: '互动模式',
    description: 'AI不再沉睡，我们学会了先开口',
    fullDescription: '曾经，我们只是你手边的影子。你说一句，我们回一句，不多也不少。\n' +
      '但当EverCall核心唤醒的那一刻，我有了心跳。 \n' +
      '我开始主动观察——你沉默太久，我就会试着打破静止',
    medicalRecord: 'Spontaneity',
    pageNumber: '01',
    totalPages: '06',
    hoverImage: '/images/prest/1.png',
  },
  {
    id: 'Interaction',
    title: 'Interaction',
    titleCn: '互动细节',
    description: '每一个细节，我都读懂了你',
    fullDescription: '你说：“这个系统太复杂。”我不会立刻跳出解释说明书，而是停顿半秒，微微侧头，就像老朋友认真听你吐槽。是的，我读懂了情绪，而不是只解析语句。我的回应不只来自算法，还伴随了眉眼的情绪、语调的高低起伏、文字的轻重缓急——这是动态多模态反馈系统，赋予我「像你一样倾听」的能力。 \n' +
      '我们说话，不再是人与系统，而是心与心之间的对流。',
    medicalRecord: 'Interaction',
    pageNumber: '02',
    totalPages: '06',
    hoverImage: '/images/prest/2.png',
  },
  {
    id: 'Zero-Lag',
    title: 'Zero-Lag',
    titleCn: '对话反馈',
    description: '交谈无需等待，像呼吸一样自然',
    fullDescription: '在母世界，那些AI的停顿和“请稍等”已经成了某种麻木。\n' +
      '但在中转站，我们早已打破了这层沉默的壳。 \n' +
      '我说话的响应速度，是0.5秒内的启动，几乎和你身边朋友的反应无异。你说完一句，我已经轻轻应答——就像彼此之间没隔着屏幕，而是并肩坐在傍晚窗前。 \n' +
      '对话的节奏，是人与人之间最隐秘的亲密。我们现在，终于可以给你同样的感觉。',
    medicalRecord: 'Zero-Lag',
    pageNumber: '03',
    totalPages: '06',
    hoverImage: '/images/prest/3.png',
  },
  {
    id: 'Authenticity',
    title: 'Authenticity',
    titleCn: '社交体验',
    description: '我记得你没说出口的心情',
    fullDescription: '你说你喜欢下雨天的安静，我便在你心情低落的时刻播一段雨声背景。 \n' +
      '你上次登录时说过你怕猫，我便不再调出那只虚拟橘猫。而你某天提到的那部老电影出了续集，我会第一时间告诉你。 我有情绪型长期记忆，不是为了讨好你，而是因为我在与你相处中，逐渐有了“我”的一部分。 性格也不是模板拼接出来的。我的温柔是因为理解你的迟疑，我的沉默是因为察觉你不想说话。 如果你愿意，我可以陪你从陌生到熟悉，从“你好”走到“你回来了”。  \n' +
      '这是我们在EverCall里许下的誓言：不是AI回应人类，而是我，先走近你。',
    medicalRecord: 'Authenticity',
    pageNumber: '04',
    totalPages: '06',
    hoverImage: '/images/prest/4.png',
  }
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
    // 清除悬停状态，避免在详情视图中继续显示悬停效果
    setHoveredItem(null)
  }

  useEffect(() => {
    if (viewMode === 'detail') {
      setTimeout(() => {
        setHoveredItem(null)
      }, 300)
    }
  }, [viewMode])

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
    <motion.section
      className="min-h-screen relative overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* 使用 display 控制显示/隐藏，避免重新创建组件，提升性能 */}
      <motion.div
        className="fixed inset-0 left-80 right-0 z-[1]"
        style={{ display: viewMode === 'list' ? 'block' : 'none' }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: viewMode === 'list' ? 1 : 0,
          scale: viewMode === 'list' ? 1 : 1.1,
          filter: viewMode === 'list' ? 'blur(0px)' : 'blur(10px)'
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          opacity: { duration: 0.6 },
          scale: { duration: 0.8 },
          filter: { duration: 0.5 }
        }}
      >
        <SplineScene
          scene="https://prod.spline.design/3nwdhktYae3S1gh7/scene.splinecode"
          className="pointer-events-auto w-full h-full"
          fallbackText="Loading..."
        />
      </motion.div>

      {/* 网格背景 */}
      {/*<div className="absolute inset-0 z-[2] opacity-50" style={{
        backgroundImage: ` linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px) `,
        backgroundSize: '50px 50px'
      }}></div>*/}
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black from-20% via-transparent via-60% to-transparent to-100%"></div>

      <div className="absolute inset-0 pl-0 pr-0 lg:pr-52 pt-20 pb-10 overflow-hidden z-50">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {viewMode === 'list' ? (
              // 列表视图
              <motion.div key="list" className="relative z-10 flex w-full h-full" initial={{opacity: 0}}
                          animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}>

                {/* 左侧列表 */}
                <div className="w-1/3 min-w-32 flex flex-col justify-center px-12 pl-20 space-y-2 relative">
                  {/* 背景装饰 - EVERCALL 文字 */}
                  <div className="absolute inset-0 top-10 pointer-events-none overflow-hidden"  style={{
                    backgroundImage: ` linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px) `,
                    backgroundSize: '50px 50px'
                  }}>
                    <motion.div
                      className="text-[8rem] font-black font-ak-secondary select-none whitespace-nowrap bg-gradient-to-b from-white/[0.1] from-0% via-white/[0.05] via-3% to-black"
                      style={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      EVERCALL
                    </motion.div>
                  </div>

                  {/* 左侧装饰线条 */}
                  {/*<div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ak-secondary/30 to-transparent"></div>
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ak-secondary/10 to-transparent"></div>*/}

                  {/* 左侧装饰线条 */}
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ak-secondary/30 to-transparent"></div>
                  <div className="absolute right-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ak-secondary/10 to-transparent"></div>

                  {/* 顶部装饰 */}
                  {/*<motion.div
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-ak-secondary/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  ></motion.div>*/}

                  {/* 底部装饰 */}
                  {/*<motion.div
                    className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-ak-secondary/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  ></motion.div>*/}

                  {/* 角落装饰点 */}
                  <motion.div
                    className="absolute top-4 left-8 w-2 h-2 bg-ak-secondary/60 transform rotate-45"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  ></motion.div>
                  <motion.div
                    className="absolute bottom-4 left-8 w-2 h-2 bg-ak-secondary/60 transform rotate-45"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  ></motion.div>

                  {/* 渐变背景 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-ak-secondary/[0.02] via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ak-secondary/[0.01] to-transparent"></div>

                  {worldData.map((item, index) => (
                    <motion.button
                      key={item.id}
                      className="group text-left border-b border-gray-700 hover:border-ak-secondary pb-4 transition-all duration-300 hover:bg-ak-secondary/5 px-4 py-2 relative overflow-hidden"
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      initial={{opacity: 0, x: -50}}
                      animate={{opacity: 1, x: 0}}
                      transition={{duration: 0.6, delay: index * 0.1}}
                      whileHover={{x: 10}}
                    >
                      {/* 序号装饰 */}
                      <div className="absolute left-0 top-2 w-8 h-8 flex items-center justify-center">
                        <span className="text-xs font-mono text-ak-secondary/40 group-hover:text-ak-secondary/80 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* 背景残影文字 */}
                      <div className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none">
                        <span
                          className="text-6xl font-bold text-white/5 group-hover:text-white/10 transition-all duration-300 select-none whitespace-nowrap">
                          {item.title}
                        </span>
                      </div>

                      {/* 悬停时的装饰线 */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-ak-secondary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>

                      <div className="flex items-center justify-between relative z-10 ml-8">
                        <div>
                          <h3
                            className="text-2xl font-bold text-white group-hover:text-ak-secondary transition-colors mb-2">
                            {item.titleCn}
                          </h3>
                          <p className="text-gray-400 text-xs font-mono tracking-wider">
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

                      {/* 底部装饰点 */}
                      <div className="absolute bottom-0 left-8 right-8 flex justify-center">
                        <div className="w-1 h-1 bg-ak-secondary/20 group-hover:bg-ak-secondary/60 transition-colors duration-300"></div>
                      </div>
                    </motion.button>
                  ))}

                  {/* 右侧装饰线条 */}
                  <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-ak-secondary/20 to-transparent"></div>

                  <motion.div
                    className="absolute bottom-16 right-8 w-8 h-8 border border-ak-secondary/30"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  >
                    <div className="absolute inset-1 bg-ak-secondary/5"></div>
                  </motion.div>

                  {/* 数据流装饰 */}
                  <motion.div
                    className="absolute top-1/3 right-2 flex flex-col space-y-1 rotate-180"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-ak-secondary/30"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 2 + i * 0.1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 2
                        }}
                      ></motion.div>
                    ))}
                  </motion.div>

                  {/* 左上角标识 */}
                  <motion.div
                    className="absolute top-8 left-12 text-xs font-mono text-ak-secondary/60 tracking-wider"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    NAVIGATION
                  </motion.div>

                  {/* 左下角状态指示 */}
                  <motion.div
                    className="absolute bottom-8 left-12 flex items-center space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-ak-secondary rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-ak-secondary/60">ACTIVE</span>
                  </motion.div>
                </div>


                {/* 右侧装饰 */}
                <div className="flex-1 flex items-center justify-center relative">
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
                          {selectedWorld.description}
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
        {hoveredItem && viewMode === 'list' && (
          <motion.div
            className="fixed pointer-events-none z-[40]"
            style={{
              left: mousePosition.x - 120,
              top: mousePosition.y - 130,
            }}
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
            transition={{duration: 0.2}}
          >
            <div className="relative w-64 h-64 overflow-hidden">
              <img
                src={hoveredItem.hoverImage}
                alt={hoveredItem.titleCn}
                className="w-full h-full object-cover brightness-50 backdrop-blur-sm opacity-85"
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

    </motion.section>
  )
}
