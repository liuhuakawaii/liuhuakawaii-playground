/**
 * 页面头部组件
 * 包含导航栏和其他头部内容
 */

import { cn } from '@/utils/cn'
import { Navbar } from '../navigation'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn('w-full fixed top-0 left-0 right-0 z-50', className)}>
      <Navbar />
    </header>
  )
}