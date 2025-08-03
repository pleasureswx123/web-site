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
  color: { r: number; g: number; b: number }
}

interface ParticleCanvasProps {
  className?: string
  style?: React.CSSProperties
}

export default function WebGLCanvas({ className = '', style }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const isInitializedRef = useRef(false)
  const targetPositionsRef = useRef<{ x: number; y: number }[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 创建艺术体圆形E字的目标位置
  const createLetterE = () => {
    const canvas = canvasRef.current
    if (!canvas) return []

    const positions: { x: number; y: number }[] = []

    // 定义艺术体圆形E的形状点位 - 放在页面正中间
    const centerX = canvas.width / 2 // E字的中心X位置，页面水平居中
    const centerY = canvas.height / 2 // E字的中心Y位置，页面垂直居中
    const radius = 200 // 圆形E的半径，放大2倍（原来120 -> 240）

    // 艺术体圆形E的结构：有开口的圆环 + 中间水平线
    const spacing = 40 // 减小间距，增加粒子密度（原来9 -> 4）
    const strokeWidth = 20 // 增加笔画宽度，更多层粒子（原来3 -> 5）

    // 1. 创建有开口的圆形外环（右侧开口）
    const outerRadius = radius
    const innerRadius = radius - strokeWidth * spacing

    // 绘制有开口的圆环，上下都略微延长
    // 从45度绘制到315度，上下都稍微延长，减小角度步长增加密度
    for (let angle = Math.PI * 0.25; angle <= Math.PI * 1.75; angle += 0.04) { // 角度步长从0.08减小到0.04
      // 外圆弧的多层粒子
      for (let r = innerRadius; r <= outerRadius; r += spacing) {
        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r
        positions.push({ x, y })
      }
    }

    // 2. 创建中间的水平线（从左边界到右侧开口）
    const lineY = centerY
    const lineStartX = centerX - outerRadius + spacing
    const lineEndX = centerX + innerRadius - spacing // 只延伸到内圆，不封闭开口

    // 计算水平线的粗细，使其与圆环粗细一致
    const lineThickness = strokeWidth * spacing // 与圆环粗细保持一致
    const halfThickness = lineThickness / 2

    for (let x = lineStartX; x <= lineEndX; x += spacing) {
      // 垂直方向填充，使线条粗细与圆环一致
      for (let y = lineY - halfThickness; y <= lineY + halfThickness; y += spacing) {
        positions.push({
          x: x,
          y: y
        })
      }
    }

    return positions
  }

  // 创建粒子
  const createParticles = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const positions = createLetterE()
    targetPositionsRef.current = positions

    const particles: Particle[] = []

    // 创建粒子 - 从整个屏幕随机位置开始，实现缓慢聚集效果
    positions.forEach((pos, index) => {
      const particle: Particle = {
        x: Math.random() * canvas.width,   // 从整个屏幕宽度随机开始
        y: Math.random() * canvas.height,  // 从整个屏幕高度随机开始
        targetX: pos.x + (Math.random() - 0.5) * 3, // 适当的随机偏移让艺术体更自然
        targetY: pos.y + (Math.random() - 0.5) * 3,
        vx: 0,
        vy: 0,
        size: 1.2, // 更小的粒子（原来1.8 -> 1.2）
        opacity: 0.08, // 稍高的初始透明度，更清晰
        maxOpacity: 0.95,
        baseOpacity: 0.9,
        hasReachedTarget: false,
        index,
        color: { r: 255, g: 255, b: 255 } // 纯白色粒子
      }
      particles.push(particle)
    })

    particlesRef.current = particles
    isInitializedRef.current = true

    console.log(`创建了 ${particles.length} 个更小更密集的纯白色粒子，将超级缓慢聚集成页面中央2倍大小的单开口、上下略微延长的圆形艺术体E字形状`)
  }

  // 更新粒子
  const updateParticle = (particle: Particle, mouse: { x: number; y: number }) => {
    // 计算到目标位置的距离
    const dx = particle.targetX - particle.x
    const dy = particle.targetY - particle.y
    const targetDistance = Math.sqrt(dx ** 2 + dy ** 2)

    // 计算到鼠标的距离
    const mouseDistance = Math.sqrt(
      (mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2
    )

    // 鼠标排斥效果 - 增大范围和强度
    const repelRadius = 100
    let repelForceX = 0
    let repelForceY = 0

    if (mouseDistance < repelRadius && mouseDistance > 0) {
      const repelStrength = Math.pow((repelRadius - mouseDistance) / repelRadius, 2)
      const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x)
      repelForceX = Math.cos(angle) * repelStrength * 7 // 进一步增强散开力度，比还原更快
      repelForceY = Math.sin(angle) * repelStrength * 7
    }

    // 缓慢的向目标位置移动 - 超级缓慢的还原
    let attractStrength = 0.003 // 超级极小的引力，让聚集超级缓慢

    // 距离越远，引力稍微增强
    if (targetDistance > 450) {
      attractStrength = 0.008
    } else if (targetDistance > 250) {
      attractStrength = 0.005
    }

    const attractForceX = dx * attractStrength
    const attractForceY = dy * attractStrength

    // 合成力
    particle.vx += attractForceX + repelForceX
    particle.vy += attractForceY + repelForceY

    // 增加阻尼让运动更缓慢平稳
    particle.vx *= 0.9
    particle.vy *= 0.9

    // 限制最大速度 - 允许散开时非常快的速度
    const maxSpeed = 8
    const currentSpeed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2)
    if (currentSpeed > maxSpeed) {
      particle.vx = (particle.vx / currentSpeed) * maxSpeed
      particle.vy = (particle.vy / currentSpeed) * maxSpeed
    }

    // 更新位置
    particle.x += particle.vx
    particle.y += particle.vy

    // 检查是否接近目标位置
    if (targetDistance < 15) {
      particle.hasReachedTarget = true
    }

    // 简化的透明度动画 - 缓慢增加透明度
    let targetOpacity

    if (targetDistance < 10) {
      // 非常接近目标时达到最大透明度
      targetOpacity = particle.maxOpacity
      particle.hasReachedTarget = true
    } else if (targetDistance < 30) {
      // 接近目标时逐渐变亮
      targetOpacity = particle.baseOpacity * (1 - targetDistance / 60)
    } else if (targetDistance < 100) {
      // 中等距离时保持中等透明度
      targetOpacity = 0.5
    } else {
      // 远离目标时保持较低透明度
      targetOpacity = 0.3
    }

    // 鼠标附近透明度变化 - 更强的透明度变化
    if (mouseDistance < repelRadius) {
      const fadeStrength = 1 - (mouseDistance / repelRadius)
      targetOpacity *= (1 - fadeStrength * 0.8) // 增强透明度变化效果
    }

    // 适中的透明度过渡
    const opacitySpeed = 0.012 // 适度提高透明度变化速度，增强清晰度
    if (particle.opacity < targetOpacity) {
      particle.opacity = Math.min(targetOpacity, particle.opacity + opacitySpeed)
    } else {
      particle.opacity = Math.max(targetOpacity, particle.opacity - opacitySpeed)
    }

    // 确保透明度范围
    particle.opacity = Math.max(0.1, Math.min(1, particle.opacity))
  }

  // 绘制粒子
  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    if (particle.opacity <= 0.05) return

    ctx.save()

    // 绘制高清晰度的白色圆点
    const alpha = Math.min(1, particle.opacity)

    // 主体填充
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()

    // 高清晰度边框（适配极小粒子）
    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.2)})`
    ctx.lineWidth = 0.4
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.stroke()

    // 内部高亮点增强清晰度
    if (alpha > 0.4) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.2)})`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  }

  // 调整画布大小
  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

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
    resizeCanvas()

    // 创建粒子
    createParticles()

    // 鼠标事件
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    // 窗口大小变化事件
    const handleResize = () => {
      resizeCanvas()
      createParticles() // 重新创建字母E的位置
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    // 动画循环
    const animate = () => {
      if (!ctxRef.current || !isInitializedRef.current) return

      const ctx = ctxRef.current
      const particles = particlesRef.current

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (particles.length > 0) {
        // 绘制粒子
        particles.forEach(particle => {
          updateParticle(particle, mouseRef.current)
          drawParticle(ctx, particle)
        })
      }

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
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none bg-transparent z-[999] ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
      style={{
        ...style,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'transparent',
        zIndex: 999
      }}
    />
  )
}
