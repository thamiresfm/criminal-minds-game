import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { 
  Game, 
  GameId, 
  PlayerId, 
  ClueId, 
  SuspectId, 
  LocationId,
  GameStatus,
  Case,
  Clue,
  Suspect,
  Location,
  Theory,
  Accusation,
  UIState,
  ChatMessage,
  Notification,
} from '@/types/game';

// ========================================
// STORE STATE INTERFACE
// ========================================

interface GameStore {
  // Game State
  currentGame: Game | null;
  currentCase: Case | null;
  isLoading: boolean;
  error: string | null;
  
  // Player State
  currentPlayerId: PlayerId | null;
  
  // Investigation State
  collectedClues: Clue[];
  exploredLocations: LocationId[];
  currentTheories: Theory[];
  
  // UI State
  ui: UIState;
  
  // Chat State
  messages: ChatMessage[];
  
  // ========================================
  // ACTIONS
  // ========================================
  
  // Game Actions
  setCurrentGame: (game: Game | null) => void;
  setCurrentCase: (gameCase: Case | null) => void;
  updateGameStatus: (status: GameStatus) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Player Actions
  setCurrentPlayer: (playerId: PlayerId) => void;
  joinGame: (gameId: GameId, player: any) => Promise<void>;
  leaveGame: () => void;
  
  // Investigation Actions
  collectClue: (clueId: ClueId) => Promise<void>;
  exploreLocation: (locationId: LocationId) => void;
  shareTheory: (theory: Omit<Theory, 'id' | 'createdAt'>) => Promise<void>;
  voteOnTheory: (theoryId: string, vote: 'agree' | 'disagree' | 'neutral') => void;
  makeAccusation: (accusation: Omit<Accusation, 'timestamp'>) => Promise<void>;
  
  // UI Actions
  setCurrentTab: (tab: UIState['currentTab']) => void;
  selectLocation: (locationId: LocationId | undefined) => void;
  selectClue: (clueId: ClueId | undefined) => void;
  selectSuspect: (suspectId: SuspectId | undefined) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  
  // Chat Actions
  sendMessage: (content: string, type?: ChatMessage['type']) => Promise<void>;
  addMessage: (message: ChatMessage) => void;
  
  // Utility Actions
  reset: () => void;
  getClueById: (clueId: ClueId) => Clue | undefined;
  getSuspectById: (suspectId: SuspectId) => Suspect | undefined;
  getLocationById: (locationId: LocationId) => Location | undefined;
  canPlayerCollectClue: (clueId: ClueId) => boolean;
  getGameProgress: () => number;
}

// ========================================
// INITIAL STATE
// ========================================

const initialUIState: UIState = {
  currentTab: 'map',
  selectedLocation: undefined,
  selectedClue: undefined,
  selectedSuspect: undefined,
  activeModal: undefined,
  notifications: [],
  isLoading: false,
};

// ========================================
// STORE IMPLEMENTATION
// ========================================

export const useGameStore = create<GameStore>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // Initial State
        currentGame: null,
        currentCase: null,
        isLoading: false,
        error: null,
        currentPlayerId: null,
        collectedClues: [],
        exploredLocations: [],
        currentTheories: [],
        ui: initialUIState,
        messages: [],

        // ========================================
        // GAME ACTIONS
        // ========================================

        setCurrentGame: (game) => set((state) => {
          state.currentGame = game;
        }),

        setCurrentCase: (gameCase) => set((state) => {
          state.currentCase = gameCase;
        }),

        updateGameStatus: (status) => set((state) => {
          if (state.currentGame) {
            state.currentGame.status = status;
            state.currentGame.progress.phase = status;
          }
        }),

        setLoading: (loading) => set((state) => {
          state.isLoading = loading;
          state.ui.isLoading = loading;
        }),

        setError: (error) => set((state) => {
          state.error = error;
          if (error) {
            get().addNotification({
              type: 'error',
              title: 'Erro',
              message: error,
              duration: 5000,
              createdAt: new Date(),
            });
          }
        }),

        // ========================================
        // PLAYER ACTIONS
        // ========================================

        setCurrentPlayer: (playerId) => set((state) => {
          state.currentPlayerId = playerId;
        }),

        joinGame: async (gameId, player) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // Aqui seria a chamada para a API
            // const response = await gameService.joinGame(gameId, player);
            
            // Simulação por enquanto
            set((state) => {
              if (state.currentGame) {
                state.currentGame.players.push(player);
              }
              state.isLoading = false;
            });

            get().addNotification({
              type: 'success',
              title: 'Sucesso!',
              message: 'Você entrou na partida',
              duration: 3000,
              createdAt: new Date(),
            });

          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : 'Erro desconhecido';
              state.isLoading = false;
            });
          }
        },

        leaveGame: () => set((state) => {
          state.currentGame = null;
          state.currentCase = null;
          state.collectedClues = [];
          state.exploredLocations = [];
          state.currentTheories = [];
          state.messages = [];
          state.ui = initialUIState;
        }),

        // ========================================
        // INVESTIGATION ACTIONS
        // ========================================

        collectClue: async (clueId) => {
          const { currentCase, currentPlayerId, canPlayerCollectClue } = get();
          
          if (!currentCase || !currentPlayerId || !canPlayerCollectClue(clueId)) {
            return;
          }

          const clue = currentCase.clues.find(c => c.id === clueId);
          if (!clue) return;

          set((state) => {
            // Adicionar pista às coletadas
            if (!state.collectedClues.find(c => c.id === clueId)) {
              state.collectedClues.push(clue);
            }

            // Marcar localização como explorada
            if (!state.exploredLocations.includes(clue.locationId)) {
              state.exploredLocations.push(clue.locationId);
            }

            // Atualizar progresso do jogo
            if (state.currentGame && state.currentPlayerId) {
              if (!state.currentGame.progress.collectedClues[state.currentPlayerId]) {
                state.currentGame.progress.collectedClues[state.currentPlayerId] = [];
              }
              state.currentGame.progress.collectedClues[state.currentPlayerId].push(clueId);
            }
          });

          // Notificação de sucesso
          get().addNotification({
            type: 'success',
            title: 'Pista Coletada!',
            message: `Você coletou: ${clue.name}`,
            duration: 3000,
            createdAt: new Date(),
          });

          // Vibração tátil (se disponível)
          if ('vibrate' in navigator) {
            navigator.vibrate([10, 50, 10]);
          }
        },

        exploreLocation: (locationId) => set((state) => {
          if (!state.exploredLocations.includes(locationId)) {
            state.exploredLocations.push(locationId);
          }
        }),

        shareTheory: async (theory) => {
          const theoryWithId: Theory = {
            ...theory,
            id: `theory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            votes: {},
          };

          set((state) => {
            state.currentTheories.push(theoryWithId);
          });

          get().addNotification({
            type: 'info',
            title: 'Teoria Compartilhada',
            message: 'Sua teoria foi compartilhada com a equipe',
            duration: 3000,
            createdAt: new Date(),
          });
        },

        voteOnTheory: (theoryId, vote) => set((state) => {
          const theory = state.currentTheories.find(t => t.id === theoryId);
          if (theory && state.currentPlayerId) {
            theory.votes[state.currentPlayerId] = vote;
          }
        }),

        makeAccusation: async (accusation) => {
          const accusationWithTimestamp: Accusation = {
            ...accusation,
            timestamp: new Date(),
          };

          set((state) => {
            if (state.currentGame) {
              state.currentGame.progress.currentAccusation = accusationWithTimestamp;
              state.currentGame.status = GameStatus.ACCUSATION;
            }
          });

          get().addNotification({
            type: 'warning',
            title: 'Acusação Feita!',
            message: 'Aguardando resultado...',
            duration: 5000,
            createdAt: new Date(),
          });
        },

        // ========================================
        // UI ACTIONS
        // ========================================

        setCurrentTab: (tab) => set((state) => {
          state.ui.currentTab = tab;
        }),

        selectLocation: (locationId) => set((state) => {
          state.ui.selectedLocation = locationId;
        }),

        selectClue: (clueId) => set((state) => {
          state.ui.selectedClue = clueId;
        }),

        selectSuspect: (suspectId) => set((state) => {
          state.ui.selectedSuspect = suspectId;
        }),

        openModal: (modalId) => set((state) => {
          state.ui.activeModal = modalId;
        }),

        closeModal: () => set((state) => {
          state.ui.activeModal = undefined;
        }),

        addNotification: (notification) => set((state) => {
          const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          state.ui.notifications.push({ ...notification, id });
          
          // Remove automaticamente após duration
          if (notification.duration) {
            setTimeout(() => {
              get().removeNotification(id);
            }, notification.duration);
          }
        }),

        removeNotification: (id) => set((state) => {
          state.ui.notifications = state.ui.notifications.filter(n => n.id !== id);
        }),

        // ========================================
        // CHAT ACTIONS
        // ========================================

        sendMessage: async (content, type = 'text') => {
          const { currentPlayerId, currentGame } = get();
          if (!currentPlayerId || !currentGame) return;

          const message: ChatMessage = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            playerId: currentPlayerId,
            content,
            type,
            timestamp: new Date(),
          };

          set((state) => {
            state.messages.push(message);
          });

          // Aqui seria enviado via WebSocket
          // websocketService.emit('chat:message', { gameId: currentGame.id, message });
        },

        addMessage: (message) => set((state) => {
          state.messages.push(message);
        }),

        // ========================================
        // UTILITY ACTIONS
        // ========================================

        reset: () => set((state) => {
          state.currentGame = null;
          state.currentCase = null;
          state.isLoading = false;
          state.error = null;
          state.currentPlayerId = null;
          state.collectedClues = [];
          state.exploredLocations = [];
          state.currentTheories = [];
          state.ui = initialUIState;
          state.messages = [];
        }),

        getClueById: (clueId) => {
          const { currentCase } = get();
          return currentCase?.clues.find(c => c.id === clueId);
        },

        getSuspectById: (suspectId) => {
          const { currentCase } = get();
          return currentCase?.suspects.find(s => s.id === suspectId);
        },

        getLocationById: (locationId) => {
          const { currentCase } = get();
          return currentCase?.locations.find(l => l.id === locationId);
        },

        canPlayerCollectClue: (clueId) => {
          const { currentCase, currentPlayerId, collectedClues } = get();
          
          if (!currentCase || !currentPlayerId) return false;
          
          const clue = currentCase.clues.find(c => c.id === clueId);
          if (!clue) return false;
          
          // Verificar se já foi coletada
          if (collectedClues.find(c => c.id === clueId)) return false;
          
          // Verificar restrições de acesso
          const location = currentCase.locations.find(l => l.id === clue.locationId);
          if (location?.accessibleTo === 'specific' && location.restrictedBy) {
            // Lógica de restrição (implementar conforme necessário)
            return true;
          }
          
          return true;
        },

        getGameProgress: () => {
          const { currentCase, collectedClues } = get();
          if (!currentCase) return 0;
          
          const totalClues = currentCase.clues.length;
          const collectedCount = collectedClues.length;
          
          return Math.round((collectedCount / totalClues) * 100);
        },
      }))
    ),
    {
      name: 'criminal-minds-game-store',
    }
  )
);

// ========================================
// STORE SELECTORS
// ========================================

// Seletores otimizados para evitar re-renders desnecessários
export const useCurrentGame = () => useGameStore(state => state.currentGame);
export const useCurrentCase = () => useGameStore(state => state.currentCase);
export const useGameLoading = () => useGameStore(state => state.isLoading);
export const useGameError = () => useGameStore(state => state.error);
export const useCollectedClues = () => useGameStore(state => state.collectedClues);
export const useCurrentTab = () => useGameStore(state => state.ui.currentTab);
export const useNotifications = () => useGameStore(state => state.ui.notifications);
export const useChatMessages = () => useGameStore(state => state.messages);
export const useCurrentTheories = () => useGameStore(state => state.currentTheories);
export const useGameProgress = () => useGameStore(state => state.getGameProgress());

// Seletor customizado para dados específicos
export const useGameData = () => useGameStore(state => ({
  game: state.currentGame,
  case: state.currentCase,
  loading: state.isLoading,
  error: state.error,
  progress: state.getGameProgress(),
})); 