'use client';

import React, { useEffect, useState } from 'react';
import { Dice6, Users, Clock, Target, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { useNotify } from '@/lib/stores/notificationStore';

export default function DynamicGamePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const notify = useNotify();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar se usuário está logado
    if (!user) {
      notify.warning(
        '🔐 Login Necessário',
        'Você precisa estar logado para jogar.',
        { duration: 3000 }
      );
      router.push('/login');
      return;
    }

    notify.success(
      '🎮 Bem-vindo ao Jogo Dinâmico!',
      'Prepare-se para uma experiência única de investigação criminal.',
      { duration: 4000 }
    );
  }, [user, router, notify]);

  const startDynamicGame = async () => {
    setIsLoading(true);
    
    try {
      // Simular criação de jogo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      notify.success(
        '🚀 Jogo Dinâmico Criado!',
        'Redirecionando para o lobby...',
        { duration: 2000 }
      );
      
      // Redirecionar para lobby dinâmico (será implementado)
      // router.push('/dynamic-lobby');
      
    } catch (error) {
      notify.error(
        '❌ Erro ao Criar Jogo',
        'Tente novamente em alguns segundos.',
        { duration: 3000 }
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-primary-300">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-800 to-primary-900">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              🎲 <span className="text-accent-gold">Jogo Dinâmico</span>
            </h1>
            <p className="text-xl text-primary-200 mb-8 max-w-3xl mx-auto">
              Cada partida é única! O culpado, as pistas e os desafios são 
              <span className="text-accent-gold font-semibold"> randomizados </span>
              para uma experiência sempre nova de investigação criminal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={startDynamicGame}
                disabled={isLoading}
                className={`
                  px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
                  ${isLoading 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-accent-gold hover:bg-accent-gold/90 text-primary-900 hover:scale-105 shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full" />
                    <span>Criando Jogo...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Dice6 className="w-6 h-6" />
                    <span>Criar Partida Dinâmica</span>
                  </span>
                )}
              </button>
              <p className="text-primary-300 text-sm">
                Usuário: <span className="text-accent-gold font-medium">{user.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            🎯 Recursos do Jogo Dinâmico
          </h2>
          <p className="text-primary-300 text-lg">
            Tecnologia avançada para máxima rejogabilidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Culpado Aleatório */}
          <div className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-700 hover:border-accent-gold/50 transition-colors">
            <div className="w-12 h-12 bg-accent-red/20 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-accent-red" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              🎭 Culpado Aleatório
            </h3>
            <p className="text-primary-300">
              A cada partida, um suspeito diferente é escolhido como culpado, 
              garantindo que mesmo veteranos sejam surpreendidos.
            </p>
          </div>

          {/* Pistas Dinâmicas */}
          <div className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-700 hover:border-accent-gold/50 transition-colors">
            <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center mb-4">
              <Dice6 className="w-6 h-6 text-accent-blue" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              🔍 Pistas Dinâmicas
            </h3>
            <p className="text-primary-300">
              Pistas são selecionadas de um pool variado, incluindo pistas falsas 
              para aumentar a dificuldade e complexidade.
            </p>
          </div>

          {/* Multiplayer */}
          <div className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-700 hover:border-accent-gold/50 transition-colors">
            <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              👥 Até 6 Jogadores
            </h3>
            <p className="text-primary-300">
              Trabalhem em equipe para resolver o mistério. Chat em tempo real 
              e sincronização perfeita entre todos os investigadores.
            </p>
          </div>

          {/* Timer Dinâmico */}
          <div className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-700 hover:border-accent-gold/50 transition-colors">
            <div className="w-12 h-12 bg-accent-red/20 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-accent-red" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              ⏱️ Pressão do Tempo
            </h3>
            <p className="text-primary-300">
              Timer configurável de 15 a 60 minutos. A pressão do tempo torna 
              cada decisão crucial para o sucesso da investigação.
            </p>
          </div>

          {/* Dificuldade Adaptativa */}
          <div className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-700 hover:border-accent-gold/50 transition-colors">
            <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-accent-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              🎚️ Dificuldade Adaptativa
            </h3>
            <p className="text-primary-300">
              Sistema inteligente que ajusta a quantidade de pistas falsas 
              baseado no número de jogadores e dificuldade escolhida.
            </p>
          </div>

          {/* Estatísticas */}
          <div className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-700 hover:border-accent-gold/50 transition-colors">
            <div className="w-12 h-12 bg-accent-blue/20 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-accent-blue" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              📊 Sistema de Pontuação
            </h3>
            <p className="text-primary-300">
              Pontuação baseada em acerto da acusação, pistas descobertas 
              e tempo restante. Compete com sua equipe para ser o melhor detetive!
            </p>
          </div>
        </div>
      </div>

      {/* Technical Info */}
      <div className="bg-primary-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              ⚙️ Como Funciona
            </h2>
            <p className="text-primary-300 text-lg">
              Tecnologia avançada por trás da experiência dinâmica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">🧠 Engine Inteligente</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-900 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Seleção Aleatória</h4>
                    <p className="text-primary-300 text-sm">
                      Culpado é escolhido aleatoriamente entre todos os suspeitos disponíveis
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-900 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Pool de Pistas</h4>
                    <p className="text-primary-300 text-sm">
                      Pistas são selecionadas de um pool baseado no culpado e dificuldade
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-900 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Balanceamento</h4>
                    <p className="text-primary-300 text-sm">
                      Sistema garante jogabilidade justa com pistas verdadeiras e falsas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">🎮 Fases do Jogo</h3>
              <div className="space-y-4">
                <div className="bg-primary-700/50 rounded-lg p-4">
                  <h4 className="text-accent-gold font-bold mb-2">🏛️ Lobby</h4>
                  <p className="text-primary-300 text-sm">
                    Configuração da partida e entrada de jogadores
                  </p>
                </div>
                <div className="bg-primary-700/50 rounded-lg p-4">
                  <h4 className="text-accent-gold font-bold mb-2">📋 Briefing</h4>
                  <p className="text-primary-300 text-sm">
                    Apresentação do caso e orientações iniciais
                  </p>
                </div>
                <div className="bg-primary-700/50 rounded-lg p-4">
                  <h4 className="text-accent-gold font-bold mb-2">🔍 Investigação</h4>
                  <p className="text-primary-300 text-sm">
                    Exploração, coleta de pistas e interrogatórios
                  </p>
                </div>
                <div className="bg-primary-700/50 rounded-lg p-4">
                  <h4 className="text-accent-gold font-bold mb-2">⚖️ Dedução</h4>
                  <p className="text-primary-300 text-sm">
                    Conexão de pistas e formulação de acusações
                  </p>
                </div>
                <div className="bg-primary-700/50 rounded-lg p-4">
                  <h4 className="text-accent-gold font-bold mb-2">🏆 Resultado</h4>
                  <p className="text-primary-300 text-sm">
                    Revelação do culpado e cálculo de pontuações
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-accent-gold via-accent-gold to-accent-gold">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            Pronto para o Desafio?
          </h2>
          <p className="text-primary-800 text-lg mb-8">
            Cada partida é uma nova oportunidade de testar suas habilidades de detetive!
          </p>
          <button
            onClick={startDynamicGame}
            disabled={isLoading}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300
              ${isLoading 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-primary-900 hover:bg-primary-800 text-white hover:scale-105 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full" />
                <span>Criando Jogo...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <Dice6 className="w-6 h-6" />
                <span>Começar Agora</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 