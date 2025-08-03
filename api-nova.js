// ========================================
// CRIMINAL MINDS GAME - API MELHORADA v2.0
// Servidor Express otimizado para o jogo
// ========================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ========================================
// CONFIGURAÇÃO DO SERVIDOR
// ========================================

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'criminal_minds_jwt_secret_2024';

// Inicializar Prisma
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error'] 
    : ['error'],
  errorFormat: 'colorless'
});

// ========================================
// MIDDLEWARES MELHORADOS
// ========================================

// Segurança otimizada
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https:"],
    },
  },
}));

// CORS otimizado para produção e desenvolvimento
app.use(cors({
  origin: [
    'https://thamiresfm.github.io',
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting inteligente
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    success: false,
    error: 'Muitas tentativas. Tente novamente em 15 minutos.',
    retryAfter: '15 minutos'
  }
});
app.use('/api/', limiter);

// Rate limiting específico para autenticação
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // máximo 10 tentativas de login por IP
  message: {
    success: false,
    error: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
  }
});

// Parsing JSON melhorado
app.use(express.json({ 
  limit: '10mb',
  strict: true
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Headers de resposta otimizados
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Criminal-Minds-API');
  res.setHeader('X-API-Version', '2.0.0');
  next();
});

// ========================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ========================================

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token de acesso requerido'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { stats: true }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Token inválido'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido ou expirado'
    });
  }
};

// ========================================
// ROTAS MELHORADAS
// ========================================

// Health check aprimorado
app.get('/api/health', async (req, res) => {
  try {
    // Testar conexão com banco
    await prisma.$queryRaw`SELECT 1`;
    
    // Estatísticas gerais
    const userCount = await prisma.user.count();
    
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '2.0.0',
      stats: {
        totalUsers: userCount
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('❌ Health check failed:', error);
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    });
  }
});

// ========================================
// ROTAS DE AUTENTICAÇÃO MELHORADAS
// ========================================

// Registro aprimorado
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { fullName, email, detectiveName, password } = req.body;

    // Validações melhoradas
    if (!fullName || !email || !detectiveName || !password) {
      return res.status(400).json({
        success: false,
        error: 'Todos os campos obrigatórios devem ser preenchidos',
        required: ['fullName', 'email', 'detectiveName', 'password']
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email deve ter um formato válido'
      });
    }

    // Validação de senha
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Senha deve ter pelo menos 6 caracteres'
      });
    }

    // Verificar email duplicado
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email já cadastrado'
      });
    }

    // Verificar nome de detetive duplicado
    const existingDetective = await prisma.user.findFirst({
      where: { detectiveName }
    });

    if (existingDetective) {
      return res.status(409).json({
        success: false,
        error: 'Nome de detetive já está em uso'
      });
    }

    // Hash da senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar usuário com transação
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: fullName.trim(),
          email: email.toLowerCase().trim(),
          detectiveName: detectiveName.trim(),
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Criar estatísticas iniciais
      const stats = await tx.gameStats.create({
        data: {
          userId: user.id,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0,
          totalScore: 0,
          cardsCollected: 0,
          bestTimeSeconds: 0,
          favoriteMode: 'cards',
          comboStreakRecord: 0,
          evidencesFound: 0,
          suspectsInterrogated: 0,
          locationsInvestigated: 0,
          totalPlaytimeMinutes: 0,
          achievementsUnlocked: 0,
          rankLevel: 1,
          rankPoints: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      return { user, stats };
    });

    // Gerar JWT token
    const token = jwt.sign(
      { 
        userId: result.user.id,
        timestamp: Date.now()
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Log de sucesso
    console.log(`✅ Novo usuário registrado: ${email} (ID: ${result.user.id})`);

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      user: {
        id: result.user.id,
        email: result.user.email,
        fullName: result.user.fullName,
        detectiveName: result.user.detectiveName,
        gameCode: result.user.gameCode
      },
      token
    });

  } catch (error) {
    console.error('❌ Erro no registro:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Login aprimorado
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios'
      });
    }

    // Buscar usuário com estatísticas
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { stats: true }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Email ou senha incorretos'
      });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Email ou senha incorretos'
      });
    }

    // Atualizar último login
    await prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() }
    });

    // Gerar token
    const token = jwt.sign(
      { 
        userId: user.id,
        timestamp: Date.now()
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ Login realizado: ${email} (ID: ${user.id})`);

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        detectiveName: user.detectiveName,
        gameCode: user.gameCode,
        stats: user.stats
      },
      token
    });

  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// ========================================
// NOVAS ROTAS DO JOGO
// ========================================

// Perfil do usuário
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { 
        stats: true
      }
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        detectiveName: user.detectiveName,
        gameCode: user.gameCode,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('❌ Erro ao buscar perfil:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar perfil'
    });
  }
});

// Ranking de jogadores
app.get('/api/game/ranking', async (req, res) => {
  try {
    const ranking = await prisma.gameStats.findMany({
      take: 10,
      orderBy: [
        { rankPoints: 'desc' },
        { gamesWon: 'desc' },
        { totalScore: 'desc' }
      ],
      include: {
        user: {
          select: {
            detectiveName: true,
            fullName: true
          }
        }
      }
    });

    res.json({
      success: true,
      ranking: ranking.map((stats, index) => ({
        position: index + 1,
        detectiveName: stats.user.detectiveName,
        fullName: stats.user.fullName,
        rankLevel: stats.rankLevel,
        rankPoints: stats.rankPoints,
        gamesWon: stats.gamesWon,
        gamesPlayed: stats.gamesPlayed,
        totalScore: stats.totalScore
      }))
    });
  } catch (error) {
    console.error('❌ Erro ao buscar ranking:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar ranking'
    });
  }
});

// ========================================
// TRATAMENTO DE ERROS
// ========================================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    path: req.originalUrl,
    suggestion: 'Verifique a URL e tente novamente'
  });
});

// Error handler global
app.use((error, req, res, next) => {
  console.error('❌ Erro global:', error);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    timestamp: new Date().toISOString()
  });
});

// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('🔄 Iniciando shutdown graceful...');
  
  await prisma.$disconnect();
  console.log('✅ Prisma desconectado');
  
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Iniciar servidor
const server = app.listen(PORT, async () => {
  try {
    // Testar conexão com banco
    await prisma.$connect();
    console.log('✅ Conexão com PostgreSQL Neon estabelecida');
    
    console.log('🚀 API Server MELHORADA v2.0 rodando na porta', PORT);
    console.log('🌐 Health check:', `http://localhost:${PORT}/api/health`);
    console.log('📡 CORS configurado para GitHub Pages');
    console.log('🔐 JWT Secret configurado');
    console.log('🗄️ Banco PostgreSQL Neon conectado via Prisma');
    console.log('⚡ Funcionalidades melhoradas:');
    console.log('   • Autenticação robusta com rate limiting');
    console.log('   • Validações aprimoradas de email e senha');
    console.log('   • Perfil de usuário com estatísticas');
    console.log('   • Ranking de jogadores');
    console.log('   • Headers de segurança otimizados');
    console.log('   • Tratamento de erros melhorado');
    
  } catch (error) {
    console.error('❌ Erro ao conectar com PostgreSQL:', error);
    process.exit(1);
  }
});

// Tratar erros do servidor
server.on('error', (error) => {
  console.error('❌ Erro do servidor Express:', error);
});

module.exports = app;