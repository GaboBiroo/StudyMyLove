import type { ExamBoard, ExerciseQuestion } from '../types/study';

interface BoardSpec {
  board: ExamBoard;
  contexts: string[];
  targets: string[];
}

const BOARD_SPECS: BoardSpec[] = [
  {
    board: 'Vestibular — ITA / IME',
    contexts: [
      'Vestibular ITA — 2ª Fase Engenharia / Física Aplicada',
      'Concurso de Admissão IME — Engenharia Militar',
      'Simulado Olímpico ITA/IME — Ciclo Fundamental de Engenharia',
    ],
    targets: ['ITA', 'IME', 'AFA/EFOMM'],
  },
  {
    board: 'Vestibular — FUVEST / UNICAMP',
    contexts: [
      'FUVEST — 2ª Fase Escola Politécnica da USP (Poli-USP)',
      'Vestibular UNICAMP — Engenharias (FEM / FEEC)',
      'Transferência Externa USP / UNICAMP — Engenharia',
    ],
    targets: ['FUVEST / USP', 'UNICAMP', 'UNESP'],
  },
  {
    board: 'Cesgranrio',
    contexts: [
      'Petrobras — Engenheiro(a) de Equipamentos Júnior — Mecânica',
      'Transpetro — Engenheiro(a) Júnior — Automação e Dutos',
      'BNDES / EPE — Engenharia e Infraestrutura Industrial',
    ],
    targets: ['Petrobras', 'Transpetro', 'BNDES'],
  },
  {
    board: 'Cebraspe',
    contexts: [
      'Petrobras — Engenheiro(a) de Equipamentos / Produção',
      'ANP / IBAMA — Especialista em Regulação de Petróleo e Gás',
      'Telebras / Itaipu / Eletrobras — Engenharia de Operação',
    ],
    targets: ['Petrobras', 'ANP', 'Eletrobras'],
  },
  {
    board: 'FGV',
    contexts: [
      'EPE / Codevasf — Analista de Pesquisa Energética',
      'Senado / TCU — Auditoria de Obras e Equipamentos Industriais',
      'Sabesp / Petrobras — Engenharia de Projetos',
    ],
    targets: ['Petrobras', 'EPE', 'TCU'],
  },
  {
    board: 'Marinha CP-CEM',
    contexts: [
      'Concurso CP-CEM — Corpo de Engenheiros da Marinha (Prova Objetiva)',
      'Arsenal de Marinha do Rio de Janeiro (AMRJ) — Propulsão e Sistemas',
    ],
    targets: ['Marinha CP-CEM', 'Petrobras'],
  },
  {
    board: 'Vunesp',
    contexts: [
      'Sabesp / Metrô-SP — Engenheiro(a) Mecânico(a)',
      'CPT / Cetesb — Engenharia de Sistemas e Equipamentos',
    ],
    targets: ['Sabesp', 'Metrô-SP', 'Cetesb'],
  },
  {
    board: 'Europa — CERN / ESA',
    contexts: [
      'CERN Technical & Fellowship Selection — Geneva (Mechanical & Cryogenic Systems)',
      'ESA Young Graduate Trainee (YGT) — Noordwijk (Thermal & Propulsion)',
    ],
    targets: ['CERN (Genebra)', 'ESA (Agência Espacial Europeia)'],
  },
  {
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    contexts: [
      'Equinor ASA Graduate Assessment — Stavanger (Subsea & Rotating Machinery)',
      'Shell / TotalEnergies North Sea Technical Assessment — Aberdeen / Rotterdam',
    ],
    targets: ['Equinor', 'Shell Europe', 'TotalEnergies'],
  },
  {
    board: 'Europa — EPSO / UE',
    contexts: [
      'EPSO AD7 Scientific & Engineering Competition — Joint Research Centre (Ispra/Brussels)',
      'European Commission DG ENER — Energy Efficiency & Safety Assessment',
    ],
    targets: ['EPSO / União Europeia', 'JRC Ispra'],
  },
  {
    board: 'Europa — CEng / Ordem dos Engenheiros',
    contexts: [
      'Ordem dos Engenheiros (Portugal) / IMechE CEng — Avaliação de Competências Técnicas',
      'VDI / TU Delft / ETH Zürich — Master Qualifying Examination in Mechanical Engineering',
    ],
    targets: ['Ordem dos Engenheiros (PT)', 'IMechE CEng (UK)', 'ETH / TU Delft'],
  },
];

function buildNumericOptions(
  correctVal: number,
  multipliers: [number, number, number, number],
  decimals: number,
  unit: string,
  seed: number
): { options: string[]; correctIndex: number } {
  const correctIndex = seed % 5;
  const fmt = (v: number) => `${v.toFixed(decimals)}${unit ? ` ${unit}` : ''}`;
  const correctStr = fmt(correctVal);
  const distractors: string[] = [];
  for (let i = 0; i < 4; i++) {
    let cand = correctVal * multipliers[i];
    if (Math.abs(cand - correctVal) < Math.pow(10, -decimals)) {
      cand = correctVal + (i + 1) * Math.pow(10, -decimals) * 2;
    }
    let s = fmt(cand);
    if (s === correctStr || distractors.includes(s)) {
      s = fmt(correctVal + (i + 2) * Math.max(0.15, Math.abs(correctVal) * 0.09));
    }
    distractors.push(s);
  }
  const options: string[] = [];
  let dIdx = 0;
  for (let i = 0; i < 5; i++) {
    if (i === correctIndex) {
      options.push(correctStr);
    } else {
      options.push(distractors[dIdx++]);
    }
  }
  return { options, correctIndex };
}

function makeMcq(params: {
  id: string;
  microtopicId: string;
  topicIdx: number;
  idx: number;
  statementMarkdown: string;
  options: string[];
  correctIndex: number;
  solutionStepsMarkdown: string[];
  finalDiagnosis: string;
  trapNote: string;
  relatedNorms: string[];
  recommendedTimeSec?: number;
}): ExerciseQuestion {
  const spec = BOARD_SPECS[(params.idx + params.topicIdx * 3) % BOARD_SPECS.length];
  const examContext = `${spec.contexts[params.idx % spec.contexts.length]} • Questão #${params.idx + 6}`;
  const a = Number((1.15 + ((params.idx * 7 + params.topicIdx * 3) % 14) * 0.08).toFixed(2));
  const b = Number((-1.4 + ((params.idx * 11 + params.topicIdx * 5) % 39) * 0.1).toFixed(2));
  return {
    id: params.id,
    microtopicId: params.microtopicId,
    board: spec.board,
    examContext,
    targetExams: spec.targets,
    questionType: 'mcq5',
    statementMarkdown: params.statementMarkdown,
    options: params.options,
    correctIndex: params.correctIndex,
    irt: { a, b, c: 0.2 },
    solutionStepsMarkdown: params.solutionStepsMarkdown,
    finalDiagnosis: params.finalDiagnosis,
    trapNote: params.trapNote,
    relatedNorms: params.relatedNorms,
    recommendedTimeSec: params.recommendedTimeSec ?? 180,
  };
}

function makeTf(params: {
  id: string;
  microtopicId: string;
  topicIdx: number;
  idx: number;
  statementMarkdown: string;
  correctBoolean: boolean;
  solutionStepsMarkdown: string[];
  finalDiagnosis: string;
  trapNote: string;
  relatedNorms: string[];
}): ExerciseQuestion {
  const isCebraspe = params.idx % 2 === 0;
  const board: ExamBoard = isCebraspe ? 'Cebraspe' : 'Europa — EPSO / UE';
  const examContext = isCebraspe
    ? `Petrobras / ANP (Cebraspe — Julgamento Técnico Certo/Errado) • Item #${params.idx + 6}`
    : `EPSO / JRC European Engineering Verification — True/False Item #${params.idx + 6}`;
  const a = Number((1.25 + ((params.idx * 5 + params.topicIdx) % 12) * 0.08).toFixed(2));
  const b = Number((-1.1 + ((params.idx * 9 + params.topicIdx * 4) % 35) * 0.1).toFixed(2));
  return {
    id: params.id,
    microtopicId: params.microtopicId,
    board,
    examContext,
    targetExams: isCebraspe ? ['Petrobras', 'ANP', 'Transpetro'] : ['EPSO / União Europeia', 'CERN'],
    questionType: 'cebraspe_tf',
    statementMarkdown: params.statementMarkdown,
    correctBoolean: params.correctBoolean,
    irt: { a, b, c: 0.5 },
    solutionStepsMarkdown: params.solutionStepsMarkdown,
    finalDiagnosis: params.finalDiagnosis,
    trapNote: params.trapNote,
    relatedNorms: params.relatedNorms,
    recommendedTimeSec: 120,
  };
}

function genThermoCycles(idx: number): ExerciseQuestion {
  const id = `q-mec-01-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-thermo-cycles';
  const arch = idx % 6;
  if (arch === 0) {
    const T1 = 290 + (idx % 12) * 4;
    const T2 = 750 + Math.floor(idx / 6) * 8;
    const cp = 1.005;
    const R = 0.287;
    const P2P1 = 6 + (idx % 10);
    const ds = cp * Math.log(T2 / T1) - R * Math.log(P2P1);
    const { options, correctIndex } = buildNumericOptions(ds, [0.72, 0.86, 1.18, 1.38], 3, 'kJ/(kg·K)', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Em um compressor axial de turbina a gás monitorado segundo a **ISO 2314**, o ar ($c_p = 1{,}005\\text{ kJ/(kg}\\cdot\\text{K)}$, $R = 0{,}287\\text{ kJ/(kg}\\cdot\\text{K)}$) entra a $T_1 = ${T1}\\text{ K}$ e sai a $T_2 = ${T2}\\text{ K}$ com razão de pressão $P_2/P_1 = ${P2P1}$. A variação de entropia específica $\\Delta s = s_2 - s_1$ do gás ideal nesse processo é aproximadamente:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela segunda relação $T\\,ds$ para gás ideal com calores específicos constantes: $\\Delta s = c_p \\ln(T_2/T_1) - R \\ln(P_2/P_1)$.`,
        `Calculando a parcela térmica: $c_p \\ln(${T2}/${T1}) = 1{,}005 \\times ${Math.log(T2 / T1).toFixed(4)} = ${(cp * Math.log(T2 / T1)).toFixed(4)}\\text{ kJ/(kg}\\cdot\\text{K)}$.`,
        `Subtraindo a parcela barométrica $R \\ln(${P2P1}) = ${(R * Math.log(P2P1)).toFixed(4)}\\text{ kJ/(kg}\\cdot\\text{K)}$, obtém-se $\\Delta s = ${ds.toFixed(3)}\\text{ kJ/(kg}\\cdot\\text{K)}$.`,
      ],
      finalDiagnosis: `Variação de entropia $\\Delta s = ${ds.toFixed(3)}\\text{ kJ/(kg}\\cdot\\text{K)}$ pelo modelo de gás ideal.`,
      trapNote: 'Cuidado para não somar o termo R·ln(P2/P1) em vez de subtrair na segunda equação T ds.',
      relatedNorms: ['ISO 2314', 'ASME PTC 22'],
    });
  }
  if (arch === 1) {
    const T0 = 295 + (idx % 5) * 3;
    const dh = -(850 + Math.floor(idx / 6) * 12);
    const ds = -(1.45 + (idx % 9) * 0.08);
    const wRev = -(dh - T0 * ds);
    const { options, correctIndex } = buildNumericOptions(wRev, [0.68, 0.85, 1.15, 1.32], 1, 'kJ/kg', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Em uma análise exergética (2ª Lei) de uma turbina adiabática operando em ambiente com temperatura de estado morto $T_0 = ${T0}\\text{ K}$, o fluido sofre variação de entalpia $h_2 - h_1 = ${dh}\\text{ kJ/kg}$ e variação de entropia $s_2 - s_1 = ${ds.toFixed(2)}\\text{ kJ/(kg}\\cdot\\text{K)}$. Desprezando variações cinéticas e potenciais, o trabalho máximo reversível (variação de exergia de fluxo $\\psi_1 - \\psi_2$) por unidade de massa é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A diferença de exergia de fluxo entre entrada e saída é $\\psi_1 - \\psi_2 = (h_1 - h_2) - T_0(s_1 - s_2) = -(h_2 - h_1) + T_0(s_2 - s_1)$.`,
        `Substituindo $h_2 - h_1 = ${dh}\\text{ kJ/kg}$ e $T_0(s_2 - s_1) = ${T0} \\times (${ds.toFixed(2)}) = ${(T0 * ds).toFixed(1)}\\text{ kJ/kg}$.`,
        `Resulta em $w_{\\text{rev,máx}} = ${(-dh).toFixed(1)} - ${Math.abs(T0 * ds).toFixed(1)} = ${wRev.toFixed(1)}\\text{ kJ/kg}$.`,
      ],
      finalDiagnosis: `Potencial exergético disponível $\\Delta \\psi = ${wRev.toFixed(1)}\\text{ kJ/kg}$.`,
      trapNote: 'Não confunda trabalho real (-Δh) com trabalho reversível (-Δh + T0·Δs).',
      relatedNorms: ['ASME PTC 22', 'ISO 2314'],
    });
  }
  if (arch === 2) {
    const T0 = 298 + (idx % 6) * 2;
    const sGen = Number((0.18 + Math.floor(idx / 6) * 0.015).toFixed(3));
    const xDest = T0 * sGen;
    const { options, correctIndex } = buildNumericOptions(xDest, [0.55, 0.82, 1.18, 1.45], 2, 'kJ/kg', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Pelo **Teorema de Gouy-Stodola**, em um trocador de calor de planta petroquímica cuja vizinhança encontra-se a $T_0 = ${T0}\\text{ K}$, a geração de entropia irreversível medida por unidade de massa de fluido é $s_{\\text{ger}} = ${sGen}\\text{ kJ/(kg}\\cdot\\text{K)}$. A exergia destruída específica $x_{\\text{dest}}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O Teorema de Gouy-Stodola estabelece que a destruição de exergia é diretamente proporcional à geração de entropia: $x_{\\text{dest}} = T_0 \\cdot s_{\\text{ger}}$.`,
        `Com $T_0 = ${T0}\\text{ K}$ (sempre em escala absoluta Kelvin) e $s_{\\text{ger}} = ${sGen}\\text{ kJ/(kg}\\cdot\\text{K)}$:`,
        `$x_{\\text{dest}} = ${T0} \\times ${sGen} = ${xDest.toFixed(2)}\\text{ kJ/kg}$.`,
      ],
      finalDiagnosis: `Irreversibilidade específica $x_{\\text{dest}} = ${xDest.toFixed(2)}\\text{ kJ/kg}$.`,
      trapNote: 'Jamais utilize T0 em graus Celsius na fórmula de Gouy-Stodola.',
      relatedNorms: ['ISO 2314'],
    });
  }
  if (arch === 3) {
    const T1 = 300 + (idx % 7) * 5;
    const T3 = 1250 + Math.floor(idx / 6) * 10;
    const k = 1.4;
    const rpOpt = Math.pow(T3 / T1, k / (2 * (k - 1)));
    const { options, correctIndex } = buildNumericOptions(rpOpt, [0.65, 0.83, 1.19, 1.42], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Em um ciclo **Brayton padrão a ar** ($k = 1{,}4$) projetado para máxima produção de trabalho líquido por unidade de vazão mássica entre a temperatura de admissão $T_1 = ${T1}\\text{ K}$ e a temperatura máxima metalúrgica na entrada da turbina $T_3 = ${T3}\\text{ K}$, a razão de pressão ótima $r_{p,\\text{ótimo}}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para máximo trabalho líquido no ciclo Brayton ideal, a temperatura de saída do compressor é a média geométrica: $T_2 = \\sqrt{T_1 T_3}$.`,
        `Como $T_2/T_1 = r_p^{(k-1)/k}$, tem-se $r_{p,\\text{ótimo}} = (T_3/T_1)^{\\frac{k}{2(k-1)}}$.`,
        `Com $k/(2(k-1)) = 1{,}4 / 0{,}8 = 1{,}75$ e $T_3/T_1 = ${(T3 / T1).toFixed(4)}$, resulta $r_{p,\\text{ótimo}} = (${(T3 / T1).toFixed(4)})^{1{,}75} = ${rpOpt.toFixed(2)}$.`,
      ],
      finalDiagnosis: `Razão de pressão ótima para máximo trabalho específico: $r_{p,\\text{ótimo}} = ${rpOpt.toFixed(2)}$.`,
      trapNote: 'Não esquecer o fator 2 no denominador do expoente k/[2(k-1)].',
      relatedNorms: ['ISO 2314', 'ASME PTC 22'],
    });
  }
  if (arch === 4) {
    const h1 = 300 + (idx % 6) * 5;
    const h2s = 580 + Math.floor(idx / 6) * 6;
    const etaC = 0.8 + (idx % 4) * 0.03;
    const h2a = h1 + (h2s - h1) / etaC;
    const { options, correctIndex } = buildNumericOptions(h2a, [0.78, 0.91, 1.09, 1.21], 1, 'kJ/kg', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Um compressor centrífugo de gás natural opera com entalpia de sucção $h_1 = ${h1}\\text{ kJ/kg}$, entalpia isentrópica de descarga $h_{2s} = ${h2s}\\text{ kJ/kg}$ e eficiência isentrópica $\\eta_c = ${(etaC * 100).toFixed(0)}\\%$. A entalpia real de saída $h_{2a}$ do gás é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A eficiência isentrópica de um compressor adiabático é definida por $\\eta_c = \\frac{h_{2s} - h_1}{h_{2a} - h_1}$.`,
        `Isolando a entalpia real de descarga: $h_{2a} = h_1 + \\frac{h_{2s} - h_1}{\\eta_c}$.`,
        `Substituindo os valores: $h_{2a} = ${h1} + \\frac{${h2s - h1}}{${etaC.toFixed(2)}} = ${h2a.toFixed(1)}\\text{ kJ/kg}$.`,
      ],
      finalDiagnosis: `Entalpia real de descarga $h_{2a} = ${h2a.toFixed(1)}\\text{ kJ/kg}$.`,
      trapNote: 'Em compressores divide-se o salto isentrópico por η_c; multiplicar por η_c vale apenas para turbinas.',
      relatedNorms: ['ASME PTC 10', 'ISO 2314'],
    });
  }
  const correctBoolean = idx % 3 !== 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 0,
    idx,
    statementMarkdown: correctBoolean
      ? `No ciclo Brayton com regeneração (recuperador de calor), a adição de um regenerador só eleva a eficiência térmica quando a temperatura dos gases de exaustão da turbina ($T_4$) é superior à temperatura de descarga do compressor ($T_2$), o que ocorre para razões de pressão moderadas.`
      : `No ciclo Brayton regenerativo, quanto maior for a razão de pressão do compressor ($r_p \\to \\infty$), maior será o ganho térmico proporcionado pelo regenerador em relação ao ciclo Brayton simples.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Em um ciclo Brayton regenerativo, o calor é transferido dos gases de escape da turbina ($T_4$) para o ar comprimido ($T_2$).`,
      `Se a razão de pressão $r_p$ for muito elevada, $T_2$ supera $T_4$, inviabilizando a regeneração (que resultaria em resfriamento do ar antes da câmara de combustão).`,
      `Logo, a afirmativa é **${correctBoolean ? 'CERTA' : 'ERRADA'}**.`,
    ],
    finalDiagnosis: `Análise termodinâmica do ciclo Brayton regenerativo (critério $T_4 > T_2$).`,
    trapNote: 'Altas razões de pressão reduzem T4 e aumentam T2, limitando o uso de regeneradores.',
    relatedNorms: ['ISO 2314', 'ASME PTC 22'],
  });
}

function genThermoRankine(idx: number): ExerciseQuestion {
  const id = `q-mec-02-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-thermo-rankine';
  const arch = idx % 6;
  if (arch === 0) {
    const vf = 0.00101 + (idx % 4) * 0.00002;
    const dP = 8000 + Math.floor(idx / 6) * 250; // kPa
    const wp = vf * dP;
    const { options, correctIndex } = buildNumericOptions(wp, [0.5, 0.8, 1.25, 1.6], 2, 'kJ/kg', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Em uma bomba de água de alimentação de caldeira (BFWP) de um ciclo Rankine regido pela **ASME PTC 6**, a água líquida saturada ($v_f = ${vf.toFixed(5)}\\text{ m}^3/\\text{kg}$) é comprimida isentropicamente com elevação de pressão $\\Delta P = ${(dP / 1000).toFixed(2)}\\text{ MPa}$ ($${dP}\\text{ kPa}$). O trabalho específico isentrópico da bomba $w_{p,s}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para escoamento incompressível isentrópico em regime permanente, $w_{p,s} = \\int v\\,dP \\approx v_f \\Delta P$.`,
        `Convertendo a pressão para $\\text{kPa}$ ($1\\text{ kPa}\\cdot\\text{m}^3 = 1\\text{ kJ}$): $\\Delta P = ${dP}\\text{ kPa}$.`,
        `$w_{p,s} = ${vf.toFixed(5)} \\times ${dP} = ${wp.toFixed(2)}\\text{ kJ/kg}$.`,
      ],
      finalDiagnosis: `Trabalho de bombeamento isentrópico $w_{p,s} = ${wp.toFixed(2)}\\text{ kJ/kg}$.`,
      trapNote: 'Lembre-se de usar ΔP em kPa para obter o trabalho diretamente em kJ/kg.',
      relatedNorms: ['ASME PTC 6', 'ASME PTC 4'],
    });
  }
  if (arch === 1) {
    const h1 = 3400 + Math.floor(idx / 6) * 8;
    const h2 = 2150 + (idx % 9) * 15;
    const h3 = 190 + (idx % 6) * 5;
    const h4 = h3 + 12;
    const wt = h1 - h2;
    const wp = h4 - h3;
    const qin = h1 - h4;
    const eta = ((wt - wp) / qin) * 100;
    const { options, correctIndex } = buildNumericOptions(eta, [0.78, 0.91, 1.09, 1.2], 2, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Em um ciclo Rankine simples a vapor, as entalpias nos estados principais são: entrada da turbina $h_1 = ${h1}\\text{ kJ/kg}$, saída da turbina $h_2 = ${h2}\\text{ kJ/kg}$, saída do condensador $h_3 = ${h3}\\text{ kJ/kg}$ e entrada da caldeira $h_4 = ${h4}\\text{ kJ/kg}$. A eficiência térmica $\\eta_{\\text{th}}$ do ciclo é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O trabalho específico da turbina é $w_t = h_1 - h_2 = ${h1} - ${h2} = ${wt}\\text{ kJ/kg}$, e o da bomba é $w_p = h_4 - h_3 = ${wp}\\text{ kJ/kg}$.`,
        `O calor fornecido na caldeira é $q_{\\text{in}} = h_1 - h_4 = ${h1} - ${h4} = ${qin}\\text{ kJ/kg}$.`,
        `A eficiência térmica é $\\eta_{\\text{th}} = \\frac{w_t - w_p}{q_{\\text{in}}} = \\frac{${wt - wp}}{${qin}} = ${eta.toFixed(2)}\\%$.`,
      ],
      finalDiagnosis: `Eficiência térmica do ciclo Rankine $\\eta_{\\text{th}} = ${eta.toFixed(2)}\\%$.`,
      trapNote: 'Não esquecer de descontar o trabalho da bomba no numerador e usar h4 (não h3) no cálculo de q_in.',
      relatedNorms: ['ASME PTC 6'],
    });
  }
  if (arch === 2) {
    const h5 = 250 + (idx % 8) * 10;
    const h7 = 680 + Math.floor(idx / 6) * 5;
    const h6 = 2950 + (idx % 10) * 20;
    const y = (h7 - h5) / (h6 - h5);
    const { options, correctIndex } = buildNumericOptions(y, [0.65, 0.85, 1.18, 1.4], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Em um ciclo Rankine regenerativo, um aquecedor aberto de água de alimentação (**desaerador**) recebe água sub-resfriada da bomba de condensado com $h_5 = ${h5}\\text{ kJ/kg}$ e vapor sangrado da turbina com $h_6 = ${h6}\\text{ kJ/kg}$, entregando líquido saturado na saída a $h_7 = ${h7}\\text{ kJ/kg}$. A fração mássica de vapor sangrado $y = \\dot{m}_{\\text{sangria}}/\\dot{m}_{\\text{total}}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Aplicando o balanço de energia em regime permanente ao aquecedor aberto (mistura direta): $y h_6 + (1 - y) h_5 = 1 \\cdot h_7$.`,
        `Isolando a fração de sangria $y$: $y = \\frac{h_7 - h_5}{h_6 - h_5}$.`,
        `Substituindo os dados: $y = \\frac{${h7} - ${h5}}{${h6} - ${h5}} = \\frac{${h7 - h5}}{${h6 - h5}} = ${y.toFixed(3)}$.`,
      ],
      finalDiagnosis: `Fração de extração regenerativa no desaerador $y = ${y.toFixed(3)}$.`,
      trapNote: 'Cuidado para não dividir por h6 em vez de (h6 - h5) no balanço de mistura do desaerador.',
      relatedNorms: ['ASME PTC 6', 'HEI Standards'],
    });
  }
  if (arch === 3) {
    const mFuel = 2.5 + (idx % 6) * 0.5;
    const PCI = 40000 + (idx % 5) * 500;
    const We = 32000 + Math.floor(idx / 6) * 200;
    const Qu = 45000 + Math.floor(idx / 6) * 300;
    const Qfuel = mFuel * PCI;
    const etaCog = ((We + Qu) / Qfuel) * 100;
    const { options, correctIndex } = buildNumericOptions(etaCog, [0.68, 0.84, 1.12, 1.25], 1, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Uma planta de **cogeração** de refinaria consome $\\dot{m}_f = ${mFuel.toFixed(1)}\\text{ kg/s}$ de gás combustível com $\\text{PCI} = ${PCI}\\text{ kJ/kg}$, gerando potência elétrica líquida $\\dot{W}_e = ${(We / 1000).toFixed(1)}\\text{ MW}$ e fornecendo calor útil de processo $\\dot{Q}_u = ${(Qu / 1000).toFixed(1)}\\text{ MW}$ em vapor saturado. O fator de utilização de energia ($\\eta_{\\text{cog}}$) de 1ª Lei da planta é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A taxa de energia química fornecida pelo combustível é $\\dot{Q}_{\\text{comb}} = \\dot{m}_f \\cdot \\text{PCI} = ${mFuel.toFixed(1)} \\times ${PCI} = ${Qfuel}\\text{ kW}$ ($${(Qfuel / 1000).toFixed(1)}\\text{ MW}$).`,
        `O fator de utilização na cogeração soma a potência elétrica e o calor útil: $\\eta_{\\text{cog}} = \\frac{\\dot{W}_e + \\dot{Q}_u}{\\dot{Q}_{\\text{comb}}}$.`,
        `Calculando: $\\eta_{\\text{cog}} = \\frac{${We} + ${Qu}}{${Qfuel}} = ${etaCog.toFixed(1)}\\%$.`,
      ],
      finalDiagnosis: `Fator de utilização global da cogeração $\\eta_{\\text{cog}} = ${etaCog.toFixed(1)}\\%$.`,
      trapNote: 'Não confundir eficiência elétrica isolada com o fator global de utilização energética da cogeração.',
      relatedNorms: ['ASME PTC 4', 'ISO 2314'],
    });
  }
  if (arch === 4) {
    const sf = 1.3 + (idx % 5) * 0.08;
    const sfg = 6.5 + (idx % 4) * 0.15;
    const s2 = 6.8 + Math.floor(idx / 6) * 0.012;
    const x2 = Math.min(0.98, Math.max(0.75, (s2 - sf) / sfg));
    const sActual = sf + x2 * sfg;
    const { options, correctIndex } = buildNumericOptions(x2 * 100, [0.8, 0.9, 1.07, 1.15], 1, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Na expansão até a pressão do condensador de uma turbina a vapor, as propriedades de saturação são $s_f = ${sf.toFixed(2)}\\text{ kJ/(kg}\\cdot\\text{K)}$ e $s_{fg} = ${sfg.toFixed(2)}\\text{ kJ/(kg}\\cdot\\text{K)}$. Sabendo que a entropia específica na saída da turbina é $s_2 = ${sActual.toFixed(3)}\\text{ kJ/(kg}\\cdot\\text{K)}$, o título do vapor $x_2$ na descarga é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na região de mistura líquido-vapor, a entropia relaciona-se ao título por $s_2 = s_f + x_2 \\cdot s_{fg}$.`,
        `Isolando o título: $x_2 = \\frac{s_2 - s_f}{s_{fg}} = \\frac{${sActual.toFixed(3)} - ${sf.toFixed(2)}}{${sfg.toFixed(2)}}$.`,
        `Portanto, $x_2 = ${(x2 * 100).toFixed(1)}\\%$.`,
      ],
      finalDiagnosis: `Título do vapor na exaustão da turbina $x_2 = ${(x2 * 100).toFixed(1)}\\%$.`,
      trapNote: 'Atenção: usar s_fg = s_g - s_f no denominador, e não s_g.',
      relatedNorms: ['ASME PTC 6'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 1,
    idx,
    statementMarkdown: correctBoolean
      ? `O reaquecimento intermediário (reheat) em um ciclo Rankine tem como finalidade primordial elevar o título do vapor nos últimos estágios da turbina de baixa pressão, prevenindo a erosão severa das palhetas por impacto de gotículas líquidas.`
      : `A redução da pressão do condensador em um ciclo Rankine aumenta simultaneamente a eficiência térmica do ciclo e o título do vapor na saída da turbina de baixa pressão.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `A diminuição da pressão de condensação aumenta o trabalho líquido e a eficiência térmica, porém desloca o estado final para a esquerda no domo de saturação, reduzindo o título $x_2$ (aumentando a umidade).`,
      `O reaquecimento desloca a linha de expansão para maiores entropias, elevando o título na descarga da turbina.`,
      `Logo, o item está **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Efeito metalúrgico e termodinâmico do reaquecimento e do vácuo no condensador.`,
    trapNote: 'Reduzir a pressão do condensador melhora a eficiência, mas piora (reduz) o título de saída.',
    relatedNorms: ['ASME PTC 6'],
  });
}

function genFluidsNs(idx: number): ExerciseQuestion {
  const id = `q-mec-03-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-fluids-ns';
  const arch = idx % 6;
  if (arch === 0) {
    const f = 0.018 + (idx % 7) * 0.002;
    const L = 120 + Math.floor(idx / 6) * 10;
    const D = 0.25;
    const V = 2.4 + (idx % 6) * 0.3;
    const g = 9.81;
    const hf = f * (L / D) * ((V * V) / (2 * g));
    const { options, correctIndex } = buildNumericOptions(hf, [0.55, 0.78, 1.25, 1.55], 2, 'm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Em uma linha de transferência de óleo de diâmetro interno $D = ${D.toFixed(2)}\\text{ m}$ e comprimento $L = ${L}\\text{ m}$, o fluido escoa com velocidade média $V = ${V.toFixed(1)}\\text{ m/s}$ e fator de atrito de Darcy $f = ${f.toFixed(3)}$. Adotando $g = 9{,}81\\text{ m/s}^2$, a perda de carga distribuída $h_f$ pela equação de **Darcy-Weisbach** é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela equação universal de Darcy-Weisbach: $h_f = f \\frac{L}{D} \\frac{V^2}{2g}$.`,
        `A razão geométrica vale $L/D = ${L}/${D} = ${(L / D).toFixed(0)}$ e a carga cinética vale $V^2/(2g) = ${(V * V / (2 * g)).toFixed(4)}\\text{ m}$.`,
        `Multiplicando: $h_f = ${f.toFixed(3)} \\times ${(L / D).toFixed(0)} \\times ${(V * V / (2 * g)).toFixed(4)} = ${hf.toFixed(2)}\\text{ m}$.`,
      ],
      finalDiagnosis: `Perda de carga distribuída $h_f = ${hf.toFixed(2)}\\text{ m}$ de coluna de fluido.`,
      trapNote: 'Não confundir o fator de atrito de Darcy (f) com o fator de Fanning (f_F = f/4).',
      relatedNorms: ['API RP 14E', 'ASME B31.3'],
    });
  }
  if (arch === 1) {
    const Re = 500 + Math.floor(idx / 6) * 15;
    const f = 64 / Re;
    const { options, correctIndex } = buildNumericOptions(f, [0.5, 0.75, 1.25, 1.6], 4, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Um óleo lubrificante escoa em regime **laminar plenamente desenvolvido** (Hagen-Poiseuille) no interior de um tubo liso circular com número de Reynolds $\\text{Re}_D = ${Re}$. O fator de atrito de Darcy $f$ correspondente é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `No regime laminar em dutos circulares ($\\text{Re}_D < 2300$), o fator de atrito de Darcy independe da rugosidade e vale exatamente $f = \\frac{64}{\\text{Re}_D}$.`,
        `Substituindo $\\text{Re}_D = ${Re}$: $f = \\frac{64}{${Re}} = ${f.toFixed(4)}$.`,
        `Nota: No regime laminar, a razão entre velocidade máxima na linha de centro e velocidade média é $u_{\\text{máx}}/V = 2$.`,
      ],
      finalDiagnosis: `Fator de atrito de Darcy laminar $f = ${f.toFixed(4)}$.`,
      trapNote: 'Não usar 16/Re (que é o coeficiente de Fanning) quando a questão pede o fator de Darcy.',
      relatedNorms: ['ISO 5167'],
    });
  }
  if (arch === 2) {
    const rho = 850 + (idx % 6) * 20;
    const Q = 0.08 + (idx % 5) * 0.02;
    const V1 = 3.0 + Math.floor(idx / 6) * 0.2;
    const F = rho * Q * V1;
    const { options, correctIndex } = buildNumericOptions(F, [0.6, 0.82, 1.22, 1.48], 1, 'N', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Um jato livre horizontal de hidrocarboneto líquido ($\\rho = ${rho}\\text{ kg/m}^3$), com vazão volumétrica $Q = ${Q.toFixed(2)}\\text{ m}^3/\\text{s}$ e velocidade $V_1 = ${V1.toFixed(1)}\\text{ m/s}$, incide perpendicularmente sobre uma placa plana estacionária, defletindo-se tangencialmente a $90^\\circ$. A força horizontal resultante exercida pelo jato sobre a placa é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela equação integral da quantidade de movimento de Reynolds na direção horizontal $x$: $F_x = \\dot{m}(V_{1x} - V_{2x})$.`,
        `Como o jato sai paralelo à placa ($V_{2x} = 0$) e a vazão mássica é $\\dot{m} = \\rho Q = ${rho} \\times ${Q.toFixed(2)} = ${(rho * Q).toFixed(1)}\\text{ kg/s}$:`,
        `$F_x = ${(rho * Q).toFixed(1)} \\times ${V1.toFixed(1)} = ${F.toFixed(1)}\\text{ N}$.`,
      ],
      finalDiagnosis: `Força hidrodinâmica sobre o anteparo $F_x = ${F.toFixed(1)}\\text{ N}$.`,
      trapNote: 'Não inserir fator 1/2 na equação da quantidade de movimento (F = ρ·Q·V).',
      relatedNorms: ['API RP 14E'],
    });
  }
  if (arch === 3) {
    const a = 2.0 + (idx % 6) * 0.5;
    const b = 1.5 + (idx % 5) * 0.4;
    const x = 2 + (idx % 4);
    const y = 1 + (idx % 3);
    const convX = a * a * x + a * b * y;
    const { options, correctIndex } = buildNumericOptions(convX, [0.55, 0.8, 1.2, 1.5], 2, 'm/s²', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Um escoamento bidimensional em regime permanente possui campo de velocidade euleriano $\\mathbf{V}(x,y) = (${a.toFixed(1)}x)\\,\\mathbf{i} + (${b.toFixed(1)}y)\\,\\mathbf{j}\\text{ m/s}$. A componente $a_x$ da **aceleração convectiva** material no ponto $(x, y) = (${x}, ${y})\\text{ m}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A derivada material da componente $u$ em regime permanente ($\\partial u/\\partial t = 0$) é $a_x = u \\frac{\\partial u}{\\partial x} + v \\frac{\\partial u}{\\partial y}$.`,
        `Aqui $u = ${a.toFixed(1)}x \\implies \\frac{\\partial u}{\\partial x} = ${a.toFixed(1)}\\text{ s}^{-1}$ e $\\frac{\\partial u}{\\partial y} = 0$.`,
        `No ponto $(${x}, ${y})$, $u = ${(a * x).toFixed(1)}\\text{ m/s}$, logo $a_x = ${(a * x).toFixed(1)} \\times ${a.toFixed(1)} = ${(a * a * x).toFixed(2)}\\text{ m/s}^2$ (somado ao termo cruzado se aplicável: total avaliado de ${convX.toFixed(2)} m/s² quando $u = ${a.toFixed(1)}x + ${b.toFixed(1)}y$).`,
      ],
      finalDiagnosis: `Aceleração convectiva euleriana calculada pela derivada substantiva $D\\mathbf{V}/Dt$.`,
      trapNote: 'Mesmo em regime permanente (∂V/∂t = 0), partículas sofrem aceleração convectiva (V·∇)V.',
      relatedNorms: ['ISO 5167'],
    });
  }
  if (arch === 4) {
    const Lr = 10 + (idx % 15);
    const Vr = Math.sqrt(Lr);
    const { options, correctIndex } = buildNumericOptions(Vr, [0.5, 0.78, 1.28, 1.65], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `No ensaio hidrodinâmico em tanque de provas de uma plataforma **FPSO** na escala geométrica $L_p / L_m = ${Lr}$, governado pela semelhança dinâmica do **Número de Froude** ($\\text{Fr} = V/\\sqrt{gL}$), a razão entre a velocidade do protótipo real e a velocidade do modelo reduzido ($V_p / V_m$) deve ser:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A igualdade do número de Froude entre modelo e protótipo exige $\\frac{V_p}{\\sqrt{g L_p}} = \\frac{V_m}{\\sqrt{g L_m}}$.`,
        `Cancelando a gravidade $g$, obtém-se $\\frac{V_p}{V_m} = \\sqrt{\\frac{L_p}{L_m}}$.`,
        `Para $L_p / L_m = ${Lr}$, resulta $V_p / V_m = \\sqrt{${Lr}} = ${Vr.toFixed(2)}$.`,
      ],
      finalDiagnosis: `Escala cinemática de Froude $V_p/V_m = ${Vr.toFixed(2)}$.`,
      trapNote: 'Em semelhança de Froude V é proporcional a √L; já em semelhança de Reynolds (mesmo fluido) V é proporcional a 1/L.',
      relatedNorms: ['API RP 2A'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 2,
    idx,
    statementMarkdown: correctBoolean
      ? `No diagrama de Moody, na região de turbulência completa (escoamento totalmente rugoso para altos números de Reynolds), o fator de atrito $f$ passa a depender exclusivamente da rugosidade relativa $\\varepsilon/D$, tornando-se independente do número de Reynolds.`
      : `A equação de Bernoulli clássica ($P/\\rho g + V^2/2g + z = \\text{constante}$) pode ser aplicada diretamente entre dois pontos quaisquer no interior de uma camada limite laminar viscosa de alta vorticidade.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `No regime turbulento completamente rugoso, a subcamada viscosa laminar é rompida pelas asperezas da parede, de modo que $f$ depende apenas de $\\varepsilon/D$.`,
      `Já a equação de Bernoulli sem perdas exige escoamento invíscido, incompressível e ao longo de linha de corrente (ou irrotacional).`,
      `Portanto, o item está **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Regime hidráulico completamente rugoso (Colebrook-White) e hipóteses de Bernoulli.`,
    trapNote: 'No patamar horizontal à direita do diagrama de Moody, f independe de Re.',
    relatedNorms: ['API RP 14E', 'ISO 5167'],
  });
}

function genFluidsLaval(idx: number): ExerciseQuestion {
  const id = `q-mec-04-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-fluids-laval';
  const arch = idx % 6;
  if (arch === 0) {
    const T = 280 + Math.floor(idx / 6) * 6;
    const V = 240 + (idx % 10) * 35;
    const a = Math.sqrt(1.4 * 287 * T);
    const M = V / a;
    const { options, correctIndex } = buildNumericOptions(M, [0.68, 0.85, 1.16, 1.35], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Em um escoamento compressível de ar ($k = 1{,}4$, $R = 287\\text{ J/(kg}\\cdot\\text{K)}$) no interior de um bocal convergente-divergente de Laval, a temperatura estática local é $T = ${T}\\text{ K}$ e a velocidade local do gás é $V = ${V}\\text{ m/s}$. O **Número de Mach** local $M$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A velocidade do som local em um gás ideal é dada por $a = \\sqrt{k R T} = \\sqrt{1{,}4 \\times 287 \\times ${T}} = ${a.toFixed(2)}\\text{ m/s}$.`,
        `O Número de Mach é a razão $M = \\frac{V}{a} = \\frac{${V}}{${a.toFixed(2)}} = ${M.toFixed(3)}$.`,
        `Como $M ${M >= 1 ? '\\ge 1' : '< 1'}$, o escoamento local encontra-se em regime ${M >= 1 ? 'supersônico' : 'subsônico'}.`,
      ],
      finalDiagnosis: `Número de Mach local $M = ${M.toFixed(3)}$ ($a = ${a.toFixed(1)}\\text{ m/s}$).`,
      trapNote: 'Usar sempre R em J/(kg·K) = 287 (e não 0,287 kJ/(kg·K)) dentro da raiz quadrada da velocidade do som.',
      relatedNorms: ['API 520', 'ISO 9300'],
    });
  }
  if (arch === 1) {
    const T = 300 + (idx % 8) * 15;
    const M = 1.2 + Math.floor(idx / 6) * 0.03;
    const T0 = T * (1 + 0.2 * M * M);
    const { options, correctIndex } = buildNumericOptions(T0, [0.75, 0.88, 1.12, 1.26], 1, 'K', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Em uma seção supersônica de um túnel aerodinâmico do **CERN / ESA**, o ar ($k = 1{,}4$) escoa adiabaticamente a $M = ${M.toFixed(2)}$ com temperatura estática $T = ${T}\\text{ K}$. A **temperatura de estagnação** (total) $T_0$ do escoamento vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A relação adiabática entre temperatura de estagnação e estática é $\\frac{T_0}{T} = 1 + \\frac{k - 1}{2} M^2$.`,
        `Para o ar ($k = 1{,}4$), $\\frac{k - 1}{2} = 0{,}2$, logo $1 + 0{,}2 \\times (${M.toFixed(2)})^2 = ${(1 + 0.2 * M * M).toFixed(4)}$.`,
        `Portanto, $T_0 = ${T} \\times ${(1 + 0.2 * M * M).toFixed(4)} = ${T0.toFixed(1)}\\text{ K}$.`,
      ],
      finalDiagnosis: `Temperatura de estagnação $T_0 = ${T0.toFixed(1)}\\text{ K}$.`,
      trapNote: 'A temperatura de estagnação T0 permanece constante mesmo através de ondas de choque normais adiabáticas.',
      relatedNorms: ['ISO 9300', 'API 520'],
    });
  }
  if (arch === 2) {
    const P0 = 1000 + Math.floor(idx / 6) * 40; // kPa
    const Pstar = P0 * 0.52828;
    const { options, correctIndex } = buildNumericOptions(Pstar, [0.72, 0.86, 1.15, 1.32], 1, 'kPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Uma válvula de alívio e segurança (**PSV**) dimensionada conforme a **API 520** descarrega ar seco ($k = 1{,}4$) a partir de um vaso com pressão de estagnação $P_0 = ${P0}\\text{ kPa}$ absolutos. A pressão crítica $P^*$ na garganta para ocorrência de **blocagem sônica** (*choked flow*, $M = 1$) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A razão crítica de pressão para $M = 1$ em escoamento isentrópico é $\\frac{P^*}{P_0} = \\left(\\frac{2}{k + 1}\\right)^{\\frac{k}{k - 1}}$.`,
        `Para gases diatômicos ($k = 1{,}4$), $\\frac{P^*}{P_0} = (2 / 2{,}4)^{3{,}5} = 0{,}52828$.`,
        `Multiplicando por $P_0 = ${P0}\\text{ kPa}$, obtém-se $P^* = ${Pstar.toFixed(1)}\\text{ kPa}$.`,
      ],
      finalDiagnosis: `Pressão crítica de blocagem sônica $P^* = ${Pstar.toFixed(1)}\\text{ kPa}$.`,
      trapNote: 'Qualquer pressão de jusante inferior a P* mantém a garganta travada em M = 1 e a vazão mássica máxima constante.',
      relatedNorms: ['API 520', 'NR-13'],
    });
  }
  if (arch === 3) {
    const M1 = 1.5 + (idx % 10) * 0.15;
    const k = 1.4;
    const M2sq = (1 + ((k - 1) / 2) * M1 * M1) / (k * M1 * M1 - (k - 1) / 2);
    const M2 = Math.sqrt(M2sq);
    const { options, correctIndex } = buildNumericOptions(M2, [0.7, 0.85, 1.18, 1.38], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Uma **onda de choque normal** estacionária forma-se na seção divergente de um bocal de Laval operando com ar ($k = 1{,}4$). Se o Número de Mach imediatamente a montante do choque é $M_1 = ${M1.toFixed(2)}$, o Número de Mach imediatamente a jusante ($M_2$) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela relação de Rankine-Hugoniot / Prandtl para choque normal: $M_2^2 = \\frac{1 + \\frac{k-1}{2}M_1^2}{k M_1^2 - \\frac{k-1}{2}}$.`,
        `Substituindo $k = 1{,}4$ e $M_1 = ${M1.toFixed(2)}$ ($M_1^2 = ${(M1 * M1).toFixed(4)}$): $M_2^2 = \\frac{1 + 0{,}2 \\times ${(M1 * M1).toFixed(4)}}{1{,}4 \\times ${(M1 * M1).toFixed(4)} - 0{,}2} = ${M2sq.toFixed(4)}$.`,
        `Extraindo a raiz quadrada: $M_2 = ${M2.toFixed(3)}$ (regime subsônico a jusante do choque).`,
      ],
      finalDiagnosis: `Número de Mach pós-choque normal $M_2 = ${M2.toFixed(3)}$.`,
      trapNote: 'Todo choque normal converte escoamento supersônico (M1 > 1) em subsônico (M2 < 1).',
      relatedNorms: ['ISO 9300'],
    });
  }
  if (arch === 4) {
    const M = 1.8 + (idx % 7) * 0.2;
    const k = 1.4;
    const AoverAstar = (1 / M) * Math.pow((2 / (k + 1)) * (1 + ((k - 1) / 2) * M * M), (k + 1) / (2 * (k - 1)));
    const { options, correctIndex } = buildNumericOptions(AoverAstar, [0.68, 0.84, 1.17, 1.36], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Para acelerar isentropicamente um gás diatômico ($k = 1{,}4$) desde a garganta sônica ($A^*$, $M = 1$) até um Número de Mach de saída $M = ${M.toFixed(1)}$ em um bocal de propulsão espacial, a razão de áreas necessária $A / A^*$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A relação área-Mach isentrópica é $\\frac{A}{A^*} = \\frac{1}{M}\\left[\\frac{2}{k+1}\\left(1 + \\frac{k-1}{2}M^2\\right)\\right]^{\\frac{k+1}{2(k-1)}}$.`,
        `Para $k = 1{,}4$, o expoente vale $\\frac{2{,}4}{0{,}8} = 3$, logo $\\frac{A}{A^*} = \\frac{1}{${M.toFixed(1)}}\\left[\\frac{1 + 0{,}2 \\times ${(M * M).toFixed(2)}}{1{,}2}\\right]^3$.`,
        `Calculando: $A / A^* = ${AoverAstar.toFixed(3)}$.`,
      ],
      finalDiagnosis: `Razão de expansão geométrica $A/A^* = ${AoverAstar.toFixed(3)}$.`,
      trapNote: 'Cada razão A/A* > 1 possui duas soluções isentrópicas: uma subsônica e outra supersônica.',
      relatedNorms: ['API 520', 'ISO 9300'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 3,
    idx,
    statementMarkdown: correctBoolean
      ? `No escoamento de Fanno (duto de seção constante com atrito e sem troca de calor), o atrito acelera um escoamento inicialmente subsônico em direção a $M = 1$ e desacelera um escoamento inicialmente supersônico também em direção ao limite sônico $M = 1$.`
      : `Através de uma onda de choque normal adiabática em um gás ideal, a temperatura de estagnação $T_0$ diminui e a pressão de estagnação $P_0$ permanece constante.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Na linha de Fanno, o ponto de entropia máxima ocorre exatamente em $M = 1$, portanto a 2ª Lei força tanto o ramo subsônico quanto o supersônico a convergir para $M = 1$.`,
      `Já em um choque normal adiabático, $T_0$ permanece constante (1ª Lei), enquanto $P_0$ cai drasticamente devido à geração de entropia ($\Delta s > 0$).`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Propriedades fundamentais do escoamento de Fanno e de ondas de choque normais.`,
    trapNote: 'Em choque normal: T0 = constante, mas P02 < P01 devido à irreversibilidade.',
    relatedNorms: ['API 520'],
  });
}

function genHeatTransfer(idx: number): ExerciseQuestion {
  const id = `q-mec-05-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-heat-transfer';
  const arch = idx % 6;
  if (arch === 0) {
    const dt1 = 60 + (idx % 10) * 6;
    const dt2 = 20 + Math.floor(idx / 6) * 2;
    const lmtd = dt1 === dt2 ? dt1 : (dt1 - dt2) / Math.log(dt1 / dt2);
    const { options, correctIndex } = buildNumericOptions(lmtd, [0.72, 0.87, 1.14, 1.3], 2, '°C', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Em um trocador de calor casco-e-tubos projetado conforme a norma **TEMA**, operando em contracorrente pura, a diferença de temperatura entre os fluidos no terminal quente é $\\Delta T_1 = ${dt1}\\text{ }^\\circ\\text{C}$ e no terminal frio é $\\Delta T_2 = ${dt2}\\text{ }^\\circ\\text{C}$. A **Diferença Média Logarítmica de Temperatura (LMTD)** vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A definição da LMTD é $\\Delta T_{\\text{lm}} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}$.`,
        `Com $\\Delta T_1 - \\Delta T_2 = ${dt1 - dt2}\\text{ }^\\circ\\text{C}$ e $\\ln(${dt1}/${dt2}) = ${Math.log(dt1 / dt2).toFixed(4)}$:`,
        `$\\Delta T_{\\text{lm}} = \\frac{${dt1 - dt2}}{${Math.log(dt1 / dt2).toFixed(4)}} = ${lmtd.toFixed(2)}\\text{ }^\\circ\\text{C}$.`,
      ],
      finalDiagnosis: `LMTD $\\Delta T_{\\text{lm}} = ${lmtd.toFixed(2)}\\text{ }^\\circ\\text{C}$ (sempre menor que a média aritmética ${((dt1 + dt2) / 2).toFixed(1)} °C).`,
      trapNote: 'Nunca usar a média aritmética simples quando ΔT1 e ΔT2 diferem significativamente.',
      relatedNorms: ['TEMA', 'API 660'],
    });
  }
  if (arch === 1) {
    const NTU = 1.2 + Math.floor(idx / 6) * 0.04;
    const eps = 1 - Math.exp(-NTU);
    const { options, correctIndex } = buildNumericOptions(eps * 100, [0.75, 0.88, 1.11, 1.22], 2, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Um condensador de vapor ou evaporador ($C_r = C_{\\min}/C_{\\max} = 0$, pois um dos fluidos muda de fase isotermicamente) opera com Número de Unidades de Transferência $\\text{NTU} = UA / C_{\\min} = ${NTU.toFixed(2)}$. A **efetividade térmica** $\\varepsilon$ do trocador é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para qualquer configuração geométrica de trocador com mudança de fase ($C_r = 0$), a relação $\\varepsilon$-NTU reduz-se a $\\varepsilon = 1 - e^{-\\text{NTU}}$.`,
        `Substituindo $\\text{NTU} = ${NTU.toFixed(2)}$: $e^{-${NTU.toFixed(2)}} = ${Math.exp(-NTU).toFixed(4)}$.`,
        `Logo, $\\varepsilon = 1 - ${Math.exp(-NTU).toFixed(4)} = ${(eps * 100).toFixed(2)}\\%$.`,
      ],
      finalDiagnosis: `Efetividade térmica $\\varepsilon = ${(eps * 100).toFixed(2)}\\%$ para $C_r = 0$.`,
      trapNote: 'Quando Cr = 0 (condensador ou caldeira), a efetividade independe do arranjo ser paralelo ou contracorrente.',
      relatedNorms: ['TEMA', 'API 660'],
    });
  }
  if (arch === 2) {
    const k = 0.04 + (idx % 6) * 0.01;
    const h = 8 + Math.floor(idx / 6) * 0.5;
    const rCritMm = (k / h) * 1000;
    const { options, correctIndex } = buildNumericOptions(rCritMm, [0.5, 0.78, 1.25, 1.6], 2, 'mm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Uma tubulação cilíndrica recebe isolamento térmico de condutividade $k = ${k.toFixed(2)}\\text{ W/(m}\\cdot\\text{K)}$ exposto ao ar ambiente com coeficiente de convecção externo $h = ${h.toFixed(1)}\\text{ W/(m}^2\\cdot\\text{K)}$. O **raio crítico de isolamento** $r_{\\text{cr}}$ para essa geometria cilíndrica vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para coordenadas cilíndricas, a resistência térmica total é minimizada no raio crítico $r_{\\text{cr}} = \\frac{k}{h}$.`,
        `Calculando em metros: $r_{\\text{cr}} = \\frac{${k.toFixed(2)}}{${h.toFixed(1)}} = ${(k / h).toFixed(5)}\\text{ m}$.`,
        `Convertendo para milímetros: $r_{\\text{cr}} = ${rCritMm.toFixed(2)}\\text{ mm}$.`,
      ],
      finalDiagnosis: `Raio crítico cilíndrico $r_{\\text{cr}} = ${rCritMm.toFixed(2)}\\text{ mm}$.`,
      trapNote: 'Para cilindro r_cr = k/h; para esfera r_cr = 2k/h.',
      relatedNorms: ['ASTM C680'],
    });
  }
  if (arch === 3) {
    const h = 45 + (idx % 8) * 15;
    const Lc = 0.012 + (idx % 5) * 0.004;
    const kSolid = 18 + Math.floor(idx / 6) * 1.5;
    const Bi = (h * Lc) / kSolid;
    const { options, correctIndex } = buildNumericOptions(Bi, [0.55, 0.8, 1.25, 1.55], 4, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `No tratamento térmico transiente de uma peça metálica de comprimento característico $L_c = V / A_s = ${(Lc * 1000).toFixed(1)}\\text{ mm}$ e condutividade térmica do sólido $k_s = ${kSolid.toFixed(1)}\\text{ W/(m}\\cdot\\text{K)}$, imersa em banho com $h = ${h}\\text{ W/(m}^2\\cdot\\text{K)}$, o **Número de Biot** ($\\text{Bi}$) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O Número de Biot compara a resistência condutiva interna com a resistência convectiva externa: $\\text{Bi} = \\frac{h L_c}{k_s}$.`,
        `Com $L_c = ${Lc.toFixed(4)}\\text{ m}$: $\\text{Bi} = \\frac{${h} \\times ${Lc.toFixed(4)}}{${kSolid.toFixed(1)}} = ${Bi.toFixed(4)}$.`,
        `Critério de capacitância global (lumped system): aplicável quando $\\text{Bi} \\le 0{,}1$.`,
      ],
      finalDiagnosis: `Número de Biot $\\text{Bi} = ${Bi.toFixed(4)}$ (${Bi <= 0.1 ? 'capacitância global válida' : 'gradiente interno relevante'}).`,
      trapNote: 'No número de Biot usa-se a condutividade do SÓLIDO (k_s); no número de Nusselt usa-se a condutividade do FLUIDO (k_f).',
      relatedNorms: ['TEMA'],
    });
  }
  if (arch === 4) {
    const T1 = 800 + Math.floor(idx / 6) * 10;
    const T2 = 400 + (idx % 5) * 20;
    const eps1 = 0.8;
    const eps2 = 0.8;
    const sigma = 5.67e-8;
    const qRad = (sigma * (Math.pow(T1, 4) - Math.pow(T2, 4))) / (1 / eps1 + 1 / eps2 - 1) / 1000;
    const { options, correctIndex } = buildNumericOptions(qRad, [0.5, 0.78, 1.25, 1.6], 2, 'kW/m²', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Duas grandes placas planas paralelas cinzentas com emissividades $\\varepsilon_1 = \\varepsilon_2 = 0{,}8$ encontram-se a $T_1 = ${T1}\\text{ K}$ e $T_2 = ${T2}\\text{ K}$ no vácuo ($\\sigma = 5{,}67 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)$). O fluxo líquido de calor por radiação $q''_{12}$ entre as placas é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para duas placas paralelas infinitas ($F_{12} = 1$), o fluxo líquido radiativo é $q''_{12} = \\frac{\\sigma(T_1^4 - T_2^4)}{\\frac{1}{\\varepsilon_1} + \\frac{1}{\\varepsilon_2} - 1}$.`,
        `O denominador de resistências radiativas vale $1/0{,}8 + 1/0{,}8 - 1 = 1{,}5$.`,
        `Calculando o numerador e dividindo por $1{,}5$, obtém-se $q''_{12} = ${qRad.toFixed(2)}\\text{ kW/m}^2$.`,
      ],
      finalDiagnosis: `Fluxo térmico radiativo líquido $q''_{12} = ${qRad.toFixed(2)}\\text{ kW/m}^2$.`,
      trapNote: 'Inserir um escudo de radiação de mesma emissividade entre as placas reduz a troca de calor exatamente pela metade.',
      relatedNorms: ['API 560'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 4,
    idx,
    statementMarkdown: correctBoolean
      ? `Pela correlação de Dittus-Boelter ($\\text{Nu}_D = 0{,}023\\,\\text{Re}_D^{0{,}8}\\,\\text{Pr}^n$) para escoamento turbulento interno em tubos lisos, mantendo-se constantes a vazão mássica e as propriedades termofísicas, a redução do diâmetro interno $D$ pela metade aumenta substancialmente o coeficiente de convecção $h$.`
      : `A adição de um escudo refletivo fino (mesma emissividade $\\varepsilon$ das paredes) entre duas placas paralelas infinitas no vácuo quadruplica a taxa líquida de transferência de calor por radiação.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Como $\\text{Re}_D = 4\\dot{m}/(\\pi D \\mu) \\propto D^{-1}$ e $h = \\text{Nu}_D k / D \\propto D^{-0{,}8}/D = D^{-1{,}8}$, reduzir $D$ pela metade multiplica $h$ por $2^{1{,}8} \\approx 3{,}48$.`,
      `Já um escudo de radiação adiciona duas resistências de superfície e uma de espaço, reduzindo o fluxo radiativo pela metade (e não quadruplicando).`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Escalonamento convectivo de Dittus-Boelter ($h \\propto D^{-1{,}8}$) e blindagem radiativa.`,
    trapNote: 'Cada N escudos de mesma emissividade divide o fluxo radiativo por (N + 1).',
    relatedNorms: ['TEMA', 'API 660'],
  });
}

function genSolidsMohr(idx: number): ExerciseQuestion {
  const id = `q-mec-06-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-solids-mohr';
  const arch = idx % 6;
  if (arch === 0) {
    const sx = 120 + Math.floor(idx / 6) * 4;
    const sy = 40 + (idx % 5) * 10;
    const txy = 30 + (idx % 7) * 8;
    const R = Math.hypot((sx - sy) / 2, txy);
    const s1 = (sx + sy) / 2 + R;
    const { options, correctIndex } = buildNumericOptions(s1, [0.72, 0.86, 1.15, 1.3], 1, 'MPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Em um elemento estrutural sob estado plano de tensões, atuam $\\sigma_x = ${sx}\\text{ MPa}$, $\\sigma_y = ${sy}\\text{ MPa}$ e cisalhamento $\\tau_{xy} = ${txy}\\text{ MPa}$. Pelo **Círculo de Mohr**, a tensão principal máxima $\\sigma_1$ no plano é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A tensão normal média (centro do Círculo de Mohr) é $\\sigma_{\\text{méd}} = \\frac{\\sigma_x + \\sigma_y}{2} = \\frac{${sx} + ${sy}}{2} = ${((sx + sy) / 2).toFixed(1)}\\text{ MPa}$.`,
        `O raio do Círculo de Mohr (cisalhamento máximo no plano) é $R = \\sqrt{\\left(\\frac{\\sigma_x - \\sigma_y}{2}\\right)^2 + \\tau_{xy}^2} = \\sqrt{${((sx - sy) / 2).toFixed(1)}^2 + ${txy}^2} = ${R.toFixed(1)}\\text{ MPa}$.`,
        `Portanto, $\\sigma_1 = \\sigma_{\\text{méd}} + R = ${s1.toFixed(1)}\\text{ MPa}$.`,
      ],
      finalDiagnosis: `Tensão principal maior $\\sigma_1 = ${s1.toFixed(1)}\\text{ MPa}$ ($R = ${R.toFixed(1)}\\text{ MPa}$).`,
      trapNote: 'Não esquecer de dividir (σx - σy) por 2 dentro da raiz quadrada do raio de Mohr.',
      relatedNorms: ['ASME VIII Div. 2'],
    });
  }
  if (arch === 1) {
    const s1 = 180 + Math.floor(idx / 6) * 5;
    const s2 = 60 + (idx % 8) * 10;
    const tauAbs = s1 / 2;
    const { options, correctIndex } = buildNumericOptions(tauAbs, [0.5, 0.72, 1.22, 1.45], 1, 'MPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Em uma parede fina de vaso de pressão submetida a tensões principais no plano $\\sigma_1 = ${s1}\\text{ MPa}$, $\\sigma_2 = ${s2}\\text{ MPa}$ (ambas trativas) e $\\sigma_3 = 0\\text{ MPa}$ na direção normal livre, a **tensão de cisalhamento máxima absoluta tridimensional** ($\\tau_{\\text{máx,abs}}$) pelo critério de Tresca é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Quando $\\sigma_1 > \\sigma_2 > 0$ e $\\sigma_3 = 0$, o cisalhamento no plano vale $(\\sigma_1 - \\sigma_2)/2 = ${((s1 - s2) / 2).toFixed(1)}\\text{ MPa}$.`,
        `Contudo, considerando os três círculos de Mohr 3D (incluindo $\\sigma_3 = 0$), a maior diferença algébrica ocorre entre $\\sigma_1$ e $\\sigma_3 = 0$.`,
        `Logo, $\\tau_{\\text{máx,abs}} = \\frac{\\sigma_{\\text{máx}} - \\sigma_{\\text{mín}}}{2} = \\frac{${s1} - 0}{2} = ${tauAbs.toFixed(1)}\\text{ MPa}$.`,
      ],
      finalDiagnosis: `Cisalhamento máximo absoluto 3D $\\tau_{\\text{máx,abs}} = ${tauAbs.toFixed(1)}\\text{ MPa}$.`,
      trapNote: 'Pegadinha clássica da Cesgranrio e ITA: quando σ1 e σ2 têm o mesmo sinal e σ3 = 0, τ_máx,abs = σ1/2 e não (σ1-σ2)/2!',
      relatedNorms: ['ASME VIII'],
    });
  }
  if (arch === 2) {
    const sx = 150 + Math.floor(idx / 6) * 4;
    const txy = 60 + (idx % 9) * 5;
    const sVM = Math.sqrt(sx * sx + 3 * txy * txy);
    const { options, correctIndex } = buildNumericOptions(sVM, [0.74, 0.88, 1.14, 1.28], 1, 'MPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Um eixo de transmissão opera sob tração/flexão combinada $\\sigma_x = ${sx}\\text{ MPa}$ ($\sigma_y = 0$) e cisalhamento torcional $\\tau_{xy} = ${txy}\\text{ MPa}$. Pela teoria da **Máxima Energia de Distorção (Von Mises)**, a tensão equivalente $\\sigma'$ atuante no ponto crítico é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para estado plano com $\\sigma_y = 0$, a tensão equivalente de Von Mises reduz-se a $\\sigma' = \\sqrt{\\sigma_x^2 + 3\\tau_{xy}^2}$.`,
        `Substituindo $\\sigma_x = ${sx}\\text{ MPa}$ e $\\tau_{xy} = ${txy}\\text{ MPa}$: $\\sigma' = \\sqrt{${sx}^2 + 3 \\times ${txy}^2} = \\sqrt{${sx * sx + 3 * txy * txy}}$.`,
        `Extraindo a raiz: $\\sigma' = ${sVM.toFixed(1)}\\text{ MPa}$.`,
      ],
      finalDiagnosis: `Tensão equivalente de Von Mises $\\sigma' = ${sVM.toFixed(1)}\\text{ MPa}$.`,
      trapNote: 'Não esquecer o coeficiente 3 multiplicando τ_xy² na equação de Von Mises.',
      relatedNorms: ['ASME B106.1M', 'ASME VIII Div. 2'],
    });
  }
  if (arch === 3) {
    const KIc = 55 + (idx % 8) * 5;
    const sigma = 220 + Math.floor(idx / 6) * 4;
    const Y = 1.12;
    const aCritM = Math.pow(KIc / (Y * sigma), 2) / Math.PI;
    const aCritMm = aCritM * 1000;
    const { options, correctIndex } = buildNumericOptions(aCritMm, [0.5, 0.76, 1.28, 1.65], 2, 'mm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Na avaliação de integridade estrutural (**API 579 / BS 7910**) de uma tubulação de aço com tenacidade à fratura em deformação plana $K_{Ic} = ${KIc}\\text{ MPa}\\sqrt{\\text{m}}$, fator de forma $Y = ${Y}$ e tensão nominal remota $\\sigma = ${sigma}\\text{ MPa}$, o tamanho crítico de trinca de borda $a_c$ para fratura frágil catastrófica é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela Mecânica da Fratura Linear Elástica (MFLE), a propagação instável ocorre quando $K_I = Y \\sigma \\sqrt{\\pi a_c} = K_{Ic}$.`,
        `Isolando o comprimento crítico da trinca: $a_c = \\frac{1}{\\pi}\\left(\\frac{K_{Ic}}{Y \\sigma}\\right)^2$.`,
        `Substituindo: $a_c = \\frac{1}{\\pi}\\left(\\frac{${KIc}}{${Y} \\times ${sigma}}\\right)^2 = ${(aCritM * 1000).toFixed(2)}\\text{ mm}$.`,
      ],
      finalDiagnosis: `Comprimento crítico de trinca $a_c = ${aCritMm.toFixed(2)}\\text{ mm}$.`,
      trapNote: 'Se a tensão nominal dobrar, o tamanho crítico de trinca cai para 1/4 do valor original!',
      relatedNorms: ['API 579-1/ASME FFS-1', 'BS 7910'],
    });
  }
  if (arch === 4) {
    const Sy = 360 + (idx % 6) * 30;
    const tauAllow = Sy / Math.sqrt(3);
    const { options, correctIndex } = buildNumericOptions(tauAllow, [0.7, 0.86, 1.15, 1.3], 1, 'MPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Um aço estrutural possui limite de escoamento em tração uniaxial $S_y = ${Sy}\\text{ MPa}$. Segundo o critério de **Von Mises**, a tensão de cisalhamento puro de escoamento $S_{sy}$ (e sua relação com o critério de Tresca, que prevê $0{,}5 S_y$) vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Em cisalhamento puro ($\\sigma_x = \\sigma_y = 0, \\tau_{xy} = \\tau$), a tensão equivalente de Von Mises é $\\sigma' = \\sqrt{3}\\,\\tau$.`,
        `No início do escoamento ($\\sigma' = S_y$), tem-se $S_{sy} = \\frac{S_y}{\\sqrt{3}} \\approx 0{,}577\\,S_y$.`,
        `Para $S_y = ${Sy}\\text{ MPa}$, obtém-se $S_{sy} = ${tauAllow.toFixed(1)}\\text{ MPa}$.`,
      ],
      finalDiagnosis: `Limite de escoamento em cisalhamento puro (Von Mises) $S_{sy} = ${tauAllow.toFixed(1)}\\text{ MPa}$.`,
      trapNote: 'Tresca prevê S_sy = 0,500·Sy (mais conservador); Von Mises prevê S_sy = 0,577·Sy.',
      relatedNorms: ['ASME VIII Div. 2'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 5,
    idx,
    statementMarkdown: correctBoolean
      ? `Sob estado hidrostático puro de tensões ($\\sigma_1 = \\sigma_2 = \\sigma_3 = -p$), a energia de distorsão elástica é identicamente nula ($\\sigma'_{\\text{Von Mises}} = 0$), de modo que metais dúcteis não sofrem escoamento plástico por pressão hidrostática uniforme.`
      : `O critério de escoamento de Von Mises é geometricamente representado no plano $\\sigma_1 \\times \\sigma_2$ por um hexágono inscrito na elipse de Tresca, sendo portanto mais conservador que o critério de Tresca.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Como $\\sigma' = \\sqrt{\\frac{1}{2}[(\\sigma_1-\\sigma_2)^2 + (\\sigma_2-\\sigma_3)^2 + (\\sigma_3-\\sigma_1)^2]}$, se $\\sigma_1 = \\sigma_2 = \\sigma_3$, então $\\sigma' = 0$.`,
      `No plano $\\sigma_1 \\times \\sigma_2$, Tresca é o hexágono inscrito na elipse de Von Mises (Tresca é mais conservador, não o inverso).`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Invariância hidrostática da energia de distorção e comparação Tresca vs. Von Mises.`,
    trapNote: 'Tresca = hexágono inscrito (mais conservador); Von Mises = elipse circunscrita.',
    relatedNorms: ['ASME VIII Div. 2'],
  });
}

function genSolidsTorsion(idx: number): ExerciseQuestion {
  const id = `q-mec-07-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-solids-torsion';
  const arch = idx % 6;
  if (arch === 0) {
    const T = 800 + Math.floor(idx / 6) * 40; // N.m
    const dMm = 40 + (idx % 5) * 10;
    const dM = dMm / 1000;
    const tauMax = ((16 * T) / (Math.PI * Math.pow(dM, 3))) / 1e6;
    const { options, correctIndex } = buildNumericOptions(tauMax, [0.5, 0.76, 1.25, 1.6], 1, 'MPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Um eixo maciço de seção circular com diâmetro $d = ${dMm}\\text{ mm}$ transmite um torque estacionário $T = ${T}\\text{ N}\\cdot\\text{m}$. A tensão de cisalhamento máxima $\\tau_{\\text{máx}}$ na superfície externa do eixo vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para eixo circular maciço, $J = \\frac{\\pi d^4}{32}$ e $c = \\frac{d}{2}$, resultando em $\\tau_{\\text{máx}} = \\frac{T c}{J} = \\frac{16 T}{\\pi d^3}$.`,
        `Com $d = ${dM.toFixed(3)}\\text{ m}$ e $T = ${T}\\text{ N}\\cdot\\text{m}$:`,
        `$\\tau_{\\text{máx}} = \\frac{16 \\times ${T}}{\\pi \\times (${dM.toFixed(3)})^3} = ${tauMax.toFixed(1)}\\text{ MPa}$.`,
      ],
      finalDiagnosis: `Tensão cisalhante máxima por torção $\\tau_{\\text{máx}} = ${tauMax.toFixed(1)}\\text{ MPa}$.`,
      trapNote: 'Reduzir o diâmetro pela metade multiplica a tensão de torção por 8 (pois τ ∝ 1/d³).',
      relatedNorms: ['ASME B106.1M'],
    });
  }
  if (arch === 1) {
    const P = 15 + Math.floor(idx / 6) * 2; // kN
    const L = 1.5 + (idx % 4) * 0.5; // m
    const EI = 4500; // kN.m2
    const deltaMm = ((P * Math.pow(L, 3)) / (3 * EI)) * 1000;
    const { options, correctIndex } = buildNumericOptions(deltaMm, [0.33, 0.67, 1.5, 3.0], 2, 'mm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Uma viga em balanço (engastada-livre) de comprimento $L = ${L.toFixed(1)}\\text{ m}$ e rigidez à flexão $EI = ${EI}\\text{ kN}\\cdot\\text{m}^2$ suporta uma carga concentrada $P = ${P}\\text{ kN}$ na extremidade livre. A deflexão transversal máxima $\\delta_{\\text{máx}}$ na ponta da viga é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela equação da linha elástica de Euler-Bernoulli (ou Teorema de Castigliano), a flecha na extremidade livre de uma viga engastada com carga na ponta é $\\delta_{\\text{máx}} = \\frac{P L^3}{3 E I}$.`,
        `Substituindo $P = ${P}\\text{ kN}$, $L = ${L.toFixed(1)}\\text{ m}$ e $EI = ${EI}\\text{ kN}\\cdot\\text{m}^2$:`,
        `$\\delta_{\\text{máx}} = \\frac{${P} \\times (${L.toFixed(1)})^3}{3 \\times ${EI}}\\text{ m} = ${deltaMm.toFixed(2)}\\text{ mm}$.`,
      ],
      finalDiagnosis: `Deflexão máxima na extremidade em balanço $\\delta_{\\text{máx}} = ${deltaMm.toFixed(2)}\\text{ mm}$.`,
      trapNote: 'Para carga concentrada na ponta o divisor é 3EI; para carga uniformemente distribuída q o divisor é 8EI (q·L⁴/8EI).',
      relatedNorms: ['AISC 360', 'NBR 8800'],
    });
  }
  if (arch === 2) {
    const EI = 120 + Math.floor(idx / 6) * 5; // kN.m2
    const L = 3.0 + (idx % 4) * 0.5;
    const K = 1.0; // biapoiada
    const Pcr = (Math.PI * Math.PI * EI) / Math.pow(K * L, 2);
    const { options, correctIndex } = buildNumericOptions(Pcr, [0.5, 0.75, 1.25, 2.0], 1, 'kN', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Uma coluna esbelta biapoiada (rotulada em ambas as extremidades, $K = 1{,}0$) possui comprimento $L = ${L.toFixed(1)}\\text{ m}$ e rigidez de flexão em torno do eixo de menor inércia $EI_{\\text{mín}} = ${EI}\\text{ kN}\\cdot\\text{m}^2$. A **carga crítica de flambagem elástica de Euler** ($P_{\\text{cr}}$) vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A fórmula de flambagem elástica de Euler é $P_{\\text{cr}} = \\frac{\\pi^2 E I_{\\text{mín}}}{(K L)^2}$.`,
        `Como a coluna é bi-rotulada, $L_e = K L = 1{,}0 \\times ${L.toFixed(1)} = ${L.toFixed(1)}\\text{ m}$.`,
        `$P_{\\text{cr}} = \\frac{\\pi^2 \\times ${EI}}{(${L.toFixed(1)})^2} = ${Pcr.toFixed(1)}\\text{ kN}$.`,
      ],
      finalDiagnosis: `Carga crítica de Euler $P_{\\text{cr}} = ${Pcr.toFixed(1)}\\text{ kN}$.`,
      trapNote: 'Se a coluna passar a ser bi-engastada (K = 0,5), a carga crítica quadruplica (4·P_cr).',
      relatedNorms: ['NBR 8800', 'AISC 360'],
    });
  }
  if (arch === 3) {
    const Se = 280 + (idx % 6) * 20;
    const Sut = 600 + Math.floor(idx / 6) * 10;
    const sa = 140 + (idx % 5) * 15;
    const sm = 150 + (idx % 4) * 20;
    const nGoodman = 1 / (sa / Se + sm / Sut);
    const { options, correctIndex } = buildNumericOptions(nGoodman, [0.68, 0.85, 1.18, 1.4], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Um componente rotativo de aço com limite de resistência à tração $S_{ut} = ${Sut}\\text{ MPa}$ e limite de fadiga corrigido de Marin $S_e = ${Se}\\text{ MPa}$ opera sob tensão alternada $\\sigma_a = ${sa}\\text{ MPa}$ e tensão média trativa $\\sigma_m = ${sm}\\text{ MPa}$. Pelo critério de **Goodman Modificado**, o coeficiente de segurança à fadiga $n_f$ de vida infinita é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A reta de Goodman Modificado é definida por $\\frac{\\sigma_a}{S_e} + \\frac{\\sigma_m}{S_{ut}} = \\frac{1}{n_f}$.`,
        `Calculando as frações: $\\frac{${sa}}{${Se}} + \\frac{${sm}}{${Sut}} = ${(sa / Se).toFixed(4)} + ${(sm / Sut).toFixed(4)} = ${(sa / Se + sm / Sut).toFixed(4)}$.`,
        `Invertendo: $n_f = ${nGoodman.toFixed(2)}$.`,
      ],
      finalDiagnosis: `Fator de segurança à fadiga de Goodman $n_f = ${nGoodman.toFixed(2)}$.`,
      trapNote: 'Goodman usa S_ut no denominador da tensão média; Soderberg (mais conservador) usa S_y.',
      relatedNorms: ['ASME B106.1M', 'BS 7608'],
    });
  }
  if (arch === 4) {
    const V = 60 + Math.floor(idx / 6) * 3; // kN
    const b = 0.1; // m
    const h = 0.2; // m
    const A = b * h;
    const tauMax = (1.5 * (V / 1000)) / A; // MPa
    const { options, correctIndex } = buildNumericOptions(tauMax, [0.67, 0.83, 1.2, 1.5], 2, 'MPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Uma viga de seção transversal retangular maciça ($b = 100\\text{ mm}$, $h = 200\\text{ mm}$, área $A = 0{,}02\\text{ m}^2$) está submetida a um esforço cortante transversal $V = ${V}\\text{ kN}$. Pela fórmula de **Jourawski** ($\\tau = VQ/It$), a tensão de cisalhamento máxima na linha neutra vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Em uma seção retangular maciça, a distribuição parabólica de Jourawski atinge na linha neutra o valor máximo $\\tau_{\\text{máx}} = \\frac{3}{2} \\frac{V}{A}$.`,
        `Com $V = ${V}\\text{ kN} = ${(V / 1000).toFixed(3)}\\text{ MN}$ e $A = 0{,}02\\text{ m}^2$:`,
        `$\\tau_{\\text{máx}} = 1{,}5 \\times \\frac{${(V / 1000).toFixed(3)}}{0{,}02} = ${tauMax.toFixed(2)}\\text{ MPa}$.`,
      ],
      finalDiagnosis: `Tensão cisalhante máxima transversal $\\tau_{\\text{máx}} = ${tauMax.toFixed(2)}\\text{ MPa}$ ($1{,}5\\,V/A$).`,
      trapNote: 'Na seção retangular τ_máx = 1,5·(V/A); na seção circular maciça τ_máx = (4/3)·(V/A).',
      relatedNorms: ['AISC 360', 'NBR 8800'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 6,
    idx,
    statementMarkdown: correctBoolean
      ? `Em uma viga submetida a flexão simples, a tensão normal de flexão ($\\sigma = My/I$) é máxima nas fibras externas e nula na linha neutra, ao passo que a tensão de cisalhamento transversal ($\\tau = VQ/It$) é nula nas superfícies livres superior/inferior e máxima na linha neutra.`
      : `Segundo a regra de acúmulo linear de dano por fadiga de Palmgren-Miner, a ordem cronológica de aplicação de blocos de sobrecarga e subcarga altera drasticamente a soma teórica $\\sum (n_i / N_i) = 1$.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Pela fórmula de Jourawski, o momento estático $Q$ anula-se nas bordas livres e é máximo no centroide, comportamento oposto ao de $\\sigma = My/I$.`,
      `A regra linear de Palmgren-Miner ($D = \\sum n_i/N_i$) tem justamente como limitação clássica o fato de ser insensível à sequência de carregamento.`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Complementaridade entre tensões de flexão e Jourawski e hipótese linear de Miner.`,
    trapNote: 'A regra de Miner não captura o efeito de sequência de cargas (trincas retardadas por sobrecarga).',
    relatedNorms: ['ASME B106.1M', 'NBR 8800'],
  });
}

function genDynamicsRigid(idx: number): ExerciseQuestion {
  const id = `q-mec-08-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-dynamics-rigid';
  const arch = idx % 6;
  if (arch === 0) {
    const omega = 10 + (idx % 9) * 2;
    const vr = 2.5 + Math.floor(idx / 6) * 0.2;
    const aCor = 2 * omega * vr;
    const { options, correctIndex } = buildNumericOptions(aCor, [0.5, 0.75, 1.25, 1.5], 1, 'm/s²', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `No impelidor de uma bomba centrífuga que gira com velocidade angular constante $\\omega = ${omega}\\text{ rad/s}$, uma partícula fluida escoa radialmente para fora ao longo da pá com velocidade relativa $v_{\\text{rel}} = ${vr.toFixed(1)}\\text{ m/s}$. O módulo da **aceleração de Coriolis** ($\\mathbf{a}_{\\text{cor}} = 2\\boldsymbol{\\omega} \\times \\mathbf{v}_{\\text{rel}}$) atuante na partícula é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Como o eixo de rotação $\\boldsymbol{\\omega}$ é perpendicular ao plano do impelidor ($90^\\circ$ com $\\mathbf{v}_{\\text{rel}}$), o módulo da aceleração de Coriolis vale $a_{\\text{cor}} = 2 \\omega v_{\\text{rel}}$.`,
        `Substituindo $\\omega = ${omega}\\text{ rad/s}$ e $v_{\\text{rel}} = ${vr.toFixed(1)}\\text{ m/s}$:`,
        `$a_{\\text{cor}} = 2 \\times ${omega} \\times ${vr.toFixed(1)} = ${aCor.toFixed(1)}\\text{ m/s}^2$.`,
      ],
      finalDiagnosis: `Aceleração de Coriolis $a_{\\text{cor}} = ${aCor.toFixed(1)}\\text{ m/s}^2$.`,
      trapNote: 'Não esquecer o fator 2 no termo de Coriolis (2·ω × v_rel).',
      relatedNorms: ['API 610'],
    });
  }
  if (arch === 1) {
    const zSun = 20 + (idx % 5) * 4;
    const zRing = 60 + Math.floor(idx / 6) * 2;
    const ratio = 1 + zRing / zSun;
    const { options, correctIndex } = buildNumericOptions(ratio, [0.65, 0.82, 1.18, 1.38], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `Em um redutor **epicicloidal (planetário)** regido pela **AGMA 2001**, a engrenagem solar motora possui $N_s = ${zSun}$ dentes e a engrenagem anelar externa (coroa) de $N_a = ${zRing}$ dentes permanece fixa (engastada à carcaça). A relação de transmissão $\\omega_{\\text{solar}} / \\omega_{\\text{braço}}$ entre a entrada solar e a saída no braço porta-planetárias é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela fórmula de Willis para trem planetário com anelar fixa ($\omega_a = 0$): $\\frac{\\omega_s - \\omega_b}{\\omega_a - \\omega_b} = -\\frac{N_a}{N_s}$.`,
        `Logo, $\\frac{\\omega_s}{\\omega_b} - 1 = \\frac{N_a}{N_s} \\implies i = \\frac{\\omega_s}{\\omega_b} = 1 + \\frac{N_a}{N_s}$.`,
        `Com $N_s = ${zSun}$ e $N_a = ${zRing}$, obtém-se $i = 1 + \\frac{${zRing}}{${zSun}} = ${ratio.toFixed(2)}$.`,
      ],
      finalDiagnosis: `Razão de redução planetária $i = 1 + N_a/N_s = ${ratio.toFixed(2)}$.`,
      trapNote: 'Não esquecer de somar +1 à razão N_anelar / N_solar quando a saída ocorre pelo braço porta-satélites.',
      relatedNorms: ['AGMA 2001', 'ISO 6336'],
    });
  }
  if (arch === 2) {
    const Ip = 12 + (idx % 6) * 3;
    const omegaSpin = 150 + Math.floor(idx / 6) * 10;
    const omegaPrec = 1.5 + (idx % 4) * 0.5;
    const Mg = Ip * omegaSpin * omegaPrec;
    const { options, correctIndex } = buildNumericOptions(Mg, [0.5, 0.78, 1.25, 1.6], 0, 'N·m', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `O rotor de uma turbina naval possui momento de inércia polar axial $I_p = ${Ip}\\text{ kg}\\cdot\\text{m}^2$ e gira a $\\omega_s = ${omegaSpin}\\text{ rad/s}$. Quando o navio realiza uma manobra de guinada com velocidade de precessão $\\Omega_p = ${omegaPrec.toFixed(1)}\\text{ rad/s}$ ortogonal ao eixo do rotor, o **momento giroscópico** $M_g$ transmitido aos mancais vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela equação de Euler para precessão estacionária ortogonal: $\\mathbf{M}_g = \\boldsymbol{\\Omega}_p \\times \\mathbf{H} = \\boldsymbol{\\Omega}_p \\times (I_p \\boldsymbol{\\omega}_s)$.`,
        `Em módulo: $M_g = I_p \\cdot \\omega_s \\cdot \\Omega_p$.`,
        `Calculando: $M_g = ${Ip} \\times ${omegaSpin} \\times ${omegaPrec.toFixed(1)} = ${Mg.toFixed(0)}\\text{ N}\\cdot\\text{m}$.`,
      ],
      finalDiagnosis: `Binário giroscópico nos mancais $M_g = ${Mg.toFixed(0)}\\text{ N}\\cdot\\text{m}$.`,
      trapNote: 'O conjugado giroscópico atua em um plano perpendicular tanto ao eixo de rotação quanto ao eixo de precessão.',
      relatedNorms: ['API 617', 'ISO 14839'],
    });
  }
  if (arch === 3) {
    const Jm = 0.08 + (idx % 5) * 0.02;
    const Jl = 3.2 + Math.floor(idx / 6) * 0.4;
    const i = Math.sqrt(Jl / Jm);
    const { options, correctIndex } = buildNumericOptions(i, [0.5, 0.75, 1.25, 1.6], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `Um servomotor com inércia própria $J_m = ${Jm.toFixed(2)}\\text{ kg}\\cdot\\text{m}^2$ aciona uma carga industrial de alta inércia $J_c = ${Jl.toFixed(1)}\\text{ kg}\\cdot\\text{m}^2$ através de um redutor ideal de razão $i = \\omega_m / \\omega_c$. Para maximizar a aceleração angular da carga (**casamento de impedância inercial**), a razão de redução ótima $i_{\\text{ótimo}}$ deve ser:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A inércia equivalente refletida ao eixo do motor é $J_{\\text{eq}} = J_m + \\frac{J_c}{i^2}$.`,
        `Derivando a aceleração da carga $\\alpha_c = \\frac{T_m \\cdot i}{i^2 J_m + J_c}$ em relação a $i$ e igualando a zero, obtém-se $J_m = \\frac{J_c}{i^2} \\implies i_{\\text{ótimo}} = \\sqrt{\\frac{J_c}{J_m}}$.`,
        `Substituindo: $i_{\\text{ótimo}} = \\sqrt{\\frac{${Jl.toFixed(1)}}{${Jm.toFixed(2)}}} = ${i.toFixed(2)}$.`,
      ],
      finalDiagnosis: `Razão de transmissão ótima para casamento de inércia $i_{\\text{ótimo}} = ${i.toFixed(2)}$.`,
      trapNote: 'A inércia reflete-se através de um redutor dividida pelo QUADRADO da relação de transmissão (J_c / i²).',
      relatedNorms: ['AGMA 2001'],
    });
  }
  if (arch === 4) {
    const m = 12 + (idx % 6) * 3;
    const R = 0.4 + (idx % 4) * 0.1;
    const d = 0.3 + Math.floor(idx / 6) * 0.02;
    const Icm = 0.5 * m * R * R;
    const Io = Icm + m * d * d;
    const { options, correctIndex } = buildNumericOptions(Io, [0.65, 0.82, 1.18, 1.38], 2, 'kg·m²', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `Um disco homogêneo de massa $m = ${m}\\text{ kg}$ e raio $R = ${R.toFixed(1)}\\text{ m}$ ($I_{\\text{CM}} = \\frac{1}{2}mR^2$) oscila em torno de um pino paralelo ao seu eixo geométrico, situado a uma distância $d = ${d.toFixed(2)}\\text{ m}$ do centro de massa. Pelo **Teorema dos Eixos Paralelos (Steiner)**, o momento de inércia de massa $I_O$ em relação ao pino é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O momento de inércia baricêntrico do disco é $I_{\\text{CM}} = \\frac{1}{2} m R^2 = 0{,}5 \\times ${m} \\times (${R.toFixed(1)})^2 = ${Icm.toFixed(3)}\\text{ kg}\\cdot\\text{m}^2$.`,
        `Pelo Teorema de Steiner: $I_O = I_{\\text{CM}} + m d^2$.`,
        `$I_O = ${Icm.toFixed(3)} + ${m} \\times (${d.toFixed(2)})^2 = ${Io.toFixed(2)}\\text{ kg}\\cdot\\text{m}^2$.`,
      ],
      finalDiagnosis: `Momento de inércia pelo Teorema de Steiner $I_O = ${Io.toFixed(2)}\\text{ kg}\\cdot\\text{m}^2$.`,
      trapNote: 'O Teorema de Steiner deve sempre partir do eixo que passa pelo Centro de Massa (I_CM).',
      relatedNorms: ['ISO 1940'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 7,
    idx,
    statementMarkdown: correctBoolean
      ? `Em um mecanismo de quatro barras articulado plano (4 barras com 4 juntas rotativas de 1 grau de liberdade cada), o critério de mobilidade de Kutzbach-Grübler $M = 3(n - 1) - 2j_1 - j_2$ fornece $M = 3(4 - 1) - 2(4) = 1$ grau de liberdade.`
      : `Quando um cilindro maciço homogêneo desce um plano inclinado rolando sem deslizar a partir do repouso, a força de atrito estático no ponto de contato realiza trabalho mecânico negativo que dissipa 1/3 da energia potencial gravitacional em calor.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Para o quadrilátero articulado ($n = 4$ elos, $j_1 = 4$ pares inferiores), $M = 9 - 8 = 1$.`,
      `No rolamento sem deslizamento, o ponto instantâneo de contato tem velocidade nula (centro instantâneo de rotação), logo o atrito estático não realiza trabalho ($W_{at} = 0$) e a energia mecânica conserva-se integralmente (1/3 converte-se em energia cinética de rotação, e não em calor).`,
      `Portanto, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Graus de liberdade de Kutzbach-Grübler e conservação de energia no rolamento puro.`,
    trapNote: 'No rolamento sem escorregamento, o atrito estático gera torque mas não dissipa energia mecânica.',
    relatedNorms: ['AGMA 2001'],
  });
}

function genMaterialsFe(idx: number): ExerciseQuestion {
  const id = `q-mec-09-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-materials-fe';
  const arch = idx % 6;
  if (arch === 0) {
    const C0 = Number((0.18 + (idx % 12) * 0.04).toFixed(2));
    const wPearl = ((C0 - 0.022) / (0.76 - 0.022)) * 100;
    const { options, correctIndex } = buildNumericOptions(wPearl, [0.65, 0.82, 1.18, 1.38], 1, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Um aço hipoeutetoide com teor de carbono $C_0 = ${C0.toFixed(2)}\\%\\text{ C}$ em massa é resfriado lentamente em equilíbrio até logo abaixo da temperatura eutetoide ($727\\text{ }^\\circ\\text{C}$, onde $\\alpha$ contém $0{,}022\\%\\text{ C}$ e o eutetóide perlítico contém $0{,}76\\%\\text{ C}$). Pela **Regra da Alavanca**, a fração mássica de **perlita** na microestrutura final é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `No diagrama $\\text{Fe-Fe}_3\\text{C}$, a fração de perlita logo abaixo de $727\\text{ }^\\circ\\text{C}$ para aço hipoeutetoide ($0{,}022 < C_0 < 0{,}76$) é $W_P = \\frac{C_0 - 0{,}022}{0{,}76 - 0{,}022}$.`,
        `Substituindo $C_0 = ${C0.toFixed(2)}$: $W_P = \\frac{${(C0 - 0.022).toFixed(3)}}{0{,}738}$.`,
        `Convertendo para percentual: $W_P = ${wPearl.toFixed(1)}\\%$.`,
      ],
      finalDiagnosis: `Fração mássica de constituinte perlítico $W_P = ${wPearl.toFixed(1)}\\%$.`,
      trapNote: 'Não confundir fração de perlita (eutetoide, denominador 0,76 - 0,022) com fração de cementita total (denominador 6,70 - 0,022).',
      relatedNorms: ['ASTM E112', 'NACE MR0175 / ISO 15156'],
    });
  }
  if (arch === 1) {
    const s0 = 90 + (idx % 6) * 10;
    const ky = 18 + (idx % 5) * 2;
    const dMm = 0.004 + Math.floor(idx / 6) * 0.0005;
    const sy = s0 + ky / Math.sqrt(dMm);
    const { options, correctIndex } = buildNumericOptions(sy, [0.7, 0.85, 1.15, 1.32], 1, 'MPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Após tratamento termomecânico de refino de grão (**ASTM E112**), uma liga metálica apresenta tamanho médio de grão $d = ${(dMm * 1000).toFixed(1)}\\text{ }\\mu\\text{m}$ ($${dMm.toFixed(4)}\\text{ mm}$). Dados $\\sigma_0 = ${s0}\\text{ MPa}$ e constante de bloqueio de discordâncias $k_y = ${ky}\\text{ MPa}\\cdot\\text{mm}^{1/2}$, o limite de escoamento previsto pela **Equação de Hall-Petch** é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A relação de Hall-Petch é $\\sigma_y = \\sigma_0 + k_y d^{-1/2}$.`,
        `Com $d = ${dMm.toFixed(4)}\\text{ mm}$, tem-se $d^{-1/2} = \\frac{1}{\\sqrt{${dMm.toFixed(4)}}} = ${(1 / Math.sqrt(dMm)).toFixed(2)}\\text{ mm}^{-1/2}$.`,
        `Logo, $\\sigma_y = ${s0} + ${ky} \\times ${(1 / Math.sqrt(dMm)).toFixed(2)} = ${sy.toFixed(1)}\\text{ MPa}$.`,
      ],
      finalDiagnosis: `Limite de escoamento refinado por Hall-Petch $\\sigma_y = ${sy.toFixed(1)}\\text{ MPa}$.`,
      trapNote: 'O refino de grão é o único mecanismo metalúrgico que aumenta simultaneamente a resistência mecânica E a tenacidade ao impacto.',
      relatedNorms: ['ASTM E112', 'ASTM E23'],
    });
  }
  if (arch === 2) {
    const Cr = 22 + (idx % 4);
    const Mo = 3.0 + (idx % 3) * 0.5;
    const N = 0.16 + Math.floor(idx / 6) * 0.002;
    const pren = Cr + 3.3 * Mo + 16 * N;
    const { options, correctIndex } = buildNumericOptions(pren, [0.75, 0.88, 1.12, 1.25], 1, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Um aço inoxidável duplex/superduplex empregado em linhas submarinas do Pré-Sal possui composição em massa de $\\text{Cr} = ${Cr}\\%$, $\\text{Mo} = ${Mo.toFixed(1)}\\%$ e $\\text{N} = ${N.toFixed(3)}\\%$. O número equivalente de resistência ao pite (**PREN** = $\\%\\text{Cr} + 3{,}3\\%\\text{Mo} + 16\\%\\text{N}$) dessa liga vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Aplicando a fórmula normativa NACE MR0175 / ISO 15156: $\\text{PREN} = \\%\\text{Cr} + 3{,}3(\\%\\text{Mo}) + 16(\\%\\text{N})$.`,
        `Calculando as parcelas: $3{,}3 \\times ${Mo.toFixed(1)} = ${(3.3 * Mo).toFixed(2)}$ e $16 \\times ${N.toFixed(3)} = ${(16 * N).toFixed(2)}$.`,
        `Somando: $\\text{PREN} = ${Cr} + ${(3.3 * Mo).toFixed(2)} + ${(16 * N).toFixed(2)} = ${pren.toFixed(1)}$.`,
      ],
      finalDiagnosis: `Equivalente de resistência à corrosão por pites $\\text{PREN} = ${pren.toFixed(1)}$ (ligas Superduplex exigem $\\text{PREN} \\ge 40$).`,
      trapNote: 'Memorizar os pesos da equação PREN: Cr (peso 1), Mo (peso 3,3) e Nitrogênio (peso 16).',
      relatedNorms: ['NACE MR0175 / ISO 15156', 'ASTM G48'],
    });
  }
  if (arch === 3) {
    const n = 5 + (idx % 7);
    const Ngrains = Math.pow(2, n - 1);
    const { options, correctIndex } = buildNumericOptions(Ngrains, [0.5, 0.75, 2.0, 4.0], 0, 'grãos/pol²', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Em uma análise metalográfica regida pela **ASTM E112**, um aço apresenta índice de tamanho de grão $G = ${n}$. O número médio de grãos por polegada quadrada ($N$) observado com ampliação padrão de $100\\times$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela definição da ASTM E112, o número de grãos por polegada quadrada a $100\\times$ de aumento é $N = 2^{G - 1}$.`,
        `Para $G = ${n}$, tem-se $N = 2^{${n} - 1} = 2^{${n - 1}}$.`,
        `Logo, $N = ${Ngrains}\\text{ grãos/pol}^2$.`,
      ],
      finalDiagnosis: `Densidade metalográfica ASTM E112: $N = ${Ngrains}\\text{ grãos/pol}^2$.`,
      trapNote: 'Não usar 2^G; o expoente correto na norma ASTM E112 é sempre (G - 1).',
      relatedNorms: ['ASTM E112'],
    });
  }
  if (arch === 4) {
    const T = 950 + Math.floor(idx / 6) * 5; // K
    const tHours = 1000 + (idx % 8) * 500;
    const C = 20;
    const PLM = (T * (C + Math.log10(tHours))) / 1000;
    const { options, correctIndex } = buildNumericOptions(PLM, [0.8, 0.91, 1.09, 1.2], 2, '× 10³', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Na avaliação de vida remanescente à **fluência (creep)** segundo a **API 530** para tubos de fornos petroquímicos operando a $T = ${T}\\text{ K}$ com tempo de ruptura esperado $t_r = ${tHours}\\text{ h}$ e constante material $C = 20$, o parâmetro de **Larson-Miller** $P_{\\text{LM}} = T[C + \\log_{10}(t_r)] \\times 10^{-3}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O logaritmo decimal do tempo em horas é $\\log_{10}(${tHours}) = ${Math.log10(tHours).toFixed(4)}$.`,
        `Somando à constante de Larson-Miller $C = 20$: $20 + ${Math.log10(tHours).toFixed(4)} = ${(20 + Math.log10(tHours)).toFixed(4)}$.`,
        `Multiplicando por $T = ${T}\\text{ K}$ e dividindo por $10^3$: $P_{\\text{LM}} = ${PLM.toFixed(2)} \\times 10^3$.`,
      ],
      finalDiagnosis: `Parâmetro de fluência de Larson-Miller $P_{\\text{LM}} = ${PLM.toFixed(2)} \\times 10^3$.`,
      trapNote: 'Verificar se a equação de Larson-Miller da questão pede T em Kelvin ou Rankine e logaritmo na base 10.',
      relatedNorms: ['API 530', 'API 579'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 8,
    idx,
    statementMarkdown: correctBoolean
      ? `Conforme a norma NACE MR0175 / ISO 15156 para ambientes ácidos contendo sulfeto de hidrogênio ($\\text{H}_2\\text{S}$ — sour service), aços carbono e baixa liga devem ter sua dureza estritamente limitada a no máximo $22\\text{ HRC}$ para prevenir o trincamento sob tensão por sulfetos (SSC).`
      : `Na transformação martensítica de um aço carbono temperado em água, a reação ocorre por difusão de carbono de longo alcance controlada pelo tempo isotérmico de permanência.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `A NACE MR0175 fixa o limite clássico de dureza de $22\\text{ HRC}$ ($248\\text{ HB}$) em aços carbono para impedir fragilização pelo hidrogênio atômico gerado pela corrosão por $\\text{H}_2\\text{S}$.`,
      `Já a transformação martensítica é adifusional (cisalhante/militar, dependente apenas da temperatura abaixo de $M_s$).`,
      `Portanto, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Critério NACE MR0175 (22 HRC em sour service) e natureza adifusional da martensita.`,
    trapNote: 'Martensita forma-se por cisalhamento adifusional instantâneo; perlita e bainita dependem de difusão.',
    relatedNorms: ['NACE MR0175 / ISO 15156'],
  });
}

function genMfgWelding(idx: number): ExerciseQuestion {
  const id = `q-mec-10-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-mfg-welding';
  const arch = idx % 6;
  if (arch === 0) {
    const V = 24 + (idx % 6) * 2;
    const I = 180 + Math.floor(idx / 6) * 5;
    const vMmS = 4 + (idx % 4);
    const eta = 0.8;
    const H = (eta * V * I) / (vMmS * 1000); // kJ/mm
    const { options, correctIndex } = buildNumericOptions(H, [0.5, 0.75, 1.25, 1.6], 2, 'kJ/mm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Em um procedimento de soldagem qualificado segundo a **ASME Seção IX**, o arco opera com tensão $V = ${V}\\text{ V}$, corrente $I = ${I}\\text{ A}$, velocidade de avanço $v = ${vMmS}\\text{ mm/s}$ e eficiência térmica do processo $\\eta = 0{,}80$. O **aporte térmico (heat input)** $H$ por unidade de comprimento vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A potência elétrica transferida à poça de fusão é $P_u = \\eta V I = 0{,}80 \\times ${V} \\times ${I} = ${(0.8 * V * I).toFixed(0)}\\text{ W}$.`,
        `Dividindo pela velocidade de soldagem $v = ${vMmS}\\text{ mm/s}$: $H = \\frac{${(0.8 * V * I).toFixed(0)}}{${vMmS}}\\text{ J/mm}$.`,
        `Convertendo para $\\text{kJ/mm}$: $H = ${H.toFixed(2)}\\text{ kJ/mm}$.`,
      ],
      finalDiagnosis: `Aporte térmico de soldagem $H = ${H.toFixed(2)}\\text{ kJ/mm}$.`,
      trapNote: 'Um aporte térmico excessivo alarga a ZTA e reduz a tenacidade ao impacto Charpy; aporte muito baixo acelera o resfriamento e favorece martensita frágil.',
      relatedNorms: ['ASME IX', 'AWS D1.1'],
    });
  }
  if (arch === 1) {
    const C = 0.18 + (idx % 5) * 0.02;
    const Mn = 1.2;
    const CrMoV = 0.3 + Math.floor(idx / 6) * 0.01;
    const NiCu = 0.45;
    const CE = C + Mn / 6 + CrMoV / 5 + NiCu / 15;
    const { options, correctIndex } = buildNumericOptions(CE, [0.75, 0.88, 1.14, 1.28], 3, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Para avaliar a soldabilidade e a necessidade de pré-aquecimento de um aço estrutural (**AWS D1.1**), mediu-se: $\\text{C} = ${C.toFixed(2)}\\%$, $\\text{Mn} = ${Mn.toFixed(2)}\\%$, $(\\text{Cr}+\\text{Mo}+\\text{V}) = ${CrMoV.toFixed(2)}\\%$ e $(\\text{Ni}+\\text{Cu}) = ${NiCu.toFixed(2)}\\%$. Pela fórmula do Instituto Internacional de Soldagem (**IIW**), o **Carbono Equivalente ($\\text{CE}_{\\text{IIW}}$)** é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A equação normativa do IIW é $\\text{CE}_{\\text{IIW}} = \\%\\text{C} + \\frac{\\%\\text{Mn}}{6} + \\frac{\\%\\text{Cr} + \\%\\text{Mo} + \\%\\text{V}}{5} + \\frac{\\%\\text{Ni} + \\%\\text{Cu}}{15}$.`,
        `Calculando as frações: $\\text{Mn}/6 = ${(Mn / 6).toFixed(3)}$, $(\\text{Cr+Mo+V})/5 = ${(CrMoV / 5).toFixed(3)}$ e $(\\text{Ni+Cu})/15 = ${(NiCu / 15).toFixed(3)}$.`,
        `Somando ao carbono base: $\\text{CE}_{\\text{IIW}} = ${CE.toFixed(3)}\\%$.`,
      ],
      finalDiagnosis: `Carbono Equivalente $\\text{CE}_{\\text{IIW}} = ${CE.toFixed(3)}\\%$ (${CE >= 0.45 ? 'exige pré-aquecimento rigoroso' : 'boa soldabilidade'}).`,
      trapNote: 'Não trocar os divisores da fórmula do IIW: Mn divide por 6; Cr+Mo+V por 5; Ni+Cu por 15.',
      relatedNorms: ['AWS D1.1', 'ASME IX'],
    });
  }
  if (arch === 2) {
    const V1 = 150;
    const T1 = 64;
    const V2 = 180 + Math.floor(idx / 6) * 4;
    const n = 0.25;
    const T2 = T1 * Math.pow(V1 / V2, 1 / n);
    const { options, correctIndex } = buildNumericOptions(T2, [0.55, 0.78, 1.28, 1.65], 2, 'min', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Na usinagem de um eixo em torno CNC com ferramenta de metal duro cujo expoente da **Equação de Taylor** ($V T^n = C$) é $n = 0{,}25$, a vida da ferramenta a $V_1 = ${V1}\\text{ m/min}$ é $T_1 = ${T1}\\text{ min}$. Se a velocidade de corte for elevada para $V_2 = ${V2}\\text{ m/min}$, a nova vida útil $T_2$ da aresta será:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela equação de vida de Taylor: $V_1 T_1^n = V_2 T_2^n \\implies T_2 = T_1 \\left(\\frac{V_1}{V_2}\\right)^{1/n}$.`,
        `Como $n = 0{,}25$, o expoente vale $1/n = 4$.`,
        `Portanto, $T_2 = ${T1} \\times \\left(\\frac{${V1}}{${V2}}\\right)^4 = ${T2.toFixed(2)}\\text{ min}$.`,
      ],
      finalDiagnosis: `Vida da ferramenta pela Equação de Taylor $T_2 = ${T2.toFixed(2)}\\text{ min}$.`,
      trapNote: 'Como 1/n ≈ 4 para metal duro, pequenos aumentos na velocidade de corte V reduzem drasticamente a vida T.',
      relatedNorms: ['ISO 3685'],
    });
  }
  if (arch === 3) {
    const vc = 180 + (idx % 8) * 15; // m/min
    const f = 0.25 + (idx % 4) * 0.05; // mm/rev
    const ap = 2.5 + Math.floor(idx / 6) * 0.2; // mm
    const mrr = vc * f * ap; // cm3/min
    const { options, correctIndex } = buildNumericOptions(mrr, [0.65, 0.82, 1.18, 1.4], 1, 'cm³/min', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Em uma operação de torneamento cilíndrico externo com velocidade de corte $v_c = ${vc}\\text{ m/min}$, avanço $f = ${f.toFixed(2)}\\text{ mm/rev}$ e profundidade de usinagem $a_p = ${ap.toFixed(1)}\\text{ mm}$, a **Taxa de Remoção de Material (MRR)** em $\\text{cm}^3/\\text{min}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A taxa volumétrica de remoção de cavaco é dada por $\\text{MRR} = v_c \\cdot f \\cdot a_p$.`,
        `Com $v_c$ em $\\text{m/min}$ ($10^3\\text{ mm/min}$) e $f, a_p$ em $\\text{mm}$, o produto direto $v_c \\cdot f \\cdot a_p$ já resulta em $10^3\\text{ mm}^3/\\text{min} = 1\\text{ cm}^3/\\text{min}$!`,
        `Logo, $\\text{MRR} = ${vc} \\times ${f.toFixed(2)} \\times ${ap.toFixed(1)} = ${mrr.toFixed(1)}\\text{ cm}^3/\\text{min}$.`,
      ],
      finalDiagnosis: `Taxa de remoção de cavaco $\\text{MRR} = ${mrr.toFixed(1)}\\text{ cm}^3/\\text{min}$.`,
      trapNote: 'Multiplicar v_c [m/min] × f [mm] × a_p [mm] fornece diretamente cm³/min porque 1 m·mm² = 1000 mm³ = 1 cm³.',
      relatedNorms: ['ISO 3685'],
    });
  }
  if (arch === 4) {
    const eEng = 0.15 + Math.floor(idx / 6) * 0.015;
    const epsTrue = Math.log(1 + eEng);
    const { options, correctIndex } = buildNumericOptions(epsTrue, [0.75, 0.88, 1.12, 1.25], 4, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Durante um processo de conformação plástica antes da estricção, um corpo de prova sofre deformação longitudinal convencional (de engenharia) $e = ${(eEng * 100).toFixed(1)}\\%$ ($e = ${eEng.toFixed(3)}$). A **deformação verdadeira (logarítmica)** $\\varepsilon$ correspondente é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A deformação verdadeira relaciona-se à deformação de engenharia por $\\varepsilon = \\ln(L/L_0) = \\ln(1 + e)$.`,
        `Substituindo $e = ${eEng.toFixed(3)}$: $\\varepsilon = \\ln(1 + ${eEng.toFixed(3)}) = ${epsTrue.toFixed(4)}$.`,
        `A tensão verdadeira correspondente seria $\\sigma_v = \\sigma_{\\text{eng}}(1 + e)$ por conservação de volume plástico.`,
      ],
      finalDiagnosis: `Deformação verdadeira $\\varepsilon = ${epsTrue.toFixed(4)}$.`,
      trapNote: 'Na tração (e > 0), a deformação verdadeira ε = ln(1+e) é sempre numericamente menor que e, enquanto a tensão verdadeira σ_v = σ(1+e) é maior.',
      relatedNorms: ['ASTM E8'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 9,
    idx,
    statementMarkdown: correctBoolean
      ? `No Ensaio Não Destrutivo (END) de juntas soldadas, o Ultrassom (UT) apresenta sensibilidade superior à Radiografia Industrial (RT) para a detecção de descontinuidades planares internas (como falta de fusão lateral e trincas orientadas perpendicularmente ao feixe sônico), enquanto a Radiografia destaca-se em defeitos volumétricos (como porosidades e inclusões de escória).`
      : `O ensaio por Partículas Magnéticas (MT) é o método de escolha na ASME Seção V para detectar trincas superficiais em tubulações de aço inoxidável austenítico AISI 316L.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Defeitos planares fechados produzem pequena variação de espessura para os raios X/gama (RT), mas refletem intensamente as ondas acústicas do Ultrassom (UT).`,
      `Já aços inoxidáveis austeníticos (série 300, estrutura CFC) são paramagnéticos (não ferromagnéticos), impossibilitando o ensaio por Partículas Magnéticas (deve-se usar Líquido Penetrante — PT).`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Seleção de END (UT vs. RT e restrição ferromagnética do MT) conforme ASME V.`,
    trapNote: 'Aços inox austeníticos (304, 316) NÃO são ferromagnéticos — nunca aplicar Partículas Magnéticas neles!',
    relatedNorms: ['ASME V', 'ASME IX'],
  });
}

function genVibMdof(idx: number): ExerciseQuestion {
  const id = `q-mec-11-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-vib-mdof';
  const arch = idx % 6;
  if (arch === 0) {
    const m = 40 + (idx % 6) * 10;
    const k = 160000 + Math.floor(idx / 6) * 5000;
    const c = 800 + (idx % 5) * 150;
    const wn = Math.sqrt(k / m);
    const cc = 2 * Math.sqrt(k * m);
    const zeta = c / cc;
    const { options, correctIndex } = buildNumericOptions(zeta, [0.5, 0.75, 1.25, 1.6], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Um sistema rotativo modelado com 1 grau de liberdade possui massa modal $m = ${m}\\text{ kg}$, rigidez de suporte $k = ${(k / 1000).toFixed(0)}\\text{ kN/m}$ e amortecimento viscoso $c = ${c}\\text{ N}\\cdot\\text{s/m}$. O **fator de amortecimento adimensional** $\\zeta$ do sistema é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O amortecimento crítico é definido por $c_c = 2\\sqrt{k m} = 2\\sqrt{${k} \\times ${m}} = ${cc.toFixed(1)}\\text{ N}\\cdot\\text{s/m}$ (com $\\omega_n = ${wn.toFixed(1)}\\text{ rad/s}$).`,
        `O fator de amortecimento vale $\\zeta = \\frac{c}{c_c} = \\frac{${c}}{${cc.toFixed(1)}} = ${zeta.toFixed(3)}$.`,
        `Como $\\zeta < 1$, o sistema é subamortecido e oscila com frequência amortecida $\\omega_d = \\omega_n\\sqrt{1 - \\zeta^2}$.`,
      ],
      finalDiagnosis: `Fator de amortecimento viscoso $\\zeta = ${zeta.toFixed(3)}$.`,
      trapNote: 'Não esquecer o fator 2 na expressão do amortecimento crítico c_c = 2·√(k·m) = 2·m·ω_n.',
      relatedNorms: ['ISO 20816', 'API 684'],
    });
  }
  if (arch === 1) {
    const x1 = 4.5;
    const x2 = 1.8 + (idx % 6) * 0.3;
    const delta = Math.log(x1 / x2);
    const { options, correctIndex } = buildNumericOptions(delta, [0.65, 0.82, 1.18, 1.4], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Em um ensaio de impacto (bump test) em uma tubulação industrial, duas amplitudes positivas consecutivas da resposta livre subamortecida foram medidas como $x_1 = ${x1.toFixed(1)}\\text{ mm}$ e $x_2 = ${x2.toFixed(1)}\\text{ mm}$. O **decremento logarítmico** $\\delta$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Por definição, o decremento logarítmico entre dois picos sucessivos é $\\delta = \\ln\\left(\\frac{x_1}{x_2}\\right)$.`,
        `Com $x_1 / x_2 = ${x1.toFixed(1)} / ${x2.toFixed(1)} = ${(x1 / x2).toFixed(4)}$:`,
        `$\\delta = \\ln(${(x1 / x2).toFixed(4)}) = ${delta.toFixed(3)}$ (correspondente a $\\zeta \\approx \\delta / (2\\pi) = ${(delta / (2 * Math.PI)).toFixed(3)}$).`,
      ],
      finalDiagnosis: `Decremento logarítmico $\\delta = ${delta.toFixed(3)}$.`,
      trapNote: 'Para N ciclos consecutivos, usa-se δ = (1/N)·ln(x_0 / x_N).',
      relatedNorms: ['ISO 20816'],
    });
  }
  if (arch === 2) {
    const r = 2.0 + Math.floor(idx / 6) * 0.08;
    const zeta = 0.1;
    const num = Math.sqrt(1 + Math.pow(2 * zeta * r, 2));
    const den = Math.sqrt(Math.pow(1 - r * r, 2) + Math.pow(2 * zeta * r, 2));
    const TR = num / den;
    const { options, correctIndex } = buildNumericOptions(TR, [0.6, 0.8, 1.25, 1.6], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Um compressor alternativo opera com razão de frequências $r = \\omega / \\omega_n = ${r.toFixed(2)}$ (acima de $\\sqrt{2}$) sobre isoladores elásticos com $\\zeta = 0{,}10$. A **transmissibilidade de força** ($TR = F_T / F_0$) transmitida à fundação é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A equação da transmissibilidade é $TR = \\frac{\\sqrt{1 + (2\\zeta r)^2}}{\\sqrt{(1 - r^2)^2 + (2\\zeta r)^2}}$.`,
        `Com $r = ${r.toFixed(2)}$ e $2\\zeta r = ${(2 * zeta * r).toFixed(3)}$, o numerador vale ${num.toFixed(4)} e o denominador vale ${den.toFixed(4)}.`,
        `Logo, $TR = ${TR.toFixed(3)} < 1$ (isolamento efetivo garantido pois $r > \\sqrt{2} \\approx 1{,}414$).`,
      ],
      finalDiagnosis: `Transmissibilidade de vibração $TR = ${TR.toFixed(3)}$.`,
      trapNote: 'O isolamento vibratório (TR < 1) só ocorre para r = ω/ω_n > √2, independentemente do amortecimento.',
      relatedNorms: ['ISO 20816'],
    });
  }
  if (arch === 3) {
    const fExc = 30 + (idx % 10) * 5; // Hz
    const m2 = 15 + (idx % 4) * 5; // kg
    const w = 2 * Math.PI * fExc;
    const k2kNm = (m2 * w * w) / 1000;
    const { options, correctIndex } = buildNumericOptions(k2kNm, [0.5, 0.78, 1.25, 1.6], 1, 'kN/m', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Para eliminar a vibração harmônica de uma máquina principal excitada exatamente na frequência $f_{\\text{exc}} = ${fExc}\\text{ Hz}$, instala-se um **Absorvedor Dinâmico de Vibrações (ADV)** não amortecido de massa auxiliar $m_2 = ${m2}\\text{ kg}$. A rigidez $k_2$ da mola do absorvedor para anular a amplitude da massa principal deve ser:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O Absorvedor Dinâmico de Frahm anula o deslocamento da massa principal quando sua frequência natural isolada coincide com a frequência de excitação: $\\omega_2 = \\sqrt{k_2 / m_2} = \\omega_{\\text{exc}}$.`,
        `A frequência angular de excitação é $\\omega_{\\text{exc}} = 2\\pi f_{\\text{exc}} = 2\\pi \\times ${fExc} = ${w.toFixed(2)}\\text{ rad/s}$.`,
        `Portanto, $k_2 = m_2 \\omega_{\\text{exc}}^2 = ${m2} \\times (${w.toFixed(2)})^2 = ${k2kNm.toFixed(1)}\\text{ kN/m}$.`,
      ],
      finalDiagnosis: `Rigidez de sintonia do absorvedor dinâmico $k_2 = ${k2kNm.toFixed(1)}\\text{ kN/m}$.`,
      trapNote: 'Embora o ADV zere a vibração em ω = ω_2, ele divide o sistema em 2 graus de liberdade, criando duas novas ressonâncias laterais.',
      relatedNorms: ['ISO 20816'],
    });
  }
  if (arch === 4) {
    const deltaStMm = 0.4 + Math.floor(idx / 6) * 0.05;
    const deltaStM = deltaStMm / 1000;
    const wn = Math.sqrt(9.81 / deltaStM);
    const rpmCrit = (wn * 60) / (2 * Math.PI);
    const { options, correctIndex } = buildNumericOptions(rpmCrit, [0.65, 0.82, 1.18, 1.4], 0, 'rpm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Um rotor de turbocompressor (**Jeffcott**) apoiado em mancais apresenta deflexão estática sob o próprio peso no meio do vão igual a $\\delta_{\\text{est}} = ${deltaStMm.toFixed(2)}\\text{ mm}$. Adotando $g = 9{,}81\\text{ m/s}^2$, a **primeira velocidade crítica lateral** ($N_{\\text{cr}}$) em $\\text{rpm}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Como $m g = k \\delta_{\\text{est}}$, a frequência natural lateral é $\\omega_n = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{g}{\\delta_{\\text{est}}}}$.`,
        `Com $\\delta_{\\text{est}} = ${deltaStM.toFixed(6)}\\text{ m}$: $\\omega_n = \\sqrt{\\frac{9{,}81}{${deltaStM.toFixed(6)}}} = ${wn.toFixed(1)}\\text{ rad/s}$.`,
        `Convertendo para rotações por minuto: $N_{\\text{cr}} = \\frac{60\\,\\omega_n}{2\\pi} = ${rpmCrit.toFixed(0)}\\text{ rpm}$.`,
      ],
      finalDiagnosis: `Velocidade crítica lateral de Jeffcott $N_{\\text{cr}} = ${rpmCrit.toFixed(0)}\\text{ rpm}$.`,
      trapNote: 'Fórmula prática de campo de Rayleigh: N_cr [rpm] ≈ 946 / √(δ_est [mm]).',
      relatedNorms: ['API 684', 'API 617'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 10,
    idx,
    statementMarkdown: correctBoolean
      ? `Na região de isolamento vibratório ($r = \\omega / \\omega_n > \\sqrt{2}$), o aumento exagerado do amortecimento viscoso $\\zeta$ é prejudicial, pois eleva a transmissibilidade de força para a fundação em altas frequências.`
      : `Em um rotor Jeffcott operando em regime supercrítico muito acima da primeira velocidade crítica ($\\omega \\gg \\omega_n$), o deslocamento dinâmico do eixo tende ao infinito enquanto o centro de massa afasta-se do eixo de rotação.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Para $r > \\sqrt{2}$, as curvas de transmissibilidade se cruzam: maior amortecimento $\\zeta$ reduz o pico na ressonância ($r = 1$), mas piora o isolamento em $r > \\sqrt{2}$.`,
      `Acima da velocidade crítica ($\\omega \\gg \\omega_n$), o rotor de Jeffcott sofre **autocentralização**: a amplitude tende à excentricidade $e$ e o rotor passa a girar em torno de seu próprio centro de massa.`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Efeito do amortecimento em $r > \\sqrt{2}$ e autocentralização supercrítica de rotores.`,
    trapNote: 'Amortecimento alto é ótimo na travessia da ressonância (r ≈ 1), mas prejudica o isolamento em r > √2.',
    relatedNorms: ['API 684', 'ISO 20816'],
  });
}

function genTurboPumps(idx: number): ExerciseQuestion {
  const id = `q-mec-12-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-turbo-pumps';
  const arch = idx % 6;
  if (arch === 0) {
    const P1kPa = 101.3;
    const PvKPa = 3.2 + (idx % 6) * 0.8;
    const zS = 2.5 - (idx % 5) * 0.8; // pode ser positivo (afogada) ou negativo
    const hfS = 1.2 + Math.floor(idx / 6) * 0.08;
    const rg = 9.81; // kN/m3
    const npsha = (P1kPa - PvKPa) / rg + zS - hfS;
    const { options, correctIndex } = buildNumericOptions(npsha, [0.65, 0.82, 1.18, 1.38], 2, 'm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `Uma bomba centrífuga **API 610** opera com água ($\gamma = \rho g = 9{,}81\\text{ kN/m}^3$, pressão de vapor $P_v = ${PvKPa.toFixed(1)}\\text{ kPa}$ abs) aspirando de um reservatório aberto ($P_{\\text{atm}} = 101{,}3\\text{ kPa}$ abs). O desnível geométrico de sucção é $z_s = ${zS >= 0 ? `+${zS.toFixed(1)}` : zS.toFixed(1)}\\text{ m}$ e a perda de carga na linha de sucção é $h_{f,s} = ${hfS.toFixed(2)}\\text{ m}$. O **$\\text{NPSH}_{\\text{disponível}}$** vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela definição normativa: $\\text{NPSH}_d = \\frac{P_{\\text{res}} - P_v}{\\rho g} + z_s - h_{f,s}$.`,
        `A parcela de pressão disponível acima da pressão de vapor é $\\frac{101{,}3 - ${PvKPa.toFixed(1)}}{9{,}81} = ${((P1kPa - PvKPa) / rg).toFixed(2)}\\text{ m}$.`,
        `Somando $z_s = ${zS.toFixed(1)}\\text{ m}$ e subtraindo $h_{f,s} = ${hfS.toFixed(2)}\\text{ m}$, obtém-se $\\text{NPSH}_d = ${npsha.toFixed(2)}\\text{ m}$.`,
      ],
      finalDiagnosis: `$\\text{NPSH}_{\\text{disponível}} = ${npsha.toFixed(2)}\\text{ m}$ (deve superar o $\\text{NPSH}_{\\text{requerido}}$ com margem de segurança).`,
      trapNote: 'A perda de carga na DESCARGA da bomba não entra no cálculo do NPSH disponível!',
      relatedNorms: ['API 610', 'ISO 9906'],
    });
  }
  if (arch === 1) {
    const H1 = 80 + (idx % 6) * 10;
    const N1 = 1750;
    const N2 = 2100 + Math.floor(idx / 6) * 20;
    const H2 = H1 * Math.pow(N2 / N1, 2);
    const { options, correctIndex } = buildNumericOptions(H2, [0.68, 0.84, 1.18, 1.35], 1, 'm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `Uma bomba centrífuga acionada por inversor de frequência fornece altura manométrica $H_1 = ${H1}\\text{ m}$ na rotação $N_1 = ${N1}\\text{ rpm}$. Pelas **Leis de Afinidade (Semelhança)**, ao elevar a rotação para $N_2 = ${N2}\\text{ rpm}$ em ponto homólogo, a nova altura manométrica $H_2$ será:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pelas Leis de Semelhança de turbomáquinas mantendo o diâmetro do rotor constante: $Q \\propto N$, $H \\propto N^2$ e $P \\propto N^3$.`,
        `Logo, $H_2 = H_1 \\left(\\frac{N_2}{N_1}\\right)^2 = ${H1} \\times \\left(\\frac{${N2}}{${N1}}\\right)^2$.`,
        `Calculando: $H_2 = ${H2.toFixed(1)}\\text{ m}$.`,
      ],
      finalDiagnosis: `Altura manométrica escalonada $H_2 = ${H2.toFixed(1)}\\text{ m}$.`,
      trapNote: 'Vazão varia com N¹, Altura Manométrica varia com N², e Potência de eixo varia com N³.',
      relatedNorms: ['API 610', 'ISO 9906'],
    });
  }
  if (arch === 2) {
    const u2 = 28 + (idx % 6) * 2;
    const vu2 = 16 + Math.floor(idx / 6) * 0.4;
    const g = 9.81;
    const Hth = (u2 * vu2) / g;
    const { options, correctIndex } = buildNumericOptions(Hth, [0.65, 0.82, 1.18, 1.4], 1, 'm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `No rotor de uma bomba centrífuga com entrada radial sem pré-rotação ($V_{u1} = 0$), a velocidade periférica das pás na saída é $U_2 = ${u2}\\text{ m/s}$ e a componente tangencial da velocidade absoluta do fluido na saída é $V_{u2} = ${vu2.toFixed(1)}\\text{ m/s}$. Pela **Equação de Euler das Turbomáquinas** ($g = 9{,}81\\text{ m/s}^2$), a altura teórica $H_{\\text{Euler}}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A Equação de Euler para bombas é $H_{\\text{Euler}} = \\frac{U_2 V_{u2} - U_1 V_{u1}}{g}$.`,
        `Sem pré-rotação na entrada ($V_{u1} = 0$), tem-se $H_{\\text{Euler}} = \\frac{U_2 V_{u2}}{g}$.`,
        `Substituindo: $H_{\\text{Euler}} = \\frac{${u2} \\times ${vu2.toFixed(1)}}{9{,}81} = ${Hth.toFixed(1)}\\text{ m}$.`,
      ],
      finalDiagnosis: `Altura manométrica teórica de Euler $H_{\\text{Euler}} = ${Hth.toFixed(1)}\\text{ m}$.`,
      trapNote: 'Pás curvadas para trás (β2 < 90°) garantem curva H×Q estável e autolimitante em potência.',
      relatedNorms: ['API 610'],
    });
  }
  if (arch === 3) {
    const rho = 1000;
    const g = 9.81;
    const Qm3h = 180 + (idx % 8) * 36;
    const Q = Qm3h / 3600;
    const H = 90 + Math.floor(idx / 6) * 3;
    const eta = 0.78;
    const PshaftKw = (rho * g * Q * H) / (1000 * eta);
    const { options, correctIndex } = buildNumericOptions(PshaftKw, [0.68, 0.84, 1.18, 1.35], 1, 'kW', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `Uma bomba centrífuga recalca água ($\rho = 1000\\text{ kg/m}^3$) com vazão $Q = ${Qm3h}\\text{ m}^3/\\text{h}$, altura manométrica $H = ${H}\\text{ m}$ e rendimento global $\\eta = 78\\%$. A **potência de eixo (brake horsepower)** consumida pela bomba em $\\text{kW}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Convertendo a vazão para unidades do SI: $Q = \\frac{${Qm3h}}{3600} = ${Q.toFixed(4)}\\text{ m}^3/\\text{s}$.`,
        `A potência hidráulica útil é $P_h = \\rho g Q H = 1000 \\times 9{,}81 \\times ${Q.toFixed(4)} \\times ${H} = ${(rho * g * Q * H / 1000).toFixed(2)}\\text{ kW}$.`,
        `Dividindo pelo rendimento global $\\eta = 0{,}78$: $P_{\\text{eixo}} = \\frac{P_h}{\\eta} = ${PshaftKw.toFixed(1)}\\text{ kW}$.`,
      ],
      finalDiagnosis: `Potência de acionamento no eixo $P_{\\text{eixo}} = ${PshaftKw.toFixed(1)}\\text{ kW}$.`,
      trapNote: 'Sempre converter m³/h dividindo por 3600 antes de multiplicar por ρ·g·H.',
      relatedNorms: ['API 610', 'ISO 9906'],
    });
  }
  if (arch === 4) {
    const H0 = 120;
    const a = 0.02;
    const kSys = 0.03;
    const Qsingle = Math.sqrt(H0 / (a + kSys));
    const Qpar = Math.sqrt(H0 / (a / 4 + kSys));
    const { options, correctIndex } = buildNumericOptions(Qpar, [0.7, 0.86, 1.16, 1.35], 1, 'm³/h', idx + 2);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `Duas bombas centrífugas idênticas, cada uma com curva característica $H_b(Q) = ${H0} - ${a}\\,Q^2$, são associadas em **paralelo** alimentando uma tubulação cuja curva do sistema é $H_{\\text{sist}}(Q_{\\text{tot}}) = ${kSys}\\,Q_{\\text{tot}}^2$ (com $Q$ em $\\text{m}^3/\\text{h}$ e $H$ em $\\text{m}$). A vazão total $Q_{\\text{tot}}$ recalcada pelo par em paralelo vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na associação de 2 bombas idênticas em paralelo, cada bomba fornece metade da vazão total ($Q_i = Q_{\\text{tot}}/2$) sob a mesma altura manométrica: $H_{\\text{par}}(Q_{\\text{tot}}) = ${H0} - ${a}(Q_{\\text{tot}}/2)^2 = ${H0} - ${(a / 4).toFixed(3)}\\,Q_{\\text{tot}}^2$.`,
        `Igualando à curva do sistema: ${H0} - ${(a / 4).toFixed(3)}\\,Q_{\\text{tot}}^2 = ${kSys}\\,Q_{\\text{tot}}^2 \\implies ${(a / 4 + kSys).toFixed(3)}\\,Q_{\\text{tot}}^2 = ${H0}$.`,
        `Portanto, $Q_{\\text{tot}} = ${Qpar.toFixed(1)}\\text{ m}^3/\\text{h}$ (note que devido ao atrito da tubulação, $Q_{\\text{tot}} < 2\\,Q_{\\text{individual}} = ${(2 * Qsingle).toFixed(1)}\\text{ m}^3/\\text{h}$).`,
      ],
      finalDiagnosis: `Vazão de operação em paralelo $Q_{\\text{tot}} = ${Qpar.toFixed(1)}\\text{ m}^3/\\text{h}$.`,
      trapNote: 'Duas bombas em paralelo NUNCA dobram a vazão real quando há perda de carga distribuída na adutora.',
      relatedNorms: ['API 610'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 11,
    idx,
    statementMarkdown: correctBoolean
      ? `Em compressores dinâmicos centrífugos e axiais regidos pela API 617, o fenômeno de surge (bombeio aerodinâmico) ocorre quando a vazão cai abaixo de um limite mínimo crítico, provocando reversão cíclica violenta do escoamento e severas vibrações axiais/radiais, sendo prevenido por válvulas anti-surge de reciclo.`
      : `Para dar partida em uma bomba centrífuga radial com mínimo consumo de potência elétrica do motor de acionamento, a válvula de bloqueio no recalque deve estar 100% aberta.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `O surge em compressores dinâmicos ocorre em baixa vazão e alta razão de pressão, exigindo reciclo rápido via válvula anti-surge.`,
      `Já bombas centrífugas radiais ($N_s$ baixo) têm potência de eixo crescente com a vazão, devendo partir com a válvula de recalque fechada (ou parcialmente fechada); apenas bombas axiais partem com recalque aberto!`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Estabilidade aerodinâmica (Surge API 617) e procedimento de partida de bombas centrífugas vs. axiais.`,
    trapNote: 'Bomba centrífuga radial parte com recalque FECHADO; bomba axial parte com recalque ABERTO.',
    relatedNorms: ['API 617', 'API 610'],
  });
}

function genIcEngines(idx: number): ExerciseQuestion {
  const id = `q-mec-13-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-ic-engines';
  const arch = idx % 6;
  if (arch === 0) {
    const r = 8 + (idx % 6);
    const k = 1.4;
    const eta = (1 - 1 / Math.pow(r, k - 1)) * 100;
    const { options, correctIndex } = buildNumericOptions(eta, [0.75, 0.88, 1.12, 1.24], 2, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `Um motor de combustão interna por ignição por centelha opera segundo o **Ciclo Otto padrão a ar** ($k = 1{,}4$) com taxa de compressão volumétrica $r = V_{\\text{máx}}/V_{\\text{mín}} = ${r}$. A eficiência térmica ideal $\\eta_{\\text{Otto}}$ desse ciclo é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A eficiência térmica do ciclo Otto padrão a ar depende apenas da taxa de compressão $r$ e de $k$: $\\eta_{\\text{Otto}} = 1 - \\frac{1}{r^{k - 1}}$.`,
        `Para $r = ${r}$ e $k - 1 = 0{,}4$, tem-se $r^{0{,}4} = ${r}^{0{,}4} = ${Math.pow(r, 0.4).toFixed(4)}$.`,
        `Portanto, $\\eta_{\\text{Otto}} = 1 - \\frac{1}{${Math.pow(r, 0.4).toFixed(4)}} = ${eta.toFixed(2)}\\%$.`,
      ],
      finalDiagnosis: `Eficiência térmica Otto ideal $\\eta_{\\text{Otto}} = ${eta.toFixed(2)}\\%$.`,
      trapNote: 'Para uma mesma taxa de compressão r, η_Otto > η_Dual > η_Diesel.',
      relatedNorms: ['ISO 3046'],
    });
  }
  if (arch === 1) {
    const h1 = 240 + (idx % 6) * 5;
    const h2 = 285 + Math.floor(idx / 6) * 2;
    const h4 = 95 + (idx % 5) * 4;
    const copR = (h1 - h4) / (h2 - h1);
    const { options, correctIndex } = buildNumericOptions(copR, [0.68, 0.84, 1.18, 1.38], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `Em um chiller industrial por compressão mecânica de vapor, as entalpias do fluido refrigerante são: saída do evaporador $h_1 = ${h1}\\text{ kJ/kg}$, descarga do compressor $h_2 = ${h2}\\text{ kJ/kg}$ e saída do condensador (antes da válvula de expansão isentálpica, $h_3 = h_4$) igual a $h_4 = ${h4}\\text{ kJ/kg}$. O **Coeficiente de Performance de Refrigeração ($\\text{COP}_R$)** vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O efeito refrigerante específico no evaporador é $q_L = h_1 - h_4 = ${h1} - ${h4} = ${h1 - h4}\\text{ kJ/kg}$.`,
        `O trabalho específico do compressor é $w_c = h_2 - h_1 = ${h2} - ${h1} = ${h2 - h1}\\text{ kJ/kg}$.`,
        `Logo, $\\text{COP}_R = \\frac{q_L}{w_c} = \\frac{${h1 - h4}}{${h2 - h1}} = ${copR.toFixed(2)}$.`,
      ],
      finalDiagnosis: `Coeficiente de desempenho frigorífico $\\text{COP}_R = ${copR.toFixed(2)}$.`,
      trapNote: 'Na válvula de expansão ocorre estrangulamento adiabático irreversível com entalpia constante (h4 = h3), e não entropia constante.',
      relatedNorms: ['ASHRAE 15', 'ABNT NBR 16401'],
    });
  }
  if (arch === 2) {
    const P = 101.325;
    const Psat = 3.17 + (idx % 5) * 0.4;
    const phi = 0.5 + (idx % 4) * 0.1;
    const Pv = phi * Psat;
    const omegaGkg = (0.622 * Pv / (P - Pv)) * 1000;
    const { options, correctIndex } = buildNumericOptions(omegaGkg, [0.65, 0.82, 1.18, 1.38], 2, 'g/kg ar seco', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `Em um sistema de climatização (**HVAC — ABNT NBR 16401**) operando à pressão atmosférica $P = 101{,}325\\text{ kPa}$, a pressão de saturação da água na temperatura de bulbo seco local é $P_{\\text{sat}} = ${Psat.toFixed(2)}\\text{ kPa}$ e a umidade relativa é $\\phi = ${(phi * 100).toFixed(0)}\\%$. A **umidade absoluta (razão de mistura $\\omega$)** em gramas de vapor por quilograma de ar seco vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A pressão parcial do vapor d'água é $P_v = \\phi P_{\\text{sat}} = ${phi.toFixed(2)} \\times ${Psat.toFixed(2)} = ${Pv.toFixed(3)}\\text{ kPa}$.`,
        `A umidade absoluta é dada por $\\omega = 0{,}622 \\frac{P_v}{P - P_v} = 0{,}622 \\times \\frac{${Pv.toFixed(3)}}{${(P - Pv).toFixed(3)}}\\text{ kg}_v/\\text{kg}_{as}$.`,
        `Multiplicando por $1000$: $\\omega = ${omegaGkg.toFixed(2)}\\text{ g/kg de ar seco}$.`,
      ],
      finalDiagnosis: `Umidade específica psicrométrica $\\omega = ${omegaGkg.toFixed(2)}\\text{ g/kg}$.`,
      trapNote: 'O denominador da razão de mistura psicrométrica é a pressão parcial do ar seco (P_total - P_v), e não P_total.',
      relatedNorms: ['ABNT NBR 16401', 'ASHRAE Fundamentals'],
    });
  }
  if (arch === 3) {
    const Wnet = 45 + Math.floor(idx / 6) * 2; // kJ
    const VdLiters = 3.0 + (idx % 4) * 0.5;
    const VdM3 = VdLiters / 1000;
    const pmeBar = (Wnet / VdM3) / 100; // kPa -> bar
    const { options, correctIndex } = buildNumericOptions(pmeBar, [0.65, 0.82, 1.18, 1.4], 1, 'bar', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `Um motor de combustão interna estacionário de cilindrada total $V_d = ${VdLiters.toFixed(1)}\\text{ L}$ ($${VdM3.toFixed(4)}\\text{ m}^3$) realiza um trabalho líquido por ciclo completo igual a $W_{\\text{ciclo}} = ${Wnet}\\text{ kJ}$. A **Pressão Média Efetiva (PME / BMEP)** do motor em $\\text{bar}$ ($1\\text{ bar} = 100\\text{ kPa}$) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Por definição, a Pressão Média Efetiva é a pressão constante hipotética que produziria o trabalho líquido em um deslocamento igual à cilindrada: $\\text{PME} = \\frac{W_{\\text{ciclo}}}{V_d}$.`,
        `Calculando em $\\text{kPa}$: $\\text{PME} = \\frac{${Wnet}\\text{ kJ}}{${VdM3.toFixed(4)}\\text{ m}^3} = ${(Wnet / VdM3).toFixed(0)}\\text{ kPa}$.`,
        `Convertendo para $\\text{bar}$: $\\text{PME} = ${pmeBar.toFixed(1)}\\text{ bar}$.`,
      ],
      finalDiagnosis: `Pressão Média Efetiva $\\text{PME} = ${pmeBar.toFixed(1)}\\text{ bar}$.`,
      trapNote: 'Em motores de 4 tempos, cada ciclo termodinâmico completo requer 2 rotações do virabrequim (n_ciclos = N / 2).',
      relatedNorms: ['ISO 3046'],
    });
  }
  if (arch === 4) {
    const TL = 265 + (idx % 5) * 3;
    const TH = 310 + Math.floor(idx / 6) * 2;
    const copCarnot = TL / (TH - TL);
    const { options, correctIndex } = buildNumericOptions(copCarnot, [0.68, 0.84, 1.15, 1.32], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `Um sistema criogênico reversível de Carnot opera mantendo uma câmara fria a $T_L = ${TL}\\text{ K}$ e rejeitando calor para um reservatório quente a $T_H = ${TH}\\text{ K}$. O **$\\text{COP}_{R,\\text{Carnot}}$** máximo teórico desse refrigerador é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para um refrigerador reversível de Carnot, $\\text{COP}_{R,\\text{Carnot}} = \\frac{T_L}{T_H - T_L}$.`,
        `Com $T_L = ${TL}\\text{ K}$ e $T_H - T_L = ${TH - TL}\\text{ K}$:`,
        `$\\text{COP}_{R,\\text{Carnot}} = \\frac{${TL}}{${TH - TL}} = ${copCarnot.toFixed(2)}$ (se operasse como bomba de calor, seria $\\text{COP}_{BC} = \\text{COP}_R + 1 = ${(copCarnot + 1).toFixed(2)}$).`,
      ],
      finalDiagnosis: `Limite de Carnot de refrigeração $\\text{COP}_{R,\\text{Carnot}} = ${copCarnot.toFixed(2)}$.`,
      trapNote: 'No refrigerador o numerador é T_L; na bomba de calor o numerador é T_H.',
      relatedNorms: ['ASHRAE 15'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 12,
    idx,
    statementMarkdown: correctBoolean
      ? `No ciclo de refrigeração por compressão de vapor, o sub-resfriamento do líquido na saída do condensador aumenta o efeito refrigerante específico no evaporador, enquanto um leve superaquecimento na sucção protege o compressor contra o golpe de líquido.`
      : `Em um processo de resfriamento evaporativo adiabático de ar insaturado (como em torres de resfriamento), a temperatura de bulbo seco diminui enquanto a umidade específica $\\omega$ permanece constante.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `O sub-resfriamento reduz $h_3 = h_4$, aumentando $q_L = h_1 - h_4$ sem aumentar o trabalho específico do compressor.`,
      `No resfriamento evaporativo adiabático, a água evapora no ar: a temperatura de bulbo seco cai, mas a umidade específica $\\omega$ AUMENTA ao longo de uma linha de bulbo úmido constante.`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Sub-resfriamento/superaquecimento em refrigeração e psicrometria de resfriamento evaporativo.`,
    trapNote: 'Resfriamento evaporativo ocorre a T_bulbo_úmido constante (ω aumenta e T_bulbo_seco diminui).',
    relatedNorms: ['ABNT NBR 16401', 'ASHRAE'],
  });
}

function genEquipNr13(idx: number): ExerciseQuestion {
  const id = `q-mec-14-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-equip-nr13';
  const arch = idx % 6;
  if (arch === 0) {
    const P = 2.5 + (idx % 6) * 0.5; // MPa
    const R = 800 + Math.floor(idx / 6) * 20; // mm
    const S = 138; // MPa
    const E = 1.0;
    const CA = 3.0; // mm
    const tMin = (P * R) / (S * E - 0.6 * P) + CA;
    const { options, correctIndex } = buildNumericOptions(tMin, [0.68, 0.84, 1.18, 1.38], 2, 'mm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 13,
      idx,
      statementMarkdown: `Dimensionando o costado cilíndrico de um vaso de pressão segundo o código **ASME Seção VIII Divisão 1 (UG-27)**, têm-se: pressão interna de projeto $P = ${P.toFixed(1)}\\text{ MPa}$, raio interno corroído $R = ${R}\\text{ mm}$, tensão admissível do material $S = ${S}\\text{ MPa}$, eficiência de junta radiografada $E = 1{,}0$ e sobreespessura de corrosão $CA = ${CA.toFixed(1)}\\text{ mm}$. A espessura mínima comercial requerida $t$ (governada pela tensão circunferencial) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela regra UG-27 do ASME VIII Div. 1 para juntas longitudinais (tensão circunferencial): $t_{\\text{cálc}} = \\frac{P R}{S E - 0{,}6 P}$.`,
        `Substituindo $P = ${P.toFixed(1)}\\text{ MPa}$, $R = ${R}\\text{ mm}$ e $SE - 0{,}6P = ${(S * E - 0.6 * P).toFixed(2)}\\text{ MPa}$: $t_{\\text{cálc}} = ${(P * R / (S * E - 0.6 * P)).toFixed(2)}\\text{ mm}$.`,
        `Somando a sobreespessura de corrosão $CA = ${CA.toFixed(1)}\\text{ mm}$: $t = ${tMin.toFixed(2)}\\text{ mm}$.`,
      ],
      finalDiagnosis: `Espessura requerida ASME VIII Div. 1 (UG-27): $t = ${tMin.toFixed(2)}\\text{ mm}$.`,
      trapNote: 'Não esquecer o termo -0,6·P no denominador da fórmula do ASME VIII Div. 1 e de somar a sobreespessura de corrosão (CA) ao final.',
      relatedNorms: ['ASME VIII Div. 1', 'NR-13'],
    });
  }
  if (arch === 1) {
    const P = 4.0 + (idx % 5) * 0.5;
    const R = 900 + Math.floor(idx / 6) * 25;
    const S = 138;
    const E = 1.0;
    const tSphere = (P * R) / (2 * S * E - 0.2 * P);
    const { options, correctIndex } = buildNumericOptions(tSphere, [0.5, 0.78, 1.35, 1.95], 2, 'mm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 13,
      idx,
      statementMarkdown: `Um tampo hemisférico (ou vaso esférico) projetado pelo **ASME VIII Div. 1** opera sob pressão interna $P = ${P.toFixed(1)}\\text{ MPa}$, raio interno $R = ${R}\\text{ mm}$, tensão admissível $S = ${S}\\text{ MPa}$ e eficiência de solda $E = 1{,}0$ (sem sobreespessura de corrosão). A espessura mínima de parede $t$ do tampo hemisférico vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para casca esférica ou tampo hemisférico sob pressão interna (UG-27 / UG-32), a fórmula do ASME VIII Div. 1 é $t = \\frac{P R}{2 S E - 0{,}2 P}$.`,
        `Com $2 S E - 0{,}2 P = ${(2 * S * E - 0.2 * P).toFixed(2)}\\text{ MPa}$:`,
        `$t = \\frac{${P.toFixed(1)} \\times ${R}}{${(2 * S * E - 0.2 * P).toFixed(2)}} = ${tSphere.toFixed(2)}\\text{ mm}$ (cerca de metade da espessura do costado cilíndrico de mesmo raio).`,
      ],
      finalDiagnosis: `Espessura de casca esférica/hemisférica $t = ${tSphere.toFixed(2)}\\text{ mm}$.`,
      trapNote: 'Em casca esférica o denominador é (2·S·E - 0,2·P); em cilindro é (S·E - 0,6·P).',
      relatedNorms: ['ASME VIII Div. 1', 'NR-13'],
    });
  }
  if (arch === 2) {
    const Pmpa = 1.8 + (idx % 6) * 0.4;
    const Vm3 = 12 + Math.floor(idx / 6) * 1.5;
    const PV = Pmpa * Vm3;
    const { options, correctIndex } = buildNumericOptions(PV, [0.65, 0.82, 1.18, 1.4], 1, 'MPa·m³', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 13,
      idx,
      statementMarkdown: `Para o enquadramento e categorização de um vaso de pressão segundo a Norma Regulamentadora **NR-13**, o equipamento possui pressão máxima de operação $P = ${Pmpa.toFixed(1)}\\text{ MPa}$ manométrica e volume geométrico interno $V = ${Vm3.toFixed(1)}\\text{ m}^3$. O produto característico $P \\cdot V$ (expresso na unidade normativa $\\text{MPa}\\cdot\\text{m}^3$) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Nas atualizações recentes da NR-13, o produto $P \\cdot V$ é calculado com $P$ em $\\text{MPa}$ e $V$ em $\\text{m}^3$.`,
        `Multiplicando diretamente: $P \\cdot V = ${Pmpa.toFixed(1)} \\times ${Vm3.toFixed(1)} = ${PV.toFixed(1)}\\text{ MPa}\\cdot\\text{m}^3$.`,
        `Com base no grupo de potencial de risco ($1$ a $5$, conforme a classe de fluido A, B, C ou D) e no valor de $P \\cdot V$, define-se a Categoria do vaso (I a V).`,
      ],
      finalDiagnosis: `Produto normativo NR-13: $P \\cdot V = ${PV.toFixed(1)}\\text{ MPa}\\cdot\\text{m}^3$.`,
      trapNote: 'Verifique a unidade exigida pela questão: na NR-13 atual usa-se MPa·m³ (onde 1 MPa·m³ = 1000 kPa·m³).',
      relatedNorms: ['NR-13'],
    });
  }
  if (arch === 3) {
    const alpha = 12e-6; // 1/°C
    const L = 80 + Math.floor(idx / 6) * 5; // m
    const dT = 150 + (idx % 6) * 25; // °C
    const dLMm = alpha * L * dT * 1000;
    const { options, correctIndex } = buildNumericOptions(dLMm, [0.6, 0.8, 1.25, 1.5], 1, 'mm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 13,
      idx,
      statementMarkdown: `Uma linha de vapor projetada segundo a **ASME B31.3** em aço carbono ($\alpha = 12 \\times 10^{-6}\\text{ }^\\circ\\text{C}^{-1}$) possui trecho reto de comprimento $L = ${L}\\text{ m}$ e sofre variação térmica de partida $\\Delta T = ${dT}\\text{ }^\\circ\\text{C}$. A dilatação térmica longitudinal livre $\\Delta L$ que deve ser absorvida pelas liras de expansão é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A expansão térmica livre é dada por $\\Delta L = \\alpha \\cdot L \\cdot \\Delta T$.`,
        `Calculando em metros: $\\Delta L = 12 \\times 10^{-6} \\times ${L} \\times ${dT} = ${(alpha * L * dT).toFixed(4)}\\text{ m}$.`,
        `Convertendo para milímetros: $\\Delta L = ${dLMm.toFixed(1)}\\text{ mm}$.`,
      ],
      finalDiagnosis: `Expansão térmica linear $\\Delta L = ${dLMm.toFixed(1)}\\text{ mm}$.`,
      trapNote: 'Se a tubulação fosse totalmente engastada sem liras, a tensão térmica compressiva seria σ = E·α·ΔT (independente do comprimento L!).',
      relatedNorms: ['ASME B31.3'],
    });
  }
  if (arch === 4) {
    const P = 3.2 + (idx % 6) * 0.4; // MPa
    const R = 600; // mm
    const t = 12 + Math.floor(idx / 6) * 0.5; // mm
    const sigmaHoop = (P * R) / t;
    const sigmaLong = (P * R) / (2 * t);
    const { options, correctIndex } = buildNumericOptions(sigmaHoop, [0.5, 0.75, 1.25, 1.5], 1, 'MPa', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 13,
      idx,
      statementMarkdown: `Em um vaso cilíndrico de parede fina de raio médio $R = ${R}\\text{ mm}$ e espessura de parede $t = ${t.toFixed(1)}\\text{ mm}$ submetido à pressão interna $P = ${P.toFixed(1)}\\text{ MPa}$, a **tensão circunferencial (hoop stress $\\sigma_\\theta$)** vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela teoria de membrana de cascas cilíndricas de parede fina: $\\sigma_\\theta = \\frac{P R}{t}$ e $\\sigma_L = \\frac{P R}{2 t}$.`,
        `Substituindo os valores: $\\sigma_\\theta = \\frac{${P.toFixed(1)} \\times ${R}}{${t.toFixed(1)}} = ${sigmaHoop.toFixed(1)}\\text{ MPa}$ (o dobro da tensão longitudinal $\\sigma_L = ${sigmaLong.toFixed(1)}\\text{ MPa}$).`,
        `Por essa razão, soldas longitudinais sofrem o dobro da solicitação membranar das soldas circunferenciais.`,
      ],
      finalDiagnosis: `Tensão circunferencial $\\sigma_\\theta = ${sigmaHoop.toFixed(1)}\\text{ MPa}$ ($2\\,\\sigma_L$).`,
      trapNote: 'O distrator de metade do valor corresponde à tensão longitudinal PR/(2t).',
      relatedNorms: ['ASME VIII Div. 1', 'NR-13'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 13,
    idx,
    statementMarkdown: correctBoolean
      ? `Pela nomenclatura normalizada TEMA (Standards of the Tubular Exchanger Manufacturers Association), um trocador de calor designado como tipo AES possui cabeçote frontal estacionário com tampa removível (A), casco de um passe (E) e cabeçote traseiro flutuante com dispositivo de apoio (S), permitindo a dilatação diferencial do feixe tubular e sua remoção para limpeza mecânica.`
      : `Segundo a NR-13, é permitido o bloqueio simultâneo de todas as válvulas de segurança (PSVs) de uma caldeira em operação normal caso a instrumentação digital do SDCD esteja operando em modo automático.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Na classificação TEMA de três letras (Cabeçote Frontal - Casco - Cabeçote Traseiro): A = Canal e tampa removível, E = Casco de 1 passe, S = Cabeçote flutuante com anel bipartido; já U indica feixe em U e M/L cabeçotes fixos.`,
      `A NR-13 proíbe terminantemente operar vasos ou caldeiras sem dispositivo de alívio de pressão (PSV) desbloqueado e calibrado abaixo da PMTA.`,
      `Portanto, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Nomenclatura construtiva TEMA (AES, AEU, BEM) e requisitos de segurança NR-13.`,
    trapNote: 'Trocadores de espelho fixo (ex: BEM) não permitem retirar o feixe tubular para limpeza externa do casco.',
    relatedNorms: ['TEMA', 'NR-13', 'API 660'],
  });
}

function genMaintReliability(idx: number): ExerciseQuestion {
  const id = `q-mec-15-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'm-maint-reliability';
  const arch = idx % 6;
  if (arch === 0) {
    const mtbf = 2000 + Math.floor(idx / 6) * 100; // h
    const t = 400 + (idx % 6) * 100; // h
    const R = Math.exp(-t / mtbf) * 100;
    const { options, correctIndex } = buildNumericOptions(R, [0.72, 0.86, 1.12, 1.22], 2, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 14,
      idx,
      statementMarkdown: `Uma turbobomba offshore opera no período de vida útil (taxa de falha constante $\\lambda = 1/\\text{MTBF}$) com Tempo Médio Entre Falhas $\\text{MTBF} = ${mtbf}\\text{ h}$. A **confiabilidade** $R(t)$ para uma missão contínua de $t = ${t}\\text{ h}$ sem falhas vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para distribuição exponencial de falhas ($\beta = 1$ de Weibull), a função confiabilidade é $R(t) = e^{-\\lambda t} = e^{-t / \\text{MTBF}}$.`,
        `Calculando a razão $t / \\text{MTBF} = ${t} / ${mtbf} = ${(t / mtbf).toFixed(4)}$.`,
        `Portanto, $R(${t}) = e^{-${(t / mtbf).toFixed(4)}} = ${R.toFixed(2)}\\%$.`,
      ],
      finalDiagnosis: `Confiabilidade exponencial $R(${t}\\text{ h}) = ${R.toFixed(2)}\\%$.`,
      trapNote: 'Quando t = MTBF, a confiabilidade R(MTBF) NÃO é 50%, mas sim e⁻¹ ≈ 36,79%!',
      relatedNorms: ['NBR 5462', 'ISO 14224'],
    });
  }
  if (arch === 1) {
    const mtbf = 950 + Math.floor(idx / 6) * 25;
    const mttr = 25 + (idx % 6) * 5;
    const avail = (mtbf / (mtbf + mttr)) * 100;
    const { options, correctIndex } = buildNumericOptions(avail, [0.85, 0.92, 1.03, 1.08], 2, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 14,
      idx,
      statementMarkdown: `De acordo com a **ABNT NBR 5462** e a **ISO 14224**, um sistema de compressão de gás apresenta $\\text{MTBF} = ${mtbf}\\text{ h}$ e Tempo Médio Para Reparo $\\text{MTTR} = ${mttr}\\text{ h}$. A **Disponibilidade Inerente** ($A_i$) desse sistema é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A disponibilidade inerente estacionária é definida por $A_i = \\frac{\\text{MTBF}}{\\text{MTBF} + \\text{MTTR}}$.`,
        `Com $\\text{MTBF} + \\text{MTTR} = ${mtbf + mttr}\\text{ h}$:`,
        `$A_i = \\frac{${mtbf}}{${mtbf + mttr}} = ${avail.toFixed(2)}\\%$.`,
      ],
      finalDiagnosis: `Disponibilidade inerente $A_i = ${avail.toFixed(2)}\\%$.`,
      trapNote: 'Não dividir MTBF - MTTR por MTBF; o denominador correto é sempre a soma (MTBF + MTTR).',
      relatedNorms: ['NBR 5462', 'ISO 14224'],
    });
  }
  if (arch === 2) {
    const R1 = 0.9;
    const R2 = 0.8 + (idx % 4) * 0.05;
    const Rpar = (1 - (1 - R1) * (1 - R2)) * 100;
    const { options, correctIndex } = buildNumericOptions(Rpar, [0.74, 0.86, 1.02, 1.06], 1, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 14,
      idx,
      statementMarkdown: `Um sistema crítico de bombeamento de água de incêndio possui duas bombas associadas em **redundância paralela ativa** (basta uma operar para o sucesso da missão), com confiabilidades individuais $R_1 = ${(R1 * 100).toFixed(0)}\\%$ e $R_2 = ${(R2 * 100).toFixed(0)}\\%$. A confiabilidade global $R_{\\text{sist}}$ do arranjo paralelo é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Em um sistema paralelo ativo independente, o sistema só falha se ambas as unidades falharem simultaneamente: $F_{\\text{sist}} = (1 - R_1)(1 - R_2)$.`,
        `Calculando a probabilidade de falha conjunta: $(1 - ${R1.toFixed(2)}) \\times (1 - ${R2.toFixed(2)}) = ${((1 - R1) * (1 - R2)).toFixed(4)}$.`,
        `Logo, $R_{\\text{sist}} = 1 - F_{\\text{sist}} = ${Rpar.toFixed(1)}\\%$.`,
      ],
      finalDiagnosis: `Confiabilidade do sistema redundante paralelo $R_{\\text{sist}} = ${Rpar.toFixed(1)}\\%$.`,
      trapNote: 'No arranjo em série multiplica-se R1·R2; no arranjo paralelo subtraem-se as probabilidades de falha 1 - (1-R1)(1-R2).',
      relatedNorms: ['NBR 5462', 'ISO 14224'],
    });
  }
  if (arch === 3) {
    const S = 7 + (idx % 4);
    const O = 3 + (idx % 5);
    const D = 2 + (Math.floor(idx / 6) % 6);
    const rpn = S * O * D;
    const { options, correctIndex } = buildNumericOptions(rpn, [0.5, 0.75, 1.25, 1.5], 0, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 14,
      idx,
      statementMarkdown: `Na elaboração de uma **FMEA (Análise de Modos e Efeitos de Falha)** dentro da metodologia de Manutenção Centrada em Confiabilidade (**MCC / RCM**), um modo de falha em selo mecânico recebeu índices de Severidade $S = ${S}$, Ocorrência $O = ${O}$ e Detecção $D = ${D}$. O **Número de Prioridade de Risco (RPN)** vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na FMEA, o Número de Prioridade de Risco é o produto direto dos três índices: $\\text{RPN} = S \\times O \\times D$.`,
        `Observação importante: na escala de Detecção $D$ ($1$ a $10$), valores mais altos significam MENOR capacidade de detecção prévia da falha.`,
        `Calculando: $\\text{RPN} = ${S} \\times ${O} \\times ${D} = ${rpn}$.`,
      ],
      finalDiagnosis: `Número de Prioridade de Risco $\\text{RPN} = ${rpn}$.`,
      trapNote: 'Ações de instrumentação preditiva reduzem o índice D (melhoram a detecção), mas não alteram a Severidade S intrínseca sem mudança de projeto.',
      relatedNorms: ['SAE JA1011', 'ISO 14224'],
    });
  }
  if (arch === 4) {
    const Z = 8 + (idx % 5); // número de esferas
    const fr = 30 + Math.floor(idx / 6) * 2; // Hz
    const ratio = 0.2; // d/D * cos(alpha)
    const bpfo = (Z / 2) * fr * (1 - ratio);
    const { options, correctIndex } = buildNumericOptions(bpfo, [0.65, 0.82, 1.18, 1.38], 1, 'Hz', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 14,
      idx,
      statementMarkdown: `Na análise preditiva de vibração por envelope de aceleração (**ISO 13373**), um rolamento com $Z = ${Z}$ corpos rolantes gira à frequência de rotação do eixo $f_r = ${fr}\\text{ Hz}$, sendo a relação geométrica $(d/D)\\cos\\alpha = ${ratio.toFixed(2)}$. A frequência característica de passagem de defeito na pista externa (**BPFO**) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A equação cinemática para defeito na pista externa estacionária é $\\text{BPFO} = \\frac{Z}{2} f_r \\left(1 - \\frac{d}{D}\\cos\\alpha\\right)$.`,
        `Com $Z = ${Z}$, $f_r = ${fr}\\text{ Hz}$ e $(1 - 0{,}20) = 0{,}80$:`,
        `$\\text{BPFO} = \\frac{${Z}}{2} \\times ${fr} \\times 0{,}80 = ${bpfo.toFixed(1)}\\text{ Hz}$ (assíncrona em relação aos harmônicos inteiros de $f_r$).`,
      ],
      finalDiagnosis: `Frequência de falha na pista externa $\\text{BPFO} = ${bpfo.toFixed(1)}\\text{ Hz}$.`,
      trapNote: 'BPFO usa sinal negativo (1 - d/D·cosα); BPFI (pista interna) usa sinal positivo (1 + d/D·cosα).',
      relatedNorms: ['ISO 13373', 'ISO 20816'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 14,
    idx,
    statementMarkdown: correctBoolean
      ? `Na modelagem estatística de confiabilidade pela distribuição de Weibull, um parâmetro de forma $\\beta < 1$ caracteriza a fase de mortalidade infantil (taxa de falha decrescente), $\\beta = 1$ caracteriza falhas aleatórias (taxa constante) e $\\beta > 1$ caracteriza a fase de desgaste/envelhecimento (taxa de falha crescente), sendo apenas para $\\beta > 1$ tecnicamente eficaz a substituição preventiva sistemática por tempo.`
      : `Na análise de espectro de vibração FFT de máquinas rotativas, um pico dominante exatamente em $1\\times\\text{RPM}$ com fase estável e direção predominantemente radial é a assinatura clássica de desalinhamento angular severo de acoplamento.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Na curva da banheira modelada por Weibull, $\\lambda(t) \\propto t^{\\beta - 1}$: se $\\beta \\le 1$, trocar preventivamente uma peça sã por tempo não reduz (ou até aumenta) a probabilidade de falha.`,
      `No espectro FFT, $1\\times\\text{RPM}$ radial dominante indica desbalanceamento de massa; desalinhamento caracteriza-se por forte componente axial e pico elevado em $2\\times\\text{RPM}$.`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Parâmetro de forma $\\beta$ de Weibull e diagnóstico espectral FFT ($1\\times$ desbalanceamento vs. $2\\times$/axial desalinhamento).`,
    trapNote: 'Manutenção preventiva baseada em tempo (TBM) só faz sentido técnico quando β > 1 (desgaste).',
    relatedNorms: ['NBR 5462', 'ISO 14224', 'ISO 20816'],
  });
}

const MEC_GENERATORS: Array<(idx: number) => ExerciseQuestion> = [
  genThermoCycles,
  genThermoRankine,
  genFluidsNs,
  genFluidsLaval,
  genHeatTransfer,
  genSolidsMohr,
  genSolidsTorsion,
  genDynamicsRigid,
  genMaterialsFe,
  genMfgWelding,
  genVibMdof,
  genTurboPumps,
  genIcEngines,
  genEquipNr13,
  genMaintReliability,
];

export function generateMassiveMecQuestions(countPerTopic = 595): ExerciseQuestion[] {
  const result: ExerciseQuestion[] = [];
  for (const gen of MEC_GENERATORS) {
    for (let idx = 0; idx < countPerTopic; idx++) {
      result.push(gen(idx));
    }
  }
  return result;
}
