import { useState } from 'react';
import { useLang, useText } from '../i18n/LanguageContext';

const TEXT = {
  pt: {
    eyebrow: 'CONTATO',
    titulo: 'Fale com a gente.',
    intro: 'Envie sua mensagem — respondemos direto no seu e-mail, sem intermediários.',
    nome: 'Seu nome',
    email: 'Seu e-mail',
    mensagem: 'Mensagem',
    enviar: 'Enviar mensagem',
    enviando: 'Enviando...',
    okTitulo: 'Mensagem enviada!',
    okTexto: 'Retornamos em breve.',
    honeypot: 'Não preencha este campo',
    erroValidacao: 'Preencha nome, um e-mail válido e a mensagem.',
    erroLimite: 'Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.',
    erroGeral: 'Não foi possível enviar agora. Tente novamente mais tarde.',
  },
  en: {
    eyebrow: 'CONTACT',
    titulo: 'Get in touch.',
    intro: 'Send us a message — we reply straight to your inbox, no middlemen.',
    nome: 'Your name',
    email: 'Your email',
    mensagem: 'Message',
    enviar: 'Send message',
    enviando: 'Sending...',
    okTitulo: 'Message sent!',
    okTexto: "We'll get back to you soon.",
    honeypot: 'Do not fill in this field',
    erroValidacao: 'Please fill in your name, a valid email and your message.',
    erroLimite: 'Too many messages in a short time. Please try again in a few minutes.',
    erroGeral: "We couldn't send your message right now. Please try again later.",
  },
};

const inputClass =
  'w-full border border-forest-900/15 rounded-md px-4 py-3 text-sm bg-white outline-none focus:border-forest-600';

export default function Contato() {
  const { lang } = useLang();
  const t = useText(TEXT);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  // Envia para o backend (server.js no Railway), que dispara o e-mail via Resend.
  // O e-mail da Lídice fica só nas variáveis do Railway — nunca chega ao navegador.
  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      nome: form.get('nome'),
      email: form.get('email'),
      mensagem: form.get('mensagem'),
      idioma: lang, // a Lídice sabe em que idioma responder
      site: form.get('site'), // honeypot anti-robô
    };

    try {
      const r = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) {
        // mensagem sempre no idioma do visitante, independente do servidor
        setErro(r.status === 400 ? t.erroValidacao : r.status === 429 ? t.erroLimite : t.erroGeral);
        return;
      }
      setEnviado(true);
    } catch {
      setErro(t.erroGeral);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="contato" className="max-w-[700px] mx-auto px-6 lg:px-10 py-14 md:py-24 text-center">
      <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">{t.eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-4">{t.titulo}</h2>
      <p className="text-stone-700 text-sm mb-10 max-w-md mx-auto">{t.intro}</p>

      {enviado ? (
        <div className="bg-forest-800 text-white rounded-xl p-8">
          <p className="font-display text-lg mb-1">{t.okTitulo}</p>
          <p className="text-white/80 text-sm">{t.okTexto}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label className="block text-xs text-forest-800 mb-1.5" htmlFor="nome">
              {t.nome}
            </label>
            <input id="nome" name="nome" type="text" required autoComplete="name" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-forest-800 mb-1.5" htmlFor="email">
              {t.email}
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-forest-800 mb-1.5" htmlFor="mensagem">
              {t.mensagem}
            </label>
            <textarea id="mensagem" name="mensagem" required rows={5} className={`${inputClass} resize-none`} />
          </div>
          {/* Honeypot: invisível para pessoas, robôs costumam preencher */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor="site">{t.honeypot}</label>
            <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {erro && (
            <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3">
              {erro}
            </p>
          )}
          <button
            type="submit"
            disabled={enviando}
            className="w-full inline-flex items-center justify-center gap-2 bg-forest-700 hover:bg-forest-600 transition-colors text-white text-sm px-5 py-3.5 rounded-md disabled:opacity-60"
          >
            {enviando ? t.enviando : t.enviar}
          </button>
        </form>
      )}
    </section>
  );
}
