import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from 'ogl';
import './MetaBalls.css';

function parseHexColor(hex: string): [number, number, number] {
  const c = hex.replace('#', '');
  return [
    parseInt(c.substring(0, 2), 16) / 255,
    parseInt(c.substring(2, 4), 16) / 255,
    parseInt(c.substring(4, 6), 16) / 255,
  ];
}

function fract(x: number) { return x - Math.floor(x); }

function hash31(p: number): [number, number, number] {
  let r: [number, number, number] = [fract(p * 0.1031), fract(p * 0.103), fract(p * 0.0973)];
  const dotVal = r[0] * (r[1] + 33.33) + r[1] * (r[2] + 33.33) + r[2] * (r[0] + 33.33);
  return [fract(r[0] + dotVal), fract(r[1] + dotVal), fract(r[2] + dotVal)];
}

function hash33(v: [number, number, number]): [number, number, number] {
  let p: [number, number, number] = [fract(v[0] * 0.1031), fract(v[1] * 0.103), fract(v[2] * 0.0973)];
  const dotVal = p[0] * (p[1] + 33.33) + p[1] * (p[0] + 33.33) + p[2] * (p[1] + 33.33);
  p = [fract(p[0] + dotVal), fract(p[1] + dotVal), fract(p[2] + dotVal)];
  return [fract((p[0] + p[1]) * p[2]), fract((p[0] + p[0]) * p[1]), fract((p[1] + p[0]) * p[0])];
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;

float getMetaBallValue(vec2 c, float r, vec2 p) {
  vec2 d = p - c;
  float dist2 = dot(d, d);
  return (r * r) / dist2;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float scale = iAnimationSize / iResolution.y;
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
  float m1 = 0.0;
  for (int i = 0; i < 50; i++) {
    if (i >= iBallCount) break;
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
  }
  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
  float total = m1 + m2;
  float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
  vec3 cFinal = vec3(0.0);
  if (total > 0.0) {
    float alpha1 = m1 / total;
    float alpha2 = m2 / total;
    cFinal = iColor * alpha1 + iCursorColor * alpha2;
  }
  outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}`;

interface MetaBallsProps {
  className?: string;
  color?: string;
  cursorBallColor?: string;
  cursorBallSize?: number;
  ballCount?: number;
  animationSize?: number;
  enableMouseInteraction?: boolean;
  enableTransparency?: boolean;
  hoverSmoothness?: number;
  clumpFactor?: number;
  speed?: number;
  opacity?: number;
}

const MetaBalls = ({
  className = '',
  color = '#ffffff',
  cursorBallColor = '#ffffff',
  cursorBallSize = 1,
  ballCount = 16,
  animationSize = 35,
  enableMouseInteraction = true,
  enableTransparency = true,
  hoverSmoothness = 0.088,
  clumpFactor = 1,
  speed = 0.3,
  opacity = 1,
}: MetaBallsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr = 1;
    const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10 });
    camera.position.z = 1;

    const geometry = new Triangle(gl);
    const [r1, g1, b1] = parseHexColor(color);
    const [r2, g2, b2] = parseHexColor(cursorBallColor);

    const metaBallsUniform: Vec3[] = [];
    for (let i = 0; i < 50; i++) metaBallsUniform.push(new Vec3(0, 0, 0));

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(r1, g1, b1) },
        iCursorColor: { value: new Vec3(r2, g2, b2) },
        iAnimationSize: { value: animationSize },
        iBallCount: { value: ballCount },
        iCursorBallSize: { value: cursorBallSize },
        iMetaBalls: { value: metaBallsUniform },
        iClumpFactor: { value: clumpFactor },
        enableTransparency: { value: enableTransparency },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    const effectiveBallCount = Math.min(ballCount, 50);
    const ballParams = [];
    for (let i = 0; i < effectiveBallCount; i++) {
      const idx = i + 1;
      const h1 = hash31(idx);
      const h2 = hash33(h1);
      ballParams.push({
        st: h1[0] * (2 * Math.PI),
        dtFactor: 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI),
        baseScale: 5.0 + h1[1] * 5.0,
        toggle: Math.floor(h2[0] * 2.0),
        radius: 0.5 + h2[2] * 1.5,
      });
    }

    const mouseBallPos = { x: 0, y: 0 };
    let pointerX = 0;
    let pointerY = 0;
    let pointerInside = false;

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + 'px';
      gl.canvas.style.height = height + 'px';
      (program.uniforms.iResolution.value as Vec3).set(gl.canvas.width, gl.canvas.height, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    // Listen on document so pointer-events:none on container doesn't block tracking
    function onPointerMove(e: PointerEvent) {
      if (!enableMouseInteraction) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      pointerInside = px >= 0 && py >= 0 && px <= rect.width && py <= rect.height;
      if (pointerInside) {
        pointerX = (px / rect.width) * gl.canvas.width;
        pointerY = (1 - py / rect.height) * gl.canvas.height;
      }
    }
    document.addEventListener('pointermove', onPointerMove);

    const startTime = performance.now();
    let animationFrameId: number;

    function update(t: number) {
      animationFrameId = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      program.uniforms.iTime.value = elapsed;

      for (let i = 0; i < effectiveBallCount; i++) {
        const p = ballParams[i];
        const dt = elapsed * speed * p.dtFactor;
        const th = p.st + dt;
        metaBallsUniform[i].set(
          Math.cos(th) * p.baseScale * clumpFactor,
          Math.sin(th + dt * p.toggle) * p.baseScale * clumpFactor,
          p.radius,
        );
      }

      let targetX: number, targetY: number;
      if (pointerInside) {
        targetX = pointerX;
        targetY = pointerY;
      } else {
        const cx = gl.canvas.width * 0.5;
        const cy = gl.canvas.height * 0.5;
        targetX = cx + Math.cos(elapsed * speed) * gl.canvas.width * 0.15;
        targetY = cy + Math.sin(elapsed * speed) * gl.canvas.height * 0.15;
      }
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;
      (program.uniforms.iMouse.value as Vec3).set(mouseBallPos.x, mouseBallPos.y, 0);

      renderer.render({ scene, camera });
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('pointermove', onPointerMove);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, cursorBallColor, speed, enableMouseInteraction, hoverSmoothness, animationSize, ballCount, clumpFactor, cursorBallSize, enableTransparency]);

  return <div ref={containerRef} className={`metaballs-container${className ? ' ' + className : ''}`} style={{ opacity }} />;
};

export default MetaBalls;
