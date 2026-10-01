import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../sections/Hero';
import Destinos from '../sections/Destinos';
import PlanejamentoConteudo from '../sections/PlanejamentoConteudo';
import NossaCasa from '../sections/NossaCasa';
import Footer from '../sections/Footer';

// Sobre e Contato viraram páginas próprias (/sobre, /contato) — não ficam
// mais como seções de scroll aqui na home.
export default function Home() {
  const { hash } = useLocation();

  // Links do rodapé como /#guias e /#nossa-casa: rola até a seção
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, [hash]);

  return (
    <div className="min-h-screen bg-cream-100">
      <Header />
      <Hero />
      <Destinos />
      <PlanejamentoConteudo />
      <NossaCasa />
      <Footer />
    </div>
  );
}
