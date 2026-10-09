// JSX 中的 public 资源需要显式添加部署前缀；CSS 和 HTML 资源由 Vite 处理。
export function assetUrl(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith(base) ? path : `${base}${path.replace(/^\/+/, '')}`
}
