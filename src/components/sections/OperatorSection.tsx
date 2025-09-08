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
  ChevronRight,
  Calendar,
  Star
} from 'lucide-react'

const operatorData = [
  {
    id: 'yoyo',
    name: 'Yoyo',
    nameCn: '悠悠',
    rarity: 5,
    profession: 'Support',
    professionCn: '支援',
    voiceCn: '王晓雯',
    // voiceJp: '大橋彩香',
    birthday: '3月14日',
    birthdayNote: 'π Day，她常说"无限不循环才是人生"',
    constellation: '双鱼座',
    constellationNote: '理性与浪漫的矛盾体',
    description: '动漫设计专业大一学生，性格温柔细腻却藏着韧性。她善于捕捉人们情绪中细微的波动，也能将生活里的美学感悟转化为具体的创作。 她总习惯用樱花牌铅笔作画，能把他人的焦虑画成会绽放的云朵，用漫画分镜化解尴尬的瞬间；遇到创作瓶颈时，也会凭着耐心慢慢摸索突破。她的速写本就像一个治愈人心的秘密基地，每一笔画里，都藏着 “让裂痕生长出星光” 的温暖力量。',
    image: '/images/roles/yoyo1.png',
    avatar: '/images/roles/yoyo1.png',
  }
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
        <Image src="/images/roles/yoyo.jpg" alt="背景" fill className="object-cover" priority/>
        <div className="absolute inset-0 bg-black/75  backdrop-blur-lg" />
      </div>

      <div className="absolute inset-0 pl-0 pr-0 lg:pr-52 pt-20 pb-10 overflow-hidden z-50">
        <div className="relative w-full h-full z-10">
          <div className="flex flex-col lg:flex-row w-full h-full">
            {/* 左侧：角色头像列表 */}
            <motion.div className="flex flex-row lg:flex-col justify-center items-center py-4 lg:py-8 px-4 lg:px-8 lg:pl-10 space-x-4 lg:space-x-0 lg:space-y-4" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>{operatorData.map((operator, index) => (
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
                  className="w-full h-full object-contain group-hover:brightness-110 transition-all duration-300"
                />
                {selectedOperator.id === operator.id && (
                  <div className="absolute inset-0 bg-ak-primary/20 rounded-full" />
                )}
              </motion.button>
            ))}
            </motion.div>

            {/* 中间：角色信息 */}
            <div className="flex-1 flex flex-col justify-center px-4 lg:px-12 max-w-2xl">

              {/* 角色名称 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOperator.id}
                  initial={{opacity: 0, y: 30}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -30}}
                  transition={{duration: 0.5}}
                >
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-wider font-mono">
                    {selectedOperator.nameCn}
                  </h2>
                  <h1 className="text-xl sm:text-2xl text-gray-300 mb-6 lg:mb-8 font-light">
                    {selectedOperator.name}
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* 声优信息 */}
              {/*<AnimatePresence mode="wait">
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
              </AnimatePresence>*/}

              {/* 生日与星座信息 */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOperator.id}
                  className="space-y-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  {/* 生日信息 */}
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-4 h-4 text-ak-secondary mt-0.5" />
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">生日:</span>
                        <span className="text-white font-medium">{selectedOperator.birthday}</span>
                      </div>
                      <span className="text-gray-500 text-xs mt-1 leading-relaxed">
                        {selectedOperator.birthdayNote}
                      </span>
                    </div>
                  </div>

                  {/* 星座信息 */}
                  <div className="flex items-start space-x-3">
                    <Star className="w-4 h-4 text-ak-secondary mt-0.5" />
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">星座:</span>
                        <span className="text-white font-medium">{selectedOperator.constellation}</span>
                      </div>
                      <span className="text-gray-500 text-xs mt-1 leading-relaxed">
                        {selectedOperator.constellationNote}
                      </span>
                    </div>
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
              {/*<motion.div
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
              </motion.div>*/}
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

              {/* 导航箭头 - 只在有多个干员时显示 */}
              {operatorData.length > 1 && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
