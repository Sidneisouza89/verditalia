import { Link } from 'react-router-dom';
import MountainMark from '../components/MountainMark';

const INSTAGRAM = 'https://www.instagram.com/verditalia__';
const YOUTUBE = 'https://www.youtube.com/@verditalia';
const TIKTOK = 'https://www.tiktok.com/@verditalia_';

const iconProps = { width: 20, height: 20, viewBox: '0 0 24 24', 'aria-hidden': true };

const IconeInstagram = () => (
  <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconeYoutube = () => (
  <svg {...iconProps} fill="currentColor">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
  </svg>
);
const IconeTiktok = () => (
  <svg {...iconProps} fill="currentColor">
    <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.5c0 3.6-2.6 6.2-6 6.2a5.9 5.9 0 0 1-6-6c0-3.6 2.9-6.1 6.6-5.8v2.8c-.6-.2-1.2-.2-1.8 0a3.1 3.1 0 0 0-2 3c0 1.8 1.5 3.2 3.2 3.1 1.8 0 3.1-1.4 3.1-3.3V3h2.9z" />
  </svg>
);
const IconeEmail = () => (
  <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5L12 13l8.5-6.5" strokeLinejoin="round" />
  </svg>
);
const IconeLocal = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const COLUNAS = [
  {
    titulo: 'Destinos',
    links: [
      { label: 'Dolomitas', to: '/#guias' },
      { label: 'Umbria', to: '/#guias' },
      { label: 'Roma', to: '/#guias' },
      { label: 'Trentino-Alto Adige', to: '/#nossa-casa' },
    ],
  },
  {
    titulo: 'Planejamento',
    links: [
      { label: 'Consultoria personalizada', to: '/agendar' },
      { label: 'Fale conosco', to: '/contato' },
    ],
  },
  {
    titulo: 'Verditalia',
    links: [{ label: 'Sobre nós', to: '/sobre' }],
  },
];

const linkClass = 'text-sm text-white/75 hover:text-white transition-colors';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div>
          <Link to="/" className="inline-flex flex-col items-start mb-5">
            <MountainMark className="h-6 w-auto text-white/90 mb-1" />
            <span className="font-display text-2xl tracking-[0.08em] leading-none">VERDITALIA</span>
            <span className="text-xs text-white/70 mt-1.5">Vida com natureza e beleza.</span>
          </Link>

          <p className="flex items-center gap-2 text-sm text-white/75 mb-5">
            <IconeLocal />
            Trentino-Alto Adige, Itália
          </p>

          <div className="flex items-center gap-4 text-white/85">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
              <IconeInstagram />
            </a>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors">
              <IconeYoutube />
            </a>
            <a href={TIKTOK} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-white transition-colors">
              <IconeTiktok />
            </a>
            <Link to="/contato" aria-label="Enviar e-mail" className="hover:text-white transition-colors">
              <IconeEmail />
            </Link>
          </div>
        </div>

        {/* Colunas de navegação */}
        {COLUNAS.map((col) => (
          <div key={col.titulo} className="lg:justify-self-center">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-white mb-4">{col.titulo}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>© 2026 Verditalia. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/80">Política de Privacidade</a>
            <a href="#" className="hover:text-white/80">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
