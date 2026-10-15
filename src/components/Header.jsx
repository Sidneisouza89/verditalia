import { useState } from 'react';
import { Link } from 'react-router-dom';
import MountainMark from './MountainMark';
import { LANGS, useLang, useText } from '../i18n/LanguageContext';

const TEXT = {
  pt: { sobre: 'Sobre', contato: 'Contato', cta: 'Comece sua viagem', abrirMenu: 'Abrir menu', fecharMenu: 'Fechar menu', idioma: 'Idioma' },
  en: { sobre: 'About', contato: 'Contact', cta: 'Start your trip', abrirMenu: 'Open menu', fecharMenu: 'Close menu', idioma: 'Language' },
};

function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLang();
  const t = useText(TEXT);
  return (
    <div role="group" aria-label={t.idioma} className={`flex items-center text-xs font-medium ${className}`}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-white/40 px-1.5" aria-hidden="true">|</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`uppercase tracking-wide transition-colors ${
              lang === l ? 'text-white' : 'text-white/55 hover:text-white'
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

// solid=true -> usado em páginas sem imagem de fundo (ex: /agendar, /sobre,
// /contato), onde o header precisa de cor própria em vez de ficar
// transparente sobre o hero.
export default function Header({ solid = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useText(TEXT);

  const links = [
    { label: t.sobre, to: '/sobre' },
    { label: t.contato, to: '/contato' },
    { label: 'YouTube', href: 'https://www.youtube.com/@verditalia', external: true },
  ];

  const renderLink = (link, className) =>
    link.external ? (
      <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label.toUpperCase()}
      </a>
    ) : (
      <Link key={link.label} to={link.to} className={className} onClick={() => setMenuOpen(false)}>
        {link.label.toUpperCase()}
      </Link>
    );

  return (
    <header className={solid ? 'relative bg-forest-900 z-30' : 'absolute top-0 left-0 right-0 z-30'}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 py-5 md:py-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <MountainMark className="h-7 md:h-8 w-auto text-white" />
          <span className="font-display text-xl md:text-2xl tracking-wide text-white">VERDITALIA</span>
        </Link>

        {/* Nav + CTA agrupados à direita, próximos entre si */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {links.map((link) => renderLink(link, 'text-sm text-white/90 hover:text-white transition-colors'))}
          </nav>

          <LangSwitch />

          <Link
            to="/agendar"
            className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 transition-colors text-white text-sm px-5 py-3 rounded-md"
          >
            {t.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Celular: idioma sempre visível + botão do menu */}
        <div className="flex lg:hidden items-center gap-5">
          <LangSwitch />
          <button
            className="text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.fecharMenu : t.abrirMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-forest-900 px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-white/10">
          {links.map((link) => renderLink(link, 'text-white/90 text-sm py-1'))}
          <Link
            to="/agendar"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 bg-forest-600 text-white text-sm px-5 py-3 rounded-md w-fit mt-1"
          >
            {t.cta} →
          </Link>
        </div>
      )}
    </header>
  );
}
