"use client";

import { useEffect, useRef } from "react";
import styles from "./oobe-landing.module.scss";

const fragmentShaderSource = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

const int N = 7;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec3 palette(float t) {
  vec3 blue = vec3(0.10, 0.35, 0.95);
  vec3 violet = vec3(0.45, 0.25, 0.95);
  vec3 cyan = vec3(0.05, 0.70, 0.95);
  float u = fract(t);

  if (u < 0.5) {
    return mix(blue, violet, u * 2.0);
  }

  return mix(violet, cyan, (u - 0.5) * 2.0);
}

void main() {
  vec2 frag = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 uv = vec2(frag.x * aspect, frag.y);
  vec3 col = mix(vec3(0.004, 0.007, 0.020), vec3(0.015, 0.030, 0.090), frag.y * 0.9);

  float t = u_time;
  float intro = smoothstep(0.0, 6.0, t);

  for (int i = 0; i < N; i++) {
    float fi = float(i);
    float h1 = hash(vec2(fi, 1.3));
    float h2 = hash(vec2(fi, 7.7));
    float h3 = hash(vec2(fi, 3.1));
    float sp = 0.03 + 0.05 * h1;

    vec2 orbit = vec2(0.30 + 0.25 * h2, 0.22 + 0.18 * h3);
    vec2 pos = vec2(0.5 * aspect, 0.5)
      + vec2(sin(t * sp * (1.0 + 0.7 * h3) + h1 * 6.2831) * orbit.x,
             cos(t * sp * (1.3 + 0.5 * h2) + h2 * 6.2831) * orbit.y);

    float base = 0.16 + 0.30 * h2;
    float breathe = 0.75 + 0.35 * sin(t * (0.15 + 0.25 * h3) + h1 * 6.2831);
    float r = base * breathe * mix(0.15, 1.0, intro);
    float d = length(uv - pos);
    float body = exp(-(d * d) / (r * r) * 2.2);
    float disc = smoothstep(r, r * 0.35, d);
    float glow = mix(body, disc, 0.30);
    float amp = 0.20 + 0.25 * h3;

    amp *= 0.8 + 0.3 * sin(t * (0.2 + 0.3 * h1) + h2 * 6.2831);
    col += palette(h1 + 0.15 * fi) * glow * amp;
  }

  vec2 vc = frag - 0.5;
  col *= 1.0 - dot(vc, vc) * 0.55;
  col = 1.0 - exp(-col * 1.25);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}`;

const vertexShaderSource = `
attribute vec2 a_pos;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

type StopAnimation = () => void;

function getTimeScale() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.25 : 1;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function startWebGL(canvas: HTMLCanvasElement): StopAnimation | null {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
  });

  if (!gl) {
    return null;
  }

  const webgl: WebGLRenderingContext = gl;
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource,
  );

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }

  gl.useProgram(program);

  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );

  const positionLocation = gl.getAttribLocation(program, "a_pos");

  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const resolutionLocation = gl.getUniformLocation(program, "u_res");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const timeScale = getTimeScale();
  const startTime = performance.now();
  let animationFrameId = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    webgl.viewport(0, 0, canvas.width, canvas.height);
  }

  function frame() {
    webgl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    webgl.uniform1f(
      timeLocation,
      (performance.now() - startTime) * 0.001 * timeScale,
    );
    webgl.drawArrays(webgl.TRIANGLES, 0, 3);
    animationFrameId = window.requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  frame();

  return () => {
    window.cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resize);
  };
}

function fract(value: number) {
  return value - Math.floor(value);
}

function start2D(canvas: HTMLCanvasElement): StopAnimation {
  const context = canvas.getContext("2d");

  if (!context) {
    return () => undefined;
  }

  const drawingContext: CanvasRenderingContext2D = context;
  const colors = [
    [40, 100, 245],
    [115, 65, 245],
    [15, 180, 240],
    [60, 130, 250],
    [140, 90, 245],
    [25, 160, 235],
    [80, 80, 250],
  ];
  const lights = colors.map((color, index) => ({
    color,
    h1: fract(Math.sin(index * 12.9898) * 43758.5453),
    h2: fract(Math.sin(index * 78.233) * 43758.5453),
    h3: fract(Math.sin(index * 39.425) * 43758.5453),
  }));
  const timeScale = getTimeScale();
  const startTime = performance.now();
  let animationFrameId = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
  }

  function frame() {
    const time = (performance.now() - startTime) * 0.001 * timeScale;
    const width = canvas.width;
    const height = canvas.height;
    const intro = Math.min(time / 6, 1);
    const background = drawingContext.createLinearGradient(0, height, 0, 0);

    drawingContext.globalCompositeOperation = "source-over";
    background.addColorStop(0, "#010205");
    background.addColorStop(1, "#040817");
    drawingContext.fillStyle = background;
    drawingContext.fillRect(0, 0, width, height);
    drawingContext.globalCompositeOperation = "lighter";

    for (const light of lights) {
      const speed = 0.03 + 0.05 * light.h1;
      const x =
        width * 0.5 +
        Math.sin(time * speed * (1 + 0.7 * light.h3) + light.h1 * 6.28) *
          width *
          (0.28 + 0.22 * light.h2);
      const y =
        height * 0.5 +
        Math.cos(time * speed * (1.3 + 0.5 * light.h2) + light.h2 * 6.28) *
          height *
          (0.22 + 0.18 * light.h3);
      const breathe =
        0.75 + 0.35 * Math.sin(time * (0.15 + 0.25 * light.h3) + light.h1 * 6.28);
      const radius =
        Math.min(width, height) *
        (0.18 + 0.3 * light.h2) *
        breathe *
        (0.15 + 0.85 * intro);
      const alpha =
        (0.1 + 0.14 * light.h3) *
        (0.8 + 0.3 * Math.sin(time * (0.2 + 0.3 * light.h1)));
      const gradient = drawingContext.createRadialGradient(x, y, 0, x, y, radius);
      const [red, green, blue] = light.color;

      gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${alpha})`);
      gradient.addColorStop(
        0.6,
        `rgba(${red}, ${green}, ${blue}, ${alpha * 0.5})`,
      );
      gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);

      drawingContext.fillStyle = gradient;
      drawingContext.beginPath();
      drawingContext.arc(x, y, radius, 0, Math.PI * 2);
      drawingContext.fill();
    }

    animationFrameId = window.requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  frame();

  return () => {
    window.cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resize);
  };
}

export default function OobeLandingHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    return startWebGL(canvas) ?? start2D(canvas);
  }, []);

  return (
    <main className={styles.hero} aria-labelledby="production-landing-title">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>
        <h1 id="production-landing-title" className={styles.title}>
          Building...
        </h1>
        <span className={styles.brand}>TZ</span>
      </div>
    </main>
  );
}
