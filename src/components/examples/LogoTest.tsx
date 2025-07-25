'use client'

import { useState } from 'react'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Image as ImageIcon, Type } from 'lucide-react'
import Image from 'next/image'

/**
 * Logo测试页面
 * 验证图片logo的显示效果
 */
export default function LogoTest() {
  const [currentSection, setCurrentSection] = useState('index')
  const [showComparison, setShowComparison] = useState(false)

  return (
    <div className="min-h-screen bg-ak-dark">
      {/* 导航组件 - 现在使用图片logo */}
      <OriginalNavigation currentSection={currentSection} />

      {/* 主要内容 */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* 标题区域 */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-ak-primary text-ak-primary">
              Logo 更新
            </Badge>
            <h1 className="text-4xl font-bold text-ak-text font-ak-title">
              图片Logo测试
            </h1>
            <p className="text-xl text-ak-text-secondary max-w-2xl mx-auto">
              导航栏现在使用 /images/logo.png 图片替代文字logo
            </p>
          </div>

          {/* Logo对比 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-ak-primary" />
                Logo 更新详情
              </CardTitle>
              <CardDescription className="text-ak-text-secondary">
                从文字logo更换为图片logo的实现
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* 当前logo展示 */}
              <div className="p-6 rounded-lg bg-ak-light-gray border border-ak-border">
                <h3 className="text-ak-text font-medium mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  当前使用的图片Logo
                </h3>
                <div className="flex items-center justify-center p-8 bg-black/20 rounded-lg backdrop-blur-md border border-white/10">
                  <Image
                    src="/images/logo.png"
                    alt="心流元素"
                    width={513}
                    height={100}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                </div>
                <p className="text-sm text-ak-text-secondary mt-3 text-center">
                  图片路径: /images/logo.png
                </p>
              </div>

              {/* 对比按钮 */}
              <div className="text-center">
                <Button
                  onClick={() => setShowComparison(!showComparison)}
                  variant="outline"
                  className="border-ak-primary text-ak-primary hover:bg-ak-primary hover:text-black"
                >
                  {showComparison ? '隐藏' : '显示'}文字Logo对比
                </Button>
              </div>

              {/* 文字logo对比 */}
              {showComparison && (
                <div className="p-6 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h3 className="text-ak-text font-medium mb-4 flex items-center gap-2">
                    <Type className="w-4 h-4 text-orange-500" />
                    之前的文字Logo
                  </h3>
                  <div className="flex items-center justify-center p-8 bg-black/20 rounded-lg backdrop-blur-md border border-white/10">
                    <div className="text-2xl font-bold text-white tracking-wider font-ak-title">
                      心流元素
                    </div>
                  </div>
                  <p className="text-sm text-ak-text-secondary mt-3 text-center">
                    纯文字实现
                  </p>
                </div>
              )}

              {/* 技术实现 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    实现特点
                  </h4>
                  <ul className="text-sm text-ak-text-secondary space-y-1">
                    <li>• 使用 Next.js Image 组件</li>
                    <li>• 自动优化图片加载</li>
                    <li>• 响应式尺寸适配</li>
                    <li>• 保持原有动画效果</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-ak-primary" />
                    图片属性
                  </h4>
                  <ul className="text-sm text-ak-text-secondary space-y-1">
                    <li>• 原始尺寸: 513x100px</li>
                    <li>• 显示高度: 32px (2rem)</li>
                    <li>• 自适应缩放</li>
                    <li>• 优先加载 (priority)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 代码示例 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">代码实现</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                Logo替换的具体代码
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black/40 rounded-lg p-4 border border-ak-border">
                <pre className="text-sm text-ak-text-secondary overflow-x-auto">
                  <code>{`// 之前的文字Logo
<div className="text-2xl font-bold text-white tracking-wider font-ak-title">
  心流元素
</div>

// 现在的图片Logo
<Image
  src="/images/logo.png"
  alt="心流元素"
  width={513}
  height={100}
  className="h-8 w-auto object-contain"
  priority
/>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* 测试说明 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">测试说明</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                验证logo在不同情况下的显示效果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border text-center">
                  <h4 className="font-medium text-ak-text mb-2">桌面端</h4>
                  <p className="text-sm text-ak-text-secondary">
                    查看导航栏左上角的logo显示效果
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border text-center">
                  <h4 className="font-medium text-ak-text mb-2">移动端</h4>
                  <p className="text-sm text-ak-text-secondary">
                    缩小浏览器窗口测试响应式效果
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border text-center">
                  <h4 className="font-medium text-ak-text mb-2">交互效果</h4>
                  <p className="text-sm text-ak-text-secondary">
                    悬停logo查看缩放动画效果
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Logo更新成功</span>
                </div>
                <p className="text-sm text-ak-text-secondary">
                  导航栏现在使用 /images/logo.png 图片，保持了所有原有的动画效果和响应式特性。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 切换测试 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">导航状态测试</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                测试不同导航状态下logo的显示
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'index', name: '首页' },
                  { id: 'information', name: '情报' },
                  { id: 'operator', name: '干员' },
                  { id: 'world', name: '设定' },
                  { id: 'media', name: '泰拉万象' },
                  { id: 'more', name: '更多内容' }
                ].map((section) => (
                  <Button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    variant={currentSection === section.id ? "default" : "outline"}
                    className={currentSection === section.id
                      ? "bg-ak-primary text-black"
                      : "border-ak-border text-ak-text-secondary hover:border-ak-primary hover:text-ak-primary"
                    }
                    size="sm"
                  >
                    {section.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
