'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import LoadingScreen from '@/components/layout/LoadingScreen'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import ImprovedIndexSection from '@/components/sections/ImprovedIndexSection'
import ImprovedInformationSection from '@/components/sections/ImprovedInformationSection'
import OperatorSection from '@/components/sections/OperatorSection'
import WorldSection from '@/components/sections/WorldSection'
import MediaSection from '@/components/sections/MediaSection'
import MoreSection from '@/components/sections/MoreSection'
import IndexSection from '@/components/sections/IndexSection'
import Footer from '@/components/layout/Footer'
import BackgroundMusic from '@/components/ui/BackgroundMusic'
import MusicInteractionPrompt from '@/components/ui/MusicInteractionPrompt'
import ScrollIndicator from '@/components/ui/ScrollIndicator'
import CanvasBackground from '@/components/ui/CanvasBackground'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('index')
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  // 页面顺序定义
  const sections = ['index', 'information', 'operator', 'world', 'media', 'more']

  // 页面切换函数
  const navigateToSection = useCallback((newSection: string) => {
    const currentIndex = sections.indexOf(currentSection)
    const newIndex = sections.indexOf(newSection)

    if (currentIndex !== -1 && newIndex !== -1) {
      setDirection(newIndex > currentIndex ? 1 : -1)
    }

    setCurrentSection(newSection)
    window.location.hash = newSection
  }, [currentSection, sections])

  // 下一页
  const nextSection = useCallback(() => {
    const currentIndex = sections.indexOf(currentSection)
    if (currentIndex < sections.length - 1) {
      navigateToSection(sections[currentIndex + 1])
    }
  }, [currentSection, sections, navigateToSection])

  // 上一页
  const prevSection = useCallback(() => {
    const currentIndex = sections.indexOf(currentSection)
    if (currentIndex > 0) {
      navigateToSection(sections[currentIndex - 1])
    }
  }, [currentSection, sections, navigateToSection])

  // 手势处理 - 优化覆盖滑动效果
  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    const threshold = 80 // 降低滑动阈值，更敏感
    const velocity = 400 // 降低速度阈值

    // 检查滑动距离或速度是否足够
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity) {
      if (info.offset.x > 0) {
        // 向右滑动，显示上一页（向左切换）
        prevSection()
      } else {
        // 向左滑动，显示下一页（向右切换）
        nextSection()
      }
    }
  }, [nextSection, prevSection])

  useEffect(() => {
    // 模拟加载时间
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // 监听hash变化
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'index'
      const currentIndex = sections.indexOf(currentSection)
      const newIndex = sections.indexOf(hash)

      if (currentIndex !== -1 && newIndex !== -1) {
        setDirection(newIndex > currentIndex ? 1 : -1)
      }

      setCurrentSection(hash)
    }

    // 键盘导航支持
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        prevSection()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextSection()
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('keydown', handleKeyDown)
    handleHashChange() // 初始化

    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const renderSection = (section?: string) => {
    const targetSection = section || currentSection
    switch (targetSection) {
      case 'index':
        return <ImprovedIndexSection />
      case 'information':
        return <ImprovedInformationSection />
      case 'operator':
        return <OperatorSection />
      case 'world':
        return <WorldSection />
      case 'media':
        return <MediaSection />
      case 'more':
        return <MoreSection />
      default:
        return <ImprovedIndexSection />
    }
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    // layout内容容器 - 对应原网站的 _7c7241c0 类
    // background-image url(https://web.hycdn.cn/arknights/official/_next/static/media/bg.c03d00a6.jpg)
    <div className="_7c7241c0">
      <div className="_dd208b33">

        {/* 主要内容：导航所一一对应的主要内容 - 对应 _d3fe6857 */}
        <motion.div
          className="_d3fe6857"
          onPanEnd={handlePanEnd}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
        >
          {sections.map((section, index) => {
            const currentIndex = sections.indexOf(currentSection)
            const sectionIndex = index

            // 计算每个页面的位置
            let xPosition = '100%' // 默认在右侧（未显示）
            let zIndex = 1
            let opacity = 0

            if (sectionIndex === currentIndex) {
              // 当前页面
              xPosition = '0%'
              zIndex = 10
              opacity = 1
            } else if (sectionIndex < currentIndex) {
              // 左侧页面（已经过去的页面）
              xPosition = '-100%'
              zIndex = 1
              opacity = 0
            } else {
              // 右侧页面（即将到来的页面）
              xPosition = '100%'
              zIndex = 1
              opacity = 0
            }

            return (
              <motion.div
                key={section}
                className="_c629adb0"
                initial={false}
                animate={{
                  left: sectionIndex === currentIndex ? '0%' : 'auto',
                  width: sectionIndex === currentIndex ? '100%' : '0%',
                  zIndex: zIndex,
                  opacity: opacity
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  left: { duration: 0.8 },
                  width: { duration: 0.8 },
                  opacity: { duration: 0.4, delay: sectionIndex === currentIndex ? 0.2 : 0 }
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <div
                  className={`ak-section-content ak-section-${section}`}
                  style={{
                    left: sectionIndex === currentIndex ? '0px' : 'auto'
                  }}
                >
                  {renderSection(section)}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* LoadingScreen组件 - 对应 _369c736f _8f5b35e5 */}
        {/* 已在条件渲染中处理 */}

        {/* 背景电路板效果 - 对应 _917c2cd7 _616534e8 */}
        <div className="_917c2cd7 _616534e8">
          <CanvasBackground type="circuit" className="_fb1ee57e" />
        </div>

        {/* 背景粒子效果 - 对应 webgl canvas */}
        <div className="webgl-container">
          <CanvasBackground type="particles" className="_c25881b2" id="webgl" />
        </div>

        {/* 布局直观分隔线条 - 对应 _60828c90 _1ae85f83 */}
        <div className="_60828c90 _1ae85f83">
          <div className="_b8e46dd4 _cf56609f _0cf06031"></div>
          <div className="_b8e46dd4 _c9ef635e _5f620bec"></div>
          <div className="_b8e46dd4 _405e32e2 _5f620bec"></div>
        </div>

        {/* 切换主要内容时的指示箭头 - 对应 _10351ad1 _6a4a1a75 */}
        <div className="_10351ad1 _6a4a1a75">
          <div className="_c5888fbe">
            <div className="_fbe74f1b">
              <svg viewBox="0 0 459.1 374.4">
                <use xlinkHref="#svg_def-logo_rhodes_island"></use>
              </svg>
            </div>
            <div className="_1381d70c">
              <div className="_5cbd5f8c">SCROLL</div>
              <motion.div
                className="_28a18e28"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSection}
                style={{ cursor: 'pointer' }}
              >
                <svg viewBox="0 0 7 15" style={{ transform: 'rotate(90deg)' }}>
                  <use xlinkHref="#svg_def-icon_arrow"></use>
                </svg>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="_d710e1d3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSection}
            style={{ cursor: 'pointer' }}
          >
            <div className="_28a18e28">
              <svg viewBox="0 0 7 15" style={{ transform: 'rotate(-90deg)' }}>
                <use xlinkHref="#svg_def-icon_arrow"></use>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* 全新设计的右侧边栏 - 使用 Tailwind CSS */}
        <div className="fixed top-1/2 right-12 -translate-y-1/2 z-[100] w-[200px] h-[400px] flex flex-col justify-between pointer-events-none">
          {/* 主要内容区域 */}
          <div className="flex flex-col items-end text-right relative">
            {/* 大号数字 - 蓝色，有遮挡效果 */}
            <motion.div
              className="relative mb-[-20px] z-[3]"
              key={`number-${currentSection}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="font-ak-title text-[8rem] font-black text-ak-primary leading-[0.8] block relative z-[2] drop-shadow-[0_0_30px_rgba(0,153,255,0.5)] animate-pulse">
                {currentSection === 'index' && '00'}
                {currentSection === 'information' && '01'}
                {currentSection === 'operator' && '02'}
                {currentSection === 'world' && '03'}
                {currentSection === 'media' && '04'}
                {currentSection === 'more' && '05'}
              </span>
              <div className="absolute bottom-[-10px] left-0 right-0 h-[40px] bg-gradient-to-t from-ak-dark/90 via-ak-dark/70 to-transparent z-[3] pointer-events-none"></div>
            </motion.div>

            {/* 分数线 - 特殊字体 */}
            <motion.div
              className="mb-2 relative z-[4]"
              key={`fraction-${currentSection}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="font-ak-title text-lg font-bold text-white/95 tracking-[0.15em] uppercase relative before:absolute before:left-[-10px] before:top-1/2 before:w-[30px] before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-ak-primary before:to-transparent before:-translate-y-1/2">
                // {currentSection === 'index' && '00'}
                {currentSection === 'information' && '01'}
                {currentSection === 'operator' && '02'}
                {currentSection === 'world' && '03'}
                {currentSection === 'media' && '04'}
                {currentSection === 'more' && '05'} / 05
              </span>
            </motion.div>

            {/* 小字标识 */}
            <motion.div
              className="mb-8 relative"
              key={`label-${currentSection}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span className="font-ak-secondary text-[0.65rem] font-medium text-white/40 tracking-[0.4em] uppercase after:absolute after:right-[-15px] after:top-1/2 after:w-2 after:h-2 after:bg-ak-primary/30 after:rounded-full after:-translate-y-1/2">
                GVERCALL
              </span>
            </motion.div>

            {/* 主标题区域 */}
            <motion.div
              className="flex flex-col items-end gap-2"
              key={`title-${currentSection}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {/*<div className="font-ak-secondary text-[0.9rem] font-medium text-white/80 tracking-[0.12em] uppercase"></div>*/}
              <div className="font-ak-title text-[1.4rem] font-bold text-ak-primary tracking-[0.1em] uppercase relative before:absolute before:left-[-20px] before:top-0 before:bottom-0 before:w-[3px] before:bg-gradient-to-b before:from-ak-primary before:to-transparent">
                {currentSection === 'index' && 'INDEX'}
                {currentSection === 'information' && 'INFORMATION'}
                {currentSection === 'operator' && 'OPERATOR'}
                {currentSection === 'world' && 'WORLD'}
                {currentSection === 'media' && 'ABOUT TERRA'}
                {currentSection === 'more' && 'MORE CONTENT'}
              </div>
            </motion.div>
          </div>

          {/* 右下角标识 */}
          <motion.div
            className="absolute bottom-[-2rem] right-[-1rem] font-ak-title text-[1.2rem] font-bold text-white/60 tracking-[0.2em] uppercase -rotate-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            GVERCALL
          </motion.div>

          {/* 装饰性元素 */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[1]">
            <div className="absolute top-[20%] right-[-10px] w-[2px] h-[60px] bg-gradient-to-b from-transparent via-ak-primary to-transparent opacity-60 animate-pulse"></div>
            <div className="absolute top-[60%] right-[-25px] w-[1px] h-[40px] bg-gradient-to-b from-ak-primary to-transparent opacity-40 animate-pulse delay-[2s]"></div>
            <div className="absolute top-[40%] right-[-30px] w-1 h-1 bg-ak-primary rounded-full opacity-70 shadow-[0_0_10px_rgba(0,153,255,0.5)] animate-pulse delay-[1s]"></div>
          </div>
        </div>

        {/* OriginalNavigation组件：顶部导航内容组件 - 对应 _6066ead1 */}
        <div className="_6066ead1">
          <OriginalNavigation currentSection={currentSection} />
        </div>

        {/* Footer */}
        <Footer />
      </div>

      <div className="invisible">
        {/* 背景音乐控制器 */}
        <BackgroundMusic />

        {/* 音乐交互提示 */}
        {/*<MusicInteractionPrompt />*/}
      </div>
    </div>
  )
}
