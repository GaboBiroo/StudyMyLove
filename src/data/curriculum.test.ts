import { describe, expect, it } from 'vitest';
import { KIRBY_ABILITY_PNG_MAP } from '../components/KirbyArtwork';
import {
  ALL_FLASHCARDS,
  ALL_MICROTOPICS,
  ALL_QUESTIONS,
  createInitialUserProfile,
  getMicrotopicsForTrack,
} from './curriculum';

describe('Curriculum & Content Data Integrity', () => {
  it('contains all 28 microtopics, 16,800 questions (600 per microtopic across Vestibulares, Concursos & Europe), and 56 flashcards with unique IDs', () => {
    expect(ALL_MICROTOPICS).toHaveLength(28);
    expect(ALL_QUESTIONS).toHaveLength(16800);
    expect(ALL_FLASHCARDS).toHaveLength(56);

    const mtIds = new Set(ALL_MICROTOPICS.map((m) => m.id));
    const qIds = new Set(ALL_QUESTIONS.map((q) => q.id));
    const fcIds = new Set(ALL_FLASHCARDS.map((f) => f.id));

    expect(mtIds.size).toBe(28);
    expect(qIds.size).toBe(16800);
    expect(fcIds.size).toBe(56);

    const countsByTopic = new Map<string, number>();
    for (const q of ALL_QUESTIONS) {
      countsByTopic.set(q.microtopicId, (countsByTopic.get(q.microtopicId) ?? 0) + 1);
    }
    for (const mt of ALL_MICROTOPICS) {
      expect(countsByTopic.get(mt.id), `${mt.id} question count`).toBe(600);
    }

    const europeanQuestions = ALL_QUESTIONS.filter((q) =>
      q.board.startsWith('Europa')
    );
    const vestibularQuestions = ALL_QUESTIONS.filter((q) =>
      q.board.startsWith('Vestibular')
    );
    const concursoQuestions = ALL_QUESTIONS.filter(
      (q) => !q.board.startsWith('Europa') && !q.board.startsWith('Vestibular')
    );
    expect(europeanQuestions.length).toBeGreaterThanOrEqual(4000);
    expect(vestibularQuestions.length).toBeGreaterThanOrEqual(2000);
    expect(concursoQuestions.length).toBeGreaterThanOrEqual(6000);
  });

  it('ensures every microtopic has non-empty compendium, expanded verified videos (>=4), and references', () => {
    const validYouTubeId = /^[A-Za-z0-9_-]{11}$/;
    for (const mt of ALL_MICROTOPICS) {
      expect(mt.compendium.length, `${mt.id} compendium`).toBeGreaterThanOrEqual(1);
      expect(mt.videos.length, `${mt.id} videos`).toBeGreaterThanOrEqual(3);
      expect(mt.books.length, `${mt.id} books`).toBeGreaterThanOrEqual(1);
      for (const v of mt.videos) {
        if (v.youtubeId) {
          expect(validYouTubeId.test(v.youtubeId), `${v.id} youtubeId`).toBe(true);
        }
        expect(v.url.startsWith('https://'), `${v.id} https url`).toBe(true);
      }
    }
  });

  it('ensures every question maps to a valid microtopic and has valid answers & IRT bounds', () => {
    const mtIds = new Set(ALL_MICROTOPICS.map((m) => m.id));
    for (const q of ALL_QUESTIONS) {
      expect(mtIds.has(q.microtopicId), `${q.id} microtopic`).toBe(true);
      expect(q.solutionStepsMarkdown.length, `${q.id} solution steps`).toBeGreaterThanOrEqual(1);
      expect(q.irt.a).toBeGreaterThanOrEqual(0.5);
      expect(q.irt.c).toBeGreaterThan(0);
      expect(q.irt.c).toBeLessThanOrEqual(0.5);
      if (q.questionType === 'mcq5') {
        expect(q.options?.length).toBe(5);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThanOrEqual(4);
      } else {
        expect(typeof q.correctBoolean).toBe('boolean');
      }
    }
  });

  it('maps flashcards (2 per microtopic) and track filters properly', () => {
    const mtIds = new Set(ALL_MICROTOPICS.map((m) => m.id));
    for (const fc of ALL_FLASHCARDS) {
      expect(mtIds.has(fc.microtopicId)).toBe(true);
      expect(fc.promptMarkdown.length).toBeGreaterThan(5);
      expect(fc.answerMarkdown.length).toBeGreaterThan(5);
    }

    expect(getMicrotopicsForTrack('integrado')).toHaveLength(28);
    expect(getMicrotopicsForTrack('mecanica').length).toBeGreaterThanOrEqual(15);
    expect(getMicrotopicsForTrack('eletrica').length).toBeGreaterThanOrEqual(10);
    expect(getMicrotopicsForTrack('concursos_gerais').length).toBe(28);
  });

  it('creates both calibrated baseline and blank initial profiles validly', () => {
    const calibrated = createInitialUserProfile('calibrated');
    const blank = createInitialUserProfile('blank');

    expect(Object.keys(calibrated.microtopics)).toHaveLength(28);
    expect(Object.keys(blank.microtopics)).toHaveLength(28);
    expect(Object.keys(calibrated.flashcards)).toHaveLength(56);

    // Calibrated profile encodes UNIP baseline differentials (Solids & English stronger than Compressible Flow & MDOF Vib)
    expect(calibrated.microtopics['m-solids-mohr'].theta).toBeGreaterThan(
      calibrated.microtopics['m-fluids-laval'].theta
    );
    expect(calibrated.microtopics['b-en-tech'].theta).toBeGreaterThan(2.0);
    expect(blank.microtopics['m-solids-mohr'].theta).toBe(0);
    expect(blank.microtopics['m-solids-mohr'].pKnown).toBe(0);
    expect(blank.microtopics['b-en-tech'].theta).toBe(0);
    expect(blank.microtopics['b-en-tech'].pKnown).toBe(0);
    expect(blank.streakDays).toBe(0);
    expect(blank.totalMinutesStudied).toBe(0);
  });

  it('verifies all official Kirby, Copy Ability, Item, and Character PNGs are mapped to /kirby/*.png', () => {
    const entries = Object.values(KIRBY_ABILITY_PNG_MAP);
    expect(entries).toHaveLength(12);
    for (const rel of entries) {
      expect(rel.startsWith('/kirby/')).toBe(true);
      expect(rel.endsWith('.png')).toBe(true);
    }
  });
});
