import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";

// ─── AJUSTES FÁCILES ────────────────────────────────────────────────────────
const CONFIG = {
  // Tamaño del modelo en unidades Three.js
  modelScale: 9,

  // Desplazamiento del modelo en el canvas (X: izquierda/derecha, Y: arriba/abajo)
  offsetX: 0,
  offsetY: 0,

  // Cámara — posición inicial (lejos) y final (cerca) al hacer scroll
  cameraZStart: 1.3,
  cameraZEnd: 3,
  cameraY: 1, // altura de la cámara (0 = a nivel del modelo)

  // Punto que queda en el CENTRO EXACTO del canvas (no mueve el modelo, no rompe la rotación)
  // Y: positivo → modelo baja | negativo → modelo sube
  // X: positivo → modelo va a la izquierda | negativo → modelo va a la derecha
  cameraLookAtY: 0.28,
  cameraLookAtX: 0.09,

  // Versión mobile (< 768px) — misma lógica, valores independientes
  mobile: {
    cameraLookAtY: 0.25,
    cameraLookAtX: -0.015,
    scrollStartOffset: 0,
    cameraZStart: 1.2,
    cameraZEnd: 2,
    cameraY: 1,
  },

  // Cuántos px de scroll cubre el zoom completo inicio→fin
  cameraZoomScrollRange: 1700,

  cameraFov: 30,

  // Scroll: cuántos px hacen una rotación completa
  scrollPerRotation: 1300,

  // Efecto de escala al hacer scroll: 0 = sin efecto, 0.18 = sutil
  scrollScaleEffect: 0,

  // Rotación inicial del modelo en X (en radianes: Math.PI/6 = 30°, Math.PI/4 = 45°)
  initialRotX: 0,

  // Giro sutil en X al hacer scroll (en radianes, 0.0003 = muy sutil)
  scrollTiltX: 0.00008,

  // Offset de inicio del scroll (negativo = arranca antes de la sección)
  scrollStartOffset: -200,

  // Canvas
  canvasWidth: 700,
  canvasHeight: 1200,
};
// ────────────────────────────────────────────────────────────────────────────

const MODEL_URL =
  "https://res.cloudinary.com/dmweipuof/image/upload/v1776865262/modelo_compressed_gxx1rm.glb";

function CameraController({ scrollY, isMobile }: { scrollY: number; isMobile: boolean }) {
  const { camera, invalidate } = useThree();
  const camZ = useRef(CONFIG.cameraZStart);

  useFrame((_, delta) => {
    const cfg = isMobile ? CONFIG.mobile : CONFIG;
    const t = Math.min(scrollY / CONFIG.cameraZoomScrollRange, 1);
    const targetZ = THREE.MathUtils.lerp(cfg.cameraZStart, cfg.cameraZEnd, t);
    camZ.current = THREE.MathUtils.lerp(camZ.current, targetZ, 1 - Math.pow(0.02, delta));
    camera.position.z = camZ.current;
    camera.position.y = cfg.cameraY;
    camera.lookAt(cfg.cameraLookAtX, cfg.cameraLookAtY, 0);
    invalidate();
  });

  return null;
}

function Model({ scrollY }: { scrollY: number }) {
  const { scene } = useLoader(GLTFLoader, MODEL_URL, (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    (loader as GLTFLoader).setDRACOLoader(draco);
  });
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  const rotY = useRef(0);
  const rotX = useRef(CONFIG.initialRotX);

  useEffect(() => {
    if (!scene) return;
    // Reset antes de calcular bbox para que dev (StrictMode) y prod sean idénticos
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    scene.position.set(
      -center.x + CONFIG.offsetX,
      -center.y + CONFIG.offsetY,
      -center.z
    );

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#cec6ba"),
          metalness: 0.1,
          roughness: 0.7,
        });
      }
    });

    invalidate();
  }, [scene, invalidate]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetRotY = -(scrollY / CONFIG.scrollPerRotation) * Math.PI * 2;
    rotY.current = THREE.MathUtils.lerp(rotY.current, targetRotY, 1 - Math.pow(0.015, delta));

    const targetRotX = CONFIG.initialRotX + scrollY * CONFIG.scrollTiltX;
    rotX.current = THREE.MathUtils.lerp(rotX.current, targetRotX, 1 - Math.pow(0.03, delta));

    groupRef.current.rotation.y = rotY.current;
    groupRef.current.rotation.x = rotX.current;
  });

  return <primitive ref={groupRef} object={scene} />;
}

export default function ObjViewer3D({ width, height, fill }: { width?: number; height?: number; fill?: boolean } = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const invalidateRef = useRef<(() => void) | null>(null);
  const sectionOffsetRef = useRef(0);

  useEffect(() => {
    // Calcular el offset de la sección #cv al montar
    const section = document.getElementById("cv");
    if (section) {
      const offset = window.innerWidth < 768 ? CONFIG.mobile.scrollStartOffset : CONFIG.scrollStartOffset;
      sectionOffsetRef.current = section.offsetTop + offset;
    }

    const onScroll = () => {
      const relative = Math.max(0, window.scrollY - sectionOffsetRef.current);
      setScrollY(relative);
      invalidateRef.current?.();
    };
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div style={fill
      ? { width: "100%", height: "100%", position: "relative" }
      : { width: width ?? CONFIG.canvasWidth, height: height ?? CONFIG.canvasHeight, position: "relative", flexShrink: 0 }
    }>
      <Canvas
        frameloop="demand"
        camera={{ position: [0, CONFIG.cameraY, CONFIG.cameraZStart], fov: CONFIG.cameraFov, near: 0.1, far: 100, up: [0, 1, 0] }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "default", preserveDrawingBuffer: false }}
        style={{ background: "transparent" }}
        onCreated={({ invalidate }) => { invalidateRef.current = invalidate; }}
      >
        <ambientLight intensity={0.35} color="#f5e9d8" />
        <directionalLight position={[6, 5, 3]} intensity={2.2} color="#fff4e0" />
        <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#d4c4a8" />
        <directionalLight position={[-2, 3, -5]} intensity={0.3} color="#e8ddd0" />
        <Suspense fallback={null}>
          <CameraController scrollY={scrollY} isMobile={isMobile} />
          <Model scrollY={scrollY} />
        </Suspense>
      </Canvas>
    </div>
  );
}
