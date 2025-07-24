'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import ScrollIndicator from '@/components/ui/ScrollIndicator'
import CanvasBackground from '@/components/ui/CanvasBackground'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('index')

  useEffect(() => {
    // 模拟加载时间
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // 监听hash变化
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'index'
      setCurrentSection(hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // 初始化

    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const renderSection = () => {
    switch (currentSection) {
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
        <div className="_d3fe6857">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="ak-section-wrapper"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>

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
              <div className="_28a18e28">
                <svg viewBox="0 0 7 15" style={{ transform: 'rotate(90deg)' }}>
                  <use xlinkHref="#svg_def-icon_arrow"></use>
                </svg>
              </div>
            </div>
          </div>
          <div className="_d710e1d3">
            <div className="_28a18e28">
              <svg viewBox="0 0 7 15" style={{ transform: 'rotate(-90deg)' }}>
                <use xlinkHref="#svg_def-icon_arrow"></use>
              </svg>
            </div>
          </div>
        </div>

        {/* 右侧边占位内容 - 对应 _ae86e3f9 */}
        <div className="_ae86e3f9" data-style="">
          <motion.div
            className="_a6fb5251"
            style={{ transform: 'translateY(0rem)', opacity: 1 }}
            key={`number-${currentSection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentSection === 'index' && '00'}
            {currentSection === 'information' && '01'}
            {currentSection === 'operator' && '02'}
            {currentSection === 'world' && '03'}
            {currentSection === 'media' && '04'}
            {currentSection === 'more' && '05'}
          </motion.div>
          <motion.div
            className="_0df54c95"
            style={{ transform: 'translateY(0rem)', opacity: 1 }}
            key={`fraction-${currentSection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            // {currentSection === 'index' && '00'}
            {currentSection === 'information' && '01'}
            {currentSection === 'operator' && '02'}
            {currentSection === 'world' && '03'}
            {currentSection === 'media' && '04'}
            {currentSection === 'more' && '05'} / 05
          </motion.div>
          <motion.div
            className="_a229ec44"
            style={{ transform: 'translateY(0rem)', opacity: 1 }}
            key={`title-${currentSection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            ARKNIGHTS
          </motion.div>
          <motion.div
            className="_f46541ee"
            style={{ transform: 'translateY(0rem)', opacity: 1 }}
            key={`subtitle-${currentSection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {currentSection === 'index' && 'INDEX'}
            {currentSection === 'information' && 'INFORMATION'}
            {currentSection === 'operator' && 'OPERATOR'}
            {currentSection === 'world' && 'WORLD'}
            {currentSection === 'media' && 'ABOUT TERRA'}
            {currentSection === 'more' && 'MORE CONTENT'}
          </motion.div>
        </div>

        {/* OriginalNavigation组件：顶部导航内容组件 - 对应 _6066ead1 */}
        <div className="_6066ead1">
          <OriginalNavigation currentSection={currentSection} />
        </div>

        {/* 点击导航上icon_social时弹出的内容层 - 对应 _5a5107d2 _7f5ebf8d */}
        <div className="_5a5107d2 _7f5ebf8d"></div>

        {/* 点击导航上icon_user时弹出的内容层 - 对应 _6975b23b _7f5ebf8d */}
        <div className="_6975b23b _7f5ebf8d"></div>

        {/* Footer */}
        <Footer />
      </div>

      {/* 背景音乐控制器 */}
      <BackgroundMusic />
    </div>
  )
}
