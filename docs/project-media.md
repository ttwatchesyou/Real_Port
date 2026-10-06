# Owner-supplied project media

Updated on 2 October 2026 from the owner's [12-project folder](https://drive.google.com/drive/folders/1TwB2zE8-ITstVxE5Y4sOwv0C5fI1PXF6). The earlier revision contained only README files. This revision includes genuine JPEG photographs and MP4 recordings in the individual project folders. Folder membership establishes the project mapping. Existing 14 album images and animated project covers remain in place.

## Imported assets

- 71 supplied JPEG files; 3 pixel-identical duplicates removed, leaving **68 photographs** across all 12 detail pages.
- Images are orientation-corrected, limited to 1600 pixels on the longest edge and exported as WebP (quality 84), with 480-pixel thumbnails (quality 78). Exported images omit EXIF/GPS metadata. No generated imagery, retouching or synthetic replacement is used.
- Images and thumbnails total **10.32 MB**, compared with 199.67 MB of supplied JPEGs. A gallery initially renders at most six photographs; all remaining photographs are accessible through the viewer or “Show more photos.” Below-the-fold images are lazy-loaded and responsive sources are used.
- Eight downloaded recordings total **865.41 MB**. They are converted into **13 MP4 clips totaling 36.53 MB**, plus lightweight poster frames. Individual clips are under 5 MB and at most 30 seconds. This does not mean 36.53 MB is loaded when a page opens.
- Video output is H.264, yuv420p, 24 fps, maximum 960 pixels on the longest edge, CRF 27 with a 1200 kbps video ceiling and AAC audio at 64 kbps where source audio exists. `faststart` places MP4 metadata at the beginning for streaming; orientation is baked into the frames.
- Recordings up to 90 seconds are retained in consecutive clips of up to 30 seconds. The 130-second air-purifier recording uses three 25-second excerpts from the beginning, middle and end. Each card identifies its interval in the original recording and links to the full original.
- The additional PID recording `20260623_135110.mp4` is approximately 1.3 GB. It was deliberately not downloaded or bundled into the published site. The other PID recording is included locally; both source links are retained in the PID project's Markdown document.
- Original filenames, Drive IDs, dimensions, durations, output sizes and mappings are recorded in `src/data/workMediaManifest.ts`. Original download checksums and the file archive are under `assets/project-bundle-originals/updated-media/`, ignored by Git and outside `public/`.

| Project route | Photos | Web clips |
| --- | ---: | ---: |
| three-phase-board | 3 | 0 |
| smart-water-pump | 6 | 0 |
| smart-garage | 6 | 2 |
| reaction-game | 2 | 2 |
| iot-people-counter | 8 | 2 |
| three-wheel-omni-robot | 3 | 1 |
| ros2-web-dashboard | 4 | 0 |
| pid-motor-trainer | 2 | 1 |
| smart-air-purifier | 4 | 3 |
| infrared-hand-washer | 3 | 1 |
| bottle-filling-conveyor | 26 | 1 |
| allen-bradley-training-station | 1 | 0 |

## Playback and accessibility

`ProjectVideos` renders poster images and ordinary buttons initially. There is no video element or MP4 source until a user clicks, taps or activates a button with Enter/Space. The selected clip has native video controls, `playsInline`, reserved dimensions and `preload="none"`. Selecting another clip unmounts the previous player and cancels its fetch; closing returns focus to its play button. Playback pauses when the document becomes hidden. Load failures show retry and direct-file options. All controls, descriptions and timeline labels support Thai, English and Simplified Chinese.

No GIFs are generated: MP4 provides smaller files, native controls and sound when supplied. Posters are actual extracted frames. Clip descriptions explain the visible work but are not transcripts; no transcription or invented test result is claimed. Build photographs document appearance, not calibrated performance measurements or exact component specifications. Existing expanded theoretical notes remain labelled separately from the original README.

## Regenerating after a future import

Normal `yarn dev`, `yarn build` and `yarn start` use checked-in optimized public files and do not download or transcode anything. The optional import helper needs Python, Pillow and imageio-ffmpeg. With these installed, run:

```sh
python3 scripts/import-work-media.py assets/project-bundle-originals/updated-media
# The media captions are maintained separately in src/data/workMedia.ts.
yarn docs:work
yarn typecheck
yarn build
yarn start
# In another terminal, with Chrome available:
yarn test:media
```

`source-index.json` must contain the public folder listing and the local `project_*` directories must contain downloaded originals. The helper skips unavailable sources and deduplicates identical pixels. Delete a generated clip before regenerating it after replacing its source or changing encoder settings. Avoid placing raw originals in `public/`. Production hosting should support byte-range requests for MP4 seeking, as the local `yarn start` server does.
