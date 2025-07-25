'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import {
  CheckCircle,
  Volume2,
  Info,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const operatorData = [
  {
    id: 'florence',
    name: 'FLORENCE',
    nameCn: '芙洛伦丝',
    rarity: 6,
    profession: 'Support',
    professionCn: '支援',
    voiceCn: '陈雨',
    voiceJp: 'M・A・O',
    description: '精通于治疗和支援的专业人员，性格温和但意志坚定。同时拥有出色的医疗技术和对于战术的深刻理解。她总是能在关键时刻为队友提供最需要的支援，以及最贴心的照料。她深知医者的责任，也深知一个干员的责任。',
    image: '/images/characters/texas.png',
    avatar: '/images/characters/texas.png',
  },
  {
    id: 'kaltsit',
    name: 'KAL\'TSIT',
    nameCn: '凯尔希',
    rarity: 6,
    profession: 'Medic',
    professionCn: '医疗',
    voiceCn: '陈雨',
    voiceJp: '日笠阳子',
    description: '罗德岛最高管理者之一，阿米娅的直接辅导者。罗德岛医疗部门的总负责人。作为罗德岛的老成员，凯尔希医生是在阿米娅背后最稳固的援护者。',
    image: '/images/characters/kaltsit.png',
    avatar: '/images/characters/kaltsit.png',
  },
  {
    id: 'amiya',
    name: 'AMIYA',
    nameCn: '阿米娅',
    rarity: 5,
    profession: 'Caster',
    professionCn: '术师',
    voiceCn: '陈雨',
    voiceJp: '黑泽朋世',
    description: '罗德岛的公开领袖，在内部拥有最高执行权。虽然年纪尚轻，但她拥有着卓越的行动指挥能力。',
    image: '/images/characters/amiya.png',
    avatar: '/images/characters/amiya.png',
  },
  {
    id: 'chen',
    name: 'CHEN',
    nameCn: '陈',
    rarity: 6,
    profession: 'Guard',
    professionCn: '近卫',
    voiceCn: '陈雨',
    voiceJp: '石上静香',
    description: '龙门近卫局高级督察，在龙门与罗德岛的合作中，她既是监督者，也是合作伙伴。',
    image: '/images/characters/chen.png',
    avatar: '/images/characters/chen.png',
  },
  {
    id: 'texas',
    name: 'TEXAS',
    nameCn: '德克萨斯',
    rarity: 5,
    profession: 'Vanguard',
    professionCn: '先锋',
    voiceCn: '陈雨',
    voiceJp: '小清水亚美',
    description: '企鹅物流的员工，拥有丰富的作战经验。她总是显得很冷静，但内心深处燃烧着战斗的热情。',
    image: '/images/characters/texas.png',
    avatar: '/images/characters/texas.png',
  },
]

export default function OperatorSection() {
  const [selectedOperator, setSelectedOperator] = useState(operatorData[0])

  const handleOperatorSelect = (operator: typeof operatorData[0]) => {
    if (operator.id === selectedOperator.id) return
    setSelectedOperator(operator)
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image src="/images/role.png" alt="背景" fill className="object-cover" priority/>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 背景装饰 */}
      <div className="absolute inset-0">
        {/* 几何装饰元素 */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-ak-primary/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 border border-ak-secondary/20 rounded-full animate-pulse delay-1000" />
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">
        <div className="relative w-full h-full z-10">
          <div className="flex w-full h-full">
            {/* 左侧：角色头像列表 */}
            <motion.div className="flex flex-col justify-center items-center py-8 px-8  pl-10 space-y-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>{operatorData.map((operator, index) => (
              <motion.button
                key={operator.id}
                className={`group relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${selectedOperator.id === operator.id
                  ? 'border-ak-primary shadow-lg shadow-ak-primary/50 scale-110'
                  : 'border-ak-border hover:border-ak-text-secondary hover:shadow-md hover:shadow-ak-text-secondary/30'
                }`}
                onClick={() => handleOperatorSelect(operator)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: selectedOperator.id === operator.id ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={operator.avatar || operator.image}
                  alt={operator.nameCn}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                />
                {selectedOperator.id === operator.id && (
                  <div className="absolute inset-0 bg-ak-primary/20 rounded-full" />
                )}
              </motion.button>
            ))}
            </motion.div>

            {/* 中间：角色信息 */}
            <div className="flex-1 flex flex-col justify-center px-12 max-w-2xl">
              {/* 职业标签 */}
              <motion.div
                className="flex items-center space-x-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-6 h-6 bg-ak-secondary rounded flex items-center justify-center shadow-lg shadow-ak-secondary/30">
                  <CheckCircle className="w-4 h-4 text-black" />
                </div>
                <span className="text-ak-secondary font-medium text-sm tracking-wider">
              {selectedOperator.professionCn}
            </span>
              </motion.div>

              {/* 角色名称 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOperator.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-6xl font-bold text-white mb-2 tracking-wider font-mono">
                    {selectedOperator.name}
                  </h1>
                  <h2 className="text-2xl text-gray-300 mb-8 font-light">
                    {selectedOperator.nameCn}
                  </h2>
                </motion.div>
              </AnimatePresence>

              {/* 声优信息 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOperator.id}
                  className="space-y-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-4 h-4 text-ak-secondary" />
                    <span className="text-gray-400 text-sm">中文CV:</span>
                    <span className="text-white font-medium">{selectedOperator.voiceCn}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-4 h-4 text-ak-secondary" />
                    <span className="text-gray-400 text-sm">日文CV:</span>
                    <span className="text-white font-medium">{selectedOperator.voiceJp}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 角色描述 */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedOperator.id}
                  className="text-gray-300 leading-relaxed text-lg max-w-xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {selectedOperator.description}
                </motion.p>
              </AnimatePresence>

              {/* 操作按钮 */}
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.button
                  className="group flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-lg px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Info className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">查看详情</span>
                </motion.button>

                <motion.button
                  className="group flex items-center space-x-2 bg-ak-secondary/80 hover:bg-ak-secondary border border-ak-secondary hover:border-ak-secondary/80 rounded-lg px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-ak-secondary/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white font-medium">收藏干员</span>
                </motion.button>
              </motion.div>
            </div>

            {/* 右侧：角色立绘 */}
            <div className="flex-1 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOperator.id}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8, x: 100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                >
                  <Image
                    src={selectedOperator.image}
                    alt={selectedOperator.nameCn}
                    width={600}
                    height={800}
                    className="object-contain max-h-[100vh]"
                    priority
                  />

                  {/* 光效装饰 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
                </motion.div>
              </AnimatePresence>

              {/* 导航箭头 */}
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 border border-gray-600 hover:border-ak-primary rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-ak-primary/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const currentIndex = operatorData.findIndex(op => op.id === selectedOperator.id)
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : operatorData.length - 1
                  handleOperatorSelect(operatorData[prevIndex])
                }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-300 hover:text-ak-primary transition-colors duration-300" />
              </motion.button>

              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 border border-gray-600 hover:border-ak-primary rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-ak-primary/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const currentIndex = operatorData.findIndex(op => op.id === selectedOperator.id)
                  const nextIndex = currentIndex < operatorData.length - 1 ? currentIndex + 1 : 0
                  handleOperatorSelect(operatorData[nextIndex])
                }}
              >
                <ChevronRight className="w-6 h-6 text-gray-300 hover:text-ak-primary transition-colors duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
