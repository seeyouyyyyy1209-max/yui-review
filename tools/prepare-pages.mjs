import { readdir, readFile, rm, stat } from 'node:fs/promises'
import { resolve, join, relative } from 'node:path'

// 只清理生成的 dist 副本；不会删除或改写 public 中的原始资料。
const root = resolve(import.meta.dirname, '..')
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]))).flat()
}
export async function publicAssets() {
  const sources = [...await files(join(root, 'src')), join(root, 'index.html')]
  const required = new Set(['fonts/OFL-LXGWWenKai.txt'])
  for (const file of sources) {
    if (!/\.(jsx?|css|html)$/.test(file)) continue
    const text = await readFile(file, 'utf8')
    for (const match of text.matchAll(/["'(`](\/(?:images|fonts|decor)\/[^"'`)\s]+)["'`)]/g)) required.add(match[1].slice(1))
    for (const match of text.matchAll(/%BASE_URL%([^"'\s]+)/g)) required.add(match[1])
  }
  return required
}
if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const required = await publicAssets()
  for (const path of required) await stat(join(root, 'public', path))
  const dist = join(root, 'dist')
  let omitted = 0
  for (const file of await files(join(root, 'public'))) {
    const path = relative(join(root, 'public'), file)
    if (!required.has(path)) { await rm(join(dist, path), { force: true }); omitted++ }
  }
  console.log(`Pages产物：保留${required.size}项网站静态资源，排除${omitted}项未引用素材和本地记录（原文件保持不变）。`)
}
