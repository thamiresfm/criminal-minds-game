# 🚂 RAILWAY DEPLOY RÁPIDO - API POSTGRESQL

## ⚠️ PROBLEMA ATUAL:
A URL `https://criminal-minds-api.up.railway.app/api` não existe porque o deploy ainda não foi feito.

## 🚀 SOLUÇÃO RÁPIDA (5 MINUTOS):

### **1️⃣ ACESSE O RAILWAY**
🔗 **URL**: https://railway.app
- ✅ **Faça login** com GitHub
- ✅ **Autorize** o acesso ao repositório

### **2️⃣ CRIAR NOVO PROJETO**
1. **Clique**: "New Project"
2. **Selecione**: "Deploy from GitHub repo"
3. **Escolha**: `thamiresfm/criminal-minds-game`
4. **Configure**: Root Directory = `/api`

### **3️⃣ ADICIONAR POSTGRESQL**
1. **No dashboard**: "Add Service"
2. **Selecione**: "PostgreSQL"
3. **Conecte**: ao seu projeto API
4. **Aguarde**: Provisão automática (~2 min)

### **4️⃣ CONFIGURAR VARIÁVEIS**
**Variáveis automáticas** (Railway cria sozinho):
```
DATABASE_URL = postgresql://postgres:...
PGUSER = postgres
PGPASSWORD = senha_automatica
PGHOST = host_automatico
PGPORT = 5432
PGDATABASE = railway
```

**Variáveis manuais** (adicionar):
```
BD_URL = ${{Postgres.DATABASE_URL}}
JWT_SECRET = criminal_minds_jwt_secret_2024
NODE_ENV = production
```

### **5️⃣ OBTER URL DA API**
Após deploy (3-5 minutos):
- ✅ **URL gerada**: `https://criminal-minds-api-production-xxxx.up.railway.app`
- ✅ **Copiar** essa URL

### **6️⃣ CONFIGURAR NO CÓDIGO**
**Editar `js/api-client.js`:**
```javascript
// SUBSTITUIR:
production: null,

// POR:
production: 'https://sua-url-real.up.railway.app/api',
```

### **7️⃣ TESTAR**
```bash
curl https://sua-url-real.up.railway.app/api/health
```

**Resposta esperada:**
```json
{"success":true,"status":"healthy","database":"connected"}
```

---

## 🔧 ALTERNATIVA RÁPIDA - USAR LOCALHOST

Se preferir testar imediatamente:

### **Modificar temporariamente:**
```javascript
// Em js/api-client.js
production: 'http://localhost:3001/api', // Usar localhost temporário
```

### **Iniciar API local:**
```bash
node server/api.js
```

### **Testar GitHub Pages:**
- ✅ **Funciona** se API local estiver rodando
- ⚠️ **Para** quando fechar terminal

---

## ⚡ DEPLOY AUTOMÁTICO

### **Configurar Deploy Contínuo:**
1. **Railway**: Settings → GitHub
2. **Branch**: `gh-pages`
3. **Auto-deploy**: Ativado
4. **Root**: `/api`

**Resultado**: A cada push, redeploy automático!

---

## 🧪 TESTAR APÓS DEPLOY

### **1. Health Check:**
```bash
curl https://sua-api.railway.app/api/health
```

### **2. Registrar Usuário:**
```bash
curl -X POST https://sua-api.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Teste Railway",
    "email": "teste@railway.com",
    "detectiveName": "RailwayDet",
    "password": "123456"
  }'
```

### **3. GitHub Pages:**
- ✅ **Abrir**: https://thamiresfm.github.io/criminal-minds-game/register.html
- ✅ **Cadastrar**: Deve funcionar perfeitamente
- ✅ **Logs**: Console mostra "PostgreSQL"

---

## 🎯 CHECKLIST FINAL

### **✅ Deploy Railway:**
- [ ] Projeto criado
- [ ] PostgreSQL adicionado  
- [ ] Variáveis configuradas
- [ ] Deploy concluído
- [ ] URL copiada

### **✅ Configuração Código:**
- [ ] URL atualizada em `js/api-client.js`
- [ ] Código commitado e pushado
- [ ] GitHub Pages atualizado

### **✅ Teste Funcionamento:**
- [ ] Health check OK
- [ ] Registro funcionando
- [ ] Login funcionando
- [ ] Dados no PostgreSQL

---

## 🆘 PROBLEMAS COMUNS

### **❌ "Build Failed":**
```bash
# Verificar package.json na pasta api/
cd api/
npm install
```

### **❌ "Database Connection Failed":**
```bash
# Verificar se BD_URL está configurada:
BD_URL = ${{Postgres.DATABASE_URL}}
```

### **❌ "CORS Error":**
```javascript
// No api.js, verificar CORS:
origin: ['https://thamiresfm.github.io']
```

### **❌ "API não responde":**
```bash
# Verificar logs no Railway Dashboard
# Seção: "Deployments" → "View Logs"
```

---

## 🎉 RESULTADO ESPERADO

### **✅ APÓS CONFIGURAÇÃO:**
- **Localhost**: API local → PostgreSQL local ✅
- **GitHub Pages**: API Railway → PostgreSQL Railway ✅
- **Dados**: SOMENTE no banco PostgreSQL ✅
- **Experiência**: Rápida e confiável ✅

### **🗄️ BANCO DE DADOS:**
- **Tabela `users`**: Usuários registrados
- **Dados reais**: Persistentes e seguros
- **Backup**: Automático no Railway
- **Escalável**: Pronto para produção

---

## 🚂 RAILWAY - URL REAL EM 5 MINUTOS!

**1. Deploy** → **2. Copiar URL** → **3. Configurar código** → **4. Testar**

**✅ Sistema funcionando com PostgreSQL exclusivo!**