import Link from 'next/link'

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
