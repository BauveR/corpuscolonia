import { useRef, useState } from "react";
import researchgateLogo from "../../assets/researchgate-logo-white.svg";

// Iconos SVG inline
const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

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
  {
    id: "10",
    title: "Shaping wood in the Canary Islands: First experimental dataset focused on tool marks of Prehispanic wooden artifacts",
    url: "https://www.researchgate.net/publication/382051984_Shaping_wood_in_the_Canary_Islands_First_experimental_dataset_focused_on_tool_marks_of_Prehispanic_wooden_artifacts",
  },
  {
    id: "11",
    title: "Excavación y análisis multidisciplinar de un recipiente cerámico aborigen de la Cueva de Los Cabezazos (Tegueste, Tenerife)",
    url: "https://www.researchgate.net/publication/379652397_Excavacion_y_analisis_multidisciplinar_de_un_recipiente_ceramico_aborigen_de_la_Cueva_de_Los_Cabezazos_Tegueste_Tenerife",
  },
  {
    id: "12",
    title: "Òrbites, colònies i ultraperifèries: reflexions al voltant d'investigar en espais no-metropolitans",
    url: "https://www.researchgate.net/publication/370766088_Orbites_colonies_i_ultraperiferies_reflexions_al_voltant_d'investigar_en_espais_no-metropolitans",
  },
  {
    id: "13",
    title: "Prehispanic woodcrafts in the Canary Islands: technical processes and experimental program",
    url: "https://www.researchgate.net/publication/370419159_Prehispanic_woodcrafts_in_the_Canary_Islands_technical_processes_and_experimental_program",
  },
  {
    id: "14",
    title: "La Impronta de la Vida Cotidiana: La caracterización biomecánica de poblaciones norteafricanas antiguas a partir del análisis de actividad física",
    url: "https://www.researchgate.net/publication/371641393_La_Impronta_de_la_Vida_Cotidiana_La_caracterizacion_biomecanica_de_poblaciones_norteafricanas_antiguas_a_partir_del_analisis_de_actividad_fisica",
  },
  {
    id: "15",
    title: "A Prehispanic infant from Tenerife with diffuse microporotic lesions",
    url: "https://www.researchgate.net/publication/365977840_A_Prehispanic_infant_from_Tenerife_with_diffuse_microporotic_lesions",
  },
  {
    id: "16",
    title: "Un espejo en el que mirarnos: relatos biográficos de las pioneras del Departamento de Prehistoria de la Universidad de La Laguna (Tenerife)",
    url: "https://www.researchgate.net/publication/364388455_Un_espejo_en_el_que_mirarnos_relatos_biograficos_de_las_pioneras_del_Departamento_de_Prehistoria_de_la_Universidad_de_La_Laguna_Tenerife",
  },
  {
    id: "17",
    title: "Woodworking activities among the aboriginal groups of the Canary Islands: preliminary results of the experimental programme",
    url: "https://www.researchgate.net/publication/364916182_Woodworking_activities_among_the_aboriginal_groups_of_the_Canary_Islands_preliminary_results_of_the_experimental_programme",
  },
  {
    id: "18",
    title: "Special Issue: Adaptive Tools for Resilient Bones - Biostatistical Approaches to Past Physical Activity in Osteoarchaeology",
    url: "https://www.researchgate.net/publication/364910035_Special_Issue_Adaptive_Tools_for_Resilient_Bones_Biostatistical_Approaches_to_Past_Physical_Activity_in_Osteoarchaeology",
  },
  {
    id: "19",
    title: "Ocupación y movilidad de las sociedades agropastoriles de alta montaña: una propuesta de estudio etnoarqueológico en el Jbel Sirwa (Anti-Atlas, Marruecos)",
    url: "https://www.researchgate.net/publication/360715496_Ocupacion_y_movilidad_de_las_sociedades_agropastoriles_de_alta_montana_una_propuesta_de_estudio_etnoarqueologico_en_el_Jbel_Sirwa_Anti-Atlas_Marruecos",
  },
  {
    id: "20",
    title: "Les Guanches dans les montagnes de Tenerife: l'étude interdisciplinaire d'une population de substrat amazighe aux Îles Canaries",
    url: "https://www.researchgate.net/publication/358747371_Les_Guanches_dans_les_montagnes_de_Tenerife_l'etude_interdisciplinaire_d'une_population_de_substrat_amazighe_aux_Iles_Canaries",
  },
  {
    id: "21",
    title: "Mummies under the wadi: Preliminary study of a burial deposit in Theban Tomb 209 (South Asasif, Egypt)",
    url: "https://www.researchgate.net/publication/358270727_Mummies_under_the_wadi_Preliminary_study_of_a_burial_deposit_in_Theban_Tomb_209_South_Asasif_Egypt",
  },
  {
    id: "22",
    title: "Occupation and mobility in high-mountain agropastoral societies: a proposal for an ethnoarchaeological study in the Jbel Sirwa (Anti-Atlas, Morocco)",
    url: "https://www.researchgate.net/publication/361069239_Occupation_and_mobility_in_high-mountain_agropastoral_societies_a_proposal_for_an_ethnoarchaeological_study_in_the_Jbel_Sirwa_Anti-Atlas_Morocco",
  },
  {
    id: "23",
    title: "Trazas vitales, huellas mortales: paleopatología craneal de la población guanche de Pino Leris (Tenerife, Canarias)",
    url: "https://www.researchgate.net/publication/356565411_Trazas_vitales_huellas_mortales_paleopatologia_craneal_de_la_poblacion_guanche_de_Pino_Leris_Tenerife_Canarias",
  },
  {
    id: "24",
    title: "Nódulos de Schmorl en poblaciones del pasado: Consideraciones sobre su patogenia",
    url: "https://www.researchgate.net/publication/351113142_Nodulos_de_Schmorl_en_poblaciones_del_pasado_Consideraciones_sobre_su_patogenia",
  },
  {
    id: "25",
    title: "La huella eterna del esfuerzo: los marcadores óseos de actividad física en la población calcolítica del Dolmen del Cortijo de los Vínculos",
    url: "https://www.researchgate.net/publication/348099457_LA_HUELLA_ETERNA_DEL_ESFUERZO_LOS_MARCADORES_OSEOS_DE_ACTIVIDAD_FISICA_EN_LA_POBLACION_CALCOLITICA_DEL_DOLMEN_DEL_CORTIJO_DE_LOS_VINCULOS",
  },
  {
    id: "26",
    title: "Une approche ethnoarchéologique aux études de haute montagne entre le Jbel Sirwa et les Îles Canaries",
    url: "https://www.researchgate.net/publication/348186038_Une_approche_ethnoarcheologique_aux_etudes_de_haute_montagne_entre_le_Jbel_Sirwa_et_les_Iles_Canaries",
  },
  {
    id: "27",
    title: "Recensión: Schrader S's Activity, Diet and Social Practice: Addressing Everyday Life in Human Skeletal Remains",
    url: "https://www.researchgate.net/publication/349607775_Recension_Schrader_S's_Activity_Diet_and_Social_Practice_Addresing_Everyday_Life_in_Human_Skeletal_Remains",
  },
  {
    id: "28",
    title: "Voces femeninas en cuerpos aislados: lecturas de Género en la Osteoarqueología de la Protohistoria de Canarias y Baleares",
    url: "https://www.researchgate.net/publication/349624495_Voces_femeninas_en_cuerpos_aislados_lecturas_de_Genero_en_la_Osteoarqueologia_de_la_Protohistoria_de_Canarias_y_Baleares",
  },
  {
    id: "29",
    title: "Nouvelles techniques pour des vieilles questions: tendances de l'ostéoarchéologie canarienne au XXIème siècle",
    url: "https://www.researchgate.net/publication/346964445_Nouvelles_techniques_pour_des_vieilles_questions_tendances_de_l'osteoarcheologie_canarienne_au_XXIeme_siecle",
  },
  {
    id: "30",
    title: "Las investigaciones arqueológicas como recurso en la gestión integral del patrimonio del Parque Nacional del Teide",
    url: "https://www.researchgate.net/publication/348570685_Las_investigaciones_arqueologicas_como_recurso_en_la_gestion_integral_del_patrimonio_del_Parque_Nacional_del_Teide",
  },
  {
    id: "31",
    title: "La Cotidianidad en los Huesos: La aportación de los marcadores óseos de actividad física en las poblaciones aborígenes de Canarias",
    url: "https://www.researchgate.net/publication/340266775_La_Cotidianidad_en_los_Huesos_La_aportacion_de_los_marcadores_oseos_de_actividad_fisica_en_las_poblaciones_aborigenes_de_Canarias",
  },
  {
    id: "32",
    title: "Momias, carbones, cuchillos de sílex y un wadi: El trabajo arqueológico en la tumba 209",
    url: "https://www.researchgate.net/publication/325386479_Momias_carbones_cuchillos_de_silex_y_un_wadi_El_trabajo_arqueologico_en_la_tumba_209",
  },
  {
    id: "33",
    title: "Mummies under the Wadi: Preliminary Study of a Burial Deposit in Theban Tomb 209 (South Asasif, Egypt)",
    url: "https://www.researchgate.net/publication/340341651_Mummies_under_the_Wadi_Preliminary_Study_of_a_Burial_Deposit_in_Theban_Tomb_209_South_Asasif_Egypt",
  },
];

export const ResearchGallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [openShareMenu, setOpenShareMenu] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const handleShare = (platform: string, url: string, title: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
    setOpenShareMenu(null);
  };

  const toggleShareMenu = (id: string) => {
    setOpenShareMenu(openShareMenu === id ? null : id);
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
      <div className="w-full flex-1 flex flex-col">
        {/* Botón arriba */}
        <div className="flex justify-center mb-3">
          <button
            onClick={scrollUp}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white shadow-lg"
            aria-label="Scroll arriba"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Contenedor del scroll */}
        <div
          ref={scrollContainerRef}
          className="flex flex-col gap-4 overflow-y-auto scrollbar-hide h-[700px] py-4 px-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {publicationItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-full min-h-[140px] bg-white/5 rounded-xl overflow-visible hover:bg-white/10 transition-all duration-300 relative"
            >
              <div className="h-full p-4 flex flex-col justify-between">
                <h4 className="text-stone-200 font-semibold text-sm leading-snug line-clamp-3">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  {/* Ver artículo */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-all duration-200"
                  >
                    Ver artículo
                  </a>

                  {/* Copiar URL */}
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-200"
                    aria-label="Copiar URL"
                    title="Copiar URL"
                  >
                    {copiedId === item.id ? <CheckIcon /> : <CopyIcon />}
                  </button>

                  {/* Compartir */}
                  <div className="relative">
                    <button
                      onClick={() => toggleShareMenu(item.id)}
                      className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-200"
                      aria-label="Compartir"
                      title="Compartir"
                    >
                      <ShareIcon />
                    </button>

                    {/* Menú de compartir */}
                    {openShareMenu === item.id && (
                      <div className="absolute bottom-full left-0 mb-2 bg-stone-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 py-1 z-50 min-w-[140px]">
                        <button
                          onClick={() => handleShare("twitter", item.url, item.title)}
                          className="w-full px-3 py-2 flex items-center gap-2 text-white text-xs hover:bg-white/10 transition-colors"
                        >
                          <TwitterIcon /> X (Twitter)
                        </button>
                        <button
                          onClick={() => handleShare("linkedin", item.url, item.title)}
                          className="w-full px-3 py-2 flex items-center gap-2 text-white text-xs hover:bg-white/10 transition-colors"
                        >
                          <LinkedInIcon /> LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare("facebook", item.url, item.title)}
                          className="w-full px-3 py-2 flex items-center gap-2 text-white text-xs hover:bg-white/10 transition-colors"
                        >
                          <FacebookIcon /> Facebook
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón abajo */}
        <div className="flex justify-center mt-3">
          <button
            onClick={scrollDown}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white shadow-lg"
            aria-label="Scroll abajo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
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
