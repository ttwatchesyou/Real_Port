/** Real, licensed photographs. These illustrate the field, not Theetawatch's own projects.
 * Local WebP copies are resized only; licenses also apply to these copies.
 * See public/images/references/CREDITS.md for the original filenames and attribution.
 */
export type ReferencePhoto = {
  id: string; src: string; thumbnail: string; width: number; height: number;
  title: string; alt: string; caption: string;
  author: string; source: string; license: string; licenseUrl: string;
};
const photo = (id: string, width: number, height: number, title: string, alt: string, caption: string, author: string, file: string, license: string, licenseUrl: string): ReferencePhoto => ({
  id, src: `/images/references/${id}.webp`, thumbnail: `/images/references/${id}-small.webp`, width, height,
  title, alt, caption, author, source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`, license, licenseUrl,
});
export const referencePhotos = {
  arduino: photo('arduino-uno', 1400, 933, 'photo.arduino', 'photo.arduinoAlt', 'photo.arduinoCaption', 'oomlout', 'Arduino Uno 004.jpg', 'CC BY-SA 2.0', 'https://creativecommons.org/licenses/by-sa/2.0/'),
  breadboard: photo('breadboard-workbench', 1400, 837, 'photo.breadboard', 'photo.breadboardAlt', 'photo.breadboardCaption', 'TreyDanger', 'Arduino & breadboard, mounted.jpg', 'CC BY 2.0', 'https://creativecommons.org/licenses/by/2.0/'),
  robot: photo('mobile-robot', 1280, 853, 'photo.robot', 'photo.robotAlt', 'photo.robotCaption', 'ubahnverleih', 'RoboCup 2016 Leipzig - KUKA youBot.jpg', 'CC0 1.0', 'https://creativecommons.org/publicdomain/zero/1.0/'),
  plc: photo('plc-cabinet', 1280, 960, 'photo.plc', 'photo.plcAlt', 'photo.plcCaption', 'DWI', 'PLC Cabinet for centrifugal compressor.JPG', 'CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
  esp32: photo('esp32', 1280, 983, 'photo.esp32', 'photo.esp32Alt', 'photo.esp32Caption', 'Ubahnverleih', 'ESP32 Espressif ESP-WROOM-32 Dev Board.jpg', 'CC0 1.0', 'https://creativecommons.org/publicdomain/zero/1.0/'),
  experiment: photo('esp32-experiment', 1280, 548, 'photo.experiment', 'photo.experimentAlt', 'photo.experimentCaption', 'King of Pwnt', 'ESP32 SH1106 Power-Meter 01.jpg', 'CC0 1.0', 'https://creativecommons.org/publicdomain/zero/1.0/'),
};
export const photoCollection = [referencePhotos.breadboard, referencePhotos.esp32, referencePhotos.robot, referencePhotos.arduino, referencePhotos.plc, referencePhotos.experiment];
