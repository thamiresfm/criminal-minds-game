import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ========================================
// CSS CLASS UTILITIES
// ========================================

/**
 * Combina classes CSS de forma inteligente
 * Remove duplicatas e conflitos do Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========================================
// GAME UTILITIES
// ========================================

/**
 * Gera um ID único para elementos do jogo
 */
export function generateId(prefix: string = 'id'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Formata tempo em formato mm:ss
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calcula porcentagem de progresso
 */
export function calculateProgress(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

/**
 * Embaralha array (Fisher-Yates shuffle)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Trunca texto com reticências
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Debounce function para otimizar chamadas
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function para limitar chamadas
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// ========================================
// VALIDATION UTILITIES
// ========================================

/**
 * Valida se é um email válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida força da senha
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve ter pelo menos uma letra maiúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve ter pelo menos uma letra minúscula');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Senha deve ter pelo menos um número');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida nome de jogador
 */
export function validatePlayerName(name: string): {
  isValid: boolean;
  error?: string;
} {
  if (!name.trim()) {
    return { isValid: false, error: 'Nome é obrigatório' };
  }
  
  if (name.length < 2) {
    return { isValid: false, error: 'Nome deve ter pelo menos 2 caracteres' };
  }
  
  if (name.length > 20) {
    return { isValid: false, error: 'Nome deve ter no máximo 20 caracteres' };
  }
  
  if (!/^[a-zA-Z0-9\s_-]+$/.test(name)) {
    return { isValid: false, error: 'Nome contém caracteres inválidos' };
  }
  
  return { isValid: true };
}

// ========================================
// LOCAL STORAGE UTILITIES
// ========================================

/**
 * Salva dados no localStorage com tratamento de erro
 */
export function saveToStorage<T>(key: string, data: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
    return false;
  }
}

/**
 * Carrega dados do localStorage com tratamento de erro
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return defaultValue;
  }
}

/**
 * Remove item do localStorage
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Erro ao remover do localStorage:', error);
    return false;
  }
}

// ========================================
// HAPTIC FEEDBACK UTILITIES
// ========================================

/**
 * Trigga feedback tátil (vibração)
 */
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'light'): void {
  if (!('vibrate' in navigator)) return;
  
  const patterns = {
    light: [10],
    medium: [20],
    heavy: [30, 10, 30],
  };
  
  navigator.vibrate(patterns[type]);
}

// ========================================
// AUDIO UTILITIES
// ========================================

/**
 * Toca som de feedback
 */
export function playSound(soundName: string, volume: number = 0.5): void {
  try {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.play().catch(() => {
      // Silently fail if audio can't play (user interaction required)
    });
  } catch (error) {
    console.warn('Erro ao tocar som:', error);
  }
}

// ========================================
// COLOR UTILITIES
// ========================================

/**
 * Converte HEX para RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Gera cor baseada em string (para avatars)
 */
export function getColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

// ========================================
// DATE UTILITIES
// ========================================

/**
 * Formata data para exibição
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Calcula tempo relativo (ex: "há 5 minutos")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
  if (diffInMinutes < 1) return 'agora';
  if (diffInMinutes < 60) return `há ${diffInMinutes}min`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `há ${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `há ${diffInDays}d`;
}

// ========================================
// CONSTANTS
// ========================================

export const STORAGE_KEYS = {
  PLAYER_DATA: 'criminal_minds_player',
  GAME_SETTINGS: 'criminal_minds_settings',
  GAME_HISTORY: 'criminal_minds_history',
} as const;

export const SOUND_EFFECTS = {
  CLUE_COLLECTED: 'clue_collected',
  THEORY_SHARED: 'theory_shared',
  ACCUSATION_MADE: 'accusation_made',
  GAME_WON: 'game_won',
  GAME_LOST: 'game_lost',
  NOTIFICATION: 'notification',
  BUTTON_CLICK: 'button_click',
} as const; 