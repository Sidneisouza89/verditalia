import { SANITY_DATASET, SANITY_PROJECT_ID } from './config';

// Monta a URL de uma imagem do Sanity já redimensionada e otimizada (WebP/AVIF automático).
// A referência tem o formato "image-<id>-<largura>x<altura>-<extensão>".
export function urlImagem(imagem, { w = 1600, h, q = 80 } = {}) {
  const ref = imagem?.asset?._ref;
  if (!ref || !SANITY_PROJECT_ID) return undefined;
  const [, id, dimensoes, ext] = ref.split('-');
  if (!id || !dimensoes || !ext) return undefined;
  const params = new URLSearchParams({ w: String(w), q: String(q), auto: 'format' });
  if (h) {
    params.set('h', String(h));
    params.set('fit', 'crop');
    // ponto de foco escolhido pela Lídice no painel (hotspot)
    if (imagem.hotspot) {
      params.set('crop', 'focalpoint');
      params.set('fp-x', String(imagem.hotspot.x));
      params.set('fp-y', String(imagem.hotspot.y));
    }
  }
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensoes}.${ext}?${params}`;
}
