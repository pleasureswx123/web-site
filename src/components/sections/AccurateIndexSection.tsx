'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AccurateIndexSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* 主背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/homepage_bg.jpg"
          alt="背景"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </div>

      {/* 左上角Logo */}
      <motion.div
        className="absolute top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-white font-bold text-lg tracking-wider">
          心流元素
        </div>
      </motion.div>

      {/* 顶部导航栏 */}
      <motion.nav
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center space-x-8">
          {[
            { id: 'index', label: 'INDEX', labelCn: '首页', active: true },
            { id: 'information', label: 'INFORMATION', labelCn: '情报' },
            { id: 'operator', label: 'OPERATOR', labelCn: '干员' },
            { id: 'world', label: 'WORLD', labelCn: '设定' },
            { id: 'media', label: 'MEDIA', labelCn: '泰拉万象' },
            { id: 'more', label: 'MORE', labelCn: '更多内容' },
          ].map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex flex-col items-center transition-colors duration-300 ${
                item.active
                  ? 'text-cyan-400'
                  : 'text-white/70 hover:text-cyan-400'
              }`}
              whileHover={{ y: -2 }}
            >
              <span className="text-sm font-bold tracking-wider">
                {item.label}
              </span>
              <span className="text-xs mt-1">{item.labelCn}</span>
              {item.active && (
                <motion.div
                  className="w-full h-0.5 bg-cyan-400 mt-2"
                  layoutId="activeTab"
                />
              )}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* 右上角功能按钮 */}
      <motion.div
        className="absolute top-6 right-6 z-50 flex items-center space-x-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 15.536a5 5 0 010-7.072m-2.828-9.9a9 9 0 000 14.142" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </motion.div>

      {/* 左侧主标题区域 */}
      <motion.div
        className="absolute left-12 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="space-y-4">
          {/* 巨大的中文标题 */}
          <motion.h1
            className="text-[12rem] font-black text-white leading-none tracking-tight font-ak-primary"
            style={{
              fontWeight: 500, // 使用 Medium 字重
              textShadow: '0 0 30px rgba(0,0,0,0.8)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            明日
            <br />
            方舟
          </motion.h1>

          {/* 英文标题 */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h2 className="text-6xl font-bold text-cyan-400 tracking-wider">
              ARKNIGHTS
            </h2>
            <div className="text-white/80 text-lg tracking-wider">
              RHODES ISLAND
            </div>
            <div className="text-white/60 text-sm tracking-wider">
              HTTPS://AK.HYPERGRYPH.COM/
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 右侧功能区域 */}
      <motion.div
        className="absolute right-12 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="space-y-6">
          {/* 页面指示器 */}
          <div className="text-right text-white/60">
            <div className="text-4xl font-bold text-cyan-400">00</div>
            <div className="text-sm">// 00 / 05</div>
            <div className="text-xs tracking-wider mt-2">ARKNIGHTS</div>
            <div className="text-xs">HOMEPAGE</div>
          </div>

          {/* 功能按钮组 */}
          <div className="space-y-4">
            <motion.button
              className="w-full bg-cyan-400 text-black px-6 py-3 rounded font-bold tracking-wider hover:bg-cyan-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              INFORMATION
              <div className="text-xs">情报</div>
            </motion.button>

            <motion.button
              className="w-full bg-green-500 text-white px-6 py-3 rounded font-bold tracking-wider hover:bg-green-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              下载
            </motion.button>

            <motion.button
              className="w-full bg-blue-500 text-white px-6 py-3 rounded font-bold tracking-wider hover:bg-blue-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              通过TapTap下载
            </motion.button>

            <motion.button
              className="w-full bg-yellow-500 text-black px-6 py-3 rounded font-bold tracking-wider hover:bg-yellow-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              官方社区
            </motion.button>

            <motion.button
              className="w-full bg-purple-500 text-white px-6 py-3 rounded font-bold tracking-wider hover:bg-purple-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              官方充值中心
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 底部版权信息 */}
      <motion.div
        className="absolute bottom-6 left-12 z-40 text-white/60 text-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div>© HYPERGRYPH</div>
      </motion.div>

      {/* 底部二维码区域 */}
      <motion.div
        className="absolute bottom-6 right-12 z-40 flex items-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="text-white/60 text-xs text-right">
          <div>扫</div>
          <div>码</div>
          <div>下</div>
          <div>载</div>
        </div>
        <div className="w-16 h-16 bg-white rounded">
          <Image
            src="/images/icons/qrcode_download.png"
            alt="下载二维码"
            width={64}
            height={64}
            className="object-contain w-full h-full"
            sizes="64px"
          />
        </div>
      </motion.div>

      {/* 滚动指示器 */}
      <motion.div
        className="absolute left-6 bottom-20 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="flex flex-col items-center space-y-4 text-white/60">
          <div className="text-xs tracking-wider transform -rotate-90 origin-center">
            SCROLL
          </div>
          <div className="w-0.5 h-16 bg-white/30 relative">
            <motion.div
              className="w-full bg-cyan-400 absolute top-0"
              style={{ height: '20%' }}
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <motion.div
            className="w-2 h-2 border border-cyan-400 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
