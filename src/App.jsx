import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { chapters } from './reviewData'
import ReviewChapters from './ReviewChapters'
import './WorkReview.css'
import HomeDesktop from './HomeDesktop'

function ChapterWindow({ chapterIndex, onNavigate, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const contentRef = useRef(null)
  const chapter = chapters[chapterIndex]
  const previousChapterRef = useRef(chapterIndex)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  useEffect(() => {
    if (previousChapterRef.current === 0 && chapterIndex === 1) {
      contentRef.current.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    } else {
      contentRef.current.scrollTop = 0
    }
    previousChapterRef.current = chapterIndex
  }, [chapterIndex])

  function handleKeyDown(event) {
    if (event.key === 'Escape') onClose()
    if (event.key !== 'Tab') return
    const controls = dialogRef.current.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]')
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return createPortal(
    <div className="review-overlay" onClick={onClose}>
      <div className={`review-window ${chapterIndex === 0 ? 'archive-window' : ''}`} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={chapterIndex === 0 ? 'archive-window-title' : 'chapter-title'} onKeyDown={handleKeyDown} onClick={event => event.stopPropagation()}>
        <header className="review-window-bar"><strong id={chapterIndex === 0 ? 'archive-window-title' : undefined}><span aria-hidden="true">▣</span> {chapter.number} · {chapter.title}</strong><button type="button" ref={closeRef} onClick={onClose} aria-label={`关闭${chapter.title}`}>×</button></header>
        <div className="review-window-content" ref={contentRef}>
          {chapterIndex !== 0 && <header className="review-chapter-heading"><span className="review-eyebrow">CHAPTER {chapter.number} / {chapter.subtitle}</span><h2 id="chapter-title">{chapter.title}</h2>{chapter.id !== 'cases' && <p>{chapter.summary}</p>}</header>}
          <ReviewChapters key={chapter.id} chapterId={chapter.id} onContinue={() => onNavigate(1)} />
        </div>
        <nav className="review-chapter-nav" aria-label="章节导航">
          <button type="button" disabled={chapterIndex === 0} onClick={() => onNavigate(chapterIndex - 1)}>← 上一章</button>
          <span>{chapter.number} / 04</span>
          {chapterIndex < chapters.length - 1 ? <button type="button" onClick={() => onNavigate(chapterIndex + 1)}>下一章 →</button> : <button type="button" onClick={onClose}>返回首页 ↗</button>}
        </nav>
      </div>
    </div>, document.body,
  )
}

export default function App() {
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [openChapter, setOpenChapter] = useState(null)
  function open(index) {
    setSelectedFolder(index)
    setOpenChapter(index)
  }
  return <>
    <HomeDesktop selectedFolder={selectedFolder} onSelect={setSelectedFolder} onOpen={open} windowOpen={openChapter !== null} />
    {openChapter !== null && <ChapterWindow chapterIndex={openChapter} onNavigate={open} onClose={() => setOpenChapter(null)} />}
  </>
}
