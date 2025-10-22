'use client'

import { useState } from 'react'

interface Member {
  name: string
  role?: string
}

interface InstrumentSection {
  name: string
  description: string
  members: Member[]
  color: string
}

const instrumentSections: InstrumentSection[] = [
  {
    name: 'Fundadores',
    description: 'Criadores do Bloco Praieira',
    members: [
      { name: 'Charles Guichabeira', role: 'Cofundador' },
      { name: 'Vinícius Guichabeira', role: 'Cofundador' }
    ],
    color: 'neon-green'
  },
  {
    name: 'Harmonia',
    description: 'Vozes, violão e baixo - Base melódica do bloco',
    members: [
      { name: 'Aguardando cadastro' }
    ],
    color: 'neon-pink'
  },
  {
    name: 'Caixa',
    description: 'Percussão de base e marcação do ritmo',
    members: [
      { name: 'Aguardando cadastro' }
    ],
    color: 'neon-blue'
  },
  {
    name: 'Surdo',
    description: 'Percussão grave que dá a base rítmica',
    members: [
      { name: 'Aguardando cadastro' }
    ],
    color: 'neon-green'
  },
  {
    name: 'Xequerê',
    description: 'Instrumento de percussão afro-brasileiro',
    members: [
      { name: 'Aguardando cadastro' }
    ],
    color: 'neon-pink'
  },
  {
    name: 'Ganzá',
    description: 'Percussão de chocalho para marcação',
    members: [
      { name: 'Aguardando cadastro' }
    ],
    color: 'neon-blue'
  },
  {
    name: 'Agogô',
    description: 'Instrumento de percussão metálico',
    members: [
      { name: 'Aguardando cadastro' }
    ],
    color: 'neon-green'
  },
  {
    name: 'Repinique',
    description: 'Percussão de chamada e variações',
    members: [
      { name: 'Aguardando cadastro' }
    ],
    color: 'neon-pink'
  },
  {
    name: 'Tamborim',
    description: 'Percussão aguda com detalhes rítmicos',
    members: [
      { name: 'Aguardando cadastro' }
    ],
    color: 'neon-blue'
  }
]

export default function Members() {
  const [openSections, setOpenSections] = useState<number[]>([])

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Nossos Membros</span>
          </h2>
          <p className="text-xl text-gray-300">
            Conheça os integrantes que fazem a magia do carnaval acontecer
          </p>
        </div>

        <div className="space-y-4">
          {instrumentSections.map((section, index) => (
            <div key={index} className="glassmorphism overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div>
                  <h3 className={`text-2xl font-semibold ${section.color === 'neon-green' ? 'text-neon-green' : section.color === 'neon-pink' ? 'text-neon-pink' : 'text-neon-blue'} neon-text`}>
                    {section.name}
                  </h3>
                  <p className="text-gray-400 mt-1">{section.description}</p>
                </div>
                
                <div className={`transform transition-transform duration-300 ${openSections.includes(index) ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {openSections.includes(index) && (
                <div className="px-6 pb-6 border-t border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {section.members.map((member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className="bg-black/30 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <h4 className="font-semibold text-white">{member.name}</h4>
                        {member.role && (
                          <p className={`text-sm mt-1 ${section.color === 'neon-green' ? 'text-neon-green' : section.color === 'neon-pink' ? 'text-neon-pink' : 'text-neon-blue'}`}>
                            {member.role}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                      Total de membros: <span className="text-white font-semibold">{section.members.length}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center glassmorphism p-6">
          <h3 className="text-2xl font-semibold mb-4 text-neon-blue neon-text">
            Quer fazer parte do Bloco Praieira?
          </h3>
          <p className="text-gray-300 mb-6">
            Estamos sempre abertos a novos integrantes que queiram compartilhar 
            a paixão pelo carnaval de rua. Entre em contato conosco!
          </p>
          <a 
            href="mailto:blocopraieira@gmail.com"
            className="inline-block bg-gradient-to-r from-neon-green to-neon-blue text-black font-bold py-3 px-8 rounded-full hover:shadow-neon-blue transition-all duration-300 transform hover:scale-105"
          >
            Entrar em Contato
          </a>
        </div>
      </div>
    </section>
  )
}