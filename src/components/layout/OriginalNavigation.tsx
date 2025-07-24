'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

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

  return (
    // OriginalNavigation组件：顶部导航内容组件 - 对应 _6066ead1
    <div className="_6066ead1">
      {/* logo - 对应 _6532021f */}
      <motion.a
        className="_6532021f"
        href="/#index"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <svg viewBox="0 0 254 119">
          <use xlinkHref="#svg_def-title_arknights"></use>
        </svg>
      </motion.a>

      {/* 导航 - 对应 _a5b206bf */}
      <motion.div
        className="_a5b206bf"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="_57987e85">
          {navigationItems.map((item, index) => (
            <motion.a
              key={item.id}
              className={`_c91e47cc ${currentSection === item.id ? '_f3a31881' : ''}`}
              href={`#${item.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="_70ad2676">{item.label}</div>
              <div className="_ae0d96a6">{item.labelCn}</div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* 导航右边icon - 对应 _149a6e98 */}
      <motion.div
        className="_149a6e98"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* icon_social - 对应 _950ab946 */}
        <motion.div
          className="_950ab946"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSocialPopup(!showSocialPopup)}
        >
          <svg viewBox="0 0 27 35">
            <use xlinkHref="#svg_def-icon_social"></use>
          </svg>
        </motion.div>

        {/* icon_sound - 对应 _950ab946 _e6c9defd _5d27adee */}
        <motion.div
          className="_950ab946 _e6c9defd _5d27adee"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 30 34">
            <use xlinkHref="#svg_def-icon_sound"></use>
          </svg>
        </motion.div>

        {/* icon_user - 对应 _950ab946 */}
        <motion.div
          className="_950ab946"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowUserPopup(!showUserPopup)}
        >
          <svg viewBox="0 0 28 34">
            <use xlinkHref="#svg_def-icon_user"></use>
          </svg>
        </motion.div>
      </motion.div>

      {/* 装饰线条 - 对应 _d6b1e15c */}
      <div className="_d6b1e15c">
        <div className="_a174eeef">
          <div className="_016b1d43 _a1600518"></div>
          <div className="_016b1d43 _b0d45f10"></div>
          <div className="_016b1d43 _daaf28c6"></div>
        </div>
      </div>

      {/* 社交媒体弹出层 */}
      {showSocialPopup && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSocialPopup(false)}
        >
          <motion.div
            className="bg-ak-dark border border-ak-primary/30 rounded-lg p-8 max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-ak-primary text-xl font-bold mb-4">社交媒体</h3>
            <div className="space-y-3">
              <a href="#" className="block text-ak-text-secondary hover:text-ak-primary transition-colors">
                官方微博
              </a>
              <a href="#" className="block text-ak-text-secondary hover:text-ak-primary transition-colors">
                官方QQ群
              </a>
              <a href="#" className="block text-ak-text-secondary hover:text-ak-primary transition-colors">
                官方微信
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 用户菜单弹出层 */}
      {showUserPopup && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowUserPopup(false)}
        >
          <motion.div
            className="bg-ak-dark border border-ak-primary/30 rounded-lg p-8 max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-ak-primary text-xl font-bold mb-4">用户中心</h3>
            <div className="space-y-3">
              <a href="#" className="block text-ak-text-secondary hover:text-ak-primary transition-colors">
                登录
              </a>
              <a href="#" className="block text-ak-text-secondary hover:text-ak-primary transition-colors">
                注册
              </a>
              <a href="#" className="block text-ak-text-secondary hover:text-ak-primary transition-colors">
                个人中心
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
