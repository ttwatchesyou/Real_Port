import assert from 'node:assert/strict';
import {defaults,initialState,step,sample,pid,memory,DT,MOTOR,G,rad,deg,rpm,disturb} from '../src/lib/pid/engine.ts';
const run=(c,seconds,s=initialState(c))=>{for(let i=0;i<Math.round(seconds/DT)&&!s.failure;i++)step(s,c);return s;};
// DC steady state independently follows K*i=b*w+load and V=R*i+K*w.
const motor=defaults('motor');const settled=run(motor,12);
assert.ok(Math.abs(rpm(settled.omega)-motor.speed)<1);
const expectedVoltage=(MOTOR.R*motor.friction/MOTOR.K+MOTOR.K)*motor.speed*Math.PI/30;
assert.ok(Math.abs(settled.effort-expectedVoltage)<.1);
assert.ok(Math.abs(settled.encoder-settled.theta*2048/(2*Math.PI))<70,'Encoder represents quantized physical rotation, held at 100 Hz');
const currentAtSpeed=MOTOR.K*settled.current-motor.friction*settled.omega;
assert.ok(Math.abs(currentAtSpeed)<.01);
const loaded={...motor,load:.1};const loadedState=run(loaded,15);assert.ok(Math.abs(rpm(loadedState.omega)-180)<1.5,'Integral action rejects constant motor load');
for(const target of [-1,-.5,.5,1]){
 const config={...motor,mode:'position',target};const s=run(config,15);
 assert.ok(Math.abs(s.x-target)<.005,`Travel ${target} m must settle near target`);assert.ok(Math.abs(s.omega)<.2,'Travel mode stops rotation at the target');
}
const reverse=run({...motor,speed:-180},12);assert.ok(Math.abs(rpm(reverse.omega)+180)<1);
const rotating=run(motor,20),before=rotating.theta;run(motor,20,rotating);assert.ok(rotating.theta-before>300,'Speed mode continues rotating rather than stopping at a distance');
for(const initialAngle of [-15,5,15]){const c={...defaults('pendulum'),initialAngle};const s=run(c,15);assert.equal(s.failure,null);assert.ok(Math.abs(deg(s.theta))<.3);disturb(s,c,1);run(c,8,s);assert.ok(Math.abs(deg(s.theta))<.5,'Pendulum must recover from the documented disturbance');}
const gravityOnly={...defaults('pendulum'),gains:{kp:0,ki:0,kd:0}};const fallen=run(gravityOnly,6);assert.equal(fallen.failure,'fallen','No PID must not magically balance an inverted pendulum');assert.ok(Math.abs(deg(fallen.theta))>80);
const conservative={...gravityOnly,friction:0,initialAngle:10};const start=initialState(conservative);const energy=s=>.5*conservative.mass*conservative.length**2*s.omega**2+conservative.mass*G*conservative.length*Math.cos(s.theta);const initialEnergy=energy(start);run(conservative,.2,start);assert.ok(Math.abs(energy(start)-initialEnergy)<1e-7,'Unforced frictionless pendulum conserves mechanical energy');
for(const target of [-.4,0,.4]){
 const c={...defaults('cart'),target};const s=run(c,25);assert.equal(s.failure,null);assert.ok(Math.abs(s.x-target)<.02);assert.ok(Math.abs(deg(s.theta))<1);disturb(s,c,-1);run(c,12,s);assert.equal(s.failure,null);assert.ok(Math.abs(s.x-target)<.025);assert.ok(Math.abs(deg(s.theta))<1);
}
const railConfig=defaults('cart'),atRail=initialState(railConfig);atRail.x=1.199;atRail.v=1;step(atRail,railConfig);assert.equal(atRail.failure,'rail');const stoppedTime=atRail.t;run(railConfig,1,atRail);assert.equal(atRail.t,stoppedTime);
// Limit/anti-windup and derivative behavior tested independently from plant integration.
const a=memory(),b=memory();for(let i=0;i<1000;i++){assert.ok(Math.abs(pid(100,0,{kp:2,ki:4,kd:.2},a,12,.01,true,.03))<=12);pid(100,0,{kp:2,ki:4,kd:.2},b,12,.01,false,.03);}
assert.ok(Math.abs(a.integral)<1);assert.ok(b.integral>1000);
const d=memory();pid(0,2,{kp:0,ki:0,kd:5},d,100,.01,true,.03);assert.equal(pid(100,2,{kp:0,ki:0,kd:5},d,100,.01,true,.03),0,'D on measurement must not kick on a reference step');
for(const plant of ['motor','pendulum','cart']){const c=defaults(plant);const s=initialState(c);for(let i=0;i<6000&&!s.failure;i++){step(s,c);assert.ok(Number.isFinite(s.theta)&&Number.isFinite(s.x));assert.ok(Math.abs(s.effort)<=c.limit+1e-12);}assert.equal(s.failure,null);}
console.log('PASS: SI motor equilibrium, encoder feedback, signed speed, continuous rotation, +/- travel and stopping, load rejection, inverted-pendulum recovery and genuine falling, energy conservation, cart-pole positioning/recovery, rail stop, saturation, anti-windup, derivative-on-measurement, finite bounded nominal runs.');
