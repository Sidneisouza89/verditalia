import { Link } from 'react-router-dom';

const DIFERENCIAIS = [
  { title: 'Especialistas no território', icon: '📍' },
  { title: 'Experiências autênticas', icon: '🥾' },
  { title: 'Conteúdo confiável', icon: '💬' },
];

export default function NossaCasa() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="bg-cream-100 px-6 lg:px-10 py-16 md:py-24 flex flex-col justify-center">
          <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
            NOSSA CASA
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-5 max-w-md">
            Trentino-Alto Adige, onde tudo começa.
          </h2>
          <p className="text-stone-700 text-sm leading-relaxed mb-8 max-w-md">
            Vivemos aqui, e exploramos cada canto desta região em todas as estações.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
            {DIFERENCIAIS.map((d) => (
              <div key={d.title} className="flex items-center gap-2.5">
                <span className="text-base leading-none">{d.icon}</span>
                <p className="text-sm font-medium text-forest-900">{d.title}</p>
              </div>
            ))}
          </div>

          <Link to="/sobre" className="text-sm text-forest-800 underline underline-offset-4 w-fit">
            Conhecer a região →
          </Link>
        </div>

        <div className="relative min-h-[380px] lg:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80"
            alt="Cidade às margens de um rio no Trentino-Alto Adige"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute bottom-6 right-6 bg-forest-800/95 text-white rounded-xl p-5 w-48 backdrop-blur-sm">
            <div className="text-2xl mb-2">🗺️</div>
            <p className="font-display text-sm leading-tight mb-1">
              TRENTINO-ALTO ADIGE
            </p>
            <p className="text-xs text-white/70">Nossa casa nos Alpes Italianos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
