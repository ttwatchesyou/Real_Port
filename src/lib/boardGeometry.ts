import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Illustrative ESP32-class assembly. Geometry is batched by material to keep draw calls low.
export function buildBoard() {
  const root = new THREE.Group();
  const layers = Array.from({ length: 5 }, () => new THREE.Group());
  layers.forEach(layer => root.add(layer));
  const materials = {
    pcb: new THREE.MeshStandardMaterial({ color: '#142c38', roughness: .47, metalness: .2 }),
    plastic: new THREE.MeshStandardMaterial({ color: '#11181c', roughness: .49, metalness: .08 }),
    ceramic: new THREE.MeshStandardMaterial({ color: '#31352f', roughness: .7, metalness: .08 }),
    silver: new THREE.MeshStandardMaterial({ color: '#bac4c9', roughness: .27, metalness: .94 }),
    gold: new THREE.MeshStandardMaterial({ color: '#ccb576', roughness: .3, metalness: .91 }),
    solder: new THREE.MeshStandardMaterial({ color: '#929eaa', roughness: .3, metalness: .86 }),
    tan: new THREE.MeshStandardMaterial({ color: '#a5906a', roughness: .62, metalness: .05 }),
    white: new THREE.MeshStandardMaterial({ color: '#b5c2c4', roughness: .76 }),
    green: new THREE.MeshStandardMaterial({ color: '#3affb5', emissive: '#20bb76', emissiveIntensity: 2, roughness: .3 }),
    amber: new THREE.MeshStandardMaterial({ color: '#ffb64d', emissive: '#ff841f', emissiveIntensity: 1.5, roughness: .3 }),
  };
  // Fine directional roughness creates machined metal reflections without photo textures.
  const roughnessData = new Uint8Array(256 * 256 * 4);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
    const grain = 176 + ((y * 73 + 19) % 57) + ((x * 13 + y * 7) % 11);
    const index = (y * 256 + x) * 4;
    roughnessData[index] = grain; roughnessData[index + 1] = grain; roughnessData[index + 2] = grain; roughnessData[index + 3] = 255;
  }
  const machining = new THREE.DataTexture(roughnessData, 256, 256);
  machining.wrapS = machining.wrapT = THREE.RepeatWrapping;
  machining.repeat.set(2, 3); machining.needsUpdate = true;
  materials.silver.roughnessMap = machining;
  materials.silver.roughness = .37;
  type Mat = keyof typeof materials;
  type Part = { group: THREE.Group; origin: THREE.Vector3; offset: THREE.Vector3; turn: THREE.Vector3; delay: number };
  const parts: Part[] = [];
  const batches: { group: THREE.Group; data: Map<Mat, THREE.BufferGeometry[]> }[] = layers.map(group => ({ group, data: new Map() }));
  let active: number | null = null;
  const piece = (layer: number, offset: [number, number, number], twist: number, create: () => void) => {
    const group = new THREE.Group(); layers[layer].add(group);
    active = batches.length; batches.push({ group, data: new Map() });
    create(); active = null;
    parts.push({ group, origin: new THREE.Vector3(), offset: new THREE.Vector3(...offset), turn: new THREE.Vector3(twist * .35, twist, twist * .25), delay: (parts.length % 7) * .025 });
  };
  const add = (layer: number, mat: Mat, geometry: THREE.BufferGeometry, x: number, y: number, z: number) => {
    geometry.translate(x, y, z);
    const batch = batches[active ?? layer].data;
    const list = batch.get(mat) || []; list.push(geometry); batch.set(mat, list);
  };
  const box = (layer: number, mat: Mat, x: number, y: number, z: number, w: number, h: number, d: number, bevel = 0) => add(layer, mat, bevel ? new RoundedBoxGeometry(w, h, d, 2, bevel) : new THREE.BoxGeometry(w, h, d), x, y, z);
  const cylinder = (layer: number, mat: Mat, x: number, y: number, z: number, radius: number, height: number) => add(layer, mat, new THREE.CylinderGeometry(radius, radius, height, 20), x, y, z);
  const ring = (layer: number, mat: Mat, x: number, y: number, z: number, radius: number, thickness: number) => {
    const geo = new THREE.TorusGeometry(radius, thickness, 8, 24); geo.rotateX(-Math.PI / 2); add(layer, mat, geo, x, y, z);
  };

  // FR-4 substrate with actual through holes and softly bevelled edges.
  const shape = new THREE.Shape();
  const w = 5.9, d = 3.6, r = .22;
  shape.moveTo(-w + r, -d); shape.lineTo(w - r, -d); shape.quadraticCurveTo(w, -d, w, -d + r);
  shape.lineTo(w, d - r); shape.quadraticCurveTo(w, d, w - r, d);
  shape.lineTo(-w + r, d); shape.quadraticCurveTo(-w, d, -w, d - r);
  shape.lineTo(-w, -d + r); shape.quadraticCurveTo(-w, -d, -w + r, -d);
  for (const x of [-5.4, 5.4]) for (const z of [-3.1, 3.1]) {
    const hole = new THREE.Path(); hole.absarc(x, z, .18, 0, Math.PI * 2, true); shape.holes.push(hole);
    ring(0, 'gold', x, .13, z, .24, .065);
    ring(0, 'solder', x, -.01, z, .23, .05);
  }
  const substrate = new THREE.ExtrudeGeometry(shape, { depth: .12, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .02, bevelThickness: .02 });
  substrate.rotateX(-Math.PI / 2); add(0, 'pcb', substrate, 0, 0, 0);

  // High-resolution copper routing and silk-screen. Positions agree with the component layout.
  const surface = document.createElement('canvas'); surface.width = 3072; surface.height = 1874;
  const ctx = surface.getContext('2d')!;
  const sx = surface.width / 11.8, sz = surface.height / 7.2;
  const point = (x: number, z: number): [number, number] => [(x + 5.9) * sx, (z + 3.6) * sz];
  const route = (points: [number, number][], color = '#698879', width = 2) => {
    ctx.beginPath(); points.forEach(([x,z],i) => { const [px,py] = point(x,z); if(i)ctx.lineTo(px,py);else ctx.moveTo(px,py); });ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
  };
  for (let i = 0; i < 22; i++) {
    const x = -4.7 + i * .43;
    route([[x,-2.9],[x,-2.35],[x+.22,-2.13],[x+.22,-1.65],[1.2+(i%6)*.18,-.9+(i%5)*.11]], i%3===0?'#ab9862':'#547468', 2.6);
    route([[x,2.9],[x,2.4],[x-.2,2.2],[x-.2,1.8],[-1.2+(i%9)*.3,1.2]], i%4===0?'#ac9660':'#4a6e63',2.2);
    for (const z of [-2.88,2.88]) { const [px,py]=point(x,z);ctx.fillStyle='#bdad75';ctx.beginPath();ctx.arc(px,py,18,0,Math.PI*2);ctx.fill(); }
  }
  ctx.strokeStyle='#88a495';ctx.lineWidth=2;ctx.strokeRect(90,92,surface.width-180,surface.height-184);
  const print = (text:string,x:number,z:number,size=29,color='#c0cdc4') => {ctx.font=`${size}px monospace`;ctx.fillStyle=color;const [px,py]=point(x,z);ctx.fillText(text,px,py);};
  print('TT / WORKBENCH',-4.8,-3.21,36);print('ESP32  DEVELOPMENT STUDY',.4,3.32,27);print('REV.02',3.95,-3.2,28);
  print('USB / 5V',-5.1,.83,22);print('RESET',-4.28,-1.04,21);print('BOOT',-4.28,2.0,21);
  for(let i=0;i<22;i++){const x=-4.78+i*.43;print(['3V3','GND','EN','IO'][i%4]+(i>3?i:''),x,-2.38,13);print(['GND','TX','RX','IO'][i%4]+(i>3?i:''),x,2.32,13);}
  for(let i=0;i<30;i++) print((i%3?'R':'C')+(i+1),-2.6+(i%10)*.53,-1.4+Math.floor(i/10)*1.34,13,'#b0bfb5');
  const texture = new THREE.CanvasTexture(surface);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;
  const routingMaterial = new THREE.MeshStandardMaterial({ map:texture,transparent:true,alphaTest:.1,roughness:.6,metalness:.25,side:THREE.DoubleSide });
  const routing = new THREE.Mesh(new THREE.PlaneGeometry(11.8,7.2),routingMaterial);routing.rotation.x=-Math.PI/2;routing.position.y=.151;layers[1].add(routing);

  // Gold headers, black moulded housings, solder fillets and plated vias.
  for(let i=0;i<22;i++) for(const z of [-2.88,2.88]) {
    const x=-4.7+i*.43;
    piece(2, [x * .28, 1.2 + (i % 5) * .18, Math.sign(z) * 2.2], (i % 3 - 1) * .15, () => {
    box(2,'plastic',x,.3,z,.36,.28,.48,.025);
    box(2,'gold',x,.6,z,.095,.8,.095);
    box(2,'gold',x,-.22,z,.095,.52,.095);
    ring(0,'solder',x,.14,z,.105,.03);
    box(2,'plastic',x,.455,z,.18,.015,.18);
    });
  }
  for(let i=0;i<64;i++) {
    const x=-4.7+(i%16)*.59,z=-2.05+Math.floor(i/16)*1.36;
    if(x>-.5&&x<2.4&&Math.abs(z)<1.2)continue;
    ring(0,'gold',x,.146,z,.038,.014);
  }

  // USB socket has a hollow opening, insulating tongue and nine visible contacts.
  piece(3, [-3.8, 2.9, -.3], -.4, () => {
  box(3,'silver',-5.52,.43,0,.84,.12,1.1,.035);box(3,'silver',-5.52,.18,0,.84,.075,1.1);
  for(const z of [-.51,.51])box(3,'silver',-5.52,.3,z,.84,.27,.07);
  box(3,'plastic',-5.48,.285,0,.65,.09,.84);
  for(let i=0;i<9;i++)box(3,'gold',-5.69,.34,-.34+i*.085,.33,.025,.035);
  for(const z of [-.62,.62])box(3,'solder',-5.17,.17,z,.25,.12,.22);

  });

  // Tactile switches, voltage regulators, crystal, ceramic capacitors and tiny resistors.
  for(const z of [-1.55,1.45]) {
    piece(3, [-2.4, 3.7, Math.sign(z) * 2.7], Math.sign(z) * .35, () => {
    box(3,'silver',-4.02,.24,z,.64,.16,.67,.03);box(3,'plastic',-4.02,.4,z,.43,.16,.44,.05);
    cylinder(3,'plastic',-4.02,.53,z,.17,.13);
    for(const x of [-4.38,-3.67])for(const dz of [-.22,.22])box(3,'solder',x,.17,z+dz,.18,.08,.11);
    });
  }
  piece(3, [-2.6, 4.6, 0], .4, () => {
  box(3,'plastic',-2.84,.27,.1,.75,.24,1.15,.035);
  for(let i=0;i<4;i++)for(const side of [-1,1])box(3,'silver',-2.84+side*.49,.18,-.31+i*.27,.24,.065,.11);
  });
  piece(3, [-1.8, 2.6, -3.2], -.5, () => {
  box(3,'silver',-1.9,.3,-1.76,.92,.25,.4,.1);
  });
  for(let i=0;i<48;i++){
    const x=-2.05+(i%12)*.52,z=(i<24?-1.7:1.64)+(Math.floor(i/12)%2)*.42;
    const isCap=i%3===0;
    piece(3, [x * .7, 2.3 + (i % 6) * .42, Math.sign(z) * (2 + Math.floor(i / 12) * .45)], (i % 5 - 2) * .3, () => {
    box(3,isCap?'tan':'ceramic',x,.24,z,.26,.15,.14,.02);
    for(const dx of [-.14,.14])box(3,'solder',x+dx,.215,z,.085,.115,.16);
    if(!isCap)box(3,'white',x,.32,z,.06,.009,.035);
    });
  }
  for(const z of [-.7,.7]){
    piece(3, [-1.2, 4.3, Math.sign(z) * 2.7], Math.sign(z) * .5, () => {
    cylinder(3,'silver',-1.45,.36,z,.26,.46);cylinder(3,'plastic',-1.45,.598,z,.235,.028);
    box(3,'silver',-1.45,.617,z,.27,.01,.026);box(3,'silver',-1.45,.617,z,.026,.01,.27);
    });
  }
  box(3,'pcb',1.22,.2,0,3.15,.12,2.57);
  piece(3, [.5, 4.2, .4], -.35, () => {
  box(3,'plastic',.85,.37,0,1.6,.24,1.6,.045);
  for(let i=0;i<12;i++)for(const side of [-1,1]){
    box(3,'silver',.1+i*.135,.285,side*.88,.055,.08,.25);
    box(3,'silver',.85+side*.89,.285,-.74+i*.135,.25,.08,.055);
  }
  });
  // RF shield lifts independently, revealing the chip beneath it.
  box(4,'silver',1.22,.76,0,3.05,.08,2.47,.055);
  for(const z of [-1.2,1.2])box(4,'silver',1.22,.55,z,3,.4,.065);
  for(const x of [-.27,2.71])box(4,'silver',x,.55,0,.065,.4,2.47);
  for(let i=0;i<8;i++)for(const z of [-1.24,1.24])box(4,'solder',-.02+i*.35,.355,z,.12,.12,.18);
  const labelCanvas=document.createElement('canvas');labelCanvas.width=1024;labelCanvas.height=768;const label=labelCanvas.getContext('2d')!;
  label.fillStyle='#26313a';label.font='58px monospace';label.fillText('ESP32',110,225);label.font='26px monospace';label.fillText('DUAL CORE / Wi-Fi + BT',110,305);label.font='23px monospace';label.fillText('THEETAWATCH',110,455);label.fillText('ENGINEERING STUDY  02',110,501);
  for(let i=0;i<34;i++){label.fillRect(110+i*10,550,3+(i%3),65);}
  const labelTexture=new THREE.CanvasTexture(labelCanvas);labelTexture.colorSpace=THREE.SRGBColorSpace;
  const labelMat=new THREE.MeshStandardMaterial({map:labelTexture,transparent:true,roughness:.48,metalness:.55,depthWrite:false});
  const labelMesh=new THREE.Mesh(new THREE.PlaneGeometry(2.9,2.25),labelMat);labelMesh.rotation.x=-Math.PI/2;labelMesh.position.set(1.22,.806,0);layers[4].add(labelMesh);
  // PCB antenna and test pads at the far end.
  for(let i=0;i<5;i++){
    box(3,'gold',3.4+i*.32,.172,-.72+(i%2)*.25,.1,.022,1.65-(i%2)*.5);
    box(3,'gold',3.56+i*.32,.172,(i%2?-.65:.9),.4,.022,.095);
  }
  for(let i=0;i<5;i++)cylinder(3,'gold',3.2+i*.42,.17,1.48,.12,.02);
  for(const [x,z,mat] of [[-3.08,-1.65,'green'],[-3.08,1.77,'amber']] as const){box(3,'solder',x,.17,z,.4,.08,.21);box(3,mat,x,.24,z,.2,.13,.17,.025);}

  for (const batch of batches) for (const [mat, geometries] of batch.data) {
    const flat = geometries.map(geo => geo.index ? geo.toNonIndexed() : geo);
    const merged = mergeGeometries(flat, false)!;
    const mesh = new THREE.Mesh(merged, materials[mat]); mesh.castShadow = true; mesh.receiveShadow = true; batch.group.add(mesh);
    new Set([...geometries, ...flat]).forEach(geometry => geometry.dispose());
  }
  // Center each independent assembly, so it spins around itself rather than the board origin.
  parts.forEach(part => {
    const center = new THREE.Box3().setFromObject(part.group).getCenter(new THREE.Vector3());
    part.group.children.forEach(object => { if (object instanceof THREE.Mesh) object.geometry.translate(-center.x, -center.y, -center.z); });
    part.group.position.copy(center); part.origin.copy(center);
  });
  return { root, layers, parts, led: materials.green };
}
