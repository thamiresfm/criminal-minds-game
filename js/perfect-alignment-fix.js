/**
 * PERFECT ALIGNMENT FIX - Correção Específica de Alinhamento
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Corrige alinhamento específico dos elementos
 * Garante centralização perfeita
 * Aplica grid CSS perfeito
 */

class PerfectAlignmentFix {
    constructor() {
        this.config = {
            enablePerfectAlignment: true,
            centerAllElements: true,
            fixTextAlignment: true,
            applyPerfectGrid: true
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🎯 PerfectAlignmentFix: Inicializando correção de alinhamento perfeito...');
        
        try {
            this.fixStatsPerfectAlignment();
            this.fixFeaturesPerfectAlignment();
            this.applyPerfectCentering();
            this.forcePerfectGrid();
            
            console.log('✅ PerfectAlignmentFix: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ PerfectAlignmentFix: Erro na inicialização', error);
        }
    }

    /**
     * Corrigir alinhamento perfeito das estatísticas
     */
    fixStatsPerfectAlignment() {
        console.log('📊 Aplicando alinhamento perfeito das estatísticas...');
        
        const perfectStatsStyle = document.createElement('style');
        perfectStatsStyle.textContent = `
            /* Alinhamento Perfeito das Estatísticas */
            .stats {
                display: grid !important;
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 1rem !important;
                max-width: 800px !important;
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
            
            /* Correção específica para o elemento "Online" */
            .stat:has(.stat-number:contains("Online")) .stat-number {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                text-align: center !important;
            }
            
            /* Mobile Responsivo Perfeito */
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
            
            /* Viewport Pequeno Perfeito */
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
        
        document.head.appendChild(perfectStatsStyle);
        
        console.log('✅ Alinhamento perfeito das estatísticas aplicado');
    }

    /**
     * Corrigir alinhamento perfeito dos features
     */
    fixFeaturesPerfectAlignment() {
        console.log('🎯 Aplicando alinhamento perfeito dos features...');
        
        const perfectFeaturesStyle = document.createElement('style');
        perfectFeaturesStyle.textContent = `
            /* Alinhamento Perfeito dos Features */
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
            
            .feature-card:hover {
                transform: translateY(-5px) !important;
                border-color: rgba(255, 193, 7, 0.3) !important;
                box-shadow: 0 20px 40px rgba(255, 193, 7, 0.1) !important;
            }
            
            .feature-icon {
                width: 3rem !important;
                height: 3rem !important;
                background: linear-gradient(45deg, #ffc107, #ff8f00) !important;
                border-radius: 0.75rem !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 1.5rem !important;
                margin-bottom: 1rem !important;
                transition: transform 0.3s ease !important;
                flex-shrink: 0 !important;
            }
            
            .feature-card:hover .feature-icon {
                transform: rotate(12deg) !important;
            }
            
            .feature-title {
                font-size: 1.25rem !important;
                font-weight: 700 !important;
                margin-bottom: 0.75rem !important;
                color: #fff !important;
                text-align: center !important;
                line-height: 1.2 !important;
                width: 100% !important;
            }
            
            .feature-description {
                color: #bbb !important;
                line-height: 1.5 !important;
                text-align: center !important;
                font-size: 0.875rem !important;
                flex-grow: 1 !important;
                display: flex !important;
                align-items: center !important;
                width: 100% !important;
            }
            
            /* Mobile Responsivo Perfeito */
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
                
                .feature-icon {
                    width: 2.5rem !important;
                    height: 2.5rem !important;
                    font-size: 1.25rem !important;
                }
                
                .feature-title {
                    font-size: 1.125rem !important;
                }
                
                .feature-description {
                    font-size: 0.75rem !important;
                }
            }
            
            /* Viewport Pequeno Perfeito */
            @media (max-height: 600px) {
                .features {
                    margin-top: 1rem !important;
                    gap: 0.75rem !important;
                }
                
                .feature-card {
                    min-height: 120px !important;
                    padding: 0.75rem !important;
                }
                
                .feature-icon {
                    width: 2rem !important;
                    height: 2rem !important;
                    font-size: 1rem !important;
                }
                
                .feature-title {
                    font-size: 1rem !important;
                }
                
                .feature-description {
                    font-size: 0.625rem !important;
                }
            }
        `;
        
        document.head.appendChild(perfectFeaturesStyle);
        
        console.log('✅ Alinhamento perfeito dos features aplicado');
    }

    /**
     * Aplicar centralização perfeita
     */
    applyPerfectCentering() {
        console.log('🎯 Aplicando centralização perfeita...');
        
        const centeringStyle = document.createElement('style');
        centeringStyle.textContent = `
            /* Centralização Perfeita */
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
            
            .main-title {
                font-size: clamp(2rem, 6vw, 4rem) !important;
                font-weight: 900 !important;
                background: linear-gradient(45deg, #ffc107, #ff8f00, #ff6f00) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                margin-bottom: 0.5rem !important;
                line-height: 1.1 !important;
                text-shadow: 0 0 40px rgba(255, 193, 7, 0.3) !important;
                text-align: center !important;
                width: 100% !important;
            }
            
            .title-divider {
                width: 4rem !important;
                height: 2px !important;
                background: linear-gradient(to right, #ffc107, #ff8f00) !important;
                margin: 1rem auto !important;
                border-radius: 2px !important;
            }
            
            .description {
                font-size: clamp(1rem, 2.5vw, 1.5rem) !important;
                color: #e0e0e0 !important;
                max-width: 800px !important;
                margin: 0 auto 0.5rem !important;
                font-weight: 300 !important;
                line-height: 1.3 !important;
                text-align: center !important;
                width: 100% !important;
            }
            
            .subtitle {
                font-size: 0.875rem !important;
                color: #bbb !important;
                font-weight: 500 !important;
                margin-bottom: 1.5rem !important;
                text-align: center !important;
                width: 100% !important;
            }
            
            .play-button {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.75rem !important;
                background: linear-gradient(45deg, #ffc107, #ff8f00) !important;
                color: #000 !important;
                padding: 0.75rem 1.5rem !important;
                border-radius: 1rem !important;
                font-weight: 700 !important;
                font-size: 1rem !important;
                text-decoration: none !important;
                transition: all 0.3s ease !important;
                box-shadow: 0 10px 30px rgba(255, 193, 7, 0.25) !important;
                border: none !important;
                cursor: pointer !important;
                margin-bottom: 1rem !important;
                text-align: center !important;
                width: auto !important;
            }
            
            .play-button:hover {
                transform: translateY(-2px) scale(1.05) !important;
                box-shadow: 0 15px 40px rgba(255, 193, 7, 0.4) !important;
                background: linear-gradient(45deg, #ffcd3c, #ffa000) !important;
            }
            
            .version-info {
                margin-top: 1rem !important;
                font-size: 0.75rem !important;
                color: #777 !important;
                text-align: center !important;
                width: 100% !important;
            }
            
            .version-info p {
                margin: 0.125rem 0 !important;
                text-align: center !important;
            }
            
            /* Status Badge Perfeito */
            .status-badge {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 0.75rem !important;
                padding: 0.25rem 0.75rem !important;
                background: rgba(255, 193, 7, 0.1) !important;
                backdrop-filter: blur(8px) !important;
                border-radius: 50px !important;
                border: 1px solid rgba(255, 193, 7, 0.2) !important;
                margin-bottom: 1rem !important;
                font-size: 0.75rem !important;
                font-weight: 500 !important;
                color: #ffc107 !important;
                text-align: center !important;
                width: auto !important;
            }
        `;
        
        document.head.appendChild(centeringStyle);
        
        console.log('✅ Centralização perfeita aplicada');
    }

    /**
     * Forçar grid perfeito
     */
    forcePerfectGrid() {
        console.log('📐 Forçando grid perfeito...');
        
        // Forçar reflow e aplicar grid perfeito
        setTimeout(() => {
            const stats = document.querySelector('.stats');
            const features = document.querySelector('.features');
            
            if (stats) {
                stats.style.display = 'grid';
                stats.style.gridTemplateColumns = 'repeat(4, 1fr)';
                stats.style.alignItems = 'center';
                stats.style.justifyItems = 'center';
                stats.offsetHeight; // Forçar reflow
            }
            
            if (features) {
                features.style.display = 'grid';
                features.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
                features.style.alignItems = 'stretch';
                features.style.justifyItems = 'center';
                features.offsetHeight; // Forçar reflow
            }
            
            // Forçar centralização dos elementos internos
            const statElements = document.querySelectorAll('.stat');
            statElements.forEach(stat => {
                stat.style.display = 'flex';
                stat.style.flexDirection = 'column';
                stat.style.alignItems = 'center';
                stat.style.justifyContent = 'center';
                stat.style.textAlign = 'center';
                stat.style.width = '100%';
            });
            
            const featureElements = document.querySelectorAll('.feature-card');
            featureElements.forEach(feature => {
                feature.style.display = 'flex';
                feature.style.flexDirection = 'column';
                feature.style.alignItems = 'center';
                feature.style.justifyContent = 'flex-start';
                feature.style.textAlign = 'center';
                feature.style.width = '100%';
            });
            
            console.log('✅ Grid perfeito forçado');
        }, 100);
    }

    /**
     * Verificar alinhamento perfeito
     */
    checkPerfectAlignment() {
        console.log('🔍 Verificando alinhamento perfeito...');
        
        const stats = document.querySelectorAll('.stat');
        const features = document.querySelectorAll('.feature-card');
        
        console.log(`📊 Estatísticas encontradas: ${stats.length}`);
        console.log(`🎯 Features encontrados: ${features.length}`);
        
        // Verificar alinhamento dos elementos
        let perfectAlignment = true;
        
        stats.forEach((stat, index) => {
            const rect = stat.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(stat);
            
            console.log(`📊 Stat ${index + 1}:`);
            console.log(`  - Position: ${rect.top}px, ${rect.left}px`);
            console.log(`  - Display: ${computedStyle.display}`);
            console.log(`  - Text-align: ${computedStyle.textAlign}`);
            console.log(`  - Align-items: ${computedStyle.alignItems}`);
            
            if (computedStyle.textAlign !== 'center') {
                perfectAlignment = false;
            }
        });
        
        features.forEach((feature, index) => {
            const rect = feature.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(feature);
            
            console.log(`🎯 Feature ${index + 1}:`);
            console.log(`  - Position: ${rect.top}px, ${rect.left}px`);
            console.log(`  - Display: ${computedStyle.display}`);
            console.log(`  - Text-align: ${computedStyle.textAlign}`);
            console.log(`  - Align-items: ${computedStyle.alignItems}`);
            
            if (computedStyle.textAlign !== 'center') {
                perfectAlignment = false;
            }
        });
        
        console.log(`✅ Alinhamento verificado: ${perfectAlignment ? 'Perfeito' : 'Necessita ajuste'}`);
        
        return perfectAlignment;
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('🚀 Executando correção de alinhamento perfeito...');
        
        // Aplicar correções
        this.fixStatsPerfectAlignment();
        this.fixFeaturesPerfectAlignment();
        this.applyPerfectCentering();
        
        // Forçar grid perfeito
        setTimeout(() => {
            this.forcePerfectGrid();
            this.checkPerfectAlignment();
        }, 200);
        
        console.log('✅ Correção de alinhamento perfeito executada');
    }
}

// Exportar para uso global
window.PerfectAlignmentFix = PerfectAlignmentFix; 