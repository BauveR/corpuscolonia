import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

// ─── AJUSTES FÁCILES ────────────────────────────────────────────────────────
const CONFIG = {
  // Tamaño del modelo en unidades Three.js
  modelScale: 5,

  // Desplazamiento del modelo en el canvas (X: izquierda/derecha, Y: arriba/abajo)
  offsetX: 0,
  offsetY: -1,

  // Cámara — posición inicial (lejos) y final (cerca) al hacer scroll
  cameraZStart: 1.1,
  cameraZEnd: 1,
  cameraY: 1.4, // sube la cámara para que mire hacia abajo

  // Cuántos px de scroll cubre el zoom completo inicio→fin
  cameraZoomScrollRange: 1900,

  cameraFov: 30,

  // Scroll: cuántos px hacen una rotación completa
  scrollPerRotation: 1800,

  // Efecto de escala al hacer scroll: 0 = sin efecto, 0.18 = sutil
  scrollScaleEffect: 0,

  // Rotación inicial del modelo en X (en radianes: Math.PI/6 = 30°, Math.PI/4 = 45°)
  initialRotX: 0,

  // Giro sutil en X al hacer scroll (en radianes, 0.0003 = muy sutil)
  scrollTiltX: 0.00008,

  // Offset de inicio del scroll (negativo = arranca antes de la sección)
  scrollStartOffset: -100,

  // Canvas
  canvasWidth: 700,
  canvasHeight: 1200,
};
// ────────────────────────────────────────────────────────────────────────────

const OBJ_URL =
  "https://res.cloudinary.com/dmweipuof/raw/upload/v1775742371/25_3_2026_hstho0.obj";

function CameraController({ scrollY }: { scrollY: number }) {
  const { camera, invalidate } = useThree();
  const camZ = useRef(CONFIG.cameraZStart);

  useFrame((_, delta) => {
    const t = Math.min(scrollY / CONFIG.cameraZoomScrollRange, 1);
    const targetZ = THREE.MathUtils.lerp(CONFIG.cameraZStart, CONFIG.cameraZEnd, t);
    camZ.current = THREE.MathUtils.lerp(camZ.current, targetZ, 1 - Math.pow(0.02, delta));
    camera.position.z = camZ.current;
    camera.position.y = CONFIG.cameraY;
    invalidate();
  });

  return null;
}

function Model({ scrollY }: { scrollY: number }) {
  const obj = useLoader(OBJLoader, OBJ_URL);
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  const rotY = useRef(0);
  const rotX = useRef(CONFIG.initialRotX);
  const scaleVal = useRef(1);

  useEffect(() => {
    if (!obj) return;
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = CONFIG.modelScale / maxDim;

    obj.scale.setScalar(s);
    obj.position.set(
      -center.x * s + CONFIG.offsetX,
      -center.y * s + CONFIG.offsetY,
      -center.z * s
    );

    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#c8b89a"),
          metalness: 0.1,
          roughness: 0.7,
        });
      }
    });

    invalidate();
  }, [obj, invalidate]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetRotY = -(scrollY / CONFIG.scrollPerRotation) * Math.PI * 2;
    rotY.current = THREE.MathUtils.lerp(rotY.current, targetRotY, 1 - Math.pow(0.015, delta));

    const targetScale = 1 + Math.sin(scrollY * 0.003) * CONFIG.scrollScaleEffect;
    scaleVal.current = THREE.MathUtils.lerp(scaleVal.current, targetScale, 1 - Math.pow(0.05, delta));

    const targetRotX = CONFIG.initialRotX + scrollY * CONFIG.scrollTiltX;
    rotX.current = THREE.MathUtils.lerp(rotX.current, targetRotX, 1 - Math.pow(0.03, delta));

    groupRef.current.rotation.y = rotY.current;
    groupRef.current.rotation.x = rotX.current;
    groupRef.current.scale.setScalar(scaleVal.current);
  });

  return <primitive ref={groupRef} object={obj} />;
}

export default function ObjViewer3D({ width, height, fill }: { width?: number; height?: number; fill?: boolean } = {}) {
  const [scrollY, setScrollY] = useState(0);
  const invalidateRef = useRef<(() => void) | null>(null);
  const sectionOffsetRef = useRef(0);

  useEffect(() => {
    // Calcular el offset de la sección #cv al montar
    const section = document.getElementById("cv");
    if (section) sectionOffsetRef.current = section.offsetTop + CONFIG.scrollStartOffset;

    const onScroll = () => {
      // Scroll relativo al inicio de la sección #cv, mínimo 0
      const relative = Math.max(0, window.scrollY - sectionOffsetRef.current);
      setScrollY(relative);
      invalidateRef.current?.();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={fill
      ? { width: "100%", height: "100%", position: "relative" }
      : { width: width ?? CONFIG.canvasWidth, height: height ?? CONFIG.canvasHeight, position: "relative", flexShrink: 0 }
    }>
      <Canvas
        frameloop="demand"
        camera={{ position: [0, CONFIG.cameraY, CONFIG.cameraZStart], fov: CONFIG.cameraFov, near: 0.1, far: 100 }}
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
          <CameraController scrollY={scrollY} />
          <Model scrollY={scrollY} />
        </Suspense>
      </Canvas>
    </div>
  );
}
