import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useText } from '../i18n/LanguageContext';

/*
  Widget de agendamento.
  - Abre sempre no mês atual; navega até MONTHS_AHEAD meses à frente.
  - Os horários livres vêm do servidor (/api/disponibilidade), que consulta a
    agenda real da Lídice no Google Calendar. As regras (dias, horários,
    duração, antecedência) ficam no servidor, em agenda.js.
  - Horários definidos no fuso da Itália e mostrados no fuso do visitante.
  - Três tipos de consultoria (express, completa, ti), cada um com sua duração
    (definida no servidor). Dá para abrir direto num tipo com /agendar?tipo=ti.
  - Sem pagamento online por enquanto: o visitante envia o pedido do horário
    pelo Fale conosco, já preenchido, e a confirmação (com valor) é por e-mail.
*/

const MONTHS_AHEAD = 5; // mês atual + 5 = 6 meses de agenda (mesmo valor de AGENDA_MESES_A_FRENTE no servidor)
const TIPO_IDS = ['express', 'completa', 'ti'];
const TIPO_PADRAO = 'completa';
const DURACAO_PADRAO = { express: 30, completa: 60, ti: 60 }; // o servidor informa a duração real
export const PAGAMENTO_ATIVO = false; // vira true quando o Stripe estiver configurado

const TEXT = {
  pt: {
    locale: 'pt-BR',
    com: 'Com',
    escolhaTipo: 'Escolha o tipo de consultoria',
    tipos: {
      express: {
        nome: 'Consultoria Express',
        tag: 'Viagem',
        resumo: 'Uma conversa objetiva para tirar dúvidas pontuais ou ajustar um roteiro que você já começou.',
        detalhes:
          'Para quem já tem a viagem encaminhada e quer a visão de quem vive no Trentino-Alto Adige: tirar dúvidas, validar o roteiro, os deslocamentos e as escolhas do caminho.',
        tema: 'Trentino-Alto Adige, Dolomitas e roteiros pela Itália',
      },
      completa: {
        nome: 'Consultoria Completa de Viagem',
        tag: 'Viagem',
        resumo: 'Planejamento personalizado do zero, pensado para o seu perfil, tempo disponível, interesses e orçamento.',
        detalhes:
          'Planejamento de viagem personalizado com especialistas locais no Trentino-Alto Adige e nas Dolomitas, pensado para quem deseja descobrir o território de forma autêntica, com roteiros cuidadosamente planejados e experiências alinhadas ao seu perfil de viagem.',
        tema: 'Trentino-Alto Adige, Dolomitas e roteiros pela Itália',
      },
      ti: {
        nome: 'Consultoria de TI',
        tag: 'Tecnologia',
        resumo: 'Para quem chegou pelos vídeos de tecnologia do canal: uma conversa com quem atua há mais de 20 anos na área.',
        detalhes:
          'Conversa por videochamada sobre carreira, projetos e dúvidas de tecnologia, com a experiência de mais de 20 anos na área de TI.',
        tema: 'Carreira, projetos e tecnologia',
      },
    },
    minutos: (n) => `${n} minutos`,
    formato: 'Videochamada (link enviado na confirmação)',
    detalhesTitulo: 'Detalhes do serviço',
    valorNota: 'O valor e a forma de pagamento são combinados por e-mail, na confirmação do horário.',
    diaSemVaga: 'Este dia não tem horário livre para este tipo de consultoria. Escolha outro dia.',
    dow: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    mesAnterior: 'Mês anterior',
    proximoMes: 'Próximo mês',
    escolherMes: 'Escolher mês',
    livres: 'Com horários livres',
    selecionado: 'Selecionado',
    semHorarios: 'sem horários',
    horariosLivres: (n) => `${n} horários livres`,
    escolhaDia: 'Escolha um dia',
    vazio: 'Os horários disponíveis aparecem aqui.',
    seuFuso: (c) => `Horários no seu fuso (${c})`,
    naItalia: 'na Itália',
    seuHorario: 'seu horário',
    continuar: 'Continuar para pagamento',
    reserva: 'A vaga fica reservada por 15 minutos enquanto você conclui o pagamento.',
    solicitar: 'Solicitar este horário',
    solicitarNota: 'Você envia o pedido pelo Fale conosco e recebe a confirmação por e-mail.',
    carregando: 'Carregando horários livres…',
    erroCarregar: 'Não foi possível carregar os horários agora.',
    tentarNovamente: 'Tentar novamente',
    semVagasMes: 'Sem horários livres neste mês. Veja os próximos meses.',
    mensagemPedido: (tipo, dia, local, italia, ehTi) =>
      `Olá! Gostaria de agendar a ${tipo} em ${dia}, às ${local} (meu horário), ${italia} na Itália.\n\n${ehTi ? 'Sobre o assunto' : 'Sobre a viagem'}: `,
    estacoes: {
      inverno: ['Inverno', 'Neve nas Dolomitas'],
      primavera: ['Primavera', 'Flores nos vales'],
      verao: ['Verão', 'Trilhas e lagos'],
      outono: ['Outono', 'Vindima e folhagem'],
    },
  },
  en: {
    locale: 'en-GB',
    com: 'With',
    escolhaTipo: 'Choose your consultation',
    tipos: {
      express: {
        nome: 'Express Consultation',
        tag: 'Travel',
        resumo: 'A focused conversation to answer specific questions or fine-tune an itinerary you have already started.',
        detalhes:
          'For travelers whose trip is already taking shape and who want the view of someone who lives in Trentino-Alto Adige: answer questions, check the itinerary, getting around and the choices along the way.',
        tema: 'Trentino-Alto Adige, the Dolomites and trips across Italy',
      },
      completa: {
        nome: 'Full Travel Consultation',
        tag: 'Travel',
        resumo: 'Personalized planning from scratch, built around your profile, available time, interests and budget.',
        detalhes:
          'Personalized trip planning with local experts in Trentino-Alto Adige and the Dolomites, for travelers who want to discover the region authentically, with carefully planned itineraries and experiences tailored to their travel style.',
        tema: 'Trentino-Alto Adige, the Dolomites and trips across Italy',
      },
      ti: {
        nome: 'IT Consultation',
        tag: 'Technology',
        resumo: 'For those who found us through the tech videos on the channel: a conversation with someone with 20+ years in the field.',
        detalhes:
          'A video call about career, projects and technology questions, drawing on more than 20 years of experience in IT.',
        tema: 'Career, projects and technology',
      },
    },
    minutos: (n) => `${n} minutes`,
    formato: 'Video call (link sent with the confirmation)',
    detalhesTitulo: 'Service details',
    valorNota: 'The fee and payment method are arranged by email when your time is confirmed.',
    diaSemVaga: 'This day has no open time for this consultation. Please choose another day.',
    dow: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    mesAnterior: 'Previous month',
    proximoMes: 'Next month',
    escolherMes: 'Choose a month',
    livres: 'Available',
    selecionado: 'Selected',
    semHorarios: 'no times available',
    horariosLivres: (n) => `${n} times available`,
    escolhaDia: 'Choose a day',
    vazio: 'Available times will appear here.',
    seuFuso: (c) => `Times in your time zone (${c})`,
    naItalia: 'in Italy',
    seuHorario: 'your time',
    continuar: 'Continue to payment',
    reserva: 'Your slot is held for 15 minutes while you complete the payment.',
    solicitar: 'Request this time',
    solicitarNota: 'You send the request through our contact form and get a confirmation by email.',
    carregando: 'Loading available times…',
    erroCarregar: "We couldn't load the available times right now.",
    tentarNovamente: 'Try again',
    semVagasMes: 'No times available this month. Check the next months.',
    mensagemPedido: (tipo, dia, local, italia, ehTi) =>
      `Hello! I'd like to book the ${tipo} on ${dia} at ${local} (my time), ${italia} in Italy.\n\n${ehTi ? 'About the topic' : 'About the trip'}: `,
    estacoes: {
      inverno: ['Winter', 'Snow in the Dolomites'],
      primavera: ['Spring', 'Flowers in the valleys'],
      verao: ['Summer', 'Trails and lakes'],
      outono: ['Autumn', 'Grape harvest and foliage'],
    },
  },
};

// ---------- ícones ----------
const Svg = ({ size = 14, children, strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
    {children}
  </svg>
);

const SEASON_ICONS = {
  inverno: (
    <Svg>
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" />
      <path d="M9.5 4L12 6.5 14.5 4M9.5 20l2.5-2.5 2.5 2.5M4.2 10.2l3.4-.9-.9-3.4M19.8 13.8l-3.4.9.9 3.4M4.2 13.8l3.4.9-.9 3.4M19.8 10.2l-3.4-.9.9-3.4" />
    </Svg>
  ),
  primavera: (
    <Svg>
      <circle cx="12" cy="6.8" r="3" />
      <circle cx="17" cy="10.4" r="3" />
      <circle cx="15.1" cy="16.3" r="3" />
      <circle cx="8.9" cy="16.3" r="3" />
      <circle cx="7" cy="10.4" r="3" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </Svg>
  ),
  verao: (
    <Svg>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </Svg>
  ),
  outono: (
    <Svg>
      <path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15z" />
      <path d="M5 19l8-8" />
    </Svg>
  ),
};

// Estações na Itália (hemisfério norte)
function seasonKey(monthIndex) {
  if (monthIndex === 11 || monthIndex <= 1) return 'inverno';
  if (monthIndex <= 4) return 'primavera';
  if (monthIndex <= 7) return 'verao';
  return 'outono';
}

// ---------- datas e fusos ----------
function tzOffset(date, tz) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
    .formatToParts(date)
    .reduce((o, p) => ((o[p.type] = p.value), o), {});
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - date.getTime();
}

// "HH:MM" no horário de Roma, naquele dia -> instante real
function romeInstant(day, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const guess = Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
  return new Date(guess - tzOffset(new Date(guess), 'Europe/Rome'));
}

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const sameDay = (a, b) => !!a && !!b && a.getTime() === b.getTime();
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const pad2 = (n) => String(n).padStart(2, '0');
const monthKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
const dayKey = (d) => `${monthKey(d)}-${pad2(d.getDate())}`;

// ---------- componente ----------
export default function BookingWidget() {
  const t = useText(TEXT);

  const navigate = useNavigate();
  const { today, first, last, visitorTz } = useMemo(() => {
    const today = startOfToday();
    return {
      today,
      first: new Date(today.getFullYear(), today.getMonth(), 1),
      last: new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD, 1),
      visitorTz: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo',
    };
  }, []);

  const fmt = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(t.locale, { month: 'long' }),
      tab: new Intl.DateTimeFormat(t.locale, { month: 'short' }),
      longDay: new Intl.DateTimeFormat(t.locale, { weekday: 'long', day: 'numeric', month: 'long' }),
      local: new Intl.DateTimeFormat(t.locale, { hour: '2-digit', minute: '2-digit', timeZone: visitorTz }),
      rome: new Intl.DateTimeFormat(t.locale, { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' }),
    }),
    [t.locale, visitorTz]
  );

  // Tipo de consultoria: vem da URL (?tipo=ti) ou usa a completa
  const [searchParams, setSearchParams] = useSearchParams();
  const tipoUrl = searchParams.get('tipo');
  const tipo = TIPO_IDS.includes(tipoUrl) ? tipoUrl : TIPO_PADRAO;
  const tipoTexto = t.tipos[tipo];

  // Disponibilidade por tipo e mês, buscada no servidor: { 'tipo|AAAA-MM': { status, dias, duracaoMin } }
  const [dispo, setDispo] = useState({});
  const [view, setView] = useState(first); // abre sempre no mês atual
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const autoSelecionou = useRef(false);
  const pedidos = useRef(new Set()); // meses já pedidos ao servidor

  const viewKey = `${tipo}|${monthKey(view)}`;
  const mesAtual = dispo[viewKey];

  // Busca o mês visível no servidor (uma vez por mês; o resultado fica guardado)
  useEffect(() => {
    if (mesAtual || pedidos.current.has(viewKey)) return;
    pedidos.current.add(viewKey);
    const guardar = (valor) => setDispo((d) => ({ ...d, [viewKey]: valor }));
    fetch(`/api/disponibilidade?mes=${monthKey(view)}&tipo=${tipo}`)
      .then((r) => r.json().then((j) => ({ ok: r.ok && j.ok, j })))
      .then(({ ok, j }) => guardar(ok ? { status: 'ok', dias: j.dias || {}, duracaoMin: j.duracaoMin } : { status: 'erro' }))
      .catch(() => guardar({ status: 'erro' }));
  }, [viewKey, mesAtual, view, tipo]);

  const slotsFor = (d) => dispo[`${tipo}|${monthKey(d)}`]?.dias?.[dayKey(d)] ?? [];
  const duracao = mesAtual?.duracaoMin || DURACAO_PADRAO[tipo];

  function escolherTipo(novo) {
    setSelectedSlot(null);
    const params = new URLSearchParams(searchParams);
    params.set('tipo', novo);
    setSearchParams(params, { replace: true });
  }

  // Ao carregar o mês atual pela primeira vez, já seleciona o primeiro dia livre dele
  useEffect(() => {
    if (autoSelecionou.current || mesAtual?.status !== 'ok' || monthKey(view) !== monthKey(first)) return;
    autoSelecionou.current = true;
    const primeiro = Object.keys(mesAtual.dias).sort()[0];
    if (primeiro) {
      const [y, m, d] = primeiro.split('-').map(Number);
      setSelectedDay(new Date(y, m - 1, d));
    }
  }, [mesAtual, view, first]);

  function goTo(month) {
    autoSelecionou.current = true;
    setView(month);
    if (selectedDay && (selectedDay.getMonth() !== month.getMonth() || selectedDay.getFullYear() !== month.getFullYear())) {
      setSelectedDay(null);
      setSelectedSlot(null);
    }
  }

  function tentarDeNovo() {
    pedidos.current.delete(viewKey);
    setDispo((d) => {
      const novo = { ...d };
      delete novo[viewKey];
      return novo;
    });
  }

  function solicitarHorario() {
    const dia = fmt.longDay.format(selectedDay);
    const mensagem = t.mensagemPedido(tipoTexto.nome, dia, fmt.local.format(selectedSlot), fmt.rome.format(selectedSlot), tipo === 'ti');
    navigate('/contato', { state: { mensagem } });
  }

  const carregando = !mesAtual;
  const erro = mesAtual?.status === 'erro';
  const semVagas = mesAtual?.status === 'ok' && Object.keys(mesAtual.dias).length === 0;

  const months = Array.from({ length: MONTHS_AHEAD + 1 }, (_, i) => new Date(first.getFullYear(), first.getMonth() + i, 1));
  const season = seasonKey(view.getMonth());
  const [seasonName, seasonHint] = t.estacoes[season];

  const lead = (view.getDay() + 6) % 7; // semana começa na segunda
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1));

  const daySlots = selectedDay ? slotsFor(selectedDay).map((hhmm) => romeInstant(selectedDay, hhmm)) : [];
  const city = visitorTz.split('/').pop().replace(/_/g, ' ');

  const fact = 'flex gap-2.5 items-start text-[13.5px] text-stone-700';

  return (
    <div className="grid gap-5">
    <div role="radiogroup" aria-label={t.escolhaTipo}>
      <p className="text-sm font-medium text-forest-900 mb-3">{t.escolhaTipo}</p>
      <div className="grid sm:grid-cols-3 gap-3">
        {TIPO_IDS.map((id) => {
          const ativo = id === tipo;
          const tt = t.tipos[id];
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => escolherTipo(id)}
              className={`text-left rounded-xl border p-4 transition-colors min-w-0 flex flex-col justify-start ${
                ativo
                  ? 'bg-forest-700 border-forest-700 text-white'
                  : 'bg-white border-forest-900/15 hover:border-forest-600'
              }`}
            >
              <span className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`text-[10px] font-medium uppercase tracking-[0.08em] ${ativo ? 'text-white/70' : 'text-forest-600'}`}>
                  {tt.tag}
                </span>
                <span className={`inline-flex items-center gap-1 text-[11px] tabular-nums ${ativo ? 'text-white/80' : 'text-stone-700/70'}`}>
                  <Svg size={12}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>
                  {t.minutos(dispo[`${id}|${monthKey(view)}`]?.duracaoMin || DURACAO_PADRAO[id])}
                </span>
              </span>
              <span className="block font-display text-lg leading-snug mb-1">{tt.nome}</span>
              <span className={`block text-[12.5px] leading-relaxed ${ativo ? 'text-white/80' : 'text-stone-700'}`}>{tt.resumo}</span>
            </button>
          );
        })}
      </div>
    </div>
    <section
      aria-label={tipoTexto.nome}
      className="bg-white border border-forest-900/10 rounded-2xl shadow-[0_12px_32px_-18px_rgba(30,42,23,0.25)] grid md:grid-cols-2 lg:grid-cols-[0.9fr_1.3fr_0.8fr] overflow-hidden"
    >
      {/* Painel 1: a consultoria */}
      <div className="p-6 lg:p-7 min-w-0 md:col-span-2 lg:col-span-1 border-b lg:border-b-0 lg:border-r border-forest-900/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full bg-forest-700 text-cream-100 grid place-items-center font-display text-lg" aria-hidden="true">
            L
          </div>
          <div>
            <p className="text-xs text-stone-700/70">{t.com}</p>
            <p className="text-sm font-medium">Lídice · Verditalia</p>
          </div>
        </div>
        <h2 className="font-display text-[22px] leading-tight text-forest-900 mb-3">{tipoTexto.nome}</h2>
        <details className="group mb-4 text-[13px] text-stone-700">
          <summary className="cursor-pointer list-none inline-flex items-center gap-1.5 text-forest-700 font-medium [&::-webkit-details-marker]:hidden">
            {t.detalhesTitulo}
            <span className="transition-transform group-open:rotate-180" aria-hidden="true">
              <Svg size={14} strokeWidth={1.8}><path d="M6 9l6 6 6-6" /></Svg>
            </span>
          </summary>
          <p className="mt-2 leading-relaxed">{tipoTexto.detalhes}</p>
        </details>
        <ul className="grid gap-2.5 mb-5">
          <li className={fact}>
            <span className="text-forest-600 mt-0.5"><Svg size={16}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg></span>
            {t.minutos(duracao)}
          </li>
          <li className={fact}>
            <span className="text-forest-600 mt-0.5"><Svg size={16}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></Svg></span>
            {t.formato}
          </li>
          <li className={fact}>
            <span className="text-forest-600 mt-0.5"><Svg size={16}><path d="M2.5 19.5L9 8l4 7 2.5-4 6 8.5h-19z" /></Svg></span>
            {tipoTexto.tema}
          </li>
        </ul>
        <p className="border-t border-forest-900/10 pt-4 text-xs text-stone-700/80 leading-relaxed">{t.valorNota}</p>
      </div>

      {/* Painel 2: calendário */}
      <div className="p-6 lg:p-7 min-w-0 lg:border-r border-forest-900/10">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="flex items-center gap-2 flex-wrap text-base font-medium" aria-live="polite">
            <span>
              {cap(fmt.month.format(view))} <span className="font-normal text-stone-700/60">{view.getFullYear()}</span>
            </span>
            <span title={seasonHint} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-forest-600 bg-cream-200 rounded-full pl-2 pr-2.5 py-0.5">
              {SEASON_ICONS[season]}
              {seasonName}
            </span>
          </h3>
          <div className="flex gap-1.5">
            {[
              { label: t.mesAnterior, delta: -1, d: 'M15 6l-6 6 6 6', disabled: view.getTime() <= first.getTime() },
              { label: t.proximoMes, delta: 1, d: 'M9 6l6 6-6 6', disabled: view.getTime() >= last.getTime() },
            ].map((a) => (
              <button
                key={a.delta}
                type="button"
                aria-label={a.label}
                disabled={a.disabled}
                onClick={() => goTo(new Date(view.getFullYear(), view.getMonth() + a.delta, 1))}
                className="w-[34px] h-[34px] rounded-lg border border-forest-900/20 bg-white grid place-items-center transition-colors enabled:hover:bg-cream-200 enabled:hover:border-forest-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Svg size={16} strokeWidth={1.8}><path d={a.d} /></Svg>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap mb-4" role="group" aria-label={t.escolherMes}>
          {months.map((m) => {
            const active = m.getTime() === view.getTime();
            const sk = seasonKey(m.getMonth());
            return (
              <button
                key={m.getTime()}
                type="button"
                aria-pressed={active}
                title={t.estacoes[sk].join(' · ')}
                onClick={() => goTo(m)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                  active ? 'bg-forest-700 border-forest-700 text-white' : 'bg-cream-100 border-forest-900/10 hover:border-forest-600'
                }`}
              >
                {SEASON_ICONS[sk]}
                {cap(fmt.tab.format(m).replace('.', ''))}
                {/* ano só na virada (janeiro), para não repetir em todos */}
                {m.getMonth() === 0 && m.getFullYear() !== today.getFullYear() ? ` ${m.getFullYear()}` : ''}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {t.dow.map((d) => (
            <div key={d} className="text-[11px] tracking-[0.08em] uppercase text-stone-700/60 text-center pb-1.5">
              {d}
            </div>
          ))}
          {Array.from({ length: lead }, (_, i) => (
            <div key={`v${i}`} />
          ))}
          {days.map((d) => {
            const free = slotsFor(d).length;
            const isSel = sameDay(d, selectedDay);
            const isToday = sameDay(d, today);
            return (
              <button
                key={d.getTime()}
                type="button"
                disabled={!free}
                aria-pressed={free ? isSel : undefined}
                aria-label={`${fmt.longDay.format(d)}, ${free ? t.horariosLivres(free) : t.semHorarios}`}
                onClick={() => {
                  autoSelecionou.current = true;
                  setSelectedDay(d);
                  setSelectedSlot(null);
                }}
                className={`relative aspect-square rounded-[10px] border text-sm tabular-nums grid place-items-center transition-colors ${
                  isSel
                    ? 'bg-forest-700 border-forest-700 text-white font-medium'
                    : free
                    ? 'bg-cream-200 border-transparent font-medium hover:border-forest-600'
                    : `border-transparent text-forest-900/30 cursor-default ${carregando ? 'animate-pulse' : ''}`
                }`}
              >
                {d.getDate()}
                {isToday && (
                  <span className={`absolute bottom-1.5 w-1 h-1 rounded-full ${isSel ? 'bg-white' : 'bg-forest-500'}`} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {(carregando || erro || semVagas) && (
          <p className="mt-4 text-[13px] text-stone-700" role="status" aria-live="polite">
            {carregando && t.carregando}
            {semVagas && t.semVagasMes}
            {erro && (
              <>
                {t.erroCarregar}{' '}
                <button type="button" onClick={tentarDeNovo} className="underline underline-offset-2 text-forest-700">
                  {t.tentarNovamente}
                </button>
              </>
            )}
          </p>
        )}

        <div className="flex gap-4 flex-wrap mt-4 text-xs text-stone-700/70">
          <span className="inline-flex items-center gap-1.5">
            <i className="w-3 h-3 rounded bg-cream-200 border border-forest-900/10" />
            {t.livres}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="w-3 h-3 rounded bg-forest-700" />
            {t.selecionado}
          </span>
        </div>
      </div>

      {/* Painel 3: horários */}
      <div className="p-6 lg:p-7 min-w-0 border-t md:border-t-0 md:border-l lg:border-l-0 border-forest-900/10">
        <p className="text-sm font-medium mb-1">{selectedDay ? cap(fmt.longDay.format(selectedDay)) : t.escolhaDia}</p>
        <p className="text-xs text-stone-700/70 mb-4">{t.seuFuso(city)}</p>

        {selectedDay && !carregando && daySlots.length === 0 ? (
          <p className="text-[13px] text-stone-700/80 py-4">{t.diaSemVaga}</p>
        ) : selectedDay ? (
          <div className="grid gap-2">
            {daySlots.map((at) => {
              const active = sameDay(at, selectedSlot);
              return (
                <button
                  key={at.getTime()}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedSlot(at)}
                  className={`flex justify-between items-baseline gap-2 rounded-lg border px-3 py-2.5 text-left tabular-nums transition-colors ${
                    active ? 'bg-forest-700 border-forest-700 text-white' : 'bg-white border-forest-900/20 hover:border-forest-600'
                  }`}
                >
                  <b className="font-medium text-sm">{fmt.local.format(at)}</b>
                  <small className={`text-[11px] ${active ? 'text-white/70' : 'text-stone-700/70'}`}>
                    {fmt.rome.format(at)} {t.naItalia}
                  </small>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-[13px] text-stone-700/70 py-4">{t.vazio}</p>
        )}

        {selectedDay && selectedSlot && (
          <div className="mt-4 grid gap-2.5">
            <div className="bg-cream-200 rounded-[10px] px-3.5 py-3 text-[13px]">
              <strong className="block font-medium">{cap(fmt.longDay.format(selectedDay))}</strong>
              {fmt.local.format(selectedSlot)} ({t.seuHorario}) · {fmt.rome.format(selectedSlot)} {t.naItalia} · {duracao} min
            </div>
            {/* Sem Stripe: o pedido vai para o Fale conosco já preenchido. Com Stripe: segue para o pagamento. */}
            <button
              type="button"
              onClick={solicitarHorario}
              className="inline-flex justify-center items-center gap-2 rounded-lg bg-forest-600 hover:bg-forest-500 transition-colors text-white text-sm font-medium px-4 py-3"
            >
              {PAGAMENTO_ATIVO ? t.continuar : t.solicitar}
              <Svg size={16} strokeWidth={1.8}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
            </button>
            <p className="text-[11.5px] text-stone-700/70">{PAGAMENTO_ATIVO ? t.reserva : t.solicitarNota}</p>
          </div>
        )}
      </div>
    </section>
    </div>
  );
}
