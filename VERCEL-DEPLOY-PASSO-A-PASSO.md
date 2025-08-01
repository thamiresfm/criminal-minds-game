# 🚀 VERCEL DEPLOY PASSO-A-PASSO - Corrigir 404 DEPLOYMENT_NOT_FOUND

## ❌ PROBLEMA ATUAL

**Error visto**: `404: DEPLOYMENT_NOT_FOUND`
**URL**: `https://criminal-minds-game.vercel.app/api/`
**Causa**: Deploy não foi feito ou configurado incorretamente

---

## 🎯 SOLUÇÃO: DEPLOY CORRETO NO VERCEL

### **📋 PASSO 1: ACESSAR VERCEL**

1. **Acesse**: [vercel.com](https://vercel.com)
2. **Login**: Com sua conta GitHub
3. **Dashboard**: Vercel principal

### **📋 PASSO 2: IMPORT PROJECT**

1. **Clique**: "Add New..." → "Project"
2. **Import Git Repository**:
   - **Repository**: `thamiresfm/criminal-minds-game`
   - **Branch**: `gh-pages` ← IMPORTANTE!

### **📋 PASSO 3: CONFIGURAÇÃO CRÍTICA**

**⚠️ CONFIGURAÇÕES ESSENCIAIS:**

**Framework Preset**: `Other`
**Root Directory**: `api` ← MUITO IMPORTANTE!
**Build Command**: `npm run vercel-build`
**Output Directory**: deixar vazio
**Install Command**: `npm install`

### **📋 PASSO 4: ENVIRONMENT VARIABLES**

**Adicionar todas as variáveis:**

```
BD_URL = postgresql://retool:npg_XgRpvi3F1TrU@ep-summer-dust-a6donxpr.us-west-2.retooldb.com/retool?sslmode=require

JWT_SECRET = criminal_minds_jwt_secret_2024

NODE_ENV = production
```

### **📋 PASSO 5: DEPLOY**

1. **Clique**: "Deploy"
2. **Aguardar**: 2-5 minutos
3. **Verificar**: Logs de build

---

## 🔧 ALTERNATIVA: VERCEL CLI

### **💻 DEPLOY VIA TERMINAL:**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta api
cd api

# Login no Vercel
vercel login

# Deploy
vercel --prod

# Seguir prompts:
# - Link to existing project? No
# - Project name: criminal-minds-game
# - Directory: . (current)
```

---

## 📊 VERIFICAR CONFIGURAÇÃO

### **✅ CONFIGURAÇÕES CORRETAS:**

**No Vercel Dashboard → Project Settings:**

```
Framework: Other
Root Directory: api
Build Command: npm run vercel-build
Output Directory: (empty)
Install Command: npm install
Node.js Version: 18.x
```

**Environment Variables:**
```
BD_URL: ********
JWT_SECRET: ********  
NODE_ENV: production
```

---

## 🧪 TESTE APÓS DEPLOY

### **📍 URLs PARA TESTAR:**

```bash
# Root da API
curl https://criminal-minds-game.vercel.app/

# Health check  
curl https://criminal-minds-game.vercel.app/api/health

# Registro
curl -X POST https://criminal-minds-game.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@test.com","detectiveName":"Test","password":"123456"}'
```

### **✅ RESPOSTAS ESPERADAS:**

**Root:**
```json
{"message": "Criminal Minds API - PostgreSQL"}
```

**Health:**
```json
{
  "success": true,
  "status": "healthy",
  "database": "connected"
}
```

---

## 🚨 TROUBLESHOOTING

### **❌ SE AINDA DER ERRO:**

**1. Verificar Root Directory:**
- **Deve ser**: `api`
- **NÃO**: vazio ou `/`

**2. Verificar Branch:**
- **Deve ser**: `gh-pages`
- **NÃO**: `main`

**3. Verificar Build Logs:**
- Vercel Dashboard → Deployments → View Build Logs
- Procurar erros de Prisma ou dependencies

**4. Recriar Projeto:**
- Delete projeto atual no Vercel
- Import novamente com configurações corretas

---

## 📂 ESTRUTURA ESPERADA

### **🔍 VERCEL DEVE VER:**

```
criminal-minds-game/api/
├── package.json ✅
├── api.js ✅
├── vercel.json ✅
├── prisma/
│   └── schema.prisma ✅
└── node_modules/ (após build)
```

### **❌ SE VERCEL VER:**

```
criminal-minds-game/
├── index.html
├── register.html
└── ... (arquivos HTML)
```

**Problema**: Root Directory não está configurado como `api`

---

## 🎯 CHECKLIST DEPLOY

### **✅ ANTES DO DEPLOY:**
- [ ] Repository: `thamiresfm/criminal-minds-game`
- [ ] Branch: `gh-pages`
- [ ] Root Directory: `api`
- [ ] Framework: `Other`
- [ ] Environment Variables: 3 configuradas

### **✅ APÓS DEPLOY:**
- [ ] Build: Sucesso (sem erros)
- [ ] Functions: Criadas automaticamente
- [ ] URL: Respondendo
- [ ] Health: `/api/health` funcionando

---

## 💡 DICA IMPORTANTE

### **🎯 URL FINAL SERÁ:**

**Se projeto chamado**: `criminal-minds-game`
**URL**: `https://criminal-minds-game.vercel.app/api/health`

**Se projeto com nome diferente**: `criminal-minds-api`
**URL**: `https://criminal-minds-api.vercel.app/api/health`

**⚠️ Ajustar URL no `js/api-client.js` se necessário**

---

## 🚀 RESULTADO FINAL ESPERADO

### **✅ SISTEMA FUNCIONANDO:**
- **Frontend**: `https://thamiresfm.github.io/criminal-minds-game/`
- **API**: `https://criminal-minds-game.vercel.app/api/`
- **Database**: PostgreSQL Retool conectado
- **Deploy**: Automático via GitHub

### **🎉 TEMPO TOTAL:**
- **Configuração**: 5 minutos
- **Deploy**: 3 minutos  
- **Teste**: 2 minutos
- **Total**: < 10 minutos

---

**⚡ Execute o deploy seguindo exatamente estes passos e o sistema funcionará perfeitamente!**