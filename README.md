# StudyMyLove — Estudos da Thaisa (Engenharia Mecânica, Elétrica & Petrobras)

Aplicação web de estudos pessoais feita com carinho para a **Thaisa** em **Engenharia Mecânica, Engenharia Elétrica e Concursos (Petrobras / Transpetro / BNDES / EPE / Marinha CP-CEM)**, estruturada com estética inspirada em temas de **Kirby (Console, Portal & PC)** e organização visual limpa.

## Destaques & Organização Visual

- **Dedicatória Afetiva na Página Inicial**: Cartão de boas-vindas com mensagens rotativas de carinho (*"Para o meu amor, Thaisa ♥"*) e seletor rápido de foco de estudo.
- **Tutorial Integrado ("Como Usar")**: Guia passo a passo em 4 etapas na página inicial + modal completo de instruções acessível a qualquer momento pelo topo ou barra lateral.
- **Layout Centrado & Clean**: Navegação dividida em *Meu Espaço* e *Estudo & Prática*, sem colunas espremidas, com leitura em largura total e opção de abrir anotações lado a lado quando desejar.
- **28 Microtópicos Completos** cobrindo Termodinâmica, Mecânica dos Fluidos, Transferência de Calor, Resistência dos Materiais (Mohr / von Mises / Tresca), Vibrações, Máquinas de Fluxo (API 610 / NPSH), NR-13 / ASME VIII, Eletromagnetismo, Circuitos Trifásicos, Máquinas Elétricas, Sistemas de Potência (Fortescue), NR-10 / NBR 5410 / IEC 60079, Controle, Eletrônica de Potência, Matemática Superior, Português (Cesgranrio/FGV) e Inglês Técnico.
- **Caderno & Teoria**: Seções teóricas completas em LaTeX/KaTeX, aba de **Formulário Direto**, barra rápida de seções, videoaulas e bloco de anotações pessoais salvo localmente.
- **11 Simuladores Interativos em SVG**: Círculo de Mohr 2D, Ciclos Brayton/Rankine, Bocal de Laval, Curva de Bomba + NPSH, Diagrama $\text{Fe}-\text{Fe}_3\text{C}$, Transmissibilidade de Vibrações, Fasores Trifásicos, Torque de Kloss (MIT), Diagrama de Bode, Conversores Buck/Boost e Faltas Assimétricas (Fortescue).
- **Perfil Inicial 100% Zerado**: Todos os tópicos iniciam com `0%` de domínio, `0` questões respondidas e `0` blocos marcados, permitindo medir a evolução real desde o primeiro dia.
- **Diagnóstico Sem Limite de Tempo & Simulados por Tema**: Modo especial sem relógio (28, 56 ou 140 questões) e construtor de simulados por área ou matéria específica que classifica o desempenho real em **Engenheira em Base**, **Engenheira Normal (Plena)**, **Engenheira Sênior** ou **Engenheira Expert**.
- **Banco Gigante de 140 Questões Comentadas (Brasil & Europa)**: Múltipla Escolha (Cesgranrio, FGV, Vunesp, Marinha CP-CEM), Certo/Errado (Cebraspe) e questões de **Processos Seletivos e Provas Europeias** (**CERN**, **ESA**, **EPSO / União Europeia**, **Equinor/Shell Offshore Mar do Norte** e **CEng / Ordem dos Engenheiros FEANI**), todas com resolução analítica passo a passo em LaTeX.
- **Mais de 120 Videoaulas Curadas**: Inclui aulas em português (UNIVESP, USP, canais técnicos) e cursos de grandes universidades europeias e internacionais (**TU Delft**, **ETH Zürich**, **Imperial College / Cambridge**, **MIT OCW** e **NPTEL**).
- **56 Flashcards FSRS**: Revisão espaçada com atalhos de teclado (`Espaço`, `1`–`4`) e modo de visualização em lista.
- **3 Temas Visuais Kirby**: *Creme (Popstar Portal)*, *Pastel (Switch Dream Land)* e *Noite (Fountain of Dreams)*.

## Como Rodar Localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

O projeto já inclui `vercel.json` pré-configurado para Vite:
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
