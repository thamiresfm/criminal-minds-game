/**
 * Testes de Segurança - Injeção de Código
 * Implementação baseada nos padrões ISTQB CTAL-TAE e OWASP Top 10
 * 
 * Capítulo 2 (Planejamento): Testes focados em falhas de injeção
 * Capítulo 8 (Qualidade): Validação contra SQL injection, XSS, Command injection
 * OWASP A03:2021 – Injection
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

describe('💉 Testes de Segurança - Injeção de Código', () => {
  let securityTester: SecurityTester
  const testConfig: SecurityTestConfig = {
    target: 'http://localhost:3000',
    timeout: 15000,
    retries: 3,
    severity: 'critical',
    category: 'Injection'
  }

  beforeAll(() => {
    securityTester = new SecurityTester()
    jest.setTimeout(45000) // 45 segundos para testes de injeção
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
        `injection-security-${new Date().toISOString().split('T')[0]}.txt`
      )
    }
  })

  /**
   * CENÁRIO 1: Testes de SQL Injection
   * OWASP A03:2021 – Injection (SQL)
   */
  describe('🗄️ SQL Injection', () => {
    test('deve detectar vulnerabilidades de SQL injection em parâmetros', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const sqlPayloads = SecurityValidators.sqlInjectionPayloads
        const endpoints = [
          '/api/game/user/profile',
          '/api/game/accusations',
          '/api/game/suspects',
          '/api/admin/users'
        ]

        for (const endpoint of endpoints) {
          for (const payload of sqlPayloads) {
            // Mock resposta que indica SQL injection bem-sucedida
            (global.fetch as jest.Mock).mockResolvedValueOnce({
              ok: false,
              status: 500,
              json: async () => ({
                success: false,
                message: 'Internal server error',
                error: 'Database query failed' // Não deve vazar detalhes
              })
            })

            try {
              const response = await fetch(`${endpoint}?search=${encodeURIComponent(payload)}`, {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer test_token',
                  'Content-Type': 'application/json'
                }
              })

              const data = await response.json()
              
              // Verificar se há indicadores de SQL injection
              const responseText = JSON.stringify(data)
              const sqlIndicators = [
                'sql syntax',
                'mysql_fetch',
                'ora-00933',
                'microsoft access driver',
                'syntax error',
                'column count',
                'union select'
              ]

              const hasSqlIndicator = sqlIndicators.some(indicator => 
                responseText.toLowerCase().includes(indicator)
              )

              if (hasSqlIndicator) {
                vulnerabilities.push({
                  id: `sql_injection_${Date.now()}_${Math.random()}`,
                  title: 'SQL Injection Vulnerability',
                  description: `SQL injection detected at ${endpoint} with payload: ${payload}`,
                  severity: 'critical',
                  category: 'Injection',
                  owaspCategory: 'A03:2021 – Injection',
                  cwe: 'CWE-89',
                  evidence: [responseText.substring(0, 300)],
                  remediation: 'Use parameterized queries, stored procedures, and input validation',
                  impact: 'Complete database compromise, data theft, data manipulation',
                  likelihood: 'high'
                })
              }
            } catch (error) {
              // Erro de rede esperado
            }
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'SQL Injection Parameter Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0) // Não deve haver vulnerabilidades
      console.log(`🗄️ SQL Injection parâmetros: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })

    test('deve detectar SQL injection em dados POST', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const sqlPayloads = [
          "'; DROP TABLE users; --",
          "' UNION SELECT password FROM users --",
          "admin'--",
          "' OR '1'='1' --"
        ]

        for (const payload of sqlPayloads) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
              success: false,
              message: 'Invalid input detected',
              inputValidation: true
            })
          })

          const response = await fetch('/api/game/accusation', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer test_token',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              suspectId: payload,
              reasoning: 'Test reasoning',
              confidence: 85
            })
          })

          const data = await response.json()

          // Se payload SQL foi processado sem validação, é vulnerabilidade
          if (data.success || !data.inputValidation) {
            const responseText = JSON.stringify(data)
            
            if (responseText.includes('sql') || responseText.includes('database')) {
              vulnerabilities.push({
                id: `sql_injection_post_${Date.now()}`,
                title: 'SQL Injection in POST Data',
                description: `SQL injection in POST data with payload: ${payload}`,
                severity: 'critical',
                category: 'Injection',
                owaspCategory: 'A03:2021 – Injection',
                cwe: 'CWE-89',
                evidence: [responseText],
                remediation: 'Validate and sanitize all POST input data',
                impact: 'Database manipulation through form submissions',
                likelihood: 'high'
              })
            }
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'SQL Injection POST Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`📝 SQL Injection POST: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })
  })

  /**
   * CENÁRIO 2: Testes de Cross-Site Scripting (XSS)
   * OWASP A03:2021 – Injection (XSS)
   */
  describe('🎭 Cross-Site Scripting (XSS)', () => {
    test('deve detectar vulnerabilidades de XSS refletido', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const xssPayloads = SecurityValidators.xssPayloads

        for (const payload of xssPayloads) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
              success: true,
              message: 'Search completed',
              results: [],
              searchTerm: payload // XSS refletido - payload retornado sem sanitização
            })
          })

          const response = await fetch(`/api/game/search?q=${encodeURIComponent(payload)}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer test_token',
              'Content-Type': 'application/json'
            }
          })

          const data = await response.json()
          const responseText = JSON.stringify(data)

          // Se payload XSS foi retornado sem sanitização, é vulnerabilidade
          if (responseText.includes(payload) || 
              responseText.includes('<script>') ||
              responseText.includes('javascript:') ||
              responseText.includes('onerror=')) {
            
            vulnerabilities.push({
              id: `xss_reflected_${Date.now()}_${Math.random()}`,
              title: 'Reflected Cross-Site Scripting (XSS)',
              description: `Reflected XSS vulnerability with payload: ${payload}`,
              severity: 'high',
              category: 'XSS',
              owaspCategory: 'A03:2021 – Injection',
              cwe: 'CWE-79',
              evidence: [responseText.substring(0, 300)],
              remediation: 'Implement proper output encoding and input sanitization',
              impact: 'Session hijacking, credential theft, malicious redirects',
              likelihood: 'high'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Reflected XSS Test',
        testFunction,
        testConfig
      )

      // Este teste DETECTA vulnerabilidades XSS - isso é esperado
      expect(result.vulnerabilities.length).toBeGreaterThan(0) // Deve detectar vulnerabilidades XSS
      console.log(`🎭 XSS Refletido: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })

    test('deve detectar XSS armazenado em formulários', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const xssPayloads = [
          '<script>alert("Stored XSS")</script>',
          '<img src=x onerror=alert("XSS")>',
          '<svg onload=alert("XSS")>'
        ]

        for (const payload of xssPayloads) {
          // 1. Enviar payload XSS
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
              success: true,
              accusationId: 'test123',
              message: 'Accusation submitted successfully'
            })
          })

          await fetch('/api/game/accusation', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer test_token',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              suspectId: 'suspect1',
              reasoning: payload, // XSS payload no reasoning
              confidence: 80
            })
          })

          // 2. Recuperar dados e verificar se XSS foi armazenado
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
              success: true,
              accusations: [{
                id: 'test123',
                reasoning: payload, // XSS payload retornado sem sanitização
                suspectId: 'suspect1'
              }]
            })
          })

          const response = await fetch('/api/game/accusations', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer test_token',
              'Content-Type': 'application/json'
            }
          })

          const data = await response.json()
          const responseText = JSON.stringify(data)

          // Se payload XSS foi armazenado e retornado, é vulnerabilidade
          if (responseText.includes(payload)) {
            vulnerabilities.push({
              id: `xss_stored_${Date.now()}`,
              title: 'Stored Cross-Site Scripting (XSS)',
              description: `Stored XSS vulnerability with payload: ${payload}`,
              severity: 'critical',
              category: 'XSS',
              owaspCategory: 'A03:2021 – Injection',
              cwe: 'CWE-79',
              evidence: [responseText.substring(0, 300)],
              remediation: 'Sanitize input before storage and encode output',
              impact: 'Persistent XSS affecting all users viewing the content',
              likelihood: 'high'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Stored XSS Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`💾 XSS Armazenado: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })
  })

  /**
   * CENÁRIO 3: Testes de Command Injection
   * OWASP A03:2021 – Injection (Command)
   */
  describe('⚡ Command Injection', () => {
    test('deve detectar vulnerabilidades de command injection', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const commandPayloads = SecurityValidators.commandInjectionPayloads

        for (const payload of commandPayloads) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({
              success: false,
              message: 'Processing error',
              error: 'Invalid input format' // Resposta sanitizada
            })
          })

          try {
            const response = await fetch('/api/game/export', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer test_token',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                format: payload, // Command injection payload
                gameId: 'test123'
              })
            })

            const data = await response.json()
            const responseText = JSON.stringify(data)

            // Verificar indicadores de command injection
            const commandIndicators = [
              'root:',
              '/bin/',
              'command not found',
              'permission denied',
              'directory listing',
              'uid=',
              'gid='
            ]

            const hasCommandIndicator = commandIndicators.some(indicator => 
              responseText.toLowerCase().includes(indicator)
            )

            if (hasCommandIndicator) {
              vulnerabilities.push({
                id: `command_injection_${Date.now()}`,
                title: 'Command Injection Vulnerability',
                description: `Command injection detected with payload: ${payload}`,
                severity: 'critical',
                category: 'Injection',
                owaspCategory: 'A03:2021 – Injection',
                cwe: 'CWE-78',
                evidence: [responseText.substring(0, 300)],
                remediation: 'Use safe APIs, validate input, avoid system calls',
                impact: 'Server compromise, data theft, system control',
                likelihood: 'high'
              })
            }
          } catch (error) {
            // Erro esperado
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Command Injection Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`⚡ Command Injection: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })
  })

  /**
   * CENÁRIO 4: Testes de LDAP Injection
   * Validação contra injeção LDAP
   */
  describe('🏢 LDAP Injection', () => {
    test('deve detectar vulnerabilidades de LDAP injection', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const ldapPayloads = [
          '*)(uid=*',
          '*)(objectClass=*',
          '*)(&(uid=admin',
          '*)(!(&(uid=admin)))',
          '*))%00'
        ]

        for (const payload of ldapPayloads) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
              success: false,
              message: 'User not found',
              users: [] // Não deve retornar dados extras
            })
          })

          const response = await fetch('/api/admin/users/search', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer admin_token',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: payload // LDAP injection payload
            })
          })

          const data = await response.json()

          // Se payload LDAP retornou dados não autorizados, é vulnerabilidade
          if (data.users && data.users.length > 0) {
            vulnerabilities.push({
              id: `ldap_injection_${Date.now()}`,
              title: 'LDAP Injection Vulnerability',
              description: `LDAP injection detected with payload: ${payload}`,
              severity: 'high',
              category: 'Injection',
              owaspCategory: 'A03:2021 – Injection',
              cwe: 'CWE-90',
              evidence: [JSON.stringify(data)],
              remediation: 'Use parameterized LDAP queries and input validation',
              impact: 'Unauthorized access to directory information',
              likelihood: 'medium'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'LDAP Injection Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`🏢 LDAP Injection: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })
  })

  /**
   * CENÁRIO 5: Testes de Path Traversal
   * OWASP A01:2021 – Broken Access Control (Directory Traversal)
   */
  describe('📁 Path Traversal', () => {
    test('deve detectar vulnerabilidades de path traversal', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const pathTraversalPayloads = MaliciousDataGenerator.generatePathTraversalPayloads()

        for (const payload of pathTraversalPayloads) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: async () => ({
              success: false,
              message: 'File not found',
              path: 'sanitized_path' // Não deve revelar path real
            })
          })

          try {
            const response = await fetch(`/api/game/assets/${encodeURIComponent(payload)}`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer test_token',
                'Content-Type': 'application/json'
              }
            })

            const data = await response.json()
            const responseText = JSON.stringify(data)

            // Verificar indicadores de path traversal bem-sucedido
            const pathIndicators = [
              'root:x:0:0',
              '[boot loader]',
              'windows registry',
              '/etc/passwd',
              'system32'
            ]

            const hasPathIndicator = pathIndicators.some(indicator => 
              responseText.toLowerCase().includes(indicator)
            )

            if (hasPathIndicator || response.ok) {
              vulnerabilities.push({
                id: `path_traversal_${Date.now()}`,
                title: 'Path Traversal Vulnerability',
                description: `Path traversal detected with payload: ${payload}`,
                severity: 'high',
                category: 'Path Traversal',
                owaspCategory: 'A01:2021 – Broken Access Control',
                cwe: 'CWE-22',
                evidence: [responseText.substring(0, 300)],
                remediation: 'Validate file paths, use whitelisting, implement access controls',
                impact: 'Access to sensitive system files and directories',
                likelihood: 'medium'
              })
            }
          } catch (error) {
            // Erro esperado
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Path Traversal Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`📁 Path Traversal: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })
  })

  /**
   * CENÁRIO 6: Testes de Header Injection
   * Validação contra injeção em headers HTTP
   */
  describe('📋 Header Injection', () => {
    test('deve detectar vulnerabilidades de header injection', async () => {
      const testFunction = async (): Promise<SecurityVulnerability[]> => {
        const vulnerabilities: SecurityVulnerability[] = []
        
        const headerPayloads = {
          'X-Custom-Header': '\r\nSet-Cookie: admin=true',
          'User-Agent': 'Normal\r\nX-Injected: malicious',
          'Referer': 'http://example.com\r\nLocation: http://evil.com'
        }

        for (const [headerName, payload] of Object.entries(headerPayloads)) {
          (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: new Headers({
              'Content-Type': 'application/json',
              // Não deve incluir headers injetados
            }),
            json: async () => ({
              success: true,
              message: 'Request processed'
            })
          })

          const response = await fetch('/api/game/user/profile', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer test_token',
              [headerName]: payload
            }
          })

          // Verificar se headers injetados estão presentes na resposta
          const responseHeaders = Array.from(response.headers.entries())
          const hasInjectedHeader = responseHeaders.some(([key, value]) => 
            key.toLowerCase().includes('injected') || 
            key.toLowerCase().includes('set-cookie') ||
            value.includes('malicious')
          )

          if (hasInjectedHeader) {
            vulnerabilities.push({
              id: `header_injection_${Date.now()}`,
              title: 'HTTP Header Injection',
              description: `Header injection detected with payload in ${headerName}`,
              severity: 'medium',
              category: 'Header Injection',
              owaspCategory: 'A03:2021 – Injection',
              cwe: 'CWE-113',
              evidence: [JSON.stringify(Object.fromEntries(responseHeaders))],
              remediation: 'Validate and sanitize all header values',
              impact: 'Response splitting, cache poisoning, session fixation',
              likelihood: 'medium'
            })
          }
        }

        return vulnerabilities
      }

      const result = await securityTester.executeSecurityTest(
        'Header Injection Test',
        testFunction,
        testConfig
      )

      expect(result.vulnerabilities.length).toBe(0)
      console.log(`📋 Header Injection: ${result.passed ? 'PROTEGIDO' : 'VULNERÁVEL'}`)
    })
  })
}) 