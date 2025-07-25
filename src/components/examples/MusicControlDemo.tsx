'use client'

import { useState } from 'react'
import OriginalNavigation from '@/components/layout/OriginalNavigation'
import BackgroundMusic from '@/components/ui/BackgroundMusic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { useMusic } from '@/hooks/useMusicControl'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Music, 
  Headphones,
  CheckCircle,
  Info
} from 'lucide-react'

/**
 * 音乐控制功能演示页面
 * 展示导航栏音乐按钮与背景音乐组件的联动
 */
export default function MusicControlDemo() {
  const [currentSection, setCurrentSection] = useState('index')
  const { isPlaying, volume, togglePlay, setVolume, play, pause } = useMusic()

  return (
    <div className="min-h-screen bg-ak-dark">
      {/* 导航组件 */}
      <OriginalNavigation currentSection={currentSection} />
      
      {/* 背景音乐组件 */}
      <BackgroundMusic />
      
      {/* 主要内容 */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* 标题区域 */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-ak-primary text-ak-primary">
              音乐功能
            </Badge>
            <h1 className="text-4xl font-bold text-ak-text font-ak-title">
              背景音乐控制演示
            </h1>
            <p className="text-xl text-ak-text-secondary max-w-2xl mx-auto">
              导航栏音乐按钮现在可以真正控制 /audio/bgm.mp3 的播放
            </p>
          </div>

          {/* 当前状态 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                <Music className="w-5 h-5 text-ak-primary" />
                音乐播放状态
              </CardTitle>
              <CardDescription className="text-ak-text-secondary">
                实时显示当前音乐播放状态和音量
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 播放状态 */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isPlaying ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {isPlaying ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">播放状态</p>
                    <p className={`text-sm ${isPlaying ? 'text-green-400' : 'text-gray-400'}`}>
                      {isPlaying ? '正在播放' : '已暂停'}
                    </p>
                  </div>
                </div>

                {/* 音量状态 */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-ak-primary/20 text-ak-primary">
                    {volume > 0 ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">音量</p>
                    <p className="text-sm text-ak-primary">
                      {Math.round(volume * 100)}%
                    </p>
                  </div>
                </div>

                {/* 音频文件 */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-ak-light-gray border border-ak-border">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-ak-text">音频文件</p>
                    <p className="text-sm text-purple-400">bgm.mp3</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 控制面板 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">音乐控制面板</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                除了导航栏按钮，你也可以在这里控制音乐
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* 播放控制 */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={play}
                  disabled={isPlaying}
                  className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                >
                  <Play className="w-4 h-4 mr-2" />
                  播放
                </Button>
                
                <Button
                  onClick={togglePlay}
                  variant="outline"
                  className="border-ak-primary text-ak-primary hover:bg-ak-primary hover:text-black"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      暂停
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      播放
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={pause}
                  disabled={!isPlaying}
                  className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  暂停
                </Button>
              </div>

              {/* 音量控制 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-ak-text-secondary" />
                  <span className="text-sm text-ak-text-secondary">音量控制</span>
                </div>
                <div className="flex items-center gap-4">
                  <VolumeX className="w-4 h-4 text-ak-text-secondary" />
                  <Slider
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    max={1}
                    min={0}
                    step={0.1}
                    className="flex-1"
                  />
                  <Volume2 className="w-4 h-4 text-ak-text-secondary" />
                  <span className="text-sm text-ak-text-secondary w-12">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>

              {/* 快速音量设置 */}
              <div className="flex gap-2 justify-center">
                {[0, 0.3, 0.5, 0.7, 1].map((vol) => (
                  <Button
                    key={vol}
                    onClick={() => setVolume(vol)}
                    variant={Math.abs(volume - vol) < 0.05 ? "default" : "outline"}
                    size="sm"
                    className={Math.abs(volume - vol) < 0.05 
                      ? "bg-ak-primary text-black" 
                      : "border-ak-border text-ak-text-secondary hover:border-ak-primary hover:text-ak-primary"
                    }
                  >
                    {vol === 0 ? '静音' : `${Math.round(vol * 100)}%`}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 功能说明 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 导航栏控制 */}
            <Card className="bg-ak-gray border-ak-border">
              <CardHeader>
                <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  导航栏音乐按钮
                </CardTitle>
                <CardDescription className="text-ak-text-secondary">
                  点击导航栏右侧的音乐图标
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-ak-primary" />
                  <span className="text-sm text-ak-text-secondary">播放时显示音量图标</span>
                </div>
                <div className="flex items-center gap-3">
                  <VolumeX className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-ak-text-secondary">暂停时显示静音图标</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-ak-text-secondary">点击切换播放/暂停</span>
                </div>
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-ak-text-secondary">显示Toast通知反馈</span>
                </div>
              </CardContent>
            </Card>

            {/* 背景音乐组件 */}
            <Card className="bg-ak-gray border-ak-border">
              <CardHeader>
                <CardTitle className="text-ak-text font-ak-secondary flex items-center gap-2">
                  <Music className="w-5 h-5 text-ak-primary" />
                  背景音乐组件
                </CardTitle>
                <CardDescription className="text-ak-text-secondary">
                  右下角的音乐控制面板
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Play className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-ak-text-secondary">播放/暂停按钮</span>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-ak-primary" />
                  <span className="text-sm text-ak-text-secondary">音量滑块控制</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-ak-text-secondary">实时状态显示</span>
                </div>
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-ak-text-secondary">循环播放背景音乐</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 技术实现 */}
          <Card className="bg-ak-gray border-ak-border">
            <CardHeader>
              <CardTitle className="text-ak-text font-ak-secondary">技术实现</CardTitle>
              <CardDescription className="text-ak-text-secondary">
                使用 Zustand 全局状态管理实现音乐控制同步
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black/40 rounded-lg p-4 border border-ak-border">
                <pre className="text-sm text-ak-text-secondary overflow-x-auto">
                  <code>{`// 全局音乐状态管理
const useMusicControl = create<MusicState>((set, get) => ({
  isPlaying: false,
  volume: 0.3,
  audioRef: null,
  togglePlay: () => { /* 控制播放/暂停 */ },
  setVolume: (volume) => { /* 设置音量 */ }
}))

// 导航栏中使用
const { isPlaying, togglePlay } = useMusic()

// BackgroundMusic 组件注册音频元素
setAudioRef(audioRef.current)`}</code>
                </pre>
              </div>
              
              <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">音乐功能完善成功</span>
                </div>
                <p className="text-sm text-ak-text-secondary">
                  导航栏音乐按钮现在可以真正控制背景音乐的播放，
                  两个组件通过全局状态实现完美同步。
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
