/**
 * 懒加载图片组件
 * 实现图片预加载逻辑，使用Suspense模式
 */

interface LazyImageProps {
  src: string
  alt?: string
  className?: string
  onLoad?: () => void
  children?: React.ReactNode
}

// 图片加载状态缓存
const imageCache = new Map<string, 'loading' | 'loaded' | 'error'>()
const imagePromises = new Map<string, Promise<void>>()

// 图片预加载函数
const loadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('开始加载图片:', src)
    const img = new Image()
    
    img.onload = () => {
      console.log('图片加载成功:', src)
      imageCache.set(src, 'loaded')
      resolve()
    }
    
    img.onerror = (error) => {
      console.error('图片加载失败:', src, error)
      imageCache.set(src, 'error')
      reject(new Error(`Failed to load image: ${src}`))
    }
    
    img.src = src
  })
}

// 获取图片加载Promise
const getImagePromise = (src: string): Promise<void> => {
  const cached = imageCache.get(src)
  
  if (cached === 'loaded') {
    return Promise.resolve()
  }
  
  if (cached === 'error') {
    return Promise.reject(new Error(`Image failed to load: ${src}`))
  }
  
  if (!imagePromises.has(src)) {
    imageCache.set(src, 'loading')
    imagePromises.set(src, loadImage(src))
  }
  
  return imagePromises.get(src)!
}

export default function LazyImage({ 
  src, 
  alt, 
  className, 
  onLoad,
  children 
}: LazyImageProps) {
  const cached = imageCache.get(src)
  
  // 如果图片还在加载中，抛出Promise让Suspense捕获
  if (cached !== 'loaded') {
    console.log('图片未加载完成，抛出Promise:', src, cached)
    throw getImagePromise(src).catch(() => {
      // 即使加载失败也要显示内容，避免无限loading
      console.log('图片加载失败，但仍显示内容:', src)
    })
  }

  console.log('图片已加载，渲染内容:', src)
  
  // 调用加载完成回调
  if (onLoad) {
    setTimeout(onLoad, 0)
  }

  return (
    <div
      className={`relative w-full h-screen bg-cover bg-fixed bg-no-repeat flex items-center justify-center ${className || ''}`}
      style={{ backgroundImage: `url(${src})` }}
    >
      {children}
    </div>
  )
}