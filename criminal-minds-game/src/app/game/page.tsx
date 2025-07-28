'use client';

import React, { useState } from 'react';
import { Clock, Users, MessageCircle, Map, User, Home, Search, Eye, TestTube } from 'lucide-react';
import { accusationService } from '@/lib/services/accusationService';

// Página de jogo estática para GitHub Pages
export default function GamePage() {
  const [currentTab, setCurrentTab] = useState<'map' | 'clues' | 'suspects' | 'chat'>('map');
  const [timeRemaining] = useState(1800); // 30 minutos
  const [suspects, setSuspects] = useState<any[]>([]);
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [showAccusationModal, setShowAccusationModal] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const loadSuspects = async () => {
    try {
      const response = await accusationService.getSuspects('demo-game', { includeEvidence: true });
      setSuspects(response.suspects);
    } catch (error) {
      console.error('Erro ao carregar suspeitos:', error);
    }
  };

  React.useEffect(() => {
    if (currentTab === 'suspects' && suspects.length === 0) {
      loadSuspects();
    }
  }, [currentTab]);

  const handleAccusation = async () => {
    if (!selectedSuspect) return;

    try {
      const result = await accusationService.submitAccusation('demo-game', {
        suspectId: selectedSuspect,
        reasoning: 'Acusação baseada nas evidências coletadas',
        confidence: 85,
        playerId: 'player-1'
      });

      alert(`${result.gameResult.message}`);
      setShowAccusationModal(false);
    } catch (error) {
      console.error('Erro ao fazer acusação:', error);
      alert('Erro ao fazer acusação. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Criminal Minds Game</h1>
            <span className="text-gray-400">Teatro Royal Mystery</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>3 Jogadores</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentTab('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentTab === 'map' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Map className="w-4 h-4" />
            Mapa
          </button>
          
          <button
            onClick={() => setCurrentTab('clues')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentTab === 'clues' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Search className="w-4 h-4" />
            Evidências
          </button>

          <button
            onClick={() => setCurrentTab('suspects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentTab === 'suspects' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Eye className="w-4 h-4" />
            Suspeitos
          </button>
          
          <button
            onClick={() => setCurrentTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentTab === 'chat' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Chat (3)
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 pb-20">
        {currentTab === 'map' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Teatro Royal - Mapa de Investigação</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors">
                <h3 className="text-lg font-semibold mb-2">Palco Principal</h3>
                <p className="text-gray-300">Local do crime. Evidências importantes podem estar aqui.</p>
                <span className="inline-block mt-2 px-2 py-1 bg-green-600 text-xs rounded">Explorado</span>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors">
                <h3 className="text-lg font-semibold mb-2">Camarins</h3>
                <p className="text-gray-300">Onde os atores se preparavam antes da apresentação.</p>
                <span className="inline-block mt-2 px-2 py-1 bg-yellow-600 text-xs rounded">Parcialmente Explorado</span>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors">
                <h3 className="text-lg font-semibold mb-2">Foyer</h3>
                <p className="text-gray-300">Área de recepção do teatro.</p>
                <span className="inline-block mt-2 px-2 py-1 bg-red-600 text-xs rounded">Não Explorado</span>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'clues' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Evidências Coletadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <TestTube className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Programa da Peça</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Programa oficial com anotações suspeitas em vermelho.
                    </p>
                    <span className="inline-block px-2 py-1 bg-yellow-600 text-xs rounded">Analisando</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <TestTube className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Impressões Digitais</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Impressões encontradas no local do crime.
                    </p>
                    <span className="inline-block px-2 py-1 bg-green-600 text-xs rounded">Analisado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'suspects' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Suspeitos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suspects.map((suspect) => (
                <div 
                  key={suspect.id}
                  className={`bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors border-2 ${
                    selectedSuspect === suspect.id 
                      ? 'border-blue-500 bg-gray-600' 
                      : 'border-transparent hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedSuspect(suspect.id)}
                >
                  <h3 className="font-semibold text-lg mb-2">{suspect.name}</h3>
                  <p className="text-blue-400 text-sm mb-2">{suspect.role}</p>
                  <p className="text-gray-300 text-sm mb-3">{suspect.description}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-400 text-xs">Motivo:</span>
                      <p className="text-gray-300 text-sm">{suspect.motive}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Álibi:</span>
                      <p className="text-gray-300 text-sm">{suspect.alibi}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      suspect.suspicionLevel === 'critical' ? 'bg-red-600' :
                      suspect.suspicionLevel === 'high' ? 'bg-orange-600' :
                      suspect.suspicionLevel === 'medium' ? 'bg-yellow-600' :
                      'bg-green-600'
                    }`}>
                      {suspect.suspicionLevel === 'critical' ? 'Crítico' :
                       suspect.suspicionLevel === 'high' ? 'Alto' :
                       suspect.suspicionLevel === 'medium' ? 'Médio' : 'Baixo'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {suspects.length === 0 && (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Carregando suspeitos...</p>
              </div>
            )}
          </div>
        )}

        {currentTab === 'chat' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Chat da Equipe</h2>
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="font-semibold text-blue-400">Detetive Silva</p>
                    <p>Encontrei impressões digitais no programa da peça. Preciso analisar no laboratório.</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">há 5 minutos</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="font-semibold text-green-400">Investigadora Costa</p>
                    <p>O produtor Marcus Williams parece nervoso. Vou interrogá-lo mais.</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">há 3 minutos</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="font-semibold text-purple-400">Agente Santos</p>
                    <p>Confirmei o álibi do diretor. Ele realmente estava em reunião.</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">há 1 minuto</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors">
                Enviar
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </button>
          
          <button 
            onClick={() => setShowAccusationModal(true)}
            disabled={!selectedSuspect}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              selectedSuspect 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Fazer Acusação
          </button>
        </div>
      </div>

      {/* Modal de Acusação */}
      {showAccusationModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold mb-4">Confirmar Acusação</h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja acusar {suspects.find(s => s.id === selectedSuspect)?.name}?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAccusationModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAccusation}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 