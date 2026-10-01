import { Link } from 'react-router-dom';

const BENEFICIOS = [
  'Roteiro personalizado',
  'Orientação de especialista local',
  'Logística e deslocamentos',
  'Experiências e lugares selecionados',
];

// Esmaece só a borda esquerda da foto (lado do texto), dissolvendo no fundo.
// O lado direito fica sólido, sem efeito.
const fadeEdges = {
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
  maskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
};

export default function PlanejamentoConteudo() {
  return (
    <section id="planejamento" className="bg-cream-200">
      <div className="grid lg:grid-cols-2">
        {/* Planejamento / Consultoria */}
        <div className="grid md:grid-cols-2 items-stretch gap-0 md:gap-8 px-6 md:pr-0 lg:pl-10 border-b lg:border-b-0 lg:border-r border-forest-900/10">
          <div className="py-8">
            <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
              PLANEJAMENTO PERSONALIZADO
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-forest-900 mb-4">
              Sua viagem, do seu jeito.
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Criamos roteiros sob medida com base no seu perfil, tempo disponível, interesses e orçamento.
            </p>
            <ul className="space-y-2 mb-6">
              {BENEFICIOS.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-forest-900">
                  <span className="w-4 h-4 rounded-full bg-forest-700 text-white flex items-center justify-center text-[10px] shrink-0">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/agendar"
              className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 transition-colors text-white text-sm px-5 py-3 rounded-md"
            >
              Agendar consultoria →
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&w=700&q=80"
            alt="Mesa de planejamento de viagem com mapa e caneca Verditalia"
            className="h-56 md:h-full w-full object-cover"
            style={fadeEdges}
          />
        </div>

        {/* YouTube */}
        <div id="youtube" className="grid md:grid-cols-2 items-stretch gap-0 md:gap-8 px-6 md:pr-0 lg:pl-10">
          <div className="py-8 md:self-center">
            <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
              CONTEÚDO EM CAMPO
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-forest-900 mb-4">
              Inspiração para a sua próxima viagem.
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Vídeos semanais com roteiros, trilhas, dicas e muito mais sobre a Itália.
            </p>
            <a
              href="https://www.youtube.com/@verditalia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-forest-800 underline underline-offset-4"
            >
              Explorar canal no YouTube →
            </a>
          </div>

          {/*
            Em vez de embutir o player do YouTube (alguns vídeos vêm com
            "incorporação desativada" pelo dono e quebram o iframe), usamos a
            thumbnail oficial do vídeo como capa clicável -> abre no YouTube
            em nova aba. Também prepara terreno pro CMS: no futuro ela troca
            o ID do vídeo (e pode subir uma capa própria) sem depender de código.
          */}
          <a
            href="https://youtu.be/Wg-2UbbbzhY"
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-56 md:h-auto block group"
          >
            {/* mask aplicada no wrapper (foto + overlay escuro juntos) */}
            <div className="absolute inset-0" style={fadeEdges}>
              <img
                src="https://img.youtube.com/vi/Wg-2UbbbzhY/maxresdefault.jpg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://img.youtube.com/vi/Wg-2UbbbzhY/hqdefault.jpg';
                }}
                alt="Último vídeo do canal Verditalia"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/10 to-transparent" />
            </div>
            <span className="absolute top-3 right-3 bg-forest-800/80 text-white text-[10px] px-2.5 py-1 rounded-full">
              Último vídeo
            </span>
            <span className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-lg">
              ▶
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
