// CRIMINAL MINDS GAME - DYNAMIC GAME STORE
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { 
  DynamicGameState, 
  DynamicPlayer, 
  GamePhase, 
  GameGenerationOptions
} from '@/types/dynamicGame';
import { GameEngine } from '@/lib/gameEngine';
import { getCaseTemplate } from '@/data/caseTemplates';

interface DynamicGameStore {
  currentGame: DynamicGameState | null;
  isHost: boolean;
  
  createGame: (caseId: string, options: GameGenerationOptions) => void;
  joinGame: (gameId: string, player: Omit<DynamicPlayer, 'joinedAt'>) => void;
  startGame: () => void;
  changePhase: (phase: GamePhase) => void;
  discoverClue: (playerId: string, clueId: string) => void;
  makeAccusation: (playerId: string, suspectId: string) => void;
  endGame: () => void;
}

const useDynamicGameStore = create<DynamicGameStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        currentGame: null,
        isHost: false,
        
        createGame: (caseId: string, options: GameGenerationOptions) => {
          const caseTemplate = getCaseTemplate(caseId);
          if (!caseTemplate) return;
          
          const generatedGame = GameEngine.generateDynamicGame(caseTemplate, options);
          const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          set((state) => {
            const newGame = GameEngine.createGameState(
              gameId,
              caseTemplate,
              generatedGame,
              []
            );
            
            state.currentGame = newGame;
            state.isHost = true;
          });
        },
        
        joinGame: (gameId: string, playerData: Omit<DynamicPlayer, 'joinedAt'>) => {
          set((state) => {
            if (!state.currentGame) return;
            
            const player: DynamicPlayer = {
              ...playerData,
              joinedAt: new Date()
            };
            
            state.currentGame.players.push(player);
          });
        },
        
        startGame: () => {
          set((state) => {
            if (!state.currentGame) return;
            state.currentGame.phase = 'briefing';
            state.currentGame.isActive = true;
          });
        },
        
        changePhase: (phase: GamePhase) => {
          set((state) => {
            if (!state.currentGame) return;
            state.currentGame.phase = phase;
          });
        },
        
        discoverClue: (playerId: string, clueId: string) => {
          set((state) => {
            if (!state.currentGame) return;
            
            const player = state.currentGame.players.find(p => p.id === playerId);
            if (player && !player.discoveredClues.includes(clueId)) {
              player.discoveredClues.push(clueId);
            }
            
            if (!state.currentGame.discoveredClues.includes(clueId)) {
              state.currentGame.discoveredClues.push(clueId);
            }
          });
        },
        
        makeAccusation: (playerId: string, suspectId: string) => {
          set((state) => {
            if (!state.currentGame) return;
            
            state.currentGame.playerAccusations[playerId] = suspectId;
            const player = state.currentGame.players.find(p => p.id === playerId);
            if (player) {
              player.finalAccusation = suspectId;
            }
          });
        },
        
        endGame: () => {
          set((state) => {
            if (!state.currentGame) return;
            state.currentGame.phase = 'result';
            state.currentGame.isActive = false;
          });
        }
      })),
      {
        name: 'criminal-minds-dynamic-game-store'
      }
    ),
    { name: 'DynamicGameStore' }
  )
);

export default useDynamicGameStore;
