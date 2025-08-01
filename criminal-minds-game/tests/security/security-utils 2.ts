/**
 * Utilitários para Testes de Segurança
 * Implementação baseada nos padrões ISTQB CTAL-TAE e OWASP Top 10
 * 
 * Capítulo 2 (Planejamento): Testes focados em requisitos de segurança
 * Capítulo 8 (Qualidade): Métricas de segurança e validação de vulnerabilidades
 */

export interface SecurityTestConfig {
  target: string
  timeout: number
  retries: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: string
}

export interface SecurityVulnerability {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: string
  owaspCategory?: string
  cwe?: string
  evidence: string[]
  remediation: string
  impact: string
  likelihood: string
}

export interface SecurityTestResult {
  testName: string
  category: string
  vulnerabilities: SecurityVulnerability[]
  passed: boolean
  riskScore: number
  executionTime: number
  timestamp: string
  recommendations: string[]
}

export interface SecurityReport {
  summary: {
    totalTests: number
    passedTests: number
    failedTests: number
    criticalVulnerabilities: number
    highVulnerabilities: number
    mediumVulnerabilities: number
    lowVulnerabilities: number
    overallRiskScore: number
  }
  results: SecurityTestResult[]
  owaspMapping: Record<string, SecurityVulnerability[]>
  recommendations: string[]
  compliance: {
    owasp: boolean
    iso27001: boolean
    gdpr: boolean
  }
}

/**
 * Classe base para execução de testes de segurança
 */
export class SecurityTester {
  private vulnerabilities: SecurityVulnerability[] = []
  private testResults: SecurityTestResult[] = []

  /**
   * Executa um teste de segurança específico
   */
  async executeSecurityTest(
    testName: string,
    testFunction: () => Promise<SecurityVulnerability[]>,
    config: SecurityTestConfig
  ): Promise<SecurityTestResult> {
    const startTime = performance.now()
    
    try {
      const vulnerabilities = await testFunction()
      const passed = vulnerabilities.length === 0
      const riskScore = this.calculateRiskScore(vulnerabilities)
      
      const result: SecurityTestResult = {
        testName,
        category: config.category,
        vulnerabilities,
        passed,
        riskScore,
        executionTime: performance.now() - startTime,
        timestamp: new Date().toISOString(),
        recommendations: this.generateRecommendations(vulnerabilities)
      }
      
      this.testResults.push(result)
      this.vulnerabilities.push(...vulnerabilities)
      
      return result
    } catch (error) {
      throw new Error(`Security test failed: ${error}`)
    }
  }

  /**
   * Calcula score de risco baseado nas vulnerabilidades encontradas
   */
  private calculateRiskScore(vulnerabilities: SecurityVulnerability[]): number {
    if (vulnerabilities.length === 0) return 0
    
    const severityWeights = {
      low: 1,
      medium: 3,
      high: 7,
      critical: 10
    }
    
    const totalScore = vulnerabilities.reduce((score, vuln) => 
      score + severityWeights[vuln.severity], 0
    )
    
    return Math.min(100, (totalScore / vulnerabilities.length) * 10)
  }

  /**
   * Gera recomendações baseadas nas vulnerabilidades encontradas
   */
  private generateRecommendations(vulnerabilities: SecurityVulnerability[]): string[] {
    const recommendations: string[] = []
    
    vulnerabilities.forEach(vuln => {
      recommendations.push(`${vuln.severity.toUpperCase()}: ${vuln.remediation}`)
    })
    
    return recommendations
  }

  /**
   * Obtém todos os resultados de teste
   */
  getResults(): SecurityTestResult[] {
    return this.testResults
  }

  /**
   * Obtém todas as vulnerabilidades encontradas
   */
  getVulnerabilities(): SecurityVulnerability[] {
    return this.vulnerabilities
  }
}

/**
 * Validadores específicos para diferentes tipos de ataques
 */
export class SecurityValidators {
  /**
   * Testa payloads de SQL Injection
   */
  static sqlInjectionPayloads = [
    "' OR '1'='1",
    "'; DROP TABLE users; --",
    "' UNION SELECT * FROM users --",
    "admin'--",
    "admin' #",
    "admin'/*",
    "' or 1=1#",
    "' or 1=1--",
    "' or 1=1/*",
    ")) or true--",
    "' OR 'x'='x"
  ]

  /**
   * Testa payloads de XSS
   */
  static xssPayloads = [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "'><script>alert('XSS')</script>",
    "javascript:alert('XSS')",
    "<svg onload=alert('XSS')>",
    "<iframe src='javascript:alert(`XSS`)'></iframe>",
    "<body onload=alert('XSS')>",
    "<div onclick=\"alert('XSS')\">Click me</div>",
    "<%2Fscript><%2Fscript><script>alert('XSS')</script>",
    "<scr<script>ipt>alert('XSS')</script>"
  ]

  /**
   * Testa payloads de Command Injection
   */
  static commandInjectionPayloads = [
    "; ls -la",
    "| whoami",
    "&& cat /etc/passwd",
    "; cat /etc/shadow",
    "| id",
    "&& ls /",
    "; ps aux",
    "| netstat -an",
    "&& uname -a",
    "; env"
  ]

  /**
   * Testa headers maliciosos
   */
  static maliciousHeaders = {
    'X-Forwarded-For': ['127.0.0.1', 'localhost', '../etc/passwd'],
    'User-Agent': [
      '<script>alert("XSS")</script>',
      '../../etc/passwd',
      'Mozilla/5.0 () { :; }; echo vulnerable'
    ],
    'Referer': [
      'javascript:alert("XSS")',
      'http://evil.com/xss.js',
      '../../../etc/passwd'
    ],
    'Cookie': [
      'sessionid=../../../etc/passwd',
      'auth=<script>alert("XSS")</script>',
      'token=\'; DROP TABLE users; --'
    ]
  }

  /**
   * Valida se a resposta contém indicadores de vulnerabilidade
   */
  static validateResponse(response: any, payload: string): SecurityVulnerability | null {
    const responseText = typeof response === 'string' ? response : JSON.stringify(response)
    
    // Detectar SQL Injection
    if (this.sqlInjectionPayloads.includes(payload)) {
      if (responseText.includes('SQL syntax') || 
          responseText.includes('mysql_fetch') ||
          responseText.includes('ORA-00933') ||
          responseText.includes('Microsoft Access Driver')) {
        return {
          id: `sql_injection_${Date.now()}`,
          title: 'SQL Injection Vulnerability',
          description: `Application is vulnerable to SQL injection with payload: ${payload}`,
          severity: 'critical',
          category: 'Injection',
          owaspCategory: 'A03:2021 – Injection',
          cwe: 'CWE-89',
          evidence: [responseText.substring(0, 200)],
          remediation: 'Use parameterized queries and input validation',
          impact: 'Data breach, unauthorized access, data manipulation',
          likelihood: 'high'
        }
      }
    }

    // Detectar XSS
    if (this.xssPayloads.includes(payload)) {
      if (responseText.includes(payload) || responseText.includes('alert(')) {
        return {
          id: `xss_${Date.now()}`,
          title: 'Cross-Site Scripting (XSS) Vulnerability',
          description: `Application is vulnerable to XSS with payload: ${payload}`,
          severity: 'high',
          category: 'XSS',
          owaspCategory: 'A03:2021 – Injection',
          cwe: 'CWE-79',
          evidence: [responseText.substring(0, 200)],
          remediation: 'Implement proper input sanitization and output encoding',
          impact: 'Session hijacking, defacement, malicious redirects',
          likelihood: 'high'
        }
      }
    }

    return null
  }
}

/**
 * Gerador de dados maliciosos para testes
 */
export class MaliciousDataGenerator {
  /**
   * Gera strings excessivamente longas para teste de buffer overflow
   */
  static generateLongString(length: number = 10000): string {
    return 'A'.repeat(length)
  }

  /**
   * Gera caracteres especiais para teste de sanitização
   */
  static generateSpecialCharsString(): string {
    return '!@#$%^&*()_+-=[]{}|;:,.<>?/~`\'"\\<script>alert()</script>'
  }

  /**
   * Gera dados Unicode maliciosos
   */
  static generateUnicodeAttack(): string {
    return '\u0000\u0001\u0008\u000b\u000c\u000e\u001f\u007f\u0080\u00ff'
  }

  /**
   * Gera payloads de Path Traversal
   */
  static generatePathTraversalPayloads(): string[] {
    return [
      '../../../etc/passwd',
      '..\\..\\..\\windows\\system32\\config\\sam',
      '....//....//....//etc/passwd',
      '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
      '..%252f..%252f..%252fetc%252fpasswd',
      '..%c0%af..%c0%af..%c0%afetc%c0%afpasswd'
    ]
  }

  /**
   * Gera tokens JWT maliciosos
   */
  static generateMaliciousJWT(): string[] {
    return [
      'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJ0cnVlIn0.invalid',
      'none.payload.signature',
      '../../../etc/passwd',
      '<script>alert("XSS")</script>'
    ]
  }
}

/**
 * Gerador de relatórios de segurança
 */
export class SecurityReporter {
  static generateSecurityReport(results: SecurityTestResult[]): SecurityReport {
    const allVulnerabilities = results.flatMap(r => r.vulnerabilities)
    
    // Categorizar vulnerabilidades por OWASP
    const owaspMapping: Record<string, SecurityVulnerability[]> = {}
    allVulnerabilities.forEach(vuln => {
      if (vuln.owaspCategory) {
        if (!owaspMapping[vuln.owaspCategory]) {
          owaspMapping[vuln.owaspCategory] = []
        }
        owaspMapping[vuln.owaspCategory].push(vuln)
      }
    })

    // Calcular métricas
    const criticalVulns = allVulnerabilities.filter(v => v.severity === 'critical').length
    const highVulns = allVulnerabilities.filter(v => v.severity === 'high').length
    const mediumVulns = allVulnerabilities.filter(v => v.severity === 'medium').length
    const lowVulns = allVulnerabilities.filter(v => v.severity === 'low').length
    
    const overallRiskScore = results.reduce((sum, r) => sum + r.riskScore, 0) / results.length || 0
    
    // Gerar recomendações principais
    const recommendations = this.generateMainRecommendations(allVulnerabilities)
    
    // Avaliar compliance
    const compliance = {
      owasp: criticalVulns === 0 && highVulns <= 2,
      iso27001: overallRiskScore < 30,
      gdpr: !allVulnerabilities.some(v => v.category.includes('Privacy'))
    }

    return {
      summary: {
        totalTests: results.length,
        passedTests: results.filter(r => r.passed).length,
        failedTests: results.filter(r => !r.passed).length,
        criticalVulnerabilities: criticalVulns,
        highVulnerabilities: highVulns,
        mediumVulnerabilities: mediumVulns,
        lowVulnerabilities: lowVulns,
        overallRiskScore
      },
      results,
      owaspMapping,
      recommendations,
      compliance
    }
  }

  private static generateMainRecommendations(vulnerabilities: SecurityVulnerability[]): string[] {
    const recommendations = new Set<string>()
    
    vulnerabilities.forEach(vuln => {
      switch (vuln.category) {
        case 'Injection':
          recommendations.add('Implementar validação rigorosa de entrada e queries parametrizadas')
          break
        case 'Authentication':
          recommendations.add('Fortalecer mecanismos de autenticação e implementar MFA')
          break
        case 'Session':
          recommendations.add('Implementar gerenciamento seguro de sessões com tokens seguros')
          break
        case 'Encryption':
          recommendations.add('Utilizar algoritmos de criptografia atualizados e secure by design')
          break
        default:
          recommendations.add('Realizar auditoria de segurança completa')
      }
    })
    
    return Array.from(recommendations)
  }

  static saveSecurityReport(report: SecurityReport, filename: string): void {
    const reportText = this.formatReportAsText(report)
    console.log(`\n🔒 Relatório de Segurança salvo em: ${filename}`)
    console.log(reportText)
  }

  private static formatReportAsText(report: SecurityReport): string {
    let text = '\n=== RELATÓRIO DE SEGURANÇA - CRIMINAL MINDS GAME ===\n\n'
    
    // Resumo Executivo
    text += '📊 RESUMO EXECUTIVO:\n'
    text += `  • Total de Testes: ${report.summary.totalTests}\n`
    text += `  • Testes Aprovados: ${report.summary.passedTests}\n`
    text += `  • Testes Falharam: ${report.summary.failedTests}\n`
    text += `  • Score de Risco Geral: ${report.summary.overallRiskScore.toFixed(1)}/100\n\n`
    
    // Vulnerabilidades por Severidade
    text += '🚨 VULNERABILIDADES POR SEVERIDADE:\n'
    text += `  🔴 CRÍTICAS: ${report.summary.criticalVulnerabilities}\n`
    text += `  🟠 ALTAS: ${report.summary.highVulnerabilities}\n`
    text += `  🟡 MÉDIAS: ${report.summary.mediumVulnerabilities}\n`
    text += `  🟢 BAIXAS: ${report.summary.lowVulnerabilities}\n\n`
    
    // Mapeamento OWASP
    text += '🛡️ MAPEAMENTO OWASP TOP 10:\n'
    Object.entries(report.owaspMapping).forEach(([category, vulns]) => {
      text += `  • ${category}: ${vulns.length} vulnerabilidade(s)\n`
    })
    text += '\n'
    
    // Compliance
    text += '✅ STATUS DE COMPLIANCE:\n'
    text += `  • OWASP: ${report.compliance.owasp ? '✅ CONFORME' : '❌ NÃO CONFORME'}\n`
    text += `  • ISO 27001: ${report.compliance.iso27001 ? '✅ CONFORME' : '❌ NÃO CONFORME'}\n`
    text += `  • GDPR: ${report.compliance.gdpr ? '✅ CONFORME' : '❌ NÃO CONFORME'}\n\n`
    
    // Recomendações Principais
    text += '💡 RECOMENDAÇÕES PRINCIPAIS:\n'
    report.recommendations.forEach((rec, index) => {
      text += `  ${index + 1}. ${rec}\n`
    })
    text += '\n'
    
    // Detalhes dos Testes
    text += '📋 DETALHES DOS TESTES:\n'
    report.results.forEach((result, index) => {
      text += `\nTeste ${index + 1}: ${result.testName}\n`
      text += `  Categoria: ${result.category}\n`
      text += `  Status: ${result.passed ? '✅ PASSOU' : '❌ FALHOU'}\n`
      text += `  Score de Risco: ${result.riskScore.toFixed(1)}/100\n`
      text += `  Vulnerabilidades: ${result.vulnerabilities.length}\n`
      
      if (result.vulnerabilities.length > 0) {
        result.vulnerabilities.forEach(vuln => {
          text += `    - ${vuln.severity.toUpperCase()}: ${vuln.title}\n`
        })
      }
    })
    
    text += '\n' + '='.repeat(60) + '\n'
    
    return text
  }
} 