'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  alpha: number
}

interface WebGLCanvasProps {
  className?: string
  width?: number
  height?: number
}

export default function WebGLCanvas({ className = '', width = 800, height = 600 }: WebGLCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 顶点着色器源码
  const vertexShaderSource = `
    precision mediump float;

    attribute vec2 a_position;
    attribute float a_size;
    attribute float a_alpha;

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform mediump float u_time;

    varying float v_alpha;
    varying vec2 v_position;

    void main() {
      vec2 position = a_position;

      // 鼠标交互效果 - 更强的吸引和排斥
      vec2 mouseDistance = position - u_mouse;
      float distance = length(mouseDistance);
      float maxDistance = 150.0;

      if (distance < maxDistance) {
        float influence = (maxDistance - distance) / maxDistance;
        float pushPull = sin(u_time * 0.003) * 0.5 + 0.5; // 0-1之间变化

        // 吸引效果
        if (pushPull > 0.5) {
          position -= normalize(mouseDistance) * influence * 20.0 * (pushPull - 0.5) * 2.0;
        } else {
          // 排斥效果
          position += normalize(mouseDistance) * influence * 30.0 * (0.5 - pushPull) * 2.0;
        }
      }

      // 添加轻微的浮动效果
      position.x += sin(u_time * 0.001 + a_position.y * 0.01) * 2.0;
      position.y += cos(u_time * 0.0015 + a_position.x * 0.01) * 1.5;

      // 转换到裁剪空间
      vec2 clipSpace = ((position / u_resolution) * 2.0) - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      gl_PointSize = a_size + sin(u_time * 0.005) * 1.0;
      v_alpha = a_alpha;
      v_position = position;
    }
  `

  // 片段着色器源码
  const fragmentShaderSource = `
    precision mediump float;

    uniform mediump float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    varying float v_alpha;
    varying vec2 v_position;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float distance = length(coord);

      if (distance > 0.5) {
        discard;
      }

      // 基础透明度
      float alpha = (1.0 - distance * 2.0) * v_alpha;

      // 鼠标距离影响颜色
      float mouseDistance = length(v_position - u_mouse);
      float mouseInfluence = 1.0 / (1.0 + mouseDistance * 0.01);

      // 更亮的颜色渐变：明亮的青色到白色到金色
      vec3 color1 = vec3(0.0, 2.0, 2.0); // 明亮青色
      vec3 color2 = vec3(1.0, 1.0, 2.0); // 亮蓝白色
      vec3 color3 = vec3(2.0, 1.5, 0.0); // 金色

      float colorMix = sin(u_time * 0.002 + v_position.x * 0.01) * 0.5 + 0.5;
      vec3 baseColor = mix(color1, color2, colorMix);
      vec3 finalColor = mix(baseColor, color3, mouseInfluence * 0.8);

      // 增强闪烁和脉冲效果
      float flicker = sin(u_time * 0.003) * 0.3 + 1.0; // 更亮的基础值
      float pulse = sin(u_time * 0.01 + mouseDistance * 0.1) * 0.4 + 1.0; // 更强的脉冲

      // 增强边缘发光效果
      float glow = 1.0 - distance;
      glow = pow(glow, 1.5); // 更柔和的发光

      // 增加整体亮度
      alpha *= flicker * pulse * 1.5; // 增强透明度
      finalColor *= (flicker * pulse + glow * 1.2); // 增强亮度

      gl_FragColor = vec4(finalColor, alpha);
    }
  `

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

  // 生成 GVERCALL 文字粒子
  const generateTextParticles = () => {
    const particles: Particle[] = []
    const text = 'GVERCALL'
    const fontSize = 160 // 进一步增大字体大小
    const letterSpacing = fontSize * 0.7 // 减小字母间距，让字母更紧凑
    const startX = (width - text.length * letterSpacing) / 2
    const startY = height / 2

    // 为每个字母创建粒子
    text.split('').forEach((letter, letterIndex) => {
      const letterX = startX + letterIndex * letterSpacing

      // 更高大、更密集的字母形状定义
      const letterShapes: { [key: string]: number[][] } = {
        'G': [
          // 顶部横线
          [1,0],[2,0],[3,0],[4,0],[5,0],
          // 左侧竖线
          [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
          // 底部横线
          [1,8],[2,8],[3,8],[4,8],[5,8],
          // 右侧部分竖线和中间横线
          [5,7],[5,6],[5,5],[4,5],[3,5],[2,5],
          // 增加密度点
          [0.5,0.5],[1.5,0.5],[2.5,0.5],[3.5,0.5],[4.5,0.5],
          [0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],[0.5,7.5],
          [1.5,8.5],[2.5,8.5],[3.5,8.5],[4.5,8.5],
          [5.5,6.5],[5.5,5.5],[4.5,5.5],[3.5,5.5],[2.5,5.5]
        ],
        'V': [
          // 左侧斜线
          [0,0],[0,1],[0,2],[1,3],[1,4],[1,5],[2,6],[2,7],[2,8],
          // 右侧斜线
          [4,0],[4,1],[4,2],[3,3],[3,4],[3,5],[2,6],[2,7],[2,8],
          // 增加密度
          [0.5,0.5],[0.5,1.5],[0.5,2.5],[1.5,3.5],[1.5,4.5],[1.5,5.5],
          [4.5,0.5],[4.5,1.5],[4.5,2.5],[3.5,3.5],[3.5,4.5],[3.5,5.5],
          [2.5,6.5],[2.5,7.5],[2.5,8.5]
        ],
        'E': [
          // 左侧竖线
          [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
          // 顶部横线
          [1,0],[2,0],[3,0],[4,0],[5,0],
          // 中间横线
          [1,4],[2,4],[3,4],[4,4],
          // 底部横线
          [1,8],[2,8],[3,8],[4,8],[5,8],
          // 增加密度
          [0.5,0.5],[0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],[0.5,7.5],
          [1.5,0.5],[2.5,0.5],[3.5,0.5],[4.5,0.5],
          [1.5,4.5],[2.5,4.5],[3.5,4.5],
          [1.5,8.5],[2.5,8.5],[3.5,8.5],[4.5,8.5]
        ],
        'R': [
          // 左侧竖线
          [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
          // 顶部横线
          [1,0],[2,0],[3,0],[4,0],
          // 右侧上半部分
          [4,1],[4,2],[4,3],[4,4],
          // 中间横线
          [1,4],[2,4],[3,4],
          // 右下斜线
          [1,5],[2,6],[3,7],[4,8],
          // 增加密度
          [0.5,0.5],[0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],[0.5,7.5],
          [1.5,0.5],[2.5,0.5],[3.5,0.5],
          [4.5,1.5],[4.5,2.5],[4.5,3.5],
          [1.5,4.5],[2.5,4.5],[3.5,4.5],
          [1.5,5.5],[2.5,6.5],[3.5,7.5],[4.5,8.5]
        ],
        'C': [
          // 顶部横线
          [1,0],[2,0],[3,0],[4,0],[5,0],
          // 左侧竖线
          [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
          // 底部横线
          [1,8],[2,8],[3,8],[4,8],[5,8],
          // 增加密度
          [1.5,0.5],[2.5,0.5],[3.5,0.5],[4.5,0.5],
          [0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],
          [1.5,8.5],[2.5,8.5],[3.5,8.5],[4.5,8.5]
        ],
        'A': [
          // 顶部尖角
          [2,0],[3,0],
          // 左右斜线
          [1,1],[2,1],[3,1],[4,1],
          [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
          [0,3],[5,3],
          // 中间横线
          [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],
          [0,5],[5,5],
          [0,6],[5,6],
          [0,7],[5,7],
          [0,8],[5,8],
          // 增加密度
          [2.5,0.5],[3.5,0.5],
          [1.5,1.5],[2.5,1.5],[3.5,1.5],[4.5,1.5],
          [0.5,2.5],[1.5,2.5],[2.5,2.5],[3.5,2.5],[4.5,2.5],[5.5,2.5],
          [0.5,3.5],[5.5,3.5],
          [0.5,4.5],[1.5,4.5],[2.5,4.5],[3.5,4.5],[4.5,4.5],[5.5,4.5],
          [0.5,5.5],[5.5,5.5],[0.5,6.5],[5.5,6.5],[0.5,7.5],[5.5,7.5]
        ],
        'L': [
          // 左侧竖线
          [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
          // 底部横线
          [1,8],[2,8],[3,8],[4,8],[5,8],
          // 增加密度
          [0.5,0.5],[0.5,1.5],[0.5,2.5],[0.5,3.5],[0.5,4.5],[0.5,5.5],[0.5,6.5],[0.5,7.5],
          [1.5,8.5],[2.5,8.5],[3.5,8.5],[4.5,8.5]
        ]
      }

      const shape = letterShapes[letter] || []
      const scale = 8 // 适中的缩放比例，让字母更紧凑

      shape.forEach(([dx, dy]) => {
        const x = letterX + dx * scale
        const y = startY - 36 + dy * scale // 调整垂直位置

        // 添加一些随机偏移让效果更自然
        const offsetX = (Math.random() - 0.5) * 2
        const offsetY = (Math.random() - 0.5) * 2

        particles.push({
          x: x + offsetX,
          y: y + offsetY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
          maxLife: 1,
          size: Math.random() * 3 + 4, // 保持较大的粒子大小
          alpha: Math.random() * 0.3 + 0.7 // 增加透明度
        })
      })
    })

    return particles
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    // 设置画布大小
    canvas.width = width
    canvas.height = height
    gl.viewport(0, 0, width, height)

    // 创建着色器和程序
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    if (!vertexShader || !fragmentShader) return
    
    const program = createProgram(gl, vertexShader, fragmentShader)
    if (!program) return

    // 获取属性和uniform位置
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const sizeLocation = gl.getAttribLocation(program, 'a_size')
    const alphaLocation = gl.getAttribLocation(program, 'a_alpha')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
    const timeLocation = gl.getUniformLocation(program, 'u_time')

    // 初始化粒子
    particlesRef.current = generateTextParticles()

    // 创建缓冲区
    const positionBuffer = gl.createBuffer()
    const sizeBuffer = gl.createBuffer()
    const alphaBuffer = gl.createBuffer()

    // 启用混合
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let startTime = Date.now()

    const render = () => {
      const currentTime = Date.now()
      const time = currentTime - startTime

      // 清除画布
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // 使用程序
      gl.useProgram(program)

      // 设置uniform
      gl.uniform2f(resolutionLocation, width, height)
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)
      gl.uniform1f(timeLocation, time)

      const particles = particlesRef.current
      if (particles.length === 0) return

      // 准备数据
      const positions = new Float32Array(particles.length * 2)
      const sizes = new Float32Array(particles.length)
      const alphas = new Float32Array(particles.length)

      particles.forEach((particle, i) => {
        positions[i * 2] = particle.x
        positions[i * 2 + 1] = particle.y
        sizes[i] = particle.size
        alphas[i] = particle.alpha
      })

      // 设置位置数据
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      // 设置大小数据
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(sizeLocation)
      gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, 0, 0)

      // 设置透明度数据
      gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(alphaLocation)
      gl.vertexAttribPointer(alphaLocation, 1, gl.FLOAT, false, 0, 0)

      // 绘制粒子
      gl.drawArrays(gl.POINTS, 0, particles.length)

      animationRef.current = requestAnimationFrame(render)
    }

    // 鼠标事件处理
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    
    setIsLoaded(true)
    render()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener('mousemove', handleMouseMove)
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
