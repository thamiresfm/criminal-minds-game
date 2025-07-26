/**
 * ISTQB CTAL-TAE - Page Object Model para Página de Investigação
 * 
 * Capítulo 3 (Arquitetura): Padrão Page Object para tela complexa
 * Capítulo 5 (Implementação): Abstração de elementos da UI
 * Capítulo 7 (Manutenção): Locators centralizados para fácil manutenção
 */

import { Page, Locator, expect } from '@playwright/test'

export class InvestigationPage {
  readonly page: Page
  
  // Locators principais da investigação
  readonly gameTitle: Locator
  readonly investigationMap: Locator
  readonly evidenceList: Locator
  readonly suspectsList: Locator
  readonly progressBar: Locator
  
  // Locators do modal de acusação
  readonly accusationButton: Locator
  readonly accusationModal: Locator
  readonly modalTitle: Locator
  readonly suspectRadioButtons: Locator
  readonly reasoningTextarea: Locator
  readonly confidenceSlider: Locator
  readonly confidenceValue: Locator
  readonly submitAccusationButton: Locator
  readonly cancelAccusationButton: Locator
  readonly characterCounter: Locator
  
  // Locators de resultado
  readonly victoryModal: Locator
  readonly defeatModal: Locator
  readonly gameOverModal: Locator
  readonly resultMessage: Locator
  readonly finalScore: Locator
  
  // Locators de navegação
  readonly backToLobbyButton: Locator
  readonly newGameButton: Locator
  readonly settingsButton: Locator
  
  // Locators de notificações
  readonly notificationContainer: Locator
  readonly toastMessages: Locator

  constructor(page: Page) {
    this.page = page
    
    // Definição de locators principais
    this.gameTitle = page.locator('h1, [data-testid="game-title"]')
    this.investigationMap = page.locator('[data-testid="investigation-map"], .investigation-map')
    this.evidenceList = page.locator('[data-testid="evidence-list"], .evidence-container')
    this.suspectsList = page.locator('[data-testid="suspects-list"], .suspects-container')
    this.progressBar = page.locator('[data-testid="progress-bar"], .progress')
    
    // Locators do modal de acusação
    this.accusationButton = page.locator('button:has-text("FAZER ACUSAÇÃO"), [data-testid="accusation-button"]')
    this.accusationModal = page.locator('[data-testid="accusation-modal"], .accusation-modal')
    this.modalTitle = page.locator('.accusation-modal h2, [data-testid="modal-title"]')
    this.suspectRadioButtons = page.locator('input[type="radio"][name="suspect"]')
    this.reasoningTextarea = page.locator('textarea[placeholder*="justificativa"], [data-testid="reasoning-textarea"]')
    this.confidenceSlider = page.locator('input[type="range"], [data-testid="confidence-slider"]')
    this.confidenceValue = page.locator('[data-testid="confidence-value"], .confidence-display')
    this.submitAccusationButton = page.locator('.accusation-modal button:has-text("CONFIRMAR"), [data-testid="submit-accusation"]')
    this.cancelAccusationButton = page.locator('.accusation-modal button:has-text("Cancelar"), [data-testid="cancel-accusation"]')
    this.characterCounter = page.locator('[data-testid="character-counter"], .character-count')
    
    // Locators de resultado
    this.victoryModal = page.locator('[data-testid="victory-modal"], .victory-modal')
    this.defeatModal = page.locator('[data-testid="defeat-modal"], .defeat-modal')
    this.gameOverModal = page.locator('[data-testid="game-over-modal"], .game-over-modal')
    this.resultMessage = page.locator('[data-testid="result-message"], .result-text')
    this.finalScore = page.locator('[data-testid="final-score"], .score-display')
    
    // Locators de navegação
    this.backToLobbyButton = page.locator('button:has-text("Voltar ao Lobby"), a[href="/lobby"]')
    this.newGameButton = page.locator('button:has-text("Novo Jogo"), [data-testid="new-game"]')
    this.settingsButton = page.locator('button:has-text("Configurações"), a[href="/settings"]')
    
    // Locators de notificações
    this.notificationContainer = page.locator('[data-testid="notifications"], .toast-container')
    this.toastMessages = page.locator('.toast, [data-testid="toast"]')
  }

  /**
   * Navegar para página de investigação específica
   */
  async goto(gameId: string = 'test-game') {
    await this.page.goto(`/game/${gameId}/investigation`)
    await this.waitForLoad()
  }

  /**
   * Aguardar página de investigação carregar
   */
  async waitForLoad() {
    await this.page.waitForLoadState('networkidle')
    
    // Aguardar elementos principais da investigação
    await expect(this.gameTitle).toBeVisible()
    await expect(this.investigationMap).toBeVisible()
  }

  /**
   * Verificar elementos principais da página de investigação
   */
  async verifyInvestigationPageElements() {
    // Verificar estrutura básica
    await expect(this.gameTitle).toBeVisible()
    await expect(this.investigationMap).toBeVisible()
    await expect(this.accusationButton).toBeVisible()
    
    // Verificar se há suspeitos para investigar
    await expect(this.suspectsList).toBeVisible()
    
    // Verificar se botão de acusação está habilitado ou com estado apropriado
    const accusationButtonState = await this.accusationButton.isEnabled()
    expect(typeof accusationButtonState).toBe('boolean')
  }

  /**
   * Clicar no botão de fazer acusação
   */
  async openAccusationModal() {
    await this.accusationButton.click()
    
    // Aguardar modal aparecer
    await expect(this.accusationModal).toBeVisible()
    await expect(this.modalTitle).toBeVisible()
  }

  /**
   * Selecionar um suspeito específico
   */
  async selectSuspect(suspectId: string) {
    const suspectRadio = this.page.locator(`input[type="radio"][value="${suspectId}"]`)
    await suspectRadio.check()
    
    // Verificar se foi selecionado
    await expect(suspectRadio).toBeChecked()
  }

  /**
   * Selecionar suspeito por nome
   */
  async selectSuspectByName(suspectName: string) {
    const suspectLabel = this.page.locator(`label:has-text("${suspectName}")`)
    await suspectLabel.click()
    
    // Verificar se o radio correspondente foi marcado
    const associatedRadio = suspectLabel.locator('input[type="radio"]')
    await expect(associatedRadio).toBeChecked()
  }

  /**
   * Preencher justificativa da acusação
   */
  async fillReasoning(reasoning: string) {
    await this.reasoningTextarea.fill(reasoning)
    
    // Verificar se foi preenchido
    await expect(this.reasoningTextarea).toHaveValue(reasoning)
  }

  /**
   * Ajustar nível de confiança
   */
  async setConfidenceLevel(confidenceLevel: number) {
    await this.confidenceSlider.fill(confidenceLevel.toString())
    
    // Verificar se valor foi ajustado
    await expect(this.confidenceSlider).toHaveValue(confidenceLevel.toString())
  }

  /**
   * Submeter acusação completa
   */
  async submitAccusation(suspectId: string, reasoning: string, confidence: number = 85) {
    // Abrir modal se não estiver aberto
    if (!await this.accusationModal.isVisible()) {
      await this.openAccusationModal()
    }
    
    // Preencher dados da acusação
    await this.selectSuspect(suspectId)
    await this.fillReasoning(reasoning)
    await this.setConfidenceLevel(confidence)
    
    // Submeter acusação
    await this.submitAccusationButton.click()
    
    // Aguardar processamento
    await this.page.waitForTimeout(1000)
  }

  /**
   * Submeter acusação usando nome do suspeito
   */
  async submitAccusationByName(suspectName: string, reasoning: string, confidence: number = 85) {
    // Abrir modal se não estiver aberto
    if (!await this.accusationModal.isVisible()) {
      await this.openAccusationModal()
    }
    
    // Preencher dados da acusação
    await this.selectSuspectByName(suspectName)
    await this.fillReasoning(reasoning)
    await this.setConfidenceLevel(confidence)
    
    // Submeter acusação
    await this.submitAccusationButton.click()
    
    // Aguardar processamento
    await this.page.waitForTimeout(1000)
  }

  /**
   * Cancelar acusação
   */
  async cancelAccusation() {
    await this.cancelAccusationButton.click()
    
    // Verificar se modal foi fechado
    await expect(this.accusationModal).not.toBeVisible()
  }

  /**
   * Aguardar resultado da acusação (vitória ou derrota)
   */
  async waitForAccusationResult(): Promise<'victory' | 'defeat'> {
    try {
      // Aguardar um dos modais de resultado aparecer
      await this.page.waitForSelector(
        '[data-testid="victory-modal"], .victory-modal, [data-testid="defeat-modal"], .defeat-modal, [data-testid="game-over-modal"], .game-over-modal',
        { timeout: 10000 }
      )
      
      // Verificar qual modal apareceu
      if (await this.victoryModal.isVisible()) {
        return 'victory'
      } else if (await this.defeatModal.isVisible() || await this.gameOverModal.isVisible()) {
        return 'defeat'
      }
      
      throw new Error('Nenhum modal de resultado encontrado')
    } catch {
      throw new Error('Timeout aguardando resultado da acusação')
    }
  }

  /**
   * Verificar mensagem de resultado
   */
  async verifyResultMessage(expectedText: string) {
    await expect(this.resultMessage).toContainText(expectedText)
  }

  /**
   * Obter mensagem de resultado
   */
  async getResultMessage(): Promise<string> {
    return await this.resultMessage.textContent() || ''
  }

  /**
   * Verificar contador de caracteres da justificativa
   */
  async verifyCharacterCounter(expectedCount: string) {
    await expect(this.characterCounter).toContainText(expectedCount)
  }

  /**
   * Verificar se acusação está desabilitada (suspeito não selecionado)
   */
  async verifyAccusationDisabled() {
    await expect(this.submitAccusationButton).toBeDisabled()
  }

  /**
   * Verificar se acusação está habilitada
   */
  async verifyAccusationEnabled() {
    await expect(this.submitAccusationButton).toBeEnabled()
  }

  /**
   * Aguardar notificação específica aparecer
   */
  async waitForNotification(messageText: string, timeout: number = 5000) {
    const notification = this.page.locator(`.toast:has-text("${messageText}"), [data-testid="toast"]:has-text("${messageText}")`)
    await expect(notification).toBeVisible({ timeout })
  }

  /**
   * Verificar se há notificações de erro
   */
  async verifyNoErrorNotifications() {
    const errorToasts = this.page.locator('.toast.error, [data-testid="toast"][data-type="error"]')
    await expect(errorToasts).not.toBeVisible()
  }

  /**
   * Voltar ao lobby após resultado
   */
  async returnToLobby() {
    await this.backToLobbyButton.click()
    await this.page.waitForURL('**/lobby')
  }

  /**
   * Iniciar novo jogo
   */
  async startNewGame() {
    await this.newGameButton.click()
    await this.page.waitForURL(/\/game\/.*\/investigation/)
  }

  /**
   * Obter lista de suspeitos disponíveis
   */
  async getAvailableSuspects(): Promise<string[]> {
    const suspectLabels = await this.page.locator('.accusation-modal label').allTextContents()
    return suspectLabels.map(label => label.trim())
  }

  /**
   * Verificar se modal de acusação contém todos os elementos necessários
   */
  async verifyAccusationModalElements() {
    await expect(this.modalTitle).toBeVisible()
    await expect(this.suspectRadioButtons.first()).toBeVisible()
    await expect(this.reasoningTextarea).toBeVisible()
    await expect(this.confidenceSlider).toBeVisible()
    await expect(this.submitAccusationButton).toBeVisible()
    await expect(this.cancelAccusationButton).toBeVisible()
  }

  /**
   * Capturar estado atual da investigação para debug
   */
  async getInvestigationState() {
    return {
      url: this.page.url(),
      title: await this.page.title(),
      accusationModalVisible: await this.accusationModal.isVisible(),
      availableSuspects: await this.getAvailableSuspects(),
      timestamp: new Date().toISOString()
    }
  }

  /**
   * Testar comportamento de validação do formulário
   */
  async testFormValidation() {
    // Abrir modal
    await this.openAccusationModal()
    
    // Tentar submeter sem suspeito selecionado
    await this.submitAccusationButton.click()
    
    // Verificar se acusação está desabilitada
    await this.verifyAccusationDisabled()
  }
} 