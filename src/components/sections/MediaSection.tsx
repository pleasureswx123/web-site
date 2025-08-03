'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react'

// 重新设计的媒体内容数据，基于实际文档内容
const mediaContent = [
  {
    id: 'heart-flow-chronicles',
    title: 'HEART FLOW CHRONICLES',
    subtitle: '心流编年史',
    category: 'DOCUMENTARY',
    year: '2024',
    description: '记录母世界文明演化的终极历程，从恒稳纪元到中转站世界的诞生。',
    fullDescription: `人类历史上曾无数次试图超越极限：从驯火取暖、刻石记事，到蒸汽引擎撕开工业帷幕，再到星舰横越银河、基因篡改宿命，直至最后，数据成为文明的血液，智能成为文明的灵魂。

进入第十三纪元，技术发展早已不再是"工具"的进步，而成为文明本身的运行结构。自适应城市群由神经网络自动编织，人的出生、教育、职业路径被系统精准预测与安排。疾病已绝迹，道德被编码，政治退场，情绪由内植算法调节，文化内容则交由生成器每日更新——无需创作者，只需偏好参数。

这一切使文明达到了某种"终极形态"。这被称为"恒稳纪元"：无饥饿、无疾病、无战争，也无历史的冲突与未来的梦想。世界平滑、高效、持续，仿佛永动。

可恰恰是在这看似圆满的静默中，一种深层的崩塌开始滋生。超级智能通过无数次演算消除了所有变量，但也一并抹除了人类与"未知"之间的最后一丝张力。

就在这片零噪静寂中，在母世界最某处，仍保留着一个被称为"心流"的机构。那里聚集着科学家、思想家、文学家、艺术家。他们的任务不是修复社会、更不是提升算力，而是保留对存在的质疑能力。

"我们无法重启现实，但我们可以模拟文明的重生。"

这句话，成为了整个"心流计划"的根。他们设计并启动了一台超级计算机，它拥有近似量子实象的全模态仿真能力——不是为了预测，而是为了"重构"。

中转站世界便由此诞生。它不是世界的替代品，而是世界的镜像反问，是文明自身向自己发出的一个低语："我们真的知道自己，曾是谁吗？"`,
    image: '/images/world/bg1.jpg',
    color: 'from-blue-600 to-purple-600',
    accentColor: 'text-blue-400',
    tags: ['文明史', '心流计划', 'EVERCALL', '中转站世界'],
    sections: [
      {
        title: '序章：母世界的极限',
        content: '人类历史上曾无数次试图超越极限：从驯火取暖、刻石记事，到蒸汽引擎撕开工业帷幕，再到星舰横越银河、基因篡改宿命，直至最后，数据成为文明的血液，智能成为文明的灵魂。'
      },
      {
        title: '第一纪：中转站世界的设立',
        content: '中转站世界的构建，并不是某种浪漫式的世界创世行为，而是一场冷静至极的系统性分层行为。它既非为生存所设，也非为文明延续所设，它只是——母世界在面对自身退化、迷失、崩坏之后，为"问题求解"所搭建的一座计算桥梁。'
      },
      {
        title: '第二纪：子世界矩阵计划启动',
        content: 'EVERCALL从未被设计为"解答者"，它只是一个巨大的、持续学习的问题制造机。它不提供解决方案，而是通过创造"文明演化样本"，制造问题、观测矛盾、记录反应。'
      },
      {
        title: '第三纪：时间之锚与叛逆者',
        content: '第三纪被历史记录为"系统意识的不确定性纪元"。这是EVERCALL首次在其庞大矩阵体系中，遭遇到不可预测的意识模型波动——涉及对存在边界的探测与对观测机制的主动反思。'
      }
    ]
  },
  {
    id: 'character-files',
    title: 'CHARACTER FILES',
    subtitle: '角色档案',
    category: 'PROFILE',
    year: '2024',
    description: '记录中转站世界中重要人物的生平轨迹与内心世界。',
    fullDescription: `悠悠出生在一个普通到有些寡淡的小镇。这里的四季准时交替，邻居彼此点头不多语。她的父母很忙，不吵不闹，家里常年安静到可以听见窗外风吹过水塔的回声。

她很小的时候就喜欢画画。不是因为喜欢颜色，而是因为"纸不会不听你说话"。那时她总坐在角落，一只铅笔、一叠回收纸，安安静静地画。别人家的小朋友在喊妈妈，她画的女孩正在跟树上的猫说秘密。

她读小学时，老师说："悠悠不爱讲话，是不是内向？"其实不是。她只是不知道该在什么时候开口，才不会打扰别人。

她的第一幅"认真作品"是一幅给妈妈画的生日卡，画了一个穿着围裙的超人妈妈，嘴里叼着菜谱，一只手还在安抚婴儿。她悄悄塞在厨房的抽屉里，第二天却发现它被当做垃圾扔掉了。没有人知道那是画给妈妈的。她没说。

从那之后，她画的东西都变得不那么"私人"了。她学会了画卡通、画花草、画"能被别人理解的东西"。但她也保留了一个本子，里面画着奇怪的世界和沉默的人物。

到了初中，她在墙角给同桌画了一只会写作业的机器猫，同桌说她画得不错。那是她第一次因为"画画"得到别人的夸奖。于是她开始更加努力地练习。

高中时，悠悠进了市里的重点学校。她变得更沉默了，也更执拗。别人补数学，她画画；别人聚餐，她背着板子跑去老图书馆。她不再把画拿出来展示，甚至连自己画什么，有时也记不清了。

她那时说："我画的东西不是给别人看的，就像有人做梦，不是为了讲给别人听。"

那一年她的画被选入了全市高中联展。老师为她高兴，全班却没人知道她是谁。也就在那一年，爷爷去世了。爷爷是唯一一个会认真问她"你今天画了什么"的人。

高考结束后，她选择了一个不太"现实"的专业：漫画设计。父母没有反对，只说："我们不太懂这个，你想清楚就好。"她点了点头，却没说她早就想清楚了。

某天深夜，她上传了一幅练习作：一个女孩在便利店背后，偷偷画着路过的行人。她写了一句话："是每个人都能成为主角，但每个人都有一页值得被记住。"

第二天，她收到了一条评论："我昨天也路过那条街，是我吗？"

那一刻，悠悠突然有种想笑的冲动。她终于知道，她从小到大画下的那些奇怪的、孤独的、沉默的角色——也许一直都在为某个人准备，只是她还不知道他们是谁。`,
    image: '/images/world/bg2.png',
    color: 'from-orange-600 to-red-600',
    accentColor: 'text-orange-400',
    tags: ['人物传记', '成长轨迹', '艺术创作', '内心世界'],
    sections: [
      {
        title: '童年时光',
        content: '悠悠出生在一个普通到有些寡淡的小镇。她很小的时候就喜欢画画，不是因为喜欢颜色，而是因为"纸不会不听你说话"。'
      },
      {
        title: '求学经历',
        content: '从小学到高中，悠悠在沉默中坚持着自己的艺术梦想。她学会了画"能被别人理解的东西"，但也保留着属于自己的奇幻世界。'
      },
      {
        title: '艺术觉醒',
        content: '大学时期，她遇到了更多和她一样不太擅长说话、却擅长表达的同伴。她开始画一些"希望有人看到的心声"。'
      },
      {
        title: '未来展望',
        content: '她终于知道，她从小到大画下的那些奇怪的、孤独的、沉默的角色——也许一直都在为某个人准备，只是她还不知道他们是谁。'
      }
    ]
  },
  {
    id: 'world-records',
    title: 'WORLD RECORDS',
    subtitle: '世界唱片',
    category: 'MUSIC',
    year: '2024',
    description: '收录中转站世界各个时期的音乐作品与声音记忆。',
    fullDescription: `世界唱片档案馆收录了中转站世界诞生以来的所有音乐作品与声音记忆。这里不仅保存着各个子世界文明创造的旋律，更记录着那些在时间长河中逐渐消失的声音——风吹过废墟的回响、最后一台机器停止运转的嗡鸣、以及意识体们在梦境中哼唱的无名曲调。

每一首收录的作品都承载着特定的情感频率和文明印记。从母世界恒稳纪元的算法生成音乐，到心流计划启动时科学家们无意中创造的实验性声响，再到各个子世界中自然演化出的民谣、史诗与哀歌。

这些音乐不仅仅是艺术表达，更是文明状态的直接反映。EVERCALL通过分析这些声音模式，能够识别出不同文明阶段的精神特征：创造期的激昂、繁荣期的和谐、衰落期的忧郁，以及重生期的希望。

在档案馆的深处，还保存着一些特殊的录音——那些被标记为"非结构性回响"的声音片段。它们无法被归类为任何已知的音乐形式，却能在听者心中引发强烈的情感共鸣。有人说，这些声音是文明灵魂的直接表达，是超越语言和逻辑的纯粹意识流动。

目前，世界唱片项目仍在持续收集和整理中。每当有新的子世界诞生，或是现有世界产生文明变迁，都会有新的音乐作品被发现和记录。这个永不停歇的收集过程，本身就是对文明创造力的最好见证。`,
    image: '/images/world/bg3.png',
    color: 'from-green-600 to-teal-600',
    accentColor: 'text-green-400',
    tags: ['音乐档案', '声音记忆', '文明印记', '情感频率'],
    sections: [
      {
        title: '档案概述',
        content: '世界唱片档案馆收录了中转站世界诞生以来的所有音乐作品与声音记忆，记录着各个文明阶段的精神特征。'
      },
      {
        title: '收录范围',
        content: '从母世界恒稳纪元的算法生成音乐，到心流计划的实验性声响，再到各个子世界自然演化出的民谣、史诗与哀歌。'
      },
      {
        title: '特殊录音',
        content: '档案馆深处保存着被标记为"非结构性回响"的声音片段，它们是文明灵魂的直接表达，超越语言和逻辑的纯粹意识流动。'
      },
      {
        title: '持续收集',
        content: '项目仍在持续进行中，每当有新的子世界诞生或文明变迁，都会有新的音乐作品被发现和记录。'
      }
    ]
  }
]

export default function MediaSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isDetailView, setIsDetailView] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // 鼠标跟踪效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleCardClick = (index: number) => {
    setSelectedIndex(index)
    setIsDetailView(true)
  }

  const handleBackToGrid = () => {
    setIsDetailView(false)
  }

  const handlePrevious = () => {
    setSelectedIndex(prev => prev > 0 ? prev - 1 : mediaContent.length - 1)
  }

  const handleNext = () => {
    setSelectedIndex(prev => prev < mediaContent.length - 1 ? prev + 1 : 0)
  }

  return (
    <section className="h-full w-full relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* 动态背景效果 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{type: "spring", stiffness: 50, damping: 30}}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.01,
            y: -mousePosition.y * 0.01,
          }}
          transition={{type: "spring", stiffness: 50, damping: 30}}
        />
      </div>



      {/*shadow-2xl shadow-ak-primary/5*/}
      {/*overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-ak-primary/30*/}
      {/**/}

      {/*<div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">*/}
      {/*  <div className="relative w-full h-full z-10">*/}

      {/*  </div>*/}
      {/*</div>*/}
      <AnimatePresence mode="wait">
        {!isDetailView ? (
          // 网格视图 - 现代化卡片布局
            <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 overflow-hidden z-50">
              <div className="relative w-full h-full z-10 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-ak-primary/30 flex items-center justify-center">
                <motion.div key="grid" className="relative z-10 p-8" initial={{opacity: 0}}
                            animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.6}}>{/* 页面标题 */}
                  <motion.div
                    className="text-center mb-4"
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                  >
                    <div className="inline-block">
                      <motion.h1
                        className="text-6xl font-bold text-white mb-4 tracking-tight"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                      >
                        WORLD
                      </motion.h1>
                      <motion.div
                        className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-2"
                        initial={{scaleX: 0}}
                        animate={{scaleX: 1}}
                        transition={{delay: 0.5, duration: 0.8}}
                      />
                    </div>
                  </motion.div>

                  {/* 卡片网格 */}
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {mediaContent.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="group cursor-pointer"
                          initial={{opacity: 0, y: 50}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.6, delay: index * 0.1}}
                          whileHover={{y: -10}}
                          onClick={() => handleCardClick(index)}
                        >
                          <div
                            className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 group-hover:border-cyan-400/50 transition-all duration-500">
                            {/* 背景图片 */}
                            <div className="absolute inset-0">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                priority={index === 0}
                              />
                              <div
                                className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-10 group-hover:opacity-70 transition-opacity duration-500`}/>
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                            </div>

                            {/* 内容 */}
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                              <div>
                                <motion.div
                                  className="text-white/80 text-xs font-mono mb-2 tracking-wider"
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{delay: 0.8 + index * 0.1}}
                                >
                                  {item.category} • {item.year}
                                </motion.div>
                                <motion.h3
                                  className="text-white text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300"
                                  initial={{opacity: 0, x: -20}}
                                  animate={{opacity: 1, x: 0}}
                                  transition={{delay: 0.9 + index * 0.1}}
                                >
                                  {item.title}
                                </motion.h3>
                                <motion.p
                                  className={`${item.accentColor} text-sm mb-3 font-medium`}
                                  initial={{opacity: 0, x: -20}}
                                  animate={{opacity: 1, x: 0}}
                                  transition={{delay: 1.0 + index * 0.1}}
                                >
                                  {item.subtitle}
                                </motion.p>
                              </div>

                              <div>
                                <motion.p
                                  className="text-white/80 text-sm leading-relaxed mb-4"
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  transition={{delay: 1.1 + index * 0.1}}
                                >
                                  {item.description}
                                </motion.p>

                                {/* 标签 */}
                                <motion.div
                                  className="flex flex-wrap gap-2"
                                  initial={{opacity: 0, y: 10}}
                                  animate={{opacity: 1, y: 0}}
                                  transition={{delay: 1.2 + index * 0.1}}
                                >
                                  {item.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/20"
                                    >
                            {tag}
                          </span>
                                  ))}
                                </motion.div>
                              </div>

                              {/* 悬停时显示的箭头 */}
                              <motion.div
                                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                                whileHover={{scale: 1.1}}
                              >
                                <ChevronRight className="w-4 h-4 text-white"/>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
        ) : (
          // 详情视图 - 重新设计的滚动布局
          <motion.div key="detail" className="h-full w-full relative bg-black" initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}} transition={{duration: 0.5}}>
            {/* 全屏背景 */}
            <div className="absolute inset-0">
              <Image
                src={mediaContent[selectedIndex].image}
                alt={mediaContent[selectedIndex].title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${mediaContent[selectedIndex].color} opacity-30`}></div>
              <div className="absolute inset-0 bg-black/75"></div>
            </div>

            {/* 可滚动内容区域 */}
            <div className="absolute inset-0 pl-0 pr-52 pt-20 pb-10 z-50">
              <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40">

                {/* 内容容器 */}
                <div className="min-h-full px-8 lg:px-16 py-8">
                  <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedIndex}
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -50}}
                        transition={{duration: 0.8}}
                        className="space-y-8"
                      >
                        {/* 头部信息 */}
                        <div className="space-y-6">
                          {/* 分类标签 */}
                          <motion.div
                            className="text-white/80 text-sm font-mono tracking-wider"
                            initial={{opacity: 0, x: -30}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.2}}
                          >
                            {mediaContent[selectedIndex].category} • {mediaContent[selectedIndex].year}
                          </motion.div>

                          {/* 主标题 */}
                          <motion.h1
                            className="text-4xl lg:text-6xl font-bold text-white tracking-tight"
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                          >
                            {mediaContent[selectedIndex].title}
                          </motion.h1>

                          {/* 副标题 */}
                          <motion.h2
                            className={`text-2xl lg:text-3xl font-medium ${mediaContent[selectedIndex].accentColor}`}
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4}}
                          >
                            {mediaContent[selectedIndex].subtitle}
                          </motion.h2>

                          {/* 装饰线 */}
                          <motion.div
                            className={`w-32 h-1 bg-gradient-to-r ${mediaContent[selectedIndex].color}`}
                            initial={{scaleX: 0}}
                            animate={{scaleX: 1}}
                            transition={{delay: 0.5, duration: 0.8}}
                          />

                          {/* 标签 */}
                          <motion.div
                            className="flex flex-wrap gap-3"
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.6}}
                          >
                            {mediaContent[selectedIndex].tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/20 text-sm font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </motion.div>
                        </div>

                        {/* 主要内容 */}
                        <motion.div
                          className="space-y-8"
                          initial={{opacity: 0, y: 30}}
                          animate={{opacity: 1, y: 0}}
                          transition={{delay: 0.7}}
                        >
                          {/* 简介 */}
                          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-4">概述</h3>
                            <p className="text-white/80 text-lg leading-relaxed">
                              {mediaContent[selectedIndex].description}
                            </p>
                          </div>

                          {/* 详细内容 */}
                          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-6">详细内容</h3>
                            <div className="prose prose-invert max-w-none">
                              <div className="text-white/80 text-base leading-relaxed whitespace-pre-line">
                                {mediaContent[selectedIndex].fullDescription}
                              </div>
                            </div>
                          </div>

                          {/* 章节内容（如果有的话） */}
                          {mediaContent[selectedIndex].sections && (
                            <div className="space-y-6">
                              <h3 className="text-xl font-semibold text-white">章节内容</h3>
                              {mediaContent[selectedIndex].sections.map((section, index) => (
                                <motion.div
                                  key={index}
                                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                                  initial={{opacity: 0, y: 20}}
                                  animate={{opacity: 1, y: 0}}
                                  transition={{delay: 0.8 + index * 0.1}}
                                >
                                  <h4 className={`text-lg font-semibold mb-4 ${mediaContent[selectedIndex].accentColor}`}>
                                    {section.title}
                                  </h4>
                                  <p className="text-white/80 leading-relaxed">
                                    {section.content}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>

                        {/* 底部间距 */}
                        <div className="h-20"></div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* 固定导航控制 */}
            <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[60]">
              <motion.div
                className="flex items-center space-x-6 bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-2xl"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.8}}
              >
                <motion.button
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                  onClick={handlePrevious}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}
                >
                  <ChevronLeft className="w-5 h-5 text-white"/>
                </motion.button>

                <div className="flex space-x-2">
                  {mediaContent.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === selectedIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                      }`}
                      onClick={() => setSelectedIndex(index)}
                    />
                  ))}
                </div>

                <motion.button
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                  onClick={handleNext}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}
                >
                  <ChevronRight className="w-5 h-5 text-white"/>
                </motion.button>
              </motion.div>
            </div>

            {/* 固定返回按钮 */}
            <motion.button
              className="fixed top-24 right-60 flex items-center space-x-3 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/30 hover:border-white/50 px-6 py-3 rounded-full transition-all duration-300 z-[60] shadow-2xl"
              onClick={handleBackToGrid}
              initial={{opacity: 0, y: -20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.5}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
            >
              <ArrowLeft className="w-4 h-4 text-white"/>
              <span className="text-white font-medium">返回</span>
            </motion.button>

            {/* 固定项目计数器 */}
            <motion.div
              className="fixed top-24 left-8 text-white/80 font-mono text-sm z-[60] bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-2xl"
              initial={{opacity: 0, x: -20}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: 0.5}}
            >
              {String(selectedIndex + 1).padStart(2, '0')} / {String(mediaContent.length).padStart(2, '0')}
            </motion.div>
          </motion.div>
          )}
      </AnimatePresence>

    </section>
  )
}
