'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

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
<section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" style={{backgroundImage: 'url(/images/role.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        {/* 几何装饰元素 */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-cyan-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 border border-blue-500/20 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* 左侧：角色头像列表 */}
        <motion.div
          className="flex flex-col justify-center items-center py-8 px-4 space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {operatorData.map((operator, index) => (
            <motion.button
              key={operator.id}
              className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${selectedOperator.id === operator.id
                  ? 'border-cyan-400 shadow-lg shadow-cyan-400/50 scale-110'
                  : 'border-gray-600 hover:border-gray-400'
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
                className="w-full h-full object-cover"
              />
              {selectedOperator.id === operator.id && (
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full"></div>
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
            <div className="w-6 h-6 bg-cyan-400 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-cyan-400 font-medium text-sm tracking-wider">
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
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-sm">中文CV:</span>
                <span className="text-white">{selectedOperator.voiceCn}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-sm">日文CV:</span>
                <span className="text-white">{selectedOperator.voiceJp}</span>
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
              className="flex items-center space-x-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-lg px-6 py-3 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-300">查看详情</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 bg-cyan-600/80 hover:bg-cyan-500 border border-cyan-500 hover:border-cyan-400 rounded-lg px-6 py-3 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-white">收藏干员</span>
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
                className="object-contain max-h-[80vh] w-auto"
                priority
              />

              {/* 光效装饰 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
            </motion.div>
          </AnimatePresence>

          {/* 导航箭头 */}
          <motion.button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 border border-gray-600 hover:border-gray-400 rounded-full flex items-center justify-center transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const currentIndex = operatorData.findIndex(op => op.id === selectedOperator.id)
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : operatorData.length - 1
              handleOperatorSelect(operatorData[prevIndex])
            }}
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 border border-gray-600 hover:border-gray-400 rounded-full flex items-center justify-center transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const currentIndex = operatorData.findIndex(op => op.id === selectedOperator.id)
              const nextIndex = currentIndex < operatorData.length - 1 ? currentIndex + 1 : 0
              handleOperatorSelect(operatorData[nextIndex])
            }}
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
