# 🦀 Bloco Praieira - Site Oficial

Site oficial do **Bloco Praieira**, bloco de carnaval de rua de Santo André, ABC Paulista, desenvolvido com Next.js 15 + TypeScript e automação de testes completa.

## 🚀 Quick Start

### Instalação Automática

```bash
# Linux/Mac
chmod +x install.sh
./install.sh

# Windows
install.bat
```

### Instalação Manual

```bash
# 1. Clonar repositório
git clone <URL_REPO>
cd blocopraieira

# 2. Instalar dependências
npm install

# 3. Configurar ambiente
cp .env.example .env.local

# 4. Executar
npm run dev
```

**Site disponível em:** http://localhost:3000

## 📋 Documentação Completa

- **[SETUP_COMPLETO.md](SETUP_COMPLETO.md)** - Guia completo de instalação
- **[AUTOMACAO_GUIDE.md](automacao-web/AUTOMACAO_GUIDE.md)** - Guia da automação de testes
- **[CHECKLIST_SETUP.md](CHECKLIST_SETUP.md)** - Checklist de verificação

## ✨ Funcionalidades

### 🌐 Site Next.js
- ✅ **Homepage responsiva** com tema dark/neon
- ✅ **Sistema PIX** com chave copiável e QR Code
- ✅ **Lista de membros** organizados por instrumento
- ✅ **Redes sociais** integradas (@blocopraieira)
- ✅ **API Routes** para doações e membros
- ✅ **Painel administrativo** completo
- ✅ **Banco de dados** (Prisma + PostgreSQL)

### 🤖 Automação de Testes
- ✅ **16 testes automatizados** organizados em 3 estratégias
- ✅ **5 padrões de projeto** implementados
- ✅ **Relatórios** em JSON e Excel
- ✅ **Screenshots** automáticos em falhas
- ✅ **Logs detalhados** com cores
- ✅ **Suporte múltiplos navegadores**
- ✅ **Interface CLI** completa

## 🧪 Executar Automação

```bash
# Entrar na pasta de automação
cd automacao-web

# Instalar dependências
pip install -r requirements-minimal.txt

# Demo rápido (5 testes)
python demo.py

# Todos os testes (16 testes)
python main.py --strategy all

# Testes específicos
python main.py --strategy home      # Homepage
python main.py --strategy donations # Doações PIX
python main.py --strategy members   # Membros
```

## 📊 Testes Implementados

### Homepage (6 testes)
1. Carregamento da página
2. Verificação do título
3. Presença da seção hero
4. Links de navegação
5. Links das redes sociais
6. Elementos responsivos

### Doações (5 testes)
1. Seção de doações presente
2. Chave PIX visível
3. Chave PIX copiável
4. QR Code presente
5. Instruções de doação

### Membros (5 testes)
1. Seção de membros presente
2. Instrumentos listados
3. Funcionalidade do acordeão
4. Informações dos membros
5. Informações de contato

## 🏗️ Padrões de Projeto

A automação implementa **5 padrões de projeto profissionais**:

1. **Page Object Model (POM)** - Encapsulamento de elementos da página
2. **Strategy Pattern** - Diferentes estratégias de teste
3. **Factory Method** - Criação de WebDrivers
4. **Singleton Pattern** - Configurações centralizadas
5. **Template Method** - Estrutura base para testes

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Styling moderno
- **React** - Componentes interativos

### Backend
- **API Routes** - Endpoints Next.js
- **Prisma** - ORM e migrações
- **PostgreSQL** - Banco de dados

### Automação
- **Python 3.8+** - Linguagem de automação
- **Selenium 4.15** - Automação web
- **WebDriver Manager** - Gerenciamento de drivers
- **Colorama** - Logs coloridos

## 📁 Estrutura do Projeto

```
blocopraieira/
├── src/                          # Código fonte Next.js
│   ├── app/                      # App Router
│   ├── components/               # Componentes React
│   └── lib/                      # Utilitários
├── automacao-web/                # Automação de testes
│   ├── src/                      # Código fonte Python
│   │   ├── pages/                # Page Object Model
│   │   ├── strategies/           # Strategy Pattern
│   │   └── utils/                # Factory + Logger
│   ├── config/                   # Configurações
│   ├── reports/                  # Relatórios gerados
│   └── logs/                     # Logs de execução
├── prisma/                       # Schema do banco
├── public/                       # Assets estáticos
├── docs/                         # Documentação
├── install.sh                    # Instalação Linux/Mac
├── install.bat                   # Instalação Windows
└── README.md                     # Este arquivo
```

## 🔧 Comandos Úteis

### Site
```bash
npm run dev          # Servidor desenvolvimento
npm run build        # Build produção
npm run start        # Servidor produção
npm run lint         # Verificar código
```

### Banco de Dados
```bash
npx prisma generate  # Gerar cliente
npx prisma db push   # Aplicar schema
npx prisma studio    # Interface visual
```

### Automação
```bash
python demo.py                    # Demo rápido
python main.py --strategy all     # Todos os testes
python main.py --headless         # Modo headless
python main.py --browser firefox  # Firefox
```

## 🚨 Troubleshooting

### Site não carrega
```bash
# Verificar porta
netstat -an | findstr :3000

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Automação falha
```bash
# Verificar conectividade
curl -I http://localhost:3000

# Reinstalar selenium
pip install --force-reinstall selenium==4.15.2

# Limpar cache
find . -name "*.pyc" -delete
```

## 📞 Contato

**Bloco Praieira**
- 📧 Email: blocopraieira@gmail.com
- 📱 Instagram: [@blocopraieira](https://instagram.com/blocopraieira)
- 📍 Local: Santo André, ABC Paulista
- 🎵 Ativo desde: 2021

## 🤝 Contribuição

1. Fork do repositório
2. Criar branch para feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit das mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para branch (`git push origin feature/nova-funcionalidade`)
5. Criar Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ para o Bloco Praieira** 🦀

*Mantendo viva a tradição do carnaval de rua no ABC Paulista*