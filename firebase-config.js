// Firebase Configuration
// Configuração do Firebase para Criminal Minds Game

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuração do Firebase - SUBSTITUA PELOS SEUS DADOS
// Acesse https://console.firebase.google.com/ para obter essas informações
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ========================================
// FUNÇÕES DE AUTENTICAÇÃO
// ========================================

/**
 * Criar nova conta de usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @param {object} userData - Dados adicionais do usuário
 * @returns {Promise} - Promise com resultado da operação
 */
export async function registerUser(email, password, userData) {
    try {
        // Criar usuário no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Salvar dados adicionais no Firestore
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: email,
            fullName: userData.fullName,
            detectiveName: userData.detectiveName,
            gameCode: userData.gameCode || '',
            registrationDate: serverTimestamp(),
            isActive: true,
            gameStats: {
                gamesPlayed: 0,
                gamesWon: 0,
                totalScore: 0,
                cardsCollected: 0
            }
        });
        
        console.log('✅ Usuário registrado com sucesso:', user.uid);
        return { success: true, user: user, userData: userData };
        
    } catch (error) {
        console.error('❌ Erro ao registrar usuário:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fazer login do usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} - Promise com resultado da operação
 */
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Buscar dados do usuário no Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('✅ Login realizado com sucesso:', user.uid);
            return { success: true, user: user, userData: userData };
        } else {
            console.error('❌ Dados do usuário não encontrados no Firestore');
            return { success: false, error: 'Dados do usuário não encontrados' };
        }
        
    } catch (error) {
        console.error('❌ Erro ao fazer login:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fazer logout do usuário
 * @returns {Promise} - Promise com resultado da operação
 */
export async function logoutUser() {
    try {
        await signOut(auth);
        console.log('✅ Logout realizado com sucesso');
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao fazer logout:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Verificar estado de autenticação
 * @param {function} callback - Função callback para mudanças de estado
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

// ========================================
// FUNÇÕES DE DADOS DO JOGO
// ========================================

/**
 * Salvar progresso do jogo
 * @param {string} userId - ID do usuário
 * @param {object} gameData - Dados do jogo para salvar
 * @returns {Promise} - Promise com resultado da operação
 */
export async function saveGameProgress(userId, gameData) {
    try {
        await addDoc(collection(db, 'gameProgress'), {
            userId: userId,
            ...gameData,
            timestamp: serverTimestamp()
        });
        
        console.log('✅ Progresso do jogo salvo com sucesso');
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao salvar progresso:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Atualizar estatísticas do usuário
 * @param {string} userId - ID do usuário
 * @param {object} stats - Estatísticas para atualizar
 * @returns {Promise} - Promise com resultado da operação
 */
export async function updateUserStats(userId, stats) {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            gameStats: stats,
            lastUpdated: serverTimestamp()
        }, { merge: true });
        
        console.log('✅ Estatísticas do usuário atualizadas');
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao atualizar estatísticas:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// UTILITÁRIOS
// ========================================

/**
 * Obter usuário atual
 * @returns {object|null} - Usuário atual ou null
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Verificar se usuário está logado
 * @returns {boolean} - True se logado, false caso contrário
 */
export function isUserLoggedIn() {
    return auth.currentUser !== null;
}

// Exportar instâncias para uso direto se necessário
export { auth, db };