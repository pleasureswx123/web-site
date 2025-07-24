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
import Footer from '@/components/layout/Footer'
import BackgroundMusic from '@/components/ui/BackgroundMusic'

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
        return <IndexSection />
    }
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="relative min-h-screen bg-ak-dark overflow-hidden">
      {/* 背景动画 */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ak-dark via-ak-gray to-ak-dark" />
        <div className="absolute inset-0 opacity-20">
          {/* 粒子效果背景 */}
          <div className="particles-container">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-ak-primary rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 导航栏 */}
      <OriginalNavigation currentSection={currentSection} />

      {/* 主要内容区域 */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 页脚 */}
      <Footer />



      {/* 背景音乐控制器 */}
      <BackgroundMusic />
    </main>
  )
}
