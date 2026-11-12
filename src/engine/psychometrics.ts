import type {
  ErrorCategory,
  FsrsRating,
  IrtResponseRecord,
  MicrotopicProgress,
} from '../types/study';

export const IRT_D = 1.702;

// Calibrated FSRS-4.5/5 power-law parameters matching R(S, S) = 0.90
export const FSRS_DECAY_W = 0.5;
export const FSRS_FACTOR = 19 / 81; // (0.9)^(-1/0.5) - 1 = 100/81 - 1 = 19/81

export const FSRS_WEIGHTS = {
  w0: 0.4,   // initial S for Again
  w1: 1.6,   // initial S for Hard
  w2: 3.5,   // initial S for Good
  w3: 8.0,   // initial S for Easy
  w4: 5.0,   // initial D baseline
  w5: 0.94,
  w6: 0.86,  // D' = D - w6*(G - 3)
  w7: 0.05,  // mean reversion weight toward D0(4)
  w8: 1.5,   // e^(w8) in success multiplier
  w9: 0.14,  // S^(-w9)
  w10: 0.94, // e^(w10 * (1 - R)) - 1
  w11: 1.94, // lapse multiplier
  w12: 0.11, // D^(-w12)
  w13: 0.29, // ((S+1)^w13 - 1)
  w14: 2.27, // e^(w14 * (1 - R))
  w15: 0.6,  // hard penalty
  w16: 1.4,  // easy bonus
} as const;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * 3-Parameter Logistic (3PL) Item Response Theory probability.
 * P_i(theta) = c_i + (1 - c_i) / (1 + exp(-D * a_i * (theta - b_i)))
 */
export function irtProbability(
  theta: number,
  a: number,
  b: number,
  c: number
): number {
  const z = clamp(IRT_D * a * (theta - b), -35, 35);
  return c + (1 - c) / (1 + Math.exp(-z));
}

/**
 * Fisher Information Function for a 3PL item:
 * I_i(theta) = [D^2 * a^2 * (1 - c)] / [(c + exp(z)) * (1 + exp(-z))^2]
 */
export function irtFisherInformation(
  theta: number,
  a: number,
  b: number,
  c: number
): number {
  const z = clamp(IRT_D * a * (theta - b), -30, 30);
  const expPos = Math.exp(z);
  const expNeg = Math.exp(-z);
  const num = IRT_D * IRT_D * a * a * (1 - c);
  const den = (c + expPos) * Math.pow(1 + expNeg, 2);
  if (den <= 1e-12) return 0;
  return num / den;
}

/**
 * Iterative Newton-Raphson proficiency estimator (MAP-regularized MLE)
 * guaranteeing bounded convergence even for small N or uniform response strings.
 */
export function estimateThetaNewtonRaphson(
  responses: Pick<IrtResponseRecord, 'correct' | 'a' | 'b' | 'c'>[],
  initialTheta = 0,
  priorMean = 0,
  priorVariance = 2.25
): { theta: number; standardError: number; totalInformation: number } {
  if (responses.length === 0) {
    return {
      theta: clamp(initialTheta, -3.5, 3.5),
      standardError: Math.sqrt(priorVariance),
      totalInformation: 1 / priorVariance,
    };
  }

  let theta = clamp(initialTheta, -3.0, 3.0);
  const priorPrec = 1 / priorVariance;

  for (let iter = 0; iter < 25; iter++) {
    let grad = priorPrec * (priorMean - theta);
    let info = priorPrec;

    for (const item of responses) {
      const u = item.correct ? 1 : 0;
      const p = Math.max(irtProbability(theta, item.a, item.b, item.c), 1e-6);
      const itemInfo = irtFisherInformation(theta, item.a, item.b, item.c);
      const weight = (p - item.c) / ((1 - item.c) * p);
      grad += IRT_D * item.a * (u - p) * weight;
      info += itemInfo;
    }

    const step = clamp(grad / Math.max(info, 1e-6), -0.75, 0.75);
    theta = clamp(theta + step, -3.5, 3.5);
    if (Math.abs(step) < 1e-4) break;
  }

  let totalInfo = priorPrec;
  for (const item of responses) {
    totalInfo += irtFisherInformation(theta, item.a, item.b, item.c);
  }

  return {
    theta: Number(theta.toFixed(3)),
    standardError: Number((1 / Math.sqrt(Math.max(totalInfo, 1e-6))).toFixed(3)),
    totalInformation: Number(totalInfo.toFixed(3)),
  };
}

/**
 * Bayesian Knowledge Tracing (BKT) update coupled with Error Reverse Engineering.
 * Classifying an error as algebraic slip vs conceptual/normative gap feeds directly
 * into effective P(S) and P(G).
 */
export function updateBKT(params: {
  pKnown: number;
  pTransit: number;
  pGuess: number;
  pSlip: number;
  correct: boolean;
  errorCategory?: ErrorCategory;
  wasGuess?: boolean;
}): {
  pKnownPosterior: number;
  pKnownNext: number;
  updatedGuess: number;
  updatedSlip: number;
} {
  const { pKnown, pTransit, pGuess, pSlip, correct, errorCategory, wasGuess } = params;

  let effGuess = pGuess;
  let effSlip = pSlip;

  if (!correct && errorCategory) {
    if (errorCategory === 'slip') {
      effSlip = clamp(pSlip + 0.14, 0.04, 0.30);
    } else if (errorCategory === 'conceptual' || errorCategory === 'normative') {
      effSlip = clamp(pSlip - 0.04, 0.02, 0.25);
    } else if (errorCategory === 'trap') {
      effSlip = clamp(pSlip + 0.05, 0.03, 0.28);
    }
  }

  if (correct && wasGuess) {
    effGuess = clamp(pGuess + 0.22, 0.08, 0.48);
  }

  let posterior: number;
  if (correct) {
    const num = pKnown * (1 - effSlip);
    const den = num + (1 - pKnown) * effGuess;
    posterior = den > 0 ? num / den : pKnown;
  } else {
    const num = pKnown * effSlip;
    const den = num + (1 - pKnown) * (1 - effGuess);
    posterior = den > 0 ? num / den : pKnown;
  }

  const next = posterior + (1 - posterior) * pTransit;

  // Smooth adaptation of student's Slip / Guess parameters
  const updatedSlip =
    !correct && errorCategory === 'slip'
      ? Number(clamp(pSlip * 0.85 + 0.22 * 0.15, 0.04, 0.25).toFixed(3))
      : !correct && (errorCategory === 'conceptual' || errorCategory === 'normative')
        ? Number(clamp(pSlip * 0.9 + 0.06 * 0.1, 0.04, 0.25).toFixed(3))
        : pSlip;

  const updatedGuess =
    correct && wasGuess
      ? Number(clamp(pGuess * 0.85 + 0.35 * 0.15, 0.08, 0.38).toFixed(3))
      : correct
        ? Number(clamp(pGuess * 0.95 + 0.15 * 0.05, 0.08, 0.38).toFixed(3))
        : pGuess;

  return {
    pKnownPosterior: Number(clamp(posterior, 0.01, 0.999).toFixed(4)),
    pKnownNext: Number(clamp(next, 0.01, 0.999).toFixed(4)),
    updatedGuess,
    updatedSlip,
  };
}

/**
 * FSRS Power-Law Forgetting Curve:
 * R(t, S) = (1 + FATOR * t / S)^(-w)
 */
export function fsrsRetention(elapsedDays: number, stabilityDays: number): number {
  const t = Math.max(0, elapsedDays);
  const s = Math.max(0.1, stabilityDays);
  const r = Math.pow(1 + FSRS_FACTOR * (t / s), -FSRS_DECAY_W);
  return clamp(r, 0.01, 1);
}

/**
 * FSRS Optimal Next Interval (in days) for target retention (default 90%).
 * I = (S / FATOR) * (R_target^(-1/w) - 1)
 */
export function fsrsOptimalInterval(
  stabilityDays: number,
  targetRetention = 0.90
): number {
  const s = Math.max(0.2, stabilityDays);
  const rTarget = clamp(targetRetention, 0.7, 0.98);
  const interval =
    (s / FSRS_FACTOR) * (Math.pow(rTarget, -1 / FSRS_DECAY_W) - 1);
  return Math.max(1, Math.round(interval));
}

/**
 * FSRS state transition update after active recall rating G in {1, 2, 3, 4}.
 */
export function fsrsUpdate(params: {
  stabilityDays: number;
  difficulty: number;
  elapsedDays: number;
  grade: FsrsRating;
  isFirstReview?: boolean;
  targetRetention?: number;
}): {
  newStabilityDays: number;
  newDifficulty: number;
  retentionAtReview: number;
  nextIntervalDays: number;
} {
  const {
    stabilityDays,
    difficulty,
    elapsedDays,
    grade,
    isFirstReview = false,
    targetRetention = 0.90,
  } = params;

  const w = FSRS_WEIGHTS;
  const retention = fsrsRetention(elapsedDays, stabilityDays);

  // D0(4) reference difficulty for Easy baseline
  const d0Easy = clamp(w.w4 - (4 - 3) * w.w5, 1, 10);
  const dPrime = difficulty - w.w6 * (grade - 3);
  const newDifficulty = Number(
    clamp(w.w7 * d0Easy + (1 - w.w7) * dPrime, 1, 10).toFixed(2)
  );

  let newStability: number;

  if (isFirstReview) {
    const initMap: Record<FsrsRating, number> = {
      1: w.w0,
      2: w.w1,
      3: w.w2,
      4: w.w3,
    };
    newStability = initMap[grade];
  } else if (grade === 1) {
    // Lapse update
    newStability =
      w.w11 *
      Math.pow(newDifficulty, -w.w12) *
      (Math.pow(stabilityDays + 1, w.w13) - 1) *
      Math.exp(w.w14 * (1 - retention));
    newStability = clamp(newStability, 0.3, stabilityDays);
  } else {
    // Success update (Hard=2, Good=3, Easy=4)
    const modifier =
      grade === 2 ? w.w15 : grade === 4 ? w.w16 : 1.0;
    const growth =
      Math.exp(w.w8) *
      (11 - newDifficulty) *
      Math.pow(Math.max(stabilityDays, 0.3), -w.w9) *
      (Math.exp(w.w10 * (1 - retention)) - 1) *
      modifier;
    newStability = stabilityDays * (1 + Math.max(0.05, growth));
  }

  newStability = Number(clamp(newStability, 0.25, 365).toFixed(2));
  const nextIntervalDays =
    grade === 1 ? 1 : fsrsOptimalInterval(newStability, targetRetention);

  return {
    newStabilityDays: newStability,
    newDifficulty,
    retentionAtReview: Number(retention.toFixed(3)),
    nextIntervalDays,
  };
}

export function daysBetweenISO(fromISO: string, toDate = new Date()): number {
  const from = new Date(fromISO).getTime();
  const to = toDate.getTime();
  if (Number.isNaN(from)) return 0;
  return Math.max(0, (to - from) / (1000 * 60 * 60 * 24));
}

export function addDaysISO(days: number, fromDate = new Date()): string {
  const next = new Date(fromDate.getTime() + days * 24 * 60 * 60 * 1000);
  return next.toISOString();
}

export interface DiagnosticSummary {
  statusLabel:
    | 'Maestria Plena'
    | 'Consolidado / Excelente'
    | 'Estável / Seguro'
    | 'Estável / Atenção'
    | 'Em Desenvolvimento'
    | 'Limítrofe / Atenção'
    | 'Deficitário / Alerta'
    | 'Crítico / Insuficiente';
  tone: 'gold' | 'green' | 'blue' | 'amber' | 'red';
  projectedRetention: number;
  intervention: string;
  recommendedMode: 'reading' | 'video' | 'drills' | 'revision' | 'boss';
  priorityScore: number; // Higher = needs urgent focus
}

export function diagnoseMicrotopic(
  progress: MicrotopicProgress,
  now = new Date()
): DiagnosticSummary {
  const elapsed = daysBetweenISO(progress.lastReviewISO, now);
  const retention = fsrsRetention(elapsed, progress.stabilityDays);
  const { theta, pKnown, errorCounts } = progress;

  let statusLabel: DiagnosticSummary['statusLabel'];
  let tone: DiagnosticSummary['tone'];
  let intervention: string;
  let recommendedMode: DiagnosticSummary['recommendedMode'];

  if (theta >= 2.25 && pKnown >= 0.98 && retention >= 0.93) {
    statusLabel = 'Maestria Plena';
    tone = 'gold';
    intervention =
      'Manter espaçamento longo no FSRS e resolver apenas itens interdisciplinares ou pegadinhas avançadas.';
    recommendedMode = 'boss';
  } else if (theta >= 1.9 && pKnown >= 0.95 && retention >= 0.88) {
    statusLabel = 'Consolidado / Excelente';
    tone = 'green';
    intervention = `Espaçamento longo no FSRS (próxima revisão ativa em ${fsrsOptimalInterval(
      progress.stabilityDays
    )} dias) + simulado cronometrado.`;
    recommendedMode = 'revision';
  } else if (theta >= 1.65 && pKnown >= 0.90) {
    statusLabel = 'Estável / Seguro';
    tone = 'green';
    intervention =
      'Manutenção espaçada com baterias curtas de 3 a 5 questões cronometradas padrão Cesgranrio/Cebraspe.';
    recommendedMode = 'drills';
  } else if (theta >= 1.4 && pKnown >= 0.85) {
    statusLabel = 'Estável / Atenção';
    tone = 'blue';
    intervention =
      'Reforçar pontos de maior atrito e validar velocidade de cálculo passo a passo.';
    recommendedMode = 'drills';
  } else if (theta >= 1.0 && pKnown >= 0.78) {
    statusLabel = 'Em Desenvolvimento';
    tone = 'blue';
    intervention =
      'Conjunto intensivo de exercícios comentados + flashcards de equações fundamentais.';
    recommendedMode = 'drills';
  } else if (theta >= 0.6 && pKnown >= 0.68) {
    statusLabel = 'Limítrofe / Atenção';
    tone = 'amber';
    intervention =
      'Releitura guiada do compêndio teórico e dedução manual de diagramas antes de avançar.';
    recommendedMode = 'reading';
  } else if (theta >= 0.1 && pKnown >= 0.52) {
    statusLabel = 'Deficitário / Alerta';
    tone = 'red';
    intervention =
      'Reintrodução prioritária no Bloco Matutino com videoaula direcionada + memorial passo a passo.';
    recommendedMode = 'video';
  } else {
    statusLabel = 'Crítico / Insuficiente';
    tone = 'red';
    intervention =
      'Foco imediato: pausa em novos tópicos, assistir aula base + reconstruir teoria e resolver nível 1.';
    recommendedMode = 'reading';
  }

  // Override targeted suggestion if normative or slip errors dominate
  const totalErr =
    errorCounts.conceptual +
    errorCounts.normative +
    errorCounts.slip +
    errorCounts.trap;
  if (totalErr >= 2) {
    if (errorCounts.normative > errorCounts.conceptual && errorCounts.normative >= errorCounts.slip) {
      intervention += ' (Atenção: predominância de desvios normativos — revisar flashcards de normas NR/NBR/ASME/API).';
      if (recommendedMode === 'drills') recommendedMode = 'revision';
    } else if (errorCounts.slip > errorCounts.conceptual + 1) {
      intervention += ' (Atenção: deslizes algébricos/unidades recorrentes — conferir análise dimensional antes de marcar).';
    }
  }

  // Priority score: combines low pKnown, low theta, and decaying retention
  const priorityScore = Number(
    (
      (1 - pKnown) * 50 +
      Math.max(0, 2.0 - theta) * 18 +
      Math.max(0, 0.92 - retention) * 60
    ).toFixed(2)
  );

  return {
    statusLabel,
    tone,
    projectedRetention: Number((retention * 100).toFixed(1)),
    intervention,
    recommendedMode,
    priorityScore,
  };
}

/**
 * Exam simulation scoring matching Cesgranrio (50% basic cutoff) & Cebraspe (+1 / -1 net score).
 */
export function evaluateSimulationScore(params: {
  board: 'Cesgranrio' | 'Cebraspe' | 'Geral';
  answers: Array<{
    isBasic: boolean;
    status: 'correct' | 'wrong' | 'blank';
  }>;
}): {
  correctCount: number;
  wrongCount: number;
  blankCount: number;
  netScore: number;
  maxScore: number;
  basicAccuracyPct: number;
  basicCutoffPassed: boolean;
} {
  const { board, answers } = params;
  let correctCount = 0;
  let wrongCount = 0;
  let blankCount = 0;
  let basicTotal = 0;
  let basicCorrect = 0;

  for (const a of answers) {
    if (a.isBasic) basicTotal++;
    if (a.status === 'correct') {
      correctCount++;
      if (a.isBasic) basicCorrect++;
    } else if (a.status === 'wrong') {
      wrongCount++;
    } else {
      blankCount++;
    }
  }

  const maxScore = answers.length;
  const netScore =
    board === 'Cebraspe'
      ? correctCount - wrongCount
      : correctCount;

  const basicAccuracyPct =
    basicTotal > 0 ? Math.round((basicCorrect / basicTotal) * 100) : 100;
  const basicCutoffPassed =
    basicTotal === 0 ? true : basicAccuracyPct >= 50;

  return {
    correctCount,
    wrongCount,
    blankCount,
    netScore,
    maxScore,
    basicAccuracyPct,
    basicCutoffPassed,
  };
}
