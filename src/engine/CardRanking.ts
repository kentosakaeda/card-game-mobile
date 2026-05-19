import { CardValue, RoundPlay } from './types';

// 1(Ace) is strongest, 13(King) is weakest
// Rank: 13(King)=0, 2=1, 3=2, ..., 12=11, 1(Ace)=12
export function getEffectiveRank(value: CardValue): number {
  if (value === 1) return 12;
  if (value === 13) return 0;
  return value - 1;
}

export function resolveRound(plays: RoundPlay[]): string | null {
  let bestRank = -1;
  let winnerId: string | null = null;
  let tied = false;

  for (const play of plays) {
    const rank = getEffectiveRank(play.card.value);
    if (rank > bestRank) {
      bestRank = rank;
      winnerId = play.playerId;
      tied = false;
    } else if (rank === bestRank) {
      tied = true;
      winnerId = null;
    }
  }

  return tied ? null : winnerId;
}
