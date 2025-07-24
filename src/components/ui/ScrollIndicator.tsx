'use client'

import { motion } from 'framer-motion'

interface ScrollIndicatorProps {
  currentSection: string
}

export default function ScrollIndicator({ currentSection }: ScrollIndicatorProps) {
  return (
    <div className="ak-scroll-indicator">
      <div className="ak-scroll-content">
        <div className="ak-rhodes-logo">
          <svg viewBox="0 0 459.1 374.4">
            <use xlinkHref="#svg_def-logo_rhodes_island"></use>
          </svg>
        </div>
        <div className="ak-scroll-text">
          <div className="ak-scroll-label">SCROLL</div>
          <div className="ak-scroll-arrow">
            <svg viewBox="0 0 7 15" style={{ transform: 'rotate(90deg)' }}>
              <use xlinkHref="#svg_def-icon_arrow"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="ak-scroll-up">
        <div className="ak-scroll-arrow">
          <svg viewBox="0 0 7 15" style={{ transform: 'rotate(-90deg)' }}>
            <use xlinkHref="#svg_def-icon_arrow"></use>
          </svg>
        </div>
      </div>
    </div>
  )
}
