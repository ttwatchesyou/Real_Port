import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { Plant } from './engine';

/** Code-built lab equipment. The dimensions are visual; the pose comes from the SI simulation. */
export function buildPlantModel(plant: Plant) {
  const root = new THREE.Group(), textures: THREE.Texture[] = [];
  const texture = (paint: (ctx: CanvasRenderingContext2D) => void, width = 512, height = 512) => {
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d')!; paint(context);
    const result = new THREE.CanvasTexture(canvas); result.colorSpace = THREE.SRGBColorSpace;
    result.anisotropy = 4; textures.push(result); return result;
  };
  // Deterministic grain avoids flickering surfaces when switching experiments.
  let seed = 17;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const grain = texture(ctx => {
    ctx.fillStyle = '#e4e5e4'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 2600; i++) {
      ctx.strokeStyle = `rgba(50,60,65,${random() * .085})`;
      const y = random() * 512; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y + random()); ctx.stroke();
    }
  }); grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  const paintGrain = texture(ctx => {
    ctx.fillStyle = '#ededed'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 15000; i++) { ctx.fillStyle = `rgba(0,0,0,${random() * .1})`; ctx.fillRect(random() * 512, random() * 512, 1, 1); }
  }); paintGrain.wrapS = paintGrain.wrapT = THREE.RepeatWrapping;
  const metal = new THREE.MeshStandardMaterial({ color: '#c1c8cd', map: grain, bumpMap: grain, bumpScale: .007, metalness: .88, roughness: .29 });
  const chrome = new THREE.MeshPhysicalMaterial({ color: '#d3d9dc', metalness: 1, roughness: .18, clearcoat: .25 });
  const dark = new THREE.MeshStandardMaterial({ color: '#29383c', map: paintGrain, roughness: .52, metalness: .45 });
  const teal = new THREE.MeshPhysicalMaterial({ color: '#437b78', map: paintGrain, roughness: .42, metalness: .42, clearcoat: .35, clearcoatRoughness: .35 });
  const copper = new THREE.MeshStandardMaterial({ color: '#b9864c', metalness: .85, roughness: .28 });
  const amber = new THREE.MeshPhysicalMaterial({ color: '#cc8956', metalness: .5, roughness: .3, clearcoat: .3 });
  const rubber = new THREE.MeshStandardMaterial({ color: '#151c1f', map: paintGrain, roughness: .91 });
  const green = new THREE.MeshStandardMaterial({ color: '#224e43', roughness: .53, metalness: .18 });
  const red = new THREE.MeshStandardMaterial({ color: '#b95649', roughness: .57 });
  const blue = new THREE.MeshStandardMaterial({ color: '#467a9b', roughness: .58 });
  const led = new THREE.MeshStandardMaterial({ color: '#89d0a0', emissive: '#62b77b', emissiveIntensity: .65, roughness: .35 });
  const ghost = new THREE.MeshBasicMaterial({ color: '#c6975e', transparent: true, opacity: .22, depthWrite: false });
  const shapes = new Map<string, THREE.BufferGeometry>();
  const shape = (key: string, create: () => THREE.BufferGeometry) => { if (!shapes.has(key)) shapes.set(key, create()); return shapes.get(key)!; };
  const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D = root, x = 0, y = 0, z = 0) => {
    const object = new THREE.Mesh(geometry, material); object.position.set(x, y, z); object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
  };
  const box = (w: number, h: number, d: number, mat: THREE.Material, parent: THREE.Object3D = root, x = 0, y = 0, z = 0) =>
    mesh(shape(`b${w},${h},${d}`, () => new RoundedBoxGeometry(w, h, d, 2, Math.min(.035, w / 6, h / 6, d / 6))), mat, parent, x, y, z);
  const cyl = (r: number, h: number, mat: THREE.Material, parent: THREE.Object3D = root, x = 0, y = 0, z = 0, axis = 'y', sides = 48) => {
    const object = mesh(shape(`c${r},${h},${sides}`, () => new THREE.CylinderGeometry(r, r, h, sides)), mat, parent, x, y, z);
    if (axis === 'x') object.rotation.z = Math.PI / 2; if (axis === 'z') object.rotation.x = Math.PI / 2; return object;
  };
  const ring = (r: number, tube: number, mat: THREE.Material, parent: THREE.Object3D, x: number, y: number, z: number, axis = 'z') => {
    const object = mesh(shape(`r${r},${tube}`, () => new THREE.TorusGeometry(r, tube, 8, 64)), mat, parent, x, y, z);
    if (axis === 'x') object.rotation.y = Math.PI / 2; if (axis === 'y') object.rotation.x = Math.PI / 2; return object;
  };
  const group = (parent: THREE.Object3D, x = 0, y = 0, z = 0) => { const result = new THREE.Group(); result.position.set(x, y, z); parent.add(result); return result; };
  const screw = (parent: THREE.Object3D, x: number, y: number, z: number, axis = 'y', radius = .04) => {
    const head = group(parent, x, y, z); if (axis === 'z') head.rotation.x = Math.PI / 2; if (axis === 'x') head.rotation.z = -Math.PI / 2;
    cyl(radius * 1.4, .012, metal, head); cyl(radius, .03, chrome, head, 0, .014, 0, 'y', 6);
    cyl(radius * .42, .003, rubber, head, 0, .031, 0, 'y', 6);
  };
  const wire = (points: number[][], mat: THREE.Material, parent: THREE.Object3D = root, radius = .024) =>
    mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p as [number, number, number]))), 36, radius, 8, false), mat, parent);
  const label = (text: string, sub: string, width: number, height: number, parent: THREE.Object3D, x: number, y: number, z: number, top = false) => {
    const map = texture(ctx => {
      ctx.fillStyle = '#243138'; ctx.fillRect(0, 0, 512, 160); ctx.strokeStyle = '#8f999b'; ctx.lineWidth = 3; ctx.strokeRect(6, 6, 500, 148);
      ctx.fillStyle = '#e6e6db'; ctx.font = '600 37px monospace'; ctx.fillText(text, 24, 67);
      ctx.fillStyle = '#a8bebb'; ctx.font = '23px monospace'; ctx.fillText(sub, 24, 117);
      for (let i = 0; i < 36; i++) ctx.fillRect(365 + i * 3, 86, i % 3 ? 1 : 2, 33);
    }, 512, 160);
    const object = mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshStandardMaterial({ map, roughness: .64, metalness: .2 }), parent, x, y, z);
    object.castShadow = false; if (top) object.rotation.x = -Math.PI / 2; return object;
  };
  const board = (parent: THREE.Object3D, x: number, y: number, z: number, w = .9, d = .7) => {
    const pcb = group(parent, x, y, z); box(w, .042, d, green, pcb);
    for (const side of [-1, 1]) for (let i = 0; i < 8; i++) { box(.035, .009, d * .38, copper, pcb, side * (.1 + i * .035), .025, 0); }
    box(.25, .055, .25, rubber, pcb, 0, .05, 0); box(.22, .016, .22, dark, pcb, 0, .086, 0);
    for (let i = 0; i < 8; i++) for (const side of [-1, 1]) box(.025, .012, .06, metal, pcb, (i - 3.5) * .027, .038, side * .145);
    for (let i = 0; i < 5; i++) { box(.07, .035, .035, rubber, pcb, w * .3, .044, (i - 2) * .1); box(.09, .013, .04, metal, pcb, w * .3, .028, (i - 2) * .1); }
    cyl(.055, .14, dark, pcb, -w * .3, .09, -.14); cyl(.055, .015, metal, pcb, -w * .3, .166, -.14);
    box(.16, .09, .14, metal, pcb, -w / 2, .06, .15); box(.012, .044, .093, rubber, pcb, -w / 2 - .086, .06, .15);
    for (let i = 0; i < 7; i++) { box(.047, .085, .047, rubber, pcb, (i - 3) * .073, .06, d / 2 - .07); cyl(.014, .065, copper, pcb, (i - 3) * .073, .13, d / 2 - .07); }
    box(.035, .023, .025, led, pcb, w * .35, .037, -d * .3);
    for (const px of [-w * .42, w * .42]) for (const pz of [-d * .4, d * .4]) { cyl(.045, .11, copper, pcb, px, -.055, pz); screw(pcb, px, .028, pz, 'y', .022); }
    return pcb;
  };

  // Anodized tooling plate with countersunk grid, edge groove and rubber isolation feet.
  const benchWidth = plant === 'pendulum' ? 4.5 : 8.8, benchDepth = plant === 'pendulum' ? 2.8 : 3;
  box(benchWidth, .19, benchDepth, metal, root, 0, -.28, 0);
  box(benchWidth - .12, .025, benchDepth - .12, dark, root, 0, -.17, 0);
  box(benchWidth - .2, .018, benchDepth - .2, metal, root, 0, -.148, 0);
  for (let x = -Math.floor(benchWidth / .6) / 2 * .6; x < benchWidth / 2 - .3; x += .6) for (let z = -1.05; z <= 1.05; z += .6) {
    cyl(.033, .005, dark, root, x, -.134, z); ring(.034, .004, chrome, root, x, -.13, z, 'y');
  }
  for (const x of [-benchWidth / 2 + .38, benchWidth / 2 - .38]) for (const z of [-1.1, 1.1]) {
    cyl(.18, .16, rubber, root, x, -.45, z); cyl(.14, .035, metal, root, x, -.37, z); screw(root, x, -.135, z);
  }
  label('CONTROL STUDIO', 'PID / EXPERIMENTAL RIG', 1.55, .18, root, -benchWidth / 2 + .95, -.28, benchDepth / 2 + .001);

  const rotor = group(root), cart = group(root), arm = group(cart), targetArm = group(cart), marker = group(root);
  const wheels: THREE.Group[] = [];
  const rod = group(arm), bob = group(arm), targetRod = group(targetArm), targetBob = group(targetArm);
  let guide: THREE.Line | null = null;
  if (plant === 'motor') {
    // Motor cradle, brushed end caps, cooling ribs and rear ventilation.
    box(2.15, .14, 1.65, dark, root, -2, -.065, 0);
    for (const x of [-2.75, -1.25]) { box(.24, .23, 1.25, teal, root, x, .1, 0); for (const z of [-.65, .65]) screw(root, x, .016, z); }
    cyl(.66, 1.65, teal, root, -2, .78, 0, 'x');
    for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12; const rib = box(1.48, .035, .14, teal, root, -2, .78 + Math.cos(a) * .66, Math.sin(a) * .66); rib.rotation.x = a; }
    for (const x of [-2.9, -1.1]) {
      cyl(.69, .16, metal, root, x, .78, 0, 'x'); ring(.62, .022, chrome, root, x + .086, .78, 0, 'x');
      cyl(.29, .19, dark, root, x, .78, 0, 'x'); cyl(.22, .21, chrome, root, x, .78, 0, 'x');
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; screw(root, x + .09, .78 + .54 * Math.cos(a), .54 * Math.sin(a), 'x', .036); }
    }
    cyl(.67, .24, dark, root, -3.07, .78, 0, 'x');
    for (let i = 0; i < 20; i++) { const a = i * Math.PI / 10; const vent = box(.015, .12, .033, rubber, root, -3.195, .78 + .47 * Math.cos(a), .47 * Math.sin(a)); vent.rotation.x = a; }
    box(.5, .3, .62, dark, root, -2.1, 1.46, -.05); box(.53, .06, .66, teal, root, -2.1, 1.64, -.05);
    for (const x of [-2.28, -1.92]) for (const z of [-.27, .17]) screw(root, x, 1.68, z, 'y', .025);
    label('DC DRIVE', '12V / ENCODER FEEDBACK', 1.05, .3, root, -2, .84, .687);
    // Shaft coupling, bearing pedestal and rotating optical code wheel.
    cyl(.105, 3.3, chrome, root, .15, .78, 0, 'x');
    cyl(.24, .53, metal, root, -.58, .78, 0, 'x');
    for (let i = 0; i < 5; i++) ring(.242, .012, dark, root, -.8 + i * .095, .78, 0, 'x');
    screw(root, -.57, 1.025, 0, 'y', .025);
    box(.28, .6, .72, teal, root, -.04, .2, 0); cyl(.31, .28, teal, root, -.04, .78, 0, 'x'); cyl(.22, .3, dark, root, -.04, .78, 0, 'x');
    for (const z of [-.28, .28]) screw(root, -.04, -.015, z);
    rotor.position.set(.47, .78, 0);
    // Annular slotted disk: genuine holes between spokes, rather than painted slots.
    ring(.73, .043, metal, rotor, 0, 0, 0, 'x'); cyl(.22, .072, dark, rotor, 0, 0, 0, 'x');
    for (let i = 0; i < 48; i++) { const a = i * Math.PI / 24; const spoke = box(.038, .42, .027, metal, rotor, 0, .48 * Math.cos(a), .48 * Math.sin(a)); spoke.rotation.x = a; }
    cyl(.145, .12, copper, rotor, 0, 0, 0, 'x'); ring(.19, .013, chrome, rotor, .048, 0, 0, 'x');
    const sensor = group(root, .47, .15, .68); box(.34, .13, .34, rubber, sensor); box(.075, .42, .25, dark, sensor, -.12, .23, 0); box(.075, .42, .25, dark, sensor, .12, .23, 0); box(.06, .04, .04, red, sensor, -.08, .35, -.08);
    // Load wheel with separate rim, machined hub, tire grooves and hardware.
    const loadWheel = group(rotor, 1.02);
    cyl(.64, .3, rubber, loadWheel, 0, 0, 0, 'x'); cyl(.52, .315, metal, loadWheel, 0, 0, 0, 'x');
    for (const x of [-.17, .17]) ring(.47, .025, chrome, loadWheel, x, 0, 0, 'x');
    for (let i = 0; i < 5; i++) ring(.644, .012, dark, loadWheel, -.12 + i * .06, 0, 0, 'x');
    cyl(.21, .34, dark, loadWheel, 0, 0, 0, 'x'); cyl(.11, .36, copper, loadWheel, 0, 0, 0, 'x');
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; screw(loadWheel, .173, .34 * Math.cos(a), .34 * Math.sin(a), 'x', .026); }
    board(root, 2.9, .12, -.4, 1.05, .9); label('ENCODER', 'A / B / Z', .7, .2, root, 2.9, -.12, .25, true);
    wire([[-2.1, 1.5, -.42], [-2.3, .2, -.92], [0, -.09, -1.05], [2.65, .15, -.55]], rubber);
    wire([[.47, .28, .82], [.8, -.04, 1.05], [2.4, -.04, .8], [2.8, .16, -.2]], blue, root, .016);
    wire([[2.9, .19, -.1], [3.4, .08, .2], [3.55, -.02, .9]], red, root, .018);
    for (const x of [-1.4, -.1, 1.2]) { box(.08, .025, .12, rubber, root, x, -.09, -1.04); screw(root, x, -.072, -1.04, 'y', .015); }
  } else {
    const isCart = plant === 'cart', pivotY = isCart ? .7 : .55;
    if (isCart) {
      // Two polished rails on slotted extrusion profiles with rack, graduated scale and physical stops.
      for (const z of [-.52, .52]) {
        box(7.8, .16, .25, metal, root, 0, -.035, z); box(7.8, .024, .1, dark, root, 0, .053, z);
        cyl(.05, 7.6, chrome, root, 0, .105, z, 'x');
        for (const x of [-3.45, -2.1, -.7, .7, 2.1, 3.45]) screw(root, x, .058, z + .09, 'y', .025);
      }
      box(7.25, .045, .1, dark, root, 0, -.065, .88);
      for (let i = -60; i <= 60; i++) box(.012, .012, i % 10 === 0 ? .12 : .06, metal, root, i * .06, -.034, .88);
      for (let i = -50; i <= 50; i++) box(.028, .045, .075, rubber, root, i * .07, -.074, -.94);
      for (const x of [-3.6, 3.6]) {
        box(.19, .49, 1.45, amber, root, x, .09, 0); box(.09, .19, .6, rubber, root, x > 0 ? x - .13 : x + .13, .15, 0);
        for (const z of [-.5, .5]) screw(root, x, .35, z); box(.12, .15, .25, blue, root, x, .17, -.9);
      }
      box(1.22, .28, 1.22, teal, cart, 0, .35, 0); box(1.26, .055, 1.26, metal, cart, 0, .515, 0);
      for (const z of [-.61, .61]) {
        box(.72, .014, .025, dark, cart, 0, .31, z);
        for (const x of [-.43, .43]) {
          const wheel = group(cart, x, .15, z); wheels.push(wheel);
          cyl(.16, .13, rubber, wheel, 0, 0, 0, 'z'); cyl(.1, .15, metal, wheel, 0, 0, 0, 'z'); ring(.11, .012, chrome, wheel, 0, 0, .08); screw(wheel, 0, 0, .092, 'z', .034);
          screw(cart, x, .55, z * .72, 'y', .028);
        }
      }
      label('CART / 03', 'POSITION + BALANCE', .79, .2, cart, 0, .35, .624);
      // Electronics enclosure with heatsink and neatly routed flexible harness.
      box(.38, .2, .65, dark, cart, -.37, .66, -.03);
      for (let i = 0; i < 5; i++) box(.035, .09, .6, metal, cart, -.5 + i * .065, .795, -.03);
      board(cart, .37, .65, -.22, .43, .47);
      wire([[-.43, .66, .3], [-.48, .55, .63], [0, .52, .66], [.36, .65, .1]], red, cart, .015);
      box(.16, .07, .32, amber, marker, 0, -.015, 1.14);
      board(root, -3, .07, -1.06, .8, .45);
    } else {
      // Direct-drive pivot: mounting saddle, bearing block, housing flange and output encoder.
      box(1.8, .11, 1.5, dark, cart, 0, -.075, 0);
      box(.85, .62, .76, teal, cart, 0, .245, -.24); box(1.14, .09, 1.07, teal, cart, 0, .002, -.24);
      for (const x of [-.7, .7]) for (const z of [-.58, .58]) screw(cart, x, -.015, z);
      cyl(.42, .55, teal, cart, 0, pivotY, -.22, 'z'); cyl(.44, .08, metal, cart, 0, pivotY, .1, 'z');
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; const rib = box(.045, .06, .46, dark, cart, .415 * Math.cos(a), pivotY + .415 * Math.sin(a), -.21); rib.rotation.z = a; }
      cyl(.26, .1, dark, cart, 0, pivotY, .16, 'z'); ring(.21, .019, chrome, cart, 0, pivotY, .22);
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; screw(cart, .35 * Math.cos(a), pivotY + .35 * Math.sin(a), .148, 'z', .024); }
      label('TORQUE / 02', 'DIRECT DRIVE', .72, .19, cart, 0, .22, .152);
      board(root, -1.54, .07, -.2, .66, .7);
      box(.61, .27, .84, dark, root, 1.45, .015, -.25); label('DRIVE', 'DC / SERVO', .48, .15, root, 1.45, .02, .177);
      wire([[-1.35, .15, -.08], [-.95, -.035, .66], [-.6, .02, .67], [-.35, .28, .08]], blue, root, .018);
      wire([[1.38, .12, -.65], [.8, -.07, -.9], [.25, -.02, -.75], [.12, .3, -.55]], rubber, root, .032);
    }
    arm.position.set(0, pivotY, .27); targetArm.position.set(0, pivotY, -.12);
    // Constant-size machined bob; only rod length is scaled as the plant parameter changes.
    cyl(.055, 1, chrome, rod, 0, .5); box(.04, .98, .018, dark, rod, 0, .5, .05);
    for (const y of [.09, .19, .29, .39, .49, .59, .69, .79, .89, .99]) box(.066, .004, .006, metal, rod, 0, y, .06);
    cyl(.16, .16, copper, arm, 0, 0, 0, 'z'); cyl(.112, .18, metal, arm, 0, 0, 0, 'z'); screw(arm, 0, 0, .106, 'z', .055);
    const bobProfile = [[.065, -.16], [.21, -.16], [.255, -.12], [.265, -.09], [.265, .09], [.255, .12], [.21, .16], [.065, .16]].map(([r, h]) => new THREE.Vector2(r, h));
    const weight = mesh(new THREE.LatheGeometry(bobProfile, 64), amber, bob); weight.rotation.x = Math.PI / 2;
    for (const z of [-.17, .17]) { cyl(.095, .045, metal, bob, 0, 0, z, 'z'); ring(.21, .008, copper, bob, 0, 0, z); }
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; screw(bob, Math.cos(a) * .16, Math.sin(a) * .16, .175, 'z', .02); }
    cyl(.027, 1, ghost, targetRod, 0, .5); cyl(.27, .045, ghost, targetBob, 0, 0, 0, 'z');
    guide = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -.31), new THREE.Vector3(0, 1, -.31)]), new THREE.LineDashedMaterial({ color: '#688681', dashSize: .07, gapSize: .055, transparent: true, opacity: .5 }));
    guide.computeLineDistances(); guide.position.y = pivotY; cart.add(guide);
    // Etched angle scale around the pivot, fixed to the stationary frame.
    ring(.52, .012, dark, cart, 0, pivotY, .37);
    for (let angle = -80; angle <= 80; angle += 5) {
      const a = angle * Math.PI / 180, r1 = angle % 10 ? .48 : .455;
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(Math.sin(a) * r1, Math.cos(a) * r1, 0), new THREE.Vector3(Math.sin(a) * .51, Math.cos(a) * .51, 0)]), new THREE.LineBasicMaterial({ color: '#9aa9a8' }));
      line.position.set(0, pivotY, .374); cart.add(line);
    }
  }
  let meshCount = 0; root.traverse(object => { if (object instanceof THREE.Mesh) meshCount++; });
  return { root, rotor, cart, arm, targetArm, rod, bob, targetRod, targetBob, guide, marker, wheels, led, textures, meshCount };
}
