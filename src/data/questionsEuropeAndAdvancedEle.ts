import type { ExerciseQuestion } from '../types/study';

export const QUESTIONS_EUROPE_AND_ADVANCED_ELE: ExerciseQuestion[] = [
  // =========================================================================
  // 1. e-em-maxwell (Eletromagnetismo Clássico e Equações de Maxwell)
  // =========================================================================
  {
    id: 'q-ele-01c',
    microtopicId: 'e-em-maxwell',
    board: 'Europa — CERN / ESA',
    examContext: 'CERN Technical & Fellowship Selection — RF Cryogenic Shielding & Electrodynamics',
    targetExams: ['CERN / ESA (Europa)', 'Petrobras', 'Marinha CP-CEM'],
    questionType: 'mcq5',
    statementMarkdown:
      'Em um sistema de blindagem eletromagnética de radiofrequência (RF) de um acelerador de partículas no CERN, uma parede condutora metálica não ferromagnética ($\\mu = \\mu_0 = 4\\pi \\times 10^{-7}\\text{ H/m}$) apresenta condutividade elétrica efetiva $\\sigma = 2{,}5 \\times 10^7\\text{ S/m}$ na temperatura de operação. Uma onda eletromagnética harmônica de frequência $f = 100\\text{ MHz}$ incide normalmente sobre essa superfície. Adotando a aproximação de bom condutor ($\\sigma \\gg \\omega\\varepsilon$) e considerando $\\pi^2 \\approx 10$, a profundidade de penetração pelicular (*skin depth*, $\\delta$) e o fator de atenuação da amplitude do campo elétrico após percorrer $30\\ \\mu\\text{m}$ no interior do metal são, respectivamente:',
    options: [
      '$\\delta = 1{,}0\\ \\mu\\text{m}$ e atenuação para $e^{-30}$ do valor na superfície.',
      '$\\delta = 5{,}0\\ \\mu\\text{m}$ e atenuação para $e^{-6}$ do valor na superfície.',
      '$\\delta = 10{,}0\\ \\mu\\text{m}$ e atenuação para $e^{-3}$ do valor na superfície.',
      '$\\delta = 20{,}0\\ \\mu\\text{m}$ e atenuação para $e^{-1{,}5}$ do valor na superfície.',
      '$\\delta = 100{,}0\\ \\mu\\text{m}$ e atenuação para $e^{-0{,}3}$ do valor na superfície.',
    ],
    correctIndex: 2,
    irt: { a: 1.55, b: 1.35, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Equação da profundidade pelicular (*skin depth*) em bom condutor:** A partir das Equações de Maxwell em meio condutor ($\\nabla \\times \\vec{H} = \\sigma\\vec{E} + j\\omega\\varepsilon\\vec{E} \\approx \\sigma\\vec{E}$), a constante de atenuação é $\\alpha = \\sqrt{\\pi f \\mu \\sigma}$ e a profundidade pelicular é:\n$$\\delta = \\frac{1}{\\sqrt{\\pi f \\mu_0 \\sigma}}$$',
      '**2. Substituição numérica:**\n$$\\pi f \\mu_0 \\sigma = \\pi \\times (10^8\\text{ Hz}) \\times (4\\pi \\times 10^{-7}\\text{ H/m}) \\times (2{,}5 \\times 10^7\\text{ S/m}) = \\pi^2 \\times 10^9\\text{ m}^{-2}$$\nAdotando $\\pi^2 \\approx 10$, temos $\\pi f \\mu_0 \\sigma = 10^{10}\\text{ m}^{-2}$, logo:\n$$\\delta = \\frac{1}{\\sqrt{10^{10}}} = 10^{-5}\\text{ m} = 10{,}0\\ \\mu\\text{m}$$',
      '**3. Atenuação em $z = 30\\ \\mu\\text{m}$:** Como $|E(z)| = E_0 e^{-z/\\delta}$, para $z = 30\\ \\mu\\text{m}$ temos $z/\\delta = 30 / 10 = 3$, resultando em $|E(30\\ \\mu\\text{m})| = E_0 e^{-3}$ (cerca de $4{,}98\\%$ da amplitude inicial).',
    ],
    finalDiagnosis:
      'Em RF e micro-ondas (como nas cavidades do LHC/CERN), a corrente elétrica fica confinada em uma camada micrométrica na superfície do condutor, tornando o acabamento superficial e o revestimento de cobre de alta pureza determinantes para as perdas ôhmicas.',
    trapNote:
      'Esquecer de converter $\\omega = 2\\pi f$ ou esquecer o segundo fator $\\pi$ dentro de $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ H/m}$, o que impede a simplificação de $\\pi^2 \\approx 10$.',
    relatedNorms: ['IEC 61000-4-3', 'IEEE Std 299'],
    recommendedTimeSec: 150,
  },
  {
    id: 'q-ele-01d',
    microtopicId: 'e-em-maxwell',
    board: 'Europa — CEng / Ordem dos Engenheiros',
    examContext: 'Ordem dos Engenheiros / CEng — Telecomunicações e Cabos Coaxiais de Alta Frequência',
    targetExams: ['CEng / Ordem dos Engenheiros (Europa)', 'CERN / ESA (Europa)', 'Petrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um cabo coaxial utilizado em instrumentação de diagnóstico de alta velocidade possui condutor interno de raio $a = 10\\text{ mm}$ e blindagem externa concêntrica de raio interno $b = 27{,}18\\text{ mm}$ (de modo que $\\ln(b/a) = 1{,}0$). O espaço entre os condutores é preenchido por um dielétrico sólido sem perdas com permissividade relativa $\\varepsilon_r = 2{,}25$ e permeabilidade relativa $\\mu_r = 1{,}0$. Sabendo que a impedância intrínseca do vácuo é $\\eta_0 = \\sqrt{\\mu_0/\\varepsilon_0} = 120\\pi\\ \\Omega$ e $c = 3{,}0 \\times 10^8\\text{ m/s}$, a impedância característica $Z_0$ e a velocidade de propagação de fase $v_p$ do modo TEM nesse cabo são:',
    options: [
      '$Z_0 = 40\\ \\Omega$ e $v_p = 2{,}0 \\times 10^8\\text{ m/s}$',
      '$Z_0 = 50\\ \\Omega$ e $v_p = 2{,}0 \\times 10^8\\text{ m/s}$',
      '$Z_0 = 60\\ \\Omega$ e $v_p = 1{,}33 \\times 10^8\\text{ m/s}$',
      '$Z_0 = 40\\ \\Omega$ e $v_p = 1{,}33 \\times 10^8\\text{ m/s}$',
      '$Z_0 = 90\\ \\Omega$ e $v_p = 2{,}0 \\times 10^8\\text{ m/s}$',
    ],
    correctIndex: 0,
    irt: { a: 1.45, b: 1.1, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Velocidade de propagação do modo TEM:** Em linha coaxial com dielétrico homogêneo não magnético ($\\mu_r = 1$):\n$$v_p = \\frac{c}{\\sqrt{\\varepsilon_r}} = \\frac{3{,}0 \\times 10^8}{\\sqrt{2{,}25}} = \\frac{3{,}0 \\times 10^8}{1{,}5} = 2{,}0 \\times 10^8\\text{ m/s}$$',
      '**2. Impedância característica do cabo coaxial:** A partir de $L\' = \\frac{\\mu_0}{2\\pi}\\ln(b/a)$ e $C\' = \\frac{2\\pi\\varepsilon_0\\varepsilon_r}{\\ln(b/a)}$:\n$$Z_0 = \\sqrt{\\frac{L\'}{C\'}} = \\frac{1}{2\\pi}\\sqrt{\\frac{\\mu_0}{\\varepsilon_0 \\varepsilon_r}}\\ln\\left(\\frac{b}{a}\\right) = \\frac{\\eta_0}{2\\pi\\sqrt{\\varepsilon_r}}\\ln\\left(\\frac{b}{a}\\right)$$',
      '**3. Cálculo numérico:**\n$$Z_0 = \\frac{120\\pi}{2\\pi \\times 1{,}5} \\times 1{,}0 = \\frac{60}{1{,}5} = 40\\ \\Omega$$',
    ],
    finalDiagnosis:
      'O modo TEM em cabos coaxiais depende diretamente da geometria logarítmica $\\ln(b/a)$ e da raiz quadrada da permissividade relativa $\\sqrt{\\varepsilon_r}$, sendo fundamental no casamento de impedâncias de instrumentação.',
    trapNote:
      'Dividir diretamente por $\\varepsilon_r = 2{,}25$ em vez de $\\sqrt{\\varepsilon_r} = 1{,}5$, o que levaria ao distrator incorreto de $v_p = 1{,}33 \\times 10^8\\text{ m/s}$.',
    relatedNorms: ['IEC 61196'],
    recommendedTimeSec: 120,
  },
  {
    id: 'q-ele-01e',
    microtopicId: 'e-em-maxwell',
    board: 'Cebraspe',
    examContext: 'Cebraspe — Engenharia Elétrica — Corrente de Deslocamento em Dielétricos Imperfeitos',
    targetExams: ['Petrobras', 'Telebras', 'ANEEL', 'Marinha CP-CEM'],
    questionType: 'cebraspe_tf',
    statementMarkdown:
      'Julgue o item a seguir acerca das equações de Maxwell em regime harmônico permanente.\n\nConsidere uma bucha isolante de alta tensão cujo material dielétrico apresenta condutividade residual $\\sigma$ e permissividade absoluta $\\varepsilon$, submetida a um campo elétrico senoidal de frequência angular $\\omega$. Pela lei de Ampère-Maxwell ($\\nabla \\times \\vec{H} = \\vec{J}_c + \\frac{\\partial \\vec{D}}{\\partial t}$), a razão entre os módulos da densidade de corrente de condução e da densidade de corrente de deslocamento é dada pela tangente de perdas $\\tan\\delta = \\frac{\\sigma}{\\omega\\varepsilon}$, estando a corrente de deslocamento adiantada de $90^\\circ$ em relação ao campo elétrico.',
    correctBoolean: true,
    irt: { a: 1.6, b: 1.25, c: 0.5 },
    solutionStepsMarkdown: [
      '**1. Fasores das densidades de corrente:** Em regime permanente senoidal ($\\partial/\\partial t \\leftrightarrow j\\omega$), temos $\\vec{J}_c = \\sigma\\vec{E}$ (em fase com $\\vec{E}$) e $\\vec{J}_d = j\\omega\\varepsilon\\vec{E}$ (adiantada de $90^\\circ$ em relação a $\\vec{E}$).',
      '**2. Tangente do ângulo de perdas ($\\tan\\delta$):** A razão entre a componente dissipativa (em fase) e a componente reativa (em quadratura) da densidade de corrente total é:\n$$\\tan\\delta = \\frac{|\\vec{J}_c|}{|\\vec{J}_d|} = \\frac{\\sigma}{\\omega\\varepsilon}$$',
      '**3. Conclusão:** A afirmativa descreve com exatidão tanto a relação de módulos quanto a quadratura de fase entre $\\vec{J}_d$ e $\\vec{E}$. Item **CERTO**.',
    ],
    finalDiagnosis:
      'O monitoramento de $\\tan\\delta = \\sigma/(\\omega\\varepsilon)$ é o princípio físico dos ensaios preditivos de isolamento em buchas, transformadores e cabos de potência (IEC 60250 / ABNT NBR 5356).',
    trapNote:
      'Confundir o ângulo de perdas $\\delta$ (complementar de $\\varphi$) com o ângulo de fator de potência $\\varphi$; na avaliação de isolantes usa-se $\\tan\\delta = I_R / I_C = \\sigma/(\\omega\\varepsilon)$.',
    relatedNorms: ['IEC 60250', 'ABNT NBR 5356'],
    recommendedTimeSec: 90,
  },

  // =========================================================================
  // 2. e-circuits-ac3 (Circuitos Elétricos em CA e Sistemas Trifásicos)
  // =========================================================================
  {
    id: 'q-ele-02c',
    microtopicId: 'e-circuits-ac3',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'Equinor / Shell North Sea Offshore Platform — 690 V / 50 Hz Power Factor Correction',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'Petrobras', 'Transpetro'],
    questionType: 'mcq5',
    statementMarkdown:
      'Em uma plataforma *offshore* no Mar do Norte, um barramento trifásico equilibrado de $690\\text{ V}$ (tensão de linha eficaz) e $50\\text{ Hz}$ alimenta um conjunto de motores de bombeamento que absorve uma potência ativa total $P = 552\\text{ kW}$ com fator de potência inicial $\\cos\\varphi_1 = 0{,}60$ indutivo. Para reduzir o carregamento nos transformadores da plataforma e atender aos requisitos de eficiência, instala-se um banco de capacitores trifásico em paralelo para elevar o fator de potência do barramento para $\\cos\\varphi_2 = 0{,}96$ indutivo (considere $\\text{sen}\\,\\varphi_2 = 0{,}28$). A potência reativa trifásica $Q_C$ que o banco de capacitores deve fornecer é:',
    options: [
      '$391\\text{ kvar}$',
      '$460\\text{ kvar}$',
      '$552\\text{ kvar}$',
      '$575\\text{ kvar}$',
      '$736\\text{ kvar}$',
    ],
    correctIndex: 3,
    irt: { a: 1.5, b: 1.0, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Potência reativa inicial ($Q_1$):** Para $\\cos\\varphi_1 = 0{,}60$, temos $\\text{sen}\\,\\varphi_1 = 0{,}80$ e $\\tan\\varphi_1 = \\frac{0{,}80}{0{,}60} = \\frac{4}{3}$. Logo:\n$$Q_1 = P \\tan\\varphi_1 = 552 \\times \\frac{4}{3} = 184 \\times 4 = 736\\text{ kvar}$$',
      '**2. Potência reativa final ($Q_2$):** Para $\\cos\\varphi_2 = 0{,}96$ e $\\text{sen}\\,\\varphi_2 = 0{,}28$, temos $\\tan\\varphi_2 = \\frac{0{,}28}{0{,}96} = \\frac{7}{24}$. Logo:\n$$Q_2 = P \\tan\\varphi_2 = 552 \\times \\frac{7}{24} = 23 \\times 7 = 161\\text{ kvar}$$',
      '**3. Potência reativa do banco capacitivo ($Q_C$):**\n$$Q_C = Q_1 - Q_2 = 736 - 161 = 575\\text{ kvar}$$',
    ],
    finalDiagnosis:
      'A correção do fator de potência de $0{,}60$ para $0{,}96$ reduz a potência aparente de $S_1 = 552/0{,}60 = 920\\text{ kVA}$ para $S_2 = 552/0{,}96 = 575\\text{ kVA}$, liberando $345\\text{ kVA}$ de capacidade no barramento de $690\\text{ V}$.',
    trapNote:
      'Marcar $736\\text{ kvar}$ (que corrigiria para $\\cos\\varphi = 1{,}0$ unitário) sem subtrair a potência reativa remanescente $Q_2 = 161\\text{ kvar}$.',
    relatedNorms: ['IEC 60831', 'IEC 61892'],
    recommendedTimeSec: 135,
  },
  {
    id: 'q-ele-02d',
    microtopicId: 'e-circuits-ac3',
    board: 'Europa — CEng / Ordem dos Engenheiros',
    examContext: 'CEng / Ordem dos Engenheiros — Medição de Potência Trifásica pelo Método de Aron (2 Wattímetros)',
    targetExams: ['CEng / Ordem dos Engenheiros (Europa)', 'Petrobras', 'CPFL / CEMIG'],
    questionType: 'mcq5',
    statementMarkdown:
      'Uma instalação industrial trifásica a três fios (sem condutor neutro) alimenta uma carga equilibrada indutiva. Dois wattímetros conectados segundo o método de Aron (Teorema de Blondel) registram as leituras positivas $W_1 = 18\\text{ kW}$ e $W_2 = 6\\text{ kW}$. Nessas condições, a potência ativa trifásica $P_{3\\phi}$, a potência reativa trifásica $Q_{3\\phi}$ e o fator de potência $\\cos\\varphi$ da carga valem, respectivamente:',
    options: [
      '$P_{3\\phi} = 24\\text{ kW}$, $Q_{3\\phi} = 12\\sqrt{3}\\text{ kvar}$ e $\\cos\\varphi = \\frac{2}{\\sqrt{7}} \\approx 0{,}756$',
      '$P_{3\\phi} = 24\\text{ kW}$, $Q_{3\\phi} = 12\\text{ kvar}$ e $\\cos\\varphi = \\frac{2}{\\sqrt{5}} \\approx 0{,}894$',
      '$P_{3\\phi} = 12\\text{ kW}$, $Q_{3\\phi} = 12\\sqrt{3}\\text{ kvar}$ e $\\cos\\varphi = 0{,}500$',
      '$P_{3\\phi} = 24\\text{ kW}$, $Q_{3\\phi} = 24\\sqrt{3}\\text{ kvar}$ e $\\cos\\varphi = 0{,}500$',
      '$P_{3\\phi} = 18\\text{ kW}$, $Q_{3\\phi} = 6\\sqrt{3}\\text{ kvar}$ e $\\cos\\varphi = \\frac{\\sqrt{3}}{2} \\approx 0{,}866$',
    ],
    correctIndex: 0,
    irt: { a: 1.5, b: 1.2, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Potência ativa e reativa pelo método dos dois wattímetros:** Em sistema trifásico equilibrado a 3 fios:\n$$P_{3\\phi} = W_1 + W_2 = 18 + 6 = 24\\text{ kW}$$\n$$Q_{3\\phi} = \\sqrt{3}(W_1 - W_2) = \\sqrt{3}(18 - 6) = 12\\sqrt{3}\\text{ kvar}$$',
      '**2. Potência aparente e fator de potência:**\n$$S_{3\\phi} = \\sqrt{P_{3\\phi}^2 + Q_{3\\phi}^2} = \\sqrt{24^2 + (12\\sqrt{3})^2} = \\sqrt{576 + 432} = \\sqrt{1008} = 12\\sqrt{7}\\text{ kVA}$$\n$$\\cos\\varphi = \\frac{P_{3\\phi}}{S_{3\\phi}} = \\frac{24}{12\\sqrt{7}} = \\frac{2}{\\sqrt{7}} \\approx 0{,}756$$',
    ],
    finalDiagnosis:
      'O método de Aron permite extrair simultaneamente $P_{3\\phi}$, $Q_{3\\phi}$ e $\\tan\\varphi = \\sqrt{3}\\frac{W_1 - W_2}{W_1 + W_2}$ sem necessidade de acesso ao neutro da carga.',
    trapNote:
      'Esquecer o fator $\\sqrt{3}$ na expressão da potência reativa $Q_{3\\phi} = \\sqrt{3}(W_1 - W_2)$, o que levaria à alternativa incorreta com $Q_{3\\phi} = 12\\text{ kvar}$.',
    relatedNorms: ['IEC 60051', 'ABNT NBR 14136'],
    recommendedTimeSec: 130,
  },
  {
    id: 'q-ele-02e',
    microtopicId: 'e-circuits-ac3',
    board: 'FGV',
    examContext: 'FGV — Engenharia Elétrica — Carga Trifásica em Triângulo (Delta)',
    targetExams: ['Petrobras', 'Transpetro', 'EPE', 'Câmara / Senado'],
    questionType: 'mcq5',
    statementMarkdown:
      'Uma carga trifásica equilibrada conectada em Triângulo ($\\Delta$) apresenta impedância por fase $Z_\\Delta = 18 + j24\\ \\Omega$ e é alimentada por uma rede trifásica simétrica cuja tensão de linha eficaz vale $V_L = 300\\text{ V}$. Os valores eficazes da corrente de fase $I_F$, da corrente de linha $I_L$ e a potência ativa total $P_{3\\phi}$ consumida pela carga são, respectivamente:',
    options: [
      '$I_F = 10\\text{ A}$, $I_L = 10\\text{ A}$ e $P_{3\\phi} = 5{,}4\\text{ kW}$',
      '$I_F = 10\\text{ A}$, $I_L = 10\\sqrt{3}\\text{ A}$ e $P_{3\\phi} = 5{,}4\\text{ kW}$',
      '$I_F = 10\\sqrt{3}\\text{ A}$, $I_L = 30\\text{ A}$ e $P_{3\\phi} = 16{,}2\\text{ kW}$',
      '$I_F = 10\\text{ A}$, $I_L = 10\\sqrt{3}\\text{ A}$ e $P_{3\\phi} = 9{,}0\\text{ kW}$',
      '$I_F = 5{,}77\\text{ A}$, $I_L = 10\\text{ A}$ e $P_{3\\phi} = 1{,}8\\text{ kW}$',
    ],
    correctIndex: 1,
    irt: { a: 1.35, b: 0.65, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Módulo da impedância por fase e corrente de fase no $\\Delta$:**\n$$|Z_\\Delta| = \\sqrt{18^2 + 24^2} = \\sqrt{324 + 576} = \\sqrt{900} = 30\\ \\Omega$$\nNa conexão em Triângulo, a tensão de fase é igual à tensão de linha ($V_F = V_L = 300\\text{ V}$):\n$$I_F = \\frac{V_F}{|Z_\\Delta|} = \\frac{300}{30} = 10\\text{ A}$$',
      '**2. Corrente de linha e potência ativa trifásica:**\n$$I_L = \\sqrt{3} I_F = 10\\sqrt{3}\\text{ A}$$\nComo $\\cos\\varphi = R_\\Delta / |Z_\\Delta| = 18 / 30 = 0{,}60$ (ou usando $P_{3\\phi} = 3 R_\\Delta I_F^2$):\n$$P_{3\\phi} = 3 \\times 18 \\times 10^2 = 5400\\text{ W} = 5{,}4\\text{ kW}$$',
    ],
    finalDiagnosis:
      'Usar $P_{3\\phi} = 3 R_F I_F^2$ evita erros com fatores $\\sqrt{3}$ ao calcular a potência ativa tanto em cargas em Estrela quanto em Triângulo.',
    trapNote:
      'Dividir a tensão de linha por $\\sqrt{3}$ como se a carga estivesse em Estrela, ou usar $|Z_\\Delta|$ no lugar de $R_\\Delta$ e encontrar a potência aparente $S = 9{,}0\\text{ kVA}$ em vez de $P = 5{,}4\\text{ kW}$.',
    relatedNorms: ['ABNT NBR 5410'],
    recommendedTimeSec: 110,
  },

  // =========================================================================
  // 3. e-mach-mit (Máquinas Assíncronas: Motor de Indução Trifásico - MIT)
  // =========================================================================
  {
    id: 'q-ele-03c',
    microtopicId: 'e-mach-mit',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'Equinor Subsea Water Injection Pump — 50 Hz 4-Pole Induction Motor Power Flow',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'Petrobras', 'Transpetro'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um motor de indução trifásico (MIT) de $4$ polos, alimentado pelo sistema de potência de uma plataforma *offshore* europeia em $f_1 = 50\\text{ Hz}$, aciona uma bomba centrífuga de injeção de água operando a $n = 1440\\text{ rpm}$. Nessa condição de carga, a potência eletromagnética transferida através do entreferro (*air-gap power*) é $P_{ag} = 250\\text{ kW}$. Desprezando as perdas suplementares, as perdas Joule no enrolamento rotórico ($P_{jr}$), a potência mecânica convertida ($P_{conv}$) e a frequência das correntes induzidas no rotor ($f_2$) são, respectivamente:',
    options: [
      '$P_{jr} = 10\\text{ kW}$, $P_{conv} = 240\\text{ kW}$ e $f_2 = 2{,}0\\text{ Hz}$',
      '$P_{jr} = 10\\text{ kW}$, $P_{conv} = 250\\text{ kW}$ e $f_2 = 4{,}0\\text{ Hz}$',
      '$P_{jr} = 12{,}5\\text{ kW}$, $P_{conv} = 237{,}5\\text{ kW}$ e $f_2 = 2{,}5\\text{ Hz}$',
      '$P_{jr} = 5\\text{ kW}$, $P_{conv} = 245\\text{ kW}$ e $f_2 = 1{,}0\\text{ Hz}$',
      '$P_{jr} = 20\\text{ kW}$, $P_{conv} = 230\\text{ kW}$ e $f_2 = 2{,}0\\text{ Hz}$',
    ],
    correctIndex: 0,
    irt: { a: 1.45, b: 0.9, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Velocidade síncrona e escorregamento ($s$) em $50\\text{ Hz}$:**\n$$n_s = \\frac{120 f_1}{P} = \\frac{120 \\times 50}{4} = 1500\\text{ rpm}$$\n$$s = \\frac{n_s - n}{n_s} = \\frac{1500 - 1440}{1500} = \\frac{60}{1500} = 0{,}04\\ (4\\%)$$',
      '**2. Frequência rotórica ($f_2$):**\n$$f_2 = s f_1 = 0{,}04 \\times 50 = 2{,}0\\text{ Hz}$$',
      '**3. Balanço de potências no rotor:**\n$$P_{jr} = s P_{ag} = 0{,}04 \\times 250 = 10\\text{ kW}$$\n$$P_{conv} = (1 - s) P_{ag} = 0{,}96 \\times 250 = 240\\text{ kW}$$',
    ],
    finalDiagnosis:
      'A divisão fundamental do fluxo de potência no entreferro do MIT estabelece a proporção exata $P_{ag} : P_{jr} : P_{conv} = 1 : s : (1 - s)$.',
    trapNote:
      'Usar $n_s = 1800\\text{ rpm}$ (que corresponde a $60\\text{ Hz}$ no Brasil) em vez de $n_s = 1500\\text{ rpm}$ para a rede europeia de $50\\text{ Hz}$.',
    relatedNorms: ['IEC 60034-1', 'IEC 60034-2-1'],
    recommendedTimeSec: 120,
  },
  {
    id: 'q-ele-03d',
    microtopicId: 'e-mach-mit',
    board: 'Europa — CERN / ESA',
    examContext: 'CERN Cryogenic Ventilation Drive — VFD Scalar V/f Control & Breakdown Slip',
    targetExams: ['CERN / ESA (Europa)', 'Petrobras', 'BNDES'],
    questionType: 'mcq5',
    statementMarkdown:
      'No sistema de ventilação dos túneis subterrâneos do CERN, um motor de indução trifásico é acionado por um conversor de frequência (VFD) sob controle escalar $V/f$ constante (mantendo o fluxo de entreferro nominal). A resistência do estator é desprezível frente às reatâncias ($R_1 \\approx 0$), a resistência rotórica referida ao estator é $R_2\' = 0{,}20\\ \\Omega$ e a reatância total de dispersão equivalente na frequência nominal de $50\\text{ Hz}$ vale $X_{cc,50} = 1{,}00\\ \\Omega$. Quando o inversor reduz a frequência de alimentação para $25\\text{ Hz}$ mantendo o fluxo constante, o escorregamento crítico (de conjugado máximo, $s_{\\max}$) e o conjugado máximo $T_{\\max}$ (em comparação aos valores em $50\\text{ Hz}$) passam a ser:',
    options: [
      '$s_{\\max} = 0{,}10$ e $T_{\\max}$ cai para a metade.',
      '$s_{\\max} = 0{,}20$ e $T_{\\max}$ permanece constante.',
      '$s_{\\max} = 0{,}40$ e $T_{\\max}$ permanece constante.',
      '$s_{\\max} = 0{,}40$ e $T_{\\max}$ cai para um quarto.',
      '$s_{\\max} = 0{,}20$ e $T_{\\max}$ dobra de valor.',
    ],
    correctIndex: 2,
    irt: { a: 1.65, b: 1.55, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Escorregamento de conjugado máximo ($s_{\\max}$) com $R_1 \\approx 0$:** No modelo equivalente de IEEE, o conjugado máximo ocorre quando $R_2\' / s_{\\max} = X_{cc}(f)$, isto é:\n$$s_{\\max}(f) = \\frac{R_2\'}{X_{cc}(f)}$$\nEm $50\\text{ Hz}$, $s_{\\max,50} = 0{,}20 / 1{,}00 = 0{,}20$. Em $25\\text{ Hz}$, como $X_{cc} = 2\\pi f L_{cc}$, a reatância cai para $X_{cc,25} = 0{,}50\\ \\Omega$, resultando em:\n$$s_{\\max,25} = \\frac{0{,}20}{0{,}50} = 0{,}40$$',
      '**2. Comportamento do conjugado máximo ($T_{\\max}$) sob $V/f$ constante:** Com $R_1 \\approx 0$, a equação do conjugado máximo é:\n$$T_{\\max} = \\frac{3 V_1^2}{2 \\omega_s X_{cc}} = \\frac{3 p}{4\\pi L_{cc}} \\left(\\frac{V_1}{f_1}\\right)^2$$\nComo a relação $V_1/f_1$ é mantida constante pelo inversor, o conjugado máximo $T_{\\max}$ permanece constante (deslocando-se apenas na curva de velocidade com o mesmo $\\Delta n = s_{\\max} n_s$ em rpm).',
    ],
    finalDiagnosis:
      'Sob controle escalar $V/f$ constante (região abaixo da frequência base), a queda de rotação absoluta $\\Delta n_{\\max} = s_{\\max} n_s$ permanece invariante em rpm, fazendo o escorregamento percentual $s_{\\max}$ variar inversamente com a frequência $f_1$.',
    trapNote:
      'Achar que $s_{\\max}$ é constante com a frequência; na verdade, o que permanece constante é a frequência rotórica de escorregamento crítico $f_{2,\\max} = s_{\\max} f_1 = 10\\text{ Hz}$.',
    relatedNorms: ['IEC 60034-17', 'IEC 61800-2'],
    recommendedTimeSec: 150,
  },
  {
    id: 'q-ele-03e',
    microtopicId: 'e-mach-mit',
    board: 'Cebraspe',
    examContext: 'Cebraspe — Petrobras — Chave de Partida Estrela-Triângulo em Motores de Indução',
    targetExams: ['Petrobras', 'Transpetro', 'Itaipu', 'Eletrobras'],
    questionType: 'cebraspe_tf',
    statementMarkdown:
      'Julgue o item a seguir a respeito dos métodos de partida de motores de indução trifásicos (MIT).\n\nNa partida estrela-triângulo ($\\text{Y}-\\Delta$) de um motor de indução trifásico projetado para operar nominalmente em ligação triângulo, a conexão inicial em estrela reduz a corrente de linha absorvida da rede para $1/3$ do valor da partida direta, enquanto o conjugado eletromagnético de partida é reduzido apenas para $1/\\sqrt{3}$ do conjugado de partida direta.',
    correctBoolean: false,
    irt: { a: 1.5, b: 0.75, c: 0.5 },
    solutionStepsMarkdown: [
      '**1. Tensão de fase na ligação Estrela (Y):** Quando o motor é conectado em Y, cada fase recebe tensão $V_{F,\\text{Y}} = V_L / \\sqrt{3}$, enquanto na partida direta em $\\Delta$ recebia $V_{F,\\Delta} = V_L$.',
      '**2. Redução da corrente de linha e do conjugado:** A corrente de linha em Y é $I_{L,\\text{Y}} = \\frac{V_L/\\sqrt{3}}{Z_{cc}} = \\frac{1}{3}\\left(\\frac{\\sqrt{3} V_L}{Z_{cc}}\\right) = \\frac{1}{3} I_{L,\\Delta}$. Contudo, como o conjugado eletromagnético do MIT é proporcional ao quadrado da tensão aplicada por fase ($T_p \\propto V_F^2$), temos:\n$$\\frac{T_{p,\\text{Y}}}{T_{p,\\Delta}} = \\left(\\frac{V_L / \\sqrt{3}}{V_L}\\right)^2 = \\frac{1}{3}$$',
      '**3. Conclusão:** Tanto a corrente de linha quanto o conjugado de partida caem para $1/3$ (e não $1/\\sqrt{3}$) dos respectivos valores na partida direta. Item **ERRADO**.',
    ],
    finalDiagnosis:
      'A queda severa do conjugado de partida para $1/3$ do nominal restringe a partida estrela-triângulo exclusivamente a cargas que partem em vazio ou com conjugado resistente parabólico baixo (como ventiladores e bombas centrífugas com válvula recalque fechada).',
    trapNote:
      'Confundir a redução de tensão de fase ($1/\\sqrt{3}$) com a redução de conjugado ($1/3$, pois $T \\propto V_F^2$).',
    relatedNorms: ['ABNT NBR 5410', 'IEC 60947-4-1'],
    recommendedTimeSec: 90,
  },

  // =========================================================================
  // 4. e-mach-sync (Máquinas Síncronas: Geradores, Curva de Capabilidade e Paralelismo)
  // =========================================================================
  {
    id: 'q-ele-04c',
    microtopicId: 'e-mach-sync',
    board: 'Europa — CEng / Ordem dos Engenheiros',
    examContext: 'CEng / ENTSO-E Grid Integration — Synchronous Generator Power-Angle Curve',
    targetExams: ['CEng / Ordem dos Engenheiros (Europa)', 'Energy Offshore (Equinor/Shell)', 'ONS / EPE', 'Petrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um turbogerador síncrono trifásico de rotor cilíndrico (polos lisos), conectado a um barramento infinito do sistema interligado europeu (ENTSO-E, $50\\text{ Hz}$), opera com tensão terminal de fase $V_t = 10\\text{ kV}$ (ligação Y), reatância síncrona por fase $X_s = 5{,}0\\ \\Omega$ e resistência de armadura desprezível ($R_a \\approx 0$). O sistema de excitação é ajustado de modo que a força eletromotriz interna por fase seja $E_f = 14\\text{ kV}$ e o ângulo de carga (potência) seja $\\delta = 30^\\circ$. A potência ativa trifásica $P_{3\\phi}$ entregue à rede nessa condição e o limite máximo teórico de estabilidade estática ($P_{\\max}$, mantendo $E_f$ constante) são, respectivamente:',
    options: [
      '$P_{3\\phi} = 14\\text{ MW}$ e $P_{\\max} = 28\\text{ MW}$',
      '$P_{3\\phi} = 28\\text{ MW}$ e $P_{\\max} = 56\\text{ MW}$',
      '$P_{3\\phi} = 42\\text{ MW}$ e $P_{\\max} = 84\\text{ MW}$',
      '$P_{3\\phi} = 42\\text{ MW}$ e $P_{\\max} = 48{,}5\\text{ MW}$',
      '$P_{3\\phi} = 72{,}7\\text{ MW}$ e $P_{\\max} = 84\\text{ MW}$',
    ],
    correctIndex: 2,
    irt: { a: 1.45, b: 1.05, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Equação potência-ângulo de máquina síncrona de polos lisos:** Para três fases, utilizando grandezas de fase ($V_t = 10\\text{ kV}$, $E_f = 14\\text{ kV}$):\n$$P_{3\\phi}(\\delta) = 3 \\frac{E_f V_t}{X_s} \\text{sen}\\,\\delta$$',
      '**2. Limite de estabilidade estática ($\\delta = 90^\\circ$):**\n$$P_{\\max} = 3 \\times \\frac{14 \\times 10^3 \\times 10 \\times 10^3}{5{,}0} = 3 \\times 28 \\times 10^6\\text{ W} = 84\\text{ MW}$$',
      '**3. Potência ativa em $\\delta = 30^\\circ$ ($\\text{sen}\\,30^\\circ = 0{,}5$):**\n$$P_{3\\phi}(30^\\circ) = P_{\\max} \\text{sen}\\,30^\\circ = 84 \\times 0{,}5 = 42\\text{ MW}$$',
    ],
    finalDiagnosis:
      'Operar em $\\delta = 30^\\circ$ proporciona uma margem de reserva de estabilidade estática de $50\\%$ ($42\\text{ MW}$ adicionais até o limite de perda de sincronismo em $\\delta = 90^\\circ$).',
    trapNote:
      'Esquecer o fator multiplicativo $3$ para as três fases (calculando apenas $14\\text{ MW}$ e $28\\text{ MW}$ por fase) ou usar $\\cos 30^\\circ$ em vez de $\\text{sen}\\,30^\\circ$.',
    relatedNorms: ['IEC 60034-1', 'ENTSO-E RfG'],
    recommendedTimeSec: 120,
  },
  {
    id: 'q-ele-04d',
    microtopicId: 'e-mach-sync',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'Offshore FPSO Isolated Power Island — Speed Droop Governor Load Sharing',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'Petrobras', 'Marinha CP-CEM'],
    questionType: 'mcq5',
    statementMarkdown:
      'Em uma plataforma FPSO operando em ilha elétrica no Mar do Norte, dois turbogeradores síncronos dividem a carga ativa do barramento principal através de reguladores de velocidade com estatismo (*speed droop*). O Gerador 1 possui potência nominal $P_{n1} = 50\\text{ MW}$ e estatismo $R_1 = 5\\%$, enquanto o Gerador 2 possui potência nominal $P_{n2} = 30\\text{ MW}$ e estatismo $R_2 = 3\\%$. Ambos estão ajustados com frequência de referência em vazio $f_0 = 50{,}0\\text{ Hz}$. Quando o barramento passa a alimentar uma carga total de $P_L = 32\\text{ MW}$, a frequência de equilíbrio do sistema ilhado e a divisão de potência ativa ($P_1$ e $P_2$) serão:',
    options: [
      '$f = 49{,}2\\text{ Hz}$, $P_1 = 16\\text{ MW}$ e $P_2 = 16\\text{ MW}$',
      '$f = 49{,}0\\text{ Hz}$, $P_1 = 20\\text{ MW}$ e $P_2 = 12\\text{ MW}$',
      '$f = 49{,}2\\text{ Hz}$, $P_1 = 20\\text{ MW}$ e $P_2 = 12\\text{ MW}$',
      '$f = 48{,}4\\text{ Hz}$, $P_1 = 16\\text{ MW}$ e $P_2 = 16\\text{ MW}$',
      '$f = 49{,}5\\text{ Hz}$, $P_1 = 22\\text{ MW}$ e $P_2 = 10\\text{ MW}$',
    ],
    correctIndex: 0,
    irt: { a: 1.65, b: 1.5, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Constantes de ganho estático ($K_i = \\Delta P_i / |\\Delta f|$) de cada unidade:**\nPara o Gerador 1 ($R_1 = 5\\%$ de $50\\text{ Hz} \\implies \\Delta f_{\\text{plena},1} = 2{,}5\\text{ Hz}$ para $50\\text{ MW}$):\n$$K_1 = \\frac{P_{n1}}{R_1 f_0} = \\frac{50\\text{ MW}}{0{,}05 \\times 50\\text{ Hz}} = \\frac{50}{2{,}5} = 20\\text{ MW/Hz}$$\nPara o Gerador 2 ($R_2 = 3\\%$ de $50\\text{ Hz} \\implies \\Delta f_{\\text{plena},2} = 1{,}5\\text{ Hz}$ para $30\\text{ MW}$):\n$$K_2 = \\frac{P_{n2}}{R_2 f_0} = \\frac{30\\text{ MW}}{0{,}03 \\times 50\\text{ Hz}} = \\frac{30}{1{,}5} = 20\\text{ MW/Hz}$$',
      '**2. Queda de frequência e frequência final:**\n$$|\\Delta f| = \\frac{P_L}{K_1 + K_2} = \\frac{32}{20 + 20} = 0{,}8\\text{ Hz} \\implies f = 50{,}0 - 0{,}8 = 49{,}2\\text{ Hz}$$',
      '**3. Divisão de carga ativa:**\n$$P_1 = K_1 |\\Delta f| = 20 \\times 0{,}8 = 16\\text{ MW}, \\quad P_2 = K_2 |\\Delta f| = 20 \\times 0{,}8 = 16\\text{ MW}$$',
    ],
    finalDiagnosis:
      'Para que dois geradores de potências nominais diferentes dividam a carga proporcionalmente às suas capacidades nominais, seus estatismos percentuais ($R\\%$) devem ser iguais; quando $P_{n1}/R_1 = P_{n2}/R_2$, eles possuem a mesma inclinação absoluta em MW/Hz e assumem parcelas iguais de MW.',
    trapNote:
      'Dividir a carga diretamente na razão das potências nominais ($20\\text{ MW}$ e $12\\text{ MW}$) ignorando que os estatismos percentuais $R_1 = 5\\%$ e $R_2 = 3\\%$ são diferentes.',
    relatedNorms: ['IEC 61892', 'IEEE Std 1110'],
    recommendedTimeSec: 160,
  },
  {
    id: 'q-ele-04e',
    microtopicId: 'e-mach-sync',
    board: 'Marinha CP-CEM',
    examContext: 'Marinha CP-CEM — Regulação de Tensão de Gerador Síncrono com Fator de Potência Unitário',
    targetExams: ['Marinha CP-CEM', 'Petrobras', 'Eletrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um gerador síncrono trifásico de polos lisos conectado em estrela (Y) possui reatância síncrona $X_s = 5{,}0\\ \\Omega$ por fase e resistência de armadura desprezível ($R_a = 0$). Alimentando uma carga nominal com fator de potência unitário ($\\cos\\varphi = 1{,}0$), a tensão terminal de fase é $V_t = 1200\\text{ V}$ e a corrente de armadura é $I_a = 100\\text{ A}$. O módulo da força eletromotriz interna por fase ($|E_f|$) e a regulação de tensão percentual ($RT\\%$) dessa máquina para essa condição de carga são, respectivamente:',
    options: [
      '$|E_f| = 1700\\text{ V}$ e $RT\\% = 41{,}7\\%$',
      '$|E_f| = 1300\\text{ V}$ e $RT\\% = 8{,}33\\%$',
      '$|E_f| = 1300\\text{ V}$ e $RT\\% = 7{,}69\\%$',
      '$|E_f| = 1200\\text{ V}$ e $RT\\% = 0{,}0\\%$',
      '$|E_f| = 1500\\text{ V}$ e $RT\\% = 25{,}0\\%$',
    ],
    correctIndex: 1,
    irt: { a: 1.4, b: 0.85, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Diagrama fasorial com fator de potência unitário:** Tomando $\\dot{V}_t = 1200\\angle 0^\\circ\\text{ V}$ e $\\dot{I}_a = 100\\angle 0^\\circ\\text{ A}$ (em fase):\n$$\\dot{E}_f = \\dot{V}_t + j X_s \\dot{I}_a = 1200 + j(5{,}0 \\times 100) = 1200 + j500\\text{ V}$$',
      '**2. Módulo de $E_f$ (terno pitagórico $5-12-13$):**\n$$|E_f| = \\sqrt{1200^2 + 500^2} = 100\\sqrt{144 + 25} = 1300\\text{ V}$$',
      '**3. Regulação de tensão percentual:**\n$$RT\\% = \\frac{|E_f| - |V_t|}{|V_t|} \\times 100\\% = \\frac{1300 - 1200}{1200} \\times 100\\% = \\frac{100}{12}\\% = 8{,}33\\%$$',
    ],
    finalDiagnosis:
      'Mesmo com fator de potência unitário ($\\cos\\varphi = 1{,}0$), existe queda reativa em quadratura $j X_s I_a$ devido à reação de armadura magnetizante transversal, resultando em regulação de tensão positiva ($8{,}33\\%$).',
    trapNote:
      'Somar algebricamente $1200 + 500 = 1700\\text{ V}$ (o que só ocorreria para fator de potência zero indutivo) ou dividir por $|E_f| = 1300\\text{ V}$ no denominador da regulação ($7{,}69\\%$).',
    relatedNorms: ['IEEE Std 115', 'ABNT NBR 5117'],
    recommendedTimeSec: 120,
  },

  // =========================================================================
  // 5. e-sep-fortescue (Componentes Simétricas (Fortescue) e Faltas Assimétricas)
  // =========================================================================
  {
    id: 'q-ele-05c',
    microtopicId: 'e-sep-fortescue',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'Offshore Wind Collector Substation (33 kV) — Single Line-to-Ground Fault Analysis',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'Petrobras', 'ONS / EPE'],
    questionType: 'mcq5',
    statementMarkdown:
      'Em uma subestação coletora *offshore* de $33\\text{ kV}$ ($50\\text{ Hz}$), as reatâncias equivalentes de Thévenin na barra principal, referidas a uma base de $100\\text{ MVA}$, são $X_1 = 0{,}15\\text{ pu}$ (sequência positiva), $X_2 = 0{,}15\\text{ pu}$ (sequência negativa) e $X_0 = 0{,}20\\text{ pu}$ (sequência zero), com resistências desprezíveis. Considerando tensão pré-falta $V_{pf} = 1{,}0\\angle 0^\\circ\\text{ pu}$ e sistema em vazio antes do defeito, ocorre um curto-circuito fase-terra franco ($Z_f = 0$) na fase $a$. Os módulos da corrente de sequência zero $|I_{a0}|$ e da corrente total de falta $|I_a|$ na fase $a$, em pu, valem:',
    options: [
      '$|I_{a0}| = 2{,}0\\text{ pu}$ e $|I_a| = 2{,}0\\text{ pu}$',
      '$|I_{a0}| = 2{,}0\\text{ pu}$ e $|I_a| = 6{,}0\\text{ pu}$',
      '$|I_{a0}| = 6{,}0\\text{ pu}$ e $|I_a| = 6{,}0\\text{ pu}$',
      '$|I_{a0}| = 3{,}33\\text{ pu}$ e $|I_a| = 10{,}0\\text{ pu}$',
      '$|I_{a0}| = 1{,}67\\text{ pu}$ e $|I_a| = 5{,}0\\text{ pu}$',
    ],
    correctIndex: 1,
    irt: { a: 1.4, b: 0.8, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Conexão em série das redes de sequência na falta fase-terra (FT):** Para um curto fase-terra franco na fase $a$:\n$$I_{a1} = I_{a2} = I_{a0} = \\frac{V_{pf}}{j(X_1 + X_2 + X_0)}$$',
      '**2. Cálculo de $I_{a0}$ e $I_a$:**\n$$I_{a0} = \\frac{1{,}0\\angle 0^\\circ}{j(0{,}15 + 0{,}15 + 0{,}20)} = \\frac{1{,}0}{j0{,}50} = -j2{,}0\\text{ pu} \\implies |I_{a0}| = 2{,}0\\text{ pu}$$\n$$I_a = I_{a1} + I_{a2} + I_{a0} = 3 I_{a0} = -j6{,}0\\text{ pu} \\implies |I_a| = 6{,}0\\text{ pu}$$',
    ],
    finalDiagnosis:
      'Como $X_0 = 0{,}20\\text{ pu} > X_1 = 0{,}15\\text{ pu}$, a corrente de curto-circuito fase-terra ($6{,}0\\text{ pu}$) é ligeiramente inferior à corrente de curto-circuito trifásico ($1{,}0 / 0{,}15 = 6{,}67\\text{ pu}$).',
    trapNote:
      'Esquecer de multiplicar $I_{a0}$ por $3$ ao recompor a corrente de fase $I_a = 3 I_{a0}$, marcando $|I_a| = 2{,}0\\text{ pu}$.',
    relatedNorms: ['IEC 60909'],
    recommendedTimeSec: 110,
  },
  {
    id: 'q-ele-05d',
    microtopicId: 'e-sep-fortescue',
    board: 'Cesgranrio',
    examContext: 'Cesgranrio — Petrobras — Diagrama de Sequência Zero de Transformador com Neutro Impedante',
    targetExams: ['Petrobras', 'Transpetro', 'ONS', 'Eletrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um transformador de potência trifásico conectado em $\\Delta$ no lado de alta tensão e em Estrela aterrada ($\\text{Y}_n$) no lado de média tensão possui reatância de dispersão $X_T = 0{,}10\\text{ pu}$ (igual para as três sequências). O neutro do enrolamento em estrela é conectado à malha de terra através de um reator limitador de reatância $X_n = 0{,}05\\text{ pu}$. Para a análise de um curto-circuito fase-terra no barramento de média tensão (lado $\\text{Y}_n$), a reatância equivalente do ramo desse transformador no diagrama de sequência zero é igual a:',
    options: [
      '$0{,}05\\text{ pu}$, em circuito aberto para o lado $\\Delta$.',
      '$0{,}10\\text{ pu}$, conectada diretamente à barra do lado $\\Delta$.',
      '$0{,}15\\text{ pu}$, fechando para a barra de referência de sequência zero.',
      '$0{,}25\\text{ pu}$, fechando para a barra de referência de sequência zero e bloqueada para o lado $\\Delta$.',
      '$0{,}45\\text{ pu}$, conectada em série com o sistema de alta tensão.',
    ],
    correctIndex: 3,
    irt: { a: 1.5, b: 1.15, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Multiplicação por 3 da impedância de neutro na sequência zero:** Como a corrente que retorna pelo neutro é a soma das três correntes de fase ($I_n = I_a + I_b + I_c = 3 I_{a0}$), a queda de tensão no reator de neutro é $V_n = j X_n I_n = j (3 X_n) I_{a0}$. Portanto, no diagrama unifilar de sequência zero, $X_n$ é representado por $3 X_n$.',
      '**2. Reatância total de sequência zero vista do lado $\\text{Y}_n$:**\n$$X_{0,\\text{ramo}} = X_T + 3 X_n = 0{,}10 + 3(0{,}05) = 0{,}25\\text{ pu}$$',
      '**3. Topologia $\\Delta-\\text{Y}_n$ na sequência zero:** O enrolamento em $\\Delta$ fornece caminho fechado interno para circulação das correntes de sequência zero induzidas (fechando o ramo para a referência de sequência zero), mas bloqueia sua passagem para as linhas externas do lado $\\Delta$.',
    ],
    finalDiagnosis:
      'Transformadores $\\Delta-\\text{Y}_n$ atuam como fontes de aterramento (fontes de sequência zero) para o lado $\\text{Y}_n$ e isolam o lado $\\Delta$ das correntes homopolares externas.',
    trapNote:
      'Somar apenas $X_T + X_n = 0{,}15\\text{ pu}$ esquecendo o fator $3$ que multiplica a impedância de neutro na rede de sequência zero.',
    relatedNorms: ['IEC 60909', 'IEEE Std C37.010'],
    recommendedTimeSec: 120,
  },
  {
    id: 'q-ele-05e',
    microtopicId: 'e-sep-fortescue',
    board: 'Cebraspe',
    examContext: 'Cebraspe — Sistemas Elétricos de Potência — Curto-Circuito Bifásico Isolado da Terra',
    targetExams: ['Petrobras', 'ONS', 'ANEEL', 'Eletrobras'],
    questionType: 'cebraspe_tf',
    statementMarkdown:
      'Julgue o item a seguir com relação à análise de faltas assimétricas pelo método das componentes simétricas de Fortescue.\n\nNa ocorrência de um curto-circuito bifásico franco isolado da terra entre as fases $b$ e $c$ de uma linha de transmissão (com a fase $a$ sã e em vazio), a corrente de sequência zero no ponto de falta é identicamente nula ($I_{a0} = 0$), e as redes de sequência positiva e negativa ficam conectadas em paralelo, verificando-se $I_{a1} = -I_{a2}$ e $V_{a1} = V_{a2}$.',
    correctBoolean: true,
    irt: { a: 1.55, b: 1.1, c: 0.5 },
    solutionStepsMarkdown: [
      '**1. Condições de contorno do curto-circuito bifásico ($b-c$) franco isolado:** No ponto de falta, $I_a = 0$, $I_b = -I_c$ e $V_b = V_c$.',
      '**2. Transformação de Fortescue para as correntes:**\n$$I_{a0} = \\frac{1}{3}(I_a + I_b + I_c) = \\frac{1}{3}(0 + I_b - I_b) = 0$$\n$$I_{a1} = \\frac{1}{3}(a - a^2)I_b \\quad \\text{e} \\quad I_{a2} = \\frac{1}{3}(a^2 - a)I_b = -I_{a1}$$',
      '**3. Igualdade das tensões de sequência positiva e negativa:** Como $V_b = V_c$, temos $V_{a0} + a^2 V_{a1} + a V_{a2} = V_{a0} + a V_{a1} + a^2 V_{a2} \\implies (a^2 - a)(V_{a1} - V_{a2}) = 0 \\implies V_{a1} = V_{a2}$. Logo, as redes de sequência positiva e negativa estão conectadas em paralelo. Item **CERTO**.',
    ],
    finalDiagnosis:
      'Qualquer falta que não envolva a terra nem o condutor neutro não possui caminho de retorno homopolar, garantindo $I_{a0} = 0$.',
    trapNote:
      'Confundir a falta bifásica isolada ($I_{a0} = 0$, redes 1 e 2 em paralelo) com a falta bifásica-terra (onde as três redes 1, 2 e 0 ficam em paralelo).',
    relatedNorms: ['IEC 60909'],
    recommendedTimeSec: 95,
  },

  // =========================================================================
  // 6. e-sep-lines (Linhas de Transmissão, Fluxo de Carga e Estabilidade)
  // =========================================================================
  {
    id: 'q-ele-06c',
    microtopicId: 'e-sep-lines',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'North Sea Offshore Wind HVAC Export Cable — Capacitive Charging Current & Reactive Power',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'CEng / Ordem dos Engenheiros (Europa)', 'ONS / EPE', 'Petrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um parque eólico *offshore* no Mar do Norte é conectado ao continente através de um cabo submarino trifásico de exportação em corrente alternada (HVAC) operando em tensão de linha $V_L = 200\\text{ kV}$ e frequência $f = 50\\text{ Hz}$ ($\\omega = 100\\pi\\text{ rad/s}$). O cabo possui $50\\text{ km}$ de extensão e capacitância de sequência positiva por fase igual a $C\' = 0{,}20\\ \\mu\\text{F/km}$. Desprezando a indutância série para uma estimativa inicial a vazio, a capacitância total por fase $C_{\\text{tot}}$ e a potência reativa capacitiva trifásica $Q_c$ gerada pelo cabo são:',
    options: [
      '$C_{\\text{tot}} = 10\\ \\mu\\text{F}$ e $Q_c = 40\\pi\\text{ Mvar} \\approx 125{,}7\\text{ Mvar}$',
      '$C_{\\text{tot}} = 10\\ \\mu\\text{F}$ e $Q_c = 120\\pi\\text{ Mvar} \\approx 377{,}0\\text{ Mvar}$',
      '$C_{\\text{tot}} = 20\\ \\mu\\text{F}$ e $Q_c = 80\\pi\\text{ Mvar} \\approx 251{,}3\\text{ Mvar}$',
      '$C_{\\text{tot}} = 10\\ \\mu\\text{F}$ e $Q_c = \\frac{40\\pi}{3}\\text{ Mvar} \\approx 41{,}9\\text{ Mvar}$',
      '$C_{\\text{tot}} = 5\\ \\mu\\text{F}$ e $Q_c = 20\\pi\\text{ Mvar} \\approx 62{,}8\\text{ Mvar}$',
    ],
    correctIndex: 0,
    irt: { a: 1.55, b: 1.25, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Capacitância total por fase ($C_{\\text{tot}}$):**\n$$C_{\\text{tot}} = C\' \\times L = 0{,}20\\ \\mu\\text{F/km} \\times 50\\text{ km} = 10\\ \\mu\\text{F} = 10^{-5}\\text{ F}$$',
      '**2. Potência reativa capacitiva trifásica ($Q_c$):** Como $V_F = V_L / \\sqrt{3}$, a potência reativa das três fases é $Q_c = 3 \\omega C_{\\text{tot}} V_F^2 = \\omega C_{\\text{tot}} V_L^2$:\n$$Q_c = (100\\pi\\text{ rad/s}) \\times (10^{-5}\\text{ F}) \\times (200 \\times 10^3\\text{ V})^2 = 10^{-3}\\pi \\times 4 \\times 10^{10}\\text{ var} = 40\\pi\\text{ Mvar} \\approx 125{,}7\\text{ Mvar}$$',
    ],
    finalDiagnosis:
      'Cabos submarinos isolados possuem capacitância quilométrica cerca de 20 vezes superior à de linhas aéreas, gerando enorme potência reativa ($125{,}7\\text{ Mvar}$ em apenas $50\\text{ km}$), o que exige reatores *shunt* de compensação nas extremidades e impõe um comprimento crítico máximo ao HVAC submarino (acima de $\\sim 80-100\\text{ km}$ migra-se para HVDC).',
    trapNote:
      'Multiplicar por $3$ ao usar a tensão de linha $V_L^2$ na fórmula $Q_c = 3 \\omega C V_L^2$ (o fator $3$ já foi cancelado com $(\\sqrt{3})^2$ da relação $V_L = \\sqrt{3} V_F$).',
    relatedNorms: ['IEC 60287', 'CIGRE TB 610'],
    recommendedTimeSec: 135,
  },
  {
    id: 'q-ele-06d',
    microtopicId: 'e-sep-lines',
    board: 'Europa — CEng / Ordem dos Engenheiros',
    examContext: 'CEng / ENTSO-E 400 kV Transmission Grid — Surge Impedance & SIL (Potência Característica)',
    targetExams: ['CEng / Ordem dos Engenheiros (Europa)', 'ONS / EPE', 'Petrobras', 'Eletrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Uma linha de transmissão aérea de extra-alta tensão da rede europeia ENTSO-E opera com tensão nominal de linha $V_L = 400\\text{ kV}$ ($50\\text{ Hz}$). Considerando o modelo de linha sem perdas ($R\' = G\' = 0$), os parâmetros distribuídos de sequência positiva são $L\' = 1{,}024\\text{ mH/km}$ e $C\' = 10{,}0\\text{ nF/km}$. A impedância característica (*Surge Impedance*, $Z_c$) e a Potência Natural ou Característica (*Surge Impedance Loading* — SIL) dessa linha são, respectivamente:',
    options: [
      '$Z_c = 250\\ \\Omega$ e $\\text{SIL} = 640\\text{ MW}$',
      '$Z_c = 320\\ \\Omega$ e $\\text{SIL} = 500\\text{ MW}$',
      '$Z_c = 320\\ \\Omega$ e $\\text{SIL} = 1500\\text{ MW}$',
      '$Z_c = 400\\ \\Omega$ e $\\text{SIL} = 400\\text{ MW}$',
      '$Z_c = 102{,}4\\ \\Omega$ e $\\text{SIL} = 1562{,}5\\text{ MW}$',
    ],
    correctIndex: 1,
    irt: { a: 1.45, b: 1.0, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Cálculo da impedância característica ($Z_c$):**\n$$Z_c = \\sqrt{\\frac{L\'}{C\'}} = \\sqrt{\\frac{1{,}024 \\times 10^{-3}\\text{ H/km}}{10{,}0 \\times 10^{-9}\\text{ F/km}}} = \\sqrt{1{,}024 \\times 10^5} = \\sqrt{102400} = 320\\ \\Omega$$',
      '**2. Cálculo do carregamento natural (SIL):**\n$$\\text{SIL} = \\frac{V_L^2}{Z_c} = \\frac{(400\\text{ kV})^2}{320\\ \\Omega} = \\frac{160000}{320} = 500\\text{ MW}$$',
    ],
    finalDiagnosis:
      'Quando a linha transporta exatamente o SIL ($500\\text{ MW}$), a potência reativa gerada na capacitância paralelo ($\\omega C\' V^2$) iguala em cada trecho a potência reativa consumida na indutância série ($\\omega L\' I^2$), mantendo o perfil de tensão plano ao longo de toda a linha.',
    trapNote:
      'Multiplicar $\\frac{V_L^2}{Z_c}$ por $3$ achando que $\\text{SIL}$ é por fase; na verdade, $3 \\frac{V_F^2}{Z_c} = 3 \\frac{(V_L/\\sqrt{3})^2}{Z_c} = \\frac{V_L^2}{Z_c}$ já fornece diretamente a potência trifásica.',
    relatedNorms: ['IEC 60071', 'ENTSO-E System Operations Guideline'],
    recommendedTimeSec: 120,
  },
  {
    id: 'q-ele-06e',
    microtopicId: 'e-sep-lines',
    board: 'Cesgranrio',
    examContext: 'Cesgranrio — Petrobras / ONS — Efeito Ferranti em Linha de Transmissão a Vazio',
    targetExams: ['Petrobras', 'ONS', 'EPE', 'Eletrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Uma linha de transmissão trifásica sem perdas é representada por seu circuito equivalente $\\pi$ nominal, cuja constante generalizada $A$ do quadripolo ($\\dot{V}_S = A\\dot{V}_R + B\\dot{I}_R$) vale $A = 1 + \\frac{ZY}{2} = 1 - \\frac{\\omega^2 L C}{2}$. Sabendo que, na frequência nominal do sistema, o produto $\\omega^2 L C = 0{,}10$, e que a linha opera com o terminal receptor em aberto ($\\dot{I}_R = 0$) enquanto a subestação emissora mantém tensão de linha $|V_S| = 475\\text{ kV}$, a tensão de linha $|V_R|$ no terminal receptor a vazio será de:',
    options: [
      '$427{,}5\\text{ kV}$',
      '$451{,}3\\text{ kV}$',
      '$475{,}0\\text{ kV}$',
      '$500{,}0\\text{ kV}$',
      '$527{,}8\\text{ kV}$',
    ],
    correctIndex: 3,
    irt: { a: 1.4, b: 0.9, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Cálculo do parâmetro $A$ do quadripolo:**\n$$A = 1 - \\frac{\\omega^2 L C}{2} = 1 - \\frac{0{,}10}{2} = 1 - 0{,}05 = 0{,}95$$',
      '**2. Tensão no terminal receptor em vazio ($I_R = 0$) — Efeito Ferranti:**\n$$V_S = A V_R + B(0) \\implies |V_R| = \\frac{|V_S|}{A} = \\frac{475\\text{ kV}}{0{,}95} = 500{,}0\\text{ kV}$$',
    ],
    finalDiagnosis:
      'O Efeito Ferranti decorre da circulação da corrente capacitiva de carregamento pela reatância indutiva série da linha, provocando uma queda de tensão negativa (elevação de tensão de $475\\text{ kV}$ para $500\\text{ kV}$ no terminal aberto).',
    trapNote:
      'Multiplicar $475 \\times 0{,}95 = 451{,}25\\text{ kV}$ invertendo $V_S$ e $V_R$ na relação $V_S = A V_R$.',
    relatedNorms: ['Procedimentos de Rede ONS'],
    recommendedTimeSec: 110,
  },

  // =========================================================================
  // 7. e-prot-nr10 (Segurança com Eletricidade (NR-10), Aterramento e Proteção (NBR 5410))
  // =========================================================================
  {
    id: 'q-ele-07c',
    microtopicId: 'e-prot-nr10',
    board: 'Europa — CEng / Ordem dos Engenheiros',
    examContext: 'CEng / IEC 60364-4-41 — Fault Loop Impedance & Automatic Disconnection in TN-S Systems',
    targetExams: ['CEng / Ordem dos Engenheiros (Europa)', 'Petrobras', 'Transpetro'],
    questionType: 'mcq5',
    statementMarkdown:
      'Em uma instalação elétrica industrial projetada segundo a norma europeia HD 60364-4-41 (equivalente à IEC 60364-4-41 e à ABNT NBR 5410), adota-se o esquema de aterramento TN-S em uma rede trifásica de $400\\text{ V} / 230\\text{ V}$ ($50\\text{ Hz}$, tensão fase-terra nominal $U_0 = 230\\text{ V}$). Um circuito terminal é protegido por um disjuntor termomagnético curva C de corrente nominal $I_n = 32\\text{ A}$, cujo disparo magnético instantâneo é garantido para correntes iguais ou superiores a $I_a = 10 I_n = 320\\text{ A}$ (assegurando o seccionamento automático em tempo $\\le 0{,}4\\text{ s}$). Para garantir a proteção contra choques elétricos por contato indireto, a impedância máxima admissível do laço de falta ($Z_s$) desse circuito e a corrente de falta caso o circuito apresente $Z_s = 0{,}46\\ \\Omega$ são, respectivamente:',
    options: [
      '$Z_{s,\\max} = 0{,}72\\ \\Omega$ e $I_f = 500\\text{ A}$ (proteção atua no tempo requerido).',
      '$Z_{s,\\max} = 1{,}25\\ \\Omega$ e $I_f = 870\\text{ A}$ (proteção atua no tempo requerido).',
      '$Z_{s,\\max} = 0{,}30\\ \\Omega$ e $I_f = 500\\text{ A}$ (proteção falha).',
      '$Z_{s,\\max} = 0{,}72\\ \\Omega$ e $I_f = 288\\text{ A}$ (proteção falha).',
      '$Z_{s,\\max} = 7{,}19\\ \\Omega$ e $I_f = 500\\text{ A}$ (proteção atua no tempo requerido).',
    ],
    correctIndex: 0,
    irt: { a: 1.5, b: 1.15, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Critério normativo de seccionamento automático no esquema TN (IEC 60364-4-41 / NBR 5410):** A impedância do laço de falta $Z_s$ deve satisfazer $Z_s \\times I_a \\le U_0$, logo:\n$$Z_{s,\\max} = \\frac{U_0}{I_a} = \\frac{230\\text{ V}}{320\\text{ A}} \\approx 0{,}7188\\ \\Omega \\approx 0{,}72\\ \\Omega$$',
      '**2. Corrente de falta para $Z_s = 0{,}46\\ \\Omega$:**\n$$I_f = \\frac{U_0}{Z_s} = \\frac{230\\text{ V}}{0{,}46\\ \\Omega} = 500\\text{ A}$$\nComo $I_f = 500\\text{ A} \\ge I_a = 320\\text{ A}$ (isto é, $Z_s = 0{,}46\\ \\Omega \\le 0{,}72\\ \\Omega$), o disparador magnético atua instantaneamente dentro do tempo máximo normativo ($0{,}4\\text{ s}$).',
    ],
    finalDiagnosis:
      'No esquema TN, toda falta fase-massa torna-se um curto-circuito fase-PE de elevada intensidade, permitindo que dispositivos de sobrecorrente (disjuntores/fusíveis) promovam o seccionamento automático caso a impedância do laço $Z_s$ seja suficientemente baixa.',
    trapNote:
      'Usar a tensão de linha $U_L = 400\\text{ V}$ em vez de $U_0 = 230\\text{ V}$ (o que daria $1{,}25\\ \\Omega$) ou usar a corrente nominal $I_n = 32\\text{ A}$ em vez da corrente de atuação instantânea $I_a = 320\\text{ A}$ (o que daria $7{,}19\\ \\Omega$).',
    relatedNorms: ['IEC 60364-4-41', 'ABNT NBR 5410'],
    recommendedTimeSec: 135,
  },
  {
    id: 'q-ele-07d',
    microtopicId: 'e-prot-nr10',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'Equinor Offshore Platform — IT Earthing System First Fault Current & Insulation Monitoring (IEC 61557-8)',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'Petrobras', 'Transpetro', 'Marinha CP-CEM'],
    questionType: 'mcq5',
    statementMarkdown:
      'Em unidades marítimas *offshore* e navios-plataforma, os circuitos essenciais de $400\\text{ V}$ ($50\\text{ Hz}$, tensão fase-neutro equivalente $U_0 = 230\\text{ V}$) utilizam o esquema de aterramento IT (neutro isolado da terra) para maximizar a continuidade operacional. Considere que a capacitância total de fuga para a terra de cada fase da rede seja $C_f = 1{,}0\\ \\mu\\text{F}$ e que a resistência de aterramento das massas metálicas seja $R_A = 10\\ \\Omega$. Na ocorrência de uma **primeira falta** franca fase-massa em uma das fases (adotando $\\pi \\approx 3{,}14$), o módulo aproximado da corrente de primeira falta $I_{d1}$, a tensão de contato $U_c$ nas massas e a ação requerida pelo sistema de proteção são:',
    options: [
      '$I_{d1} \\approx 0{,}22\\text{ A}$, $U_c \\approx 2{,}2\\text{ V}$ e sinalização de alarme pelo Dispositivo Supervisor de Isolamento (DSI/IMD), sem desligamento imediato.',
      '$I_{d1} \\approx 23{,}0\\text{ A}$, $U_c \\approx 230\\text{ V}$ e desligamento instantâneo em menos de $0{,}2\\text{ s}$.',
      '$I_{d1} \\approx 0{,}072\\text{ A}$, $U_c \\approx 0{,}72\\text{ V}$ e desligamento obrigatório por DR de $30\\text{ mA}$.',
      '$I_{d1} \\approx 0{,}22\\text{ A}$, $U_c \\approx 2{,}2\\text{ V}$ e abertura imediata do disjuntor geral da plataforma.',
      '$I_{d1} = 0\\text{ A}$, $U_c = 0\\text{ V}$ e nenhuma indicação ou alarme é possível até ocorrer uma segunda falta.',
    ],
    correctIndex: 0,
    irt: { a: 1.6, b: 1.35, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Corrente de primeira falta capacitiva no esquema IT:** Quando uma fase toca a massa aterrada, as outras duas fases sãs ficam submetidas à tensão de linha $\\sqrt{3}U_0$ em relação à terra, de modo que a soma fasorial das correntes capacitivas das duas fases sãs retorna pela falta:\n$$I_{d1} = 3 \\omega C_f U_0 = 3 \\times (2\\pi \\times 50) \\times (1{,}0 \\times 10^{-6}) \\times 230 \\approx 3 \\times 314 \\times 10^{-6} \\times 230 \\approx 0{,}217\\text{ A} \\approx 0{,}22\\text{ A}$$',
      '**2. Tensão de contato nas massas e critério de segurança ($U_c \\le 50\\text{ V}$):**\n$$U_c = R_A \\times I_{d1} = 10\\ \\Omega \\times 0{,}217\\text{ A} \\approx 2{,}17\\text{ V} \\ll 50\\text{ V}$$',
      '**3. Requisito normativo (IEC 60364-4-41 / IEC 61892 / NBR 5410):** Como a tensão de contato na primeira falta é não perigosa ($2{,}2\\text{ V} \\le 50\\text{ V}$), não há desligamento automático; o Dispositivo Supervisor de Isolamento (DSI / IMD, IEC 61557-8) deve emitir alarme sonoro/visual para que a equipe de manutenção localize e elimine o defeito antes de uma eventual segunda falta em outra fase.',
    ],
    finalDiagnosis:
      'O esquema IT é padrão em plataformas *offshore*, centros cirúrgicos e plantas petroquímicas contínuas exatamente porque a primeira falta à terra gera corrente de apenas centenas de miliamperes, mantendo o processo em operação segura enquanto o DSI alarma.',
    trapNote:
      'Esquecer o fator $3$ na corrente capacitiva de sequência zero ($I_{d1} = 3 \\omega C_f U_0$), o que levaria a $0{,}072\\text{ A}$, ou achar que o circuito deve ser desligado na primeira falta.',
    relatedNorms: ['IEC 60364-4-41', 'IEC 61892', 'IEC 61557-8', 'ABNT NBR 5410'],
    recommendedTimeSec: 150,
  },
  {
    id: 'q-ele-07e',
    microtopicId: 'e-prot-nr10',
    board: 'Cebraspe',
    examContext: 'Cebraspe — Engenharia Elétrica / Segurança — Procedimento de Desenergização NR-10',
    targetExams: ['Petrobras', 'Transpetro', 'Eletrobras', 'TRT / MPU'],
    questionType: 'cebraspe_tf',
    statementMarkdown:
      'Julgue o item a seguir à luz da Norma Regulamentadora nº 10 (NR-10 — Segurança em Instalações e Serviços em Eletricidade).\n\nSegundo a NR-10, uma instalação elétrica somente é considerada desenergizada e liberada para trabalho após a conclusão, na ordem estrita estabelecida pela norma, das seis etapas: (1) seccionamento; (2) impedimento de reenergização; (3) constatação da ausência de tensão; (4) instalação de aterramento temporário com equipotencialização dos condutores dos circuitos; (5) proteção dos elementos energizados existentes na zona controlada; e (6) instalação da sinalização de impedimento de reenergização.',
    correctBoolean: true,
    irt: { a: 1.4, b: 0.7, c: 0.5 },
    solutionStepsMarkdown: [
      '**1. Sequência normativa do item 10.5.1 da NR-10:** A NR-10 determina que somente serão consideradas desenergizadas as instalações elétricas liberadas para trabalho mediante os procedimentos apropriados, obedecida a sequência: a) seccionamento; b) impedimento de reenergização; c) constatação da ausência de tensão; d) instalação de aterramento temporário com equipotencialização dos condutores dos circuitos; e) proteção dos elementos energizados existentes na zona controlada; f) instalação da sinalização de impedimento de reenergização.',
      '**2. Conclusão:** A sequência apresentada reproduz exatamente as alíneas (a) a (f) do item 10.5.1 da NR-10. Item **CERTO**.',
    ],
    finalDiagnosis:
      'A inversão entre "constatação da ausência de tensão" (etapa 3) e "instalação de aterramento temporário" (etapa 4), ou o posicionamento da "sinalização de impedimento de reenergização" (etapa 6) logo após a etapa 2, são as pegadinhas mais cobradas em provas sobre a NR-10.',
    trapNote:
      'Achar que a sinalização de impedimento de reenergização (etiqueta/tag) é a etapa 3 logo após o bloqueio mecânico; na letra da NR-10 (item 10.5.1), ela aparece na alínea "f" (6ª etapa).',
    relatedNorms: ['NR-10 (Item 10.5.1)'],
    recommendedTimeSec: 90,
  },

  // =========================================================================
  // 8. e-prot-ex (Atmosferas Explosivas (IEC 60079 / ATEX) e Áreas Classificadas)
  // =========================================================================
  {
    id: 'q-ele-08c',
    microtopicId: 'e-prot-ex',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'North Sea Gas Compression Module — ATEX Directive 2014/34/EU & IEC 60079-11 Intrinsic Safety Verification',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'Petrobras', 'Transpetro'],
    questionType: 'mcq5',
    statementMarkdown:
      'Em um módulo de compressão de gás natural no Mar do Norte, classificado como **Zona 1** (Grupo IIA, temperatura de ignição espontânea do metano $537\\ ^\\circ\\text{C}$), instala-se um transmissor de pressão certificado segundo a Diretiva Europeia ATEX 2014/34/EU e a série IEC 60079 com a marcação `II 2G Ex ib IIC T4 Gb`. Os parâmetros de entidade do circuito de segurança intrínseca são:\n\n- Barreira associada (no painel seguro): $U_o = 28\\text{ V}$, $I_o = 93\\text{ mA}$, $C_o = 83\\text{ nF}$;\n- Transmissor de campo: $U_i = 30\\text{ V}$, $I_i = 100\\text{ mA}$, $C_i = 50\\text{ nF}$;\n- Cabo de instrumentação de comprimento $L = 200\\text{ m}$ com capacitância distribuída $c_c = 100\\text{ pF/m}$.\n\nAvaliando a adequação da marcação ATEX/IECEx à área classificada e a verificação capacitiva do enlace ($C_i + C_{\\text{cabo}} \\le C_o$), conclui-se que a instalação é:',
    options: [
      'Aprovada, pois o EPL `Gb` (Categoria `2G`) é apto para Zona 1, o grupo `IIC` abrange `IIA`, a classe `T4` ($135\\ ^\\circ\\text{C}$) é segura e $C_i + C_{\\text{cabo}} = 70\\text{ nF} \\le 83\\text{ nF}$.',
      'Reprovada, pois o tipo de proteção `Ex ib` (EPL `Gb`) só é permitido em Zona 2, exigindo-se obrigatoriamente `Ex ia` em Zona 1.',
      'Reprovada, pois a capacitância total do circuito vale $C_i + C_{\\text{cabo}} = 250\\text{ nF}$, excedendo o limite $C_o = 83\\text{ nF}$ da barreira.',
      'Reprovada, pois equipamentos marcados para o Grupo `IIC` (hidrogênio/acetileno) não podem operar em atmosferas do Grupo `IIA` (metano/propano).',
      'Aprovada apenas se o comprimento do cabo for reduzido para $100\\text{ m}$, pois $C_{\\text{cabo}} = 40\\text{ nF}$ ultrapassa a margem de $C_o - C_i = 33\\text{ nF}$.',
    ],
    correctIndex: 0,
    irt: { a: 1.65, b: 1.45, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Análise da marcação ATEX / IEC 60079-0:**\n- Categoria ATEX `2G` / EPL `Gb` (`Ex ib`): nível elevado de proteção, plenamente adequado para **Zona 1** (e Zona 2);\n- Grupo `IIC`: é o grupo mais rigoroso de gases (menor energia mínima de ignição), cobrindo automaticamente atmosferas `IIA` e `IIB`;\n- Classe `T4`: temperatura máxima de superfície de $135\\ ^\\circ\\text{C} < 537\\ ^\\circ\\text{C}$.',
      '**2. Verificação dos parâmetros de entidade (IEC 60079-11 / IEC 60079-14):**\n- Tensão e corrente: $U_o = 28\\text{ V} \\le U_i = 30\\text{ V}$ e $I_o = 93\\text{ mA} \\le I_i = 100\\text{ mA}$ (OK);\n- Capacitância do cabo: $C_{\\text{cabo}} = c_c \\times L = 100\\text{ pF/m} \\times 200\\text{ m} = 20000\\text{ pF} = 20\\text{ nF}$;\n- Capacitância total conectada à barreira: $C_{\\text{tot}} = C_i + C_{\\text{cabo}} = 50 + 20 = 70\\text{ nF} \\le C_o = 83\\text{ nF}$ (OK).',
    ],
    finalDiagnosis:
      'A verificação de segurança intrínseca exige simultaneamente a compatibilidade de Zona/Grupo/Temperatura e o cumprimento das desigualdades de entidade ($U_o \\le U_i$, $I_o \\le I_i$, $P_o \\le P_i$, $C_i + C_{\\text{cabo}} \\le C_o$ e $L_i + L_{\\text{cabo}} \\le L_o$).',
    trapNote:
      'Confundir `Ex ib` (EPL `Gb`, permitido em Zona 1 e Zona 2) com `Ex ic` (EPL `Gc`, restrito à Zona 2), ou errar a conversão de $20000\\text{ pF}$ para $20\\text{ nF}$.',
    relatedNorms: ['ATEX 2014/34/EU', 'ABNT NBR IEC 60079-0', 'ABNT NBR IEC 60079-11', 'ABNT NBR IEC 60079-14'],
    recommendedTimeSec: 165,
  },
  {
    id: 'q-ele-08d',
    microtopicId: 'e-prot-ex',
    board: 'Cesgranrio',
    examContext: 'Cesgranrio — Petrobras — Motores de Segurança Aumentada (Ex e) e Tempo tE (NBR IEC 60079-7)',
    targetExams: ['Petrobras', 'Transpetro', 'Refinarias / FPSOs'],
    questionType: 'mcq5',
    statementMarkdown:
      'Em uma unidade de refino da Petrobras, um motor de indução trifásico com tipo de proteção por **Segurança Aumentada (`Ex e`, ABNT NBR IEC 60079-7)** traz em sua placa de identificação a relação de corrente de partida $I_A / I_N = 6{,}0$ e o tempo $t_E = 12\\text{ s}$ para a classe de temperatura `T3` ($200\\ ^\\circ\\text{C}$). De acordo com as normas da série ABNT NBR IEC 60079-7 e 60079-14, o parâmetro $t_E$ e o requisito obrigatório para o dispositivo de proteção contra sobrecarga/rotor bloqueado desse motor são:',
    options: [
      '$t_E$ é o tempo máximo de partida em vazio, e o relé pode atuar em até $2 t_E = 24\\text{ s}$ caso o rotor trave.',
      '$t_E$ é o tempo que o enrolamento CA, percorrido pela corrente de partida $I_A$, leva para atingir a temperatura limite da classe `T3` a partir da temperatura nominal em serviço, devendo o relé desligar o motor com rotor bloqueado antes de $12\\text{ s}$.',
      '$t_E$ é o tempo de resfriamento do invólucro após uma explosão interna, exigindo-se disjuntor com rearme automático em $12\\text{ s}$.',
      '$t_E$ é a constante de tempo térmica do motor em regime nominal, permitindo que o motor opere com rotor bloqueado por até $60\\text{ s}$.',
      '$t_E$ aplica-se exclusivamente a motores à prova de explosão (`Ex d`), sendo irrelevante para o ajuste do relé térmico em motores `Ex e`.',
    ],
    correctIndex: 1,
    irt: { a: 1.5, b: 1.15, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Definição normativa do tempo $t_E$ (ABNT NBR IEC 60079-7):** Na proteção por Segurança Aumentada (`Ex e`), não são admitidas faíscas nem temperaturas capazes de inflamar a atmosfera explosiva. O tempo $t_E$ é o tempo necessário para que um enrolamento CA, quando percorrido pela corrente inicial de partida $I_A$, seja aquecido desde a temperatura atingida em serviço nominal (na máxima temperatura ambiente) até a temperatura limite da classe de temperatura marcada (`T3`).',
      '**2. Coordenação da proteção de sobrecorrente (ABNT NBR IEC 60079-14):** O dispositivo de proteção inverso dependente da corrente deve monitorar a corrente do motor e garantir o desligamento (partindo da condição a quente sob $I_A$) em um tempo $t_{\\text{trip}} < t_E = 12\\text{ s}$ caso o rotor fique bloqueado.',
    ],
    finalDiagnosis:
      'Diferentemente do motor `Ex d` (cujo invólucro suporta explosão interna), a segurança do motor `Ex e` depende criticamente da atuação do relé térmico/eletrônico em tempo inferior a $t_E$ durante um travamento de rotor.',
    trapNote:
      'Confundir o princípio de contenção de chama do `Ex d` com o princípio de prevenção de temperatura excessiva e centelhamento do `Ex e`.',
    relatedNorms: ['ABNT NBR IEC 60079-7', 'ABNT NBR IEC 60079-14'],
    recommendedTimeSec: 120,
  },
  {
    id: 'q-ele-08e',
    microtopicId: 'e-prot-ex',
    board: 'Cebraspe',
    examContext: 'Cebraspe — Petrobras — Manutenção de Juntas Flangeadas em Invólucros Ex d (NBR IEC 60079-1)',
    targetExams: ['Petrobras', 'Transpetro', 'Marinha CP-CEM'],
    questionType: 'cebraspe_tf',
    statementMarkdown:
      'Julgue o item a seguir acerca da manutenção e inspeção de equipamentos elétricos para atmosferas explosivas.\n\nEm um invólucro com proteção do tipo à prova de explosão (`Ex d`, conforme ABNT NBR IEC 60079-1), as superfícies metálicas usinadas das juntas flangeadas (passagens de chama) devem receber aplicação de cola de silicone ou junta elastomérica compressível entre as faces para vedar hermeticamente o invólucro e impedir que o gás inflamável externo penetre no seu interior.',
    correctBoolean: false,
    irt: { a: 1.55, b: 0.85, c: 0.5 },
    solutionStepsMarkdown: [
      '**1. Princípio físico do invólucro à prova de explosão (`Ex d`, IEC 60079-1):** O invólucro `Ex d` **não** é hermeticamente vedado contra a entrada de gases; ele assume que a mistura explosiva pode penetrar no invólucro e inflamar-se internamente.',
      '**2. Função da junta flangeada (passagem de chama / *flamepath*):** O interstício calibrado ($i$) e a largura da junta ($L$) são dimensionados com base no MESG (*Maximum Experimental Safe Gap*) para que os gases quentes da explosão interna sejam resfriados ao escaparem pela fenda metálica, sem inflamar a atmosfera externa.',
      '**3. Proibição normativa (IEC 60079-1 / 60079-17):** Pintar as faces da junta, colar silicone ou inserir gaxetas não certificadas no *flamepath* altera a folga mecânica ou cria risco de expulsão incandescente, invalidando a certificação `Ex d` (admite-se apenas graxa anticorrosiva não endurecível especificada pelo fabricante). Item **ERRADO**.',
    ],
    finalDiagnosis:
      'Nunca se deve pintar, usinar ou aplicar silicone de vedação nas faces das juntas de passagem de chama de um equipamento `Ex d`.',
    trapNote:
      'Achar que "à prova de explosão (`Ex d`)" significa "à prova de entrada de gás"; quem impede a entrada do gás por sobrepressão de gás inerte/ar limpo é o tipo de proteção `Ex p` (invólucro pressurizado, IEC 60079-2).',
    relatedNorms: ['ABNT NBR IEC 60079-1', 'ABNT NBR IEC 60079-17'],
    recommendedTimeSec: 90,
  },

  // =========================================================================
  // 9. e-pe-converters (Eletrônica de Potência: Conversores CC-CC, Retificadores e Inversores)
  // =========================================================================
  {
    id: 'q-ele-09c',
    microtopicId: 'e-pe-converters',
    board: 'Europa — CERN / ESA',
    examContext: 'ESA Spacecraft Regulated Power Bus & CERN Corrector Magnet — Synchronous Buck Converter in CCM',
    targetExams: ['CERN / ESA (Europa)', 'Petrobras', 'Marinha CP-CEM'],
    questionType: 'mcq5',
    statementMarkdown:
      'No sistema de distribuição de potência de uma sonda espacial da Agência Espacial Europeia (ESA), um conversor CC-CC abaixador (*Buck*) síncrono sem perdas opera em Modo de Condução Contínua (MCC / CCM), reduzindo a tensão do barramento primário de $V_{\\text{in}} = 100\\text{ V}$ para uma saída regulada $V_o = 40\\text{ V}$. A frequência de chaveamento PWM é $f_s = 50\\text{ kHz}$ e a indutância de saída vale $L = 480\\ \\mu\\text{H}$. A razão cíclica (*duty cycle*) $D$ e a ondulação pico a pico de corrente no indutor ($\\Delta I_L$) são, respectivamente:',
    options: [
      '$D = 0{,}40$ e $\\Delta I_L = 0{,}50\\text{ A}$',
      '$D = 0{,}40$ e $\\Delta I_L = 1{,}00\\text{ A}$',
      '$D = 0{,}60$ e $\\Delta I_L = 1{,}00\\text{ A}$',
      '$D = 0{,}40$ e $\\Delta I_L = 1{,}67\\text{ A}$',
      '$D = 0{,}25$ e $\\Delta I_L = 2{,}00\\text{ A}$',
    ],
    correctIndex: 1,
    irt: { a: 1.45, b: 0.95, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Razão cíclica ($D$) no conversor Buck em MCC:** Pelo balanço volt-segundo no indutor em regime permanente:\n$$D = \\frac{V_o}{V_{\\text{in}}} = \\frac{40}{100} = 0{,}40$$',
      '**2. Ondulação pico a pico da corrente no indutor ($\\Delta I_L$):** Durante o intervalo $t_{\\text{on}} = D T_s$, a tensão sobre o indutor é $v_L = V_{\\text{in}} - V_o = V_{\\text{in}}(1 - D) = 60\\text{ V}$. Logo:\n$$\\Delta I_L = \\frac{(V_{\\text{in}} - V_o) D}{f_s L} = \\frac{V_{\\text{in}} D (1 - D)}{f_s L} = \\frac{100 \\times 0{,}40 \\times 0{,}60}{(50 \\times 10^3\\text{ Hz}) \\times (480 \\times 10^{-6}\\text{ H})} = \\frac{24}{24} = 1{,}00\\text{ A}$$',
    ],
    finalDiagnosis:
      'No conversor *Buck* em MCC, a ondulação máxima de corrente ocorre em $D = 0{,}50$ e obedece diretamente à lei de Faraday $v_L = L\\,\\Delta I_L / \\Delta t$.',
    trapNote:
      'Esquecer o fator $(1 - D)$ na fórmula de $\\Delta I_L$ (usando $V_o D / (f_s L)$, que vale para o conversor *Boost*, e encontrando $16 / 24 = 0{,}67\\text{ A}$ ou $40 / 24 = 1{,}67\\text{ A}$).',
    relatedNorms: ['ECSS-E-ST-20C (ESA Space Engineering)'],
    recommendedTimeSec: 120,
  },
  {
    id: 'q-ele-09d',
    microtopicId: 'e-pe-converters',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'Offshore Drilling DC Drive / Thyristor Bridge — 6-Pulse Controlled Rectifier Average Voltage',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'Petrobras', 'Eletrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um retificador trifásico totalmente controlado em ponte de Graetz (6 pulsos, a tiristores SCR) alimenta uma carga fortemente indutiva (corrente CC livre de ondulação) a partir de um barramento trifásico simétrico com tensão de linha eficaz $V_L = 400\\text{ V}$ ($50\\text{ Hz}$). Desprezando a indutância de comutação da rede e as quedas diretas nos tiristores (adote $\\frac{3\\sqrt{2}}{\\pi} \\approx 1{,}35$), quando os tiristores são disparados com ângulo de atraso $\\alpha = 60^\\circ$, o valor médio da tensão de saída CC ($V_d$) e o fator de deslocamento fundamental ($\\cos\\varphi_1$) na entrada CA são:',
    options: [
      '$V_d = 540\\text{ V}$ e $\\cos\\varphi_1 = 1{,}00$ indutivo',
      '$V_d = 468\\text{ V}$ e $\\cos\\varphi_1 = 0{,}866$ indutivo',
      '$V_d = 270\\text{ V}$ e $\\cos\\varphi_1 = 0{,}50$ indutivo',
      '$V_d = 270\\text{ V}$ e $\\cos\\varphi_1 = 0{,}866$ capacitivo',
      '$V_d = 180\\text{ V}$ e $\\cos\\varphi_1 = 0{,}50$ indutivo',
    ],
    correctIndex: 2,
    irt: { a: 1.5, b: 1.1, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Tensão média CC em ponte trifásica de 6 pulsos controlada:**\n$$V_d(\\alpha) = \\frac{3\\sqrt{2}}{\\pi} V_L \\cos\\alpha \\approx 1{,}35 \\times V_L \\times \\cos\\alpha$$',
      '**2. Cálculo para $V_L = 400\\text{ V}$ e $\\alpha = 60^\\circ$ ($\\cos 60^\\circ = 0{,}50$):**\n$$V_d(60^\\circ) = 1{,}35 \\times 400 \\times 0{,}50 = 540 \\times 0{,}50 = 270\\text{ V}$$',
      '**3. Fator de deslocamento fundamental ($\\cos\\varphi_1$):** Desprezando o ângulo de comutação ($\\mu = 0$), a componente fundamental da corrente de linha CA atrasa exatamente de $\\varphi_1 = \\alpha = 60^\\circ$ em relação à tensão fase-neutro correspondente. Logo, $\\cos\\varphi_1 = \\cos\\alpha = 0{,}50$ indutivo (o retificador a tiristor consome potência reativa da rede para $\\alpha > 0$).',
    ],
    finalDiagnosis:
      'Em retificadores controlados por fase (LCC), o aumento do ângulo de disparo $\\alpha$ reduz a tensão média CC segundo $V_{d0}\\cos\\alpha$, mas degrada na mesma proporção o fator de deslocamento $\\cos\\varphi_1 = \\cos\\alpha$, exigindo bancos de filtros e compensação reativa.',
    trapNote:
      'Usar $\\text{sen}\\,60^\\circ = 0{,}866$ em vez de $\\cos 60^\\circ = 0{,}50$, ou achar que o conversor a tiristor pode operar com fator de potência capacitivo sob comutação natural.',
    relatedNorms: ['IEC 60146-1-1'],
    recommendedTimeSec: 120,
  },
  {
    id: 'q-ele-09e',
    microtopicId: 'e-pe-converters',
    board: 'Cebraspe',
    examContext: 'Cebraspe — Eletrônica de Potência — Inversor Trifásico VSI com Modulação PWM Senoidal',
    targetExams: ['Petrobras', 'ITA / Marinha', 'Eletrobras'],
    questionType: 'cebraspe_tf',
    statementMarkdown:
      'Julgue o item a seguir a respeito de inversores trifásicos fonte de tensão (VSI) em ponte completa com modulação por largura de pulso senoidal (SPWM).\n\nEm um inversor trifásico equilibrado operando na região linear de modulação ($m_a \\le 1{,}0$) com portadora triangular comum às três fases, os harmônicos de tensão de ordem tripla (múltiplos ímpares de $3$, de sequência zero) presentes na tensão de cada braço em relação ao ponto médio do barramento CC possuem a mesma fase nos três braços e, por conseguinte, cancelam-se mutuamente nas tensões de linha aplicadas a uma carga trifásica isolada.',
    correctBoolean: true,
    irt: { a: 1.55, b: 1.2, c: 0.5 },
    solutionStepsMarkdown: [
      '**1. Harmônicos de sequência zero nos três braços ($a, b, c$):** Para harmônicos de ordem $h = 3k$ ($3, 9, 15\\dots$), a defasagem entre os braços é $h \\times 120^\\circ = 3k \\times 120^\\circ = k \\times 360^\\circ \\equiv 0^\\circ$ (estão em fase nos três braços: $v_{aN,3k} = v_{bN,3k} = v_{cN,3k}$).',
      '**2. Cancelamento na tensão de linha ($v_{ab} = v_{aN} - v_{bN}$):** Ao subtrair as tensões de dois braços quaisquer para formar a tensão de linha, todas as componentes homopolares (incluindo os harmônicos múltiplos de $3$ e até mesmo uma eventual injeção intencional de $3^\\text{a}$ harmônica para ampliar a faixa linear em $15{,}5\\%$) anulam-se exatamente. Item **CERTO**.',
    ],
    finalDiagnosis:
      'Esse cancelamento das componentes homopolares na tensão de linha é inclusive a base da técnica de PWM com injeção de $3^\\text{a}$ harmônica (e do *Space Vector PWM* — SVPWM), que permite elevar a tensão fundamental de linha máxima em $\\frac{2}{\\sqrt{3}} \\approx 1{,}155$ ($+15{,}5\\%$) sem sobremodulação.',
    trapNote:
      'Confundir a tensão de braço $v_{aN}$ (que contém harmônicos da portadora e de ordem tripla se injetados) com a tensão de linha $v_{ab} = v_{aN} - v_{bN}$ (onde toda componente em modo comum desaparece).',
    relatedNorms: ['IEC 61800-3'],
    recommendedTimeSec: 95,
  },

  // =========================================================================
  // 10. e-ctrl-freq (Sistemas de Controle Clássico: Routh-Hurwitz, Lugar das Raízes e Bode/Nyquist)
  // =========================================================================
  {
    id: 'q-ele-10c',
    microtopicId: 'e-ctrl-freq',
    board: 'Europa — CERN / ESA',
    examContext: 'ESA Satellite Attitude Control Loop — Routh-Hurwitz Stability Margin & Marginal Oscillation',
    targetExams: ['CERN / ESA (Europa)', 'Petrobras', 'Marinha CP-CEM'],
    questionType: 'mcq5',
    statementMarkdown:
      'A malha de controle de atitude de um satélite de observação da Agência Espacial Europeia (ESA) possui realimentação negativa unitária e função de transferência de malha aberta dada por:\n$$L(s) = G(s)H(s) = \\frac{K}{s(s+2)(s+5)}$$\nAplicando o critério de estabilidade algébrico de Routh-Hurwitz, a faixa de valores do ganho proporcional $K$ que garante a estabilidade assintótica em malha fechada e a frequência angular de oscilação sustentada ($\\omega_{\\text{osc}}$) quando o sistema opera no limiar crítico de estabilidade são:',
    options: [
      '$0 < K < 10$ e $\\omega_{\\text{osc}} = \\sqrt{7}\\text{ rad/s}$',
      '$0 < K < 70$ e $\\omega_{\\text{osc}} = \\sqrt{10}\\text{ rad/s}$',
      '$0 < K < 70$ e $\\omega_{\\text{osc}} = 10\\text{ rad/s}$',
      '$0 < K < 35$ e $\\omega_{\\text{osc}} = \\sqrt{5}\\text{ rad/s}$',
      '$K > 0$ (estável para qualquer ganho positivo) e não há oscilação crítica.',
    ],
    correctIndex: 1,
    irt: { a: 1.5, b: 1.05, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Equação característica de malha fechada ($1 + L(s) = 0$):**\n$$s(s^2 + 7s + 10) + K = 0 \\implies s^3 + 7s^2 + 10s + K = 0$$',
      '**2. Tabulação de Routh-Hurwitz para polinômio cúbico ($a_3 s^3 + a_2 s^2 + a_1 s + a_0 = 0$):**\n- Linha $s^3$: $1 \\quad 10$\n- Linha $s^2$: $7 \\quad K$\n- Linha $s^1$: $b_1 = \\frac{7 \\times 10 - 1 \\times K}{7} = \\frac{70 - K}{7}$\n- Linha $s^0$: $K$\nPara que todos os elementos da primeira coluna sejam estritamente positivos: $K > 0$ e $70 - K > 0 \\implies 0 < K < 70$.',
      '**3. Frequência de oscilação marginal em $K_{\\text{cr}} = 70$:** Tomando a equação auxiliar da linha $s^2$:\n$$A(s) = 7s^2 + K_{\\text{cr}} = 7s^2 + 70 = 0 \\implies s^2 = -10 \\implies s = \\pm j\\sqrt{10}\\text{ rad/s}$$\nPortanto, $\\omega_{\\text{osc}} = \\sqrt{10}\\text{ rad/s}$.',
    ],
    finalDiagnosis:
      'Para qualquer polinômio mônico de 3ª ordem $s^3 + a_2 s^2 + a_1 s + a_0 = 0$ com coeficientes positivos, a condição de Routh resume-se ao produto dos meios maior que o produto dos extremos: $a_2 a_1 > a_0$ ($7 \\times 10 > K$) e a frequência marginal é $\\omega_{\\text{osc}} = \\sqrt{a_1} = \\sqrt{10}\\text{ rad/s}$.',
    trapNote:
      'Esquecer de tirar a raiz quadrada ao resolver a equação auxiliar $7s^2 + 70 = 0$, marcando $\\omega_{\\text{osc}} = 10\\text{ rad/s}$.',
    relatedNorms: ['ECSS-E-ST-60-30C (ESA Control Engineering)'],
    recommendedTimeSec: 130,
  },
  {
    id: 'q-ele-10d',
    microtopicId: 'e-ctrl-freq',
    board: 'Europa — CEng / Ordem dos Engenheiros',
    examContext: 'CEng — Resposta em Frequência (Bode), Margem de Fase e Atraso de Transporte Crítico',
    targetExams: ['CEng / Ordem dos Engenheiros (Europa)', 'CERN / ESA (Europa)', 'Petrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um sistema de controle industrial em malha fechada apresenta função de transferência de malha aberta $L(j\\omega)$ de fase mínima. No levantamento experimental do seu Diagrama de Bode, verifica-se que a frequência de cruzamento de ganho (onde $|L(j\\omega_{cg})| = 0\\text{ dB}$) vale $\\omega_{cg} = 10\\text{ rad/s}$, e a fase medida nessa frequência é $\\angle L(j10) = -135^\\circ$. Caso um atraso puro de transporte $e^{-s T_d}$ (decorrente de comunicação em rede digital) seja introduzido na malha sem alterar o módulo $|L(j\\omega)|$, a Margem de Fase original ($\\text{MF}$) e o máximo atraso de tempo $T_{d,\\max}$ suportado antes que o sistema atinja a instabilidade são:',
    options: [
      '$\\text{MF} = 45^\\circ$ e $T_{d,\\max} = \\frac{\\pi}{40}\\text{ s} \\approx 78{,}5\\text{ ms}$',
      '$\\text{MF} = 45^\\circ$ e $T_{d,\\max} = 4{,}5\\text{ s}$',
      '$\\text{MF} = 135^\\circ$ e $T_{d,\\max} = \\frac{3\\pi}{40}\\text{ s} \\approx 235{,}6\\text{ ms}$',
      '$\\text{MF} = 45^\\circ$ e $T_{d,\\max} = \\frac{\\pi}{20}\\text{ s} \\approx 157{,}1\\text{ ms}$',
      '$\\text{MF} = 90^\\circ$ e $T_{d,\\max} = \\frac{\\pi}{10}\\text{ s} \\approx 314{,}2\\text{ ms}$',
    ],
    correctIndex: 0,
    irt: { a: 1.6, b: 1.4, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Cálculo da Margem de Fase ($\\text{MF}$):**\n$$\\text{MF} = 180^\\circ + \\angle L(j\\omega_{cg}) = 180^\\circ - 135^\\circ = 45^\\circ = \\frac{\\pi}{4}\\text{ rad}$$',
      '**2. Defasagem introduzida pelo atraso puro de transporte ($e^{-j\\omega T_d}$):** Um atraso puro de tempo tem módulo unitário ($|e^{-j\\omega T_d}| = 1 = 0\\text{ dB}$, não alterando $\\omega_{cg}$) e introduz um atraso de fase linear com a frequência: $\\Delta\\phi(\\omega) = -\\omega T_d$ (em radianos).',
      '**3. Limite de estabilidade em $\\omega_{cg} = 10\\text{ rad/s}$:** O sistema torna-se marginalmente instável quando o atraso adicional consome toda a Margem de Fase em radianos:\n$$\\omega_{cg} T_{d,\\max} = \\text{MF}_{(\\text{rad})} \\implies T_{d,\\max} = \\frac{\\pi / 4}{10} = \\frac{\\pi}{40}\\text{ s} \\approx 0{,}0785\\text{ s} = 78{,}5\\text{ ms}$$',
    ],
    finalDiagnosis:
      'A relação $T_{d,\\max} = \\frac{\\text{MF}_{\\text{rad}}}{\\omega_{cg}}$ mostra por que malhas de controle rápidas (alto $\\omega_{cg}$) são extremamente sensíveis a pequenos atrasos de amostragem e comunicação em rede.',
    trapNote:
      'Dividir a Margem de Fase em graus ($45^\\circ$) diretamente por $\\omega_{cg} = 10\\text{ rad/s}$ sem converter graus para radianos, obtendo o distrator absurdo de $4{,}5\\text{ s}$.',
    relatedNorms: ['IEC 61131-3'],
    recommendedTimeSec: 140,
  },
  {
    id: 'q-ele-10e',
    microtopicId: 'e-ctrl-freq',
    board: 'FGV',
    examContext: 'FGV — Engenharia Elétrica — Tipo do Sistema, Constante de Erro de Velocidade e Erro Estacionário',
    targetExams: ['Petrobras', 'Transpetro', 'EPE', 'ANEEL'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um sistema de controle estável com realimentação negativa unitária possui função de transferência de ramo direto:\n$$G(s) = \\frac{20(s + 1)}{s(s + 2)(s + 5)}$$\nQuando esse sistema é submetido a uma entrada em degrau unitário $r_1(t) = u(t)$ e, em um segundo ensaio, a uma entrada em rampa $r_2(t) = 4t\\,u(t)$, os erros em regime permanente $e_{ss,1}$ (para o degrau) e $e_{ss,2}$ (para a rampa $4t$) valem, respectivamente:',
    options: [
      '$e_{ss,1} = 0{,}50$ e $e_{ss,2} = \\infty$',
      '$e_{ss,1} = 0$ e $e_{ss,2} = 0{,}50$',
      '$e_{ss,1} = 0$ e $e_{ss,2} = 2{,}00$',
      '$e_{ss,1} = 0$ e $e_{ss,2} = 0{,}20$',
      '$e_{ss,1} = 2{,}00$ e $e_{ss,2} = 4{,}00$',
    ],
    correctIndex: 2,
    irt: { a: 1.4, b: 0.9, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Identificação do Tipo do Sistema e erro ao degrau:** Como $G(s)$ possui um integrador puro na origem ($N = 1$, sistema **Tipo 1**), o erro estacionário para entrada em degrau é identicamente nulo: $e_{ss,1} = 0$.',
      '**2. Constante estática de erro de velocidade ($K_v$):**\n$$K_v = \\lim_{s \\to 0} s G(s) = \\lim_{s \\to 0} \\frac{20(s + 1)}{(s + 2)(s + 5)} = \\frac{20 \\times 1}{2 \\times 5} = \\frac{20}{10} = 2{,}0\\text{ s}^{-1}$$',
      '**3. Erro estacionário para a rampa de inclinação $A = 4$ ($R_2(s) = 4/s^2$):**\n$$e_{ss,2} = \\frac{A}{K_v} = \\frac{4}{2{,}0} = 2{,}00$$',
    ],
    finalDiagnosis:
      'Um sistema Tipo 1 segue entradas em degrau com erro nulo e segue entradas em rampa $A t\\,u(t)$ com erro estacionário finito constante igual a $A / K_v$.',
    trapNote:
      'Calcular $1/K_v = 0{,}50$ esquecendo que a rampa aplicada tem inclinação $A = 4$ (e não rampa unitária).',
    recommendedTimeSec: 115,
  },

  // =========================================================================
  // 11. g-math-laplace (Transformada de Laplace, Séries de Fourier e Cálculo Numérico)
  // =========================================================================
  {
    id: 'q-mat-01c',
    microtopicId: 'g-math-laplace',
    board: 'Europa — CERN / ESA',
    examContext: 'CERN Superconducting Magnet Quench Protection — 2nd Order ODE via Laplace Transform',
    targetExams: ['CERN / ESA (Europa)', 'Petrobras', 'Marinha CP-CEM'],
    questionType: 'mcq5',
    statementMarkdown:
      'Na modelagem dinâmica de um circuito de extração de energia (*quench protection*) no CERN, a variável de estado normalizada $y(t)$ obedece ao problema de valor inicial (PVI) de segunda ordem para $t \\ge 0$:\n$$\\frac{d^2 y}{dt^2} + 4\\frac{dy}{dt} + 3y(t) = 6u(t), \\quad \\text{com } y(0^-) = 0 \\text{ e } y\'(0^-) = 2$$\nonde $u(t)$ é o degrau unitário de Heaviside. Aplicando a Transformada de Laplace unilateral, a solução analítica exata $y(t)$ para $t \\ge 0$ é:',
    options: [
      '$y(t) = 2(1 - e^{-t})$',
      '$y(t) = 2(1 - e^{-3t})$',
      '$y(t) = 2 - 3e^{-t} + e^{-3t}$',
      '$y(t) = 2 + e^{-t} - 3e^{-3t}$',
      '$y(t) = 6(1 - e^{-t})$',
    ],
    correctIndex: 0,
    irt: { a: 1.6, b: 1.35, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Aplicação da Transformada de Laplace com condições iniciais $y(0^-) = 0$ e $y\'(0^-) = 2$:**\n$$[s^2 Y(s) - s y(0^-) - y\'(0^-)] + 4[s Y(s) - y(0^-)] + 3 Y(s) = \\frac{6}{s}$$\n$$(s^2 + 4s + 3)Y(s) - 2 = \\frac{6}{s} \\implies (s + 1)(s + 3)Y(s) = 2 + \\frac{6}{s} = \\frac{2s + 6}{s}$$',
      '**2. Cancelamento polo-zero e expansão em frações parciais:**\n$$Y(s) = \\frac{2(s + 3)}{s(s + 1)(s + 3)} = \\frac{2}{s(s + 1)} = \\frac{2}{s} - \\frac{2}{s + 1}$$',
      '**3. Transformada inversa de Laplace ($t \\ge 0$):**\n$$y(t) = 2(1 - e^{-t})$$',
    ],
    finalDiagnosis:
      'A condição inicial $y\'(0^-) = 2$ cria um zero em $s = -3$ que cancela exatamente o modo natural rápido $e^{-3t}$, deixando apenas o modo dominante $e^{-t}$ na resposta temporal.',
    trapNote:
      'Esquecer de incluir o termo da derivada inicial $y\'(0^-) = 2$ na transformada de $y\'\'(t)$, o que levaria à resposta de estado nulo $2 - 3e^{-t} + e^{-3t}$.',
    recommendedTimeSec: 140,
  },
  {
    id: 'q-mat-01d',
    microtopicId: 'g-math-laplace',
    board: 'Europa — CEng / Ordem dos Engenheiros',
    examContext: 'CEng — Série de Fourier de Onda Quadrada e Teorema de Parseval',
    targetExams: ['CEng / Ordem dos Engenheiros (Europa)', 'Petrobras', 'Marinha CP-CEM'],
    questionType: 'mcq5',
    statementMarkdown:
      'Um sinal periódico de tensão $v(t)$ de período $T = 2\\pi / \\omega_0$ consiste em uma onda quadrada simétrica com simetria ímpar ($v(-t) = -v(t)$) e simetria de meia-onda ($v(t - T/2) = -v(t)$), assumindo o valor $+V_m$ em $0 < t < T/2$ e $-V_m$ em $T/2 < t < T$. A respeito da expansão em Série Trigonométrica de Fourier desse sinal e de sua potência média dissipada em um resistor de $1\\ \\Omega$, assinale a afirmativa correta:',
    options: [
      'A série contém apenas termos em cosseno ($a_n \\ne 0$) de ordem par, e a amplitude da fundamental vale $\\frac{2 V_m}{\\pi}$.',
      'A série contém apenas termos em seno ($b_n$) de ordem ímpar, com amplitude fundamental $b_1 = \\frac{4 V_m}{\\pi}$, amplitude de $3^\\text{a}$ harmônica $b_3 = \\frac{4 V_m}{3\\pi}$, e valor eficaz total $V_{\\text{rms}} = V_m$.',
      'A série contém termos em seno de todas as ordens inteiras ($n = 1, 2, 3\\dots$) com $b_n = \\frac{4 V_m}{n\\pi}$, e valor eficaz total $V_{\\text{rms}} = \\frac{V_m}{\\sqrt{2}}$.',
      'O valor médio CC vale $a_0 = V_m$, e a componente fundamental tem valor eficaz $\\frac{4 V_m}{\\pi}$.',
      'A amplitude da $5^\\text{a}$ harmônica decai com $1/n^2$, valendo $b_5 = \\frac{4 V_m}{25\\pi}$.',
    ],
    correctIndex: 1,
    irt: { a: 1.45, b: 1.0, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Simetria ímpar e de meia-onda:** Pela simetria ímpar, $a_0 = 0$ e $a_n = 0$ para todo $n$ (apenas senos). Pela simetria de meia-onda, todos os harmônicos pares são nulos ($b_{2k} = 0$).',
      '**2. Coeficientes $b_n$ para $n$ ímpar:**\n$$b_n = \\frac{4}{T}\\int_0^{T/2} V_m \\text{sen}(n\\omega_0 t)\\,dt = \\frac{4 V_m}{n\\pi} \\quad (n = 1, 3, 5\\dots)$$\nLogo, $b_1 = \\frac{4 V_m}{\\pi}$ e $b_3 = \\frac{4 V_m}{3\\pi}$.',
      '**3. Valor eficaz total (Teorema de Parseval):** Como $v^2(t) = (\\pm V_m)^2 = V_m^2$ constante em todo o período, o valor eficaz total da onda quadrada simétrica é $V_{\\text{rms}} = \\sqrt{\\frac{1}{T}\\int_0^T V_m^2\\,dt} = V_m$.',
    ],
    finalDiagnosis:
      'Em uma onda quadrada (típica de inversores de 2 níveis sem PWM), os harmônicos ímpares decaem lentamente com $1/n$ ($b_n = \\frac{4V_m}{n\\pi}$), enquanto em uma onda triangular simétrica eles decaem com $1/n^2$.',
    trapNote:
      'Confundir o valor eficaz da onda quadrada ($V_{\\text{rms}} = V_m$) com o valor eficaz de uma senoide ($V_m / \\sqrt{2}$).',
    recommendedTimeSec: 120,
  },
  {
    id: 'q-mat-01e',
    microtopicId: 'g-math-laplace',
    board: 'Cebraspe',
    examContext: 'Cebraspe — Cálculo Numérico — Método de Newton-Raphson e Ordem de Convergência',
    targetExams: ['Petrobras', 'BNDES', 'ONS', 'Marinha CP-CEM'],
    questionType: 'cebraspe_tf',
    statementMarkdown:
      'Julgue o item a seguir acerca de métodos numéricos iterativos para cálculo de raízes de equações não lineares.\n\nAo aplicar o método de Newton-Raphson ($x_{k+1} = x_k - \\frac{f(x_k)}{f\'(x_k)}$) para determinar a raiz positiva de $f(x) = x^2 - 5 = 0$ a partir da aproximação inicial $x_0 = 2{,}0$, obtém-se na primeira iteração $x_1 = 2{,}25$, apresentando esse método convergência local quadrática (ordem $p = 2$) para raízes simples.',
    correctBoolean: true,
    irt: { a: 1.4, b: 0.75, c: 0.5 },
    solutionStepsMarkdown: [
      '**1. Cálculo da primeira iteração ($x_1$):** Temos $f(x) = x^2 - 5$ e $f\'(x) = 2x$. Para $x_0 = 2{,}0$, $f(2) = 4 - 5 = -1$ e $f\'(2) = 4$. Logo:\n$$x_1 = x_0 - \\frac{f(x_0)}{f\'(x_0)} = 2{,}0 - \\frac{-1}{4} = 2{,}0 + 0{,}25 = 2{,}25$$',
      '**2. Ordem de convergência:** Como $\\sqrt{5}$ é uma raiz simples ($f\'(\\sqrt{5}) = 2\\sqrt{5} \\ne 0$) e $f\'\'(x) = 2$ é contínua, o erro satisfaz $e_{k+1} \\approx \\frac{f\'\'(\\xi)}{2 f\'(x_k)} e_k^2$, caracterizando convergência quadrática ($p = 2$). Item **CERTO**.',
    ],
    finalDiagnosis:
      'A convergência quadrática do método de Newton-Raphson dobra aproximadamente o número de algarismos significativos corretos a cada iteração (é a mesma base do cálculo iterativo de Fluxo de Potência em Sistemas Elétricos de Potência).',
    trapNote:
      'Errar o sinal de $f(2) = -1$ na fórmula iterativa e subtrair $0{,}25$ (obtendo $1{,}75$ em vez de $2{,}25$).',
    recommendedTimeSec: 90,
  },

  // =========================================================================
  // 12. b-pt-cesgranrio (Língua Portuguesa (Padrão Cesgranrio): Sintaxe, Crase e Coesão)
  // =========================================================================
  {
    id: 'q-bas-01c',
    microtopicId: 'b-pt-cesgranrio',
    board: 'Europa — EPSO / UE',
    examContext: 'EPSO (European Personnel Selection Office) / União Europeia — Raciocínio Verbal, Coesão e Regência em Língua Portuguesa',
    targetExams: ['EPSO / UE (Europa)', 'Petrobras', 'Transpetro', 'BNDES'],
    questionType: 'mcq5',
    statementMarkdown:
      'Nos processos seletivos do *European Personnel Selection Office* (EPSO — União Europeia, idioma Português) e da banca Cesgranrio, exige-se domínio rigoroso dos conectivos interfrásicos e da regência com o pronome relativo **cujo**.\n\nConsidere o período original extraído de um parecer técnico de transição energética:\n> *"Embora os cabos submarinos HVDC exijam subestações conversoras de elevado investimento inicial, sua adoção mostra-se economicamente vantajosa em longas distâncias marítimas."*\n\nAssinale a alternativa em que a reescritura mantém o **exato valor semântico concessivo** da oração subordinada inicial e emprega **corretamente** a regência verbal e o pronome relativo na oração adjetiva acrescentada:',
    options: [
      'Posto que os cabos submarinos HVDC exijam subestações conversoras — a cujos custos de implantação o parecer técnico se referiu —, sua adoção mostra-se economicamente vantajosa em longas distâncias marítimas.',
      'Porquanto os cabos submarinos HVDC exijam subestações conversoras — às quais os custos de implantação o parecer técnico se referiu —, sua adoção mostra-se economicamente vantajosa em longas distâncias marítimas.',
      'Conquanto os cabos submarinos HVDC exijam subestações conversoras — de cujos os custos de implantação o parecer técnico se referiu —, sua adoção mostra-se economicamente vantajosa em longas distâncias marítimas.',
      'Visto que os cabos submarinos HVDC exigem subestações conversoras — a cujos custos de implantação o parecer técnico aludiu —, sua adoção mostra-se economicamente vantajosa em longas distâncias marítimas.',
      'À medida que os cabos submarinos HVDC exigem subestações conversoras — cujos custos de implantação o parecer técnico fez menção —, sua adoção mostra-se economicamente vantajosa em longas distâncias marítimas.',
    ],
    correctIndex: 0,
    irt: { a: 1.55, b: 1.3, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Valor semântico dos conectivos:** "Embora" introduz oração subordinada adverbial **concessiva** (com verbo no subjuntivo). Na norma culta, **"Posto que"** e **"Conquanto"** são conjunções **concessivas** (equivalentes a *embora / ainda que*), enquanto *"Porquanto"* e *"Visto que"* são causais/explicativas e *"À medida que"* é proporcional.',
      '**2. Regência com o pronome relativo "cujo":** O verbo *referir-se* rege a preposição **a** (*referir-se a algo*), que deve anteceder o pronome relativo (*a cujos custos*). Além disso, jamais se usa artigo definido após *cujo* (o que invalida *"de cujos os custos"* na alternativa C, além do erro de preposição *de*).',
    ],
    finalDiagnosis:
      'Na norma-padrão cobrada em concursos de alto nível (Cesgranrio, FGV e EPSO), **"Posto que"** e **"Conquanto"** são estritamente **concessivos** (= embora), ao passo que **"Porquanto"** é causal/explicativo (= porque).',
    trapNote:
      'Confundir a locução concessiva "Posto que" (+ subjuntivo) com uma locução causal, ou aceitar artigo após o pronome relativo "cujo".',
    recommendedTimeSec: 120,
  },
  {
    id: 'q-bas-01d',
    microtopicId: 'b-pt-cesgranrio',
    board: 'Cesgranrio',
    examContext: 'Cesgranrio — Petrobras — Concordância Verbal, Crase e Colocação Pronominal',
    targetExams: ['Petrobras', 'Transpetro', 'BNDES', 'Banco do Brasil / Caixa'],
    questionType: 'mcq5',
    statementMarkdown:
      'De acordo com a norma-padrão da língua portuguesa cobrada pela banca Cesgranrio, assinale a alternativa em que a **concordância verbal**, o **emprego do acento grave indicativo de crase** e a **colocação pronominal** estão integralmente corretos:',
    options: [
      'Fazem mais de dez anos que houveram revisões nas diretrizes de segurança operacional às quais os engenheiros devem obedecer.',
      'Faz mais de dez anos que houve revisões nas diretrizes de segurança operacional às quais não se podem furtar os engenheiros responsáveis.',
      'Faz mais de dez anos que houveram revisões nas diretrizes de segurança operacional as quais não podem furtar-se os engenheiros responsáveis.',
      'Devem haver normas complementares àquela instrução técnica, sob pena de se comprometerem à integridade das tubulações.',
      'Tratam-se de especificações rigorosas a respeito das quais não comunicaram-se os desvios à gerência de manutenção.',
    ],
    correctIndex: 1,
    irt: { a: 1.45, b: 0.95, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Impessoalidade de "fazer" (tempo decorrido) e "haver" (existir/ocorrer):** Ambos são impessoais e permanecem na 3ª pessoa do singular: *"Faz mais de dez anos que houve revisões..."* (eliminando A, C e D).',
      '**2. Regência, crase e colocação pronominal na alternativa B:** O verbo pronominal *furtar-se* (no sentido de esquivar-se, eximir-se) exige a preposição **a** (*furtar-se a algo*), gerando crase obrigatória antes do pronome relativo *as quais* $\\to$ **às quais**. O advérbio de negação *não* atrai procliticamente o pronome *se* (*não se podem furtar*), e a locução verbal *podem furtar* concorda no plural com o sujeito posposto *os engenheiros responsáveis*.',
    ],
    finalDiagnosis:
      'A tríade clássica da Cesgranrio reúne: (1) verbos impessoais *haver* e *fazer* no singular; (2) crase em *à qual / às quais* exigida pela regência verbal; e (3) próclise obrigatória diante de palavras negativas (*não, nunca, jamais*) e pronomes relativos.',
    trapNote:
      'Pluralizar "Houve revisões" para "Houveram revisões" ou "Deve haver normas" para "Devem haver normas".',
    recommendedTimeSec: 110,
  },
  {
    id: 'q-bas-01e',
    microtopicId: 'b-pt-cesgranrio',
    board: 'Cebraspe',
    examContext: 'Cebraspe — Petrobras — Pontuação e Semântica de Orações Adjetivas',
    targetExams: ['Petrobras', 'ANEEL', 'ANP', 'Câmara / TCU'],
    questionType: 'cebraspe_tf',
    statementMarkdown:
      'Julgue o item a seguir quanto à correção gramatical e aos efeitos de sentido produzidos pela pontuação.\n\nNo período *"Os transformadores de potência, que apresentaram elevação de gases combustíveis no ensaio cromatográfico, foram retirados de operação para inspeção interna"*, a supressão das duas vírgulas manteria a correção gramatical do texto, mas alteraria seu sentido original, pois restringiria o universo de transformadores retirados de operação apenas àqueles que apresentaram elevação de gases.',
    correctBoolean: true,
    irt: { a: 1.4, b: 0.7, c: 0.5 },
    solutionStepsMarkdown: [
      '**1. Oração com vírgulas (adjetiva explicativa):** Isolada entre vírgulas, a oração *"que apresentaram elevação de gases..."* é subordinada adjetiva **explicativa**, pressupondo que **todos** os transformadores considerados apresentaram elevação de gases e foram retirados de operação.',
      '**2. Oração sem vírgulas (adjetiva restritiva):** A retirada de ambas as vírgulas preserva perfeitamente a correção sintática, mas converte a oração em subordinada adjetiva **restritiva**, indicando que **somente** o subconjunto de transformadores com elevação de gases foi retirado de operação. Item **CERTO**.',
    ],
    finalDiagnosis:
      'A distinção semântica entre oração adjetiva explicativa (com vírgulas = totalidade do grupo) e restritiva (sem vírgulas = subconjunto específico) é questão recorrente em provas do Cebraspe e da Cesgranrio.',
    trapNote:
      'Achar que a retirada de ambas as vírgulas gera erro gramatical (só haveria erro gramatical se fosse suprimida apenas uma das duas vírgulas).',
    recommendedTimeSec: 90,
  },

  // =========================================================================
  // 13. b-en-tech (Inglês Técnico para Engenharia: Leitura Instrumental e Terminologia O&G/Energia)
  // =========================================================================
  {
    id: 'q-bas-02c',
    microtopicId: 'b-en-tech',
    board: 'Europa — EPSO / UE',
    examContext: 'EPSO / ENTSO-E European Grid Code — Technical English Reading Comprehension (HVDC & Converter-Interfaced Generation)',
    targetExams: ['EPSO / UE (Europa)', 'Energy Offshore (Equinor/Shell)', 'CERN / ESA (Europa)', 'Petrobras'],
    questionType: 'mcq5',
    statementMarkdown:
      'Read the following excerpt adapted from a European Network of Transmission System Operators for Electricity (ENTSO-E) technical report on offshore wind integration:\n\n> *"Unlike conventional synchronous turbogenerators, whose rotating masses inherently provide kinetic energy to arrest the initial Rate of Change of Frequency (RoCoF) following a sudden generation outage, Converter-Interfaced Generation (CIG) — such as offshore wind farms connected via VSC-HVDC links — is electromagnetically decoupled from the onshore AC grid frequency. Consequently, unless grid-forming control algorithms or synthetic inertia schemes are explicitly implemented within the converter control loops, a high penetration of CIG invariably diminishes system rotational inertia, thereby exacerbating frequency excursions during severe contingencies."*\n\nBased on the technical passage above, choose the correct statement:',
    options: [
      'VSC-HVDC links naturally increase the mechanical rotational inertia of the onshore AC grid without requiring dedicated control algorithms.',
      'Conventional synchronous generators rely on synthetic inertia algorithms because their rotating masses are decoupled from the grid frequency.',
      'Because VSC-HVDC offshore wind farms are electromagnetically decoupled from the onshore AC frequency, replacing synchronous generators with uncompensated CIG reduces system inertia and worsens frequency excursions after a contingency.',
      'The term *"thereby"* in the last sentence introduces a concession equivalent to *"nevertheless"* or *"despite this"*.',
      'Implementing grid-forming control algorithms is forbidden by ENTSO-E because it accelerates the Rate of Change of Frequency (RoCoF).',
    ],
    correctIndex: 2,
    irt: { a: 1.45, b: 0.95, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Análise do texto técnico:** O trecho explica que, diferentemente dos turbogeradores síncronos convencionais (cujas massas girantes fornecem inércia física para frear o RoCoF — *Rate of Change of Frequency*), a geração conectada por conversores (CIG, como parques eólicos *offshore* via VSC-HVDC) é eletromagneticamente desacoplada da frequência CA terrestre.',
      '**2. Consequência lógica (*Consequently / unless / thereby*):** A menos que controles *grid-forming* ou inércia sintética sejam implementados, a alta penetração de CIG reduz a inércia rotacional do sistema, agravando (*exacerbating*) os desvios de frequência durante contingências severas — exatamente o que afirma a alternativa C.',
      '**3. Marcadores discursivos:** *"Unlike"* = diferentemente de; *"unless"* = a menos que; *"thereby"* = desse modo / por meio disso (consequência/meio, e não concessão).',
    ],
    finalDiagnosis:
      'Dominar conectivos lógicos em inglês técnico (*unlike, unless, thereby, whereas, albeit*) e vocabulário de sistemas de potência (*outage, excursion, Rate of Change of Frequency, decoupling*) é essencial tanto para provas europeias (EPSO/Equinor/CERN) quanto para a Petrobras.',
    trapNote:
      'Ignorar a conjunção condicional negativa *"unless"* ("a menos que") e inverter a relação de causa e efeito sobre os algoritmos *grid-forming*.',
    relatedNorms: ['ENTSO-E HVDC Network Code'],
    recommendedTimeSec: 130,
  },
  {
    id: 'q-bas-02d',
    microtopicId: 'b-en-tech',
    board: 'Europa — Energy Offshore (Equinor/Shell)',
    examContext: 'Offshore Process Safety & IEC 61511 — Technical English Terminology (SIS, Voting Logic & Spurious Trips)',
    targetExams: ['Energy Offshore (Equinor/Shell)', 'Petrobras', 'Transpetro'],
    questionType: 'mcq5',
    statementMarkdown:
      'Read the following engineering specification regarding Safety Instrumented Systems (SIS) on an offshore production platform (IEC 61511):\n\n> *"When configuring the emergency shutdown (ESD) pressure transmitters on the high-pressure separator, engineers must balance two conflicting reliability metrics: the Probability of Failure on Demand (PFD), where a dangerous undetected fault prevents the system from shutting down when an overpressure actually occurs, and the Spurious Trip Rate (STR), whereby a sensor fault triggers an unnecessary production shutdown despite normal operating conditions. Adopting a 1oo2 (one-out-of-two) voting architecture enhances safety by lowering the PFD, albeit at the expense of doubling the spurious trip rate compared to a single-channel (1oo1) configuration; conversely, a 2oo3 (two-out-of-three) architecture mitigates both failure modes simultaneously."*\n\nIn the context of this specification, the expression ***"spurious trip"*** and the conjunction ***"albeit"*** mean, respectively:',
    options: [
      'Falha perigosa oculta que impede o desligamento; e "portanto" (conclusão).',
      'Desarme (desligamento) falso/indevido sem que haja emergência real; e "embora / ainda que" (concessão).',
      'Curto-circuito franco nos cabos do transmissor; e "visto que" (causa).',
      'Manutenção preventiva programada da planta; e "além disso" (adição).',
      'Atraso no tempo de resposta da válvula de bloqueio; e "caso contrário" (alternância).',
    ],
    correctIndex: 1,
    irt: { a: 1.4, b: 0.85, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Significado de *"spurious trip"*:** O próprio texto define *"Spurious Trip Rate (STR), whereby a sensor fault triggers an unnecessary production shutdown despite normal operating conditions"* — isto é, um **desarme espúrio / desligamento falso ou indevido** da produção em condições normais.',
      '**2. Significado de *"albeit"*:** Na frase *"enhances safety by lowering the PFD, **albeit** at the expense of doubling the spurious trip rate"*, a conjunção formal **albeit** equivale a *although / even though* (**embora / ainda que**), introduzindo a ressalva/concessão de que a arquitetura `1oo2` dobra a taxa de desarmes falsos.',
    ],
    finalDiagnosis:
      'Em engenharia de segurança de processo e automação (IEC 61508 / IEC 61511), *Failure on Demand* é a falha em atuar quando necessário, enquanto *Spurious Trip* (ou *nuisance trip*) é a atuação falsa que interrompe a produção sem perigo real.',
    trapNote:
      'Confundir *trip* (desarme/desligamento de proteção) com o sentido cotidiano de "viagem", ou confundir *spurious trip* com *failure on demand*.',
    relatedNorms: ['IEC 61508', 'IEC 61511'],
    recommendedTimeSec: 115,
  },
  {
    id: 'q-bas-02e',
    microtopicId: 'b-en-tech',
    board: 'Cesgranrio',
    examContext: 'Cesgranrio — Petrobras — Interpretação de Texto Técnico (Dissolved Gas Analysis — DGA in Power Transformers)',
    targetExams: ['Petrobras', 'Transpetro', 'Eletrobras', 'ONS'],
    questionType: 'mcq5',
    statementMarkdown:
      'Read the technical text below regarding condition monitoring of oil-immersed power transformers (IEEE Std C57.104 / IEC 60599):\n\n> *"Dissolved Gas Analysis (DGA) is widely recognized as the most informative non-intrusive diagnostic tool for detecting incipient faults in mineral-oil-insulated power transformers. Under abnormal thermal or electrical stresses, insulating oil and cellulose paper undergo chemical breakdown, releasing specific fault gases that dissolve into the oil. Whereas partial discharges of low energy predominantly yield hydrogen ($\\text{H}_2$) and trace amounts of methane ($\\text{CH}_4$), high-energy electrical arcing cleaves hydrocarbon molecules at temperatures exceeding $700\\ ^\\circ\\text{C}$, generating substantial concentrations of acetylene ($\\text{C}_2\\text{H}_2$). Furthermore, the simultaneous evolution of carbon monoxide ($\\text{CO}$) and carbon dioxide ($\\text{CO}_2$) serves as a telltale indicator that the thermal degradation has reached the solid cellulosic insulation winding paper."*\n\nDe acordo com o texto técnico acima, assinale a afirmação correta:',
    options: [
      'O ensaio DGA exige a abertura do tanque e a desmontagem das bobinas do transformador para coleta de papel isolante.',
      'A presença expressiva de acetileno ($\\text{C}_2\\text{H}_2$) dissolvido no óleo mineral é característica de arcos elétricos de alta energia (temperaturas acima de $700\\ ^\\circ\\text{C}$).',
      'Descargas parciais de baixa energia produzem predominantemente monóxido de carbono ($\\text{CO}$) e dióxido de carbono ($\\text{CO}_2$).',
      'A evolução de $\\text{CO}$ e $\\text{CO}_2$ comprova que o defeito está restrito ao óleo mineral, sem qualquer envolvimento do papel isolante celulósico.',
      'O vocábulo *"Whereas"* no início do terceiro período possui sentido de consequência, podendo ser substituído por *"Therefore"*.',
    ],
    correctIndex: 1,
    irt: { a: 1.35, b: 0.75, c: 0.2 },
    solutionStepsMarkdown: [
      '**1. Verificação direta no texto:** O texto afirma explicitamente que *"high-energy electrical arcing cleaves hydrocarbon molecules at temperatures exceeding $700\\ ^\\circ\\text{C}$, generating substantial concentrations of acetylene ($\\text{C}_2\\text{H}_2$)"*, validando a alternativa B.',
      '**2. Análise das demais alternativas:**\n- A é falsa: o texto diz *"non-intrusive diagnostic tool"* (não intrusiva);\n- C e D são falsas: descargas parciais geram $\\text{H}_2$ e traços de $\\text{CH}_4$, enquanto $\\text{CO}$ e $\\text{CO}_2$ são indicadores típicos (*telltale indicator*) de degradação térmica do papel celulósico sólido;\n- E é falsa: *"Whereas"* estabelece contraste/oposição ("Ao passo que / Enquanto"), e não consequência.',
    ],
    finalDiagnosis:
      'Além da leitura instrumental em inglês (*non-intrusive, incipient faults, whereas, telltale indicator, cleave*), este item consolida um conhecimento técnico clássico de manutenção de transformadores: acetileno ($\\text{C}_2\\text{H}_2$) = arco elétrico de alta energia; $\\text{CO}/\\text{CO}_2$ = degradação de celulose (papel isolante).',
    trapNote:
      'Confundir *"Whereas"* ("ao passo que", contrastivo) com *"Whereby"* ("pelo qual") ou *"Therefore"* ("portanto").',
    relatedNorms: ['IEC 60599', 'IEEE Std C57.104', 'ABNT NBR 7274'],
    recommendedTimeSec: 120,
  },
];

