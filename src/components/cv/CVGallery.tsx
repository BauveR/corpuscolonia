import { useTranslation } from "react-i18next";

const galleryItemKeys = [
  {
    id: "1",
    image: "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_400,h_120,c_fill/v1770912007/1_ppw6g3.png",
    titleKey: "gallery.card1.title",
    descriptionKey: "gallery.card1.description",
  },
  {
    id: "2",
    image: "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_400,h_120,c_fill/v1770912011/2_fjcj82.png",
    titleKey: "gallery.card2.title",
    descriptionKey: "gallery.card2.description",
  },
  {
    id: "3",
    image: "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_400,h_120,c_fill/v1770912016/3_oybiwk.png",
    titleKey: "gallery.card3.title",
    descriptionKey: "gallery.card3.description",
  },
  {
    id: "4",
    image: "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_400,h_120,c_fill/v1770912020/4_g1x4pv.png",
    titleKey: "gallery.card4.title",
    descriptionKey: "gallery.card4.description",
  },
];

const CARD_WIDTH = 396;
const CARD_HEIGHT = 600;

export const CVGallery = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex justify-center py-4">
      <div className="flex gap-4 flex-wrap justify-center">
        {galleryItemKeys.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10"
            style={{ width: `min(${CARD_WIDTH}px, calc(100vw - 2rem))`, height: CARD_HEIGHT }}
          >
            {/* Imagen — 36% */}
            <div style={{ height: "36%" }} className="w-full flex-shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={t(item.titleKey)}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Texto — 64% */}
            <div style={{ height: "64%" }} className="p-5 flex flex-col justify-center sm:justify-start overflow-hidden">
              <h4 className={`font-anton mb-4 text-[#D5C5B0] leading-snug ${item.id === "3" ? "text-[1.685rem] lg:text-[1.432rem]" : "text-[1.685rem]"}`}>
                {t(item.titleKey)}
              </h4>
              <p className="text-stone-300/80 text-sm lg:text-[0.96rem] leading-relaxed text-center">
                {t(item.descriptionKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVGallery;
