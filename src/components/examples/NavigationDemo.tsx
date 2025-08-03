'use client'

import { useState, useEffect } from 'react'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle, 
  Smartphone, 
  Palette, 
  Zap, 
  Shield, 
  Users,
  Volume2,
  Share2,
  User as UserIcon
} from 'lucide-react'

/**
 * 导航组件演示页面
 * 展示重构后的导航组件功能
 */
export default function NavigationDemo() {
  const [currentSection, setCurrentSection] = useState('index')

  // 模拟页面滚动时的section切换
  useEffect(() => {
    const sections = ['index', 'events', 'characters', 'preset', 'world', 'more']
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sections.length
      setCurrentSection(sections[currentIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Smartphone,
      title: '响应式设计',
      description: '完美适配桌面端和移动端，移动端使用Sheet侧边栏'
    },
    {
      icon: Palette,
      title: 'shadcn/ui 组件',
      description: '使用现代化的UI组件库，提供一致的设计语言'
    },
    {
      icon: Zap,
      title: '交互反馈',
      description: '集成Sonner Toast通知，提供即时的用户反馈'
    },
    {
      icon: Shield,
      title: '无障碍支持',
      description: '基于Radix UI，提供完整的键盘导航和屏幕阅读器支持'
    },
    {
      icon: Users,
      title: '用户体验',
      description: '简洁直观的界面、悬停效果和流畅的动画过渡'
    }
  ]

  const improvements = [
    '使用 Button 组件替代原生按钮',
    '使用 Dialog 替代自定义弹出层',
    '使用 Popover 实现社交媒体菜单',
    '使用 Sheet 实现移动端导航',
    '保持原有的纯文字导航设计',
    '移除多余的工具提示',
    '添加 Toast 通知反馈',
    '改进响应式布局',
    '增强无障碍支持',
    '统一设计系统'
  ]

  return (
    <div className="min-h-screen bg-ak-dark">
      {/* 重构后的导航组件 */}
      <OriginalNavigation currentSection={currentSection} />
      
      {/* 主要内容 */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* 标题区域 */}
          <div className="text-center space-y-6">
            <Badge variant="outline" className="border-ak-primary text-ak-primary">
              shadcn/ui 重构
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-ak-text font-ak-title">
              导航组件重构演示
            </h1>
            <p className="text-xl text-ak-text-secondary max-w-3xl mx-auto">
              使用 shadcn/ui 组件库重构的现代化导航组件，提供更好的用户体验和开发体验
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-ak-text-secondary">
              <span>当前激活页面:</span>
              <Badge variant="default" className="bg-ak-primary text-black">
                {currentSection.toUpperCase()}
              </Badge>
              <span className="text-xs opacity-60">(自动切换演示)</span>
            </div>
          </div>

          {/* 功能特性 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">重构后的功能特性</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                基于 shadcn/ui 组件库的现代化导航系统
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                      <div className="flex-shrink-0 w-10 h-10 bg-ak-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-ak-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-ak-text mb-2">{feature.title}</h3>
                        <p className="text-sm text-ak-text-secondary">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 组件使用说明 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 主要改进 */}
            <Card className="bg-ak-gray border-ak-border">
              <CardHeader>
                <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  主要改进点
                </CardTitle>
                <CardDescription className="text-ak-text-secondary">
                  相比原版本的重要提升
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-ak-text-secondary">{improvement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 交互演示 */}
            <Card className="bg-ak-gray border-ak-border">
              <CardHeader>
                <CardTitle className="text-ak-text font-ak-secondary">交互功能演示</CardTitle>
                <CardDescription className="text-ak-text-secondary">
                  尝试导航栏中的各种交互功能
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-ak-light-gray">
                    <Volume2 className="w-5 h-5 text-ak-primary" />
                    <div>
                      <p className="text-sm font-medium text-ak-text">音乐控制</p>
                      <p className="text-xs text-ak-text-secondary">点击音乐图标切换播放状态</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-ak-light-gray">
                    <Share2 className="w-5 h-5 text-ak-primary" />
                    <div>
                      <p className="text-sm font-medium text-ak-text">社交媒体</p>
                      <p className="text-xs text-ak-text-secondary">悬浮弹出社交媒体链接</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-ak-light-gray">
                    <UserIcon className="w-5 h-5 text-ak-primary" />
                    <div>
                      <p className="text-sm font-medium text-ak-text">用户中心</p>
                      <p className="text-xs text-ak-text-secondary">模态对话框形式的用户菜单</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-ak-border" />
                
                <div className="text-center">
                  <p className="text-sm text-ak-text-secondary mb-3">
                    在移动设备上查看响应式布局
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-ak-primary text-ak-primary hover:bg-ak-primary hover:text-black"
                    onClick={() => window.location.reload()}
                  >
                    刷新页面
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 技术栈 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">使用的技术栈</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                重构中使用的主要技术和组件
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  'shadcn/ui', 'Radix UI', 'Tailwind CSS', 'Framer Motion', 
                  'Lucide React', 'Sonner', 'TypeScript', 'Next.js'
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
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
