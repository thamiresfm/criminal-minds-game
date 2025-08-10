// Timer Simples para Teste
console.log('🔧 Timer simples carregando...');

class SimpleTimer {
    constructor() {
        this.totalTime = 45 * 60; // 45 minutos
        this.remainingTime = this.totalTime;
        this.isRunning = false;
        this.interval = null;
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.interval = setInterval(() => {
            if (this.remainingTime > 0) {
                this.remainingTime--;
                this.updateDisplay();
            } else {
                this.stop();
                alert('⏰ Tempo esgotado!');
            }
        }, 1000);
        
        console.log('▶️ Timer iniciado');
    }
    
    stop() {
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        console.log('⏹️ Timer parado');
    }
    
    reset() {
        this.stop();
        this.remainingTime = this.totalTime;
        this.updateDisplay();
        console.log('🔄 Timer resetado');
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Atualizar elementos na página
        const display = document.getElementById('timer-display');
        if (display) {
            display.textContent = `Timer: ${timeString}`;
        }
        
        console.log(`⏱️ ${timeString}`);
    }
    
    getRemainingTime() {
        return this.remainingTime;
    }
}

// Criar instância global
window.simpleTimer = new SimpleTimer();

// Auto-inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM carregado, timer simples pronto!');
    window.simpleTimer.updateDisplay();
});

console.log('✅ Timer simples carregado!');
