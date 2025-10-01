"""
Page Object para a página inicial do Bloco Praieira.
Implementa o padrão Page Object Model para a homepage.
"""
from selenium.webdriver.common.by import By
from src.pages.base_page import BasePage
from src.utils.logger import logger

class HomePage(BasePage):
    """Page Object para a página inicial do site do Bloco Praieira."""
    
    # Localizadores dos elementos da página
    LOGO_ELEMENT = (By.CSS_SELECTOR, ".crab-emoji")
    TITLE_ELEMENT = (By.CSS_SELECTOR, "h1 .gradient-text")
    SUBTITLE_ELEMENT = (By.XPATH, "//p[contains(text(), 'Carnaval de Rua')]")
    
    # Cards informativos
    HISTORY_CARD = (By.XPATH, "//h3[contains(text(), 'Nossa História')]")
    MISSION_CARD = (By.XPATH, "//h3[contains(text(), 'Nossa Missão')]")
    
    # Botão de apoio
    SUPPORT_BUTTON = (By.XPATH, "//button[contains(text(), 'Apoie o Bloco')]")
    
    # Scroll indicator
    SCROLL_INDICATOR = (By.CSS_SELECTOR, ".w-6.h-10.border-2")
    
    def __init__(self, driver):
        """Inicializa a página inicial."""
        super().__init__(driver)
        self.page_url = f"{self.config.BASE_URL}/"
    
    def open(self):
        """Abre a página inicial."""
        logger.action("Abrindo página inicial do Bloco Praieira")
        self.navigate_to(self.page_url)
        return self
    
    def verify_page_loaded(self):
        """
        Verifica se a página foi carregada corretamente.
        
        Returns:
            bool: True se a página foi carregada
        """
        logger.verification("Verificando se a página inicial carregou")
        
        # Verificar título da página
        expected_title = "Bloco Praieira - Carnaval de Rua ABC Paulista"
        actual_title = self.get_page_title()
        
        if expected_title not in actual_title:
            logger.error(f"❌ Título incorreto. Esperado: {expected_title}, Atual: {actual_title}")
            return False
        
        # Verificar elementos principais
        elements_to_check = [
            (self.LOGO_ELEMENT, "Logo do caranguejo"),
            (self.TITLE_ELEMENT, "Título principal"),
            (self.SUBTITLE_ELEMENT, "Subtítulo"),
            (self.SUPPORT_BUTTON, "Botão de apoio")
        ]
        
        for locator, element_name in elements_to_check:
            if not self.is_element_visible(locator):
                logger.error(f"❌ Elemento não visível: {element_name}")
                return False
            logger.debug(f"✅ {element_name} está visível")
        
        logger.info("✅ Página inicial carregada corretamente")
        return True
    
    def get_main_title(self):
        """
        Obtém o título principal da página.
        
        Returns:
            str: Título principal
        """
        logger.action("Obtendo título principal")
        return self.get_text(self.TITLE_ELEMENT)
    
    def get_subtitle(self):
        """
        Obtém o subtítulo da página.
        
        Returns:
            str: Subtítulo
        """
        logger.action("Obtendo subtítulo")
        return self.get_text(self.SUBTITLE_ELEMENT)
    
    def click_support_button(self):
        """
        Clica no botão "Apoie o Bloco" para navegar para a seção de doações.
        
        Returns:
            bool: True se o clique foi bem-sucedido
        """
        logger.action("Clicando no botão 'Apoie o Bloco'")
        try:
            self.click_element(self.SUPPORT_BUTTON)
            
            # Aguardar um momento para a animação de scroll
            import time
            time.sleep(2)
            
            # Verificar se chegou na seção de doações
            from src.pages.donations_page import DonationsPage
            donations_page = DonationsPage(self.driver)
            
            if donations_page.is_donations_section_visible():
                logger.info("✅ Navegação para seção de doações bem-sucedida")
                return True
            else:
                logger.error("❌ Não chegou na seção de doações")
                return False
                
        except Exception as e:
            logger.error(f"❌ Erro ao clicar no botão de apoio: {str(e)}")
            return False
    
    def verify_history_card(self):
        """
        Verifica se o card de história está presente e contém informações esperadas.
        
        Returns:
            bool: True se o card está correto
        """
        logger.verification("Verificando card de história")
        
        if not self.is_element_visible(self.HISTORY_CARD):
            logger.error("❌ Card de história não encontrado")
            return False
        
        # Verificar se o card contém informações sobre 2021 e Bar "A Praieira"
        history_text = self.get_text((By.XPATH, "//h3[contains(text(), 'Nossa História')]/following-sibling::p"))
        
        if "2021" in history_text and "Praieira" in history_text:
            logger.info("✅ Card de história contém informações corretas")
            return True
        else:
            logger.error(f"❌ Card de história com informações incorretas: {history_text}")
            return False
    
    def verify_mission_card(self):
        """
        Verifica se o card de missão está presente e contém informações esperadas.
        
        Returns:
            bool: True se o card está correto
        """
        logger.verification("Verificando card de missão")
        
        if not self.is_element_visible(self.MISSION_CARD):
            logger.error("❌ Card de missão não encontrado")
            return False
        
        # Verificar se o card contém informações sobre os 30 integrantes
        mission_text = self.get_text((By.XPATH, "//h3[contains(text(), 'Nossa Missão')]/following-sibling::p"))
        
        if "30 integrantes" in mission_text or "carnaval" in mission_text.lower():
            logger.info("✅ Card de missão contém informações corretas")
            return True
        else:
            logger.error(f"❌ Card de missão com informações incorretas: {mission_text}")
            return False
    
    def scroll_to_donations(self):
        """
        Rola a página até a seção de doações.
        
        Returns:
            bool: True se o scroll foi bem-sucedido
        """
        logger.action("Rolando para seção de doações")
        try:
            # Usar JavaScript para fazer scroll suave
            self.driver.execute_script("document.getElementById('donations').scrollIntoView({ behavior: 'smooth' });")
            
            import time
            time.sleep(2)  # Aguardar animação
            
            logger.info("✅ Scroll para doações realizado")
            return True
        except Exception as e:
            logger.error(f"❌ Erro ao fazer scroll: {str(e)}")
            return False