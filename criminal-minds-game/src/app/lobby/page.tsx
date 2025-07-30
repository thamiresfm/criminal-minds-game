'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Link as LinkIcon, Dice6, Users, Clock, Settings, Bell, Search, LogOut, X, Check, User, Shield, Gamepad2, Loader, Zap, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth, useAuthActions } from '@/lib/stores/authStore';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/lib/stores/notificationStore';

// ========================================
// TYPES
// ========================================

interface GameRoom {
  id: string;
  name: string;
  case: string;
  players: number;
  maxPlayers: number;
  timeRemaining: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isPublic: boolean;
  hostName: string;
}

interface GameHistory {
  id: string;
  case: string;
  result: 'won' | 'lost';
  timeUsed: number;
  playersCount: number;
  completedAt: Date;
}

// ========================================
// LOBBY PAGE COMPONENT
// ========================================

export default function LobbyPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuthActions();
  const notify = useNotify();

  // Estados para pesquisa de partidas
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'case' | 'host' | 'difficulty'>('all');
  const [filteredGames, setFilteredGames] = useState<GameRoom[]>([]);

  // Estados para modais de ação rápida
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [gameIdInput, setGameIdInput] = useState('');
  const [isSearchingMatch, setIsSearchingMatch] = useState(false);

  // Mock data
  const [activeGames] = useState<GameRoom[]>([
    {
      id: 'teatro-001',
      name: 'Teatro Mystery',
      case: 'Morte no Palco',
      players: 3,
      maxPlayers: 4,
      timeRemaining: 30 * 60 + 40,
      difficulty: 'medium',
      isPublic: true,
      hostName: 'Detective Silva'
    },
    {
      id: 'heist-002',
      name: 'Heist Investigation',
      case: 'O Grande Assalto',
      players: 2,
      maxPlayers: 6,
      timeRemaining: 35 * 60,
      difficulty: 'hard',
      isPublic: true,
      hostName: 'Agent Cooper'
    }
  ]);

  const [gameHistory] = useState<GameHistory[]>([
    {
      id: '1',
      case: 'Mistério do Teatro',
      result: 'won',
      timeUsed: 45 * 60,
      playersCount: 4,
      completedAt: new Date(Date.now() - 86400000)
    }
  ]);

  // ========================================
  // SEARCH FUNCTIONS
  // ========================================

  const searchGames = (games: GameRoom[], query: string, filter: string) => {
    if (!query.trim()) return games;

    const lowerQuery = query.toLowerCase().trim();
    
    return games.filter(game => {
      switch (filter) {
        case 'case':
          return game.case.toLowerCase().includes(lowerQuery);
        case 'host':
          return game.hostName.toLowerCase().includes(lowerQuery);
        case 'difficulty':
          return game.difficulty.toLowerCase().includes(lowerQuery);
        default:
          return (
            game.name.toLowerCase().includes(lowerQuery) ||
            game.case.toLowerCase().includes(lowerQuery) ||
            game.hostName.toLowerCase().includes(lowerQuery) ||
            game.difficulty.toLowerCase().includes(lowerQuery) ||
            game.id.toLowerCase().includes(lowerQuery)
          );
      }
    });
  };

  useEffect(() => {
    const filtered = searchGames(activeGames, searchQuery, searchFilter);
    setFilteredGames(filtered);
  }, [activeGames, searchQuery, searchFilter]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchFilter('all');
  };

  // ========================================
  // QUICK ACTION HANDLERS
  // ========================================

  const handleCreateGame = () => {
    setShowCreateModal(true);
  };

  const handleJoinById = () => {
    setShowJoinModal(true);
    setGameIdInput('');
  };

  const handleQuickMatch = () => {
    setIsSearchingMatch(true);
    
    notify.info(
      '🎲 Buscando Partida',
      'Procurando a melhor partida disponível...',
      { duration: 3000 }
    );
    
    // Simular busca
    setTimeout(() => {
      const availableGames = activeGames.filter(game => game.players < game.maxPlayers);
      
      if (availableGames.length > 0) {
        const selectedGame = availableGames[0];
        setIsSearchingMatch(false);
        
        notify.success(
          '🎯 Partida Encontrada!',
          `Entrando em "${selectedGame.name}"`,
          { duration: 3000 }
        );
        
        setTimeout(() => {
          router.push(`/game/investigation?gameId=${selectedGame.id}`);
        }, 1000);
      } else {
        // Criar nova partida automaticamente
        const newGameId = `quick-${Date.now()}`;
        setIsSearchingMatch(false);
        
        notify.success(
          '🚀 Nova Partida Criada!',
          'Criada partida especialmente para você!',
          { duration: 3000 }
        );
        
        setTimeout(() => {
          router.push(`/game/investigation?gameId=${newGameId}`);
        }, 1000);
      }
    }, 2500);
  };

  const handleJoinByIdSubmit = () => {
    if (!gameIdInput.trim()) {
      notify.error('Erro', 'Digite o ID da partida');
      return;
    }
    
    // Buscar partida
    const existingGame = activeGames.find(game => 
      game.id.toLowerCase().includes(gameIdInput.toLowerCase()) ||
      game.name.toLowerCase().includes(gameIdInput.toLowerCase())
    );
    
    if (!existingGame) {
      notify.error('Erro', 'Partida não encontrada. Verifique o ID.');
      return;
    }
    
    if (existingGame.players >= existingGame.maxPlayers) {
      notify.error('Erro', 'Esta partida está cheia.');
      return;
    }
    
    setShowJoinModal(false);
    notify.success(
      '🎯 Partida Encontrada!',
      `Entrando em "${existingGame.name}"`,
      { duration: 3000 }
    );
    
    setTimeout(() => {
      router.push(`/game/investigation?gameId=${existingGame.id}`);
    }, 500);
  };

  const handleCreateGameSubmit = () => {
    const gameId = `created-${Date.now()}`;
    setShowCreateModal(false);
    
    notify.success(
      '🎮 Partida Criada!',
      'Sua partida foi criada com sucesso!',
      { duration: 4000 }
    );
    
    setTimeout(() => {
      router.push(`/game/investigation?gameId=${gameId}`);
    }, 1000);
  };

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyIcon = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return '⭐';
      case 'medium': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-accent-gold" />
          <p className="text-primary-600">Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      
      {/* Header - Layout Aprimorado */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-primary-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between">
            
            {/* User Info - Layout Melhorado */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-gold via-yellow-500 to-orange-400 flex items-center justify-center shadow-lg ring-2 ring-white">
                  <span className="text-lg font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <h2 className="text-lg font-bold text-primary-900">{user?.name || 'Usuário'}</h2>
                <div className="flex items-center space-x-3 text-sm text-primary-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
                    <span className="font-medium">Level {user?.level || 1}</span>
                  </div>
                  <span className="text-primary-300">•</span>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-accent-blue" />
                    <span>{user?.gamesPlayed || 0} casos resolvidos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions - Layout Melhorado */}
            <div className="flex items-center space-x-3">
              <Link href="/settings">
                <button className="p-3 rounded-xl bg-primary-50 hover:bg-primary-100 border border-primary-200 hover:border-primary-300 transition-all duration-200 group">
                  <Settings className="w-5 h-5 text-primary-600 group-hover:text-primary-700 group-hover:rotate-90 transition-all duration-200" />
                </button>
              </Link>
              <button 
                onClick={logout}
                className="p-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-all duration-200 group"
              >
                <LogOut className="w-5 h-5 text-red-600 group-hover:text-red-700 group-hover:scale-110 transition-all duration-200" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Layout Expandido */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="space-y-10">

          {/* Welcome Section - Tipografia Melhorada */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-gold/10 rounded-full border border-accent-gold/20 mb-2">
              <Gamepad2 className="w-4 h-4 text-accent-gold" />
              <span className="text-sm font-medium text-accent-gold">Investigação Criminal Online</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-3 leading-tight">
              Bem-vindo ao <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent-gold via-yellow-500 to-orange-400 bg-clip-text text-transparent">
                Criminal Minds
              </span>
            </h1>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto leading-relaxed">
              Escolha uma investigação e teste suas habilidades de detetive em casos desafiadores
            </p>
          </div>

          {/* Quick Actions - Layout Grid Otimizado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <button 
              onClick={handleCreateGame}
              className="group relative overflow-hidden bg-gradient-to-br from-accent-gold via-yellow-500 to-orange-400 text-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start space-x-4">
                <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                  <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1">Criar Partida</h3>
                  <p className="text-white/80 text-sm">Monte sua investigação personalizada</p>
                </div>
              </div>
            </button>

            <button 
              onClick={handleJoinById}
              className="group relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start space-x-4">
                <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                  <LinkIcon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1">Entrar c/ ID</h3>
                  <p className="text-white/80 text-sm">Junte-se a uma partida específica</p>
                </div>
              </div>
            </button>

            <button 
              onClick={handleQuickMatch}
              disabled={isSearchingMatch}
              className={`group relative overflow-hidden p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98] transform hover:-translate-y-2 ${
                isSearchingMatch 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-br from-accent-blue via-blue-600 to-blue-700 text-white'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start space-x-4">
                <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                  {isSearchingMatch ? (
                    <Loader className="w-7 h-7 animate-spin" />
                  ) : (
                    <Dice6 className="w-7 h-7 group-hover:rotate-180 transition-transform duration-500" />
                  )}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1">
                    {isSearchingMatch ? 'Procurando...' : 'Jogo Aleatório'}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {isSearchingMatch ? 'Aguarde...' : 'Deixe o destino escolher'}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Active Games - Layout Responsivo Melhorado */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            {/* Header da Seção */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent-gold/10 rounded-lg">
                  <Users className="w-6 h-6 text-accent-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-900">Partidas Ativas</h3>
                  {searchQuery && (
                    <p className="text-sm text-primary-600 mt-1">
                      Encontradas {filteredGames.length} de {activeGames.length} partidas
                    </p>
                  )}
                </div>
              </div>
              
              {/* Sistema de Pesquisa - Layout Responsivo */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                
                {/* Filtro Aprimorado */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-gradient-to-br from-accent-gold to-yellow-500 rounded-lg flex items-center justify-center shadow-sm">
                      <Search className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <select
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value as 'all' | 'case' | 'host' | 'difficulty')}
                    className="appearance-none pl-14 pr-12 py-4 text-sm font-bold bg-gradient-to-r from-white to-primary-50 border-2 border-primary-200 rounded-2xl focus:ring-4 focus:ring-accent-gold/20 focus:border-accent-gold shadow-lg hover:shadow-xl hover:border-accent-gold/50 transition-all duration-300 cursor-pointer min-w-[200px] text-primary-900"
                  >
                    <option value="all" className="py-3 px-4 text-primary-900 font-medium bg-white">
                      🔍 Todos os campos
                    </option>
                    <option value="case" className="py-3 px-4 text-primary-900 font-medium bg-white">
                      🎭 Por Caso
                    </option>
                    <option value="host" className="py-3 px-4 text-primary-900 font-medium bg-white">
                      👤 Por Host
                    </option>
                    <option value="difficulty" className="py-3 px-4 text-primary-900 font-medium bg-white">
                      ⭐ Por Dificuldade
                    </option>
                  </select>
                  {/* Custom Arrow */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {/* Decorative Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-gold/20 via-transparent to-accent-gold/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Input de Pesquisa Aprimorado */}
                <div className="relative min-w-[300px] flex-1">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-gradient-to-br from-accent-blue to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Search className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Buscar ${
                      searchFilter === 'all' ? 'partida...' : 
                      searchFilter === 'case' ? 'caso...' : 
                      searchFilter === 'host' ? 'host...' : 'dificuldade...'
                    }`}
                    className="w-full pl-14 pr-14 py-4 text-sm font-medium bg-gradient-to-r from-white to-primary-50 border-2 border-primary-200 rounded-2xl focus:ring-4 focus:ring-accent-blue/20 focus:border-accent-blue shadow-lg hover:shadow-xl hover:border-accent-blue/50 transition-all duration-300 placeholder-primary-400 text-primary-900"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-red-100 rounded-xl transition-colors group"
                    >
                      <X className="w-4 h-4 text-red-500 group-hover:text-red-700 group-hover:scale-110 transition-all duration-200" />
                    </button>
                  )}
                  {/* Decorative Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-blue/20 via-transparent to-accent-blue/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  {/* Shortcut Hint */}
                  {!searchQuery && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-primary-400 bg-primary-100 px-2 py-1 rounded-lg border border-primary-200 font-mono">
                      ⌘K
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Lista de Partidas - Cards Melhorados */}
            <div className="space-y-4">
              {(searchQuery ? filteredGames : activeGames).length === 0 ? (
                <div className="text-center py-16">
                  {searchQuery ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                        <Search className="w-8 h-8 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-primary-900 mb-2">Nenhuma partida encontrada</h4>
                        <p className="text-primary-600 mb-4">Não encontramos partidas para "{searchQuery}"</p>
                        <button
                          onClick={handleClearSearch}
                          className="px-4 py-2 bg-accent-gold text-white rounded-lg hover:bg-accent-gold/90 transition-colors font-medium"
                        >
                          Limpar pesquisa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                        <Users className="w-8 h-8 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-primary-900 mb-2">Nenhuma partida ativa</h4>
                        <p className="text-primary-600">Seja o primeiro a criar uma partida!</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                (searchQuery ? filteredGames : activeGames).map((game) => (
                  <div key={game.id} className="bg-gradient-to-br from-white to-primary-50/30 rounded-3xl p-8 shadow-xl border border-primary-200/50 hover:shadow-2xl hover:border-accent-gold/40 transition-all duration-500 group relative overflow-hidden">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-gold/5 to-primary-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative">
                      {/* Header Principal */}
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                        <div className="flex-1">
                          {/* Título e Match Badge */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex flex-col">
                              <div className="flex items-center space-x-3 mb-2">
                                {searchQuery && searchFilter === 'all' && (
                                  <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-accent-gold via-yellow-500 to-orange-400 text-white rounded-full shadow-lg">
                                    <Star className="w-3 h-3 mr-1" />
                                    <span className="text-xs font-bold">MATCH</span>
                                  </div>
                                )}
                                <h4 className="text-2xl lg:text-3xl font-bold text-primary-900 group-hover:text-accent-gold transition-colors duration-300">
                                  {game.name}
                                </h4>
                              </div>
                              <p className="text-primary-600 text-sm font-medium">Partida Ativa • ID: {game.id}</p>
                            </div>
                            
                            {/* Difficulty Badge */}
                            <div className={`inline-flex items-center px-4 py-2.5 rounded-2xl text-sm font-bold shadow-lg border-2 ${
                              game.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' :
                              game.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-red-50 text-red-700 border-red-200'
                            }`}>
                              <span className="mr-2 text-base">{getDifficultyIcon(game.difficulty)}</span>
                              {game.difficulty.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Informações em Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        
                        {/* Caso */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-primary-100 group-hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                              <span className="text-lg">🎭</span>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide">Caso</p>
                              <p className="text-lg font-bold text-primary-900">{game.case}</p>
                            </div>
                          </div>
                        </div>

                        {/* Jogadores */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-primary-100 group-hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide">Jogadores</p>
                              <p className="text-lg font-bold text-primary-900">
                                {game.players}<span className="text-primary-500">/{game.maxPlayers}</span>
                              </p>
                            </div>
                          </div>
                          {/* Progress Bar */}
                          <div className="w-full bg-primary-100 rounded-full h-2 mt-3">
                            <div 
                              className="bg-gradient-to-r from-accent-gold to-yellow-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(game.players / game.maxPlayers) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Tempo */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-primary-100 group-hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide">Tempo Restante</p>
                              <p className="text-lg font-bold text-primary-900 font-mono">{formatTime(game.timeRemaining)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Host */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-primary-100 group-hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide">Host</p>
                              <p className="text-lg font-bold text-primary-900">{game.hostName}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status e Ação */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6 border-t border-primary-200/50">
                        
                        {/* Status da Partida */}
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full shadow-lg ${
                              game.players < game.maxPlayers ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                            }`}></div>
                            <span className={`text-sm font-bold ${
                              game.players < game.maxPlayers ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {game.players < game.maxPlayers ? 'Vagas Disponíveis' : 'Partida Cheia'}
                            </span>
                          </div>
                          
                          {game.isPublic && (
                            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                              <Shield className="w-3 h-3 mr-1" />
                              Pública
                            </div>
                          )}
                        </div>

                        {/* Botão de Ação */}
                        <button 
                          onClick={() => router.push(`/game/investigation?gameId=${game.id}`)}
                          disabled={game.players >= game.maxPlayers}
                          className={`group/btn relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 min-w-[200px] ${
                            game.players >= game.maxPlayers
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-accent-gold via-yellow-500 to-orange-400 text-white hover:from-yellow-500 hover:via-orange-400 hover:to-accent-gold hover:shadow-2xl'
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                          <div className="relative flex items-center space-x-2">
                            <Gamepad2 className="w-5 h-5" />
                            <span>{game.players >= game.maxPlayers ? 'Partida Cheia' : 'Entrar na Partida'}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Game History - Visual Aprimorado */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-accent-blue/10 rounded-lg">
                <Clock className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary-900">Histórico de Casos</h3>
                <p className="text-sm text-primary-600 mt-1">Suas investigações anteriores</p>
              </div>
            </div>
            <div className="space-y-4">
              {gameHistory.map((game) => (
                <div key={game.id} className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${game.result === 'won' ? 'bg-green-500' : 'bg-red-500'} shadow-lg`}></div>
                      <div>
                        <h4 className="text-lg font-bold text-primary-900">{game.case}</h4>
                        <div className="flex items-center space-x-4 text-sm text-primary-600 mt-1">
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{game.playersCount} jogadores</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(game.timeUsed)}</span>
                          </span>
                          <span className="text-primary-400">
                            {game.completedAt.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                        game.result === 'won' 
                          ? 'text-green-700 bg-green-100 border border-green-200' 
                          : 'text-red-700 bg-red-100 border border-red-200'
                      }`}>
                        {game.result === 'won' ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Resolvido
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 mr-2" />
                            Não resolvido
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Criar Partida */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">Criar Nova Partida</h3>
              <p className="text-primary-600">Configure sua investigação</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">Nome da Partida</label>
                <input 
                  type="text" 
                  placeholder="Ex: Mistério da Biblioteca"
                  className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-accent-gold/20 focus:border-accent-gold transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">Máximo de Jogadores</label>
                <select className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-accent-gold/20 focus:border-accent-gold transition-all">
                  <option value="2">2 jogadores</option>
                  <option value="3">3 jogadores</option>
                  <option value="4">4 jogadores</option>
                  <option value="6">6 jogadores</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border-2 border-primary-200 text-primary-700 rounded-xl hover:bg-primary-50 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateGameSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-gold to-yellow-500 text-white rounded-xl hover:from-yellow-500 hover:to-accent-gold transition-all font-semibold shadow-lg"
              >
                Criar Partida
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Entrar por ID */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">Entrar na Partida</h3>
              <p className="text-primary-600">Digite o ID ou nome da partida</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary-700 mb-2">ID da Partida</label>
              <input 
                type="text" 
                value={gameIdInput}
                onChange={(e) => setGameIdInput(e.target.value)}
                placeholder="Ex: teatro-001 ou Teatro Mystery"
                className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleJoinByIdSubmit()}
              />
              <p className="text-xs text-primary-500 mt-2">Você pode usar o ID ou nome da partida</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowJoinModal(false)}
                className="flex-1 px-6 py-3 border-2 border-primary-200 text-primary-700 rounded-xl hover:bg-primary-50 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button 
                onClick={handleJoinByIdSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-500 hover:to-primary-600 transition-all font-semibold shadow-lg"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}