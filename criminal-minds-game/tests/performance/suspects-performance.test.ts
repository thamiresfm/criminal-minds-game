/**
 * Testes de Performance da API de Suspeitos
 * Implementação baseada nos padrões ISTQB CTAL-TAE
 * 
 * Capítulo 2 (Planejamento): Foco em consultas e listagem de suspeitos
 * Capítulo 8 (Qualidade): Métricas de performance para operações de leitura
 * Capítulo 6 (Execução): Cenários de carga para APIs de consulta intensiva
 */

import { AccusationService } from '../../src/lib/services/accusationService'
import { 
  LoadTester, 
  PerformanceValidator, 
  PerformanceReporter,
  PerformanceResult,
  LoadTestConfig 
} from './performance-utils'

// Mock do Next.js para testes de performance
global.fetch = jest.fn()

describe('👥 Testes de Performance - API de Suspeitos', () => {
  let accusationService: AccusationService
  let loadTester: LoadTester
  const performanceResults: PerformanceResult[] = []

  // Mock data para suspeitos
  const mockSuspects = [
    {
      id: 'produtor',
      name: 'Helena Santos',
      role: 'Produtora',
      description: 'Experiente produtora teatral',
      motive: 'Pressão financeira e conflitos criativos',
      alibi: 'Estava em reunião com investidores',
      personality: 'Ambiciosa, determinada, controladora',
      suspicionLevel: 'high'
    },
    {
      id: 'ator',
      name: 'João Pereira',
      role: 'Ator Principal',
      description: 'Jovem ator em ascensão',
      motive: 'Rivalidade profissional',
      alibi: 'No camarim preparando-se',
      personality: 'Carismático, competitivo, instável',
      suspicionLevel: 'medium'
    },
    // ... mais suspeitos
  ]

  beforeAll(() => {
    accusationService = new AccusationService()
    loadTester = new LoadTester()
    
    jest.setTimeout(45000) // 45 segundos para testes de performance
  })

  beforeEach(() => {
    // Mock para listagem de suspeitos
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/suspects')) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            success: true,
            suspects: mockSuspects,
            totalCount: mockSuspects.length
          })
        })
      }
      
      // Mock para detalhes de suspeito específico
      if (url.includes('/suspects/')) {
        const suspectId = url.split('/').pop()
        const suspect = mockSuspects.find(s => s.id === suspectId)
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            success: true,
            suspect: suspect || mockSuspects[0],
            relatedEvidence: ['evidence_1', 'evidence_2'],
            interactions: ['interaction_1']
          })
        })
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    if (performanceResults.length > 0) {
      PerformanceReporter.saveReport(
        performanceResults, 
        `suspects-performance-${new Date().toISOString().split('T')[0]}.txt`
      )
    }
  })

  /**
   * CENÁRIO 1: Performance de Consulta Individual
   * Teste baseline para consultas de suspeitos
   */
  describe('📋 Performance de Consulta Individual', () => {
    test('deve carregar lista de suspeitos rapidamente', async () => {
      const startTime = performance.now()
      
      const response = await accusationService.getSuspects('game_123')
      
      const endTime = performance.now()
      const responseTime = endTime - startTime

      expect(response.success).toBe(true)
      expect(response.suspects).toHaveLength(mockSuspects.length)
      expect(responseTime).toBeLessThan(300) // SLA: < 300ms para listagem
      
      console.log(`📋 Tempo listagem suspeitos: ${responseTime.toFixed(2)}ms`)
    })

    test('deve carregar detalhes de suspeito específico rapidamente', async () => {
      const startTime = performance.now()
      
      const response = await accusationService.getSuspectDetails('game_123', 'produtor')
      
      const endTime = performance.now()
      const responseTime = endTime - startTime

      expect(response.success).toBe(true)
      expect(responseTime).toBeLessThan(250) // SLA: < 250ms para detalhes
      
      console.log(`👤 Tempo detalhes suspeito: ${responseTime.toFixed(2)}ms`)
    })
  })

  /**
   * CENÁRIO 2: Carga Concorrente de Consultas
   * 20 usuários consultando suspeitos simultaneamente
   */
  describe('🔍 Consultas Concorrentes', () => {
    test('deve suportar múltiplas consultas de listagem simultâneas', async () => {
      const config: LoadTestConfig = {
        concurrent: 20,
        requests: 60,
        rampUp: 50
      }

      const testFunction = async () => {
        return accusationService.getSuspects(`game_${Math.floor(Math.random() * 5)}`)
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Consultas Concorrentes - Listagem'
      performanceResults.push(result)

      // Validações específicas para consultas
      expect(PerformanceValidator.validateResponseTime(result.metrics, 500))
        .toBe(true) // SLA: < 500ms médio para consultas
      
      expect(PerformanceValidator.validateThroughput(result.metrics, 20))
        .toBe(true) // SLA: > 20 req/s (consultas são mais rápidas)
      
      expect(PerformanceValidator.validateSuccessRate(result.metrics, 98))
        .toBe(true) // SLA: > 98% sucesso (consultas devem ser mais estáveis)

      console.log(`🔍 Consultas Concorrentes - Throughput: ${result.metrics.throughput.toFixed(2)} req/s`)
    })

    test('deve manter performance em consultas de detalhes simultâneas', async () => {
      const config: LoadTestConfig = {
        concurrent: 15,
        requests: 45
      }

      const suspectIds = ['produtor', 'ator', 'tecnico', 'diretor', 'assistente']

      const testFunction = async () => {
        const randomSuspect = suspectIds[Math.floor(Math.random() * suspectIds.length)]
        return accusationService.getSuspectDetails('game_details_test', randomSuspect)
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Consultas Concorrentes - Detalhes'
      performanceResults.push(result)

      expect(PerformanceValidator.validateResponseTime(result.metrics, 400)).toBe(true)
      expect(PerformanceValidator.validateSuccessRate(result.metrics, 95)).toBe(true)
      expect(PerformanceValidator.validateP95ResponseTime(result.details, 800)).toBe(true)
    })
  })

  /**
   * CENÁRIO 3: Cache e Performance de Dados Repetidos
   * Testando comportamento com requisições repetidas
   */
  describe('💾 Performance de Cache', () => {
    test('deve otimizar consultas repetidas do mesmo suspeito', async () => {
      const config: LoadTestConfig = {
        concurrent: 10,
        requests: 50
      }

      // Todas as requisições para o mesmo suspeito (simula cache)
      const testFunction = async () => {
        return accusationService.getSuspectDetails('game_cache_test', 'produtor')
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Performance com Cache - Mesmo Suspeito'
      performanceResults.push(result)

      // Performance deve ser superior com dados repetidos
      expect(result.metrics.responseTime).toBeLessThan(200) // Mais rápido que cenário variado
      expect(result.metrics.throughput).toBeGreaterThan(25) // Maior throughput
      expect(result.metrics.successRate).toBe(100) // Deve ser perfeito

      console.log(`💾 Cache Performance - Avg: ${result.metrics.responseTime.toFixed(2)}ms`)
    })

    test('deve manter performance com mix de consultas novas e repetidas', async () => {
      const config: LoadTestConfig = {
        concurrent: 12,
        requests: 48
      }

      const suspectIds = ['produtor', 'produtor', 'ator', 'produtor', 'tecnico'] // Mais 'produtor'

      const testFunction = async () => {
        const selectedSuspect = suspectIds[Math.floor(Math.random() * suspectIds.length)]
        return accusationService.getSuspectDetails('game_mixed_cache', selectedSuspect)
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Performance Mix Cache/Novo'
      performanceResults.push(result)

      expect(result.metrics.responseTime).toBeLessThan(300)
      expect(result.metrics.successRate).toBeGreaterThan(95)
    })
  })

  /**
   * CENÁRIO 4: Alta Carga de Consultas
   * 50 usuários fazendo consultas intensivas
   */
  describe('🚀 Alta Carga de Consultas', () => {
    test('deve resistir à alta carga de listagens', async () => {
      const config: LoadTestConfig = {
        concurrent: 50,
        requests: 150,
        rampUp: 20
      }

      const testFunction = async () => {
        return accusationService.getSuspects(`game_high_load_${Math.floor(Math.random() * 3)}`)
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Alta Carga - Listagens'
      performanceResults.push(result)

      // SLAs mais tolerantes para alta carga
      expect(PerformanceValidator.validateResponseTime(result.metrics, 1000))
        .toBe(true) // SLA: < 1s médio
      
      expect(PerformanceValidator.validateSuccessRate(result.metrics, 90))
        .toBe(true) // SLA: > 90% sucesso
      
      expect(PerformanceValidator.validateThroughput(result.metrics, 15))
        .toBe(true) // SLA: > 15 req/s

      console.log(`🚀 Alta Carga - Error Rate: ${result.metrics.errorRate.toFixed(2)}%`)
    })

    test('deve manter estabilidade em consultas de detalhes sob alta carga', async () => {
      const config: LoadTestConfig = {
        concurrent: 40,
        requests: 120
      }

      const testFunction = async () => {
        const suspectIds = ['produtor', 'ator', 'tecnico', 'diretor']
        const randomSuspect = suspectIds[Math.floor(Math.random() * suspectIds.length)]
        const gameId = `game_${Math.floor(Math.random() * 5)}`
        
        return accusationService.getSuspectDetails(gameId, randomSuspect)
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Alta Carga - Detalhes'
      performanceResults.push(result)

      expect(result.metrics.successRate).toBeGreaterThan(85)
      expect(result.metrics.responseTime).toBeLessThan(1200)
    })
  })

  /**
   * CENÁRIO 5: Stress Test de Consultas
   * Limite máximo de consultas simultâneas
   */
  describe('💥 Stress Test de Consultas', () => {
    test('deve degradar graciosamente sob stress extremo', async () => {
      const config: LoadTestConfig = {
        concurrent: 80,
        requests: 240,
        rampUp: 10
      }

      const testFunction = async () => {
        // Mix de consultas para estressar diferentes endpoints
        const isDetailQuery = Math.random() > 0.5
        
        if (isDetailQuery) {
          return accusationService.getSuspectDetails('game_stress', 'produtor')
        } else {
          return accusationService.getSuspects('game_stress')
        }
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Stress Test - Consultas Mistas'
      performanceResults.push(result)

      // Validações de degradação controlada
      expect(result.metrics.successRate).toBeGreaterThan(60) // Mínimo 60% sob stress
      expect(result.details.requestsPerSecond).toBeGreaterThan(8) // Throughput mínimo
      
      console.log(`💥 Stress Test - Success Rate: ${result.metrics.successRate.toFixed(2)}%`)
      console.log(`💥 Requests/Second: ${result.details.requestsPerSecond.toFixed(2)}`)
    })
  })

  /**
   * CENÁRIO 6: Performance de Busca e Filtros
   * Teste de consultas com parâmetros complexos
   */
  describe('🔎 Performance de Busca Avançada', () => {
    test('deve manter performance com filtros de suspeição', async () => {
      const config: LoadTestConfig = {
        concurrent: 15,
        requests: 45
      }

      const suspicionLevels = ['high', 'medium', 'low']

      const testFunction = async () => {
        // Simular consulta com filtro de nível de suspeição
        const level = suspicionLevels[Math.floor(Math.random() * suspicionLevels.length)]
        
        // Mock modificado para incluir filtro
        const originalFetch = global.fetch as jest.Mock
        originalFetch.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({
            success: true,
            suspects: mockSuspects.filter(s => s.suspicionLevel === level),
            totalCount: mockSuspects.filter(s => s.suspicionLevel === level).length,
            appliedFilter: level
          })
        })

        return accusationService.getSuspects(`game_filter_${level}`)
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Performance - Filtros de Busca'
      performanceResults.push(result)

      expect(result.metrics.responseTime).toBeLessThan(600) // Filtros podem ser mais lentos
      expect(result.metrics.successRate).toBeGreaterThan(90)

      console.log(`🔎 Busca com Filtros - Avg: ${result.metrics.responseTime.toFixed(2)}ms`)
    })

    test('deve processar consultas com múltiplos critérios', async () => {
      const config: LoadTestConfig = {
        concurrent: 10,
        requests: 30
      }

      const testFunction = async () => {
        // Simular busca complexa com múltiplos parâmetros
        const originalFetch = global.fetch as jest.Mock
        originalFetch.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({
            success: true,
            suspects: mockSuspects.slice(0, 2), // Resultado filtrado
            totalCount: 2,
            searchCriteria: {
              role: 'Ator',
              suspicionLevel: 'high',
              hasAlibi: true
            }
          })
        })

        return accusationService.getSuspects('game_complex_search')
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Performance - Busca Complexa'
      performanceResults.push(result)

      expect(result.metrics.responseTime).toBeLessThan(800) // Busca complexa mais lenta
      expect(result.metrics.successRate).toBe(100) // Deve funcionar perfeitamente
    })
  })

  /**
   * CENÁRIO 7: Teste de Capacidade de Paginação
   * Performance com grandes volumes de dados
   */
  describe('📄 Performance de Paginação', () => {
    test('deve manter performance com paginação de resultados', async () => {
      const config: LoadTestConfig = {
        concurrent: 12,
        requests: 36
      }

      const testFunction = async () => {
        const page = Math.floor(Math.random() * 5) + 1 // Páginas 1-5
        const pageSize = 10
        
        // Mock para paginação
        const originalFetch = global.fetch as jest.Mock
        originalFetch.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({
            success: true,
            suspects: mockSuspects.slice((page - 1) * pageSize, page * pageSize),
            pagination: {
              currentPage: page,
              pageSize,
              totalPages: Math.ceil(mockSuspects.length / pageSize),
              totalItems: mockSuspects.length
            }
          })
        })

        return accusationService.getSuspects(`game_pagination_${page}`)
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Performance - Paginação'
      performanceResults.push(result)

      expect(result.metrics.responseTime).toBeLessThan(400)
      expect(result.metrics.successRate).toBeGreaterThan(95)
      
      console.log(`📄 Paginação - P95: ${result.details.p95ResponseTime.toFixed(2)}ms`)
    })
  })
}) 