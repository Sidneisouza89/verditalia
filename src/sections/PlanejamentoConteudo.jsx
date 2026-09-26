import { Link } from 'react-router-dom';

const BENEFICIOS = [
  'Roteiro personalizado',
  'Orientação de especialista local',
  'Logística e deslocamentos',
  'Experiências e lugares selecionados',
];

export default function PlanejamentoConteudo() {
  return (
    <section id="planejamento" className="bg-cream-200">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2">
        {/* Planejamento / Consultoria */}
        <div className="grid md:grid-cols-2 items-center gap-8 px-6 lg:px-10 py-16 md:py-20 border-b lg:border-b-0 lg:border-r border-forest-900/10">
          <div>
            <p className="text-xs tracking-[0.2em] text-forest-600 font-medium mb-3">
              PLANEJAMENTO PERSONALIZADO
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-forest-900 mb-4">
              Sua viagem, do seu jeito.
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed mb-6">
              Criamos roteiros sob medida com base no seu perfil, tempo disponível, interesses e orçamento.
            </p>
            <ul className="space-y-2.5 mb-7">
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
            className="rounded-xl h-64 md:h-80 w-full object-cover"
          />
        </div>

        {/* YouTube */}
        <div id="youtube" className="grid md:grid-cols-2 items-center gap-8 px-6 lg:px-10 py-16 md:py-20">
          <div>
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
            className="relative rounded-xl overflow-hidden h-64 md:h-80 block group"
          >
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
            <span className="absolute top-3 left-3 bg-forest-800/80 text-white text-[10px] px-2.5 py-1 rounded-full">
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
