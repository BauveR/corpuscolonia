import { Suspense, Component, ReactNode, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch(e: Error) { console.error("[Model3DStatic]", e.message); }
  render() {
    return this.state.error
      ? <div className="flex items-center justify-center h-full text-stone-500 text-sm">Error al cargar modelo</div>
      : this.props.children;
  }
}

function StaticModel({ url, normalizedSize }: { url: string; normalizedSize: number }) {
  const { scene } = useLoader(GLTFLoader, url, (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    (loader as GLTFLoader).setDRACOLoader(draco);
  });
  const { invalidate } = useThree();

  useEffect(() => {
    if (!scene) return;
    // Reset antes de calcular para que dev y prod sean idénticos
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
        if (mesh.geometry.attributes.color) {
          mesh.geometry.deleteAttribute("color");
        }
        mesh.geometry.computeVertexNormals();
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#cec6ba"),
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

  return <primitive object={scene} />;
}

export function Model3DStatic({
  url,
  label,
  normalizedSize = 1,
}: {
  url: string;
  label?: string;
  normalizedSize?: number;
}) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0.5, 2.5], fov: 35, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} color="#f5e9d8" />
        <directionalLight position={[6, 5, 3]} intensity={2.2} color="#fff4e0" />
        <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#d4c4a8" />
        <directionalLight position={[-2, 3, -5]} intensity={0.3} color="#e8ddd0" />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <StaticModel url={url} normalizedSize={normalizedSize} />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
      {label && (
        <p className="absolute bottom-3 left-0 right-0 text-center text-stone-400 text-xs pointer-events-none">
          {label}
        </p>
      )}
    </div>
  );
}
