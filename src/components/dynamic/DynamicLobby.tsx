'use client';

import React, { useState } from 'react';
import { Users, Crown, Settings, Play, UserPlus } from 'lucide-react';
import useDynamicGameStore from '@/lib/stores/dynamicGameStore';
import { useAuthStore } from '@/lib/stores/authStore';
import { GameGenerationOptions } from '@/types/dynamicGame';

export default function DynamicLobby() {
  const { currentGame, isHost, createGame, joinGame, startGame } = useDynamicGameStore();
  const { user } = useAuthStore();
  const [showSettings, setShowSettings] = useState(false);
  const [gameSettings, setGameSettings] = useState<GameGenerationOptions>({
    difficulty: 'medium',
    playerCount: 4,
    timeLimit: 30 * 60, // 30 minutos
    includeFalseClues: true,
    randomizeLocations: true
  });

  const handleCreateGame = () => {
    if (!user) return;
    
    createGame('teatro_001', gameSettings);
    
    // Auto-join como host
    joinGame(currentGame?.gameId || '', {
      id: user.id,
      name: user.name,
      avatar: user.avatar || '🕵️‍♂️',
      isHost: true,
      isOnline: true,
      currentLocation: '',
      discoveredClues: [],
      interrogationNotes: {},
      score: 0
    });
  };

  const handleStartGame = () => {
    if (!isHost || !currentGame) return;
    
    if (currentGame.players.length < 2) {
      alert('Necessário pelo menos 2 jogadores para iniciar');
      return;
    }
    
    startGame();
  };

  const canStart = isHost && currentGame && currentGame.players.length >= 2;

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-slate-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent-gold" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Criminal Minds</h1>
            <p className="text-slate-400">Jogo Dinâmico de Investigação</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleCreateGame}
              className="w-full bg-accent-gold hover:bg-accent-gold/90 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <Crown className="w-5 h-5" />
              <span>Criar Partida</span>
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span>Configurações</span>
            </button>
          </div>

          {showSettings && (
            <div className="mt-6 space-y-4 p-4 bg-slate-700/50 rounded-xl">
              <h3 className="text-white font-medium">Configurações da Partida</h3>
              
              <div>
                <label className="block text-slate-300 text-sm mb-2">Dificuldade</label>
                <select
                  value={gameSettings.difficulty}
                  onChange={(e) => setGameSettings(prev => ({ 
                    ...prev, 
                    difficulty: e.target.value as 'easy' | 'medium' | 'hard' 
                  }))}
                  className="w-full bg-slate-600 text-white rounded-lg px-3 py-2"
                >
                  <option value="easy">Fácil</option>
                  <option value="medium">Médio</option>
                  <option value="hard">Difícil</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Máximo de Jogadores: {gameSettings.playerCount}
                </label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={gameSettings.playerCount}
                  onChange={(e) => setGameSettings(prev => ({ 
                    ...prev, 
                    playerCount: parseInt(e.target.value) 
                  }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Tempo Limite: {Math.floor(gameSettings.timeLimit / 60)} minutos
                </label>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={gameSettings.timeLimit / 60}
                  onChange={(e) => setGameSettings(prev => ({ 
                    ...prev, 
                    timeLimit: parseInt(e.target.value) * 60
                  }))}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="falseClues"
                  checked={gameSettings.includeFalseClues}
                  onChange={(e) => setGameSettings(prev => ({ 
                    ...prev, 
                    includeFalseClues: e.target.checked 
                  }))}
                  className="rounded"
                />
                <label htmlFor="falseClues" className="text-slate-300 text-sm">
                  Incluir pistas falsas
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="randomizeLocations"
                  checked={gameSettings.randomizeLocations}
                  onChange={(e) => setGameSettings(prev => ({ 
                    ...prev, 
                    randomizeLocations: e.target.checked 
                  }))}
                  className="rounded"
                />
                <label htmlFor="randomizeLocations" className="text-slate-300 text-sm">
                  Randomizar localizações das pistas
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {currentGame.caseId === 'teatro_001' ? 'O Homicídio no Teatro Royal' : 'Caso Dinâmico'}
              </h1>
              <p className="text-slate-400">
                ID da Partida: <span className="text-accent-gold font-mono">{currentGame.gameId}</span>
              </p>
              <p className="text-slate-400">
                Fase: <span className="text-accent-gold capitalize">{currentGame.phase}</span>
              </p>
            </div>
            
            {isHost && (
              <button
                onClick={handleStartGame}
                disabled={!canStart}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-colors
                  ${canStart 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }
                `}
              >
                <Play className="w-5 h-5" />
                <span>Iniciar Jogo</span>
              </button>
            )}
          </div>
        </div>

        {/* Game Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-bold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-accent-gold" />
              Configurações da Partida
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Dificuldade:</span>
                <span className="text-white capitalize">{currentGame.statistics.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tempo Limite:</span>
                <span className="text-white">{Math.floor(currentGame.timeLimit / 60)} minutos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total de Pistas:</span>
                <span className="text-white">{currentGame.selectedClues.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Culpado:</span>
                <span className="text-accent-red font-bold">
                  {isHost ? currentGame.culprit.name : '🤐 Secreto'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <h3 className="text-white font-bold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-accent-gold" />
              Jogadores ({currentGame.players.length}/6)
            </h3>
            <div className="space-y-3">
              {currentGame.players.map((player) => (
                <div key={player.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-sm">{player.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{player.name}</span>
                      {player.isHost && (
                        <Crown className="w-4 h-4 text-accent-gold" />
                      )}
                      <div className={`
                        w-2 h-2 rounded-full 
                        ${player.isOnline ? 'bg-green-500' : 'bg-slate-500'}
                      `} />
                    </div>
                  </div>
                </div>
              ))}
              
              {currentGame.players.length < 6 && (
                <div className="flex items-center space-x-3 text-slate-400">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Aguardando jogadores...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h3 className="text-white font-bold mb-4">Como Jogar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div>
              <h4 className="text-white font-medium mb-2">🎯 Objetivo</h4>
              <p>Trabalhe em equipe para descobrir o culpado do crime. Colete pistas, interrogue suspeitos e faça sua acusação!</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">🔍 Gameplay</h4>
              <p>Explore diferentes locais, encontre evidências e conecte as pistas para resolver o mistério antes do tempo acabar.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">👥 Colaboração</h4>
              <p>Compartilhe descobertas com sua equipe através do chat e trabalhem juntos para chegar à verdade.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">⏱️ Dinâmico</h4>
              <p>Cada partida é única! O culpado e as pistas são randomizados para máxima rejogabilidade.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 