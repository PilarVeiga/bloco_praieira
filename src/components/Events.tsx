'use client';

export default function Events() {
  const eventos = [
    {
      icon: '🎊',
      titulo: 'Carnaval de Rua',
      descricao: 'Desfiles oficiais, blocos de rua e apresentações durante o período carnavalesco em Santo André e região do ABC.',
      periodo: 'Fevereiro/Março',
      color: 'neon-pink',
    },
    {
      icon: '🍻',
      titulo: 'Bares e Casas de Cultura',
      descricao: 'Apresentações regulares em bares, shows e eventos em espaços culturais. Bar "A Praieira" é nossa casa!',
      periodo: 'Ano todo',
      color: 'neon-green',
    },
    {
      icon: '🎭',
      titulo: 'Eventos Culturais',
      descricao: 'Festivais de música, eventos municipais, celebrações culturais e festas populares no ABC Paulista.',
      periodo: 'Datas especiais',
      color: 'neon-blue',
    },
  ];

  return (
    <section id="eventos" className="py-20 px-4 bg-black/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
            Eventos
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {eventos.map((evento, idx) => (
            <div
              key={idx}
              className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl mb-4 text-center">{evento.icon}</div>
              <h3 className={`text-2xl font-bold text-${evento.color} mb-4 text-center`}>
                {evento.titulo}
              </h3>
              <p className="text-gray-300 mb-4 text-center leading-relaxed">
                {evento.descricao}
              </p>
              <div className={`text-center px-4 py-2 glassmorphism rounded-full border border-${evento.color}`}>
                <span className="text-sm font-semibold text-white">{evento.periodo}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center glassmorphism p-8 rounded-2xl">
          <p className="text-gray-300 text-lg">
            Interessado em nos contratar para um evento?
          </p>
          <a
            href="#contato"
            className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-neon-pink to-neon-green rounded-full font-bold text-black hover:scale-105 transition-transform"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  );
}
