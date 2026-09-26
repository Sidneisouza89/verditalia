import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'YouTube', href: '#youtube' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-6">
        <a href="#top" className="flex flex-col leading-none group">
          <span className="font-display text-xl md:text-2xl tracking-wide text-white">
            VERDITALIA
          </span>
          <span className="text-[11px] md:text-xs text-white/80 mt-1">
            Vida com natureza e beleza.
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </nav>

        <a
          href="#planejamento"
          className="hidden lg:inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 transition-colors text-white text-sm px-5 py-3 rounded-md"
        >
          Comece sua viagem
          <span aria-hidden>→</span>
        </a>

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

      {menuOpen && (
        <div className="lg:hidden bg-forest-900 px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="text-white/90 text-sm">
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
