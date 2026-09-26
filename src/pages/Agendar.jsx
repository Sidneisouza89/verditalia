import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../sections/Footer';

const BENEFICIOS = [
  'Roteiro personalizado',
  'Orientação de especialista local',
  'Logística e deslocamentos',
  'Experiências e lugares selecionados',
];

export default function Agendar() {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Header solid />

      <main className="flex-1 max-w-[900px] mx-auto px-6 lg:px-10 py-16 md:py-24 w-full">
        <Link to="/" className="text-sm text-forest-700 hover:underline">
          ← Voltar para o site
        </Link>

        <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mt-8 mb-3">
          CONSULTORIA PERSONALIZADA
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-forest-900 mb-4">
          Agende sua consultoria de viagem.
        </h1>
        <p className="text-stone-700 text-sm leading-relaxed mb-8 max-w-lg">
          Planejamento de viagem personalizado com especialistas locais no Trentino-Alto
          Adige e nas Dolomitas, pensado para quem deseja descobrir o território de forma
          autêntica, com roteiros cuidadosamente planejados e experiências alinhadas ao seu
          perfil de viagem.
        </p>

        <ul className="grid sm:grid-cols-2 gap-3 mb-10 max-w-lg">
          {BENEFICIOS.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-sm text-forest-900">
              <span className="w-4 h-4 rounded-full bg-forest-700 text-white flex items-center justify-center text-[10px] shrink-0">
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>

        {/*
          TODO: embed real do Cal.com aqui. Fluxo definido: Cal.com lê a
          disponibilidade real do Google Calendar da Verditalia, mostra só
          horários livres, e trava a vaga na agenda somente após confirmação
          do pagamento via Stripe. E-mail/telefone da Lídice não aparecem em
          nenhum momento nesta tela.
        */}
        <div className="border-2 border-dashed border-forest-900/20 rounded-2xl p-10 text-center bg-white">
          <p className="font-display text-lg text-forest-900 mb-2">
            Calendário de agendamento
          </p>
          <p className="text-stone-700 text-sm max-w-sm mx-auto">
            Em breve: aqui aparecem os horários disponíveis em tempo real, com pagamento
            para confirmar a vaga.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
