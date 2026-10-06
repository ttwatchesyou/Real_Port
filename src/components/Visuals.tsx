'use client';
import { useLocale } from './LocaleProvider';
import { useId } from 'react';
import styled, { keyframes } from 'styled-components';

const signal = keyframes`to { stroke-dashoffset: -160; }`;
const breathe = keyframes`0%,100% { opacity: .35; } 50% { opacity: 1; }`;
const sweep = keyframes`0%,100%{opacity:0;transform:translateX(-70px);}40%{opacity:.55;}70%{opacity:0;transform:translateX(160px);}`;
const sway = keyframes`0%,100%{transform:rotate(-3deg);}50%{transform:rotate(3deg);}`;
const roll = keyframes`0%,100%{transform:translate(0,0);}50%{transform:translate(5px,-3px);}`;
const Svg = styled.svg`
  width: 100%; height: 100%; overflow: visible;
  &[data-layer] .board-part { display: none; }
  &[data-layer='base'] .base, &[data-layer='traces'] .traces,
  &[data-layer='headers'] .headers, &[data-layer='components'] .components,
  &[data-layer='processor'] .processor { display: inline; }
  filter:drop-shadow(0 18px 14px #00000032);
  .processor,.components{filter:drop-shadow(3px 6px 3px #00000070);}
  .arm-motion{transform-origin:176px 204px;animation:${sway} 7s ease-in-out infinite;}
  .agv-motion{animation:${roll} 5s ease-in-out infinite;}
  .metal-glint{animation:${sweep} 6s ease-in-out infinite;pointer-events:none;}
  .signal { stroke-dasharray: 5 75; animation: ${signal} 5s linear infinite; }
  .led { animation: ${breathe} 2s ease-in-out infinite; }
  .led:nth-of-type(2n) { animation-delay: .8s; }
`;

export type BoardLayer = 'base' | 'traces' | 'headers' | 'components' | 'processor';
export function Board({ hero = false, layer }: { hero?: boolean; layer?: BoardLayer }) {
  const {t}=useLocale();
  const id = useId().replace(/:/g, '');
  const traces = ['M85 78 H157 L188 109 H235','M80 110 H146 L183 147 H230','M78 150 H134 L182 198 H235','M78 260 H156 L187 229 H230','M86 303 H173 L203 273 V245','M270 90 V130','M306 85 V121 L287 140','M357 103 H334 L312 125 V150','M369 164 H328','M375 199 H325','M370 264 H334 L308 238','M369 296 H319 L291 268 V240','M252 245 V305 H206','M272 245 V326 H306'];
  return <Svg viewBox="0 0 460 390" data-layer={layer} role="img" aria-label={t(hero ? 'Animated development board with glowing circuits' : 'ESP32 circuit board illustration')}>
    <defs>
      <linearGradient id={`${id}pcb`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#182536"/><stop offset=".5" stopColor="#0d1621"/><stop offset="1" stopColor="#202b3a"/></linearGradient>
      <linearGradient id={`${id}chip`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#373a3d"/><stop offset=".5" stopColor="#14181e"/><stop offset="1" stopColor="#303337"/></linearGradient>
      <linearGradient id={`${id}silver`} x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#e4ebee"/><stop offset=".25" stopColor="#8b9baa"/><stop offset=".5" stopColor="#d0dbe0"/><stop offset="1" stopColor="#546779"/></linearGradient>
      <linearGradient id={`${id}glint`}><stop stopColor="#bcecff" stopOpacity="0"/><stop offset=".5" stopColor="#dcf6ff" stopOpacity=".28"/><stop offset="1" stopColor="#bcecff" stopOpacity="0"/></linearGradient>
      <pattern id={`${id}micro`} width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 0h14v14" stroke="#8199b7" strokeOpacity=".07" fill="none"/></pattern>
      <filter id={`${id}glow`}><feGaussianBlur stdDeviation="2.5"/></filter>
    </defs>
    <g className="board-part base">
    <rect x="51" y="46" width="357" height="305" rx="13" fill="#070a0f" stroke="#354252" strokeWidth="2"/>
    <rect x="47" y="36" width="357" height="305" rx="13" fill={`url(#${id}pcb)`} stroke="#546985" strokeWidth="1.3"/>
    <rect x="48" y="37" width="355" height="303" rx="12" fill={`url(#${id}micro)`}/>
    <path d="M61 37h329q13 0 13 13M48 51v276" fill="none" stroke="#a2c1d8" strokeOpacity=".5"/>
    {[ [64,53],[387,53],[64,324],[387,324] ].map(([x,y])=><g key={`${x}${y}`}><circle cx={x} cy={y} r="7" fill="#728091"/><circle cx={x} cy={y} r="3.3" fill="#070a0e"/></g>)}
    </g><g className="board-part traces">
    <g stroke="#36475d" strokeWidth="1.3" fill="none">{traces.map(d=><path d={d} key={d}/>)}</g>
    <g stroke="#91cff6" strokeWidth="1.7" fill="none" className="signal">{traces.map(d=><path d={d} key={d}/>)}</g>
    <g fill="#7390a2">{[[85,78],[80,110],[78,150],[78,260],[86,303],[357,103],[369,164],[375,199],[369,296],[306,326]].map(([x,y])=><circle key={`${x}${y}`} cx={x} cy={y} r="2.5"/>)}</g>
    {Array.from({length:26},(_,i)=><g key={i}><path d={`M${92+i*10} 294v${-16-i%4*5}l9-9v-12`} stroke="#54777e" fill="none" strokeWidth=".6"/><circle cx={92+i*10} cy="295" r="1.3" fill="#b5b388"/></g>)}
    </g><g className="board-part headers">
    {[0,1].map(side=><g key={side}>{Array.from({length:16},(_,i)=><g key={i}><rect x={side?385:50} y={77+i*13.3} width="15" height="8" rx="1" fill="#12161c" stroke="#3b424a"/><rect x={side?389:54} y={79+i*13.3} width="5" height="4" fill="#b9b29a"/></g>)}</g>)}
    </g><g className="board-part processor">
    {Array.from({length:10},(_,i)=><g key={i} fill="#9ca4a9"><rect x={219+i*9} y="135" width="4" height="18"/><rect x={219+i*9} y="233" width="4" height="17"/><rect x="204" y={154+i*8} width="18" height="4"/><rect x="305" y={154+i*8} width="18" height="4"/></g>)}
    <rect x="218" y="149" width="90" height="88" rx="3" fill={`url(#${id}chip)`} stroke="#777d84"/>
    <path className="metal-glint" d="M220 151h86v84h-86Z" fill={`url(#${id}glint)`}/>
    <path d="M232 167v14m0-14 11 14v-14 M249 167h10m-10 7h8m-8 7h10" fill="none" stroke="#a2acb3" strokeWidth="1.5"/>
    <text x="230" y="201" fill="#d4dbdf" fontSize="14" fontFamily="monospace" letterSpacing="2">TT.01</text>
    <text x="230" y="217" fill="#899399" fontSize="6.5" fontFamily="monospace">ESP32 · DUAL CORE</text>
    <circle cx="296" cy="159" r="2" fill="#9aa4ab"/>
    </g><g className="board-part components">
    <rect x="119" y="168" width="58" height="57" rx="3" fill="#2a2d30" stroke="#7f8c94"/>
    <text x="128" y="191" fontSize="7" fill="#c7ced3" fontFamily="monospace">Wi-Fi</text><text x="128" y="204" fontSize="6" fill="#8f9ea8" fontFamily="monospace">2.4 GHz</text>
    <path d="M103 75v50h9V84h10v41h10V84h10v30" fill="none" stroke="#b2ae86" strokeWidth="4"/>
    <rect x="204" y="30" width="52" height="31" rx="4" fill={`url(#${id}silver)`} stroke="#e5edf2"/><rect x="213" y="32" width="34" height="12" rx="4" fill="#262c34"/>
    {[0,1,2,3].map(i=><g key={i}><rect x={123+i*22} y="267" width="13" height="22" rx="2" fill="#727982"/><rect x={123+i*22} y="272" width="13" height="12" fill="#19212c"/></g>)}
    {[0,1,2].map(i=><g key={i}><rect x="335" y={209+i*16} width="19" height="7" rx="1" fill="#b6b29b"/><rect x="340" y={209+i*16} width="9" height="7" fill="#333941"/></g>)}
    {Array.from({length:18},(_,i)=><g key={i} transform={`translate(${93+(i%6)*16} ${233+Math.floor(i/6)*9})`}><rect width="11" height="5" rx="1" fill="#b5bdb9"/><rect x="2" width="7" height="5" fill={i%3?'#28384c':'#b9a780'}/><path d="M4 1h3" stroke="#f2ead9" strokeOpacity=".55"/></g>)}
    {Array.from({length:11},(_,i)=><text key={i} x="70" y={84+i*20} fill="#8bafbb" fontSize="4.5" fontFamily="monospace">{['3V3','EN','VP','VN','IO34','IO35','IO32','IO33','IO25','GND','5V'][i]}</text>)}
    <path d="M335 92h27v81h-18v14" fill="none" stroke="#63877e"/>
    <circle cx="338" cy="73" r="6" fill="#86d0ff" opacity=".7" filter={`url(#${id}glow)`}/><circle className="led" cx="338" cy="73" r="3" fill="#9ed9ff"/>
    <circle className="led" cx="355" cy="73" r="3" fill="#a3d0ec"/>
    </g><g className="board-part base">
    <text x="94" y="321" fill="#718093" fontSize="7" letterSpacing="2" fontFamily="monospace">THEETAWATCH / WORKBENCH</text>
    <text x="332" y="320" fill="#718093" fontSize="7" fontFamily="monospace">REV 02</text>
    </g>
  </Svg>;
}

export function Arm() {
  const {t}=useLocale();
  const id=useId().replace(/:/g,'');
  return <Svg viewBox="0 0 420 280" role="img" aria-label={t("Industrial robotic arm illustration")}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2=".8"><stop stopColor="#a9b1b6"/><stop offset=".45" stopColor="#525961"/><stop offset="1" stopColor="#252c34"/></linearGradient></defs>
    <ellipse cx="208" cy="250" rx="106" ry="14" fill="#000" opacity=".4"/>
    <g stroke="#3e4855" fill="none" opacity=".5"><ellipse cx="208" cy="242" rx="147" ry="26"/><path d="M24 242h365M208 197v71"/></g>
    <path d="M157 224h97l15 20H142Z" fill="#3b434d" stroke="#8f9aa1"/><path d="M163 224v-24h85v24" fill={`url(#${id})`} stroke="#818d94"/>
    <g className="arm-motion"><path d="M175 204 155 133 180 122 216 204" fill={`url(#${id})`} stroke="#9eaab2" strokeWidth="1.5"/>
    <path d="M182 187 170 143" stroke="#8bc7ee" strokeWidth="4"/>
    <path d="M163 127 223 55 247 74 186 145" fill={`url(#${id})`} stroke="#9eaab2" strokeWidth="1.5"/>
    <path d="M186 121 225 75" stroke="#14202f" strokeWidth="10"/><path d="M186 119 225 73" stroke="#757e89" strokeWidth="2"/>
    <path d="M242 62 300 101 289 121 225 87" fill={`url(#${id})`} stroke="#96a2a9" strokeWidth="1.5"/>
    <path d="M250 80 281 100" stroke="#86badb" strokeWidth="3"/>
    <g fill="#27303b" stroke="#a6b5bf" strokeWidth="2"><circle cx="176" cy="132" r="21"/><circle cx="236" cy="71" r="19"/><circle cx="295" cy="110" r="13"/></g>
    <g fill="#101721" stroke="#657589"><circle cx="176" cy="132" r="12"/><circle cx="236" cy="71" r="10"/><circle cx="295" cy="110" r="6"/></g>
    <path d="m301 117 13 18-8 10m-13-24-5 22 12 8" fill="none" stroke="#acb5bb" strokeWidth="7"/>
    <path d="M163 134c-39 29 45 32 31 70" fill="none" stroke="#090e14" strokeWidth="5"/>
    </g><g fill="none" stroke="#9bd4f8" strokeWidth=".8" opacity=".6"><path d="M154 125h-49l-20-20H42M248 57l24-21h58"/><circle cx="176" cy="132" r="30" strokeDasharray="3 6"/></g>
    <text x="38" y="98" fill="#92a5b1" fontSize="7" fontFamily="monospace">JOINT_02</text><text x="280" y="29" fill="#92a5b1" fontSize="7" fontFamily="monospace">6 AXIS / IK</text>
  </Svg>;
}

export function Dashboard({ code = false }: { code?: boolean }) {
  const {t}=useLocale();
  return <Svg viewBox="0 0 420 280" role="img" aria-label={t(code?'Embedded code terminal illustration':'IoT monitoring dashboard illustration')}>
    <rect x="36" y="41" width="349" height="208" rx="6" fill="#10171f" stroke="#414954"/><path d="M36 66h349" stroke="#363d47"/>
    <circle cx="49" cy="54" r="2.5" fill="#717a86"/><circle cx="59" cy="54" r="2.5" fill="#717a86"/><circle cx="69" cy="54" r="2.5" fill="#a2bfd2"/>
    <text x="153" y="56" fontSize="6" fill="#8a969d" fontFamily="monospace">{code?'TT / SERIAL MONITOR':'TT / SENSOR MONITOR'}</text>
    {code ? <g fontFamily="monospace" fontSize="10" fill="#97abb7"><text x="57" y="94" fill="#a5d5f3">$ serial connect --port auto</text><text x="57" y="117">[ OK ] Serial connection established</text><text x="57" y="140">[ OK ] Device: ESP32-WROOM-32</text><text x="57" y="163">[ OK ] Baud rate: 115200</text><text x="57" y="195" fill="#a5d5f3">&gt; Ready to build something.</text><rect className="led" x="58" y="210" width="7" height="12" fill="#a5d5f3"/></g> : <>
      <path d="M91 66v183" stroke="#303740"/><g fill="#727b87"><rect x="48" y="82" width="28" height="4" rx="2"/><rect x="48" y="101" width="20" height="3" rx="1"/><rect x="48" y="116" width="24" height="3" rx="1"/><rect x="48" y="131" width="18" height="3" rx="1"/></g>
      {[0,1,2].map(i=><g key={i}><rect x={105+i*89} y="81" width="77" height="45" rx="3" fill="#18222f" stroke="#333c48"/><text x={114+i*89} y="94" fontSize="5.5" fill="#8c969d" fontFamily="monospace">{['TEMPERATURE','HUMIDITY','CONNECTED'][i]}</text><text x={114+i*89} y="114" fontSize="16" fill="#c9dbe6" fontFamily="monospace">{['24.8°','62.4%','08'][i]}</text></g>)}
      <rect x="105" y="139" width="254" height="90" rx="3" fill="#111924" stroke="#333c48"/>
      <g stroke="#26303c" strokeWidth=".5"><path d="M115 160h233M115 180h233M115 200h233M155 151v67M205 151v67M255 151v67M305 151v67"/></g>
      <path d="m115 206 14-8 13 5 13-27 13 12 13-6 13 11 13-36 13 19 13-5 13 22 13-13 13 2 13-29 13 16 13-5 13 8 13-22" fill="none" stroke="#a8d2ed" strokeWidth="1.6"/>
      <path className="signal" d="M115 213h230" fill="none" stroke="#8ea9bb" strokeWidth="2"/>
    </>}
  </Svg>;
}

export function Rover() {
  const {t}=useLocale();
  return <Svg viewBox="0 0 420 280" role="img" aria-label={t("Autonomous rover illustration")}><g fill="none" stroke="#455365"><ellipse cx="210" cy="210" rx="153" ry="39" strokeDasharray="4 8"/><path d="M210 190 127 84m83 106 88-105" strokeDasharray="3 6"/><path d="M135 116q75-64 152 0M113 93q96-79 195 0"/></g><g fill="#131b25" stroke="#788c98" strokeWidth="2"><rect x="105" y="168" width="33" height="60" rx="9"/><rect x="280" y="168" width="33" height="60" rx="9"/><path d="m134 156 99-19 51 30v56l-111 17-39-22Z" fill="#333e4d"/><path d="m134 156 47 27 103-16M181 183v57"/><rect x="183" y="115" width="70" height="40" rx="8" fill="#515b69"/><circle cx="201" cy="134" r="11" fill="#0d151f"/><circle cx="235" cy="134" r="11" fill="#0d151f"/><circle className="led" cx="201" cy="134" r="4" fill="#a9d4ef"/><circle className="led" cx="235" cy="134" r="4" fill="#a9d4ef"/><path d="M245 130v-31"/><circle cx="245" cy="97" r="4" fill="#a9d4ef"/></g></Svg>;
}

export function LogisticsRobot() {
  const {t}=useLocale();
  const id = useId().replace(/:/g, '');
  return <Svg viewBox="0 0 420 280" role="img" aria-label={t("Illustration of an automated logistics robot, not a photograph of the project")}>
    <defs><linearGradient id={`${id}agv-metal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#61778a"/><stop offset="1" stopColor="#263745"/></linearGradient></defs>
    <g fill="none" stroke="#345466"><ellipse cx="215" cy="226" rx="154" ry="30" strokeDasharray="3 6"/><path d="M32 231h350M100 256l233-72" strokeDasharray="5 7"/></g>
    <g className="agv-motion"><g fill="#111923" stroke="#5b7082" strokeWidth="2"><ellipse cx="133" cy="211" rx="16" ry="24"/><ellipse cx="283" cy="199" rx="16" ry="24"/><ellipse cx="262" cy="231" rx="16" ry="24"/></g>
    <path d="m99 163 132-33 88 42v46l-136 35-84-44Z" fill={`url(#${id}agv-metal)`} stroke="#8fa3b2" strokeWidth="1.5"/>
    <path d="m99 163 84 41 136-32M183 204v49" fill="none" stroke="#b2c2cb"/>
    <path d="m104 179 72 35v14l-72-36Zm84 33 124-32v14l-124 32Z" fill="#eab45d"/>
    <path d="m133 143 83-21 62 29-84 23Z" fill="#253844" stroke="#8b9fad"/>
    <path d="M143 139V92l74-19 50 25v48l-73 20Z" fill="#697681" stroke="#a9b6bd"/>
    <path d="m143 92 51 25 73-19M194 117v49" fill="none" stroke="#bec8ce"/>
    <path d="m166 86 50 25v14l-17 4v-14l-50-25" fill="#dca953"/>
    <rect x="119" y="192" width="30" height="8" rx="3" fill="#0d1820" transform="rotate(25 119 192)"/>
    <path className="led" d="m196 235 43-11" stroke="#72e3f3" strokeWidth="3"/>
    <path d="M287 165v-54" stroke="#93a7b7" strokeWidth="3"/><circle className="led" cx="287" cy="107" r="5" fill="#f3bd5a"/>
    </g><g stroke="#62b9d2" fill="none" opacity=".6"><path d="M112 159H74L54 137H25M274 115h43l17-19h57"/><path className="signal" d="M70 230H41v-52H20" strokeWidth="2"/></g>
    <text x="27" y="128" fill="#88a9bc" fontSize="7" fontFamily="monospace">DRIVE / CONTROL</text><text x="325" y="88" fill="#88a9bc" fontSize="7" fontFamily="monospace">LOGISTICS</text>
  </Svg>;
}

export function ControlPanel() {
  const {t}=useLocale();
  return <Svg viewBox="0 0 420 280" role="img" aria-label={t("Illustration of a PLC training panel and ladder logic")}>
    <rect x="51" y="29" width="317" height="224" rx="5" fill="#151f2a" stroke="#526778"/>
    <path d="M65 78h288M65 200h288" stroke="#6e7b84" strokeWidth="5"/>
    <rect x="74" y="47" width="131" height="73" rx="3" fill="#72838e" stroke="#a4b3bc"/>
    <rect x="85" y="57" width="72" height="34" rx="2" fill="#0c1923"/><text x="94" y="72" fill="#71d8ed" fontSize="7" fontFamily="monospace">PLC / RUN</text><text x="94" y="83" fill="#83a3b2" fontSize="6" fontFamily="monospace">I/O MONITOR</text>
    {[0,1,2,3].map(i=><g key={i}><rect x={84+i*27} y="104" width="17" height="8" fill="#2a3944"/><circle className="led" cx={169+i*7} cy="65" r="2" fill="#5fdded"/></g>)}
    {[0,1,2].map(i=><g key={i}><rect x={217+i*42} y="49" width="34" height="68" rx="2" fill="#465a6a" stroke="#91a4b1"/><rect x={224+i*42} y="61" width="20" height="29" fill="#263743"/><circle cx={234+i*42} cy="104" r="3" fill={i===1?'#efb65b':'#70d3e8'}/></g>)}
    <g fill="none" strokeWidth="2"><path className="signal" d="M94 121v48h142v27" stroke="#e4ae56"/><path className="signal" d="M121 121v39h167v36" stroke="#68c8df"/><path d="M150 121v30h167v45" stroke="#91a6b2"/><path d="M236 118v22H180v56" stroke="#e4ae56"/></g>
    {[0,1,2,3,4,5,6,7].map(i=><g key={i}><rect x={87+i*31} y="190" width="24" height="23" fill="#9daab2" stroke="#253b4c"/><circle cx={99+i*31} cy="201" r="4" fill="#293944"/></g>)}
    <text x="82" y="237" fill="#7f9aaa" fontSize="7" letterSpacing="1" fontFamily="monospace">INPUT → LOGIC → OUTPUT</text>
    <circle className="led" cx="334" cy="233" r="4" fill="#f2b853"/>
  </Svg>;
}

export function CadStudy() {
  const {t}=useLocale();
  return <Svg viewBox="0 0 420 280" role="img" aria-label={t("Illustration of a mechanical CAD study")}>
    <g stroke="#233a4c" fill="none" strokeWidth=".6">{Array.from({length:10},(_,i)=><path key={i} d={`M${55+i*30} 37v210M55 ${37+i*22}h280`}/>)}</g>
    <g fill="#1b344766" stroke="#80c8e2" strokeWidth="1.4"><path d="m104 126 125-64 96 57v94l-125 44-96-54Z"/><path d="m104 126 96 55 125-62M200 181v76M229 62v95l-125 46"/><path d="m129 131 100-47 66 37-98 43Z"/><path d="M132 168v28l42 23v-29Z"/><path d="m223 193 74-28v30l-74 25Z"/></g>
    <g stroke="#eab45d" fill="none" strokeWidth=".8"><path d="M90 130v80m-5-78h10m-10 78h10M106 219l89 52m-91-57v10m91 43v10M234 46l99 58m-99-65v13m99 46v13"/></g>
    <g fill="#dfb767" fontSize="8" fontFamily="monospace"><text x="61" y="172">Z_AXIS</text><text x="134" y="254">SECTION A</text><text x="267" y="66">DESIGN STUDY</text></g>
    <circle className="led" cx="200" cy="181" r="3" fill="#a5e6f5"/>
  </Svg>;
}

export function PIDPreview(){
  const {t}=useLocale();
  return <Svg viewBox="0 0 420 280" role="img" aria-label={t('PID response illustration')}><rect x="32" y="35" width="356" height="208" rx="8" fill="#18282d" stroke="#91a99c"/><path d="M32 70h356" stroke="#657c78"/><text x="52" y="56" fontFamily="monospace" fontSize="10" fill="#dce6db">PID / CONTROL STUDIO</text><g fill="#92b5aa">{[0,1,2].map(i=><circle key={i} cx={346+i*12} cy="53" r="3" className="led"/>)}</g><g stroke="#34504f" strokeWidth=".7">{[0,1,2,3,4].map(i=><path key={i} d={`M65 ${90+i*30}h290M${65+i*70} 85v130`}/>)}</g><path d="M65 198h48V121h242" fill="none" stroke="#d6b187" strokeWidth="1.5" strokeDasharray="5 5"/><path d="M65 198h48c25 0 24-104 55-104s32 52 61 48 30-27 57-23 42 3 69 2" fill="none" stroke="#93cebf" strokeWidth="3"/><path className="signal" d="M65 198h48c25 0 24-104 55-104s32 52 61 48 30-27 57-23 42 3 69 2" fill="none" stroke="#effaf1" strokeWidth="3"/><text x="70" y="232" fill="#a9c6bc" fontSize="8" fontFamily="monospace">P · I · D</text><text x="251" y="232" fill="#cfb697" fontSize="8" fontFamily="monospace">3 PHYSICS MODELS</text></Svg>;
}
