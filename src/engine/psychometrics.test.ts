import { describe, expect, it } from 'vitest';
import {
  estimateThetaNewtonRaphson,
  evaluateSimulationScore,
  fsrsOptimalInterval,
  fsrsRetention,
  fsrsUpdate,
  irtFisherInformation,
  irtProbability,
  updateBKT,
} from './psychometrics';

describe('Psychometric Engine (IRT 3PL, BKT, FSRS)', () => {
  it('computes exact 3PL probability and asymptotic limits', () => {
    // At theta = b, P(theta) = c + (1 - c) / 2
    const pAtB = irtProbability(1.0, 1.5, 1.0, 0.2);
    expect(pAtB).toBeCloseTo(0.6, 6);

    // High ability approaches 1
    expect(irtProbability(5.0, 1.5, 0.0, 0.2)).toBeGreaterThan(0.999);

    // Very low ability approaches c = 0.20
    expect(irtProbability(-5.0, 1.5, 0.0, 0.2)).toBeCloseTo(0.2, 4);
  });

  it('computes positive Fisher Information peaking near difficulty b', () => {
    const infoAtLow = irtFisherInformation(-2.0, 1.4, 1.0, 0.2);
    const infoNearB = irtFisherInformation(1.2, 1.4, 1.0, 0.2);
    expect(infoNearB).toBeGreaterThan(infoAtLow);
    expect(infoNearB).toBeGreaterThan(0);
  });

  it('converges Newton-Raphson proficiency upward on correct harder items and downward on misses', () => {
    const highEstimate = estimateThetaNewtonRaphson([
      { correct: true, a: 1.4, b: 0.5, c: 0.2 },
      { correct: true, a: 1.5, b: 1.2, c: 0.2 },
      { correct: true, a: 1.6, b: 1.8, c: 0.2 },
      { correct: false, a: 1.3, b: 2.6, c: 0.2 },
    ]);
    expect(highEstimate.theta).toBeGreaterThan(1.4);
    expect(highEstimate.standardError).toBeLessThan(1.0);

    const lowEstimate = estimateThetaNewtonRaphson([
      { correct: false, a: 1.4, b: -0.5, c: 0.2 },
      { correct: false, a: 1.5, b: 0.2, c: 0.2 },
      { correct: false, a: 1.3, b: 0.8, c: 0.2 },
    ]);
    expect(lowEstimate.theta).toBeLessThan(-0.3);
  });

  it('updates BKT mastery via Bayes rule and differentiates algebraic slip vs conceptual gap', () => {
    const conceptualMiss = updateBKT({
      pKnown: 0.75,
      pTransit: 0.15,
      pGuess: 0.20,
      pSlip: 0.10,
      correct: false,
      errorCategory: 'conceptual',
    });

    const slipMiss = updateBKT({
      pKnown: 0.75,
      pTransit: 0.15,
      pGuess: 0.20,
      pSlip: 0.10,
      correct: false,
      errorCategory: 'slip',
    });

    // Conceptual error reduces posterior mastery significantly more than a calculation slip
    expect(conceptualMiss.pKnownPosterior).toBeLessThan(slipMiss.pKnownPosterior);

    const solidHit = updateBKT({
      pKnown: 0.85,
      pTransit: 0.15,
      pGuess: 0.20,
      pSlip: 0.10,
      correct: true,
    });
    expect(solidHit.pKnownNext).toBeGreaterThan(0.95);
  });

  it('guarantees FSRS identity R(S, S) = 0.90 and optimal interval equals stability S at 90% target', () => {
    expect(fsrsRetention(14, 14)).toBeCloseTo(0.9, 6);
    expect(fsrsOptimalInterval(14, 0.9)).toBe(14);
    expect(fsrsOptimalInterval(28, 0.9)).toBe(28);
  });

  it('grows FSRS stability on Good/Easy review and contracts on Again lapse', () => {
    const goodRes = fsrsUpdate({
      stabilityDays: 10,
      difficulty: 5,
      elapsedDays: 10,
      grade: 3,
    });
    expect(goodRes.newStabilityDays).toBeGreaterThan(10);
    expect(goodRes.nextIntervalDays).toBeGreaterThan(10);

    const lapseRes = fsrsUpdate({
      stabilityDays: 10,
      difficulty: 5,
      elapsedDays: 10,
      grade: 1,
    });
    expect(lapseRes.newStabilityDays).toBeLessThan(10);
    expect(lapseRes.nextIntervalDays).toBe(1);
    expect(lapseRes.newDifficulty).toBeGreaterThan(5);
  });

  it('enforces Cebraspe -1 penalty and Cesgranrio 50% basic cutoff rule', () => {
    const cebraspe = evaluateSimulationScore({
      board: 'Cebraspe',
      answers: [
        { isBasic: true, status: 'correct' },
        { isBasic: true, status: 'wrong' },
        { isBasic: false, status: 'correct' },
        { isBasic: false, status: 'wrong' },
        { isBasic: false, status: 'blank' },
      ],
    });
    expect(cebraspe.netScore).toBe(0); // 2 right - 2 wrong = 0
    expect(cebraspe.basicCutoffPassed).toBe(true); // 50%

    const cesgranrioFailBasic = evaluateSimulationScore({
      board: 'Cesgranrio',
      answers: [
        { isBasic: true, status: 'wrong' },
        { isBasic: true, status: 'wrong' },
        { isBasic: true, status: 'correct' },
        { isBasic: false, status: 'correct' },
      ],
    });
    expect(cesgranrioFailBasic.netScore).toBe(2);
    expect(cesgranrioFailBasic.basicCutoffPassed).toBe(false); // 33% < 50%
  });
});
