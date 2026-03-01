import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Lang = "es" | "en";

const translations = {
  es: {
    nav_welcome: "Inicio",
    nav_cv: "Proyecto",
    nav_documentos: "Eventos",
    nav_redes: "Redes",
    nav_collaborators: "Colaboradores",
    cv_title: "Redes atlánticas de intercambio",
    cv_body: "Un mapa de las conexiones que articularon el mundo atlántico moderno en los casos de estudio de este proyecto (Canarias, México y Holanda): circulación de personas, mercancías y tecnologías entre Europa, África y América. Estas redes no solo movieron productos —como azúcar, tabaco o metales— sino también cuerpos, conocimientos y formas de vida que transformaron profundamente las sociedades implicadas.",
    cv_caption: "Redes atlánticas de intercambio",
    collaborators_title: "A NETWORK OF PEOPLE ACROSS AN OCEAN",
    view_more: "Ver más",
    download: "Descargar",
    view_article: "Ver artículo",
  },
  en: {
    nav_welcome: "Home",
    nav_cv: "Project",
    nav_documentos: "Events",
    nav_redes: "Networks",
    nav_collaborators: "Collaborators",
    cv_title: "Atlantic Networks of Exchange",
    cv_body: "A map of the connections that shaped the modern Atlantic world across our case studies (Canary Islands, Mexico and the Netherlands): the circulation of people, goods and technologies between Europe, Africa and America. These networks moved not only products —such as sugar, tobacco or metals— but also bodies, knowledge and ways of life that profoundly transformed the societies involved.",
    cv_caption: "Atlantic Networks of Exchange",
    collaborators_title: "A NETWORK OF PEOPLE ACROSS AN OCEAN",
    view_more: "View more",
    download: "Download",
    view_article: "View article",
  },
} as const;

type TranslationKey = keyof typeof translations.es;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const t = (key: TranslationKey) => translations[lang][key];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
