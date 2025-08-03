'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { useMusic } from '@/hooks/useMusicControl'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Share2,
  Volume2,
  VolumeX,
  User,
  Menu,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface OriginalNavigationProps {
  currentSection: string
}

const navigationItems = [
  { id: 'index', label: 'INDEX', labelCn: '首页' },
  { id: 'information', label: 'EVENTS', labelCn: '新闻' },
  { id: 'operator', label: 'CHARACTERS', labelCn: '角色' },
  { id: 'world', label: 'WORLD', labelCn: '设定' },
  { id: 'media', label: 'MEDIA', labelCn: '泰拉万象' },
  { id: 'more', label: 'MORE', labelCn: '更多内容' },
]

const socialLinks = [
  { name: '官方微博', icon: MessageCircle, color: 'bg-red-500', href: '#' },
  { name: '官方QQ群', icon: Phone, color: 'bg-blue-500', href: '#' },
  { name: '官方微信', icon: Mail, color: 'bg-green-500', href: '#' },
]

export default function OriginalNavigation({ currentSection }: OriginalNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isPlaying: isMusicPlaying, togglePlay } = useMusic()

  const handleMusicToggle = () => {
    togglePlay()
    // 注意：这里的状态是切换前的状态，所以逻辑相反
    toast.success(!isMusicPlaying ? '音乐已暂停' : '音乐已播放')
  }

  const handleSocialClick = (name: string) => {
    toast.info(`正在跳转到${name}`)
  }

  const handleUserAction = (action: string) => {
    toast.info(`${action}功能开发中`)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <motion.a
            href="/#index"
            className="flex items-center ml-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/logo.png"
              alt="心流元素"
              width={513}
              height={100}
              className="h-8 w-auto object-contain"
              priority
            />
          </motion.a>

          {/* Desktop Navigation Menu */}
          <motion.div
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navigationItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "group flex flex-col transition-all duration-300 rounded-lg",
                  currentSection === item.id
                    ? 'text-ak-primary'
                    : 'text-white/80 hover:text-ak-primary'
                )}
              >
                <span className="text-lg font-medium tracking-wider font-ak-secondary">
                  {item.label}
                </span>
                <span className="text-xs opacity-70 font-ak-primary">
                  {item.labelCn}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 border-ak-primary/20">
                <SheetHeader>
                  <SheetTitle className="text-ak-primary font-ak-title">导航菜单</SheetTitle>
                  <SheetDescription className="text-ak-text-secondary">
                    选择要访问的页面
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentSection === item.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-12",
                        currentSection === item.id
                          ? "bg-ak-primary text-black"
                          : "text-white hover:bg-white/10"
                      )}
                      onClick={() => {
                        window.location.href = `#${item.id}`
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-ak-secondary">{item.label}</span>
                        <span className="text-xs opacity-70 font-ak-primary">{item.labelCn}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Right Icons */}
          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Social Media Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <motion.div>
                  <Share2 className="cursor-pointer text-white/80 hover:text-ak-primary w-6 h-6" />
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-black/95 border-ak-primary/20 backdrop-blur-md">
                <div className="space-y-3">
                  <h4 className="text-ak-primary font-ak-secondary font-semibold">社交媒体</h4>
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <Button
                        key={social.name}
                        variant="ghost"
                        className="w-full justify-start gap-3 text-white hover:bg-ak-primary/10 hover:text-ak-primary"
                        onClick={() => handleSocialClick(social.name)}
                      >
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", social.color)}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span>{social.name}</span>
                      </Button>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>

            {/* Music Toggle Button */}
            <motion.div>
              <div className="cursor-pointer text-white/80 hover:text-ak-primary w-6 h-6" onClick={handleMusicToggle}>
                {isMusicPlaying ? (<Volume2 className="text-ak-primary" />) : (<VolumeX />)}
              </div>
            </motion.div>

            {/* User Menu Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <motion.div>
                  <User className="cursor-pointer text-white/80 hover:text-ak-primary w-6 h-6" />
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-black/95 border-ak-primary/20 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle className="text-ak-primary font-ak-title">用户中心</DialogTitle>
                  <DialogDescription className="text-ak-text-secondary">
                    管理您的账户和设置
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 items-center">
                  <Button
                    className="w-full bg-ak-primary hover:bg-ak-primary/90 text-black font-ak-secondary"
                    onClick={() => handleUserAction('登录')}
                  >
                    登录
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-ak-primary/30 text-black hover:bg-ak-primary/10 hover:text-ak-primary"
                    onClick={() => handleUserAction('注册')}
                  >
                    注册
                  </Button>
                </div>
                <div className="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    className="w-full text-white bg-white/50 hover:bg-white/30 hover:text-ak-primary"
                    onClick={() => handleUserAction('个人中心')}
                  >
                    个人中心
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </nav>
  )
}
