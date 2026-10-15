import { Link } from 'react-router-dom';
import { useLang, useText } from '../i18n/LanguageContext';
import { tx, txLista, useConteudo } from '../cms/ConteudoContext';
import { urlImagem } from '../cms/imagem';

// Ícones em traço fino, mesma linguagem do "Nossa casa" na home
const Icon = ({ children, size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const ICONES = {
  montanha: (
    <Icon>
      <path d="M2 19.5L8.5 8l3.5 6 2.5-4 7.5 9.5H2z" />
      <path d="M6.6 11.4l1.9 1.3 1.7-1.6" />
    </Icon>
  ),
  globo: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9S14.6 18.3 12 21c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3z" />
    </Icon>
  ),
  dolomitas: (
    <Icon>
      <path d="M2 20l4-9 2 3 3-8 3 7 2-3 6 10H2z" />
      <path d="M9.7 9.2l1.3 1.3 1.2-1.4" />
    </Icon>
  ),
  folha: (
    <Icon>
      <path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15z" />
      <path d="M5 19l8-8" />
    </Icon>
  ),
  territorio: (
    <Icon>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </Icon>
  ),
  tradicoes: (
    <Icon>
      <path d="M12 21V9" />
      <path d="M12 9c0-2.5 1.5-4 4-4 0 2.5-1.5 4-4 4zM12 9c0-2.5-1.5-4-4-4 0 2.5 1.5 4 4 4zM12 14c0-2.5 1.5-4 4-4 0 2.5-1.5 4-4 4zM12 14c0-2.5-1.5-4-4-4 0 2.5 1.5 4 4 4z" />
      <path d="M12 9V3" />
    </Icon>
  ),
  cultura: (
    <Icon>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M10 20v-5h4v5M8 12h2M14 12h2" />
    </Icon>
  ),
};

export const TEXT = {
  pt: {
    eyebrow: 'Quem sou eu',
    titulo: 'Uma vida entre tecnologia, natureza e beleza.',
    fotoAlt: 'Lídice em uma trilha de montanha',
    bio: [
      'Meu nome é Lídice Guilger. Sou profissional da área de tecnologia há mais de 20 anos, mas existe uma paixão que sempre caminhou ao lado da minha carreira: os esportes de aventura, principalmente o montanhismo.',
      'Minha história com a natureza começou muito antes do Verditalia. Durante anos, percorri os cinco biomas do Brasil através de trilhas, travessias, escaladas e expedições, conhecendo de perto algumas das paisagens mais extraordinárias do país.',
      'Dos cânions dos Pampas, no Rio Grande do Sul, segui pelas montanhas e florestas da Mata Atlântica, onde estão experiências marcantes como as travessias da Serra Fina e Petrópolis–Teresópolis, além de escaladas em lugares icônicos como o Pão de Açúcar e a Pedra do Baú.',
      'No Cerrado, caminhei por paisagens como as da Chapada dos Veadeiros e do Jalapão. Na Amazônia, naveguei entre rios e florestas inundadas de igapó. E, pela Caatinga, conheci a força de um território profundamente ligado ao Rio São Francisco.',
      'Essa paixão também me levou para além do Brasil. Viajei pela América Latina em busca de paisagens e experiências ao ar livre, vivi na Austrália, passei pela Patagônia Argentina, pelo Peru e pelo Uruguai, além de explorar diferentes territórios através de trekking e viagens de moto.',
    ],
    bioFecho: 'Hoje, essa história continua do outro lado do Atlântico.',
    destaques: [
      { icon: 'montanha', label: 'Montanhista há +20 anos' },
      { icon: 'globo', label: 'Brasil e América Latina' },
      { icon: 'dolomitas', label: 'Trentino-Alto Adige & Dolomitas' },
      { icon: 'folha', label: 'Gestão ambiental' },
    ],
    alpesEyebrow: 'Dos caminhos do Brasil',
    alpesTitulo: 'Para os Alpes Italianos',
    alpes: [
      'Atualmente vivo no Trentino-Alto Adige, no coração da região alpina italiana, cercada por montanhas e tendo como cenário cotidiano uma das formações rochosas mais extraordinárias do mundo: as Dolomitas.',
      'Morar aqui transformou minha relação com a viagem. Passei a conhecer o território não apenas como visitante, mas através da vida cotidiana: suas montanhas, pequenos vilarejos, produtores locais, tradições alimentares, cultura e a relação das comunidades com a paisagem alpina.',
      'Nos últimos cinco anos, também venho aprofundando meus conhecimentos em gestão ambiental, aproximando ainda mais minha experiência profissional daquilo que sempre fez parte da minha vida: natureza, tradições alimentares e sustentabilidade.',
    ],
    citacao: 'Mais do que destinos, acredito em conexões verdadeiras com os lugares e com as pessoas que os tornam únicos.',
    alpesAlt: 'Dolomitas, Trentino-Alto Adige',
    nasceuEyebrow: 'E assim nasceu o Verditalia',
    nasceuTitulo: 'Um encontro entre natureza e beleza.',
    nasceu: [
      'Da experiência de quem percorreu muitos quilômetros para conhecer lugares e que hoje tem a oportunidade de viver dentro do território que apresenta.',
      'Quero mostrar uma Itália que vai além dos cartões-postais: os caminhos entre as montanhas, as histórias dos vilarejos, os pequenos produtores, a gastronomia, as tradições e as pessoas que mantêm viva a identidade de cada lugar.',
    ],
    nasceuDestaque: 'Mais do que indicar onde ir, quero ajudar outros viajantes a entender, sentir e viver o território.',
    pilares: [
      { icon: 'territorio', label: 'Território' },
      { icon: 'tradicoes', label: 'Tradições alimentares' },
      { icon: 'cultura', label: 'Cultura alpina' },
    ],
    cta: 'Conheça os guias',
  },
  en: {
    eyebrow: 'About me',
    titulo: 'A life between technology, nature and beauty.',
    fotoAlt: 'Lídice on a mountain trail',
    bio: [
      "My name is Lídice Guilger. I've worked in technology for more than 20 years, but there is a passion that has always walked alongside my career: adventure sports, especially mountaineering.",
      "My story with nature began long before Verditalia. For years I crossed Brazil's five biomes on trails, treks, climbs and expeditions, getting to know some of the country's most extraordinary landscapes up close.",
      'From the canyons of the Pampas in Rio Grande do Sul, I went on to the mountains and forests of the Atlantic Forest, home to memorable treks such as Serra Fina and Petrópolis–Teresópolis, and climbs on iconic spots like Sugarloaf Mountain and Pedra do Baú.',
      'In the Cerrado I walked through landscapes such as Chapada dos Veadeiros and Jalapão. In the Amazon I travelled through rivers and flooded igapó forests. And in the Caatinga I discovered the strength of a land deeply tied to the São Francisco River.',
      'That passion also took me beyond Brazil. I travelled across Latin America in search of landscapes and outdoor experiences, lived in Australia, and passed through Argentine Patagonia, Peru and Uruguay, exploring different regions by trekking and on motorcycle trips.',
    ],
    bioFecho: 'Today, that story continues on the other side of the Atlantic.',
    destaques: [
      { icon: 'montanha', label: 'Mountaineer for 20+ years' },
      { icon: 'globo', label: 'Brazil & Latin America' },
      { icon: 'dolomitas', label: 'Trentino-Alto Adige & Dolomites' },
      { icon: 'folha', label: 'Environmental management' },
    ],
    alpesEyebrow: 'From the trails of Brazil',
    alpesTitulo: 'To the Italian Alps',
    alpes: [
      "Today I live in Trentino-Alto Adige, in the heart of Italy's alpine region, surrounded by mountains and with one of the world's most extraordinary rock formations as my everyday backdrop: the Dolomites.",
      'Living here changed my relationship with travel. I came to know the land not just as a visitor but through everyday life: its mountains, small villages, local producers, food traditions, culture and the way communities relate to the alpine landscape.',
      'Over the last five years I have also been deepening my knowledge of environmental management, bringing my professional experience even closer to what has always been part of my life: nature, food traditions and sustainability.',
    ],
    citacao: 'More than destinations, I believe in real connections with places and with the people who make them unique.',
    alpesAlt: 'The Dolomites, Trentino-Alto Adige',
    nasceuEyebrow: 'And so Verditalia was born',
    nasceuTitulo: 'Where nature meets beauty.',
    nasceu: [
      'From the experience of someone who travelled many miles to get to know places, and who now has the chance to live inside the land she presents.',
      'I want to show an Italy that goes beyond the postcards: the paths between the mountains, the stories of the villages, the small producers, the food, the traditions and the people who keep each place’s identity alive.',
    ],
    nasceuDestaque: 'More than telling you where to go, I want to help other travelers understand, feel and live the land.',
    pilares: [
      { icon: 'territorio', label: 'The land' },
      { icon: 'tradicoes', label: 'Food traditions' },
      { icon: 'cultura', label: 'Alpine culture' },
    ],
    cta: 'See the guides',
  },
};

const eyebrow = 'text-[11px] md:text-xs tracking-[0.08em] uppercase text-forest-600 font-medium mb-3';
const titulo = 'font-display font-normal text-[1.75rem] md:text-[2.1rem] leading-[1.15] text-forest-900';
const corpo = 'text-stone-700 text-sm leading-relaxed';

export default function Sobre() {
  const base = useText(TEXT);
  const { lang } = useLang();
  const c = useConteudo()?.sobre;
  // conteúdo do CMS quando preenchido; senão, o texto padrão
  const t = {
    ...base,
    titulo: tx(c?.titulo, lang) ?? base.titulo,
    fotoAlt: tx(c?.foto?.alt, lang) ?? base.fotoAlt,
    bio: txLista(c?.bio, lang) ?? base.bio,
    bioFecho: tx(c?.bioFecho, lang) ?? base.bioFecho,
    alpesTitulo: tx(c?.alpesTitulo, lang) ?? base.alpesTitulo,
    alpes: txLista(c?.alpes, lang) ?? base.alpes,
    citacao: tx(c?.citacao, lang) ?? base.citacao,
    alpesAlt: tx(c?.fotoAlpes?.alt, lang) ?? base.alpesAlt,
    nasceuTitulo: tx(c?.nasceuTitulo, lang) ?? base.nasceuTitulo,
    nasceu: txLista(c?.nasceu, lang) ?? base.nasceu,
    nasceuDestaque: tx(c?.nasceuDestaque, lang) ?? base.nasceuDestaque,
  };
  return (
    <section id="sobre" className="bg-cream-100 pt-6 md:pt-8 pb-16 md:pb-24">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        {/* Quem sou eu: foto + texto */}
        <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 md:gap-12 items-start">
          <img
            src={urlImagem(c?.foto, { w: 1000 }) ?? 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80'}
            alt={t.fotoAlt}
            className="rounded-2xl w-full h-[320px] md:h-full md:min-h-[520px] object-cover"
          />
          <div className="min-w-0">
            <p className={eyebrow}>{t.eyebrow}</p>
            <h1 className={`${titulo} mb-5`}>{t.titulo}</h1>
            <div className={`${corpo} space-y-3.5`}>
              {t.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="font-medium text-forest-900">{t.bioFecho}</p>
            </div>
          </div>
        </div>

        {/* Destaques: só o título, sem descrição pequena */}
        <ul className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 border-y border-forest-900/15">
          {t.destaques.map((d, i) => (
            <li
              key={d.label}
              className={`flex flex-col items-center text-center gap-3 px-3 py-6 md:py-7 text-forest-700 ${
                i % 2 === 1 ? 'border-l border-forest-900/15' : ''
              } ${i >= 2 ? 'border-t lg:border-t-0 border-forest-900/15' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              {ICONES[d.icon]}
              <p className="text-[11px] md:text-xs font-medium tracking-[0.08em] uppercase text-forest-900 leading-snug max-w-[18ch]">
                {d.label}
              </p>
            </li>
          ))}
        </ul>

        {/* Do Brasil para os Alpes Italianos: texto + foto com citação */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="min-w-0">
            <p className={eyebrow}>{t.alpesEyebrow}</p>
            <h2 className={`${titulo} mb-5`}>{t.alpesTitulo}</h2>
            <div className={`${corpo} space-y-3.5`}>
              {t.alpes.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <figure className="relative">
            <img
              src={urlImagem(c?.fotoAlpes, { w: 1200 }) ?? 'https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=1000&q=80'}
              alt={t.alpesAlt}
              className="rounded-2xl w-full h-[300px] md:h-[440px] object-cover"
            />
            <figcaption className="absolute left-4 right-4 bottom-4 md:left-6 md:right-auto md:max-w-[300px] bg-forest-800/95 text-white rounded-xl px-5 py-4">
              <span className="font-display text-3xl leading-none text-white/60" aria-hidden="true">“</span>
              <p className="text-[13px] leading-relaxed -mt-2">{t.citacao}</p>
            </figcaption>
          </figure>
        </div>

        {/* E assim nasceu o Verditalia */}
        <div className="mt-12 md:mt-16 bg-forest-900 text-white rounded-2xl px-6 py-10 md:px-14 md:py-14 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-center">
          <div className="min-w-0">
            <p className="text-[11px] md:text-xs tracking-[0.08em] uppercase text-white/60 font-medium mb-3">{t.nasceuEyebrow}</p>
            <h2 className="font-display font-normal text-[1.75rem] md:text-[2.1rem] leading-[1.15] mb-5">{t.nasceuTitulo}</h2>
            <div className="text-white/80 text-sm leading-relaxed space-y-3.5">
              {t.nasceu.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-white font-medium">{t.nasceuDestaque}</p>
            </div>
            <Link
              to="/#guias"
              className="mt-7 inline-flex items-center gap-2 bg-cream-100 text-forest-900 hover:bg-white transition-colors text-sm font-medium px-5 py-3 rounded-md"
            >
              {t.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <ul className="grid grid-cols-3 gap-3">
            {t.pilares.map((p) => (
              <li
                key={p.label}
                className="flex flex-col items-center justify-center text-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-2 py-6 text-white/90"
              >
                {ICONES[p.icon]}
                <p className="text-[11px] md:text-xs tracking-[0.08em] uppercase leading-snug">{p.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
