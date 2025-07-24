'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const links = [
    { label: '个人信息保护政策', url: 'https://user.hypergryph.com/protocol/ak/privacy' },
    { label: '儿童个人信息保护政策', url: 'https://user.hypergryph.com/protocol/ak/children_privacy' },
    { label: '使用许可及服务协议', url: 'https://user.hypergryph.com/protocol/ak/service' },
    { label: '应用权限', url: 'https://ak.hypergryph.com/protocol/authority' },
    { label: '家长监护', url: 'https://custody.hypergryph.com/' },
    { label: '联系我们', url: 'https://www.hypergryph.com/connect' },
  ]

  const legalInfo = [
    { label: '沪ICP备17022476号-1', url: 'https://beian.miit.gov.cn/' },
    { label: '沪网文〔2022〕0241-018号', url: null },
    { label: 'ISBN 978-7-498-05646-7', url: null },
    { label: '国新出审〔2019〕49号', url: null },
    { label: '沪公网安备 31010402005145号', url: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402005145' },
  ]

  return (
    <footer className="relative bg-ak-gray border-t border-ak-border mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* 主要链接 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {links.map((link, index) => (
            <span key={index} className="flex items-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ak-text-secondary hover:text-ak-primary transition-colors text-sm"
              >
                {link.label}
              </a>
              {index < links.length - 1 && (
                <span className="text-ak-text-secondary mx-2">|</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* 法律信息 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {legalInfo.map((info, index) => (
            <span key={index} className="text-ak-text-secondary text-xs">
              {info.url ? (
                <a
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ak-primary transition-colors"
                >
                  {info.label}
                </a>
              ) : (
                info.label
              )}
            </span>
          ))}
        </motion.div>

        {/* 游戏信息 */}
        <motion.div
          className="text-center space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-2">
            <p className="text-ak-text-secondary text-sm">
              <span className="text-ak-text">开发者：</span>
              <span className="text-ak-primary">上海鹰角网络科技有限公司</span>
            </p>
            <p className="text-ak-text-secondary text-sm">
              <span className="text-ak-text">游戏当前版本：</span>
              <span className="text-ak-primary">2.6.01</span>
            </p>
            <p className="text-ak-text-secondary text-sm">
              <span className="text-ak-text">游戏更新时间：</span>
              <span className="text-ak-primary">2025/07/08</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-ak-text-secondary text-sm">
              本网络游戏适合年满12周岁以上的用户使用；为了您的健康，请合理控制游戏时间。
            </p>
            <p className="text-ak-text-secondary text-xs">
              抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当
            </p>
            <p className="text-ak-text-secondary text-xs">
              适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活
            </p>
          </div>
        </motion.div>

        {/* 版权信息 */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-ak-text-secondary text-sm">
            Copyright ©2017 - 2025 上海鹰角网络科技有限公司
          </p>
          <p className="text-ak-text-secondary text-xs">
            上海市嘉定区南翔镇银翔路799号昌辉大厦504-1室
          </p>
          <p className="text-ak-text-secondary text-xs">
            电话：021-64399377
          </p>
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          className="flex justify-center space-x-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="w-16 h-16 bg-ak-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-ak-primary font-bold">AK</span>
          </div>
          <div className="w-16 h-16 bg-ak-secondary/10 rounded-lg flex items-center justify-center">
            <span className="text-ak-secondary font-bold">HG</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
