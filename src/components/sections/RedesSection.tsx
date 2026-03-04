import { RefObject, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { AnimatedSection } from "../common/AnimatedSection";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

const vimeoSrc = (id: string) =>
  `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&controls=0`;

const socialCards = [
  {
    id: "instagram",
    href: "https://www.instagram.com/corpuscolonia/",
    label: "Instagram",
    videoSrc: vimeoSrc("1167521640"),
    buttonColor: "#E1306C",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    href: "https://www.tiktok.com/@corpuscolonia",
    label: "TikTok",
    videoSrc: vimeoSrc("1170410564"),
    buttonColor: "#010101",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/jared-carballo-p%C3%A9rez-17b09261/",
    label: "LinkedIn",
    videoSrc: vimeoSrc("1170410544"),
    buttonColor: "#0A66C2",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const marqueeItems = Array.from({ length: 40 }, (_, i) => socialCards[i % socialCards.length]);

const CARD_WIDTH = 300;

export function RedesSection({ sectionRef }: Props) {
  const n = socialCards.length;
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [cardW, setCardW] = useState(CARD_WIDTH);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setCardW(Math.min(CARD_WIDTH, window.innerWidth - 32));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);



  const prev = () => setActive((p) => (p - 1 + n) % n);
  const next = () => setActive((p) => (p + 1) % n);

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };
  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) next();
    else if (dist < -50) prev();
  };

  const onMouseDown = (e: React.MouseEvent) => setDragStart(e.clientX);
  const onMouseUp = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const dist = dragStart - e.clientX;
    if (dist > 50) next();
    else if (dist < -50) prev();
    setDragStart(null);
  };
  const onMouseLeaveContainer = () => setDragStart(null);

  const getStyle = (index: number): React.CSSProperties => {
    if (index === active)
      return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 20 };
    if (index === (active + 1) % n)
      return { transform: "translateX(80%) scale(0.95)", opacity: 0.6, zIndex: 10 };
    if (index === (active - 1 + n) % n)
      return { transform: "translateX(-80%) scale(0.95)", opacity: 0.6, zIndex: 10 };
    return { transform: "scale(0.9)", opacity: 0, zIndex: 0 };
  };

  // Altura de la card: video 16:9 + footer con logo/botón (~80px) + padding (~24px)
  const cardH = Math.round(cardW * 1.67);
  const containerH = cardH + 60;

  return (
    <AnimatedSection
      id="redes"
      ref={sectionRef}
      viewportAmount={0.1}
      minHeight="auto"
    >
      <div className="w-full flex flex-col items-center py-16 gap-0 relative">

        {/* Wrapper relativo para centrar el marquee detrás del carrusel */}
        <div className="relative w-full">

        {/* Marquee — absoluto, detrás, centrado verticalmente */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 py-6 overflow-hidden pointer-events-none"
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
        >
          <div className="flex animate-marquee" style={{ width: "max-content" }}>
            {marqueeItems.map((item, i) => (
              <span key={i} className="flex-shrink-0 text-stone-400 px-12">
                {item.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Carrusel — en flujo, encima */}
        <div className="relative z-10 w-full max-w-[600px] mx-auto">
        <div className="w-full pt-6 pb-4 relative">
          <div
            ref={containerRef}
            className="relative overflow-hidden select-none"
            style={{ height: containerH, cursor: dragStart ? "grabbing" : "grab" }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeaveContainer}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Cards */}
            <div className="absolute inset-0 flex items-start justify-center">
              {socialCards.map((card, index) => (
                <div
                  key={card.id}
                  className="absolute top-0 transition-all duration-500"
                  style={{
                    width: cardW,
                    height: cardH,
                    cursor: index !== active ? "pointer" : undefined,
                    ...getStyle(index),
                  }}
                  onClick={() => index !== active && setActive(index)}
                >
                  {/* Card glass */}
                  <div className={[
                    "flex flex-col w-full h-full overflow-hidden rounded-3xl",
                    "bg-slate-900/30 backdrop-blur-2xl",
                    "shadow-xl shadow-black/20",
                    "border border-white/10",
                    "ring-1 ring-white/5",
                  ].join(" ")}>

                    {/* Video — cover vertical: iframe sobredimensionado y centrado */}
                    <div className="relative flex-1 overflow-hidden rounded-t-3xl">
                      <iframe
                        className="absolute"
                        style={{
                          width: "177.78%",
                          height: "100%",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        src={card.videoSrc}
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title={`${card.label} — CorpusColonia`}
                      />
                      {/* Overlay para capturar drag sobre el iframe */}
                      <div className="absolute inset-0" style={{ zIndex: 1 }} />
                    </div>

                    {/* Logo + botón */}
                    <div className="flex flex-row items-center justify-center gap-4 py-4 px-4 flex-shrink-0">
                      {card.icon}
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-xl text-sm font-semibold text-white tracking-wide transition-opacity duration-300 hover:opacity-80"
                        style={{ backgroundColor: card.buttonColor }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View more
                      </a>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
              {socialCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Ir a ${socialCards[idx].label}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: active === idx ? 20 : 8,
                    backgroundColor: active === idx ? "#FF8B00" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        </div>

        </div>{/* fin wrapper relativo */}

      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 120s linear infinite;
        }
      `}</style>
    </AnimatedSection>
  );
}
