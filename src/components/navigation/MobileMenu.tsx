/**
 * 现代化移动端菜单组件
 * 支持二级菜单展开和现代动画效果
 */

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { isActiveRoute, type NavItem } from '../../config/navigation-config'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigationItems: NavItem[]
  className?: string
}

interface MobileMenuItemProps {
  item: NavItem
  onClose: () => void
  level?: number
}

function MobileMenuItem({ item, onClose, level = 0 }: MobileMenuItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()
  const isActive = isActiveRoute(location.pathname, item.path)
  const hasChildren = item.children && item.children.length > 0

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    } else {
      onClose()
    }
  }

  return (
    <div className={cn("space-y-1", level > 0 && "ml-4")}>
      {hasChildren ? (
        <button
          onClick={handleToggle}
          className={cn(
            "group w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
            "hover:shadow-lg hover:scale-[1.02] transform",
            isActive
              ? "bg-gradient-to-r from-primary-100/80 to-secondary-100/60 text-primary-700 shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-secondary-50/30"
          )}
        >
          <div className="flex items-center">
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm">
                {item.badge}
              </span>
            )}
          </div>
          <svg
            className={cn(
              "w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-all duration-200",
              isExpanded && "rotate-90"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ) : (
        <Link
          to={item.path}
          onClick={handleToggle}
          className={cn(
            "group block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
            "hover:shadow-lg hover:scale-[1.02] transform",
            isActive
              ? "bg-gradient-to-r from-primary-100/80 to-secondary-100/60 text-primary-700 shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-secondary-50/30",
            level > 0 && "text-sm"
          )}
        >
          <div className="flex items-center">
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm">
                {item.badge}
              </span>
            )}
          </div>
          {item.description && (
            <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-600">
              {item.description}
            </p>
          )}
        </Link>
      )}

      {/* 子菜单 */}
      {hasChildren && (
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="space-y-1 pt-2">
            {item.children?.map((child) => (
              <MobileMenuItem
                key={child.path}
                item={child}
                onClose={onClose}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigationItems,
  className
}: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className={cn(
      "sm:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl",
      className
    )}>
      {/* 装饰性渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/20 via-transparent to-secondary-50/20 pointer-events-none" />

      <div className="relative px-4 py-4 space-y-2">
        {navigationItems.map((item, index) => (
          <div
            key={item.path}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: isOpen ? 'slideInLeft 0.3s ease-out forwards' : undefined
            }}
          >
            <MobileMenuItem item={item} onClose={onClose} />
          </div>
        ))}
      </div>

      {/* 底部装饰 */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 opacity-60" />

      {/* 动画样式 */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}