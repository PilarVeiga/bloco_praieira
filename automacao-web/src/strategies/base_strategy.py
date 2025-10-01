"""
Interface base para estratégias de teste.
Implementa o padrão Strategy para diferentes tipos de testes.
"""
from abc import ABC, abstractmethod
from src.utils.logger import logger

class TestStrategy(ABC):
    """Interface base para todas as estratégias de teste."""
    
    def __init__(self, driver):
        """
        Inicializa a estratégia de teste.
        
        Args:
            driver: Instância do WebDriver
        """
        self.driver = driver
        self.test_results = []
        self.success = True
    
    @abstractmethod
    def execute(self):
        """
        Executa a estratégia de teste.
        
        Returns:
            dict: Resultado do teste
        """
        pass
    
    def add_result(self, test_name, passed, message=""):
        """
        Adiciona um resultado de teste.
        
        Args:
            test_name (str): Nome do teste
            passed (bool): Se o teste passou
            message (str): Mensagem adicional
        """
        result = {
            'test_name': test_name,
            'passed': passed,
            'message': message,
            'timestamp': self._get_timestamp()
        }
        
        self.test_results.append(result)
        
        if not passed:
            self.success = False
            logger.error(f"❌ TESTE FALHOU: {test_name} - {message}")
        else:
            logger.info(f"✅ TESTE PASSOU: {test_name} - {message}")
    
    def take_screenshot_on_failure(self, test_name):
        """
        Tira screenshot em caso de falha.
        
        Args:
            test_name (str): Nome do teste
        """
        from config.settings import Config
        config = Config()
        
        if config.SCREENSHOT_ON_FAILURE:
            from src.pages.base_page import BasePage
            base_page = BasePage(self.driver)
            screenshot_path = base_page.take_screenshot(f"failure_{test_name}")
            return screenshot_path
        return None
    
    def _get_timestamp(self):
        """
        Obtém timestamp atual.
        
        Returns:
            str: Timestamp formatado
        """
        from datetime import datetime
        return datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    def get_summary(self):
        """
        Obtém um resumo dos resultados dos testes.
        
        Returns:
            dict: Resumo dos testes
        """
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['passed'])
        failed_tests = total_tests - passed_tests
        
        return {
            'strategy_name': self.__class__.__name__,
            'total_tests': total_tests,
            'passed_tests': passed_tests,
            'failed_tests': failed_tests,
            'success_rate': (passed_tests / total_tests * 100) if total_tests > 0 else 0,
            'overall_success': self.success,
            'detailed_results': self.test_results
        }