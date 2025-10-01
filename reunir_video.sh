#!/bin/bash
# Script para reunir as partes do vídeo de demonstração

echo "🎥 Reunindo partes do vídeo de demonstração dos testes..."
echo "📁 Verificando se todas as partes estão presentes..."

if [ -f "gravacao_testes_part_aa" ] && [ -f "gravacao_testes_part_ab" ] && [ -f "gravacao_testes_part_ac" ] && [ -f "gravacao_testes_part_ad" ]; then
    echo "✅ Todas as partes encontradas!"
    echo "🔄 Reunindo arquivo original..."
    
    cat gravacao_testes_part_aa gravacao_testes_part_ab gravacao_testes_part_ac gravacao_testes_part_ad > gravacao_testes_reunido.mp4
    
    if [ -f "gravacao_testes_reunido.mp4" ]; then
        echo "✅ Vídeo reunido com sucesso!"
        echo "📊 Tamanho do arquivo reunido:"
        ls -lh gravacao_testes_reunido.mp4
        echo ""
        echo "🎯 Para assistir o vídeo de demonstração dos testes automatizados:"
        echo "   - Abra o arquivo 'gravacao_testes_reunido.mp4'"
        echo "   - O vídeo mostra todos os 16 testes sendo executados"
        echo "   - Demonstra a navegação automática pelo site do Bloco Praieira"
        echo ""
        echo "🗑️  Removendo partes temporárias..."
        rm gravacao_testes_part_*
        echo "✅ Limpeza concluída!"
    else
        echo "❌ Erro ao reunir o vídeo!"
        exit 1
    fi
else
    echo "❌ Algumas partes do vídeo estão faltando!"
    echo "📋 Partes necessárias:"
    echo "   - gravacao_testes_part_aa"
    echo "   - gravacao_testes_part_ab" 
    echo "   - gravacao_testes_part_ac"
    echo "   - gravacao_testes_part_ad"
    exit 1
fi