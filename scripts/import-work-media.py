# Requires Pillow and imageio-ffmpeg; see docs/project-media.md.
import json,hashlib,subprocess,math,shutil
from pathlib import Path
from PIL import Image,ImageOps
import argparse
import imageio_ffmpeg
parser=argparse.ArgumentParser(description='Optimize the downloaded owner-supplied project bundle; no network access.')
parser.add_argument('source',type=Path,help='Folder containing source-index.json and project_* folders')
args=parser.parse_args()
ROOT=Path(__file__).resolve().parent.parent;src=args.source.resolve();ff=imageio_ffmpeg.get_ffmpeg_exe()
slugs=['three-phase-board','smart-water-pump','smart-garage','reaction-game','iot-people-counter','three-wheel-omni-robot','ros2-web-dashboard','pid-motor-trainer','smart-air-purifier','infrared-hand-washer','bottle-filling-conveyor','allen-bradley-training-station']
index=json.loads((src/'source-index.json').read_text());manifest={};stats={'photoOriginalBytes':0,'photoWebBytes':0,'videoOriginalBytes':0,'videoWebBytes':0,'duplicates':[]}
for folder in sorted(index,key=lambda f:int(f['name'].split('_')[1])):
 slug=slugs[int(folder['name'].split('_')[1])-1];d=src/folder['name'];photos=[];videos=[];originalVideos=[];seen={};imgdir=ROOT/'public/images/work'/slug;viddir=ROOT/'public/videos/work'/slug;imgdir.mkdir(parents=True,exist_ok=True)
 for f in sorted(folder['files'],key=lambda f:f['name']):
  p=d/f['name'];sourceUrl='https://drive.google.com/file/d/'+f['id']+'/view'
  if f['mime'].startswith('image/') and p.exists():
   im=ImageOps.exif_transpose(Image.open(p)).convert('RGB');h=hashlib.sha256(im.tobytes()).hexdigest();stats['photoOriginalBytes']+=p.stat().st_size
   if h in seen:stats['duplicates'].append({'folder':folder['name'],'name':f['name'],'sameAs':seen[h]});continue
   seen[h]=f['name'];n=len(photos)+1;name=f'photo-{n:02}';im.thumbnail((1600,1600),Image.Resampling.LANCZOS);w,h=im.size
   im.save(imgdir/(name+'.webp'),quality=84,method=6);im.thumbnail((480,480),Image.Resampling.LANCZOS);im.save(imgdir/(name+'-small.webp'),quality=78,method=6)
   stats['photoWebBytes']+=(imgdir/(name+'.webp')).stat().st_size+(imgdir/(name+'-small.webp')).stat().st_size
   photos.append({'id':slug+'-'+name,'src':f'/images/work/{slug}/{name}.webp','thumbnail':f'/images/work/{slug}/{name}-small.webp','width':w,'height':h,'filename':f['name'],'sourceUrl':sourceUrl})
  if f['mime'].startswith('video/'):
   originalVideos.append({'filename':f['name'],'sourceUrl':sourceUrl,'available':p.exists()})
   if not p.exists():continue
   stats['videoOriginalBytes']+=p.stat().st_size;r=imageio_ffmpeg.read_frames(str(p));m=next(r);r.close();duration=m['duration'];originalVideos[-1].update(duration=duration,bytes=p.stat().st_size)
   if duration<=90:windows=[(s,min(30,duration-s)) for s in range(0,math.ceil(duration),30) if duration-s>.4]
   else:windows=[(0,25),(round((duration-25)/2),25),(max(0,math.floor(duration-25)),25)]
   w,h=m['size'];ratio=min(1,960/max(w,h));w=int(w*ratio)//2*2;h=int(h*ratio)//2*2;viddir.mkdir(parents=True,exist_ok=True)
   for start,length in windows:
    n=len(videos)+1;name=f'clip-{n:02}';out=viddir/(name+'.mp4');poster=imgdir/(name+'-poster.webp')
    if not out.exists():
     cmd=[ff,'-y','-ss',str(start),'-i',str(p),'-t',str(round(length,2)),'-map','0:v:0','-map','0:a:0?','-vf',f'scale={w}:{h}:flags=lanczos,fps=24','-c:v','libx264','-preset','fast','-crf','27','-maxrate','1200k','-bufsize','2400k','-pix_fmt','yuv420p','-c:a','aac','-b:a','64k','-ac','2','-movflags','+faststart','-map_metadata','-1','-map_chapters','-1','-threads','2',str(out)]
     subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
    subprocess.run([ff,'-y','-ss',str(min(23,length-0.5) if slug in ['three-wheel-omni-robot','pid-motor-trainer'] else min(2,length/3)),'-i',str(out),'-frames:v','1','-vf','scale=480:-2','-c:v','libwebp','-quality','80',str(poster)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
    r=imageio_ffmpeg.read_frames(str(out));processed=next(r);r.close();size=out.stat().st_size;stats['videoWebBytes']+=size
    videos.append({'id':slug+'-'+name,'src':f'/videos/work/{slug}/{name}.mp4','poster':f'/images/work/{slug}/{name}-poster.webp','width':w,'height':h,'duration':processed['duration'],'start':start,'originalDuration':duration,'bytes':size,'filename':f['name'],'sourceUrl':sourceUrl})
 manifest[slug]={'photos':photos,'videos':videos,'originalVideos':originalVideos};print(slug,len(photos),'photos',len(videos),'clips',flush=True)
(ROOT/'src/data/workMediaManifest.ts').write_text('// Generated from owner-supplied files. See docs/project-media.md.\nexport const workMediaManifest = '+json.dumps(manifest,ensure_ascii=False,indent=2)+';\n')
assets=ROOT/'assets/project-bundle-originals/updated-media';assets.mkdir(parents=True,exist_ok=True);(assets/'media-manifest.json').write_text(json.dumps({'projects':manifest,'stats':stats},ensure_ascii=False,indent=2));print(json.dumps(stats),flush=True)
