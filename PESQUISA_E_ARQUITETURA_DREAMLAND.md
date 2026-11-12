# Sistema Integrado de Estudos — Dream Land Academy (Edição Thaisa)

**Documento Técnico de Pesquisa, Engenharia Pedagógica, Psicometria Adaptativa e Arquitetura UI/UX**  
*Alinhamento Curricular Integral: Ementa UNIP (Engenharia Mecânica & Elétrica) → Concursos Petrobras (Cesgranrio & Cebraspe) → Concursos Gerais de Engenharia (BNDES, EPE/FGV, Eletrobras, Marinha CP-CEM, Vunesp/Perito)*

---

## 1. Sumário Executivo & Diagnóstico de Engenharia Pedagógica

A candidata **Thaisa** (graduada em Engenharia pela UNIP, fluente em língua inglesa, com rotina de **6 a 8 horas diárias de estudo**) enfrenta quatro gargalos clássicos de alto atrito observados em candidatos de engenharia de alto potencial:

1. **Paralisia Decisória e Custo de Context-Switching:** decidir diariamente qual disciplina revisar, buscar resumos dispersos em PDFs, selecionar listas de exercícios e rastrear gabaritos externos consome de 20% a 35% da energia executiva antes mesmo do primeiro cálculo.
2. **Viés de Fluência vs. Lacunas Ocultas de Ementa:** a formação em graduação generalista gera disparidade natural entre tópicos altamente consolidados (ex.: Estados Planos de Tensão / Mohr-von Mises) e eixos de alta cobrança em bancas de alto rigor como Petrobras/Transpetro (ex.: Escoamento Compressível em Bocais de Laval, NR-13 / ASME Sec. VIII, Componentes Simétricas de Fortescue, Atmosferas Explosivas NBR IEC 60079).
3. **Ausência de Engenharia Reversa do Erro:** resolver listas sem classificar se o erro decorreu de *falha conceitual*, *deslize algébrico/dimensional*, *lacuna normativa* ou *pegadinha semântica* faz o sistema de revisão tratar tudo igualmente, desperdiçando tempo precioso.
4. **Cansaço Cognitivo em Jornadas de 6–8h:** interfaces escuras ou visualmente agressivas aumentam a fadiga ocular após a quarta hora; por isso adotou-se a arquitetura ergonômica **Dream Land (Kirby UI)** — fundo rosado suave de baixíssimo brilho contrastado por tinta azul-noite WCAG AAA (`#1E1B4B`) sobre cartões brancos (`#FFFFFF`).

A aplicação entregue neste repositório elimina 100% da busca externa ("tudo em um só lugar"): reúne **28 microtópicos atômicos**, **11 laboratórios visuais SVG interativos**, **videoaulas verificadas em player interno**, **56 questões resolvidas com memorial analítico em KaTeX** e **56 cartões FSRS de dedução ativa**, orquestrados em tempo real por um motor psicométrico triplo (**TRI 3PL + BKT + FSRS**).

---

## 2. Engenharia Curricular: Mapa UNIP → Petrobras → Concursos Gerais

### 2.1 Macroestrutura em 7 Planetas (28 Microtópicos Atômicos)

| Planeta Dream Land | Copy Ability | Microtópicos Cobertos | Origem UNIP | Alocação Petrobras & Gerais |
| :--- | :--- | :--- | :--- | :--- |
| **1. Pyrosphere & Ripple Star** | `Fire Kirby` | `MEC-01` a `MEC-05`: 1ª/2ª Lei, Exergia, Rankine/Brayton/Refrigeração, Navier-Stokes & Darcy-Weisbach, Bocais de Laval, Condução/Convecção/Trocadores LMTD-NTU | Termodinâmica I/II, Fenômenos de Transporte, Transferência de Calor | Petrobras Bloco I (Mecânica), BNDES, EPE (FGV), Marinha CP-CEM |
| **2. Rock Star** | `Hammer Kirby` | `MEC-06` a `MEC-10`: Mohr 3D / von Mises / Tresca, Torção Circular & Bredt, Dinâmica Corpos Rígidos / Coriolis, Diagrama Fe-Fe₃C & TTT/CCT, Processos de Fabricação & Soldagem AWS | Resistência dos Materiais, Mecânica Geral, Ciência dos Materiais, Processos | Petrobras Blocos I/II, Perito Criminal (Vunesp), Transpetro |
| **3. Planeta Mechanica** | `Bubble Kirby` | `MEC-11` a `MEC-15`: Vibrações 1/N GDL & Jeffcott, Bombas Centrífugas (API 610, NPSH), Motores Otto/Diesel, Corrosão/ASME VIII/NR-13, Manutenção RCM & FMEA | Vibrações, Máquinas de Fluxo, Motores Térmicos, Elementos/Manutenção | Petrobras Blocos II/III (altíssima incidência normativa), Transpetro |
| **4. Planeta Sparkia** | `Spark Kirby` | `ELE-01` a `ELE-04`: Maxwell / Poynting / Efeito Pelicular, Circuitos CA/CC & Trifásicos, Transformadores & MIT (Kloss), Máquinas Síncronas & Curva V | Eletromagnetismo, Circuitos Elétricos I/II, Conversão Eletromecânica | Petrobras Bloco I (Elétrica), Eletrobras, EPE, Marinha |
| **5. Halcandra Volt** | `Plasma Kirby` | `ELE-05` a `ELE-08`: Valores p.u. & Fortescue (Curto Assimétrico), Linhas de Transmissão (Ferranti/SIL), Proteção ANSI/NR-10/NBR 5410/SPDA, Áreas Classificadas Ex | Sistemas Elétricos de Potência, Instalações Elétricas, Segurança | Petrobras Blocos I/II/III, Operador/Eletrobras |
| **6. Nova Popstar** | `Doctor Kirby` | `ELE-09`, `ELE-10`, `MAT-01`: Eletrônica de Potência (Tiristores, Buck/Boost PWM), Controle Clássico/Moderno (Routh, Bode, Nyquist, PID), EDOs/Laplace/Vetorial | Eletrônica de Potência, Controle I/II, Cálculo III/IV | Petrobras Blocos II/III, BNDES, Multidisciplinar |
| **7. Estação Dream Land** | `Scholar Kirby` | `BAS-01` (Português Cesgranrio/FGV) & `BAS-02` (Inglês Técnico Normas ASME/API/IEEE) | Comunicação & Expressão + Fluência Bilíngue da Thaisa | **Bloco Básico Eliminatório** (corte de 50% na Cesgranrio) |

---

## 3. Motor Psicométrico Triplo (`src/engine/psychometrics.ts`)

### 3.1 Teoria de Resposta ao Item (TRI — Modelo Logístico de 3 Parâmetros)

A probabilidade de acerto de um item $i$ pela aluna de proficiência latente $\theta \in [-3, +4]$ é modelada como:

$$
P_i(\theta) = c_i + \frac{1 - c_i}{1 + e^{-D \cdot a_i (\theta - b_i)}} \quad (D = 1.0)
$$

onde $a_i \ge 0.5$ é o parâmetro de discriminação, $b_i$ a dificuldade calibrada à banca e $c_i \in (0, 0.5]$ o parâmetro de acerto casual ($c_i = 0.20$ em múltipla escolha Cesgranrio de 5 alternativas; $c_i \approx 0.05$ quando há penalidade `-1` do Cebraspe e opção de deixar em branco).

A estimação MAP (Newton-Raphson com prior bayesiana normal $\mathcal{N}(\mu_0, \sigma_0^2)$ para evitar explosão em amostras iniciais pequenas) maximiza a log-verossimilhança penalizada usando a derivada exata de primeira ordem $g(\theta)$ e a informação de Fisher esperada $I(\theta) = \sum_i \frac{[P_i'(\theta)]^2}{P_i(\theta)(1 - P_i(\theta))}$, fornecendo tanto o estimador pontual $\hat{\theta}$ quanto o erro padrão $SE(\hat{\theta}) = 1/\sqrt{I(\hat{\theta}) + 1/\sigma_0^2}$ exibidos na Matriz Diagnóstica.

### 3.2 Bayesian Knowledge Tracing (BKT) com Engenharia Reversa

Para cada microtópico, a probabilidade posterior de domínio cognitivo $P(L_t)$ após observação dicotômica $O_t \in \{0, 1\}$ é atualizada por Bayes utilizando as taxas adaptativas de **Slip** ($P(S)$) e **Guess** ($P(G)$):

- **Se acertou ($O_t = 1$):** $P(L_t \mid 1) = \frac{P(L_t)(1 - P(S))}{P(L_t)(1 - P(S)) + (1 - P(L_t))P(G)}$
- **Se errou ($O_t = 0$):** $P(L_t \mid 0) = \frac{P(L_t)P(S)}{P(L_t)P(S) + (1 - P(L_t))(1 - P(G))}$
- **Transição de aprendizagem:** $P(L_{t+1}) = P(L_t \mid O_t) + (1 - P(L_t \mid O_t)) P(T)$

Ao utilizar os botões de **Engenharia Reversa** (`src/utils/storage.ts`):
- Assinalar **"Chute / Baixa Confiança"** ao acertar eleva dinamicamente $P(G)$, impedindo que um acerto fortuito infle falsamente o $P(L)$ e mascare lacunas.
- Classificar um erro como **Deslize Algébrico / Unidade (`slip`)** eleva gradualmente $P(S)$ e preserva maior parte de $P(L)$, enquanto **Falha Conceitual (`conceptual`)** ou **Normativa (`normative`)** mantêm baixa taxa de deslize e direcionam a prescrição automática da Matriz para *Compêndio / Videoaula* ou *Flashcards Normativos*.

### 3.3 Free Spaced Repetition Scheduler (FSRS Power-Law)

A retenção projetada no instante $t$ (em dias desde a última revisão) com estabilidade de memória $S$ segue a curva em lei de potência:

$$
R(t, S) = \left(1 + \text{FATOR} \cdot \frac{t}{S}\right)^{-w}, \quad w = 0.5, \; \text{FATOR} = 0.9^{-1/w} - 1 \implies R(S, S) = 0.90
$$

O intervalo ótimo para manter exatamente $90\%$ de retenção no dia da prova é $I = \max\left(1, \operatorname{round}\left(\frac{S}{\text{FATOR}}(R_{\text{alvo}}^{-1/w} - 1)\right)\right)$, atualizado a cada resposta de 4 níveis (`1: Again`, `2: Hard`, `3: Good`, `4: Easy`) em `src/components/views/AutoRevisionView.tsx`.

---

## 4. Arquitetura da Rotina Ultradiana de 6–8 Horas (`src/components/views/RoutineView.tsx`)

| Horário | Duração | Bloco & Modo Cognitivo | Módulo Direto no App |
| :--- | :---: | :--- | :--- |
| **08:00 – 08:15** | 15 min | **Flash-Review FSRS (Reativação Neural)** — Cartões com $R(t) < 90\%$ | `Auto-Revisão FSRS` |
| **08:15 – 10:15** | 120 min | **Teoria Densa & Vídeo Focado** (90 min Compêndio/Laboratório + 30 min aula curada) | `Compêndio & Vídeos` |
| **10:15 – 10:30** | 15 min | **Pausa Tomate Maximizador 1 (Maxim Tomato)** — Descanso visual regra 20-20-20 | `Rotina (Overlay)` |
| **10:30 – 11:45** | 75 min | **Resolução Analítica Passo a Passo** — Sem consulta, checando unidades SI / p.u. | `Exercícios` |
| **11:45 – 12:30** | 45 min | **Engenharia Reversa do Erro** — Classificação C/S/N/T + leitura do memorial KaTeX | `Exercícios` |
| **12:30 – 14:00** | 90 min | **Almoço & Descompressão Neurológica** — Consolidação hipocampal offline | `Rotina` |
| **14:00 – 16:00** | 120 min | **Fixação Massiva & Sprint Cronometrado** — Modo Banca Real (3m Cesgranrio / 1m45s Cebraspe) | `Simulados (Chefes)` |
| **16:00 – 16:15** | 15 min | **Pausa Tomate Maximizador 2** — Hidratação e alongamento | `Rotina` |
| **16:15 – 17:15** | 60 min | **Bloco Básico Eliminatório (Alternância Ímpar/Par)** — Ímpares: PT; Pares: Inglês ASME/API | `Compêndio (BAS-01/02)` |
| **17:15 – 18:00** | 45 min | **Integração Multidisciplinar & Fechamento Algorítmico** — Auditoria na Matriz TRI/BKT | `Matriz Diagnóstica` |

**Total diário programado:** 7h 15min líquidas de estudo ativo + 2h 00min de pausas estruturadas (encaixando perfeitamente na faixa de **6 a 8 horas/dia** ajustável no cabeçalho).

---

## 5. Estratégia das Bancas & Chefes de Arena (`src/components/views/SimuladosView.tsx`)

1. **King Dedede (`Cesgranrio` — Petrobras / BNDES):** 5 alternativas (`A`–`E`), +1 acerto / 0 erro, porém **eliminatória caso acerte menos de 50% do Bloco Básico** (implementado em `evaluateSimulationScore`).
2. **Meta Knight (`Cebraspe` — Petrobras / Transpetro):** itens *Certo / Errado* com regra `+1` / `-1` / `0 (Em Branco)`. Inclui botão explícito **"DEIXAR EM BRANCO (0 pts)"** para treinar gestão de risco probabilística.
3. **Galacta Knight (`Concursos Gerais` — FGV, Marinha CP-CEM, Vunesp, FCC):** simulado misto priorizando questões de maior parâmetro de discriminação $a_i$ e integração mecânico-elétrica.

---

## 6. Integridade Verificada do Banco e Arquitetura de Arquivos

- `src/engine/psychometrics.ts`: Implementação completa de TRI 3PL, Fisher Information, Newton-Raphson MLE/MAP, BKT com adaptação de Slip/Guess, FSRS e auditoria de simulados.
- `src/data/microtopicsMec.ts` & `src/data/microtopicsEleAndBasic.ts`: **28 microtópicos completos** com videoaulas verificadas via `oembed` (MIT OCW, LearnChemE, Efficient Engineer, Katkim, Zach Star, NESO Academy, UNAM/UNIVESP, Prof. Boaro, Profa. Yara Coeli) e bibliografia clássica (Çengel, Beer, Hibbeler, Incropera, Munson, Callister, Sadiku, Fitzgerald, Kindermann, Ogata, Dorf, Rashid, Boyce & DiPrima).
- `src/data/questionsMec.ts` & `src/data/questionsEleAndBasic.ts`: **56 questões autorais e adaptadas estilo banca** com memoriais completos em KaTeX (incluindo correção dimensional rigorosa do Problema de Navier/Mohr-von Mises com $T = 785.4\,\text{kN}\cdot\text{m}$ garantindo $\tau_{xy} = 50\,\text{MPa}$ e $\sigma_{VM} = 193.65\,\text{MPa}$).
- `src/data/flashcardsBank.ts`: **56 flashcards de dedução ativa** (2 por microtópico) com pistas de Feynman e agendamento FSRS.
- `src/components/InteractiveDiagrams.tsx`: **11 laboratórios SVG em tempo real** (Ciclos Brayton/Rankine, Círculo de Mohr 2D, Bocal de Laval $M$, Bomba + NPSH, Diagrama $\text{Fe}-\text{Fe}_3\text{C}$, Transmissibilidade de Vibrações, Fasores Trifásicos, Torque de Kloss em MIT, Margens em Bode, Conversores Buck/Boost PWM e Faltas por Componentes Simétricas de Fortescue).
