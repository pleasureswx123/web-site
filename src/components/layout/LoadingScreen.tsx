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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 动态几何背景 */}
      <div className="absolute inset-0">
        {/* 主要几何图形 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-gray-800/30 rotate-45 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-gray-700/20 rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-gray-600/15 -rotate-12 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* 线条网格 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49px,rgba(255,255,255,0.1)_50px,rgba(255,255,255,0.1)_51px,transparent_52px),linear-gradient(rgba(255,255,255,0.1)_49px,transparent_50px,transparent_51px,rgba(255,255,255,0.1)_52px)] bg-[size:100px_100px]" />
        </div>

        {/* 渐变光晕 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-radial from-blue-500/8 via-transparent to-transparent blur-2xl" />

        {/* 动态粒子点 */}
        <motion.div
          className="absolute top-1/5 left-1/5 w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-blue-400 rounded-full"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-gray-400 rounded-full"
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.8, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* 主要内容容器 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        {/* Logo区域 */}
        <motion.div
          className="text-center mb-20 relative"
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* 装饰性边框 */}
          <div className="absolute -inset-8 border border-gray-800/20 rotate-1" />
          <div className="absolute -inset-12 border border-gray-700/10 -rotate-1" />

          {/* 主标题 */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-[0.2em] relative"
            style={{ fontFamily: 'var(--font-ak-title)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="relative inline-block">
              GVERCALL
              {/* 主发光效果 */}
              <span className="absolute inset-0 text-cyan-300 opacity-30 blur-md">GVERCALL</span>
              {/* 细节发光 */}
              <span className="absolute inset-0 text-cyan-400 opacity-60 blur-sm">GVERCALL</span>
              {/* 渐变文字 */}
              <span className="absolute inset-0 text-transparent bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text">GVERCALL</span>
            </span>
          </motion.h1>

          {/* 装饰线条 */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-600" />
            <div className="w-2 h-2 border border-gray-500 rotate-45" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-600" />
          </motion.div>

          {/* 副标题 */}
          <motion.div
            className="text-gray-300 text-lg md:text-xl font-light tracking-[0.3em] relative"
            style={{ fontFamily: 'var(--font-ak-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="relative">
              RHODES ISLAND
              <span className="absolute inset-0 text-cyan-400/40 blur-sm">RHODES ISLAND</span>
            </span>
          </motion.div>
        </motion.div>

        {/* 加载进度区域 */}
        <motion.div
          className="w-full max-w-lg relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {/* 进度条装饰框架 */}
          <div className="relative p-6 border border-gray-800/30 bg-black/20 backdrop-blur-sm">
            {/* 角落装饰 */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-600" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-600" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-600" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-600" />

            {/* 进度条容器 */}
            <div className="relative mb-8">
              {/* 进度条标签 */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-xs font-mono tracking-wider">LOADING PROGRESS</span>
                <motion.span
                  className="text-cyan-400 text-sm font-mono tabular-nums"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {Math.floor(progress).toString().padStart(3, '0')}%
                </motion.span>
              </div>

              {/* 进度条背景 */}
              <div className="relative w-full h-2 bg-gray-900 border border-gray-800 overflow-hidden">
                {/* 背景纹理 */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_1px,rgba(255,255,255,0.02)_2px,transparent_3px)] bg-[size:4px_100%]" />

                {/* 进度条 */}
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 relative overflow-hidden"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                >
                  {/* 进度条内部动画 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  {/* 发光效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/60 to-blue-400/60 blur-sm" />
                </motion.div>
              </div>

              {/* 进度条刻度 */}
              <div className="flex justify-between mt-1">
                {[0, 25, 50, 75, 100].map((mark) => (
                  <div key={mark} className="flex flex-col items-center">
                    <div className="w-px h-2 bg-gray-700" />
                    <span className="text-xs text-gray-600 mt-1">{mark}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 加载状态文本 */}
            <motion.div
              className="text-center space-y-4"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* 主状态显示 */}
              <div className="flex items-center justify-center space-x-3 text-white/90">
                <motion.div
                  className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="font-mono text-sm tracking-[0.2em] uppercase">
                  {loadingText}
                </span>
                <motion.span
                  className="text-cyan-400 font-mono"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  {'█'.repeat(Math.floor(progress / 20))}
                </motion.span>
              </div>

              {/* 系统信息 */}
              <div className="space-y-2 text-xs text-gray-500 font-mono">
                <div className="flex justify-between">
                  <span>SYSTEM STATUS</span>
                  <span className="text-green-400">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>CONNECTION</span>
                  <span className="text-cyan-400">SECURE</span>
                </div>
                <div className="flex justify-between">
                  <span>PROTOCOL</span>
                  <span className="text-blue-400">HTTPS/2.0</span>
                </div>
              </div>

              {/* 底部品牌信息 */}
              <div className="pt-4 border-t border-gray-800/50">
                <div className="text-xs text-gray-400 font-mono tracking-wider">
                  <span className="text-white/80">GVERCALL</span>
                  <span className="mx-3 text-gray-600">|</span>
                  <span>RHODES ISLAND PHARMACEUTICAL</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  ak.hypergryph.com
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 高级装饰性元素 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 角落科技装饰 */}
          <div className="absolute top-8 left-8">
            <div className="w-16 h-16 border-l-2 border-t-2 border-gray-700/50" />
            <motion.div
              className="absolute top-0 left-0 w-4 h-4 bg-cyan-400/30"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <div className="absolute top-8 right-8">
            <div className="w-16 h-16 border-r-2 border-t-2 border-gray-700/50" />
            <motion.div
              className="absolute top-0 right-0 w-4 h-4 bg-blue-400/30"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </div>

          <div className="absolute bottom-8 left-8">
            <div className="w-16 h-16 border-l-2 border-b-2 border-gray-700/50" />
            <motion.div
              className="absolute bottom-0 left-0 w-4 h-4 bg-gray-400/30"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </div>

          <div className="absolute bottom-8 right-8">
            <div className="w-16 h-16 border-r-2 border-b-2 border-gray-700/50" />
            <motion.div
              className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-300/30"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
            />
          </div>

          {/* 中央装饰线条 */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-700/30 to-transparent"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
        </div>
      </div>

      {/* 底部状态栏 */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gray-900 border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {/* 扫描线效果 */}
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  )
}
