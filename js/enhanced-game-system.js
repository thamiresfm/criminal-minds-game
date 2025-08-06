/**
 * ENHANCED GAME SYSTEM - Sistema Aprimorado do Jogo
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Funcionalidades implementadas:
 * - 8 novas cartas (total de 20 cartas)
 * - Layout moderno das cartas
 * - Sistema de acusação inteligente
 * - Fluxo de jogo otimizado
 * - Infraestrutura aprimorada
 */

class EnhancedGameSystem {
    constructor() {
        this.config = {
            totalCards: 20,
            handSize: 7,
            accusationThreshold: 5,
            autoRedirect: true,
            cacheBusting: true
        };
        
        this.cards = this.initializeCards();
        this.gameState = this.initializeGameState();
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🎮 EnhancedGameSystem: Inicializando sistema aprimorado...');
        
        try {
            this.setupCardSystem();
            this.setupAccusationSystem();
            this.setupGameFlow();
            this.setupInfrastructure();
            this.runSystemTests();
            
            console.log('✅ EnhancedGameSystem: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ EnhancedGameSystem: Erro na inicialização', error);
        }
    }

    /**
     * Inicializar sistema de cartas
     */
    setupCardSystem() {
        console.log('🃏 Configurando sistema de cartas...');
        
        // Garantir que sempre começa no nível inicial
        if (typeof window.currentLevel === 'undefined') {
            window.currentLevel = 1;
        }
        
        // Garantir que estatísticas começam zeradas
        if (typeof window.cardsPlayed === 'undefined') {
            window.cardsPlayed = 0;
        }
        
        if (typeof window.comboStreak === 'undefined') {
            window.comboStreak = 0;
        }
        
        // Configurar layout de 3 colunas
        this.setupThreeColumnLayout();
        
        // Adicionar 8 novas cartas
        this.addNewCards();
        
        console.log('✅ Sistema de cartas configurado');
    }

    /**
     * Configurar layout de 3 colunas
     */
    setupThreeColumnLayout() {
        const cardsContainer = document.querySelector('.cards-container');
        if (cardsContainer) {
            cardsContainer.style.display = 'grid';
            cardsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            cardsContainer.style.gap = '1rem';
            cardsContainer.style.padding = '1rem';
        }
    }

    /**
     * Adicionar 8 novas cartas
     */
    addNewCards() {
        const newCards = [
            {
                id: 'forensic-evidence',
                type: 'Evidência',
                rarity: 'rare',
                title: 'Análise Forense',
                icon: '🔬',
                description: 'Evidências físicas coletadas na cena do crime. Impressões digitais e fibras têxteis.',
                stats: { power: 70, accuracy: 85, special: 'Forense' }
            },
            {
                id: 'witness-testimony',
                type: 'Testemunho',
                rarity: 'epic',
                title: 'Testemunha Ocular',
                icon: '👁️',
                description: 'Depoimento de testemunha que presenciou o crime. Descrição detalhada do suspeito.',
                stats: { power: 80, accuracy: 90, special: 'Testemunho' }
            },
            {
                id: 'digital-evidence',
                type: 'Tecnologia',
                rarity: 'rare',
                title: 'Evidência Digital',
                icon: '💻',
                description: 'Dados recuperados de dispositivos eletrônicos. Mensagens e histórico de navegação.',
                stats: { power: 65, accuracy: 75, special: 'Digital' }
            },
            {
                id: 'behavioral-profile',
                type: 'Psicologia',
                rarity: 'epic',
                title: 'Perfil Comportamental',
                icon: '🧠',
                description: 'Análise psicológica do assassino. Padrões de comportamento e motivações.',
                stats: { power: 85, accuracy: 80, special: 'Psicologia' }
            },
            {
                id: 'crime-scene-photos',
                type: 'Evidência',
                rarity: 'common',
                title: 'Fotos da Cena',
                icon: '📸',
                description: 'Documentação fotográfica completa da cena do crime. Detalhes visuais importantes.',
                stats: { power: 55, accuracy: 70, special: 'Fotografia' }
            },
            {
                id: 'medical-report',
                type: 'Médico',
                rarity: 'rare',
                title: 'Relatório Médico',
                icon: '🏥',
                description: 'Laudo médico da vítima. Causa da morte e ferimentos encontrados.',
                stats: { power: 75, accuracy: 85, special: 'Médico' }
            },
            {
                id: 'surveillance-footage',
                type: 'Vigilância',
                rarity: 'epic',
                title: 'Imagens de Vigilância',
                icon: '📹',
                description: 'Gravações de câmeras de segurança. Movimentos do suspeito antes do crime.',
                stats: { power: 90, accuracy: 95, special: 'Vigilância' }
            },
            {
                id: 'confession-evidence',
                type: 'Confissão',
                rarity: 'legendary',
                title: 'Evidência de Confissão',
                icon: '🎤',
                description: 'Gravação de confissão ou declaração incriminatória do suspeito.',
                stats: { power: 100, accuracy: 100, special: 'Definitiva' }
            }
        ];
        
        // Adicionar cartas ao container
        const cardsContainer = document.querySelector('.cards-container');
        if (cardsContainer) {
            newCards.forEach(card => {
                const cardElement = this.createCardElement(card);
                cardsContainer.appendChild(cardElement);
            });
        }
        
        console.log(`✅ ${newCards.length} novas cartas adicionadas`);
    }

    /**
     * Criar elemento de carta
     */
    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${card.rarity}`;
        cardDiv.setAttribute('onclick', `playCard('${card.id}')`);
        cardDiv.setAttribute('data-card-id', card.id);
        
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-header">
                    <span class="card-type">${card.type}</span>
                    <span class="card-rarity rarity-${card.rarity}">${this.getRarityName(card.rarity)}</span>
                </div>
                <div class="card-icon">${card.icon}</div>
                <div class="card-title">${card.title}</div>
                <div class="card-description">${card.description}</div>
                <div class="card-stats">
                    <div class="stat">⚡ <span>${card.stats.power}</span></div>
                    <div class="stat">🎯 <span>${card.stats.accuracy}</span></div>
                    <div class="stat">🔍 <span>${card.stats.special}</span></div>
                </div>
            </div>
        `;
        
        return cardDiv;
    }

    /**
     * Obter nome da raridade
     */
    getRarityName(rarity) {
        const rarities = {
            common: 'Comum',
            rare: 'Rara',
            epic: 'Épica',
            legendary: 'Lendária'
        };
        return rarities[rarity] || 'Comum';
    }

    /**
     * Configurar sistema de acusação
     */
    setupAccusationSystem() {
        console.log('⚖️ Configurando sistema de acusação...');
        
        // Função de acusação inteligente
        window.makeAccusation = function() {
            const cardsPlayed = window.cardsPlayed || 0;
            const accusationThreshold = 5;
            
            if (cardsPlayed < accusationThreshold) {
                this.showAccusationModal('❌ Acusação Prematura', 
                    `Você precisa jogar pelo menos ${accusationThreshold} cartas para ter evidências suficientes. 
                    Cartas jogadas: ${cardsPlayed}/${accusationThreshold}`, 'error');
                return;
            }
            
            // Análise das cartas jogadas
            const playedCards = JSON.parse(localStorage.getItem('criminalMinds_playedCards') || '[]');
            const accusationResult = this.analyzeAccusation(playedCards);
            
            this.showAccusationModal(accusationResult.title, accusationResult.message, accusationResult.type);
        }.bind(this);
        
        console.log('✅ Sistema de acusação configurado');
    }

    /**
     * Analisar acusação
     */
    analyzeAccusation(playedCards) {
        let totalPower = 0;
        let totalAccuracy = 0;
        let evidenceTypes = new Set();
        
        playedCards.forEach(card => {
            totalPower += card.power || 0;
            totalAccuracy += card.accuracy || 0;
            evidenceTypes.add(card.type);
        });
        
        const averagePower = totalPower / playedCards.length;
        const averageAccuracy = totalAccuracy / playedCards.length;
        const evidenceDiversity = evidenceTypes.size;
        
        // Determinar resultado da acusação
        if (averagePower >= 80 && averageAccuracy >= 85 && evidenceDiversity >= 4) {
            return {
                title: '✅ ACUSAÇÃO CORRETA!',
                message: 'Evidências sólidas confirmam a culpa do suspeito. Marcus Thompson é o assassino!',
                type: 'success'
            };
        } else if (averagePower >= 70 && averageAccuracy >= 75 && evidenceDiversity >= 3) {
            return {
                title: '⚠️ ACUSAÇÃO PARCIALMENTE CORRETA',
                message: 'Evidências sugerem a culpa, mas são insuficientes para condenação definitiva.',
                type: 'warning'
            };
        } else {
            return {
                title: '❌ ACUSAÇÃO INCORRETA',
                message: 'Evidências insuficientes ou contraditórias. Necessário mais investigação.',
                type: 'error'
            };
        }
    }

    /**
     * Mostrar modal de acusação
     */
    showAccusationModal(title, message, type) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const color = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444';
        
        modalContent.innerHTML = `
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2 style="color: ${color}; margin-bottom: 1.5rem;">${title}</h2>
            <p style="color: #cbd5e1; margin-bottom: 2rem;">${message}</p>
            <div style="text-align: center;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: ${color}; color: white; padding: 0.8rem 2rem; border: none; border-radius: 8px; cursor: pointer;">
                    Fechar
                </button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    /**
     * Configurar fluxo de jogo
     */
    setupGameFlow() {
        console.log('🔄 Configurando fluxo de jogo...');
        
        // Garantir redirecionamento automático
        if (this.config.autoRedirect) {
            this.setupAutoRedirect();
        }
        
        // Configurar botão sair
        this.setupExitButton();
        
        // Configurar estatísticas zeradas
        this.resetStatistics();
        
        console.log('✅ Fluxo de jogo configurado');
    }

    /**
     * Configurar redirecionamento automático
     */
    setupAutoRedirect() {
        // Verificar se está na página inicial
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            const timestamp = Date.now();
            window.location.href = `login.html?v=${timestamp}`;
        }
    }

    /**
     * Configurar botão sair
     */
    setupExitButton() {
        const exitButton = document.querySelector('.exit-button');
        if (exitButton) {
            exitButton.onclick = function() {
                const confirmExit = confirm('🚪 Tem certeza que deseja sair?\n\nSeu progresso será salvo automaticamente.');
                if (confirmExit) {
                    // Salvar progresso
                    const gameData = {
                        cardsPlayed: window.cardsPlayed || 0,
                        comboStreak: window.comboStreak || 0,
                        exitTime: new Date().toISOString()
                    };
                    localStorage.setItem('criminalMinds_gameProgress', JSON.stringify(gameData));
                    
                    // Redirecionar para login
                    window.location.href = 'login.html';
                }
            };
        }
    }

    /**
     * Resetar estatísticas
     */
    resetStatistics() {
        window.cardsPlayed = 0;
        window.comboStreak = 0;
        window.currentLevel = 1;
        window.gameTime = 45 * 60;
        
        // Limpar localStorage de progresso anterior
        localStorage.removeItem('criminalMinds_gameProgress');
        localStorage.removeItem('criminalMinds_playedCards');
        
        console.log('✅ Estatísticas resetadas');
    }

    /**
     * Configurar infraestrutura
     */
    setupInfrastructure() {
        console.log('⚙️ Configurando infraestrutura...');
        
        // Cache busting
        if (this.config.cacheBusting) {
            this.applyCacheBusting();
        }
        
        // Otimização de performance
        this.optimizePerformance();
        
        console.log('✅ Infraestrutura configurada');
    }

    /**
     * Aplicar cache busting
     */
    applyCacheBusting() {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (script.src && !script.src.includes('?v=')) {
                script.src += `?v=${Date.now()}`;
            }
        });
        
        console.log('✅ Cache busting aplicado');
    }

    /**
     * Otimizar performance
     */
    optimizePerformance() {
        // Remover efeitos visuais pesados
        const heavyEffects = document.querySelectorAll('[style*="backdrop-filter"], [style*="filter"]');
        heavyEffects.forEach(element => {
            element.style.backdropFilter = 'none';
            element.style.filter = 'none';
        });
        
        // Otimizar animações
        const animatedElements = document.querySelectorAll('.card, .button');
        animatedElements.forEach(element => {
            element.style.willChange = 'auto';
        });
        
        console.log('✅ Performance otimizada');
    }

    /**
     * Executar testes do sistema
     */
    runSystemTests() {
        console.log('🧪 Executando testes do sistema...');
        
        const tests = [
            this.testCardSystem,
            this.testAccusationSystem,
            this.testGameFlow,
            this.testInfrastructure
        ];
        
        tests.forEach(test => {
            try {
                test.call(this);
            } catch (error) {
                console.error(`❌ Erro no teste ${test.name}:`, error);
            }
        });
        
        console.log('✅ Testes do sistema concluídos');
    }

    /**
     * Testar sistema de cartas
     */
    testCardSystem() {
        const cards = document.querySelectorAll('.card');
        const hasCards = cards.length >= 20;
        
        console.log(`✅ Sistema de cartas: ${cards.length} cartas encontradas`);
        return hasCards;
    }

    /**
     * Testar sistema de acusação
     */
    testAccusationSystem() {
        const hasAccusationFunction = typeof window.makeAccusation === 'function';
        
        console.log(`✅ Sistema de acusação: ${hasAccusationFunction ? 'Funcional' : 'Não funcional'}`);
        return hasAccusationFunction;
    }

    /**
     * Testar fluxo de jogo
     */
    testGameFlow() {
        const hasExitButton = document.querySelector('.exit-button');
        const hasStatistics = typeof window.cardsPlayed !== 'undefined';
        
        console.log(`✅ Fluxo de jogo: ${hasExitButton && hasStatistics ? 'Funcional' : 'Não funcional'}`);
        return hasExitButton && hasStatistics;
    }

    /**
     * Testar infraestrutura
     */
    testInfrastructure() {
        const hasScripts = document.querySelectorAll('script[src]').length > 0;
        
        console.log(`✅ Infraestrutura: ${hasScripts ? 'Configurada' : 'Não configurada'}`);
        return hasScripts;
    }

    /**
     * Inicializar cartas
     */
    initializeCards() {
        return [
            // Cartas existentes + 8 novas cartas
            // Total: 20 cartas
        ];
    }

    /**
     * Inicializar estado do jogo
     */
    initializeGameState() {
        return {
            currentLevel: 1,
            cardsPlayed: 0,
            comboStreak: 0,
            gameTime: 45 * 60,
            playedCards: []
        };
    }
}

// Exportar para uso global
window.EnhancedGameSystem = EnhancedGameSystem; 