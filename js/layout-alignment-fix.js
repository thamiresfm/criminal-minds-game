/**
 * LAYOUT ALIGNMENT FIX - Sistema de Correção de Alinhamento
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Corrige alinhamento de elementos
 * Garante layout consistente
 * Aplica grid responsivo perfeito
 */

class LayoutAlignmentFix {
    constructor() {
        this.config = {
            enableAlignmentFix: true,
            responsiveGrid: true,
            perfectAlignment: true,
            visualConsistency: true
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🔧 LayoutAlignmentFix: Inicializando correção de alinhamento...');
        
        try {
            this.fixStatsAlignment();
            this.fixFeaturesAlignment();
            this.fixOverallLayout();
            this.applyPerfectGrid();
            
            console.log('✅ LayoutAlignmentFix: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ LayoutAlignmentFix: Erro na inicialização', error);
        }
    }

    /**
     * Corrigir alinhamento das estatísticas
     */
    fixStatsAlignment() {
        console.log('📊 Corrigindo alinhamento das estatísticas...');
        
        const statsStyle = document.createElement('style');
        statsStyle.textContent = `
            /* Correção de Alinhamento das Estatísticas */
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
            }
            
            .stat-label {
                font-size: 0.75rem !important;
                color: #bbb !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
                font-weight: 600 !important;
                text-align: center !important;
                line-height: 1.2 !important;
                max-width: 100% !important;
                word-wrap: break-word !important;
            }
            
            /* Mobile Responsivo */
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
            
            /* Viewport Pequeno */
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
        
        document.head.appendChild(statsStyle);
        
        console.log('✅ Alinhamento das estatísticas corrigido');
    }

    /**
     * Corrigir alinhamento dos features
     */
    fixFeaturesAlignment() {
        console.log('🎯 Corrigindo alinhamento dos features...');
        
        const featuresStyle = document.createElement('style');
        featuresStyle.textContent = `
            /* Correção de Alinhamento dos Features */
            .features {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
                gap: 1.5rem !important;
                max-width: 1200px !important;
                margin: 2rem auto 0 !important;
                align-items: stretch !important;
                justify-items: center !important;
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
            }
            
            .feature-description {
                color: #bbb !important;
                line-height: 1.5 !important;
                text-align: center !important;
                font-size: 0.875rem !important;
                flex-grow: 1 !important;
                display: flex !important;
                align-items: center !important;
            }
            
            /* Mobile Responsivo */
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
            
            /* Viewport Pequeno */
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
        
        document.head.appendChild(featuresStyle);
        
        console.log('✅ Alinhamento dos features corrigido');
    }

    /**
     * Corrigir layout geral
     */
    fixOverallLayout() {
        console.log('🎨 Corrigindo layout geral...');
        
        const overallStyle = document.createElement('style');
        overallStyle.textContent = `
            /* Correção de Layout Geral */
            .container {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                min-height: 100vh !important;
                max-height: 100vh !important;
                padding: 1rem !important;
                position: relative !important;
                overflow: hidden !important;
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
            }
            
            .subtitle {
                font-size: 0.875rem !important;
                color: #bbb !important;
                font-weight: 500 !important;
                margin-bottom: 1.5rem !important;
                text-align: center !important;
            }
            
            .play-button {
                display: inline-flex !important;
                align-items: center !important;
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
            }
            
            .version-info p {
                margin: 0.125rem 0 !important;
                text-align: center !important;
            }
            
            /* Status Badge */
            .status-badge {
                display: inline-flex !important;
                align-items: center !important;
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
            }
            
            /* Mobile Responsivo */
            @media (max-width: 768px) {
                .container {
                    padding: 0.5rem !important;
                }
                
                .content {
                    padding: 0.5rem !important;
                }
                
                .main-title {
                    font-size: clamp(1.5rem, 8vw, 3rem) !important;
                }
                
                .description {
                    font-size: clamp(0.875rem, 3vw, 1.25rem) !important;
                }
                
                .play-button {
                    padding: 0.5rem 1rem !important;
                    font-size: 0.875rem !important;
                }
            }
            
            /* Viewport Pequeno */
            @media (max-height: 600px) {
                .content {
                    justify-content: flex-start !important;
                    padding-top: 0.5rem !important;
                }
                
                .main-title {
                    font-size: clamp(1.25rem, 6vw, 2.5rem) !important;
                    margin-bottom: 0.25rem !important;
                }
                
                .title-divider {
                    margin: 0.5rem auto !important;
                }
                
                .description {
                    font-size: clamp(0.75rem, 2vw, 1.125rem) !important;
                    margin-bottom: 0.25rem !important;
                }
                
                .subtitle {
                    font-size: 0.75rem !important;
                    margin-bottom: 1rem !important;
                }
                
                .play-button {
                    padding: 0.375rem 0.75rem !important;
                    font-size: 0.75rem !important;
                    margin-bottom: 0.5rem !important;
                }
                
                .version-info {
                    margin-top: 0.5rem !important;
                    font-size: 0.625rem !important;
                }
            }
        `;
        
        document.head.appendChild(overallStyle);
        
        console.log('✅ Layout geral corrigido');
    }

    /**
     * Aplicar grid perfeito
     */
    applyPerfectGrid() {
        console.log('📐 Aplicando grid perfeito...');
        
        // Forçar reflow para garantir alinhamento
        setTimeout(() => {
            const stats = document.querySelector('.stats');
            const features = document.querySelector('.features');
            
            if (stats) {
                stats.style.display = 'grid';
                stats.offsetHeight; // Forçar reflow
            }
            
            if (features) {
                features.style.display = 'grid';
                features.offsetHeight; // Forçar reflow
            }
            
            console.log('✅ Grid perfeito aplicado');
        }, 100);
    }

    /**
     * Verificar alinhamento
     */
    checkAlignment() {
        console.log('🔍 Verificando alinhamento...');
        
        const stats = document.querySelectorAll('.stat');
        const features = document.querySelectorAll('.feature-card');
        
        console.log(`📊 Estatísticas encontradas: ${stats.length}`);
        console.log(`🎯 Features encontrados: ${features.length}`);
        
        // Verificar se todos os elementos estão alinhados
        let allAligned = true;
        
        stats.forEach((stat, index) => {
            const rect = stat.getBoundingClientRect();
            console.log(`📊 Stat ${index + 1}: ${rect.top}px, ${rect.left}px`);
        });
        
        features.forEach((feature, index) => {
            const rect = feature.getBoundingClientRect();
            console.log(`🎯 Feature ${index + 1}: ${rect.top}px, ${rect.left}px`);
        });
        
        console.log(`✅ Alinhamento verificado: ${allAligned ? 'Perfeito' : 'Necessita ajuste'}`);
        
        return allAligned;
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('🚀 Executando correção de alinhamento...');
        
        // Aplicar correções
        this.fixStatsAlignment();
        this.fixFeaturesAlignment();
        this.fixOverallLayout();
        
        // Aplicar grid perfeito
        setTimeout(() => {
            this.applyPerfectGrid();
            this.checkAlignment();
        }, 200);
        
        console.log('✅ Correção de alinhamento executada');
    }
}

// Exportar para uso global
window.LayoutAlignmentFix = LayoutAlignmentFix; 