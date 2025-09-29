/**
 * 旋转加载器组件
 * 基础的旋转加载动画，可配置大小和颜色
 */

import { cn } from '@/utils/cn'

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray'
  className?: string
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
} as const

const colorClasses = {
  primary: 'border-gray-200 border-t-primary-600',
  white: 'border-white/30 border-t-white',
  gray: 'border-gray-300 border-t-gray-600',
} as const

export default function Spinner({
  size = 'md',
  color = 'primary',
  className
}: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="加载中"
    />
  )
}