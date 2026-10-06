import type { PersonalPhoto } from './personalPhotos';
import { workMediaManifest } from './workMediaManifest.ts';

type MediaText = { th: string; en: string; zh: string };
export type WorkVideo = {
  id: string; src: string; poster: string; width: number; height: number;
  duration: number; start: number; originalDuration: number; bytes: number;
  filename: string; sourceUrl: string; title: string; description: string;
};
const text = (th: string, en: string, zh: string): MediaText => ({ th, en, zh });
export const workMediaMessages: Record<string, MediaText> = {
  'work.mediaOrigin': text('ภาพจากโฟลเดอร์ผลงานของธีร์ธวัช', 'From Theetawatch’s project folder', '来自 Theetawatch 的项目文件夹'),
  'work.morePhotos': text('แสดงรูปเพิ่มเติม', 'Show more photos', '显示更多照片'),
  'work.fewerPhotos': text('ย่ออัลบั้ม', 'Collapse album', '收起相册'),
  'work.videos': text('ดูชิ้นงานทำงานจริง', 'See the build in action', '观看作品实际运行'),
  'work.videoIntro': text('เลือกคลิปที่อยากดู วิดีโอจะโหลดเมื่อกดเล่นเท่านั้น', 'Choose a clip. Videos load only when you press play.', '选择片段，仅在点击播放后加载视频。'),
  'work.playVideo': text('เล่นคลิป', 'Play clip', '播放片段'),
  'work.closeVideo': text('ปิดคลิป', 'Close clip', '关闭片段'),
  'work.videoOriginal': text('ดูวิดีโอต้นฉบับ', 'View original video', '查看原始视频'),
  'work.videoRange': text('ช่วงในต้นฉบับ', 'Original timeline', '原视频时间段'),
  'work.videoError': text('โหลดคลิปไม่สำเร็จ ลองใหม่หรือเปิดไฟล์โดยตรงได้', 'The clip could not load. Retry or open the file directly.', '片段加载失败，请重试或直接打开文件。'),
  'work.videoRetry': text('ลองอีกครั้ง', 'Retry', '重试'),
  'work.videoFile': text('เปิดไฟล์วิดีโอ', 'Open video file', '打开视频文件'),
  'work.videoControls': text('ใช้ปุ่มบนวิดีโอเพื่อเล่น หยุด ปรับเสียง หรือดูเต็มจอ', 'Use the video controls to play, pause, adjust sound or go fullscreen.', '使用视频控件播放、暂停、调节音量或全屏观看。'),
};
// Captions describe visible hardware and workspaces, rather than unverified results.
const captions: Record<string, MediaText> = {
  'three-phase-board': text('แผงอุปกรณ์และการเดินสายในตู้ไฟ ภาพจากการประกอบชุดฝึกวงจร 3 เฟส', 'Electrical components and cabinet wiring during assembly of the three-phase training board.', '三相接线实训板组装过程中的电气元件与柜内接线。'),
  'smart-water-pump': text('แผงควบคุมปั๊มน้ำ ปุ่มกด ไฟสถานะ และอุปกรณ์ภายในตู้', 'The water-pump control panel, buttons, status lights and electronics inside the cabinet.', '水泵控制面板、按钮、指示灯及柜内电子组件。'),
  'smart-garage': text('แบบจำลองโรงจอดรถ พร้อมอุปกรณ์ควบคุมและสายเชื่อมต่อระหว่างประกอบและทดลอง', 'The garage model, control electronics and connecting wires during assembly and experimentation.', '组装与实验中的车库模型、控制电子组件和连接线。'),
  'reaction-game': text('ชุดทดสอบการประสานมือและสายตา พร้อมปุ่มกดและวงจรที่ติดตั้งในกล่อง', 'The hand–eye coordination tester, including buttons and circuitry mounted in its enclosure.', '手眼协调测试装置及其箱体内安装的按钮与电路。'),
  'iot-people-counter': text('ตัวกล่อง อุปกรณ์ตรวจจับ และการติดตั้งวงจรของเครื่องนับคนเข้า–ออก', 'The enclosure, sensing components and circuit installation of the entry / exit counter.', '人员进出计数装置的箱体、检测组件与电路安装。'),
  'three-wheel-omni-robot': text('ฐานหุ่นยนต์ล้อ Omni และอุปกรณ์ควบคุมบนโต๊ะทดลอง', 'The omni-wheel robot chassis and control equipment on the workbench.', '工作台上的全向轮机器人底盘及控制设备。'),
  'ros2-web-dashboard': text('หน้าจอเว็บและสภาพแวดล้อมการทำงานของโปรเจกต์ควบคุมหุ่นยนต์ Next.js / ROS 2', 'Web screens and the working environment of the Next.js / ROS 2 robot-control project.', 'Next.js / ROS 2 机器人控制项目的网页界面与工作环境。'),
  'pid-motor-trainer': text('ชุดฝึกควบคุมมอเตอร์ พร้อมคอมพิวเตอร์และหน้าจอทดลองบนโต๊ะทำงาน', 'The motor-control trainer with its computer and experiment interface on the workbench.', '工作台上的电机控制实训装置、电脑与实验界面。'),
  'smart-air-purifier': text('โครงสร้างเครื่องกรองอากาศจำลองและอุปกรณ์ที่ติดตั้งอยู่ภายใน', 'The air-purifier model’s structure and components installed inside.', '空气净化器模型的结构及内部安装的组件。'),
  'infrared-hand-washer': text('อุปกรณ์ของเครื่องล้างมืออัตโนมัติและพื้นที่ทดลองประกอบ', 'Components of the automatic hand washer and its assembly workspace.', '自动洗手装置的组件与组装实验空间。'),
  'bottle-filling-conveyor': text('บันทึกการประกอบตู้ควบคุม โครงสร้าง สายพาน และชุดกรอกน้ำจากหลายมุม', 'Assembly notes showing the control enclosure, frame, conveyor and filling assembly from several angles.', '从多个角度记录控制柜、机架、输送带与灌装组件的组装过程。'),
  'allen-bradley-training-station': text('สถานีฝึกระบบอัตโนมัติในห้องปฏิบัติการจากโฟลเดอร์งาน Allen-Bradley', 'An automation training station in the lab, from the Allen-Bradley project folder.', '来自 Allen-Bradley 项目文件夹的实验室自动化实训工作站。'),
};
export const workMedia: Record<string, { photos: PersonalPhoto[]; videos: WorkVideo[] }> = {};
for (const [slug, media] of Object.entries(workMediaManifest)) {
  const description = `media.${slug}.description`;
  workMediaMessages[description] = captions[slug];
  const featured = slug === 'bottle-filling-conveyor' ? [19,23,0,9,11,25] : [];
  const orderedPhotos = [...featured.map(i=>media.photos[i]),...media.photos.filter((_,i)=>!featured.includes(i))];
  const photos = orderedPhotos.map((asset): PersonalPhoto => {
    const title = `media.${asset.id}.title`, alt = `${title}.alt`;
    workMediaMessages[title] = text(`บันทึกชิ้นงาน / ${asset.id.slice(-2)}`, `Build note / ${asset.id.slice(-2)}`, `作品记录 / ${asset.id.slice(-2)}`);
    workMediaMessages[alt] = text(`${captions[slug].th} · ภาพที่ ${asset.id.slice(-2)}`, `${captions[slug].en} Photo ${asset.id.slice(-2)}.`, `${captions[slug].zh} 第 ${asset.id.slice(-2)} 张。`);
    return { ...asset, title, alt, caption: description, kind: 'photo', origin: 'work.mediaOrigin' };
  });
  const videos = media.videos.map((asset, i): WorkVideo => {
    const title = `media.${asset.id}.title`;
    workMediaMessages[title] = text(`คลิปจากงานจริง / ${String(i + 1).padStart(2, '0')}`, `From the workbench / ${String(i + 1).padStart(2, '0')}`, `实际作品片段 / ${String(i + 1).padStart(2, '0')}`);
    return { ...asset, title, description };
  });
  workMedia[slug] = { photos, videos };
}
