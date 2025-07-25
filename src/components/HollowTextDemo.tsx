'use client'

import { motion } from 'framer-motion'

export default function HollowTextDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          镂空文字效果演示
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 方法1: mix-blend-mode difference */}
          <motion.div 
            className="bg-blue-500 h-48 flex items-center justify-center relative rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-[80px] font-bold text-white mix-blend-difference select-none font-ak-title">
              GVERCALL
            </div>
            <div className="absolute top-4 left-4 text-sm text-white/80 bg-black/20 px-2 py-1 rounded">
              mix-blend-mode
            </div>
          </motion.div>

          {/* 方法2: background-clip text - 渐变 */}
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-48 flex items-center justify-center relative rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-[80px] font-bold hollow-text-gradient select-none font-ak-title">
              GVERCALL
            </div>
            <div className="absolute top-4 left-4 text-sm text-white/80 bg-black/20 px-2 py-1 rounded">
              gradient clip
            </div>
          </motion.div>

          {/* 方法3: 背景图片镂空 */}
          <motion.div 
            className="bg-green-500 h-48 flex items-center justify-center relative rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-[80px] font-bold hollow-text-image select-none font-ak-title">
              GVERCALL
            </div>
            <div className="absolute top-4 left-4 text-sm text-white/80 bg-black/20 px-2 py-1 rounded">
              image clip
            </div>
          </motion.div>

          {/* 方法4: 描边镂空 */}
          <motion.div 
            className="bg-red-500 h-48 flex items-center justify-center relative rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-[80px] font-bold hollow-text-stroke select-none font-ak-title">
              GVERCALL
            </div>
            <div className="absolute top-4 left-4 text-sm text-white/80 bg-black/20 px-2 py-1 rounded">
              text stroke
            </div>
          </motion.div>

          {/* 方法5: 阴影镂空 */}
          <motion.div 
            className="bg-yellow-500 h-48 flex items-center justify-center relative rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-[80px] font-bold hollow-text-shadow select-none font-ak-title">
              GVERCALL
            </div>
            <div className="absolute top-4 left-4 text-sm text-black/60 bg-white/20 px-2 py-1 rounded">
              text shadow
            </div>
          </motion.div>

          {/* 方法6: 组合效果 */}
          <motion.div 
            className="bg-gradient-to-br from-indigo-600 to-purple-600 h-48 flex items-center justify-center relative rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div 
              className="text-[80px] font-bold text-white mix-blend-difference select-none font-ak-title"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              GVERCALL
            </motion.div>
            <div className="absolute top-4 left-4 text-sm text-white/80 bg-black/20 px-2 py-1 rounded">
              动画 + 镂空
            </div>
          </motion.div>
        </div>

        {/* 代码示例 */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">实现代码</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">1. mix-blend-mode (推荐)</h3>
              <pre className="bg-gray-900 p-3 rounded text-gray-300 overflow-x-auto">
{`<div className="bg-blue-500 flex items-center justify-center">
  <div className="text-[100px] font-bold text-white mix-blend-difference">
    GVERCALL
  </div>
</div>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">2. background-clip</h3>
              <pre className="bg-gray-900 p-3 rounded text-gray-300 overflow-x-auto">
{`<div className="text-[100px] font-bold hollow-text-gradient">
  GVERCALL
</div>

/* CSS */
.hollow-text-gradient {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}