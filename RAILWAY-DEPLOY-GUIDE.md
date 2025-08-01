# 🚂 RAILWAY DEPLOY - API POSTGRESQL

## ✅ DEPLOY DA API PARA FUNCIONAR COM BANCO POSTGRESQL

Para que o sistema funcione **SOMENTE com banco PostgreSQL** (sem localStorage), você precisa fazer deploy da API em um serviço externo.

---

## 🎯 OPÇÃO RECOMENDADA: RAILWAY

### **🚂 Por que Railway?**
- ✅ **PostgreSQL nativo** - banco incluído gratuitamente
- ✅ **Deploy automático** via GitHub  
- ✅ **Variáveis de ambiente** - BD_URL configuração fácil
- ✅ **HTTPS gratuito** - SSL automático
- ✅ **500 horas grátis/mês** - suficiente para desenvolvimento

---

## 📋 PASSO A PASSO - DEPLOY RAILWAY

### **1️⃣ PREPARAR ARQUIVOS**

Criar pasta `api/` na raiz do projeto:
```bash
mkdir api
cp server/api.js api/
cp -r prisma api/
cp package.json api/
cp .env.example api/
```

### **2️⃣ CRIAR `api/package.json`**
```json
{
  "name": "criminal-minds-api",
  "version": "1.0.0",
  "description": "API PostgreSQL para Criminal Minds Game",
  "main": "api.js",
  "scripts": {
    "start": "node api.js",
    "build": "npx prisma generate && npx prisma migrate deploy"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "prisma": "^5.1.1",
    "@prisma/client": "^5.1.1",
    "dotenv": "^16.3.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### **3️⃣ FAZER DEPLOY**

1. **Acesse**: https://railway.app
2. **Login** com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Selecionar** seu repositório `criminal-minds-game`
5. **Root Directory**: `/api`

### **4️⃣ CONFIGURAR POSTGRESQL**

1. **Add PostgreSQL** service
2. **Conectar** ao projeto da API
3. **Variável** `BD_URL` será criada automaticamente

### **5️⃣ CONFIGURAR VARIÁVEIS**

No Railway Dashboard:
```
BD_URL = postgresql://postgres:password@host:port/database
JWT_SECRET = criminal_minds_jwt_secret_2024
NODE_ENV = production
```

### **6️⃣ DEPLOY AUTOMÁTICO**

- ✅ Railway faz build automático
- ✅ Roda `prisma generate` e `prisma migrate deploy`
- ✅ Inicia API na porta automática
- ✅ Gera URL HTTPS: `https://criminal-minds-api.up.railway.app`

---

## 🔧 ATUALIZAR FRONTEND

### **Atualizar `js/api-client.js`:**
```javascript
production: 'https://criminal-minds-api.up.railway.app/api'
```

### **Testar:**
```bash
curl https://criminal-minds-api.up.railway.app/api/health
```

---

## 🚀 ALTERNATIVAS AO RAILWAY

### **1️⃣ VERCEL (Serverless)**
```bash
npm install -g vercel
cd api/
vercel
```

### **2️⃣ RENDER**
- Deploy gratuito PostgreSQL
- Build automático via GitHub
- SSL gratuito

### **3️⃣ HEROKU**
- PostgreSQL addon
- Build packs automáticos
- CLI poderoso

---

## 📊 CONFIGURAÇÃO FINAL

### **✅ ARQUIVO `api/api.js`:**
```javascript
// Configurar CORS para GitHub Pages
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://thamiresfm.github.io'
  ],
  credentials: true
}));
```

### **✅ ESTRUTURA DE PASTAS:**
```
criminal-minds-game/
│
├── api/                    # Para deploy Railway
│   ├── api.js             # Servidor Express
│   ├── package.json       # Dependências da API
│   ├── prisma/            # Schema do banco
│   └── .env.example       # Exemplo de variáveis
│
├── js/api-client.js       # Cliente frontend
├── register.html          # Página de registro
├── login.html             # Página de login
└── ...
```

---

## 🧪 TESTAR DEPLOY

### **1️⃣ VERIFICAR API:**
```bash
curl https://sua-api.railway.app/api/health
```

### **2️⃣ TESTAR REGISTRO:**
```bash
curl -X POST https://sua-api.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Teste","email":"teste@exemplo.com","detectiveName":"TesteDet","password":"123456"}'
```

### **3️⃣ VERIFICAR CORS:**
- Abrir GitHub Pages
- Console do navegador deve mostrar conexão bem-sucedida

---

## ⚡ CONFIGURAÇÃO RÁPIDA

### **SCRIPT AUTOMÁTICO:**
```bash
# 1. Preparar pasta api
mkdir -p api
cp server/api.js api/
cp -r prisma api/

# 2. Criar package.json específico
cat > api/package.json << 'EOF'
{
  "name": "criminal-minds-api",
  "main": "api.js",
  "scripts": {
    "start": "node api.js",
    "build": "npx prisma generate && npx prisma migrate deploy"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "prisma": "^5.1.1",
    "@prisma/client": "^5.1.1",
    "dotenv": "^16.3.1"
  }
}
EOF

# 3. Commit e push
git add api/
git commit -m "Preparar API para deploy Railway"
git push origin main

echo "✅ Pronto para deploy no Railway!"
echo "🔗 Acesse: https://railway.app"
```

---

## 🎯 RESULTADO FINAL

### **✅ APÓS DEPLOY:**
- **Localhost**: API local → PostgreSQL local
- **GitHub Pages**: API Railway → PostgreSQL Railway  
- **Dados**: SOMENTE no banco PostgreSQL
- **localStorage**: Apenas token de sessão
- **Experiência**: Rápida e confiável

### **🔒 SEGURANÇA:**
- ✅ HTTPS obrigatório
- ✅ CORS configurado
- ✅ Helmet para headers seguros
- ✅ JWT para autenticação
- ✅ Senhas criptografadas com bcrypt

---

## 🎉 CRIMINAL MINDS - API POSTGRESQL FUNCIONANDO!

**🚂 Deploy Railway**: Banco exclusivo PostgreSQL  
**🌐 GitHub Pages**: Frontend consumindo API externa  
**🗄️ Dados**: 100% no banco de dados  
**🔐 Segurança**: Produção-ready  

**✅ Sistema profissional com persistência exclusiva no PostgreSQL!**