import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Circle,
  Clock,
  FileCode2,
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
  DAILY_ROUTINE_TEMPLATE,
  PLANETS,
  TRACK_METADATA,
} from '../../data/planetsAndCopyAbilities';
import { diagnoseMicrotopic } from '../../engine/psychometrics';
import type {
  MacroArea,
  RoutineBlock,
  StudyTrack,
  UserStudyProfile,
} from '../../types/study';
import {
  CopyAbilityBadge,
  KirbyMascot,
  MaximTomatoIcon,
  WarpStarIcon,
} from '../KirbyArtwork';
import { MathBlock } from '../MathMarkdown';

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
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [areaTab, setAreaTab] = useState<'all' | 'priority' | MacroArea>('all');
  const [topicFilter, setTopicFilter] = useState('');

  const trackMicrotopics = useMemo(
    () => getMicrotopicsForTrack(profile.activeTrack),
    [profile.activeTrack]
  );

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
    diagnostics.forEach((d) => {
      d.prog.responses.forEach((r) => {
        if (r.correct) solvedQuestionsSet.add(r.questionId);
      });
    });

    return {
      total,
      mastered,
      readDone,
      avgTheta: Number(avgTheta.toFixed(2)),
      avgPKnownPct: Math.round(avgPKnown * 100),
      solvedQuestions: solvedQuestionsSet.size,
    };
  }, [diagnostics]);

  // All technical norms mapped to their microtopic for instant content lookup
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

  const firstEquationOfTopFocus =
    topFocus?.mt.compendium[0]?.keyEquations[0] ?? null;

  return (
    <div className="space-y-6">
      {/* Compact Console Header Bar */}
      <section className="dream-card p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
              <KirbyMascot
                ability={topFocus ? topFocus.mt.copyAbility : 'scholar'}
                size={42}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  StudyMyLove • {profile.studentName}
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                  {profile.university}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Dia {profile.dayParity === 'odd' ? 'Ímpar (Português no Bloco Básico)' : 'Par (Inglês Técnico ASME/API no Bloco Básico)'} • Meta {profile.dailyGoalHours}h/dia
              </p>
            </div>
          </div>

          {/* Track Switcher Tabs (Console Pill Style) */}
          <div className="flex flex-wrap gap-1.5 bg-[var(--bg-elevated)] p-1 rounded-xl border border-[var(--border-subtle)]">
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
                      ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs border border-[var(--border-strong)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {meta.badge}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Clean Status Cells */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={() => onNavigate('biblioteca')}
            className="text-left p-3 rounded-lg bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] border border-[var(--border-subtle)] transition cursor-pointer"
          >
            <div className="text-[11px] text-[var(--text-secondary)] font-medium">
              Teoria & Compêndio
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-lg font-bold font-mono text-[var(--text-primary)]">
                {stats.readDone}/{stats.total}
              </span>
              <span className="text-[11px] font-mono text-[var(--kirby-pink)]">
                matérias lidas →
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('auto-revisao')}
            className="text-left p-3 rounded-lg bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] border border-[var(--border-subtle)] transition cursor-pointer"
          >
            <div className="text-[11px] text-[var(--text-secondary)] font-medium">
              Flashcards para Hoje
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-lg font-bold font-mono text-[var(--text-primary)]">
                {dueFlashcardsCount}
              </span>
              <span className="text-[11px] font-mono text-[var(--warp-gold)] font-semibold">
                revisar agora →
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('exercicios')}
            className="text-left p-3 rounded-lg bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] border border-[var(--border-subtle)] transition cursor-pointer"
          >
            <div className="text-[11px] text-[var(--text-secondary)] font-medium">
              Banco de Questões
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-lg font-bold font-mono text-[var(--text-primary)]">
                {stats.solvedQuestions}/{ALL_QUESTIONS.length}
              </span>
              <span className="text-[11px] font-mono text-[var(--sky-info)]">
                praticar →
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('matriz')}
            className="text-left p-3 rounded-lg bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] border border-[var(--border-subtle)] transition cursor-pointer"
          >
            <div className="text-[11px] text-[var(--text-secondary)] font-medium">
              Domínio do Edital
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-lg font-bold font-mono text-[var(--text-primary)]">
                {stats.avgPKnownPct}%
              </span>
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                ★ {stats.mastered}/{stats.total} (θ̂ {stats.avgTheta})
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Main Two-Column Personal Study Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center Column (8/12): Content Focus & Full Curriculum Directory */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Subject Content Preview (Concrete Content, Not Meta-Blurb!) */}
          {topFocus && (
            <section className="dream-card p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--kirby-pink)]">
                    Matéria Prioritária de Hoje
                  </span>
                  <span className="text-[var(--text-muted)]">•</span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    {topFocus.mt.code}
                  </span>
                  <CopyAbilityBadge ability={topFocus.mt.copyAbility} showLabel />
                </div>
                <span className="text-xs font-mono text-[var(--text-secondary)]">
                  Domínio {(topFocus.prog.pKnown * 100).toFixed(0)}% • Retenção{' '}
                  {topFocus.diag.projectedRetention.toFixed(0)}%
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  {topFocus.mt.title}
                </h2>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {topFocus.mt.summary}
                </p>

                {/* Concrete Syllabus Sections & Norms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Tópicos do Compêndio ({topFocus.mt.compendium.length} seções)
                    </div>
                    <ul className="space-y-1 text-xs text-[var(--text-primary)]">
                      {topFocus.mt.compendium.map((sec, idx) => (
                        <li key={sec.id} className="truncate">
                          <span className="font-mono text-[var(--kirby-pink)] font-bold mr-1.5">
                            {idx + 1}.
                          </span>
                          {sec.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {firstEquationOfTopFocus ? (
                    <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-x-auto">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                        Equação-Chave: {firstEquationOfTopFocus.label}
                      </div>
                      <div className="text-xs">
                        <MathBlock latex={firstEquationOfTopFocus.latex} display={false} />
                      </div>
                      {topFocus.mt.norms.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] flex flex-wrap gap-1">
                          {topFocus.mt.norms.map((n) => (
                            <span
                              key={n}
                              className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                            >
                              {n}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('biblioteca', topFocus.mt.id)}
                    className="dream-btn-primary px-3.5 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Estudar Teoria & Fórmulas
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('exercicios', topFocus.mt.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                    Resolver Questões
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('auto-revisao', topFocus.mt.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Brain className="w-3.5 h-3.5 text-[var(--warp-gold)]" />
                    Flashcards do Tema
                  </button>
                </div>

                {/* Next 3 in queue */}
                <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
                  <span className="text-[var(--text-muted)]">A seguir:</span>
                  {nextPriorities.map((item) => (
                    <button
                      key={item.mt.id}
                      type="button"
                      onClick={() => onNavigate('biblioteca', item.mt.id)}
                      title={item.mt.title}
                      className="font-mono font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] cursor-pointer"
                    >
                      {item.mt.code}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Structured Curriculum Directory (All 28 Subjects with Direct Content Links) */}
          <section className="dream-card overflow-hidden">
            <div className="p-4 border-b border-[var(--border-subtle)] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <WarpStarIcon size={18} />
                    Caderno de Matérias do Edital ({filteredDiagnostics.length})
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Acesso direto à teoria, equações, normas técnicas, questões e flashcards de cada matéria.
                  </p>
                </div>

                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                    placeholder="Filtrar matéria ou norma..."
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--kirby-pink)]"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1">
                {(
                  [
                    ['all', `Todas (${trackMicrotopics.length})`],
                    ['priority', 'Para Revisar (<85%)'],
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
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      areaTab === key
                        ? 'bg-[var(--kirby-pink)] text-white'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grouped Subject List */}
            <div className="divide-y divide-[var(--border-subtle)]">
              {PLANETS.map((planet) => {
                const items = filteredDiagnostics.filter(
                  (d) => d.mt.planetId === planet.id
                );
                if (items.length === 0) return null;

                return (
                  <div key={planet.id}>
                    {/* Area Subheader */}
                    <div className="px-4 py-2 bg-[var(--bg-elevated)] flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 font-bold text-[var(--text-primary)]">
                        <CopyAbilityBadge ability={planet.copyAbility} />
                        <span>{planet.name}</span>
                        <span className="text-[11px] font-normal text-[var(--text-muted)] hidden sm:inline">
                          • {planet.kirbyWorldName}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                        {planet.areaLabel}
                      </span>
                    </div>

                    {/* Subject Rows */}
                    <div className="divide-y divide-[var(--border-subtle)]">
                      {items.map(({ mt, prog }) => {
                        const eqCount = mt.compendium.reduce(
                          (acc, s) => acc + s.keyEquations.length,
                          0
                        );
                        const qCount = ALL_QUESTIONS.filter(
                          (q) => q.microtopicId === mt.id
                        ).length;
                        const pct = Math.round(prog.pKnown * 100);

                        return (
                          <div
                            key={mt.id}
                            className="p-3.5 sm:px-4 hover:bg-[var(--bg-elevated)]/60 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[var(--kirby-pink)]">
                                  {mt.code}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onNavigate('biblioteca', mt.id)}
                                  className="text-left text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--kirby-pink)] transition cursor-pointer"
                                >
                                  {mt.title}
                                </button>
                                {prog.readingCompleted && (
                                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                                    ✓ Lido
                                  </span>
                                )}
                              </div>

                              {/* Concrete Content Metadata */}
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--text-secondary)]">
                                <span>{mt.compendium.length} seções</span>
                                <span>•</span>
                                <span>{eqCount} fórmulas</span>
                                <span>•</span>
                                <span>{mt.videos.length} aulas</span>
                                {mt.norms.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="font-mono text-[10px] text-[var(--text-primary)]">
                                      {mt.norms.slice(0, 3).join(', ')}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Right Actions & Mastery Bar */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                              <div className="w-20 text-right">
                                <div className="text-[11px] font-mono font-semibold text-[var(--text-primary)]">
                                  {pct}%
                                </div>
                                <div className="w-full h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden mt-0.5">
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

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => onNavigate('biblioteca', mt.id)}
                                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[var(--bg-surface)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
                                >
                                  Teoria
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onNavigate('exercicios', mt.id)}
                                  className="px-2 py-1 rounded-md text-xs font-mono font-semibold bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] cursor-pointer"
                                  title="Resolver questões desta matéria"
                                >
                                  Q({qCount})
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
          </section>
        </div>

        {/* Right Column (4/12): Today's Schedule Checklist & Technical Norms Index */}
        <div className="lg:col-span-4 space-y-6">
          {/* Interactive Daily Routine Checklist */}
          <section className="dream-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--kirby-pink)]" />
                <h2 className="text-sm font-bold text-[var(--text-primary)]">
                  Cronograma de Hoje ({profile.completedRoutineBlocksToday.length}/
                  {DAILY_ROUTINE_TEMPLATE.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('rotina')}
                className="text-xs font-semibold text-[var(--kirby-pink)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Abrir Timer <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
              {DAILY_ROUTINE_TEMPLATE.map((block) => {
                const done = completedRoutineSet.has(block.id);
                const isBreak =
                  block.phaseType === 'break-tomato' ||
                  block.phaseType === 'lunch';

                return (
                  <div
                    key={block.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2 transition ${
                      done
                        ? 'bg-[var(--bg-elevated)]/60 border-[var(--border-subtle)] opacity-70'
                        : isBreak
                          ? 'bg-[var(--warp-gold-bg)]/40 border-[var(--border-subtle)]'
                          : 'bg-[var(--bg-surface)] border-[var(--border-subtle)]'
                    }`}
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleRoutineBlock(block)}
                        className="mt-0.5 shrink-0 text-[var(--kirby-pink)] cursor-pointer"
                        aria-label={`Marcar ${block.title}`}
                      >
                        {done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-[var(--text-muted)]" />
                        )}
                      </button>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
                          <span>{block.timeRange}</span>
                          <span>•</span>
                          <span>{block.durationMinutes}m</span>
                          {isBreak && <MaximTomatoIcon size={12} />}
                        </div>
                        <div
                          className={`font-semibold text-[var(--text-primary)] leading-snug ${
                            done ? 'line-through text-[var(--text-muted)]' : ''
                          }`}
                        >
                          {block.title}
                        </div>
                      </div>
                    </div>

                    {block.targetActionView !== 'rotina' && (
                      <button
                        type="button"
                        onClick={() => onNavigate(block.targetActionView)}
                        className="shrink-0 px-2 py-0.5 rounded text-[10px] font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-secondary)] cursor-pointer"
                      >
                        Ir
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Direct Technical Standards (Normas) Quick-Jump */}
          <section className="dream-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-[var(--kirby-pink)]" />
                Normas Técnicas no Edital ({normsIndex.length})
              </h2>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">
              Clique em qualquer norma para abrir diretamente o resumo técnico e os critérios cobrados em prova:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto">
              {normsIndex.map((item) => (
                <button
                  key={`${item.norm}-${item.mtId}`}
                  type="button"
                  onClick={() => onNavigate('biblioteca', item.mtId)}
                  title={`${item.code} — ${item.title}`}
                  className="px-2 py-1 rounded-md text-[11px] font-mono font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition cursor-pointer"
                >
                  {item.norm}
                </button>
              ))}
            </div>
          </section>

          {/* Quick Simulado Callout */}
          <section className="dream-card p-4 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                Simulados Cronometrados
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Treine Cesgranrio (5 opções) ou Cebraspe (Certo/Errado).
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('simulados')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] shrink-0 cursor-pointer"
            >
              Abrir
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
