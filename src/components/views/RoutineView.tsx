import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Clock,
  Coffee,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Sun,
} from 'lucide-react';
import { DAILY_ROUTINE_TEMPLATE } from '../../data/planetsAndCopyAbilities';
import type { RoutineBlock, UserStudyProfile } from '../../types/study';
import { KirbyMascot, MaximTomatoIcon } from '../KirbyArtwork';
import type { AppViewId } from './DashboardView';

interface RoutineViewProps {
  profile: UserStudyProfile;
  onUpdateProfile: (next: UserStudyProfile) => void;
  onNavigate: (view: AppViewId, microtopicId?: string) => void;
}

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const RoutineView: React.FC<RoutineViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const initialActive = useMemo(() => {
    const firstPending = DAILY_ROUTINE_TEMPLATE.find(
      (b) => !profile.completedRoutineBlocksToday.includes(b.id)
    );
    return firstPending ?? DAILY_ROUTINE_TEMPLATE[0];
  }, [profile.completedRoutineBlocksToday]);

  const [selectedBlockId, setSelectedBlockId] = useState<string>(initialActive.id);
  const activeBlock: RoutineBlock =
    DAILY_ROUTINE_TEMPLATE.find((b) => b.id === selectedBlockId) ??
    DAILY_ROUTINE_TEMPLATE[0];

  const [secondsLeft, setSecondsLeft] = useState<number>(
    activeBlock.durationMinutes * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const [maximRestActive, setMaximRestActive] = useState(false);

  useEffect(() => {
    setIsRunning(false);
    setSecondsLeft(activeBlock.durationMinutes * 60);
    setMaximRestActive(
      activeBlock.phaseType === 'break-tomato' ||
        activeBlock.phaseType === 'lunch'
    );
  }, [activeBlock.id, activeBlock.durationMinutes, activeBlock.phaseType]);

  useEffect(() => {
    if (!isRunning) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [isRunning]);

  const completedSet = useMemo(
    () => new Set(profile.completedRoutineBlocksToday),
    [profile.completedRoutineBlocksToday]
  );

  const studyBlocksTotalMinutes = DAILY_ROUTINE_TEMPLATE.filter(
    (b) => b.phaseType !== 'break-tomato' && b.phaseType !== 'lunch'
  ).reduce((acc, b) => acc + b.durationMinutes, 0);

  const completedStudyMinutes = DAILY_ROUTINE_TEMPLATE.filter(
    (b) =>
      b.phaseType !== 'break-tomato' &&
      b.phaseType !== 'lunch' &&
      completedSet.has(b.id)
  ).reduce((acc, b) => acc + b.durationMinutes, 0);

  const toggleBlockDone = (block: RoutineBlock) => {
    const exists = completedSet.has(block.id);
    const nextCompleted = exists
      ? profile.completedRoutineBlocksToday.filter((id) => id !== block.id)
      : [...profile.completedRoutineBlocksToday, block.id];

    const deltaMin =
      block.phaseType === 'break-tomato' || block.phaseType === 'lunch'
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

  const handleToggleDayParity = () => {
    onUpdateProfile({
      ...profile,
      dayParity: profile.dayParity === 'odd' ? 'even' : 'odd',
    });
  };

  const handleSetDailyGoal = (hrs: number) => {
    onUpdateProfile({
      ...profile,
      dailyGoalHours: hrs,
    });
  };

  const handleOpenBlockAction = (block: RoutineBlock) => {
    if (block.id === 'block-4-basics') {
      const targetMt =
        profile.dayParity === 'odd' ? 'b-pt-cesgranrio' : 'b-en-tech';
      onNavigate('biblioteca', targetMt);
      return;
    }
    onNavigate(block.targetActionView);
  };

  const triggerManualMaximTomato = () => {
    setIsRunning(false);
    setMaximRestActive(true);
    setSecondsLeft(15 * 60);
  };

  return (
    <div className="space-y-5">
      {/* Top Planner Bar */}
      <section className="dream-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">
              Cronograma Diário de Estudos (6h a 8h)
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Divisão em blocos de estudo focado e intervalos de recuperação visual.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleToggleDayParity}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              {profile.dayParity === 'odd' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[var(--warp-gold)]" />
                  Dia Ímpar: Português (Cesgranrio/FGV)
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[var(--sky-info)]" />
                  Dia Par: Inglês Técnico (ASME/API)
                </>
              )}
            </button>

            <div className="inline-flex rounded-lg p-0.5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              {[6, 7, 8].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => handleSetDailyGoal(h)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                    profile.dailyGoalHours === h
                      ? 'bg-[var(--kirby-pink)] text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {h}h/dia
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Progress Bar */}
        <div className="pt-3 border-t border-[var(--border-subtle)]">
          <div className="flex justify-between items-center text-xs text-[var(--text-secondary)] mb-1.5">
            <span>
              Horas líquidas concluídas hoje:{' '}
              <strong className="font-mono text-[var(--text-primary)]">
                {(completedStudyMinutes / 60).toFixed(1)}h /{' '}
                {(studyBlocksTotalMinutes / 60).toFixed(1)}h
              </strong>{' '}
              ({completedSet.size}/{DAILY_ROUTINE_TEMPLATE.length} blocos)
            </span>
            <span className="font-mono">{profile.routineDateISO}</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--kirby-pink)] rounded-full transition-all"
              style={{
                width: `${Math.min(
                  100,
                  Math.round(
                    (completedStudyMinutes / Math.max(1, studyBlocksTotalMinutes)) * 100
                  )
                )}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Active Block Timer Card */}
      <section className="dream-card p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center">
            {maximRestActive ? (
              <KirbyMascot ability="sleep" size={40} />
            ) : (
              <Clock className="w-6 h-6 text-[var(--kirby-pink)]" />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="font-bold text-[var(--kirby-pink)]">
                {activeBlock.timeRange}
              </span>
              <span>•</span>
              <span className="text-[var(--text-secondary)]">
                {maximRestActive ? 'Intervalo Maxim Tomato' : activeBlock.subtitle}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
              {maximRestActive &&
              activeBlock.phaseType !== 'break-tomato' &&
              activeBlock.phaseType !== 'lunch'
                ? 'Pausa de Descanso Visual (15 min)'
                : activeBlock.title}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] max-w-xl">
              {activeBlock.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 bg-[var(--bg-elevated)] p-3.5 rounded-xl border border-[var(--border-subtle)]">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--text-primary)] px-2">
            {formatClock(secondsLeft)}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsRunning((r) => !r)}
              className="dream-btn-primary px-3.5 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pausar
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Iniciar
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(
                  maximRestActive ? 15 * 60 : activeBlock.durationMinutes * 60
                );
              }}
              className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              type="button"
              onClick={triggerManualMaximTomato}
              className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-1 cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5 text-[var(--maxim-red)]" /> Pausa 15m
            </button>
          </div>
        </div>
      </section>

      {/* Structured Schedule Table / List */}
      <section className="dream-card divide-y divide-[var(--border-subtle)] overflow-hidden">
        {DAILY_ROUTINE_TEMPLATE.map((block) => {
          const isDone = completedSet.has(block.id);
          const isSelected = activeBlock.id === block.id;
          const isBreak =
            block.phaseType === 'break-tomato' || block.phaseType === 'lunch';

          const dynamicTitle =
            block.id === 'block-4-basics'
              ? profile.dayParity === 'odd'
                ? 'Bloco Básico Eliminatório — Língua Portuguesa (Cesgranrio/FGV)'
                : 'Bloco Básico Eliminatório — Inglês Técnico (ASME/API/IEEE)'
              : block.title;

          return (
            <div
              key={block.id}
              className={`p-4 transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-[var(--kirby-pink-soft)]/40'
                  : isDone
                    ? 'bg-[var(--bg-elevated)]/40 opacity-75'
                    : 'hover:bg-[var(--bg-elevated)]/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleBlockDone(block)}
                  aria-label={`Marcar ${block.title}`}
                  className="mt-0.5 shrink-0 cursor-pointer"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-[var(--text-muted)]" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="font-bold text-[var(--kirby-pink)]">
                      {block.timeRange}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                      {block.durationMinutes} min
                    </span>
                    {isBreak && <MaximTomatoIcon size={14} />}
                    <span className="text-[var(--text-muted)] font-sans">
                      {block.subtitle}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold ${
                      isDone
                        ? 'line-through text-[var(--text-muted)]'
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {dynamicTitle}
                  </h3>

                  <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)] pt-0.5">
                    {block.checklist.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[var(--kirby-pink)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-8 md:pl-0">
                <button
                  type="button"
                  onClick={() => setSelectedBlockId(block.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--kirby-pink)] text-white border-[var(--kirby-pink)]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                  }`}
                >
                  {isSelected ? 'No Timer' : 'Carregar Timer'}
                </button>

                {block.targetActionView !== 'rotina' && (
                  <button
                    type="button"
                    onClick={() => handleOpenBlockAction(block)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center gap-1 cursor-pointer"
                  >
                    Abrir <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
