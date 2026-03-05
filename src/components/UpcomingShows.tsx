'use client';

import { useState } from 'react';

export default function UpcomingShows() {
  const [showPastEvents, setShowPastEvents] = useState(false);

  const eventosPassados = [
    {
      data: '01/02',
      ano: '2026',
      evento: 'Carnaval em SBC',
      local: 'São Bernardo do Campo',
      endereco: 'São Bernardo do Campo, SP',
      instagram: '',
      tipo: 'Carnaval'
    },
    {
      data: '07/02',
      ano: '2026',
      evento: 'Carnaval Coringa',
      local: 'Coringa Mada',
      endereco: 'A definir',
      instagram: '@coringa.mada',
      tipo: 'Carnaval'
    },
    {
      data: '07/02',
      ano: '2026',
      evento: 'Nada Bar com Mulheres do ABC - Ensaio Aberto',
      local: 'Nada Bar',
      endereco: 'Nada Bar',
      instagram: '',
      tipo: 'Ensaio Aberto',
      horario: '14h às 16h'
    },
    {
      data: '08/02',
      ano: '2026',
      evento: 'Carnaval Dumingaz',
      local: 'Dumingaz',
      endereco: 'R. Gertrudes de Lima, 406, Santo André, SP',
      instagram: '@dumingazmaravilha',
      tipo: 'Carnaval'
    },
    {
      data: '15/02',
      ano: '2026',
      evento: 'Show Mr. Balmann Paranapiacaba',
      local: 'Mr. Balmann',
      endereco: 'Paranapiacaba, SP',
      instagram: '',
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
      tipo: 'Show',
      horario: '19h'
    },
    {
      data: '28/02',
      ano: '2026',
      evento: 'Ensaio Aberto com Mulheres do ABC',
      local: 'Santo André',
      endereco: 'Santo André, SP',
      instagram: '',
      tipo: 'Ensaio Aberto'
    }
  ];

  return (
    <section id="proximas-apresentacoes" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-pink to-neon-green bg-clip-text text-transparent">
            Apresentações
          </span>
        </h2>

        {/* Aviso de novos eventos em breve */}
        <div className="glassmorphism p-10 rounded-2xl text-center mb-12 border-2 border-neon-green/30">
          <div className="text-7xl mb-6">🦀</div>
          <h3 className="text-3xl font-bold text-neon-green mb-4">
            Novos eventos em breve!
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Estamos preparando os próximos shows e ensaios abertos. 
            Fique ligado no nosso Instagram para novidades!
          </p>
          <a
            href="https://instagram.com/blocopraieira"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full text-white font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            📸 Siga @blocopraieira
          </a>
        </div>

        {/* Eventos Passados - Carnaval 2026 */}
        <div className="mb-8">
          <button
            onClick={() => setShowPastEvents(!showPastEvents)}
            className="w-full glassmorphism p-6 rounded-xl flex justify-between items-center hover:border-neon-pink border-2 border-transparent transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎭</span>
              <h3 className="text-2xl font-bold text-neon-pink">Carnaval 2026 — Eventos Realizados</h3>
            </div>
            <span className="text-3xl text-neon-pink">{showPastEvents ? '−' : '+'}</span>
          </button>

          {showPastEvents && (
            <div className="space-y-4 mt-6">
              {eventosPassados.map((show, idx) => (
                <div
                  key={idx}
                  className="glassmorphism p-6 rounded-2xl border border-gray-700/50 opacity-80"
                >
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    {/* Data */}
                    <div className="flex-shrink-0 text-center">
                      <div className="bg-gradient-to-br from-gray-600 to-gray-700 p-4 rounded-xl">
                        <div className="text-3xl font-bold text-white mb-1">
                          {show.data}
                        </div>
                        <div className="text-xs text-white/70 font-semibold">
                          {show.ano}
                        </div>
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-300">
                          {show.evento}
                        </h3>
                        <span className="px-3 py-1 bg-gray-600/30 border border-gray-500 rounded-full text-gray-400 text-xs font-bold uppercase">
                          realizado
                        </span>
                      </div>

                      <div className="space-y-1 text-gray-400">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📍</span>
                          <span className="font-semibold text-gray-300">{show.local}</span>
                        </div>
                        {show.horario && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🕒</span>
                            <span>{show.horario}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
