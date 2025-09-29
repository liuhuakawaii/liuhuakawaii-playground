/**
 * 页面底部组件
 * 应用的页脚信息
 */

import { APP_CONFIG } from '@/constants'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-white border-t border-gray-200 mt-auto ${className || ''}`}>
      <div className="container-responsive py-4">
        <div className="text-center text-sm text-gray-500">
          © 2024 {APP_CONFIG.name}. Version {APP_CONFIG.version}
        </div>
      </div>
    </footer>
  )
}