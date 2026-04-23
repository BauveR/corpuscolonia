import { useRef, useEffect, Suspense, Component, ReactNode } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";

export type ModelConfig = {
  cameraZ?: number;
  cameraY?: number;
  cameraFov?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  initialRotX?: number;
  initialRotY?: number;
  color?: string;
  targetY?: number;
  ambientColor?: string;
  ambientIntensity?: number;
  sunColor?: string;
  sunIntensity?: number;
  fillColor?: string;
  fillIntensity?: number;
  backColor?: string;
  backIntensity?: number;
};

const DEFAULTS: Required<ModelConfig> = {
  cameraZ: 2.5,
  cameraY: 0.3,
  cameraFov: 35,
  autoRotate: false,
  autoRotateSpeed: 1.5,
  initialRotX: 0,
  initialRotY: 0,
  color: "#cec6ba",
  targetY: 0,
  ambientColor: "#f5e9d8",
  ambientIntensity: 0.35,
  sunColor: "#fff4e0",
  sunIntensity: 2.2,
  fillColor: "#d4c4a8",
  fillIntensity: 0.5,
  backColor: "#e8ddd0",
  backIntensity: 0.3,
};

class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch(e: Error) { console.error("[Model3DInteractive]", e.message); }
  render() { return this.state.error ? null : this.props.children; }
}

function Model({
  url,
  normalizedSize,
  initialRotX,
  initialRotY,
  color,
}: {
  url: string;
  normalizedSize: number;
  initialRotX: number;
  initialRotY: number;
  color: string;
}) {
  const { scene } = useLoader(GLTFLoader, url, (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    (loader as GLTFLoader).setDRACOLoader(draco);
  });
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    if (!scene) return;
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = normalizedSize / maxDim;

    scene.scale.setScalar(s);
    scene.position.set(-center.x * s, -center.y * s, -center.z * s);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry.attributes.color) mesh.geometry.deleteAttribute("color");
        mesh.geometry.computeVertexNormals();
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: 0.1,
          roughness: 0.7,
          vertexColors: false,
          map: null,
          side: THREE.DoubleSide,
        });
      }
    });

    invalidate();
  }, [scene, invalidate, normalizedSize]);

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = initialRotX;
    groupRef.current.rotation.y = initialRotY;
  }, [initialRotX, initialRotY]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export function Model3DInteractive({
  url,
  normalizedSize = 1,
  config,
}: {
  url: string;
  normalizedSize?: number;
  config?: ModelConfig;
}) {
  const cfg = { ...DEFAULTS, ...config };
  const invalidateRef = useRef<(() => void) | null>(null);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop="demand"
        camera={{ position: [0, cfg.cameraY, cfg.cameraZ], fov: cfg.cameraFov, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        style={{ background: "transparent" }}
        onCreated={({ invalidate }) => { invalidateRef.current = invalidate; }}
      >
        <ambientLight intensity={cfg.ambientIntensity} color={cfg.ambientColor} />
        <directionalLight position={[6, 5, 3]} intensity={cfg.sunIntensity} color={cfg.sunColor} />
        <directionalLight position={[-4, -2, 2]} intensity={cfg.fillIntensity} color={cfg.fillColor} />
        <directionalLight position={[-2, 3, -5]} intensity={cfg.backIntensity} color={cfg.backColor} />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <OrbitControls
              autoRotate={cfg.autoRotate}
              autoRotateSpeed={cfg.autoRotateSpeed}
              target={[0, cfg.targetY, 0]}
              enableDamping
              dampingFactor={0.08}
              enablePan={false}
              enableZoom={false}
              makeDefault
            />
            <Model
              url={url}
              normalizedSize={normalizedSize}
              initialRotX={cfg.initialRotX}
              initialRotY={cfg.initialRotY}
              color={cfg.color}
            />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
    </div>
  );
}
