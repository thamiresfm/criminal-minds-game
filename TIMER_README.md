# ⏱️ Game Timer System - Criminal Minds Game

## 📋 Visão Geral

Sistema completo de timer regressivo de 45 minutos para o jogo Criminal Minds, com funcionalidades avançadas de controle de tempo, alertas visuais e sonoros, e integração com o sistema de pontuação.

## 🎯 Funcionalidades Principais

### ⏰ Timer Regressivo
- **Duração:** 45 minutos (2700 segundos)
- **Formato:** MM:SS (ex: 45:00, 44:59, 00:01)
- **Precisão:** Atualização a cada segundo
- **Persistência:** Estado salvo automaticamente

### 🎮 Controles
- **Iniciar:** Começa a contagem regressiva
- **Pausar/Retomar:** Interrompe e retoma o timer
- **Reset:** Volta ao tempo inicial (45:00)
- **Atalhos de Teclado:** Ctrl+Espaço (pausar), Ctrl+R (reset)

### 🚨 Sistema de Alertas
- **Normal (45:00 - 15:01):** Verde, funcionamento normal
- **Aviso (15:00 - 5:01):** Laranja, atenção ao tempo
- **Crítico (5:00 - 0:01):** Vermelho, tempo crítico!

### 🔊 Alertas Sonoros
- **Aviso:** Som de 600Hz por 0.5s
- **Crítico:** Som de 800Hz → 600Hz por 0.5s
- **Compatibilidade:** Web Audio API

## 📁 Arquivos do Sistema

```
js/
├── game-timer-45min.js    # Sistema principal do timer
├── timer-demo.html        # Página de demonstração
└── TIMER_README.md        # Esta documentação
```

## 🚀 Como Implementar

### 1. Inclusão do Script

```html
<!-- Adicionar no head ou antes do fechamento do body -->
<script src="js/game-timer-45min.js"></script>
```

### 2. Uso Básico

```javascript
// O timer é inicializado automaticamente
// Acessar a instância global
const timer = window.gameTimer;

// Iniciar o timer
timer.start();

// Pausar/Retomar
timer.togglePause();

// Resetar
timer.reset();

// Verificar estado
console.log(timer.getRemainingTime()); // Tempo restante em segundos
console.log(timer.isTimerRunning());   // Se está rodando
console.log(timer.isTimerPaused());    // Se está pausado
```

### 3. Configuração de Callbacks

```javascript
// Configurar eventos
timer.on('timeout', () => {
    console.log('⏰ Tempo esgotado!');
    // Sua lógica aqui
});

timer.on('critical', (remainingTime) => {
    console.log('🚨 Tempo crítico:', remainingTime, 'segundos');
    // Ações para tempo crítico
});

timer.on('warning', (remainingTime) => {
    console.log('⚠️ Aviso de tempo:', remainingTime, 'segundos');
    // Ações para aviso
});

timer.on('tick', (remainingTime) => {
    // Chamado a cada segundo
    updateGameUI(remainingTime);
});
```

## 🎨 Interface Visual

### Controles do Timer
O timer cria automaticamente uma interface flutuante no canto superior direito:

```
┌─────────────────────────┐
│        45:00            │
│ ████████████████████████ │
│ [▶️] [⏸️] [🔄]          │
│    Pronto para iniciar   │
└─────────────────────────┘
```

### Estados Visuais

| Estado | Cor | Animação | Descrição |
|--------|-----|----------|-----------|
| Normal | Verde (#d4af37) | Nenhuma | Funcionamento normal |
| Aviso | Laranja (#f39c12) | Pulse 1s | 15 minutos restantes |
| Crítico | Vermelho (#e74c3c) | Pulse 0.5s | 5 minutos restantes |

## 🔧 API Completa

### Métodos Principais

```javascript
// Controle básico
timer.start()           // Iniciar timer
timer.pause()           // Pausar timer
timer.resume()          // Retomar timer
timer.togglePause()     // Alternar pausa
timer.reset()           // Resetar para 45:00
timer.forceReset()      // Forçar reset completo para 45:00
timer.stop()            // Parar timer

// Informações
timer.getRemainingTime()    // Tempo restante (segundos)
timer.getTotalTime()        // Tempo total (2700 segundos)
timer.isTimerRunning()      // Se está rodando
timer.isTimerPaused()       // Se está pausado

// Eventos
timer.on('timeout', callback)    // Tempo esgotado
timer.on('critical', callback)   // Tempo crítico
timer.on('warning', callback)    // Aviso de tempo
timer.on('tick', callback)       // A cada segundo
timer.on('pause', callback)      // Timer pausado
timer.on('resume', callback)     // Timer retomado

// Persistência
timer.saveState()        // Salvar estado
timer.loadState()        // Carregar estado
timer.clearSavedState()  // Limpar estado salvo
timer.forceReset()       // Forçar reset completo para 45:00
```

### Propriedades

```javascript
timer.totalTime          // 2700 (45 minutos em segundos)
timer.remainingTime      // Tempo restante atual
timer.isRunning          // Status de execução
timer.isPaused           // Status de pausa
timer.warningThresholds  // Limites de alerta
```

## 🎮 Integração com o Jogo

### Exemplo de Integração Completa

```javascript
// Configuração do timer para o jogo
document.addEventListener('DOMContentLoaded', () => {
    const timer = window.gameTimer;
    
    // Configurar callbacks do jogo
    timer.on('timeout', () => {
        // Finalizar jogo
        endGame('timeout');
        showGameOverModal('Tempo esgotado!');
    });
    
    timer.on('critical', (time) => {
        // Ações para tempo crítico
        showUrgentNotification('Tempo crítico!');
        playUrgentSound();
        highlightImportantElements();
    });
    
    timer.on('warning', (time) => {
        // Ações para aviso
        showTimeWarning('Atenção ao tempo!');
    });
    
    timer.on('tick', (time) => {
        // Atualizar UI do jogo
        updateGameTimer(time);
        updateProgressBar(time);
    });
    
    // Iniciar timer quando jogo começar
    document.getElementById('start-game').addEventListener('click', () => {
        timer.start();
    });
});
```

## 🧪 Testando o Sistema

### Página de Demonstração
Abra `timer-demo.html` no navegador para testar todas as funcionalidades:

1. **Teste Básico:** Use os botões para controlar o timer
2. **Teste de Alertas:** Use "Testar Aviso" e "Testar Crítico"
3. **Teste de Atalhos:** Use Ctrl+Espaço e Ctrl+R
4. **Teste de Persistência:** Recarregue a página

### Testes Programáticos

```javascript
// Testar funcionalidades
function testTimer() {
    const timer = window.gameTimer;
    
    // Teste de início
    timer.start();
    console.log('Timer iniciado:', timer.isTimerRunning());
    
    // Teste de pausa
    setTimeout(() => {
        timer.pause();
        console.log('Timer pausado:', timer.isTimerPaused());
    }, 5000);
    
    // Teste de retomada
    setTimeout(() => {
        timer.resume();
        console.log('Timer retomado:', timer.isTimerRunning());
    }, 10000);
    
    // Teste de reset
    setTimeout(() => {
        timer.reset();
        console.log('Timer resetado:', timer.getRemainingTime());
    }, 15000);
}
```

## 🔒 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

### Requisitos
- JavaScript ES6+
- Web Audio API (para sons)
- LocalStorage (para persistência)

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Timer não aparece**
   - Verifique se o script foi carregado
   - Verifique se há elementos com classe `.game-container`

2. **Sons não funcionam**
   - Verifique permissões de áudio do navegador
   - Alguns navegadores bloqueiam áudio automático

3. **Estado não é salvo**
   - Verifique se localStorage está habilitado
   - Verifique se não está em modo privado

4. **Timer não sincroniza**
   - O timer ajusta automaticamente o tempo decorrido
   - Verifique se o relógio do sistema está correto

### Debug

```javascript
// Habilitar logs detalhados
localStorage.setItem('timerDebug', 'true');

// Verificar estado
console.log('Timer State:', {
    remaining: timer.getRemainingTime(),
    running: timer.isTimerRunning(),
    paused: timer.isTimerPaused(),
    saved: localStorage.getItem('gameTimerState')
});
```

## 📈 Melhorias Futuras

- [ ] Integração com sistema de pontuação
- [ ] Múltiplos timers simultâneos
- [ ] Personalização de alertas
- [ ] Integração com notificações do sistema
- [ ] Modo offline/online
- [ ] Estatísticas de uso

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique esta documentação
2. Teste na página de demonstração
3. Verifique o console do navegador
4. Consulte os logs do sistema

---

**Desenvolvido para Criminal Minds Game**  
**Versão:** 1.0.0  
**Data:** 2024
