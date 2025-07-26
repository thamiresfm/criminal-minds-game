import { NextRequest, NextResponse } from 'next/server'

// Simulação de database em memória para testes
const gameAccusations = new Map<string, any[]>()
const gameData = new Map<string, any>()

// Dados simulados do jogo
const mockSuspects = [
  {
    id: 'produtor',
    name: 'Marcus Williams',
    role: 'Produtor',
    age: 45,
    isGuilty: true,
    description: 'Produtor experiente com problemas financeiros',
    motive: 'Conflitos financeiros com a vítima',
    alibi: 'Alega estar no escritório',
    suspicionLevel: 'critical'
  },
  {
    id: 'ator',
    name: 'Diego Santos',
    role: 'Ator Principal',
    age: 32,
    isGuilty: false,
    description: 'Ator talentoso e ambicioso',
    motive: 'Rivalidade profissional',
    alibi: 'Estava no camarim se preparando',
    suspicionLevel: 'high'
  },
  {
    id: 'diretora',
    name: 'Ana Silva',
    role: 'Diretora',
    age: 38,  
    isGuilty: false,
    description: 'Diretora perfeccionista',
    motive: 'Discordâncias criativas',
    alibi: 'Reunião com investidores',
    suspicionLevel: 'medium'
  }
]

/**
 * POST /api/game/[gameId]/accusation
 * Submete uma acusação no jogo
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params
    const body = await request.json()
    
    // Validação dos dados de entrada
    const { suspectId, reasoning, confidence, playerId } = body
    
    if (!suspectId) {
      return NextResponse.json(
        { error: 'Suspeito deve ser especificado', code: 'SUSPECT_REQUIRED' },
        { status: 400 }
      )
    }
    
    if (!playerId) {
      return NextResponse.json(
        { error: 'ID do jogador é obrigatório', code: 'PLAYER_ID_REQUIRED' },
        { status: 400 }
      )
    }
    
    if (confidence < 0 || confidence > 100) {
      return NextResponse.json(
        { error: 'Nível de confiança deve estar entre 0 e 100', code: 'INVALID_CONFIDENCE' },
        { status: 400 }
      )
    }
    
    // Verificar se o jogo existe
    if (!gameData.has(gameId)) {
      gameData.set(gameId, {
        id: gameId,
        status: 'active',
        suspects: mockSuspects,
        createdAt: new Date(),
        maxAccusations: 1
      })
    }
    
    const game = gameData.get(gameId)
    
    // Verificar se o jogador já fez uma acusação
    const existingAccusations = gameAccusations.get(gameId) || []
    const playerAccusation = existingAccusations.find(acc => acc.playerId === playerId)
    
    if (playerAccusation) {
      return NextResponse.json(
        { error: 'Jogador já fez uma acusação neste jogo', code: 'ACCUSATION_ALREADY_MADE' },
        { status: 409 }
      )
    }
    
    // Encontrar o suspeito
    const suspect = mockSuspects.find(s => s.id === suspectId)
    if (!suspect) {
      return NextResponse.json(
        { error: 'Suspeito não encontrado', code: 'SUSPECT_NOT_FOUND' },
        { status: 404 }
      )
    }
    
    // Criar a acusação
    const accusation = {
      id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      gameId,
      playerId,
      suspectId,
      suspectName: suspect.name,
      reasoning: reasoning || '',
      confidence,
      isCorrect: suspect.isGuilty,
      timestamp: new Date().toISOString(),
      processed: true
    }
    
    // Salvar a acusação
    if (!gameAccusations.has(gameId)) {
      gameAccusations.set(gameId, [])
    }
    gameAccusations.get(gameId)!.push(accusation)
    
    // Atualizar status do jogo se acusação estiver correta
    if (accusation.isCorrect) {
      game.status = 'completed'
      game.winner = playerId
      game.completedAt = new Date().toISOString()
    } else {
      game.status = 'failed'
      game.failedAt = new Date().toISOString()
    }
    
    // Resposta da API
    const response = {
      success: true,
      accusation: {
        id: accusation.id,
        suspectId: accusation.suspectId,
        suspectName: accusation.suspectName,
        isCorrect: accusation.isCorrect,
        confidence: accusation.confidence,
        reasoning: accusation.reasoning,
        timestamp: accusation.timestamp
      },
      gameResult: {
        status: game.status,
        isVictory: accusation.isCorrect,
        message: accusation.isCorrect 
          ? `Parabéns! Você identificou corretamente ${suspect.name} como o culpado!`
          : `${suspect.name} não era o culpado. Game Over!`
      }
    }
    
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json(response, { status: 201 })
    
  } catch (error) {
    console.error('Erro ao processar acusação:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor', 
        code: 'INTERNAL_SERVER_ERROR',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/game/[gameId]/accusation
 * Busca acusações de um jogo
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get('playerId')
    
    // Buscar acusações do jogo
    const accusations = gameAccusations.get(gameId) || []
    
    // Filtrar por jogador se especificado
    const filteredAccusations = playerId 
      ? accusations.filter(acc => acc.playerId === playerId)
      : accusations
    
    // Buscar dados do jogo
    const game = gameData.get(gameId)
    
    return NextResponse.json({
      success: true,
      accusations: filteredAccusations.map(acc => ({
        id: acc.id,
        playerId: acc.playerId,
        suspectId: acc.suspectId,
        suspectName: acc.suspectName,
        confidence: acc.confidence,
        reasoning: acc.reasoning,
        isCorrect: acc.isCorrect,
        timestamp: acc.timestamp
      })),
      game: game ? {
        id: game.id,
        status: game.status,
        maxAccusations: game.maxAccusations
      } : null,
      total: filteredAccusations.length
    })
    
  } catch (error) {
    console.error('Erro ao buscar acusações:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor', 
        code: 'INTERNAL_SERVER_ERROR' 
      },
      { status: 500 }
    )
  }
} 