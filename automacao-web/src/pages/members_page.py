"""
Page Object para a seção de membros do Bloco Praieira.
"""
from selenium.webdriver.common.by import By
from src.pages.base_page import BasePage
from src.utils.logger import logger

class MembersPage(BasePage):
    """Page Object para a seção de membros."""
    
    # Localizadores dos elementos da seção de membros
    MEMBERS_TITLE = (By.XPATH, "//span[contains(text(), 'Nossos Membros')]")
    MEMBERS_DESCRIPTION = (By.XPATH, "//p[contains(text(), 'Conheça os integrantes')]")
    
    # Acordeão de instrumentos
    INSTRUMENT_SECTION_TEMPLATE = "//h3[contains(text(), '{}')]"
    ACCORDION_BUTTON_TEMPLATE = "//h3[contains(text(), '{}')]/parent::button"
    MEMBERS_LIST_TEMPLATE = "//h3[contains(text(), '{}')]/ancestor::div[contains(@class, 'glassmorphism')]//div[contains(@class, 'grid')]"
    
    # Instrumentos disponíveis
    INSTRUMENTS = [
        "Mestres",
        "Harmonia", 
        "Caixa",
        "Repinique",
        "Surdo",
        "Xequerê & Ganzá",
        "Tamborim"
    ]
    
    # Call to action
    JOIN_CTA_TITLE = (By.XPATH, "//h3[contains(text(), 'Quer fazer parte do Bloco')]")
    JOIN_CTA_BUTTON = (By.XPATH, "//a[contains(text(), 'Entrar em Contato')]")
    
    def __init__(self, driver):
        """Inicializa a página de membros."""
        super().__init__(driver)
    
    def verify_members_section(self):
        """
        Verifica se a seção de membros está presente e correta.
        
        Returns:
            bool: True se a seção está correta
        """
        logger.verification("Verificando seção de membros")
        
        # Verificar elementos principais
        elements_to_check = [
            (self.MEMBERS_TITLE, "Título da seção"),
            (self.MEMBERS_DESCRIPTION, "Descrição da seção"),
            (self.JOIN_CTA_TITLE, "Título do CTA"),
            (self.JOIN_CTA_BUTTON, "Botão do CTA")
        ]
        
        for locator, element_name in elements_to_check:
            if not self.is_element_visible(locator):
                logger.error(f"❌ Elemento não visível: {element_name}")
                return False
            logger.debug(f"✅ {element_name} está visível")
        
        logger.info("✅ Seção de membros verificada com sucesso")
        return True
    
    def verify_all_instruments_present(self):
        """
        Verifica se todos os instrumentos estão presentes no acordeão.
        
        Returns:
            bool: True se todos os instrumentos estão presentes
        """
        logger.verification("Verificando presença de todos os instrumentos")
        
        missing_instruments = []
        
        for instrument in self.INSTRUMENTS:
            instrument_locator = (By.XPATH, self.INSTRUMENT_SECTION_TEMPLATE.format(instrument))
            
            if not self.is_element_visible(instrument_locator):
                missing_instruments.append(instrument)
                logger.error(f"❌ Instrumento não encontrado: {instrument}")
            else:
                logger.debug(f"✅ Instrumento encontrado: {instrument}")
        
        if missing_instruments:
            logger.error(f"❌ Instrumentos faltando: {missing_instruments}")
            return False
        
        logger.info("✅ Todos os instrumentos estão presentes")
        return True
    
    def expand_instrument_section(self, instrument_name):
        """
        Expande uma seção de instrumento no acordeão.
        
        Args:
            instrument_name (str): Nome do instrumento
            
        Returns:
            bool: True se a expansão foi bem-sucedida
        """
        logger.action(f"Expandindo seção do instrumento: {instrument_name}")
        
        try:
            accordion_button_locator = (By.XPATH, self.ACCORDION_BUTTON_TEMPLATE.format(instrument_name))
            
            # Verificar se o botão existe
            if not self.is_element_visible(accordion_button_locator):
                logger.error(f"❌ Botão do acordeão não encontrado para: {instrument_name}")
                return False
            
            # Clicar no botão para expandir
            self.click_element(accordion_button_locator)
            
            # Aguardar animação
            import time
            time.sleep(1)
            
            # Verificar se a seção foi expandida (lista de membros visível)
            members_list_locator = (By.XPATH, self.MEMBERS_LIST_TEMPLATE.format(instrument_name))
            
            if self.is_element_visible(members_list_locator):
                logger.info(f"✅ Seção expandida com sucesso: {instrument_name}")
                return True
            else:
                logger.error(f"❌ Seção não foi expandida: {instrument_name}")
                return False
                
        except Exception as e:
            logger.error(f"❌ Erro ao expandir seção {instrument_name}: {str(e)}")
            return False
    
    def collapse_instrument_section(self, instrument_name):
        """
        Colapsa uma seção de instrumento no acordeão.
        
        Args:
            instrument_name (str): Nome do instrumento
            
        Returns:
            bool: True se o colapso foi bem-sucedido
        """
        logger.action(f"Colapsando seção do instrumento: {instrument_name}")
        
        try:
            accordion_button_locator = (By.XPATH, self.ACCORDION_BUTTON_TEMPLATE.format(instrument_name))
            
            # Clicar no botão para colapsar
            self.click_element(accordion_button_locator)
            
            # Aguardar animação
            import time
            time.sleep(1)
            
            # Verificar se a seção foi colapsada
            members_list_locator = (By.XPATH, self.MEMBERS_LIST_TEMPLATE.format(instrument_name))
            
            if not self.is_element_visible(members_list_locator):
                logger.info(f"✅ Seção colapsada com sucesso: {instrument_name}")
                return True
            else:
                logger.error(f"❌ Seção não foi colapsada: {instrument_name}")
                return False
                
        except Exception as e:
            logger.error(f"❌ Erro ao colapsar seção {instrument_name}: {str(e)}")
            return False
    
    def get_members_count_for_instrument(self, instrument_name):
        """
        Obtém a quantidade de membros de um instrumento específico.
        
        Args:
            instrument_name (str): Nome do instrumento
            
        Returns:
            int: Número de membros ou -1 se houver erro
        """
        logger.action(f"Contando membros do instrumento: {instrument_name}")
        
        try:
            # Expandir a seção primeiro
            if not self.expand_instrument_section(instrument_name):
                return -1
            
            # Contar os cards de membros
            members_cards_locator = (By.XPATH, 
                f"{self.MEMBERS_LIST_TEMPLATE.format(instrument_name)}//div[contains(@class, 'bg-black/30')]"
            )
            
            members_elements = self.driver.find_elements(*members_cards_locator)
            count = len(members_elements)
            
            logger.info(f"✅ {instrument_name} tem {count} membros")
            return count
            
        except Exception as e:
            logger.error(f"❌ Erro ao contar membros de {instrument_name}: {str(e)}")
            return -1
    
    def test_accordion_functionality(self):
        """
        Testa a funcionalidade completa do acordeão.
        
        Returns:
            bool: True se o acordeão funciona corretamente
        """
        logger.verification("Testando funcionalidade do acordeão")
        
        # Testar expansão e colapso de algumas seções
        test_instruments = ["Mestres", "Caixa", "Surdo"]
        
        for instrument in test_instruments:
            # Testar expansão
            if not self.expand_instrument_section(instrument):
                return False
            
            # Testar colapso
            if not self.collapse_instrument_section(instrument):
                return False
        
        logger.info("✅ Funcionalidade do acordeão testada com sucesso")
        return True
    
    def click_join_cta(self):
        """
        Clica no botão "Entrar em Contato" do CTA.
        
        Returns:
            bool: True se o clique foi bem-sucedido
        """
        logger.action("Clicando no CTA 'Entrar em Contato'")
        
        try:
            self.click_element(self.JOIN_CTA_BUTTON)
            
            # Verificar se abriu um mailto ou navegou
            import time
            time.sleep(1)
            
            # Como é um mailto, não podemos verificar navegação, apenas que o clique funcionou
            logger.info("✅ Clique no CTA realizado com sucesso")
            return True
            
        except Exception as e:
            logger.error(f"❌ Erro ao clicar no CTA: {str(e)}")
            return False
    
    def scroll_to_members_section(self):
        """
        Rola até a seção de membros.
        
        Returns:
            bool: True se o scroll foi bem-sucedido
        """
        logger.action("Rolando para seção de membros")
        try:
            self.scroll_to_element(self.MEMBERS_TITLE)
            return True
        except Exception as e:
            logger.error(f"❌ Erro ao rolar para membros: {str(e)}")
            return False