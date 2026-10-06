# Real reference photographs

These are photographs of real equipment, not AI-generated images and not photographs of Theetawatch's personal projects. The site labels them as reference photographs and displays attribution and license links. The reference images do not imply endorsement by any photographer, manufacturer, or contest.

| Local file (also `-small.webp`) | Original / source | Photographer | License |
| --- | --- | --- | --- |
| `arduino-uno.webp` | [Arduino Uno 004.jpg](https://commons.wikimedia.org/wiki/File:Arduino_Uno_004.jpg) | oomlout | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) |
| `breadboard-workbench.webp` | [Arduino & breadboard, mounted.jpg](https://commons.wikimedia.org/wiki/File:Arduino_%26_breadboard,_mounted.jpg) | TreyDanger | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `mobile-robot.webp` | [RoboCup 2016 Leipzig - KUKA youBot.jpg](https://commons.wikimedia.org/wiki/File:RoboCup_2016_Leipzig_-_KUKA_youBot.jpg) | ubahnverleih | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `plc-cabinet.webp` | [PLC Cabinet for centrifugal compressor.JPG](https://commons.wikimedia.org/wiki/File:PLC_Cabinet_for_centrifugal_compressor.JPG) | DWI | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `esp32.webp` | [ESP32 Espressif ESP-WROOM-32 Dev Board.jpg](https://commons.wikimedia.org/wiki/File:ESP32_Espressif_ESP-WROOM-32_Dev_Board.jpg) | Ubahnverleih | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `esp32-experiment.webp` | [ESP32 SH1106 Power-Meter 01.jpg](https://commons.wikimedia.org/wiki/File:ESP32_SH1106_Power-Meter_01.jpg) | King of Pwnt | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |

Retrieved October 2, 2026. Copies are resized to at most 1,400 pixels wide (480 for thumbnails) and converted to WebP. The mobile robot, PLC, ESP32 and OLED experiment copies use Wikimedia's 1,280-pixel photographic previews. No generative editing, retouching or color grading was applied. Card layouts crop the display with CSS; the gallery shows the full frame. Each copy, including these format/size changes, is offered under its original license above. Share-alike licenses apply to those image copies; they do not assert a license for the entire site.

The Arduino Uno photograph depicts an earlier board, not UNO R4. The robot photograph depicts a KUKA youBot at RoboCup 2016 in Leipzig, not the author's JINPAO entry. The PLC photograph is a centrifugal-compressor cabinet, not a WorldSkills competition entry.

To add personal photos, update the project `image` in `src/data/portfolio.ts` with the local image path and an accurate alt description, and omit `reference` for a photo that actually depicts that project. Edit `src/data/referencePhotos.ts` only when changing the reference collection; keep new photographs' source and license metadata intact.
