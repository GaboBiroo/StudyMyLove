import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Eye,
  LayoutList,
  Lightbulb,
  RotateCw,
  SquareStack,
} from 'lucide-react';
import {
  ALL_FLASHCARDS,
  ALL_MICROTOPICS,
  getMicrotopicsForTrack,
} from '../../data/curriculum';
import {
  daysBetweenISO,
  fsrsRetention,
  fsrsUpdate,
} from '../../engine/psychometrics';
import { recordFlashcardReview } from '../../utils/storage';
import type { FsrsRating, UserStudyProfile } from '../../types/study';
import { CopyAbilityBadge, KirbyMascot } from '../KirbyArtwork';
import { MathMarkdown } from '../MathMarkdown';
import type { AppViewId } from './DashboardView';

interface AutoRevisionViewProps {
  profile: UserStudyProfile;
  initialFilterMode?: 'due' | 'selected' | 'all';
  onUpdateProfile: (next: UserStudyProfile) => void;
  onNavigate: (view: AppViewId, microtopicId?: string) => void;
}

const FSRS_BUTTONS: Array<{
  grade: FsrsRating;
  keyHint: string;
  label: string;
  sub: string;
  borderCls: string;
}> = [
  {
    grade: 1,
    keyHint: '1',
    label: 'Esqueci (Again)',
    sub: 'Rever amanhã',
    borderCls: 'border-rose-500/40 hover:bg-rose-500/10',
  },
  {
    grade: 2,
    keyHint: '2',
    label: 'Difícil (Hard)',
    sub: 'Com esforço',
    borderCls: 'border-amber-500/40 hover:bg-amber-500/10',
  },
  {
    grade: 3,
    keyHint: '3',
    label: 'Bom (Good)',
    sub: 'Dedução correta',
    borderCls: 'border-emerald-500/40 hover:bg-emerald-500/10',
  },
  {
    grade: 4,
    keyHint: '4',
    label: 'Fácil (Easy)',
    sub: 'Imediato',
    borderCls: 'border-sky-500/40 hover:bg-sky-500/10',
  },
];

export const AutoRevisionView: React.FC<AutoRevisionViewProps> = ({
  profile,
  initialFilterMode = 'due',
  onUpdateProfile,
  onNavigate,
}) => {
  const [filterMode, setFilterMode] = useState<'due' | 'selected' | 'all'>(
    initialFilterMode
  );
  const [viewMode, setViewMode] = useState<'deck' | 'table'>('deck');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lastReviewMsg, setLastReviewMsg] = useState<string | null>(null);

  const trackMicrotopics = useMemo(
    () => getMicrotopicsForTrack(profile.activeTrack),
    [profile.activeTrack]
  );

  const queue = useMemo(() => {
    const validIds = new Set(trackMicrotopics.map((m) => m.id));
    const nowMs = Date.now();
    return ALL_FLASHCARDS.filter((fc) => {
      if (filterMode === 'selected') {
        return fc.microtopicId === profile.selectedMicrotopicId;
      }
      if (!validIds.has(fc.microtopicId)) return false;
      if (filterMode === 'due') {
        const prog = profile.flashcards[fc.id];
        if (!prog) return true;
        return new Date(prog.nextReviewISO).getTime() <= nowMs;
      }
      return true;
    }).sort((a, b) => {
      const pa = profile.flashcards[a.id];
      const pb = profile.flashcards[b.id];
      return (
        new Date(pa?.nextReviewISO ?? 0).getTime() -
        new Date(pb?.nextReviewISO ?? 0).getTime()
      );
    });
  }, [
    trackMicrotopics,
    filterMode,
    profile.flashcards,
    profile.selectedMicrotopicId,
  ]);

  const currentCard = queue[cardIndex] ?? queue[0];
  const currentProgress = currentCard
    ? profile.flashcards[currentCard.id]
    : undefined;
  const currentMt = currentCard
    ? ALL_MICROTOPICS.find((m) => m.id === currentCard.microtopicId)
    : undefined;

  const currentElapsedDays = currentProgress
    ? daysBetweenISO(currentProgress.lastReviewISO)
    : 0;
  const projectedRetention = currentProgress
    ? fsrsRetention(currentElapsedDays, currentProgress.stabilityDays)
    : 1;

  const previewIntervals = useMemo(() => {
    if (!currentProgress) return {} as Record<FsrsRating, number>;
    const map = {} as Record<FsrsRating, number>;
    ([1, 2, 3, 4] as FsrsRating[]).forEach((g) => {
      map[g] = fsrsUpdate({
        stabilityDays: currentProgress.stabilityDays,
        difficulty: currentProgress.difficulty,
        elapsedDays: currentElapsedDays,
        grade: g,
        isFirstReview: currentProgress.reps === 0,
      }).nextIntervalDays;
    });
    return map;
  }, [currentProgress, currentElapsedDays]);

  const handleGrade = (grade: FsrsRating) => {
    if (!currentCard) return;
    const { nextProfile, nextIntervalDays } = recordFlashcardReview(
      profile,
      currentCard.id,
      grade
    );
    onUpdateProfile(nextProfile);
    setFlipped(false);
    setShowHint(false);
    setLastReviewMsg(
      `Próxima revisão agendada para daqui a ${nextIntervalDays} dia(s).`
    );
    setCardIndex((prev) =>
      queue.length <= 1 ? 0 : (prev + 1) % Math.max(1, queue.length - 1)
    );
  };

  // Anki-style Keyboard Shortcuts (Space = flip, 1..4 = grade)
  useEffect(() => {
    if (viewMode !== 'deck' || !currentCard) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.code === 'Space' && !flipped) {
        e.preventDefault();
        setFlipped(true);
      } else if (flipped && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        handleGrade(Number(e.key) as FsrsRating);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, currentCard, flipped]);

  return (
    <div className="space-y-5">
      {/* Compact Deck Bar */}
      <section className="dream-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              ['due', 'Vencidos Hoje'],
              ['selected', `Matéria Atual (${profile.selectedMicrotopicId})`],
              ['all', `Todos da Trilha (${trackMicrotopics.length * 2})`],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                setFilterMode(mode);
                setCardIndex(0);
                setFlipped(false);
                setShowHint(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filterMode === mode
                  ? 'bg-[var(--kirby-pink)] text-white'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {lastReviewMsg && (
            <span className="text-xs text-emerald-600 font-medium hidden md:inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {lastReviewMsg}
            </span>
          )}
          <div className="inline-flex rounded-lg p-0.5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={() => setViewMode('deck')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 cursor-pointer ${
                viewMode === 'deck'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <SquareStack className="w-3.5 h-3.5" /> Cartão
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" /> Lista ({queue.length})
            </button>
          </div>
        </div>
      </section>

      {/* TABLE VIEW (Browse all flashcards directly like RemNote/Anki browser) */}
      {viewMode === 'table' ? (
        <section className="dream-card overflow-hidden divide-y divide-[var(--border-subtle)]">
          {queue.map((fc, idx) => {
            const mt = ALL_MICROTOPICS.find((m) => m.id === fc.microtopicId);
            const prog = profile.flashcards[fc.id];
            return (
              <div key={fc.id} className="p-4 space-y-2 hover:bg-[var(--bg-elevated)]/50">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[var(--kirby-pink)]">
                      #{idx + 1} • {mt?.code}
                    </span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {mt?.title}
                    </span>
                  </div>
                  {prog && (
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">
                      Estabilidade S = {prog.stabilityDays.toFixed(1)}d
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs">
                    <div className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">
                      Frente (Pergunta / Dedução)
                    </div>
                    <MathMarkdown text={fc.promptMarkdown} />
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                    <div className="text-[10px] font-bold uppercase text-emerald-600 mb-1">
                      Verso (Equação / Resposta)
                    </div>
                    <MathMarkdown text={fc.answerMarkdown} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ) : !currentCard ? (
        <section className="dream-card p-8 text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <KirbyMascot ability="sleep" size={56} />
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Revisões de hoje concluídas!
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Todos os cartões vencidos foram revisados. Você pode estudar todos os cartões da trilha ou resolver questões.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className="dream-btn-primary px-4 py-1.5 text-xs cursor-pointer"
            >
              Revisar Todos os Cartões
            </button>
            <button
              type="button"
              onClick={() => onNavigate('exercicios')}
              className="px-4 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
            >
              Banco de Questões
            </button>
          </div>
        </section>
      ) : (
        /* ANKI-STYLE FOCUSED FLASHCARD DECK */
        <section className="dream-card p-5 sm:p-7 max-w-3xl mx-auto space-y-5">
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink)] text-white">
                {cardIndex + 1}/{queue.length}
              </span>
              {currentMt && (
                <>
                  <CopyAbilityBadge ability={currentMt.copyAbility} />
                  <button
                    type="button"
                    onClick={() => onNavigate('biblioteca', currentMt.id)}
                    className="text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--kirby-pink)] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                    {currentMt.code} — {currentMt.title}
                  </button>
                </>
              )}
            </div>

            {currentProgress && (
              <div className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-3">
                <span>S = {currentProgress.stabilityDays.toFixed(1)}d</span>
                <span>•</span>
                <span>Retenção {(projectedRetention * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>

          {/* Prompt (Front) */}
          <div className="p-5 sm:p-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] min-h-[140px] flex flex-col justify-center space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--kirby-pink)]">
              Pergunta / Dedução Ativa
            </div>
            <MathMarkdown
              text={currentCard.promptMarkdown}
              className="text-base sm:text-lg font-medium"
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowHint((h) => !h)}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[var(--warp-gold)]" />
              {showHint ? 'Ocultar Pista' : 'Ver Pista de Dedução'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFlipped(false);
                  setShowHint(false);
                  setCardIndex((prev) => (prev + 1) % queue.length);
                }}
                className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" /> Pular
              </button>
              {!flipped && (
                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  className="dream-btn-primary px-4 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> Mostrar Resposta (Espaço)
                </button>
              )}
            </div>
          </div>

          {showHint && (
            <div className="p-3.5 rounded-lg bg-[var(--warp-gold-bg)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)]">
              <strong>Pista:</strong> {currentCard.derivationHint}
            </div>
          )}

          {/* Answer (Back) + Rating Buttons */}
          {flipped && (
            <div className="space-y-4 pt-3 border-t border-[var(--border-subtle)]">
              <div className="p-5 rounded-xl bg-[var(--bg-surface)] border-2 border-emerald-500/30 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  Resposta & Equação
                </div>
                <MathMarkdown
                  text={currentCard.answerMarkdown}
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FSRS_BUTTONS.map((btn) => (
                  <button
                    key={btn.grade}
                    type="button"
                    onClick={() => handleGrade(btn.grade)}
                    className={`p-3 rounded-lg border bg-[var(--bg-elevated)] text-left transition cursor-pointer ${btn.borderCls}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {btn.label}
                      </span>
                      <kbd className="text-[10px] font-mono px-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                        {btn.keyHint}
                      </kbd>
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                      {btn.sub}
                    </div>
                    <div className="text-[11px] font-mono font-bold text-[var(--kirby-pink)] mt-1">
                      +{previewIntervals[btn.grade] ?? 1}d
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
