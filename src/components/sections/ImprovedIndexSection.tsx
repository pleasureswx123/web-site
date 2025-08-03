'use client'

import { motion } from 'framer-motion'
import {
  Apple,
  Smartphone,
  Gamepad2,
  Monitor,
  Users,
  CreditCard,
  QrCode,
  Shield
} from 'lucide-react'

export default function ImprovedIndexSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30 z-10" />
      {/*增加背景图片*/}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{ backgroundImage: 'url(/images/new_background.png)' }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* 添加渐变遮罩以增强视觉效果 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-slate-900/30 via-transparent to-slate-900/50 backdrop-blur-sm"
          animate={{
            background: [
              'linear-gradient(to left, rgba(15, 23, 42, 0.3) 0%, transparent 50%, rgba(15, 23, 42, 0.5) 100%)',
              'linear-gradient(to right, rgba(15, 23, 42, 0.5) 0%, transparent 50%, rgba(15, 23, 42, 0.3) 100%)',
              'linear-gradient(to left, rgba(15, 23, 42, 0.3) 0%, transparent 50%, rgba(15, 23, 42, 0.5) 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* 添加额外的模糊层 */}
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-slate-900/10"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        playsInline
        crossOrigin="anonymous"
        muted
        loop
        preload="metadata"
        data-autoplay="1"
        autoPlay
      >
        <source src="/videos/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Canvas overlay */}
      <canvas
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-30"
        width="960"
        height="540"
      />

      {/* Floating background elements */}
      <div className="absolute top-[10%] right-[20%] w-48 h-48 rounded-full bg-gradient-radial from-ak-accent/10 to-transparent z-10 animate-pulse"></div>
      <div className="absolute bottom-[20%] left-[10%] w-36 h-36 rounded-full bg-gradient-radial from-ak-accent/10 to-transparent z-10 animate-pulse delay-1000"></div>
      <div className="absolute top-[60%] right-[40%] w-24 h-24 rounded-full bg-gradient-radial from-ak-accent/10 to-transparent z-10 animate-pulse delay-500"></div>

      <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50 pointer-events-none">
        <div className="relative w-full h-full z-[20]">
          {/* 镂空文字效果演示 - 最佳效果 */}
          <div className='opacity-20'>
            <motion.div
              className="absolute left-0 bottom-20 bg-slate-900 w-1/2 h-96 flex items-center justify-center z-20 shadow-2xl"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              {/* 使用 mix-blend-mode difference 实现真正的镂空效果 */}
              <motion.div
                className="text-[100px] font-bold text-white mix-blend-difference select-none font-ak-title"
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: [
                    '0 0 0px rgba(255,255,255,0)',
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 0px rgba(255,255,255,0)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                EVERCALL
              </motion.div>
            </motion.div>
          </div>

          {/* Main content - Logo and title */}
          <motion.div
            className="absolute top-1/2 left-[5%] -translate-y-1/2 z-30 text-white max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="mb-8 space-y-6">
              <motion.h1
                className="font-ak-title text-5xl lg:text-7xl xl:text-8xl font-bold tracking-wider leading-tight"
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                EVERCALL
              </motion.h1>

              <div className="space-y-3">
                <motion.div
                  className="font-ak-title text-xl lg:text-2xl xl:text-3xl font-medium tracking-wide text-ak-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  RHODES ISLAND
                </motion.div>
                <motion.div className="font-mono text-sm lg:text-base tracking-wider text-white/70 uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  http://60.205.169.140/
                </motion.div>
              </div>
            </div>

            <motion.div
              className="w-40 h-5 opacity-60 text-[9px] font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              @2024-2025 <br />Evercall Co. Ltd.All
            </motion.div>
          </motion.div>

          {/* Download links */}
          <motion.div
            className="absolute right-2 bottom-28 flex flex-col gap-3 z-30 w-56"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.a
              className="group flex items-center gap-3 px-4 py-3 bg-black/60 border border-white/15 text-white text-sm backdrop-blur-md transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-500/60 hover:-translate-x-1 hover:shadow-lg hover:shadow-blue-500/20"
              target="_blank"
              href="https://itunes.apple.com/cn/app/id1454663939?mt=8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                <Apple className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="font-medium leading-tight">App Store</div>
                <div className="text-xs opacity-80 leading-tight">下载</div>
              </div>
            </motion.a>

            <motion.a
              className="group flex items-center gap-3 px-4 py-3 bg-black/60 border border-white/15 text-white text-sm backdrop-blur-md transition-all duration-300 hover:bg-green-500/30 hover:border-green-500/60 hover:-translate-x-1 hover:shadow-lg hover:shadow-green-500/20"
              target="_blank"
              href="https://ak.hypergryph.com/downloads/android_lastest"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                <Smartphone className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="font-medium leading-tight">Android</div>
                <div className="text-xs opacity-80 leading-tight">下载</div>
              </div>
            </motion.a>

            <motion.a
              className="group flex items-center gap-3 px-4 py-3 bg-black/60 border border-white/15 text-white text-sm backdrop-blur-md transition-all duration-300 hover:bg-yellow-500/30 hover:border-yellow-500/60 hover:-translate-x-1 hover:shadow-lg hover:shadow-yellow-500/20"
              target="_blank"
              href="https://l.taptap.cn/H8VVNhvq?channel=rep-rep_typxbuxvnpi"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                <Gamepad2 className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="font-medium leading-tight text-sm">通过TapTap下载</div>
              </div>
            </motion.a>

            <motion.a
              className="group flex items-center gap-3 px-4 py-3 bg-black/60 border border-white/15 text-white text-sm backdrop-blur-md transition-all duration-300 hover:bg-purple-500/30 hover:border-purple-500/60 hover:-translate-x-1 hover:shadow-lg hover:shadow-purple-500/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                <Monitor className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="font-medium leading-tight">模拟器下载</div>
              </div>
            </motion.a>

            <motion.a
              className="group flex items-center gap-3 px-4 py-3 bg-black/60 border border-white/15 text-white text-sm backdrop-blur-md transition-all duration-300 hover:bg-cyan-500/30 hover:border-cyan-500/60 hover:-translate-x-1 hover:shadow-lg hover:shadow-cyan-500/20"
              target="_blank"
              href="https://www.skland.com/game/Evercall"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                <Users className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="font-medium leading-tight">官方社区</div>
              </div>
            </motion.a>

            <motion.a
              className="group flex items-center gap-3 px-4 py-3 bg-black/60 border border-white/15 text-white text-sm backdrop-blur-md transition-all duration-300 hover:bg-orange-500/30 hover:border-orange-500/60 hover:-translate-x-1 hover:shadow-lg hover:shadow-orange-500/20"
              target="_blank"
              href="https://user.hypergryph.com/payment/Evercall?source_from=ak_official"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                <CreditCard className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="font-medium leading-tight text-sm">官方充值中心</div>
              </div>
            </motion.a>
          </motion.div>


          {/* QR Code and age rating */}
          <motion.div
            className="absolute bottom-2 right-12 flex items-end gap-4 z-30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="flex items-center gap-3 bg-black/40 px-3 py-3 backdrop-blur-md border border-white/10 hover:bg-black/50 transition-colors duration-300">
              <div className="flex flex-col text-white text-xs font-medium tracking-wide opacity-90 leading-tight">
                <span>扫</span><span>码</span><span>下</span><span>载</span>
              </div>
              <div className="w-16 h-16 bg-white p-2 flex items-center justify-center">
                <QrCode className="w-full h-full text-black" />
              </div>
            </div>
            <motion.a
              href="https://ak.hypergryph.com/news/2021059770.html"
              target="_blank"
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-12 h-12 border border-white/10 hover:border-white/30 transition-colors duration-300 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
