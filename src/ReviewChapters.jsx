import { useState } from 'react'
import { cases } from './reviewData'
import WorkArchive from './WorkArchive'
import DermaCase from './DermaCase'
import ProlineCase from './ProlineCase'
import CoreCase from './CoreCase'
import PeonyCase from './PeonyCase'

function Paper({ title, children }) {
  return <section className="review-paper"><h3>{title}</h3>{children}</section>
}

function CaseStudies() {
  const [activeCase, setActiveCase] = useState(cases[0].id)
  const project = cases.find(item => item.id === activeCase)
  return <>
    <nav className="review-case-tabs" aria-label="选择项目">{cases.map(item => <button type="button" key={item.id} aria-pressed={activeCase === item.id} onClick={() => setActiveCase(item.id)}>{item.id === 'case-1' ? '舒肤佳 Derma' : item.id === 'case-2' ? '海飞丝 Proline' : item.id === 'case-3' ? '海飞丝 Core+' : '海飞丝 芍药雪松'}<small>{item.id === 'case-1' ? '全系列电商视觉体系' : item.id === 'case-2' ? '全平台营销视觉创意' : item.id === 'case-3' ? '新品视觉升级' : '电商视觉'}</small></button>)}</nav>
    {project.id === 'case-1' ? <DermaCase /> : project.id === 'case-2' ? <ProlineCase /> : project.id === 'case-3' ? <CoreCase /> : <PeonyCase />}
  </>
}

function Reflection() {
  const reviews = [
    { title: '复盘01｜项目协作与资源管理', subtitle: '从被动响应，到前置规划。', items: [
      ['问题', '多项目并行时，临时新增需求容易与既定排期冲突，影响设计资源安排及交付节奏。'],
      ['分析', '需求优先级、资源容量与交付时间需要更早对齐，降低临时调整的影响。'],
      ['已采取行动', '主动梳理项目排期与人员分工，推动新增需求的优先级评估和跨部门沟通。'],
      ['后续优化', '逐步建立更透明的任务管理方式，提前识别资源冲突与交付风险。'],
    ] },
    { title: '复盘02｜创意质量与审核机制', subtitle: '从结果把控，到过程管理。', items: [
      ['问题', '复杂项目中，创意方向调整与设计深化交织，容易产生重复修改及质量把控压力。'],
      ['分析', '前期方向共识与阶段审核标准仍有优化空间，单靠最终审核难以兼顾质量与效率。'],
      ['已采取行动', '通过前期线稿验证、分阶段设计反馈及关键画面审核，加强创意方向与出品质量把控。'],
      ['后续优化', '进一步明确方向确认、过程审核与交付自检节点，减少后期方向性返工。'],
    ] },
  ]
  return <div className="reflection-chapter">
    <p className="reflection-intro">试用期内，在多项目并行及复杂创意需求的推进过程中，逐步识别出资源协调与设计审核方面的优化空间，并尝试通过排期梳理、方向预审及团队协作，提高项目推进的清晰度与可控性。</p>
    {reviews.map(review => <Paper key={review.title} title={review.title}>
      <p className="reflection-subtitle">{review.subtitle}</p>
      <div className="review-reflection">{review.items.map(([title, text], index) => <div key={title}><small>0{index + 1}</small><h4>{title}</h4><p>{text}</p></div>)}</div>
    </Paper>)}
    <footer className="reflection-summary"><strong>让创意判断更前置，让项目执行更可控。</strong><p>将实际项目中发现的问题转化为可执行的工作机制，并在后续项目中持续验证与优化。</p></footer>
  </div>
}

function Plan() {
  return <div className="plan-chapter">
    <p className="plan-intro">围绕创意品质、团队协作与项目效率，逐步建立可执行、可复用的工作方法。</p>
    <div className="review-roadmap">{[
      ['30', '建立标准', '明确创意方向与协作机制', '建立更清晰的设计审核标准与任务优先级管理方式。', '梳理重点项目的创意审核节点，明确设计分工、任务优先级及新增需求的沟通流程。', '视觉审核清单、重点项目排期与分工机制。'],
      ['60', '推动执行', '提升创意品质与团队协作效率', '将前期创意判断和阶段审核应用于重点项目，提升团队整体设计完成度。', '推动重点项目先确认方向再深化执行，通过方案讨论、设计指导与阶段反馈，帮助团队提升创意思考和独立判断能力。', '重点项目阶段性作品、设计审核记录及团队创意案例。'],
      ['90', '复盘沉淀', '形成可复用的视觉资产与工作方法', '通过项目复盘形成更稳定的创意管理与设计协作方式。', '整理重点项目的视觉成果、创意判断依据和典型问题，复盘方向确认、返工及交付情况，持续优化工作机制。', '创意案例库、视觉参考资产及阶段性项目复盘。'],
    ].map(([day, title, detail, goal, action, output]) => <section className="review-roadmap-card" key={day}><div className="review-day"><strong>{day}</strong><span>天 / DAYS</span></div><h3>{title}<span>｜{detail}</span></h3><dl><dt>阶段目标</dt><dd>{goal}</dd><dt>关键行动</dt><dd>{action}</dd><dt>预期产出</dt><dd>{output}</dd></dl></section>)}</div>
    <Paper title="协作与目标对齐"><p>为更好地推进后续工作，希望围绕重点项目优先级、创意质量标准及跨部门协作机制，与团队保持持续对齐，确保设计资源投入与业务需求相匹配。</p></Paper>
  </div>
}

export default function ReviewChapters({ chapterId, onContinue }) {
  if (chapterId === 'review') return <WorkArchive onContinue={onContinue} />
  if (chapterId === 'cases') return <CaseStudies />
  if (chapterId === 'reflection') return <Reflection />
  return <Plan />
}
