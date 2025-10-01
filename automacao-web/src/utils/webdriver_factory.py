"""
Factory para criação de WebDrivers.
Implementa o padrão Factory Method para criar diferentes tipos de drivers.
"""
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
from config.settings import Config
from src.utils.logger import logger

class WebDriverFactory:
    """Factory para criação de WebDrivers com diferentes configurações."""
    
    @staticmethod
    def create_driver(browser_type="chrome"):
        """
        Cria um WebDriver baseado no tipo especificado.
        
        Args:
            browser_type (str): Tipo do navegador ('chrome' ou 'firefox')
            
        Returns:
            WebDriver: Instância do WebDriver configurado
        """
        config = Config()
        
        logger.info(f"🌐 Criando WebDriver: {browser_type}")
        
        if browser_type.lower() == "chrome":
            return WebDriverFactory._create_chrome_driver(config)
        elif browser_type.lower() == "firefox":
            return WebDriverFactory._create_firefox_driver(config)
        else:
            raise ValueError(f"Browser não suportado: {browser_type}")
    
    @staticmethod
    def _create_chrome_driver(config):
        """Cria um driver Chrome com configurações específicas."""
        options = Options()
        
        # Configurações básicas
        if config.HEADLESS_MODE:
            options.add_argument("--headless")
            logger.info("🔇 Modo headless ativado")
        
        options.add_argument(f"--window-size={config.BROWSER_WIDTH},{config.BROWSER_HEIGHT}")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-gpu")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-web-security")
        options.add_argument("--allow-running-insecure-content")
        
        # Configurações para melhor performance
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        # Service
        service = Service(ChromeDriverManager().install())
        
        # Criar driver
        driver = webdriver.Chrome(service=service, options=options)
        
        # Configurações do driver
        driver.implicitly_wait(config.IMPLICIT_WAIT)
        driver.set_page_load_timeout(config.PAGE_LOAD_TIMEOUT)
        
        logger.info(f"✅ Chrome WebDriver criado com sucesso")
        return driver
    
    @staticmethod
    def _create_firefox_driver(config):
        """Cria um driver Firefox com configurações específicas."""
        options = FirefoxOptions()
        
        # Configurações básicas
        if config.HEADLESS_MODE:
            options.add_argument("--headless")
            logger.info("🔇 Modo headless ativado")
        
        options.add_argument(f"--width={config.BROWSER_WIDTH}")
        options.add_argument(f"--height={config.BROWSER_HEIGHT}")
        
        # Service
        service = FirefoxService(GeckoDriverManager().install())
        
        # Criar driver
        driver = webdriver.Firefox(service=service, options=options)
        
        # Configurações do driver
        driver.implicitly_wait(config.IMPLICIT_WAIT)
        driver.set_page_load_timeout(config.PAGE_LOAD_TIMEOUT)
        
        logger.info(f"✅ Firefox WebDriver criado com sucesso")
        return driver