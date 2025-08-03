'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMusicControl } from '@/hooks/useMusicControl'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { isPlaying, volume, userInteracted, setAudioRef, setVolume, setUserInteracted, togglePlay } = useMusicControl()

  // 注册音频元素到全局状态
  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current)
      audioRef.current.volume = volume
    }

    // 清理函数
    return () => {
      setAudioRef(null)
    }
  }, [setAudioRef, volume])

  // 监听用户首次交互
  useEffect(() => {
    if (userInteracted) return // 如果已经交互过，不需要再监听

    const handleFirstInteraction = () => {
      setUserInteracted(true)

      // 移除事件监听器
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    // 添加多种用户交互事件监听
    document.addEventListener('click', handleFirstInteraction, { passive: true })
    document.addEventListener('keydown', handleFirstInteraction, { passive: true })
    document.addEventListener('touchstart', handleFirstInteraction, { passive: true })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [userInteracted, setUserInteracted])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 bg-ak-gray/90 backdrop-blur-sm border border-ak-border rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      <audio
        ref={audioRef}
        src="/audio/bg_audio.mp3"
        loop
        preload="auto"
        onPlay={() => useMusicControl.setState({ isPlaying: true })}
        onPause={() => useMusicControl.setState({ isPlaying: false })}
        onLoadedData={() => {
          // 音频加载完成后设置音量，但不自动播放
          if (audioRef.current) {
            audioRef.current.volume = volume
            // 不在这里尝试自动播放，等待用户交互
          }
        }}
      />

      <div className="flex items-center space-x-3">
        {/* 播放/暂停按钮 */}
        <motion.button
          onClick={togglePlay}
          className="w-10 h-10 bg-ak-primary/20 hover:bg-ak-primary/30 border border-ak-primary rounded-lg flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-ak-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-ak-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>

        {/* 音量控制 */}
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-ak-text-secondary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.828 1 1 0 01-1.415-1.414A3.984 3.984 0 0013 12a3.983 3.983 0 00-.172-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-ak-gray rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* 音乐信息 */}
        <div className="text-xs text-ak-text-secondary">
          <div className="font-ak-secondary">BGM</div>
          <div className={`transition-colors ${isPlaying ? 'text-ak-primary' : 'text-ak-text-secondary'}`}>
            {isPlaying ? 'PLAYING' : 'PAUSED'}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0099ff;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #0099ff;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  )
}
