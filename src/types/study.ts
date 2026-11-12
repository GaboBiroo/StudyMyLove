export type MacroArea = 'mec' | 'ele' | 'multi' | 'basico';

export type PlanetId =
  | 'termofluidos'
  | 'solidos-materiais'
  | 'maquinas-equipamentos'
  | 'eletro-circuitos'
  | 'potencia-protecao'
  | 'controle-eletronica-mat'
  | 'basicos-interdisciplinar';

export type CopyAbilityId =
  | 'fire'
  | 'bubble'
  | 'hammer'
  | 'spark'
  | 'plasma'
  | 'doctor'
  | 'scholar';

export type StudyTrack =
  | 'integrado'
  | 'mecanica'
  | 'eletrica'
  | 'concursos_gerais';

export type ExamBoard =
  | 'Cesgranrio'
  | 'Cebraspe'
  | 'FGV'
  | 'Vunesp'
  | 'FCC'
  | 'Marinha CP-CEM'
  | 'UNIP Nivelamento'
  | 'Europa — CERN / ESA'
  | 'Europa — EPSO / UE'
  | 'Europa — Energy Offshore (Equinor/Shell)'
  | 'Europa — CEng / Ordem dos Engenheiros';

export type EngineerLevelId =
  | 'untested'
  | 'junior'
  | 'plena'
  | 'senior'
  | 'expert';

export type ErrorCategory = 'conceptual' | 'slip' | 'normative' | 'trap';

export type FsrsRating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export type InteractiveDiagramId =
  | 'brayton-rankine-ts'
  | 'mohr-circle-2d'
  | 'laval-nozzle-mach'
  | 'pump-npsh-curve'
  | 'fe-c-phase-diagram'
  | 'vibration-transmissibility'
  | 'three-phase-phasor'
  | 'mit-kloss-torque'
  | 'bode-margins'
  | 'buck-boost-pwm'
  | 'fortescue-faults'
  | 'none';

export interface CompendiumSection {
  id: string;
  title: string;
  levelTag: string;
  contentMarkdown: string; // Supports inline $...$ and display $$...$$ LaTeX
  keyEquations: Array<{ label: string; latex: string; note?: string }>;
  examPitfalls: string[];
}

export interface VideoResource {
  id: string;
  title: string;
  channel: string;
  language: 'EN' | 'PT-BR';
  duration: string;
  whyWatch: string;
  youtubeId?: string; // Only verified embeddable YouTube IDs
  url: string; // Verified YouTube / MIT OCW / NPTEL / UNIVESP / TU Delft / ETH URL
  platform:
    | 'YouTube'
    | 'MIT OCW'
    | 'NPTEL'
    | 'UNIVESP'
    | 'TU Delft / ETH'
    | 'Imperial / Cambridge';
}

export interface BookReference {
  citation: string;
  chapters: string;
  focusNote: string;
}

export interface FlashcardItem {
  id: string;
  microtopicId: string;
  promptMarkdown: string;
  answerMarkdown: string;
  derivationHint: string;
  tags: string[];
}

export interface IrtParameters {
  a: number; // Discrimination (>= 0.5)
  b: number; // Difficulty (-2.5 to +3.0)
  c: number; // Guessing (0.20 for 5-opt MCQ, 0.50 or 0.05 for T/F)
}

export interface ExerciseQuestion {
  id: string;
  microtopicId: string;
  board: ExamBoard;
  examContext: string;
  targetExams: string[]; // e.g., ['Petrobras', 'Transpetro', 'BNDES', 'Marinha']
  questionType: 'mcq5' | 'cebraspe_tf';
  statementMarkdown: string;
  options?: string[]; // 5 options for mcq5
  correctIndex?: number; // 0..4 for mcq5
  correctBoolean?: boolean; // true = CERTO, false = ERRADO
  irt: IrtParameters;
  solutionStepsMarkdown: string[];
  finalDiagnosis: string;
  trapNote: string;
  relatedNorms?: string[];
  recommendedTimeSec: number;
}

export interface Microtopic {
  id: string;
  code: string;
  title: string;
  englishSubtitle: string;
  macroArea: MacroArea;
  planetId: PlanetId;
  copyAbility: CopyAbilityId;
  unipOrigin: string;
  petrobrasAllocation: string;
  generalConcursosRelevance: string;
  bloomLevel: string;
  incidence: 'Crítica (Alta)' | 'Alta' | 'Média-Alta' | 'Média';
  norms: string[];
  estimatedStudyMinutes: number;
  summary: string;
  interactiveDiagram: InteractiveDiagramId;
  compendium: CompendiumSection[];
  videos: VideoResource[];
  books: BookReference[];
}

export interface IrtResponseRecord {
  questionId: string;
  correct: boolean;
  a: number;
  b: number;
  c: number;
  timestamp: string;
  timeSpentSec: number;
  errorCategory?: ErrorCategory;
  wasGuess?: boolean;
}

export interface MicrotopicProgress {
  microtopicId: string;
  // IRT 3PL
  theta: number;
  standardError: number;
  responses: IrtResponseRecord[];
  // BKT
  pKnown: number; // P(L_t)
  pInit: number;  // P(L_0)
  pTransit: number; // P(T)
  pGuess: number;   // P(G)
  pSlip: number;    // P(S)
  // FSRS
  stabilityDays: number; // S
  difficulty: number;    // D in [1, 10]
  lastReviewISO: string;
  nextReviewISO: string;
  fsrsReps: number;
  fsrsLapses: number;
  // Study tracking
  readingCompleted: boolean;
  videosWatchedIds: string[];
  errorCounts: Record<ErrorCategory, number>;
  notes: string;
}

export interface FlashcardProgress {
  cardId: string;
  microtopicId: string;
  stabilityDays: number;
  difficulty: number;
  lastReviewISO: string;
  nextReviewISO: string;
  reps: number;
  lapses: number;
}

export interface RoutineBlock {
  id: string;
  order: number;
  timeRange: string;
  durationMinutes: number;
  title: string;
  subtitle: string;
  phaseType: 'flash-fsrs' | 'theory-video' | 'break-tomato' | 'analytical-drills' | 'error-reverse' | 'lunch' | 'timed-sprint' | 'basics-pt-en' | 'interdisciplinary-close';
  description: string;
  checklist: string[];
  targetActionView: 'auto-revisao' | 'biblioteca' | 'exercicios' | 'simulados' | 'matriz' | 'rotina';
}

export interface ExamSimulationResult {
  id: string;
  dateISO: string;
  bossId: 'dedede' | 'metaknight' | 'galactaknight';
  board: ExamBoard;
  title?: string;
  themeLabel?: string;
  untimed?: boolean;
  engineerLevel?: EngineerLevelId;
  engineerLevelLabel?: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  blankCount: number;
  netScore: number;
  maxScore: number;
  basicCutoffPassed: boolean;
  durationUsedSec: number;
  bossDefeated: boolean;
}

export interface UserStudyProfile {
  studentName: string;
  university: string;
  activeTrack: StudyTrack;
  dailyGoalHours: number; // 6 to 8 hours default
  dayParity: 'odd' | 'even'; // Odd = Portuguese, Even = Technical English
  selectedMicrotopicId: string;
  completedRoutineBlocksToday: string[];
  routineDateISO: string;
  streakDays: number;
  totalMinutesStudied: number;
  microtopics: Record<string, MicrotopicProgress>;
  flashcards: Record<string, FlashcardProgress>;
  examHistory: ExamSimulationResult[];
}
