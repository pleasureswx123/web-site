'use client'

import { useEffect, useRef } from 'react'

interface CSSStarfieldProps {
  className?: string
  starCount?: number
  animationSpeed?: number
}

export default function CSSStarfield({ 
  className = '',
  starCount = 200,
  animationSpeed = 1
}: CSSStarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    
    // 清除现有的星星
    container.innerHTML = ''

    // 创建星星
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      
      // 随机位置
      const x = Math.random() * 100
      const y = Math.random() * 100
      
      // 随机大小和颜色
      const size = Math.random() * 3 + 1
      const opacity = Math.random() * 0.8 + 0.2
      const hue = Math.random() * 60 + 180 // 蓝色到青色范围
      
      // 随机动画延迟和持续时间
      const animationDelay = Math.random() * 5
      const animationDuration = (Math.random() * 3 + 2) / animationSpeed
      
      // 设置样式
      star.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: hsl(${hue}, 100%, 80%);
        border-radius: 50%;
        opacity: ${opacity};
        animation: twinkle ${animationDuration}s ease-in-out infinite alternate;
        animation-delay: ${animationDelay}s;
        box-shadow: 0 0 ${size * 2}px hsl(${hue}, 100%, 80%);
      `
      
      container.appendChild(star)
    }

    // 添加CSS动画
    const style = document.createElement('style')
    style.textContent = `
      @keyframes twinkle {
        0% {
          opacity: 0.2;
          transform: scale(0.8);
        }
        100% {
          opacity: 1;
          transform: scale(1.2);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
        }
        25% {
          transform: translateY(-10px) translateX(5px);
        }
        50% {
          transform: translateY(-5px) translateX(-5px);
        }
        75% {
          transform: translateY(-15px) translateX(10px);
        }
      }
    `
    document.head.appendChild(style)

    // 添加流星效果
    const createShootingStar = () => {
      const shootingStar = document.createElement('div')
      const startX = Math.random() * 100
      const startY = Math.random() * 50
      const endX = startX + (Math.random() * 50 + 30)
      const endY = startY + (Math.random() * 50 + 30)
      
      shootingStar.style.cssText = `
        position: absolute;
        left: ${startX}%;
        top: ${startY}%;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #ffffff, #00ffff);
        border-radius: 50%;
        opacity: 0;
        animation: shooting 2s linear forwards;
        box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
      `
      
      // 添加流星轨迹
      const trail = document.createElement('div')
      trail.style.cssText = `
        position: absolute;
        left: -20px;
        top: -1px;
        width: 20px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ffff);
        opacity: 0;
        animation: shooting 2s linear forwards;
      `
      shootingStar.appendChild(trail)
      
      const shootingKeyframes = `
        @keyframes shooting {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(${endX - startX}vw, ${endY - startY}vh);
          }
        }
      `
      
      const shootingStyle = document.createElement('style')
      shootingStyle.textContent = shootingKeyframes
      document.head.appendChild(shootingStyle)
      
      container.appendChild(shootingStar)
      
      // 清理
      setTimeout(() => {
        if (container.contains(shootingStar)) {
          container.removeChild(shootingStar)
        }
        if (document.head.contains(shootingStyle)) {
          document.head.removeChild(shootingStyle)
        }
      }, 2000)
    }

    // 定期创建流星
    const shootingStarInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% 概率
        createShootingStar()
      }
    }, 3000)

    // 添加鼠标交互效果
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      const stars = container.querySelectorAll('div')
      stars.forEach((star, index) => {
        if (star.children.length > 0) return // 跳过流星
        
        const starElement = star as HTMLElement
        const starX = parseFloat(starElement.style.left) / 100
        const starY = parseFloat(starElement.style.top) / 100
        
        const distance = Math.sqrt((x - starX) ** 2 + (y - starY) ** 2)
        
        if (distance < 0.1) {
          starElement.style.transform = `scale(1.5)`
          starElement.style.opacity = '1'
        } else {
          starElement.style.transform = 'scale(1)'
        }
      })
    }

    container.addEventListener('mousemove', handleMouseMove)

    // 清理函数
    return () => {
      clearInterval(shootingStarInterval)
      container.removeEventListener('mousemove', handleMouseMove)
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [starCount, animationSpeed])

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}
