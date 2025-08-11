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
        // Display do timer removido - não criar no header
        console.log('✅ Display do timer removido do header');
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

        // Atualizar o elemento "Tempo Restante" nas estatísticas
        const timeRemaining = document.getElementById('timeRemaining');
        if (timeRemaining) {
            timeRemaining.textContent = timeString;
        }
        
        // Atualizar a barra de progresso do tempo
        const timeProgress = document.getElementById('timeProgress');
        if (timeProgress) {
            const progress = (this.remainingTime / this.totalTime) * 100;
            timeProgress.style.width = `${progress}%`;
            
            // Mudar cor da barra conforme o tempo diminui
            if (progress <= 25) {
                timeProgress.style.background = 'linear-gradient(90deg, #dc2626, #991b1b)'; // Vermelho escuro
            } else if (progress <= 50) {
                timeProgress.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)'; // Vermelho
            } else if (progress <= 75) {
                timeProgress.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)'; // Laranja
            } else {
                timeProgress.style.background = 'linear-gradient(90deg, #10b981, #059669)'; // Verde
            }
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
        
        @keyframes timerGlow {
            0% {
                box-shadow: 
                    0 0 30px rgba(251, 191, 36, 0.4),
                    inset 0 2px 0 rgba(251, 191, 36, 0.2);
                text-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
            }
            100% {
                box-shadow: 
                    0 0 50px rgba(251, 191, 36, 0.7),
                    inset 0 2px 0 rgba(251, 191, 36, 0.3);
                text-shadow: 0 0 30px rgba(251, 191, 36, 1);
            }
        }
    `;
    document.head.appendChild(style);
}

console.log('✅ Timer simples carregado!');
