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

      {/* Botão "Comparar todos os guias" removido -> não é possível pela forma como a Hotmart vende */}
    </section>
  );
}
