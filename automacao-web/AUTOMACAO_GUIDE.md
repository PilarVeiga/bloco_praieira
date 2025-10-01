# 🤖 Automação de Testes - Bloco Praieira

Guia específico para configurar e executar a automação de testes do projeto Bloco Praieira.

## 📋 Visão Geral

A automação implementa **5 padrões de projeto profissionais** e executa **16 testes automatizados** organizados em 3 estratégias diferentes.

### 🏗️ Padrões Implementados

1. **Page Object Model (POM)** - Encapsulamento de elementos da página
2. **Strategy Pattern** - Diferentes estratégias de teste
3. **Factory Method** - Criação de WebDrivers
4. **Singleton Pattern** - Configurações centralizadas
5. **Template Method** - Estrutura base para testes

### 🧪 Testes Automatizados

- **Homepage**: 6 testes (carregamento, título, hero, navegação, social, responsivo)
- **Doações**: 5 testes (seção PIX, chave, botão copiar, QR code, instruções)
- **Membros**: 5 testes (seção, instrumentos, acordeão, informações, contato)

---

## ⚡ Quick Start

### 1. Pré-requisitos
```bash
# Verificar Python
python --version  # >= 3.8

# Verificar se o site está rodando
curl -I http://localhost:3000
```

### 2. Instalação Rápida
```bash
# Entrar na pasta de automação
cd blocopraieira/automacao-web

# Instalar dependências mínimas
pip install selenium==4.15.2 webdriver-manager==4.0.1 requests==2.32.3 python-dotenv==1.0.0 colorama==0.4.6

# Executar demo
python demo.py
```

### 3. Execução Básica
```bash
# Demo rápido (5 testes essenciais)
python demo.py

# Todos os testes (16 testes)
python main.py --strategy all

# Testes por seção
python main.py --strategy home      # Homepage
python main.py --strategy donations # Doações PIX
python main.py --strategy members   # Membros
```

---

## 🔧 Configuração Detalhada

### Estrutura de Arquivos
```
automacao-web/
├── src/
│   ├── pages/                    # Page Object Model
│   │   ├── base_page.py          # ✅ Classe base com utilitários
│   │   └── home_page.py          # ✅ Página inicial do site
│   ├── strategies/               # Strategy Pattern
│   │   ├── base_strategy.py      # ✅ Interface base para estratégias
│   │   ├── home_page_strategy.py # ✅ 6 testes da homepage
│   │   ├── donations_strategy.py # ✅ 5 testes de doações
│   │   └── members_strategy.py   # ✅ 5 testes de membros
│   ├── utils/                    # Utilitários
│   │   ├── webdriver_factory.py  # ✅ Factory Method para WebDrivers
│   │   └── logger.py             # ✅ Sistema de logging colorido
│   └── test_executor.py          # ✅ Executor principal (Context)
├── config/
│   └── settings.py               # ✅ Singleton para configurações
├── reports/                      # Relatórios JSON/Excel gerados
├── logs/                         # Logs detalhados por data
├── screenshots/                  # Screenshots automáticos de falhas
├── demo.py                       # ✅ Script de demonstração
├── main.py                       # ✅ Script principal com CLI
├── requirements.txt              # Dependências completas
├── requirements-minimal.txt      # Dependências essenciais
└── .env                          # Configurações de ambiente
```

### Arquivo .env
```env
# URL do site (ajustar conforme porta do Next.js)
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

# Dados específicos do Bloco Praieira
TEST_PIX_KEY=blocopraieira@gmail.com
TEST_INSTAGRAM=@blocopraieira
TEST_LOCATION=Santo André
```

---

## 🚀 Comandos de Execução

### Demo e Testes Rápidos
```bash
# Demo com 5 testes essenciais
python demo.py

# Verificar apenas conectividade
python -c "import requests; print('✅ Site acessível' if requests.get('http://localhost:3000').status_code == 200 else '❌ Site inacessível')"
```

### Testes por Estratégia
```bash
# Homepage (6 testes)
python main.py --strategy home

# Doações PIX (5 testes)
python main.py --strategy donations

# Membros (5 testes)
python main.py --strategy members

# Todos (16 testes)
python main.py --strategy all
```

### Opções Avançadas
```bash
# Modo headless (sem interface gráfica)
python main.py --strategy all --headless

# Usar Firefox em vez de Chrome
python main.py --strategy all --browser firefox

# Usar Edge
python main.py --strategy all --browser edge

# URL personalizada
python main.py --strategy all --url http://localhost:3001

# Timeout personalizado
python main.py --strategy all --timeout 15

# Modo verboso
python main.py --strategy all --verbose
```

### Combinações Úteis
```bash
# Execução silenciosa para CI/CD
python main.py --strategy all --headless --browser chrome

# Teste completo com Firefox
python main.py --strategy all --browser firefox --verbose

# Teste rápido sem screenshots
SCREENSHOT_ON_FAILURE=false python main.py --strategy home
```

---

## 📊 Relatórios e Logs

### Arquivos Gerados

1. **Relatórios JSON**
   ```bash
   # Localização
   reports/test_results_YYYY-MM-DD_HH-MM-SS.json
   
   # Visualizar último relatório
   cat reports/test_results_*.json | tail -1 | python -m json.tool
   ```

2. **Relatórios Excel** (se pandas instalado)
   ```bash
   # Localização
   reports/test_results_YYYY-MM-DD_HH-MM-SS.xlsx
   ```

3. **Logs Detalhados**
   ```bash
   # Localização
   logs/automacao_YYYY-MM-DD.log
   
   # Acompanhar em tempo real
   tail -f logs/automacao_*.log
   ```

4. **Screenshots de Falhas**
   ```bash
   # Localização
   screenshots/failure_<test_name>_YYYY-MM-DD_HH-MM-SS.png
   ```

### Estrutura dos Relatórios

```json
{
  "execution_summary": {
    "total_tests": 16,
    "passed_tests": 14,
    "failed_tests": 2,
    "success_rate": 87.5,
    "execution_time": "00:02:34",
    "overall_success": false
  },
  "strategy_results": [
    {
      "strategy_name": "HomePage",
      "total_tests": 6,
      "passed_tests": 6,
      "failed_tests": 0,
      "success_rate": 100.0,
      "overall_success": true,
      "detailed_results": [...]
    }
  ],
  "test_environment": {
    "browser": "chrome",
    "headless": false,
    "base_url": "http://localhost:3000",
    "timestamp": "2025-09-30 19:45:00"
  }
}
```

---

## 🔍 Debugging e Troubleshooting

### Problemas Comuns

#### 1. Site não acessível
```bash
# Verificar se Next.js está rodando
curl -I http://localhost:3000

# Verificar porta em uso
netstat -an | findstr :3000
# ou
lsof -i :3000

# Verificar logs do Next.js
npm run dev
```

#### 2. WebDriver não encontrado
```bash
# Reinstalar webdriver-manager
pip uninstall webdriver-manager
pip install webdriver-manager==4.0.1

# Limpar cache
rm -rf ~/.wdm

# Instalar manualmente
# Chrome: https://chromedriver.chromium.org/
# Firefox: https://github.com/mozilla/geckodriver/releases
```

#### 3. Timeout nos testes
```bash
# Aumentar timeout
python main.py --strategy all --timeout 20

# Ou editar .env
echo "WEBDRIVER_TIMEOUT=20" >> .env
```

#### 4. Elementos não encontrados
```bash
# Executar em modo não-headless para debug
python main.py --strategy home --browser chrome

# Verificar logs detalhados
cat logs/automacao_*.log | grep "ERROR"

# Executar demo para teste básico
python demo.py
```

### Debug Avançado

#### Executar teste individual
```python
# Exemplo: testar apenas carregamento da homepage
import sys
sys.path.append('src')

from src.utils.webdriver_factory import WebDriverFactory
from src.strategies.home_page_strategy import HomePageTestStrategy

factory = WebDriverFactory()
driver = factory.create_driver('chrome')

strategy = HomePageTestStrategy(driver)
result = strategy.test_page_loads()
print(result)

driver.quit()
```

#### Logs em tempo real
```bash
# Terminal 1: Executar testes
python main.py --strategy all --verbose

# Terminal 2: Acompanhar logs
tail -f logs/automacao_$(date +%Y-%m-%d).log
```

#### Screenshots manuais
```python
# Adicionar no código para debug
from src.pages.base_page import BasePage
base_page = BasePage(driver)
base_page.take_screenshot("debug_screenshot")
```

---

## 🧪 Testes Detalhados

### Homepage Strategy (6 testes)

1. **test_page_loads**
   - Verifica carregamento da página principal
   - Aguarda elemento `<main>` estar presente
   - Verifica erros JavaScript críticos

2. **test_title_is_correct**
   - Verifica se título contém "Bloco Praieira"
   - Valida metadata da página

3. **test_hero_section_present**
   - Procura emoji do caranguejo 🦀
   - Verifica texto "Bloco Praieira"
   - Identifica cards informativos

4. **test_navigation_links**
   - Encontra links e botões funcionais
   - Verifica atributos href e onclick
   - Testa clicabilidade

5. **test_social_links**
   - Procura referências ao Instagram
   - Verifica email blocopraieira@gmail.com
   - Identifica localização "Santo André"

6. **test_responsive_elements**
   - Testa resolução mobile (375x667)
   - Testa resolução tablet (768x1024)
   - Verifica visibilidade em diferentes tamanhos

### Donations Strategy (5 testes)

1. **test_donations_section_present**
   - Procura indicadores: PIX, doação, doar, contribuir
   - Verifica presença da seção de doações

2. **test_pix_key_visible**
   - Verifica se "blocopraieira@gmail.com" está visível
   - Testa exibição da chave PIX

3. **test_pix_key_copyable**
   - Procura botões de copiar
   - Testa funcionalidade de cópia
   - Verifica selecionabilidade da chave

4. **test_qr_code_present**
   - Procura elementos de QR Code
   - Verifica imagens, canvas, SVG
   - Identifica QR codes por atributos

5. **test_donation_instructions**
   - Procura instruções de doação
   - Verifica texto explicativo
   - Identifica elementos de lista/passos

### Members Strategy (5 testes)

1. **test_members_section_present**
   - Procura indicadores: membros, integrantes, músicos
   - Verifica presença da seção de membros

2. **test_instruments_listed**
   - Procura instrumentos: Mestres, Harmonia, Caixa, etc.
   - Verifica lista de instrumentos do bloco

3. **test_accordion_functionality**
   - Testa elementos collapse/accordion
   - Verifica clicabilidade e mudança de estado
   - Testa atributo aria-expanded

4. **test_member_information**
   - Procura nomes de membros
   - Verifica listas estruturadas
   - Identifica informações de contato

5. **test_contact_information**
   - Verifica email, Instagram, localização
   - Testa links de contato
   - Valida informações do bloco

---

## 📈 Métricas e Performance

### Tempo de Execução Típico
- **Demo**: ~30 segundos
- **Strategy home**: ~45 segundos
- **Strategy donations**: ~35 segundos
- **Strategy members**: ~40 segundos
- **Todos os testes**: ~2-3 minutos

### Taxa de Sucesso Esperada
- **Ambiente local**: 95-100%
- **CI/CD**: 90-95%
- **Produção**: 85-90%

### Recursos Utilizados
- **RAM**: ~200-400MB (Chrome)
- **CPU**: ~10-20% (durante execução)
- **Disco**: ~50MB (logs + screenshots)

---

## 🌟 Recursos Avançados

### Integração CI/CD
```yaml
# Exemplo GitHub Actions
name: Automação Testes
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - run: npm install && npm run build
      - run: npm run dev &
      - run: cd automacao-web && pip install -r requirements-minimal.txt
      - run: cd automacao-web && python main.py --strategy all --headless
```

### Execução Paralela
```bash
# Executar estratégias em paralelo
python main.py --strategy home &
python main.py --strategy donations &
python main.py --strategy members &
wait
```

### Monitoramento Contínuo
```bash
# Script para execução periódica
#!/bin/bash
while true; do
  python main.py --strategy all --headless
  sleep 3600  # Executar a cada hora
done
```

---

## 📞 Suporte

### Reportar Problemas
1. Verificar logs em `logs/automacao_*.log`
2. Incluir informações do ambiente:
   - Sistema operacional
   - Versão Python
   - Versão navegador
   - URL sendo testada

### Contribuir
1. Fork do repositório
2. Criar branch para feature
3. Seguir padrões de código existentes
4. Adicionar testes para novas funcionalidades
5. Submeter Pull Request

---

*Automação desenvolvida com ❤️ para o Bloco Praieira* 🦀🤖