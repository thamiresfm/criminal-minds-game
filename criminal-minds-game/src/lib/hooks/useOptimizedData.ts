import { useMemo, useCallback } from 'react';

// Types
interface Clue {
  id: string;
  name: string;
  description: string;
  location: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  collected: boolean;
  analyzed?: boolean;
  reviewed?: boolean;
  labResultsViewed?: boolean;
  connectedClues?: string[];
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

// Main optimization hook
export function useOptimizedData(
  clues: Clue[],
  locations: Location[],
  players: Player[],
  chatMessages: ChatMessage[],
  filter: string,
  searchTerm: string
) {
  
  // Memoized filtered clues - expensive operation
  const filteredClues = useMemo(() => {
    let filtered = clues;
    
    // Apply status filter
    switch (filter) {
      case 'critical':
        filtered = filtered.filter(c => c.importance === 'critical');
        break;
      case 'high':
        filtered = filtered.filter(c => c.importance === 'high');
        break;
      case 'medium':
        filtered = filtered.filter(c => c.importance === 'medium');
        break;
      case 'low':
        filtered = filtered.filter(c => c.importance === 'low');
        break;
      case 'analyzed':
        filtered = filtered.filter(c => c.analyzed || c.reviewed);
        break;
      case 'unanalyzed':
        filtered = filtered.filter(c => !c.analyzed && !c.reviewed);
        break;
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.location.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  }, [clues, filter, searchTerm]);

  // Memoized progress calculations
  const locationProgress = useMemo(() => {
    if (locations.length === 0) return 0;
    const explored = locations.filter(loc => loc.explored).length;
    return Math.round((explored / locations.length) * 100);
  }, [locations]);

  const evidenceProgress = useMemo(() => {
    if (clues.length === 0) return 0;
    const analyzed = clues.filter(c => c.analyzed || c.reviewed).length;
    return Math.round((analyzed / clues.length) * 100);
  }, [clues]);

  // Memoized player statistics
  const playerStats = useMemo(() => {
    const onlineCount = players.filter(p => p.online).length;
    const totalPlayers = players.length;
    return {
      online: onlineCount,
      total: totalPlayers,
      percentage: totalPlayers > 0 ? Math.round((onlineCount / totalPlayers) * 100) : 0
    };
  }, [players]);

  // Memoized chat statistics
  const chatStats = useMemo(() => {
    const recentMessages = chatMessages.filter(msg => {
      const msgTime = new Date(msg.timestamp).getTime();
      const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
      return msgTime > fiveMinutesAgo;
    });

    return {
      total: chatMessages.length,
      recent: recentMessages.length,
      hasRecent: recentMessages.length > 0
    };
  }, [chatMessages]);

  // Memoized importance color mapping
  const getClueImportanceColor = useCallback((importance: string) => {
    const colorMap = {
      'critical': 'bg-red-50 border-red-200 hover:bg-red-100',
      'high': 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      'medium': 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      'low': 'bg-green-50 border-green-200 hover:bg-green-100'
    };
    return colorMap[importance as keyof typeof colorMap] || 'bg-gray-50 border-gray-200 hover:bg-gray-100';
  }, []);

  // Memoized importance icon mapping
  const getClueImportanceIcon = useCallback((importance: string) => {
    const iconMap = {
      'critical': '🔴',
      'high': '🟡',
      'medium': '🔵',
      'low': '🟢'
    };
    return iconMap[importance as keyof typeof iconMap] || '⚪';
  }, []);

  // Memoized lab status color mapping
  const getLabStatusColor = useCallback((status: 'pending' | 'in_progress' | 'completed') => {
    const colorMap = {
      'completed': 'text-green-600',
      'in_progress': 'text-yellow-600',
      'pending': 'text-gray-300'
    };
    return colorMap[status] || 'text-gray-300';
  }, []);

  // Memoized location mapping
  const locationNameMap = useMemo(() => ({
    'camarim': 'Camarim',
    'palco': 'Palco', 
    'corredor': 'Corredor',
    'foyer': 'Foyer',
    'plateia': 'Plateia',
    'entrada': 'Entrada Principal'
  }), []);

  const getLocationIdFromName = useCallback((locationName: string) => {
    const reverseMap = Object.entries(locationNameMap).find(([id, name]) => name === locationName);
    return reverseMap?.[0] || locationName.toLowerCase();
  }, [locationNameMap]);

  // Memoized evidence analysis functions
  const areAllLocationEvidencesComplete = useCallback((locationName: string) => {
    const locationEvidence = clues.filter(clue => clue.location === locationName);
    
    return locationEvidence.every(clue => {
      const basicAnalysisComplete = clue.analyzed === true || clue.reviewed === true;
      const labAnalysisComplete = !clue.laboratoryResults || clue.labResultsViewed === true;
      return basicAnalysisComplete && labAnalysisComplete;
    });
  }, [clues]);

  const canAnalyzeClue = useCallback((clue: Clue) => {
    return clue.laboratoryResults?.status !== 'in_progress';
  }, []);

  // Memoized lab analysis counts
  const labAnalysisCounts = useMemo(() => {
    const withResults = clues.filter(c => c.laboratoryResults);
    const inProgress = withResults.filter(c => c.laboratoryResults?.status === 'in_progress');
    const completed = withResults.filter(c => c.laboratoryResults?.status === 'completed' && !c.labResultsViewed);
    
    return {
      total: withResults.length,
      inProgress: inProgress.length,
      completed: completed.length,
      hasNewResults: completed.length > 0
    };
  }, [clues]);

  // Memoized visible clues calculation (for progressive revelation)
  const visibleClues = useMemo(() => {
    const readEvidencesCount = clues.filter(clue => 
      clue.analyzed === true || clue.reviewed === true
    ).length;
    
    const hiddenUntilTwoRead = ['7', '8', '9'];
    
    if (readEvidencesCount < 2) {
      return clues.filter(clue => !hiddenUntilTwoRead.includes(clue.id));
    }
    
    return clues;
  }, [clues]);

  // Memoized connected clues finder
  const getConnectedClues = useCallback((clueId: string) => {
    const clue = clues.find(c => c.id === clueId);
    if (!clue?.connectedClues) return [];
    
    return clue.connectedClues
      .map(id => clues.find(c => c.id === id))
      .filter(Boolean) as Clue[];
  }, [clues]);

  // Memoized time formatting
  const formatTimeRemaining = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    // Processed data
    filteredClues,
    visibleClues,
    
    // Statistics
    locationProgress,
    evidenceProgress,
    playerStats,
    chatStats,
    labAnalysisCounts,
    
    // Helper functions
    getClueImportanceColor,
    getClueImportanceIcon,
    getLabStatusColor,
    getLocationIdFromName,
    areAllLocationEvidencesComplete,
    canAnalyzeClue,
    getConnectedClues,
    formatTimeRemaining,
    
    // Constants
    locationNameMap
  };
}

// Hook for optimized chat operations
export function useOptimizedChat(messages: ChatMessage[]) {
  // Memoized message grouping by time
  const groupedMessages = useMemo(() => {
    const groups: { [key: string]: ChatMessage[] } = {};
    
    messages.forEach(msg => {
      const date = new Date(msg.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    
    return groups;
  }, [messages]);

  // Memoized unread count
  const unreadCount = useMemo(() => {
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    return messages.filter(msg => 
      new Date(msg.timestamp).getTime() > fiveMinutesAgo
    ).length;
  }, [messages]);

  return {
    groupedMessages,
    unreadCount
  };
}

// Hook for optimized player operations
export function useOptimizedPlayers(players: Player[], currentUserId: string) {
  // Memoized current user
  const currentUser = useMemo(() => 
    players.find(p => p.id === currentUserId), 
    [players, currentUserId]
  );

  // Memoized other players
  const otherPlayers = useMemo(() => 
    players.filter(p => p.id !== currentUserId), 
    [players, currentUserId]
  );

  // Memoized online players
  const onlinePlayers = useMemo(() => 
    players.filter(p => p.online), 
    [players]
  );

  return {
    currentUser,
    otherPlayers,
    onlinePlayers
  };
} 