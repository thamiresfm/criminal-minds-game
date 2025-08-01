/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { useNotify } from '@/lib/stores/notificationStore';
import '@testing-library/jest-dom';

// Mocks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock('@/lib/stores/notificationStore', () => ({
  useNotify: jest.fn(),
}));
jest.mock('react-hot-toast', () => ({
  default: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
}));

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Componente de teste simulado
const MockInvestigationPage = () => {
  const [gameOver, setGameOver] = React.useState(false);
  const [showGameOverModal, setShowGameOverModal] = React.useState(false);
  const [autoRestartCountdown, setAutoRestartCountdown] = React.useState(0);
  const [accusationMade, setAccusationMade] = React.useState(false);
  const [showAllEvidence, setShowAllEvidence] = React.useState(false);
  const [accusationResult, setAccusationResult] = React.useState(null);
  
  const router = useRouter();
  const notify = useNotify();
  
  // Estado inicial do jogo
  const [gameState, setGameState] = React.useState({
    currentTab: 'map',
    collectedClues: [
      { 
        id: '1', 
        name: 'Programa da Peça',
        analyzed: false,
        reviewed: false,
        labResultsViewed: false,
      }
    ],
    locations: [
      { id: 'foyer', name: 'Foyer', explored: false }
    ],
    timeRemaining: 1800,
    players: []
  });

  // Função de reinício do jogo
  const handleRestartGame = () => {
    // Limpar localStorage
    localStorageMock.removeItem(`criminal-minds-progress-test-game`);
    
    // Resetar estados relacionados a evidências lidas
    setShowGameOverModal(false);
    setAutoRestartCountdown(0);
    
    // Resetar todos os estados para valores iniciais
    setGameState({
      currentTab: 'map',
      collectedClues: [
        { 
          id: '1', 
          name: 'Programa da Peça',
          analyzed: false,
          reviewed: false,
          labResultsViewed: false,
        }
      ],
      locations: [
        { id: 'foyer', name: 'Foyer', explored: false }
      ],
      timeRemaining: 1800,
      players: []
    });
    
    // Resetar estados de controle do jogo
    setAccusationMade(false);
    setGameOver(false);
    setShowAllEvidence(false);
    setAccusationResult(null);
    
    notify.info(
      '🔄 Jogo Reiniciado',
      'O caso foi reiniciado. Boa sorte, detetive!',
      { duration: 4000 }
    );
  };

  // Simular Game Over
  const simulateGameOver = () => {
    setGameOver(true);
    setShowGameOverModal(true);
    setAutoRestartCountdown(10);
    
    notify.error(
      '💀 GAME OVER - Acusação Incorreta',
      'Sua única chance foi desperdiçada!',
      { duration: 6000 }
    );
  };

  // Gerir contagem regressiva para reinício automático
  React.useEffect(() => {
    if (autoRestartCountdown > 0) {
      const timer = setTimeout(() => {
        setAutoRestartCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (autoRestartCountdown === 0 && showGameOverModal) {
      // Quando a contagem chegar a 0, reiniciar automaticamente
      handleRestartGame();
    }
  }, [autoRestartCountdown, showGameOverModal]);

  return (
    <div>
      <div data-testid="game-state">
        <span data-testid="game-over">{gameOver.toString()}</span>
        <span data-testid="accusation-made">{accusationMade.toString()}</span>
        <span data-testid="show-all-evidence">{showAllEvidence.toString()}</span>
        <span data-testid="time-remaining">{gameState.timeRemaining}</span>
        <span data-testid="evidence-analyzed">{gameState.collectedClues[0]?.analyzed?.toString() || 'false'}</span>
        <span data-testid="countdown">{autoRestartCountdown}</span>
      </div>
      
      <button 
        data-testid="trigger-game-over"
        onClick={simulateGameOver}
      >
        Trigger Game Over
      </button>
      
      <button 
        data-testid="restart-button"
        onClick={() => {
          setAutoRestartCountdown(0);
          handleRestartGame();
        }}
      >
        Reiniciar Agora
      </button>

      {showGameOverModal && (
        <div data-testid="game-over-modal">
          <h2>GAME OVER</h2>
          {autoRestartCountdown > 0 && (
            <div data-testid="auto-restart-counter">
              <span>Reinício Automático em {autoRestartCountdown} segundo{autoRestartCountdown !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

describe('🔄 Funcionalidade de Encerramento e Reinício do Jogo', () => {
  let mockRouter: any;
  let mockNotify: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    
    // Setup router mock
    mockRouter = {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/game/test-game/investigation');
    
    // Setup notification mock
    mockNotify = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn()
    };
    (useNotify as jest.Mock).mockReturnValue(mockNotify);
  });

  describe('🎯 Validação do Estado Inicial', () => {
    it('deve iniciar com todos os estados resetados', () => {
      render(<MockInvestigationPage />);
      
      expect(screen.getByTestId('game-over')).toHaveTextContent('false');
      expect(screen.getByTestId('accusation-made')).toHaveTextContent('false');
      expect(screen.getByTestId('show-all-evidence')).toHaveTextContent('false');
      expect(screen.getByTestId('time-remaining')).toHaveTextContent('1800');
      expect(screen.getByTestId('evidence-analyzed')).toHaveTextContent('false');
      expect(screen.getByTestId('countdown')).toHaveTextContent('0');
    });
  });

  describe('💀 Funcionalidade de Game Over', () => {
    it('deve exibir modal de Game Over quando acionado', async () => {
      render(<MockInvestigationPage />);
      
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('game-over-modal')).toBeInTheDocument();
        expect(screen.getByTestId('game-over')).toHaveTextContent('true');
        expect(screen.getByTestId('countdown')).toHaveTextContent('10');
      });
      
      expect(mockNotify.error).toHaveBeenCalledWith(
        '💀 GAME OVER - Acusação Incorreta',
        'Sua única chance foi desperdiçada!',
        { duration: 6000 }
      );
    });

    it('deve exibir contagem regressiva para reinício automático', async () => {
      render(<MockInvestigationPage />);
      
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('auto-restart-counter')).toBeInTheDocument();
        expect(screen.getByTestId('auto-restart-counter')).toHaveTextContent('Reinício Automático em 10 segundos');
      });
    });
  });

  describe('⏰ Contagem Regressiva Automática', () => {
    it('deve decrementar a contagem regressiva a cada segundo', async () => {
      jest.useFakeTimers();
      
      render(<MockInvestigationPage />);
      
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('countdown')).toHaveTextContent('10');
      });
      
      // Avançar 1 segundo
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('countdown')).toHaveTextContent('9');
      });
      
      // Avançar mais 2 segundos
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('countdown')).toHaveTextContent('7');
      });
      
      jest.useRealTimers();
    });

    it('deve reiniciar automaticamente quando a contagem chegar a 0', async () => {
      jest.useFakeTimers();
      
      render(<MockInvestigationPage />);
      
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('countdown')).toHaveTextContent('10');
      });
      
      // Avançar 10 segundos completos
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      await waitFor(() => {
        // Verificar se o jogo foi reiniciado
        expect(screen.getByTestId('game-over')).toHaveTextContent('false');
        expect(screen.getByTestId('accusation-made')).toHaveTextContent('false');
        expect(screen.getByTestId('time-remaining')).toHaveTextContent('1800');
        expect(screen.getByTestId('evidence-analyzed')).toHaveTextContent('false');
        expect(screen.queryByTestId('game-over-modal')).not.toBeInTheDocument();
      });
      
      expect(mockNotify.info).toHaveBeenCalledWith(
        '🔄 Jogo Reiniciado',
        'O caso foi reiniciado. Boa sorte, detetive!',
        { duration: 4000 }
      );
      
      jest.useRealTimers();
    });
  });

  describe('🔄 Reinício Manual', () => {
    it('deve permitir reinício manual antes da contagem automática', async () => {
      render(<MockInvestigationPage />);
      
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('countdown')).toHaveTextContent('10');
      });
      
      // Reiniciar manualmente
      fireEvent.click(screen.getByTestId('restart-button'));
      
      await waitFor(() => {
        // Verificar se o jogo foi reiniciado
        expect(screen.getByTestId('game-over')).toHaveTextContent('false');
        expect(screen.getByTestId('accusation-made')).toHaveTextContent('false');
        expect(screen.getByTestId('time-remaining')).toHaveTextContent('1800');
        expect(screen.getByTestId('evidence-analyzed')).toHaveTextContent('false');
        expect(screen.getByTestId('countdown')).toHaveTextContent('0');
        expect(screen.queryByTestId('game-over-modal')).not.toBeInTheDocument();
      });
      
      expect(mockNotify.info).toHaveBeenCalledWith(
        '🔄 Jogo Reiniciado',
        'O caso foi reiniciado. Boa sorte, detetive!',
        { duration: 4000 }
      );
    });

    it('deve cancelar a contagem automática quando reiniciar manualmente', async () => {
      jest.useFakeTimers();
      
      render(<MockInvestigationPage />);
      
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('countdown')).toHaveTextContent('10');
      });
      
      // Avançar 3 segundos
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('countdown')).toHaveTextContent('7');
      });
      
      // Reiniciar manualmente
      fireEvent.click(screen.getByTestId('restart-button'));
      
      await waitFor(() => {
        expect(screen.getByTestId('countdown')).toHaveTextContent('0');
      });
      
      // Avançar mais tempo para verificar que não reinicia automaticamente
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      // O jogo já foi reiniciado manualmente, não deve reiniciar novamente
      expect(mockNotify.info).toHaveBeenCalledTimes(1);
      
      jest.useRealTimers();
    });
  });

  describe('💾 Limpeza do Estado e LocalStorage', () => {
    it('deve limpar localStorage ao reiniciar', async () => {
      render(<MockInvestigationPage />);
      
      fireEvent.click(screen.getByTestId('restart-button'));
      
      await waitFor(() => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('criminal-minds-progress-test-game');
      });
    });

    it('deve garantir que todos os estados sejam resetados após múltiplos reinícios', async () => {
      render(<MockInvestigationPage />);
      
      // Primeiro ciclo: Game Over + Reinício
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('game-over')).toHaveTextContent('true');
      });
      
      fireEvent.click(screen.getByTestId('restart-button'));
      
      await waitFor(() => {
        expect(screen.getByTestId('game-over')).toHaveTextContent('false');
        expect(screen.getByTestId('time-remaining')).toHaveTextContent('1800');
      });
      
      // Segundo ciclo: Game Over + Reinício
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('game-over')).toHaveTextContent('true');
      });
      
      fireEvent.click(screen.getByTestId('restart-button'));
      
      await waitFor(() => {
        expect(screen.getByTestId('game-over')).toHaveTextContent('false');
        expect(screen.getByTestId('accusation-made')).toHaveTextContent('false');
        expect(screen.getByTestId('time-remaining')).toHaveTextContent('1800');
        expect(screen.getByTestId('evidence-analyzed')).toHaveTextContent('false');
      });
      
      // Verificar que foi notificado sobre reinício em ambos os casos
      expect(mockNotify.info).toHaveBeenCalledTimes(2);
    });
  });

  describe('🎮 Integração Completa do Fluxo', () => {
    it('deve garantir que uma nova partida sempre inicie do zero', async () => {
      jest.useFakeTimers();
      
      render(<MockInvestigationPage />);
      
      // Estado inicial
      expect(screen.getByTestId('game-over')).toHaveTextContent('false');
      expect(screen.getByTestId('time-remaining')).toHaveTextContent('1800');
      
      // Simular Game Over
      fireEvent.click(screen.getByTestId('trigger-game-over'));
      
      await waitFor(() => {
        expect(screen.getByTestId('game-over')).toHaveTextContent('true');
        expect(screen.getByTestId('countdown')).toHaveTextContent('10');
      });
      
      // Aguardar reinício automático
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      await waitFor(() => {
        // Verificar que TODOS os estados voltaram ao inicial
        expect(screen.getByTestId('game-over')).toHaveTextContent('false');
        expect(screen.getByTestId('accusation-made')).toHaveTextContent('false');
        expect(screen.getByTestId('show-all-evidence')).toHaveTextContent('false');
        expect(screen.getByTestId('time-remaining')).toHaveTextContent('1800');
        expect(screen.getByTestId('evidence-analyzed')).toHaveTextContent('false');
        expect(screen.getByTestId('countdown')).toHaveTextContent('0');
        expect(screen.queryByTestId('game-over-modal')).not.toBeInTheDocument();
      });
      
      // Verificar que localStorage foi limpo
      expect(localStorageMock.removeItem).toHaveBeenCalled();
      
      // Verificar notificação de reinício
      expect(mockNotify.info).toHaveBeenCalledWith(
        '🔄 Jogo Reiniciado',
        'O caso foi reiniciado. Boa sorte, detetive!',
        { duration: 4000 }
      );
      
      jest.useRealTimers();
    });
  });
}); 