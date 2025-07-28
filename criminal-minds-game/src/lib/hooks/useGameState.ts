import { useReducer, useCallback, useMemo } from 'react';

// Types
interface Clue {
  id: string;
  name: string;
  description: string;
  location: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  collected: boolean;
  image?: string;
  details?: string;
  discoveredAt?: Date;
  connectedClues?: string[];
  analyzed?: boolean;
  reviewed?: boolean;
  labResultsViewed?: boolean;
  forensicData?: {
    fingerprints?: string;
    dna?: string;
    chemical?: string;
    timeline?: string;
  };
  laboratoryResults?: {
    status: 'pending' | 'in_progress' | 'completed';
    completedAt?: Date;
    technician?: string;
    tests: {
      fingerprint?: {
        result: string;
        matches: string[];
        confidence: number;
        details: string;
      };
      dna?: {
        result: string;
        profile: string;
        contamination: boolean;
        details: string;
      };
      toxicology?: {
        substances: string[];
        concentration: string;
        timeOfDeath?: string;
        details: string;
      };
      ballistics?: {
        weapon: string;
        angle: string;
        distance: string;
        details: string;
      };
      fiber?: {
        material: string;
        color: string;
        origin: string;
        details: string;
      };
    };
  };
}

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  explored: boolean;
  hasClues: boolean;
  hasImportantClues: boolean;
}

interface Player {
  id: string;
  name: string;
  avatar: string;
  level: number;
  online: boolean;
}

interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'system' | 'evidence';
}

// Game State Interface
interface GameState {
  // Game Core
  currentTab: 'map' | 'clues' | 'suspects' | 'notes';
  collectedClues: Clue[];
  locations: Location[];
  timeRemaining: number;
  players: Player[];

  // UI States
  showExitModal: boolean;
  showDetailsModal: boolean;
  showAnalysisModal: boolean;
  showLabResultsModal: boolean;
  showAllLabResultsModal: boolean;
  showAccusationModal: boolean;
  showGameOverModal: boolean;
  showChat: boolean;
  showAllEvidence: boolean;

  // Selected Items
  selectedClue: Clue | null;
  selectedLabResult: Clue | null;
  selectedSuspect: string | null;

  // Filters and Search
  clueFilter: 'all' | 'critical' | 'high' | 'medium' | 'low' | 'analyzed' | 'unanalyzed';
  searchTerm: string;

  // Game Control
  accusationMade: boolean;
  gameOver: boolean;
  accusationResult: 'correct' | 'incorrect' | null;
  autoRestartCountdown: number;

  // Form States  
  accusationConfidence: number;
  accusationReasoning: string;
  newMessage: string;
  hasUnreadMessages: boolean;

  // Loading States
  isAnalyzing: boolean;
  isMarking: boolean;

  // Chat
  chatMessages: ChatMessage[];
}

// Action Types
type GameAction =
  | { type: 'SET_TAB'; payload: GameState['currentTab'] }
  | { type: 'SET_CLUES'; payload: Clue[] }
  | { type: 'UPDATE_CLUE'; payload: { id: string; updates: Partial<Clue> } }
  | { type: 'SET_LOCATIONS'; payload: Location[] }
  | { type: 'UPDATE_LOCATION'; payload: { id: string; updates: Partial<Location> } }
  | { type: 'SET_TIME_REMAINING'; payload: number }
  | { type: 'SET_PLAYERS'; payload: Player[] }
  | { type: 'TOGGLE_MODAL'; payload: { modal: keyof Pick<GameState, 'showExitModal' | 'showDetailsModal' | 'showAnalysisModal' | 'showLabResultsModal' | 'showAllLabResultsModal' | 'showAccusationModal' | 'showGameOverModal' | 'showChat' | 'showAllEvidence'>; show: boolean } }
  | { type: 'SET_SELECTED_CLUE'; payload: Clue | null }
  | { type: 'SET_SELECTED_LAB_RESULT'; payload: Clue | null }
  | { type: 'SET_SELECTED_SUSPECT'; payload: string | null }
  | { type: 'SET_FILTER'; payload: GameState['clueFilter'] }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_ACCUSATION_MADE'; payload: boolean }
  | { type: 'SET_GAME_OVER'; payload: boolean }
  | { type: 'SET_ACCUSATION_RESULT'; payload: GameState['accusationResult'] }
  | { type: 'SET_AUTO_RESTART_COUNTDOWN'; payload: number }
  | { type: 'SET_ACCUSATION_CONFIDENCE'; payload: number }
  | { type: 'SET_ACCUSATION_REASONING'; payload: string }
  | { type: 'SET_NEW_MESSAGE'; payload: string }
  | { type: 'SET_HAS_UNREAD_MESSAGES'; payload: boolean }
  | { type: 'SET_LOADING'; payload: { field: 'isAnalyzing' | 'isMarking'; loading: boolean } }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_CHAT_MESSAGES'; payload: ChatMessage[] }
  | { type: 'RESET_GAME' };

// Initial State
const initialState: GameState = {
  // Game Core
  currentTab: 'map',
  collectedClues: [],
  locations: [],
  timeRemaining: 1800,
  players: [],

  // UI States
  showExitModal: false,
  showDetailsModal: false,
  showAnalysisModal: false,
  showLabResultsModal: false,
  showAllLabResultsModal: false,
  showAccusationModal: false,
  showGameOverModal: false,
  showChat: false,
  showAllEvidence: false,

  // Selected Items
  selectedClue: null,
  selectedLabResult: null,
  selectedSuspect: null,

  // Filters and Search
  clueFilter: 'all',
  searchTerm: '',

  // Game Control
  accusationMade: false,
  gameOver: false,
  accusationResult: null,
  autoRestartCountdown: 0,

  // Form States  
  accusationConfidence: 50,
  accusationReasoning: '',
  newMessage: '',
  hasUnreadMessages: true,

  // Loading States
  isAnalyzing: false,
  isMarking: false,

  // Chat
  chatMessages: []
};

// Reducer Function
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, currentTab: action.payload };
    
    case 'SET_CLUES':
      return { ...state, collectedClues: action.payload };
    
    case 'UPDATE_CLUE':
      return {
        ...state,
        collectedClues: state.collectedClues.map(clue =>
          clue.id === action.payload.id
            ? { ...clue, ...action.payload.updates }
            : clue
        )
      };
    
    case 'SET_LOCATIONS':
      return { ...state, locations: action.payload };
    
    case 'UPDATE_LOCATION':
      return {
        ...state,
        locations: state.locations.map(location =>
          location.id === action.payload.id
            ? { ...location, ...action.payload.updates }
            : location
        )
      };
    
    case 'SET_TIME_REMAINING':
      return { ...state, timeRemaining: action.payload };
    
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    
    case 'TOGGLE_MODAL':
      return { ...state, [action.payload.modal]: action.payload.show };
    
    case 'SET_SELECTED_CLUE':
      return { ...state, selectedClue: action.payload };
    
    case 'SET_SELECTED_LAB_RESULT':
      return { ...state, selectedLabResult: action.payload };
    
    case 'SET_SELECTED_SUSPECT':
      return { ...state, selectedSuspect: action.payload };
    
    case 'SET_FILTER':
      return { ...state, clueFilter: action.payload };
    
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    
    case 'SET_ACCUSATION_MADE':
      return { ...state, accusationMade: action.payload };
    
    case 'SET_GAME_OVER':
      return { ...state, gameOver: action.payload };
    
    case 'SET_ACCUSATION_RESULT':
      return { ...state, accusationResult: action.payload };
    
    case 'SET_AUTO_RESTART_COUNTDOWN':
      return { ...state, autoRestartCountdown: action.payload };
    
    case 'SET_ACCUSATION_CONFIDENCE':
      return { ...state, accusationConfidence: action.payload };
    
    case 'SET_ACCUSATION_REASONING':
      return { ...state, accusationReasoning: action.payload };
    
    case 'SET_NEW_MESSAGE':
      return { ...state, newMessage: action.payload };
    
    case 'SET_HAS_UNREAD_MESSAGES':
      return { ...state, hasUnreadMessages: action.payload };
    
    case 'SET_LOADING':
      return { ...state, [action.payload.field]: action.payload.loading };
    
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload]
      };
    
    case 'SET_CHAT_MESSAGES':
      return { ...state, chatMessages: action.payload };
    
    case 'RESET_GAME':
      return {
        ...initialState,
        // Manter algumas configurações
        players: state.players,
        chatMessages: []
      };
    
    default:
      return state;
  }
}

// Custom Hook
export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Memoized Actions
  const actions = useMemo(() => ({
    setTab: (tab: GameState['currentTab']) => 
      dispatch({ type: 'SET_TAB', payload: tab }),
    
    setClues: (clues: Clue[]) => 
      dispatch({ type: 'SET_CLUES', payload: clues }),
    
    updateClue: (id: string, updates: Partial<Clue>) => 
      dispatch({ type: 'UPDATE_CLUE', payload: { id, updates } }),
    
    setLocations: (locations: Location[]) => 
      dispatch({ type: 'SET_LOCATIONS', payload: locations }),
    
    updateLocation: (id: string, updates: Partial<Location>) => 
      dispatch({ type: 'UPDATE_LOCATION', payload: { id, updates } }),
    
    setTimeRemaining: (time: number) => 
      dispatch({ type: 'SET_TIME_REMAINING', payload: time }),
    
    setPlayers: (players: Player[]) => 
      dispatch({ type: 'SET_PLAYERS', payload: players }),
    
    toggleModal: (modal: keyof Pick<GameState, 'showExitModal' | 'showDetailsModal' | 'showAnalysisModal' | 'showLabResultsModal' | 'showAllLabResultsModal' | 'showAccusationModal' | 'showGameOverModal' | 'showChat' | 'showAllEvidence'>, show: boolean) => 
      dispatch({ type: 'TOGGLE_MODAL', payload: { modal, show } }),
    
    setSelectedClue: (clue: Clue | null) => 
      dispatch({ type: 'SET_SELECTED_CLUE', payload: clue }),
    
    setSelectedLabResult: (clue: Clue | null) => 
      dispatch({ type: 'SET_SELECTED_LAB_RESULT', payload: clue }),
    
    setSelectedSuspect: (suspect: string | null) => 
      dispatch({ type: 'SET_SELECTED_SUSPECT', payload: suspect }),
    
    setFilter: (filter: GameState['clueFilter']) => 
      dispatch({ type: 'SET_FILTER', payload: filter }),
    
    setSearchTerm: (term: string) => 
      dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    
    setAccusationMade: (made: boolean) => 
      dispatch({ type: 'SET_ACCUSATION_MADE', payload: made }),
    
    setGameOver: (over: boolean) => 
      dispatch({ type: 'SET_GAME_OVER', payload: over }),
    
    setAccusationResult: (result: GameState['accusationResult']) => 
      dispatch({ type: 'SET_ACCUSATION_RESULT', payload: result }),
    
    setAutoRestartCountdown: (countdown: number) => 
      dispatch({ type: 'SET_AUTO_RESTART_COUNTDOWN', payload: countdown }),
    
    setAccusationConfidence: (confidence: number) => 
      dispatch({ type: 'SET_ACCUSATION_CONFIDENCE', payload: confidence }),
    
    setAccusationReasoning: (reasoning: string) => 
      dispatch({ type: 'SET_ACCUSATION_REASONING', payload: reasoning }),
    
    setNewMessage: (message: string) => 
      dispatch({ type: 'SET_NEW_MESSAGE', payload: message }),
    
    setHasUnreadMessages: (unread: boolean) => 
      dispatch({ type: 'SET_HAS_UNREAD_MESSAGES', payload: unread }),
    
    setLoading: (field: 'isAnalyzing' | 'isMarking', loading: boolean) => 
      dispatch({ type: 'SET_LOADING', payload: { field, loading } }),
    
    addChatMessage: (message: ChatMessage) => 
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message }),
    
    setChatMessages: (messages: ChatMessage[]) => 
      dispatch({ type: 'SET_CHAT_MESSAGES', payload: messages }),
    
    resetGame: () => 
      dispatch({ type: 'RESET_GAME' })
  }), []);

  // Memoized Selectors
  const selectors = useMemo(() => ({
    getFilteredClues: (clues: Clue[], filter: string, searchTerm: string) => {
      let filtered = clues;
      
      // Apply status filter
      if (filter === 'critical') filtered = filtered.filter(c => c.importance === 'critical');
      else if (filter === 'high') filtered = filtered.filter(c => c.importance === 'high');
      else if (filter === 'medium') filtered = filtered.filter(c => c.importance === 'medium');
      else if (filter === 'low') filtered = filtered.filter(c => c.importance === 'low');
      else if (filter === 'analyzed') filtered = filtered.filter(c => c.analyzed || c.reviewed);
      else if (filter === 'unanalyzed') filtered = filtered.filter(c => !c.analyzed && !c.reviewed);
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower) ||
          c.location.toLowerCase().includes(searchLower)
        );
      }
      
      return filtered;
    },
    
    getLocationProgress: (locations: Location[]) => {
      const explored = locations.filter(loc => loc.explored).length;
      return Math.round((explored / locations.length) * 100);
    },
    
    getEvidenceProgress: (clues: Clue[]) => {
      const analyzed = clues.filter(c => c.analyzed || c.reviewed).length;
      return Math.round((analyzed / clues.length) * 100);
    }
  }), []);

  return {
    state,
    actions,
    selectors
  };
} 