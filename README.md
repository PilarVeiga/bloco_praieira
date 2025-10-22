# 🦀 Bloco Praieira - Site Oficial

Site oficial do **Bloco Praieira**, bloco de carnaval de Santo André, ABC Paulista. Fundado em 2021 pelos irmãos Charles e Vinícius Guichabeira no bar "A Praieira", tocamos maracatu, ijexá, samba e outros ritmos brasileiros.

## 🎭 Sobre o Bloco

- **Nome**: Bloco Praieira
- **Fundação**: 2021
- **Fundadores**: Charles Guichabeira e Vinícius Guichabeira
- **Local de origem**: Bar "A Praieira", Santo André
- **Região**: ABC Paulista, São Paulo
- **Ritmos**: Maracatu, Ijexá, Samba e outros
- **Símbolo**: Caranguejo 🦀
- **Membros**: ~20 integrantes
- **Eventos**: Carnaval, bares e eventos culturais

## 🎵 Instrumentação

### Harmonia
- Vozes
- Violão
- Baixo

### Percussão
- Caixa
- Surdo
- Xequerê
- Ganzá
- Agogô
- Repinique
- Tamborim

## 🚀 Tecnologias

### Frontend
- **Next.js 15.5.3** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React** 18.3.1 - Biblioteca de interface

### Backend & Database
- **PostgreSQL** - Banco de dados
- **Prisma ORM** - Object-Relational Mapping
- **Next.js API Routes** - Backend serverless

### Funcionalidades Especiais
- **QRCode** - Geração de códigos PIX
- **NextAuth.js** - Autenticação (planejado)
- **bcryptjs** - Hash de senhas

## ✨ Funcionalidades

### 🎪 Site Público
- **Hero Section**: Logo, história e missão do bloco
- **Sistema de Doações**: QR Code PIX automático e chave de pagamento
- **Membros por Instrumento**: Acordeão interativo organizando integrantes por naipe
- **Links Sociais**: Instagram, email e localização
- **Design Responsivo**: Tema escuro com cores neon

### 🔐 Painel Administrativo (`/admin`)
- **Gerenciamento de Membros**: CRUD completo
- **Controle de Doações**: Histórico e estatísticas
- **Dashboard**: Métricas e visão geral
- **Autenticação**: Sistema de login protegido

### 🎨 Design System
- **Paleta Neon**: Verde (#39FF14), Rosa (#FF10F0), Azul (#00FFFF)
- **Glassmorphism**: Efeitos de vidro fosco
- **Animações**: Fade-in, slide-up, pulse
- **Responsividade**: Mobile-first

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 15+
- npm ou yarn

### 1. Clone e Instale
```bash
git clone <repository-url>
cd blocopraieira
npm install
```

### 2. Configuração do Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Configure as variáveis:
# DATABASE_URL="postgresql://user:password@localhost:5432/blocopraieira"
# NEXTAUTH_URL="http://localhost:3000"
# NEXTAUTH_SECRET="your-secret-here"
# PIX_KEY="blocopraieira@gmail.com"
```

### 3. Setup do Banco de Dados
```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar migrations
npx prisma db push

# (Opcional) Seed inicial
npx prisma db seed
```

### 4. Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
blocopraieira/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── members/       # CRUD de membros
│   │   │   └── donations/     # Sistema de doações
│   │   ├── admin/             # Painel administrativo
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes React
│   │   ├── Hero.tsx           # Seção principal
│   │   ├── Donations.tsx      # Sistema PIX
│   │   ├── Members.tsx        # Acordeão de membros
│   │   ├── SocialLinks.tsx    # Links sociais
│   │   └── AdminDashboard.tsx # Dashboard admin
│   └── lib/
│       └── prisma.ts          # Cliente Prisma
├── prisma/
│   └── schema.prisma          # Schema do banco
├── public/                    # Assets estáticos
├── .env.example               # Variáveis de ambiente
└── README.md                  # Documentação
```

## 🎵 Organização Musical

O bloco é organizado em 7 naipes instrumentais:

1. **Mestres** - Liderança musical e coordenação
2. **Harmonia** - Base melódica
3. **Caixa** - Percussão de base
4. **Repinique** - Percussão de chamada
5. **Surdo** - Percussão grave
6. **Xequerê & Ganzá** - Percussão complementar
7. **Tamborim** - Percussão aguda

## 🗄️ API Endpoints

### Membros
- `GET /api/members` - Listar membros por instrumento
- `POST /api/members` - Adicionar novo membro

### Doações
- `GET /api/donations` - Histórico e total de doações
- `POST /api/donations` - Registrar nova doação

## 📱 Redes Sociais

- **Instagram**: [@blocopraieira](https://instagram.com/blocopraieira)
- **Email/PIX**: blocopraieira@gmail.com
- **Localização**: Santo André, ABC Paulista

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Configurações de Produção
- Configure as variáveis de ambiente na plataforma
- Configure o banco PostgreSQL (ex: Supabase, Neon, Railway)
- Atualize `NEXTAUTH_URL` para o domínio de produção

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Add nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja `LICENSE` para mais detalhes.

## 💖 Apoie o Bloco

**PIX**: blocopraieira@gmail.com

Sua contribuição nos ajuda a manter viva a tradição do carnaval de rua no ABC Paulista!

---

**Desenvolvido com ❤️ para a cultura popular brasileira**  
**Bloco Praieira © 2025** • Santo André, ABC Paulista