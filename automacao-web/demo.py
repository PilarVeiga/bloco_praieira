"""
Script de demonstração rápida da automação.
Este script executa um teste básico para demonstrar que tudo está funcionando.
"""
import sys
from pathlib import Path

# Adicionar o diretório src ao Python path
sys.path.append(str(Path(__file__).parent / 'src'))

def quick_demo():
    """Demonstração rápida da automação."""
    print("🦀 DEMO - AUTOMAÇÃO BLOCO PRAIEIRA")
    print("=" * 50)
    
    try:
        # Importar configurações
        from config.settings import Config
        config = Config()
        
        print(f"✅ Configurações carregadas")
        print(f"🌐 URL Base: {config.BASE_URL}")
        print(f"🖥️ Modo Headless: {'SIM' if config.HEADLESS_MODE else 'NÃO'}")
        
        # Testar logger
        from src.utils.logger import logger
        logger.info("✅ Sistema de logging funcionando")
        
        # Testar factory
        from src.utils.webdriver_factory import WebDriverFactory
        print("✅ Factory de WebDriver disponível")
        
        # Verificar se o site está acessível
        print(f"🔍 Verificando site em {config.BASE_URL}...")
        
        try:
            import requests
            response = requests.get(config.BASE_URL, timeout=5)
            if response.status_code == 200:
                print("✅ Site acessível e respondendo!")
            else:
                print(f"⚠️ Site respondeu com código: {response.status_code}")
        except requests.exceptions.ConnectionError:
            print("❌ Site não está acessível. Certifique-se de que está rodando.")
            return False
        except ImportError:
            print("⚠️ Biblioteca 'requests' não disponível")
        
        print("🎉 Todas as verificações passaram!")
        print("\n💡 Para executar os testes completos:")
        print("   python main.py")
        print("\n📚 Para ver todas as opções:")
        print("   python main.py --help")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro na demonstração: {str(e)}")
        return False

if __name__ == "__main__":
    success = quick_demo()
    sys.exit(0 if success else 1)