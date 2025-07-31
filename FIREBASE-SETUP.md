# 🔥 FIREBASE SETUP - Criminal Minds Game

Guia completo para configurar o Firebase Authentication e Firestore no seu projeto com variáveis secretas do GitHub.

## 📋 **ÍNDICE**

1. [Pré-requisitos](#-pré-requisitos)
2. [Criação do Projeto Firebase](#-criação-do-projeto-firebase)
3. [Configuração da Variável Secreta GitHub](#-configuração-da-variável-secreta-github)
4. [Setup para Desenvolvimento Local](#-setup-para-desenvolvimento-local)
5. [Configuração do Authentication](#-configuração-do-authentication)
6. [Configuração do Firestore](#-configuração-do-firestore)
7. [Deploy Automático](#-deploy-automático)
8. [Estrutura de Dados](#-estrutura-de-dados)
9. [Segurança e Regras](#-segurança-e-regras)
10. [Troubleshooting](#-troubleshooting)

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

### **🔐 IMPORTANTE - GUARDE ESTA CONFIGURAÇÃO:**
**⚠️ COPIE e SALVE essa configuração em local seguro!**  
Você precisará dela para:
- Configurar a variável secreta `DADOS_FIREBASE` no GitHub
- Setup de desenvolvimento local
- Backup de segurança

---

## 🔐 **CONFIGURAÇÃO DA VARIÁVEL SECRETA GITHUB**

### **1. Acessar Configurações do Repositório**
```bash
1. Vá para seu repositório no GitHub
2. Clique em "Settings" (Configurações)
3. No menu lateral: "Secrets and variables"
4. Clique em "Actions"
```

### **2. Criar Variável Secreta**
```bash
1. Clique em "New repository secret"
2. Name: DADOS_FIREBASE
3. Secret: Cole a configuração JSON (veja exemplo abaixo)
4. Clique em "Add secret"
```

### **3. Formato da Variável DADOS_FIREBASE**
A variável deve conter EXATAMENTE este formato JSON (uma linha só):

```json
{"apiKey":"AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","authDomain":"criminal-minds-game.firebaseapp.com","projectId":"criminal-minds-game","storageBucket":"criminal-minds-game.appspot.com","messagingSenderId":"123456789012","appId":"1:123456789012:web:abcdefghijklmnop"}
```

### **⚠️ ATENÇÃO - FORMATO CRÍTICO:**
- **SEM quebras de linha** - tudo em uma linha só
- **SEM espaços extras** entre as propriedades
- **COM aspas duplas** em todas as chaves e valores
- **Substitua pelos seus dados reais** do Firebase Console

### **4. Verificar Configuração**
```bash
✅ CORRETO:
{"apiKey":"sua_api_key","authDomain":"seu_projeto.firebaseapp.com",...}

❌ INCORRETO:
{
  "apiKey": "sua_api_key",
  "authDomain": "seu_projeto.firebaseapp.com",
  ...
}
```

---

## 💻 **SETUP PARA DESENVOLVIMENTO LOCAL**

### **1. Executar Script de Setup**
```bash
# Executar setup automático
node setup-firebase-local.js

# ou se preferir npm
npm run setup:firebase
```

### **2. O que o Script Faz:**
```bash
✅ AÇÕES AUTOMÁTICAS:
• Cria firebase-config-injected.js com config local
• Adiciona script aos arquivos HTML
• Atualiza .gitignore
• Mostra próximos passos
```

### **3. Configuração Manual (Alternativa)**
Se preferir fazer manualmente:

```bash
# 1. Criar arquivo de configuração local
echo 'window.FIREBASE_CONFIG = {
  "apiKey": "SUA_API_KEY_AQUI",
  "authDomain": "seu-projeto.firebaseapp.com",
  "projectId": "seu-projeto-id",
  "storageBucket": "seu-projeto.appspot.com",  
  "messagingSenderId": "123456789012",
  "appId": "1:123456789012:web:abcdef"
};' > firebase-config-injected.js
```

### **4. Adicionar aos Arquivos HTML**
Adicione esta linha no `<head>` de cada arquivo HTML:

```html
<script src="firebase-config-injected.js"></script>
```

**Arquivos que precisam:**
- `login.html`
- `register.html` 
- `lobby.html`
- `investigation.html`
- `investigation-cards.html`

### **5. Atualizar .gitignore**
```bash
# Adicionar ao .gitignore
echo 'firebase-config-injected.js' >> .gitignore
```

### **6. Testar Localmente**
```bash
# Servir arquivos
npx serve .
# ou
python -m http.server 8000

# Testar em http://localhost:3000 ou :8000
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

## 🚀 **DEPLOY AUTOMÁTICO**

### **1. GitHub Actions Configurado**
O projeto já tem GitHub Actions configurado que:

```bash
✅ FUNCIONALIDADES AUTOMÁTICAS:
• Lê a variável secreta DADOS_FIREBASE
• Injeta configuração nos arquivos durante build
• Adiciona script Firebase automaticamente aos HTMLs
• Faz deploy automático no GitHub Pages
• Verifica integridade da configuração
```

### **2. Workflow: `.github/workflows/deploy-firebase.yml`**
```yaml
# O workflow executa automaticamente quando:
- push na branch gh-pages
- Execução manual (workflow_dispatch)

# Processo automático:
1. Checkout do repositório
2. Setup Node.js e dependências
3. Injeção da configuração Firebase
4. Atualização dos arquivos HTML
5. Build do projeto
6. Deploy para GitHub Pages
7. Verificação do deploy
```

### **3. Como Funciona**
```bash
📋 FLUXO AUTOMÁTICO:

1️⃣ PUSH PARA gh-pages:
   git push origin gh-pages

2️⃣ GITHUB ACTIONS EXECUTA:
   • Lê secrets.DADOS_FIREBASE
   • Cria firebase-config-injected.js
   • Injeta script nos HTMLs automaticamente

3️⃣ DEPLOY AUTOMÁTICO:
   • Site atualizado em GitHub Pages
   • Firebase configurado e funcionando
   • Pronto para uso em produção
```

### **4. Verificar Deploy**
```bash
# Verificar se GitHub Actions executou
1. Vá para: GitHub → Actions tab
2. Veja o status do último workflow
3. Clique no workflow para ver detalhes

# Verificar se configuração foi injetada
1. Acesse seu site: https://usuario.github.io/criminal-minds-game
2. Abra DevTools (F12)
3. Vá para Console
4. Deve aparecer: "✅ Firebase configurado via GitHub Actions"
```

### **5. Deploy Manual (Se Necessário)**
```bash
# Executar workflow manualmente
1. GitHub → Actions tab
2. Clique em "🔥 Deploy with Firebase Config"
3. Clique em "Run workflow"
4. Selecione branch: gh-pages
5. Clique em "Run workflow" (verde)
```

### **6. Logs e Debug**
```bash
# Em caso de erro, verificar:
1. GitHub → Actions → Workflow com erro
2. Expandir steps para ver detalhes
3. Verificar se DADOS_FIREBASE está configurado
4. Verificar formato JSON da variável secreta
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

---

## 🔧 **TROUBLESHOOTING**

### **❌ Erro: "FIREBASE NÃO CONFIGURADO"**
```bash
🔍 DIAGNÓSTICO:
• Variável secreta DADOS_FIREBASE não encontrada
• Formato JSON inválido na variável secreta
• Script firebase-config-injected.js não foi criado

✅ SOLUÇÃO:
1. Verificar se variável DADOS_FIREBASE existe no GitHub
2. Verificar formato JSON (sem quebras de linha)
3. Re-executar deploy ou setup local
```

### **❌ Erro: "Firebase config carregada, mas auth não funciona"**
```bash
🔍 DIAGNÓSTICO:
• Configuração injetada mas projeto Firebase não configurado
• Authentication não ativado no Firebase Console
• Domínio não autorizado no Firebase

✅ SOLUÇÃO:
1. Ativar Authentication no Firebase Console
2. Ativar método Email/Password
3. Adicionar domínio em Authorized domains
```

### **❌ Erro: "Failed to initialize Firebase"**
```bash
🔍 DIAGNÓSTICO:
• API Key inválida ou revogada
• Project ID incorreto
• Restrições de API Key

✅ SOLUÇÃO:
1. Verificar configuração no Firebase Console
2. Regenerar API Key se necessário
3. Verificar restrições da API Key
```

### **❌ GitHub Actions falha no deploy**
```bash
🔍 DIAGNÓSTICO:
• Variável secreta DADOS_FIREBASE não configurada
• Formato JSON inválido (quebras de linha)
• Permissões do GitHub Actions insuficientes

✅ SOLUÇÃO:
1. Configurar variável secreta corretamente
2. Verificar formato JSON em linha única
3. Verificar permissões em Settings → Actions
```

### **❌ Erro: "Permission denied" no Firestore**
```bash
🔍 DIAGNÓSTICO:
• Regras de segurança muito restritivas
• Usuário não autenticado
• Database em modo produção sem regras

✅ SOLUÇÃO:
1. Configurar regras de segurança adequadas
2. Verificar se usuário está logado
3. Testar com regras de teste temporariamente
```

### **🔍 Como Debuggar Problemas:**

#### **1. Console do Navegador**
```javascript
// Verificar se configuração foi carregada
console.log('Firebase Config:', window.FIREBASE_CONFIG);

// Verificar estado de autenticação
import { getCurrentUser } from './firebase-config.js';
console.log('Usuário atual:', getCurrentUser());
```

#### **2. GitHub Actions Logs**
```bash
1. GitHub → Actions tab
2. Clique no workflow com problema
3. Expandir "🔥 Inject Firebase Config"
4. Verificar se variável foi lida corretamente
```

#### **3. Firebase Console Debug**
```bash
1. Firebase Console → Authentication → Users
2. Verificar se usuários estão sendo criados
3. Firebase Console → Firestore → Data
4. Verificar se dados estão sendo salvos
```

### **📞 Suporte e Recursos:**

#### **🔗 Links Úteis:**
- **Firebase Console**: https://console.firebase.google.com/
- **GitHub Actions**: https://github.com/features/actions
- **Firebase Docs**: https://firebase.google.com/docs
- **GitHub Secrets**: https://docs.github.com/en/actions/security-guides/encrypted-secrets

#### **📋 Checklist Final:**
```bash
✅ Projeto Firebase criado
✅ Authentication habilitado (Email/Password)
✅ Firestore Database criado
✅ Configuração copiada corretamente
✅ Variável DADOS_FIREBASE configurada no GitHub
✅ Formato JSON válido (sem quebras de linha)
✅ Deploy executado com sucesso
✅ Site carregando com Firebase configurado
✅ Cadastro e login funcionando
✅ Dados sendo salvos no Firestore
```

---

## 🎉 **RESULTADO FINAL**

### **✅ SISTEMA COMPLETO FUNCIONANDO:**

🔐 **Autenticação Segura**: Email/senha com Firebase Auth  
☁️ **Dados na Nuvem**: Firestore sincronizado automaticamente  
🚀 **Deploy Automático**: GitHub Actions + Variáveis Secretas  
🛡️ **Segurança Total**: Configurações protegidas por GitHub Secrets  
👥 **Multiplayer Real**: Base sólida para jogos em tempo real  
📊 **Analytics Completo**: Dados estruturados para métricas  

### **🎮 Criminal Minds Game - Versão Profissional!**

**🔥 Firebase Authentication + Firestore configurado com segurança total!**

**✨ Sistema moderno, escalável e pronto para produção!**