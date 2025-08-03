'use client'

import { useState } from 'react'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import BackgroundMusic from '@/components/ui/BackgroundMusic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useMusic } from '@/hooks/useMusicControl'
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react'

/**
 * 简单的音乐功能测试页面
 */
export default function MusicTestSimple() {
  const [currentSection, setCurrentSection] = useState('index')
  const { isPlaying, volume } = useMusic()

  return (
    <div className="min-h-screen bg-ak-dark">
      {/* 导航组件 - 包含音乐按钮 */}
      <OriginalNavigation currentSection={currentSection} />

      {/* 背景音乐组件 - 右下角 */}
      <BackgroundMusic />

      {/* 主要内容 */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* 标题 */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-ak-primary text-ak-primary">
              音乐测试
            </Badge>
            <h1 className="text-3xl font-bold text-ak-text font-ak-title">
              背景音乐功能测试
            </h1>
            <p className="text-ak-text-secondary">
              测试导航栏音乐按钮与背景音乐的联动效果
            </p>
          </div>

          {/* 当前状态卡片 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                <Music className="w-5 h-5 text-ak-primary" />
                当前音乐状态
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">

                {/* 播放状态 */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-ak-light-gray">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isPlaying ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {isPlaying ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ak-text">播放状态</p>
                    <p className={`text-xs ${isPlaying ? 'text-green-400' : 'text-gray-400'}`}>
                      {isPlaying ? '正在播放' : '已暂停'}
                    </p>
                  </div>
                </div>

                {/* 音量状态 */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-ak-light-gray">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-ak-primary/20 text-ak-primary">
                    {volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ak-text">音量</p>
                    <p className="text-xs text-ak-primary">
                      {Math.round(volume * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 操作说明 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">操作说明</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                如何使用音乐控制功能
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* 导航栏控制 */}
              <div className="p-3 rounded-lg bg-ak-light-gray border border-ak-border">
                <h4 className="font-medium text-ak-text mb-2 flex items-center gap-2">
                  🎵 导航栏音乐按钮
                </h4>
                <p className="text-sm text-ak-text-secondary">
                  点击导航栏右上角的音乐图标来播放/暂停背景音乐。
                  播放时显示 🔊 图标，暂停时显示 🔇 图标。
                </p>
              </div>

              {/* 背景音乐组件 */}
              <div className="p-3 rounded-lg bg-ak-light-gray border border-ak-border">
                <h4 className="font-medium text-ak-text mb-2 flex items-center gap-2">
                  🎛️ 背景音乐控制面板
                </h4>
                <p className="text-sm text-ak-text-secondary">
                  右下角的音乐控制面板可以播放/暂停音乐，并调节音量。
                  两个控制方式完全同步。
                </p>
              </div>

              {/* 音频信息 */}
              <div className="p-3 rounded-lg bg-ak-light-gray border border-ak-border">
                <h4 className="font-medium text-ak-text mb-2 flex items-center gap-2">
                  📀 音频文件信息
                </h4>
                <div className="text-sm text-ak-text-secondary space-y-1">
                  <p>• 文件: /audio/bg_audio.mp3</p>
                  <p>• 大小: 3.0MB</p>
                  <p>• 格式: MP3 (128kbps, 44.1kHz, 立体声)</p>
                  <p>• 播放: 循环播放</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 技术实现 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">技术实现</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                使用 Zustand 全局状态管理实现组件间同步
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-ak-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>全局音乐状态管理 (Zustand)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>HTML5 Audio API</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>React Hooks 状态同步</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Toast 通知反馈 (Sonner)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 测试提示 */}
          <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-green-400 font-medium mb-2">🎉 音乐功能已完善</p>
            <p className="text-sm text-ak-text-secondary">
              现在可以通过导航栏按钮真正控制背景音乐的播放了！
              尝试点击不同的控制按钮，观察状态同步效果。
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
