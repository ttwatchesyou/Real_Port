# PID Lab: model and validation notes

This educational simulator uses **three separate sessions**: a DC motor with an encoder, a torque-actuated inverted pendulum, and an underactuated cart-pole. Each session retains its configuration, state and trace while switching tabs; switching pauses integration. The model parameters are illustrative, not identified from a specific hardware product. These gains are not deployment settings for a physical robot.

## Numerical and controller conventions

`src/lib/pid/engine.ts` is independent of React and rendering. RK4 integrates the nonlinear plant at **2 ms**; sampled control updates at **10 ms**. Frames accumulate fixed steps rather than changing the integration timestep. Long rendering delays are capped at 100 ms of work per frame; use the displayed simulation clock, not a wall-clock stopwatch. Hidden browser tabs pause instead of skipping ahead. Graphs record one sample per 40 ms and retain up to approximately 60 seconds; the motor can keep rotating indefinitely.

The parallel controller is `u = Kp e + I − Kd d(y)/dt`. The derivative uses a first-order filtered **measurement** derivative, so target changes do not create a derivative kick. Conditional integration prevents I from increasing further into output saturation; disabling this option deliberately exposes windup. The I term is cleared when Ki is zero. This structure follows the concepts described in [MathWorks PID Controller documentation](https://www.mathworks.com/help/simulink/slref/pidcontroller.html).

The sign of cart force is inverted at the inner angle controller: pushing the cart right initially accelerates a vertical pole to the left. P/I/D readouts are the terms before this sign inversion. Output limits are physical actuator limits; they do not clamp the plant's angle or position to a successful result.

## DC motor and encoder

The armature and mechanical equations follow the conventional model in [University of Michigan CTMS: DC motor modeling](https://ctms.engin.umich.edu/CTMS/index.php?example=MotorSpeed&section=SystemModeling):

```text
L di/dt = V − R i − Ke ω
J dω/dt = Kt i − b ω − τload
θ̇ = ω;  x = r θ
```

Nominal example values: R = 2 Ω, L = 0.03 H, J = 0.002 kg·m², Kt = Ke = 0.1 in SI units, b = 0.002 N·m·s/rad, voltage ±12 V, wheel radius r = 0.03 m. This is a rigid shaft/wheel approximation without slip, backlash, inductance saturation or a current-limited drive. External load is a **signed constant opposing torque**, not Coulomb friction. There is no hidden feedforward term.

Encoder counts are `round(θ × CPR / 2π)`. CPR means decoded counts per revolution, not an ambiguous pre-quadrature PPR value. Measured RPM is calculated from count differences at 100 Hz with a 25 ms first-order measurement filter. Thus the speed trace is measured/estimated speed rather than a fabricated smooth curve. Encoder samples are held between controller ticks.

- Speed mode: signed RPM reference, continued rotation until paused. The controller's reference ramps at 45 rad/s².
- Travel mode: absolute position relative to the current run's origin, with a positive RPM cap. Outer position PID requests inner-loop speed. Speed saturates at the user cap and is slew-limited; it approaches zero near the travel target. The cap limits the **commanded** speed, not a hard physical speed clamp.
- The estimated maximum no-load speed is `Kt Vmax / (R b + Kt Ke)` in rad/s. Requests above it trigger an explanatory warning. Added load reduces practical capability further.

## Torque-actuated inverted pendulum

Angles are measured from **upright**, positive leaning right. The pendulum is a point mass at length l on a massless rod, with pivot damping b. It uses the simple pendulum dynamics described in [MIT Underactuated Robotics: The Simple Pendulum](https://underactuated.mit.edu/pend.html), expressed in this upright coordinate:

```text
m l² θ̈ = m g l sin(θ) − b θ̇ + τ
```

Nominal values: m = 0.3 kg, l = 0.6 m, b = 0.045 N·m·s/rad, g = 9.81 m/s², torque ±2.5 N·m. The default initial tilt is 10°. The target can be adjusted within ±20°. The actuator applies torque directly at the pivot; this is not a Furuta or reaction-wheel model. No gravity compensation or swing-up controller is hidden behind the PID.

## Cart-pole

The nonlinear equations are based on the point-mass cart-pole derivation in [MIT Underactuated Robotics: Cart-pole](https://underactuated.mit.edu/acrobot.html), transformed to upright = 0 and positive lean to the right, with viscous damping added:

```text
(M + m) ẍ + m l cos(θ) θ̈ − m l sin(θ) θ̇² = F − b ẋ
m l cos(θ) ẍ + m l² θ̈ − m g l sin(θ) = −bp θ̇
```

M = 0.7 kg, nominal m = 0.2 kg, l = 0.5 m, b = 0.08 N·s/m, bp = 0.005 N·m·s/rad, force ±12 N. Outer position PID requests a pole angle capped at ±12° and rate-limited to 20°/s. Inner angle PID commands horizontal cart force. Position and angle therefore remain dynamically coupled. Initial motion away from a requested position can be part of this balancing response; the cart is never directly animated toward the target.

## Feedback, failure and comparison

- Saturation warning requires 250 ms of continuous inner-controller saturation.
- A pendulum angle beyond ±80° stops the run and asks for a reset. It does not teleport upright.
- Cart travel reaching ±1.2 m stops the run without a fabricated collision bounce.
- Non-finite or extreme angular velocity stops integration as a numerical failure.
- “Inside the target band” needs one continuous second: speed ±max(3% of command, 5 RPM); travel ±5 mm; pendulum angle ±1°; cart position ±20 mm AND upright angle ±1°. It is a local tracking indicator, not a stability proof.
- Disturbance buttons inject real state changes: motor shaft velocity ±8 rad/s; pivot pendulum angular velocity ±0.65 rad/s; cart velocity ±0.2 m/s.
- Comparison traces are snapshots. Reset to compare the start of another run; changing motor mode clears comparisons because position and speed have different units.
- CSV uses explicit units and the same samples shown on screen. Simulation clock and data are independent of decorative animation preferences. WebGL-unavailable devices use a 2D pose view with identical physics and graphs.

## Validation

`yarn test:pid-physics` checks motor SI equilibrium against its independently calculated steady-state voltage, encoder consistency, positive and negative travel, stopping, continuous rotation, constant-load rejection, pendulum disturbance recovery, uncontrolled falling, unforced pendulum energy conservation, cart-pole position/recovery, rail stops, output limits, anti-windup behavior and absence of derivative kick on target steps.

`yarn test:pid-ui` checks live drag disturbances and keyboard disturbances, unchanged setpoints, physical response after an impulse, editable numeric fields and signed speed commands.

`yarn test:pid-models` checks the detailed code-built 3D rigs on desktop and mobile, actual camera zoom and reset, dark theme, canvas sizing and browser errors. The geometry depicts representative laboratory equipment rather than a manufacturer's CAD model. Rod length follows the configured SI length with a consistent world scale; the machined bob retains its proportions as the rod length changes. Model poses still come from the same state as the plots.
