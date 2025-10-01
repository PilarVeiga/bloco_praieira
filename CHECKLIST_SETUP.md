# ✅ Checklist de Setup - Bloco Praieira

Use este checklist para verificar se tudo está configurado corretamente em uma nova máquina.

## 🔍 Verificação Inicial

### Pré-requisitos
- [ ] **Node.js** instalado (versão 18+)
  ```bash
  node --version && npm --version
  ```
- [ ] **Python** instalado (versão 3.8+)
  ```bash
  python --version
  ```
- [ ] **Git** instalado
  ```bash
  git --version
  ```
- [ ] **Chrome** instalado (para automação)

---

## 🌐 Setup do Site Next.js

### Instalação
- [ ] **Repositório clonado**
  ```bash
  git clone <URL_REPO>
  cd blocopraieira
  ```
- [ ] **Dependências instaladas**
  ```bash
  npm install
  ```
- [ ] **Arquivo .env.local configurado**
  ```bash
  cp .env.example .env.local
  # Editar conforme necessário
  ```

### Testes do Site
- [ ] **Build funciona**
  ```bash
  npm run build
  ```
- [ ] **Servidor de desenvolvimento inicia**
  ```bash
  npm run dev
  ```
- [ ] **Site acessível**
  - Abrir: http://localhost:3000
  - Verificar carregamento da página
  - Verificar se aparece "Bloco Praieira"

### Verificações Visuais
- [ ] **Logo/emoji** do caranguejo 🦀 visível
- [ ] **Seção de doações** com chave PIX
- [ ] **Lista de membros** por instrumento
- [ ] **Links sociais** funcionando
- [ ] **Design responsivo** (testar mobile)

---

## 🤖 Setup da Automação

### Ambiente Python
- [ ] **Diretório correto**
  ```bash
  cd blocopraieira/automacao-web
  ```
- [ ] **Ambiente virtual criado** (recomendado)
  ```bash
  python -m venv venv
  # Windows: venv\Scripts\activate
  # Linux/Mac: source venv/bin/activate
  ```
- [ ] **Dependências instaladas**
  ```bash
  pip install -r requirements-minimal.txt
  ```

### Configuração
- [ ] **Arquivo .env configurado**
  ```bash
  # Verificar se BASE_URL está correto
  cat .env | grep BASE_URL
  ```
- [ ] **Conectividade testada**
  ```bash
  python -c "import requests; print('✅ OK' if requests.get('http://localhost:3000').status_code == 200 else '❌ FALHA')"
  ```

### Testes de Automação
- [ ] **Demo funciona**
  ```bash
  python demo.py
  ```
- [ ] **Teste básico por estratégia**
  ```bash
  python main.py --strategy home
  ```
- [ ] **Todos os testes**
  ```bash
  python main.py --strategy all
  ```

---

## 📊 Verificação de Resultados

### Após Execução Bem-sucedida
- [ ] **Logs gerados**
  ```bash
  ls -la logs/
  # Deve ter: automacao_YYYY-MM-DD.log
  ```
- [ ] **Relatórios gerados**
  ```bash
  ls -la reports/
  # Deve ter: test_results_*.json
  ```
- [ ] **Taxa de sucesso** adequada
  ```bash
  # No final dos logs, verificar:
  # ✅ Success rate: 90%+ esperado
  tail logs/automacao_*.log
  ```

### Arquivos Importantes
- [ ] **SETUP_COMPLETO.md** - documentação principal
- [ ] **AUTOMACAO_GUIDE.md** - guia específico da automação
- [ ] **package.json** - dependências Node.js
- [ ] **requirements-minimal.txt** - dependências Python essenciais
- [ ] **.env.local** - configurações do site
- [ ] **automacao-web/.env** - configurações da automação

---

## 🚨 Troubleshooting Rápido

### Site não carrega
```bash
# 1. Verificar porta
netstat -an | findstr :3000

# 2. Matar processo se necessário
# Windows: taskkill /F /PID <PID>
# Linux/Mac: kill -9 <PID>

# 3. Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Automação falha
```bash
# 1. Verificar Python
python --version

# 2. Reinstalar selenium
pip uninstall selenium
pip install selenium==4.15.2

# 3. Limpar cache
find . -name "*.pyc" -delete
find . -name "__pycache__" -type d -exec rm -rf {} +

# 4. Verificar site
curl -I http://localhost:3000
```

### WebDriver problemas
```bash
# 1. Limpar cache webdriver
rm -rf ~/.wdm

# 2. Teste manual
python -c "from selenium import webdriver; driver = webdriver.Chrome(); print('✅ OK'); driver.quit()"

# 3. Instalar manualmente se necessário
# Chrome: https://chromedriver.chromium.org/
```

---

## 📋 Comandos de Referência Rápida

### Site Next.js
```bash
# Desenvolvimento
npm run dev              # Iniciar servidor dev
npm run build            # Build de produção
npm run start            # Servidor produção
npm run lint             # Verificar código

# Banco de dados (se configurado)
npx prisma generate      # Gerar client
npx prisma db push       # Aplicar schema
npx prisma studio        # Interface visual
```

### Automação Python
```bash
# Execução
python demo.py                           # Demo rápido
python main.py --strategy all            # Todos os testes
python main.py --strategy home           # Apenas homepage
python main.py --strategy donations      # Apenas doações
python main.py --strategy members        # Apenas membros

# Opções
--headless                               # Sem interface gráfica
--browser firefox                        # Usar Firefox
--url http://localhost:3001              # URL customizada
--timeout 15                             # Timeout customizado
--verbose                                # Logs detalhados

# Manutenção
find . -name "*.pyc" -delete             # Limpar cache
pip install -r requirements-minimal.txt  # Reinstalar deps
tail -f logs/automacao_*.log             # Acompanhar logs
```

---

## ✅ Checklist Final

### Antes de Entregar/Compartilhar
- [ ] **Todos os testes passando** (taxa de sucesso > 90%)
- [ ] **Documentação atualizada**
- [ ] **Arquivos .env configurados** (sem dados sensíveis)
- [ ] **README.md atualizado**
- [ ] **Dependências documentadas**
- [ ] **Screenshots/vídeos** da execução (se necessário)

### Para Nova Máquina
- [ ] **Seguir SETUP_COMPLETO.md**
- [ ] **Executar este checklist**
- [ ] **Testar em ambiente limpo**
- [ ] **Documentar problemas encontrados**
- [ ] **Atualizar documentação** se necessário

---

## 🎯 Resultado Esperado

Após completar este checklist, você deve ter:

✅ **Site Next.js** rodando em http://localhost:3000  
✅ **16 testes automatizados** executando com sucesso  
✅ **Relatórios JSON** sendo gerados  
✅ **Logs detalhados** com informações claras  
✅ **Screenshots** em caso de falhas  
✅ **Taxa de sucesso** > 90%  

---

## 📞 Suporte

Se algo não estiver funcionando:

1. **Verificar logs** em `logs/automacao_*.log`
2. **Consultar** `AUTOMACAO_GUIDE.md` para detalhes
3. **Executar** troubleshooting específico
4. **Reportar problema** com informações completas

---

*Checklist para o Bloco Praieira* 🦀✅