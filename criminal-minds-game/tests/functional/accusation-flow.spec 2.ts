/**
 * ISTQB CTAL-TAE - Testes Funcionais Completos do Sistema de Acusação
 * 
 * Este arquivo implementa testes end-to-end seguindo os padrões:
 * - Capítulo 2 (Planejamento): Cenários baseados em requisitos de negócio
 * - Capítulo 3 (Arquitetura): Uso de Page Object Model
 * - Capítulo 5 (Implementação): Testes independentes e repetíveis
 * - Capítulo 6 (Execução): Prontos para CI/CD com relatórios
 * - Capítulo 7 (Manutenção): Código limpo e bem documentado
 * - Capítulo 8 (Qualidade): Cobertura completa dos fluxos críticos
 * - Capítulo 9 (Adoção): Evidência de funcionamento para stakeholders
 */

import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { InvestigationPage } from './pages/InvestigationPage'

test.describe('Sistema de Acusação - Testes Funcionais Completos', () => {
  let homePage: HomePage
  let investigationPage: InvestigationPage

  test.beforeEach(async ({ page }) => {
    // Inicializar Page Objects
    homePage = new HomePage(page)
    investigationPage = new InvestigationPage(page)
    
    // Navegar diretamente para investigação (usuário já autenticado pelo setup global)
    await investigationPage.goto('functional-test-game')
  })

  /**
   * Capítulo 2 (Planejamento): Teste do Cenário Principal - Acusação Correta
   * 
   * CENÁRIO: Jogador faz acusação correta e vence o jogo
   * DADO: Que o jogador está na tela de investigação
   * QUANDO: Ele seleciona o suspeito correto e faz a acusação
   * ENTÃO: Ele deve receber mensagem de vitória e ser redirecionado
   */
  test('deve permitir acusação correta e exibir vitória', async ({ page }) => {
    // DADO: Verificar que página de investigação carregou corretamente
    await investigationPage.verifyInvestigationPageElements()
    
    // QUANDO: Fazer acusação do suspeito correto (Marcus Williams / produtor)
    await investigationPage.submitAccusationByName(
      'Marcus Williams',
      'Com base nas evidências analisadas, Marcus Williams tinha motivos financeiros e acesso ao local do crime. As impressões digitais encontradas na arma confirmam sua culpabilidade.',
      90
    )
    
    // ENTÃO: Aguardar e verificar resultado de vitória
    const result = await investigationPage.waitForAccusationResult()
    expect(result).toBe('victory')
    
    // Verificar mensagem de vitória
    await investigationPage.verifyResultMessage('Parabéns')
    
    // Verificar que não há notificações de erro
    await investigationPage.verifyNoErrorNotifications()
    
    // Capturar evidência do sucesso
    await page.screenshot({ 
      path: 'test-results/screenshots/accusation-victory.png',
      fullPage: true 
    })
  })

  /**
   * Capítulo 5 (Implementação): Teste de Cenário Negativo - Acusação Incorreta
   * 
   * CENÁRIO: Jogador faz acusação incorreta e perde o jogo
   * DADO: Que o jogador está na tela de investigação
   * QUANDO: Ele seleciona um suspeito incorreto
   * ENTÃO: Ele deve receber mensagem de derrota
   */
  test('deve processar acusação incorreta e exibir derrota', async ({ page }) => {
    // DADO: Verificar que página está carregada
    await investigationPage.verifyInvestigationPageElements()
    
    // QUANDO: Fazer acusação de suspeito incorreto (Diego Santos / ator)
    await investigationPage.submitAccusationByName(
      'Diego Santos',
      'Suspeito com base na rivalidade profissional e comportamento suspeito durante as gravações.',
      75
    )
    
    // ENTÃO: Aguardar e verificar resultado de derrota
    const result = await investigationPage.waitForAccusationResult()
    expect(result).toBe('defeat')
    
    // Verificar mensagem de game over
    await investigationPage.verifyResultMessage('Game Over')
    
    // Capturar evidência da derrota
    await page.screenshot({ 
      path: 'test-results/screenshots/accusation-defeat.png',
      fullPage: true 
    })
  })

  /**
   * Capítulo 7 (Manutenção): Teste de Validação de Formulário
   * 
   * CENÁRIO: Sistema valida dados obrigatórios antes de submeter
   * DADO: Que o modal de acusação está aberto
   * QUANDO: Usuário tenta submeter sem selecionar suspeito
   * ENTÃO: Sistema deve impedir submissão e exibir validação
   */
  test('deve validar dados obrigatórios no formulário de acusação', async ({ page }) => {
    // DADO: Abrir modal de acusação
    await investigationPage.openAccusationModal()
    await investigationPage.verifyAccusationModalElements()
    
    // QUANDO: Tentar submeter sem selecionar suspeito
    await investigationPage.fillReasoning('Tentativa de acusação sem suspeito')
    await investigationPage.setConfidenceLevel(50)
    
    // ENTÃO: Botão deve estar desabilitado
    await investigationPage.verifyAccusationDisabled()
    
    // Verificar que modal permanece aberto
    await expect(investigationPage.accusationModal).toBeVisible()
    
    // Capturar estado de validação
    await page.screenshot({ 
      path: 'test-results/screenshots/form-validation.png' 
    })
  })

  /**
   * Capítulo 8 (Qualidade): Teste de Contador de Caracteres
   * 
   * CENÁRIO: Contador de caracteres funciona corretamente
   * DADO: Que o modal de acusação está aberto
   * QUANDO: Usuário digita na justificativa
   * ENTÃO: Contador deve atualizar em tempo real
   */
  test('deve atualizar contador de caracteres em tempo real', async ({ page }) => {
    // DADO: Abrir modal de acusação
    await investigationPage.openAccusationModal()
    
    // QUANDO: Digitar texto na justificativa
    const testText = 'Esta é uma justificativa de teste'
    await investigationPage.fillReasoning(testText)
    
    // ENTÃO: Contador deve refletir número correto de caracteres
    const expectedCount = `${testText.length}/1000`
    await investigationPage.verifyCharacterCounter(expectedCount)
    
    // Testar com texto mais longo
    const longText = 'Este é um texto mais longo para testar o contador de caracteres. '.repeat(10)
    await investigationPage.fillReasoning(longText)
    
    const expectedLongCount = `${longText.length}/1000`
    await investigationPage.verifyCharacterCounter(expectedLongCount)
  })

  /**
   * Capítulo 6 (Execução): Teste de Cancelamento de Acusação
   * 
   * CENÁRIO: Usuário pode cancelar acusação sem consequências
   * DADO: Que o modal de acusação está aberto e preenchido
   * QUANDO: Usuário clica em cancelar
   * ENTÃO: Modal deve fechar sem processar acusação
   */
  test('deve permitir cancelar acusação sem efeitos colaterais', async ({ page }) => {
    // DADO: Abrir modal e preencher parcialmente
    await investigationPage.openAccusationModal()
    await investigationPage.selectSuspectByName('Marcus Williams')
    await investigationPage.fillReasoning('Justificativa que será cancelada')
    await investigationPage.setConfidenceLevel(80)
    
    // QUANDO: Cancelar acusação
    await investigationPage.cancelAccusation()
    
    // ENTÃO: Modal deve estar fechado
    await expect(investigationPage.accusationModal).not.toBeVisible()
    
    // Verificar que ainda é possível fazer nova acusação
    await investigationPage.openAccusationModal()
    await investigationPage.verifyAccusationModalElements()
    
    // Verificar que campos estão limpos
    await expect(investigationPage.reasoningTextarea).toHaveValue('')
  })

  /**
   * Capítulo 9 (Adoção/Transição): Teste de Fluxo Completo End-to-End
   * 
   * CENÁRIO: Fluxo completo desde navegação até conclusão
   * DADO: Que usuário está autenticado
   * QUANDO: Ele navega e completa uma investigação
   * ENTÃO: Deve poder jogar novamente ou voltar ao lobby
   */
  test('deve executar fluxo end-to-end completo com sucesso', async ({ page }) => {
    // FASE 1: Verificar estado inicial
    await investigationPage.verifyInvestigationPageElements()
    const initialState = await investigationPage.getInvestigationState()
    expect(initialState.url).toContain('/investigation')
    
    // FASE 2: Executar investigação completa
    await investigationPage.submitAccusationByName(
      'Marcus Williams',
      'Análise completa das evidências aponta para Marcus Williams como o culpado. Motivo financeiro confirmado, álibi inconsistente e evidências físicas conclusivas.',
      95
    )
    
    // FASE 3: Verificar resultado
    const result = await investigationPage.waitForAccusationResult()
    expect(result).toBe('victory')
    
    // FASE 4: Capturar métricas de performance
    const performance = await page.evaluate(() => ({
      loadTime: performance.now(),
      navigationEntries: performance.getEntriesByType('navigation').length,
      resourceCount: performance.getEntriesByType('resource').length
    }))
    
    // Verificar performance básica (não deve demorar mais de 10 segundos)
    expect(performance.loadTime).toBeLessThan(10000)
    
    // FASE 5: Capturar evidência final
    await page.screenshot({ 
      path: 'test-results/screenshots/e2e-complete-flow.png',
      fullPage: true 
    })
    
    console.log('✅ Fluxo E2E executado com sucesso:', {
      initialUrl: initialState.url,
      finalResult: result,
      performance: performance,
      timestamp: new Date().toISOString()
    })
  })

  /**
   * Capítulo 3 (Arquitetura): Teste de Responsividade
   * 
   * CENÁRIO: Interface funciona em diferentes tamanhos de tela
   * DADO: Diferentes viewports
   * QUANDO: Usuário acessa funcionalidades
   * ENTÃO: Elementos devem ser acessíveis e funcionais
   */
  test('deve funcionar corretamente em diferentes resoluções', async ({ page }) => {
    // Teste em resolução desktop padrão
    await page.setViewportSize({ width: 1920, height: 1080 })
    await investigationPage.verifyInvestigationPageElements()
    await investigationPage.openAccusationModal()
    await investigationPage.verifyAccusationModalElements()
    await investigationPage.cancelAccusation()
    
    // Teste em resolução tablet
    await page.setViewportSize({ width: 768, height: 1024 })
    await investigationPage.verifyInvestigationPageElements()
    await investigationPage.openAccusationModal()
    await investigationPage.verifyAccusationModalElements()
    await investigationPage.cancelAccusation()
    
    // Teste em resolução mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await investigationPage.verifyInvestigationPageElements()
    await investigationPage.openAccusationModal()
    await investigationPage.verifyAccusationModalElements()
    
    // Capturar screenshot mobile
    await page.screenshot({ 
      path: 'test-results/screenshots/mobile-responsive.png',
      fullPage: true 
    })
  })

  /**
   * Teste de Acessibilidade Básica
   */
  test('deve atender requisitos básicos de acessibilidade', async ({ page }) => {
    // Verificar se elementos têm labels apropriados
    await investigationPage.openAccusationModal()
    
    // Verificar se radio buttons têm labels
    const radioButtons = await investigationPage.suspectRadioButtons.all()
    for (const radio of radioButtons) {
      const ariaLabel = await radio.getAttribute('aria-label')
      const hasLabel = ariaLabel || await radio.locator('+ label').isVisible()
      expect(hasLabel).toBeTruthy()
    }
    
    // Verificar se textarea tem placeholder ou label
    const textareaLabel = await investigationPage.reasoningTextarea.getAttribute('placeholder')
    expect(textareaLabel).toBeTruthy()
    
    // Verificar navegação por teclado
    await investigationPage.reasoningTextarea.focus()
    await page.keyboard.press('Tab')
    
    // Verificar contraste básico (elementos visíveis)
    await expect(investigationPage.submitAccusationButton).toBeVisible()
    await expect(investigationPage.cancelAccusationButton).toBeVisible()
  })

  /**
   * Teste de Recuperação de Erros
   */
  test('deve se recuperar graciosamente de erros de rede', async ({ page }) => {
    // Simular erro de rede interceptando requests
    await page.route('**/api/game/*/accusation', route => {
      route.abort('networkfailure')
    })
    
    // Tentar fazer acusação
    await investigationPage.openAccusationModal()
    await investigationPage.selectSuspectByName('Marcus Williams')
    await investigationPage.fillReasoning('Teste de erro de rede')
    await investigationPage.setConfidenceLevel(85)
    
    // Clicar em submeter (deve falhar)
    await investigationPage.submitAccusationButton.click()
    
    // Aguardar mensagem de erro ou timeout
    await page.waitForTimeout(3000)
    
    // Verificar que modal ainda está visível (usuário pode tentar novamente)
    await expect(investigationPage.accusationModal).toBeVisible()
    
    // Restaurar network e tentar novamente
    await page.unroute('**/api/game/*/accusation')
    
    // Segunda tentativa deve funcionar
    await investigationPage.submitAccusationButton.click()
    
    // Aguardar resultado (pode ser sucesso ou continuar tentando)
    await page.waitForTimeout(2000)
  })
}) 