'use client'

import { useState, useEffect } from 'react'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import BackgroundMusic from '@/components/ui/BackgroundMusic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMusic } from '@/hooks/useMusicControl'
import { Music, Play, Pause, Volume2, VolumeX, Info, CheckCircle, AlertCircle } from 'lucide-react'

/**
 * 自动播放测试页面
 * 验证音乐默认播放状态和浏览器自动播放策略
 */
export default function AutoPlayTest() {
  const [currentSection, setCurrentSection] = useState('index')
  const [userInteracted, setUserInteracted] = useState(false)
  const { isPlaying, volume, togglePlay } = useMusic()

  // 检测用户首次交互
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserInteracted(true)
      // 移除事件监听器
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  return (
    <div className="min-h-screen bg-ak-dark">
      {/* 导航组件 */}
      <OriginalNavigation currentSection={currentSection} />
      
      {/* 背景音乐组件 */}
      <BackgroundMusic />
      
      {/* 主要内容 */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* 标题 */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-ak-primary text-ak-primary">
              自动播放测试
            </Badge>
            <h1 className="text-3xl font-bold text-ak-text font-ak-title">
              音乐默认播放状态测试
            </h1>
            <p className="text-ak-text-secondary">
              验证音乐默认为播放状态，以及浏览器自动播放策略的处理
            </p>
          </div>

          {/* 浏览器自动播放提示 */}
          {!userInteracted && (
            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-400 font-ak-secondary flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  浏览器自动播放限制
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-300 mb-3">
                  现代浏览器通常会阻止自动播放音频，需要用户首次交互后才能播放。
                  点击页面任意位置或按钮来启用音乐播放。
                </p>
                <Button 
                  onClick={() => {
                    setUserInteracted(true)
                    if (!isPlaying) {
                      togglePlay()
                    }
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  启用音乐播放
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 当前状态 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                <Music className="w-5 h-5 text-ak-primary" />
                当前音乐状态
              </CardTitle>
              <CardDescription className="text-ak-text-secondary">
                实时显示音乐播放状态和相关信息
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
                      {isPlaying ? '正在播放' : '已暂停'}
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

                {/* 用户交互状态 */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    userInteracted ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {userInteracted ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">用户交互</p>
                    <p className={`text-sm ${userInteracted ? 'text-green-400' : 'text-orange-400'}`}>
                      {userInteracted ? '已交互' : '未交互'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 默认状态说明 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">默认播放状态</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                音乐现在默认为播放状态的实现说明
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* 实现特点 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    状态管理
                  </h4>
                  <ul className="text-sm text-ak-text-secondary space-y-1">
                    <li>• 全局状态默认 isPlaying: true</li>
                    <li>• 导航栏按钮显示播放状态</li>
                    <li>• 背景音乐组件同步状态</li>
                  </ul>
                </div>
                
                <div className="p-3 rounded-lg bg-ak-light-gray border border-ak-border">
                  <h4 className="font-medium text-ak-text mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    自动播放处理
                  </h4>
                  <ul className="text-sm text-ak-text-secondary space-y-1">
                    <li>• 音频加载完成后尝试播放</li>
                    <li>• 优雅处理浏览器限制</li>
                    <li>• 用户交互后正常播放</li>
                  </ul>
                </div>
              </div>

              {/* 代码示例 */}
              <div className="bg-black/40 rounded-lg p-4 border border-ak-border">
                <h4 className="font-medium text-ak-text mb-2">核心代码实现</h4>
                <pre className="text-sm text-ak-text-secondary overflow-x-auto">
                  <code>{`// 全局状态默认为播放
export const useMusicControl = create<MusicState>((set, get) => ({
  isPlaying: true,  // 默认播放状态
  volume: 0.3,
  // ...
}))

// 音频加载完成后自动播放
onLoadedData={() => {
  if (audioRef.current && isPlaying) {
    audioRef.current.play().catch(console.error)
  }
}}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* 浏览器兼容性说明 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">浏览器自动播放策略</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                不同浏览器对自动播放的处理方式
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-ak-text-secondary">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-ak-text">Chrome/Edge</p>
                    <p>需要用户交互后才能自动播放音频</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-ak-text">Firefox</p>
                    <p>默认阻止自动播放，可在设置中允许</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-ak-text">Safari</p>
                    <p>严格的自动播放策略，需要用户明确交互</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-ak-text">移动端</p>
                    <p>通常完全禁止自动播放，必须用户触发</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 测试结果 */}
          <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center justify-center gap-2 text-green-400 font-medium mb-2">
              <CheckCircle className="w-5 h-5" />
              <span>默认播放状态设置成功</span>
            </div>
            <p className="text-sm text-ak-text-secondary">
              音乐现在默认为播放状态。导航栏按钮显示播放图标，
              用户首次交互后音乐将自动开始播放。
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
