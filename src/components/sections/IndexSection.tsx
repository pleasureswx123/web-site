'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function IndexSection() {
  const downloadLinks = [
    {
      platform: 'App Store',
      label: '下载',
      icon: '/images/icons/app-store.png',
      url: 'https://itunes.apple.com/cn/app/id1454663939?mt=8',
    },
    {
      platform: 'Android',
      label: '下载',
      icon: '/images/icons/android.png',
      url: 'https://ak.hypergryph.com/downloads/android_lastest',
    },
    {
      platform: '通过TapTap下载',
      label: '',
      icon: '/images/icons/taptap.png',
      url: 'https://l.taptap.cn/H8VVNhvq?channel=rep-rep_typxbuxvnpi',
    },
  ]

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* 主要内容区域 */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* 左侧：游戏信息和下载 */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 标题 */}
            <div className="space-y-4">
              <motion.h1
                className="text-6xl lg:text-8xl font-bold text-ak-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                ARKNIGHTS
              </motion.h1>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-ak-text-secondary font-ak-secondary text-lg">
                  RHODES ISLAND
                </div>
                <div className="text-ak-text-secondary font-ak-secondary text-sm">
                  HTTPS://AK.HYPERGRYPH.COM/
                </div>
              </motion.div>
            </div>

            {/* 游戏描述 */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-ak-text text-lg leading-relaxed">
                策略塔防手游《明日方舟》，在这里，你将管理罗德岛，
                这艘满载着希望的方舟，与感染者一同对抗灾难，治愈创伤。
              </p>
              <p className="text-ak-text-secondary">
                在这个被天灾摧残的世界中，感染者与非感染者之间的矛盾日益激化。
                而你，作为罗德岛的领导者，将如何在这乱世中寻找希望的曙光？
              </p>
            </motion.div>

            {/* 下载按钮 */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {downloadLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-ak-gray border border-ak-border rounded-lg p-4 hover:border-ak-primary transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* 背景发光效果 */}
                    <div className="absolute inset-0 bg-ak-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ak-primary/20 rounded-lg flex items-center justify-center">
                        <span className="text-ak-primary text-sm font-bold">
                          {link.platform.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-ak-text font-medium">
                          {link.platform}
                        </div>
                        {link.label && (
                          <div className="text-ak-text-secondary text-sm">
                            {link.label}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* 其他链接 */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#"
                  className="text-ak-text-secondary hover:text-ak-primary transition-colors font-ak-secondary text-sm border-b border-transparent hover:border-ak-primary"
                  whileHover={{ y: -1 }}
                >
                  模拟器下载
                </motion.a>
                <motion.a
                  href="https://www.skland.com/game/arknights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ak-text-secondary hover:text-ak-primary transition-colors font-ak-secondary text-sm border-b border-transparent hover:border-ak-primary"
                  whileHover={{ y: -1 }}
                >
                  官方社区
                </motion.a>
                <motion.a
                  href="https://user.hypergryph.com/payment/arknights?source_from=ak_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ak-text-secondary hover:text-ak-primary transition-colors font-ak-secondary text-sm border-b border-transparent hover:border-ak-primary"
                  whileHover={{ y: -1 }}
                >
                  官方充值中心
                </motion.a>
              </div>
            </motion.div>

            {/* 二维码下载 */}
            <motion.div
              className="bg-ak-gray/50 rounded-lg p-6 border border-ak-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1">
                  <Image
                    src="/images/icons/qrcode_download.png"
                    alt="下载二维码"
                    width={56}
                    height={56}
                    className="object-contain w-14 h-14"
                    sizes="56px"
                  />
                </div>
                <div>
                  <div className="text-ak-text font-medium mb-1">扫码下载</div>
                  <div className="text-ak-text-secondary text-sm">
                    使用手机扫描二维码下载游戏
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 右侧：角色展示 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 主角色图片 */}
            <div className="relative z-10">
              <motion.div
                className="relative w-full h-[600px] bg-gradient-to-br from-ak-primary/20 to-ak-secondary/20 rounded-2xl overflow-hidden"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* 凯尔希角色立绘 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/characters/kaltsit_e1.png"
                    alt="KAL'TSIT"
                    width={400}
                    height={600}
                    className="object-contain w-full h-full"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                {/* 发光边框 */}
                <div className="absolute inset-0 border-2 border-ak-primary/30 rounded-2xl" />

                {/* 角落装饰 */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-ak-primary" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-ak-primary" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-ak-primary" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-ak-primary" />
              </motion.div>
            </div>

            {/* 背景装饰元素 */}
            <div className="absolute inset-0 -z-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-ak-primary rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="text-ak-text-secondary text-sm font-ak-secondary">
            SCROLL
          </div>
          <motion.div
            className="w-6 h-10 border-2 border-ak-text-secondary rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-ak-text-secondary rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
