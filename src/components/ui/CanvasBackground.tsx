'use client'

import { useEffect, useRef } from 'react'

interface CanvasBackgroundProps {
  type: 'circuit' | 'particles'
  className?: string
  id?: string
}

export default function CanvasBackground({ type, className, id }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    if (type === 'circuit') {
      // 电路板效果
      const drawCircuit = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = 'rgba(0, 153, 255, 0.1)'
        ctx.lineWidth = 1

        // 绘制网格
        const gridSize = 50
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        // 绘制电路线条
        ctx.strokeStyle = 'rgba(0, 153, 255, 0.2)'
        ctx.lineWidth = 2
        for (let i = 0; i < 20; i++) {
          ctx.beginPath()
          ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
          ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
          ctx.stroke()
        }
      }

      drawCircuit()
    } else if (type === 'particles') {
      // 粒子效果
      const particles: Array<{
        x: number
        y: number
        vx: number
        vy: number
        alpha: number
      }> = []

      // 创建粒子
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          alpha: Math.random()
        })
      }

      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach(particle => {
          // 更新位置
          particle.x += particle.vx
          particle.y += particle.vy

          // 边界检查
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          // 绘制粒子
          ctx.fillStyle = `rgba(0, 153, 255, ${particle.alpha * 0.3})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2)
          ctx.fill()
        })

        requestAnimationFrame(animateParticles)
      }

      animateParticles()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      className={className || (type === 'circuit' ? 'ak-circuit-canvas' : 'ak-particle-canvas')}
      id={id}
      width="1274"
      height="894"
    />
  )
}
