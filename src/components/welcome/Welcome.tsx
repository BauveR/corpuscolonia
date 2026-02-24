import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import leidenLogo from "../../assets/UniversiteitLeidenLogo.png";
import ullLogo from "../../assets/logo-ull-nuevo-blanco.png";

const desktopImage = "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_1920/v1768775626/corpus_colonia_desktop_t90sru.png";
const tabletImage = "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_1536/v1768775628/pantallas-03_tlu7r2.png";
const mobileImage = "https://res.cloudinary.com/dmweipuof/image/upload/f_auto,q_auto,w_828/v1768775625/pantallas-02_wdzoos.png";

const getInitialImage = () => {
  if (typeof window === 'undefined') return desktopImage;
  if (window.innerWidth < 640) return mobileImage;
  if (window.innerWidth < 1024) return tabletImage;
  return desktopImage;
};

export const Welcome = () => {
  const [backgroundImage, setBackgroundImage] = useState(getInitialImage);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);

  useEffect(() => {
    const updateBackground = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
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
    const timer = setTimeout(() => setIsInitialLoad(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative w-full max-w-full h-[100svh] overflow-hidden isolate bg-black"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'top center' : 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        opacity: isInitialLoad ? 0 : 1,
        filter: isInitialLoad ? 'blur(8px)' : 'blur(0px)',
        transition: 'opacity 1s ease-out, filter 1s ease-out'
      }}
    >

      {/* Mobile: contenedor absoluto — ajusta bottom para subir/bajar todo el bloque */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute z-10 left-0 right-0 flex flex-col items-center gap-3"
          style={{ bottom: '10%' }}
        >
          <p className="text-[0.74rem] text-white text-center font-sans font-normal leading-tight tracking-[0.05em] max-w-full">
            Bajo la superficie, los cuerpos del pasado guardan nuestra historia.
            Nuestro proyecto desentierra las huellas del colonialismo en huesos humanos repartidos por tres continentes unidos por el Atlántico.
          </p>
          <div className="flex items-center justify-center gap-6 w-full">
            <img src={leidenLogo} alt="Universiteit Leiden" className="h-10 w-auto object-contain" draggable={false} />
            <img src={ullLogo} alt="Universidad de La Laguna" className="h-7 w-auto object-contain" draggable={false} />
          </div>
        </motion.div>
      )}

      {/* Tablet / Desktop */}
      {!isMobile && (
        <div className="relative z-10 flex flex-col items-center w-full mt-[63.25vh] px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm md:text-lg tracking-[0.08em] text-white mb-10 font-sans font-normal mt-8 text-center px-4 max-w-3xl leading-tight"
          >
            Bajo la superficie, los cuerpos del pasado guardan nuestra historia.
            Nuestro proyecto desentierra las huellas del colonialismo en huesos humanos repartidos por tres continentes unidos por el Atlántico.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center justify-center gap-8 px-4 mt-8 w-full"
          >
            <img src={leidenLogo} alt="Universiteit Leiden" className="h-16 md:h-20 w-auto object-contain" />
            <img src={ullLogo} alt="Universidad de La Laguna" className="h-10 md:h-12 w-auto object-contain" />
          </motion.div>
        </div>
      )}

    </section>
  );
};
