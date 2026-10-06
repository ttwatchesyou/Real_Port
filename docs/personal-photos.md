# Personal photo import

The user supplied the shared Google Drive folder named `รูปWIL`. Its 50 JPEG files were downloaded on October 2, 2026. Original files and their source index are kept locally in `assets/photo-originals/`, which is ignored by Git and excluded from the static site's public directory.

Fourteen selected images are served locally from `public/images/my-work/` as WebP files, with 480-pixel thumbnails. Images are auto-oriented and resized without enlargement; colors and subjects are unchanged. Exported copies do not retain EXIF metadata. The previously used generated and stock assets are no longer displayed in the gallery or project details. The user-supplied concept diagram is labeled as a document rather than a photograph.

| Album filename | Local image | Visible content |
| --- | --- | --- |
| `1789359242161.jpg` | `hands-on` | Learner holding a circuit assembly in the lab |
| `1789359464723.jpg` | `robot-prototype` | Sudsakorn The Blue White robot in the lab |
| `1789359217639.jpg` | `lab-workbench` | Laptop, tools, wiring and automation equipment |
| `1789359230915.jpg` | `automation-training` | Pneumatic/mechanical automation training rig |
| `1789359257023.jpg` | `sensor-circuit` | Microcontroller, prototyping boards and circular discs |
| `1789359450890.jpg` | `coding-session` | Laptop displaying Next.js/styled-components code |
| `1789359185619.jpg` | `joystick-testing` | Controller and Ubuntu coding workstation |
| `1789359252932.jpg` | `ros-visualization` | RViz display and robotics equipment |
| `1789359187186.jpg` | `motor-drive` | Inverter training module |
| `1789359189351.jpg` | `classroom-session` | Learners with laptops in the lab |
| `1789359196362.jpg` | `robot-teach-pendant` | NACHI teach pendant |
| `1789359453231.jpg` | `robot-field-test` | Robot and laptop outdoors |
| `1789359183987.jpg` | `robot-system-design` | Concept diagram for JINPAO |
| `1789300625505.jpg` | `competition-news` | Thairath competition news clipping |

The user confirmed that the three-axis concept diagram is for the JINPAO competition and was subsequently modeled further in SolidWorks. The caption describes that sequence; it does not claim the diagram is a screenshot from SolidWorks or that the final SolidWorks files have been supplied.

Gallery captions describe visible equipment and activities without identifying people or claiming a specific role for a person pictured. The Sudsakorn robot photographs remain in the gallery, without being assigned to JINPAO or a particular competition result. The existing national-competition card uses the supplied competition news clipping. Its existing achievement claim comes from the profile supplied by the user, not facial identification or an inference about individual team members.

Photos of lab equipment illustrate the existing automation, embedded-circuit and training categories. Captions do not assert that the visible board is specifically an UNO R4 or ESP32, or that an equipment photograph was taken at WorldSkills. The diagram and news clipping are labeled as documents, separately from photographs. No Creative Commons license is claimed for user-supplied material. The news clipping's caption names Thairath as its source.

To change captions or add images, edit `src/data/personalPhotos.ts` and the `album.*` entries in `src/i18n/messages.ts`. Project detail image assignments are in `src/data/portfolio.ts`. Keep all three language variants in sync. The former Wikimedia assets and their credits are retained as unused assets.

The homepage cards now use the original animated diagrams at the owner's request. The 6 image assignments remain intact inside their corresponding project details, with a shared full-image viewer and the original captions. The 14-image main album is unchanged.
