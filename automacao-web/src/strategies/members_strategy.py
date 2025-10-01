"""
Estratégia de teste para a seção de membros.
Implementa testes específicos para o acordeão de membros por instrumento.
"""
from src.strategies.base_strategy import TestStrategy
from src.pages.members_page import MembersPage
from src.utils.logger import logger

class MembersTestStrategy(TestStrategy):
    """Estratégia de testes para a seção de membros."""
    
    def __init__(self, driver):
        """Inicializa a estratégia de teste de membros."""
        super().__init__(driver)
        self.members_page = MembersPage(driver)
    
    def execute(self):
        """
        Executa todos os testes da seção de membros.
        
        Returns:
            dict: Resultado consolidado dos testes
        """
        logger.test_start("Members Section Tests")
        
        try:
            # Navegar para a seção de membros
            self.members_page.scroll_to_members_section()
            
            # Executar todos os testes
            self._test_members_section_visibility()
            self._test_all_instruments_present()
            self._test_accordion_functionality()
            self._test_members_count_consistency()
            self._test_join_cta()
            
        except Exception as e:
            logger.error(f"❌ Erro crítico nos testes de membros: {str(e)}")
            self.add_result("Members Execution", False, f"Erro crítico: {str(e)}")
            self.take_screenshot_on_failure("members_critical_error")
        
        finally:
            logger.test_end("Members Section Tests", self.success)
        
        return self.get_summary()
    
    def _test_members_section_visibility(self):
        """Testa se a seção de membros está visível e correta."""
        test_name = "Members Section Visibility"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.members_page.verify_members_section()
            self.add_result(test_name, result, "Seção de membros visível e correta" if result else "Problemas na seção de membros")
            
            if not result:
                self.take_screenshot_on_failure("members_visibility")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("members_visibility_exception")
    
    def _test_all_instruments_present(self):
        """Testa se todos os instrumentos estão presentes no acordeão."""
        test_name = "All Instruments Present"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.members_page.verify_all_instruments_present()
            message = f"Todos os {len(self.members_page.INSTRUMENTS)} instrumentos presentes" if result else "Instrumentos faltando"
            self.add_result(test_name, result, message)
            
            if not result:
                self.take_screenshot_on_failure("instruments_missing")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("instruments_exception")
    
    def _test_accordion_functionality(self):
        """Testa a funcionalidade do acordeão (expandir/colapsar)."""
        test_name = "Accordion Functionality"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.members_page.test_accordion_functionality()
            self.add_result(test_name, result, "Acordeão funcionando corretamente" if result else "Problemas no acordeão")
            
            if not result:
                self.take_screenshot_on_failure("accordion_functionality")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("accordion_functionality_exception")
    
    def _test_members_count_consistency(self):
        """Testa se a contagem de membros por instrumento é consistente."""
        test_name = "Members Count Consistency"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            total_members = 0
            instrument_counts = {}
            
            # Contar membros por instrumento
            for instrument in self.members_page.INSTRUMENTS:
                count = self.members_page.get_members_count_for_instrument(instrument)
                
                if count >= 0:
                    instrument_counts[instrument] = count
                    total_members += count
                else:
                    self.add_result(f"{test_name} - {instrument}", False, f"Erro ao contar membros de {instrument}")
                    continue
            
            # Verificar se há pelo menos alguns membros
            result = total_members > 0 and len(instrument_counts) == len(self.members_page.INSTRUMENTS)
            message = f"Total de membros: {total_members}, Instrumentos contados: {len(instrument_counts)}"
            
            self.add_result(test_name, result, message)
            
            # Log detalhado dos counts
            for instrument, count in instrument_counts.items():
                logger.info(f"📊 {instrument}: {count} membros")
            
            if not result:
                self.take_screenshot_on_failure("members_count")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("members_count_exception")
    
    def _test_join_cta(self):
        """Testa o call-to-action para entrar no bloco."""
        test_name = "Join CTA Functionality"
        logger.verification(f"Executando teste: {test_name}")
        
        try:
            result = self.members_page.click_join_cta()
            self.add_result(test_name, result, "CTA funcionando corretamente" if result else "Problemas no CTA")
            
            if not result:
                self.take_screenshot_on_failure("join_cta")
                
        except Exception as e:
            self.add_result(test_name, False, f"Exceção: {str(e)}")
            self.take_screenshot_on_failure("join_cta_exception")