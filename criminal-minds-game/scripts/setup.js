#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎯 Configurando Criminal Minds Game...\n');

// ========================================
// 1. Criar arquivo .env.local
// ========================================

const envContent = `# ========================================
# CRIMINAL MINDS GAME - ENVIRONMENT VARIABLES
# ========================================

# Application
NEXT_PUBLIC_APP_NAME="Criminal Minds Game"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_WS_URL="ws://localhost:3001"

# Database (Para quando implementarmos o backend)
DATABASE_URL="postgresql://usuario:senha@localhost:5432/criminal_minds"

# Redis (Cache/Sessions - opcional para desenvolvimento)
REDIS_URL="redis://localhost:6379"

# JWT Secret (Para quando implementarmos autenticação)
JWT_SECRET="criminal-minds-super-secret-key-change-in-production"

# WebSocket
WEBSOCKET_PORT=3001

# Upload/Storage
NEXT_PUBLIC_UPLOAD_URL="/api/upload"
MAX_FILE_SIZE=5242880

# Game Configuration
NEXT_PUBLIC_MAX_PLAYERS=6
NEXT_PUBLIC_DEFAULT_GAME_TIME=1800
NEXT_PUBLIC_ENABLE_GUEST_MODE=true

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_HOTJAR_ID=""

# Development
NODE_ENV=development
`;

const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Arquivo .env.local criado');
} else {
  console.log('ℹ️  Arquivo .env.local já existe');
}

// ========================================
// 2. Criar estrutura de diretórios
// ========================================

const directories = [
  'src/app/api',
  'src/components/game',
  'src/lib/services',
  'src/lib/hooks',
  'public/images/cases',
  'public/images/suspects',
  'public/images/clues',
  'public/sounds',
  'docs',
  'tests/unit',
  'tests/integration',
  'tests/e2e',
];

directories.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Criado diretório: ${dir}`);
  }
});

// ========================================
// 3. Criar arquivos essenciais
// ========================================

// next-env.d.ts
const nextEnvContent = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;

const nextEnvPath = path.join(process.cwd(), 'next-env.d.ts');
if (!fs.existsSync(nextEnvPath)) {
  fs.writeFileSync(nextEnvPath, nextEnvContent);
  console.log('✅ Arquivo next-env.d.ts criado');
}

// .gitignore
const gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDEs
.vscode/
.idea/

# OS
Thumbs.db

# Logs
logs
*.log

# Database
/prisma/dev.db*
/prisma/migrations/

# Uploads
/public/uploads/

# Temporary files
/tmp/
`;

const gitignorePath = path.join(process.cwd(), '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  fs.writeFileSync(gitignorePath, gitignoreContent);
  console.log('✅ Arquivo .gitignore criado');
}

// postcss.config.js
const postcssContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

const postcssPath = path.join(process.cwd(), 'postcss.config.js');
if (!fs.existsSync(postcssPath)) {
  fs.writeFileSync(postcssPath, postcssContent);
  console.log('✅ Arquivo postcss.config.js criado');
}

// ========================================
// 4. Criar globals.css
// ========================================

const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* ========================================
   CRIMINAL MINDS GAME - GLOBAL STYLES
   ======================================== */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Fira+Code:wght@300;400;500&display=swap');

/* Base Styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: theme('colors.text.primary');
  background-color: theme('colors.bg.primary');
}

/* Remove focus outline for mouse users */
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: theme('colors.primary.100');
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: theme('colors.primary.400');
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: theme('colors.primary.500');
}

/* Custom selection */
::selection {
  background-color: theme('colors.accent.gold');
  color: theme('colors.primary.900');
}

/* Utilities */
.transition-smooth {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Loading Animation */
.loading-dots {
  display: inline-block;
}

.loading-dots::after {
  content: '';
  animation: loading-dots 1.5s infinite;
}

@keyframes loading-dots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}

/* Game-specific styles */
.theater-map {
  background-image: radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
}

.noir-gradient {
  background: linear-gradient(135deg, 
    theme('colors.primary.900') 0%, 
    theme('colors.primary.800') 50%, 
    theme('colors.primary.900') 100%
  );
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .bg-accent-gold {
    background-color: #000000;
    color: #ffffff;
  }
  
  .text-accent-gold {
    color: #000000;
  }
}

/* Dark mode support (future) */
@media (prefers-color-scheme: dark) {
  /* Will be implemented when dark mode is added */
}
`;

const globalsCssPath = path.join(process.cwd(), 'src/app/globals.css');
if (!fs.existsSync(globalsCssPath)) {
  fs.writeFileSync(globalsCssPath, globalsCssContent);
  console.log('✅ Arquivo globals.css criado');
}

// ========================================
// 5. Criar layout root
// ========================================

const layoutContent = `import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Criminal Minds Game',
  description: 'Jogo de investigação criminal online para até 6 jogadores',
  keywords: ['jogo', 'investigação', 'criminal', 'mistério', 'online', 'multiplayer'],
  authors: [{ name: 'Criminal Minds Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#d4af37',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={\`\${inter.variable} \${playfair.variable}\`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
`;

const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
if (!fs.existsSync(layoutPath)) {
  fs.writeFileSync(layoutPath, layoutContent);
  console.log('✅ Arquivo layout.tsx criado');
}

// ========================================
// 6. Criar página inicial
// ========================================

const pageContent = `import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-display font-bold text-accent-gold mb-4">
            🎯 Criminal Minds
          </h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            Desvende mistérios complexos trabalhando em equipe, coletando pistas e fazendo deduções colaborativas.
          </p>
          <p className="text-primary-400">
            Jogo de investigação criminal online para até 6 jogadores
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/login"
            className="inline-block bg-accent-gold text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-gold/90 transition-colors shadow-noir-lg"
          >
            Começar a Jogar
          </Link>
          
          <div className="text-sm text-primary-400">
            <p>Versão 1.0.0 • Desenvolvido com Next.js 14</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="bg-primary-800/50 p-6 rounded-xl border border-primary-700">
            <div className="text-3xl mb-3">🕵️</div>
            <h3 className="text-lg font-semibold text-primary-100 mb-2">Investigação</h3>
            <p className="text-primary-300 text-sm">Explore locais, colete pistas e desvende mistérios</p>
          </div>
          
          <div className="bg-primary-800/50 p-6 rounded-xl border border-primary-700">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-primary-100 mb-2">Colaboração</h3>
            <p className="text-primary-300 text-sm">Trabalhe em equipe para resolver casos complexos</p>
          </div>
          
          <div className="bg-primary-800/50 p-6 rounded-xl border border-primary-700">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="text-lg font-semibold text-primary-100 mb-2">Dedução</h3>
            <p className="text-primary-300 text-sm">Faça acusações baseadas nas evidências encontradas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
`;

const pagePath = path.join(process.cwd(), 'src/app/page.tsx');
if (!fs.existsSync(pagePath)) {
  fs.writeFileSync(pagePath, pageContent);
  console.log('✅ Arquivo page.tsx criado');
}

// ========================================
// CONCLUSÃO
// ========================================

console.log('\n🎉 Setup concluído com sucesso!\n');

console.log('📋 Próximos passos:');
console.log('1. npm run dev          # Iniciar servidor de desenvolvimento');
console.log('2. Abrir http://localhost:3000');
console.log('3. Navegar para /login para testar a autenticação');
console.log('4. Navegar para /lobby para ver o lobby do jogo\n');

console.log('🔧 Comandos disponíveis:');
console.log('npm run dev             # Desenvolvimento');
console.log('npm run build           # Build para produção');
console.log('npm run start           # Servidor de produção'); 
console.log('npm run lint            # Linter ESLint');
console.log('npm run type-check      # Verificação TypeScript\n');

console.log('📁 Estrutura criada:');
console.log('├── src/app/            # Páginas (Next.js 14 App Router)');
console.log('├── src/components/     # Componentes React');
console.log('├── src/lib/           # Stores, services e hooks');
console.log('├── src/types/         # Tipos TypeScript');
console.log('├── public/            # Assets estáticos');
console.log('└── tests/             # Testes unitários e E2E\n');

console.log('🎯 O Criminal Minds Game está pronto para desenvolvimento!');
console.log('🕵️‍♂️ Desvende o mistério. Trabalhe em equipe. Seja o melhor detetive!'); 