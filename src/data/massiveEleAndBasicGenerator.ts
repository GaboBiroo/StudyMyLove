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
      'Vestibular ITA — 2ª Fase Eletricidade, Magnetismo & Matemática',
      'Concurso de Admissão IME — Engenharia Elétrica & Eletrônica',
      'Simulado Olímpico ITA/IME — Eletromagnetismo e Sistemas',
    ],
    targets: ['ITA', 'IME', 'AFA/EFOMM'],
  },
  {
    board: 'Vestibular — FUVEST / UNICAMP',
    contexts: [
      'FUVEST — 2ª Fase Escola Politécnica da USP (Engenharia Elétrica)',
      'Vestibular UNICAMP — FEEC (Engenharia Elétrica e Computação)',
      'Transferência Externa USP / UNICAMP — Exatas e Engenharia',
    ],
    targets: ['FUVEST / USP', 'UNICAMP', 'UNESP'],
  },
  {
    board: 'Cesgranrio',
    contexts: [
      'Petrobras — Engenheiro(a) de Equipamentos Júnior — Elétrica',
      'Transpetro — Engenheiro(a) Júnior — Automação e Elétrica',
      'Eletrobras / ONS — Engenharia de Sistemas de Potência',
    ],
    targets: ['Petrobras', 'Transpetro', 'Eletrobras'],
  },
  {
    board: 'Cebraspe',
    contexts: [
      'Petrobras / Itaipu — Engenheiro(a) Eletricista',
      'ONS / ANEEL — Especialista em Regulação e Operação do SIN',
      'Telebras / Codevasf — Engenharia Elétrica e Controle',
    ],
    targets: ['Petrobras', 'ONS', 'ANEEL'],
  },
  {
    board: 'FGV',
    contexts: [
      'EPE / ONS — Analista de Pesquisa Energética (Transmissão)',
      'Senado / TCU — Auditoria de Infraestrutura Elétrica',
      'Cemig / Copel — Engenheiro(a) de Proteção e Subestações',
    ],
    targets: ['Petrobras', 'EPE', 'Cemig'],
  },
  {
    board: 'Marinha CP-CEM',
    contexts: [
      'Concurso CP-CEM — Corpo de Engenheiros da Marinha (Engenharia Elétrica)',
      'Centro Tecnológico da Marinha — Sistemas de Potência e Controle Naval',
    ],
    targets: ['Marinha CP-CEM', 'Petrobras'],
  },
  {
    board: 'Vunesp',
    contexts: [
      'Metrô-SP / CPTM — Engenheiro(a) de Sistemas de Potência e Tração',
      'Sabesp / ISA CTEEP — Engenharia Elétrica e Automação',
    ],
    targets: ['Metrô-SP', 'ISA CTEEP', 'Sabesp'],
  },
  {
    board: 'Europa — CERN / ESA',
    contexts: [
      'CERN Technical & Fellowship Selection — Geneva (Electrical, RF & Power Converters)',
      'ESA Young Graduate Trainee (YGT) — ESTEC Noordwijk (Avionics, Power & Control)',
    ],
    targets: ['CERN (Genebra)', 'ESA (Agência Espacial Europeia)'],
  },
  {
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    contexts: [
      'Equinor ASA Graduate Assessment — Stavanger (HVDC, Offshore Wind & Subsea Power)',
      'Shell / Siemens Energy / ABB — European HV Grid & Ex Protection Assessment',
    ],
    targets: ['Equinor', 'Shell Europe', 'Siemens Energy / ABB'],
  },
  {
    board: 'Europa — EPSO / UE',
    contexts: [
      'EPSO AD7 Scientific & Engineering Competition — Brussels / Luxembourg',
      'ENTSO-E / European Agency for the Cooperation of Energy Regulators (ACER)',
    ],
    targets: ['EPSO / União Europeia', 'ENTSO-E'],
  },
  {
    board: 'Europa — CEng / Ordem dos Engenheiros',
    contexts: [
      'Ordem dos Engenheiros (Portugal) / IET CEng (UK) — Colégio de Engenharia Eletrotécnica',
      'ETH Zürich / TU Delft / KTH — Electrical & Control Qualifying Exam',
    ],
    targets: ['Ordem dos Engenheiros (PT)', 'IET CEng (UK)', 'ETH / TU Delft'],
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
  const a = Number((1.18 + ((params.idx * 7 + params.topicIdx * 3) % 14) * 0.08).toFixed(2));
  const b = Number((-1.35 + ((params.idx * 11 + params.topicIdx * 5) % 39) * 0.1).toFixed(2));
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
    ? `Petrobras / ONS / ANEEL (Cebraspe — Julgamento Certo/Errado) • Item #${params.idx + 6}`
    : `EPSO / ENTSO-E European Electrical & Regulatory Verification — Item #${params.idx + 6}`;
  const a = Number((1.22 + ((params.idx * 5 + params.topicIdx) % 12) * 0.08).toFixed(2));
  const b = Number((-1.1 + ((params.idx * 9 + params.topicIdx * 4) % 35) * 0.1).toFixed(2));
  return {
    id: params.id,
    microtopicId: params.microtopicId,
    board,
    examContext,
    targetExams: isCebraspe ? ['Petrobras', 'ONS', 'Eletrobras'] : ['EPSO / União Europeia', 'CERN'],
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

function genEmMaxwell(idx: number): ExerciseQuestion {
  const id = `q-ele-01-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-em-maxwell';
  const arch = idx % 6;
  if (arch === 0) {
    const N = 150 + (idx % 8) * 25;
    const B0 = 0.8 + (idx % 5) * 0.2;
    const A = 0.02 + Math.floor(idx / 6) * 0.001;
    const f = 50 + (idx % 2) * 10;
    const w = 2 * Math.PI * f;
    const ePeak = N * B0 * A * w;
    const { options, correctIndex } = buildNumericOptions(ePeak, [0.5, 0.71, 1.41, 2.0], 1, 'V', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Uma bobina sensora com $N = ${N}$ espiras de área $A = ${A.toFixed(3)}\\text{ m}^2$ é atravessada perpendicularmente por um campo magnético senoidal $B(t) = ${B0.toFixed(1)}\\cos(2\\pi \\cdot ${f}\\,t)\\text{ T}$. Pela **Lei de Indução de Faraday-Lenz**, o valor de pico da força eletromotriz induzida $|e_{\\text{máx}}|$ nos terminais da bobina é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O fluxo magnético concatenado é $\\lambda(t) = N \\Phi(t) = N B_0 A \\cos(\\omega t)$, com $\\omega = 2\\pi f = 2\\pi \\times ${f} = ${w.toFixed(2)}\\text{ rad/s}$.`,
        `Pela Lei de Faraday: $e(t) = -\\frac{d\\lambda}{dt} = N B_0 A \\omega \\sin(\\omega t)$.`,
        `O valor de pico é $|e_{\\text{máx}}| = ${N} \\times ${B0.toFixed(1)} \\times ${A.toFixed(3)} \\times ${w.toFixed(2)} = ${ePeak.toFixed(1)}\\text{ V}$.`,
      ],
      finalDiagnosis: `Tensão induzida de pico $|e_{\\text{máx}}| = ${ePeak.toFixed(1)}\\text{ V}$.`,
      trapNote: 'Não esquecer de multiplicar por 2π·f ao derivar cos(2π·f·t) em relação ao tempo.',
      relatedNorms: ['IEC 60076', 'IEEE C57.12.00'],
    });
  }
  if (arch === 1) {
    const N = 400 + (idx % 6) * 50;
    const I = 3.0 + (idx % 5) * 0.8;
    const lgMm = 2.0 + Math.floor(idx / 6) * 0.1;
    const lgM = lgMm / 1000;
    const mu0 = 4 * Math.PI * 1e-7;
    const Bg = (mu0 * N * I) / lgM;
    const { options, correctIndex } = buildNumericOptions(Bg, [0.5, 0.78, 1.25, 1.6], 3, 'T', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Em um reator de núcleo ferromagnético de altíssima permeabilidade ($\\mu_r \\to \\infty$) com entreferro de ar de comprimento $l_g = ${lgMm.toFixed(1)}\\text{ mm}$, um enrolamento de $N = ${N}$ espiras conduz corrente $I = ${I.toFixed(1)}\\text{ A}$. Desprezando o espraiamento, a densidade de fluxo magnético $B_g$ no entreferro ($\mu_0 = 4\\pi \\times 10^{-7}\\text{ H/m}$) vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela Lei Circuital de Ampère aplicada ao circuito magnético com relutância concentrada no entreferro: $\\mathcal{F} = N I = H_g l_g = \\frac{B_g}{\\mu_0} l_g$.`,
        `Isolando $B_g$: $B_g = \\frac{\\mu_0 N I}{l_g}$.`,
        `Com $l_g = ${lgM.toFixed(4)}\\text{ m}$: $B_g = \\frac{4\\pi \\times 10^{-7} \\times ${N} \\times ${I.toFixed(1)}}{${lgM.toFixed(4)}} = ${Bg.toFixed(3)}\\text{ T}$.`,
      ],
      finalDiagnosis: `Indução magnética no entreferro $B_g = ${Bg.toFixed(3)}\\text{ T}$.`,
      trapNote: 'Mesmo sendo pequeno, o entreferro de ar domina a relutância total do circuito magnético pois μ_0 ≪ μ_ferro.',
      relatedNorms: ['IEC 60076'],
    });
  }
  if (arch === 2) {
    const f = 60 + Math.floor(idx / 6) * 20;
    const sigma = 5.8e7; // cobre
    const mu0 = 4 * Math.PI * 1e-7;
    const deltaMm = (1 / Math.sqrt(Math.PI * f * mu0 * sigma)) * 1000;
    const { options, correctIndex } = buildNumericOptions(deltaMm, [0.5, 0.71, 1.41, 2.0], 2, 'mm', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Em um barramento de cobre ($\sigma = 5{,}8 \\times 10^7\\text{ S/m}$, $\\mu = \\mu_0 = 4\\pi \\times 10^{-7}\\text{ H/m}$) operando na frequência $f = ${f}\\text{ Hz}$, a **profundidade pelicular (skin depth $\\delta$)** vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para um bom condutor ($\sigma \\gg \\omega\\varepsilon$), a profundidade de penetração é $\\delta = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}$.`,
        `Calculando o produto $\\pi \\times ${f} \\times 4\\pi\\times 10^{-7} \\times 5{,}8\\times 10^7 = ${(Math.PI * f * mu0 * sigma).toFixed(1)}\\text{ m}^{-2}$.`,
        `Extraindo o inverso da raiz e convertendo para milímetros: $\\delta = ${deltaMm.toFixed(2)}\\text{ mm}$.`,
      ],
      finalDiagnosis: `Profundidade pelicular $\\delta = ${deltaMm.toFixed(2)}\\text{ mm}$.`,
      trapNote: 'Se a frequência quadruplicar, a profundidade pelicular δ cai exatamente pela metade (δ ∝ 1/√f).',
      relatedNorms: ['IEEE Std 80', 'IEC 61439'],
    });
  }
  if (arch === 3) {
    const E0 = 120 + Math.floor(idx / 6) * 10;
    const eta0 = 377;
    const Savg = (E0 * E0) / (2 * eta0);
    const { options, correctIndex } = buildNumericOptions(Savg, [0.5, 0.75, 1.41, 2.0], 2, 'W/m²', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Uma onda eletromagnética plana uniforme propaga-se no espaço livre (impedância intrínseca $\\eta_0 \\approx 377\\text{ }\\Omega$) com amplitude de pico do campo elétrico $E_0 = ${E0}\\text{ V/m}$. O módulo da densidade média de potência transportada pelo **Vetor de Poynting médio** ($S_{\\text{méd}}$) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O vetor de Poynting médio temporal para onda harmônica plana é $\\langle \\mathbf{S} \\rangle = \\frac{1}{2}\\,\\text{Re}(\\mathbf{E} \\times \\mathbf{H}^*)$.`,
        `Em módulo, como $H_0 = E_0 / \\eta_0$: $S_{\\text{méd}} = \\frac{E_0^2}{2\\,\\eta_0}$.`,
        `Substituindo $E_0 = ${E0}\\text{ V/m}$ e $\\eta_0 = 377\\text{ }\\Omega$: $S_{\\text{méd}} = \\frac{${E0 * E0}}{754} = ${Savg.toFixed(2)}\\text{ W/m}^2$.`,
      ],
      finalDiagnosis: `Densidade média de potência de Poynting $S_{\\text{méd}} = ${Savg.toFixed(2)}\\text{ W/m}^2$.`,
      trapNote: 'Não esquecer o fator 1/2 quando E0 é dado em valor de pico (se fosse dado em valor eficaz E_rms, seria E_rms² / η_0).',
      relatedNorms: ['IEEE C95.1'],
    });
  }
  if (arch === 4) {
    const er = 2.2 + (idx % 6) * 0.4;
    const dMm = 2.5 + (idx % 4) * 0.5;
    const A = 0.08 + Math.floor(idx / 6) * 0.005;
    const eps0 = 8.854e-12;
    const Cpf = ((eps0 * er * A) / (dMm / 1000)) * 1e12;
    const { options, correctIndex } = buildNumericOptions(Cpf, [0.5, 0.78, 1.25, 1.6], 1, 'pF', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 0,
      idx,
      statementMarkdown: `Uma bucha capacitiva modelada localmente por placas paralelas de área efetiva $A = ${A.toFixed(3)}\\text{ m}^2$, separadas por isolante de espessura $d = ${dMm.toFixed(1)}\\text{ mm}$ e permissividade relativa $\\varepsilon_r = ${er.toFixed(1)}$ ($\\varepsilon_0 = 8{,}854\\text{ pF/m}$), apresenta capacitância $C$ igual a:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A capacitância de placas paralelas é $C = \\frac{\\varepsilon_0 \\varepsilon_r A}{d}$.`,
        `Usando $\\varepsilon_0 = 8{,}854\\text{ pF/m}$ e $d = ${(dMm / 1000).toFixed(4)}\\text{ m}$:`,
        `$C = \\frac{8{,}854 \\times ${er.toFixed(1)} \\times ${A.toFixed(3)}}{${(dMm / 1000).toFixed(4)}} = ${Cpf.toFixed(1)}\\text{ pF}$.`,
      ],
      finalDiagnosis: `Capacitância equivalente $C = ${Cpf.toFixed(1)}\\text{ pF}$.`,
      trapNote: 'Na interface normal entre dois dielétricos sem carga livre, a componente normal de D (D_n = ε·E_n) é contínua, logo o menor ε_r suporta o maior campo elétrico E_n!',
      relatedNorms: ['IEC 60137'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 0,
    idx,
    statementMarkdown: correctBoolean
      ? `A equação de Maxwell $\\nabla \\cdot \\mathbf{B} = 0$ (forma diferencial de $\\oint_S \\mathbf{B}\\cdot d\\mathbf{A} = 0$) expressa a inexistência de monopolos magnéticos isolados e garante que as linhas de densidade de fluxo magnético sejam sempre fechadas (campo solenoidal).`
      : `Na equação de Ampère-Maxwell $\\nabla \\times \\mathbf{H} = \\mathbf{J}_c + \\frac{\\partial \\mathbf{D}}{\\partial t}$, a corrente de deslocamento de Maxwell inexiste no vácuo, pois não há portadores livres de carga.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Como $\\nabla \\cdot \\mathbf{B} = 0$, o fluxo magnético líquido através de qualquer superfície gaussiana fechada é nulo.`,
      `Já o termo de corrente de deslocamento $\\partial \\mathbf{D}/\\partial t = \\varepsilon_0 \\partial \\mathbf{E}/\\partial t$ existe mesmo no vácuo perfeito e é o que permite a propagação de ondas eletromagnéticas no espaço livre.`,
      `Portanto, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Solenoidalidade do campo $\\mathbf{B}$ e corrente de deslocamento de Maxwell.`,
    trapNote: 'Para qualquer campo vetorial F, a identidade div(rot F) = 0 é sempre verdadeira; e div(B) = 0 permite definir B = rot(A).',
    relatedNorms: ['IEEE Std 299'],
  });
}

function genCircuitsAc3(idx: number): ExerciseQuestion {
  const id = `q-ele-02-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-circuits-ac3';
  const arch = idx % 6;
  if (arch === 0) {
    const VL = 380 + (idx % 4) * 60;
    const Zmod = 10 + (idx % 6) * 2;
    const pf = 0.8;
    const IL = VL / (Math.sqrt(3) * Zmod);
    const P3kW = (Math.sqrt(3) * VL * IL * pf) / 1000;
    const { options, correctIndex } = buildNumericOptions(P3kW, [0.58, 0.8, 1.25, 1.73], 2, 'kW', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Uma carga trifásica equilibrada conectada em **Estrela (Y)** possui impedância por fase de módulo $|Z_Y| = ${Zmod}\\text{ }\\Omega$ e fator de potência $\\cos\\varphi = ${pf.toFixed(2)}$ indutivo, sendo alimentada por uma rede trifásica simétrica com tensão de linha $V_L = ${VL}\\text{ V}$ eficazes. A **potência ativa trifásica total** $P_{3\\phi}$ absorvida pela carga é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na conexão Estrela (Y), a tensão de fase vale $V_f = V_L / \\sqrt{3}$ e a corrente de linha é $I_L = I_f = \\frac{V_L}{\\sqrt{3}\\,|Z_Y|} = \\frac{${VL}}{\\sqrt{3} \\times ${Zmod}} = ${IL.toFixed(2)}\\text{ A}$.`,
        `A potência ativa trifásica é $P_{3\\phi} = \\sqrt{3}\\,V_L I_L \\cos\\varphi = \\frac{V_L^2}{|Z_Y|}\\cos\\varphi$.`,
        `Calculando: $P_{3\\phi} = \\frac{${VL}^2}{${Zmod}} \\times ${pf.toFixed(2)} = ${P3kW.toFixed(2)}\\text{ kW}$.`,
      ],
      finalDiagnosis: `Potência ativa trifásica $P_{3\\phi} = ${P3kW.toFixed(2)}\\text{ kW}$.`,
      trapNote: 'Se a mesma impedância por fase fosse religada em Triângulo (Δ), a potência ativa consumida triplicaria (3·P_Y).',
      relatedNorms: ['ANEEL PRODIST Módulo 8', 'IEC 60038'],
    });
  }
  if (arch === 1) {
    const P = 200 + Math.floor(idx / 6) * 10; // kW
    const pf1 = 0.75;
    const pf2 = 0.92; // limite regulatório ANEEL
    const tan1 = Math.tan(Math.acos(pf1));
    const tan2 = Math.tan(Math.acos(pf2));
    const Qc = P * (tan1 - tan2);
    const { options, correctIndex } = buildNumericOptions(Qc, [0.65, 0.82, 1.18, 1.4], 1, 'kVAr', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Uma instalação industrial consome potência ativa média $P = ${P}\\text{ kW}$ com fator de potência indutivo $\\cos\\varphi_1 = 0{,}75$ ($\\tan\\varphi_1 = 0{,}8819$). Para elevar o fator de potência ao limite regulatório do **PRODIST Módulo 8 da ANEEL** ($\\cos\\varphi_2 = 0{,}92$ indutivo, $\\tan\\varphi_2 = 0{,}4260$), a potência reativa capacitiva trifásica $Q_C$ do banco de capacitores deve ser:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pelo triângulo de potências, mantendo a potência ativa $P$ constante: $Q_C = Q_1 - Q_2 = P(\\tan\\varphi_1 - \\tan\\varphi_2)$.`,
        `Com $\\tan\\varphi_1 - \\tan\\varphi_2 = 0{,}8819 - 0{,}4260 = 0{,}4559$:`,
        `$Q_C = ${P} \\times 0{,}4559 = ${Qc.toFixed(1)}\\text{ kVAr}$.`,
      ],
      finalDiagnosis: `Banco capacitivo necessário $Q_C = ${Qc.toFixed(1)}\\text{ kVAr}$.`,
      trapNote: 'Para um mesmo valor de capacitância C por fase, ligar os capacitores em Triângulo (Δ) gera 3 vezes mais kVAr do que em Estrela (Y).',
      relatedNorms: ['ANEEL PRODIST Módulo 8', 'IEEE Std 18'],
    });
  }
  if (arch === 2) {
    const W1 = 18 + Math.floor(idx / 6) * 1.5; // kW
    const W2 = 8 + (idx % 6) * 1.2; // kW
    const Ptot = W1 + W2;
    const Qtot = Math.sqrt(3) * (W1 - W2);
    const { options, correctIndex } = buildNumericOptions(Qtot, [0.58, 0.78, 1.22, 1.5], 2, 'kVAr', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Na medição de potência de um motor trifásico equilibrado a 3 fios pelo **Método dos Dois Wattímetros (Teorema de Blondel)**, as leituras registradas foram $W_1 = ${W1.toFixed(1)}\\text{ kW}$ e $W_2 = ${W2.toFixed(1)}\\text{ kW}$. Enquanto a potência ativa total é $P_{3\\phi} = W_1 + W_2 = ${Ptot.toFixed(1)}\\text{ kW}$, a **potência reativa trifásica** $Q_{3\\phi}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `No método de Aron (dois wattímetros) em carga equilibrada: $W_1 = V_L I_L \\cos(30^\\circ - \\varphi)$ e $W_2 = V_L I_L \\cos(30^\\circ + \\varphi)$.`,
        `Subtraindo as duas expressões trigonométricas, demonstra-se que $W_1 - W_2 = V_L I_L \\sin\\varphi = \\frac{Q_{3\\phi}}{\\sqrt{3}}$.`,
        `Logo, $Q_{3\\phi} = \\sqrt{3}\\,(W_1 - W_2) = 1{,}732 \\times (${W1.toFixed(1)} - ${W2.toFixed(1)}) = ${Qtot.toFixed(2)}\\text{ kVAr}$.`,
      ],
      finalDiagnosis: `Potência reativa pelo método de Aron $Q_{3\\phi} = ${Qtot.toFixed(2)}\\text{ kVAr}$.`,
      trapNote: 'Quando cos(φ) = 0,5 (φ = 60°), um dos wattímetros lê exatamente ZERO; para cos(φ) < 0,5, um deles lê valor negativo!',
      relatedNorms: ['IEEE Std 120'],
    });
  }
  if (arch === 3) {
    const Vth = 100 + (idx % 6) * 20;
    const Rth = 8 + (idx % 5) * 2;
    const Xth = 6 + Math.floor(idx / 6) * 0.5;
    const Pmax = (Vth * Vth) / (4 * Rth);
    const { options, correctIndex } = buildNumericOptions(Pmax, [0.5, 0.75, 1.33, 2.0], 1, 'W', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Um equivalente de Thévenin em corrente alternada senoidal possui tensão eficaz $V_{\\text{Th}} = ${Vth}\\text{ V}$ e impedância interna $Z_{\\text{Th}} = ${Rth} + j${Xth.toFixed(1)}\\text{ }\\Omega$. Quando conectada a carga complexa que maximiza a transferência de potência ativa ($Z_L = Z_{\\text{Th}}^* = ${Rth} - j${Xth.toFixed(1)}\\text{ }\\Omega$), a **potência ativa máxima** $P_{\\text{máx}}$ transferida à carga é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pelo Teorema da Máxima Transferência de Potência em CA, o casamento conjugado $Z_L = R_{\\text{Th}} - jX_{\\text{Th}}$ cancela a reatância total do laço, deixando $Z_{\\text{total}} = 2R_{\\text{Th}}$.`,
        `A corrente eficaz torna-se $I = \\frac{V_{\\text{Th}}}{2 R_{\\text{Th}}}$ e a potência máxima na carga é $P_{\\text{máx}} = I^2 R_{\\text{Th}} = \\frac{V_{\\text{Th}}^2}{4 R_{\\text{Th}}}$.`,
        `Substituindo: $P_{\\text{máx}} = \\frac{${Vth}^2}{4 \\times ${Rth}} = ${Pmax.toFixed(1)}\\text{ W}$.`,
      ],
      finalDiagnosis: `Potência máxima transferida $P_{\\text{máx}} = ${Pmax.toFixed(1)}\\text{ W}$ para $Z_L = Z_{\\text{Th}}^*$.`,
      trapNote: 'Se a carga fosse restrita a ser puramente resistiva (X_L = 0), a condição ótima seria R_L = |Z_Th| = √(R_Th² + X_Th²).',
      relatedNorms: ['IEC 60375'],
    });
  }
  if (arch === 4) {
    const R = 10 + (idx % 5) * 2;
    const L = 0.05; // H
    const C = 20e-6; // F
    const w0 = 1 / Math.sqrt(L * C);
    const Qfactor = (w0 * L) / R;
    const { options, correctIndex } = buildNumericOptions(Qfactor, [0.5, 0.75, 1.25, 1.6], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 1,
      idx,
      statementMarkdown: `Um filtro harmônico série **RLC** possui resistência $R = ${R}\\text{ }\\Omega$, indutância $L = 50\\text{ mH}$ e capacitância $C = 20\\text{ }\\mu\\text{F}$. Na frequência de ressonância $\\omega_0 = 1/\\sqrt{LC} = ${w0.toFixed(0)}\\text{ rad/s}$, o **Fator de Qualidade** $Q_0$ do filtro série é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na ressonância série, $\\omega_0 = \\frac{1}{\\sqrt{0{,}05 \\times 20\\times 10^{-6}}} = 1000\\text{ rad/s}$.`,
        `O fator de qualidade de um circuito RLC série é $Q_0 = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$.`,
        `Substituindo: $Q_0 = \\frac{1000 \\times 0{,}05}{${R}} = ${Qfactor.toFixed(2)}$ (largura de banda $B = \\omega_0 / Q_0 = R/L = ${(R / L).toFixed(0)}\\text{ rad/s}$).`,
      ],
      finalDiagnosis: `Fator de qualidade ressonante $Q_0 = ${Qfactor.toFixed(2)}$.`,
      trapNote: 'No RLC série Q = ω0·L/R; no RLC paralelo Q = R/(ω0·L).',
      relatedNorms: ['IEEE Std 519'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 1,
    idx,
    statementMarkdown: correctBoolean
      ? `Na transformação de uma carga equilibrada conectada em Triângulo (Δ) para sua equivalente em Estrela (Y), cada impedância por fase da Estrela vale exatamente um terço da impedância do Triângulo ($Z_Y = Z_\\Delta / 3$).`
      : `Em um sistema trifásico a 4 fios alimentando cargas não lineares equilibradas (retificadores), as correntes harmônicas de 3ª ordem ($180\\text{ Hz}$) das três fases cancelam-se mutuamente no condutor neutro.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Pela transformação $\\Delta \\to Y$ simétrica: $Z_Y = \\frac{Z_\\Delta \\cdot Z_\\Delta}{3 Z_\\Delta} = \\frac{Z_\\Delta}{3}$.`,
      `Harmônicos múltiplos ímpares de 3 (*triplen harmonics*: $3^\\text{a}, 9^\\text{a}, 15^\\text{a}$) possuem sequência zero (estão em fase entre si nas três fases) e, portanto, SOMAM-SE aritmeticamente no condutor neutro ($I_N = 3 I_3$)!`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Equivalência $Z_Y = Z_\\Delta/3$ e soma de harmônicos triplos (sequência zero) no neutro.`,
    trapNote: 'Harmônicos de 3ª ordem têm sequência zero: somam-se no neutro da Estrela e ficam circulando presos dentro do Triângulo.',
    relatedNorms: ['IEEE Std 519', 'ANEEL PRODIST Módulo 8'],
  });
}

function genMachMit(idx: number): ExerciseQuestion {
  const id = `q-ele-03-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-mach-mit';
  const arch = idx % 6;
  if (arch === 0) {
    const f = 60;
    const p = 4; // polos
    const ns = (120 * f) / p; // 1800 rpm
    const n = 1728 + (idx % 8) * 6;
    const s = (ns - n) / ns;
    const fr = s * f;
    const { options, correctIndex } = buildNumericOptions(fr, [0.5, 0.75, 1.5, 2.5], 2, 'Hz', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Um Motor de Indução Trifásico (**MIT**) de $p = 4$ polos alimentado em $f_1 = 60\\text{ Hz}$ opera a plena carga com velocidade mecânica $n = ${n}\\text{ rpm}$. A **frequência das correntes induzidas no rotor** ($f_2$) vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A velocidade síncrona do campo girante é $n_s = \\frac{120 f_1}{p} = \\frac{120 \\times 60}{4} = 1800\\text{ rpm}$.`,
        `O escorregamento é $s = \\frac{n_s - n}{n_s} = \\frac{1800 - ${n}}{1800} = ${(s * 100).toFixed(2)}\\%$.`,
        `A frequência rotórica é $f_2 = s \\cdot f_1 = ${s.toFixed(4)} \\times 60 = ${fr.toFixed(2)}\\text{ Hz}$.`,
      ],
      finalDiagnosis: `Frequência rotórica de escorregamento $f_2 = ${fr.toFixed(2)}\\text{ Hz}$ ($s = ${(s * 100).toFixed(2)}\\%$).`,
      trapNote: 'Com o rotor bloqueado na partida (n = 0, s = 1), f2 = f1 = 60 Hz; em vazio ideal (s = 0), f2 = 0 Hz.',
      relatedNorms: ['IEC 60034', 'ABNT NBR 17094'],
    });
  }
  if (arch === 1) {
    const Pag = 50 + Math.floor(idx / 6) * 2; // kW
    const s = 0.03 + (idx % 5) * 0.005;
    const Pmec = Pag * (1 - s);
    const { options, correctIndex } = buildNumericOptions(Pmec, [0.85, 0.93, 1.04, 1.12], 2, 'kW', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Em um motor de indução trifásico operando com escorregamento $s = ${(s * 100).toFixed(1)}\\%$, a potência transferida através do entreferro é $P_{\\text{ef}} = ${Pag}\\text{ kW}$. Desprezando as perdas rotacionais por atrito e ventilação, a **potência mecânica útil desenvolvida** $P_{\\text{mec}}$ no rotor é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pelo balanço clássico de potência no entreferro do MIT, a razão $P_{\\text{ef}} : P_{j2} : P_{\\text{mec}}$ vale $1 : s : (1 - s)$.`,
        `As perdas Joule no cobre do rotor são $P_{j2} = s \\cdot P_{\\text{ef}} = ${(s * Pag).toFixed(2)}\\text{ kW}$.`,
        `A potência mecânica convertida é $P_{\\text{mec}} = (1 - s) P_{\\text{ef}} = ${(1 - s).toFixed(3)} \\times ${Pag} = ${Pmec.toFixed(2)}\\text{ kW}$.`,
      ],
      finalDiagnosis: `Potência mecânica desenvolvida $P_{\\text{mec}} = ${Pmec.toFixed(2)}\\text{ kW}$.`,
      trapNote: 'A eficiência interna do rotor é sempre limitada por (1 - s).',
      relatedNorms: ['IEC 60034', 'IEEE Std 112'],
    });
  }
  if (arch === 2) {
    const Snom = 500 + Math.floor(idx / 6) * 25; // kVA
    const zPct = 5.0 + (idx % 4) * 0.5;
    const VL = 13.8; // kV
    const Inom = Snom / (Math.sqrt(3) * VL);
    const Icc = Inom / (zPct / 100);
    const { options, correctIndex } = buildNumericOptions(Icc, [0.5, 0.75, 1.25, 1.73], 1, 'A', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Um transformador de distribuição trifásico de $S_n = ${Snom}\\text{ kVA}$, tensão primária $V_{1L} = 13{,}8\\text{ kV}$ e impedância percentual de curto-circuito $Z_{\\%} = ${zPct.toFixed(1)}\\%$ é alimentado por um barramento infinito. A **corrente simétrica eficaz de curto-circuito trifásico** no lado de $13{,}8\\text{ kV}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A corrente nominal primária é $I_n = \\frac{S_n}{\\sqrt{3}\\,V_{1L}} = \\frac{${Snom}}{\\sqrt{3} \\times 13{,}8} = ${Inom.toFixed(2)}\\text{ A}$.`,
        `Em pu na base do transformador, a corrente de falta trifásica terminal vale $I_{cc,\\text{pu}} = \\frac{1}{Z_{\\text{pu}}} = \\frac{100}{${zPct.toFixed(1)}} = ${(100 / zPct).toFixed(2)}\\text{ pu}$.`,
        `Em ampères: $I_{cc} = \\frac{I_n}{Z_{\\%}/100} = ${Icc.toFixed(1)}\\text{ A}$.`,
      ],
      finalDiagnosis: `Corrente de falta simétrica $I_{cc} = ${Icc.toFixed(1)}\\text{ A}$.`,
      trapNote: 'Não esquecer o fator √3 no cálculo da corrente nominal de linha trifásica.',
      relatedNorms: ['IEC 60076', 'ABNT NBR 5356'],
    });
  }
  if (arch === 3) {
    const Pfe = 1800 + Math.floor(idx / 6) * 50; // W
    const PcuNom = 5000 + (idx % 6) * 400; // W
    const alphaOpt = Math.sqrt(Pfe / PcuNom) * 100;
    const { options, correctIndex } = buildNumericOptions(alphaOpt, [0.65, 0.82, 1.18, 1.4], 1, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Um transformador de força apresenta perdas em vazio (no ferro) constantes $P_{\\text{Fe}} = ${Pfe}\\text{ W}$ e perdas em curto-circuito (no cobre a plena carga) $P_{\\text{Cu,nom}} = ${PcuNom}\\text{ W}$. O índice de carregamento percentual $\\alpha_{\\text{ótimo}} = S / S_n$ no qual o transformador atinge seu **rendimento máximo** é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Enquanto as perdas no núcleo $P_{\\text{Fe}}$ são constantes, as perdas Joule variam com o quadrado do carregamento: $P_{\\text{Cu}}(\\alpha) = \\alpha^2 P_{\\text{Cu,nom}}$.`,
        `O rendimento máximo ocorre quando as perdas variáveis igualam as perdas fixas: $\\alpha^2 P_{\\text{Cu,nom}} = P_{\\text{Fe}} \\implies \\alpha_{\\text{ótimo}} = \\sqrt{\\frac{P_{\\text{Fe}}}{P_{\\text{Cu,nom}}}}$.`,
        `Substituindo: $\\alpha_{\\text{ótimo}} = \\sqrt{\\frac{${Pfe}}{${PcuNom}}} = ${alphaOpt.toFixed(1)}\\%$.`,
      ],
      finalDiagnosis: `Carregamento de máximo rendimento $\\alpha_{\\text{ótimo}} = ${alphaOpt.toFixed(1)}\\%$.`,
      trapNote: 'O rendimento máximo NÃO ocorre quando P_Cu,nom = P_Fe, mas sim em α = √(P_Fe / P_Cu,nom).',
      relatedNorms: ['IEC 60076', 'ABNT NBR 5356'],
    });
  }
  if (arch === 4) {
    const Vnom = 440;
    const fnom = 60;
    const fTarget = 36 + (idx % 8) * 3; // <= 60 Hz
    const Vtarget = Vnom * (fTarget / fnom);
    const { options, correctIndex } = buildNumericOptions(Vtarget, [0.65, 0.82, 1.18, 1.38], 1, 'V', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 2,
      idx,
      statementMarkdown: `Um motor de indução trifásico de dados nominais $440\\text{ V} / 60\\text{ Hz}$ é acionado por um inversor de frequência sob **controle escalar $V/f$ constante** na região de conjugado constante (abaixo da velocidade base). Para operar na frequência $f = ${fTarget}\\text{ Hz}$ mantendo o fluxo magnético nominal no entreferro sem saturação, a tensão eficaz de saída do inversor (desprezando a queda $I_1 R_1$ em baixa frequência) deve ser:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Como $E_1 \\approx 4{,}44\\,f N_1 k_{w1} \\Phi_m$, manter o fluxo $\\Phi_m$ constante exige manter a razão $V / f = \\text{constante} = \\frac{440}{60} = 7{,}333\\text{ V/Hz}$.`,
        `Na frequência $f = ${fTarget}\\text{ Hz}$, tem-se $V = 440 \\times \\frac{${fTarget}}{60}$.`,
        `Calculando: $V = ${Vtarget.toFixed(1)}\\text{ V}$.`,
      ],
      finalDiagnosis: `Tensão terminal escalar $V = ${Vtarget.toFixed(1)}\\text{ V}$ em $f = ${fTarget}\\text{ Hz}$.`,
      trapNote: 'Acima da frequência nominal (f > 60 Hz), a tensão trava em 440 V e o motor entra na região de enfraquecimento de campo (potência máxima constante e torque decrescente com 1/f²).',
      relatedNorms: ['IEC 60034', 'IEC 61800'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 2,
    idx,
    statementMarkdown: correctBoolean
      ? `Pela fórmula de Kloss do motor de indução trifásico, o aumento da resistência rotórica $R'_2$ (por exemplo, em rotores bobinados ou barras de gaiola dupla na partida) desloca o escorregamento de torque máximo $s_{\\text{máx}}$ para valores maiores, mas mantém inalterado o valor absoluto do conjugado máximo (breakdown torque $T_{\\text{máx}}$).`
      : `Dois transformadores trifásicos pertencentes aos grupos de ligação Dy1 (defasamento $-30^\\circ$) e Yy0 (defasamento $0^\\circ$) podem ser conectados diretamente em paralelo no mesmo barramento secundário sem circulação de correntes de curto-circuito.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `No modelo equivalente do MIT, $s_{\\text{máx}} \\approx R'_2 / X_{cc}$ é proporcional a $R'_2$, porém $T_{\\text{máx}} \\approx \\frac{3 V_1^2}{2\\omega_s X_{cc}}$ independe de $R'_2$.`,
      `Já o paralelismo de transformadores exige obrigatoriamente o mesmo deslocamento angular (grupo horário compatível): ligar Dy1 ($-30^\\circ$) em paralelo com Yy0 ($0^\\circ$) cria uma diferença fasorial de $0{,}518\\,V_L$ entre secundários, causando severa corrente circulante destrutiva.`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Invariância de $T_{\\text{máx}}$ com $R'_2$ (Kloss) e requisitos de paralelismo de transformadores (IEC 60076).`,
    trapNote: 'Aumentar R2 aumenta o torque de partida e s_máx, mas NUNCA altera o valor de pico T_máx.',
    relatedNorms: ['IEC 60034', 'IEC 60076'],
  });
}

function genMachSync(idx: number): ExerciseQuestion {
  const id = `q-ele-04-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-mach-sync';
  const arch = idx % 6;
  if (arch === 0) {
    const V = 1.0;
    const Ef = 1.4 + (idx % 6) * 0.1;
    const Xs = 0.8 + Math.floor(idx / 6) * 0.02;
    const deltaDeg = 30;
    const Ppu = ((V * Ef) / Xs) * Math.sin((deltaDeg * Math.PI) / 180);
    const { options, correctIndex } = buildNumericOptions(Ppu, [0.5, 0.78, 1.25, 1.73], 3, 'pu', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Um gerador síncrono de rotor cilíndrico conectado a um barramento infinito ($V_t = 1{,}0\\text{ pu}$) opera com força eletromotriz interna de excitação $E_f = ${Ef.toFixed(1)}\\text{ pu}$, reatância síncrona $X_s = ${Xs.toFixed(2)}\\text{ pu}$ (resistência de armadura desprezível) e ângulo de carga (potência) $\\delta = 30^\\circ$. A **potência ativa trifásica** $P$ entregue à rede em $\\text{pu}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para gerador de polos lisos sem perdas ôhmicas, a equação potência-ângulo é $P = \\frac{V_t E_f}{X_s}\\sin\\delta$.`,
        `Com $\\sin(30^\\circ) = 0{,}500$:`,
        `$P = \\frac{1{,}0 \\times ${Ef.toFixed(1)}}{${Xs.toFixed(2)}} \\times 0{,}5 = ${Ppu.toFixed(3)}\\text{ pu}$.`,
      ],
      finalDiagnosis: `Potência elétrica síncrona $P = ${Ppu.toFixed(3)}\\text{ pu}$ (limite de estabilidade estática em $\\delta = 90^\\circ$ vale ${(V * Ef / Xs).toFixed(3)} pu).`,
      trapNote: 'O limite de estabilidade em regime permanente de máquina de polos lisos ocorre em δ = 90°; em polos salientes ocorre abaixo de 90° devido ao termo de relutância sin(2δ).',
      relatedNorms: ['IEEE Std 115', 'IEC 60034'],
    });
  }
  if (arch === 1) {
    const f0 = 60.0;
    const R = 0.05; // 5% estatismo
    const Ppu = 0.4 + Math.floor(idx / 6) * 0.02;
    const fNew = f0 * (1 - R * Ppu);
    const { options, correctIndex } = buildNumericOptions(fNew, [0.96, 0.98, 1.02, 1.04], 2, 'Hz', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Um turbogerador síncrono isolado possui regulador primário de velocidade ajustado com **estatismo permanente (droop)** $R = 5\\%$ ($0{,}05\\text{ pu}$) e frequência em vazio $f_0 = 60{,}00\\text{ Hz}$. Ao assumir um degrau de carga ativa de $\\Delta P = ${Ppu.toFixed(2)}\\text{ pu}$ sem atuação do controle secundário, a nova frequência estacionária $f$ será:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela característica estática frequência-potência do regulador de velocidade: $\\frac{\\Delta f}{f_{\\text{nom}}} = -R \\cdot \\Delta P_{\\text{pu}}$.`,
        `A queda de frequência em pu é $\\Delta f_{\\text{pu}} = -0{,}05 \\times ${Ppu.toFixed(2)} = -${(R * Ppu).toFixed(4)}\\text{ pu}$, ou seja, $\\Delta f = -${(f0 * R * Ppu).toFixed(2)}\\text{ Hz}$.`,
        `Logo, $f = 60{,}00 - ${(f0 * R * Ppu).toFixed(2)} = ${fNew.toFixed(2)}\\text{ Hz}$.`,
      ],
      finalDiagnosis: `Frequência de equilíbrio primário $f = ${fNew.toFixed(2)}\\text{ Hz}$.`,
      trapNote: 'Em máquinas em paralelo, a repartição de carga ativa é inversamente proporcional aos seus respectivos estatismos R_i.',
      relatedNorms: ['ONS Procedimentos de Rede', 'IEEE Std 122'],
    });
  }
  if (arch === 2) {
    const H = 4.0 + (idx % 5) * 0.5; // s
    const f0 = 60;
    const dP = 0.25 + Math.floor(idx / 6) * 0.01; // pu
    const dfdt = (f0 / (2 * H)) * dP; // Hz/s
    const { options, correctIndex } = buildNumericOptions(dfdt, [0.5, 0.75, 1.5, 2.0], 2, 'Hz/s', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Um gerador síncrono de constante de inércia $H = ${H.toFixed(1)}\\text{ MJ/MVA}$ ($\text{s}$) operando a $f_0 = 60\\text{ Hz}$ sofre uma rejeição súbita de carga que gera potência acelerante líquida $P_a = P_m - P_e = ${dP.toFixed(2)}\\text{ pu}$. Pela **Equação de Oscilação (Swing Equation)**, a taxa inicial de variação da frequência $df/dt$ em $\\text{Hz/s}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A Equação de Oscilação em pu relaciona a derivada da frequência (RoCoF) à potência acelerante: $\\frac{2H}{f_0}\\frac{df}{dt} = P_m - P_e = P_a$.`,
        `Isolando $df/dt$: $\\frac{df}{dt} = \\frac{f_0}{2H} P_a$.`,
        `Substituindo $f_0 = 60\\text{ Hz}$, $H = ${H.toFixed(1)}\\text{ s}$ e $P_a = ${dP.toFixed(2)}\\text{ pu}$: $\\frac{df}{dt} = \\frac{60}{${(2 * H).toFixed(1)}} \\times ${dP.toFixed(2)} = ${dfdt.toFixed(2)}\\text{ Hz/s}$.`,
      ],
      finalDiagnosis: `Taxa de variação de frequência (RoCoF) $df/dt = ${dfdt.toFixed(2)}\\text{ Hz/s}$.`,
      trapNote: 'Não esquecer o fator 2 multiplicando a constante de inércia H na equação de oscilação: M = 2H / ω_s.',
      relatedNorms: ['IEEE Std 1110', 'ONS Submódulo 2.3'],
    });
  }
  if (arch === 3) {
    const V = 1.0;
    const Ef = 1.5 + Math.floor(idx / 6) * 0.03;
    const Xs = 1.0;
    const deltaDeg = 30;
    const Qpu = (V / Xs) * (Ef * Math.cos((deltaDeg * Math.PI) / 180) - V);
    const { options, correctIndex } = buildNumericOptions(Qpu, [0.5, 0.75, 1.35, 1.8], 3, 'pu', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Um gerador síncrono de rotor liso ($X_s = 1{,}00\\text{ pu}$, $R_a \\approx 0$) conectado a barra com $V_t = 1{,}00\\text{ pu}$ opera sobre-excitado com $E_f = ${Ef.toFixed(2)}\\text{ pu}$ e ângulo de carga $\\delta = 30^\\circ$. A **potência reativa** $Q$ fornecida ao barramento em $\\text{pu}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A equação da potência reativa fornecida pelo gerador de polos lisos é $Q = \\frac{V_t}{X_s}(E_f \\cos\\delta - V_t)$.`,
        `Como $E_f \\cos(30^\\circ) = ${Ef.toFixed(2)} \\times 0{,}8660 = ${(Ef * Math.cos(Math.PI / 6)).toFixed(4)} > V_t = 1{,}00$, o gerador opera sobre-excitado (fornecendo reativos, comportamento equivalente a um capacitor).`,
        `Calculando: $Q = \\frac{1{,}00}{1{,}00}(${(Ef * Math.cos(Math.PI / 6)).toFixed(4)} - 1{,}00) = ${Qpu.toFixed(3)}\\text{ pu}$.`,
      ],
      finalDiagnosis: `Potência reativa injetada na barra $Q = ${Qpu.toFixed(3)}\\text{ pu}$.`,
      trapNote: 'Gerador síncrono sobre-excitado (Ef·cosδ > Vt) FORNECE reativos à rede; subexcitado (Ef·cosδ < Vt) ABSORVE reativos.',
      relatedNorms: ['IEEE Std 115'],
    });
  }
  if (arch === 4) {
    const Xd = 1.2;
    const Xq = 0.75;
    const V = 1.0;
    const PrelMax = (V * V * (Xd - Xq)) / (2 * Xd * Xq);
    const deltaDeg = 45;
    const Prel = PrelMax * Math.sin((2 * deltaDeg * Math.PI) / 180) + (idx % 10) * 0.01;
    const { options, correctIndex } = buildNumericOptions(Prel, [0.5, 0.75, 1.35, 1.8], 3, 'pu', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 3,
      idx,
      statementMarkdown: `Em um hidrogerador de **polos salientes** ($X_d = ${Xd.toFixed(2)}\\text{ pu}$, $X_q = ${Xq.toFixed(2)}\\text{ pu}$), a parcela máxima de **potência de relutância** em $\\delta = 45^\\circ$ (dada por $\\frac{V_t^2 (X_d - X_q)}{2 X_d X_q}\\sin(2\\delta)$ somada a um ajuste de base de ${((idx % 10) * 0.01).toFixed(2)} pu para $V_t = 1{,}0\\text{ pu}$) vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela teoria das duas reações de Blondel para máquina de polos salientes: $P(\\delta) = \\frac{V_t E_f}{X_d}\\sin\\delta + \\frac{V_t^2(X_d - X_q)}{2 X_d X_q}\\sin(2\\delta)$.`,
        `Em $\\delta = 45^\\circ$, $\\sin(2\\delta) = \\sin(90^\\circ) = 1$, logo a parcela de relutância pura vale $\\frac{1{,}0^2(1{,}20 - 0{,}75)}{2 \\times 1{,}20 \\times 0{,}75} = 0{,}250\\text{ pu}$.`,
        `Somando o offset especificado do ponto de operação: $P_{\\text{rel}} = ${Prel.toFixed(3)}\\text{ pu}$.`,
      ],
      finalDiagnosis: `Componente de potência de relutância $P_{\\text{rel}} = ${Prel.toFixed(3)}\\text{ pu}$.`,
      trapNote: 'Graças à potência de relutância (proporcional a sin 2δ), um gerador de polos salientes pode manter sincronismo em baixa carga mesmo se perder momentaneamente a corrente de campo (Ef = 0).',
      relatedNorms: ['IEEE Std 115', 'IEC 60034'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 3,
    idx,
    statementMarkdown: correctBoolean
      ? `Na Curva de Capabilidade ($P \\times Q$) de um gerador síncrono, a operação na região fortemente sobre-excitada é limitada pelo aquecimento térmico do enrolamento de campo do rotor ($I_{f,\\text{máx}}$), enquanto a operação na região fortemente subexcitada é restringida pelo limite de estabilidade estática e pelo aquecimento nas cabeças de bobina e pacote magnético do estator.`
      : `Para elevar a potência ativa $P$ fornecida por um gerador síncrono conectado a um barramento infinito mantendo a velocidade síncrona, o operador deve aumentar apenas a corrente de excitação de campo $I_f$, mantendo fixa a admissão de vapor/água na turbina primária.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Na curva de capabilidade, os três limites clássicos são: corrente de campo (topo/sobre-excitação), corrente de armadura (arco direito) e estabilidade/aquecimento de extremidade do estator (base/subexcitação).`,
      `Em um barramento infinito, alterar $I_f$ a potência mecânica constante altera apenas a potência REATIVA $Q$ e o fator de potência; para variar a potência ATIVA $P$, é indispensável alterar o conjugado da máquina primária (governador da turbina).`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Limites térmicos/estabilidade da Curva de Capabilidade e desacoplamento $P$-$f$ / $Q$-$V$.`,
    trapNote: 'Em barra infinita: Governador da turbina controla Potência Ativa (P); Regulador de tensão (AVR / campo If) controla Potência Reativa (Q).',
    relatedNorms: ['IEEE Std 115', 'ONS Procedimentos de Rede'],
  });
}

function genSepFortescue(idx: number): ExerciseQuestion {
  const id = `q-ele-05-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-sep-fortescue';
  const arch = idx % 6;
  if (arch === 0) {
    const X1 = 0.15 + (idx % 5) * 0.03;
    const X2 = X1;
    const X0 = 0.1 + Math.floor(idx / 6) * 0.01;
    const Ia1 = 1.0 / (X1 + X2 + X0);
    const Ia = 3 * Ia1;
    const { options, correctIndex } = buildNumericOptions(Ia, [0.33, 0.67, 1.33, 1.73], 2, 'pu', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Em uma barra do sistema elétrico com tensão pré-falta $V_f = 1{,}0\\text{ pu}$, as reatâncias de sequência de Thévenin são $X_1 = X_2 = ${X1.toFixed(2)}\\text{ pu}$ e $X_0 = ${X0.toFixed(2)}\\text{ pu}$ (sistema solidamente aterrado, $Z_f = 0$). Pelo **Teorema de Fortescue**, a corrente de **curto-circuito fase-terra franco** ($I_a$) em $\\text{pu}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na falta fase-terra franca na fase $a$, as redes de sequência positiva, negativa e zero ficam conectadas em SÉRIE: $I_{a1} = I_{a2} = I_{a0} = \\frac{V_f}{X_1 + X_2 + X_0}$.`,
        `A corrente total na fase faltosa é $I_a = I_{a1} + I_{a2} + I_{a0} = 3\\,I_{a1} = \\frac{3\\,V_f}{X_1 + X_2 + X_0}$.`,
        `Substituindo: $I_a = \\frac{3 \\times 1{,}0}{${(X1 + X2 + X0).toFixed(2)}} = ${Ia.toFixed(2)}\\text{ pu}$.`,
      ],
      finalDiagnosis: `Corrente de falta monofásica à terra $I_a = ${Ia.toFixed(2)}\\text{ pu}$.`,
      trapNote: 'Não esquecer de multiplicar Ia1 por 3 para obter a corrente total da fase faltosa Ia = 3·Ia1!',
      relatedNorms: ['IEC 60909', 'ANSI/IEEE C37.010'],
    });
  }
  if (arch === 1) {
    const Ia = 600 + Math.floor(idx / 6) * 15;
    const Ib = 600;
    const Ic = 600;
    // Se Ia, Ib, Ic estao em fase (ex: corrente de neutro / sequencia zero pura)
    const Ia0 = (Ia + Ib + Ic) / 3;
    const { options, correctIndex } = buildNumericOptions(Ia0, [0.33, 0.58, 1.73, 3.0], 1, 'A', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Três correntes fasoriais em fase entre si ($\\angle 0^\\circ$) possuem módulos $I_a = ${Ia}\\text{ A}\\angle 0^\\circ$, $I_b = ${Ib}\\text{ A}\\angle 0^\\circ$ e $I_c = ${Ic}\\text{ A}\\angle 0^\\circ$. Pela matriz de transformação de **Componentes Simétricas de Fortescue**, o módulo da componente de **sequência zero** $I_{a0}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A componente de sequência zero é definida por $I_{a0} = \\frac{1}{3}(I_a + I_b + I_c)$.`,
        `Como os três fasores possuem ângulo $0^\\circ$, a soma fasorial reduz-se à soma algébrica direta: $I_a + I_b + I_c = ${Ia + Ib + Ic}\\text{ A}\\angle 0^\\circ$.`,
        `Dividindo por $3$: $I_{a0} = ${Ia0.toFixed(1)}\\text{ A}$ (e a corrente de retorno pelo neutro/terra é $I_N = 3 I_{a0} = ${Ia + Ib + Ic}\\text{ A}$).`,
      ],
      finalDiagnosis: `Componente homopolar (sequência zero) $I_{a0} = ${Ia0.toFixed(1)}\\text{ A}$.`,
      trapNote: 'A corrente física que circula pelo neutro/terra é sempre o TRIPLO da componente de sequência zero: I_N = Ia + Ib + Ic = 3·Ia0.',
      relatedNorms: ['IEC 60909'],
    });
  }
  if (arch === 2) {
    const Zold = 0.08 + (idx % 5) * 0.02;
    const Sold = 100; // MVA
    const Snew = 250 + Math.floor(idx / 6) * 10; // MVA
    const Znew = Zold * (Snew / Sold);
    const { options, correctIndex } = buildNumericOptions(Znew, [0.4, 0.7, 1.35, 2.5], 3, 'pu', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Um equipamento elétrico possui reatância $X_{\\text{ant}} = ${Zold.toFixed(2)}\\text{ pu}$ na base nominal $S_{b,\\text{ant}} = ${Sold}\\text{ MVA}$ e tensão base $V_b = 138\\text{ kV}$. Ao converter essa reatância para uma nova base de potência do sistema $S_{b,\\text{nova}} = ${Snew}\\text{ MVA}$ mantendo a mesma tensão base ($138\\text{ kV}$), o novo valor $X_{\\text{novo}}$ em $\\text{pu}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A fórmula geral de mudança de base de impedância em pu é $Z_{\\text{novo}} = Z_{\\text{ant}} \\left(\\frac{V_{b,\\text{ant}}}{V_{b,\\text{nova}}}\\right)^2 \\left(\\frac{S_{b,\\text{nova}}}{S_{b,\\text{ant}}}\\right)$.`,
        `Como a tensão base não se alterou ($V_{b,\\text{ant}} = V_{b,\\text{nova}}$), tem-se $X_{\\text{novo}} = ${Zold.toFixed(2)} \\times \\frac{${Snew}}{${Sold}}$.`,
        `Calculando: $X_{\\text{novo}} = ${Znew.toFixed(3)}\\text{ pu}$.`,
      ],
      finalDiagnosis: `Reatância na nova base de potência $X_{\\text{novo}} = ${Znew.toFixed(3)}\\text{ pu}$.`,
      trapNote: 'Na mudança de base: S_nova fica no NUMERADOR e V_nova² fica no DENOMINADOR.',
      relatedNorms: ['IEC 60909'],
    });
  }
  if (arch === 3) {
    const X1 = 0.2 + Math.floor(idx / 6) * 0.01;
    const X2 = X1;
    const Ibc = Math.sqrt(3) / (X1 + X2);
    const { options, correctIndex } = buildNumericOptions(Ibc, [0.58, 0.78, 1.15, 1.73], 2, 'pu', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Em um barramento com tensão pré-falta $V_f = 1{,}0\\text{ pu}$ e reatâncias de sequência positiva e negativa iguais ($X_1 = X_2 = ${X1.toFixed(2)}\\text{ pu}$), ocorre um **curto-circuito bifásico isolado da terra** entre as fases $b$ e $c$ ($Z_f = 0$). O módulo da corrente de falta $I_b = -I_c$ em $\\text{pu}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `No curto bifásico isolado da terra ($b$-$c$), não há corrente de sequência zero ($I_{a0} = 0$) e as redes de sequência positiva e negativa conectam-se em oposição: $I_{a1} = -I_{a2} = \\frac{V_f}{X_1 + X_2}$.`,
        `A corrente na fase $b$ vale $I_b = a^2 I_{a1} + a I_{a2} = (a^2 - a) I_{a1} = -j\\sqrt{3}\\,I_{a1}$.`,
        `Em módulo: $|I_b| = \\frac{\\sqrt{3}\\,V_f}{X_1 + X_2} = \\frac{1{,}732}{${(X1 + X2).toFixed(2)}} = ${Ibc.toFixed(2)}\\text{ pu}$ (exatamente $\\frac{\\sqrt{3}}{2} \\approx 86{,}6\\%$ do curto trifásico quando $X_1 = X_2$).`,
      ],
      finalDiagnosis: `Corrente de falta bifásica $|I_b| = ${Ibc.toFixed(2)}\\text{ pu}$.`,
      trapNote: 'Quando X1 = X2, a corrente de curto bifásico vale exatamente (√3 / 2) ≈ 0,866 da corrente de curto trifásico!',
      relatedNorms: ['IEC 60909'],
    });
  }
  if (arch === 4) {
    const Vln = 13.8 / Math.sqrt(3); // 7.967 kV
    const Ia = 400 + Math.floor(idx / 6) * 20; // A
    const Rn = (Vln * 1000) / Ia;
    const { options, correctIndex } = buildNumericOptions(Rn, [0.58, 0.78, 1.25, 1.73], 2, 'Ω', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 4,
      idx,
      statementMarkdown: `Em uma subestação industrial de média tensão ($V_L = 13{,}8\\text{ kV}$, tensão fase-neutro $V_{fn} = 7{,}97\\text{ kV}$), deseja-se limitar a corrente de falta monofásica fase-terra a no máximo $I_{ft} = ${Ia}\\text{ A}$ através de um **resistor de aterramento de neutro ($R_N$)**. Desprezando as reatâncias internas da fonte frente a $R_N$, o valor ôhmico de $R_N$ deve ser:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na rede de sequência de uma falta fase-terra, a impedância de neutro $Z_N$ aparece multiplicada por 3 na malha de sequência zero ($3 Z_N$), porém como $I_a = 3 I_{a0} = \\frac{3 V_{fn}}{Z_1 + Z_2 + Z_0 + 3 R_N}$, quando $3 R_N \\gg |Z_1 + Z_2 + Z_0|$, tem-se simplesmente $I_{ft} \\approx \\frac{V_{fn}}{R_N}$.`,
        `Isolando $R_N$: $R_N = \\frac{V_{fn}}{I_{ft}} = \\frac{7967\\text{ V}}{${Ia}\\text{ A}}$.`,
        `Calculando: $R_N = ${Rn.toFixed(2)}\\text{ }\\Omega$.`,
      ],
      finalDiagnosis: `Resistor de aterramento de neutro $R_N = ${Rn.toFixed(2)}\\text{ }\\Omega$.`,
      trapNote: 'No diagrama de sequência zero o resistor de neutro entra multiplicado por 3 (3·R_N), que cancela o fator 3 de I_a = 3·I_a0!',
      relatedNorms: ['IEEE Std 142 (Green Book)', 'IEC 60909'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 4,
    idx,
    statementMarkdown: correctBoolean
      ? `Em um transformador trifásico com conexão $\\Delta$-Y solidamente aterrado (Dyn1), o enrolamento em Triângulo ($\\Delta$) atua como uma armadilha que permite a circulação interna de correntes de sequência zero no lado Y aterrado, mas bloqueia a passagem de correntes de sequência zero para a linha do lado $\\Delta$.`
      : `A corrente de curto-circuito trifásico equilibrado é sempre, em qualquer barra de um sistema elétrico de potência, numericamente superior à corrente de curto-circuito fase-terra franco.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `No lado $\\Delta$, não há conexão ao neutro/terra, logo correntes de sequência zero não podem sair para a linha externa, embora circulem fechadas dentro do triângulo equilibrando os ampère-espiras do lado Y aterrado.`,
      `Já na barra secundária de um gerador ou transformador $\\Delta$-Y solidamente aterrado próximo à fonte, frequentemente tem-se $X_0 < X_1$, o que torna $I_{1\\phi} = \\frac{3V_f}{2X_1 + X_0}$ MAIOR que $I_{3\\phi} = \\frac{V_f}{X_1}$!`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Circuito de sequência zero de transformadores $\\Delta$-Y e condição $X_0 < X_1$ para $I_{1\\phi} > I_{3\\phi}$.`,
    trapNote: 'Perto de transformadores Δ-Y solidamente aterrados (onde X0 < X1), o curto fase-terra supera o curto trifásico!',
    relatedNorms: ['IEC 60909', 'IEEE Std 142'],
  });
}

function genSepLines(idx: number): ExerciseQuestion {
  const id = `q-ele-06-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-sep-lines';
  const arch = idx % 6;
  if (arch === 0) {
    const LmhKm = 1.0 + (idx % 5) * 0.1;
    const CnfKm = 10 + Math.floor(idx / 6) * 0.2;
    const Zc = Math.sqrt((LmhKm * 1e-3) / (CnfKm * 1e-9));
    const { options, correctIndex } = buildNumericOptions(Zc, [0.5, 0.75, 1.25, 1.6], 1, 'Ω', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Uma linha de transmissão de extra-alta tensão sem perdas possui indutância de sequência positiva $L' = ${LmhKm.toFixed(1)}\\text{ mH/km}$ e capacitância shunt $C' = ${CnfKm.toFixed(1)}\\text{ nF/km}$. A **Impedância Característica (Surge Impedance $Z_c$)** dessa linha é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para uma linha sem perdas ($R' = G' = 0$), a impedância de surto é puramente resistiva: $Z_c = \\sqrt{\\frac{L'}{C'}}$.`,
        `Substituindo $L' = ${LmhKm.toFixed(1)} \\times 10^{-3}\\text{ H/km}$ e $C' = ${CnfKm.toFixed(1)} \\times 10^{-9}\\text{ F/km}$:`,
        `$Z_c = \\sqrt{\\frac{${LmhKm.toFixed(1)} \\times 10^{-3}}{${CnfKm.toFixed(1)} \\times 10^{-9}}} = ${Zc.toFixed(1)}\\text{ }\\Omega$.`,
      ],
      finalDiagnosis: `Impedância característica da linha $Z_c = ${Zc.toFixed(1)}\\text{ }\\Omega$.`,
      trapNote: 'Cabos subterrâneos isolados possuem C muito maior e L menor que linhas aéreas, tendo Z_c de apenas 30 a 50 Ω (contra 250 a 400 Ω em linhas aéreas).',
      relatedNorms: ['ONS Procedimentos de Rede', 'IEC 60071'],
    });
  }
  if (arch === 1) {
    const VLkV = 500;
    const Zc = 250 + Math.floor(idx / 6) * 3;
    const SIL = (VLkV * VLkV) / Zc;
    const { options, correctIndex } = buildNumericOptions(SIL, [0.58, 0.78, 1.25, 1.73], 1, 'MW', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Uma linha de transmissão tronco de $V_L = ${VLkV}\\text{ kV}$ possui impedância característica (de surto) $Z_c = ${Zc}\\text{ }\\Omega$. A **Potência Natural (Surge Impedance Loading — SIL)** dessa linha é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A Potência Natural (SIL) é a potência ativa trifásica entregue a uma carga casada com a impedância de surto ($Z_L = Z_c$): $\\text{SIL} = \\frac{V_L^2}{Z_c}$.`,
        `Com $V_L = ${VLkV}\\text{ kV}$ (que ao quadrado já fornece $\\text{MW}\\cdot\\Omega$):`,
        `$\\text{SIL} = \\frac{${VLkV}^2}{${Zc}} = \\frac{250000}{${Zc}} = ${SIL.toFixed(1)}\\text{ MW}$.`,
      ],
      finalDiagnosis: `Potência Característica $\\text{SIL} = ${SIL.toFixed(1)}\\text{ MW}$ (perfil plano de tensão ao longo da linha).`,
      trapNote: 'Operando abaixo do SIL a linha gera reativos líquidos (Efeito Ferranti); operando acima do SIL a linha consome reativos.',
      relatedNorms: ['ONS Submódulo 2.3'],
    });
  }
  if (arch === 2) {
    const Vs = 138; // kV
    const betaLdeg = 12 + (idx % 8); // graus elétricos
    const Vr = Vs / Math.cos((betaLdeg * Math.PI) / 180);
    const { options, correctIndex } = buildNumericOptions(Vr, [0.92, 0.96, 1.04, 1.08], 2, 'kV', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Uma linha de transmissão longa sem perdas, com comprimento elétrico $\\beta \\ell = ${betaLdeg}^\\circ$ e tensão na barra transmissora $V_S = ${Vs}\\text{ kV}$, opera em vazio (terminal receptor aberto, $I_R = 0$). Devido ao **Efeito Ferranti**, a tensão $V_R$ no terminal receptor em aberto vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pelas equações hiperbólicas da linha sem perdas ($A = \\cos(\\beta\\ell)$), com $I_R = 0$ tem-se $V_S = A V_R + B I_R = \\cos(\\beta\\ell)\\,V_R$.`,
        `Logo, $V_R = \\frac{V_S}{\\cos(\\beta\\ell)} = \\frac{${Vs}}{\\cos(${betaLdeg}^\\circ)}$.`,
        `Calculando: $V_R = ${Vr.toFixed(2)}\\text{ kV} > V_S$ (sobretensão sustentada de Ferranti compensada por reatores shunt).`,
      ],
      finalDiagnosis: `Tensão em vazio no terminal receptor (Ferranti) $V_R = ${Vr.toFixed(2)}\\text{ kV}$.`,
      trapNote: 'Para compensar o efeito Ferranti em linhas longas em vazio ou carga leve, instalam-se REATORES SHUNT (indutores em derivação).',
      relatedNorms: ['ONS Submódulo 2.3', 'IEC 60071'],
    });
  }
  if (arch === 3) {
    const Z1 = 350; // linha aérea
    const Z2 = 50 + (idx % 6) * 5; // cabo subterrâneo
    const tauV = (2 * Z2) / (Z1 + Z2);
    const { options, correctIndex } = buildNumericOptions(tauV, [0.5, 0.75, 1.5, 2.5], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Um surto atmosférico de tensão propaga-se por uma linha aérea de impedância de surto $Z_1 = ${Z1}\\text{ }\\Omega$ e atinge a transição para um cabo isolado subterrâneo de impedância característica $Z_2 = ${Z2}\\text{ }\\Omega$. O **coeficiente de transmissão (refração) de tensão** $\\tau_v = V_{\\text{trans}} / V_{\\text{inc}}$ na junção é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na teoria de ondas viajantes de Bewley, o coeficiente de reflexão de tensão é $\\Gamma_v = \\frac{Z_2 - Z_1}{Z_2 + Z_1}$ e o coeficiente de refração (transmissão) é $\\tau_v = 1 + \\Gamma_v = \\frac{2 Z_2}{Z_1 + Z_2}$.`,
        `Substituindo $Z_1 = ${Z1}\\text{ }\\Omega$ e $Z_2 = ${Z2}\\text{ }\\Omega$:`,
        `$\\tau_v = \\frac{2 \\times ${Z2}}{${Z1} + ${Z2}} = ${tauV.toFixed(3)}$.`,
      ],
      finalDiagnosis: `Coeficiente de refração de tensão de Bewley $\\tau_v = ${tauV.toFixed(3)}$.`,
      trapNote: 'Em um terminal aberto (Z2 → ∞), τ_v = 2 (a onda de tensão dobra!); em um curto-circuito (Z2 = 0), τ_v = 0 e a corrente dobra.',
      relatedNorms: ['IEC 60071', 'IEEE Std 1313'],
    });
  }
  if (arch === 4) {
    const Xline = 80 + Math.floor(idx / 6) * 2; // ohms
    const kComp = 0.4 + (idx % 4) * 0.1; // 40% a 70%
    const Xeff = Xline * (1 - kComp);
    const { options, correctIndex } = buildNumericOptions(Xeff, [0.6, 0.8, 1.25, 1.6], 1, 'Ω', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 5,
      idx,
      statementMarkdown: `Uma linha de transmissão longa apresenta reatância indutiva série total $X_L = ${Xline}\\text{ }\\Omega$/fase. Instala-se um banco de **capacitores série** com grau de compensação $k_s = X_C / X_L = ${(kComp * 100).toFixed(0)}\\%$. A reatância série líquida equivalente $X_{\\text{eq}}$ da linha compensada passa a ser:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A compensação capacitiva série reduz eletricamente o comprimento da linha: $X_{\\text{eq}} = X_L - X_C = X_L(1 - k_s)$.`,
        `Com $X_L = ${Xline}\\text{ }\\Omega$ e $1 - k_s = ${(1 - kComp).toFixed(2)}$:`,
        `$X_{\\text{eq}} = ${Xline} \\times ${(1 - kComp).toFixed(2)} = ${Xeff.toFixed(1)}\\text{ }\\Omega$ (aumentando a capacidade de transferência máxima $P_{\\text{máx}} = V_S V_R / X_{\\text{eq}}$).`,
      ],
      finalDiagnosis: `Reatância longitudinal compensada $X_{\\text{eq}} = ${Xeff.toFixed(1)}\\text{ }\\Omega$.`,
      trapNote: 'Compensação capacitiva SÉRIE aumenta o limite de estabilidade estática e transitória, mas exige atenção ao risco de Ressonância Subsíncrona (SSR) com eixos de turbogeradores.',
      relatedNorms: ['ONS Submódulo 2.3', 'IEEE Std 824'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 5,
    idx,
    statementMarkdown: correctBoolean
      ? `No cálculo de Fluxo de Potência pelo método de Newton-Raphson em coordenadas polares, em sistemas de transmissão de extra-alta tensão onde $X \\gg R$, verifica-se forte acoplamento entre variações de potência ativa e ângulo ($\Delta P$-$\Delta \\theta$) e entre potência reativa e módulo de tensão ($\Delta Q$-$\Delta V$), fundamento do método Desacoplado Rápido.`
      : `Na formulação do problema de Fluxo de Potência, uma barra de Geração Controlada (Barra PV) tem como variáveis especificadas $P$ e $Q$, sendo calculados iterativamente o módulo da tensão $V$ e o ângulo $\\theta$.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Em linhas de AT/EAT com $X/R$ elevado, as submatrizes cruzadas $\\partial P/\\partial V$ e $\\partial Q/\\partial \\theta$ da Jacobiana são pequenas frente a $H = \\partial P/\\partial \\theta$ e $L = \\partial Q/\\partial V$.`,
      `Em uma Barra PV (gerador com AVR ativo), especificam-se $P$ e $|V|$, enquanto $Q$ e $\\theta$ são incógnitas (especificar $P$ e $Q$ define uma Barra PQ de carga!).`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Acoplamento $P$-$\\theta$ e $Q$-$V$ na matriz Jacobiana e classificação de barras (PQ, PV e Vθ/Slack).`,
    trapNote: 'Barra PQ: conhece P, Q (calcula V, θ); Barra PV: conhece P, V (calcula Q, θ); Barra Slack (Vθ): conhece V, θ (calcula P, Q).',
    relatedNorms: ['ONS Procedimentos de Rede'],
  });
}

function genProtNr10(idx: number): ExerciseQuestion {
  const id = `q-ele-07-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-prot-nr10';
  const arch = idx % 6;
  if (arch === 0) {
    const M = 4 + (idx % 7); // múltiplo de pickup
    const TMS = 0.2 + Math.floor(idx / 6) * 0.02;
    const tOp = TMS * (0.14 / (Math.pow(M, 0.02) - 1));
    const { options, correctIndex } = buildNumericOptions(tOp, [0.55, 0.78, 1.25, 1.6], 2, 's', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Um relé de sobrecorrente temporizado (**ANSI 51**) configurado com curva **IEC Normalmente Inversa** ($t = \\text{TMS} \\cdot \\frac{0{,}14}{M^{0{,}02} - 1}$) e dial de tempo $\\text{TMS} = ${TMS.toFixed(2)}$ detecta uma corrente de falta igual a $M = I / I_{\\text{pickup}} = ${M}$ vezes a corrente de ajuste. O tempo de atuação $t$ do relé é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela equação normalizada IEC 60255 para curva Normalmente Inversa (Standard Inverse): $t = \\text{TMS} \\times \\frac{0{,}14}{M^{0{,}02} - 1}$.`,
        `Para $M = ${M}$, tem-se $M^{0{,}02} - 1 = ${(Math.pow(M, 0.02) - 1).toFixed(5)}$.`,
        `Multiplicando por $0{,}14$ e por $\\text{TMS} = ${TMS.toFixed(2)}$, resulta $t = ${tOp.toFixed(2)}\\text{ s}$.`,
      ],
      finalDiagnosis: `Tempo de disparo ANSI 51 (IEC SI) $t = ${tOp.toFixed(2)}\\text{ s}$.`,
      trapNote: 'Não confundir os coeficientes IEC: Normalmente Inversa usa 0,14/(M^0,02 - 1); Muito Inversa usa 13,5/(M - 1); Extremamente Inversa usa 80/(M² - 1).',
      relatedNorms: ['IEC 60255', 'IEEE C37.112'],
    });
  }
  if (arch === 1) {
    const Cs = 1.0;
    const rhoS = 3000; // brita
    const ts = 0.5; // s
    const Etouch50 = (1000 + 1.5 * Cs * rhoS) * (0.116 / Math.sqrt(ts)) + (idx % 10) * 2;
    const { options, correctIndex } = buildNumericOptions(Etouch50, [0.65, 0.82, 1.18, 1.4], 1, 'V', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `No dimensionamento de uma malha de aterramento de subestação segundo a **IEEE Std 80** e **ABNT NBR 15751** (para pessoa de $50\\text{ kg}$, brita superficial com $\\rho_s = 3000\\text{ }\\Omega\\cdot\\text{m}$, $C_s = 1{,}0$, tempo de eliminação da falta $t_s = 0{,}50\\text{ s}$ e margem adicional de projeto de ${(idx % 10) * 2} V), a **tensão de toque máxima admissível** $E_{\\text{toque,50}}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela fórmula de Dalziel na IEEE Std 80 (para $50\\text{ kg}$): $E_{\\text{toque,50}} = (1000 + 1{,}5\\,C_s \\rho_s)\\frac{0{,}116}{\\sqrt{t_s}}$.`,
        `Com $1000 + 1{,}5 \\times 3000 = 5500\\text{ }\\Omega$ e $0{,}116 / \\sqrt{0{,}5} = 0{,}16405\\text{ A}$, a parcela base vale $902{,}3\\text{ V}$.`,
        `Somando o ajuste de projeto especificado: $E_{\\text{toque,50}} = ${Etouch50.toFixed(1)}\\text{ V}$.`,
      ],
      finalDiagnosis: `Limite tolerável de tensão de toque $E_{\\text{toque,50}} = ${Etouch50.toFixed(1)}\\text{ V}$.`,
      trapNote: 'Na equação de tensão de PASSO o coeficiente da resistividade da brita é 6,0·Cs·ρs (quatro vezes maior que o 1,5·Cs·ρs da tensão de toque!).',
      relatedNorms: ['IEEE Std 80', 'ABNT NBR 15751'],
    });
  }
  if (arch === 2) {
    const I1 = 800 + Math.floor(idx / 6) * 20;
    const rtc1 = 200; // 1000/5
    const I2 = 720 + Math.floor(idx / 6) * 18;
    const rtc2 = 200;
    const i1s = I1 / rtc1;
    const i2s = I2 / rtc2;
    const iDiff = Math.abs(i1s - i2s);
    const { options, correctIndex } = buildNumericOptions(iDiff, [0.5, 0.75, 1.5, 2.5], 2, 'A', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Em um esquema de proteção diferencial percentual (**ANSI 87**) com TCs de relação $1000/5\\text{ A}$ ($\\text{RTC} = 200$) em ambos os lados, as correntes primárias medidas são $I_{1p} = ${I1}\\text{ A}$ e $I_{2p} = ${I2}\\text{ A}$ em fase. A **corrente diferencial de operação** $I_d = |I_{1s} - I_{2s}|$ que circula na bobina de operação do relé vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Reduzindo as correntes primárias para o secundário dos TCs ($\text{RTC} = 200$): $I_{1s} = \\frac{${I1}}{200} = ${i1s.toFixed(2)}\\text{ A}$ e $I_{2s} = \\frac{${I2}}{200} = ${i2s.toFixed(2)}\\text{ A}$.`,
        `A corrente diferencial de operação é a diferença vetorial: $I_d = |I_{1s} - I_{2s}| = |${i1s.toFixed(2)} - ${i2s.toFixed(2)}|$.`,
        `Logo, $I_d = ${iDiff.toFixed(2)}\\text{ A}$.`,
      ],
      finalDiagnosis: `Corrente diferencial secundária $I_d = ${iDiff.toFixed(2)}\\text{ A}$.`,
      trapNote: 'Em transformadores Y-Δ, os TCs ou o algoritmo numérico do relé 87T devem compensar o defasamento de 30° e filtrar a componente de sequência zero.',
      relatedNorms: ['IEEE C37.91', 'IEC 60255'],
    });
  }
  if (arch === 3) {
    const Icc = 15 + (idx % 6) * 3; // kA
    const t = 0.08 + Math.floor(idx / 6) * 0.005; // s
    const Ecal = 4.2 * Icc * t;
    const { options, correctIndex } = buildNumericOptions(Ecal, [0.5, 0.75, 1.35, 1.8], 2, 'cal/cm²', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Em um estudo de **Energia Incidente de Arco Elétrico (Arc Flash — NFPA 70E / IEEE 1584 / NR-10)** para um painel de média tensão onde a energia incidente normalizada na distância de trabalho é $k_{\\text{arco}} = 4{,}2\\text{ cal/(cm}^2\\cdot\\text{kA}\\cdot\\text{s)}$, a corrente de arco vale $I_{\\text{arco}} = ${Icc}\\text{ kA}$ e o tempo total de abertura do disjuntor é $t = ${t.toFixed(3)}\\text{ s}$. A energia incidente $E$ na vestimenta ATPV vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A energia térmica incidente do arco elétrico é diretamente proporcional à duração $t$ do arco: $E = k_{\\text{arco}} \\cdot I_{\\text{arco}} \\cdot t$.`,
        `Substituindo $I_{\\text{arco}} = ${Icc}\\text{ kA}$ e $t = ${t.toFixed(3)}\\text{ s}$:`,
        `$E = 4{,}2 \\times ${Icc} \\times ${t.toFixed(3)} = ${Ecal.toFixed(2)}\\text{ cal/cm}^2$.`,
      ],
      finalDiagnosis: `Energia incidente de arco elétrico $E = ${Ecal.toFixed(2)}\\text{ cal/cm}^2$ (vestimenta NR-10 deve ter $\\text{ATPV} \\ge E$).`,
      trapNote: 'A forma mais eficaz de reduzir a energia incidente de arco elétrico é reduzir o TEMPO de atuação da proteção (ex: seletividade lógica ou relé óptico de arco).',
      relatedNorms: ['NR-10', 'IEEE Std 1584', 'NFPA 70E'],
    });
  }
  if (arch === 4) {
    const Zline = 20 + Math.floor(idx / 6) * 2; // ohms primários
    const rtc = 120; // 600/5
    const rtp = 1200; // 138000/115
    const zSec = Zline * (rtc / rtp) * 0.85; // Zona 1 = 85%
    const { options, correctIndex } = buildNumericOptions(zSec, [0.5, 0.78, 1.18, 1.5], 2, 'Ω secundários', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 6,
      idx,
      statementMarkdown: `Um relé de distância (**ANSI 21**) protege uma linha de transmissão de impedância primária total $Z_{L,\\text{prim}} = ${Zline}\\text{ }\\Omega$, utilizando TCs com $\\text{RTC} = ${rtc}$ e TPs com $\\text{RTP} = ${rtp}$. Ajustando o alcance instantâneo da **Zona 1 em $85\\%$** da linha, a impedância secundária de ajuste $Z_{1,\\text{sec}}$ vista pelo relé é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A impedância secundária vista pelos terminais do relé 21 é $Z_{\\text{sec}} = \\frac{V_{\\text{sec}}}{I_{\\text{sec}}} = \\frac{V_{\\text{prim}} / \\text{RTP}}{I_{\\text{prim}} / \\text{RTC}} = Z_{\\text{prim}} \\cdot \\frac{\\text{RTC}}{\\text{RTP}}$.`,
        `Para a linha total, $Z_{L,\\text{sec}} = ${Zline} \\times \\frac{${rtc}}{${rtp}} = ${(Zline * rtc / rtp).toFixed(2)}\\text{ }\\Omega$.`,
        `Para os $85\\%$ da Zona 1 instantânea: $Z_{1,\\text{sec}} = 0{,}85 \\times ${(Zline * rtc / rtp).toFixed(2)} = ${zSec.toFixed(2)}\\text{ }\\Omega\\text{ secundários}$.`,
      ],
      finalDiagnosis: `Alcance secundário de Zona 1 (ANSI 21) $Z_{1,\\text{sec}} = ${zSec.toFixed(2)}\\text{ }\\Omega$.`,
      trapNote: 'Ao converter impedância primária para secundária multiplica-se por (RTC / RTP), e não por (RTP / RTC)!',
      relatedNorms: ['IEEE C37.113', 'ONS Submódulo 2.6'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 6,
    idx,
    statementMarkdown: correctBoolean
      ? `Segundo a Norma Regulamentadora NR-10, a desenergização elétrica para trabalho seguro só é considerada concluída mediante a execução sequencial de: seccionamento, impedimento de reenergização, constatação da ausência de tensão, instalação de aterramento temporário com equipotencialização, proteção dos elementos energizados na zona controlada e instalação da sinalização de impedimento.`
      : `Na proteção de transformadores de potência, a corrente de magnetização transitória de energização (inrush current) é rica em harmônicos de 3ª ordem, razão pela qual o bloqueio por retenção harmônica do relé diferencial ANSI 87T utiliza exclusivamente o 5º harmônico ($300\\text{ Hz}$).`,
    correctBoolean,
    solutionStepsMarkdown: [
      `O item 10.5.1 da NR-10 estabelece exatamente os 6 passos obrigatórios de desenergização na ordem citada (e a reenergização segue a sequência inversa, retirando primeiro ferramentas e aterramentos temporários).`,
      `Já a corrente de inrush de magnetização de transformadores é caracterizada por forte componente de **2º harmônico** ($120\\text{ Hz}$), que é utilizado pelo relé 87T para bloquear disparos falsos na energização (o 5º harmônico é usado para sobre-excitação $V/Hz$).`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Sequência de Ouro de desenergização NR-10 (item 10.5.1) e restrição por 2º harmônico no relé 87T.`,
    trapNote: 'No relé 87T: 2º harmônico bloqueia Inrush de energização; 5º harmônico bloqueia Sobre-excitação (ANSI 24).',
    relatedNorms: ['NR-10', 'IEEE C37.91'],
  });
}

function genProtEx(idx: number): ExerciseQuestion {
  const id = `q-ele-08-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-prot-ex';
  const arch = idx % 6;
  if (arch === 0) {
    const V = 24;
    const I = 0.08 + (idx % 6) * 0.015; // A
    const Cuf = 0.1 + Math.floor(idx / 6) * 0.02;
    const Lmh = 2.0 + (idx % 5) * 0.5;
    const EcapUj = 0.5 * Cuf * V * V;
    const EindUj = 0.5 * Lmh * 1000 * I * I;
    const EtotUj = EcapUj + EindUj;
    const { options, correctIndex } = buildNumericOptions(EtotUj, [0.5, 0.75, 1.35, 1.8], 1, 'μJ', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `Em um circuito de Segurança Intrínseca (**Ex i — ABNT NBR IEC 60079-11**) operando em $V_0 = ${V}\\text{ V}$ e corrente de falta limitada por barreira Zener a $I_0 = ${(I * 1000).toFixed(0)}\\text{ mA}$, o cabo de campo adiciona capacitância equivalente $C_c = ${Cuf.toFixed(2)}\\text{ }\\mu\\text{F}$ e indutância $L_c = ${Lmh.toFixed(1)}\\text{ mH}$. A energia reativa máxima armazenada total ($E_{\\text{tot}} = \\frac{1}{2}C_c V_0^2 + \\frac{1}{2}L_c I_0^2$) em microjoules ($\\mu\\text{J}$) vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A energia capacitiva armazenada no cabo é $E_C = \\frac{1}{2} C_c V_0^2 = 0{,}5 \\times ${Cuf.toFixed(2)}\\text{ }\\mu\\text{F} \\times 24^2 = ${EcapUj.toFixed(1)}\\text{ }\\mu\\text{J}$.`,
        `A energia indutiva armazenada é $E_L = \\frac{1}{2} L_c I_0^2 = 0{,}5 \\times (${Lmh.toFixed(1)} \\times 1000\\text{ }\\mu\\text{H}) \\times (${I.toFixed(3)})^2 = ${EindUj.toFixed(1)}\\text{ }\\mu\\text{J}$.`,
        `Somando ambas: $E_{\\text{tot}} = ${EtotUj.toFixed(1)}\\text{ }\\mu\\text{J}$ (deve ser inferior à Energia Mínima de Ignição — MIE do grupo de gás com fator de segurança normativo).`,
      ],
      finalDiagnosis: `Energia máxima armazenada no laço Ex i: $E_{\\text{tot}} = ${EtotUj.toFixed(1)}\\text{ }\\mu\\text{J}$.`,
      trapNote: 'Para o Grupo IIC (Hidrogênio e Acetileno), a Energia Mínima de Ignição (MIE) é de apenas ~20 μJ (contra ~280 μJ do Grupo IIA — Metano/Propano).',
      relatedNorms: ['ABNT NBR IEC 60079-11', 'ABNT NBR IEC 60079-0'],
    });
  }
  if (arch === 1) {
    const Tamb = 40 + (idx % 4) * 5;
    const Rth = 2.5 + (idx % 5) * 0.4; // °C/W
    const P = 20 + Math.floor(idx / 6) * 1.2; // W
    const Tsurf = Tamb + Rth * P;
    const { options, correctIndex } = buildNumericOptions(Tsurf, [0.75, 0.88, 1.12, 1.25], 1, '°C', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `Um invólucro elétrico instalado em área classificada offshore com temperatura ambiente máxima $T_{\\text{amb}} = ${Tamb}\\text{ }^\\circ\\text{C}$ possui resistência térmica superficial $R_{\\text{th}} = ${Rth.toFixed(1)}\\text{ }^\\circ\\text{C/W}$ e dissipa internamente $P = ${P.toFixed(1)}\\text{ W}$. A **temperatura máxima de superfície** $T_{\\text{sup}}$ atingida em regime permanente (**NBR IEC 60079-0**) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A elevação térmica acima do ambiente é $\\Delta T = R_{\\text{th}} \\cdot P = ${Rth.toFixed(1)} \\times ${P.toFixed(1)} = ${(Rth * P).toFixed(1)}\\text{ }^\\circ\\text{C}$.`,
        `A temperatura máxima de superfície é $T_{\\text{sup}} = T_{\\text{amb}} + \\Delta T = ${Tamb} + ${(Rth * P).toFixed(1)} = ${Tsurf.toFixed(1)}\\text{ }^\\circ\\text{C}$.`,
        `Classes de Temperatura IEC 60079-0: T1 ($450\\text{ }^\\circ\\text{C}$), T2 ($300\\text{ }^\\circ\\text{C}$), T3 ($200\\text{ }^\\circ\\text{C}$), T4 ($135\\text{ }^\\circ\\text{C}$), T5 ($100\\text{ }^\\circ\\text{C}$) e T6 ($85\\text{ }^\\circ\\text{C}$).`,
      ],
      finalDiagnosis: `Temperatura de superfície $T_{\\text{sup}} = ${Tsurf.toFixed(1)}\\text{ }^\\circ\\text{C}$.`,
      trapNote: 'A classe T6 (85 °C) é a MAIS restritiva/segura termicamente; T1 (450 °C) é a menos restritiva.',
      relatedNorms: ['ABNT NBR IEC 60079-0'],
    });
  }
  if (arch === 2) {
    const Venc = 0.8 + (idx % 6) * 0.3; // m3
    const nVol = 5; // 5 trocas de volume (Ex p)
    const Qm3min = 0.2 + Math.floor(idx / 6) * 0.01;
    const tPurgeMin = (nVol * Venc) / Qm3min;
    const { options, correctIndex } = buildNumericOptions(tPurgeMin, [0.5, 0.75, 1.25, 1.6], 1, 'min', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `Um painel elétrico com proteção por **Invólucro Pressurizado (Ex p — ABNT NBR IEC 60079-2)** possui volume livre interno $V = ${Venc.toFixed(1)}\\text{ m}^3$. Exigindo-se um ciclo prévio de purga de no mínimo $5$ vezes o volume interno com vazão de gás inerte/ar limpo $Q = ${Qm3min.toFixed(2)}\\text{ m}^3/\\text{min}$ antes da energização, o **tempo mínimo de purga** $t_{\\text{purga}}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pela norma NBR IEC 60079-2, o volume mínimo de gás de purga para motores e painéis Ex p é $V_{\\text{purga}} = 5 \\times V = 5 \\times ${Venc.toFixed(1)} = ${(5 * Venc).toFixed(1)}\\text{ m}^3$.`,
        `Dividindo pela vazão volumétrica de purga $Q = ${Qm3min.toFixed(2)}\\text{ m}^3/\\text{min}$:`,
        `$t_{\\text{purga}} = \\frac{${(5 * Venc).toFixed(1)}}{${Qm3min.toFixed(2)}} = ${tPurgeMin.toFixed(1)}\\text{ min}$.`,
      ],
      finalDiagnosis: `Tempo mínimo de pré-purga Ex p: $t_{\\text{purga}} = ${tPurgeMin.toFixed(1)}\\text{ min}$.`,
      trapNote: 'Em operação normal Ex p, a sobrepressão interna mínima mantida em relação à atmosfera externa deve ser de pelo menos 50 Pa (0,5 mbar).',
      relatedNorms: ['ABNT NBR IEC 60079-2'],
    });
  }
  if (arch === 3) {
    const Lfl = 25 + (idx % 6) * 5; // mm comprimento de junta
    const ic = 0.15 + Math.floor(idx / 6) * 0.002; // mm interstício
    const ratio = Lfl / ic;
    const { options, correctIndex } = buildNumericOptions(ratio, [0.5, 0.75, 1.25, 1.6], 1, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `Em um invólucro **À Prova de Explosão (Ex d — ABNT NBR IEC 60079-1)** projetado para Grupo IIB/IIC, uma junta flangeada possui comprimento de passagem de chama $L = ${Lfl}\\text{ mm}$ e interstício máximo de projeto $i_c = ${ic.toFixed(3)}\\text{ mm}$. A razão geométrica de extinção de chama $L / i_c$ dessa junta vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A junta à prova de explosão (flamepath) resfria os gases quentes de uma eventual ignição interna abaixo da temperatura de ignição da atmosfera externa através de longo comprimento $L$ e reduzido interstício $i_c$ (menor que o MESG — Interstício Experimental Máximo Seguro).`,
        `Calculando a razão $L / i_c$: $\\frac{${Lfl}}{${ic.toFixed(3)}} = ${ratio.toFixed(1)}$.`,
        `Nota: Em juntas flangeadas Ex d, jamais se deve pintar as superfícies usinadas da passagem de chama nem furar o invólucro em campo.`,
      ],
      finalDiagnosis: `Razão de aspecto da passagem de chama Ex d: $L / i_c = ${ratio.toFixed(1)}$.`,
      trapNote: 'O invólucro Ex d NÃO é hermético: ele permite a entrada do gás, resiste à pressão da explosão interna e resfria os gases na saída pela junta.',
      relatedNorms: ['ABNT NBR IEC 60079-1'],
    });
  }
  if (arch === 4) {
    const Inom = 40 + (idx % 8) * 10;
    const IA = Inom * (5 + (idx % 3));
    const ratioIaIn = IA / Inom;
    const tE = 12 - (idx % 5); // >= 5 s
    const { options, correctIndex } = buildNumericOptions(tE, [0.4, 0.65, 1.35, 1.75], 1, 's', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 7,
      idx,
      statementMarkdown: `Um motor de indução com proteção por **Segurança Aumentada (Ex e — ABNT NBR IEC 60079-7)** possui corrente nominal $I_N = ${Inom}\\text{ A}$ e corrente de partida com rotor bloqueado $I_A = ${IA}\\text{ A}$ ($I_A / I_N = ${ratioIaIn}$). Sabendo que a elevação de temperatura com rotor bloqueado até a temperatura limite leva $\\Delta T_{\\text{lim}} / (\\text{taxa térmica}) = ${tE.toFixed(1)}\\text{ s}$, o **tempo $t_E$** certificado na placa do motor (que não pode ser inferior a $5\\text{ s}$ pela norma) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na proteção Ex e (NBR IEC 60079-7), o tempo $t_E$ é o tempo necessário para que um enrolamento CA, quando percorrido pela corrente de partida $I_A$, atinja a temperatura limite a partir da temperatura de serviço nominal na máxima temperatura ambiente.`,
        `O relé de proteção de sobrecarga com rotor bloqueado deve atuar obrigatoriamente ANTES de $t_E$.`,
        `Para os dados fornecidos, $t_E = ${tE.toFixed(1)}\\text{ s} \\ge 5\\text{ s}$.`,
      ],
      finalDiagnosis: `Tempo limite de rotor bloqueado Ex e: $t_E = ${tE.toFixed(1)}\\text{ s}$.`,
      trapNote: 'Em motores Ex e, o relé térmico/eletrônico deve desligar o motor com rotor bloqueado antes de transcorrer o tempo t_E.',
      relatedNorms: ['ABNT NBR IEC 60079-7', 'ABNT NBR IEC 60079-14'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 7,
    idx,
    statementMarkdown: correctBoolean
      ? `Pela ABNT NBR IEC 60079-0 e 60079-10-1, equipamentos com Nível de Proteção de Equipamento (EPL) Ga (como Ex ia) oferecem nível muito alto de proteção e são aprovados para operação contínua em Zona 0, Zona 1 e Zona 2, enquanto equipamentos EPL Gb (como Ex d, Ex e, Ex ib) aplicam-se às Zonas 1 e 2.`
      : `Segundo a ABNT NBR IEC 60079-1, o gás Hidrogênio ($\\text{H}_2$) e o Acetileno ($\\text{C}_2\\text{H}_2$) pertencem ao Grupo IIA por apresentarem o maior interstício experimental máximo seguro (MESG) entre os gases industriais.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `A correspondência normativa é: Zona 0 (presença contínua de atmosfera explosiva) exige EPL Ga; Zona 1 (provável em operação normal) exige EPL Gb ou Ga; Zona 2 (improvável e de curta duração) aceita EPL Gc, Gb ou Ga.`,
      `Já o Hidrogênio e o Acetileno pertencem ao **Grupo IIC** (o mais severo e perigoso para gases, com menor MESG $< 0{,}5\\text{ mm}$ e menor MIE), enquanto o Metano/Propano pertencem ao Grupo IIA.`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Classificação de Zonas (0, 1, 2), EPL (Ga, Gb, Gc) e Grupos de Gases (IIA, IIB, IIC).`,
    trapNote: 'Grupo I = Minas subterrâneas (Grisu); Grupo IIA = Propano/Metano; Grupo IIB = Etileno; Grupo IIC = Hidrogênio/Acetileno/Dissulfeto de Carbono; Grupo III = Poeiras (IIIA, IIIB, IIIC).',
    relatedNorms: ['ABNT NBR IEC 60079-0', 'ABNT NBR IEC 60079-14'],
  });
}

function genPeConverters(idx: number): ExerciseQuestion {
  const id = `q-ele-09-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-pe-converters';
  const arch = idx % 6;
  if (arch === 0) {
    const Vin = 48 + (idx % 6) * 12;
    const D = 0.25 + (idx % 5) * 0.12;
    const fs = 20000; // 20 kHz
    const L = 0.002; // 2 mH
    const Vout = D * Vin;
    const dIL = (Vin * D * (1 - D)) / (fs * L);
    const { options, correctIndex } = buildNumericOptions(dIL, [0.5, 0.75, 1.35, 2.0], 2, 'A', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Um conversor CC-CC abaixador (**Buck**) ideal em Modo de Condução Contínua (MCC) opera com tensão de entrada $V_{\\text{in}} = ${Vin}\\text{ V}$, razão cíclica $D = ${D.toFixed(2)}$ ($V_{\\text{out}} = ${Vout.toFixed(1)}\\text{ V}$), frequência de chaveamento $f_s = 20\\text{ kHz}$ e indutor de filtro $L = 2{,}0\\text{ mH}$. A **ondulação pico-a-pico da corrente no indutor** ($\\Delta I_L$) vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Durante o intervalo $t_{\\text{on}} = D / f_s$, a tensão sobre o indutor do Buck é $v_L = V_{\\text{in}} - V_{\\text{out}} = V_{\\text{in}}(1 - D)$.`,
        `Portanto, $\\Delta I_L = \\frac{V_{\\text{in}} D (1 - D)}{f_s L}$.`,
        `Substituindo os valores: $\\Delta I_L = \\frac{${Vin} \\times ${D.toFixed(2)} \\times ${(1 - D).toFixed(2)}}{20000 \\times 0{,}002} = ${dIL.toFixed(2)}\\text{ A}$.`,
      ],
      finalDiagnosis: `Ripple de corrente no indutor Buck $\\Delta I_L = ${dIL.toFixed(2)}\\text{ A}$ (máximo em $D = 0{,}5$).`,
      trapNote: 'No conversor Buck, a ondulação máxima de corrente ΔI_L ocorre exatamente em razão cíclica D = 0,5.',
      relatedNorms: ['IEC 60146', 'IEEE Std 519'],
    });
  }
  if (arch === 1) {
    const Vin = 100 + (idx % 6) * 20;
    const D = 0.5 + (idx % 4) * 0.1; // 0.5 a 0.8
    const Vout = Vin / (1 - D);
    const { options, correctIndex } = buildNumericOptions(Vout, [0.5, 0.75, 1.25, 1.6], 1, 'V', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Um conversor CC-CC elevador (**Boost**) ideal operando em Modo de Condução Contínua (MCC) recebe de um arranjo fotovoltaico/bateria a tensão $V_{\\text{in}} = ${Vin}\\text{ V}$ e opera com razão cíclica $D = ${D.toFixed(1)}$. Pelo balanço volt-segundo no indutor, a tensão média de saída $V_{\\text{out}}$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Aplicando o equilíbrio volt-segundo ao indutor do Boost em regime permanente: $V_{\\text{in}} D T_s + (V_{\\text{in}} - V_{\\text{out}})(1 - D)T_s = 0$.`,
        `Simplificando: $V_{\\text{out}} = \\frac{V_{\\text{in}}}{1 - D}$.`,
        `Para $V_{\\text{in}} = ${Vin}\\text{ V}$ e $D = ${D.toFixed(1)}$: $V_{\\text{out}} = \\frac{${Vin}}{${(1 - D).toFixed(1)}} = ${Vout.toFixed(1)}\\text{ V}$.`,
      ],
      finalDiagnosis: `Tensão de saída do conversor Boost $V_{\\text{out}} = ${Vout.toFixed(1)}\\text{ V}$.`,
      trapNote: 'Não confundir o ganho do Boost [1/(1-D)] com o ganho do Buck-Boost [-D/(1-D)].',
      relatedNorms: ['IEC 62109'],
    });
  }
  if (arch === 2) {
    const VL = 380 + (idx % 3) * 60;
    const alphaDeg = (idx % 4) * 15; // 0, 15, 30, 45
    const Vd0 = 1.35047 * VL;
    const Vd = Vd0 * Math.cos((alphaDeg * Math.PI) / 180);
    const { options, correctIndex } = buildNumericOptions(Vd, [0.58, 0.74, 1.18, 1.41], 1, 'V', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Uma **ponte retificadora trifásica completa a 6 pulsos (Ponte de Graetz)** a tiristores é alimentada por rede trifásica simétrica com tensão eficaz de linha $V_L = ${VL}\\text{ V}$ e opera com ângulo de disparo $\\alpha = ${alphaDeg}^\\circ$ sob carga altamente indutiva (condução contínua, sem comutação). A **tensão média CC na carga** ($V_d$) vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para uma ponte trifásica de 6 pulsos, a tensão média máxima em $\\alpha = 0^\\circ$ é $V_{d0} = \\frac{3\\sqrt{2}}{\\pi} V_L \\approx 1{,}3505\\,V_L = ${Vd0.toFixed(1)}\\text{ V}$.`,
        `Com controle de fase a tiristores em condução contínua: $V_d(\\alpha) = V_{d0}\\cos\\alpha$.`,
        `Para $\\alpha = ${alphaDeg}^\\circ$ ($\\cos ${alphaDeg}^\\circ = ${Math.cos((alphaDeg * Math.PI) / 180).toFixed(4)}$): $V_d = ${Vd.toFixed(1)}\\text{ V}$.`,
      ],
      finalDiagnosis: `Tensão CC média da ponte de 6 pulsos $V_d = ${Vd.toFixed(1)}\\text{ V}$.`,
      trapNote: 'Para α > 90° (com fonte CC ativa na carga), V_d torna-se negativa e a ponte de Graetz passa a operar no MODO INVERSOR regenerativo.',
      relatedNorms: ['IEC 60146', 'IEEE Std 519'],
    });
  }
  if (arch === 3) {
    const p = 6 + (idx % 2) * 6; // 6 ou 12 pulsos
    const k = 1 + Math.floor(idx / 6) % 4;
    const hMinus = k * p - 1;
    const { options, correctIndex } = buildNumericOptions(hMinus, [0.6, 0.8, 1.2, 1.5], 0, 'ª ordem', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Em um conversor CA-CC industrial de **$p = ${p}$ pulsos** alimentado por rede trifásica equilibrada (**IEEE Std 519**), as ordens harmônicas características na corrente de linha obedecem à lei $h = k p \\pm 1$ ($k = 1, 2, 3, \\dots$). Para $k = ${k}$, a menor das duas ordens harmônicas características do par ($h_- = k p - 1$, de sequência negativa) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A regra geral dos harmônicos característicos no lado CA de um conversor de $p$ pulsos é $h = k p \\pm 1$.`,
        `Para $p = ${p}$ pulsos e $k = ${k}$, o par característico é $h = ${k} \\times ${p} \\pm 1 = ${k * p} \\pm 1$ (ou seja, ${k * p - 1}ª e ${k * p + 1}ª ordens).`,
        `A menor ordem do par (que gira em sequência de fase negativa) é $h_- = ${hMinus}^\\text{a}\\text{ ordem}$ (amplitude teórica $I_h = I_1 / h$).`,
      ],
      finalDiagnosis: `Harmônico característico $h_- = ${hMinus}^\\text{a}\\text{ ordem}$ ($k = ${k}, p = ${p}$).`,
      trapNote: 'Conversores de 12 pulsos (usando transformador defasador Y-Y e Y-Δ de 30°) eliminam o 5º e o 7º harmônicos, restando como primeiros harmônicos o 11º e o 13º!',
      relatedNorms: ['IEEE Std 519', 'ANEEL PRODIST Módulo 8'],
    });
  }
  if (arch === 4) {
    const Vdc = 600 + Math.floor(idx / 6) * 20;
    const ma = 0.8 + (idx % 5) * 0.04; // <= 1.0 linear
    const VllRms = 0.61237 * ma * Vdc;
    const { options, correctIndex } = buildNumericOptions(VllRms, [0.58, 0.816, 1.15, 1.41], 1, 'V', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 8,
      idx,
      statementMarkdown: `Um inversor trifásico fonte de tensão (**VSI**) com modulação **SPWM senoidal** na região linear opera com barramento CC $V_{\\text{dc}} = ${Vdc}\\text{ V}$ e índice de modulação de amplitude $m_a = ${ma.toFixed(2)}$. O valor **eficaz (RMS) da componente fundamental da tensão de linha** ($V_{LL,1,\\text{rms}}$) na saída é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na modulação SPWM senoidal pura ($m_a \\le 1$), o pico da tensão de fase fundamental é $\\hat{V}_{an,1} = m_a \\frac{V_{\\text{dc}}}{2}$.`,
        `Convertendo para tensão de linha eficaz: $V_{LL,1,\\text{rms}} = \\frac{\\sqrt{3}}{\\sqrt{2}} \\hat{V}_{an,1} = \\frac{\\sqrt{3}}{2\\sqrt{2}} m_a V_{\\text{dc}} \\approx 0{,}6124\\,m_a V_{\\text{dc}}$.`,
        `Substituindo: $V_{LL,1,\\text{rms}} = 0{,}6124 \\times ${ma.toFixed(2)} \\times ${Vdc} = ${VllRms.toFixed(1)}\\text{ V}$.`,
      ],
      finalDiagnosis: `Tensão de linha fundamental eficaz SPWM $V_{LL,1,\\text{rms}} = ${VllRms.toFixed(1)}\\text{ V}$.`,
      trapNote: 'Se for usada Modulação Vetorial Espacial (SVPWM) ou injeção de 3º harmônico, o ganho máximo linear sobe em 15,47% (chegando a 0,707·V_dc).',
      relatedNorms: ['IEC 61800'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 8,
    idx,
    statementMarkdown: correctBoolean
      ? `Em conversores estáticos de potência com carga indutiva, o diodo de roda-livre (freewheeling diode) em antiparalelo com cada chave semicondutora (IGBT/MOSFET) é indispensável para oferecer caminho contínuo à corrente do indutor durante o bloqueio da chave, evitando sobretensões destrutivas $v_L = L\\,di/dt$.`
      : `O tiristor convencional (SCR) é uma chave semicondutora totalmente controlada, podendo ser ligada e bloqueada a qualquer instante em corrente contínua apenas pela aplicação de um pulso negativo no terminal de gatilho (gate).`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Interromper abruptamente a corrente de um indutor sem caminho alternativo geraria um pico de tensão $L\\,di/dt \\to \\infty$ que destruiria o transistor por avalanche.`,
      `Já o SCR é um dispositivo **semi-controlado**: o gatilho apenas dispara a condução; o bloqueio exige que a corrente de ânodo caia abaixo da corrente de manutenção ($I_H$) com polarização reversa (quem bloqueia por pulso negativo de gate é o GTO/IGCT).`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Função do diodo de roda-livre e comutação de tiristores SCR vs. IGBTs/GTOs.`,
    trapNote: 'SCR liga pelo gate mas só desliga por comutação natural da rede ou circuito forçado; IGBT e MOSFET ligam e desligam pelo gate.',
    relatedNorms: ['IEC 60146'],
  });
}

function genCtrlFreq(idx: number): ExerciseQuestion {
  const id = `q-ele-10-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'e-ctrl-freq';
  const arch = idx % 6;
  if (arch === 0) {
    const a2 = 3 + (idx % 5);
    const a1 = 4 + (idx % 6) * 2;
    const Kcrit = a2 * a1;
    const { options, correctIndex } = buildNumericOptions(Kcrit, [0.5, 0.75, 1.33, 2.0], 1, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Um sistema de controle em malha fechada possui equação característica de 3ª ordem $s^3 + ${a2}s^2 + ${a1}s + K = 0$ ($K > 0$). Pelo **Critério de Estabilidade de Routh-Hurwitz**, o ganho crítico $K_{\\text{crít}}$ no limite da estabilidade marginal (onde os polos cruzam o eixo imaginário $j\\omega$) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Montando a tabulação de Routh para $s^3 + a_2 s^2 + a_1 s + K = 0$: linha $s^3$: $[1, a_1]$; linha $s^2$: $[a_2, K]$.`,
        `O primeiro elemento da linha $s^1$ é $b_1 = \\frac{a_2 a_1 - K}{a_2}$, e o da linha $s^0$ é $K$.`,
        `Para estabilidade assintótica exige-se $0 < K < a_2 a_1$. Logo, o ganho crítico é $K_{\\text{crít}} = ${a2} \\times ${a1} = ${Kcrit.toFixed(1)}$ (com frequência de oscilação $\\omega = \\sqrt{a_1} = \\sqrt{${a1}}\\text{ rad/s}$).`,
      ],
      finalDiagnosis: `Ganho crítico de Routh-Hurwitz $K_{\\text{crít}} = ${Kcrit.toFixed(1)}$.`,
      trapNote: 'Em qualquer polinômio de 3ª ordem s³ + a2·s² + a1·s + a0 = 0 com coeficientes positivos, a condição de Routh é simplesmente a2·a1 > a0!',
      relatedNorms: ['ISA-5.1', 'IEC 61131'],
    });
  }
  if (arch === 1) {
    const Kv = 10 + Math.floor(idx / 6) * 2;
    const ess = 1 / Kv;
    const { options, correctIndex } = buildNumericOptions(ess, [0.5, 0.75, 1.5, 2.0], 4, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Um sistema de controle com realimentação unitária negativa é do **Tipo 1** (possui exatamente 1 integrador puro $1/s$ na malha direta) e apresenta constante de erro estático de velocidade $K_v = \\lim_{s \\to 0} s G(s) = ${Kv}\\text{ s}^{-1}$. Quando submetido a uma entrada em **rampa unitária** $r(t) = t\\,u(t)$ ($R(s) = 1/s^2$), o erro estacionário $e_{ss}$ em regime permanente vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para um sistema estável do Tipo 1 com realimentação unitária, o erro ao degrau é nulo ($e_{\\text{degrau}} = 0$) e o erro à rampa unitária é finito e igual a $e_{ss} = \\frac{1}{K_v}$.`,
        `Com $K_v = ${Kv}\\text{ s}^{-1}$:`,
        `$e_{ss} = \\frac{1}{${Kv}} = ${ess.toFixed(4)}$.`,
      ],
      finalDiagnosis: `Erro estacionário de velocidade (rampa) $e_{ss} = ${ess.toFixed(4)}$.`,
      trapNote: 'Sistema Tipo 0 tem erro finito ao degrau 1/(1+Kp); Tipo 1 tem erro finito à rampa 1/Kv; Tipo 2 tem erro finito à parábola 1/Ka.',
      relatedNorms: ['IEC 61131'],
    });
  }
  if (arch === 2) {
    const zeta = 0.4 + (idx % 5) * 0.1; // 0.4 a 0.8
    const mpPct = Math.exp((-Math.PI * zeta) / Math.sqrt(1 - zeta * zeta)) * 100;
    const { options, correctIndex } = buildNumericOptions(mpPct, [0.55, 0.78, 1.25, 1.6], 2, '%', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Um sistema padrão de 2ª ordem subamortecido possui função de transferência $T(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}$ com coeficiente de amortecimento $\\zeta = ${zeta.toFixed(1)}$. O **sobressinal máximo percentual (Maximum Peak Overshoot $M_p\\%$)** em resposta ao degrau unitário é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O sobressinal percentual de um sistema de 2ª ordem sem zeros depende exclusivamente de $\\zeta$: $M_p = e^{-\\frac{\\pi\\zeta}{\\sqrt{1 - \\zeta^2}}} \\times 100\\%$.`,
        `Para $\\zeta = ${zeta.toFixed(1)}$, tem-se $\\frac{\\pi \\times ${zeta.toFixed(1)}}{\\sqrt{1 - ${(zeta * zeta).toFixed(2)}}} = ${((Math.PI * zeta) / Math.sqrt(1 - zeta * zeta)).toFixed(4)}$.`,
        `Logo, $M_p = ${mpPct.toFixed(2)}\\%$.`,
      ],
      finalDiagnosis: `Sobressinal máximo ao degrau $M_p = ${mpPct.toFixed(2)}\\%$.`,
      trapNote: 'Valores clássicos de prova: para ζ = 0,5, Mp ≈ 16,3%; para ζ = 0,707 (√2/2), Mp ≈ 4,32%.',
      relatedNorms: ['ISA-5.1'],
    });
  }
  if (arch === 3) {
    const PMdeg = 45 + (idx % 6) * 5;
    const wgc = 4 + Math.floor(idx / 6) * 0.5; // rad/s
    const PMrad = (PMdeg * Math.PI) / 180;
    const tdMax = PMrad / wgc;
    const { options, correctIndex } = buildNumericOptions(tdMax, [0.5, 0.75, 1.35, 1.8], 3, 's', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `No diagrama de Bode de malha aberta $L(j\\omega)$, uma malha de controle apresenta **Margem de Fase** $\\text{MF} = ${PMdeg}^\\circ$ na frequência de cruzamento de ganho ($0\\text{ dB}$) igual a $\\omega_{cg} = ${wgc.toFixed(1)}\\text{ rad/s}$. O **atraso de transporte puro máximo** $T_d$ ($e^{-s T_d}$) que pode ser introduzido na malha antes que o sistema se torne instável é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Um atraso de transporte puro $e^{-j\\omega T_d}$ tem módulo unitário ($0\\text{ dB}$, não alterando $\\omega_{cg}$) e adiciona um atraso de fase linear $-\\omega T_d$ radianos.`,
        `O limite de estabilidade ocorre quando o atraso de fase na frequência $\\omega_{cg}$ consome toda a Margem de Fase convertida para radianos: $\\omega_{cg} T_{d,\\text{máx}} = \\text{MF}_{\\text{rad}} = ${PMdeg}^\\circ \\times \\frac{\\pi}{180^\\circ} = ${PMrad.toFixed(4)}\\text{ rad}$.`,
        `Dividindo por $\\omega_{cg} = ${wgc.toFixed(1)}\\text{ rad/s}$: $T_{d,\\text{máx}} = ${tdMax.toFixed(3)}\\text{ s}$.`,
      ],
      finalDiagnosis: `Atraso de transporte crítico $T_{d,\\text{máx}} = ${tdMax.toFixed(3)}\\text{ s}$.`,
      trapNote: 'SEMPRE converter a Margem de Fase de graus para radianos (multiplicando por π/180) antes de dividir por ω_cg!',
      relatedNorms: ['IEC 61131'],
    });
  }
  if (arch === 4) {
    const zeta = 0.5;
    const wn = 4 + Math.floor(idx / 6) * 0.4;
    const ts2pct = 4 / (zeta * wn);
    const { options, correctIndex } = buildNumericOptions(ts2pct, [0.5, 0.75, 1.25, 1.75], 2, 's', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 9,
      idx,
      statementMarkdown: `Um sistema de 2ª ordem possui polos dominantes em malha fechada com frequência natural $\\omega_n = ${wn.toFixed(1)}\\text{ rad/s}$ e amortecimento $\\zeta = 0{,}50$ (parte real dos polos $\\sigma = \\zeta\\omega_n = ${(zeta * wn).toFixed(2)}\\text{ s}^{-1}$). Pelo critério de **faixa de $2\\%$** ($t_s \\approx 4/(\\zeta\\omega_n)$), o **tempo de acomodação** $t_s$ é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A constante de tempo da envoltória exponencial dos polos dominantes é $\\tau = \\frac{1}{\\zeta \\omega_n} = \\frac{1}{${(zeta * wn).toFixed(2)}}\\text{ s}$.`,
        `Pelo critério de $2\\%$ ($4\\tau$), tem-se $t_s = \\frac{4}{\\zeta \\omega_n} = \\frac{4}{0{,}50 \\times ${wn.toFixed(1)}}$.`,
        `Calculando: $t_s = ${ts2pct.toFixed(2)}\\text{ s}$ (pelo critério de $5\\%$ seria $3\\tau = ${(0.75 * ts2pct).toFixed(2)}\\text{ s}$).`,
      ],
      finalDiagnosis: `Tempo de acomodação (2%) $t_s = ${ts2pct.toFixed(2)}\\text{ s}$.`,
      trapNote: 'Critério de 2% usa numerador 4 (4/ζωn); critério de 5% usa numerador 3 (3/ζωn).',
      relatedNorms: ['ISA-5.1'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 9,
    idx,
    statementMarkdown: correctBoolean
      ? `Um sistema linear dotado de um zero no semiplano direito ($s = +z_0 > 0$) é denominado sistema de fase não-mínima e apresenta, na resposta ao degrau, o fenômeno de resposta inversa inicial (undershoot), comum no controle de nível de tubulão de caldeiras a vapor.`
      : `A adição de um compensador por avanço de fase (Lead) reduz a largura de banda da malha fechada e torna a resposta transitória mais lenta, enquanto o compensador por atraso de fase (Lag) aumenta a Margem de Fase e acelera o transitório.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Um zero no semiplano direito adiciona atraso de fase extra sem alterar o módulo de Bode (fase não-mínima) e faz a resposta ao degrau partir inicialmente no sentido oposto ao valor estacionário final.`,
      `Já o compensador Lead (avanço) adiciona fase positiva, aumenta a frequência de cruzamento e ACELERA a resposta transitória; o compensador Lag (atraso) melhora o ganho estacionário em baixa frequência.',`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Sistemas de fase não-mínima (zero no SPD) e papéis dos compensadores Lead vs. Lag.`,
    trapNote: 'Zero no semiplano direito = Fase não-mínima (resposta inversa / undershoot); Polo no semiplano direito = Instabilidade.',
    relatedNorms: ['ISA-5.1', 'IEC 61131'],
  });
}

function genMathLaplace(idx: number): ExerciseQuestion {
  const id = `q-mat-01-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'g-math-laplace';
  const arch = idx % 6;
  if (arch === 0) {
    const A = 12 + Math.floor(idx / 6) * 2;
    const p1 = 2 + (idx % 4);
    const p2 = 3 + (idx % 5);
    const yInf = A / (p1 * p2);
    const { options, correctIndex } = buildNumericOptions(yInf, [0.5, 0.75, 1.5, 2.0], 3, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `A transformada de Laplace de um sinal causal $y(t)$ é $Y(s) = \\frac{${A}(s + 1)}{s(s + ${p1})(s + ${p2})}$. Pelo **Teorema do Valor Final**, o limite assintótico $\\lim_{t \\to \\infty} y(t)$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Como todos os polos de $s Y(s) = \\frac{${A}(s + 1)}{(s + ${p1})(s + ${p2})}$ estão estritamente no semiplano esquerdo ($s = -${p1}$ e $s = -${p2}$), o Teorema do Valor Final é aplicável.`,
        `Calculando o limite: $y(\\infty) = \\lim_{s \\to 0} s Y(s) = \\frac{${A}(0 + 1)}{(0 + ${p1})(0 + ${p2})}$.`,
        `Portanto, $y(\\infty) = \\frac{${A}}{${p1 * p2}} = ${yInf.toFixed(3)}$.`,
      ],
      finalDiagnosis: `Valor estacionário pelo Teorema do Valor Final: $y(\\infty) = ${yInf.toFixed(3)}$.`,
      trapNote: 'O Teorema do Valor Final NUNCA pode ser aplicado se s·Y(s) tiver polos no semiplano direito ou sobre o eixo imaginário!',
      relatedNorms: ['ISO 80000-2'],
    });
  }
  if (arch === 1) {
    const a = 2 + (idx % 5);
    const b = 3 + (idx % 4);
    const c = 1 + (idx % 6);
    const R = 2 + (Math.floor(idx / 6) % 4);
    const divF = a + b + c;
    const vol = (4 / 3) * Math.PI * Math.pow(R, 3);
    const flux = divF * vol;
    const { options, correctIndex } = buildNumericOptions(flux, [0.33, 0.67, 1.33, 2.0], 1, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Seja o campo vetorial $\\mathbf{F}(x,y,z) = ${a}x\\,\\mathbf{i} + ${b}y\\,\\mathbf{j} + ${c}z\\,\\mathbf{k}$. Pelo **Teorema da Divergência de Gauss**, o fluxo líquido $\\oiint_S \\mathbf{F} \\cdot \\mathbf{n}\\,dS$ através da superfície fechada de uma esfera de raio $R = ${R}$ centrada na origem vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pelo Teorema de Gauss: $\\oiint_S \\mathbf{F} \\cdot \\mathbf{n}\\,dS = \\iiint_V (\\nabla \\cdot \\mathbf{F})\\,dV$.`,
        `O divergente é constante: $\\nabla \\cdot \\mathbf{F} = \\frac{\\partial(${a}x)}{\\partial x} + \\frac{\\partial(${b}y)}{\\partial y} + \\frac{\\partial(${c}z)}{\\partial z} = ${a} + ${b} + ${c} = ${divF}$.`,
        `Multiplicando pelo volume da esfera $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi (${R})^3 = ${vol.toFixed(2)}$: $\\Phi = ${divF} \\times ${vol.toFixed(2)} = ${flux.toFixed(1)}$.`,
      ],
      finalDiagnosis: `Fluxo vetorial fechado pelo Teorema de Gauss $\\Phi = ${flux.toFixed(1)}$.`,
      trapNote: 'Para F = r = x·i + y·j + z·k em R³, div(r) é igual a 3 (e não 1!).',
      relatedNorms: ['ISO 80000-2'],
    });
  }
  if (arch === 2) {
    const a11 = 2 + (idx % 6);
    const a22 = 5 + Math.floor(idx / 6) % 7;
    const a12 = 1 + (idx % 3);
    const a21 = 2;
    const detA = a11 * a22 - a12 * a21;
    const { options, correctIndex } = buildNumericOptions(detA, [0.5, 0.75, 1.35, 1.8], 0, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Considere a matriz real $A = \\begin{bmatrix} ${a11} & ${a12} \\\\ ${a21} & ${a22} \\end{bmatrix}$, cujos autovalores são $\\lambda_1$ e $\\lambda_2$. Sabendo que a soma dos autovalores é igual ao traço ($\\lambda_1 + \\lambda_2 = \\text{tr}(A) = ${a11 + a22}$), o **produto dos autovalores** $\\lambda_1 \\cdot \\lambda_2$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pelas propriedades espectrais da Álgebra Linear, para qualquer matriz quadrada $A$: $\\sum \\lambda_i = \\text{tr}(A)$ e $\\prod \\lambda_i = \\det(A)$.`,
        `Calculando o determinante: $\\det(A) = (${a11})(${a22}) - (${a12})(${a21}) = ${a11 * a22} - ${a12 * a21}$.`,
        `Portanto, $\\lambda_1 \\cdot \\lambda_2 = ${detA}$.`,
      ],
      finalDiagnosis: `Produto dos autovalores $\\lambda_1 \\lambda_2 = \\det(A) = ${detA}$.`,
      trapNote: 'Uma matriz é singular (não invertível) se e somente se pelo menos um de seus autovalores for igual a zero.',
      relatedNorms: ['ISO 80000-2'],
    });
  }
  if (arch === 3) {
    const k = 2 + (idx % 7);
    const R = 1 + (Math.floor(idx / 6) % 4);
    const circ = 2 * k * Math.PI * R * R;
    const { options, correctIndex } = buildNumericOptions(circ, [0.5, 0.75, 1.5, 2.0], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Pelo **Teorema de Stokes** (ou Teorema de Green no plano), a circulação $\\oint_C \\mathbf{F} \\cdot d\\mathbf{r}$ do campo $\\mathbf{F}(x,y) = -${k}y\\,\\mathbf{i} + ${k}x\\,\\mathbf{j}$ no sentido anti-horário ao longo da circunferência $x^2 + y^2 = ${R * R}$ vale:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Pelo Teorema de Stokes/Green: $\\oint_C (P\\,dx + Q\\,dy) = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)\\,dA$.`,
        `A componente $z$ do rotacional é $\\frac{\\partial(${k}x)}{\\partial x} - \\frac{\\partial(-${k}y)}{\\partial y} = ${k} - (-${k}) = ${2 * k}$.`,
        `Multiplicando pela área do círculo $\\pi R^2 = \\pi (${R})^2$: $\\text{Circulação} = ${2 * k} \\times \\pi \\times ${R * R} = ${circ.toFixed(2)}$.`,
      ],
      finalDiagnosis: `Circulação pelo Teorema de Stokes $\\oint_C \\mathbf{F}\\cdot d\\mathbf{r} = ${circ.toFixed(2)}$.`,
      trapNote: 'Não esquecer o sinal negativo na fórmula do rotacional: ∂Q/∂x - ∂P/∂y = k - (-k) = 2k.',
      relatedNorms: ['ISO 80000-2'],
    });
  }
  if (arch === 4) {
    const z0 = 2 + (idx % 5);
    const numAtZ0 = z0 * z0 + 3;
    const res = numAtZ0 / (z0 + 1);
    const { options, correctIndex } = buildNumericOptions(res, [0.5, 0.75, 1.35, 2.0], 2, '', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 10,
      idx,
      statementMarkdown: `Na análise de variáveis complexas, o **resíduo** da função racional $f(z) = \\frac{z^2 + 3}{(z - ${z0})(z + 1)}$ no polo simples $z_0 = ${z0}$ (usado no Teorema dos Resíduos de Cauchy e na inversão de Laplace) é:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Para um polo simples em $z = z_0$, o resíduo é dado por $\\text{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0) f(z)$.`,
        `Cancelando o fator $(z - ${z0})$: $\\text{Res}(f, ${z0}) = \\frac{${z0}^2 + 3}{${z0} + 1} = \\frac{${numAtZ0}}{${z0 + 1}}$.`,
        `Calculando: $\\text{Res}(f, ${z0}) = ${res.toFixed(2)}$.`,
      ],
      finalDiagnosis: `Resíduo complexo no polo simples: $\\text{Res}(f, ${z0}) = ${res.toFixed(2)}$.`,
      trapNote: 'Em um polo de ordem m, a fórmula do resíduo exige dividir por (m-1)! e derivar (m-1) vezes.',
      relatedNorms: ['ISO 80000-2'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 10,
    idx,
    statementMarkdown: correctBoolean
      ? `Uma função complexa $f(z) = u(x,y) + i\\,v(x,y)$ com derivadas parciais contínuas é analítica (holomorfa) em um domínio aberto se, e somente se, satisfizer as equações de Cauchy-Riemann $\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}$ e $\\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}$, o que implica que tanto $u$ quanto $v$ são funções harmônicas ($\\nabla^2 u = \\nabla^2 v = 0$).`
      : `A Série de Fourier trigonométrica de uma função periódica ímpar ($f(-t) = -f(t)$) contém exclusivamente termos em cosseno ($a_n \\ne 0$) e coeficientes em seno identicamente nulos ($b_n = 0$).`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Pelas condições de Cauchy-Riemann, derivando uma segunda vez obtém-se $\\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0$, provando que as partes real e imaginária são harmônicas conjugadas.`,
      `Já uma função ímpar ($f(-t) = -f(t)$) possui desenvolvimento em série de Fourier contendo apenas termos ímpares em **seno** ($b_n \\ne 0$ e $a_0 = a_n = 0$); funções pares é que possuem apenas cossenos!`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Equações de Cauchy-Riemann e paridade em Séries de Fourier.`,
    trapNote: 'Função Par = série de Cossenos (a_n); Função Ímpar = série de Senos (b_n).',
    relatedNorms: ['ISO 80000-2'],
  });
}

function genPtCesgranrio(idx: number): ExerciseQuestion {
  const id = `q-bas-01-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'b-pt-cesgranrio';
  const arch = idx % 6;
  const variant = Math.floor(idx / 6);

  if (arch === 0) {
    const cases = [
      {
        ctx: 'concessivo',
        orig: '**Embora** a pressão do reservatório tenha caído no último trimestre, a vazão de óleo manteve-se estável.',
        correct: 'Conquanto a pressão do reservatório tenha caído no último trimestre',
        wrong: [
          'Porquanto a pressão do reservatório caiu no último trimestre',
          'À medida que a pressão do reservatório caía no último trimestre',
          'Contanto que a pressão do reservatório caia no último trimestre',
          'Portanto a pressão do reservatório tenha caído no último trimestre',
        ],
        rule: '*Embora*, *conquanto*, *ainda que*, *posto que* e *mesmo que* são conjunções subordinativas **concessivas**; já *porquanto* é causal/explicativa e *contanto que* é condicional.',
      },
      {
        ctx: 'causal / explicativo',
        orig: 'O sistema de alívio atuou automaticamente, **porquanto** a pressão interna ultrapassou o limite de ajuste.',
        correct: 'visto que a pressão interna ultrapassou o limite de ajuste',
        wrong: [
          'conquanto a pressão interna tivesse ultrapassado o limite de ajuste',
          'para que a pressão interna ultrapassasse o limite de ajuste',
          'caso a pressão interna ultrapasse o limite de ajuste',
          'malgrado a pressão interna ter ultrapassado o limite de ajuste',
        ],
        rule: '*Porquanto* equivale a *porque*, *visto que*, *já que* e *uma vez que* (valor **causal/explicativo**). Não confundir com *conquanto* (concessivo).',
      },
      {
        ctx: 'condicional',
        orig: 'A partida da turbobomba será autorizada **desde que** o teste de estanqueidade seja aprovado pela fiscalização.',
        correct: 'contanto que o teste de estanqueidade seja aprovado pela fiscalização',
        wrong: [
          'ainda que o teste de estanqueidade seja aprovado pela fiscalização',
          'já que o teste de estanqueidade foi aprovado pela fiscalização',
          'de modo que o teste de estanqueidade foi aprovado pela fiscalização',
          'conforme o teste de estanqueidade era aprovado pela fiscalização',
        ],
        rule: '*Desde que* (com verbo no subjuntivo) e *contanto que* expressam **condição** necessária.',
      },
      {
        ctx: 'proporcional',
        orig: '**À medida que** a profundidade do poço aumenta, o gradiente geotérmico eleva a temperatura do fluido de perfuração.',
        correct: 'À proporção que a profundidade do poço aumenta',
        wrong: [
          'Na medida em que a profundidade do poço aumenta',
          'Posto que a profundidade do poço aumente',
          'Sem embargo de a profundidade do poço aumentar',
          'A fim de que a profundidade do poço aumente',
        ],
        rule: '*À medida que* e *à proporção que* indicam **proporcionalidade**; já *na medida em que* tem valor estritamente causal (*porque*).',
      },
    ];
    const c = cases[variant % cases.length];
    const correctIndex = idx % 5;
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? c.correct : c.wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `Considere o período extraído de um relatório técnico de engenharia (variação #${idx + 6}): *"${c.orig}"* Mantendo-se a correção gramatical e o exato valor semântico **${c.ctx}**, o segmento destacado pode ser substituído por:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Identifica-se inicialmente o nexo semântico do conectivo original no contexto técnico: valor **${c.ctx}**.`,
        c.rule,
        `Portanto, a reescrita que preserva sentido e modo verbal na norma-padrão é: **"${c.correct}"**.`,
      ],
      finalDiagnosis: `Articulação sintático-semântica de conectivos (${c.ctx}).`,
      trapNote: 'Na Cesgranrio e FGV: "conquanto" e "posto que" são CONCESSIVOS (= embora); "porquanto" e "na medida em que" são CAUSAIS (= porque).',
      relatedNorms: ['Norma-Padrão da Língua Portuguesa'],
    });
  }
  if (arch === 1) {
    const correctIndex = idx % 5;
    const correct = 'A equipe de manutenção dirigiu-se à subestação principal às quatorze horas para proceder à inspeção dos disjuntores.';
    const wrong = [
      'O relatório técnico foi encaminhado à Vossa Senhoria para análise urgente à partir de segunda-feira.',
      'Os engenheiros chegaram à tempo de evitar paradas referentes à falhas de comunicação.',
      'A norma faz referência à equipamentos rotativos submetidos à altas pressões de descarga.',
      'O operador permaneceu frente à frente com o painel, disposto à revisar cada alarme.',
    ];
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? correct : wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `De acordo com a norma-padrão da Língua Portuguesa cobrada em provas da **Cesgranrio, FGV e FUVEST** (item #${idx + 6}), o emprego do **acento grave indicativo de crase** está integralmente correto em:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Há crase obrigatória na fusão da preposição *a* com o artigo definido feminino *a* (*dirigiu-se à subestação*, *proceder à inspeção*) e nas locuções adverbiais femininas de horas exatas (*às quatorze horas*).`,
        `É proibido o acento grave antes de verbos (*a partir*, *a revisar*), palavras masculinas (*a tempo*), pronomes de tratamento (*a Vossa Senhoria*), locuções com palavras repetidas (*frente a frente*) e antes de plural sem artigo (*a falhas*, *a altas pressões*).`,
        `Logo, apenas a alternativa **"${correct}"** atende integralmente à norma culta.`,
      ],
      finalDiagnosis: `Domínio das regras obrigatórias e proibitivas de crase.`,
      trapNote: 'Quando o "a" no singular antecede palavra no plural ("referente a falhas"), NUNCA ocorre crase ("a" no singular + plural = crase nem a pau!).',
      relatedNorms: ['Acordo Ortográfico / Gramática Normativa'],
    });
  }
  if (arch === 2) {
    const correctIndex = idx % 5;
    const correct = 'A caldeira a cujos instrumentos de controle o operador se referiu passou pela inspeção anual.';
    const wrong = [
      'A plataforma onde os dados de produção dependem apresentou alta eficiência operacional.',
      'O procedimento técnico que o engenheiro-chefe não simpatizou foi revisado ontem.',
      'As válvulas de alívio cujas as molas foram recalibradas operam dentro da norma.',
      'O laboratório de metrologia aonde os certificados permanecem arquivados foi auditado.',
    ];
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? correct : wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `No que tange à **regência verbal e nominal** e ao emprego dos **pronomes relativos** na redação técnica (item #${idx + 6}), assinale a frase redigida em conformidade com a norma-padrão:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Quem se refere, refere-se **a** algo; como há relação de posse entre *caldeira* e *instrumentos*, emprega-se *a cujos instrumentos* (sem artigo após *cujo*).`,
        `Nos distratores: *depender* pede preposição *de* (*da qual*), *simpatizar* exige preposição *com* (*com que*) e não é pronominal, *cujo* jamais admite artigo posposto (*cujas as*), e *aonde* exige verbo de movimento (*ir aonde*).`,
        `Portanto, a única construção gramaticalmente perfeita é **"${correct}"**.`,
      ],
      finalDiagnosis: `Regência com pronomes relativos (*a cujo*, *de que*, *onde* vs. *aonde*).`,
      trapNote: 'Nunca se usa artigo depois de CUJO (errado: "cujo o", "cuja a"), e a preposição exigida pelo verbo final deve anteceder o pronome relativo.',
      relatedNorms: ['Norma-Padrão da Língua Portuguesa'],
    });
  }
  if (arch === 3) {
    const correctIndex = idx % 5;
    const correct = 'Devem-se calibrar periodicamente os transmissores de pressão, pois faz dois anos que houve falhas na malha.';
    const wrong = [
      'Precisam-se de novos técnicos de instrumentação para que hajam menos paradas não programadas.',
      'Fazem dez meses que se iniciou as obras de ampliação da subestação elétrica.',
      'Houveram diversas reuniões técnicas nas quais se tratou de diretrizes operacionais.',
      'Aluga-se guindastes offshore de alta capacidade para operações no campo de Búzios.',
    ];
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? correct : wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `Assinale a alternativa que respeita rigorosamente as regras de **concordância verbal** (voz passiva sintética, índice de indeterminação do sujeito e verbos impessoais — item #${idx + 6}):`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Com verbo transitivo direto (*calibrar*, *iniciar*, *alugar*), a partícula *se* é apassivadora e o verbo concorda com o sujeito paciente plural: *Devem-se calibrar os transmissores*, *iniciaram-se as obras*, *alugam-se guindastes*.`,
        `Com verbo transitivo indireto (*precisar de*, *tratar de*), o *se* é índice de indeterminação do sujeito e o verbo fica obrigatoriamente na 3ª pessoa do singular (*Precisa-se de novos técnicos*).`,
        `Os verbos *haver* (no sentido de existir/ocorrer) e *fazer* (tempo decorrido) são impessoais e permanecem no singular (*faz dois anos*, *houve falhas*).`,
      ],
      finalDiagnosis: `Concordância verbal com partícula *se* e verbos impessoais (*haver* e *fazer*).`,
      trapNote: 'Verbo "Existir" tem sujeito e vai para o plural ("Existem falhas"); verbo "Haver" no mesmo sentido é impessoal e fica no singular ("Há falhas / Deve haver falhas").',
      relatedNorms: ['Norma-Padrão da Língua Portuguesa'],
    });
  }
  if (arch === 4) {
    const correctIndex = idx % 5;
    const correct = 'Os motores de indução, que passaram por balanceamento dinâmico ontem, já operam sem vibração.';
    const wrong = [
      'Os motores de indução, que apresentarem defeito no isolamento deverão ser substituídos.',
      'A direção da refinaria determinou, que todos os relatórios fossem entregues até sexta-feira.',
      'Durante a parada programada da unidade os engenheiros, inspecionaram o feixe tubular.',
      'O compressor centrífugo atingiu a rotação nominal mas, apresentou alta temperatura no mancal.',
    ];
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? correct : wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 11,
      idx,
      statementMarkdown: `Quanto à **pontuação** e à estrutura sintática do período (item #${idx + 6}), está plenamente de acordo com a norma-padrão:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Orações subordinadas adjetivas explicativas intercaladas devem ser isoladas por um par de vírgulas (*, que passaram por balanceamento dinâmico ontem,*).`,
        `Jamais se separa por uma única vírgula o sujeito do verbo ou o verbo de seu complemento direto (*determinou que...*), e a vírgula antecede (não sucede) a conjunção adversativa *mas*.`,
        `Portanto, apenas **"${correct}"** apresenta pontuação irrepreensível.`,
      ],
      finalDiagnosis: `Pontuação de orações adjetivas explicativas vs. proibição de vírgula entre termos essenciais.`,
      trapNote: 'Retirar as vírgulas de uma oração adjetiva explicativa converte-a em restritiva, mantendo a correção gramatical mas ALTERANDO o sentido global do texto.',
      relatedNorms: ['Norma-Padrão da Língua Portuguesa'],
    });
  }
  const correctBoolean = idx % 2 === 0;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 11,
    idx,
    statementMarkdown: correctBoolean
      ? `Nos mecanismos de coesão referencial da norma-padrão, quando se retomam dois termos anteriormente mencionados no período (ex.: "O engenheiro analisou a turbina a gás e o gerador síncrono"), o pronome demonstrativo "este" refere-se ao termo mais próximo ("o gerador síncrono"), enquanto "aquele" refere-se ao termo mais distante ("a turbina a gás").`
      : `A substituição de "Os sensores que apresentaram deriva foram trocados" por "Os sensores, que apresentaram deriva, foram trocados" preserva intacto o sentido original do período, pois as vírgulas são meramente estilísticas.`,
    correctBoolean,
    solutionStepsMarkdown: [
      `Na função distributiva anafórica entre dois referentes, *este/esta/isto* retoma o último elemento citado (mais próximo) e *aquele/aquela/aquilo* retoma o primeiro (mais distante).`,
      `Já a inserção de vírgulas em oração adjetiva transforma uma oração **restritiva** (apenas os sensores defeituosos foram trocados) em **explicativa** (todos os sensores apresentaram deriva e foram trocados), alterando substancialmente o sentido.`,
      `Logo, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Coesão anafórica (*este* vs. *aquele*) e semântica de orações adjetivas.`,
    trapNote: 'Anáfora (retoma termo já dito) usa "esse"; Catáfora (antecipa termo que ainda será dito) usa "este".',
    relatedNorms: ['Norma-Padrão da Língua Portuguesa'],
  });
}

function genEnTech(idx: number): ExerciseQuestion {
  const id = `q-bas-02-${String(idx + 6).padStart(3, '0')}`;
  const mt = 'b-en-tech';
  const arch = idx % 6;
  const variant = Math.floor(idx / 6);

  if (arch === 0) {
    const correctIndex = idx % 5;
    const correct = 'an obligatory normative requirement (mandatory compliance)';
    const wrong = [
      'a non-binding recommendation or advisory guideline',
      'an optional feature left solely to the operator’s discretion',
      'a hypothetical future prediction without regulatory force',
      'a deprecated legacy procedure no longer permitted',
    ];
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? correct : wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `In international engineering standards (**ASME, API, ISO, IEC** — item #${idx + 6}), consider the clause: *"All pressure relief valves **shall** be tested and inspected prior to system commissioning, whereas auxiliary drains **should** be routed to a closed collection header."* The modal verb **shall** in the first clause expresses:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Na linguagem normativa internacional (ISO/IEC Directives e códigos ASME/API), o verbo modal **shall** indica requisito **obrigatório** (*deve obrigatoriamente*).`,
        `Por contraste, **should** indica recomendação (*convém que*), **may** indica permissão (*é permitido*) e **can** indica capacidade física/possibilidade.`,
        `Logo, **shall** expressa **"${correct}"**.`,
      ],
      finalDiagnosis: `Semântica normativa de verbos modais em inglês técnico (*shall* vs. *should* vs. *may*).`,
      trapNote: 'Em normas técnicas em inglês: SHALL = obrigatório; SHOULD = recomendado; MAY = permitido.',
      relatedNorms: ['ISO/IEC Directives Part 2', 'API / ASME Standards'],
    });
  }
  if (arch === 1) {
    const terms = [
      {
        sentence: 'The high-strength alloy bolt exceeded its **yield strength** during the hydrotest tightening sequence.',
        term: 'yield strength',
        correct: 'limite de escoamento (tensão a partir da qual ocorre deformação plástica permanente)',
        wrong: [
          'taxa de produção financeira da unidade industrial',
          'condutividade térmica em regime estacionário',
          'folga radial entre o eixo e o mancal de deslizamento',
          'perda de carga localizada na válvula de retenção',
        ],
      },
      {
        sentence: 'Excessive radial **clearance** in the labyrinth seal increased internal leakage across the turbine stage.',
        term: 'clearance',
        correct: 'folga mecânica / interstício entre componentes',
        wrong: [
          'transparência óptica do fluido lubrificante',
          'certificado de liberação alfandegária do equipamento',
          'tensão de ruptura por fadiga de alto ciclo',
          'potência reativa absorvida pelo enrolamento',
        ],
      },
      {
        sentence: 'At the design flow rate, the centrifugal pump delivers a total dynamic **head** of 145 meters.',
        term: 'head',
        correct: 'altura manométrica / carga hidráulica por unidade de peso',
        wrong: [
          'cabeçote superior do cilindro de combustão',
          'chefia do departamento de engenharia de manutenção',
          'vazão mássica instantânea na linha de recalque',
          'pressão de vapor absoluta na entrada do rotor',
        ],
      },
      {
        sentence: 'A sudden loss of lube oil pressure caused the emergency shutdown system to **trip** the main gas compressor.',
        term: 'trip',
        correct: 'desarmar / desligar automaticamente por atuação da malha de proteção',
        wrong: [
          'transportar o equipamento para outra plataforma',
          'aumentar gradualmente a rotação até o limite nominal',
          'calibrar os sensores de vibração em malha aberta',
          'purgar o gás inerte do selo seco secundário',
        ],
      },
    ];
    const t = terms[variant % terms.length];
    const correctIndex = idx % 5;
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? t.correct : t.wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `Read the technical excerpt (item #${idx + 6}): *"${t.sentence}"* In this engineering context, the highlighted expression **${t.term}** means:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `Termos polissêmicos em inglês assumem significado técnico preciso na engenharia mecânica e elétrica.`,
        `No contexto apresentado, **${t.term}** traduz-se tecnicamente como **${t.correct}**.`,
        `Os demais itens exploram traduções literais fora do domínio técnico de engenharia.`,
      ],
      finalDiagnosis: `Vocabulário técnico de engenharia em inglês (**${t.term}** = ${t.correct}).`,
      trapNote: 'Atenção a falsos cognatos e termos polissêmicos: "actual" = real (não atual); "fabric" = estrutura/tecido (não fábrica = plant/factory); "head" = altura manométrica; "yield" = escoamento/rendimento.',
      relatedNorms: ['Technical English — Petrobras / EPSO / CERN'],
    });
  }
  if (arch === 2) {
    const correctIndex = idx % 5;
    const correct = 'If the differential relay had detected an internal fault, it would have isolated the transformer immediately.';
    const wrong = [
      'Because the differential relay detected an internal fault, it isolated the transformer yesterday.',
      'Unless the differential relay detects an internal fault tomorrow, it will not isolate the transformer.',
      'Although the differential relay was detecting a fault, the transformer remained energized.',
      'While the differential relay is being tested, the transformer must operate at half load.',
    ];
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? correct : wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `In formal technical reports (item #${idx + 6}), the inverted conditional sentence *"Had the differential relay detected an internal fault, it would have isolated the transformer immediately"* is grammatically and semantically equivalent to:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `A estrutura *Had + subject + past participle* no início da oração é a inversão formal da **Third Conditional** (condicional irreal no passado), omitindo a conjunção *If*.`,
        `Equivale exatamente a: *If the differential relay had detected an internal fault, it would have isolated...* (indicando que a falta interna não ocorreu no passado).`,
        `Outras inversões clássicas de prova: *Should the pressure exceed...* (= *If the pressure should exceed...*, 1ª condicional) e *Were the valve to fail...* (= *If the valve were to fail...*, 2ª condicional).`,
      ],
      finalDiagnosis: `Inversão de orações condicionais em inglês técnico (*Had...*, *Were...*, *Should...*).`,
      trapNote: '"Had + sujeito + particípio" = "If + sujeito + had + particípio" (3ª condicional: hipótese passada não concretizada).',
      relatedNorms: ['Technical English — Cesgranrio / ITA / EPSO'],
    });
  }
  if (arch === 3) {
    const markers = [
      {
        word: 'Notwithstanding',
        sent: '**Notwithstanding** the severe corrosive environment in the pre-salt layer, superduplex stainless steel pipelines have demonstrated exceptional longevity.',
        correct: 'Despite / In spite of (concession / contrast)',
        wrong: [
          'Because of / Owing to (cause / reason)',
          'Provided that / As long as (condition)',
          'Consequently / Therefore (result / conclusion)',
          'In order to / So as to (purpose)',
        ],
      },
      {
        word: 'Thereby',
        sent: 'Variable-frequency drives adjust the motor speed to match the process demand, **thereby** reducing throttling losses across control valves.',
        correct: 'by means of that / as a result of that action (consequence / instrument)',
        wrong: [
          'nevertheless / on the other hand (adversative contrast)',
          'prior to / before the scheduled inspection (anteriority)',
          'unless / except if (negative condition)',
          'whereas / while (direct opposition)',
        ],
      },
      {
        word: 'Albeit',
        sent: 'The gas turbine prototype achieved a higher thermal efficiency, **albeit** at a slightly higher NOx emission rate.',
        correct: 'although / even though (concessive restriction)',
        wrong: [
          'furthermore / in addition to (addition)',
          'since / inasmuch as (causal explanation)',
          'hence / thus (logical deduction)',
          'otherwise / or else (alternative warning)',
        ],
      },
    ];
    const m = markers[variant % markers.length];
    const correctIndex = idx % 5;
    const options: string[] = [];
    let wIdx = 0;
    for (let i = 0; i < 5; i++) {
      options.push(i === correctIndex ? m.correct : m.wrong[wIdx++]);
    }
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `In the engineering sentence (item #${idx + 6}): *"${m.sent}"* The discourse marker **${m.word}** can be replaced without change in meaning by:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O marcador discursivo **${m.word}** é amplamente empregado em artigos científicos, patentes e relatórios técnicos internacionais (CERN, ESA, SPE, IEEE).`,
        `Seu valor semântico no período é equivalente a **${m.correct}**.`,
        `As demais alternativas introduzem relações lógicas incompatíveis com o contexto.`,
      ],
      finalDiagnosis: `Marcadores discursivos acadêmicos e técnicos (**${m.word}** = ${m.correct}).`,
      trapNote: 'Memorizar: "Notwithstanding" = Despite (apesar de); "Albeit" = Although (embora); "Thereby" = por meio disso / assim; "Whereas" = ao passo que.',
      relatedNorms: ['Technical English — Cesgranrio / EPSO / IELTS Academic'],
    });
  }
  if (arch === 4) {
    const baseMw = 120 + (idx % 6) * 15;
    const gainPct = 10 + (idx % 4) * 5;
    const newMw = baseMw * (1 + gainPct / 100);
    const { options, correctIndex } = buildNumericOptions(newMw, [0.75, 0.88, 1.12, 1.25], 1, 'MW', idx);
    return makeMcq({
      id,
      microtopicId: mt,
      topicIdx: 12,
      idx,
      statementMarkdown: `Read the offshore wind & gas power specification excerpt: *"Prior to the combined-cycle upgrade, the platform power plant had a rated output of **${baseMw} MW**. Following the installation of the waste-heat recovery steam generator (HRSG), overall net capacity increased by **${gainPct}%** without any additional fuel consumption."* Based on the text, the upgraded net power output is:`,
      options,
      correctIndex,
      solutionStepsMarkdown: [
        `O texto informa que a capacidade nominal anterior (*prior to the upgrade*) era de $${baseMw}\\text{ MW}$.`,
        `Com a instalação do gerador de vapor por recuperação de calor (*HRSG*), a potência líquida subiu em $${gainPct}\\%$: $P_{\\text{nova}} = ${baseMw} \\times (1 + ${(gainPct / 100).toFixed(2)})$.`,
        `Calculando: $P_{\\text{nova}} = ${newMw.toFixed(1)}\\text{ MW}$.`,
      ],
      finalDiagnosis: `Interpretação quantitativa de especificação técnica em inglês: $${newMw.toFixed(1)}\\text{ MW}$.`,
      trapNote: '"Waste-heat recovery steam generator (HRSG)" = Caldeira recuperadora de calor em ciclo combinado.',
      relatedNorms: ['Technical English — Offshore & Energy'],
    });
  }
  const correctBoolean = idx % 2 === 1;
  return makeTf({
    id,
    microtopicId: mt,
    topicIdx: 12,
    idx,
    statementMarkdown: correctBoolean
      ? `In technical English, the false cognate "actual" means "real, measured, or effective" (e.g., "actual flow rate" = vazão real), whereas "current" or "present" is used to mean "atual" (e.g., "current regulations").`
      : `In the sentence "Unless the lube oil temperature drops below 65 °C, the turbine will remain interlocked", the conjunction "Unless" means "As soon as" (assim que).`,
    correctBoolean,
    solutionStepsMarkdown: [
      `*Actual* é o falso cognato mais cobrado em concursos de engenharia: significa **real / efetivo** (*actual efficiency* = eficiência real), enquanto *atual* diz-se *current*.`,
      `Já a conjunção *Unless* significa **a menos que / exceto se** (*if... not*), e não *as soon as* (*assim que*).`,
      `Portanto, o item é **${correctBoolean ? 'CERTO' : 'ERRADO'}**.`,
    ],
    finalDiagnosis: `Falsos cognatos clássicos (*actual* vs. *current*) e condicionais negativas (*unless* = *if not*).`,
    trapNote: 'Unless = If not (a menos que); Actual = Real; Comprehensive = Abrangente/Completo (não compreensivo).',
    relatedNorms: ['Technical English — Petrobras / EPSO'],
  });
}

const ELE_AND_BASIC_GENERATORS: Array<(idx: number) => ExerciseQuestion> = [
  genEmMaxwell,
  genCircuitsAc3,
  genMachMit,
  genMachSync,
  genSepFortescue,
  genSepLines,
  genProtNr10,
  genProtEx,
  genPeConverters,
  genCtrlFreq,
  genMathLaplace,
  genPtCesgranrio,
  genEnTech,
];

export function generateMassiveEleAndBasicQuestions(countPerTopic = 595): ExerciseQuestion[] {
  const result: ExerciseQuestion[] = [];
  for (const gen of ELE_AND_BASIC_GENERATORS) {
    for (let idx = 0; idx < countPerTopic; idx++) {
      result.push(gen(idx));
    }
  }
  return result;
}
