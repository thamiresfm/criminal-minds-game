# 🚀 COMO EXECUTAR O CRIMINAL MINDS GAME

## 📋 **Métodos de Execução**

### **🎯 Método 1: Script Bash (Recomendado para Mac/Linux)**
```bash
./run_project.sh
```

### **🎯 Método 2: Script Node.js (Funciona em qualquer sistema)**
```bash
node run_project.js
```

### **🎯 Método 3: Manual (Tradicional)**
```bash
cd criminal-minds-game
npm install
npm run dev
```

## ⚙️ **O que os Scripts Fazem Automaticamente**

### **✅ Verificações:**
- Verifica se Node.js e npm estão instalados
- Confirma que está no diretório correto
- Verifica se package.json existe

### **🔧 Preparação:**
- Mata processes existentes na porta 3000
- Instala dependências automaticamente (se necessário)
- Limpa cache do Next.js
- Navega para o diretório correto

### **🚀 Execução:**
- Executa `npm run dev` automaticamente
- Mostra informações do projeto
- Lista recursos implementados
- Fornece URL de acesso (http://localhost:3000)

## 📊 **Recursos Disponíveis no Jogo**

- ✅ **Sistema de Autenticação** completo
- ✅ **Lobby e Sistema de Pesquisa** avançado
- ✅ **Mapa de Investigação** interativo
- ✅ **Sistema de Chat** em tempo real
- ✅ **Análise de Evidências** dinâmica
- ✅ **Sistema de Configurações** (7 categorias)
- ✅ **Sistema de Notificações** global
- ✅ **Lógica de Jogo Dinâmico** 🆕

## 🎮 **URLs de Acesso**

Após executar qualquer script, acesse:

- **🏠 Home:** http://localhost:3000
- **🔐 Login:** http://localhost:3000/login
- **🏛️ Lobby:** http://localhost:3000/lobby
- **🔍 Investigação:** http://localhost:3000/game/[gameId]/investigation
- **⚙️ Configurações:** http://localhost:3000/settings
- **🎲 Jogo Dinâmico:** http://localhost:3000/dynamic-game

## 🛑 **Como Parar o Servidor**

Pressione `Ctrl + C` no terminal onde o script está rodando.

## ❓ **Solução de Problemas**

### **Erro: "npm run dev não encontrado"**
```bash
cd criminal-minds-game
npm install
```

### **Erro: "Porta 3000 em uso"**
Os scripts automaticamente matam processos na porta 3000.

### **Erro: "Node.js não instalado"**
Instale Node.js: https://nodejs.org/

## 🎯 **Execução Rápida**

**Um comando para rodar tudo:**
```bash
./run_project.sh
```

**Ou:**
```bash
node run_project.js
```

**Pronto! O Criminal Minds Game estará rodando em http://localhost:3000** 🎮✨ 