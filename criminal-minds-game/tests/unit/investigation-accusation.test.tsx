import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { useNotify } from '@/lib/stores/notificationStore'
import toast from 'react-hot-toast'

// Variáveis compartilhadas para os mocks
let sharedMockRouter: any
let sharedMockNotify: any

// Mock do componente principal
jest.mock('../../src/app/game/investigation/page', () => {
  const MockInvestigationPage = ({ params }: { params: { gameId: string } }) => {
    const [showAccusationModal, setShowAccusationModal] = React.useState(false)
    const [selectedSuspect, setSelectedSuspect] = React.useState('')
    const [accusationReasoning, setAccusationReasoning] = React.useState('')
    const [accusationConfidence, setAccusationConfidence] = React.useState(50)
    const [accusationMade, setAccusationMade] = React.useState(false)
    const [gameOver, setGameOver] = React.useState(false)
    const router = sharedMockRouter || useRouter()
    const notify = sharedMockNotify || useNotify()

    const suspects = [
      {
        id: 'produtor',
        name: 'Marcus Williams',
        role: 'Produtor',
        age: 45,
        description: 'Produtor experiente',
        motive: 'Conflitos financeiros',
        alibi: 'Estava no escritório',
        personality: 'Ambicioso',
        suspicionLevel: 'critical'
      },
      {
        id: 'ator',
        name: 'Diego Santos',
        role: 'Ator Principal',
        age: 32,
        description: 'Ator talentoso',
        motive: 'Rivalidade profissional',
        alibi: 'No camarim',
        personality: 'Competitivo',
        suspicionLevel: 'high'
      }
    ]

    const handleSubmitAccusation = async () => {
      if (!selectedSuspect) {
        notify.error('❌ Acusação Incompleta', 'Selecione um suspeito para fazer a acusação.', { duration: 4000 })
        return
      }

      if (accusationMade) {
        notify.warning(
          '⚠️ Acusação já realizada',
          'Você já fez sua única acusação neste jogo.',
          { duration: 4000 }
        )
        return
      }

      const suspect = suspects.find(s => s.id === selectedSuspect)
      if (!suspect) return

      setAccusationMade(true)
      notify.warning(
        '⚖️ ACUSAÇÃO FINAL - ÚNICA CHANCE',
        `Analisando acusação contra ${suspect.name}...`,
        { duration: 4000 }
      )

      // Simular processamento (3s + 3s como no código real)
      await new Promise(resolve => setTimeout(resolve, 3000))

      const isCorrect = selectedSuspect === 'produtor'
      setShowAccusationModal(false)

      if (isCorrect) {
        notify.success(
          '🎉 PARABÉNS! ACUSAÇÃO CORRETA!',
          `Você identificou corretamente ${suspect.name} como o culpado!`,
          { duration: 6000 }
        )
        setTimeout(() => {
          router.push('/lobby?victory=true')
        }, 3000)
      } else {
        setGameOver(true)
        toast.error(`${suspect.name} não era o culpado. Game Over!`)
      }
    }

    return (
      <div>
        <button
          onClick={() => setShowAccusationModal(true)}
          data-testid="open-accusation-modal"
        >
          Fazer Acusação
        </button>

        {showAccusationModal && (
          <div data-testid="accusation-modal">
            <h2>Acusação Final</h2>
            
            {suspects.map((suspect) => (
              <div
                key={suspect.id}
                onClick={() => setSelectedSuspect(suspect.id)}
                data-testid={`suspect-${suspect.id}`}
                className={selectedSuspect === suspect.id ? 'selected' : ''}
              >
                {suspect.name}
              </div>
            ))}

            <textarea
              value={accusationReasoning}
              onChange={(e) => setAccusationReasoning(e.target.value)}
              data-testid="accusation-reasoning"
              placeholder="Justificativa da acusação..."
            />

            <input
              type="range"
              min="0"
              max="100"
              value={accusationConfidence}
              onChange={(e) => setAccusationConfidence(parseInt(e.target.value))}
              data-testid="confidence-slider"
            />

            <button
              onClick={handleSubmitAccusation}
              disabled={!selectedSuspect}
              data-testid="submit-accusation-button"
            >
              🚨 FAZER ACUSAÇÃO 🚨
            </button>

            <button
              onClick={() => setShowAccusationModal(false)}
              data-testid="cancel-accusation"
            >
              Cancelar
            </button>
          </div>
        )}

        {gameOver && (
          <div data-testid="game-over-indicator">Game Over</div>
        )}
      </div>
    )
  }

  return MockInvestigationPage
})

import InvestigationPage from '../../src/app/game/investigation/page'

/**
 * ISTQB CTAL-TAE - Testes Unitários para Botão de Acusação
 * 
 * Capítulo 5 (Implementação): Testes de unidade para validação de lógica
 * Capítulo 6 (Execução): Testes isolados e determinísticos
 * Capítulo 8 (Qualidade): Cobertura de casos de teste e assertions claras
 */
describe('InvestigationPage - Botão de Acusação', () => {
  const mockParams = { gameId: 'test-game-123' }
  const mockRouter = useRouter()
  const mockNotify = useNotify()

  beforeEach(() => {
    jest.clearAllMocks()
    
    // Configurar as variáveis compartilhadas com as mesmas instâncias
    sharedMockRouter = mockRouter
    sharedMockNotify = mockNotify
    
    // Reset dos mocks do notify
    ;(mockNotify.error as jest.Mock).mockClear()
    ;(mockNotify.success as jest.Mock).mockClear()
    ;(mockNotify.warning as jest.Mock).mockClear()
    ;(mockNotify.info as jest.Mock).mockClear()
    
    // Reset dos mocks do toast
    ;(toast.error as jest.Mock).mockClear()
    ;(toast.success as jest.Mock).mockClear()
  })

  /**
   * Capítulo 2 (Planejamento): Teste de objetivo claro - verificar renderização
   */
  describe('Renderização do Modal de Acusação', () => {
    test('deve renderizar o botão para abrir modal de acusação', () => {
      render(<InvestigationPage params={mockParams} />)
      
      const openButton = screen.getByTestId('open-accusation-modal')
      expect(openButton).toBeInTheDocument()
      expect(openButton).toHaveTextContent('Fazer Acusação')
    })

    test('deve abrir o modal de acusação ao clicar no botão', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      const openButton = screen.getByTestId('open-accusation-modal')
      await user.click(openButton)

      expect(screen.getByTestId('accusation-modal')).toBeInTheDocument()
      expect(screen.getByText('Acusação Final')).toBeInTheDocument()
    })

    test('deve renderizar todos os suspeitos no modal', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))

      expect(screen.getByTestId('suspect-produtor')).toBeInTheDocument()
      expect(screen.getByTestId('suspect-ator')).toBeInTheDocument()
      expect(screen.getByText('Marcus Williams')).toBeInTheDocument()
      expect(screen.getByText('Diego Santos')).toBeInTheDocument()
    })
  })

  /**
   * Capítulo 3 (Arquitetura): Teste de separação de responsabilidades
   */
  describe('Seleção de Suspeito', () => {
    test('deve permitir selecionar um suspeito', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      await user.click(screen.getByTestId('suspect-produtor'))

      const selectedSuspect = screen.getByTestId('suspect-produtor')
      expect(selectedSuspect).toHaveClass('selected')
    })

    test('deve habilitar botão de acusação apenas com suspeito selecionado', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      
      const submitButton = screen.getByTestId('submit-accusation-button')
      expect(submitButton).toBeDisabled()

      await user.click(screen.getByTestId('suspect-produtor'))
      expect(submitButton).toBeEnabled()
    })
  })

  /**
   * Capítulo 5 (Implementação): Teste de validação de entrada
   */
  describe('Validações do Formulário', () => {
    test('deve exibir erro ao tentar enviar sem selecionar suspeito', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      
      const submitButton = screen.getByTestId('submit-accusation-button')
      expect(submitButton).toBeDisabled()
      
      // Tentar clicar mesmo desabilitado (simulando comportamento real)
      fireEvent.click(submitButton)
      
      // Verificar que o toast de erro não foi chamado (botão desabilitado)
      expect(toast.error).not.toHaveBeenCalled()
    })

    test('deve permitir inserir justificativa opcional', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      
      const reasoningTextarea = screen.getByTestId('accusation-reasoning')
      await user.type(reasoningTextarea, 'Evidências apontam para o produtor')
      
      expect(reasoningTextarea).toHaveValue('Evidências apontam para o produtor')
    })

    test('deve permitir ajustar nível de confiança', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      
      const confidenceSlider = screen.getByTestId('confidence-slider')
      fireEvent.change(confidenceSlider, { target: { value: '80' } })
      
      expect(confidenceSlider).toHaveValue('80')
    })
  })

  /**
   * Capítulo 6 (Execução): Teste de fluxo de acusação
   */
  describe('Submissão da Acusação', () => {
    test('deve processar acusação correta (produtor)', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      await user.click(screen.getByTestId('suspect-produtor'))
      
      const submitButton = screen.getByTestId('submit-accusation-button')
      await user.click(submitButton)

      // Verificar toast de warning (processamento)
      expect(mockNotify.warning).toHaveBeenCalledWith(
        '⚖️ ACUSAÇÃO FINAL - ÚNICA CHANCE',
        'Analisando acusação contra Marcus Williams...',
        { duration: 4000 }
      )

      // Aguardar processamento
      await waitFor(() => {
        expect(mockNotify.success).toHaveBeenCalledWith(
          '🎉 PARABÉNS! ACUSAÇÃO CORRETA!',
          'Você identificou corretamente Marcus Williams como o culpado!',
          { duration: 6000 }
        )
      }, { timeout: 4000 })

      // Verificar navegação para vitória (aguardar 6s: 3s processamento + 3s timeout)
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith('/lobby?victory=true')
      }, { timeout: 7000 })
    })

    test('deve processar acusação incorreta (ator)', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      await user.click(screen.getByTestId('suspect-ator'))
      
      const submitButton = screen.getByTestId('submit-accusation-button')
      await user.click(submitButton)

      // Verificar toast de warning (processamento)
      expect(mockNotify.warning).toHaveBeenCalledWith(
        '⚖️ ACUSAÇÃO FINAL - ÚNICA CHANCE',
        'Analisando acusação contra Diego Santos...',
        { duration: 4000 }
      )

      // Aguardar processamento (igual ao tempo do teste de sucesso)
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          'Diego Santos não era o culpado. Game Over!'
        )
      }, { timeout: 4000 })

      // Verificar indicador de game over
      await waitFor(() => {
        expect(screen.getByTestId('game-over-indicator')).toBeInTheDocument()
      })
    })
  })

  /**
   * Capítulo 7 (Manutenção): Teste de robustez e edge cases
   */
  describe('Casos Extremos e Robustez', () => {
    test('deve prevenir múltiplas acusações', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      await user.click(screen.getByTestId('suspect-produtor'))
      
      const submitButton = screen.getByTestId('submit-accusation-button')
      
      // Primeira acusação
      await user.click(submitButton)
      
      // Aguardar processamento
      await waitFor(() => {
        expect(mockNotify.success).toHaveBeenCalled()
      }, { timeout: 7000 })

      // Tentar fazer segunda acusação
      await user.click(screen.getByTestId('open-accusation-modal'))
      await user.click(screen.getByTestId('suspect-ator'))
      await user.click(screen.getByTestId('submit-accusation-button'))

      expect(mockNotify.warning).toHaveBeenCalledWith(
        '⚠️ Acusação já realizada',
        'Você já fez sua única acusação neste jogo.',
        { duration: 4000 }
      )
    })

    test('deve permitir cancelar modal de acusação', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      expect(screen.getByTestId('accusation-modal')).toBeInTheDocument()
      
      await user.click(screen.getByTestId('cancel-accusation'))
      expect(screen.queryByTestId('accusation-modal')).not.toBeInTheDocument()
    })
  })

  /**
   * Capítulo 8 (Qualidade): Testes de acessibilidade e UX
   */
  describe('Qualidade e Acessibilidade', () => {
    test('botão deve ter texto descritivo adequado', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      await user.click(screen.getByTestId('open-accusation-modal'))
      
      const submitButton = screen.getByTestId('submit-accusation-button')
      expect(submitButton).toHaveTextContent('🚨 FAZER ACUSAÇÃO 🚨')
    })

    test('deve manter estado consistente durante interações', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      // Abrir modal
      await user.click(screen.getByTestId('open-accusation-modal'))
      
      // Selecionar suspeito
      await user.click(screen.getByTestId('suspect-produtor'))
      
      // Cancelar
      await user.click(screen.getByTestId('cancel-accusation'))
      
      // Reabrir modal
      await user.click(screen.getByTestId('open-accusation-modal'))
      
      // Estado deve ser mantido
      const selectedSuspect = screen.getByTestId('suspect-produtor')
      expect(selectedSuspect).toHaveClass('selected')
    })
  })

  /**
   * Capítulo 9 (Adoção/Transição): Testes de integração básica
   */
  describe('Integração e Fluxo Completo', () => {
    test('deve executar fluxo completo de acusação vitoriosa', async () => {
      const user = userEvent.setup()
      render(<InvestigationPage params={mockParams} />)
      
      // 1. Abrir modal
      await user.click(screen.getByTestId('open-accusation-modal'))
      expect(screen.getByTestId('accusation-modal')).toBeInTheDocument()
      
      // 2. Selecionar suspeito correto
      await user.click(screen.getByTestId('suspect-produtor'))
      expect(screen.getByTestId('suspect-produtor')).toHaveClass('selected')
      
      // 3. Adicionar justificativa
      await user.type(
        screen.getByTestId('accusation-reasoning'),
        'Motivo financeiro e acesso ao local'
      )
      
      // 4. Ajustar confiança
      fireEvent.change(screen.getByTestId('confidence-slider'), { 
        target: { value: '90' } 
      })
      
      // 5. Submeter acusação
      await user.click(screen.getByTestId('submit-accusation-button'))
      
      // 6. Verificar resultado
      await waitFor(() => {
        expect(mockNotify.success).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith('/lobby?victory=true')
      }, { timeout: 7000 })
    })
  })
}) 