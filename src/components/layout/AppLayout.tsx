'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import BackgroundMusic from '@/components/ui/BackgroundMusic'
import { useCurrentDate } from '@/hooks/useCurrentDate'

interface AppLayoutProps {
  children: ReactNode
  currentSection: string
  onNextSection: () => void
  onPrevSection: () => void
  onNavigateToSection: (section: string) => void
  sections: string[]
}

export default function AppLayout({
  children,
  currentSection,
  onNextSection,
  onPrevSection,
  onNavigateToSection,
  sections
}: AppLayoutProps) {
  const currentDate = useCurrentDate()

  // 移动端页面指示器专用手势处理
  const handleMobileIndicatorPanEnd = (event: any, info: any) => {
    const threshold = 40
    const velocity = 200

    if (Math.abs(info.offset.y) > threshold || Math.abs(info.velocity.y) > velocity) {
      if (info.offset.y > 0) {
        onPrevSection()
      } else {
        onNextSection()
      }
      return
    }

    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity) {
      if (info.offset.x > 0) {
        onPrevSection()
      } else {
        onNextSection()
      }
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 背景图片层 */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-80" style={{backgroundImage: "url('/images/backgrounds/bg.jpg')"}}/>

      {/* 装饰性网格背景 */}
      <div className="absolute inset-0 pl-0 pr-0 lg:pr-52 pt-20 pb-10 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 opacity-50">
            <div className="w-full h-full bg-grid-pattern bg-[length:40px_40px]"/>
          </div>
        </div>
      </div>

      {/* 右侧边栏 - 层级低于页头页脚 */}
      <div className="hidden lg:block absolute w-52 top-20 right-0 bottom-10 z-[80]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 blur-sm"
             style={{backgroundImage: "url('/images/roles/yoyo.jpg')"}}>
          <div
            className="absolute inset-0 bg-gradient-to-l from-slate-900/30 via-transparent to-slate-900/50 backdrop-blur-sm"/>
          <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/10"/>
        </div>

        <div className="flex flex-col items-end text-right absolute right-6 top-1/2 -translate-y-1/2">
          {/* 大号数字 */}
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

          {/* 实时日期 */}
          <motion.div
            className="relative z-[4] mt-[-20px]"
            key={`fraction-${currentSection}`}
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.4, delay: 0.1}}
          >
            <span className="font-ak-title text-lg font-bold text-white/95 tracking-[0.15em] uppercase relative before:absolute before:left-[-10px] before:top-1/2 before:w-[30px] before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-ak-primary before:to-transparent before:-translate-y-1/2">
              {currentDate || '2025/08/01'}
            </span>
          </motion.div>

          {/* 小字标识 */}
          <motion.div
            className="relative z-[4]"
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
              {currentSection === 'more' && 'MORE'}
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

        {/* 右侧边栏左边框装饰线 */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none shadow-sm"></div>
      </div>

      {/* 移动端页面指示器 - 层级低于页头页脚 */}
      <motion.div
        className="lg:hidden fixed top-1/2 right-0 -translate-y-1/2 z-[80] flex flex-col items-center"
        onPanEnd={handleMobileIndicatorPanEnd}
        style={{ touchAction: 'none' }}
      >
        <div className="flex flex-col items-center gap-2 py-8 px-6">
          {sections.map((section, index) => {
            const isActive = sections.indexOf(currentSection) === index
            return (
              <motion.button
                key={section}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-ak-primary scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => onNavigateToSection(section)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            )
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white/20 text-xs font-mono transform -rotate-90 whitespace-nowrap">
            SWIPE
          </div>
        </div>
      </motion.div>

      {/* 滚动指示器 - 层级低于页头页脚和侧边栏 */}
      <div className="hidden lg:flex fixed bottom-4 right-4 lg:bottom-10 lg:right-3 z-[70] flex-col items-center gap-4">
        <div
          className="flex items-center gap-4 px-6 py-3 bg-slate-900/80 backdrop-blur-md border border-ak-primary/20 rounded-full shadow-lg shadow-ak-primary/10">
          <div className="w-8 h-8 text-ak-primary">
            <svg viewBox="0 0 459.1 374.4" className="w-full h-full fill-current">
              <use xlinkHref="#svg_def-logo_rhodes_island"></use>
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-ak-secondary text-sm text-white/80 font-medium tracking-wider">
              SCROLL
            </span>
            <motion.button
              className="w-6 h-6 text-ak-primary hover:text-ak-primary/80 transition-colors"
              whileHover={{scale: 1.1, x: 2}}
              whileTap={{scale: 0.9}}
              onClick={onNextSection}
            >
              <svg viewBox="0 0 7 15" className="w-full h-full fill-current rotate-90">
                <use xlinkHref="#svg_def-icon_arrow"></use>
              </svg>
            </motion.button>
          </div>
        </div>

        <motion.button
          className="w-10 h-10 bg-slate-900/80 backdrop-blur-md border border-ak-primary/20 rounded-full flex items-center justify-center shadow-lg shadow-ak-primary/10 hover:bg-slate-800/80 transition-colors"
          whileHover={{scale: 1.1, y: -2}}
          whileTap={{scale: 0.9}}
          onClick={onPrevSection}
        >
          <svg viewBox="0 0 7 15" className="w-4 h-4 fill-ak-primary -rotate-90">
            <use xlinkHref="#svg_def-icon_arrow"></use>
          </svg>
        </motion.button>
      </div>

      {/* 顶部导航 - 最高层级 */}
      <div className="fixed top-0 left-0 right-0 z-[100] shadow-lg shadow-ak-primary/5">
        <OriginalNavigation currentSection={currentSection}/>
        {/* 页头下边框装饰线 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none shadow-sm"></div>
      </div>

      {/* 页脚 - 最高层级 */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] h-10 w-full opacity-60">
        {/* 页脚上边框装饰线 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none shadow-sm"></div>
        <motion.div
          className="flex items-center justify-center w-full h-full px-4"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.6}}
        >
          <p className="text-ak-text-secondary text-xs sm:text-sm text-center">
            <span className="block sm:inline">Copyright ©2025 - 2026 北京心流元素科技有限公司</span>
            <span className="hidden sm:inline"> | </span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ak-text-secondary hover:text-ak-primary transition-colors duration-200 block sm:inline mt-1 sm:mt-0 sm:ml-1"
            >
              京ICP备2025138391号
            </a>
          </p>
        </motion.div>
      </div>

      {/* 背景音乐控制器 */}
      <div className="invisible">
        <BackgroundMusic/>
      </div>

      {/* 主要内容区域 */}
      {children}
    </div>
  )
}
