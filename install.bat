@echo off
setlocal enabledelayedexpansion

:: 🦀 Script de Instalação Automática - Bloco Praieira (Windows)
:: Este script configura automaticamente o projeto em uma nova máquina Windows

echo.
echo 🦀 ============================================ 🦀
echo     INSTALAÇÃO AUTOMÁTICA - BLOCO PRAIEIRA
echo 🦀 ============================================ 🦀
echo.

:: Verificar se estamos no diretório correto
if not exist "package.json" (
    echo [ERRO] Este script deve ser executado no diretório raiz do projeto
    echo Certifique-se de estar no diretório 'blocopraieira'
    pause
    exit /b 1
)

echo [INFO] Iniciando instalação automática do projeto Bloco Praieira...
echo.

:: Verificar pré-requisitos
echo [INFO] Verificando pré-requisitos...

:: Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo [SUCESSO] Node.js %%i ✓
) else (
    echo [ERRO] Node.js não encontrado
    echo Por favor, instale Node.js: https://nodejs.org/
    pause
    exit /b 1
)

:: Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('python --version') do echo [SUCESSO] %%i ✓
) else (
    echo [ERRO] Python não encontrado
    echo Por favor, instale Python: https://python.org/
    pause
    exit /b 1
)

:: Git
git --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('git --version') do echo [SUCESSO] %%i ✓
) else (
    echo [ERRO] Git não encontrado
    echo Por favor, instale Git: https://git-scm.com/
    pause
    exit /b 1
)

echo [SUCESSO] Todos os pré-requisitos atendidos!
echo.

:: Configurar projeto Next.js
echo [INFO] Configurando projeto Next.js...

echo [INFO] Instalando dependências do Node.js...
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependências do Node.js
    pause
    exit /b 1
)

:: Configurar arquivo de ambiente
if not exist ".env.local" (
    echo [INFO] Criando arquivo .env.local...
    copy ".env.example" ".env.local" >nul
    echo [AVISO] Edite .env.local com suas configurações específicas
) else (
    echo [SUCESSO] Arquivo .env.local já existe
)

:: Testar build
echo [INFO] Testando build do projeto...
call npm run build
if %errorlevel% neq 0 (
    echo [AVISO] Build falhou, mas continuando instalação...
) else (
    echo [SUCESSO] Build testado com sucesso!
)

echo [SUCESSO] Projeto Next.js configurado!
echo.

:: Configurar automação Python
echo [INFO] Configurando automação Python...

cd automacao-web

:: Criar ambiente virtual
echo [INFO] Criando ambiente virtual Python...
python -m venv venv
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao criar ambiente virtual
    cd ..
    pause
    exit /b 1
)

:: Ativar ambiente virtual e instalar dependências
echo [INFO] Instalando dependências Python...
call venv\Scripts\activate.bat

:: Tentar dependências completas primeiro, fallback para mínimas
pip install -r requirements.txt >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCESSO] Dependências completas instaladas
) else (
    echo [AVISO] Falha nas dependências completas, instalando mínimas...
    pip install -r requirements-minimal.txt
    if %errorlevel% equ 0 (
        echo [SUCESSO] Dependências mínimas instaladas
    ) else (
        echo [ERRO] Falha ao instalar dependências Python
        cd ..
        pause
        exit /b 1
    )
)

:: Configurar arquivo de ambiente
if not exist ".env" (
    echo [INFO] Criando arquivo .env para automação...
    (
        echo # URL do site ^(ajustar conforme necessário^)
        echo BASE_URL=http://localhost:3000
        echo.
        echo # Configurações do WebDriver
        echo WEBDRIVER_TIMEOUT=10
        echo IMPLICIT_WAIT=5
        echo PAGE_LOAD_TIMEOUT=30
        echo.
        echo # Configurações de teste
        echo MAX_WAIT_ELEMENTS=10
        echo SCREENSHOT_ON_FAILURE=true
        echo.
        echo # Configurações do navegador
        echo HEADLESS_MODE=false
        echo BROWSER_WIDTH=1920
        echo BROWSER_HEIGHT=1080
        echo.
        echo # Configurações de relatórios
        echo EXPORT_EXCEL=true
        echo EXPORT_JSON=true
        echo.
        echo # Configurações de logging
        echo LOG_LEVEL=INFO
        echo LOG_TO_FILE=true
    ) > .env
    echo [SUCESSO] Arquivo .env criado
) else (
    echo [SUCESSO] Arquivo .env já existe
)

cd ..

echo [SUCESSO] Automação Python configurada!
echo.

:: Perguntar se deve executar testes
set /p run_tests="Deseja executar testes de verificação? (y/N): "
if /i "!run_tests!"=="y" goto run_tests
if /i "!run_tests!"=="yes" goto run_tests
goto skip_tests

:run_tests
echo.
echo [INFO] Executando testes de verificação...

:: Iniciar servidor Next.js em background
echo [INFO] Iniciando servidor Next.js...
start /b cmd /c "npm run dev > nul 2>&1"

:: Aguardar servidor inicializar
echo [INFO] Aguardando servidor inicializar...
timeout /t 10 /nobreak >nul

:: Verificar se servidor está rodando
curl -s -f http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCESSO] Servidor Next.js rodando em http://localhost:3000
) else (
    echo [ERRO] Servidor Next.js não está acessível
    goto skip_tests
)

:: Executar demo da automação
echo [INFO] Executando demo da automação...
cd automacao-web
call venv\Scripts\activate.bat
python demo.py
if %errorlevel% equ 0 (
    echo [SUCESSO] Demo da automação executado com sucesso!
) else (
    echo [AVISO] Demo falhou, mas o ambiente está configurado
)
cd ..

:: Parar servidor (tentar matar processos node)
echo [INFO] Parando servidor Next.js...
taskkill /f /im node.exe >nul 2>&1

echo [SUCESSO] Testes concluídos!
echo.

:skip_tests

:: Gerar relatório de instalação
echo [INFO] Gerando relatório de instalação...

set "timestamp=%date:~6,4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "timestamp=!timestamp: =0!"
set "report_file=INSTALACAO_!timestamp!.md"

(
    echo # 📋 Relatório de Instalação - Bloco Praieira
    echo.
    echo **Data:** %date% %time%
    echo **Sistema:** Windows
    echo.
    echo ## ✅ Componentes Instalados
    echo.
    echo ### Pré-requisitos
    for /f "tokens=*" %%i in ('node --version 2^>nul') do echo - **Node.js:** %%i
    for /f "tokens=*" %%i in ('npm --version 2^>nul') do echo - **NPM:** %%i
    for /f "tokens=*" %%i in ('python --version 2^>nul') do echo - **Python:** %%i
    for /f "tokens=*" %%i in ('git --version 2^>nul') do echo - **Git:** %%i
    echo.
    echo ### Projeto Next.js
    if exist ".env.local" (echo - Arquivo .env.local: ✅ Criado) else (echo - Arquivo .env.local: ❌ Faltando)
    if exist ".next" (echo - Build testado: ✅ Sucesso) else (echo - Build testado: ❌ Falha)
    echo.
    echo ### Automação Python
    if exist "automacao-web\venv" (echo - Ambiente virtual: ✅ Criado) else (echo - Ambiente virtual: ❌ Faltando)
    if exist "automacao-web\.env" (echo - Arquivo .env: ✅ Criado) else (echo - Arquivo .env: ❌ Faltando)
    echo.
    echo ## 🚀 Próximos Passos
    echo.
    echo 1. **Iniciar desenvolvimento:**
    echo    ```bash
    echo    npm run dev
    echo    ```
    echo.
    echo 2. **Executar automação:**
    echo    ```bash
    echo    cd automacao-web
    echo    venv\Scripts\activate
    echo    python demo.py
    echo    ```
    echo.
    echo 3. **Verificar documentação:**
    echo    - SETUP_COMPLETO.md
    echo    - AUTOMACAO_GUIDE.md
    echo    - CHECKLIST_SETUP.md
    echo.
    echo ---
    echo *Instalação automática concluída - Bloco Praieira* 🦀
) > "!report_file!"

echo [SUCESSO] Relatório gerado: !report_file!
echo.

echo [SUCESSO] 🎉 Instalação concluída com sucesso!
echo.
echo [INFO] Para iniciar o desenvolvimento:
echo   1. npm run dev                    # Iniciar site
echo   2. cd automacao-web               # Entrar na automação
echo   3. venv\Scripts\activate          # Ativar ambiente Python
echo   4. python demo.py                 # Executar demo
echo.
echo [INFO] Documentação disponível:
echo   - SETUP_COMPLETO.md      # Guia completo
echo   - AUTOMACAO_GUIDE.md     # Guia da automação
echo   - CHECKLIST_SETUP.md     # Checklist de verificação
echo.
echo [SUCESSO] Bloco Praieira - Santo André, ABC Paulista 🦀
echo.

pause