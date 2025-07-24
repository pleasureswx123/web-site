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
    <motion.div
      className="fixed inset-0 z-50 bg-ak-dark flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-ak-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.01,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-ak-primary mb-2 glitch" data-text="ARKNIGHTS">
            ARKNIGHTS
          </h1>
          <div className="text-ak-text-secondary text-lg font-ak-secondary">
            RHODES ISLAND
          </div>
          <div className="text-ak-text-secondary text-sm font-ak-secondary mt-1">
            HTTPS://AK.HYPERGRYPH.COM/
          </div>
        </motion.div>

        {/* 进度条 */}
        <div className="w-80 mx-auto mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-ak-text-secondary font-ak-secondary text-sm">
              {loadingText}
            </span>
            <span className="text-ak-primary font-ak-secondary text-sm">
              {Math.floor(progress)}%
            </span>
          </div>

          <div className="relative h-1 bg-ak-gray rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-ak-primary to-ak-secondary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />

            {/* 发光效果 */}
            <motion.div
              className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: [-32, 320],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </div>

        {/* 加载点 */}
        <div className="flex justify-center space-x-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-ak-primary rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* 底部信息 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-ak-text-secondary text-xs font-ak-secondary mb-2">
            // 00 / 05
          </div>
          <div className="text-ak-text-secondary text-sm">
            ARKNIGHTS
          </div>
          <div className="text-ak-text-secondary text-xs">
            HOMEPAGE
          </div>
        </motion.div>
      </div>

      {/* 扫描线效果 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="absolute w-full h-0.5 bg-ak-primary opacity-50"
          animate={{
            y: [0, typeof window !== 'undefined' ? window.innerHeight : 800],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
