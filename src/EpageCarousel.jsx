import { assetUrl } from './assetUrl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// 替换 public/images/derma 中对应的JPG即可更新作品；换文件名时仅需更新此清单。
const dermaPages = [
  { name: '洗面奶', src: '/images/derma/cleanser.jpg', width: 1000, height: 19900 },
  { name: '沐浴露', src: '/images/derma/body-wash.jpg', width: 1000, height: 18583 },
  { name: '洁面皂', src: '/images/derma/facial-soap.jpg', width: 853, height: 14999 },
  { name: '喷雾', src: '/images/derma/spray.jpg', width: 1000, height: 19808 },
]

export function WorkImage({ page }) {
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  return <>
    {status === 'loading' && <span className="epage-status" role="status">作品加载中…</span>}
    {status === 'error' ? <span className="epage-error" role="alert">图片暂时无法加载，请检查素材文件。<button type="button" onClick={event => { event.stopPropagation(); setStatus('loading'); setAttempt(attempt + 1) }}>重新加载</button></span> : <img key={attempt} src={assetUrl(page.src)} width={page.width} height={page.height} alt={page.alt || `${page.name}完整电商详情页`} decoding="async" draggable="false" onLoad={async event => { try { await event.currentTarget.decode(); setStatus('ready') } catch { setStatus('error') } }} onError={() => setStatus('error')} style={{ visibility: status === 'ready' ? 'visible' : 'hidden' }} />}
  </>
}

export function Preview({ page, onClose, sourceRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  useEffect(() => {
    const previousFocus = document.activeElement
    const chapter = sourceRef.current.closest('.review-window')
    const wasInert = chapter.inert
    chapter.inert = true
    closeRef.current.focus()
    return () => { chapter.inert = wasInert; previousFocus?.focus({ preventScroll: true }) }
  }, [sourceRef])
  function handleKeyDown(event) {
    event.stopPropagation()
    if (event.key === 'Escape') { event.preventDefault(); onClose() }
    if (event.key !== 'Tab') return
    const controls = [...dialogRef.current.querySelectorAll('button, [tabindex="0"]')]
    const first = controls[0], last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }
  return createPortal(<div className="epage-preview-overlay" onClick={event => { event.stopPropagation(); onClose() }}>
    <section className="epage-preview" role="dialog" aria-modal="true" aria-labelledby="epage-preview-title" ref={dialogRef} onClick={event => event.stopPropagation()} onKeyDown={handleKeyDown}>
      <header><strong id="epage-preview-title">{page.name}｜完整作品预览</strong><button type="button" ref={closeRef} onClick={onClose} aria-label="关闭作品预览">×</button></header>
      <div className="epage-preview-scroll" tabIndex="0" aria-label="完整长图，向下滚动查看细节"><WorkImage page={page} /></div>
    </section>
  </div>, document.body)
}

export default function EpageCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [preview, setPreview] = useState(false)
  const indexRef = useRef(0)
  const viewportRef = useRef(null)
  const sourceRef = useRef(null)
  const gesture = useRef(null)
  const suppressClick = useRef(false)
  const page = dermaPages[index]
  const go = useCallback(next => {
    const target = Math.max(0, Math.min(dermaPages.length - 1, next))
    if (target === indexRef.current) return
    setDirection(target > indexRef.current ? 1 : -1)
    indexRef.current = target
    setIndex(target)
    viewportRef.current.scrollTop = 0
  }, [])

  useEffect(() => {
    const element = viewportRef.current
    let total = 0, previousTime = 0, lastSwitch = -Infinity
    function wheel(event) {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      const now = performance.now()
      if (now - lastSwitch < 450) return
      if (now - previousTime > 150) total = 0
      previousTime = now
      total += event.deltaX
      if (Math.abs(total) > 45) { go(indexRef.current + Math.sign(total)); total = 0; lastSwitch = now }
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
  }, [go])

  function pointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    suppressClick.current = false
    gesture.current = { x: event.clientX, y: event.clientY }
  }
  function pointerUp(event) {
    if (!gesture.current) return
    const dx = event.clientX - gesture.current.x, dy = event.clientY - gesture.current.y
    gesture.current = null
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      suppressClick.current = true
      go(indexRef.current + (dx < 0 ? 1 : -1))
    } else if (Math.abs(dx) > 8 || Math.abs(dy) > 8) suppressClick.current = true
  }
  return <section className="epage-carousel" aria-label="四条产品线作品轮播" ref={sourceRef}>
    <div className="epage-toolbar"><h4>系列作品</h4><span aria-live="polite">{String(index + 1).padStart(2, '0')} / 04 · {page.name}</span><div><button type="button" aria-label="上一张作品" disabled={index === 0} onClick={() => go(index - 1)}>←</button><button type="button" aria-label="下一张作品" disabled={index === dermaPages.length - 1} onClick={() => go(index + 1)}>→</button></div></div>
    <p className="epage-hint">上下滚动阅读长图 · 左右滑动切换产品 · 点击图片放大</p>
    <div className="epage-viewport" ref={viewportRef} tabIndex="0" aria-label="作品阅读区" onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={() => { gesture.current = null; suppressClick.current = true }} onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); go(index + (event.key === 'ArrowRight' ? 1 : -1)) }
    }}>
      <div key={page.src} className="epage-slide" style={{ '--slide-start': `${direction * 20}px` }}>
        <div className="epage-open" role="button" tabIndex="0" aria-label={`放大查看${page.name}`} onClick={() => { if (!suppressClick.current) setPreview(true); suppressClick.current = false }} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setPreview(true) } }}><WorkImage page={page} /></div>
      </div>
    </div>
    <nav className="epage-products" aria-label="选择产品作品">{dermaPages.map((item, itemIndex) => <button type="button" key={item.src} aria-pressed={index === itemIndex} onClick={() => go(itemIndex)}>{String(itemIndex + 1).padStart(2, '0')} {item.name}</button>)}</nav>
    {preview && <Preview page={page} sourceRef={sourceRef} onClose={() => setPreview(false)} />}
  </section>
}
