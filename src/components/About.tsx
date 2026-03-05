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

        {/* História Completa */}
        <div className="glassmorphism p-10 rounded-2xl mb-12">
          <div className="text-6xl mb-6 text-center">🦀</div>
          <h3 className="text-3xl font-bold text-neon-green mb-6 text-center">De um Sonho a uma Comunidade</h3>
          <div className="space-y-4 text-gray-300 leading-relaxed max-w-4xl mx-auto">
            <p>
              Tudo começou com um sonho dos irmãos <span className="text-neon-pink font-bold">Charles</span> e{' '}
              <span className="text-neon-blue font-bold">Vinícius Guichabeira</span>: criar uma{' '}
              <span className="text-white font-bold">oficina de percussão comunitária</span> onde qualquer pessoa, 
              independente de experiência musical, pudesse descobrir o universo dos ritmos brasileiros.
            </p>
            <p>
              O projeto ganhou vida em <span className="text-white font-bold">2021</span>, quando encontrou abrigo no 
              espaço cultural <span className="text-neon-green font-bold">"A Praieira"</span>, localizado no Centro de 
              Santo André, ABC Paulista. Este espaço, criado em homenagem ao artista{' '}
              <span className="text-neon-pink font-bold">Chico Science</span>, tornou-se o berço do que viria a ser o 
              Bloco Praieira.
            </p>
            <p>
              Inspirados pelo legado de Chico Science e pela essência acolhedora d'A Praieira, o bloco se consolidou 
              como um <span className="text-white font-bold">projeto de incentivo cultural comunitário</span>, 
              transformando iniciantes em percussionistas e formando uma família de aproximadamente{' '}
              <span className="text-neon-blue font-bold">22 integrantes</span> apaixonados pela música.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Missão */}
          <div className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animate-slide-up">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-neon-green mb-4">Nossa Missão</h3>
            <p className="text-gray-300 leading-relaxed">
              Proporcionar experiência musical acessível para pessoas{' '}
              <span className="text-neon-pink font-bold">sem experiência prévia</span>. 
              Do tamborim ao surdo, cada instrumento é uma porta de entrada para a descoberta 
              do ritmo que habita em cada um de nós.
            </p>
          </div>

          {/* Card 2: Bloco do Amor */}
          <div className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="text-5xl mb-4">🥁</div>
            <h3 className="text-2xl font-bold text-neon-pink mb-4">Bloco do Amor</h3>
            <p className="text-gray-300 leading-relaxed">
              A música como <span className="text-white font-bold">linguagem universal</span> que transcende barreiras. 
              Celebramos ritmos brasileiros e africanos através de{' '}
              <span className="text-neon-green font-bold">Axé</span>,{' '}
              <span className="text-neon-pink font-bold">Ijexá</span>,{' '}
              <span className="text-neon-blue font-bold">Samba</span>,{' '}
              <span className="text-neon-green font-bold">Maracatu</span>,{' '}
              <span className="text-neon-pink font-bold">Baião</span> e{' '}
              <span className="text-neon-blue font-bold">Xote</span>.
            </p>
          </div>

          {/* Card 3: Comunidade */}
          <div className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-neon-blue mb-4">Representatividade</h3>
            <p className="text-gray-300 leading-relaxed">
              Fortalecemos a <span className="text-neon-pink font-bold">representatividade negra</span> na cena musical,
              promovendo diversidade, inclusão e valorização das tradições culturais. Uma família de{' '}
              <span className="text-white font-bold">22 integrantes</span> que forma novas plateias e 
              cria pontes entre ritmo e comunidade.
            </p>
          </div>
        </div>

        {/* Homenagem ao Chico Science */}
        <div className="mt-12 glassmorphism p-8 rounded-2xl border-2 border-neon-green/30">
          <h3 className="text-2xl font-bold text-neon-green mb-4 text-center">
            🔥 Homenagem ao Chico Science
          </h3>
          <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            Nosso nome e identidade prestam homenagem ao espaço cultural "A Praieira" e, por extensão, 
            ao legado de <span className="text-neon-pink font-bold">Chico Science</span>, 
            artista que revolucionou a música brasileira ao misturar maracatu com rock. 
            Assim como ele, buscamos criar pontes entre tradição e contemporaneidade.
          </p>
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
