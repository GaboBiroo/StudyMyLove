import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
  FileCode2,
  Heart,
  HelpCircle,
  Layers,
  Search,
  Swords,
  Zap,
} from 'lucide-react';
import {
  ALL_FLASHCARDS,
  ALL_QUESTIONS,
  getMicrotopicsForTrack,
} from '../../data/curriculum';
import {
  COPY_ABILITIES,
  DAILY_ROUTINE_TEMPLATE,
  PLANETS,
  TRACK_METADATA,
} from '../../data/planetsAndCopyAbilities';
import {
  classifyEngineerLevel,
  diagnoseMicrotopic,
} from '../../engine/psychometrics';
import type {
  CopyAbilityId,
  MacroArea,
  RoutineBlock,
  StudyTrack,
  UserStudyProfile,
} from '../../types/study';
import {
  BossMascot,
  CopyAbilityBadge,
  KirbyMascot,
  type KirbyMascotVariant,
  MaximTomatoIcon,
  WarpStarIcon,
} from '../KirbyArtwork';

export type AppViewId =
  | 'dashboard'
  | 'rotina'
  | 'biblioteca'
  | 'exercicios'
  | 'auto-revisao'
  | 'matriz'
  | 'simulados';

interface DashboardViewProps {
  profile: UserStudyProfile;
  onUpdateProfile: (next: UserStudyProfile) => void;
  onNavigate: (view: AppViewId, microtopicId?: string) => void;
  onOpenTutorialModal?: () => void;
}

const LOVE_NOTES: Array<{
  title: string;
  message: string;
  mascot: KirbyMascotVariant;
}> = [
  {
    title: 'Para o meu amor, Thaisa ♥',
    message:
      'Criei o StudyMyLove inteirinho pensando em você. Eu te amo demais e tenho um orgulho imenso da mulher dedicada, inteligente e incrível que você é. Quis reunir tudo dos seus estudos de Engenharia e da Petrobras em um ambiente calmo, limpo e confortável — para deixar a sua rotina mais leve e te lembrar todos os dias do quanto eu acredito em você.',
    mascot: 'classic',
  },
  {
    title: 'Meu orgulho diário ♥',
    message:
      'Cada equação deduzida, cada norma revisada e cada questão resolvida aqui dentro é mais um passo rumo à sua aprovação. Você é brilhante, meu amor. Estude no seu ritmo, com tranquilidade no coração, porque eu estou sempre ao seu lado torcendo por cada conquista sua!',
    mascot: 'waddledee',
  },
  {
    title: 'Cuide de você enquanto estuda ♥',
    message:
      'Não esqueça de beber água, alongar os ombros e fazer suas pausas Maxim Tomato! A sua saúde e o seu bem-estar vêm sempre em primeiro lugar. Eu te amo daqui até Dream Land, minha engenheira favorita ♥',
    mascot: 'sleep',
  },
  {
    title: 'Você nasceu para brilhar ♥',
    message:
      'Quando algum tema parecer difícil, respire fundo e lembre-se de tudo o que você já superou na Engenharia. Você tem uma mente admirável e uma força linda. Te amo infinitamente!',
    mascot: 'starride',
  },
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
  onOpenTutorialModal,
}) => {
  const [loveNoteIdx, setLoveNoteIdx] = useState(0);
  const [loveCardExpanded, setLoveCardExpanded] = useState(true);
  const [tutorialVisible, setTutorialVisible] = useState(true);

  const [bottomSectionTab, setBottomSectionTab] = useState<
    'materias' | 'cronograma' | 'normas' | 'personagens'
  >('materias');
  const [areaTab, setAreaTab] = useState<'all' | 'priority' | MacroArea>('all');
  const [topicFilter, setTopicFilter] = useState('');

  const trackMicrotopics = useMemo(
    () => getMicrotopicsForTrack(profile.activeTrack),
    [profile.activeTrack]
  );

  const questionCountByMicrotopic = useMemo(() => {
    const map = new Map<string, number>();
    for (const q of ALL_QUESTIONS) {
      map.set(q.microtopicId, (map.get(q.microtopicId) ?? 0) + 1);
    }
    return map;
  }, []);

  const diagnostics = useMemo(() => {
    const now = new Date();
    return trackMicrotopics
      .map((mt) => {
        const prog = profile.microtopics[mt.id];
        const diag = diagnoseMicrotopic(prog, now);
        return { mt, prog, diag };
      })
      .sort((a, b) => b.diag.priorityScore - a.diag.priorityScore);
  }, [trackMicrotopics, profile.microtopics]);

  const topFocus = diagnostics[0];
  const nextPriorities = diagnostics.slice(1, 4);

  const dueFlashcardsCount = useMemo(() => {
    const nowMs = Date.now();
    const validIds = new Set(trackMicrotopics.map((m) => m.id));
    return ALL_FLASHCARDS.filter((fc) => {
      if (!validIds.has(fc.microtopicId)) return false;
      const p = profile.flashcards[fc.id];
      if (!p) return true;
      return new Date(p.nextReviewISO).getTime() <= nowMs;
    }).length;
  }, [trackMicrotopics, profile.flashcards]);

  const stats = useMemo(() => {
    const total = diagnostics.length || 1;
    const mastered = diagnostics.filter((d) => d.prog.pKnown >= 0.9).length;
    const readDone = diagnostics.filter((d) => d.prog.readingCompleted).length;
    const avgTheta =
      diagnostics.reduce((acc, d) => acc + d.prog.theta, 0) / total;
    const avgPKnown =
      diagnostics.reduce((acc, d) => acc + d.prog.pKnown, 0) / total;

    const solvedQuestionsSet = new Set<string>();
    let totalAttempts = 0;
    let totalCorrectAttempts = 0;
    diagnostics.forEach((d) => {
      d.prog.responses.forEach((r) => {
        totalAttempts += 1;
        if (r.correct) {
          solvedQuestionsSet.add(r.questionId);
          totalCorrectAttempts += 1;
        }
      });
    });

    const overallAccuracyPct =
      totalAttempts > 0
        ? Math.round((totalCorrectAttempts / totalAttempts) * 100)
        : 0;
    const engineerLevel = classifyEngineerLevel({
      attempts: totalAttempts,
      accuracyPct: overallAccuracyPct,
      theta: avgTheta,
    });

    return {
      total,
      mastered,
      readDone,
      avgTheta: Number(avgTheta.toFixed(2)),
      avgPKnownPct: Math.round(avgPKnown * 100),
      solvedQuestions: solvedQuestionsSet.size,
      totalAttempts,
      overallAccuracyPct,
      engineerLevel,
    };
  }, [diagnostics]);

  const normsIndex = useMemo(() => {
    const list: Array<{ norm: string; mtId: string; code: string; title: string }> = [];
    const seen = new Set<string>();
    for (const mt of trackMicrotopics) {
      for (const norm of mt.norms) {
        const key = `${norm}-${mt.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({ norm, mtId: mt.id, code: mt.code, title: mt.title });
        }
      }
    }
    return list;
  }, [trackMicrotopics]);

  const completedRoutineSet = useMemo(
    () => new Set(profile.completedRoutineBlocksToday),
    [profile.completedRoutineBlocksToday]
  );

  const toggleRoutineBlock = (block: RoutineBlock) => {
    const exists = completedRoutineSet.has(block.id);
    const nextCompleted = exists
      ? profile.completedRoutineBlocksToday.filter((id) => id !== block.id)
      : [...profile.completedRoutineBlocksToday, block.id];

    const isBreak =
      block.phaseType === 'break-tomato' || block.phaseType === 'lunch';
    const deltaMin = isBreak
      ? 0
      : exists
        ? -block.durationMinutes
        : block.durationMinutes;

    onUpdateProfile({
      ...profile,
      completedRoutineBlocksToday: nextCompleted,
      totalMinutesStudied: Math.max(0, profile.totalMinutesStudied + deltaMin),
    });
  };

  const handleTrackChange = (track: StudyTrack) => {
    onUpdateProfile({
      ...profile,
      activeTrack: track,
    });
  };

  const filteredDiagnostics = useMemo(() => {
    const q = topicFilter.trim().toLowerCase();
    return diagnostics.filter(({ mt, prog }) => {
      if (areaTab === 'priority' && prog.pKnown >= 0.85) return false;
      if (
        areaTab !== 'all' &&
        areaTab !== 'priority' &&
        mt.macroArea !== areaTab
      ) {
        return false;
      }
      if (!q) return true;
      return (
        mt.code.toLowerCase().includes(q) ||
        mt.title.toLowerCase().includes(q) ||
        mt.summary.toLowerCase().includes(q) ||
        mt.norms.some((n) => n.toLowerCase().includes(q))
      );
    });
  }, [diagnostics, areaTab, topicFilter]);

  const currentLoveNote = LOVE_NOTES[loveNoteIdx % LOVE_NOTES.length];

  return (
    <div className="space-y-8">
      {/* 1. DEDICATÓRIA DE AMOR NA PÁGINA INICIAL */}
      <section className="dream-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-[var(--kirby-pink-soft)] border border-[var(--border-strong)] flex items-center justify-center shrink-0 p-1">
              <KirbyMascot ability={currentLoveNote.mascot} size={54} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--kirby-pink)]">
                <Heart className="w-3.5 h-3.5 fill-[var(--kirby-pink)]" />
                <span>Feito com todo amor para você</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-0.5">
                {currentLoveNote.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setLoveNoteIdx((i) => (i + 1) % LOVE_NOTES.length)}
              className="px-3 py-1.5 rounded-lg bg-[var(--kirby-pink-soft)] hover:brightness-95 text-[var(--kirby-pink)] text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-[var(--kirby-pink)]" />
              Outra mensagem ({loveNoteIdx + 1}/{LOVE_NOTES.length})
            </button>
            <button
              type="button"
              onClick={() => setLoveCardExpanded((e) => !e)}
              title={loveCardExpanded ? 'Recolher mensagem' : 'Expandir mensagem'}
              className="p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              {loveCardExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {loveCardExpanded && (
          <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] space-y-4">
            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {currentLoveNote.message}
            </p>

            {/* Clean Track Selector Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs font-semibold text-[var(--text-muted)]">
                Foco atual dos seus estudos:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(TRACK_METADATA) as StudyTrack[]).map((trackKey) => {
                  const meta = TRACK_METADATA[trackKey];
                  const active = profile.activeTrack === trackKey;
                  return (
                    <button
                      key={trackKey}
                      type="button"
                      onClick={() => handleTrackChange(trackKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        active
                          ? 'bg-[var(--kirby-pink)] text-white shadow-2xs'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                      }`}
                    >
                      {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. TUTORIAL PASSO A PASSO DE COMO USAR */}
      <section className="dream-card p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Como Usar o StudyMyLove (Guia Rápido)
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Siga estes 4 passos simples na sua rotina diária de estudos:
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenTutorialModal && (
              <button
                type="button"
                onClick={onOpenTutorialModal}
                className="text-xs font-semibold text-[var(--kirby-pink)] hover:underline cursor-pointer"
              >
                Ver guia detalhado
              </button>
            )}
            <button
              type="button"
              onClick={() => setTutorialVisible((v) => !v)}
              className="px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              {tutorialVisible ? 'Ocultar' : 'Mostrar Passos'}
            </button>
          </div>
        </div>

        {tutorialVisible && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)]">
                    01 • Rotina & Timer
                  </span>
                  <MaximTomatoIcon size={30} />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Planeje o seu Dia
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Siga os blocos do <strong>Cronograma 6–8h</strong> e use o timer do topo com pausas <em>Maxim Tomato</em> (15 min) para descansar a vista.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('rotina')}
                className="text-left text-xs font-semibold text-[var(--kirby-pink)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Abrir Cronograma <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)]">
                    02 • Teoria & Notas
                  </span>
                  <KirbyMascot ability="waddledee" size={32} />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Estude no Caderno
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Abra qualquer uma das <strong>28 matérias</strong> para ler a teoria, ver o <strong>Formulário</strong> de equações, usar os simuladores, assistir aulas e anotar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('biblioteca')}
                className="text-left text-xs font-semibold text-[var(--kirby-pink)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Abrir Caderno & Teoria <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)]">
                    03 • 600 Questões / Matéria
                  </span>
                  <KirbyMascot ability="magolor" size={32} />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Vestibular, Concurso & Europa
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Treine nas <strong>{ALL_QUESTIONS.length.toLocaleString('pt-BR')} questões comentadas</strong> (600 por matéria: ITA/IME/FUVEST, Petrobras/Cebraspe e CERN/ESA/EPSO) com <strong>salvamento automático</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('exercicios')}
                className="text-left text-xs font-semibold text-[var(--kirby-pink)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Banco de Questões ({ALL_QUESTIONS.length.toLocaleString('pt-BR')}) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)]">
                    04 • Nível Normal vs. Expert
                  </span>
                  <BossMascot boss="metaknight" size={32} />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Simulado Sem Tempo ou Por Tema
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Faça um <strong>Simulado Diagnóstico sem limite de tempo</strong> ou escolha um tema específico para medir se seu nível é <strong>Engenheira Normal</strong> ou <strong>Expert</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('simulados')}
                className="text-left text-xs font-semibold text-[var(--kirby-pink)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Medir Meu Nível Agora <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. PAINEL DE HOJE — 3 CARTÕES SIMÉTRICOS E BEM POSICIONADOS */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <WarpStarIcon size={18} />
              <span>Seu Diagnóstico & Foco de Hoje</span>
            </h2>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${stats.engineerLevel.badgeCls}`}
            >
              {stats.engineerLevel.label}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-secondary)]">
            <span>
              Matérias lidas: <strong>{stats.readDone}/{stats.total}</strong>
            </span>
            <span>•</span>
            <span>
              Questões acertadas: <strong>{stats.solvedQuestions}/{ALL_QUESTIONS.length}</strong>
            </span>
            <span>•</span>
            <span>
              Domínio médio: <strong>{stats.avgPKnownPct}%</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Priority Subject */}
          {topFocus && (
            <div className="dream-card p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--kirby-pink)]">
                    Matéria Recomendada
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                      {topFocus.mt.code}
                    </span>
                    <KirbyMascot ability={topFocus.mt.copyAbility} size={34} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                  {topFocus.mt.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {topFocus.mt.summary}
                </p>
                { nextPriorities.length > 0 && (
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                    <span>Próximas:</span>
                    {nextPriorities.map((item) => (
                      <button
                        key={item.mt.id}
                        type="button"
                        onClick={() => onNavigate('biblioteca', item.mt.id)}
                        className="font-mono font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] hover:text-[var(--kirby-pink)] border border-[var(--border-subtle)] cursor-pointer"
                      >
                        {item.mt.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => onNavigate('biblioteca', topFocus.mt.id)}
                  className="dream-btn-primary flex-1 py-2 text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Estudar Teoria
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('exercicios', topFocus.mt.id)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                  Questões
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Flashcards Due Today */}
          <div className="dream-card p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--warp-gold)]">
                  Repetição Espaçada (FSRS)
                </span>
                <KirbyMascot ability="doctor" size={34} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                  {dueFlashcardsCount}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  cartões para revisar hoje
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Revisão rápida de 15 minutos pela manhã para manter a retenção das equações e normas acima de 90%.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('auto-revisao')}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                Iniciar Revisão de Cartões
              </button>
            </div>
          </div>

          {/* Card 3: Daily Schedule & Simulados */}
          <div className="dream-card p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sky-info)]">
                  Meta & Ritmo do Dia
                </span>
                <KirbyMascot ability="starride" size={34} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                  {profile.completedRoutineBlocksToday.length}/
                  {DAILY_ROUTINE_TEMPLATE.length}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  blocos concluídos hoje
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Hoje é <strong>Dia {profile.dayParity === 'odd' ? 'Ímpar (Português)' : 'Par (Inglês Técnico)'}</strong> no Bloco Básico. Meta diária configurada em {profile.dailyGoalHours}h.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('rotina')}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                Ver Rotina
              </button>
              <button
                type="button"
                onClick={() => onNavigate('simulados')}
                className="py-2 px-3 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] inline-flex items-center justify-center gap-1 cursor-pointer"
              >
                <Swords className="w-3.5 h-3.5" />
                Simulado
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIRETÓRIO CENTRAL BEM POSICIONADO (ABAS: MATÉRIAS | CRONOGRAMA | NORMAS) */}
      <section className="dream-card overflow-hidden">
        {/* Clean Section Switcher Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5 bg-[var(--bg-elevated)] p-1 rounded-xl border border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={() => setBottomSectionTab('materias')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                bottomSectionTab === 'materias'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-strong)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
              Matérias por Área ({trackMicrotopics.length})
            </button>

            <button
              type="button"
              onClick={() => setBottomSectionTab('cronograma')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                bottomSectionTab === 'cronograma'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-strong)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
              Checklist de Hoje ({profile.completedRoutineBlocksToday.length}/10)
            </button>

            <button
              type="button"
              onClick={() => setBottomSectionTab('normas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                bottomSectionTab === 'normas'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-strong)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
              Normas Técnicas ({normsIndex.length})
            </button>

            <button
              type="button"
              onClick={() => setBottomSectionTab('personagens')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                bottomSectionTab === 'personagens'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-strong)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <WarpStarIcon size={15} />
              Personagens & Copy Abilities
            </button>
          </div>

          {bottomSectionTab === 'materias' && (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-2.5" />
              <input
                type="text"
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                placeholder="Buscar matéria, código ou norma..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--kirby-pink)]"
              />
            </div>
          )}
        </div>

        {/* ABA 1: MATÉRIAS POR ÁREA */}
        {bottomSectionTab === 'materias' && (
          <div>
            {/* Filter Pills */}
            <div className="px-5 py-3 bg-[var(--bg-elevated)]/50 border-b border-[var(--border-subtle)] flex flex-wrap gap-1.5">
              {(
                [
                  ['all', `Todas (${trackMicrotopics.length})`],
                  ['priority', 'Prioritárias (<85%)'],
                  ['mec', 'Mecânica'],
                  ['ele', 'Elétrica'],
                  ['multi', 'Controle & Mat.'],
                  ['basico', 'Português & Inglês'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAreaTab(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    areaTab === key
                      ? 'bg-[var(--kirby-pink)] text-white'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="divide-y divide-[var(--border-subtle)]">
              {PLANETS.map((planet) => {
                const items = filteredDiagnostics.filter(
                  (d) => d.mt.planetId === planet.id
                );
                if (items.length === 0) return null;

                return (
                  <div key={planet.id}>
                    <div className="px-5 py-2.5 bg-[var(--bg-elevated)] flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2.5 font-bold text-[var(--text-primary)]">
                        <KirbyMascot ability={planet.copyAbility} size={28} />
                        <CopyAbilityBadge ability={planet.copyAbility} />
                        <span>{planet.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                        {planet.areaLabel}
                      </span>
                    </div>

                    <div className="divide-y divide-[var(--border-subtle)]">
                      {items.map(({ mt, prog }) => {
                        const eqCount = mt.compendium.reduce(
                          (acc, s) => acc + s.keyEquations.length,
                          0
                        );
                        const qCount = questionCountByMicrotopic.get(mt.id) ?? 0;
                        const pct = Math.round(prog.pKnown * 100);
                        const mtCorrect = prog.responses.filter(
                          (r) => r.correct
                        ).length;
                        const mtAcc =
                          prog.responses.length > 0
                            ? Math.round(
                                (mtCorrect / prog.responses.length) * 100
                              )
                            : 0;
                        const mtLevel = classifyEngineerLevel({
                          attempts: prog.responses.length,
                          accuracyPct: mtAcc,
                          theta: prog.theta,
                        });

                        return (
                          <div
                            key={mt.id}
                            className="p-4 sm:px-5 hover:bg-[var(--bg-elevated)]/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[var(--kirby-pink)]">
                                  {mt.code}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onNavigate('biblioteca', mt.id)}
                                  className="text-left text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--kirby-pink)] transition cursor-pointer"
                                >
                                  {mt.title}
                                </button>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${mtLevel.badgeCls}`}
                                >
                                  {mtLevel.shortBadge}
                                </span>
                                {prog.readingCompleted && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                                    ✓ Lido
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-secondary)]">
                                <span>{mt.compendium.length} seções</span>
                                <span>•</span>
                                <span>{eqCount} equações</span>
                                <span>•</span>
                                <span>{mt.videos.length} aulas</span>
                                {mt.norms.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="font-mono text-[11px] text-[var(--text-primary)]">
                                      {mt.norms.slice(0, 3).join(', ')}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                              <div className="w-24 text-right">
                                <div className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                                  {pct}% domínio
                                </div>
                                <div className="w-full h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden mt-1">
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
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => onNavigate('biblioteca', mt.id)}
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
                                >
                                  Teoria
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onNavigate('exercicios', mt.id)}
                                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] cursor-pointer"
                                >
                                  Questões ({qCount})
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ABA 2: CHECKLIST DO CRONOGRAMA DE HOJE */}
        {bottomSectionTab === 'cronograma' && (
          <div className="divide-y divide-[var(--border-subtle)]">
            {DAILY_ROUTINE_TEMPLATE.map((block) => {
              const done = completedRoutineSet.has(block.id);
              const isBreak =
                block.phaseType === 'break-tomato' ||
                block.phaseType === 'lunch';

              return (
                <div
                  key={block.id}
                  className={`p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                    done ? 'bg-[var(--bg-elevated)]/40 opacity-70' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleRoutineBlock(block)}
                      className="mt-0.5 shrink-0 cursor-pointer"
                      aria-label={`Marcar ${block.title}`}
                    >
                      {done ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-[var(--text-muted)]" />
                      )}
                    </button>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 font-mono text-xs text-[var(--kirby-pink)]">
                        <strong>{block.timeRange}</strong>
                        <span className="text-[var(--text-muted)]">
                          ({block.durationMinutes} min)
                        </span>
                        {isBreak && <MaximTomatoIcon size={14} />}
                      </div>
                      <div
                        className={`text-sm font-bold text-[var(--text-primary)] ${
                          done ? 'line-through text-[var(--text-muted)]' : ''
                        }`}
                      >
                        {block.title}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {block.description}
                      </p>
                    </div>
                  </div>

                  {block.targetActionView !== 'rotina' && (
                    <button
                      type="button"
                      onClick={() => onNavigate(block.targetActionView)}
                      className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
                    >
                      Abrir Módulo →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ABA 3: ÍNDICE DE NORMAS TÉCNICAS DO EDITAL */}
        {bottomSectionTab === 'normas' && (
          <div className="p-5 space-y-4">
            <p className="text-xs text-[var(--text-secondary)]">
              Clique em qualquer norma técnica para abrir imediatamente a matéria correspondente com seus requisitos cobrados em prova:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {normsIndex.map((item) => (
                <button
                  key={`${item.norm}-${item.mtId}`}
                  type="button"
                  onClick={() => onNavigate('biblioteca', item.mtId)}
                  className="text-left p-3.5 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)]/50 hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] transition cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--kirby-pink)]">
                      {item.norm}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                      {item.code}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] truncate mt-1">
                    {item.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ABA 4: PERSONAGENS & COPY ABILITIES OFICIAIS DO KIRBY */}
        {bottomSectionTab === 'personagens' && (
          <div className="p-5 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Copy Abilities Oficiais do Kirby por Domínio de Engenharia
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Renders oficiais da série Kirby (Nintendo / HAL Laboratory) associados a cada área técnica do seu edital:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-3">
                {(Object.keys(COPY_ABILITIES) as CopyAbilityId[]).map((abId) => {
                  const info = COPY_ABILITIES[abId];
                  const matching = diagnostics.filter((d) => d.mt.copyAbility === abId);
                  const avgPct =
                    matching.length > 0
                      ? Math.round(
                          (matching.reduce((acc, m) => acc + m.prog.pKnown, 0) /
                            matching.length) *
                            100
                        )
                      : 0;
                  return (
                    <div
                      key={abId}
                      className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center gap-3.5"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 p-1.5">
                        <KirbyMascot ability={abId} size={52} />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                            {info.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)]">
                            {avgPct}%
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-[var(--kirby-pink)] truncate">
                          {info.kirbyForm}
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)] line-clamp-2">
                          {info.domain}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Companheiros & Chefões Oficiais de Dream Land
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Personagens clássicos que acompanham seus treinos e simulados:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-3">
                <button
                  type="button"
                  onClick={() => onNavigate('biblioteca')}
                  className="p-3.5 rounded-xl bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] flex items-center gap-3 text-left transition cursor-pointer"
                >
                  <KirbyMascot ability="waddledee" size={48} />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      Bandana Waddle Dee
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)]">
                      Guardião do Caderno & Teoria
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('exercicios')}
                  className="p-3.5 rounded-xl bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] flex items-center gap-3 text-left transition cursor-pointer"
                >
                  <KirbyMascot ability="magolor" size={48} />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      Magolor
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)]">
                      Mestre do Banco de Questões
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('simulados')}
                  className="p-3.5 rounded-xl bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] flex items-center gap-3 text-left transition cursor-pointer"
                >
                  <BossMascot boss="dedede" size={48} />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      King Dedede
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)]">
                      Simulado Cesgranrio (Petrobras)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('simulados')}
                  className="p-3.5 rounded-xl bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] flex items-center gap-3 text-left transition cursor-pointer"
                >
                  <BossMascot boss="metaknight" size={48} />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      Meta Knight
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)]">
                      Simulado Cebraspe (Certo/Errado)
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('simulados')}
                  className="p-3.5 rounded-xl bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] flex items-center gap-3 text-left transition cursor-pointer"
                >
                  <BossMascot boss="galactaknight" size={48} />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      Galacta Knight
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)]">
                      Simulado Multibancas & Expert
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
