// ========================================
// CRIMINAL MINDS GAME - API CLIENT MELHORADO v2.0
// Cliente JavaScript otimizado para integração com API
// ========================================

// URLs da API baseado no ambiente - SOMENTE BANCO POSTGRESQL
const API_CONFIG = {
  // Produção - API Vercel com PostgreSQL (BD_URL)
  // MIGRAÇÃO: Railway → Vercel (mais confiável)
  // Vercel detecta Node.js automaticamente
  production: 'https://criminal-minds-game-api.vercel.app/api',
  
  // Desenvolvimento local
  development: 'http://localhost:3001/api',
  
  // Detectar ambiente automaticamente
  get baseURL() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return this.development;
    } else {
      return this.production; // API externa em produção
    }
  },
  
  // Verificar se estamos no GitHub Pages
  get isGitHubPages() {
    return window.location.hostname.includes('github.io');
  },
  
  // Verificar se temos URL de API configurada
  get hasAPIEndpoint() {
    return this.baseURL !== null;
  }
};

// ========================================
// CLASSE PRINCIPAL DA API
// ========================================

class CriminalMindsAPI {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.user = JSON.parse(localStorage.getItem('user_data') || 'null');
    this.apiVersion = '2.0.0';
  }

  // ========================================
  // MÉTODOS UTILITÁRIOS
  // ========================================

  /**
   * Fazer requisição HTTP com configurações otimizadas
   */
  async makeRequest(endpoint, options = {}) {
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Version': this.apiVersion,
        'X-Client': 'Criminal-Minds-Frontend',
        ...options.headers
      }
    };

    // Adicionar token de autenticação se disponível
    if (this.token) {
      defaultOptions.headers['Authorization'] = `Bearer ${this.token}`;
    }

    // Adicionar Origin para CORS
    if (API_CONFIG.isGitHubPages) {
      defaultOptions.headers['Origin'] = 'https://thamiresfm.github.io';
    }

    const finalOptions = { ...defaultOptions, ...options };

    try {
      console.log(`🔗 API Request: ${finalOptions.method} ${url}`);
      
      const response = await fetch(url, finalOptions);
      const data = await response.json();

      console.log(`📡 API Response:`, data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`❌ API Error:`, error);
      
      // Tratamento específico de erros
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar com o servidor. Verifique sua conexão.');
      }
      
      throw error;
    }
  }

  /**
   * Salvar dados do usuário no localStorage
   */
  saveUserData(userData, token) {
    this.user = userData;
    this.token = token;
    
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('auth_token', token);
    
    console.log('✅ Dados do usuário salvos localmente');
  }

  /**
   * Limpar dados do usuário
   */
  clearUserData() {
    this.user = null;
    this.token = null;
    
    localStorage.removeItem('user_data');
    localStorage.removeItem('auth_token');
    
    console.log('🧹 Dados do usuário removidos');
  }

  /**
   * Verificar se usuário está logado
   */
  isAuthenticated() {
    return !!(this.token && this.user);
  }

  // ========================================
  // MÉTODOS DE AUTENTICAÇÃO
  // ========================================

  /**
   * Registrar novo usuário
   */
  async register(fullName, email, detectiveName, password) {
    try {
      console.log('🔐 Iniciando registro de usuário...');
      
      // Validações frontend
      if (!fullName || !email || !detectiveName || !password) {
        throw new Error('Todos os campos são obrigatórios');
      }

      if (password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Email deve ter um formato válido');
      }

      const data = await this.makeRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.toLowerCase().trim(),
          detectiveName: detectiveName.trim(),
          password
        })
      });

      // Salvar dados do usuário
      this.saveUserData(data.user, data.token);

      console.log('✅ Registro realizado com sucesso');
      return data;

    } catch (error) {
      console.error('❌ Erro no registro:', error.message);
      throw error;
    }
  }

  /**
   * Fazer login
   */
  async login(email, password) {
    try {
      console.log('🔐 Iniciando login...');
      
      // Validações frontend
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      const data = await this.makeRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password
        })
      });

      // Salvar dados do usuário
      this.saveUserData(data.user, data.token);

      console.log('✅ Login realizado com sucesso');
      return data;

    } catch (error) {
      console.error('❌ Erro no login:', error.message);
      throw error;
    }
  }

  /**
   * Fazer logout
   */
  logout() {
    console.log('🚪 Fazendo logout...');
    this.clearUserData();
    
    // Redirecionar para página de login
    if (window.location.pathname !== '/login.html') {
      window.location.href = 'login.html';
    }
  }

  // ========================================
  // MÉTODOS DO JOGO
  // ========================================

  /**
   * Obter perfil do usuário
   */
  async getUserProfile() {
    try {
      if (!this.isAuthenticated()) {
        throw new Error('Usuário não está logado');
      }

      const data = await this.makeRequest('/user/profile');
      
      // Atualizar dados locais
      this.saveUserData(data.user, this.token);
      
      return data;
    } catch (error) {
      console.error('❌ Erro ao carregar perfil:', error.message);
      throw error;
    }
  }

  /**
   * Obter ranking de jogadores
   */
  async getRanking() {
    try {
      const data = await this.makeRequest('/game/ranking');
      return data;
    } catch (error) {
      console.error('❌ Erro ao carregar ranking:', error.message);
      throw error;
    }
  }

  /**
   * Verificar status da API
   */
  async checkHealth() {
    try {
      const data = await this.makeRequest('/health');
      return data;
    } catch (error) {
      console.error('❌ API não está disponível:', error.message);
      throw error;
    }
  }

  // ========================================
  // MÉTODOS DE INTERFACE
  // ========================================

  /**
   * Mostrar notificação para o usuário
   */
  showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${this.getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Estilos da notificação
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: ${this.getNotificationColor(type)};
      color: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      max-width: 400px;
      animation: slideIn 0.3s ease-out;
    `;

    // Adicionar à página
    document.body.appendChild(notification);

    // Remover após 5 segundos
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  getNotificationIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }

  getNotificationColor(type) {
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    };
    return colors[type] || colors.info;
  }

  /**
   * Atualizar interface com dados do usuário
   */
  updateUserInterface() {
    if (!this.isAuthenticated()) return;

    // Atualizar elementos que mostram nome do usuário
    const userNameElements = document.querySelectorAll('[data-user-name]');
    userNameElements.forEach(element => {
      element.textContent = this.user.detectiveName || this.user.fullName;
    });

    // Atualizar elementos que mostram email
    const userEmailElements = document.querySelectorAll('[data-user-email]');
    userEmailElements.forEach(element => {
      element.textContent = this.user.email;
    });

    // Mostrar/esconder elementos baseado na autenticação
    const authElements = document.querySelectorAll('[data-auth-required]');
    authElements.forEach(element => {
      element.style.display = this.isAuthenticated() ? 'block' : 'none';
    });

    const noAuthElements = document.querySelectorAll('[data-no-auth-required]');
    noAuthElements.forEach(element => {
      element.style.display = this.isAuthenticated() ? 'none' : 'block';
    });
  }
}

// ========================================
// INICIALIZAÇÃO GLOBAL
// ========================================

// Criar instância global
window.CriminalMindsAPI = new CriminalMindsAPI();

// Adicionar estilos para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .notification-message {
    flex: 1;
    font-weight: 500;
  }

  .notification-close {
    background: rgba(255,255,255,0.3);
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notification-close:hover {
    background: rgba(255,255,255,0.5);
  }
`;
document.head.appendChild(notificationStyles);

// Atualizar interface quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  window.CriminalMindsAPI.updateUserInterface();
  
  console.log('🎮 Criminal Minds API Client v2.0 carregado');
  console.log('🔗 Endpoint:', API_CONFIG.baseURL);
  console.log('🔐 Autenticado:', window.CriminalMindsAPI.isAuthenticated());
});

// Verificar conexão com API periodicamente
setInterval(async () => {
  try {
    await window.CriminalMindsAPI.checkHealth();
    console.log('💚 API conectada');
  } catch (error) {
    console.warn('🔶 API desconectada:', error.message);
  }
}, 60000); // Verificar a cada minuto

console.log('✅ Criminal Minds API Client v2.0 inicializado com sucesso!');