const COLUNAS = [
  {
    title: 'DESTINOS',
    links: ['Dolomitas', 'Roma', 'Umbria', 'Trentino-Alto Adige'],
  },
  {
    title: 'PLANEJAMENTO',
    links: ['Consultoria Personalizada', 'Como funciona', 'Perguntas frequentes'],
  },
  {
    title: 'VERDITALIA',
    links: ['Sobre nós', 'Nossa história', 'Contato'],
  },
];

export default function Footer() {
  return (
    <footer id="contato" className="bg-forest-900 text-white/85">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr] gap-10">
        <div>
          <p className="font-display text-xl text-white mb-1">VERDITALIA</p>
          <p className="text-xs text-white/60 mb-5">Vida com natureza e beleza.</p>
          <p className="text-sm text-white/70 flex items-start gap-1.5 mb-6">
            📍 Rovereto, Trentino-Alto Adige
            <br />
            Itália
          </p>
          <div className="flex gap-3 text-white/70">
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="YouTube">▶️</a>
            <a href="#" aria-label="WhatsApp">💬</a>
            <a href="#" aria-label="E-mail">✉️</a>
          </div>
        </div>

        {COLUNAS.map((col) => (
          <div key={col.title}>
            <p className="text-xs tracking-widest text-white/50 mb-4">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-xs tracking-widest text-white/50 mb-4">NEWSLETTER</p>
          <p className="text-sm mb-4">
            Receba dicas e novidades direto no seu e-mail.
          </p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 bg-white text-forest-900 text-sm px-4 py-2.5 rounded-l-md outline-none"
            />
            <button
              type="submit"
              className="bg-forest-600 hover:bg-forest-500 transition-colors px-4 rounded-r-md"
              aria-label="Inscrever"
            >
              →
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>© 2026 Verditalia. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/80">Política de Privacidade</a>
            <a href="#" className="hover:text-white/80">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
