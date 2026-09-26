import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Sobre', to: '/sobre' },
  { label: 'YouTube', href: 'https://www.youtube.com/@verditalia', external: true },
  { label: 'Contato', to: '/contato' },
];

// solid=true -> usado em páginas sem imagem de fundo (ex: /agendar, /sobre,
// /contato), onde o header precisa de cor própria em vez de ficar
// transparente sobre o hero.
export default function Header({ solid = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderLink = (link, className) =>
    link.external ? (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label.toUpperCase()}
      </a>
    ) : (
      <Link key={link.label} to={link.to} className={className}>
        {link.label.toUpperCase()}
      </Link>
    );

  return (
    <header
      className={
        solid
          ? 'relative bg-forest-900 z-30'
          : 'absolute top-0 left-0 right-0 z-30'
      }
    >
      <div className="max-w-[1400px] mx-auto flex items-center px-6 lg:px-10 py-6">
        <Link to="/" className="flex flex-col leading-none shrink-0">
          <span className="font-display text-xl md:text-2xl tracking-wide text-white">
            VERDITALIA
          </span>
          <span className="text-[11px] md:text-xs text-white/80 mt-1">
            Vida com natureza e beleza.
          </span>
        </Link>

        {/* Recuado pra perto do logo (não colado), em vez de centralizado */}
        <nav className="hidden lg:flex items-center gap-8 ml-14">
          {NAV_LINKS.map((link) =>
            renderLink(link, 'text-sm text-white/90 hover:text-white transition-colors')
          )}
        </nav>

        <Link
          to="/agendar"
          className="hidden lg:inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 transition-colors text-white text-sm px-5 py-3 rounded-md ml-auto"
        >
          Comece sua viagem
          <span aria-hidden>→</span>
        </Link>

        <button
          className="lg:hidden text-white ml-auto"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-forest-900 px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => renderLink(link, 'text-white/90 text-sm'))}
          <Link
            to="/agendar"
            className="inline-flex items-center gap-2 bg-forest-600 text-white text-sm px-5 py-3 rounded-md w-fit"
          >
            Comece sua viagem →
          </Link>
        </div>
      )}
    </header>
  );
}
