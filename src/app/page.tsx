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
import BackgroundMusic from '@/components/ui/BackgroundMusic'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('index')
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  // 页面顺序定义
  const sections = ['index', 'events', 'characters', 'preset', 'world', 'more']

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
      case 'events':
        return <ImprovedInformationSection />
      case 'characters':
        return <OperatorSection />
      case 'preset':
        return <WorldSection />
      case 'world':
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
    // 全新设计的主容器 - 使用 Tailwind CSS
    <div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 背景图片层 */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-80" style={{backgroundImage: "url('/images/backgrounds/bg.jpg')"}}/>
      {/* 装饰性网格背景 */}
      <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 opacity-50">
            <div className="w-full h-full bg-grid-pattern bg-[length:40px_40px]"/>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50 pointer-events-none">
        <div className="relative w-full h-full">
          {/* 顶部装饰线 */}
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"/>
          {/* 右侧装饰线 */}
          <div
            className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"/>
          {/* 底部装饰线 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"/>
        </div>
      </div>
      <div className="absolute inset-0">
        {sections.map((section, index) => {
          const currentIndex = sections.indexOf(currentSection)
          const sectionIndex = index
          const isActive = sectionIndex === currentIndex
          return (
            <motion.div
              key={section}
              className={`absolute inset-0 overflow-hidden ${isActive ? 'z-20' : 'z-10'}`}
              initial={false}
              animate={{
                x: isActive ? '0%' : sectionIndex < currentIndex ? '-100%' : '100%',
                opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                opacity: {duration: 0.4, delay: isActive ? 0.2 : 0}
              }}>
              <div className={`
                  relative w-full h-full
                  shadow-2xl shadow-ak-primary/5
                  overflow-y-auto overflow-x-hidden
                  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-ak-primary/30
                  ${isActive ? 'animate-fade-in' : ''}
                `}>
                {renderSection(section)}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 全新设计的右侧边栏 - 使用 Tailwind CSS */}
      <div className="absolute w-52 top-20 right-0 bottom-10 z-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 blur-sm"
             style={{backgroundImage: "url('/images/roles/yoyo.jpg')"}}>
          {/* 添加渐变遮罩以增强视觉效果 */}
          <div
            className="absolute inset-0 bg-gradient-to-l from-slate-900/30 via-transparent to-slate-900/50 backdrop-blur-sm"/>
          {/* 添加额外的模糊层 */}
          <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/10"/>
        </div>

        <div className="flex flex-col items-end text-right absolute right-6 top-1/2 -translate-y-1/2">
          {/* 大号数字 - 蓝色，有遮挡效果 */}
          <motion.div
            className="relative mb-[-20px] z-[3]"
            key={`number-${currentSection}`}
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, ease: "easeOut"}}
          >
              <span
                className="font-ak-title text-[8rem] font-black text-ak-primary leading-[0.8] block relative z-[2] drop-shadow-[0_0_30px_rgba(0,153,255,0.5)] animate-pulse">
                {currentSection === 'index' && '00'}
                {currentSection === 'events' && '01'}
                {currentSection === 'characters' && '02'}
                {currentSection === 'preset' && '03'}
                {currentSection === 'world' && '04'}
                {currentSection === 'more' && '05'}
              </span>
            <div
              className="absolute bottom-[-10px] left-0 right-0 h-[40px] bg-gradient-to-t from-ak-dark/90 via-ak-dark/70 to-transparent z-[3] pointer-events-none"></div>
          </motion.div>

          {/* 分数线 - 特殊字体 */}
          <motion.div
            className="relative z-[4] mt-[-20px]"
            key={`fraction-${currentSection}`}
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.4, delay: 0.1}}
          >
              <span
                className="font-ak-title text-lg font-bold text-white/95 tracking-[0.15em] uppercase relative before:absolute before:left-[-10px] before:top-1/2 before:w-[30px] before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-ak-primary before:to-transparent before:-translate-y-1/2">
                // {currentSection === 'index' && '00'}
                {currentSection === 'events' && '01'}
                {currentSection === 'characters' && '02'}
                {currentSection === 'preset' && '03'}
                {currentSection === 'world' && '04'}
                {currentSection === 'more' && '05'} / 05
              </span>
          </motion.div>

          {/* 小字标识 */}
          <motion.div
            className="relative  z-[4]"
            key={`label-${currentSection}`}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3, delay: 0.2}}
          >
              <span
                className="font-ak-secondary text-[0.65rem] font-medium text-white/80 tracking-[0.4em] uppercase after:absolute after:right-[-15px] after:top-1/2 after:w-2 after:h-2 after:bg-ak-primary/30 after:rounded-full after:-translate-y-1/2">
                EVERCALL
              </span>
          </motion.div>

          {/* 主标题区域 */}
          <motion.div
            className="flex flex-col items-end gap-2"
            key={`title-${currentSection}`}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: 0.3}}
          >
            <div
              className="font-ak-title text-[1.2rem] font-bold text-ak-primary tracking-[0.1em] uppercase relative before:absolute before:left-[-20px] before:top-0 before:bottom-0 before:w-[3px] before:bg-gradient-to-b before:from-ak-primary before:to-transparent">
              {currentSection === 'index' && 'INDEX'}
              {currentSection === 'events' && 'EVENTS'}
              {currentSection === 'characters' && 'CHARACTERS'}
              {currentSection === 'preset' && 'PRESET'}
              {currentSection === 'world' && 'WORLD'}
              {currentSection === 'more' && 'MORE CONTENT'}
            </div>
          </motion.div>

          {/* 装饰性元素 */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[1]">
            <div
              className="absolute top-[20%] right-[-10px] w-[2px] h-[60px] bg-gradient-to-b from-transparent via-ak-primary to-transparent opacity-60 animate-pulse"></div>
            <div
              className="absolute top-[60%] right-[-25px] w-[1px] h-[40px] bg-gradient-to-b from-ak-primary to-transparent opacity-40 animate-pulse delay-1000"></div>
            <div
              className="absolute top-[40%] right-[-30px] w-1 h-1 bg-ak-primary rounded-full opacity-70 shadow-[0_0_10px_rgba(0,153,255,0.5)] animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
      {/* 全新设计的滚动指示器 */}
      <div className="fixed bottom-10 right-3 z-[50] flex flex-col items-center gap-4">
        {/* 主要滚动区域 */}
        <div
          className="flex items-center gap-4 px-6 py-3 bg-slate-900/80 backdrop-blur-md border border-ak-primary/20 rounded-full shadow-lg shadow-ak-primary/10">
          {/* 罗德岛Logo */}
          <div className="w-8 h-8 text-ak-primary">
            <svg viewBox="0 0 459.1 374.4" className="w-full h-full fill-current">
              <use xlinkHref="#svg_def-logo_rhodes_island"></use>
            </svg>
          </div>

          {/* 滚动文本和箭头 */}
          <div className="flex items-center gap-3">
              <span className="font-ak-secondary text-sm text-white/80 font-medium tracking-wider">
                SCROLL
              </span>
            <motion.button
              className="w-6 h-6 text-ak-primary hover:text-ak-primary/80 transition-colors"
              whileHover={{scale: 1.1, x: 2}}
              whileTap={{scale: 0.9}}
              onClick={nextSection}
            >
              <svg viewBox="0 0 7 15" className="w-full h-full fill-current rotate-90">
                <use xlinkHref="#svg_def-icon_arrow"></use>
              </svg>
            </motion.button>
          </div>
        </div>

        {/* 上一页按钮 */}
        <motion.button
          className="w-10 h-10 bg-slate-900/80 backdrop-blur-md border border-ak-primary/20 rounded-full flex items-center justify-center shadow-lg shadow-ak-primary/10 hover:bg-slate-800/80 transition-colors"
          whileHover={{scale: 1.1, y: -2}}
          whileTap={{scale: 0.9}}
          onClick={prevSection}
        >
          <svg viewBox="0 0 7 15" className="w-4 h-4 fill-ak-primary -rotate-90">
            <use xlinkHref="#svg_def-icon_arrow"></use>
          </svg>
        </motion.button>
      </div>

      {/* 全新设计的顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-[100] shadow-lg shadow-ak-primary/5">
        <OriginalNavigation currentSection={currentSection}/>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[90] h-10 w-full  opacity-60">
        <motion.div
          className="flex items-center justify-center w-full h-full"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.6}}
        >
          <p className="text-ak-text-secondary text-sm">
            Copyright ©2024 - 2025 北京心流元素科技有限公司
          </p>
        </motion.div>
      </div>

      {/* Footer - 调整位置 */}
      {/*<div className="relative z-[90]">*/}
      {/*  <Footer />*/}
      {/*</div>*/}

      <div className="invisible">
        {/* 背景音乐控制器 */}
        <BackgroundMusic/>

        {/* 音乐交互提示 */}
        {/*<MusicInteractionPrompt />*/}
      </div>
    </div>
  )
}
