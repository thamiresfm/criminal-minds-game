/**
 * LAYOUT DIAGNOSTIC SYSTEM - Sistema de Diagnóstico de Layout (CORRIGIDO)
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Analisa profundamente problemas de layout
 * Identifica conflitos entre sistemas
 * Fornece relatório detalhado
 */

class LayoutDiagnosticSystem {
    constructor() {
        this._initialized = false;
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
        
        // Bind methods para evitar perda de contexto
        this.init = this.init.bind(this);
        this.analyzeElements = this.analyzeElements.bind(this);
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        if (this._initialized) {
            console.debug('LayoutDiagnosticSystem: init ignorado (já inicializado).');
            return;
        }
        this._initialized = true;
        
        console.log('🔍 LayoutDiagnosticSystem: Iniciando diagnóstico profundo...');
        
        try {
            if (window.PERF_SKIP_DIAGNOSTIC) {
                console.log('⏭️ LayoutDiagnosticSystem: pulado por PERF_SKIP_DIAGNOSTIC');
                return;
            }
            // Aguardar estabilização do DOM (outros sistemas finalizarem)
            setTimeout(() => {
                this.analyzeScripts();
                this.analyzeStyles();
                this.analyzeElements();
                this.detectConflicts();
                this.generateReport();
                console.log('✅ LayoutDiagnosticSystem: Diagnóstico completo realizado');
            }, 800);
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
        
        const styleSheets = document.querySelectorAll('style, link[rel="stylesheet"]');
        console.log(`🎨 ${styleSheets.length} folhas de estilo encontradas`);

        // Verificar estilos inline críticos
        const criticalStyles = [
            '.game-container',
            '.cards-container', 
            '.sidebar',
            '.header',
            '.hand-container'
        ];

        criticalStyles.forEach(selector => {
            let found = false;
            styleSheets.forEach(sheet => {
                if (sheet.tagName === 'STYLE' && sheet.textContent.includes(selector)) {
                    found = true;
                }
            });
            
            console.log(`🎨 Estilo ${selector}: ${found ? '✅ Encontrado' : '❌ Não encontrado'}`);
            
            if (!found) {
                this.diagnosticData.warnings.push(`Estilo ${selector} não encontrado`);
            }
        });
    }

    /**
     * Analisar elementos do DOM (CORRIGIDO com seletores flexíveis)
     */
    analyzeElements() {
        console.log('🏗️ Analisando elementos do DOM...');
        
        const criticalElements = [
            { name: 'game-container', selectors: ['#game-container', '.game-container', '[data-role="game-container"]'] },
            { name: 'cards-container', selectors: ['#cards-container', '.cards-container', '[data-role="cards-container"]'] },
            { name: 'sidebar', selectors: ['#sidebar', '.sidebar', '[data-role="sidebar"]'] },
            { name: 'header', selectors: ['#header', '.header', '[data-role="header"]'] },
            { name: 'hand-cards', selectors: ['#hand-cards', '.hand-cards', '.hand-container', '[data-role="hand-cards"]'] },
            { name: 'timer', selectors: ['#timer', '.timer', '#gameTimer', '[data-role="timer"]'] },
            { name: 'chat-container', selectors: ['#chat-container', '.chat-container', '[data-role="chat-container"]'] },
            { name: 'main-area', selectors: ['.main-area', '.content', 'main', '#main-area'] },
            { name: 'cards', selectors: ['.card', '[data-card-id]', '.hand-card'] }
        ];
        
        criticalElements.forEach(({ name, selectors }) => {
            let element = null;
            let totalCount = 0;
            let foundSelector = '';
            
            // Tentar todos os seletores
            for (const selector of selectors) {
                const elements = document.querySelectorAll(selector);
                totalCount += elements.length;
                if (elements.length > 0 && !element) {
                    element = elements[0]; // Pegar o primeiro encontrado
                    foundSelector = selector;
                }
            }
            
            console.log(`🏗️ ${name}: ${totalCount > 0 ? '✅' : '❌'} ${totalCount} elemento(s)`);
            
            if (element) {
                const computedStyle = window.getComputedStyle(element);
                const isVisible = computedStyle.display !== 'none' && 
                                 computedStyle.visibility !== 'hidden' &&
                                 computedStyle.opacity !== '0';
                
                this.diagnosticData.elementStates[name] = {
                    exists: true,
                    visible: isVisible,
                    display: computedStyle.display,
                    position: computedStyle.position,
                    zIndex: computedStyle.zIndex,
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    selector: foundSelector,
                    count: totalCount
                };
                
                console.log(`   ↳ Visível: ${isVisible ? '✅' : '❌'}, Display: ${computedStyle.display}, Seletor: ${foundSelector}`);
            } else {
                this.diagnosticData.elementStates[name] = {
                    exists: false,
                    visible: false,
                    count: 0
                };
                
                this.diagnosticData.warnings.push(`Elemento ${name} não encontrado com nenhum dos seletores: ${selectors.join(', ')}`);
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

        // Verificar se elementos críticos estão visíveis
        const criticalForGameplay = ['game-container', 'cards-container', 'hand-cards'];
        criticalForGameplay.forEach(elementName => {
            const state = this.diagnosticData.elementStates[elementName];
            if (!state || !state.exists) {
                this.diagnosticData.errors.push(`Elemento crítico ${elementName} não encontrado`);
                console.log(`❌ Crítico: ${elementName} não encontrado`);
            } else if (!state.visible) {
                this.diagnosticData.warnings.push(`Elemento crítico ${elementName} não visível`);
                console.log(`⚠️ Crítico: ${elementName} não visível`);
            }
        });
    }

    /**
     * Gerar relatório
     */
    generateReport() {
        console.log('\n📋 RELATÓRIO DE DIAGNÓSTICO DE LAYOUT');
        console.log('=====================================');
        
        console.log(`📜 Scripts carregados: ${this.diagnosticData.loadedScripts.length}`);
        console.log(`🏗️ Elementos analisados: ${Object.keys(this.diagnosticData.elementStates).length}`);
        console.log(`⚠️ Conflitos detectados: ${this.diagnosticData.conflicts.length}`);
        console.log(`❌ Erros: ${this.diagnosticData.errors.length}`);
        console.log(`⚠️ Avisos: ${this.diagnosticData.warnings.length}`);

        if (this.diagnosticData.errors.length > 0) {
            console.log('\n❌ ERROS ENCONTRADOS:');
            this.diagnosticData.errors.forEach(error => console.log(`  - ${error}`));
        }

        if (this.diagnosticData.warnings.length > 0) {
            console.log('\n⚠️ AVISOS:');
            this.diagnosticData.warnings.forEach(warning => console.log(`  - ${warning}`));
        }

        if (this.diagnosticData.conflicts.length > 0) {
            console.log('\n🔥 CONFLITOS:');
            this.diagnosticData.conflicts.forEach(conflict => console.log(`  - ${conflict}`));
        }

        console.log('\n🏗️ ESTADO DOS ELEMENTOS:');
        Object.entries(this.diagnosticData.elementStates).forEach(([name, state]) => {
            const status = state.exists ? (state.visible ? '✅ OK' : '⚠️ Oculto') : '❌ Não encontrado';
            console.log(`  - ${name}: ${status} (${state.count || 0} elementos)`);
        });

        // Salvar relatório
        const report = {
            timestamp: new Date().toISOString(),
            diagnosticType: 'layout_analysis',
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            summary: {
                scriptsLoaded: this.diagnosticData.loadedScripts.length,
                elementsAnalyzed: Object.keys(this.diagnosticData.elementStates).length,
                conflicts: this.diagnosticData.conflicts.length,
                errors: this.diagnosticData.errors.length,
                warnings: this.diagnosticData.warnings.length
            },
            details: this.diagnosticData
        };

        localStorage.setItem('layout_diagnostic_report', JSON.stringify(report));
        console.log('\n💾 Relatório salvo no localStorage como "layout_diagnostic_report"');

        return report;
    }
}

// Exportar para uso global
window.LayoutDiagnosticSystem = LayoutDiagnosticSystem;
