'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallbackText?: string
}

export function SplineScene({ 
  scene, 
  className = "w-full h-full",
  fallbackText = "Loading 3D Scene..."
}: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-ak-secondary text-sm font-mono tracking-wider animate-pulse">
            {fallbackText}
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
