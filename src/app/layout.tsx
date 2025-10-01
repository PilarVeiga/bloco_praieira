import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bloco Praieira - Carnaval de Rua ABC Paulista',
  description: 'Bloco de carnaval urbano de rua de Santo André. Participe das nossas apresentações e apoie nossa cultura!',
  keywords: 'carnaval, bloco, ABC Paulista, Santo André, música, cultura',
  authors: [{ name: 'Bloco Praieira' }],
  creator: 'Bloco Praieira',
  openGraph: {
    title: 'Bloco Praieira - Carnaval de Rua ABC Paulista',
    description: 'Bloco de carnaval urbano de rua de Santo André',
    url: 'https://blocopraieira.com.br',
    siteName: 'Bloco Praieira',
    images: [
      {
        url: '/logo_branco.png',
        width: 800,
        height: 600,
        alt: 'Logo Bloco Praieira',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloco Praieira - Carnaval de Rua ABC Paulista',
    description: 'Bloco de carnaval urbano de rua de Santo André',
    images: ['/logo_branco.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}