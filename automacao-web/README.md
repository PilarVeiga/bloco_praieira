# 🦀 Automação Web - Site Bloco Praieira

Este projeto implementa uma suite completa de automação de testes para o site do **Bloco Praieira** usando **Python** e **Selenium**. Os testes verificam funcionalidades como sistema de doações PIX, acordeão de membros por instrumento, navegação e interface responsiva.

## 🏗️ Padrões de Projeto Utilizados

### 1. **Page Object Model (POM)**
- **Localização**: `src/pages/`
- **Função**: Encapsula elementos e ações de cada página em classes específicas
- **Benefícios**: 
  - Manutenibilidade: Mudanças na UI requerem alterações apenas no Page Object
  - Reutilização: Métodos podem ser usados em múltiplos testes
  - Legibilidade: Testes ficam mais limpos e focados na lógica de negócio

**Exemplo:**
```python
class HomePage(BasePage):
    TITLE_ELEMENT = (By.CSS_SELECTOR, "h1 .gradient-text")
    
    def get_main_title(self):
        return self.get_text(self.TITLE_ELEMENT)
```

### 2. **Strategy Pattern**
- **Localização**: `src/strategies/`
- **Função**: Define diferentes algoritmos (estratégias) de teste que podem ser executados independentemente
- **Benefícios**:
  - Flexibilidade: Facilita adição de novas estratégias
  - Isolamento: Cada estratégia é independente
  - Execução seletiva: Pode-se executar estratégias específicas

**Exemplo:**
```python
class HomePageTestStrategy(TestStrategy):
    def execute(self):
        self._test_page_loading()
        self._test_title_and_subtitle()
        # outros testes...
```

### 3. **Factory Method Pattern**
- **Localização**: `src/utils/webdriver_factory.py`
- **Função**: Cria instâncias de WebDriver sem expor a lógica de criação
- **Benefícios**:
  - Abstração: Cliente não precisa conhecer detalhes de criação
  - Flexibilidade: Fácil adição de novos tipos de driver
  - Configuração centralizada: Todas as configurações em um local

**Exemplo:**
```python
class WebDriverFactory:
    @staticmethod
    def create_driver(browser_type="chrome"):
        if browser_type == "chrome":
            return WebDriverFactory._create_chrome_driver()
        elif browser_type == "firefox":
            return WebDriverFactory._create_firefox_driver()
```

### 4. **Singleton Pattern**
- **Localização**: `config/settings.py`, `src/utils/logger.py`
- **Função**: Garante uma única instância de configurações e logger
- **Benefícios**:
  - Consistência: Mesmas configurações em toda aplicação
  - Economia de recursos: Apenas uma instância
  - Acesso global: Fácil acesso às configurações

### 5. **Template Method Pattern**
- **Localização**: `src/strategies/base_strategy.py`
- **Função**: Define o esqueleto de execução de testes, permitindo que subclasses implementem passos específicos
- **Benefícios**:
  - Consistência: Mesmo fluxo para todas as estratégias
  - Extensibilidade: Fácil criação de novas estratégias
  - Reutilização: Código comum compartilhado

## 📁 Estrutura do Projeto

```
automacao-web/
├── config/
│   └── settings.py              # Configurações centralizadas (Singleton)
├── src/
│   ├── pages/                   # Page Object Model
│   │   ├── base_page.py        # Classe base para todas as páginas
│   │   ├── home_page.py        # Page Object da homepage
│   │   ├── donations_page.py   # Page Object da seção de doações
│   │   └── members_page.py     # Page Object da seção de membros
│   ├── strategies/              # Strategy Pattern
│   │   ├── base_strategy.py    # Interface base para estratégias
│   │   ├── home_page_strategy.py   # Estratégia de testes da homepage
│   │   ├── donations_strategy.py  # Estratégia de testes de doações
│   │   └── members_strategy.py    # Estratégia de testes de membros
│   ├── utils/                   # Utilitários
│   │   ├── logger.py           # Sistema de logging (Singleton)
│   │   └── webdriver_factory.py # Factory para WebDrivers
│   └── test_executor.py        # Executor principal (Context)
├── logs/                        # Arquivos de log gerados
├── reports/                     # Relatórios Excel/JSON gerados
├── screenshots/                 # Screenshots de falhas
├── main.py                     # Script principal de execução
├── requirements.txt            # Dependências Python
├── .env.example               # Exemplo de configuração
├── .env                       # Configurações locais
└── README.md                  # Este arquivo
```

## 🚀 Instalação

### Pré-requisitos
- **Python 3.8+**
- **Google Chrome** ou **Firefox**
- **Site do Bloco Praieira** rodando em `http://localhost:3000`

### 1. Clone o Repositório
```bash
cd blocopraieira/automacao-web
```

### 2. Crie um Ambiente Virtual (Recomendado)
```bash
python -m venv venv

# Windows
venv\\Scripts\\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Instale as Dependências
```bash
pip install -r requirements.txt
```

### 4. Configure o Ambiente
```bash
# Copie o arquivo de configuração
cp .env.example .env

# Edite as configurações conforme necessário
# O arquivo .env já está configurado para uso local
```

### 5. Certifique-se de que o Site Esteja Rodando
```bash
# No diretório do projeto Next.js
cd ../
npm run dev

# Verificar se está acessível em http://localhost:3000
```

## 🏃‍♂️ Como Executar

### Execução Básica

```bash
# Executar todos os testes
python main.py

# Executar com ajuda
python main.py --help
```

### Execução de Estratégias Específicas

```bash
# Testar apenas a homepage
python main.py --strategy home

# Testar apenas a seção de doações
python main.py --strategy donations

# Testar apenas a seção de membros
python main.py --strategy members
```

### Opções Avançadas

```bash
# Usar Firefox em vez de Chrome
python main.py --browser firefox

# Executar em modo headless (sem interface gráfica)
python main.py --headless

# Testar em URL diferente
python main.py --base-url http://localhost:3001

# Combinando opções
python main.py --strategy donations --browser firefox --headless
```

### Exemplos Práticos

```bash
# Desenvolvimento: todos os testes com Chrome visível
python main.py

# CI/CD: todos os testes em modo headless
python main.py --headless

# Debug: apenas homepage com Firefox
python main.py --strategy home --browser firefox

# Teste rápido de doações
python main.py --strategy donations
```

## 📊 Verificando Logs e Relatórios

### 1. Logs em Tempo Real
Os logs são exibidos no terminal durante a execução com cores e emojis para fácil identificação:

```
🧪 INICIANDO TESTE: HomePage Tests
🔧 AÇÃO: Navegando para: http://localhost:3000/
✅ Página carregada: Bloco Praieira - Carnaval de Rua ABC Paulista
🔍 VERIFICAÇÃO: Verificando se a página inicial carregou
✅ TESTE PASSOU: Page Loading - Página inicial carregada corretamente
```

### 2. Arquivos de Log
- **Localização**: `logs/automacao_YYYYMMDD_HHMMSS.log`
- **Conteúdo**: Log completo com timestamps
- **Formato**: Texto simples com níveis de log (INFO, ERROR, DEBUG)

**Exemplo de visualização:**
```bash
# Ver o último log gerado
ls -la logs/

# Monitorar log em tempo real (Linux/Mac)
tail -f logs/automacao_*.log

# Ver log específico
cat logs/automacao_20250929_143022.log
```

### 3. Relatórios Excel
- **Localização**: `reports/relatorio_testes_YYYYMMDD_HHMMSS.xlsx`
- **Conteúdo**: 
  - Aba "Resumo": Métricas consolidadas
  - Aba "Testes Detalhados": Resultado de cada teste individual
- **Uso**: Análise detalhada e compartilhamento de resultados

### 4. Relatórios JSON
- **Localização**: `reports/relatorio_testes_YYYYMMDD_HHMMSS.json`
- **Conteúdo**: Dados estruturados para integração com outras ferramentas
- **Uso**: Automação, dashboards, análise programática

**Exemplo de estrutura JSON:**
```json
{
  "execution_summary": {
    "start_time": "2025-09-29 14:30:22",
    "end_time": "2025-09-29 14:32:15",
    "execution_time_seconds": 113.5,
    "browser_used": "chrome",
    "base_url": "http://localhost:3000"
  },
  "test_summary": {
    "total_tests": 15,
    "total_passed": 14,
    "total_failed": 1,
    "success_rate": 93.3,
    "overall_success": false
  }
}
```

### 5. Screenshots de Falhas
- **Localização**: `screenshots/failure_TESTNAME_YYYYMMDD_HHMMSS.png`
- **Quando são criados**: Automaticamente quando um teste falha
- **Uso**: Debug visual de problemas na interface

## 🧪 Testes Implementados

### Homepage Tests (`home_page_strategy.py`)
- ✅ **Page Loading**: Verifica carregamento e elementos principais
- ✅ **Title and Subtitle**: Valida título "Bloco Praieira" e subtítulo
- ✅ **History Card**: Verifica informações sobre fundação em 2021
- ✅ **Mission Card**: Valida informações sobre 30 integrantes
- ✅ **Support Button**: Testa presença do botão "Apoie o Bloco"
- ✅ **Navigation to Donations**: Verifica navegação para seção PIX

### Donations Tests (`donations_strategy.py`)
- ✅ **Donations Section Visibility**: Verifica todos os elementos da seção
- ✅ **PIX Key Display**: Valida exibição da chave `blocopraieira@gmail.com`
- ✅ **QR Code Generation**: Testa geração do QR Code PIX
- ✅ **Copy PIX Functionality**: Verifica funcionalidade de copiar chave
- ✅ **Instructions Presence**: Valida instruções passo-a-passo

### Members Tests (`members_strategy.py`)
- ✅ **Members Section Visibility**: Verifica elementos da seção
- ✅ **All Instruments Present**: Valida 7 instrumentos (Mestres, Harmonia, etc.)
- ✅ **Accordion Functionality**: Testa expandir/colapsar acordeão
- ✅ **Members Count Consistency**: Verifica contagem de membros por instrumento
- ✅ **Join CTA**: Testa call-to-action "Entrar em Contato"

## 🛠️ Configurações Avançadas

### Arquivo .env
Personalize o comportamento dos testes editando `.env`:

```bash
# Configurações do WebDriver
WEBDRIVER_TIMEOUT=15              # Timeout para elementos (segundos)
IMPLICIT_WAIT=8                   # Espera implícita (segundos)
PAGE_LOAD_TIMEOUT=45              # Timeout de carregamento de página

# URL do site
BASE_URL=http://localhost:3000    # URL base para testes

# Configurações de teste
MAX_WAIT_ELEMENTS=12              # Tempo máximo para aguardar elementos
SCREENSHOT_ON_FAILURE=true        # Capturar screenshots em falhas

# Configurações de relatórios
EXPORT_EXCEL=true                 # Gerar relatórios Excel
EXPORT_JSON=true                  # Gerar relatórios JSON

# Configurações de logging
LOG_LEVEL=INFO                    # Nível de log (DEBUG, INFO, WARNING, ERROR)
LOG_TO_FILE=true                  # Salvar logs em arquivo

# Configurações do navegador
HEADLESS_MODE=false               # Modo headless
BROWSER_WIDTH=1920                # Largura da janela
BROWSER_HEIGHT=1080               # Altura da janela
```

### Personalizando Estratégias

Para criar uma nova estratégia de teste:

1. **Crie uma nova classe** em `src/strategies/`:
```python
from src.strategies.base_strategy import TestStrategy

class MinhaNovaStrategy(TestStrategy):
    def execute(self):
        # Implementar testes específicos
        pass
```

2. **Adicione ao executor** em `src/test_executor.py`:
```python
strategies = [
    ("HomePage", HomePageTestStrategy(self.driver)),
    ("MinhaEstrategia", MinhaNovaStrategy(self.driver))
]
```

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Erro "Site não acessível"
```bash
❌ Site não acessível em http://localhost:3000
💡 Dica: Certifique-se de que o servidor Next.js esteja rodando com 'npm run dev'
```
**Solução**: 
- Verificar se o site está rodando: `curl http://localhost:3000`
- Iniciar o servidor: `npm run dev` no diretório do projeto Next.js

#### 2. WebDriver não encontrado
```bash
❌ Erro na configuração: Message: 'chromedriver' executable needs to be in PATH
```
**Solução**: 
- A biblioteca `webdriver-manager` baixa automaticamente os drivers
- Certifique-se de ter Chrome ou Firefox instalado
- Para forçar download: `pip install webdriver-manager --upgrade`

#### 3. Timeout em elementos
```bash
❌ Timeout ao aguardar elemento: (By.ID, "donations")
```
**Solução**:
- Aumentar `WEBDRIVER_TIMEOUT` no `.env`
- Verificar se o elemento existe na página
- Usar modo não-headless para debug visual

#### 4. Falhas intermitentes
```bash
❌ TESTE FALHOU: QR Code Generation - QR Code não foi gerado
```
**Solução**:
- Aumentar timeouts no `.env`
- Verificar performance do sistema
- Executar testes individuais para isolar problema

### Debug Avançado

#### Modo Debug Visual
```bash
# Executar sem headless para ver o que está acontecendo
python main.py --strategy donations

# Usar Firefox para comparar comportamento
python main.py --browser firefox
```

#### Logs Detalhados
```bash
# Ativar logs de debug no .env
LOG_LEVEL=DEBUG

# Executar e monitorar logs
python main.py --strategy home 2>&1 | tee debug.log
```

#### Screenshots Manuais
```python
# Adicionar em qualquer Page Object
screenshot_path = self.take_screenshot("debug_momento")
print(f"Screenshot salvo em: {screenshot_path}")
```

## 📈 Métricas e KPIs

### Métricas Coletadas
- **Taxa de Sucesso**: Percentual de testes aprovados
- **Tempo de Execução**: Duração total dos testes
- **Cobertura de Funcionalidades**: Número de funcionalidades testadas
- **Estabilidade**: Consistência dos resultados entre execuções

### Relatório de Exemplo
```
📊 RESUMO FINAL DOS TESTES
═══════════════════════════════════════════════════════════
🧪 Total de Testes: 15
✅ Testes Aprovados: 14
❌ Testes Falharam: 1
📈 Taxa de Sucesso: 93.3%
🎯 Sucesso Geral: NÃO
⏱️ Tempo de Execução: 113.5s
═══════════════════════════════════════════════════════════
```

## 🤝 Contribuição

### Adicionando Novos Testes

1. **Page Objects**: Adicione elementos em `src/pages/`
2. **Estratégias**: Implemente lógica de teste em `src/strategies/`
3. **Executor**: Registre nova estratégia em `src/test_executor.py`

### Melhorias Sugeridas

- **Testes de Performance**: Medir tempos de carregamento
- **Testes Mobile**: Simular dispositivos móveis
- **Testes de Acessibilidade**: Verificar WCAG compliance
- **Integração CI/CD**: Executar automaticamente em deploys

## 📄 Licença

Este projeto está sob licença MIT. Desenvolvido para automatizar testes do site do **Bloco Praieira** - Carnaval de Rua do ABC Paulista.

---

**Desenvolvido com ❤️ para garantir qualidade do site do Bloco Praieira** 🦀  
**Automação de Testes © 2025** • Santo André, ABC Paulista