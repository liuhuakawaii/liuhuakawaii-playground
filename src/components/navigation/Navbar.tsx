/**
 * 导航栏组件
 * 应用顶部导航栏，包含 Logo、主导航和用户操作区域
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { APP_CONFIG } from '@/constants'
import { cn } from '@/utils/cn'
import { getNavigationItems } from '../../config/navigation-config'
import NavLink from './NavLink'
import MobileMenu from './MobileMenu'

interface NavbarProps {
  className?: string
}

export default function Navbar({ className }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigationItems = getNavigationItems()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={cn(
      "bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20",
      "sticky top-0 z-50 transition-all duration-300",
      className
    )}>
      {/* 装饰性渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-secondary-50/30 pointer-events-none" />

      <div className="container-responsive relative">
        <div className="flex justify-between h-16">
          {/* 左侧：Logo 和桌面端导航 */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className={cn(
                  "text-xl font-bold transition-all duration-300 transform hover:scale-105",
                  "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary-600 hover:to-secondary-600",
                  "text-gray-900"
                )}
              >
                {APP_CONFIG.name}
              </Link>
            </div>

            {/* 桌面端导航链接 */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  variant="desktop"
                />
              ))}
            </div>
          </div>

          {/* 右侧：用户操作区域 */}
          <div className="flex items-center space-x-4">

            {/* 移动端菜单按钮 */}
            <button
              type="button"
              className={cn(
                "sm:hidden inline-flex items-center justify-center p-2 rounded-xl",
                "text-gray-400 hover:text-primary-600 transition-all duration-200",
                "hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-secondary-50/30",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2",
                "transform hover:scale-110"
              )}
              onClick={toggleMobileMenu}
              aria-expanded="false"
            >
              <span className="sr-only">打开主菜单</span>
              {/* 汉堡菜单图标 */}
              <svg
                className={cn("h-6 w-6", isMobileMenuOpen && "hidden")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* 关闭图标 */}
              <svg
                className={cn("h-6 w-6", !isMobileMenuOpen && "hidden")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navigationItems={navigationItems}
      />
    </nav>
  )
}