// ========================================
// CRIMINAL MINDS GAME - API CLIENT SIMPLIFICADO v2.0
// Versão sem headers customizados para evitar problemas CORS
// ENDPOINT CORRIGIDO PARA RAILWAY
// ========================================

// URLs da API
const API_CONFIG = {
  production: 'https://criminal-minds-game-api.vercel.app/api',
  development: 'http://localhost:3001/api',
  
  get baseURL() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return this.development;
    } else {
      return this.production;
    }
  }
};

// Função para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

class CriminalMindsAPISimple {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.user = JSON.parse(localStorage.getItem('user_data') || 'null');
  }

  /**
   * Fazer requisição HTTP simples
   */
  async makeRequest(endpoint, options = {}) {
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    // Adicionar token de autenticação se disponível
    if (this.token) {
      defaultOptions.headers['Authorization'] = `Bearer ${this.token}`;
    }

    const finalOptions = { ...defaultOptions, ...options };

    try {
      console.log(`🔗 API Request: ${finalOptions.method} ${url}`);
      
      // Timeout de 10 segundos
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
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
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar com o servidor. Verifique sua conexão.');
      }
      
      if (error.name === 'AbortError') {
        throw new Error('Tempo limite excedido. Verifique sua conexão.');
      }
      
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão. Verifique sua internet.');
      }
      
      throw error;
    }
  }

  /**
   * Salvar dados do usuário
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

  /**
   * Registrar novo usuário
   */
  async register(fullName, email, detectiveName, password) {
    try {
      console.log('🔐 Iniciando registro de usuário...');
      
      // Validações
      if (!fullName || !email || !detectiveName || !password) {
        throw new Error('Todos os campos são obrigatórios');
      }

      if (password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      if (!isValidEmail(email)) {
        throw new Error('Email inválido');
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
      
      // Validações
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
    
    if (window.location.pathname !== '/login.html') {
      window.location.href = 'login.html';
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
   * Verificar conectividade
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
}

// Criar instância global
window.CriminalMindsAPISimple = new CriminalMindsAPISimple();
console.log('✅ Criminal Minds API Client Simplificado v2.0 inicializado');
console.log('🔗 Endpoint: ' + API_CONFIG.baseURL); 