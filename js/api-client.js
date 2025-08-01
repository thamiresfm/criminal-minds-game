// ========================================
// CRIMINAL MINDS GAME - API CLIENT
// Cliente JavaScript para conectar HTMLs à API MySQL
// ========================================

// ========================================
// CONFIGURAÇÃO DA API
// ========================================

// URLs da API baseado no ambiente
const API_CONFIG = {
  // Produção - GitHub Pages com backend na Railway/Heroku/Vercel
  production: 'https://criminal-minds-api.railway.app/api',
  
  // Desenvolvimento local
  development: 'http://localhost:3001/api',
  
  // Detectar ambiente automaticamente
  get baseURL() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return this.development;
    } else {
      return this.production;
    }
  }
};

// ========================================
// CLASSE API CLIENT
// ========================================

class CriminalMindsAPI {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.token = localStorage.getItem('criminalMinds_token');
    
    console.log(`🔧 API Client inicializado: ${this.baseURL}`);
  }

  // ========================================
  // MÉTODOS UTILITÁRIOS
  // ========================================

  // Fazer requisição HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Adicionar token se disponível
    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      console.log(`📡 API Request: ${config.method} ${url}`);
      
      const response = await fetch(url, config);
      const data = await response.json();

      console.log(`📡 API Response: ${response.status}`, data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`❌ API Error: ${endpoint}`, error);
      throw error;
    }
  }

  // Salvar token
  setToken(token) {
    this.token = token;
    localStorage.setItem('criminalMinds_token', token);
  }

  // Remover token
  clearToken() {
    this.token = null;
    localStorage.removeItem('criminalMinds_token');
  }

  // ========================================
  // MÉTODOS DE AUTENTICAÇÃO
  // ========================================

  // Registrar usuário
  async register(userData) {
    try {
      const response = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      if (response.success) {
        // Salvar token e dados do usuário
        this.setToken(response.token);
        this.saveUserData(response.user);
        
        console.log('✅ Registro bem-sucedido:', response.user.email);
        return response;
      }

      throw new Error(response.error || 'Erro no registro');
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      throw error;
    }
  }

  // Fazer login
  async login(credentials) {
    try {
      const response = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });

      if (response.success) {
        // Salvar token e dados do usuário
        this.setToken(response.token);
        this.saveUserData(response.user);
        
        console.log('✅ Login bem-sucedido:', response.user.email);
        return response;
      }

      throw new Error(response.error || 'Erro no login');
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  }

  // Verificar token
  async verifyToken() {
    try {
      if (!this.token) {
        throw new Error('Token não encontrado');
      }

      const response = await this.request('/auth/verify');

      if (response.success) {
        this.saveUserData(response.user);
        return response;
      }

      throw new Error(response.error || 'Token inválido');
    } catch (error) {
      console.error('❌ Token inválido:', error);
      this.clearToken();
      this.clearUserData();
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      // Limpar dados locais
      this.clearToken();
      this.clearUserData();
      
      console.log('✅ Logout realizado');
      return { success: true };
    } catch (error) {
      console.error('❌ Erro no logout:', error);
      throw error;
    }
  }

  // ========================================
  // GERENCIAMENTO DE DADOS LOCAIS
  // ========================================

  // Salvar dados do usuário no localStorage (para compatibilidade)
  saveUserData(user) {
    const userData = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      detectiveName: user.detectiveName,
      gameCode: user.gameCode,
      stats: user.stats,
      isGuest: false,
      lastSync: new Date().toISOString()
    };

    // Manter compatibilidade com código existente
    localStorage.setItem('criminalMinds_userData', JSON.stringify(userData));
    localStorage.setItem('criminalMinds_username', user.detectiveName);
    localStorage.setItem('criminalMinds_userEmail', user.email);
    localStorage.setItem('criminalMinds_isLoggedIn', 'true');
    
    if (user.gameCode) {
      localStorage.setItem('criminalMinds_gameCode', user.gameCode);
    }

    console.log('💾 Dados do usuário salvos localmente');
  }

  // Limpar dados do usuário
  clearUserData() {
    const keys = [
      'criminalMinds_userData',
      'criminalMinds_username', 
      'criminalMinds_userEmail',
      'criminalMinds_gameCode',
      'criminalMinds_isLoggedIn'
    ];

    keys.forEach(key => localStorage.removeItem(key));
    console.log('🗑️ Dados do usuário removidos');
  }

  // Obter dados do usuário
  getUserData() {
    try {
      const userData = localStorage.getItem('criminalMinds_userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('❌ Erro ao ler dados do usuário:', error);
      return null;
    }
  }

  // ========================================
  // MÉTODOS DE JOGO
  // ========================================

  // Atualizar progresso do jogo
  async updateGameProgress(progressData) {
    try {
      const response = await this.request('/game/update', {
        method: 'POST',
        body: JSON.stringify({
          action: 'save_progress',
          data: progressData
        })
      });

      return response;
    } catch (error) {
      console.error('❌ Erro ao salvar progresso:', error);
      throw error;
    }
  }

  // ========================================
  // HEALTH CHECK
  // ========================================

  // Verificar saúde da API
  async healthCheck() {
    try {
      const response = await this.request('/health');
      console.log('✅ API está funcionando:', response);
      return response;
    } catch (error) {
      console.error('❌ API não está respondendo:', error);
      throw error;
    }
  }
}

// ========================================
// INSTÂNCIA GLOBAL DA API
// ========================================

// Criar instância global
window.CriminalMindsAPI = new CriminalMindsAPI();

// Verificação automática de token ao carregar
document.addEventListener('DOMContentLoaded', async () => {
  const api = window.CriminalMindsAPI;
  
  try {
    // Tentar health check
    await api.healthCheck();
    
    // Se há token, verificar se ainda é válido
    if (api.token) {
      try {
        await api.verifyToken();
        console.log('✅ Usuário logado automaticamente');
      } catch (error) {
        console.log('⚠️ Token expirado, usuário deslogado');
      }
    }
  } catch (error) {
    console.warn('⚠️ API offline, usando modo local:', error.message);
  }
});

// ========================================
// UTILITÁRIOS PARA COMPATIBILIDADE
// ========================================

// Função para migrar dados do localStorage para API (se necessário)
async function migrateLocalDataToAPI() {
  const api = window.CriminalMindsAPI;
  
  try {
    // Verificar se há dados antigos no localStorage
    const oldUserData = localStorage.getItem('criminalMinds_userData');
    
    if (oldUserData && !api.token) {
      const userData = JSON.parse(oldUserData);
      
      console.log('🔄 Dados antigos encontrados, migração necessária');
      console.log('Para migrar seus dados, faça login novamente com suas credenciais');
      
      // Limpar dados antigos
      api.clearUserData();
    }
  } catch (error) {
    console.warn('⚠️ Erro na migração de dados:', error);
  }
}

// Executar migração se necessário
document.addEventListener('DOMContentLoaded', migrateLocalDataToAPI);

console.log('🎮 Criminal Minds API Client carregado!');
console.log('📡 Endpoint:', API_CONFIG.baseURL);
console.log('🗄️ Database: PostgreSQL Retool');
console.log('🔧 Modo:', window.location.hostname === 'localhost' ? 'Desenvolvimento' : 'Produção');