/**
 * 二级菜单下拉组件
 * 现代化的下拉菜单，支持动画和玻璃态效果
 */

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { isActiveRoute, type NavItem } from '../../config/navigation-config'

interface DropdownMenuProps {
  trigger: React.ReactNode
  items: NavItem[]
  className?: string
}

export default function DropdownMenu({ trigger, items, className }: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  return (
    <div
      className={cn("relative flex-center group/dropdown", className)}
      ref={dropdownRef}
    >
      {/* 触发器 */}
      <div className="cursor-pointer">
        {trigger}
      </div>

      <div className={cn(
        "absolute top-full left-0 mt-2 w-80 z-50",
        "bg-white/90 backdrop-blur-xl border border-white/20",
        "rounded-2xl shadow-2xl overflow-hidden",
        "transform transition-all duration-300 ease-out",
        "opacity-0 translate-y-2 scale-95 group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:scale-100"
      )}>
        {/* 装饰性渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-secondary-50/30 pointer-events-none" />

        {/* 菜单项容器 */}
        <div className="relative p-2">
          {items.map((item) => {
            const isActive = isActiveRoute(location.pathname, item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-start p-4 rounded-xl transition-all duration-200",
                  "hover:bg-gradient-to-r hover:from-primary-50/80 hover:to-secondary-50/60",
                  "hover:shadow-lg hover:scale-[1.02] transform",
                  isActive && "bg-gradient-to-r from-primary-100/80 to-secondary-100/60 shadow-md"
                )}
              >
                <div className="flex-1 min-w-0">
                  {/* 标题 */}
                  <div className={cn(
                    "font-semibold text-sm transition-colors",
                    isActive
                      ? "text-primary-700"
                      : "text-gray-900 group-hover:text-primary-600"
                  )}>
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* 描述 */}
                  {item.description && (
                    <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* 箭头指示器 */}
                <div className={cn(
                  "ml-3 flex-shrink-0 transition-all duration-200",
                  "opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1"
                )}>
                  <svg
                    className="w-4 h-4 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 底部装饰 */}
        <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 opacity-60" />
      </div>
    </div>
  )
}