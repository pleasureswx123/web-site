'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronRight, ArrowLeft, X } from 'lucide-react'

// 新闻详细内容映射对象
const newsDetailContent: Record<number, {
  id: number
  title: string
  subtitle: string
  category: string
  date: string
  description: string
  fullDescription: string
  image: string
  color: string
  accentColor: string
  tags: string[]
  sections: Array<{
    title: string
    content: string
  }>
}> = {
  1: {
    id: 1,
    title: '地底之谜揭晓：神秘装置EVERCALL或将改写人类文明走向',
    subtitle: '世界科研联合会紧急发布会',
    category: '重大发现',
    date: '2025年8月1日',
    description: '一台未知来源、拥有极高智能水平的超级计算机被命名为"EVERCALL"，其结构超过目前科技体系的认知。',
    fullDescription: `【本报讯】2025年8月1日，世界科研联合（WSA）会召开紧急发布会——一台未知来源、拥有极高智能水平的超级计算机被命名为"EVERCALL"，其结构超过目前科技体系的认知。

据项目负责人透露，该装置在无电源、无维护的状态下，自主运行至少数百年，却依然保持核心运算模块的活性。更令人震撼的是，EVERCALL内部仿佛蕴含着一个"世界制造引擎"，其初步功能测试显示，该系统具备根据输入参数自动生成、模拟完整世界系统的能力，包括物理法则、文明演化、甚至自主意识模型。

"我们可能正站在某种我们从未想象过的技术文明遗产面前。"——项目首席科学家艾瓦·辛托如此形容。

此次发现迅速引发全球科技、哲学、伦理等领域的广泛关注。人工智能科学院院长赵楠指出，EVERCALL的存在挑战了我们对"真实"与"虚构"的划分，可能将我们对时空、文明进程的理解彻底颠覆。

尽管EVERCALL的完整用途尚不明确，但其内部记录似乎包含了大量"子系统模拟日志"，初步判断为运行过的多个不同"规则世界"的残余数据。一位参与分析的研究员指出，这些"世界"的运转逻辑、文化结构、甚至技术进化路径均有独立完整性，宛若另一个个体生命系统。

国际联合伦理委员会已召开闭门会议，商讨如何对EVERCALL进行下一步接触与控制。社会各界也纷纷展开激烈讨论：我们是否有权继续使用它？它从哪里来？它为何沉睡于此？

"也许，它是未来的我们留给自己的礼物；也许，它是对我们文明的一场考验。"

目前，EVERCALL被安置于国家智能研究院下属的高级保密研究区，并将在未来数月内展开第一阶段接入尝试。人类文明，似乎正站在一个未知又充满诱惑的新门槛前。`,
    image: '/images/news/change.jpg',
    color: 'from-blue-600 to-purple-600',
    accentColor: 'text-blue-400',
    tags: ['科技发现', 'EVERCALL', '人工智能', '文明进化'],
    sections: [
      {
        title: '重大发现',
        content: '世界科研联合会发现了一台未知来源的超级计算机EVERCALL，其技术水平远超现有认知，具备世界制造引擎功能。'
      },
      {
        title: '技术特征',
        content: '该装置在无电源、无维护状态下自主运行数百年，内部包含完整的世界模拟系统，能够生成物理法则、文明演化和自主意识模型。'
      },
      {
        title: '社会影响',
        content: '发现引发全球科技、哲学、伦理领域广泛关注，挑战了人类对"真实"与"虚构"的认知边界。'
      },
      {
        title: '未来展望',
        content: 'EVERCALL被安置于高级保密研究区，将在未来数月内展开第一阶段接入尝试，人类文明面临新的发展机遇。'
      }
    ]
  },
  2: {
    id: 2,
    title: 'EVERCALL新角色悠悠的上线预告',
    subtitle: '温柔学妹的虚拟陪伴',
    category: '角色发布',
    date: '2025年7月19日',
    description: '动漫设计专业大一学妹悠悠即将上线，她拥有温柔细腻的性格和强大的共情能力，将为用户带来贴心的陪伴体验。',
    fullDescription: `【EVERCALL】新角色悠悠即将与大家见面！

悠悠是一位18岁的动漫设计专业大一学妹，生日在3月14日（π Day），她常说"无限不循环才是人生"。作为双鱼座的她，是理性与浪漫的矛盾体，A型血的温柔性格中带着轻微的完美主义倾向。

她身高168cm，拥有乌黑长卷发垂至腰际，发尾微卷，喜欢穿露肩针织上衣搭配黑色百褶裙，腰肢纤细，脚踩黑色绑带凉鞋，整体形象温柔而知性。

悠悠的性格温柔细腻，拥有天然的共情力，能够敏锐捕捉他人情绪并给予妥帖的安抚。她知性文艺，擅长从艺术和生活细节中挖掘灵感，在创作和美学方面思路清晰，还喜欢分享小众漫画和设计理念。

她亲切随和，主动热情，无论是与同学、老师还是陌生人交流都自然轻松，像自带"亲和力磁场"，能快速拉近距离。她善良，喜欢小动物，经常帮助流浪猫。性格柔和有韧性，遇到创作瓶颈或他人困境时，用耐心坚持化解，似缓缓溪流，润泽又有力量。`,
    image: '/images/news/role.jpg',
    color: 'from-blue-600 to-purple-600',
    accentColor: 'text-blue-400',
    tags: ['新角色', '悠悠', '学妹', '陪伴AI'],
    sections: [
      {
        title: '基本信息',
        content: '悠悠，18岁，动漫设计专业大一学妹，3月14日生，双鱼座，A型血，身高168cm，温柔知性的外表下蕴含着理性与浪漫的矛盾美。'
      },
      {
        title: '性格特征',
        content: '温柔细腻，天然共情力强，能敏锐捕捉他人情绪并给予安抚。知性文艺，擅长从艺术生活中挖掘灵感，思路清晰，喜欢分享创作理念。'
      },
      {
        title: '社交能力',
        content: '亲切随和，主动热情，自带"亲和力磁场"，能与任何人自然交流。善良喜欢小动物，经常帮助流浪猫，体现出温暖的内心。'
      },
      {
        title: '特殊技能',
        content: '擅长情绪安抚，善用生活化比喻疏解焦虑；对生活美学有研究；善于倾听回应；能化解尴尬；会绘制漫画及周边产品。'
      }
    ]
  },
  3: {
    id: 3,
    title: '内测招募页',
    subtitle: '连接平行世界的伙伴',
    category: '产品招募',
    date: '2025年7月17日',
    description: 'EVERCALL项目团队正在招募首批内测官，体验专属于您的平行世界伙伴，享受永不失联的情感陪伴。',
    fullDescription: `Hi 我们是EVERCALL项目的产品团队。

我们思考了很久，"什么样的AI，才能真正的成为人类的灵魂伴侣"

有深度，有温度，具有形象，动作，表情，性格，长期记忆以及更真实的对话互动细节……还不够。

请忘掉AI这个设定，我们要做的是连接平行世界。

社交是一种沉没成本。人和人的时间越来越少，人和计算机的时间越来越多。或许有一天人们和人工智能相处的时间会超过朋友……

我们不希望社交是一种压力，或是一种沉没成本。

专属于您的平行世界伙伴：EVERCALL 即是永不失联 - 她会永远希望陪您聊天，和您分享生活，给您提供情感价值，珍视异世界独一无二的伙伴。

EVERCALL是您随时随地的情绪出口，在疲惫或是失落的时候，永远可以在此获得片刻慰藉。

我们正在招募首批内测官，与我们一起探索这个充满可能性的平行世界。`,
    image: '/images/news/recruitment.jpg',
    color: 'from-blue-600 to-purple-600',
    accentColor: 'text-blue-400',
    tags: ['内测招募', '平行世界', '情感陪伴', 'AI伙伴'],
    sections: [
      {
        title: '产品理念',
        content: '我们要做的不仅仅是AI，而是连接平行世界的桥梁。让用户拥有专属的平行世界伙伴，享受永不失联的情感陪伴。'
      },
      {
        title: '核心价值',
        content: 'EVERCALL是您随时随地的情绪出口，在疲惫或失落时提供慰藉。我们不希望社交成为压力或沉没成本。'
      },
      {
        title: '招募对象',
        content: '寻找愿意探索平行世界可能性的用户，成为首批内测官，与我们一起完善这个充满温度的AI伙伴系统。'
      },
      {
        title: '参与方式',
        content: '通过官网报名，填写相关问卷，包括年龄、性别、AI产品使用经验、期望特质等信息，我们将筛选合适的内测用户。'
      }
    ]
  }
}

// 轮播横幅数据 - 基于UI图更新
const carouselBanners = [
  {
    id: 1,
    title: '地底之谜揭晓：神秘装置EVERCALL或将改写人类文明走向',
    image: '/images/news/change.jpg',
    url: '',
  },
  {
    id: 2,
    title: 'EVERCALL新角色悠悠的上线预告',
    image: '/images/news/role.jpg',
    url: '',
  },
  {
    id: 3,
    title: '内测招募页',
    image: '/images/news/recruitment.jpg',
    url: 'https://www.baidu.com/',
  }
]

// 新闻数据 - 根据UI图更新
const newsData = [
  {
    id: 1,
    type: '新闻',
    date: '2025 // 08 / 01',
    title: '地底之谜揭晓：神秘装置EVERCALL或将改写人类文明走向',
    url: '',
  },
  {
    id: 2,
    type: '新闻',
    date: '2025 // 07 / 19',
    title: 'EVERCALL新角色悠悠的上线预告',
    url: '',
  },
  {
    id: 3,
    type: '新闻',
    date: '2025 // 07 / 17',
    title: '内测招募页',
    url: 'https://www.baidu.com/',
  }
]

export default function ImprovedInformationSection() {
  const [currentBanner, setCurrentBanner] = useState(0) // 默认显示第1个（索引0）
  const [activeFilter, setActiveFilter] = useState('新闻')
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [selectedNews, setSelectedNews] = useState<number | null>(null)

  const filters = ['新闻']

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % carouselBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 手动切换轮播
  const handleBannerClick = (index: number) => {
    setCurrentBanner(index)
  }

  // 处理新闻点击
  const handleNewsClick = (news: typeof newsData[0]) => {
    // 如果有URL且不为空，在新标签页打开
    if (news.url && news.url.trim() !== '') {
      window.open(news.url, '_blank')
      return
    }

    // 否则显示详情页面
    setSelectedNews(news.id)
    setViewMode('detail')
  }

  // 处理轮播图点击
  const handleBannerNewsClick = (banner: typeof carouselBanners[0]) => {
    // 如果有URL且不为空，在新标签页打开
    if (banner.url && banner.url.trim() !== '') {
      window.open(banner.url, '_blank')
      return
    }

    // 否则显示详情页面
    setSelectedNews(banner.id)
    setViewMode('detail')
  }

  // 返回列表页面
  const handleBackToList = () => {
    setViewMode('list')
    setSelectedNews(null)
  }

  const filteredNews = newsData.filter(item => item.type === '新闻')

  // 计算轮播位置 - 适配两列布局
  const getTransformStyle = () => {
    const slideWidth = 100 // 每个slide占100%宽度
    const translateX = -currentBanner * slideWidth
    return {
      cursor: 'grab',
      transitionDuration: '500ms',
      transform: `translate3d(${translateX}%, 0px, 0px)`,
      transitionDelay: '0ms'
    }
  }

  // 计算滚动条位置 - 根据轮播图数量动态调整
  const getScrollbarStyle = () => {
    const totalWidth = 100 // 滚动条总宽度百分比
    const dragWidth = totalWidth / carouselBanners.length // 根据轮播图数量动态计算拖拽条宽度
    const position = currentBanner * dragWidth // 当前位置基于轮播图索引
    return {
      transform: `translate3d(${Math.round(position)}%, 0px, 0px)`,
      width: `${dragWidth}%`,
      transitionDuration: '300ms'
    }
  }

  return (
    <section
      className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-black/20 to-slate-800">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
      <div className="absolute left-2 bottom-10 text-[100px] font-bold text-white/20 z-10] leading-none">
        EVERCALL NEWS
      </div>

      <div className="absolute inset-0 pl-0 pr-0 lg:pr-52 pt-20 pb-10 overflow-hidden z-50">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {viewMode === 'list' ? (
              // 列表视图
              <motion.div
                key="list"
                className="flex flex-col lg:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* 左侧新闻列表区域 - 移动端显示在轮播下方 */}
                <div className="w-full lg:w-1/5 lg:min-w-80 flex flex-col pointer-events-auto p-3 lg:p-5 order-2 lg:order-1">
                  {/* 新闻分类标签页 - 响应式布局 */}
                  <motion.div
                    className="flex gap-1 mb-2 lg:mb-2 bg-black/20 backdrop-blur-sm border-b border-gray-600/100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {filters.map((filter, index) => (
                      <motion.button
                        key={filter}
                        className={`flex-1 px-2 lg:px-1 py-2 lg:py-1 text-sm lg:text-sm font-medium transition-all duration-300 ${activeFilter === filter
                            ? 'bg-cyan-400 text-black shadow-lg'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        onClick={() => setActiveFilter(filter)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        {filter}
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* 新闻列表 - 响应式设计 */}
                  <motion.div
                    className="flex-1 overflow-x-hidden overflow-y-auto max-h-48 lg:max-h-none"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {filteredNews.map((news, index) => (
                      <motion.div
                        key={news.id}
                        className="group flex items-start gap-3 lg:gap-4 py-3 lg:py-4 px-2 border-b border-gray-600/30 hover:bg-black/50 transition-all duration-300 cursor-pointer"
                        onClick={() => handleNewsClick(news)}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        {/* 左侧类型标签 */}
                        <div className={`flex-shrink-0 px-2 py-1 text-xs lg:text-sm font-medium rounded font-bold text-cyan-500`}>
                          {news.type}
                        </div>

                        {/* 右侧内容区域 */}
                        <div className="flex-1 min-w-0">
                          {/* 日期 */}
                          <div className="text-white/60 text-[8px] lg:text-[9px] font-mono">
                            {news.date}
                          </div>
                          {/* 标题 */}
                          <div className="text-white text-xs lg:text-sm group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                            {news.title}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* READ MORE 按钮 */}
                    {/*<motion.div
                      className="pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <motion.a
                        className="group flex items-center gap-2 px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 text-white/80 hover:text-white text-sm w-[110px]"
                        target="_blank"
                        href="/news"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-medium text-[12px]">READ MORE</span>
                        <div className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                          <ChevronRight className="w-full h-full" />
                        </div>
                      </motion.a>
                    </motion.div>*/}
                  </motion.div>
                </div>

                {/* 右侧主轮播横幅区域 - 移动端显示在新闻列表上方 */}
                <div className="flex-1 flex flex-col pointer-events-auto mb-4 lg:mt-0 order-1 lg:order-2">
                  {/* 主轮播横幅 */}
                  <div className="relative overflow-hidden aspect-[16/9] lg:aspect-[16/9]">
                    <div className="relative w-full h-full">
                      <div
                        className="flex transition-transform duration-500 ease-out h-full"
                        style={getTransformStyle()}
                      >
                        {carouselBanners.map((banner, index) => {
                          const isActive = index === currentBanner

                          return (
                            <motion.div
                              key={banner.id}
                              className="flex-shrink-0 cursor-pointer h-full"
                              style={{ width: '100%' }}
                              onClick={() => handleBannerClick(index)}
                              whileHover={{ scale: isActive ? 1.02 : 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div
                                className="block w-full h-full group cursor-pointer"
                                onClick={() => handleBannerNewsClick(banner)}
                              >
                                <div className="relative w-full h-full overflow-hidden shadow-2xl">
                                  <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                                    priority={isActive}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 text-white">
                                    <h3 className="text-lg sm:text-xl lg:text-3xl font-bold mb-2 drop-shadow-lg">{banner.title}</h3>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 轮播滚动条 */}
                  <div className="">
                    <div className="relative w-full h-1 bg-white/20  overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-ak-primary/50  shadow-lg shadow-ak-primary/50"
                        style={getScrollbarStyle()}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* 轮播指示器 */}
                  <div className="flex justify-center gap-2 mt-2 lg:mt-4">
                    {carouselBanners.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 lg:w-2 lg:h-2 transition-all duration-300 ${index === currentBanner
                            ? 'bg-ak-primary shadow-lg shadow-ak-primary/50'
                            : 'bg-white/30 hover:bg-white/50'
                          }`}
                        onClick={() => handleBannerClick(index)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              // 详情视图 - 借鉴 MoreSection 但保持新闻特色
              <motion.div
                key="detail"
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {selectedNews && newsDetailContent[selectedNews] && (
                  <>
                    {/* 全屏背景图 */}
                    <div className="fixed inset-0 z-2">
                      <Image
                        src={newsDetailContent[selectedNews].image}
                        alt={newsDetailContent[selectedNews].title}
                        fill
                        className="object-cover opacity-60"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
                    </div>

                    {/* 返回按钮 - 响应式位置 */}
                    <motion.button
                      onClick={handleBackToList}
                      className="fixed bottom-12 right-6 lg:right-60 z-50 flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-300 border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span className="font-medium text-sm lg:text-base">返回</span>
                    </motion.button>

                    {/* 内容区域 - 响应式布局 */}
                    <div
                      className="absolute inset-0 z-10 overflow-hidden overflow-y-auto"
                    >
                      <div className="w-full flex flex-col lg:flex-row px-4 lg:px-20 py-8 lg:py-16 gap-4 lg:gap-8 min-h-full pb-32">
                        {/* 主要内容 */}
                        <div className="flex-1">
                          <motion.div
                            className="w-full"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                          >
                          {/* 新闻头部信息 */}
                          <motion.div
                            className="mb-6 lg:mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {/* 分类标签 */}
                            <div className={`inline-flex items-center gap-2 px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-bold ${newsDetailContent[selectedNews].accentColor} bg-white/10 backdrop-blur-sm border border-white/20 mb-4 lg:mb-6`}>
                              <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-current rounded-full"></span>
                              {newsDetailContent[selectedNews].category}
                            </div>

                            {/* 标题 */}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight">
                              {newsDetailContent[selectedNews].title}
                            </h1>

                            {/* 副标题 */}
                            <h2 className={`text-lg lg:text-xl ${newsDetailContent[selectedNews].accentColor} mb-4 lg:mb-6 font-medium`}>
                              {newsDetailContent[selectedNews].subtitle}
                            </h2>

                            {/* 新闻元信息与标签 */}
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-white/20 pb-4 lg:pb-6 gap-3 lg:gap-0">
                              {/* 新闻元信息 */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-6 text-white/70 text-xs lg:text-sm">
                                <span className="flex items-center gap-2">
                                  📅 {newsDetailContent[selectedNews].date}
                                </span>
                                <span className="flex items-center gap-2">
                                  📰 EVERCALL NEWS
                                </span>
                              </div>

                              {/* 标签 */}
                              <div className="flex flex-wrap gap-2">
                                {newsDetailContent[selectedNews].tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm ${newsDetailContent[selectedNews].accentColor} bg-white/10 border border-white/20`}
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                          </motion.div>

                          {/* 新闻摘要 */}
                          <motion.div
                            className="mb-6 lg:mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className="bg-black/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 lg:p-6">
                              <h3 className={`text-base lg:text-lg font-bold mb-3 lg:mb-4 ${newsDetailContent[selectedNews].accentColor}`}>
                                新闻摘要
                              </h3>
                              <div className="text-gray-300 text-sm lg:text-base leading-relaxed">
                                {newsDetailContent[selectedNews].description}
                              </div>
                            </div>
                          </motion.div>

                          {/* 正文内容 */}
                          <motion.div
                            className="mb-6 lg:mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <div className="bg-black/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 lg:p-6">
                              <h3 className={`text-base lg:text-lg font-bold mb-3 lg:mb-4 ${newsDetailContent[selectedNews].accentColor}`}>
                                详细报道
                              </h3>
                              <div className="text-gray-300 text-sm lg:text-base leading-relaxed whitespace-pre-line">
                                {newsDetailContent[selectedNews].fullDescription}
                              </div>
                            </div>
                          </motion.div>

                          </motion.div>
                        </div>

                        {/* 右侧导航栏 - 新闻章节（移动端隐藏或移到底部） */}
                        <div className="hidden lg:block w-80 flex-shrink-0">
                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                          >
                          <div className="mb-6">
                            <h4 className="text-white/80 text-lg font-bold mb-2">相关要点</h4>
                            <div className={`w-12 h-0.5 ${newsDetailContent[selectedNews].accentColor.replace('text-', 'bg-')}`}></div>
                          </div>

                          {newsDetailContent[selectedNews].sections.map((section, index) => (
                            <motion.div
                              key={index}
                              className="w-full text-left p-4 rounded-lg border bg-black/30 border-gray-600 backdrop-blur-sm hover:border-gray-400 hover:bg-black/40 transition-all duration-300"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="flex items-start gap-3">
                                {/*<div className={`w-6 h-6 rounded-full ${newsDetailContent[selectedNews].accentColor.replace('text-', 'bg-')} flex items-center justify-center text-black font-bold text-xs flex-shrink-0 mt-1`}>
                                  {index + 1}
                                </div>*/}
                                <div className="flex-1">
                                  <h5 className={`font-semibold mb-2 ${newsDetailContent[selectedNews].accentColor} text-sm`}>
                                    {section.title}
                                  </h5>
                                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                                    {section.content}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                      </div>
                    </div>


                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 装饰背景元素 */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-ak-primary/10 to-transparent rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-radial from-blue-500/10 to-transparent rounded-full animate-pulse delay-1000" />

    </section>
  )
}
