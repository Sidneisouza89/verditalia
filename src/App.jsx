import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agendar from './pages/Agendar';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agendar" element={<Agendar />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
  );
}
