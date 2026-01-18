import image1 from "../../assets/image.png";
import image2 from "../../assets/image (1).png";
import image3 from "../../assets/image (2).png";
import image4 from "../../assets/image (3).png";

const galleryItems = [
  {
    id: "1",
    image: image1,
    description: "La Iglesia de La Concepción en Santa Cruz de Tenerife, en donde se excavaron los individuos enterrados en el interior que evidenciaron una sociedad del siglo XVIII muy mestiza, y serán incluidos en el proyecto",
  },
  {
    id: "2",
    image: image2,
    description: "Fosa común en Alkmaar (Países Bajos) correspondiente a los conflictos de 1573",
  },
  {
    id: "3",
    image: image3,
    description: "Catedral Metropolitana de Ciudad de México, cuyos individuos excavados en su interior serán incluidos en este estudio",
  },
  {
    id: "4",
    image: image4,
    description: "Esqueletos hallados en San Marcial de Rubicón (Lanzarote, Canarias), el primer asentamiento europeo en el Atlántico",
  },
];

export const CVGallery = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4 py-12">
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
                <p className="text-white/80 text-sm leading-relaxed">
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
