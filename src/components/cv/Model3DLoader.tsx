import { Html } from "@react-three/drei";

export function Model3DLoader() {
  return (
    <Html center>
      <div
        role="status"
        aria-label="Loading 3D model"
        className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin"
      />
    </Html>
  );
}
