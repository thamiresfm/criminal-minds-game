// ========================================
// CRIMINAL MINDS GAME - GAME SERVICE
// Serviço de dados e lógica do jogo
// ========================================

const { prisma, RetoolAPI } = require('../config/database');

const retoolAPI = new RetoolAPI();

// ========================================
// GAME SERVICE CLASS
// ========================================

class GameService {
  
  // ========================================
  // GERENCIAMENTO DE JOGOS
  // ========================================
  
  static async createGame(hostUserId, gameData) {
    try {
      const { gameCode, gameMode, maxPlayers, difficulty, timeLimitMinutes, settings } = gameData;
      
      // Verificar se o código do jogo já existe
      if (gameCode) {
        const existingGame = await prisma.game.findUnique({
          where: { gameCode }
        });
        
        if (existingGame) {
          throw new Error('Código do jogo já existe');
        }
      }
      
      // Gerar código único se não fornecido
      const finalGameCode = gameCode || await this.generateUniqueGameCode();
      
      // Buscar dados do host
      const host = await prisma.user.findUnique({
        where: { id: hostUserId }
      });
      
      if (!host) {
        throw new Error('Host não encontrado');
      }
      
      // Criar jogo com transação
      const game = await prisma.$transaction(async (tx) => {
        // Criar o jogo
        const newGame = await tx.game.create({
          data: {
            gameCode: finalGameCode,
            hostUserId,
            gameMode: gameMode || 'cards',
            maxPlayers: maxPlayers || 6,
            currentPlayers: 1,
            status: 'waiting',
            difficulty: difficulty || 'medium',
            timeLimitMinutes: timeLimitMinutes || 60,
            settingsJson: settings || {},
            isActive: true
          }
        });
        
        // Adicionar host como jogador
        await tx.gamePlayer.create({
          data: {
            gameId: newGame.id,
            userId: hostUserId,
            detectiveName: host.detectiveName,
            role: 'host',
            isReady: true,
            isActive: true
          }
        });
        
        return newGame;
      });
      
      console.log('✅ Jogo criado:', game.gameCode);
      
      return {
        success: true,
        game: {
          id: game.id,
          gameCode: game.gameCode,
          gameMode: game.gameMode,
          maxPlayers: game.maxPlayers,
          currentPlayers: game.currentPlayers,
          status: game.status,
          difficulty: game.difficulty,
          timeLimitMinutes: game.timeLimitMinutes
        }
      };
      
    } catch (error) {
      console.error('❌ Erro ao criar jogo:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  static async joinGame(gameCode, userId) {
    try {
      // Buscar jogo
      const game = await prisma.game.findUnique({
        where: { gameCode },
        include: {
          players: true
        }
      });
      
      if (!game) {
        throw new Error('Jogo não encontrado');
      }
      
      if (!game.isActive || game.status === 'finished') {
        throw new Error('Jogo não está disponível');
      }
      
      if (game.currentPlayers >= game.maxPlayers) {
        throw new Error('Jogo está cheio');
      }
      
      // Verificar se usuário já está no jogo
      const existingPlayer = game.players.find(p => p.userId === userId && p.isActive);
      if (existingPlayer) {
        throw new Error('Usuário já está no jogo');
      }
      
      // Buscar dados do usuário
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      // Adicionar jogador com transação
      const result = await prisma.$transaction(async (tx) => {
        // Adicionar jogador
        const gamePlayer = await tx.gamePlayer.create({
          data: {
            gameId: game.id,
            userId,
            detectiveName: user.detectiveName,
            role: 'player',
            isReady: false,
            isActive: true
          }
        });
        
        // Atualizar contagem de jogadores
        const updatedGame = await tx.game.update({
          where: { id: game.id },
          data: {
            currentPlayers: game.currentPlayers + 1
          }
        });
        
        return { gamePlayer, updatedGame };
      });
      
      console.log('✅ Jogador entrou no jogo:', user.detectiveName, game.gameCode);
      
      return {
        success: true,
        game: {
          id: result.updatedGame.id,
          gameCode: result.updatedGame.gameCode,
          currentPlayers: result.updatedGame.currentPlayers,
          maxPlayers: result.updatedGame.maxPlayers
        },
        playerId: result.gamePlayer.id
      };
      
    } catch (error) {
      console.error('❌ Erro ao entrar no jogo:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  static async leaveGame(gameId, userId) {
    try {
      const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
          players: {
            where: { isActive: true }
          }
        }
      });
      
      if (!game) {
        throw new Error('Jogo não encontrado');
      }
      
      const playerInGame = game.players.find(p => p.userId === userId);
      if (!playerInGame) {
        throw new Error('Jogador não está no jogo');
      }
      
      // Atualizar com transação
      await prisma.$transaction(async (tx) => {
        // Marcar jogador como inativo
        await tx.gamePlayer.update({
          where: { id: playerInGame.id },
          data: {
            isActive: false,
            leaveTime: new Date()
          }
        });
        
        // Atualizar contagem de jogadores
        await tx.game.update({
          where: { id: gameId },
          data: {
            currentPlayers: Math.max(0, game.currentPlayers - 1)
          }
        });
        
        // Se era o host e há outros jogadores, transferir host
        if (playerInGame.role === 'host' && game.players.length > 1) {
          const nextHost = game.players.find(p => p.userId !== userId && p.isActive);
          if (nextHost) {
            await tx.gamePlayer.update({
              where: { id: nextHost.id },
              data: { role: 'host' }
            });
            
            await tx.game.update({
              where: { id: gameId },
              data: { hostUserId: nextHost.userId }
            });
          }
        }
        
        // Se não há mais jogadores, encerrar jogo
        if (game.currentPlayers <= 1) {
          await tx.game.update({
            where: { id: gameId },
            data: {
              status: 'cancelled',
              isActive: false,
              finishedAt: new Date()
            }
          });
        }
      });
      
      return { success: true };
      
    } catch (error) {
      console.error('❌ Erro ao sair do jogo:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  static async startGame(gameId, hostUserId) {
    try {
      const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
          players: {
            where: { isActive: true }
          }
        }
      });
      
      if (!game) {
        throw new Error('Jogo não encontrado');
      }
      
      if (game.hostUserId !== hostUserId) {
        throw new Error('Apenas o host pode iniciar o jogo');
      }
      
      if (game.status !== 'waiting') {
        throw new Error('Jogo não está aguardando para iniciar');
      }
      
      const minPlayers = parseInt(process.env.MIN_PLAYERS_TO_START) || 2;
      if (game.currentPlayers < minPlayers) {
        throw new Error(`Mínimo ${minPlayers} jogadores necessários`);
      }
      
      // Verificar se todos estão prontos
      const notReadyPlayers = game.players.filter(p => !p.isReady);
      if (notReadyPlayers.length > 0) {
        throw new Error('Nem todos os jogadores estão prontos');
      }
      
      // Iniciar jogo
      const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: {
          status: 'active',
          startedAt: new Date()
        }
      });
      
      console.log('✅ Jogo iniciado:', game.gameCode);
      
      return {
        success: true,
        game: {
          id: updatedGame.id,
          gameCode: updatedGame.gameCode,
          status: updatedGame.status,
          startedAt: updatedGame.startedAt
        }
      };
      
    } catch (error) {
      console.error('❌ Erro ao iniciar jogo:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // ========================================
  // PROGRESSO DO JOGO
  // ========================================
  
  static async saveGameProgress(gameId, userId, progressData) {
    try {
      const { sessionId, gameMode, currentLevel, cardsPlayed, comboStreak, 
              playerCoins, evidencesCollected, suspectsInterrogated, 
              locationsInvestigated, timeRemainingSeconds, progressDataJson } = progressData;
      
      // Invalidar salvamentos anteriores
      await prisma.gameProgress.updateMany({
        where: {
          gameId,
          userId,
          isCurrentSave: true
        },
        data: {
          isCurrentSave: false
        }
      });
      
      // Criar novo salvamento
      const progress = await prisma.gameProgress.create({
        data: {
          gameId,
          userId,
          sessionId,
          gameMode: gameMode || 'cards',
          currentLevel: currentLevel || 1,
          cardsPlayed: cardsPlayed || 0,
          comboStreak: comboStreak || 0,
          playerCoins: playerCoins || 0,
          evidencesCollected: evidencesCollected || 0,
          suspectsInterrogated: suspectsInterrogated || 0,
          locationsInvestigated: locationsInvestigated || 0,
          timeRemainingSeconds: timeRemainingSeconds || 0,
          progressDataJson: progressDataJson || {},
          isCurrentSave: true
        }
      });
      
      // Sincronizar com Retool
      try {
        await retoolAPI.saveGameProgress({
          progressId: progress.id,
          gameId,
          userId,
          progressData: progressData
        });
      } catch (retoolError) {
        console.warn('⚠️ Falha na sincronização com Retool:', retoolError.message);
      }
      
      console.log('✅ Progresso salvo para usuário:', userId, 'jogo:', gameId);
      
      return {
        success: true,
        progressId: progress.id
      };
      
    } catch (error) {
      console.error('❌ Erro ao salvar progresso:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  static async loadGameProgress(gameId, userId) {
    try {
      const progress = await prisma.gameProgress.findFirst({
        where: {
          gameId,
          userId,
          isCurrentSave: true
        },
        orderBy: {
          saveTimestamp: 'desc'
        }
      });
      
      if (!progress) {
        return {
          success: false,
          error: 'Nenhum progresso salvo encontrado'
        };
      }
      
      return {
        success: true,
        progress: {
          id: progress.id,
          gameMode: progress.gameMode,
          currentLevel: progress.currentLevel,
          cardsPlayed: progress.cardsPlayed,
          comboStreak: progress.comboStreak,
          playerCoins: progress.playerCoins,
          evidencesCollected: progress.evidencesCollected,
          suspectsInterrogated: progress.suspectsInterrogated,
          locationsInvestigated: progress.locationsInvestigated,
          timeRemainingSeconds: progress.timeRemainingSeconds,
          progressData: progress.progressDataJson,
          saveTimestamp: progress.saveTimestamp
        }
      };
      
    } catch (error) {
      console.error('❌ Erro ao carregar progresso:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // ========================================
  // ESTATÍSTICAS
  // ========================================
  
  static async updateUserStats(userId, gameResult) {
    try {
      const { won, score, cardsPlayed, comboStreak, evidencesFound, 
              suspectsInterrogated, locationsInvestigated, playtimeMinutes,
              achievements, difficulty, timeUsedSeconds } = gameResult;
      
      const currentStats = await prisma.gameStats.findUnique({
        where: { userId }
      });
      
      if (!currentStats) {
        throw new Error('Estatísticas do usuário não encontradas');
      }
      
      // Preparar dados de atualização baseados na dificuldade
      const updateData = {
        gamesPlayed: currentStats.gamesPlayed + 1,
        gamesWon: won ? currentStats.gamesWon + 1 : currentStats.gamesWon,
        gamesLost: won ? currentStats.gamesLost : currentStats.gamesLost + 1,
        totalScore: currentStats.totalScore + (score || 0),
        cardsCollected: currentStats.cardsCollected + (cardsPlayed || 0),
        comboStreakRecord: Math.max(currentStats.comboStreakRecord, comboStreak || 0),
        evidencesFound: currentStats.evidencesFound + (evidencesFound || 0),
        suspectsInterrogated: currentStats.suspectsInterrogated + (suspectsInterrogated || 0),
        locationsInvestigated: currentStats.locationsInvestigated + (locationsInvestigated || 0),
        totalPlaytimeMinutes: currentStats.totalPlaytimeMinutes + (playtimeMinutes || 0),
        achievementsUnlocked: currentStats.achievementsUnlocked + (achievements || 0),
        lastGameDate: new Date(),
        // Sistema de ranking com bônus por dificuldade
        rankPoints: currentStats.rankPoints + GameService.calculateRankPoints(won, score, difficulty),
        rankLevel: Math.floor((currentStats.rankPoints + GameService.calculateRankPoints(won, score, difficulty)) / 1000) + 1
      };

      // Atualizar estatísticas específicas por dificuldade
      const difficultyMap = {
        'easy': 'easy',
        'medium': 'medium', 
        'hard': 'hard'
      };

      const mappedDifficulty = difficultyMap[difficulty] || 'medium';
      
      if (mappedDifficulty === 'easy') {
        updateData.easyGamesPlayed = currentStats.easyGamesPlayed + 1;
        updateData.easyGamesWon = won ? currentStats.easyGamesWon + 1 : currentStats.easyGamesWon;
        if (won && timeUsedSeconds && (currentStats.easyBestTimeSeconds === 0 || timeUsedSeconds < currentStats.easyBestTimeSeconds)) {
          updateData.easyBestTimeSeconds = timeUsedSeconds;
        }
      } else if (mappedDifficulty === 'medium') {
        updateData.mediumGamesPlayed = currentStats.mediumGamesPlayed + 1;
        updateData.mediumGamesWon = won ? currentStats.mediumGamesWon + 1 : currentStats.mediumGamesWon;
        if (won && timeUsedSeconds && (currentStats.mediumBestTimeSeconds === 0 || timeUsedSeconds < currentStats.mediumBestTimeSeconds)) {
          updateData.mediumBestTimeSeconds = timeUsedSeconds;
        }
      } else if (mappedDifficulty === 'hard') {
        updateData.hardGamesPlayed = currentStats.hardGamesPlayed + 1;
        updateData.hardGamesWon = won ? currentStats.hardGamesWon + 1 : currentStats.hardGamesWon;
        if (won && timeUsedSeconds && (currentStats.hardBestTimeSeconds === 0 || timeUsedSeconds < currentStats.hardBestTimeSeconds)) {
          updateData.hardBestTimeSeconds = timeUsedSeconds;
        }
      }

      // Atualizar estatísticas
      await prisma.gameStats.update({
        where: { userId },
        data: updateData
      });
      
      return { success: true };
      
    } catch (error) {
      console.error('❌ Erro ao atualizar estatísticas:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  static async getUserStatsByDifficulty(userId) {
    try {
      const stats = await prisma.gameStats.findUnique({
        where: { userId }
      });
      
      if (!stats) {
        throw new Error('Estatísticas do usuário não encontradas');
      }
      
      return {
        success: true,
        data: {
          easy: {
            gamesPlayed: stats.easyGamesPlayed,
            gamesWon: stats.easyGamesWon,
            winRate: stats.easyGamesPlayed > 0 ? ((stats.easyGamesWon / stats.easyGamesPlayed) * 100).toFixed(1) : '0.0',
            bestTimeSeconds: stats.easyBestTimeSeconds,
            bestTimeFormatted: GameService.formatTime(stats.easyBestTimeSeconds)
          },
          medium: {
            gamesPlayed: stats.mediumGamesPlayed,
            gamesWon: stats.mediumGamesWon,
            winRate: stats.mediumGamesPlayed > 0 ? ((stats.mediumGamesWon / stats.mediumGamesPlayed) * 100).toFixed(1) : '0.0',
            bestTimeSeconds: stats.mediumBestTimeSeconds,
            bestTimeFormatted: GameService.formatTime(stats.mediumBestTimeSeconds)
          },
          hard: {
            gamesPlayed: stats.hardGamesPlayed,
            gamesWon: stats.hardGamesWon,
            winRate: stats.hardGamesPlayed > 0 ? ((stats.hardGamesWon / stats.hardGamesPlayed) * 100).toFixed(1) : '0.0',
            bestTimeSeconds: stats.hardBestTimeSeconds,
            bestTimeFormatted: GameService.formatTime(stats.hardBestTimeSeconds)
          },
          overall: {
            gamesPlayed: stats.gamesPlayed,
            gamesWon: stats.gamesWon,
            gamesLost: stats.gamesLost,
            totalScore: stats.totalScore,
            rankLevel: stats.rankLevel,
            rankPoints: stats.rankPoints
          }
        }
      };
      
    } catch (error) {
      console.error('❌ Erro ao obter estatísticas por dificuldade:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // ========================================
  // UTILITIES
  // ========================================
  
  static calculateRankPoints(won, score, difficulty) {
    let basePoints = won ? 100 : 25;
    let scoreBonus = Math.floor((score || 0) / 10);
    
    // Bônus por dificuldade
    const difficultyMultiplier = {
      'easy': 1.0,
      'medium': 1.5, 
      'hard': 2.0
    };
    
    const multiplier = difficultyMultiplier[difficulty] || 1.0;
    
    return Math.floor((basePoints + scoreBonus) * multiplier);
  }
  
  static formatTime(seconds) {
    if (!seconds || seconds === 0) return '--:--';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  static async generateUniqueGameCode() {
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      const code = 'GAME' + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const existing = await prisma.game.findUnique({
        where: { gameCode: code }
      });
      
      if (!existing) {
        return code;
      }
      
      attempts++;
    }
    
    throw new Error('Não foi possível gerar código único para o jogo');
  }
  
  static async getGameDetails(gameCode) {
    try {
      const game = await prisma.game.findUnique({
        where: { gameCode },
        include: {
          host: {
            select: {
              id: true,
              fullName: true,
              detectiveName: true
            }
          },
          players: {
            where: { isActive: true },
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  detectiveName: true
                }
              }
            },
            orderBy: {
              joinTime: 'asc'
            }
          }
        }
      });
      
      if (!game) {
        return { success: false, error: 'Jogo não encontrado' };
      }
      
      return {
        success: true,
        game: {
          id: game.id,
          gameCode: game.gameCode,
          gameMode: game.gameMode,
          maxPlayers: game.maxPlayers,
          currentPlayers: game.currentPlayers,
          status: game.status,
          difficulty: game.difficulty,
          timeLimitMinutes: game.timeLimitMinutes,
          createdAt: game.createdAt,
          startedAt: game.startedAt,
          host: game.host,
          players: game.players.map(p => ({
            id: p.id,
            userId: p.userId,
            detectiveName: p.detectiveName,
            role: p.role,
            isReady: p.isReady,
            joinTime: p.joinTime,
            user: p.user
          })),
          settings: game.settingsJson
        }
      };
      
    } catch (error) {
      console.error('❌ Erro ao buscar detalhes do jogo:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  static async getUserGames(userId, limit = 10) {
    try {
      const games = await prisma.gamePlayer.findMany({
        where: {
          userId,
          isActive: true
        },
        include: {
          game: {
            include: {
              host: {
                select: {
                  detectiveName: true
                }
              }
            }
          }
        },
        orderBy: {
          joinTime: 'desc'
        },
        take: limit
      });
      
      return {
        success: true,
        games: games.map(gp => ({
          gameId: gp.game.id,
          gameCode: gp.game.gameCode,
          gameMode: gp.game.gameMode,
          status: gp.game.status,
          role: gp.role,
          isReady: gp.isReady,
          joinTime: gp.joinTime,
          hostName: gp.game.host.detectiveName,
          players: `${gp.game.currentPlayers}/${gp.game.maxPlayers}`
        }))
      };
      
    } catch (error) {
      console.error('❌ Erro ao buscar jogos do usuário:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// ========================================
// EXPORTS
// ========================================

module.exports = GameService;