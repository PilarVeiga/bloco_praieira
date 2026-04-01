'use client';

export default function Events() {
  const colorClasses: Record<string, { text: string; border: string }> = {
    'neon-green': { text: 'text-neon-green', border: 'border-neon-green' },
    'neon-pink': { text: 'text-neon-pink', border: 'border-neon-pink' },
  };

  const projetos = [
    {
      icon: '🌾',
      titulo: 'Arraial do Bloco',
      descricao: 'Nosso projeto junino que celebra as tradições nordestinas com baião, arrasta-pé e xote. Uma festa acessível onde todos podem participar, dançar e se conectar com as raízes da cultura brasileira.',
      periodo: 'Junho/Julho',
      color: 'neon-green',
      ritmos: ['Baião', 'Arrasta-pé', 'Xote']
    },
    {
      icon: '🎭',
      titulo: 'Carnaval do Bloco',
      descricao: 'Desde 2022, nosso bloco carnavalesco leva alegria e ritmo para as ruas do ABC Paulista. Axé, ijexá, samba e maracatu em uma celebração vibrante e inclusiva.',
      periodo: 'Fevereiro/Março',
      color: 'neon-pink',
      ritmos: ['Axé', 'Ijexá', 'Samba', 'Maracatu']
    },
  ];

  const locais = [
    { nome: 'Virada Cultural SBC', tipo: 'Grande Evento' },
    { nome: 'Avenida Paulista', tipo: 'Grande Evento' },
    { nome: 'Carnaval de São Bernardo', tipo: 'Carnaval' },
    { nome: 'Carnaval de Santo André', tipo: 'Carnaval' },
    { nome: 'Carnaval de Diadema', tipo: 'Carnaval' },
    { nome: 'Carnaval de São Caetano', tipo: 'Carnaval' },
    { nome: 'Carnaval de São Paulo', tipo: 'Carnaval' },
    { nome: 'A Praieira', tipo: 'Espaço Cultural' },
    { nome: 'Casa Fora do Eixo', tipo: 'Espaço Cultural' },
    { nome: 'Espaço SESI', tipo: 'Espaço Cultural' },
    { nome: 'Parque Central', tipo: 'Espaço Cultural' },
    { nome: 'Praça do Carmo', tipo: 'Espaço Cultural' },
    { nome: 'Parque Celso Daniel', tipo: 'Espaço Cultural' },
    { nome: 'Toca da Boemia', tipo: 'Bar' },
    { nome: 'Bar Garimpo', tipo: 'Bar' },
    { nome: 'Bar Bendito Malte', tipo: 'Bar' },
    { nome: 'GRCES Pantera Negra', tipo: 'Organização' },
  ];

  return (
    <section id="eventos" className="py-20 px-4 bg-black/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
            Nossos Projetos
          </span>
        </h2>

        {/* Projetos Principais */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projetos.map((projeto, idx) => (
            <div
              key={idx}
              className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl mb-4 text-center">{projeto.icon}</div>
              <h3 className={`text-3xl font-bold ${colorClasses[projeto.color].text} mb-4 text-center`}>
                {projeto.titulo}
              </h3>
              <p className="text-gray-300 mb-6 text-center leading-relaxed">
                {projeto.descricao}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {projeto.ritmos.map((ritmo, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 glassmorphism rounded-full border ${colorClasses[projeto.color].border} text-sm font-semibold text-white`}
                  >
                    {ritmo}
                  </span>
                ))}
              </div>
              <div className={`text-center px-4 py-2 glassmorphism rounded-full border-2 ${colorClasses[projeto.color].border}`}>
                <span className="text-sm font-bold text-white">{projeto.periodo}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Por Onde Já Batucamos */}
        <div className="glassmorphism p-10 rounded-2xl">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-neon-green to-neon-pink bg-clip-text text-transparent">
              🦀 Por Onde Já Batucamos
            </span>
          </h3>
          <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
            Desde nossa fundação, já levamos nosso som para mais de <span className="text-white font-bold">20 locais diferentes</span> no 
            ABC Paulista e São Paulo, sempre espalhando alegria, diversidade e cultura brasileira!
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {locais.map((local, idx) => (
              <div
                key={idx}
                className="px-4 py-3 glassmorphism rounded-lg border border-neon-blue/30 hover:border-neon-pink/50 transition-colors"
              >
                <p className="text-white font-semibold text-sm">{local.nome}</p>
                <p className="text-neon-green text-xs mt-1">{local.tipo}</p>
              </div>
            ))}
          </div>
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
