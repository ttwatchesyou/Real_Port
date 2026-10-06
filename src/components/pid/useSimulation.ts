'use client';
import { useEffect, useRef, useState } from 'react';
import { defaults, initialState, sample, step, disturb, memory, DT, type Config, type Plant, type State, type Sample } from '@/lib/pid/engine';
export type Session = { config:Config; state:State; history:Sample[]; baseline:Sample[]; notice:string };
function session(plant:Plant):Session{const config=defaults(plant),state=initialState(config);return {config,state,history:[sample(state,config)],baseline:[],notice:''};}
export function useSimulation(){
  const sessions=useRef<Record<Plant,Session>>({motor:session('motor'),pendulum:session('pendulum'),cart:session('cart')});
  const [plant,setPlant]=useState<Plant>('motor'),[running,setRunning]=useState(false),[revision,setRevision]=useState(0);
  const selected=useRef<Plant>(plant);selected.current=plant;
  const runningRef=useRef(running);runningRef.current=running;
  const publish=()=>setRevision(v=>v+1);
  useEffect(()=>{
    let frame=0,last=performance.now(),accumulator=0,lastPublish=0;
    const tick=(now:number)=>{
      const elapsed=Math.min(.1,(now-last)/1000);last=now;
      if(runningRef.current){
        accumulator+=elapsed;const active=sessions.current[selected.current];
        while(accumulator>=DT){step(active.state,active.config);accumulator-=DT;if(active.state.tick%20===0){active.history.push(sample(active.state,active.config));if(active.history.length>1501)active.history.shift();}if(active.state.failure){active.history.push(sample(active.state,active.config));runningRef.current=false;setRunning(false);break;}}
        if(now-lastPublish>=40){publish();lastPublish=now;}
      }else accumulator=0;
      frame=requestAnimationFrame(tick);
    };
    const visibility=()=>{if(document.hidden){runningRef.current=false;setRunning(false);sessions.current[selected.current].notice='pausedTab';publish();}};
    frame=requestAnimationFrame(tick);document.addEventListener('visibilitychange',visibility);
    return()=>{cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',visibility);};
  },[]);
  const switchPlant=(next:Plant)=>{runningRef.current=false;setRunning(false);setPlant(next);selected.current=next;};
  const reset=(preset?:Config)=>{const current=sessions.current[plant];runningRef.current=false;setRunning(false);if(preset)current.config=preset;current.state=initialState(current.config);current.history=[sample(current.state,current.config)];current.notice='';publish();};
  const update=(change:Partial<Config>,newRun=false)=>{
    const current=sessions.current[plant];current.config={...current.config,...change};current.notice='';
    if(newRun){reset(current.config);return;}
    current.state.inBandFor=0;publish();
  };
  const command=(change:Partial<Config>)=>{const current=sessions.current[plant];update(change);current.state.inner=memory();current.state.outer=memory();current.history.push(sample(current.state,current.config));current.notice='commandApplied';publish();};
  const toggle=()=>{const current=sessions.current[plant];if(current.state.failure)return;runningRef.current=!runningRef.current;setRunning(runningRef.current);current.notice='';};
  const push=(direction:number)=>{disturb(sessions.current[plant].state,sessions.current[plant].config,direction);sessions.current[plant].notice='disturbed';publish();};
  // Pointer movement injects an impulse into the plant; it never changes its setpoint.
  const pointerDisturb=(impulse:number)=>{
    const current=sessions.current[plant];
    if(current.config.plant==='motor')return;
    if(!runningRef.current){current.notice='startBeforeDrag';publish();return;}
    disturb(current.state,current.config,impulse);
    current.history.push(sample(current.state,current.config));if(current.history.length>1501)current.history.shift();
    current.notice='pointerDisturb';publish();
  };
  const save=()=>{const current=sessions.current[plant];current.baseline=current.history.map(s=>({...s,t:s.t-current.history[0].t}));current.notice='savedRun';publish();};
  const clearBaseline=()=>{sessions.current[plant].baseline=[];publish();};
  return {plant,running,revision,active:sessions.current[plant],sessions,switchPlant,reset,update,command,toggle,push,pointerDisturb,save,clearBaseline};
}
