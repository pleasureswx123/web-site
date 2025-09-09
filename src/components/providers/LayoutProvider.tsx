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
  handlePanStart: (event: any, info: any) => void
  handlePanEndWithLongPress: (event: any, info: PanInfo) => void
  handleDoubleClick: (event: React.MouseEvent) => void
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
  const [lastTapTime, setLastTapTime] = useState(0)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [isLongPressing, setIsLongPressing] = useState(false)

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

  // 增强的手势处理 - 移动端优化
  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    const threshold = 100 // 增加阈值，避免误触
    const velocity = 500
    const edgeThreshold = 60

    // 检查是否在详情页面
    const detailContainer = document.querySelector('.detail-scroll-container')
    if (detailContainer) {
      // 在详情页面时，优先处理滚动，只在边缘允许翻页
      const startX = info.point.x
      const screenWidth = window.innerWidth
      const isLeftEdge = startX < 30
      const isRightEdge = startX > screenWidth - 30

      // 只有在屏幕边缘的水平滑动才触发翻页
      if ((isLeftEdge && info.offset.x > threshold) || (isRightEdge && info.offset.x < -threshold)) {
        if (isLeftEdge) {
          prevSection()
        } else {
          nextSection()
        }
      }
      return // 详情页面时不处理其他手势
    }

    // 获取触摸起始位置
    const startX = info.point.x
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    // 检查当前活跃section的滚动状态
    const activeSection = document.querySelector('.ak-section-content')
    const isAtTop = !activeSection || activeSection.scrollTop <= 10
    const isAtBottom = !activeSection ||
      activeSection.scrollTop >= activeSection.scrollHeight - activeSection.clientHeight - 10

    // 边缘滑动检测（优先级最高）
    const isLeftEdge = startX < edgeThreshold
    const isRightEdge = startX > screenWidth - edgeThreshold

    // 边缘滑动翻页
    if (isLeftEdge && info.offset.x > threshold) {
      event.preventDefault?.()
      prevSection()
      return
    }

    if (isRightEdge && info.offset.x < -threshold) {
      event.preventDefault?.()
      nextSection()
      return
    }

    // 水平滑动翻页（移动端主要方式）
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocity) {
      // 确保不是垂直滚动误触
      if (Math.abs(info.offset.x) > Math.abs(info.offset.y) * 1.5) {
        event.preventDefault?.()
        if (info.offset.x > 0) {
          prevSection()
        } else {
          nextSection()
        }
        return
      }
    }

    // 垂直滑动翻页（只在页面边界时触发）
    if (Math.abs(info.offset.y) > threshold || Math.abs(info.velocity.y) > velocity) {
      // 确保不是水平滑动误触
      if (Math.abs(info.offset.y) > Math.abs(info.offset.x) * 1.5) {
        // 向下滑动且在页面底部 = 下一页
        if (info.offset.y < 0 && isAtBottom) {
          event.preventDefault?.()
          nextSection()
          return
        }
        // 向上滑动且在页面顶部 = 上一页
        if (info.offset.y > 0 && isAtTop) {
          event.preventDefault?.()
          prevSection()
          return
        }
      }
    }
  }, [nextSection, prevSection])

  // 双击翻页处理
  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    const screenWidth = window.innerWidth
    const clickX = event.clientX

    // 双击左半屏 = 上一页，双击右半屏 = 下一页
    if (clickX < screenWidth / 2) {
      prevSection()
    } else {
      nextSection()
    }
  }, [nextSection, prevSection])

  // 长按开始处理
  const handlePanStart = useCallback((event: any, info: any) => {
    const timer = setTimeout(() => {
      setIsLongPressing(true)
    }, 500) // 500ms 后认为是长按

    setLongPressTimer(timer)
  }, [])

  // 长按结束处理
  const handlePanEndWithLongPress = useCallback((event: any, info: PanInfo) => {
    // 清除长按计时器
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }

    // 如果是长按状态，使用更敏感的阈值
    if (isLongPressing) {
      const longPressThreshold = 30 // 长按后的滑动阈值更小

      if (Math.abs(info.offset.x) > longPressThreshold || Math.abs(info.offset.y) > longPressThreshold) {
        if (info.offset.x > 0 || info.offset.y > 0) {
          prevSection()
        } else {
          nextSection()
        }
      }

      setIsLongPressing(false)
      return
    }

    // 否则使用常规手势处理
    handlePanEnd(event, info)
  }, [longPressTimer, isLongPressing, handlePanEnd, nextSection, prevSection])

  // 滚轮翻页处理 - 智能区分页面滚动和翻页
  const handleWheel = useCallback((event: WheelEvent) => {
    // 防止过于频繁的触发
    const now = Date.now()
    if (now - lastTapTime < 500) return // 增加防抖时间

    // 检查是否在页面边界
    const isAtTop = window.scrollY <= 10
    const isAtBottom = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 10

    // 只在页面边界时触发翻页
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      // 向下滚动且在页面底部 = 下一页
      if (event.deltaY > 50 && isAtBottom) {
        event.preventDefault()
        setLastTapTime(now)
        nextSection()
        return
      }
      // 向上滚动且在页面顶部 = 上一页
      if (event.deltaY < -50 && isAtTop) {
        event.preventDefault()
        setLastTapTime(now)
        prevSection()
        return
      }
    }

    // 水平滚动始终触发翻页（移动端较少有水平滚动内容）
    if (Math.abs(event.deltaX) > 30) {
      event.preventDefault()
      setLastTapTime(now)
      if (event.deltaX > 0) {
        nextSection()
      } else {
        prevSection()
      }
    }
  }, [lastTapTime, nextSection, prevSection])

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
    // window.addEventListener('wheel', handleWheel, { passive: false })
    handleHashChange() // 初始化

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('keydown', handleKeyDown)
      // window.removeEventListener('wheel', handleWheel)
    }
  }, [currentSection, sections, prevSection, nextSection])

  const value: LayoutContextType = {
    currentSection,
    sections,
    direction,
    navigateToSection,
    nextSection,
    prevSection,
    handlePanEnd,
    handlePanStart,
    handlePanEndWithLongPress,
    handleDoubleClick
  }

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}
