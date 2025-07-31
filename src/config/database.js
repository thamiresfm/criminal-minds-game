// ========================================
// CRIMINAL MINDS GAME - DATABASE CONFIG
// Configuração de conexão com MySQL e Retool
// ========================================

const { PrismaClient } = require('@prisma/client');
const mysql = require('mysql2/promise');

// ========================================
// PRISMA CLIENT CONFIGURATION
// ========================================

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
  
  errorFormat: 'colorless',
  
  datasources: {
    db: {
      url: process.env.BD_URL
    }
  }
});

// ========================================
// MYSQL DIRECT CONNECTION (Para casos especiais)
// ========================================

let mysqlConnection = null;

async function createMySQLConnection() {
  try {
    if (!mysqlConnection) {
      // Parse da BD_URL para extrair componentes
      const dbUrl = new URL(process.env.BD_URL);
      
      mysqlConnection = await mysql.createConnection({
        host: dbUrl.hostname,
        port: dbUrl.port || 3306,
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.slice(1), // Remove a barra inicial
        ssl: dbUrl.searchParams.get('sslaccept') === 'strict' ? { rejectUnauthorized: false } : false,
        connectTimeout: 60000,
        acquireTimeout: 60000,
        timeout: 60000,
        charset: 'utf8mb4'
      });
      
      console.log('✅ MySQL conexão direta estabelecida');
    }
    
    return mysqlConnection;
  } catch (error) {
    console.error('❌ Erro ao conectar MySQL:', error);
    throw error;
  }
}

// ========================================
// RETOOL INTEGRATION
// ========================================

class RetoolAPI {
  constructor() {
    this.apiUrl = process.env.RETOOL_API_URL;
    this.apiKey = process.env.RETOOL_API_KEY;
    this.appId = process.env.RETOOL_APP_ID;
    
    // Endpoints webhook configurados no Retool
    this.webhooks = {
      login: process.env.RETOOL_WEBHOOK_LOGIN,
      register: process.env.RETOOL_WEBHOOK_REGISTER,
      gameData: process.env.RETOOL_WEBHOOK_GAME_DATA
    };
  }
  
  async makeRequest(endpoint, data, method = 'POST') {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Retool-App-Id': this.appId
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Retool API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Erro na requisição Retool:', error);
      throw error;
    }
  }
  
  async callWebhook(webhookType, data) {
    try {
      const webhookUrl = this.webhooks[webhookType];
      if (!webhookUrl) {
        throw new Error(`Webhook '${webhookType}' não configurado`);
      }
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`❌ Erro no webhook ${webhookType}:`, error);
      throw error;
    }
  }
  
  // Métodos específicos para o jogo
  async syncUserData(userData) {
    return await this.callWebhook('register', {
      action: 'sync_user',
      data: userData
    });
  }
  
  async validateLogin(email, passwordHash) {
    return await this.callWebhook('login', {
      action: 'validate_login',
      email: email,
      passwordHash: passwordHash
    });
  }
  
  async saveGameProgress(gameData) {
    return await this.callWebhook('gameData', {
      action: 'save_progress',
      data: gameData
    });
  }
}

// ========================================
// DATABASE UTILITIES
// ========================================

class DatabaseUtils {
  static async healthCheck() {
    try {
      // Teste de conexão Prisma
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Prisma connection OK');
      
      // Teste de conexão MySQL direta
      const mysql = await createMySQLConnection();
      await mysql.ping();
      console.log('✅ MySQL direct connection OK');
      
      return {
        prisma: true,
        mysql: true,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Database health check failed:', error);
      return {
        prisma: false,
        mysql: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
  
  static async seedDatabase() {
    try {
      console.log('🌱 Iniciando seed do banco de dados...');
      
      // Verificar se já existe dados
      const userCount = await prisma.user.count();
      if (userCount > 0) {
        console.log('⚠️ Banco já contém dados. Pulando seed.');
        return;
      }
      
      // Criar usuário admin
      const adminUser = await prisma.user.create({
        data: {
          email: 'admin@criminalmindsgame.com',
          passwordHash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqyNzv7Y8tQ5Z2kJ1F0nJ3S', // hash de 'admin123'
          fullName: 'Administrador do Sistema',
          detectiveName: 'Admin_Detective',
          emailVerified: true,
          gameStats: {
            create: {
              gamesPlayed: 0,
              gamesWon: 0,
              gamesLost: 0,
              totalScore: 0
            }
          }
        }
      });
      
      console.log('✅ Usuário admin criado:', adminUser.email);
      
      // Criar jogo demo
      const demoGame = await prisma.game.create({
        data: {
          gameCode: 'DEMO001',
          hostUserId: adminUser.id,
          gameMode: 'cards',
          maxPlayers: 8,
          currentPlayers: 1,
          status: 'waiting',
          difficulty: 'medium',
          timeLimitMinutes: 60,
          players: {
            create: {
              userId: adminUser.id,
              detectiveName: adminUser.detectiveName,
              role: 'host',
              isReady: true
            }
          }
        }
      });
      
      console.log('✅ Jogo demo criado:', demoGame.gameCode);
      
      console.log('🎉 Seed concluído com sucesso!');
    } catch (error) {
      console.error('❌ Erro durante seed:', error);
      throw error;
    }
  }
  
  static async importFromCSV(csvFiles) {
    // Implementar importação dos CSVs criados
    console.log('📥 Importando dados dos CSVs...');
    
    // Esta função pode ser implementada para importar
    // os dados dos arquivos CSV criados anteriormente
    // Por enquanto, vamos usar o seed básico acima
    
    await this.seedDatabase();
  }
}

// ========================================
// CONNECTION MANAGEMENT
// ========================================

async function initializeDatabase() {
  try {
    console.log('🔄 Inicializando conexões de banco...');
    
    // Conectar Prisma
    await prisma.$connect();
    console.log('✅ Prisma conectado');
    
    // Criar conexão MySQL direta
    await createMySQLConnection();
    console.log('✅ MySQL conectado');
    
    // Health check
    const health = await DatabaseUtils.healthCheck();
    if (!health.prisma || !health.mysql) {
      throw new Error('Falha na verificação de saúde do banco');
    }
    
    console.log('🎉 Banco de dados inicializado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error);
    throw error;
  }
}

async function closeDatabase() {
  try {
    console.log('🔄 Fechando conexões de banco...');
    
    if (mysqlConnection) {
      await mysqlConnection.end();
      mysqlConnection = null;
      console.log('✅ MySQL connection closed');
    }
    
    await prisma.$disconnect();
    console.log('✅ Prisma disconnected');
    
    console.log('👋 Conexões fechadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao fechar conexões:', error);
  }
}

// ========================================
// EXPORTS
// ========================================

module.exports = {
  prisma,
  createMySQLConnection,
  RetoolAPI,
  DatabaseUtils,
  initializeDatabase,
  closeDatabase
};

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

process.on('SIGINT', async () => {
  console.log('\n🛑 Recebido SIGINT, fechando conexões...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Recebido SIGTERM, fechando conexões...');
  await closeDatabase();
  process.exit(0);
});