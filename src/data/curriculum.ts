import { MICROTOPICS_MEC } from './microtopicsMec';
import { MICROTOPICS_ELE_AND_BASIC } from './microtopicsEleAndBasic';
import { QUESTIONS_MEC } from './questionsMec';
import { QUESTIONS_ELE_AND_BASIC } from './questionsEleAndBasic';
import { FLASHCARDS_BANK } from './flashcardsBank';
import type {
  FlashcardProgress,
  Microtopic,
  MicrotopicProgress,
  StudyTrack,
  UserStudyProfile,
} from '../types/study';
import { addDaysISO } from '../engine/psychometrics';

export const ALL_MICROTOPICS: Microtopic[] = [
  ...MICROTOPICS_MEC,
  ...MICROTOPICS_ELE_AND_BASIC,
];

export const ALL_QUESTIONS = [...QUESTIONS_MEC, ...QUESTIONS_ELE_AND_BASIC];
export const ALL_FLASHCARDS = FLASHCARDS_BANK;

export function getMicrotopicsForTrack(track: StudyTrack): Microtopic[] {
  if (track === 'mecanica') {
    return ALL_MICROTOPICS.filter(
      (m) => m.macroArea === 'mec' || m.macroArea === 'multi' || m.macroArea === 'basico'
    );
  }
  if (track === 'eletrica') {
    return ALL_MICROTOPICS.filter(
      (m) => m.macroArea === 'ele' || m.macroArea === 'multi' || m.macroArea === 'basico'
    );
  }
  return ALL_MICROTOPICS;
}

interface BaselineSeed {
  theta: number;
  pKnown: number;
  stabilityDays: number;
  daysAgo: number;
  difficulty: number;
}

/**
 * Calibrated baseline reflecting Thaisa's profile (UNIP graduate with strong English
 * and baseline exposure to core disciplines, needing structured focus on gaps & standards).
 * Values closely mirror Table 4 of the Integrated Pedagogical Architecture so the Learning
 * Matrix is immediately informative on first launch, and updates dynamically as she studies.
 */
const INITIAL_SEEDS: Record<string, BaselineSeed> = {
  'm-thermo-cycles': { theta: 1.65, pKnown: 0.88, stabilityDays: 14, daysAgo: 2, difficulty: 4.8 },
  'm-thermo-rankine': { theta: 1.45, pKnown: 0.85, stabilityDays: 11, daysAgo: 2, difficulty: 5.2 },
  'm-fluids-ns': { theta: 1.55, pKnown: 0.87, stabilityDays: 12, daysAgo: 2, difficulty: 5.0 },
  'm-fluids-laval': { theta: 0.45, pKnown: 0.62, stabilityDays: 4.5, daysAgo: 3, difficulty: 7.1 },
  'm-heat-transfer': { theta: 1.15, pKnown: 0.79, stabilityDays: 8, daysAgo: 2, difficulty: 5.6 },
  'm-solids-mohr': { theta: 2.05, pKnown: 0.96, stabilityDays: 22, daysAgo: 1, difficulty: 4.0 },
  'm-solids-torsion': { theta: 1.40, pKnown: 0.84, stabilityDays: 9, daysAgo: 2, difficulty: 5.4 },
  'm-dynamics-rigid': { theta: 0.90, pKnown: 0.74, stabilityDays: 6.5, daysAgo: 3, difficulty: 6.2 },
  'm-materials-fe': { theta: 1.10, pKnown: 0.81, stabilityDays: 8, daysAgo: 2, difficulty: 5.8 },
  'm-mfg-welding': { theta: 0.85, pKnown: 0.73, stabilityDays: 6, daysAgo: 3, difficulty: 6.3 },
  'm-vib-mdof': { theta: -0.20, pKnown: 0.48, stabilityDays: 3, daysAgo: 4, difficulty: 7.8 },
  'm-turbo-pumps': { theta: 1.50, pKnown: 0.86, stabilityDays: 12, daysAgo: 2, difficulty: 5.0 },
  'm-ic-engines': { theta: 1.25, pKnown: 0.82, stabilityDays: 10, daysAgo: 2, difficulty: 4.9 },
  'm-equip-nr13': { theta: 0.55, pKnown: 0.64, stabilityDays: 4.5, daysAgo: 3, difficulty: 6.8 },
  'm-maint-reliability': { theta: 1.20, pKnown: 0.81, stabilityDays: 9, daysAgo: 2, difficulty: 5.3 },

  'e-em-maxwell': { theta: 0.75, pKnown: 0.70, stabilityDays: 5.5, daysAgo: 3, difficulty: 6.5 },
  'e-circuits-ac3': { theta: 1.70, pKnown: 0.90, stabilityDays: 15, daysAgo: 1, difficulty: 4.6 },
  'e-mach-mit': { theta: 1.35, pKnown: 0.83, stabilityDays: 9, daysAgo: 2, difficulty: 5.5 },
  'e-mach-sync': { theta: 0.85, pKnown: 0.72, stabilityDays: 6, daysAgo: 3, difficulty: 6.4 },
  'e-sep-fortescue': { theta: 0.30, pKnown: 0.58, stabilityDays: 4, daysAgo: 4, difficulty: 7.4 },
  'e-sep-lines': { theta: 0.70, pKnown: 0.69, stabilityDays: 5, daysAgo: 3, difficulty: 6.5 },
  'e-prot-nr10': { theta: 1.15, pKnown: 0.79, stabilityDays: 7, daysAgo: 2, difficulty: 5.7 },
  'e-prot-ex': { theta: 0.50, pKnown: 0.63, stabilityDays: 4.2, daysAgo: 3, difficulty: 6.9 },
  'e-pe-converters': { theta: 1.05, pKnown: 0.78, stabilityDays: 7.5, daysAgo: 2, difficulty: 5.8 },
  'e-ctrl-freq': { theta: 0.85, pKnown: 0.74, stabilityDays: 6, daysAgo: 3, difficulty: 6.3 },
  'g-math-laplace': { theta: 1.45, pKnown: 0.86, stabilityDays: 12, daysAgo: 2, difficulty: 5.1 },

  'b-pt-cesgranrio': { theta: 1.60, pKnown: 0.88, stabilityDays: 14, daysAgo: 2, difficulty: 4.5 },
  'b-en-tech': { theta: 2.55, pKnown: 0.99, stabilityDays: 32, daysAgo: 1, difficulty: 2.5 },
};

export function createInitialUserProfile(
  mode: 'calibrated' | 'blank' = 'calibrated'
): UserStudyProfile {
  const now = new Date();
  const microtopics: Record<string, MicrotopicProgress> = {};

  for (const mt of ALL_MICROTOPICS) {
    const seed =
      mode === 'calibrated'
        ? INITIAL_SEEDS[mt.id]
        : {
            theta: mt.id === 'b-en-tech' ? 1.8 : 0.0,
            pKnown: mt.id === 'b-en-tech' ? 0.90 : 0.35,
            stabilityDays: 3,
            daysAgo: 2,
            difficulty: 5.5,
          };

    const lastReview = new Date(
      now.getTime() - seed.daysAgo * 24 * 60 * 60 * 1000
    ).toISOString();

    microtopics[mt.id] = {
      microtopicId: mt.id,
      theta: seed.theta,
      standardError: mode === 'calibrated' ? 0.42 : 1.25,
      responses: [],
      pKnown: seed.pKnown,
      pInit: 0.35,
      pTransit: 0.16,
      pGuess: 0.2,
      pSlip: 0.1,
      stabilityDays: seed.stabilityDays,
      difficulty: seed.difficulty,
      lastReviewISO: lastReview,
      nextReviewISO: addDaysISO(seed.stabilityDays, new Date(lastReview)),
      fsrsReps: mode === 'calibrated' ? 3 : 0,
      fsrsLapses: 0,
      readingCompleted: false,
      videosWatchedIds: [],
      errorCounts: {
        conceptual: 0,
        slip: 0,
        normative: 0,
        trap: 0,
      },
      notes: '',
    };
  }

  const flashcards: Record<string, FlashcardProgress> = {};
  ALL_FLASHCARDS.forEach((fc, idx) => {
    const mtSeed = microtopics[fc.microtopicId];
    // Make ~14 high-priority cards immediately due today so Block 1 Flash-Review is ready right out of the box!
    const isDueToday = mtSeed.pKnown < 0.78 || idx % 4 === 0;
    const daysAgo = isDueToday ? 6 : 1;
    const stab = isDueToday ? 3.5 : 14;
    const lastRev = new Date(now.getTime() - daysAgo * 86400000).toISOString();
    const nextRev = isDueToday
      ? new Date(now.getTime() - 3600000).toISOString()
      : addDaysISO(stab, new Date(lastRev));

    flashcards[fc.id] = {
      cardId: fc.id,
      microtopicId: fc.microtopicId,
      stabilityDays: stab,
      difficulty: mtSeed.difficulty,
      lastReviewISO: lastRev,
      nextReviewISO: nextRev,
      reps: mode === 'calibrated' ? 1 : 0,
      lapses: 0,
    };
  });

  const todayISO = now.toISOString().slice(0, 10);
  const dayOfMonth = now.getDate();

  return {
    studentName: 'Thaisa',
    university: 'UNIP — Engenharia',
    activeTrack: 'integrado',
    dailyGoalHours: 7,
    dayParity: dayOfMonth % 2 === 1 ? 'odd' : 'even',
    selectedMicrotopicId: 'm-vib-mdof', // Highest urgency item initially
    completedRoutineBlocksToday: [],
    routineDateISO: todayISO,
    streakDays: 1,
    totalMinutesStudied: 0,
    microtopics,
    flashcards,
    examHistory: [],
  };
}
