import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// ========================================
// AUTH TYPES
// ========================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
  gamesPlayed: number;
  gamesWon: number;
  isGuest: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAsGuest: (guestName?: string) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  
  // Validation
  validateEmail: (email: string) => { isValid: boolean; error?: string };
  validatePassword: (password: string) => { isValid: boolean; errors: string[] };
  validateName: (name: string) => { isValid: boolean; error?: string };
}

// ========================================
// VALIDATION FUNCTIONS
// ========================================

const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email é obrigatório' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email inválido' };
  }
  
  if (email.length > 100) {
    return { isValid: false, error: 'Email muito longo' };
  }
  
  return { isValid: true };
};

const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Senha é obrigatória');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres');
  }
  
  if (password.length > 128) {
    errors.push('Senha muito longa (máximo 128 caracteres)');
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
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Senha deve ter pelo menos um caractere especial');
  }
  
  // Lista de senhas de teste permitidas
  const testPasswords = ['Admin123!', 'Demo123!'];
  
  // Verificar padrões comuns fracos (exceto senhas de teste)
  if (!testPasswords.includes(password)) {
    const weakPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /abc123/i,
      /^admin/i, // Só rejeitar se começar com admin
    ];
    
    if (weakPatterns.some(pattern => pattern.test(password))) {
      errors.push('Senha muito comum, escolha uma mais segura');
    }
  }
  
  return { isValid: errors.length === 0, errors };
};

const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name.trim()) {
    return { isValid: false, error: 'Nome é obrigatório' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Nome deve ter pelo menos 2 caracteres' };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, error: 'Nome muito longo (máximo 50 caracteres)' };
  }
  
  if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(name.trim())) {
    return { isValid: false, error: 'Nome contém caracteres inválidos' };
  }
  
  // Verificar se não é apenas espaços
  if (!/[a-zA-ZÀ-ÿ]/.test(name)) {
    return { isValid: false, error: 'Nome deve conter pelo menos uma letra' };
  }
  
  return { isValid: true };
};

// ========================================
// MOCK DATABASE (localStorage)
// ========================================

interface RegisteredUser {
  email: string;
  password: string;
  user: User;
}

const STORAGE_KEY = 'criminal_minds_users';

// Carregar usuários do localStorage
const loadRegisteredUsers = (): RegisteredUser[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Salvar usuários no localStorage
const saveRegisteredUsers = (users: RegisteredUser[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
  }
};

// Verificar se email já existe
const emailExists = (email: string): boolean => {
  const registeredUsers = loadRegisteredUsers();
  const hardcodedEmails = ['admin@criminalmind.com', 'demo@test.com'];
  
  return hardcodedEmails.includes(email) || 
         registeredUsers.some(u => u.email === email);
};

// Adicionar novo usuário registrado
const addRegisteredUser = (email: string, password: string, user: User): void => {
  const registeredUsers = loadRegisteredUsers();
  registeredUsers.push({ email, password, user });
  saveRegisteredUsers(registeredUsers);
};

// ========================================
// MOCK API FUNCTIONS
// ========================================

const mockLogin = async (credentials: LoginCredentials): Promise<User> => {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // DEBUG: Log das credenciais recebidas
  console.log('🔍 DEBUG mockLogin - Credenciais recebidas:');
  console.log('Email:', `"${credentials.email}"`);
  console.log('Password:', `"${credentials.password}"`);
  
  // Usuários hardcoded (demonstração)
  const hardcodedUsers = [
    {
      email: 'admin@criminalmind.com',
      password: 'Admin123!',
      user: {
        id: 'user-001',
        name: 'Detetive Admin',
        email: 'admin@criminalmind.com',
        avatar: '🕵️‍♂️',
        level: 25,
        experience: 12500,
        gamesPlayed: 89,
        gamesWon: 67,
        isGuest: false,
        createdAt: new Date('2024-01-01'),
        lastLoginAt: new Date(),
      }
    },
    {
      email: 'demo@test.com',
      password: 'Demo123!',
      user: {
        id: 'user-002',
        name: 'Jogador Demo',
        email: 'demo@test.com',
        avatar: '👤',
        level: 8,
        experience: 2400,
        gamesPlayed: 15,
        gamesWon: 9,
        isGuest: false,
        createdAt: new Date('2024-06-01'),
        lastLoginAt: new Date(),
      }
    }
  ];
  
  // Carregar usuários registrados
  const registeredUsers = loadRegisteredUsers();
  
  // Combinar todos os usuários
  const allUsers = [...hardcodedUsers, ...registeredUsers];
  
  console.log('🔍 DEBUG - Total de usuários:', allUsers.length);
  console.log('🔍 DEBUG - Hardcoded:', hardcodedUsers.length, 'Registrados:', registeredUsers.length);
  
  // Buscar usuário
  const foundUser = allUsers.find(u => 
    u.email === credentials.email && u.password === credentials.password
  );
  
  console.log('🔍 DEBUG - Found user:', foundUser ? `YES (${foundUser.user.name})` : 'NO');
  
  if (!foundUser) {
    console.log('❌ DEBUG - Login failed for:', credentials.email);
    throw new Error('Email ou senha incorretos');
  }
  
  console.log('✅ DEBUG - Login successful for:', foundUser.user.name);
  return foundUser.user;
};

const mockRegister = async (credentials: RegisterCredentials): Promise<User> => {
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // DEBUG: Log do registro
  console.log('🔍 DEBUG mockRegister - Dados recebidos:');
  console.log('Name:', `"${credentials.name}"`);
  console.log('Email:', `"${credentials.email}"`);
  console.log('Password:', `"${credentials.password}"`);
  
  // Verificar se email já existe (hardcoded + registrados)
  if (emailExists(credentials.email)) {
    console.log('❌ DEBUG - Email já existe:', credentials.email);
    throw new Error('Email já está em uso');
  }
  
  // Criar novo usuário
  const newUser: User = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: credentials.name.trim(),
    email: credentials.email,
    avatar: '🎯',
    level: 1,
    experience: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    isGuest: false,
    createdAt: new Date(),
    lastLoginAt: new Date(),
  };
  
  // Salvar usuário no "banco de dados" mock
  addRegisteredUser(credentials.email, credentials.password, newUser);
  
  console.log('✅ DEBUG - Usuário registrado e salvo:', newUser.name);
  console.log('✅ DEBUG - Total de usuários registrados:', loadRegisteredUsers().length);
  
  return newUser;
};

// ========================================
// AUTH STORE
// ========================================

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // ========================================
        // LOGIN ACTION
        // ========================================
        login: async (credentials: LoginCredentials) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // Validar entrada
            const emailValidation = validateEmail(credentials.email);
            if (!emailValidation.isValid) {
              throw new Error(emailValidation.error);
            }

            // Para login, permitir senhas de teste
            const testPasswords = ['Admin123!', 'Demo123!'];
            const isTestPassword = testPasswords.includes(credentials.password);
            
            if (!isTestPassword) {
              // Só validar rigorosamente se NÃO for senha de teste
              const passwordValidation = validatePassword(credentials.password);
              if (!passwordValidation.isValid) {
                throw new Error('Senha inválida');
              }
            }

            // Fazer login
            const user = await mockLogin(credentials);

            set((state) => {
              state.user = user;
              state.isAuthenticated = true;
              state.isLoading = false;
              state.error = null;
            });

            // Salvar preferência "lembrar de mim"
            if (credentials.rememberMe) {
              localStorage.setItem('criminal_minds_remember', 'true');
            }

          } catch (error) {
            set((state) => {
              state.isLoading = false;
              state.error = error instanceof Error ? error.message : 'Erro desconhecido';
            });
            throw error;
          }
        },

        // ========================================
        // GUEST LOGIN ACTION  
        // ========================================
        loginAsGuest: async (guestName?: string) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const defaultGuestNames = [
              'Detetive Anônimo', 'Investigador Misterioso', 'Sherlock Visitante',
              'Inspector Convidado', 'Agente Secreto', 'Detetive Incógnito'
            ];

            const finalGuestName = guestName && guestName.trim() 
              ? guestName.trim()
              : defaultGuestNames[Math.floor(Math.random() * defaultGuestNames.length)];

            const guestUser: User = {
              id: `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: finalGuestName,
              email: `guest-${Date.now()}@criminal-minds.temp`,
              avatar: '👤',
              level: 1,
              experience: 0,
              gamesPlayed: 0,
              gamesWon: 0,
              isGuest: true,
              createdAt: new Date(),
              lastLoginAt: new Date(),
            };

            set((state) => {
              state.user = guestUser;
              state.isAuthenticated = true;
              state.isLoading = false;
              state.error = null;
            });

          } catch (error) {
            set((state) => {
              state.isLoading = false;
              state.error = error instanceof Error ? error.message : 'Erro ao entrar como convidado';
            });
            throw error;
          }
        },

        // ========================================
        // REGISTER ACTION
        // ========================================
        register: async (credentials: RegisterCredentials) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // Validar todos os campos
            const nameValidation = validateName(credentials.name);
            if (!nameValidation.isValid) {
              throw new Error(nameValidation.error);
            }

            const emailValidation = validateEmail(credentials.email);
            if (!emailValidation.isValid) {
              throw new Error(emailValidation.error);
            }

            const passwordValidation = validatePassword(credentials.password);
            if (!passwordValidation.isValid) {
              throw new Error(passwordValidation.errors[0]);
            }

            if (credentials.password !== credentials.confirmPassword) {
              throw new Error('Senhas não coincidem');
            }

            if (!credentials.acceptTerms) {
              throw new Error('Você deve aceitar os termos de uso');
            }

            // Registrar usuário
            const user = await mockRegister(credentials);

            set((state) => {
              state.user = user;
              state.isAuthenticated = true;
              state.isLoading = false;
              state.error = null;
            });

          } catch (error) {
            set((state) => {
              state.isLoading = false;
              state.error = error instanceof Error ? error.message : 'Erro ao registrar';
            });
            throw error;
          }
        },

        // ========================================
        // LOGOUT ACTION
        // ========================================
        logout: () => {
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
          });

          // Limpar dados salvos
          localStorage.removeItem('criminal_minds_remember');
        },

        // ========================================
        // CLEAR ERROR ACTION
        // ========================================
        clearError: () => {
          set((state) => {
            state.error = null;
          });
        },

        // ========================================
        // VALIDATION METHODS
        // ========================================
        validateEmail,
        validatePassword,
        validateName,
      })),
      {
        name: 'criminal-minds-auth',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

// ========================================
// SELECTORS
// ========================================

export const useAuth = () => useAuthStore(state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isLoading: state.isLoading,
  error: state.error,
}));

export const useAuthActions = () => useAuthStore(state => ({
  login: state.login,
  loginAsGuest: state.loginAsGuest,
  register: state.register,
  logout: state.logout,
  clearError: state.clearError,
}));

export const useAuthValidation = () => useAuthStore(state => ({
  validateEmail: state.validateEmail,  
  validatePassword: state.validatePassword,
  validateName: state.validateName,
})); 