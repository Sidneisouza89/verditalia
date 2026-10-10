import Header from '../components/Header';
import BackLink from '../components/BackLink';
import Footer from '../sections/Footer';
import { useText } from '../i18n/LanguageContext';

const TEXT = {
  pt: {
    eyebrow: 'CONSULTORIA PERSONALIZADA',
    titulo: 'Agende sua consultoria de viagem.',
    intro:
      'Planejamento de viagem personalizado com especialistas locais no Trentino-Alto Adige e nas Dolomitas, pensado para quem deseja descobrir o território de forma autêntica, com roteiros cuidadosamente planejados e experiências alinhadas ao seu perfil de viagem.',
    beneficios: [
      'Roteiro personalizado',
      'Suporte antes e durante a viagem',
      'Economia de tempo e dinheiro',
      'Experiências reais e exclusivas',
    ],
    calTitulo: 'Calendário de agendamento',
    calTexto: 'Em breve: aqui aparecem os horários disponíveis em tempo real, com pagamento para confirmar a vaga.',
  },
  en: {
    eyebrow: 'PERSONALIZED CONSULTATION',
    titulo: 'Book your travel consultation.',
    intro:
      'Personalized trip planning with local experts in Trentino-Alto Adige and the Dolomites, designed for travelers who want to discover the region authentically, with carefully planned itineraries and experiences tailored to your travel style.',
    beneficios: [
      'Personalized itinerary',
      'Support before and during your trip',
      'Save time and money',
      'Real, exclusive experiences',
    ],
    calTitulo: 'Booking calendar',
    calTexto: 'Coming soon: available time slots in real time, with payment to confirm your booking.',
  },
};

export default function Agendar() {
  const t = useText(TEXT);
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Header solid />

      <main className="flex-1 max-w-[900px] mx-auto px-6 lg:px-10 py-10 md:py-20 w-full">
        <BackLink />

        <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mt-8 mb-3">{t.eyebrow}</p>
        <h1 className="font-display text-3xl md:text-4xl text-forest-900 mb-4">{t.titulo}</h1>
        <p className="text-stone-700 text-sm leading-relaxed mb-8 max-w-lg">{t.intro}</p>

        <ul className="grid sm:grid-cols-2 gap-3 mb-10 max-w-lg">
          {t.beneficios.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-sm text-forest-900">
              <span className="w-[18px] h-[18px] rounded-full bg-forest-600 text-white flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
        <div className="border-2 border-dashed border-forest-900/20 rounded-2xl p-8 md:p-10 text-center bg-white">
          <p className="font-display text-lg text-forest-900 mb-2">{t.calTitulo}</p>
          <p className="text-stone-700 text-sm max-w-sm mx-auto">{t.calTexto}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
