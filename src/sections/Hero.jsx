import { useLang, useText } from '../i18n/LanguageContext';
import { tx, useConteudo } from '../cms/ConteudoContext';
import { urlImagem } from '../cms/imagem';

export const TEXT = {
  pt: {
    linhas: ['Vida', 'com natureza', 'e beleza.'],
    alt: 'Casal admirando as montanhas ao entardecer',
    credito: ['Fotografia original Verditalia', 'Seceda, Dolomitas'],
  },
  en: {
    linhas: ['Life', 'with nature', 'and beauty.'],
    alt: 'Couple admiring the mountains at sunset',
    credito: ['Original Verditalia photography', 'Seceda, Dolomites'],
  },
};

const FOTO_PADRAO = 'https://images.unsplash.com/photo-1529566321973-795c4f4138bb?auto=format&fit=crop&w=1800&q=80';

export default function Hero() {
  const t = useText(TEXT);
  const { lang } = useLang();
  // conteúdo do CMS quando preenchido; senão, o texto padrão
  const c = useConteudo()?.inicio?.hero;
  const linhas = tx(c?.titulo, lang)?.split('\n').filter((l) => l.trim()) ?? t.linhas;
  const credito = tx(c?.credito, lang)?.split('\n') ?? t.credito;
  return (
    <section id="top" className="relative h-[480px] md:h-[560px] w-full overflow-hidden">
      <img
        src={urlImagem(c?.foto, { w: 2200 }) ?? FOTO_PADRAO}
        alt={tx(c?.foto?.alt, lang) ?? t.alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-forest-900/50" />

      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-16 md:pb-20">
        <h1 className="font-display text-white text-5xl md:text-6xl lg:text-[64px] leading-[1.08] max-w-xl">
          {linhas.map((linha, i) => (
            <span key={`${i}-${linha}`}>
              {i > 0 && <br />}
              {linha}
            </span>
          ))}
        </h1>
        {/* Botões removidos a pedido da Lídice — banner minimalista */}
      </div>

      <p className="absolute bottom-5 right-6 lg:right-10 text-white/70 text-xs text-right leading-tight">
        {credito.map((linha, i) => (
          <span key={`${i}-${linha}`}>
            {i > 0 && <br />}
            {linha}
          </span>
        ))}
      </p>
    </section>
  );
}
