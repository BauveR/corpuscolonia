const galleryItems = [
  {
    id: "1",
    image: "https://res.cloudinary.com/dmweipuof/image/upload/v1770912007/1_ppw6g3.png",
    title: "Tabaco, pipas y su impacto en el cuerpo",
    description: "El impacto del tabaco americano y de las pipas de caolín producidas en Holanda se documenta arqueológicamente en la Iglesia de Nuestra Señora de La Concepción (Santa Cruz de Tenerife). Canarias actuó como espacio intermedio en estas rutas comerciales, donde el consumo de tabaco dejó huellas materiales y biológicas detectables en el registro arqueológico.",
  },
  {
    id: "2",
    image: "https://res.cloudinary.com/dmweipuof/image/upload/v1770912011/2_fjcj82.png",
    title: "Resiliencia y supervivencia en San Marcial de Rubicón",
    description: "Los primeros colonos europeos establecidos en Canarias enfrentaron episodios de escasez hídrica y limitaciones alimentarias. Las evidencias bioarqueológicas procedentes de San Marcial de Rubicón podrán revelar los efectos de estas condiciones en la salud y en la vida cotidiana de una población que habitaba un territorio ambientalmente exigente.",
  },
  {
    id: "3",
    image: "https://res.cloudinary.com/dmweipuof/image/upload/v1770912016/3_oybiwk.png",
    title: "Consecuencias en la metrópolis: urbanización y humos en Países Bajos",
    description: "El crecimiento urbano y la intensificación del comercio en Holanda durante la Edad Moderna favorecieron el aumento del consumo de tabaco. En yacimientos como Alkmaar, el análisis osteoarqueológico ha permitido identificar alteraciones vinculadas a problemas respiratorios, mostrando cómo los procesos de globalización también tuvieron consecuencias directas sobre la salud.",
  },
  {
    id: "4",
    image: "https://res.cloudinary.com/dmweipuof/image/upload/v1770912020/4_g1x4pv.png",
    title: "El agua hasta en los oídos en el Valle de México",
    description: "La expansión de la Ciudad de México implicó una intensificación en la construcción y mantenimiento de las chinampas del lago Xochimilco. El contacto frecuente y prolongado con el agua dejó huellas físicas en la población indígena de San Gregorio Atlapulco, visibles en alteraciones de los conductos auditivos externos. La transformación del paisaje productivo tuvo, así, un impacto directo sobre el cuerpo.",
  },
];

export const CVGallery = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4 py-4 sm:py-12">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-full h-[200px] bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex h-full">
              {/* Imagen a la izquierda */}
              <div className="w-1/3 h-full">
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Descripción a la derecha */}
              <div className="w-2/3 p-4 flex flex-col justify-center">
                <h4 className="font-anton text-xl mb-2 text-[#D5C5B0]">
                  {item.title}
                </h4>
                <p className="text-stone-200 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVGallery;
