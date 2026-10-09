import { assetUrl } from './assetUrl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Preview, WorkImage } from './EpageCarousel'
import { featuredPoints, prolinePoints } from './prolineData'

export default function ProlineCarousel() {
  const [all, setAll] = useState(false)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [preview, setPreview] = useState(null)
  const sourceRef = useRef(null)
  const areaRef = useRef(null)
  const current = useRef(0)
  const gesture = useRef(null)
  const suppress = useRef(false)
  const available = all ? prolinePoints.map((_, i) => i) : featuredPoints
  const options = useRef(available)
  const point = prolinePoints[index]
  const position = available.indexOf(index)
  const go = useCallback(next => {
    if (next === current.current) return
    setDirection(next > current.current ? 1 : -1)
    current.current = next
    setIndex(next)
  }, [])
  const step = useCallback(delta => {
    const list = options.current
    const next = Math.max(0, Math.min(list.length - 1, list.indexOf(current.current) + delta))
    go(list[next])
  }, [go])
  useEffect(() => { options.current = available }, [available])
  useEffect(() => {
    const element = areaRef.current
    let total = 0, previous = 0, switched = -Infinity
    function wheel(event) {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      const now = performance.now()
      if (now - switched < 450) return
      if (now - previous > 150) total = 0
      previous = now
      total += event.deltaX
      if (Math.abs(total) > 45) { step(Math.sign(total)); total = 0; switched = now }
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
  }, [step])
  function pointerUp(event) {
    if (!gesture.current) return
    const dx = event.clientX - gesture.current.x, dy = event.clientY - gesture.current.y
    gesture.current = null
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.2) { suppress.current = true; step(dx < 0 ? 1 : -1) }
    else if (Math.abs(dx) > 8 || Math.abs(dy) > 8) suppress.current = true
  }
  return <section className="proline-carousel" aria-label="Proline十三个视觉点位" ref={sourceRef}>
    <div className="proline-work-heading"><div><small>{all ? '全部13个点位' : '精选6个代表点位'}</small><h4>{point.number}｜{point.title}</h4></div><div className="proline-arrows"><button type="button" aria-label="上一个点位" disabled={position === 0} onClick={() => step(-1)}>←</button><button type="button" aria-label="下一个点位" disabled={position === available.length - 1} onClick={() => step(1)}>→</button></div></div>
    <p className="proline-gesture-note">左右滑动切换 · 点击作品放大查看细节</p>
    <div className="proline-pair-area" ref={areaRef} tabIndex="0" aria-label="线稿与色稿对比区" onPointerDown={event => { if (event.pointerType === 'mouse' && event.button !== 0) return; suppress.current = false; gesture.current = { x: event.clientX, y: event.clientY } }} onPointerUp={pointerUp} onPointerCancel={() => { gesture.current = null; suppress.current = true }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1) } }}>
      <div className="proline-pair" key={point.number} style={{ '--slide-start': `${direction * 20}px` }}>{['left', 'right'].map(side => <figure key={side}>
        <figcaption>{point[side].label}{side === 'left' && point.reference && <small>非我方设计成果</small>}</figcaption>
        <div className="proline-art" role="button" tabIndex="0" aria-label={`放大点位${point.number}${point[side].label}`} onClick={() => { if (!suppress.current) setPreview(point[side]); suppress.current = false }} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setPreview(point[side]) } }}><WorkImage page={point[side]} /></div>
        <small className="proline-source">{point[side].source}</small>
      </figure>)}</div>
    </div>
    <div className="proline-position"><span aria-live="polite">{point.number} / 13</span>{!all ? <button type="button" onClick={() => setAll(true)}>查看全部13个点位 ↗</button> : <button type="button" onClick={() => { if (!featuredPoints.includes(index)) go(featuredPoints[0]); setAll(false) }}>返回精选6个点位</button>}</div>
    <nav className="proline-thumbnails" aria-label="选择视觉点位">{available.map(i => <button type="button" key={i} aria-pressed={index === i} aria-label={`查看点位${prolinePoints[i].number} ${prolinePoints[i].title}`} onClick={() => go(i)}><img src={assetUrl(prolinePoints[i].thumb)} alt="" loading="lazy" width="180" height="240" /><span>{prolinePoints[i].number}</span></button>)}</nav>
    <p className="proline-reference-note">点位07、09、11的左侧为第三方创意参考，仅作过程对照，不计入我方成果；点位04线稿取自前期方案，其余线稿与色稿取自后期方案。</p>
    {preview && <Preview page={preview} sourceRef={sourceRef} onClose={() => setPreview(null)} />}
  </section>
}
