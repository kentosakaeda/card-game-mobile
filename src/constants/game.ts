export const CARDS_PER_PLAYER = 13;
export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;

export const RANK_THRESHOLDS = {
  Bronze: 0,
  Silver: 200,
  Gold: 500,
  Platinum: 1000,
  Diamond: 2000,
  Master: 4000,
} as const;

export const ONLINE_POINTS = {
  first: 30,
  second: 15,
  third: 5,
  fourth: 0,
} as const;

export const CPU_THINK_DELAY_MS = { min: 600, max: 1200 };
export const REVEAL_DELAY_MS = 800;
export const COLLECT_DELAY_MS = 1200;
export const ROUND_END_DELAY_MS = 2000;
