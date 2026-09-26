const STATS = [
  { icon: '🧗', label: '+20 ANOS DE MONTANHA' },
  { icon: '🌎', label: 'BRASIL E AMÉRICA LATINA' },
  { icon: '🏔', label: 'TRENTINO-ALTO ADIGE & DOLOMITAS' },
  { icon: '🌱', label: 'GESTÃO AMBIENTAL' },
];

const PILARES = [
  { icon: '📍', title: 'Território' },
  { icon: '🤝', title: 'Pessoas' },
  { icon: '🍇', title: 'Cultura & Sabores' },
];

export default function Sobre() {
  return (
    <section id="sobre" className="bg-cream-100 py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3 text-center">
          QUEM SOU EU
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-14 text-center max-w-2xl mx-auto">
          Uma vida entre tecnologia, natureza e beleza.
        </h2>

        {/* Bio principal + foto */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <img
            src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80"
            alt="Lídice em uma trilha de montanha — montanhista há mais de 20 anos"
            className="rounded-2xl w-full h-[420px] object-cover"
          />
          <div className="text-stone-700 text-sm leading-relaxed space-y-4">
            <p>
              Meu nome é Lídice Guilger. Sou profissional da área de tecnologia há mais de
              20 anos, mas minha paixão sempre caminhou ao lado da minha carreira: esportes
              de aventura, principalmente montanhismo.
            </p>
            <p>
              Minha história com a natureza começou muito antes do Verditalia. Durante anos,
              percorri cinco biomas do Brasil através de trilhas, montanhas, escaladas e
              expedições, conhecendo de perto algumas das paisagens mais extraordinárias do
              país — dos cânions dos Pampas às florestas da Mata Atlântica, do Cerrado à
              Amazônia e à Caatinga.
            </p>
            <p>
              Essa paixão também me levou além do Brasil: vivi na Austrália, passei pela
              Patagônia Argentina, Peru e Uruguai, sempre em busca de paisagens e experiências
              ao ar livre. Hoje, essa história continua do outro lado do Atlântico.
            </p>
          </div>
        </div>

        {/* Cards de estatística */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-forest-800 text-white rounded-xl p-5 text-center flex flex-col items-center gap-2"
            >
              <span className="text-xl">{s.icon}</span>
              <p className="text-xs font-medium leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Do Brasil pros Alpes Italianos */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="text-stone-700 text-sm leading-relaxed space-y-4 md:order-2">
            <p className="font-display text-xl text-forest-900 not-italic">
              Do Brasil para os Alpes Italianos
            </p>
            <p>
              Atualmente vivo no Trentino-Alto Adige, no coração da região alpina italiana,
              cercada por montanhas e tendo como cenário cotidiano uma das formações
              rochosas mais extraordinárias do mundo: as Dolomitas.
            </p>
            <p>
              Morar aqui transformou minha relação com a viagem. Passei a conhecer o
              território não apenas como visitante, mas através da vida cotidiana: suas
              montanhas, vilarejos, produtores locais, tradições alimentares, cultura e a
              relação das comunidades com a paisagem alpina.
            </p>
            <blockquote className="border-l-2 border-forest-600 pl-4 italic text-forest-900">
              "Mais do que destinos, acredito em conexões verdadeiras com os lugares e com
              as pessoas que os tornam únicos."
            </blockquote>
          </div>
          <img
            src="https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=800&q=80"
            alt="Dolomitas, Trentino-Alto Adige"
            className="rounded-2xl w-full h-[360px] object-cover md:order-1"
          />
        </div>

        {/* E assim nasceu o Verditalia */}
        <div className="bg-forest-900 text-white rounded-2xl p-10 md:p-14 text-center">
          <p className="font-display text-2xl md:text-3xl mb-4">
            E assim nasceu o Verditalia
          </p>
          <p className="text-white/80 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            Um encontro entre natureza e beleza. Mais do que indicar onde ir, quero ajudar
            outros viajantes a entender, sentir e viver o território.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {PILARES.map((p) => (
              <div key={p.title} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{p.icon}</span>
                <p className="text-xs tracking-wide text-white/90">{p.title.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
