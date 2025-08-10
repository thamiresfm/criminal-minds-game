/**
 * ⏱️ Game Timer - Sistema de Contador Regressivo de 45 Minutos (Versão Corrigida)
 * Criminal Minds Game - Timer Management System
 */

console.log('🔧 Game Timer carregando...');

class GameTimer {
    constructor() {
        this.totalTime = 45 * 60; // 45 minutos em segundos
        this.remainingTime = this.totalTime;
        this.isRunning = false;
        this.isPaused = false;
        this.timerInterval = null;
        this.warningThresholds = {
            critical: 5 * 60,    // 5 minutos - VERMELHO
            warning: 15 * 60,    // 15 minutos - LARANJA
            notice: 30 * 60      // 30 minutos - AMARELO
        };
        
        this.callbacks = {
            onTick: null,
            onWarning: null,
            onCritical: null,
            onTimeout: null,
            onPause: null,
            onResume: null
        };
        
        console.log('✅ GameTimer construído');
        this.init();
    }
    
    init() {
        console.log('⏱️ Game Timer inicializado - 45:00 minutos');
        this.updateDisplay();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        try {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM carregado, configurando controles...');
                this.setupTimerControls();
            });
        } catch (error) {
            console.error('❌ Erro ao configurar event listeners:', error);
        }
    }
    
    setupTimerControls() {
        try {
            if (!document.getElementById('timer-controls')) {
                this.createTimerControls();
            }
            
            const startBtn = document.getElementById('timer-start');
            const pauseBtn = document.getElementById('timer-pause');
            const resetBtn = document.getElementById('timer-reset');
            
            if (startBtn) startBtn.addEventListener('click', () => this.start());
            if (pauseBtn) pauseBtn.addEventListener('click', () => this.togglePause());
            if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
            
            console.log('✅ Controles configurados');
        } catch (error) {
            console.error('❌ Erro ao configurar controles:', error);
        }
    }
    
    createTimerControls() {
        try {
            const controlsHTML = `
                <div id="timer-controls" class="timer-controls">
                    <div class="timer-display">
                        <span id="timer-display" class="timer-text">45:00</span>
                        <div id="timer-progress" class="timer-progress">
                            <div id="timer-progress-bar" class="timer-progress-bar"></div>
                        </div>
                    </div>
                    <div class="timer-buttons">
                        <button id="timer-start" class="timer-btn timer-btn-start">▶️ Iniciar</button>
                        <button id="timer-pause" class="timer-btn timer-btn-pause" disabled>⏸️ Pausar</button>
                        <button id="timer-reset" class="timer-btn timer-btn-reset">🔄 Reset</button>
                    </div>
                    <div id="timer-status" class="timer-status">Pronto para iniciar</div>
                </div>
            `;
            
            const container = document.querySelector('.game-container') || document.body;
            container.insertAdjacentHTML('beforeend', controlsHTML);
            
            this.addTimerStyles();
            console.log('✅ Interface de controles criada');
        } catch (error) {
            console.error('❌ Erro ao criar controles:', error);
        }
    }
    
    addTimerStyles() {
        try {
            const styles = `
                <style>
                    .timer-controls {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: rgba(0, 0, 0, 0.9);
                        border: 2px solid #d4af37;
                        border-radius: 12px;
                        padding: 15px;
                        color: white;
                        font-family: 'Courier New', monospace;
                        z-index: 1000;
                        min-width: 200px;
                        backdrop-filter: blur(10px);
                    }
                    
                    .timer-display {
                        text-align: center;
                        margin-bottom: 10px;
                    }
                    
                    .timer-text {
                        font-size: 24px;
                        font-weight: bold;
                        color: #d4af37;
                        text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
                    }
                    
                    .timer-progress {
                        width: 100%;
                        height: 8px;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 4px;
                        margin-top: 8px;
                        overflow: hidden;
                    }
                    
                    .timer-progress-bar {
                        height: 100%;
                        background: linear-gradient(90deg, #d4af37, #f4d03f);
                        width: 100%;
                        transition: width 1s ease, background 0.5s ease;
                    }
                    
                    .timer-buttons {
                        display: flex;
                        gap: 5px;
                        margin-bottom: 8px;
                    }
                    
                    .timer-btn {
                        flex: 1;
                        padding: 8px 12px;
                        border: none;
                        border-radius: 6px;
                        background: #2c3e50;
                        color: white;
                        cursor: pointer;
                        font-size: 12px;
                        transition: all 0.3s ease;
                    }
                    
                    .timer-btn:hover:not(:disabled) {
                        background: #34495e;
                        transform: translateY(-2px);
                    }
                    
                    .timer-btn:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    
                    .timer-btn-start {
                        background: #27ae60;
                    }
                    
                    .timer-btn-start:hover:not(:disabled) {
                        background: #2ecc71;
                    }
                    
                    .timer-btn-pause {
                        background: #f39c12;
                    }
                    
                    .timer-btn-pause:hover:not(:disabled) {
                        background: #f1c40f;
                    }
                    
                    .timer-btn-reset {
                        background: #e74c3c;
                    }
                    
                    .timer-btn-reset:hover:not(:disabled) {
                        background: #c0392b;
                    }
                    
                    .timer-status {
                        font-size: 11px;
                        text-align: center;
                        color: #bdc3c7;
                    }
                    
                    .timer-warning .timer-text {
                        color: #f39c12;
                        animation: pulse 1s infinite;
                    }
                    
                    .timer-critical .timer-text {
                        color: #e74c3c;
                        animation: pulse 0.5s infinite;
                    }
                    
                    .timer-critical .timer-progress-bar {
                        background: linear-gradient(90deg, #e74c3c, #c0392b);
                    }
                    
                    .timer-warning .timer-progress-bar {
                        background: linear-gradient(90deg, #f39c12, #e67e22);
                    }
                    
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                    }
                    
                    @media (max-width: 768px) {
                        .timer-controls {
                            top: 10px;
                            right: 10px;
                            left: 10px;
                            min-width: auto;
                        }
                        
                        .timer-text {
                            font-size: 20px;
                        }
                        
                        .timer-buttons {
                            flex-direction: column;
                        }
                    }
                </style>
            `;
            
            document.head.insertAdjacentHTML('beforeend', styles);
            console.log('✅ Estilos CSS adicionados');
        } catch (error) {
            console.error('❌ Erro ao adicionar estilos:', error);
        }
    }
    
    start() {
        try {
            if (this.isRunning) return;
            
            this.isRunning = true;
            this.isPaused = false;
            
            this.timerInterval = setInterval(() => {
                if (this.remainingTime > 0) {
                    this.remainingTime--;
                    this.updateDisplay();
                    this.checkWarnings();
                    
                    if (this.callbacks.onTick) {
                        this.callbacks.onTick(this.remainingTime);
                    }
                } else {
                    this.timeout();
                }
            }, 1000);
            
            this.updateControls();
            this.updateStatus('Timer em execução');
            
            console.log('⏱️ Timer iniciado');
        } catch (error) {
            console.error('❌ Erro ao iniciar timer:', error);
        }
    }
    
    togglePause() {
        try {
            if (!this.isRunning) return;
            
            if (this.isPaused) {
                this.resume();
            } else {
                this.pause();
            }
        } catch (error) {
            console.error('❌ Erro ao alternar pausa:', error);
        }
    }
    
    pause() {
        try {
            if (!this.isRunning || this.isPaused) return;
            
            this.isPaused = true;
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            
            this.updateControls();
            this.updateStatus('Timer pausado');
            
            if (this.callbacks.onPause) {
                this.callbacks.onPause();
            }
            
            console.log('⏸️ Timer pausado');
        } catch (error) {
            console.error('❌ Erro ao pausar timer:', error);
        }
    }
    
    resume() {
        try {
            if (!this.isRunning || !this.isPaused) return;
            
            this.isPaused = false;
            this.start();
            
            if (this.callbacks.onResume) {
                this.callbacks.onResume();
            }
            
            console.log('▶️ Timer retomado');
        } catch (error) {
            console.error('❌ Erro ao retomar timer:', error);
        }
    }
    
    reset() {
        try {
            this.stop();
            this.remainingTime = this.totalTime;
            this.updateDisplay();
            this.updateControls();
            this.updateStatus('Timer resetado para 45:00');
            this.clearSavedState();
            
            console.log('🔄 Timer resetado');
        } catch (error) {
            console.error('❌ Erro ao resetar timer:', error);
        }
    }
    
    stop() {
        try {
            this.isRunning = false;
            this.isPaused = false;
            
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
            
            this.updateControls();
        } catch (error) {
            console.error('❌ Erro ao parar timer:', error);
        }
    }
    
    timeout() {
        try {
            this.stop();
            this.remainingTime = 0;
            this.updateDisplay();
            this.updateStatus('⏰ TEMPO ESGOTADO!');
            
            if (this.callbacks.onTimeout) {
                this.callbacks.onTimeout();
            }
            
            console.log('⏰ Tempo esgotado!');
        } catch (error) {
            console.error('❌ Erro no timeout:', error);
        }
    }
    
    checkWarnings() {
        try {
            if (this.remainingTime <= this.warningThresholds.critical) {
                this.showCriticalWarning();
            } else if (this.remainingTime <= this.warningThresholds.warning) {
                this.showWarning();
            } else if (this.remainingTime <= this.warningThresholds.notice) {
                this.showNotice();
            }
        } catch (error) {
            console.error('❌ Erro ao verificar alertas:', error);
        }
    }
    
    showCriticalWarning() {
        try {
            const controls = document.getElementById('timer-controls');
            if (controls) {
                controls.className = 'timer-controls timer-critical';
            }
            
            this.updateStatus('🚨 CRÍTICO: Menos de 5 minutos!');
            
            if (this.callbacks.onCritical) {
                this.callbacks.onCritical(this.remainingTime);
            }
        } catch (error) {
            console.error('❌ Erro ao mostrar aviso crítico:', error);
        }
    }
    
    showWarning() {
        try {
            const controls = document.getElementById('timer-controls');
            if (controls) {
                controls.className = 'timer-controls timer-warning';
            }
            
            this.updateStatus('⚠️ ATENÇÃO: 15 minutos restantes!');
            
            if (this.callbacks.onWarning) {
                this.callbacks.onWarning(this.remainingTime);
            }
        } catch (error) {
            console.error('❌ Erro ao mostrar aviso:', error);
        }
    }
    
    showNotice() {
        try {
            this.updateStatus('⏰ 30 minutos restantes');
        } catch (error) {
            console.error('❌ Erro ao mostrar notificação:', error);
        }
    }
    
    updateDisplay() {
        try {
            const minutes = Math.floor(this.remainingTime / 60);
            const seconds = this.remainingTime % 60;
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            const display = document.getElementById('timer-display');
            if (display) {
                display.textContent = timeString;
            }
            
            const progressBar = document.getElementById('timer-progress-bar');
            if (progressBar) {
                const progress = (this.remainingTime / this.totalTime) * 100;
                progressBar.style.width = `${progress}%`;
            }
            
            const gameTimer = document.getElementById('gameTimer');
            if (gameTimer) {
                gameTimer.textContent = `⏱️ ${timeString}`;
            }
            
            const timeRemaining = document.getElementById('timeRemaining');
            if (timeRemaining) {
                timeRemaining.textContent = timeString;
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar display:', error);
        }
    }
    
    updateControls() {
        try {
            const startBtn = document.getElementById('timer-start');
            const pauseBtn = document.getElementById('timer-pause');
            const resetBtn = document.getElementById('timer-reset');
            
            if (startBtn) {
                startBtn.disabled = this.isRunning && !this.isPaused;
                startBtn.textContent = this.isPaused ? '▶️ Retomar' : '▶️ Iniciar';
            }
            
            if (pauseBtn) {
                pauseBtn.disabled = !this.isRunning || this.isPaused;
                pauseBtn.textContent = '⏸️ Pausar';
            }
            
            if (resetBtn) {
                resetBtn.disabled = this.isRunning && !this.isPaused;
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar controles:', error);
        }
    }
    
    updateStatus(message) {
        try {
            const status = document.getElementById('timer-status');
            if (status) {
                status.textContent = message;
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar status:', error);
        }
    }
    
    getRemainingTime() {
        return this.remainingTime;
    }
    
    getTotalTime() {
        return this.totalTime;
    }
    
    isTimerRunning() {
        return this.isRunning;
    }
    
    isTimerPaused() {
        return this.isPaused;
    }
    
    on(event, callback) {
        try {
            if (this.callbacks.hasOwnProperty(event)) {
                this.callbacks[event] = callback;
            }
        } catch (error) {
            console.error('❌ Erro ao configurar callback:', error);
        }
    }
    
    saveState() {
        try {
            const state = {
                remainingTime: this.remainingTime,
                isRunning: this.isRunning,
                isPaused: this.isPaused,
                timestamp: Date.now()
            };
            
            localStorage.setItem('gameTimerState', JSON.stringify(state));
        } catch (error) {
            console.error('❌ Erro ao salvar estado:', error);
        }
    }
    
    loadState() {
        try {
            const saved = localStorage.getItem('gameTimerState');
            if (saved) {
                const state = JSON.parse(saved);
                const timeDiff = (Date.now() - state.timestamp) / 1000;
                
                if (state.isRunning && !state.isPaused) {
                    this.remainingTime = Math.max(0, state.remainingTime - Math.floor(timeDiff));
                } else {
                    this.remainingTime = state.remainingTime;
                }
                
                this.isRunning = state.isRunning;
                this.isPaused = state.isPaused;
                
                this.updateDisplay();
                this.updateControls();
                
                console.log('💾 Estado do timer carregado');
            } else {
                this.remainingTime = this.totalTime;
                this.updateDisplay();
                console.log('⏱️ Timer inicializado com 45:00');
            }
        } catch (error) {
            console.error('❌ Erro ao carregar estado:', error);
            this.remainingTime = this.totalTime;
            this.updateDisplay();
        }
    }
    
    clearSavedState() {
        try {
            localStorage.removeItem('gameTimerState');
        } catch (error) {
            console.error('❌ Erro ao limpar estado:', error);
        }
    }
    
    forceReset() {
        try {
            this.stop();
            this.remainingTime = this.totalTime;
            this.isRunning = false;
            this.isPaused = false;
            this.clearSavedState();
            this.updateDisplay();
            this.updateControls();
            this.updateStatus('Timer resetado para 45:00');
            
            const controls = document.getElementById('timer-controls');
            if (controls) {
                controls.className = 'timer-controls';
            }
            
            console.log('🔄 Timer forçado para 45:00');
        } catch (error) {
            console.error('❌ Erro no reset forçado:', error);
        }
    }
}

// Exportar para uso global
window.GameTimer = GameTimer;

// Auto-inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('📄 DOM carregado, inicializando timer...');
        
        // Criar instância global do timer
        window.gameTimer = new GameTimer();
        
        // Carregar estado salvo
        window.gameTimer.loadState();
        
        // Configurar callbacks padrão
        window.gameTimer.on('timeout', () => {
            console.log('⏰ Tempo esgotado!');
            if (typeof showGameEndModal === 'function') {
                showGameEndModal('timeout');
            } else {
                alert('⏰ Tempo esgotado! O caso será encerrado automaticamente.');
            }
        });
        
        window.gameTimer.on('critical', (remainingTime) => {
            console.log('🚨 Tempo crítico:', remainingTime, 'segundos restantes');
        });
        
        window.gameTimer.on('warning', (remainingTime) => {
            console.log('⚠️ Aviso de tempo:', remainingTime, 'segundos restantes');
        });
        
        // Salvar estado periodicamente
        setInterval(() => {
            if (window.gameTimer && window.gameTimer.isTimerRunning()) {
                window.gameTimer.saveState();
            }
        }, 5000);
        
        console.log('✅ Timer inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização do timer:', error);
    }
});

console.log('⏱️ Game Timer System carregado - 45:00 minutos');
