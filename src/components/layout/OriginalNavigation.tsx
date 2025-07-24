'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface OriginalNavigationProps {
  currentSection: string
}

const navigationItems = [
  { id: 'index', label: 'INDEX', labelCn: '首页' },
  { id: 'information', label: 'INFORMATION', labelCn: '情报' },
  { id: 'operator', label: 'OPERATOR', labelCn: '干员' },
  { id: 'world', label: 'WORLD', labelCn: '设定' },
  { id: 'media', label: 'MEDIA', labelCn: '泰拉万象' },
  { id: 'more', label: 'MORE', labelCn: '更多内容' },
]

export default function OriginalNavigation({ currentSection }: OriginalNavigationProps) {
  const [showSocialPopup, setShowSocialPopup] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)

  const handleMusicToggle = () => {
    setIsMusicPlaying(!isMusicPlaying)
    // 这里可以添加实际的音乐控制逻辑
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.a
          href="/#index"
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-white tracking-wider">
            明日方舟
          </div>
        </motion.a>

        {/* Navigation Menu */}
        <motion.div
          className="flex items-center space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navigationItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex flex-col items-center space-y-1 transition-all duration-300 ${currentSection === item.id
                ? 'text-blue-400'
                : 'text-white/80 hover:text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium tracking-wider font-oswald">
                {item.label}
              </span>
              <span className="text-xs opacity-70">
                {item.labelCn}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Right Icons */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Social Icon */}
          <motion.button
            onClick={() => setShowSocialPopup(!showSocialPopup)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 27 35">
              <use xlinkHref="#svg_def-icon_social"></use>
            </svg>
          </motion.button>

          {/* Sound Icon */}
          <motion.button
            onClick={handleMusicToggle}
            className={`p-2 rounded-lg transition-colors ${isMusicPlaying
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 30 34">
              <use xlinkHref="#svg_def-icon_sound"></use>
            </svg>
          </motion.button>

          {/* User Icon */}
          <motion.button
            onClick={() => setShowUserPopup(!showUserPopup)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 28 34">
              <use xlinkHref="#svg_def-icon_user"></use>
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Social Media Popup */}
      {showSocialPopup && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSocialPopup(false)}
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md border border-blue-500/30 rounded-xl p-8 max-w-md mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-blue-400 text-xl font-bold mb-6 text-center font-oswald">社交媒体</h3>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-blue-500/10 transition-colors text-white/80 hover:text-white"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">微</span>
                </div>
                <span>官方微博</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-blue-500/10 transition-colors text-white/80 hover:text-white"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">Q</span>
                </div>
                <span>官方QQ群</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-blue-500/10 transition-colors text-white/80 hover:text-white"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">微</span>
                </div>
                <span>官方微信</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* User Menu Popup */}
      {showUserPopup && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowUserPopup(false)}
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md border border-blue-500/30 rounded-xl p-8 max-w-md mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-blue-400 text-xl font-bold mb-6 text-center font-oswald">用户中心</h3>
            <div className="space-y-4">
              <button className="w-full p-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-400 hover:text-blue-300 border border-blue-500/30">
                登录
              </button>
              <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white border border-white/20">
                注册
              </button>
              <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white border border-white/20">
                个人中心
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </nav>
  )
}
