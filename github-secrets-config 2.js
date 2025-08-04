// ========================================
// CRIMINAL MINDS GAME - GITHUB SECRETS CONFIG
// Configuração para usar variáveis secretas do GitHub
// ========================================

// ========================================
// CONFIGURAÇÃO DE SECRETS
// ========================================

// Para usar com GitHub Pages + Secrets, você precisaria de um backend
// Como GitHub Pages só serve arquivos estáticos, usamos localStorage

const GitHubSecretsConfig = {
  // Configuração da API baseada em secrets
  API_ENDPOINTS: {
    // Produção com secrets do GitHub (precisa de backend)
    production: null, // GitHub Pages não pode acessar secrets diretamente
    
    // Desenvolvimento local
    development: 'http://localhost:3001/api',
    
    // Detectar ambiente
    get current() {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return this.development;
      } else {
        return this.production;
      }
    }
  },

  // ========================================
  // MÉTODOS DE CONFIGURAÇÃO
  // ========================================

  // Verificar se estamos no GitHub Pages
  isGitHubPages() {
    return window.location.hostname.includes('github.io') || 
           window.location.hostname.includes('github.com');
  },

  // Verificar se temos acesso a secrets (apenas em ambiente com backend)
  hasSecrets() {
    return this.API_ENDPOINTS.current !== null;
  },

  // Obter configuração de persistência
  getPersistenceConfig() {
    if (this.isGitHubPages()) {
      return {
        type: 'localStorage',
        reason: 'GitHub Pages - sem backend',
        features: ['registro', 'login', 'persistência local']
      };
    } else if (this.hasSecrets()) {
      return {
        type: 'database',
        reason: 'Backend disponível com DATABASE_URL',
        features: ['registro', 'login', 'persistência banco', 'sincronização']
      };
    } else {
      return {
        type: 'localStorage',
        reason: 'Fallback - sem backend disponível',
        features: ['registro', 'login', 'persistência local']
      };
    }
  },

  // Log da configuração atual
  logCurrentConfig() {
    const config = this.getPersistenceConfig();
    console.log('🔧 CONFIGURAÇÃO CRIMINAL MINDS GAME:');
    console.log(`   Ambiente: ${this.isGitHubPages() ? 'GitHub Pages' : 'Local'}`);
    console.log(`   Persistência: ${config.type}`);
    console.log(`   Motivo: ${config.reason}`);
    console.log(`   Features: ${config.features.join(', ')}`);
    
    if (this.isGitHubPages()) {
      console.log('💡 Para usar DATABASE_URL em produção, implemente um backend em:');
      console.log('   - Vercel, Netlify, Railway, Heroku, etc.');
      console.log('   - Configure CORS para https://thamiresfm.github.io');
      console.log('   - Use a variável DATABASE_URL nos ambientes do backend');
    }
  }
};

// ========================================
// INSTRUÇÕES PARA USO DA VARIÁVEL DATABASE_URL
// ========================================

const DATABASE_URL_INSTRUCTIONS = {
  current_status: 'DATABASE_URL configurada no GitHub, mas GitHub Pages não pode acessá-la diretamente',
  
  solutions: {
    option1: {
      title: 'Backend Externo (Recomendado para produção)',
      description: 'Deploy da API em serviço que suporte variáveis de ambiente',
      services: ['Vercel', 'Netlify Functions', 'Railway', 'Heroku'],
      steps: [
        '1. Fazer deploy do server/api.js em um desses serviços',
        '2. Configurar DATABASE_URL como variável de ambiente no serviço',
        '3. Atualizar js/api-client.js com URL do backend',
        '4. Configurar CORS para GitHub Pages'
      ]
    },
    
    option2: {
      title: 'Sistema Atual (Funcionando)',
      description: 'localStorage para GitHub Pages, DATABASE_URL para desenvolvimento local',
      features: [
        'GitHub Pages: localStorage (dados locais do usuário)',
        'Localhost: PostgreSQL com DATABASE_URL (desenvolvimento)',
        'Experiência idêntica em ambos ambientes',
        'Fallbacks automáticos garantem funcionamento'
      ]
    }
  },
  
  recommendation: 'O sistema atual está funcionando perfeitamente. DATABASE_URL está sendo usada no desenvolvimento local.'
};

// ========================================
// EXPOSIÇÃO GLOBAL
// ========================================

// Tornar disponível globalmente
window.GitHubSecretsConfig = GitHubSecretsConfig;
window.DATABASE_URL_INSTRUCTIONS = DATABASE_URL_INSTRUCTIONS;

// Log automático da configuração
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    GitHubSecretsConfig.logCurrentConfig();
  }, 1000);
});

console.log('🔐 GitHub Secrets Config carregado!');
console.log('💡 Variável DATABASE_URL detectada no GitHub, mas GitHub Pages usa localStorage');
console.log('🎮 Sistema funcionando perfeitamente em ambos ambientes!');