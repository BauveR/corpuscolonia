import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PortafolioDetailPage } from "./PortafolioDetailPage";

export function PortafolioModal() {
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    // Cerrar modal y volver a la sección de portafolio
    navigate("/", { replace: true });
    setTimeout(() => {
      window.location.hash = "#portafolio";
    }, 100);
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.aside
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-modal
      role="dialog"
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="relative max-w-[1640px] w-full max-h-[90vh] overflow-auto rounded-3xl bg-slate-900/30 backdrop-blur-2xl border border-white/10 shadow-xl shadow-black/20 ring-1 ring-white/5"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <PortafolioDetailPage onClose={onClose} />
      </motion.div>
    </motion.aside>
  );
}
