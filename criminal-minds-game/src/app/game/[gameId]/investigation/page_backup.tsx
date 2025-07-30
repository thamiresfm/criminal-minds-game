'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Users, MessageCircle, Map, PuzzleIcon, User, Settings, LogOut, Home, AlertTriangle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  level: number;
  online: boolean;
}

interface GameState {
  timeRemaining: number;
  players: Player[];
  collectedClues: Clue[];
  currentTab: 'map' | 'board' | 'chat' | 'suspects';
}

// ========================================
// INVESTIGATION PAGE COMPONENT
// ========================================

export default function InvestigationPage({ params }: { params: { gameId: string } }) {
  const router = useRouter();
  const [showExitModal, setShowExitModal] = useState(false);
  
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: 23 * 60 + 45, // 23:45
    players: [
      { id: '1', name: 'Detective Silva', avatar: '👨‍🕵️', level: 12, online: true },
      { id: '2', name: 'Investigadora Costa', avatar: '👩‍🕵️', level: 8, online: true },
      { id: '3', name: 'Agente Santos', avatar: '🕵️‍♀️', level: 15, online: false },
    ],
    collectedClues: [
      { id: '1', name: 'Programa da Peça', description: 'Programa oficial da apresentação do Teatro Royal com anotações suspeitas', location: 'Lobby', importance: 'medium', collected: true },
      { id: '2', name: 'Chave Misteriosa', description: 'Uma chave antiga encontrada no camarim principal', location: 'Camarim', importance: 'high', collected: true },
      { id: '3', name: 'Carta Ameaçadora', description: 'Carta encontrada com ameaças ao protagonista da peça', location: 'Palco', importance: 'critical', collected: true },
    ],
    currentTab: 'map',
  });

  const [locations] = useState<Location[]>([
    { id: 'camarim', name: 'Camarins', x: 18, y: 18, explored: true, hasClues: false, hasImportantClues: false },
    { id: 'palco', name: 'Palco Principal', x: 50, y: 20, explored: true, hasClues: false, hasImportantClues: false },
    { id: 'bar', name: 'Bar Royal', x: 82, y: 18, explored: false, hasClues: true, hasImportantClues: false },
    { id: 'camarote-a', name: 'Camarote Real', x: 22, y: 48, explored: false, hasClues: true, hasImportantClues: false },
    { id: 'camarote-b', name: 'Camarote Imperial', x: 78, y: 48, explored: false, hasClues: true, hasImportantClues: true },
    { id: 'plateia', name: 'Plateia Principal', x: 50, y: 58, explored: false, hasClues: true, hasImportantClues: false },
    { id: 'escritorio', name: 'Escritório', x: 18, y: 82, explored: false, hasClues: true, hasImportantClues: true },
    { id: 'deposito', name: 'Depósito', x: 82, y: 82, explored: false, hasClues: true, hasImportantClues: false },
    { id: 'lobby', name: 'Grand Lobby', x: 50, y: 78, explored: false, hasClues: true, hasImportantClues: false },
  ]);

  // ========================================
  // EVENT HANDLERS
  // ========================================

  const handleLocationClick = (locationId: string) => {
    console.log('Explorar localização:', locationId);
    // Implementar lógica de exploração
  };

  const getClueImportanceColor = (importance: string): string => {
    switch (importance) {
      case 'critical': return 'border-accent-red bg-accent-red/5';
      case 'high': return 'border-accent-gold bg-accent-gold/5';
      case 'medium': return 'border-accent-blue bg-accent-blue/5';
      case 'low': return 'border-primary-300 bg-primary-50';
      default: return 'border-primary-300 bg-primary-50';
    }
  };

  const getClueImportanceIcon = (importance: string): string => {
    switch (importance) {
      case 'critical': return '🔴';
      case 'high': return '🟡';
      case 'medium': return '🔵';
      case 'low': return '⚪';
      default: return '⚪';
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    const explored = locations.filter(loc => loc.explored).length;
    return Math.round((explored / locations.length) * 100);
  };

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const handleExitToLobby = () => {
    setShowExitModal(false);
    router.push('/lobby');
  };

  const handleLeaveGame = () => {
    setShowExitModal(false);
    router.push('/');
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary flex flex-col">
      
      {/* Header */}
      <header className="bg-primary-50 shadow-sm border-b border-primary-200 px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Game Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-accent-red" />
              <span className="font-mono text-lg font-bold text-accent-red">
                {formatTime(gameState.timeRemaining)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary-600" />
              <span className="text-sm text-primary-600">{gameState.players.length} jogadores</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-primary-600" />
              <span className="text-sm text-primary-600">2 mensagens</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => router.push('/settings')}
              className="p-2 rounded-lg bg-white border border-primary-200 hover:bg-primary-50 transition-colors"
            >
              <Settings className="w-5 h-5 text-primary-600" />
            </button>
            <button 
              onClick={handleExitClick}
              className="p-2 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        
        {/* Theater Map */}
        <div className="flex-1 p-4">
          
          {/* Map Header */}
          <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white rounded-xl p-6 mb-6 shadow-xl relative overflow-hidden">
            
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 via-transparent to-accent-gold/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">🎭</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-gold to-yellow-300 bg-clip-text text-transparent">
                      Teatro Royal
                    </h1>
                    <p className="text-primary-200 text-sm">Explore os ambientes em busca de evidências cruciais</p>
                  </div>
                </div>
                
                {/* Progress Indicators */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
                    <span className="text-green-200">{locations.filter(l => l.explored).length} Explorados</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
                    <span className="text-yellow-200">{locations.filter(l => !l.explored).length} Restantes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg"></div>
                    <span className="text-red-200">{gameState.collectedClues.length} Pistas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Theater Map */}
          <div className="relative group">
            
            {/* Beautiful Theater Map */}
            <div className="rounded-3xl p-8 h-[32rem] relative overflow-hidden shadow-2xl border-2 border-slate-200" style={{
              background: `
                linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%),
                radial-gradient(circle at 30% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(184, 134, 11, 0.1) 0%, transparent 50%)
              `
            }}>
              
              {/* Elegant Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)
                `
              }}></div>

              {/* Beautiful Location Pins */}
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin"
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                  }}
                >
                  {/* Elegant Pin */}
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-xl transition-all duration-300 group-hover/pin:scale-125 border-2 ${
                    location.explored
                      ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-300 text-white'
                      : location.hasImportantClues
                      ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400 text-white animate-pulse'
                      : 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-300 text-white'
                  }`}>
                    {/* Elegant Icons */}
                    <span className="drop-shadow-sm">
                      {location.explored ? '✓' : location.hasImportantClues ? '!' : '?'}
                    </span>
                  </div>
                  
                  {/* Beautiful Tooltip */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover/pin:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl border border-slate-600">
                    <div className="font-semibold">{location.name}</div>
                    <div className="text-xs text-slate-300">
                      {location.explored ? '✅ Explorado' : location.hasImportantClues ? '⚠️ Pista Crítica' : '🔍 Clique para explorar'}
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                  </div>
                </button>
              ))}

            </div>

            {/* Enhanced Legend */}
            <div className="bg-gradient-to-r from-white to-primary-50 rounded-xl p-4 shadow-lg border border-primary-200">
              <h3 className="font-bold text-primary-900 mb-4 flex items-center">
                <span className="mr-2">🗂️</span>
                Legenda do Mapa
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full border border-green-300"></div>
                  <span className="text-primary-700 font-medium">Explorado</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                  <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-red-700 rounded-full border border-red-400 animate-pulse"></div>
                  <span className="text-primary-700 font-medium">Crítico</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                  <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border border-yellow-300"></div>
                  <span className="text-primary-700 font-medium">Comum</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                  <div className="w-4 h-4 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full border border-gray-300"></div>
                  <span className="text-primary-700 font-medium">Inexplorado</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary-700">Progresso da Investigação:</span>
                  <span className="text-sm font-bold text-accent-gold">{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-primary-100 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-accent-gold to-green-500 h-3 rounded-full transition-all duration-1000 shadow-sm animate-progress"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-white border-l border-primary-200 p-6 space-y-6">
          
          {/* Collected Clues Panel */}
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-lg border border-primary-200 overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🕵️</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-white">Evidências Coletadas</h2>
                    <p className="text-primary-200 text-sm">{gameState.collectedClues.length} de 8 possíveis</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-lg text-sm font-medium hover:bg-accent-gold/30 transition-colors">
                  Ver Detalhes
                </button>
              </div>
            </div>

            {/* Clues List */}
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {gameState.collectedClues.map((clue, index) => (
                <div key={clue.id} className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-lg ${getClueImportanceColor(clue.importance)}`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getClueImportanceIcon(clue.importance)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-primary-900 text-sm">{clue.name}</h3>
                        <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">{clue.location}</span>
                      </div>
                      <p className="text-xs text-primary-600 line-clamp-2">{clue.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-medium text-primary-500 capitalize">{clue.importance}</span>
                        <div className="flex space-x-1">
                          <button className="px-2 py-1 bg-primary-100 hover:bg-primary-200 rounded text-xs text-primary-600 transition-colors">
                            Ver
                          </button>
                          <button className="px-2 py-1 bg-accent-blue/10 hover:bg-accent-blue/20 rounded text-xs text-accent-blue transition-colors">
                            Analisar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add More Placeholder */}
              <div className="p-4 border-2 border-dashed border-primary-200 rounded-lg text-center">
                <div className="text-primary-400 mb-2">
                  <PuzzleIcon className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-sm text-primary-500 font-medium">Continue Explorando</p>
                <p className="text-xs text-primary-400">Mais evidências aguardam descoberta</p>
                <div className="mt-2 w-full bg-accent-gold/20 h-1 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Sair da Partida</h2>
                  <p className="text-gray-600 text-sm">Tem certeza que deseja sair?</p>
                </div>
                <button 
                  onClick={handleCancelExit}
                  className="ml-auto p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Game Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tempo restante:</span>
                    <span className="font-medium text-gray-900">{formatTime(gameState.timeRemaining)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Evidências coletadas:</span>
                    <span className="font-medium text-gray-900">{gameState.collectedClues.length}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleExitToLobby}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Voltar ao Lobby</span>
                </button>
                
                <button 
                  onClick={handleLeaveGame}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair Completamente</span>
                </button>
                
                <button 
                  onClick={handleCancelExit}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  Continuar Jogando
                </button>
              </div>

              {/* Footer Note */}
              <p className="text-center text-xs text-gray-500 mt-4">
                💾 Seu progresso é salvo automaticamente
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 