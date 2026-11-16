# Theetawatch — Mechatronics & Robotics Portfolio

พอร์ตของ ธีร์ธวัช ตั้งตระกูลธนะกิจ ใช้ Next.js App Router, React, TypeScript, Ant Design และ styled-components สร้างเป็น static export ที่ `out/` ไม่มี backend หรือฐานข้อมูล

## ใช้งาน

Node.js 22 ขึ้นไป และ Yarn ผ่าน Corepack

```sh
corepack yarn install --immutable
corepack yarn dev
corepack yarn typecheck
corepack yarn build
corepack yarn start
```

## แนวทางออกแบบ

ออกแบบใหม่เป็นพอร์ตที่เน้นภาพจริง ตัวอักษร และเนื้อหา ศึกษา Siteinspire / Minimal Gallery และตัวอย่าง BLOND กับ David McGillivray ใช้เป็นแนวทางเรื่องลำดับสายตาและองค์ประกอบ ไม่คัดลอกงานออกแบบหรือสื่อของเว็บตัวอย่าง

- ภาพถ่ายและเอกสารต้นฉบับจากเจ้าของผลงานเท่านั้น ไม่มีภาพสร้างด้วย AI ภาพ stock หรือฉาก 3D ที่แสดงในเว็บ
- หน้าหลักคัด 6 งานที่มีภาพชิ้นงานจริง เปิดดูได้ทั้งหมด 18 งาน; PID Lab แยกเป็นเครื่องมือทดลอง
- ค้นหาข้ามสามภาษาและกรองหมวดหมู่ได้ ทั้งหน้าหลักและสมุดผลงาน
- ไทย / English / 中文 บันทึกภาษาที่เลือก พร้อมเปลี่ยน `html lang`
- Hero carousel ควบคุมเอง ปัดหรือกดปุ่มได้; แกลเลอรีเลื่อนแนวนอน และ lightbox ใช้ปุ่ม ลูกศรคีย์บอร์ด Escape หรือปัดภาพได้
- แอนิเมชันเป็น transition สั้นตามการกระทำ รองรับ reduced motion และปุ่มปิดเอฟเฟกต์
- ธีมสว่าง / มืด / ตามเครื่อง ไม่มีสีเปลี่ยนตามเวลา
- Inter และ IBM Plex Sans Thai เก็บใน `public/fonts/` พร้อม license
- สมุดผลงาน 12 หน้า ภาพจริง 68 รูปและคลิป 13 คลิป วิดีโอเริ่มโหลดเมื่อกดเล่น
- PID Lab คงสมการ ตัวควบคุม กราฟ เปรียบเทียบการทดลอง และ CSV โดยถอดฉาก 3D และใช้ปุ่มเพิ่มแรงรบกวน

## แก้ไขข้อมูล

- `src/data/portfolio.ts` — ข้อมูลส่วนตัว ช่องทางติดต่อ และผลงานเดิม
- `src/data/workArchive.ts` / `workDetails.ts` — ข้อมูลสมุดผลงาน 12 งาน
- `src/data/workMedia.ts` / `workMediaManifest.ts` — สื่อจริงของแต่ละงาน
- `src/i18n/editorial.ts` / `messages.ts` — ข้อความสามภาษา
- `src/components/Portfolio.tsx` / `editorialStyles.ts` — หน้าหลัก
- `src/components/work/` — หน้ารวมและรายละเอียดผลงาน

ยังไม่ได้ระบุ `profile.email` แบบฟอร์มจึงสร้างข้อความให้คัดลอกและมีลิงก์ GitHub โดยไม่แสดงว่าส่งข้อความแล้ว เมื่อใส่อีเมลจะเปิด mailto พร้อมร่างให้ตรวจสอบก่อนส่ง ไม่มีบริการส่งอีเมลจาก server

## SEO

มี favicon SVG/ICO, Apple touch icon, title/description, canonical, Open Graph, Twitter card, Person/WebSite/CreativeWork JSON-LD, robots.txt และ sitemap.xml รายหน้าผลงานมี title/description/ภาพของตัวเอง ภาษาที่สลับเป็น UI ภาษาใน URL เดียว ยังไม่ได้แยก URL ภาษา จึงไม่อ้าง hreflang ที่ไม่มีหน้าแยกจริง

บน Vercel ใช้ `VERCEL_PROJECT_PRODUCTION_URL` อัตโนมัติ ผู้ให้บริการอื่นตั้ง `NEXT_PUBLIC_SITE_URL` เป็น origin จริงก่อน build หากไม่มี URL สาธารณะ robots จะปิด index เพื่อป้องกัน canonical localhost ไม่ให้เผยแพร่ผิด

## ตรวจสอบ

เปิดเว็บจาก production build ก่อน แล้วทดสอบด้วย Chrome ที่ติดตั้งไว้:

```sh
BASE_URL=http://localhost:3000 CHROME_BIN=/opt/google/chrome/chrome corepack yarn test:smoke
corepack yarn test:pid-physics
BASE_URL=http://localhost:3000 CHROME_BIN=/opt/google/chrome/chrome corepack yarn test:media
```

`test:smoke` ตรวจหน้าตาใหม่และ flow หลัก: ภาพเลื่อน, lightbox, ค้นหาข้ามภาษา, ตัวกรอง, ติดต่อ, ธีม, สามภาษา/สี่ขนาดจอ, mobile menu, SEO, สมุดผลงาน และ PID

สคริปต์ appearance/photos/work/pid-models/pid-ui เดิมบางส่วนอ้างโครงหน้า 3D รุ่นเก่า ดูชุดตรวจปัจจุบันด้านบน เอกสารแหล่งที่มาของผลงานยังอยู่ใน `docs/`
