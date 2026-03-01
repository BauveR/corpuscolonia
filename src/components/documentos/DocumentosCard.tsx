import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type DocumentosCardProps = {
  id: string;
  index: number;
  name: string;
  primaryImage: string;
  secondaryImage?: string;
  description?: string;
  downloadUrl?: string;
  className?: string;
};

export const DocumentosCard = ({
  id,
  index,
  name,
  primaryImage,
  secondaryImage,
  description,
  downloadUrl,
  className = "",
}: DocumentosCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const hoverImage = secondaryImage || primaryImage;

  const resolvedDownloadUrl = downloadUrl
    ?? (primaryImage.includes("res.cloudinary.com")
      ? primaryImage.replace("/upload/", "/upload/fl_attachment/")
      : primaryImage);

  const goDetail = () => {
    navigate(`/documentos/${id}`, {
      state: {
        index,
        name,
        primaryImage,
        description,
        downloadUrl: resolvedDownloadUrl,
      },
    });
  };

  return (
    <div
      className={[
        "group relative flex flex-col cursor-pointer w-full h-full overflow-hidden rounded-3xl",
        "bg-slate-900/30 backdrop-blur-2xl",
        "shadow-xl shadow-black/20",
        "border border-white/10",
        "ring-1 ring-white/5",
        "hover:bg-slate-900/40 hover:border-white/15",
        "transition-all duration-500",
        "text-stone-300",
        "p-3",
        className,
      ].join(" ")}
      role="link"
      tabIndex={0}
      onClick={goDetail}
      onKeyDown={(e) => (e.key === "Enter" ? goDetail() : null)}
    >
      {/* Imagen con proporción vertical - ocupa la mayor parte del espacio */}
      <div className="relative w-full flex-1 overflow-hidden rounded-2xl bg-slate-800/50">
        {/* Imagen principal */}
        <motion.img
          src={primaryImage}
          alt={name}
          className="absolute inset-0 h-full w-full object-contain"
          initial={{ opacity: 1, scale: 1 }}
          whileHover={{ opacity: secondaryImage ? 0 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          draggable={false}
        />

        {/* Imagen hover (si existe) */}
        {secondaryImage && (
          <motion.img
            src={hoverImage}
            alt={`${name} – alternativa`}
            className="absolute inset-0 h-full w-full object-contain"
            initial={{ opacity: 0, scale: 1.02 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            draggable={false}
          />
        )}

      </div>

      {/* Título + descripción breve */}
      <div className="mt-3 px-1 flex-shrink-0">
        <h3 className="text-base tracking-wide font-medium">
          <span className="line-clamp-1">{name}</span>
        </h3>
        {description && (
          <p className="mt-1 text-sm text-stone-400 leading-snug line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Botones View + Descarga — siempre visibles */}
      <div className="mt-3 px-1 flex gap-2 flex-shrink-0">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            goDetail();
          }}
          className="flex-1 h-10 flex items-center justify-center text-white text-sm tracking-wide uppercase rounded-2xl
            bg-gradient-to-r from-orange-500 to-orange-700
            shadow-orange-300/30 hover:shadow-orange-500/50 shadow-lg
            transition duration-300 ease-in-out"
          whileTap={{ scale: 0.98 }}
        >
          {t("documents.view")}
        </motion.button>

        <motion.a
          href={resolvedDownloadUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 h-10 flex items-center justify-center text-white text-sm tracking-wide uppercase rounded-2xl shadow-lg
            transition duration-300 ease-in-out"
          style={{ backgroundColor: "#778ED8" }}
          whileTap={{ scale: 0.98 }}
        >
          {t("documents.download")}
        </motion.a>
      </div>
    </div>
  );
};
