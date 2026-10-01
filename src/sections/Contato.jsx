import { useState } from 'react';

export default function Contato() {
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
        throw new Error(data.error || 'Não foi possível enviar agora. Tente novamente mais tarde.');
      }
      setEnviado(true);
    } catch (err) {
      setErro(err.message || 'Não foi possível enviar agora. Tente novamente mais tarde.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="contato" className="max-w-[700px] mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
      <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">CONTATO</p>
      <h2 className="font-display text-3xl md:text-4xl text-forest-900 mb-4">
        Fale com a gente.
      </h2>
      <p className="text-stone-700 text-sm mb-10 max-w-md mx-auto">
        Envie sua mensagem — respondemos direto no seu e-mail, sem intermediários.
      </p>

      {enviado ? (
        <div className="bg-forest-800 text-white rounded-xl p-8">
          <p className="font-display text-lg mb-1">Mensagem enviada!</p>
          <p className="text-white/80 text-sm">Retornamos em breve.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label className="block text-xs text-forest-800 mb-1.5" htmlFor="nome">
              Seu nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              className="w-full border border-forest-900/15 rounded-md px-4 py-3 text-sm bg-white outline-none focus:border-forest-600"
            />
          </div>
          <div>
            <label className="block text-xs text-forest-800 mb-1.5" htmlFor="email">
              Seu e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-forest-900/15 rounded-md px-4 py-3 text-sm bg-white outline-none focus:border-forest-600"
            />
          </div>
          <div>
            <label className="block text-xs text-forest-800 mb-1.5" htmlFor="mensagem">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              rows={5}
              className="w-full border border-forest-900/15 rounded-md px-4 py-3 text-sm bg-white outline-none focus:border-forest-600 resize-none"
            />
          </div>
          {/* Honeypot: invisível para pessoas, robôs costumam preencher */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor="site">Não preencha este campo</label>
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
            {enviando ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>
      )}
    </section>
  );
}
