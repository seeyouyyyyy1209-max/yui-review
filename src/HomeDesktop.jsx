import { useState } from 'react'
import { chapters } from './reviewData'
import PortraitPlaceholder from './PortraitPlaceholder'
import './HomeDesktop.css'

const navigationLabels = ['工作回顾', '项目成果', '自我复盘', '后续规划']
const folderLines = [['试用期', '工作回顾'], ['核心项目 &', '工作成果'], ['现存问题', '与自我复盘'], ['后续', '工作规划']]

function FolderIcon({ number }) {
  return <svg viewBox="0 0 64 50" aria-hidden="true" focusable="false">
    <path d="M4 8 Q4 4 8 4 H25 L31 11 H56 Q60 11 60 15 V43 Q60 47 56 47 H8 Q4 47 4 43 Z" fill="#876248" />
    <path d="M4 19 Q4 15 8 15 H56 Q60 15 60 19 V43 Q60 47 56 47 H8 Q4 47 4 43 Z" fill="#b28a69" />
    <path d="M8 17 H56" stroke="#d2b395" strokeWidth="1.2" />
    <text x="32" y="36" textAnchor="middle" fill="#f0dfc8" fontSize="10" fontFamily="Georgia, serif">{number}</text>
  </svg>
}

export default function HomeDesktop({ selectedFolder, onSelect, onOpen, windowOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  function navigate(index) {
    setMenuOpen(false)
    onOpen(index)
  }
  return <div className="yui-home" onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false) }}>
    <a className="home-skip" href="#home-main">跳到主要内容</a>
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Yui 述职首页" onClick={() => setMenuOpen(false)}>yui<span>.</span></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <nav id="site-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="主导航">
        {chapters.map((chapter, index) => <button type="button" key={chapter.id} aria-label={chapter.title} onClick={() => navigate(index)}><span className="nav-number">{chapter.number}</span>{navigationLabels[index]}</button>)}
      </nav>
      <span className="header-edition">2026 <span>/ 述职</span></span>
    </header>
    <main id="home-main">
      <section id="home" className={`hero atmosphere hero-desktop ${windowOpen ? 'pattern-paused' : ''}`} aria-labelledby="hero-heading" onClick={() => { onSelect(null); setMenuOpen(false) }}>
        <div className="hero-patterns" aria-hidden="true"><div className="hero-pattern-stripes" /><div className="hero-pattern-dots" /></div>
        <div className="desktop-stage">
          <div className="personal-window desktop-window">
            <div className="personal-titlebar window-bar">
              <div className="personal-window-label"><span className="window-grip" aria-hidden="true" /><span className="personal-filename">yui_work_review_2026</span><span className="window-grip" aria-hidden="true" /></div>
              <div className="window-controls-static" aria-hidden="true"><span>−</span><span>□</span><span>×</span></div>
            </div>
            <div className="personal-canvas">
              <div className="personal-copy">
                <span className="home-archive-label">内部述职档案 / 2026</span>
                <h1 id="hero-heading" aria-label="YUI · 试用期工作述职"><span className="hero-title-caption">试用期工作述职</span><span className="hero-name">YUI<span className="hero-period">.</span></span></h1>
                <p className="home-subtitle">2026 / ART DIRECTION / WORK REVIEW</p>
                <nav className="personal-folders" aria-label="打开述职章节文件夹">
                  {chapters.map((chapter, index) => <button type="button" className={`personal-folder ${selectedFolder === index ? 'is-selected' : ''}`} key={chapter.id} aria-label={`${chapter.number} ${chapter.title}`} aria-pressed={selectedFolder === index} title="单击选中，双击打开；按回车打开" onClick={event => { event.stopPropagation(); onSelect(index) }} onDoubleClick={event => { event.stopPropagation(); onOpen(index) }} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); onOpen(index) } }}>
                    <FolderIcon number={chapter.number} /><span>{folderLines[index][0]}<br />{folderLines[index][1]}</span>
                  </button>)}
                </nav>
                <div className="personal-instructions"><span>单击选中 · 双击打开</span><button type="button" disabled={selectedFolder === null} onClick={event => { event.stopPropagation(); onOpen(selectedFolder) }}>打开{selectedFolder === null ? '所选章节' : `第 ${chapters[selectedFolder].number} 章`} ↗</button></div>
                <div className="personal-role"><span>汇报人 / Yui</span><span>资深美术设计</span></div>
              </div>
              <PortraitPlaceholder />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
}
