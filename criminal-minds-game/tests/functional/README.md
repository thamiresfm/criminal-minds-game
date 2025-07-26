# 🧪 Testes Funcionais Automatizados - Criminal Minds Game

## 📋 Visão Geral

Esta suíte de testes funcionais implementa **testes end-to-end (E2E)** seguindo os padrões da certificação **ISTQB CTAL-TAE** (Test Automation Engineer). Os testes validam todas as funcionalidades críticas do sistema de forma automatizada, simulando o comportamento real do usuário.

## 🎯 Objetivos dos Testes (ISTQB CTAL-TAE)

### **Capítulo 2 (Planejamento):**
- ✅ Cobertura de cenários de negócio críticos
- ✅ Validação de requisitos funcionais
- ✅ Testes baseados em jornadas do usuário

### **Capítulo 3 (Arquitetura):**
- ✅ Implementação do padrão **Page Object Model**
- ✅ Separação clara entre lógica de teste e interface
- ✅ Reutilização de componentes de teste

### **Capítulo 5 (Implementação):**
- ✅ Testes isolados e independentes
- ✅ Dados de teste gerenciados externamente
- ✅ Mocks e stubs apropriados

### **Capítulo 6 (Execução):**
- ✅ Integração com CI/CD
- ✅ Execução paralela em múltiplos browsers
- ✅ Relatórios detalhados com evidências

### **Capítulo 7 (Manutenção):**
- ✅ Código limpo e bem documentado
- ✅ Locators robustos e maintíveis
- ✅ Tratamento de elementos dinâmicos

### **Capítulo 8 (Qualidade):**
- ✅ Métricas de cobertura e performance
- ✅ Validação de acessibilidade básica
- ✅ Testes de responsividade

### **Capítulo 9 (Adoção/Transição):**
- ✅ Documentação completa para equipe
- ✅ Evidências visuais (screenshots/vídeos)
- ✅ Processo de onboarding definido

## 🏗️ Arquitetura dos Testes

### **Estrutura de Diretórios**
```
tests/functional/
├── pages/                    # Page Object Models
│   ├── HomePage.ts          # Página inicial
│   ├── InvestigationPage.ts # Página de investigação
│   └── LobbyPage.ts         # Página do lobby
├── fixtures/                # Dados de teste
├── utils/                   # Utilitários compartilhados
├── .auth/                   # Estados de autenticação
├── accusation-flow.spec.ts  # Testes principais de acusação
├── navigation-flow.spec.ts  # Testes de navegação
├── global.setup.ts          # Setup global
├── global.teardown.ts       # Teardown global
└── README.md               # Esta documentação
```

### **Page Object Models**
Os Page Objects encapsulam elementos e ações de cada página:

- **HomePage**: Navegação principal e acesso às funcionalidades
- **InvestigationPage**: Modal de acusação e gameplay principal  
- **LobbyPage**: Gerenciamento de jogos e sessões

## 🔧 Configuração e Execução

### **Pré-requisitos**
```bash
# Instalar dependências do Playwright
npm run playwright:install

# Verificar se aplicação está rodando
npm run dev  # Em terminal separado
```

### **Executar Testes**

```bash
# Todos os testes funcionais
npm run test:functional

# Testes com interface visual
npm run test:e2e:ui

# Testes com browser visível (debug)
npm run test:e2e:headed

# Debug passo a passo
npm run test:e2e:debug

# Executar suite completa
npm run test:all
```

### **Configuração de Ambiente**

Os testes usam as seguintes configurações:

- **URL Base**: `http://localhost:3000`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Viewport**: 1280x720 (desktop), 375x667 (mobile)
- **Timeout**: 60 segundos por teste
- **Retries**: 2 tentativas em CI/CD

## 📊 Casos de Teste Implementados

### **1. Sistema de Acusação (accusation-flow.spec.ts)**

| Teste | Cenário | Resultado Esperado |
|-------|---------|-------------------|
| **Acusação Correta** | Jogador seleciona suspeito correto | Vitória e redirecionamento |
| **Acusação Incorreta** | Jogador seleciona suspeito errado | Derrota e game over |
| **Validação de Formulário** | Submissão sem suspeito selecionado | Validação impede submissão |
| **Contador de Caracteres** | Digitação na justificativa | Contador atualiza em tempo real |
| **Cancelamento** | Usuário cancela acusação | Modal fecha sem efeitos |
| **Fluxo E2E Completo** | Navegação → Jogo → Resultado | Fluxo completo sem erros |
| **Responsividade** | Diferentes resoluções | Interface funcional em todos os tamanhos |
| **Acessibilidade** | Navegação por teclado e labels | Elementos acessíveis |
| **Recuperação de Erros** | Falha de rede | Sistema se recupera graciosamente |

### **2. Sistema de Navegação (navigation-flow.spec.ts)**

| Teste | Cenário | Resultado Esperado |
|-------|---------|-------------------|
| **Navegação Principal** | Home → Lobby | Redirecionamento correto |
| **Configurações** | Acesso e retorno | Navegação bidirecional |
| **Acesso Direto** | URL direta para investigação | Página carrega corretamente |
| **Fluxo Completo** | Home → Lobby → Jogo → Resultado | Jornada completa funcional |
| **Múltiplas Abas** | Sessões simultâneas | Funcionamento independente |
| **Parâmetros URL** | URLs com query params | Parâmetros preservados |
| **URLs Inválidas** | Rotas inexistentes | Tratamento de erro apropriado |
| **Métodos de Navegação** | Clique, URL, back/forward | Todos os métodos funcionam |
| **Mobile** | Navegação em dispositivos móveis | Interface responsiva |
| **Performance** | Tempo de carregamento | Carregamento < 3 segundos |
| **Estado Persistente** | localStorage entre páginas | Estado mantido durante navegação |

## 📈 Métricas e Relatórios

### **Relatórios Gerados**
- **HTML Report**: `test-results/html-report/index.html`
- **JSON Results**: `test-results/results.json`
- **JUnit XML**: `test-results/junit.xml`
- **Screenshots**: `test-results/screenshots/`
- **Videos**: `test-results/videos/` (apenas em falhas)

### **Métricas Coletadas**
- ✅ Taxa de sucesso dos testes
- ✅ Tempo de execução por teste
- ✅ Performance de carregamento
- ✅ Cobertura de cenários críticos
- ✅ Detecção de regressões

### **Evidências de Teste**
Cada teste gera evidências automáticas:
- **Screenshots** em pontos críticos
- **Videos** de falhas para debug
- **Traces** completos para análise
- **Logs** detalhados de execução

## 🎯 Cenários de Negócio Cobertos

### **Críticos (P1)**
- ✅ Fazer acusação e vencer o jogo
- ✅ Fazer acusação e perder o jogo
- ✅ Navegação entre páginas principais
- ✅ Validação de formulários obrigatórios

### **Importantes (P2)**
- ✅ Cancelamento de ações
- ✅ Responsividade mobile
- ✅ Performance de carregamento
- ✅ Recuperação de erros

### **Adicionais (P3)**
- ✅ Acessibilidade básica
- ✅ Múltiplas sessões
- ✅ URLs com parâmetros
- ✅ Estado persistente

## 🚀 Integração CI/CD

### **Pipeline de Testes**
```yaml
# Exemplo de configuração CI/CD
- name: Run Functional Tests
  run: |
    npm ci
    npm run playwright:install
    npm run dev &
    npm run test:functional
    
- name: Upload Test Results
  uses: actions/upload-artifact@v3
  with:
    name: test-results
    path: test-results/
```

### **Ambientes de Teste**
- **Development**: Testes locais durante desenvolvimento
- **Staging**: Validação antes de produção
- **CI/CD**: Execução automática em pipelines

## 🔄 Manutenção e Evolução

### **Boas Práticas Implementadas**
- ✅ **Locators robustos**: Uso de data-testid quando possível
- ✅ **Waits apropriados**: Aguardar elementos em vez de timeouts fixos
- ✅ **Isolamento**: Cada teste é independente
- ✅ **Limpeza**: Setup/teardown apropriados
- ✅ **Documentação**: Comentários e documentação inline

### **Padrões de Nomenclatura**
- **Testes**: `deve [ação] [resultado esperado]`
- **Page Objects**: `[Nome]Page.ts`
- **Métodos**: Verbos que descrevem ações (`goto`, `verify`, `submit`)
- **Locators**: Nomes descritivos (`accusationButton`, `modalTitle`)

### **Estratégia de Evolução**
1. **Cobertura incremental**: Adicionar novos cenários conforme necessário
2. **Refatoração contínua**: Melhorar Page Objects e utilitários
3. **Monitoramento**: Acompanhar métricas de estabilidade
4. **Feedback**: Incorporar feedback da equipe de desenvolvimento

## 📞 Suporte e Troubleshooting

### **Problemas Comuns**
1. **Timeout errors**: Verificar se aplicação está rodando
2. **Element not found**: Verificar se locators estão atualizados
3. **Flaky tests**: Revisar waits e condições de corrida
4. **Performance issues**: Verificar recursos do sistema

### **Debug**
```bash
# Executar com debug visual
npm run test:e2e:debug

# Ver relatório HTML
open test-results/html-report/index.html

# Logs detalhados
DEBUG=pw:api npm run test:functional
```

### **Contato**
Para dúvidas sobre os testes funcionais:
- 📧 Email: equipe-qa@criminalmindsgame.com
- 📚 Documentação: [Wiki interno]
- 🔧 Issues: [Sistema de tickets]

---

## 🏆 Certificação ISTQB CTAL-TAE

Esta implementação segue rigorosamente os padrões da certificação **ISTQB Certified Tester Advanced Level - Test Automation Engineer**, garantindo:

- ✅ **Planejamento**: Casos de teste baseados em requisitos
- ✅ **Arquitetura**: Design patterns apropriados
- ✅ **Implementação**: Código maintível e reutilizável  
- ✅ **Execução**: Integração com pipelines CI/CD
- ✅ **Manutenção**: Estratégias de evolução definidas
- ✅ **Qualidade**: Métricas e evidências coletadas
- ✅ **Adoção**: Documentação e treinamento disponível

**Status**: ✅ **IMPLEMENTAÇÃO COMPLETA E VALIDADA** 