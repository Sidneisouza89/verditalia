export default function Hero() {
  return (
    <section id="top" className="relative h-[480px] md:h-[560px] w-full overflow-hidden bg-cream-100">
      {/*
        Técnica: mask-image com gradiente aplicada no WRAPPER (foto + overlay
        escuro juntos), não só na imagem — assim toda a camada visual "some"
        de verdade perto da borda inferior, revelando o fundo cream por trás,
        em vez de cortar reto. Isso é diferente de um gradiente de COR (que
        só escurece); aqui a transparência é real.
      */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1529566321973-795c4f4138bb?auto=format&fit=crop&w=1800&q=80"
          alt="Casal admirando as montanhas ao entardecer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-forest-900/50" />
      </div>

      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-16 md:pb-20">
        <h1 className="font-display text-white text-5xl md:text-6xl lg:text-[64px] leading-[1.08] max-w-xl">
          Vida
          <br />
          com natureza
          <br />
          e beleza.
        </h1>
        {/* Botões removidos a pedido da Lídice — banner minimalista */}
      </div>

      <p className="absolute bottom-5 right-6 lg:right-10 text-white/70 text-xs text-right leading-tight">
        Fotografia original Verditalia
        <br />
        Seceda, Dolomitas
      </p>
    </section>
  );
}
