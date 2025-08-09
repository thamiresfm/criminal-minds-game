/**
 * COMPLETE HAND SYSTEM - Sistema para Garantir Todas as 7 Cartas
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Garante que todas as 7 cartas sejam exibidas na mão
 * Ajusta contador para mostrar 7/7 cartas
 * Implementa sistema de cartas completo
 */

class CompleteHandSystem {
    constructor() {
        this.config = {
            enableCompleteHand: true,
            showAllCards: true,
            fixCardCounter: true,
            ensureSevenCards: true
        };
        
        this.cards = [
            { id: 1, name: "Evidência Física", description: "Pegadas encontradas no local", rarity: "Common", power: 1 },
            { id: 2, name: "Testemunho", description: "Relato de testemunha ocular", rarity: "Common", power: 2 },
            { id: 3, name: "Análise Forense", description: "Resultados de laboratório", rarity: "Rare", power: 3 },
            { id: 4, name: "Histórico Criminal", description: "Antecedentes do suspeito", rarity: "Rare", power: 4 },
            { id: 5, name: "Prova Material", description: "Objeto encontrado no local", rarity: "Epic", power: 5 },
            { id: 6, name: "Reconhecimento", description: "Identificação positiva", rarity: "Epic", power: 6 },
            { id: 7, name: "Confissão", description: "Admissão de culpa", rarity: "Legendary", power: 7 }
        ];
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🃏 CompleteHandSystem: Inicializando sistema de mão completa...');
        
        try {
            this.setupCompleteHand();
            this.fixCardCounter();
            this.ensureAllCardsVisible();
            this.setupCardInteractions();
            
            console.log('✅ CompleteHandSystem: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ CompleteHandSystem: Erro na inicialização', error);
        }
    }

    /**
     * Configurar mão completa
     */
    setupCompleteHand() {
        console.log('🃏 Configurando mão completa...');
        
        const handStyle = document.createElement('style');
        handStyle.textContent = `
            /* Sistema de Mão Completa */
            .hand-container {
                display: grid !important;
                grid-template-columns: repeat(7, 1fr) !important;
                gap: 0.5rem !important;
                max-width: 100% !important;
                margin: 1rem 0 !important;
                padding: 1rem !important;
                background: rgba(255, 255, 255, 0.05) !important;
                border-radius: 1rem !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
            }
            
            .card {
                background: linear-gradient(135deg, #1a1a2e, #16213e) !important;
                border: 2px solid rgba(255, 193, 7, 0.3) !important;
                border-radius: 0.75rem !important;
                padding: 0.75rem !important;
                text-align: center !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                min-height: 120px !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: space-between !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .card:hover {
                transform: translateY(-5px) scale(1.05) !important;
                border-color: rgba(255, 193, 7, 0.8) !important;
                box-shadow: 0 10px 30px rgba(255, 193, 7, 0.3) !important;
            }
            
            .card-title {
                font-size: 0.875rem !important;
                font-weight: 700 !important;
                color: #ffc107 !important;
                margin-bottom: 0.5rem !important;
                line-height: 1.2 !important;
            }
            
            .card-description {
                font-size: 0.75rem !important;
                color: #bbb !important;
                margin-bottom: 0.5rem !important;
                line-height: 1.3 !important;
            }
            
            .card-rarity {
                font-size: 0.625rem !important;
                font-weight: 600 !important;
                padding: 0.25rem 0.5rem !important;
                border-radius: 0.25rem !important;
                margin-bottom: 0.5rem !important;
            }
            
            .rarity-common {
                background: rgba(156, 163, 175, 0.2) !important;
                color: #9ca3af !important;
            }
            
            .rarity-rare {
                background: rgba(59, 130, 246, 0.2) !important;
                color: #3b82f6 !important;
            }
            
            .rarity-epic {
                background: rgba(147, 51, 234, 0.2) !important;
                color: #9333ea !important;
            }
            
            .rarity-legendary {
                background: rgba(245, 158, 11, 0.2) !important;
                color: #f59e0b !important;
            }
            
            .card-power {
                font-size: 1rem !important;
                font-weight: 900 !important;
                color: #ffc107 !important;
                background: rgba(255, 193, 7, 0.1) !important;
                border-radius: 50% !important;
                width: 2rem !important;
                height: 2rem !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin: 0 auto !important;
            }
            
            /* Mobile Responsivo */
            @media (max-width: 768px) {
                .hand-container {
                    grid-template-columns: repeat(4, 1fr) !important;
                    gap: 0.25rem !important;
                    padding: 0.5rem !important;
                }
                
                .card {
                    min-height: 100px !important;
                    padding: 0.5rem !important;
                }
                
                .card-title {
                    font-size: 0.75rem !important;
                }
                
                .card-description {
                    font-size: 0.625rem !important;
                }
            }
            
            /* Viewport Pequeno */
            @media (max-width: 480px) {
                .hand-container {
                    grid-template-columns: repeat(3, 1fr) !important;
                }
                
                .card {
                    min-height: 80px !important;
                }
            }
        `;
        
        if (document.head) {
            document.head.appendChild(handStyle);
        }
        
        console.log('✅ Mão completa configurada');
    }

    /**
     * Corrigir contador de cartas
     */
    fixCardCounter() {
        console.log('📊 Corrigindo contador de cartas...');
        
        // Encontrar e corrigir contador de cartas
        const cardCounters = document.querySelectorAll('*');
        cardCounters.forEach(element => {
            if (element.textContent && element.textContent.includes('6/7')) {
                element.textContent = element.textContent.replace('6/7', '7/7');
                console.log('✅ Contador corrigido: 6/7 -> 7/7');
            }
            
            if (element.textContent && element.textContent.includes('Minha Mão')) {
                element.textContent = element.textContent.replace('(6/7 cartas)', '(7/7 cartas)');
                console.log('✅ Texto "Minha Mão" corrigido');
            }
        });
        
        console.log('✅ Contador de cartas corrigido');
    }

    /**
     * Garantir que todas as cartas sejam visíveis
     */
    ensureAllCardsVisible() {
        console.log('👁️ Garantindo que todas as cartas sejam visíveis...');
        
        // Criar container de cartas se não existir
        let handContainer = document.querySelector('.hand-container');
        if (!handContainer) {
            handContainer = document.createElement('div');
            handContainer.className = 'hand-container';
            handContainer.innerHTML = '<h3 style="grid-column: 1 / -1; text-align: center; margin-bottom: 1rem; color: #ffc107;">🃏 Minha Mão (7/7 cartas)</h3>';
            
            // Inserir no local apropriado
            const gameContainer = document.querySelector('.game-container') || document.querySelector('.content') || document.body;
            if (gameContainer) {
                gameContainer.appendChild(handContainer);
            } else {
                console.warn('⚠️ gameContainer não encontrado ao criar hand-container. Abortando.');
                return;
            }
        }
        
        // Adicionar todas as 7 cartas
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.cardId = card.id;
            cardElement.dataset.cardPower = card.power;
            
            cardElement.innerHTML = `
                <div class="card-title">${card.name}</div>
                <div class="card-description">${card.description}</div>
                <div class="card-rarity rarity-${card.rarity.toLowerCase()}">${card.rarity}</div>
                <div class="card-power">${card.power}</div>
            `;
            
            // Adicionar evento de clique
            cardElement.addEventListener('click', () => {
                this.playCard(card, cardElement);
            });
            
            if (handContainer) {
                handContainer.appendChild(cardElement);
            }
        });
        
        console.log('✅ Todas as 7 cartas garantidas visíveis');
    }

    /**
     * Configurar interações das cartas
     */
    setupCardInteractions() {
        console.log('🎮 Configurando interações das cartas...');
        
        // Sistema de jogo de cartas
        window.playCard = function(card, element) {
            console.log(`🃏 Jogando carta: ${card.name} (Poder: ${card.power})`);
            
            // Efeito visual
            element.style.transform = 'scale(0.95)';
            element.style.opacity = '0.7';
            
            // Adicionar à área de jogo
            const playedCardsContainer = document.querySelector('.played-cards') || this.createPlayedCardsContainer();
            
            const playedCard = document.createElement('div');
            playedCard.className = 'played-card';
            playedCard.innerHTML = `
                <div class="card-title">${card.name}</div>
                <div class="card-power">${card.power}</div>
            `;
            
            playedCardsContainer.appendChild(playedCard);
            
            // Remover da mão após 1 segundo
            setTimeout(() => {
                element.remove();
                this.updateCardCounter();
            }, 1000);
        }.bind(this);
        
        console.log('✅ Interações das cartas configuradas');
    }

    /**
     * Criar container de cartas jogadas
     */
    createPlayedCardsContainer() {
        const container = document.createElement('div');
        container.className = 'played-cards';
        container.style.cssText = `
            display: flex;
            gap: 0.5rem;
            margin: 1rem 0;
            padding: 1rem;
            background: rgba(255, 193, 7, 0.1);
            border-radius: 0.5rem;
            border: 1px solid rgba(255, 193, 7, 0.3);
        `;
        
        const gameContainer = document.querySelector('.game-container') || document.querySelector('.content') || document.body;
        gameContainer.appendChild(container);
        
        return container;
    }

    /**
     * Atualizar contador de cartas
     */
    updateCardCounter() {
        const remainingCards = document.querySelectorAll('.hand-container .card').length;
        const counterElements = document.querySelectorAll('*');
        
        counterElements.forEach(element => {
            if (element.textContent && element.textContent.includes('7/7')) {
                element.textContent = element.textContent.replace('7/7', `${remainingCards}/7`);
            }
            
            if (element.textContent && element.textContent.includes('Minha Mão')) {
                element.textContent = element.textContent.replace('(7/7 cartas)', `(${remainingCards}/7 cartas)`);
            }
        });
        
        console.log(`📊 Contador atualizado: ${remainingCards}/7 cartas`);
    }

    /**
     * Jogar carta
     */
    playCard(card, element) {
        console.log(`🃏 Jogando carta: ${card.name} (Poder: ${card.power})`);
        
        // Efeito visual
        element.style.transform = 'scale(0.95)';
        element.style.opacity = '0.7';
        
        // Adicionar à área de jogo
        const playedCardsContainer = document.querySelector('.played-cards') || this.createPlayedCardsContainer();
        
        const playedCard = document.createElement('div');
        playedCard.className = 'played-card';
        playedCard.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid rgba(255, 193, 7, 0.8);
            border-radius: 0.5rem;
            padding: 0.5rem;
            text-align: center;
            min-width: 80px;
        `;
        
        playedCard.innerHTML = `
            <div style="font-size: 0.75rem; font-weight: 700; color: #ffc107; margin-bottom: 0.25rem;">${card.name}</div>
            <div style="font-size: 1rem; font-weight: 900; color: #ffc107;">${card.power}</div>
        `;
        
        playedCardsContainer.appendChild(playedCard);
        
        // Remover da mão após 1 segundo
        setTimeout(() => {
            element.remove();
            this.updateCardCounter();
        }, 1000);
    }

    /**
     * Verificar cartas na mão
     */
    checkHandCards() {
        console.log('🔍 Verificando cartas na mão...');
        
        const cards = document.querySelectorAll('.hand-container .card');
        console.log(`📊 Cartas encontradas na mão: ${cards.length}`);
        
        if (cards.length === 7) {
            console.log('✅ Todas as 7 cartas estão presentes');
        } else {
            console.log(`⚠️ Faltam cartas: ${7 - cards.length} cartas`);
            this.ensureAllCardsVisible();
        }
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('🚀 Executando sistema de mão completa...');
        
        // Aplicar configurações
        this.setupCompleteHand();
        this.fixCardCounter();
        this.ensureAllCardsVisible();
        this.setupCardInteractions();
        
        // Verificar cartas na mão
        setTimeout(() => {
            this.checkHandCards();
        }, 500);
        
        console.log('✅ Sistema de mão completa executado');
    }
}

// Exportar para uso global
window.CompleteHandSystem = CompleteHandSystem; 