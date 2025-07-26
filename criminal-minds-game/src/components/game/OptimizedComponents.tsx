import React, { memo, useMemo, useCallback } from 'react';
import { Search, Filter, X, Eye, ArrowLeft, ChevronRight, CheckCircle, Microscope, FileCheck, TestTube, Beaker, Activity } from 'lucide-react';

// Types (re-declarados para evitar dependências circulares)
interface Clue {
  id: string;
  name: string;
  description: string;
  location: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  collected: boolean;
  image?: string;
  details?: string;
  discoveredAt?: Date;
  connectedClues?: string[];
  analyzed?: boolean;
  reviewed?: boolean;
  labResultsViewed?: boolean;
  laboratoryResults?: {
    status: 'pending' | 'in_progress' | 'completed';
    completedAt?: Date;
    technician?: string;
    tests: any;
  };
}

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  explored: boolean;
  hasClues: boolean;
  hasImportantClues: boolean;
}

// Memoized Clue Card Component
export const ClueCard = memo<{
  clue: Clue;
  isSelected: boolean;
  onSelect: (clue: Clue) => void;
  getClueImportanceColor: (importance: string) => string;
  getClueImportanceIcon: (importance: string) => string;
}>(({ clue, isSelected, onSelect, getClueImportanceColor, getClueImportanceIcon }) => {
  const handleClick = useCallback(() => {
    onSelect(clue);
  }, [clue, onSelect]);

  const cardClassName = useMemo(() => 
    `p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
      isSelected ? 'border-accent-gold bg-accent-gold/10' : getClueImportanceColor(clue.importance)
    }`, [isSelected, clue.importance, getClueImportanceColor]
  );

  return (
    <div onClick={handleClick} className={cardClassName}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center">
          <span className="text-sm">{getClueImportanceIcon(clue.importance)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-primary-900 text-sm mb-1">{clue.name}</h3>
            {clue.laboratoryResults && (
              <div className="flex-shrink-0 ml-2">
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    clue.labResultsViewed ? 'bg-green-100 text-green-600' :
                    clue.laboratoryResults.status === 'completed' ? 'bg-red-100 text-red-600 animate-pulse' :
                    clue.laboratoryResults.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600 animate-bounce' :
                    'bg-gray-100 text-gray-500'
                  }`}
                >
                  {clue.labResultsViewed ? '✅' : 
                   clue.laboratoryResults.status === 'completed' ? '🔴' :
                   clue.laboratoryResults.status === 'in_progress' ? '⏳' : '🧬'}
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-primary-600 line-clamp-2">{clue.description}</p>
        </div>
      </div>
    </div>
  );
});

ClueCard.displayName = 'ClueCard';

// Memoized Clue List Component
export const ClueList = memo<{
  clues: Clue[];
  selectedClue: Clue | null;
  onClueSelect: (clue: Clue) => void;
  getClueImportanceColor: (importance: string) => string;
  getClueImportanceIcon: (importance: string) => string;
}>(({ clues, selectedClue, onClueSelect, getClueImportanceColor, getClueImportanceIcon }) => {
  return (
    <div className="p-4 space-y-3">
      {clues.map((clue) => (
        <ClueCard
          key={clue.id}
          clue={clue}
          isSelected={selectedClue?.id === clue.id}
          onSelect={onClueSelect}
          getClueImportanceColor={getClueImportanceColor}
          getClueImportanceIcon={getClueImportanceIcon}
        />
      ))}
    </div>
  );
});

ClueList.displayName = 'ClueList';

// Memoized Filter Component
export const FilterComponent = memo<{
  clueFilter: string;
  searchTerm: string;
  onFilterChange: (filter: string) => void;
  onSearchChange: (term: string) => void;
}>(({ clueFilter, searchTerm, onFilterChange, onSearchChange }) => {
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  }, [onFilterChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const handleClearFilter = useCallback(() => {
    onFilterChange('all');
  }, [onFilterChange]);

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-300" />
        <input
          type="text"
          placeholder="Buscar evidências..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-200 focus:ring-2 focus:ring-accent-gold focus:border-transparent"
        />
      </div>
      <div className="flex items-center space-x-3">
        <Filter className="w-4 h-4 text-primary-200" />
        <div className="relative">
          <select
            value={clueFilter}
            onChange={handleFilterChange}
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
          
          {/* Enhanced Custom Arrow with Animation */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <div className="bg-accent-gold/20 rounded-full p-1">
              <svg className="w-3 h-3 text-accent-gold transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Filter Status Indicator */}
          {clueFilter !== 'all' && (
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-accent-red rounded-full border-2 border-white animate-pulse">
              <div className="w-full h-full bg-accent-red rounded-full animate-ping"></div>
            </div>
          )}
        </div>
        
        {/* Filter Reset Button */}
        {clueFilter !== 'all' && (
          <button
            onClick={handleClearFilter}
            className="ml-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white rounded-lg transition-all duration-200 text-xs font-medium border border-red-400/30 hover:border-red-400/60"
            title="Limpar filtro"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
});

FilterComponent.displayName = 'FilterComponent';

// Memoized Location Pin Component
export const LocationPin = memo<{
  location: Location;
  onClick: (locationId: string) => void;
}>(({ location, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(location.id);
  }, [location.id, onClick]);

  const pinClassName = useMemo(() => 
    `relative w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shadow-xl border-3 transition-all duration-300 ${
      location.explored
        ? 'bg-green-600 border-green-700 text-white'
        : location.hasImportantClues
        ? 'bg-red-600 border-red-700 text-white animate-pulse'
        : 'bg-amber-900 border-amber-800 text-amber-100'
    }`, [location.explored, location.hasImportantClues]
  );

  const iconSymbol = useMemo(() => 
    location.explored ? '✓' : location.hasImportantClues ? '!' : '?',
    [location.explored, location.hasImportantClues]
  );

  const tooltipText = useMemo(() => 
    location.explored ? '✅ Investigado' : location.hasImportantClues ? '⚠️ Evidência Crítica' : '🔍 Clique para investigar',
    [location.explored, location.hasImportantClues]
  );

  return (
    <button
      onClick={handleClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin z-10 transition-all duration-300 hover:scale-110"
      style={{
        left: `${location.x}%`,
        top: `${location.y}%`,
      }}
    >
      {/* Professional Investigation Circle */}
      <div className={pinClassName}>
        <span 
          className="drop-shadow-sm font-bold"
          style={{ fontFamily: 'serif', fontSize: '14px' }}
        >
          {iconSymbol}
        </span>
      </div>
      
      {/* Professional Tooltip with highest z-index */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 text-xs px-3 py-2 rounded-lg opacity-0 group-hover/pin:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl border-2 border-amber-800/30 z-20">
        <div className="font-bold" style={{ fontFamily: 'serif' }}>{location.name}</div>
        <div className="text-xs text-amber-700">
          {tooltipText}
        </div>
        {/* Tooltip Arrow */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-100 border-l-2 border-t-2 border-amber-800/30 rotate-45"></div>
      </div>
    </button>
  );
});

LocationPin.displayName = 'LocationPin';

// Memoized Game Map Component
export const GameMap = memo<{
  locations: Location[];
  onLocationClick: (locationId: string) => void;
}>(({ locations, onLocationClick }) => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-inner border-4 border-amber-800/20 overflow-hidden">
      {/* Theater Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20c0-11.046-8.954-20-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Location Pins */}
      {locations.map((location) => (
        <LocationPin
          key={location.id}
          location={location}
          onClick={onLocationClick}
        />
      ))}
    </div>
  );
});

GameMap.displayName = 'GameMap';

// Memoized Progress Bar Component
export const ProgressBar = memo<{
  progress: number;
  label: string;
  color?: string;
}>(({ progress, label, color = 'bg-blue-600' }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-primary-200">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-primary-800 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar'; 