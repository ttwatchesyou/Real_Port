'use client';
import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { buildPlantModel } from '@/lib/pid/plantGeometry';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { Config, State } from '@/lib/pid/engine';
import { clamp, deg, rad } from '@/lib/pid/engine';
import { usePIDText } from './text';
export type LivePlant={state:State;config:Config};
export default function PlantScene({live,revision,onDisturb}:{live:MutableRefObject<LivePlant>;revision:number;onDisturb?:(impulse:number)=>void}){
  const t=usePIDText();const canvas=useRef<HTMLCanvasElement>(null),host=useRef<HTMLDivElement>(null),redraw=useRef<(()=>void)|null>(null),disturbHandler=useRef(onDisturb),detailView=useRef(false);const [available,setAvailable]=useState(true),[dragging,setDragging]=useState(false),[closeUp,setCloseUp]=useState(false);
  disturbHandler.current=onDisturb;
  const plant=live.current.config.plant;
  useEffect(()=>{redraw.current?.();},[revision]);
  useEffect(()=>{
    let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({canvas:canvas.current!,antialias:true,alpha:true,powerPreference:'low-power'});}catch{setAvailable(false);return;}
    setAvailable(true);renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
    const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(32,1,.1,100);
    camera.position.set(plant==='motor'?6.5:plant==='pendulum'?3:1.7,plant==='motor'?5:3.7,plant==='motor'?10:12);camera.lookAt(0,plant==='motor'?.42:1.1,0);
    const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment(),env=pmrem.fromScene(room,.02);scene.environment=env.texture;scene.environmentIntensity=.85;room.dispose();pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xfff5e5,0x586c77,1.05));const light=new THREE.DirectionalLight(0xfff0db,3.1);light.position.set(-3.5,7,5);light.castShadow=true;light.shadow.mapSize.set(2048,2048);light.shadow.camera.left=-5.5;light.shadow.camera.right=5.5;light.shadow.camera.top=5;light.shadow.camera.bottom=-5;light.shadow.bias=-.00015;light.shadow.normalBias=.025;light.shadow.radius=3;scene.add(light);
    const fill=new THREE.DirectionalLight(0xb5d6ee,1.35);fill.position.set(5,3,4);scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffe6c7,2);rim.position.set(0,5,-5);scene.add(rim);
    const model=buildPlantModel(plant);scene.add(model.root);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity:.21}));ground.rotation.x=-Math.PI/2;ground.position.y=-.535;ground.receiveShadow=true;scene.add(ground);
    let frame=0,visible=true,disposed=false,pointerId:number|null=null,lastX=0,zoomFactor=detailView.current?1.6:1,lastDraw=0;
    const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
    const allowMotion=()=>!motionQuery.matches&&document.body.dataset.effects!=='off';
    const fitCamera=()=>{
      const top=plant==='motor'?1.85:live.current.config.length*3+.98;
      const center=plant==='motor'?.45:(top-.55)/2;
      camera.position.set(plant==='motor'?6.5:plant==='pendulum'?3:1.7,center+(plant==='motor'?4.5:2.6),plant==='motor'?10:12);camera.lookAt(0,center,0);
      camera.zoom=1;camera.updateProjectionMatrix();camera.updateMatrixWorld();
      const halfWidth=plant==='pendulum'?2.45:4.65;let extent=0;
      for(const x of [-halfWidth,halfWidth])for(const y of [-.6,top])for(const z of [-1.65,1.65]){const p=new THREE.Vector3(x,y,z).project(camera);extent=Math.max(extent,Math.abs(p.x),Math.abs(p.y));}
      camera.zoom=.9/extent*zoomFactor;camera.updateProjectionMatrix();
    };
    const draw=(now:number)=>{frame=0;if(disposed||!visible)return;const {state:s,config:c}=live.current;
      const targetZoom=detailView.current?1.6:1;
      const elapsed=Math.min(50,lastDraw?now-lastDraw:16);lastDraw=now;
      zoomFactor=allowMotion()?THREE.MathUtils.lerp(zoomFactor,targetZoom,1-Math.exp(-elapsed/85)):targetZoom;
      if(Math.abs(targetZoom-zoomFactor)<.001)zoomFactor=targetZoom;
      fitCamera();
      model.rotor.rotation.x=-s.theta;
      model.cart.position.x=plant==='cart'?s.x*3:0;
      model.arm.rotation.z=-s.theta;model.targetArm.rotation.z=plant==='pendulum'?-rad(c.target):-s.angleTarget;
      const length=c.length*3;model.rod.scale.y=length;model.targetRod.scale.y=length;model.bob.position.y=length;model.targetBob.position.y=length;if(model.guide)model.guide.scale.y=length+.22;
      model.marker.visible=plant==='cart';model.marker.position.x=c.target*3;
      model.wheels.forEach(wheel=>wheel.rotation.z=-s.x*3/.16);
      // Brightness follows actual actuator effort; failure is solid red. No invented plant movement.
      const effort=clamp(Math.abs(s.effort)/c.limit,0,1);
      model.led.color.set(s.failure?'#d16b5f':s.inner.saturated?'#d4a160':'#89d0a0');
      model.led.emissive.copy(model.led.color);model.led.emissiveIntensity=s.failure?.8:.25+effort*1.8;
      renderer.render(scene,camera);
      if(host.current){host.current.dataset.angle=deg(s.theta).toFixed(3);host.current.dataset.position=s.x.toFixed(4);host.current.dataset.renderer='ready';host.current.dataset.meshCount=String(model.meshCount);host.current.dataset.viewZoom=zoomFactor.toFixed(3);}
      if(zoomFactor!==targetZoom)requestDraw();
    };
    const requestDraw=()=>{if(!frame&&!disposed&&visible)frame=requestAnimationFrame(draw);};redraw.current=requestDraw;
    const resize=()=>{const bounds=host.current!.getBoundingClientRect();renderer.setSize(bounds.width,bounds.height,false);camera.aspect=bounds.width/bounds.height;fitCamera();requestDraw();};
    const observer=new ResizeObserver(resize);observer.observe(host.current!);const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)requestDraw();});visibility.observe(host.current!);
    const lost=(event:Event)=>{event.preventDefault();setAvailable(false);};canvas.current!.addEventListener('webglcontextlost',lost);const target=canvas.current!;resize();
    // Scale displacement so a deliberate full-hand drag is visibly stronger than the small nudge buttons.
    const move=(event:PointerEvent)=>{if(pointerId!==event.pointerId||plant==='motor')return;const width=host.current!.getBoundingClientRect().width;const impulse=clamp((event.clientX-lastX)/width*24,-2,2);lastX=event.clientX;if(Math.abs(impulse)>.002)disturbHandler.current?.(impulse);};
    const down=(event:PointerEvent)=>{if(plant==='motor'||!disturbHandler.current||(event.target instanceof Element&&event.target.closest('button')))return;pointerId=event.pointerId;lastX=event.clientX;host.current?.setPointerCapture(pointerId);setDragging(true);event.preventDefault();};
    const pointerMove=(event:PointerEvent)=>{if(pointerId===event.pointerId){event.preventDefault();move(event);}};
    const finish=(event:PointerEvent)=>{if(pointerId!==event.pointerId)return;move(event);if(host.current?.hasPointerCapture(pointerId))host.current.releasePointerCapture(pointerId);pointerId=null;setDragging(false);};
    const keys=(event:KeyboardEvent)=>{
      if(plant==='motor'||!disturbHandler.current)return;
      const cart=plant==='cart';
      const delta=event.key==='ArrowLeft'?-1:event.key==='ArrowRight'?1:0;
      if(!delta)return;
      event.preventDefault();disturbHandler.current(cart?delta*.5:delta);
    };
    const interactionHost=host.current!;interactionHost.addEventListener('pointerdown',down);interactionHost.addEventListener('pointermove',pointerMove);interactionHost.addEventListener('pointerup',finish);interactionHost.addEventListener('pointercancel',finish);interactionHost.addEventListener('keydown',keys);
    return()=>{disposed=true;redraw.current=null;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();target.removeEventListener('webglcontextlost',lost);interactionHost.removeEventListener('pointerdown',down);interactionHost.removeEventListener('pointermove',pointerMove);interactionHost.removeEventListener('pointerup',finish);interactionHost.removeEventListener('pointercancel',finish);interactionHost.removeEventListener('keydown',keys);const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>();scene.traverse(object=>{if(object instanceof THREE.Mesh||object instanceof THREE.Line){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m));}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());model.textures.forEach(texture=>texture.dispose());light.shadow.dispose();env.dispose();renderer.dispose();};
  },[plant,live]);
  const {state:s,config:c}=live.current;
  const interactive=plant!=='motor';
  return <div ref={host} className="model-scene" data-renderer={available?'loading':'fallback'} data-draggable={interactive} data-dragging={dragging} tabIndex={interactive?0:-1} role={interactive?'application':undefined} aria-label={interactive?t('dragModel'):undefined}>
    <canvas ref={canvas} aria-label={t(plant==='motor'?'motorModel':plant==='pendulum'?'pendulumModel':'cartModel')}/>
    {!available&&<div className="model-fallback"><svg viewBox="0 0 600 300" role="img" aria-label={t('modelFallback')}><line x1="30" x2="570" y1="265" y2="265" stroke="var(--muted)" strokeWidth="4"/>{plant==='motor'?<g transform={`translate(300 140) rotate(${deg(s.theta)%360})`}><circle r="80" fill="var(--surface-strong)" stroke="var(--accent)" strokeWidth="8"/>{Array.from({length:12},(_,i)=><line key={i} x1="25" y1="0" x2="73" y2="0" transform={`rotate(${i*30})`} stroke="var(--accent)" strokeWidth="4"/>)}</g>:<g transform={`translate(${300+(plant==='cart'?s.x*160:0)} 220)`}><rect x="-35" y="-5" width="70" height="35" rx="5" fill="var(--accent)"/><line x1="0" y1="0" x2="0" y2="-170" stroke="var(--warm)" strokeDasharray="5 5" transform={`rotate(${plant==='pendulum'?c.target:deg(s.angleTarget)})`}/><g transform={`rotate(${deg(s.theta)})`}><line x1="0" y1="0" x2="0" y2="-170" stroke="var(--muted)" strokeWidth="9"/><circle cy="-170" r="20" fill="var(--warm)"/></g></g>}</svg><span className="model-unavailable">{t('modelFallback')}</span></div>}
    <div className="scene-label">{plant==='motor'?'DC / OPTICAL ENCODER':plant==='pendulum'?'TORQUE / PENDULUM':'CART / INVERTED PENDULUM'}<br/>{t('physicsModel')}</div>
    {available&&<div className="scene-view-controls"><button type="button" aria-pressed={closeUp} onClick={()=>{detailView.current=!detailView.current;setCloseUp(detailView.current);redraw.current?.();}}><svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="8" cy="8" r="5"/><path d="m12 12 5 5M5 8h6M8 5v6"/></svg>{t(closeUp?'wholeRig':'inspectModel')}</button></div>}
    {interactive&&<div className="scene-drag-hint">↔ {t('dragHint')}</div>}
    <div className="scene-angle">{plant==='motor'?t('encoderCount'):t('uprightAngle')}<strong>{plant==='motor'?s.encoder.toLocaleString():`${deg(s.theta).toFixed(1)}°`}</strong>{plant==='motor'?`${c.cpr} ${t('countsRev')}`:`0° = ${t('upright')}`}</div>
    <div className="scene-legend"><span><i/>{t('actual')}</span><span><i className="target"/>{plant==='motor'?t('shaftCoupled'):t('targetGuide')}</span></div>
    <div className="scene-drive" data-limited={s.inner.saturated} data-failed={!!s.failure}><span>{t('effort')}</span><strong>{s.effort.toFixed(2)} {plant==='motor'?'V':plant==='pendulum'?'N·m':'N'}</strong><svg viewBox="0 0 100 4" width="100" height="4" aria-hidden="true"><rect width="100" height="4" rx="2" fill="var(--border)"/><rect width={clamp(Math.abs(s.effort)/c.limit,0,1)*100} height="4" rx="2" fill="currentColor"/></svg></div>
  </div>;
}
