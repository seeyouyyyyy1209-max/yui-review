import { useCallback, useEffect, useRef, useState } from 'react'
import { Preview, WorkImage } from './EpageCarousel'
import { coreAssets } from './coreData'
import './CoreCase.css'

function CoreGallery({ images, label, onPreview }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const area = useRef(null)
  const gesture = useRef(null)
  const suppress = useRef(false)
  const go = useCallback(next => {
    const bounded = Math.max(0, Math.min(images.length - 1, next))
    setDirection(bounded >= index ? 1 : -1)
    setIndex(bounded)
  }, [images.length, index])
  useEffect(() => {
    const element = area.current
    let sum = 0, last = 0, switched = -Infinity
    const wheel = event => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      const now = performance.now()
      if (now - switched < 450) return
      if (now - last > 150) sum = 0
      sum += event.deltaX; last = now
      if (Math.abs(sum) > 45) { go(index + Math.sign(sum)); sum = 0; switched = now }
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
  }, [go, index])
  const current = images[index]
  return <div className="core-gallery" aria-label={label}>
    <div className="core-gallery-bar"><h5 aria-live="polite">{current.name}</h5><div><button type="button" aria-label={`${label}上一张`} disabled={index === 0} onClick={() => go(index - 1)}>←</button><button type="button" aria-label={`${label}下一张`} disabled={index === images.length - 1} onClick={() => go(index + 1)}>→</button></div></div>
    <div className="core-stage" ref={area} onPointerDown={event => { if (event.button !== 0) return; suppress.current = false; gesture.current = { x: event.clientX, y: event.clientY } }} onPointerCancel={() => { gesture.current = null; suppress.current = true }} onPointerUp={event => {
      if (!gesture.current) return
      const dx = event.clientX - gesture.current.x, dy = event.clientY - gesture.current.y
      gesture.current = null
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) { suppress.current = true; go(index + (dx < 0 ? 1 : -1)) }
      else if (Math.abs(dx) > 8 || Math.abs(dy) > 8) suppress.current = true
    }}>
      <div className="core-image" role="button" tabIndex="0" key={current.src} style={{ '--slide-start': `${direction * 18}px` }} aria-label={`放大${current.name}`} onClick={() => { if (!suppress.current) onPreview(current); suppress.current = false }} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onPreview(current) } if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(index + (event.key === 'ArrowRight' ? 1 : -1)) } }}><WorkImage page={current} /></div>
    </div>
    <div className="core-gallery-foot"><span aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span><span>左右滑动切换 · 点击放大查看细节</span></div>
    {current.note && <p className="core-caption">{current.note}</p>}
    <nav className="core-image-tabs" aria-label={`${label}选择作品`}>{images.map((image, i) => <button type="button" key={image.src} aria-pressed={index === i} onClick={() => go(i)}>{String(i + 1).padStart(2, '0')} {image.name.split('｜')[1]}</button>)}</nav>
  </div>
}

export default function CoreCase() {
  const [preview, setPreview] = useState(null)
  const sourceRef = useRef(null)
  const lot = coreAssets.find(item => item.group === 'lot')
  return <article className="derma-case core-case" ref={sourceRef}>
    <header className="derma-heading"><small>项目 03 / IRONMAN CORE+</small><h3>海飞丝 Ironman Core+｜新品视觉升级</h3><p className="derma-claim">从功能认知，到高端头皮护理体验。</p><span className="core-status">阶段性设计成果</span></header>
    <div className="derma-intro"><section><h4>项目背景与目标</h4><p>围绕海飞丝 Core+ 新品升级，以OC Shampoo（控油洗发水）与LOT（头皮精华）为首轮重点，探索从传统去屑功能表达向高端头皮护理的视觉升级。</p><p>在强化科学功效的同时，建立更具美妆质感、品牌辨识度与系列延展性的视觉语言。</p></section><section><h4>核心挑战</h4><p>项目周期紧凑，涉及复杂的产品功效、双产品差异化及多模块电商内容，需要在美感与科学可信度之间寻找平衡，并在有限时间内推进创意探索与视觉优化。</p></section></div>
    <section className="derma-strategy"><h4>创意策略</h4><h5>高端美感 × 科学可信度</h5><div className="derma-strategy-grid">
      <div><span>01</span><strong>感知升级</strong><p>通过纯净白调、透明材质与精致光影，建立高端头皮护理的视觉体验。</p></div>
      <div><span>02</span><strong>科学可视化</strong><p>运用神经酰胺屏障球、分子结构与透明Bubble，呈现头皮护理的科学机制。</p></div>
      <div><span>03</span><strong>内容系统化</strong><p>将头皮问题、产品KV、成分科技与功效实证整合为具有一致性的电商视觉语言。</p></div>
    </div></section>
    <section className="core-section"><h4>前期创意策略｜从产品升级到视觉感知升级</h4><CoreGallery images={coreAssets.filter(item => item.group === 'strategy')} label="前期创意策略" onPreview={setPreview} /></section>
    <section className="core-section"><h4>OC Shampoo｜从初版探索到视觉深化</h4><CoreGallery images={coreAssets.filter(item => item.group === 'shampoo')} label="OC Shampoo视觉推进" onPreview={setPreview} /></section>
    <section className="core-section"><h4>LOT｜头皮精华视觉探索</h4><p>围绕头皮屏障修护、成分科技与日常护理场景，探索兼具科学表达和高级美妆质感的头皮精华视觉方向。</p><p className="core-caption">阶段性设计方案</p><div className="core-lot-image" role="button" tabIndex="0" aria-label="放大LOT头皮精华视觉探索" onClick={() => setPreview(lot)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setPreview(lot) } }}><WorkImage page={lot} /></div></section>
    <section className="derma-result"><h4>阶段性成果</h4><p>完成OC Shampoo与LOT的前期创意方向探索及阶段性电商视觉方案。</p><p>其中，OC Shampoo继续推进至详情页视觉优化阶段；LOT形成阶段性方案后暂停推进。</p><h4>核心亮点</h4><strong>在紧迫周期与复杂产品需求下，将创意策略、科学视觉语言与电商内容进行系统整合，推动双产品的阶段性视觉设计成果。</strong></section>
    {preview && <Preview page={preview} sourceRef={sourceRef} onClose={() => setPreview(null)} />}
  </article>
}
