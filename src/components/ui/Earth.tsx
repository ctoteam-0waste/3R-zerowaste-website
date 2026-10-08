"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Photo-real rotating Earth (WebGL). NASA Blue Marble day map, city lights on the night side,
 * sun glint on the oceans, a drifting cloud layer and an atmospheric rim.
 * Textures live in /public/textures/earth. Renders only while on screen; with
 * prefers-reduced-motion it draws a single still frame.
 */

const TEX = "/textures/earth";
/** Longitude (°E) facing the viewer on load — India. */
const START_LON = 55;
/** Seconds per full rotation. */
const DAY_SECONDS = 110;
/** Sun direction in view space: from the upper right, so the night side (city lights) sits behind the headline. */
const SUN = new THREE.Vector3(0.8, 0.28, 0.55).normalize();

const earthVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFrag = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D oceanMap;
  uniform vec3 sunDir;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = vec3(0.0, 0.0, 1.0);
    float ndl = dot(n, sunDir);
    float dayMix = smoothstep(-0.18, 0.22, ndl);

    vec3 day = texture2D(dayMap, vUv).rgb;
    day = mix(day, day * vec3(0.92, 1.02, 1.0), 0.5) * 1.08;
    vec3 lit = day * (0.06 + 1.05 * max(ndl, 0.0));

    vec3 night = texture2D(nightMap, vUv).rgb;
    night = pow(night, vec3(1.6)) * vec3(1.6, 1.25, 0.8);

    float ocean = texture2D(oceanMap, vUv).r;
    vec3 h = normalize(sunDir + v);
    float spec = pow(max(dot(n, h), 0.0), 70.0) * ocean * 0.9;

    vec3 color = mix(night, lit, dayMix) + spec * vec3(1.0, 0.94, 0.82) * dayMix;

    float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0);
    color += vec3(0.35, 0.65, 1.0) * rim * (0.15 + 0.85 * dayMix) * 0.9;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const cloudFrag = /* glsl */ `
  uniform sampler2D cloudMap;
  uniform vec3 sunDir;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vec3 n = normalize(vNormal);
    float ndl = dot(n, sunDir);
    float dayMix = smoothstep(-0.15, 0.35, ndl);
    float a = texture2D(cloudMap, vUv).r;
    vec3 c = vec3(1.0) * (0.04 + 0.96 * max(ndl, 0.0) + 0.1);
    gl_FragColor = vec4(c, a * (0.08 + 0.82 * dayMix));
  }
`;

const atmoVert = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmoFrag = /* glsl */ `
  uniform vec3 sunDir;
  varying vec3 vNormal;
  uniform float shell;
  void main() {
    vec3 n = normalize(vNormal);
    // Screen-space distance from the globe's centre, in Earth radii (back faces of the shell).
    float r = length(n.xy) * shell;
    float t = clamp((r - 1.0) / (shell - 1.0), 0.0, 1.0);
    float glow = pow(1.0 - t, 3.2);
    float lit = 0.18 + 0.82 * smoothstep(-0.7, 0.7, dot(normalize(n.xy + 1e-5), normalize(sunDir.xy)));
    gl_FragColor = vec4(vec3(0.36, 0.66, 1.0) * 1.3, glow * lit);
  }
`;

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Earth({ className, onReady }: { className?: string; onReady?: () => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const el = mount.current;
    if (!el || !webglAvailable()) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Orthographic: the globe fills 80% of the box, leaving room for the atmosphere glow.
    const camera = new THREE.OrthographicCamera(-1.25, 1.25, 1.25, -1.25, 0.1, 10);
    camera.position.z = 5;
    const scene = new THREE.Scene();

    const loader = new THREE.TextureLoader();
    const load = (name: string) =>
      new Promise<THREE.Texture>((resolve, reject) =>
        loader.load(`${TEX}/${name}`, (t) => {
          t.colorSpace = THREE.NoColorSpace;
          t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
          resolve(t);
        }, undefined, reject),
      );

    const tilt = new THREE.Group();
    tilt.rotation.z = THREE.MathUtils.degToRad(23.4);
    tilt.rotation.x = THREE.MathUtils.degToRad(8);
    scene.add(tilt);

    const sunDir = { value: SUN.clone() };
    const geo = new THREE.SphereGeometry(1, 128, 96);
    const disposables: { dispose: () => void }[] = [renderer, geo];
    let earth: THREE.Mesh | null = null;
    let clouds: THREE.Mesh | null = null;
    let raf = 0;
    let visible = true;
    let disposed = false;
    let last = performance.now();
    const startY = -Math.PI / 2 - THREE.MathUtils.degToRad(START_LON);

    function resize() {
      const s = el!.clientWidth;
      if (s > 0) renderer.setSize(s, s, false);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    function frame(now: number) {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const spin = ((Math.PI * 2) / DAY_SECONDS) * dt;
      if (earth) earth.rotation.y += spin;
      if (clouds) clouds.rotation.y += spin * 1.18;
      renderer.render(scene, camera);
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }
    function play() {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce && earth) play();
    });
    io.observe(el);
    const onVis = () => !document.hidden && visible && !reduce && earth && play();
    document.addEventListener("visibilitychange", onVis);

    Promise.all([load("day.webp"), load("night.webp"), load("ocean.webp"), load("clouds.webp")])
      .then(([day, night, ocean, cloud]) => {
        if (disposed) return [day, night, ocean, cloud].forEach((t) => t.dispose());
        const earthMat = new THREE.ShaderMaterial({
          uniforms: { dayMap: { value: day }, nightMap: { value: night }, oceanMap: { value: ocean }, sunDir },
          vertexShader: earthVert,
          fragmentShader: earthFrag,
        });
        earth = new THREE.Mesh(geo, earthMat);
        earth.rotation.y = startY;
        tilt.add(earth);

        const cloudMat = new THREE.ShaderMaterial({
          uniforms: { cloudMap: { value: cloud }, sunDir },
          vertexShader: earthVert,
          fragmentShader: cloudFrag,
          transparent: true,
          depthWrite: false,
        });
        clouds = new THREE.Mesh(geo, cloudMat);
        clouds.scale.setScalar(1.006);
        clouds.rotation.y = startY + 0.6;
        tilt.add(clouds);

        const SHELL = 1.14;
        const atmoGeo = new THREE.SphereGeometry(SHELL, 96, 64);
        const atmoMat = new THREE.ShaderMaterial({
          uniforms: { sunDir, shell: { value: SHELL } },
          vertexShader: atmoVert,
          fragmentShader: atmoFrag,
          side: THREE.BackSide,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        scene.add(new THREE.Mesh(atmoGeo, atmoMat));

        disposables.push(day, night, ocean, cloud, earthMat, cloudMat, atmoGeo, atmoMat);
        renderer.render(scene, camera);
        setReady(true);
        onReadyRef.current?.();
        if (!reduce) play();
      })
      .catch(() => {
        /* textures failed — the CSS planet underneath stays visible */
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      disposables.forEach((d) => d.dispose());
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mount}
      aria-hidden
      className={className}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.4s cubic-bezier(.2,.8,.2,1)" }}
    />
  );
}
