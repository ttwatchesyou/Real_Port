import { mkdir, writeFile } from 'node:fs/promises';
import { workStudies } from '../src/data/workArchive.ts';
import { workDetails } from '../src/data/workDetails.ts';
import { workSourceNotes } from '../src/data/workSourceNotes.ts';
import { workMediaManifest } from '../src/data/workMediaManifest.ts';

await mkdir('public/documents/work/source',{recursive:true});
for(const study of workStudies){
  const note=workDetails[study.slug];
  if(!note)throw new Error(`Missing expanded notes for ${study.slug}`);
  const source=workSourceNotes[study.slug].replace(/\s*\[cite:\s*[^\]]+\]/g,'').trim();
  const body=[
    `# โปรเจคที่ ${Number(study.number)}: ${study.title.th}`,
    '## ภาพรวม',study.summary.th,
    '## ขอบเขตที่ระบุในเอกสารต้นฉบับ',study.scope.map(s=>`- ${s.th}`).join('\n'),
    '## รายละเอียดฉบับขยาย',
    'รายละเอียดส่วนนี้เป็นคำอธิบายหลักการและแนวทางพัฒนาเพิ่มเติมจากโจทย์ของโครงการ ไม่ใช่รายงานผลทดสอบหรือการยืนยันอุปกรณ์ที่ไม่ได้ระบุไว้ในต้นฉบับ',
    '### โจทย์และจุดมุ่งหมาย',note.goal.th,
    '### หลักการทำงาน',note.principle.th,
    '### แนวทางพัฒนาและทดลอง',note.steps.map((s,i)=>`${i+1}. ${s.th}`).join('\n'),
    '### ประเด็นที่ควรตรวจสอบ',note.checks.map(s=>`- ${s.th}`).join('\n'),
    '## ภาพและไฟล์ประกอบ',
    study.photos?.length?['ภาพจริงจากโฟลเดอร์ของโครงการที่เจ้าของผลงานส่งมา อัปเดตเมื่อ 2 ตุลาคม 2026 ภาพแอนิเมชันบนเว็บยังเป็นภาพประกอบแนวงาน แยกจากรูปถ่ายด้านล่าง',...study.photos.map((p,i)=>`![ภาพชิ้นงาน ${i+1}](${p.src})`)].join('\n\n'):'ยังไม่มีภาพชิ้นงานในโฟลเดอร์ที่ได้รับ',
    ...(study.videos?.length?['### คลิปการทำงานสำหรับเว็บ', 'คลิป H.264 MP4 พร้อมภาพปก โหลดเมื่อกดเล่นเท่านั้น แบ่งไฟล์ยาวเป็นช่วงสั้น และเลือกช่วงต้น/กลาง/ท้ายสำหรับวิดีโอที่ยาวเกิน 90 วินาที ไม่ใช่การทดสอบใหม่หรือการรับรองผลของระบบ', study.videos.map(v=>`- [${v.filename} — ช่วง ${v.start.toFixed(0)}–${Math.min(v.originalDuration,v.start+v.duration).toFixed(0)} วินาที](${v.src}) (${(v.bytes/1_000_000).toFixed(1)} MB) · [ภาพปก](${v.poster})`).join('\n')]:[]),
    ...(workMediaManifest[study.slug]?.originalVideos.length?['### วิดีโอต้นฉบับ',workMediaManifest[study.slug].originalVideos.map(v=>`- [${v.filename}](${v.sourceUrl})`).join('\n')]:[]),
    '## ข้อมูลที่ควรแนบกับบันทึกชิ้นงานจริง',
    '- รูปชิ้นงานแต่ละมุม พร้อมคำอธิบายหน้าที่ของส่วนประกอบ\n- รุ่นอุปกรณ์และแบบวงจรหรือผังการเชื่อมต่อ\n- โค้ดหรือโปรแกรมควบคุมที่ใช้จริง\n- ขั้นตอนประกอบและปัญหาที่พบ พร้อมวิธีแก้\n- วิธีทดสอบ เงื่อนไขการทดลอง และผลที่วัดได้\n- บทบาทของผู้จัดทำและสถานะปัจจุบันของงาน',
    ...(note.references?.length?['## อ่านหลักการเพิ่มเติม',note.references.map(r=>`- [${r.label}](${r.url})`).join('\n'),'ลิงก์เหล่านี้ใช้ศึกษาหลักการ ไม่ได้ยืนยันรุ่นอุปกรณ์หรือซอฟต์แวร์ที่ใช้ในชิ้นงาน']:[]),
    '## เอกสารที่มา',`[README ต้นฉบับใน Google Drive](https://drive.google.com/file/d/${study.sourceId}/view)`,
    '### ข้อความจากต้นฉบับ',source,
  ].join('\n\n')+'\n';
  await writeFile(`public/documents/work/${study.slug}.md`,body);
  await writeFile(`public/documents/work/source/${study.slug}.md`,source+'\n');
}
console.log('Updated 12 expanded Markdown documents; preserved 12 separate source copies.');
