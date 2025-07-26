/**
 * ISTQB CTAL-TAE - Testes de API para Sistema de Acusação
 * 
 * Este arquivo implementa testes de API seguindo os padrões da certificação:
 * - Capítulo 2 (Planejamento): Cobertura de cenários de negócio
 * - Capítulo 3 (Arquitetura): Separação entre testes de API e UI
 * - Capítulo 5 (Implementação): Testes isolados e determinísticos
 * - Capítulo 6 (Execução): Testes prontos para CI/CD
 * - Capítulo 7 (Manutenção): Código limpo e reutilizável
 * - Capítulo 8 (Qualidade): Cobertura completa e assertividade
 * - Capítulo 9 (Adoção): Documentação e padrões estabelecidos
 */

import { accusationService, AccusationService } from '../../src/lib/services/accusationService'

// Mock do fetch global para testes
global.fetch = jest.fn()

describe('API de Acusação - Testes ISTQB CTAL-TAE', () => {
  let service: AccusationService
  const mockGameId = 'test-game-123'
  const mockPlayerId = 'player-456'

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks()
    
    // Criar nova instância do service para isolamento
    service = new AccusationService()
    
    // Mock do fetch
    ;(global.fetch as jest.Mock).mockClear()
  })

  /**
   * Capítulo 2 (Planejamento): Testes de Validação de Dados
   * Objetivo: Garantir que validações client-side funcionem corretamente
   */
  describe('Validação de Dados de Acusação', () => {
    test('deve validar dados corretos sem erros', () => {
      const validData = {
        suspectId: 'produtor',
        reasoning: 'Evidências apontam para o produtor',
        confidence: 85,
        playerId: mockPlayerId
      }

      const errors = service.validateAccusationData(validData)
      
      expect(errors).toEqual([])
      expect(errors).toHaveLength(0)
    })

    test('deve rejeitar dados sem suspeito selecionado', () => {
      const invalidData = {
        suspectId: '',
        reasoning: 'Teste',
        confidence: 50,
        playerId: mockPlayerId
      }

      const errors = service.validateAccusationData(invalidData)
      
      expect(errors).toContain('Suspeito deve ser selecionado')
      expect(errors.length).toBeGreaterThan(0)
    })

    test('deve rejeitar dados sem ID do jogador', () => {
      const invalidData = {
        suspectId: 'produtor',
        reasoning: 'Teste',
        confidence: 50,
        playerId: ''
      }

      const errors = service.validateAccusationData(invalidData)
      
      expect(errors).toContain('ID do jogador é obrigatório')
    })

    test('deve rejeitar nível de confiança inválido - negativo', () => {
      const invalidData = {
        suspectId: 'produtor',
        reasoning: 'Teste',
        confidence: -10,
        playerId: mockPlayerId
      }

      const errors = service.validateAccusationData(invalidData)
      
      expect(errors).toContain('Nível de confiança deve estar entre 0 e 100')
    })

    test('deve rejeitar nível de confiança inválido - acima de 100', () => {
      const invalidData = {
        suspectId: 'produtor',
        reasoning: 'Teste',
        confidence: 150,
        playerId: mockPlayerId
      }

      const errors = service.validateAccusationData(invalidData)
      
      expect(errors).toContain('Nível de confiança deve estar entre 0 e 100')
    })

    test('deve rejeitar justificativa muito longa', () => {
      const invalidData = {
        suspectId: 'produtor',
        reasoning: 'a'.repeat(1001),
        confidence: 50,
        playerId: mockPlayerId
      }

      const errors = service.validateAccusationData(invalidData)
      
      expect(errors).toContain('Justificativa não pode exceder 1000 caracteres')
    })

    test('deve aceitar justificativa no limite de 1000 caracteres', () => {
      const validData = {
        suspectId: 'produtor',
        reasoning: 'a'.repeat(1000),
        confidence: 50,
        playerId: mockPlayerId
      }

      const errors = service.validateAccusationData(validData)
      
      expect(errors).toEqual([])
    })
  })

  /**
   * Capítulo 5 (Implementação): Testes de Submissão de Acusação
   * Objetivo: Testar comunicação com API de acusação
   */
  describe('Submissão de Acusação via API', () => {
    test('deve submeter acusação correta com sucesso', async () => {
      // Arrange - Mock da resposta da API
      const mockResponse = {
        success: true,
        accusation: {
          id: 'acc_123456',
          suspectId: 'produtor',
          suspectName: 'Marcus Williams',
          isCorrect: true,
          confidence: 85,
          reasoning: 'Evidências financeiras',
          timestamp: '2025-01-20T10:00:00Z'
        },
        gameResult: {
          status: 'completed',
          isVictory: true,
          message: 'Parabéns! Você identificou corretamente Marcus Williams como o culpado!'
        }
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      const accusationData = {
        suspectId: 'produtor',
        reasoning: 'Evidências financeiras',
        confidence: 85,
        playerId: mockPlayerId
      }

      // Act
      const result = await service.submitAccusation(mockGameId, accusationData)

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/game/${mockGameId}/accusation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(accusationData),
        }
      )

      expect(result.success).toBe(true)
      expect(result.accusation.isCorrect).toBe(true)
      expect(result.gameResult.isVictory).toBe(true)
      expect(result.gameResult.status).toBe('completed')
    })

    test('deve submeter acusação incorreta e receber derrota', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        accusation: {
          id: 'acc_123457',
          suspectId: 'ator',
          suspectName: 'Diego Santos',
          isCorrect: false,
          confidence: 60,
          reasoning: 'Suspeita baseada em rivalidade',
          timestamp: '2025-01-20T10:00:00Z'
        },
        gameResult: {
          status: 'failed',
          isVictory: false,
          message: 'Diego Santos não era o culpado. Game Over!'
        }
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      const accusationData = {
        suspectId: 'ator',
        reasoning: 'Suspeita baseada em rivalidade',
        confidence: 60,
        playerId: mockPlayerId
      }

      // Act
      const result = await service.submitAccusation(mockGameId, accusationData)

      // Assert
      expect(result.success).toBe(true)
      expect(result.accusation.isCorrect).toBe(false)
      expect(result.gameResult.isVictory).toBe(false)
      expect(result.gameResult.status).toBe('failed')
      expect(result.gameResult.message).toContain('Game Over')
    })

    test('deve lidar com erro 400 - dados inválidos', async () => {
      // Arrange
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValueOnce({
          error: 'Suspeito deve ser especificado',
          code: 'SUSPECT_REQUIRED'
        })
      })

      const invalidData = {
        suspectId: '',
        reasoning: 'Teste',
        confidence: 50,
        playerId: mockPlayerId
      }

      // Act & Assert
      await expect(
        service.submitAccusation(mockGameId, invalidData)
      ).rejects.toThrow('Suspeito deve ser especificado')
    })

    test('deve lidar com erro 409 - acusação já feita', async () => {
      // Arrange
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: jest.fn().mockResolvedValueOnce({
          error: 'Jogador já fez uma acusação neste jogo',
          code: 'ACCUSATION_ALREADY_MADE'
        })
      })

      const accusationData = {
        suspectId: 'produtor',
        reasoning: 'Segunda tentativa',
        confidence: 90,
        playerId: mockPlayerId
      }

      // Act & Assert
      await expect(
        service.submitAccusation(mockGameId, accusationData)
      ).rejects.toThrow('Jogador já fez uma acusação neste jogo')
    })

    test('deve lidar com erro 500 - erro interno do servidor', async () => {
      // Arrange
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValueOnce({
          error: 'Erro interno do servidor',
          code: 'INTERNAL_SERVER_ERROR'
        })
      })

      const accusationData = {
        suspectId: 'produtor',
        reasoning: 'Teste',
        confidence: 50,
        playerId: mockPlayerId
      }

      // Act & Assert
      await expect(
        service.submitAccusation(mockGameId, accusationData)
      ).rejects.toThrow('Erro interno do servidor')
    })
  })

  /**
   * Capítulo 6 (Execução): Testes de Busca de Suspeitos
   * Objetivo: Validar recuperação de dados via API
   */
  describe('Busca de Suspeitos via API', () => {
    test('deve buscar lista de suspeitos com sucesso', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        suspects: [
          {
            id: 'produtor',
            name: 'Marcus Williams',
            role: 'Produtor',
            age: 45,
            description: 'Produtor experiente',
            suspicionLevel: 'critical'
          },
          {
            id: 'ator',
            name: 'Diego Santos',
            role: 'Ator Principal', 
            age: 32,
            description: 'Ator talentoso',
            suspicionLevel: 'high'
          }
        ],
        total: 2,
        gameId: mockGameId
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      // Act
      const result = await service.getSuspects(mockGameId)

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/game/${mockGameId}/suspects?`
      )

      expect(result.success).toBe(true)
      expect(result.suspects).toHaveLength(2)
      expect(result.total).toBe(2)
      expect(result.suspects[0].name).toBe('Marcus Williams')
      expect(result.suspects[1].name).toBe('Diego Santos')
    })

    test('deve buscar suspeitos com evidências incluídas', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        suspects: [
          {
            id: 'produtor',
            name: 'Marcus Williams',
            role: 'Produtor',
            evidence: [
              'Impressões digitais na arma',
              'Histórico de ameaças',
              'Beneficiário do seguro'
            ]
          }
        ],
        total: 1
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      // Act
      const result = await service.getSuspects(mockGameId, { 
        includeEvidence: true 
      })

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/game/${mockGameId}/suspects?includeEvidence=true`
      )

      expect(result.suspects[0].evidence).toBeDefined()
      expect(result.suspects[0].evidence).toHaveLength(3)
    })

    test('deve filtrar suspeitos por nível de suspeita', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        suspects: [
          {
            id: 'produtor',
            name: 'Marcus Williams',
            suspicionLevel: 'critical'
          }
        ],
        total: 1
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      // Act
      const result = await service.getSuspects(mockGameId, { 
        suspicionLevel: 'critical' 
      })

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/game/${mockGameId}/suspects?suspicionLevel=critical`
      )

      expect(result.suspects).toHaveLength(1)
      expect(result.suspects[0].suspicionLevel).toBe('critical')
    })

    test('deve buscar detalhes de suspeito específico', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        suspect: {
          id: 'produtor',
          name: 'Marcus Williams',
          role: 'Produtor',
          age: 45,
          motive: 'Conflitos financeiros',
          alibi: 'Estava no escritório',
          evidence: ['Impressão digital', 'Ameaças registradas']
        }
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      // Act
      const result = await service.getSuspectDetails(mockGameId, 'produtor')

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/game/${mockGameId}/suspects`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ suspectId: 'produtor' }),
        }
      )

      expect(result.success).toBe(true)
      expect(result.suspect.id).toBe('produtor')
      expect(result.suspect.name).toBe('Marcus Williams')
      expect(result.suspect.evidence).toHaveLength(2)
    })
  })

  /**
   * Capítulo 7 (Manutenção): Testes de Busca de Acusações
   * Objetivo: Validar histórico e consultas
   */
  describe('Busca de Acusações via API', () => {
    test('deve buscar todas as acusações de um jogo', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        accusations: [
          {
            id: 'acc_1',
            playerId: 'player1',
            suspectId: 'produtor',
            suspectName: 'Marcus Williams',
            isCorrect: true,
            confidence: 85,
            timestamp: '2025-01-20T10:00:00Z'
          },
          {
            id: 'acc_2',
            playerId: 'player2',
            suspectId: 'ator',
            suspectName: 'Diego Santos',
            isCorrect: false,
            confidence: 60,
            timestamp: '2025-01-20T10:05:00Z'
          }
        ],
        total: 2
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      // Act
      const result = await service.getAccusations(mockGameId)

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/game/${mockGameId}/accusation?`
      )

      expect(result.success).toBe(true)
      expect(result.accusations).toHaveLength(2)
      expect(result.total).toBe(2)
    })

    test('deve buscar acusações de um jogador específico', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        accusations: [
          {
            id: 'acc_1',
            playerId: mockPlayerId,
            suspectId: 'produtor',
            suspectName: 'Marcus Williams',
            isCorrect: true,
            confidence: 85,
            timestamp: '2025-01-20T10:00:00Z'
          }
        ],
        total: 1
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      // Act
      const result = await service.getAccusations(mockGameId, mockPlayerId)

      // Assert
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/game/${mockGameId}/accusation?playerId=${mockPlayerId}`
      )

      expect(result.accusations).toHaveLength(1)
      expect(result.accusations[0].playerId).toBe(mockPlayerId)
    })
  })

  /**
   * Capítulo 8 (Qualidade): Testes de Tratamento de Erros
   * Objetivo: Garantir robustez na comunicação com API
   */
  describe('Tratamento de Erros da API', () => {
    test('deve tratar erro de rede corretamente', async () => {
      // Arrange
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      )

      const accusationData = {
        suspectId: 'produtor',
        reasoning: 'Teste',
        confidence: 50,
        playerId: mockPlayerId
      }

      // Act & Assert
      await expect(
        service.submitAccusation(mockGameId, accusationData)
      ).rejects.toThrow('Network error')
    })

    test('deve processar handleApiError para diferentes tipos de erro', () => {
      // Test com Error object
      const errorObject = new Error('Erro de teste')
      const result1 = service.handleApiError(errorObject)
      
      expect(result1.error).toBe('Erro de teste')
      expect(result1.code).toBe('CLIENT_ERROR')

      // Test com erro desconhecido
      const unknownError = { unknown: 'error' }
      const result2 = service.handleApiError(unknownError)
      
      expect(result2.error).toBe('Erro desconhecido')
      expect(result2.code).toBe('UNKNOWN_ERROR')
      expect(result2.details).toEqual(unknownError)
    })
  })

  /**
   * Capítulo 9 (Adoção/Transição): Testes de Performance e Limites
   * Objetivo: Validar comportamento sob diferentes condições
   */
  describe('Performance e Comportamento Limite', () => {
    test('deve lidar com timeout de requisição', async () => {
      // Arrange - Mock de timeout
      ;(global.fetch as jest.Mock).mockImplementationOnce(
        () => new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 100)
        )
      )

      const accusationData = {
        suspectId: 'produtor',
        reasoning: 'Teste de timeout',
        confidence: 50,
        playerId: mockPlayerId
      }

      // Act & Assert
      await expect(
        service.submitAccusation(mockGameId, accusationData)
      ).rejects.toThrow('Request timeout')
    })

    test('deve processar resposta com dados grandes', async () => {
      // Arrange - Mock com muitos suspeitos
      const largeSuspectsArray = Array.from({ length: 100 }, (_, i) => ({
        id: `suspect_${i}`,
        name: `Suspeito ${i}`,
        role: 'Pessoa de interesse',
        age: 25 + i,
        description: `Descrição detalhada do suspeito ${i}`.repeat(10),
        suspicionLevel: 'medium'
      }))

      const mockResponse = {
        success: true,
        suspects: largeSuspectsArray,
        total: 100
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      // Act
      const result = await service.getSuspects(mockGameId)

      // Assert
      expect(result.suspects).toHaveLength(100)
      expect(result.total).toBe(100)
    })

    test('deve manter consistência com múltiplas chamadas simultâneas', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        suspects: [
          { id: 'produtor', name: 'Marcus Williams' }
        ],
        total: 1
      }

      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      // Act - Múltiplas chamadas simultâneas
      const promises = Array.from({ length: 5 }, () => 
        service.getSuspects(mockGameId)
      )

      const results = await Promise.all(promises)

      // Assert
      expect(results).toHaveLength(5)
      results.forEach(result => {
        expect(result.success).toBe(true)
        expect(result.suspects).toHaveLength(1)
        expect(result.suspects[0].name).toBe('Marcus Williams')
      })

      expect(global.fetch).toHaveBeenCalledTimes(5)
    })
  })
}) 