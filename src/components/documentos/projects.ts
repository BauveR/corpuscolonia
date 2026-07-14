// src/data/projects.ts
export type ProjectItem = {
    src: string;          // ruta relativa en src/assets
    text: string;         // título corto
    textEn?: string;      // título corto en inglés (opcional)
    longDescription: string; // descripción larga para el detalle
    longDescriptionEn?: string; // descripción larga en inglés (opcional)
    downloadUrl?: string; // URL de descarga (opcional)
  };

  export const projects: ProjectItem[] = [
    {
      src: "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_600/v1783601912/pdf_Cuerpos_trabajo_y_modos_de_vida_r3p3er.png",
      text: "Seminario: Cuerpos, Trabajo y Modos de Vida",
      textEn: "Seminar: Bodies, Labor and Ways of Life",
      longDescription:
        "Miradas arqueológicas, bioantropológicas e históricas desde México y el Atlántico moderno.\n\nEste seminario propone un espacio de diálogo interdisciplinar en torno a los modos de vida, la forma de trabajo y las experiencias corporales en contextos prehispánicos, coloniales y de transición al mundo novohispano. A partir de perspectivas arqueológicas, bioarqueológicas, etnohistóricas y antropológicas, se busca reflexionar sobre cómo los procesos prehispánicos y coloniales se inscribieron en los cuerpos, en las prácticas cotidianas y en las relaciones sociales, atendiendo tanto a dinámicas locales como a marcos más amplios del mundo Atlántico (Siglos XVI-XVIII).\n\n22 al 24 de septiembre de 2026, 9:00 a 17:00 h\nSalón Alfredo López Austin, IIA-UNAM\n\nCoordinadores: Reyna Beatriz Solís Ciriaco (IIA-UNAM), Jared Carballo Pérez (Universidad de La Laguna / Leiden University), Emiliano Ricardo Melgar Tísoc (MTM-INAH)",
      longDescriptionEn:
        "Archaeological, bioanthropological and historical perspectives from Mexico and the modern Atlantic.\n\nThis seminar proposes a space for interdisciplinary dialogue around ways of life, forms of labor, and bodily experiences in pre-Hispanic, colonial, and transitional contexts leading into the New Spain period. Drawing on archaeological, bioarchaeological, ethnohistorical, and anthropological perspectives, it seeks to reflect on how pre-Hispanic and colonial processes were inscribed on bodies, in everyday practices, and in social relations, addressing both local dynamics and the broader frameworks of the Atlantic world (16th-18th centuries).\n\nSeptember 22-24, 2026, 9:00 a.m. to 5:00 p.m.\nSalón Alfredo López Austin, IIA-UNAM\n\nCoordinators: Reyna Beatriz Solís Ciriaco (IIA-UNAM), Jared Carballo Pérez (Universidad de La Laguna / Leiden University), Emiliano Ricardo Melgar Tísoc (MTM-INAH)",
      downloadUrl: "https://res.cloudinary.com/dmweipuof/image/upload/v1784018426/pdf_Cuerpos_trabajo_y_modos_de_vida_onzsvr.pdf"
    },
    {
      src: "src/assets/portafolio ricardo bauve-01.png",
      text: "piedra-arte e-commerce",
      longDescription:
        "frontend - React\nfinal project\nIT Academy work\nDatabase - MySQL\nbackend\n\nwebsite design\ndesktop\nmobile"
    },
    {
      src: "src/assets/portafolio ricardo bautista-06.png",
      text: "CRM SYSTEM nooxCommunity Platform CHIEF DATA OFFICER (CDO)",
      longDescription:
        "Core Competencies:\n- Strategic business alignment and optimization\n- Fintech solutions architecture\n- Private blockchain infrastructure development\n- Agile/Scrum development methodology\n- End-to-end platform implementation\n\nProject Scope:\nThis enterprise-level solution delivers an automated business infrastructure for streamlined acquisition of real estate properties and diversified financial assets. The platform leverages blockchain technology and advanced automation to maximize operational efficiency and create measurable business value through digital transformation."
    },
    {
      src: "src/assets/portafolio ricardo bautista-04.png",
      text: "TOKENIZATION Product Owner Branding Head",
      longDescription:
        "Key Competencies:\n- Fintech solutions architecture\n- Private blockchain ecosystem development\n- Agile/DevOps methodology\n- End-to-end platform deployment\n\nProject Overview:\nThis solution delivers a comprehensive financial framework that ensures stakeholder confidence and operational transparency. By integrating cutting-edge blockchain technology with core business processes through an agile development approach, the project establishes a future-proof, enterprise-grade technology infrastructure."
    },
    {
      src: "src/assets/portafolio ricardo bauve-05.png",
      text: "wow pr redesign",
      longDescription:
        "ai image generation\ncolor redesign\neditorial design\nreports for clients\ne-mail signatures\npresentation cards\nsocial media video"
    },
    {
      src: "src/assets/portafolio ricardo bauve-04.png",
      text: "creAi social artworks",
      longDescription:
        "AI image generation\ncolor consistency\neditorial\nsocial content for LinkedIn"
    },
    {
      src: "src/assets/portafolio bauve-01.png",
      text: "Muhlberg product owner branding marketing sales",
      longDescription:
        "website\nsales material\nwebsite design\ntech concept"
    },
    {
      src: "src/assets/portafolio bauve-02.png",
      text: "kankabal product owner branding marketing sales",
      longDescription:
        "website\nsales material\nwebsite design\nmarketing alliances"
    },
    {
      src: "src/assets/portafolio bauve-03.png",
      text: "fri summit product owner branding marketing sales",
      longDescription:
        "website\nsales material\nwebsite design\nmarketing alliances"
    },
    {
      src: "src/assets/portafolio bauve-04.png",
      text: "fri summit product owner branding marketing art curator",
      longDescription:
        "website\nsales material\nwebsite design\nmarketing alliances"
    },
    {
      src: "src/assets/portafolio ricardo bautista-01.png",
      text: "noox & partners product owner branding",
      longDescription:
        "art-concept\nwebsite\nevent manager\nsales material\nwebsite design\nmarketing alliances"
    },
    {
      src: "src/assets/portafolio ricardo bautista-02.png",
      text: "tealers magazine branding editorial",
      longDescription:
        "website concept\npersonal project"
    },
    {
      src: "src/assets/portafolio ricardo bautista-03.png",
      text: "noox vallarta product owner branding",
      longDescription:
        "website\nmarketing alliances\nsales material\nwebsite design"
    },
    {
      src: "src/assets/portafolio ricardo bautista-05.png",
      text: "tealers magazine branding editorial",
      longDescription:
        "website concept\npersonal project"
    },
    {
      src: "src/assets/portafolio ricardo bauve-02.png",
      text: "vintage shop",
      longDescription:
        "e-commerce\nai image\ntype customization\nIT Academy work"
    },
    {
      src: "src/assets/portafolio ricardo bauve-03.png",
      text: "galgos group branding",
      longDescription:
        "lettermark\ncolor harmony\nbrand guidelines"
    },
    {
      src: "src/assets/portafolio ricardo bauve-06.png",
      text: "felipe & co branding",
      longDescription:
        "Imagotype\ncolor armony\nbrand guidelines"
    },
    {
      src: "src/assets/portafolio ricardo bauve-07.png",
      text: "Superfine art curator marketing pop up gallery",
      longDescription:
        "investment recruiter\nart basel week"
    },
    {
      src: "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_600/v1768991838/Colonial_biopolitics_vtzu31.png",
      text: "Colonial Biopolitics",
      longDescription:
        "Research project\nVisual design\nConceptual art\nCritical theory",
      downloadUrl: "https://res.cloudinary.com/dmweipuof/image/upload/v1771878194/Copy_-_Colonial_biopolitics_-_Leiden_compressed_lgbsnx.pdf"
    }
  ];
  