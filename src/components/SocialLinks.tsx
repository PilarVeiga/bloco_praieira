export default function SocialLinks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-t from-black to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          <span className="gradient-text">Conecte-se Conosco</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Instagram */}
          <a
            href="https://instagram.com/blocopraieira"
            target="_blank"
            rel="noopener noreferrer"
            className="glassmorphism p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              📸
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-neon-pink neon-text">
              Instagram
            </h3>
            <p className="text-gray-300 mb-4">
              Acompanhe nossos ensaios, apresentações e bastidores
            </p>
            <p className="text-neon-pink font-mono">@blocopraieira</p>
          </a>

          {/* Email */}
          <a
            href="mailto:blocopraieira@gmail.com"
            className="glassmorphism p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-neon-blue neon-text">
              Email
            </h3>
            <p className="text-gray-300 mb-4">
              Entre em contato direto conosco
            </p>
            <p className="text-neon-blue font-mono break-all">blocopraieira@gmail.com</p>
          </a>
        </div>

        {/* Location */}
        <div className="glassmorphism p-8 max-w-2xl mx-auto">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-2xl font-semibold mb-3 text-neon-green neon-text">
            Localização
          </h3>
          <p className="text-gray-300 mb-2">
            <strong>Santo André</strong> - ABC Paulista, São Paulo
          </p>
          <p className="text-gray-400 text-sm">
            Nascido no Bar "A Praieira" em 2021
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
            <p>© 2025 Bloco Praieira. Carnaval de rua do ABC Paulista.</p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="crab-emoji mr-2">🦀</span>
              <span>Fundado em 2021</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}