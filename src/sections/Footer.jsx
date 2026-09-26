import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white/85">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-xl text-white mb-1">VERDITALIA</p>
          <p className="text-xs text-white/60">Vida com natureza e beleza.</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link to="/sobre" className="hover:text-white transition-colors">Sobre</Link>
          <a href="https://www.youtube.com/@verditalia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
          <Link to="/contato" className="hover:text-white transition-colors">Contato</Link>
        </nav>

        <div className="flex gap-4 text-white/70 text-lg">
          <a href="#" aria-label="Instagram">📷</a>
          <a href="https://www.youtube.com/@verditalia" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶️</a>
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
