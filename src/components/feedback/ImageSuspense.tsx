/**
 * 图片Suspense组件
 * 用于处理图片加载时的loading状态
 */

import { Suspense } from 'react'
import HamsterLoading from './HamsterLoading'
import LazyImage from './LazyImage'

interface ImageSuspenseProps {
  src: string
  alt?: string
  className?: string
  onLoad?: () => void
  children?: React.ReactNode
}

export default function ImageSuspense({ 
  src, 
  alt, 
  className, 
  onLoad,
  children 
}: ImageSuspenseProps) {
  return (
    <Suspense fallback={<HamsterLoading />}>
      <LazyImage 
        src={src} 
        alt={alt} 
        className={className} 
        onLoad={onLoad}
      >
        {children}
      </LazyImage>
    </Suspense>
  )
}