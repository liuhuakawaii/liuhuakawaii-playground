/**
 * 主内容区域组件
 * 页面的主要内容容器
 */

import { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
  className?: string
}

export default function MainContent({ children, className }: MainContentProps) {
  return (
    <main className={`container-responsive py-8 pt-[100px] ${className || ''}`}>
      {children}
    </main>
  )
}