// ========================================
// CRIMINAL MINDS GAME - CASE TEMPLATES
// ========================================

import { CaseTemplate } from '@/types/dynamicGame';

export const theaterCaseTemplate: CaseTemplate = {
  id: 'teatro_001',
  title: 'O Homicídio no Teatro Royal',
  description: 'Um crime chocante durante a estreia da peça "Hamlet" deixa toda a companhia sob suspeita.',
  setting: 'Teatro Royal - Uma prestigiosa casa de espetáculos no centro da cidade',
  victimName: 'Helena Monteiro',
  victimDescription: 'Atriz principal da peça, 32 anos, conhecida por seu talento e temperamento difícil',
  
  suspects: [
    {
      id: 'diretor',
      name: 'Ricardo Almeida',
      role: 'Diretor da Peça',
      motives: ['controle artístico', 'pressão financeira', 'relacionamento conturbado'],
      description: 'Diretor experiente e perfeccionista, conhecido por suas exigências extremas',
      avatar: '🎭',
      alibi: 'Estava nos bastidores coordenando a produção',
      personality: 'Autoritário, perfeccionista, pode ser explosivo sob pressão'
    },
    {
      id: 'produtor',
      name: 'Fernando Santos',
      role: 'Produtor Executivo',
      motives: ['problemas financeiros', 'seguro de vida', 'contratos lucrativos'],
      description: 'Empresário ambicioso que investiu tudo na produção',
      avatar: '💼',
      alibi: 'Estava na recepção conversando com investidores',
      personality: 'Calculista, obcecado por dinheiro, pragmático'
    },
    {
      id: 'ator_principal',
      name: 'Gabriel Torres',
      role: 'Ator Coadjuvante',
      motives: ['ciúmes profissionais', 'rejeição amorosa', 'desejo de protagonismo'],
      description: 'Jovem ator talentoso que sempre ficou na sombra de Helena',
      avatar: '🎪',
      alibi: 'Estava se preparando no camarim masculino',
      personality: 'Carismático, mas com ego ferido, emotivo'
    },
    {
      id: 'dublê',
      name: 'Marina Silva',
      role: 'Dublê e Coreógrafa',
      motives: ['rivalidade profissional', 'disputa por papel', 'inveja'],
      description: 'Especialista em acrobacias que sempre quis ser atriz principal',
      avatar: '🤸‍♀️',
      alibi: 'Estava testando equipamentos de segurança',
      personality: 'Determinada, competitiva, guarda rancor'
    },
    {
      id: 'tecnico',
      name: 'João Pereira',
      role: 'Técnico de Iluminação',
      motives: ['harassment não reportado', 'demissão iminente', 'vingança'],
      description: 'Funcionário de longa data com acesso a todas as áreas',
      avatar: '💡',
      alibi: 'Estava operando as luzes na cabine de controle',
      personality: 'Reservado, conhece todos os segredos, ressentido'
    },
    {
      id: 'assistente',
      name: 'Clara Mendes',
      role: 'Assistente de Produção',
      motives: ['chantagem descoberta', 'informações comprometedoras', 'desespero'],
      description: 'Jovem aspirante a atriz que trabalha nos bastidores',
      avatar: '📋',
      alibi: 'Estava organizando figurinos no depósito',
      personality: 'Ambiciosa, observadora, manipuladora quando necessário'
    }
  ],

  cluePool: [
    // Pistas do Diretor
    {
      id: 'roteiro_anotado',
      name: 'Roteiro com Anotações Raivosas',
      description: 'Roteiro da peça com anotações agressivas sobre Helena, incluindo "ela vai pagar por isso"',
      linkedSuspect: 'diretor',
      location: 'camarim_diretor',
      importance: 'critical',
      isTrue: true,
      interrogationHint: 'O diretor fica nervoso quando questionado sobre suas anotações'
    },
    {
      id: 'email_ameaca',
      name: 'E-mail de Ameaça',
      description: 'E-mail enviado para Helena na véspera: "Sua arrogância vai ser sua perdição"',
      linkedSuspect: 'diretor',
      location: 'escritorio',
      importance: 'high',
      isTrue: true
    },
    
    // Pistas do Produtor
    {
      id: 'apolice_seguro',
      name: 'Apólice de Seguro',
      description: 'Seguro de vida da Helena no valor de R$ 2 milhões, contratado recentemente',
      linkedSuspect: 'produtor',
      location: 'escritorio',
      importance: 'critical',
      isTrue: true,
      interrogationHint: 'Produtor justifica como precaução normal da indústria'
    },
    {
      id: 'dividas_banco',
      name: 'Documentos Bancários',
      description: 'Comprovantes de dívidas enormes e investidores cobrando retorno',
      linkedSuspect: 'produtor',
      location: 'escritorio',
      importance: 'high',
      isTrue: true
    },
    
    // Pistas do Ator Principal
    {
      id: 'carta_amor',
      name: 'Carta de Amor Rejeitada',
      description: 'Carta apaixonada escrita para Helena, devolvida com comentários cruéis',
      linkedSuspect: 'ator_principal',
      location: 'camarim_masculino',
      importance: 'medium',
      isTrue: true
    },
    {
      id: 'remedio_ansiedade',
      name: 'Frasco de Ansiolíticos',
      description: 'Medicamento forte para ansiedade, com várias cápsulas faltando',
      linkedSuspect: 'ator_principal',
      location: 'camarim_masculino',
      importance: 'high',
      isTrue: true,
      interrogationHint: 'Ator admite estar sob muita pressão emocional'
    },
    
    // Pistas da Dublê
    {
      id: 'corda_sabotada',
      name: 'Corda de Segurança Sabotada',
      description: 'Corda usada na cena final foi intencionalmente enfraquecida',
      linkedSuspect: 'dublê',
      location: 'palco',
      importance: 'critical',
      isTrue: true
    },
    {
      id: 'ferramentas_especiais',
      name: 'Ferramentas de Sabotagem',
      description: 'Kit de ferramentas usado para enfraquecer equipamentos de segurança',
      linkedSuspect: 'dublê',
      location: 'deposito_equipamentos',
      importance: 'high',
      isTrue: true
    },
    
    // Pistas do Técnico
    {
      id: 'sistema_luzes',
      name: 'Sistema de Luzes Alterado',
      description: 'Programação das luzes foi modificada para criar momento de escuridão total',
      linkedSuspect: 'tecnico',
      location: 'cabine_controle',
      importance: 'critical',
      isTrue: true
    },
    {
      id: 'reclamacao_rh',
      name: 'Processo Trabalhista',
      description: 'Documentos de processo por assédio moral, com Helena como testemunha principal',
      linkedSuspect: 'tecnico',
      location: 'escritorio',
      importance: 'high',
      isTrue: true
    },
    
    // Pistas da Assistente
    {
      id: 'gravacao_celular',
      name: 'Gravação Comprometedora',
      description: 'Áudio de Helena revelando segredos da produção que poderiam arruinar carreiras',
      linkedSuspect: 'assistente',
      location: 'camarim_helena',
      importance: 'critical',
      isTrue: true
    },
    {
      id: 'contrato_falsificado',
      name: 'Contrato Falsificado',
      description: 'Tentativa de alterar contratos para benefício próprio, descoberta por Helena',
      linkedSuspect: 'assistente',
      location: 'escritorio',
      importance: 'high',
      isTrue: true
    },
    
    // Pistas Falsas para Confundir
    {
      id: 'bilhete_fã',
      name: 'Bilhete de Fã Obcecado',
      description: 'Carta de admirador obsessivo ameaçando Helena por não responder',
      linkedSuspect: 'nenhum',
      location: 'camarim_helena',
      importance: 'medium',
      isTrue: false
    },
    {
      id: 'remedio_falso',
      name: 'Medicamento Vencido',
      description: 'Frasco de remédio vencido encontrado no lixo, irrelevante para o caso',
      linkedSuspect: 'nenhum',
      location: 'banheiro',
      importance: 'low',
      isTrue: false
    },
    {
      id: 'chave_perdida',
      name: 'Chave sem Função',
      description: 'Chave antiga que não abre nenhuma fechadura atual do teatro',
      linkedSuspect: 'nenhum',
      location: 'corredor',
      importance: 'low',
      isTrue: false
    }
  ],

  locations: [
    {
      id: 'palco',
      name: 'Palco Principal',
      description: 'Local onde Helena foi encontrada. Cenário da cena final de Hamlet ainda montado.',
      clueIds: ['corda_sabotada'],
      suspectIds: ['diretor', 'dublê'],
      explored: false,
      coordinates: { x: 400, y: 300 }
    },
    {
      id: 'camarim_helena',
      name: 'Camarim da Helena',
      description: 'Camarim particular da vítima, ainda com seus pertences pessoais.',
      clueIds: ['gravacao_celular', 'bilhete_fã'],
      suspectIds: ['assistente'],
      explored: false,
      coordinates: { x: 100, y: 150 }
    },
    {
      id: 'camarim_masculino',
      name: 'Camarim Masculino',
      description: 'Camarim compartilhado pelos atores homens da peça.',
      clueIds: ['carta_amor', 'remedio_ansiedade'],
      suspectIds: ['ator_principal'],
      explored: false,
      coordinates: { x: 700, y: 150 }
    },
    {
      id: 'escritorio',
      name: 'Escritório da Produção',
      description: 'Local onde são guardados contratos, documentos financeiros e planos da produção.',
      clueIds: ['apolice_seguro', 'dividas_banco', 'reclamacao_rh', 'contrato_falsificado'],
      suspectIds: ['produtor'],
      explored: false,
      coordinates: { x: 700, y: 450 }
    },
    {
      id: 'cabine_controle',
      name: 'Cabine de Controle',
      description: 'Centro de operações técnicas com controles de som, luz e efeitos especiais.',
      clueIds: ['sistema_luzes'],
      suspectIds: ['tecnico'],
      explored: false,
      coordinates: { x: 400, y: 100 }
    },
    {
      id: 'deposito_equipamentos',
      name: 'Depósito de Equipamentos',
      description: 'Área de armazenamento de cenários, figurinos e equipamentos técnicos.',
      clueIds: ['ferramentas_especiais'],
      suspectIds: ['dublê', 'assistente'],
      explored: false,
      coordinates: { x: 100, y: 450 }
    }
  ],

  minClues: 4,
  maxClues: 8,
  minFalseClues: 1,
  maxFalseClues: 3
};

// Pool de casos disponíveis
export const availableCases: CaseTemplate[] = [
  theaterCaseTemplate
  // Outros casos podem ser adicionados aqui
];

// Função para buscar template por ID
export function getCaseTemplate(caseId: string): CaseTemplate | null {
  return availableCases.find(template => template.id === caseId) || null;
} 