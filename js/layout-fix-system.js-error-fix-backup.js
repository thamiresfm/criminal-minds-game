/**
 * LAYOUT FIX SYSTEM - Sistema de Correção de Layout
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Corrige layout estranho
 * Ajusta responsividade
 * Melhora organização visual
 */

class LayoutFixSystem {
    constructor() {
        this.config = {
            enableLayoutFix: true,
            improveResponsiveness: true,
            fixVisualAlignment: true,
            optimizeGridLayout: true
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🎨 LayoutFixSystem: Inicializando correção de layout...');
        
        try {
            this.fixGridLayout();
            this.improveCardDesign();
            this.optimizeHeaderLayout();
            this.fixSidebarAlignment();
            this.enhanceResponsiveness();
            
            console.log('✅ LayoutFixSystem: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ LayoutFixSystem: Erro na inicialização', error);
        }
    }

    /**
     * Corrigir layout do grid
     */
    fixGridLayout() {
        console.log('🏗️ Corrigindo layout do grid...');
        
        const gridStyle = document.createElement('style');
        gridStyle.textContent = `
            /* Correção do Layout do Grid */
            .game-container {
                display: grid;
                grid-template-columns: 280px 1fr 280px;
                grid-template-rows: 80px 1fr;
                height: 100vh;
                gap: 1rem;
                padding: 1rem;
                max-width: 1400px;
                margin: 0 auto;
            }
            
            /* Layout responsivo melhorado */
            @media (max-width: 1200px) {
                .game-container {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto 1fr auto;
                    height: auto;
                    min-height: 100vh;
                    padding: 0.8rem;
                }
                
                .header {
                    grid-column: 1;
                    grid-row: 1;
                }
                
                .sidebar:first-of-type {
                    grid-column: 1;
                    grid-row: 2;
                }
                
                .main-area {
                    grid-column: 1;
                    grid-row: 3;
                }
                
                .sidebar:last-of-type {
                    grid-column: 1;
                    grid-row: 4;
                }
            }
            
            @media (max-width: 768px) {
                .game-container {
                    padding: 0.5rem;
                    gap: 0.5rem;
                }
                
                .header {
                    padding: 0.8rem 1rem;
                }
                
                .case-title {
                    font-size: 1.4rem;
                }
                
                .timer {
                    font-size: 1.1rem;
                }
            }
        `;
        
        if (document.head) {
            document.head.appendChild(gridStyle);
        } else {
            console.warn('⚠️ HEAD ausente ao aplicar gridStyle');
        }
        
        console.log('✅ Layout do grid corrigido');
    }

    /**
     * Melhorar design das cartas
     */
    improveCardDesign() {
        console.log('🃏 Melhorando design das cartas...');
        
        const cardStyle = document.createElement('style');
        cardStyle.textContent = `
            /* Melhorias no Design das Cartas */
            .cards-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
                padding: 1rem;
            }
            
            .card {
                position: relative;
                width: 100%;
                max-width: 280px;
                height: 180px;
                border-radius: 15px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transform-style: preserve-3d;
                perspective: 1000px;
                margin: 0 auto;
            }
            
            .card:hover {
                transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
                box-shadow: 0 20px 40px rgba(251, 191, 36, 0.2);
            }
            
            .card-inner {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 15px;
                overflow: hidden;
                background: linear-gradient(135deg, rgba(22, 33, 62, 0.9), rgba(15, 15, 35, 0.9));
                border: 2px solid transparent;
                background-clip: padding-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            
            /* Responsividade das cartas */
            @media (max-width: 1200px) {
                .cards-container {
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                }
                
                .card {
                    max-width: 250px;
                    height: 160px;
                }
            }
            
            @media (max-width: 768px) {
                .cards-container {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .card {
                    max-width: 100%;
                    height: 140px;
                }
            }
        `;
        
        if (document.head) {
            document.head.appendChild(cardStyle);
        } else {
            console.warn('⚠️ HEAD ausente ao aplicar cardStyle');
        }
        
        console.log('✅ Design das cartas melhorado');
    }

    /**
     * Otimizar layout do header
     */
    optimizeHeaderLayout() {
        console.log('📋 Otimizando layout do header...');
        
        const headerStyle = document.createElement('style');
        headerStyle.textContent = `
            /* Otimização do Header */
            .header {
                grid-column: 1 / -1;
                background: rgba(15, 15, 35, 0.95);
                border: 2px solid rgba(251, 191, 36, 0.4);
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 2rem;
                backdrop-filter: blur(15px);
                box-shadow: 0 8px 32px rgba(251, 191, 36, 0.1);
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .header > div {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .case-title {
                font-size: 1.8rem;
                font-weight: 800;
                background: linear-gradient(45deg, #fbbf24, #f59e0b, #f97316);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
                white-space: nowrap;
            }
            
            .timer {
                font-size: 1.4rem;
                color: #ef4444;
                font-weight: 700;
                text-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
                white-space: nowrap;
            }
            
            /* Responsividade do header */
            @media (max-width: 768px) {
                .header {
                    padding: 1rem;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .case-title {
                    font-size: 1.4rem;
                }
                
                .timer {
                    font-size: 1.1rem;
                }
                
                .header > div {
                    justify-content: center;
                }
            }
        `;
        
        if (document.head) {
            document.head.appendChild(headerStyle);
        } else {
            console.warn('⚠️ HEAD ausente ao aplicar headerStyle');
        }
        
        console.log('✅ Layout do header otimizado');
    }

    /**
     * Corrigir alinhamento das sidebars
     */
    fixSidebarAlignment() {
        console.log('📐 Corrigindo alinhamento das sidebars...');
        
        const sidebarStyle = document.createElement('style');
        sidebarStyle.textContent = `
            /* Correção do Alinhamento das Sidebars */
            .sidebar {
                background: rgba(15, 15, 35, 0.95);
                border: 2px solid rgba(251, 191, 36, 0.3);
                border-radius: 20px;
                padding: 1rem;
                backdrop-filter: blur(15px);
                overflow-y: auto;
                overflow-x: visible;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                min-width: 0;
                max-width: 100%;
                height: fit-content;
                max-height: calc(100vh - 120px);
            }
            
            .main-area {
                background: rgba(15, 15, 35, 0.95);
                border: 2px solid rgba(251, 191, 36, 0.3);
                border-radius: 20px;
                padding: 2rem;
                backdrop-filter: blur(15px);
                overflow-y: auto;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                height: fit-content;
                max-height: calc(100vh - 120px);
            }
            
            /* Responsividade das sidebars */
            @media (max-width: 1200px) {
                .sidebar {
                    padding: 1rem 0.8rem;
                    overflow-x: visible;
                    max-height: none;
                }
                
                .main-area {
                    padding: 1.5rem;
                    max-height: none;
                }
            }
            
            @media (max-width: 768px) {
                .sidebar {
                    padding: 0.8rem 0.6rem;
                }
                
                .main-area {
                    padding: 1rem;
                }
            }
        `;
        
        if (document.head) {
            document.head.appendChild(sidebarStyle);
        } else {
            console.warn('⚠️ HEAD ausente ao aplicar sidebarStyle');
        }
        
        console.log('✅ Alinhamento das sidebars corrigido');
    }

    /**
     * Melhorar responsividade
     */
    enhanceResponsiveness() {
        console.log('📱 Melhorando responsividade...');
        
        const responsiveStyle = document.createElement('style');
        responsiveStyle.textContent = `
            /* Melhorias na Responsividade */
            @media (max-width: 1024px) {
                .game-container {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto 1fr auto;
                    height: auto;
                    min-height: 100vh;
                }
                
                .cards-container {
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                }
                
                .card {
                    max-width: 250px;
                }
            }
            
            @media (max-width: 768px) {
                .game-container {
                    padding: 0.5rem;
                    gap: 0.5rem;
                }
                
                .cards-container {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .card {
                    max-width: 100%;
                    height: 140px;
                }
                
                .hand-cards {
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .mini-card {
                    min-width: 100px;
                    height: 70px;
                }
            }
            
            @media (max-width: 480px) {
                .game-container {
                    padding: 0.3rem;
                }
                
                .header {
                    padding: 0.8rem;
                }
                
                .case-title {
                    font-size: 1.2rem;
                }
                
                .timer {
                    font-size: 1rem;
                }
                
                .btn {
                    padding: 0.6rem 1rem;
                    font-size: 0.8rem;
                }
            }
        `;
        
        if (document.head) {
            document.head.appendChild(responsiveStyle);
        } else {
            console.warn('⚠️ HEAD ausente ao aplicar responsiveStyle');
        }
        
        console.log('✅ Responsividade melhorada');
    }

    /**
     * Verificar status do layout
     */
    checkLayoutStatus() {
        console.log('🔍 Verificando status do layout...');
        
        const elements = {
            gameContainer: document.querySelector('.game-container'),
            header: document.querySelector('.header'),
            mainArea: document.querySelector('.main-area'),
            sidebars: document.querySelectorAll('.sidebar'),
            cardsContainer: document.querySelector('.cards-container'),
            cards: document.querySelectorAll('.card')
        };
        
        let allGood = true;
        
        Object.entries(elements).forEach(([name, element]) => {
            if (element) {
                if (Array.isArray(element) || element.length > 0) {
                    console.log(`✅ ${name}: OK (${element.length} elementos)`);
                } else {
                    console.log(`✅ ${name}: OK`);
                }
            } else {
                console.log(`❌ ${name}: Faltando`);
                allGood = false;
            }
        });
        
        console.log(`📊 Status do layout: ${allGood ? '✅ Funcionando' : '⚠️ Problemas detectados'}`);
        
        return allGood;
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('🎨 Executando correção de layout...');
        
        // Aplicar correções
        this.fixGridLayout();
        this.improveCardDesign();
        this.optimizeHeaderLayout();
        this.fixSidebarAlignment();
        this.enhanceResponsiveness();
        
        // Verificar status
        setTimeout(() => {
            this.checkLayoutStatus();
        }, 500);
        
        console.log('✅ Correção de layout executada');
    }
}

// Exportar para uso global
window.LayoutFixSystem = LayoutFixSystem; 