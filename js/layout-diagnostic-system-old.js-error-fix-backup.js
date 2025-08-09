/**
 * LAYOUT DIAGNOSTIC SYSTEM - Sistema de Diagnóstico de Layout
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Analisa profundamente problemas de layout
 * Identifica conflitos entre sistemas
 * Fornece relatório detalhado
 */

class LayoutDiagnosticSystem {
    constructor() {
        this.config = {
            enableDeepAnalysis: true,
            trackAllElements: true,
            detectConflicts: true,
            generateReport: true
        };
        
        this.diagnosticData = {
            loadedScripts: [],
            appliedStyles: [],
            elementStates: {},
            conflicts: [],
            errors: [],
            warnings: []
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🔍 LayoutDiagnosticSystem: Iniciando diagnóstico profundo...');
        
        try {
            this.analyzeScripts();
            this.analyzeStyles();
            this.analyzeElements();
            this.detectConflicts();
            this.generateReport();
            
            console.log('✅ LayoutDiagnosticSystem: Diagnóstico completo realizado');
        } catch (error) {
            console.error('❌ LayoutDiagnosticSystem: Erro no diagnóstico', error);
        }
    }

    /**
     * Analisar scripts carregados
     */
    analyzeScripts() {
        console.log('📜 Analisando scripts carregados...');
        
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const src = script.src;
            const isLoaded = script.readyState === 'complete' || script.readyState === 'loaded';
            
            this.diagnosticData.loadedScripts.push({
                src: src,
                loaded: isLoaded,
                element: script
            });
            
            console.log(`📜 Script: ${src.split('/').pop()} - ${isLoaded ? '✅ Carregado' : '⏳ Carregando'}`);
        });

        // Verificar se classes estão disponíveis
        const expectedClasses = [
            'LayoutFixSystem',
            'AggressiveFixSystem', 
            'CompleteHandSystem',
            'ComprehensiveTestSystem',
            'EnhancedGameSystem'
        ];

        expectedClasses.forEach(className => {
            const available = typeof window[className] !== 'undefined';
            console.log(`🏗️ Classe ${className}: ${available ? '✅ Disponível' : '❌ Não encontrada'}`);
            
            if (!available) {
                this.diagnosticData.errors.push(`Classe ${className} não está disponível`);
            }
        });
    }

    /**
     * Analisar estilos aplicados
     */
    analyzeStyles() {
        console.log('🎨 Analisando estilos aplicados...');
        
        const styleSheets = document.styleSheets;
        const inlineStyles = document.querySelectorAll('style');
        
        console.log(`🎨 Total de folhas de estilo: ${styleSheets.length}`);
        console.log(`🎨 Total de estilos inline: ${inlineStyles.length}`);
        
        // Analisar estilos inline
        inlineStyles.forEach((style, index) => {
            const content = style.textContent;
            const hasGameContainer = content.includes('.game-container');
            const hasCardsContainer = content.includes('.cards-container');
            const hasResponsive = content.includes('@media');
            
            this.diagnosticData.appliedStyles.push({
                type: 'inline',
                index: index,
                hasGameContainer: hasGameContainer,
                hasCardsContainer: hasCardsContainer,
                hasResponsive: hasResponsive,
                length: content.length
            });
            
            console.log(`🎨 Estilo inline ${index}: ${hasGameContainer ? '✅' : '❌'} game-container, ${hasCardsContainer ? '✅' : '❌'} cards-container, ${hasResponsive ? '✅' : '❌'} responsivo`);
        });
    }

    /**
     * Analisar elementos do DOM
     */
    analyzeElements() {
        console.log('🏗️ Analisando elementos do DOM...');
        
        const criticalElements = {
            'game-container': '.game-container',
            'header': '.header',
            'sidebar-left': '.sidebar-left',
            'main-area': '.main-area',
            'sidebar-right': '.sidebar-right',
            'cards-container': '.cards-container',
            'cards': '.card',
            'hand-cards': '.mini-card'
        };

        Object.entries(criticalElements).forEach(([name, selector]) => {
            const elements = document.querySelectorAll(selector);
            const computedStyle = elements.length > 0 ? window.getComputedStyle(elements[0]) : null;
            
            this.diagnosticData.elementStates[name] = {
                count: elements.length,
                exists: elements.length > 0,
                visible: computedStyle ? computedStyle.display !== 'none' : false,
                positioned: computedStyle ? computedStyle.position !== 'static' : false,
                styles: computedStyle ? {
                    display: computedStyle.display,
                    position: computedStyle.position,
                    width: computedStyle.width,
                    height: computedStyle.height,
                    gridTemplateColumns: computedStyle.gridTemplateColumns,
                    gridTemplateRows: computedStyle.gridTemplateRows
                } : null
            };
            
            const status = elements.length > 0 ? '✅' : '❌';
            console.log(`🏗️ ${name}: ${status} ${elements.length} elemento(s)`);
            
            if (elements.length === 0) {
                this.diagnosticData.errors.push(`Elemento ${name} não encontrado`);
            }
        });
    }

    /**
     * Detectar conflitos
     */
    detectConflicts() {
        console.log('⚠️ Detectando conflitos...');
        
        // Verificar múltiplos estilos para o mesmo elemento
        const gameContainerStyles = document.querySelectorAll('style');
        let gameContainerCount = 0;
        
        gameContainerStyles.forEach(style => {
            if (style.textContent.includes('.game-container')) {
                gameContainerCount++;
            }
        });
        
        if (gameContainerCount > 1) {
            this.diagnosticData.conflicts.push(`Múltiplas definições de .game-container (${gameContainerCount})`);
            console.log(`⚠️ Conflito: ${gameContainerCount} definições de .game-container`);
        }

        // Verificar ordem de inicialização
        const initializationOrder = [
            'ComprehensiveTestSystem',
            'EnhancedGameSystem', 
            'CompleteHandSystem',
            'AggressiveFixSystem',
            'LayoutFixSystem'
        ];

        initializationOrder.forEach((className, index) => {
            if (typeof window[className] === 'undefined') {
                this.diagnosticData.warnings.push(`Sistema ${className} não inicializado na ordem esperada`);
            }
        });

        // Verificar responsividade
        const viewport = window.innerWidth;
        const isDesktop = viewport > 1200;
        const isTablet = viewport > 768 && viewport <= 1200;
        const isMobile = viewport <= 768;
        
        console.log(`📱 Viewport: ${viewport}px (${isDesktop ? 'Desktop' : isTablet ? 'Tablet' : 'Mobile'})`);
        
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            const containerStyle = window.getComputedStyle(gameContainer);
            const gridColumns = containerStyle.gridTemplateColumns;
            
            console.log(`🏗️ Grid atual: ${gridColumns}`);
            
            if (isMobile && gridColumns.includes('280px')) {
                this.diagnosticData.conflicts.push('Layout desktop sendo usado em mobile');
                console.log('⚠️ Conflito: Layout desktop em dispositivo mobile');
            }
        }
    }

    /**
     * Gerar relatório completo
     */
    generateReport() {
        console.log('📊 Gerando relatório de diagnóstico...');
        
        const report = {
            timestamp: new Date().toISOString(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                deviceType: this.getDeviceType()
            },
            scripts: this.diagnosticData.loadedScripts,
            styles: this.diagnosticData.appliedStyles,
            elements: this.diagnosticData.elementStates,
            conflicts: this.diagnosticData.conflicts,
            errors: this.diagnosticData.errors,
            warnings: this.diagnosticData.warnings,
            recommendations: this.generateRecommendations()
        };

        // Salvar no localStorage para análise
        localStorage.setItem('layout-diagnostic-report', JSON.stringify(report, null, 2));
        
        // Exibir resumo no console
        this.displayReportSummary(report);
        
        return report;
    }

    /**
     * Obter tipo de dispositivo
     */
    getDeviceType() {
        const width = window.innerWidth;
        if (width <= 480) return 'Mobile Small';
        if (width <= 768) return 'Mobile';
        if (width <= 1200) return 'Tablet';
        return 'Desktop';
    }

    /**
     * Gerar recomendações
     */
    generateRecommendations() {
        const recommendations = [];
        
        if (this.diagnosticData.conflicts.length > 0) {
            recommendations.push('Remover definições duplicadas de CSS');
            recommendations.push('Consolidar sistemas de layout em um único sistema');
        }
        
        if (this.diagnosticData.errors.length > 0) {
            recommendations.push('Verificar carregamento de scripts');
            recommendations.push('Garantir que elementos essenciais existam');
        }
        
        const viewport = window.innerWidth;
        if (viewport <= 768) {
            recommendations.push('Aplicar layout responsivo para mobile');
            recommendations.push('Reorganizar grid para single-column');
        }
        
        if (this.diagnosticData.appliedStyles.length > 3) {
            recommendations.push('Consolidar estilos inline em um único bloco');
        }
        
        return recommendations;
    }

    /**
     * Exibir resumo do relatório
     */
    displayReportSummary(report) {
        console.log('\n📊 === RELATÓRIO DE DIAGNÓSTICO DE LAYOUT ===');
        console.log(`🕒 Timestamp: ${report.timestamp}`);
        console.log(`📱 Dispositivo: ${report.viewport.deviceType} (${report.viewport.width}x${report.viewport.height})`);
        console.log(`📜 Scripts carregados: ${report.scripts.length}`);
        console.log(`🎨 Estilos aplicados: ${report.styles.length}`);
        console.log(`🏗️ Elementos analisados: ${Object.keys(report.elements).length}`);
        console.log(`⚠️ Conflitos encontrados: ${report.conflicts.length}`);
        console.log(`❌ Erros encontrados: ${report.errors.length}`);
        console.log(`⚠️ Avisos: ${report.warnings.length}`);
        
        if (report.conflicts.length > 0) {
            console.log('\n⚠️ CONFLITOS DETECTADOS:');
            report.conflicts.forEach((conflict, index) => {
                console.log(`${index + 1}. ${conflict}`);
            });
        }
        
        if (report.errors.length > 0) {
            console.log('\n❌ ERROS ENCONTRADOS:');
            report.errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            });
        }
        
        if (report.recommendations.length > 0) {
            console.log('\n💡 RECOMENDAÇÕES:');
            report.recommendations.forEach((rec, index) => {
                console.log(`${index + 1}. ${rec}`);
            });
        }
        
        console.log('\n📋 Relatório completo salvo em localStorage como "layout-diagnostic-report"');
        console.log('=== FIM DO RELATÓRIO ===\n');
    }

    /**
     * Executar diagnóstico em tempo real
     */
    runRealTimeDiagnostic() {
        console.log('🔄 Iniciando diagnóstico em tempo real...');
        
        setInterval(() => {
            this.analyzeElements();
            
            const gameContainer = document.querySelector('.game-container');
            if (gameContainer) {
                const style = window.getComputedStyle(gameContainer);
                console.log(`🔄 Grid atual: ${style.gridTemplateColumns}`);
            }
        }, 5000);
    }

    /**
     * Forçar correção baseada no diagnóstico
     */
    forceFixBasedOnDiagnostic() {
        console.log('🔧 Aplicando correções baseadas no diagnóstico...');
        
        const report = this.generateReport();
        
        // Remover estilos conflitantes
        if (report.conflicts.length > 0) {
            const styles = document.querySelectorAll('style');
            styles.forEach((style, index) => {
                if (index > 0 && style.textContent.includes('.game-container')) {
                    console.log(`🗑️ Removendo estilo conflitante ${index}`);
                    style.remove();
                }
            });
        }
        
        // Aplicar layout responsivo se necessário
        if (report.viewport.width <= 768) {
            this.applyMobileLayout();
        }
        
        console.log('✅ Correções aplicadas baseadas no diagnóstico');
    }

    /**
     * Aplicar layout mobile
     */
    applyMobileLayout() {
        console.log('📱 Aplicando layout mobile...');
        
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            .game-container {
                display: grid !important;
                grid-template-columns: 1fr !important;
                grid-template-rows: auto auto 1fr auto !important;
                height: auto !important;
                min-height: 100vh !important;
                gap: 0.5rem !important;
                padding: 0.5rem !important;
            }
            
            .header {
                grid-column: 1 !important;
                grid-row: 1 !important;
                flex-direction: column !important;
                gap: 0.5rem !important;
                padding: 1rem !important;
            }
            
            .sidebar-left {
                grid-column: 1 !important;
                grid-row: 2 !important;
            }
            
            .main-area {
                grid-column: 1 !important;
                grid-row: 3 !important;
                padding: 1rem !important;
            }
            
            .sidebar-right {
                grid-column: 1 !important;
                grid-row: 4 !important;
            }
            
            .cards-container {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
            }
            
            .card {
                max-width: 100% !important;
                height: 140px !important;
            }
        `;
        
        document.head.appendChild(mobileStyle);
        console.log('✅ Layout mobile aplicado');
    }
}

// Exportar para uso global
window.LayoutDiagnosticSystem = LayoutDiagnosticSystem;
