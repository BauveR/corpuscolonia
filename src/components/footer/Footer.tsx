import { useTranslation } from "react-i18next";
import leidenLogo from "../../assets/UniversiteitLeidenLogo.png";
import ullLogo from "../../assets/logo-ull-nuevo-blanco.png";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer
      className="relative z-40 w-full bg-gradient-to-t from-orange-950 to-transparent"
      role="contentinfo"
    >
      <div className="w-full px-16 md:px-32 pt-6 pb-10 sm:py-30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Texto a la izquierda */}
          <div className="flex-1 w-[140%] sm:w-auto mr-0 sm:mr-20 md:mr-60">
            <p className="text-xs md:text-sm text-stone-200 leading-relaxed">
              {t("footer.text")}
            </p>
          </div>

          {/* Logos a la derecha */}
          <div className="flex items-center gap-4 -mt-4 sm:mt-0">
            <img
              src={leidenLogo}
              alt="Universiteit Leiden"
              className="h-10 md:h-12 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
            <img
              src={ullLogo}
              alt="Universidad de La Laguna"
              className="h-8 md:h-10 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
