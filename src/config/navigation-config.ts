/**
 * 导航配置管理
 * 统一管理应用的导航结构和路由信息
 */

import { ROUTES } from '@/constants'

export interface NavItem {
  label: string
  path: string
  icon?: React.ComponentType<{ className?: string }> | string
  badge?: string
  children?: NavItem[]
  showInDev?: boolean
  external?: boolean
  description?: string
  highlight?: boolean
}

// 主导航配置
export const mainNavigation: NavItem[] = [
  {
    label: '首页',
    path: ROUTES.HOME,
    description: '回到主页'
  },
  {
    label: '产品',
    path: '/products',
    description: '浏览我们的产品',
    children: [
      {
        label: '前端组件',
        path: '/products/components',
        description: '可复用的UI组件库'
      },
      {
        label: '工具库',
        path: '/products/utils',
        description: '实用工具函数集合'
      },
      {
        label: '模板',
        path: '/products/templates',
        description: '项目模板和脚手架',
        badge: 'New'
      }
    ]
  },
  {
    label: '文档',
    path: '/docs',
    description: '查看详细文档',
    children: [
      {
        label: '快速开始',
        path: '/docs/getting-started',
        description: '5分钟快速上手'
      },
      {
        label: 'API 参考',
        path: '/docs/api',
        description: '完整的API文档'
      },
      {
        label: '示例',
        path: '/docs/examples',
        description: '丰富的使用示例'
      }
    ]
  },
  {
    label: '关于',
    path: ROUTES.ABOUT,
    description: '了解更多信息'
  },
]


// 合并导航配置的工具函数
export function getNavigationItems(): NavItem[] {
  const items = [...mainNavigation]
  return items
}

// 检查路由是否激活的工具函数
export function isActiveRoute(currentPath: string, targetPath: string): boolean {
  if (targetPath === '/') {
    return currentPath === '/'
  }
  return currentPath.startsWith(targetPath)
}
