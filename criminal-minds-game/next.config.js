/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 Configuração otimizada para GitHub Pages
  // BasePath para GitHub Pages (repo name)
  basePath: process.env.NODE_ENV === 'production' ? '/criminal-minds-game' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/criminal-minds-game/' : '',
  
  // Configurações para export estático
  trailingSlash: true,
  output: 'export',
  
  // Configuração de imagens para build estático
  images: {
    unoptimized: true, // Necessário para export estático
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Para imagens de placeholder
      },
    ],
  },

  // Configurações de compilação - desabilitada optimizeCss para evitar erro critters
  experimental: {
    // Desabilitado optimizeCss para corrigir erro do módulo 'critters'
    // optimizeCss: true,
  },

  // Configuração de webpack
  webpack: (config, { isServer }) => {
    // Fallbacks para o browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Otimizações para produção
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname, 'src'),
      };
    }

    return config;
  },

  // Removido rewrites - incompatível com output: export

  // Configurações específicas para GitHub Pages
  env: {
    GITHUB_PAGES: process.env.NODE_ENV === 'production' ? 'true' : 'false',
    BASE_PATH: process.env.NODE_ENV === 'production' ? '/criminal-minds-game' : '',
  },
};

module.exports = nextConfig; 