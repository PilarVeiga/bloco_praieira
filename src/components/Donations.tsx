'use client'

import { useState } from 'react'
import QRCode from 'qrcode'

export default function Donations() {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const pixKey = 'blocopraieira@gmail.com'

  const generateQRCode = async () => {
    try {
      const qrString = await QRCode.toDataURL(pixKey)
      setQrCodeUrl(qrString)
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error)
    }
  }

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  return (
    <section id="donations" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Apoie o Bloco</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-12">
          Sua contribuição nos ajuda a manter viva a tradição do carnaval de rua!
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* QR Code Section */}
          <div className="glassmorphism p-8">
            <h3 className="text-2xl font-semibold mb-6 text-neon-green neon-text">
              Escaneie o QR Code
            </h3>
            
            {qrCodeUrl ? (
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <img src={qrCodeUrl} alt="QR Code PIX" className="w-48 h-48 mx-auto" />
              </div>
            ) : (
              <div className="w-48 h-48 mx-auto mb-4 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                <button
                  onClick={generateQRCode}
                  className="text-neon-blue hover:text-neon-green transition-colors"
                >
                  Gerar QR Code
                </button>
              </div>
            )}
            
            <p className="text-gray-400 text-sm">
              Use seu app bancário para escanear
            </p>
          </div>

          {/* PIX Key Section */}
          <div className="glassmorphism p-8">
            <h3 className="text-2xl font-semibold mb-6 text-neon-pink neon-text">
              Chave PIX
            </h3>
            
            <div className="bg-gray-900 p-4 rounded-lg mb-4 border border-gray-700">
              <p className="text-neon-blue font-mono text-lg break-all">
                {pixKey}
              </p>
            </div>

            <button
              onClick={copyPixKey}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gradient-to-r from-neon-pink to-neon-blue text-black hover:shadow-neon-pink'
              }`}
            >
              {copied ? '✓ Copiado!' : 'Copiar Chave PIX'}
            </button>

            <div className="mt-6 text-left">
              <h4 className="text-lg font-semibold mb-3 text-neon-green">Como contribuir:</h4>
              <ol className="text-gray-300 space-y-2 text-sm">
                <li>1. Abra seu app bancário</li>
                <li>2. Escolha PIX</li>
                <li>3. Cole a chave ou escaneie o QR Code</li>
                <li>4. Digite o valor da contribuição</li>
                <li>5. Confirme a transação</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-12 glassmorphism p-6 max-w-2xl mx-auto">
          <p className="text-gray-300">
            <strong className="text-neon-blue">Sua contribuição importa!</strong><br />
            Cada real nos ajuda a manter instrumentos, figurinos e a energia do nosso carnaval de rua. 
            Juntos, mantemos viva a cultura popular do ABC Paulista! 🦀
          </p>
        </div>
      </div>
    </section>
  )
}