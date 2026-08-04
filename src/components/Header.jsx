import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Destinos', hasDropdown: true },
  { label: 'Planejamento', hasDropdown: true },
  { label: 'Youtube', hasDropdown: false },
  { label: 'Sobre', hasDropdown: false },
  { label: 'Contato', hasDropdown: false },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-6">
        {/* Logo */}
        <a href="#top" className="flex flex-col leading-none group">
          <span className="font-display text-xl md:text-2xl tracking-wide text-white">
            VERDITALIA
          </span>
          <span className="text-[11px] md:text-xs text-white/80 mt-1">
            Vida com natureza e beleza.
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="text-sm text-white/90 hover:text-white transition-colors flex items-center gap-1"
            >
              {link.label.toUpperCase()}
              {link.hasDropdown && (
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#planejamento"
          className="hidden lg:inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 transition-colors text-white text-sm px-5 py-3 rounded-md"
        >
          Comece sua viagem
          <span aria-hidden>→</span>
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-forest-900 px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href="#" className="text-white/90 text-sm">
              {link.label.toUpperCase()}
            </a>
          ))}
          <a
            href="#planejamento"
            className="inline-flex items-center gap-2 bg-forest-600 text-white text-sm px-5 py-3 rounded-md w-fit"
          >
            Comece sua viagem →
          </a>
        </div>
      )}
    </header>
  );
}
