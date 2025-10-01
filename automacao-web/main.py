"""
Script principal para execução da automação de testes do Bloco Praieira.
Ponto de entrada para executar todos os testes ou testes específicos.
"""
import sys
import argparse
from pathlib import Path

# Adicionar o diretório src ao Python path
sys.path.append(str(Path(__file__).parent / 'src'))

from src.test_executor import TestExecutor
from src.utils.logger import logger
from config.settings import Config

def main():
    """Função principal do script."""
    
    # Configurar argumentos da linha de comando
    parser = argparse.ArgumentParser(
        description="Automação de Testes - Site Bloco Praieira",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos de uso:
  python main.py                          # Executa todos os testes
  python main.py --strategy home          # Executa apenas testes da homepage
  python main.py --strategy donations     # Executa apenas testes de doações
  python main.py --strategy members       # Executa apenas testes de membros
  python main.py --browser firefox        # Usa Firefox em vez de Chrome
  python main.py --headless               # Executa em modo headless
        """
    )
    
    parser.add_argument(
        '--strategy',
        choices=['home', 'donations', 'members'],
        help='Executa apenas uma estratégia específica de testes'
    )
    
    parser.add_argument(
        '--browser',
        choices=['chrome', 'firefox'],
        default='chrome',
        help='Escolhe o navegador para os testes (padrão: chrome)'
    )
    
    parser.add_argument(
        '--headless',
        action='store_true',
        help='Executa os testes em modo headless (sem interface gráfica)'
    )
    
    parser.add_argument(
        '--base-url',
        default='http://localhost:3000',
        help='URL base do site a ser testado (padrão: http://localhost:3000)'
    )
    
    args = parser.parse_args()
    
    # Configurar ambiente
    config = Config()
    
    # Sobrescrever configurações se especificadas
    if args.headless:
        import os
        os.environ['HEADLESS_MODE'] = 'true'
        config._load_config()  # Recarregar configurações
    
    if args.base_url != 'http://localhost:3000':
        import os
        os.environ['BASE_URL'] = args.base_url
        config._load_config()  # Recarregar configurações
    
    # Exibir informações de configuração
    logger.info("🚀 INICIANDO AUTOMAÇÃO DE TESTES - BLOCO PRAIEIRA")
    logger.info("=" * 60)
    logger.info(f"🌐 URL Base: {config.BASE_URL}")
    logger.info(f"🖥️ Navegador: {args.browser.upper()}")
    logger.info(f"👁️ Modo Headless: {'SIM' if config.HEADLESS_MODE else 'NÃO'}")
    logger.info(f"📊 Exportar Excel: {'SIM' if config.EXPORT_EXCEL else 'NÃO'}")
    logger.info(f"📄 Exportar JSON: {'SIM' if config.EXPORT_JSON else 'NÃO'}")
    
    if args.strategy:
        logger.info(f"🎯 Estratégia Específica: {args.strategy.upper()}")
    else:
        logger.info("🧪 Executando TODAS as estratégias")
    
    logger.info("=" * 60)
    
    # Verificar se o site está acessível
    if not check_site_accessibility(config.BASE_URL):
        logger.error(f"❌ Site não acessível em {config.BASE_URL}")
        logger.error("💡 Dica: Certifique-se de que o servidor Next.js esteja rodando com 'npm run dev'")
        return 1
    
    # Executar testes
    executor = TestExecutor(browser_type=args.browser)
    
    try:
        if args.strategy:
            logger.info(f"🎯 Executando estratégia: {args.strategy}")
            result = executor.run_specific_strategy(args.strategy)
        else:
            logger.info("🧪 Executando todas as estratégias")
            result = executor.run_all_tests()
        
        # Verificar se houve erro na execução
        if 'error' in result:
            logger.error(f"❌ Erro na execução: {result['error']}")
            return 1
        
        # Determinar código de saída baseado no sucesso dos testes
        success = result.get('test_summary', {}).get('overall_success', False)
        
        if success:
            logger.info("🎉 TODOS OS TESTES PASSARAM!")
            return 0
        else:
            logger.error("💥 ALGUNS TESTES FALHARAM!")
            return 1
            
    except KeyboardInterrupt:
        logger.warning("⚠️ Execução interrompida pelo usuário")
        return 130
    except Exception as e:
        logger.error(f"❌ Erro inesperado: {str(e)}")
        return 1

def check_site_accessibility(base_url):
    """
    Verifica se o site está acessível antes de executar os testes.
    
    Args:
        base_url (str): URL base do site
        
    Returns:
        bool: True se o site estiver acessível
    """
    logger.info(f"🔍 Verificando acessibilidade do site: {base_url}")
    
    try:
        import requests
        from requests.exceptions import RequestException
        
        response = requests.get(base_url, timeout=10)
        
        if response.status_code == 200:
            logger.info("✅ Site acessível e respondendo")
            return True
        else:
            logger.error(f"❌ Site retornou código: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        logger.error("❌ Não foi possível conectar ao site")
        return False
    except requests.exceptions.Timeout:
        logger.error("❌ Timeout ao acessar o site")
        return False
    except ImportError:
        logger.warning("⚠️ Biblioteca 'requests' não disponível. Pulando verificação de acessibilidade.")
        return True  # Assumir que está acessível se não podemos verificar
    except Exception as e:
        logger.error(f"❌ Erro ao verificar acessibilidade: {str(e)}")
        return False

def print_help_banner():
    """Exibe um banner de ajuda com informações úteis."""
    banner = """
╔══════════════════════════════════════════════════════════════════════════════╗
║                    AUTOMAÇÃO DE TESTES - BLOCO PRAIEIRA                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🎭 Este script automatiza testes do site do Bloco Praieira                ║
║  🎵 Testa funcionalidades como doações PIX, membros e navegação             ║
║                                                                              ║
║  📋 ANTES DE EXECUTAR:                                                      ║
║  1. Certifique-se de que o site esteja rodando em http://localhost:3000     ║
║  2. Execute 'npm run dev' no diretório do projeto Next.js                   ║
║  3. Instale as dependências Python: pip install -r requirements.txt        ║
║                                                                              ║
║  🚀 EXECUÇÃO RÁPIDA:                                                        ║
║  python main.py                    # Todos os testes                        ║
║  python main.py --strategy home    # Apenas homepage                        ║
║  python main.py --headless         # Modo headless                          ║
║                                                                              ║
║  📊 RELATÓRIOS:                                                             ║
║  - logs/     : Arquivos de log detalhados                                   ║
║  - reports/  : Relatórios Excel e JSON                                      ║
║  - screenshots/ : Screenshots de falhas                                     ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
    """
    print(banner)

if __name__ == "__main__":
    # Se executado sem argumentos, mostrar banner de ajuda
    if len(sys.argv) == 1:
        print_help_banner()
        print("💡 Use 'python main.py --help' para ver todas as opções")
        print("🚀 Use 'python main.py' para executar todos os testes")
        print()
        
        # Perguntar se o usuário quer continuar
        try:
            response = input("Deseja executar todos os testes agora? (s/N): ").strip().lower()
            if response in ['s', 'sim', 'y', 'yes']:
                sys.exit(main())
            else:
                print("👋 Execução cancelada pelo usuário")
                sys.exit(0)
        except KeyboardInterrupt:
            print("\n👋 Execução cancelada pelo usuário")
            sys.exit(0)
    else:
        sys.exit(main())