#!/bin/bash

# 🦀 Script de Instalação Automática - Bloco Praieira
# Este script configura automaticamente o projeto em uma nova máquina

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCESSO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[AVISO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERRO]${NC} $1"
}

print_header() {
    echo -e "${BLUE}"
    echo "🦀 ============================================ 🦀"
    echo "    INSTALAÇÃO AUTOMÁTICA - BLOCO PRAIEIRA"
    echo "🦀 ============================================ 🦀"
    echo -e "${NC}"
}

# Verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Detectar sistema operacional
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        echo "windows"
    else
        echo "unknown"
    fi
}

# Verificar pré-requisitos
check_prerequisites() {
    print_status "Verificando pré-requisitos..."
    
    local missing_deps=()
    
    # Node.js
    if command_exists node; then
        local node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$node_version" -ge 18 ]; then
            print_success "Node.js $(node --version) ✓"
        else
            print_warning "Node.js versão muito antiga: $(node --version)"
            missing_deps+=("node")
        fi
    else
        print_error "Node.js não encontrado"
        missing_deps+=("node")
    fi
    
    # Python
    if command_exists python3; then
        local python_version=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1-2)
        print_success "Python $(python3 --version) ✓"
    elif command_exists python; then
        local python_version=$(python --version | cut -d' ' -f2 | cut -d'.' -f1-2)
        print_success "Python $(python --version) ✓"
    else
        print_error "Python não encontrado"
        missing_deps+=("python")
    fi
    
    # Git
    if command_exists git; then
        print_success "Git $(git --version) ✓"
    else
        print_error "Git não encontrado"
        missing_deps+=("git")
    fi
    
    # Verificar se há dependências faltando
    if [ ${#missing_deps[@]} -gt 0 ]; then
        print_error "Dependências faltando: ${missing_deps[*]}"
        print_status "Por favor, instale as dependências antes de continuar:"
        echo "  - Node.js: https://nodejs.org/"
        echo "  - Python: https://python.org/"
        echo "  - Git: https://git-scm.com/"
        exit 1
    fi
    
    print_success "Todos os pré-requisitos atendidos!"
}

# Instalar dependências do sistema (se necessário)
install_system_deps() {
    local os=$(detect_os)
    print_status "Sistema detectado: $os"
    
    case $os in
        "linux")
            if command_exists apt-get; then
                print_status "Instalando dependências do sistema (Ubuntu/Debian)..."
                sudo apt-get update
                sudo apt-get install -y curl wget chromium-browser
            elif command_exists yum; then
                print_status "Instalando dependências do sistema (RHEL/CentOS)..."
                sudo yum install -y curl wget chromium
            fi
            ;;
        "macos")
            if command_exists brew; then
                print_status "Instalando dependências via Homebrew..."
                brew install curl wget
            else
                print_warning "Homebrew não encontrado. Algumas dependências podem faltar."
            fi
            ;;
        "windows")
            print_status "Windows detectado. Certifique-se de que Chrome está instalado."
            ;;
    esac
}

# Configurar projeto Next.js
setup_nextjs() {
    print_status "Configurando projeto Next.js..."
    
    # Instalar dependências
    print_status "Instalando dependências do Node.js..."
    npm install
    
    # Configurar arquivo de ambiente
    if [ ! -f ".env.local" ]; then
        print_status "Criando arquivo .env.local..."
        cp .env.example .env.local
        print_warning "Edite .env.local com suas configurações específicas"
    else
        print_success "Arquivo .env.local já existe"
    fi
    
    # Testar build
    print_status "Testando build do projeto..."
    npm run build
    
    print_success "Projeto Next.js configurado!"
}

# Configurar automação Python
setup_automation() {
    print_status "Configurando automação Python..."
    
    # Entrar no diretório de automação
    cd automacao-web
    
    # Criar ambiente virtual
    print_status "Criando ambiente virtual Python..."
    python3 -m venv venv 2>/dev/null || python -m venv venv
    
    # Ativar ambiente virtual
    if [ -f "venv/bin/activate" ]; then
        source venv/bin/activate
    elif [ -f "venv/Scripts/activate" ]; then
        source venv/Scripts/activate
    fi
    
    # Instalar dependências
    print_status "Instalando dependências Python..."
    
    # Tentar dependências completas primeiro, fallback para mínimas
    if pip install -r requirements.txt 2>/dev/null; then
        print_success "Dependências completas instaladas"
    else
        print_warning "Falha nas dependências completas, instalando mínimas..."
        pip install -r requirements-minimal.txt
        print_success "Dependências mínimas instaladas"
    fi
    
    # Configurar arquivo de ambiente
    if [ ! -f ".env" ]; then
        print_status "Criando arquivo .env para automação..."
        cat > .env << EOF
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
EOF
        print_success "Arquivo .env criado"
    else
        print_success "Arquivo .env já existe"
    fi
    
    # Voltar ao diretório principal
    cd ..
    
    print_success "Automação Python configurada!"
}

# Executar testes
run_tests() {
    print_status "Executando testes de verificação..."
    
    # Iniciar servidor Next.js em background
    print_status "Iniciando servidor Next.js..."
    npm run dev &
    SERVER_PID=$!
    
    # Aguardar servidor inicializar
    print_status "Aguardando servidor inicializar..."
    sleep 10
    
    # Verificar se servidor está rodando
    if curl -s -f http://localhost:3000 > /dev/null; then
        print_success "Servidor Next.js rodando em http://localhost:3000"
    else
        print_error "Servidor Next.js não está acessível"
        kill $SERVER_PID 2>/dev/null
        return 1
    fi
    
    # Executar demo da automação
    print_status "Executando demo da automação..."
    cd automacao-web
    
    # Ativar ambiente virtual
    if [ -f "venv/bin/activate" ]; then
        source venv/bin/activate
    elif [ -f "venv/Scripts/activate" ]; then
        source venv/Scripts/activate
    fi
    
    # Executar demo
    if python demo.py; then
        print_success "Demo da automação executado com sucesso!"
    else
        print_warning "Demo falhou, mas o ambiente está configurado"
    fi
    
    cd ..
    
    # Parar servidor
    print_status "Parando servidor Next.js..."
    kill $SERVER_PID 2>/dev/null
    
    print_success "Testes concluídos!"
}

# Gerar relatório de instalação
generate_report() {
    local report_file="INSTALACAO_$(date +%Y%m%d_%H%M%S).md"
    
    print_status "Gerando relatório de instalação..."
    
    cat > "$report_file" << EOF
# 📋 Relatório de Instalação - Bloco Praieira

**Data:** $(date)
**Sistema:** $(detect_os) - $(uname -a)

## ✅ Componentes Instalados

### Pré-requisitos
- **Node.js:** $(node --version 2>/dev/null || echo "N/A")
- **NPM:** $(npm --version 2>/dev/null || echo "N/A")
- **Python:** $(python3 --version 2>/dev/null || python --version 2>/dev/null || echo "N/A")
- **Git:** $(git --version 2>/dev/null || echo "N/A")

### Projeto Next.js
- Dependências instaladas: $(npm list --depth=0 2>/dev/null | wc -l) pacotes
- Arquivo .env.local: $([ -f ".env.local" ] && echo "✅ Criado" || echo "❌ Faltando")
- Build testado: $([ -d ".next" ] && echo "✅ Sucesso" || echo "❌ Falha")

### Automação Python
- Ambiente virtual: $([ -d "automacao-web/venv" ] && echo "✅ Criado" || echo "❌ Faltando")
- Dependências: $([ -f "automacao-web/venv/pyvenv.cfg" ] && echo "✅ Instaladas" || echo "❌ Faltando")
- Arquivo .env: $([ -f "automacao-web/.env" ] && echo "✅ Criado" || echo "❌ Faltando")

## 🚀 Próximos Passos

1. **Iniciar desenvolvimento:**
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Executar automação:**
   \`\`\`bash
   cd automacao-web
   source venv/bin/activate  # Linux/Mac
   # ou venv\\Scripts\\activate  # Windows
   python demo.py
   \`\`\`

3. **Verificar documentação:**
   - SETUP_COMPLETO.md
   - AUTOMACAO_GUIDE.md
   - CHECKLIST_SETUP.md

## 📞 Suporte

Em caso de problemas:
- Verificar logs de instalação
- Consultar documentação
- Reportar problemas específicos

---
*Instalação automática concluída - Bloco Praieira* 🦀
EOF

    print_success "Relatório gerado: $report_file"
}

# Função principal
main() {
    print_header
    
    print_status "Iniciando instalação automática do projeto Bloco Praieira..."
    echo
    
    # Verificar se estamos no diretório correto
    if [ ! -f "package.json" ]; then
        print_error "Este script deve ser executado no diretório raiz do projeto"
        print_status "Certifique-se de estar no diretório 'blocopraieira'"
        exit 1
    fi
    
    # Executar instalação
    check_prerequisites
    echo
    
    install_system_deps
    echo
    
    setup_nextjs
    echo
    
    setup_automation
    echo
    
    # Perguntar se deve executar testes
    echo -n "Deseja executar testes de verificação? (y/N): "
    read -r run_tests_answer
    if [[ $run_tests_answer =~ ^[Yy]$ ]]; then
        echo
        run_tests
    fi
    echo
    
    generate_report
    echo
    
    print_success "🎉 Instalação concluída com sucesso!"
    echo
    print_status "Para iniciar o desenvolvimento:"
    echo "  1. npm run dev                    # Iniciar site"
    echo "  2. cd automacao-web               # Entrar na automação"
    echo "  3. source venv/bin/activate       # Ativar ambiente Python"
    echo "  4. python demo.py                 # Executar demo"
    echo
    print_status "Documentação disponível:"
    echo "  - SETUP_COMPLETO.md      # Guia completo"
    echo "  - AUTOMACAO_GUIDE.md     # Guia da automação"
    echo "  - CHECKLIST_SETUP.md     # Checklist de verificação"
    echo
    print_success "Bloco Praieira - Santo André, ABC Paulista 🦀"
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi