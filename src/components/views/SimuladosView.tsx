import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Infinity as InfinityIcon,
  ShieldAlert,
  Sparkles,
  Swords,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  ALL_MICROTOPICS,
  ALL_QUESTIONS,
  getMicrotopicsForTrack,
} from '../../data/curriculum';
import {
  classifyEngineerLevel,
  evaluateSimulationScore,
} from '../../engine/psychometrics';
import { recordQuestionAttempt } from '../../utils/storage';
import type {
  ExamBoard,
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

interface ActiveSimulationSession {
  id: string;
  bossId: BossId;
  name: string;
  board: 'Cesgranrio' | 'Cebraspe' | 'Geral';
  boardLabel: ExamBoard;
  themeLabel: string;
  untimed: boolean;
  secPerQuestion: number;
}

type ThemeScopeId =
  | 'all'
  | 'mec'
  | 'ele'
  | 'multi'
  | 'europa'
  | 'basico'
  | 'microtopic';

const THEME_SCOPES: Array<{
  id: ThemeScopeId;
  label: string;
  desc: string;
}> = [
  {
    id: 'all',
    label: 'Todas as Áreas (Diagnóstico Global)',
    desc: 'Cobre Mecânica, Elétrica, Controle, Matemática e Básicos',
  },
  {
    id: 'mec',
    label: 'Engenharia Mecânica (Termo, Fluidos, Sólidos & Máquinas)',
    desc: '15 matérias de Mecânica — Termodinâmica, Mohr, Bombas, Vibrações, NR-13',
  },
  {
    id: 'ele',
    label: 'Engenharia Elétrica (Potência, Circuitos, Máquinas & Proteção)',
    desc: '8 matérias de Elétrica — Maxwell, Trifásicos, MIT, Síncronas, SEP, NR-10, Ex',
  },
  {
    id: 'multi',
    label: 'Controle, Eletrônica de Potência & Matemática Superior',
    desc: 'Conversores CC-CC/PWM, Controle PID/Bode/Routh e Cálculo Vetorial/Laplace',
  },
  {
    id: 'europa',
    label: 'Provas & Processos Seletivos Europeus (CERN, ESA, EPSO, Equinor, CEng)',
    desc: 'Questões de seleção de engenheiros na Europa (CERN, Agência Espacial Europeia, Offshore Mar do Norte, UE)',
  },
  {
    id: 'basico',
    label: 'Conhecimentos Básicos (Português & Inglês Técnico)',
    desc: 'Interpretação, gramática Cesgranrio/FGV e leitura de normas internacionais em inglês',
  },
  {
    id: 'microtopic',
    label: 'Escolher uma Matéria Específica (1 dos 28 temas)',
    desc: 'Focar todas as questões do simulado em um único tema para medir seu nível nele',
  },
];

const BOSSES: Array<{
  id: BossId;
  name: string;
  board: 'Cesgranrio' | 'Cebraspe' | 'Geral';
  boardLabel: ExamBoard;
  title: string;
  ruleSummary: string;
  secPerQuestion: number;
  maxQuestions: number;
}> = [
  {
    id: 'dedede',
    name: 'King Dedede • Cesgranrio (Petrobras / Transpetro)',
    board: 'Cesgranrio',
    boardLabel: 'Cesgranrio',
    title: 'Simulado Padrão Petrobras & BNDES (5 Alternativas A–E)',
    ruleSummary:
      'Regra Cesgranrio: +1 por acerto, 0 por erro, corte eliminatório mínimo de 50% no Bloco Básico (Português & Inglês Técnico).',
    secPerQuestion: 180,
    maxQuestions: 20,
  },
  {
    id: 'metaknight',
    name: 'Meta Knight • Cebraspe (Certo / Errado)',
    board: 'Cebraspe',
    boardLabel: 'Cebraspe',
    title: 'Simulado Petrobras / ANP (Certo ou Errado com Penalidade -1)',
    ruleSummary:
      'Regra Cebraspe: +1 acerto, -1 erro, 0 em branco. Inclui botão explícito para deixar item em branco quando houver dúvida.',
    secPerQuestion: 105,
    maxQuestions: 20,
  },
  {
    id: 'galactaknight',
    name: 'Galacta Knight • Seleção Europeia & Internacional',
    board: 'Geral',
    boardLabel: 'Europa — CERN / ESA',
    title: 'Simulado Europeu (CERN, ESA, EPSO, Equinor Offshore & CEng)',
    ruleSummary:
      'Bateria com questões de processos seletivos de engenharia na Europa (Suíça, Holanda, Reino Unido, Mar do Norte e União Europeia).',
    secPerQuestion: 180,
    maxQuestions: 25,
  },
];

export function isEuropeanBoard(board: ExamBoard): boolean {
  return board.startsWith('Europa');
}

export const SimuladosView: React.FC<SimuladosViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const trackMicrotopics = useMemo(
    () => getMicrotopicsForTrack(profile.activeTrack),
    [profile.activeTrack]
  );

  // Custom Theme Exam Builder State
  const [selectedThemeScope, setSelectedThemeScope] =
    useState<ThemeScopeId>('all');
  const [selectedMicrotopicId, setSelectedMicrotopicId] = useState<string>(
    profile.selectedMicrotopicId || ALL_MICROTOPICS[0].id
  );
  const [customUntimed, setCustomUntimed] = useState<boolean>(true);
  const [customQuestionLimit, setCustomQuestionLimit] = useState<number>(28);

  // Active Exam State
  const [activeSession, setActiveSession] =
    useState<ActiveSimulationSession | null>(null);
  const [battleQuestions, setBattleQuestions] = useState<ExerciseQuestion[]>([]);
  const [answersMap, setAnswersMap] = useState<
    Record<string, number | boolean | null>
  >({});
  const [cursorIdx, setCursorIdx] = useState(0);
  const [remainingSec, setRemainingSec] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [initialDurationSec, setInitialDurationSec] = useState(1);

  const [battleResult, setBattleResult] = useState<{
    summary: ExamSimulationResult;
    questions: ExerciseQuestion[];
    userAnswers: Record<string, number | boolean | null>;
  } | null>(null);

  // Pool of questions matching the Custom Theme Builder
  const customFilteredPool = useMemo(() => {
    const trackIds = new Set(trackMicrotopics.map((m) => m.id));
    return ALL_QUESTIONS.filter((q) => {
      if (selectedThemeScope === 'microtopic') {
        return q.microtopicId === selectedMicrotopicId;
      }
      if (selectedThemeScope === 'europa') {
        return isEuropeanBoard(q.board);
      }
      if (selectedThemeScope === 'all') {
        return trackIds.has(q.microtopicId);
      }
      const mt = ALL_MICROTOPICS.find((m) => m.id === q.microtopicId);
      return mt?.macroArea === selectedThemeScope;
    });
  }, [trackMicrotopics, selectedThemeScope, selectedMicrotopicId]);

  const launchSimulation = (params: {
    session: ActiveSimulationSession;
    questions: ExerciseQuestion[];
  }) => {
    const { session, questions } = params;
    if (questions.length === 0) return;
    const totalSec = Math.max(60, questions.length * session.secPerQuestion);
    setActiveSession(session);
    setBattleQuestions(questions);
    setAnswersMap({});
    setCursorIdx(0);
    setInitialDurationSec(totalSec);
    setRemainingSec(totalSec);
    setElapsedSec(0);
    setBattleResult(null);
  };

  // Launch Untimed Comprehensive Diagnostic (1 per topic, 2 per topic, all, or Europe)
  const startUntimedDiagnostic = (
    mode: '1_per_topic' | '2_per_topic' | 'all_bank' | 'europe_all'
  ) => {
    const trackIds = new Set(trackMicrotopics.map((m) => m.id));
    let picked: ExerciseQuestion[] = [];
    let title = '';
    let themeLabel = '';

    if (mode === '1_per_topic') {
      for (const mt of trackMicrotopics) {
        const q = ALL_QUESTIONS.find((item) => item.microtopicId === mt.id);
        if (q) picked.push(q);
      }
      title = `Diagnóstico Geral Sem Tempo (${picked.length} questões)`;
      themeLabel = 'Todas as Matérias (1 por tema)';
    } else if (mode === '2_per_topic') {
      for (const mt of trackMicrotopics) {
        const qs = ALL_QUESTIONS.filter(
          (item) => item.microtopicId === mt.id
        ).slice(0, 2);
        picked.push(...qs);
      }
      title = `Diagnóstico Aprofundado Sem Tempo (${picked.length} questões)`;
      themeLabel = 'Todas as Matérias (2 por tema)';
    } else if (mode === 'europe_all') {
      picked = ALL_QUESTIONS.filter((q) => isEuropeanBoard(q.board));
      title = `Diagnóstico Europeu Sem Tempo (${picked.length} questões)`;
      themeLabel = 'Processos Seletivos Europeus (CERN / ESA / EPSO / Offshore)';
    } else {
      picked = ALL_QUESTIONS.filter((q) => trackIds.has(q.microtopicId));
      title = `Super Diagnóstico Completo (${picked.length} questões)`;
      themeLabel = 'Banco Completo da Trilha';
    }

    launchSimulation({
      session: {
        id: `diag-${mode}-${Date.now()}`,
        bossId: 'galactaknight',
        name: title,
        board: 'Geral',
        boardLabel:
          mode === 'europe_all' ? 'Europa — CERN / ESA' : 'Cesgranrio',
        themeLabel,
        untimed: true,
        secPerQuestion: 180,
      },
      questions: picked,
    });
  };

  // Launch Custom Theme / Subject Simulation
  const startCustomThemeExam = () => {
    const limit =
      customQuestionLimit >= 999
        ? customFilteredPool.length
        : Math.min(customQuestionLimit, customFilteredPool.length);

    // Distribute evenly across microtopics in pool so all subtopics get represented
    const byMt = new Map<string, ExerciseQuestion[]>();
    for (const q of customFilteredPool) {
      const list = byMt.get(q.microtopicId) ?? [];
      list.push(q);
      byMt.set(q.microtopicId, list);
    }

    const balanced: ExerciseQuestion[] = [];
    let round = 0;
    while (balanced.length < limit && round < 20) {
      let addedInRound = 0;
      for (const list of byMt.values()) {
        if (round < list.length && balanced.length < limit) {
          balanced.push(list[round]);
          addedInRound++;
        }
      }
      if (addedInRound === 0) break;
      round++;
    }

    const mtObj = ALL_MICROTOPICS.find((m) => m.id === selectedMicrotopicId);
    const scopeMeta = THEME_SCOPES.find((s) => s.id === selectedThemeScope);
    const themeLabel =
      selectedThemeScope === 'microtopic' && mtObj
        ? `${mtObj.code} — ${mtObj.title}`
        : scopeMeta?.label ?? 'Simulado por Tema';

    launchSimulation({
      session: {
        id: `custom-${Date.now()}`,
        bossId:
          selectedThemeScope === 'europa' ? 'galactaknight' : 'dedede',
        name: `Simulado por Tema: ${themeLabel}`,
        board: 'Geral',
        boardLabel:
          selectedThemeScope === 'europa'
            ? 'Europa — CERN / ESA'
            : 'Cesgranrio',
        themeLabel,
        untimed: customUntimed,
        secPerQuestion: 165,
      },
      questions: balanced,
    });
  };

  // Launch Classic Boss Battle
  const startBossBattle = (boss: (typeof BOSSES)[number], untimed = false) => {
    const trackIds = new Set(trackMicrotopics.map((m) => m.id));
    let picked: ExerciseQuestion[] = [];

    if (boss.id === 'dedede') {
      const basicMcq = ALL_QUESTIONS.filter(
        (q) => q.microtopicId.startsWith('b-') && q.questionType === 'mcq5'
      ).slice(0, 4);
      const techMcq = ALL_QUESTIONS.filter(
        (q) =>
          q.questionType === 'mcq5' &&
          trackIds.has(q.microtopicId) &&
          !q.microtopicId.startsWith('b-') &&
          !isEuropeanBoard(q.board)
      );
      picked = [...basicMcq, ...techMcq].slice(0, boss.maxQuestions);
    } else if (boss.id === 'metaknight') {
      const tfTrack = ALL_QUESTIONS.filter(
        (q) => q.questionType === 'cebraspe_tf' && trackIds.has(q.microtopicId)
      );
      const tfAll = ALL_QUESTIONS.filter(
        (q) => q.questionType === 'cebraspe_tf'
      );
      picked = (tfTrack.length >= 6 ? tfTrack : tfAll).slice(
        0,
        boss.maxQuestions
      );
    } else {
      const euroQs = ALL_QUESTIONS.filter(
        (q) => isEuropeanBoard(q.board) && trackIds.has(q.microtopicId)
      );
      picked =
        euroQs.length > 0
          ? euroQs.slice(0, boss.maxQuestions)
          : ALL_QUESTIONS.slice(0, boss.maxQuestions);
    }

    launchSimulation({
      session: {
        id: `boss-${boss.id}-${Date.now()}`,
        bossId: boss.id,
        name: boss.name,
        board: boss.board,
        boardLabel: boss.boardLabel,
        themeLabel: boss.title,
        untimed,
        secPerQuestion: boss.secPerQuestion,
      },
      questions: picked,
    });
  };

  const finalizeBattle = () => {
    if (!activeSession || battleQuestions.length === 0) return;

    let runningProfile = profile;
    const perItemStatus: Array<{
      isBasic: boolean;
      status: 'correct' | 'wrong' | 'blank';
    }> = [];

    const avgSecPerItem = Math.max(
      15,
      Math.round(elapsedSec / Math.max(1, battleQuestions.length))
    );

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
        timeSpentSec: avgSecPerItem,
        wasGuess: false,
      });
      runningProfile = nextProfile;
    }

    const evalRes = evaluateSimulationScore({
      board: activeSession.board,
      answers: perItemStatus,
    });

    const accuracyPct =
      battleQuestions.length > 0
        ? Math.round((evalRes.correctCount / battleQuestions.length) * 100)
        : 0;

    const levelDiag = classifyEngineerLevel({
      attempts: evalRes.correctCount + evalRes.wrongCount,
      accuracyPct,
    });

    const victory =
      evalRes.maxScore > 0 &&
      evalRes.netScore / evalRes.maxScore >= 0.6 &&
      evalRes.basicCutoffPassed;

    const simResult: ExamSimulationResult = {
      id: `sim-${Date.now()}`,
      dateISO: new Date().toISOString().slice(0, 10),
      bossId: activeSession.bossId,
      board: activeSession.boardLabel,
      title: activeSession.name,
      themeLabel: activeSession.themeLabel,
      untimed: activeSession.untimed,
      engineerLevel: levelDiag.id,
      engineerLevelLabel: levelDiag.label,
      totalQuestions: battleQuestions.length,
      correctCount: evalRes.correctCount,
      wrongCount: evalRes.wrongCount,
      blankCount: evalRes.blankCount,
      netScore: evalRes.netScore,
      maxScore: evalRes.maxScore,
      basicCutoffPassed: evalRes.basicCutoffPassed,
      durationUsedSec: Math.max(
        10,
        activeSession.untimed ? elapsedSec : initialDurationSec - remainingSec
      ),
      bossDefeated: victory,
    };

    onUpdateProfile({
      ...runningProfile,
      examHistory: [simResult, ...runningProfile.examHistory].slice(0, 30),
    });

    setBattleResult({
      summary: simResult,
      questions: battleQuestions,
      userAnswers: answersMap,
    });
    setActiveSession(null);
  };

  useEffect(() => {
    if (!activeSession) return;
    if (!activeSession.untimed && remainingSec <= 0) {
      finalizeBattle();
      return;
    }
    const id = window.setInterval(() => {
      setElapsedSec((s) => s + 1);
      if (!activeSession.untimed) {
        setRemainingSec((s) => s - 1);
      }
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession, remainingSec]);

  const answeredCount = Object.values(answersMap).filter(
    (v) => v !== undefined && v !== null
  ).length;
  const progressPct = activeSession
    ? Math.round(
        (answeredCount / Math.max(1, battleQuestions.length)) * 100
      )
    : 0;

  const currentQ = battleQuestions[cursorIdx];

  // Breakdown by microtopic for the post-exam report
  const resultTopicBreakdown = useMemo(() => {
    if (!battleResult) return [];
    const map = new Map<
      string,
      { total: number; correct: number; wrong: number; blank: number }
    >();
    for (const q of battleResult.questions) {
      const entry = map.get(q.microtopicId) ?? {
        total: 0,
        correct: 0,
        wrong: 0,
        blank: 0,
      };
      entry.total += 1;
      const given = battleResult.userAnswers[q.id];
      if (given === undefined || given === null) {
        entry.blank += 1;
      } else {
        const isOk =
          q.questionType === 'mcq5'
            ? given === q.correctIndex
            : given === q.correctBoolean;
        if (isOk) entry.correct += 1;
        else entry.wrong += 1;
      }
      map.set(q.microtopicId, entry);
    }

    return Array.from(map.entries()).map(([mtId, stats]) => {
      const mt = ALL_MICROTOPICS.find((m) => m.id === mtId);
      const pct = Math.round((stats.correct / Math.max(1, stats.total)) * 100);
      const lvl = classifyEngineerLevel({
        attempts: stats.total,
        accuracyPct: pct,
      });
      return {
        mtId,
        code: mt?.code ?? mtId,
        title: mt?.title ?? mtId,
        ...stats,
        pct,
        lvl,
      };
    });
  }, [battleResult]);

  return (
    <div className="space-y-6">
      {!activeSession && !battleResult && (
        <>
          {/* 1. UNTIMED COMPREHENSIVE DIAGNOSTIC BANNER */}
          <section className="dream-card p-5 sm:p-6 space-y-4 border-[var(--border-strong)] bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-surface)] to-[var(--bg-accent-soft)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--kirby-pink-soft)] border border-[var(--border-strong)] text-[11px] font-bold text-[var(--kirby-pink)]">
                  <InfinityIcon className="w-3.5 h-3.5" />
                  Modo Sem Limite de Tempo • Medidor Oficial de Nível
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  Diagnóstico de Nível: Engenheira Normal vs. Engenheira Expert
                </h1>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
                  Como o seu perfil começa <strong>100% zerado</strong>, escolha abaixo uma bateria diagnóstica <strong>sem limite de tempo</strong> para responder com calma. Ao concluir, você recebe seu diagnóstico completo classificando cada área como <strong>Engenheira em Base</strong>, <strong>Engenheira Normal (Plena)</strong>, <strong>Engenheira Sênior</strong> ou <strong>Engenheira Expert</strong>.
                </p>
              </div>

              <div className="shrink-0 hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <KirbyMascot ability="scholar" size={52} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <button
                type="button"
                onClick={() => startUntimedDiagnostic('1_per_topic')}
                className="p-4 rounded-xl bg-[var(--bg-surface)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] text-left transition flex flex-col justify-between gap-3 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[var(--kirby-pink)]">
                    <span>DIAGNÓSTICO RÁPIDO</span>
                    <span>∞ SEM TEMPO</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-1 group-hover:text-[var(--kirby-pink)]">
                    {trackMicrotopics.length} Questões (1 por Matéria)
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    1 questão de cada um dos {trackMicrotopics.length} tópicos para mapear seus pontos fortes e lacunas iniciais.
                  </p>
                </div>
                <span className="dream-btn-primary px-3 py-1.5 text-xs text-center">
                  Iniciar ({trackMicrotopics.length} itens)
                </span>
              </button>

              <button
                type="button"
                onClick={() => startUntimedDiagnostic('2_per_topic')}
                className="p-4 rounded-xl bg-[var(--bg-surface)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] text-left transition flex flex-col justify-between gap-3 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[var(--kirby-pink)]">
                    <span>DIAGNÓSTICO PROFUNDO</span>
                    <span>∞ SEM TEMPO</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-1 group-hover:text-[var(--kirby-pink)]">
                    {trackMicrotopics.length * 2} Questões (2 por Matéria)
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Avaliação dupla por matéria para calibrar com alta precisão seu nível Normal vs. Expert.
                  </p>
                </div>
                <span className="dream-btn-primary px-3 py-1.5 text-xs text-center">
                  Iniciar ({trackMicrotopics.length * 2} itens)
                </span>
              </button>

              <button
                type="button"
                onClick={() => startUntimedDiagnostic('europe_all')}
                className="p-4 rounded-xl bg-[var(--bg-surface)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] text-left transition flex flex-col justify-between gap-3 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[var(--sky-info)]">
                    <span>PADRÃO EUROPA 🇪🇺</span>
                    <span>∞ SEM TEMPO</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-1 group-hover:text-[var(--kirby-pink)]">
                    Processos Seletivos Europeus (
                    {ALL_QUESTIONS.filter((q) => isEuropeanBoard(q.board)).length}{' '}
                    questões)
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Questões estilo CERN, ESA, EPSO (União Europeia), Equinor/Shell Offshore e CEng.
                  </p>
                </div>
                <span className="dream-btn-primary px-3 py-1.5 text-xs text-center">
                  Iniciar Prova Europeia
                </span>
              </button>

              <button
                type="button"
                onClick={() => startUntimedDiagnostic('all_bank')}
                className="p-4 rounded-xl bg-[var(--bg-surface)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] text-left transition flex flex-col justify-between gap-3 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[var(--warp-gold)]">
                    <span>BANCO GIGANTE COMPLETO</span>
                    <span>∞ SEM TEMPO</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-1 group-hover:text-[var(--kirby-pink)]">
                    Maratona Completa ({ALL_QUESTIONS.length} Questões)
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Todas as {ALL_QUESTIONS.length} questões do banco em uma única bateria sem limite de tempo.
                  </p>
                </div>
                <span className="dream-btn-primary px-3 py-1.5 text-xs text-center">
                  Iniciar Todas ({ALL_QUESTIONS.length})
                </span>
              </button>
            </div>
          </section>

          {/* 2. CUSTOM SIMULADO BY THEME / SUBJECT */}
          <section className="dream-card p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[var(--kirby-pink)]" />
                  <h2 className="text-base font-bold text-[var(--text-primary)]">
                    Simulado Personalizado por Tema ou Matéria
                  </h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Escolha uma grande área ou uma matéria específica para descobrir se você já está no nível <strong>Engenheira Normal</strong> ou <strong>Engenheira Expert</strong> naquele tema.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                {customFilteredPool.length} questões disponíveis no filtro
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Theme Scope Selection */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  1. Escolha o Tema / Área
                </label>
                <select
                  value={selectedThemeScope}
                  onChange={(e) =>
                    setSelectedThemeScope(e.target.value as ThemeScopeId)
                  }
                  className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--kirby-pink)]"
                >
                  {THEME_SCOPES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>

                {selectedThemeScope === 'microtopic' && (
                  <div className="pt-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--kirby-pink)] mb-1">
                      Selecione a Matéria Específica:
                    </label>
                    <select
                      value={selectedMicrotopicId}
                      onChange={(e) => setSelectedMicrotopicId(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                    >
                      {ALL_MICROTOPICS.map((mt) => (
                        <option key={mt.id} value={mt.id}>
                          {mt.code} — {mt.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Time Mode */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  2. Modo de Tempo
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomUntimed(true)}
                    className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
                      customUntimed
                        ? 'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)] text-[var(--text-primary)]'
                        : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1">
                      <InfinityIcon className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                      Sem Tempo
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                      Foco em medir nível real sem pressa
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomUntimed(false)}
                    className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
                      !customUntimed
                        ? 'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)] text-[var(--text-primary)]'
                        : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                      Cronometrado
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                      Ritmo de prova (2,7 min/item)
                    </div>
                  </button>
                </div>
              </div>

              {/* Number of Questions */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  3. Quantidade de Questões
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[5, 10, 20, 35, 50, 999].map((n) => {
                    const label =
                      n === 999
                        ? `Todas (${customFilteredPool.length})`
                        : `${n}`;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setCustomQuestionLimit(n)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                          customQuestionLimit === n
                            ? 'bg-[var(--kirby-pink)] text-white border-[var(--kirby-pink)]'
                            : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
              <div className="text-xs text-[var(--text-secondary)]">
                Escala de Nível: <strong>&lt;50%</strong> Em Base •{' '}
                <strong>50–71%</strong> Engenheira Normal (Plena) •{' '}
                <strong>72–84%</strong> Engenheira Sênior •{' '}
                <strong>≥85%</strong> Engenheira Expert
              </div>
              <button
                type="button"
                onClick={startCustomThemeExam}
                disabled={customFilteredPool.length === 0}
                className="dream-btn-primary px-5 py-2 text-xs inline-flex items-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <Sparkles className="w-4 h-4" />
                Iniciar Simulado por Tema (
                {Math.min(customQuestionLimit, customFilteredPool.length)}{' '}
                questões)
              </button>
            </div>
          </section>

          {/* 3. OFFICIAL BOARD SIMULATIONS (BOSSES) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Simulados por Banca Específica (Com opção Sem Tempo ou Cronometrado)
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
                          {boss.boardLabel}
                        </span>
                        <div className="text-xs font-mono text-[var(--text-muted)] mt-1">
                          {boss.maxQuestions} questões
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]">
                        {boss.name}
                      </h3>
                      <div className="text-xs font-semibold text-[var(--kirby-pink)] mt-0.5">
                        {boss.title}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {boss.ruleSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => startBossBattle(boss, true)}
                      className="px-3 py-2 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <InfinityIcon className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                      Sem Tempo
                    </button>
                    <button
                      type="button"
                      onClick={() => startBossBattle(boss, false)}
                      className="dream-btn-primary py-2 px-3 text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Swords className="w-3.5 h-3.5" /> Cronometrado
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ACTIVE SIMULATION SESSION */}
      {activeSession && currentQ && (
        <section className="space-y-4">
          <div className="dream-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BossMascot boss={activeSession.bossId} size={46} />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[var(--text-primary)]">
                    {activeSession.name}
                  </span>
                  <span className="font-mono text-[var(--text-secondary)]">
                    • {answeredCount}/{battleQuestions.length} respondidas (
                    {progressPct}%)
                  </span>
                </div>
                <div className="w-56 h-2 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--kirby-pink)] transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {activeSession.untimed ? (
                <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <InfinityIcon className="w-4 h-4 text-[var(--kirby-pink)]" />
                  <span>Sem Limite • Tempo decorrido:</span>
                  <span>
                    {Math.floor(elapsedSec / 60)}:
                    {String(elapsedSec % 60).padStart(2, '0')}
                  </span>
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--kirby-pink)]" />
                  {Math.floor(remainingSec / 60)}:
                  {String(remainingSec % 60).padStart(2, '0')}
                </div>
              )}

              <button
                type="button"
                onClick={finalizeBattle}
                className="dream-btn-primary px-4 py-1.5 text-xs cursor-pointer"
              >
                Finalizar & Calcular Meu Nível
              </button>
              <button
                type="button"
                onClick={() => setActiveSession(null)}
                className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>

          <div className="dream-card p-5 space-y-4">
            <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1">
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

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--text-secondary)]">
              <span>
                Questão {cursorIdx + 1} de {battleQuestions.length} •{' '}
                <strong className="text-[var(--kirby-pink)]">
                  {currentQ.board}
                </strong>{' '}
                • {currentQ.examContext}
              </span>
              <span>
                {ALL_MICROTOPICS.find((m) => m.id === currentQ.microtopicId)
                  ?.code ?? ''}{' '}
                —{' '}
                {
                  ALL_MICROTOPICS.find((m) => m.id === currentQ.microtopicId)
                    ?.title
                }
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              <MathMarkdown
                text={currentQ.statementMarkdown}
                className="text-sm sm:text-[15px] leading-relaxed"
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
                  { val: true, label: 'CERTO' },
                  { val: false, label: 'ERRADO' },
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

            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
              <button
                type="button"
                disabled={cursorIdx === 0}
                onClick={() => setCursorIdx((i) => Math.max(0, i - 1))}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs font-semibold disabled:opacity-40 cursor-pointer"
              >
                Anterior
              </button>
              <div className="flex items-center gap-2">
                {cursorIdx < battleQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCursorIdx((i) =>
                        Math.min(battleQuestions.length - 1, i + 1)
                      )
                    }
                    className="dream-btn-primary px-4 py-1.5 text-xs cursor-pointer"
                  >
                    Próxima Questão
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finalizeBattle}
                    className="dream-btn-primary px-4 py-1.5 text-xs cursor-pointer"
                  >
                    Concluir e Ver Nível de Engenheira
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* POST-EXAM ENGINEERING LEVEL DIAGNOSTIC REPORT */}
      {battleResult && (
        <section className="space-y-5">
          {(() => {
            const pct =
              battleResult.summary.totalQuestions > 0
                ? Math.round(
                    (battleResult.summary.correctCount /
                      battleResult.summary.totalQuestions) *
                      100
                  )
                : 0;
            const overallLevel = classifyEngineerLevel({
              attempts:
                battleResult.summary.correctCount +
                battleResult.summary.wrongCount,
              accuracyPct: pct,
            });

            return (
              <div className="dream-card p-5 sm:p-6 space-y-5 border-[var(--border-strong)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <KirbyMascot
                        ability={
                          overallLevel.id === 'expert' ? 'hammer' : 'scholar'
                        }
                        size={56}
                      />
                      {overallLevel.id === 'expert' && (
                        <WarpStarIcon size={28} />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono font-bold uppercase text-[var(--kirby-pink)]">
                          Laudo de Nível • {battleResult.summary.themeLabel ?? battleResult.summary.board}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${overallLevel.badgeCls}`}
                        >
                          {overallLevel.label}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                        Taxa de Acerto: {pct}% ({battleResult.summary.correctCount} acertos de{' '}
                        {battleResult.summary.totalQuestions} questões)
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {overallLevel.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setBattleResult(null)}
                      className="dream-btn-primary px-4 py-2 text-xs cursor-pointer"
                    >
                      Novo Simulado / Outro Tema
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('matriz')}
                      className="px-3.5 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
                    >
                      Ver Matriz Completa
                    </button>
                  </div>
                </div>

                {/* Per-Topic Engineering Level Breakdown */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[var(--kirby-pink)]" />
                    Diagnóstico de Nível por Matéria Avaliada ({resultTopicBreakdown.length} temas)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {resultTopicBreakdown.map((item) => (
                      <div
                        key={item.mtId}
                        className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[var(--kirby-pink)]">
                              {item.code}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.lvl.badgeCls}`}
                            >
                              {item.lvl.shortBadge}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-[var(--text-primary)] truncate mt-0.5">
                            {item.title}
                          </div>
                          <div className="text-[11px] font-mono text-[var(--text-secondary)]">
                            Acertos: {item.correct}/{item.total} ({item.pct}%)
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onNavigate('biblioteca', item.mtId)}
                          className="shrink-0 px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[11px] font-semibold text-[var(--text-primary)] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3 text-[var(--kirby-pink)]" />
                          Teoria
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Detailed Step-by-Step Solution Review */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              Gabarito Analítico Comentado ({battleResult.questions.length} questões)
            </h3>
            {battleResult.questions.map((q, idx) => {
              const given = battleResult.userAnswers[q.id];
              const isBlank = given === undefined || given === null;
              const isCorrect =
                !isBlank &&
                (q.questionType === 'mcq5'
                  ? given === q.correctIndex
                  : given === q.correctBoolean);
              const mt = ALL_MICROTOPICS.find((m) => m.id === q.microtopicId);
              return (
                <div key={q.id} className="dream-card p-4 sm:p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isBlank ? (
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                      Questão {idx + 1} • {q.board} ({mt?.code} — {mt?.title})
                    </span>
                    <span className="font-mono text-[var(--text-secondary)]">
                      {isCorrect
                        ? '✓ Acertou'
                        : isBlank
                          ? 'Em Branco'
                          : '✗ Errou'}
                    </span>
                  </div>
                  <MathMarkdown
                    text={q.statementMarkdown}
                    className="text-xs sm:text-sm text-[var(--text-primary)]"
                  />
                  <div className="space-y-1.5 pt-1">
                    {q.solutionStepsMarkdown.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs"
                      >
                        <MathMarkdown text={step} />
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs">
                    <strong>Conclusão & Gabarito:</strong>{' '}
                    <MathMarkdown text={q.finalDiagnosis} className="inline" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* History */}
      {!activeSession && profile.examHistory.length > 0 && (
        <section className="dream-card p-5 space-y-3">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[var(--warp-gold)]" />
            Histórico de Diagnósticos e Simulados ({profile.examHistory.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {profile.examHistory.map((h) => {
              const pct =
                h.totalQuestions > 0
                  ? Math.round((h.correctCount / h.totalQuestions) * 100)
                  : 0;
              return (
                <div
                  key={h.id}
                  className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-[var(--text-primary)] truncate">
                      {h.title ?? h.board}
                    </span>
                    <span className="font-mono text-[var(--kirby-pink)] shrink-0 ml-2">
                      {pct}% ({h.correctCount}/{h.totalQuestions})
                    </span>
                  </div>
                  {h.engineerLevelLabel && (
                    <div className="text-[11px] font-semibold text-emerald-700">
                      Nível: {h.engineerLevelLabel}
                    </div>
                  )}
                  <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                    {h.dateISO} • ✓{h.correctCount} ✗{h.wrongCount} •{' '}
                    {h.untimed ? 'Sem limite' : 'Cronometrado'} (
                    {Math.round(h.durationUsedSec / 60)} min)
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
