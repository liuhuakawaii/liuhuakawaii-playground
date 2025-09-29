/**
 * 现代化导航链接组件
 * 支持二级菜单、现代样式和流畅动画
 */

import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { isActiveRoute, type NavItem } from '../../config/navigation-config'
import DropdownMenu from './DropdownMenu'

interface NavLinkProps {
  item: NavItem
  variant?: 'desktop' | 'mobile'
  className?: string
  onClick?: () => void
}

export default function NavLink({
  item,
  variant = 'desktop',
  className,
  onClick
}: NavLinkProps) {
  const location = useLocation()
  const isActive = isActiveRoute(location.pathname, item.path)
  const hasChildren = item.children && item.children.length > 0

  if (variant === 'mobile') {
    return (
      <Link
        to={item.path}
        onClick={onClick}
        className={cn(
          "group block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
          "hover:shadow-lg hover:scale-[1.02] transform",
          isActive
            ? "bg-gradient-to-r from-primary-100/80 to-secondary-100/60 text-primary-700 shadow-md"
            : "text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-secondary-50/30",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {item.label}
            {item.badge && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm">
                {item.badge}
              </span>
            )}
          </div>
          {hasChildren && (
            <svg className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
        {item.description && (
          <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-600">
            {item.description}
          </p>
        )}
      </Link>
    )
  }

  const linkContent = (
    <Link
      to={item.path}
      onClick={onClick}
      className={cn(
        "group px-4 py-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2",
        "hover:text-primary-600",
        isActive ? "text-primary-600" : "text-gray-600",
        className
      )}
    >
      <span>{item.label}</span>
      {item.badge && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm">
          {item.badge}
        </span>
      )}
      {hasChildren && (
        <svg
          className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </Link>
  )

  if (hasChildren) {
    return (
      <DropdownMenu
        trigger={linkContent}
        items={item.children || []}
        className={className}
      />
    )
  }

  return linkContent
}