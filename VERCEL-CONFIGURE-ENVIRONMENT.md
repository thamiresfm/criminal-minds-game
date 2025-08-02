# 🔧 VERCEL CONFIGURAR ENVIRONMENT VARIABLES

## ✅ DEPLOY BEM-SUCEDIDO!

**🎉 Status confirmado:**
- **API Ativa**: `https://criminal-minds-game-api.vercel.app` ✅
- **Deploy**: Completo em 29s ✅
- **Problema**: Database connection failed (faltam ENV vars)

---

## ⚙️ CONFIGURAR ENVIRONMENT VARIABLES

### **📋 PASSO 1: ACESSAR DASHBOARD**

1. **No Vercel Dashboard** onde você está
2. **Clique na aba**: **"Settings"** (ao lado de Deployment)
3. **No menu lateral**: **"Environment Variables"**

### **📋 PASSO 2: ADICIONAR VARIÁVEIS**

**Adicionar estas 3 variáveis:**

**1️⃣ BD_URL:**
```
Name: BD_URL
Value: postgresql://retool:npg_XgRpvi3F1TrU@ep-summer-dust-a6donxpr.us-west-2.retooldb.com/retool?sslmode=require
Environment: Production, Preview, Development (selecionar todos)
```

**2️⃣ JWT_SECRET:**
```
Name: JWT_SECRET
Value: criminal_minds_jwt_secret_2024
Environment: Production, Preview, Development (selecionar todos)
```

**3️⃣ NODE_ENV:**
```
Name: NODE_ENV
Value: production
Environment: Production, Preview, Development (selecionar todos)
```

### **📋 PASSO 3: REDEPLOY**

1. **Após adicionar as 3 variáveis**
2. **Voltar para aba**: **"Deployments"**
3. **Clique no menu** (3 pontos) do último deployment
4. **Clique**: **"Redeploy"**
5. **Aguardar**: 1-2 minutos

---

## 🧪 TESTE APÓS CONFIGURAÇÃO

### **✅ COMANDOS DE VERIFICAÇÃO:**

```bash
# Health check (deve retornar "healthy")
curl https://criminal-minds-game-api.vercel.app/api/health

# Registro de usuário
curl -X POST https://criminal-minds-game-api.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: https://thamiresfm.github.io" \
  -d '{
    "fullName": "Teste Vercel Final",
    "email": "teste.final@vercel.com",
    "detectiveName": "VercelFinal",
    "password": "123456"
  }'
```

### **✅ RESPOSTAS ESPERADAS:**

**Health Check:**
```json
{
  "success": true,
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-08-02T..."
}
```

**Registro:**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 1,
    "email": "teste.final@vercel.com",
    "fullName": "Teste Vercel Final",
    "detectiveName": "VercelFinal"
  },
  "token": "eyJhbGci..."
}
```

---

## 🎯 RESULTADO FINAL

### **✅ APÓS CONFIGURAÇÃO:**
- **API**: `https://criminal-minds-game-api.vercel.app/api/health` ✅
- **Database**: PostgreSQL conectado ✅
- **Auth**: Registro e login funcionando ✅
- **Frontend**: Pronto para conectar ✅

### **🌐 SISTEMA COMPLETO:**
- **Frontend**: `https://thamiresfm.github.io/criminal-minds-game/`
- **API**: `https://criminal-minds-game-api.vercel.app/api/`
- **Database**: PostgreSQL Retool
- **Status**: 100% Funcional ✅

---

## 📊 CHECKLIST FINAL

### **⚙️ CONFIGURAÇÕES VERCEL:**
- [ ] **Environment Variables**: BD_URL adicionada
- [ ] **Environment Variables**: JWT_SECRET adicionada
- [ ] **Environment Variables**: NODE_ENV adicionada
- [ ] **Redeploy**: Executado após variáveis
- [ ] **Teste**: Health check retorna "healthy"
- [ ] **Teste**: Registro funciona

### **🌐 FRONTEND UPDATE:**
- [ ] **URL API**: Já atualizada para vercel.app
- [ ] **Teste**: Frontend conecta com API
- [ ] **Teste**: Cadastro funciona no site

---

## 🎉 QUASE LÁ!

### **⚡ FALTA APENAS:**
1. **Configurar as 3 environment variables**
2. **Fazer redeploy**
3. **Testar endpoints**

### **🏆 RESULTADO:**
**Sistema 100% funcional em 5 minutos!**

**🚀 Execute as configurações das environment variables e o sistema estará completo!**