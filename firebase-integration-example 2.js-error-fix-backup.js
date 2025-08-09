// ========================================
// EXEMPLO DE INTEGRAÇÃO FIREBASE
// Criminal Minds Game - Substituição do localStorage
// ========================================

// Import das funções Firebase
import { registerUser, loginUser, logoutUser, onAuthChange, getCurrentUser } from './firebase-config.js';

// ========================================
// SUBSTITUIÇÃO PARA register.html
// ========================================

/**
 * Função para integrar o cadastro com Firebase
 * Substitui a lógica atual do register.html
 */
function integrateFirebaseRegister() {
    // Substituir o event listener atual do form de cadastro
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obter dados do formulário
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const detectiveName = document.getElementById('detectiveName').value.trim();
        const gameCode = document.getElementById('gameCode').value.trim();
        
        // Validações básicas (mantém as mesmas do código atual)
        if (!fullName) {
            alert('Por favor, digite seu nome completo.');
            return;
        }
        
        if (!email || !isValidEmail(email)) {
            alert('Por favor, digite um email válido.');
            return;
        }
        
        if (!password || password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
        
        if (!detectiveName) {
            alert('Por favor, digite seu nome de detetive.');
            return;
        }
        
        // Mostrar feedback de carregamento
        const submitButton = document.querySelector('.login-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '⏳ Criando conta...';
        submitButton.disabled = true;
        
        try {
            // Registrar usuário no Firebase
            const result = await registerUser(email, password, {
                fullName: fullName,
                detectiveName: detectiveName,
                gameCode: gameCode
            });
            
            if (result.success) {
                // Sucesso - atualizar interface
                submitButton.innerHTML = '✅ Cadastro realizado com sucesso!';
                submitButton.style.background = 'linear-gradient(to right, #10b981, #059669)';
                
                // Salvar dados localmente para compatibilidade (opcional)
                localStorage.setItem('criminalMinds_username', detectiveName);
                localStorage.setItem('criminalMinds_userEmail', email);
                localStorage.setItem('criminalMinds_isLoggedIn', 'true');
                
                // Redirecionar após sucesso
                setTimeout(() => {
                    window.location.href = 'lobby.html';
                }, 2000);
                
            } else {
                // Erro - mostrar mensagem
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Erro no cadastro:', error);
            
            // Mostrar erro amigável
            let errorMessage = 'Erro ao criar conta. Tente novamente.';
            
            if (error.message.includes('email-already-in-use')) {
                errorMessage = 'Este email já está em uso. Faça login ou use outro email.';
            } else if (error.message.includes('weak-password')) {
                errorMessage = 'Senha muito fraca. Use pelo menos 6 caracteres.';
            } else if (error.message.includes('invalid-email')) {
                errorMessage = 'Email inválido. Verifique o formato.';
            }
            
            alert(errorMessage);
            
            // Restaurar botão
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }
    });
}

// ========================================
// SUBSTITUIÇÃO PARA login.html
// ========================================

/**
 * Função para integrar o login com Firebase
 * Substitui a lógica atual do login.html
 */
function integrateFirebaseLogin() {
    // Substituir o event listener atual do form de login
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obter dados do formulário
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Validações básicas (mantém as mesmas do código atual)
        if (!email || !isValidEmail(email)) {
            alert('Por favor, digite um email válido.');
            return;
        }
        
        if (!password) {
            alert('Por favor, digite sua senha.');
            return;
        }
        
        // Mostrar feedback de carregamento
        const submitButton = document.querySelector('.login-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '⏳ Fazendo login...';
        submitButton.disabled = true;
        
        try {
            // Fazer login no Firebase
            const result = await loginUser(email, password);
            
            if (result.success) {
                // Sucesso - atualizar interface
                submitButton.innerHTML = '✅ Login realizado com sucesso!';
                submitButton.style.background = 'linear-gradient(to right, #10b981, #059669)';
                
                // Salvar dados localmente para compatibilidade (opcional)
                localStorage.setItem('criminalMinds_username', result.userData.detectiveName);
                localStorage.setItem('criminalMinds_userEmail', email);
                localStorage.setItem('criminalMinds_isLoggedIn', 'true');
                
                // Redirecionar após sucesso
                setTimeout(() => {
                    window.location.href = 'lobby.html';
                }, 1500);
                
            } else {
                // Erro - mostrar mensagem
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Erro no login:', error);
            
            // Mostrar erro amigável
            let errorMessage = 'Erro ao fazer login. Verifique seus dados.';
            
            if (error.message.includes('user-not-found')) {
                errorMessage = 'Usuário não encontrado. Verifique o email ou cadastre-se.';
            } else if (error.message.includes('wrong-password')) {
                errorMessage = 'Senha incorreta. Tente novamente.';
            } else if (error.message.includes('invalid-email')) {
                errorMessage = 'Email inválido. Verifique o formato.';
            } else if (error.message.includes('too-many-requests')) {
                errorMessage = 'Muitas tentativas. Aguarde alguns minutos.';
            }
            
            alert(errorMessage);
            
            // Restaurar botão
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }
    });
}

// ========================================
// VERIFICAÇÃO DE AUTENTICAÇÃO GLOBAL
// ========================================

/**
 * Verificar se usuário já está logado ao carregar páginas
 * Adicionar em todas as páginas que precisam de autenticação
 */
function checkAuthState() {
    // Verificar estado de autenticação
    onAuthChange((user) => {
        if (user) {
            // Usuário logado
            console.log('✅ Usuário autenticado:', user.email);
            
            // Salvar no localStorage para compatibilidade
            localStorage.setItem('criminalMinds_userEmail', user.email);
            localStorage.setItem('criminalMinds_isLoggedIn', 'true');
            
            // Se estiver na página de login/cadastro, redirecionar
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'login.html' || currentPage === 'register.html') {
                window.location.href = 'lobby.html';
            }
            
        } else {
            // Usuário não logado
            console.log('❌ Usuário não autenticado');
            
            // Limpar localStorage
            localStorage.removeItem('criminalMinds_username');
            localStorage.removeItem('criminalMinds_userEmail');
            localStorage.removeItem('criminalMinds_isLoggedIn');
            
            // Se estiver em página protegida, redirecionar
            const currentPage = window.location.pathname.split('/').pop();
            const protectedPages = ['lobby.html', 'investigation.html', 'investigation-cards.html'];
            
            if (protectedPages.includes(currentPage)) {
                window.location.href = 'login.html';
            }
        }
    });
}

// ========================================
// FUNÇÃO DE LOGOUT
// ========================================

/**
 * Função de logout para adicionar em páginas do jogo
 */
async function handleLogout() {
    const confirmLogout = confirm('🚪 Tem certeza que deseja sair da sua conta?');
    
    if (confirmLogout) {
        try {
            const result = await logoutUser();
            
            if (result.success) {
                // Limpar dados locais
                localStorage.clear();
                
                // Redirecionar para página inicial
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error('Erro no logout:', error);
            alert('Erro ao fazer logout. Tente novamente.');
        }
    }
}

// ========================================
// INICIALIZAÇÃO AUTOMÁTICA
// ========================================

/**
 * Inicializar Firebase Integration baseado na página atual
 */
function initializeFirebaseIntegration() {
    // Sempre verificar estado de autenticação
    checkAuthState();
    
    // Inicializar baseado na página atual
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'register.html':
            integrateFirebaseRegister();
            break;
            
        case 'login.html':
            integrateFirebaseLogin();
            break;
            
        case 'lobby.html':
        case 'investigation.html':
        case 'investigation-cards.html':
            // Adicionar botão de logout se não existir
            addLogoutButton();
            break;
    }
}

/**
 * Adicionar botão de logout em páginas do jogo
 */
function addLogoutButton() {
    // Verificar se já existe
    if (document.getElementById('firebase-logout-btn')) return;
    
    // Criar botão de logout
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'firebase-logout-btn';
    logoutBtn.innerHTML = '🚪 Sair da Conta';
    logoutBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    logoutBtn.onmouseover = () => {
        logoutBtn.style.transform = 'scale(1.05)';
        logoutBtn.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
    };
    
    logoutBtn.onmouseout = () => {
        logoutBtn.style.transform = 'scale(1)';
        logoutBtn.style.boxShadow = 'none';
    };
    
    logoutBtn.onclick = handleLogout;
    
    document.body.appendChild(logoutBtn);
}

// ========================================
// VALIDAÇÃO DE EMAIL (reutilizar do código atual)
// ========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// INICIALIZAÇÃO AUTOMÁTICA
// ========================================

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeFirebaseIntegration);

// Exportar funções para uso global
window.firebaseAuth = {
    register: integrateFirebaseRegister,
    login: integrateFirebaseLogin,
    logout: handleLogout,
    checkAuth: checkAuthState
};