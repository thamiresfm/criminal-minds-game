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
   * Cria o estado inicial do jogo
   */
  static createGameState(
    gameId: string,
    caseTemplate: CaseTemplate,
    generatedGame: GeneratedGame,
    players: DynamicPlayer[]
  ): DynamicGameState {
    
    return {
      gameId,
      caseId: caseTemplate.id,
      phase: 'lobby',
      culprit: generatedGame.culprit,
      selectedClues: generatedGame.selectedClues,
      discoveredClues: [],
      interrogatedSuspects: [],
      playerAccusations: {},
      timeLimit: 30 * 60, // 30 minutos padrão
      timeRemaining: 30 * 60,
      players,
      isActive: false,
      startedAt: new Date(),
      statistics: {
        totalPlayers: players.length,
        correctAccusations: 0,
        wrongAccusations: 0,
        cluesFound: 0,
        totalClues: generatedGame.selectedClues.length,
        timeUsed: 0,
        difficulty: generatedGame.estimatedDifficulty
      }
    };
  }
  
  /**
   * Gera resposta de interrogação baseada no suspeito e culpado
   */
  static generateInterrogationResponse(
    suspect: Suspect,
    culprit: Suspect,
    question: string,
    discoveredClues: string[],
    allClues: ClueTemplate[]
  ): InterrogationResponse {
    
    const isCulprit = suspect.id === culprit.id;
    const relevantClues = allClues.filter(c => c.linkedSuspect === suspect.id);
    const hasRelevantClues = discoveredClues.some(clueId => 
      relevantClues.some(c => c.id === clueId)
    );
    
    // Gerar resposta baseada se é culpado ou não
    let response: string;
    let isHelpful: boolean = false;
    let revealsClue: string | undefined;
    
    if (isCulprit) {
      // Culpado tenta desviar suspeita
      response = this.generateCulpritResponse(suspect, hasRelevantClues);
      isHelpful = Math.random() < 0.3; // 30% chance de dar pista útil
    } else {
      // Inocente coopera mais
      response = this.generateInnocentResponse(suspect, hasRelevantClues);
      isHelpful = Math.random() < 0.7; // 70% chance de ser útil
      
      // Pode revelar pista sobre o verdadeiro culpado
      if (isHelpful && Math.random() < 0.4) {
        const culpritClues = allClues.filter(c => c.linkedSuspect === culprit.id);
        if (culpritClues.length > 0) {
          revealsClue = culpritClues[Math.floor(Math.random() * culpritClues.length)].id;
        }
      }
    }
    
    return {
      suspectId: suspect.id,
      question,
      response,
      isHelpful,
      revealsClue
    };
  }
  
  /**
   * Gera resposta de um suspeito culpado
   */
  private static generateCulpritResponse(suspect: Suspect, hasEvidence: boolean): string {
    const defensiveResponses = [
      "Não sei do que você está falando.",
      "Isso é um absurdo! Eu nunca faria isso.",
      "Vocês estão perdendo tempo comigo, o verdadeiro culpado ainda está solto.",
      "Eu tenho álibi sólido para o momento do crime.",
      "Alguém está tentando me incriminar."
    ];
    
    const nervousResponses = [
      "Eu... bem... isso é complicado.",
      "Por que todos estão me interrogando?",
      "Vocês não entendem a situação.",
      "As coisas não são como parecem.",
      "Eu posso explicar tudo, mas..."
    ];
    
    return hasEvidence 
      ? nervousResponses[Math.floor(Math.random() * nervousResponses.length)]
      : defensiveResponses[Math.floor(Math.random() * defensiveResponses.length)];
  }
  
  /**
   * Gera resposta de um suspeito inocente
   */
  private static generateInnocentResponse(suspect: Suspect, hasEvidence: boolean): string {
    const cooperativeResponses = [
      "Claro, posso ajudar no que for necessário.",
      "Eu vi algumas coisas suspeitas, posso contar.",
      "Quero que peguem o verdadeiro culpado.",
      "Isso é terrível, farei o que puder para ajudar.",
      "Tenho algumas informações que podem ser úteis."
    ];
    
    const concernedResponses = [
      "Estou preocupado com essa situação toda.",
      "Nunca pensei que algo assim pudesse acontecer aqui.",
      "Espero que encontrem logo quem fez isso.",
      "É assustador pensar que o culpado ainda está entre nós.",
      "Todos nós estamos em choque."
    ];
    
    return hasEvidence
      ? cooperativeResponses[Math.floor(Math.random() * cooperativeResponses.length)]
      : concernedResponses[Math.floor(Math.random() * concernedResponses.length)];
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