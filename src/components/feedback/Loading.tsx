/**
 * 加载状态组件
 * 提供统一的加载状态显示，支持文本和不同布局
 */

import { cn } from '@/utils/cn'
import Spinner from './Spinner'

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
  variant?: 'inline' | 'centered' | 'fullscreen' | 'app' | 'page'
  color?: 'primary' | 'white' | 'gray'
  minHeight?: string
}

const variantClasses = {
  inline: 'flex items-center gap-2',
  centered: 'flex flex-col items-center justify-center gap-3',
  fullscreen: 'fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-50',
  app: 'min-h-screen flex items-center justify-center bg-gray-50',
  page: 'flex items-center justify-center',
} as const

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
} as const

export default function Loading({
  size = 'md',
  text,
  className,
  variant = 'centered',
  color = 'primary',
  minHeight = 'min-h-[60vh]',
}: LoadingProps) {
  // 为 app 和 page variant 设置默认文本和大小
  const getDefaultText = () => {
    if (text) return text
    if (variant === 'app') return '应用加载中...'
    if (variant === 'page') return '页面加载中...'
    return undefined
  }

  const getDefaultSize = () => {
    if (variant === 'app') return 'xl'
    if (variant === 'page') return 'lg'
    return size
  }

  const finalText = getDefaultText()
  const finalSize = getDefaultSize()

  // 为 page variant 添加 minHeight
  const containerClass = variant === 'page'
    ? cn(variantClasses[variant], minHeight, className)
    : cn(variantClasses[variant], className)

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center justify-center gap-3">
        <Spinner size={finalSize} color={color} />
        {finalText && (
          <p className={cn('text-gray-600', textSizeClasses[finalSize])}>
            {finalText}
          </p>
        )}
      </div>
    </div>
  )
}