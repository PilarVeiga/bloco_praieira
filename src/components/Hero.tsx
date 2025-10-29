'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 animate-fade-in">
      <div className="text-center space-y-8 max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo_branco.png"
            alt="Bloco Praieira Logo"
            width={300}
            height={300}
            priority
            className="drop-shadow-2xl"
          />
        </div>

        {/* Título Principal */}
        <h1 className="text-6xl md:text-8xl font-bold">
          <span className="bg-gradient-to-r from-neon-green via-neon-pink to-neon-blue bg-clip-text text-transparent text-neon-glow">
            Bloco Praieira
          </span>
        </h1>

        {/* Caranguejo */}
        <div className="text-7xl animate-pulse">
          🦀
        </div>

        {/* Subtítulo */}
        <p className="text-2xl md:text-3xl text-gray-300 font-light">
          Bloco do Amor
        </p>

        {/* Descrição */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Bloco de carnaval de Santo André que celebra a música afro-brasileira através de{' '}
          <span className="text-neon-green font-semibold">Axé</span>,{' '}
          <span className="text-neon-pink font-semibold">Ijexá</span>,{' '}
          <span className="text-neon-blue font-semibold">Samba</span> e{' '}
          <span className="text-neon-green font-semibold">Maracatu</span> desde 2021
        </p>

        {/* Fundadores */}
        <div className="glassmorphism p-6 rounded-xl inline-block">
          <p className="text-gray-300">
            Fundado por <span className="text-neon-pink font-bold">Charles</span> e{' '}
            <span className="text-neon-blue font-bold">Vinícius Guichabeira</span>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Bar "A Praieira" • Centro, Santo André • ABC Paulista
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a
            href="#membros"
            className="px-8 py-4 bg-gradient-to-r from-neon-green to-neon-blue rounded-full font-bold text-black hover:scale-105 transition-transform duration-300 shadow-lg shadow-neon-green/50"
          >
            Conheça o Bloco
          </a>
          <a
            href="#doacoes"
            className="px-8 py-4 glassmorphism rounded-full font-bold text-white hover:scale-105 transition-transform duration-300 border-2 border-neon-pink hover:border-neon-green"
          >
            Apoie via PIX
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-neon-green text-4xl">↓</div>
        </div>
      </div>
    </section>
  );
}
