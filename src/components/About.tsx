'use client';

export default function About() {
  return (
    <section id="sobre" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-pink to-neon-green bg-clip-text text-transparent">
            Nossa História
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Fundação */}
          <div className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animate-slide-up">
            <div className="text-5xl mb-4">🎭</div>
            <h3 className="text-2xl font-bold text-neon-green mb-4">Fundação</h3>
            <p className="text-gray-300 leading-relaxed">
              Fundado em <span className="text-white font-bold">2021</span> pelos irmãos{' '}
              <span className="text-neon-pink font-bold">Charles</span> e{' '}
              <span className="text-neon-blue font-bold">Vinícius Guichabeira</span> no icônico{' '}
              <span className="text-neon-green font-bold">Bar "A Praieira"</span>, localizado no{' '}
              Centro de Santo André, ABC Paulista.
            </p>
          </div>

          {/* Card 2: Bloco do Amor */}
          <div className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="text-5xl mb-4">🥁</div>
            <h3 className="text-2xl font-bold text-neon-pink mb-4">Bloco do Amor</h3>
            <p className="text-gray-300 leading-relaxed">
              Celebramos a música brasileira com influências africanas através de{' '}
              <span className="text-neon-green font-bold">Axé</span>,{' '}
              <span className="text-neon-pink font-bold">Ijexá</span>,{' '}
              <span className="text-neon-blue font-bold">Samba</span> e{' '}
              <span className="text-neon-green font-bold">Maracatu</span>.
              Tocamos nossa herança cultural com arte, memória e identidade.
            </p>
          </div>

          {/* Card 3: Comunidade */}
          <div className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-neon-blue mb-4">Representatividade</h3>
            <p className="text-gray-300 leading-relaxed">
              Aproximadamente <span className="text-white font-bold">22 integrantes</span> unidos pela paixão do carnaval.
              Fortalecemos a <span className="text-neon-pink font-bold">representatividade negra</span> na cena musical,
              promovendo diversidade, inclusão e valorização das tradições culturais.
            </p>
          </div>
        </div>

        {/* Repertório */}
        <div className="mt-16 glassmorphism p-8 rounded-2xl">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
              Nosso Repertório
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-bold text-neon-green mb-3">Artistas Consagrados</h4>
              <ul className="space-y-2 text-gray-300">
                <li>🎸 <span className="font-semibold">Gilberto Gil</span> - Ícone da MPB e do Tropicalismo</li>
                <li>🪕 <span className="font-semibold">Luiz Gonzaga</span> - Rei do Baião</li>
                <li>🎤 <span className="font-semibold">Dona Ivone Lara</span> - Primeira-dama do samba</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-neon-pink mb-3">Artistas Contemporâneos</h4>
              <ul className="space-y-2 text-gray-300">
                <li>✨ <span className="font-semibold">Luedji Luna</span> - Música afro-brasileira contemporânea</li>
                <li>🔥 <span className="font-semibold">Cordel do Fogo Encantado</span> - Rock e cultura nordestina</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
