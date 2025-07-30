'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Users, MessageCircle, Map, PuzzleIcon, User, Settings, LogOut, Home, AlertTriangle, X, Eye, Search, Filter, ArrowLeft, ChevronRight, CheckCircle, Microscope, FileCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/lib/stores/notificationStore';

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
  connectedClues?: string[];
  analyzed?: boolean;
  reviewed?: boolean;
  forensicData?: {
    fingerprints?: string;
    dna?: string;
    chemical?: string;
    timeline?: string;
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
  const notify = useNotify();
  const [showExitModal, setShowExitModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [clueFilter, setClueFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: 23 * 60 + 45, // 23:45
    players: [
      { id: '1', name: 'Detective Silva', avatar: '👨‍🕵️', level: 12, online: true },
      { id: '2', name: 'Investigadora Costa', avatar: '👩‍🕵️', level: 8, online: true },
      { id: '3', name: 'Agente Santos', avatar: '🕵️‍♀️', level: 15, online: false },
    ],
    collectedClues: [
      { 
        id: '1', 
        name: 'Programa da Peça', 
        description: 'Programa oficial da apresentação do Teatro Royal com anotações suspeitas', 
        location: 'Foyer', 
        importance: 'medium', 
        collected: true,
        details: 'O programa contém anotações manuscritas em vermelho nas margens, destacando os momentos cruciais da peça. Há uma marca de café na página 3 e um número de telefone rabiscado no canto inferior direito.',
        discoveredAt: new Date(Date.now() - 1800000),
        connectedClues: ['2'],
        analyzed: false,
        reviewed: false,
        forensicData: {
          fingerprints: 'Impressões parciais encontradas nas bordas',
          chemical: 'Tinta vermelha comum, marca Bic',
          timeline: 'Anotações feitas aproximadamente 2 horas antes do crime'
        }
      },
      { 
        id: '2', 
        name: 'Chave Misteriosa', 
        description: 'Uma chave antiga encontrada no camarim principal', 
        location: 'Camarim', 
        importance: 'high', 
        collected: true,
        details: 'Chave de bronze com detalhes ornamentais típicos do século XIX. Possui uma gravação quase imperceptível: "CR-1892". A chave parece abrir algum tipo de baú ou cofre antigo.',
        discoveredAt: new Date(Date.now() - 1200000),
        connectedClues: ['3'],
        analyzed: true,
        reviewed: false,
        forensicData: {
          fingerprints: 'Múltiplas impressões sobrepostas, algumas muito antigas',
          chemical: 'Bronze oxidado, sinais de uso frequente',
          timeline: 'Última utilização estimada: 24-48 horas atrás'
        }
      },
      { 
        id: '3', 
        name: 'Carta Ameaçadora', 
        description: 'Carta encontrada com ameaças ao protagonista da peça', 
        location: 'Palco', 
        importance: 'critical', 
        collected: true,
        details: 'Carta escrita em papel de carta fino, com tinta preta. O texto diz: "Sua última apresentação será literalmente a última. O Teatro Royal não tolerará mais suas traições." Assinada apenas com um "M" em letra cursiva.',
        discoveredAt: new Date(Date.now() - 600000),
        connectedClues: ['1', '4'],
        analyzed: false,
        reviewed: true,
        forensicData: {
          fingerprints: 'Impressões digitais claras na lateral direita',
          dna: 'Saliva detectada no selo (análise em andamento)',
          chemical: 'Papel de alta qualidade, tinta fountain pen',
          timeline: 'Carta escrita nas últimas 12 horas'
        }
      },
      { 
        id: '4', 
        name: 'Frasco de Veneno', 
        description: 'Pequeno frasco encontrado no corredor dos bastidores', 
        location: 'Corredor', 
        importance: 'critical', 
        collected: true,
        details: 'Frasco de vidro escuro com restos de uma substância desconhecida. Etiqueta médica indica "Estricnina - PERIGOSO". O frasco tem impressões digitais borradas e cheiro característico de amêndoas amargas.',
        discoveredAt: new Date(Date.now() - 300000),
        connectedClues: ['3'],
        analyzed: true,
        reviewed: true,
        forensicData: {
          fingerprints: 'Impressões borradas, possivelmente limpas intencionalmente',
          chemical: 'Estricnina pura - altamente tóxica',
          timeline: 'Frasco aberto recentemente, resíduos frescos'
        }
      },
      { 
        id: '5', 
        name: 'Taça de Vinho', 
        description: 'Taça com restos de vinho encontrada no foyer', 
        location: 'Foyer', 
        importance: 'medium', 
        collected: true,
        details: 'Taça de cristal fino com restos de vinho tinto. Análise preliminar indica possível adulteração. Marca de batom no gargalo e impressões digitais parciais.',
        discoveredAt: new Date(Date.now() - 900000),
        connectedClues: ['4'],
        analyzed: false,
        reviewed: false,
        forensicData: {
          fingerprints: 'Impressões femininas no gargalo',
          chemical: 'Vinho Bordeaux 2018, traços de substância desconhecida',
          dna: 'Saliva e batom no gargalo'
        }
      },
      { 
        id: '6', 
        name: 'Bilhete da Plateia', 
        description: 'Bilhete rasgado encontrado entre as poltronas', 
        location: 'Plateia', 
        importance: 'low', 
        collected: true,
        details: 'Bilhete parcialmente legível: "...encontro às 23h...porta dos fundos...ninguém pode saber...". O papel é de qualidade comum e a tinta está borrada pela umidade.',
        discoveredAt: new Date(Date.now() - 450000),
        connectedClues: [],
        analyzed: false,
        reviewed: false,
        forensicData: {
          chemical: 'Papel comum, tinta esferográfica azul',
          timeline: 'Escrito há aproximadamente 3-4 horas'
        }
      }
    ],
    currentTab: 'map',
  });

  // Localizações baseadas na imagem do mapa profissional
  const [locations] = useState<Location[]>([
    { id: 'camarim', name: 'Camarim', x: 20, y: 25, explored: true, hasClues: true, hasImportantClues: true },
    { id: 'palco', name: 'Palco', x: 75, y: 25, explored: true, hasClues: true, hasImportantClues: true },
    { id: 'corredor', name: 'Corredor', x: 15, y: 55, explored: false, hasClues: true, hasImportantClues: true },
    { id: 'foyer', name: 'Foyer', x: 20, y: 75, explored: false, hasClues: true, hasImportantClues: false },
    { id: 'plateia', name: 'Plateia', x: 75, y: 70, explored: false, hasClues: true, hasImportantClues: false },
    { id: 'entrada', name: 'Entrada Principal', x: 50, y: 90, explored: false, hasClues: false, hasImportantClues: false },
  ]);

  // ========================================
  // EVENT HANDLERS
  // ========================================

  const handleLocationClick = (locationId: string) => {
    console.log('Explorar localização:', locationId);
    // Implementar lógica de exploração
  };

  const handleShowDetails = () => {
    setShowDetailsModal(true);
  };

  const handleClueClick = (clue: Clue) => {
    setSelectedClue(clue);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedClue(null);
  };

  const handleAnalyzeClue = async () => {
    if (!selectedClue) return;
    
    setIsAnalyzing(true);
    
    // Simular processo de análise
    notify.info(
      '🔬 Iniciando Análise Forense',
      `Analisando "${selectedClue.name}" no laboratório...`,
      { duration: 3000 }
    );
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Atualizar estado da evidência
    setGameState(prev => ({
      ...prev,
      collectedClues: prev.collectedClues.map(clue =>
        clue.id === selectedClue.id
          ? { ...clue, analyzed: true }
          : clue
      )
    }));
    
    // Atualizar selectedClue também
    setSelectedClue(prev => prev ? { ...prev, analyzed: true } : null);
    
    setIsAnalyzing(false);
    
    notify.success(
      '✅ Análise Concluída!',
      `"${selectedClue.name}" foi analisada com sucesso. Dados forenses disponíveis.`,
      { duration: 4000 }
    );
    
    // Abrir modal de análise detalhada
    setShowAnalysisModal(true);
  };

  const handleMarkAsReviewed = async () => {
    if (!selectedClue) return;
    
    setIsMarking(true);
    
    // Simular processo de revisão
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Atualizar estado da evidência
    setGameState(prev => ({
      ...prev,
      collectedClues: prev.collectedClues.map(clue =>
        clue.id === selectedClue.id
          ? { ...clue, reviewed: true }
          : clue
      )
    }));
    
    // Atualizar selectedClue também
    setSelectedClue(prev => prev ? { ...prev, reviewed: true } : null);
    
    setIsMarking(false);
    
    notify.success(
      '📋 Evidência Revisada!',
      `"${selectedClue.name}" foi marcada como revisada pela equipe.`,
      { duration: 3000 }
    );
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

  const getClueStatusBadges = (clue: Clue) => {
    const badges = [];
    
    if (clue.analyzed) {
      badges.push(
        <span key="analyzed" className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
          <Microscope className="w-3 h-3 mr-1" />
          Analisada
        </span>
      );
    }
    
    if (clue.reviewed) {
      badges.push(
        <span key="reviewed" className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Revisada
        </span>
      );
    }
    
    return badges;
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

  const formatTimeAgo = (date: Date): string => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `há ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `há ${hours}h`;
  };

  const getFilteredClues = () => {
    let filtered = gameState.collectedClues;
    
    if (clueFilter !== 'all') {
      filtered = filtered.filter(clue => clue.importance === clueFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(clue => 
        clue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clue.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => {
      const importanceOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return importanceOrder[b.importance as keyof typeof importanceOrder] - importanceOrder[a.importance as keyof typeof importanceOrder];
    });
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
        
        {/* Professional Theater Map */}
        <div className="flex-1 p-4">
          
          {/* Map Container with Professional Design */}
          <div className="relative group">
            
            {/* Professional Theater Map - Identical to Image */}
            <div 
              className="rounded-2xl p-8 h-[32rem] relative overflow-hidden shadow-2xl border-4 border-amber-900/30"
              style={{
                background: `
                  linear-gradient(135deg, #f4e4bc 0%, #e8d5a3 25%, #dfc688 50%, #d4b86a 75%, #c9a96b 100%),
                  radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 40%),
                  radial-gradient(circle at 80% 80%, rgba(160, 82, 45, 0.05) 0%, transparent 40%)
                `,
                backgroundSize: '100% 100%, 200px 200px, 200px 200px',
                backgroundAttachment: 'local'
              }}
            >
              
              {/* Vintage Paper Texture Overlay */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 1px 1px, rgba(139,69,19,0.3) 1px, transparent 0),
                    radial-gradient(circle at 3px 3px, rgba(160,82,45,0.2) 1px, transparent 0)
                  `,
                  backgroundSize: '15px 15px, 25px 25px'
                }}
              ></div>

              {/* Professional Title */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
                <h1 
                  className="text-4xl font-bold text-center text-amber-900"
                  style={{
                    fontFamily: 'serif',
                    textShadow: '2px 2px 4px rgba(139,69,19,0.3)',
                    letterSpacing: '2px'
                  }}
                >
                  O HOMICÍDIO NO TEATRO
                </h1>
                <div className="w-full h-1 bg-amber-900/40 mt-2 rounded-full"></div>
              </div>

              {/* Theater Layout - Identical to Image */}
              
              {/* CAMARIM - Top Left */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm"
                style={{ 
                  left: '8%', 
                  top: '18%', 
                  width: '25%', 
                  height: '22%' 
                }}
              >
                <div className="p-3 h-full flex flex-col">
                  {/* Mirror and Vanity */}
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-12 h-8 border-2 border-amber-900/60 rounded-lg bg-amber-100/80 flex items-center justify-center">
                      <div className="w-8 h-6 border border-amber-900/40 rounded bg-gradient-to-br from-gray-200 to-gray-300"></div>
                    </div>
                  </div>
                  {/* Vanity Table */}
                  <div className="w-full h-3 bg-amber-800/60 rounded mb-2"></div>
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-amber-900" style={{ fontFamily: 'serif' }}>
                      CAMARIM
                    </h3>
                  </div>
                </div>
              </div>

              {/* PALCO - Top Right */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm"
                style={{ 
                  right: '8%', 
                  top: '18%', 
                  width: '35%', 
                  height: '22%' 
                }}
              >
                <div className="p-3 h-full flex flex-col">
                  {/* Stage Curtains */}
                  <div className="flex justify-between mb-2">
                    <div className="w-2 h-full bg-gradient-to-b from-red-800 to-red-900 rounded-full"></div>
                    <div className="flex-1 mx-2">
                      <div className="w-full h-2 bg-gradient-to-r from-red-800 via-red-700 to-red-800 rounded-full mb-1"></div>
                      <div className="grid grid-cols-8 gap-1">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-full h-8 bg-gradient-to-b from-red-700 to-red-900 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                    <div className="w-2 h-full bg-gradient-to-b from-red-800 to-red-900 rounded-full"></div>
                  </div>
                  <div className="text-center mt-auto">
                    <h3 className="text-sm font-bold text-amber-900" style={{ fontFamily: 'serif' }}>
                      PALCO
                    </h3>
                  </div>
                </div>
              </div>

              {/* CORREDOR - Left Side */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm"
                style={{ 
                  left: '5%', 
                  top: '45%', 
                  width: '15%', 
                  height: '35%' 
                }}
              >
                <div className="p-2 h-full flex flex-col justify-center">
                  {/* Corridor representation */}
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-amber-800/60 rounded"></div>
                    <div className="w-full h-1 bg-amber-800/40 rounded"></div>
                    <div className="w-full h-1 bg-amber-800/60 rounded"></div>
                    <div className="w-full h-1 bg-amber-800/40 rounded"></div>
                  </div>
                  <div className="text-center transform -rotate-90 mt-4">
                    <h3 className="text-xs font-bold text-amber-900 whitespace-nowrap" style={{ fontFamily: 'serif' }}>
                      CORREDOR
                    </h3>
                  </div>
                </div>
              </div>

              {/* FOYER - Bottom Left */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm"
                style={{ 
                  left: '8%', 
                  bottom: '12%', 
                  width: '25%', 
                  height: '22%' 
                }}
              >
                <div className="p-3 h-full flex flex-col">
                  {/* Wine Glass and Decorative Elements */}
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative">
                      {/* Wine Glass */}
                      <div className="w-6 h-8 flex flex-col items-center">
                        <div className="w-4 h-4 border-2 border-amber-900/60 rounded-full bg-red-300/60"></div>
                        <div className="w-1 h-3 bg-amber-900/60"></div>
                        <div className="w-3 h-1 bg-amber-900/60 rounded"></div>
                      </div>
                      {/* Decorative Symbol */}
                      <div className="ml-4 w-6 h-6 border-2 border-amber-900/60 rounded-full bg-amber-100/80 flex items-center justify-center">
                        <span className="text-xs text-amber-900">⚜</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-auto">
                    <h3 className="text-sm font-bold text-amber-900" style={{ fontFamily: 'serif' }}>
                      FOYER
                    </h3>
                  </div>
                </div>
              </div>

              {/* PLATEIA - Bottom Right */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm"
                style={{ 
                  right: '8%', 
                  bottom: '12%', 
                  width: '35%', 
                  height: '35%' 
                }}
              >
                <div className="p-3 h-full flex flex-col">
                  {/* Audience Seats */}
                  <div className="space-y-1 mb-3">
                    {[...Array(5)].map((row, rowIndex) => (
                      <div key={rowIndex} className="flex justify-between space-x-1">
                        {[...Array(8)].map((_, seatIndex) => (
                          <div 
                            key={seatIndex} 
                            className="w-3 h-2 bg-amber-800/60 rounded-sm border border-amber-900/40"
                          ></div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-auto">
                    <h3 className="text-sm font-bold text-amber-900" style={{ fontFamily: 'serif' }}>
                      PLATEIA
                    </h3>
                  </div>
                </div>
              </div>

              {/* Investigation Points - Question Mark Circles */}
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin z-20 transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                  }}
                >
                  {/* Professional Investigation Circle */}
                  <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shadow-xl border-3 transition-all duration-300 ${
                    location.explored
                      ? 'bg-green-600 border-green-700 text-white'
                      : location.hasImportantClues
                      ? 'bg-red-600 border-red-700 text-white animate-pulse'
                      : 'bg-amber-900 border-amber-800 text-amber-100'
                  }`}>
                    <span 
                      className="drop-shadow-sm font-bold"
                      style={{ fontFamily: 'serif', fontSize: '14px' }}
                    >
                      {location.explored ? '✓' : location.hasImportantClues ? '!' : '?'}
                    </span>
                  </div>
                  
                  {/* Professional Tooltip */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 text-xs px-3 py-2 rounded-lg opacity-0 group-hover/pin:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl border-2 border-amber-800/30">
                    <div className="font-bold" style={{ fontFamily: 'serif' }}>{location.name}</div>
                    <div className="text-xs text-amber-700">
                      {location.explored ? '✅ Investigado' : location.hasImportantClues ? '⚠️ Evidência Crítica' : '🔍 Clique para investigar'}
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-100 border-l-2 border-t-2 border-amber-800/30 rotate-45"></div>
                  </div>
                </button>
              ))}

              {/* Connecting Lines - Dotted paths between areas */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {/* Camarim to Corredor */}
                <line 
                  x1="20%" y1="35%" 
                  x2="15%" y2="50%" 
                  stroke="#8B4513" 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                  opacity="0.5"
                />
                {/* Corredor to Foyer */}
                <line 
                  x1="15%" y1="65%" 
                  x2="20%" y2="75%" 
                  stroke="#8B4513" 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                  opacity="0.5"
                />
                {/* Foyer to Plateia */}
                <line 
                  x1="33%" y1="80%" 
                  x2="67%" y2="80%" 
                  stroke="#8B4513" 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                  opacity="0.5"
                />
                {/* Plateia to Palco */}
                <line 
                  x1="75%" y1="65%" 
                  x2="75%" y2="40%" 
                  stroke="#8B4513" 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                  opacity="0.5"
                />
              </svg>

            </div>

            {/* Professional Legend */}
            <div className="mt-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 shadow-lg border-2 border-amber-800/20">
              <h3 className="font-bold text-amber-900 mb-4 flex items-center" style={{ fontFamily: 'serif' }}>
                <span className="mr-2">🗂️</span>
                Legenda da Investigação
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm border border-amber-200">
                  <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-green-700"></div>
                  <span className="text-amber-900 font-medium">Investigado</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm border border-amber-200">
                  <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-red-700 animate-pulse"></div>
                  <span className="text-amber-900 font-medium">Crítico</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm border border-amber-200">
                  <div className="w-4 h-4 bg-amber-900 rounded-full border-2 border-amber-800"></div>
                  <span className="text-amber-900 font-medium">Pendente</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm border border-amber-200">
                  <div className="w-4 h-4 bg-amber-600 rounded-full border-2 border-amber-700"></div>
                  <span className="text-amber-900 font-medium">Comum</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 p-3 bg-white rounded-lg shadow-sm border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-900">Progresso da Investigação:</span>
                  <span className="text-sm font-bold text-amber-800">{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-amber-600 to-amber-800 h-3 rounded-full transition-all duration-1000 shadow-sm"
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
                <button 
                  onClick={handleShowDetails}
                  className="px-3 py-1 bg-accent-gold/20 text-accent-gold rounded-lg text-sm font-medium hover:bg-accent-gold/30 transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Detalhes</span>
                </button>
              </div>
            </div>

            {/* Clues List */}
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {gameState.collectedClues.map((clue, index) => (
                <div 
                  key={clue.id} 
                  className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer ${getClueImportanceColor(clue.importance)}`}
                  onClick={() => handleClueClick(clue)}
                >
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
                      
                      {/* Status Badges */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex space-x-1">
                          {getClueStatusBadges(clue)}
                        </div>
                        <span className="text-xs font-medium text-primary-500 capitalize">{clue.importance}</span>
                      </div>
                      
                      <div className="flex space-x-1 mt-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClue(clue);
                          }}
                          className="px-2 py-1 bg-primary-100 hover:bg-primary-200 rounded text-xs text-primary-600 transition-colors"
                        >
                          Ver
                        </button>
                        <button className="px-2 py-1 bg-accent-blue/10 hover:bg-accent-blue/20 rounded text-xs text-accent-blue transition-colors">
                          Analisar
                        </button>
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

      {/* Enhanced Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🔍</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Análise Detalhada das Evidências</h2>
                    <p className="text-primary-200">
                      {gameState.collectedClues.length} evidências coletadas • {gameState.collectedClues.filter(c => c.importance === 'critical').length} críticas
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleCloseDetails}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-300" />
                  <input
                    type="text"
                    placeholder="Buscar evidências..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-200 focus:ring-2 focus:ring-accent-gold focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-primary-200" />
                  <select
                    value={clueFilter}
                    onChange={(e) => setClueFilter(e.target.value as any)}
                    className="bg-white/10 border border-white/20 rounded-lg text-white text-sm px-3 py-2 focus:ring-2 focus:ring-accent-gold focus:border-transparent"
                  >
                    <option value="all">Todas</option>
                    <option value="critical">Críticas</option>
                    <option value="high">Altas</option>
                    <option value="medium">Médias</option>
                    <option value="low">Baixas</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex h-[60vh]">
              
              {/* Clues List */}
              <div className="w-1/3 border-r border-primary-200 overflow-y-auto">
                <div className="p-4 space-y-3">
                  {getFilteredClues().map((clue) => (
                    <div
                      key={clue.id}
                      onClick={() => setSelectedClue(clue)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedClue?.id === clue.id ? 'border-accent-gold bg-accent-gold/10' : getClueImportanceColor(clue.importance)
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center">
                          <span className="text-sm">{getClueImportanceIcon(clue.importance)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-primary-900 text-sm mb-1">{clue.name}</h3>
                          <p className="text-xs text-primary-600 line-clamp-2">{clue.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">{clue.location}</span>
                            <span className="text-xs text-primary-400">
                              {clue.discoveredAt && formatTimeAgo(clue.discoveredAt)}
                            </span>
                          </div>
                          
                          {/* Status Badges */}
                          <div className="flex space-x-1 mt-2">
                            {getClueStatusBadges(clue)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Clue Details */}
              <div className="flex-1 p-6 overflow-y-auto">
                {selectedClue ? (
                  <div className="space-y-6">
                    
                    {/* Clue Header */}
                    <div className="border-b border-primary-200 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                            backgroundColor: selectedClue.importance === 'critical' ? '#fee2e2' : 
                                           selectedClue.importance === 'high' ? '#fef3c7' :
                                           selectedClue.importance === 'medium' ? '#dbeafe' : '#f3f4f6'
                          }}>
                            <span className="text-2xl">{getClueImportanceIcon(selectedClue.importance)}</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-primary-900">{selectedClue.name}</h3>
                            <p className="text-primary-600">{selectedClue.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedClue.importance === 'critical' ? 'bg-red-100 text-red-700' :
                            selectedClue.importance === 'high' ? 'bg-yellow-100 text-yellow-700' :
                            selectedClue.importance === 'medium' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {selectedClue.importance}
                          </span>
                          
                          {/* Status Badges */}
                          <div className="flex flex-col space-y-1">
                            {getClueStatusBadges(selectedClue)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Map className="w-4 h-4 text-primary-500" />
                          <span className="text-primary-600">Localização: {selectedClue.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-primary-500" />
                          <span className="text-primary-600">
                            Descoberta: {selectedClue.discoveredAt && formatTimeAgo(selectedClue.discoveredAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <div>
                      <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                        <span className="mr-2">📋</span>
                        Análise Detalhada
                      </h4>
                      <div className="bg-primary-50 rounded-lg p-4">
                        <p className="text-primary-700 leading-relaxed">
                          {selectedClue.details || selectedClue.description}
                        </p>
                      </div>
                    </div>

                    {/* Forensic Data */}
                    {selectedClue.forensicData && (
                      <div>
                        <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                          <span className="mr-2">🧪</span>
                          Dados Forenses
                        </h4>
                        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                          {selectedClue.forensicData.fingerprints && (
                            <div>
                              <h5 className="font-medium text-blue-900">Impressões Digitais:</h5>
                              <p className="text-blue-700 text-sm">{selectedClue.forensicData.fingerprints}</p>
                            </div>
                          )}
                          {selectedClue.forensicData.dna && (
                            <div>
                              <h5 className="font-medium text-blue-900">DNA:</h5>
                              <p className="text-blue-700 text-sm">{selectedClue.forensicData.dna}</p>
                            </div>
                          )}
                          {selectedClue.forensicData.chemical && (
                            <div>
                              <h5 className="font-medium text-blue-900">Análise Química:</h5>
                              <p className="text-blue-700 text-sm">{selectedClue.forensicData.chemical}</p>
                            </div>
                          )}
                          {selectedClue.forensicData.timeline && (
                            <div>
                              <h5 className="font-medium text-blue-900">Timeline:</h5>
                              <p className="text-blue-700 text-sm">{selectedClue.forensicData.timeline}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Connected Clues */}
                    {selectedClue.connectedClues && selectedClue.connectedClues.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                          <span className="mr-2">🔗</span>
                          Evidências Relacionadas
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedClue.connectedClues.map(connectedId => {
                            const connectedClue = gameState.collectedClues.find(c => c.id === connectedId);
                            if (!connectedClue) return null;
                            
                            return (
                              <div 
                                key={connectedId}
                                onClick={() => setSelectedClue(connectedClue)}
                                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-primary-200 cursor-pointer hover:shadow-md transition-all"
                              >
                                <span className="text-lg">{getClueImportanceIcon(connectedClue.importance)}</span>
                                <div className="flex-1">
                                  <h5 className="font-medium text-primary-900">{connectedClue.name}</h5>
                                  <p className="text-sm text-primary-600">{connectedClue.location}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-primary-400" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Enhanced Action Buttons */}
                    <div className="flex space-x-3 pt-4 border-t border-primary-200">
                      <button 
                        onClick={handleAnalyzeClue}
                        disabled={isAnalyzing || selectedClue.analyzed}
                        className="flex-1 bg-accent-blue text-white py-3 px-4 rounded-lg hover:bg-accent-blue/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analisando...</span>
                          </>
                        ) : selectedClue.analyzed ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Já Analisada</span>
                          </>
                        ) : (
                          <>
                            <Microscope className="w-4 h-4" />
                            <span>Analisar em Detalhes</span>
                          </>
                        )}
                      </button>
                      
                      <button 
                        onClick={handleMarkAsReviewed}
                        disabled={isMarking || selectedClue.reviewed}
                        className="flex-1 bg-primary-100 text-primary-700 py-3 px-4 rounded-lg hover:bg-primary-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isMarking ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-700 border-t-transparent rounded-full animate-spin"></div>
                            <span>Marcando...</span>
                          </>
                        ) : selectedClue.reviewed ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Já Revisada</span>
                          </>
                        ) : (
                          <>
                            <FileCheck className="w-4 h-4" />
                            <span>Marcar como Revisada</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">Selecione uma Evidência</h3>
                    <p className="text-primary-600">
                      Clique em uma evidência à esquerda para ver detalhes completos
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-primary-50 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-primary-600">
                <span>Total: {gameState.collectedClues.length} evidências</span>
                <span>•</span>
                <span>Analisadas: {gameState.collectedClues.filter(c => c.analyzed).length}</span>
                <span>•</span>
                <span>Revisadas: {gameState.collectedClues.filter(c => c.reviewed).length}</span>
              </div>
              <button 
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Mapa</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Forensic Analysis Modal */}
      {showAnalysisModal && selectedClue && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            
            {/* Analysis Header */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-300/20 rounded-xl flex items-center justify-center">
                    <Microscope className="text-xl text-blue-100" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Análise Forense Completa</h2>
                    <p className="text-blue-200">
                      Resultado da análise: {selectedClue.name}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAnalysisModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Analysis Content */}
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                
                {/* Evidence Summary */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Resumo da Evidência</h3>
                  <p className="text-blue-700">{selectedClue.details}</p>
                </div>

                {/* Detailed Forensic Results */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados da Análise Laboratorial</h3>
                  
                  {selectedClue.forensicData && (
                    <div className="space-y-4">
                      {selectedClue.forensicData.fingerprints && (
                        <div className="border-l-4 border-yellow-400 pl-4">
                          <h4 className="font-medium text-gray-900">🔍 Impressões Digitais</h4>
                          <p className="text-gray-700">{selectedClue.forensicData.fingerprints}</p>
                        </div>
                      )}
                      
                      {selectedClue.forensicData.dna && (
                        <div className="border-l-4 border-green-400 pl-4">
                          <h4 className="font-medium text-gray-900">🧬 Análise de DNA</h4>
                          <p className="text-gray-700">{selectedClue.forensicData.dna}</p>
                        </div>
                      )}
                      
                      {selectedClue.forensicData.chemical && (
                        <div className="border-l-4 border-blue-400 pl-4">
                          <h4 className="font-medium text-gray-900">⚗️ Análise Química</h4>
                          <p className="text-gray-700">{selectedClue.forensicData.chemical}</p>
                        </div>
                      )}
                      
                      {selectedClue.forensicData.timeline && (
                        <div className="border-l-4 border-purple-400 pl-4">
                          <h4 className="font-medium text-gray-900">⏰ Timeline Forense</h4>
                          <p className="text-gray-700">{selectedClue.forensicData.timeline}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Conclusions */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Conclusões</h3>
                  <ul className="text-green-700 space-y-1">
                    <li>• Evidência autenticada e catalogada no sistema</li>
                    <li>• Dados forenses adicionados ao banco de dados</li>
                    <li>• Possíveis conexões com outras evidências identificadas</li>
                    <li>• Relatório completo disponível para investigação</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Analysis Footer */}
            <div className="bg-blue-50 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-blue-600">
                Análise concluída em {new Date().toLocaleTimeString()}
              </div>
              <button 
                onClick={() => setShowAnalysisModal(false)}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Fechar Análise
              </button>
            </div>

          </div>
        </div>
      )}

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