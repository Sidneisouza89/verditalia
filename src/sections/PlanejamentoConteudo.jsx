import { Link } from 'react-router-dom';

const BENEFICIOS = [
  'Roteiro personalizado',
  'Suporte antes e durante a viagem',
  'Economia de tempo e dinheiro',
  'Experiências reais e exclusivas',
];

// Último vídeo do canal. Para trocar, basta mudar o ID e o título
// (no futuro isso vem do CMS).
const VIDEO = {
  id: 'Wg-2UbbbzhY',
  titulo: 'Assis, Úmbria',
};
const VIDEO_URL = `https://youtu.be/${VIDEO.id}`;

// Esmaece só a borda esquerda da foto (lado do texto), dissolvendo no fundo.
// O lado direito fica sólido, sem efeito.
const fadeLeft = {
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
  maskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
};

// Tipografia compartilhada pelos dois blocos (mesma da referência)
const eyebrow = 'text-[11px] md:text-xs tracking-[0.08em] uppercase text-forest-600 font-medium mb-3';
const titulo = 'font-display font-normal text-[1.75rem] md:text-[2rem] leading-[1.15] text-forest-900 mb-3';
const corpo = 'text-stone-700 text-sm leading-relaxed mb-5';

function Seta() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <span className="w-[18px] h-[18px] rounded-full bg-forest-600 text-white flex items-center justify-center shrink-0">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function PlanejamentoConteudo() {
  return (
    <section id="planejamento" className="bg-cream-200">
      <div className="grid lg:grid-cols-2">
        {/* Planejamento / Consultoria */}
        <div className="grid md:grid-cols-[1.2fr_1fr] items-stretch gap-0 md:gap-6 px-6 md:pr-0 lg:pl-10 border-b lg:border-b-0 lg:border-r border-forest-900/10">
          <div className="py-8">
            <p className={eyebrow}>Planejamento personalizado</p>
            <h3 className={titulo}>Sua viagem, do seu jeito.</h3>
            <p className={corpo}>
              Criamos roteiros sob medida com base no seu perfil, tempo disponível, interesses e orçamento.
            </p>
            <ul className="space-y-2.5 mb-7">
              {BENEFICIOS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-forest-900">
                  <Check />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/agendar"
              className="inline-flex items-center gap-3 bg-forest-600 hover:bg-forest-500 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md"
            >
              Agendar consultoria <Seta />
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&w=900&q=80"
            alt="Mesa de planejamento de viagem com mapa e caneca Verditalia"
            className="h-56 md:h-full w-full object-cover"
            style={fadeLeft}
          />
        </div>

        {/* YouTube */}
        <div id="youtube" className="grid md:grid-cols-[1.1fr_1fr] items-center gap-6 px-6 lg:px-10 py-8">
          <div>
            <p className={eyebrow}>Conteúdo em campo</p>
            <h3 className={titulo}>Inspiração para a sua próxima viagem.</h3>
            <p className={corpo}>
              Vídeos semanais com roteiros, trilhas, dicas e muito mais sobre a Itália.
            </p>
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-forest-600 hover:bg-forest-500 transition-colors text-white text-sm font-medium px-5 py-3 rounded-md mb-7"
            >
              Assistir último vídeo
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5-12-7.5z" strokeLinejoin="round" />
              </svg>
            </a>
            <div>
              <a
                href="https://www.youtube.com/@verditalia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-forest-900 hover:text-forest-600 transition-colors"
              >
                Explorar canal no YouTube <Seta />
              </a>
            </div>
          </div>

          {/*
            Capa clicável em vez de iframe (alguns vídeos têm incorporação
            desativada pelo dono). Card sólido, cantos arredondados, sem degradê.
          */}
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-[4/3.4] rounded-xl overflow-hidden group shadow-sm"
          >
            <img
              src={`https://img.youtube.com/vi/${VIDEO.id}/maxresdefault.jpg`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://img.youtube.com/vi/${VIDEO.id}/hqdefault.jpg`;
              }}
              alt={`Último vídeo do canal Verditalia: ${VIDEO.titulo}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* escurece só a base, para o título ficar legível */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 to-transparent" />
            <span className="absolute top-3 left-3 bg-forest-700/90 text-white text-[10px] font-medium px-2.5 py-1 rounded-md">
              Último vídeo
            </span>
            <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/55 group-hover:bg-black/70 transition-colors flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <p className="absolute left-4 right-4 bottom-4 text-white text-sm font-medium uppercase tracking-wide leading-snug">
              {VIDEO.titulo}
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
