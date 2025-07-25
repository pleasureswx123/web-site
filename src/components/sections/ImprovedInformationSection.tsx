'use client'

import { useState, useEffect } from 'react'

// 轮播横幅数据 - 基于UI图更新
const carouselBanners = [
  {
    id: 1,
    title: '心流元素动画「黎明前奏」',
    image: '/images/banners/news_20250721.png',
    url: 'https://www.bilibili.com/video/BV1dwg5zCEBD',
  },
  {
    id: 2,
    title: '泰拉记事社',
    image: '/images/banners/news_20250714.jpg',
    url: 'https://terra-historicus.hypergryph.com/',
  },
  {
    id: 3,
    title: '心流元素动画「黎明前奏」',
    image: '/images/banners/news_20250710.jpg',
    url: 'https://www.bilibili.com/bangumi/media/md26627738',
  },
  {
    id: 4,
    title: '「沙中之火」活动',
    image: '/images/banners/news_20250708.jpg',
    url: '/news/4956',
  },
  {
    id: 5,
    title: '「沙洲遗闻」活动',
    image: '/images/banners/news_20240501.png',
    url: '/ra/taleswithinthesand',
  },
]

// 新闻数据 - 基于UI图更新
const newsData = [
  {
    id: 1,
    type: '公告',
    date: '2025 // 07 / 22',
    title: '[心流元素]07月22日16:00闪断更新公告',
    url: '/news/5134',
  },
  {
    id: 2,
    type: '新闻',
    date: '2025 // 07 / 19',
    title: '《心流元素》制作组通讯#55期',
    url: '/news/0722',
  },
  {
    id: 3,
    type: '公告',
    date: '2025 // 07 / 17',
    title: '[心流元素]07月17日02:30闪断更新公告',
    url: '/news/7390',
  },
]

export default function ImprovedInformationSection() {
  const [currentBanner, setCurrentBanner] = useState(4) // 默认显示第5个（索引4）
  const [activeFilter, setActiveFilter] = useState('最新')

  const filters = ['最新', '公告', '活动', '新闻']

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % carouselBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 手动切换轮播
  const handleBannerClick = (index: number) => {
    setCurrentBanner(index)
  }

  const filteredNews = newsData.filter(item =>
    activeFilter === '最新' || item.type === activeFilter
  )

  // 计算轮播位置 - 基于原网站的实际数值
  const getTransformStyle = () => {
    const slideWidth = 1138 // 每个slide的宽度
    const translateX = -currentBanner * slideWidth
    return {
      cursor: 'grab',
      transitionDuration: '0ms',
      transform: `translate3d(${translateX}px, 0px, 0px)`,
      transitionDelay: '0ms'
    }
  }

  // 计算滚动条位置 - 基于原网站的实际数值
  const getScrollbarStyle = () => {
    const totalWidth = 835 // 滚动条总宽度
    const dragWidth = 167 // 拖拽条宽度
    const maxPosition = totalWidth - dragWidth
    const position = (currentBanner / (carouselBanners.length - 1)) * maxPosition
    return {
      transform: `translate3d(${Math.round(position)}px, 0px, 0px)`,
      width: `${dragWidth}px`,
      transitionDuration: '0ms'
    }
  }

  return (
    <div className="_446c7f49 _1d83b18b" style={{ left: 'auto' }}>
      {/* 背景装饰 */}
      <div className="_d034f64c"></div>

      {/* 主轮播横幅区域 */}
      <div className="_4c6251ec">
        <div className="swiper swiper-initialized swiper-horizontal _34ed7167 swiper-backface-hidden">
          <div className="swiper-wrapper" style={getTransformStyle()}>
            {carouselBanners.map((banner, index) => {
              const isActive = index === currentBanner
              const isPrev = index === (currentBanner - 1 + carouselBanners.length) % carouselBanners.length
              const isNext = index === (currentBanner + 1) % carouselBanners.length

              let slideClass = 'swiper-slide'
              if (isActive) slideClass += ' swiper-slide-active'
              if (isPrev) slideClass += ' swiper-slide-prev'
              if (isNext) slideClass += ' swiper-slide-next'

              return (
                <div
                  key={banner.id}
                  className={slideClass}
                  style={{ width: '1138px' }}
                  onClick={() => handleBannerClick(index)}
                >
                  <a className="_c684c97a" href={banner.url} target="_blank">
                    <img className="_c493fa1c" src={banner.image} alt={banner.title} />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 轮播滚动条 */}
      <div className="_84945841">
        <div className="_fcf0101c swiper-scrollbar-horizontal">
          <div className="swiper-scrollbar-drag" style={getScrollbarStyle()}></div>
        </div>
      </div>

      {/* 装饰背景元素 */}
      <div className="_2474bf68"></div>
      <div className="_5debcceb"></div>

      {/* 主要内容区域 - 重新布局 */}
      <div className="_f00913a8">
        <div className="_1aa87c3a"></div>
        <div className="_7e5f4af0"></div>

        {/* 左侧新闻列表区域 */}
        <div className="_6c630746">
          {/* 新闻分类筛选器 */}
          <div className="_8419bfdd">
            {filters.map((filter) => (
              <div
                key={filter}
                className={`_5adb7306 ${activeFilter === filter ? '_1d83b18b' : ''}`}
                onClick={() => setActiveFilter(filter)}
                style={{ cursor: 'pointer' }}
              >
                <span>{filter}</span>
                <div className="_1ec422e3">
                  <svg viewBox="0 0 7 15">
                    <use xlinkHref="#svg_def-icon_arrow"></use>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* 新闻列表 */}
          <div className="_0882dfb6">
            {filteredNews.map((news) => (
              <a key={news.id} className="_b6f1b9e5" target="_blank" href={news.url}>
                <div className="_b34281ac">{news.type}</div>
                <div className="_4e2f6712">
                  <div className="_78dcf6c5">{news.date}</div>
                  <div className="_9c298aed">{news.title}</div>
                </div>
              </a>
            ))}

            <a className="_b9c239f0" target="_blank" href="/news">
              <span>READ MORE</span>
              <div className="_1ec422e3">
                <svg viewBox="0 0 7 15">
                  <use xlinkHref="#svg_def-icon_arrow"></use>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
