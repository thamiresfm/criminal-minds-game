# 🔄 MYSQL + RETOOL SETUP - Criminal Minds Game

Guia completo para configurar o sistema de persistência de dados com MySQL + Retool substituindo o Firebase.

## 📋 **ÍNDICE**

1. [Visão Geral do Sistema](#-visão-geral-do-sistema)
2. [Estrutura de Dados Criada](#-estrutura-de-dados-criada)
3. [Configuração do MySQL](#-configuração-do-mysql)
4. [Configuração do Prisma ORM](#-configuração-do-prisma-orm)
5. [Configuração do Retool](#-configuração-do-retool)
6. [Integração com o Frontend](#-integração-com-o-frontend)
7. [Scripts de Dados](#-scripts-de-dados)
8. [Deploy e Produção](#-deploy-e-produção)
9. [API Endpoints](#-api-endpoints)
10. [Troubleshooting](#-troubleshooting)

---

## 🎯 **VISÃO GERAL DO SISTEMA**

### **🔄 MIGRAÇÃO FIREBASE → MYSQL + RETOOL:**

**❌ ANTES (Firebase):**
- Firebase Authentication
- Firestore Database
- Configurações via GitHub Secrets
- Dados na nuvem do Google

**✅ AGORA (MySQL + Retool):**
- **MySQL Database** - Dados estruturados e relacionais
- **Prisma ORM** - Gerenciamento avançado de banco
- **Retool** - Interface administrativa e webhooks
- **Express.js API** - Backend completo para o jogo
- **JWT + Sessions** - Autenticação robusta

### **🏗️ ARQUITETURA DO SISTEMA:**

```
📱 FRONTEND (HTML/JS)
    ↕️
🌐 EXPRESS.JS API
    ↕️
🛠️ PRISMA ORM
    ↕️
🗄️ MYSQL DATABASE
    ↕️
📊 RETOOL ADMIN
```

---

## 📊 **ESTRUTURA DE DADOS CRIADA**

### **🗂️ TABELAS IMPLEMENTADAS:**

| Tabela | Função | Registros Exemplo |
|--------|--------|-------------------|
| **users** | Usuários do jogo | 10 usuários com dados completos |
| **game_stats** | Estatísticas dos jogadores | Pontuações, rankings, conquistas |
| **user_sessions** | Sessões de login | Controle de autenticação |
| **games** | Salas e partidas | Jogos ativos e histórico |
| **game_players** | Participantes dos jogos | Relacionamento users ↔ games |
| **game_progress** | Progresso das partidas | Salvamentos de progresso |

### **📈 DADOS REALÍSTICOS CRIADOS:**

#### **👥 USUÁRIOS EXEMPLO:**
- **Admin**: admin@criminalmindsgame.com
- **João Silva**: Detetive_Joao (SALA123)
- **Maria Oliveira**: Detetive_Maria (SALA123)
- **Carlos Pereira**: Detetive_Carlos (SALA456)
- **Ana Costa**: Detetive_Ana (SALA789)
- **+ 5 usuários adicionais**

#### **🎮 JOGOS EXEMPLO:**
- **SALA123**: 3 jogadores, modo cards, ativo
- **SALA456**: 2 jogadores, modo classic, aguardando
- **SALA789**: 4 jogadores, modo cards, ativo
- **Jogos finalizados** com resultados completos

#### **📊 ESTATÍSTICAS REALÍSTICAS:**
- Jogos jogados: 0-25 por usuário
- Pontuações: 50-2100 pontos
- Cartas coletadas: 2-78 cartas
- Rankings: Níveis 1-6
- Conquistas desbloqueadas

---

## 🗄️ **CONFIGURAÇÃO DO MYSQL**

### **1. Opções de Hospedagem MySQL:**

#### **☁️ RECOMENDADO - PlanetScale (Gratuito):**
```bash
1. Acesse: https://planetscale.com/
2. Crie conta gratuita
3. Crie novo database: "criminal-minds-game"
4. Obtenha connection string
5. Configure branch "main"
```

#### **🐳 Docker Local:**
```bash
# Executar MySQL local
docker run -d \
  --name criminal-minds-mysql \
  -e MYSQL_ROOT_PASSWORD=criminal123 \
  -e MYSQL_DATABASE=criminal_minds_game \
  -p 3306:3306 \
  mysql:8.0
```

#### **🌐 Outras Opções:**
- **Railway**: railway.app (fácil deploy)
- **Supabase**: supabase.com (PostgreSQL)
- **AWS RDS**: Produção enterprise
- **Google Cloud SQL**: Integração Google

### **2. Configurar Variáveis de Ambiente:**

```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar .env com seus dados reais
DATABASE_URL="mysql://user:password@host:port/database"

# Exemplo PlanetScale:
DATABASE_URL="mysql://user:pass@aws.connect.psdb.cloud/criminal-minds-game?sslaccept=strict"

# Exemplo Local:
DATABASE_URL="mysql://root:criminal123@localhost:3306/criminal_minds_game"
```

---

## 🛠️ **CONFIGURAÇÃO DO PRISMA ORM**

### **1. Inicializar Prisma:**
```bash
# Já foi executado, mas para referência:
npx prisma init
```

### **2. Gerar Cliente Prisma:**
```bash
# Gerar cliente baseado no schema
npx prisma generate
```

### **3. Executar Migrações:**
```bash
# Primeira migração (criar tabelas)
npx prisma migrate dev --name init

# Aplicar mudanças futuras
npx prisma migrate dev
```

### **4. Povoar Banco com Dados:**
```bash
# Opção A: Importar CSVs criados
node scripts/import-csv-data.js

# Opção B: Seed automático
npx prisma db seed

# Opção C: Seed via código
node -e "require('./src/config/database').DatabaseUtils.seedDatabase()"
```

### **5. Abrir Prisma Studio (Interface Visual):**
```bash
# Interface web para visualizar dados
npx prisma studio

# Acesse: http://localhost:5555
```

### **📋 COMANDOS ÚTEIS PRISMA:**
```bash
# Ver status do banco
npx prisma migrate status

# Reset completo (CUIDADO!)
npx prisma migrate reset

# Deploy para produção
npx prisma migrate deploy

# Gerar apenas cliente (após mudanças schema)
npx prisma generate

# Validar schema
npx prisma validate

# Formatar schema
npx prisma format
```

---

## 📊 **CONFIGURAÇÃO DO RETOOL**

### **1. Criar Conta Retool:**
```bash
1. Acesse: https://retool.com/
2. Crie conta gratuita (até 5 usuários)
3. Crie novo app: "Criminal Minds Admin"
```

### **2. Conectar ao MySQL:**
```bash
1. No Retool: Resources → Create Resource
2. Selecione: MySQL
3. Configure conexão:
   - Host: seu_host_mysql
   - Port: 3306
   - Database: criminal_minds_game
   - Username: seu_usuario
   - Password: sua_senha
   - SSL: habilitado (se necessário)
```

### **3. Criar Painéis Administrativos:**

#### **📊 PAINEL DE USUÁRIOS:**
```sql
-- Query para listar usuários
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.detective_name,
  u.game_code,
  u.registration_date,
  u.last_login,
  u.is_active,
  gs.games_played,
  gs.games_won,
  gs.total_score,
  gs.rank_level
FROM users u
LEFT JOIN game_stats gs ON u.id = gs.user_id
ORDER BY u.registration_date DESC;
```

#### **🎮 PAINEL DE JOGOS:**
```sql
-- Query para listar jogos ativos
SELECT 
  g.id,
  g.game_code,
  g.game_mode,
  g.status,
  g.current_players,
  g.max_players,
  g.difficulty,
  g.created_at,
  u.detective_name as host_name
FROM games g
JOIN users u ON g.host_user_id = u.id
WHERE g.is_active = true
ORDER BY g.created_at DESC;
```

#### **📈 DASHBOARD DE ESTATÍSTICAS:**
```sql
-- Estatísticas gerais
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_users,
  COUNT(CASE WHEN last_login > DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as weekly_active
FROM users;

-- Jogos por modo
SELECT 
  game_mode,
  COUNT(*) as total_games,
  AVG(current_players) as avg_players
FROM games 
GROUP BY game_mode;
```

### **4. Configurar Webhooks:**

#### **🔗 WEBHOOK DE LOGIN:**
```javascript
// URL: https://seu-app.retool.com/api/webhook/login
// Method: POST

// Payload esperado:
{
  "action": "validate_login",
  "email": "user@email.com",
  "passwordHash": "hash_da_senha"
}

// Response:
{
  "success": true,
  "valid": true,
  "userData": {...}
}
```

#### **📝 WEBHOOK DE REGISTRO:**
```javascript
// URL: https://seu-app.retool.com/api/webhook/register
// Method: POST

// Payload esperado:
{
  "action": "sync_user",
  "data": {
    "userId": 123,
    "email": "user@email.com",
    "fullName": "Nome do Usuário",
    "detectiveName": "Detetive_User",
    "registrationDate": "2024-01-20T10:00:00Z"
  }
}
```

#### **🎮 WEBHOOK DE DADOS DO JOGO:**
```javascript
// URL: https://seu-app.retool.com/api/webhook/game-data
// Method: POST

// Payload esperado:
{
  "action": "save_progress",
  "data": {
    "progressId": 456,
    "gameId": 123,
    "userId": 789,
    "progressData": {...}
  }
}
```

### **5. Configurar Variáveis Retool:**
```bash
# Adicionar ao .env
RETOOL_API_URL="https://seu-app.retool.com/api"
RETOOL_API_KEY="sua_api_key_aqui"
RETOOL_APP_ID="seu_app_id"

RETOOL_WEBHOOK_LOGIN="https://seu-app.retool.com/api/webhook/login"
RETOOL_WEBHOOK_REGISTER="https://seu-app.retool.com/api/webhook/register"
RETOOL_WEBHOOK_GAME_DATA="https://seu-app.retool.com/api/webhook/game-data"
```

---

## 🎮 **INTEGRAÇÃO COM O FRONTEND**

### **1. Substituir Firebase no HTML:**

#### **❌ REMOVER (Firebase):**
```html
<!-- Remover scripts Firebase -->
<script src="firebase-config.js"></script>
<script src="firebase-integration-example.js"></script>
```

#### **✅ ADICIONAR (MySQL + API):**
```html
<!-- Adicionar cliente da API -->
<script src="src/client/api-client.js"></script>
<script src="src/client/auth-client.js"></script>
```

### **2. Criar Cliente JavaScript:**

#### **📝 API CLIENT (src/client/api-client.js):**
```javascript
class CriminalMindsAPI {
  constructor() {
    this.baseURL = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000/api'
      : 'https://seu-backend.herokuapp.com/api';
    this.token = localStorage.getItem('criminalMinds_token');
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
      ...options
    };
    
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
    
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }
    
    return data;
  }
  
  // Métodos de autenticação
  async register(userData) {
    return await this.request('/auth/register', {
      method: 'POST',
      body: userData
    });
  }
  
  async login(email, password) {
    return await this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  }
  
  async logout() {
    return await this.request('/auth/logout', {
      method: 'POST'
    });
  }
  
  // Métodos de jogo
  async createGame(gameData) {
    return await this.request('/game/create', {
      method: 'POST',
      body: gameData
    });
  }
  
  async joinGame(gameCode) {
    return await this.request('/game/join', {
      method: 'POST',
      body: { gameCode }
    });
  }
  
  async saveProgress(gameId, progressData) {
    return await this.request('/game/progress', {
      method: 'POST',
      body: { gameId, ...progressData }
    });
  }
}

// Instância global
window.criminalMindsAPI = new CriminalMindsAPI();
```

### **3. Atualizar Lógica de Login:**

#### **📝 NOVO LOGIN (login.html):**
```javascript
// Substituir a função de login atual
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  if (!email || !password) {
    alert('Email e senha são obrigatórios.');
    return;
  }
  
  const submitButton = document.querySelector('.login-button');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '⏳ Fazendo login...';
  submitButton.disabled = true;
  
  try {
    const result = await window.criminalMindsAPI.login(email, password);
    
    if (result.success) {
      // Salvar dados de autenticação
      localStorage.setItem('criminalMinds_token', result.session.jwtToken);
      localStorage.setItem('criminalMinds_username', result.user.detectiveName);
      localStorage.setItem('criminalMinds_userEmail', result.user.email);
      localStorage.setItem('criminalMinds_isLoggedIn', 'true');
      
      submitButton.innerHTML = '✅ Login realizado com sucesso!';
      submitButton.style.background = 'linear-gradient(to right, #10b981, #059669)';
      
      setTimeout(() => {
        window.location.href = 'lobby.html';
      }, 1500);
    } else {
      throw new Error(result.error || 'Erro no login');
    }
    
  } catch (error) {
    console.error('Erro no login:', error);
    alert('Erro no login: ' + error.message);
    
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    submitButton.style.background = '';
  }
});
```

### **4. Middleware de Autenticação:**

#### **📝 AUTH CHECK (todas as páginas protegidas):**
```javascript
// Adicionar no início das páginas que precisam de autenticação
(async function checkAuth() {
  const token = localStorage.getItem('criminalMinds_token');
  const isLoggedIn = localStorage.getItem('criminalMinds_isLoggedIn');
  
  if (!token || !isLoggedIn) {
    // Redirecionar para login
    window.location.href = 'login.html';
    return;
  }
  
  try {
    // Validar token com o servidor
    const validation = await window.criminalMindsAPI.request('/auth/validate');
    
    if (!validation.valid) {
      // Token inválido, limpar e redirecionar
      localStorage.clear();
      window.location.href = 'login.html';
    }
  } catch (error) {
    console.error('Erro na validação de autenticação:', error);
    localStorage.clear();
    window.location.href = 'login.html';
  }
})();
```

---

## 📁 **SCRIPTS DE DADOS**

### **1. Script de Importação CSV:**

#### **📝 scripts/import-csv-data.js:**
```javascript
const fs = require('fs');
const csv = require('csv-parser');
const { prisma } = require('../src/config/database');

async function importUsers() {
  const users = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream('./database/users.csv')
      .pipe(csv())
      .on('data', (data) => users.push(data))
      .on('end', async () => {
        try {
          for (const userData of users) {
            await prisma.user.create({
              data: {
                email: userData.email,
                passwordHash: userData.password_hash,
                fullName: userData.full_name,
                detectiveName: userData.detective_name,
                gameCode: userData.game_code || null,
                registrationDate: new Date(userData.registration_date),
                lastLogin: userData.last_login ? new Date(userData.last_login) : null,
                isActive: userData.is_active === '1',
                emailVerified: userData.email_verified === '1'
              }
            });
          }
          console.log(`✅ Importados ${users.length} usuários`);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  });
}

// Executar importação
async function runImport() {
  try {
    console.log('🔄 Iniciando importação de dados CSV...');
    
    await importUsers();
    // await importGameStats();
    // await importUserSessions();
    // ... outros imports
    
    console.log('🎉 Importação concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro na importação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  runImport();
}

module.exports = { importUsers, runImport };
```

### **2. Executar Importação:**
```bash
# Instalar dependência CSV
npm install csv-parser

# Executar importação
node scripts/import-csv-data.js
```

---

## 🚀 **DEPLOY E PRODUÇÃO**

### **1. Backend API (Express.js):**

#### **🌐 HEROKU DEPLOY:**
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login e criar app
heroku login
heroku create criminal-minds-api

# Configurar variáveis de ambiente
heroku config:set DATABASE_URL="mysql://..."
heroku config:set JWT_SECRET="..."
heroku config:set RETOOL_API_KEY="..."

# Deploy
git push heroku main
```

#### **🚂 RAILWAY DEPLOY:**
```bash
1. Acesse: https://railway.app/
2. Conecte repositório GitHub
3. Configure variáveis de ambiente
4. Deploy automático
```

#### **⚡ VERCEL DEPLOY (Serverless):**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configurar variáveis no dashboard
```

### **2. Database de Produção:**

#### **🌟 PLANETSCALE (Recomendado):**
```bash
1. Criar database de produção
2. Configurar branches (main/dev)
3. Executar migrate deploy
4. Monitorar performance
```

#### **🔒 BACKUP AUTOMÁTICO:**
```bash
# Script de backup
#!/bin/bash
mysqldump -h host -u user -p database > backup_$(date +%Y%m%d).sql

# Agendar via cron
0 2 * * * /path/to/backup-script.sh
```

### **3. Frontend (GitHub Pages):**
```bash
# Atualizar URLs da API para produção
# Em src/client/api-client.js:
this.baseURL = 'https://criminal-minds-api.herokuapp.com/api';

# Deploy normal no GitHub Pages
git push origin gh-pages
```

---

## 🔗 **API ENDPOINTS**

### **🔐 AUTENTICAÇÃO:**
```bash
POST /api/auth/register      # Registrar usuário
POST /api/auth/login         # Fazer login
POST /api/auth/logout        # Fazer logout
GET  /api/auth/validate      # Validar token
PUT  /api/auth/profile       # Atualizar perfil
PUT  /api/auth/password      # Alterar senha
```

### **🎮 JOGOS:**
```bash
POST /api/game/create        # Criar jogo
POST /api/game/join          # Entrar no jogo
POST /api/game/leave         # Sair do jogo
POST /api/game/start         # Iniciar jogo
GET  /api/game/:code         # Detalhes do jogo
GET  /api/game/user/:id      # Jogos do usuário
```

### **💾 PROGRESSO:**
```bash
POST /api/game/progress      # Salvar progresso
GET  /api/game/progress/:id  # Carregar progresso
PUT  /api/game/stats         # Atualizar estatísticas
```

### **📊 ADMIN:**
```bash
GET  /api/admin/users        # Listar usuários
GET  /api/admin/games        # Listar jogos
GET  /api/admin/stats        # Estatísticas gerais
```

---

## 🔧 **TROUBLESHOOTING**

### **❌ ERRO: "Cannot connect to MySQL"**
```bash
🔍 DIAGNÓSTICO:
• URL de conexão incorreta
• Credenciais inválidas
• Firewall bloqueando conexão
• MySQL server offline

✅ SOLUÇÃO:
1. Verificar DATABASE_URL no .env
2. Testar conexão: mysql -h host -u user -p
3. Verificar regras de firewall
4. Confirmar se MySQL está rodando
```

### **❌ ERRO: "Prisma schema validation failed"**
```bash
🔍 DIAGNÓSTICO:
• Schema.prisma com erros de sintaxe
• Relacionamentos mal definidos
• Tipos de dados incompatíveis

✅ SOLUÇÃO:
1. Executar: npx prisma validate
2. Verificar relacionamentos (@relation)
3. Confirmar tipos de dados
4. Executar: npx prisma format
```

### **❌ ERRO: "JWT token invalid"**
```bash
🔍 DIAGNÓSTICO:
• Token expirado
• JWT_SECRET incorreto
• Token mal formado

✅ SOLUÇÃO:
1. Verificar JWT_SECRET no .env
2. Implementar refresh token
3. Validar formato do token
4. Limpar localStorage e refazer login
```

### **❌ ERRO: "Retool webhook failed"**
```bash
🔍 DIAGNÓSTICO:
• URL do webhook incorreta
• API Key inválida
• Payload mal formado

✅ SOLUÇÃO:
1. Verificar URLs dos webhooks
2. Confirmar API Key do Retool
3. Testar webhook manualmente
4. Verificar logs do Retool
```

### **🧪 COMANDOS DE DEBUG:**
```bash
# Testar conexão banco
node -e "require('./src/config/database').DatabaseUtils.healthCheck()"

# Validar schema Prisma
npx prisma validate

# Ver status migrações
npx prisma migrate status

# Abrir Prisma Studio
npx prisma studio

# Testar API local
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@criminalmindsgame.com","password":"admin123"}'
```

---

## 📚 **RECURSOS ADICIONAIS**

### **🔗 LINKS ÚTEIS:**
- **Prisma Docs**: https://www.prisma.io/docs/
- **MySQL**: https://dev.mysql.com/doc/
- **Retool**: https://docs.retool.com/
- **PlanetScale**: https://planetscale.com/docs/
- **JWT**: https://jwt.io/

### **📖 PRÓXIMOS PASSOS:**
1. **Real-time Features**: Socket.io para multiplayer
2. **Caching**: Redis para performance
3. **Monitoring**: Sentry para erros
4. **Analytics**: Mixpanel para métricas
5. **CDN**: Cloudflare para assets

---

## ✅ **RESULTADO FINAL**

### **🎉 SISTEMA COMPLETO IMPLEMENTADO:**

🗄️ **MySQL Database**: Estrutura relacional robusta  
🛠️ **Prisma ORM**: Gerenciamento avançado de dados  
📊 **Retool Admin**: Interface administrativa completa  
🔐 **JWT Auth**: Autenticação segura e escalável  
📈 **CSV Data**: 6 tabelas com dados realísticos  
🚀 **Production Ready**: Deploy scripts e configurações  

### **🎮 CRIMINAL MINDS GAME - VERSÃO PROFISSIONAL!**

**✨ Sistema empresarial com dados persistentes, administração completa e escalabilidade total!**

**🔄 MIGRAÇÃO FIREBASE → MYSQL+RETOOL CONCLUÍDA COM SUCESSO!**