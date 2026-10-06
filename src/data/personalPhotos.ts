/** Images supplied by the owner through the shared "รูปWIL" album.
 * Describe what is visible; project/event assignments are recorded separately.
 * These files are not stock images and carry no third-party Creative Commons claim.
 */
export type PersonalPhoto = {
  id: string; src: string; thumbnail: string; width: number; height: number;
  title: string; alt: string; caption: string; kind: 'photo' | 'document'; origin?: string;
};
const photo = (id: string, width = 960, height = 1280, kind: PersonalPhoto['kind'] = 'photo'): PersonalPhoto => ({
  id, src: `/images/my-work/${id}.webp`, thumbnail: `/images/my-work/${id}-small.webp`, width, height,
  title: `album.${id}`, alt: `album.${id}.alt`, caption: `album.${id}.caption`, kind,
});
export const personalPhotos = {
  handsOn: photo('hands-on'),
  robot: photo('robot-prototype'),
  workbench: photo('lab-workbench'),
  automation: photo('automation-training'),
  circuit: photo('sensor-circuit', 720),
  coding: photo('coding-session'),
  joystick: photo('joystick-testing'),
  visualization: photo('ros-visualization'),
  motor: photo('motor-drive'),
  classroom: photo('classroom-session'),
  pendant: photo('robot-teach-pendant'),
  fieldTest: photo('robot-field-test'),
  design: photo('robot-system-design', 1280, 853, 'document'),
  news: photo('competition-news', 1327, 628, 'document'),
};
export const photoCollection = Object.values(personalPhotos);
