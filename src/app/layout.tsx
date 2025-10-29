import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bloco Praieira - Bloco do Amor | Santo André, ABC",
  description: "Bloco de carnaval de Santo André que celebra a música afro-brasileira através de Axé, Ijexá, Samba e Maracatu desde 2021. Fundado pelos irmãos Charles e Vinícius Guichabeira.",
  keywords: "bloco praieira, carnaval, santo andré, abc paulista, bloco do amor, axé, ijexá, samba, maracatu, música afro-brasileira",
  authors: [{ name: "Bloco Praieira" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Bloco Praieira - Bloco do Amor",
    description: "Carnaval de rua e música afro-brasileira no ABC Paulista",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloco Praieira - Bloco do Amor",
    description: "Carnaval de rua e música afro-brasileira no ABC Paulista",
  },
  verification: {
    // Adicione suas verificações aqui quando disponíveis
    // google: 'seu-código-google',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased text-white">
        {children}
      </body>
    </html>
  );
}
