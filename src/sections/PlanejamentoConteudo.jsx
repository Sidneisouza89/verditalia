const BENEFICIOS = [
  'Roteiro personalizado',
  'Suporte antes e durante a viagem',
  'Economia de tempo e dinheiro',
  'Experiências reais e exclusivas',
];

export default function PlanejamentoConteudo() {
  return (
    <section id="planejamento" className="bg-cream-200">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2">
        {/* Planejamento */}
        <div className="grid md:grid-cols-2 items-center gap-8 px-6 lg:px-10 py-16 md:py-20 border-b lg:border-b-0 lg:border-r border-forest-900/10">
          <div>
            <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
              PLANEJAMENTO PERSONALIZADO
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-forest-900 mb-4">
              Sua viagem, do seu jeito.
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Criamos roteiros sob medida com base no seu perfil, tempo disponível, interesses e orçamento.
            </p>
            <ul className="space-y-2.5 mb-7">
              {BENEFICIOS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-forest-900">
                  <span className="w-4 h-4 rounded-full bg-forest-700 text-white flex items-center justify-center text-[10px] shrink-0">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 transition-colors text-white text-sm px-5 py-3 rounded-md"
            >
              Agendar consultoria →
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1726855500757-658894d298eb?auto=format&fit=crop&w=700&q=80"
            alt="Mesa de planejamento de viagem com mapa e caneca Verditalia"
            className="rounded-xl h-64 md:h-80 w-full object-cover"
          />
        </div>

        {/* Conteúdo */}
        <div className="grid md:grid-cols-2 items-center gap-8 px-6 lg:px-10 py-16 md:py-20">
          <div>
            <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
              CONTEÚDO EM CAMPO
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-forest-900 mb-4">
              Inspiração para a sua próxima viagem.
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Vídeos semanais com roteiros, trilhas, dicas e muito mais sobre a Itália.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 transition-colors text-white text-sm px-5 py-3 rounded-md w-fit mb-6"
            >
              ▶ Assistir último vídeo
            </a>
            <br />
            <a href="#" className="text-sm text-forest-800 underline underline-offset-4">
              Explorar canal no YouTube →
            </a>
          </div>

          <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80"
              alt="Lago di Braies nos Dolomitas"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/5 to-transparent" />
            <span className="absolute top-3 left-3 bg-forest-800/80 text-white text-[10px] px-2.5 py-1 rounded-full">
              Último vídeo
            </span>
            <button
              aria-label="Assistir vídeo"
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"
            >
              ▶
            </button>
            <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium">
              DOLOMITAS: LAGO DI BRAIES E ARREDORES
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
