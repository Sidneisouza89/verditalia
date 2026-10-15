import Header from '../components/Header';
import BackLink from '../components/BackLink';
import BookingWidget, { PAGAMENTO_ATIVO } from '../components/BookingWidget';
import Footer from '../sections/Footer';
import { useText } from '../i18n/LanguageContext';

const TEXT = {
  pt: {
    eyebrow: 'CONSULTORIA PERSONALIZADA',
    titulo: 'Agende sua consultoria de viagem.',
    intro:
      'Escolha o dia e o horário que funcionam para você. A vaga só fica reservada depois da confirmação do pagamento, e você recebe o link da videochamada por e-mail.',
    introPedido:
      'Escolha o dia e o horário que funcionam para você e envie o pedido. Respondemos por e-mail para confirmar a reserva, e você recebe o link da videochamada.',
    passos: [
      ['Escolha dia e horário', 'Só aparecem horários livres na agenda da Verditalia.'],
      ['Pague com segurança', 'A reserva é confirmada assim que o pagamento é aprovado.'],
      ['Receba o link', 'O convite da videochamada chega no seu e-mail.'],
    ],
    passoPedido: ['Confirmação por e-mail', 'Respondemos seu pedido confirmando o horário e o pagamento.'],
  },
  en: {
    eyebrow: 'PERSONALIZED CONSULTATION',
    titulo: 'Book your travel consultation.',
    intro:
      'Pick the day and time that work for you. Your slot is confirmed once payment goes through, and the video call link is sent to your email.',
    introPedido:
      'Pick the day and time that work for you and send your request. We reply by email to confirm the booking, and you get the video call link.',
    passos: [
      ['Pick a day and time', "Only open slots in Verditalia's calendar are shown."],
      ['Pay securely', 'Your booking is confirmed as soon as payment is approved.'],
      ['Get the link', 'The video call invitation arrives in your inbox.'],
    ],
    passoPedido: ['Email confirmation', 'We reply to your request confirming the time and payment.'],
  },
};

export default function Agendar() {
  const t = useText(TEXT);
  // Sem Stripe ligado, o texto descreve o fluxo de pedido por e-mail
  const intro = PAGAMENTO_ATIVO ? t.intro : t.introPedido;
  const passos = PAGAMENTO_ATIVO ? t.passos : [t.passos[0], t.passoPedido, t.passos[2]];
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Header solid />

      <main className="flex-1 max-w-[1080px] mx-auto px-4 sm:px-6 py-10 md:py-14 w-full">
        <BackLink />

        <p className="text-xs tracking-[0.16em] text-forest-600 font-medium mt-7 mb-3">{t.eyebrow}</p>
        <h1 className="font-display text-3xl md:text-[38px] leading-tight text-forest-900 mb-3">{t.titulo}</h1>
        <p className="text-stone-700 text-sm leading-relaxed mb-7 max-w-[60ch]">{intro}</p>

        <BookingWidget />

        <ol className="mt-7 grid sm:grid-cols-3 gap-4">
          {passos.map(([titulo, texto], i) => (
            <li key={titulo} className="border-t border-forest-900/20 pt-3 text-[13px] text-stone-700">
              <b className="block text-forest-900 font-medium mb-0.5">
                {i + 1}. {titulo}
              </b>
              {texto}
            </li>
          ))}
        </ol>
      </main>

      <Footer />
    </div>
  );
}
