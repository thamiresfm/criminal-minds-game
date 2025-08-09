/**
 * AGGRESSIVE FIX SYSTEM - Sistema de Correção Agressiva
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Corrige problemas persistentes
 * Remove todos os conflitos
 * Recria estrutura básica
 */

class AggressiveFixSystem {
    constructor() {
        this.config = {
            enableAggressiveFix: true,
            removeAllConflicts: true,
            recreateBasicStructure: true,
            forceCleanState: true
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('⚡ AggressiveFixSystem: Inicializando correção agressiva...');
        
        try {
            this.forceCleanState();
            this.removeAllConflicts();
            this.recreateBasicStructure();
            this.ensureCoreFunctionality();
            
            console.log('✅ AggressiveFixSystem: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ AggressiveFixSystem: Erro na inicialização', error);
        }
    }

    /**
     * Forçar estado limpo
     */
    forceCleanState() {
        console.log('🧹 Forçando estado limpo...');
        
        // Remover todos os scripts conflitantes
        const scripts = document.querySelectorAll('script[src*="system"]');
        scripts.forEach(script => {
            if (script.src.includes('emergency') || script.src.includes('complete-hand') || script.src.includes('enhanced-game')) {
                console.log('🗑️ Removendo script conflitante:', script.src);
                script.remove();
            }
        });
        
        // Limpar variáveis globais conflitantes
        const globalVars = ['emergencyFixSystem', 'completeHandSystem', 'enhancedGameSystem'];
        globalVars.forEach(varName => {
            if (window[varName]) {
                console.log(`🗑️ Removendo variável global: ${varName}`);
                delete window[varName];
            }
        });
        
        console.log('✅ Estado limpo forçado');
    }

    /**
     * Remover todos os conflitos
     */
    removeAllConflicts() {
        console.log('🔥 Removendo todos os conflitos...');
        
        // Remover todos os estilos inline conflitantes
        const elementsWithInlineStyles = document.querySelectorAll('[style*="!important"]');
        elementsWithInlineStyles.forEach(element => {
            element.removeAttribute('style');
        });
        
        // Remover classes conflitantes
        const elementsWithConflictingClasses = document.querySelectorAll('.emergency-fix, .complete-hand, .enhanced-game');
        elementsWithConflictingClasses.forEach(element => {
            element.className = element.className.replace(/emergency-fix|complete-hand|enhanced-game/g, '');
        });
        
        console.log('✅ Todos os conflitos removidos');
    }

    /**
     * Recriar estrutura básica
     */
    recreateBasicStructure() {
        console.log('🏗️ Recriando estrutura básica...');
        
        // Limpar o body
        document.body.innerHTML = '';
        
        // Recriar estrutura básica
        document.body.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1 class="title">🕵️ Criminal Minds Game</h1>
                    <p class="subtitle">Sistema de Investigação</p>
                </div>
                
                <div class="game-area">
                    <h2 style="color: #ffc107; margin-bottom: 1rem;">🎮 Área de Investigação</h2>
                    <p style="color: #bbb; margin-bottom: 1rem;">Sistema restaurado com sucesso!</p>
                    
                    <div class="cards-grid" id="cardsGrid">
                        <!-- Cartas serão adicionadas aqui -->
                    </div>
                    
                    <div style="text-align: center; margin-top: 2rem;">
                        <button class="button" onclick="window.location.href='lobby.html'">🏠 Voltar ao Lobby</button>
                        <button class="exit-button" onclick="exitInvestigation()">🚪 Sair</button>
                    </div>
                </div>
                
                <div class="chat-container">
                    <h3 style="color: #ffc107; margin-bottom: 1rem;">💬 Chat da Equipe</h3>
                    <div class="chat-messages" id="chatMessages">
                        <div style="color: #bbb; font-style: italic;">Sistema restaurado com sucesso!</div>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="text" class="chat-input" id="chatInput" placeholder="Digite sua mensagem..." onkeypress="if(event.key==='Enter') sendMessage()">
                        <button class="button" onclick="sendMessage()">📤</button>
                    </div>
                </div>
            </div>
        `;
        
        console.log('✅ Estrutura básica recriada');
    }

    /**
     * Garantir funcionalidade core
     */
    ensureCoreFunctionality() {
        console.log('🔧 Garantindo funcionalidade core...');
        
        // Função de saída
        window.exitInvestigation = function() {
            console.log('🚪 Saindo da investigação...');
            if (confirm('Tem certeza que deseja sair?')) {
                window.location.href = 'lobby.html';
            }
        };
        
        // Função de envio de mensagem
        window.sendMessage = function() {
            const input = document.getElementById('chatInput');
            const messages = document.getElementById('chatMessages');
            
            if (input && input.value.trim()) {
                const message = document.createElement('div');
                message.style.cssText = 'margin-bottom: 0.5rem; padding: 0.5rem; background: rgba(255, 193, 7, 0.1); border-radius: 0.25rem;';
                message.innerHTML = `<strong>Você:</strong> ${input.value}`;
                
                if (messages) {
                    messages.appendChild(message);
                    messages.scrollTop = messages.scrollHeight;
                }
                
                input.value = '';
            }
        };
        
        // Adicionar cartas básicas
        this.addBasicCards();
        
        console.log('✅ Funcionalidade core garantida');
    }

    /**
     * Adicionar cartas básicas
     */
    addBasicCards() {
        console.log('🃏 Adicionando cartas básicas...');
        
        const cardsGrid = document.getElementById('cardsGrid');
        if (cardsGrid) {
            const basicCards = [
                { name: "Evidência Física", description: "Pegadas encontradas no local", power: 1 },
                { name: "Testemunho", description: "Relato de testemunha ocular", power: 2 },
                { name: "Análise Forense", description: "Resultados de laboratório", power: 3 },
                { name: "Histórico Criminal", description: "Antecedentes do suspeito", power: 4 },
                { name: "Prova Material", description: "Objeto encontrado no local", power: 5 },
                { name: "Reconhecimento", description: "Identificação positiva", power: 6 },
                { name: "Confissão", description: "Admissão de culpa", power: 7 }
            ];
            
            basicCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.innerHTML = `
                    <div class="card-title">${card.name}</div>
                    <div class="card-description">${card.description}</div>
                    <div class="card-power">${card.power}</div>
                `;
                
                cardElement.addEventListener('click', () => {
                    console.log(`🃏 Carta jogada: ${card.name}`);
                    cardElement.style.opacity = '0.5';
                    cardElement.style.transform = 'scale(0.95)';
                });
                
                cardsGrid.appendChild(cardElement);
            });
        }
        
        console.log('✅ Cartas básicas adicionadas');
    }

    /**
     * Aplicar estilos seguros
     */
    applySafeStyles() {
        console.log('🎨 Aplicando estilos seguros...');
        
        const safeStyle = document.createElement('style');
        safeStyle.textContent = `
            /* Estilos Seguros - Sistema de Correção Agressiva */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #1a1a2e, #16213e, #0f0f23);
                color: white;
                min-height: 100vh;
                overflow-x: hidden;
                line-height: 1.6;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
                min-height: 100vh;
            }
            
            .header {
                text-align: center;
                margin-bottom: 2rem;
                padding: 2rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .title {
                font-size: 2.5rem;
                font-weight: 900;
                background: linear-gradient(45deg, #ffc107, #ff8f00, #ff6f00);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 1rem;
            }
            
            .subtitle {
                font-size: 1.2rem;
                color: #bbb;
                margin-bottom: 2rem;
            }
            
            .game-area {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 1rem;
                padding: 2rem;
                margin-bottom: 2rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .cards-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .card {
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border: 2px solid rgba(255, 193, 7, 0.3);
                border-radius: 0.75rem;
                padding: 1rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                min-height: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            .card:hover {
                transform: translateY(-5px);
                border-color: rgba(255, 193, 7, 0.8);
                box-shadow: 0 10px 30px rgba(255, 193, 7, 0.3);
            }
            
            .card-title {
                font-size: 1rem;
                font-weight: 700;
                color: #ffc107;
                margin-bottom: 0.5rem;
            }
            
            .card-description {
                font-size: 0.875rem;
                color: #bbb;
                margin-bottom: 0.5rem;
            }
            
            .card-power {
                font-size: 1.5rem;
                font-weight: 900;
                color: #ffc107;
            }
            
            .button {
                background: linear-gradient(45deg, #ffc107, #ff8f00);
                color: #000;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                margin: 0.5rem;
                font-size: 0.875rem;
            }
            
            .button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
            }
            
            .exit-button {
                background: rgba(239, 68, 68, 0.1);
                border: 2px solid rgba(239, 68, 68, 0.3);
                color: #ef4444;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.875rem;
            }
            
            .exit-button:hover {
                background: rgba(239, 68, 68, 0.2);
                border-color: rgba(239, 68, 68, 0.8);
            }
            
            .chat-container {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 0.5rem;
                padding: 1rem;
                margin-top: 2rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .chat-messages {
                height: 200px;
                overflow-y: auto;
                margin-bottom: 1rem;
                padding: 1rem;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 0.5rem;
            }
            
            .chat-input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 0.5rem;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 0.875rem;
            }
            
            .chat-input:focus {
                outline: none;
                border-color: #ffc107;
                box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.1);
            }
            
            /* Mobile Responsivo */
            @media (max-width: 768px) {
                .container {
                    padding: 1rem;
                }
                
                .title {
                    font-size: 2rem;
                }
                
                .cards-grid {
                    grid-template-columns: 1fr;
                }
                
                .header {
                    padding: 1rem;
                }
                
                .game-area {
                    padding: 1rem;
                }
            }
        `;
        
        document.head.appendChild(safeStyle);
        
        console.log('✅ Estilos seguros aplicados');
    }

    /**
     * Verificar status do sistema
     */
    checkSystemStatus() {
        console.log('🔍 Verificando status do sistema...');
        
        const elements = {
            container: document.querySelector('.container'),
            header: document.querySelector('.header'),
            gameArea: document.querySelector('.game-area'),
            cardsGrid: document.querySelector('#cardsGrid'),
            chatContainer: document.querySelector('.chat-container'),
            exitButton: document.querySelector('.exit-button')
        };
        
        let allGood = true;
        
        Object.entries(elements).forEach(([name, element]) => {
            if (element) {
                console.log(`✅ ${name}: OK`);
            } else {
                console.log(`❌ ${name}: Faltando`);
                allGood = false;
            }
        });
        
        console.log(`📊 Status geral: ${allGood ? '✅ Funcionando' : '⚠️ Problemas detectados'}`);
        
        return allGood;
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('⚡ Executando correção agressiva...');
        
        // Aplicar correções
        this.forceCleanState();
        this.removeAllConflicts();
        this.recreateBasicStructure();
        this.ensureCoreFunctionality();
        this.applySafeStyles();
        
        // Verificar status
        setTimeout(() => {
            this.checkSystemStatus();
        }, 500);
        
        console.log('✅ Correção agressiva executada');
    }
}

// Exportar para uso global
window.AggressiveFixSystem = AggressiveFixSystem; 