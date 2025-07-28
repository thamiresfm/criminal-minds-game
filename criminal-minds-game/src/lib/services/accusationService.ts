/**
 * ISTQB CTAL-TAE - Service Layer para Acusações
 * 
 * Capítulo 3 (Arquitetura): Separação de responsabilidades
 * Capítulo 5 (Implementação): Abstração de APIs e reutilização
 */

// Tipos TypeScript para type safety
export interface Suspect {
  id: string
  name: string
  role: string
  age: number
  description: string
  motive: string
  alibi: string
  personality: string
  suspicionLevel: 'critical' | 'high' | 'medium' | 'low'
  evidence?: string[]
  isGuilty?: boolean
}

export interface AccusationRequest {
  suspectId: string
  reasoning?: string
  confidence: number
  playerId: string
}

export interface AccusationResponse {
  success: boolean
  accusation: {
    id: string
    suspectId: string
    suspectName: string
    isCorrect: boolean
    confidence: number
    reasoning: string
    timestamp: string
  }
  gameResult: {
    status: 'completed' | 'failed' | 'active'
    isVictory: boolean
    message: string
  }
}

export interface ApiError {
  error: string
  code: string
  details?: any
}

/**
 * Service para gerenciar acusações via API ou dados estáticos
 * Implementa padrões de Clean Architecture
 */
class AccusationService {
  private baseUrl: string
  private isStatic: boolean

  constructor() {
    // Detectar se estamos em modo estático (GitHub Pages)
    this.isStatic = process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  }

  /**
   * Carrega dados dos suspeitos (estático ou API)
   */
  private async loadSuspectsData(): Promise<Suspect[]> {
    if (this.isStatic) {
      // Modo estático - carregar do JSON
      const response = await fetch('/criminal-minds-game/data/suspects.json')
      if (!response.ok) {
        throw new Error('Erro ao carregar dados dos suspeitos')
      }
      return await response.json()
    } else {
      // Modo desenvolvimento - usar dados mockados inline
      return [
        {
          id: 'produtor',
          name: 'Marcus Williams',
          role: 'Produtor',
          age: 45,
          isGuilty: true,
          description: 'Produtor experiente com problemas financeiros',
          motive: 'Conflitos financeiros com a vítima',
          alibi: 'Alega estar no escritório',
          personality: 'Ambicioso e calculista',
          suspicionLevel: 'critical',
          evidence: [
            'Impressões digitais encontradas na arma',
            'Histórico de ameaças à vítima',
            'Beneficiário do seguro de vida'
          ]
        },
        {
          id: 'ator',
          name: 'Diego Santos',
          role: 'Ator Principal',
          age: 32,
          isGuilty: false,
          description: 'Ator talentoso e ambicioso',
          motive: 'Rivalidade profissional',
          alibi: 'Estava no camarim se preparando',
          personality: 'Competitivo mas honesto',
          suspicionLevel: 'high',
          evidence: [
            'Discussão pública com a vítima',
            'Álibi confirmado por testemunhas',
            'Sem acesso à arma do crime'
          ]
        },
        {
          id: 'diretora',
          name: 'Ana Silva',
          role: 'Diretora',
          age: 38,
          isGuilty: false,
          description: 'Diretora perfeccionista',
          motive: 'Discordâncias criativas',
          alibi: 'Reunião com investidores',
          personality: 'Determinada e focada',
          suspicionLevel: 'medium',
          evidence: [
            'Reunião documentada',
            'Sem histórico de violência',
            'Relação profissional cordial'
          ]
        }
      ]
    }
  }

  /**
   * Submete uma acusação para o backend ou processa localmente
   * 
   * @param gameId - ID do jogo
   * @param accusationData - Dados da acusação
   * @returns Promise com resultado da acusação
   */
  async submitAccusation(
    gameId: string, 
    accusationData: AccusationRequest
  ): Promise<AccusationResponse> {
    if (this.isStatic) {
      // Modo estático - processar localmente
      const suspects = await this.loadSuspectsData()
      const suspect = suspects.find(s => s.id === accusationData.suspectId)
      
      if (!suspect) {
        throw new Error('Suspeito não encontrado')
      }

      const isCorrect = suspect.isGuilty === true
      const accusationId = `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      return {
        success: true,
        accusation: {
          id: accusationId,
          suspectId: accusationData.suspectId,
          suspectName: suspect.name,
          isCorrect,
          confidence: accusationData.confidence,
          reasoning: accusationData.reasoning || '',
          timestamp: new Date().toISOString()
        },
        gameResult: {
          status: 'completed',
          isVictory: isCorrect,
          message: isCorrect 
            ? `Parabéns! Você identificou corretamente ${suspect.name} como o culpado!`
            : `Infelizmente, ${suspect.name} não é o culpado. O verdadeiro criminoso escapou.`
        }
      }
    } else {
      // Modo desenvolvimento - usar API
      const response = await fetch(`${this.baseUrl}/api/game/${gameId}/accusation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accusationData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao submeter acusação')
      }

      return data
    }
  }

  /**
   * Busca acusações de um jogo
   * 
   * @param gameId - ID do jogo  
   * @param playerId - ID do jogador (opcional)
   * @returns Promise com lista de acusações
   */
  async getAccusations(gameId: string, playerId?: string) {
    if (this.isStatic) {
      // Modo estático - retornar dados mockados
      return {
        success: true,
        accusations: [],
        game: {
          id: gameId,
          status: 'active',
          maxAccusations: 1
        },
        total: 0
      }
    } else {
      // Modo desenvolvimento - usar API
      const params = new URLSearchParams()
      if (playerId) {
        params.append('playerId', playerId)
      }

      const response = await fetch(
        `${this.baseUrl}/api/game/${gameId}/accusation?${params.toString()}`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar acusações')
      }

      return data
    }
  }

  /**
   * Busca lista de suspeitos do jogo
   * 
   * @param gameId - ID do jogo
   * @param options - Opções de busca
   * @returns Promise com lista de suspeitos
   */
  async getSuspects(
    gameId: string, 
    options: {
      includeEvidence?: boolean
      suspicionLevel?: string
    } = {}
  ): Promise<{ success: boolean; suspects: Suspect[]; total: number }> {
    if (this.isStatic) {
      // Modo estático - usar dados do JSON
      let suspects = await this.loadSuspectsData()

      // Filtrar por nível de suspeita se especificado
      if (options.suspicionLevel) {
        suspects = suspects.filter(suspect => suspect.suspicionLevel === options.suspicionLevel)
      }

      // Remover informações sensíveis
      const mappedSuspects = suspects.map(suspect => {
        const baseSuspect = {
          id: suspect.id,
          name: suspect.name,
          role: suspect.role,
          age: suspect.age,
          description: suspect.description,
          motive: suspect.motive,
          alibi: suspect.alibi,
          personality: suspect.personality,
          suspicionLevel: suspect.suspicionLevel
        } as Suspect

        // Incluir evidências se solicitado
        if (options.includeEvidence) {
          baseSuspect.evidence = suspect.evidence
        }

        return baseSuspect
      })

      return {
        success: true,
        suspects: mappedSuspects,
        total: mappedSuspects.length
      }
    } else {
      // Modo desenvolvimento - usar API
      const params = new URLSearchParams()
      
      if (options.includeEvidence) {
        params.append('includeEvidence', 'true')
      }
      
      if (options.suspicionLevel) {
        params.append('suspicionLevel', options.suspicionLevel)
      }

      const response = await fetch(
        `${this.baseUrl}/api/game/${gameId}/suspects?${params.toString()}`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar suspeitos')
      }

      return data
    }
  }

  /**
   * Busca detalhes de um suspeito específico
   * 
   * @param gameId - ID do jogo
   * @param suspectId - ID do suspeito
   * @returns Promise com detalhes do suspeito
   */
  async getSuspectDetails(gameId: string, suspectId: string): Promise<{
    success: boolean
    suspect: Suspect
  }> {
    if (this.isStatic) {
      // Modo estático - buscar nos dados carregados
      const suspects = await this.loadSuspectsData()
      const suspect = suspects.find(s => s.id === suspectId)

      if (!suspect) {
        throw new Error('Suspeito não encontrado')
      }

      // Remover informações sensíveis
      const suspectDetails = {
        id: suspect.id,
        name: suspect.name,
        role: suspect.role,
        age: suspect.age,
        description: suspect.description,
        motive: suspect.motive,
        alibi: suspect.alibi,
        personality: suspect.personality,
        suspicionLevel: suspect.suspicionLevel,
        evidence: suspect.evidence
      } as Suspect

      return {
        success: true,
        suspect: suspectDetails
      }
    } else {
      // Modo desenvolvimento - usar API
      const response = await fetch(`${this.baseUrl}/api/game/${gameId}/suspects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ suspectId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar detalhes do suspeito')
      }

      return data
    }
  }

  /**
   * Valida dados de acusação antes de enviar
   * Capítulo 8 (Qualidade): Validação client-side
   * 
   * @param accusationData - Dados para validar
   * @returns Array de erros (vazio se válido)
   */
  validateAccusationData(accusationData: AccusationRequest): string[] {
    const errors: string[] = []

    if (!accusationData.suspectId) {
      errors.push('Suspeito deve ser selecionado')
    }

    if (!accusationData.playerId) {
      errors.push('ID do jogador é obrigatório')
    }

    if (accusationData.confidence < 0 || accusationData.confidence > 100) {
      errors.push('Nível de confiança deve estar entre 0 e 100')
    }

    if (accusationData.reasoning && accusationData.reasoning.length > 1000) {
      errors.push('Justificativa não pode exceder 1000 caracteres')
    }

    return errors
  }

  /**
   * Função auxiliar para lidar com erros de API
   * Capítulo 7 (Manutenção): Tratamento centralizado de erros
   */
  handleApiError(error: any): ApiError {
    if (error instanceof Error) {
      return {
        error: error.message,
        code: 'CLIENT_ERROR'
      }
    }

    return {
      error: 'Erro desconhecido',
      code: 'UNKNOWN_ERROR',
      details: error
    }
  }
}

// Singleton pattern para reutilização
export const accusationService = new AccusationService()

// Export da classe para testes
export { AccusationService } 