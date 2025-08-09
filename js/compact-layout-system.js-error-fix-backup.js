/**
 * COMPACT LAYOUT SYSTEM - Sistema de Layout Compacto
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Otimiza layout para caber na viewport sem scroll
 * Ajusta elementos dinamicamente
 * Mantém responsividade
 */

class CompactLayoutSystem {
    constructor() {
        this.config = {
            enableCompactMode: true,
            autoAdjust: true,
            responsiveBreakpoints: true,
            viewportOptimization: true
        };
        
        this.viewportHeight = window.innerHeight;
        this.viewportWidth = window.innerWidth;
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('📐 CompactLayoutSystem: Inicializando sistema de layout compacto...');
        
        try {
            this.setupCompactLayout();
            this.adjustViewportElements();
            this.setupResponsiveAdjustments();
            this.optimizeForMobile();
            
            console.log('✅ CompactLayoutSystem: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ CompactLayoutSystem: Erro na inicialização', error);
        }
    }

    /**
     * Configurar layout compacto
     */
    setupCompactLayout() {
        console.log('📐 Configurando layout compacto...');
        
        // Ajustar CSS dinamicamente
        const style = document.createElement('style');
        style.textContent = `
            /* Layout Compacto - Otimizado para Viewport */
            .container {
                min-height: 100vh !important;
                max-height: 100vh !important;
                overflow: hidden !important;
                padding: 1rem !important;
            }
            
            .content {
                max-height: 100vh !important;
                overflow-y: auto !important;
                padding: 1rem !important;
            }
            
            /* Ajustes de Espaçamento */
            .status-badge {
                margin-bottom: 1rem !important;
                padding: 0.25rem 0.75rem !important;
                font-size: 0.75rem !important;
            }
            
            .main-title {
                font-size: clamp(2rem, 6vw, 4rem) !important;
                margin-bottom: 0.5rem !important;
                line-height: 1 !important;
            }
            
            .title-divider {
                width: 4rem !important;
                height: 2px !important;
                margin: 1rem auto !important;
            }
            
            .description {
                font-size: clamp(1rem, 2.5vw, 1.5rem) !important;
                margin-bottom: 0.5rem !important;
                line-height: 1.3 !important;
            }
            
            .subtitle {
                font-size: 0.875rem !important;
                margin-bottom: 1.5rem !important;
            }
            
            .play-button {
                padding: 0.75rem 1.5rem !important;
                font-size: 1rem !important;
                margin-bottom: 1rem !important;
            }
            
            .version-info {
                margin-top: 1rem !important;
                font-size: 0.75rem !important;
            }
            
            .version-info p {
                margin: 0.125rem 0 !important;
            }
            
            /* Features Compactos */
            .features {
                margin-top: 2rem !important;
                gap: 1rem !important;
            }
            
            .feature-card {
                padding: 1rem !important;
                border-radius: 0.75rem !important;
            }
            
            .feature-icon {
                width: 2.5rem !important;
                height: 2.5rem !important;
                font-size: 1.25rem !important;
                margin-bottom: 0.5rem !important;
            }
            
            .feature-title {
                font-size: 1.125rem !important;
                margin-bottom: 0.5rem !important;
            }
            
            .feature-description {
                font-size: 0.875rem !important;
                line-height: 1.4 !important;
            }
            
            /* Stats Compactos */
            .stats {
                margin-top: 2rem !important;
                gap: 1rem !important;
                padding-top: 1.5rem !important;
            }
            
            .stat-number {
                font-size: 2rem !important;
            }
            
            .stat-label {
                font-size: 0.75rem !important;
            }
            
            /* Mobile Otimizado */
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
                
                .features {
                    grid-template-columns: 1fr !important;
                    gap: 0.75rem !important;
                    margin-top: 1.5rem !important;
                }
                
                .stats {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 0.75rem !important;
                }
                
                .feature-card {
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
                    font-size: 0.75rem !important;
                }
            }
            
            /* Viewport Muito Pequeno */
            @media (max-height: 600px) {
                .status-badge {
                    margin-bottom: 0.5rem !important;
                    padding: 0.125rem 0.5rem !important;
                    font-size: 0.625rem !important;
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
                    padding: 0.5rem 1rem !important;
                    font-size: 0.875rem !important;
                }
                
                .version-info {
                    margin-top: 0.5rem !important;
                    font-size: 0.625rem !important;
                }
                
                .features {
                    margin-top: 1rem !important;
                    gap: 0.5rem !important;
                }
                
                .feature-card {
                    padding: 0.5rem !important;
                }
                
                .feature-icon {
                    width: 1.5rem !important;
                    height: 1.5rem !important;
                    font-size: 0.875rem !important;
                }
                
                .feature-title {
                    font-size: 0.875rem !important;
                }
                
                .feature-description {
                    font-size: 0.625rem !important;
                }
                
                .stats {
                    margin-top: 1rem !important;
                    gap: 0.5rem !important;
                }
                
                .stat-number {
                    font-size: 1.5rem !important;
                }
                
                .stat-label {
                    font-size: 0.625rem !important;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        console.log('✅ Layout compacto configurado');
    }

    /**
     * Ajustar elementos da viewport
     */
    adjustViewportElements() {
        console.log('📐 Ajustando elementos da viewport...');
        
        // Calcular altura disponível
        const availableHeight = this.viewportHeight - 40; // 40px para padding
        
        // Ajustar container principal
        const container = document.querySelector('.container');
        if (container) {
            container.style.minHeight = `${availableHeight}px`;
            container.style.maxHeight = `${availableHeight}px`;
        }
        
        // Ajustar conteúdo
        const content = document.querySelector('.content');
        if (content) {
            content.style.maxHeight = `${availableHeight - 20}px`;
            content.style.overflowY = 'auto';
        }
        
        console.log('✅ Elementos da viewport ajustados');
    }

    /**
     * Configurar ajustes responsivos
     */
    setupResponsiveAdjustments() {
        console.log('📱 Configurando ajustes responsivos...');
        
        // Listener para redimensionamento
        window.addEventListener('resize', () => {
            this.viewportHeight = window.innerHeight;
            this.viewportWidth = window.innerWidth;
            this.adjustViewportElements();
        });
        
        // Ajustar inicialmente
        this.adjustViewportElements();
        
        console.log('✅ Ajustes responsivos configurados');
    }

    /**
     * Otimizar para mobile
     */
    optimizeForMobile() {
        console.log('📱 Otimizando para mobile...');
        
        if (this.viewportWidth <= 768) {
            // Ajustes específicos para mobile
            const mobileStyle = document.createElement('style');
            mobileStyle.textContent = `
                /* Mobile Otimizações */
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
                
                .features {
                    grid-template-columns: 1fr !important;
                    gap: 0.75rem !important;
                }
                
                .stats {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 0.75rem !important;
                }
            `;
            
            document.head.appendChild(mobileStyle);
        }
        
        console.log('✅ Mobile otimizado');
    }

    /**
     * Verificar se cabe na viewport
     */
    checkViewportFit() {
        const content = document.querySelector('.content');
        if (content) {
            const contentHeight = content.scrollHeight;
            const viewportHeight = window.innerHeight;
            
            console.log(`📐 Altura do conteúdo: ${contentHeight}px`);
            console.log(`📐 Altura da viewport: ${viewportHeight}px`);
            console.log(`📐 Cabe na viewport: ${contentHeight <= viewportHeight ? '✅ Sim' : '❌ Não'}`);
            
            return contentHeight <= viewportHeight;
        }
        
        return false;
    }

    /**
     * Aplicar ajustes finos
     */
    applyFineTuning() {
        console.log('🔧 Aplicando ajustes finos...');
        
        // Se ainda não cabe, aplicar ajustes mais agressivos
        if (!this.checkViewportFit()) {
            const aggressiveStyle = document.createElement('style');
            aggressiveStyle.textContent = `
                /* Ajustes Agressivos */
                .status-badge {
                    margin-bottom: 0.25rem !important;
                    padding: 0.125rem 0.5rem !important;
                    font-size: 0.625rem !important;
                }
                
                .main-title {
                    font-size: clamp(1rem, 5vw, 2rem) !important;
                    margin-bottom: 0.25rem !important;
                }
                
                .title-divider {
                    margin: 0.25rem auto !important;
                }
                
                .description {
                    font-size: clamp(0.75rem, 2vw, 1rem) !important;
                    margin-bottom: 0.25rem !important;
                }
                
                .subtitle {
                    font-size: 0.625rem !important;
                    margin-bottom: 0.75rem !important;
                }
                
                .play-button {
                    padding: 0.375rem 0.75rem !important;
                    font-size: 0.75rem !important;
                    margin-bottom: 0.5rem !important;
                }
                
                .version-info {
                    margin-top: 0.25rem !important;
                    font-size: 0.5rem !important;
                }
                
                .features {
                    margin-top: 0.75rem !important;
                    gap: 0.375rem !important;
                }
                
                .feature-card {
                    padding: 0.375rem !important;
                }
                
                .feature-icon {
                    width: 1.25rem !important;
                    height: 1.25rem !important;
                    font-size: 0.75rem !important;
                }
                
                .feature-title {
                    font-size: 0.75rem !important;
                }
                
                .feature-description {
                    font-size: 0.5rem !important;
                }
                
                .stats {
                    margin-top: 0.75rem !important;
                    gap: 0.375rem !important;
                }
                
                .stat-number {
                    font-size: 1.25rem !important;
                }
                
                .stat-label {
                    font-size: 0.5rem !important;
                }
            `;
            
            document.head.appendChild(aggressiveStyle);
        }
        
        console.log('✅ Ajustes finos aplicados');
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('🚀 Executando sistema de layout compacto...');
        
        // Aplicar ajustes
        this.adjustViewportElements();
        this.optimizeForMobile();
        
        // Verificar se cabe
        setTimeout(() => {
            if (!this.checkViewportFit()) {
                this.applyFineTuning();
            }
        }, 100);
        
        console.log('✅ Sistema de layout compacto executado');
    }
}

// Exportar para uso global
window.CompactLayoutSystem = CompactLayoutSystem; 