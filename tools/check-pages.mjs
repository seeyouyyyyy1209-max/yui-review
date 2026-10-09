import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { publicAssets } from './prepare-pages.mjs'

const root = resolve(import.meta.dirname, '..')
const html = await readFile(join(root, 'dist/index.html'), 'utf8')
assert(html.includes('/yui-review/assets/'), '构建入口缺少base前缀')
assert(html.includes('/yui-review/favicon.svg'), '图标缺少base前缀')
for (const path of await publicAssets()) await stat(join(root, 'dist', path))
// 检查CSS经过Vite重写后不会向域名根目录请求资源。
const script = [...html.matchAll(/(?:src|href)="(\/yui-review\/assets\/[^"\s]+)"/g)]
for (const [, url] of script) {
  const text = await readFile(join(root, 'dist', url.replace('/yui-review/', '')), 'utf8')
  if (url.endsWith('.css')) assert(!/url\(["']?\/(?:images|fonts|decor)\//.test(text), 'CSS仍含根目录资源路径')
}
console.log('GitHub Pages子路径、入口、字体、CSS及全部public资源检查通过。')
