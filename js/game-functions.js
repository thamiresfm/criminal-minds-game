// ========================================
// CRIMINAL MINDS GAME - FUNÇÕES DO JOGO
// JavaScript para funcionalidades do jogo
// ========================================

/**
 * Classe principal para gerenciar o jogo
 */
class CriminalMindsGame {
  constructor() {
    this.api = window.CriminalMindsAPI;
    this.gameState = {
      isPlaying: false,
      currentPage: window.location.pathname,
      players: [],
      gameData: null
    };
    
    this.init();
  }

  // ========================================
  // INICIALIZAÇÃO
  // ========================================

  init() {
    console.log('🎮 Inicializando Criminal Minds Game...');
    
    // Verificar autenticação
    this.checkAuthentication();
    
    // Configurar eventos globais
    this.setupGlobalEvents();
    
    // Configurar página específica
    this.setupPageSpecific();
    
    console.log('✅ Game inicializado com sucesso');
  }

  /**
   * Verificar se usuário está autenticado
   */
  checkAuthentication() {
    const publicPages = ['/', '/index.html', '/login.html', '/register.html'];
    const currentPage = window.location.pathname;
    
    if (!publicPages.includes(currentPage) && !this.api.isAuthenticated()) {
      console.log('🔐 Redirecionando para login...');
      window.location.href = 'login.html';
      return;
    }
    
    if (this.api.isAuthenticated()) {
      this.api.updateUserInterface();
    }
  }

  /**
   * Configurar eventos globais
   */
  setupGlobalEvents() {
    // Botão de logout
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-logout]')) {
        this.handleLogout();
      }
    });

    // Formulários de autenticação
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }

    // Tecla ESC para sair de modais
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModals();
      }
    });
  }

  /**
   * Configurar funcionalidades específicas da página
   */
  setupPageSpecific() {
    const path = window.location.pathname;
    
    if (path.includes('lobby.html')) {
      this.setupLobby();
    } else if (path.includes('investigation')) {
      this.setupInvestigation();
    } else if (path.includes('ranking')) {
      this.setupRanking();
    }
  }

  // ========================================
  // AUTENTICAÇÃO
  // ========================================

  /**
   * Processar login
   */
  async handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
      // Mostrar loading
      this.setButtonLoading(submitButton, true);
      
      // Fazer login
      const result = await this.api.login(email, password);
      
      // Mostrar sucesso
      this.api.showNotification('Login realizado com sucesso!', 'success');
      
      // Redirecionar
      setTimeout(() => {
        window.location.href = 'lobby.html';
      }, 1000);
      
    } catch (error) {
      this.api.showNotification(error.message, 'error');
    } finally {
      this.setButtonLoading(submitButton, false);
    }
  }

  /**
   * Processar registro
   */
  async handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const detectiveName = form.detectiveName.value;
    const password = form.password.value;
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
      // Mostrar loading
      this.setButtonLoading(submitButton, true);
      
      // Fazer registro
      const result = await this.api.register(fullName, email, detectiveName, password);
      
      // Mostrar sucesso
      this.api.showNotification('Conta criada com sucesso!', 'success');
      
      // Redirecionar
      setTimeout(() => {
        window.location.href = 'lobby.html';
      }, 1000);
      
    } catch (error) {
      this.api.showNotification(error.message, 'error');
    } finally {
      this.setButtonLoading(submitButton, false);
    }
  }

  /**
   * Processar logout
   */
  handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
      this.api.logout();
    }
  }

  // ========================================
  // LOBBY
  // ========================================

  /**
   * Configurar lobby
   */
  setupLobby() {
    console.log('🏠 Configurando lobby...');
    
    // Simular jogadores online
    this.simulateOnlinePlayers();
    
    // Configurar botões do lobby
    const startGameBtn = document.querySelector('#startGameBtn');
    if (startGameBtn) {
      startGameBtn.addEventListener('click', () => this.startGame());
    }
  }

  /**
   * Simular jogadores online
   */
  simulateOnlinePlayers() {
    const playersContainer = document.querySelector('.players-list');
    if (!playersContainer) return;

    const samplePlayers = [
      { name: 'Detetive Silva', status: 'online' },
      { name: 'Inspector Jones', status: 'online' },
      { name: 'Agent Brown', status: 'away' },
      { name: 'Detective Wilson', status: 'online' }
    ];

    // Adicionar usuário atual
    if (this.api.user) {
      samplePlayers.unshift({
        name: this.api.user.detectiveName,
        status: 'online',
        isCurrentUser: true
      });
    }

    playersContainer.innerHTML = samplePlayers.map(player => `
      <div class="player-item ${player.isCurrentUser ? 'current-user' : ''}">
        <div class="player-avatar">
          <span class="player-initial">${player.name.charAt(0)}</span>
        </div>
        <div class="player-info">
          <div class="player-name">${player.name}</div>
          <div class="player-status status-${player.status}">
            ${player.status === 'online' ? '🟢 Online' : '🟡 Ausente'}
          </div>
        </div>
        ${player.isCurrentUser ? '<span class="player-badge">Você</span>' : ''}
      </div>
    `).join('');
  }

  /**
   * Iniciar jogo
   */
  startGame() {
    this.api.showNotification('Iniciando investigação...', 'info');
    
    setTimeout(() => {
      window.location.href = 'investigation-cards.html';
    }, 1500);
  }

  // ========================================
  // INVESTIGAÇÃO
  // ========================================

  /**
   * Configurar investigação
   */
  setupInvestigation() {
    console.log('🔍 Configurando investigação...');
    
    // Configurar chat
    this.setupChat();
    
    // Configurar cartas
    this.setupCards();
    
    // Configurar botão de saída
    const exitBtn = document.querySelector('#exitBtn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => this.exitGame());
    }
  }

  /**
   * Configurar chat
   */
  setupChat() {
    const chatForm = document.querySelector('.chat-input-container');
    if (!chatForm) return;

    const input = chatForm.querySelector('input');
    const button = chatForm.querySelector('button');

    if (button) {
      button.addEventListener('click', () => {
        this.sendChatMessage(input.value);
        input.value = '';
      });
    }

    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendChatMessage(input.value);
          input.value = '';
        }
      });
    }
  }

  /**
   * Enviar mensagem do chat
   */
  sendChatMessage(message) {
    if (!message.trim()) return;

    const chatContainer = document.querySelector('.chat-messages');
    if (!chatContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message user-message';
    messageElement.innerHTML = `
      <div class="message-author">${this.api.user?.detectiveName || 'Detetive'}</div>
      <div class="message-content">${message}</div>
      <div class="message-time">${new Date().toLocaleTimeString()}</div>
    `;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Simular resposta automática
    setTimeout(() => {
      this.simulateChatResponse();
    }, 1000 + Math.random() * 2000);
  }

  /**
   * Simular resposta no chat
   */
  simulateChatResponse() {
    const responses = [
      'Interessante observação, detetive!',
      'Vou investigar essa pista.',
      'Concordo com sua análise.',
      'Encontrei algo suspeito também.',
      'Devemos interrogar essa pessoa.'
    ];

    const chatContainer = document.querySelector('.chat-messages');
    if (!chatContainer) return;

    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message other-message';
    messageElement.innerHTML = `
      <div class="message-author">Detetive Silva</div>
      <div class="message-content">${responses[Math.floor(Math.random() * responses.length)]}</div>
      <div class="message-time">${new Date().toLocaleTimeString()}</div>
    `;

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  /**
   * Configurar cartas
   */
  setupCards() {
    const cards = document.querySelectorAll('.evidence-card, .suspect-card, .location-card');
    
    cards.forEach(card => {
      card.addEventListener('click', () => {
        this.selectCard(card);
      });
    });
  }

  /**
   * Selecionar carta
   */
  selectCard(card) {
    // Remover seleção anterior
    document.querySelectorAll('.card.selected').forEach(c => {
      c.classList.remove('selected');
    });

    // Selecionar nova carta
    card.classList.add('selected');

    // Mostrar informações da carta
    const cardTitle = card.querySelector('h3')?.textContent || 'Carta';
    this.api.showNotification(`Selecionou: ${cardTitle}`, 'info');
  }

  /**
   * Sair do jogo
   */
  exitGame() {
    if (confirm('Tem certeza que deseja sair da investigação?')) {
      window.location.href = 'lobby.html';
    }
  }

  // ========================================
  // RANKING
  // ========================================

  /**
   * Configurar ranking
   */
  async setupRanking() {
    console.log('🏆 Configurando ranking...');
    
    try {
      const rankingData = await this.api.getRanking();
      this.displayRanking(rankingData.ranking);
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
      this.api.showNotification('Erro ao carregar ranking', 'error');
    }
  }

  /**
   * Exibir ranking
   */
  displayRanking(ranking) {
    const container = document.querySelector('#rankingContainer');
    if (!container) return;

    container.innerHTML = ranking.map(player => `
      <div class="ranking-item">
        <div class="ranking-position">${player.position}</div>
        <div class="ranking-info">
          <div class="ranking-name">${player.detectiveName}</div>
          <div class="ranking-stats">
            Vitórias: ${player.gamesWon} | Pontos: ${player.rankPoints}
          </div>
        </div>
        <div class="ranking-level">Nível ${player.rankLevel}</div>
      </div>
    `).join('');
  }

  // ========================================
  // UTILITÁRIOS
  // ========================================

  /**
   * Configurar estado de loading do botão
   */
  setButtonLoading(button, isLoading) {
    if (!button) return;

    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = 'Carregando...';
      button.classList.add('loading');
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText || button.textContent;
      button.classList.remove('loading');
    }
  }

  /**
   * Fechar modais
   */
  closeModals() {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
  }

  /**
   * Verificar status da API
   */
  async checkAPIStatus() {
    try {
      const health = await this.api.checkHealth();
      console.log('💚 API Status:', health);
      return true;
    } catch (error) {
      console.error('❌ API indisponível:', error);
      return false;
    }
  }
}

// ========================================
// INICIALIZAÇÃO GLOBAL
// ========================================

// Aguardar carregamento da página e da API
document.addEventListener('DOMContentLoaded', () => {
  // Aguardar API carregar
  const checkAPI = () => {
    if (window.CriminalMindsAPI) {
      // Inicializar jogo
      window.CriminalMindsGame = new CriminalMindsGame();
      console.log('🎮 Criminal Minds Game inicializado');
    } else {
      // Tentar novamente em 100ms
      setTimeout(checkAPI, 100);
    }
  };
  
  checkAPI();
});

console.log('✅ Game Functions carregadas com sucesso!');