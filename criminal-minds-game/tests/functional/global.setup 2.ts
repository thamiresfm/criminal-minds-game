/**
 * ISTQB CTAL-TAE - Setup Global para Testes Funcionais
 * 
 * Capítulo 6 (Execução): Preparação do ambiente de testes
 * Capítulo 9 (Adoção/Transição): Configuração reutilizável
 */

import { chromium, FullConfig } from '@playwright/test'
import path from 'path'
import fs from 'fs'

async function globalSetup(config: FullConfig) {
  console.log('🚀 Iniciando setup global dos testes funcionais...')

  // Criar diretórios necessários
  const authDir = path.join(__dirname, '.auth')
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true })
  }

  const testResultsDir = path.join(process.cwd(), 'test-results')
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true })
  }

  // Inicializar browser para setup de autenticação
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    console.log('🔐 Configurando autenticação de teste...')
    
    // Navegar para página de login
    await page.goto('http://localhost:3000/login')
    
    // Aguardar a página carregar
    await page.waitForLoadState('networkidle')
    
    // Simular login de usuário de teste
    // (Como não temos autenticação real, vamos simular o estado)
    await page.evaluate(() => {
      // Simular dados de usuário logado no localStorage
      localStorage.setItem('user', JSON.stringify({
        id: 'test-user-123',
        email: 'teste@criminalmindsgame.com',
        name: 'Usuário de Teste',
        isAuthenticated: true
      }))
      
      // Simular token de sessão
      localStorage.setItem('authToken', 'test-auth-token-123')
      
      // Simular configurações do usuário
      localStorage.setItem('gameSettings', JSON.stringify({
        soundEnabled: true,
        musicEnabled: true,
        difficulty: 'medium',
        language: 'pt-BR'
      }))
    })

    // Navegar para home para confirmar login
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')

    // Salvar estado de autenticação
    await page.context().storageState({ 
      path: path.join(authDir, 'user.json') 
    })

    console.log('✅ Estado de autenticação salvo com sucesso!')

  } catch (error) {
    console.error('❌ Erro durante setup global:', error)
    throw error
  } finally {
    await browser.close()
  }

  console.log('🎯 Setup global concluído com sucesso!')
}

export default globalSetup 