import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FolderOpen,
  Home,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Pause,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  Swords,
  X,
  Zap,
} from 'lucide-react';
import {
  CopyAbilityBadge,
  KirbyMascot,
  MaximTomatoIcon,
  WarpStarIcon,
} from './components/KirbyArtwork';
import { AutoRevisionView } from './components/views/AutoRevisionView';
import { DashboardView, type AppViewId } from './components/views/DashboardView';
import { ExercisesView } from './components/views/ExercisesView';
import { LibraryView } from './components/views/LibraryView';
import { MatrixView } from './components/views/MatrixView';
import { RoutineView } from './components/views/RoutineView';
import { SimuladosView } from './components/views/SimuladosView';
import {
  ALL_FLASHCARDS,
  ALL_MICROTOPICS,
  ALL_QUESTIONS,
  getMicrotopicsForTrack,
} from './data/curriculum';
import { PLANETS, TRACK_METADATA } from './data/planetsAndCopyAbilities';
import type { PlanetId, StudyTrack, UserStudyProfile } from './types/study';
import { loadUserProfile, saveUserProfile } from './utils/storage';

type KirbyThemeId = 'popstar' | 'dreamland' | 'fountain';

const THEME_STORAGE_KEY = 'kirby_study_theme_v1';

const NAV_ITEMS: Array<{
  id: AppViewId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: 'dashboard',
    label: 'Início & Meu Dia',
    icon: Home,
  },
  {
    id: 'biblioteca',
    label: 'Caderno & Teoria',
    icon: BookOpen,
  },
  {
    id: 'exercicios',
    label: 'Banco de Questões',
    icon: Zap,
  },
  {
    id: 'auto-revisao',
    label: 'Flashcards (FSRS)',
    icon: Brain,
  },
  {
    id: 'rotina',
    label: 'Cronograma 6–8h',
    icon: Clock,
  },
  {
    id: 'simulados',
    label: 'Simulados de Banca',
    icon: Swords,
  },
  {
    id: 'matriz',
    label: 'Edital & Desempenho',
    icon: Activity,
  },
];

function formatTimerClock(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export function App() {
  const [profile, setProfile] = useState<UserStudyProfile>(() =>
    loadUserProfile()
  );
  const [activeView, setActiveView] = useState<AppViewId>('dashboard');
  const [exerciseScope, setExerciseScope] = useState<string>('all');
  const [revisionScope, setRevisionScope] = useState<'due' | 'selected'>('due');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Kirby Console / Browser / PC Theme
  const [theme, setTheme] = useState<KirbyThemeId>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as KirbyThemeId | null;
      if (saved === 'popstar' || saved === 'dreamland' || saved === 'fountain') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'popstar';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Collapsible Planet Groups in Sidebar Subject Tree
  const [expandedPlanets, setExpandedPlanets] = useState<Record<PlanetId, boolean>>({
    'termofluidos': true,
    'solidos-materiais': true,
    'maquinas-equipamentos': false,
    'eletro-circuitos': false,
    'potencia-protecao': false,
    'controle-eletronica-mat': false,
    'basicos-interdisciplinar': false,
  });

  // Persistent Top-Bar Focus / Break Timer
  const [timerSeconds, setTimerSeconds] = useState(50 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'tomato'>('focus');

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  // Quick Search Modal (Ctrl+K)
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen]);

  const handleUpdateProfile = (next: UserStudyProfile) => {
    setProfile(next);
    saveUserProfile(next);
  };

  const handleNavigate = (view: AppViewId, microtopicId?: string) => {
    if (microtopicId) {
      const targetMt = ALL_MICROTOPICS.find((m) => m.id === microtopicId);
      if (targetMt) {
        setExpandedPlanets((prev) => ({
          ...prev,
          [targetMt.planetId]: true,
        }));
      }
      const next = {
        ...profile,
        selectedMicrotopicId: microtopicId,
      };
      setProfile(next);
      saveUserProfile(next);
      if (view === 'exercicios') {
        setExerciseScope(microtopicId);
      } else if (view === 'auto-revisao') {
        setRevisionScope('selected');
      }
    } else {
      if (view === 'exercicios') {
        setExerciseScope('all');
      } else if (view === 'auto-revisao') {
        setRevisionScope('due');
      }
    }
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trackMicrotopics = useMemo(
    () => getMicrotopicsForTrack(profile.activeTrack),
    [profile.activeTrack]
  );

  const trackStats = useMemo(() => {
    const mts = trackMicrotopics;
    const total = mts.length || 1;
    const avgTheta =
      mts.reduce((acc, m) => acc + (profile.microtopics[m.id]?.theta ?? 0), 0) /
      total;
    const avgP =
      mts.reduce(
        (acc, m) => acc + (profile.microtopics[m.id]?.pKnown ?? 0),
        0
      ) / total;
    const masteredCount = mts.filter(
      (m) => (profile.microtopics[m.id]?.pKnown ?? 0) >= 0.9
    ).length;
    const readCount = mts.filter(
      (m) => profile.microtopics[m.id]?.readingCompleted
    ).length;

    const nowMs = Date.now();
    const validIds = new Set(mts.map((m) => m.id));
    const dueCards = ALL_FLASHCARDS.filter((fc) => {
      if (!validIds.has(fc.microtopicId)) return false;
      const p = profile.flashcards[fc.id];
      return !p || new Date(p.nextReviewISO).getTime() <= nowMs;
    }).length;

    return {
      avgTheta: avgTheta.toFixed(2),
      avgPct: Math.round(avgP * 100),
      masteredCount,
      readCount,
      totalCount: mts.length,
      dueCards,
    };
  }, [trackMicrotopics, profile.microtopics, profile.flashcards]);

  const activeMicrotopic = useMemo(
    () =>
      ALL_MICROTOPICS.find((m) => m.id === profile.selectedMicrotopicId) ??
      ALL_MICROTOPICS[0],
    [profile.selectedMicrotopicId]
  );

  // Quick search results across topics, norms, equations, and questions
  const quickSearchResults = useMemo(() => {
    const q = quickQuery.trim().toLowerCase();
    if (!q) {
      return {
        topics: trackMicrotopics.slice(0, 8),
        questions: [] as typeof ALL_QUESTIONS,
      };
    }
    const topics = ALL_MICROTOPICS.filter(
      (m) =>
        m.code.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.norms.some((n) => n.toLowerCase().includes(q)) ||
        m.compendium.some(
          (sec) =>
            sec.title.toLowerCase().includes(q) ||
            sec.keyEquations.some((eq) => eq.label.toLowerCase().includes(q))
        )
    ).slice(0, 10);

    const questions = ALL_QUESTIONS.filter(
      (item) =>
        item.statementMarkdown.toLowerCase().includes(q) ||
        item.board.toLowerCase().includes(q) ||
        item.examContext.toLowerCase().includes(q) ||
        (item.relatedNorms ?? []).some((n) => n.toLowerCase().includes(q))
    ).slice(0, 6);

    return { topics, questions };
  }, [quickQuery, trackMicrotopics]);

  const currentViewLabel =
    NAV_ITEMS.find((n) => n.id === activeView)?.label ?? 'Início';

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <KirbyMascot
            ability={timerMode === 'tomato' ? 'sleep' : 'scholar'}
            size={34}
          />
          <div>
            <div className="font-bold text-sm leading-tight">
              StudyMyLove • {profile.studentName}
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] font-mono">
              ★ {trackStats.masteredCount}/{trackStats.totalCount} •{' '}
              {trackStats.avgPct}% domínio
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar conteúdo"
            className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Abrir menu de navegação"
            className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[55px] bottom-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] overflow-y-auto p-4 space-y-4">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-[var(--kirby-pink-soft)] text-[var(--text-primary)] border border-[var(--border-strong)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[var(--kirby-pink)]" />
                    <span>{item.label}</span>
                  </span>
                  {item.id === 'auto-revisao' && trackStats.dueCards > 0 && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--warp-gold-bg)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                      {trackStats.dueCards}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Matérias do Edital ({trackMicrotopics.length})
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto">
              {trackMicrotopics.map((mt) => (
                <button
                  key={mt.id}
                  type="button"
                  onClick={() => handleNavigate('biblioteca', mt.id)}
                  className="text-left px-2.5 py-1.5 rounded-md text-xs hover:bg-[var(--bg-elevated)] flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span className="truncate">
                    <strong className="font-mono text-[11px] text-[var(--kirby-pink)]">
                      {mt.code}
                    </strong>{' '}
                    {mt.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Left Personal Study Sidebar */}
      {!sidebarCollapsed && (
        <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:sticky lg:top-0 lg:h-screen bg-[var(--bg-sidebar)] border-r border-[var(--border-subtle)] select-none">
          {/* Workspace Brand & Track Switcher */}
          <div className="p-3.5 border-b border-[var(--border-subtle)] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <KirbyMascot
                    ability={
                      timerMode === 'tomato'
                        ? 'sleep'
                        : activeMicrotopic.copyAbility
                    }
                    size={32}
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-[var(--text-primary)] truncate">
                      StudyMyLove
                    </span>
                    <WarpStarIcon size={13} />
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] truncate">
                    {profile.studentName} • Engenharia & Petrobras
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSidebarCollapsed(true)}
                title="Recolher barra lateral (Modo Foco)"
                className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] cursor-pointer"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Active Study Track Select */}
            <div>
              <label
                htmlFor="sidebar-track-select"
                className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1"
              >
                Edital / Foco Ativo
              </label>
              <select
                id="sidebar-track-select"
                value={profile.activeTrack}
                onChange={(e) =>
                  handleUpdateProfile({
                    ...profile,
                    activeTrack: e.target.value as StudyTrack,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--kirby-pink)] cursor-pointer"
              >
                {(Object.keys(TRACK_METADATA) as StudyTrack[]).map((tKey) => (
                  <option key={tKey} value={tKey}>
                    {TRACK_METADATA[tKey].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="p-2.5 space-y-0.5 border-b border-[var(--border-subtle)]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    active
                      ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)] shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]/60 hover:text-[var(--text-primary)] border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active
                          ? 'text-[var(--kirby-pink)]'
                          : 'text-[var(--text-muted)]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.id === 'auto-revisao' && trackStats.dueCards > 0 && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)]">
                      {trackStats.dueCards}
                    </span>
                  )}
                  {item.id === 'exercicios' && (
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {ALL_QUESTIONS.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Direct Subject Tree (Notion / Obsidian / RemNote style) */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                <FolderOpen className="w-3 h-3" />
                Matérias ({trackMicrotopics.length})
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                {trackStats.readCount}/{trackStats.totalCount} lidas
              </span>
            </div>

            <div className="space-y-1">
              {PLANETS.map((planet) => {
                const topics = trackMicrotopics.filter(
                  (m) => m.planetId === planet.id
                );
                if (topics.length === 0) return null;
                const isOpen = expandedPlanets[planet.id] ?? false;

                return (
                  <div key={planet.id} className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedPlanets((prev) => ({
                          ...prev,
                          [planet.id]: !isOpen,
                        }))
                      }
                      className="w-full flex items-center justify-between px-2 py-1 rounded-md text-left text-[11px] font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]/50 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        {isOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)]" />
                        )}
                        <span className="truncate">{planet.name}</span>
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {topics.length}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pl-3.5 space-y-0.5 border-l border-[var(--border-subtle)] ml-2.5">
                        {topics.map((mt) => {
                          const prog = profile.microtopics[mt.id];
                          const pKnown = prog?.pKnown ?? 0;
                          const isSelected =
                            profile.selectedMicrotopicId === mt.id &&
                            activeView === 'biblioteca';
                          const statusColor =
                            pKnown >= 0.9
                              ? 'bg-emerald-500'
                              : pKnown >= 0.75
                                ? 'bg-sky-500'
                                : 'bg-rose-500';

                          return (
                            <button
                              key={mt.id}
                              type="button"
                              onClick={() => handleNavigate('biblioteca', mt.id)}
                              title={`${mt.code} — ${mt.title}`}
                              className={`w-full flex items-center justify-between gap-1.5 px-2 py-1 rounded-md text-left text-[11px] transition cursor-pointer ${
                                isSelected
                                  ? 'bg-[var(--kirby-pink-soft)] text-[var(--text-primary)] font-semibold'
                                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]/60 hover:text-[var(--text-primary)]'
                              }`}
                            >
                              <span className="truncate flex items-center gap-1.5">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusColor}`}
                                />
                                <span className="font-mono text-[10px] font-semibold text-[var(--text-muted)]">
                                  {mt.code}
                                </span>
                                <span className="truncate">{mt.title}</span>
                              </span>
                              {prog?.readingCompleted && (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer: Kirby Theme Switcher & Compact Status */}
          <div className="p-3 border-t border-[var(--border-subtle)] space-y-2.5 bg-[var(--bg-sidebar)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Tema Kirby
              </span>
              <div className="inline-flex rounded-lg p-0.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                {(
                  [
                    { id: 'popstar', label: 'Creme', icon: Sun },
                    { id: 'dreamland', label: 'Pastel', icon: Sparkles },
                    { id: 'fountain', label: 'Noite', icon: Moon },
                  ] as const
                ).map((t) => {
                  const active = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition cursor-pointer ${
                        active
                          ? 'bg-[var(--kirby-pink)] text-white'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)] pt-1 border-t border-[var(--border-subtle)]">
              <span>θ̂ = {trackStats.avgTheta}</span>
              <span>•</span>
              <span>Domínio {trackStats.avgPct}%</span>
              <span>•</span>
              <span>★ {trackStats.masteredCount}/28</span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Console / Study Status Bar (Desktop & Tablet) */}
        <div className="sticky top-0 z-30 bg-[var(--bg-surface)]/95 backdrop-blur-xs border-b border-[var(--border-subtle)] px-4 lg:px-6 h-12 flex items-center justify-between gap-3">
          {/* Left: Sidebar Toggle + Breadcrumb */}
          <div className="flex items-center gap-2.5 min-w-0">
            {sidebarCollapsed && (
              <button
                type="button"
                onClick={() => setSidebarCollapsed(false)}
                title="Mostrar barra lateral"
                className="hidden lg:inline-flex p-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-1.5 text-xs min-w-0">
              <span className="font-semibold text-[var(--text-secondary)] shrink-0">
                {currentViewLabel}
              </span>
              <span className="text-[var(--text-muted)]">/</span>
              <button
                type="button"
                onClick={() => handleNavigate('biblioteca', activeMicrotopic.id)}
                className="font-mono font-bold text-[var(--kirby-pink)] hover:underline shrink-0 cursor-pointer"
              >
                {activeMicrotopic.code}
              </button>
              <span className="text-[var(--text-primary)] font-medium truncate hidden sm:inline">
                {activeMicrotopic.title}
              </span>
              <span className="hidden xl:inline-flex ml-1">
                <CopyAbilityBadge ability={activeMicrotopic.copyAbility} size="sm" />
              </span>
            </div>
          </div>

          {/* Center: Quick Content Search Trigger (Ctrl+K) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center justify-between gap-4 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] w-64 lg:w-80 transition cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Buscar matéria, norma, fórmula...</span>
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
              Ctrl K
            </kbd>
          </button>

          {/* Right: Console Timer & Vitality Bar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Persistent Mini Focus / Maxim Tomato Timer */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs">
              {timerMode === 'tomato' ? (
                <MaximTomatoIcon size={15} />
              ) : (
                <Clock className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
              )}
              <span className="font-mono font-bold text-[var(--text-primary)]">
                {formatTimerClock(timerSeconds)}
              </span>
              <button
                type="button"
                onClick={() => setTimerRunning((r) => !r)}
                title={timerRunning ? 'Pausar timer' : 'Iniciar timer de estudo'}
                className="p-0.5 rounded hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] cursor-pointer"
              >
                {timerRunning ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(timerMode === 'tomato' ? 15 * 60 : 50 * 60);
                }}
                title="Reiniciar timer"
                className="p-0.5 rounded hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const nextMode = timerMode === 'focus' ? 'tomato' : 'focus';
                  setTimerMode(nextMode);
                  setTimerRunning(false);
                  setTimerSeconds(nextMode === 'tomato' ? 15 * 60 : 50 * 60);
                }}
                title="Alternar Foco (50m) / Pausa Maxim Tomato (15m)"
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer hidden sm:inline"
              >
                {timerMode === 'focus' ? 'Pausa 15m' : 'Foco 50m'}
              </button>
            </div>

            {/* Daily Stamina / Hours Indicator */}
            <button
              type="button"
              onClick={() => handleNavigate('rotina')}
              title="Ver Cronograma Diário"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono cursor-pointer"
            >
              <WarpStarIcon size={14} />
              <span className="font-semibold text-[var(--text-primary)]">
                {(profile.totalMinutesStudied / 60).toFixed(1)}h
              </span>
              <span className="text-[var(--text-muted)]">
                / {profile.dailyGoalHours}h
              </span>
            </button>
          </div>
        </div>

        {/* Active View Content */}
        <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
          {activeView === 'dashboard' && (
            <DashboardView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}
          {activeView === 'rotina' && (
            <RoutineView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}
          {activeView === 'biblioteca' && (
            <LibraryView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}
          {activeView === 'exercicios' && (
            <ExercisesView
              key={exerciseScope}
              profile={profile}
              initialMicrotopicFilter={exerciseScope}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}
          {activeView === 'auto-revisao' && (
            <AutoRevisionView
              key={revisionScope}
              profile={profile}
              initialFilterMode={revisionScope}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}
          {activeView === 'matriz' && (
            <MatrixView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}
          {activeView === 'simulados' && (
            <SimuladosView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </div>

      {/* Global Quick Search Modal (Ctrl+K) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-16 p-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="dream-card max-w-2xl w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 border-b border-[var(--border-subtle)] flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[var(--kirby-pink)] shrink-0" />
              <input
                type="text"
                autoFocus
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Buscar matéria (ex: Mohr, Rankine, Fortescue), norma (NR-13, API 610, NBR 5410) ou questão..."
                className="w-full text-sm bg-transparent text-[var(--text-primary)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2 mb-1.5">
                  Matérias & Compêndio ({quickSearchResults.topics.length})
                </div>
                {quickSearchResults.topics.length === 0 ? (
                  <div className="text-xs text-[var(--text-muted)] px-2 py-2">
                    Nenhuma matéria encontrada para &quot;{quickQuery}&quot;.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {quickSearchResults.topics.map((mt) => (
                      <div
                        key={mt.id}
                        className="p-2.5 rounded-lg hover:bg-[var(--bg-elevated)] flex items-center justify-between gap-3 transition"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            handleNavigate('biblioteca', mt.id);
                            setSearchOpen(false);
                          }}
                          className="text-left flex-1 min-w-0 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-[var(--kirby-pink)]">
                              {mt.code}
                            </span>
                            <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                              {mt.title}
                            </span>
                          </div>
                          <div className="text-[11px] text-[var(--text-secondary)] truncate mt-0.5">
                            {mt.norms.length > 0
                              ? `Normas: ${mt.norms.join(', ')} • `
                              : ''}
                            {mt.summary}
                          </div>
                        </button>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              handleNavigate('biblioteca', mt.id);
                              setSearchOpen(false);
                            }}
                            className="px-2 py-1 rounded text-[11px] font-semibold bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--kirby-pink)] cursor-pointer"
                          >
                            Teoria
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleNavigate('exercicios', mt.id);
                              setSearchOpen(false);
                            }}
                            className="px-2 py-1 rounded text-[11px] font-semibold bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--kirby-pink)] cursor-pointer"
                          >
                            Questões
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {quickSearchResults.questions.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2 mb-1.5">
                    Questões de Prova Encontradas ({quickSearchResults.questions.length})
                  </div>
                  <div className="space-y-1">
                    {quickSearchResults.questions.map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          handleNavigate('exercicios', q.microtopicId);
                          setSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-[var(--bg-elevated)] transition cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-secondary)]">
                          <span className="font-bold text-[var(--kirby-pink)]">
                            {q.board}
                          </span>
                          <span>•</span>
                          <span>{q.examContext}</span>
                        </div>
                        <div className="text-xs text-[var(--text-primary)] line-clamp-1 mt-0.5">
                          {q.statementMarkdown}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
