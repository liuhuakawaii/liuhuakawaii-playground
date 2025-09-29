/**
 * 反馈组件统一导出
 */

export { default as Loading } from './Loading'
export { default as Spinner } from './Spinner'
export { default as ButtonLoading } from './ButtonLoading'
export { default as HamsterLoading } from './HamsterLoading'
export { default as ImageSuspense } from './ImageSuspense'
export { default as LazyImage } from './LazyImage'

// 为了向后兼容，提供别名导出
// 推荐直接使用 Loading 组件的 variant 属性
export { default as PageLoading } from './Loading'
export { default as AppLoading } from './Loading'