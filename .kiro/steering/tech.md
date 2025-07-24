# 技术栈与构建系统

## 核心技术

### 框架与运行时
- **Next.js 15.4.3** - 使用App Router架构的React框架
- **React 18.3.1** - 使用hooks和现代模式的UI库
- **TypeScript 5.7.2** - 严格配置的类型安全JavaScript
- **Node.js** - 运行时环境

### 样式与UI
- **Tailwind CSS 3.4.17** - 实用优先的CSS框架，配有自定义明日方舟主题
- **Framer Motion 11.11.17** - 高级动画和过渡效果
- **自定义CSS** - 保留原网站类名以实现像素级完美复刻
- **官方字体** - SourceHanSansSC、Novecentosanswide、Oswald、Bender

### 状态管理与工具
- **Zustand 5.0.2** - 轻量级状态管理
- **clsx 2.1.1** - 条件className工具
- **tailwind-merge 2.5.4** - Tailwind类合并工具

### 开发工具
- **Turbopack** - 开发环境快速打包器 (`pnpm dev --turbo`)
- **ESLint** - 使用Next.js配置的代码检查
- **PostCSS & Autoprefixer** - CSS处理
- **pnpm** - 包管理器（优于npm/yarn）

## 构建命令

```bash
# 开发环境（使用Turbopack加速构建）
pnpm dev

# 生产构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 安装依赖
pnpm install
```

## 架构模式

### 组件结构
- **Sections**: 主要页面组件 (`ImprovedIndexSection`、`OperatorSection`等)
- **Layout**: 共享组件 (`Navigation`、`Footer`、`LoadingScreen`)
- **UI**: 可复用组件 (`BackgroundMusic`、`CanvasBackground`、`ScrollIndicator`)

### 样式方法
- **CSS类名保留**: 保持原网站类名（如`_2a56b767`、`_c629adb0`）以确保准确性
- **Tailwind集成**: 带有明日方舟配色方案和动画的自定义主题
- **响应式设计**: 移动优先的方法，桌面端优化

### 状态管理
- **本地状态**: 组件级状态使用React hooks
- **全局状态**: 跨组件状态使用Zustand（音乐、导航）
- **URL状态**: 基于hash的路由用于页面导航

### 资源管理
- **静态资源**: 存储在`/public`目录（图片、字体、音频）
- **图片优化**: Next.js Image组件配合远程模式白名单
- **字体加载**: 预加载关键字体，使用`font-display: swap`

## 性能优化
- **Turbopack**: 快速开发构建
- **图片优化**: Next.js自动优化
- **字体预加载**: 关键字体提前加载
- **代码分割**: Next.js App Router自动处理
- **懒加载**: 图片和组件按需加载

## 重要约定
- 使用pnpm作为包管理器
- 保留原网站的CSS类名结构
- 使用中文进行交流和文档编写
- 优先使用官方资源文件