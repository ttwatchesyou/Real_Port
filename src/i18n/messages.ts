import { workMediaMessages } from '@/data/workMedia';
import { workMessages } from '@/data/workArchive';
import { workDetailMessages } from '@/data/workDetails';
export const messages: Record<string, { th: string; en: string; zh: string }> = {
  ...workMessages,
  ...workMediaMessages,
  ...workDetailMessages,
  'album.label': { th: 'PHOTO NOTES / บันทึกจากห้องแล็บ', en: 'PHOTO NOTES / FROM THE LAB', zh: '影像笔记 / 来自实验室' },
  'album.heading': { th: 'ลงมือทำ แล้วเก็บไว้เล่า', en: 'Made, tested, remembered.', zh: '动手制作，测试，记录' },
  'album.description': { th: 'หุ่นยนต์ วงจร โค้ด และคนที่ได้ทำงานด้วย ภาพจากการทดลองและการเรียนรู้ระหว่างทาง', en: 'Robots, circuits, code and people along the way. Moments from the workbench and the classroom.', zh: '机器人、电路、代码与一起学习的人，记录工作台和课堂中的点滴。' },
  'album.origin': { th: 'จากอัลบั้มงานของธีร์ธวัช', en: 'From Theetawatch’s work album', zh: '来自 Theetawatch 的工作相册' },
  'album.photo': { th: 'ภาพจากงานจริง', en: 'From the workbench', zh: '工作现场实拍' },
  'album.document': { th: 'เอกสารจากอัลบั้ม', en: 'Document from the album', zh: '相册中的文档' },
  'album.explore': { th: 'ดูอัลบั้มทั้งหมด', en: 'Explore the album', zh: '浏览整个相册' },
  'album.note': { th: 'รายละเอียดเล็ก ๆ ระหว่างประกอบ ทดสอบ และลองใหม่', en: 'Small moments of building, testing and trying again.', zh: '组装、测试与再次尝试中的小细节。' },
  'album.full': { th: 'เปิดภาพเต็ม', en: 'Open full image', zh: '打开完整图片' },
  'album.hands-on': { th: 'ลองกับวงจรจริง', en: 'Hands-on in the lab', zh: '在实验室动手实践' },
  'album.hands-on.alt': { th: 'ภาพถ่ายผู้เรียนถือชุดวงจรและสายต่อในห้องปฏิบัติการหุ่นยนต์', en: 'Photograph of a learner holding a circuit assembly and cables in a robotics lab', zh: '学习者在机器人实验室中拿着电路组件与接线的实拍' },
  'album.hands-on.caption': { th: 'ชุดวงจรในมือ สายที่กำลังต่อ และอุปกรณ์ในห้องแล็บ ภาพหนึ่งของการเรียนรู้ผ่านการลงมือทำ', en: 'A circuit assembly, connecting cables and lab equipment: a moment of learning through practice.', zh: '手中的电路组件、接线与实验设备，记录通过实践学习的一刻。' },
  'album.robot-prototype': { th: 'หุ่นยนต์บนโต๊ะทดลอง', en: 'A robot in the lab', zh: '实验室中的机器人' },
  'album.robot-prototype.alt': { th: 'ภาพถ่ายหุ่นยนต์ตู้สีขาวในห้องแล็บ เห็นโครงสร้าง กลไก และอุปกรณ์ภายใน', en: 'Photograph of a white mobile robot in the lab, showing its frame, mechanisms and electronics', zh: '实验室中白色移动机器人实拍，可见结构、机构与内部电子设备' },
  'album.robot-prototype.caption': { th: 'ตัวหุ่นยนต์ที่เปิดให้เห็นโครงสร้างและกลไกภายใน พร้อมป้ายทีม Sudsakorn The Blue White', en: 'The robot’s structure and mechanisms, with a Sudsakorn The Blue White team label.', zh: '机器人内部结构与机构，机身带有 Sudsakorn The Blue White 团队标识。' },
  'album.lab-workbench': { th: 'โต๊ะทำงานที่ใช้งานจริง', en: 'An actual workbench', zh: '实际使用中的工作台' },
  'album.lab-workbench.alt': { th: 'ภาพถ่ายโต๊ะทำงานพร้อมแล็ปท็อป คีม สายไฟ และชุดทดลองระบบอัตโนมัติ', en: 'Photograph of a workbench with a laptop, pliers, wiring and automation training equipment', zh: '配有笔记本电脑、钳子、接线与自动化实验设备的工作台实拍' },
  'album.lab-workbench.caption': { th: 'แล็ปท็อป เครื่องมือ สายไฟ และชุดฝึกอยู่บนโต๊ะเดียวกัน งานโปรแกรมกับงานฮาร์ดแวร์จึงไปด้วยกัน', en: 'Laptop, tools, wiring and training rigs on one bench, where programming and hardware meet.', zh: '电脑、工具、接线与实验装置在同一工作台上，连接编程与硬件。' },
  'album.automation-training': { th: 'ชุดฝึกระบบอัตโนมัติ', en: 'Automation training rig', zh: '自动化实验装置' },
  'album.automation-training.alt': { th: 'ภาพถ่ายชุดฝึกระบบอัตโนมัติบนฐานอะลูมิเนียม พร้อมกระบอกลม สายลม เซนเซอร์ และชิ้นงาน', en: 'Photograph of an automation training rig with pneumatic cylinders, tubing, sensors and workpieces', zh: '配有气缸、气管、传感器与工件的自动化实验装置实拍' },
  'album.automation-training.caption': { th: 'ชุดฝึกที่เห็นทั้งฐาน กลไก สายลม และจุดต่อวงจร ใช้เล่าแนวงานระบบควบคุมและการทดลองในห้องแล็บ', en: 'A training rig showing its base, mechanisms, tubing and electrical connections from the lab album.', zh: '相册中的实验装置，可见底座、机构、气管与电气连接。' },
  'album.sensor-circuit': { th: 'ต่อวงจรทีละจุด', en: 'One connection at a time', zh: '逐点连接电路' },
  'album.sensor-circuit.alt': { th: 'ภาพถ่ายบอร์ดไมโครคอนโทรลเลอร์บนแผ่นวงจรทดลองต่อกับสายไฟและแผ่นวงกลมหลายชิ้น', en: 'Photograph of a microcontroller on a prototyping board wired to multiple circular discs', zh: '实验电路板上的微控制器通过接线连接多个圆形元件的实拍' },
  'album.sensor-circuit.caption': { th: 'บอร์ดไมโครคอนโทรลเลอร์กับวงจรบนแผ่นทดลอง เห็นสายต่อและจุดบัดกรีของชุดที่กำลังทดสอบ', en: 'A microcontroller and prototyping-board circuit with visible wiring and solder joints during testing.', zh: '测试中的微控制器与实验电路，可见接线及焊点。' },
  'album.coding-session': { th: 'โค้ดบนโต๊ะทำงาน', en: 'Code at the workbench', zh: '工作台上的代码' },
  'album.coding-session.alt': { th: 'ภาพถ่ายหน้าจอแล็ปท็อปที่เปิดโค้ด Next.js และ styled-components บนโต๊ะทำงาน', en: 'Photograph of a laptop displaying Next.js and styled-components code at a workbench', zh: '工作台上的笔记本电脑显示 Next.js 与 styled-components 代码的实拍' },
  'album.coding-session.caption': { th: 'หน้าจอโค้ดเว็บและ terminal ระหว่างทำงาน พร้อมอุปกรณ์จริงอยู่รอบโต๊ะ', en: 'Web code and a terminal during development, surrounded by equipment on the bench.', zh: '开发过程中的网页代码与终端，周围摆放着工作设备。' },
  'album.joystick-testing': { th: 'จากจอยสู่โปรแกรม', en: 'Controller meets code', zh: '控制器与代码相遇' },
  'album.joystick-testing.alt': { th: 'ภาพถ่ายมือจับจอย Xbox หน้าแล็ปท็อปที่เปิดโค้ดบน Ubuntu', en: 'Photograph of a hand holding an Xbox controller in front of a laptop running code on Ubuntu', zh: '手持 Xbox 控制器，面前的笔记本在 Ubuntu 上运行代码的实拍' },
  'album.joystick-testing.caption': { th: 'จอยควบคุม แล็ปท็อป และหน้าจอโค้ดในชุดทดสอบการเชื่อมต่ออุปกรณ์กับโปรแกรม', en: 'A controller, laptop and code display during hardware-to-software connection testing.', zh: '控制器、电脑与代码界面，记录硬件与软件的连接测试。' },
  'album.ros-visualization': { th: 'มองข้อมูลผ่าน ROS', en: 'Seeing data through ROS', zh: '通过 ROS 观察数据' },
  'album.ros-visualization.alt': { th: 'ภาพถ่ายหน้าจอ RViz ที่แสดงข้อมูลสามมิติบนโต๊ะพร้อมอุปกรณ์หุ่นยนต์', en: 'Photograph of an RViz display showing 3D data beside robotics equipment', zh: '机器人设备旁显示三维数据的 RViz 屏幕实拍' },
  'album.ros-visualization.caption': { th: 'หน้าจอ RViz สำหรับดูข้อมูลสามมิติและ marker จาก ROS พร้อมอุปกรณ์ที่กำลังทดลอง', en: 'An RViz view of 3D data and ROS markers beside the equipment being tested.', zh: 'RViz 中的三维数据与 ROS 标记，旁边摆放正在测试的设备。' },
  'album.motor-drive': { th: 'ลองระบบขับมอเตอร์', en: 'Motor-drive practice', zh: '电机驱动实践' },
  'album.motor-drive.alt': { th: 'ภาพถ่ายโมดูล inverter ฝึกปฏิบัติพร้อมหน้าจอ ปุ่มปรับ และสายต่อสีแดง', en: 'Photograph of an inverter training module with a display, adjustment knobs and red patch leads', zh: '配有显示屏、调节旋钮和红色接线的变频器实验模块实拍' },
  'album.motor-drive.caption': { th: 'โมดูล inverter และจุดต่อสายสำหรับฝึกการควบคุมระบบขับมอเตอร์', en: 'An inverter module and patch connections for motor-drive control practice.', zh: '用于电机驱动控制实践的变频器模块与连接端子。' },
  'album.classroom-session': { th: 'เรียนรู้ด้วยกัน', en: 'Learning together', zh: '共同学习' },
  'album.classroom-session.alt': { th: 'ภาพถ่ายบรรยากาศห้องเรียนที่ผู้เรียนใช้แล็ปท็อปและอุปกรณ์ทดลอง', en: 'Photograph of a classroom with learners using laptops and lab equipment', zh: '学习者使用笔记本电脑和实验设备的课堂实拍' },
  'album.classroom-session.caption': { th: 'บรรยากาศเรียนรู้ในห้องปฏิบัติการ มีทั้งหน้าจอโปรแกรมและอุปกรณ์ให้ทดลอง', en: 'A lab learning session with programming screens and equipment to try.', zh: '包含编程界面与可供操作设备的实验课堂。' },
  'album.robot-teach-pendant': { th: 'หน้าจอควบคุมแขนกล', en: 'At the teach pendant', zh: '机械臂示教器' },
  'album.robot-teach-pendant.alt': { th: 'ภาพถ่าย teach pendant ของ NACHI พร้อมหน้าจอสถานะและปุ่มควบคุมแขนกล', en: 'Photograph of a NACHI teach pendant with its status screen and robot controls', zh: '显示状态界面与机器人控制按键的 NACHI 示教器实拍' },
  'album.robot-teach-pendant.caption': { th: 'Teach pendant ของ NACHI กับหน้าจอสถานะระหว่างเรียนรู้การควบคุมและตรวจสอบแขนกล', en: 'A NACHI teach pendant and status screen during robot-control learning and inspection.', zh: '学习机械臂控制与检查时的 NACHI 示教器及状态界面。' },
  'album.robot-field-test': { th: 'ออกจากห้องแล็บ', en: 'Beyond the lab', zh: '走出实验室' },
  'album.robot-field-test.alt': { th: 'ภาพถ่ายหุ่นยนต์ Sudsakorn The Blue White กลางแจ้งข้างแล็ปท็อปที่เปิดโค้ด', en: 'Photograph of a Sudsakorn The Blue White robot outdoors beside a laptop displaying code', zh: '户外的 Sudsakorn The Blue White 机器人，旁边电脑显示代码的实拍' },
  'album.robot-field-test.caption': { th: 'หุ่นยนต์และแล็ปท็อปที่เปิดโปรแกรมอยู่ข้างกันในพื้นที่กลางแจ้ง เห็นทั้งตัวเครื่องและงานโค้ด', en: 'A robot and an open programming laptop together outdoors, showing hardware and code side by side.', zh: '户外的机器人与正在编程的电脑，展示并行工作的硬件与代码。' },
  'album.robot-system-design': { th: 'แนวคิดก่อนประกอบ', en: 'Before the build', zh: '组装前的设计构想' },
  'album.robot-system-design.alt': { th: 'แผนภาพแนวคิดหุ่นยนต์หยิบและจัดเรียงชิ้นงาน มีระบบสามแกน ล้อ และผังอุปกรณ์', en: 'Concept diagram of a pick-and-place robot with three axes, wheels and a component layout', zh: '包含三轴机构、车轮及设备布局的抓取分拣机器人概念图' },
  'album.robot-system-design.caption': { th: 'แบบแนวคิดหุ่นยนต์สามแกนและฐานเคลื่อนที่สำหรับ JINPAO ก่อนนำไปขึ้นโมเดลต่อด้วย SolidWorks', en: 'The three-axis robot and mobile-base concept for JINPAO, before further modeling in SolidWorks.', zh: '用于 JINPAO 的三轴机器人与移动底座概念图，之后在 SolidWorks 中进一步建模。' },
  'วางแนวคิดหุ่นยนต์หยิบและจัดเรียงชิ้นงานสำหรับ JINPAO Automation Contest โดยใช้กลไกสามแกนร่วมกับฐานเคลื่อนที่ จากแบบแนวคิดนี้นำไปขึ้นโมเดลต่อใน SolidWorks และพัฒนาระบบควบคุมให้กลไกกับโปรแกรมทำงานร่วมกัน': { th: 'วางแนวคิดหุ่นยนต์หยิบและจัดเรียงชิ้นงานสำหรับ JINPAO Automation Contest โดยใช้กลไกสามแกนร่วมกับฐานเคลื่อนที่ จากแบบแนวคิดนี้นำไปขึ้นโมเดลต่อใน SolidWorks และพัฒนาระบบควบคุมให้กลไกกับโปรแกรมทำงานร่วมกัน', en: 'Developed a pick-and-place robot concept for the JINPAO Automation Contest, combining a three-axis mechanism with a mobile base. The concept was then modeled further in SolidWorks, alongside control-system development connecting software and mechanics.', zh: '为 JINPAO 自动化竞赛构思抓取分拣机器人，将三轴机构与移动底座结合。之后在 SolidWorks 中继续建模，并开发连接软件与机械的控制系统。' },
  'วางแนวคิดกลไกสามแกนและฐานหุ่นยนต์เคลื่อนที่': { th: 'วางแนวคิดกลไกสามแกนและฐานหุ่นยนต์เคลื่อนที่', en: 'Developed the three-axis mechanism and mobile-base concept', zh: '构思三轴机构与移动机器人底座' },
  'นำแบบแนวคิดไปขึ้นโมเดลต่อใน SolidWorks': { th: 'นำแบบแนวคิดไปขึ้นโมเดลต่อใน SolidWorks', en: 'Continued modeling from the concept in SolidWorks', zh: '基于概念图在 SolidWorks 中继续建模' },
  'album.competition-news': { th: 'ภาพข่าวการแข่งขัน', en: 'A competition news clipping', zh: '机器人竞赛新闻剪报' },
  'album.competition-news.alt': { th: 'ภาพข่าวหนังสือพิมพ์ที่มีภาพทีมรับมอบเกียรติบัตรการแข่งขันหุ่นยนต์', en: 'Photograph of a newspaper clipping showing a robotics team receiving certificates', zh: '报道机器人团队领取证书的报纸剪报照片' },
  'album.competition-news.caption': { th: 'ภาพข่าวหนังสือพิมพ์ไทยรัฐเกี่ยวกับการแข่งขันหุ่นยนต์และการมอบเกียรติบัตร จากอัลบั้มที่ส่งมา', en: 'A Thairath newspaper clipping about a robotics competition and certificate presentation, supplied in the album.', zh: '用户提供的相册中，Thairath 报纸关于机器人竞赛与颁发证书的剪报。' },
  'photo.reference': { th: 'ภาพถ่ายอ้างอิง', en: 'Reference photograph', zh: '参考实拍照片' },
  'photo.label': { th: 'PHOTO NOTES / ภาพจากโลกฮาร์ดแวร์', en: 'PHOTO NOTES / THE PHYSICAL SIDE', zh: '影像笔记 / 硬件的真实一面' },
  'photo.heading': { th: 'บอร์ดจริง รอยต่อจริง', en: 'Boards, bolts & the real thing.', zh: '真实的电路板与机械细节' },
  'photo.description': { th: 'ภาพถ่ายอุปกรณ์และการทดลองจากช่างภาพจริง ลองเปิดดูรายละเอียดเล็ก ๆ ที่ทำให้ฮาร์ดแวร์มีเสน่ห์', en: 'Real equipment, photographed by real people. Open a frame and take a closer look at the small details.', zh: '由摄影者拍下的真实设备。打开照片，细看硬件中那些有趣的小细节。' },
  'photo.disclaimer': { th: 'ภาพอ้างอิงแนวงานจาก Wikimedia Commons ไม่ใช่ภาพผลงานส่วนตัวของธีร์ธวัช', en: 'Field references from Wikimedia Commons, not photographs of Theetawatch’s own projects.', zh: '这些来自 Wikimedia Commons 的照片用于展示相关领域，并非 Theetawatch 的个人作品实拍。' },
  'photo.open': { th: 'เปิดภาพ', en: 'Open photograph', zh: '打开照片' },
  'photo.previous': { th: 'ภาพก่อนหน้า', en: 'Previous photograph', zh: '上一张照片' },
  'photo.next': { th: 'ภาพถัดไป', en: 'Next photograph', zh: '下一张照片' },
  'photo.hint': { th: 'ปัดซ้าย–ขวา หรือใช้ปุ่มลูกศรเพื่อเปลี่ยนภาพ', en: 'Swipe or use the arrow keys to browse.', zh: '左右滑动或使用方向键浏览。' },
  'photo.source': { th: 'ดูภาพต้นฉบับและผู้ถ่าย', en: 'Original & photographer', zh: '原图与摄影者' },
  'photo.changes': { th: 'ย่อขนาดเป็น WebP · แสดงบางส่วนบนการ์ด', en: 'Resized to WebP · cropped in card displays', zh: '缩小并转换为 WebP · 卡片展示时局部裁切' },
  'photo.arduino': { th: 'Arduino / มองใกล้ ๆ', en: 'Arduino / up close', zh: 'Arduino / 近距离观察' },
  'photo.arduinoAlt': { th: 'ภาพถ่ายบอร์ด Arduino Uno บนพื้นสีขาว เห็นชิป ขาต่อ และพอร์ต USB', en: 'Photograph of an Arduino Uno on white, showing its chip, headers and USB port', zh: '白色背景上的 Arduino Uno 实拍，可见芯片、排针和 USB 接口' },
  'photo.arduinoCaption': { th: 'บอร์ด Arduino Uno รุ่นก่อน UNO R4 เห็นลายวงจร จุดบัดกรี และตัวอักษรบนบอร์ดชัด ๆ', en: 'An earlier Arduino Uno, predating the UNO R4. PCB traces, solder joints and silkscreen lettering up close.', zh: '早于 UNO R4 的 Arduino Uno，清楚展示走线、焊点及丝印。' },
  'photo.breadboard': { th: 'เริ่มจากบอร์ดกับเบรดบอร์ด', en: 'A board and a breadboard', zh: '从开发板与面包板开始' },
  'photo.breadboardAlt': { th: 'ภาพถ่าย Arduino และเบรดบอร์ดติดบนฐานใส วางอยู่บนโต๊ะทำงาน', en: 'Photograph of an Arduino and breadboard mounted on a clear plate on a workbench', zh: '工作台上安装在透明底板上的 Arduino 与面包板实拍' },
  'photo.breadboardCaption': { th: 'ชุด Arduino และเบรดบอร์ดบนฐานเดียวกัน อุปกรณ์เรียบง่ายที่ใช้เริ่มทดลองวงจรได้', en: 'An Arduino and breadboard on a shared base: simple hardware for beginning circuit experiments.', zh: '安装在同一底板上的 Arduino 和面包板，是开始电路实验的简单工具。' },
  'photo.robot': { th: 'หุ่นยนต์เคลื่อนที่ / KUKA youBot', en: 'Mobile robotics / KUKA youBot', zh: '移动机器人 / KUKA youBot' },
  'photo.robotAlt': { th: 'ภาพถ่ายหุ่นยนต์ KUKA youBot พร้อมแขนกลและล้อแมคคานัมใน RoboCup 2016', en: 'Photograph of a KUKA youBot with a robotic arm and mecanum wheels at RoboCup 2016', zh: 'RoboCup 2016 中配备机械臂与麦克纳姆轮的 KUKA youBot 实拍' },
  'photo.robotCaption': { th: 'KUKA youBot ในงาน RoboCup 2016 ที่ Leipzig ใช้เป็นภาพอ้างอิงหุ่นยนต์เคลื่อนที่ ไม่ใช่หุ่นยนต์ JINPAO ของผม', en: 'A KUKA youBot at RoboCup 2016 in Leipzig. A mobile-robot reference, not my JINPAO robot.', zh: '莱比锡 RoboCup 2016 中的 KUKA youBot，作为移动机器人参考，并非我的 JINPAO 机器人。' },
  'photo.plc': { th: 'เบื้องหลังระบบควบคุม', en: 'Inside a control cabinet', zh: '控制柜的内部' },
  'photo.plcAlt': { th: 'ภาพถ่ายภายในตู้ PLC ควบคุมเครื่องอัดอากาศ เห็นอุปกรณ์และรางเดินสาย', en: 'Photograph inside a PLC cabinet for a centrifugal compressor, showing devices and cable ducts', zh: '离心压缩机 PLC 控制柜内部实拍，展示设备与线槽' },
  'photo.plcCaption': { th: 'ตู้ PLC สำหรับเครื่องอัดอากาศแบบแรงเหวี่ยง เห็นการจัดวางอุปกรณ์และการเดินสายในงานอุตสาหกรรม', en: 'A PLC cabinet for a centrifugal compressor, showing industrial device layout and wiring.', zh: '离心压缩机的 PLC 控制柜，展示工业设备布局与布线。' },
  'photo.esp32': { th: 'ESP32 / จากโค้ดสู่ขาพิน', en: 'ESP32 / code meets pins', zh: 'ESP32 / 代码与引脚相遇' },
  'photo.esp32Alt': { th: 'ภาพถ่ายบอร์ด ESP32 พร้อมโมดูลโลหะ ขาพิน และพอร์ต USB บนพื้นสีอ่อน', en: 'Photograph of an ESP32 development board with metal module, pin headers and USB port on a light surface', zh: '浅色背景上的 ESP32 开发板实拍，可见金属模块、排针与 USB 接口' },
  'photo.esp32Caption': { th: 'บอร์ดพัฒนา ESP-WROOM-32 ถ่ายโดย Ubahnverleih รายละเอียดเล็ก ๆ ของบอร์ดที่เชื่อมโค้ดกับโลกจริง', en: 'An ESP-WROOM-32 development board photographed by Ubahnverleih: small details where code connects to the physical world.', zh: 'Ubahnverleih 拍摄的 ESP-WROOM-32 开发板，呈现代码连接现实世界的细节。' },
  'photo.experiment': { th: 'ต่อวงจร แล้วลองให้มันทำงาน', en: 'Wire it up. See it work.', zh: '接好电路，观察运行' },
  'photo.experimentAlt': { th: 'ภาพถ่าย ESP32 ต่อกับจอ OLED บนเบรดบอร์ดพร้อมเครื่องวัดไฟ USB จอแสดงผลกำลังทำงาน', en: 'Photograph of a working ESP32 and OLED breadboard circuit with a USB power meter', zh: '运行中的 ESP32 与 OLED 面包板电路实拍，配有 USB 功率计' },
  'photo.experimentCaption': { th: 'ESP32 ต่อกับจอ SH1106 OLED และเครื่องวัดไฟ USB เป็นภาพอ้างอิงการทดลองวงจรจาก King of Pwnt', en: 'An ESP32 connected to an SH1106 OLED and USB power meter: a circuit experiment photographed by King of Pwnt.', zh: 'ESP32 连接 SH1106 OLED 与 USB 功率计，由 King of Pwnt 拍摄的电路实验。' },
  "Language": {
    "th": "ภาษา",
    "en": "Language",
    "zh": "语言"
  },
  "Home": {
    "th": "หน้าแรก",
    "en": "Home",
    "zh": "首页"
  },
  "Workbench": {
    "th": "โต๊ะทดลอง",
    "en": "Workbench",
    "zh": "工作台"
  },
  "Projects": {
    "th": "ผลงาน",
    "en": "Projects",
    "zh": "作品"
  },
  "About": {
    "th": "เกี่ยวกับผม",
    "en": "About",
    "zh": "关于我"
  },
  "Tech stack": {
    "th": "เครื่องมือ",
    "en": "Tech stack",
    "zh": "技术栈"
  },
  "Let’s talk": {
    "th": "ทักทายกัน",
    "en": "Let’s talk",
    "zh": "聊一聊"
  },
  "Hi, I’m": {
    "th": "สวัสดีครับ ผม",
    "en": "Hi, I’m",
    "zh": "你好，我是"
  },
  "MECHATRONICS / ROBOTICS / AUTOMATION": {
    "th": "เมคคาทรอนิกส์ / หุ่นยนต์ / ระบบอัตโนมัติ",
    "en": "MECHATRONICS / ROBOTICS / AUTOMATION",
    "zh": "机电一体化 / 机器人 / 自动化"
  },
  "ผมทำหุ่นยนต์และระบบอัตโนมัติ ตั้งแต่ออกแบบกลไก": {
    "th": "ผมทำหุ่นยนต์และระบบอัตโนมัติ ตั้งแต่ออกแบบกลไก",
    "en": "I build robots and automation systems, from mechanisms",
    "zh": "我制作机器人与自动化系统，从机械设计、"
  },
  "ต่อวงจร ไปจนถึงเขียนโค้ดให้มันทำงานจริง": {
    "th": "ต่อวงจร ไปจนถึงเขียนโค้ดให้มันทำงานจริง",
    "en": "and circuits to the code that makes them work.",
    "zh": "电路连接到让它们真正运行的程序。"
  },
  "ที่นี่รวมงานแข่งขัน งานทดลอง และสิ่งที่ผมได้เรียนรู้": {
    "th": "ที่นี่รวมงานแข่งขัน งานทดลอง และสิ่งที่ผมได้เรียนรู้",
    "en": "Here are my competition projects, experiments and lessons.",
    "zh": "这里记录了我的竞赛作品、实验与收获。"
  },
  "รางวัลชนะเลิศหุ่นยนต์ระดับชาติ": {
    "th": "รางวัลชนะเลิศหุ่นยนต์ระดับชาติ",
    "en": "National robotics champion",
    "zh": "全国机器人竞赛冠军"
  },
  "NATIONAL ROBOTICS CHAMPION": {
    "th": "จากการลงมือทำและทดสอบจริง",
    "en": "NATIONAL ROBOTICS CHAMPION",
    "zh": "源自亲手制作与反复测试"
  },
  "ดูโปรเจกต์": {
    "th": "ดูโปรเจกต์",
    "en": "Explore projects",
    "zh": "浏览作品"
  },
  "ลองรื้อบอร์ดดู": {
    "th": "ลองรื้อบอร์ดดู",
    "en": "Take the board apart",
    "zh": "拆开电路板"
  },
  "built, tested, and still learning.": {
    "th": "ลงมือทำ ทดสอบ แล้วเรียนรู้ต่อ",
    "en": "built, tested, and still learning.",
    "zh": "制作、测试，继续学习。"
  },
  "ON THE DESK / EXPERIMENT 001": {
    "th": "บนโต๊ะทดลอง / การทดลอง 001",
    "en": "ON THE DESK / EXPERIMENT 001",
    "zh": "工作台 / 实验 001"
  },
  "NOT TO SCALE.": {
    "th": "ภาพจำลองเพื่อการสำรวจ",
    "en": "NOT TO SCALE.",
    "zh": "示意模型，非实际比例。"
  },
  "JUST HERE TO TINKER.": {
    "th": "ลองขยับเมาส์ดูได้เลย",
    "en": "JUST HERE TO TINKER.",
    "zh": "移动鼠标，探索一下。"
  },
  "VIRTUAL WORKBENCH": {
    "th": "โต๊ะทดลองเสมือน",
    "en": "VIRTUAL WORKBENCH",
    "zh": "虚拟工作台"
  },
  "LIVE LIGHT": {
    "th": "แสงตามเวลา",
    "en": "LIVE LIGHT",
    "zh": "实时光色"
  },
  "MIDNIGHT": {
    "th": "โหมดมืด",
    "en": "MIDNIGHT",
    "zh": "深色模式"
  },
  "PASTEL CREAM": {
    "th": "ครีมพาสเทล",
    "en": "PASTEL CREAM",
    "zh": "奶油浅色"
  },
  "SCROLL TO TAKE A LOOK": {
    "th": "เลื่อนลงไปลองดู",
    "en": "SCROLL TO TAKE A LOOK",
    "zh": "向下滚动，开始探索"
  },
  "01 / PROJECT NOTEBOOK": {
    "th": "01 / บันทึกผลงาน",
    "en": "01 / PROJECT NOTEBOOK",
    "zh": "01 / 作品笔记"
  },
  "Some things": {
    "th": "สิ่งที่ผมทำ",
    "en": "Some things",
    "zh": "我的一些作品"
  },
  "on my workbench.": {
    "th": "บนโต๊ะทดลอง",
    "en": "on my workbench.",
    "zh": "都从工作台开始。"
  },
  "งานแข่งขัน ระบบควบคุม และการทดลอง": {
    "th": "งานแข่งขัน ระบบควบคุม และการทดลอง",
    "en": "Competitions, control systems and experiments.",
    "zh": "竞赛、控制系统与实验。"
  },
  "แต่ละชิ้นมีโจทย์และสิ่งที่ได้เรียนรู้ต่างกัน": {
    "th": "แต่ละชิ้นมีโจทย์และสิ่งที่ได้เรียนรู้ต่างกัน",
    "en": "Every build comes with a different lesson.",
    "zh": "每件作品都有不同的挑战与收获。"
  },
  "All projects": {
    "th": "ทั้งหมด",
    "en": "All projects",
    "zh": "全部作品"
  },
  "Robotics": {
    "th": "หุ่นยนต์",
    "en": "Robotics",
    "zh": "机器人"
  },
  "Automation & PLC": {
    "th": "ระบบอัตโนมัติและ PLC",
    "en": "Automation & PLC",
    "zh": "自动化与 PLC"
  },
  "Embedded & IoT": {
    "th": "ระบบฝังตัวและ IoT",
    "en": "Embedded & IoT",
    "zh": "嵌入式与物联网"
  },
  "Learning & R&D": {
    "th": "การเรียนรู้และวิจัย",
    "en": "Learning & R&D",
    "zh": "学习与研发"
  },
  "PROJECTS & PRACTICE": {
    "th": "ผลงานและการฝึกฝน",
    "en": "PROJECTS & PRACTICE",
    "zh": "作品与实践"
  },
  "Show selected projects": {
    "th": "แสดงผลงานที่เลือก",
    "en": "Show selected projects",
    "zh": "显示精选作品"
  },
  "View all 6 projects": {
    "th": "ดูผลงานทั้ง 6 ชิ้น",
    "en": "View all 6 projects",
    "zh": "查看全部 6 件作品"
  },
  "02 / A BIT ABOUT ME": {
    "th": "02 / เรื่องของผม",
    "en": "02 / A BIT ABOUT ME",
    "zh": "02 / 关于我"
  },
  "Hello again.": {
    "th": "ยินดีที่ได้รู้จัก",
    "en": "Hello again.",
    "zh": "很高兴认识你。"
  },
  "ผมธีร์ธวัชครับ": {
    "th": "ผมธีร์ธวัชครับ",
    "en": "I’m Theetawatch.",
    "zh": "我是 Theetawatch。"
  },
  "Hardware, software & the bits between.": {
    "th": "ฮาร์ดแวร์ ซอฟต์แวร์ และสิ่งที่เชื่อมถึงกัน",
    "en": "Hardware, software & the bits between.",
    "zh": "硬件、软件，以及连接它们的一切。"
  },
  "Initializing…": {
    "th": "กำลังเริ่มระบบ…",
    "en": "Initializing…",
    "zh": "正在初始化…"
  },
  "Run initialization sequence": {
    "th": "ทดลองเริ่มระบบ",
    "en": "Run initialization sequence",
    "zh": "运行初始化程序"
  },
  "Serial port opened at 115200 baud": {
    "th": "เปิดพอร์ตสื่อสารที่ 115200 baud",
    "en": "Serial port opened at 115200 baud",
    "zh": "串口已打开，波特率 115200"
  },
  "Controller ready / I/O checked": {
    "th": "คอนโทรลเลอร์พร้อม / ตรวจสอบ I/O แล้ว",
    "en": "Controller ready / I/O checked",
    "zh": "控制器就绪 / I/O 检查完成"
  },
  "Sensor input received / output enabled": {
    "th": "รับค่าเซนเซอร์ / เปิดเอาต์พุตแล้ว",
    "en": "Sensor input received / output enabled",
    "zh": "已接收传感器输入 / 输出已启用"
  },
  "Demo complete. Back to the workbench.": {
    "th": "ทดลองเสร็จแล้ว กลับไปลงมือทำกันต่อ",
    "en": "Demo complete. Back to the workbench.",
    "zh": "演示完成，回到工作台。"
  },
  "03 / TOOLS & INTERESTS": {
    "th": "03 / เครื่องมือและความสนใจ",
    "en": "03 / TOOLS & INTERESTS",
    "zh": "03 / 工具与兴趣"
  },
  "Code, components,": {
    "th": "โค้ด ชิ้นส่วน",
    "en": "Code, components,",
    "zh": "代码、元件，"
  },
  "and a few tools.": {
    "th": "และเครื่องมือที่ใช้",
    "en": "and a few tools.",
    "zh": "还有常用工具。"
  },
  "ฝั่งฮาร์ดแวร์ ซอฟต์แวร์ และสิ่งที่เชื่อมทั้งสองเข้าด้วยกัน": {
    "th": "ฝั่งฮาร์ดแวร์ ซอฟต์แวร์ และสิ่งที่เชื่อมทั้งสองเข้าด้วยกัน",
    "en": "Hardware, software and the connections between them.",
    "zh": "硬件、软件，以及两者的结合。"
  },
  "เลือกใช้ให้เหมาะกับงานแต่ละชิ้น": {
    "th": "เลือกใช้ให้เหมาะกับงานแต่ละชิ้น",
    "en": "Choosing the right tools for each build.",
    "zh": "为每项任务选择合适的工具。"
  },
  "Robotics & automation": {
    "th": "หุ่นยนต์และระบบอัตโนมัติ",
    "en": "Robotics & automation",
    "zh": "机器人与自动化"
  },
  "Embedded & electronics": {
    "th": "ระบบฝังตัวและอิเล็กทรอนิกส์",
    "en": "Embedded & electronics",
    "zh": "嵌入式与电子技术"
  },
  "Design & simulation": {
    "th": "ออกแบบและจำลอง",
    "en": "Design & simulation",
    "zh": "设计与仿真"
  },
  "Programming & analysis": {
    "th": "เขียนโปรแกรมและวิเคราะห์",
    "en": "Programming & analysis",
    "zh": "编程与分析"
  },
  "เขียนโปรแกรมควบคุม ออกแบบกลไก และทดสอบระบบอัตโนมัติ": {
    "th": "เขียนโปรแกรมควบคุม ออกแบบกลไก และทดสอบระบบอัตโนมัติ",
    "en": "Control programming, mechanism design and automation testing.",
    "zh": "控制程序编写、机构设计与自动化测试。"
  },
  "ลงมือประกอบวงจรและเชื่อมไมโครคอนโทรลเลอร์กับอุปกรณ์": {
    "th": "ลงมือประกอบวงจรและเชื่อมไมโครคอนโทรลเลอร์กับอุปกรณ์",
    "en": "Assembling circuits and connecting microcontrollers to devices.",
    "zh": "组装电路，将微控制器与设备连接。"
  },
  "ออกแบบชิ้นส่วนและตรวจสอบการทำงานก่อนประกอบจริง": {
    "th": "ออกแบบชิ้นส่วนและตรวจสอบการทำงานก่อนประกอบจริง",
    "en": "Designing parts and checking behavior before assembly.",
    "zh": "设计零件，在实际组装前验证运行情况。"
  },
  "เขียนโค้ดควบคุมฮาร์ดแวร์ ใช้ Gemini และ Claude ช่วยวิเคราะห์โค้ด แล้วตรวจสอบกับระบบจริง": {
    "th": "เขียนโค้ดควบคุมฮาร์ดแวร์ ใช้ Gemini และ Claude ช่วยวิเคราะห์โค้ด แล้วตรวจสอบกับระบบจริง",
    "en": "Writing hardware code, using Gemini and Claude for analysis, then checking it on the real system.",
    "zh": "编写硬件控制代码，借助 Gemini 和 Claude 分析，并在实际系统中验证。"
  },
  "04 / BEYOND THE WORKBENCH": {
    "th": "04 / นอกห้องทดลอง",
    "en": "04 / BEYOND THE WORKBENCH",
    "zh": "04 / 工作台之外"
  },
  "ทำเอง แล้วส่งต่อ": {
    "th": "ทำเอง แล้วส่งต่อ",
    "en": "Build it. Share it.",
    "zh": "亲手制作，分享经验。"
  },
  "ให้คนอื่นลองทำด้วย": {
    "th": "ให้คนอื่นลองทำด้วย",
    "en": "Let others try it too.",
    "zh": "让更多人动手尝试。"
  },
  "อีกด้านของงาน คือการอธิบายสิ่งที่ทำ": {
    "th": "อีกด้านของงาน คือการอธิบายสิ่งที่ทำ",
    "en": "Explaining what I make is part of the work.",
    "zh": "把所做的事情讲清楚，也是工作的一部分。"
  },
  "และมีส่วนร่วมกับคนรอบตัว": {
    "th": "และมีส่วนร่วมกับคนรอบตัว",
    "en": "And being involved with the people around me.",
    "zh": "也与身边的人共同参与。"
  },
  "สนใจโอกาสด้านเมคคาทรอนิกส์ หุ่นยนต์ และระบบอัตโนมัติในพื้นที่ระยอง": {
    "th": "สนใจโอกาสด้านเมคคาทรอนิกส์ หุ่นยนต์ และระบบอัตโนมัติในพื้นที่ระยอง",
    "en": "Interested in mechatronics, robotics and automation opportunities in Rayong.",
    "zh": "关注罗勇府的机电一体化、机器人与自动化工作机会。"
  },
  "DROP ME A NOTE": {
    "th": "ฝากข้อความถึงผม",
    "en": "DROP ME A NOTE",
    "zh": "给我留言"
  },
  "มีเรื่องอยากคุย": {
    "th": "มีเรื่องอยากคุย",
    "en": "Have something in mind?",
    "zh": "有想聊的事情？"
  },
  "ทักมาได้ครับ": {
    "th": "ทักมาได้ครับ",
    "en": "Say hello.",
    "zh": "欢迎联系我。"
  },
  "เรื่องโปรเจกต์ โค้ด หรือบอร์ดที่กำลังลองเล่นอยู่": {
    "th": "เรื่องโปรเจกต์ โค้ด หรือบอร์ดที่กำลังลองเล่นอยู่",
    "en": "A project, some code or a board you’re experimenting with.",
    "zh": "项目、代码，或你正在尝试的电路板。"
  },
  "ฝากข้อความไว้ได้เลย": {
    "th": "ฝากข้อความไว้ได้เลย",
    "en": "Leave me a note.",
    "zh": "都可以给我留言。"
  },
  "เขียนข้อความ": {
    "th": "เขียนข้อความ",
    "en": "Write a message",
    "zh": "写下留言"
  },
  "แสงเปลี่ยนตามเวลาเครื่อง · ช่วงเช้า–เย็นโดยประมาณ": {
    "th": "แสงเปลี่ยนตามเวลาเครื่อง · ช่วงเช้า–เย็นโดยประมาณ",
    "en": "Light follows your device clock · approximate dawn and dusk",
    "zh": "光色随设备时间变化 · 日出日落时间为近似值"
  },
  "ครีมพาสเทล / PASTEL CREAM": {
    "th": "ครีมพาสเทล",
    "en": "PASTEL CREAM",
    "zh": "奶油浅色"
  },
  "โหมดมืด / MIDNIGHT": {
    "th": "โหมดมืด",
    "en": "MIDNIGHT",
    "zh": "深色模式"
  },
  "PERSONAL PORTFOLIO": {
    "th": "แฟ้มผลงานส่วนตัว",
    "en": "PERSONAL PORTFOLIO",
    "zh": "个人作品集"
  },
  "MOTION": {
    "th": "เอฟเฟกต์",
    "en": "MOTION",
    "zh": "动态效果"
  },
  "ON": {
    "th": "เปิด",
    "en": "ON",
    "zh": "开启"
  },
  "OFF": {
    "th": "ปิด",
    "en": "OFF",
    "zh": "关闭"
  },
  "Back to projects": {
    "th": "กลับไปดูผลงาน",
    "en": "Back to projects",
    "zh": "返回作品"
  },
  "บทบาท / สิ่งที่ลงมือทำ": {
    "th": "บทบาท / สิ่งที่ลงมือทำ",
    "en": "My role / what I built",
    "zh": "我的角色 / 实际工作"
  },
  "ภาพจำลองสำหรับอธิบายแนวงาน ภาพและเอกสารจากชิ้นงานจริงจะเพิ่มภายหลัง": {
    "th": "ภาพจำลองสำหรับอธิบายแนวงาน ภาพและเอกสารจากชิ้นงานจริงจะเพิ่มภายหลัง",
    "en": "An animated illustration of the work. Actual project photos and documents will be added later.",
    "zh": "用于展示工作方向的动画示意图，实际作品照片和文档将后续补充。"
  },
  "ภาพจำลองเคลื่อนไหว": {
    "th": "ภาพจำลองเคลื่อนไหว",
    "en": "ANIMATED STUDY",
    "zh": "动态示意图"
  },
  "ทักทายธีร์ธวัช": {
    "th": "ทักทายธีร์ธวัช",
    "en": "Say hello to Theetawatch",
    "zh": "联系 Theetawatch"
  },
  "มีเรื่องอยากคุยหรืออยากถาม ฝากข้อความไว้ได้ครับ": {
    "th": "มีเรื่องอยากคุยหรืออยากถาม ฝากข้อความไว้ได้ครับ",
    "en": "Have a question or an idea? Leave a message.",
    "zh": "有问题或想法？欢迎留言。"
  },
  "โหมดตัวอย่าง: ยังไม่ได้ตั้งค่าอีเมลเจ้าของพอร์ต แบบฟอร์มนี้สร้างข้อความให้คัดลอก โดยยังไม่มีการส่งข้อมูล": {
    "th": "โหมดตัวอย่าง: ยังไม่ได้ตั้งค่าอีเมลเจ้าของพอร์ต แบบฟอร์มนี้สร้างข้อความให้คัดลอก โดยยังไม่มีการส่งข้อมูล",
    "en": "Demo: an email address hasn’t been added yet. This form creates a message to copy; it doesn’t send it.",
    "zh": "演示模式：尚未设置邮箱。此表单只生成可复制的留言，不会发送信息。"
  },
  "Your name / ชื่อ": {
    "th": "ชื่อของคุณ",
    "en": "Your name",
    "zh": "你的姓名"
  },
  "Email / อีเมล": {
    "th": "อีเมล",
    "en": "Email",
    "zh": "电子邮箱"
  },
  "Your idea / ไอเดียของคุณ": {
    "th": "ข้อความหรือไอเดีย",
    "en": "Your message or idea",
    "zh": "留言或想法"
  },
  "กรุณาระบุชื่อ": {
    "th": "กรุณาระบุชื่อ",
    "en": "Please enter your name.",
    "zh": "请输入姓名。"
  },
  "กรุณาระบุอีเมล": {
    "th": "กรุณาระบุอีเมล",
    "en": "Please enter your email.",
    "zh": "请输入电子邮箱。"
  },
  "กรุณาตรวจสอบอีเมล": {
    "th": "กรุณาตรวจสอบอีเมล",
    "en": "Please check your email address.",
    "zh": "请检查邮箱格式。"
  },
  "กรุณาระบุข้อความ": {
    "th": "กรุณาระบุข้อความ",
    "en": "Please enter a message.",
    "zh": "请输入留言。"
  },
  "Create message draft": {
    "th": "สร้างร่างข้อความ",
    "en": "Create message draft",
    "zh": "生成留言草稿"
  },
  "Open email app": {
    "th": "เปิดแอปอีเมล",
    "en": "Open email app",
    "zh": "打开邮件应用"
  },
  "Copy message": {
    "th": "คัดลอกข้อความ",
    "en": "Copy message",
    "zh": "复制留言"
  },
  "Copied": {
    "th": "คัดลอกแล้ว",
    "en": "Copied",
    "zh": "已复制"
  },
  "มืด": {
    "th": "มืด",
    "en": "Dark",
    "zh": "深色"
  },
  "สว่าง": {
    "th": "สว่าง",
    "en": "Light",
    "zh": "浅色"
  },
  "ตามเวลาจริง": {
    "th": "ตามเวลาจริง",
    "en": "Live light",
    "zh": "实时光色"
  },
  "เลือกธีม": {
    "th": "เลือกธีม",
    "en": "Choose appearance",
    "zh": "选择外观"
  },
  "โหมดมืด — Midnight": {
    "th": "โหมดมืด — Midnight",
    "en": "Dark — Midnight",
    "zh": "深色 — 午夜"
  },
  "โหมดสว่าง — ครีมพาสเทล": {
    "th": "โหมดสว่าง — ครีมพาสเทล",
    "en": "Light — Pastel cream",
    "zh": "浅色 — 奶油色"
  },
  "อัตโนมัติ — แสงเปลี่ยนตามเวลาเครื่อง": {
    "th": "อัตโนมัติ — แสงเปลี่ยนตามเวลาเครื่อง",
    "en": "Auto — Light follows your clock",
    "zh": "自动 — 光色随时间变化"
  },
  "แสงกลางคืน": {
    "th": "แสงกลางคืน",
    "en": "Night",
    "zh": "夜晚"
  },
  "แสงเช้า": {
    "th": "แสงเช้า",
    "en": "Dawn",
    "zh": "清晨"
  },
  "แสงกลางวัน": {
    "th": "แสงกลางวัน",
    "en": "Daylight",
    "zh": "白天"
  },
  "แสงเย็น": {
    "th": "แสงเย็น",
    "en": "Golden hour",
    "zh": "金色时刻"
  },
  "แสงอาทิตย์ตก": {
    "th": "แสงอาทิตย์ตก",
    "en": "Sunset",
    "zh": "日落"
  },
  "แสงพลบค่ำ": {
    "th": "แสงพลบค่ำ",
    "en": "Dusk",
    "zh": "暮色"
  },
  "โหมดมืด": {
    "th": "โหมดมืด",
    "en": "Dark mode",
    "zh": "深色模式"
  },
  "ครีมพาสเทล": {
    "th": "ครีมพาสเทล",
    "en": "Pastel cream",
    "zh": "奶油浅色"
  },
  "Skip to content": {
    "th": "ข้ามไปเนื้อหา",
    "en": "Skip to content",
    "zh": "跳转到内容"
  },
  "Main navigation": {
    "th": "เมนูหลัก",
    "en": "Main navigation",
    "zh": "主导航"
  },
  "Open navigation": {
    "th": "เปิดเมนู",
    "en": "Open navigation",
    "zh": "打开菜单"
  },
  "Close navigation": {
    "th": "ปิดเมนู",
    "en": "Close navigation",
    "zh": "关闭菜单"
  },
  "Filter projects": {
    "th": "กรองผลงาน",
    "en": "Filter projects",
    "zh": "筛选作品"
  },
  "View": {
    "th": "ดูรายละเอียด",
    "en": "View",
    "zh": "查看详情"
  },
  "Close": {
    "th": "ปิด",
    "en": "Close",
    "zh": "关闭"
  },
  "Theetawatch home": {
    "th": "หน้าแรก Theetawatch",
    "en": "Theetawatch home",
    "zh": "Theetawatch 首页"
  },
  "Theetawatch back to top": {
    "th": "กลับด้านบน",
    "en": "Back to top",
    "zh": "返回顶部"
  },
  "CHAMPION": {
    "th": "ชนะเลิศ",
    "en": "CHAMPION",
    "zh": "冠军"
  },
  "COMPETITION": {
    "th": "การแข่งขัน",
    "en": "COMPETITION",
    "zh": "竞赛"
  },
  "TRAINING": {
    "th": "กำลังฝึกฝน",
    "en": "TRAINING",
    "zh": "训练中"
  },
  "PROTOTYPING": {
    "th": "ต้นแบบ",
    "en": "PROTOTYPING",
    "zh": "原型开发"
  },
  "LEARNING": {
    "th": "การเรียนรู้",
    "en": "LEARNING",
    "zh": "学习实践"
  },
  "DESIGN": {
    "th": "ออกแบบ",
    "en": "DESIGN",
    "zh": "设计"
  },
  "Robot control": {
    "th": "ควบคุมหุ่นยนต์",
    "en": "Robot control",
    "zh": "机器人控制"
  },
  "Mechanical design": {
    "th": "ออกแบบกลไก",
    "en": "Mechanical design",
    "zh": "机械设计"
  },
  "Simulation": {
    "th": "จำลองระบบ",
    "en": "Simulation",
    "zh": "仿真"
  },
  "Automation": {
    "th": "ระบบอัตโนมัติ",
    "en": "Automation",
    "zh": "自动化"
  },
  "Logic control": {
    "th": "ควบคุมลอจิก",
    "en": "Logic control",
    "zh": "逻辑控制"
  },
  "Sensors & actuators": {
    "th": "เซนเซอร์และอุปกรณ์ขับเคลื่อน",
    "en": "Sensors & actuators",
    "zh": "传感器与执行器"
  },
  "Sensors": {
    "th": "เซนเซอร์",
    "en": "Sensors",
    "zh": "传感器"
  },
  "Training kits": {
    "th": "ชุดฝึกปฏิบัติ",
    "en": "Training kits",
    "zh": "实训套件"
  },
  "Technical writing": {
    "th": "เขียนเอกสารเทคนิค",
    "en": "Technical writing",
    "zh": "技术写作"
  },
  "Sensor integration": {
    "th": "เชื่อมต่อเซนเซอร์",
    "en": "Sensor integration",
    "zh": "传感器集成"
  },
  "Motor control": {
    "th": "ควบคุมมอเตอร์",
    "en": "Motor control",
    "zh": "电机控制"
  },
  "Prototyping": {
    "th": "สร้างต้นแบบ",
    "en": "Prototyping",
    "zh": "原型制作"
  },
  "Hardware programming": {
    "th": "โปรแกรมฮาร์ดแวร์",
    "en": "Hardware programming",
    "zh": "硬件编程"
  },
  "Debugging": {
    "th": "แก้บั๊ก",
    "en": "Debugging",
    "zh": "调试"
  },
  "Technical documentation": {
    "th": "เอกสารเทคนิค",
    "en": "Technical documentation",
    "zh": "技术文档"
  },
  "TEACHING ASSISTANT": {
    "th": "ผู้ช่วยสอน",
    "en": "TEACHING ASSISTANT",
    "zh": "助教"
  },
  "RESEARCH & DOCUMENTATION": {
    "th": "วิจัยและจัดทำเอกสาร",
    "en": "RESEARCH & DOCUMENTATION",
    "zh": "研究与文档"
  },
  "VOLUNTEERING": {
    "th": "จิตอาสา",
    "en": "VOLUNTEERING",
    "zh": "志愿服务"
  },
  "ผู้ช่วยสอนระดับ ปวส.": {
    "th": "ผู้ช่วยสอนระดับ ปวส.",
    "en": "Teaching assistant · higher vocational level",
    "zh": "高等职业教育助教"
  },
  "ช่วยอธิบายเนื้อหาและการลงมือทำ แยกเรื่องที่ซับซ้อนให้เป็นขั้นตอนที่ผู้เรียนตามได้": {
    "th": "ช่วยอธิบายเนื้อหาและการลงมือทำ แยกเรื่องที่ซับซ้อนให้เป็นขั้นตอนที่ผู้เรียนตามได้",
    "en": "Helping explain theory and practice, breaking complex tasks into steps learners can follow.",
    "zh": "讲解理论与实践，将复杂任务拆解为学生可以跟上的步骤。"
  },
  "ส่งต่อสิ่งที่เรียนรู้": {
    "th": "ส่งต่อสิ่งที่เรียนรู้",
    "en": "Sharing what I learn",
    "zh": "分享学习成果"
  },
  "นำผลจากการทดลองมาทำรายงาน คู่มือ และชุดฝึก เพื่อเก็บความรู้ไว้ใช้ต่อและแบ่งปันให้ผู้อื่น": {
    "th": "นำผลจากการทดลองมาทำรายงาน คู่มือ และชุดฝึก เพื่อเก็บความรู้ไว้ใช้ต่อและแบ่งปันให้ผู้อื่น",
    "en": "Turning experiments into reports, guides and training kits to preserve and share knowledge.",
    "zh": "将实验成果整理为报告、指南与实训套件，积累并分享知识。"
  },
  "เป็นส่วนหนึ่งของวิทยาลัย": {
    "th": "เป็นส่วนหนึ่งของวิทยาลัย",
    "en": "Part of the college community",
    "zh": "参与学院社区"
  },
  "มีส่วนร่วมในกิจกรรมจิตสาธารณะภายในวิทยาลัย และทำงานร่วมกับคนอื่นนอกห้องปฏิบัติการ": {
    "th": "มีส่วนร่วมในกิจกรรมจิตสาธารณะภายในวิทยาลัย และทำงานร่วมกับคนอื่นนอกห้องปฏิบัติการ",
    "en": "Joining college volunteer activities and working with people beyond the laboratory.",
    "zh": "参与学院志愿活动，在实验室之外与他人协作。"
  },
  "หุ่นยนต์แข่งขันระดับชาติ": {
    "th": "หุ่นยนต์แข่งขันระดับชาติ",
    "en": "National competition robot",
    "zh": "全国竞赛机器人"
  },
  "National Robotics Competition": {
    "th": "National Robotics Competition",
    "en": "National Robotics Competition",
    "zh": "全国机器人竞赛"
  },
  "ออกแบบ สร้าง และควบคุมหุ่นยนต์แข่งขัน": {
    "th": "ออกแบบ สร้าง และควบคุมหุ่นยนต์แข่งขัน",
    "en": "Designed, built and programmed a competition robot.",
    "zh": "设计、制作并编写竞赛机器人的控制程序。"
  },
  "ผลการแข่งขัน: รางวัลชนะเลิศระดับชาติ": {
    "th": "ผลการแข่งขัน: รางวัลชนะเลิศระดับชาติ",
    "en": "Result: national champion",
    "zh": "成绩：全国冠军"
  },
  "งานสร้างและควบคุมหุ่นยนต์สำหรับการแข่งขันระดับชาติ ครอบคลุมการออกแบบกลไก ทดสอบ และประกอบเป็นหุ่นยนต์จริง โดยได้รับรางวัลชนะเลิศจากการแข่งขัน": {
    "th": "งานสร้างและควบคุมหุ่นยนต์สำหรับการแข่งขันระดับชาติ ครอบคลุมการออกแบบกลไก ทดสอบ และประกอบเป็นหุ่นยนต์จริง โดยได้รับรางวัลชนะเลิศจากการแข่งขัน",
    "en": "A national competition robot, from mechanism design and testing to physical assembly and control. The project won first place at national level.",
    "zh": "面向全国竞赛的机器人项目，涵盖机构设计、测试、实际组装与控制，并获得全国冠军。"
  },
  "ออกแบบชิ้นส่วนและกลไกด้วย CAD": {
    "th": "ออกแบบชิ้นส่วนและกลไกด้วย CAD",
    "en": "Designed components and mechanisms in CAD.",
    "zh": "使用 CAD 设计零件与机构。"
  },
  "ใช้ Simulation ช่วยทดสอบระบบก่อนสร้างจริง": {
    "th": "ใช้ Simulation ช่วยทดสอบระบบก่อนสร้างจริง",
    "en": "Used simulation to test the system before building.",
    "zh": "制作前通过仿真验证系统。"
  },
  "ประกอบหุ่นยนต์และพัฒนาโปรแกรมควบคุมเพื่อทำภารกิจ": {
    "th": "ประกอบหุ่นยนต์และพัฒนาโปรแกรมควบคุมเพื่อทำภารกิจ",
    "en": "Assembled the robot and programmed it for the competition tasks.",
    "zh": "组装机器人并编程完成比赛任务。"
  },
  "ได้รับรางวัลชนะเลิศหุ่นยนต์ระดับชาติ": {
    "th": "ได้รับรางวัลชนะเลิศหุ่นยนต์ระดับชาติ",
    "en": "Won a national robotics championship.",
    "zh": "获得全国机器人竞赛冠军。"
  },
  "หุ่นยนต์ขนส่งอัตโนมัติ": {
    "th": "หุ่นยนต์ขนส่งอัตโนมัติ",
    "en": "Autonomous transport robot",
    "zh": "自动运输机器人"
  },
  "JINPAO Automation Contest": {
    "th": "JINPAO Automation Contest",
    "en": "JINPAO Automation Contest",
    "zh": "JINPAO 自动化竞赛"
  },
  "พัฒนาระบบควบคุมหุ่นยนต์ขนส่ง": {
    "th": "พัฒนาระบบควบคุมหุ่นยนต์ขนส่ง",
    "en": "Developed the transport robot’s control system.",
    "zh": "开发运输机器人的控制系统。"
  },
  "โจทย์: ให้หุ่นยนต์เคลื่อนที่และขนส่งตามภารกิจ": {
    "th": "โจทย์: ให้หุ่นยนต์เคลื่อนที่และขนส่งตามภารกิจ",
    "en": "Challenge: move and transport items through assigned tasks.",
    "zh": "挑战：按任务要求移动并运输物品。"
  },
  "พัฒนาระบบควบคุมหุ่นยนต์ขนส่งอัตโนมัติสำหรับ JINPAO Automation Contest เชื่อมงานกลไกและโปรแกรมเข้าด้วยกันเพื่อให้หุ่นยนต์ทำงานตามโจทย์การขนส่ง": {
    "th": "พัฒนาระบบควบคุมหุ่นยนต์ขนส่งอัตโนมัติสำหรับ JINPAO Automation Contest เชื่อมงานกลไกและโปรแกรมเข้าด้วยกันเพื่อให้หุ่นยนต์ทำงานตามโจทย์การขนส่ง",
    "en": "Developed an autonomous transport robot control system for the JINPAO Automation Contest, connecting mechanical design and software to solve the transport tasks.",
    "zh": "为 JINPAO 自动化竞赛开发自动运输机器人的控制系统，将机械设计与软件结合，完成运输任务。"
  },
  "ออกแบบการควบคุมการเคลื่อนที่และการนำทาง": {
    "th": "ออกแบบการควบคุมการเคลื่อนที่และการนำทาง",
    "en": "Designed motion control and navigation behavior.",
    "zh": "设计运动控制与导航逻辑。"
  },
  "เชื่อมต่อโปรแกรมกับอุปกรณ์และเซนเซอร์ของหุ่นยนต์": {
    "th": "เชื่อมต่อโปรแกรมกับอุปกรณ์และเซนเซอร์ของหุ่นยนต์",
    "en": "Connected software to the robot’s devices and sensors.",
    "zh": "将程序与机器人设备和传感器连接。"
  },
  "ทดสอบและปรับระบบให้ทำงานตามภารกิจการขนส่ง": {
    "th": "ทดสอบและปรับระบบให้ทำงานตามภารกิจการขนส่ง",
    "en": "Tested and adjusted the system for transport tasks.",
    "zh": "针对运输任务进行测试与调试。"
  },
  "PLC และระบบอัตโนมัติ": {
    "th": "PLC และระบบอัตโนมัติ",
    "en": "PLC & industrial automation",
    "zh": "PLC 与工业自动化"
  },
  "WorldSkills Thailand Preparation": {
    "th": "WorldSkills Thailand Preparation",
    "en": "WorldSkills Thailand Preparation",
    "zh": "WorldSkills Thailand 备赛训练"
  },
  "ฝึกเขียนโปรแกรมและควบคุมระบบอัตโนมัติ": {
    "th": "ฝึกเขียนโปรแกรมและควบคุมระบบอัตโนมัติ",
    "en": "Practiced programming and controlling automation systems.",
    "zh": "练习自动化系统编程与控制。"
  },
  "สถานะ: ฝึกเตรียมความพร้อมสู่ WorldSkills Thailand": {
    "th": "สถานะ: ฝึกเตรียมความพร้อมสู่ WorldSkills Thailand",
    "en": "Status: training for WorldSkills Thailand.",
    "zh": "状态：为 WorldSkills Thailand 进行训练。"
  },
  "ฝึกทักษะการเขียนโปรแกรม PLC และการควบคุมระบบอัตโนมัติเพื่อเตรียมความพร้อมสู่ WorldSkills Thailand เน้นทำความเข้าใจลำดับการทำงานและตรวจสอบการตอบสนองของระบบ": {
    "th": "ฝึกทักษะการเขียนโปรแกรม PLC และการควบคุมระบบอัตโนมัติเพื่อเตรียมความพร้อมสู่ WorldSkills Thailand เน้นทำความเข้าใจลำดับการทำงานและตรวจสอบการตอบสนองของระบบ",
    "en": "Practicing PLC programming and automation control in preparation for WorldSkills Thailand, with a focus on operating sequences and system responses.",
    "zh": "为 WorldSkills Thailand 进行 PLC 编程与自动化控制训练，重点理解工作顺序并验证系统响应。"
  },
  "ฝึกเขียน Logic Control และลำดับการทำงาน": {
    "th": "ฝึกเขียน Logic Control และลำดับการทำงาน",
    "en": "Practiced logic control and operating sequences.",
    "zh": "练习逻辑控制与工作顺序设计。"
  },
  "เชื่อมโยงสัญญาณจากเซนเซอร์กับเงื่อนไขควบคุม": {
    "th": "เชื่อมโยงสัญญาณจากเซนเซอร์กับเงื่อนไขควบคุม",
    "en": "Connected sensor signals to control conditions.",
    "zh": "将传感器信号与控制条件关联。"
  },
  "ทดสอบ วิเคราะห์ และแก้ปัญหาในโปรแกรม PLC": {
    "th": "ทดสอบ วิเคราะห์ และแก้ปัญหาในโปรแกรม PLC",
    "en": "Tested, analyzed and debugged PLC programs.",
    "zh": "测试、分析并调试 PLC 程序。"
  },
  "ฝึกซ้อมและพัฒนาทักษะด้านระบบอัตโนมัติอย่างต่อเนื่อง": {
    "th": "ฝึกซ้อมและพัฒนาทักษะด้านระบบอัตโนมัติอย่างต่อเนื่อง",
    "en": "Continued practicing and developing automation skills.",
    "zh": "持续训练并提升自动化技能。"
  },
  "ต้นแบบไมโครคอนโทรลเลอร์": {
    "th": "ต้นแบบไมโครคอนโทรลเลอร์",
    "en": "Microcontroller prototypes",
    "zh": "微控制器原型"
  },
  "Arduino UNO R4 & ESP32 Prototypes": {
    "th": "Arduino UNO R4 & ESP32 Prototypes",
    "en": "Arduino UNO R4 & ESP32 Prototypes",
    "zh": "Arduino UNO R4 与 ESP32 原型"
  },
  "ประกอบวงจรและเขียนโปรแกรมควบคุม": {
    "th": "ประกอบวงจรและเขียนโปรแกรมควบคุม",
    "en": "Assembled circuits and wrote control programs.",
    "zh": "组装电路并编写控制程序。"
  },
  "เชื่อมบอร์ด เซนเซอร์ และอุปกรณ์ให้ทำงานร่วมกัน": {
    "th": "เชื่อมบอร์ด เซนเซอร์ และอุปกรณ์ให้ทำงานร่วมกัน",
    "en": "Connecting boards, sensors and devices into a working system.",
    "zh": "让开发板、传感器与设备协同工作。"
  },
  "ประกอบและเขียนโปรแกรมไมโครคอนโทรลเลอร์ เช่น Arduino UNO R4 และ ESP32 ใช้ร่วมกับเซนเซอร์ มอเตอร์ และอุปกรณ์อิเล็กทรอนิกส์ เพื่อทดลองการควบคุมในต้นแบบจริง": {
    "th": "ประกอบและเขียนโปรแกรมไมโครคอนโทรลเลอร์ เช่น Arduino UNO R4 และ ESP32 ใช้ร่วมกับเซนเซอร์ มอเตอร์ และอุปกรณ์อิเล็กทรอนิกส์ เพื่อทดลองการควบคุมในต้นแบบจริง",
    "en": "Assembling and programming microcontrollers such as Arduino UNO R4 and ESP32 with sensors, motors and electronic modules to test control ideas on physical prototypes.",
    "zh": "组装并编程 Arduino UNO R4、ESP32 等微控制器，连接传感器、电机和电子模块，在实体原型上验证控制方案。"
  },
  "ประกอบวงจรและจัดการการเชื่อมต่ออุปกรณ์": {
    "th": "ประกอบวงจรและจัดการการเชื่อมต่ออุปกรณ์",
    "en": "Built circuits and organized device connections.",
    "zh": "搭建电路并整理设备连接。"
  },
  "อ่านค่าเซนเซอร์และเขียนเงื่อนไขควบคุม": {
    "th": "อ่านค่าเซนเซอร์และเขียนเงื่อนไขควบคุม",
    "en": "Read sensor data and wrote control conditions.",
    "zh": "读取传感器数据并编写控制条件。"
  },
  "ทดสอบการทำงานร่วมกันของฮาร์ดแวร์และโปรแกรม": {
    "th": "ทดสอบการทำงานร่วมกันของฮาร์ดแวร์และโปรแกรม",
    "en": "Tested hardware and software together.",
    "zh": "联合测试硬件与软件。"
  },
  "ชุดฝึกและบันทึกการทดลอง": {
    "th": "ชุดฝึกและบันทึกการทดลอง",
    "en": "Training kits & experiment notes",
    "zh": "实训套件与实验笔记"
  },
  "Training Kits & Research Documentation": {
    "th": "Training Kits & Research Documentation",
    "en": "Training Kits & Research Documentation",
    "zh": "实训套件与研究文档"
  },
  "พัฒนาชุดฝึก จัดทำรายงาน และถ่ายทอดความรู้": {
    "th": "พัฒนาชุดฝึก จัดทำรายงาน และถ่ายทอดความรู้",
    "en": "Developed training kits, wrote reports and shared knowledge.",
    "zh": "开发实训套件、撰写报告并分享知识。"
  },
  "จากสิ่งที่ลงมือทำ สู่สิ่งที่คนอื่นลองทำต่อได้": {
    "th": "จากสิ่งที่ลงมือทำ สู่สิ่งที่คนอื่นลองทำต่อได้",
    "en": "Turning hands-on experience into something others can try.",
    "zh": "把实践经验转化为他人可以动手尝试的内容。"
  },
  "นำความรู้จากการทำงานจริงมาวิเคราะห์ จัดทำรายงานและชุดฝึกปฏิบัติการ ใช้ประกอบการเรียนรู้และถ่ายทอดขั้นตอนการทำงานให้ผู้อื่น": {
    "th": "นำความรู้จากการทำงานจริงมาวิเคราะห์ จัดทำรายงานและชุดฝึกปฏิบัติการ ใช้ประกอบการเรียนรู้และถ่ายทอดขั้นตอนการทำงานให้ผู้อื่น",
    "en": "Analyzing practical experience and turning it into reports and training kits that help others understand the process and learn by doing.",
    "zh": "分析实际工作经验，整理为报告和实训套件，帮助他人理解过程并动手学习。"
  },
  "พัฒนาชุดทดลองจากความรู้ด้านหุ่นยนต์และระบบควบคุม": {
    "th": "พัฒนาชุดทดลองจากความรู้ด้านหุ่นยนต์และระบบควบคุม",
    "en": "Developed experiments from robotics and control knowledge.",
    "zh": "基于机器人与控制知识开发实验。"
  },
  "จัดทำรายงานและเอกสารอธิบายกระบวนการ": {
    "th": "จัดทำรายงานและเอกสารอธิบายกระบวนการ",
    "en": "Wrote reports and process documentation.",
    "zh": "撰写报告与流程说明。"
  },
  "บันทึกปัญหา วิธีแก้ และสิ่งที่ได้เรียนรู้จากการทดลอง": {
    "th": "บันทึกปัญหา วิธีแก้ และสิ่งที่ได้เรียนรู้จากการทดลอง",
    "en": "Recorded problems, fixes and lessons from experiments.",
    "zh": "记录实验中的问题、解决方法与收获。"
  },
  "ออกแบบก่อนลงมือสร้าง": {
    "th": "ออกแบบก่อนลงมือสร้าง",
    "en": "Design before building",
    "zh": "先设计，再制作"
  },
  "CAD Design & System Simulation": {
    "th": "CAD Design & System Simulation",
    "en": "CAD Design & System Simulation",
    "zh": "CAD 设计与系统仿真"
  },
  "ออกแบบชิ้นส่วนและจำลองการทำงาน": {
    "th": "ออกแบบชิ้นส่วนและจำลองการทำงาน",
    "en": "Designed components and simulated system behavior.",
    "zh": "设计零件并仿真系统运行。"
  },
  "ตรวจแนวคิดและการทำงาน ก่อนประกอบชิ้นงานจริง": {
    "th": "ตรวจแนวคิดและการทำงาน ก่อนประกอบชิ้นงานจริง",
    "en": "Checking ideas and behavior before physical assembly.",
    "zh": "在实际组装前验证方案与运行情况。"
  },
  "ใช้ CAD ออกแบบชิ้นส่วนและโครงสร้าง พร้อมใช้ซอฟต์แวร์ Simulation ทดสอบแนวคิดและการทำงานของระบบก่อนสร้างจริง": {
    "th": "ใช้ CAD ออกแบบชิ้นส่วนและโครงสร้าง พร้อมใช้ซอฟต์แวร์ Simulation ทดสอบแนวคิดและการทำงานของระบบก่อนสร้างจริง",
    "en": "Using CAD to design parts and structures, and simulation software to test ideas and system behavior before making the physical build.",
    "zh": "使用 CAD 设计零件与结构，并通过仿真软件在实体制作前验证方案与系统行为。"
  },
  "ออกแบบชิ้นส่วนและโครงสร้างเชิงกล": {
    "th": "ออกแบบชิ้นส่วนและโครงสร้างเชิงกล",
    "en": "Designed mechanical components and structures.",
    "zh": "设计机械零件与结构。"
  },
  "จำลองการทำงานเพื่อศึกษาพฤติกรรมของระบบ": {
    "th": "จำลองการทำงานเพื่อศึกษาพฤติกรรมของระบบ",
    "en": "Simulated operation to study system behavior.",
    "zh": "通过运行仿真研究系统行为。"
  },
  "นำผลที่ได้กลับไปปรับแบบก่อนประกอบจริง": {
    "th": "นำผลที่ได้กลับไปปรับแบบก่อนประกอบจริง",
    "en": "Used the findings to refine the design before assembly.",
    "zh": "根据结果改进设计，再进行组装。"
  },
  "ผมธีร์ธวัชครับ ทำงานสายเมคคาทรอนิกส์และหุ่นยนต์ ชอบไล่ทำความเข้าใจตั้งแต่กลไก วงจร ไปจนถึงโค้ดควบคุม เคยลงมือทำหุ่นยนต์แข่งขัน พัฒนาระบบควบคุมหุ่นยนต์ขนส่งใน JINPAO และฝึก PLC เพื่อเตรียม WorldSkills Thailand สิ่งที่ผมสนุกคือการหาว่าทำไมระบบถึงยังไม่ทำงาน แล้วค่อย ๆ แก้จนมันทำงานได้จริง": {
    "th": "ผมธีร์ธวัชครับ ทำงานสายเมคคาทรอนิกส์และหุ่นยนต์ ชอบไล่ทำความเข้าใจตั้งแต่กลไก วงจร ไปจนถึงโค้ดควบคุม เคยลงมือทำหุ่นยนต์แข่งขัน พัฒนาระบบควบคุมหุ่นยนต์ขนส่งใน JINPAO และฝึก PLC เพื่อเตรียม WorldSkills Thailand สิ่งที่ผมสนุกคือการหาว่าทำไมระบบถึงยังไม่ทำงาน แล้วค่อย ๆ แก้จนมันทำงานได้จริง",
    "en": "I’m Theetawatch, a mechatronics and robotics maker. I like understanding the whole system: mechanisms, circuits and control code. I’ve built competition robots, developed transport robot controls for JINPAO, and practiced PLC programming to prepare for WorldSkills Thailand. I enjoy finding out why a system isn’t working, then fixing it step by step.",
    "zh": "我是 Theetawatch，一名机电一体化与机器人创客。我喜欢理解整个系统：机械、电路与控制代码。我制作过竞赛机器人，为 JINPAO 开发过运输机器人控制系统，也为 WorldSkills Thailand 练习 PLC 编程。我喜欢找出系统无法运行的原因，然后一步步解决。"
  },
  "ผมเริ่มจากศึกษาปัญหา ออกแบบและจำลองก่อนลงมือประกอบ พอทดสอบแล้วก็จดสิ่งที่เจอไว้กลับไปปรับ งานบางส่วนต่อยอดเป็นชุดฝึกและเอกสาร เพื่อให้คนอื่นลองทำต่อได้ด้วย": {
    "th": "ผมเริ่มจากศึกษาปัญหา ออกแบบและจำลองก่อนลงมือประกอบ พอทดสอบแล้วก็จดสิ่งที่เจอไว้กลับไปปรับ งานบางส่วนต่อยอดเป็นชุดฝึกและเอกสาร เพื่อให้คนอื่นลองทำต่อได้ด้วย",
    "en": "I start by studying the problem, designing and simulating before assembly. After testing, I record what I found and revise the build. Some of this work becomes training kits and documentation so others can try it too.",
    "zh": "我从研究问题开始，先设计与仿真，再动手组装。测试后记录发现并改进作品，部分成果会整理为实训套件与文档，让其他人也能动手尝试。"
  },
  "INTERMISSION / ON MY WORKBENCH": {
    "th": "แกะดูข้างใน / บนโต๊ะทดลอง",
    "en": "INTERMISSION / ON MY WORKBENCH",
    "zh": "拆开看看 / 我的工作台"
  },
  "Skip to projects": {
    "th": "ข้ามไปผลงาน",
    "en": "Skip to projects",
    "zh": "跳转至作品"
  },
  "Things make sense": {
    "th": "ค่อย ๆ เข้าใจ",
    "en": "Things make sense",
    "zh": "理解系统，"
  },
  "piece by piece.": {
    "th": "ทีละชิ้น",
    "en": "piece by piece.",
    "zh": "从每个零件开始。"
  },
  "a closer look ↘": {
    "th": "มองให้ใกล้อีกนิด ↘",
    "en": "a closer look ↘",
    "zh": "再靠近一点 ↘"
  },
  "Together": {
    "th": "ประกอบอยู่",
    "en": "Together",
    "zh": "完整装配"
  },
  "Take it apart": {
    "th": "แยกชิ้นส่วน",
    "en": "Take it apart",
    "zh": "拆解零件"
  },
  "Put it back": {
    "th": "ประกอบกลับ",
    "en": "Put it back",
    "zh": "重新组装"
  },
  "เริ่มจากบอร์ดหนึ่งตัว": {
    "th": "เริ่มจากบอร์ดหนึ่งตัว",
    "en": "Start with one board",
    "zh": "从一块电路板开始"
  },
  "ดูจากข้างนอกก็เป็นบอร์ดเล็ก ๆ ตัวหนึ่ง ลองเลื่อนลงอีกนิด แล้วดูว่าข้างในมีอะไรบ้าง": {
    "th": "ดูจากข้างนอกก็เป็นบอร์ดเล็ก ๆ ตัวหนึ่ง ลองเลื่อนลงอีกนิด แล้วดูว่าข้างในมีอะไรบ้าง",
    "en": "A small board from the outside. Scroll down, or press play, to see what’s inside.",
    "zh": "外表只是一块小板。向下滚动或点击播放，看看里面有什么。"
  },
  "ลองแยกออกมาดู": {
    "th": "ลองแยกออกมาดู",
    "en": "Every part gets its own space",
    "zh": "让每个零件独立展开"
  },
  "ขาโลหะ ชิป ตัวต้านทาน คาปาซิเตอร์ และ USB ต่างแยกออกคนละทิศ ลองเล่นอัตโนมัติหรือลากตัวเลื่อนเพื่อสำรวจทุกชิ้น": {
    "th": "ขาโลหะ ชิป ตัวต้านทาน คาปาซิเตอร์ และ USB ต่างแยกออกคนละทิศ ลองเล่นอัตโนมัติหรือลากตัวเลื่อนเพื่อสำรวจทุกชิ้น",
    "en": "Pins, chips, resistors, capacitors and USB separate in different directions. Play the sequence or scrub the timeline to inspect them.",
    "zh": "排针、芯片、电阻、电容和 USB 向不同方向展开。播放动画或拖动时间轴，逐一查看。"
  },
  "แล้วประกอบกลับ": {
    "th": "แล้วประกอบกลับ",
    "en": "Back where they belong",
    "zh": "回到各自的位置"
  },
  "พอทุกชิ้นกลับเข้าที่ วงจรก็เชื่อมต่อกันอีกครั้ง เลื่อนย้อนขึ้นไปดูซ้ำ หรือขยับเมาส์เพื่อเปลี่ยนมุมได้เลย": {
    "th": "พอทุกชิ้นกลับเข้าที่ วงจรก็เชื่อมต่อกันอีกครั้ง เลื่อนย้อนขึ้นไปดูซ้ำ หรือขยับเมาส์เพื่อเปลี่ยนมุมได้เลย",
    "en": "All the pieces return to their places. Scroll back to replay, or move your mouse to change the viewing angle.",
    "zh": "所有零件回到原位。向上滚动可重播，移动鼠标可改变观察角度。"
  },
  "01 / THE WHOLE BOARD": {
    "th": "01 / บอร์ดที่ประกอบแล้ว",
    "en": "01 / THE WHOLE BOARD",
    "zh": "01 / 完整电路板"
  },
  "02 / 100+ INDEPENDENT PARTS": {
    "th": "02 / แยกอิสระกว่า 100 ชิ้น",
    "en": "02 / 100+ INDEPENDENT PARTS",
    "zh": "02 / 100 多个独立部件"
  },
  "03 / BACK TOGETHER": {
    "th": "03 / กลับมาเป็นบอร์ดอีกครั้ง",
    "en": "03 / BACK TOGETHER",
    "zh": "03 / 重新组合"
  },
  "Board assembly stages": {
    "th": "ขั้นตอนถอดประกอบ",
    "en": "Board assembly stages",
    "zh": "拆装步骤"
  },
  "SCROLL TO TAKE IT APART. KEEP GOING TO REBUILD.": {
    "th": "เลื่อนเพื่อแยกชิ้นส่วน เลื่อนต่อเพื่อประกอบกลับ",
    "en": "SCROLL TO TAKE IT APART. KEEP GOING TO REBUILD.",
    "zh": "滚动拆解，继续滚动重新组装。"
  },
  "MOTION OFF · USE THE BUTTONS TO EXPLORE": {
    "th": "ปิดการเคลื่อนไหว · ใช้ปุ่มเลือกดูชิ้นส่วนได้",
    "en": "MOTION OFF · USE THE BUTTONS TO EXPLORE",
    "zh": "动态已关闭 · 使用按钮查看零件"
  },
  "ILLUSTRATIVE ASSEMBLY / NOT A PCB SCHEMATIC": {
    "th": "โมเดลศึกษา / ไม่ใช่แบบวงจรสำหรับผลิต",
    "en": "ILLUSTRATIVE ASSEMBLY / NOT A PCB SCHEMATIC",
    "zh": "装配示意 / 非生产电路图"
  },
  "01 RF SHIELD": {
    "th": "01 ฝาครอบ RF",
    "en": "01 RF SHIELD",
    "zh": "01 射频屏蔽罩"
  },
  "02 COMPONENTS": {
    "th": "02 อุปกรณ์อิเล็กทรอนิกส์",
    "en": "02 COMPONENTS",
    "zh": "02 电子元件"
  },
  "03 PIN HEADERS": {
    "th": "03 ขาเชื่อมต่อ",
    "en": "03 PIN HEADERS",
    "zh": "03 排针"
  },
  "04 COPPER TRACES": {
    "th": "04 ลายทองแดง",
    "en": "04 COPPER TRACES",
    "zh": "04 铜走线"
  },
  "05 PCB SUBSTRATE": {
    "th": "05 แผ่น PCB",
    "en": "05 PCB SUBSTRATE",
    "zh": "05 PCB 基板"
  },
  "Play assembly": {
    "th": "▶ เล่นถอด–ประกอบ",
    "en": "▶ Play assembly",
    "zh": "▶ 播放拆装"
  },
  "Pause demo": {
    "th": "Ⅱ หยุดชั่วคราว",
    "en": "Ⅱ Pause demo",
    "zh": "Ⅱ 暂停演示"
  },
  "Assembly timeline": {
    "th": "ไทม์ไลน์ถอดประกอบ",
    "en": "Assembly timeline",
    "zh": "拆装时间轴"
  },
  "Preparing the workbench…": {
    "th": "กำลังเตรียมโต๊ะทดลอง…",
    "en": "Preparing the workbench…",
    "zh": "正在准备工作台…"
  },
  "Vector assembly · compatible mode": {
    "th": "ภาพเวกเตอร์ · โหมดรองรับอุปกรณ์",
    "en": "Vector assembly · compatible mode",
    "zh": "矢量装配 · 兼容模式"
  },
  "Interactive ESP32 assembly": {
    "th": "โมเดลถอดประกอบ ESP32 แบบโต้ตอบ",
    "en": "Interactive ESP32 assembly",
    "zh": "交互式 ESP32 装配模型"
  },
  "3D ASSEMBLY / ESP32 STUDY": {
    "th": "โมเดล 3D / ศึกษาบอร์ด ESP32",
    "en": "3D ASSEMBLY / ESP32 STUDY",
    "zh": "3D 装配 / ESP32 研究"
  },
  "ซูมดูรายละเอียดบอร์ด": {
    "th": "ซูมดูรายละเอียดบอร์ด",
    "en": "Zoom board details",
    "zh": "放大查看电路板"
  },
  "− มุมปกติ": {
    "th": "− มุมปกติ",
    "en": "− Full view",
    "zh": "− 完整视图"
  },
  "+ ดูรายละเอียด": {
    "th": "+ ดูรายละเอียด",
    "en": "+ Detail view",
    "zh": "+ 细节视图"
  },
  "Wireframe": {
    "th": "โครงเส้น",
    "en": "Wireframe",
    "zh": "线框"
  },
  "100+ PARTS / REAL-TIME": {
    "th": "100+ ชิ้น / เรนเดอร์สด",
    "en": "100+ PARTS / REAL-TIME",
    "zh": "100+ 部件 / 实时渲染"
  },
  "กรุณาตรวจสอบรูปแบบอีเมล": {
    "th": "กรุณาตรวจสอบรูปแบบอีเมล",
    "en": "Please enter a valid email address.",
    "zh": "请输入有效的电子邮箱。"
  },
  "เล่าไอเดียของคุณสักนิด": {
    "th": "เล่าไอเดียของคุณสักนิด",
    "en": "Please tell me a little about your idea.",
    "zh": "请简单介绍你的想法。"
  },
  "What should I call you?": {
    "th": "ให้ผมเรียกคุณว่าอะไรดี",
    "en": "What should I call you?",
    "zh": "我该怎么称呼你？"
  },
  "I have an idea for…": {
    "th": "ผม/ฉันมีไอเดียเกี่ยวกับ…",
    "en": "I have an idea for…",
    "zh": "我有一个关于……的想法"
  },
  "Open email draft": {
    "th": "เปิดร่างอีเมล",
    "en": "Open email draft",
    "zh": "打开邮件草稿"
  },
  "เปิดแอปอีเมลของคุณพร้อมข้อความที่กรอก คุณตรวจสอบก่อนส่งได้": {
    "th": "เปิดแอปอีเมลของคุณพร้อมข้อความที่กรอก คุณตรวจสอบก่อนส่งได้",
    "en": "Opens your email app with this draft for you to review and send.",
    "zh": "在邮件应用中打开草稿，由你检查并发送。"
  },
  "ข้อมูลจะอยู่ในหน้าเว็บนี้เท่านั้น และหายไปเมื่อรีเฟรชหน้า": {
    "th": "ข้อมูลจะอยู่ในหน้าเว็บนี้เท่านั้น และหายไปเมื่อรีเฟรชหน้า",
    "en": "The draft stays on this page and clears when you refresh.",
    "zh": "草稿仅保留在当前页面，刷新后会清除。"
  },
  "SIGNAL LAB / INTERACTIVE DEMO": {
    "th": "ห้องทดลองสัญญาณ / ลองเล่นได้",
    "en": "SIGNAL LAB / INTERACTIVE DEMO",
    "zh": "信号实验室 / 交互演示"
  },
  "A little input.": {
    "th": "ลองป้อนสัญญาณ",
    "en": "A little input.",
    "zh": "一点输入，"
  },
  "A visible response.": {
    "th": "แล้วดูการตอบสนอง",
    "en": "A visible response.",
    "zh": "看得见的响应。"
  },
  "Change the signal. Watch the system respond. This is a simulation, not live hardware.": {
    "th": "ลองเปลี่ยนสัญญาณแล้วดูระบบตอบสนอง ส่วนนี้เป็นการจำลอง ไม่ได้เชื่อมฮาร์ดแวร์จริง",
    "en": "Change the signal. Watch the system respond. This is a simulation, not live hardware.",
    "zh": "改变信号，观察系统响应。这里是模拟演示，未连接真实硬件。"
  },
  "Motor power": {
    "th": "กำลังมอเตอร์",
    "en": "Motor power",
    "zh": "电机功率"
  },
  "Power on": {
    "th": "จ่ายไฟ",
    "en": "Power on",
    "zh": "接通电源"
  },
  "Power off": {
    "th": "ตัดไฟ",
    "en": "Power off",
    "zh": "切断电源"
  },
  "Reverse direction": {
    "th": "กลับทิศหมุน",
    "en": "Reverse direction",
    "zh": "反转方向"
  },
  "Sensor trigger": {
    "th": "ทริกเกอร์เซนเซอร์",
    "en": "Sensor trigger",
    "zh": "触发传感器"
  },
  "Sensor clear": {
    "th": "ปล่อยเซนเซอร์",
    "en": "Sensor clear",
    "zh": "清除传感器"
  },
  "Signal received": {
    "th": "รับสัญญาณแล้ว",
    "en": "Signal received",
    "zh": "已接收信号"
  },
  "Waiting for input": {
    "th": "รอรับสัญญาณ",
    "en": "Waiting for input",
    "zh": "等待输入"
  },
  "SIMULATED RPM": {
    "th": "ความเร็วจำลอง RPM",
    "en": "SIMULATED RPM",
    "zh": "模拟转速 RPM"
  },
  "INPUT → CONTROLLER → OUTPUT": {
    "th": "อินพุต → คอนโทรลเลอร์ → เอาต์พุต",
    "en": "INPUT → CONTROLLER → OUTPUT",
    "zh": "输入 → 控制器 → 输出"
  },
  "Motor speed": {
    "th": "ความเร็วรอบมอเตอร์",
    "en": "Motor speed",
    "zh": "电机转速"
  },
  "Back to top": {
    "th": "กลับด้านบน",
    "en": "Back to top",
    "zh": "返回顶部"
  },
  "TT—01 / PHYSICAL STUDY": {
    "th": "TT—01 / ศึกษาชิ้นส่วน",
    "en": "TT—01 / PHYSICAL STUDY",
    "zh": "TT—01 / 结构研究"
  },
  "DUAL-CORE · 240 MHz": {
    "th": "สองคอร์ · 240 MHz",
    "en": "DUAL-CORE · 240 MHz",
    "zh": "双核 · 240 MHz"
  },
  "· PERSONAL PORTFOLIO": {
    "th": "· แฟ้มผลงานส่วนตัว",
    "en": "· PERSONAL PORTFOLIO",
    "zh": "· 个人作品集"
  },
  "Animated development board with glowing circuits": {
    "th": "บอร์ดเคลื่อนไหวพร้อมสัญญาณวงจรเรืองแสง",
    "en": "Animated development board with glowing circuits",
    "zh": "带发光信号的动态开发板"
  },
  "ESP32 circuit board illustration": {
    "th": "ภาพจำลองวงจร ESP32",
    "en": "ESP32 circuit board illustration",
    "zh": "ESP32 电路板示意图"
  },
  "Industrial robotic arm illustration": {
    "th": "ภาพจำลองแขนกลอุตสาหกรรม",
    "en": "Industrial robotic arm illustration",
    "zh": "工业机械臂示意图"
  },
  "Embedded code terminal illustration": {
    "th": "ภาพจำลองหน้าจอโปรแกรมระบบฝังตัว",
    "en": "Embedded code terminal illustration",
    "zh": "嵌入式代码终端示意图"
  },
  "IoT monitoring dashboard illustration": {
    "th": "ภาพจำลองหน้าจอข้อมูล IoT",
    "en": "IoT monitoring dashboard illustration",
    "zh": "物联网监控面板示意图"
  },
  "Autonomous rover illustration": {
    "th": "ภาพจำลองรถหุ่นยนต์อัตโนมัติ",
    "en": "Autonomous rover illustration",
    "zh": "自主移动机器人示意图"
  },
  "Illustration of an automated logistics robot, not a photograph of the project": {
    "th": "ภาพจำลองหุ่นยนต์ขนส่งอัตโนมัติ ไม่ใช่ภาพถ่ายผลงานจริง",
    "en": "Illustration of an automated logistics robot, not a photograph of the project",
    "zh": "自动物流机器人示意图，并非实际作品照片"
  },
  "Illustration of a PLC training panel and ladder logic": {
    "th": "ภาพจำลองชุดฝึก PLC และลอจิก",
    "en": "Illustration of a PLC training panel and ladder logic",
    "zh": "PLC 实训面板与梯形逻辑示意图"
  },
  "Illustration of a mechanical CAD study": {
    "th": "ภาพจำลองการออกแบบกลไกด้วย CAD",
    "en": "Illustration of a mechanical CAD study",
    "zh": "机械 CAD 设计示意图"
  },
  "ห้องทดลองจูน PID": {
    "th": "ห้องทดลองจูน PID",
    "en": "PID Tuning Lab",
    "zh": "PID 调参实验室"
  },
  "PID Tuning Lab": {
    "th": "สื่อโต้ตอบสำหรับเรียนรู้ PID",
    "en": "Interactive PID experiments",
    "zh": "交互式 PID 实验"
  },
  "มอเตอร์ + Encoder · ลูกตุ้มกลับหัว · รถเข็นติดลูกตุ้ม": {
    "th": "มอเตอร์ + Encoder · ลูกตุ้มกลับหัว · รถเข็นติดลูกตุ้ม",
    "en": "Motor + encoder · Inverted pendulum · Cart-pole",
    "zh": "电机 + 编码器 · 倒立摆 · 小车倒立摆"
  },
  "INTERACTIVE": {
    "th": "ทดลองได้จริงบนเว็บ",
    "en": "INTERACTIVE",
    "zh": "交互实验"
  },
  "Control systems": {
    "th": "ระบบควบคุม",
    "en": "Control systems",
    "zh": "控制系统"
  },
  "View all projects": {
    "th": "ดูผลงานทั้ง {count} ชิ้น",
    "en": "View all {count} projects",
    "zh": "查看全部 {count} 件作品"
  },
  "PID response illustration": {
    "th": "ภาพประกอบกราฟการตอบสนอง PID",
    "en": "PID response illustration",
    "zh": "PID 响应示意图"
  }
};
