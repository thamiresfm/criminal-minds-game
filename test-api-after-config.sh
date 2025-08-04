#!/bin/bash

# ========================================
# TESTE DA API APÓS CONFIGURAÇÃO VERCEL
# ========================================

echo "🧪 TESTANDO API CRIMINAL MINDS GAME..."
echo "=====================================\n"

# 1. Testar Health Check
echo "1️⃣ TESTANDO HEALTH CHECK:"
echo "🔗 URL: https://criminal-minds-game-api.vercel.app/api/health"
echo ""

health_response=$(curl -s "https://criminal-minds-game-api.vercel.app/api/health")
echo "📤 Resposta:"
echo "$health_response" | jq . 2>/dev/null || echo "$health_response"
echo ""

# Verificar se database está conectado
if echo "$health_response" | grep -q '"database":"connected"'; then
    echo "✅ DATABASE: CONECTADO"
    database_status="OK"
else
    echo "❌ DATABASE: FALHOU"
    database_status="ERRO"
fi
echo ""

# 2. Testar registro de usuário (se database OK)
if [ "$database_status" = "OK" ]; then
    echo "2️⃣ TESTANDO REGISTRO DE USUÁRIO:"
    
    # Gerar email único para teste
    timestamp=$(date +%s)
    test_email="teste_${timestamp}@criminalmindsgame.com"
    
    echo "📧 Email de teste: $test_email"
    
    register_response=$(curl -s -X POST "https://criminal-minds-game-api.vercel.app/api/auth/register" \
        -H "Content-Type: application/json" \
        -H "Origin: https://thamiresfm.github.io" \
        -d "{
            \"fullName\": \"Teste User $timestamp\",
            \"email\": \"$test_email\",
            \"detectiveName\": \"Detective_$timestamp\",
            \"password\": \"123456\"
        }")
    
    echo "📤 Resposta do registro:"
    echo "$register_response" | jq . 2>/dev/null || echo "$register_response"
    echo ""
    
    if echo "$register_response" | grep -q '"success":true'; then
        echo "✅ REGISTRO: FUNCIONANDO"
        
        # 3. Testar login
        echo ""
        echo "3️⃣ TESTANDO LOGIN:"
        
        login_response=$(curl -s -X POST "https://criminal-minds-game-api.vercel.app/api/auth/login" \
            -H "Content-Type: application/json" \
            -H "Origin: https://thamiresfm.github.io" \
            -d "{
                \"email\": \"$test_email\",
                \"password\": \"123456\"
            }")
        
        echo "📤 Resposta do login:"
        echo "$login_response" | jq . 2>/dev/null || echo "$login_response"
        echo ""
        
        if echo "$login_response" | grep -q '"success":true'; then
            echo "✅ LOGIN: FUNCIONANDO"
            login_status="OK"
        else
            echo "❌ LOGIN: FALHOU"
            login_status="ERRO"
        fi
    else
        echo "❌ REGISTRO: FALHOU"
        login_status="ERRO"
    fi
else
    echo "⏭️  PULANDO TESTES DE USUÁRIO (DATABASE OFF)"
    login_status="PULADO"
fi

echo ""
echo "========================================="
echo "📊 RESUMO DOS TESTES:"
echo "========================================="
echo "🗄️  Database: $database_status"
echo "👤 Registro: $([ "$database_status" = "OK" ] && [ "$login_status" = "OK" ] && echo "OK" || echo "N/A")"
echo "🔐 Login: $login_status"
echo ""

if [ "$database_status" = "OK" ] && [ "$login_status" = "OK" ]; then
    echo "🎉 RESULTADO: API 100% FUNCIONAL!"
    echo "✅ Sistema pronto para uso completo"
    echo ""
    echo "🌐 Teste no navegador:"
    echo "   https://thamiresfm.github.io/criminal-minds-game/login.html"
elif [ "$database_status" = "OK" ]; then
    echo "⚠️  RESULTADO: DATABASE OK, mas problemas com auth"
    echo "🔧 Verifique logs do Vercel para detalhes"
else
    echo "❌ RESULTADO: DATABASE CONNECTION FAILED"
    echo "🔧 Verifique BD_URL no Vercel Environment Variables"
    echo ""
    echo "📋 PRÓXIMOS PASSOS:"
    echo "   1. Confirme BD_URL está correta"
    echo "   2. Faça redeploy no Vercel"
    echo "   3. Execute este teste novamente"
fi

echo ""
echo "🔄 Para executar novamente: bash test-api-after-config.sh"