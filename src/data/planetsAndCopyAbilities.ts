import type { CopyAbilityId, PlanetId, RoutineBlock, StudyTrack } from '../types/study';

export interface PlanetInfo {
  id: PlanetId;
  name: string;
  kirbyWorldName: string;
  areaLabel: string;
  colorHex: string;
  accentBg: string;
  copyAbility: CopyAbilityId;
  requiredTheta: number; // Average theta needed for Warp Star flight unlock
  description: string;
}

export const PLANETS: PlanetInfo[] = [
  {
    id: 'termofluidos',
    name: 'Termodinâmica & Fluidos',
    kirbyWorldName: 'Planeta Pyrosphere & Ripple Star',
    areaLabel: 'Mecânica • Bloco I',
    colorHex: '#86EFAC',
    accentBg: '#ECFDF5',
    copyAbility: 'fire',
    requiredTheta: 1.5,
    description:
      'Ciclos Brayton e Rankine, Exergia, Navier-Stokes, Bernoulli Generalizada, Darcy-Weisbach, Bocais de Laval e Trocadores de Calor.',
  },
  {
    id: 'solidos-materiais',
    name: 'Sólidos, Dinâmica & Materiais',
    kirbyWorldName: 'Planeta Rock Star',
    areaLabel: 'Mecânica • Blocos I e II',
    colorHex: '#FFB7C5',
    accentBg: '#FFF0F3',
    copyAbility: 'hammer',
    requiredTheta: 1.5,
    description:
      'Círculo de Mohr 3D, von Mises, Tresca, Torção (Bredt), Dinâmica de Corpos Rígidos, Diagrama Fe-Fe₃C, Curvas TTT/CCT e Metalurgia da Soldagem.',
  },
  {
    id: 'maquinas-equipamentos',
    name: 'Vibrações, Bombas & Normas',
    kirbyWorldName: 'Planeta Mechanica',
    areaLabel: 'Mecânica • Blocos II e III',
    colorHex: '#86EFAC',
    accentBg: '#F0FDF4',
    copyAbility: 'bubble',
    requiredTheta: 1.5,
    description:
      'Vibrações 1/N GDL, Rotores de Jeffcott, Bombas Centrífugas (API 610, NPSH), Motores Otto/Diesel, Corrosão, ASME Sec. VIII, NR-13 e FMEA.',
  },
  {
    id: 'eletro-circuitos',
    name: 'Eletromagnetismo, Circuitos & Máquinas',
    kirbyWorldName: 'Planeta Sparkia',
    areaLabel: 'Elétrica • Bloco I',
    colorHex: '#93C5FD',
    accentBg: '#EFF6FF',
    copyAbility: 'spark',
    requiredTheta: 1.5,
    description:
      'Equações de Maxwell, Poynting, Efeito Pelicular, Thévenin, Fasores, Sistemas Trifásicos, Transformadores, MIT (Kloss) e Geradores Síncronos.',
  },
  {
    id: 'potencia-protecao',
    name: 'Sistemas de Potência & Segurança',
    kirbyWorldName: 'Planeta Halcandra Volt',
    areaLabel: 'Elétrica • Blocos I e II',
    colorHex: '#93C5FD',
    accentBg: '#F0F9FF',
    copyAbility: 'plasma',
    requiredTheta: 1.5,
    description:
      'Valores p.u., Componentes Simétricas de Fortescue, Curto-Circuito Assimétrico, Linhas (Ferranti/SIL), Aterramento TN/TT/IT, Relés ANSI, NBR 5410/NR-10 e Áreas Ex.',
  },
  {
    id: 'controle-eletronica-mat',
    name: 'Controle, Eletrônica de Potência & Mat.',
    kirbyWorldName: 'Laboratório Nova Popstar',
    areaLabel: 'Elétrica/Multi • Blocos II e III',
    colorHex: '#FDE047',
    accentBg: '#FEFCE8',
    copyAbility: 'doctor',
    requiredTheta: 1.5,
    description:
      'Tiristores e Conversores CC-CC (Buck/Boost), Espaço de Estados, Routh-Hurwitz, Bode, Nyquist, PID, Transformada de Laplace e EDOs.',
  },
  {
    id: 'basicos-interdisciplinar',
    name: 'Português & Inglês Técnico',
    kirbyWorldName: 'Estação Dream Land',
    areaLabel: 'Bloco Básico Eliminatório',
    colorHex: '#FFB7C5',
    accentBg: '#FFF5F7',
    copyAbility: 'scholar',
    requiredTheta: 1.5,
    description:
      'Português Cesgranrio/FGV (coesão, regência, crase, concordância) e Inglês Técnico (normas ASME/API/IEEE, referenciação e interpretação Oil & Gas).',
  },
];

export const COPY_ABILITIES: Record<
  CopyAbilityId,
  {
    name: string;
    kirbyForm: string;
    domain: string;
    badgeBg: string;
    description: string;
  }
> = {
  fire: {
    name: 'Fire Kirby',
    kirbyForm: 'Termociências & Ciclos Térmicos',
    domain: 'Termodinâmica, Rankine, Brayton e Transferência de Calor',
    badgeBg: '#FED7AA',
    description:
      'Desbloqueado ao atingir P(L) ≥ 0,95 em média nos microtópicos de Termodinâmica e Transferência de Calor.',
  },
  bubble: {
    name: 'Water / Bubble Kirby',
    kirbyForm: 'Fluidos & Turbomáquinas',
    domain: 'Navier-Stokes, Bocais de Laval, Bombas API 610 e NR-13',
    badgeBg: '#BFDBFE',
    description:
      'Desbloqueado ao atingir P(L) ≥ 0,95 nos microtópicos de Fluidos e Equipamentos Industriais.',
  },
  hammer: {
    name: 'Hammer Kirby',
    kirbyForm: 'Integridade Estrutural & Materiais',
    domain: 'Mohr, von Mises, Torção, Vibrações, Fe-C e Soldagem',
    badgeBg: '#FECDD3',
    description:
      'Desbloqueado ao dominar Sólidos, Vibrações, Ciência dos Materiais e Soldagem com P(L) ≥ 0,95.',
  },
  spark: {
    name: 'Spark Kirby',
    kirbyForm: 'Circuitos & Eletromecânica',
    domain: 'Maxwell, Fasores Trifásicos, Transformadores e Motores MIT/Síncronos',
    badgeBg: '#FEF08A',
    description:
      'Desbloqueado ao alcançar P(L) ≥ 0,95 em Eletromagnetismo, Circuitos e Máquinas Elétricas.',
  },
  plasma: {
    name: 'Plasma Kirby',
    kirbyForm: 'Sistemas de Potência & Proteção',
    domain: 'Fortescue, Curto Assimétrico, Linhas, Relés ANSI, NR-10 e Áreas Ex',
    badgeBg: '#DDD6FE',
    description:
      'Desbloqueado ao dominar SEP, Proteção e Segurança em Atmosferas Explosivas (P(L) ≥ 0,95).',
  },
  doctor: {
    name: 'Doctor Kirby',
    kirbyForm: 'Controle, Eletrônica & Métodos Matemáticos',
    domain: 'Buck/Boost, Bode, Nyquist, PID, Routh e Transformada de Laplace',
    badgeBg: '#BBF7D0',
    description:
      'Desbloqueado ao consolidar Eletrônica de Potência, Controle Clássico/Moderno e Matemática Superior.',
  },
  scholar: {
    name: 'Scholar Kirby',
    kirbyForm: 'Comunicação Técnica & Normas Bilíngues',
    domain: 'Português Eliminatório & Inglês Técnico Petrolífero',
    badgeBg: '#FDE68A',
    description:
      'Desbloqueado ao garantir maestria no Bloco Básico Eliminatório (≥ 95% de prontidão).',
  },
};

export const DAILY_ROUTINE_TEMPLATE: RoutineBlock[] = [
  {
    id: 'block-1-fsrs',
    order: 1,
    timeRange: '08:00 – 08:15',
    durationMinutes: 15,
    title: 'Flash-Review FSRS (Reativação Neural)',
    subtitle: 'Bloco Matutino — Parte A',
    phaseType: 'flash-fsrs',
    description:
      'Resolver 15 a 20 cartões agendados pelo algoritmo FSRS nos microtópicos com retenção projetada abaixo de 90%.',
    checklist: [
      'Abrir Auto-Revisão e filtrar cartões vencidos hoje',
      'Avaliar com honestidade (Again / Hard / Good / Easy) sem olhar a resposta antes',
      'Verificar atualização automática da Estabilidade S (dias)',
    ],
    targetActionView: 'auto-revisao',
  },
  {
    id: 'block-1-theory',
    order: 2,
    timeRange: '08:15 – 10:15',
    durationMinutes: 120,
    title: 'Teoria Densa, Deduções & Vídeo Focado',
    subtitle: 'Bloco Matutino — Parte B (90 min leitura + 30 min aula)',
    phaseType: 'theory-video',
    description:
      '90 minutos de leitura analítica no Compêndio do microtópico prioritário (deduzindo equações e manipulando laboratórios interativos) + 30 minutos de videoaula curada para destravar pontos de atrito.',
    checklist: [
      'Escolher o microtópico em Alerta/Crítico na Matriz Diagnóstica',
      'Ler as seções completas e testar parâmetros no Diagrama Interativo',
      'Assistir 1 vídeo curado (MIT OCW / LearnChemE / Efficient Engineer / UNIVESP) no player interno',
    ],
    targetActionView: 'biblioteca',
  },
  {
    id: 'break-morning-tomato',
    order: 3,
    timeRange: '10:15 – 10:30',
    durationMinutes: 15,
    title: 'Pausa Tomate Maximizador (Maxim Tomato)',
    subtitle: 'Recuperação Cognitiva Obrigatória',
    phaseType: 'break-tomato',
    description:
      'Desconexão total de telas por 15 minutos: hidratação, alongamento e descanso visual antes da bateria analítica.',
    checklist: [
      'Levantar da cadeira e beber água',
      'Descansar os olhos olhando para longe (regra 20-20-20)',
    ],
    targetActionView: 'rotina',
  },
  {
    id: 'block-2-drills',
    order: 4,
    timeRange: '10:30 – 11:45',
    durationMinutes: 75,
    title: 'Resolução Analítica Passo a Passo',
    subtitle: 'Bloco Matutino 2 — Prática Sem Consulta',
    phaseType: 'analytical-drills',
    description:
      'Resolver individualmente de 6 a 8 questões de cálculo ou julgamento normativo do mesmo tema estudado pela manhã, sem consultar o gabarito.',
    checklist: [
      'Anotar todas as passagens algébricas e checar unidades (SI / MPa / p.u.)',
      'Marcar quando acertou no chute para não distorcer o BKT',
    ],
    targetActionView: 'exercicios',
  },
  {
    id: 'block-2-reverse',
    order: 5,
    timeRange: '11:45 – 12:30',
    durationMinutes: 45,
    title: 'Engenharia Reversa do Erro',
    subtitle: 'Bloco Matutino 2 — Calibração BKT',
    phaseType: 'error-reverse',
    description:
      'Comparar suas deduções com o memorial analítico e classificar cada erro: Falha Conceitual, Deslize Algébrico/Unidade, Desconhecimento Normativo ou Pegadinha da Banca.',
    checklist: [
      'Classificar todos os desvios no módulo de Engenharia Reversa',
      'Revisar armadilhas da banca anotadas na questão',
    ],
    targetActionView: 'exercicios',
  },
  {
    id: 'break-lunch',
    order: 6,
    timeRange: '12:30 – 14:00',
    durationMinutes: 90,
    title: 'Almoço & Descompressão Neurológica',
    subtitle: 'Intervalo Meridiano',
    phaseType: 'lunch',
    description:
      '90 minutos para refeição equilibrada e descanso sem estudar, consolidando a memória declarativa da manhã.',
    checklist: ['Refeição sem telas de estudo', 'Breve caminhada ou descanso'],
    targetActionView: 'rotina',
  },
  {
    id: 'block-3-sprint',
    order: 7,
    timeRange: '14:00 – 16:00',
    durationMinutes: 120,
    title: 'Fixação Massiva & Velocidade Cronometrada',
    subtitle: 'Bloco Vespertino — Modo Banca Real (75 min prova + 45 min análise)',
    phaseType: 'timed-sprint',
    description:
      'Execução cronometrada em ritmo de prova: máximo 3 min/questão (Cesgranrio/FGV) ou 1 min 45 s/item (Cebraspe Certo/Errado), seguido de auditoria de Δθ.',
    checklist: [
      'Rodar bateria mista ou Batalha de Chefe cronometrada',
      'Praticar estratégia de deixar em branco itens incertos no modo Cebraspe (-1)',
      'Conferir variação de θ̂ na Matriz após o sprint',
    ],
    targetActionView: 'simulados',
  },
  {
    id: 'break-afternoon-tomato',
    order: 8,
    timeRange: '16:00 – 16:15',
    durationMinutes: 15,
    title: 'Pausa Tomate Maximizador 2',
    subtitle: 'Recuperação Visual',
    phaseType: 'break-tomato',
    description:
      'Pausa de 15 minutos antes do bloco final de idiomas e integração multidisciplinar.',
    checklist: ['Café/chá ou fruta', 'Alongar ombros e punhos'],
    targetActionView: 'rotina',
  },
  {
    id: 'block-4-basics',
    order: 9,
    timeRange: '16:15 – 17:15',
    durationMinutes: 60,
    title: 'Bloco Básico Eliminatório (PT / Inglês Técnico)',
    subtitle: 'Alternância Dias Ímpares (Português) vs. Pares (Inglês ASME/API)',
    phaseType: 'basics-pt-en',
    description:
      'Dias Ímpares: Língua Portuguesa Cesgranrio/FGV (coesão, regência, crase, concordância). Dias Pares: Inglês Técnico em normas ASME/API/IEEE e relatórios Oil & Gas.',
    checklist: [
      'Garantir > 70% de consistência no Bloco Básico (corte eliminatório é 50%)',
      'Explorar vocabulário técnico de engenharia em inglês',
    ],
    targetActionView: 'biblioteca',
  },
  {
    id: 'block-4-closing',
    order: 10,
    timeRange: '17:15 – 18:00',
    durationMinutes: 45,
    title: 'Integração Multidisciplinar & Fechamento Algorítmico',
    subtitle: '30 min questões integradoras + 15 min revisão da Matriz',
    phaseType: 'interdisciplinary-close',
    description:
      'Resolver questões híbridas (ex.: motocompressor acionado por inversor de frequência) e revisar as prioridades calculadas pelo algoritmo para amanhã.',
    checklist: [
      'Resolver 3 a 5 questões multidisciplinares (Mecânica + Elétrica)',
      'Inspecionar a Matriz de Aprendizagem e salvar plano de amanhã',
    ],
    targetActionView: 'matriz',
  },
];

export const TRACK_METADATA: Record<
  StudyTrack,
  {
    label: string;
    subtitle: string;
    badge: string;
    targetExams: string[];
  }
> = {
  integrado: {
    label: 'Integrado Mecânica + Elétrica',
    subtitle: 'Trilha completa UNIP + Equipamentos Petrobras (Mecânica & Elétrica)',
    badge: 'Modo Completo',
    targetExams: ['Petrobras Mecânica', 'Petrobras Elétrica', 'Transpetro', 'BNDES'],
  },
  mecanica: {
    label: 'Foco Petrobras Mecânica',
    subtitle: 'Eng. de Equipamentos Jr. — Mecânica + Básicos + Interdisciplinar',
    badge: 'Mecânica',
    targetExams: ['Petrobras Mecânica', 'Transpetro Mecânica', 'Marinha CP-CEM'],
  },
  eletrica: {
    label: 'Foco Petrobras Elétrica',
    subtitle: 'Eng. de Equipamentos Jr. — Elétrica + SEP + NR-10 + Básicos',
    badge: 'Elétrica',
    targetExams: ['Petrobras Elétrica', 'Transpetro Elétrica', 'Eletrobras', 'EPE'],
  },
  concursos_gerais: {
    label: 'Concursos Gerais de Engenharia',
    subtitle: 'Cesgranrio, Cebraspe, FGV, Vunesp, FCC (BNDES, EPE, Perito, Marinha)',
    badge: 'Multibancas',
    targetExams: ['Petrobras', 'BNDES', 'EPE (FGV)', 'Marinha', 'Perito / Vunesp'],
  },
};
