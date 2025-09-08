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
  const { currentSection, sections, handlePanEnd, navigateToSection, nextSection, prevSection } = useLayout()

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
      {/* 页面内容容器 - 支持手势滑动 */}
      <motion.div
        className="relative w-full h-screen"
        onPanEnd={handlePanEnd}
        style={{ touchAction: 'none' }}
      >
        {/* 页面内容区域 - 层级低于所有布局元素 */}
        {sections.map((section, index) => {
          const currentIndex = sections.indexOf(currentSection)
          const sectionIndex = index
          const isActive = sectionIndex === currentIndex
          return (
            <motion.div
              key={section}
              className={`absolute inset-0 ${isActive ? 'z-[20]' : 'z-[10]'}`}
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
      </motion.div>
    </AppLayout>
  )
}
