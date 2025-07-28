import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/10 via-transparent to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="text-center space-y-12 max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-yellow-500/10 backdrop-blur-sm rounded-full border border-yellow-500/20 mb-6">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-400">Jogo Online • Multiplayer</span>
            </div>
            
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-7xl md:text-8xl font-display font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 bg-clip-text text-transparent leading-tight">
                🎯 Criminal Minds
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Subtitle */}
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                Desvende mistérios complexos trabalhando em equipe, coletando pistas e fazendo deduções colaborativas
              </p>
              <p className="text-lg text-gray-400 font-medium">
                🕵️ Investigação Criminal Online • Até 6 Jogadores • Tempo Real
              </p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="space-y-8 animate-slide-up">
            <Link 
              href="/login"
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-yellow-500/25"
            >
              <span>🎮 Começar a Jogar</span>
              <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <span className="text-sm">→</span>
              </div>
            </Link>
            
            <div className="text-sm text-gray-500 space-y-1">
              <p className="font-medium">✨ Versão 1.0.0 • Desenvolvido com Next.js 14</p>
              <p>🚀 Deploy automático • 🔐 100% Seguro • 📱 Responsivo</p>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-16 animate-bounce-in">
            
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300">
                  🕵️
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  Investigação
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Explore locais misteriosos, colete pistas cruciais e desvende os segredos mais obscuros
                </p>
                <div className="flex items-center space-x-2 text-sm text-yellow-500 font-medium">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Sistema avançado de pistas</span>
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300">
                  👥
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Colaboração
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Trabalhe em equipe para resolver casos complexos com comunicação em tempo real
                </p>
                <div className="flex items-center space-x-2 text-sm text-blue-500 font-medium">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Chat integrado e sincronizado</span>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-red-500/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300">
                  ⚖️
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                  Dedução
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Faça acusações estratégicas baseadas nas evidências encontradas durante a investigação
                </p>
                <div className="flex items-center space-x-2 text-sm text-red-500 font-medium">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Sistema de pontuação inteligente</span>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Stats Section */}
          <div className="pt-16 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-yellow-500">6</div>
                <div className="text-sm text-gray-400">Jogadores Max</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-blue-500">∞</div>
                <div className="text-sm text-gray-400">Casos Únicos</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-green-500">24/7</div>
                <div className="text-sm text-gray-400">Online</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-purple-500">⚡</div>
                <div className="text-sm text-gray-400">Tempo Real</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
