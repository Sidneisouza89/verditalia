import { createContext, useContext, useEffect, useState } from 'react';
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID, cmsAtivo } from './config';

// Busca uma vez o conteúdo publicado no Sanity (página inicial e Sobre).
// Enquanto carrega, ou se o CMS não estiver configurado, os componentes usam o texto padrão.
const QUERY = '{"inicio": *[_id == "inicio"][0], "sobre": *[_id == "sobre"][0]}';
const CACHE_KEY = 'verditalia-cms';

function lerCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
  } catch {
    return null;
  }
}

const ConteudoContext = createContext(null);

export function ConteudoProvider({ children }) {
  // última versão vista fica guardada no navegador: a próxima visita já abre com ela
  const [conteudo, setConteudo] = useState(() => (cmsAtivo ? lerCache() : null));

  useEffect(() => {
    if (!cmsAtivo) return;
    const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(QUERY)}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        setConteudo(j.result || null);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(j.result || null));
        } catch {
          // navegação privada: segue sem cache
        }
      })
      .catch(() => {
        // CMS fora do ar: fica com o cache ou com o texto padrão
      });
  }, []);

  return <ConteudoContext.Provider value={conteudo}>{children}</ConteudoContext.Provider>;
}

export function useConteudo() {
  return useContext(ConteudoContext);
}

// Texto bilíngue do CMS ({ pt, en }) no idioma atual; undefined quando vazio
export function tx(campo, lang) {
  const v = campo?.[lang];
  return typeof v === 'string' && v.trim() ? v : undefined;
}

// Lista de textos bilíngues; undefined quando não tem nenhum item preenchido
export function txLista(lista, lang) {
  const itens = (lista || []).map((x) => tx(x, lang)).filter(Boolean);
  return itens.length ? itens : undefined;
}
