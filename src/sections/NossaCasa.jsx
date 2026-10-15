import { Link } from 'react-router-dom';
import { useLang, useText } from '../i18n/LanguageContext';
import { tx, useConteudo } from '../cms/ConteudoContext';
import { urlImagem } from '../cms/imagem';
import ItaliaMapa from '../components/ItaliaMapa';

// Ícones em traço fino, mesma linguagem visual da referência
const IconePin = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
const IconeMontanha = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M2.5 19.5L9 8l4 7 2.5-4 6 8.5h-19z" strokeLinejoin="round" />
    <path d="M7.2 11.2L9 12.5l1.6-1.4" strokeLinejoin="round" />
  </svg>
);
const IconeBussola = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" strokeLinejoin="round" />
  </svg>
);

const ICONES = [IconePin, IconeMontanha, IconeBussola];

export const TEXT = {
  pt: {
    eyebrow: 'Nossa casa',
    titulo: 'Trentino-Alto Adige, onde tudo começa.',
    corpo:
      'Vivemos aqui. Exploramos cada canto desta região durante todas as estações para trazer informações confiáveis, atualizadas e experiências que vão muito além do óbvio.',
    cta: 'Conhecer a região',
    diferenciais: [
      { title: 'Especialistas no território', desc: 'Informações que só quem vive aqui conhece.' },
      { title: 'Experiências autênticas', desc: 'Em vilarejos, produtores locais e tradições.' },
      { title: 'Conteúdo confiável', desc: 'Dicas práticas, honestas e sempre atualizadas.' },
    ],
    alt: 'Vilarejo nos Alpes Italianos',
    cardTexto: 'Nossa casa nos Alpes Italianos.',
    mapaAlt: 'Mapa da Itália com o Trentino-Alto Adige em destaque',
  },
  en: {
    eyebrow: 'Our home',
    titulo: 'Trentino-Alto Adige, where it all begins.',
    corpo:
      'We live here. We explore every corner of this region in every season to bring you reliable, up-to-date information and experiences that go far beyond the obvious.',
    cta: 'Discover the region',
    diferenciais: [
      { title: 'Experts on the ground', desc: 'Insights only people who live here know.' },
      { title: 'Authentic experiences', desc: 'In villages, with local producers and traditions.' },
      { title: 'Trusted content', desc: 'Practical, honest and always up-to-date tips.' },
    ],
    alt: 'Village in the Italian Alps',
    cardTexto: 'Our home in the Italian Alps.',
    mapaAlt: 'Map of Italy highlighting Trentino-Alto Adige',
  },
};

export default function NossaCasa() {
  const base = useText(TEXT);
  const { lang } = useLang();
  const c = useConteudo()?.inicio?.nossaCasa;
  // conteúdo do CMS quando preenchido; senão, o texto padrão
  const t = {
    ...base,
    eyebrow: tx(c?.eyebrow, lang) ?? base.eyebrow,
    titulo: tx(c?.titulo, lang) ?? base.titulo,
    corpo: tx(c?.texto, lang) ?? base.corpo,
    alt: tx(c?.foto?.alt, lang) ?? base.alt,
  };
  return (
    <section id="nossa-casa" className="bg-cream-100 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* Texto + diferenciais */}
      <div className="grid md:grid-cols-[1.45fr_1fr] items-center gap-8 md:gap-0 px-6 lg:pl-10 lg:pr-4 py-10 md:py-14">
        <div className="md:pr-8 md:border-r border-forest-900/15">
          <p className="text-[11px] md:text-xs tracking-[0.08em] uppercase text-forest-600 font-medium mb-3">
            {t.eyebrow}
          </p>
          <h2 className="font-display font-normal text-[1.75rem] md:text-[2rem] leading-[1.15] text-forest-900 mb-3">
            {t.titulo}
          </h2>
          <p className="text-stone-700 text-sm leading-relaxed mb-6">{t.corpo}</p>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 text-sm text-forest-900 hover:text-forest-600 transition-colors"
          >
            {t.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <ul className="flex flex-col gap-6 md:pl-8">
          {t.diferenciais.map(({ title, desc }, i) => {
            const Icon = ICONES[i];
            return (
            <li key={title} className="flex items-start gap-3.5">
              <span className="text-forest-700 shrink-0 mt-0.5">
                <Icon />
              </span>
              <div>
                <p className="text-sm font-medium text-forest-900 leading-tight">{title}</p>
                <p className="text-[13px] text-stone-700 leading-snug mt-1">{desc}</p>
              </div>
            </li>
            );
          })}
        </ul>
      </div>

      {/* Foto ampliada: ocupa toda a altura do bloco e encosta na borda direita */}
      <div className="relative min-h-[300px] lg:min-h-0">
        <img
          src={urlImagem(c?.foto, { w: 1800 }) ?? 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80'}
          alt={t.alt}
          className="absolute inset-0 w-full h-full object-cover md-fade-left"
          style={{ '--fade': '28%' }}
        />
        <div className="absolute bottom-5 right-5 lg:right-8 w-40 bg-forest-800/95 border border-white/60 text-white rounded-xl px-4 py-5 text-center">
          {/* Mapa da Itália ("bota") com a marcação do Trentino-Alto Adige */}
          <div className="mb-3 flex items-center justify-center text-white/90">
            <ItaliaMapa className="h-[88px] w-auto" titulo={t.mapaAlt} />
          </div>
          <p className="text-xs font-medium tracking-wide uppercase leading-tight mb-1.5">
            Trentino-Alto Adige
          </p>
          <p className="text-[11px] text-white/80 leading-snug">{t.cardTexto}</p>
        </div>
      </div>
    </section>
  );
}
