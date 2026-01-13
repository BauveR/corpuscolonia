import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useValidProjects } from "../../hooks/useValidProjects";

type PortafolioItemState = {
  index: number;
  name: string;
  description?: string;
  primaryImage: string;
};

type Props = {
  onClose?: () => void;
};

export const PortafolioDetailPage = ({ onClose }: Props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const validProjects = useValidProjects();

  const itemFromState = state as PortafolioItemState | undefined;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/", { replace: true });
      setTimeout(() => {
        window.location.hash = "#portafolio";
      }, 100);
    }
  };

  // Usar el índice del state, o defaultear a 0 si no existe
  const currentIndex = itemFromState?.index ?? 0;
  const project = validProjects[currentIndex];

  // Si no hay state, usar el primer proyecto
  const data: PortafolioItemState = {
    index: currentIndex,
    name: itemFromState?.name ?? project?.text ?? "Proyecto",
    description: itemFromState?.description ?? project?.longDescription,
    primaryImage: itemFromState?.primaryImage ?? project?.resolvedImage ?? "",
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + validProjects.length) % validProjects.length;
    const prevProject = validProjects[prevIndex];
    navigate(`/portafolio/${prevIndex}`, {
      state: {
        index: prevIndex,
        name: prevProject?.text,
        primaryImage: prevProject?.resolvedImage,
        description: prevProject?.longDescription,
      },
    });
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % validProjects.length;
    const nextProject = validProjects[nextIndex];
    navigate(`/portafolio/${nextIndex}`, {
      state: {
        index: nextIndex,
        name: nextProject?.text,
        primaryImage: nextProject?.resolvedImage,
        description: nextProject?.longDescription,
      },
    });
  };

  return (
    <main className="relative mx-auto max-w-[1550px] px-4 sm:px-8 md:px-12 lg:px-16 pt-8 pb-12">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 z-50 text-stone-300 hover:text-white"
        aria-label="Cerrar"
      >
        <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
          <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={goPrev}
        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-6 p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 z-20 text-stone-300 hover:text-white"
        aria-label="Anterior"
      >
        <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={goNext}
        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-6 p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 z-20 text-stone-300 hover:text-white"
        aria-label="Siguiente"
      >
        <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.div
        className="flex flex-col lg:flex-row items-start lg:items-center gap-6 sm:gap-8 lg:gap-12 mt-12 sm:mt-16 max-w-[1200px] mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Imagen - 20% más pequeña: de 700px a 560px */}
        <div className="relative w-full lg:w-auto lg:flex-shrink-0 overflow-hidden rounded-2xl bg-slate-800/30">
          <motion.img
            key={data.primaryImage + currentIndex}
            src={data.primaryImage}
            alt={data.name}
            className="w-full lg:w-[560px] h-auto object-contain"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Título y descripción - derecha en desktop, abajo en mobile */}
        <motion.div
          className="flex flex-col justify-start lg:flex-1 w-full lg:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-stone-200 leading-tight">{data.name}</h1>
          {data.description && (
            <p className="mt-3 sm:mt-4 text-sm lg:text-base leading-relaxed text-stone-300">
              {data.description}
            </p>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
};

export default PortafolioDetailPage;
