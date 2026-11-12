import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ShieldAlert,
  Swords,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  ALL_MICROTOPICS,
  ALL_QUESTIONS,
  getMicrotopicsForTrack,
} from '../../data/curriculum';
import { evaluateSimulationScore } from '../../engine/psychometrics';
import { recordQuestionAttempt } from '../../utils/storage';
import type {
  ExamSimulationResult,
  ExerciseQuestion,
  UserStudyProfile,
} from '../../types/study';
import { BossMascot, KirbyMascot, WarpStarIcon } from '../KirbyArtwork';
import { MathMarkdown } from '../MathMarkdown';
import type { AppViewId } from './DashboardView';

interface SimuladosViewProps {
  profile: UserStudyProfile;
  onUpdateProfile: (next: UserStudyProfile) => void;
  onNavigate: (view: AppViewId, microtopicId?: string) => void;
}

type BossId = 'dedede' | 'metaknight' | 'galactaknight';

interface BossConfig {
  id: BossId;
  name: string;
  board: 'Cesgranrio' | 'Cebraspe' | 'Geral';
  title: string;
  ruleSummary: string;
  secPerQuestion: number;
  maxQuestions: number;
}

const BOSSES: BossConfig[] = [
  {
    id: 'dedede',
    name: 'King Dedede • Cesgranrio',
    board: 'Cesgranrio',
    title: 'Simulado Petrobras / BNDES (Múltipla Escolha 5 Opções)',
    ruleSummary:
      'Regra Cesgranrio: +1 por acerto, 0 por erro, corte eliminatório mínimo de 50% no Bloco Básico (Português & Inglês Técnico).',
    secPerQuestion: 180,
    maxQuestions: 10,
  },
  {
    id: 'metaknight',
    name: 'Meta Knight • Cebraspe',
    board: 'Cebraspe',
    title: 'Simulado Petrobras / Transpetro (Certo ou Errado -1)',
    ruleSummary:
      'Regra Cebraspe: +1 acerto, -1 erro, 0 em branco. Inclui opção explícita de deixar item em branco.',
    secPerQuestion: 105,
    maxQuestions: 10,
  },
  {
    id: 'galactaknight',
    name: 'Galacta Knight • Multibancas',
    board: 'Geral',
    title: 'Simulado Geral (FGV, Marinha CP-CEM, Vunesp & Híbridas)',
    ruleSummary:
      'Bateria mista com as questões de maior discriminação cobrindo Mecânica, Elétrica, Controle e Básicos.',
    secPerQuestion: 165,
    maxQuestions: 12,
  },
];

export const SimuladosView: React.FC<SimuladosViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const trackMicrotopics = useMemo(
    () => getMicrotopicsForTrack(profile.activeTrack),
    [profile.activeTrack]
  );

  const [activeBoss, setActiveBoss] = useState<BossConfig | null>(null);
  const [battleQuestions, setBattleQuestions] = useState<ExerciseQuestion[]>([]);
  const [answersMap, setAnswersMap] = useState<
    Record<string, number | boolean | null>
  >({});
  const [cursorIdx, setCursorIdx] = useState(0);
  const [remainingSec, setRemainingSec] = useState(0);
  const [initialDurationSec, setInitialDurationSec] = useState(1);

  const [battleResult, setBattleResult] = useState<{
    summary: ExamSimulationResult;
    questions: ExerciseQuestion[];
    userAnswers: Record<string, number | boolean | null>;
  } | null>(null);

  const buildQuestionsForBoss = (boss: BossConfig): ExerciseQuestion[] => {
    const trackIds = new Set(trackMicrotopics.map((m) => m.id));
    const basicQs = ALL_QUESTIONS.filter((q) =>
      q.microtopicId.startsWith('b-')
    );

    if (boss.id === 'dedede') {
      const techMcq = ALL_QUESTIONS.filter(
        (q) =>
          q.questionType === 'mcq5' &&
          trackIds.has(q.microtopicId) &&
          !q.microtopicId.startsWith('b-')
      );
      const basicMcq = basicQs.filter((q) => q.questionType === 'mcq5').slice(0, 2);
      const combined = [...basicMcq, ...techMcq].slice(0, boss.maxQuestions);
      return combined.length > 0 ? combined : ALL_QUESTIONS.slice(0, boss.maxQuestions);
    }

    if (boss.id === 'metaknight') {
      const tfTrack = ALL_QUESTIONS.filter(
        (q) => q.questionType === 'cebraspe_tf' && trackIds.has(q.microtopicId)
      );
      const tfAll = ALL_QUESTIONS.filter((q) => q.questionType === 'cebraspe_tf');
      const pool = tfTrack.length >= 4 ? tfTrack : tfAll;
      return pool.slice(0, boss.maxQuestions);
    }

    const sorted = [...ALL_QUESTIONS]
      .filter((q) => trackIds.has(q.microtopicId))
      .sort((a, b) => b.irt.a - a.irt.a);
    return sorted.slice(0, boss.maxQuestions);
  };

  const startBossBattle = (boss: BossConfig) => {
    const qs = buildQuestionsForBoss(boss);
    const totalSec = Math.max(60, qs.length * boss.secPerQuestion);
    setActiveBoss(boss);
    setBattleQuestions(qs);
    setAnswersMap({});
    setCursorIdx(0);
    setInitialDurationSec(totalSec);
    setRemainingSec(totalSec);
    setBattleResult(null);
  };

  const finalizeBattle = () => {
    if (!activeBoss || battleQuestions.length === 0) return;

    let runningProfile = profile;
    const perItemStatus: Array<{
      isBasic: boolean;
      status: 'correct' | 'wrong' | 'blank';
    }> = [];

    for (const q of battleQuestions) {
      const given = answersMap[q.id];
      const isBasic = q.microtopicId.startsWith('b-');

      if (given === undefined || given === null) {
        perItemStatus.push({ isBasic, status: 'blank' });
        continue;
      }

      const correct =
        q.questionType === 'mcq5'
          ? given === q.correctIndex
          : given === q.correctBoolean;

      perItemStatus.push({ isBasic, status: correct ? 'correct' : 'wrong' });

      const { nextProfile } = recordQuestionAttempt(runningProfile, {
        question: q,
        correct,
        timeSpentSec: activeBoss.secPerQuestion,
        wasGuess: false,
      });
      runningProfile = nextProfile;
    }

    const evalRes = evaluateSimulationScore({
      board: activeBoss.board,
      answers: perItemStatus,
    });

    const victory =
      evalRes.maxScore > 0 &&
      evalRes.netScore / evalRes.maxScore >= 0.6 &&
      evalRes.basicCutoffPassed;

    const simResult: ExamSimulationResult = {
      id: `sim-${Date.now()}`,
      dateISO: new Date().toISOString().slice(0, 10),
      bossId: activeBoss.id,
      board: activeBoss.board === 'Geral' ? 'FGV' : activeBoss.board,
      totalQuestions: battleQuestions.length,
      correctCount: evalRes.correctCount,
      wrongCount: evalRes.wrongCount,
      blankCount: evalRes.blankCount,
      netScore: evalRes.netScore,
      maxScore: evalRes.maxScore,
      basicCutoffPassed: evalRes.basicCutoffPassed,
      durationUsedSec: Math.max(10, initialDurationSec - remainingSec),
      bossDefeated: victory,
    };

    onUpdateProfile({
      ...runningProfile,
      examHistory: [simResult, ...runningProfile.examHistory].slice(0, 20),
    });

    setBattleResult({
      summary: simResult,
      questions: battleQuestions,
      userAnswers: answersMap,
    });
    setActiveBoss(null);
  };

  useEffect(() => {
    if (!activeBoss) return;
    if (remainingSec <= 0) {
      finalizeBattle();
      return;
    }
    const id = window.setInterval(() => {
      setRemainingSec((s) => s - 1);
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBoss, remainingSec]);

  const answeredCount = Object.values(answersMap).filter(
    (v) => v !== undefined && v !== null
  ).length;
  const bossHpPct = activeBoss
    ? Math.max(
        5,
        Math.round(
          ((battleQuestions.length - answeredCount) /
            Math.max(1, battleQuestions.length)) *
            100
        )
      )
    : 100;

  const currentQ = battleQuestions[cursorIdx];

  return (
    <div className="space-y-5">
      {!activeBoss && !battleResult && (
        <>
          <section className="dream-card p-4 sm:p-5">
            <h1 className="text-lg font-bold text-[var(--text-primary)]">
              Simulados Cronometrados por Banca
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Escolha a modalidade de prova abaixo. O sistema aplica as regras oficiais de pontuação e corte de cada banca.
            </p>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {BOSSES.map((boss) => (
              <div
                key={boss.id}
                className="dream-card p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                      <BossMascot boss={boss.id} size={52} />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)]">
                        {boss.board}
                      </span>
                      <div className="text-xs font-mono text-[var(--text-muted)] mt-1">
                        {boss.maxQuestions} itens •{' '}
                        {Math.round((boss.secPerQuestion / 60) * 10) / 10}m/item
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[var(--text-primary)]">
                      {boss.name}
                    </h2>
                    <div className="text-xs font-semibold text-[var(--kirby-pink)] mt-0.5">
                      {boss.title}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {boss.ruleSummary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => startBossBattle(boss)}
                  className="dream-btn-primary w-full py-2 text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Swords className="w-3.5 h-3.5" /> Iniciar Simulado ({boss.board})
                </button>
              </div>
            ))}
          </section>
        </>
      )}

      {/* Active Exam Simulation */}
      {activeBoss && currentQ && (
        <section className="space-y-4">
          <div className="dream-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BossMascot boss={activeBoss.id} size={46} />
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[var(--text-primary)]">
                    {activeBoss.name}
                  </span>
                  <span className="font-mono text-[var(--text-secondary)]">
                    • {answeredCount}/{battleQuestions.length} respondidas
                  </span>
                </div>
                <div className="w-48 h-2 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--maxim-red)] transition-all"
                    style={{ width: `${bossHpPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[var(--kirby-pink)]" />
                {Math.floor(remainingSec / 60)}:
                {String(remainingSec % 60).padStart(2, '0')}
              </div>

              <button
                type="button"
                onClick={finalizeBattle}
                className="dream-btn-primary px-3.5 py-1.5 text-xs cursor-pointer"
              >
                Encerrar & Corrigir
              </button>
            </div>
          </div>

          <div className="dream-card p-5 space-y-4">
            <div className="flex flex-wrap gap-1">
              {battleQuestions.map((q, idx) => {
                const answered =
                  answersMap[q.id] !== undefined && answersMap[q.id] !== null;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCursorIdx(idx)}
                    className={`w-7 h-7 rounded-md text-xs font-mono font-bold border transition cursor-pointer ${
                      idx === cursorIdx
                        ? 'bg-[var(--kirby-pink)] text-white border-[var(--kirby-pink)]'
                        : answered
                          ? 'bg-[var(--kirby-pink-soft)] text-[var(--text-primary)] border-[var(--border-strong)]'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-mono text-[var(--text-secondary)]">
              Questão {cursorIdx + 1}/{battleQuestions.length} • {currentQ.board} •{' '}
              {ALL_MICROTOPICS.find((m) => m.id === currentQ.microtopicId)?.title}
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              <MathMarkdown
                text={currentQ.statementMarkdown}
                className="text-sm sm:text-[15px]"
              />
            </div>

            {currentQ.questionType === 'mcq5' && currentQ.options ? (
              <div className="space-y-2">
                {currentQ.options.map((opt, idx) => {
                  const selected = answersMap[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setAnswersMap((m) => ({ ...m, [currentQ.id]: idx }))
                      }
                      className={`w-full text-left p-3 rounded-lg border flex items-start gap-3 transition cursor-pointer ${
                        selected
                          ? 'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)] text-[var(--text-primary)]'
                          : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border-[var(--border-subtle)]'
                      }`}
                    >
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                        {['A', 'B', 'C', 'D', 'E'][idx]}
                      </span>
                      <div className="flex-1 text-sm">
                        <MathMarkdown text={opt} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { val: true, label: 'CERTO (+1 / -1)' },
                  { val: false, label: 'ERRADO (+1 / -1)' },
                  { val: null, label: 'DEIXAR EM BRANCO (0)' },
                ].map((opt) => {
                  const selected =
                    opt.val === null
                      ? answersMap[currentQ.id] === null ||
                        answersMap[currentQ.id] === undefined
                      : answersMap[currentQ.id] === opt.val;
                  return (
                    <button
                      key={String(opt.label)}
                      type="button"
                      onClick={() =>
                        setAnswersMap((m) => ({ ...m, [currentQ.id]: opt.val }))
                      }
                      className={`p-3 rounded-lg border text-xs font-bold transition cursor-pointer ${
                        selected
                          ? 'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)] text-[var(--text-primary)]'
                          : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between pt-2 border-t border-[var(--border-subtle)]">
              <button
                type="button"
                disabled={cursorIdx === 0}
                onClick={() => setCursorIdx((i) => Math.max(0, i - 1))}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs font-semibold disabled:opacity-40 cursor-pointer"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={cursorIdx >= battleQuestions.length - 1}
                onClick={() =>
                  setCursorIdx((i) =>
                    Math.min(battleQuestions.length - 1, i + 1)
                  )
                }
                className="dream-btn-primary px-3.5 py-1.5 text-xs disabled:opacity-40 cursor-pointer"
              >
                Próxima
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Post-Exam Report */}
      {battleResult && (
        <section className="space-y-4">
          <div className="dream-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {battleResult.summary.bossDefeated ? (
                <div className="flex items-center gap-1.5">
                  <KirbyMascot ability="hammer" size={52} />
                  <WarpStarIcon size={28} />
                </div>
              ) : (
                <BossMascot boss={battleResult.summary.bossId} size={52} />
              )}
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-[var(--kirby-pink)]">
                  Resultado • {battleResult.summary.board}
                </span>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  {battleResult.summary.bossDefeated
                    ? 'Aprovada no Simulado!'
                    : 'Simulado Concluído — Revise os itens abaixo'}
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Pontuação Líquida:{' '}
                  <strong>{battleResult.summary.netScore}</strong> /{' '}
                  {battleResult.summary.maxScore} • Acertos:{' '}
                  {battleResult.summary.correctCount} • Erros:{' '}
                  {battleResult.summary.wrongCount} • Em Branco:{' '}
                  {battleResult.summary.blankCount} • Corte Básico (50%):{' '}
                  <strong>
                    {battleResult.summary.basicCutoffPassed
                      ? 'ATINGIDO'
                      : 'ABAIXO DO MÍNIMO'}
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBattleResult(null)}
                className="dream-btn-primary px-3.5 py-1.5 text-xs cursor-pointer"
              >
                Novo Simulado
              </button>
              <button
                type="button"
                onClick={() => onNavigate('matriz')}
                className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
              >
                Ver Edital
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {battleResult.questions.map((q, idx) => {
              const given = battleResult.userAnswers[q.id];
              const isBlank = given === undefined || given === null;
              const isCorrect =
                !isBlank &&
                (q.questionType === 'mcq5'
                  ? given === q.correctIndex
                  : given === q.correctBoolean);
              return (
                <div key={q.id} className="dream-card p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isBlank ? (
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                      Questão {idx + 1} ({q.board})
                    </span>
                    <span className="font-mono text-[var(--text-secondary)]">
                      {isCorrect
                        ? 'Correta'
                        : isBlank
                          ? 'Em Branco'
                          : 'Incorreta'}
                    </span>
                  </div>
                  <MathMarkdown
                    text={q.statementMarkdown}
                    className="text-xs text-[var(--text-secondary)]"
                  />
                  <div className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs">
                    <strong>Gabarito:</strong>{' '}
                    <MathMarkdown text={q.finalDiagnosis} className="inline" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* History */}
      {!activeBoss && profile.examHistory.length > 0 && (
        <section className="dream-card p-4 space-y-3">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[var(--warp-gold)]" />
            Simulados Realizados ({profile.examHistory.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {profile.examHistory.map((h) => (
              <div
                key={h.id}
                className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-[var(--text-primary)]">
                    {h.board} ({h.dateISO})
                  </span>
                  <span
                    className={
                      h.bossDefeated ? 'text-emerald-600' : 'text-rose-600'
                    }
                  >
                    {h.netScore}/{h.maxScore} pts
                  </span>
                </div>
                <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                  ✓{h.correctCount} ✗{h.wrongCount} • {h.blankCount} em branco •{' '}
                  {Math.round(h.durationUsedSec / 60)} min
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
