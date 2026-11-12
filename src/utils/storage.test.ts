import { describe, expect, it } from 'vitest';
import {
  ALL_FLASHCARDS,
  ALL_QUESTIONS,
  createInitialUserProfile,
} from '../data/curriculum';
import {
  applyErrorTagToLastAttempt,
  clearActiveSimuladoSession,
  loadSavedExerciseSession,
  loadSavedSimuladoSession,
  recordFlashcardReview,
  recordQuestionAttempt,
  saveActiveSimuladoSession,
  saveExerciseSession,
} from './storage';

describe('Storage & Psychometric Mutation Pipeline', () => {
  it('updates IRT theta, BKT P(L), and FSRS stability upon solving questions', () => {
    const initial = createInitialUserProfile('blank');
    const q = ALL_QUESTIONS[0];

    const res1 = recordQuestionAttempt(initial, {
      question: q,
      correct: true,
      timeSpentSec: 120,
      wasGuess: false,
    });

    const mtAfter1 = res1.nextProfile.microtopics[q.microtopicId];
    expect(mtAfter1.theta).toBeGreaterThan(initial.microtopics[q.microtopicId].theta);
    expect(mtAfter1.pKnown).toBeGreaterThan(initial.microtopics[q.microtopicId].pKnown);
    expect(mtAfter1.responses).toHaveLength(1);
    expect(res1.nextProfile.totalMinutesStudied).toBeGreaterThanOrEqual(2);
  });

  it('applies Reverse Engineering error tags and updates BKT slip/guess counters', () => {
    const initial = createInitialUserProfile('calibrated');
    const q = ALL_QUESTIONS[1];

    const failed = recordQuestionAttempt(initial, {
      question: q,
      correct: false,
      timeSpentSec: 90,
      wasGuess: false,
    });

    const tagged = applyErrorTagToLastAttempt(
      failed.nextProfile,
      q.microtopicId,
      q.id,
      'slip'
    );

    const prog = tagged.microtopics[q.microtopicId];
    expect(prog.errorCounts.slip).toBe(
      initial.microtopics[q.microtopicId].errorCounts.slip + 1
    );
    expect(prog.responses[prog.responses.length - 1].errorCategory).toBe('slip');
    expect(prog.pSlip).toBeGreaterThanOrEqual(
      initial.microtopics[q.microtopicId].pSlip
    );
  });

  it('updates flashcard stability, nextReviewISO, and reinforcing microtopic BKT on review', () => {
    const initial = createInitialUserProfile('blank');
    const fc = ALL_FLASHCARDS[0];

    const resEasy = recordFlashcardReview(initial, fc.id, 4);
    expect(resEasy.nextIntervalDays).toBeGreaterThanOrEqual(2);
    expect(resEasy.nextProfile.flashcards[fc.id].reps).toBe(1);
    expect(resEasy.nextProfile.microtopics[fc.microtopicId].pKnown).toBeGreaterThan(
      initial.microtopics[fc.microtopicId].pKnown
    );

    const resAgain = recordFlashcardReview(resEasy.nextProfile, fc.id, 1);
    expect(resAgain.nextIntervalDays).toBe(1);
    expect(resAgain.nextProfile.flashcards[fc.id].lapses).toBe(1);
  });

  it('persists and restores in-progress Simulado and Exercise sessions in real time', () => {
    const mockLocalStorage = new Map<string, string>();
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (k: string) => mockLocalStorage.get(k) ?? null,
        setItem: (k: string, v: string) => mockLocalStorage.set(k, v),
        removeItem: (k: string) => mockLocalStorage.delete(k),
      },
      configurable: true,
    });

    saveExerciseSession({
      microtopicFilter: 'm-thermo-cycles',
      boardFilter: 'all',
      categoryFilter: 'all',
      typeFilter: 'all',
      onlyUnresolved: false,
      currentIdx: 42,
      scratchText: 'η = 1 - T_L/T_H',
      savedAtISO: new Date().toISOString(),
    });
    const loadedEx = loadSavedExerciseSession();
    expect(loadedEx?.microtopicFilter).toBe('m-thermo-cycles');
    expect(loadedEx?.currentIdx).toBe(42);
    expect(loadedEx?.scratchText).toContain('T_L/T_H');

    saveActiveSimuladoSession({
      session: {
        id: 'sim-test',
        bossId: 'galactaknight',
        name: 'Simulado Diagnóstico Sem Tempo',
        board: 'Geral',
        boardLabel: 'Europa — CERN / ESA',
        themeLabel: 'MEC-06 — Resistência dos Materiais',
        untimed: true,
        secPerQuestion: 180,
      },
      questionIds: ['q-mec-06-001', 'q-mec-06-002'],
      answersMap: { 'q-mec-06-001': 2 },
      recordedQuestionIds: ['q-mec-06-001'],
      cursorIdx: 1,
      remainingSec: 36000,
      elapsedSec: 125,
      initialDurationSec: 36000,
      savedAtISO: new Date().toISOString(),
    });
    const loadedSim = loadSavedSimuladoSession();
    expect(loadedSim?.session.themeLabel).toContain('MEC-06');
    expect(loadedSim?.answersMap['q-mec-06-001']).toBe(2);
    expect(loadedSim?.cursorIdx).toBe(1);

    clearActiveSimuladoSession();
    expect(loadSavedSimuladoSession()).toBeNull();
  });
});
