import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { projects, ProjectItem } from "../components/documentos/projects";
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
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    const validProjects: ValidProject[] = [];

    projects.forEach((project, index) => {
      const resolvedImage = resolveAssetUrl(project.src, urlMap);
      if (resolvedImage) {
        validProjects.push({
          ...project,
          text: project.textKey ? t(project.textKey) : project.text,
          longDescription: project.longDescriptionKey ? t(project.longDescriptionKey) : project.longDescription,
          index,
          resolvedImage,
        });
      } else {
        console.warn(`[useValidProjects] No se pudo resolver imagen para proyecto ${index}:`, project.src);
      }
    });

    return validProjects;
  }, [urlMap, i18n.language, t]);
}
