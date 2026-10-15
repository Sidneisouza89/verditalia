// Configuração do Sanity (CMS). O ID do projeto vem da variável VITE_SANITY_PROJECT_ID
// no Railway. Sem ela, o site funciona normalmente com os textos e fotos padrão.
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || '';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = '2025-02-19';
export const cmsAtivo = Boolean(SANITY_PROJECT_ID);
