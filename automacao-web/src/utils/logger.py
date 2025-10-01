"""
Logger configurado para o projeto.
Implementa padrão Singleton para garantir única instância de logging.
"""
import logging
import sys
from datetime import datetime
from pathlib import Path

class Logger:
    """Classe singleton para gerenciar logging do projeto."""
    
    _instance = None
    _initialized = False
    
    def __new__(cls, name="AutomacaoBlocoPraieira"):
        if cls._instance is None:
            cls._instance = super(Logger, cls).__new__(cls)
        return cls._instance
    
    def __init__(self, name="AutomacaoBlocoPraieira"):
        if not self._initialized:
            self.logger = logging.getLogger(name)
            self._setup_logger()
            self._initialized = True
    
    def _setup_logger(self):
        """Configura o logger com formatação e handlers."""
        from config.settings import Config
        config = Config()
        
        self.logger.setLevel(config.LOG_LEVEL)
        
        # Limpar handlers existentes
        self.logger.handlers.clear()
        
        # Formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        
        # Console Handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(config.LOG_LEVEL)
        console_handler.setFormatter(formatter)
        self.logger.addHandler(console_handler)
        
        # File Handler (se habilitado)
        if config.LOG_TO_FILE:
            file_handler = logging.FileHandler(
                config.get_log_file_path(),
                encoding='utf-8'
            )
            file_handler.setLevel(config.LOG_LEVEL)
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)
    
    def info(self, message):
        """Log de informação."""
        self.logger.info(message)
    
    def warning(self, message):
        """Log de aviso."""
        self.logger.warning(message)
    
    def error(self, message):
        """Log de erro."""
        self.logger.error(message)
    
    def debug(self, message):
        """Log de debug."""
        self.logger.debug(message)
    
    def critical(self, message):
        """Log crítico."""
        self.logger.critical(message)
    
    def test_start(self, test_name):
        """Log de início de teste."""
        self.info(f"🧪 INICIANDO TESTE: {test_name}")
        self.info("=" * 50)
    
    def test_end(self, test_name, success=True):
        """Log de fim de teste."""
        status = "✅ SUCESSO" if success else "❌ FALHOU"
        self.info(f"🏁 FINALIZANDO TESTE: {test_name} - {status}")
        self.info("=" * 50)
    
    def action(self, action_description):
        """Log de ação sendo executada."""
        self.info(f"🔧 AÇÃO: {action_description}")
    
    def verification(self, verification_description):
        """Log de verificação sendo realizada."""
        self.info(f"🔍 VERIFICAÇÃO: {verification_description}")
    
    def screenshot(self, screenshot_path):
        """Log de screenshot capturado."""
        self.info(f"📸 SCREENSHOT: {screenshot_path}")

# Instância global do logger
logger = Logger()