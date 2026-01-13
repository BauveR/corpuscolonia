/**
 * Utilidad para resolver rutas de assets usando import.meta.glob de Vite
 */

/**
 * Normaliza una ruta de asset a un formato estándar
 * @param src - Ruta original del asset
 * @returns Ruta normalizada
 */
export function normalizeAssetPath(src: string): string {
  // Eliminar slash inicial si existe
  let normalized = src.replace(/^\//, "");

  // Si no empieza con 'src/', agregarlo
  if (!normalized.startsWith("src/")) {
    normalized = `src/${normalized}`;
  }

  return normalized;
}

/**
 * Crea un mapa de rutas de assets a URLs resueltas por Vite
 * @param globModules - Resultado de import.meta.glob
 * @returns Mapa de rutas a URLs
 */
export function createAssetMap(
  globModules: Record<string, string>
): Record<string, string> {
  const map: Record<string, string> = {};

  Object.entries(globModules).forEach(([absolutePath, url]) => {
    // Variantes de la ruta que pueden usarse para referenciar el mismo asset
    const relFromSrc = absolutePath.replace(/^.*\/src\//, "src/"); // src/assets/foo.png
    const withLeadingSlash = "/" + relFromSrc; // /src/assets/foo.png
    const noSrc = relFromSrc.replace(/^src\//, ""); // assets/foo.png
    const basename = relFromSrc.split("/").pop()!; // foo.png

    // Registrar todas las variantes apuntando a la misma URL
    map[relFromSrc] = url;
    map[withLeadingSlash] = url;
    map[noSrc] = url;
    if (!map[basename]) map[basename] = url; // Solo si no está duplicado
  });

  return map;
}

/**
 * Resuelve una ruta de asset a su URL final
 * @param src - Ruta del asset a resolver
 * @param assetMap - Mapa de assets creado con createAssetMap
 * @returns URL resuelta o undefined si no se encuentra
 */
export function resolveAssetUrl(
  src: string | undefined,
  assetMap: Record<string, string>
): string | undefined {
  if (!src) return undefined;

  // Intento directo
  if (assetMap[src]) return assetMap[src];

  // Intento con normalización
  const normalized = normalizeAssetPath(src);
  if (assetMap[normalized]) return assetMap[normalized];

  // Intento sin slash inicial
  const withoutSlash = src.replace(/^\//, "");
  if (assetMap[withoutSlash]) return assetMap[withoutSlash];

  // Intento solo con el nombre del archivo
  const basename = src.split("/").pop();
  if (basename && assetMap[basename]) return assetMap[basename];

  return undefined;
}

/**
 * Resuelve múltiples rutas de assets
 * @param sources - Array de rutas de assets
 * @param assetMap - Mapa de assets
 * @returns Array de URLs resueltas (filtra los undefined)
 */
export function resolveMultipleAssets(
  sources: (string | undefined)[],
  assetMap: Record<string, string>
): string[] {
  return sources
    .map((src) => resolveAssetUrl(src, assetMap))
    .filter((url): url is string => url !== undefined);
}
