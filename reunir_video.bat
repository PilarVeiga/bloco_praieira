@echo off
REM Script para reunir as partes do vídeo de demonstração no Windows

echo 🎥 Reunindo partes do vídeo de demonstração dos testes...
echo 📁 Verificando se todas as partes estão presentes...

if not exist "gravacao_testes_part_aa" goto :missing_parts
if not exist "gravacao_testes_part_ab" goto :missing_parts
if not exist "gravacao_testes_part_ac" goto :missing_parts
if not exist "gravacao_testes_part_ad" goto :missing_parts

echo ✅ Todas as partes encontradas!
echo 🔄 Reunindo arquivo original...

copy /b gravacao_testes_part_aa + gravacao_testes_part_ab + gravacao_testes_part_ac + gravacao_testes_part_ad gravacao_testes_reunido.mp4

if exist "gravacao_testes_reunido.mp4" (
    echo ✅ Vídeo reunido com sucesso!
    echo 📊 Tamanho do arquivo reunido:
    dir gravacao_testes_reunido.mp4
    echo.
    echo 🎯 Para assistir o vídeo de demonstração dos testes automatizados:
    echo    - Abra o arquivo 'gravacao_testes_reunido.mp4'
    echo    - O vídeo mostra todos os 16 testes sendo executados
    echo    - Demonstra a navegação automática pelo site do Bloco Praieira
    echo.
    echo 🗑️ Removendo partes temporárias...
    del gravacao_testes_part_*
    echo ✅ Limpeza concluída!
    goto :end
) else (
    echo ❌ Erro ao reunir o vídeo!
    exit /b 1
)

:missing_parts
echo ❌ Algumas partes do vídeo estão faltando!
echo 📋 Partes necessárias:
echo    - gravacao_testes_part_aa
echo    - gravacao_testes_part_ab
echo    - gravacao_testes_part_ac
echo    - gravacao_testes_part_ad
exit /b 1

:end
echo 🎉 Processo concluído!