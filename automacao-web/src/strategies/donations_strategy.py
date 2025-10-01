"""
Estratégia de teste para a seção de doações.
Implementa testes específicos para funcionalidades de PIX e doações.
"""
from src.strategies.base_strategy import TestStrategy
from src.pages.donations_page import DonationsPage
from src.utils.logger import logger
from config.settings import Config

class DonationsTestStrategy(TestStrategy):
    """Estratégia de testes para a seção de doações."""
    
    def __init__(self, driver):
        """Inicializa a estratégia de teste de doações."""
        super().__init__(driver)
        self.donations_page = DonationsPage(driver)
        self.config = Config()
    
    def execute(self):
        """
        Executa todos os testes da seção de doações.
        
        Returns:
            dict: Resultado consolidado dos testes
        """
        logger.test_start("Donations Section Tests")
        
        try:
            # Navegar para a seção de doações
            self.donations_page.scroll_to_donations_section()
            
            # Executar todos os testes
            self._test_donations_section_visibility()
            self._test_pix_key_display()
            self._test_qr_code_generation()
            self._test_copy_pix_functionality()
            self._test_instructions_presence()
            
        except Exception as e:
            logger.error(f"❌ Erro crítico nos testes de doações: {str(e)}")
            self.add_result("Donations Execution", False, f"Erro crítico: {str(e)}")
            self.take_screenshot_on_failure("donations_critical_error")
        
        finally:
            logger.test_end("Donations Section Tests", self.success)
        
        return self.get_summary()
    
    def _test_donations_section_visibility(self):
        """Testa se todos os elementos da seção de doações estão visíveis."""
        test_name = "Donations Section Visibility"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.donations_page.verify_donations_section()
            self.add_result(test_name, result, "Seção de doações completamente visível" if result else "Elementos faltando na seção")
            
            if not result:
                self.take_screenshot_on_failure("donations_visibility")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("donations_visibility_exception")
    
    def _test_pix_key_display(self):
        """Testa se a chave PIX está sendo exibida corretamente."""
        test_name = "PIX Key Display"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            expected_pix = self.config.TEST_PIX_KEY
            result = self.donations_page.verify_pix_key(expected_pix)
            self.add_result(test_name, result, f"Chave PIX: {expected_pix}" if result else "Chave PIX incorreta")
            
            if not result:
                self.take_screenshot_on_failure("pix_key_display")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("pix_key_display_exception")
    
    def _test_qr_code_generation(self):
        """Testa a geração do QR Code PIX."""
        test_name = "QR Code Generation"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.donations_page.generate_qr_code()
            self.add_result(test_name, result, "QR Code gerado com sucesso" if result else "Falha na geração do QR Code")
            
            if not result:
                self.take_screenshot_on_failure("qr_code_generation")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("qr_code_generation_exception")
    
    def _test_copy_pix_functionality(self):
        """Testa a funcionalidade de copiar chave PIX."""
        test_name = "Copy PIX Functionality"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.donations_page.copy_pix_key()
            self.add_result(test_name, result, "Funcionalidade de cópia testada" if result else "Falha na funcionalidade de cópia")
            
            if not result:
                self.take_screenshot_on_failure("copy_pix")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("copy_pix_exception")
    
    def _test_instructions_presence(self):
        """Testa se as instruções de como contribuir estão presentes e corretas."""
        test_name = "Instructions Presence"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.donations_page.verify_instructions()
            self.add_result(test_name, result, "Instruções completas e corretas" if result else "Instruções incompletas ou incorretas")
            
            if not result:
                self.take_screenshot_on_failure("instructions")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("instructions_exception")