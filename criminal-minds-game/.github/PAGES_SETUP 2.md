# 🚀 Configuração do GitHub Pages

Este projeto está configurado para usar GitHub Pages com fluxos de trabalho personalizados do GitHub Actions, seguindo a [documentação oficial do GitHub Pages](https://docs.github.com/pt/pages).

## 📋 Configuração Necessária

### 1. Ativar GitHub Pages no Repositório

1. Vá para **Settings** → **Pages** no seu repositório
2. Em **Source**, selecione **"GitHub Actions"**
3. Salve as configurações

### 2. Configurar Permissões (se necessário)

Se o deploy falhar por permissões:

1. Vá para **Settings** → **Actions** → **General**
2. Em **Workflow permissions**, selecione **"Read and write permissions"**
3. Marque **"Allow GitHub Actions to create and approve pull requests"**
4. Salve as configurações

### 3. Verificar Configurações de Ambiente

O projeto usa um ambiente chamado `github-pages`:

1. Vá para **Settings** → **Environments**
2. Clique em **github-pages**
3. Verifique se **"Deployment branches"** está configurado para **"Selected branches"** ou **"All branches"**

## 🔧 Como Funciona

### Fluxo de Trabalho Personalizado

O projeto usa um fluxo de trabalho personalizado (`.github/workflows/deploy.yml`) que:

1. **Build**: Compila o projeto Next.js com export estático
2. **Deploy**: Publica automaticamente no GitHub Pages

### Configurações Automáticas

O workflow usa `actions/configure-pages@v4` que automaticamente:

- Injeta o `basePath` na configuração do Next.js
- Desabilita otimização de imagem server-side  
- Configura URLs corretas para GitHub Pages

### Cache Inteligente

O workflow inclui cache para:
- Dependências npm (`package-lock.json`)
- Build cache do Next.js (`.next/cache`)

## 🌐 URLs do Site

- **Produção**: `https://thamiresfm.github.io/criminal-minds-game/`
- **Página do Jogo**: `https://thamiresfm.github.io/criminal-minds-game/game`

## 🐛 Solução de Problemas

### Build Falha

1. Verifique se o `next.config.js` está configurado para export estático
2. Confirme que não há rotas de API (não suportadas em export estático)
3. Verifique se as dependências estão corretas

### Deploy Falha por Permissões

1. Verifique as configurações de permissões (passo 2 acima)
2. Certifique-se de que GitHub Pages está ativado
3. Verifique se o branch `main` tem as alterações

### Site Não Carrega Corretamente

1. Verifique se o `basePath` está configurado corretamente
2. Confirme que os assets estão sendo gerados na pasta `out/`
3. Verifique se o arquivo `.nojekyll` foi criado

## 📚 Documentação de Referência

- [GitHub Pages Official Docs](https://docs.github.com/pt/pages)
- [Configurar fonte de publicação](https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Usar fluxos de trabalho personalizados](https://docs.github.com/pt/pages/getting-started-with-github-pages/using-custom-github-actions-workflows-with-github-pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

## ✅ Checklist de Deploy

- [ ] GitHub Pages ativado com source "GitHub Actions"
- [ ] Permissões de workflow configuradas
- [ ] Workflow executando sem erros
- [ ] Site acessível na URL de produção
- [ ] Todas as páginas carregando corretamente 