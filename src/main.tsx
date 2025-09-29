/**
 * 应用程序入口文件
 * 配置全局提供者和错误边界
 */


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppProviders } from './components'
import './styles/index.css'

// 方案一：最简洁的配置
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)