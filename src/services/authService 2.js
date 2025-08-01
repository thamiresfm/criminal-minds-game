// ========================================
// CRIMINAL MINDS GAME - AUTH SERVICE
// Serviço de autenticação com MySQL + Retool
// ========================================

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma, RetoolAPI } = require('../config/database');

// ========================================
// CONFIGURAÇÕES
// ========================================

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;
const SESSION_EXPIRES_HOURS = parseInt(process.env.SESSION_EXPIRES_HOURS) || 24;

const retoolAPI = new RetoolAPI();

// ========================================
// UTILITIES
// ========================================

function generateSessionToken() {
  return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getSessionExpiration() {
  const now = new Date();
  return new Date(now.getTime() + (SESSION_EXPIRES_HOURS * 60 * 60 * 1000));
}

function extractDeviceInfo(userAgent) {
  if (!userAgent) return { deviceType: null, browser: null, operatingSystem: null };
  
  let deviceType = 'desktop';
  let browser = 'unknown';
  let operatingSystem = 'unknown';
  
  // Detectar tipo de dispositivo
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    deviceType = /iPad/.test(userAgent) ? 'tablet' : 'mobile';
  }
  
  // Detectar navegador
  if (/Chrome/.test(userAgent)) browser = 'Chrome';
  else if (/Firefox/.test(userAgent)) browser = 'Firefox';
  else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) browser = 'Safari';
  else if (/Edge/.test(userAgent)) browser = 'Edge';
  
  // Detectar SO
  if (/Windows/.test(userAgent)) operatingSystem = 'Windows';
  else if (/Mac OS/.test(userAgent)) operatingSystem = 'MacOS';
  else if (/Linux/.test(userAgent)) operatingSystem = 'Linux';
  else if (/Android/.test(userAgent)) operatingSystem = 'Android';
  else if (/iOS|iPhone|iPad/.test(userAgent)) operatingSystem = 'iOS';
  
  return { deviceType, browser, operatingSystem };
}

// ========================================
// AUTH SERVICE CLASS
// ========================================

class AuthService {
  
  // ========================================
  // REGISTRO DE USUÁRIO
  // ========================================
  
  static async registerUser(userData, requestInfo = {}) {
    try {
      const { email, password, fullName, detectiveName, gameCode } = userData;
      const { ipAddress, userAgent } = requestInfo;
      
      // Validações básicas
      if (!email || !password || !fullName || !detectiveName) {
        throw new Error('Dados obrigatórios não fornecidos');
      }
      
      // Verificar se email já existe
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });
      
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }
      
      // Verificar se nome de detetive já existe
      const existingDetective = await prisma.user.findUnique({
        where: { detectiveName }
      });
      
      if (existingDetective) {
        throw new Error('Nome de detetive já está em uso');
      }
      
      // Hash da senha
      const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
      
      // Criar usuário com transação
      const result = await prisma.$transaction(async (tx) => {
        // Criar usuário
        const user = await tx.user.create({
          data: {
            email: email.toLowerCase(),
            passwordHash,
            fullName,
            detectiveName,
            gameCode: gameCode || null,
            emailVerified: false,
            isActive: true
          }
        });
        
        // Criar estatísticas iniciais
        await tx.gameStats.create({
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
            rankPoints: 0
          }
        });
        
        return user;
      });
      
      // Sincronizar com Retool
      try {
        await retoolAPI.syncUserData({
          userId: result.id,
          email: result.email,
          fullName: result.fullName,
          detectiveName: result.detectiveName,
          registrationDate: result.createdAt
        });
      } catch (retoolError) {
        console.warn('⚠️ Falha na sincronização com Retool:', retoolError.message);
        // Não falhar o registro por causa disso
      }
      
      // Criar sessão inicial
      const sessionData = await this.createSession(result.id, { ipAddress, userAgent });
      
      console.log('✅ Usuário registrado com sucesso:', result.email);
      
      return {
        success: true,
        user: {
          id: result.id,
          email: result.email,
          fullName: result.fullName,
          detectiveName: result.detectiveName,
          gameCode: result.gameCode
        },
        session: sessionData
      };
      
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // ========================================
  // LOGIN DE USUÁRIO
  // ========================================
  
  static async loginUser(email, password, requestInfo = {}) {
    try {
      const { ipAddress, userAgent } = requestInfo;
      
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }
      
      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          gameStats: true
        }
      });
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      if (!user.isActive) {
        throw new Error('Conta desativada');
      }
      
      // Verificar senha
      const passwordValid = await bcrypt.compare(password, user.passwordHash);
      if (!passwordValid) {
        throw new Error('Senha incorreta');
      }
      
      // Atualizar último login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      });
      
      // Validar com Retool
      try {
        await retoolAPI.validateLogin(user.email, user.passwordHash);
      } catch (retoolError) {
        console.warn('⚠️ Falha na validação Retool:', retoolError.message);
        // Não falhar o login por causa disso
      }
      
      // Criar nova sessão
      const sessionData = await this.createSession(user.id, { ipAddress, userAgent });
      
      console.log('✅ Login realizado com sucesso:', user.email);
      
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          detectiveName: user.detectiveName,
          gameCode: user.gameCode,
          stats: user.gameStats
        },
        session: sessionData
      };
      
    } catch (error) {
      console.error('❌ Erro no login:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // ========================================
  // GERENCIAMENTO DE SESSÕES
  // ========================================
  
  static async createSession(userId, requestInfo = {}) {
    try {
      const { ipAddress, userAgent } = requestInfo;
      const deviceInfo = extractDeviceInfo(userAgent);
      
      const sessionToken = generateSessionToken();
      const expiresAt = getSessionExpiration();
      
      const session = await prisma.userSession.create({
        data: {
          userId,
          sessionToken,
          ipAddress,
          userAgent,
          deviceType: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          operatingSystem: deviceInfo.operatingSystem,
          isActive: true,
          loginTime: new Date(),
          lastActivity: new Date(),
          expiresAt
        }
      });
      
      // Gerar JWT
      const jwtToken = jwt.sign(
        { 
          userId, 
          sessionId: session.id,
          sessionToken: session.sessionToken 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      
      return {
        sessionId: session.id,
        sessionToken: session.sessionToken,
        jwtToken,
        expiresAt: session.expiresAt
      };
      
    } catch (error) {
      console.error('❌ Erro ao criar sessão:', error);
      throw error;
    }
  }
  
  static async validateSession(sessionToken) {
    try {
      const session = await prisma.userSession.findUnique({
        where: { sessionToken },
        include: {
          user: {
            include: {
              gameStats: true
            }
          }
        }
      });
      
      if (!session) {
        return { valid: false, error: 'Sessão não encontrada' };
      }
      
      if (!session.isActive) {
        return { valid: false, error: 'Sessão inativa' };
      }
      
      if (new Date() > session.expiresAt) {
        // Expirar sessão
        await prisma.userSession.update({
          where: { id: session.id },
          data: { isActive: false, logoutTime: new Date() }
        });
        return { valid: false, error: 'Sessão expirada' };
      }
      
      // Atualizar última atividade
      await prisma.userSession.update({
        where: { id: session.id },
        data: { lastActivity: new Date() }
      });
      
      return {
        valid: true,
        user: {
          id: session.user.id,
          email: session.user.email,
          fullName: session.user.fullName,
          detectiveName: session.user.detectiveName,
          gameCode: session.user.gameCode,
          stats: session.user.gameStats
        },
        session: {
          id: session.id,
          sessionToken: session.sessionToken,
          loginTime: session.loginTime,
          lastActivity: session.lastActivity
        }
      };
      
    } catch (error) {
      console.error('❌ Erro ao validar sessão:', error);
      return { valid: false, error: 'Erro interno' };
    }
  }
  
  static async logoutUser(sessionToken) {
    try {
      await prisma.userSession.update({
        where: { sessionToken },
        data: {
          isActive: false,
          logoutTime: new Date()
        }
      });
      
      return { success: true };
    } catch (error) {
      console.error('❌ Erro no logout:', error);
      return { success: false, error: error.message };
    }
  }
  
  // ========================================
  // MIDDLEWARE DE AUTENTICAÇÃO
  // ========================================
  
  static async authMiddleware(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const sessionToken = req.headers['x-session-token'];
      
      let token = null;
      
      // Tentar extrair token do header Authorization
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
      
      // Se não tiver JWT, tentar validar por session token
      if (!token && sessionToken) {
        const sessionValidation = await this.validateSession(sessionToken);
        if (sessionValidation.valid) {
          req.user = sessionValidation.user;
          req.session = sessionValidation.session;
          return next();
        } else {
          return res.status(401).json({ error: 'Sessão inválida' });
        }
      }
      
      // Validar JWT
      if (token) {
        const decoded = jwt.verify(token, JWT_SECRET);
        const sessionValidation = await this.validateSession(decoded.sessionToken);
        
        if (sessionValidation.valid) {
          req.user = sessionValidation.user;
          req.session = sessionValidation.session;
          req.jwt = decoded;
          return next();
        } else {
          return res.status(401).json({ error: 'Token inválido' });
        }
      }
      
      return res.status(401).json({ error: 'Token de autenticação necessário' });
      
    } catch (error) {
      console.error('❌ Erro no middleware de auth:', error);
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
  
  // ========================================
  // UTILITY METHODS
  // ========================================
  
  static async getUserById(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          gameStats: true,
          sessions: {
            where: { isActive: true },
            orderBy: { lastActivity: 'desc' },
            take: 5
          }
        }
      });
      
      return user;
    } catch (error) {
      console.error('❌ Erro ao buscar usuário:', error);
      return null;
    }
  }
  
  static async updateUserProfile(userId, updateData) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: updateData
      });
      
      return { success: true, user };
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      return { success: false, error: error.message };
    }
  }
  
  static async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      const passwordValid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!passwordValid) {
        throw new Error('Senha atual incorreta');
      }
      
      const newPasswordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
      
      await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash }
      });
      
      // Invalidar todas as sessões ativas
      await prisma.userSession.updateMany({
        where: { userId, isActive: true },
        data: { isActive: false, logoutTime: new Date() }
      });
      
      return { success: true };
    } catch (error) {
      console.error('❌ Erro ao alterar senha:', error);
      return { success: false, error: error.message };
    }
  }
}

// ========================================
// EXPORTS
// ========================================

module.exports = AuthService;