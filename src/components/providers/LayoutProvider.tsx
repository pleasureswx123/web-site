'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { PanInfo } from 'framer-motion'

interface LayoutContextType {
  currentSection: string
  sections: string[]
  direction: number
  navigateToSection: (section: string) => void
  nextSection: () => void
  prevSection: () => void
  handlePanEnd: (event: any, info: PanInfo) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

interface LayoutProviderProps {
  children: ReactNode
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [currentSection, setCurrentSection] = useState('index')
  const [direction, setDirection] = useState(0)

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

  // 手势处理
  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    const threshold = 60
    const velocity = 300

    // 检查水平滑动
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity) {
      if (info.offset.x > 0) {
        prevSection()
      } else {
        nextSection()
      }
      return
    }

    // 检查垂直滑动
    if (Math.abs(info.offset.y) > threshold || Math.abs(info.velocity.y) > velocity) {
      if (info.offset.y > 0) {
        prevSection()
      } else {
        nextSection()
      }
    }
  }, [nextSection, prevSection])

  useEffect(() => {
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
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        prevSection()
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        nextSection()
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('keydown', handleKeyDown)
    handleHashChange() // 初始化

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSection, sections, prevSection, nextSection])

  const value: LayoutContextType = {
    currentSection,
    sections,
    direction,
    navigateToSection,
    nextSection,
    prevSection,
    handlePanEnd
  }

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}
