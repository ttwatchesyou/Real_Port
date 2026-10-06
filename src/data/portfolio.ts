import { personalPhotos, type PersonalPhoto } from './personalPhotos';
import { workStudies } from './workArchive';
// Content and photographs supplied by Theetawatch. Keep event assignments accurate.
export const profile = {
  name: 'Theetawatch tangtakulltanakit',
  firstName: 'Theetawatch',
  lastName: 'tangtakulltanakit',
  thaiName: 'ธีร์ธวัช ตั้งตระกูลธนะกิจ',
  role: 'Mechatronics · Robotics · Automation',
  email: '',
  location: '',
  github: 'https://github.com/ttwatchesyou',
  repository: 'https://github.com/ttwatchesyou/Real_Port',
  available: true,
  about: 'ผมธีร์ธวัชครับ ทำงานสายเมคคาทรอนิกส์และหุ่นยนต์ ชอบไล่ทำความเข้าใจตั้งแต่กลไก วงจร ไปจนถึงโค้ดควบคุม เคยลงมือทำหุ่นยนต์แข่งขัน พัฒนาระบบควบคุมหุ่นยนต์ขนส่งใน JINPAO และฝึก PLC เพื่อเตรียม WorldSkills Thailand สิ่งที่ผมสนุกคือการหาว่าทำไมระบบถึงยังไม่ทำงาน แล้วค่อย ๆ แก้จนมันทำงานได้จริง',
  approach: 'ผมเริ่มจากศึกษาปัญหา ออกแบบและจำลองก่อนลงมือประกอบ พอทดสอบแล้วก็จดสิ่งที่เจอไว้กลับไปปรับ งานบางส่วนต่อยอดเป็นชุดฝึกและเอกสาร เพื่อให้คนอื่นลองทำต่อได้ด้วย',
};

export const categories = ['All projects', 'Robotics', 'Automation & PLC', 'Embedded & IoT', 'Learning & R&D'] as const;
export type Category = typeof categories[number];
export type Project = {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<Category, 'All projects'>;
  tags: string[];
  kind: 'arm' | 'board' | 'dashboard' | 'rover' | 'weather' | 'code' | 'plc' | 'agv' | 'cad' | 'pid' | 'study';
  studySlug?: string;
  description: string;
  note: string;
  role: string;
  status: string;
  details: string[];
  href?: string;
  image?: { src: string; alt: string; generated?: boolean; personal?: PersonalPhoto; focus?: 'upper' | 'lower' | 'contain' };
};

export const projects: Project[] = [
  {
    id: '07', name: 'ห้องทดลองจูน PID', subtitle: 'PID Tuning Lab', category: 'Learning & R&D',
    href: '/pid-lab', tags: ['PID', 'Simulation', 'Control systems'], kind: 'pid', status: 'INTERACTIVE',
    role: 'สื่อโต้ตอบเพื่อทดลองการควบคุม', note: 'มอเตอร์ + Encoder · ลูกตุ้มกลับหัว · รถเข็นติดลูกตุ้ม',
    description: 'ห้องทดลอง PID พร้อมแบบจำลองฟิสิกส์และกราฟการตอบสนอง', details: [],
  },
  {
    id: '01', name: 'หุ่นยนต์แข่งขันระดับชาติ', subtitle: 'National Robotics Competition', category: 'Robotics',
    image: { src: personalPhotos.news.src, alt: personalPhotos.news.alt, personal: personalPhotos.news, focus: 'contain' },
    tags: ['Robot control', 'Mechanical design', 'Simulation'], kind: 'arm', status: 'CHAMPION',
    role: 'ออกแบบ สร้าง และควบคุมหุ่นยนต์แข่งขัน',
    note: 'ผลการแข่งขัน: รางวัลชนะเลิศระดับชาติ',
    description: 'งานสร้างและควบคุมหุ่นยนต์สำหรับการแข่งขันระดับชาติ ครอบคลุมการออกแบบกลไก ทดสอบ และประกอบเป็นหุ่นยนต์จริง โดยได้รับรางวัลชนะเลิศจากการแข่งขัน',
    details: ['ออกแบบชิ้นส่วนและกลไกด้วย CAD', 'ใช้ Simulation ช่วยทดสอบระบบก่อนสร้างจริง', 'ประกอบหุ่นยนต์และพัฒนาโปรแกรมควบคุมเพื่อทำภารกิจ', 'ได้รับรางวัลชนะเลิศหุ่นยนต์ระดับชาติ'],
  },
  {
    id: '02', name: 'หุ่นยนต์ขนส่งอัตโนมัติ', subtitle: 'JINPAO Automation Contest', category: 'Robotics',
    image: { src: personalPhotos.design.src, alt: personalPhotos.design.alt, personal: personalPhotos.design, focus: 'contain' },
    tags: ['AGV', 'SolidWorks', 'Robot control'], kind: 'agv', status: 'COMPETITION',
    role: 'พัฒนาระบบควบคุมหุ่นยนต์ขนส่ง',
    note: 'โจทย์: ให้หุ่นยนต์เคลื่อนที่และขนส่งตามภารกิจ',
    description: 'วางแนวคิดหุ่นยนต์หยิบและจัดเรียงชิ้นงานสำหรับ JINPAO Automation Contest โดยใช้กลไกสามแกนร่วมกับฐานเคลื่อนที่ จากแบบแนวคิดนี้นำไปขึ้นโมเดลต่อใน SolidWorks และพัฒนาระบบควบคุมให้กลไกกับโปรแกรมทำงานร่วมกัน',
    details: ['วางแนวคิดกลไกสามแกนและฐานหุ่นยนต์เคลื่อนที่', 'นำแบบแนวคิดไปขึ้นโมเดลต่อใน SolidWorks', 'ออกแบบการควบคุมการเคลื่อนที่และการนำทาง', 'เชื่อมต่อโปรแกรมกับอุปกรณ์และเซนเซอร์ของหุ่นยนต์', 'ทดสอบและปรับระบบให้ทำงานตามภารกิจการขนส่ง'],
  },
  {
    id: '03', name: 'PLC และระบบอัตโนมัติ', subtitle: 'WorldSkills Thailand Preparation', category: 'Automation & PLC',
    image: { src: personalPhotos.automation.src, alt: personalPhotos.automation.alt, personal: personalPhotos.automation, focus: 'lower' },
    tags: ['Mitsubishi FX5U', 'Logic control', 'Sensors & actuators'], kind: 'plc', status: 'TRAINING',
    role: 'ฝึกเขียนโปรแกรมและควบคุมระบบอัตโนมัติ',
    note: 'สถานะ: ฝึกเตรียมความพร้อมสู่ WorldSkills Thailand',
    description: 'ฝึกทักษะการเขียนโปรแกรม PLC และการควบคุมระบบอัตโนมัติเพื่อเตรียมความพร้อมสู่ WorldSkills Thailand เน้นทำความเข้าใจลำดับการทำงานและตรวจสอบการตอบสนองของระบบ',
    details: ['ฝึกเขียน Logic Control และลำดับการทำงาน', 'เชื่อมโยงสัญญาณจากเซนเซอร์กับเงื่อนไขควบคุม', 'ทดสอบ วิเคราะห์ และแก้ปัญหาในโปรแกรม PLC', 'ฝึกซ้อมและพัฒนาทักษะด้านระบบอัตโนมัติอย่างต่อเนื่อง'],
  },
  {
    id: '04', name: 'ต้นแบบไมโครคอนโทรลเลอร์', subtitle: 'Arduino UNO R4 & ESP32 Prototypes', category: 'Embedded & IoT',
    image: { src: personalPhotos.circuit.src, alt: personalPhotos.circuit.alt, personal: personalPhotos.circuit, focus: 'lower' },
    tags: ['Arduino UNO R4', 'ESP32', 'Sensors'], kind: 'board', status: 'PROTOTYPING',
    role: 'ประกอบวงจรและเขียนโปรแกรมควบคุม',
    note: 'เชื่อมบอร์ด เซนเซอร์ และอุปกรณ์ให้ทำงานร่วมกัน',
    description: 'ประกอบและเขียนโปรแกรมไมโครคอนโทรลเลอร์ เช่น Arduino UNO R4 และ ESP32 ใช้ร่วมกับเซนเซอร์ มอเตอร์ และอุปกรณ์อิเล็กทรอนิกส์ เพื่อทดลองการควบคุมในต้นแบบจริง',
    details: ['ประกอบวงจรและจัดการการเชื่อมต่ออุปกรณ์', 'อ่านค่าเซนเซอร์และเขียนเงื่อนไขควบคุม', 'ทดสอบการทำงานร่วมกันของฮาร์ดแวร์และโปรแกรม'],
  },
  {
    id: '05', name: 'ชุดฝึกและบันทึกการทดลอง', subtitle: 'Training Kits & Research Documentation', category: 'Learning & R&D',
    image: { src: personalPhotos.handsOn.src, alt: personalPhotos.handsOn.alt, personal: personalPhotos.handsOn, focus: 'upper' },
    tags: ['Training kits', 'R&D', 'Technical writing'], kind: 'plc', status: 'LEARNING',
    role: 'พัฒนาชุดฝึก จัดทำรายงาน และถ่ายทอดความรู้',
    note: 'จากสิ่งที่ลงมือทำ สู่สิ่งที่คนอื่นลองทำต่อได้',
    description: 'นำความรู้จากการทำงานจริงมาวิเคราะห์ จัดทำรายงานและชุดฝึกปฏิบัติการ ใช้ประกอบการเรียนรู้และถ่ายทอดขั้นตอนการทำงานให้ผู้อื่น',
    details: ['พัฒนาชุดทดลองจากความรู้ด้านหุ่นยนต์และระบบควบคุม', 'จัดทำรายงานและเอกสารอธิบายกระบวนการ', 'บันทึกปัญหา วิธีแก้ และสิ่งที่ได้เรียนรู้จากการทดลอง'],
  },
  {
    id: '06', name: 'ออกแบบก่อนลงมือสร้าง', subtitle: 'CAD Design & System Simulation', category: 'Learning & R&D',
    image: { src: personalPhotos.design.src, alt: personalPhotos.design.alt, personal: personalPhotos.design, focus: 'contain' },
    tags: ['CAD', 'Simulation', 'Mechanical design'], kind: 'cad', status: 'DESIGN',
    role: 'ออกแบบชิ้นส่วนและจำลองการทำงาน',
    note: 'ตรวจแนวคิดและการทำงาน ก่อนประกอบชิ้นงานจริง',
    description: 'ใช้ CAD ออกแบบชิ้นส่วนและโครงสร้าง พร้อมใช้ซอฟต์แวร์ Simulation ทดสอบแนวคิดและการทำงานของระบบก่อนสร้างจริง',
    details: ['ออกแบบชิ้นส่วนและโครงสร้างเชิงกล', 'จำลองการทำงานเพื่อศึกษาพฤติกรรมของระบบ', 'นำผลที่ได้กลับไปปรับแบบก่อนประกอบจริง'],
  },
  ...workStudies.map((study): Project => ({
    id: String(7 + Number(study.number)).padStart(2, '0'),
    name: `work.${study.slug}.title`, subtitle: `work.${study.slug}.title`,
    category: study.group === 'automation' ? 'Automation & PLC' : study.group === 'robotics' ? 'Robotics' : study.group === 'embedded' ? 'Embedded & IoT' : 'Learning & R&D',
    tags: study.tags, kind: 'study', studySlug: study.slug, href: `/work/${study.slug}`,
    status: 'work.record', role: '', note: `work.${study.slug}.summary`,
    description: `work.${study.slug}.summary`, details: [],
  })),
];

export const roles = [
  { number: '01', title: 'ผู้ช่วยสอนระดับ ปวส.', label: 'TEACHING ASSISTANT', description: 'ช่วยอธิบายเนื้อหาและการลงมือทำ แยกเรื่องที่ซับซ้อนให้เป็นขั้นตอนที่ผู้เรียนตามได้' },
  { number: '02', title: 'ส่งต่อสิ่งที่เรียนรู้', label: 'RESEARCH & DOCUMENTATION', description: 'นำผลจากการทดลองมาทำรายงาน คู่มือ และชุดฝึก เพื่อเก็บความรู้ไว้ใช้ต่อและแบ่งปันให้ผู้อื่น' },
  { number: '03', title: 'เป็นส่วนหนึ่งของวิทยาลัย', label: 'VOLUNTEERING', description: 'มีส่วนร่วมในกิจกรรมจิตสาธารณะภายในวิทยาลัย และทำงานร่วมกับคนอื่นนอกห้องปฏิบัติการ' },
];
