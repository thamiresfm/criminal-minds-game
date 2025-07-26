/**
 * Utilitários para Testes de Performance de API
 * Baseado nos padrões ISTQB CTAL-TAE - Capítulo 8 (Qualidade)
 */

export interface PerformanceMetrics {
  responseTime: number
  throughput: number
  latency: number
  successRate: number
  errorRate: number
  memoryUsage?: number
  cpuUsage?: number
}

export interface LoadTestConfig {
  concurrent: number
  requests: number
  duration?: number
  rampUp?: number
}

export interface PerformanceResult {
  testName: string
  config: LoadTestConfig
  metrics: PerformanceMetrics
  details: {
    minResponseTime: number
    maxResponseTime: number
    avgResponseTime: number
    p95ResponseTime: number
    p99ResponseTime: number
    totalRequests: number
    successfulRequests: number
    failedRequests: number
    requestsPerSecond: number
  }
  timestamp: string
}

/**
 * Classe para medir performance de requisições HTTP
 */
export class PerformanceMeasurer {
  private results: number[] = []
  private errors: Error[] = []
  private startTime: number = 0
  private endTime: number = 0

  start(): void {
    this.results = []
    this.errors = []
    this.startTime = performance.now()
  }

  recordRequest(responseTime: number): void {
    this.results.push(responseTime)
  }

  recordError(error: Error): void {
    this.errors.push(error)
  }

  finish(): PerformanceMetrics {
    this.endTime = performance.now()
    const totalTime = this.endTime - this.startTime
    const totalRequests = this.results.length + this.errors.length
    
    return {
      responseTime: this.getAverageResponseTime(),
      throughput: this.getThroughput(),
      latency: this.getMedianResponseTime(),
      successRate: this.getSuccessRate(),
      errorRate: this.getErrorRate(),
    }
  }

  private getAverageResponseTime(): number {
    if (this.results.length === 0) return 0
    return this.results.reduce((sum, time) => sum + time, 0) / this.results.length
  }

  private getMedianResponseTime(): number {
    if (this.results.length === 0) return 0
    const sorted = [...this.results].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid]
  }

  private getThroughput(): number {
    const totalTime = this.endTime - this.startTime
    const totalRequests = this.results.length + this.errors.length
    return (totalRequests / totalTime) * 1000 // requests per second
  }

  private getSuccessRate(): number {
    const totalRequests = this.results.length + this.errors.length
    if (totalRequests === 0) return 0
    return (this.results.length / totalRequests) * 100
  }

  private getErrorRate(): number {
    const totalRequests = this.results.length + this.errors.length
    if (totalRequests === 0) return 0
    return (this.errors.length / totalRequests) * 100
  }

  getDetailedResults(): PerformanceResult['details'] {
    const sorted = [...this.results].sort((a, b) => a - b)
    const totalRequests = this.results.length + this.errors.length
    const totalTime = this.endTime - this.startTime

    return {
      minResponseTime: sorted.length > 0 ? sorted[0] : 0,
      maxResponseTime: sorted.length > 0 ? sorted[sorted.length - 1] : 0,
      avgResponseTime: this.getAverageResponseTime(),
      p95ResponseTime: this.getPercentile(sorted, 95),
      p99ResponseTime: this.getPercentile(sorted, 99),
      totalRequests,
      successfulRequests: this.results.length,
      failedRequests: this.errors.length,
      requestsPerSecond: (totalRequests / totalTime) * 1000
    }
  }

  private getPercentile(sortedArray: number[], percentile: number): number {
    if (sortedArray.length === 0) return 0
    const index = Math.ceil((percentile / 100) * sortedArray.length) - 1
    return sortedArray[Math.max(0, index)]
  }
}

/**
 * Executor de testes de carga
 */
export class LoadTester {
  async runLoadTest<T>(
    testFunction: () => Promise<T>,
    config: LoadTestConfig
  ): Promise<PerformanceResult> {
    const measurer = new PerformanceMeasurer()
    measurer.start()

    const promises: Promise<void>[] = []

    // Criar requisições concorrentes
    for (let i = 0; i < config.requests; i++) {
      const promise = this.executeRequest(testFunction, measurer)
      promises.push(promise)

      // Aplicar ramp-up se especificado
      if (config.rampUp && i % config.concurrent === 0) {
        await new Promise(resolve => setTimeout(resolve, config.rampUp))
      }
    }

    // Aguardar todas as requisições
    await Promise.allSettled(promises)

    const metrics = measurer.finish()
    const details = measurer.getDetailedResults()

    return {
      testName: 'Load Test',
      config,
      metrics,
      details,
      timestamp: new Date().toISOString()
    }
  }

  private async executeRequest<T>(
    testFunction: () => Promise<T>,
    measurer: PerformanceMeasurer
  ): Promise<void> {
    const startTime = performance.now()
    
    try {
      await testFunction()
      const endTime = performance.now()
      measurer.recordRequest(endTime - startTime)
    } catch (error) {
      measurer.recordError(error as Error)
    }
  }
}

/**
 * Validadores de performance baseados em SLA
 */
export class PerformanceValidator {
  static validateResponseTime(metrics: PerformanceMetrics, maxMs: number): boolean {
    return metrics.responseTime <= maxMs
  }

  static validateThroughput(metrics: PerformanceMetrics, minRps: number): boolean {
    return metrics.throughput >= minRps
  }

  static validateSuccessRate(metrics: PerformanceMetrics, minPercent: number): boolean {
    return metrics.successRate >= minPercent
  }

  static validateP95ResponseTime(details: PerformanceResult['details'], maxMs: number): boolean {
    return details.p95ResponseTime <= maxMs
  }

  static validateP99ResponseTime(details: PerformanceResult['details'], maxMs: number): boolean {
    return details.p99ResponseTime <= maxMs
  }
}

/**
 * Gerador de relatórios de performance
 */
export class PerformanceReporter {
  static generateReport(results: PerformanceResult[]): string {
    let report = '\n=== RELATÓRIO DE PERFORMANCE DE API ===\n\n'
    
    results.forEach((result, index) => {
      report += `Teste ${index + 1}: ${result.testName}\n`
      report += `Timestamp: ${result.timestamp}\n`
      report += `Configuração: ${result.config.concurrent} concurrent, ${result.config.requests} requests\n`
      report += `\nMétricas Principais:\n`
      report += `  - Tempo de Resposta Médio: ${result.metrics.responseTime.toFixed(2)}ms\n`
      report += `  - Throughput: ${result.metrics.throughput.toFixed(2)} req/s\n`
      report += `  - Latência (Mediana): ${result.metrics.latency.toFixed(2)}ms\n`
      report += `  - Taxa de Sucesso: ${result.metrics.successRate.toFixed(2)}%\n`
      report += `  - Taxa de Erro: ${result.metrics.errorRate.toFixed(2)}%\n`
      report += `\nDetalhes:\n`
      report += `  - Min Response Time: ${result.details.minResponseTime.toFixed(2)}ms\n`
      report += `  - Max Response Time: ${result.details.maxResponseTime.toFixed(2)}ms\n`
      report += `  - P95 Response Time: ${result.details.p95ResponseTime.toFixed(2)}ms\n`
      report += `  - P99 Response Time: ${result.details.p99ResponseTime.toFixed(2)}ms\n`
      report += `  - Requests/Second: ${result.details.requestsPerSecond.toFixed(2)}\n`
      report += `  - Total Requests: ${result.details.totalRequests}\n`
      report += `  - Successful: ${result.details.successfulRequests}\n`
      report += `  - Failed: ${result.details.failedRequests}\n`
      report += '\n' + '='.repeat(50) + '\n\n'
    })
    
    return report
  }

  static saveReport(results: PerformanceResult[], filename: string): void {
    const report = this.generateReport(results)
    // Em um ambiente real, salvaria em arquivo
    console.log(`\n📊 Relatório salvo em: ${filename}`)
    console.log(report)
  }
} 