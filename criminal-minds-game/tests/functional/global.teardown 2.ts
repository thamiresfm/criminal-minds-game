/**
 * ISTQB CTAL-TAE - Teardown Global para Testes Funcionais
 * 
 * Capítulo 7 (Manutenção): Limpeza de ambiente pós-testes
 * Capítulo 8 (Qualidade): Garantia de ambiente limpo
 */

import { FullConfig } from '@playwright/test'
import path from 'path'
import fs from 'fs'

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Iniciando teardown global dos testes funcionais...')

  try {
    // Limpar arquivos temporários de autenticação (opcional)
    const authDir = path.join(__dirname, '.auth')
    if (fs.existsSync(authDir)) {
      // Manter os arquivos de auth para debug se necessário
      console.log('📁 Arquivos de autenticação mantidos para debug')
    }

    // Gerar resumo dos resultados se disponível
    const testResultsDir = path.join(process.cwd(), 'test-results')
    if (fs.existsSync(testResultsDir)) {
      const files = fs.readdirSync(testResultsDir)
      console.log(`📊 Arquivos de resultado gerados: ${files.length}`)
      
      // Listar principais arquivos de resultado
      const importantFiles = files.filter(file => 
        file.includes('results.json') || 
        file.includes('junit.xml') || 
        file.includes('html-report')
      )
      
      if (importantFiles.length > 0) {
        console.log('📋 Principais relatórios:')
        importantFiles.forEach(file => {
          console.log(`   - ${file}`)
        })
      }
    }

    // Log de finalização
    console.log('✅ Teardown global concluído!')
    console.log('🎯 Todos os testes funcionais finalizados')

  } catch (error) {
    console.error('❌ Erro durante teardown global:', error)
    // Não fazer throw do erro para não falhar os testes que passaram
  }
}

export default globalTeardown 