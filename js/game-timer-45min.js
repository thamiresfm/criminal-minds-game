/**
 * ⏱️ Game Timer - Sistema de Contador Regressivo de 45 Minutos
 * Criminal Minds Game - Timer Management System
 * 
 * Funcionalidades:
 * - Timer regressivo de 45:00 minutos
 * - Controles de pausa/retomar
 * - Alertas visuais e sonoros
 * - Integração com sistema de pontuação
 * - Salvamento de progresso
 */

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
        
        this.init();
    }
    
    /**
     * Inicializar o timer
     */
    init() {
        console.log('⏱️ Game Timer inicializado - 45:00 minutos');
        this.updateDisplay();
        this.setupEventListeners();
    }
    
    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Botões de controle do timer
        document.addEventListener('DOMContentLoaded', () => {
            this.setupTimerControls();
        });
        
        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case ' ': // Espaço - Pausar/Retomar
                        e.preventDefault();
                        this.togglePause();
                        break;
                    case 'r': // R - Reset
                        e.preventDefault();
                        this.reset();
                        break;
                }
            }
        });
    }
    
    /**
     * Configurar controles visuais do timer
     */
    setupTimerControls() {
        // Criar controles se não existirem
        if (!document.getElementById('timer-controls')) {
            this.createTimerControls();
        }
        
        // Conectar botões
        const startBtn = document.getElementById('timer-start');
        const pauseBtn = document.getElementById('timer-pause');
        const resetBtn = document.getElementById('timer-reset');
        
        if (startBtn) startBtn.addEventListener('click', () => this.start());
        if (pauseBtn) pauseBtn.addEventListener('click', () => this.togglePause());
        if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
    }
    
    /**
     * Criar interface de controles do timer
     */
    createTimerControls() {
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
        
        // Inserir no DOM
        const container = document.querySelector('.game-container') || document.body;
        container.insertAdjacentHTML('beforeend', controlsHTML);
        
        // Adicionar estilos CSS
        this.addTimerStyles();
    }
    
    /**
     * Adicionar estilos CSS para o timer
     */
    addTimerStyles() {
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
                
                /* Estados de alerta */
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
                
                /* Responsivo */
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
    }
    
    /**
     * Iniciar o timer
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        
        this.timerInterval = setInterval(() => {
            if (this.remainingTime > 0) {
                this.remainingTime--;
                this.updateDisplay();
                this.checkWarnings();
                
                // Callback de tick
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
    }
    
    /**
     * Pausar/Retomar o timer
     */
    togglePause() {
        if (!this.isRunning) return;
        
        if (this.isPaused) {
            this.resume();
        } else {
            this.pause();
        }
    }
    
    /**
     * Pausar o timer
     */
    pause() {
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
    }
    
    /**
     * Retomar o timer
     */
    resume() {
        if (!this.isRunning || !this.isPaused) return;
        
        this.isPaused = false;
        this.start();
        
        if (this.callbacks.onResume) {
            this.callbacks.onResume();
        }
        
        console.log('▶️ Timer retomado');
    }
    
    /**
     * Resetar o timer
     */
    reset() {
        this.stop();
        this.remainingTime = this.totalTime; // Sempre volta para 45:00
        this.updateDisplay();
        this.updateControls();
        this.updateStatus('Timer resetado para 45:00');
        
        // Limpar estado salvo para garantir que não carregue tempo anterior
        this.clearSavedState();
        
        console.log('🔄 Timer resetado para 45:00');
    }
    
    /**
     * Parar o timer
     */
    stop() {
        this.isRunning = false;
        this.isPaused = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.updateControls();
    }
    
    /**
     * Tempo esgotado
     */
    timeout() {
        this.stop();
        this.remainingTime = 0;
        this.updateDisplay();
        this.updateStatus('⏰ TEMPO ESGOTADO!');
        
        // Efeito visual de timeout
        this.showTimeoutEffect();
        
        // Callback de timeout
        if (this.callbacks.onTimeout) {
            this.callbacks.onTimeout();
        }
        
        console.log('⏰ Tempo esgotado!');
    }
    
    /**
     * Verificar alertas de tempo
     */
    checkWarnings() {
        if (this.remainingTime <= this.warningThresholds.critical) {
            this.showCriticalWarning();
        } else if (this.remainingTime <= this.warningThresholds.warning) {
            this.showWarning();
        } else if (this.remainingTime <= this.warningThresholds.notice) {
            this.showNotice();
        }
    }
    
    /**
     * Mostrar aviso crítico (5 minutos)
     */
    showCriticalWarning() {
        const controls = document.getElementById('timer-controls');
        if (controls) {
            controls.className = 'timer-controls timer-critical';
        }
        
        this.updateStatus('🚨 CRÍTICO: Menos de 5 minutos!');
        
        // Som de alerta
        this.playAlertSound('critical');
        
        if (this.callbacks.onCritical) {
            this.callbacks.onCritical(this.remainingTime);
        }
    }
    
    /**
     * Mostrar aviso (15 minutos)
     */
    showWarning() {
        const controls = document.getElementById('timer-controls');
        if (controls) {
            controls.className = 'timer-controls timer-warning';
        }
        
        this.updateStatus('⚠️ ATENÇÃO: 15 minutos restantes!');
        
        if (this.callbacks.onWarning) {
            this.callbacks.onWarning(this.remainingTime);
        }
    }
    
    /**
     * Mostrar notificação (30 minutos)
     */
    showNotice() {
        this.updateStatus('⏰ 30 minutos restantes');
    }
    
    /**
     * Mostrar efeito visual de timeout
     */
    showTimeoutEffect() {
        const controls = document.getElementById('timer-controls');
        if (controls) {
            controls.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                controls.style.animation = '';
            }, 500);
        }
        
        // Adicionar CSS para shake
        const shakeCSS = `
            <style>
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            </style>
        `;
        
        if (!document.querySelector('#shake-animation')) {
            document.head.insertAdjacentHTML('beforeend', shakeCSS);
        }
    }
    
    /**
     * Tocar som de alerta
     */
    playAlertSound(type = 'warning') {
        try {
            // Criar contexto de áudio
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Configurar frequência baseada no tipo
            if (type === 'critical') {
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            } else {
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('🔇 Som de alerta não disponível');
        }
    }
    
    /**
     * Atualizar display do timer
     */
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Atualizar display principal
        const display = document.getElementById('timer-display');
        if (display) {
            display.textContent = timeString;
        }
        
        // Atualizar barra de progresso
        const progressBar = document.getElementById('timer-progress-bar');
        if (progressBar) {
            const progress = (this.remainingTime / this.totalTime) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // Atualizar outros elementos que possam mostrar o tempo
        const gameTimer = document.getElementById('gameTimer');
        if (gameTimer) {
            gameTimer.textContent = `⏱️ ${timeString}`;
        }
        
        const timeRemaining = document.getElementById('timeRemaining');
        if (timeRemaining) {
            timeRemaining.textContent = timeString;
        }
    }
    
    /**
     * Atualizar controles
     */
    updateControls() {
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
    }
    
    /**
     * Atualizar status
     */
    updateStatus(message) {
        const status = document.getElementById('timer-status');
        if (status) {
            status.textContent = message;
        }
    }
    
    /**
     * Obter tempo restante
     */
    getRemainingTime() {
        return this.remainingTime;
    }
    
    /**
     * Obter tempo total
     */
    getTotalTime() {
        return this.totalTime;
    }
    
    /**
     * Verificar se está rodando
     */
    isTimerRunning() {
        return this.isRunning;
    }
    
    /**
     * Verificar se está pausado
     */
    isTimerPaused() {
        return this.isPaused;
    }
    
    /**
     * Definir callbacks
     */
    on(event, callback) {
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event] = callback;
        }
    }
    
    /**
     * Salvar estado do timer
     */
    saveState() {
        const state = {
            remainingTime: this.remainingTime,
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            timestamp: Date.now()
        };
        
        localStorage.setItem('gameTimerState', JSON.stringify(state));
    }
    
    /**
     * Carregar estado do timer
     */
    loadState() {
        const saved = localStorage.getItem('gameTimerState');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                const timeDiff = (Date.now() - state.timestamp) / 1000;
                
                // Ajustar tempo baseado no tempo decorrido
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
            } catch (error) {
                console.error('❌ Erro ao carregar estado do timer:', error);
            }
        } else {
            // Se não há estado salvo, garantir que comece com 45:00
            this.remainingTime = this.totalTime;
            this.updateDisplay();
            console.log('⏱️ Timer inicializado com 45:00');
        }
    }
    
    /**
     * Limpar estado salvo
     */
    clearSavedState() {
        localStorage.removeItem('gameTimerState');
    }
    
    /**
     * Forçar reset completo para 45:00
     */
    forceReset() {
        this.stop();
        this.remainingTime = this.totalTime; // Sempre 45:00
        this.isRunning = false;
        this.isPaused = false;
        this.clearSavedState();
        this.updateDisplay();
        this.updateControls();
        this.updateStatus('Timer resetado para 45:00');
        
        // Resetar classes de alerta
        const controls = document.getElementById('timer-controls');
        if (controls) {
            controls.className = 'timer-controls';
        }
        
        console.log('🔄 Timer forçado para 45:00');
    }
}

// Exportar para uso global
window.GameTimer = GameTimer;

// Auto-inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Criar instância global do timer
    window.gameTimer = new GameTimer();
    
    // Carregar estado salvo
    window.gameTimer.loadState();
    
    // Configurar callbacks padrão
    window.gameTimer.on('timeout', () => {
        // Mostrar modal de tempo esgotado
        if (typeof showGameEndModal === 'function') {
            showGameEndModal('timeout');
        } else {
            alert('⏰ Tempo esgotado! O caso será encerrado automaticamente.');
        }
    });
    
    window.gameTimer.on('critical', (remainingTime) => {
        // Ações quando tempo crítico
        console.log('🚨 Tempo crítico:', remainingTime, 'segundos restantes');
    });
    
    window.gameTimer.on('warning', (remainingTime) => {
        // Ações quando tempo de aviso
        console.log('⚠️ Aviso de tempo:', remainingTime, 'segundos restantes');
    });
    
    // Salvar estado periodicamente
    setInterval(() => {
        if (window.gameTimer.isTimerRunning()) {
            window.gameTimer.saveState();
        }
    }, 5000); // Salvar a cada 5 segundos
});

console.log('⏱️ Game Timer System carregado - 45:00 minutos');
