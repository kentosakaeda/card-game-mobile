import { Card, CPUDifficulty, RoundResult } from './types';
import { getEffectiveRank } from './CardRanking';

function randomCard(hand: Card[]): Card {
  return hand[Math.floor(Math.random() * hand.length)];
}

function sortByRank(hand: Card[]): Card[] {
  return [...hand].sort((a, b) => getEffectiveRank(a.value) - getEffectiveRank(b.value));
}

export function selectCPUCard(
  hand: Card[],
  opponentHandSizes: number[],
  roundHistory: RoundResult[],
  difficulty: CPUDifficulty
): Card {
  if (difficulty === 'easy') {
    return randomCard(hand);
  }

  if (difficulty === 'medium') {
    const sorted = sortByRank(hand);
    const midIndex = Math.floor(sorted.length / 2);
    // Occasionally bluff with King (13) or play mid-rank card
    if (Math.random() < 0.2) return sorted[0]; // sacrifice weak card
    return sorted[midIndex] ?? sorted[0];
  }

  // Hard: play the weakest card that can still win (simplified optimal)
  const sorted = sortByRank(hand);
  const playedValues = new Set(
    roundHistory.flatMap((r) => r.plays.map((p) => p.card.value))
  );

  // Try to play lowest card that's likely to win
  for (const card of sorted) {
    const rank = getEffectiveRank(card.value);
    // If this card has a good rank and opponents may have weaker remaining cards
    if (rank >= 6) return card;
  }

  return sorted[sorted.length - 1]; // play strongest
}
