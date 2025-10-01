"""
Classe base para Page Objects.
Implementa o padrão Page Object Model (POM) para organizar elementos e ações das páginas.
"""
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from config.settings import Config
from src.utils.logger import logger

class BasePage:
    """Classe base para todas as páginas do site."""
    
    def __init__(self, driver):
        """
        Inicializa a página base.
        
        Args:
            driver: Instância do WebDriver
        """
        self.driver = driver
        self.config = Config()
        self.wait = WebDriverWait(driver, self.config.MAX_WAIT_ELEMENTS)
    
    def navigate_to(self, url):
        """
        Navega para uma URL específica.
        
        Args:
            url (str): URL de destino
        """
        logger.action(f"Navegando para: {url}")
        self.driver.get(url)
        logger.info(f"✅ Página carregada: {self.driver.title}")
    
    def wait_for_element(self, locator, timeout=None):
        """
        Aguarda um elemento ficar visível.
        
        Args:
            locator (tuple): Localizador do elemento (By.ID, "element_id")
            timeout (int): Tempo limite em segundos
            
        Returns:
            WebElement: Elemento encontrado
        """
        if timeout is None:
            timeout = self.config.MAX_WAIT_ELEMENTS
        
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.visibility_of_element_located(locator)
            )
            logger.debug(f"✅ Elemento encontrado: {locator}")
            return element
        except TimeoutException:
            logger.error(f"❌ Timeout ao aguardar elemento: {locator}")
            raise
    
    def wait_for_element_clickable(self, locator, timeout=None):
        """
        Aguarda um elemento ficar clicável.
        
        Args:
            locator (tuple): Localizador do elemento
            timeout (int): Tempo limite em segundos
            
        Returns:
            WebElement: Elemento clicável
        """
        if timeout is None:
            timeout = self.config.MAX_WAIT_ELEMENTS
        
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.element_to_be_clickable(locator)
            )
            logger.debug(f"✅ Elemento clicável: {locator}")
            return element
        except TimeoutException:
            logger.error(f"❌ Timeout ao aguardar elemento clicável: {locator}")
            raise
    
    def click_element(self, locator):
        """
        Clica em um elemento.
        
        Args:
            locator (tuple): Localizador do elemento
        """
        element = self.wait_for_element_clickable(locator)
        element.click()
        logger.action(f"Clicou no elemento: {locator}")
    
    def type_text(self, locator, text):
        """
        Digita texto em um campo.
        
        Args:
            locator (tuple): Localizador do campo
            text (str): Texto a ser digitado
        """
        element = self.wait_for_element(locator)
        element.clear()
        element.send_keys(text)
        logger.action(f"Digitou '{text}' no campo: {locator}")
    
    def get_text(self, locator):
        """
        Obtém o texto de um elemento.
        
        Args:
            locator (tuple): Localizador do elemento
            
        Returns:
            str: Texto do elemento
        """
        element = self.wait_for_element(locator)
        text = element.text
        logger.debug(f"Texto obtido: '{text}' do elemento: {locator}")
        return text
    
    def is_element_present(self, locator):
        """
        Verifica se um elemento está presente na página.
        
        Args:
            locator (tuple): Localizador do elemento
            
        Returns:
            bool: True se o elemento estiver presente
        """
        try:
            self.driver.find_element(*locator)
            return True
        except NoSuchElementException:
            return False
    
    def is_element_visible(self, locator):
        """
        Verifica se um elemento está visível.
        
        Args:
            locator (tuple): Localizador do elemento
            
        Returns:
            bool: True se o elemento estiver visível
        """
        try:
            element = self.driver.find_element(*locator)
            return element.is_displayed()
        except NoSuchElementException:
            return False
    
    def scroll_to_element(self, locator):
        """
        Rola a página até um elemento.
        
        Args:
            locator (tuple): Localizador do elemento
        """
        element = self.wait_for_element(locator)
        self.driver.execute_script("arguments[0].scrollIntoView();", element)
        logger.action(f"Rolou até o elemento: {locator}")
    
    def take_screenshot(self, filename):
        """
        Tira um screenshot da página atual.
        
        Args:
            filename (str): Nome do arquivo
        """
        screenshot_path = self.config.get_screenshot_path(filename)
        self.driver.save_screenshot(str(screenshot_path))
        logger.screenshot(screenshot_path)
        return screenshot_path
    
    def get_page_title(self):
        """
        Obtém o título da página.
        
        Returns:
            str: Título da página
        """
        title = self.driver.title
        logger.info(f"Título da página: {title}")
        return title
    
    def get_current_url(self):
        """
        Obtém a URL atual.
        
        Returns:
            str: URL atual
        """
        url = self.driver.current_url
        logger.debug(f"URL atual: {url}")
        return url