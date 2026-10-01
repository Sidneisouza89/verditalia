import DestinoCard from '../components/DestinoCard';

// Ordem visual = prioridade de autoridade regional (definida pela Lídice).
// Dolomitas ainda não tem checkout pronto -> exibido como "em breve".
const DESTINOS = [
  {
    title: 'DOLOMITAS',
    description: 'Montanhas incríveis, trilhas, lagos e vilarejos encantadores.',
    image: 'https://images.unsplash.com/photo-1694630515448-344264b30507?auto=format&fit=crop&w=900&q=80',
    stats: ['🏔 35 trilhas', '🏞 17 lagos', '📍 4 roteiros'],
    comingSoon: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 20L9 8L13 15L16 10L21 20H3Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'UMBRIA',
    description: 'Vilarejos medievais, natureza e sabores autênticos.',
    image: 'https://images.unsplash.com/photo-1660416589770-45975532a608?auto=format&fit=crop&w=900&q=80',
    stats: ['🏘 15 vilarejos', '🥾 8 roteiros', '✨ Experiências'],
    checkoutUrl: 'https://go.hotmart.com/J100566519N',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3C9 6 7 9 7 12.5C7 16 9.5 19 12 21C14.5 19 17 16 17 12.5C17 9 15 6 12 3Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'ROMA',
    description: 'História, cultura e gastronomia em uma cidade eterna.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80',
    stats: ['🏛 20 atrações', '🍝 6 roteiros', '💡 Dicas práticas'],
    checkoutUrl: 'https://go.hotmart.com/N103493622Q',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 21H20M5 21V10M19 21V10M3 10L12 4L21 10M8 21V14M12 21V14M16 21V14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Link de checkout do combo na Hotmart (produto "Combo" com todos os guias).
// Enquanto estiver vazio, o botão aparece com o selo "em breve" e não é clicável.
// Quando a Lídice criar o combo, é só colar o link aqui.
const COMBO_URL = '';

function BotaoCombo() {
  const conteudo = (
    <>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 7h16l-1.5 11.5a2 2 0 0 1-2 1.5h-9a2 2 0 0 1-2-1.5L4 7z" strokeLinejoin="round" />
        <path d="M9 10V6a3 3 0 0 1 6 0v4" strokeLinecap="round" />
      </svg>
      Comprar todos os guias
    </>
  );
  const base =
    'inline-flex items-center gap-3 border border-forest-900/25 bg-white text-forest-900 text-sm font-medium px-6 py-3 rounded-md';

  if (!COMBO_URL) {
    return (
      <span className={`${base} cursor-default`} aria-disabled="true">
        {conteudo}
        <span className="text-[10px] uppercase tracking-wide bg-cream-200 text-forest-600 px-2 py-0.5 rounded">
          em breve
        </span>
      </span>
    );
  }

  return (
    <a
      href={COMBO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} hover:border-forest-600 hover:bg-cream-100 transition-colors`}
    >
      {conteudo}
    </a>
  );
}

export default function Destinos() {
  return (
    <section id="guias" className="max-w-[1800px] mx-auto px-4 lg:px-6 py-10 md:py-14">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
          NOSSOS GUIAS AUTORAIS
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-forest-900">
          Guias completos para você explorar o melhor da Itália.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {DESTINOS.map((d) => (
          <DestinoCard key={d.title} {...d} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <BotaoCombo />
        <p className="text-xs text-stone-700">Leve os guias juntos em uma única compra.</p>
      </div>
    </section>
  );
}
