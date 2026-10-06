'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Board } from './Visuals';
import { useLocale } from './LocaleProvider';
import { buildBoard } from '@/lib/boardGeometry';

export type BoardModelHandle = { setProgress: (progress: number) => void };
const ModelFrame = styled.div`
  position:absolute;inset:0;
  canvas{display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab;}
  canvas:active{cursor:grabbing;}
  .model-fallback{position:absolute;inset:45px 20px 35px;display:flex;flex-direction:column;gap:8px;}
  .model-fallback svg{width:100%;height:100%;min-height:0;overflow:visible;}
  .model-fallback .board-part{transition:transform .7s;transform-box:fill-box;transform-origin:center;}
  &[data-spread='true'] .model-fallback .processor{transform:translate(45px,-95px) rotate(12deg);}
  &[data-spread='true'] .model-fallback .components{transform:translate(-45px,-45px) rotate(-7deg);}
  &[data-spread='true'] .model-fallback .headers{transform:translate(45px,45px);}
  &[data-spread='true'] .model-fallback .traces{transform:translate(0,-20px);}
  .model-controls{position:absolute;left:4px;bottom:5px;display:flex;gap:6px;}
  .model-controls .model-detail-button{position:static;}
  .model-parts{position:absolute;right:5px;bottom:10px;color:var(--accent);font:8px var(--mono);}
  .model-fallback span{font-size:10px;color:var(--muted);}
  &[data-renderer='ready'] .model-fallback{display:none;}
  .model-detail-button{position:absolute;left:4px;bottom:5px;border:1px solid var(--border);background:var(--surface);color:var(--text);font-family:var(--mono);font-size:9px;padding:7px 10px;border-radius:4px;}
  .model-detail-button[aria-pressed='true']{color:var(--accent);border-color:var(--accent);}
  .model-hint{position:absolute;left:5px;top:6px;font-family:var(--mono);font-size:8px;letter-spacing:.8px;color:var(--muted);pointer-events:none;}
  @media(max-width:560px){.model-parts{font-size:6px;bottom:7px;}.model-hint{font-size:6px;}.model-detail-button{font-size:7px;padding:5px 7px;bottom:0;}}
`;
const smooth = (n: number) => { n = Math.max(0, Math.min(1, n)); return n * n * (3 - 2 * n); };
export function explosionAt(progress: number) { return progress < .43 ? smooth((progress - .12) / .31) : progress < .58 ? 1 : 1 - smooth((progress - .58) / .32); }

const BoardModel = forwardRef<BoardModelHandle, { effects: boolean }>(function BoardModel({ effects }, forwardedRef) {
  const {t} = useLocale();
  const [wire,setWire]=useState(false);
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const enabled = useRef(effects);
  const pendingProgress = useRef(0);
  const controls = useRef<{ progress: (p: number) => void; zoom: (zoom: boolean) => void; wire: (wire: boolean) => void; reset: () => void } | null>(null);
  const [status, setStatus] = useState('loading');
  const [zoom, setZoom] = useState(false);
  useImperativeHandle(forwardedRef, () => ({ setProgress(progress) { pendingProgress.current = progress; if(host.current){host.current.dataset.explosion=explosionAt(progress).toFixed(3);host.current.dataset.spread=String(explosionAt(progress)>.35);} controls.current?.progress(progress); } }), []);
  useEffect(() => { enabled.current = effects; if (!effects) controls.current?.reset(); }, [effects]);

  useEffect(() => {
    const target = canvas.current!, container = host.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: target, antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch { setStatus('unavailable'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.03;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, .035);
    scene.environment = environment.texture;
    scene.environmentIntensity = .9;
    room.dispose(); pmrem.dispose();
    const camera = new THREE.PerspectiveCamera(33, 1.4, .1, 100);
    camera.position.set(11, 13, 16); camera.lookAt(0, .7, 0); camera.zoom = 1.14;
    const ambient = new THREE.HemisphereLight(0xe8f2ff, 0x293542, .65); scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff4df, 2.7); key.position.set(-5, 12, 6); key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);key.shadow.camera.left=-10;key.shadow.camera.right=10;key.shadow.camera.top=10;key.shadow.camera.bottom=-10;key.shadow.bias=-.0005;key.shadow.normalBias=.04;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7ebee4, 1.3); rim.position.set(8, 4, -6); scene.add(rim);
    const board = buildBoard(); scene.add(board.root); board.root.rotation.y = -.22;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: .12 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -.57; ground.receiveShadow = true; scene.add(ground);
    let frame = 0, visible = true, disposed = false, lastFrame = performance.now();
    let pointerX = 0, pointerY = 0, desiredX = 0, desiredY = 0;
    let zoomed = false, targetSpread = explosionAt(pendingProgress.current), currentSpread = targetSpread;
    const guideData = new Float32Array(board.parts.length * 6);
    const guideGeometry = new THREE.BufferGeometry(); guideGeometry.setAttribute('position', new THREE.BufferAttribute(guideData, 3));
    const guideMaterial = new THREE.LineBasicMaterial({color:0x7fcce4,transparent:true,opacity:0,depthWrite:false});
    const guides = new THREE.LineSegments(guideGeometry, guideMaterial); board.root.add(guides);
    container.dataset.partCount = String(board.parts.length + 5);
    const pose = () => {
      const spread = currentSpread;
      board.layers.forEach((layer,i)=>layer.position.y=[-1.2,.35,1,1.2,6.8][i]*spread);
      board.parts.forEach((part,i)=>{
        const amount = smooth((spread-part.delay)/(1-part.delay));
        part.group.position.copy(part.origin).addScaledVector(part.offset,amount);
        part.group.rotation.set(part.turn.x*amount,part.turn.y*amount,part.turn.z*amount);
        const base = part.origin, pos = part.group.position, parentY = part.group.parent!.position.y;
        guideData.set([base.x,0,base.z,pos.x,pos.y+parentY,pos.z],i*6);
      });
      guideGeometry.attributes.position.needsUpdate=true; guides.frustumCulled=false;
      guideMaterial.opacity=.12*spread;
      board.root.position.y=-1.8*spread;
      ground.position.y=-.57-3*spread;
      camera.zoom=(zoomed?1.48:container.clientWidth<420?1.02:1.13)*(1-.35*spread);
      camera.updateProjectionMatrix();
      container.dataset.renderedSpread=spread.toFixed(3);
    };
    const draw = () => {
      frame = 0;
      if (disposed || !visible) return;
      const now=performance.now(), blend=1-Math.exp(-Math.min(100,now-lastFrame)/85);lastFrame=now;
      currentSpread = enabled.current ? currentSpread + (targetSpread-currentSpread)*blend : targetSpread;
      pose();
      pointerX += (desiredX - pointerX) * .15; pointerY += (desiredY - pointerY) * .15;
      board.root.rotation.y = -.22 + pointerX * .27;
      board.root.rotation.x = pointerY * .09;
      renderer.render(scene, camera);
      if (Math.abs(pointerX - desiredX) + Math.abs(pointerY - desiredY) > .001 || Math.abs(currentSpread-targetSpread)>.0005) frame = requestAnimationFrame(draw);
    };
    const requestDraw = () => { if (!frame && !disposed && visible) frame = requestAnimationFrame(draw); };
    const applyProgress = (progress: number) => {
      targetSpread = explosionAt(progress);
      container.dataset.explosion = targetSpread.toFixed(3);
      container.dataset.spread=String(targetSpread>.35);
      requestDraw();
    };
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.zoom = zoomed ? 1.5 : width < 420 ? 1.06 : 1.14;
      camera.updateProjectionMatrix();requestDraw();
    };
    const reset = () => { desiredX = 0; desiredY = 0; pointerX = 0; pointerY = 0; requestDraw(); };
    const pointer = (event: PointerEvent) => {
      if (!enabled.current || event.pointerType !== 'mouse') return;
      const rect = target.getBoundingClientRect();
      desiredX = (event.clientX - rect.left) / rect.width * 2 - 1;
      desiredY = (event.clientY - rect.top) / rect.height * 2 - 1;
      requestDraw();
    };
    const leave = () => { desiredX = 0; desiredY = 0; requestDraw(); };
    const lost = (event: Event) => { event.preventDefault(); setStatus('unavailable'); };
    target.addEventListener('pointermove', pointer);target.addEventListener('pointerleave', leave);target.addEventListener('pointercancel', leave);target.addEventListener('webglcontextlost', lost);
    const resizeObserver = new ResizeObserver(resize);resizeObserver.observe(container);
    const visibilityObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) requestDraw(); });visibilityObserver.observe(container);
    controls.current = { progress: applyProgress, reset, wire(value) { board.root.traverse(object=>{if(object instanceof THREE.Mesh){const list=Array.isArray(object.material)?object.material:[object.material];list.forEach(material=>{if(material instanceof THREE.MeshStandardMaterial)material.wireframe=value;});}});requestDraw(); }, zoom(value) { zoomed = value; resize(); } };
    applyProgress(pendingProgress.current);resize();setStatus('ready');
    return () => {
      disposed = true;cancelAnimationFrame(frame);controls.current = null;resizeObserver.disconnect();visibilityObserver.disconnect();
      target.removeEventListener('pointermove', pointer);target.removeEventListener('pointerleave', leave);target.removeEventListener('pointercancel', leave);target.removeEventListener('webglcontextlost', lost);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>();
      scene.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => { materials.add(material); Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); }); }); } });
      guideGeometry.dispose();guideMaterial.dispose();geometries.forEach(g => g.dispose());textures.forEach(t => t.dispose());materials.forEach(m => m.dispose());environment.dispose();renderer.dispose();
    };
  }, []);

  return <ModelFrame ref={host} className="board-model" data-renderer={status} data-explosion="0">
    <canvas ref={canvas} aria-label={t("Interactive ESP32 assembly")}/>
    <div className="model-fallback"><Board/><span>{t(status === 'loading' ? 'Preparing the workbench…' : 'Vector assembly · compatible mode')}</span></div>
    <span className="model-hint">{t("3D ASSEMBLY / ESP32 STUDY")}</span>
    {status === 'ready' && <div className="model-controls"><button className="model-detail-button" aria-label={t("ซูมดูรายละเอียดบอร์ด")} aria-pressed={zoom} onClick={() => { const next = !zoom; setZoom(next); controls.current?.zoom(next); }}>{t(zoom ? '− มุมปกติ' : '+ ดูรายละเอียด')}</button><button className="model-detail-button" aria-pressed={wire} onClick={()=>{setWire(!wire);controls.current?.wire(!wire);}}>{t('Wireframe')}</button></div>}
    <span className="model-parts">{t('100+ PARTS / REAL-TIME')}</span>
  </ModelFrame>;
});
export default BoardModel;
