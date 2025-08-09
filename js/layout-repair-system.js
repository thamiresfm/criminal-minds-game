/**
 * LAYOUT REPAIR SYSTEM - Sistema de Reparação de Layout
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Corrige problemas visuais críticos
 * Melhora alinhamento e responsividade
 * Otimiza experiência visual
 */

class LayoutRepairSystem {
    constructor() {
        this._initialized = false;
        this.config = {
            enableGridFix: true,
            enableResponsiveFix: true,
            enableCardAlignment: true,
            enableSidebarFix: true,
            enableButtonFix: true
        };
        
        this.repairs = [];
        
        // Bind methods
        this.init = this.init.bind(this);
        this.repairMainGrid = this.repairMainGrid.bind(this);
        this.repairCards = this.repairCards.bind(this);
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        if (this._initialized) {
            console.debug('LayoutRepairSystem: init ignorado (já inicializado).');
            return;
        }
        this._initialized = true;
        
        console.log('🔧 LayoutRepairSystem: Iniciando reparação de layout...');
        
        try {
            // Aguardar DOM estar pronto
            setTimeout(() => {
                this.applyLayoutFixes();
                this.repairMainGrid();
                this.repairCards();
                this.repairSidebars();
                this.repairButtons();
                this.addResponsiveImprovements();
                this.generateReport();
                
                console.log('✅ LayoutRepairSystem: Layout reparado com sucesso');
            }, 500);
        } catch (error) {
            console.error('❌ LayoutRepairSystem: Erro na reparação', error);
        }
    }

    /**
     * Aplicar correções gerais de layout
     */
    applyLayoutFixes() {
        console.log('🎨 Aplicando correções gerais de layout...');
        
        const layoutStyle = document.createElement('style');
        layoutStyle.id = 'layout-repair-styles';
        layoutStyle.textContent = `
            /* CORREÇÕES CRÍTICAS DE LAYOUT */
            
            /* Fix do container principal */
            .game-container {
                display: grid !important;
                grid-template-columns: 300px 1fr 300px !important;
                grid-template-rows: 80px 1fr !important;
                height: 100vh !important;
                gap: 1rem !important;
                padding: 1rem !important;
                max-width: 100vw !important;
                overflow: hidden !important;
            }
            
            /* Fix do header */
            .header {
                grid-column: 1 / -1 !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 0 2rem !important;
                min-height: 60px !important;
                max-height: 80px !important;
            }
            
            /* Fix das sidebars */
            .sidebar {
                padding: 1rem !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                max-height: calc(100vh - 120px) !important;
                display: flex !important;
                flex-direction: column !important;
            }
            
            /* Fix da área principal */
            .main-area {
                padding: 1.5rem !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                max-height: calc(100vh - 120px) !important;
            }
            
            /* Fix do container de cartas */
            .cards-container {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1rem !important;
                margin-bottom: 1.5rem !important;
                max-width: 100% !important;
            }
            
            /* Fix das cartas individuais */
            .card {
                width: 100% !important;
                max-width: none !important;
                height: 160px !important;
                margin: 0 !important;
            }
            
            /* Fix da seção Minha Mão */
            .hand-container {
                display: grid !important;
                grid-template-columns: repeat(5, 1fr) !important;
                gap: 0.5rem !important;
                margin-top: 1rem !important;
                padding: 1rem !important;
                background: rgba(15, 15, 35, 0.5) !important;
                border-radius: 15px !important;
                border: 1px solid rgba(251, 191, 36, 0.3) !important;
            }
            
            .hand-container .card {
                height: 120px !important;
                font-size: 0.8rem !important;
            }
            
            /* Fix dos botões da mão */
            .hand-buttons {
                display: flex !important;
                gap: 0.5rem !important;
                margin-top: 1rem !important;
                justify-content: center !important;
                flex-wrap: wrap !important;
            }
            
            .hand-buttons button {
                padding: 0.5rem 1rem !important;
                font-size: 0.85rem !important;
                min-width: auto !important;
                flex: none !important;
            }
            
            /* Fix do chat */
            .chat-container {
                height: 180px !important;
                margin-bottom: 1rem !important;
            }
            
            .chat-input-container {
                margin-top: 0.5rem !important;
            }
            
            /* Fix das estatísticas */
            .stats-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 0.5rem !important;
                margin-bottom: 1rem !important;
            }
            
            .stat-item {
                padding: 0.5rem !important;
                text-align: center !important;
                background: rgba(15, 15, 35, 0.5) !important;
                border-radius: 8px !important;
                border: 1px solid rgba(251, 191, 36, 0.2) !important;
            }
            
            /* Fix dos botões do header */
            .header-buttons {
                display: flex !important;
                gap: 0.5rem !important;
                align-items: center !important;
            }
            
            .header-buttons button {
                padding: 0.5rem 1rem !important;
                font-size: 0.9rem !important;
                white-space: nowrap !important;
            }
            
            /* Responsividade melhorada */
            @media (max-width: 1400px) {
                .game-container {
                    grid-template-columns: 280px 1fr 280px !important;
                }
            }
            
            @media (max-width: 1200px) {
                .game-container {
                    grid-template-columns: 1fr !important;
                    grid-template-rows: auto auto 1fr auto !important;
                    height: auto !important;
                    min-height: 100vh !important;
                }
                
                .sidebar {
                    max-height: none !important;
                }
                
                .main-area {
                    max-height: none !important;
                }
                
                .cards-container {
                    grid-template-columns: repeat(3, 1fr) !important;
                }
                
                .hand-container {
                    grid-template-columns: repeat(7, 1fr) !important;
                }
            }
            
            @media (max-width: 768px) {
                .cards-container {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
                
                .hand-container {
                    grid-template-columns: repeat(4, 1fr) !important;
                }
                
                .header-buttons {
                    flex-direction: column !important;
                    gap: 0.25rem !important;
                }
                
                .header-buttons button {
                    font-size: 0.8rem !important;
                    padding: 0.4rem 0.8rem !important;
                }
            }
            
            @media (max-width: 480px) {
                .cards-container {
                    grid-template-columns: 1fr !important;
                }
                
                .hand-container {
                    grid-template-columns: repeat(3, 1fr) !important;
                }
            }
        `;
        
        // Remover estilo anterior se existir
        const existingStyle = document.getElementById('layout-repair-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        document.head.appendChild(layoutStyle);
        this.repairs.push('Correções gerais de layout aplicadas');
    }

    /**
     * Reparar grid principal
     */
    repairMainGrid() {
        console.log('🏗️ Reparando grid principal...');
        
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            // Garantir estrutura correta
            gameContainer.style.display = 'grid';
            gameContainer.style.gridTemplateColumns = '300px 1fr 300px';
            gameContainer.style.gridTemplateRows = '80px 1fr';
            gameContainer.style.height = '100vh';
            gameContainer.style.gap = '1rem';
            gameContainer.style.padding = '1rem';
            gameContainer.style.maxWidth = '100vw';
            gameContainer.style.overflow = 'hidden';
            
            console.log('✅ Grid principal reparado');
            this.repairs.push('Grid principal otimizado');
        }
    }

    /**
     * Reparar cartas
     */
    repairCards() {
        console.log('🃏 Reparando layout das cartas...');
        
        // Fix do container de cartas
        const cardsContainer = document.querySelector('.cards-container');
        if (cardsContainer) {
            cardsContainer.style.display = 'grid';
            cardsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
            cardsContainer.style.gap = '1rem';
            cardsContainer.style.marginBottom = '1.5rem';
            cardsContainer.style.maxWidth = '100%';
        }
        
        // Fix das cartas individuais
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.width = '100%';
            card.style.maxWidth = 'none';
            card.style.height = '160px';
            card.style.margin = '0';
        });
        
        // Fix da mão do jogador
        let handContainer = document.querySelector('.hand-container');
        if (!handContainer) {
            // Criar container da mão se não existir
            handContainer = document.createElement('div');
            handContainer.className = 'hand-container';
            
            const mainArea = document.querySelector('.main-area');
            if (mainArea) {
                mainArea.appendChild(handContainer);
            }
        }
        
        if (handContainer) {
            handContainer.style.display = 'grid';
            handContainer.style.gridTemplateColumns = 'repeat(5, 1fr)';
            handContainer.style.gap = '0.5rem';
            handContainer.style.marginTop = '1rem';
            handContainer.style.padding = '1rem';
            handContainer.style.background = 'rgba(15, 15, 35, 0.5)';
            handContainer.style.borderRadius = '15px';
            handContainer.style.border = '1px solid rgba(251, 191, 36, 0.3)';
        }
        
        console.log('✅ Layout das cartas reparado');
        this.repairs.push('Layout das cartas otimizado');
    }

    /**
     * Reparar sidebars
     */
    repairSidebars() {
        console.log('📱 Reparando sidebars...');
        
        const sidebars = document.querySelectorAll('.sidebar');
        sidebars.forEach(sidebar => {
            sidebar.style.padding = '1rem';
            sidebar.style.overflowY = 'auto';
            sidebar.style.overflowX = 'hidden';
            sidebar.style.maxHeight = 'calc(100vh - 120px)';
            sidebar.style.display = 'flex';
            sidebar.style.flexDirection = 'column';
        });
        
        // Fix do chat
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.height = '180px';
            chatContainer.style.marginBottom = '1rem';
        }
        
        console.log('✅ Sidebars reparadas');
        this.repairs.push('Sidebars otimizadas');
    }

    /**
     * Reparar botões
     */
    repairButtons() {
        console.log('🔘 Reparando botões...');
        
        // Fix dos botões do header
        const headerButtons = document.querySelector('.header-buttons, .timer');
        if (headerButtons) {
            headerButtons.style.display = 'flex';
            headerButtons.style.gap = '0.5rem';
            headerButtons.style.alignItems = 'center';
        }
        
        // Fix dos botões da mão
        let handButtons = document.querySelector('.hand-buttons');
        if (!handButtons) {
            handButtons = document.createElement('div');
            handButtons.className = 'hand-buttons';
            
            const mainArea = document.querySelector('.main-area');
            if (mainArea) {
                mainArea.appendChild(handButtons);
            }
        }
        
        if (handButtons) {
            handButtons.style.display = 'flex';
            handButtons.style.gap = '0.5rem';
            handButtons.style.marginTop = '1rem';
            handButtons.style.justifyContent = 'center';
            handButtons.style.flexWrap = 'wrap';
        }
        
        console.log('✅ Botões reparados');
        this.repairs.push('Botões otimizados');
    }

    /**
     * Adicionar melhorias responsivas
     */
    addResponsiveImprovements() {
        console.log('📱 Adicionando melhorias responsivas...');
        
        // Detectar tamanho da tela e aplicar ajustes
        const viewport = window.innerWidth;
        
        if (viewport <= 1200) {
            const gameContainer = document.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.style.gridTemplateColumns = '1fr';
                gameContainer.style.gridTemplateRows = 'auto auto 1fr auto';
                gameContainer.style.height = 'auto';
                gameContainer.style.minHeight = '100vh';
            }
        }
        
        if (viewport <= 768) {
            const cardsContainer = document.querySelector('.cards-container');
            if (cardsContainer) {
                cardsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
            
            const handContainer = document.querySelector('.hand-container');
            if (handContainer) {
                handContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
            }
        }
        
        if (viewport <= 480) {
            const cardsContainer = document.querySelector('.cards-container');
            if (cardsContainer) {
                cardsContainer.style.gridTemplateColumns = '1fr';
            }
            
            const handContainer = document.querySelector('.hand-container');
            if (handContainer) {
                handContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }
        }
        
        console.log('✅ Melhorias responsivas aplicadas');
        this.repairs.push('Responsividade melhorada');
    }

    /**
     * Gerar relatório de reparação
     */
    generateReport() {
        console.log('\n🔧 RELATÓRIO DE REPARAÇÃO DE LAYOUT');
        console.log('===================================');
        console.log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
        console.log(`Reparações aplicadas: ${this.repairs.length}`);
        
        this.repairs.forEach((repair, index) => {
            console.log(`${index + 1}. ✅ ${repair}`);
        });
        
        // Salvar relatório
        const report = {
            timestamp: new Date().toISOString(),
            repairType: 'layout_repair',
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            repairs: this.repairs,
            elementsFound: {
                gameContainer: !!document.querySelector('.game-container'),
                cardsContainer: !!document.querySelector('.cards-container'),
                sidebars: document.querySelectorAll('.sidebar').length,
                cards: document.querySelectorAll('.card').length
            }
        };
        
        localStorage.setItem('layout_repair_report', JSON.stringify(report));
        console.log('\n💾 Relatório salvo no localStorage como "layout_repair_report"');
        
        return report;
    }
}

// Exportar para uso global
window.LayoutRepairSystem = LayoutRepairSystem;
