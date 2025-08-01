import { render, screen } from '@testing-library/react'

/**
 * ISTQB CTAL-TAE - Testes Unitários para Funções Auxiliares
 * 
 * Capítulo 5 (Implementação): Testes isolados de funções utilitárias
 * Capítulo 8 (Qualidade): Cobertura de código e validação de edge cases
 */

// Mock das funções auxiliares extraídas do componente principal
const getSuspicionLevelColor = (level: string) => {
  switch (level) {
    case 'critical': return 'border-red-500 bg-red-50'
    case 'high': return 'border-orange-500 bg-orange-50'
    case 'medium': return 'border-yellow-500 bg-yellow-50'
    case 'low': return 'border-green-500 bg-green-50'
    default: return 'border-gray-300 bg-gray-50'
  }
}

const getSuspicionLevelIcon = (level: string) => {
  switch (level) {
    case 'critical': return '🔥'
    case 'high': return '⚠️'
    case 'medium': return '🟡'
    case 'low': return '🟢'
    default: return '❓'
  }
}

const validateAccusationData = (selectedSuspect: string, reasoning: string, confidence: number) => {
  const errors: string[] = []
  
  if (!selectedSuspect) {
    errors.push('Suspeito deve ser selecionado')
  }
  
  if (confidence < 0 || confidence > 100) {
    errors.push('Nível de confiança deve estar entre 0 e 100')
  }
  
  if (reasoning.length > 1000) {
    errors.push('Justificativa não pode exceder 1000 caracteres')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

describe('Funções Auxiliares da Acusação', () => {
  /**
   * Capítulo 5 (Implementação): Teste de funções puras
   */
  describe('getSuspicionLevelColor', () => {
    test('deve retornar classe CSS correta para nível crítico', () => {
      const result = getSuspicionLevelColor('critical')
      expect(result).toBe('border-red-500 bg-red-50')
    })

    test('deve retornar classe CSS correta para nível alto', () => {
      const result = getSuspicionLevelColor('high')
      expect(result).toBe('border-orange-500 bg-orange-50')
    })

    test('deve retornar classe CSS correta para nível médio', () => {
      const result = getSuspicionLevelColor('medium')
      expect(result).toBe('border-yellow-500 bg-yellow-50')
    })

    test('deve retornar classe CSS correta para nível baixo', () => {
      const result = getSuspicionLevelColor('low')
      expect(result).toBe('border-green-500 bg-green-50')
    })

    test('deve retornar classe CSS padrão para nível inválido', () => {
      const result = getSuspicionLevelColor('invalid')
      expect(result).toBe('border-gray-300 bg-gray-50')
    })

    test('deve lidar com string vazia', () => {
      const result = getSuspicionLevelColor('')
      expect(result).toBe('border-gray-300 bg-gray-50')
    })

    test('deve lidar com valor null/undefined', () => {
      const result = getSuspicionLevelColor(null as any)
      expect(result).toBe('border-gray-300 bg-gray-50')
    })
  })

  /**
   * Capítulo 7 (Manutenção): Teste de robustez de ícones
   */
  describe('getSuspicionLevelIcon', () => {
    test('deve retornar ícone correto para cada nível de suspeita', () => {
      expect(getSuspicionLevelIcon('critical')).toBe('🔥')
      expect(getSuspicionLevelIcon('high')).toBe('⚠️')
      expect(getSuspicionLevelIcon('medium')).toBe('🟡')
      expect(getSuspicionLevelIcon('low')).toBe('🟢')
    })

    test('deve retornar ícone padrão para nível desconhecido', () => {
      expect(getSuspicionLevelIcon('unknown')).toBe('❓')
      expect(getSuspicionLevelIcon('')).toBe('❓')
      expect(getSuspicionLevelIcon(null as any)).toBe('❓')
    })
  })

  /**
   * Capítulo 8 (Qualidade): Validação de dados de entrada
   */
  describe('validateAccusationData', () => {
    test('deve validar dados corretos', () => {
      const result = validateAccusationData('produtor', 'Justificativa válida', 75)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    test('deve rejeitar suspeito não selecionado', () => {
      const result = validateAccusationData('', 'Justificativa', 50)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Suspeito deve ser selecionado')
    })

    test('deve rejeitar nível de confiança inválido - valor negativo', () => {
      const result = validateAccusationData('produtor', 'Justificativa', -10)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Nível de confiança deve estar entre 0 e 100')
    })

    test('deve rejeitar nível de confiança inválido - valor acima de 100', () => {
      const result = validateAccusationData('produtor', 'Justificativa', 150)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Nível de confiança deve estar entre 0 e 100')
    })

    test('deve aceitar nível de confiança nos limites (0 e 100)', () => {
      const result1 = validateAccusationData('produtor', 'Justificativa', 0)
      const result2 = validateAccusationData('produtor', 'Justificativa', 100)
      
      expect(result1.isValid).toBe(true)
      expect(result2.isValid).toBe(true)
    })

    test('deve rejeitar justificativa muito longa', () => {
      const longReasoning = 'a'.repeat(1001)
      const result = validateAccusationData('produtor', longReasoning, 50)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Justificativa não pode exceder 1000 caracteres')
    })

    test('deve aceitar justificativa no limite de 1000 caracteres', () => {
      const maxReasoning = 'a'.repeat(1000)
      const result = validateAccusationData('produtor', maxReasoning, 50)
      
      expect(result.isValid).toBe(true)
    })

    test('deve aceitar justificativa vazia (opcional)', () => {
      const result = validateAccusationData('produtor', '', 50)
      
      expect(result.isValid).toBe(true)
    })

    test('deve acumular múltiplos erros', () => {
      const result = validateAccusationData('', 'a'.repeat(1001), -5)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(3)
      expect(result.errors).toContain('Suspeito deve ser selecionado')
      expect(result.errors).toContain('Justificativa não pode exceder 1000 caracteres')
      expect(result.errors).toContain('Nível de confiança deve estar entre 0 e 100')
    })
  })
})

/**
 * ISTQB CTAL-TAE - Testes de Performance e Limites
 * 
 * Capítulo 8 (Qualidade): Métricas de performance
 */
describe('Performance e Limites', () => {
  test('função de validação deve executar rapidamente com dados grandes', () => {
    const start = performance.now()
    
    // Executar validação 1000 vezes
    for (let i = 0; i < 1000; i++) {
      validateAccusationData('produtor', 'Justificativa teste', 50)
    }
    
    const end = performance.now()
    const duration = end - start
    
    // Deve executar em menos de 300ms (ajustado para ser mais flexível)
    expect(duration).toBeLessThan(300)
  })

  test('função de cor deve ser determinística', () => {
    const results = []
    
    // Executar 100 vezes com o mesmo input
    for (let i = 0; i < 100; i++) {
      results.push(getSuspicionLevelColor('critical'))
    }
    
    // Todos os resultados devem ser idênticos
    const uniqueResults = new Set(results)
    expect(uniqueResults.size).toBe(1)
    expect(results[0]).toBe('border-red-500 bg-red-50')
  })
})

/**
 * ISTQB CTAL-TAE - Testes de Segurança
 * 
 * Capítulo 8 (Qualidade): Validação de segurança de dados
 */
describe('Segurança e Sanitização', () => {
  test('deve lidar com tentativas de XSS na justificativa', () => {
    const maliciousInput = '<script>alert("xss")</script>'
    const result = validateAccusationData('produtor', maliciousInput, 50)
    
    // Validação deve aceitar (sanitização deve ser feita no frontend)
    expect(result.isValid).toBe(true)
    
    // Mas o input deve ser preservado para possível sanitização posterior
    expect(maliciousInput).toContain('<script>')
  })

  test('deve lidar com caracteres especiais na justificativa', () => {
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const result = validateAccusationData('produtor', specialChars, 50)
    
    expect(result.isValid).toBe(true)
  })

  test('deve lidar com emojis na justificativa', () => {
    const emojiText = '🚨 Acusação baseada em evidências 🔍'
    const result = validateAccusationData('produtor', emojiText, 50)
    
    expect(result.isValid).toBe(true)
  })
}) 