#!/usr/bin/env python3
"""
Teste simples de conectividade com o site
"""
import time
import requests

def test_site():
    url = "http://localhost:3001"
    print(f"🔍 Testando conectividade com {url}")
    
    for i in range(5):
        try:
            response = requests.get(url, timeout=10)
            print(f"✅ Site está acessível! Status: {response.status_code}")
            return True
        except Exception as e:
            print(f"❌ Tentativa {i+1}/5 falhou: {e}")
            time.sleep(2)
    
    return False

if __name__ == "__main__":
    if test_site():
        print("🎉 Site está funcionando! Pronto para testes de automação.")
    else:
        print("💥 Site não está acessível. Verifique se o servidor está rodando.")