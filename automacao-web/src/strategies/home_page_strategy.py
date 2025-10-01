"""
Estratégia de teste para a página inicial.
Implementa testes específicos para a homepage do Bloco Praieira.
"""
from src.strategies.base_strategy import TestStrategy
from src.pages.home_page import HomePage
from src.utils.logger import logger

class HomePageTestStrategy(TestStrategy):
    """Estratégia de testes para a página inicial."""
    
    def __init__(self, driver):
        """Inicializa a estratégia de teste da homepage."""
        super().__init__(driver)
        self.home_page = HomePage(driver)
    
    def execute(self):
        """
        Executa todos os testes da página inicial.
        
        Returns:
            dict: Resultado consolidado dos testes
        """
        logger.test_start("HomePage Tests")
        
        try:
            # Abrir a página inicial
            self.home_page.open()
            
            # Executar todos os testes
            self._test_page_loading()
            self._test_title_and_subtitle()
            self._test_history_card()
            self._test_mission_card()
            self._test_support_button()
            self._test_navigation_to_donations()
            
        except Exception as e:
            logger.error(f"❌ Erro crítico nos testes da homepage: {str(e)}")
            self.add_result("HomePage Execution", False, f"Erro crítico: {str(e)}")
            self.take_screenshot_on_failure("homepage_critical_error")
        
        finally:
            logger.test_end("HomePage Tests", self.success)
        
        return self.get_summary()
    
    def _test_page_loading(self):
        """Testa se a página carrega corretamente."""
        test_name = "Page Loading"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.home_page.verify_page_loaded()
            self.add_result(test_name, result, "Página inicial carregada corretamente" if result else "Falha no carregamento")
            
            if not result:
                self.take_screenshot_on_failure("page_loading")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("page_loading_exception")
    
    def _test_title_and_subtitle(self):
        """Testa se o título e subtítulo estão corretos."""
        test_name = "Title and Subtitle"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            # Verificar título
            title = self.home_page.get_main_title()
            title_correct = "Bloco Praieira" in title
            
            # Verificar subtítulo
            subtitle = self.home_page.get_subtitle()
            subtitle_correct = "Carnaval de Rua" in subtitle and "ABC Paulista" in subtitle
            
            result = title_correct and subtitle_correct
            message = f"Título: {title}, Subtítulo: {subtitle}"
            
            self.add_result(test_name, result, message)
            
            if not result:
                self.take_screenshot_on_failure("title_subtitle")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("title_subtitle_exception")
    
    def _test_history_card(self):
        """Testa o card de história."""
        test_name = "History Card"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.home_page.verify_history_card()
            self.add_result(test_name, result, "Card de história verificado" if result else "Card de história com problemas")
            
            if not result:
                self.take_screenshot_on_failure("history_card")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("history_card_exception")
    
    def _test_mission_card(self):
        """Testa o card de missão."""
        test_name = "Mission Card"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.home_page.verify_mission_card()
            self.add_result(test_name, result, "Card de missão verificado" if result else "Card de missão com problemas")
            
            if not result:
                self.take_screenshot_on_failure("mission_card")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("mission_card_exception")
    
    def _test_support_button(self):
        """Testa a presença e funcionalidade do botão de apoio."""
        test_name = "Support Button Presence"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            from selenium.webdriver.common.by import By
            
            button_visible = self.home_page.is_element_visible(self.home_page.SUPPORT_BUTTON)
            self.add_result(test_name, button_visible, "Botão de apoio visível" if button_visible else "Botão de apoio não encontrado")
            
            if not button_visible:
                self.take_screenshot_on_failure("support_button")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("support_button_exception")
    
    def _test_navigation_to_donations(self):
        """Testa a navegação para a seção de doações."""
        test_name = "Navigation to Donations"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.home_page.click_support_button()
            self.add_result(test_name, result, "Navegação para doações funcionando" if result else "Falha na navegação")
            
            if not result:
                self.take_screenshot_on_failure("navigation_donations")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("navigation_donations_exception")