import DestinoCard from '../components/DestinoCard';

const DESTINOS = [
  {
    title: 'DOLOMITAS',
    description: 'Montanhas incríveis, trilhas, lagos e vilarejos encantadores.',
    image: 'https://images.unsplash.com/photo-1694630515448-344264b30507?auto=format&fit=crop&w=900&q=80',
    stats: ['🏔 35 trilhas', '🏞 17 lagos', '📍 4 roteiros'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 20L9 8L13 15L16 10L21 20H3Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'ROMA',
    description: 'História, cultura e gastronomia em uma cidade eterna.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80',
    stats: ['🏛 20 atrações', '🍝 6 roteiros', '💡 Dicas práticas'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 21H20M5 21V10M19 21V10M3 10L12 4L21 10M8 21V14M12 21V14M16 21V14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'UMBRIA',
    description: 'Vilarejos medievais, natureza e sabores autênticos.',
    image: 'https://images.unsplash.com/photo-1660416589770-45975532a608?auto=format&fit=crop&w=900&q=80',
    stats: ['🏘 15 vilarejos', '🥾 8 roteiros', '✨ Experiências'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3C9 6 7 9 7 12.5C7 16 9.5 19 12 21C14.5 19 17 16 17 12.5C17 9 15 6 12 3Z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Destinos() {
  return (
    <section id="destinos" className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 md:py-28">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
          NOSSOS DESTINOS
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-forest-900">
          Guias completos para você explorar o melhor da Itália.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {DESTINOS.map((d) => (
          <DestinoCard key={d.title} {...d} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <a
          href="#"
          className="inline-flex items-center gap-2 border border-forest-700/30 hover:border-forest-700 transition-colors text-forest-800 text-sm px-6 py-3.5 rounded-md"
        >
          ⚖ Comparar todos os guias
        </a>
      </div>
    </section>
  );
}
