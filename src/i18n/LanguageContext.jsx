import { createContext, useContext, useEffect, useState } from 'react';

// Idiomas do site. IT e ES entram na fase 2: é só adicionar aqui e
// incluir os textos em cada componente.
export const LANGS = ['pt', 'en'];
const STORAGE_KEY = 'verditalia-lang';

const META = {
  pt: {
    htmlLang: 'pt-BR',
    title: 'Verditalia — Vida com natureza e beleza',
    description: 'Guias autorais, consultoria de viagem e experiências autênticas nos Alpes Italianos.',
  },
  en: {
    htmlLang: 'en',
    title: 'Verditalia — Life with nature and beauty',
    description: 'Original travel guides, trip planning and authentic experiences in the Italian Alps.',
  },
};

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// Ordem de prioridade: ?lang= na URL > escolha salva > idioma do navegador > PT
function initialLang() {
  if (typeof window === 'undefined') return 'pt';
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  const stored = readStored();
  if (LANGS.includes(stored)) return stored;
  const nav = (navigator.language || 'pt').toLowerCase();
  return nav.startsWith('pt') ? 'pt' : 'en';
}

const LanguageContext = createContext({ lang: 'pt', setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // navegação privada ou storage bloqueado: segue sem lembrar a escolha
    }
    const meta = META[lang];
    document.documentElement.lang = meta.htmlLang;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

// Atalho: cada componente declara { pt: {...}, en: {...} } e recebe o bloco do idioma atual
export function useText(dict) {
  const { lang } = useLang();
  return dict[lang] || dict.pt;
}
