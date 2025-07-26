// ========================================
// CRIMINAL MINDS GAME - DYNAMIC GAME STORE
// ========================================

import { create } from 'zustand';
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { 
  DynamicGameState, 
  DynamicPlayer, 
  GamePhase, 
  ClueTemplate,
  Suspect,
  InterrogationResponse,
  GameGenerationOptions,
  CaseTemplate,
  GeneratedGame
} from '@/types/dynamicGame';
import { GameEngine } from '@/lib/gameEngine';
import { getCaseTemplate } from '@/data/caseTemplates';

interface DynamicGameStore {
  // Estado atual do jogo
  currentGame: DynamicGameState | null;
  isHost: boolean;
  
  // Ações do jogo
  createGame: (caseId: string, options: GameGenerationOptions) => void;
  joinGame: (gameId: string, player: Omit<DynamicPlayer, 'joinedAt'>) => void;
  leaveGame: () => void;
  startGame: () => void;
  
  // Ações de gameplay
  changePhase: (phase: GamePhase) => void;
  movePlayer: (playerId: string, locationId: string) => void;
  discoverClue: (playerId: string, clueId: string) => void;
  interrogateSuspect: (playerId: string, suspectId: string, question: string) => InterrogationResponse | null;
  makeAccusation: (playerId: string, suspectId: string) => void;
  
  // Timer
  updateTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  
  // Resultados
  calculateResults: () => void;
  endGame: () => void;
  
  // Utilitários
  getCurrentPlayer: () => DynamicPlayer | null;
  getPlayerById: (playerId: string) => DynamicPlayer | null;
  getClueById: (clueId: string) => ClueTemplate | null;
  getSuspectById: (suspectId: string) => Suspect | null;
}

const useDynamicGameStore = create<DynamicGameStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        immer((set, get) => ({
          // Estado inicial
          currentGame: null,
          isHost: false,
          
          // Criar nova partida
          createGame: (caseId: string, options: GameGenerationOptions) => {
            const caseTemplate = getCaseTemplate(caseId);
            if (!caseTemplate) {
              console.error(`Case template not found: ${caseId}`);
              return;
            }
            
            // Gerar jogo dinâmico
            const generatedGame = GameEngine.generateDynamicGame(caseTemplate, options);
            const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            set((state) => {
              const newGame = GameEngine.createGameState(
                gameId,
                caseTemplate,
                generatedGame,
                [] // Jogadores serão adicionados via joinGame
              );
              
              state.currentGame = newGame;
              state.isHost = true;
              
              console.log(`🎮 Jogo criado: ${gameId}`);
              console.log(`🕵️ Culpado: ${generatedGame.culprit.name}`);
              console.log(`🔍 Pistas selecionadas: ${generatedGame.selectedClues.length}`);
            });
          },
          
          // Entrar na partida
          joinGame: (gameId: string, playerData: Omit<DynamicPlayer, 'joinedAt'>) => {
            set((state) => {
              if (!state.currentGame) {
                console.error('No active game to join');
                return;
              }
              
              const player: DynamicPlayer = {
                ...playerData,
                joinedAt: new Date()
              };
              
              // Verificar se jogador já existe
              const existingPlayerIndex = state.currentGame.players.findIndex(
                p => p.id === player.id
              );
              
              if (existingPlayerIndex >= 0) {
                // Atualizar jogador existente
                state.currentGame.players[existingPlayerIndex] = player;
              } else {
                // Adicionar novo jogador
                state.currentGame.players.push(player);
              }
              
              // Atualizar estatísticas
              state.currentGame.statistics.totalPlayers = state.currentGame.players.length;
              
              console.log(`👤 Jogador ${player.name} entrou na partida`);
            });
          },
          
          // Sair da partida
          leaveGame: () => {
            set((state) => {
              state.currentGame = null;
              state.isHost = false;
              console.log('🚪 Saiu da partida');
            });
          },
          
          // Iniciar jogo
          startGame: () => {
            set((state) => {
              if (!state.currentGame) return;
              
              state.currentGame.phase = 'briefing';
              state.currentGame.isActive = true;
              state.currentGame.startedAt = new Date();
              
              console.log('🚀 Jogo iniciado - Fase: Briefing');
            });
          },
          
          // Mudar fase
          changePhase: (phase: GamePhase) => {
            set((state) => {
              if (!state.currentGame) return;
              
              state.currentGame.phase = phase;
              console.log(`🔄 Fase alterada para: ${phase}`);
              
              // Lógica específica por fase
              switch (phase) {
                case 'investigation':
                  // Iniciar timer se necessário
                  break;
                case 'deduction':
                  // Parar descoberta de novas pistas
                  break;
                case 'voting':
                  // Iniciar período de votação
                  break;
                case 'result':
                  // Calcular resultados
                  get().calculateResults();
                  break;
              }
            });
          },
          
          // Mover jogador
          movePlayer: (playerId: string, locationId: string) => {
            set((state) => {
              if (!state.currentGame) return;
              
              const player = state.currentGame.players.find(p => p.id === playerId);
              if (player) {
                player.currentLocation = locationId;
                console.log(`🚶 ${player.name} moveu para ${locationId}`);
              }
            });
          },
          
          // Descobrir pista
          discoverClue: (playerId: string, clueId: string) => {
            set((state) => {
              if (!state.currentGame) return;
              
              const player = state.currentGame.players.find(p => p.id === playerId);
              const clue = state.currentGame.selectedClues.find(c => c.id === clueId);
              
              if (player && clue) {
                // Adicionar pista ao jogador se não tiver
                if (!player.discoveredClues.includes(clueId)) {
                  player.discoveredClues.push(clueId);
                }
                
                // Adicionar pista ao jogo se não foi descoberta
                if (!state.currentGame.discoveredClues.includes(clueId)) {
                  state.currentGame.discoveredClues.push(clueId);
                  state.currentGame.statistics.cluesFound++;
                }
                
                console.log(`🔍 ${player.name} descobriu: ${clue.name}`);
              }
            });
          },
          
          // Interrogar suspeito
          interrogateSuspect: (playerId: string, suspectId: string, question: string) => {
            const state = get();
            if (!state.currentGame) return null;
            
            const player = state.currentGame.players.find(p => p.id === playerId);
            const suspect = getCaseTemplate(state.currentGame.caseId)?.suspects.find(s => s.id === suspectId);
            
            if (!player || !suspect) return null;
            
            // Gerar resposta usando GameEngine
            const response = GameEngine.generateInterrogationResponse(
              suspect,
              state.currentGame.culprit,
              question,
              state.currentGame.discoveredClues,
              state.currentGame.selectedClues
            );
            
            set((currentState) => {
              if (!currentState.currentGame) return;
              
              // Marcar suspeito como interrogado
              if (!currentState.currentGame.interrogatedSuspects.includes(suspectId)) {
                currentState.currentGame.interrogatedSuspects.push(suspectId);
              }
              
              // Salvar nota do jogador
              const currentPlayer = currentState.currentGame.players.find(p => p.id === playerId);
              if (currentPlayer) {
                currentPlayer.interrogationNotes[suspectId] = response.response;
                
                // Se revelar pista, descobrir automaticamente
                if (response.revealsClue) {
                  get().discoverClue(playerId, response.revealsClue);
                }
              }
              
              console.log(`💬 ${player.name} interrogou ${suspect.name}`);
            });
            
            return response;
          },
          
          // Fazer acusação
          makeAccusation: (playerId: string, suspectId: string) => {
            set((state) => {
              if (!state.currentGame) return;
              
              state.currentGame.playerAccusations[playerId] = suspectId;
              
              const player = state.currentGame.players.find(p => p.id === playerId);
              const suspect = getCaseTemplate(state.currentGame.caseId)?.suspects.find(s => s.id === suspectId);
              
              if (player && suspect) {
                player.finalAccusation = suspectId;
                console.log(`⚖️ ${player.name} acusou ${suspect.name}`);
                
                // Verificar se todos fizeram acusação
                const allAccused = state.currentGame.players.every(p => p.finalAccusation);
                if (allAccused) {
                  get().changePhase('result');
                }
              }
            });
          },
          
          // Atualizar timer
          updateTimer: () => {
            set((state) => {
              if (!state.currentGame || !state.currentGame.isActive) return;
              
              if (state.currentGame.timeRemaining > 0) {
                state.currentGame.timeRemaining--;
              } else {
                // Tempo esgotado - forçar fase de resultado
                get().changePhase('result');
              }
            });
          },
          
          // Pausar timer
          pauseTimer: () => {
            set((state) => {
              if (!state.currentGame) return;
              state.currentGame.isActive = false;
            });
          },
          
          // Retomar timer
          resumeTimer: () => {
            set((state) => {
              if (!state.currentGame) return;
              state.currentGame.isActive = true;
            });
          },
          
          // Calcular resultados
          calculateResults: () => {
            set((state) => {
              if (!state.currentGame) return;
              
              let correctAccusations = 0;
              let wrongAccusations = 0;
              
              // Calcular pontuações e acertos
              state.currentGame.players.forEach(player => {
                const isCorrect = GameEngine.validateAccusation(
                  player.finalAccusation || '',
                  state.currentGame!.culprit
                );
                
                if (isCorrect) {
                  correctAccusations++;
                } else {
                  wrongAccusations++;
                }
                
                // Calcular pontuação
                const timeUsed = state.currentGame!.timeLimit - state.currentGame!.timeRemaining;
                player.score = GameEngine.calculatePlayerScore(
                  isCorrect,
                  player.discoveredClues.length,
                  timeUsed,
                  state.currentGame!.timeLimit
                );
              });
              
              // Atualizar estatísticas
              state.currentGame.statistics.correctAccusations = correctAccusations;
              state.currentGame.statistics.wrongAccusations = wrongAccusations;
              state.currentGame.statistics.timeUsed = 
                state.currentGame.timeLimit - state.currentGame.timeRemaining;
              
              console.log(`📊 Resultados calculados: ${correctAccusations} acertos, ${wrongAccusations} erros`);
            });
          },
          
          // Finalizar jogo
          endGame: () => {
            set((state) => {
              if (!state.currentGame) return;
              
              state.currentGame.endedAt = new Date();
              state.currentGame.isActive = false;
              state.currentGame.phase = 'result';
              
              console.log('🏁 Jogo finalizado');
            });
          },
          
          // Utilitários
          getCurrentPlayer: () => {
            const state = get();
            if (!state.currentGame) return null;
            
            // Retorna o primeiro jogador por agora
            // Em implementação real, seria baseado no userId atual
            return state.currentGame.players[0] || null;
          },
          
          getPlayerById: (playerId: string) => {
            const state = get();
            if (!state.currentGame) return null;
            
            return state.currentGame.players.find(p => p.id === playerId) || null;
          },
          
          getClueById: (clueId: string) => {
            const state = get();
            if (!state.currentGame) return null;
            
            return state.currentGame.selectedClues.find(c => c.id === clueId) || null;
          },
          
          getSuspectById: (suspectId: string) => {
            const state = get();
            if (!state.currentGame) return null;
            
            const caseTemplate = getCaseTemplate(state.currentGame.caseId);
            return caseTemplate?.suspects.find(s => s.id === suspectId) || null;
          }
          
        })),
        {
          name: 'criminal-minds-dynamic-game-store',
          partialize: (state) => ({
            currentGame: state.currentGame,
            isHost: state.isHost
          })
        }
      )
    ),
    { name: 'DynamicGameStore' }
  )
);

export default useDynamicGameStore; 