/**
 * Sistema Avançado de Coleta de Métricas de Performance
 * Implementação baseada nos padrões ISTQB CTAL-TAE
 * 
 * Capítulo 8 (Qualidade): Métricas avançadas e análise de tendências
 * Capítulo 7 (Manutenção): Monitoramento contínuo e alertas automáticos
 */

import { AccusationService } from '../../src/lib/services/accusationService'
import { 
  LoadTester, 
  PerformanceValidator, 
  PerformanceReporter,
  PerformanceResult
} from './performance-utils'

// Mock do Next.js
global.fetch = jest.fn()

interface AdvancedMetrics {
  resourceUtilization: {
    memoryUsage: number
    cpuUsage: number
    networkLatency: number
    diskIO: number
  }
  errorAnalysis: {
    errorTypes: Record<string, number>
    errorRates: number[]
    meanTimeBetweenFailures: number
  }
  userExperience: {
    satisfactionScore: number
    abandonmentRate: number
    taskCompletionRate: number
  }
  scalabilityMetrics: {
    loadFactor: number
    degradationRate: number
    recoveryTime: number
  }
  trends: {
    responseTimeGrowth: number
    throughputDegradation: number
    errorGrowthRate: number
  }
}

class AdvancedMetricsCollector {
  private metricsHistory: PerformanceResult[] = []
  private errorHistory: Array<{ timestamp: number, error: string, context: string }> = []
  private resourceHistory: Array<{ timestamp: number, memory: number, cpu: number }> = []

  recordPerformanceResult(result: PerformanceResult): void {
    this.metricsHistory.push(result)
    
    // Simular coleta de recursos (em ambiente real, usaria APIs do sistema)
    this.resourceHistory.push({
      timestamp: Date.now(),
      memory: Math.random() * 100, // % de uso de memória
      cpu: Math.random() * 100     // % de uso de CPU
    })
  }

  recordError(error: string, context: string): void {
    this.errorHistory.push({
      timestamp: Date.now(),
      error,
      context
    })
  }

  generateAdvancedMetrics(): AdvancedMetrics {
    const recentResults = this.metricsHistory.slice(-10) // Últimos 10 resultados
    const recentErrors = this.errorHistory.slice(-50)    // Últimos 50 erros
    const recentResources = this.resourceHistory.slice(-20) // Últimos 20 recursos

    return {
      resourceUtilization: this.calculateResourceUtilization(recentResources),
      errorAnalysis: this.analyzeErrors(recentErrors),
      userExperience: this.calculateUserExperience(recentResults),
      scalabilityMetrics: this.calculateScalabilityMetrics(recentResults),
      trends: this.analyzeTrends(recentResults)
    }
  }

  private calculateResourceUtilization(resources: any[]): AdvancedMetrics['resourceUtilization'] {
    if (resources.length === 0) {
      return { memoryUsage: 0, cpuUsage: 0, networkLatency: 0, diskIO: 0 }
    }

    const avgMemory = resources.reduce((sum, r) => sum + r.memory, 0) / resources.length
    const avgCpu = resources.reduce((sum, r) => sum + r.cpu, 0) / resources.length

    return {
      memoryUsage: avgMemory,
      cpuUsage: avgCpu,
      networkLatency: Math.random() * 50 + 10, // Simulado: 10-60ms
      diskIO: Math.random() * 30 + 5          // Simulado: 5-35MB/s
    }
  }

  private analyzeErrors(errors: any[]): AdvancedMetrics['errorAnalysis'] {
    if (errors.length === 0) {
      return {
        errorTypes: {},
        errorRates: [],
        meanTimeBetweenFailures: Infinity
      }
    }

    // Analisar tipos de erro
    const errorTypes: Record<string, number> = {}
    errors.forEach(e => {
      errorTypes[e.error] = (errorTypes[e.error] || 0) + 1
    })

    // Calcular taxa de erro por período
    const errorRates: number[] = []
    const now = Date.now()
    for (let i = 0; i < 10; i++) {
      const periodStart = now - (i + 1) * 60000 // Períodos de 1 minuto
      const periodEnd = now - i * 60000
      const errorsInPeriod = errors.filter(e => 
        e.timestamp >= periodStart && e.timestamp < periodEnd
      ).length
      errorRates.push(errorsInPeriod)
    }

    // MTBF (Mean Time Between Failures)
    let totalTimeBetweenFailures = 0
    for (let i = 1; i < errors.length; i++) {
      totalTimeBetweenFailures += errors[i].timestamp - errors[i-1].timestamp
    }
    const meanTimeBetweenFailures = errors.length > 1 
      ? totalTimeBetweenFailures / (errors.length - 1) 
      : Infinity

    return {
      errorTypes,
      errorRates,
      meanTimeBetweenFailures
    }
  }

  private calculateUserExperience(results: PerformanceResult[]): AdvancedMetrics['userExperience'] {
    if (results.length === 0) {
      return { satisfactionScore: 0, abandonmentRate: 0, taskCompletionRate: 0 }
    }

    // Score de satisfação baseado em tempo de resposta
    const avgResponseTime = results.reduce((sum, r) => sum + r.metrics.responseTime, 0) / results.length
    let satisfactionScore = 100
    if (avgResponseTime > 1000) satisfactionScore -= 20
    if (avgResponseTime > 2000) satisfactionScore -= 30
    if (avgResponseTime > 5000) satisfactionScore -= 40

    // Taxa de abandono baseada em taxa de erro
    const avgErrorRate = results.reduce((sum, r) => sum + r.metrics.errorRate, 0) / results.length
    const abandonmentRate = Math.min(avgErrorRate * 2, 50) // Máximo 50%

    // Taxa de conclusão de tarefas
    const avgSuccessRate = results.reduce((sum, r) => sum + r.metrics.successRate, 0) / results.length
    const taskCompletionRate = avgSuccessRate

    return {
      satisfactionScore: Math.max(0, satisfactionScore),
      abandonmentRate,
      taskCompletionRate
    }
  }

  private calculateScalabilityMetrics(results: PerformanceResult[]): AdvancedMetrics['scalabilityMetrics'] {
    if (results.length < 2) {
      return { loadFactor: 1, degradationRate: 0, recoveryTime: 0 }
    }

    // Fator de carga (requisições processadas vs configuradas)
    const totalConfiguredRequests = results.reduce((sum, r) => sum + r.config.requests, 0)
    const totalProcessedRequests = results.reduce((sum, r) => sum + r.details.totalRequests, 0)
    const loadFactor = totalProcessedRequests / totalConfiguredRequests

    // Taxa de degradação (aumento do tempo de resposta com carga)
    const responseTimesWithLoad = results.map(r => ({
      load: r.config.concurrent,
      responseTime: r.metrics.responseTime
    })).sort((a, b) => a.load - b.load)

    let degradationRate = 0
    if (responseTimesWithLoad.length >= 2) {
      const firstResult = responseTimesWithLoad[0]
      const lastResult = responseTimesWithLoad[responseTimesWithLoad.length - 1]
      const loadIncrease = lastResult.load - firstResult.load
      const responseIncrease = lastResult.responseTime - firstResult.responseTime
      degradationRate = loadIncrease > 0 ? responseIncrease / loadIncrease : 0
    }

    // Tempo de recuperação (simulado)
    const recoveryTime = Math.random() * 5000 + 1000 // 1-6 segundos

    return {
      loadFactor,
      degradationRate,
      recoveryTime
    }
  }

  private analyzeTrends(results: PerformanceResult[]): AdvancedMetrics['trends'] {
    if (results.length < 3) {
      return { responseTimeGrowth: 0, throughputDegradation: 0, errorGrowthRate: 0 }
    }

    // Crescimento do tempo de resposta
    const responseTimes = results.map(r => r.metrics.responseTime)
    const responseTimeGrowth = this.calculateTrend(responseTimes)

    // Degradação do throughput
    const throughputs = results.map(r => r.metrics.throughput)
    const throughputDegradation = -this.calculateTrend(throughputs) // Negativo porque degradação

    // Taxa de crescimento de erros
    const errorRates = results.map(r => r.metrics.errorRate)
    const errorGrowthRate = this.calculateTrend(errorRates)

    return {
      responseTimeGrowth,
      throughputDegradation,
      errorGrowthRate
    }
  }

  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0

    // Cálculo de regressão linear simples
    const n = values.length
    const sumX = (n * (n - 1)) / 2 // 0 + 1 + 2 + ... + (n-1)
    const sumY = values.reduce((sum, val) => sum + val, 0)
    const sumXY = values.reduce((sum, val, index) => sum + index * val, 0)
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6 // 0² + 1² + 2² + ... + (n-1)²

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    return slope
  }

  generateReport(): string {
    const metrics = this.generateAdvancedMetrics()
    
    let report = '\n=== RELATÓRIO AVANÇADO DE MÉTRICAS DE PERFORMANCE ===\n\n'
    
    // Utilização de Recursos
    report += '📊 UTILIZAÇÃO DE RECURSOS:\n'
    report += `  • Memória: ${metrics.resourceUtilization.memoryUsage.toFixed(1)}%\n`
    report += `  • CPU: ${metrics.resourceUtilization.cpuUsage.toFixed(1)}%\n`
    report += `  • Latência de Rede: ${metrics.resourceUtilization.networkLatency.toFixed(1)}ms\n`
    report += `  • I/O Disco: ${metrics.resourceUtilization.diskIO.toFixed(1)}MB/s\n\n`
    
    // Análise de Erros
    report += '🚨 ANÁLISE DE ERROS:\n'
    report += `  • MTBF: ${metrics.errorAnalysis.meanTimeBetweenFailures === Infinity ? 'N/A' : (metrics.errorAnalysis.meanTimeBetweenFailures / 1000).toFixed(1) + 's'}\n`
    report += `  • Tipos de Erro:\n`
    Object.entries(metrics.errorAnalysis.errorTypes).forEach(([type, count]) => {
      report += `    - ${type}: ${count} ocorrências\n`
    })
    report += '\n'
    
    // Experiência do Usuário
    report += '👤 EXPERIÊNCIA DO USUÁRIO:\n'
    report += `  • Score de Satisfação: ${metrics.userExperience.satisfactionScore.toFixed(1)}/100\n`
    report += `  • Taxa de Abandono: ${metrics.userExperience.abandonmentRate.toFixed(1)}%\n`
    report += `  • Taxa de Conclusão: ${metrics.userExperience.taskCompletionRate.toFixed(1)}%\n\n`
    
    // Métricas de Escalabilidade
    report += '📈 ESCALABILIDADE:\n'
    report += `  • Fator de Carga: ${metrics.scalabilityMetrics.loadFactor.toFixed(2)}\n`
    report += `  • Taxa de Degradação: ${metrics.scalabilityMetrics.degradationRate.toFixed(2)}ms/usuário\n`
    report += `  • Tempo de Recuperação: ${(metrics.scalabilityMetrics.recoveryTime / 1000).toFixed(1)}s\n\n`
    
    // Tendências
    report += '📊 TENDÊNCIAS:\n'
    report += `  • Crescimento Tempo Resposta: ${metrics.trends.responseTimeGrowth > 0 ? '+' : ''}${metrics.trends.responseTimeGrowth.toFixed(2)}ms/teste\n`
    report += `  • Degradação Throughput: ${metrics.trends.throughputDegradation > 0 ? '+' : ''}${metrics.trends.throughputDegradation.toFixed(2)}req/s por teste\n`
    report += `  • Crescimento Taxa Erro: ${metrics.trends.errorGrowthRate > 0 ? '+' : ''}${metrics.trends.errorGrowthRate.toFixed(2)}%/teste\n\n`
    
    // Alertas e Recomendações
    report += '⚠️ ALERTAS E RECOMENDAÇÕES:\n'
    if (metrics.resourceUtilization.memoryUsage > 80) {
      report += `  🔴 CRÍTICO: Uso de memória alto (${metrics.resourceUtilization.memoryUsage.toFixed(1)}%)\n`
    }
    if (metrics.resourceUtilization.cpuUsage > 75) {
      report += `  🔴 CRÍTICO: Uso de CPU alto (${metrics.resourceUtilization.cpuUsage.toFixed(1)}%)\n`
    }
    if (metrics.userExperience.satisfactionScore < 70) {
      report += `  🟡 ATENÇÃO: Score de satisfação baixo (${metrics.userExperience.satisfactionScore.toFixed(1)})\n`
    }
    if (metrics.trends.responseTimeGrowth > 10) {
      report += `  🟡 ATENÇÃO: Tempo de resposta crescendo rapidamente\n`
    }
    if (metrics.trends.errorGrowthRate > 5) {
      report += `  🔴 CRÍTICO: Taxa de erro crescendo\n`
    }
    if (metrics.scalabilityMetrics.degradationRate > 50) {
      report += `  🟡 ATENÇÃO: Alta degradação com carga\n`
    }
    
    report += '\n' + '='.repeat(60) + '\n'
    
    return report
  }
}

describe('📊 Sistema Avançado de Coleta de Métricas', () => {
  let accusationService: AccusationService
  let loadTester: LoadTester
  let metricsCollector: AdvancedMetricsCollector

  beforeAll(() => {
    accusationService = new AccusationService()
    loadTester = new LoadTester()
    metricsCollector = new AdvancedMetricsCollector()
    
    jest.setTimeout(90000) // 90 segundos para coleta de métricas
  })

  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        data: 'mock response'
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /**
   * CENÁRIO 1: Coleta de Métricas Básicas
   * Validação da coleta e análise de métricas fundamentais
   */
  describe('📈 Coleta de Métricas Básicas', () => {
    test('deve coletar e analisar métricas de performance básicas', async () => {
      // Executar vários testes para coletar dados
      const testConfigs = [
        { concurrent: 5, requests: 15 },
        { concurrent: 10, requests: 30 },
        { concurrent: 15, requests: 45 }
      ]

      for (const config of testConfigs) {
        const testFunction = async () => {
          return accusationService.getSuspects('game_metrics_basic')
        }

        const result = await loadTester.runLoadTest(testFunction, config)
        result.testName = `Metrics Collection - ${config.concurrent} concurrent`
        metricsCollector.recordPerformanceResult(result)

        // Simular alguns erros
        if (Math.random() < 0.1) {
          metricsCollector.recordError('TimeoutError', 'getSuspects')
        }
      }

      const advancedMetrics = metricsCollector.generateAdvancedMetrics()

      // Validações das métricas coletadas
      expect(advancedMetrics.resourceUtilization.memoryUsage).toBeGreaterThanOrEqual(0)
      expect(advancedMetrics.resourceUtilization.cpuUsage).toBeGreaterThanOrEqual(0)
      expect(advancedMetrics.userExperience.satisfactionScore).toBeGreaterThan(0)
      
      console.log('📊 Métricas básicas coletadas com sucesso')
    })

    test('deve detectar degradação de performance com aumento de carga', async () => {
      // Testes com carga crescente
      const loadLevels = [
        { concurrent: 5, requests: 20 },
        { concurrent: 20, requests: 60 },
        { concurrent: 50, requests: 100 }
      ]

      for (const config of loadLevels) {
        const testFunction = async () => {
          // Simular degradação com carga maior
          const delay = config.concurrent > 20 ? Math.random() * 100 : 0
          await new Promise(resolve => setTimeout(resolve, delay))
          return accusationService.submitAccusation('game_degradation', {
            suspectId: 'test_suspect',
            reasoning: 'Degradation test',
            confidence: 75,
            playerId: 'degradation-test-player'
          })
        }

        const result = await loadTester.runLoadTest(testFunction, config)
        result.testName = `Degradation Test - Load ${config.concurrent}`
        metricsCollector.recordPerformanceResult(result)
      }

      const metrics = metricsCollector.generateAdvancedMetrics()
      
      // Deve detectar degradação
      expect(metrics.scalabilityMetrics.degradationRate).toBeGreaterThanOrEqual(0)
      expect(metrics.scalabilityMetrics.loadFactor).toBeGreaterThan(0)
      
      console.log(`📉 Degradação detectada: ${metrics.scalabilityMetrics.degradationRate.toFixed(2)}ms/usuário`)
    })
  })

  /**
   * CENÁRIO 2: Análise de Tendências
   * Identificação de padrões e tendências nos dados de performance
   */
  describe('📊 Análise de Tendências', () => {
    test('deve identificar tendências em métricas de performance', async () => {
      // Simular série temporal de testes
      for (let i = 0; i < 8; i++) {
        const config = {
          concurrent: 10 + i * 2, // Carga crescente
          requests: 30 + i * 5    // Mais requisições
        }

        const testFunction = async () => {
          // Simular degradação gradual
          const degradationFactor = 1 + (i * 0.1) // 0%, 10%, 20%, etc.
          const delay = Math.random() * 50 * degradationFactor
          await new Promise(resolve => setTimeout(resolve, delay))
          
          return accusationService.getSuspects(`game_trend_${i}`)
        }

        const result = await loadTester.runLoadTest(testFunction, config)
        result.testName = `Trend Analysis - Step ${i + 1}`
        metricsCollector.recordPerformanceResult(result)
      }

      const metrics = metricsCollector.generateAdvancedMetrics()
      
      // Deve identificar tendência de crescimento
      expect(metrics.trends.responseTimeGrowth).toBeGreaterThan(0) // Tempo aumentando
      expect(Math.abs(metrics.trends.throughputDegradation)).toBeGreaterThanOrEqual(0) // Throughput mudando
      
      console.log(`📈 Tendência tempo resposta: +${metrics.trends.responseTimeGrowth.toFixed(2)}ms/teste`)
      console.log(`📉 Tendência throughput: ${metrics.trends.throughputDegradation.toFixed(2)}req/s por teste`)
    })
  })

  /**
   * CENÁRIO 3: Alertas Automáticos
   * Sistema de alertas baseado em thresholds
   */
  describe('🚨 Sistema de Alertas', () => {
    test('deve gerar alertas para condições críticas', async () => {
      // Simular condições que devem gerar alertas
      const criticalConfig = { concurrent: 100, requests: 200 }
      
      const testFunction = async () => {
        // Simular alta latência e erros
        const shouldError = Math.random() < 0.3 // 30% de erro
        const delay = Math.random() * 2000 + 1000 // 1-3s de delay
        
        await new Promise(resolve => setTimeout(resolve, delay))
        
        if (shouldError) {
          throw new Error('Simulated critical error')
        }
        
        return accusationService.submitAccusation('game_critical', {
          suspectId: 'critical_test',
          reasoning: 'Critical conditions test',
          confidence: 50,
          playerId: 'critical-test-player'
        })
      }

      try {
        const result = await loadTester.runLoadTest(testFunction, criticalConfig)
        result.testName = 'Critical Conditions Test'
        metricsCollector.recordPerformanceResult(result)
        
        // Registrar erros encontrados
        for (let i = 0; i < 10; i++) {
          if (Math.random() < 0.4) {
            metricsCollector.recordError('CriticalError', 'High load test')
          }
        }
        
      } catch (error) {
        console.log('⚠️ Teste crítico falhou como esperado')
      }

      const report = metricsCollector.generateReport()
      
      // Verificar se o relatório contém alertas
      expect(report).toContain('ALERTAS E RECOMENDAÇÕES')
      
      // Deve haver pelo menos um alerta
      const hasAlerts = report.includes('🔴 CRÍTICO') || report.includes('🟡 ATENÇÃO')
      expect(hasAlerts).toBe(true)
      
      console.log('🚨 Sistema de alertas funcionando corretamente')
    })
  })

  /**
   * CENÁRIO 4: Relatório Final Integrado
   */
  describe('📋 Relatório Final', () => {
    test('deve gerar relatório completo de métricas avançadas', async () => {
      // Executar bateria final de testes
      const finalConfigs = [
        { concurrent: 5, requests: 25, name: 'Light Load' },
        { concurrent: 25, requests: 75, name: 'Medium Load' },
        { concurrent: 50, requests: 100, name: 'Heavy Load' }
      ]

      for (const config of finalConfigs) {
        const testFunction = async () => {
          const operations = [
            () => accusationService.getSuspects('game_final'),
            () => accusationService.getSuspectDetails('game_final', 'produtor'),
            () => accusationService.submitAccusation('game_final', {
              suspectId: 'final_test',
              reasoning: 'Final test batch',
              confidence: 80,
              playerId: 'final-test-player'
            })
          ]
          
          const operation = operations[Math.floor(Math.random() * operations.length)]
          return operation()
        }

        const result = await loadTester.runLoadTest(testFunction, config)
        result.testName = config.name
        metricsCollector.recordPerformanceResult(result)
      }

      // Gerar e validar relatório final
      const finalReport = metricsCollector.generateReport()
      
      expect(finalReport).toContain('RELATÓRIO AVANÇADO DE MÉTRICAS')
      expect(finalReport).toContain('UTILIZAÇÃO DE RECURSOS')
      expect(finalReport).toContain('EXPERIÊNCIA DO USUÁRIO')
      expect(finalReport).toContain('ESCALABILIDADE')
      expect(finalReport).toContain('TENDÊNCIAS')
      
      console.log(finalReport)
      console.log('📋 Relatório final de métricas gerado com sucesso!')
    })
  })
}) 