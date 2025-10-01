"""
Executor principal de testes.
Implementa o padrão Context para coordenar diferentes estratégias de teste.
"""
from src.utils.webdriver_factory import WebDriverFactory
from src.utils.logger import logger
from src.strategies.home_page_strategy import HomePageTestStrategy
from src.strategies.donations_strategy import DonationsTestStrategy
from src.strategies.members_strategy import MembersTestStrategy
from config.settings import Config
import json
from datetime import datetime

class TestExecutor:
    """Executor principal que coordena todos os testes."""
    
    def __init__(self, browser_type="chrome"):
        """
        Inicializa o executor de testes.
        
        Args:
            browser_type (str): Tipo do navegador a ser usado
        """
        self.browser_type = browser_type
        self.config = Config()
        self.driver = None
        self.test_results = []
        self.start_time = None
        self.end_time = None
    
    def setup(self):
        """Configura o ambiente de teste."""
        logger.info("🚀 Iniciando configuração dos testes")
        
        try:
            # Criar WebDriver
            self.driver = WebDriverFactory.create_driver(self.browser_type)
            self.start_time = datetime.now()
            
            logger.info(f"✅ WebDriver {self.browser_type} configurado com sucesso")
            return True
            
        except Exception as e:
            logger.error(f"❌ Erro na configuração: {str(e)}")
            return False
    
    def teardown(self):
        """Limpa o ambiente de teste."""
        logger.info("🧹 Limpando ambiente de teste")
        
        if self.driver:
            try:
                self.driver.quit()
                logger.info("✅ WebDriver fechado com sucesso")
            except Exception as e:
                logger.error(f"❌ Erro ao fechar WebDriver: {str(e)}")
        
        self.end_time = datetime.now()
    
    def run_all_tests(self):
        """
        Executa todas as estratégias de teste.
        
        Returns:
            dict: Resultado consolidado de todos os testes
        """
        logger.info("🧪 Iniciando execução de todos os testes")
        
        if not self.setup():
            return {"error": "Falha na configuração inicial"}
        
        try:
            # Executar estratégias de teste na ordem correta
            strategies = [
                ("HomePage", HomePageTestStrategy(self.driver)),
                ("Donations", DonationsTestStrategy(self.driver)),
                ("Members", MembersTestStrategy(self.driver))
            ]
            
            for strategy_name, strategy in strategies:
                logger.info(f"🔄 Executando estratégia: {strategy_name}")
                
                try:
                    result = strategy.execute()
                    self.test_results.append(result)
                    
                    logger.info(f"✅ Estratégia {strategy_name} concluída")
                    
                except Exception as e:
                    logger.error(f"❌ Erro na estratégia {strategy_name}: {str(e)}")
                    
                    error_result = {
                        'strategy_name': strategy_name,
                        'total_tests': 0,
                        'passed_tests': 0,
                        'failed_tests': 1,
                        'success_rate': 0,
                        'overall_success': False,
                        'error': str(e),
                        'detailed_results': [
                            {
                                'test_name': f'{strategy_name}_execution',
                                'passed': False,
                                'message': f'Erro crítico: {str(e)}',
                                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                            }
                        ]
                    }
                    self.test_results.append(error_result)
            
            # Gerar relatório final
            final_report = self._generate_final_report()
            
            # Exportar relatórios
            self._export_reports(final_report)
            
            return final_report
            
        finally:
            self.teardown()
    
    def run_specific_strategy(self, strategy_name):
        """
        Executa uma estratégia específica.
        
        Args:
            strategy_name (str): Nome da estratégia ('home', 'donations', 'members')
            
        Returns:
            dict: Resultado da estratégia específica
        """
        logger.info(f"🎯 Executando estratégia específica: {strategy_name}")
        
        if not self.setup():
            return {"error": "Falha na configuração inicial"}
        
        try:
            strategy_mapping = {
                'home': HomePageTestStrategy,
                'donations': DonationsTestStrategy,
                'members': MembersTestStrategy
            }
            
            if strategy_name not in strategy_mapping:
                raise ValueError(f"Estratégia desconhecida: {strategy_name}")
            
            strategy_class = strategy_mapping[strategy_name]
            strategy = strategy_class(self.driver)
            
            result = strategy.execute()
            self.test_results.append(result)
            
            # Gerar relatório específico
            final_report = self._generate_final_report()
            self._export_reports(final_report)
            
            return final_report
            
        finally:
            self.teardown()
    
    def _generate_final_report(self):
        """
        Gera o relatório final consolidado.
        
        Returns:
            dict: Relatório final
        """
        total_tests = sum(result['total_tests'] for result in self.test_results)
        total_passed = sum(result['passed_tests'] for result in self.test_results)
        total_failed = sum(result['failed_tests'] for result in self.test_results)
        
        overall_success = all(result['overall_success'] for result in self.test_results)
        
        execution_time = None
        if self.start_time and self.end_time:
            execution_time = (self.end_time - self.start_time).total_seconds()
        
        final_report = {
            'execution_summary': {
                'start_time': self.start_time.strftime('%Y-%m-%d %H:%M:%S') if self.start_time else None,
                'end_time': self.end_time.strftime('%Y-%m-%d %H:%M:%S') if self.end_time else None,
                'execution_time_seconds': execution_time,
                'browser_used': self.browser_type,
                'base_url': self.config.BASE_URL
            },
            'test_summary': {
                'total_strategies': len(self.test_results),
                'total_tests': total_tests,
                'total_passed': total_passed,
                'total_failed': total_failed,
                'success_rate': (total_passed / total_tests * 100) if total_tests > 0 else 0,
                'overall_success': overall_success
            },
            'strategy_results': self.test_results,
            'detailed_breakdown': self._generate_detailed_breakdown()
        }
        
        return final_report
    
    def _generate_detailed_breakdown(self):
        """
        Gera um breakdown detalhado dos testes.
        
        Returns:
            dict: Breakdown detalhado
        """
        breakdown = {
            'by_strategy': {},
            'failed_tests': [],
            'passed_tests': []
        }
        
        for result in self.test_results:
            strategy_name = result['strategy_name']
            
            breakdown['by_strategy'][strategy_name] = {
                'total': result['total_tests'],
                'passed': result['passed_tests'],
                'failed': result['failed_tests'],
                'success_rate': result['success_rate']
            }
            
            # Coletar testes falhos e bem-sucedidos
            for test_detail in result.get('detailed_results', []):
                test_info = {
                    'strategy': strategy_name,
                    'test_name': test_detail['test_name'],
                    'message': test_detail['message'],
                    'timestamp': test_detail['timestamp']
                }
                
                if test_detail['passed']:
                    breakdown['passed_tests'].append(test_info)
                else:
                    breakdown['failed_tests'].append(test_info)
        
        return breakdown
    
    def _export_reports(self, final_report):
        """
        Exporta os relatórios nos formatos configurados.
        
        Args:
            final_report (dict): Relatório final para exportar
        """
        logger.info("📊 Exportando relatórios")
        
        try:
            # Exportar JSON
            if self.config.EXPORT_JSON:
                json_path = self.config.get_report_file_path('json')
                with open(json_path, 'w', encoding='utf-8') as f:
                    json.dump(final_report, f, indent=2, ensure_ascii=False)
                logger.info(f"📄 Relatório JSON exportado: {json_path}")
            
            # Exportar Excel
            if self.config.EXPORT_EXCEL:
                self._export_excel_report(final_report)
            
            # Log do resumo final
            self._log_final_summary(final_report)
            
        except Exception as e:
            logger.error(f"❌ Erro ao exportar relatórios: {str(e)}")
    
    def _export_excel_report(self, final_report):
        """
        Exporta relatório em formato Excel.
        
        Args:
            final_report (dict): Relatório final
        """
        try:
            import pandas as pd
            
            excel_path = self.config.get_report_file_path('xlsx')
            
            # Criar DataFrames para diferentes abas
            summary_data = {
                'Métrica': [
                    'Total de Estratégias',
                    'Total de Testes',
                    'Testes Aprovados',
                    'Testes Falharam',
                    'Taxa de Sucesso (%)',
                    'Sucesso Geral',
                    'Tempo de Execução (s)',
                    'Navegador Usado',
                    'URL Base'
                ],
                'Valor': [
                    final_report['test_summary']['total_strategies'],
                    final_report['test_summary']['total_tests'],
                    final_report['test_summary']['total_passed'],
                    final_report['test_summary']['total_failed'],
                    round(final_report['test_summary']['success_rate'], 2),
                    'Sim' if final_report['test_summary']['overall_success'] else 'Não',
                    final_report['execution_summary']['execution_time_seconds'],
                    final_report['execution_summary']['browser_used'],
                    final_report['execution_summary']['base_url']
                ]
            }
            
            summary_df = pd.DataFrame(summary_data)
            
            # DataFrame de testes detalhados
            detailed_tests = []
            for result in final_report['strategy_results']:
                for test in result.get('detailed_results', []):
                    detailed_tests.append({
                        'Estratégia': result['strategy_name'],
                        'Teste': test['test_name'],
                        'Status': 'Aprovado' if test['passed'] else 'Falhou',
                        'Mensagem': test['message'],
                        'Timestamp': test['timestamp']
                    })
            
            detailed_df = pd.DataFrame(detailed_tests)
            
            # Escrever no Excel
            with pd.ExcelWriter(excel_path, engine='openpyxl') as writer:
                summary_df.to_excel(writer, sheet_name='Resumo', index=False)
                detailed_df.to_excel(writer, sheet_name='Testes Detalhados', index=False)
            
            logger.info(f"📊 Relatório Excel exportado: {excel_path}")
            
        except ImportError:
            logger.warning("⚠️ Pandas não disponível. Relatório Excel não gerado.")
        except Exception as e:
            logger.error(f"❌ Erro ao gerar relatório Excel: {str(e)}")
    
    def _log_final_summary(self, final_report):
        """
        Loga o resumo final dos testes.
        
        Args:
            final_report (dict): Relatório final
        """
        summary = final_report['test_summary']
        
        logger.info("=" * 60)
        logger.info("📊 RESUMO FINAL DOS TESTES")
        logger.info("=" * 60)
        logger.info(f"🧪 Total de Testes: {summary['total_tests']}")
        logger.info(f"✅ Testes Aprovados: {summary['total_passed']}")
        logger.info(f"❌ Testes Falharam: {summary['total_failed']}")
        logger.info(f"📈 Taxa de Sucesso: {summary['success_rate']:.1f}%")
        logger.info(f"🎯 Sucesso Geral: {'SIM' if summary['overall_success'] else 'NÃO'}")
        
        if final_report['execution_summary']['execution_time_seconds']:
            logger.info(f"⏱️ Tempo de Execução: {final_report['execution_summary']['execution_time_seconds']:.1f}s")
        
        logger.info("=" * 60)