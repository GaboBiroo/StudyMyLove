import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  PenLine,
  ShieldAlert,
  Tag,
  XCircle,
} from 'lucide-react';
import {
  ALL_MICROTOPICS,
  ALL_QUESTIONS,
  getMicrotopicsForTrack,
} from '../../data/curriculum';
import {
  applyErrorTagToLastAttempt,
  recordQuestionAttempt,
} from '../../utils/storage';
import type {
  ErrorCategory,
  ExamBoard,
  ExerciseQuestion,
  UserStudyProfile,
} from '../../types/study';
import { CopyAbilityBadge } from '../KirbyArtwork';
import { MathMarkdown } from '../MathMarkdown';
import type { AppViewId } from './DashboardView';

interface ExercisesViewProps {
  profile: UserStudyProfile;
  initialMicrotopicFilter?: string;
  onUpdateProfile: (next: UserStudyProfile) => void;
  onNavigate: (view: AppViewId, microtopicId?: string) => void;
}

const ERROR_TAGS: Array<{
  id: ErrorCategory;
  label: string;
  desc: string;
}> = [
  {
    id: 'conceptual',
    label: 'Conceito / Modelo Físico',
    desc: 'Dúvida na lei física ou hipótese da equação',
  },
  {
    id: 'slip',
    label: 'Cálculo / Unidade (SI)',
    desc: 'Conceito certo, erro em álgebra, sinal ou potência de 10',
  },
  {
    id: 'normative',
    label: 'Critério de Norma',
    desc: 'Detalhe de ASME VIII, API 610, NR-10, NR-13 ou NBR 5410',
  },
  {
    id: 'trap',
    label: 'Interpretação / Enunciado',
    desc: 'Leitura apressada de condição ou exceção da banca',
  },
];

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  profile,
  initialMicrotopicFilter = 'all',
  onUpdateProfile,
  onNavigate,
}) => {
  const trackMicrotopics = useMemo(
    () => getMicrotopicsForTrack(profile.activeTrack),
    [profile.activeTrack]
  );

  const [microtopicFilter, setMicrotopicFilter] = useState<string>(
    initialMicrotopicFilter
  );
  const [boardFilter, setBoardFilter] = useState<ExamBoard | 'all' | 'all_europe'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'mcq5' | 'cebraspe_tf'>('all');
  const [onlyUnresolved, setOnlyUnresolved] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchText, setScratchText] = useState('');

  const filteredQuestions = useMemo(() => {
    const validTrackIds = new Set(trackMicrotopics.map((m) => m.id));
    return ALL_QUESTIONS.filter((q) => {
      if (microtopicFilter === 'all') {
        if (!validTrackIds.has(q.microtopicId)) return false;
      } else if (q.microtopicId !== microtopicFilter) {
        return false;
      }
      if (boardFilter === 'all_europe') {
        if (!q.board.startsWith('Europa')) return false;
      } else if (boardFilter !== 'all' && q.board !== boardFilter) {
        return false;
      }
      if (typeFilter !== 'all' && q.questionType !== typeFilter) return false;
      if (onlyUnresolved) {
        const prog = profile.microtopics[q.microtopicId];
        const solvedCorrectly = prog?.responses.some(
          (r) => r.questionId === q.id && r.correct
        );
        if (solvedCorrectly) return false;
      }
      return true;
    });
  }, [
    trackMicrotopics,
    microtopicFilter,
    boardFilter,
    typeFilter,
    onlyUnresolved,
    profile.microtopics,
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedMcqIdx, setSelectedMcqIdx] = useState<number | null>(null);
  const [selectedBool, setSelectedBool] = useState<boolean | null>(null);
  const [wasGuess, setWasGuess] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);

  const [submissionFeedback, setSubmissionFeedback] = useState<{
    questionId: string;
    correct: boolean;
    deltaTheta: number;
    deltaPKnown: number;
    taggedCategory?: ErrorCategory;
  } | null>(null);

  const currentQuestion: ExerciseQuestion | undefined =
    filteredQuestions[currentIdx] ?? filteredQuestions[0];

  useEffect(() => {
    setCurrentIdx(0);
    setSelectedMcqIdx(null);
    setSelectedBool(null);
    setWasGuess(false);
    setSubmissionFeedback(null);
    setElapsedSec(0);
  }, [microtopicFilter, boardFilter, typeFilter, onlyUnresolved]);

  useEffect(() => {
    if (!currentQuestion || submissionFeedback?.questionId === currentQuestion.id) {
      return;
    }
    const id = window.setInterval(() => {
      setElapsedSec((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [currentQuestion, submissionFeedback]);

  const goToIndex = (nextIdx: number) => {
    if (filteredQuestions.length === 0) return;
    const bounded = Math.max(0, Math.min(filteredQuestions.length - 1, nextIdx));
    setCurrentIdx(bounded);
    setSelectedMcqIdx(null);
    setSelectedBool(null);
    setWasGuess(false);
    setSubmissionFeedback(null);
    setElapsedSec(0);
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;
    const isMcq = currentQuestion.questionType === 'mcq5';
    if (isMcq && selectedMcqIdx === null) return;
    if (!isMcq && selectedBool === null) return;

    const correct = isMcq
      ? selectedMcqIdx === currentQuestion.correctIndex
      : selectedBool === currentQuestion.correctBoolean;

    const { nextProfile, deltaTheta, deltaPKnown } = recordQuestionAttempt(
      profile,
      {
        question: currentQuestion,
        correct,
        timeSpentSec: Math.max(10, elapsedSec),
        wasGuess,
      }
    );

    onUpdateProfile({
      ...nextProfile,
      selectedMicrotopicId: currentQuestion.microtopicId,
    });

    setSubmissionFeedback({
      questionId: currentQuestion.id,
      correct,
      deltaTheta,
      deltaPKnown,
    });
  };

  const handleTagError = (category: ErrorCategory) => {
    if (!currentQuestion || !submissionFeedback) return;
    if (submissionFeedback.taggedCategory) return;

    const nextProfile = applyErrorTagToLastAttempt(
      profile,
      currentQuestion.microtopicId,
      currentQuestion.id,
      category
    );
    onUpdateProfile(nextProfile);
    setSubmissionFeedback({
      ...submissionFeedback,
      taggedCategory: category,
    });
  };

  const currentMt = currentQuestion
    ? ALL_MICROTOPICS.find((m) => m.id === currentQuestion.microtopicId)
    : undefined;
  const currentMtProgress = currentQuestion
    ? profile.microtopics[currentQuestion.microtopicId]
    : undefined;

  const isSubmittedForCurrent =
    Boolean(currentQuestion) &&
    submissionFeedback?.questionId === currentQuestion?.id;

  return (
    <div className="space-y-5">
      {/* Compact Filter Bar */}
      <section className="dream-card p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-[var(--text-primary)]">
              Banco de Questões Comentadas
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
              {filteredQuestions.length} de {ALL_QUESTIONS.length} questões
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowScratchpad((s) => !s)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border inline-flex items-center gap-1.5 transition cursor-pointer ${
              showScratchpad
                ? 'bg-[var(--kirby-pink)] text-white border-[var(--kirby-pink)]'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            {showScratchpad ? 'Ocultar Rascunho' : 'Abrir Rascunho de Cálculo'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Matéria
            </label>
            <select
              value={microtopicFilter}
              onChange={(e) => setMicrotopicFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--kirby-pink)]"
            >
              <option value="all">
                Todas da Trilha ({trackMicrotopics.length})
              </option>
              {ALL_MICROTOPICS.map((mt) => (
                <option key={mt.id} value={mt.id}>
                  {mt.code} — {mt.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Banca
            </label>
            <select
              value={boardFilter}
              onChange={(e) =>
                setBoardFilter(e.target.value as ExamBoard | 'all' | 'all_europe')
              }
              className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--kirby-pink)]"
            >
              <option value="all">Todas as Bancas (Brasil & Europa)</option>
              <option value="all_europe">
                🇪🇺 Todas da Europa (CERN / ESA / EPSO / Offshore / CEng)
              </option>
              <option value="Cesgranrio">Cesgranrio (Petrobras / BNDES)</option>
              <option value="Cebraspe">Cebraspe (Certo/Errado)</option>
              <option value="FGV">FGV (EPE / Concursos)</option>
              <option value="Marinha CP-CEM">Marinha CP-CEM</option>
              <option value="Vunesp">Vunesp</option>
              <option value="FCC">FCC</option>
              <option value="Europa — CERN / ESA">
                🇪🇺 Europa — CERN / ESA (Suíça / Espacial)
              </option>
              <option value="Europa — Energy Offshore (Equinor/Shell)">
                🇪🇺 Europa — Energy Offshore (Equinor / Shell / Mar do Norte)
              </option>
              <option value="Europa — EPSO / UE">
                🇪🇺 Europa — EPSO / União Europeia
              </option>
              <option value="Europa — CEng / Ordem dos Engenheiros">
                🇪🇺 Europa — CEng / Ordem dos Engenheiros (FEANI)
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Modalidade
            </label>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as 'all' | 'mcq5' | 'cebraspe_tf')
              }
              className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--kirby-pink)]"
            >
              <option value="all">Múltipla Escolha + Certo/Errado</option>
              <option value="mcq5">5 Alternativas (A–E)</option>
              <option value="cebraspe_tf">Certo / Errado (Cebraspe)</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] cursor-pointer text-xs font-semibold text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={onlyUnresolved}
                onChange={(e) => setOnlyUnresolved(e.target.checked)}
              />
              Somente não acertadas
            </label>
          </div>
        </div>

        {/* Compact Numbered Strip */}
        {filteredQuestions.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2 border-t border-[var(--border-subtle)]">
            {filteredQuestions.map((q, idx) => {
              const prog = profile.microtopics[q.microtopicId];
              const lastAttempt = [...(prog?.responses ?? [])]
                .reverse()
                .find((r) => r.questionId === q.id);
              const active = idx === currentIdx;
              const pillCls = active
                ? 'bg-[var(--kirby-pink)] text-white border-[var(--kirby-pink)]'
                : lastAttempt?.correct === true
                  ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
                  : lastAttempt?.correct === false
                    ? 'bg-rose-500/15 text-rose-700 border-rose-500/30'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)]';

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  className={`w-7 h-7 rounded-md text-[11px] font-mono font-bold border transition cursor-pointer ${pillCls}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Active Question Sheet */}
      {!currentQuestion ? (
        <section className="dream-card p-8 text-center space-y-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            Nenhuma questão encontrada para os filtros selecionados
          </h2>
          <button
            type="button"
            onClick={() => {
              setMicrotopicFilter('all');
              setBoardFilter('all');
              setTypeFilter('all');
              setOnlyUnresolved(false);
            }}
            className="dream-btn-primary px-4 py-1.5 text-xs cursor-pointer"
          >
            Limpar Filtros
          </button>
        </section>
      ) : (
        <div
          className={`grid grid-cols-1 ${
            showScratchpad ? 'lg:grid-cols-12' : ''
          } gap-5 items-start`}
        >
          <section
            className={`${
              showScratchpad ? 'lg:col-span-8' : ''
            } dream-card p-5 sm:p-6 space-y-5`}
          >
            {/* Question Metadata Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink)] text-white">
                  Q{currentIdx + 1}/{filteredQuestions.length}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                  {currentQuestion.board} • {currentQuestion.examContext}
                </span>
                {currentMt && (
                  <>
                    <CopyAbilityBadge ability={currentMt.copyAbility} />
                    <button
                      type="button"
                      onClick={() => onNavigate('biblioteca', currentMt.id)}
                      className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] text-[var(--text-secondary)] border border-[var(--border-subtle)] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3 text-[var(--kirby-pink)]" />
                      {currentMt.code}: Abrir Teoria
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                <Clock className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                <span className="font-bold text-[var(--text-primary)]">
                  {Math.floor(elapsedSec / 60)}:
                  {String(elapsedSec % 60).padStart(2, '0')}
                </span>
                <span>
                  / {Math.round(currentQuestion.recommendedTimeSec / 60)}m
                </span>
              </div>
            </div>

            {/* Question Statement */}
            <div className="p-4 sm:p-5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              <MathMarkdown
                text={currentQuestion.statementMarkdown}
                className="text-sm sm:text-[15px] leading-relaxed"
              />
            </div>

            {/* Options */}
            {currentQuestion.questionType === 'mcq5' &&
            currentQuestion.options ? (
              <div className="space-y-2">
                {currentQuestion.options.map((opt, idx) => {
                  const letter = ['A', 'B', 'C', 'D', 'E'][idx];
                  const isSelected = selectedMcqIdx === idx;
                  const isCorrectOpt = currentQuestion.correctIndex === idx;

                  let cls =
                    'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]';
                  if (isSubmittedForCurrent) {
                    if (isCorrectOpt) {
                      cls =
                        'bg-emerald-500/15 border-emerald-500 text-[var(--text-primary)]';
                    } else if (isSelected && !isCorrectOpt) {
                      cls =
                        'bg-rose-500/15 border-rose-500 text-[var(--text-primary)]';
                    } else {
                      cls =
                        'bg-[var(--bg-surface)] border-[var(--border-subtle)] opacity-60';
                    }
                  } else if (isSelected) {
                    cls =
                      'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)] text-[var(--text-primary)]';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmittedForCurrent}
                      onClick={() => setSelectedMcqIdx(idx)}
                      className={`w-full text-left p-3 rounded-lg border transition flex items-start gap-3 cursor-pointer disabled:cursor-default ${cls}`}
                    >
                      <span className="shrink-0 w-6 h-6 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono font-bold text-xs flex items-center justify-center text-[var(--text-primary)]">
                        {letter}
                      </span>
                      <div className="flex-1 text-sm">
                        <MathMarkdown text={opt} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-[var(--warp-gold)]" />
                  Item estilo Cebraspe: 1 erro anula 1 acerto (-1 ponto líquido).
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[true, false].map((boolVal) => {
                    const label = boolVal ? 'CERTO (C)' : 'ERRADO (E)';
                    const isSelected = selectedBool === boolVal;
                    const isCorrectVal =
                      currentQuestion.correctBoolean === boolVal;
                    let cls =
                      'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]';
                    if (isSubmittedForCurrent) {
                      if (isCorrectVal) {
                        cls =
                          'bg-emerald-500/15 border-emerald-500 text-[var(--text-primary)]';
                      } else if (isSelected && !isCorrectVal) {
                        cls =
                          'bg-rose-500/15 border-rose-500 text-[var(--text-primary)]';
                      }
                    } else if (isSelected) {
                      cls =
                        'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)] text-[var(--text-primary)]';
                    }

                    return (
                      <button
                        key={String(boolVal)}
                        type="button"
                        disabled={isSubmittedForCurrent}
                        onClick={() => setSelectedBool(boolVal)}
                        className={`p-3.5 rounded-lg border font-bold text-sm transition cursor-pointer disabled:cursor-default ${cls}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submit / Navigation Footer */}
            {!isSubmittedForCurrent ? (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
                <label className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wasGuess}
                    onChange={(e) => setWasGuess(e.target.checked)}
                  />
                  <HelpCircle className="w-3.5 h-3.5 text-[var(--warp-gold)]" />
                  Marcar se respondeu com dúvida / chute
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToIndex(currentIdx - 1)}
                    disabled={currentIdx === 0}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs font-semibold text-[var(--text-secondary)] disabled:opacity-40 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                      currentQuestion.questionType === 'mcq5'
                        ? selectedMcqIdx === null
                        : selectedBool === null
                    }
                    className="dream-btn-primary px-4 py-1.5 text-xs disabled:opacity-45 cursor-pointer"
                  >
                    Confirmar Resposta
                  </button>
                  <button
                    type="button"
                    onClick={() => goToIndex(currentIdx + 1)}
                    disabled={currentIdx >= filteredQuestions.length - 1}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs font-semibold text-[var(--text-secondary)] disabled:opacity-40 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Pular <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-3 border-t border-[var(--border-subtle)]">
                {/* Result Banner */}
                {submissionFeedback && (
                  <div
                    className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      submissionFeedback.correct
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]'
                        : 'bg-rose-500/10 border-rose-500/30 text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {submissionFeedback.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-sm">
                          {submissionFeedback.correct
                            ? 'Resposta Correta!'
                            : 'Resposta Incorreta — Confira a dedução abaixo'}
                        </div>
                        <div className="text-xs font-mono text-[var(--text-secondary)]">
                          Domínio da matéria:{' '}
                          {((currentMtProgress?.pKnown ?? 0) * 100).toFixed(1)}% (
                          {submissionFeedback.deltaPKnown >= 0 ? '+' : ''}
                          {(submissionFeedback.deltaPKnown * 100).toFixed(1)}%) •
                          θ̂ = {currentMtProgress?.theta.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => goToIndex(currentIdx + 1)}
                      disabled={currentIdx >= filteredQuestions.length - 1}
                      className="dream-btn-primary px-3.5 py-1.5 text-xs inline-flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                    >
                      Próxima Questão <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Error Diagnosis Bar */}
                {submissionFeedback && !submissionFeedback.correct && (
                  <div className="p-3.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                    <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                      Qual foi o motivo principal do erro?
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {ERROR_TAGS.map((tag) => {
                        const chosen =
                          submissionFeedback.taggedCategory === tag.id;
                        return (
                          <button
                            key={tag.id}
                            type="button"
                            disabled={Boolean(submissionFeedback.taggedCategory)}
                            onClick={() => handleTagError(tag.id)}
                            className={`text-left p-2.5 rounded-lg border transition cursor-pointer disabled:cursor-default ${
                              chosen
                                ? 'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)] font-semibold'
                                : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border-[var(--border-subtle)]'
                            }`}
                          >
                            <div className="text-xs font-bold text-[var(--text-primary)]">
                              {tag.label}
                            </div>
                            <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                              {tag.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Analytical Step-by-Step Solution */}
                <div className="p-4 sm:p-5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--kirby-pink)]">
                    Resolução Analítica Passo a Passo
                  </div>

                  <ol className="space-y-2">
                    {currentQuestion.solutionStepsMarkdown.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm"
                      >
                        <span className="shrink-0 w-5 h-5 rounded bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)] font-mono font-bold text-xs flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <MathMarkdown text={step} />
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs text-[var(--text-primary)]">
                    <strong>Conclusão & Gabarito:</strong>{' '}
                    <MathMarkdown
                      text={currentQuestion.finalDiagnosis}
                      className="inline"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-[var(--bg-accent-soft)] border border-[var(--border-strong)] text-xs text-[var(--text-primary)] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[var(--maxim-red)] shrink-0 mt-0.5" />
                    <div>
                      <strong>Ponto de Atenção na Banca:</strong>{' '}
                      {currentQuestion.trapNote}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Optional Scratchpad Column for Calculations */}
          {showScratchpad && (
            <aside className="lg:col-span-4 dream-card p-4 space-y-2.5 lg:sticky lg:top-16">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Folha de Rascunho & Unidades
                </span>
                <button
                  type="button"
                  onClick={() => setScratchText('')}
                  className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Limpar
                </button>
              </div>
              <textarea
                value={scratchText}
                onChange={(e) => setScratchText(e.target.value)}
                rows={14}
                placeholder="Escreva seus dados do enunciado, conversões de unidades (MPa, kW, p.u., rad/s) e passagens algébricas antes de marcar a alternativa..."
                className="w-full p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] font-mono text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--kirby-pink)]"
              />
            </aside>
          )}
        </div>
      )}
    </div>
  );
};
