'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { Clock, Users, MessageCircle, Map, PuzzleIcon, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/lib/stores/notificationStore';
import { useAuthStore } from '@/lib/stores/authStore';

// Optimized imports - only import what we need
import { 
  ClueList, 
  FilterComponent, 
  GameMap, 
  ProgressBar 
} from '@/components/game/OptimizedComponents';
import { useGameState } from '@/lib/hooks/useGameState';
import { useOptimizedData, useOptimizedChat, useOptimizedPlayers } from '@/lib/hooks/useOptimizedData';

// Lazy load heavy components
const DetailsModal = React.lazy(() => import('@/components/game/DetailsModal'));
const AccusationModal = React.lazy(() => import('@/components/game/AccusationModal'));

// Loading component for Suspense
const ModalLoader = () => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 flex items-center space-x-3">
      <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      <span>Carregando...</span>
    </div>
  </div>
);

// Memoized Header Component
const GameHeader = React.memo<{
  timeRemaining: number;
  playersCount: number;
  formatTime: (seconds: number) => string;
}>(({ timeRemaining, playersCount, formatTime }) => (
  <div className="bg-gradient-to-r from-primary-900 to-primary-800 border-b border-primary-700 p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-accent-gold">
          <Clock className="w-5 h-5" />
          <span className="font-mono text-lg font-bold">
            {formatTime(timeRemaining)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-primary-200">
          <Users className="w-5 h-5" />
          <span className="font-medium">{playersCount} jogadores online</span>
        </div>
      </div>
    </div>
  </div>
));

GameHeader.displayName = 'GameHeader';

// Memoized Sidebar Component
const GameSidebar = React.memo<{
  currentTab: string;
  onTabChange: (tab: string) => void;
  locationProgress: number;
  evidenceProgress: number;
  cluesCount: number;
}>(({ currentTab, onTabChange, locationProgress, evidenceProgress, cluesCount }) => (
  <div className="w-80 bg-primary-800 border-r border-primary-700 flex flex-col">
    {/* Tab Navigation - Optimized */}
    <div className="p-4 border-b border-primary-700">
      <div className="grid grid-cols-2 gap-2">
        {[
          { id: 'map', label: 'Mapa', icon: Map },
          { id: 'clues', label: 'Evidências', icon: PuzzleIcon }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`p-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
              currentTab === id
                ? 'bg-accent-gold text-primary-900 font-bold'
                : 'bg-primary-700 text-primary-200 hover:bg-primary-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Progress Indicators */}
    <div className="p-4 space-y-4">
      <ProgressBar 
        progress={locationProgress} 
        label="Locais Explorados" 
        color="bg-green-600" 
      />
      <ProgressBar 
        progress={evidenceProgress} 
        label="Evidências Analisadas" 
        color="bg-blue-600" 
      />
      
      <div className="text-center p-3 bg-primary-700 rounded-lg">
        <span className="text-accent-gold font-bold text-lg">{cluesCount}</span>
        <p className="text-primary-300 text-sm">evidências coletadas</p>
      </div>
    </div>
  </div>
));

GameSidebar.displayName = 'GameSidebar';

// Main optimized component
export default function OptimizedInvestigationPage({ params }: { params: { gameId: string } }) {
  const router = useRouter();
  const notify = useNotify();
  const { user } = useAuthStore();
  
  // Use optimized game state management
  const { state, actions, selectors } = useGameState();

  // Initialize with memoized initial data
  const initialClues = useMemo(() => [
    {
      id: '1',
      name: 'Carta Ameaçadora',
      description: 'Uma carta anônima encontrada no camarim de Helena com ameaças diretas.',
      location: 'Camarim',
      importance: 'critical' as const,
      collected: true,
      analyzed: false,
      reviewed: false,
      details: 'Carta manuscrita em papel de alta qualidade, tinta azul, caligrafia masculina. Conteúdo: "Helena, sua arrogância acabará em tragédia. Você não merece o palco principal."'
    },
    {
      id: '2', 
      name: 'Frasco de Veneno',
      description: 'Pequeno frasco contendo restos de substância tóxica encontrado nos bastidores.',
      location: 'Corredor',
      importance: 'critical' as const,
      collected: true,
      analyzed: false,
      reviewed: false,
      details: 'Frasco de vidro transparente, 50ml, com restos de cianeto. Sem impressões digitais visíveis.'
    }
    // ... more clues would be added here
  ], []);

  const initialLocations = useMemo(() => [
    { id: 'camarim', name: 'Camarim', x: 20, y: 30, explored: false, hasClues: true, hasImportantClues: true },
    { id: 'palco', name: 'Palco', x: 50, y: 50, explored: false, hasClues: true, hasImportantClues: true },
    { id: 'corredor', name: 'Corredor', x: 80, y: 40, explored: false, hasClues: true, hasImportantClues: false },
    { id: 'foyer', name: 'Foyer', x: 30, y: 80, explored: false, hasClues: true, hasImportantClues: false },
    { id: 'plateia', name: 'Plateia', x: 70, y: 70, explored: false, hasClues: false, hasImportantClues: false },
    { id: 'entrada', name: 'Entrada Principal', x: 50, y: 90, explored: false, hasClues: false, hasImportantClues: false }
  ], []);

  // Initialize game state once
  useEffect(() => {
    actions.setClues(initialClues);
    actions.setLocations(initialLocations);
  }, [actions, initialClues, initialLocations]);

  // Use optimized data processing
  const {
    filteredClues,
    locationProgress,
    evidenceProgress,
    getClueImportanceColor,
    getClueImportanceIcon,
    formatTimeRemaining
  } = useOptimizedData(
    state.collectedClues,
    state.locations,
    state.players,
    state.chatMessages,
    state.clueFilter,
    state.searchTerm
  );

  // Optimized chat and player data
  const { unreadCount } = useOptimizedChat(state.chatMessages);
  const { onlinePlayers } = useOptimizedPlayers(state.players, user?.id || '');

  // Memoized event handlers
  const handleTabChange = useCallback((tab: string) => {
    actions.setTab(tab as any);
  }, [actions]);

  const handleClueSelect = useCallback((clue: any) => {
    actions.setSelectedClue(clue);
    actions.toggleModal('showDetailsModal', true);
  }, [actions]);

  const handleLocationClick = useCallback((locationId: string) => {
    // Handle location click logic
    console.log('Location clicked:', locationId);
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    actions.setFilter(filter as any);
  }, [actions]);

  const handleSearchChange = useCallback((term: string) => {
    actions.setSearchTerm(term);
  }, [actions]);

  // Auto-save with optimized timing
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      // Optimized save logic - only save when necessary
      const gameData = {
        clues: state.collectedClues,
        locations: state.locations,
        timeRemaining: state.timeRemaining
      };
      localStorage.setItem(`game_${params.gameId}`, JSON.stringify(gameData));
    }, 2000); // Debounced save

    return () => clearTimeout(saveTimer);
  }, [state.collectedClues, state.locations, state.timeRemaining, params.gameId]);

  // Render optimized content
  const renderTabContent = useMemo(() => {
    switch (state.currentTab) {
      case 'map':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary-100 mb-6">
              🎭 Teatro Real - Local do Crime
            </h2>
            <GameMap 
              locations={state.locations}
              onLocationClick={handleLocationClick}
            />
          </div>
        );
      
      case 'clues':
        return (
          <div className="flex-1 flex flex-col">
            <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white p-6">
              <h2 className="text-2xl font-bold">Evidências Coletadas</h2>
              <p className="text-primary-200">
                {filteredClues.length} de {state.collectedClues.length} evidências
              </p>
              
              <FilterComponent
                clueFilter={state.clueFilter}
                searchTerm={state.searchTerm}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
              />
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <ClueList
                clues={filteredClues}
                selectedClue={state.selectedClue}
                onClueSelect={handleClueSelect}
                getClueImportanceColor={getClueImportanceColor}
                getClueImportanceIcon={getClueImportanceIcon}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  }, [
    state.currentTab,
    state.locations,
    state.collectedClues,
    filteredClues,
    state.selectedClue,
    state.clueFilter,
    state.searchTerm,
    handleLocationClick,
    handleClueSelect,
    handleFilterChange,
    handleSearchChange,
    getClueImportanceColor,
    getClueImportanceIcon
  ]);

  return (
    <div className="h-screen bg-gradient-to-br from-bg-primary to-bg-secondary flex flex-col overflow-hidden">
      
      {/* Optimized Header */}
      <GameHeader 
        timeRemaining={state.timeRemaining}
        playersCount={onlinePlayers.length}
        formatTime={formatTimeRemaining}
      />

      <div className="flex-1 flex overflow-hidden">
        
        {/* Optimized Sidebar */}
        <GameSidebar
          currentTab={state.currentTab}
          onTabChange={handleTabChange}
          locationProgress={locationProgress}
          evidenceProgress={evidenceProgress}
          cluesCount={state.collectedClues.length}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {renderTabContent}
        </div>

      </div>

      {/* Lazy-loaded Modals with Suspense */}
      <Suspense fallback={<ModalLoader />}>
        {state.showDetailsModal && (
          <DetailsModal
            clue={state.selectedClue}
            onClose={() => actions.toggleModal('showDetailsModal', false)}
          />
        )}
        
        {state.showAccusationModal && (
          <AccusationModal
            onClose={() => actions.toggleModal('showAccusationModal', false)}
          />
        )}
      </Suspense>

    </div>
  );
}

// Performance optimization tips applied:
// ✅ 1. useReducer instead of multiple useState
// ✅ 2. useMemo for expensive calculations
// ✅ 3. useCallback for event handlers
// ✅ 4. React.memo for child components
// ✅ 5. Lazy loading for modals
// ✅ 6. Optimized imports
// ✅ 7. Debounced auto-save
// ✅ 8. Memoized initial data
// ✅ 9. Suspense for code splitting
// ✅ 10. Optimized re-render patterns 