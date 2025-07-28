'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  size: number
  opacity: number
  maxOpacity: number
  baseOpacity: number
  hasReachedTarget: boolean
  index: number
  startDelay: number // 开始聚集的延迟时间
  delayTimer: number // 延迟计时器
}

interface WebGLCanvasProps {
  className?: string
  width?: number
  height?: number
}

export default function WebGLCanvas({ className = '', width = 1200, height = 800 }: WebGLCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const isInitializedRef = useRef(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const targetPositionsRef = useRef<{ x: number; y: number }[]>([]) // 存储目标位置

  // 创建 Logo 图案的目标位置
  const createLogoPositions = () => {
    const positions: { x: number; y: number }[] = []

    // Logo 的中心位置
    const centerX = width / 2
    const centerY = height / 2

    // 缩放比例，将原来的0.8改为1.6，实现2倍放大
    const scale = 1.6
    const logoWidth = 403.511161 * scale
    const logoHeight = 387 * scale

    // Logo 的起始位置（左上角）
    const startX = centerX - logoWidth / 2
    const startY = centerY - logoHeight / 2

    // 基于 SVG 路径创建粒子点位
    // 主要的 C 形状外轮廓 - 上半部分，增加密度
    for (let i = 0; i <= 150; i++) { // 从100增加到150
      const t = i / 150
      const angle = Math.PI * t // 从 0 到 π (上半圆)
      const radius = logoHeight * 0.25
      const x = startX + logoWidth * 0.52 + radius * Math.cos(angle)
      const y = startY + logoHeight * 0.5 + radius * Math.sin(angle) * 0.8
      positions.push({ x, y })
    }

    // C 形状外轮廓 - 下半部分，增加密度
    for (let i = 0; i <= 150; i++) { // 从100增加到150
      const t = i / 150
      const angle = Math.PI + Math.PI * t // 从 π 到 2π (下半圆)
      const radius = logoHeight * 0.25
      const x = startX + logoWidth * 0.52 + radius * Math.cos(angle)
      const y = startY + logoHeight * 0.5 + radius * Math.sin(angle) * 0.8
      positions.push({ x, y })
    }

    // C 形状内轮廓 - 上半部分，增加密度
    for (let i = 0; i <= 120; i++) { // 从80增加到120
      const t = i / 120
      const angle = Math.PI * t
      const radius = logoHeight * 0.15
      const x = startX + logoWidth * 0.52 + radius * Math.cos(angle)
      const y = startY + logoHeight * 0.5 + radius * Math.sin(angle) * 0.8
      positions.push({ x, y })
    }

    // C 形状内轮廓 - 下半部分，增加密度
    for (let i = 0; i <= 120; i++) { // 从80增加到120
      const t = i / 120
      const angle = Math.PI + Math.PI * t
      const radius = logoHeight * 0.15
      const x = startX + logoWidth * 0.52 + radius * Math.cos(angle)
      const y = startY + logoHeight * 0.5 + radius * Math.sin(angle) * 0.8
      positions.push({ x, y })
    }

    // 水平线条参数定义（用于后续的实心填充）
    const lineY = startY + logoHeight * 0.5
    const lineStartX = startX + logoWidth * 0.22
    const lineEndX = startX + logoWidth * 0.84

    // 填充 C 形状内部区域，实现实心效果
    const innerRadius = logoHeight * 0.15
    const outerRadius = logoHeight * 0.25
    
    // 生成实心填充粒子
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) { // 角度步长
      for (let r = innerRadius; r <= outerRadius; r += 3) { // 半径步长
        // 只填充C形状的开口区域（左侧）
        if (angle <= Math.PI * 0.85 || angle >= Math.PI * 1.15) {
          const x = startX + logoWidth * 0.52 + r * Math.cos(angle)
          const y = startY + logoHeight * 0.5 + r * Math.sin(angle) * 0.8
          
          // 添加一些随机偏移让填充更自然
          const offsetX = (Math.random() - 0.5) * 2
          const offsetY = (Math.random() - 0.5) * 2
          positions.push({ x: x + offsetX, y: y + offsetY })
        }
      }
    }

    // 添加水平线条的实心填充
    const lineThickness = 8 // 线条厚度
    for (let i = 0; i <= 100; i++) {
      for (let j = -lineThickness/2; j <= lineThickness/2; j += 1.5) {
        const t = i / 100
        const x = lineStartX + (lineEndX - lineStartX) * t
        const y = lineY + j + (Math.random() - 0.5) * 2
        positions.push({ x, y })
      }
    }

    // 添加更多随机填充点让图案更密集
    for (let i = 0; i < 150; i++) { // 增加随机填充点
      const angle = Math.random() * Math.PI * 2
      const radius = (Math.random() * 0.1 + 0.15) * logoHeight
      const x = startX + logoWidth * 0.52 + radius * Math.cos(angle)
      const y = startY + logoHeight * 0.5 + radius * Math.sin(angle) * 0.8
      
      // 确保点在C形状内部
      if (angle <= Math.PI * 0.85 || angle >= Math.PI * 1.15) {
        positions.push({ x, y })
      }
    }

    return positions
  }

  // 重置粒子到随机位置，触发重新汇聚动画
  const resetParticles = () => {
    const particles = particlesRef.current
    if (particles.length === 0) return

    particles.forEach(particle => {
      // 从画布边缘或随机位置开始
      const startFromEdge = Math.random() < 0.7 // 70% 概率从边缘开始，更酷炫
      
      if (startFromEdge) {
        const edge = Math.floor(Math.random() * 4) // 0:上, 1:右, 2:下, 3:左
        switch (edge) {
          case 0: // 从上边进入
            particle.x = Math.random() * width
            particle.y = -50
            break
          case 1: // 从右边进入
            particle.x = width + 50
            particle.y = Math.random() * height
            break
          case 2: // 从下边进入
            particle.x = Math.random() * width
            particle.y = height + 50
            break
          case 3: // 从左边进入
            particle.x = -50
            particle.y = Math.random() * height
            break
        }
      } else {
        // 从画布内随机位置开始
        particle.x = Math.random() * width
        particle.y = Math.random() * height
      }

      // 重置粒子状态
      particle.vx = 0
      particle.vy = 0
      particle.opacity = 0.1
      particle.hasReachedTarget = false
      particle.delayTimer = 0 // 重置延迟计时器
      particle.startDelay = Math.random() * 80 + particle.index * 0.3 // 重新计算延迟
    })

    console.log('🚀 粒子重新汇聚动画开始！')
  }

  // 创建粒子
  const createParticles = () => {
    const positions = createLogoPositions()
    targetPositionsRef.current = positions // 保存目标位置

    const particles: Particle[] = []

    positions.forEach((pos, index) => {
      const particle: Particle = {
        x: Math.random() * width,   // 从整个屏幕随机开始
        y: Math.random() * height,  // 从整个屏幕随机开始
        targetX: pos.x + (Math.random() - 0.5) * 2, // 减少随机偏移
        targetY: pos.y + (Math.random() - 0.5) * 2, // 减少随机偏移
        vx: 0,
        vy: 0,
        size: 1.2, // 从2.5减少到1.2，让粒子更细腻
        opacity: 0.1,
        maxOpacity: 0.95,
        baseOpacity: 0.8,
        hasReachedTarget: false,
        index,
        startDelay: Math.random() * 100 + index * 0.5, // 随机延迟 + 基于索引的波浪效果
        delayTimer: 0
      }
      particles.push(particle)
    })

    particlesRef.current = particles
    isInitializedRef.current = true

    console.log(`创建了 ${particles.length} 个粒子，将缓慢聚集成 Logo 图案`)
  }

  // 创建着色器
  const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) return null
    
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    
    return shader
  }

  // 创建程序
  const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram()
    if (!program) return null
    
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return null
    }
    
    return program
  }

  // 更新粒子
  const updateParticle = (particle: Particle, mouse: { x: number; y: number }) => {
    // 延迟逻辑 - 让粒子分批次开始聚集
    particle.delayTimer++
    const shouldStartMoving = particle.delayTimer > particle.startDelay

    // 计算到目标位置的距离
    const dx = particle.targetX - particle.x
    const dy = particle.targetY - particle.y
    const targetDistance = Math.sqrt(dx ** 2 + dy ** 2)

    // 计算到鼠标的距离
    const mouseDistance = Math.sqrt(
      (mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2
    )

    // 鼠标排斥效果
    const repelRadius = 120
    let repelForceX = 0
    let repelForceY = 0

    if (mouseDistance < repelRadius && mouseDistance > 0) {
      const repelStrength = Math.pow((repelRadius - mouseDistance) / repelRadius, 2)
      const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x)
      repelForceX = Math.cos(angle) * repelStrength * 8
      repelForceY = Math.sin(angle) * repelStrength * 8
    }

    // 向目标位置移动 - 动态调整聚集速度让动画更酷炫
    let attractStrength = 0.003 // 基础聚集速度，更慢开始

    if (targetDistance > 600) {
      attractStrength = 0.015 // 远距离时快速接近
    } else if (targetDistance > 300) {
      attractStrength = 0.01 // 中距离时保持速度
    } else if (targetDistance > 100) {
      attractStrength = 0.006 // 接近时减速
    } else if (targetDistance > 30) {
      attractStrength = 0.004 // 最后阶段精确定位
    }

    // 只有在延迟时间过后才开始向目标聚集
    let attractForceX = 0
    let attractForceY = 0
    
    if (shouldStartMoving) {
      attractForceX = dx * attractStrength
      attractForceY = dy * attractStrength
    }

    // 合成力
    particle.vx += attractForceX + repelForceX
    particle.vy += attractForceY + repelForceY

    // 阻尼
    particle.vx *= 0.88
    particle.vy *= 0.88

    // 限制最大速度
    const maxSpeed = 10
    const currentSpeed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2)
    if (currentSpeed > maxSpeed) {
      particle.vx = (particle.vx / currentSpeed) * maxSpeed
      particle.vy = (particle.vy / currentSpeed) * maxSpeed
    }

    // 更新位置
    particle.x += particle.vx
    particle.y += particle.vy

    // 检查是否接近目标
    if (targetDistance < 15) {
      particle.hasReachedTarget = true
    }

    // 透明度动画 - 考虑延迟效果
    let targetOpacity

    if (!shouldStartMoving) {
      // 还没开始移动的粒子保持很低透明度
      targetOpacity = 0.05
    } else if (targetDistance < 10) {
      targetOpacity = particle.maxOpacity
      particle.hasReachedTarget = true
    } else if (targetDistance < 30) {
      targetOpacity = particle.baseOpacity * (1 - targetDistance / 60)
    } else if (targetDistance < 100) {
      targetOpacity = 0.6
    } else {
      targetOpacity = 0.4
    }

    // 鼠标附近透明度变化
    if (mouseDistance < repelRadius) {
      const fadeStrength = 1 - (mouseDistance / repelRadius)
      targetOpacity *= (1 - fadeStrength * 0.7)
    }

    // 透明度过渡
    const opacitySpeed = 0.015
    if (particle.opacity < targetOpacity) {
      particle.opacity = Math.min(targetOpacity, particle.opacity + opacitySpeed)
    } else {
      particle.opacity = Math.max(targetOpacity, particle.opacity - opacitySpeed)
    }

    particle.opacity = Math.max(0.1, Math.min(1, particle.opacity))
  }

  // 绘制粒子
  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    if (particle.opacity <= 0.05) return

    ctx.save()

    const alpha = Math.min(1, particle.opacity)

    // 主体填充 - 明日方舟蓝色
    ctx.fillStyle = `rgba(0, 162, 255, ${alpha})`
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()

    // 边框，适应小粒子
    ctx.strokeStyle = `rgba(0, 162, 255, ${Math.min(1, alpha + 0.3)})`
    ctx.lineWidth = 0.3 // 减少边框宽度
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.stroke()

    // 内部高亮，适应小粒子
    if (alpha > 0.4) { // 降低高亮阈值
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 0.6)})`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2) // 调整高亮大小
      ctx.fill()
    }

    ctx.restore()
  }

  // Intersection Observer 监测可见性
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isCurrentlyVisible = entry.isIntersecting
          
          // 当从不可见变为可见时，触发重新汇聚动画
          if (isCurrentlyVisible && !isVisible) {
            console.log('🎯 组件进入可视区域，触发粒子汇聚动画')
            setTimeout(() => {
              resetParticles()
            }, 200) // 轻微延迟让动画更流畅
          }
          
          setIsVisible(isCurrentlyVisible)
        })
      },
      {
        root: null,
        rootMargin: '50px', // 提前50px触发
        threshold: 0.3 // 30%可见时触发
      }
    )

    observer.observe(canvas)

    return () => {
      observer.disconnect()
    }
  }, [isVisible])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Canvas 2D not supported')
      return
    }

    ctxRef.current = ctx

    // 设置画布大小
    canvas.width = width
    canvas.height = height

    // 创建粒子
    createParticles()

    // 鼠标事件
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // 动画循环
    const animate = () => {
      if (!ctxRef.current || !isInitializedRef.current) return

      const ctx = ctxRef.current
      const particles = particlesRef.current

      // 清除画布
      ctx.clearRect(0, 0, width, height)

      // 更新和绘制粒子
      particles.forEach(particle => {
        updateParticle(particle, mouseRef.current)
        drawParticle(ctx, particle)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // 开始动画
    animationRef.current = requestAnimationFrame(animate)
    setIsLoaded(true)

    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
      style={{ width, height }}
    />
  )
}
