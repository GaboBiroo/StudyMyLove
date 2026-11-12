import React from 'react';
import type { CopyAbilityId } from '../types/study';

interface KirbyProps {
  ability?: CopyAbilityId | 'classic' | 'sleep';
  size?: number;
  className?: string;
}

/**
 * Authentic HAL Laboratory / Nintendo Console-inspired Kirby character sprite
 * with warm shading, oval eyes with blue lower iris, and clean ability headgear.
 */
export const KirbyMascot: React.FC<KirbyProps> = ({
  ability = 'classic',
  size = 48,
  className = '',
}) => {
  const isSleeping = ability === 'sleep';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Kirby ${ability}`}
    >
      <defs>
        <radialGradient id="kirbyBodyGrad" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FFD1DC" />
          <stop offset="55%" stopColor="#FFA6B8" />
          <stop offset="100%" stopColor="#F07D96" />
        </radialGradient>
        <linearGradient id="kirbyEyeIris" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A162B" />
          <stop offset="55%" stopColor="#1A162B" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="60" cy="106" rx="34" ry="6" fill="rgba(43, 30, 40, 0.12)" />

      {/* Back Foot */}
      <ellipse
        cx="41"
        cy="96"
        rx="18"
        ry="10.5"
        transform="rotate(-10 41 96)"
        fill="#D9385A"
        stroke="#3B1D2E"
        strokeWidth="2.4"
      />
      {/* Front Foot */}
      <ellipse
        cx="79"
        cy="96"
        rx="18"
        ry="10.5"
        transform="rotate(10 79 96)"
        fill="#E64467"
        stroke="#3B1D2E"
        strokeWidth="2.4"
      />
      {/* Foot highlights */}
      <ellipse cx="36" cy="93" rx="6" ry="2.5" transform="rotate(-10 36 93)" fill="#F8839B" opacity="0.6" />
      <ellipse cx="83" cy="93" rx="6" ry="2.5" transform="rotate(10 83 93)" fill="#F8839B" opacity="0.6" />

      {/* Left Arm (raised slightly in greeting) */}
      <ellipse
        cx="23"
        cy="61"
        rx="12.5"
        ry="10"
        transform="rotate(-28 23 61)"
        fill="#FFA6B8"
        stroke="#3B1D2E"
        strokeWidth="2.4"
      />
      {/* Right Arm */}
      <ellipse
        cx="97"
        cy="64"
        rx="12.5"
        ry="10"
        transform="rotate(24 97 64)"
        fill="#FFA6B8"
        stroke="#3B1D2E"
        strokeWidth="2.4"
      />

      {/* Main Round Torso */}
      <circle
        cx="60"
        cy="62"
        r="36.5"
        fill="url(#kirbyBodyGrad)"
        stroke="#3B1D2E"
        strokeWidth="2.5"
      />

      {/* Rosy Blushes */}
      <ellipse cx="37" cy="65" rx="6.8" ry="3.6" transform="rotate(-6 37 65)" fill="#F05677" opacity="0.85" />
      <ellipse cx="83" cy="65" rx="6.8" ry="3.6" transform="rotate(6 83 65)" fill="#F05677" opacity="0.85" />

      {/* Eyes */}
      {isSleeping ? (
        <g stroke="#3B1D2E" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M42 57 Q49 63 55 57" />
          <path d="M65 57 Q71 63 78 57" />
          {/* Zzz bubble */}
          <text x="86" y="34" fill="#3B82C4" fontSize="13" fontWeight="800" fontFamily="monospace">
            Zzz
          </text>
        </g>
      ) : (
        <g>
          {/* Left Eye */}
          <ellipse cx="49" cy="54" rx="4.6" ry="10.2" fill="url(#kirbyEyeIris)" />
          <ellipse cx="49" cy="49.2" rx="2.7" ry="4.2" fill="#FFFFFF" />
          <ellipse cx="49" cy="59.8" rx="2.4" ry="2.5" fill="#60A5FA" opacity="0.9" />

          {/* Right Eye */}
          <ellipse cx="71" cy="54" rx="4.6" ry="10.2" fill="url(#kirbyEyeIris)" />
          <ellipse cx="71" cy="49.2" rx="2.7" ry="4.2" fill="#FFFFFF" />
          <ellipse cx="71" cy="59.8" rx="2.4" ry="2.5" fill="#60A5FA" opacity="0.9" />
        </g>
      )}

      {/* Mouth */}
      {isSleeping ? (
        <circle cx="60" cy="68" r="3.2" fill="#D9385A" stroke="#3B1D2E" strokeWidth="1.8" />
      ) : (
        <g>
          <path
            d="M54.5 66.5 Q60 74.5 65.5 66.5 Z"
            fill="#C92A49"
            stroke="#3B1D2E"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M56.5 69.5 Q60 72.5 63.5 69.5" fill="#FF8FA3" />
        </g>
      )}

      {/* Authentic Copy Ability Hats */}
      {ability === 'scholar' && (
        <g>
          {/* Classic Kirby Archive / Hal Laboratory Mortarboard */}
          <polygon
            points="60,12 92,23 60,33 28,23"
            fill="#2B1E28"
            stroke="#3B1D2E"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M43 28 L43 35 Q60 40 77 35 L77 28" fill="#3D2B38" stroke="#3B1D2E" strokeWidth="2" />
          <path d="M84 25 L88 41" stroke="#F5C842" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="88" cy="42" r="3" fill="#F5C842" />
        </g>
      )}

      {ability === 'fire' && (
        <g>
          {/* Fire Crown */}
          <path
            d="M34 34 L42 15 L52 26 L60 10 L68 26 L78 15 L86 34 Q60 28 34 34 Z"
            fill="#F97316"
            stroke="#3B1D2E"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M42 32 L48 21 L55 28 L60 17 L65 28 L72 21 L78 32 Z"
            fill="#FDE047"
          />
          <circle cx="60" cy="29" r="3.5" fill="#EF4444" stroke="#3B1D2E" strokeWidth="1.5" />
        </g>
      )}

      {ability === 'hammer' && (
        <g>
          {/* Classic Twisted Hachimaki Headband */}
          <path
            d="M27 40 Q60 30 93 40"
            stroke="#FFFFFF"
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M27 40 Q60 30 93 40"
            stroke="#2563EB"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Mini Star Hammer on side */}
          <rect
            x="92"
            y="24"
            width="6"
            height="36"
            rx="3"
            transform="rotate(16 95 42)"
            fill="#D97706"
            stroke="#3B1D2E"
            strokeWidth="2"
          />
          <rect
            x="83"
            y="16"
            width="24"
            height="14"
            rx="4"
            transform="rotate(16 95 23)"
            fill="#B45309"
            stroke="#3B1D2E"
            strokeWidth="2"
          />
          <circle cx="95" cy="23" r="3.5" fill="#FDE047" />
        </g>
      )}

      {ability === 'bubble' && (
        <g>
          {/* Water/Bubble Crown */}
          <ellipse cx="60" cy="25" rx="20" ry="8" fill="#60A5FA" stroke="#3B1D2E" strokeWidth="2" />
          <circle cx="60" cy="18" r="7" fill="#93C5FD" stroke="#3B1D2E" strokeWidth="2" />
          <circle cx="58" cy="16" r="2" fill="#FFFFFF" />
        </g>
      )}

      {ability === 'spark' && (
        <g>
          {/* Spark / Plasma Crystal Crown */}
          <polygon
            points="35,33 43,14 53,26 60,9 67,26 77,14 85,33"
            fill="#FDE047"
            stroke="#3B1D2E"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <polygon points="46,31 53,19 60,14 67,19 74,31" fill="#FEF08A" />
        </g>
      )}

      {ability === 'plasma' && (
        <g>
          {/* Plasma Green/Cyan Crest */}
          <polygon
            points="38,32 47,16 55,25 60,8 65,25 73,16 82,32"
            fill="#4ADE80"
            stroke="#3B1D2E"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="28" r="3.5" fill="#FEF08A" stroke="#3B1D2E" strokeWidth="1.5" />
        </g>
      )}

      {ability === 'doctor' && (
        <g>
          {/* Doctor Kirby Head Mirror & Glasses */}
          <path d="M30 37 Q60 28 90 37" stroke="#3B1D2E" strokeWidth="3" fill="none" />
          <circle cx="60" cy="27" r="8.5" fill="#E2E8F0" stroke="#3B1D2E" strokeWidth="2.2" />
          <circle cx="60" cy="27" r="3.5" fill="#FFFFFF" />
          <circle cx="49" cy="54" r="9.5" stroke="#475569" strokeWidth="2" fill="none" />
          <circle cx="71" cy="54" r="9.5" stroke="#475569" strokeWidth="2" fill="none" />
          <line x1="58.5" y1="54" x2="61.5" y2="54" stroke="#475569" strokeWidth="2" />
        </g>
      )}

      {ability === 'sleep' && (
        <g>
          {/* Classic Nightcap */}
          <path
            d="M32 34 Q55 10 88 26 Q76 36 60 32 Z"
            fill="#60A5FA"
            stroke="#3B1D2E"
            strokeWidth="2.2"
          />
          <circle cx="90" cy="26" r="5.5" fill="#FFFFFF" stroke="#3B1D2E" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
};

/**
 * Compact Nintendo Console-style Ability Emblem (used in lists, headers, and tables
 * instead of repeating full-body mascot illustrations).
 */
export const CopyAbilityBadge: React.FC<{
  ability: CopyAbilityId;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}> = ({ ability, size = 'sm', showLabel = false }) => {
  const meta: Record<
    CopyAbilityId,
    { label: string; short: string; bg: string; fg: string; border: string; symbol: string }
  > = {
    fire: {
      label: 'Termo & Fluidos',
      short: 'FIRE',
      bg: '#FFF1E6',
      fg: '#C2410C',
      border: '#FDBA74',
      symbol: '★',
    },
    hammer: {
      label: 'Sólidos & Materiais',
      short: 'HAMMER',
      bg: '#FCE8EC',
      fg: '#9D174D',
      border: '#F48CA5',
      symbol: '◆',
    },
    bubble: {
      label: 'Máquinas & Normas',
      short: 'AQUA',
      bg: '#EFF6FF',
      fg: '#1D4ED8',
      border: '#93C5FD',
      symbol: '●',
    },
    spark: {
      label: 'Circuitos & Máquinas',
      short: 'SPARK',
      bg: '#FEF9C3',
      fg: '#854D0E',
      border: '#FDE047',
      symbol: '⚡',
    },
    plasma: {
      label: 'Potência & Proteção',
      short: 'PLASMA',
      bg: '#ECFDF5',
      fg: '#047857',
      border: '#6EE7B7',
      symbol: '✦',
    },
    doctor: {
      label: 'Controle & Mat.',
      short: 'DOCTOR',
      bg: '#F3E8FF',
      fg: '#6D28D9',
      border: '#C4B5FD',
      symbol: '✚',
    },
    scholar: {
      label: 'Português & Inglês',
      short: 'SCHOLAR',
      bg: '#FEF3C7',
      fg: '#92400E',
      border: '#FCD34D',
      symbol: '★',
    },
  };

  const item = meta[ability] ?? meta.scholar;
  const pad = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      style={{
        backgroundColor: item.bg,
        color: item.fg,
        borderColor: item.border,
      }}
      className={`inline-flex items-center gap-1 font-mono font-bold rounded-md border ${pad} shrink-0`}
    >
      <span>{item.symbol}</span>
      <span>{showLabel ? item.label : item.short}</span>
    </span>
  );
};

export const WarpStarIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Warp Star"
  >
    <path
      d="M32 5 L39.8 21.6 L58 23.8 L44.4 36.2 L48.2 54.4 L32 45 L15.8 54.4 L19.6 36.2 L6 23.8 L24.2 21.6 Z"
      fill="#F5C842"
      stroke="#3B1D2E"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path
      d="M32 12 L36.5 22 L47 23.2 L39 30.5 L41 41 L32 35.8"
      fill="#FFF3B0"
      opacity="0.75"
    />
  </svg>
);

export const MaximTomatoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Maxim Tomato"
  >
    <circle cx="32" cy="36" r="21" fill="#E84A5F" stroke="#3B1D2E" strokeWidth="3.2" />
    <path
      d="M22 17 Q32 11 42 17 L36 22 L32 18 L28 22 Z"
      fill="#4ADE80"
      stroke="#3B1D2E"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M23 31 L27 42 L32 34 L37 42 L41 31"
      stroke="#FFFDF9"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BossMascot: React.FC<{
  boss: 'dedede' | 'metaknight' | 'galactaknight';
  size?: number;
}> = ({ boss, size = 56 }) => {
  if (boss === 'dedede') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-label="King Dedede">
        <circle cx="50" cy="54" r="34" fill="#3B82F6" stroke="#3B1D2E" strokeWidth="3" />
        <ellipse cx="50" cy="62" rx="23" ry="20" fill="#FEF3C7" stroke="#3B1D2E" strokeWidth="2.5" />
        <path d="M24 30 L76 30 L70 16 L30 16 Z" fill="#E11D48" stroke="#3B1D2E" strokeWidth="2.5" />
        <circle cx="50" cy="14" r="6.5" fill="#FFFFFF" stroke="#3B1D2E" strokeWidth="2.2" />
        <rect x="23" y="27" width="54" height="7" rx="3.5" fill="#FFFFFF" stroke="#3B1D2E" strokeWidth="2.2" />
        <circle cx="40" cy="46" r="3.8" fill="#2B1E28" />
        <circle cx="60" cy="46" r="3.8" fill="#2B1E28" />
        <polygon points="41,54 59,54 50,64" fill="#F59E0B" stroke="#3B1D2E" strokeWidth="2.2" />
      </svg>
    );
  }
  if (boss === 'metaknight') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" aria-label="Meta Knight">
        <path d="M14 52 Q50 20 86 52 L78 84 Q50 92 22 84 Z" fill="#312E81" stroke="#3B1D2E" strokeWidth="3" />
        <circle cx="50" cy="54" r="27" fill="#1E1B4B" />
        <path d="M25 49 Q50 31 75 49 L72 68 Q50 78 28 68 Z" fill="#E2E8F0" stroke="#3B1D2E" strokeWidth="2.5" />
        <line x1="29" y1="53" x2="71" y2="53" stroke="#1E1B4B" strokeWidth="3" />
        <ellipse cx="40" cy="53" rx="5" ry="2.8" fill="#FDE047" />
        <ellipse cx="60" cy="53" rx="5" ry="2.8" fill="#FDE047" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="Galacta Knight">
      <path d="M14 48 L6 26 L34 38 M86 48 L94 26 L66 38" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="54" r="27" fill="#EC4899" stroke="#3B1D2E" strokeWidth="3" />
      <path d="M26 48 Q50 30 74 48 L70 68 Q50 76 30 68 Z" fill="#FFFFFF" stroke="#3B1D2E" strokeWidth="2.5" />
      <path d="M50 35 L50 68 M34 52 L66 52" stroke="#E11D48" strokeWidth="3.2" />
    </svg>
  );
};
