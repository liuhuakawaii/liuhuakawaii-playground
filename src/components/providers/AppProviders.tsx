/**
 * 应用程序提供者组件
 * 企业级应用的标准配置：ErrorBoundary + Suspense + 其他全局提供者
 */

import { Suspense, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import { Loading } from '../feedback'

interface AppProvidersProps {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading variant="app" />}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  )
}

// 页面级提供者 - 用于路由组件
export function PageProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading variant="page" />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

// 组件级提供者 - 用于特定功能组件
export function ComponentProviders({
  children,
  fallback,
  errorFallback
}: AppProvidersProps & {
  fallback?: ReactNode
  errorFallback?: ReactNode
}) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback || <div>加载中...</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}