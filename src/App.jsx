import Header from './components/Header';
import Hero from './sections/Hero';
import Destinos from './sections/Destinos';
import PlanejamentoConteudo from './sections/PlanejamentoConteudo';
import NossaCasa from './sections/NossaCasa';
import Sobre from './sections/Sobre';
import Contato from './sections/Contato';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream-100">
      <Header />
      <Hero />
      <Destinos />
      <PlanejamentoConteudo />
      <NossaCasa />
      <Sobre />
      <Contato />
      <Footer />
    </div>
  );
}
