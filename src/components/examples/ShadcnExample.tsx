import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Search, Menu, Settings, Download } from 'lucide-react'
import { toast } from 'sonner'

/**
 * shadcn/ui 组件使用示例
 * 展示如何在项目中使用各种UI组件
 */
export default function ShadcnExample() {
  const handleToast = () => {
    toast.success('shadcn/ui 组件工作正常！', {
      description: '所有依赖都已正确安装和配置',
    })
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-ak-text">shadcn/ui 组件示例</h1>
        <p className="text-ak-text-secondary">展示项目中可用的UI组件</p>
      </div>

      {/* 按钮示例 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            按钮组件
          </CardTitle>
          <CardDescription>不同样式的按钮变体</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleToast}>默认按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="outline">轮廓按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="destructive">危险按钮</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">小按钮</Button>
            <Button size="default">默认大小</Button>
            <Button size="lg">大按钮</Button>
            <Button size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 对话框示例 */}
      <Card>
        <CardHeader>
          <CardTitle>对话框组件</CardTitle>
          <CardDescription>模态对话框示例</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">打开对话框</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>确认操作</DialogTitle>
                <DialogDescription>
                  这是一个示例对话框，展示shadcn/ui的Dialog组件功能。
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">取消</Button>
                <Button>确认</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* 下拉菜单示例 */}
      <Card>
        <CardHeader>
          <CardTitle>下拉菜单组件</CardTitle>
          <CardDescription>上下文菜单示例</CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Menu className="w-4 h-4 mr-2" />
                菜单
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                下载
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                设置
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Search className="w-4 h-4 mr-2" />
                搜索
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* 工具提示示例 */}
      <Card>
        <CardHeader>
          <CardTitle>工具提示组件</CardTitle>
          <CardDescription>悬停提示示例</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">悬停查看提示</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>这是一个工具提示</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Settings className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>设置选项</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* 卡片嵌套示例 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>功能卡片 1</CardTitle>
            <CardDescription>展示卡片组件的灵活性</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              这是一个示例卡片，展示如何组合使用不同的shadcn/ui组件。
            </p>
            <Button className="w-full">了解更多</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>功能卡片 2</CardTitle>
            <CardDescription>另一个卡片示例</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              所有组件都支持深色模式和自定义主题。
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">取消</Button>
              <Button size="sm">确认</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>所有组件都已正确配置并可以在项目中使用</p>
      </div>
    </div>
  )
}
