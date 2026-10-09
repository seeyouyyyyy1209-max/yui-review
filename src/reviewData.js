// 将占位字段替换为经核实的述职内容；图片路径指向 public 中的实际素材。
export const chapters = [
  { id: 'review', number: '01', title: '试用期工作回顾', subtitle: 'WORK OVERVIEW', summary: '梳理阶段任务、岗位职责与业务范围。' },
  { id: 'cases', number: '02', title: '核心项目 & 工作成果', subtitle: 'CASE STUDIES', summary: '从背景到交付，用作品与证据呈现个人贡献。' },
  { id: 'reflection', number: '03', title: '现存问题与自我复盘', subtitle: 'REFLECTION & ACTION', summary: '从项目实践中发现问题，以更前置的思考优化工作方式。' },
  { id: 'plan', number: '04', title: '后续工作规划', subtitle: '30 / 60 / 90 DAY PLAN', summary: '以更清晰的创意判断，推动更稳定的团队交付。' },
]

export const cases = [1, 2, 3, 4].map(number => ({
  id: `case-${number}`,
  number: String(number).padStart(2, '0'),
  title: `项目 ${String(number).padStart(2, '0')} · 名称待补充`,
  type: '项目类型待补充',
  period: '起止时间待补充',
  cover: null,
  coverAlt: '项目封面',
  background: '待补充：客户或品牌背景、业务目标、传播场景及项目范围。',
  challenge: '待补充：项目的核心难点、资源限制与需要解决的设计问题。',
  responsibility: '待补充：本人负责的环节、具体产出，以及与团队协作的边界。',
  strategy: '待补充：创意洞察、视觉概念、设计语言，以及方案选择的依据。',
  images: [{ src: null, caption: '作品图 01 · 主视觉待补充' }, { src: null, caption: '作品图 02 · 延展应用待补充' }],
  result: '待补充：已确认的交付物、落地状态、验收记录与可核实的结果。',
  evidence: '待补充：文件链接、上线截图或经授权的反馈记录。没有数据时如实注明。',
}))
