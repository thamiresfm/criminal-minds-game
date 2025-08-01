/**
 * ISTQB CTAL-TAE - Testes Funcionais de Navegação e Fluxos
 * 
 * Capítulo 2 (Planejamento): Testes de navegação crítica
 * Capítulo 6 (Execução): Validação de fluxos entre páginas
 * Capítulo 8 (Qualidade): Cobertura de jornadas do usuário
 */

import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { InvestigationPage } from './pages/InvestigationPage'

test.describe('Sistema de Navegação - Testes Funcionais', () => {
  let homePage: HomePage
  let investigationPage: InvestigationPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    investigationPage = new InvestigationPage(page)
  })

  /**
   * Teste de navegação principal desde home
   */
  test('deve navegar corretamente desde página inicial', async ({ page }) => {
    // DADO: Usuário está na página inicial
    await homePage.goto()
    await homePage.verifyPageElements()
    
    // QUANDO: Navega para lobby
    await homePage.goToLobby()
    
    // ENTÃO: Deve estar na página do lobby
    expect(page.url()).toContain('/lobby')
    
    // Verificar que página carregou sem erros
    await homePage.verifyNoErrors()
    
    // Capturar evidência
    await page.screenshot({ 
      path: 'test-results/screenshots/navigation-lobby.png' 
    })
  })

  /**
   * Teste de navegação para configurações
   */
  test('deve acessar configurações e retornar', async ({ page }) => {
    // DADO: Usuário está na home
    await homePage.goto()
    
    // QUANDO: Navega para configurações
    await homePage.goToSettings()
    
    // ENTÃO: Deve estar na página de configurações
    expect(page.url()).toContain('/settings')
    
    // QUANDO: Retorna à home
    await page.goBack()
    
    // ENTÃO: Deve estar de volta na home
    expect(page.url()).toBe('http://localhost:3000/')
    
    // Verificar que navegação não causou erros
    await homePage.verifyNoErrors()
  })

  /**
   * Teste de acesso direto à investigação
   */
  test('deve permitir acesso direto à investigação', async ({ page }) => {
    // QUANDO: Navega diretamente para investigação
    await investigationPage.goto('navigation-test-game')
    
    // ENTÃO: Página deve carregar corretamente
    await investigationPage.verifyInvestigationPageElements()
    
    // Verificar que todos os elementos críticos estão presentes
    await expect(investigationPage.accusationButton).toBeVisible()
    await expect(investigationPage.investigationMap).toBeVisible()
    
    // Capturar estado da página
    const state = await investigationPage.getInvestigationState()
    expect(state.url).toContain('/investigation')
    
    await page.screenshot({ 
      path: 'test-results/screenshots/direct-investigation-access.png',
      fullPage: true 
    })
  })

  /**
   * Teste de fluxo completo de jogo
   */
  test('deve executar fluxo completo: home → lobby → jogo → resultado', async ({ page }) => {
    // FASE 1: Começar na home
    await homePage.goto()
    const homeInfo = await homePage.getPageInfo()
    expect(homeInfo.url).toBe('http://localhost:3000/')
    
    // FASE 2: Ir ao lobby
    await homePage.goToLobby()
    expect(page.url()).toContain('/lobby')
    
    // FASE 3: Simular início de jogo (navegar para investigação)
    await investigationPage.goto('complete-flow-game')
    await investigationPage.verifyInvestigationPageElements()
    
    // FASE 4: Jogar e obter resultado
    await investigationPage.submitAccusationByName(
      'Marcus Williams',
      'Decisão baseada em análise completa das evidências disponíveis.',
      88
    )
    
    const result = await investigationPage.waitForAccusationResult()
    expect(result).toBe('victory')
    
    // FASE 5: Retornar ao lobby
    await investigationPage.returnToLobby()
    expect(page.url()).toContain('/lobby')
    
    // Capturar evidência do fluxo completo
    await page.screenshot({ 
      path: 'test-results/screenshots/complete-game-flow.png' 
    })
    
    console.log('✅ Fluxo completo executado:', {
      startUrl: homeInfo.url,
      finalUrl: page.url(),
      gameResult: result,
      timestamp: new Date().toISOString()
    })
  })

  /**
   * Teste de navegação em múltiplas abas
   */
  test('deve funcionar corretamente em múltiplas abas', async ({ browser }) => {
    // Criar múltiplos contextos (abas)
    const context1 = await browser.newContext()
    const context2 = await browser.newContext()
    
    const page1 = await context1.newPage()
    const page2 = await context2.newPage()
    
    // Navegar para páginas diferentes em cada aba
    await page1.goto('http://localhost:3000/')
    await page2.goto('http://localhost:3000/lobby')
    
    // Verificar que ambas carregaram corretamente
    expect(page1.url()).toBe('http://localhost:3000/')
    expect(page2.url()).toContain('/lobby')
    
    // Verificar que funcionam independentemente
    const homePage1 = new HomePage(page1)
    await homePage1.verifyPageElements()
    
    // Limpar contextos
    await context1.close()
    await context2.close()
  })

  /**
   * Teste de navegação com parâmetros de URL
   */
  test('deve lidar corretamente com parâmetros de URL', async ({ page }) => {
    // Testar URL com parâmetros de query
    await page.goto('http://localhost:3000/lobby?victory=true')
    expect(page.url()).toContain('victory=true')
    
    // Testar navegação para jogo com ID específico
    const gameId = 'url-param-test-123'
    await investigationPage.goto(gameId)
    
    expect(page.url()).toContain(gameId)
    await investigationPage.verifyInvestigationPageElements()
  })

  /**
   * Teste de comportamento com URLs inválidas
   */
  test('deve lidar graciosamente com URLs inválidas', async ({ page }) => {
    // Tentar acessar rota inexistente
    const response = await page.goto('http://localhost:3000/pagina-inexistente')
    
    // Verificar se há tratamento de erro apropriado
    // (pode ser 404, redirecionamento, ou página de erro)
    expect([200, 404]).toContain(response?.status() || 200)
    
    // Tentar acessar jogo com ID inválido
    await page.goto('http://localhost:3000/game/invalid-game-id/investigation')
    
    // Página deve carregar ou mostrar erro apropriado
    await page.waitForLoadState('networkidle')
    
    // Não deve haver erros JavaScript críticos
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    
    await page.waitForTimeout(2000)
    expect(errors.filter(e => !e.includes('Warning'))).toHaveLength(0)
  })

  /**
   * Teste de navegação com diferentes métodos
   */
  test('deve suportar diferentes métodos de navegação', async ({ page }) => {
    // Navegação por clique
    await homePage.goto()
    await homePage.goToLobby()
    expect(page.url()).toContain('/lobby')
    
    // Navegação por URL direta
    await page.goto('http://localhost:3000/settings')
    expect(page.url()).toContain('/settings')
    
    // Navegação por botão do browser (back)
    await page.goBack()
    expect(page.url()).toContain('/lobby')
    
    // Navegação por botão do browser (forward)
    await page.goForward()
    expect(page.url()).toContain('/settings')
    
    // Navegação por refresh
    await page.reload()
    expect(page.url()).toContain('/settings')
    await page.waitForLoadState('networkidle')
  })

  /**
   * Teste de navegação responsiva
   */
  test('deve navegar corretamente em dispositivos móveis', async ({ page }) => {
    // Simular dispositivo móvel
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navegar normalmente
    await homePage.goto()
    await homePage.verifyPageElements()
    
    // Verificar se navegação funciona em mobile
    if (await homePage.lobbyButton.isVisible()) {
      await homePage.goToLobby()
      expect(page.url()).toContain('/lobby')
    }
    
    // Testar investigação em mobile
    await investigationPage.goto('mobile-navigation-test')
    await investigationPage.verifyInvestigationPageElements()
    
    // Verificar que modal funciona em mobile
    await investigationPage.openAccusationModal()
    await investigationPage.verifyAccusationModalElements()
    
    await page.screenshot({ 
      path: 'test-results/screenshots/mobile-navigation.png',
      fullPage: true 
    })
  })

  /**
   * Teste de performance de navegação
   */
  test('deve navegar com performance adequada', async ({ page }) => {
    // Começar medição de performance
    await page.goto('http://localhost:3000/')
    
    const startTime = Date.now()
    await homePage.goToLobby()
    const lobbyLoadTime = Date.now() - startTime
    
    // Navegação deve ser rápida (menos de 3 segundos)
    expect(lobbyLoadTime).toBeLessThan(3000)
    
    // Testar navegação para investigação
    const gameStartTime = Date.now()
    await investigationPage.goto('performance-test-game')
    const gameLoadTime = Date.now() - gameStartTime
    
    // Carregamento do jogo deve ser razoável (menos de 5 segundos)
    expect(gameLoadTime).toBeLessThan(5000)
    
    console.log('⚡ Métricas de performance de navegação:', {
      lobbyLoadTime: `${lobbyLoadTime}ms`,
      gameLoadTime: `${gameLoadTime}ms`,
      timestamp: new Date().toISOString()
    })
  })

  /**
   * Teste de estado de navegação persistente
   */
  test('deve manter estado apropriado durante navegação', async ({ page }) => {
    // Configurar estado inicial
    await page.goto('http://localhost:3000/')
    
    // Simular algum estado no localStorage
    await page.evaluate(() => {
      localStorage.setItem('gamePreferences', JSON.stringify({
        difficulty: 'hard',
        soundEnabled: false
      }))
    })
    
    // Navegar para outra página
    await homePage.goToLobby()
    
    // Verificar se estado foi mantido
    const preferences = await page.evaluate(() => {
      return localStorage.getItem('gamePreferences')
    })
    
    expect(preferences).toBeTruthy()
    expect(JSON.parse(preferences!)).toEqual({
      difficulty: 'hard',
      soundEnabled: false
    })
    
    // Navegar para investigação
    await investigationPage.goto('state-test-game')
    
    // Estado ainda deve estar presente
    const persistentPreferences = await page.evaluate(() => {
      return localStorage.getItem('gamePreferences')
    })
    
    expect(persistentPreferences).toBeTruthy()
  })
}) 