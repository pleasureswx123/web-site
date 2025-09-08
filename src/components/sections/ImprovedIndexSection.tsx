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
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Video blur overlay for dreamy effect */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/5 z-[1]" />

      {/* Additional soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/30 z-[2]" />

      {/* Floating background elements */}
      <div className="absolute top-[10%] right-[20%] w-48 h-48 rounded-full bg-gradient-radial from-ak-accent/10 to-transparent z-10 animate-pulse"></div>
      <div className="absolute bottom-[20%] left-[10%] w-36 h-36 rounded-full bg-gradient-radial from-ak-accent/10 to-transparent z-10 animate-pulse delay-1000"></div>
      <div className="absolute top-[60%] right-[40%] w-24 h-24 rounded-full bg-gradient-radial from-ak-accent/10 to-transparent z-10 animate-pulse delay-500"></div>

      <div className="absolute inset-0 pl-0 pr-0 lg:pr-52 pt-20 pb-10 overflow-hidden z-[50] select-none pointer-events-none">
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
            className="absolute top-1/2 left-[5%] -translate-y-1/2 z-30 text-white max-w-2xl px-4 sm:px-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="mb-8 space-y-6">
              <motion.h1
                className="font-ak-title text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-wider leading-tight"
                style={{textShadow: '2px 2px 8px rgba(0,0,0,0.8)'}}
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.7}}
              >
                EVERCALL
              </motion.h1>

              <div className="space-y-3">
                <motion.div
                  className="font-ak-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-wide text-ak-secondary"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.8, delay: 0.9}}
                >
                  连接平行世界
                </motion.div>
                <motion.div className="font-mono text-xs sm:text-sm lg:text-base tracking-wider text-white/70 uppercase"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 1.1}}
                >
                  http://www.xinliuyuansu.com/
                </motion.div>
              </div>
              {/* Download links - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  className="group flex items-center gap-2 px-3 py-2 bg-black/60 border border-white/15 text-white text-xs backdrop-blur-md transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-500/60 hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/20"
                  target="_blank"
                  href="/"
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                >
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    <Apple className="w-full h-full"/>
                  </div>
                  <div className="flex flex-col gap-0">
                    <div className="font-medium leading-tight text-xs">App Store</div>
                  </div>
                </motion.a>

                <motion.a
                  className="group flex items-center gap-2 px-3 py-2 bg-black/60 border border-white/15 text-white text-xs backdrop-blur-md transition-all duration-300 hover:bg-green-500/30 hover:border-green-500/60 hover:translate-x-1 hover:shadow-lg hover:shadow-green-500/20"
                  target="_blank"
                  href="/"
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                >
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    <Smartphone className="w-full h-full"/>
                  </div>
                  <div className="flex flex-col gap-0">
                    <div className="font-medium leading-tight text-xs">Android</div>
                  </div>
                </motion.a>

                <motion.a
                  className="group flex items-center gap-2 px-3 py-2 bg-black/60 border border-white/15 text-white text-xs backdrop-blur-md transition-all duration-300 hover:bg-cyan-500/30 hover:border-cyan-500/60 hover:translate-x-1 hover:shadow-lg hover:shadow-cyan-500/20"
                  target="_blank"
                  href="/"
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                >
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    <Users className="w-full h-full"/>
                  </div>
                  <div className="flex flex-col gap-0">
                    <div className="font-medium leading-tight text-xs">官方社区</div>
                  </div>
                </motion.a>
              </div>

              <motion.div
                className="w-40 h-5 opacity-60 text-[9px] font-mono"
                initial={{opacity: 0}}
                animate={{opacity: 0.6}}
                transition={{duration: 0.8, delay: 1.3}}
              >
                @2024-2025 <br/>Evercall Co. Ltd.All
              </motion.div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  )
}
