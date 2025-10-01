"""
Configurações centralizadas do projeto.
Implementa o padrão Singleton para garantir configurações únicas.
"""
import os
import logging
from dotenv import load_dotenv
from pathlib import Path

class Config:
    """Classe singleton para gerenciar configurações do projeto."""
    
    _instance = None
    _initialized = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Config, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            load_dotenv()
            self._load_config()
            self._initialized = True
    
    def _load_config(self):
        """Carrega todas as configurações do arquivo .env"""
        # Configurações do WebDriver
        self.WEBDRIVER_TIMEOUT = int(os.getenv('WEBDRIVER_TIMEOUT', 10))
        self.IMPLICIT_WAIT = int(os.getenv('IMPLICIT_WAIT', 5))
        self.PAGE_LOAD_TIMEOUT = int(os.getenv('PAGE_LOAD_TIMEOUT', 30))
        
        # URL do site do Bloco Praieira
        # URLs base do projeto
        self.BASE_URL = os.getenv('BASE_URL', 'http://localhost:3000')
        
        # Configurações de teste
        self.MAX_WAIT_ELEMENTS = int(os.getenv('MAX_WAIT_ELEMENTS', 10))
        self.SCREENSHOT_ON_FAILURE = os.getenv('SCREENSHOT_ON_FAILURE', 'true').lower() == 'true'
        
        # Configurações de relatórios
        self.EXPORT_EXCEL = os.getenv('EXPORT_EXCEL', 'true').lower() == 'true'
        self.EXPORT_JSON = os.getenv('EXPORT_JSON', 'true').lower() == 'true'
        
        # Dados de teste
        self.TEST_PIX_KEY = os.getenv('TEST_PIX_KEY', 'blocopraieira@gmail.com')
        self.TEST_EMAIL = os.getenv('TEST_EMAIL', 'teste@blocopraieira.com')
        
        # Configurações de logging
        self.LOG_LEVEL = getattr(logging, os.getenv('LOG_LEVEL', 'INFO').upper())
        self.LOG_TO_FILE = os.getenv('LOG_TO_FILE', 'true').lower() == 'true'
        
        # Configurações do navegador
        self.HEADLESS_MODE = os.getenv('HEADLESS_MODE', 'false').lower() == 'true'
        self.BROWSER_WIDTH = int(os.getenv('BROWSER_WIDTH', 1920))
        self.BROWSER_HEIGHT = int(os.getenv('BROWSER_HEIGHT', 1080))
        
        # Caminhos dos diretórios
        self.PROJECT_ROOT = Path(__file__).parent.parent
        self.LOGS_DIR = self.PROJECT_ROOT / 'logs'
        self.REPORTS_DIR = self.PROJECT_ROOT / 'reports'
        self.SCREENSHOTS_DIR = self.PROJECT_ROOT / 'screenshots'
        
        # Criar diretórios se não existirem
        self.LOGS_DIR.mkdir(exist_ok=True)
        self.REPORTS_DIR.mkdir(exist_ok=True)
        self.SCREENSHOTS_DIR.mkdir(exist_ok=True)
    
    def get_log_file_path(self):
        """Retorna o caminho do arquivo de log."""
        from datetime import datetime
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        return self.LOGS_DIR / f'automacao_{timestamp}.log'
    
    def get_report_file_path(self, extension='xlsx'):
        """Retorna o caminho do arquivo de relatório."""
        from datetime import datetime
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        return self.REPORTS_DIR / f'relatorio_testes_{timestamp}.{extension}'
    
    def get_screenshot_path(self, test_name):
        """Retorna o caminho para screenshots."""
        from datetime import datetime
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        return self.SCREENSHOTS_DIR / f'{test_name}_{timestamp}.png'