/**
 * ISTQB CTAL-TAE - Configuração Playwright para Testes Funcionais
 * 
 * Capítulo 6 (Execução): Configuração de ambiente de testes
 * Capítulo 9 (Adoção/Transição): Preparação para execução em CI/CD
 */

import { defineConfig, devices } from '@playwright/test'

/**
 * Configuração do Playwright seguindo padrões ISTQB CTAL-TAE
 */
export default defineConfig({
  // Diretório dos testes funcionais
  testDir: './tests/functional',
  
  // Configurações de execução
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Configurações de relatório
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  
  // Configurações globais
  use: {
    // URL base da aplicação
    baseURL: 'http://localhost:3000',
    
    // Configurações de trace e screenshot
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,
    
    // Configurações de navegador
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    
    // Configurações de rede
    extraHTTPHeaders: {
      'Accept-Language': 'pt-BR'
    }
  },

  // Projetos de teste para diferentes browsers
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'tests/functional/.auth/user.json'
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'tests/functional/.auth/user.json'
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: 'tests/functional/.auth/user.json'
      },
      dependencies: ['setup'],
    },

    // Testes mobile
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        storageState: 'tests/functional/.auth/user.json'
      },
      dependencies: ['setup'],
    },

    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        storageState: 'tests/functional/.auth/user.json'
      },
      dependencies: ['setup'],
    },
  ],

  // Servidor de desenvolvimento
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // Configurações de timeout
  timeout: 60000,
  expect: {
    timeout: 10000,
  },

  // Configurações de output
  outputDir: 'test-results/',
  
  // Configurações globais de setup/teardown
  globalSetup: require.resolve('./tests/functional/global.setup.ts'),
  globalTeardown: require.resolve('./tests/functional/global.teardown.ts'),
}) 