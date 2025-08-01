# 🚀 VERCEL DEPLOYMENT - CRIMINAL MINDS API

## 📝 GUIA COMPLETO DE DEPLOY

### **🎯 PROBLEMA RESOLVIDO:**
- GitHub Pages é **servidor estático** (não roda Node.js)
- API precisa rodar em servidor dinâmico (Vercel/Railway/Heroku)
- **Solução**: Deploy da API no Vercel (GRATUITO) 

---

## 🛠️ **PASSOS PARA DEPLOY:**

### **1️⃣ INSTALAR VERCEL CLI:**
```bash
npm install -g vercel
```

### **2️⃣ FAZER LOGIN NO VERCEL:**
```bash
vercel login
```

### **3️⃣ DEPLOY DA API:**
```bash
cd /path/to/criminal-minds-game
vercel --prod
```

### **4️⃣ CONFIGURAR VARIÁVEL DE AMBIENTE:**
```bash
# No dashboard Vercel, adicionar:
BD_URL = "postgresql://retool:npg_XgRpvi3F1TrU@ep-summer-dust-a6donxpr.us-west-2.retooldb.com/retool?sslmode=require"
```

---

## 🔧 **CONFIGURAÇÃO AUTOMÁTICA:**

### **📁 Estrutura Criada:**
```
criminal-minds-game/
├── vercel.json          ← Configuração Vercel
├── api/
│   ├── package.json     ← Dependencies API
│   ├── index.js         ← Servidor Express
│   └── prisma/          ← Schema banco
└── js/api-client.js     ← Frontend (URL será atualizada)
```

### **⚡ vercel.json:**
```json
{
  "version": 2,
  "builds": [{"src": "api/index.js", "use": "@vercel/node"}],
  "routes": [{"src": "/api/(.*)", "dest": "/api/index.js"}],
  "env": {"BD_URL": "@bd_url"}
}
```

---

## ✅ **APÓS DEPLOY:**

### **🌐 URL GERADA:**
Vercel gerará uma URL como:
`https://criminal-minds-game-xyz123.vercel.app`

### **🔄 ATUALIZAR FRONTEND:**
```javascript
// js/api-client.js - linha 13
production: 'https://SUA_URL_VERCEL.vercel.app/api',
```

### **🧪 TESTAR:**
```bash
curl https://SUA_URL_VERCEL.vercel.app/api/health
# {"success":true,"status":"healthy"...}
```

---

## 🎯 **RESULTADO FINAL:**

### **💻 DESENVOLVIMENTO:**
- `localhost:3001` → Dados salvos localmente ✅

### **🌍 PRODUÇÃO:**  
- `https://thamiresfm.github.io/criminal-minds-game` → Dados salvos na nuvem ✅
- API rodando no Vercel
- Banco PostgreSQL Retool
- **100% GRATUITO**

---

## 🚨 **COMANDOS RÁPIDOS:**

```bash
# Deploy completo em 3 comandos:
vercel login
vercel --prod
# Copiar URL gerada e atualizar js/api-client.js
```

**🎮 CRIMINAL MINDS GAME - BACKEND PROFISSIONAL NA NUVEM!**