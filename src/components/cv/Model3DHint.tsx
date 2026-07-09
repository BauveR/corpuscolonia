import { useEffect, useState } from "react";

type Props = {
  label: string;
  loaded: boolean;
  dismissTrigger?: boolean;
};

export function Model3DHint({ label, loaded, dismissTrigger }: Props) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!loaded || dismissed) return;
    const timer = setTimeout(() => setDismissed(true), 4000);
    return () => clearTimeout(timer);
  }, [loaded, dismissed]);

  useEffect(() => {
    if (dismissTrigger) setDismissed(true);
  }, [dismissTrigger]);

  const visible = loaded && !dismissed;

  return (
    <div
      className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none transition-opacity duration-700 z-20"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden={!visible}
    >
      <span className="px-3 py-1.5 rounded-full text-[11px] tracking-wide text-white/90 bg-black/40 backdrop-blur-sm border border-white/10">
        {label}
      </span>
    </div>
  );
}
