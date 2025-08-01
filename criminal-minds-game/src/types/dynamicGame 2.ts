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
  linkedSuspect: string;
  location: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  isTrue: boolean;
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
  clueIds: string[];
  suspectIds: string[];
  explored: boolean;
  coordinates: { x: number; y: number };
}

export interface DynamicGameState {
  gameId: string;
  caseId: string;
  phase: GamePhase;
  culprit: Suspect;
  selectedClues: ClueTemplate[];
  discoveredClues: string[];
  interrogatedSuspects: string[];
  playerAccusations: Record<string, string>;
  timeLimit: number;
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
  interrogationNotes: Record<string, string>;
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
  expectedDuration: number;
}

export interface InterrogationResponse {
  suspectId: string;
  question: string;
  response: string;
  isHelpful: boolean;
  revealsClue?: string;
}
