// Agenda da consultoria: calcula os horários livres a partir da agenda real
// da Lídice no Google Calendar.
//
// Como funciona:
//  1. As regras de atendimento (dias, horários, duração, antecedência) ficam
//     em AGENDA, todas no fuso da Itália, e podem ser trocadas por variável
//     de ambiente no Railway, sem mexer em código.
//  2. Para o mês pedido, consultamos o "livre/ocupado" (freeBusy) das agendas
//     dela. Qualquer compromisso que encoste no horário tira ele da lista.
//  3. Sem as credenciais do Google configuradas, devolvemos horários de
//     EXEMPLO, para o site continuar funcionando.
//
// Variáveis de ambiente (Railway → Variables):
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN  credenciais OAuth (autorização única da Lídice)
//   GOOGLE_CALENDAR_IDS     agendas que bloqueiam horário, separadas por vírgula (padrão: primary)
//   AGENDA_HORARIOS         ex.: "13:00,14:30,16:00,17:30,19:00" (horário da Itália)
//   AGENDA_DIAS_SEMANA      ex.: "1,2,3,4,5" (0=domingo ... 6=sábado)
//   AGENDA_DURACAO_EXPRESS  duração da Consultoria Express, em minutos (padrão 30)
//   AGENDA_DURACAO_COMPLETA duração da Consultoria Completa de Viagem (padrão 60)
//   AGENDA_DURACAO_TI       duração da Consultoria de TI (padrão 60)
//   AGENDA_ANTECEDENCIA_DIAS ex.: "2"
//   AGENDA_MESES_A_FRENTE   ex.: "5" (mês atual + 5 = 6 meses)

const lista = (v, padrao) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : padrao);
const numero = (v, padrao) => (Number.isFinite(Number(v)) && v !== '' && v != null ? Number(v) : padrao);

export const AGENDA = {
  fuso: 'Europe/Rome',
  horarios: lista(process.env.AGENDA_HORARIOS, ['13:00', '14:30', '16:00', '17:30', '19:00']),
  diasSemana: lista(process.env.AGENDA_DIAS_SEMANA, ['1', '2', '3', '4', '5']).map(Number),
  antecedenciaDias: numero(process.env.AGENDA_ANTECEDENCIA_DIAS, 2),
  mesesAFrente: numero(process.env.AGENDA_MESES_A_FRENTE, 5),
};

// Tipos de consultoria: cada um com sua duração. Os horários de início são os mesmos;
// o que muda é o tamanho da janela que precisa estar livre na agenda.
export const TIPOS = {
  express: { duracaoMin: numero(process.env.AGENDA_DURACAO_EXPRESS, 30) },
  completa: { duracaoMin: numero(process.env.AGENDA_DURACAO_COMPLETA, numero(process.env.AGENDA_DURACAO_MIN, 60)) },
  ti: { duracaoMin: numero(process.env.AGENDA_DURACAO_TI, 60) },
};
export const TIPO_PADRAO = 'completa';
export const validarTipo = (tipo) => (Object.hasOwn(TIPOS, tipo || '') ? tipo : null);

const CALENDARIOS = lista(process.env.GOOGLE_CALENDAR_IDS, ['primary']);

export function googleConfigurado() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  return Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN);
}

// ---------- datas no fuso da Itália ----------

// Diferença (ms) entre o horário de parede de um fuso e o UTC, naquele instante
function tzOffset(date, tz) {
  const p = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
    .formatToParts(date)
    .reduce((o, x) => ((o[x.type] = x.value), o), {});
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - date.getTime();
}

// Horário de parede na Itália -> instante real
function italiaParaInstante(ano, mes0, dia, hh = 0, mm = 0) {
  const chute = Date.UTC(ano, mes0, dia, hh, mm);
  return new Date(chute - tzOffset(new Date(chute), AGENDA.fuso));
}

// Data de hoje na Itália, como { ano, mes0, dia }
function hojeNaItalia(agora = new Date()) {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: AGENDA.fuso, year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(agora)
    .split('-')
    .map(Number);
  return { ano: p[0], mes0: p[1] - 1, dia: p[2] };
}

const pad = (n) => String(n).padStart(2, '0');
const chaveDia = (ano, mes0, dia) => `${ano}-${pad(mes0 + 1)}-${pad(dia)}`;

// Valida "AAAA-MM" e se está dentro da janela permitida (mês atual até +mesesAFrente)
export function validarMes(mes, agora = new Date()) {
  const m = /^(\d{4})-(\d{2})$/.exec(mes || '');
  if (!m) return null;
  const ano = Number(m[1]);
  const mes0 = Number(m[2]) - 1;
  if (mes0 < 0 || mes0 > 11) return null;
  const hoje = hojeNaItalia(agora);
  const distancia = (ano - hoje.ano) * 12 + (mes0 - hoje.mes0);
  if (distancia < 0 || distancia > AGENDA.mesesAFrente) return null;
  return { ano, mes0 };
}

// Dias do mês que, pelas regras, podem ter atendimento (sem olhar a agenda ainda)
function diasCandidatos({ ano, mes0 }, agora = new Date()) {
  const hoje = hojeNaItalia(agora);
  const primeiroPermitido = Date.UTC(hoje.ano, hoje.mes0, hoje.dia + AGENDA.antecedenciaDias);
  const total = new Date(Date.UTC(ano, mes0 + 1, 0)).getUTCDate();
  const dias = [];
  for (let dia = 1; dia <= total; dia++) {
    const utc = Date.UTC(ano, mes0, dia);
    if (utc < primeiroPermitido) continue;
    if (!AGENDA.diasSemana.includes(new Date(utc).getUTCDay())) continue;
    dias.push(dia);
  }
  return dias;
}

// ---------- Google ----------

let tokenCache = { valor: null, expiraEm: 0 };

async function tokenGoogle() {
  if (tokenCache.valor && Date.now() < tokenCache.expiraEm - 60_000) return tokenCache.valor;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  if (!r.ok) throw new Error(`token Google: ${r.status} ${await r.text()}`);
  const j = await r.json();
  tokenCache = { valor: j.access_token, expiraEm: Date.now() + (j.expires_in || 3600) * 1000 };
  return tokenCache.valor;
}

async function ocupadosNoGoogle(inicio, fim) {
  const token = await tokenGoogle();
  const r = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timeMin: inicio.toISOString(),
      timeMax: fim.toISOString(),
      timeZone: AGENDA.fuso,
      items: CALENDARIOS.map((id) => ({ id })),
    }),
  });
  if (!r.ok) throw new Error(`freeBusy: ${r.status} ${await r.text()}`);
  const j = await r.json();
  const ocupados = [];
  for (const [id, cal] of Object.entries(j.calendars || {})) {
    // agenda inacessível: melhor não oferecer horário nenhum do que oferecer horário ocupado
    if (cal.errors?.length) throw new Error(`agenda ${id}: ${JSON.stringify(cal.errors)}`);
    for (const b of cal.busy || []) ocupados.push([Date.parse(b.start), Date.parse(b.end)]);
  }
  return ocupados;
}

// ---------- horários de exemplo (sem Google configurado) ----------

function exemplo(ano, mes0, dia) {
  const s = ((ano * 372 + mes0 * 31 + dia) * 2654435761) % 4294967296;
  if (s % 7 === 0) return [];
  return AGENDA.horarios.filter((_, i) => ((s >> (i * 3)) & 7) > 2);
}

// ---------- disponibilidade de um mês ----------

const cache = new Map(); // "AAAA-MM" -> { em, dados }
const CACHE_MS = 2 * 60 * 1000;

export async function disponibilidade(mesValido, tipo = TIPO_PADRAO, agora = new Date()) {
  const { ano, mes0 } = mesValido;
  const mesChave = `${ano}-${pad(mes0 + 1)}`;
  const chave = `${tipo}|${mesChave}`;
  const duracaoMin = TIPOS[tipo].duracaoMin;
  const emCache = cache.get(chave);
  if (emCache && Date.now() - emCache.em < CACHE_MS) return emCache.dados;

  const candidatos = diasCandidatos(mesValido, agora);
  const fonte = googleConfigurado() ? 'google' : 'exemplo';
  const dias = {};

  if (fonte === 'google') {
    const inicio = italiaParaInstante(ano, mes0, 1);
    const fim = italiaParaInstante(ano, mes0 + 1, 1);
    const ocupados = candidatos.length ? await ocupadosNoGoogle(inicio, fim) : [];
    const duracao = duracaoMin * 60_000;
    const limite = agora.getTime(); // a antecedência mínima já foi aplicada por dia; aqui só garante nada no passado
    for (const dia of candidatos) {
      const livres = AGENDA.horarios.filter((hhmm) => {
        const [hh, mm] = hhmm.split(':').map(Number);
        const ini = italiaParaInstante(ano, mes0, dia, hh, mm).getTime();
        const fimSlot = ini + duracao;
        if (ini <= limite) return false;
        return !ocupados.some(([a, b]) => a < fimSlot && b > ini);
      });
      if (livres.length) dias[chaveDia(ano, mes0, dia)] = livres;
    }
  } else {
    for (const dia of candidatos) {
      const livres = exemplo(ano, mes0, dia);
      if (livres.length) dias[chaveDia(ano, mes0, dia)] = livres;
    }
  }

  const dados = { fonte, fuso: AGENDA.fuso, tipo, duracaoMin, mesesAFrente: AGENDA.mesesAFrente, mes: mesChave, dias };
  cache.set(chave, { em: Date.now(), dados });
  return dados;
}
