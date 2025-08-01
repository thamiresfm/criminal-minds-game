// ========================================
// GAME DOMAIN TYPES
// ========================================

export type GameId = string;
export type PlayerId = string;
export type CaseId = string;
export type ClueId = string;
export type SuspectId = string;
export type LocationId = string;

// ========================================
// GAME STATUS & PHASES
// ========================================

export enum GameStatus {
  WAITING = 'waiting',
  BRIEFING = 'briefing',
  INVESTIGATING = 'investigating',
  ACCUSATION = 'accusation',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

export enum GameDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

// ========================================
// PLAYER TYPES
// ========================================

export interface Player {
  id: PlayerId;
  name: string;
  avatar?: string;
  isHost: boolean;
  isReady: boolean;
  status: 'online' | 'offline' | 'away';
  joinedAt: Date;
  statistics: PlayerStatistics;
}

export interface PlayerStatistics {
  gamesPlayed: number;
  gamesWon: number;
  averageTime: number;
  accuracy: number;
  level: number;
  experience: number;
  badges: string[];
}

// ========================================
// GAME TYPES
// ========================================

export interface Game {
  id: GameId;
  caseId: CaseId;
  hostId: PlayerId;
  players: Player[];
  status: GameStatus;
  difficulty: GameDifficulty;
  settings: GameSettings;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
  progress: GameProgress;
  result?: GameResult;
}

export interface GameSettings {
  maxPlayers: number;
  timePerAction: number; // em segundos
  isPublic: boolean;
  allowChat: boolean;
  allowVoiceChat: boolean;
  hints: boolean;
}

export interface GameProgress {
  phase: GameStatus;
  timeRemaining: number;
  collectedClues: {
    [playerId: string]: ClueId[];
  };
  sharedTheories: Theory[];
  consensusLevel: number; // 0-100%
  currentAccusation?: Accusation;
}

export interface GameResult {
  success: boolean;
  correctSuspect: SuspectId;
  accusedSuspect: SuspectId;
  timeUsed: number;
  teamPerformance: {
    cooperation: number;
    efficiency: number;
    accuracy: number;
  };
  playerRewards: {
    [playerId: string]: PlayerReward;
  };
}

export interface PlayerReward {
  experience: number;
  gems: number;
  badges: string[];
  levelUp?: boolean;
}

// ========================================
// CASE TYPES
// ========================================

export interface Case {
  id: CaseId;
  name: string;
  description: string;
  briefing: string;
  difficulty: GameDifficulty;
  estimatedDuration: number; // em minutos
  suspects: Suspect[];
  clues: Clue[];
  locations: Location[];
  solution: CaseSolution;
  twists: Twist[];
  image: string;
  tags: string[];
}

export interface Suspect {
  id: SuspectId;
  name: string;
  age: number;
  occupation: string;
  description: string;
  motive: string;
  alibi: string;
  secret: string;
  avatar: string;
  personality: string[];
  connections: SuspectId[];
  isGuilty: boolean;
}

export interface Clue {
  id: ClueId;
  name: string;
  description: string;
  analysis: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  type: ClueType;
  locationId: LocationId;
  connectedClues: ClueId[];
  pointsToSuspects: SuspectId[];
  isDecisive: boolean;
  isFake: boolean;
  image?: string;
  discoveredBy?: PlayerId[];
}

export enum ClueType {
  PHYSICAL = 'physical',
  TESTIMONY = 'testimony',
  DOCUMENT = 'document',
  DIGITAL = 'digital',
  FORENSIC = 'forensic',
  PSYCHOLOGICAL = 'psychological',
}

export interface Location {
  id: LocationId;
  name: string;
  description: string;
  image: string;
  clues: ClueId[];
  accessibleTo: 'all' | 'specific';
  restrictedBy?: string[];
  coordinates: {
    x: number;
    y: number;
  };
  isExplored: boolean;
}

export interface CaseSolution {
  guiltyId: SuspectId;
  motive: string;
  method: string;
  timeline: TimelineEvent[];
  keyEvidence: ClueId[];
  alternativeEndings: AlternativeEnding[];
}

export interface TimelineEvent {
  time: string;
  description: string;
  location: LocationId;
  participants: SuspectId[];
}

export interface AlternativeEnding {
  condition: string;
  outcome: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Twist {
  id: string;
  trigger: TwistTrigger;
  description: string;
  impact: string;
  newClues?: ClueId[];
  revealedSecrets?: {
    suspectId: SuspectId;
    secret: string;
  }[];
}

export interface TwistTrigger {
  type: 'time' | 'clues_collected' | 'accusation_attempt';
  condition: any;
}

// ========================================
// INVESTIGATION TYPES
// ========================================

export interface Theory {
  id: string;
  playerId: PlayerId;
  suspectId: SuspectId;
  reasoning: string;
  supportingClues: ClueId[];
  confidence: number; // 0-100
  votes: {
    [playerId: string]: 'agree' | 'disagree' | 'neutral';
  };
  createdAt: Date;
}

export interface Accusation {
  suspectId: SuspectId;
  motive: string;
  evidence: ClueId[];
  reasoning: string;
  confidence: number;
  votingResults: {
    [playerId: string]: boolean;
  };
  consensusLevel: number;
  timestamp: Date;
}

export interface DeductionConnection {
  from: ClueId | SuspectId;
  to: ClueId | SuspectId;
  type: 'supports' | 'contradicts' | 'relates';
  strength: number; // 0-100
  reasoning?: string;
}

// ========================================
// COMMUNICATION TYPES
// ========================================

export interface ChatMessage {
  id: string;
  playerId: PlayerId;
  content: string;
  type: 'text' | 'theory' | 'clue_share' | 'system';
  timestamp: Date;
  attachments?: {
    clueId?: ClueId;
    theoryId?: string;
    suspectId?: SuspectId;
  };
}

export interface VoiceSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  pushToTalk: boolean;
}

// ========================================
// UI STATE TYPES
// ========================================

export interface UIState {
  currentTab: 'map' | 'board' | 'chat' | 'suspects';
  selectedLocation?: LocationId;
  selectedClue?: ClueId;
  selectedSuspect?: SuspectId;
  activeModal?: string;
  notifications: Notification[];
  isLoading: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number; // em milissegundos, undefined = não remove automaticamente
  createdAt: Date;
  actions?: NotificationAction[];
  icon?: string;
  playSound?: boolean;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

// ========================================
// API RESPONSE TYPES
// ========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface GameListResponse {
  games: Game[];
  total: number;
  page: number;
  limit: number;
}

export interface CaseListResponse {
  cases: Case[];
  total: number;
  featured: CaseId[];
}

// ========================================
// WEBSOCKET EVENT TYPES
// ========================================

export interface WebSocketEvents {
  // Game events
  'game:join': { gameId: GameId; player: Player };
  'game:leave': { gameId: GameId; playerId: PlayerId };
  'game:start': { gameId: GameId };
  'game:phase_change': { gameId: GameId; phase: GameStatus };
  
  // Investigation events
  'clue:collected': { gameId: GameId; playerId: PlayerId; clue: Clue };
  'theory:shared': { gameId: GameId; theory: Theory };
  'accusation:made': { gameId: GameId; accusation: Accusation };
  
  // Chat events
  'chat:message': { gameId: GameId; message: ChatMessage };
  'chat:typing': { gameId: GameId; playerId: PlayerId; isTyping: boolean };
  
  // System events
  'player:status_change': { playerId: PlayerId; status: Player['status'] };
  'game:error': { error: string };
}

export type WebSocketEventName = keyof WebSocketEvents;
export type WebSocketEventData<T extends WebSocketEventName> = WebSocketEvents[T];

// ========================================
// NOTIFICATION SYSTEM
// ========================================

export type NotificationId = string;

export interface NotificationState {
  notifications: Notification[];
  maxNotifications: number;
  defaultDuration: number;
  soundEnabled: boolean;
}

export interface NotificationActions {
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: NotificationId) => void;
  clearAllNotifications: () => void;
  updateNotification: (id: NotificationId, updates: Partial<Notification>) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setMaxNotifications: (max: number) => void;
  setDefaultDuration: (duration: number) => void;
} 