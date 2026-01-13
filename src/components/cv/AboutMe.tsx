import GlassPanel from "./ui/GlassPanel";
import SectionHeader from "./ui/SectionHeader";
import { containerVariants } from "./ui/motion";

export function AboutMe() {
  return (
    <GlassPanel variants={containerVariants} className="h-full">
      <SectionHeader>Sobre mí</SectionHeader>
      <div className="ms-4 sm:ms-8 mt-4 space-y-4 text-sm text-slate-400">
        <p className="font-bold text-slate-400 text-sm">
          Analítico, resiliente y orientado a soluciones | Transicionando al desarrollo frontend con pasión por materializar ideas y experiencias digitales intuitivas
        </p>
        <p className="text-stone-300 text-sm">
          Durante 10 años lideré proyectos en el sector inmobiliario, diseñando alternativas de inversión innovadoras. Esta experiencia me enseñó a analizar datos complejos, comunicar eficazmente y gestionar proyectos bajo presión.
        </p>
        <p className="text-stone-300 text-sm">
          Actualmente en transición hacia el desarrollo frontend, especializándome en React y tecnologías web modernas. Mi background en negocios me aporta una perspectiva única: entiendo que el código debe resolver problemas reales de usuarios y el business core.
        </p>
        <p className="text-stone-300 text-sm">
          Combino capacidad analítica para transformar requisitos en soluciones técnicas con mentalidad de aprendizaje continuo. Mis años en proyectos multidisciplinares me han dado habilidades de colaboración y comunicación, construyendo puentes entre equipos técnicos y de negocio.
        </p>
        <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
          <p className="font-bold text-stone-50 text-sm">Stack: React, JavaScript, HTML5, CSS3, Git</p>
          <p className="text-orange-400 text-sm">📍 Barcelona</p>
          <p className="text-slate-400 text-sm">
            🔍 <span className="font-bold text-stone-50">Busco:</span> Frontend Developer Junior, Product Owner Junior, Digital Project Manager o Business Analyst donde mi expertise en diseño de productos, visión de negocio y conocimientos técnicos generen valor real.
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}
