# Project notebook import

Source: the owner-supplied [projects_bundle_all_12 folder](https://drive.google.com/drive/folders/1TwB2zE8-ITstVxE5Y4sOwv0C5fI1PXF6). Read and downloaded on October 2, 2026. At the initial import, each of the 12 child folders contained one README.md and no other attachments. The owner subsequently uploaded photos and videos; the updated import is described below and in `project-media.md`.

Original README files and Drive IDs are retained in `assets/project-bundle-originals/`, ignored by Git and outside the published site. `src/data/workSourceNotes.ts` preserves the exact original text. Expanded project notes are generated from `src/data/workDetails.ts` into `public/documents/work/`. Separate source copies in `public/documents/work/source/` omit unresolved `[cite: 67, 68]` export markers; these markers were not usable references. Original source files remain linked from each page.

Projects 1–11 provide only a heading. Their summaries describe that heading. At the owner's request, `src/data/workDetails.ts` adds trilingual educational explanations of purpose, working principles, proposed development steps and evaluation points. These sections are labelled as expanded concepts and proposed experiments, not verified build details or measured results. Specific hardware, algorithms, completion dates and individual responsibilities are not invented. Use `yarn docs:work` to regenerate all 12 expanded Markdown files and separate source copies. Project 12 provides an overview, equipment list and training activities for Allen-Bradley, SE-TEK and KUKA. These are presented as the owner's supplied project description, not independently verified hardware evidence.

Mitsubishi FX5U is the PLC the owner separately said they use; it is shown in their portfolio skills. The Allen-Bradley training entry is kept distinct, without replacing its documented hardware with FX5U.

## Presentation

- `/work` lists all 12 projects with translated group filters, a cross-language title/technology search, and an explicit empty-result state.
- `/work/[slug]` statically exports 12 detail pages with focus/components, source notes and local README downloads, and previous/next links.
- All 12 are linked as individual entries from the homepage, in addition to the 7 existing projects (19 total). A notebook shortcut is available above the homepage project grid.
- The new illustrations are code-built SVGs labelled as **concept illustrations**, not supplied build photographs or exact CAD representations. Motion can be paused on detail pages and respects reduced-motion settings. There are no AI-generated images in these new pages.
- The index's real workbench photograph is from the owner's earlier album. Its caption identifies it as a general workbench photograph. It is not assigned as proof of one of these 12 builds. Existing portfolio/gallery photos are preserved. All 19 homepage cards now show animated illustrations; the 6 previously photographed project covers appear inside their original project details with captions, source links and a full-image viewer.
- All 12 detail pages now contain photographs supplied in their own project folders. Eight projects also have local, click-to-load video clips. No unrelated album photographs are assigned to these entries.
- The physical ESP32/MQTT PID trainer has a link to the existing browser PID lab, explicitly described as a separate simulation. The notebook's ROS/dashboard illustrations do not claim to run ROS or control live equipment.

## Updating

Edit `src/data/workArchive.ts` to add translations and documented details, preserving all three languages. `src/components/work/WorkIllustration.tsx` contains the concept diagrams. The common page renderer and styles are in `src/components/work/`. Only put owner-approved publishable assets in `public/`; keep the private import archive outside it.

Use `yarn test:work` after starting the built site with `yarn start`. It checks all 12 direct routes and downloads, cross-language search and filtering, homepage links, previous/next navigation, themes, responsive layout, touch activation and reduced motion.

## Historical photo verification before the updated upload

The folder and every README were fetched again for the owner's request to include photos. The 12 listings still each contained one README and no attachments; all README contents matched the previously imported originals and had no embedded image syntax or image links. A question asking for the photo folder or mappings from the earlier album was sent to the owner. No unrelated image has been assigned to these builds. Optional `WorkStudy.photos` feeds the same responsive, touch/keyboard-capable `ProjectPhotos` gallery once project photographs are supplied.

`PhotoViewer` in `src/components/WorkPhotos.tsx` is shared by the main album and project galleries. When opened inside a project modal, Escape closes only the image viewer and preserves the project details underneath.

## Updated upload with real photos and videos

After the owner updated the shared folder, 68 unique genuine photographs and 13 optimized video clips were imported into `public/images/work/` and `public/videos/work/`. The old album and animated card fronts are preserved. `src/data/workMediaManifest.ts` records the per-project mapping and `src/data/workMedia.ts` provides trilingual captions. All 12 original README texts were compared again and remained identical. Expanded Markdown now includes real photo links, local clips and full original video links. Media sizes, encoder settings, deliberate exclusions and playback behavior are documented in [project-media.md](project-media.md).
