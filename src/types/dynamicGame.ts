// ========================================
// CRIMINAL MINDS GAME - DYNAMIC GAME TYPES
// ========================================

export interface Suspect {
  id: string;
  name: string;
  role: string;
  motives: string[];
  description: string;
  avatar: string;
  alibi: string;
  personality: string;
}

export interface ClueTemplate {
  id: string;
  name: string;
  description: string;
  linkedSuspect: string; // ID do suspeito relacionado
  location: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  isTrue: boolean; // Se a pista é verdadeira ou falsa
  interrogationHint?: string;
}

export interface CaseTemplate {
  id: string;
  title: string;
  description: string;
  setting: string;
  victimName: string;
  victimDescription: string;
  suspects: Suspect[];
  cluePool: ClueTemplate[];
  locations: GameLocation[];
  minClues: number;
  maxClues: number;
  minFalseClues: number;
  maxFalseClues: number;
}

export interface GameLocation {
  id: string;
  name: string;
  description: string;
  clueIds: string[]; // IDs das pistas que podem ser encontradas aqui
  suspectIds: string[]; // IDs dos suspeitos que podem estar aqui
  explored: boolean;
  coordinates: { x: number; y: number };
}

export interface DynamicGameState {
  gameId: string;
  caseId: string;
  phase: GamePhase;
  culprit: Suspect;
  selectedClues: ClueTemplate[];
  discoveredClues: string[]; // IDs das pistas já descobertas
  interrogatedSuspects: string[]; // IDs dos suspeitos já interrogados
  playerAccusations: Record<string, string>; // playerId -> suspectId
  timeLimit: number; // em segundos
  timeRemaining: number;
  players: DynamicPlayer[];
  isActive: boolean;
  startedAt: Date;
  endedAt?: Date;
  winner?: string;
  statistics: GameStatistics;
}

export interface DynamicPlayer {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isOnline: boolean;
  currentLocation: string;
  discoveredClues: string[];
  interrogationNotes: Record<string, string>; // suspectId -> notes
  finalAccusation?: string;
  score: number;
  joinedAt: Date;
}

export type GamePhase = 
  | 'lobby' 
  | 'briefing' 
  | 'investigation' 
  | 'deduction' 
  | 'voting' 
  | 'result';

export interface GameStatistics {
  totalPlayers: number;
  correctAccusations: number;
  wrongAccusations: number;
  cluesFound: number;
  totalClues: number;
  timeUsed: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface InterrogationResponse {
  suspectId: string;
  question: string;
  response: string;
  isHelpful: boolean;
  revealsClue?: string;
}

export interface AccusationVote {
  playerId: string;
  suspectId: string;
  confidence: number; // 1-10
  reasoning: string;
  submittedAt: Date;
}

export interface GameResult {
  isCorrect: boolean;
  culprit: Suspect;
  playerVotes: AccusationVote[];
  correctPlayers: string[];
  wrongPlayers: string[];
  finalScore: Record<string, number>;
  gameStatistics: GameStatistics;
  revealedEvidence: ClueTemplate[];
}

// WebSocket Events
export interface GameEvent {
  type: GameEventType;
  playerId: string;
  gameId: string;
  data: any;
  timestamp: Date;
}

export type GameEventType =
  | 'playerJoined'
  | 'playerLeft'
  | 'gameStarted'
  | 'phaseChanged'
  | 'playerMoved'
  | 'clueDiscovered'
  | 'suspectInterrogated'
  | 'accusationMade'
  | 'gameEnded'
  | 'chatMessage'
  | 'hintRequested';

// Game Generation Logic
export interface GameGenerationOptions {
  difficulty: 'easy' | 'medium' | 'hard';
  playerCount: number;
  timeLimit: number;
  includeFalseClues: boolean;
  randomizeLocations: boolean;
}

export interface GeneratedGame {
  culprit: Suspect;
  selectedClues: ClueTemplate[];
  shuffledLocations: GameLocation[];
  estimatedDifficulty: 'easy' | 'medium' | 'hard';
  expectedDuration: number; // em minutos
} 