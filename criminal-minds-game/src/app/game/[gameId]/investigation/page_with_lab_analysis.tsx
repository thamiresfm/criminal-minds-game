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
  connectedClues?: string[];
  analyzed?: boolean;
  reviewed?: boolean;
  labResultsViewed?: boolean;
  forensicData?: {
    fingerprints?: string;
    dna?: string;
    chemical?: string;
    timeline?: string;
  };
  laboratoryResults?: {
    status: 'pending' | 'in_progress' | 'completed';
    completedAt?: Date;
    technician?: string;
    tests: {
      fingerprint?: {
        result: string;
        matches: string[];
        confidence: number;
        details: string;
      };
      dna?: {
        result: string;
        profile: string;
        contamination: boolean;
        details: string;
      };
      toxicology?: {
        substances: string[];
        concentration: string;
        timeOfDeath?: string;
        details: string;
      };
      ballistics?: {
        weapon: string;
        angle: string;
        distance: string;
        details: string;
      };
      fiber?: {
        material: string;
        color: string;
        origin: string;
        details: string;
      };
    };
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

interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'system' | 'evidence';
}

interface LabAnalysisResult {
  id: string;
  clueId: string;
  clueName: string;
  analysisType: 'dna' | 'fingerprints' | 'chemical' | 'microscopic' | 'digital' | 'toxicology';
  status: 'pending' | 'processing' | 'completed' | 'inconclusive';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  results?: {
    findings: string;
    matches?: string[];
    purity?: number;
    composition?: string;
    conclusion: string;
    recommendations?: string;
  };
  processedAt?: Date;
  technician: string;
  duration: number; // em horas
}

interface GameState {
  timeRemaining: number;
  players: Player[];
  collectedClues: Clue[];
  currentTab: 'map' | 'board' | 'chat' | 'suspects';
  locations: Location[];
}

// ========================================
// INVESTIGATION PAGE COMPONENT
// ========================================

export default function InvestigationPage({ params }: { params: { gameId: string } }) {
  const router = useRouter();
  const { user } = useAuthStore();
  
  // ========================================
  // REAL PLAYERS MANAGEMENT
  // ========================================
  
  // Hook personalizado para gerenciar jogadores reais
  const useRealPlayers = (gameId: string, currentUser: any) => {
    const [realPlayers, setRealPlayers] = useState<Player[]>([]);
    const [playersCount, setPlayersCount] = useState(1);
    
    useEffect(() => {
      if (!currentUser) return;
      
      // Gerar jogadores baseados no gameId e usuário atual
      const generateRealPlayers = () => {
        const currentPlayer: Player = {
          id: currentUser.id,
          name: currentUser.name || 'Jogador Atual',
          avatar: currentUser.avatar || '🕵️',
          level: currentUser.level || 1,
          online: true
        };
        
        // Simular outros jogadores conectados baseado no gameId
        const gameSeed = gameId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const numberOfPlayers = 2 + (gameSeed % 3); // 2-4 jogadores total
        
        const playerNames = [
          { name: 'Detective Silva', avatar: '👨‍🕵️' },
          { name: 'Investigadora Costa', avatar: '👩‍🕵️' },
          { name: 'Agente Santos', avatar: '🕵️‍♀️' },
          { name: 'Dra. Miranda', avatar: '👩‍⚕️' },
          { name: 'Inspetor Carlos', avatar: '👨‍💼' },
          { name: 'Perita Ana', avatar: '👩‍🔬' }
        ];
        
        const otherPlayers: Player[] = [];
        for (let i = 0; i < numberOfPlayers - 1; i++) {
          const playerData = playerNames[i % playerNames.length];
          otherPlayers.push({
            id: `player_${i + 2}`,
            name: playerData.name,
            avatar: playerData.avatar,
            level: Math.floor(Math.random() * 20) + 1,
            online: Math.random() > 0.2 // 80% chance de estar online
          });
        }
        
        const allPlayers = [currentPlayer, ...otherPlayers];
        setRealPlayers(allPlayers);
        setPlayersCount(allPlayers.filter(p => p.online).length);
        
        return allPlayers;
      };
      
      const players = generateRealPlayers();
      
      // Simular jogadores entrando/saindo aleatoriamente
      const interval = setInterval(() => {
        setRealPlayers(prevPlayers => {
          const updatedPlayers = prevPlayers.map(player => {
            if (player.id === currentUser.id) return player; // Usuário atual sempre online
            
            // Chance aleatória de mudança de status
            if (Math.random() < 0.1) { // 10% chance de mudança
              return { ...player, online: !player.online };
            }
            return player;
          });
          
          setPlayersCount(updatedPlayers.filter(p => p.online).length);
          return updatedPlayers;
        });
      }, 10000); // Atualizar a cada 10 segundos
      
      return () => clearInterval(interval);
    }, [gameId, currentUser]);
    
    return { realPlayers, playersCount };
  };
  
  // Usar o hook personalizado
  const { realPlayers, playersCount } = useRealPlayers(params.gameId, user);
  
  // Atualizar gameState com jogadores reais
  useEffect(() => {
    if (realPlayers.length > 0) {
      setGameState(prev => ({
        ...prev,
        players: realPlayers
      }));
    }
  }, [realPlayers]);

  const [showExitModal, setShowExitModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [clueFilter, setClueFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low' | 'analyzed' | 'unanalyzed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  
  // Lab Analysis states
  const [showLabResultsModal, setShowLabResultsModal] = useState(false);
  const [selectedLabResult, setSelectedLabResult] = useState<Clue | null>(null);
  
  // Accusation states
  const [showAccusationModal, setShowAccusationModal] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [accusationConfidence, setAccusationConfidence] = useState(50);
  const [accusationReasoning, setAccusationReasoning] = useState('');
  
  // Game control states - Single accusation rule
  const [accusationMade, setAccusationMade] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [accusationResult, setAccusationResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  
  // Lista de suspeitos baseada no caso do Teatro Royal
  const suspects = [
    {
      id: 'diretor',
      name: 'Ricardo Almeida',
      age: 45,
      role: 'Diretor da Peça',
      description: 'Diretor experiente e perfeccionista, conhecido por suas exigências extremas com os atores.',
      motive: 'Conflitos creativos e pressão financeira. Helena constantemente questionava suas decisões artísticas.',
      alibi: 'Estava nos bastidores coordenando a produção durante toda a apresentação.',
      avatar: '🎭',
      personality: 'Autoritário, perfeccionista, temperamental',
      suspicionLevel: 'high'
    },
    {
      id: 'produtor',
      name: 'Fernando Santos', 
      age: 52,
      role: 'Produtor Executivo',
      description: 'Empresário ambicioso que investiu grande quantia na produção do espetáculo.',
      motive: 'Problemas financeiros graves. Helena ameaçava quebrar o contrato, o que seria ruinoso.',
      alibi: 'Estava na recepção conversando com investidores e possíveis patrocinadores.',
      avatar: '💼',
      personality: 'Calculista, obcecado por dinheiro, pragmático',
      suspicionLevel: 'critical'
    },
    {
      id: 'ator_principal',
      name: 'Gabriel Torres',
      age: 28,
      role: 'Ator Coadjuvante',
      description: 'Jovem ator talentoso que sempre ficou na sombra de Helena, desejando o papel principal.',
      motive: 'Ciúmes profissionais e rejeição amorosa. Helena rejeitou publicamente suas investidas.',
      alibi: 'Estava se preparando no camarim masculino, mas ninguém pode confirmar o horário exato.',
      avatar: '🎪',
      personality: 'Carismático, ego ferido, emotivo, instável',
      suspicionLevel: 'medium'
    },
    {
      id: 'rival_atriz',
      name: 'Marina Silva',
      age: 35,
      role: 'Atriz Coadjuvante e Dublê',
      description: 'Atriz experiente que sempre quis ser a protagonista, especialista em acrobacias.',
      motive: 'Rivalidade profissional intensa. Marina acreditava merecer o papel principal de Helena.',
      alibi: 'Estava testando equipamentos de segurança e cenários nos bastidores.',
      avatar: '🤸‍♀️',
      personality: 'Determinada, competitiva, guarda rancor',
      suspicionLevel: 'high'
    },
    {
      id: 'tecnico_som',
      name: 'João Pereira',
      age: 48,
      role: 'Técnico de Som e Luz',
      description: 'Funcionário antigo do teatro com acesso a todas as áreas e conhecimento técnico.',
      motive: 'Helena havia descoberto que ele vendia informações sobre as produções para tablóides.',
      alibi: 'Estava operando os controles de som e luz na cabine técnica durante toda a peça.',
      avatar: '💡',
      personality: 'Reservado, conhece segredos, ressentido',
      suspicionLevel: 'medium'
    },
    {
      id: 'assistente',
      name: 'Clara Mendes',
      age: 24,
      role: 'Assistente de Produção',
      description: 'Jovem aspirante a atriz que trabalhava nos bastidores enquanto buscava oportunidades.',
      motive: 'Helena descobriu que Clara estava sabotando audições de outras atrizes para conseguir papéis.',
      alibi: 'Estava organizando figurinos e adereços no depósito durante a apresentação.',
      avatar: '📋',
      personality: 'Ambiciosa, observadora, manipuladora',
      suspicionLevel: 'low'
    }
  ];
  
  // Chat states
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true); // Inicialmente há mensagens não lidas
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      playerId: '2',
      playerName: 'Investigadora Costa',
      playerAvatar: '👩‍🕵️',
      message: 'Encontrei algo interessante no camarim. A chave pode abrir algo importante!',
      timestamp: new Date(Date.now() - 300000), // 5 min ago
      type: 'message'
    },
    {
      id: '2',
      playerId: '1',
      playerName: 'Detective Silva',
      playerAvatar: '👨‍🕵️',
      message: 'Boa descoberta! Vou investigar o foyer enquanto vocês checam o corredor.',
      timestamp: new Date(Date.now() - 120000), // 2 min ago
      type: 'message'
    }
  ]);
  
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: 23 * 60 + 45, // 23:45
    players: [], // Será atualizado com jogadores reais
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
        connectedClues: ['2']
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
        laboratoryResults: {
          status: 'completed',
          completedAt: new Date(Date.now() - 7200000),
          technician: 'Perito João Costa',
          tests: {
            fingerprint: {
              result: '3 impressões digitais parciais identificadas',
              matches: ['Helena Silva (vítima)', 'Carlos Mendes (suspeito)', 'Impressão não identificada'],
              confidence: 87,
              details: 'A impressão não identificada apresenta características de mão masculina, idade entre 35-50 anos.'
            }
          }
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
        connectedClues: ['1', '4']
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
        laboratoryResults: {
          status: 'completed',
          completedAt: new Date(Date.now() - 3600000),
          technician: 'Dr. Amanda Silva',
          tests: {
            toxicology: {
              substances: ['Estricnina (C21H22N2O2)', 'Álcool etílico'],
              concentration: 'Estricnina pura com 97.3% de pureza',
              timeOfDeath: 'Dose letal: 15-30 minutos após ingestão',
              details: 'Substância altamente letal. Dose suficiente para causar morte em 15-30 minutos. Origem: medicamento veterinário desviado.'
            },
            fingerprint: {
              result: '2 impressões digitais parciais recuperadas',
              matches: ['Impressão borrada não identificada', 'Impressão parcial masculina'],
              confidence: 65,
              details: 'Impressões comprometidas por umidade, mas padrões sugerem manuseio por pelo menos 2 pessoas diferentes.'
            }
          }
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
        laboratoryResults: {
          status: 'in_progress',
          technician: 'Dra. Patricia Lima',
          tests: {
            toxicology: {
              substances: ['Vinho tinto', 'Traços de estricnina'],
              concentration: 'Análise em andamento - concentração baixa detectada',
              details: 'Vinho adulterado com pequenas quantidades de estricnina. Análise completa pendente.'
            },
            dna: {
              result: 'DNA salivar detectado',
              profile: 'Perfil feminino identificado',
              contamination: false,
              details: 'Amostra de DNA de alta qualidade coletada do gargalo da taça.'
            }
          }
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
        connectedClues: []
      }
    ],
    currentTab: 'map',
    locations: [
      { id: 'camarim', name: 'Camarim', x: 20, y: 25, explored: true, hasClues: true, hasImportantClues: true },
      { id: 'palco', name: 'Palco', x: 75, y: 25, explored: true, hasClues: true, hasImportantClues: true },
      { id: 'corredor', name: 'Corredor', x: 15, y: 55, explored: false, hasClues: true, hasImportantClues: true },
      { id: 'foyer', name: 'Foyer', x: 20, y: 75, explored: false, hasClues: true, hasImportantClues: false },
      { id: 'plateia', name: 'Plateia', x: 75, y: 70, explored: false, hasClues: true, hasImportantClues: false },
      { id: 'entrada', name: 'Entrada Principal', x: 50, y: 90, explored: false, hasClues: false, hasImportantClues: false },
    ]
  });

  const notify = useNotify();

  // Chat handlers
  const handleToggleChat = () => {
    if (!showChat) {
      // Quando abrir o chat e houver mensagens não lidas
      if (hasUnreadMessages && chatMessages.length > 0) {
        setHasUnreadMessages(false);
        
        // Notificação de leitura das mensagens
        notify.info(
          '📖 Mensagens Lidas',
          `Você leu ${chatMessages.length} mensagem${chatMessages.length > 1 ? 's' : ''} da equipe.`,
          { duration: 3000 }
        );
      }
    }
    setShowChat(!showChat);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const currentUser = realPlayers.find(p => p.id === user?.id) || realPlayers[0]; // Usar jogador real atual
    if (!currentUser) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      playerId: currentUser.id,
      playerName: currentUser.name,
      playerAvatar: currentUser.avatar,
      message: newMessage.trim(),
      timestamp: new Date(),
      type: 'message'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
    
    notify.success(
      '💬 Mensagem Enviada',
      'Sua mensagem foi enviada para a equipe.',
      { duration: 2000 }
    );

    // Simular resposta automática da equipe após alguns segundos
    setTimeout(() => {
      const responses = [
        'Ótima observação! Vou verificar isso também.',
        'Interessante... isso pode ser uma pista importante!',
        'Concordo, vamos focar nessa área.',
        'Boa estratégia! Seguindo sua sugestão.',
        'Encontrei algo relacionado no meu lado!'
      ];
      
      const otherPlayers = realPlayers.filter(p => p.id !== user?.id && p.online); // Usar jogadores reais
      if (otherPlayers.length > 0) {
        const randomPlayer = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage: ChatMessage = {
          id: (Date.now() + Math.random()).toString(),
          playerId: randomPlayer.id,
          playerName: randomPlayer.name,
          playerAvatar: randomPlayer.avatar,
          message: randomResponse,
          timestamp: new Date(),
          type: 'message'
        };

        setChatMessages(prev => [...prev, responseMessage]);
        
        // Marcar como tendo mensagens não lidas se o chat estiver fechado
        if (!showChat) {
          setHasUnreadMessages(true);
          
          // Mostrar notificação de nova mensagem apenas se o chat estiver fechado
          notify.info(
            '💬 Nova Mensagem',
            `${randomPlayer.name}: ${randomResponse.length > 50 ? randomResponse.substring(0, 50) + '...' : randomResponse}`,
            { duration: 4000 }
          );
        }
      }
    }, 2000 + Math.random() * 3000); // Entre 2-5 segundos
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'agora';
    if (diffInMinutes < 60) return `${diffInMinutes}min`;
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h`;
  };

  // ========================================
  // EVENT HANDLERS
  // ========================================

  const handleLocationClick = (locationId: string) => {
    console.log('Explorar localização:', locationId);
    
    const location = gameState.locations.find(loc => loc.id === locationId);
    if (!location) return;
    
    // Se já foi explorada, apenas mostrar informação
    if (location.explored) {
      notify.info(
        '🔍 Local Já Explorado',
        `${location.name} já foi investigado pela equipe.`,
        { duration: 2000 }
      );
      return;
    }
    
    // Simular processo de exploração
    notify.info(
      '🔍 Explorando Local',
      `Investigando ${location.name}...`,
      { duration: 3000 }
    );
    
    // Marcar como explorado após delay
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        locations: prev.locations.map(loc => 
          loc.id === locationId 
            ? { ...loc, explored: true }
            : loc
        )
      }));
      
      // Simular descoberta de evidências baseada no local
      const newClues = generateCluesForLocation(locationId, location.name);
      
      if (newClues.length > 0) {
        setGameState(prev => ({
          ...prev,
          collectedClues: [...prev.collectedClues, ...newClues]
        }));
        
        notify.success(
          '🎯 Evidências Encontradas!',
          `Encontradas ${newClues.length} evidência${newClues.length > 1 ? 's' : ''} em ${location.name}`,
          { duration: 4000 }
        );
      } else {
        notify.info(
          '🔍 Local Limpo',
          `Nenhuma evidência relevante encontrada em ${location.name}.`,
          { duration: 3000 }
        );
      }
    }, 2000);
  };
  
  // Função auxiliar para gerar evidências baseadas no local
  const generateCluesForLocation = (locationId: string, locationName: string): Clue[] => {
    const clueTemplates = {
      'palco': [
        {
          id: `palco-evidence-${Date.now()}`,
          name: 'Marca de Sangue',
          description: 'Pequena mancha de sangue encontrada no chão do palco',
          location: locationName,
          importance: 'high' as const,
          collected: true,
          discoveredAt: new Date()
        }
      ],
      'camarim': [
        {
          id: `camarim-evidence-${Date.now()}`,
          name: 'Frasco de Remédio',
          description: 'Frasco vazio de medicamento encontrado no camarim',
          location: locationName,
          importance: 'medium' as const,
          collected: true,
          discoveredAt: new Date()
        }
      ],
      'plateia': [
        {
          id: `plateia-evidence-${Date.now()}`,
          name: 'Programa Rasgado',
          description: 'Programa da peça encontrado rasgado sob uma poltrona',
          location: locationName,
          importance: 'low' as const,
          collected: true,
          discoveredAt: new Date()
        }
      ]
    };
    
    return clueTemplates[locationId as keyof typeof clueTemplates] || [];
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

  // Accusation functions
  const handleOpenAccusation = () => {
    if (!canMakeAccusation()) {
      const unreadCount = getUnreadEvidencesCount();
      notify.warning(
        '⚠️ Evidências Pendentes',
        `Você deve analisar ou revisar todas as evidências antes de fazer uma acusação. Ainda restam ${unreadCount} evidência(s) não lida(s).`,
        { duration: 5000 }
      );
      return;
    }
    setShowAccusationModal(true);
  };

  const handleSuspectSelect = (suspectId: string) => {
    setSelectedSuspect(suspectId);
  };

  const handleSubmitAccusation = async () => {
    if (!selectedSuspect) {
      notify.error(
        '❌ Acusação Incompleta',
        'Selecione um suspeito para fazer a acusação.',
        { duration: 4000 }
      );
      return;
    }

    if (accusationMade) {
      notify.warning(
        '⚠️ Acusação já realizada',
        'Você já fez sua única acusação neste jogo.',
        { duration: 4000 }
      );
      return;
    }

    const suspect = suspects.find(s => s.id === selectedSuspect);
    if (!suspect) return;

    // Marcar que a acusação foi feita
    setAccusationMade(true);

    notify.warning(
      '⚖️ ACUSAÇÃO FINAL - ÚNICA CHANCE',
      `⚠️ ACUSAÇÃO FINAL - ÚNICA CHANCE
      <p className="text-red-100">Escolha com muito cuidado - não há segunda oportunidade!</p>
      Analisando acusação contra ${suspect.name}...`,
      { duration: 4000 }
    );

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simular resultado (para demonstração, vamos fazer o produtor ser o culpado)
    const isCorrect = selectedSuspect === 'produtor';
    
    setShowAccusationModal(false);
    setAccusationResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      notify.success(
        '🎉 VITÓRIA! Acusação Correta!',
        `Parabéns, detetive! ${suspect.name} é realmente o culpado. Caso resolvido com maestria!`,
        { duration: 8000 }
      );
      
      // Redirecionar para resultado/lobby após alguns segundos
      setTimeout(() => {
        router.push('/lobby');
      }, 8000);
    } else {
      setGameOver(true);
      setShowGameOverModal(true);
      
      notify.error(
        '💀 GAME OVER - Acusação Incorreta',
        `${suspect.name} não era o culpado. Sua única chance foi desperdiçada!`,
        { duration: 6000 }
      );
    }
  };

  const getSuspicionLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSuspicionLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '🔍';
      case 'low': return '✅';
      default: return '❓';
    }
  };

  const getClueImportanceColor = (importance: string): string => {
    switch (importance) {
      case 'critical': return 'border-accent-red bg-accent-red/5';
      case 'high': return 'border-accent-gold bg-accent-gold/5';
      case 'medium': return 'border-accent-blue bg-accent-blue/5';
      case 'low': return 'border-green-400 bg-green-50/20';
      default: return 'border-primary-300 bg-primary-50';
    }
  };

  const getClueImportanceIcon = (importance: string): string => {
    switch (importance) {
      case 'critical': return '🔴';
      case 'high': return '🟡';
      case 'medium': return '🔵';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    const explored = gameState.locations.filter(loc => loc.explored).length;
    return Math.round((explored / gameState.locations.length) * 100);
  };

  const formatTimeAgo = (date: Date): string => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `há ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `há ${hours}h`;
  };

  const getFilteredClues = () => {
    let filtered = gameState.collectedClues;
    
    if (clueFilter !== "all") {
      if (clueFilter === "analyzed") {
        filtered = filtered.filter(clue => clue.analyzed === true);
      } else if (clueFilter === "unanalyzed") {
        filtered = filtered.filter(clue => !clue.analyzed);
      } else {
        filtered = filtered.filter(clue => clue.importance === clueFilter);
      }
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

  // Evidence validation functions
  const areAllEvidencesAnalyzed = (): boolean => {
    return gameState.collectedClues.every(clue => {
      const basicAnalysisComplete = clue.analyzed === true || clue.reviewed === true;
      const labAnalysisComplete = !clue.laboratoryResults || clue.labResultsViewed === true;
      return basicAnalysisComplete && labAnalysisComplete;
    });
  };

  const getUnreadEvidencesCount = (): number => {
    return gameState.collectedClues.filter(clue => {
      const basicAnalysisIncomplete = !clue.analyzed && !clue.reviewed;
      const labAnalysisIncomplete = clue.laboratoryResults && !clue.labResultsViewed;
      return basicAnalysisIncomplete || labAnalysisIncomplete;
    }).length;
  };

  const canMakeAccusation = (): boolean => {
    return areAllEvidencesAnalyzed();
  };

  // Laboratory results functions
  const handleOpenLabResults = (clue: Clue) => {
    // Mark as viewed in the game state
    setGameState(prev => ({
      ...prev,
      collectedClues: prev.collectedClues.map(c => 
        c.id === clue.id 
          ? { ...c, labResultsViewed: true }
          : c
      )
    }));

    // Mark associated location as explored
    markLocationAsExplored(clue.location);

    // Set for modal display
    setSelectedLabResult(clue);
    setShowLabResultsModal(true);

    // Show success notification
    notify.success(
      '🧬 Análise Laboratorial Vista',
      `Local "${clue.location}" marcado como concluído!`,
      { duration: 3000 }
    );
  };

  const getLabStatusColor = (status: 'pending' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-yellow-600';
      case 'pending': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getLabStatusIcon = (status: 'pending' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Activity className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Game restart function
  const handleRestartGame = () => {
    // Reset all game states
    setAccusationMade(false);
    setGameOver(false);
    setAccusationResult(null);
    setShowGameOverModal(false);
    setShowAccusationModal(false);
    setSelectedSuspect(null);
    setAccusationConfidence(50);
    setAccusationReasoning('');
    setSelectedClue(null);
    setShowLabResultsModal(false);
    setSelectedLabResult(null);
    
    // Reset game state to initial
    setGameState(prev => ({
      ...prev,
      collectedClues: prev.collectedClues.map(clue => ({
        ...clue,
        analyzed: false,
        reviewed: false
      }))
    }));
    
    notify.info(
      '🔄 Jogo Reiniciado',
      'O caso foi reiniciado. Boa sorte, detetive!',
      { duration: 4000 }
    );
  };

  // Location mapping function
  const getLocationIdFromName = (locationName: string): string => {
    const locationMap: { [key: string]: string } = {
      'Foyer': 'foyer',
      'Camarim': 'camarim', 
      'Palco': 'palco',
      'Corredor': 'corredor',
      'Plateia': 'plateia',
      'Entrada Principal': 'entrada'
    };
    return locationMap[locationName] || locationName.toLowerCase();
  };

  // Mark location as explored when lab results are viewed
  const markLocationAsExplored = (locationName: string) => {
    const locationId = getLocationIdFromName(locationName);
    setGameState(prev => ({
      ...prev,
      locations: prev.locations.map(location => 
        location.id === locationId 
          ? { ...location, explored: true }
          : location
      )
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-bg-primary to-bg-secondary flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="bg-primary-50 shadow-sm border-b border-primary-200 px-4 py-3 flex-shrink-0">
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
              <span className="text-sm text-primary-600">{playersCount} jogadores online</span>
            </div>
            <button 
              onClick={handleToggleChat}
              className={`flex items-center space-x-2 px-2 py-1 rounded-lg transition-colors relative ${
                hasUnreadMessages 
                  ? 'bg-accent-red/10 hover:bg-accent-red/20 animate-pulse' 
                  : 'hover:bg-primary-50'
              }`}
            >
              <MessageCircle className={`w-5 h-5 ${hasUnreadMessages ? 'text-accent-red' : 'text-primary-600'}`} />
              <span className={`text-sm ${hasUnreadMessages ? 'text-accent-red font-medium' : 'text-primary-600'}`}>
                {chatMessages.length} mensagens
                {hasUnreadMessages && ' • NOVAS'}
              </span>
              {hasUnreadMessages && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                const clueWithLab = gameState.collectedClues.find(clue => clue.laboratoryResults);
                if (clueWithLab) {
                  handleOpenLabResults(clueWithLab);
                } else {
                  notify.info('🧪 Laboratório', 'Nenhum resultado laboratorial disponível ainda.');
                }
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center space-x-2"
              title="Ver resultados de análises laboratoriais"
            >
              <TestTube className="w-5 h-5" />
              <span>Lab</span>
            </button>
            <button 
              onClick={handleOpenAccusation}
              disabled={!canMakeAccusation() || accusationMade || gameOver}
              className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center space-x-2 ${
                canMakeAccusation() && !accusationMade && !gameOver
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-400 cursor-not-allowed text-gray-600'
              }`}
              title={
                gameOver ? 'Jogo encerrado - reinicie para jogar novamente' :
                accusationMade ? 'Você já fez sua única acusação' :
                !canMakeAccusation() ? `Analise tudo + veja análises laboratoriais (${getUnreadEvidencesCount()} restantes)` : 
                'ÚNICA CHANCE - Acusação final'
              }
            >
              <User className="w-5 h-5" />
              <span>
                {gameOver ? 'Jogo Encerrado' :
                 accusationMade ? 'Acusação Feita' :
                 canMakeAccusation() ? '⚠️ ÚNICA CHANCE' : `Acusação Bloqueada (${getUnreadEvidencesCount()})`}
              </span>
            </button>
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
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        
        {/* Professional Theater Map */}
        <div className="flex-1 p-4 relative overflow-y-auto">
          
          {/* Map Container with Professional Design */}
          <div className="relative group w-full min-h-full">
            
            {/* Professional Theater Map - Identical to Image */}
            <div 
              className="rounded-2xl p-8 h-[32rem] relative overflow-hidden shadow-2xl border-4 border-amber-900/30 z-0"
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
                className="absolute inset-0 opacity-20 mix-blend-multiply z-1"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 1px 1px, rgba(139,69,19,0.3) 1px, transparent 0),
                    radial-gradient(circle at 3px 3px, rgba(160,82,45,0.2) 1px, transparent 0)
                  `,
                  backgroundSize: '15px 15px, 25px 25px'
                }}
              ></div>

              {/* Professional Title */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-5">
                <h1 
                  className="text-3xl font-bold text-amber-900 text-center tracking-wider drop-shadow-md"
                  style={{ fontFamily: 'serif', textShadow: '2px 2px 4px rgba(139,69,19,0.3)' }}
                >
                  O HOMICÍDIO NO TEATRO
                </h1>
              </div>

              {/* Theater Areas */}
              
              {/* CAMARIM - Top Left */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm z-3"
                style={{
                  left: '8%',
                  top: '20%',
                  width: '35%',
                  height: '15%'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-amber-900 font-bold text-lg tracking-widest drop-shadow-md"
                    style={{ fontFamily: 'serif' }}
                  >
                    CAMARIM
                  </span>
                </div>
              </div>

              {/* PALCO - Top Right */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm z-3"
                style={{
                  right: '8%',
                  top: '20%',
                  width: '50%',
                  height: '15%'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-amber-900 font-bold text-lg tracking-widest drop-shadow-md"
                    style={{ fontFamily: 'serif' }}
                  >
                    PALCO
                  </span>
                </div>
              </div>

              {/* FOYER - Bottom Left */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm z-3"
                style={{
                  left: '5%',
                  bottom: '25%',
                  width: '30%',
                  height: '25%'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-amber-900 font-bold text-lg tracking-widest drop-shadow-md"
                    style={{ fontFamily: 'serif' }}
                  >
                    FOYER
                  </span>
                </div>
              </div>

              {/* PLATEIA - Bottom Right */}
              <div 
                className="absolute border-4 border-amber-900/80 bg-amber-50/60 rounded-lg shadow-lg backdrop-blur-sm z-3"
                style={{
                  right: '5%',
                  bottom: '15%',
                  width: '50%',
                  height: '40%'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-amber-900 font-bold text-xl tracking-widest drop-shadow-md"
                    style={{ fontFamily: 'serif' }}
                  >
                    PLATEIA
                  </span>
                </div>
              </div>

              {/* Connection Lines with lower z-index */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-2"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* Dotted connection lines */}
                <line
                  x1="25"
                  y1="35"
                  x2="75"
                  y2="35"
                  stroke="rgba(139, 69, 19, 0.4)"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                  opacity="0.7"
                />
                <line
                  x1="20"
                  y1="60"
                  x2="80"
                  y2="60"
                  stroke="rgba(139, 69, 19, 0.4)"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                  opacity="0.7"
                />
                <line
                  x1="35"
                  y1="35"
                  x2="20"
                  y2="60"
                  stroke="rgba(139, 69, 19, 0.4)"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                  opacity="0.5"
                />
                <line
                  x1="75"
                  y1="35"
                  x2="80"
                  y2="60"
                  stroke="rgba(139, 69, 19, 0.4)"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                  opacity="0.5"
                />
              </svg>

              {/* Investigation Points - Question Mark Circles with higher z-index */}
              {gameState.locations.map((location, index) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin z-10 transition-all duration-300 hover:scale-110"
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
                  
                  {/* Professional Tooltip with highest z-index */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 text-xs px-3 py-2 rounded-lg opacity-0 group-hover/pin:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl border-2 border-amber-800/30 z-20">
                    <div className="font-bold" style={{ fontFamily: 'serif' }}>{location.name}</div>
                    <div className="text-xs text-amber-700">
                      {location.explored ? '✅ Investigado' : location.hasImportantClues ? '⚠️ Evidência Crítica' : '🔍 Clique para investigar'}
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-100 border-l-2 border-t-2 border-amber-800/30 rotate-45"></div>
                  </div>
                </button>
              ))}

            </div>

            {/* Professional Legend with appropriate z-index */}
            <div className="mt-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 shadow-lg border-2 border-amber-800/20 relative z-4">
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
        <div className="w-full lg:w-96 bg-white border-l border-primary-200 flex flex-col overflow-hidden">
          
          {/* Collected Clues Panel */}
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-lg border border-primary-200 overflow-hidden flex flex-col h-full m-4">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-800 to-primary-900 p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🕵️</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-white">Evidências Coletadas</h2>
                    <p className="text-primary-200 text-sm">{gameState.collectedClues.length} de 8 possíveis</p>
                    {!canMakeAccusation() && (
                      <p className="text-yellow-300 text-xs mt-1 flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Analise tudo + veja análises lab ({getUnreadEvidencesCount()} restantes)</span>
                      </p>
                    )}
                    {canMakeAccusation() && (
                      <p className="text-green-300 text-xs mt-1 flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Todas analisadas - Acusação liberada!</span>
                      </p>
                    )}
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

            {/* Clues List - Com scroll apenas no container geral */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
              {gameState.collectedClues.map((clue, index) => (
                <div 
                  key={clue.id} 
                  className={`p-4 rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer ${getClueImportanceColor(clue.importance)}`}
                  onClick={() => handleClueClick(clue)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getClueImportanceIcon(clue.importance)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-primary-900 text-sm">{clue.name}</h3>
                        <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full flex-shrink-0">{clue.location}</span>
                      </div>
                      <p className="text-xs text-primary-600 mb-3 leading-relaxed">{clue.description}</p>
                      
                      {/* Status Badges */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex space-x-1">
                          {/* Badges serão implementadas futuramente */}
                        </div>
                        <span className="text-xs font-medium text-primary-500 capitalize">{clue.importance}</span>
                      </div>
                      
                      <div className="flex space-x-1 mt-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClue(clue);
                            setShowDetailsModal(true);
                          }}
                          className="px-3 py-1.5 bg-primary-100 hover:bg-primary-200 rounded text-xs text-primary-600 transition-colors font-medium"
                        >
                          Ver
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClue(clue);
                            // Abrir modal de detalhes automaticamente
                            setTimeout(() => {
                              // Se a evidência não foi analisada, iniciar análise
                              if (!clue.analyzed) {
                                handleAnalyzeClue();
                              }
                            }, 100);
                          }}
                          className="px-3 py-1.5 bg-accent-blue/10 hover:bg-accent-blue/20 rounded text-xs text-accent-blue transition-colors font-medium"
                        >
                          Analisar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
            
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-6 h-6 text-accent-gold" />
                  <div>
                    <h2 className="text-lg font-bold">Chat da Equipe</h2>
                    <p className="text-primary-200 text-sm">{chatMessages.length} mensagens • {playersCount} online</p>
                  </div>
                </div>
                <button 
                  onClick={handleToggleChat}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{msg.playerAvatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-primary-900 text-sm">{msg.playerName}</span>
                      <span className="text-xs text-primary-500">{formatMessageTime(msg.timestamp)}</span>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-3">
                      <p className="text-sm text-primary-800 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-primary-300 mx-auto mb-3" />
                  <p className="text-primary-500">Nenhuma mensagem ainda.</p>
                  <p className="text-primary-400 text-sm">Comece a conversa com sua equipe!</p>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-primary-200 p-4 flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Enviar
                </button>
              </div>
              
              {/* Online Players */}
              <div className="flex items-center space-x-2 mt-3">
                <span className="text-xs text-primary-500">Online:</span>
                {realPlayers.filter(p => p.online).map(player => (
                  <div key={player.id} className="flex items-center space-x-1">
                    <span className="text-sm">{player.avatar}</span>
                    <span className="text-xs text-primary-600">{player.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
                <div className="flex items-center space-x-3">
                  <Filter className="w-4 h-4 text-primary-200" />
                  <div className="relative">
                    <select
                      value={clueFilter}
                      onChange={(e) => setClueFilter(e.target.value as any)}
                      className="appearance-none bg-gradient-to-r from-white/15 to-white/10 border-2 border-white/25 rounded-xl text-white text-sm font-medium px-4 py-2.5 pr-10 min-w-[130px] focus:ring-3 focus:ring-accent-gold/40 focus:border-accent-gold hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm"
                    >
                      <option value="all" className="bg-primary-800 text-white font-medium hover:bg-white hover:text-primary-800">✨ Todas</option>
                      <option value="critical" className="bg-primary-800 text-white hover:bg-white hover:text-primary-800">🔴 Críticas</option>
                      <option value="high" className="bg-primary-800 text-white hover:bg-white hover:text-primary-800">🟡 Altas</option>
                      <option value="medium" className="bg-primary-800 text-white hover:bg-white hover:text-primary-800">🔵 Médias</option>
                      <option value="low" className="bg-primary-800 text-white hover:bg-white hover:text-primary-800">🟢 Baixas</option>
                      <option value="analyzed" className="bg-primary-800 text-white hover:bg-white hover:text-primary-800">✅ Analisadas</option>
                      <option value="unanalyzed" className="bg-primary-800 text-white hover:bg-white hover:text-primary-800">🔍 Não Analisadas</option>                    </select>
                    {/* Custom Elegant Arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-accent-gold/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
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
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-primary-900 text-sm mb-1">{clue.name}</h3>
                            {clue.laboratoryResults && (
                              <div className="flex-shrink-0 ml-2">
                                <div 
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                    clue.labResultsViewed ? 'bg-green-100 text-green-600' :
                                    clue.laboratoryResults.status === 'completed' ? 'bg-red-100 text-red-600 animate-pulse' :
                                    clue.laboratoryResults.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-gray-100 text-gray-500'
                                  }`}
                                  title={
                                    clue.labResultsViewed ? 'Análise laboratorial vista - Local concluído' :
                                    clue.laboratoryResults.status === 'completed' ? 'CLIQUE PARA VER - Análise laboratorial pronta!' :
                                    clue.laboratoryResults.status === 'in_progress' ? 'Laboratório: Em análise' :
                                    'Laboratório: Pendente'
                                  }
                                >
                                  {clue.labResultsViewed ? '✅' : '🧬'}
                                </div>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-primary-600 line-clamp-2">{clue.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-primary-500 bg-primary-100 px-2 py-1 rounded-full">{clue.location}</span>
                            <span className="text-xs text-primary-400">
                              {clue.discoveredAt && formatTimeAgo(clue.discoveredAt)}
                            </span>
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
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedClue.importance === 'critical' ? 'bg-red-100 text-red-700' :
                          selectedClue.importance === 'high' ? 'bg-yellow-100 text-yellow-700' :
                          selectedClue.importance === 'medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {selectedClue.importance}
                        </span>
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
                        className="flex-1 bg-accent-gold text-slate-900 py-3 px-4 rounded-lg hover:bg-accent-gold/90 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
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
                      
                      {selectedClue.laboratoryResults && (
                        <button 
                          onClick={() => handleOpenLabResults(selectedClue)}
                          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                        >
                          <TestTube className="w-4 h-4" />
                          <span>Lab Results</span>
                        </button>
                      )}
                      
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
                <span>Filtradas: {getFilteredClues().length} evidências</span>
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

      {/* Accusation Modal */}
      {showAccusationModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
              
              {/* WARNING BANNER */}
              <div className="bg-yellow-500 text-yellow-900 p-3 rounded-lg mb-4 font-bold text-center">
                ⚠️ ATENÇÃO: ESTA É SUA ÚNICA OPORTUNIDADE DE ACUSAÇÃO! ⚠️
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-8 h-8 text-red-200" />
                  <div>
                    <h2 className="text-2xl font-bold">⚠️ ACUSAÇÃO FINAL - ÚNICA CHANCE</h2>
                    <p className="text-red-100">Escolha com muito cuidado - não há segunda oportunidade!</p>
                    <p className="text-red-200">Selecione o culpado do crime no Teatro Royal</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAccusationModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              
              {/* Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <p className="text-yellow-800 font-medium">
                    ⚠️ Atenção: Você tem apenas UMA chance de fazer a acusação. Analise todas as evidências cuidadosamente!
                  </p>
                </div>
              </div>

              {/* Suspects Grid */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Suspeitos disponíveis:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suspects.map((suspect) => (
                    <div
                      key={suspect.id}
                      onClick={() => setSelectedSuspect(suspect.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedSuspect === suspect.id
                          ? 'border-red-500 bg-red-50'
                          : getSuspicionLevelColor(suspect.suspicionLevel)
                      }`}
                    >
                      {/* Suspect Header */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                          {suspect.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-gray-900">{suspect.name}</h4>
                            <span className="text-sm">{getSuspicionLevelIcon(suspect.suspicionLevel)}</span>
                          </div>
                          <p className="text-sm text-gray-600">{suspect.role} • {suspect.age} anos</p>
                        </div>
                        {selectedSuspect === suspect.id && (
                          <CheckCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>

                      {/* Suspect Details */}
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Descrição:</span>
                          <p className="text-gray-600">{suspect.description}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Motivo:</span>
                          <p className="text-gray-600">{suspect.motive}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Álibi:</span>
                          <p className="text-gray-600">{suspect.alibi}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Personalidade:</span>
                          <p className="text-gray-600">{suspect.personality}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reasoning Section */}
              <div className="mb-6">
                                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Justificativa da acusação:
                 </label>
                <textarea
                  value={accusationReasoning}
                  onChange={(e) => setAccusationReasoning(e.target.value)}
                  placeholder="Explique por que você acredita que este suspeito é o culpado. Cite as evidências que suportam sua teoria..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                                 <p className="text-xs text-gray-500 mt-1">
                   Campo opcional - adicione detalhes se desejar fundamentar sua acusação
                 </p>
              </div>

              {/* Confidence Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de confiança: {accusationConfidence}%
                </label>
                               <input
                 type="range"
                 min="0"
                 max="100"
                 value={accusationConfidence}
                 onChange={(e) => setAccusationConfidence(parseInt(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-enhanced"
                 style={{
                   background: `linear-gradient(to right, rgb(212 175 55) 0%, rgb(212 175 55) ${accusationConfidence}%, #E5E7EB ${accusationConfidence}%, #E5E7EB 100%)`
                 }}
               />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Incerto</span>
                  <span>Muito Confiante</span>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedSuspect ? (
                  <span className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Suspeito selecionado: {suspects.find(s => s.id === selectedSuspect)?.name}</span>
                  </span>
                ) : (
                  <span>Selecione um suspeito para continuar</span>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAccusationModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitAccusation}
                  disabled={!selectedSuspect}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>FAZER ACUSAÇÃO</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Laboratory Results Modal */}
      {showLabResultsModal && selectedLabResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <TestTube className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Resultados da Análise Laboratorial</h2>
                    <p className="text-blue-100">Evidência: {selectedLabResult.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLabResultsModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Status Banner */}
            <div className={`p-4 border-b flex items-center space-x-3 ${
              selectedLabResult.laboratoryResults?.status === 'completed' ? 'bg-green-50 border-green-200' :
              selectedLabResult.laboratoryResults?.status === 'in_progress' ? 'bg-yellow-50 border-yellow-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className={`flex items-center space-x-2 ${getLabStatusColor(selectedLabResult.laboratoryResults?.status || 'pending')}`}>
                {getLabStatusIcon(selectedLabResult.laboratoryResults?.status || 'pending')}
                <span className="font-medium">
                  Status: {
                    selectedLabResult.laboratoryResults?.status === 'completed' ? 'Análise Concluída' :
                    selectedLabResult.laboratoryResults?.status === 'in_progress' ? 'Em Processamento' :
                    'Aguardando Análise'
                  }
                </span>
              </div>
              {selectedLabResult.laboratoryResults?.completedAt && (
                <div className="text-sm text-gray-600">
                  Concluída em: {selectedLabResult.laboratoryResults.completedAt.toLocaleString('pt-BR')}
                </div>
              )}
              {selectedLabResult.laboratoryResults?.technician && (
                <div className="text-sm text-gray-600">
                  Responsável: {selectedLabResult.laboratoryResults.technician}
                </div>
              )}
            </div>

            {/* Test Results */}
            <div className="p-6 space-y-6">
              
              {/* Fingerprint Analysis */}
              {selectedLabResult.laboratoryResults?.tests.fingerprint && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <span className="text-2xl">🔍</span>
                    <span>Análise de Impressões Digitais</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Resultado:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.fingerprint.result}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Correspondências encontradas:</span>
                      <ul className="list-disc list-inside text-gray-600 ml-4">
                        {selectedLabResult.laboratoryResults.tests.fingerprint.matches.map((match, idx) => (
                          <li key={idx}>{match}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Nível de confiança:</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${selectedLabResult.laboratoryResults.tests.fingerprint.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{selectedLabResult.laboratoryResults.tests.fingerprint.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Detalhes:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.fingerprint.details}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* DNA Analysis */}
              {selectedLabResult.laboratoryResults?.tests.dna && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <span className="text-2xl">🧬</span>
                    <span>Análise de DNA</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Resultado:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.dna.result}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Perfil identificado:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.dna.profile}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Contaminação:</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        selectedLabResult.laboratoryResults.tests.dna.contamination 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedLabResult.laboratoryResults.tests.dna.contamination ? 'Detectada' : 'Não detectada'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Detalhes:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.dna.details}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Toxicology Analysis */}
              {selectedLabResult.laboratoryResults?.tests.toxicology && (
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <span className="text-2xl">⚗️</span>
                    <span>Análise Toxicológica</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Substâncias detectadas:</span>
                      <ul className="list-disc list-inside text-gray-600 ml-4">
                        {selectedLabResult.laboratoryResults.tests.toxicology.substances.map((substance, idx) => (
                          <li key={idx} className="font-medium">{substance}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Concentração:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.toxicology.concentration}</p>
                    </div>
                    {selectedLabResult.laboratoryResults.tests.toxicology.timeOfDeath && (
                      <div>
                        <span className="font-medium text-gray-700">Tempo de ação:</span>
                        <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.toxicology.timeOfDeath}</p>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700">Análise detalhada:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.toxicology.details}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Ballistics Analysis */}
              {selectedLabResult.laboratoryResults?.tests.ballistics && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <span className="text-2xl">🎯</span>
                    <span>Análise Balística</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Arma identificada:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.ballistics.weapon}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Ângulo de disparo:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.ballistics.angle}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Distância estimada:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.ballistics.distance}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Detalhes:</span>
                      <p className="text-gray-600">{selectedLabResult.laboratoryResults.tests.ballistics.details}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* No Results Available */}
              {!selectedLabResult.laboratoryResults && (
                <div className="text-center py-8 text-gray-500">
                  <TestTube className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Nenhum resultado disponível</h3>
                  <p>Esta evidência ainda não foi enviada para análise laboratorial.</p>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end">
              <button 
                onClick={() => setShowLabResultsModal(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Fechar Relatório
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {showGameOverModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 text-center">
            
            {/* Game Over Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💀</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-red-600 mb-4">GAME OVER</h2>
            
            {/* Message */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-700">
                Sua acusação estava <span className="font-bold text-red-600">incorreta</span>!
              </p>
              <p className="text-gray-600">
                Você tinha apenas uma única chance de fazer a acusação e ela foi desperdiçada.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">
                  <span className="font-bold">Regra do Jogo:</span> Só é permitida uma acusação por partida. 
                  Caso erre, o jogo deve ser reiniciado.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={handleRestartGame}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2"
              >
                <span className="text-xl">🔄</span>
                <span>Reiniciar Jogo</span>
              </button>
              <button 
                onClick={() => router.push('/lobby')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2"
              >
                <span className="text-xl">🏠</span>
                <span>Voltar ao Lobby</span>
              </button>
            </div>

            {/* Warning */}
            <p className="text-xs text-gray-500 mt-4">
              💡 Dica: Analise todas as evidências com cuidado antes de fazer sua única acusação!
            </p>

          </div>
        </div>
      )}

    </div>
  );
} 