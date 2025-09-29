/**
 * 主布局组件
 * 提供应用的基础布局结构，职责单一，组合其他布局组件
 */

import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MainContent from './MainContent'

interface LayoutProps {
  className?: string
}

export default function Layout({ className }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className || ''}`}>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </div>
  )
}