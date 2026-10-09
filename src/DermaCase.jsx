import EpageCarousel from './EpageCarousel'
import './DermaCase.css'

export default function DermaCase() {
  return <article className="derma-case">
    <header className="derma-heading">
      <small>项目 01 / 舒肤佳 Derma</small>
      <h3>舒肤佳 Derma｜全系列电商视觉体系</h3>
      <p className="derma-claim">从0到1，构建统一的系列视觉体系。</p>
    </header>
    <div className="derma-intro">
      <section><h4>背景与目标</h4><p>围绕舒肤佳 Derma 四条产品线，建立兼具科学可信度、专业功效表达与高级质感的电商视觉体系，实现品牌语言统一与产品差异化呈现。</p></section>
      <section><h4>核心挑战</h4><p>在洗面奶、沐浴露、洁面皂及喷雾不同的产品诉求之间，建立统一且可延展的视觉规则，避免系列设计流于简单的画面复制。</p></section>
    </div>
    <section className="derma-strategy">
      <h4>创意概念与视觉策略</h4>
      <h5>未来皮肤学实验室｜专业可信 × 高端功效</h5>
      <p>以柔和实验室白调、金属质感与通透光影构建系列视觉基调。</p>
      <div className="derma-strategy-grid">
        <div><span>01</span><strong>统一视觉体系</strong><p>建立色彩、材质及科技视觉符号的系列识别。</p></div>
        <div><span>02</span><strong>科学功效可视化</strong><p>通过肌肤扫描、成分结构与功效实证，将复杂的产品信息转化为直观视觉表达。</p></div>
        <div><span>03</span><strong>产品差异化</strong><p>在统一品牌语言下，针对不同产品功效与使用场景展开设计。</p></div>
      </div>
    </section>
    <EpageCarousel />
    <section className="derma-result">
      <h4>项目成果与核心亮点</h4>
      <p>从前期创意探索、视觉体系建立到系列设计执行，完整推进四条产品线的视觉设计与延展。</p>
      <p>最终完成洗面奶、沐浴露、洁面皂、喷雾四套系列 E-page，建立统一且具有产品差异化的电商视觉表达。</p>
      <strong>从单张视觉设计，延伸到四条产品线的系统化视觉构建。</strong>
    </section>
  </article>
}
