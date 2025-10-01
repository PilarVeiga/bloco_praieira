# 🎥 Vídeo de Demonstração dos Testes Automatizados

## 📋 Sobre o Vídeo

O arquivo `gravacao_testes.mp4` (dividido em partes) contém uma demonstração completa da execução dos 16 testes automatizados do projeto Bloco Praieira.

## 📦 Arquivo Dividido

Devido ao limite de tamanho do GitHub (100MB), o vídeo de 148MB foi dividido em 4 partes:

- `gravacao_testes_part_aa` (45MB)
- `gravacao_testes_part_ab` (45MB) 
- `gravacao_testes_part_ac` (45MB)
- `gravacao_testes_part_ad` (13MB)

## 🔧 Como Reunir o Vídeo

### Linux/Mac:
```bash
chmod +x reunir_video.sh
./reunir_video.sh
```

### Windows:
```batch
reunir_video.bat
```

### Manual:
```bash
# Linux/Mac
cat gravacao_testes_part_aa gravacao_testes_part_ab gravacao_testes_part_ac gravacao_testes_part_ad > gravacao_testes_reunido.mp4

# Windows (PowerShell)
Get-Content gravacao_testes_part_aa, gravacao_testes_part_ab, gravacao_testes_part_ac, gravacao_testes_part_ad -Encoding Byte | Set-Content gravacao_testes_reunido.mp4 -Encoding Byte
```

## 🎯 Conteúdo do Vídeo

O vídeo demonstra:

### 🏠 **Testes da Página Inicial (5 testes)**
- Carregamento da página
- Verificação de elementos principais
- Teste de responsividade
- Validação de links
- Verificação de imagens

### 💰 **Testes de Doações (6 testes)**
- Sistema PIX funcionando
- Validação de formulários
- Teste de valores
- QR Code geração
- Feedback ao usuário
- Integração com backend

### 👥 **Testes de Membros (5 testes)**
- Accordion de membros
- CRUD operations
- Filtros e busca
- Validação de dados
- Interface administrativa

## 🛠️ **Padrões de Design Demonstrados**

1. **Page Object Model** - Organização dos elementos da página
2. **Strategy Pattern** - Diferentes estratégias de teste
3. **Factory Method** - Criação de WebDrivers
4. **Singleton Pattern** - Configurações globais
5. **Template Method Pattern** - Estrutura comum dos testes

## 📊 **Métricas de Teste**

- **Total de Testes:** 16
- **Tempo de Execução:** ~8 minutos
- **Taxa de Sucesso:** 100%
- **Cobertura:** Todas as funcionalidades principais
- **Navegadores:** Chrome (demonstrado)

## 🔍 **Detalhes Técnicos**

- **Resolução:** 1920x1080
- **FPS:** 30
- **Duração:** ~8 minutos
- **Formato:** MP4
- **Tamanho Original:** 148MB
- **Ferramentas:** Selenium WebDriver, Python

## 📝 **Observações**

- O vídeo mostra execução em tempo real
- Cada teste é claramente identificado
- Demonstra tanto sucessos quanto tratamento de erros
- Inclui validações visuais e de dados
- Mostra integração completa do sistema

## 🎉 **Após Reunir o Vídeo**

Depois de executar o script de reunião, você terá:
- ✅ `gravacao_testes_reunido.mp4` - Vídeo completo
- 🗑️ Partes temporárias removidas automaticamente
- 📹 Pronto para assistir e compartilhar!