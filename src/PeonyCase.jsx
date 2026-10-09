import { useEffect, useRef, useState } from 'react'
import { Preview, WorkImage } from './EpageCarousel'
import { peonyDetails, peonyPage } from './peonyData'
import './PeonyCase.css'

function LazyArtwork({ page }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect() }
    }, { rootMargin: '160px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div className="peony-artwork" ref={ref} style={{ aspectRatio: `${page.width} / ${page.height}` }}>{visible ? <WorkImage page={page} /> : <span className="epage-status">滚动查看作品</span>}</div>
}

export default function PeonyCase() {
  const [preview, setPreview] = useState(null)
  const sourceRef = useRef(null)
  const openOnKey = (event, page) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setPreview(page) } }
  return <article className="derma-case peony-case" ref={sourceRef}>
    <header className="derma-heading"><small>项目 04</small><h3>海飞丝｜芍药雪松电商视觉</h3><p className="derma-claim">以清透美学，诠释科学护理与感官体验。</p></header>
    <div className="derma-intro"><section><h4>项目背景与目标</h4><p>围绕海飞丝芍药雪松的电商传播需求，将头皮护理功效、成分科技与香氛体验融入统一的视觉表达，打造兼具专业可信度与高级美妆质感的产品详情页。</p></section><section><h4>核心挑战</h4><p>如何在高信息密度的详情页中，平衡功效信息、科学实证与感官美学，同时保持产品质感和整体视觉语言的一致性。</p></section></div>
    <section className="derma-strategy"><h4>创意概念与视觉策略</h4><h5>清透美学 × 科学护理 × 自然香氛</h5><div className="derma-strategy-grid">
      <div><span>01</span><strong>清透质感</strong><p>以蓝绿水感、透明Bubble及柔和光影，呈现洁净、轻盈的视觉体验。</p></div>
      <div><span>02</span><strong>科学表达</strong><p>通过头皮结构、活性成分与功效实证画面，将专业护理信息转化为直观的视觉语言。</p></div>
      <div><span>03</span><strong>香氛体验</strong><p>融合白芍药与雪松等植物元素，通过自然花材、清透材质及精致构图，建立舒适、高级的感官氛围。</p></div>
    </div></section>
    <section className="peony-details"><h4>精选视觉细节</h4><p className="peony-hint">点击画面，查看原始细节</p><div className="peony-detail-layout">{peonyDetails.map((page, i) => <figure key={page.src}><figcaption><span>0{i + 1}</span><strong>{page.name}</strong></figcaption><div className="peony-open" role="button" tabIndex="0" aria-label={`放大${page.name}`} onClick={() => setPreview(page)} onKeyDown={event => openOnKey(event, page)}><LazyArtwork page={page} /></div></figure>)}</div></section>
    <section className="peony-full"><div className="peony-full-heading"><h4>完整E-page</h4><button type="button" onClick={() => setPreview(peonyPage)}>查看完整详情页 ↗</button></div><p className="peony-hint">上下滚动阅读完整长图 · 点击上方按钮放大查看</p><div className="peony-preview-window" role="region" tabIndex="0" aria-label="芍药雪松完整详情页，上下滚动阅读"><LazyArtwork page={peonyPage} /></div></section>
    <section className="derma-result"><h4>项目成果与核心亮点</h4><p>完成芍药雪松整套电商详情页设计稿，覆盖头皮痛点、核心功效、成分科技、功效实证及香氛体验等内容模块。</p><p>通过统一的色彩、材质及视觉语言，形成兼顾功能表达与美妆质感的完整E-page。</p><strong>在高信息密度的电商页面中，兼顾画面精致度、内容可读性与整体视觉一致性。</strong></section>
    {preview && <Preview page={preview} sourceRef={sourceRef} onClose={() => setPreview(null)} />}
  </article>
}
