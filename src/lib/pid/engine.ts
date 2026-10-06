/** Deterministic nonlinear teaching models, SI units, 500 Hz physics / 100 Hz control.
 * See docs/pid-models.md for equations, conventions and limitations.
 */
export type Plant = 'motor' | 'pendulum' | 'cart';
export type Gains = { kp: number; ki: number; kd: number };
export type Config = {
  plant: Plant; mode: 'speed' | 'position'; target: number; speed: number;
  gains: Gains; outer: Gains; limit: number; mass: number; length: number;
  friction: number; initialAngle: number; load: number; cpr: number;
  antiWindup: boolean; derivativeTau: number;
};
export type PIDMemory = { integral: number; derivative: number; previous: number; initialized: boolean; p: number; i: number; d: number; raw: number; saturated: boolean };
export type Sample = { t: number; target: number; value: number; speed: number; speedTarget: number; angle: number; angleTarget: number; position: number; effort: number; current: number; encoder: number; p: number; i: number; d: number };
export type Failure = 'fallen' | 'rail' | 'numeric' | null;
export type State = {
  t: number; tick: number; x: number; v: number; theta: number; omega: number; current: number;
  measuredSpeed: number; lastEncoder: number; encoder: number; speedTarget: number; angleTarget: number;
  effort: number; saturatedFor: number; inBandFor: number; failure: Failure; inner: PIDMemory; outer: PIDMemory;
};
export const DT = .002;
export const CONTROL_DT = .01;
export const MOTOR = { R: 2, L: .03, J: .002, K: .1, radius: .03, acceleration: 45 };
export const CART_MASS = .7;
export const RAIL = 1.2;
export const G = 9.81;
export const rad = (degree: number) => degree * Math.PI / 180;
export const deg = (radian: number) => radian * 180 / Math.PI;
export const rpm = (radianPerSecond: number) => radianPerSecond * 30 / Math.PI;
export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
export const memory = (): PIDMemory => ({ integral:0, derivative:0, previous:0, initialized:false, p:0, i:0, d:0, raw:0, saturated:false });
export function defaults(plant: Plant): Config {
  const shared = { plant, mode:'speed' as const, antiWindup:true, derivativeTau:.035, cpr:2048, load:0 };
  if (plant==='motor') return {...shared,target:.5,speed:180,gains:{kp:.7,ki:2.8,kd:.003},outer:{kp:45,ki:0,kd:1.5},limit:12,mass:.3,length:.6,friction:.002,initialAngle:0};
  if (plant==='pendulum') return {...shared,target:0,speed:0,gains:{kp:8,ki:.6,kd:1.2},outer:{kp:0,ki:0,kd:0},limit:2.5,mass:.3,length:.6,friction:.045,initialAngle:10};
  return {...shared,target:0,speed:0,gains:{kp:45,ki:.4,kd:10},outer:{kp:.12,ki:.005,kd:.18},limit:12,mass:.2,length:.5,friction:.08,initialAngle:5};
}
export function initialState(c: Config): State {
  return {t:0,tick:0,x:0,v:0,theta:c.plant==='motor'?0:rad(c.initialAngle),omega:0,current:0,measuredSpeed:0,lastEncoder:0,encoder:0,speedTarget:0,angleTarget:0,effort:0,saturatedFor:0,inBandFor:0,failure:null,inner:memory(),outer:memory()};
}
/** Parallel PID, derivative on measurement (no setpoint derivative kick), filtered D.
 * Conditional integration prevents further windup while output saturates.
 */
export function pid(reference: number, measurement: number, gains: Gains, m: PIDMemory, limit: number, dt: number, antiWindup: boolean, tau: number): number {
  const error = reference-measurement;
  const rate = m.initialized ? (measurement-m.previous)/dt : 0;
  m.derivative += dt/(Math.max(.001,tau)+dt)*(rate-m.derivative);
  m.previous=measurement;m.initialized=true;
  m.p=gains.kp*error;m.d=-gains.kd*m.derivative;
  if(gains.ki===0)m.integral=0;
  const change=gains.ki*error*dt;
  const trial=m.p+m.integral+change+m.d;
  if(!antiWindup || !((trial>limit&&change>0)||(trial < -limit&&change<0)))m.integral+=change;
  // Numeric guard only, deliberately much wider than actuator saturation to expose windup.
  m.integral=clamp(m.integral,-1e4,1e4);m.i=m.integral;m.raw=m.p+m.i+m.d;
  m.saturated=Math.abs(m.raw)>limit;
  return clamp(m.raw,-limit,limit);
}
function rk4(y:number[],h:number,f:(y:number[])=>number[]):number[]{
  const a=f(y),b=f(y.map((v,i)=>v+h*a[i]/2)),c=f(y.map((v,i)=>v+h*b[i]/2)),d=f(y.map((v,i)=>v+h*c[i]));
  return y.map((v,i)=>v+h*(a[i]+2*b[i]+2*c[i]+d[i])/6);
}
function control(s: State, c: Config) {
  if(c.plant==='motor'){
    s.encoder=Math.round(s.theta/(2*Math.PI)*c.cpr);
    const rawSpeed=(s.encoder-s.lastEncoder)*2*Math.PI/c.cpr/CONTROL_DT;
    s.measuredSpeed+=CONTROL_DT/(.025+CONTROL_DT)*(rawSpeed-s.measuredSpeed);s.lastEncoder=s.encoder;
    let request=c.speed*Math.PI/30;
    if(c.mode==='position'){
      const measuredDistance=s.encoder*2*Math.PI/c.cpr*MOTOR.radius;
      request=pid(c.target,measuredDistance,c.outer,s.outer,Math.abs(c.speed)*Math.PI/30,CONTROL_DT,c.antiWindup,c.derivativeTau);
    }
    s.speedTarget+=clamp(request-s.speedTarget,-MOTOR.acceleration*CONTROL_DT,MOTOR.acceleration*CONTROL_DT);
    s.effort=pid(s.speedTarget,s.measuredSpeed,c.gains,s.inner,c.limit,CONTROL_DT,c.antiWindup,c.derivativeTau);
  }else if(c.plant==='pendulum'){
    s.angleTarget=rad(c.target);
    s.effort=pid(s.angleTarget,s.theta,c.gains,s.inner,c.limit,CONTROL_DT,c.antiWindup,c.derivativeTau);
  }else{
    const desired=pid(c.target,s.x,c.outer,s.outer,rad(12),CONTROL_DT,c.antiWindup,.06);
    s.angleTarget+=clamp(desired-s.angleTarget,-rad(20)*CONTROL_DT,rad(20)*CONTROL_DT);
    // Positive cart force produces negative angular acceleration at the upright.
    s.effort=-pid(s.angleTarget,s.theta,c.gains,s.inner,c.limit,CONTROL_DT,c.antiWindup,c.derivativeTau);
  }
  s.saturatedFor=s.inner.saturated?s.saturatedFor+CONTROL_DT:0;
}
export function step(s: State,c: Config):State{
  if(s.failure)return s;
  if(s.tick%5===0)control(s,c);
  if(c.plant==='motor'){
    const next=rk4([s.theta,s.omega,s.current],DT,([,w,i])=>[w,(MOTOR.K*i-c.friction*w-c.load)/MOTOR.J,(s.effort-MOTOR.R*i-MOTOR.K*w)/MOTOR.L]);
    [s.theta,s.omega,s.current]=next;s.x=s.theta*MOTOR.radius;s.v=s.omega*MOTOR.radius;
  }else if(c.plant==='pendulum'){
    const inertia=c.mass*c.length*c.length;
    [s.theta,s.omega]=rk4([s.theta,s.omega],DT,([a,w])=>[w,(c.mass*G*c.length*Math.sin(a)-c.friction*w+s.effort)/inertia]);
  }else{
    [s.x,s.v,s.theta,s.omega]=rk4([s.x,s.v,s.theta,s.omega],DT,([,v,a,w])=>{
      const sin=Math.sin(a),cos=Math.cos(a),bp=.005;
      const acceleration=(s.effort-c.friction*v+c.mass*c.length*sin*w*w-c.mass*G*sin*cos+bp*w*cos/c.length)/(CART_MASS+c.mass*sin*sin);
      return [v,acceleration,w,(G*sin-acceleration*cos-bp*w/(c.mass*c.length))/c.length];
    });
  }
  s.tick++;s.t=s.tick*DT;
  if(![s.x,s.v,s.theta,s.omega,s.current].every(Number.isFinite)||Math.abs(s.omega)>1e5)s.failure='numeric';
  if(c.plant!=='motor'&&Math.abs(s.theta)>rad(80))s.failure='fallen';
  if(c.plant==='cart'&&Math.abs(s.x)>=RAIL)s.failure='rail';
  const error=c.plant==='motor'?(c.mode==='speed'?Math.abs(rpm(s.measuredSpeed)-c.speed)/Math.max(5,Math.abs(c.speed)*.03):Math.abs(s.x-c.target)/.005):c.plant==='pendulum'?Math.abs(deg(s.theta)-c.target)/1:Math.max(Math.abs(s.x-c.target)/.02,Math.abs(deg(s.theta))/1);
  s.inBandFor=error<=1?s.inBandFor+DT:0;
  return s;
}
export function sample(s: State,c: Config):Sample{
  const value=c.plant==='motor'?(c.mode==='speed'?rpm(s.measuredSpeed):s.encoder*2*Math.PI/c.cpr*MOTOR.radius):c.plant==='pendulum'?deg(s.theta):s.x;
  return {t:s.t,target:c.plant==='motor'&&c.mode==='speed'?c.speed:c.target,value,speed:rpm(s.measuredSpeed),speedTarget:rpm(s.speedTarget),position:s.x,angle:deg(s.theta),angleTarget:deg(s.angleTarget),effort:s.effort,current:s.current,encoder:s.encoder,p:s.inner.p,i:s.inner.i,d:s.inner.d};
}
export function disturb(s:State,c:Config,impulse:number){
  if(s.failure)return;
  const amount=clamp(impulse,-4,4);
  if(c.plant==='motor')s.omega+=amount*8;
  else if(c.plant==='pendulum')s.omega+=amount*.65;
  else s.v+=amount*.2;
  s.inBandFor=0;
}
export function noLoadRPM(c:Config){return rpm(MOTOR.K*c.limit/(MOTOR.R*c.friction+MOTOR.K*MOTOR.K));}
