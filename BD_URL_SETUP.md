# 🔐 BD_URL - Configuração da Variável Secreta

Guia rápido para configurar a variável secreta `BD_URL` no GitHub para o Criminal Minds Game.

## 🎯 **O QUE É BD_URL?**

`BD_URL` é a string de conexão com o banco de dados MySQL que contém:
- Host do servidor MySQL
- Porta de conexão
- Nome do banco de dados
- Credenciais de acesso (usuário e senha)
- Opções de SSL e configuração

## 🔧 **CONFIGURAÇÃO NO GITHUB**

### **1. Acessar GitHub Secrets:**
```
1. Vá para seu repositório no GitHub
2. Clique em "Settings" (Configurações)
3. Menu lateral: "Secrets and variables"
4. Clique em "Actions"
5. Clique em "New repository secret"
```

### **2. Criar a Variável:**
```
Nome: BD_URL
Valor: sua_string_de_conexao_mysql
```

### **3. Formato da String de Conexão:**

#### **🌟 PlanetScale (Recomendado - Gratuito):**
```
mysql://username:password@aws.connect.psdb.cloud/criminal-minds-game?sslaccept=strict
```

#### **🚂 Railway:**
```
mysql://root:password@containers-us-west-x.railway.app:3306/railway
```

#### **💻 Local (Para Desenvolvimento):**
```
mysql://root:password@localhost:3306/criminal_minds_game
```

## 📋 **EXEMPLO COMPLETO**

### **Exemplo Real PlanetScale:**
```
BD_URL = mysql://abc123xyz:pscale_pw_ABC123XYZ@aws.connect.psdb.cloud/criminal-minds-game?sslaccept=strict
```

### **Componentes da String:**
- **Usuário**: `abc123xyz`
- **Senha**: `pscale_pw_ABC123XYZ`
- **Host**: `aws.connect.psdb.cloud`
- **Database**: `criminal-minds-game`
- **SSL**: `sslaccept=strict`

## ✅ **VERIFICAÇÃO**

### **1. Após Configurar BD_URL:**
```bash
1. Faça um commit e push para gh-pages
2. Vá para Actions tab no GitHub
3. Verifique o workflow "🗄️ Deploy with MySQL Database"
4. Procure por "✅ Variáveis de ambiente configuradas"
```

### **2. Logs de Sucesso:**
```
✅ Variáveis de ambiente configuradas
✅ Cliente Prisma gerado com sucesso
✅ Migrações verificadas
✅ Deploy concluído com sucesso!
```

### **3. Logs de Erro (BD_URL não configurada):**
```
❌ ERRO: Variável secreta BD_URL não encontrada!
Configure a variável secreta no GitHub: Settings → Secrets and variables → Actions
```

## 🔒 **SEGURANÇA**

### **✅ PRÁTICAS SEGURAS:**
- ✅ Use SEMPRE GitHub Secrets para dados sensíveis
- ✅ NUNCA commite credenciais no código
- ✅ Use conexões SSL quando possível
- ✅ Gere senhas fortes e únicas
- ✅ Mantenha backup das credenciais em local seguro

### **❌ NÃO FAÇA:**
- ❌ Não coloque BD_URL em arquivos públicos
- ❌ Não compartilhe credenciais em chat/email
- ❌ Não use senhas fracas ou óbvias
- ❌ Não reutilize credenciais de outros projetos

## 🎯 **PROVIDERS RECOMENDADOS**

### **🥇 PlanetScale (Gratuito):**
- ✅ 10GB grátis
- ✅ SSL automático
- ✅ Backups automáticos
- ✅ Scaling automático
- 🌐 https://planetscale.com/

### **🥈 Railway (Gratuito com limitações):**
- ✅ $5 de créditos mensais
- ✅ Deploy fácil
- ✅ SSL automático
- 🌐 https://railway.app/

### **🥉 MySQL Local (Desenvolvimento):**
```bash
# Docker MySQL
docker run -d \
  --name criminal-minds-mysql \
  -e MYSQL_ROOT_PASSWORD=criminal123 \
  -e MYSQL_DATABASE=criminal_minds_game \
  -p 3306:3306 \
  mysql:8.0
```

## 🛠️ **COMANDOS ÚTEIS**

### **Testar Conexão Local:**
```bash
# Configurar .env local
echo "BD_URL=mysql://root:password@localhost:3306/criminal_minds_game" > .env

# Testar conexão
npm run db:health

# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate
```

### **Prisma Commands:**
```bash
# Ver status do banco
npx prisma migrate status

# Visualizar dados
npx prisma studio

# Reset completo (CUIDADO!)
npx prisma migrate reset
```

## ❓ **TROUBLESHOOTING**

### **Erro: "BD_URL not found"**
```
✅ SOLUÇÃO:
1. Verificar se variável BD_URL existe no GitHub Secrets
2. Nome deve ser exatamente "BD_URL" (maiúsculo)
3. Re-executar workflow após configurar
```

### **Erro: "Connection refused"**
```
✅ SOLUÇÃO:
1. Verificar se host e porta estão corretos
2. Confirmar se banco está online
3. Testar conexão manual: mysql -h host -u user -p
```

### **Erro: "Access denied"**
```
✅ SOLUÇÃO:
1. Verificar usuário e senha
2. Confirmar permissões do usuário no banco
3. Testar credenciais em client MySQL
```

### **Erro: "Database not found"**
```
✅ SOLUÇÃO:
1. Criar database no servidor MySQL
2. Verificar nome do database na BD_URL
3. Executar: CREATE DATABASE criminal_minds_game;
```

## 🎉 **RESULTADO ESPERADO**

Após configurar corretamente a `BD_URL`:

✅ **GitHub Actions executa sem erros**  
✅ **Prisma se conecta ao banco**  
✅ **Migrações são aplicadas automaticamente**  
✅ **Site funciona com dados persistentes**  
✅ **Sistema MySQL + Retool operacional**  

---

## 📞 **SUPORTE**

**📚 Documentação Completa**: `MYSQL-RETOOL-SETUP.md`  
**🔧 Configuração Prisma**: `prisma/schema.prisma`  
**⚙️ Scripts NPM**: `npm run db:help`  

---

## 🎮 **CRIMINAL MINDS GAME - MYSQL READY!**

**🔐 Configure a BD_URL e tenha um jogo com dados persistentes profissionais!**