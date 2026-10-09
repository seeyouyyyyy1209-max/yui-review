import { assetUrl } from './assetUrl'
import { optimizedImages } from './optimizedImages'
import { useState } from 'react'

// 两张本人拼贴图同尺寸叠放，加载完成后每秒切换一帧。
export default function PortraitPlaceholder() {
  const [loadedFrames, setLoadedFrames] = useState(0)
  const ready = loadedFrames === 3

  return <figure className="personal-portrait" aria-label="Yui 人物拼贴，两种表情每秒交替展示">
    <div className="portrait-media portrait-loop" data-playback={ready ? 'playing' : 'loading'}>
      <img className="portrait-frame portrait-frame-first" src={assetUrl(optimizedImages['/images/yui-portrait-1.png'])} alt="Yui 的人物涂鸦拼贴" width="1300" height="1352" draggable="false" fetchPriority="high" onLoad={() => setLoadedFrames(frames => frames | 1)} />
      <img className="portrait-frame portrait-frame-second" src={assetUrl(optimizedImages['/images/yui-portrait-2.png'])} alt="" aria-hidden="true" width="1300" height="1352" draggable="false" onLoad={() => setLoadedFrames(frames => frames | 2)} />
    </div>
  </figure>
}
