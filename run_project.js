#!/usr/bin/env node

// ========================================
// CRIMINAL MINDS GAME - SCRIPT DE EXECUÇÃO AUTOMATIZADA (Node.js)
// ========================================

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores ANSI
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    purple: '\x1b[35m',
    cyan: '\x1b[36m'
};

// Funções de logging
const log = {
    info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
    warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
    header: () => console.log(`${colors.purple}
🕵️‍♂️ ====================================
   CRIMINAL MINDS GAME
   Script de Execução Automatizada
   ====================================
${colors.reset}`)
};

// Função para executar comando e retornar promise
function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else {
                resolve(stdout);
            }
        });
    });
}

// Função para verificar se comando existe
async function commandExists(command) {
    try {
        const checkCmd = process.platform === 'win32' ? `where ${command}` : `which ${command}`;
        await execCommand(checkCmd);
        return true;
    } catch {
        return false;
    }
}

// Função para matar processos na porta 3000
async function killExistingProcesses() {
    log.info('Verificando processos existentes...');
    
    try {
        const killCmd = process.platform === 'win32' 
            ? 'netstat -ano | findstr :3000 && taskkill /f /pid'
            : 'lsof -ti:3000 | xargs kill -9';
            
        await execCommand(killCmd);
        log.success('Processos existentes finalizados!');
    } catch {
        log.info('Nenhum processo existente encontrado na porta 3000.');
    }
}

// Função principal
async function main() {
    try {
        console.clear();
        log.header();
        
        // 1. Verificar Node.js e npm
        log.info(`Diretório atual: ${process.cwd()}`);
        
        if (!(await commandExists('node'))) {
            log.error('Node.js não está instalado!');
            process.exit(1);
        }
        
        if (!(await commandExists('npm'))) {
            log.error('npm não está instalado!');
            process.exit(1);
        }
        
        const nodeVersion = await execCommand('node --version');
        const npmVersion = await execCommand('npm --version');
        log.success(`Node.js ${nodeVersion.trim()} e npm ${npmVersion.trim()} encontrados!`);
        
        // 2. Verificar diretório do projeto
        const projectDir = path.join(process.cwd(), 'criminal-minds-game');
        if (!fs.existsSync(projectDir)) {
            log.error("Diretório 'criminal-minds-game' não encontrado!");
            log.info('Certifique-se de estar no diretório correto.');
            process.exit(1);
        }
        
        log.info('Entrando no diretório do projeto...');
        process.chdir(projectDir);
        
        // 3. Verificar package.json
        if (!fs.existsSync('package.json')) {
            log.error('package.json não encontrado!');
            process.exit(1);
        }
        
        // 4. Limpar processos existentes
        await killExistingProcesses();
        
        // 5. Verificar e instalar dependências
        if (!fs.existsSync('node_modules')) {
            log.warning('node_modules não encontrado. Instalando dependências...');
            await execCommand('npm install');
            log.success('Dependências instaladas!');
        } else {
            log.success('node_modules encontrado!');
        }
        
        // 6. Limpar cache do Next.js
        if (fs.existsSync('.next')) {
            log.info('Limpando cache do Next.js...');
            fs.rmSync('.next', { recursive: true, force: true });
            log.success('Cache limpo!');
        }
        
        // 7. Mostrar informações do projeto
        console.log(`${colors.cyan}
📊 INFORMAÇÕES DO PROJETO:
========================
📁 Diretório: ${process.cwd()}
🎯 Projeto: Criminal Minds Game
🚀 Comando: npm run dev
🌐 URL: http://localhost:3000
⏰ Horário: ${new Date().toLocaleString()}

🎮 RECURSOS IMPLEMENTADOS:
• Sistema de Autenticação ✅
• Lobby e Sistema de Pesquisa ✅
• Mapa de Investigação Interativo ✅
• Sistema de Chat em Tempo Real ✅
• Análise de Evidências Dinâmica ✅
• Sistema de Configurações ✅
• Sistema de Notificações ✅
• Lógica de Jogo Dinâmico ✅ (NEW!)

${colors.reset}`);
        
        // 8. Iniciar servidor
        log.info('Iniciando servidor de desenvolvimento...');
        log.success('Servidor será executado em: http://localhost:3000');
        log.warning('Para parar o servidor, pressione Ctrl+C');
        
        console.log(`${colors.green}
🚀 INICIANDO CRIMINAL MINDS GAME...
${colors.reset}`);
        
        // Spawn npm run dev com output em tempo real
        const devProcess = spawn('npm', ['run', 'dev'], {
            stdio: 'inherit',
            shell: true
        });
        
        // Handle cleanup on exit
        process.on('SIGINT', () => {
            console.log(`\n${colors.yellow}🛑 Interrompido pelo usuário...${colors.reset}`);
            devProcess.kill('SIGINT');
            log.success('Criminal Minds Game foi parado com sucesso!');
            process.exit(0);
        });
        
        devProcess.on('error', (error) => {
            log.error(`Erro ao executar npm run dev: ${error.message}`);
            process.exit(1);
        });
        
        devProcess.on('close', (code) => {
            if (code !== 0) {
                log.error(`npm run dev finalizou com código ${code}`);
                process.exit(code);
            }
        });
        
    } catch (error) {
        log.error(`Erro: ${error.message}`);
        if (error.stderr) {
            console.error(error.stderr);
        }
        process.exit(1);
    }
}

// Executar função principal
if (require.main === module) {
    main();
}

module.exports = { main }; 