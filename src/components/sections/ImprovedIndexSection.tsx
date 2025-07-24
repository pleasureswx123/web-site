'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ImprovedIndexSection() {
  const downloadLinks = [
    {
      platform: 'App Store',
      label: '下载',
      icon: '/images/icons/app-store.svg',
      url: 'https://itunes.apple.com/cn/app/id1454663939?mt=8',
    },
    {
      platform: 'Android',
      label: '下载',
      icon: '/images/icons/android.svg',
      url: 'https://ak.hypergryph.com/downloads/android_lastest',
    },
    {
      platform: '通过TapTap下载',
      label: '',
      icon: '/images/icons/taptap.svg',
      url: 'https://l.taptap.cn/H8VVNhvq?channel=rep-rep_typxbuxvnpi',
    },
  ]

  const additionalLinks = [
    { label: '模拟器下载', url: '#' },
    { label: '官方社区', url: 'https://www.skland.com/game/arknights' },
    { label: '官方充值中心', url: 'https://user.hypergryph.com/payment/arknights?source_from=ak_official' },
  ]

  return (
    <section className="min-h-screen relative overflow-hidden bg-ak-dark">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ak-dark via-ak-dark/95 to-ak-dark/90" />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 border border-ak-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧：游戏信息和下载 */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* 标题区域 */}
              <div className="space-y-4">
                <motion.h1
                  className="text-6xl lg:text-8xl font-bold text-ak-primary font-ak-primary"
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
                  <div className="text-ak-text-secondary text-sm tracking-wider">
                    HTTPS://AK.HYPERGRYPH.COM/
                  </div>
                </motion.div>
              </div>

              {/* 下载按钮区域 */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {downloadLinks.slice(0, 2).map((link, index) => (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-4 p-4 bg-ak-gray/20 rounded-lg border border-ak-border hover:border-ak-primary transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-ak-primary/20 rounded-lg flex items-center justify-center">
                        <Image
                          src={link.icon}
                          alt={link.platform}
                          width={24}
                          height={24}
                          className="object-contain"
                          sizes="24px"
                        />
                      </div>
                      <div>
                        <div className="text-ak-primary font-bold">{link.platform}</div>
                        <div className="text-ak-text-secondary text-sm">{link.label}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* TapTap下载 */}
                <motion.a
                  href={downloadLinks[2].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center space-x-3 p-4 bg-ak-primary/10 rounded-lg border border-ak-primary/30 hover:border-ak-primary transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <Image
                    src={downloadLinks[2].icon}
                    alt="TapTap"
                    width={24}
                    height={24}
                    className="object-contain"
                    sizes="24px"
                  />
                  <span className="text-ak-primary font-bold">{downloadLinks[2].platform}</span>
                </motion.a>

                {/* 其他链接 */}
                <div className="space-y-3">
                  {additionalLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    >
                      {link.url === '#' ? (
                        <div className="text-ak-text-secondary text-sm">{link.label}</div>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ak-text-secondary hover:text-ak-primary text-sm transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 二维码下载区域 */}
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <div className="text-ak-text-secondary">
                  <div className="text-sm">扫</div>
                  <div className="text-sm">码</div>
                  <div className="text-sm">下</div>
                  <div className="text-sm">载</div>
                </div>
                <motion.a
                  href="https://ak.hypergryph.com/news/2021059770.html"
                  className="block"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src="/images/icons/qrcode_download.png"
                    alt="下载二维码"
                    width={56}
                    height={56}
                    className="object-contain w-14 h-14"
                    sizes="56px"
                  />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* 右侧：角色展示 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-[600px] lg:h-[700px]">
                {/* 主角色图片 */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <Image
                    src="/images/characters/amiya_main.png"
                    alt="阿米娅"
                    width={400}
                    height={600}
                    className="object-contain w-full h-full max-w-[400px] max-h-[600px]"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </motion.div>

                {/* 装饰元素 */}
                <motion.div
                  className="absolute top-10 right-10 w-32 h-32 border border-ak-primary/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                
                <motion.div
                  className="absolute bottom-20 left-10 w-24 h-24 border border-ak-secondary/30 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
