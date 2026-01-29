'use client';

export default function UpcomingShows() {
  const shows = [
    {
      data: '01/02',
      ano: '2026',
      evento: 'Carnaval em SBC',
      local: 'São Bernardo do Campo',
      endereco: 'São Bernardo do Campo, SP',
      instagram: '',
      status: 'confirmado',
      tipo: 'Carnaval'
    },
    {
      data: '07/02',
      ano: '2026',
      evento: 'Carnaval Coringa',
      local: 'Coringa Mada',
      endereco: 'A definir',
      instagram: '@coringa.mada',
      status: 'confirmado',
      tipo: 'Carnaval'
    },
    {
      data: '07/02',
      ano: '2026',
      evento: 'Apresentação Nada Bar',
      local: 'Nada Bar',
      endereco: 'Nada Bar',
      instagram: '',
      status: 'confirmado',
      tipo: 'Show',
      horario: '14h às 16h'
    },
    {
      data: '08/02',
      ano: '2026',
      evento: 'Carnaval Dumingaz',
      local: 'Dumingaz',
      endereco: 'R. Gertrudes de Lima, 406, Santo André, SP',
      instagram: '@dumingazmaravilha',
      status: 'confirmado',
      tipo: 'Carnaval'
    },
    {
      data: '15/02',
      ano: '2026',
      evento: 'Show Mr. Balmann Paranapiacaba',
      local: 'Mr. Balmann',
      endereco: 'Paranapiacaba, SP',
      instagram: '',
      status: 'confirmado',
      tipo: 'Show',
      horario: '13h'
    },
    {
      data: '17/02',
      ano: '2026',
      evento: 'Show Mr. Balmann Paranapiacaba',
      local: 'Mr. Balmann',
      endereco: 'Paranapiacaba, SP',
      instagram: '',
      status: 'confirmado',
      tipo: 'Show',
      horario: '13h'
    },
    {
      data: '20/02',
      ano: '2026',
      evento: 'Show Parque da Juventude',
      local: 'Parque da Juventude',
      endereco: 'Parque da Juventude',
      instagram: '',
      status: 'confirmado',
      tipo: 'Show',
      horario: '19h'
    },
    {
      data: '28/02',
      ano: '2026',
      evento: 'Carnaval com Bloco Mulheres do ABC',
      local: 'Santo André',
      endereco: 'Santo André, SP',
      instagram: '',
      status: 'confirmado',
      tipo: 'Carnaval'
    }
  ];

  return (
    <section id="proximas-apresentacoes" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-pink to-neon-green bg-clip-text text-transparent">
            Próximas Apresentações
          </span>
        </h2>

        <div className="space-y-6">
          {shows.map((show, idx) => (
            <div
              key={idx}
              className="glassmorphism p-8 rounded-2xl hover:scale-[1.02] transition-transform duration-300 border-2 border-neon-pink/30"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Data */}
                <div className="flex-shrink-0 text-center">
                  <div className="bg-gradient-to-br from-neon-pink to-neon-blue p-6 rounded-2xl shadow-2xl">
                    <div className="text-5xl font-bold text-white mb-1">
                      {show.data}
                    </div>
                    <div className="text-sm text-white/80 font-semibold">
                      {show.ano}
                    </div>
                  </div>
                </div>

                {/* Informações */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-3xl font-bold text-neon-pink">
                      {show.evento}
                    </h3>
                    <span className="px-3 py-1 bg-neon-green/20 border border-neon-green rounded-full text-neon-green text-xs font-bold uppercase">
                      {show.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="text-neon-blue text-xl">📍</span>
                      <span className="font-semibold text-white">{show.local}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neon-pink text-xl">🗺️</span>
                      <span>{show.endereco}</span>
                    </div>
                    {show.horario && (
                      <div className="flex items-center gap-2">
                        <span className="text-neon-green text-xl">🕒</span>
                        <span className="font-semibold text-white">{show.horario}</span>
                      </div>
                    )}
                    {show.instagram && (
                      <div className="flex items-center gap-2">
                        <span className="text-neon-green text-xl">📱</span>
                        <a 
                          href={`https://instagram.com/${show.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-neon-pink transition-colors"
                        >
                          {show.instagram}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <span className="px-4 py-2 glassmorphism rounded-full border border-neon-pink text-sm font-semibold text-white">
                      🎭 {show.tipo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chamada para ação */}
        <div className="mt-12 text-center glassmorphism p-8 rounded-2xl">
          <p className="text-xl text-gray-300 mb-4">
            Quer levar o <span className="text-neon-pink font-bold">Bloco Praieira</span> para o seu evento?
          </p>
          <a 
            href="#contato"
            className="inline-block px-8 py-4 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full text-white font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  );
}
