'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const moreContent = [
  {
    id: 'integrated-strategies',
    title: '集成战略',
    titleEn: 'INTEGRATED STRATEGIES',
    description: 'roguelike玩法模式，每次挑战都有不同的体验',
    image: '/images/more/integrated_strategies.jpg',
    icon: '/images/icons/icon-integrated_strategies.png',
    url: '/is',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'reclamation-algorithm',
    title: '生息演算',
    titleEn: 'RECLAMATION ALGORITHM',
    description: '全新的战略模拟玩法，体验不同的战术策略',
    image: '/images/more/reclamation_algorithm.jpg',
    icon: '/images/icons/icon-reclamation_algorithm.png',
    url: '/ra',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'animation',
    title: '衍生动画',
    titleEn: 'ANIMATION',
    description: '明日方舟官方动画作品，深入了解泰拉世界',
    image: '/images/more/animation.jpg',
    icon: '/images/icons/icon-animation.png',
    url: 'https://ak.hypergryph.com/anime/',
    color: 'from-red-500 to-pink-500',
    external: true,
  },
  {
    id: 'terra-historicus',
    title: '泰拉记事社',
    titleEn: 'TERRA HISTORICUS',
    description: '官方世界观资料站，探索泰拉大陆的历史与文化',
    image: '/images/more/terra_historicus.jpg',
    icon: '/images/icons/icon-terra_historicus.png',
    url: 'https://terra-historicus.hypergryph.com/',
    color: 'from-blue-500 to-cyan-500',
    external: true,
  },
]

const gameFeatures = [
  {
    icon: '🎯',
    title: '策略塔防',
    description: '运用策略和技巧，合理部署干员抵御敌人',
  },
  {
    icon: '👥',
    title: '丰富角色',
    description: '数百名个性鲜明的干员等待你的招募',
  },
  {
    icon: '📖',
    title: '深度剧情',
    description: '沉浸式的故事体验，探索泰拉世界的秘密',
  },
  {
    icon: '🎨',
    title: '精美画面',
    description: '高质量的美术设计和动画效果',
  },
  {
    icon: '🎵',
    title: '原创音乐',
    description: '塞壬唱片出品的高品质游戏音乐',
  },
  {
    icon: '🌍',
    title: '世界观',
    description: '庞大而完整的世界观设定',
  },
]

export default function MoreSection() {
  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ak-dark via-ak-gray to-ak-dark opacity-90"></div>
        {/* 几何装饰 */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-ak-primary/20 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-ak-secondary/20 rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-ak-primary/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-ak-primary mb-4 font-ak-secondary">
            MORE CONTENT
          </h2>
          <div className="text-ak-text-secondary">
            探索更多明日方舟的精彩内容
          </div>
        </motion.div>

        {/* 主要内容卡片 */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {moreContent.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.url}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : ''}
              className="group relative bg-ak-gray/30 border border-ak-border rounded-lg overflow-hidden hover:border-ak-primary transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 背景图片 */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
              </div>

              <div className="relative p-8 z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center p-2">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="object-contain w-8 h-8"
                        sizes="32px"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-ak-primary transition-colors mb-2 font-ak-title">
                        {item.titleEn}
                      </h3>
                      <div className="text-white/90 text-lg mb-4">
                        {item.title}
                      </div>
                      <p className="text-white/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {item.external && (
                    <svg className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white group-hover:text-ak-primary transition-colors">
                    <span className="font-ak-secondary text-sm font-bold">VIEW MORE</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* 装饰元素 */}
                  <div className="flex space-x-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-white/30 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* 游戏特色 */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-ak-primary mb-4 font-ak-secondary">
              GAME FEATURES
            </h3>
            <div className="text-ak-text-secondary">
              明日方舟的核心特色
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-ak-gray/30 border border-ak-border rounded-lg p-6 hover:border-ak-primary hover:bg-ak-gray/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-ak-primary font-bold mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-ak-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 社区链接 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="bg-ak-gray/30 border border-ak-border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-ak-primary mb-4 font-ak-secondary">
              JOIN THE COMMUNITY
            </h3>
            <p className="text-ak-text-secondary mb-6">
              加入明日方舟官方社区，与其他博士一起交流游戏心得
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://www.skland.com/game/arknights"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ak-primary/20 hover:bg-ak-primary/30 border border-ak-primary rounded-lg px-6 py-3 text-ak-primary font-ak-secondary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                官方社区
              </motion.a>

              <motion.a
                href="https://user.hypergryph.com/payment/arknights?source_from=ak_official"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ak-secondary/20 hover:bg-ak-secondary/30 border border-ak-secondary rounded-lg px-6 py-3 text-ak-secondary font-ak-secondary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                充值中心
              </motion.a>

              <motion.a
                href="https://www.hypergryph.com/connect"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ak-accent/20 hover:bg-ak-accent/30 border border-ak-accent rounded-lg px-6 py-3 text-ak-accent font-ak-secondary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                联系我们
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
