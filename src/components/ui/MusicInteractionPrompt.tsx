'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useMusic } from '@/hooks/useMusicControl'
import { Play, Volume2, X } from 'lucide-react'

/**
 * 音乐交互提示组件
 * 当浏览器阻止自动播放时显示，引导用户点击启用音乐
 */
export default function MusicInteractionPrompt() {
  const { isPlaying, userInteracted, setUserInteracted, play } = useMusic()
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // 延迟显示提示，给用户一些时间自然交互
    const timer = setTimeout(() => {
      if (!userInteracted && isPlaying) {
        setShowPrompt(true)
      }
    }, 3000) // 3秒后显示

    return () => clearTimeout(timer)
  }, [userInteracted, isPlaying])

  const handleEnableMusic = () => {
    setUserInteracted(true)
    play()
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  // 如果用户已经交互过，或者音乐不是播放状态，不显示提示
  if (userInteracted || !isPlaying || !showPrompt) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-ak-gray/95 backdrop-blur-md border border-ak-primary/30 rounded-xl p-6 max-w-md w-full shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* 关闭按钮 */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* 图标 */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-ak-primary/20 rounded-full flex items-center justify-center">
              <Volume2 className="w-8 h-8 text-ak-primary" />
            </div>
          </div>

          {/* 标题和描述 */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-ak-text mb-2 font-ak-title">
              启用背景音乐
            </h3>
            <p className="text-ak-text-secondary text-sm leading-relaxed">
              浏览器需要用户交互才能播放音频。
              点击下方按钮来启用心流元素的背景音乐，
              获得更好的沉浸式体验。
            </p>
          </div>

          {/* 按钮 */}
          <div className="flex gap-3">
            <Button
              onClick={handleEnableMusic}
              className="flex-1 bg-ak-primary hover:bg-ak-primary/90 text-black font-ak-secondary"
            >
              <Play className="w-4 h-4 mr-2" />
              启用音乐
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="border-ak-border text-ak-text-secondary hover:bg-white/5"
            >
              稍后
            </Button>
          </div>

          {/* 底部提示 */}
          <div className="mt-4 text-center">
            <p className="text-xs text-ak-text-secondary/60">
              你也可以点击导航栏的音乐图标来控制播放
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
