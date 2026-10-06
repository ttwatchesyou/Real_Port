'use client';
import { useId } from 'react';
import styled, { keyframes } from 'styled-components';
import type { WorkStudy } from '@/data/workArchive';

const spin = keyframes`to{transform:rotate(360deg);}`;
const signal = keyframes`0%,100%{opacity:.4;}50%{opacity:1;}`;
const flow = keyframes`to{stroke-dashoffset:-32;}`;
const travel = keyframes`0%,100%{transform:translateX(-14px);}50%{transform:translateX(14px);}`;
const Diagram = styled.svg`
  display:block;width:100%;height:100%;color:var(--accent);
  .surface{fill:var(--surface);} .steel{fill:var(--surface-strong);stroke:var(--muted);stroke-width:1.2;}
  .ink{stroke:var(--text);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
  .wire{stroke:var(--warm);fill:none;stroke-width:2;stroke-linejoin:round;}
  .soft{stroke:var(--border);fill:none;stroke-width:1;} .accent{fill:var(--accent);}
  .warm{fill:var(--warm);} .line{stroke:var(--accent);fill:none;stroke-width:2;}
  .flow{stroke-dasharray:5 3;} .led{fill:var(--accent);} .rotor{transform-box:fill-box;transform-origin:center;}
  &[data-motion='on'] .rotor{animation:${spin} 5s linear infinite;}
  &[data-motion='on'] .led{animation:${signal} 2.4s ease-in-out infinite;}
  &[data-motion='on'] .flow{animation:${flow} 2s linear infinite;}
  &[data-motion='on'] .moving{animation:${travel} 5s ease-in-out infinite;}
  body[data-effects='off'] & *{animation:none!important;}
  @media(prefers-reduced-motion:reduce){*{animation:none!important;}}
`;
function Screws({x,y,w,h}:{x:number;y:number;w:number;h:number}) {
  return <g className="soft">{[[x,y],[x+w,y],[x,y+h],[x+w,y+h]].map(([a,b],i)=><g key={i}><circle cx={a} cy={b} r="3"/><path d={`M${a-1.5} ${b}h3`}/></g>)}</g>;
}
function Panel({station=false}:{station?:boolean}) {
  return <><rect x="66" y="49" width="192" height="181" rx="5" className="steel"/><rect x="77" y="60" width="170" height="158" rx="3" className="surface"/><Screws x={72} y={55} w={180} h={169}/>
    <path d="M86 89h151M86 149h151M86 192h151" className="soft"/>
    {[0,1,2].map(i=><g key={i} transform={`translate(${95+i*44} 73)`}><rect width="30" height="54" rx="2" className="steel"/><rect x="7" y="8" width="16" height="22" rx="1" className="surface"/><path d="M15 14v10M7 43h16" className="ink"/><circle cx="15" cy="36" r="2" className="led"/></g>)}
    <path d="M110 127v15h-13v40m57-55v21h5v34m39-55v16h24v39" className="wire flow"/>
    <rect x="101" y="154" width="73" height="28" rx="2" className="steel"/><path d="M109 161h56m-56 6h40" className="soft"/>
    {[0,1,2,3,4,5,6].map(i=><rect key={i} x={91+i*20} y="195" width="14" height="16" rx="1" className="steel"/>)}
    {station&&<g><path d="M279 224h77m-53 0v-35" className="ink"/><circle cx="303" cy="179" r="13" className="steel"/><path d="m306 168 23-54-34-23" className="ink" strokeWidth="12"/><circle cx="329" cy="114" r="8" className="warm"/><circle cx="295" cy="91" r="7" className="steel"/><path d="m289 87-11-12m11 12-13 8" className="ink"/></g>}
    {!station&&<g><path d="M278 101h53v85h-53z" className="steel"/><circle cx="291" cy="122" r="6" className="led"/><circle cx="317" cy="122" r="6" className="warm"/><circle cx="304" cy="160" r="11" className="steel"/><path d="m300 164 8-8" className="ink"/></g>}
  </>;
}
function Water({washer=false}:{washer?:boolean}) {
  return <><rect x="81" y="55" width="91" height="149" rx="7" className="steel"/><rect x="91" y="74" width="71" height="120" rx="4" className="surface"/><path d="M91 129q18-8 35 0t36 0v65H91Z" fill="currentColor" opacity=".23"/><path d="M92 129q18-8 35 0t35 0" className="line"/><path d="M101 88h15m-15 15h10m-10 15h15" className="soft"/>
    <rect x="193" y="169" width="61" height="35" rx="7" className="steel"/><circle cx="218" cy="186" r="11" className="ink rotor"/><path d="m218 177 0 9 8 4m-8-4-8 4" className="line"/>
    <path d="M171 186h21m62 0h34V82h-42" className="ink"/><path d="M174 186h18m62 0h34V82h-42" className="line flow"/>
    <rect x="254" y="49" width="72" height="25" rx="3" className="steel"/><circle cx="315" cy="61" r="3" className="led"/>
    {washer?<><path d="M247 82v21m-7 7v28m7-28v40m7-40v28" className="line flow"/><path d="m205 174 12-28q4-7 7 0l-4 11 24-9q9-2 11 5l-6 21-29 8" className="ink"/></>:<><path d="M197 102h36V65h-18" className="wire flow"/><rect x="187" y="69" width="54" height="39" rx="3" className="steel"/><path d="M194 81h32m-32 8h20" className="line"/><circle cx="232" cy="96" r="3" className="led"/></>}
  </>;
}
function Motor(){return <><path d="M95 216h194m-166-9v9m122-9v9" className="ink"/><rect x="109" y="126" width="140" height="81" rx="15" className="steel"/><ellipse cx="112" cy="166" rx="20" ry="40" className="steel"/>
  {[0,1,2,3,4,5].map(i=><path key={i} d={`M${134+i*15} 138v55`} className="soft"/>)}<path d="M249 166h58" className="ink"/><circle cx="310" cy="166" r="31" className="steel"/><g className="rotor">{[0,1,2,3,4,5,6,7].map(i=><path key={i} d="M310 141v12" transform={`rotate(${i*45} 310 166)`} className="ink"/>)}</g><circle cx="310" cy="166" r="7" className="accent"/>
  <rect x="95" y="48" width="156" height="58" rx="4" className="steel"/><rect x="103" y="56" width="140" height="42" rx="2" className="surface"/><path d="M110 89h126M110 61v28" className="soft"/><path d="m113 85 14-3 11-18 11-1 13 16 14-4 11-7 14 3 28 1" className="line flow"/><path d="M174 106v20m137-20v27" className="wire"/><rect x="279" y="72" width="63" height="34" rx="3" className="steel"/><circle cx="329" cy="83" r="3" className="led"/></>;
}
function Conveyor(){return <><path d="M70 220h263m-222-41-10 40m188-40 10 40" className="ink"/><rect x="70" y="151" width="263" height="29" rx="14" className="steel"/>
  <path d="M86 159h230" className="line flow"/>{[86,117,148,179,210,241,272,317].map(x=><circle key={x} cx={x} cy="168" r="6" className="soft"/>)}
  <g className="moving">{[110,176,242].map(x=><g key={x}><path d={`M${x} 147v-29q0-6 8-8v-13h13v13q8 2 8 8v29z`} className="steel"/><path d={`M${x+4} 134h21v9h-21z`} fill="currentColor" opacity=".3"/></g>)}</g>
  <path d="M214 151V53h-58v30" className="ink"/><rect x="136" y="46" width="93" height="25" rx="3" className="steel"/><path d="M156 87v30" className="line flow"/><rect x="272" y="78" width="51" height="43" rx="3" className="steel"/><path d="M279 88h32m-32 9h21" className="line"/><circle cx="312" cy="111" r="3" className="led"/><path d="M298 121v26" className="wire"/></>;
}
function Omni(){return <><g className="moving"><path d="m200 79 89 128H111Z" className="steel"/><path d="m200 95 68 98H132Z" className="soft"/><circle cx="200" cy="155" r="28" className="steel"/><rect x="181" y="137" width="38" height="30" rx="3" className="surface"/><path d="M186 143h17m-17 7h27" className="wire"/><circle cx="207" cy="158" r="3" className="led"/>
  {[[200,83,0],[120,202,-60],[280,202,60]].map(([x,y,r],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-26" y="-11" width="52" height="22" rx="8" className="steel"/>{[-18,-9,0,9,18].map(a=><ellipse key={a} cx={a} cy="0" rx="3" ry="9" className="ink"/>)}</g>)}<path d="M200 127V98m-22 73-40 22m83-20 44 20" className="wire"/></g><path d="M310 131h32m-9-7 9 7-9 7M71 119v32m-7-9 7 9 7-9" className="line flow"/></>;
}
function Dashboard(){return <><rect x="65" y="53" width="271" height="164" rx="7" className="steel"/><rect x="74" y="63" width="253" height="141" rx="2" className="surface"/><path d="M180 218v16m-32 0h65" className="ink"/><path d="M74 85h253M132 85v119" className="soft"/>
  {[0,1,2,3].map(i=><path key={i} d={`M84 ${103+i*21}h${i===1?35:25}`} className={i===1?'line':'soft'}/>)}<rect x="145" y="98" width="104" height="91" rx="2" className="steel"/><path d="M157 110h81m-81 15h81m-81 15h81m-81 15h81m-81 15h81M166 110v67m19-67v67m19-67v67m19-67v67" className="soft"/><path d="m156 177 15-21 29 2 11-39 24-6" className="line flow"/><circle cx="211" cy="119" r="5" className="led"/><rect x="260" y="98" width="54" height="36" rx="3" className="steel"/><path d="M267 110h32m-32 10h19" className="line"/><path d="m261 178 12-12 13 3 12-19 16 5" className="wire flow"/></>;
}
function Garage(){return <><path d="M73 213V84l92-40 95 40v129Z" className="steel"/><path d="M93 213V94h147v119" className="ink"/><path d="M95 106h143m-143 14h143m-143 14h143m-143 14h143" className="soft"/><g className="moving"><path d="m111 193 10-24h71l12 24v17h-93z" className="steel"/><path d="m125 174-5 13h76l-8-13z" className="surface"/><circle cx="128" cy="210" r="8" className="ink"/><circle cx="189" cy="210" r="8" className="ink"/></g><path d="M304 213v-85m-1 0-47-32" className="ink"/><circle cx="304" cy="128" r="6" className="warm"/><rect x="291" y="160" width="27" height="20" rx="3" className="steel"/><circle cx="304" cy="170" r="3" className="led"/></>;
}
function Air(){return <><rect x="133" y="49" width="136" height="178" rx="15" className="steel"/><rect x="144" y="63" width="114" height="31" rx="5" className="surface"/><path d="M152 76h54m-54 8h30" className="line"/><circle cx="247" cy="77" r="4" className="led"/>
  {[0,1,2,3,4,5,6,7].map(i=><path key={i} d={`M147 ${111+i*12}h107`} className="soft"/>)}<g className="rotor"><circle cx="201" cy="157" r="27" className="soft"/><path d="M201 157q-30-31 0-23q18 6 0 23q43-12 21 10q-15 13-21-10q-11 43-20 13q-4-18 20-13" className="line"/></g><path d="M82 112h32m-32 32h32m-32 32h32m169-64h33m-33 32h33m-33 32h33" className="line flow"/></>;
}
function Reaction(){return <><path d="m97 208 27-137h157l27 137z" className="steel"/><rect x="161" y="83" width="80" height="32" rx="4" className="surface"/><path d="M172 98h55" className="line"/>{[[144,139],[201,139],[258,139],[135,182],[201,182],[267,182]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="18" className="steel"/><circle cx={x} cy={y} r="11" className={i===1?'led':'warm'}/></g>)}<Screws x={121} y={199} w={163} h={0}/></>;
}
function Counter(){return <><path d="M95 220V54h179v166m-162 0V72h145v148" className="steel"/><rect x="116" y="82" width="137" height="40" rx="3" className="steel"/><path d="M132 101h46m13 0h46" className="line"/><rect x="101" y="151" width="15" height="22" rx="2" className="steel"/><rect x="257" y="151" width="15" height="22" rx="2" className="steel"/><path d="M118 162h137" className="line flow"/><g className="moving"><circle cx="185" cy="140" r="11" className="steel"/><path d="M185 152v31m0-20-17 13m17-13 17 13m-17 7-12 30m12-30 12 30" className="ink"/></g><path d="M309 111q-16-17-32 0m26 9q-10-10-20 0m16 9q-5-5-10 0" className="line"/><circle cx="294" cy="136" r="3" className="led"/></>;
}
export default function WorkIllustration({visual,motion=true}:{visual:WorkStudy['visual'];motion?:boolean}){
  const id=useId().replace(/:/g,'');
  return <Diagram viewBox="0 0 400 270" fill="none" aria-hidden="true" data-motion={motion?'on':'off'}>
    <defs><pattern id={`grid${id}`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" stroke="currentColor" opacity=".08"/></pattern></defs>
    <rect width="400" height="270" fill={`url(#grid${id})`}/><ellipse cx="201" cy="234" rx="131" ry="10" fill="currentColor" opacity=".07"/>
    <path d="M26 26h13m-13 0v13m348-13h-13m13 0v13M26 244h13m-13 0v-13m348 13h-13m13 0v-13" className="soft"/>
    {visual==='panel'||visual==='station'?<Panel station={visual==='station'}/>:visual==='water'||visual==='washer'?<Water washer={visual==='washer'}/>:visual==='motor'?<Motor/>:visual==='conveyor'?<Conveyor/>:visual==='omni'?<Omni/>:visual==='dashboard'?<Dashboard/>:visual==='garage'?<Garage/>:visual==='air'?<Air/>:visual==='reaction'?<Reaction/>:<Counter/>}
  </Diagram>;
}
