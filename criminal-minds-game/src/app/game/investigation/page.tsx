'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Users, MessageCircle, Map, PuzzleIcon, User, Settings, LogOut, Home, AlertTriangle, X, Eye, Search, Filter, ArrowLeft, ChevronRight, CheckCircle, Microscope, FileCheck, TestTube, Beaker, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/lib/stores/notificationStore';
import { useAuthStore } from '@/lib/stores/authStore';

// ========================================
// TYPES
// ========================================

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

interface Player {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

interface GameState {
  timeRemaining: number;
  players: Player[];
  collectedClues: Clue[];
  currentTab: 'map' | 'board' | 'chat' | 'suspects';
  locations: Location[];
}

// ========================================
// INVESTIGATION PAGE COMPONENT - STATIC VERSION
// ========================================

export default function InvestigationPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const notify = useNotify();
  
  // Get gameId from URL search params or use default
  const [gameId, setGameId] = useState('demo-game');
  
  // Estados do jogo
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: 1800, // 30 minutos
    players: [
      { id: '1', name: 'Detective Silva', avatar: '🕵️‍♀️', online: true },
      { id: '2', name: 'Agent Cooper', avatar: '👮‍♂️', online: true },
      { id: '3', name: 'Dr. Watson', avatar: '👨‍⚕️', online: false }
    ],
    collectedClues: [],
    currentTab: 'map',
    locations: [
      { id: 'camarim', name: 'Camarim', x: 20, y: 25, explored: false, hasClues: true, hasImportantClues: true },
      { id: 'palco', name: 'Palco', x: 75, y: 25, explored: false, hasClues: true, hasImportantClues: true },
      { id: 'corredor', name: 'Corredor', x: 15, y: 55, explored: false, hasClues: true, hasImportantClues: true },
      { id: 'foyer', name: 'Foyer', x: 20, y: 75, explored: false, hasClues: true, hasImportantClues: false },
      { id: 'plateia', name: 'Plateia', x: 75, y: 70, explored: false, hasClues: true, hasImportantClues: false },
      { id: 'entrada', name: 'Entrada Principal', x: 50, y: 90, explored: false, hasClues: true, hasImportantClues: false },
    ]
  });

  // Extract gameId from URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlGameId = urlParams.get('gameId');
      if (urlGameId) {
        setGameId(urlGameId);
      }
    }
  }, []);

  const formatTimeRemaining = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleExploreLocation = (locationId: string) => {
    setGameState(prev => ({
      ...prev,
      locations: prev.locations.map(loc => 
        loc.id === locationId ? { ...loc, explored: true } : loc
      )
    }));
    
    notify.success('🔍 Local Explorado!', `Você explorou ${gameState.locations.find(l => l.id === locationId)?.name}`);
  };

  const handleBackToLobby = () => {
    router.push('/lobby');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToLobby}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <h1 className="text-xl font-bold text-yellow-400">Criminal Minds Investigation</h1>
            <span className="text-sm text-gray-400">Game ID: {gameId}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-yellow-400">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg font-bold">
                {formatTimeRemaining(gameState.timeRemaining)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>{gameState.players.filter(p => p.online).length}/{gameState.players.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex gap-4">
          <button
            onClick={() => setGameState(prev => ({ ...prev, currentTab: 'map' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              gameState.currentTab === 'map' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Map className="w-4 h-4" />
            Mapa do Teatro
          </button>
          
          <button
            onClick={() => setGameState(prev => ({ ...prev, currentTab: 'board' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              gameState.currentTab === 'board' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Search className="w-4 h-4" />
            Evidências ({gameState.collectedClues.length})
          </button>

          <button
            onClick={() => setGameState(prev => ({ ...prev, currentTab: 'suspects' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              gameState.currentTab === 'suspects' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Eye className="w-4 h-4" />
            Suspeitos
          </button>
          
          <button
            onClick={() => setGameState(prev => ({ ...prev, currentTab: 'chat' }))}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              gameState.currentTab === 'chat' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Chat ({gameState.players.filter(p => p.online).length})
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {gameState.currentTab === 'map' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
              🎭 Teatro Royal Mystery
            </h2>
            
            <div className="relative bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-8 mx-auto max-w-4xl aspect-[4/3]">
              {/* Theater Map */}
              <div className="absolute inset-4 bg-amber-50 rounded border-2 border-amber-300">
                {gameState.locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleExploreLocation(location.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full text-sm font-bold transition-all hover:scale-110 ${
                      location.explored
                        ? 'bg-green-500 text-white shadow-lg'
                        : location.hasImportantClues
                        ? 'bg-red-500 text-white shadow-md animate-pulse'
                        : 'bg-blue-500 text-white shadow-md'
                    }`}
                    style={{
                      left: `${location.x}%`,
                      top: `${location.y}%`,
                    }}
                  >
                    {location.explored ? '✓' : location.hasImportantClues ? '⚠️' : '🔍'}
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {location.name}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-800">Evidências Críticas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-800">Inexplorado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-800">Explorado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState.currentTab === 'board' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Evidências Coletadas</h2>
            {gameState.collectedClues.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Nenhuma evidência coletada ainda</p>
                <p className="text-sm">Explore os locais do teatro para encontrar pistas</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gameState.collectedClues.map((clue) => (
                  <div
                    key={clue.id}
                    className="bg-gray-700 rounded-lg p-4 border-l-4 border-yellow-400"
                  >
                    <h3 className="font-bold text-white mb-2">{clue.name}</h3>
                    <p className="text-gray-300 text-sm mb-2">{clue.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-yellow-400">{clue.location}</span>
                      <span className={`px-2 py-1 rounded ${
                        clue.importance === 'critical' ? 'bg-red-600 text-white' :
                        clue.importance === 'high' ? 'bg-orange-600 text-white' :
                        clue.importance === 'medium' ? 'bg-yellow-600 text-black' :
                        'bg-gray-600 text-white'
                      }`}>
                        {clue.importance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {gameState.currentTab === 'suspects' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Suspeitos</h2>
            <div className="text-center py-12 text-gray-400">
              <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Lista de suspeitos em breve</p>
              <p className="text-sm">Colete evidências para revelar os suspeitos</p>
            </div>
          </div>
        )}

        {gameState.currentTab === 'chat' && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Chat da Investigação</h2>
            <div className="text-center py-12 text-gray-400">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Chat em desenvolvimento</p>
              <p className="text-sm">Em breve você poderá conversar com outros detetives</p>
            </div>
          </div>
        )}
      </main>

      {/* Players Panel */}
      <div className="fixed right-4 top-24 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <h3 className="font-bold mb-3 text-yellow-400 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Detetives Online
        </h3>
        <div className="space-y-2">
          {gameState.players.map((player) => (
            <div
              key={player.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                player.online ? 'bg-green-600/20 text-green-300' : 'bg-gray-700/50 text-gray-400'
              }`}
            >
              <span className="text-lg">{player.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{player.name}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                player.online ? 'bg-green-400' : 'bg-gray-500'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}