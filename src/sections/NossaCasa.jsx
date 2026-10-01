import { Link } from 'react-router-dom';

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

const DIFERENCIAIS = [
  { title: 'Conhecimento local', desc: 'Informações que só quem vive aqui conhece.', Icon: IconePin },
  { title: 'Experiências reais', desc: 'Testamos cada roteiro, trilha e hospedagem.', Icon: IconeMontanha },
  { title: 'Conteúdo confiável', desc: 'Dicas práticas, honestas e sempre atualizadas.', Icon: IconeBussola },
];

// Degradê largo só na borda esquerda da foto, dissolvendo no fundo creme
const fadeLeft = {
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 28%)',
  maskImage: 'linear-gradient(to right, transparent 0%, black 28%)',
};

export default function NossaCasa() {
  return (
    <section id="nossa-casa" className="bg-cream-100 grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* Texto + diferenciais */}
      <div className="grid md:grid-cols-[1.45fr_1fr] items-center gap-8 md:gap-0 px-6 lg:pl-10 lg:pr-4 py-10 md:py-14">
        <div className="md:pr-8 md:border-r border-forest-900/15">
          <p className="text-[11px] md:text-xs tracking-[0.08em] uppercase text-forest-600 font-medium mb-3">
            Nossa casa
          </p>
          <h2 className="font-display font-normal text-[1.75rem] md:text-[2rem] leading-[1.15] text-forest-900 mb-3">
            Trentino-Alto Adige, onde tudo começa.
          </h2>
          <p className="text-stone-700 text-sm leading-relaxed mb-6">
            Vivemos aqui. Exploramos cada canto desta região durante todas as estações
            para trazer informações confiáveis, atualizadas e experiências que vão muito
            além do óbvio.
          </p>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 text-sm text-forest-900 hover:text-forest-600 transition-colors"
          >
            Conhecer a região
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <ul className="flex flex-col gap-6 md:pl-8">
          {DIFERENCIAIS.map(({ title, desc, Icon }) => (
            <li key={title} className="flex items-start gap-3.5">
              <span className="text-forest-700 shrink-0 mt-0.5">
                <Icon />
              </span>
              <div>
                <p className="text-sm font-medium text-forest-900 leading-tight">{title}</p>
                <p className="text-[13px] text-stone-700 leading-snug mt-1">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Foto ampliada: ocupa toda a altura do bloco e encosta na borda direita */}
      <div className="relative min-h-[300px] lg:min-h-0">
        <img
          src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80"
          alt="Vilarejo nos Alpes Italianos"
          className="absolute inset-0 w-full h-full object-cover"
          style={fadeLeft}
        />
        <div className="absolute bottom-5 right-5 lg:right-8 w-40 bg-forest-800/95 border border-white/60 text-white rounded-xl px-4 py-5 text-center">
          {/* Espaço reservado para o desenho do mapa da Itália (a "bota") com a marcação da região */}
          <div className="h-16 mb-3 flex items-center justify-center text-white/80">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.3" />
            </svg>
          </div>
          <p className="text-xs font-medium tracking-wide uppercase leading-tight mb-1.5">
            Trentino-Alto Adige
          </p>
          <p className="text-[11px] text-white/80 leading-snug">Nossa casa nos Alpes Italianos.</p>
        </div>
      </div>
    </section>
  );
}
