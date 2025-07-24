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
  const getCurrentPageNumber = () => {
    const index = navigationItems.findIndex(item => item.id === currentSection)
    return index >= 0 ? index : 0
  }

  return (
    <>
      {/* 主Logo区域 - 左上角 */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.a
          href="/#index"
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 bg-ak-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AK</span>
          </div>
        </motion.a>
      </motion.div>

      {/* 右侧导航栏 */}
      <motion.nav
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col space-y-6">
          {navigationItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex flex-col items-end text-right transition-colors duration-300 ${
                currentSection === item.id
                  ? 'text-ak-primary'
                  : 'text-ak-text-secondary hover:text-ak-primary'
              }`}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-ak-secondary text-sm tracking-wider font-bold">
                {item.label}
              </span>
              <span className="font-ak-primary text-xs mt-1">{item.labelCn}</span>
              {currentSection === item.id && (
                <motion.div
                  className="w-8 h-0.5 bg-ak-primary mt-2"
                  layoutId="activeTab"
                />
              )}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* 页面指示器 - 右下角 */}
      <motion.div
        className="fixed right-6 bottom-6 z-50 text-right"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-ak-text-secondary font-ak-secondary">
          <div className="text-3xl font-bold text-ak-primary">
            {String(getCurrentPageNumber()).padStart(2, '0')}
          </div>
          <div className="text-sm">
            // {String(getCurrentPageNumber()).padStart(2, '0')} / {String(navigationItems.length - 1).padStart(2, '0')}
          </div>
          <div className="text-xs tracking-wider mt-2 text-ak-primary">
            ARKNIGHTS
          </div>
          <div className="text-xs uppercase">
            {navigationItems[getCurrentPageNumber()]?.label || 'INDEX'}
          </div>
        </div>
      </motion.div>

      {/* 滚动指示器 - 左侧 */}
      <motion.div
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="text-ak-text-secondary text-xs tracking-wider transform -rotate-90 origin-center">
            SCROLL
          </div>
          <motion.div
            className="w-0.5 h-16 bg-ak-border relative"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="w-full bg-ak-primary absolute top-0"
              style={{ height: `${((getCurrentPageNumber() + 1) / navigationItems.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div
            className="w-2 h-2 border border-ak-primary rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* 社交媒体链接 - 右上角 */}
      <motion.div
        className="fixed right-6 top-6 z-50 flex space-x-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.a
          href="#"
          className="w-8 h-8 bg-ak-gray/20 rounded-full flex items-center justify-center text-ak-text-secondary hover:text-ak-primary hover:bg-ak-primary/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </motion.a>

        <motion.a
          href="#"
          className="w-8 h-8 bg-ak-gray/20 rounded-full flex items-center justify-center text-ak-text-secondary hover:text-ak-primary hover:bg-ak-primary/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </motion.a>

        <motion.a
          href="#"
          className="w-8 h-8 bg-ak-gray/20 rounded-full flex items-center justify-center text-ak-text-secondary hover:text-ak-primary hover:bg-ak-primary/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
          </svg>
        </motion.a>
      </motion.div>
    </>
  )
}
