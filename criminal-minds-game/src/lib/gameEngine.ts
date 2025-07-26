// ========================================
// CRIMINAL MINDS GAME - DYNAMIC GAME ENGINE
// ========================================

import { 
  CaseTemplate, 
  DynamicGameState, 
  Suspect, 
  ClueTemplate, 
  GameGenerationOptions, 
  GeneratedGame,
  DynamicPlayer,
  GameLocation,
  InterrogationResponse
} from '@/types/dynamicGame';

export class GameEngine {
  
  /**
   * Gera uma nova partida dinâmica com culpado e pistas aleatórias
   */
  static generateDynamicGame(
    caseTemplate: CaseTemplate, 
    options: GameGenerationOptions
  ): GeneratedGame {
    
    // 1. Selecionar culpado aleatoriamente
    const culprit = this.selectRandomCulprit(caseTemplate.suspects);
    
    // 2. Selecionar pistas válidas (relacionadas ao culpado)
    const validClues = caseTemplate.cluePool.filter(
      clue => clue.linkedSuspect === culprit.id && clue.isTrue
    );
    
    // 3. Selecionar pistas falsas para confundir
    const falseClues = this.selectFalseClues(
      caseTemplate.cluePool, 
      culprit.id, 
      options
    );
    
    // 4. Combinar pistas válidas e falsas
    const selectedClues = [...validClues, ...falseClues];
    
    // 5. Embaralhar pistas para randomizar descoberta
    this.shuffleArray(selectedClues);
    
    // 6. Randomizar localizações das pistas se necessário
    const shuffledLocations = options.randomizeLocations 
      ? this.randomizeClueLocations(caseTemplate.locations, selectedClues)
      : caseTemplate.locations;
    
    // 7. Calcular dificuldade estimada
    const estimatedDifficulty = this.calculateDifficulty(
      selectedClues, 
      falseClues.length, 
      options.playerCount
    );
    
    // 8. Estimar duração do jogo
    const expectedDuration = this.estimateGameDuration(
      selectedClues.length, 
      caseTemplate.suspects.length, 
      options.difficulty
    );
    
    return {
      culprit,
      selectedClues,
      shuffledLocations,
      estimatedDifficulty,
      expectedDuration
    };
  }
  
  /**
   * Seleciona um culpado aleatório
   */
  private static selectRandomCulprit(suspects: Suspect[]): Suspect {
    const randomIndex = Math.floor(Math.random() * suspects.length);
    return suspects[randomIndex];
  }
  
  /**
   * Seleciona pistas falsas baseadas na dificuldade
   */
  private static selectFalseClues(
    cluePool: ClueTemplate[], 
    culpritId: string, 
    options: GameGenerationOptions
  ): ClueTemplate[] {
    
    // Pistas que não são do culpado (falsas)
    const availableFalseClues = cluePool.filter(
      clue => clue.linkedSuspect !== culpritId || !clue.isTrue
    );
    
    // Determinar quantidade de pistas falsas baseada na dificuldade
    let falseClueCount = 0;
    switch (options.difficulty) {
      case 'easy':
        falseClueCount = Math.floor(availableFalseClues.length * 0.2); // 20%
        break;
      case 'medium':
        falseClueCount = Math.floor(availableFalseClues.length * 0.4); // 40%
        break;
      case 'hard':
        falseClueCount = Math.floor(availableFalseClues.length * 0.6); // 60%
        break;
    }
    
    // Embaralhar e selecionar pistas falsas
    this.shuffleArray(availableFalseClues);
    return availableFalseClues.slice(0, falseClueCount);
  }
  
  /**
   * Utilitário para embaralhar array
   */
  private static shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  /**
   * Randomiza as localizações das pistas
   */
  private static randomizeClueLocations(
    locations: GameLocation[], 
    clues: ClueTemplate[]
  ): GameLocation[] {
    
    const shuffledLocations = [...locations];
    const clueIds = clues.map(c => c.id);
    
    // Redistribuir pistas aleatoriamente entre locações
    shuffledLocations.forEach(location => {
      location.clueIds = [];
    });
    
    clueIds.forEach(clueId => {
      const randomLocationIndex = Math.floor(Math.random() * shuffledLocations.length);
      shuffledLocations[randomLocationIndex].clueIds.push(clueId);
    });
    
    return shuffledLocations;
  }
  
  /**
   * Calcula a dificuldade estimada do jogo
   */
  private static calculateDifficulty(
    selectedClues: ClueTemplate[], 
    falseClueCount: number, 
    playerCount: number
  ): 'easy' | 'medium' | 'hard' {
    
    const totalClues = selectedClues.length;
    const falseClueRatio = falseClueCount / totalClues;
    const criticalClues = selectedClues.filter(c => c.importance === 'critical').length;
    
    // Algoritmo de dificuldade
    if (falseClueRatio < 0.3 && criticalClues >= 2 && playerCount <= 4) {
      return 'easy';
    } else if (falseClueRatio < 0.5 && criticalClues >= 1) {
      return 'medium';
    } else {
      return 'hard';
    }
  }
  
  /**
   * Estima duração do jogo em minutos
   */
  private static estimateGameDuration(
    clueCount: number, 
    suspectCount: number, 
    difficulty: 'easy' | 'medium' | 'hard'
  ): number {
    
    const baseTime = 15; // minutos base
    const clueTime = clueCount * 2; // 2 min por pista
    const suspectTime = suspectCount * 3; // 3 min por suspeito
    
    const difficultyMultiplier = {
      easy: 1.0,
      medium: 1.3,
      hard: 1.6
    };
    
    return Math.round(
      (baseTime + clueTime + suspectTime) * difficultyMultiplier[difficulty]
    );
  }
  
  /**
   * Valida se uma acusação está correta
   */
  static validateAccusation(suspectId: string, culprit: Suspect): boolean {
    return suspectId === culprit.id;
  }
  
  /**
   * Calcula pontuação do jogador
   */
  static calculatePlayerScore(
    isCorrect: boolean,
    cluesFound: number,
    timeUsed: number,
    timeLimit: number
  ): number {
    
    let baseScore = isCorrect ? 1000 : 0;
    let clueBonus = cluesFound * 50;
    let timeBonus = Math.floor((timeLimit - timeUsed) / 60) * 10; // Bonus por tempo restante
    
    return Math.max(0, baseScore + clueBonus + timeBonus);
  }
}
