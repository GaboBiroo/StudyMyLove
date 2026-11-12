import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookMarked,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  FlaskConical,
  PlayCircle,
  Search,
  Sigma,
  Zap,
} from 'lucide-react';
import {
  ALL_FLASHCARDS,
  ALL_MICROTOPICS,
  ALL_QUESTIONS,
  getMicrotopicsForTrack,
} from '../../data/curriculum';
import type { MacroArea, UserStudyProfile } from '../../types/study';
import { InteractiveEngineeringDiagram } from '../InteractiveDiagrams';
import { CopyAbilityBadge } from '../KirbyArtwork';
import { MathBlock, MathMarkdown } from '../MathMarkdown';
import type { AppViewId } from './DashboardView';

interface LibraryViewProps {
  profile: UserStudyProfile;
  onUpdateProfile: (next: UserStudyProfile) => void;
  onNavigate: (view: AppViewId, microtopicId?: string) => void;
}

type StudyTabId = 'teoria' | 'formulario' | 'laboratorio' | 'videos' | 'questoes';

const MACRO_LABELS: Record<MacroArea | 'all', string> = {
  all: 'Todas',
  mec: 'Mecânica',
  ele: 'Elétrica',
  multi: 'Controle/Mat.',
  basico: 'PT & Inglês',
};

export const LibraryView: React.FC<LibraryViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [areaFilter, setAreaFilter] = useState<MacroArea | 'all'>('all');
  const [activeTab, setActiveTab] = useState<StudyTabId>('teoria');
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [showTopicPicker, setShowTopicPicker] = useState(false);

  const candidateTopics = useMemo(
    () => getMicrotopicsForTrack(profile.activeTrack),
    [profile.activeTrack]
  );

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_MICROTOPICS.filter((m) => {
      if (areaFilter !== 'all' && m.macroArea !== areaFilter) return false;
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.norms.some((n) => n.toLowerCase().includes(q))
      );
    });
  }, [areaFilter, searchQuery]);

  const selectedMt =
    ALL_MICROTOPICS.find((m) => m.id === profile.selectedMicrotopicId) ??
    candidateTopics[0] ??
    ALL_MICROTOPICS[0];

  const currentTopicIdx = ALL_MICROTOPICS.findIndex(
    (m) => m.id === selectedMt.id
  );
  const prevTopic =
    currentTopicIdx > 0 ? ALL_MICROTOPICS[currentTopicIdx - 1] : null;
  const nextTopic =
    currentTopicIdx >= 0 && currentTopicIdx < ALL_MICROTOPICS.length - 1
      ? ALL_MICROTOPICS[currentTopicIdx + 1]
      : null;

  const mtProgress = profile.microtopics[selectedMt.id];

  const topicEquations = useMemo(() => {
    return selectedMt.compendium.flatMap((sec) =>
      sec.keyEquations.map((eq) => ({
        ...eq,
        sectionTitle: sec.title,
      }))
    );
  }, [selectedMt]);

  const topicQuestions = useMemo(
    () => ALL_QUESTIONS.filter((q) => q.microtopicId === selectedMt.id),
    [selectedMt.id]
  );

  const topicFlashcards = useMemo(
    () => ALL_FLASHCARDS.filter((f) => f.microtopicId === selectedMt.id),
    [selectedMt.id]
  );

  const handleSelectTopic = (mtId: string) => {
    setActiveVideoIdx(0);
    setShowTopicPicker(false);
    onUpdateProfile({
      ...profile,
      selectedMicrotopicId: mtId,
    });
  };

  const handleToggleReadingCompleted = () => {
    const prev = profile.microtopics[selectedMt.id];
    if (!prev) return;
    const nextDone = !prev.readingCompleted;
    const nextPKnown =
      nextDone && prev.pKnown < 0.9
        ? Number(Math.min(0.95, prev.pKnown + (1 - prev.pKnown) * 0.08).toFixed(4))
        : prev.pKnown;

    onUpdateProfile({
      ...profile,
      totalMinutesStudied: nextDone
        ? profile.totalMinutesStudied + Math.round(selectedMt.estimatedStudyMinutes * 0.5)
        : profile.totalMinutesStudied,
      microtopics: {
        ...profile.microtopics,
        [selectedMt.id]: {
          ...prev,
          readingCompleted: nextDone,
          pKnown: nextPKnown,
        },
      },
    });
  };

  const handleToggleVideoWatched = (videoId: string) => {
    const prev = profile.microtopics[selectedMt.id];
    if (!prev) return;
    const exists = prev.videosWatchedIds.includes(videoId);
    const nextWatched = exists
      ? prev.videosWatchedIds.filter((v) => v !== videoId)
      : [...prev.videosWatchedIds, videoId];
    onUpdateProfile({
      ...profile,
      microtopics: {
        ...profile.microtopics,
        [selectedMt.id]: {
          ...prev,
          videosWatchedIds: nextWatched,
        },
      },
    });
  };

  const handleNotesChange = (notes: string) => {
    const prev = profile.microtopics[selectedMt.id];
    if (!prev) return;
    onUpdateProfile({
      ...profile,
      microtopics: {
        ...profile.microtopics,
        [selectedMt.id]: {
          ...prev,
          notes,
        },
      },
    });
  };

  const activeVideo =
    selectedMt.videos[activeVideoIdx] ?? selectedMt.videos[0] ?? null;

  return (
    <div className="space-y-5">
      {/* Top Subject Navigation Bar (Quick Switch + Prev/Next) */}
      <div className="dream-card p-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => setShowTopicPicker((o) => !o)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
            <span>Trocar Matéria ({ALL_MICROTOPICS.length})</span>
          </button>

          <select
            aria-label="Selecionar matéria rapidamente"
            value={selectedMt.id}
            onChange={(e) => handleSelectTopic(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] max-w-xs sm:max-w-md truncate focus:outline-none focus:border-[var(--kirby-pink)] cursor-pointer"
          >
            {ALL_MICROTOPICS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.code} — {m.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          {prevTopic && (
            <button
              type="button"
              onClick={() => handleSelectTopic(prevTopic.id)}
              title={`Anterior: ${prevTopic.code} — ${prevTopic.title}`}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              {prevTopic.code}
            </button>
          )}
          {nextTopic && (
            <button
              type="button"
              onClick={() => handleSelectTopic(nextTopic.id)}
              title={`Próxima: ${nextTopic.code} — ${nextTopic.title}`}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] inline-flex items-center gap-1 cursor-pointer"
            >
              {nextTopic.code}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Subject Picker Drawer */}
      {showTopicPicker && (
        <section className="dream-card p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por código, tema ou norma técnica (API 610, NR-13, NBR 5410)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--kirby-pink)]"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {(Object.keys(MACRO_LABELS) as Array<MacroArea | 'all'>).map(
                (area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setAreaFilter(area)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      areaFilter === area
                        ? 'bg-[var(--kirby-pink)] text-white'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {MACRO_LABELS[area]}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
            {filteredTopics.map((mt) => {
              const p = profile.microtopics[mt.id];
              const isActive = mt.id === selectedMt.id;
              return (
                <button
                  key={mt.id}
                  type="button"
                  onClick={() => handleSelectTopic(mt.id)}
                  className={`text-left p-2.5 rounded-lg border transition cursor-pointer ${
                    isActive
                      ? 'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)]'
                      : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border-[var(--border-subtle)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-[var(--kirby-pink)]">
                      {mt.code}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                      {Math.round((p?.pKnown ?? 0) * 100)}%
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] truncate mt-0.5">
                    {mt.title}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Two-Column Notebook Layout: Document Reader (8/12) + Side Notes & TOC (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center Document Column */}
        <main className="lg:col-span-8 space-y-5">
          {/* Clean Subject Document Header */}
          <section className="dream-card p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[var(--kirby-pink)] text-white">
                  {selectedMt.code}
                </span>
                <CopyAbilityBadge ability={selectedMt.copyAbility} showLabel />
                <span className="text-xs text-[var(--text-secondary)] font-mono">
                  Incidência: {selectedMt.incidence}
                </span>
              </div>

              <button
                type="button"
                onClick={handleToggleReadingCompleted}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border inline-flex items-center gap-1.5 transition cursor-pointer ${
                  mtProgress?.readingCompleted
                    ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
                    : 'bg-[var(--bg-elevated)] hover:border-[var(--kirby-pink)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {mtProgress?.readingCompleted
                  ? 'Leitura Concluída'
                  : 'Marcar como Lido'}
              </button>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug">
                {selectedMt.title}
              </h1>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                {selectedMt.englishSubtitle}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                {selectedMt.summary}
              </p>
            </div>

            {/* Norms & Curriculum Mapping */}
            {selectedMt.norms.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-[var(--text-muted)] mr-1">
                  Normas Técnicas:
                </span>
                {selectedMt.norms.map((norm) => (
                  <span
                    key={norm}
                    className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
                  >
                    {norm}
                  </span>
                ))}
              </div>
            )}

            {/* Sub-Navigation Content Tabs (Notion / RemNote style) */}
            <div className="flex flex-wrap gap-1 pt-3 border-t border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => setActiveTab('teoria')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'teoria'
                    ? 'bg-[var(--kirby-pink)] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Teoria Completa ({selectedMt.compendium.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('formulario')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'formulario'
                    ? 'bg-[var(--kirby-pink)] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Sigma className="w-3.5 h-3.5" />
                Formulário ({topicEquations.length})
              </button>

              {selectedMt.interactiveDiagram !== 'none' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('laboratorio')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                    activeTab === 'laboratorio'
                      ? 'bg-[var(--kirby-pink)] text-white'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  Simulador Interativo
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab('videos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'videos'
                    ? 'bg-[var(--kirby-pink)] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <PlayCircle className="w-3.5 h-3.5" />
                Aulas & Livros ({selectedMt.videos.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('questoes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'questoes'
                    ? 'bg-[var(--kirby-pink)] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Questões & Cartões ({topicQuestions.length + topicFlashcards.length})
              </button>
            </div>
          </section>

          {/* TAB 1: TEORIA COMPLETA (Continuous Document Sheet) */}
          {activeTab === 'teoria' && (
            <div className="space-y-5">
              {selectedMt.compendium.map((sec, idx) => (
                <article
                  key={sec.id}
                  id={`sec-${sec.id}`}
                  className="dream-card p-5 sm:p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-[var(--kirby-pink-soft)] text-[var(--kirby-pink)] font-mono font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                        {sec.title}
                      </h2>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      {sec.levelTag}
                    </span>
                  </div>

                  <MathMarkdown
                    text={sec.contentMarkdown}
                    className="text-sm leading-relaxed"
                  />

                  {sec.keyEquations.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--kirby-pink)]">
                        Equações & Relações Fundamentais
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {sec.keyEquations.map((eq, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-x-auto"
                          >
                            <div className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                              {eq.label}
                            </div>
                            <MathBlock latex={eq.latex} display />
                            {eq.note && (
                              <div className="text-xs text-[var(--text-secondary)] mt-1">
                                {eq.note}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {sec.examPitfalls.length > 0 && (
                    <div className="p-3.5 rounded-lg bg-[var(--bg-accent-soft)] border border-[var(--border-strong)] space-y-1.5">
                      <div className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-[var(--maxim-red)]" />
                        Pontos Críticos & Pegadinhas de Banca (Cesgranrio / Cebraspe / FGV)
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-primary)]">
                        {sec.examPitfalls.map((pit, i) => (
                          <li key={i}>{pit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}

              {/* Inline Interactive Simulator at bottom of Theory if available */}
              {selectedMt.interactiveDiagram !== 'none' && (
                <section className="dream-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--kirby-pink)]">
                      Simulador Físico / Engenharia Interativo
                    </span>
                  </div>
                  <InteractiveEngineeringDiagram
                    diagramId={selectedMt.interactiveDiagram}
                  />
                </section>
              )}
            </div>
          )}

          {/* TAB 2: FORMULÁRIO RÁPIDO (All Equations of the Subject) */}
          {activeTab === 'formulario' && (
            <section className="dream-card p-5 sm:p-6 space-y-4">
              <div className="border-b border-[var(--border-subtle)] pb-3">
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  Formulário Direto — {selectedMt.code}: {selectedMt.title}
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Todas as equações, parâmetros dimensionais e condições de contorno desta matéria reunidas para consulta rápida.
                </p>
              </div>

              <div className="space-y-3">
                {topicEquations.map((eq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {idx + 1}. {eq.label}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {eq.sectionTitle}
                      </span>
                    </div>
                    <MathBlock latex={eq.latex} display />
                    {eq.note && (
                      <div className="text-xs text-[var(--text-secondary)]">
                        <strong>Aplicação / Restrição:</strong> {eq.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 3: SIMULADOR INTERATIVO */}
          {activeTab === 'laboratorio' &&
            selectedMt.interactiveDiagram !== 'none' && (
              <section className="dream-card p-5 space-y-3">
                <InteractiveEngineeringDiagram
                  diagramId={selectedMt.interactiveDiagram}
                />
              </section>
            )}

          {/* TAB 4: VIDEOAULAS & BIBLIOGRAFIA */}
          {activeTab === 'videos' && (
            <div className="space-y-5">
              <section className="dream-card p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-[var(--text-primary)]">
                    Videoaulas Verificadas ({selectedMt.videos.length})
                  </h2>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    Assistidas: {mtProgress?.videosWatchedIds.length ?? 0}/
                    {selectedMt.videos.length}
                  </span>
                </div>

                {activeVideo && activeVideo.youtubeId ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-black">
                    <iframe
                      key={activeVideo.youtubeId}
                      src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0`}
                      title={activeVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : null}

                {activeVideo && (
                  <div className="p-3.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[var(--kirby-pink)]">
                          {activeVideo.channel}
                        </span>
                        <span className="font-mono text-[var(--text-muted)]">
                          {activeVideo.language} • {activeVideo.duration}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">
                        {activeVideo.title}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {activeVideo.whyWatch}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleVideoWatched(activeVideo.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                          mtProgress?.videosWatchedIds.includes(activeVideo.id)
                            ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'
                            : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]'
                        }`}
                      >
                        {mtProgress?.videosWatchedIds.includes(activeVideo.id)
                          ? '✓ Assistida'
                          : 'Marcar Assistida'}
                      </button>
                      <a
                        href={activeVideo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-1"
                      >
                        Fonte <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedMt.videos.map((vid, idx) => (
                    <button
                      key={vid.id}
                      type="button"
                      onClick={() => setActiveVideoIdx(idx)}
                      className={`text-left p-3 rounded-lg border transition cursor-pointer ${
                        idx === activeVideoIdx
                          ? 'bg-[var(--kirby-pink-soft)] border-[var(--kirby-pink)]'
                          : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border-[var(--border-subtle)]'
                      }`}
                    >
                      <div className="text-[11px] font-mono text-[var(--text-secondary)]">
                        {vid.channel} • {vid.language} ({vid.duration})
                      </div>
                      <div className="text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                        {vid.title}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="dream-card p-5 space-y-3">
                <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-[var(--kirby-pink)]" />
                  Capítulos de Livros-Texto Recomendados
                </h2>
                <div className="space-y-2">
                  {selectedMt.books.map((bk, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs space-y-0.5"
                    >
                      <div className="font-bold text-[var(--text-primary)]">
                        {bk.citation}
                      </div>
                      <div className="font-mono text-[11px] text-[var(--kirby-pink)]">
                        Capítulos: {bk.chapters}
                      </div>
                      <div className="text-[var(--text-secondary)]">
                        {bk.focusNote}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB 5: QUESTÕES & CARTÕES DO TEMA (Direct Content View) */}
          {activeTab === 'questoes' && (
            <div className="space-y-5">
              <section className="dream-card p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-bold text-[var(--text-primary)]">
                      Questões desta Matéria ({topicQuestions.length})
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Visualize as questões e memoriais analíticos ou abra no resolvedor interativo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('exercicios', selectedMt.id)}
                    className="dream-btn-primary px-3.5 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Resolver Interativamente
                  </button>
                </div>

                <div className="space-y-3">
                  {topicQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[var(--kirby-pink)]">
                          Questão {idx + 1} • {q.board} ({q.examContext})
                        </span>
                      </div>
                      <MathMarkdown
                        text={q.statementMarkdown}
                        className="text-xs sm:text-sm"
                      />
                      <details className="pt-2 border-t border-[var(--border-subtle)] text-xs">
                        <summary className="font-semibold text-[var(--kirby-pink)] cursor-pointer">
                          Ver Gabarito & Resolução Passo a Passo
                        </summary>
                        <div className="mt-2 space-y-2 pl-2 border-l-2 border-[var(--kirby-pink)]">
                          {q.solutionStepsMarkdown.map((step, sIdx) => (
                            <div key={sIdx}>
                              <MathMarkdown text={step} />
                            </div>
                          ))}
                          <div className="font-semibold text-[var(--text-primary)]">
                            <MathMarkdown text={q.finalDiagnosis} />
                          </div>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dream-card p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-bold text-[var(--text-primary)]">
                    Flashcards de Dedução Ativa ({topicFlashcards.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => onNavigate('auto-revisao', selectedMt.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Brain className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                    Praticar no FSRS
                  </button>
                </div>

                <div className="space-y-2.5">
                  {topicFlashcards.map((fc) => (
                    <div
                      key={fc.id}
                      className="p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2"
                    >
                      <div className="text-xs font-semibold text-[var(--text-primary)]">
                        <MathMarkdown text={fc.promptMarkdown} />
                      </div>
                      <div className="pt-2 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                        <MathMarkdown text={fc.answerMarkdown} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>

        {/* Right Sticky Column (4/12): Table of Contents + Personal Study Notebook */}
        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-16">
          {/* Table of Contents & Exam Alignment */}
          <section className="dream-card p-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Estrutura da Matéria
            </div>
            <ul className="space-y-1.5 text-xs">
              {selectedMt.compendium.map((sec, idx) => (
                <li key={sec.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('teoria');
                      setTimeout(() => {
                        document
                          .getElementById(`sec-${sec.id}`)
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    }}
                    className="text-left text-[var(--text-secondary)] hover:text-[var(--kirby-pink)] transition flex items-start gap-2 cursor-pointer"
                  >
                    <span className="font-mono font-bold text-[var(--kirby-pink)]">
                      {idx + 1}.
                    </span>
                    <span>{sec.title}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2 text-[11px]">
              <div>
                <span className="font-semibold text-[var(--text-primary)]">
                  Ementa UNIP:
                </span>{' '}
                <span className="text-[var(--text-secondary)]">
                  {selectedMt.unipOrigin}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[var(--text-primary)]">
                  Petrobras:
                </span>{' '}
                <span className="text-[var(--text-secondary)]">
                  {selectedMt.petrobrasAllocation}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[var(--text-primary)]">
                  Outros Concursos:
                </span>{' '}
                <span className="text-[var(--text-secondary)]">
                  {selectedMt.generalConcursosRelevance}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onNavigate('exercicios', selectedMt.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                Questões ({topicQuestions.length})
              </button>
              <button
                type="button"
                onClick={() => onNavigate('auto-revisao', selectedMt.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-elevated)] hover:bg-[var(--kirby-pink-soft)] border border-[var(--border-subtle)] text-[var(--text-primary)] inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5 text-[var(--warp-gold)]" />
                Flashcards ({topicFlashcards.length})
              </button>
            </div>
          </section>

          {/* Persistent Personal Notes (Caderno da Thaisa) */}
          <section className="dream-card p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[var(--kirby-pink)]" />
                Minhas Anotações ({selectedMt.code})
              </h2>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                Salvo automático
              </span>
            </div>
            <textarea
              value={mtProgress?.notes ?? ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={10}
              placeholder={`Anote aqui seu resumo pessoal de ${selectedMt.code}, deduções de fórmulas, unidades críticas ou lembretes de normas...`}
              className="w-full p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] focus:bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] leading-relaxed focus:outline-none focus:border-[var(--kirby-pink)]"
            />
          </section>
        </aside>
      </div>
    </div>
  );
};
