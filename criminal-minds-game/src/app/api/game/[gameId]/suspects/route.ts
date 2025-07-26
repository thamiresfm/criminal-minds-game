import { NextRequest, NextResponse } from 'next/server'

// Dados simulados dos suspeitos (compartilhados com a API de acusação)
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
    personality: 'Ambicioso e calculista',
    suspicionLevel: 'critical',
    evidence: [
      'Impressões digitais encontradas na arma',
      'Histórico de ameaças à vítima',
      'Beneficiário do seguro de vida'
    ]
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
    personality: 'Competitivo mas honesto',
    suspicionLevel: 'high',
    evidence: [
      'Discussão pública com a vítima',
      'Álibi confirmado por testemunhas',
      'Sem acesso à arma do crime'
    ]
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
    personality: 'Determinada e focada',
    suspicionLevel: 'medium',
    evidence: [
      'Reunião documentada',
      'Sem histórico de violência',
      'Relação profissional cordial'
    ]
  }
]

/**
 * GET /api/game/[gameId]/suspects
 * Busca lista de suspeitos do jogo
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params
    const { searchParams } = new URL(request.url)
    const includeEvidence = searchParams.get('includeEvidence') === 'true'
    const suspicionLevel = searchParams.get('suspicionLevel')
    
    // Validar gameId
    if (!gameId || gameId.length < 3) {
      return NextResponse.json(
        { error: 'ID do jogo inválido', code: 'INVALID_GAME_ID' },
        { status: 400 }
      )
    }
    
    let suspects = [...mockSuspects]
    
    // Filtrar por nível de suspeita se especificado
    if (suspicionLevel) {
      suspects = suspects.filter(suspect => suspect.suspicionLevel === suspicionLevel)
    }
    
    // Mapear suspeitos removendo informações sensíveis em produção
    const mappedSuspects = suspects.map(suspect => {
      const baseSuspect = {
        id: suspect.id,
        name: suspect.name,
        role: suspect.role,
        age: suspect.age,
        description: suspect.description,
        motive: suspect.motive,
        alibi: suspect.alibi,
        personality: suspect.personality,
        suspicionLevel: suspect.suspicionLevel
      }
      
      // Incluir evidências se solicitado
      if (includeEvidence) {
        return {
          ...baseSuspect,
          evidence: suspect.evidence
        }
      }
      
      // Nunca retornar isGuilty para o frontend (spoiler)
      return baseSuspect
    })
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 50))
    
    return NextResponse.json({
      success: true,
      suspects: mappedSuspects,
      gameId,
      total: mappedSuspects.length,
      metadata: {
        suspicionLevels: ['critical', 'high', 'medium', 'low'],
        totalSuspects: mockSuspects.length,
        includeEvidence
      }
    })
    
  } catch (error) {
    console.error('Erro ao buscar suspeitos:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor', 
        code: 'INTERNAL_SERVER_ERROR' 
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/game/[gameId]/suspects/[suspectId]
 * Busca detalhes de um suspeito específico
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params
    const body = await request.json()
    const { suspectId } = body
    
    if (!suspectId) {
      return NextResponse.json(
        { error: 'ID do suspeito é obrigatório', code: 'SUSPECT_ID_REQUIRED' },
        { status: 400 }
      )
    }
    
    // Buscar suspeito
    const suspect = mockSuspects.find(s => s.id === suspectId)
    
    if (!suspect) {
      return NextResponse.json(
        { error: 'Suspeito não encontrado', code: 'SUSPECT_NOT_FOUND' },
        { status: 404 }
      )
    }
    
    // Retornar detalhes completos (sem isGuilty)
    const suspectDetails = {
      id: suspect.id,
      name: suspect.name,
      role: suspect.role,
      age: suspect.age,
      description: suspect.description,
      motive: suspect.motive,
      alibi: suspect.alibi,
      personality: suspect.personality,
      suspicionLevel: suspect.suspicionLevel,
      evidence: suspect.evidence,
      gameId
    }
    
    return NextResponse.json({
      success: true,
      suspect: suspectDetails
    })
    
  } catch (error) {
    console.error('Erro ao buscar detalhes do suspeito:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor', 
        code: 'INTERNAL_SERVER_ERROR' 
      },
      { status: 500 }
    )
  }
} 