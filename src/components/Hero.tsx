'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="w-48 h-48 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-green via-neon-pink to-neon-blue opacity-20 blur-xl"></div>
            <div className="relative w-full h-full rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <span className="crab-emoji">🦀</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-up">
          <span className="gradient-text">Bloco Praieira</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
          Carnaval de Rua • ABC Paulista • Santo André
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="glassmorphism p-6">
            <h3 className="text-lg font-semibold mb-3 text-neon-green neon-text">Nossa História</h3>
            <p className="text-gray-300 text-sm">
              Fundado em 2021 no Bar "A Praieira", somos um bloco de carnaval urbano de rua 
              que leva alegria e música pelas ruas do ABC Paulista.
            </p>
          </div>

          <div className="glassmorphism p-6">
            <h3 className="text-lg font-semibold mb-3 text-neon-pink neon-text">Nossa Missão</h3>
            <p className="text-gray-300 text-sm">
              Promover a cultura do carnaval de rua com aproximadamente 30 integrantes, 
              levando música e festa para bares, ruas e eventos da região.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
          <button 
            onClick={() => document.getElementById('donations')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-neon-green to-neon-blue text-black font-bold py-3 px-8 rounded-full hover:shadow-neon-blue transition-all duration-300 transform hover:scale-105"
          >
            Apoie o Bloco
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1 h-3 bg-neon-blue rounded-full mx-auto animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}