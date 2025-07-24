'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('LOADING')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 3 + 1
      })
    }, 50)

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const texts = ['LOADING', 'INITIALIZING', 'CONNECTING', 'READY']
        const currentIndex = texts.indexOf(prev)
        return texts[(currentIndex + 1) % texts.length]
      })
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    // LoadingScreen组件 - 对应原网站的 _369c736f _8f5b35e5
    <motion.div
      className="ak-loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 主Logo区域 - 对应 _b4aa8560 */}
      <motion.div
        className="ak-loading-logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 使用SVG Logo - 对应 svg viewBox="0 0 254 119" */}
        <div className="ak-logo-svg">
          <h1 className="text-6xl font-bold text-ak-primary mb-2 glitch font-ak-title" data-text="ARKNIGHTS">
            ARKNIGHTS
          </h1>
        </div>
      </motion.div>

      {/* 底部加载区域 - 对应 _fa9747ca */}
      <div className="ak-loading-bottom">
        {/* 版权信息 - 对应 _4f8ab24e */}
        <motion.div
          className="ak-copyright-mini"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="text-ak-text-secondary text-sm font-ak-secondary">
            RHODES ISLAND
          </div>
          <div className="text-ak-text-secondary text-xs font-ak-secondary mt-1">
            HTTPS://AK.HYPERGRYPH.COM/
          </div>
        </motion.div>

        {/* 加载进度区域 - 对应 _ad713ab8 */}
        <motion.div
          className="ak-loading-progress"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {/* 进度条容器 - 对应 _6e475a05 */}
          <div className="ak-progress-container">
            <div className="ak-progress-track"></div>
            <motion.div
              className="ak-progress-bar"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* 加载文本区域 - 对应 _456f799b */}
          <div className="ak-loading-text">
            {/* 加载状态文本 - 对应 _65701373 */}
            <div className="ak-loading-status">
              {/* 双箭头图标 - 对应 svg viewBox="0 0 13 11" */}
              <span className="ak-double-arrow">»</span>
              <span>LOADING&nbsp;-&nbsp;</span>
              <span>{Math.floor(progress)}</span>%&nbsp;
              <span className="loading-dots">......</span>
            </div>

            {/* 底部信息 - 对应 _ca6c1de2 */}
            <div className="ak-loading-info">
              <span className="ak-brand">ARKNIGHTS</span>
              <span className="ak-url">//&nbsp;&nbsp;&nbsp;&nbsp;https://ak.hypergryph.com/</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
