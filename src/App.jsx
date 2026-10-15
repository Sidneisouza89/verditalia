import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agendar from './pages/Agendar';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';

// Painel do CMS: só baixa quando alguém abre /studio
const StudioPage = lazy(() => import('./studio/StudioPage'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agendar" element={<Agendar />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route
        path="/studio/*"
        element={
          <Suspense fallback={<p style={{ padding: 32, fontFamily: 'system-ui' }}>Carregando o painel…</p>}>
            <StudioPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
