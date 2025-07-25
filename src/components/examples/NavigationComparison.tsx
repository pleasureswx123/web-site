'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, X, ArrowRight } from 'lucide-react'

/**
 * 导航组件重构对比页面
 * 展示重构前后的差异和改进
 */
export default function NavigationComparison() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before')

  const beforeFeatures = [
    { feature: '自定义弹出层', status: 'removed', description: '使用原生DOM操作实现' },
    { feature: 'SVG图标引用', status: 'removed', description: '通过xlinkHref引用SVG定义' },
    { feature: '手动状态管理', status: 'improved', description: '多个useState管理弹出层状态' },
    { feature: '自定义样式', status: 'improved', description: '大量自定义CSS类' },
    { feature: '基础响应式', status: 'improved', description: '简单的媒体查询' },
    { feature: '有限的交互反馈', status: 'improved', description: '仅有基础的悬停效果' }
  ]

  const afterFeatures = [
    { feature: 'shadcn/ui组件', status: 'new', description: 'Dialog, Popover, Sheet等现代组件' },
    { feature: 'Lucide图标库', status: 'new', description: '统一的图标系统（仅用于功能按钮）' },
    { feature: 'Toast通知系统', status: 'new', description: 'Sonner提供即时反馈' },
    { feature: '工具提示系统', status: 'new', description: '为所有交互元素提供说明' },
    { feature: '移动端侧边栏', status: 'new', description: 'Sheet组件实现的响应式导航' },
    { feature: '无障碍支持', status: 'new', description: 'Radix UI提供的完整a11y支持' },
    { feature: '类型安全', status: 'improved', description: '更好的TypeScript支持' },
    { feature: '代码复用', status: 'improved', description: '基于成熟组件库的可复用组件' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'improved': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'removed': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <CheckCircle className="w-4 h-4" />
      case 'improved': return <ArrowRight className="w-4 h-4" />
      case 'removed': return <X className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-ak-dark p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 标题 */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="border-ak-primary text-ak-primary">
            重构对比
          </Badge>
          <h1 className="text-4xl font-bold text-ak-text font-ak-title">
            导航组件重构对比
          </h1>
          <p className="text-xl text-ak-text-secondary max-w-3xl mx-auto">
            对比重构前后的技术实现和用户体验改进
          </p>
        </div>

        {/* 切换标签 */}
        <div className="flex justify-center">
          <div className="flex bg-ak-gray rounded-lg p-1 border border-ak-border">
            <Button
              variant={activeTab === 'before' ? 'default' : 'ghost'}
              className={activeTab === 'before' ? 'bg-ak-primary text-black' : 'text-ak-text-secondary'}
              onClick={() => setActiveTab('before')}
            >
              重构前
            </Button>
            <Button
              variant={activeTab === 'after' ? 'default' : 'ghost'}
              className={activeTab === 'after' ? 'bg-ak-primary text-black' : 'text-ak-text-secondary'}
              onClick={() => setActiveTab('after')}
            >
              重构后
            </Button>
          </div>
        </div>

        {/* 对比内容 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 重构前 */}
          <Card className={`bg-ak-gray border-ak-border transition-all duration-300 ${
            activeTab === 'before' ? 'ring-2 ring-ak-primary/50' : ''
          }`}>
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                重构前
              </CardTitle>
              <CardDescription className="text-ak-text-secondary">
                原始实现方式和存在的问题
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {beforeFeatures.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-ak-light-gray">
                  <div className={`flex items-center justify-center w-6 h-6 rounded border ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-ak-text text-sm">{item.feature}</h4>
                    <p className="text-xs text-ak-text-secondary mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
              
              <Separator className="bg-ak-border my-4" />
              
              <div className="space-y-2">
                <h4 className="font-medium text-ak-text text-sm">主要问题：</h4>
                <ul className="text-xs text-ak-text-secondary space-y-1">
                  <li>• 大量自定义代码，维护成本高</li>
                  <li>• 缺乏统一的设计系统</li>
                  <li>• 无障碍支持不完整</li>
                  <li>• 移动端体验有限</li>
                  <li>• 缺乏用户反馈机制</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 重构后 */}
          <Card className={`bg-ak-gray border-ak-border transition-all duration-300 ${
            activeTab === 'after' ? 'ring-2 ring-ak-primary/50' : ''
          }`}>
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                重构后
              </CardTitle>
              <CardDescription className="text-ak-text-secondary">
                基于shadcn/ui的现代化实现
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {afterFeatures.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-ak-light-gray">
                  <div className={`flex items-center justify-center w-6 h-6 rounded border ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-ak-text text-sm">{item.feature}</h4>
                    <p className="text-xs text-ak-text-secondary mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
              
              <Separator className="bg-ak-border my-4" />
              
              <div className="space-y-2">
                <h4 className="font-medium text-ak-text text-sm">主要优势：</h4>
                <ul className="text-xs text-ak-text-secondary space-y-1">
                  <li>• 基于成熟组件库，稳定可靠</li>
                  <li>• 统一的设计语言和交互模式</li>
                  <li>• 完整的无障碍支持</li>
                  <li>• 优秀的移动端体验</li>
                  <li>• 丰富的用户反馈机制</li>
                  <li>• 更好的开发体验和维护性</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 技术栈对比 */}
        <Card className="bg-ak-gray border-ak-border">
          <CardHeader>
            <CardTitle className="text-ak-text font-ak-secondary">技术栈对比</CardTitle>
            <CardDescription className="text-ak-text-secondary">
              重构前后使用的主要技术和依赖
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-ak-text mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  重构前
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Framer Motion', 'Tailwind CSS', 'TypeScript'].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-red-500/30 text-red-400">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-ak-text mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  重构后
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React', 'shadcn/ui', 'Radix UI', 'Framer Motion', 
                    'Tailwind CSS', 'Lucide React', 'Sonner', 'TypeScript'
                  ].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-green-500/30 text-green-400">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 总结 */}
        <Card className="bg-ak-gray border-ak-border">
          <CardHeader>
            <CardTitle className="text-ak-text font-ak-secondary">重构总结</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-ak-text-secondary space-y-4">
              <p>
                通过使用shadcn/ui组件库重构导航组件，我们在保持原有设计风格的基础上，
                显著提升了代码质量、用户体验和可维护性。
              </p>
              <p>
                重构后的组件不仅具有更好的响应式设计和无障碍支持，
                还提供了更丰富的交互反馈和更现代化的开发体验。
              </p>
              <div className="flex items-center gap-2 text-ak-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">重构成功完成，保持了原有的纯文字导航设计！</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
