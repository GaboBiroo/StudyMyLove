import { describe, expect, it } from 'vitest';
import {
  ALL_FLASHCARDS,
  ALL_QUESTIONS,
  createInitialUserProfile,
} from '../data/curriculum';
import {
  applyErrorTagToLastAttempt,
  recordFlashcardReview,
  recordQuestionAttempt,
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
});
