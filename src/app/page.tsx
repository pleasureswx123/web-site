'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LoadingScreen from '@/components/layout/LoadingScreen'
import AppLayout from '@/components/layout/AppLayout'
import ImprovedIndexSection from '@/components/sections/ImprovedIndexSection'
import ImprovedInformationSection from '@/components/sections/ImprovedInformationSection'
import OperatorSection from '@/components/sections/OperatorSection'
import WorldSection from '@/components/sections/WorldSection'
import MediaSection from '@/components/sections/MediaSection'
import MoreSection from '@/components/sections/MoreSection'
import { useLayout } from '@/components/providers/LayoutProvider'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const {
    currentSection,
    sections,
    handlePanEnd,
    handlePanStart,
    handlePanEndWithLongPress,
    handleDoubleClick,
    navigateToSection,
    nextSection,
    prevSection
  } = useLayout()

  // 加载完成处理
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
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
    <AppLayout
      currentSection={currentSection}
      onNextSection={nextSection}
      onPrevSection={prevSection}
      onNavigateToSection={navigateToSection}
      sections={sections}
    >
      {/* 页面内容容器 - 支持多种翻页手势 */}
      <motion.div
        className="gesture-container relative w-full h-screen overflow-hidden"
        onPanStart={handlePanStart}
        onPanEnd={handlePanEndWithLongPress}
        onDoubleClick={handleDoubleClick}
        style={{
          touchAction: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          overscrollBehavior: 'none'
        }}
      >
        {/* 页面内容区域 - 层级低于所有布局元素 */}
        {sections.map((section, index) => {
          const currentIndex = sections.indexOf(currentSection)
          const sectionIndex = index
          const isActive = sectionIndex === currentIndex
          return (
            <motion.div
              key={section}
              className={`absolute inset-0 w-full h-full overflow-hidden ${isActive ? 'z-[20]' : 'z-[10]'}`}
              initial={false}
              animate={{
                x: isActive ? '0%' : sectionIndex < currentIndex ? '-100%' : '100%',
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.95,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                opacity: {duration: 0.4, delay: isActive ? 0.2 : 0}
              }}
            >
              <div
                className={`
                  ak-section-content relative w-full h-full
                  shadow-2xl shadow-ak-primary/5
                  overflow-y-auto overflow-x-hidden
                  md:scrollbar-thin md:scrollbar-track-transparent md:scrollbar-thumb-ak-primary/30
                  scrollbar-none
                  transition-all duration-500 ease-in-out
                  ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}>
                {renderSection(section)}
              </div>
            </motion.div>
          )
        })}

        {/* 边缘手势检测区域 - 移动端专用 */}
        {/*<div
          className="edge-gesture-left md:hidden"
          onTouchStart={(e) => handlePanStart(e, { point: { x: 0, y: 0 } })}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0]
            const deltaX = touch.clientX
            if (deltaX > 50) {
              handlePanEndWithLongPress(e, {
                offset: { x: deltaX, y: 0 },
                velocity: { x: 0, y: 0 },
                point: { x: 0, y: 0 }
              })
            }
          }}
        />
        <div
          className="edge-gesture-right md:hidden"
          onTouchStart={(e) => handlePanStart(e, { point: { x: window.innerWidth, y: 0 } })}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0]
            const deltaX = window.innerWidth - touch.clientX
            if (deltaX > 50) {
              handlePanEndWithLongPress(e, {
                offset: { x: -deltaX, y: 0 },
                velocity: { x: 0, y: 0 },
                point: { x: window.innerWidth, y: 0 }
              })
            }
          }}
        />*/}
      </motion.div>
    </AppLayout>
  )
}
