/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para GitHub Pages - funcionará tanto com Actions quanto branch deploy
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  output: 'export',
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
    ],
  },
  // Headers removidos pois não funcionam com export estático
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig; 