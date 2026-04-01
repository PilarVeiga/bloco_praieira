'use client';

import { useState } from 'react';
import Image from 'next/image';

const membros = {
  mestres: [
    { nome: 'Charles Guichabeira', instrumento: 'Mestre e Cofundador', foto: 'Charles 2.jpeg' },
    { nome: 'Vinícius Guichabeira', instrumento: 'Mestre e Cofundador', foto: 'Vini.jpg', inMemoriam: true },
  ],
  harmonia: [
    { nome: 'Ana Luiza', instrumento: 'Voz', foto: 'Ana Luiza.jpg' },
    { nome: 'Caro', instrumento: 'Voz', foto: 'Caro.jpg' },
    { nome: 'Carol', instrumento: 'Voz e Violão', foto: 'Carol.jpg' },
    { nome: 'Cocão', instrumento: 'Baixo', foto: 'Cocão.jpg' },
  ],
  percussao: {
    surdo: [
      { nome: 'Dalli', foto: 'Dalli.jpeg' },
      { nome: 'Gui', foto: 'Gui.jpeg' },
      { nome: 'Luana', foto: 'Luana.jpg' },
      { nome: 'Nika', foto: 'Nika.jpg' },
      { nome: 'Pedro', foto: 'Pedro.jpg' },
      { nome: 'Thiago', foto: 'Thiago.jpg' },
    ],
    caixa: [
      { nome: 'Cauan', foto: 'Cauan.jpeg' },
      { nome: 'Cauê', foto: 'Cauê.jpg' },
      { nome: 'Ricardo', foto: 'Ricardo.jpg' },
      { nome: 'Thaisa', foto: 'Thaisa.jpg' },
    ],
    repinique: [
      { nome: 'Maya', foto: 'Maya.jpg' },
    ],
    tamborim: [
      { nome: 'Katia', foto: 'Katia.jpg' },
      { nome: 'Morelli', foto: 'Morelli.jpg' },
      { nome: 'Pilar', foto: 'Pilar.jpg' },
      { nome: 'Yris', foto: 'Yris.jpg' },
    ],
    xequere: [
      { nome: 'Flavinha', instrumento: 'Xequerê, Ganzá, Triângulo', foto: 'Flavinha.jpeg' },
      { nome: 'Monisi', instrumento: 'Agogô, Percussões Diversas', foto: 'Monisi.jpeg' },
      { nome: 'Yas', instrumento: 'Xequerê, Ganzá', foto: 'Yas.jpg' },
    ],
  },
};

export default function Members() {
  const [openSection, setOpenSection] = useState<string | null>('mestres');

  const toggleSection = (section: string) => {
    setOpenSection((prev) => prev === section ? null : section);
  };

  return (
    <section id="membros" className="py-20 px-4 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
            Nossos Integrantes
          </span>
        </h2>

        {/* Mestres e Fundadores */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => toggleSection('mestres')}
            className="w-full glassmorphism p-6 rounded-xl flex justify-between items-center hover:border-neon-pink border-2 border-transparent transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎯</span>
              <h3 className="text-2xl font-bold text-neon-pink">Mestres e Fundadores</h3>
            </div>
            <span className="text-3xl text-neon-pink">{openSection === 'mestres' ? '−' : '+'}</span>
          </button>
          
          {openSection === 'mestres' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {membros.mestres.map((membro, idx) => (
                <div key={idx} className="glassmorphism p-4 rounded-xl text-center hover:scale-105 transition-transform">
                  <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={`/fotos/membros/${membro.foto}`}
                      alt={membro.nome}
                      fill
                      className="object-cover object-top"
                    />
                    {membro.inMemoriam && (
                      <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-3">
                        <div className="bg-black/70 px-4 py-2 rounded-lg border border-white/40">
                          <p className="text-white text-sm font-semibold">In Memoriam</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-neon-pink">{membro.nome}</h4>
                  <p className="text-sm text-gray-400">{membro.instrumento}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Harmonia */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => toggleSection('harmonia')}
            className="w-full glassmorphism p-6 rounded-xl flex justify-between items-center hover:border-neon-green border-2 border-transparent transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎤</span>
              <h3 className="text-2xl font-bold text-neon-green">Harmonia (Vozes e Cordas)</h3>
            </div>
            <span className="text-3xl text-neon-green">{openSection === 'harmonia' ? '−' : '+'}</span>
          </button>
          
          {openSection === 'harmonia' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {membros.harmonia.map((membro, idx) => (
                <div key={idx} className="glassmorphism p-4 rounded-xl text-center hover:scale-105 transition-transform">
                  <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={`/fotos/membros/${membro.foto}`}
                      alt={membro.nome}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <h4 className="font-bold text-neon-green">{membro.nome}</h4>
                  <p className="text-sm text-gray-400">{membro.instrumento}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Percussão */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => toggleSection('percussao')}
            className="w-full glassmorphism p-6 rounded-xl flex justify-between items-center hover:border-neon-blue border-2 border-transparent transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🥁</span>
              <h3 className="text-2xl font-bold text-neon-blue">Percussão</h3>
            </div>
            <span className="text-3xl text-neon-blue">{openSection === 'percussao' ? '−' : '+'}</span>
          </button>
          
          {openSection === 'percussao' && (
            <div className="space-y-8 mt-6">
              {/* Surdo */}
              <div>
                <h4 className="text-xl font-bold text-neon-blue mb-4">Surdo</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {membros.percussao.surdo.map((membro, idx) => (
                    <div key={idx} className="glassmorphism p-4 rounded-xl text-center hover:scale-105 transition-transform">
                      <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={`/fotos/membros/${membro.foto}`}
                          alt={membro.nome}
                          fill
                            className="object-cover object-top"
                        />
                      </div>
                      <h4 className="font-bold text-white">{membro.nome}</h4>
                      <p className="text-sm text-gray-400">Surdo</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caixa */}
              <div>
                <h4 className="text-xl font-bold text-neon-blue mb-4">Caixa</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {membros.percussao.caixa.map((membro, idx) => (
                    <div key={idx} className="glassmorphism p-4 rounded-xl text-center hover:scale-105 transition-transform">
                      <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={`/fotos/membros/${membro.foto}`}
                          alt={membro.nome}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <h4 className="font-bold text-white">{membro.nome}</h4>
                      <p className="text-sm text-gray-400">Caixa</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repinique */}
              <div>
                <h4 className="text-xl font-bold text-neon-blue mb-4">Repinique</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {membros.percussao.repinique.map((membro, idx) => (
                    <div key={idx} className="glassmorphism p-4 rounded-xl text-center hover:scale-105 transition-transform">
                      <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={`/fotos/membros/${membro.foto}`}
                          alt={membro.nome}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <h4 className="font-bold text-white">{membro.nome}</h4>
                      <p className="text-sm text-gray-400">Repinique</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tamborim */}
              <div>
                <h4 className="text-xl font-bold text-neon-blue mb-4">Tamborim</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {membros.percussao.tamborim.map((membro, idx) => (
                    <div key={idx} className="glassmorphism p-4 rounded-xl text-center hover:scale-105 transition-transform">
                      <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={`/fotos/membros/${membro.foto}`}
                          alt={membro.nome}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <h4 className="font-bold text-white">{membro.nome}</h4>
                      <p className="text-sm text-gray-400">Tamborim</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Xequerê e Ganzá */}
              <div>
                <h4 className="text-xl font-bold text-neon-blue mb-4">Xequerê, Ganzá e Percussões Diversas</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {membros.percussao.xequere.map((membro, idx) => (
                    <div key={idx} className="glassmorphism p-4 rounded-xl text-center hover:scale-105 transition-transform">
                      <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={`/fotos/membros/${membro.foto}`}
                          alt={membro.nome}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <h4 className="font-bold text-white">{membro.nome}</h4>
                      <p className="text-sm text-gray-400">{membro.instrumento}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="text-center mt-12">
          <p className="text-2xl text-gray-300">
            Total: <span className="text-neon-pink font-bold text-4xl">22</span> integrantes
          </p>
        </div>
      </div>
    </section>
  );
}
