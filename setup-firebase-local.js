#!/usr/bin/env node

// ========================================
// SETUP FIREBASE LOCAL
// Script para configurar Firebase localmente
// ========================================

const fs = require('fs');
const path = require('path');

console.log('🔥 FIREBASE LOCAL SETUP - Criminal Minds Game\n');

// Verificar se está em ambiente local
const isLocal = process.env.NODE_ENV !== 'production';

if (!isLocal) {
    console.log('⚠️ Este script é apenas para desenvolvimento local.');
    console.log('Em produção, use a variável secreta DADOS_FIREBASE do GitHub.\n');
    process.exit(0);
}

// Função para criar configuração local
function createLocalConfig() {
    console.log('📝 Criando configuração local para desenvolvimento...\n');
    
    // Template de configuração local
    const localConfig = {
        "apiKey": "AIzaSyDEMO_LOCAL_KEY_DESENVOLVIMENTO",
        "authDomain": "criminal-minds-local.firebaseapp.com",
        "projectId": "criminal-minds-local",
        "storageBucket": "criminal-minds-local.appspot.com",
        "messagingSenderId": "123456789012",
        "appId": "1:123456789012:web:localdev"
    };
    
    // Criar arquivo de configuração injetada
    const configScript = `// Configuração Firebase para desenvolvimento local
window.FIREBASE_CONFIG = ${JSON.stringify(localConfig, null, 2)};
console.log('⚠️ Usando configuração Firebase LOCAL para desenvolvimento');
console.log('Para produção, configure DADOS_FIREBASE no GitHub Actions');
`;
    
    try {
        fs.writeFileSync('firebase-config-injected.js', configScript);
        console.log('✅ Arquivo firebase-config-injected.js criado com sucesso!');
        console.log('📝 Configuração local injetada para desenvolvimento.\n');
        
        return true;
    } catch (error) {
        console.error('❌ Erro ao criar arquivo de configuração:', error);
        return false;
    }
}

// Função para adicionar script aos arquivos HTML
function updateHtmlFiles() {
    console.log('📝 Atualizando arquivos HTML para desenvolvimento local...\n');
    
    const htmlFiles = [
        'login.html',
        'register.html', 
        'lobby.html',
        'investigation.html',
        'investigation-cards.html'
    ];
    
    let updated = 0;
    
    htmlFiles.forEach(filename => {
        if (fs.existsSync(filename)) {
            try {
                let content = fs.readFileSync(filename, 'utf8');
                
                // Verificar se já tem o script
                if (!content.includes('firebase-config-injected.js')) {
                    // Adicionar antes do </head>
                    content = content.replace(
                        '</head>',
                        '    <script src="firebase-config-injected.js"></script>\n</head>'
                    );
                    
                    fs.writeFileSync(filename, content);
                    console.log(`✅ Script adicionado a ${filename}`);
                    updated++;
                } else {
                    console.log(`⚠️ Script já existe em ${filename}`);
                }
            } catch (error) {
                console.error(`❌ Erro ao atualizar ${filename}:`, error);
            }
        } else {
            console.log(`⚠️ Arquivo ${filename} não encontrado`);
        }
    });
    
    console.log(`\n📊 ${updated} arquivos atualizados com script Firebase.`);
    return updated > 0;
}

// Função para criar .gitignore se necessário
function updateGitignore() {
    console.log('\n📝 Verificando .gitignore...');
    
    const gitignoreEntries = [
        'firebase-config-injected.js',
        'node_modules/',
        '*.log',
        '.env',
        '.env.local'
    ];
    
    let gitignoreContent = '';
    
    if (fs.existsSync('.gitignore')) {
        gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
    }
    
    let needsUpdate = false;
    gitignoreEntries.forEach(entry => {
        if (!gitignoreContent.includes(entry)) {
            gitignoreContent += `\n${entry}`;
            needsUpdate = true;
        }
    });
    
    if (needsUpdate) {
        fs.writeFileSync('.gitignore', gitignoreContent);
        console.log('✅ .gitignore atualizado com entradas Firebase');
    } else {
        console.log('⚠️ .gitignore já está atualizado');
    }
}

// Função para mostrar próximos passos
function showNextSteps() {
    console.log('\n🎯 PRÓXIMOS PASSOS PARA DESENVOLVIMENTO LOCAL:\n');
    
    console.log('1️⃣ CONFIGURAR PROJETO FIREBASE:');
    console.log('   • Acesse: https://console.firebase.google.com/');
    console.log('   • Crie um novo projeto');
    console.log('   • Ative Authentication (Email/Password)');
    console.log('   • Ative Firestore Database');
    console.log('   • Copie a configuração do projeto\n');
    
    console.log('2️⃣ ATUALIZAR CONFIGURAÇÃO LOCAL:');
    console.log('   • Edite firebase-config-injected.js');
    console.log('   • Substitua pelos dados reais do seu projeto Firebase');
    console.log('   • Mantenha este arquivo local (não commitar)\n');
    
    console.log('3️⃣ CONFIGURAR GITHUB SECRETS:');
    console.log('   • Vá para: GitHub → Settings → Secrets and variables → Actions');
    console.log('   • Crie nova variável: DADOS_FIREBASE');
    console.log('   • Cole a configuração JSON do Firebase');
    console.log('   • Exemplo: {"apiKey":"...","authDomain":"...","projectId":"..."}\n');
    
    console.log('4️⃣ TESTAR LOCALMENTE:');
    console.log('   • Serve os arquivos: npx serve . ou python -m http.server');
    console.log('   • Acesse: http://localhost:3000 ou http://localhost:8000');
    console.log('   • Teste cadastro e login\n');
    
    console.log('5️⃣ DEPLOY AUTOMÁTICO:');
    console.log('   • Commit e push para gh-pages');
    console.log('   • GitHub Actions fará deploy automático');
    console.log('   • Usará a variável secreta DADOS_FIREBASE\n');
    
    console.log('🔗 DOCUMENTAÇÃO COMPLETA:');
    console.log('   • Consulte FIREBASE-SETUP.md para detalhes');
    console.log('   • Guia passo a passo de configuração\n');
}

// Executar setup
function main() {
    try {
        console.log('🚀 Iniciando setup Firebase para desenvolvimento local...\n');
        
        // 1. Criar configuração local
        const configCreated = createLocalConfig();
        
        // 2. Atualizar arquivos HTML
        const htmlUpdated = updateHtmlFiles();
        
        // 3. Atualizar .gitignore
        updateGitignore();
        
        // 4. Mostrar próximos passos
        showNextSteps();
        
        if (configCreated) {
            console.log('✅ SETUP CONCLUÍDO COM SUCESSO!\n');
            console.log('🔥 Firebase configurado para desenvolvimento local.');
            console.log('📝 Configure os dados reais do Firebase para funcionar completamente.\n');
        } else {
            console.log('❌ Setup incompleto. Verifique os erros acima.\n');
        }
        
    } catch (error) {
        console.error('❌ Erro durante o setup:', error);
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = {
    createLocalConfig,
    updateHtmlFiles,
    updateGitignore
};