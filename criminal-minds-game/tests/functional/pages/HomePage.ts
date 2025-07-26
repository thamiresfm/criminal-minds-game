/**
 * ISTQB CTAL-TAE - Page Object Model para Página Inicial
 * 
 * Capítulo 3 (Arquitetura): Implementação do padrão Page Object Model
 * Capítulo 5 (Implementação): Reutilização e modularização
 * Capítulo 7 (Manutenção): Centralização de locators e ações
 */

import { Page, Locator, expect } from '@playwright/test'

export class HomePage {
  readonly page: Page
  
  // Locators principais
  readonly title: Locator
  readonly startGameButton: Locator
  readonly loginButton: Locator
  readonly lobbyButton: Locator
  readonly settingsButton: Locator
  readonly dynamicGameButton: Locator
  readonly navigationMenu: Locator

  constructor(page: Page) {
    this.page = page
    
    // Definição de locators
    this.title = page.locator('h1, [data-testid="page-title"]')
    this.startGameButton = page.locator('button:has-text("Iniciar Jogo"), [data-testid="start-game"]')
    this.loginButton = page.locator('button:has-text("Login"), a[href="/login"]')
    this.lobbyButton = page.locator('button:has-text("Lobby"), a[href="/lobby"]')
    this.settingsButton = page.locator('button:has-text("Configurações"), a[href="/settings"]')
    this.dynamicGameButton = page.locator('button:has-text("Jogo Dinâmico"), a[href="/dynamic-game"]')
    this.navigationMenu = page.locator('nav, [data-testid="navigation"]')
  }

  /**
   * Navegar para a página inicial
   */
  async goto() {
    await this.page.goto('/')
    await this.waitForLoad()
  }

  /**
   * Aguardar página carregar completamente
   */
  async waitForLoad() {
    await this.page.waitForLoadState('networkidle')
    
    // Aguardar elementos principais estarem visíveis
    await expect(this.page).toHaveTitle(/Criminal Minds|Home/)
  }

  /**
   * Verificar se usuário está logado
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      // Verificar se há elementos que indicam usuário logado
      const userInfo = this.page.locator('[data-testid="user-info"], .user-menu')
      return await userInfo.isVisible({ timeout: 2000 })
    } catch {
      return false
    }
  }

  /**
   * Navegar para página de login
   */
  async goToLogin() {
    await this.loginButton.click()
    await this.page.waitForURL('**/login')
  }

  /**
   * Navegar para lobby
   */
  async goToLobby() {
    await this.lobbyButton.click()
    await this.page.waitForURL('**/lobby')
  }

  /**
   * Navegar para configurações
   */
  async goToSettings() {
    await this.settingsButton.click()
    await this.page.waitForURL('**/settings')
  }

  /**
   * Navegar para jogo dinâmico
   */
  async goToDynamicGame() {
    await this.dynamicGameButton.click()
    await this.page.waitForURL('**/dynamic-game')
  }

  /**
   * Iniciar novo jogo (se disponível)
   */
  async startNewGame() {
    if (await this.startGameButton.isVisible()) {
      await this.startGameButton.click()
      
      // Aguardar redirecionamento para jogo ou lobby
      await this.page.waitForURL(/\/(game|lobby|dynamic-game)/)
    }
  }

  /**
   * Verificar elementos principais da página
   */
  async verifyPageElements() {
    // Verificar título da página
    await expect(this.title).toBeVisible()
    
    // Verificar navegação principal
    await expect(this.navigationMenu).toBeVisible()
    
    // Verificar botões principais (pelo menos um deve estar visível)
    const mainButtons = [
      this.startGameButton,
      this.loginButton,
      this.lobbyButton,
      this.dynamicGameButton
    ]
    
    let visibleButtons = 0
    for (const button of mainButtons) {
      if (await button.isVisible()) {
        visibleButtons++
      }
    }
    
    expect(visibleButtons).toBeGreaterThan(0)
  }

  /**
   * Capturar informações da página para debug
   */
  async getPageInfo() {
    return {
      title: await this.page.title(),
      url: this.page.url(),
      isLoggedIn: await this.isLoggedIn(),
      timestamp: new Date().toISOString()
    }
  }

  /**
   * Aguardar elemento específico ficar visível
   */
  async waitForElement(selector: string, timeout: number = 10000) {
    await this.page.locator(selector).waitFor({ 
      state: 'visible', 
      timeout 
    })
  }

  /**
   * Verificar se página carregou sem erros
   */
  async verifyNoErrors() {
    // Verificar se não há mensagens de erro visíveis
    const errorMessages = this.page.locator('.error, [role="alert"], .alert-danger')
    await expect(errorMessages).not.toBeVisible()
    
    // Verificar se não há elementos de loading infinito
    const loadingElements = this.page.locator('.loading, .spinner, [data-testid="loading"]')
    await expect(loadingElements).not.toBeVisible({ timeout: 15000 })
  }
} 