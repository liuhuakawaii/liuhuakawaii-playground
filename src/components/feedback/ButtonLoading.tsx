/**
 * 按钮内加载组件
 * 专门用于按钮内部的加载状态显示
 * 注意：这是 Spinner 的简单包装，主要用于语义化和默认配置
 */

import Spinner from './Spinner'

interface ButtonLoadingProps {
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export default function ButtonLoading({
  size = 'sm',
  className
}: ButtonLoadingProps) {
  return (
    <Spinner
      size={size}
      color="white"
      className={className}
    />
  )
}