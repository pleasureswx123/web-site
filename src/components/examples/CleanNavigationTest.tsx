'use client'

import { useState } from 'react'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

/**
 * 简洁导航组件测试页面
 * 验证移除tooltip后的最终效果
 */
export default function CleanNavigationTest() {
  const [currentSection, setCurrentSection] = useState('index')

  const sections = [
    { id: 'index', name: '首页', color: 'bg-blue-500' },
    { id: 'events', name: '新闻', color: 'bg-green-500' },
    { id: 'characters', name: '角色', color: 'bg-purple-500' },
    { id: 'preset', name: '设定', color: 'bg-orange-500' },
    { id: 'world', name: '世界', color: 'bg-red-500' },
    { id: 'more', name: '更多内容', color: 'bg-gray-500' }
  ]

  return (
    <div className="min-h-screen bg-ak-dark">
      {/* 导航组件 */}
      <OriginalNavigation currentSection={currentSection} />

      {/* 主要内容 */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* 标题区域 */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-ak-primary text-ak-primary">
              最终版本
            </Badge>
            <h1 className="text-4xl font-bold text-ak-text font-ak-title">
              简洁导航组件
            </h1>
            <p className="text-xl text-ak-text-secondary max-w-2xl mx-auto">
              移除了多余的工具提示，保持简洁直观的用户界面
            </p>
          </div>

          {/* 当前状态 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                当前导航状态
              </CardTitle>
              <CardDescription className="text-ak-text-secondary">
                点击下方按钮切换不同的导航状态
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-ak-text-secondary">当前激活页面:</span>
                  <Badge variant="default" className="bg-ak-primary text-black">
                    {sections.find(s => s.id === currentSection)?.name || currentSection}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(section.id)}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        currentSection === section.id
                          ? 'border-ak-primary bg-ak-primary/10 text-ak-primary'
                          : 'border-ak-border bg-ak-light-gray text-ak-text-secondary hover:border-ak-primary/50 hover:text-ak-text'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${section.color}`}></div>
                        <span className="text-sm font-medium">{section.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 设计特点 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 简洁设计 */}
            <Card className="bg-ak-gray border-ak-border">
              <CardHeader>
                <CardTitle className="text-ak-text font-ak-secondary">简洁设计原则</CardTitle>
                <CardDescription className="text-ak-text-secondary">
                  遵循心流元素的设计美学
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-ak-text-secondary">纯文字导航，无多余图标</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-ak-text-secondary">双语显示，英文+中文</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-ak-text-secondary">移除多余的工具提示</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-ak-text-secondary">保持原有视觉层次</span>
                </div>
              </CardContent>
            </Card>

            {/* 功能特性 */}
            <Card className="bg-ak-gray border-ak-border">
              <CardHeader>
                <CardTitle className="text-ak-text font-ak-secondary">现代化功能</CardTitle>
                <CardDescription className="text-ak-text-secondary">
                  基于shadcn/ui的增强功能
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-ak-text-secondary">响应式移动端侧边栏</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-ak-text-secondary">社交媒体悬浮菜单</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-ak-text-secondary">用户中心模态对话框</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-ak-text-secondary">Toast通知反馈系统</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 交互说明 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">交互说明</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                尝试导航栏中的各种功能
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-2">🔊 音乐控制</h4>
                  <p className="text-ak-text-secondary">点击音乐图标切换播放状态，会显示Toast通知</p>
                </div>
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-2">🔗 社交媒体</h4>
                  <p className="text-ak-text-secondary">点击分享图标查看社交媒体链接菜单</p>
                </div>
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-2">👤 用户中心</h4>
                  <p className="text-ak-text-secondary">点击用户图标打开登录注册对话框</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 技术实现 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">技术实现</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                重构后使用的主要技术栈
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  'shadcn/ui', 'Radix UI', 'Framer Motion', 'Lucide React',
                  'Sonner', 'Tailwind CSS', 'TypeScript', 'Next.js'
                ].map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-ak-primary/10 text-ak-primary border-ak-primary/20"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                <p className="text-sm text-ak-text-secondary">
                  <strong className="text-ak-text">设计理念：</strong>
                  保持心流元素原有的简洁美学，同时融入现代化的交互体验。
                  移除了不必要的工具提示，让界面更加干净直观。
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
