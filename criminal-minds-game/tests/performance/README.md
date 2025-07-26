# 🚀 Testes de Performance de API - Criminal Minds Game

## Visão Geral

Esta suíte implementa testes de performance abrangentes para as APIs do jogo Criminal Minds, seguindo rigorosamente os padrões **ISTQB CTAL-TAE** (Certified Tester Advanced Level - Test Automation Engineer).

### 📋 Estrutura da Implementação

```
tests/performance/
├── README.md                        # Este arquivo
├── performance-utils.ts             # Utilitários base para medição
├── accusation-performance.test.ts   # Testes da API de acusação
├── suspects-performance.test.ts     # Testes da API de suspeitos
├── load-stress.test.ts             # Testes de carga e stress integrados
└── metrics-collector.test.ts       # Sistema avançado de métricas
```

## 🎯 Objetivos dos Testes (ISTQB Capítulo 2 - Planejamento)

### Requisitos de Performance Validados

| Métrica | SLA Definido | Objetivo |
|---------|--------------|----------|
| **Tempo de Resposta Individual** | < 500ms | Experiência fluida |
| **Throughput Mínimo** | > 20 req/s | Suporte múltiplos usuários |
| **Taxa de Sucesso** | > 95% | Confiabilidade |
| **P95 Response Time** | < 2s | Consistência |
| **P99 Response Time** | < 5s | Experiência extrema |
| **Disponibilidade** | > 99% | Continuidade do serviço |

### Cenários de Teste Cobertos

1. **Performance Básica** - Baseline individual
2. **Carga Leve** - 10-20 usuários simultâneos
3. **Carga Média** - 25-50 usuários simultâneos
4. **Carga Pesada** - 50-100 usuários simultâneos
5. **Stress Test** - 100+ usuários (teste de limites)
6. **Capacidade Sustentada** - Carga contínua prolongada
7. **Recuperação** - Comportamento pós-stress

## 🏗️ Arquitetura (ISTQB Capítulo 3)

### Padrões Implementados

- **Page Object Model** para organização
- **Factory Pattern** para criação de cenários
- **Strategy Pattern** para diferentes tipos de teste
- **Observer Pattern** para coleta de métricas
- **Builder Pattern** para configuração de testes

### Separação de Responsabilidades

```typescript
PerformanceMeasurer    // Coleta métricas individuais
LoadTester            // Executa testes de carga
PerformanceValidator  // Valida SLAs
PerformanceReporter   // Gera relatórios
AdvancedMetricsCollector // Análise avançada
```

## 🔧 Implementação (ISTQB Capítulo 5)

### Tecnologias Utilizadas

- **Jest** - Framework de testes
- **TypeScript** - Tipagem estática
- **Performance API** - Medição precisa de tempo
- **Promise.allSettled** - Execução paralela
- **Mock Strategy** - Isolamento de dependências

### Configuração dos Testes

```javascript
// jest.config.js
module.exports = {
  testTimeout: 120000, // 2 minutos para performance
  maxConcurrency: 1,   // Evitar interferência
  verbose: true,       // Logs detalhados
  // ... outras configurações
}
```

## ⚡ Execução (ISTQB Capítulo 6)

### Scripts Disponíveis

```bash
# Todos os testes de performance
npm run test:performance

# Testes específicos
npm run test:performance:accusation  # API de acusação
npm run test:performance:suspects    # API de suspeitos  
npm run test:performance:load        # Carga e stress
npm run test:performance:metrics     # Métricas avançadas

# Execução sequencial de todos
npm run test:performance:all

# Suite completa (unit + api + integration + e2e + performance)
npm run test:complete
```

### Integração CI/CD

```yaml
# .github/workflows/performance.yml
name: Performance Tests
on: [push, pull_request]
jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:performance
      - uses: actions/upload-artifact@v2
        with:
          name: performance-reports
          path: performance-reports/
```

## 🔍 Métricas Coletadas (ISTQB Capítulo 8)

### Métricas Básicas
- **Response Time** (médio, min, max, P50, P95, P99)
- **Throughput** (requisições por segundo)
- **Success Rate** (percentual de sucesso)
- **Error Rate** (percentual de erro)

### Métricas Avançadas
- **Resource Utilization** (CPU, memória, rede, I/O)
- **Error Analysis** (tipos, frequência, MTBF)
- **User Experience** (satisfação, abandono, conclusão)
- **Scalability** (fator de carga, degradação, recuperação)
- **Trends** (crescimento tempo resposta, degradação throughput)

### Exemplo de Relatório

```
=== RELATÓRIO DE PERFORMANCE DE API ===

Teste 1: Carga Leve - Acusações
Timestamp: 2024-01-15T10:30:00.000Z
Configuração: 10 concurrent, 50 requests

Métricas Principais:
  - Tempo de Resposta Médio: 245.67ms
  - Throughput: 18.45 req/s
  - Latência (Mediana): 220.12ms
  - Taxa de Sucesso: 98.00%
  - Taxa de Erro: 2.00%

Detalhes:
  - Min Response Time: 145.23ms
  - Max Response Time: 456.78ms
  - P95 Response Time: 398.45ms
  - P99 Response Time: 445.12ms
  - Requests/Second: 18.45
  - Total Requests: 50
  - Successful: 49
  - Failed: 1
```

## 🛠️ Manutenção (ISTQB Capítulo 7)

### Atualizações e Refatoração

1. **Versioning** - Controle de versão das métricas
2. **Baseline Management** - Gerenciamento de baselines
3. **Threshold Adjustment** - Ajuste automático de SLAs
4. **Test Maintenance** - Manutenção contínua dos testes

### Self-Healing Features

```typescript
// Auto-ajuste de timeouts baseado no histórico
const adaptiveTimeout = calculateOptimalTimeout(historicalData)

// Retry automático com backoff exponencial
const retryConfig = {
  retries: 3,
  backoff: 'exponential',
  factor: 2
}
```

## 📊 Qualidade e Validação (ISTQB Capítulo 8)

### Critérios de Aceitação

```typescript
// SLA Validations
expect(PerformanceValidator.validateResponseTime(metrics, 500)).toBe(true)
expect(PerformanceValidator.validateThroughput(metrics, 20)).toBe(true)
expect(PerformanceValidator.validateSuccessRate(metrics, 95)).toBe(true)
```

### Alertas Automáticos

- 🔴 **CRÍTICO**: Uso de recursos > 80%
- 🟡 **ATENÇÃO**: Degradação de performance > 20%
- 🟢 **OK**: Todas as métricas dentro do SLA

## 🚀 Adoção e Transição (ISTQB Capítulo 9)

### Implementação Gradual

1. **Fase 1** - Testes básicos de performance
2. **Fase 2** - Integração com CI/CD
3. **Fase 3** - Monitoramento contínuo
4. **Fase 4** - Alertas e automação

### Treinamento da Equipe

- Workshop sobre testes de performance
- Documentação detalhada dos SLAs
- Playbooks para resolução de problemas
- Revisões periódicas de métricas

## 📈 Exemplos de Uso

### Teste Simples de Performance

```typescript
test('deve processar acusação com performance adequada', async () => {
  const config = { concurrent: 10, requests: 30 }
  
  const testFunction = async () => {
    return accusationService.submitAccusation('game_123', {
      suspectId: 'suspect_001',
      reasoning: 'Test reasoning',
      confidence: 85
    })
  }

  const result = await loadTester.runLoadTest(testFunction, config)
  
  expect(result.metrics.responseTime).toBeLessThan(500)
  expect(result.metrics.successRate).toBeGreaterThan(95)
})
```

### Análise de Tendências

```typescript
const metrics = metricsCollector.generateAdvancedMetrics()

if (metrics.trends.responseTimeGrowth > 10) {
  console.warn('🟡 Performance degradando - investigar')
}

if (metrics.userExperience.satisfactionScore < 70) {
  console.error('🔴 Experiência do usuário comprometida')
}
```

## 🔗 Integração com Outras Suítes

Os testes de performance complementam:

- **Testes Unitários** - Validação de lógica individual
- **Testes de API** - Validação de contratos
- **Testes de Integração** - Validação de fluxos
- **Testes E2E** - Validação de experiência completa

## 📋 Checklist de Execução

- [ ] APIs funcionando corretamente
- [ ] Ambiente de teste preparado
- [ ] Baseline de performance estabelecida
- [ ] SLAs definidos e documentados
- [ ] Alertas configurados
- [ ] Relatórios sendo gerados
- [ ] Equipe treinada nos procedimentos

## 🔄 Ciclo de Melhoria Contínua

1. **Coleta** - Métricas de performance
2. **Análise** - Identificação de bottlenecks
3. **Ação** - Otimizações e correções
4. **Validação** - Confirmação de melhorias
5. **Monitoramento** - Acompanhamento contínuo

---

*Implementação baseada nos padrões ISTQB CTAL-TAE para garantir qualidade, manutenibilidade e eficácia dos testes de performance.* 