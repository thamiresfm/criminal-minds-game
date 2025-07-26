/**
 * Testes de Performance da API de Acusação
 * Implementação baseada nos padrões ISTQB CTAL-TAE
 * 
 * Capítulo 2 (Planejamento): Testes focados nos requisitos de performance do negócio
 * Capítulo 8 (Qualidade): Métricas de performance e validação de SLA
 * Capítulo 6 (Execução): Automação de testes de carga com cenários variados
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

describe('🚀 Testes de Performance - API de Acusação', () => {
  let accusationService: AccusationService
  let loadTester: LoadTester
  const performanceResults: PerformanceResult[] = []

  beforeAll(() => {
    accusationService = new AccusationService()
    loadTester = new LoadTester()
    
    // Setup global de performance
    jest.setTimeout(60000) // 60 segundos para testes de performance
  })

  beforeEach(() => {
    // Mock consistente para todas as requisições
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        accusationId: 'acc_123',
        result: 'correct',
        message: 'Acusação processada com sucesso'
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    // Gerar relatório final de performance
    if (performanceResults.length > 0) {
      PerformanceReporter.saveReport(
        performanceResults, 
        `accusation-performance-${new Date().toISOString().split('T')[0]}.txt`
      )
    }
  })

  /**
   * CENÁRIO 1: Performance Básica - Requisição Individual
   * Validação de baseline de performance
   */
  describe('📊 Performance Básica', () => {
    test('deve processar acusação individual com latência aceitável', async () => {
      const startTime = performance.now()
      
      const response = await accusationService.submitAccusation('game_123', {
        suspectId: 'suspect_001',
        reasoning: 'Evidências coletadas indicam culpabilidade',
        confidence: 85,
        playerId: 'perf-test-player-001'
      })
      
      const endTime = performance.now()
      const responseTime = endTime - startTime

      expect(response.success).toBe(true)
      expect(responseTime).toBeLessThan(500) // SLA: < 500ms para requisição individual
      
      console.log(`⏱️  Tempo de resposta individual: ${responseTime.toFixed(2)}ms`)
    })

    test('deve manter performance consistente em consultas de acusações', async () => {
      const times: number[] = []
      
      for (let i = 0; i < 10; i++) {
        const startTime = performance.now()
        await accusationService.getAccusations('game_123')
        const endTime = performance.now()
        times.push(endTime - startTime)
      }

      const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length
      const maxTime = Math.max(...times)
      
      expect(avgTime).toBeLessThan(200) // SLA: < 200ms média
      expect(maxTime).toBeLessThan(400) // SLA: < 400ms máximo
      
      console.log(`📈 Média: ${avgTime.toFixed(2)}ms, Máximo: ${maxTime.toFixed(2)}ms`)
    })
  })

  /**
   * CENÁRIO 2: Teste de Carga Leve
   * 10 usuários simultâneos, 50 requisições total
   */
  describe('🔄 Carga Leve (10 usuários)', () => {
    test('deve suportar 10 usuários simultâneos fazendo acusações', async () => {
      const config: LoadTestConfig = {
        concurrent: 10,
        requests: 50,
        rampUp: 100 // 100ms entre batches
      }

      const testFunction = async () => {
        return accusationService.submitAccusation('game_load_test', {
          suspectId: 'suspect_001',
          reasoning: 'Teste de carga automatizado',
          confidence: Math.floor(Math.random() * 50) + 50, // 50-100
          playerId: `load-test-player-${Math.random().toString(36).substr(2, 9)}`
        })
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Carga Leve - Acusações'
      performanceResults.push(result)

      // Validações de SLA
      expect(PerformanceValidator.validateResponseTime(result.metrics, 1000))
        .toBe(true) // SLA: < 1s tempo médio
      
      expect(PerformanceValidator.validateThroughput(result.metrics, 5))
        .toBe(true) // SLA: > 5 req/s
      
      expect(PerformanceValidator.validateSuccessRate(result.metrics, 95))
        .toBe(true) // SLA: > 95% sucesso
      
      expect(PerformanceValidator.validateP95ResponseTime(result.details, 2000))
        .toBe(true) // SLA: P95 < 2s

      console.log(`🎯 Carga Leve - Sucesso: ${result.metrics.successRate.toFixed(1)}%`)
      console.log(`🚀 Throughput: ${result.metrics.throughput.toFixed(2)} req/s`)
    })
  })

  /**
   * CENÁRIO 3: Teste de Carga Média
   * 25 usuários simultâneos, 100 requisições total
   */
  describe('⚡ Carga Média (25 usuários)', () => {
    test('deve manter performance adequada com 25 usuários simultâneos', async () => {
      const config: LoadTestConfig = {
        concurrent: 25,
        requests: 100,
        rampUp: 50
      }

      const testFunction = async () => {
        return accusationService.submitAccusation('game_medium_load', {
          suspectId: `suspect_${Math.floor(Math.random() * 5) + 1}`,
          reasoning: `Análise automatizada #${Math.random().toString(36).substr(2, 9)}`,
          confidence: Math.floor(Math.random() * 40) + 60,
          playerId: `medium-load-player-${Math.random().toString(36).substr(2, 9)}`
        })
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Carga Média - Acusações'
      performanceResults.push(result)

      // Validações mais rigorosas para carga média
      expect(PerformanceValidator.validateResponseTime(result.metrics, 1500))
        .toBe(true) // SLA: < 1.5s tempo médio
      
      expect(PerformanceValidator.validateThroughput(result.metrics, 10))
        .toBe(true) // SLA: > 10 req/s
      
      expect(PerformanceValidator.validateSuccessRate(result.metrics, 90))
        .toBe(true) // SLA: > 90% sucesso
      
      expect(PerformanceValidator.validateP95ResponseTime(result.details, 3000))
        .toBe(true) // SLA: P95 < 3s

      console.log(`🔥 Carga Média - P99: ${result.details.p99ResponseTime.toFixed(2)}ms`)
    })

    test('deve manter consistência em consultas sob carga média', async () => {
      const config: LoadTestConfig = {
        concurrent: 20,
        requests: 80
      }

      const testFunction = async () => {
        return accusationService.getAccusations(`game_${Math.floor(Math.random() * 10)}`)
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Carga Média - Consultas'
      performanceResults.push(result)

      expect(PerformanceValidator.validateSuccessRate(result.metrics, 95)).toBe(true)
      expect(result.metrics.responseTime).toBeLessThan(800) // SLA mais rígido para consultas
    })
  })

  /**
   * CENÁRIO 4: Teste de Carga Pesada
   * 50 usuários simultâneos, 200 requisições total
   */
  describe('💪 Carga Pesada (50 usuários)', () => {
    test('deve resistir à carga pesada mantendo funcionalidade', async () => {
      const config: LoadTestConfig = {
        concurrent: 50,
        requests: 200,
        rampUp: 25
      }

      const testFunction = async () => {
        // Simular diferentes tipos de acusação
        const suspectTypes = ['produtor', 'ator', 'tecnico', 'diretor', 'assistente']
        const selectedSuspect = suspectTypes[Math.floor(Math.random() * suspectTypes.length)]
        
        return accusationService.submitAccusation('game_heavy_load', {
          suspectId: selectedSuspect,
          reasoning: `Teste de stress - Evidências ${Math.random().toString(36).substr(2, 15)}`,
          confidence: Math.floor(Math.random() * 30) + 70,
          playerId: `heavy-load-player-${Math.random().toString(36).substr(2, 9)}`
        })
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Carga Pesada - Stress Test'
      performanceResults.push(result)

      // SLAs mais tolerantes para alta carga
      expect(PerformanceValidator.validateResponseTime(result.metrics, 3000))
        .toBe(true) // SLA: < 3s tempo médio
      
      expect(PerformanceValidator.validateSuccessRate(result.metrics, 85))
        .toBe(true) // SLA: > 85% sucesso (mais tolerante)
      
      expect(PerformanceValidator.validateP95ResponseTime(result.details, 5000))
        .toBe(true) // SLA: P95 < 5s

      console.log(`💥 Carga Pesada - Erro Rate: ${result.metrics.errorRate.toFixed(2)}%`)
      console.log(`⚡ Max Response Time: ${result.details.maxResponseTime.toFixed(2)}ms`)
    })
  })

  /**
   * CENÁRIO 5: Teste de Stress (Extremo)
   * 100 usuários simultâneos, 300 requisições
   */
  describe('🌊 Stress Test (100 usuários)', () => {
    test('deve degradar graciosamente sob stress extremo', async () => {
      const config: LoadTestConfig = {
        concurrent: 100,
        requests: 300,
        rampUp: 10
      }

      const testFunction = async () => {
        return accusationService.submitAccusation('game_stress_test', {
          suspectId: 'stress_suspect',
          reasoning: 'Stress test automated reasoning',
          confidence: 50,
          playerId: 'stress-test-player'
        })
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Stress Test Extremo'
      performanceResults.push(result)

      // Validações de degradação controlada
      expect(result.metrics.successRate).toBeGreaterThan(50) // Mínimo 50% mesmo sob stress
      expect(result.details.requestsPerSecond).toBeGreaterThan(5) // Mínimo throughput
      
      // Log detalhado para análise
      console.log(`🔬 Stress Test - Análise Detalhada:`)
      console.log(`   Success Rate: ${result.metrics.successRate.toFixed(2)}%`)
      console.log(`   Avg Response: ${result.metrics.responseTime.toFixed(2)}ms`)
      console.log(`   P99 Response: ${result.details.p99ResponseTime.toFixed(2)}ms`)
      console.log(`   Throughput: ${result.details.requestsPerSecond.toFixed(2)} req/s`)
    })
  })

  /**
   * CENÁRIO 6: Teste de Capacidade Sustentada
   * Carga constante por período prolongado
   */
  describe('🔄 Capacidade Sustentada', () => {
    test('deve manter performance durante período prolongado', async () => {
      const duration = 5000 // 5 segundos (reduzido para evitar timeout)
      const concurrent = 15
      const startTime = Date.now()
      const results: number[] = []
      const promises: Promise<any>[] = []

      // Executar requisições contínuas
      while (Date.now() - startTime < duration) {
        const batch = Array(concurrent).fill(null).map(async () => {
          const reqStart = performance.now()
          try {
            await accusationService.submitAccusation('game_sustained', {
              suspectId: 'sustained_test',
              reasoning: 'Sustained load test',
                        confidence: 75,
          playerId: 'sustained-test-player'
        })
            results.push(performance.now() - reqStart)
          } catch (error) {
            // Registrar erro mas continuar teste
            console.warn('Erro em teste sustentado:', error)
          }
        })
        
        promises.push(...batch)
        await new Promise(resolve => setTimeout(resolve, 200)) // Intervalo entre batches
      }

      await Promise.allSettled(promises)

      // Análise de estabilidade
      const avgResponseTime = results.reduce((sum, time) => sum + time, 0) / results.length
      const totalRequests = results.length
      const requestsPerSecond = totalRequests / (duration / 1000)

      expect(avgResponseTime).toBeLessThan(2000) // Média deve permanecer estável
      expect(requestsPerSecond).toBeGreaterThan(5) // Throughput mínimo
      expect(totalRequests).toBeGreaterThan(50) // Mínimo de requisições processadas

      console.log(`⏰ Teste Sustentado (${duration}ms):`)
      console.log(`   Total Requests: ${totalRequests}`)
      console.log(`   Avg Response: ${avgResponseTime.toFixed(2)}ms`)
      console.log(`   Requests/sec: ${requestsPerSecond.toFixed(2)}`)
    })
  })

  /**
   * CENÁRIO 7: Validação de Limites de Entrada
   * Performance com diferentes tamanhos de payload
   */
  describe('📏 Performance vs Tamanho de Dados', () => {
    test('deve manter performance com reasoning longo', async () => {
      const longReasoning = 'A'.repeat(5000) // 5KB de texto
      
      const config: LoadTestConfig = {
        concurrent: 10,
        requests: 30
      }

      const testFunction = async () => {
        return accusationService.submitAccusation('game_large_payload', {
          suspectId: 'large_data_suspect',
          reasoning: longReasoning,
          confidence: 90,
          playerId: 'large-payload-player'
        })
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Large Payload Performance'
      performanceResults.push(result)

      // Performance deve degradar minimamente com payloads maiores
      expect(result.metrics.responseTime).toBeLessThan(2000) // Ainda aceitável
      expect(result.metrics.successRate).toBeGreaterThan(90)
    })

    test('deve processar múltiplos jogos simultaneamente', async () => {
      const config: LoadTestConfig = {
        concurrent: 20,
        requests: 60
      }

      const testFunction = async () => {
        const gameId = `game_${Math.floor(Math.random() * 10)}`
        return accusationService.submitAccusation(gameId, {
          suspectId: 'multi_game_suspect',
          reasoning: 'Multi-game performance test',
          confidence: 80,
          playerId: 'multi-game-player'
        })
      }

      const result = await loadTester.runLoadTest(testFunction, config)
      result.testName = 'Multi-Game Performance'
      performanceResults.push(result)

      expect(result.metrics.successRate).toBeGreaterThan(85)
      expect(result.metrics.responseTime).toBeLessThan(1500)
    })
  })
}) 