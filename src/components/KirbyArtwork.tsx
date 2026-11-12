import React from 'react';
import type { CopyAbilityId } from '../types/study';

export type KirbyMascotVariant =
  | CopyAbilityId
  | 'classic'
  | 'sleep'
  | 'waddledee'
  | 'magolor'
  | 'starride';

interface KirbyProps {
  ability?: KirbyMascotVariant;
  size?: number;
  className?: string;
}

export const KIRBY_ABILITY_PNG_MAP: Record<KirbyMascotVariant, string> = {
  classic: '/kirby/kirby-classic.png',
  sleep: '/kirby/kirby-sleep.png',
  fire: '/kirby/kirby-fire.png',
  hammer: '/kirby/kirby-hammer.png',
  bubble: '/kirby/kirby-bubble.png',
  spark: '/kirby/kirby-spark.png',
  plasma: '/kirby/kirby-plasma.png',
  doctor: '/kirby/kirby-doctor.png',
  scholar: '/kirby/kirby-scholar.png',
  waddledee: '/kirby/waddle-dee.png',
  magolor: '/kirby/magolor.png',
  starride: '/kirby/kirby-star-ride.png',
};

const KIRBY_ALT_LABELS: Record<KirbyMascotVariant, string> = {
  classic: 'Kirby Oficial (Return to Dream Land Deluxe)',
  sleep: 'Sleep Kirby Oficial',
  fire: 'Fire Kirby Oficial',
  hammer: 'Hammer Kirby Oficial',
  bubble: 'Water Kirby Oficial',
  spark: 'Spark Kirby Oficial',
  plasma: 'Plasma Kirby Oficial',
  doctor: 'Doctor Kirby Oficial (Planet Robobot)',
  scholar: 'Beam Kirby Oficial',
  waddledee: 'Bandana Waddle Dee Oficial',
  magolor: 'Magolor Oficial',
  starride: 'Kirby Oficial',
};

/**
 * Renders official Nintendo / HAL Laboratory transparent PNG artwork
 * for Kirby, his Copy Abilities, and Dream Land companions.
 */
export const KirbyMascot: React.FC<KirbyProps> = ({
  ability = 'classic',
  size = 48,
  className = '',
}) => {
  const src = KIRBY_ABILITY_PNG_MAP[ability] ?? KIRBY_ABILITY_PNG_MAP.classic;
  const alt = KIRBY_ALT_LABELS[ability] ?? 'Kirby Oficial';

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      draggable={false}
      style={{ width: size, height: size }}
      className={`object-contain select-none shrink-0 drop-shadow-xs ${className}`}
    />
  );
};

/**
 * Compact badge featuring the official Copy Ability PNG icon alongside its domain label.
 */
export const CopyAbilityBadge: React.FC<{
  ability: CopyAbilityId;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}> = ({ ability, size = 'sm', showLabel = false }) => {
  const meta: Record<
    CopyAbilityId,
    { label: string; short: string; bg: string; fg: string; border: string }
  > = {
    fire: {
      label: 'Termo & Fluidos',
      short: 'FIRE',
      bg: '#FFF1E6',
      fg: '#C2410C',
      border: '#FDBA74',
    },
    hammer: {
      label: 'Sólidos & Materiais',
      short: 'HAMMER',
      bg: '#FCE8EC',
      fg: '#9D174D',
      border: '#F48CA5',
    },
    bubble: {
      label: 'Máquinas & Normas',
      short: 'WATER',
      bg: '#EFF6FF',
      fg: '#1D4ED8',
      border: '#93C5FD',
    },
    spark: {
      label: 'Circuitos & Máquinas',
      short: 'SPARK',
      bg: '#FEF9C3',
      fg: '#854D0E',
      border: '#FDE047',
    },
    plasma: {
      label: 'Potência & Proteção',
      short: 'PLASMA',
      bg: '#ECFDF5',
      fg: '#047857',
      border: '#6EE7B7',
    },
    doctor: {
      label: 'Controle & Mat.',
      short: 'DOCTOR',
      bg: '#F3E8FF',
      fg: '#6D28D9',
      border: '#C4B5FD',
    },
    scholar: {
      label: 'Português & Inglês',
      short: 'BEAM',
      bg: '#FEF3C7',
      fg: '#92400E',
      border: '#FCD34D',
    },
  };

  const item = meta[ability] ?? meta.scholar;
  const pad = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  const imgSize = size === 'sm' ? 16 : 20;
  const pngSrc = KIRBY_ABILITY_PNG_MAP[ability] ?? KIRBY_ABILITY_PNG_MAP.classic;

  return (
    <span
      style={{
        backgroundColor: item.bg,
        color: item.fg,
        borderColor: item.border,
      }}
      className={`inline-flex items-center gap-1.5 font-mono font-bold rounded-md border ${pad} shrink-0`}
    >
      <img
        src={pngSrc}
        alt={item.short}
        width={imgSize}
        height={imgSize}
        loading="eager"
        decoding="async"
        draggable={false}
        style={{ width: imgSize, height: imgSize }}
        className="object-contain select-none shrink-0"
      />
      <span>{showLabel ? item.label : item.short}</span>
    </span>
  );
};

export const WarpStarIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <img
    src="/kirby/warp-star.png"
    alt="Warp Star"
    width={size}
    height={size}
    loading="eager"
    decoding="async"
    draggable={false}
    style={{ width: size, height: size }}
    className={`object-contain select-none shrink-0 inline-block ${className}`}
  />
);

export const MaximTomatoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => (
  <img
    src="/kirby/maxim-tomato.png"
    alt="Maxim Tomato"
    width={size}
    height={size}
    loading="eager"
    decoding="async"
    draggable={false}
    style={{ width: size, height: size }}
    className={`object-contain select-none shrink-0 inline-block ${className}`}
  />
);

const BOSS_PNG_MAP: Record<'dedede' | 'metaknight' | 'galactaknight', { src: string; alt: string }> = {
  dedede: {
    src: '/kirby/boss-dedede.png',
    alt: 'King Dedede Oficial',
  },
  metaknight: {
    src: '/kirby/boss-metaknight.png',
    alt: 'Meta Knight Oficial',
  },
  galactaknight: {
    src: '/kirby/boss-galactaknight.png',
    alt: 'Galacta Knight Oficial',
  },
};

export const BossMascot: React.FC<{
  boss: 'dedede' | 'metaknight' | 'galactaknight';
  size?: number;
  className?: string;
}> = ({ boss, size = 56, className = '' }) => {
  const info = BOSS_PNG_MAP[boss] ?? BOSS_PNG_MAP.dedede;
  return (
    <img
      src={info.src}
      alt={info.alt}
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      draggable={false}
      style={{ width: size, height: size }}
      className={`object-contain select-none shrink-0 drop-shadow-xs ${className}`}
    />
  );
};
