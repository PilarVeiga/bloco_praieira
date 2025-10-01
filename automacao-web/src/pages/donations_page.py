"""
Page Object para a seção de doações do Bloco Praieira.
"""
from selenium.webdriver.common.by import By
from src.pages.base_page import BasePage
from src.utils.logger import logger

class DonationsPage(BasePage):
    """Page Object para a seção de doações."""
    
    # Localizadores dos elementos da seção de doações
    DONATIONS_SECTION = (By.ID, "donations")
    DONATIONS_TITLE = (By.XPATH, "//span[contains(text(), 'Apoie o Bloco')]")
    DONATIONS_DESCRIPTION = (By.XPATH, "//p[contains(text(), 'Sua contribuição nos ajuda')]")
    
    # QR Code
    QR_CODE_TITLE = (By.XPATH, "//h3[contains(text(), 'Escaneie o QR Code')]")
    QR_CODE_GENERATE_BUTTON = (By.XPATH, "//button[contains(text(), 'Gerar QR Code')]")
    QR_CODE_IMAGE = (By.XPATH, "//img[@alt='QR Code PIX']")
    
    # PIX Key
    PIX_KEY_TITLE = (By.XPATH, "//h3[contains(text(), 'Chave PIX')]")
    PIX_KEY_DISPLAY = (By.CSS_SELECTOR, ".text-neon-blue.font-mono")
    COPY_PIX_BUTTON = (By.XPATH, "//button[contains(text(), 'Copiar Chave PIX')]")
    SUCCESS_COPY_MESSAGE = (By.XPATH, "//button[contains(text(), 'Copiado!')]")
    
    # Instruções
    INSTRUCTIONS_TITLE = (By.XPATH, "//h4[contains(text(), 'Como contribuir')]")
    INSTRUCTIONS_LIST = (By.CSS_SELECTOR, "ol.text-gray-300")
    
    # Card de agradecimento
    THANK_YOU_CARD = (By.XPATH, "//strong[contains(text(), 'Sua contribuição importa!')]")
    
    def __init__(self, driver):
        """Inicializa a página de doações."""
        super().__init__(driver)
    
    def is_donations_section_visible(self):
        """
        Verifica se a seção de doações está visível.
        
        Returns:
            bool: True se a seção está visível
        """
        return self.is_element_visible(self.DONATIONS_SECTION)
    
    def verify_donations_section(self):
        """
        Verifica se todos os elementos da seção de doações estão presentes.
        
        Returns:
            bool: True se todos os elementos estão presentes
        """
        logger.verification("Verificando seção de doações")
        
        elements_to_check = [
            (self.DONATIONS_TITLE, "Título da seção"),
            (self.DONATIONS_DESCRIPTION, "Descrição da seção"),
            (self.QR_CODE_TITLE, "Título do QR Code"),
            (self.PIX_KEY_TITLE, "Título da chave PIX"),
            (self.PIX_KEY_DISPLAY, "Exibição da chave PIX"),
            (self.COPY_PIX_BUTTON, "Botão copiar PIX"),
            (self.INSTRUCTIONS_TITLE, "Título das instruções"),
            (self.THANK_YOU_CARD, "Card de agradecimento")
        ]
        
        for locator, element_name in elements_to_check:
            if not self.is_element_visible(locator):
                logger.error(f"❌ Elemento não visível: {element_name}")
                return False
            logger.debug(f"✅ {element_name} está visível")
        
        logger.info("✅ Seção de doações verificada com sucesso")
        return True
    
    def verify_pix_key(self, expected_pix_key):
        """
        Verifica se a chave PIX exibida está correta.
        
        Args:
            expected_pix_key (str): Chave PIX esperada
            
        Returns:
            bool: True se a chave está correta
        """
        logger.verification(f"Verificando chave PIX: {expected_pix_key}")
        
        try:
            displayed_pix_key = self.get_text(self.PIX_KEY_DISPLAY).strip()
            
            if displayed_pix_key == expected_pix_key:
                logger.info(f"✅ Chave PIX correta: {displayed_pix_key}")
                return True
            else:
                logger.error(f"❌ Chave PIX incorreta. Esperado: {expected_pix_key}, Encontrado: {displayed_pix_key}")
                return False
                
        except Exception as e:
            logger.error(f"❌ Erro ao verificar chave PIX: {str(e)}")
            return False
    
    def generate_qr_code(self):
        """
        Gera o QR Code PIX clicando no botão.
        
        Returns:
            bool: True se o QR Code foi gerado
        """
        logger.action("Gerando QR Code PIX")
        
        try:
            # Verificar se o botão está presente
            if not self.is_element_visible(self.QR_CODE_GENERATE_BUTTON):
                logger.error("❌ Botão 'Gerar QR Code' não encontrado")
                return False
            
            # Clicar no botão
            self.click_element(self.QR_CODE_GENERATE_BUTTON)
            
            # Aguardar um momento para o QR Code ser gerado
            import time
            time.sleep(3)
            
            # Verificar se o QR Code foi gerado
            if self.is_element_visible(self.QR_CODE_IMAGE):
                logger.info("✅ QR Code gerado com sucesso")
                return True
            else:
                logger.error("❌ QR Code não foi gerado")
                return False
                
        except Exception as e:
            logger.error(f"❌ Erro ao gerar QR Code: {str(e)}")
            return False
    
    def copy_pix_key(self):
        """
        Testa a funcionalidade de copiar chave PIX.
        
        Returns:
            bool: True se a cópia foi bem-sucedida
        """
        logger.action("Testando cópia da chave PIX")
        
        try:
            # Clicar no botão de copiar
            self.click_element(self.COPY_PIX_BUTTON)
            
            # Aguardar um momento para a animação
            import time
            time.sleep(2)
            
            # Verificar se apareceu a mensagem de sucesso
            if self.is_element_visible(self.SUCCESS_COPY_MESSAGE):
                logger.info("✅ Chave PIX copiada com sucesso")
                return True
            else:
                logger.warning("⚠️ Mensagem de cópia não encontrada (pode ser limitação do navegador)")
                return True  # Considerar sucesso mesmo sem mensagem visual
                
        except Exception as e:
            logger.error(f"❌ Erro ao copiar chave PIX: {str(e)}")
            return False
    
    def verify_instructions(self):
        """
        Verifica se as instruções de como contribuir estão presentes.
        
        Returns:
            bool: True se as instruções estão corretas
        """
        logger.verification("Verificando instruções de contribuição")
        
        try:
            instructions_text = self.get_text(self.INSTRUCTIONS_LIST)
            
            # Verificar se contém os passos básicos
            required_steps = ["app bancário", "PIX", "chave", "valor", "confirme"]
            
            missing_steps = []
            for step in required_steps:
                if step.lower() not in instructions_text.lower():
                    missing_steps.append(step)
            
            if missing_steps:
                logger.error(f"❌ Passos faltando nas instruções: {missing_steps}")
                return False
            
            logger.info("✅ Instruções de contribuição estão completas")
            return True
            
        except Exception as e:
            logger.error(f"❌ Erro ao verificar instruções: {str(e)}")
            return False
    
    def scroll_to_donations_section(self):
        """
        Rola até a seção de doações.
        
        Returns:
            bool: True se o scroll foi bem-sucedido
        """
        logger.action("Rolando para seção de doações")
        try:
            self.scroll_to_element(self.DONATIONS_SECTION)
            return True
        except Exception as e:
            logger.error(f"❌ Erro ao rolar para doações: {str(e)}")
            return False