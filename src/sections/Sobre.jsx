import { useText } from '../i18n/LanguageContext';

const TEXT = {
  pt: {
    eyebrow: 'QUEM SOU EU',
    titulo: 'Uma vida entre tecnologia, natureza e beleza.',
    fotoAlt: 'Lídice em uma trilha de montanha — montanhista há mais de 20 anos',
    bio: [
      'Meu nome é Lídice Guilger. Sou profissional da área de tecnologia há mais de 20 anos, mas minha paixão sempre caminhou ao lado da minha carreira: esportes de aventura, principalmente montanhismo.',
      'Minha história com a natureza começou muito antes do Verditalia. Durante anos, percorri cinco biomas do Brasil através de trilhas, montanhas, escaladas e expedições, conhecendo de perto algumas das paisagens mais extraordinárias do país — dos cânions dos Pampas às florestas da Mata Atlântica, do Cerrado à Amazônia e à Caatinga.',
      'Essa paixão também me levou além do Brasil: vivi na Austrália, passei pela Patagônia Argentina, Peru e Uruguai, sempre em busca de paisagens e experiências ao ar livre. Hoje, essa história continua do outro lado do Atlântico.',
    ],
    stats: [
      { icon: '🧗', label: '+20 ANOS DE MONTANHA' },
      { icon: '🌎', label: 'BRASIL E AMÉRICA LATINA' },
      { icon: '🏔', label: 'TRENTINO-ALTO ADIGE & DOLOMITAS' },
      { icon: '🌱', label: 'GESTÃO AMBIENTAL' },
    ],
    alpesTitulo: 'Do Brasil para os Alpes Italianos',
    alpes: [
      'Atualmente vivo no Trentino-Alto Adige, no coração da região alpina italiana, cercada por montanhas e tendo como cenário cotidiano uma das formações rochosas mais extraordinárias do mundo: as Dolomitas.',
      'Morar aqui transformou minha relação com a viagem. Passei a conhecer o território não apenas como visitante, mas através da vida cotidiana: suas montanhas, vilarejos, produtores locais, tradições alimentares, cultura e a relação das comunidades com a paisagem alpina.',
    ],
    citacao: '"Mais do que destinos, acredito em conexões verdadeiras com os lugares e com as pessoas que os tornam únicos."',
    alpesAlt: 'Dolomitas, Trentino-Alto Adige',
    nasceuTitulo: 'E assim nasceu o Verditalia',
    nasceuTexto:
      'Um encontro entre natureza e beleza. Mais do que indicar onde ir, quero ajudar outros viajantes a entender, sentir e viver o território.',
    pilares: [
      { icon: '📍', title: 'TERRITÓRIO' },
      { icon: '🤝', title: 'PESSOAS' },
      { icon: '🍇', title: 'CULTURA & SABORES' },
    ],
  },
  en: {
    eyebrow: 'ABOUT ME',
    titulo: 'A life between technology, nature and beauty.',
    fotoAlt: 'Lídice on a mountain trail — a mountaineer for over 20 years',
    bio: [
      "My name is Lídice Guilger. I've worked in technology for more than 20 years, but my passion has always walked alongside my career: adventure sports, especially mountaineering.",
      "My story with nature began long before Verditalia. For years I explored five of Brazil's biomes through trails, mountains, climbs and expeditions, getting to know some of the country's most extraordinary landscapes up close — from the canyons of the Pampas to the Atlantic Forest, from the Cerrado to the Amazon and the Caatinga.",
      'That passion also took me beyond Brazil: I lived in Australia and travelled through Argentine Patagonia, Peru and Uruguay, always in search of landscapes and outdoor experiences. Today, that story continues on the other side of the Atlantic.',
    ],
    stats: [
      { icon: '🧗', label: '20+ YEARS IN THE MOUNTAINS' },
      { icon: '🌎', label: 'BRAZIL & LATIN AMERICA' },
      { icon: '🏔', label: 'TRENTINO-ALTO ADIGE & DOLOMITES' },
      { icon: '🌱', label: 'ENVIRONMENTAL MANAGEMENT' },
    ],
    alpesTitulo: 'From Brazil to the Italian Alps',
    alpes: [
      "Today I live in Trentino-Alto Adige, in the heart of Italy's alpine region, surrounded by mountains and with one of the world's most extraordinary rock formations as my everyday backdrop: the Dolomites.",
      "Living here changed my relationship with travel. I came to know the land not just as a visitor, but through everyday life: its mountains, villages, local producers, food traditions, culture and the way communities relate to the alpine landscape.",
    ],
    citacao: '"More than destinations, I believe in real connections with places and with the people who make them unique."',
    alpesAlt: 'Dolomites, Trentino-Alto Adige',
    nasceuTitulo: 'And so Verditalia was born',
    nasceuTexto:
      'Where nature meets beauty. More than telling you where to go, I want to help other travelers understand, feel and live the land.',
    pilares: [
      { icon: '📍', title: 'THE LAND' },
      { icon: '🤝', title: 'PEOPLE' },
      { icon: '🍇', title: 'CULTURE & FLAVORS' },
    ],
  },
};

export default function Sobre() {
  const t = useText(TEXT);
  return (
    <section id="sobre" className="bg-cream-100 py-14 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3 text-center">{t.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-10 md:mb-14 text-center max-w-2xl mx-auto">
          {t.titulo}
        </h2>

        {/* Bio principal + foto */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center mb-12 md:mb-16">
          <img
            src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80"
            alt={t.fotoAlt}
            className="rounded-2xl w-full h-[300px] md:h-[420px] object-cover"
          />
          <div className="text-stone-700 text-sm leading-relaxed space-y-4">
            {t.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* Cards de estatística */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
          {t.stats.map((s) => (
            <div
              key={s.label}
              className="bg-forest-800 text-white rounded-xl p-4 md:p-5 text-center flex flex-col items-center gap-2"
            >
              <span className="text-xl">{s.icon}</span>
              <p className="text-[11px] md:text-xs font-medium leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Do Brasil pros Alpes Italianos */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center mb-12 md:mb-16">
          <div className="text-stone-700 text-sm leading-relaxed space-y-4 md:order-2">
            <p className="font-display text-xl text-forest-900 not-italic">{t.alpesTitulo}</p>
            {t.alpes.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <blockquote className="border-l-2 border-forest-600 pl-4 italic text-forest-900">{t.citacao}</blockquote>
          </div>
          <img
            src="https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=800&q=80"
            alt={t.alpesAlt}
            className="rounded-2xl w-full h-[260px] md:h-[360px] object-cover md:order-1"
          />
        </div>

        {/* E assim nasceu o Verditalia */}
        <div className="bg-forest-900 text-white rounded-2xl px-6 py-10 md:p-14 text-center">
          <p className="font-display text-2xl md:text-3xl mb-4">{t.nasceuTitulo}</p>
          <p className="text-white/80 text-sm max-w-xl mx-auto mb-10 leading-relaxed">{t.nasceuTexto}</p>
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-md mx-auto">
            {t.pilares.map((p) => (
              <div key={p.title} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{p.icon}</span>
                <p className="text-[11px] md:text-xs tracking-wide text-white/90">{p.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
