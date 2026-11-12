# StudyMyLove — Estudos da Thaisa (Engenharia Mecânica, Elétrica & Petrobras)

Aplicação web de estudos pessoais feita com carinho para a **Thaisa** em **Engenharia Mecânica, Engenharia Elétrica e Concursos (Petrobras / Transpetro / BNDES / EPE / Marinha CP-CEM)**, estruturada com estética inspirada em temas de **Kirby (Console, Portal & PC)** e organização visual limpa.

## Destaques & Organização Visual

- **Dedicatória Afetiva na Página Inicial**: Cartão de boas-vindas com mensagens rotativas de carinho (*"Para o meu amor, Thaisa ♥"*) e seletor rápido de foco de estudo.
- **Tutorial Integrado ("Como Usar")**: Guia passo a passo em 4 etapas na página inicial + modal completo de instruções acessível a qualquer momento pelo topo ou barra lateral.
- **Layout Centrado & Clean**: Navegação dividida em *Meu Espaço* e *Estudo & Prática*, sem colunas espremidas, com leitura em largura total e opção de abrir anotações lado a lado quando desejar.
- **28 Microtópicos Completos** cobrindo Termodinâmica, Mecânica dos Fluidos, Transferência de Calor, Resistência dos Materiais (Mohr / von Mises / Tresca), Vibrações, Máquinas de Fluxo (API 610 / NPSH), NR-13 / ASME VIII, Eletromagnetismo, Circuitos Trifásicos, Máquinas Elétricas, Sistemas de Potência (Fortescue), NR-10 / NBR 5410 / IEC 60079, Controle, Eletrônica de Potência, Matemática Superior, Português (Cesgranrio/FGV) e Inglês Técnico.
- **Caderno & Teoria**: Seções teóricas completas em LaTeX/KaTeX, aba de **Formulário Direto**, barra rápida de seções, videoaulas e bloco de anotações pessoais salvo localmente.
- **11 Simuladores Interativos em SVG**: Círculo de Mohr 2D, Ciclos Brayton/Rankine, Bocal de Laval, Curva de Bomba + NPSH, Diagrama $\text{Fe}-\text{Fe}_3\text{C}$, Transmissibilidade de Vibrações, Fasores Trifásicos, Torque de Kloss (MIT), Diagrama de Bode, Conversores Buck/Boost e Faltas Assimétricas (Fortescue).
- **56 Questões Comentadas**: Múltipla Escolha (Cesgranrio/FGV/Vunesp/Marinha) e Certo/Errado (Cebraspe) com folha de rascunho opcional, resolução analítica passo a passo e classificação de erros.
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
