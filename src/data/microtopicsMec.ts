import type { Microtopic } from '../types/study';

export const MICROTOPICS_MEC: Microtopic[] = [
  {
    id: 'm-thermo-cycles',
    code: 'MEC-01',
    title: 'Ciclos Termodinâmicos a Gás (Brayton Simples, Regenerativo e Inter-resfriamento)',
    englishSubtitle: 'Gas Power Cycles: Simple, Regenerative & Intercooled Brayton',
    macroArea: 'mec',
    planetId: 'termofluidos',
    copyAbility: 'fire',
    unipOrigin: 'Termodinâmica Aplicada (Ciclo Profissionalizante UNIP)',
    petrobrasAllocation: 'Bloco I — Mecânica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Transpetro, EPE (FGV), Marinha CP-CEM, BNDES',
    bloomLevel: 'Análise / Avaliação',
    incidence: 'Crítica (Alta)',
    norms: ['ISO 2314 (Gas Turbines)', 'API 616 (Gas Turbines for Petroleum)'],
    estimatedStudyMinutes: 90,
    summary:
      'Fundamentação da Primeira e Segunda Leis em volumes de controle, exergia, relação de Gouy-Stodola e análise paramétrica completa do ciclo Brayton ideal, com regeneração e limites de razão de pressão.',
    interactiveDiagram: 'brayton-rankine-ts',
    compendium: [
      {
        id: 'thermo-laws-exergy',
        title: '1. Conservação de Energia, Entropia e Exergia (Volume de Controle)',
        levelTag: 'Fundamentação UNIP → Nível Petrobras',
        contentMarkdown: `Para um volume de controle em regime permanente com múltiplos fluxos mássicos, a **Primeira Lei da Termodinâmica** integra energia térmica, potência mecânica de eixo, entalpia e energias cinética e potencial.

Em processos reversíveis e adiabáticos (isentrópicos) envolvendo gases ideais com calores específicos constantes ($k = c_p / c_v$), as relações de estado acoplam temperatura, pressão e volume específico através da razão de pressões $r_p = P_2 / P_1$.

A **Segunda Lei** quantifica a irreversibilidade pela taxa de geração de entropia $\\dot{S}_{ger} \\ge 0$. Referenciando o escoamento ao ambiente morto $(P_0, T_0)$, define-se a **exergia específica de fluxo** $\\psi$ e o Teorema de **Gouy-Stodola** ($\dot{I} = T_0 \\dot{S}_{ger}$), amplamente cobrado pela Cesgranrio e Cebraspe na avaliação de perdas em turbinas a gás offshore.`,
        keyEquations: [
          {
            label: 'Primeira Lei (Volume de Controle em Regime Permanente)',
            latex: String.raw`\dot{Q}_{vc} - \dot{W}_{vc} + \sum_{e} \dot{m}_e \left( h_e + \frac{V_e^2}{2} + g z_e \right) - \sum_{s} \dot{m}_s \left( h_s + \frac{V_s^2}{2} + g z_s \right) = 0`,
          },
          {
            label: 'Relações Isentrópicas para Gás Ideal',
            latex: String.raw`T_2 = T_1 \left( \frac{P_2}{P_1} \right)^{\frac{k-1}{k}}, \quad v_2 = v_1 \left( \frac{P_1}{P_2} \right)^{\frac{1}{k}}, \quad k = \frac{c_p}{c_v}`,
          },
          {
            label: 'Exergia de Fluxo e Destruição de Exergia (Gouy-Stodola)',
            latex: String.raw`\psi = (h - h_0) - T_0(s - s_0) + \frac{V^2}{2} + g z, \qquad \dot{I} = T_0 \dot{S}_{ger}`,
          },
        ],
        examPitfalls: [
          'Confundir sinal de trabalho: na convenção clássica Q - W, trabalho produzido pela turbina é positivo e trabalho consumido pelo compressor também entra com cuidado de sinais; sempre verifique se o termo é líquido (W_turb - W_comp).',
          'Em cálculos de geração de entropia, usar temperaturas absolutas em Kelvin (K), nunca em °C.',
        ],
      },
      {
        id: 'brayton-regen',
        title: '2. Ciclo Brayton Simples, Regenerativo e Critério de Inversão Térmica',
        levelTag: 'Alta Incidência Cesgranrio / Cebraspe',
        contentMarkdown: `Em turbomáquinas a gás operando segundo o ciclo Brayton padrão a ar ideal (compressão isentrópica $1 \\to 2$, adição isobárica de calor $2 \\to 3$, expansão isentrópica $3 \\to 4$, rejeição isobárica $4 \\to 1$), o rendimento térmico depende **exclusivamente** da razão de pressões $r_p$ e do coeficiente $k$.

Quando se acopla um **regenerador perfeito** ($\\epsilon_{reg} = 1$), o ar comprimido em $T_2$ é pré-aquecido pelos gases de exaustão da turbina em $T_4$. Isso **inverte** a dependência com $r_p$: aumentar demais a razão de pressão reduz $T_4$ e eleva $T_2$ até $T_2 \\ge T_4$, inviabilizando a regeneração!

Além disso, a **razão de trabalho reverso (BWR)** $\\dot{W}_{comp} / \\dot{W}_{turb}$ é elevada em turbinas a gás (40% a 80%), motivo pelo qual emprega-se **compressão com inter-resfriamento** e **expansão com reaquecimento** para ampliar o trabalho líquido específico.`,
        keyEquations: [
          {
            label: 'Eficiência Térmica — Brayton Simples',
            latex: String.raw`\eta_{Brayton} = 1 - \frac{1}{r_p^{\frac{k-1}{k}}}`,
          },
          {
            label: 'Eficiência Térmica — Brayton Regenerativo Ideal (ε = 1)',
            latex: String.raw`\eta_{Brayton,reg} = 1 - \left( \frac{T_1}{T_3} \right) r_p^{\frac{k-1}{k}}`,
          },
          {
            label: 'Critério Limite para Regeneração Benéfica (η_regen > η_simples)',
            latex: String.raw`r_p < \left( \frac{T_3}{T_1} \right)^{\frac{k}{2(k-1)}}`,
            note: 'Dedução clássica do Cebraspe: se r_p superar esse limite, o regenerador reduz a eficiência.',
          },
        ],
        examPitfalls: [
          'Cebraspe frequentemente afirma que "a regeneração sempre aumenta o rendimento do ciclo Brayton para qualquer razão de pressão" — FALSO! Só aumenta quando r_p < (T_3/T_1)^{k/[2(k-1)]}.',
          'A razão de trabalho líquido máximo ocorre quando T_2 = T_4, ou seja, r_p = (T_3/T_1)^{k/[2(k-1)]}.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-brayton-1',
        title: 'Ideal Brayton Cycle Explained (Gas Turbines)',
        channel: 'Less Boring Lectures',
        language: 'EN',
        duration: '11 min',
        whyWatch: 'Visualização direta dos processos 1-2-3-4 no diagrama T-s e P-v com cálculo de eficiência.',
        youtubeId: 'fZ80tkxWa-4',
        url: 'https://www.youtube.com/watch?v=fZ80tkxWa-4',
        platform: 'YouTube',
      },
      {
        id: 'vid-brayton-2',
        title: 'Cursos Unicamp / UNIVESP — Física Geral II: Calor e 1ª Lei da Termodinâmica',
        channel: 'UNIVESP',
        language: 'PT-BR',
        duration: '24 min',
        whyWatch: 'Revisão sólida em português da base conceitual de trabalho, entalpia e transformações gasosas.',
        youtubeId: 'LVJyxS-sO0w',
        url: 'https://www.youtube.com/watch?v=LVJyxS-sO0w',
        platform: 'UNIVESP',
      },
      {
        id: 'vid-brayton-ocw',
        title: 'MIT OCW 2.42 / 2.005 — Thermal-Fluids & Advanced Thermodynamics',
        channel: 'MIT OpenCourseWare',
        language: 'EN',
        duration: 'Curso completo',
        whyWatch: 'Notas de aula nível MIT para Segunda Lei, Exergia e ciclos de potência a gás.',
        url: 'https://ocw.mit.edu/courses/2-005-thermal-fluids-engineering-i-spring-2008/',
        platform: 'MIT OCW',
      },
    ],
    books: [
      {
        citation: 'ÇENGEL, Y. A.; BOLES, M. A. Termodinâmica. 7ª ou 9ª ed. McGraw-Hill.',
        chapters: 'Caps. 5, 7, 8 e 9 (Volumes de controle, Entropia, Exergia e Ciclos a Gás)',
        focusNote: 'Livro-base mais alinhado ao estilo numérico da Cesgranrio.',
      },
      {
        citation: 'MORAN, M. J.; SHAPIRO, H. N. Princípios de Termodinâmica para Engenharia. LTC.',
        chapters: 'Caps. 7 e 9 (Análise Exergética e Turbinas a Gás)',
        focusNote: 'Excelente rigor formal para questões conceituais do Cebraspe.',
      },
    ],
  },
  {
    id: 'm-thermo-rankine',
    code: 'MEC-02',
    title: 'Ciclos de Potência a Vapor (Rankine com Reaquecimento, Regeneração e Cogeração)',
    englishSubtitle: 'Vapor Power Cycles: Rankine Reheat, Regenerative & Cogeneration',
    macroArea: 'mec',
    planetId: 'termofluidos',
    copyAbility: 'fire',
    unipOrigin: 'Termodinâmica Aplicada / Máquinas Térmicas (UNIP)',
    petrobrasAllocation: 'Bloco I — Mecânica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, EPE, Eletrobras, Termelétricas, Marinha',
    bloomLevel: 'Análise / Aplicação',
    incidence: 'Crítica (Alta)',
    norms: ['ASME PTC 4 (Fired Steam Generators)'],
    estimatedStudyMinutes: 85,
    summary:
      'Análise entálpica ponto a ponto do ciclo Rankine simples, reaquecimento intermediário (elevando título na saída da turbina), aquecedores de mistura (sangria y) e plantas de cogeração em refinarias.',
    interactiveDiagram: 'brayton-rankine-ts',
    compendium: [
      {
        id: 'rankine-reheat-regen',
        title: '1. Rankine com Reaquecimento e Regeneração por Sangria',
        levelTag: 'Núcleo Petrobras (Refino & Termelétricas)',
        contentMarkdown: `Na geração termoelétrica aplicada a refinarias (plantas UTE da Petrobras), o ciclo **Rankine** opera com água/vapor entre a caldeira (alta pressão) e o condensador (vácuo, típico $10\\text{ kPa}$).

- **Reaquecimento intermediário:** evita título excessivamente baixo ($x < 0,88$) nos últimos estágios da turbina de baixa pressão, protegendo as pás contra erosão por gotículas, além de elevar a temperatura média de adição de calor.
- **Regeneração (Aquecedor de Mistura Aberto - FWH):** uma fração mássica $y$ de vapor é sangrada da turbina em pressão intermediária para pré-aquecer a água de alimentação até líquido saturado, reduzindo o calor fornecido na caldeira e elevando o rendimento térmico global.
- **Título e Propriedades na Região Bifásica:** $h = h_f + x\\,h_{fg}$, $s = s_f + x\\,s_{fg}$. O trabalho da bomba incompressível aproxima-se por $w_b \\approx v_f (P_{alta} - P_{baixa}) / \\eta_b$.`,
        keyEquations: [
          {
            label: 'Rendimento Térmico — Rankine Regenerativo com 1 Sangria (Fração y)',
            latex: String.raw`\eta_{Rankine} = \frac{(h_1 - h_2) + (1-y)(h_2 - h_3) - (1-y) w_{bomba,1} - w_{bomba,2}}{h_1 - h_6}`,
          },
          {
            label: 'Entalpia na Saída com Título x e Trabalho da Bomba',
            latex: String.raw`h_4 = h_f + x_4 h_{fg}, \qquad w_{bomba,s} \approx v_f (P_2 - P_1)`,
          },
          {
            label: 'Fator de Utilização em Cogeração (ε_u)',
            latex: String.raw`\epsilon_u = \frac{\dot{W}_{liq} + \dot{Q}_{processo}}{\dot{Q}_{entrada}}`,
          },
        ],
        examPitfalls: [
          'Ao calcular o balanço de massa/energia no aquecedor de mistura aberto (FWH), lembrar que a fração y sai da turbina antes da expansão na BP: y*h_2 + (1-y)*h_5 = 1*h_6.',
          'Em reaquecimento, NÃO esquecer de somar o calor absorvido no reaquecedor q_reheat = (h_3 - h_2) no denominador q_in!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-rankine-1',
        title: 'Rankine Cycle Example 1 (Step-by-Step Steam Tables)',
        channel: 'LearnChemE',
        language: 'EN',
        duration: '9 min',
        whyWatch: 'Resolução rigorosa passo a passo usando balanços de energia e tabelas de vapor.',
        youtubeId: 'hEzBdzPjf6I',
        url: 'https://www.youtube.com/watch?v=hEzBdzPjf6I',
        platform: 'YouTube',
      },
      {
        id: 'vid-rankine-2',
        title: 'Rankine Cycle Examples (Turbines, Pumps & Efficiency)',
        channel: 'LearnChemE',
        language: 'EN',
        duration: '10 min',
        whyWatch: 'Consolida cálculo de trabalho da bomba v·ΔP e eficiência isentrópica de turbina.',
        youtubeId: 'LAr6Hn0h0vE',
        url: 'https://www.youtube.com/watch?v=LAr6Hn0h0vE',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'ÇENGEL, Y. A.; BOLES, M. A. Termodinâmica. McGraw-Hill.',
        chapters: 'Cap. 10 (Ciclos de Potência a Vapor e Combinados)',
        focusNote: 'Contém exemplos clássicos de reaquecimento, regeneração e cogeração.',
      },
    ],
  },
  {
    id: 'm-fluids-ns',
    code: 'MEC-03',
    title: 'Equações de Navier-Stokes, Bernoulli Generalizada e Perdas de Carga',
    englishSubtitle: 'Navier-Stokes Equations, Generalized Bernoulli & Darcy-Weisbach Losses',
    macroArea: 'mec',
    planetId: 'termofluidos',
    copyAbility: 'bubble',
    unipOrigin: 'Fenômenos de Transporte / Mecânica dos Fluidos (UNIP)',
    petrobrasAllocation: 'Bloco I — Mecânica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Transpetro (Dutos), Marinha, Perito, Saneamento',
    bloomLevel: 'Aplicação / Cálculo',
    incidence: 'Crítica (Alta)',
    norms: ['Crane TP-410 (Flow of Fluids)', 'ASME B31.4 / B31.8'],
    estimatedStudyMinutes: 90,
    summary:
      'Conservação de quantidade de movimento (Navier-Stokes), Equação da Energia Mecânica entre seções de dutos, fator de correção cinética α, Darcy-Weisbach, Hagen-Poiseuille e Colebrook-White.',
    interactiveDiagram: 'pump-npsh-curve',
    compendium: [
      {
        id: 'ns-bernoulli-darcy',
        title: '1. Navier-Stokes, Bernoulli Modificada e Fator de Atrito',
        levelTag: 'Core Dutos & Escoamento Interno',
        contentMarkdown: `O escoamento de fluidos newtonianos incompressíveis e isotrópicos é governado pela **Equação de Navier-Stokes**. Para dutos reais em regime permanente, integra-se a energia mecânica ao longo da linha de corrente incorporando altura manométrica de bomba ($H_B$), turbina ($H_T$) e perdas de carga distribuídas e localizadas ($h_p = h_f + h_m$).

O fator de correção de energia cinética $\\alpha$ vale exatamente **$\\alpha = 2$** no escoamento laminar plenamente desenvolvido em tubo circular (perfil parabólico de Hagen-Poiseuille) e aproximadamente **$\\alpha \\approx 1,05$** em escoamento turbulento.

No regime laminar ($Re \\le 2300$), $f = 64 / Re$ independe da rugosidade do tubo! Já no regime turbulento ($Re \\ge 4000$), o fator de atrito de Darcy $f$ é dado implicitamente pela equação de **Colebrook-White** (Diagrama de Moody).`,
        keyEquations: [
          {
            label: 'Equação Vetorial de Navier-Stokes (Incompressível, Newtoniano)',
            latex: String.raw`\rho \left( \frac{\partial \mathbf{u}}{\partial t} + (\mathbf{u} \cdot \nabla)\mathbf{u} \right) = -\nabla P + \mu \nabla^2 \mathbf{u} + \rho \mathbf{g}`,
          },
          {
            label: 'Equação de Bernoulli Generalizada (Energia Mecânica)',
            latex: String.raw`\frac{P_1}{\gamma} + \alpha_1 \frac{V_1^2}{2g} + z_1 + H_B = \frac{P_2}{\gamma} + \alpha_2 \frac{V_2^2}{2g} + z_2 + H_T + h_p`,
          },
          {
            label: 'Darcy-Weisbach, Laminar (Hagen-Poiseuille) e Colebrook-White',
            latex: String.raw`h_f = f \frac{L}{D} \frac{V^2}{2g}, \quad f_{lam} = \frac{64}{Re}, \quad \frac{1}{\sqrt{f}} = -2{,}0 \log_{10} \left( \frac{\epsilon / D}{3{,}7} + \frac{2{,}51}{Re \sqrt{f}} \right)`,
          },
        ],
        examPitfalls: [
          'Na Cesgranrio, atenção ao fator de atrito de Fanning (f_F) vs Darcy (f_D): f_D = 4 · f_F! Na fórmula de Darcy-Weisbach h_f = f (L/D)(V^2/2g) usa-se o de Darcy (64/Re no laminar).',
          'No regime laminar em dutos circulares, a perda de carga h_f varia LINEARMENTE com a velocidade V (e inversamente com D^2 para mesma vazão, ou D^4 no ΔP!).',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-ns-1',
        title: "Understanding Bernoulli's Equation",
        channel: 'The Efficient Engineer',
        language: 'EN',
        duration: '13 min',
        whyWatch: 'Explicação visual impecável de pressão estática, dinâmica, hidrostática e limitações de Bernoulli.',
        youtubeId: 'DW4rItB20h4',
        url: 'https://www.youtube.com/watch?v=DW4rItB20h4',
        platform: 'YouTube',
      },
      {
        id: 'vid-ns-2',
        title: 'Understanding Laminar and Turbulent Flow',
        channel: 'The Efficient Engineer',
        language: 'EN',
        duration: '12 min',
        whyWatch: 'Reynolds, camada limite, diagrama de Moody e fator de atrito de Darcy.',
        youtubeId: '9A-uUG0WR0w',
        url: 'https://www.youtube.com/watch?v=9A-uUG0WR0w',
        platform: 'YouTube',
      },
      {
        id: 'vid-ns-3',
        title: 'Mecânica dos Fluidos — Aula 01 (Fluidos e Superfluidos)',
        channel: 'UNIVESP',
        language: 'PT-BR',
        duration: '20 min',
        whyWatch: 'Base acadêmica em português alinhada à graduação paulista.',
        youtubeId: '_9VXkn_8gyI',
        url: 'https://www.youtube.com/watch?v=_9VXkn_8gyI',
        platform: 'UNIVESP',
      },
    ],
    books: [
      {
        citation: 'WHITE, F. M. Mecânica dos Fluidos. 8ª ed. McGraw-Hill.',
        chapters: 'Caps. 3, 4 e 6 (Equações integrais/diferenciais e Escoamento Viscoso em Dutos)',
        focusNote: 'Referência clássica para Navier-Stokes e Diagrama de Moody.',
      },
      {
        citation: 'FOX, R. W.; MCDONALD, A. T. Introdução à Mecânica dos Fluidos. LTC.',
        chapters: 'Cap. 8 (Escoamento Interno Incompressível)',
        focusNote: 'Didática excelente para associação de tubulações e perdas localizadas.',
      },
    ],
  },
  {
    id: 'm-fluids-laval',
    code: 'MEC-04',
    title: 'Escoamento Compressível Isentrópico em Bocais de Laval e Ondas de Choque',
    englishSubtitle: 'Compressible Flow in Converging-Diverging Nozzles & Normal Shocks',
    macroArea: 'mec',
    planetId: 'termofluidos',
    copyAbility: 'bubble',
    unipOrigin: 'Mecânica dos Fluidos / Dinâmica dos Gases (UNIP)',
    petrobrasAllocation: 'Bloco I — Mecânica (Média-Alta)',
    generalConcursosRelevance: 'Petrobras (Ejetores, PSVs, Válvulas de Alívio), Marinha, ITA/IME',
    bloomLevel: 'Análise / Dedução',
    incidence: 'Média-Alta',
    norms: ['API 520 (Sizing of Pressure-Relieving Devices — Critical Flow)'],
    estimatedStudyMinutes: 75,
    summary:
      'Propriedades de estagnação (P₀, T₀), relação área-velocidade (dA/A = (M²−1)dV/V), bloqueio sônico na garganta (P*/P₀ ≈ 0,528 para ar) e descontinuidades através de ondas de choque normais.',
    interactiveDiagram: 'laval-nozzle-mach',
    compendium: [
      {
        id: 'laval-isentropic-shock',
        title: '1. Bocal Convergente-Divergente e Choque Normal',
        levelTag: 'Ejetores, PSVs & Escoamento Supersônico',
        contentMarkdown: `Em válvulas de alívio de pressão (PSV - API 520) e ejetores de vapor/gás em plataformas, quando a razão de pressão atinge o limite crítico, o fluido bloqueia na velocidade do som ($M = 1$) na seção mínima (garganta).

A relação geométrica-cinemática $\\frac{dA}{A} = (M^2 - 1)\\frac{dV}{V}$ explica por que acelerar um fluido subsônico ($M < 1$) exige **convergência** ($dA < 0$), enquanto acelerar um fluido supersônico ($M > 1$) exige **divergência** ($dA > 0$).

Para ar padrão ($k = 1,4$), a pressão crítica na garganta atinge $P^*/P_0 \\approx 0,528$. Se ocorrer uma **onda de choque normal** no trecho divergente:
1. O escoamento muda abruptamente de supersônico ($M_1 > 1$) para subsônico ($M_2 < 1$).
2. A pressão estática e a temperatura estática **sobem** ($P_2 > P_1$, $T_2 > T_1$).
3. Por ser um fenômeno altamente **irreversível** (geração de entropia $s_2 > s_1$), a pressão de estagnação **cai** ($P_{02} < P_{01}$), embora a temperatura de estagnação adiabática permaneça constante ($T_{02} = T_{01}$).`,
        keyEquations: [
          {
            label: 'Relações de Estagnação Isentrópicas',
            latex: String.raw`\frac{T_0}{T} = 1 + \frac{k-1}{2} M^2, \quad \frac{P_0}{P} = \left( 1 + \frac{k-1}{2} M^2 \right)^{\frac{k}{k-1}}`,
          },
          {
            label: 'Relação Área-Velocidade e Pressão Crítica (M = 1)',
            latex: String.raw`\frac{dA}{A} = (M^2 - 1) \frac{dV}{V}, \qquad \frac{P^*}{P_0} = \left( \frac{2}{k+1} \right)^{\frac{k}{k-1}} \approx 0{,}528\ (k=1{,}4)`,
          },
        ],
        examPitfalls: [
          'Cebraspe adora cobrar: "Após uma onda de choque normal adiabática em gás ideal, a temperatura de estagnação aumenta" — ERRADO! T_0 permanece constante se o choque for adiabático sem trabalho de eixo; o que CAI é P_0!',
          'Em bocal puramente convergente, é IMPOSSÍVEL atingir M > 1 na saída — o máximo possível é M = 1 (bloqueio sônico).',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-laval-1',
        title: 'Compressible Flow in Converging-Diverging Ducts (Lesson 15C)',
        channel: 'Prof. John Cimbala',
        language: 'EN',
        duration: '14 min',
        whyWatch: 'Coautor do livro clássico Çengel/Cimbala explicando bloqueio sônico e choque normal.',
        youtubeId: 'JJV_6klQt_M',
        url: 'https://www.youtube.com/watch?v=JJV_6klQt_M',
        platform: 'YouTube',
      },
      {
        id: 'vid-laval-2',
        title: 'Explained: Converging-Diverging Nozzle',
        channel: 'JoshTheEngineer',
        language: 'EN',
        duration: '12 min',
        whyWatch: 'Intuição gráfica da variação de pressão e Mach ao longo da coordenada axial x.',
        youtubeId: 'p8e8A3sdVOg',
        url: 'https://www.youtube.com/watch?v=p8e8A3sdVOg',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'WHITE, F. M. Mecânica dos Fluidos. McGraw-Hill.',
        chapters: 'Cap. 9 (Escoamento Compressível)',
        focusNote: 'Dedução completa de relações isentrópicas e choques normais.',
      },
    ],
  },
  {
    id: 'm-heat-transfer',
    code: 'MEC-05',
    title: 'Transferência de Calor (Condução, Convecção e Trocadores LMTD / ε-NUT)',
    englishSubtitle: 'Heat Transfer: Conduction, Convection & Heat Exchangers',
    macroArea: 'mec',
    planetId: 'termofluidos',
    copyAbility: 'fire',
    unipOrigin: 'Transferência de Calor e Massa (UNIP)',
    petrobrasAllocation: 'Bloco I / III — Mecânica & Refino',
    generalConcursosRelevance: 'Petrobras, Transpetro, EPE, BNDES, FGV, Marinha',
    bloomLevel: 'Aplicação / Cálculo',
    incidence: 'Alta',
    norms: ['TEMA Standards (Tubular Exchangers)', 'API 660 (Shell-and-Tube)'],
    estimatedStudyMinutes: 75,
    summary:
      'Lei de Fourier, raio crítico de isolamento, aletas, números adimensionais (Nusselt, Prandtl, Biot, Grashof), Lei de Stefan-Boltzmann e dimensionamento térmico de trocadores casco-e-tubos via MLDT (LMTD) e efetividade-NUT.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'heat-conduction-exchangers',
        title: '1. Condução, Número de Biot, Raio Crítico e Trocadores de Calor',
        levelTag: 'Complemento Essencial UNIP → Refinarias',
        contentMarkdown: `Na engenharia de processos petrolíferos, o balanço térmico combina **condução** (Lei de Fourier), **convecção** (Lei de Newton do Resfriamento) e **radiação** (Stefan-Boltzmann).

- **Número de Biot ($Bi = h L_c / k_{solido}$):** se $Bi < 0,1$, a resistência térmica interna de condução é desprezível frente à resistência convectiva externa, validando o modelo de **capacitância concentrada**.
- **Raio Crítico de Isolamento:** em tubulações cilíndricas finas ou cabos elétricos, adicionar isolante aumenta a resistência de condução, mas aumenta a área externa convectiva. O máximo fluxo de calor ocorre em $r_{cr} = k_{isol} / h$.
- **Trocadores de Calor:** para mesma temperatura terminal, o arranjo **contracorrente** possui sempre **maior MLDT** ($\\Delta T_{ml}$) que o paralelo, requerendo menor área de troca térmica $A$ para mesma carga $\\dot{Q} = U A F \\Delta T_{ml}$.`,
        keyEquations: [
          {
            label: 'Lei de Fourier, Biot e Raio Crítico Cilíndrico',
            latex: String.raw`\dot{q} = -k \nabla T, \qquad Bi = \frac{h L_c}{k}, \qquad r_{cr,cil} = \frac{k_{isol}}{h}`,
          },
          {
            label: 'Taxa de Troca em Trocadores de Calor e MLDT (LMTD)',
            latex: String.raw`\dot{Q} = U A F \Delta T_{ml}, \qquad \Delta T_{ml} = \frac{\Delta T_1 - \Delta T_2}{\ln(\Delta T_1 / \Delta T_2)}`,
          },
        ],
        examPitfalls: [
          'Não confundir Número de Biot (k do sólido) com Número de Nusselt (Nu = hL/k_fluido)!',
          'Em mudança de fase (condensador ou evaporador), a capacidade térmica C_max → ∞, portanto C_r = C_min/C_max = 0 e qualquer arranjo (paralelo ou contracorrente) dá a mesma efetividade ε = 1 − exp(−NUT).',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-ht-1',
        title: 'Understanding Conduction and the Heat Equation',
        channel: 'The Efficient Engineer',
        language: 'EN',
        duration: '12 min',
        whyWatch: 'Derivação física clara da Lei de Fourier e Equação da Difusão do Calor.',
        youtubeId: '6jQsLAqrZGQ',
        url: 'https://www.youtube.com/watch?v=6jQsLAqrZGQ',
        platform: 'YouTube',
      },
      {
        id: 'vid-ht-2',
        title: 'Understanding Thermal Radiation',
        channel: 'The Efficient Engineer',
        language: 'EN',
        duration: '11 min',
        whyWatch: 'Emissividade, corpo negro, fator de forma e radiação em fornos petroquímicos.',
        youtubeId: 'FDmYCI_xYlA',
        url: 'https://www.youtube.com/watch?v=FDmYCI_xYlA',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'INCROPERA, F. P. et al. Fundamentos de Transferência de Calor e de Massa. LTC.',
        chapters: 'Caps. 2, 3, 5 e 11 (Condução, Capacitância Concentrada e Trocadores)',
        focusNote: 'Padrão ouro mundial citado em praticamente todos os editais brasileiros.',
      },
    ],
  },
  {
    id: 'm-solids-mohr',
    code: 'MEC-06',
    title: 'Estado Plano de Tensões, Círculo de Mohr 3D e Critérios de Falha (von Mises e Tresca)',
    englishSubtitle: "Plane Stress, 3D Mohr's Circle & Yield Criteria (von Mises / Tresca)",
    macroArea: 'mec',
    planetId: 'solidos-materiais',
    copyAbility: 'hammer',
    unipOrigin: 'Resistência dos Materiais / Estática nas Estruturas (UNIP)',
    petrobrasAllocation: 'Bloco I — Mecânica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Transpetro, BNDES, Marinha, Perito Criminal',
    bloomLevel: 'Análise / Aplicação',
    incidence: 'Crítica (Alta)',
    norms: ['ASME Section VIII Div. 2 (Stress Intensity — Tresca)'],
    estimatedStudyMinutes: 85,
    summary:
      'Transformação tensorial de tensões, tensões principais, armadilha do Círculo de Mohr 3D (cisalhamento máximo absoluto), e comparação entre os critérios de Tresca (mais conservador) e von Mises.',
    interactiveDiagram: 'mohr-circle-2d',
    compendium: [
      {
        id: 'mohr-tresca-mises',
        title: '1. Círculo de Mohr 2D/3D e Teorias de Falha para Materiais Dúcteis',
        levelTag: 'Questão Clássica #1 da Cesgranrio',
        contentMarkdown: `Dado um elemento estrutural em **Estado Plano de Tensões** ($\\sigma_z = \\tau_{xz} = \\tau_{yz} = 0$), as tensões principais no plano $(\\sigma_1, \\sigma_2)$ definem o círculo principal. Contudo, um material é sempre tridimensional ($\sigma_3 = 0$).

- **Armadilha do Mohr 3D:** quando $\\sigma_1$ e $\\sigma_2$ possuem o **mesmo sinal** (ex.: vaso de pressão com $\\sigma_1 = 200\\text{ MPa}$ e $\\sigma_2 = 100\\text{ MPa}$), a menor tensão principal ordenada é $\\sigma_{min} = \\sigma_3 = 0$, fazendo com que a tensão cisalhante máxima **absoluta** seja $\\tau_{max,abs} = \\frac{\\sigma_1 - 0}{2} = 100\\text{ MPa}$, e **não** $\\frac{\\sigma_1 - \\sigma_2}{2} = 50\\text{ MPa}$!
- **Critério de Tresca (Máxima Tensão de Cisalhamento):** hexágono inscrito na elipse de von Mises; é **mais conservador** (diferença máxima de ~15,5% em cisalhamento puro, onde $\\tau_y = 0,5\\,S_y$ por Tresca vs. $0,577\\,S_y$ por von Mises).
- **Critério de von Mises (Máxima Energia de Distorção):** elipse suave, mais próximo de resultados experimentais em aços dúcteis.`,
        keyEquations: [
          {
            label: 'Tensões Principais no Plano (Círculo de Mohr)',
            latex: String.raw`\sigma_{1,2} = \frac{\sigma_x + \sigma_y}{2} \pm \sqrt{\left( \frac{\sigma_x - \sigma_y}{2} \right)^2 + \tau_{xy}^2}`,
          },
          {
            label: 'Critério de Tresca (Ordenando σ₁ ≥ σ₂ ≥ σ₃)',
            latex: String.raw`\tau_{max,abs} = \frac{\sigma_1 - \sigma_3}{2} \ge \frac{S_y}{2} \implies \sigma_1 - \sigma_3 \ge S_y`,
          },
          {
            label: 'Tensão Equivalente de von Mises e Coeficiente de Segurança',
            latex: String.raw`\sigma_v = \sqrt{\sigma_x^2 - \sigma_x \sigma_y + \sigma_y^2 + 3\tau_{xy}^2}, \qquad n = \frac{S_y}{\sigma_v}`,
          },
        ],
        examPitfalls: [
          'Em vasos cilíndricos pressurizados sem torque externo, σ₁ = 2σ₂ > 0: von Mises dá σ_v = (√3/2)σ₁ ≈ 0,866 σ₁, enquanto Tresca dá σ₁ − 0 = σ₁ (mais conservador!).',
          'Em cisalhamento puro (σ_x = σ_y = 0, τ_xy ≠ 0): Tresca falha em τ = 0,5 S_y, enquanto von Mises falha em τ = S_y/√3 ≈ 0,577 S_y.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-mohr-1',
        title: "Understanding Stress Transformation and Mohr's Circle",
        channel: 'The Efficient Engineer',
        language: 'EN',
        duration: '15 min',
        whyWatch: 'Visualização em 3D de transformação de tensões e construção geométrica do círculo.',
        youtubeId: '_DH3546mSCM',
        url: 'https://www.youtube.com/watch?v=_DH3546mSCM',
        platform: 'YouTube',
      },
      {
        id: 'vid-mohr-2',
        title: 'Understanding Failure Theories (Tresca, von Mises, Rankine)',
        channel: 'The Efficient Engineer',
        language: 'EN',
        duration: '14 min',
        whyWatch: 'Compara diretamente hexágono de Tresca vs. elipse de von Mises e materiais frágeis.',
        youtubeId: 'xkbQnBAOFEg',
        url: 'https://www.youtube.com/watch?v=xkbQnBAOFEg',
        platform: 'YouTube',
      },
      {
        id: 'vid-mohr-3',
        title: "Mechanics of Materials: Lesson 50 - Mohr's Circle for Stress Transformation",
        channel: 'Jeff Hanson',
        language: 'EN',
        duration: '16 min',
        whyWatch: 'Método prático à mão livre para provas rápidas tipo Cesgranrio.',
        youtubeId: 'q3xpMLFnGeY',
        url: 'https://www.youtube.com/watch?v=q3xpMLFnGeY',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'BEER, F. P.; JOHNSTON, E. R. Resistência dos Materiais. McGraw-Hill.',
        chapters: 'Cap. 7 (Transformação de Tensão e Deformação)',
        focusNote: 'Convenção de sinais adotada pela maioria das bancas brasileiras.',
      },
      {
        citation: 'HIBBELER, R. C. Resistência dos Materiais. Pearson.',
        chapters: 'Caps. 9 e 10 (Círculo de Mohr 3D e Critérios de Falha)',
        focusNote: 'Excelentes exercícios de carregamento combinado em eixos e vasos.',
      },
    ],
  },
  {
    id: 'm-solids-torsion',
    code: 'MEC-07',
    title: 'Torção em Eixos, Fluxo de Bredt (Paredes Finas) e Flexão / Jourawski',
    englishSubtitle: 'Torsion, Thin-Walled Tubes (Bredt) & Bending / Transverse Shear',
    macroArea: 'mec',
    planetId: 'solidos-materiais',
    copyAbility: 'hammer',
    unipOrigin: 'Resistência dos Materiais (UNIP)',
    petrobrasAllocation: 'Bloco I — Mecânica (Média-Alta)',
    generalConcursosRelevance: 'Petrobras, Transpetro, Marinha, Perito, Vunesp',
    bloomLevel: 'Aplicação / Cálculo',
    incidence: 'Média-Alta',
    norms: ['ASME B106.1M (Design of Transmission Shafting)'],
    estimatedStudyMinutes: 80,
    summary:
      'Torção elástica e elastoplástica em eixos circulares, fluxo de cisalhamento constante em tubos fechados não circulares (Fórmula de Bredt), flexão pura e cisalhamento transversal de Jourawski.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'torsion-bredt-bending',
        title: '1. Torção Circular, Tubos de Parede Fina (Bredt) e Flexão',
        levelTag: 'Dimensionamento de Eixos & Estruturas',
        contentMarkdown: `Na torção elástica de eixos circulares maciços ou vazados, as seções planas permanecem planas, resultando em variação linear de tensão com o raio $r$: $\\tau(r) = T r / J$, onde $J_{macico} = \\pi d^4 / 32$ e $J_{vazado} = \\frac{\\pi}{32}(d_e^4 - d_i^4)$.

Para perfis **fechados não-circulares de paredes finas**, aplica-se a teoria do **fluxo de cisalhamento de Bredt** ($q = \\tau\\,t = \\text{constante}$), baseada na área média $A_m$ delimitada pela linha média da parede.

Na flexão pura, $\\sigma_x(y) = -M_z y / I_z$ é máxima nas fibras extremas, enquanto o cisalhamento transversal de **Jourawski** $\\tau(y) = V_y Q(y) / (I_z b(y))$ anula-se nas bordas livres e atinge o pico na linha neutra ($\\tau_{max} = \\frac{3}{2} \\frac{V}{A}$ para seção retangular e $\\frac{4}{3} \\frac{V}{A}$ para seção circular maciça!).`,
        keyEquations: [
          {
            label: 'Torção Elástica em Eixos Circulares',
            latex: String.raw`\tau(r) = \frac{T r}{J}, \quad \tau_{max} = \frac{T c}{J}, \quad \phi = \int_0^L \frac{T(x)}{G J(x)} dx`,
          },
          {
            label: 'Fluxo de Cisalhamento de Bredt (Seções Fechadas de Parede Fina)',
            latex: String.raw`\tau(s) = \frac{T}{2 A_m t(s)}, \qquad \phi = \frac{T L}{4 A_m^2 G} \oint \frac{ds}{t(s)}`,
          },
          {
            label: 'Flexão Pura e Fórmula de Jourawski',
            latex: String.raw`\sigma_x(y) = -\frac{M_z y}{I_z}, \qquad \tau(y) = \frac{V_y Q(y)}{I_z b(y)}`,
          },
        ],
        examPitfalls: [
          'Comparação clássica: um tubo fechado de parede fina resiste ordens de grandeza mais à torção que o mesmo tubo com uma fenda longitudinal aberta (perfil aberto tem J = Σ b·t³/3)!',
          'Em torção elastoplástica total de eixo circular maciço, a razão entre o torque plástico limite T_p e o torque de início de escoamento T_y vale exatamente T_p / T_y = 4/3 (≈ 1,333).',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-tor-1',
        title: 'Mechanics of Materials: Lesson 25 - Angle of Twist Due to Torque, Torsion',
        channel: 'Jeff Hanson',
        language: 'EN',
        duration: '15 min',
        whyWatch: 'Convenção de regra da mão direita para torque e ângulo de torção passo a passo.',
        youtubeId: 'jhgQo-MF7QE',
        url: 'https://www.youtube.com/watch?v=jhgQo-MF7QE',
        platform: 'YouTube',
      },
      {
        id: 'vid-tor-2',
        title: 'Resistência dos Materiais — Aula 01: Estática das Estruturas',
        channel: 'UNIVESP',
        language: 'PT-BR',
        duration: '22 min',
        whyWatch: 'Revisão estruturada dos esforços internos solicitantes (N, V, M, T) da graduação.',
        youtubeId: 'ND2qMgUniEk',
        url: 'https://www.youtube.com/watch?v=ND2qMgUniEk',
        platform: 'UNIVESP',
      },
    ],
    books: [
      {
        citation: 'HIBBELER, R. C. Resistência dos Materiais. Pearson.',
        chapters: 'Caps. 5, 6 e 7 (Torção, Flexão e Cisalhamento Transversal)',
        focusNote: 'Inclui seção completa sobre tubos de parede fina (Bredt) e fluxo de cisalhamento.',
      },
    ],
  },
  {
    id: 'm-dynamics-rigid',
    code: 'MEC-08',
    title: "Princípio de D'Alembert, Efeito Giroscópico e Dinâmica de Corpos Rígidos",
    englishSubtitle: "Rigid Body Dynamics: D'Alembert, Inertia Tensor & Gyroscopic Moments",
    macroArea: 'mec',
    planetId: 'solidos-materiais',
    copyAbility: 'hammer',
    unipOrigin: 'Mecânica Geral / Dinâmica dos Corpos Rígidos (UNIP)',
    petrobrasAllocation: 'Bloco I — Mecânica (Média)',
    generalConcursosRelevance: 'Petrobras, Marinha CP-CEM, Embraer/ITA, Concursos de Engenharia',
    bloomLevel: 'Análise / Aplicação',
    incidence: 'Média',
    norms: ['ISO 1940-1 (Balanceamento de Rotores Rígidos)'],
    estimatedStudyMinutes: 70,
    summary:
      'Equações de Newton-Euler no plano e espaço, Teorema dos Eixos Paralelos (Steiner), Princípio de D’Alembert, momento angular, precessão giroscópica e dinâmica de sistemas articulados.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'dalembert-gyro',
        title: "1. Newton-Euler, D'Alembert e Momento Giroscópico",
        levelTag: 'Dinâmica de Turbomáquinas & Rotores',
        contentMarkdown: `O **Princípio de D’Alembert** transforma um problema dinâmico em equilíbrio estático equivalente introduzindo forças de inércia fictícias ($-m\\mathbf{a}_G$) e conjugados de inércia ($-I_G \\boldsymbol{\\alpha}$).

Para um corpo rígido girando em torno de eixo principal com momento de inércia axial $I_z$ e velocidade angular de spin $\\boldsymbol{\\omega}_s$, quando o eixo sofre uma velocidade angular de precessão $\\boldsymbol{\\Omega}$ (ex.: turbina marítima em navio/FPSO balançando), surge um **conjugado giroscópico** perpendicular a ambos os vetores: $\\mathbf{M}_{giro} = \\boldsymbol{\\Omega} \\times (I_z \\boldsymbol{\\omega}_s)$, sobrecarregando os mancais radiais.`,
        keyEquations: [
          {
            label: 'Equações de Newton-Euler (Movimento Plano Geral)',
            latex: String.raw`\sum \mathbf{F} = m \mathbf{a}_G, \qquad \sum M_G = I_G \alpha, \qquad I = I_G + m d^2\ (\text{Steiner})`,
          },
          {
            label: 'Momento Giroscópico em Precessão Estacionária',
            latex: String.raw`\mathbf{M} = \frac{d\mathbf{H}}{dt} = \boldsymbol{\Omega} \times \mathbf{H}_s \implies M = I_z \omega_s \Omega \sin\theta`,
          },
        ],
        examPitfalls: [
          'Na aplicação de ΣM_P = I_P α em um ponto P arbitrário, isso SÓ vale diretamente se P for o centro de massa G, um ponto fixo O, ou um ponto acelerando exatamente na direção de G! Caso contrário use ΣM_P = I_G α + r_{G/P} × m a_G.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-dyn-1',
        title: 'MIT 2.003SC — Lecture 1: Motion in Moving Reference Frames',
        channel: 'MIT OpenCourseWare',
        language: 'EN',
        duration: '48 min',
        whyWatch: 'Rigor MIT em referenciais móveis, aceleração de Coriolis e cinemática vetorial.',
        youtubeId: 'GUvoVvXwoOQ',
        url: 'https://www.youtube.com/watch?v=GUvoVvXwoOQ',
        platform: 'YouTube',
      },
      {
        id: 'vid-dyn-2',
        title: 'MIT 2.003SC Engineering Dynamics — Full Course',
        channel: 'MIT OpenCourseWare',
        language: 'EN',
        duration: 'Curso completo',
        whyWatch: 'Listas resolvidas de corpos rígidos, momento angular e Lagrange.',
        url: 'https://ocw.mit.edu/courses/2-003sc-engineering-dynamics-fall-2011/',
        platform: 'MIT OCW',
      },
    ],
    books: [
      {
        citation: 'MERIAM, J. L.; KRAIGE, L. G. Dinâmica — Mecânica para Engenharia. LTC.',
        chapters: 'Caps. 6 e 7 (Cinética Plana e Tridimensional de Corpos Rígidos)',
        focusNote: 'Referência clássica para giroscópios e eixos móveis.',
      },
    ],
  },
  {
    id: 'm-materials-fe',
    code: 'MEC-09',
    title: 'Diagramas Fe-Fe₃C, Transformações TTT/CCT e Mecanismos de Endurecimento',
    englishSubtitle: 'Phase Diagrams Fe-C, TTT/CCT Curves & Strengthening Mechanisms',
    macroArea: 'mec',
    planetId: 'solidos-materiais',
    copyAbility: 'hammer',
    unipOrigin: 'Ciência dos Materiais / Metalurgia (UNIP)',
    petrobrasAllocation: 'Bloco II — Mecânica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Transpetro, BNDES, Perito, Marinha',
    bloomLevel: 'Análise / Interpretação',
    incidence: 'Crítica (Alta)',
    norms: ['ASTM A370 (Ensaios Mecânicos)', 'ASTM E112 (Tamanho de Grão)'],
    estimatedStudyMinutes: 80,
    summary:
      'Os 4 mecanismos de endurecimento (Hall-Petch, encruamento, solução sólida, precipitação de Orowan), reação eutetóide 0,77% C a 727 °C, curvas TTT/CCT, martensita (TCC) e revenimento.',
    interactiveDiagram: 'fe-c-phase-diagram',
    compendium: [
      {
        id: 'fe-c-ttt-hardening',
        title: '1. Endurecimento de Ligas, Reação Eutetóide e Martensita',
        levelTag: 'Tema Favorito em Provas de Materiais',
        contentMarkdown: `A resistência mecânica de metais depende da imposição de barreiras à movimentação de discordâncias:
1. **Refino de Grão (Hall-Petch):** $\\sigma_y = \\sigma_0 + k_y\\,d^{-1/2}$ — único mecanismo que aumenta simultaneamente **resistência mecânica E tenacidade**!
2. **Encruamento (Trabalho a Frio):** multiplicação de discordâncias (Lei de Taylor $\\tau \\propto G b \\sqrt{\\rho_d}$), reduzindo ductilidade.
3. **Solução Sólida:** átomos substitucionais ou intersticiais geram campos de tensão elástica.
4. **Endurecimento por Precipitação (Envelhecimento):** partículas coerentes bloqueiam discordâncias via corte ou contorno (loops de **Orowan**).

No diagrama **Fe-Fe₃C**, a reação eutetóide ocorre a **$727^\\circ\\text{C}$ e $0,77\\%\\text{ C}$**, decompondo austenita $\\gamma$ em perlita ($\\alpha + Fe_3C$). Resfriamentos acima da taxa crítica nas curvas CCT suprimem a difusão do carbono e formam **martensita** (rede TCC hipersaturada), que deve ser **revenida** para recuperar tenacidade.`,
        keyEquations: [
          {
            label: 'Equação de Hall-Petch (Refino de Grão)',
            latex: String.raw`\sigma_y = \sigma_0 + \frac{k_y}{\sqrt{d}}`,
          },
          {
            label: 'Reação Eutetóide Isotérmica (727 °C)',
            latex: String.raw`\gamma\ (0{,}77\%\text{ C}) \underset{\text{aquecimento}}{\overset{\text{resfriamento}}{\rightleftharpoons}} \alpha\ (0{,}022\%\text{ C}) + Fe_3C\ (6{,}67\%\text{ C})`,
          },
        ],
        examPitfalls: [
          'Regra da Alavanca em ligas hipoeutetóides (%C < 0,77%): lembre-se de distinguir "fração de ferrita total" (usando linha de 6,67% C) de "fração de ferrita proeutetóide" (usando linha eutetóide de 0,77% C)!',
          'Aço inoxidável austenítico (ex.: AISI 304/316) NÃO é temperável por formação de martensita e é não-magnético na condição recozida.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-mat-1',
        title: 'Understanding Steels and Heat Treatment',
        channel: 'The Efficient Engineer',
        language: 'EN',
        duration: '15 min',
        whyWatch: 'Animação cristalográfica brilhante do diagrama Fe-C, perlita, bainita, martensita e revenimento.',
        youtubeId: 'VRBpqM6ESrg',
        url: 'https://www.youtube.com/watch?v=VRBpqM6ESrg',
        platform: 'YouTube',
      },
      {
        id: 'vid-mat-ocw',
        title: 'MIT OCW 3.091 — Introduction to Solid-State Chemistry',
        channel: 'MIT OpenCourseWare',
        language: 'EN',
        duration: 'Curso completo',
        whyWatch: 'Fundamentação cristalina, defeitos de rede e difusão.',
        url: 'https://ocw.mit.edu/courses/3-091sc-introduction-to-solid-state-chemistry-fall-2010/',
        platform: 'MIT OCW',
      },
    ],
    books: [
      {
        citation: 'CALLISTER JR., W. D.; RETHWISCH, D. G. Ciência e Engenharia de Materiais: Uma Introdução. LTC.',
        chapters: 'Caps. 7, 9 e 10 (Discordâncias, Diagramas de Fase e Transformações de Fase)',
        focusNote: 'Bíblia das questões conceituais de Ciência dos Materiais na Petrobras.',
      },
      {
        citation: 'CHIAVERINI, V. Aços e Ferros Fundidos. ABM.',
        chapters: 'Tratamentos Térmicos e Curvas TTT/CCT',
        focusNote: 'Referência nacional cobrada em bancas brasileiras.',
      },
    ],
  },
  {
    id: 'm-mfg-welding',
    code: 'MEC-10',
    title: 'Metalurgia da Soldagem, ZTA, Carbono Equivalente e END',
    englishSubtitle: 'Welding Metallurgy, HAZ, Carbon Equivalent (CE_IIW) & NDT',
    macroArea: 'mec',
    planetId: 'solidos-materiais',
    copyAbility: 'hammer',
    unipOrigin: 'Processos de Fabricação / Tecnologia Mecânica (UNIP)',
    petrobrasAllocation: 'Bloco II — Mecânica (Alta Incidência)',
    generalConcursosRelevance: 'Petrobras, Transpetro (Dutos/Cascos), Marinha, Inspeção',
    bloomLevel: 'Compreensão / Avaliação',
    incidence: 'Alta',
    norms: ['ASME Section IX (Welding Qualifications)', 'API 1104 (Pipelines)', 'AWS D1.1'],
    estimatedStudyMinutes: 75,
    summary:
      'Regiões da Zona Termicamente Afetada (ZTA), prevenção de trincas a frio induzidas por hidrogênio, fórmula do Carbono Equivalente CE_IIW (> 0,40%), PWHT, processos SMAW/GTAW/GMAW/SAW e ensaios não destrutivos (UT, RT, LP, PM).',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'welding-zta-ce',
        title: '1. ZTA, Trincas a Frio por Hidrogênio e Carbono Equivalente',
        levelTag: 'Crítico em Dutos e Plataformas Offshore',
        contentMarkdown: `Na soldagem por fusão de aços estruturais, a **Zona Termicamente Afetada (ZTA)** não funde, mas sofre ciclos térmicos severos que alteram sua microestrutura (crescimento de grão junto à linha de fusão, região mais propensa à fragilização).

A principal patologia em aços carbono-manganês é a **trinca a frio induzida por hidrogênio** (delayed cracking), que exige simultaneamente 3 fatores:
1. Microestrutura suscetível (martensita dura na ZTA).
2. Presença de hidrogênio difusível (umidade em eletrodos básicos não ressecados).
3. Tensões residuais trativas.

Para avaliar a soldabilidade, utiliza-se o **Carbono Equivalente do IIW** ($CE_{IIW}$). Quando $CE_{IIW} > 0,40\\%$, torna-se obrigatório o **pré-aquecimento** e controle de temperatura de interpasse, frequentemente complementado por **PWHT** (tratamento térmico pós-soldagem) para alívio de tensões e revenimento da ZTA.`,
        keyEquations: [
          {
            label: 'Carbono Equivalente (Instituto Internacional de Soldagem — IIW)',
            latex: String.raw`CE_{IIW} = \%C + \frac{\%Mn}{6} + \frac{\%Cr + \%Mo + \%V}{5} + \frac{\%Ni + \%Cu}{15}`,
          },
        ],
        examPitfalls: [
          'Líquidos Penetrantes (LP) detectam apenas descontinuidades ABERTAS À SUPERFÍCIE (em qualquer material não poroso); Partículas Magnéticas (PM) detectam superficiais e subsuperficiais apenas em materiais FERROMAGNÉTICOS (não funciona em aço inox austenítico!).',
          'Ultrassom (UT) é superior à Radiografia (RT) para trincas planares perpendiculares à superfície; Radiografia é excelente para porosidades e inclusões de escória volumétricas.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-weld-1',
        title: 'Metalurgia da Soldagem — Aços Carbono, Inox e ZTA',
        channel: 'Soldador Márcio',
        language: 'PT-BR',
        duration: '18 min',
        whyWatch: 'Aplicação industrial prática de metalurgia da soldagem em campo.',
        youtubeId: 'OwHMUCm67qY',
        url: 'https://www.youtube.com/watch?v=OwHMUCm67qY',
        platform: 'YouTube',
      },
      {
        id: 'vid-weld-2',
        title: 'Soldagem a Arco Submerso (SAW) na Indústria',
        channel: 'Indústria na Prática',
        language: 'PT-BR',
        duration: '12 min',
        whyWatch: 'Mostra na prática o processo SAW de alta taxa de deposição usado em dutos e vasos.',
        youtubeId: 'dNjR1LotxWQ',
        url: 'https://www.youtube.com/watch?v=dNjR1LotxWQ',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'MARQUES, P. V.; MODENESI, P. J.; BRACARENSE, A. Q. Soldagem: Fundamentos e Tecnologia. UFMG.',
        chapters: 'Metalurgia da Soldagem e Processos a Arco',
        focusNote: 'Texto-referência universitário brasileiro para concursos.',
      },
    ],
  },
  {
    id: 'm-vib-mdof',
    code: 'MEC-11',
    title: 'Vibrações Mecânicas (1 e N GDL), Transmissibilidade e Velocidades Críticas',
    englishSubtitle: 'Mechanical Vibrations (SDOF/MDOF), Transmissibility & Rotor Dynamics',
    macroArea: 'mec',
    planetId: 'maquinas-equipamentos',
    copyAbility: 'hammer',
    unipOrigin: 'Dinâmica e Vibrações Mecânicas (UNIP)',
    petrobrasAllocation: 'Bloco II — Mecânica (Alta Incidência)',
    generalConcursosRelevance: 'Petrobras, Transpetro, Marinha CP-CEM, Manutenção Preditiva',
    bloomLevel: 'Análise / Cálculo',
    incidence: 'Alta',
    norms: ['ISO 10816 / ISO 20816 (Mechanical Vibration of Machines)', 'API 617'],
    estimatedStudyMinutes: 90,
    summary:
      'Resposta harmônica de 1 GDL, transmissibilidade e região de isolamento (ω/ωₙ > √2), problema de autovalores (det(K − ω²M) = 0) para N GDL e modelo de rotor de Jeffcott.',
    interactiveDiagram: 'vibration-transmissibility',
    compendium: [
      {
        id: 'vib-sdof-mdof-jeffcott',
        title: '1. Transmissibilidade, Sistemas MDOF e Rotor de Jeffcott',
        levelTag: 'Core Preditiva & Turbomáquinas',
        contentMarkdown: `Em máquinas rotativas (compressores centrífugos, bombas e turbinas), a equação de 1 GDL $m\\ddot{x} + c\\dot{x} + kx = F_0\\cos(\\omega t)$ define a frequência natural $\\omega_n = \\sqrt{k/m}$ e o fator de amortecimento $\\zeta = \\frac{c}{2\\sqrt{km}}$.

- **Isolamento Vibratório:** todas as curvas de **transmissibilidade** $T_r = F_T / F_0$ cruzam o valor $T_r = 1$ exatamente em $\\omega / \\omega_n = \\sqrt{2}$. Para isolar vibrações ($T_r < 1$), exige-se $\\omega / \\omega_n > \\sqrt{2}$.
- **Sistemas com N Graus de Liberdade (MDOF):** a solução de $\\det(\\mathbf{K} - \\omega^2 \\mathbf{M}) = 0$ fornece as frequências naturais $\\omega_i$ e modos ortogonais $\\boldsymbol{\\phi}_i$.
- **Rotodinâmica (Rotor de Jeffcott):** um desbalanceamento $m_u\\,e$ gera força centrífuga proporcional a $\\omega^2$. Acima da velocidade crítica ($\\omega \\gg \\omega_c$), o rotor passa a girar em torno do centro de massa (**autocentralização** com deflexão tendendo a $e$).`,
        keyEquations: [
          {
            label: 'Transmissibilidade de Força em Base Estrutural',
            latex: String.raw`T_r = \frac{F_T}{F_0} = \sqrt{ \frac{1 + \left( 2 \zeta \frac{\omega}{\omega_n} \right)^2}{\left[ 1 - \left( \frac{\omega}{\omega_n} \right)^2 \right]^2 + \left[ 2 \zeta \frac{\omega}{\omega_n} \right]^2} }`,
          },
          {
            label: 'Problema de Autovalor MDOF e Deflexão de Jeffcott',
            latex: String.raw`\det \left( \mathbf{K} - \omega^2 \mathbf{M} \right) = 0, \qquad r_d = \frac{e \left( \frac{\omega}{\omega_c} \right)^2}{\sqrt{ \left[ 1 - \left( \frac{\omega}{\omega_c} \right)^2 \right]^2 + \left[ 2 \zeta \left( \frac{\omega}{\omega_c} \right) \right]^2 }}`,
          },
        ],
        examPitfalls: [
          'Na região de isolamento (ω/ω_n > √2), AUMENTAR o amortecimento ζ AUMENTA a força transmitida à base! O amortecimento só reduz amplitude na ressonância (ω ≈ ω_n).',
          'Para sistemas subamortecidos (ζ < 1), a frequência natural amortecida é ω_d = ω_n √(1 − ζ²), enquanto o pico da ressonância harmônica (se ζ < 1/√2) ocorre ligeiramente abaixo de ω_n, em ω_n √(1 − 2ζ²).',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-vib-1',
        title: 'Aula 00 — Introdução à Vibração Mecânica',
        channel: 'Prof. Ítalo Pedrosa',
        language: 'PT-BR',
        duration: '19 min',
        whyWatch: 'Introdução clara em português à modelagem massa-mola-amortecedor e graus de liberdade.',
        youtubeId: 'goF4fm5N7iw',
        url: 'https://www.youtube.com/watch?v=goF4fm5N7iw',
        platform: 'YouTube',
      },
      {
        id: 'vid-vib-2',
        title: 'Aula 01 — Conceitos Básicos de Vibrações e Frequência Natural',
        channel: 'Prof. Ítalo Pedrosa',
        language: 'PT-BR',
        duration: '22 min',
        whyWatch: 'Dedução passo a passo das equações de movimento e associação de molas.',
        youtubeId: 'OA0AgY_6I9I',
        url: 'https://www.youtube.com/watch?v=OA0AgY_6I9I',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'RAO, S. S. Vibrações Mecânicas. 4ª ou 5ª ed. Pearson.',
        chapters: 'Caps. 2, 3, 5 e 6 (1 GDL, Vibrações Forçadas e Múltiplos GDL)',
        focusNote: 'Principal livro-texto cobrado na Cesgranrio e Cebraspe.',
      },
    ],
  },
  {
    id: 'm-turbo-pumps',
    code: 'MEC-12',
    title: 'Bombas Centrífugas, Curvas do Sistema, NPSH, Cavitação e Norma API 610',
    englishSubtitle: 'Centrifugal Pumps, System Curves, NPSH, Cavitation & API 610',
    macroArea: 'mec',
    planetId: 'maquinas-equipamentos',
    copyAbility: 'bubble',
    unipOrigin: 'Máquinas de Fluxo / Máquinas Hidráulicas (UNIP)',
    petrobrasAllocation: 'Bloco II — Mecânica (Peso Crítico)',
    generalConcursosRelevance: 'Petrobras, Transpetro (Estações de Bombeio), Marinha, Saneamento',
    bloomLevel: 'Aplicação / Projeto',
    incidence: 'Crítica (Alta)',
    norms: ['API Standard 610 (Centrifugal Pumps for Petroleum)', 'HI Standards'],
    estimatedStudyMinutes: 85,
    summary:
      'Equação de Euler para turbomáquinas, ângulo de pás (β₂ < 90°), leis de afinidade, associação em série vs. paralelo, cálculo de NPSH disponível vs. requerido, cavitação e exigências construtivas da API 610.',
    interactiveDiagram: 'pump-npsh-curve',
    compendium: [
      {
        id: 'pumps-euler-npsh-api',
        title: '1. Equação de Euler, Cavitação (NPSH), Associação e API 610',
        levelTag: 'Altíssima Cobrança Petrobras / Transpetro',
        contentMarkdown: `A transferência energética entre rotor e fluido obedece à **Equação Fundamental de Euler**: $H_t = \\frac{U_2 V_{u2} - U_1 V_{u1}}{g}$. Bombas centrífugas adotam pás **curvadas para trás** ($\\beta_2 < 90^\\circ$) para garantir curva $H \\times Q$ descendente (estabilidade operacional sem sobrecarga do motor).

- **Associação de Bombas:** Em **série**, somam-se as alturas manométricas ($H_{total} = H_1 + H_2$) para a mesma vazão $Q$. Em **paralelo**, somam-se as vazões ($Q_{total} = Q_1 + Q_2$) para a mesma altura $H$. (Atenção: devido à curva parabólica do sistema, dobrar bombas em paralelo **não dobra** a vazão real no ponto de operação!).
- **Leis de Semelhança (para mesmo rotor, variando rotação $N$):** $Q \\propto N$, $H \\propto N^2$, $P_{eixo} \\propto N^3$.
- **Cavitação e NPSH:** exige-se $NPSH_{disp} \\ge NPSH_{req} + \\text{Margem}$. A cavitação ocorre quando $P_{local} \\le P_v(T)$.
- **Norma API 610:** exige mancais dimensionados para vida útil **$L_{10h} > 25.000\\text{ horas}$** contínuas, flanges resistentes a esforços de tubulação e carcaças radialmente bipartidas em alta pressão/temperatura.`,
        keyEquations: [
          {
            label: 'Equação de Euler para Turbomáquinas',
            latex: String.raw`H_t = \frac{U_2 V_{u2} - U_1 V_{u1}}{g}`,
          },
          {
            label: 'NPSH Disponível na Sucção (Sinal + se afogada, − se sucção negativa)',
            latex: String.raw`NPSH_{disp} = \frac{P_{res} - P_v(T)}{\gamma} \pm z_s - h_{f,succao} \ge NPSH_{req} + \text{Margem}`,
          },
          {
            label: 'Leis de Afinidade (Variação de Rotação N)',
            latex: String.raw`\frac{Q_2}{Q_1} = \frac{N_2}{N_1}, \qquad \frac{H_2}{H_1} = \left(\frac{N_2}{N_1}\right)^2, \qquad \frac{\dot{W}_2}{\dot{W}_1} = \left(\frac{N_2}{N_1}\right)^3`,
          },
        ],
        examPitfalls: [
          'Ao estrangular uma válvula na RECALQUE de uma bomba centrífuga, a vazão Q cai e a altura manométrica H sobe (ao contrário de bombas de deslocamento positivo, onde fechar o recalque rompe a tubulação!). NUNCA estrangule a sucção — isso provoca cavitação imediata!',
          'Lembrar: NPSH_req depende EXCLUSIVAMENTE da bomba (e cresce com Q²); NPSH_disp depende EXCLUSIVAMENTE da instalação (sucção).',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-pump-1',
        title: 'How does a Centrifugal Pump work? (Impellers, Cavitation, NPSH)',
        channel: 'Sabin Civil Engineering (Lesics)',
        language: 'EN',
        duration: '7 min',
        whyWatch: 'Animação 3D cristalina explicando impelidor, voluta, queda de pressão no olho do rotor e cavitação.',
        youtubeId: 'BaEHVpKc-1Q',
        url: 'https://www.youtube.com/watch?v=BaEHVpKc-1Q',
        platform: 'YouTube',
      },
      {
        id: 'vid-pump-stanford',
        title: 'Fluid Mechanics / Turbomachinery — MIT OCW & Stanford Modules',
        channel: 'MIT OpenCourseWare',
        language: 'EN',
        duration: 'Módulo Completo',
        whyWatch: 'Aprofundamento analítico em triângulos de velocidades e máquinas de fluxo.',
        url: 'https://ocw.mit.edu/courses/2-25-advanced-fluid-mechanics-fall-2013/',
        platform: 'MIT OCW',
      },
    ],
    books: [
      {
        citation: 'MATTOS, E. E.; FALCO, R. Bombas Industriais. Interciência.',
        chapters: 'Caps. 2, 4, 6 e 9 (Curvas, Cavitação, Associação e Normas API 610)',
        focusNote: 'Livro brasileiro escrito por engenheiros de ponta da Petrobras — leitura indispensável!',
      },
    ],
  },
  {
    id: 'm-ic-engines',
    code: 'MEC-13',
    title: 'Motores de Combustão Interna Alternativos (Ciclos Otto, Diesel e Dual)',
    englishSubtitle: 'Internal Combustion Engines: Otto, Diesel & Dual Air-Standard Cycles',
    macroArea: 'mec',
    planetId: 'maquinas-equipamentos',
    copyAbility: 'fire',
    unipOrigin: 'Motores Térmicos / Termodinâmica II (UNIP)',
    petrobrasAllocation: 'Bloco III — Mecânica (Média)',
    generalConcursosRelevance: 'Petrobras, Transpetro (Motogeradores), Marinha, Vunesp',
    bloomLevel: 'Análise / Comparação',
    incidence: 'Média',
    norms: ['ISO 3046 (Reciprocating Internal Combustion Engines)'],
    estimatedStudyMinutes: 65,
    summary:
      'Comparação termodinâmica entre os ciclos Otto (combustão isocórica), Diesel (combustão isobárica, razão de corte r_c) e Dual (misto), pressão média efetiva (PME) e ordenamento de eficiência.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'otto-diesel-dual',
        title: '1. Ciclos Otto, Diesel e Dual — Fórmulas e Comparação',
        levelTag: 'Termodinâmica Aplicada a Motogeradores',
        contentMarkdown: `Nos ciclos padrão a ar para motores alternativos, a razão de compressão volumétrica é $r = V_{max} / V_{min}$.
- **Ciclo Otto (ignição por centelha):** adição de calor a **volume constante**. $\\eta_{Otto} = 1 - r^{1-k}$.
- **Ciclo Diesel (ignição por compressão):** adição de calor a **pressão constante**, parametrizada pela **razão de corte** $r_c = V_3 / V_2 > 1$.
- **Comparação clássica de banca:**
  1. Para uma **mesma razão de compressão $r$**, $\\eta_{Otto} > \\eta_{Dual} > \\eta_{Diesel}$.
  2. Na prática, motores Diesel operam com razões de compressão muito mais altas ($r \\approx 14\\text{ a }22$ vs. $8\\text{ a }11$ no Otto sem detonação), resultando em maior eficiência real nos Diesel estacionários!`,
        keyEquations: [
          {
            label: 'Eficiência Térmica — Otto vs. Diesel',
            latex: String.raw`\eta_{Otto} = 1 - \frac{1}{r^{k-1}}, \qquad \eta_{Diesel} = 1 - \frac{1}{r^{k-1}} \left[ \frac{r_c^k - 1}{k(r_c - 1)} \right]`,
          },
          {
            label: 'Pressão Média Efetiva (PME / MEP)',
            latex: String.raw`\text{PME} = \frac{W_{liq}}{V_{max} - V_{min}}`,
          },
        ],
        examPitfalls: [
          'Cebraspe e Cesgranrio adoram trocar a condição de comparação: "à mesma razão de compressão r", o Otto é MAIS eficiente que o Diesel porque o termo entre colchetes do Diesel é > 1. "À mesma pressão e temperatura máximas", o Diesel é mais eficiente!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-ice-1',
        title: 'Motores a Combustão Interna — Ciclos Otto e Diesel',
        channel: 'Termodinâmica UFF',
        language: 'PT-BR',
        duration: '20 min',
        whyWatch: 'Aula universitária brasileira direta ao ponto sobre diagramas P-v, T-s e razão de corte.',
        youtubeId: 'xtSm8_aBfM8',
        url: 'https://www.youtube.com/watch?v=xtSm8_aBfM8',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'ÇENGEL, Y. A.; BOLES, M. A. Termodinâmica. McGraw-Hill.',
        chapters: 'Cap. 9 (Ciclos Padrão a Ar: Otto, Diesel e Dual)',
        focusNote: 'Dedução e comparação gráfica exata cobrada nas provas.',
      },
    ],
  },
  {
    id: 'm-equip-nr13',
    code: 'MEC-14',
    title: 'Corrosão, Proteção Catódica, ASME Seção VIII e Norma NR-13',
    englishSubtitle: 'Electrochemical Corrosion, Cathodic Protection, ASME VIII & NR-13',
    macroArea: 'mec',
    planetId: 'maquinas-equipamentos',
    copyAbility: 'bubble',
    unipOrigin: 'Equipamentos Industriais / Engenharia de Integridade (UNIP + Norma)',
    petrobrasAllocation: 'Bloco III — Mecânica (Alta Incidência)',
    generalConcursosRelevance: 'Petrobras, Transpetro, BNDES, Engenharia de Segurança/Inspeção',
    bloomLevel: 'Avaliação / Aplicação',
    incidence: 'Alta',
    norms: ['ASME BPVC Section VIII Div. 1', 'NR-13 (MTb)', 'NACE SP0169'],
    estimatedStudyMinutes: 85,
    summary:
      'Mecanismos de corrosão (galvânica, pite, fresta, sob tensão - SCC), proteção catódica por anodo de sacrifício vs. corrente impressa, espessura de cascos cilíndricos ASME VIII e enquadramento de caldeiras e vasos na NR-13.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'corrosion-asme-nr13',
        title: '1. Corrosão, Vasos de Pressão (ASME VIII) e Categorização NR-13',
        levelTag: 'Gap Crítico UNIP → Obrigatório na Petrobras',
        contentMarkdown: `Em dutos e plataformas marítimas, a proteção contra corrosão eletroquímica usa **Proteção Catódica**, reduzindo o potencial do aço abaixo de $-0,85\\text{ V}$ (vs. eletrodo $Cu/CuSO_4$):
- **Anodos Galvânicos (Sacrifício):** ligas de Mg, Zn ou Al com potencial mais negativo que o aço; sem fonte externa, ideal para trechos curtos e offshore.
- **Corrente Impressa:** retificador CC força corrente através de anodos inertes (grafita, ferro-silício-cromo, MMO); ideal para longos dutos enterrados.

No dimensionamento de **vasos de pressão cilíndricos de parede fina** segundo o **ASME Seção VIII, Div. 1**, a espessura mínima $t$ usa o raio interno $R_i$, tensão admissível $S$, eficiência de junta soldada $E \\in [0,70; 1,0]$ e sobreespessura de corrosão $C_c$.

A **NR-13** classifica vasos de pressão em categorias **I a V** pelo produto $P \\cdot V$ ($P$ em MPa, $V$ em $\\text{m}^3$) e pela **Classe do Fluido** (Classe A: inflamáveis, combustíveis com $T \\ge 200^\\circ\\text{C}$, tóxicos $\\le 20\\text{ ppm}$, $H_2$, acetileno; Classe B: combustíveis $< 200^\\circ\\text{C}$, tóxicos $> 20\\text{ ppm}$; Classe C: vapor d’água e gases asfixiantes simples; Classe D: outros fluidos).`,
        keyEquations: [
          {
            label: 'Espessura Mínima de Casco Cilíndrico (ASME Seção VIII, Div. 1 — UG-27)',
            latex: String.raw`t = \frac{P R_i}{S E - 0{,}6 P} + C_c \quad (\text{tensão circunferencial}), \qquad t_{esfera} = \frac{P R_i}{2 S E - 0{,}2 P} + C_c`,
          },
          {
            label: 'Critério de Enquadramento NR-13 para Vasos de Pressão',
            latex: String.raw`P\ (\text{kPa}) \times V\ (\text{m}^3) > 8 \quad \text{OU} \quad \text{Fluidos Classe A independente de } P \cdot V`,
          },
        ],
        examPitfalls: [
          'Na fórmula ASME UG-27 para casco cilíndrico: denominador tem −0,6P para junta longitudinal (tensão circunferencial) e 2SE + 0,4P para junta circunferencial (tensão longitudinal)!',
          'Na NR-13, caldeiras Categoria A têm pressão de operação ≥ 1.960 kPa (19,98 kgf/cm²), e vasos Categoria I (maior risco) incluem Classe A com P·V ≥ 100!',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-corr-1',
        title: 'Cathodic Protection for Pipelines against Corrosion',
        channel: 'Enginyr',
        language: 'EN',
        duration: '10 min',
        whyWatch: 'Explica anodos de sacrifício vs. corrente impressa em dutos petrolíferos.',
        youtubeId: 'VErgHkqCx64',
        url: 'https://www.youtube.com/watch?v=VErgHkqCx64',
        platform: 'YouTube',
      },
      {
        id: 'vid-nr13-1',
        title: 'NR-13 — Caldeiras, Vasos de Pressão e Categorias de Risco',
        channel: 'Ruann TST / Engenharia',
        language: 'PT-BR',
        duration: '14 min',
        whyWatch: 'Resumo objetivo das exigências normativas de inspeção e categorização da NR-13.',
        youtubeId: 'Se1hJXAVlgw',
        url: 'https://www.youtube.com/watch?v=Se1hJXAVlgw',
        platform: 'YouTube',
      },
      {
        id: 'vid-nr13-2',
        title: 'Inspeção em Vasos de Pressão: NR-13 e ASME',
        channel: 'Mecsam Engenharia',
        language: 'PT-BR',
        duration: '15 min',
        whyWatch: 'Integração prática de cálculo de PMTA, prontuário e inspeção em serviço.',
        youtubeId: 'hk5KlS16XX0',
        url: 'https://www.youtube.com/watch?v=hk5KlS16XX0',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'GENTIL, V. Corrosão. 6ª ed. LTC.',
        chapters: 'Caps. 4, 15 e 16 (Corrosão Eletroquímica e Proteção Catódica)',
        focusNote: 'Obra nacional referência absoluta nas provas de corrosão da Petrobras.',
      },
      {
        citation: 'TELLES, P. C. S. Vasos de Pressão. LTC.',
        chapters: 'Dimensionamento ASME Seção VIII Div. 1',
        focusNote: 'Clássico escrito por um dos maiores especialistas brasileiros do setor de petróleo.',
      },
    ],
  },
  {
    id: 'm-maint-reliability',
    code: 'MEC-15',
    title: 'Fadiga Cíclica, Manutenção Preditiva, Confiabilidade e FMEA/FTA',
    englishSubtitle: 'Fatigue (S-N / Goodman), Reliability Engineering, RCM & FMEA',
    macroArea: 'mec',
    planetId: 'maquinas-equipamentos',
    copyAbility: 'hammer',
    unipOrigin: 'Elementos de Máquinas / Manutenção Industrial (UNIP)',
    petrobrasAllocation: 'Bloco II / III — Mecânica & Transpetro',
    generalConcursosRelevance: 'Petrobras, Transpetro, BNDES, Vunesp, FGV',
    bloomLevel: 'Análise / Aplicação',
    incidence: 'Alta',
    norms: ['ABNT NBR 5462 (Confiabilidade)', 'SAE JA1011 (RCM)'],
    estimatedStudyMinutes: 70,
    summary:
      'Curva de Wöhler (S-N), critério de Goodman modificado para tensão média não-nula, confiabilidade série/paralelo, taxa de falhas (curva da banheira), MTBF/MTTR/Disponibilidade e FMEA/RCM.',
    interactiveDiagram: 'none',
    compendium: [
      {
        id: 'fatigue-rcm-fmea',
        title: '1. Fadiga (Goodman) e Confiabilidade de Sistemas Industriais',
        levelTag: 'Manutenção Classe Mundial em Refinarias',
        contentMarkdown: `Mais de 80% das falhas em eixos e estruturas rotativas decorrem de **fadiga** sob tensões cíclicas abaixo do limite de escoamento. Aços carbono apresentam um patamar nítido chamado **limite de resistência à fadiga** ($S_e$) em torno de $10^6$ ciclos (diferente de ligas de alumínio, que não têm joelho horizontal!). Quando há tensão média trativa $\\sigma_m > 0$ e alternada $\\sigma_a$, aplica-se o **Critério de Goodman Modificado**.

Na **Engenharia de Confiabilidade (NBR 5462)**, a disponibilidade inerente relaciona Tempo Médio Entre Falhas ($MTBF$) e Tempo Médio Para Reparo ($MTTR$). Em sistemas em série, a confiabilidade global $R_{sis} = \\prod R_i$ decai rapidamente; em paralelo (redundância ativa), $R_{sis} = 1 - \\prod (1 - R_i)$.`,
        keyEquations: [
          {
            label: 'Critério de Goodman Modificado (Fadiga com Tensão Média)',
            latex: String.raw`\frac{\sigma_a}{S_e} + \frac{\sigma_m}{S_{ut}} = \frac{1}{n}`,
          },
          {
            label: 'Disponibilidade Inerente e Confiabilidade Exponencial',
            latex: String.raw`A = \frac{MTBF}{MTBF + MTTR}, \qquad R(t) = e^{-\lambda t}, \quad MTBF = \frac{1}{\lambda}`,
          },
        ],
        examPitfalls: [
          'Goodman usa S_ut (limite de resistência à TRAÇÃO última) no eixo σ_m, enquanto Soderberg usa S_y (mais conservador) e Gerber usa (σ_m / S_ut)²!',
          'Manutenção Preditiva monitora condição (vibração, termografia, ferrografia de óleo) SEM desmontar o ativo; Manutenção Preventiva atua por intervalos fixos de tempo ou ciclos.',
        ],
      },
    ],
    videos: [
      {
        id: 'vid-fat-1',
        title: 'Understanding Fatigue Failure and S-N Curves',
        channel: 'The Efficient Engineer',
        language: 'EN',
        duration: '13 min',
        whyWatch: 'Explicação visual de nucleação de trinca, curva S-N, Goodman e fatores de Marin.',
        youtubeId: 'o-6V_JoRX1g',
        url: 'https://www.youtube.com/watch?v=o-6V_JoRX1g',
        platform: 'YouTube',
      },
      {
        id: 'vid-rcm-1',
        title: 'O que é Manutenção Centrada em Confiabilidade (RCM)?',
        channel: 'ENGETELES',
        language: 'PT-BR',
        duration: '14 min',
        whyWatch: 'Terminologia exata da NBR 5462 e FMEA cobrada em provas da Petrobras e Transpetro.',
        youtubeId: 'u1QJ8p1nF9o',
        url: 'https://www.youtube.com/watch?v=u1QJ8p1nF9o',
        platform: 'YouTube',
      },
    ],
    books: [
      {
        citation: 'BUDYNAS, R. G.; NISBETT, J. K. Elementos de Máquinas de Shigley. McGraw-Hill.',
        chapters: 'Cap. 6 (Falha por Fadiga sob Carregamento Variável)',
        focusNote: 'Obra definitiva para Goodman, Soderberg e fatores modificadores de Se.',
      },
    ],
  },
];
