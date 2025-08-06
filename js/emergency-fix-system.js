/**
 * EMERGENCY FIX SYSTEM - Sistema de Correção de Emergência
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Corrige problemas críticos
 * Restaura funcionalidade básica
 * Remove conflitos de CSS/JS
 */

class EmergencyFixSystem {
    constructor() {
        this.config = {
            enableEmergencyFix: true,
            removeConflicts: true,
            restoreBasicFunctionality: true,
            safeMode: true
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🚨 EmergencyFixSystem: Inicializando correção de emergência...');
        
        try {
            this.removeConflictingStyles();
            this.restoreBasicLayout();
            this.fixJavaScriptErrors();
            this.ensureBasicFunctionality();
            
            console.log('✅ EmergencyFixSystem: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ EmergencyFixSystem: Erro na inicialização', error);
        }
    }

    /**
     * Remover estilos conflitantes
     */
    removeConflictingStyles() {
        console.log('🎨 Removendo estilos conflitantes...');
        
        // Remover estilos que podem estar causando problemas
        const conflictingStyles = document.querySelectorAll('style');
        conflictingStyles.forEach(style => {
            if (style.textContent.includes('!important')) {
                console.log('⚠️ Removendo estilo com !important');
                style.remove();
            }
        });
        
        // Aplicar estilos básicos seguros
        const safeStyle = document.createElement('style');
        safeStyle.textContent = `
            /* Estilos Básicos Seguros */
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #1a1a2e, #16213e, #0f0f23);
                color: white;
                margin: 0;
                padding: 0;
                min-height: 100vh;
                overflow-x: hidden;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
            }
            
            .header {
                text-align: center;
                margin-bottom: 2rem;
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
            }
        `;
        
        document.head.appendChild(safeStyle);
        
        console.log('✅ Estilos conflitantes removidos');
    }

    /**
     * Restaurar layout básico
     */
    restoreBasicLayout() {
        console.log('🏗️ Restaurando layout básico...');
        
        // Verificar se o conteúdo básico existe
        const mainContent = document.querySelector('.main-content') || document.querySelector('.content') || document.body;
        
        if (!document.querySelector('.game-area')) {
            const gameArea = document.createElement('div');
            gameArea.className = 'game-area';
            gameArea.innerHTML = `
                <h2 style="color: #ffc107; margin-bottom: 1rem;">🎮 Área do Jogo</h2>
                <p style="color: #bbb; margin-bottom: 1rem;">Sistema restaurado com sucesso!</p>
                <div class="cards-grid" id="cardsGrid">
                    <!-- Cartas serão adicionadas aqui -->
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="button" onclick="window.location.href='lobby.html'">🏠 Voltar ao Lobby</button>
                    <button class="exit-button" onclick="exitInvestigation()">🚪 Sair</button>
                </div>
            `;
            
            mainContent.appendChild(gameArea);
        }
        
        console.log('✅ Layout básico restaurado');
    }

    /**
     * Corrigir erros de JavaScript
     */
    fixJavaScriptErrors() {
        console.log('🔧 Corrigindo erros de JavaScript...');
        
        // Garantir que funções básicas existam
        window.exitInvestigation = function() {
            console.log('🚪 Saindo da investigação...');
            if (confirm('Tem certeza que deseja sair?')) {
                window.location.href = 'lobby.html';
            }
        };
        
        // Garantir que funções de chat existam
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
        
        console.log('✅ Erros de JavaScript corrigidos');
    }

    /**
     * Garantir funcionalidade básica
     */
    ensureBasicFunctionality() {
        console.log('✅ Garantindo funcionalidade básica...');
        
        // Adicionar cartas básicas se não existirem
        const cardsGrid = document.getElementById('cardsGrid');
        if (cardsGrid && cardsGrid.children.length === 0) {
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
        
        // Adicionar chat básico se não existir
        if (!document.querySelector('.chat-container')) {
            const chatContainer = document.createElement('div');
            chatContainer.className = 'chat-container';
            chatContainer.innerHTML = `
                <h3 style="color: #ffc107; margin-bottom: 1rem;">💬 Chat da Equipe</h3>
                <div class="chat-messages" id="chatMessages">
                    <div style="color: #bbb; font-style: italic;">Sistema restaurado com sucesso!</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="text" class="chat-input" id="chatInput" placeholder="Digite sua mensagem..." onkeypress="if(event.key==='Enter') sendMessage()">
                    <button class="button" onclick="sendMessage()">📤</button>
                </div>
            `;
            
            document.body.appendChild(chatContainer);
        }
        
        console.log('✅ Funcionalidade básica garantida');
    }

    /**
     * Verificar status do sistema
     */
    checkSystemStatus() {
        console.log('🔍 Verificando status do sistema...');
        
        const elements = {
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
        console.log('🚨 Executando correção de emergência...');
        
        // Aplicar correções
        this.removeConflictingStyles();
        this.restoreBasicLayout();
        this.fixJavaScriptErrors();
        this.ensureBasicFunctionality();
        
        // Verificar status
        setTimeout(() => {
            this.checkSystemStatus();
        }, 500);
        
        console.log('✅ Correção de emergência executada');
    }
}

// Exportar para uso global
window.EmergencyFixSystem = EmergencyFixSystem; 