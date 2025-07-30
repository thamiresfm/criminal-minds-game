// generateStaticParams para permitir export estático das páginas dinâmicas
export async function generateStaticParams() {
  // Gerar parâmetros para as páginas estáticas
  // Para um jogo, normalmente teríamos IDs de jogos específicos
  // Por enquanto, vamos usar alguns IDs padrão para permitir build estático
  return [
    { gameId: 'demo' },
    { gameId: 'investigation-1' },
    { gameId: 'investigation-2' },
    { gameId: 'investigation-3' },
    { gameId: 'lobby-game' },
    { gameId: 'default' }
  ];
}

export default function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { gameId: string };
}) {
  return <>{children}</>;
}