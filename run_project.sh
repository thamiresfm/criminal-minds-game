#!/bin/bash

# ========================================
# CRIMINAL MINDS GAME - SCRIPT DE EXECUÇÃO AUTOMATIZADA
# ========================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Função para print colorido
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}
🕵️‍♂️ ====================================
   CRIMINAL MINDS GAME
   Script de Execução Automatizada
   ====================================
${NC}"
}

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Função para matar processos existentes
kill_existing_processes() {
    print_status "Verificando processos existentes do Node.js..."
    
    # Matar processos do Next.js na porta 3000
    if lsof -ti:3000 >/dev/null 2>&1; then
        print_warning "Matando processo existente na porta 3000..."
        kill -9 $(lsof -ti:3000) 2>/dev/null || true
        sleep 2
    fi
    
    # Matar processos node relacionados ao projeto
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "npm run dev" 2>/dev/null || true
    
    print_success "Processos limpos!"
}

# Função principal
main() {
    clear
    print_header
    
    # 1. Verificar diretório atual
    print_status "Diretório atual: $(pwd)"
    
    # 2. Verificar se Node.js está instalado
    if ! command_exists node; then
        print_error "Node.js não está instalado! Por favor, instale Node.js primeiro."
        exit 1
    fi
    
    if ! command_exists npm; then
        print_error "npm não está instalado! Por favor, instale npm primeiro."
        exit 1
    fi
    
    print_success "Node.js $(node --version) e npm $(npm --version) encontrados!"
    
    # 3. Navegar para o diretório do projeto
    if [ ! -d "criminal-minds-game" ]; then
        print_error "Diretório 'criminal-minds-game' não encontrado!"
        print_status "Certifique-se de estar executando o script no diretório correto."
        exit 1
    fi
    
    print_status "Entrando no diretório do projeto..."
    cd criminal-minds-game
    
    # 4. Verificar package.json
    if [ ! -f "package.json" ]; then
        print_error "package.json não encontrado no diretório do projeto!"
        exit 1
    fi
    
    # 5. Limpar processos existentes
    kill_existing_processes
    
    # 6. Verificar se node_modules existe
    if [ ! -d "node_modules" ]; then
        print_warning "node_modules não encontrado. Instalando dependências..."
        npm install
        if [ $? -ne 0 ]; then
            print_error "Falha ao instalar dependências!"
            exit 1
        fi
        print_success "Dependências instaladas com sucesso!"
    else
        print_status "node_modules encontrado. Verificando se está atualizado..."
        
        # Verificar se precisa atualizar dependências
        if [ package.json -nt node_modules ]; then
            print_warning "package.json foi modificado. Atualizando dependências..."
            npm install
            if [ $? -ne 0 ]; then
                print_error "Falha ao atualizar dependências!"
                exit 1
            fi
            print_success "Dependências atualizadas!"
        else
            print_success "Dependências estão atualizadas!"
        fi
    fi
    
    # 7. Verificar scripts disponíveis
    print_status "Scripts disponíveis no package.json:"
    npm run 2>/dev/null | grep -E "^\s+(dev|build|start)" || true
    
    # 8. Limpar cache do Next.js se existir
    if [ -d ".next" ]; then
        print_status "Limpando cache do Next.js..."
        rm -rf .next
        print_success "Cache limpo!"
    fi
    
    # 9. Verificar se existe script dev
    if npm run | grep -q "dev"; then
        print_success "Script 'dev' encontrado!"
        
        # 10. Mostrar informações do projeto
        echo -e "${CYAN}
📊 INFORMAÇÕES DO PROJETO:
========================
📁 Diretório: $(pwd)
🎯 Projeto: Criminal Minds Game
🚀 Comando: npm run dev
🌐 URL: http://localhost:3000
⏰ Horário: $(date)

🎮 RECURSOS IMPLEMENTADOS:
• Sistema de Autenticação
• Lobby e Sistema de Pesquisa  
• Mapa de Investigação Interativo
• Sistema de Chat em Tempo Real
• Análise de Evidências Dinâmica
• Sistema de Configurações
• Sistema de Notificações
• Lógica de Jogo Dinâmico (NEW!)

${NC}"
        
        # 11. Executar o servidor de desenvolvimento
        print_status "Iniciando servidor de desenvolvimento..."
        print_success "Servidor será executado em: http://localhost:3000"
        print_warning "Para parar o servidor, pressione Ctrl+C"
        
        echo -e "${GREEN}
🚀 INICIANDO CRIMINAL MINDS GAME...
${NC}"
        
        # Executar npm run dev
        npm run dev
        
    else
        print_error "Script 'dev' não encontrado no package.json!"
        print_status "Scripts disponíveis:"
        npm run
        exit 1
    fi
}

# Função para lidar com interrupção (Ctrl+C)
cleanup() {
    echo -e "\n${YELLOW}
🛑 Interrompido pelo usuário...
${NC}"
    print_status "Limpando processos..."
    kill_existing_processes
    print_success "Criminal Minds Game foi parado com sucesso!"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT SIGTERM

# Executar função principal
main "$@" 