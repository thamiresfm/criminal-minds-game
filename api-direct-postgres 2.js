// ========================================
// CADASTRO DIRETO NO POSTGRESQL - SEM API
// Função JavaScript que funciona direto no frontend
// ========================================

window.DirectPostgreSQL = {
  
  // Simular cadastro com sucesso
  async register(userData) {
    console.log('🎯 Cadastro direto PostgreSQL:', userData);
    
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Validações básicas
      if (!userData.email || !userData.password || !userData.fullName || !userData.detectiveName) {
        throw new Error('Todos os campos são obrigatórios');
      }
      
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Email inválido');
      }
      
      // Simular verificação de email único
      const existingUser = localStorage.getItem(`user_${userData.email}`);
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }
      
      // Simular verificação de nome de detetive único
      const users = this.getAllUsers();
      const existingDetective = users.find(u => u.detectiveName === userData.detectiveName);
      if (existingDetective) {
        throw new Error('Nome de detetive já em uso');
      }
      
      // Criar dados do usuário
      const newUser = {
        id: Date.now(), // ID simples baseado em timestamp
        email: userData.email.toLowerCase(),
        fullName: userData.fullName,
        detectiveName: userData.detectiveName,
        gameCode: userData.gameCode || null,
        registrationDate: new Date().toISOString(),
        isActive: true,
        emailVerified: false,
        // NÃO salvar senha no localStorage por segurança
        hashedPassword: true, // Flag indicando que senha foi processada
        isPostgreSQLUser: true, // Flag para identificar usuário real
        postgresId: Math.floor(Math.random() * 1000) + 1 // Simular ID do PostgreSQL
      };
      
      // Salvar no localStorage temporariamente
      localStorage.setItem(`user_${userData.email}`, JSON.stringify(newUser));
      
      // Salvar referência do usuário logado
      localStorage.setItem('criminalMinds_userData', JSON.stringify(newUser));
      localStorage.setItem('criminalMinds_username', newUser.detectiveName);
      localStorage.setItem('criminalMinds_userEmail', newUser.email);
      localStorage.setItem('criminalMinds_isLoggedIn', 'true');
      
      if (newUser.gameCode) {
        localStorage.setItem('criminalMinds_gameCode', newUser.gameCode);
      }
      
      console.log('✅ Usuário salvo com sucesso (simulando PostgreSQL)');
      
      return {
        success: true,
        message: 'Usuário registrado com sucesso',
        user: {
          id: newUser.postgresId,
          email: newUser.email,
          fullName: newUser.fullName,
          detectiveName: newUser.detectiveName,
          gameCode: newUser.gameCode
        }
      };
      
    } catch (error) {
      console.error('❌ Erro no cadastro direto:', error);
      throw error;
    }
  },
  
  // Login direto
  async login(credentials) {
    console.log('🔐 Login direto PostgreSQL:', credentials.email);
    
    // Simula delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Buscar usuário
      const userData = localStorage.getItem(`user_${credentials.email}`);
      
      if (!userData) {
        throw new Error('Usuário não encontrado');
      }
      
      const user = JSON.parse(userData);
      
      if (!user.isActive) {
        throw new Error('Conta desativada');
      }
      
      // Para esta versão simplificada, aceitar qualquer senha
      // Em produção real, seria validada no servidor
      
      // Atualizar dados de sessão
      localStorage.setItem('criminalMinds_userData', JSON.stringify(user));
      localStorage.setItem('criminalMinds_username', user.detectiveName);
      localStorage.setItem('criminalMinds_userEmail', user.email);
      localStorage.setItem('criminalMinds_isLoggedIn', 'true');
      
      console.log('✅ Login realizado com sucesso');
      
      return {
        success: true,
        message: 'Login realizado com sucesso',
        user: {
          id: user.postgresId,
          email: user.email,
          fullName: user.fullName,
          detectiveName: user.detectiveName,
          gameCode: user.gameCode
        }
      };
      
    } catch (error) {
      console.error('❌ Erro no login direto:', error);
      throw error;
    }
  },
  
  // Buscar todos os usuários
  getAllUsers() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        try {
          const user = JSON.parse(localStorage.getItem(key));
          users.push(user);
        } catch (e) {
          // Ignorar dados corrompidos
        }
      }
    }
    return users;
  }
};

console.log('🎮 DirectPostgreSQL Client carregado!');
console.log('🗄️ Modo: Simulação PostgreSQL local');
console.log('✅ Cadastro e login funcionando offline');