'use client'

import { Suspense, lazy, memo, useCallback, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

// 懒加载Spline组件，只在需要时加载
const Spline = lazy(() =>
  import('@splinetool/react-spline').then(module => ({
    default: module.default
  }))
)

interface SplineSceneProps {
  scene: string
  className?: string
  fallbackText?: string
  threshold?: number
  triggerOnce?: boolean
}

// 使用memo优化组件重渲染
export const SplineScene = memo(function SplineScene({
  scene,
  className = "w-full h-full",
  fallbackText = "Loading 3D Scene...",
  threshold = 0.1,
  triggerOnce = true
}: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // 使用Intersection Observer优化性能，只在可见时加载
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin: '50px'
  })

  // 当组件进入视口时开始加载
  useEffect(() => {
    if (inView && !shouldLoad) {
      setShouldLoad(true)
    }
  }, [inView, shouldLoad])

  // 处理加载完成
  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    setHasError(false)
  }, [])

  // 处理加载错误
  const handleError = useCallback((error: any) => {
    console.warn('Spline scene failed to load:', error)
    setHasError(true)
    setIsLoaded(false)
  }, [])

  // 渲染加载状态
  const renderFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ak-dark/50 to-ak-dark/80 backdrop-blur-sm">
      <div className="text-center space-y-4">
        <div className="text-ak-secondary text-sm font-mono tracking-wider animate-pulse">
          {hasError ? 'Failed to load 3D scene' : fallbackText}
        </div>
        {!hasError && (
          <div className="w-8 h-8 border-2 border-ak-primary border-t-transparent rounded-full animate-spin mx-auto" />
        )}
        {hasError && (
          <div className="text-xs text-ak-secondary/60 font-mono">
            Please check your connection
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? (
        <Suspense fallback={renderFallback()}>
          <Spline
            scene={scene}
            className={className}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
          {!isLoaded && renderFallback()}
        </Suspense>
      ) : (
        renderFallback()
      )}
    </div>
  )
})
