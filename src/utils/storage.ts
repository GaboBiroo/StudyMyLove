import {
  ALL_MICROTOPICS,
  createInitialUserProfile,
} from '../data/curriculum';
import {
  addDaysISO,
  daysBetweenISO,
  estimateThetaNewtonRaphson,
  fsrsUpdate,
  updateBKT,
} from '../engine/psychometrics';
import type {
  ErrorCategory,
  ExamBoard,
  ExerciseQuestion,
  FsrsRating,
  UserStudyProfile,
} from '../types/study';

const STORAGE_KEY = 'studymylove_thaisa_zeroed_v3';
const ACTIVE_SIMULADO_STORAGE_KEY = 'studymylove_active_simulado_v1';
const EXERCISE_SESSION_STORAGE_KEY = 'studymylove_exercise_session_v1';

export interface SavedSimuladoSessionState {
  session: {
    id: string;
    bossId: 'dedede' | 'metaknight' | 'galactaknight';
    name: string;
    board: 'Cesgranrio' | 'Cebraspe' | 'Geral';
    boardLabel: ExamBoard;
    themeLabel: string;
    untimed: boolean;
    secPerQuestion: number;
  };
  questionIds: string[];
  answersMap: Record<string, number | boolean | null>;
  recordedQuestionIds?: string[];
  cursorIdx: number;
  remainingSec: number;
  elapsedSec: number;
  initialDurationSec: number;
  savedAtISO: string;
  paused?: boolean;
}

export interface SavedExerciseSessionState {
  microtopicFilter: string;
  boardFilter: string;
  categoryFilter: string;
  typeFilter: 'all' | 'mcq5' | 'cebraspe_tf';
  onlyUnresolved: boolean;
  currentIdx: number;
  scratchText: string;
  savedAtISO: string;
}

export function loadSavedSimuladoSession(): SavedSimuladoSessionState | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SIMULADO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedSimuladoSessionState;
    if (!parsed || !parsed.session || !Array.isArray(parsed.questionIds)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveActiveSimuladoSession(
  state: SavedSimuladoSessionState
): void {
  try {
    localStorage.setItem(ACTIVE_SIMULADO_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearActiveSimuladoSession(): void {
  try {
    localStorage.removeItem(ACTIVE_SIMULADO_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function loadSavedExerciseSession(): SavedExerciseSessionState | null {
  try {
    const raw = localStorage.getItem(EXERCISE_SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedExerciseSessionState;
  } catch {
    return null;
  }
}

export function saveExerciseSession(state: SavedExerciseSessionState): void {
  try {
    localStorage.setItem(EXERCISE_SESSION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadUserProfile(): UserStudyProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialUserProfile('blank');
    const parsed = JSON.parse(raw) as UserStudyProfile;
    if (!parsed || !parsed.microtopics) {
      return createInitialUserProfile('blank');
    }

    // Ensure any newly added microtopics exist safely
    const fresh = createInitialUserProfile('blank');
    for (const mt of ALL_MICROTOPICS) {
      if (!parsed.microtopics[mt.id]) {
        parsed.microtopics[mt.id] = fresh.microtopics[mt.id];
      }
    }
    for (const fcId of Object.keys(fresh.flashcards)) {
      if (!parsed.flashcards[fcId]) {
        parsed.flashcards[fcId] = fresh.flashcards[fcId];
      }
    }

    // Reset daily routine checklist if date changed
    const todayISO = new Date().toISOString().slice(0, 10);
    if (parsed.routineDateISO !== todayISO) {
      parsed.routineDateISO = todayISO;
      parsed.completedRoutineBlocksToday = [];
      parsed.dayParity = new Date().getDate() % 2 === 1 ? 'odd' : 'even';
    }

    return parsed;
  } catch {
    return createInitialUserProfile('blank');
  }
}

export function saveUserProfile(profile: UserStudyProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore quota errors cleanly
  }
}

export function recordQuestionAttempt(
  profile: UserStudyProfile,
  params: {
    question: ExerciseQuestion;
    correct: boolean;
    timeSpentSec: number;
    wasGuess?: boolean;
    errorCategory?: ErrorCategory;
  }
): {
  nextProfile: UserStudyProfile;
  deltaTheta: number;
  deltaPKnown: number;
} {
  const { question, correct, timeSpentSec, wasGuess, errorCategory } = params;
  const mtId = question.microtopicId;
  const prev = profile.microtopics[mtId];
  if (!prev) {
    return { nextProfile: profile, deltaTheta: 0, deltaPKnown: 0 };
  }

  const now = new Date();
  const newRecord = {
    questionId: question.id,
    correct,
    a: question.irt.a,
    b: question.irt.b,
    c: question.irt.c,
    timestamp: now.toISOString(),
    timeSpentSec,
    wasGuess,
    errorCategory,
  };

  const responses = [...prev.responses, newRecord];

  // Combine prior theta softly with new responses so baseline doesn't wildly jump on 1 question
  const recentWindow = responses.slice(-120);
  const irtResult = estimateThetaNewtonRaphson(
    recentWindow,
    prev.theta,
    prev.theta * 0.65,
    1.6
  );

  const bkt = updateBKT({
    pKnown: prev.pKnown,
    pTransit: prev.pTransit,
    pGuess: prev.pGuess,
    pSlip: prev.pSlip,
    correct,
    errorCategory,
    wasGuess,
  });

  const elapsed = daysBetweenISO(prev.lastReviewISO, now);
  const fsrsRes = fsrsUpdate({
    stabilityDays: prev.stabilityDays,
    difficulty: prev.difficulty,
    elapsedDays: elapsed,
    grade: correct ? (wasGuess ? 2 : 3) : 1,
    isFirstReview: prev.fsrsReps === 0,
  });

  const nextErrorCounts = { ...prev.errorCounts };
  if (!correct && errorCategory) {
    nextErrorCounts[errorCategory] = (nextErrorCounts[errorCategory] ?? 0) + 1;
  }

  const updatedMt = {
    ...prev,
    theta: irtResult.theta,
    standardError: irtResult.standardError,
    responses,
    pKnown: bkt.pKnownNext,
    pGuess: bkt.updatedGuess,
    pSlip: bkt.updatedSlip,
    stabilityDays: fsrsRes.newStabilityDays,
    difficulty: fsrsRes.newDifficulty,
    lastReviewISO: now.toISOString(),
    nextReviewISO: addDaysISO(fsrsRes.nextIntervalDays, now),
    fsrsReps: prev.fsrsReps + 1,
    fsrsLapses: prev.fsrsLapses + (correct ? 0 : 1),
    errorCounts: nextErrorCounts,
  };

  const nextProfile: UserStudyProfile = {
    ...profile,
    totalMinutesStudied:
      profile.totalMinutesStudied + Math.max(1, Math.round(timeSpentSec / 60)),
    microtopics: {
      ...profile.microtopics,
      [mtId]: updatedMt,
    },
  };

  return {
    nextProfile,
    deltaTheta: Number((updatedMt.theta - prev.theta).toFixed(3)),
    deltaPKnown: Number((updatedMt.pKnown - prev.pKnown).toFixed(4)),
  };
}

export function applyErrorTagToLastAttempt(
  profile: UserStudyProfile,
  microtopicId: string,
  questionId: string,
  category: ErrorCategory
): UserStudyProfile {
  const prev = profile.microtopics[microtopicId];
  if (!prev) return profile;

  const updatedResponses = prev.responses.map((r, idx) =>
    idx === prev.responses.length - 1 && r.questionId === questionId
      ? { ...r, errorCategory: category }
      : r
  );

  // Re-adjust BKT slip/guess lightly based on explicit reflection
  const bktAdjust = updateBKT({
    pKnown: prev.pKnown,
    pTransit: 0.04,
    pGuess: prev.pGuess,
    pSlip: prev.pSlip,
    correct: false,
    errorCategory: category,
  });

  return {
    ...profile,
    microtopics: {
      ...profile.microtopics,
      [microtopicId]: {
        ...prev,
        responses: updatedResponses,
        pGuess: bktAdjust.updatedGuess,
        pSlip: bktAdjust.updatedSlip,
        errorCounts: {
          ...prev.errorCounts,
          [category]: (prev.errorCounts[category] ?? 0) + 1,
        },
      },
    },
  };
}

export function recordFlashcardReview(
  profile: UserStudyProfile,
  cardId: string,
  grade: FsrsRating
): { nextProfile: UserStudyProfile; nextIntervalDays: number } {
  const prevCard = profile.flashcards[cardId];
  if (!prevCard) return { nextProfile: profile, nextIntervalDays: 1 };

  const now = new Date();
  const elapsed = daysBetweenISO(prevCard.lastReviewISO, now);
  const res = fsrsUpdate({
    stabilityDays: prevCard.stabilityDays,
    difficulty: prevCard.difficulty,
    elapsedDays: elapsed,
    grade,
    isFirstReview: prevCard.reps === 0,
  });

  const mt = profile.microtopics[prevCard.microtopicId];
  let updatedMt = mt;
  if (mt) {
    // Active recall review reinforces microtopic stability & BKT slightly
    const basePKnown = mt.pKnown <= 0.001 ? 0.25 : mt.pKnown;
    const bktBonus =
      grade >= 3
        ? Math.min(0.995, basePKnown + (1 - basePKnown) * 0.12)
        : Math.max(0.10, basePKnown * 0.85);

    updatedMt = {
      ...mt,
      pKnown: Number(bktBonus.toFixed(4)),
      stabilityDays: Number(
        (mt.stabilityDays * 0.6 + res.newStabilityDays * 0.4).toFixed(2)
      ),
      lastReviewISO: now.toISOString(),
      nextReviewISO: addDaysISO(res.nextIntervalDays, now),
    };
  }

  const nextProfile: UserStudyProfile = {
    ...profile,
    totalMinutesStudied: profile.totalMinutesStudied + 1,
    flashcards: {
      ...profile.flashcards,
      [cardId]: {
        ...prevCard,
        stabilityDays: res.newStabilityDays,
        difficulty: res.newDifficulty,
        lastReviewISO: now.toISOString(),
        nextReviewISO: addDaysISO(res.nextIntervalDays, now),
        reps: prevCard.reps + 1,
        lapses: prevCard.lapses + (grade === 1 ? 1 : 0),
      },
    },
    microtopics: updatedMt
      ? {
          ...profile.microtopics,
          [prevCard.microtopicId]: updatedMt,
        }
      : profile.microtopics,
  };

  return { nextProfile, nextIntervalDays: res.nextIntervalDays };
}
