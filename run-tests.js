#!/usr/bin/env node

/**
 * Script de Teste Automatizado - Correções de Texto e Progresso
 * Criminal Minds Game
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Iniciando testes automatizados...\n');

// Função para verificar se um arquivo existe
function fileExists(filePath) {
    return fs.existsSync(filePath);
}

// Função para verificar conteúdo de um arquivo
function checkFileContent(filePath, searchText) {
    if (!fileExists(filePath)) {
        return { exists: false, found: false };
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const found = content.includes(searchText);
    
    return { exists: true, found };
}

// Função para verificar múltiplas ocorrências
function checkMultipleOccurrences(filePath, searchText) {
    if (!fileExists(filePath)) {
        return { exists: false, count: 0 };
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    
    return { exists: true, count };
}

// Função para testar correções
function runTests() {
    console.log('📋 Executando testes...\n');
    
    let passedTests = 0;
    let totalTests = 0;
    
    // Teste 1: Verificar se o arquivo principal existe
    totalTests++;
    console.log('🔍 Teste 1: Verificando arquivo principal...');
    if (fileExists('investigation-cards.html')) {
        console.log('✅ investigation-cards.html encontrado');
        passedTests++;
    } else {
        console.log('❌ investigation-cards.html não encontrado');
    }
    
    // Teste 2: Verificar se o texto está centralizado
    totalTests++;
    console.log('\n🔍 Teste 2: Verificando centralização do texto...');
    const textAlignmentCheck = checkMultipleOccurrences('investigation-cards.html', 'text-align: center');
    if (textAlignmentCheck.exists && textAlignmentCheck.count >= 2) {
        console.log(`✅ Texto centralizado encontrado (${textAlignmentCheck.count} ocorrências)`);
        passedTests++;
    } else {
        console.log('❌ Texto centralizado não encontrado ou insuficiente');
    }
    
    // Teste 3: Verificar se a mensagem "Todas as cartas foram jogadas" está correta
    totalTests++;
    console.log('\n🔍 Teste 3: Verificando mensagem de conclusão...');
    const messageCheck = checkMultipleOccurrences('investigation-cards.html', 'Todas as cartas foram jogadas');
    if (messageCheck.exists && messageCheck.count >= 2) {
        console.log(`✅ Mensagem encontrada (${messageCheck.count} ocorrências)`);
        passedTests++;
    } else {
        console.log('❌ Mensagem não encontrada ou insuficiente');
    }
    
    // Teste 4: Verificar se a barra de progresso usa o total correto
    totalTests++;
    console.log('\n🔍 Teste 4: Verificando cálculo da barra de progresso...');
    const progressCheck = checkFileContent('investigation-cards.html', 'difficultySettings[currentDifficulty].cards');
    if (progressCheck.found) {
        console.log('✅ Cálculo da barra de progresso corrigido');
        passedTests++;
    } else {
        console.log('❌ Cálculo da barra de progresso não corrigido');
    }
    
    // Teste 5: Verificar se o grid-column está correto
    totalTests++;
    console.log('\n🔍 Teste 5: Verificando layout do grid...');
    const gridCheck = checkFileContent('investigation-cards.html', 'grid-column: 1 / -1');
    if (gridCheck.found) {
        console.log('✅ Layout do grid corrigido');
        passedTests++;
    } else {
        console.log('❌ Layout do grid não corrigido');
    }
    
    // Teste 6: Verificar se o arquivo de teste existe
    totalTests++;
    console.log('\n🔍 Teste 6: Verificando arquivo de teste...');
    if (fileExists('test-text-progress-fix.html')) {
        console.log('✅ test-text-progress-fix.html encontrado');
        passedTests++;
    } else {
        console.log('❌ test-text-progress-fix.html não encontrado');
    }
    
    // Teste 7: Verificar se a documentação existe
    totalTests++;
    console.log('\n🔍 Teste 7: Verificando documentação...');
    const docsExist = fileExists('LOGICA_EVIDENCIAS.md') && fileExists('LOGICA_COMBO_STREAK.md');
    if (docsExist) {
        console.log('✅ Documentação encontrada');
        passedTests++;
    } else {
        console.log('❌ Documentação não encontrada');
    }
    
    // Teste 8: Verificar se o limite de cartas está implementado
    totalTests++;
    console.log('\n🔍 Teste 8: Verificando limite de cartas...');
    const limitCheck = checkFileContent('investigation-cards.html', 'cardsPlayed >= maxCardsForLevel');
    if (limitCheck.found) {
        console.log('✅ Limite de cartas implementado');
        passedTests++;
    } else {
        console.log('❌ Limite de cartas não implementado');
    }
    
    // Teste 9: Verificar se a notificação de limite existe
    totalTests++;
    console.log('\n🔍 Teste 9: Verificando notificação de limite...');
    const notificationCheck = checkFileContent('investigation-cards.html', 'showLimitNotification');
    if (notificationCheck.found) {
        console.log('✅ Notificação de limite implementada');
        passedTests++;
    } else {
        console.log('❌ Notificação de limite não implementada');
    }
    
    // Teste 10: Verificar se a função updateDynamicCardsCounter existe
    totalTests++;
    console.log('\n🔍 Teste 10: Verificando função dinâmica...');
    const dynamicCheck = checkFileContent('investigation-cards.html', 'updateDynamicCardsCounter');
    if (dynamicCheck.found) {
        console.log('✅ Função dinâmica implementada');
        passedTests++;
    } else {
        console.log('❌ Função dinâmica não implementada');
    }
    
    // Resultados finais
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESULTADOS DOS TESTES');
    console.log('='.repeat(50));
    console.log(`✅ Testes aprovados: ${passedTests}/${totalTests}`);
    console.log(`❌ Testes reprovados: ${totalTests - passedTests}/${totalTests}`);
    console.log(`📈 Taxa de sucesso: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (passedTests === totalTests) {
        console.log('\n🎉 TODOS OS TESTES PASSARAM!');
        console.log('✅ Correções implementadas com sucesso');
    } else {
        console.log('\n⚠️ ALGUNS TESTES FALHARAM');
        console.log('🔧 Verifique as correções necessárias');
    }
    
    console.log('\n📋 Resumo das correções:');
    console.log('• Texto centralizado na mensagem de conclusão');
    console.log('• Barra de progresso usando total correto por nível');
    console.log('• Layout do grid corrigido');
    console.log('• Limite de cartas implementado');
    console.log('• Notificação de limite adicionada');
    console.log('• Função dinâmica para contadores');
    
    return passedTests === totalTests;
}

// Executar testes
const success = runTests();

// Retornar código de saída
process.exit(success ? 0 : 1);
