'use client'

import { useState, useEffect } from 'react'

export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    // 格式化日期为 YYYY/MM/DD 格式
    const formatDate = (date: Date): string => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}/${month}/${day}`
    }

    // 初始设置当前日期
    const updateDate = () => {
      setCurrentDate(formatDate(new Date()))
    }

    // 立即更新一次
    updateDate()

    // 每分钟更新一次日期（以防跨日）
    const interval = setInterval(updateDate, 60000)

    // 清理定时器
    return () => clearInterval(interval)
  }, [])

  return currentDate
}
