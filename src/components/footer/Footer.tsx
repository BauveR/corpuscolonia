import leidenLogo from "../../assets/UniversiteitLeidenLogo.png";
import ullLogo from "../../assets/logo-ull-nuevo-blanco.png";

export const Footer = () => {
  return (
    <footer
      className="relative z-40 w-full bg-gradient-to-t from-orange-950 to-transparent"
      role="contentinfo"
    >
      <div className="w-full px-16 md:px-32 py-30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Texto a la izquierda */}
          <div className="flex-1 mr-20 md:mr-60">
            <p className="text-xs md:text-sm text-stone-200 leading-relaxed">
              El investigador principal del proyecto, Jared Carballo-Pérez es personal postdoctoral contratado dentro del programa "Catalina Ruiz" de la Universidad de La Laguna, realizado con la financiación de la Agencia Canaria de Investigación, Innovación y Sociedad de la Información, del Gobierno de Canarias.
            </p>
          </div>

          {/* Logos a la derecha */}
          <div className="flex items-center gap-4">
            <img
              src={leidenLogo}
              alt="Universiteit Leiden"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <img
              src={ullLogo}
              alt="Universidad de La Laguna"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
