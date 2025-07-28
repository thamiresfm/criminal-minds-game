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
 * Service para gerenciar acusações via API
 * Implementa padrões de Clean Architecture
 */
class AccusationService {
  private baseUrl: string

  constructor() {
    // Usar URL base do ambiente ou localhost para desenvolvimento
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  }

  /**
   * Submete uma acusação para o backend
   * 
   * @param gameId - ID do jogo
   * @param accusationData - Dados da acusação
   * @returns Promise com resultado da acusação
   */
  async submitAccusation(
    gameId: string, 
    accusationData: AccusationRequest
  ): Promise<AccusationResponse> {
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

  /**
   * Busca acusações de um jogo
   * 
   * @param gameId - ID do jogo  
   * @param playerId - ID do jogador (opcional)
   * @returns Promise com lista de acusações
   */
  async getAccusations(gameId: string, playerId?: string) {
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