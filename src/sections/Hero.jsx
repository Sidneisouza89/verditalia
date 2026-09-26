export default function Hero() {
  return (
    <section id="top" className="relative h-[640px] md:h-[720px] w-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1529566321973-795c4f4138bb?auto=format&fit=crop&w=1800&q=80"
        alt="Casal admirando as montanhas ao entardecer"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-forest-900/50" />

      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-center pt-16">
        <h1 className="font-display text-white text-5xl md:text-6xl lg:text-[64px] leading-[1.08] max-w-xl">
          Vida
          <br />
          com natureza
          <br />
          e beleza.
        </h1>

        {/* Subtítulo removido a pedido da Lídice */}

        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#guias"
            className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-500 transition-colors text-white text-sm px-6 py-3.5 rounded-md"
          >
            Explorar guias <span aria-hidden>→</span>
          </a>
          <a
            href="#planejamento"
            className="inline-flex items-center gap-2 border border-white/70 hover:bg-white/10 transition-colors text-white text-sm px-6 py-3.5 rounded-md"
          >
            Planeje sua viagem <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <p className="absolute bottom-5 right-6 lg:right-10 text-white/70 text-xs text-right leading-tight">
        Fotografia original Verditalia
        <br />
        Seceda, Dolomitas
      </p>
    </section>
  );
}
