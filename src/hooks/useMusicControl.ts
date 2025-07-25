'use client'

import { create } from 'zustand'

interface MusicState {
  isPlaying: boolean
  volume: number
  audioRef: HTMLAudioElement | null
  userInteracted: boolean
  setAudioRef: (ref: HTMLAudioElement | null) => void
  setUserInteracted: (interacted: boolean) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  play: () => void
  pause: () => void
}

/**
 * 全局音乐控制状态管理
 * 使用 Zustand 管理音乐播放状态，让导航栏和音乐组件能够同步
 */
export const useMusicControl = create<MusicState>((set, get) => ({
  isPlaying: true,
  volume: 0.3,
  audioRef: null,
  userInteracted: false,

  setAudioRef: (ref) => {
    set({ audioRef: ref })
    if (ref) {
      ref.volume = get().volume
    }
  },

  setUserInteracted: (interacted) => {
    set({ userInteracted: interacted })
    // 如果用户已交互且音乐应该播放，则尝试播放
    if (interacted) {
      const { audioRef, isPlaying } = get()
      if (audioRef && isPlaying) {
        audioRef.play().catch(() => {
          // 静默处理播放失败
        })
      }
    }
  },

  togglePlay: () => {
    const { audioRef, isPlaying, userInteracted } = get()
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause()
        set({ isPlaying: false })
      } else {
        if (userInteracted) {
          audioRef.play().catch(() => {
            // 静默处理播放失败
          })
        }
        set({ isPlaying: true })
      }
    }
  },

  play: () => {
    const { audioRef, userInteracted } = get()
    if (audioRef && userInteracted) {
      audioRef.play().catch(() => {
        // 静默处理播放失败
      })
    }
    set({ isPlaying: true })
  },

  pause: () => {
    const { audioRef } = get()
    if (audioRef) {
      audioRef.pause()
    }
    set({ isPlaying: false })
  },

  setVolume: (volume) => {
    const { audioRef } = get()
    set({ volume })
    if (audioRef) {
      audioRef.volume = volume
    }
  },
}))

/**
 * 简化的音乐控制 hook，用于组件中
 */
export const useMusic = () => {
  const {
    isPlaying,
    volume,
    userInteracted,
    togglePlay,
    setVolume,
    setUserInteracted,
    play,
    pause
  } = useMusicControl()

  return {
    isPlaying,
    volume,
    userInteracted,
    togglePlay,
    setVolume,
    setUserInteracted,
    play,
    pause,
  }
}
