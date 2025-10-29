'use client';

export default function Gallery() {
  return (
    <section id="galeria" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
            Galeria
          </span>
        </h2>

        <div className="glassmorphism p-8 rounded-2xl">
          <h3 className="text-3xl font-bold text-neon-green mb-6 text-center">
            🎥 Carnaval 2025
          </h3>
          <p className="text-gray-300 text-center mb-8">
            Confira nossa apresentação no Carnaval de 2025!
          </p>
          
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl shadow-neon-pink/20">
            <video
              controls
              className="w-full h-full"
              poster="/logo_branco.png"
            >
              <source src="/videos/Carnaval 2025.mp4" type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>

          <p className="text-gray-400 text-sm text-center mt-6">
            📍 Santo André, ABC Paulista • 2025
          </p>
        </div>
      </div>
    </section>
  );
}
