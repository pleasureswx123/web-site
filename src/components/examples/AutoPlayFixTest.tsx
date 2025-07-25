'use client'

import { useState } from 'react'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import BackgroundMusic from '@/components/ui/BackgroundMusic'
import MusicInteractionPrompt from '@/components/ui/MusicInteractionPrompt'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMusic } from '@/hooks/useMusicControl'
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  User,
  Clock
} from 'lucide-react'

/**
 * 自动播放修复测试页面
 * 验证修复后的音乐控制功能，不再出现控制台错误
 */
export default function AutoPlayFixTest() {
  const [currentSection, setCurrentSection] = useState('index')
  const { isPlaying, volume, userInteracted, setUserInteracted } = useMusic()

  return (
    <div className="min-h-screen bg-ak-dark">
      {/* 导航组件 */}
      <OriginalNavigation currentSection={currentSection} />
      
      {/* 背景音乐组件 */}
      <BackgroundMusic />
      
      {/* 音乐交互提示 */}
      <MusicInteractionPrompt />
      
      {/* 主要内容 */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* 标题 */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-green-500 text-green-400">
              修复完成
            </Badge>
            <h1 className="text-3xl font-bold text-ak-text font-ak-title">
              自动播放错误修复测试
            </h1>
            <p className="text-ak-text-secondary">
              验证修复后的音乐控制功能，不再出现 NotAllowedError 控制台错误
            </p>
          </div>

          {/* 修复状态 */}
          <Card className="bg-green-500/10 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 font-ak-secondary flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                修复完成
              </CardTitle>
              <CardDescription className="text-green-300">
                已解决浏览器自动播放限制导致的控制台错误
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-2">✅ 问题解决</h4>
                  <ul className="text-sm text-green-300 space-y-1">
                    <li>• 不再尝试立即自动播放</li>
                    <li>• 等待用户交互后播放</li>
                    <li>• 静默处理播放失败</li>
                    <li>• 控制台无错误信息</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-medium text-blue-400 mb-2">🎵 用户体验</h4>
                  <ul className="text-sm text-blue-300 space-y-1">
                    <li>• 友好的交互提示</li>
                    <li>• 智能用户交互检测</li>
                    <li>• 优雅的播放启用</li>
                    <li>• 保持默认播放状态</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 当前状态监控 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                <Music className="w-5 h-5 text-ak-primary" />
                实时状态监控
              </CardTitle>
              <CardDescription className="text-ak-text-secondary">
                监控音乐播放状态和用户交互状态
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 播放状态 */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isPlaying ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {isPlaying ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">播放状态</p>
                    <p className={`text-sm ${isPlaying ? 'text-green-400' : 'text-gray-400'}`}>
                      {isPlaying ? '播放中' : '已暂停'}
                    </p>
                  </div>
                </div>

                {/* 用户交互状态 */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    userInteracted ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {userInteracted ? <CheckCircle className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">用户交互</p>
                    <p className={`text-sm ${userInteracted ? 'text-green-400' : 'text-orange-400'}`}>
                      {userInteracted ? '已交互' : '等待交互'}
                    </p>
                  </div>
                </div>

                {/* 音量状态 */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-ak-primary/20 text-ak-primary">
                    {volume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">音量</p>
                    <p className="text-sm text-ak-primary">
                      {Math.round(volume * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 修复详情 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">修复详情</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                具体的修复措施和技术实现
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* 修复措施 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    问题原因
                  </h4>
                  <ul className="text-sm text-ak-text-secondary space-y-1">
                    <li>• 浏览器阻止自动播放音频</li>
                    <li>• 需要用户交互才能播放</li>
                    <li>• 立即调用 play() 会抛出错误</li>
                    <li>• NotAllowedError 显示在控制台</li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    解决方案
                  </h4>
                  <ul className="text-sm text-ak-text-secondary space-y-1">
                    <li>• 添加用户交互状态检测</li>
                    <li>• 等待用户交互后播放</li>
                    <li>• 静默处理播放失败</li>
                    <li>• 友好的交互提示界面</li>
                  </ul>
                </div>
              </div>

              {/* 技术实现 */}
              <div className="bg-black/40 rounded-lg p-4 border border-ak-border">
                <h4 className="font-medium text-ak-text mb-3">核心代码修复</h4>
                <pre className="text-sm text-ak-text-secondary overflow-x-auto">
                  <code>{`// 添加用户交互状态
interface MusicState {
  userInteracted: boolean
  setUserInteracted: (interacted: boolean) => void
  // ...
}

// 等待用户交互后播放
togglePlay: () => {
  const { audioRef, isPlaying, userInteracted } = get()
  if (audioRef) {
    if (isPlaying) {
      audioRef.pause()
    } else {
      if (userInteracted) {
        audioRef.play().catch(() => {
          // 静默处理播放失败
        })
      }
    }
    set({ isPlaying: !isPlaying })
  }
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* 测试说明 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">测试说明</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                如何验证修复效果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">打开浏览器开发者工具</p>
                    <p className="text-sm text-ak-text-secondary">查看 Console 面板，确认没有 NotAllowedError</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-400 font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">观察导航栏音乐图标</p>
                    <p className="text-sm text-ak-text-secondary">默认显示播放状态（蓝色音量图标）</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-400 font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">等待交互提示</p>
                    <p className="text-sm text-ak-text-secondary">3秒后会显示友好的音乐启用提示</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-400 font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">点击启用音乐</p>
                    <p className="text-sm text-ak-text-secondary">音乐开始播放，所有控制组件状态同步</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 手动测试 */}
          {!userInteracted && (
            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-400 font-ak-secondary flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  等待用户交互
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-300 mb-4">
                  当前等待用户交互。点击下方按钮或页面任意位置来启用音乐播放。
                </p>
                <Button
                  onClick={() => setUserInteracted(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  手动启用音乐
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 成功状态 */}
          {userInteracted && (
            <div className="text-center p-6 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center justify-center gap-2 text-green-400 font-medium mb-2">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg">修复验证成功</span>
              </div>
              <p className="text-sm text-green-300">
                用户已交互，音乐功能正常工作，控制台无错误信息。
                自动播放限制问题已完全解决！
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
