import { Link } from 'react-router-dom';

const DIFERENCIAIS = [
  {
    title: 'Especialistas no território',
    desc: 'Informações que só quem vive aqui conhece.',
    icon: '📍',
  },
  {
    title: 'Experiências autênticas',
    desc: 'Em vilarejos, produtores locais e tradições.',
    icon: '🥾',
  },
  {
    title: 'Conteúdo confiável',
    desc: 'Dicas práticas, honestas e sempre atualizadas.',
    icon: '💬',
  },
];

export default function NossaCasa() {
  return (
    <section className="bg-cream-100 py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_auto_1.3fr] gap-8 lg:gap-10 items-center">
        {/* Coluna 1: texto */}
        <div>
          <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
            NOSSA CASA
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-forest-900 mb-4 max-w-xs">
            Trentino-Alto Adige, onde tudo começa.
          </h2>
          <p className="text-stone-700 text-sm leading-relaxed mb-5 max-w-xs">
            Vivemos aqui. Exploramos cada canto desta região durante todas as estações
            para trazer informações confiáveis, atualizadas e experiências que vão muito
            além do óbvio.
          </p>
          <Link to="/sobre" className="text-sm text-forest-800 underline underline-offset-4 w-fit">
            Conhecer a região →
          </Link>
        </div>

        {/* Coluna 2: mini coluna de diferenciais, empilhados */}
        <div className="flex flex-row lg:flex-col gap-6 lg:gap-7">
          {DIFERENCIAIS.map((d) => (
            <div key={d.title} className="flex items-start gap-2.5 max-w-[180px]">
              <span className="text-base leading-none mt-0.5">{d.icon}</span>
              <div>
                <p className="text-sm font-medium text-forest-900 leading-tight">{d.title}</p>
                <p className="text-xs text-stone-700 leading-snug mt-0.5">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coluna 3: foto com gradiente na borda esquerda, dissolvendo com o fundo */}
        <div className="relative h-[280px] lg:h-[340px]">
          <img
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80"
            alt="Cidade às margens de um rio no Trentino-Alto Adige"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 12%)',
            }}
          />
          <div className="absolute bottom-5 right-5 bg-forest-800/95 text-white rounded-xl p-4 w-40 backdrop-blur-sm">
            <div className="text-xl mb-1.5">🗺️</div>
            <p className="font-display text-xs leading-tight mb-1">
              TRENTINO-ALTO ADIGE
            </p>
            <p className="text-[11px] text-white/70">Nossa casa nos Alpes Italianos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
