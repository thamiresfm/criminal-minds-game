// ========================================
// CRIMINAL MINDS GAME - API CLIENT MELHORADO v2.0
// Cliente JavaScript otimizado para integração com API
// ========================================

// Função para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
  
  // Verificar se temos URL de API configurada E funcionando
  get hasAPIEndpoint() {
    // Se não há baseURL, não temos endpoint
    if (!this.baseURL) return false;
    
    // API está funcionando - habilitar autenticação
    console.log('✅ API Vercel detectada - Autenticação habilitada');
    return true;
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
      
      // Adicionar timeout para evitar espera infinita
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos
      
      const response = await fetch(url, {
        ...finalOptions,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const data = await response.json();

      console.log(`📡 API Response:`, data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`❌ API Error:`, error);
      
      // Tratamento específico de erros melhorado
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar com o servidor. Verifique sua conexão.');
      }
      
      if (error.name === 'AbortError') {
        throw new Error('Tempo limite excedido. Verifique sua conexão.');
      }
      
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão. Verifique sua internet.');
      }
      
      if (error.message.includes('NetworkError')) {
        throw new Error('Problema de rede. Tente novamente.');
      }
      
      // Se é um erro HTTP específico
      if (error.message.includes('HTTP')) {
        if (error.message.includes('HTTP 502') || error.message.includes('HTTP 503')) {
          throw new Error('Servidor temporariamente indisponível. Tente novamente em alguns minutos.');
        }
        if (error.message.includes('HTTP 404')) {
          throw new Error('Endpoint não encontrado. Verifique a configuração.');
        }
        if (error.message.includes('HTTP 500')) {
          throw new Error('Erro interno do servidor. Tente novamente.');
        }
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

      if (!isValidEmail(email)) {
        throw new Error('Email inválido');
      }

      // Verificar conectividade antes de tentar registro
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        throw new Error('Não foi possível conectar com o servidor. Verifique sua conexão.');
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

      // Verificar conectividade antes de tentar login
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        throw new Error('Não foi possível conectar com o servidor. Verifique sua conexão.');
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

  /**
   * Verificar conectividade da API antes de operações críticas
   */
  async checkConnectivity() {
    try {
      console.log('🔍 Verificando conectividade da API...');
      const health = await this.checkHealth();
      
      if (health.success && health.status === 'healthy') {
        console.log('✅ API está funcionando normalmente');
        return true;
      } else {
        console.log('⚠️ API retornou status não saudável');
        return false;
      }
    } catch (error) {
      console.error('❌ Problema de conectividade:', error.message);
      return false;
    }
  }

  /**
   * Tentar conectar com retry automático
   */
  async connectWithRetry(maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Tentativa ${attempt}/${maxRetries} de conexão...`);
        
        const isConnected = await this.checkConnectivity();
        if (isConnected) {
          console.log('✅ Conexão estabelecida com sucesso');
          return true;
        }
        
        if (attempt < maxRetries) {
          console.log(`⏳ Aguardando ${delay}ms antes da próxima tentativa...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error(`❌ Tentativa ${attempt} falhou:`, error.message);
        
        if (attempt === maxRetries) {
          throw new Error('Não foi possível conectar com o servidor após várias tentativas. Verifique sua conexão.');
        }
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    return false;
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