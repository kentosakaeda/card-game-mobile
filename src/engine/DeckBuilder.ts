import { Card, CardValue } from './types';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildDeck(playerCount: number): Card[][] {
  const cardsPerPlayer = 13;
  const allCards: Card[] = [];

  for (let p = 0; p < playerCount; p++) {
    for (let v = 1; v <= 13; v++) {
      allCards.push({ value: v as CardValue, id: `card-${v}-p${p}` });
    }
  }

  const shuffled = shuffleArray(allCards);
  const hands: Card[][] = [];

  for (let p = 0; p < playerCount; p++) {
    hands.push(shuffled.slice(p * cardsPerPlayer, (p + 1) * cardsPerPlayer));
  }

  return hands;
}
