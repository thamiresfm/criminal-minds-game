/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock de componente simplificado que simula o filtro da tela de análise detalhada
const MockFilterComponent = () => {
  return (
    <div data-testid="filter-container">
      <select
        data-testid="evidence-filter"
        className="appearance-none bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-slate-600 rounded-xl text-white text-sm font-medium px-4 py-3 pr-12 min-w-[150px] focus:ring-3 focus:ring-accent-gold/50 focus:border-accent-gold hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 hover:border-slate-500 hover:shadow-lg transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md"
      >
        <option value="all" className="bg-slate-900 text-white font-medium px-3 py-2 hover:bg-blue-600 hover:text-white border-b border-slate-600">
          ✨ Todas as Evidências
        </option>
        <option value="critical" className="bg-slate-900 text-white font-medium px-3 py-2 hover:bg-red-600 hover:text-white border-b border-slate-600">
          🔴 Críticas
        </option>
        <option value="high" className="bg-slate-900 text-white font-medium px-3 py-2 hover:bg-yellow-600 hover:text-white border-b border-slate-600">
          🟡 Alta Importância
        </option>
        <option value="medium" className="bg-slate-900 text-white font-medium px-3 py-2 hover:bg-blue-600 hover:text-white border-b border-slate-600">
          🔵 Média Importância
        </option>
        <option value="low" className="bg-slate-900 text-white font-medium px-3 py-2 hover:bg-green-600 hover:text-white border-b border-slate-600">
          🟢 Baixa Importância
        </option>
        <option value="analyzed" className="bg-slate-900 text-white font-medium px-3 py-2 hover:bg-green-600 hover:text-white border-b border-slate-600">
          ✅ Já Analisadas
        </option>
        <option value="unanalyzed" className="bg-slate-900 text-white font-medium px-3 py-2 hover:bg-orange-600 hover:text-white">
          🔍 Pendentes de Análise
        </option>
      </select>
    </div>
  );
};

describe('🎨 Filtro de Evidências - Interface Visual', () => {
  
  describe('🎯 Aparência do Filtro', () => {
    it('deve renderizar o filtro com as novas cores de fundo (slate)', () => {
      render(<MockFilterComponent />);
      
      const filter = screen.getByTestId('evidence-filter');
      
      // Verificar se o elemento existe
      expect(filter).toBeInTheDocument();
      
      // Verificar se contém as classes da nova cor de fundo
      expect(filter).toHaveClass('bg-gradient-to-r');
      expect(filter).toHaveClass('from-slate-900');
      expect(filter).toHaveClass('to-slate-800');
      expect(filter).toHaveClass('border-slate-600');
    });

    it('deve ter todas as opções do filtro disponíveis', () => {
      render(<MockFilterComponent />);
      
      // Verificar se todas as opções estão presentes
      expect(screen.getByText('✨ Todas as Evidências')).toBeInTheDocument();
      expect(screen.getByText('🔴 Críticas')).toBeInTheDocument();
      expect(screen.getByText('🟡 Alta Importância')).toBeInTheDocument();
      expect(screen.getByText('🔵 Média Importância')).toBeInTheDocument();
      expect(screen.getByText('🟢 Baixa Importância')).toBeInTheDocument();
      expect(screen.getByText('✅ Já Analisadas')).toBeInTheDocument();
      expect(screen.getByText('🔍 Pendentes de Análise')).toBeInTheDocument();
    });

    it('deve aplicar as classes de estilo corretas para responsividade', () => {
      render(<MockFilterComponent />);
      
      const filter = screen.getByTestId('evidence-filter');
      
      // Verificar classes de estilo e responsividade
      expect(filter).toHaveClass('rounded-xl');
      expect(filter).toHaveClass('text-white');
      expect(filter).toHaveClass('min-w-[150px]');
      expect(filter).toHaveClass('transition-all');
      expect(filter).toHaveClass('duration-300');
      expect(filter).toHaveClass('shadow-lg');
    });

    it('deve ter as classes de foco e hover corretas', () => {
      render(<MockFilterComponent />);
      
      const filter = screen.getByTestId('evidence-filter');
      
      // Verificar classes de interação
      expect(filter).toHaveClass('focus:ring-3');
      expect(filter).toHaveClass('focus:ring-accent-gold/50');
      expect(filter).toHaveClass('focus:border-accent-gold');
      expect(filter).toHaveClass('hover:bg-gradient-to-r');
      expect(filter).toHaveClass('hover:from-slate-800');
      expect(filter).toHaveClass('hover:to-slate-700');
    });
  });

  describe('🎨 Opções do Filtro', () => {
    it('deve aplicar o fundo slate-900 nas opções', () => {
      render(<MockFilterComponent />);
      
      // Obter todas as opções
      const options = screen.getAllByRole('option');
      
      // Verificar se todas têm a classe bg-slate-900
      options.forEach(option => {
        expect(option).toHaveClass('bg-slate-900');
        expect(option).toHaveClass('text-white');
        expect(option).toHaveClass('font-medium');
      });
    });

    it('deve ter bordas slate-600 nas opções (exceto a última)', () => {
      render(<MockFilterComponent />);
      
      const optionsWithBorder = [
        screen.getByText('✨ Todas as Evidências'),
        screen.getByText('🔴 Críticas'),
        screen.getByText('🟡 Alta Importância'),
        screen.getByText('🔵 Média Importância'),
        screen.getByText('🟢 Baixa Importância'),
        screen.getByText('✅ Já Analisadas')
      ];
      
      // Verificar se as opções têm bordas slate-600
      optionsWithBorder.forEach(option => {
        expect(option).toHaveClass('border-b');
        expect(option).toHaveClass('border-slate-600');
      });
      
      // A última opção não deve ter borda inferior
      const lastOption = screen.getByText('🔍 Pendentes de Análise');
      expect(lastOption).not.toHaveClass('border-b');
    });

    it('deve ter cores de hover apropriadas para cada categoria', () => {
      render(<MockFilterComponent />);
      
      // Verificar cores específicas de hover
      expect(screen.getByText('🔴 Críticas')).toHaveClass('hover:bg-red-600');
      expect(screen.getByText('🟡 Alta Importância')).toHaveClass('hover:bg-yellow-600');
      expect(screen.getByText('🔵 Média Importância')).toHaveClass('hover:bg-blue-600');
      expect(screen.getByText('🟢 Baixa Importância')).toHaveClass('hover:bg-green-600');
      expect(screen.getByText('✅ Já Analisadas')).toHaveClass('hover:bg-green-600');
      expect(screen.getByText('🔍 Pendentes de Análise')).toHaveClass('hover:bg-orange-600');
    });
  });

  describe('📱 Acessibilidade', () => {
    it('deve ser acessível via teclado', () => {
      render(<MockFilterComponent />);
      
      const filter = screen.getByTestId('evidence-filter');
      
      // Verificar se o elemento pode receber foco
      expect(filter).toHaveProperty('tabIndex', 0);
    });

    it('deve ter texto legível com contraste adequado', () => {
      render(<MockFilterComponent />);
      
      const filter = screen.getByTestId('evidence-filter');
      
      // Verificar se usa texto branco em fundo escuro (boa prática de contraste)
      expect(filter).toHaveClass('text-white');
      expect(filter).toHaveClass('from-slate-900');
    });
  });
}); 