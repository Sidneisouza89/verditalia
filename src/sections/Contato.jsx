import { useState } from 'react';

export default function Contato() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // TODO: trocar por chamada real a uma rota de backend (Railway) que recebe
  // o POST e dispara o e-mail via Resend/SendGrid. O e-mail/telefone da
  // Lídice nunca trafega para o frontend nem aparece no código-fonte.
  function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 900);
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
              required
              rows={5}
              className="w-full border border-forest-900/15 rounded-md px-4 py-3 text-sm bg-white outline-none focus:border-forest-600 resize-none"
            />
          </div>
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
