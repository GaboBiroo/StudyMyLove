import type { Microtopic } from '../types/study';

export const MICROTOPICS_ELE_AND_BASIC: Microtopic[] = [
  {
    id: 'e-em-maxwell',
    code: 'ELE-01',
    title: 'Equações de Maxwell, Onda Eletromagnética, Poynting e Efeito Pelicular',
    englishSubtitle: "Maxwell's Equations, Wave Equation, Poynting Vector & Skin Effect",
    macroArea: 'ele',
    planetId: 'eletro-circuitos',
    copyAbility: 'spark',
    unipOrigin: 'Eletromagnetismo / Física IV (UNIP)',
    petrobrasAllocation: 'Bloco I — Elétrica (Alta Incidência)',
    generalConcursosRelevance: 'Petrobras, Transpetro, Eletrobras, Marinha CP-CEM, Perito',
    bloomLevel: 'Dedução / Aplicação',
    incidence: 'Alta',
    norms: ['IEEE Std C95.1', 'IEC 60287 (Resistência CA e Efeito Pelicular)'],
    estimatedStudyMinutes: 85,
    summary:
      'Forma diferencial e integral das 4 Equações de Maxwell, corrente de deslocamento de Ampère-Maxwell, Equação de Helmholtz, Vetor de Poynting (E × H) e profundidade de penetração pelicular δ.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'maxwell-poynting-skin',
        title: '1. Equações de Maxwell, Vetor de Poynting e Efeito Pelicular',
        levelTag: 'Núcleo Eletromagnetismo Aplicado',
        contentMarkdown: `As **quatro Equações de Maxwell** governam integralmente os campos elétrico ($\\mathbf{E}, \\mathbf{D}$) e magnético ($\\mathbf{B}, \\mathbf{H}$). Em meios lineares, isotrópicos e homogêneos ($\\mathbf{D}=\\epsilon\\mathbf{E}, \\mathbf{B}=\\mu\\mathbf{H}, \\mathbf{J}=\\sigma\\mathbf{E}$), a introdução da **corrente de deslocamento** $\\partial \\mathbf{D} / \\partial t$ na Lei de Ampère permite deduzir a propagação de ondas transversais eletromagnéticas (TEM) à velocidade $v_p = 1/\\sqrt{\\mu\\epsilon}$.

O fluxo instantâneo de potência eletromagnética por unidade de área ($\\text{W/m}^2$) é dado pelo **Vetor de Poynting** $\\mathbf{S} = \\mathbf{E} \\times \\mathbf{H}$.

Em condutores percorridos por corrente alternada de frequência $f$, a corrente concentra-se junto à superfície externa (**efeito pelicular / skin effect**), com decaimento exponencial governado pela **profundidade pelicular** $\\delta$, reduzindo a seção efetiva e elevando $R_{CA} > R_{CC}$ (exigindo cabos segmentados Milliken em altas potências).`,
        keyEquations: [
          {
            label: 'Equações Diferenciais de Maxwell',
            latex: String.raw`\nabla \cdot \mathbf{D} = \rho_v, \quad \nabla \cdot \mathbf{B} = 0, \quad \nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}, \quad \nabla \times \mathbf{H} = \mathbf{J} + \frac{\partial \mathbf{D}}{\partial t}`,
          },
          {
            label: 'Equação de Helmholtz e Vetor de Poynting',
            latex: String.raw`\nabla^2 \mathbf{\tilde{E}} + \omega^2 \mu \epsilon \mathbf{\tilde{E}} = \mathbf{0}, \qquad \mathbf{S} = \mathbf{E} \times \mathbf{H}`,
          },
          {
            label: 'Profundidade de Penetração Pelicular (Skin Depth)',
            latex: String.raw`\delta = \sqrt{\frac{2}{\omega \mu \sigma}} = \frac{1}{\sqrt{\pi f \mu \sigma}}`,
          },
        ],
        examPitfalls: [
          'Cebraspe costuma perguntar: "O aumento da frequência elétrica ou da condutividade do material AUMENTA a profundidade pelicular δ" — ERRADO! δ é inversamente proporcional a √(f·μ·σ): quanto maior a frequência, MENOR a espessura útil e MAIOR a resistência CA!',
          'No cobre a 60 Hz, δ ≈ 8,5 mm; por isso condutores grossos acima de 240 mm² precisam ser segmentados.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-em-1',
        title: "MIT 8.02x Lect 16 — Electromagnetic Induction, Faraday's Law & Lenz Law",
        channel: 'Prof. Walter Lewin (MIT)',
        language: 'EN',
        duration: '49 min',
        whyWatch: 'Aula lendária com demonstrações experimentais inesquecíveis de indução eletromagnética.',
        youtubeId: 'nGQbA2jwkWI',
        url: 'https://www.youtube.com/watch?v=nGQbA2jwkWI',
        platform: 'YouTube',
      },
      {
        id: 'vid-em-ocw',
        title: 'MIT OCW 8.02 — Electricity and Magnetism (Material Completo)',
        channel: 'MIT OpenCourseWare',
        language: 'EN',
        duration: 'Curso completo',
        whyWatch: 'Notas de aula e problem sets completos de eletrostática, magnetostática e Maxwell.',
        url: 'https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/',
        platform: 'MIT OCW',
      },
    ],
    books: [
      {
        citation: 'HAYT JR., W. H.; BUCK, J. A. Eletromagnetismo. Bookman.',
        chapters: 'Caps. 10, 11 e 12 (Equações de Maxwell, Ondas Planas e Efeito Pelicular)',
        focusNote: 'Notação padrão dos concursos brasileiros de Engenharia Elétrica.',
      },
      {
        citation: 'GRIFFITHS, D. J. Introduction to Electrodynamics. Cambridge University Press.',
        chapters: 'Caps. 7, 8 e 9',
        focusNote: 'Rigor nível Cambridge em eletrodinâmica e energia de campo (Poynting).',
      },
    ],
  },
  {
    id: 'e-circuits-ac3',
    code: 'ELE-02',
    title: 'Teoremas de Thévenin/Norton, Fasores, Correção de FP e Circuitos Trifásicos',
    englishSubtitle: 'Circuits: Thevenin, Phasors, Power Factor Correction & 3-Phase Systems',
    macroArea: 'ele',
    planetId: 'eletro-circuitos',
    copyAbility: 'spark',
    unipOrigin: 'Teoria de Circuitos / Eletrotécnica (UNIP)',
    petrobrasAllocation: 'Bloco I — Elétrica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Transpetro, Eletrobras, BNDES, EPE, Marinha',
    bloomLevel: 'Aplicação / Cálculo',
    incidence: 'Crítica (Alta)',
    norms: ['PRODIST Módulo 8 (Fator de Potência mínimo 0,92)', 'IEEE 1459'],
    estimatedStudyMinutes: 90,
    summary:
      'Equivalentes de Thévenin e Norton com fontes dependentes, análise fasorial, potência complexa S = V·I* = P + jQ, correção de fator de potência em Δ e Y, relações V_L/V_F e transitórios RLC via Laplace.',
    interactiveDiagram: 'three-phase-phasor',
    compendium: [
      {
        id: 'phasors-3phase-pfc',
        title: '1. Potência Complexa, Bancos de Capacitores e Sistemas Trifásicos',
        levelTag: 'Tema Nº 1 de Cálculo na Cesgranrio Elétrica',
        contentMarkdown: `Em regime permanente senoidal, a **potência complexa** calcula-se por $\\mathbf{S} = \\mathbf{V}_{ef} \\mathbf{I}_{ef}^* = P + jQ$ (atenção ao **conjugado complexo** da corrente!).

Para corrigir o fator de potência indutivo de uma planta de $\\cos\\theta_1$ para $\\cos\\theta_2$ mantendo $P$ constante, dimensiona-se o banco capacitivo com $Q_C = P(\\tan\\theta_1 - \\tan\\theta_2)$.

**Atenção crucial ao ligar o banco em Triângulo ($\\Delta$) vs. Estrela ($Y$):**
- Em **$\\Delta$**, cada capacitor fica submetido à **tensão de linha** $V_L$, logo $C_\\Delta = \\frac{Q_{C,fase}}{\\omega V_L^2}$.
- Em **$Y$**, cada capacitor fica submetido à **tensão de fase** $V_F = V_L / \\sqrt{3}$, exigindo capacitância **$3\\times$ maior** ($C_Y = 3\\,C_\\Delta$) para entregar o mesmo $Q_C$! Por isso bancos industriais de 13,8 kV preferem ligação em $\\Delta$ ou Y isolado.`,
        keyEquations: [
          {
            label: 'Potência Complexa e Correção de Fator de Potência',
            latex: String.raw`\mathbf{S} = \mathbf{V}\mathbf{I}^* = P + jQ, \qquad Q_C = P \left( \tan(\theta_1) - \tan(\theta_2) \right)`,
          },
          {
            label: 'Relações Trifásicas Equilibradas (Sequência ABC) e Potência 3φ',
            latex: String.raw`\text{Estrela (Y): } V_L = \sqrt{3} V_F \angle +30^\circ,\ I_L = I_F \qquad \text{Delta (}\Delta\text{): } V_L = V_F,\ I_L = \sqrt{3} I_F \angle -30^\circ`,
          },
          {
            label: 'Potência Trifásica Total e Circuitos RLC no Domínio s',
            latex: String.raw`P_{3\phi} = \sqrt{3} V_L I_L \cos\theta, \quad V_L(s) = s L I(s) - L i(0^-), \quad I_C(s) = s C V(s) - C v_C(0^-)`,
          },
        ],
        examPitfalls: [
          'Cuidado na máxima transferência de potência em CA: com carga Z_L variável irrestrita, Z_L = Z_th* (CONJUGADO complexo!). Se Z_L for puramente resistiva (R_L), a condição passa a ser R_L = |Z_th|!',
          'Na medição de potência trifásica pelo Método dos Dois Wattímetros: se um wattímetro marcar zero, FP = 0,5 (θ = 60°); se um deles marcar negativo, FP < 0,5!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-3ph-1',
        title: 'Why 3 Phase Power Is So Much Better',
        channel: 'The Engineering Mindset',
        language: 'EN',
        duration: '14 min',
        whyWatch: 'Intuição física da potência instantânea constante e redução de cobre em sistemas trifásicos.',
        youtubeId: 'EElZjxhQxHs',
        url: 'https://www.youtube.com/watch?v=EElZjxhQxHs',
        platform: 'YouTube',
      },
      {
        id: 'vid-3ph-2',
        title: 'Instalações Elétricas — Aula 02: Circuitos em Corrente Alternada (CA)',
        channel: 'UNIVESP',
        language: 'PT-BR',
        duration: '25 min',
        whyWatch: 'Fasores, potência ativa/reativa e correção de fator de potência em português.',
        youtubeId: '3GX9QUyuy68',
        url: 'https://www.youtube.com/watch?v=3GX9QUyuy68',
        platform: 'UNIVESP',
      },
      {
        id: 'vid-circ-ocw',
        title: 'MIT OCW 6.002 — Circuits and Electronics',
        channel: 'MIT OpenCourseWare',
        language: 'EN',
        duration: 'Curso completo',
        whyWatch: 'Base clássica de Thévenin, Norton e resposta natural/forçada de segunda ordem.',
        url: 'https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/',
        platform: 'MIT OCW',
      },
    ],
    books: [
      {
        citation: 'NILSSON, J. W.; RIEDEL, S. A. Circuitos Elétricos. Pearson.',
        chapters: 'Caps. 4, 8, 10, 11 e 13 (Thévenin, RLC, Potência CA, Trifásicos e Laplace)',
        focusNote: 'Livro mais utilizado nas engenharias paulistas (UNIP/USP/Unicamp).',
      },
      {
        citation: 'SADIKU, M. N. O.; ALEXANDER, C. K. Fundamentos de Circuitos Elétricos. McGraw-Hill.',
        chapters: 'Caps. 11 e 12 (Análise de Potência CA e Circuitos Polifásicos)',
        focusNote: 'Ótimos problemas de correção de FP e dois wattímetros.',
      },
    ],
  },
  {
    id: 'e-mach-mit',
    code: 'ELE-03',
    title: 'Transformadores e Motores de Indução Trifásicos (Escorregamento e Kloss)',
    englishSubtitle: 'Transformers & 3-Phase Induction Motors (Slip & Kloss Torque)',
    macroArea: 'ele',
    planetId: 'eletro-circuitos',
    copyAbility: 'spark',
    unipOrigin: 'Máquinas Elétricas / Conversão Eletromecânica (UNIP)',
    petrobrasAllocation: 'Bloco I — Elétrica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Transpetro, Eletrobras, EPE, Marinha',
    bloomLevel: 'Análise / Cálculo',
    incidence: 'Crítica (Alta)',
    norms: ['ABNT NBR 17094 (Máquinas Elétricas Girantes)', 'IEEE Std 112'],
    estimatedStudyMinutes: 95,
    summary:
      'Circuito equivalente e regulação de tensão de transformadores (ensaios a vazio e curto-circuito), fluxo de potência no MIT, escorregamento s, Equação de Kloss e variação de s_max vs. invariância de T_max.',
    interactiveDiagram: 'mit-kloss-torque',
    compendium: [
      {
        id: 'trafo-mit-kloss',
        title: '1. Transformadores Reais e Motor de Indução Trifásico (MIT)',
        levelTag: 'Altíssima Frequência em Provas Petrobras',
        contentMarkdown: `No **transformador real**, o **ensaio a vazio** (tensão nominal no lado BT, AT aberto) mede as perdas no núcleo (histerese + Foucault) e determina o ramo de magnetização ($R_c, X_m$). O **ensaio de curto-circuito** (corrente nominal com tensão reduzida ~5%) mede as perdas ôhmicas no cobre e a impedância série equivalente ($R_{eq}, X_{eq}$). A regulação de tensão pode ser **negativa** quando a carga é **capacitiva**.

No **Motor de Indução Trifásico (MIT)**, o campo girante roda a $n_s = 120 f_e / P$. Com rotor girando a $n_m$, define-se o escorregamento $s = (n_s - n_m)/n_s$. A resistência elétrica aparente do rotor divide-se na perda Joule real $R'_2$ e na carga mecânica convertida $R'_2(1-s)/s$. Logo, as perdas no cobre do rotor valem exatamente **$P_{cu,r} = s \\cdot P_{gap}$** e a potência mecânica convertida vale **$P_{conv} = (1-s) P_{gap}$**!

Pela **Equação de Kloss**, aumentar a resistência rotórica $R'_2$ (em motores de rotor bobinado) eleva proporcionalmente o escorregamento crítico $s_{max}$, **sem alterar o conjugado máximo $T_{max}$**!`,
        keyEquations: [
          {
            label: 'Regulação de Tensão Aproximada do Transformador',
            latex: String.raw`\text{Reg (\%)} \approx \frac{R_{eq} I_2 \cos\theta_2 \pm X_{eq} I_2 \sin\theta_2}{V_2} \times 100\quad (+ \text{ indutiva},\ - \text{ capacitiva})`,
          },
          {
            label: 'Equação de Kloss (Torque Eletromecânico do MIT)',
            latex: String.raw`T_{ind} = \frac{3}{\omega_s} \frac{V_{th}^2 \left( \frac{R'_2}{s} \right)}{\left( R_{th} + \frac{R'_2}{s} \right)^2 + (X_{th} + X'_2)^2}, \qquad s = \frac{n_s - n_m}{n_s}`,
          },
          {
            label: 'Escorregamento Crítico e Torque de Ruptura (Pull-out)',
            latex: String.raw`s_{max} = \frac{R'_2}{\sqrt{R_{th}^2 + (X_{th} + X'_2)^2}}, \qquad T_{max} = \frac{3 V_{th}^2}{2 \omega_s \left( R_{th} + \sqrt{R_{th}^2 + (X_{th} + X'_2)^2} \right)}`,
          },
        ],
        examPitfalls: [
          'Eficiência máxima do transformador ocorre quando as perdas variáveis no cobre igualam as perdas fixas no núcleo: P_cu = P_nucleo!',
          'Na partida estrela-triângulo (Y-Δ) de um MIT, a corrente de linha da rede e o conjugado de partida caem para EXATAMENTE 1/3 (33,3%) dos valores em partida direta!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-mit-1',
        title: 'How does an Induction Motor work?',
        channel: 'Sabin Civil Engineering (Lesics)',
        language: 'EN',
        duration: '8 min',
        whyWatch: 'Animação 3D perfeita do campo girante no estator e correntes induzidas na gaiola de esquilo.',
        youtubeId: 'AQqyGNOP_3o',
        url: 'https://www.youtube.com/watch?v=AQqyGNOP_3o',
        platform: 'YouTube',
      },
      {
        id: 'vid-trafo-1',
        title: 'Transformers Explained — How Transformers Work',
        channel: 'The Engineering Mindset',
        language: 'EN',
        duration: '12 min',
        whyWatch: 'Histerese, correntes parasitas (Foucault), relação de transformação e perdas.',
        youtubeId: 'jcY4QN7awEc',
        url: 'https://www.youtube.com/watch?v=jcY4QN7awEc',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'CHAPMAN, S. J. Fundamentos de Máquinas Elétricas. McGraw-Hill.',
        chapters: 'Caps. 2 e 7 (Transformadores e Motores de Indução)',
        focusNote: 'Melhor didática para relação P_gap, P_cu,r = s·P_gap e circuito de Thévenin do MIT.',
      },
      {
        citation: 'FITZGERALD, A. E.; KINGSLEY, C.; UMANS, S. D. Máquinas Elétricas. Bookman.',
        chapters: 'Caps. 2 e 6',
        focusNote: 'Referência acadêmica rigorosa citada pela Cesgranrio.',
      },
    ],
  },
  {
    id: 'e-mach-sync',
    code: 'ELE-04',
    title: 'Geradores Síncronos (Fasores, Curvas de Capacidade e Ângulo de Carga)',
    englishSubtitle: 'Synchronous Generators: Phasor Diagrams, Capability Curves & Power Angle',
    macroArea: 'ele',
    planetId: 'eletro-circuitos',
    copyAbility: 'spark',
    unipOrigin: 'Máquinas Elétricas II (UNIP)',
    petrobrasAllocation: 'Bloco I — Elétrica (Alta Incidência)',
    generalConcursosRelevance: 'Petrobras (Turbogeradores FPSO), Eletrobras, EPE, BNDES',
    bloomLevel: 'Análise / Avaliação',
    incidence: 'Alta',
    norms: ['IEEE Std C50.12 / C50.13 (Turbogeradores Síncronos)'],
    estimatedStudyMinutes: 80,
    summary:
      'Modelagem fasorial de máquina síncrona de polos lisos e salientes, potência ativa vs. ângulo de carga δ, controle de reativos via corrente de campo I_f (curvas V) e limites térmicos na curva de capacidade.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'sync-gen-reactive',
        title: '1. Controle Independente de P (Turbina) e Q (Excitação de Campo)',
        levelTag: 'Operação de Turbogeradores em Refinarias e Plataformas',
        contentMarkdown: `Em um gerador síncrono conectado a um barramento infinito ($V_t$ e $f$ constantes):
- **Potência Ativa $P$** é controlada pelo **torque mecânico da turbina motriz** (governador de velocidade), variando o ângulo de carga $\\delta$. O limite teórico estático em polos lisos ocorre em $\\delta = 90^\\circ$.
- **Potência Reativa $Q$** é controlada pela **corrente contínua de excitação de campo $I_f$** (regulador automático de tensão - AVR):
  - **Sobre-excitado ($|E_f|\\cos\\delta > V_t$):** o gerador **fornece** potência reativa indutiva ao barramento ($Q > 0$, operando em FP atrasado como gerador ou capacitivo como compensador síncrono!).
  - **Sub-excitado ($|E_f|\\cos\\delta < V_t$):** o gerador **absorve** reativos da rede ($Q < 0$), reduzindo a margem de estabilidade e aumentando o aquecimento na região das cabeças de bobina do estator (limite de subexcitação na curva de capacidade).`,
        keyEquations: [
          {
            label: 'Equação de Potência Ativa e Reativa (Polos Lisos, R_a ≈ 0)',
            latex: String.raw`P = \frac{3 |E_f| |V_t|}{X_s} \sin(\delta), \qquad Q = \frac{3 |V_t|}{X_s} \left( |E_f| \cos\delta - |V_t| \right)`,
          },
          {
            label: 'Potência com Saliência Magnética (Polos Salientes, X_d ≠ X_q)',
            latex: String.raw`P = \frac{3 |E_f| |V_t|}{X_d} \sin\delta + \frac{3 |V_t|^2}{2} \left( \frac{1}{X_q} - \frac{1}{X_d} \right) \sin(2\delta)`,
          },
        ],
        examPitfalls: [
          'Cebraspe frequentemente troca: "Para aumentar a potência ativa fornecida por um gerador síncrono em paralelo com barramento infinito, basta aumentar a corrente de excitação I_f" — ERRADO! Aumentar I_f altera Q (fator de potência), não P (a potência ativa P é ditada pelo vapor/gás na turbina!).',
          'Em condição de sincronização em paralelo (sincronoscópio): mesma sequência de fases, mesma frequência, mesma tensão eficaz e ângulo de fase nulo.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-sync-1',
        title: 'Synchronous Alternator Working Principle (3-Phase AC Generation)',
        channel: 'Electrical Simplified4U',
        language: 'EN',
        duration: '10 min',
        whyWatch: 'Construção física de rotor liso vs. polos salientes e relação de frequência f = PN/120.',
        youtubeId: 'PeQT15AeC98',
        url: 'https://www.youtube.com/watch?v=PeQT15AeC98',
        platform: 'YouTube',
      },
      {
        id: 'vid-sync-2',
        title: 'Synchronous Generator Explained (Excitação e Paralelismo)',
        channel: 'PCB MIND',
        language: 'EN',
        duration: '9 min',
        whyWatch: 'Relaciona diretamente corrente de campo, fluxo de reativos e diagrama fasorial.',
        youtubeId: 'jb1NuJKKons',
        url: 'https://www.youtube.com/watch?v=jb1NuJKKons',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'CHAPMAN, S. J. Fundamentos de Máquinas Elétricas. McGraw-Hill.',
        chapters: 'Cap. 4 (Geradores Síncronos)',
        focusNote: 'Excelente exposição de curvas de capacidade e paralelismo.',
      },
    ],
  },
  {
    id: 'e-sep-fortescue',
    code: 'ELE-05',
    title: 'Valores p.u., Componentes Simétricas de Fortescue e Curto-Circuito Assimétrico',
    englishSubtitle: 'Per-Unit System, Fortescue Symmetrical Components & Unbalanced Faults',
    macroArea: 'ele',
    planetId: 'potencia-protecao',
    copyAbility: 'plasma',
    unipOrigin: 'Sistemas Elétricos de Potência — SEP (UNIP)',
    petrobrasAllocation: 'Bloco I — Elétrica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Eletrobras, ONS, EPE, BNDES',
    bloomLevel: 'Aplicação / Cálculo',
    incidence: 'Crítica (Alta)',
    norms: ['IEC 60909 (Short-Circuit Currents in 3-Phase AC Systems)', 'IEEE 551'],
    estimatedStudyMinutes: 95,
    summary:
      'Mudança de base em p.u., matriz modal de Fortescue (operador a = 1∠120°), diagramas de sequência zero em transformadores Y-Δ, e equações exatas de curto-circuito 3φ, 1φ-terra, 2φ e 2φ-terra.',
    interactiveDiagram: 'fortescue-faults',
    compendium: [
      {
        id: 'pu-fortescue-faults',
        title: '1. Sistema Por Unidade (p.u.) e Faltas Assimétricas via Fortescue',
        levelTag: 'Questão Clássica de SEP na Cesgranrio & Cebraspe',
        contentMarkdown: `A notação **p.u.** elimina fatores $\\sqrt{3}$ e relações de transformação ideais. Quando mudamos as grandezas de base de uma impedância nominal, o expoente da razão de tensões é **quadrático** e o das potências é **linear**.

Pelo **Teorema de Fortescue**, qualquer trio fasorial desequilibrado decompõe-se em sequência positiva ($1$), negativa ($2$) e zero ($0$) mediante o operador $a = e^{j120^\\circ}$. Em equipamentos simétricos, as três redes desacoplam-se e conectam-se nos terminais do defeito conforme a topologia da falta:
- **Trifásica ($3\\phi$):** apenas sequência positiva ($I_{cc,3\\phi} = V_f / Z_1$).
- **Monofásica Fase-Terra ($a\\text{-}g$):** três redes em **série** ($I_{a0} = I_{a1} = I_{a2}$), logo $I_{cc,1\\phi} = \\frac{3 V_f}{Z_1 + Z_2 + Z_0 + 3Z_f}$. Observe o fenômeno famoso de prova: **quando $Z_0 < Z_1$ (comum perto de geradores solidamente aterrados ou transformadores $\\Delta/Y_g$), a corrente de curto monofásica SUPERA a trifásica!**
- **Bifásica ($b\\text{-}c$):** positiva e negativa em **paralelo**, sequência zero aberta ($I_{a0} = 0$).`,
        keyEquations: [
          {
            label: 'Mudança de Base em Por Unidade (p.u.)',
            latex: String.raw`Z_{pu}^{novo} = Z_{pu}^{velho} \times \left( \frac{V_{base}^{velho}}{V_{base}^{novo}} \right)^2 \times \left( \frac{S_{base}^{novo}}{S_{base}^{velho}} \right)`,
          },
          {
            label: 'Transformação de Fortescue (a = 1∠120°)',
            latex: String.raw`\begin{bmatrix} \mathbf{A}_a \\ \mathbf{A}_b \\ \mathbf{A}_c \end{bmatrix} = \begin{bmatrix} 1 & 1 & 1 \\ 1 & a^2 & a \\ 1 & a & a^2 \end{bmatrix} \begin{bmatrix} \mathbf{A}_{a0} \\ \mathbf{A}_{a1} \\ \mathbf{A}_{a2} \end{bmatrix}, \qquad \mathbf{A}_{012} = \frac{1}{3} \begin{bmatrix} 1 & 1 & 1 \\ 1 & a & a^2 \\ 1 & a^2 & a \end{bmatrix} \mathbf{A}_{abc}`,
          },
          {
            label: 'Faltas Fase-Terra (1φ-g) e Bifásica-Terra (2φ-g)',
            latex: String.raw`I_{cc,1\phi} = \frac{3 V_f}{Z_1 + Z_2 + Z_0 + 3Z_f}, \qquad \mathbf{I}_{a1,2\phi g} = \frac{V_f}{Z_1 + \frac{Z_2 (Z_0 + 3Z_f)}{Z_2 + Z_0 + 3Z_f}}`,
          },
        ],
        examPitfalls: [
          'Cuidado com a impedância de aterramento Z_n ou de falta Z_f para a terra: na rede de sequência zero ela entra multiplicada por 3 (3 Z_n ou 3 Z_f)!',
          'Em transformadores Δ / Y solidamente aterrado (Dy), correntes de sequência zero circulam no lado Y aterrado e fecham em loop dentro do Δ, bloqueando a passagem para o sistema a montante do Δ!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-fort-1',
        title: 'Symmetrical Components | What Is 3-Phase Power? -- Part 4',
        channel: 'MATLAB (MathWorks)',
        language: 'EN',
        duration: '11 min',
        whyWatch: 'Animação vetorial impecável mostrando como soma de sequências 0, + e − gera qualquer assimetria.',
        youtubeId: 'M2w2f2liX3g',
        url: 'https://www.youtube.com/watch?v=M2w2f2liX3g',
        platform: 'YouTube',
      },
      {
        id: 'vid-fort-2',
        title: 'Power System Analysis — Symmetrical Components Lecture',
        channel: 'Worawat Nakawiro',
        language: 'EN',
        duration: '26 min',
        whyWatch: 'Passo a passo algébrico da conexão de redes de sequência em faltas.',
        youtubeId: 'l7DPpjvwNEU',
        url: 'https://www.youtube.com/watch?v=l7DPpjvwNEU',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'GRAINGER, J. J.; STEVENSON JR., W. D. Análise de Sistemas de Potência. McGraw-Hill.',
        chapters: 'Caps. 1, 11 e 12 (Valores p.u., Componentes Simétricas e Faltas Assimétricas)',
        focusNote: 'Texto canônico de SEP em todos os concursos brasileiros.',
      },
      {
        citation: 'MONTICELLI, A.; GARCIA, A. Introdução a Sistemas de Energia Elétrica. Unicamp.',
        chapters: 'Curto-Circuito e Fluxo de Carga',
        focusNote: 'Excelente síntese brasileira.',
      },
    ],
  },
  {
    id: 'e-sep-lines',
    code: 'ELE-06',
    title: 'Parâmetros de Linhas de Transmissão (Modelos π e T, Efeito Ferranti e SIL)',
    englishSubtitle: 'Transmission Lines: π/T Models, Ferranti Effect & Surge Impedance Loading',
    macroArea: 'ele',
    planetId: 'potencia-protecao',
    copyAbility: 'plasma',
    unipOrigin: 'Sistemas de Potência / Transmissão (UNIP)',
    petrobrasAllocation: 'Bloco II — Elétrica (Média-Alta)',
    generalConcursosRelevance: 'Petrobras, Eletrobras, ONS, EPE, Chesf/Furnas',
    bloomLevel: 'Análise / Cálculo',
    incidence: 'Média-Alta',
    norms: ['ABNT NBR 5422 (Projeto de Linhas Aéreas)'],
    estimatedStudyMinutes: 75,
    summary:
      'Classificação de linhas (curta, média π/T, longa hiperbólica), parâmetros A,B,C,D de quadripolos, Impedância Característica (Z_c) e Potência Natural (SIL), e sobretensão em vazio pelo Efeito Ferranti.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'lines-ferranti-sil',
        title: '1. Modelos π/T, Efeito Ferranti e Surge Impedance Loading (SIL)',
        levelTag: 'Transmissão & Linhas Longas',
        contentMarkdown: `Linhas de transmissão são modeladas por quadripolos $\\begin{bmatrix} V_S \\\\ I_S \\end{bmatrix} = \\begin{bmatrix} A & B \\\\ C & D \\end{bmatrix} \\begin{bmatrix} V_R \\\\ I_R \\end{bmatrix}$ com reciprocidade $AD - BC = 1$.

- **Linha Curta ($< 80\\text{ km}$):** despreza-se a capacitância shunt ($A=D=1, C=0, B=Z$).
- **Linha Média ($80\\text{ a }240\\text{ km}$):** Modelo $\\pi$ nominal concentra $Y/2$ em cada extremidade ($A = D = 1 + ZY/2$).
- **Efeito Ferranti:** em linhas médias/longas operando **em vazio ou com carga muito leve**, a corrente capacitiva circulando pela reatância indutiva série provoca **elevação de tensão no terminal receptor** ($|V_R| > |V_S|$)! Quanto maior o comprimento, maior o efeito, exigindo **reatores shunt** de compensação.
- **Potência Natural (SIL):** quando a linha é carregada exatamente na sua impedância característica $Z_c = \\sqrt{L/C}$, os reativos gerados pela capacitância equilibram exatamente os reativos consumidos pela indutância ($Q_C = Q_L$), mantendo perfil de tensão plano!`,
        keyEquations: [
          {
            label: 'Modelo π Nominal (Constantes Generalizadas ABCD)',
            latex: String.raw`A = D = 1 + \frac{Z Y}{2}, \qquad B = Z, \qquad C = Y \left( 1 + \frac{Z Y}{4} \right)`,
          },
          {
            label: 'Impedância Característica e SIL (Potência Natural)',
            latex: String.raw`Z_c = \sqrt{\frac{L}{C}}, \qquad \text{SIL} = \frac{V_L^2}{Z_c}`,
          },
        ],
        examPitfalls: [
          'Cebraspe: "A instalação de bancos de capacitores em paralelo no terminal receptor corrige o Efeito Ferranti" — ERRADO! Capacitores AGRAVAM a sobretensão! O correto são REATORES indutivos em derivação (shunt)!',
          'SIL varia com o QUADRADO da tensão nominal: dobrar a tensão da linha quadruplica a capacidade natural de transmissão!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-ferr-1',
        title: 'What is the Ferranti Effect in Transmission Line?',
        channel: 'MD Quick Study',
        language: 'EN',
        duration: '8 min',
        whyWatch: 'Demonstração fasorial e matemática usando modelo π nominal e queda I_c·jX_L.',
        youtubeId: '2LU7EY5YRFY',
        url: 'https://www.youtube.com/watch?v=2LU7EY5YRFY',
        platform: 'YouTube',
      },
      {
        id: 'vid-ferr-2',
        title: 'Ferranti Effect Explained Visually',
        channel: 'Electrology',
        language: 'EN',
        duration: '4 min',
        whyWatch: 'Revisão rápida da causa física da elevação de tensão no receptor.',
        youtubeId: 'SQjug_x0C4A',
        url: 'https://www.youtube.com/watch?v=SQjug_x0C4A',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'GRAINGER, J. J.; STEVENSON JR., W. D. Análise de Sistemas de Potência. McGraw-Hill.',
        chapters: 'Caps. 4, 5 e 6 (Parâmetros de Linhas e Modelos de Transmissão)',
        focusNote: 'Dedução das equações hiperbólicas e SIL.',
      },
    ],
  },
  {
    id: 'e-prot-nr10',
    code: 'ELE-07',
    title: 'Esquemas de Aterramento (TN, TT, IT), Relés ANSI (50/51, 87, 21) e NR-10 / NBR 5410',
    englishSubtitle: 'Grounding (TN/TT/IT), Protective Relays (50/51, 87, 21) & NR-10/NBR 5410',
    macroArea: 'ele',
    planetId: 'potencia-protecao',
    copyAbility: 'plasma',
    unipOrigin: 'Instalações Elétricas Industriais & Proteção (UNIP + Normas)',
    petrobrasAllocation: 'Bloco II — Elétrica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Transpetro, Eletrobras, Engenharia de Segurança, Vunesp',
    bloomLevel: 'Avaliação / Aplicação',
    incidence: 'Crítica (Alta)',
    norms: ['ABNT NBR 5410', 'ABNT NBR 14039', 'NR-10', 'ANSI/IEEE C37.2'],
    estimatedStudyMinutes: 90,
    summary:
      'Esquemas de aterramento TN-S/TN-C/TN-C-S, TT (DR obrigatório) e IT (continuidade na 1ª falta + DSI, curto bifásico na 2ª falta), curvas de relés 50/51, diferencial 87, distância 21 e zonas de risco NR-10.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'grounding-relays-nr10',
        title: '1. Esquemas de Aterramento, Relés ANSI e Segurança NR-10',
        levelTag: 'Gap Crítico UNIP → Questão Certa na Petrobras',
        contentMarkdown: `A **ABNT NBR 5410** define três famílias de esquemas de aterramento (1ª letra = alimentação; 2ª letra = massas):
- **Esquema TN:** neutro da fonte aterrado e massas ligadas a ele pelo condutor PE. No **TN-C**, neutro e proteção combinam-se num único condutor **PEN** — **PROIBIDO** em seções menores que $10\\text{ mm}^2$ (Cu) ou $16\\text{ mm}^2$ (Al), em circuitos portáteis ou em **áreas classificadas explosivas**!
- **Esquema TT:** fonte e massas em eletrodos independentes; impedância alta exige **Dispositivo DR** obrigatório contra contatos indiretos.
- **Esquema IT:** fonte isolada da terra ou aterrada por alta impedância ($\\ge 1000\\,\\Omega$). Na **primeira falta** fase-massa, não desarma (garantindo continuidade operacional em refinarias/hospitais!), apenas aciona alarme via **DSI**. Uma **segunda falta** em outra fase cria um **curto-circuito bifásico**, exigindo desarme imediato!

Na proteção ANSI/IEEE C37.2: **50** (sobrecorrente instantânea), **51** (sobrecorrente temporizada inversa), **87** (diferencial percentual para transformadores/geradores/barramentos) e **21** (distância por impedância $Z = V/I$ para linhas de transmissão).`,
        keyEquations: [
          {
            label: 'Curva de Tempo Inverso de Relé 51 (IEC 60255 / IEEE C37.112)',
            latex: String.raw`t(M) = TD \left( \frac{A}{M^p - 1} + B \right), \qquad M = \frac{I}{I_{pickup}}`,
          },
          {
            label: 'Critério Térmico de Curto-Circuito em Condutores (NBR 5410)',
            latex: String.raw`I^2 t \le k^2 S^2`,
          },
        ],
        examPitfalls: [
          'Na NR-10: Baixa Tensão é até 1000 V em CA ou 1500 V em CC! Alta Tensão é > 1000 V CA ou > 1500 V CC.',
          'Diferença NR-10 entre Zona de Risco e Zona Controlada: aproximação na Zona de Risco exige autorização e EPI/EPC específicos de trabalho energizado ou desenergização completa (6 passos obrigatórios: seccionamento, impedimento de reenergização, constatação de ausência de tensão, aterramento temporário com equipotencialização, proteção de elementos energizados na zona controlada, sinalização).',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-gnd-1',
        title: 'Diferença entre os Sistemas de Aterramento TN, TT e IT (NBR 5410)',
        channel: 'Engenheiro Eletrizante',
        language: 'PT-BR',
        duration: '12 min',
        whyWatch: 'Comparação visual clara dos caminhos de corrente de falta em TN-S, TN-C, TT e IT.',
        youtubeId: '_qp8KsPlyZs',
        url: 'https://www.youtube.com/watch?v=_qp8KsPlyZs',
        platform: 'YouTube',
      },
      {
        id: 'vid-rel-1',
        title: 'Qual a diferença entre Proteção ANSI 50 e 51?',
        channel: 'Mesh Engenharia',
        language: 'PT-BR',
        duration: '10 min',
        whyWatch: 'Seletividade, curvas inversas, dial de tempo TD e pickup em subestações industriais.',
        youtubeId: 'OX15E5h5cwU',
        url: 'https://www.youtube.com/watch?v=OX15E5h5cwU',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'MAMEDE FILHO, J. Instalações Elétricas Industriais. LTC.',
        chapters: 'Caps. 4, 8 e 10 (Aterramento, Subestações e Proteção Industrial)',
        focusNote: 'Bíblia das instalações industriais brasileiras.',
      },
      {
        citation: 'KINDERMANN, G. Proteção de Sistemas Elétricos de Potência. UFSC.',
        chapters: 'Funções ANSI 50/51, 21 e 87',
        focusNote: 'Base teórica perfeita para questões de proteção.',
      },
    ],
  },
  {
    id: 'e-prot-ex',
    code: 'ELE-08',
    title: 'Classificação de Áreas Explosivas (Zonas 0, 1, 2 e Proteção Ex-d, Ex-e, Ex-i)',
    englishSubtitle: 'Hazardous Areas Classification (Zones 0/1/2) & Ex Protection (Ex-d/e/i)',
    macroArea: 'ele',
    planetId: 'potencia-protecao',
    copyAbility: 'plasma',
    unipOrigin: 'Instalações em Atmosferas Explosivas (Indústria Oil & Gas)',
    petrobrasAllocation: 'Bloco II — Elétrica (Alta Incidência)',
    generalConcursosRelevance: 'Petrobras, Transpetro, Engenharia Offshore e Refino',
    bloomLevel: 'Avaliação / Conformidade',
    incidence: 'Alta',
    norms: ['ABNT NBR IEC 60079-10-1 / 60079-0', 'Portaria INMETRO 115', 'NR-10 / NR-20'],
    estimatedStudyMinutes: 70,
    summary:
      'Classificação de atmosferas gasosas (Zonas 0, 1 e 2) vs. poeiras combustíveis (Zonas 20, 21, 22), grupos de gases (IIA, IIB, IIC = H₂/acetileno), classes de temperatura T1–T6 e modos de proteção Ex-d, Ex-e, Ex-p e Ex-i (ia/ib/ic).',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'ex-zones-protection',
        title: '1. Zonas de Risco, Grupos de Gases e Tipos de Proteção Ex',
        levelTag: 'Exclusividade Oil & Gas — Muito Cobrado na Petrobras',
        contentMarkdown: `Conforme a **ABNT NBR IEC 60079**, regiões com mistura inflamável de gases/vapores classificam-se pela probabilidade/duração de presença da atmosfera explosiva:
- **Zona 0:** atmosfera presente **continuamente** ou por longos períodos (ex.: interior de tanques de teto fixo e vasos separadores).
- **Zona 1:** provável em operação **normal** (ex.: proximidades de selos mecânicos de bombas, válvulas de alívio, bocais de carregamento).
- **Zona 2:** improvável em operação normal; se ocorrer, persiste apenas por **curtos períodos** (ex.: vazamento acidental de flange).

**Principais Modos de Proteção:**
- **Ex-d (Invólucro à Prova de Explosão):** suporta explosão *interna* sem romper e resfria os gases nos interstícios da tampa para não ignificar a atmosfera externa (aceito em **Zonas 1 e 2**).
- **Ex-e (Segurança Aumentada):** evita arcos, centelhas e pontos quentes em condições normais (caixas de junção, bornes — aceito em **Zonas 1 e 2**).
- **Ex-i (Segurança Intrínseca):** limita energia elétrica e térmica abaixo da energia mínima de ignição (barreiras Zener/galvânicas). Nível **Ex-ia** (tolera 2 falhas simultâneas) é o clássico aprovado para **Zona 0**!`,
        keyEquations: [
          {
            label: 'Hierarquia de Níveis de Proteção de Equipamento (EPL)',
            latex: String.raw`\text{Zona 0} \to \text{EPL Ga (Ex-ia)}, \quad \text{Zona 1} \to \text{EPL Gb (Ex-d, Ex-e, Ex-ib)}, \quad \text{Zona 2} \to \text{EPL Gc (Ex-n)}`,
          },
        ],
        examPitfalls: [
          'Grupo IIC engloba os gases MAIS críticos/energéticos (Hidrogênio e Acetileno); Grupo IIA engloba propano/metano (menor energia de ignição no IIC exige equipamentos mais rigorosos!).',
          'Classe de Temperatura T6 significa temperatura máxima superficial de apenas 85 °C (a MAIS segura/rigorosa!), enquanto T1 permite até 450 °C!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-ex-1',
        title: 'Segurança em Atmosferas Explosivas — O que é Área Classificada?',
        channel: 'Nobili Engenharia',
        language: 'PT-BR',
        duration: '12 min',
        whyWatch: 'Explica Zonas 0, 1, 2, triângulo da explosão e diferenças entre Ex-d, Ex-e e Ex-i.',
        youtubeId: 'cxH34nKFHA4',
        url: 'https://www.youtube.com/watch?v=cxH34nKFHA4',
        platform: 'YouTube',
      },
      {
        id: 'vid-ex-2',
        title: 'NR-10 Complementar SEP — Proteção em Instalações Industriais',
        channel: 'Eng. Eduardo Lioi',
        language: 'PT-BR',
        duration: '20 min',
        whyWatch: 'Contextualiza normas de segurança elétrica aplicadas ao Sistema Elétrico de Potência.',
        youtubeId: 'uZqhOdS_8oQ',
        url: 'https://www.youtube.com/watch?v=uZqhOdS_8oQ',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'ABNT NBR IEC 60079-10-1 e 60079-14 (Atmosferas Explosivas — Classificação e Projeto).',
        chapters: 'Definições de Zonas, EPL e Seleção de Equipamentos Ex',
        focusNote: 'Texto normativo cobrado literalmente em questões do Cebraspe e Cesgranrio.',
      },
    ],
  },
  {
    id: 'e-pe-converters',
    code: 'ELE-09',
    title: 'Eletrônica de Potência (Retificadores a Tiristor e Conversores Buck/Boost)',
    englishSubtitle: 'Power Electronics: Controlled Rectifiers (SCR) & DC-DC Converters',
    macroArea: 'ele',
    planetId: 'controle-eletronica-mat',
    copyAbility: 'doctor',
    unipOrigin: 'Eletrônica de Potência / Acionamentos Industriais (UNIP)',
    petrobrasAllocation: 'Bloco II — Elétrica (Alta Incidência)',
    generalConcursosRelevance: 'Petrobras, Transpetro, Eletrobras, Marinha, BNDES',
    bloomLevel: 'Análise / Projeto',
    incidence: 'Alta',
    norms: ['IEEE 519 (Harmonic Control in Power Systems)'],
    estimatedStudyMinutes: 85,
    summary:
      'Semicondutores de potência (SCR, IGBT, SiC-MOSFET), retificadores controlados monofásicos/trifásicos com ângulo de disparo α, conversores CC-CC Buck, Boost e Buck-Boost em CCM, indutância crítica e inversores VFD.',
    interactiveDiagram: 'buck-boost-pwm',
    compendium: [
      {
        id: 'rectifiers-buck-boost',
        title: '1. Retificadores Controlados e Conversores CC-CC em CCM',
        levelTag: 'UPS, Inversores VFD & Acionamentos Offshore',
        contentMarkdown: `Nos sistemas UPS industriais e inversores de frequência (VFD) que acionam bombas centrífugas e compressores na Petrobras, retificadores controlados convertem CA em CC regulada pelo ângulo de disparo $\\alpha$, e estágios CC-CC ou inversores PWM sintetizam tensão/frequência variáveis.

Em **Condução Contínua (CCM)**, o balanço volt-segundo no indutor ($\langle v_L \\rangle = 0$ em regime permanente) determina exatamente o ganho estático em função do ciclo de trabalho $D = t_{on} / T_s$:
- **Buck (Abaiador):** $V_{out} = D\\,V_{in}$ (corrente contínua na saída, pulsante na entrada).
- **Boost (Elevador):** $V_{out} = \\frac{V_{in}}{1 - D}$ (corrente contínua na entrada, tensão de saída sempre $\\ge V_{in}$).
- **Buck-Boost (Inversor):** $V_{out} = -\\frac{D}{1 - D} V_{in}$ (polaridade invertida!).`,
        keyEquations: [
          {
            label: 'Tensão Média — Retificadores Controlados em Condução Contínua',
            latex: String.raw`V_{cc,1\phi\text{ ponte}} = \frac{2 V_m}{\pi} \cos\alpha, \qquad V_{cc,3\phi\text{ 6-pulsos}} = \frac{3 \sqrt{2} V_L}{\pi} \cos\alpha`,
          },
          {
            label: 'Conversores CC-CC Chaveados em CCM (Duty Cycle D)',
            latex: String.raw`V_{Buck} = D V_{in}, \qquad V_{Boost} = \frac{V_{in}}{1 - D}, \qquad V_{Buck\text{-}Boost} = -\frac{D}{1 - D} V_{in}`,
          },
          {
            label: 'Ondulação de Corrente no Indutor (Buck) e Indutância Crítica',
            latex: String.raw`\Delta I_L = \frac{(V_{in} - V_{out}) D T_s}{L}, \qquad L_{crit,Buck} = \frac{(1 - D) R}{2 f_s}`,
          },
        ],
        examPitfalls: [
          'Em retificadores totalmente controlados com carga altamente indutiva em condução contínua, para α > 90°, cos(α) fica NEGATIVO (V_cc < 0) e a ponte passa a operar como INVERSOR NÃO-AUTÔNOMO (devolvendo energia da carga à rede CA)!',
          'Em conversores Boost reais, por causa da resistência série do indutor (R_L), o ganho prático cai drasticamente quando D > 0,85, não tendendo a infinito!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-pe-1',
        title: 'Buck Converter — Step Down DC Voltage Efficiently',
        channel: 'GreatScott!',
        language: 'EN',
        duration: '9 min',
        whyWatch: 'Mostra forma de onda no indutor, diodo de roda livre, capacitor e cálculo do duty cycle.',
        youtubeId: 'm8rK9gU30v4',
        url: 'https://www.youtube.com/watch?v=m8rK9gU30v4',
        platform: 'YouTube',
      },
      {
        id: 'vid-pe-2',
        title: 'Boost Converter — Step Up DC Voltage Efficiently',
        channel: 'GreatScott!',
        language: 'EN',
        duration: '10 min',
        whyWatch: 'Explica armazenamento de energia magnética no indutor e ganho 1/(1−D).',
        youtubeId: 'QnUhjnbZ0T8',
        url: 'https://www.youtube.com/watch?v=QnUhjnbZ0T8',
        platform: 'YouTube',
      },
      {
        id: 'vid-pe-3',
        title: 'Buck/Boost Converter Topology Explained',
        channel: 'GreatScott!',
        language: 'EN',
        duration: '9 min',
        whyWatch: 'Completa as 3 topologias clássicas de provas.',
        youtubeId: 'ZiD_X-uo_TQ',
        url: 'https://www.youtube.com/watch?v=ZiD_X-uo_TQ',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'RASHID, M. H. Eletrônica de Potência: Circuitos, Dispositivos e Aplicações. Pearson.',
        chapters: 'Caps. 5, 10 e 12 (Retificadores Controlados e Conversores CC-CC)',
        focusNote: 'Livro mais citado em editais brasileiros.',
      },
      {
        citation: 'ERICKSON, R. W.; MAKSIMOVIC, D. Fundamentals of Power Electronics. Springer.',
        chapters: 'Caps. 2 e 3 (Steady-State Equivalent Circuit Modeling)',
        focusNote: 'Excelência técnica no balanço volt-segundo e ampère-segundo.',
      },
    ],
  },
  {
    id: 'e-ctrl-freq',
    code: 'ELE-10',
    title: 'Teoria de Controle (Bode, Nyquist, Espaço de Estados, Routh-Hurwitz e PID)',
    englishSubtitle: 'Control Systems: Bode, Nyquist, State-Space, Routh-Hurwitz & PID',
    macroArea: 'ele',
    planetId: 'controle-eletronica-mat',
    copyAbility: 'doctor',
    unipOrigin: 'Sistemas de Controle / Automação Industrial (UNIP)',
    petrobrasAllocation: 'Bloco III — Elétrica & Automação (Alta Incidência)',
    generalConcursosRelevance: 'Petrobras, Transpetro, EPE, Marinha, Embraer',
    bloomLevel: 'Análise / Síntese',
    incidence: 'Alta',
    norms: ['ISA-5.1 (Instrumentação e Controle de Processos)'],
    estimatedStudyMinutes: 90,
    summary:
      'Representação matricial em Espaço de Estados (A, B, C, D) -> G(s), Critério Algébrico de Routh-Hurwitz, traçado assintótico e margens de estabilidade em Bode (MG e MF), Critério de Nyquist e sintonia PID.',
    interactiveDiagram: 'bode-margins',
    compendium: [
      {
        id: 'control-state-bode-routh',
        title: '1. Espaço de Estados, Routh-Hurwitz, Bode, Nyquist e PID',
        levelTag: 'Controle de Processos & Turbomáquinas',
        contentMarkdown: `Na engenharia moderna de controle (controle de nível em separadores, pressão em dutos e velocidade de turbinas), um sistema linear invariante no tempo (LTI) pode ser modelado no **domínio da frequência** $G(s)$ ou em **espaço de estados** $(\\mathbf{A}, \\mathbf{B}, \\mathbf{C}, \\mathbf{D})$.

- **Routh-Hurwitz:** condição necessária (todos os coeficientes positivos) e suficiente (nenhuma troca de sinal na 1ª coluna da tabela de Routh) para que todos os polos da malha fechada estejam no semiplano esquerdo aberto (estabilidade BIBO).
- **Diagrama de Bode & Margens:**
  - $\\omega_\\pi$ (cruzamento de fase): $\\angle G(j\\omega_\\pi) = -180^\\circ \\implies MG_{dB} = -20\\log_{10}|G(j\\omega_\\pi)|$.
  - $\\omega_g$ (cruzamento de ganho): $|G(j\\omega_g)| = 1\\ (0\\text{ dB}) \\implies MF = 180^\\circ + \\angle G(j\\omega_g)$.
- **Controlador PID:** Termo **P** reduz erro estacionário e acelera subida (mas aumenta overshoot); **I** adiciona polo na origem (zera erro para degrau, porém reduz margem de fase); **D** adiciona zero (antecipa erro e amortece oscilações, porém amplifica ruído de alta frequência!).`,
        keyEquations: [
          {
            label: 'Espaço de Estados e Função de Transferência',
            latex: String.raw`\mathbf{\dot{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\mathbf{u},\quad \mathbf{y} = \mathbf{C}\mathbf{x} + \mathbf{D}\mathbf{u} \implies G(s) = \mathbf{C}(s\mathbf{I} - \mathbf{A})^{-1}\mathbf{B} + \mathbf{D}`,
          },
          {
            label: 'Margens de Ganho e Fase + Controlador PID Ideal',
            latex: String.raw`MG_{dB} = -20\log_{10}|G(j\omega_\pi)|, \quad MF = 180^\circ + \angle G(j\omega_g), \quad C(s) = K_p \left(1 + \frac{1}{T_i s} + T_d s\right)`,
          },
        ],
        examPitfalls: [
          'Se um sistema tem N = P_malha_aberta + Z_encircamentos pelo Critério de Nyquist (N = Z - P no sentido horário ao redor de -1 + j0), atenção se a planta em malha aberta já possui polo no semiplano direito (P > 0): estabilidade exige N = -P (voltas no sentido ANTI-HORÁRIO)!',
          'Em sistema com atraso de transporte e^{-τs}, a magnitude |e^{-jωτ}| = 1 NÃO muda, mas a fase cai linearmente (−ωτ rad), reduzindo a Margem de Fase e desestabilizando a malha!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-ctrl-1',
        title: 'Control System Lectures — Bode Plots, Introduction',
        channel: 'Brian Douglas',
        language: 'EN',
        duration: '12 min',
        whyWatch: 'Referência mundial de controle explicando dB, décadas e esboço rápido de Bode.',
        youtubeId: '_eh1conN6YM',
        url: 'https://www.youtube.com/watch?v=_eh1conN6YM',
        platform: 'YouTube',
      },
      {
        id: 'vid-ctrl-2',
        title: 'Nyquist Stability Criterion, Part 1',
        channel: 'Brian Douglas',
        language: 'EN',
        duration: '15 min',
        whyWatch: 'Desmistifica mapeamento conforme e envoltórias no ponto −1 + j0.',
        youtubeId: 'sof3meN96MA',
        url: 'https://www.youtube.com/watch?v=sof3meN96MA',
        platform: 'YouTube',
      },
      {
        id: 'vid-ctrl-3',
        title: 'PID Control — A Brief Introduction',
        channel: 'Brian Douglas',
        language: 'EN',
        duration: '11 min',
        whyWatch: 'Intuição impecável das ações Proporcional, Integral e Derivativa.',
        youtubeId: 'UR0hOmjaHp0',
        url: 'https://www.youtube.com/watch?v=UR0hOmjaHp0',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'OGATA, K. Engenharia de Controle Moderno. 5ª ed. Pearson.',
        chapters: 'Caps. 5, 7, 8 e 9 (Routh, Bode, Nyquist, PID e Espaço de Estados)',
        focusNote: 'Obra clássica máxima de controle no Brasil.',
      },
      {
        citation: 'NISE, N. S. Engenharia de Sistemas de Controle. LTC.',
        chapters: 'Caps. 6, 10 e 12',
        focusNote: 'Excelente ponte entre funções de transferência e espaço de estados.',
      },
    ],
  },
  {
    id: 'g-math-laplace',
    code: 'MAT-01',
    title: 'Transformada de Laplace, EDOs Lineares e Cálculo Vetorial Diferencial',
    englishSubtitle: 'Laplace Transforms, Linear ODEs, Eigenvalues & Vector Calculus',
    macroArea: 'multi',
    planetId: 'controle-eletronica-mat',
    copyAbility: 'doctor',
    unipOrigin: 'Cálculo III/IV, Equações Diferenciais e Álgebra Linear (UNIP)',
    petrobrasAllocation: 'Bloco III — Multidisciplinar / Base de Mecânica & Elétrica',
    generalConcursosRelevance: 'Petrobras, Marinha CP-CEM (Peso Alto), BNDES, EPE',
    bloomLevel: 'Dedução / Cálculo',
    incidence: 'Alta',
    norms: ['Base Analítica Geral para Engenharia'],
    estimatedStudyMinutes: 80,
    summary:
      'Transformada de Laplace unilateral, Teoremas do Valor Inicial e Final, frações parciais, EDOs de 2ª ordem (super/crítico/subamortecido), autovalores e teoremas de Gauss (Divergência) e Stokes.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'laplace-ode-vector',
        title: '1. Transformada de Laplace, Valor Final e Operadores Vetoriais',
        levelTag: 'Base Transversal Mecânica + Elétrica + Marinha',
        contentMarkdown: `A **Transformada de Laplace** $\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty f(t) e^{-st}\\,dt$ converte equações diferenciais lineares com condições iniciais em equações algébricas em $s$:
- $\\mathcal{L}\\{f'(t)\\} = s F(s) - f(0^-)$ e $\\mathcal{L}\\{f''(t)\\} = s^2 F(s) - s f(0^-) - f'(0^-)$.
- **Teorema do Valor Final:** $\\lim_{t \\to \\infty} f(t) = \\lim_{s \\to 0} s F(s)$ — **VÁLIDO SOMENTE** se todos os polos de $s F(s)$ tiverem parte real estritamente negativa (sistema estável)!
- **Cálculo Vetorial:** Divergente ($\\nabla \\cdot \\mathbf{F}$ mede fontes/sumidouros e conecta fluxo pelo **Teorema de Gauss**); Rotacional ($\\nabla \\times \\mathbf{F}$ mede circulação local e conecta integrais de linha pelo **Teorema de Stokes**). Note as identidades exatas: $\\nabla \\times (\\nabla \\phi) = \\mathbf{0}$ e $\\nabla \\cdot (\\nabla \\times \\mathbf{A}) = 0$.`,
        keyEquations: [
          {
            label: 'Pares Fundamentais e Teoremas Limites de Laplace',
            latex: String.raw`\mathcal{L}\{e^{-at}\} = \frac{1}{s+a}, \quad \mathcal{L}\{\sin(\omega t)\} = \frac{\omega}{s^2+\omega^2}, \quad \lim_{t \to \infty} f(t) = \lim_{s \to 0} s F(s)`,
          },
          {
            label: 'Teoremas Integrais de Gauss e Stokes',
            latex: String.raw`\iiint_V (\nabla \cdot \mathbf{F})\, dV = \oiint_{\partial V} \mathbf{F} \cdot d\mathbf{S}, \qquad \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S} = \oint_{\partial S} \mathbf{F} \cdot d\mathbf{r}`,
          },
        ],
        examPitfalls: [
          'Armadilha clássica: aplicar o Teorema do Valor Final em F(s) = ω/(s² + ω²) [seno oscilatório] dá lim s·F(s) = 0, que é FALSO porque sen(ωt) não converge — seus polos estão no eixo imaginário ±jω!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-math-1',
        title: 'But what is a Laplace Transform?',
        channel: '3Blue1Brown',
        language: 'EN',
        duration: '26 min',
        whyWatch: 'Melhor intuição visual do planeta conectando Fourier, decaimento exponencial e plano s.',
        youtubeId: 'j0wJBEZdwLs',
        url: 'https://www.youtube.com/watch?v=j0wJBEZdwLs',
        platform: 'YouTube',
      },
      {
        id: 'vid-math-2',
        title: 'Why Laplace transforms are so useful',
        channel: '3Blue1Brown',
        language: 'EN',
        duration: '20 min',
        whyWatch: 'Mostra exatamente como pólos no plano s governam estabilidade, circuitos e vibrações.',
        youtubeId: 'FE-hM1kRK4Y',
        url: 'https://www.youtube.com/watch?v=FE-hM1kRK4Y',
        platform: 'YouTube',
      },
      {
        id: 'vid-math-ocw',
        title: 'MIT OCW 18.03 — Differential Equations',
        channel: 'MIT OpenCourseWare',
        language: 'EN',
        duration: 'Curso completo',
        whyWatch: 'Material de referência MIT em EDOs, Laplace e sistemas lineares.',
        url: 'https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/',
        platform: 'MIT OCW',
      },
    ],
    books: [
      {
        citation: 'BOYCE, W. E.; DIPRIMA, R. C. Equações Diferenciais Elementares. LTC.',
        chapters: 'Cap. 6 (A Transformada de Laplace)',
        focusNote: 'Padrão UNIP e concursos de engenharia.',
      },
      {
        citation: 'STEWART, J. Cálculo — Vol. 2. Cengage.',
        chapters: 'Cap. 16 (Cálculo Vetorial: Divergente, Rotacional, Stokes e Gauss)',
        focusNote: 'Base matemática direta para Navier-Stokes e Maxwell.',
      },
    ],
  },
  {
    id: 'b-pt-cesgranrio',
    code: 'BAS-01',
    title: 'Língua Portuguesa (Coesão, Regência, Crase e Concordância — Padrão Cesgranrio/FGV)',
    englishSubtitle: 'Portuguese Grammar & Textual Cohesion (Eliminatory Block)',
    macroArea: 'basico',
    planetId: 'basicos-interdisciplinar',
    copyAbility: 'scholar',
    unipOrigin: 'Comunicação e Expressão (UNIP) + Preparatório Bancas',
    petrobrasAllocation: 'Bloco Básico Eliminatório (10 questões — Corte 50% e ≠ 0)',
    generalConcursosRelevance: 'Todos os concursos (Cesgranrio, Cebraspe, FGV, Vunesp, FCC)',
    bloomLevel: 'Análise / Aplicação',
    incidence: 'Crítica (Alta)',
    norms: ['Acordo Ortográfico da Língua Portuguesa'],
    estimatedStudyMinutes: 60,
    summary:
      'Estratégia eliminatória para engenheiros: interpretação contextual, conectivos adversativos/concessivos/conclusivos, regência e crase, concordância com "haver"/"fazer" e partículas "se" (apassivadora vs. índice de indeterminação), uso restrito de "onde".',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'pt-cesgranrio-core',
        title: '1. Os 5 Tópicos Que Decidem 85% da Prova de Português na Cesgranrio',
        levelTag: 'Bloco Básico Eliminatório (Dias Ímpares)',
        contentMarkdown: `Na Petrobras (Cesgranrio), zerar Português elimina o candidato mesmo que gabarite Engenharia! Felizmente, a banca é altamente previsível nos seguintes eixos:
1. **Valor Semântico dos Conectivos:** distinguir **adversativos** (*mas, porém, contudo, entretanto*) de **concessivos** (*embora, ainda que, conquanto, posto que* — estes exigem subjuntivo!) e **conclusivos** (*portanto, logo, destarte*).
2. **Crase (\`à\`):** ocorre apenas na fusão da preposição \`a\` com artigo/pronome feminino. **Proibida:** antes de verbo, palavra masculina, pronomes pessoais/tratamento (exceto *senhora/senhorita/dona*), palavras repetidas (*face a face*) e entre \`a\` singular e palavra plural (*a pessoas*).
3. **Partícula SE (\`VTD + se\` vs. \`VTI/VI + se\`):**
   - *Analisaram-se os laudos* (VTD + se = Partícula Apassivadora $\\to$ verbo **concorda** com o sujeito paciente *os laudos*).
   - *Precisa-se de engenheiros* (VTI + se = Índice de Indeterminação $\\to$ verbo fica **sempre na 3ª pessoa do singular**!).
4. **Verbo HAVER (existir) e FAZER (tempo):** são impessoais $\\to$ ficam sempre no singular e transmitem impessoalidade ao auxiliar (*Deve haver novas vagas*, nunca *Devem haver*).
5. **Pronome Relativo ONDE:** só pode retomar **lugar físico**! Para ideias, normas ou processos, use *em que, no qual, na qual*.`,
        keyEquations: [],
        examPitfalls: [
          'Conjunção "conquanto" significa EMBORA (concessiva), NÃO "portanto" nem "conforme"!',
          '"Posto que" na norma culta e em provas Cesgranrio/FGV também equivale a EMBORA (concessão), nunca a causa!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-pt-1',
        title: '30 Questões CESGRANRIO — Concordância Verbal e Nominal',
        channel: 'Profa. Yara Coeli',
        language: 'PT-BR',
        duration: '22 min',
        whyWatch: 'Resolução focada exatamente no estilo de alternativas e distratores da Cesgranrio.',
        youtubeId: 'UBavsXtZii4',
        url: 'https://www.youtube.com/watch?v=UBavsXtZii4',
        platform: 'YouTube',
      },
      {
        id: 'vid-pt-2',
        title: '30 Questões CESGRANRIO — Regência e Crase',
        channel: 'Profa. Yara Coeli',
        language: 'PT-BR',
        duration: '21 min',
        whyWatch: 'Treino cirúrgico dos verbos clássicos (assistir, visar, aspirar, implicar, obedecer).',
        youtubeId: 'kUVN4OCDWnc',
        url: 'https://www.youtube.com/watch?v=kUVN4OCDWnc',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'PESTANA, F. A Gramática para Concursos Públicos. Método.',
        chapters: 'Conectivos, Crase, Regência e Concordância',
        focusNote: 'Referência pragmática direta para provas Cesgranrio e FGV.',
      },
    ],
  },
  {
    id: 'b-en-tech',
    code: 'BAS-02',
    title: 'Língua Inglesa Técnica (Normas ASME/API/IEEE & Leitura Oil & Gas)',
    englishSubtitle: 'Technical English for Engineering Standards & Oil & Gas Reports',
    macroArea: 'basico',
    planetId: 'basicos-interdisciplinar',
    copyAbility: 'scholar',
    unipOrigin: 'Fluência Bilíngue da Thaisa + Padrão Cesgranrio/Cebraspe',
    petrobrasAllocation: 'Bloco Básico Eliminatório (10 questões — Diferencial Competitivo)',
    generalConcursosRelevance: 'Petrobras, Transpetro, BNDES, EPE, Marinha',
    bloomLevel: 'Análise / Avaliação',
    incidence: 'Crítica (Alta)',
    norms: ['ASME / API / IEEE Standard English Modals (Shall vs. Should vs. May)'],
    estimatedStudyMinutes: 50,
    summary:
      'Potencializar a fluência da Thaisa para garantir 90–100% no Bloco Básico: referenciação pronominal, falsos cognatos técnicos, conectores discursivos e semântica normativa (shall = obrigatório, should = recomendado, may = permissivo).',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'en-standards-cesgranrio',
        title: '1. Inglês Técnico Normativo & Estratégia de Prova Cesgranrio',
        levelTag: 'Bloco Básico (Dias Pares) — Ponto Forte da Thaisa',
        contentMarkdown: `Como você já é **fluente em inglês**, essa disciplina é sua maior **vantagem estratégica** para garantir pontos rápidos e assegurar com folga o corte de 50% do Bloco Básico sem gastar tempo precioso da prova!

Ainda assim, atenção às sutilezas cobradas pelas bancas em textos técnicos de **Oil & Gas, Energy Transition e Normas ASME/API/IEEE**:
- **Modal Verbs em Normas Técnicas (ASME / API / IEEE):**
  - \`shall\` = **requisito mandatório / obrigatório** (*must*, nunca significa apenas "futuro" em normas!).
  - \`should\` = **recomendação técnica** (boas práticas).
  - \`may\` = **permissão / opção permitida** (*is permitted*).
- **Questões de Referenciação:** a Cesgranrio destaca pronomes como *which, whose, whom, such, the former / the latter, thereby, wherein* e pede exatamente o antecedente sintático no parágrafo.
- **Armadilhas de Vocabulário Técnico & Falsos Cognatos:** *actually* (na verdade), *eventually* (finalmente/por fim), *comprehensive* (abrangente), *resilience / yield* (escoamento em materiais vs. rendimento em processo), *shutdown / turnaround* (parada programada de manutenção em refinaria), *mitigate* (atenuar), *albeit* (embora/apesar de).`,
        keyEquations: [],
        examPitfalls: [
          'Cuidado com "the former ... the latter": "the former" retoma o PRIMEIRO elemento citado; "the latter" retoma o ÚLTIMO elemento citado!',
          'Em textos de transição energética e upstream da Petrobras, verifique sempre se a afirmação da alternativa extrapola ("always / never / only") o que está estritamente no parágrafo.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-en-1',
        title: 'Gabaritando CESGRANRIO: Interpretação em Inglês (Nível Superior)',
        channel: 'Omega Ensino',
        language: 'PT-BR',
        duration: '18 min',
        whyWatch: 'Mostra exatamente o padrão de questões de referenciação e inferência da banca.',
        youtubeId: '2hj3KKnpiNo',
        url: 'https://www.youtube.com/watch?v=2hj3KKnpiNo',
        platform: 'YouTube',
      },
      {
        id: 'vid-en-2',
        title: 'Prova de Inglês Petrobras Corrigida (Cesgranrio / Transpetro)',
        channel: 'Inglês com Simone',
        language: 'PT-BR',
        duration: '20 min',
        whyWatch: 'Resolução comentada de prova real recente de nível superior da Petrobras.',
        youtubeId: '4YxL-tdVI60',
        url: 'https://www.youtube.com/watch?v=4YxL-tdVI60',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'ASME BPVC & API Recommended Practice Terminology Guides.',
        chapters: 'Foreword & Mandatory Modal Conventions (Shall / Should / May)',
        focusNote: 'Excelente leitura direta no idioma original para o bloco de dias pares.',
      },
    ],
  },
];
