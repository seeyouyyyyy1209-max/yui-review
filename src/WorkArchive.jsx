import { assetUrl } from './assetUrl'
import { useEffect, useRef, useState } from 'react'
import './WorkArchive.css'

const duties = ['创意方向把控', '团队创意指导', '设计品质管理', '项目执行协调']

export default function WorkArchive({ onContinue }) {
  const sceneRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const scene = sceneRef.current
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || !('IntersectionObserver' in window)) return
    const pieces = scene.querySelectorAll('[data-archive-reveal]')
    scene.classList.add('has-reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { root: scene.closest('.review-window-content'), threshold: 0.05 })
    pieces.forEach(piece => observer.observe(piece))
    const stopMotion = () => { if (motion.matches) { scene.classList.remove('has-reveal'); observer.disconnect() } }
    motion.addEventListener('change', stopMotion)
    return () => { observer.disconnect(); motion.removeEventListener('change', stopMotion) }
  }, [])

  return <section className="work-archive" ref={sceneRef} aria-labelledby="chapter-title">
    <div className="archive-heading-strip"><span id="chapter-title">01 / 试用期工作回顾</span><span>WORK FILE / YUI</span></div>
    <div className="archive-folder" data-archive-reveal>
      <img className="archive-envelope" src={assetUrl('/decor/work-archive-envelope.png')} alt="" aria-hidden="true" />
      <div className="archive-cover-heading">
        <span className="archive-role-sticker">资深美术指导｜海飞丝项目组</span>
      </div>
      <div id="archive-documents" className="archive-documents">
        <div className="archive-overview archive-piece" data-archive-reveal>
          <div className="archive-position"><span>2026.07.02 — 2026.10.01</span></div>
          <div className="archive-overview-copy">
            <p>试用期内，负责海飞丝相关项目的美术指导工作，涵盖创意方向、团队指导、设计品质及执行协调。</p>
            <p>从前期创意构思、方案讨论，到设计指导与最终出品，兼顾专业判断与团队协作，推动创意有效落地。</p>
          </div>
          <div className="archive-keywords" aria-label="四项核心职责">
            {duties.map((title, index) => <button key={title} type="button" className={`archive-duty ${selected === index ? 'is-selected' : ''}`} aria-pressed={selected === index} onClick={() => setSelected(selected === index ? null : index)}>
              <span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong>
            </button>)}
          </div>
          <button type="button" className="archive-continue" onClick={onContinue}><strong>继续查看｜02 核心项目与工作成果</strong><span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </div>
  </section>
}
