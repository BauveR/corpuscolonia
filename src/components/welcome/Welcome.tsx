import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import leidenLogo from "../../assets/UniversiteitLeidenLogo.png";
import ullLogo from "../../assets/logo-ull-nuevo-blanco.png";

const desktopImage = "https://res.cloudinary.com/dmweipuof/image/upload/v1768775626/corpus_colonia_desktop_t90sru.png";
const tabletImage = "https://res.cloudinary.com/dmweipuof/image/upload/v1768775628/pantallas-03_tlu7r2.png";
const mobileImage = "https://res.cloudinary.com/dmweipuof/image/upload/v1768775625/pantallas-02_wdzoos.png";

export const Welcome = () => {
  const [backgroundImage, setBackgroundImage] = useState(desktopImage);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth < 640) {
        setBackgroundImage(mobileImage);
      } else if (window.innerWidth < 1024) {
        setBackgroundImage(tabletImage);
      } else {
        setBackgroundImage(desktopImage);
      }
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, []);

  useEffect(() => {
    // Remover el efecto de difuminado después de la carga inicial
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative w-full max-w-full h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden isolate bg-black"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        opacity: isInitialLoad ? 0 : 1,
        filter: isInitialLoad ? 'blur(8px)' : 'blur(0px)',
        transition: 'opacity 1s ease-out, filter 1s ease-out'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center w-full mt-[43.25vh] sm:mt-[63.25vh]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs sm:text-sm md:text-lg tracking-[0.05em] sm:tracking-[0.08em] text-stone-200 mb-8 sm:mb-10 font-sans font-normal mt-6 sm:mt-8 text-center px-4 max-w-[80%] sm:max-w-3xl leading-tight"
        >
          Bajo la superficie, los cuerpos del pasado guardan nuestra historia. Nuestro proyecto desentierra las huellas del colonialismo en huesos humanos repartidos por tres continentes unidos por el Atlántico.
        </motion.div>

        {/* Logos de las universidades */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-center justify-evenly sm:justify-center gap-6 sm:gap-8 px-4 mt-2 sm:mt-8 w-full sm:w-auto"
        >
          <img
            src={leidenLogo}
            alt="Universiteit Leiden"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain"
          />
          <img
            src={ullLogo}
            alt="Universidad de La Laguna"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain"
            style={{ transform: 'scale(0.6)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
