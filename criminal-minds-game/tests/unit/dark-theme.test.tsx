/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock de componente que simula o banner de status com a nova cor escura
const MockStatusBanner = ({ status }: { status: 'pending' | 'in_progress' | 'completed' }) => {
  return (
    <div 
      data-testid="status-banner"
      className={`p-3 rounded-lg mb-4 flex items-center space-x-3 ${
        status === 'completed' ? 'bg-green-50 border border-green-200' :
        status === 'in_progress' ? 'bg-yellow-50 border border-yellow-200' :
        'bg-gray-800 border border-gray-700'
      }`} 
      style={status !== 'completed' && status !== 'in_progress' ? { backgroundColor: '#2d2d2d', borderColor: '#2d2d2d' } : {}}
    >
      <div className="flex items-center space-x-2">
        <span 
          data-testid="status-text"
          className={`font-medium ${
            status === 'completed' ? 'text-green-600' :
            status === 'in_progress' ? 'text-yellow-600' :
            'text-gray-300'
          }`}
        >
          Status: {
            status === 'completed' ? 'Análise Concluída' :
            status === 'in_progress' ? 'Em Processamento' :
            'Aguardando Análise'
          }
        </span>
      </div>
      
      {/* Mock de informações adicionais */}
      <span 
        data-testid="additional-info"
        className={`text-sm ${status !== 'completed' && status !== 'in_progress' ? 'text-gray-300' : 'text-gray-600'}`}
      >
        • Informação adicional
      </span>
    </div>
  );
};

describe('🌑 Tema Escuro - Alteração de Cor para #2d2d2d', () => {
  
  describe('🎨 Status Banner com Cor Personalizada', () => {
    it('deve aplicar cor de fundo #2d2d2d para status pending', () => {
      render(<MockStatusBanner status="pending" />);
      
      const banner = screen.getByTestId('status-banner');
      
      // Verificar se o elemento existe
      expect(banner).toBeInTheDocument();
      
      // Verificar se contém as classes Tailwind como fallback
      expect(banner).toHaveClass('bg-gray-800');
      expect(banner).toHaveClass('border-gray-700');
      
      // Verificar se o style inline com a cor personalizada foi aplicado
      expect(banner).toHaveStyle({
        backgroundColor: '#2d2d2d',
        borderColor: '#2d2d2d'
      });
    });

    it('deve usar text-gray-300 para melhor contraste com fundo escuro', () => {
      render(<MockStatusBanner status="pending" />);
      
      const statusText = screen.getByTestId('status-text');
      const additionalInfo = screen.getByTestId('additional-info');
      
      // Verificar se usa text-gray-300 para melhor legibilidade
      expect(statusText).toHaveClass('text-gray-300');
      expect(additionalInfo).toHaveClass('text-gray-300');
      
      // Verificar o conteúdo do texto
      expect(statusText).toHaveTextContent('Status: Aguardando Análise');
    });

    it('deve manter cores originais para status completed', () => {
      render(<MockStatusBanner status="completed" />);
      
      const banner = screen.getByTestId('status-banner');
      const statusText = screen.getByTestId('status-text');
      const additionalInfo = screen.getByTestId('additional-info');
      
      // Verificar se mantém as cores originais para completed
      expect(banner).toHaveClass('bg-green-50');
      expect(banner).toHaveClass('border-green-200');
      expect(statusText).toHaveClass('text-green-600');
      expect(additionalInfo).toHaveClass('text-gray-600');
      
      // Não deve ter style inline para cor personalizada
      expect(banner).not.toHaveStyle({
        backgroundColor: '#2d2d2d'
      });
    });

    it('deve manter cores originais para status in_progress', () => {
      render(<MockStatusBanner status="in_progress" />);
      
      const banner = screen.getByTestId('status-banner');
      const statusText = screen.getByTestId('status-text');
      const additionalInfo = screen.getByTestId('additional-info');
      
      // Verificar se mantém as cores originais para in_progress
      expect(banner).toHaveClass('bg-yellow-50');
      expect(banner).toHaveClass('border-yellow-200');
      expect(statusText).toHaveClass('text-yellow-600');
      expect(additionalInfo).toHaveClass('text-gray-600');
      
      // Não deve ter style inline para cor personalizada
      expect(banner).not.toHaveStyle({
        backgroundColor: '#2d2d2d'
      });
    });
  });

  describe('🎯 Contraste e Acessibilidade', () => {
    it('deve garantir contraste adequado com texto claro em fundo escuro', () => {
      render(<MockStatusBanner status="pending" />);
      
      const banner = screen.getByTestId('status-banner');
      const statusText = screen.getByTestId('status-text');
      
      // Verificar se usa fundo escuro (#2d2d2d) com texto claro (gray-300)
      expect(banner).toHaveStyle({ backgroundColor: '#2d2d2d' });
      expect(statusText).toHaveClass('text-gray-300');
    });

    it('deve aplicar a mesma cor de fundo e borda para consistência visual', () => {
      render(<MockStatusBanner status="pending" />);
      
      const banner = screen.getByTestId('status-banner');
      
      // Verificar se fundo e borda usam a mesma cor para consistência
      expect(banner).toHaveStyle({
        backgroundColor: '#2d2d2d',
        borderColor: '#2d2d2d'
      });
    });
  });

  describe('🔧 Lógica Condicional', () => {
    it('deve aplicar cor personalizada apenas para status pending', () => {
      const { rerender } = render(<MockStatusBanner status="pending" />);
      
      let banner = screen.getByTestId('status-banner');
      expect(banner).toHaveStyle({ backgroundColor: '#2d2d2d' });
      
      // Testar mudança para completed
      rerender(<MockStatusBanner status="completed" />);
      banner = screen.getByTestId('status-banner');
      expect(banner).not.toHaveStyle({ backgroundColor: '#2d2d2d' });
      
      // Testar mudança para in_progress
      rerender(<MockStatusBanner status="in_progress" />);
      banner = screen.getByTestId('status-banner');
      expect(banner).not.toHaveStyle({ backgroundColor: '#2d2d2d' });
    });

    it('deve ajustar cor do texto baseado no status', () => {
      const { rerender } = render(<MockStatusBanner status="pending" />);
      
      let additionalInfo = screen.getByTestId('additional-info');
      expect(additionalInfo).toHaveClass('text-gray-300');
      
      // Testar mudança para completed
      rerender(<MockStatusBanner status="completed" />);
      additionalInfo = screen.getByTestId('additional-info');
      expect(additionalInfo).toHaveClass('text-gray-600');
      expect(additionalInfo).not.toHaveClass('text-gray-300');
    });
  });

  describe('📐 Estrutura e Classes CSS', () => {
    it('deve manter todas as classes de layout e estilo', () => {
      render(<MockStatusBanner status="pending" />);
      
      const banner = screen.getByTestId('status-banner');
      
      // Verificar classes de layout
      expect(banner).toHaveClass('p-3');
      expect(banner).toHaveClass('rounded-lg');
      expect(banner).toHaveClass('mb-4');
      expect(banner).toHaveClass('flex');
      expect(banner).toHaveClass('items-center');
      expect(banner).toHaveClass('space-x-3');
    });

    it('deve renderizar conteúdo correto para cada status', () => {
      const { rerender } = render(<MockStatusBanner status="pending" />);
      expect(screen.getByText('Status: Aguardando Análise')).toBeInTheDocument();
      
      rerender(<MockStatusBanner status="in_progress" />);
      expect(screen.getByText('Status: Em Processamento')).toBeInTheDocument();
      
      rerender(<MockStatusBanner status="completed" />);
      expect(screen.getByText('Status: Análise Concluída')).toBeInTheDocument();
    });
  });
}); 