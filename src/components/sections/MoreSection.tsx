'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react'

const moreContent = [
  {
    id: 'evercall-rules',
    title: 'Evercall_玩法说明',
    titleEn: 'EVERCALL RULES',
    description: '专为【深度陪伴】打造的拟人化 AI 数字人体验系统，Live2D动态表现、长期记忆、情绪识别、真实对话节奏。',
    image: '/images/more/bg3.jpg',
    icon: '/images/more/bg3.jpg',
    backgroundImage: '/images/more/bg3.jpg',
    tabs: [
      {
        id: 'overview',
        title: '什么是 Evercall？',
        content: '它是一款专为【深度陪伴】打造的拟人化 AI 数字人体验系统，Live2D动态表现、长期记忆、情绪识别、真实对话节奏，让你在虚拟世界中，拥有一个只属于你的她。',
        image: '/images/more/bg3.jpg'
      },
      {
        id: 'features',
        title: '核心功能',
        content: '1. 高拟真对话系统：支持多轮上下文记忆、情绪识别、语速调节与自然断句。\n2. 情感陪伴机制：内建陪伴节奏（早安、午间、晚安等）、节日与纪念日互动。\n3. 个性化定制：支持角色性格选择、声音风格、着装搭配、场景模式自定义。\n4. 长期记忆库：可记录与用户的对话、事件、偏好与变化，持续成长。\n5. 表情与动作：同步表情包、Live2D动作演绎，打造沉浸互动体验。\n6. 交互场景：您的虚拟伙伴既可以出现在其专属场景，也可以直接出现在您的桌面上。',
        image: '/images/more/bg3.jpg'
      },
      {
        id: 'audience',
        title: '适用人群',
        content: '- 喜欢二次元拟人角色与情感互动的用户\n- 希望获得情绪出口或情感价值人群\n- 热爱体验前沿AI技术与数字人互动方式的探索者',
        image: '/images/more/bg3.jpg'
      },
      {
        id: 'goal',
        title: 'Evercall 的目标',
        content: '我们希望通过Evercall，在数字时代重新定义"陪伴"的意义。让每个用户在虚拟世界中，也能感受到被理解、被回应与被珍惜的情感连接。',
        image: '/images/more/bg3.jpg'
      }
    ]
  },
  {
    id: 'privacy-policy',
    title: '隐私政策和服务条款',
    titleEn: 'PRIVACY POLICY & TERMS',
    description: 'EVERCALL 隐私政策和服务条款，保护用户权益，规范服务使用，确保安全合规的使用体验。',
    image: '/images/more/bg2.webp',
    icon: '/images/more/bg2.webp',
    backgroundImage: '/images/more/bg2.webp',
    tabs: [
      {
        id: 'privacy-overview',
        title: '隐私政策概述',
        content: `本隐私政策自 2025 年 8 月 27 日起生效。

本隐私政策描述了EVERCALL从您那里收集和处理的关于您的信息类型。除下述情况外，本政策适用于 EVERCALL 提供并链接到本政策的所有网站、移动应用程序和任何其他电子/数字产品或其他服务，以及我们的线下服务（统称为"服务"）。

我们致力于保护您的隐私权益，确保信息安全。本政策中使用的未定义大写术语具有 EVERCALL 服务条款中规定的含义。

如果您对我们的隐私政策或信息惯例有任何疑问，请通过官方渠道联系我们。`,
        image: '/images/more/bg2.webp'
      },
      {
        id: 'data-collection',
        title: '信息收集与使用',
        content: `我们收集的信息类型：

• 您直接提供的信息：
  - 标识符：姓名、电子邮件地址、电话号码、显示名称或用户名
  - 人口统计信息：出生日期和一般地理位置信息
  - 兴趣偏好：如"体育"或"写作"等类别
  - 财务信息：通过支付处理供应商收集的支付信息
  - 提交内容：聊天通信、发布的图像或视频、传记描述和共享角色
  - 语音数据：您的语音录音（如果您选择使用语音功能）

• 自动收集的信息：
  - 设备信息、使用记录、浏览行为
  - Cookie、网络信标和其他跟踪技术收集的数据

• 其他来源信息：
  - 其他用户推荐时的姓名和联系方式
  - 第三方平台的公开信息

我们使用这些信息来：提供、管理和运营服务；生成和分析服务使用情况；根据您的偏好定制服务；与您沟通；分析、维护、改进服务；开发新功能和服务；处理付款；检测和防止欺诈等。`,
        image: '/images/more/bg2.webp'
      },
      {
        id: 'data-protection',
        title: '数据保护与披露',
        content: `数据披露情况：

我们在以下情况下披露信息：
• 供应商和服务提供商：向需要访问信息以代表我们开展工作的第三方披露
• 安全和保护：为保护EVERCALL或其他方的权利、财产或人身安全
• 法律要求：遵守执法、法律或监管程序
• 业务转让：在合并、出售资产或业务收购过程中
• 经您同意或根据您的指示进行的其他披露

您的权利：
• 可以通过账户个人资料页面删除您的账户
• 可以验证、更正、更新或删除您的某些信息
• 可以取消订阅营销电子邮件
• 根据您居住的地方，您可能拥有特定的隐私权利

数据保留：
我们会在处理信息的目的所需的时间内保留您的信息，除非法律要求更短的保留期限。保留时间取决于我们收集和使用信息的目的以及您的选择。`,
        image: '/images/more/bg2.webp'
      },
      {
        id: 'children-privacy',
        title: '儿童隐私保护',
        content: `EVERCALL 严格遵守《未成年人保护法》《网络安全法》《个人信息保护法》等国家法规。

年龄限制政策：
• 本平台不向未满13周岁的儿童开放注册与服务
• 14周岁以下用户需经监护人书面同意方可使用服务
• 未满18岁用户将自动进入"青少年保护模式"，并受到功能与内容限制

保护措施：
• 我们将根据法律法规对用户身份进行严格验证
• 对未成年人用户实施特殊的内容过滤和时间管理
• 限制未成年人用户的付费功能和社交互动
• 提供家长监护工具和举报机制

我们保留在发现违规行为时立即终止服务的权利。如发现未成年人违规使用，我们将及时联系监护人并采取相应保护措施。

敏感个人信息提醒：
敏感个人信息不是使用服务所必需的，请不要在您与我们或服务的互动中包含任何敏感个人信息。`,
        image: '/images/more/bg2.webp'
      },
      {
        id: 'terms-service',
        title: '服务条款',
        content: `用户注册与账户安全：
• 注册时必须提供准确和完整的信息
• 您有责任维护密码和账户的机密性
• 对账户下发生的所有活动承担责任
• 发现未经授权使用时应立即通知我们

用户行为规范：
禁止提交以下内容：
• 侵犯知识产权或其他专有权利的内容
• 包含病毒或恶意代码的内容
• 威胁、辱骚扰、侵权或欺凌的内容
• 过度暴力或描绘严重暴力行为的内容
• 诽谤、诽谤或可验证虚假的内容
• 基于种族、民族、性别、宗教等的仇恨言论
• 淫秽或色情内容
• 构成性骚扰的内容
• 涉及未成年人性剥削或性虐待的内容
• 美化自残、自杀或饮食失调的内容
• 宣扬恐怖主义或暴力极端主义的内容

知识产权保护：
• 您保留对提交内容的所有权
• 授予EVERCALL使用、修改、分发内容的许可
• 尊重他人的知识产权
• 我们保留删除违规内容的权利`,
        image: '/images/more/bg2.webp'
      },
      {
        id: 'contact-support',
        title: '联系与支持',
        content: `联系方式：
如果您对我们的隐私政策、服务条款或信息惯例有任何疑问，请通过以下方式联系我们：

• 官方网站：访问EVERCALL官方网站
• 帮助中心：通过帮助中心提交问题
• 电子邮件：发送邮件至官方邮箱
• 在线客服：通过官方渠道联系客服团队

投诉与举报：
• 使用角色页面的举报功能报告不当内容
• 通过帮助中心的"提交票证"表格举报内容
• 我们会及时处理所有投诉并采取适当措施

政策更新：
我们可能会不时更新本政策。如果我们对本政策进行重大更改，我们将根据法律要求向您发出适当的通知，例如通过电子邮件或在我们的网站或移动应用程序上的显著位置发布。

继续使用服务，即表示您确认已阅读并理解本政策的最新版本。

第三方链接：
服务可能包含指向第三方网站或服务的链接。我们不对这些网站或服务的内容或做法负责。第三方对您的信息的收集、使用和披露将受第三方网站或服务的隐私政策的约束。`,
        image: '/images/more/bg2.webp'
      }
    ]
  },
  {
    id: 'animation-demo',
    title: '动画演示',
    titleEn: 'ANIMATION DEMO',
    description: 'EVERCALL 动画演示展示，体验 Live2D 动态表现和情感互动的魅力，感受虚拟陪伴的真实体验。',
    image: '/images/more/bg.png',
    icon: '/images/more/bg.png',
    backgroundImage: '/images/more/bg.png',
    tabs: [
      {
        id: 'live2d-demo',
        title: 'Live2D 演示',
        content: '这里放演示动画 - 体验 EVERCALL 的 Live2D 动态表现技术，观看虚拟角色的自然动作和表情变化，感受真实的互动体验。',
        image: '/images/more/bg.png'
      },
      {
        id: 'interaction-demo',
        title: '互动演示',
        content: '展示 EVERCALL 的情感互动功能，包括语音对话、情绪识别、个性化回应等核心特性，让您提前体验深度陪伴的魅力。',
        image: '/images/more/bg.png'
      },
      {
        id: 'customization-demo',
        title: '定制演示',
        content: '演示角色个性化定制功能，包括外观设计、性格设定、声音风格等多维度自定义选项，打造专属于您的虚拟伙伴。',
        image: '/images/more/bg.png'
      },
      {
        id: 'scene-demo',
        title: '场景演示',
        content: '展示多样化的交互场景，从专属房间到桌面陪伴，体验不同环境下的虚拟陪伴模式，感受无处不在的温暖陪伴。',
        image: '/images/more/bg.png'
      }
    ]
  }
]

export default function MoreSection() {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [selectedContent, setSelectedContent] = useState<typeof moreContent[0] | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  const handleItemClick = (item: typeof moreContent[0]) => {
    setSelectedContent(item)
    setActiveTab(0)
    setViewMode('detail')
  }

  const handleBack = () => {
    setViewMode('list')
    setSelectedContent(null)
    setActiveTab(0)
  }

  const handleTabChange = (index: number) => {
    setActiveTab(index)
  }

  const handlePrevTab = () => {
    if (selectedContent) {
      setActiveTab((prev) => prev > 0 ? prev - 1 : selectedContent.tabs.length - 1)
    }
  }

  const handleNextTab = () => {
    if (selectedContent) {
      setActiveTab((prev) => prev < selectedContent.tabs.length - 1 ? prev + 1 : 0)
    }
  }

  return (
    <section className="w-full h-full relative overflow-hidden">

      <div className="absolute inset-0 pl-0 pr-0 lg:pr-52 pt-24 lg:pt-20 pb-10 overflow-hidden z-50">
        <div className="relative w-full h-full z-[20]">
          <AnimatePresence mode="wait">
            {viewMode === 'list' ? (
              // 列表视图 - 移动端适配：垂直布局，桌面端水平布局
              <motion.div
                key="list"
                className="h-full relative grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0 lg:grid-rows-1 p-4 lg:p-0 lg:-mt-20 overflow-y-auto lg:overflow-hidden"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
              >
                {/* 背景 */}
                {/*<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"/>*/}

                {moreContent.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className="group relative h-64 lg:h-full overflow-hidden cursor-pointer rounded-lg lg:rounded-none"
                    onClick={() => handleItemClick(item)}
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: index * 0.1}}
                    whileHover={{scale: 1.00}}
                    whileTap={{scale: 0.95}}
                  >
                    {/* 背景图片 */}
                    <div className="absolute inset-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div
                        className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"/>
                    </div>

                    {/* 内容 - 移动端适配 */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-4 lg:p-6 text-left">
                      <h3
                        className="text-lg lg:text-2xl font-bold text-white/80 mb-2 group-hover:text-ak-secondary transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-300 text-xs lg:text-sm font-mono tracking-wider mb-3 lg:mb-4">
                        {item.titleEn}
                      </p>

                      <div className="flex items-center text-ak-secondary text-xs lg:text-sm">
                        <span>VIEW MORE</span>
                        <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              // 详情视图
              <motion.div
                key="detail"
                className="h-full relative z-[20]"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
              >
                {selectedContent && (
                  <>
                    {/* 全屏背景图 */}
                    <div className="fixed inset-0">
                      <Image
                        src={selectedContent.tabs[activeTab]?.image || selectedContent.backgroundImage || selectedContent.image}
                        alt={selectedContent.title}
                        fill
                        className="object-cover opacity-70"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* 内容区域 - 移动端适配：垂直布局 */}
                    <div className="relative z-10 h-full flex flex-col lg:flex-row overflow-hidden">
                      {/* 主要内容 - 移动端全宽，桌面端左侧 */}
                      <div className="flex-1 flex items-start px-4 lg:px-12 py-6 lg:py-16 pb-20 lg:pb-28 overflow-y-auto max-h-screen">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${selectedContent.id}-${activeTab}`}
                            className="max-w-2xl w-full"
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 50}}
                            transition={{duration: 0.6}}
                          >
                            {/* 主标题 - 移动端适配 */}
                            <motion.div
                              className="mb-6 lg:mb-8"
                              initial={{opacity: 0, y: 20}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.2}}
                            >
                              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white/80 mb-3 lg:mb-4 leading-tight">
                                {selectedContent.titleEn}
                              </h1>
                              <h2 className="text-lg sm:text-xl lg:text-2xl text-ak-secondary mb-4 lg:mb-6">
                                {selectedContent.title}
                              </h2>
                              <div className="w-16 lg:w-20 h-1 bg-ak-secondary shadow-lg shadow-ak-secondary/50"/>
                            </motion.div>

                            {/* Tab内容 - 移动端适配 */}
                            <motion.div
                              className="space-y-4 lg:space-y-6 mb-6 lg:mb-8"
                              initial={{opacity: 0, y: 20}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.4}}
                            >
                              <h3 className="text-xl lg:text-2xl font-bold text-white/80 mb-3 lg:mb-4">
                                {selectedContent.tabs[activeTab]?.title}
                              </h3>
                              <div className="bg-black/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 lg:p-6">
                                <div className="text-gray-300 text-sm lg:text-lg leading-relaxed whitespace-pre-line">
                                  {selectedContent.tabs[activeTab]?.content}
                                </div>
                              </div>
                            </motion.div>

                            {/* 上下切换按钮 */}
                            {/*<motion.div
                              className="flex space-x-4"
                              initial={{opacity: 0, y: 20}}
                              animate={{opacity: 1, y: 0}}
                              transition={{delay: 0.6}}
                            >
                              <motion.button
                                onClick={handlePrevTab}
                                className="bg-ak-secondary hover:bg-ak-secondary/80 text-white/80 px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg shadow-ak-secondary/30 hover:shadow-ak-secondary/50 font-medium flex items-center space-x-2"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                              >
                                <ChevronUp className="w-4 h-4" />
                                <span>上</span>
                              </motion.button>
                              <motion.button
                                onClick={handleNextTab}
                                className="bg-transparent hover:bg-white/10 text-white/80 border border-gray-400 hover:border-white px-8 py-3 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                              >
                                <ChevronDown className="w-4 h-4" />
                                <span>下</span>
                              </motion.button>
                            </motion.div>*/}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Tab导航 - 移动端水平滚动，桌面端右侧垂直 */}
                      <div className="w-full lg:w-80 flex lg:flex-col justify-start px-4 lg:pr-8 py-4 lg:py-16 max-h-screen overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto">
                        <motion.div
                          className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-4 min-w-max lg:min-w-0"
                          initial={{opacity: 0, x: 50}}
                          animate={{opacity: 1, x: 0}}
                          transition={{duration: 0.6, delay: 0.3}}
                        >
                          <div className="hidden lg:block mb-6">
                            <h4 className="text-white/80 text-lg font-bold mb-2">内容导航</h4>
                            <div className="w-12 h-0.5 bg-ak-secondary"></div>
                          </div>
                          {selectedContent.tabs.map((tab, index) => (
                            <motion.button
                              key={tab.id}
                              className={`w-auto lg:w-full text-left p-3 lg:p-4 rounded-lg border transition-all duration-300 backdrop-blur-sm whitespace-nowrap lg:whitespace-normal ${activeTab === index
                                ? 'bg-ak-secondary/20 border-ak-secondary text-white/80 shadow-lg shadow-ak-secondary/20'
                                : 'bg-black/30 border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white/80 hover:bg-black/40'
                              }`}
                              onClick={() => handleTabChange(index)}
                              initial={{opacity: 0, x: 20}}
                              animate={{opacity: 1, x: 0}}
                              transition={{duration: 0.5, delay: 0.5 + index * 0.1}}
                              whileHover={{scale: 1.02}}
                              whileTap={{scale: 0.98}}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 lg:space-x-3">
                                  <div className={`w-2 h-2 rounded-full ${activeTab === index ? 'bg-ak-secondary' : 'bg-gray-500'}`}></div>
                                  <span className="font-medium text-sm lg:text-base">{tab.title}</span>
                                </div>
                                <ChevronRight className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${activeTab === index ? 'text-ak-secondary' : ''} hidden lg:block`}/>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    {/* 返回按钮 - 移动端适配位置 */}
                    <motion.button
                      className="fixed z-20 top-20 right-4 lg:absolute lg:bottom-8 lg:right-8 lg:top-auto flex items-center space-x-2 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-gray-600 hover:border-gray-400 px-4 lg:px-6 py-2 lg:py-3 rounded-full lg:rounded transition-all duration-300 shadow-2xl"
                      onClick={handleBack}
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: 0.8}}
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                    >
                      <ArrowLeft className="w-4 h-4 text-gray-300"/>
                      <span className="text-gray-300 text-sm lg:text-base">返回</span>
                    </motion.button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
)
}
