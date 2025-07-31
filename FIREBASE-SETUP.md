# 🔥 FIREBASE SETUP - Criminal Minds Game

Guia completo para configurar o Firebase Authentication e Firestore no seu projeto.

## 📋 **ÍNDICE**

1. [Pré-requisitos](#-pré-requisitos)
2. [Criação do Projeto Firebase](#-criação-do-projeto-firebase)
3. [Configuração do Authentication](#-configuração-do-authentication)
4. [Configuração do Firestore](#-configuração-do-firestore)
5. [Integração com o Código](#-integração-com-o-código)
6. [Migração do Sistema Atual](#-migração-do-sistema-atual)
7. [Estrutura de Dados](#-estrutura-de-dados)
8. [Segurança e Regras](#-segurança-e-regras)

---

## 🚀 **PRÉ-REQUISITOS**

### **✅ Verificações Necessárias:**
- [x] Firebase SDK instalado (`npm install firebase`)
- [x] Conta Google ativa
- [x] Projeto já funcionando com localStorage
- [x] Acesso ao Firebase Console

### **📦 Versão Instalada:**
```bash
npm list firebase
# Resultado: firebase@12.0.0
```

---

## 🏗️ **CRIAÇÃO DO PROJETO FIREBASE**

### **1. Acesse o Firebase Console**
🌐 **URL**: https://console.firebase.google.com/

### **2. Criar Novo Projeto**
```bash
1. Clique em "Criar um projeto"
2. Nome do projeto: "criminal-minds-game" (ou nome de sua escolha)
3. Google Analytics: Opcional (recomendado: SIM)
4. Conta do Analytics: Padrão ou criar nova
5. Aguarde a criação do projeto
```

### **3. Registrar Aplicativo Web**
```bash
1. No painel do projeto, clique no ícone "</>"
2. Nome do app: "Criminal Minds Game"
3. Nickname: "criminal-minds-web"
4. Firebase Hosting: Marcar (SIM)
5. Copiar a configuração gerada
```

### **📋 Configuração Gerada (Exemplo):**
```javascript
// Sua configuração será similar a esta:
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "criminal-minds-game.firebaseapp.com",
  projectId: "criminal-minds-game",
  storageBucket: "criminal-minds-game.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

---

## 🔐 **CONFIGURAÇÃO DO AUTHENTICATION**

### **1. Ativar Authentication**
```bash
1. No menu lateral: "Authentication"
2. Clique em "Vamos começar"
3. Aba "Sign-in method"
4. Habilitar "Email/Password"
```

### **2. Configurar Provedores**
```bash
✅ HABILITADO:
• Email/password ✓ (Principal)

❌ DESABILITADOS (por enquanto):
• Google
• Facebook  
• Twitter
• GitHub
```

### **3. Configurações de Segurança**
```bash
Authentication → Settings → User actions:
• Enable create (allow registration): ✓ ATIVADO
• Enable delete: ✓ ATIVADO
• Email enumeration protection: ✓ ATIVADO
```

---

## 🗄️ **CONFIGURAÇÃO DO FIRESTORE**

### **1. Criar Database Firestore**
```bash
1. Menu lateral: "Firestore Database"
2. Clique em "Criar banco de dados"
3. Modo: "Iniciar em modo de teste" (por enquanto)
4. Local: "southamerica-east1" (São Paulo)
```

### **2. Estrutura de Coleções Iniciais**
```bash
📁 Firestore Database
├── 📂 users (coleção)
│   └── 📄 {userId} (documento)
├── 📂 games (coleção)
│   └── 📄 {gameId} (documento)
├── 📂 gameProgress (coleção)
│   └── 📄 {progressId} (documento)
└── 📂 lobbies (coleção)
    └── 📄 {lobbyId} (documento)
```

---

## 🔧 **INTEGRAÇÃO COM O CÓDIGO**

### **1. Atualizar Configuração**
Edite o arquivo `firebase-config.js`:

```javascript
// Substitua pelos seus dados reais do Firebase Console
const firebaseConfig = {
  apiKey: "SUA_API_KEY_REAL",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

### **2. Adicionar aos Arquivos HTML**
Adicione ao `<head>` de `login.html` e `register.html`:

```html
<!-- Firebase Integration -->
<script type="module" src="firebase-config.js"></script>
<script type="module" src="firebase-integration-example.js"></script>
```

### **3. Substituir Lógica JavaScript**
Em `login.html` e `register.html`, comente o JavaScript atual e use a integração Firebase:

```html
<!-- Comentar JavaScript atual -->
<!--
<script>
// ... código atual do login/register
</script>
-->

<!-- Usar integração Firebase -->
<script type="module">
import './firebase-integration-example.js';
</script>
```

---

## 🔄 **MIGRAÇÃO DO SISTEMA ATUAL**

### **📊 Comparação: localStorage vs Firebase**

| Recurso | localStorage | Firebase |
|---------|-------------|----------|
| **Persistência** | Local apenas | Nuvem + Sincronização |
| **Segurança** | Baixa | Alta (Authentication) |
| **Validação** | Manual | Automática |
| **Recuperação** | Impossível | Email/senha |
| **Multiplayer** | Simulado | Real |
| **Analytics** | Limitado | Completo |

### **🔀 Estratégia de Migração**

#### **Fase 1: Coexistência (Recomendado)**
```javascript
// Manter localStorage como backup
localStorage.setItem('criminalMinds_username', detectiveName);

// + Adicionar Firebase
await registerUser(email, password, userData);
```

#### **Fase 2: Migração Gradual**
```javascript
// Verificar Firebase primeiro, fallback para localStorage
const firebaseUser = getCurrentUser();
const localUser = localStorage.getItem('criminalMinds_username');

const currentUser = firebaseUser || localUser;
```

#### **Fase 3: Firebase Completo**
```javascript
// Remover completamente localStorage
// Usar apenas Firebase Authentication
```

---

## 🗂️ **ESTRUTURA DE DADOS**

### **👤 Coleção: `users`**
```javascript
// Documento: users/{userId}
{
  uid: "firebase_user_id",
  email: "user@example.com",
  fullName: "João Silva",
  detectiveName: "Detetive_João",
  gameCode: "SALA123",
  registrationDate: "2024-01-15T10:30:00Z",
  isActive: true,
  gameStats: {
    gamesPlayed: 15,
    gamesWon: 8,
    totalScore: 1250,
    cardsCollected: 45,
    bestTime: 1800, // segundos
    favoriteMode: "cards"
  },
  preferences: {
    theme: "dark",
    soundEnabled: true,
    notificationsEnabled: true
  },
  lastLogin: "2024-01-20T14:22:00Z",
  lastGameId: "game_xyz123"
}
```

### **🎮 Coleção: `games`**
```javascript
// Documento: games/{gameId}
{
  gameId: "game_xyz123",
  lobbyCode: "SALA123",
  gameMode: "cards", // "cards" ou "classic"
  status: "active", // "waiting", "active", "finished"
  players: [
    {
      userId: "user1_id",
      detectiveName: "Detetive_João",
      role: "host",
      isReady: true,
      score: 150
    }
  ],
  settings: {
    maxPlayers: 6,
    timeLimit: 3600, // segundos
    difficulty: "medium",
    cardMode: true
  },
  createdAt: "2024-01-20T14:00:00Z",
  startedAt: "2024-01-20T14:05:00Z",
  finishedAt: null,
  winner: null
}
```

### **📈 Coleção: `gameProgress`**
```javascript
// Documento: gameProgress/{progressId}
{
  userId: "user1_id",
  gameId: "game_xyz123",
  timestamp: "2024-01-20T14:30:00Z",
  gameMode: "cards",
  progress: {
    cardsPlayed: 5,
    comboStreak: 3,
    playerCoins: 150,
    evidencesCollected: 7,
    currentLevel: 2,
    timeRemaining: 1200
  },
  session: {
    sessionId: "session_abc456",
    startTime: "2024-01-20T14:15:00Z",
    endTime: null,
    exitReason: null // "completed", "abandoned", "timeout"
  }
}
```

---

## 🔒 **SEGURANÇA E REGRAS**

### **1. Regras do Firestore**
Acesse: `Firestore → Rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para usuários - só pode ler/escrever próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Regras para jogos - participantes podem ler, host pode escrever
    match /games/{gameId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        resource.data.players[0].userId == request.auth.uid;
    }
    
    // Regras para progresso - só próprio usuário
    match /gameProgress/{progressId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### **2. Configurações de Segurança**
```bash
Authentication → Settings:
• Authorized domains: 
  - localhost (development)
  - thamiresfm.github.io (production)
  - criminal-minds-game.web.app (se usar Hosting)

• Password policy: Minimum 6 characters
• Email verification: Opcional
• Multi-factor auth: Desabilitado (por enquanto)
```

---

## 🧪 **TESTE DA INTEGRAÇÃO**

### **1. Teste Local**
```bash
# Servir arquivos localmente
npx serve .
# ou
python -m http.server 8000

# Testar em: http://localhost:8000
```

### **2. Checklist de Testes**
```bash
✅ CADASTRO:
[ ] Email válido aceito
[ ] Email duplicado rejeitado
[ ] Senha < 6 caracteres rejeitada
[ ] Dados salvos no Firestore
[ ] Redirecionamento para lobby

✅ LOGIN:
[ ] Credenciais corretas aceitas
[ ] Credenciais incorretas rejeitadas
[ ] Dados carregados do Firestore
[ ] Estado mantido entre páginas

✅ LOGOUT:
[ ] Logout remove autenticação
[ ] Redirecionamento para index
[ ] localStorage limpo
```

---

## 🚀 **DEPLOY E PRODUÇÃO**

### **1. GitHub Pages**
O Firebase funciona perfeitamente com GitHub Pages:

```bash
# Continuar usando o deploy atual
git add .
git commit -m "🔥 Firebase Integration"
git push origin gh-pages
```

### **2. Firebase Hosting (Alternativa)**
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login no Firebase
firebase login

# Inicializar hosting
firebase init hosting

# Deploy
firebase deploy
```

---

## 📚 **RECURSOS ADICIONAIS**

### **🔗 Links Úteis**
- **Firebase Console**: https://console.firebase.google.com/
- **Documentação Auth**: https://firebase.google.com/docs/auth/web/start
- **Documentação Firestore**: https://firebase.google.com/docs/firestore/quickstart
- **Exemplos de Código**: https://github.com/firebase/quickstart-js

### **📖 Próximos Passos**
1. **Real-time Features**: Usar Firestore listeners para multiplayer real
2. **Cloud Functions**: Lógica de backend para mecânicas do jogo
3. **Analytics**: Rastrear comportamento dos usuários
4. **Push Notifications**: Notificar sobre convites de jogo
5. **Storage**: Upload de avatares e imagens personalizadas

---

## ✅ **CONCLUSÃO**

Com essa configuração, você terá:

🔐 **Autenticação Real**: Email/senha segura  
🗄️ **Dados na Nuvem**: Sincronização automática  
👥 **Multiplayer Real**: Jogos em tempo real  
📊 **Analytics**: Métricas detalhadas  
🛡️ **Segurança**: Regras de acesso controladas  

**🎮 Seu Criminal Minds Game será um jogo moderno e profissional!**