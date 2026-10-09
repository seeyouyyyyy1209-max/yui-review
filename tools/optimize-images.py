from pathlib import Path
from PIL import Image
import json
root=Path(__file__).resolve().parents[1]
manifest={}
before=after=0
for folder in ['coreplus','derma','peony-cedar','proline']:
 for p in sorted((root/'public/images'/folder).rglob('*')):
  if p.suffix.lower() not in ['.jpg','.png'] or 'feedback' in p.name or 'thumb' in p.name: continue
  im=Image.open(p)
  scale=min(1,1600/im.width,16300/im.height)
  if scale<1:
   im=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)
  rel=p.relative_to(root/'public')
  target=root/'public/images/optimized'/rel.relative_to('images').with_suffix('.webp')
  target.parent.mkdir(parents=True,exist_ok=True)
  im.save(target,'WEBP',quality=88,method=6)
  manifest['/'+str(rel)]='/'+str(target.relative_to(root/'public'))
  before+=p.stat().st_size;after+=target.stat().st_size
for n in [1,2]:
 p=root/f'public/images/yui-portrait-{n}.png';im=Image.open(p)
 im.thumbnail((1000,1040),Image.Resampling.LANCZOS)
 target=root/f'public/images/optimized/yui-portrait-{n}.webp'
 im.save(target,'WEBP',quality=90,method=6)
 manifest['/'+str(p.relative_to(root/'public'))]='/'+str(target.relative_to(root/'public'))
 before+=p.stat().st_size;after+=target.stat().st_size
(root/'src/optimizedImages.js').write_text('// 页面预览副本；高清放大保留原始作品。\nexport const optimizedImages = '+json.dumps(manifest,indent=2,ensure_ascii=False)+'\n')
print(f'{len(manifest)}张预览图片：{before/1048576:.1f} MB → {after/1048576:.1f} MB，减少{(1-after/before)*100:.1f}%')
