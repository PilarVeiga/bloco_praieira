'use client';

import { useState } from 'react';

export default function Donations() {
  const [copied, setCopied] = useState(false);
  
  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText('blocopraieira@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert('Não foi possível copiar automaticamente. A chave PIX é: blocopraieira@gmail.com');
    }
  };

  return (
    <section id="doacoes" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-green to-neon-pink bg-clip-text text-transparent">
            Apoie o Bloco
          </span>
        </h2>

        <div className="glassmorphism p-10 rounded-2xl text-center">
          <div className="text-7xl mb-6">💰</div>
          
          <h3 className="text-3xl font-bold text-neon-green mb-4">
            Faça sua Doação via PIX
          </h3>
          
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Apoie o Bloco Praieira e ajude a manter viva a cultura do carnaval de rua
            e a diversidade no ABC Paulista. Suas doações ajudam na
            manutenção de instrumentos e custear apresentações.
          </p>

          {/* Chave PIX */}
          <div className="bg-black/40 p-6 rounded-xl mb-8 border-2 border-neon-pink">
            <p className="text-gray-400 text-sm mb-2">Chave PIX (Email)</p>
            <p className="text-base sm:text-xl md:text-2xl font-bold text-neon-pink mb-4 break-all px-2">
              blocopraieira@gmail.com
            </p>
            <button
              onClick={handleCopyPix}
              className="px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-green rounded-full font-bold text-black hover:scale-105 transition-transform"
              aria-label="Copiar chave PIX para área de transferência"
            >
              {copied ? '✅ Copiado!' : '📋 Copiar Chave PIX'}
            </button>
          </div>

          {/* Valores Sugeridos */}
          <div className="mb-8">
            <p className="text-gray-400 text-sm mb-4">Valores sugeridos (ou qualquer valor!)</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="glassmorphism p-4 rounded-xl hover:border-neon-green border-2 border-transparent transition-all">
                <p className="text-2xl font-bold text-neon-green">R$ 10</p>
                <p className="text-xs text-gray-400">Ajuda básica</p>
              </div>
              <div className="glassmorphism p-4 rounded-xl hover:border-neon-pink border-2 border-transparent transition-all">
                <p className="text-2xl font-bold text-neon-pink">R$ 25</p>
                <p className="text-xs text-gray-400">Apoio</p>
              </div>
              <div className="glassmorphism p-4 rounded-xl hover:border-neon-blue border-2 border-transparent transition-all">
                <p className="text-2xl font-bold text-neon-blue">R$ 50+</p>
                <p className="text-xs text-gray-400">Parceiro</p>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            🦀 Toda contribuição é bem-vinda e faz diferença!
          </p>
        </div>
      </div>
    </section>
  );
}
