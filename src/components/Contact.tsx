'use client';

export default function Contact() {
  return (
    <section id="contato" className="py-20 px-4 bg-black/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
            Contato
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Instagram */}
          <a
            href="https://instagram.com/blocopraieira"
            target="_blank"
            rel="noopener noreferrer"
            className="glassmorphism p-8 rounded-2xl text-center hover:scale-105 hover:border-neon-pink border-2 border-transparent transition-all"
          >
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-neon-pink mb-2">Instagram</h3>
            <p className="text-gray-400">@blocopraieira</p>
            <p className="text-sm text-gray-500 mt-2">Siga a gente!</p>
          </a>

          {/* Email */}
          <a
            href="mailto:blocopraieira@gmail.com"
            className="glassmorphism p-8 rounded-2xl text-center hover:scale-105 hover:border-neon-green border-2 border-transparent transition-all"
          >
            <div className="text-6xl mb-4">✉️</div>
            <h3 className="text-2xl font-bold text-neon-green mb-2">Email</h3>
            <p className="text-gray-400 break-all">blocopraieira@gmail.com</p>
            <p className="text-sm text-gray-500 mt-2">Envie uma mensagem</p>
          </a>

          {/* Localização */}
          <div className="glassmorphism p-8 rounded-2xl text-center hover:scale-105 hover:border-neon-blue border-2 border-transparent transition-all">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-2xl font-bold text-neon-blue mb-2">Localização</h3>
            <p className="text-gray-400">Santo André</p>
            <p className="text-gray-400">ABC Paulista, SP</p>
            <p className="text-sm text-gray-500 mt-2">Bloco itinerante - sem sede fixa</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="text-6xl mb-4">🦀</div>
          <p className="text-gray-400 text-lg mb-2">
            <span className="text-neon-pink font-bold">Bloco Praieira</span> - Bloco do Amor
          </p>
          <p className="text-gray-500 text-sm">
            Fundado em 2021 • Santo André, ABC Paulista
          </p>
          <p className="text-gray-600 text-xs mt-4">
            Arte, memória e identidade • Representatividade negra
          </p>
        </div>
      </div>
    </section>
  );
}
