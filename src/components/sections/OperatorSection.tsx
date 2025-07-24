'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const operatorData = [
  {
    id: 'kaltsit',
    name: 'KAL\'TSIT',
    nameCn: '凯尔希',
    rarity: 6,
    profession: 'Medic',
    professionCn: '医疗',
    voice: '日笠阳子',
    description: '罗德岛最高管理者之一，阿米娅的直接辅导者。罗德岛医疗部门的总负责人。作为罗德岛的老成员，凯尔希医生是在阿米娅背后最稳固的援护者。',
    image: '/images/characters/kaltsit.png',
    active: true,
  },
  {
    id: 'amiya',
    name: 'AMIYA',
    nameCn: '阿米娅',
    rarity: 5,
    profession: 'Caster',
    professionCn: '术师',
    voice: '黑泽朋世',
    description: '罗德岛的公开领袖，在内部拥有最高执行权。虽然年纪尚轻，但她拥有着卓越的行动指挥能力。',
    image: '/images/characters/amiya.png',
    active: false,
  },
  {
    id: 'chen',
    name: 'CHEN',
    nameCn: '陈',
    rarity: 6,
    profession: 'Guard',
    professionCn: '近卫',
    voice: '石上静香',
    description: '龙门近卫局高级督察，在龙门与罗德岛的合作中，她既是监督者，也是合作伙伴。',
    image: '/images/characters/chen.png',
    active: false,
  },
  {
    id: 'texas',
    name: 'TEXAS',
    nameCn: '德克萨斯',
    rarity: 5,
    profession: 'Vanguard',
    professionCn: '先锋',
    voice: '小清水亚美',
    description: '企鹅物流的员工，拥有丰富的作战经验。她总是显得很冷静，但内心深处燃烧着战斗的热情。',
    image: '/images/characters/texas.png',
    active: false,
  },
  {
    id: 'exusiai',
    name: 'EXUSIAI',
    nameCn: '能天使',
    rarity: 6,
    profession: 'Sniper',
    professionCn: '狙击',
    voice: '福原绫香',
    description: '企鹅物流的员工，拉特兰公民。性格开朗活泼，是团队中的开心果。',
    image: '/images/characters/exusiai.png',
    active: false,
  },
  {
    id: 'ptilopsis',
    name: 'PTILOPSIS',
    nameCn: '白面鸮',
    rarity: 5,
    profession: 'Medic',
    professionCn: '医疗',
    voice: '悠木碧',
    description: '罗德岛医疗部门的研究员，拥有出色的医疗技术和研究能力。',
    image: '/images/characters/ptilopsis.png',
    active: false,
  },
]

export default function OperatorSection() {
  const [selectedOperator, setSelectedOperator] = useState(operatorData[0])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleOperatorSelect = async (operator: typeof operatorData[0]) => {
    if (operator.id === selectedOperator.id) return

    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedOperator(operator)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ak-dark via-ak-gray to-ak-dark opacity-50"></div>
        <div className="absolute top-20 right-20 w-96 h-96 border border-ak-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-ak-secondary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-ak-text-secondary font-ak-secondary text-sm mb-2">
            RHODES ISLAND ://
          </div>
          <h2 className="text-4xl font-bold text-ak-primary mb-4 font-ak-secondary">
            PROFILE
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* 左侧：角色详情 */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 角色基本信息 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOperator.id}
                className="bg-ak-gray/30 border border-ak-border rounded-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-3xl font-bold text-ak-primary font-ak-secondary">
                        {selectedOperator.name}
                      </h3>
                      <div className="flex">
                        {Array.from({ length: selectedOperator.rarity }).map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-ak-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-ak-text text-xl mb-4">
                      {selectedOperator.nameCn}
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-ak-text-secondary text-sm">职业:</span>
                        <span className="text-ak-primary">{selectedOperator.professionCn}</span>
                        <span className="text-ak-text-secondary text-sm">({selectedOperator.profession})</span>
                      </div>
                    </div>
                  </div>

                  {/* 罗德岛标志 */}
                  <div className="w-16 h-16 bg-ak-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-ak-primary font-bold text-sm">RHODES</span>
                  </div>
                </div>

                {/* 声优信息 */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-ak-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.828 1 1 0 01-1.415-1.414A3.984 3.984 0 0013 12a3.983 3.983 0 00-.172-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
                      </svg>
                      <span className="text-ak-text-secondary font-ak-secondary text-sm">CHARACTER VOICE</span>
                    </div>
                  </div>
                  <div className="text-ak-primary font-medium">
                    {selectedOperator.voice}
                  </div>
                </div>

                {/* 角色描述 */}
                <div className="text-ak-text leading-relaxed">
                  {selectedOperator.description}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 角色立绘展示区域 */}
            <motion.div
              className="bg-gradient-to-br from-ak-primary/10 to-ak-secondary/10 border border-ak-border rounded-lg p-8 min-h-[400px] flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOperator.id}
                  className="relative w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={selectedOperator.image}
                    alt={selectedOperator.nameCn}
                    width={300}
                    height={400}
                    className="object-contain w-full h-full max-w-[300px] max-h-[400px]"
                    priority
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  {/* 角色名称水印 */}
                  <div className="absolute bottom-4 left-4 text-ak-primary text-2xl font-bold opacity-20 font-ak-title">
                    {selectedOperator.name}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* 右侧：角色列表 */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {operatorData.map((operator, index) => (
              <motion.button
                key={operator.id}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  selectedOperator.id === operator.id
                    ? 'bg-ak-primary/20 border-ak-primary'
                    : 'bg-ak-gray/30 border-ak-border hover:border-ak-primary hover:bg-ak-gray/50'
                }`}
                onClick={() => handleOperatorSelect(operator)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-ak-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-ak-primary font-bold text-xs">
                      {operator.nameCn.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className={`font-medium transition-colors ${
                      selectedOperator.id === operator.id ? 'text-ak-primary' : 'text-ak-text'
                    }`}>
                      {operator.nameCn}
                    </div>
                    <div className="text-ak-text-secondary text-sm">
                      {operator.professionCn}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* 底部导航按钮 */}
        <motion.div
          className="flex justify-center space-x-4 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.button
            className="flex items-center space-x-2 bg-ak-gray/50 hover:bg-ak-gray border border-ak-border hover:border-ak-primary rounded-lg px-6 py-3 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4 text-ak-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-ak-text-secondary">上一个</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 bg-ak-gray/50 hover:bg-ak-gray border border-ak-border hover:border-ak-primary rounded-lg px-6 py-3 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-ak-text-secondary">下一个</span>
            <svg className="w-4 h-4 text-ak-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
