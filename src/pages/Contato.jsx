import BackLink from '../components/BackLink';
import Header from '../components/Header';
import ContatoForm from '../sections/Contato';
import Footer from '../sections/Footer';

export default function Contato() {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Header solid />

      <main className="flex-1">
        <div className="max-w-[700px] mx-auto px-6 lg:px-10 pt-8">
          <BackLink />
        </div>
        <ContatoForm />
      </main>

      <Footer />
    </div>
  );
}
