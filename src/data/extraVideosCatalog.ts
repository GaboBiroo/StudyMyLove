import type { VideoResource } from '../types/study';

export const EXTRA_VIDEOS_BY_MICROTOPIC: Record<string, VideoResource[]> = {
  'm-thermo-cycles': [
    {
      id: 'vid-brayton-tudelft',
      title: 'TU Delft — Gas Turbines, Brayton Cycle & Combined Heat and Power (European Energy)',
      channel: 'TU Delft OpenCourseWare',
      language: 'EN',
      duration: 'Aula Universitária',
      whyWatch:
        'Abordagem europeia (TU Delft - Holanda) para turbinas a gás offshore, ciclos regenerativos e cogeração.',
      url: 'https://ocw.tudelft.nl/courses/power-plant-technology/',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-brayton-univesp-2',
      title: 'UNIVESP — Termodinâmica: 2ª Lei, Entropia e Eficiência de Ciclos a Gás',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '28 min',
      whyWatch:
        'Dedução em português do balanço de entropia, rendimento isentrópico de compressores/turbinas e ciclo Brayton.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Termodinamica+Ciclo+Brayton+Segunda+Lei',
      platform: 'UNIVESP',
    },
  ],
  'm-thermo-rankine': [
    {
      id: 'vid-rankine-tudelft',
      title: 'TU Delft — Steam Cycles, Supercritical Rankine & Reheat Optimization',
      channel: 'TU Delft OpenCourseWare',
      language: 'EN',
      duration: 'Módulo Completo',
      whyWatch:
        'Estudo de centrais térmicas europeias de ultra-alta eficiência com reaquecimento e sangrias regenerativas.',
      url: 'https://ocw.tudelft.nl/courses/energy-from-biomass/',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-rankine-univesp-extra',
      title: 'Engenharia Termodinâmica — Ciclo Rankine Regenerativo e Com Reaquecimento (Resolução)',
      channel: 'UNIVESP / USP',
      language: 'PT-BR',
      duration: '32 min',
      whyWatch:
        'Exercícios resolvidos passo a passo com tabelas de vapor saturado/superaquecido e título na saída da turbina.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Termodinamica+Ciclo+Rankine+Regenerativo+Reaquecimento',
      platform: 'UNIVESP',
    },
  ],
  'm-fluids-ns': [
    {
      id: 'vid-fluids-imperial',
      title: 'Imperial College / Cambridge — Navier-Stokes, Boundary Layers & Pipe Turbulence',
      channel: 'Cambridge / Imperial Fluid Mechanics',
      language: 'EN',
      duration: '45 min',
      whyWatch:
        'Formulação diferencial rigorosa de Navier-Stokes, camada limite de Prandtl e transição laminar-turbulenta.',
      url: 'https://www.youtube.com/results?search_query=Imperial+College+Fluid+Mechanics+Navier+Stokes+Boundary+Layer',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-fluids-univesp-darcy',
      title: 'UNIVESP — Mecânica dos Fluidos: Perda de Carga, Darcy-Weisbach e Diagrama de Moody',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '26 min',
      whyWatch:
        'Aplicação direta da equação de energia e cálculo de perda de carga distribuída e localizada em tubulações.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Mecanica+dos+Fluidos+Perda+de+Carga+Moody',
      platform: 'UNIVESP',
    },
  ],
  'm-fluids-laval': [
    {
      id: 'vid-laval-tudelft',
      title: 'TU Delft Aerospace — Compressible Flows, De Laval Nozzles & Normal Shock Waves',
      channel: 'TU Delft Aerospace Engineering',
      language: 'EN',
      duration: '40 min',
      whyWatch:
        'Referência europeia em aerodinâmica compressível (ESA/Airbus): escoamento blocante (choked flow) e ondas de choque.',
      url: 'https://ocw.tudelft.nl/courses/aerodynamics/',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-laval-ptbr',
      title: 'Escoamento Compressível — Número de Mach, Estagnação e Bocal Convergente-Divergente',
      channel: 'Engenharia Mecânica — Fenômenos de Transporte',
      language: 'PT-BR',
      duration: '25 min',
      whyWatch:
        'Explicação em português da relação área-velocidade de Hugoniot e condição crítica M = 1 na garganta.',
      url: 'https://www.youtube.com/results?search_query=Escoamento+Compressivel+Bocal+Convergente+Divergente+Mach',
      platform: 'YouTube',
    },
  ],
  'm-heat-transfer': [
    {
      id: 'vid-heat-ethz',
      title: 'ETH Zürich / TU Delft — Heat & Mass Transfer: Conduction, Convection & Exchangers',
      channel: 'ETH Zürich / TU Delft Transport Phenomena',
      language: 'EN',
      duration: 'Módulo Completo',
      whyWatch:
        'Análise adimensional (Nu, Re, Pr), resistência térmica crítica e métodos LMTD e ε-NTU em trocadores industriais.',
      url: 'https://ocw.tudelft.nl/courses/transport-phenomena/',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-heat-univesp-trocadores',
      title: 'UNIVESP — Transferência de Calor: Trocadores de Calor (MLDT e Efetividade-NTU)',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '29 min',
      whyWatch:
        'Comparação prática entre contracorrente e correntes paralelas e quando usar ε-NTU vs MLDT nas provas.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Transferencia+de+Calor+Trocadores+de+Calor+NTU',
      platform: 'UNIVESP',
    },
  ],
  'm-solids-mohr': [
    {
      id: 'vid-mohr-imperial',
      title: 'Solid Mechanics (Europe / CEng Benchmark) — 3D Stress Tensor, Mohr Circle & von Mises Yield',
      channel: 'European Structural Mechanics Lectures',
      language: 'EN',
      duration: '38 min',
      whyWatch:
        'Demonstração geométrica e tensorial do Círculo de Mohr e comparação entre elipse de von Mises e hexágono de Tresca.',
      url: 'https://www.youtube.com/results?search_query=Mohr+Circle+Von+Mises+Tresca+Yield+Criteria+Lecture',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-mohr-univesp-2',
      title: 'UNIVESP — Resistência dos Materiais: Estado Plano de Tensões e Círculo de Mohr',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '30 min',
      whyWatch:
        'Passo a passo em português para encontrar tensões principais σ1, σ2 e cisalhamento máximo τmax sem errar sinal.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Resistencia+dos+Materiais+Circulo+de+Mohr',
      platform: 'UNIVESP',
    },
  ],
  'm-solids-torsion': [
    {
      id: 'vid-torsion-eurocode',
      title: 'TU Delft Structural Mechanics — Bending, Shear, Torsion & Euler Buckling (Eurocode 3)',
      channel: 'TU Delft OpenCourseWare',
      language: 'EN',
      duration: 'Módulo Completo',
      whyWatch:
        'Abordagem europeia (Eurocode 3) para flambagem de colunas, flexão composta e torção de eixos de transmissão.',
      url: 'https://ocw.tudelft.nl/courses/structural-mechanics/',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-torsion-univesp-flambagem',
      title: 'UNIVESP — Resistência dos Materiais: Torção em Eixos e Flambagem de Euler',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '27 min',
      whyWatch:
        'Dedução de τ = Tr/J, linha elástica de vigas e comprimentos efetivos de flambagem Le = K·L.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Resistencia+dos+Materiais+Flambagem+Euler+Torcao',
      platform: 'UNIVESP',
    },
  ],
  'm-dynamics-rigid': [
    {
      id: 'vid-dyn-ethz',
      title: 'ETH Zürich / MIT — 3D Rigid Body Dynamics, Coriolis Acceleration & Gyroscopic Precession',
      channel: 'ETH Zürich / MIT Mechanics',
      language: 'EN',
      duration: '48 min',
      whyWatch:
        'Referência para seleção da ESA e indústria aeroespacial europeia em cinemática em referenciais móveis e giroscópios.',
      url: 'https://www.youtube.com/results?search_query=Rigid+Body+Dynamics+Coriolis+Gyroscopic+Precession+Lecture',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-dyn-univesp',
      title: 'UNIVESP — Mecânica Geral: Cinemática e Dinâmica do Corpo Rígido (Centro Instantâneo)',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '28 min',
      whyWatch:
        'Resolução de mecanismos planos pelo Centro Instantâneo de Rotação (CIR) e teorema do trabalho-energia.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Mecanica+Geral+Corpo+Rigido+Centro+Instantaneo',
      platform: 'UNIVESP',
    },
  ],
  'm-materials-fe': [
    {
      id: 'vid-mat-cambridge',
      title: 'Cambridge Materials Science — Fe-Fe3C Phase Diagram, TTT Curves & Fracture Toughness KIC',
      channel: 'Cambridge / Imperial Materials Engineering',
      language: 'EN',
      duration: '42 min',
      whyWatch:
        'Metalurgia física de aços carbono e inoxidáveis, curvas TTT/CCT, têmpera, revenimento e mecânica da fratura de Griffith-Irwin.',
      url: 'https://www.youtube.com/results?search_query=Fe+Fe3C+Phase+Diagram+TTT+Curve+Fracture+Toughness+Lecture',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-mat-univesp-ttt',
      title: 'UNIVESP — Ciência dos Materiais: Diagrama Ferro-Carbono, Regra da Alavanca e Tratamentos Térmicos',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '31 min',
      whyWatch:
        'Cálculo da fração de perlita e cementita/ferrita proeutetoide e diferença entre austenita, bainita e martensita.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Ciencia+dos+Materiais+Diagrama+Ferro+Carbono+TTT',
      platform: 'UNIVESP',
    },
  ],
  'm-mfg-welding': [
    {
      id: 'vid-weld-iiw',
      title: 'European Welding Federation (EWF / IIW) — Metallurgy of Welding, Carbon Equivalent & NDT (EN ISO)',
      channel: 'IIW / European Welding Engineering',
      language: 'EN',
      duration: '36 min',
      whyWatch:
        'Padrão internacional/europeu (IWE / EN ISO 15614 / ASME IX) de aporte térmico, carbono equivalente e trincas a frio por hidrogênio.',
      url: 'https://www.youtube.com/results?search_query=Welding+Metallurgy+Heat+Affected+Zone+Carbon+Equivalent+NDT',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-weld-univesp-usinagem',
      title: 'UNIVESP — Processos de Fabricação: Soldagem (SMAW, GMAW, GTAW, SAW) e Equação de Taylor',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '29 min',
      whyWatch:
        'Revisão completa dos processos de soldagem a arco, ensaios não destrutivos (END) e vida de ferramenta de usinagem.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Processos+de+Fabricacao+Soldagem+Usinagem+Taylor',
      platform: 'UNIVESP',
    },
  ],
  'm-vib-mdof': [
    {
      id: 'vid-vib-tudelft',
      title: 'TU Delft / ETH — Mechanical Vibrations: Modal Analysis, Transmissibility & Rotor Critical Speed',
      channel: 'TU Delft Dynamics & Vibrations',
      language: 'EN',
      duration: '44 min',
      whyWatch:
        'Isolamento de vibrações (r > √2), autovalores de sistemas de 2 GDL, absorvedor dinâmico de Frahm e rotor de Laval/Jeffcott.',
      url: 'https://www.youtube.com/results?search_query=Mechanical+Vibrations+Transmissibility+2DOF+Modal+Analysis+Lecture',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-vib-univesp',
      title: 'UNIVESP — Vibrações Mecânicas: Sistemas Amortecidos, Ressonância e Isolamento de Máquinas',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '28 min',
      whyWatch:
        'Dedução de ωd = ωn√(1-ζ²), decremento logarítmico e transmissibilidade de força em bases de máquinas rotativas.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Vibracoes+Mecanicas+Amortecimento+Transmissibilidade',
      platform: 'UNIVESP',
    },
  ],
  'm-turbo-pumps': [
    {
      id: 'vid-pump-equinor',
      title: 'TU Delft / Offshore Engineering — Centrifugal Pumps, Affinity Laws, NPSH & Compressor Surge (API 610/617)',
      channel: 'European Turbomachinery & Offshore Lectures',
      language: 'EN',
      duration: '39 min',
      whyWatch:
        'Foco em plataformas do Mar do Norte e FPSOs: cavitação, leis de semelhança (Q ∝ N, H ∝ N², P ∝ N³) e controle anti-surge.',
      url: 'https://www.youtube.com/results?search_query=Centrifugal+Pump+NPSH+Affinity+Laws+Compressor+Surge+Control',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-pump-univesp',
      title: 'UNIVESP — Máquinas de Fluxo: Bombas Centrífugas, Associação Série/Paralelo e NPSH Disponível',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '30 min',
      whyWatch:
        'Resolução de exercícios de altura manométrica, cavitação e ponto de operação da bomba com a curva do sistema.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Maquinas+de+Fluxo+Bombas+Centrifugas+NPSH',
      platform: 'UNIVESP',
    },
  ],
  'm-ic-engines': [
    {
      id: 'vid-ice-rwth',
      title: 'RWTH Aachen / ETH — Internal Combustion Engines (Otto, Diesel, Dual) & Vapor Compression Refrigeration',
      channel: 'European Automotive & Thermal Engineering',
      language: 'EN',
      duration: '41 min',
      whyWatch:
        'Comparação termodinâmica entre ciclos Otto, Diesel e Sabathé/Dual, além de COP de refrigeração e psicrometria.',
      url: 'https://www.youtube.com/results?search_query=Otto+Diesel+Dual+Cycle+Thermodynamics+Vapor+Compression+COP',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-ice-univesp',
      title: 'UNIVESP — Refrigeração por Compressão de Vapor, COP e Carta Psicrométrica',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '27 min',
      whyWatch:
        'Cálculo de carga térmica, coeficiente de performance (COP_R e COP_BC) e processos na carta psicrométrica.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Refrigeracao+Compressao+de+Vapor+Psicrometria+COP',
      platform: 'UNIVESP',
    },
    {
      id: 'vid-ice-nptel-engines',
      title: 'NPTEL / IIT — IC Engines & Gas Turbines: Otto, Diesel, Dual Cycles & Volumetric Efficiency',
      channel: 'NPTEL Mechanical Engineering',
      language: 'EN',
      duration: '46 min',
      whyWatch:
        'Dedução completa da pressão média efetiva (PME/BMEP), rendimento térmico Otto vs Diesel e relação de corte rc.',
      url: 'https://www.youtube.com/results?search_query=NPTEL+IC+Engines+Otto+Diesel+Dual+Cycle+Mean+Effective+Pressure',
      platform: 'NPTEL',
    },
  ],
  'm-equip-nr13': [
    {
      id: 'vid-vessel-ped',
      title: 'Pressure Vessel & Piping Design — ASME Section VIII Div. 1, ASME B31.3 & European PED (EN 13445)',
      channel: 'Process Equipment & Piping Engineering',
      language: 'EN',
      duration: '43 min',
      whyWatch:
        'Comparação técnica entre ASME VIII Div. 1 (UG-27), B31.3, API 650 e a Diretiva Europeia de Equipamentos sob Pressão (PED 2014/68/EU / EN 13445).',
      url: 'https://www.youtube.com/results?search_query=ASME+Section+VIII+UG-27+Pressure+Vessel+Design+EN+13445',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-vessel-nr13-ptbr',
      title: 'NR-13 Completa para Concursos Petrobras — Categorias de Vasos, PMTA, Inspeção e TEMA',
      channel: 'Engenharia Mecânica para Concursos',
      language: 'PT-BR',
      duration: '35 min',
      whyWatch:
        'Resumo focado nos itens mais cobrados pela Cesgranrio e Cebraspe sobre NR-13, espessura mínima e trocadores TEMA (AEU, BEM, AES).',
      url: 'https://www.youtube.com/results?search_query=NR+13+Vasos+de+Pressao+Caldeiras+Petrobras+ASME+VIII',
      platform: 'YouTube',
    },
  ],
  'm-maint-reliability': [
    {
      id: 'vid-rel-en13306',
      title: 'European Maintenance Standard EN 13306 & ISO 55000 — RAMS Analysis (Weibull, MTBF, MTTR & FMEA)',
      channel: 'European Reliability & Asset Management',
      language: 'EN',
      duration: '37 min',
      whyWatch:
        'Engenharia de confiabilidade RAMS (Reliability, Availability, Maintainability, Safety) exigida no CERN, ferroviário europeu e óleo & gás.',
      url: 'https://www.youtube.com/results?search_query=Reliability+Engineering+Weibull+MTBF+MTTR+Availability+RCM',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-rel-univesp',
      title: 'UNIVESP — Gestão da Manutenção: Confiabilidade R(t), Curva da Banheira, MTBF, MTTR e Disponibilidade',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '26 min',
      whyWatch:
        'Cálculo rápido de disponibilidade inerente A = MTBF/(MTBF+MTTR), confiabilidade série/paralelo e manutenção preditiva.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Engenharia+de+Manutencao+MTBF+MTTR+Confiabilidade',
      platform: 'UNIVESP',
    },
  ],
  'e-em-maxwell': [
    {
      id: 'vid-em-cern',
      title: 'CERN / ETH Zürich — Electrodynamics, RF Cavities, Poynting Theorem & Skin Depth in Conductors',
      channel: 'CERN Academic Training / ETH',
      language: 'EN',
      duration: '46 min',
      whyWatch:
        'Aplicação das Equações de Maxwell, efeito pelicular e ondas eletromagnéticas em aceleradores e sistemas de alta potência do CERN.',
      url: 'https://www.youtube.com/results?search_query=Maxwell+Equations+Poynting+Vector+Skin+Depth+Electromagnetics+Lecture',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-em-univesp',
      title: 'UNIVESP — Eletromagnetismo: Equações de Maxwell, Corrente de Deslocamento e Ondas Planas',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '30 min',
      whyWatch:
        'Explicação clara em português das 4 leis de Maxwell na forma diferencial e integral e penetração pelicular.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Eletromagnetismo+Equacoes+de+Maxwell+Ondas',
      platform: 'UNIVESP',
    },
  ],
  'e-circuits-ac3': [
    {
      id: 'vid-ac3-tudelft',
      title: 'TU Delft Electrical Power — Three-Phase Systems, Phasor Diagrams & Reactive Power Compensation',
      channel: 'TU Delft Electrical Engineering',
      language: 'EN',
      duration: '38 min',
      whyWatch:
        'Análise de sistemas trifásicos equilibrados e desequilibrados, método dos dois wattímetros de Blondel e bancos capacitivos Δ/Y.',
      url: 'https://ocw.tudelft.nl/courses/electrical-power-engineering/',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-ac3-univesp',
      title: 'UNIVESP — Circuitos Elétricos: Sistemas Trifásicos (Estrela-Triângulo) e Correção de Fator de Potência',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '32 min',
      whyWatch:
        'Resolução detalhada em português de circuitos trifásicos, potência complexa S = P + jQ e bancos de capacitores.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Circuitos+Trifasicos+Fator+de+Potencia+Thevenin',
      platform: 'UNIVESP',
    },
  ],
  'e-mach-mit': [
    {
      id: 'vid-mit-imperial',
      title: 'Imperial College / TU Delft — Three-Phase Transformers (Vector Groups Dy11/Yd1) & Induction Motors',
      channel: 'European Electrical Machines Lectures',
      language: 'EN',
      duration: '42 min',
      whyWatch:
        'Grupos de ligação IEC 60076 (Dy11, Yd1, Yy0), ensaios a vazio e curto-circuito e curva conjugado-escorregamento de Kloss.',
      url: 'https://www.youtube.com/results?search_query=Three+Phase+Transformer+Vector+Groups+Induction+Motor+Equivalent+Circuit',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-mit-univesp',
      title: 'UNIVESP — Conversão Eletromecânica: Transformadores e Motores de Indução Trifásicos (MIT)',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '33 min',
      whyWatch:
        'Balanço de potência no entreferro (Pcu2 = s·Pgap e Pconv = (1-s)·Pgap) e variação da relação V/f.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Conversao+Eletromecanica+Motor+de+Inducao+Transformador',
      platform: 'UNIVESP',
    },
  ],
  'e-mach-sync': [
    {
      id: 'vid-sync-entsoe',
      title: 'ETH Zürich / ENTSO-E Grid — Synchronous Generators, Power-Angle Curve, V-Curves & Droop Control',
      channel: 'European Power Systems & Grid Stability',
      language: 'EN',
      duration: '40 min',
      whyWatch:
        'Controle primário frequência-potência (estatismo R) e tensão-reativo no sistema interligado europeu (50 Hz) e plataformas offshore.',
      url: 'https://www.youtube.com/results?search_query=Synchronous+Generator+Power+Angle+Curve+V+Curves+Droop+Control',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-sync-univesp',
      title: 'UNIVESP — Máquinas Síncronas: Curva de Capabilidade, Curvas V e Paralelismo de Geradores',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '29 min',
      whyWatch:
        'Entendimento visual da subexcitação vs sobre-excitação (compensador síncrono) e divisão de carga entre geradores em paralelo.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Maquinas+Sincronas+Gerador+Sincrono+Curvas+V',
      platform: 'UNIVESP',
    },
  ],
  'e-sep-fortescue': [
    {
      id: 'vid-fortescue-iec60909',
      title: 'Power System Fault Analysis (IEC 60909 & IEEE) — Per-Unit System, Symmetrical Components & Faults',
      channel: 'European Power System Protection',
      language: 'EN',
      duration: '45 min',
      whyWatch:
        'Cálculo de curto-circuito simétrico e assimétrico segundo a norma europeia IEC 60909 e Teorema de Fortescue (Z1, Z2, Z0).',
      url: 'https://www.youtube.com/results?search_query=Symmetrical+Components+Fortescue+Unsymmetrical+Fault+Analysis+Per+Unit',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-fortescue-univesp',
      title: 'Sistemas de Potência em Português — Valores por Unidade (p.u.), Fortescue e Curto Fase-Terra',
      channel: 'Engenharia Elétrica — Sistemas de Potência',
      language: 'PT-BR',
      duration: '34 min',
      whyWatch:
        'Mudança de base em p.u., influência do aterramento Yn-Δ na sequência zero e cálculo de Icc monofásico (3Ia1).',
      url: 'https://www.youtube.com/results?search_query=Sistemas+de+Potencia+Componentes+Simetricas+Fortescue+Curto+Circuito',
      platform: 'YouTube',
    },
  ],
  'e-sep-lines': [
    {
      id: 'vid-lines-hvdc-europe',
      title: 'TU Delft / North Sea Wind — Transmission Lines (SIL, Ferranti), Power Flow & Offshore HVDC Grids',
      channel: 'TU Delft High Voltage & Power Systems',
      language: 'EN',
      duration: '41 min',
      whyWatch:
        'Impedância característica Zc, potência natural (SIL), efeito Ferranti e transmissão submarina para parques eólicos e plataformas no Mar do Norte.',
      url: 'https://www.youtube.com/results?search_query=Transmission+Line+Surge+Impedance+Loading+Ferranti+Effect+Newton+Raphson',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-lines-ptbr',
      title: 'Linhas de Transmissão & Fluxo de Potência — Efeito Ferranti, Modelo π e Newton-Raphson (PV, PQ, Vθ)',
      channel: 'Sistemas Elétricos de Potência (SEP)',
      language: 'PT-BR',
      duration: '31 min',
      whyWatch:
        'Revisão direta para provas da Petrobras/Eletrobras/ONS sobre tipos de barras e Jacobiana do fluxo de carga.',
      url: 'https://www.youtube.com/results?search_query=Linhas+de+Transmissao+Efeito+Ferranti+Fluxo+de+Potencia+Newton+Raphson',
      platform: 'YouTube',
    },
  ],
  'e-prot-nr10': [
    {
      id: 'vid-prot-iec60364',
      title: 'IEC 60364 / NBR 5410 & ANSI Protection — Earthing Schemes (TN-S, TN-C-S, TT, IT) & Relay Coordination',
      channel: 'IEC & IEEE Electrical Protection',
      language: 'EN',
      duration: '38 min',
      whyWatch:
        'Harmonia entre a norma internacional/europeia IEC 60364 e a NBR 5410 nos esquemas de aterramento e proteção ANSI (50/51, 87, 21, 67).',
      url: 'https://www.youtube.com/results?search_query=IEC+60364+Earthing+Systems+TN-S+TT+IT+ANSI+Relay+Numbers+87+50+51',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-prot-nr10-ptbr',
      title: 'NR-10, NBR 5410 e NBR 14039 para Concursos — Esquemas TN/TT/IT, Zona Controlada/Livre e LOTO',
      channel: 'Engenharia Elétrica para Concursos',
      language: 'PT-BR',
      duration: '36 min',
      whyWatch:
        'Foco total nas pegadinhas de NR-10 (raios Rr e Rc), bloqueio e etiquetagem (LOTO) e seletividade de relés.',
      url: 'https://www.youtube.com/results?search_query=NR+10+NBR+5410+Aterramento+TN+TT+IT+Concurso+Petrobras',
      platform: 'YouTube',
    },
  ],
  'e-prot-ex': [
    {
      id: 'vid-atex-iec60079',
      title: 'European ATEX Directive 2014/34/EU & IEC 60079 — Hazardous Areas (Zones 0/1/2, Ex d, Ex e, Ex i, EPL)',
      channel: 'ATEX & IECEx Hazardous Area Engineering',
      language: 'EN',
      duration: '35 min',
      whyWatch:
        'Essencial tanto para a Petrobras (ABNT NBR IEC 60079) quanto para processos seletivos offshore europeus (ATEX / IECEx).',
      url: 'https://www.youtube.com/results?search_query=ATEX+IEC+60079+Hazardous+Areas+Zone+0+1+2+Ex+d+Ex+i+EPL',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-atex-ptbr',
      title: 'Atmosferas Explosivas (NBR IEC 60079) — Zonas 0, 1 e 2, Grupos IIA/IIB/IIC, Classe T1–T6 e Tipos Ex',
      channel: 'Engenharia Elétrica & Instrumentação Offshore',
      language: 'PT-BR',
      duration: '29 min',
      whyWatch:
        'Como diferenciar Ex d (à prova de explosão), Ex i (segurança intrínseca), Ex e (segurança aumentada) e Ex p nas provas.',
      url: 'https://www.youtube.com/results?search_query=Atmosferas+Explosivas+NBR+IEC+60079+Ex+d+Ex+i+Petrobras',
      platform: 'YouTube',
    },
  ],
  'e-pe-converters': [
    {
      id: 'vid-pe-ethz',
      title: 'ETH Zürich / RWTH Aachen — Power Electronics: Buck, Boost, 6-Pulse Rectifiers & PWM Inverters (THD)',
      channel: 'ETH Zürich Power Electronic Systems',
      language: 'EN',
      duration: '44 min',
      whyWatch:
        'Dedução de equilíbrio volt-segundo no indutor, retificador trifásico de 6 pulsos (Vd = 1,35·VLL·cosα) e inversores VFD.',
      url: 'https://www.youtube.com/results?search_query=Power+Electronics+Buck+Boost+Converter+Three+Phase+Rectifier+PWM+Lecture',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-pe-univesp',
      title: 'UNIVESP — Eletrônica de Potência: Conversores CC-CC (Buck/Boost), Retificadores e Inversores PWM',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '31 min',
      whyWatch:
        'Explicação passo a passo das razões cíclicas D, harmônicos característicos h = 6k ± 1 e acionamento de motores.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Eletronica+de+Potencia+Conversor+Buck+Boost+Inversor',
      platform: 'UNIVESP',
    },
  ],
  'e-ctrl-freq': [
    {
      id: 'vid-ctrl-ethz',
      title: 'ETH Zürich / ESA Control Systems — PID Tuning, Routh-Hurwitz, Root Locus, Bode & Nyquist Stability',
      channel: 'ETH Zürich Dynamic Systems & Control',
      language: 'EN',
      duration: '47 min',
      whyWatch:
        'Critérios de estabilidade de Routh-Hurwitz e Nyquist, margens de ganho/fase em Bode e erro estacionário (Kp, Kv, Ka).',
      url: 'https://www.youtube.com/results?search_query=Control+Systems+Routh+Hurwitz+Bode+Gain+Phase+Margin+PID+Lecture',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-ctrl-univesp',
      title: 'UNIVESP — Sistemas de Controle: Critério de Routh-Hurwitz, Lugar das Raízes, Diagrama de Bode e PID',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '33 min',
      whyWatch:
        'Aulas em português cobrindo tipo do sistema (polos na origem), erro em regime permanente e compensadores avanço/atraso.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Sistemas+de+Controle+Routh+Hurwitz+Diagrama+de+Bode+PID',
      platform: 'UNIVESP',
    },
  ],
  'g-math-laplace': [
    {
      id: 'vid-math-cambridge',
      title: 'Cambridge / Oxford Engineering Mathematics — Vector Calculus (Gauss/Stokes), PDEs, Laplace & Linear Algebra',
      channel: 'Oxford / Cambridge Mathematical Methods',
      language: 'EN',
      duration: '45 min',
      whyWatch:
        'Teoremas de Gauss e Stokes, autovalores/autovetores (traço e determinante) e Transformada de Laplace com valor final.',
      url: 'https://www.youtube.com/results?search_query=Engineering+Mathematics+Divergence+Stokes+Theorem+Laplace+Transform+Eigenvalues',
      platform: 'Imperial / Cambridge',
    },
    {
      id: 'vid-math-univesp',
      title: 'UNIVESP — Cálculo Vetorial, Equações Diferenciais, Transformada de Laplace e Álgebra Linear',
      channel: 'UNIVESP',
      language: 'PT-BR',
      duration: '34 min',
      whyWatch:
        'Revisão completa em português de divergente, rotacional, EDOs de 2ª ordem e propriedades de autovalores.',
      url: 'https://www.youtube.com/results?search_query=UNIVESP+Calculo+Vetorial+Transformada+de+Laplace+Autovalores',
      platform: 'UNIVESP',
    },
  ],
  'b-pt-cesgranrio': [
    {
      id: 'vid-pt-cesgranrio-2',
      title: 'Português Focado na Banca Cesgranrio (Petrobras / Transpetro / BNDES) — Crase, Regência e Reescritura',
      channel: 'Português para Concursos de Engenharia',
      language: 'PT-BR',
      duration: '42 min',
      whyWatch:
        'Resolução de provas recentes da Cesgranrio comentando conectivos concessivos/adversativos, voz passiva e pontuação.',
      url: 'https://www.youtube.com/results?search_query=Portugues+Cesgranrio+Petrobras+Questoes+Comentadas+Crase+Conectivos',
      platform: 'YouTube',
    },
    {
      id: 'vid-pt-fgv-cebraspe',
      title: 'Português FGV & Cebraspe — Coesão Referencial, Anáfora/Catáfora e Interpretação Lógica',
      channel: 'Língua Portuguesa — Bancas de Concurso',
      language: 'PT-BR',
      duration: '35 min',
      whyWatch:
        'Estratégias para não cair nas pegadinhas de reescritura e substituição de conjunções da FGV e do Cebraspe.',
      url: 'https://www.youtube.com/results?search_query=Portugues+FGV+Cebraspe+Reescritura+Conectivos+Coesao',
      platform: 'YouTube',
    },
  ],
  'b-en-tech': [
    {
      id: 'vid-en-epso-eu',
      title: 'EPSO / European Institutions & Offshore Engineering — Technical English & Verbal Reasoning Strategies',
      channel: 'European Selection & Technical English',
      language: 'EN',
      duration: '30 min',
      whyWatch:
        'Leitura analítica de normas em inglês (ASME/API/IEC/ISO) e raciocínio verbal em inglês para processos europeus (EPSO/CERN/ESA).',
      url: 'https://www.youtube.com/results?search_query=EPSO+Verbal+Reasoning+Technical+English+Engineering+Standards',
      platform: 'TU Delft / ETH',
    },
    {
      id: 'vid-en-petrobras-cesgranrio',
      title: 'Inglês Técnico para Petrobras e Transpetro (Banca Cesgranrio) — Resolução de Textos de Óleo, Gás e Energia',
      channel: 'Inglês para Concursos Petrobras',
      language: 'PT-BR',
      duration: '38 min',
      whyWatch:
        'Vocabulário recorrente de engenharia (yield, clearance, surge, tripping, commissioning, shall vs should) e falsos cognatos.',
      url: 'https://www.youtube.com/results?search_query=Ingles+Tecnico+Cesgranrio+Petrobras+Questoes+Resolvidas',
      platform: 'YouTube',
    },
  ],
};
