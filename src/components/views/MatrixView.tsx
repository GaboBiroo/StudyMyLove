import React, { useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Download,
  RefreshCw,
  Sliders,
  Target,
  Upload,
  X,
  Zap,
} from 'lucide-react';
import {
  ALL_MICROTOPICS,
  ALL_QUESTIONS,
  createInitialUserProfile,
  getMicrotopicsForTrack,
} from '../../data/curriculum';
import {
  classifyEngineerLevel,
  diagnoseMicrotopic,
} from '../../engine/psychometrics';
import { recordQuestionAttempt } from '../../utils/storage';
import type { ExerciseQuestion, UserStudyProfile } from '../../types/study';
import { CopyAbilityBadge, KirbyMascot } from '../KirbyArtwork';
import { MathMarkdown } from '../MathMarkdown';
import type { AppViewId } from './DashboardView';

interface MatrixViewProps {
  profile: UserStudyProfile;
  onUpdateProfile: (next: UserStudyProfile) => void;
  onNavigate: (view: AppViewId, microtopicId?: string) => void;
}

export const MatrixView: React.FC<MatrixViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [sortBy, setSortBy] = useState<'priority' | 'theta_asc' | 'pk_asc' | 'code'>(
    'priority'
  );
  const [showAll28, setShowAll28] = useState(false);
  const [onlyAlerts, setOnlyAlerts] = useState(false);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [calibrationOpen, setCalibrationOpen] = useState(false);
  const [calStep, setCalStep] = useState(0);
  const [calCorrectCount, setCalCorrectCount] = useState(0);

  const visibleMicrotopics = useMemo(
    () =>
      showAll28
        ? ALL_MICROTOPICS
        : getMicrotopicsForTrack(profile.activeTrack),
    [showAll28, profile.activeTrack]
  );

  const calibrationQuestions = useMemo(() => {
    const validIds = new Set(visibleMicrotopics.map((m) => m.id));
    const seenMt = new Set<string>();
    const picked: ExerciseQuestion[] = [];
    for (const q of ALL_QUESTIONS) {
      if (!validIds.has(q.microtopicId)) continue;
      if (!seenMt.has(q.microtopicId)) {
        seenMt.add(q.microtopicId);
        picked.push(q);
      }
      if (picked.length >= 28) break;
    }
    return picked;
  }, [visibleMicrotopics]);

  const rows = useMemo(() => {
    const now = new Date();
    const enriched = visibleMicrotopics.map((mt) => {
      const prog = profile.microtopics[mt.id];
      const diag = diagnoseMicrotopic(prog, now);
      return { mt, prog, diag };
    });

    const filtered = onlyAlerts
      ? enriched.filter(
          (r) =>
            r.diag.tone === 'red' ||
            r.diag.tone === 'amber' ||
            r.prog.pKnown < 0.85
        )
      : enriched;

    return filtered.sort((a, b) => {
      if (sortBy === 'theta_asc') return a.prog.theta - b.prog.theta;
      if (sortBy === 'pk_asc') return a.prog.pKnown - b.prog.pKnown;
      if (sortBy === 'code') return a.mt.code.localeCompare(b.mt.code);
      return b.diag.priorityScore - a.diag.priorityScore;
    });
  }, [visibleMicrotopics, profile.microtopics, onlyAlerts, sortBy]);

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estudos-thaisa-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusBanner('Backup JSON exportado com sucesso.');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as UserStudyProfile;
        if (!parsed.microtopics || !parsed.flashcards) {
          throw new Error('Estrutura inválida');
        }
        onUpdateProfile(parsed);
        setStatusBanner('Histórico restaurado via arquivo JSON.');
      } catch {
        setStatusBanner('Erro ao importar JSON: arquivo incompatível.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetProfile = (mode: 'calibrated' | 'blank') => {
    const fresh = createInitialUserProfile(mode);
    fresh.activeTrack = profile.activeTrack;
    onUpdateProfile(fresh);
    setStatusBanner(
      mode === 'blank'
        ? 'Perfil reiniciado do zero (θ = 0).'
        : 'Perfil restaurado com baseline UNIP + Petrobras.'
    );
  };

  const handleCalibrationAnswer = (
    q: ExerciseQuestion,
    chosenIdxOrBool: number | boolean
  ) => {
    const correct =
      q.questionType === 'mcq5'
        ? chosenIdxOrBool === q.correctIndex
        : chosenIdxOrBool === q.correctBoolean;
    const { nextProfile } = recordQuestionAttempt(profile, {
      question: q,
      correct,
      timeSpentSec: 60,
      wasGuess: false,
    });
    onUpdateProfile(nextProfile);
    if (correct) setCalCorrectCount((c) => c + 1);
    setCalStep((s) => s + 1);
  };

  const activeCalQuestion = calibrationQuestions[calStep];

  return (
    <div className="space-y-5">
      {/* Header & Controls */}
      <section className="dream-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <KirbyMascot ability="waddledee" size={44} />
            <div>
              <h1 className="text-lg font-bold text-[var(--text-primary)]">
                Edital Verticalizado & Matriz de Progresso
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Controle completo das {visibleMicrotopics.length} matérias, normas técnicas associadas, status de leitura e domínio por tópico.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onNavigate('simulados')}
              className="dream-btn-primary px-3 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Target className="w-3.5 h-3.5" />
              Simulado Sem Tempo / Por Tema
            </button>

            <button
              type="button"
              onClick={() => {
                setCalStep(0);
                setCalCorrectCount(0);
                setCalibrationOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
              Nivelamento Rápido ({calibrationQuestions.length} Questões)
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Exportar JSON
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Importar
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImportJson}
              className="hidden"
            />
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-muted)] mr-1">
              <Sliders className="w-3.5 h-3.5" /> Ordenar:
            </span>
            {(
              [
                ['priority', 'Prioridade de Estudo'],
                ['pk_asc', 'Menor Domínio (%)'],
                ['theta_asc', 'Menor θ̂ TRI'],
                ['code', 'Código (MEC / ELE / BAS)'],
              ] as const
            ).map(([k, lbl]) => (
              <button
                key={k}
                type="button"
                onClick={() => setSortBy(k)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  sortBy === k
                    ? 'bg-[var(--kirby-pink)] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {lbl}
              </button>
            ))}

            <label className="ml-2 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAlerts}
                onChange={(e) => setOnlyAlerts(e.target.checked)}
              />
              Apenas pendentes (&lt;85%)
            </label>

            <label className="ml-2 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={showAll28}
                onChange={(e) => setShowAll28(e.target.checked)}
              />
              Ver todas as 28 matérias
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleResetProfile('blank')}
              className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-[11px] font-semibold text-rose-700 inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Zerar Tudo (100% Zerado)
            </button>
          </div>
        </div>

        {statusBanner && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-[var(--text-primary)] flex items-center justify-between">
            <span>{statusBanner}</span>
            <button
              type="button"
              onClick={() => setStatusBanner(null)}
              className="cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Clean Syllabus & Diagnostic Table */}
      <section className="dream-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-elevated)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
                <th className="py-3 px-4">Matéria & Normas</th>
                <th className="py-3 px-3">Nível Medido</th>
                <th className="py-3 px-3">Estudo</th>
                <th className="py-3 px-3">Domínio</th>
                <th className="py-3 px-3">TRI (θ̂)</th>
                <th className="py-3 px-4">Recomendação Prática</th>
                <th className="py-3 px-4 text-right">Acesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
              {rows.map(({ mt, prog, diag }) => {
                const pct = Math.round(prog.pKnown * 100);
                const correctCount = prog.responses.filter(
                  (r) => r.correct
                ).length;
                const accPct =
                  prog.responses.length > 0
                    ? Math.round((correctCount / prog.responses.length) * 100)
                    : 0;
                const engLvl = classifyEngineerLevel({
                  attempts: prog.responses.length,
                  accuracyPct: accPct,
                  theta: prog.theta,
                });

                return (
                  <tr
                    key={mt.id}
                    className="hover:bg-[var(--bg-elevated)]/60 transition align-top"
                  >
                    <td className="py-3 px-4 min-w-[240px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[var(--kirby-pink)]">
                          {mt.code}
                        </span>
                        <CopyAbilityBadge ability={mt.copyAbility} />
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {mt.petrobrasAllocation}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate('biblioteca', mt.id)}
                        className="text-left font-semibold text-[var(--text-primary)] hover:text-[var(--kirby-pink)] mt-1 block cursor-pointer"
                      >
                        {mt.title}
                      </button>
                      {mt.norms.length > 0 && (
                        <div className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
                          Normas: {mt.norms.join(', ')}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${engLvl.badgeCls}`}
                      >
                        {engLvl.shortBadge}
                      </span>
                      <div className="text-[10px] font-mono text-[var(--text-muted)] mt-1">
                        {prog.responses.length > 0
                          ? `${correctCount}/${prog.responses.length} (${accPct}%)`
                          : '0 questões'}
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="text-[11px] font-medium text-[var(--text-primary)]">
                        {prog.readingCompleted ? (
                          <span className="text-emerald-600 font-semibold">
                            ✓ Teoria lida
                          </span>
                        ) : (
                          <span className="text-[var(--text-muted)]">
                            Pendente
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
                        Aulas: {prog.videosWatchedIds.length}/{mt.videos.length}
                      </div>
                    </td>

                    <td className="py-3 px-3 min-w-[100px]">
                      <div className="font-mono font-bold text-[var(--text-primary)]">
                        {pct}%
                      </div>
                      <div className="w-16 h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            backgroundColor:
                              pct >= 90
                                ? 'var(--mint-ok)'
                                : pct >= 75
                                  ? 'var(--sky-info)'
                                  : 'var(--kirby-pink)',
                          }}
                        />
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono whitespace-nowrap">
                      <div className="font-bold text-[var(--text-primary)]">
                        {prog.theta >= 0
                          ? `+${prog.theta.toFixed(2)}`
                          : prog.theta.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">
                        ±{prog.standardError.toFixed(2)}
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-xs text-[var(--text-secondary)] leading-snug">
                      {diag.intervention}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onNavigate('biblioteca', mt.id)}
                          className="px-2 py-1 rounded bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3 text-[var(--kirby-pink)]" />
                          Teoria
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate('exercicios', mt.id)}
                          className="px-2 py-1 rounded bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Zap className="w-3 h-3" /> Q
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fast 15-Item Calibration Modal */}
      {calibrationOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="dream-card max-w-2xl w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--kirby-pink)]">
                  Nivelamento Diagnóstico
                </span>
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  Questão {Math.min(calStep + 1, calibrationQuestions.length)} de{' '}
                  {calibrationQuestions.length}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCalibrationOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeCalQuestion ? (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[var(--text-secondary)]">
                  {activeCalQuestion.board} • {activeCalQuestion.examContext}
                </div>
                <div className="p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm">
                  <MathMarkdown text={activeCalQuestion.statementMarkdown} />
                </div>

                {activeCalQuestion.questionType === 'mcq5' &&
                activeCalQuestion.options ? (
                  <div className="space-y-2">
                    {activeCalQuestion.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          handleCalibrationAnswer(activeCalQuestion, idx)
                        }
                        className="w-full text-left p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-xs flex items-start gap-2.5 cursor-pointer"
                      >
                        <span className="font-mono font-bold text-[var(--kirby-pink)]">
                          {['A', 'B', 'C', 'D', 'E'][idx]})
                        </span>
                        <div className="flex-1">
                          <MathMarkdown text={opt} />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleCalibrationAnswer(activeCalQuestion, true)
                      }
                      className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-emerald-500/10 font-bold text-xs cursor-pointer"
                    >
                      CERTO
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleCalibrationAnswer(activeCalQuestion, false)
                      }
                      className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-rose-500/10 font-bold text-xs cursor-pointer"
                    >
                      ERRADO
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Nivelamento Concluído: {calCorrectCount}/
                  {calibrationQuestions.length} acertos
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  As estimativas de domínio e prioridade da tabela foram atualizadas.
                </p>
                <button
                  type="button"
                  onClick={() => setCalibrationOpen(false)}
                  className="dream-btn-primary px-4 py-2 text-xs cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
