import type { FlashcardItem } from '../types/study';

export const FLASHCARDS_BANK: FlashcardItem[] = [
  // MEC-01 Brayton
  {
    id: 'fc-mec-01-1',
    microtopicId: 'm-thermo-cycles',
    promptMarkdown: 'Qual é o critério algébrico exato (em função de $T_1, T_3, k$) para que um regenerador perfeito **aumente** a eficiência do ciclo Brayton?',
    answerMarkdown: '$$r_p < \\left(\\frac{T_3}{T_1}\\right)^{\\frac{k}{2(k-1)}}$$ Para $T_3/T_1 = 4$ e $k=1,4$, $r_{p,crit} = 4^{1,75} \\approx 11,31$. Acima desse limite, $T_2 > T_4$ e o regenerador prejudica o ciclo.',
    derivationHint: 'Iguale η_regen = 1 - (T₁/T₃)r_p^{(k-1)/k} > η_simples = 1 - r_p^{-(k-1)/k}.',
    tags: ['Termodinâmica', 'Brayton', 'Cebraspe'],
  },
  {
    id: 'fc-mec-01-2',
    microtopicId: 'm-thermo-cycles',
    promptMarkdown: 'Enuncie a equação da **exergia de fluxo** ($\\psi$) e o Teorema de **Gouy-Stodola** ($\\dot{I}$).',
    answerMarkdown: '$$\\psi = (h - h_0) - T_0(s - s_0) + \\frac{V^2}{2} + g z, \\qquad \\dot{I} = T_0 \\dot{S}_{ger}$$',
    derivationHint: 'Referencia o estado atual ao estado morto (P₀, T₀).',
    tags: ['Exergia', 'Segunda Lei'],
  },

  // MEC-02 Rankine
  {
    id: 'fc-mec-02-1',
    microtopicId: 'm-thermo-rankine',
    promptMarkdown: 'Por que plantas Rankine de alta pressão usam **reaquecimento intermediário** entre as turbinas de AP e BP?',
    answerMarkdown: 'Principalmente para **elevar o título $x$ do vapor** na saída da turbina de baixa pressão (evitando erosão de pás por gotículas de líquido, mantendo $x > 0,88$) e elevar a temperatura média de adição de calor.',
    derivationHint: 'Observe o deslocamento para a direita no diagrama T-s dentro do domo de saturação.',
    tags: ['Rankine', 'Turbinas a Vapor'],
  },
  {
    id: 'fc-mec-02-2',
    microtopicId: 'm-thermo-rankine',
    promptMarkdown: 'Escreva o balanço de energia no aquecedor de mistura aberto (FWH) com fração sangrada $y$ e entalpias $h_2$ (sangria), $h_5$ (subresfriado da bomba 1) e $h_6$ (saída saturada).',
    answerMarkdown: '$$y\\,h_2 + (1-y)\\,h_5 = 1\\cdot h_6 \\implies y = \\frac{h_6 - h_5}{h_2 - h_5}$$',
    derivationHint: 'Fluxo total saindo na mistura é 1 kg (soma de y + (1-y)).',
    tags: ['Regeneração', 'Cálculo'],
  },

  // MEC-03 Fluids
  {
    id: 'fc-mec-03-1',
    microtopicId: 'm-fluids-ns',
    promptMarkdown: 'Qual o valor exato do coeficiente de energia cinética $\\alpha$ e do fator de atrito de Darcy $f$ em escoamento laminar plenamente desenvolvido em duto circular?',
    answerMarkdown: '$$\\alpha = 2,0 \\quad (\\text{perfil parabólico}) \\qquad f = \\frac{64}{Re}$$ Logo $h_f \\propto V$ (linear na velocidade e independente da rugosidade!).',
    derivationHint: 'Em turbulento α ≈ 1,05 e f depende de Re e ε/D (Colebrook-White).',
    tags: ['Fluidos', 'Laminar'],
  },
  {
    id: 'fc-mec-03-2',
    microtopicId: 'm-fluids-ns',
    promptMarkdown: 'Qual a relação entre o fator de atrito de **Darcy ($f_D$)** e o fator de atrito de **Fanning ($f_F$)**?',
    answerMarkdown: '$$f_{Darcy} = 4 \\cdot f_{Fanning}$$ Na equação $h_f = f \\frac{L}{D} \\frac{V^2}{2g}$ usa-se o de **Darcy** (por isso $64/Re$ em Darcy equivale a $16/Re$ em Fanning!).',
    derivationHint: 'Cuidado clássico em provas com diagramas de Moody vs. literatura química.',
    tags: ['Darcy-Weisbach', 'Armadilha'],
  },

  // MEC-04 Laval
  {
    id: 'fc-mec-04-1',
    microtopicId: 'm-fluids-laval',
    promptMarkdown: 'Em um bocal de Laval escoando ar ($k=1,4$) bloqueado ($M=1$ na garganta), quanto vale a razão crítica $P^*/P_0$ e o que ocorre com $M, P, T$ e $P_0$ após uma onda de choque normal?',
    answerMarkdown: '$$\\frac{P^*}{P_0} = \\left(\\frac{2}{k+1}\\right)^{\\frac{k}{k-1}} \\approx 0,528$$ Após choque normal adiabático: $M_2 < 1$ (subsônico), $P_2 > P_1$, $T_2 > T_1$, $T_{02} = T_{01}$, e **$P_{02} < P_{01}$** (queda irreversível).',
    derivationHint: 'Geração de entropia no choque reduz obrigatoriamente P₀.',
    tags: ['Compressível', 'Choque Normal'],
  },
  {
    id: 'fc-mec-04-2',
    microtopicId: 'm-fluids-laval',
    promptMarkdown: 'Escreva a relação geométrica-cinemática área-velocidade para escoamento compressível isentrópico unidimensional.',
    answerMarkdown: '$$\\frac{dA}{A} = (M^2 - 1)\\frac{dV}{V}$$ Para $M<1$, acelerar ($dV>0$) exige $dA<0$ (convergente). Para $M>1$, acelerar exige $dA>0$ (divergente).',
    derivationHint: 'M = 1 ocorre somente onde dA = 0 (garganta).',
    tags: ['Laval', 'Dedução'],
  },

  // MEC-05 Heat Transfer
  {
    id: 'fc-mec-05-1',
    microtopicId: 'm-heat-transfer',
    promptMarkdown: 'Diferencie **Número de Biot ($Bi$)** e **Número de Nusselt ($Nu$)**, e dê a fórmula do **raio crítico de isolamento** cilíndrico.',
    answerMarkdown: '$$Bi = \\frac{h L_c}{k_{solido}}\\ (\\text{capacitância concentrada se } Bi < 0,1), \\qquad Nu = \\frac{h L_c}{k_{fluido}}, \\qquad r_{cr} = \\frac{k_{isol}}{h}$$',
    derivationHint: 'Biot compara resistência condutiva interna do sólido com convecção externa.',
    tags: ['TransCal', 'Adimensionais'],
  },
  {
    id: 'fc-mec-05-2',
    microtopicId: 'm-heat-transfer',
    promptMarkdown: 'Quando um trocador de calor tem eficiência independente do arranjo (paralelo = contracorrente)?',
    answerMarkdown: 'Quando um dos fluidos muda de fase isotermicamente (condensador ou evaporador), pois $C_{max} \\to \\infty \\implies C_r = C_{min}/C_{max} = 0$, resultando em $\\varepsilon = 1 - e^{-\\text{NUT}}$.',
    derivationHint: 'Com C_r > 0, contracorrente sempre supera paralelo.',
    tags: ['Trocadores', 'LMTD'],
  },

  // MEC-06 Mohr
  {
    id: 'fc-mec-06-1',
    microtopicId: 'm-solids-mohr',
    promptMarkdown: 'Escreva a tensão equivalente de **von Mises** no estado plano e diga qual critério é mais conservador: Tresca ou von Mises?',
    answerMarkdown: '$$\\sigma_v = \\sqrt{\\sigma_x^2 - \\sigma_x\\sigma_y + \\sigma_y^2 + 3\\tau_{xy}^2}$$ **Tresca** é mais conservador (hexágono inscrito na elipse de von Mises; diferença máxima de ~15,5% em cisalhamento puro: $0,5 S_y$ vs. $0,577 S_y$).',
    derivationHint: 'Lembre-se do fator 3 antes de τ_xy².',
    tags: ['ResMat', 'von Mises', 'Tresca'],
  },
  {
    id: 'fc-mec-06-2',
    microtopicId: 'm-solids-mohr',
    promptMarkdown: 'Em estado plano com $\\sigma_1 = +200\\text{ MPa}$ e $\\sigma_2 = +100\\text{ MPa}$ ($\sigma_3 = 0$), qual é a tensão cisalhante máxima **absoluta** (Mohr 3D)?',
    answerMarkdown: '$$\\tau_{max,abs} = \\frac{\\sigma_{max} - \\sigma_{min}}{2} = \\frac{200 - 0}{2} = 100\\text{ MPa}$$ (E não $(200-100)/2 = 50\\text{ MPa}$!)',
    derivationHint: 'Sempre inclua σ₃ = 0 ao ordenar σ₁ ≥ σ₂ ≥ σ₃!',
    tags: ['Mohr 3D', 'Armadilha'],
  },

  // MEC-07 Torsion & Bending
  {
    id: 'fc-mec-07-1',
    microtopicId: 'm-solids-torsion',
    promptMarkdown: 'Escreva a fórmula de **Bredt** para tensão cisalhante e ângulo de torção em tubos fechados de parede fina.',
    answerMarkdown: '$$\\tau(s) = \\frac{T}{2 A_m t(s)}, \\qquad \\phi = \\frac{T L}{4 A_m^2 G} \\oint \\frac{ds}{t(s)}$$ Onde $A_m$ é a área delimitada pela linha média da parede.',
    derivationHint: 'Fluxo de cisalhamento q = τ·t = constante ao longo do perímetro.',
    tags: ['Bredt', 'Torção'],
  },
  {
    id: 'fc-mec-07-2',
    microtopicId: 'm-solids-torsion',
    promptMarkdown: 'Qual é o valor de $\\tau_{max}$ por cisalhamento transversal (Jourawski) na linha neutra para seção **retangular** vs. **circular maciça**?',
    answerMarkdown: 'Retangular: $\\tau_{max} = \\frac{3}{2} \\frac{V}{A} = 1,5\\,\\frac{V}{A}$. Circular maciça: $\\tau_{max} = \\frac{4}{3} \\frac{V}{A} \\approx 1,333\\,\\frac{V}{A}$.',
    derivationHint: 'Nas bordas extremas de ambas as seções, Q(y) = 0 e τ = 0.',
    tags: ['Jourawski', 'Flexão'],
  },

  // MEC-08 Dynamics
  {
    id: 'fc-mec-08-1',
    microtopicId: 'm-dynamics-rigid',
    promptMarkdown: 'Em que condições a equação simplificada $\\sum M_P = I_P \\alpha$ é válida para o movimento plano de um corpo rígido?',
    answerMarkdown: 'Apenas se $P$ for: (1) o centro de massa $G$; (2) um ponto fixo ($\\mathbf{a}_P = 0$); ou (3) um ponto cuja aceleração $\\mathbf{a}_P$ passa exatamente pela linha que liga $P$ a $G$.',
    derivationHint: 'Atenção: Centro Instantâneo de Rotação (CIR) tem velocidade zero, mas aceleração normal ≠ 0!',
    tags: ['Dinâmica', 'Corpos Rígidos'],
  },
  {
    id: 'fc-mec-08-2',
    microtopicId: 'm-dynamics-rigid',
    promptMarkdown: 'Como se calcula o conjugado giroscópico em um rotor girando com spin $\\omega_s$ e precessão ortogonal $\\Omega$?',
    answerMarkdown: '$$\\mathbf{M} = \\boldsymbol{\\Omega} \\times (I_z \\boldsymbol{\\omega}_s) \\implies M = I_z \\omega_s \\Omega$$ Atua no eixo mutuamente perpendicular ao spin e à precessão.',
    derivationHint: 'Derivada temporal do vetor momento angular H_s em referencial rotativo.',
    tags: ['Giroscópio', 'Rotores'],
  },

  // MEC-09 Materials
  {
    id: 'fc-mec-09-1',
    microtopicId: 'm-materials-fe',
    promptMarkdown: 'Quais são a temperatura e a composição da reação **eutetóide** no diagrama $Fe\\text{-}Fe_3C$ e quais fases se formam?',
    answerMarkdown: 'A **$727^\\circ\\text{C}$** e **$0,77\\%\\text{ C}$**: $$\\gamma\\,(0,77\\%) \\rightleftharpoons \\alpha\\,(0,022\\%) + Fe_3C\\,(6,67\\%)$$ Forma a microestrutura lamelar chamada **Perlita**.',
    derivationHint: 'Não confundir com eutético (4,3% C a 1147 °C, que gera Ledeburita).',
    tags: ['Fe-C', 'Metalurgia'],
  },
  {
    id: 'fc-mec-09-2',
    microtopicId: 'm-materials-fe',
    promptMarkdown: 'Cite os 4 mecanismos de endurecimento de ligas metálicas e indique qual é o único que aumenta simultaneamente resistência e tenacidade.',
    answerMarkdown: '1) **Refino de grão (Hall-Petch: $\\sigma_y = \\sigma_0 + k_y d^{-1/2}$)** — *único que melhora resistência E tenacidade!* 2) Encruamento ($\\tau \\propto Gb\\sqrt{\\rho_d}$); 3) Solução sólida; 4) Precipitação (loops de Orowan).',
    derivationHint: 'Contornos de grão travam discordâncias e defletem trincas.',
    tags: ['Hall-Petch', 'Discordâncias'],
  },

  // MEC-10 Welding
  {
    id: 'fc-mec-10-1',
    microtopicId: 'm-mfg-welding',
    promptMarkdown: 'Escreva a fórmula do Carbono Equivalente ($CE_{IIW}$) e qual é o limiar típico a partir do qual se exige pré-aquecimento.',
    answerMarkdown: '$$CE_{IIW} = \\%C + \\frac{\\%Mn}{6} + \\frac{\\%Cr+\\%Mo+\\%V}{5} + \\frac{\\%Ni+\\%Cu}{15}$$ Valores **$CE_{IIW} > 0,40\\%$** exigem pré-aquecimento, controle de interpasse e consumíveis de baixo hidrogênio.',
    derivationHint: 'Denominadores: 6, 5 e 15.',
    tags: ['Soldagem', 'ZTA'],
  },
  {
    id: 'fc-mec-10-2',
    microtopicId: 'm-mfg-welding',
    promptMarkdown: 'Compare os limites físicos dos ensaios **Líquido Penetrante (LP)** vs. **Partículas Magnéticas (PM)**.',
    answerMarkdown: '**LP:** detecta apenas descontinuidades *abertas à superfície*, mas funciona em qualquer material sólido não-poroso (inclusive aço inox austenítico e alumínio). **PM:** detecta superficiais e *subsuperficiais*, porém exige material *ferromagnético* (falha em inox 304/316!).',
    derivationHint: 'Para trincas internas profundas usa-se Ultrassom (UT) ou Radiografia (RT).',
    tags: ['END', 'Inspeção'],
  },

  // MEC-11 Vibrations
  {
    id: 'fc-mec-11-1',
    microtopicId: 'm-vib-mdof',
    promptMarkdown: 'Em que razão de frequência $\\omega / \\omega_n$ inicia-se o isolamento vibratório ($T_r < 1$) e qual o efeito de aumentar o amortecimento $\\zeta$ nessa faixa?',
    answerMarkdown: 'O isolamento inicia-se apenas para **$\\omega / \\omega_n > \\sqrt{2}$**. Nessa região supercrítica, aumentar $\\zeta$ **eleva (piora)** a força transmitida $T_r$ em regime permanente!',
    derivationHint: 'Todas as curvas de transmissibilidade cruzam o ponto (√2, 1).',
    tags: ['Vibrações', 'Transmissibilidade'],
  },
  {
    id: 'fc-mec-11-2',
    microtopicId: 'm-vib-mdof',
    promptMarkdown: 'Qual é o problema de autovalor generalizado para frequências naturais de sistemas com $N$ graus de liberdade e a velocidade crítica do rotor de Jeffcott?',
    answerMarkdown: '$$\\det(\\mathbf{K} - \\omega^2\\mathbf{M}) = 0, \\qquad \\omega_c = \\sqrt{\\frac{k_{eixo}}{m}}$$ Para $\\omega \\gg \\omega_c$, ocorre autocentralização do disco ($r_d \\to e$).',
    derivationHint: 'Os vetores modais φᵢ são ortogonais em relação às matrizes M e K.',
    tags: ['MDOF', 'Jeffcott'],
  },

  // MEC-12 Pumps
  {
    id: 'fc-mec-12-1',
    microtopicId: 'm-turbo-pumps',
    promptMarkdown: 'Escreva a fórmula do $NPSH_{disp}$, a vida mínima de mancais pela **API 610**, e o efeito de variar a rotação $N$ em $Q, H, P$.',
    answerMarkdown: '$$NPSH_{disp} = \\frac{P_{res} - P_v(T)}{\\gamma} \\pm z_s - h_{f,suc}$$ **API 610:** mancais dimensionados para **$L_{10h} > 25.000\\text{ h}$**. Leis de afinidade: $Q \\propto N$, $H \\propto N^2$, $P \\propto N^3$.',
    derivationHint: 'NPSH_disp pertence à instalação; NPSH_req pertence à bomba.',
    tags: ['API 610', 'Cavitação'],
  },
  {
    id: 'fc-mec-12-2',
    microtopicId: 'm-turbo-pumps',
    promptMarkdown: 'Como varia o ponto de operação ao associar bombas centrífugas idênticas em **série** vs. em **paralelo**?',
    answerMarkdown: '**Série:** somam-se as alturas ($H$) para mesma vazão $Q$ (vencer grandes desníveis). **Paralelo:** somam-se as vazões ($Q$) para mesma altura $H$ (mas pela curva do sistema $H_s \\propto Q^2$, a vazão resultante sempre aumenta *menos que o dobro*!).',
    derivationHint: 'Válvula de controle fica sempre na descarga, nunca na sucção.',
    tags: ['Bombas', 'Curva do Sistema'],
  },

  // MEC-13 IC Engines
  {
    id: 'fc-mec-13-1',
    microtopicId: 'm-ic-engines',
    promptMarkdown: 'Ordene as eficiências térmicas dos ciclos **Otto**, **Diesel** e **Dual** sob duas condições: (A) mesma razão de compressão $r$; (B) mesma pressão/temperatura máximas.',
    answerMarkdown: '(A) Mesma razão $r$: **$\\eta_{Otto} > \\eta_{Dual} > \\eta_{Diesel}$**. (B) Mesma $P_{max}$ e calor rejeitado: **$\\eta_{Diesel} > \\eta_{Dual} > \\eta_{Otto}$**.',
    derivationHint: 'No Diesel, o fator [(r_c^k - 1)/(k(r_c - 1))] é > 1, diminuindo η para um mesmo r.',
    tags: ['Motores', 'Otto', 'Diesel'],
  },
  {
    id: 'fc-mec-13-2',
    microtopicId: 'm-ic-engines',
    promptMarkdown: 'Como se define a **Pressão Média Efetiva (PME / MEP)** de um motor alternativo?',
    answerMarkdown: '$$\\text{PME} = \\frac{W_{liq}}{V_{max} - V_{min}} = \\frac{W_{liq}}{V_{deslocado}}$$ Representa a pressão constante fictícia que, agindo sobre o pistão durante o curso de expansão, produziria o mesmo trabalho líquido por ciclo.',
    derivationHint: 'Não depende de o motor ser 2 tempos ou 4 tempos na definição por ciclo.',
    tags: ['PME', 'Motores Térmicos'],
  },

  // MEC-14 ASME & NR-13
  {
    id: 'fc-mec-14-1',
    microtopicId: 'm-equip-nr13',
    promptMarkdown: 'Escreva a equação da espessura mínima de casco cilíndrico pelo **ASME Seção VIII Div. 1 (UG-27)** e explique $E$ e $C_c$.',
    answerMarkdown: '$$t = \\frac{P R_i}{S E - 0,6 P} + C_c$$ $E$: eficiência de junta soldada ($0,70$ a $1,00$ conforme radiografia); $C_c$: sobre-espessura de corrosão.',
    derivationHint: 'Junta longitudinal (tensão circunferencial) é o caso crítico na maioria dos vasos.',
    tags: ['ASME VIII', 'Vasos de Pressão'],
  },
  {
    id: 'fc-mec-14-2',
    microtopicId: 'm-equip-nr13',
    promptMarkdown: 'Cite os critérios da **NR-13** para enquadramento de vasos de pressão e a diferença entre proteção catódica galvânica e por corrente impressa.',
    answerMarkdown: '**NR-13:** $P\\text{ (kPa)}\\times V\\text{ (m}^3) > 8$ OU qualquer vaso com fluido **Classe A** (inflamáveis/tóxicos). **Proteção Catódica:** Galvânica usa anodo de sacrifício (Mg/Zn/Al, sem fonte); Corrente Impressa usa retificador CC e anodo inerte (ideal para dutos longos).',
    derivationHint: 'Critério de potencial protegido do aço: ≤ −0,85 V vs. eletrodo Cu/CuSO₄.',
    tags: ['NR-13', 'Corrosão'],
  },

  // MEC-15 Fatigue & RCM
  {
    id: 'fc-mec-15-1',
    microtopicId: 'm-maint-reliability',
    promptMarkdown: 'Escreva o critério de fadiga de **Goodman Modificado** e diferencie-o de **Soderberg**.',
    answerMarkdown: '**Goodman:** $\\frac{\\sigma_a}{S_e} + \\frac{\\sigma_m}{S_{ut}} = \\frac{1}{n}$. **Soderberg:** troca $S_{ut}$ por $S_y$ (limite de escoamento), sendo mais conservador.',
    derivationHint: 'Aços têm patamar S_e (~10⁶ ciclos); alumínio não possui limite de fadiga definido.',
    tags: ['Fadiga', 'Goodman'],
  },
  {
    id: 'fc-mec-15-2',
    microtopicId: 'm-maint-reliability',
    promptMarkdown: 'Qual é a fórmula da **Disponibilidade Inerente ($A$)** usando MTBF e MTTR, e qual a confiabilidade de $n$ componentes iguais em paralelo?',
    answerMarkdown: '$$A = \\frac{MTBF}{MTBF + MTTR}, \\qquad R_{paralelo} = 1 - (1 - R)^n$$',
    derivationHint: 'Em série é o produto R^n.',
    tags: ['Confiabilidade', 'NBR 5462'],
  },

  // ELE-01 Maxwell
  {
    id: 'fc-ele-01-1',
    microtopicId: 'e-em-maxwell',
    promptMarkdown: 'Escreva as 4 Equações de Maxwell na forma diferencial e a fórmula da **profundidade pelicular ($\\delta$)**.',
    answerMarkdown: '$\\nabla\\cdot\\mathbf{D}=\\rho_v$, $\\nabla\\cdot\\mathbf{B}=0$, $\\nabla\\times\\mathbf{E}=-\\frac{\\partial\\mathbf{B}}{\\partial t}$, $\\nabla\\times\\mathbf{H}=\\mathbf{J}+\\frac{\\partial\\mathbf{D}}{\\partial t}$. $$\\delta = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}$$',
    derivationHint: 'Aumentar f, μ ou σ reduz δ e aumenta a resistência CA.',
    tags: ['Maxwell', 'Skin Effect'],
  },
  {
    id: 'fc-ele-01-2',
    microtopicId: 'e-em-maxwell',
    promptMarkdown: 'O que representa o **Vetor de Poynting ($\\mathbf{S} = \\mathbf{E} \\times \\mathbf{H}$)** e qual sua unidade no SI?',
    answerMarkdown: 'Representa a densidade superficial instantânea de fluxo de potência eletromagnética atravessando uma área, medida em **$\\text{W/m}^2$** (direção de propagação da onda TEM).',
    derivationHint: '[V/m] × [A/m] = W/m².',
    tags: ['Poynting', 'Ondas'],
  },

  // ELE-02 Circuits & 3-Phase
  {
    id: 'fc-ele-02-1',
    microtopicId: 'e-circuits-ac3',
    promptMarkdown: 'Escreva a equação da potência reativa $Q_C$ para correção de FP e a razão entre capacitância em Estrela ($C_Y$) vs. Triângulo ($C_\\Delta$) para entregar o mesmo $Q_C$.',
    answerMarkdown: '$$Q_C = P(\\tan\\theta_1 - \\tan\\theta_2), \\qquad C_Y = 3\\,C_\\Delta$$ Como em $Y$ cada capacitor recebe $V_L/\\sqrt{3}$, precisa de $3\\times$ mais capacitância para gerar o mesmo $Q_C$!',
    derivationHint: 'Q_fase = ω·C·V_fase².',
    tags: ['Trifásico', 'Fator de Potência'],
  },
  {
    id: 'fc-ele-02-2',
    microtopicId: 'e-circuits-ac3',
    promptMarkdown: 'No método dos **Dois Wattímetros** em carga trifásica equilibrada, o que indicam $W_1 = W_2$, $W_1 = 0$ e $W_1 < 0$?',
    answerMarkdown: '$W_1 = W_2 \\implies FP = 1\\ (\\theta=0^\\circ)$; um wattímetro **nulo** $\\implies FP = 0,5\\ (\\theta = 60^\\circ)$; um wattímetro **negativo** $\\implies FP < 0,5\\ (\\theta > 60^\\circ)$.',
    derivationHint: 'tan(θ) = √3 · (W₁ − W₂) / (W₁ + W₂).',
    tags: ['Wattímetros', 'Medidas'],
  },

  // ELE-03 MIT & Transformers
  {
    id: 'fc-ele-03-1',
    microtopicId: 'e-mach-mit',
    promptMarkdown: 'No Motor de Indução Trifásico (MIT), relacione $P_{gap}$, $P_{cu,r}$ e $P_{conv}$ em função do escorregamento $s$.',
    answerMarkdown: '$$P_{cu,r} = s\\,P_{gap}, \\qquad P_{conv} = (1 - s)\\,P_{gap}, \\qquad T_{ind} = \\frac{P_{gap}}{\\omega_s}$$',
    derivationHint: 'A razão das potências segue R\'₂ : R\'₂(1-s)/s : R\'₂/s.',
    tags: ['MIT', 'Escorregamento'],
  },
  {
    id: 'fc-ele-03-2',
    microtopicId: 'e-mach-mit',
    promptMarkdown: 'Qual é a condição de **rendimento máximo** de um transformador de potência e o que ocorre na partida $Y$-$\\Delta$ de um MIT?',
    answerMarkdown: 'Rendimento máximo ocorre quando **perdas no cobre ($I^2 R_{eq}$) = perdas no núcleo ($P_{fe}$)**. Na partida $Y$-$\\Delta$, tanto a corrente de linha quanto o conjugado de partida caem para **$1/3$** dos valores diretos.',
    derivationHint: 'Em partida estrela, cada fase recebe V_L/√3.',
    tags: ['Transformadores', 'Partida Y-Δ'],
  },

  // ELE-04 Synchronous Generators
  {
    id: 'fc-ele-04-1',
    microtopicId: 'e-mach-sync',
    promptMarkdown: 'Em gerador síncrono ligado a barramento infinito, quem controla $P$ e quem controla $Q$? Qual o critério exato de sobre-excitação?',
    answerMarkdown: 'A **turbina motriz** controla **$P$** (variando $\\delta$); a **corrente de excitação $I_f$** controla **$Q$**. Sobre-excitado: **$|E_f|\\cos\\delta > |V_t|$** (injeta reativos indutivos $Q > 0$ na rede).',
    derivationHint: 'Limite de estabilidade estática em polos lisos: δ = 90°.',
    tags: ['Síncrono', 'Excitação'],
  },
  {
    id: 'fc-ele-04-2',
    microtopicId: 'e-mach-sync',
    promptMarkdown: 'Quais são os 4 requisitos exatos para sincronizar em paralelo um gerador síncrono à rede?',
    answerMarkdown: '1) Mesmas tensões eficazes de linha; 2) Mesma frequência; 3) Mesma sequência de fases (ABC); 4) Ângulo de fase zero (em fase no instante de fechamento do disjuntor).',
    derivationHint: 'Verificado pelo sincronoscópio.',
    tags: ['Paralelismo', 'Geração'],
  },

  // ELE-05 SEP Fortescue
  {
    id: 'fc-ele-05-1',
    microtopicId: 'e-sep-fortescue',
    promptMarkdown: 'Como se interconectam as redes de sequência (0, 1, 2) nos curtos: $3\\phi$, $1\\phi$-terra, $2\\phi$ e $2\\phi$-terra?',
    answerMarkdown: '**$3\\phi$:** só Seq. 1. **$1\\phi$-terra:** 1, 2 e 0 em **SÉRIE** ($I_{cc}=3I_{a1}$). **$2\\phi$:** 1 e 2 em **PARALELO** (sem 0). **$2\\phi$-terra:** 1, 2 e 0 todas em **PARALELO**.',
    derivationHint: 'Impedância de aterramento Z_n ou de falta Z_f entra como 3Z_n / 3Z_f na sequência zero.',
    tags: ['Fortescue', 'Curto-Circuito'],
  },
  {
    id: 'fc-ele-05-2',
    microtopicId: 'e-sep-fortescue',
    promptMarkdown: 'Escreva a fórmula da mudança de base em valores p.u. ($Z_{pu}^{novo}$).',
    answerMarkdown: '$$Z_{pu}^{novo} = Z_{pu}^{velho} \\left(\\frac{V_{base}^{velho}}{V_{base}^{novo}}\\right)^2 \\left(\\frac{S_{base}^{novo}}{S_{base}^{velho}}\\right)$$',
    derivationHint: 'Z_base = V_base² / S_base.',
    tags: ['p.u.', 'SEP'],
  },

  // ELE-06 Transmission Lines
  {
    id: 'fc-ele-06-1',
    microtopicId: 'e-sep-lines',
    promptMarkdown: 'Explique o **Efeito Ferranti**, sua causa física e qual equipamento o corrige.',
    answerMarkdown: 'Em linhas médias/longas em vazio ou carga leve, a corrente capacitiva $I_C$ atravessando a indutância série provoca **$|V_{receptor}| > |V_{transmissor}|$**. Corrige-se com **reatores indutivos em derivação (shunt)**.',
    derivationHint: 'Nunca usar capacitores para combater Ferranti!',
    tags: ['Linhas', 'Ferranti'],
  },
  {
    id: 'fc-ele-06-2',
    microtopicId: 'e-sep-lines',
    promptMarkdown: 'Defina **Impedância Característica ($Z_c$)** e **Potência Natural ($\\text{SIL}$)** de uma linha sem perdas.',
    answerMarkdown: '$$Z_c = \\sqrt{\\frac{L}{C}}, \\qquad \\text{SIL} = \\frac{V_L^2}{Z_c}$$ Quando $P = \\text{SIL}$, $Q_L = Q_C$ e a tensão permanece constante ao longo da linha.',
    derivationHint: 'SIL cresce com o quadrado da tensão nominal.',
    tags: ['SIL', 'Transmissão'],
  },

  // ELE-07 Grounding & NR-10
  {
    id: 'fc-ele-07-1',
    microtopicId: 'e-prot-nr10',
    promptMarkdown: 'Diferencie os esquemas **TN-C, TN-S, TT e IT** pela ABNT NBR 5410.',
    answerMarkdown: '**TN-S:** PE e N separados. **TN-C:** condutor único PEN (proibido em Cu < 10 mm² e áreas explosivas!). **TT:** eletrodos independentes $\\implies$ **DR obrigatório**. **IT:** neutro isolado/alta Z; 1ª falta só alarma (DSI), 2ª falta = curto bifásico!',
    derivationHint: '1ª letra = fonte; 2ª letra = massas.',
    tags: ['NBR 5410', 'Aterramento'],
  },
  {
    id: 'fc-ele-07-2',
    microtopicId: 'e-prot-nr10',
    promptMarkdown: 'Liste os códigos ANSI **21, 27, 50, 51, 59, 67 e 87**.',
    answerMarkdown: '**21:** Distância ($Z$); **27:** Subtensão; **50:** Sobrecorrente Instantânea; **51:** Sobrecorrente Temporizada; **59:** Sobretensão; **67:** Sobrecorrente Direcional; **87:** Diferencial Percentual.',
    derivationHint: '87 protege transformadores, geradores e barramentos.',
    tags: ['ANSI C37.2', 'Relés'],
  },

  // ELE-08 Hazardous Areas
  {
    id: 'fc-ele-08-1',
    microtopicId: 'e-prot-ex',
    promptMarkdown: 'Defina **Zona 0, Zona 1 e Zona 2** (gases) e diga qual modo de proteção é aceito em **Zona 0**.',
    answerMarkdown: '**Zona 0:** presença contínua/longos períodos (só **Ex-ia / EPL Ga**!). **Zona 1:** provável em operação normal (Ex-d, Ex-e, Ex-ib). **Zona 2:** improvável / curta duração (Ex-n / Ex-ec).',
    derivationHint: 'Poeiras combustíveis usam Zonas 20, 21 e 22.',
    tags: ['Áreas Classificadas', 'IEC 60079'],
  },
  {
    id: 'fc-ele-08-2',
    microtopicId: 'e-prot-ex',
    promptMarkdown: 'Qual é a diferença real de princípio construtivo entre **Ex-d** e **Ex-p**?',
    answerMarkdown: '**Ex-d (À Prova de Explosão):** NÃO é estanque; permite explosão interna, suporta a pressão e extingue a chama nos interstícios. **Ex-p (Pressurizado):** injeta ar/gás inerte em sobrepressão impedindo entrada de gás externo.',
    derivationHint: 'Grupo IIC (H₂/acetileno) é o mais severo; Classe T6 (85 °C) é a mais restritiva.',
    tags: ['Ex-d', 'Ex-i'],
  },

  // ELE-09 Power Electronics
  {
    id: 'fc-ele-09-1',
    microtopicId: 'e-pe-converters',
    promptMarkdown: 'Escreva as relações de ganho estático $V_{out}/V_{in}$ em CCM para **Buck**, **Boost** e **Buck-Boost**.',
    answerMarkdown: '$$\\text{Buck: } D \\qquad \\text{Boost: } \\frac{1}{1-D} \\qquad \\text{Buck-Boost: } -\\frac{D}{1-D}$$',
    derivationHint: 'Decorre do balanço volt-segundo nulo no indutor em regime permanente.',
    tags: ['Conversores', 'PWM'],
  },
  {
    id: 'fc-ele-09-2',
    microtopicId: 'e-pe-converters',
    promptMarkdown: 'Quando um retificador controlado a tiristor (SCR) opera como **inversor não-autônomo**?',
    answerMarkdown: 'Em ponte **totalmente controlada** sem diodo de roda livre, com carga indutiva em condução contínua e ângulo de disparo **$90^\\circ < \\alpha < 180^\\circ$** ($\\cos\\alpha < 0 \\implies V_{cc} < 0$).',
    derivationHint: 'A corrente I_cc continua positiva, invertendo o fluxo de potência.',
    tags: ['SCR', 'Retificadores'],
  },

  // ELE-10 Control Systems
  {
    id: 'fc-ele-10-1',
    microtopicId: 'e-ctrl-freq',
    promptMarkdown: 'Como converter a representação em Espaço de Estados $(\\mathbf{A,B,C,D})$ em $G(s)$, e como se definem **MG** e **MF** em Bode?',
    answerMarkdown: '$$G(s) = \\mathbf{C}(s\\mathbf{I}-\\mathbf{A})^{-1}\\mathbf{B} + \\mathbf{D}$$ $MG_{dB} = -20\\log_{10}|G(j\\omega_\\pi)|$ (onde fase = $-180^\\circ$); $MF = 180^\\circ + \\angle G(j\\omega_g)$ (onde ganho = $0\\text{ dB}$).',
    derivationHint: 'Polos de G(s) são os autovalores de A: det(sI − A) = 0.',
    tags: ['Controle', 'Bode', 'Estados'],
  },
  {
    id: 'fc-ele-10-2',
    microtopicId: 'e-ctrl-freq',
    promptMarkdown: 'Qual o impacto de cada termo do **PID** (Proporcional, Integral, Derivativo) na resposta transitória e estacionária?',
    answerMarkdown: '**P:** acelera subida e reduz erro (aumenta overshoot). **I:** adiciona polo na origem, **zera erro ao degrau**, mas reduz margem de fase. **D:** adiciona zero, **amortece oscilações** e aumenta margem de fase, porém amplifica ruído.',
    derivationHint: 'Atraso de transporte e^{-τs} reduz margem de fase sem mudar módulo.',
    tags: ['PID', 'Estabilidade'],
  },

  // MAT-01 Laplace
  {
    id: 'fc-mat-01-1',
    microtopicId: 'g-math-laplace',
    promptMarkdown: 'Enuncie o **Teorema do Valor Final** em Laplace e sua condição restritiva de validade.',
    answerMarkdown: '$$\\lim_{t\\to\\infty} f(t) = \\lim_{s\\to 0} s F(s)$$ Válido **somente** se todos os polos de $s F(s)$ estiverem estritamente no semiplano esquerdo ($\\text{Re}(s) < 0$).',
    derivationHint: 'Não se aplica a funções oscilatórias puras (polos ±jω) ou instáveis.',
    tags: ['Laplace', 'EDOs'],
  },
  {
    id: 'fc-mat-01-2',
    microtopicId: 'g-math-laplace',
    promptMarkdown: 'Diferencie fisicamente os Teoremas de **Gauss (Divergência)** e de **Stokes** e escreva as duas identidades nulas do cálculo vetorial.',
    answerMarkdown: 'Gauss: fluxo fechado $\\leftrightarrow$ integral volumétrica de $\\nabla\\cdot\\mathbf{F}$. Stokes: circulação fechada $\\leftrightarrow$ fluxo superficial de $\\nabla\\times\\mathbf{F}$. Identidades exatas: $\\nabla\\times(\\nabla\\phi)=\\mathbf{0}$ e $\\nabla\\cdot(\\nabla\\times\\mathbf{A})=0$.',
    derivationHint: 'Base direta da forma integral/diferencial de Maxwell e Navier-Stokes.',
    tags: ['Cálculo Vetorial', 'Gauss', 'Stokes'],
  },

  // BAS-01 Portuguese
  {
    id: 'fc-bas-01-1',
    microtopicId: 'b-pt-cesgranrio',
    promptMarkdown: 'Diferencie a concordância com a partícula **SE** após VTD vs. VTI/VI/VL, e explique o uso de **conquanto** e **posto que**.',
    answerMarkdown: '**VTD + se** (Partícula Apassivadora): verbo concorda com o sujeito (*Analisaram-se os laudos*). **VTI + se** (Indeterminação): singular fixo (*Precisa-se de engenheiros*). **Conquanto** e **posto que** são **concessivas** (= *embora*).',
    derivationHint: 'O verbo "haver" no sentido de existir é impessoal e transmite impessoalidade ao auxiliar.',
    tags: ['Português', 'Cesgranrio'],
  },
  {
    id: 'fc-bas-01-2',
    microtopicId: 'b-pt-cesgranrio',
    promptMarkdown: 'Cite 4 casos de **crase proibida** e a regra estrita do pronome relativo **onde**.',
    answerMarkdown: 'Crase proibida: antes de verbo, palavra masculina, palavras repetidas (*dia a dia*) e `a` singular antes de plural (*a normas*). **Onde** só retoma **lugar físico**; para processos/leis use *em que / no qual*.',
    derivationHint: 'Teste clássico: troque a palavra feminina por masculina; se virar "ao", há crase.',
    tags: ['Crase', 'Pronomes'],
  },

  // BAS-02 English
  {
    id: 'fc-bas-02-1',
    microtopicId: 'b-en-tech',
    promptMarkdown: 'Em normas técnicas internacionais (ASME, API, IEEE), qual a diferença jurídica entre **shall**, **should** e **may**?',
    answerMarkdown: '**shall** = requisito obrigatório (*mandatory*); **should** = recomendação (*advisable*); **may** = permissão (*permitted*).',
    derivationHint: 'Nunca interprete "shall" como simples tempo futuro em especificações técnicas.',
    tags: ['Technical English', 'ASME/API'],
  },
  {
    id: 'fc-bas-02-2',
    microtopicId: 'b-en-tech',
    promptMarkdown: 'O que significam **turnaround**, **the former / the latter** e **albeit** em textos técnicos Oil & Gas?',
    answerMarkdown: '**Turnaround:** parada programada de manutenção em refinaria/planta. **The former:** o primeiro citado; **the latter:** o segundo/último citado. **Albeit:** embora / apesar de.',
    derivationHint: 'Falsos cognatos comuns: actually = na verdade; comprehensive = abrangente.',
    tags: ['Oil & Gas', 'Cesgranrio'],
  },
];
