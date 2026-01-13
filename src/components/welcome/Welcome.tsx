import { motion } from "framer-motion";
import { BackgroundBlobs } from "../background/BackgroundBlobs";
// import { TitleMov } from "../titleRicardo/TitleMov";
// import { TitleBauve } from "../titleBauve/TitleBauve";
import DualColorTextPressure from "../textPressure/DualColorTextPressure";

export const Welcome = () => {

  return (
    <section className="relative w-full max-w-full h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden isolate">
      {/* Blobs dentro de esta sección y detrás del contenido */}
      <BackgroundBlobs />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        {/* SVG Titles - Commented but kept for future use */}
        {/* <TitleMov /> */}
        {/* <TitleBauve /> */}

        {/* TextPressure Effect - Single line for all devices */}
        <div className="w-full max-w-7xl px-4">
          <div className="w-full h-[100px] sm:h-[120px] md:h-[150px] lg:h-[200px]" style={{ position: 'relative' }}>
            <DualColorTextPressure
              text1="RICARDO"
              text2="BAUVE"
              color1="#F17313"
              color2="#93A1B7"
              width={true}
              weight={true}
              italic={false}
              alpha={false}
              minFontSize={40}
              spacing={20}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm sm:text-base md:text-xl tracking-[0.15em] sm:tracking-[0.2em] text-white mb-8 sm:mb-10 font-sans font-medium mt-6 sm:mt-8 text-center px-4"
        >
          {/* Mobile: 3 líneas */}
          <div className="flex flex-col items-center sm:hidden">
            <span>Product Designer</span>
            <span>&</span>
            <span>Frontend Developer</span>
          </div>
          {/* Desktop: 1 línea */}
          <div className="hidden sm:block whitespace-nowrap">
            Product Designer & Frontend Developer
          </div>
        </motion.div>

        {/* no navegación programática: dejamos que el App haga el scroll suave */}
        <a href="/#cv" className="relative z-10">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="px-6 py-3 rounded-3xl border border-white/20 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white backdrop-blur-md tracking-wide text-xs sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Ver CV
          </motion.button>
        </a>
      </motion.div>
    </section>
  );
};