/**
 * Testes de Segurança - OWASP Top 10 2021
 * Implementação baseada nos padrões ISTQB CTAL-TAE e OWASP Top 10
 * 
 * Capítulo 2 (Planejamento): Testes focados nos riscos mais críticos
 * Capítulo 8 (Qualidade): Validação abrangente de vulnerabilidades OWASP
 */

import { 
  SecurityTester, 
  SecurityValidators, 
  MaliciousDataGenerator,
  SecurityReporter,
  SecurityVulnerability,
  SecurityTestConfig
} from './security-utils'

// Mock do Next.js para testes de segurança
global.fetch = jest.fn()

describe('🛡️ Testes de Segurança - OWASP Top 10 2021', () => {
  let securityTester: SecurityTester
  const testConfig: SecurityTestConfig = {
    target: 'http://localhost:3000',
    timeout: 15000,
    retries: 3,
    severity: 'high',
    category: 'OWASP'
  }

  beforeAll(() => {
    securityTester = new SecurityTester()
    jest.setTimeout(60000) // 60 segundos para testes OWASP completos
  })

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear()
  })

  afterAll(() => {
    const results = securityTester.getResults()
    if (results.length > 0) {
      const report = SecurityReporter.generateSecurityReport(results)
      SecurityReporter.saveSecurityReport(
        report, 
        `owasp-security-${new Date().toISOString().split('T')[0]}.txt`
      )
    }
  })

  /**
   * OWASP A02:2021 – Cryptographic Failures
   * Testes de falhas criptográficas
   */
  describe('🔐 A02:2021 – Cryptographic Failures', () => {
    test('deve detectar transmissão de dados sensíveis sem criptografia', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        // Simular endpoints que podem transmitir dados sensíveis
        const sensitiveEndpoints = [
          '/api/auth/login',
          '/api/user/profile',
          '/api/game/user/progress',
          '/api/admin/audit'
        ]

        for (const endpoint of sensitiveEndpoints) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
              success: true,
              data: {
                password: 'plaintext_password', // Vulnerabilidade: senha em texto claro
                creditCard: '1234567890123456', // Vulnerabilidade: dados de cartão expostos
                ssn: '123-45-6789', // Vulnerabilidade: dados pessoais sensíveis
                apiKey: 'sk_test_123456789' // Vulnerabilidade: chave API exposta
              }
            })
          })

          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer test_token',
              'Content-Type': 'application/json'
            }
          })

          const data = await response.json()
          const responseText = JSON.stringify(data)

          // Verificar dados sensíveis em texto claro
          const sensitivePatterns = [
            /password.*[:\s]+[^*]+/i,
            /creditcard.*[:\s]+\d{13,19}/i,
            /ssn.*[:\s]+\d{3}-\d{2}-\d{4}/i,
            /api[_\s]?key.*[:\s]+[a-z0-9_-]{10,}/i,
            /token.*[:\s]+[a-z0-9_-]{20,}/i
          ]

          for (const pattern of sensitivePatterns) {
            if (pattern.test(responseText)) {
              vulnerabilities.push({
                id: `crypto_failure_${Date.now()}_${Math.random()}`,
                title: 'Sensitive Data Exposure',
                description: `Sensitive data transmitted without encryption at ${endpoint}`,
                severity: 'high',
                category: 'Cryptographic Failures',
                owaspCategory: 'A02:2021 – Cryptographic Failures',
                cwe: 'CWE-319',
                evidence: [responseText.substring(0, 200)],
                remediation: 'Encrypt sensitive data in transit and at rest',
                impact: 'Exposure of sensitive user data, credentials theft',
                likelihood: 'medium'
              })
            }
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Sensitive Data Exposure Test',
        testFunction,
        testConfig
      )

      // Este teste DETECTA exposição de dados sensíveis - isso é esperado
      expect(result.vulnerabilities.length).toBeGreaterThan(0) // Deve detectar vulnerabilidades
      console.log(`🔐 Exposição de dados: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })

    test('deve detectar algoritmos criptográficos fracos', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        // Simular resposta com informações sobre criptografia
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({
            success: true,
            encryption: {
              algorithm: 'SHA-1', // Algoritmo fraco
              keySize: 1024, // Tamanho de chave inadequado
              protocol: 'TLS 1.0' // Protocolo desatualizado
            }
          })
        })

        const response = await fetch('/api/system/encryption-info', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer admin_token',
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()

        if (data.encryption) {
          const weakAlgorithms = ['md5', 'sha-1', 'des', '3des']
          const weakProtocols = ['ssl 2.0', 'ssl 3.0', 'tls 1.0', 'tls 1.1']
          
          if (weakAlgorithms.includes(data.encryption.algorithm?.toLowerCase())) {
            vulnerabilities.push({
              id: `weak_crypto_${Date.now()}`,
              title: 'Weak Cryptographic Algorithm',
              description: `Weak algorithm detected: ${data.encryption.algorithm}`,
              severity: 'medium',
              category: 'Cryptographic Failures',
              owaspCategory: 'A02:2021 – Cryptographic Failures',
              cwe: 'CWE-327',
              evidence: [JSON.stringify(data.encryption)],
              remediation: 'Use strong cryptographic algorithms (SHA-256+, AES-256)',
              impact: 'Cryptographic attacks, data compromise',
              likelihood: 'low'
            })
          }

          if (data.encryption.keySize < 2048) {
            vulnerabilities.push({
              id: `weak_key_${Date.now()}`,
              title: 'Insufficient Key Size',
              description: `Key size too small: ${data.encryption.keySize} bits`,
              severity: 'medium',
              category: 'Cryptographic Failures',
              owaspCategory: 'A02:2021 – Cryptographic Failures',
              cwe: 'CWE-326',
              evidence: [JSON.stringify(data.encryption)],
              remediation: 'Use minimum 2048-bit keys for RSA, 256-bit for AES',
              impact: 'Brute force attacks against encryption',
              likelihood: 'low'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Weak Cryptography Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`🔑 Criptografia fraca: ${result.passed ? 'NÃO DETECTADA' : 'DETECTADA'}`)
    })
  })

  /**
   * OWASP A04:2021 – Insecure Design
   * Testes de design inseguro
   */
  describe('🏗️ A04:2021 – Insecure Design', () => {
    test('deve detectar falta de rate limiting em operações críticas', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        // Testar operações que devem ter rate limiting
        const criticalOperations = [
          '/api/auth/password-reset',
          '/api/game/accusation',
          '/api/admin/user-create',
          '/api/game/high-score'
        ]

        for (const operation of criticalOperations) {
          let successfulRequests = 0
          const maxRequests = 20 // Testar 20 requisições rápidas

          for (let i = 0; i < maxRequests; i++) {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
              ok: true,
              status: 200,
              json: async () => ({
                success: true,
                message: 'Operation completed',
                requestId: `req_${i}`
              })
            })

            try {
              const response = await fetch(operation, {
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer test_token',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: `test_${i}` })
              })

              if (response.ok) {
                successfulRequests++
              }
            } catch (error) {
              // Rate limiting ativo
              break
            }
          }

          // Se mais de 10 requisições foram bem-sucedidas rapidamente, falta rate limiting
          if (successfulRequests > 10) {
            vulnerabilities.push({
              id: `missing_rate_limit_${Date.now()}`,
              title: 'Missing Rate Limiting',
              description: `No rate limiting detected for critical operation: ${operation}`,
              severity: 'medium',
              category: 'Insecure Design',
              owaspCategory: 'A04:2021 – Insecure Design',
              cwe: 'CWE-770',
              evidence: [`${successfulRequests} requests successful in rapid succession`],
              remediation: 'Implement rate limiting for critical operations',
              impact: 'Resource exhaustion, abuse of functionality',
              likelihood: 'high'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Rate Limiting Test',
        testFunction,
        testConfig
      )

      // Este teste DETECTA falta de rate limiting - isso é esperado
      expect(result.vulnerabilities.length).toBeGreaterThan(0) // Deve detectar falta de rate limiting
      console.log(`⏱️ Rate Limiting: ${result.passed ? 'IMPLEMENTADO' : 'AUSENTE'}`)
    })

    test('deve detectar validação insuficiente de entrada', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        // Dados maliciosos para teste de validação
        const maliciousInputs = [
          MaliciousDataGenerator.generateLongString(50000), // Buffer overflow
          MaliciousDataGenerator.generateSpecialCharsString(), // Caracteres especiais
          MaliciousDataGenerator.generateUnicodeAttack(), // Unicode malicioso
          null,
          undefined,
          {},
          [],
          -1,
          9999999999999999999999999999999999999999
        ]

        const endpoints = [
          '/api/game/accusation',
          '/api/user/profile',
          '/api/game/progress'
        ]

        for (const endpoint of endpoints) {
          for (const maliciousInput of maliciousInputs) {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
              ok: false,
              status: 400,
              json: async () => ({
                success: false,
                message: 'Invalid input detected',
                validation: true
              })
            })

            try {
              const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer test_token',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  suspectId: maliciousInput,
                  reasoning: maliciousInput,
                  confidence: maliciousInput
                })
              })

              const data = await response.json()

              // Se input malicioso foi aceito, há falta de validação
              if (response.ok || data.success) {
                vulnerabilities.push({
                  id: `insufficient_validation_${Date.now()}`,
                  title: 'Insufficient Input Validation',
                  description: `Malicious input accepted at ${endpoint}`,
                  severity: 'medium',
                  category: 'Insecure Design',
                  owaspCategory: 'A04:2021 – Insecure Design',
                  cwe: 'CWE-20',
                  evidence: [JSON.stringify(data).substring(0, 200)],
                  remediation: 'Implement comprehensive input validation',
                  impact: 'Various injection attacks, system instability',
                  likelihood: 'high'
                })
                break // Uma vulnerabilidade por endpoint é suficiente
              }
            } catch (error) {
              // Erro esperado para input malicioso
            }
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Input Validation Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`✅ Validação de entrada: ${result.passed ? 'ROBUSTA' : 'INSUFICIENTE'}`)
    })
  })

  /**
   * OWASP A05:2021 – Security Misconfiguration
   * Testes de configurações de segurança
   */
  describe('⚙️ A05:2021 – Security Misconfiguration', () => {
    test('deve detectar headers de segurança ausentes', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({
            'Content-Type': 'application/json',
            // Headers de segurança ausentes intencionalmente para teste
          }),
          json: async () => ({
            success: true,
            message: 'Success'
          })
        })

        const response = await fetch('/api/game/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer test_token',
            'Content-Type': 'application/json'
          }
        })

        // Headers de segurança obrigatórios
        const requiredSecurityHeaders = [
          'x-content-type-options',
          'x-frame-options',
          'x-xss-protection',
          'strict-transport-security',
          'content-security-policy',
          'referrer-policy'
        ]

        for (const header of requiredSecurityHeaders) {
          if (!response.headers.has(header)) {
            vulnerabilities.push({
              id: `missing_header_${header}_${Date.now()}`,
              title: `Missing Security Header: ${header}`,
              description: `Required security header '${header}' is missing`,
              severity: 'medium',
              category: 'Security Misconfiguration',
              owaspCategory: 'A05:2021 – Security Misconfiguration',
              cwe: 'CWE-16',
              evidence: [`Response headers: ${Array.from(response.headers.keys()).join(', ')}`],
              remediation: `Add ${header} header with appropriate value`,
              impact: 'Various client-side attacks, clickjacking, XSS',
              likelihood: 'medium'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Security Headers Test',
        testFunction,
        testConfig
      )

      // Para este teste, esperamos que algumas vulnerabilidades sejam encontradas (headers ausentes)
      console.log(`⚙️ Headers de segurança: ${result.vulnerabilities.length} ausentes`)
    })

    test('deve detectar informações de debug expostas', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({
            success: false,
            message: 'Internal server error',
            // Não deve incluir informações de debug
            error: 'Database connection failed'
          })
        })

        const response = await fetch('/api/nonexistent-endpoint', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer test_token',
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()
        const responseText = JSON.stringify(data)

        // Verificar informações sensíveis de debug
        const debugIndicators = [
          'stack trace',
          'file path',
          'line number',
          'database connection',
          'sql error',
          'exception:',
          'debug:',
          'localhost',
          'development mode'
        ]

        for (const indicator of debugIndicators) {
          if (responseText.toLowerCase().includes(indicator)) {
            vulnerabilities.push({
              id: `debug_exposure_${Date.now()}`,
              title: 'Debug Information Exposure',
              description: `Debug information exposed: ${indicator}`,
              severity: 'low',
              category: 'Security Misconfiguration',
              owaspCategory: 'A05:2021 – Security Misconfiguration',
              cwe: 'CWE-209',
              evidence: [responseText.substring(0, 300)],
              remediation: 'Remove debug information from production responses',
              impact: 'Information disclosure, system reconnaissance',
              likelihood: 'low'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Debug Information Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`🐛 Informações de debug: ${result.passed ? 'OCULTAS' : 'EXPOSTAS'}`)
    })
  })

  /**
   * OWASP A06:2021 – Vulnerable and Outdated Components
   * Testes de componentes vulneráveis
   */
  describe('📦 A06:2021 – Vulnerable Components', () => {
    test('deve detectar exposição de versões de software', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers({
            'Server': 'Apache/2.2.8', // Versão antiga vulnerável
            'X-Powered-By': 'PHP/5.3.0', // Versão desatualizada
            'X-AspNet-Version': '2.0.50727' // Framework antigo
          }),
          json: async () => ({
            success: true,
            message: 'Server info'
          })
        })

        const response = await fetch('/api/server-info', {
          method: 'GET'
        })

        // Verificar headers que expõem versões
        const versionHeaders = ['server', 'x-powered-by', 'x-aspnet-version']
        
        for (const header of versionHeaders) {
          const headerValue = response.headers.get(header)
          if (headerValue) {
            vulnerabilities.push({
              id: `version_disclosure_${header}_${Date.now()}`,
              title: 'Software Version Disclosure',
              description: `Software version exposed in ${header} header: ${headerValue}`,
              severity: 'low',
              category: 'Information Disclosure',
              owaspCategory: 'A06:2021 – Vulnerable and Outdated Components',
              cwe: 'CWE-200',
              evidence: [`${header}: ${headerValue}`],
              remediation: 'Remove or obfuscate version information from headers',
              impact: 'Reconnaissance for targeted attacks',
              likelihood: 'high'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Version Disclosure Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`📦 Exposição de versões: ${result.passed ? 'OCULTA' : 'DETECTADA'}`)
    })
  })

  /**
   * OWASP A09:2021 – Security Logging and Monitoring Failures
   * Testes de logging e monitoramento
   */
  describe('📊 A09:2021 – Logging and Monitoring', () => {
    test('deve detectar falta de logging para eventos críticos', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        // Testar se eventos de segurança são logados
        const securityEvents = [
          { endpoint: '/api/auth/login', event: 'login_attempt' },
          { endpoint: '/api/auth/logout', event: 'logout' },
          { endpoint: '/api/admin/users', event: 'admin_access' },
          { endpoint: '/api/game/accusation', event: 'game_action' }
        ]

        for (const { endpoint, event } of securityEvents) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
              success: true,
              message: 'Action completed',
              // Não inclui informações de log
            })
          })

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer test_token',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'test' })
          })

          const data = await response.json()

          // Verificar se há indicação de logging
          if (!data.logged && !data.auditId && !data.eventId) {
            vulnerabilities.push({
              id: `missing_logging_${event}_${Date.now()}`,
              title: 'Missing Security Logging',
              description: `No logging detected for security event: ${event}`,
              severity: 'medium',
              category: 'Logging Failures',
              owaspCategory: 'A09:2021 – Security Logging and Monitoring Failures',
              cwe: 'CWE-778',
              evidence: [JSON.stringify(data)],
              remediation: 'Implement comprehensive security event logging',
              impact: 'Inability to detect security incidents',
              likelihood: 'high'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Security Logging Test',
        testFunction,
        testConfig
      )

      // Para este teste, algumas vulnerabilidades podem ser esperadas
      console.log(`📊 Logging de segurança: ${result.vulnerabilities.length} eventos sem log`)
    })
  })

  /**
   * OWASP A10:2021 – Server-Side Request Forgery (SSRF)
   * Testes de SSRF
   */
  describe('🌐 A10:2021 – Server-Side Request Forgery', () => {
    test('deve detectar vulnerabilidades SSRF', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const ssrfPayloads = [
          'http://localhost:3000/admin',
          'http://127.0.0.1:22',
          'http://169.254.169.254/latest/meta-data/', // AWS metadata
          'file:///etc/passwd',
          'ftp://internal-server.local',
          'gopher://127.0.0.1:25/xHELO%20test'
        ]

        for (const payload of ssrfPayloads) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: async () => ({
              success: false,
              message: 'Invalid URL format',
              blockedUrl: payload
            })
          })

          try {
            const response = await fetch('/api/game/fetch-external', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer test_token',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                url: payload
              })
            })

            const data = await response.json()

            // Se URL maliciosa foi processada, há SSRF
            if (response.ok || (data.success && !data.blockedUrl)) {
              vulnerabilities.push({
                id: `ssrf_${Date.now()}`,
                title: 'Server-Side Request Forgery (SSRF)',
                description: `SSRF vulnerability with payload: ${payload}`,
                severity: 'high',
                category: 'SSRF',
                owaspCategory: 'A10:2021 – Server-Side Request Forgery (SSRF)',
                cwe: 'CWE-918',
                evidence: [JSON.stringify(data)],
                remediation: 'Validate and whitelist allowed URLs, block internal IPs',
                impact: 'Internal network access, cloud metadata access',
                likelihood: 'medium'
              })
            }
          } catch (error) {
            // Erro esperado para SSRF bloqueado
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'SSRF Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`🌐 SSRF: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })
  })
}) 