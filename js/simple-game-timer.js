// Timer Simples para o Jogo Criminal Minds
console.log('🔧 Timer simples carregando...');

class SimpleGameTimer {
    constructor() {
        this.totalTime = 45 * 60; // 45 minutos
        this.remainingTime = this.totalTime;
        this.isRunning = false;
        this.interval = null;
        this.callbacks = {};
        
        console.log('✅ SimpleGameTimer construído');
        this.init();
    }
    
    init() {
        console.log('⏱️ Timer simples inicializado - 45:00 minutos');
        this.createTimerDisplay();
        this.updateDisplay();
    }
    
    createTimerDisplay() {
        // Criar display do timer no header
        const header = document.querySelector('.header');
        if (header) {
            const existingTimer = header.querySelector('.game-timer-display');
            if (!existingTimer) {
                const timerDiv = document.createElement('div');
                timerDiv.className = 'game-timer-display';
                timerDiv.id = 'gameTimer';
                timerDiv.innerHTML = `
                    <div style="
                        font-size: 1.4rem;
                        color: #ef4444;
                        font-weight: 700;
                        text-shadow: 0 0 12px rgba(239, 68, 68, 0.6);
                        background: rgba(239, 68, 68, 0.1);
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        border: 1px solid rgba(239, 68, 68, 0.3);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <span>⏱️</span>
                        <span id="timerDisplay">45:00</span>
                    </div>
                `;
                
                // Inserir após o título do caso
                const caseTitle = header.querySelector('.case-title');
                if (caseTitle) {
                    caseTitle.parentNode.insertBefore(timerDiv, caseTitle.nextSibling);
                } else {
                    header.appendChild(timerDiv);
                }
                
                console.log('✅ Display do timer criado no header');
            }
        }
        
        // Controles do timer removidos conforme solicitado
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => {
            if (this.remainingTime > 0) {
                this.remainingTime--;
                this.updateDisplay();
                this.checkWarnings();
            } else {
                this.timeout();
            }
        }, 1000);
        
        console.log('⏱️ Timer iniciado');
        this.triggerCallback('start');
    }
    
    togglePause() {
        if (!this.isRunning) return;
        
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            console.log('⏸️ Timer pausado');
            this.triggerCallback('pause');
        } else {
            this.start();
            console.log('▶️ Timer retomado');
            this.triggerCallback('resume');
        }
    }
    
    reset() {
        this.stop();
        this.remainingTime = this.totalTime;
        this.updateDisplay();
        console.log('🔄 Timer resetado');
        this.triggerCallback('reset');
    }
    
    stop() {
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    timeout() {
        this.stop();
        this.remainingTime = 0;
        this.updateDisplay();
        console.log('⏰ Tempo esgotado!');
        this.triggerCallback('timeout');
        
        // Alertar o usuário
        alert('⏰ TEMPO ESGOTADO! A investigação será encerrada automaticamente.');
    }
    
    checkWarnings() {
        if (this.remainingTime <= 5 * 60) { // 5 minutos
            this.showCriticalWarning();
        } else if (this.remainingTime <= 15 * 60) { // 15 minutos
            this.showWarning();
        } else if (this.remainingTime <= 30 * 60) { // 30 minutos
            this.showNotice();
        }
    }
    
    showCriticalWarning() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.style.color = '#e74c3c';
            timerDisplay.style.animation = 'pulse 0.5s infinite';
        }
        this.triggerCallback('critical', this.remainingTime);
    }
    
    showWarning() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.style.color = '#f39c12';
            timerDisplay.style.animation = 'pulse 1s infinite';
        }
        this.triggerCallback('warning', this.remainingTime);
    }
    
    showNotice() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.style.color = '#f1c40f';
        }
        this.triggerCallback('notice', this.remainingTime);
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const display = document.getElementById('timerDisplay');
        if (display) {
            display.textContent = timeString;
        }
        
        // Atualizar também o elemento original do jogo se existir
        const gameTimer = document.getElementById('gameTimer');
        if (gameTimer) {
            gameTimer.textContent = `⏱️ ${timeString}`;
        }
    }
    
    on(event, callback) {
        this.callbacks[event] = callback;
    }
    
    triggerCallback(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event](data);
        }
    }
    
    getRemainingTime() {
        return this.remainingTime;
    }
}

// Criar instância global após DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM carregado, criando timer simples...');
    window.simpleGameTimer = new SimpleGameTimer();
    console.log('📄 DOM carregado, timer simples pronto!');
    
    // Configurar callbacks padrão
    window.simpleGameTimer.on('timeout', () => {
        console.log('⏰ Tempo esgotado!');
        if (typeof addChatMessage === 'function') {
            addChatMessage('⏰ TEMPO ESGOTADO! A investigação será encerrada automaticamente.', 'Sistema');
        }
    });
    
    window.simpleGameTimer.on('critical', (time) => {
        console.log('🚨 Tempo crítico:', time, 'segundos restantes');
        if (typeof addChatMessage === 'function') {
            addChatMessage('🚨 ATENÇÃO: Tempo crítico! Menos de 5 minutos restantes!', 'Sistema');
        }
    });
    
    window.simpleGameTimer.on('warning', (time) => {
        console.log('⚠️ Aviso de tempo:', time, 'segundos restantes');
        if (typeof addChatMessage === 'function') {
            addChatMessage('⚠️ AVISO: 15 minutos restantes para finalizar a investigação!', 'Sistema');
        }
    });
    
    // Iniciar automaticamente após 2 segundos
    setTimeout(() => {
        console.log('🚀 Iniciando timer automaticamente...');
        window.simpleGameTimer.start();
    }, 2000);
});

// Adicionar CSS para animação (apenas se não existir)
if (!document.getElementById('timer-pulse-animation')) {
    const style = document.createElement('style');
    style.id = 'timer-pulse-animation';
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
}

console.log('✅ Timer simples carregado!');
