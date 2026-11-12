import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BookOpen,
  Brain,
  Clock,
  Heart,
  HelpCircle,
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
import { TRACK_METADATA } from './data/planetsAndCopyAbilities';
import type { StudyTrack, UserStudyProfile } from './types/study';
import { loadUserProfile, saveUserProfile } from './utils/storage';

type KirbyThemeId = 'popstar' | 'dreamland' | 'fountain';

const THEME_STORAGE_KEY = 'kirby_study_theme_v1';

const NAV_GROUPS: Array<{
  groupLabel: string;
  items: Array<{
    id: AppViewId;
    label: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}> = [
  {
    groupLabel: 'Meu Espaço',
    items: [
      {
        id: 'dashboard',
        label: 'Início & Guia',
        subtitle: 'Dedicatória, Tutorial & Dia',
        icon: Home,
      },
      {
        id: 'rotina',
        label: 'Cronograma 6–8h',
        subtitle: 'Rotina & Pausas',
        icon: Clock,
      },
    ],
  },
  {
    groupLabel: 'Estudo & Prática',
    items: [
      {
        id: 'biblioteca',
        label: 'Caderno & Teoria',
        subtitle: '28 Matérias, Fórmulas & Aulas',
        icon: BookOpen,
      },
      {
        id: 'exercicios',
        label: 'Banco de Questões',
        subtitle: '56 Questões Resolvidas',
        icon: Zap,
      },
      {
        id: 'auto-revisao',
        label: 'Flashcards FSRS',
        subtitle: 'Revisão Espaçada Ativa',
        icon: Brain,
      },
      {
        id: 'simulados',
        label: 'Simulados de Banca',
        subtitle: 'Cesgranrio & Cebraspe',
        icon: Swords,
      },
      {
        id: 'matriz',
        label: 'Edital & Progresso',
        subtitle: 'Matriz & Nivelamento',
        icon: Activity,
      },
    ],
  },
];

const FLAT_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

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
  const [tutorialModalOpen, setTutorialModalOpen] = useState(false);

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
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setTutorialModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleUpdateProfile = (next: UserStudyProfile) => {
    setProfile(next);
    saveUserProfile(next);
  };

  const handleNavigate = (view: AppViewId, microtopicId?: string) => {
    if (microtopicId) {
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
    FLAT_NAV_ITEMS.find((n) => n.id === activeView)?.label ?? 'Início & Guia';

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <KirbyMascot
            ability={timerMode === 'tomato' ? 'sleep' : 'scholar'}
            size={36}
          />
          <div>
            <div className="font-bold text-sm leading-tight flex items-center gap-1">
              <span>StudyMyLove</span>
              <Heart className="w-3.5 h-3.5 text-[var(--kirby-pink)] fill-[var(--kirby-pink)]" />
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">
              Para a {profile.studentName} • {trackStats.avgPct}% domínio
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setTutorialModalOpen(true)}
            aria-label="Como usar"
            className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[var(--kirby-pink)]" />
          </button>
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
        <div className="lg:hidden fixed inset-x-0 top-[61px] bottom-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] overflow-y-auto p-4 space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.groupLabel} className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2">
                {group.groupLabel}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                      active
                        ? 'bg-[var(--kirby-pink-soft)] text-[var(--text-primary)] font-semibold border border-[var(--border-strong)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[var(--kirby-pink)] shrink-0" />
                      <span>
                        <span className="block text-xs font-bold text-[var(--text-primary)]">
                          {item.label}
                        </span>
                        <span className="block text-[11px] text-[var(--text-secondary)]">
                          {item.subtitle}
                        </span>
                      </span>
                    </span>
                    {item.id === 'auto-revisao' && trackStats.dueCards > 0 && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--warp-gold-bg)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                        {trackStats.dueCards}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Desktop Left Sidebar — Clean, Breathable, Well-Positioned */}
      {!sidebarCollapsed && (
        <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:sticky lg:top-0 lg:h-screen bg-[var(--bg-sidebar)] border-r border-[var(--border-subtle)] justify-between select-none">
          <div className="p-4 space-y-5 overflow-y-auto">
            {/* Brand Card */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleNavigate('dashboard')}
                className="flex items-center gap-3 min-w-0 text-left cursor-pointer group"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center shadow-2xs group-hover:border-[var(--kirby-pink)] transition">
                  <KirbyMascot
                    ability={
                      timerMode === 'tomato'
                        ? 'sleep'
                        : activeMicrotopic.copyAbility
                    }
                    size={34}
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[var(--text-primary)] truncate">
                      StudyMyLove
                    </span>
                    <Heart className="w-3.5 h-3.5 text-[var(--kirby-pink)] fill-[var(--kirby-pink)] shrink-0" />
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] truncate">
                    Para a {profile.studentName} • Engenharia
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSidebarCollapsed(true)}
                title="Recolher menu lateral"
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] cursor-pointer"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Study Track Selector */}
            <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
              <label
                htmlFor="sidebar-track-select"
                className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]"
              >
                Trilha de Estudo Ativa
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
                className="w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--kirby-pink)] cursor-pointer"
              >
                {(Object.keys(TRACK_METADATA) as StudyTrack[]).map((tKey) => (
                  <option key={tKey} value={tKey}>
                    {TRACK_METADATA[tKey].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clean Grouped Navigation */}
            <nav className="space-y-5" aria-label="Menu Principal">
              {NAV_GROUPS.map((group) => (
                <div key={group.groupLabel} className="space-y-1">
                  <div className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {group.groupLabel}
                  </div>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigate(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                          active
                            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border border-[var(--border-strong)] shadow-2xs'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]/60 hover:text-[var(--text-primary)] border border-transparent'
                        }`}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              active
                                ? 'bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)]'
                                : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold text-[var(--text-primary)] truncate">
                              {item.label}
                            </span>
                            <span className="block text-[10px] text-[var(--text-muted)] truncate">
                              {item.subtitle}
                            </span>
                          </span>
                        </span>
                        {item.id === 'auto-revisao' && trackStats.dueCards > 0 && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)] shrink-0">
                            {trackStats.dueCards}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer: Help Guide, Theme Switcher & Summary */}
          <div className="p-4 border-t border-[var(--border-subtle)] space-y-3 bg-[var(--bg-sidebar)]">
            <button
              type="button"
              onClick={() => setTutorialModalOpen(true)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] flex items-center justify-between transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[var(--kirby-pink)]" />
                <span>Como Usar (Tutorial)</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">Guia</span>
            </button>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
                Tema Visual
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
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition cursor-pointer ${
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

            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <span className="flex items-center gap-1">
                <WarpStarIcon size={13} />
                {trackStats.readCount}/{trackStats.totalCount} lidas
              </span>
              <span>•</span>
              <span>Domínio {trackStats.avgPct}%</span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Clean, Balanced Top Bar */}
        <header className="sticky top-0 z-30 bg-[var(--bg-surface)]/95 backdrop-blur-xs border-b border-[var(--border-subtle)] px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Left: Sidebar Toggle + Clean Location Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            {sidebarCollapsed && (
              <button
                type="button"
                onClick={() => setSidebarCollapsed(false)}
                title="Mostrar menu lateral"
                className="hidden lg:inline-flex p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              <span className="font-bold text-[var(--text-primary)] shrink-0">
                {currentViewLabel}
              </span>
              <span className="text-[var(--text-muted)] hidden sm:inline">•</span>
              <button
                type="button"
                onClick={() => handleNavigate('biblioteca', activeMicrotopic.id)}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] border border-[var(--border-subtle)] text-xs transition cursor-pointer max-w-xs md:max-w-md"
                title="Ir para a matéria selecionada"
              >
                <span className="font-mono font-bold text-[var(--kirby-pink)] shrink-0">
                  {activeMicrotopic.code}
                </span>
                <span className="text-[var(--text-secondary)] truncate">
                  {activeMicrotopic.title}
                </span>
              </button>
              <span className="hidden xl:inline-flex">
                <CopyAbilityBadge ability={activeMicrotopic.copyAbility} size="sm" />
              </span>
            </div>
          </div>

          {/* Right: Quick Search + Persistent Timer + Tutorial Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center justify-between gap-4 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] w-56 lg:w-64 transition cursor-pointer"
            >
              <span className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 shrink-0 text-[var(--kirby-pink)]" />
                <span className="truncate">Buscar matéria ou norma...</span>
              </span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                Ctrl K
              </kbd>
            </button>

            {/* Persistent Focus / Break Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs">
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
                title={timerRunning ? 'Pausar timer' : 'Iniciar timer'}
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
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer hidden sm:inline"
              >
                {timerMode === 'focus' ? 'Pausa 15m' : 'Foco 50m'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setTutorialModalOpen(true)}
              title="Abrir tutorial de como usar"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--kirby-pink-soft)] hover:brightness-95 text-[var(--kirby-pink)] text-xs font-semibold cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Como Usar</span>
            </button>
          </div>
        </header>

        {/* Centered, Breathable Active Workspace */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl mx-auto w-full">
          {activeView === 'dashboard' && (
            <DashboardView
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
              onOpenTutorialModal={() => setTutorialModalOpen(true)}
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
        </main>
      </div>

      {/* Global Tutorial Modal ("Como Usar o StudyMyLove") */}
      {tutorialModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setTutorialModalOpen(false)}
        >
          <div
            className="dream-card max-w-3xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[var(--kirby-pink-soft)] flex items-center justify-center shrink-0">
                  <KirbyMascot ability="scholar" size={38} />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--kirby-pink)]">
                    Guia Passo a Passo
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                    Como Usar o StudyMyLove no seu Dia a Dia
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTutorialModalOpen(false)}
                className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink)] text-white">
                    Passo 1
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Organização Diária
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Escolha sua Trilha e siga o Cronograma
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  No menu lateral esquerdo, escolha se quer focar no <strong>Modo Integrado (Mecânica + Elétrica)</strong>, só <strong>Mecânica</strong>, só <strong>Elétrica</strong> ou <strong>Concursos Gerais</strong>. Em <strong>Cronograma 6–8h</strong>, marque os blocos concluídos e use o botão <em>Pausa 15m (Maxim Tomato)</em> no topo para descansar a vista.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTutorialModalOpen(false);
                    handleNavigate('rotina');
                  }}
                  className="text-xs font-semibold text-[var(--kirby-pink)] hover:underline cursor-pointer pt-1 inline-block"
                >
                  Abrir Cronograma 6–8h →
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink)] text-white">
                    Passo 2
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Estudo da Matéria
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Estude no Caderno, Formulário e Simuladores
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Em <strong>Caderno & Teoria</strong>, cada uma das 28 matérias é dividida em abas limpas: <strong>Teoria Completa</strong>, <strong>Formulário</strong> (todas as equações reunidas), <strong>Simulador Interativo</strong> (11 laboratórios gráficos), <strong>Videoaulas</strong> (player sem distrações) e <strong>Minhas Anotações</strong> (salvas automaticamente).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTutorialModalOpen(false);
                    handleNavigate('biblioteca');
                  }}
                  className="text-xs font-semibold text-[var(--kirby-pink)] hover:underline cursor-pointer pt-1 inline-block"
                >
                  Abrir Caderno & Teoria →
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink)] text-white">
                    Passo 3
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Fixação & Cálculos
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Resolva as 140 Questões (Brasil & Europa)
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Em <strong>Banco de Questões</strong>, filtre por matéria ou banca (Cesgranrio, Cebraspe, FGV, Marinha e processos seletivos europeus como <strong>CERN, ESA, EPSO, Equinor/Shell e CEng</strong>). Use o botão <strong>Rascunho de Cálculo</strong> para anotar suas contas e marque o motivo do erro quando errar.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTutorialModalOpen(false);
                    handleNavigate('exercicios');
                  }}
                  className="text-xs font-semibold text-[var(--kirby-pink)] hover:underline cursor-pointer pt-1 inline-block"
                >
                  Ir para o Banco de Questões →
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--kirby-pink)] text-white">
                    Passo 4
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Diagnóstico de Nível
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Simulado Sem Tempo, Simulado por Tema e Flashcards
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Como tudo começa <strong>100% zerado</strong>, vá em <strong>Simulados & Provas</strong> para fazer um <strong>Diagnóstico Sem Limite de Tempo</strong> (28, 56 ou 140 questões) ou um <strong>Simulado por Tema</strong> para saber se seu nível atual naquela área é <strong>Engenheira Normal (Plena)</strong>, <strong>Sênior</strong> ou <strong>Expert</strong>!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTutorialModalOpen(false);
                    handleNavigate('simulados');
                  }}
                  className="text-xs font-semibold text-[var(--kirby-pink)] hover:underline cursor-pointer pt-1 inline-block"
                >
                  Abrir Simulados & Diagnóstico de Nível →
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
              <span>
                Dica: Todos os seus dados e anotações ficam salvos automaticamente no seu navegador (e você pode exportar backup JSON na aba Edital & Progresso).
              </span>
              <button
                type="button"
                onClick={() => setTutorialModalOpen(false)}
                className="dream-btn-primary px-4 py-2 text-xs shrink-0 cursor-pointer"
              >
                Entendi, vamos estudar!
              </button>
            </div>
          </div>
        </div>
      )}

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
