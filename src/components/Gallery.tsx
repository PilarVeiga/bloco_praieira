'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const fotos = [
  'Praieira_Out25_10.JPG',
  'Praieira_Out25_25.JPG',
  'Praieira_Out25_135.JPG',
  'Praieira_Out25_142.JPG',
  'Praieira_Out25_100.JPG',
  'Praieira_Out25_125.JPG',
  'Praieira_Out25_150.JPG',
  'Praieira_Out25_175.JPG',
  'Praieira_Out25_200.JPG',
  'Praieira_Out25_220.JPG',
  'Praieira_Out25_235.JPG',
  'Praieira_Out25_245.JPG',
  'Praieira_Out25_260.JPG',
  'Praieira_Out25_275.JPG',
  'Praieira_Out25_278.JPG',
  'Praieira_Out25_290.JPG',
  'Praieira_Out25_315.JPG',
  'Praieira_Out25_350.JPG',
  'Praieira_Out25_355.JPG',
  'Praieira_Out25_375.JPG',
  'Praieira_Out25_385.JPG',
  'Praieira_Out25_390.JPG',
  'Praieira_Out25_395.JPG',
  'Praieira_Out25_400.JPG',
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % fotos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + fotos.length) % fotos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % fotos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="galeria" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
            Galeria
          </span>
        </h2>

        <div className="glassmorphism p-8 rounded-2xl mb-12">
          <h3 className="text-3xl font-bold text-neon-green mb-6 text-center">
            🎥 Bloco Praieira
          </h3>
          <p className="text-gray-300 text-center mb-8">
            Confira nossa apresentação do Bloco Praieira!
          </p>
          
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl shadow-neon-pink/20">
            <video
              controls
              className="w-full h-full"
              poster="/logo_branco.png"
            >
              <source src="/videos/bloco_praieira.mov" type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>

          <p className="text-gray-400 text-sm text-center mt-4">
            🎤 Voz: Juliana Morelli | 🎬 Edição: Yris Froes
          </p>
          <p className="text-gray-400 text-sm text-center mt-2">
            📍 Santo André, ABC Paulista • 2025
          </p>
        </div>

        {/* Carrossel de Fotos */}
        <div className="glassmorphism p-8 rounded-2xl">
          <h3 className="text-3xl font-bold text-neon-pink mb-6 text-center">
            📸 Momentos Inesquecíveis
          </h3>
          
          <div 
            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl shadow-neon-blue/20"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Imagem */}
            <div className="relative w-full h-full">
              <Image
                src={`/fotos/galeria/${fotos[currentIndex]}`}
                alt={`Bloco Praieira - Foto ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </div>

            {/* Botão Anterior */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
              aria-label="Foto anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Botão Próximo */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
              aria-label="Próxima foto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Contador */}
            <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-white text-sm">
              {currentIndex + 1} / {fotos.length}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {fotos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-neon-pink w-8' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Ir para foto ${index + 1}`}
              />
            ))}
          </div>

          <p className="text-gray-400 text-sm text-center mt-6">
            🎉 Outubro 2025 • Bloco do Amor
          </p>
        </div>
      </div>
    </section>
  );
}
