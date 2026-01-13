import { useMemo } from "react";
import { createAssetMap } from "../utils/assetResolver";

/**
 * Hook para obtener el mapa de assets usando import.meta.glob de Vite
 * @returns Mapa de rutas de assets a URLs resueltas
 */
export function useAssetMap() {
  const globModules = import.meta.glob(
    "/src/assets/**/*.{png,jpg,jpeg,webp,svg,gif}",
    {
      eager: true,
      import: "default",
    }
  ) as Record<string, string>;

  return useMemo(() => createAssetMap(globModules), []);
}
