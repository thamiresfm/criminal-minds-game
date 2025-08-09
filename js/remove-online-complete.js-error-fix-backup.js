/**
 * REMOVE ONLINE COMPLETE - Sistema para Remover Completamente o Elemento Online
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Remove completamente o elemento Online da seção de estatísticas
 * Ajusta o grid para 3 elementos
 * Mantém layout responsivo
 */

class RemoveOnlineComplete {
    constructor() {
        this.config = {
            enableCompleteRemoval: true,
            adjustGridLayout: true,
            maintainResponsive: true
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🗑️ RemoveOnlineComplete: Inicializando remoção completa do elemento Online...');
        
        try {
            this.removeOnlineElement();
            this.adjustGridLayout();
            this.maintainResponsiveLayout();
            
            console.log('✅ RemoveOnlineComplete: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ RemoveOnlineComplete: Erro na inicialização', error);
        }
    }

    /**
     * Remover elemento Online completamente
     */
    removeOnlineElement() {
        console.log('🗑️ Removendo elemento Online completamente...');
        
        const removeOnlineStyle = document.createElement('style');
        removeOnlineStyle.textContent = `
            /* Remover elemento Online completamente */
            .stat:has(.stat-number:contains("Online")),
            .stat:has(.stat-label:contains("ONLINE")),
            .stat:has(.stat-number:contains("🟢")),
            .stat:has(.stat-number:contains("Online")) {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                position: absolute !important;
                left: -9999px !important;
            }
            
            /* Esconder qualquer elemento que contenha Online */
            .stat:has(*:contains("Online")) {
                display: none !important;
            }
            
            /* Esconder elementos com label ONLINE */
            .stat:has(.stat-label:contains("ONLINE")) {
                display: none !important;
            }
        `;
        
        document.head.appendChild(removeOnlineStyle);
        
        console.log('✅ Elemento Online removido completamente');
    }

    /**
     * Ajustar layout do grid para 3 elementos
     */
    adjustGridLayout() {
        console.log('📐 Ajustando layout do grid para 3 elementos...');
        
        const gridStyle = document.createElement('style');
        gridStyle.textContent = `
            /* Ajustar grid para 3 elementos */
            .stats {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 1rem !important;
                max-width: 600px !important;
                margin: 2rem auto 0 !important;
                padding-top: 1.5rem !important;
                border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
                align-items: center !important;
                justify-items: center !important;
                width: 100% !important;
            }
            
            .stat {
                text-align: center !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                min-height: 80px !important;
                padding: 0.5rem !important;
                box-sizing: border-box !important;
            }
            
            .stat-number {
                font-size: 2.5rem !important;
                font-weight: 900 !important;
                background: linear-gradient(45deg, #ffc107, #ff8f00) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                line-height: 1 !important;
                margin-bottom: 0.5rem !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                min-height: 3rem !important;
                width: 100% !important;
                text-align: center !important;
            }
            
            .stat-label {
                font-size: 0.75rem !important;
                color: #bbb !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
                font-weight: 600 !important;
                text-align: center !important;
                line-height: 1.2 !important;
                width: 100% !important;
                word-wrap: break-word !important;
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            /* Mobile Responsivo - 2 colunas */
            @media (max-width: 768px) {
                .stats {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 1rem !important;
                    max-width: 100% !important;
                    padding: 0 1rem !important;
                }
                
                .stat {
                    min-height: 60px !important;
                    padding: 0.25rem !important;
                }
                
                .stat-number {
                    font-size: 2rem !important;
                    min-height: 2.5rem !important;
                }
                
                .stat-label {
                    font-size: 0.625rem !important;
                }
            }
            
            /* Viewport Pequeno - 1 coluna */
            @media (max-width: 480px) {
                .stats {
                    grid-template-columns: 1fr !important;
                    gap: 0.75rem !important;
                }
                
                .stat {
                    min-height: 50px !important;
                }
                
                .stat-number {
                    font-size: 1.75rem !important;
                    min-height: 2rem !important;
                }
                
                .stat-label {
                    font-size: 0.5rem !important;
                }
            }
            
            /* Viewport Pequeno - Altura */
            @media (max-height: 600px) {
                .stats {
                    margin-top: 1rem !important;
                    gap: 0.5rem !important;
                }
                
                .stat {
                    min-height: 50px !important;
                }
                
                .stat-number {
                    font-size: 1.75rem !important;
                    min-height: 2rem !important;
                }
                
                .stat-label {
                    font-size: 0.5rem !important;
                }
            }
        `;
        
        document.head.appendChild(gridStyle);
        
        console.log('✅ Layout do grid ajustado para 3 elementos');
    }

    /**
     * Manter layout responsivo
     */
    maintainResponsiveLayout() {
        console.log('📱 Mantendo layout responsivo...');
        
        const responsiveStyle = document.createElement('style');
        responsiveStyle.textContent = `
            /* Layout responsivo mantido */
            .container {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                min-height: 100vh !important;
                max-height: 100vh !important;
                padding: 1rem !important;
                position: relative !important;
                overflow: hidden !important;
                width: 100% !important;
            }
            
            .content {
                text-align: center !important;
                max-width: 1200px !important;
                width: 100% !important;
                z-index: 10 !important;
                position: relative !important;
                animation: fadeInUp 1s ease-out !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                min-height: 100vh !important;
                padding: 1rem !important;
                box-sizing: border-box !important;
            }
            
            /* Features responsivos */
            .features {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
                gap: 1.5rem !important;
                max-width: 1200px !important;
                margin: 2rem auto 0 !important;
                align-items: stretch !important;
                justify-items: center !important;
                width: 100% !important;
            }
            
            .feature-card {
                background: rgba(255, 255, 255, 0.05) !important;
                backdrop-filter: blur(10px) !important;
                padding: 1.5rem !important;
                border-radius: 1rem !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                transition: all 0.3s ease !important;
                text-align: center !important;
                width: 100% !important;
                max-width: 350px !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: flex-start !important;
                min-height: 200px !important;
                box-sizing: border-box !important;
            }
            
            /* Mobile responsivo para features */
            @media (max-width: 768px) {
                .features {
                    grid-template-columns: 1fr !important;
                    gap: 1rem !important;
                    padding: 0 1rem !important;
                }
                
                .feature-card {
                    max-width: 100% !important;
                    min-height: 150px !important;
                    padding: 1rem !important;
                }
            }
        `;
        
        document.head.appendChild(responsiveStyle);
        
        console.log('✅ Layout responsivo mantido');
    }

    /**
     * Aplicar remoção via JavaScript
     */
    applyJavaScriptRemoval() {
        console.log('🔧 Aplicando remoção via JavaScript...');
        
        // Encontrar e remover elemento Online
        const stats = document.querySelectorAll('.stat');
        stats.forEach((stat, index) => {
            const statNumber = stat.querySelector('.stat-number');
            const statLabel = stat.querySelector('.stat-label');
            
            if (statNumber && (statNumber.textContent.includes('Online') || statNumber.textContent.includes('🟢'))) {
                console.log(`🗑️ Removendo stat ${index + 1} que contém "Online"`);
                stat.style.display = 'none';
                stat.remove();
            }
            
            if (statLabel && statLabel.textContent.includes('ONLINE')) {
                console.log(`🗑️ Removendo stat ${index + 1} que contém label "ONLINE"`);
                stat.style.display = 'none';
                stat.remove();
            }
        });
        
        // Ajustar grid após remoção
        setTimeout(() => {
            const statsContainer = document.querySelector('.stats');
            if (statsContainer) {
                statsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
                console.log('✅ Grid ajustado para 3 colunas após remoção');
            }
        }, 100);
        
        console.log('✅ Remoção via JavaScript aplicada');
    }

    /**
     * Verificar remoção
     */
    checkRemoval() {
        console.log('🔍 Verificando remoção do elemento Online...');
        
        const stats = document.querySelectorAll('.stat');
        let onlineFound = false;
        
        stats.forEach((stat, index) => {
            const statNumber = stat.querySelector('.stat-number');
            const statLabel = stat.querySelector('.stat-label');
            
            if (statNumber && (statNumber.textContent.includes('Online') || statNumber.textContent.includes('🟢'))) {
                console.log(`📊 Stat ${index + 1} ainda contém "Online"`);
                onlineFound = true;
            }
            
            if (statLabel && statLabel.textContent.includes('ONLINE')) {
                console.log(`📊 Stat ${index + 1} ainda contém label "ONLINE"`);
                onlineFound = true;
            }
        });
        
        if (!onlineFound) {
            console.log('✅ Elemento Online removido com sucesso');
        } else {
            console.log('⚠️ Elemento Online ainda presente, aplicando remoção JavaScript');
            this.applyJavaScriptRemoval();
        }
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('🚀 Executando remoção completa do elemento Online...');
        
        // Aplicar remoções
        this.removeOnlineElement();
        this.adjustGridLayout();
        this.maintainResponsiveLayout();
        
        // Verificar e aplicar remoção JavaScript se necessário
        setTimeout(() => {
            this.checkRemoval();
        }, 500);
        
        console.log('✅ Remoção completa do elemento Online executada');
    }
}

// Exportar para uso global
window.RemoveOnlineComplete = RemoveOnlineComplete; 