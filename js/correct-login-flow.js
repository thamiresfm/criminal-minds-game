/**
 * CORRECT LOGIN FLOW - Sistema para Corrigir Fluxo de Login
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Corrige redirecionamento para ir para lobby primeiro
 * Implementa fluxo correto: login -> lobby -> jogo
 * Mantém funcionalidade de login direto
 */

class CorrectLoginFlow {
    constructor() {
        this.config = {
            enableCorrectFlow: true,
            lobbyFirst: true,
            maintainDirectAccess: true,
            properRedirect: true
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🔄 CorrectLoginFlow: Inicializando correção do fluxo de login...');
        
        try {
            this.setupCorrectRedirect();
            this.fixDirectLoginFlow();
            this.setupLobbyFirst();
            this.maintainLoginFunctionality();
            
            console.log('✅ CorrectLoginFlow: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ CorrectLoginFlow: Erro na inicialização', error);
        }
    }

    /**
     * Configurar redirecionamento correto
     */
    setupCorrectRedirect() {
        console.log('🔄 Configurando redirecionamento correto...');
        
        // Substituir redirecionamento direto para jogo
        window.redirectToGame = function() {
            console.log('🔄 Redirecionando para lobby primeiro...');
            window.location.href = 'lobby.html';
        };
        
        // Substituir redirecionamento de login
        window.redirectAfterLogin = function() {
            console.log('🔄 Login realizado, redirecionando para lobby...');
            window.location.href = 'lobby.html';
        };
        
        console.log('✅ Redirecionamento correto configurado');
    }

    /**
     * Corrigir fluxo de login direto
     */
    fixDirectLoginFlow() {
        console.log('🔧 Corrigindo fluxo de login direto...');
        
        // Substituir função de login para ir para lobby
        if (window.directLoginSystem) {
            window.directLoginSystem.processLoginForm = async function(email, password) {
                console.log('🔐 Processando login com redirecionamento para lobby...');
                
                return new Promise(async (resolve, reject) => {
                    try {
                        // Simular delay de processamento
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        
                        // Validar dados
                        if (!email || !password) {
                            throw new Error('Email e senha são obrigatórios');
                        }
                        
                        if (!this.isValidEmail(email)) {
                            throw new Error('Email inválido');
                        }
                        
                        // Criar dados do usuário
                        const userData = {
                            fullName: email.split('@')[0],
                            detectiveName: email.split('@')[0],
                            email: email,
                            isGuest: false,
                            timestamp: Date.now()
                        };
                        
                        // Salvar dados
                        localStorage.setItem('user_data', JSON.stringify(userData));
                        localStorage.setItem('auth_token', 'direct-login-' + Date.now());
                        localStorage.setItem('isGuestMode', 'false');
                        
                        console.log('✅ Login processado, redirecionando para lobby');
                        resolve({ success: true, userData });
                        
                        // Redirecionar para lobby após 2 segundos
                        setTimeout(() => {
                            window.location.href = 'lobby.html';
                        }, 2000);
                        
                    } catch (error) {
                        console.error('❌ Erro no processamento:', error);
                        reject(error);
                    }
                });
            };
        }
        
        console.log('✅ Fluxo de login direto corrigido');
    }

    /**
     * Configurar lobby primeiro
     */
    setupLobbyFirst() {
        console.log('🎮 Configurando lobby primeiro...');
        
        // Substituir redirecionamento automático
        window.setupAutoRedirect = function() {
            console.log('🔄 Configurando redirecionamento automático para lobby...');
            
            // Verificar se já está logado
            const userData = localStorage.getItem('user_data');
            const authToken = localStorage.getItem('auth_token');
            
            if (userData && authToken) {
                console.log('✅ Usuário já logado, redirecionando para lobby...');
                setTimeout(() => {
                    window.location.href = 'lobby.html';
                }, 1000);
            }
        };
        
        // Substituir função de entrar como visitante
        window.enterAsGuest = function() {
            console.log('👤 Entrando como visitante no lobby...');
            
            const guestData = {
                fullName: 'Visitante',
                detectiveName: 'Detective Guest',
                email: 'guest@criminalmindsgame.com',
                isGuest: true,
                timestamp: Date.now()
            };
            
            localStorage.setItem('user_data', JSON.stringify(guestData));
            localStorage.setItem('auth_token', 'guest-token-' + Date.now());
            localStorage.setItem('isGuestMode', 'true');
            
            // Redirecionar para lobby
            setTimeout(() => {
                window.location.href = 'lobby.html';
            }, 1000);
        };
        
        console.log('✅ Lobby primeiro configurado');
    }

    /**
     * Manter funcionalidade de login
     */
    maintainLoginFunctionality() {
        console.log('🔐 Mantendo funcionalidade de login...');
        
        // Substituir função de login do formulário
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const submitButton = this.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                
                try {
                    // Feedback visual
                    submitButton.disabled = true;
                    submitButton.innerHTML = '🔄 Processando...';
                    submitButton.style.background = 'linear-gradient(to right, #3b82f6, #1d4ed8)';
                    
                    // Simular processamento
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Validar dados
                    if (!email || !password) {
                        throw new Error('Email e senha são obrigatórios');
                    }
                    
                    // Criar dados do usuário
                    const userData = {
                        fullName: email.split('@')[0],
                        detectiveName: email.split('@')[0],
                        email: email,
                        isGuest: false,
                        timestamp: Date.now()
                    };
                    
                    // Salvar dados
                    localStorage.setItem('user_data', JSON.stringify(userData));
                    localStorage.setItem('auth_token', 'direct-login-' + Date.now());
                    localStorage.setItem('isGuestMode', 'false');
                    
                    // Feedback de sucesso
                    submitButton.innerHTML = '✅ Login realizado!';
                    submitButton.style.background = 'linear-gradient(to right, #10b981, #059669)';
                    
                    // Redirecionar para lobby
                    setTimeout(() => {
                        window.location.href = 'lobby.html';
                    }, 2000);
                    
                } catch (error) {
                    // Feedback de erro
                    submitButton.innerHTML = '❌ ' + error.message;
                    submitButton.style.background = 'linear-gradient(to right, #ef4444, #dc2626)';
                    
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                        submitButton.style.background = 'linear-gradient(to right, #f59e0b, #f97316)';
                    }, 3000);
                }
            });
        }
        
        console.log('✅ Funcionalidade de login mantida');
    }

    /**
     * Corrigir botão "Começar a Jogar"
     */
    fixPlayButton() {
        console.log('🎮 Corrigindo botão "Começar a Jogar"...');
        
        const playButton = document.querySelector('.play-button');
        if (playButton) {
            playButton.href = 'login.html';
            playButton.onclick = function(e) {
                e.preventDefault();
                console.log('🎮 Botão "Começar a Jogar" clicado, indo para login...');
                window.location.href = 'login.html';
            };
        }
        
        console.log('✅ Botão "Começar a Jogar" corrigido');
    }

    /**
     * Verificar fluxo atual
     */
    checkCurrentFlow() {
        console.log('🔍 Verificando fluxo atual...');
        
        const currentUrl = window.location.href;
        console.log('📍 URL atual:', currentUrl);
        
        // Verificar se está no login e tem dados salvos
        if (currentUrl.includes('login.html')) {
            const userData = localStorage.getItem('user_data');
            const authToken = localStorage.getItem('auth_token');
            
            if (userData && authToken) {
                console.log('✅ Usuário logado encontrado, redirecionando para lobby...');
                setTimeout(() => {
                    window.location.href = 'lobby.html';
                }, 1000);
            }
        }
        
        console.log('✅ Fluxo atual verificado');
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('🚀 Executando correção do fluxo de login...');
        
        // Aplicar correções
        this.setupCorrectRedirect();
        this.fixDirectLoginFlow();
        this.setupLobbyFirst();
        this.maintainLoginFunctionality();
        this.fixPlayButton();
        
        // Verificar fluxo atual
        setTimeout(() => {
            this.checkCurrentFlow();
        }, 500);
        
        console.log('✅ Correção do fluxo de login executada');
    }
}

// Exportar para uso global
window.CorrectLoginFlow = CorrectLoginFlow; 