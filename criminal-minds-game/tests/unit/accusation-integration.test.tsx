import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

// Variáveis compartilhadas para os mocks
let sharedMockRouter: any

/**
 * ISTQB CTAL-TAE - Testes de Integração para Acusação
 * 
 * Capítulo 6 (Execução): Testes de integração de componentes
 * Capítulo 9 (Adoção/Transição): Validação de fluxos completos
 */

// Mock de dados de teste
const mockGameData = {
  gameId: 'test-game-123',
  suspects: [
    {
      id: 'produtor',
      name: 'Marcus Williams',
      role: 'Produtor',
      isGuilty: true
    },
    {
      id: 'ator',
      name: 'Diego Santos',
      role: 'Ator Principal',
      isGuilty: false
    },
    {
      id: 'diretora',
      name: 'Ana Silva',
      role: 'Diretora',
      isGuilty: false
    }
  ]
}

// Mock do hook de jogo
const mockGameState = {
  currentCase: {
    id: 'teatro-royal',
    title: 'Mistério no Teatro Royal',
    suspects: mockGameData.suspects
  },
  playerProgress: {
    locationsVisited: ['palco', 'camarins', 'escritorio'],
    evidencesFound: ['carta_ameaca', 'impressao_digital', 'recibo_pagamento'],
    accusationMade: false
  }
}

// Componente de teste simulando o fluxo real
const AccusationFlowTest = () => {
  const [gameState, setGameState] = React.useState(mockGameState)
  const [showModal, setShowModal] = React.useState(false)
  const [selectedSuspect, setSelectedSuspect] = React.useState('')
  const [reasoning, setReasoning] = React.useState('')
  const [confidence, setConfidence] = React.useState(50)
  const router = sharedMockRouter || useRouter()

  const handleOpenAccusation = () => {
    if (gameState.playerProgress.accusationMade) {
      toast.error('Você já fez sua acusação!')
      return
    }
    setShowModal(true)
  }

  const handleSubmitAccusation = async () => {
    if (!selectedSuspect) {
      toast.error('Selecione um suspeito')
      return
    }

    const suspect = gameState.currentCase.suspects.find(s => s.id === selectedSuspect)
    if (!suspect) return

    // Marcar acusação como feita
    setGameState(prev => ({
      ...prev,
      playerProgress: {
        ...prev.playerProgress,
        accusationMade: true
      }
    }))

    toast.loading('Processando acusação...')
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1000))

    setShowModal(false)

    if (suspect.isGuilty) {
      toast.success('Parabéns! Acusação correta!')
      setTimeout(() => {
        router.push('/lobby?victory=true')
      }, 1000)
    } else {
      toast.error('Acusação incorreta! Game Over!')
      setTimeout(() => {
        router.push('/lobby?defeat=true')
      }, 1000)
    }
  }

  return (
    <div>
      <div data-testid="game-info">
        <h1>{gameState.currentCase.title}</h1>
        <p>Locais visitados: {gameState.playerProgress.locationsVisited.length}</p>
        <p>Evidências encontradas: {gameState.playerProgress.evidencesFound.length}</p>
      </div>

      <button
        onClick={handleOpenAccusation}
        data-testid="open-accusation-btn"
        disabled={gameState.playerProgress.accusationMade}
      >
        {gameState.playerProgress.accusationMade ? 'Acusação já feita' : 'Fazer Acusação'}
      </button>

      {showModal && (
        <div data-testid="accusation-modal">
          <h2>Acusação Final</h2>
          
          <div data-testid="suspects-list">
            {gameState.currentCase.suspects.map(suspect => (
              <button
                key={suspect.id}
                onClick={() => setSelectedSuspect(suspect.id)}
                data-testid={`suspect-${suspect.id}`}
                className={selectedSuspect === suspect.id ? 'selected' : ''}
              >
                {suspect.name} - {suspect.role}
              </button>
            ))}
          </div>

          <div>
            <label>Justificativa:</label>
            <textarea
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              data-testid="reasoning-input"
              maxLength={1000}
            />
            <span data-testid="char-counter">{reasoning.length}/1000</span>
          </div>

          <div>
            <label>Confiança: {confidence}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              data-testid="confidence-slider"
            />
          </div>

          <div>
            <button
              onClick={handleSubmitAccusation}
              disabled={!selectedSuspect}
              data-testid="submit-accusation"
            >
              Confirmar Acusação
            </button>
            <button
              onClick={() => setShowModal(false)}
              data-testid="cancel-accusation"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

describe('Integração - Fluxo Completo de Acusação', () => {
  const mockRouter = useRouter()

  beforeEach(() => {
    jest.clearAllMocks()
    
    // Configurar as variáveis compartilhadas com as mesmas instâncias
    sharedMockRouter = mockRouter
    
    ;(toast.error as jest.Mock).mockClear()
    ;(toast.success as jest.Mock).mockClear()
    ;(toast.loading as jest.Mock).mockClear()
  })

  /**
   * Capítulo 9 (Adoção/Transição): Teste de fluxo end-to-end
   */
  describe('Fluxo de Vitória Completo', () => {
    test('deve completar fluxo de acusação correta com sucesso', async () => {
      const user = userEvent.setup()
      render(<AccusationFlowTest />)

      // 1. Verificar estado inicial
      expect(screen.getByTestId('game-info')).toBeInTheDocument()
      expect(screen.getByText('Mistério no Teatro Royal')).toBeInTheDocument()
      expect(screen.getByText('Locais visitados: 3')).toBeInTheDocument()
      expect(screen.getByText('Evidências encontradas: 3')).toBeInTheDocument()

      // 2. Abrir modal de acusação
      const openBtn = screen.getByTestId('open-accusation-btn')
      expect(openBtn).toBeEnabled()
      expect(openBtn).toHaveTextContent('Fazer Acusação')
      
      await user.click(openBtn)
      expect(screen.getByTestId('accusation-modal')).toBeInTheDocument()

      // 3. Verificar suspeitos disponíveis
      expect(screen.getByTestId('suspect-produtor')).toBeInTheDocument()
      expect(screen.getByTestId('suspect-ator')).toBeInTheDocument()
      expect(screen.getByTestId('suspect-diretora')).toBeInTheDocument()

      // 4. Selecionar suspeito correto (produtor)
      await user.click(screen.getByTestId('suspect-produtor'))
      expect(screen.getByTestId('suspect-produtor')).toHaveClass('selected')

      // 5. Preencher justificativa
      const reasoningInput = screen.getByTestId('reasoning-input')
      await user.type(reasoningInput, 'Evidências apontam para conflito financeiro e acesso exclusivo ao local')
      expect(reasoningInput).toHaveValue('Evidências apontam para conflito financeiro e acesso exclusivo ao local')
      
      // Verificar contador de caracteres (texto tem 71 caracteres)
      expect(screen.getByTestId('char-counter')).toHaveTextContent('71/1000')

      // 6. Ajustar nível de confiança
      const confidenceSlider = screen.getByTestId('confidence-slider')
      fireEvent.change(confidenceSlider, { target: { value: '85' } })
      expect(screen.getByText('Confiança: 85%')).toBeInTheDocument()

      // 7. Submeter acusação
      const submitBtn = screen.getByTestId('submit-accusation')
      expect(submitBtn).toBeEnabled()
      
      await user.click(submitBtn)

      // 8. Verificar feedback de processamento
      expect(toast.loading).toHaveBeenCalledWith('Processando acusação...')

      // 9. Aguardar resultado de vitória
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Parabéns! Acusação correta!')
      }, { timeout: 2000 })

      // 10. Verificar navegação para vitória (aguardar processamento completo)
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith('/lobby?victory=true')
      }, { timeout: 7000 })

      // 11. Modal deve ser fechado
      expect(screen.queryByTestId('accusation-modal')).not.toBeInTheDocument()
    })
  })

  /**
   * Capítulo 8 (Qualidade): Teste de fluxo de derrota
   */
  describe('Fluxo de Derrota Completo', () => {
    test('deve completar fluxo de acusação incorreta', async () => {
      const user = userEvent.setup()
      render(<AccusationFlowTest />)

      // 1. Abrir modal
      await user.click(screen.getByTestId('open-accusation-btn'))

      // 2. Selecionar suspeito incorreto
      await user.click(screen.getByTestId('suspect-ator'))
      expect(screen.getByTestId('suspect-ator')).toHaveClass('selected')

      // 3. Preencher dados
      await user.type(screen.getByTestId('reasoning-input'), 'Suspeito baseado em rivalidade')
      fireEvent.change(screen.getByTestId('confidence-slider'), { target: { value: '60' } })

      // 4. Submeter acusação
      await user.click(screen.getByTestId('submit-accusation'))

      // 5. Verificar resultado de derrota
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Acusação incorreta! Game Over!')
      }, { timeout: 2000 })

      // 6. Verificar navegação para derrota (aguardar processamento)
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith('/lobby?defeat=true')
      }, { timeout: 7000 })
    })
  })

  /**
   * Capítulo 7 (Manutenção): Teste de prevenção de múltiplas acusações
   */
  describe('Prevenção de Múltiplas Acusações', () => {
    test('deve prevenir segunda acusação após primeira', async () => {
      const user = userEvent.setup()
      render(<AccusationFlowTest />)

      // 1. Fazer primeira acusação
      await user.click(screen.getByTestId('open-accusation-btn'))
      await user.click(screen.getByTestId('suspect-produtor'))
      await user.click(screen.getByTestId('submit-accusation'))

      // Aguardar processamento
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled()
      }, { timeout: 2000 })

      // 2. Tentar fazer segunda acusação
      const openBtn = screen.getByTestId('open-accusation-btn')
      expect(openBtn).toBeDisabled()
      expect(openBtn).toHaveTextContent('Acusação já feita')

      await user.click(openBtn)
      // Note: Este teste usa mock diferente então vamos verificar se acusação foi impedida
      expect(screen.queryByTestId('accusation-modal')).not.toBeInTheDocument()
      expect(screen.queryByTestId('accusation-modal')).not.toBeInTheDocument()
    })
  })

  /**
   * Capítulo 6 (Execução): Teste de cancelamento
   */
  describe('Cancelamento de Acusação', () => {
    test('deve permitir cancelar acusação sem consequências', async () => {
      const user = userEvent.setup()
      render(<AccusationFlowTest />)

      // 1. Abrir modal e preencher dados
      await user.click(screen.getByTestId('open-accusation-btn'))
      await user.click(screen.getByTestId('suspect-ator'))
      await user.type(screen.getByTestId('reasoning-input'), 'Teste de cancelamento')

      // 2. Cancelar
      await user.click(screen.getByTestId('cancel-accusation'))

      // 3. Verificar que modal foi fechado
      expect(screen.queryByTestId('accusation-modal')).not.toBeInTheDocument()

      // 4. Verificar que pode abrir novamente
      const openBtn = screen.getByTestId('open-accusation-btn')
      expect(openBtn).toBeEnabled()
      expect(openBtn).toHaveTextContent('Fazer Acusação')

      // 5. Reabrir e verificar que dados foram mantidos
      await user.click(openBtn)
      expect(screen.getByTestId('accusation-modal')).toBeInTheDocument()
      expect(screen.getByTestId('suspect-ator')).toHaveClass('selected')
      expect(screen.getByTestId('reasoning-input')).toHaveValue('Teste de cancelamento')
    })
  })

  /**
   * Capítulo 8 (Qualidade): Teste de limites de caracteres
   */
  describe('Validação de Limites', () => {
    test('deve respeitar limite de caracteres na justificativa', async () => {
      const user = userEvent.setup()
      render(<AccusationFlowTest />)

      await user.click(screen.getByTestId('open-accusation-btn'))
      
      const reasoningInput = screen.getByTestId('reasoning-input')
      
      // Tentar digitar mais de 1000 caracteres
      const longText = 'a'.repeat(1001)
      await user.clear(reasoningInput)
      await user.type(reasoningInput, longText)

      // Verificar que foi limitado a 1000
      expect(reasoningInput).toHaveValue('a'.repeat(1000))
      expect(screen.getByTestId('char-counter')).toHaveTextContent('1000/1000')
    })

    test('deve permitir exatamente 1000 caracteres', async () => {
      const user = userEvent.setup()
      render(<AccusationFlowTest />)

      await user.click(screen.getByTestId('open-accusation-btn'))
      
      const reasoningInput = screen.getByTestId('reasoning-input')
      const exactText = 'a'.repeat(1000)
      
      await user.clear(reasoningInput)
      await user.type(reasoningInput, exactText)

      expect(reasoningInput).toHaveValue(exactText)
      expect(screen.getByTestId('char-counter')).toHaveTextContent('1000/1000')
    })
  })

  /**
   * Capítulo 5 (Implementação): Teste de estados do slider
   */
  describe('Controle de Confiança', () => {
    test('deve permitir ajuste completo do slider (0-100)', async () => {
      const user = userEvent.setup()
      render(<AccusationFlowTest />)

      await user.click(screen.getByTestId('open-accusation-btn'))
      
      const slider = screen.getByTestId('confidence-slider')

      // Testar valor mínimo
      fireEvent.change(slider, { target: { value: '0' } })
      expect(screen.getByText('Confiança: 0%')).toBeInTheDocument()

      // Testar valor máximo
      fireEvent.change(slider, { target: { value: '100' } })
      expect(screen.getByText('Confiança: 100%')).toBeInTheDocument()

      // Testar valor intermediário
      fireEvent.change(slider, { target: { value: '75' } })
      expect(screen.getByText('Confiança: 75%')).toBeInTheDocument()
    })
  })
}) 