import { useMemo } from "react";
import { projects, ProjectItem } from "../components/portafolio/projects";
import { useAssetMap } from "./useAssetMap";
import { resolveAssetUrl } from "../utils/assetResolver";

export type ValidProject = ProjectItem & {
  index: number; // índice original en el array projects
  resolvedImage: string;
};

/**
 * Hook que retorna solo los proyectos con imágenes válidas resueltas
 */
export function useValidProjects(): ValidProject[] {
  const urlMap = useAssetMap();

  return useMemo(() => {
    const validProjects: ValidProject[] = [];

    projects.forEach((project, index) => {
      const resolvedImage = resolveAssetUrl(project.src, urlMap);
      if (resolvedImage) {
        validProjects.push({
          ...project,
          index,
          resolvedImage,
        });
      } else {
        console.warn(`[useValidProjects] No se pudo resolver imagen para proyecto ${index}:`, project.src);
      }
    });

    return validProjects;
  }, [urlMap]);
}
