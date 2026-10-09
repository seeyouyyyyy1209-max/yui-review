import { assetUrl } from './assetUrl'
import { useRef, useState } from 'react'
import { Preview } from './EpageCarousel'
import ProlineCarousel from './ProlineCarousel'
import './ProlineCase.css'

const feedback = [
  { src: '/images/proline/feedback-01.png', name: '客户评价转述｜聊天记录01', alt: '聊天记录：说是他最近看过最好看的ylmf', width: 902, height: 174 },
  { src: '/images/proline/feedback-02.png', name: '正向反馈转述｜聊天记录02', alt: '聊天记录：做的YLMF，被大夸特夸', width: 572, height: 634 },
]

export default function ProlineCase() {
  const sourceRef = useRef(null)
  const [preview, setPreview] = useState(null)
  return <article className="derma-case proline-case" ref={sourceRef}>
    <header className="derma-heading"><small>项目 02 / 海飞丝 Proline YLMF</small><h3>海飞丝 Proline｜全平台营销视觉创意</h3><p className="derma-claim">从创意探索到视觉落地，让专业功效更具表现力。</p></header>
    <div className="derma-intro">
      <section><h4>项目背景与目标</h4><p>围绕海飞丝 Proline 专研系列的全平台营销需求，将专业去屑功效、成分科技与专家背书转化为更具视觉冲击力的传播内容，兼顾品牌专业形象与多场景的营销表达。</p></section>
      <section><h4>核心挑战</h4><p>在多个传播点位、不同产品卖点与使用场景之间，兼顾创意丰富度和品牌一致性，避免素材同质化，并确保系列视觉的整体品质。</p></section>
    </div>
    <section className="derma-strategy"><h4>创意概念与视觉策略</h4><h5>专业功效 × 视觉冲击 × 品牌统一</h5>
      <div className="derma-strategy-grid">
        <div><span>01</span><strong>强化功效感知</strong><p>以大字报、放大镜和产品动态构图，突出核心卖点与画面张力。</p></div>
        <div><span>02</span><strong>建立专业信任</strong><p>通过专家人物、实验器皿及成分结构等元素，强化产品的专研形象。</p></div>
        <div><span>03</span><strong>丰富场景表达</strong><p>针对干敏头皮、烫染、换季、运动及洗护搭配等场景，形成差异化视觉方案。</p></div>
      </div>
    </section>
    <ProlineCarousel />
    <section className="proline-feedback">
      <h4>客户反馈</h4><small>客户评价摘录 · 转述反馈</small>
      <blockquote>“最近看过最好看的YLMF”</blockquote>
      <p>“做的YLMF，被大夸特夸。”</p>
      <div className="proline-feedback-images">{feedback.map((item, index) => <figure key={item.src}><button type="button" onClick={() => setPreview(item)} aria-label={`放大反馈截图${index + 1}`}><img src={assetUrl(item.src)} alt={item.alt} width={item.width} height={item.height} loading="lazy" /></button><figcaption>转述记录 0{index + 1} · 点击查看截图</figcaption></figure>)}</div>
    </section>
    <section className="derma-result"><h4>项目成果与核心亮点</h4><p>完成从前期参考、创意构思、线稿提案到系列色稿的视觉推进，形成覆盖13个编号点位的Proline营销视觉方案，并获得客户正向评价。</p><strong>兼顾创意多样性与系列化执行，实现从线稿到色稿的完整视觉落地，并获得客户高度认可。</strong></section>
    {preview && <Preview page={preview} sourceRef={sourceRef} onClose={() => setPreview(null)} />}
  </article>
}
