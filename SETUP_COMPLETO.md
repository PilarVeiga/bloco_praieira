# 🦀 Bloco Praieira - Setup Completo

Guia completo para configurar e executar o projeto do **Bloco Praieira** em qualquer máquina, incluindo o site Next.js e a automação de testes.

## 📋 Índice

- [Pré-requisitos](#-pré-requisitos)
- [Instalação do Site](#-instalação-do-site)
- [Configuração da Automação](#-configuração-da-automação)
- [Execução](#-execução)
- [Troubleshooting](#-troubleshooting)
- [Estrutura do Projeto](#-estrutura-do-projeto)

---

## 🛠️ Pré-requisitos

### Software Obrigatório

1. **Node.js** (versão 18.0 ou superior)
   ```bash
   # Verificar versão
   node --version
   npm --version
   ```
   - Download: https://nodejs.org/

2. **Python** (versão 3.8 ou superior)
   ```bash
   # Verificar versão
   python --version
   # ou
   python3 --version
   ```
   - Download: https://python.org/

3. **Git** (para clonar o repositório)
   ```bash
   # Verificar versão
   git --version
   ```
   - Download: https://git-scm.com/

### Navegadores (para automação)

- **Google Chrome** (recomendado)
- **Firefox** (opcional)
- **Microsoft Edge** (opcional)

---

## 🌐 Instalação do Site

### 1. Clonar o Repositório

```bash
# Clonar o projeto
git clone <URL_DO_REPOSITORIO>

# Entrar no diretório
cd blocopraieira
```

### 2. Instalar Dependências

```bash
# Instalar dependências do Node.js
npm install

# Ou usar yarn se preferir
yarn install
```

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# Editar variáveis de ambiente
# Windows: notepad .env.local
# Linux/Mac: nano .env.local
```

**Conteúdo do `.env.local`:**
```env
# Database (opcional para desenvolvimento)
DATABASE_URL="postgresql://username:password@localhost:5432/blocopraieira"

# Application
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NODE_ENV="development"

# PIX Configuration
PIX_KEY="blocopraieira@gmail.com"

# NextAuth (se usando autenticação)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-replace-in-production"
```

### 4. Configurar Banco de Dados (Opcional)

Se você quiser usar o banco de dados:

```bash
# Instalar PostgreSQL localmente ou usar Docker
docker run --name postgres-bloco -e POSTGRES_PASSWORD=senha123 -p 5432:5432 -d postgres

# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma db push

# (Opcional) Visualizar banco
npx prisma studio
```

### 5. Compilar e Testar

```bash
# Compilar projeto
npm run build

# Executar em modo desenvolvimento
npm run dev
```

**Site estará disponível em:** http://localhost:3000

---

## 🤖 Configuração da Automação

### 1. Navegar para o Diretório de Automação

```bash
cd automacao-web
```

### 2. Criar Ambiente Virtual Python (Recomendado)

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate
```

### 3. Instalar Dependências Python

```bash
# Instalar dependências mínimas
pip install -r requirements-minimal.txt

# OU instalar dependências completas (inclui Excel)
pip install -r requirements.txt
```

**Conteúdo do `requirements-minimal.txt`:**
```txt
selenium==4.15.2
webdriver-manager==4.0.1
requests==2.32.3
python-dotenv==1.0.0
colorama==0.4.6
```

### 4. Configurar WebDrivers

A automação usa `webdriver-manager` que baixa automaticamente os drivers. Mas você pode instalar manualmente:

**Chrome:**
- ChromeDriver será baixado automaticamente

**Firefox (opcional):**
```bash
# Instalar geckodriver manualmente se necessário
# Baixar de: https://github.com/mozilla/geckodriver/releases
```

### 5. Configurar Variáveis de Ambiente da Automação

```bash
# Editar arquivo .env na pasta automacao-web
# Windows: notepad .env
# Linux/Mac: nano .env
```

**Conteúdo do `automacao-web/.env`:**
```env
# URL do site (ajustar conforme necessário)
BASE_URL=http://localhost:3000

# Configurações do WebDriver
WEBDRIVER_TIMEOUT=10
IMPLICIT_WAIT=5
PAGE_LOAD_TIMEOUT=30

# Configurações de teste
MAX_WAIT_ELEMENTS=10
SCREENSHOT_ON_FAILURE=true

# Configurações do navegador
HEADLESS_MODE=false
BROWSER_WIDTH=1920
BROWSER_HEIGHT=1080

# Configurações de relatórios
EXPORT_EXCEL=true
EXPORT_JSON=true

# Configurações de logging
LOG_LEVEL=INFO
LOG_TO_FILE=true

# Dados de teste específicos
TEST_PIX_KEY=blocopraieira@gmail.com
TEST_EMAIL=teste@blocopraieira.com
```

---

## 🚀 Execução

### Executar o Site

```bash
# No diretório principal (blocopraieira)
cd blocopraieira
npm run dev
```

**Site disponível em:** http://localhost:3000

### Executar Automação

**Em outro terminal:**

```bash
# Navegar para automação
cd blocopraieira/automacao-web

# Ativar ambiente virtual (se criado)
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate

# Demo rápido (5 testes básicos)
python demo.py

# Testes específicos por seção
python main.py --strategy home      # 6 testes da homepage
python main.py --strategy donations # 5 testes de doações
python main.py --strategy members   # 5 testes de membros

# Todos os testes (16 testes)
python main.py --strategy all

# Modo headless (sem interface gráfica)
python main.py --strategy all --headless

# Usar Firefox em vez de Chrome
python main.py --strategy all --browser firefox

# Especificar URL personalizada
python main.py --strategy all --url http://localhost:3001
```

### Comandos Úteis

```bash
# Verificar logs
tail -f automacao-web/logs/automacao_*.log

# Visualizar relatórios
cat automacao-web/reports/test_results_*.json

# Limpar cache Python
find automacao-web -name "*.pyc" -delete
find automacao-web -name "__pycache__" -type d -exec rm -rf {} +
```

---

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Site não carrega
```bash
# Verificar se Node.js está instalado
node --version

# Verificar se dependências estão instaladas
npm list

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Verificar porta em uso
netstat -an | findstr :3000
# ou
lsof -i :3000
```

#### 2. Automação falha ao conectar
```bash
# Verificar se site está rodando
curl -I http://localhost:3000

# Verificar configuração
cat automacao-web/.env

# Testar conectividade Python
cd automacao-web
python -c "import requests; print(requests.get('http://localhost:3000').status_code)"
```

#### 3. Erro de WebDriver
```bash
# Reinstalar webdriver-manager
pip uninstall webdriver-manager
pip install webdriver-manager==4.0.1

# Limpar cache de drivers
rm -rf ~/.wdm

# Testar manualmente
python -c "from selenium import webdriver; driver = webdriver.Chrome(); driver.quit()"
```

#### 4. Erro de dependências Python
```bash
# Recriar ambiente virtual
rm -rf venv
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements-minimal.txt
```

#### 5. Porta já em uso
```bash
# Windows - matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Linux/Mac - matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Usar porta alternativa
PORT=3001 npm run dev
```

### Configurações de Sistema

#### Windows
- Garantir que Python está no PATH
- Instalar Visual Studio C++ Build Tools se houver erro de compilação
- Usar PowerShell ou Git Bash como terminal

#### Linux/Mac
```bash
# Instalar dependências do sistema
sudo apt-get update
sudo apt-get install python3-pip python3-venv

# Para Ubuntu/Debian
sudo apt-get install chromium-browser

# Para Mac com Homebrew
brew install python3 node
```

---

## 📁 Estrutura do Projeto

```
blocopraieira/
├── src/                          # Código fonte Next.js
│   ├── app/                      # App Router
│   │   ├── api/                  # API Routes
│   │   │   ├── donations/        # Endpoint de doações
│   │   │   └── members/          # Endpoint de membros
│   │   ├── admin/                # Painel administrativo
│   │   └── globals.css           # Estilos globais
│   ├── components/               # Componentes React
│   │   ├── Hero.tsx              # Seção principal
│   │   ├── Donations.tsx         # Sistema PIX
│   │   ├── Members.tsx           # Lista de membros
│   │   ├── SocialLinks.tsx       # Redes sociais
│   │   └── AdminDashboard.tsx    # Dashboard admin
│   └── lib/                      # Utilitários
│       └── prisma.ts             # Cliente Prisma
├── automacao-web/                # Automação de testes
│   ├── src/                      # Código fonte Python
│   │   ├── pages/                # Page Object Model
│   │   │   ├── base_page.py      # Classe base
│   │   │   └── home_page.py      # Página inicial
│   │   ├── strategies/           # Estratégias de teste
│   │   │   ├── base_strategy.py  # Interface base
│   │   │   ├── home_page_strategy.py    # Testes homepage
│   │   │   ├── donations_strategy.py    # Testes doações
│   │   │   └── members_strategy.py      # Testes membros
│   │   └── utils/                # Utilitários
│   │       ├── webdriver_factory.py    # Factory WebDriver
│   │       └── logger.py         # Sistema de logs
│   ├── config/                   # Configurações
│   │   └── settings.py           # Configurações centrais
│   ├── reports/                  # Relatórios gerados
│   ├── logs/                     # Logs de execução
│   ├── screenshots/              # Screenshots de falhas
│   ├── demo.py                   # Demo rápido
│   ├── main.py                   # Script principal
│   ├── requirements.txt          # Dependências completas
│   ├── requirements-minimal.txt  # Dependências essenciais
│   └── .env                      # Variáveis de ambiente
├── prisma/                       # Configuração do banco
│   └── schema.prisma             # Schema do banco
├── public/                       # Assets estáticos
├── .env.local                    # Variáveis de ambiente
├── .env.example                  # Exemplo de variáveis
├── package.json                  # Dependências Node.js
├── tailwind.config.ts            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Documentação principal
```

---

## 🎯 Funcionalidades Implementadas

### Site Next.js
- ✅ **Homepage responsiva** com tema dark/neon
- ✅ **Sistema PIX** com chave copiável
- ✅ **Lista de membros** organizados por instrumento
- ✅ **Redes sociais** integradas
- ✅ **API Routes** para doações e membros
- ✅ **Painel administrativo**
- ✅ **Banco de dados** (Prisma + PostgreSQL)

### Automação de Testes
- ✅ **16 testes automatizados** organizados em 3 estratégias
- ✅ **5 padrões de projeto** implementados:
  - Page Object Model (POM)
  - Strategy Pattern
  - Factory Method
  - Singleton Pattern
  - Template Method Pattern
- ✅ **Relatórios** em JSON e Excel
- ✅ **Screenshots** automáticos em falhas
- ✅ **Logs detalhados** com cores
- ✅ **Suporte múltiplos navegadores**
- ✅ **Interface CLI** completa

---

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

---

## 🌟 Próximos Passos

1. **Deploy em produção** (Vercel, Netlify)
2. **CI/CD** com GitHub Actions
3. **Testes de performance**
4. **Monitoramento** em produção
5. **Mais testes de integração**

---

## 📞 Contato e Suporte

**Bloco Praieira**
- 📧 Email: blocopraieira@gmail.com
- 📱 Instagram: @blocopraieira
- 📍 Local: Santo André, ABC Paulista

**Desenvolvimento**
- 🛠️ Stack: Next.js 15 + TypeScript + Python + Selenium
- 🎯 Padrões: Clean Code + Design Patterns
- 📋 Metodologia: TDD + Page Object Model

---

*Desenvolvido com ❤️ para o Bloco Praieira* 🦀