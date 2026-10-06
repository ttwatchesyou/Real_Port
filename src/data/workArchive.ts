import type { PersonalPhoto } from './personalPhotos';
import { workMedia, type WorkVideo } from './workMedia.ts';
export type WorkText = { th: string; en: string; zh: string };
export type WorkGroup = 'automation' | 'embedded' | 'robotics' | 'learning';
export type WorkStudy = {
  slug: string; number: string; group: WorkGroup; visual: 'panel' | 'water' | 'garage' | 'reaction' | 'counter' | 'omni' | 'dashboard' | 'motor' | 'air' | 'washer' | 'conveyor' | 'station';
  title: WorkText; summary: WorkText; tags: string[]; scope: WorkText[];
  sourceId: string; folder: string; documented: boolean;
  photos?: PersonalPhoto[]; videos?: WorkVideo[];
};
const text = (th: string, en: string, zh: string): WorkText => ({ th, en, zh });

// Owner-supplied README files. Titles alone do not establish implementation,
// performance, completion dates, or a particular controller/board model.
export const workStudies: WorkStudy[] = [
  {
    number: '01', slug: 'three-phase-board', group: 'automation', visual: 'panel',
    title: text('ชุดฝึกเดินวงจรตู้ไฟ 3 เฟส', 'Three-phase wiring training board', '三相配电柜接线实训板'),
    summary: text('งานการเดินวงจรตู้ไฟ 3 เฟสสำหรับการศึกษาเบื้องต้น', 'An introductory educational project on wiring a three-phase electrical cabinet.', '面向基础教学的三相配电柜接线项目。'),
    tags: ['Three-phase', 'Electrical wiring', 'Training'],
    scope: [text('การเดินวงจรไฟฟ้า', 'Electrical wiring', '电气接线'), text('ตู้ไฟ 3 เฟส', 'Three-phase cabinet', '三相配电柜'), text('สื่อสำหรับการศึกษาเบื้องต้น', 'Introductory learning material', '基础学习材料')],
    folder: 'project_1_3phase_board', sourceId: '13br-rflSffeWbteowmYZpwJgZhOmNlk_', documented: false,
  },
  {
    number: '02', slug: 'smart-water-pump', group: 'embedded', visual: 'water',
    title: text('ระบบควบคุมปั๊มน้ำอัจฉริยะ', 'Smart water pump control', '智能水泵控制系统'),
    summary: text('โครงการระบบควบคุมปั๊มน้ำอัจฉริยะ', 'A project focused on intelligent water pump control.', '以智能水泵控制为主题的项目。'),
    tags: ['Water pump', 'Control system'], scope: [text('ปั๊มน้ำ', 'Water pump', '水泵'), text('ระบบควบคุม', 'Control system', '控制系统')],
    folder: 'project_2_smart_water_pump', sourceId: '1AwpnG_XlRGdEqqtB-hHOiZlKcyPZU1Dt', documented: false,
  },
  {
    number: '03', slug: 'smart-garage', group: 'embedded', visual: 'garage',
    title: text('ระบบจำลองโรงจอดรถอัจฉริยะ', 'Smart garage simulation', '智能车库模拟系统'),
    summary: text('แบบจำลองระบบโรงจอดรถอัจฉริยะ', 'A simulation project exploring a smart garage system.', '探索智能车库系统的模拟项目。'),
    tags: ['Smart garage', 'Simulation'], scope: [text('โรงจอดรถอัจฉริยะ', 'Smart garage', '智能车库'), text('ระบบจำลอง', 'Simulation system', '模拟系统')],
    folder: 'project_3_smart_garage', sourceId: '15_nh1dTRFf05SY1dNoXg7-gKnSJ28uSt', documented: false,
  },
  {
    number: '04', slug: 'reaction-game', group: 'learning', visual: 'reaction',
    title: text('เครื่องทดสอบการประสานมือและสายตา', 'Hand–eye coordination tester', '手眼协调测试装置'),
    summary: text('เครื่องทดสอบการทำงานประสานกันระหว่างมือและสายตา', 'A device project for testing hand–eye coordination.', '用于测试手眼协调能力的装置项目。'),
    tags: ['Hand–eye coordination', 'Learning'], scope: [text('การประสานมือและสายตา', 'Hand–eye coordination', '手眼协调'), text('เครื่องทดสอบ', 'Testing device', '测试装置')],
    folder: 'project_4_reaction_game', sourceId: '1xVoyuFUlserhYSyYXYCcJJdmadlgtDAt', documented: false,
  },
  {
    number: '05', slug: 'iot-people-counter', group: 'embedded', visual: 'counter',
    title: text('เครื่องนับคนเข้า–ออกผ่าน IoT', 'IoT entry / exit people counter', 'IoT 人员进出计数装置'),
    summary: text('เครื่องตรวจนับจำนวนคนเดินเข้า–ออกผ่าน IoT', 'A project for counting people entering and leaving using IoT.', '通过 IoT 统计人员进出数量的项目。'),
    tags: ['IoT', 'People counting'], scope: [text('การตรวจนับคนเข้า–ออก', 'Entry / exit counting', '进出人数统计'), text('IoT', 'IoT', 'IoT')],
    folder: 'project_5_people_counter', sourceId: '1eEwiSUyjSR7S6mlOw9SVNztZmrMRR7dD', documented: false,
  },
  {
    number: '06', slug: 'three-wheel-omni-robot', group: 'robotics', visual: 'omni',
    title: text('หุ่นยนต์ล้อ Omni 3 ล้อ', 'Three-wheel omni robot', '三轮全向移动机器人'),
    summary: text('โครงการหุ่นยนต์เคลื่อนที่ด้วยล้อ Omni จำนวน 3 ล้อ', 'A mobile robot project using three omni wheels.', '采用三个全向轮的移动机器人项目。'),
    tags: ['Omni wheels', 'Mobile robot'], scope: [text('หุ่นยนต์เคลื่อนที่', 'Mobile robot', '移动机器人'), text('ล้อ Omni 3 ล้อ', 'Three omni wheels', '三个全向轮')],
    folder: 'project_6_omni_robot', sourceId: '1c6KrIAPaL4rgeDiNSNfVOsSlSndkttKR', documented: false,
  },
  {
    number: '07', slug: 'ros2-web-dashboard', group: 'robotics', visual: 'dashboard',
    title: text('ควบคุมหุ่นยนต์ผ่าน Next.js และ ROS 2', 'Next.js & ROS 2 robot dashboard', 'Next.js 与 ROS 2 机器人控制面板'),
    summary: text('ระบบควบคุมและแดชบอร์ดหุ่นยนต์ผ่าน Next.js และ ROS 2', 'A robot control and dashboard project using Next.js and ROS 2.', '使用 Next.js 与 ROS 2 的机器人控制及仪表盘项目。'),
    tags: ['Next.js', 'ROS 2', 'Dashboard'], scope: [text('แดชบอร์ดหุ่นยนต์', 'Robot dashboard', '机器人仪表盘'), text('ระบบควบคุมผ่านเว็บ', 'Web control system', '网页控制系统'), text('Next.js และ ROS 2', 'Next.js and ROS 2', 'Next.js 与 ROS 2')],
    folder: 'project_7_ros2_web_dashboard', sourceId: '10a1TXq33qQCnTunzqaUkN5Rju5q38xvx', documented: false,
  },
  {
    number: '08', slug: 'pid-motor-trainer', group: 'learning', visual: 'motor',
    title: text('ชุดฝึก PID ผ่านเว็บและ ESP32', 'Web & ESP32 PID motor trainer', '网页与 ESP32 PID 电机实训装置'),
    summary: text('ชุดฝึกควบคุมมอเตอร์ด้วย PID Controller ผ่าน Next.js และ ESP32 MQTT', 'A PID motor control training project using Next.js, ESP32 and MQTT.', '使用 Next.js、ESP32 与 MQTT 的 PID 电机控制实训项目。'),
    tags: ['PID', 'Next.js', 'ESP32', 'MQTT'], scope: [text('การควบคุมมอเตอร์ด้วย PID', 'PID motor control', 'PID 电机控制'), text('เว็บ Next.js', 'Next.js web interface', 'Next.js 网页界面'), text('ESP32 และ MQTT', 'ESP32 and MQTT', 'ESP32 与 MQTT')],
    folder: 'project_8_pid_motor_trainer', sourceId: '1e1qS7kjzvblqllaggGNGJ4p_2xRoLnM-', documented: false,
  },
  {
    number: '09', slug: 'smart-air-purifier', group: 'embedded', visual: 'air',
    title: text('เครื่องกรองอากาศจำลองอัจฉริยะ', 'Smart air purifier model', '智能空气净化器模型'),
    summary: text('โครงการเครื่องกรองอากาศจำลองอัจฉริยะ', 'A project on a smart air purifier model.', '智能空气净化器模型项目。'),
    tags: ['Air purifier', 'Model'], scope: [text('การกรองอากาศ', 'Air purification', '空气净化'), text('เครื่องจำลองอัจฉริยะ', 'Smart model', '智能模型')],
    folder: 'project_9_air_purifier', sourceId: '1QGFbIh6gbDBzSleoKdR5Tjt8R_qCj5KK', documented: false,
  },
  {
    number: '10', slug: 'infrared-hand-washer', group: 'embedded', visual: 'washer',
    title: text('เครื่องล้างมืออัตโนมัติ', 'Infrared automatic hand washer', '红外自动洗手装置'),
    summary: text('เครื่องล้างมืออัตโนมัติด้วยเซนเซอร์อินฟราเรด', 'An automatic hand washing device project using an infrared sensor.', '采用红外传感器的自动洗手装置项目。'),
    tags: ['Infrared sensor', 'Automation'], scope: [text('เซนเซอร์อินฟราเรด', 'Infrared sensor', '红外传感器'), text('การล้างมืออัตโนมัติ', 'Automatic hand washing', '自动洗手')],
    folder: 'project_10_automatic_hand_washer', sourceId: '1-k4octH-er9nG3nIvbih1-hNDyrLQcJz', documented: false,
  },
  {
    number: '11', slug: 'bottle-filling-conveyor', group: 'automation', visual: 'conveyor',
    title: text('เครื่องกรอกน้ำบนสายพานอัตโนมัติ', 'Automatic bottle filling conveyor', '自动输送灌水装置'),
    summary: text('เครื่องกรอกน้ำระบบสายพานลำเลียงอัตโนมัติ', 'An automatic conveyor-based water filling machine project.', '基于自动输送带的灌水装置项目。'),
    tags: ['Conveyor', 'Water filling', 'Automation'], scope: [text('สายพานลำเลียงอัตโนมัติ', 'Automatic conveyor', '自动输送带'), text('ระบบกรอกน้ำ', 'Water filling system', '灌水系统')],
    folder: 'project_11_bottle_filling_conveyor', sourceId: '1eMC8fGtDN9qNg5I_w9VdTe5Nrcv55Cu2', documented: false,
  },
  {
    number: '12', slug: 'allen-bradley-training-station', group: 'automation', visual: 'station',
    title: text('ชุดฝึก Allen-Bradley และ SE-TEK', 'Allen-Bradley & SE-TEK training station', 'Allen-Bradley 与 SE-TEK 实训工作站'),
    summary: text('ฝึกควบคุมระบบอุตสาหกรรมด้วย PLC Allen-Bradley ร่วมกับสถานีฝึก SE-TEK และแขนกล KUKA เพื่อศึกษาการทำงานร่วมกันของระบบอัตโนมัติ', 'Industrial automation training with an Allen-Bradley PLC, a SE-TEK training station and a KUKA robot, studying how the systems operate together.', '使用 Allen-Bradley PLC、SE-TEK 实训工作站和 KUKA 机械臂开展工业自动化实训，学习系统协同运行。'),
    tags: ['Allen-Bradley', 'SE-TEK', 'KUKA', 'Ladder Diagram'],
    scope: [text('PLC Allen-Bradley: ควบคุมลอจิกและกระบวนการของสถานีฝึก', 'Allen-Bradley PLC: logic and process control for the training station.', 'Allen-Bradley PLC：控制实训工作站的逻辑与流程。'), text('สถานี SE-TEK: แผงควบคุม ปุ่มกด ไฟสถานะ และอุปกรณ์ระบบอัตโนมัติ', 'SE-TEK station: control panel, push buttons, indicator lights and automation hardware.', 'SE-TEK 工作站：控制面板、按钮、指示灯与自动化硬件。'), text('แขนกล KUKA: งานหยิบจับร่วมกับสายพานและสถานีฝึก', 'KUKA robot: handling tasks alongside the conveyor and training station.', 'KUKA 机械臂：与输送带及实训工作站协作进行搬运。'), text('คอมพิวเตอร์: เขียนโปรแกรมและมอนิเตอร์สถานะ PLC', 'Computer: programming and monitoring PLC status.', '计算机：编程并监控 PLC 状态。')],
    folder: 'project_12_allen_bradley_plc', sourceId: '16f_TrF5dS_r_GRyMq4Mct_WavDNDGeVw', documented: true,
  },
];

export const workMessages: Record<string, WorkText> = {
  'work.realPhotos': text('ภาพและเอกสารจากงานจริง', 'Real photos & project documents', '实拍照片与项目文档'),
  'work.photosInside': text('มีรูปจริงในรายละเอียด', 'Real images inside', '详情内有真实图片'),
  'work.title': text('สมุดผลงาน', 'The project notebook', '项目笔记'),
  'work.heading': text('วงจร กลไก และโค้ด\nบนโต๊ะเดียวกัน', 'Circuits, mechanics, code.\nOne workbench.', '电路、机械与代码\n汇聚于同一张工作台'),
  'work.intro': text('12 งานที่ครอบคลุมระบบอัตโนมัติ หุ่นยนต์ และอุปกรณ์อัจฉริยะ เปิดดูรูปจริง คลิปการทำงาน และบันทึกของแต่ละชิ้นได้เลย', 'Twelve projects spanning automation, robotics and smart devices. Explore real build photos, clips and notes for each project.', '十二个涵盖自动化、机器人和智能装置的项目。浏览各项目的实拍照片、运行片段与笔记。'),
  'work.home': text('กลับหน้าหลัก', 'Back to portfolio', '返回作品集'),
  'work.all': text('ทั้งหมด', 'All projects', '全部项目'),
  'work.automation': text('ระบบอัตโนมัติ', 'Automation', '自动化'),
  'work.embedded': text('อุปกรณ์อัจฉริยะ', 'Smart devices', '智能装置'),
  'work.robotics': text('หุ่นยนต์และเว็บ', 'Robotics & web', '机器人与网页'),
  'work.learning': text('ชุดฝึกและการเรียนรู้', 'Learning & training', '学习与实训'),
  'work.search': text('ค้นหาชื่อหรือเทคโนโลยี เช่น ROS, MQTT', 'Search projects or technologies, e.g. ROS, MQTT', '搜索项目或技术，例如 ROS、MQTT'),
  'work.count': text('งานที่พบ', 'projects found', '个项目'),
  'work.open': text('เปิดดูผลงาน', 'Explore project', '查看项目'),
  'work.concept': text('ภาพประกอบแนวงาน', 'Concept illustration', '概念示意图'),
  'work.context': text('บรรยากาศโต๊ะทดลอง · ภาพจริงจากอัลบั้มของผม', 'At the workbench · a real photo from my album', '工作台一角 · 来自我的真实相册'),
  'work.scope': text('แนวงานและองค์ประกอบ', 'Focus & components', '主题与组成'),
  'work.notes': text('บันทึกของโครงการ', 'Project notes', '项目笔记'),
  'work.brief': text('บันทึกนี้มีชื่อและแนวงานของโครงการ รูปชิ้นงาน ขั้นตอนการทำ และผลทดสอบจะเพิ่มในบันทึกถัดไป', 'This note records the project’s title and focus. Build photographs, process notes and test results will follow in a later entry.', '本笔记记录项目名称与主题。作品照片、制作过程和测试结果将在后续笔记中补充。'),
  'work.photosPending': text('รอภาพชิ้นงานจริง', 'Build photos to follow', '作品实拍待补充'),
  'work.motionOn': text('เปิดการเคลื่อนไหว', 'Enable motion', '开启动画'),
  'work.motionOff': text('หยุดการเคลื่อนไหว', 'Pause motion', '暂停动画'),
  'work.source': text('เอกสารต้นฉบับ', 'Source document', '原始文档'),
  'work.sourceNote': text('README ภาษาไทยจากโฟลเดอร์ผลงานที่ผมส่งไว้', 'The original Thai README from my shared project folder.', '来自我分享的项目文件夹的泰文 README。'),
  'work.download': text('ดาวน์โหลด README', 'Download README', '下载 README'),
  'work.next': text('เปิดบันทึกถัดไป', 'Next notebook entry', '下一篇笔记'),
  'work.previous': text('บันทึกก่อนหน้า', 'Previous entry', '上一篇笔记'),
  'work.back': text('ดูผลงานทั้งหมด', 'Browse all projects', '浏览全部项目'),
  'work.noResults': text('ยังไม่พบงานที่ตรงกัน ลองเปลี่ยนคำค้นหรือล้างตัวกรอง', 'No matching projects. Try another search or clear the filters.', '没有匹配项目，请更换关键词或清除筛选。'),
  'work.clear': text('ล้างตัวกรอง', 'Clear filters', '清除筛选'),
  'work.method': text('การฝึกและการทำงานร่วมกัน', 'Training & integration', '实训与集成'),
  'work.ladder': text('ฝึกเขียนและอัปโหลด Ladder Diagram เพื่อสั่งการสถานี SE-TEK', 'Practice writing and uploading Ladder Diagram programs to control the SE-TEK station.', '练习编写并上传梯形图程序以控制 SE-TEK 工作站。'),
  'work.integration': text('ศึกษาการทำงานร่วมกันของ PLC แผงควบคุม และแขนกล KUKA ในสถานีจำลองการผลิต', 'Study PLC, control panel and KUKA robot integration in a simulated production station.', '在模拟生产工作站中学习 PLC、控制面板与 KUKA 机械臂的集成。'),
  'work.related': text('ลองสื่อจำลอง PID บนเว็บ', 'Try the browser PID simulation', '体验网页 PID 模拟'),
  'work.relatedNote': text('สื่อทดลองบนเว็บแยกจากชุดฝึกฮาร์ดแวร์นี้', 'A separate browser simulation, distinct from this hardware trainer.', '独立的网页模拟，与本硬件实训装置分开。'),
  'work.feature': text('เปิดสมุดผลงาน 12 งาน', 'Open the 12-project notebook', '打开十二个项目的笔记'),
  'work.featureNote': text('จากตู้ไฟและระบบน้ำ ไปถึงหุ่นยนต์ ROS 2 และชุดฝึก PLC', 'From electrical cabinets and water systems to ROS 2 robots and PLC training.', '从配电柜和水系统，到 ROS 2 机器人与 PLC 实训。'),
  'work.record': text('PROJECT NOTE', 'PROJECT NOTE', '项目笔记'),
};
for (const study of workStudies) {
  study.photos = workMedia[study.slug]?.photos ?? [];
  study.videos = workMedia[study.slug]?.videos ?? [];
  workMessages[`work.${study.slug}.title`] = study.title;
  workMessages[`work.${study.slug}.summary`] = study.summary;
}
