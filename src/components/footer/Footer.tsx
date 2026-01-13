import { PROFILE_DATA } from "../../constants/profileData";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  const { contact } = PROFILE_DATA;

  return (
    <footer
      className="relative z-40 w-full min-h-[70px] md:min-h-[80px] bg-gradient-to-t from-slate-900/90 to-slate-900/30 backdrop-blur-md"
      role="contentinfo"
    >
      <div className="w-full px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center text-center md:text-left">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Email</span>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-stone-200 hover:text-white transition-colors duration-300"
            >
              {contact.email}
            </a>
          </div>

          {/* Teléfono */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Teléfono</span>
            <a
              href={`tel:${contact.phone}`}
              className="text-sm text-stone-200 hover:text-white transition-colors duration-300"
            >
              {contact.phone}
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">LinkedIn</span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-200 hover:text-white transition-colors duration-300"
            >
              {contact.linkedin.replace('https://', '')}
            </a>
          </div>

          {/* GitHub */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">GitHub</span>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-200 hover:text-white transition-colors duration-300 flex items-center gap-2 justify-center md:justify-start"
            >
              <FaGithub className="text-base" />
              <span>{contact.github.replace('https://', '')}</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Ricardo Bauve. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
