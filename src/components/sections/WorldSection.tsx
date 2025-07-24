'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const worldData = [
  {
    id: 'originiums',
    title: 'ORIGINIUMS',
    titleCn: '源石',
    description: '一种蕴含巨大能量的矿物，是泰拉世界科技发展的基础，同时也是感染者疾病的源头。',
    details: '源石是泰拉世界最重要的能源物质，它不仅推动了整个文明的科技进步，也带来了源石病这一无法治愈的疾病。接触源石的人有可能感染源石病，成为被社会歧视的感染者。',
    color: 'from-blue-500 to-cyan-500',
    active: true,
  },
  {
    id: 'originium-arts',
    title: 'ORIGINIUM ARTS',
    titleCn: '源石技艺',
    description: '利用源石力量施展的特殊技能，类似于魔法，是泰拉世界战斗和生活的重要组成部分。',
    details: '源石技艺是泰拉世界独有的能力体系，通过源石的力量，人们可以操控元素、治疗伤病、强化身体等。不同的人擅长不同类型的源石技艺，这也决定了他们在战斗中的定位。',
    color: 'from-purple-500 to-pink-500',
    active: false,
  },
  {
    id: 'reunion',
    title: 'REUNION',
    titleCn: '整合运动',
    description: '由感染者组成的激进组织，致力于通过暴力手段改变感染者的地位，与罗德岛理念相冲突。',
    details: '整合运动是一个由感染者组成的武装组织，他们认为只有通过暴力才能改变感染者被压迫的现状。虽然目标是为感染者争取权利，但他们的极端手段往往伤及无辜。',
    color: 'from-red-500 to-orange-500',
    active: false,
  },
  {
    id: 'infected',
    title: 'INFECTED',
    titleCn: '感染者',
    description: '感染源石病的人群，在社会中遭受歧视和排斥，罗德岛致力于为他们提供医疗援助。',
    details: '感染者是感染了源石病的人群，他们的身体会逐渐结晶化，最终死亡。由于疾病的传染性和社会的恐惧，感染者往往遭受严重的歧视和迫害，生活在社会的边缘。',
    color: 'from-gray-500 to-slate-500',
    active: false,
  },
  {
    id: 'nomadic-city',
    title: 'NOMADIC CITY',
    titleCn: '移动城邦',
    description: '为了躲避天灾而建造的可移动城市，是泰拉世界文明的主要形态。',
    details: '由于天灾的威胁，泰拉世界的人们建造了能够移动的城市。这些移动城邦配备了先进的科技，可以在天灾来临前及时转移，保护城市中的居民。',
    color: 'from-green-500 to-emerald-500',
    active: false,
  },
  {
    id: 'rhodes-island',
    title: 'RHODES ISLAND',
    titleCn: '罗德岛',
    description: '一个致力于治疗源石病、保护感染者权益的医疗机构，同时也是一支强大的军事力量。',
    details: '罗德岛是一个特殊的组织，表面上是医疗机构，实际上拥有强大的军事力量。他们致力于研究源石病的治疗方法，同时保护感染者的权益，在各种冲突中维持平衡。',
    color: 'from-blue-600 to-indigo-600',
    active: false,
  },
]

export default function WorldSection() {
  const [selectedWorld, setSelectedWorld] = useState(worldData[0])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ak-dark via-ak-gray to-ak-dark opacity-80"></div>
        {/* 动态背景粒子 */}
        {Array.from({ length: 30 }).map((_, i) => (
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
              duration: Math.random() * 4 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
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
            WORLD
          </h2>
          <div className="text-ak-text-secondary font-ak-secondary">
            探索泰拉世界的奥秘
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 左侧：世界设定列表 */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {worldData.map((item, index) => (
              <motion.button
                key={item.id}
                className={`w-full text-left p-6 rounded-lg border transition-all duration-300 group ${
                  selectedWorld.id === item.id
                    ? 'bg-ak-primary/20 border-ak-primary'
                    : 'bg-ak-gray/30 border-ak-border hover:border-ak-primary hover:bg-ak-gray/50'
                }`}
                onClick={() => setSelectedWorld(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      selectedWorld.id === item.id ? 'bg-ak-primary' : 'bg-ak-text-secondary'
                    }`}></div>
                    <div>
                      <div className={`font-ak-secondary font-bold transition-colors ${
                        selectedWorld.id === item.id ? 'text-ak-primary' : 'text-ak-text group-hover:text-ak-primary'
                      }`}>
                        {item.title}
                      </div>
                      <div className="text-ak-text-secondary text-sm">
                        {item.titleCn}
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className={`text-ak-text-secondary group-hover:text-ak-primary transition-colors ${
                      selectedWorld.id === item.id ? 'text-ak-primary' : ''
                    }`}
                    animate={{ x: hoveredItem === item.id ? 5 : 0 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>

                <div className="text-ak-text-secondary text-sm leading-relaxed">
                  {item.description}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* 右侧：详细信息展示 */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWorld.id}
                className="bg-ak-gray/30 border border-ak-border rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* 标题区域 */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedWorld.color} flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">
                        {selectedWorld.titleCn.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-ak-primary font-ak-secondary">
                        {selectedWorld.title}
                      </h3>
                      <div className="text-ak-text text-lg">
                        {selectedWorld.titleCn}
                      </div>
                    </div>
                  </div>

                  {/* 装饰线 */}
                  <div className="w-full h-px bg-gradient-to-r from-ak-primary via-ak-secondary to-transparent"></div>
                </div>

                {/* 详细描述 */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-ak-primary font-ak-secondary font-bold mb-3">概述</h4>
                    <p className="text-ak-text leading-relaxed">
                      {selectedWorld.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-ak-primary font-ak-secondary font-bold mb-3">详细信息</h4>
                    <p className="text-ak-text leading-relaxed">
                      {selectedWorld.details}
                    </p>
                  </div>
                </div>

                {/* 底部装饰 */}
                <div className="mt-8 pt-6 border-t border-ak-border">
                  <div className="flex items-center justify-between">
                    <div className="text-ak-text-secondary font-ak-secondary text-sm">
                      TERRA WORLD SETTING
                    </div>
                    <div className="flex space-x-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-ak-primary rounded-full opacity-50"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 视觉展示区域 */}
            <motion.div
              className="bg-gradient-to-br from-ak-primary/10 to-ak-secondary/10 border border-ak-border rounded-lg p-8 min-h-[300px] flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedWorld.id}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${selectedWorld.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-4xl">
                      {selectedWorld.titleCn.charAt(0)}
                    </span>
                  </div>
                  <div className="text-ak-primary text-2xl font-bold font-ak-secondary mb-2">
                    {selectedWorld.title}
                  </div>
                  <div className="text-ak-text-secondary">
                    世界设定概念图
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* 底部导航 */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-ak-text-secondary font-ak-secondary text-sm mb-4">
            探索更多泰拉世界的秘密
          </div>
          <motion.button
            className="bg-ak-primary/20 hover:bg-ak-primary/30 border border-ak-primary rounded-lg px-8 py-3 text-ak-primary font-ak-secondary transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            查看完整世界观
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
