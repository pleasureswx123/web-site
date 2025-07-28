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

  // 创建 GVERCALL 字母的目标位置
  const createGVERCALLPositions = () => {
    const text = 'GVERCALL'
    const letterSpacing = 80 // 紧凑的字母间距
    const startX = (width - text.length * letterSpacing) / 2
    const startY = height / 2
    const positions: { x: number; y: number }[] = []

    // 定义每个字母的形状点位（更高大、更密集）
    const letterShapes: { [key: string]: number[][] } = {
      'G': [
        // 外圆弧
        [1,0],[2,0],[3,0],[4,0],
        [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
        [1,7],[2,7],[3,7],[4,7],
        [4,6],[4,5],[4,4],[3,4],[2,4],
        // 密度点
        [0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],
        [1.5,0.5],[2.5,0.5],[3.5,0.5],
        [1.5,7.5],[2.5,7.5],[3.5,7.5],
        [4.5,5.5],[4.5,4.5],[3.5,4.5],[2.5,4.5]
      ],
      'V': [
        [0,0],[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[2,7],
        [4,0],[4,1],[4,2],[3,3],[3,4],[2,5],[2,6],[2,7],
        [0.5,0.5],[0.5,1.5],[1.5,3.5],[1.5,4.5],
        [4.5,0.5],[4.5,1.5],[3.5,3.5],[3.5,4.5],
        [2.5,5.5],[2.5,6.5],[2.5,7.5]
      ],
      'E': [
        [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
        [1,0],[2,0],[3,0],[4,0],
        [1,3.5],[2,3.5],[3,3.5],
        [1,7],[2,7],[3,7],[4,7],
        [0.5,0.5],[0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],
        [1.5,0.5],[2.5,0.5],[3.5,0.5],
        [1.5,7.5],[2.5,7.5],[3.5,7.5]
      ],
      'R': [
        [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
        [1,0],[2,0],[3,0],
        [3,1],[3,2],[3,3],
        [1,3.5],[2,3.5],
        [1,4],[2,5],[3,6],[4,7],
        [0.5,0.5],[0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],
        [1.5,0.5],[2.5,0.5],
        [3.5,1.5],[3.5,2.5],
        [1.5,4.5],[2.5,5.5],[3.5,6.5]
      ],
      'C': [
        [1,0],[2,0],[3,0],[4,0],
        [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
        [1,7],[2,7],[3,7],[4,7],
        [1.5,0.5],[2.5,0.5],[3.5,0.5],
        [0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],
        [1.5,7.5],[2.5,7.5],[3.5,7.5]
      ],
      'A': [
        [2,0],[3,0],
        [1,1],[2,1],[3,1],[4,1],
        [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
        [0,3],[5,3],
        [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],
        [0,5],[5,5],[0,6],[5,6],[0,7],[5,7],
        [2.5,0.5],[1.5,1.5],[3.5,1.5],
        [0.5,2.5],[5.5,2.5],[0.5,3.5],[5.5,3.5],
        [0.5,4.5],[5.5,4.5],[0.5,5.5],[5.5,5.5]
      ],
      'L': [
        [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
        [1,7],[2,7],[3,7],[4,7],
        [0.5,0.5],[0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],
        [1.5,7.5],[2.5,7.5],[3.5,7.5]
      ]
    }

    text.split('').forEach((letter, letterIndex) => {
      const letterX = startX + letterIndex * letterSpacing
      const shape = letterShapes[letter] || []
      const scale = 6 // 适中的缩放

      shape.forEach(([dx, dy]) => {
        const x = letterX + dx * scale
        const y = startY - 28 + dy * scale

        // 添加轻微随机偏移
        const offsetX = (Math.random() - 0.5) * 2
        const offsetY = (Math.random() - 0.5) * 2

        positions.push({
          x: x + offsetX,
          y: y + offsetY
        })
      })
    })

    return positions
  }

  // 创建粒子
  const createParticles = () => {
    const positions = createGVERCALLPositions()

    const particles: Particle[] = []

    positions.forEach((pos, index) => {
      const particle: Particle = {
        x: Math.random() * width,   // 从整个屏幕随机开始
        y: Math.random() * height,  // 从整个屏幕随机开始
        targetX: pos.x + (Math.random() - 0.5) * 3,
        targetY: pos.y + (Math.random() - 0.5) * 3,
        vx: 0,
        vy: 0,
        size: 2.5, // 适中的粒子大小
        opacity: 0.1,
        maxOpacity: 0.95,
        baseOpacity: 0.8,
        hasReachedTarget: false,
        index
      }
      particles.push(particle)
    })

    particlesRef.current = particles
    isInitializedRef.current = true

    console.log(`创建了 ${particles.length} 个粒子，将缓慢聚集成 GVERCALL 字形`)
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

    // 向目标位置移动
    let attractStrength = 0.005 // 缓慢的聚集

    if (targetDistance > 400) {
      attractStrength = 0.01
    } else if (targetDistance > 200) {
      attractStrength = 0.007
    }

    const attractForceX = dx * attractStrength
    const attractForceY = dy * attractStrength

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

    // 透明度动画
    let targetOpacity

    if (targetDistance < 10) {
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

    // 边框
    ctx.strokeStyle = `rgba(0, 162, 255, ${Math.min(1, alpha + 0.2)})`
    ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.stroke()

    // 内部高亮
    if (alpha > 0.5) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 0.8)})`
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
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
