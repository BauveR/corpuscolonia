import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TypingText } from "../common/TypingText";
import { GlowingCards, GlowingCard } from "../common/GlowingCards";

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
  const [dims, setDims] = useState({ w: CARD_WIDTH, h: CARD_HEIGHT, mobile: false });

  useEffect(() => {
    const update = () => {
      const w = Math.min(CARD_WIDTH, window.innerWidth - 32);
      const mobile = w < CARD_WIDTH;
      setDims({ w, h: Math.round(w * (CARD_HEIGHT / CARD_WIDTH)), mobile });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="w-full flex justify-center py-4">
      <GlowingCards>
        {galleryItemKeys.map((item) => (
          <GlowingCard
            key={item.id}
            glowColor="#FF8B00"
            className="flex flex-col bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10"
            style={{ width: dims.w, height: dims.mobile ? undefined : dims.h }}
          >
            {/* Imagen */}
            <div
              className="w-full flex-shrink-0 overflow-hidden"
              style={{ height: dims.mobile ? 120 : "36%" }}
            >
              <img
                src={item.image}
                alt={t(item.titleKey)}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Texto */}
            <div className="p-5 flex flex-col justify-start">
              <TypingText
                as="h4"
                className="font-anton text-[1.685rem] mb-4 text-[#D5C5B0] leading-snug"
                duration={1.8}
                delay={0.1}
              >
                {t(item.titleKey)}
              </TypingText>
              <p className="text-stone-300/80 text-sm leading-relaxed">
                {t(item.descriptionKey)}
              </p>
            </div>
          </GlowingCard>
        ))}
      </GlowingCards>
    </div>
  );
};

export default CVGallery;
