import { useRef } from "react";
import researchgateLogo from "../../assets/researchgate-logo-white.svg";

const publicationItems = [
  {
    id: "1",
    title: "Tumplines, baskets, and heavy burden: Interdisciplinary approach to load carrying in Bronze Age Abu Fatima, Sudan",
    url: "https://www.researchgate.net/publication/387137171_Tumplines_baskets_and_heavy_burden_Interdisciplinary_approach_to_load_carrying_in_Bronze_Age_Abu_Fatima_Sudan",
  },
  {
    id: "2",
    title: "Virtual skeletons and digital muscles: an experimental bioarchaeological approach to the pre-Hispanic production of millstones (Tenerife, Canary Islands)",
    url: "https://www.researchgate.net/publication/362850948_Virtual_skeletons_and_digital_muscles_an_experimental_bioarchaeological_approach_to_the_pre-Hispanic_production_of_millstones_Tenerife_Canary_Islands",
  },
  {
    id: "3",
    title: "Embodied labors during the state formation of Egypt and Nubia (ca. 4800-1750 BCE): elucidating transformations in behavioral patterns with entheseal changes",
    url: "https://www.researchgate.net/publication/366646778_Embodied_labors_during_the_state_formation_of_Egypt_and_Nubia_ca_4800-1750_BCE_elucidating_transformations_in_behavioral_patterns_with_entheseal_changes",
  },
  {
    id: "4",
    title: "Dietary changes across time: Studying the indigenous period of La Gomera using δ13C and δ15N stable isotope analysis and radiocarbon dating",
    url: "https://www.researchgate.net/publication/348301213_Dietary_changes_across_time_Studying_the_indigenous_period_of_La_Gomera_using_d13C_and_d15N_stable_isotope_analysis_and_radiocarbon_dating",
  },
  {
    id: "5",
    title: "Quotidian lives on isolated bodies: Entheseal changes and cross-sectional geometry among the aboriginal population of La Gomera (ca. 200-1500 AD, Canary Islands)",
    url: "https://www.researchgate.net/publication/348281999_Quotidian_lives_on_isolated_bodies_Entheseal_changes_and_cross-sectional_geometry_among_the_aboriginal_population_of_La_Gomera_ca_200-1500_AD_Canary_Islands",
  },
  {
    id: "6",
    title: "Corporealities of Physical Labor in the Origins of the Nile Valley States: Evidence of Engendered Differences in Predynastic Egypt and the Kingdom of Kerma",
    url: "https://www.researchgate.net/publication/396524127_Corporealities_of_Physical_Labor_in_the_Origins_of_the_Nile_Valley_States_Evidence_of_Engendered_Differences_in_Predynastic_Egypt_and_the_Kingdom_of_Kerma",
  },
  {
    id: "7",
    title: "Bridging the gap between the aboriginal and the popular pottery-forming traditions in the Canary Islands by integrating technological traces, X-radiography & micro-CT analyses",
    url: "https://www.researchgate.net/publication/395576880_Bridging_the_gap_between_the_aboriginal_and_the_popular_pottery-forming_traditions_in_the_Canary_Islands_by_integrating_technological_traces_X-radiography_micro-CT_analyses",
  },
  {
    id: "8",
    title: "Rethinking late prehistoric Mediterranean Africa: architecture, farming, and materiality at Kach Kouch, Morocco (c. 2200-600 BC)",
    url: "https://www.researchgate.net/publication/389051791_Rethinking_late_prehistoric_Mediterranean_Africa_architecture_farming_and_materiality_at_Kach_Kouch_Morocco_c_2200-600_BC",
  },
  {
    id: "9",
    title: "Repensando el pasado: Mujeres, infancia y vida cotidiana indígena en la exposición permanente del Museo Arqueológico de Tenerife",
    url: "https://www.researchgate.net/publication/398987610_Repensando_el_pasado_Mujeres_infancia_y_vida_cotidiana_indigena_en_la_exposicion_permanente_del_Museo_Arqueologico_de_Tenerife",
  },
];

export const ResearchGallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -200, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 h-full">
      {/* Logo ResearchGate */}
      <div className="flex justify-center">
        <img
          src={researchgateLogo}
          alt="ResearchGate"
          className="h-6 sm:h-8 w-auto"
        />
      </div>

      {/* Galería con scroll vertical */}
      <div className="w-full relative flex-1">
        {/* Botón arriba */}
        <button
          onClick={scrollUp}
          className="absolute left-1/2 -translate-x-1/2 top-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white shadow-lg"
          aria-label="Scroll arriba"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Botón abajo */}
        <button
          onClick={scrollDown}
          className="absolute left-1/2 -translate-x-1/2 bottom-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white shadow-lg"
          aria-label="Scroll abajo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Contenedor del scroll */}
        <div
          ref={scrollContainerRef}
          className="flex flex-col gap-4 overflow-y-auto scrollbar-hide h-[500px] py-12 px-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {publicationItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-full h-[120px] bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="h-full p-4 flex flex-col justify-between">
                <h4 className="text-white font-semibold text-sm leading-snug line-clamp-3">
                  {item.title}
                </h4>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-all duration-200"
                >
                  Ver artículo
                </a>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ResearchGallery;
