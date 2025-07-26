/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
const MockLocationCompletionComponent = () => {
  const [gameState, setGameState] = React.useState({
    currentTab: 'map',
    collectedClues: [
      { 
        id: '1', 
        name: 'Evidência Foyer 1',
        location: 'Foyer',
        analyzed: false,
        reviewed: false,
        labResultsViewed: false,
      },
      { 
        id: '2', 
        name: 'Evidência Foyer 2',
        location: 'Foyer',
        analyzed: false,
        reviewed: false,
        labResultsViewed: false,
      },
      { 
        id: '3', 
        name: 'Evidência Camarim 1',
        location: 'Camarim',
        analyzed: false,
        reviewed: false,
        labResultsViewed: false,
      }
    ],
    locations: [
      { id: 'foyer', name: 'Foyer', explored: false, x: 30, y: 40 },
      { id: 'camarim', name: 'Camarim', explored: false, x: 70, y: 60 }
    ],
    timeRemaining: 1800,
    players: []
  });

  const notify = useNotify();

  // Função para verificar se todas as evidências de uma localidade estão concluídas
  const areAllLocationEvidencesComplete = (locationName: string): boolean => {
    const locationEvidence = gameState.collectedClues.filter(clue => clue.location === locationName);
    
    return locationEvidence.every(clue => {
      const basicAnalysisComplete = clue.analyzed === true || clue.reviewed === true;
      const labAnalysisComplete = !(clue as any).laboratoryResults || clue.labResultsViewed === true;
      return basicAnalysisComplete && labAnalysisComplete;
    });
  };

  const markLocationAsExplored = (locationName: string) => {
    // Só marca como explorada se TODAS as evidências da localidade estiverem concluídas
    if (areAllLocationEvidencesComplete(locationName)) {
      const locationId = getLocationIdFromName(locationName);
      setGameState(prev => ({
        ...prev,
        locations: prev.locations.map(location =>
          location.id === locationId
            ? { ...location, explored: true }
            : location
        )
      }));
      
      // Notificar quando um local for completado
      notify.success(
        '🏆 Local Completado!',
        `Todas as evidências de "${locationName}" foram analisadas!`,
        { duration: 4000 }
      );
    }
  };

  const getLocationIdFromName = (locationName: string): string => {
    const locationMap: { [key: string]: string } = {
      'Camarim': 'camarim',
      'Palco': 'palco', 
      'Corredor': 'corredor',
      'Foyer': 'foyer',
      'Plateia': 'plateia',
      'Entrada Principal': 'entrada'
    };
    return locationMap[locationName] || locationName.toLowerCase();
  };

  // Função para verificar e atualizar o status de todos os locais
  const updateAllLocationStatuses = () => {
    setGameState(prev => {
      let hasChanges = false;
      const updatedLocations = prev.locations.map(location => {
        const locationName = Object.entries({
          'camarim': 'Camarim',
          'palco': 'Palco', 
          'corredor': 'Corredor',
          'foyer': 'Foyer',
          'plateia': 'Plateia',
          'entrada': 'Entrada Principal'
        }).find(([id, name]) => id === location.id)?.[1] || '';
        
        if (locationName && areAllLocationEvidencesComplete(locationName) && !location.explored) {
          hasChanges = true;
          // Notificar quando um local for completado
          notify.success(
            '🏆 Local Completado!',
            `Todas as evidências de "${locationName}" foram analisadas!`,
            { duration: 4000 }
          );
          return { ...location, explored: true };
        }
        return location;
      });
      
      return hasChanges ? { ...prev, locations: updatedLocations } : prev;
    });
  };

  // Atualizar status dos locais quando evidências mudarem
  React.useEffect(() => {
    updateAllLocationStatuses();
  }, [gameState.collectedClues]);

  // Função para analisar evidência
  const analyzeEvidence = (evidenceId: string) => {
    setGameState(prev => ({
      ...prev,
      collectedClues: prev.collectedClues.map(clue =>
        clue.id === evidenceId ? { ...clue, analyzed: true } : clue
      )
    }));
  };

  // Função para revisar evidência
  const reviewEvidence = (evidenceId: string) => {
    setGameState(prev => ({
      ...prev,
      collectedClues: prev.collectedClues.map(clue =>
        clue.id === evidenceId ? { ...clue, reviewed: true } : clue
      )
    }));
  };

  return (
    <div>
      <div data-testid="game-state">
        {gameState.locations.map(location => (
          <div key={location.id} data-testid={`location-${location.id}`}>
            <span data-testid={`location-${location.id}-name`}>{location.name}</span>
            <span data-testid={`location-${location.id}-explored`}>{location.explored.toString()}</span>
          </div>
        ))}
      </div>
      
      <div data-testid="evidences">
        {gameState.collectedClues.map(clue => (
          <div key={clue.id} data-testid={`evidence-${clue.id}`}>
            <span data-testid={`evidence-${clue.id}-name`}>{clue.name}</span>
            <span data-testid={`evidence-${clue.id}-location`}>{clue.location}</span>
            <span data-testid={`evidence-${clue.id}-analyzed`}>{clue.analyzed.toString()}</span>
            <span data-testid={`evidence-${clue.id}-reviewed`}>{clue.reviewed.toString()}</span>
            <button 
              data-testid={`analyze-${clue.id}`}
              onClick={() => analyzeEvidence(clue.id)}
            >
              Analisar
            </button>
            <button 
              data-testid={`review-${clue.id}`}
              onClick={() => reviewEvidence(clue.id)}
            >
              Revisar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

describe('🏆 Funcionalidade de Conclusão de Locais', () => {
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

  describe('🎯 Estado Inicial dos Locais', () => {
    it('deve iniciar com todos os locais como não explorados', () => {
      render(<MockLocationCompletionComponent />);
      
      expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('false');
      expect(screen.getByTestId('location-camarim-explored')).toHaveTextContent('false');
    });

    it('deve mostrar todas as evidências como não analisadas', () => {
      render(<MockLocationCompletionComponent />);
      
      expect(screen.getByTestId('evidence-1-analyzed')).toHaveTextContent('false');
      expect(screen.getByTestId('evidence-2-analyzed')).toHaveTextContent('false');
      expect(screen.getByTestId('evidence-3-analyzed')).toHaveTextContent('false');
    });
  });

  describe('🔍 Análise de Evidências Individuais', () => {
    it('deve permitir analisar evidências individualmente', async () => {
      render(<MockLocationCompletionComponent />);
      
      fireEvent.click(screen.getByTestId('analyze-1'));
      
      await waitFor(() => {
        expect(screen.getByTestId('evidence-1-analyzed')).toHaveTextContent('true');
      });
      
      // Outros devem permanecer como false
      expect(screen.getByTestId('evidence-2-analyzed')).toHaveTextContent('false');
      expect(screen.getByTestId('evidence-3-analyzed')).toHaveTextContent('false');
    });

    it('deve permitir revisar evidências individualmente', async () => {
      render(<MockLocationCompletionComponent />);
      
      fireEvent.click(screen.getByTestId('review-1'));
      
      await waitFor(() => {
        expect(screen.getByTestId('evidence-1-reviewed')).toHaveTextContent('true');
      });
      
      // Outros devem permanecer como false
      expect(screen.getByTestId('evidence-2-reviewed')).toHaveTextContent('false');
      expect(screen.getByTestId('evidence-3-reviewed')).toHaveTextContent('false');
    });
  });

  describe('🏆 Conclusão de Local Completo', () => {
    it('deve marcar local como explorado quando todas as evidências forem analisadas', async () => {
      render(<MockLocationCompletionComponent />);
      
      // Verificar estado inicial
      expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('false');
      
      // Analisar primeira evidência do Foyer
      fireEvent.click(screen.getByTestId('analyze-1'));
      
      await waitFor(() => {
        expect(screen.getByTestId('evidence-1-analyzed')).toHaveTextContent('true');
      });
      
      // Local ainda deve estar como não explorado (só 1 de 2 evidências)
      expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('false');
      
      // Analisar segunda evidência do Foyer
      fireEvent.click(screen.getByTestId('analyze-2'));
      
      await waitFor(() => {
        expect(screen.getByTestId('evidence-2-analyzed')).toHaveTextContent('true');
        // Agora o local deve estar explorado (todas as evidências do Foyer completas)
        expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('true');
      });
      
      // Camarim ainda deve estar não explorado
      expect(screen.getByTestId('location-camarim-explored')).toHaveTextContent('false');
      
      // Deve ter notificado sobre a conclusão
      expect(mockNotify.success).toHaveBeenCalledWith(
        '🏆 Local Completado!',
        'Todas as evidências de "Foyer" foram analisadas!',
        { duration: 4000 }
      );
    });

    it('deve marcar local como explorado quando evidências forem revisadas (não analisadas)', async () => {
      render(<MockLocationCompletionComponent />);
      
      // Revisar ambas as evidências do Foyer
      fireEvent.click(screen.getByTestId('review-1'));
      fireEvent.click(screen.getByTestId('review-2'));
      
      await waitFor(() => {
        expect(screen.getByTestId('evidence-1-reviewed')).toHaveTextContent('true');
        expect(screen.getByTestId('evidence-2-reviewed')).toHaveTextContent('true');
        expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('true');
      });
      
      expect(mockNotify.success).toHaveBeenCalledWith(
        '🏆 Local Completado!',
        'Todas as evidências de "Foyer" foram analisadas!',
        { duration: 4000 }
      );
    });

    it('deve marcar local como explorado com mix de análise e revisão', async () => {
      render(<MockLocationCompletionComponent />);
      
      // Analisar uma evidência e revisar outra do Foyer
      fireEvent.click(screen.getByTestId('analyze-1'));
      fireEvent.click(screen.getByTestId('review-2'));
      
      await waitFor(() => {
        expect(screen.getByTestId('evidence-1-analyzed')).toHaveTextContent('true');
        expect(screen.getByTestId('evidence-2-reviewed')).toHaveTextContent('true');
        expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('true');
      });
      
      expect(mockNotify.success).toHaveBeenCalledWith(
        '🏆 Local Completado!',
        'Todas as evidências de "Foyer" foram analisadas!',
        { duration: 4000 }
      );
    });
  });

  describe('🏢 Múltiplos Locais', () => {
    it('deve marcar apenas o local correspondente como explorado', async () => {
      render(<MockLocationCompletionComponent />);
      
      // Completar apenas o Camarim (que tem só 1 evidência)
      fireEvent.click(screen.getByTestId('analyze-3'));
      
      await waitFor(() => {
        expect(screen.getByTestId('location-camarim-explored')).toHaveTextContent('true');
        expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('false');
      });
      
      expect(mockNotify.success).toHaveBeenCalledWith(
        '🏆 Local Completado!',
        'Todas as evidências de "Camarim" foram analisadas!',
        { duration: 4000 }
      );
    });

    it('deve marcar múltiplos locais como explorados independentemente', async () => {
      render(<MockLocationCompletionComponent />);
      
      // Completar Camarim
      fireEvent.click(screen.getByTestId('analyze-3'));
      
      await waitFor(() => {
        expect(screen.getByTestId('location-camarim-explored')).toHaveTextContent('true');
      });
      
      // Completar Foyer
      fireEvent.click(screen.getByTestId('analyze-1'));
      fireEvent.click(screen.getByTestId('analyze-2'));
      
      await waitFor(() => {
        expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('true');
        expect(screen.getByTestId('location-camarim-explored')).toHaveTextContent('true');
      });
      
      // Deve ter notificado sobre ambos os locais
      expect(mockNotify.success).toHaveBeenCalledTimes(2);
    });
  });

  describe('⚡ Atualizações Automáticas', () => {
    it('deve atualizar automaticamente quando evidências mudarem', async () => {
      render(<MockLocationCompletionComponent />);
      
      // Inicialmente não explorado
      expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('false');
      
      // Completar evidências rapidamente
      fireEvent.click(screen.getByTestId('analyze-1'));
      fireEvent.click(screen.getByTestId('analyze-2'));
      
      // Deve atualizar automaticamente através do useEffect
      await waitFor(() => {
        expect(screen.getByTestId('location-foyer-explored')).toHaveTextContent('true');
      }, { timeout: 3000 });
    });
  });
}); 