import { getEffectiveRank, resolveRound } from '../../src/engine/CardRanking';
import { RoundPlay } from '../../src/engine/types';

function makePlay(playerId: string, value: number): RoundPlay {
  return { playerId, card: { value: value as any, id: `card-${value}` } };
}

describe('getEffectiveRank', () => {
  it('Ace(1) is the highest rank', () => {
    expect(getEffectiveRank(1)).toBeGreaterThan(getEffectiveRank(12));
  });

  it('King(13) is the lowest rank', () => {
    expect(getEffectiveRank(13)).toBeLessThan(getEffectiveRank(2));
  });

  it('normal cards rank by value', () => {
    expect(getEffectiveRank(5)).toBeGreaterThan(getEffectiveRank(4));
    expect(getEffectiveRank(12)).toBeGreaterThan(getEffectiveRank(2));
  });
});

describe('resolveRound', () => {
  it('Ace beats King', () => {
    const plays = [makePlay('p1', 1), makePlay('p2', 13)];
    expect(resolveRound(plays)).toBe('p1');
  });

  it('Ace beats normal card', () => {
    const plays = [makePlay('p1', 1), makePlay('p2', 12)];
    expect(resolveRound(plays)).toBe('p1');
  });

  it('2 beats King', () => {
    const plays = [makePlay('p1', 2), makePlay('p2', 13)];
    expect(resolveRound(plays)).toBe('p1');
  });

  it('higher normal card wins', () => {
    const plays = [makePlay('p1', 7), makePlay('p2', 5)];
    expect(resolveRound(plays)).toBe('p1');
  });

  it('tie returns null', () => {
    const plays = [makePlay('p1', 7), makePlay('p2', 7)];
    expect(resolveRound(plays)).toBeNull();
  });

  it('3-way partial tie returns null when 2 tied for highest', () => {
    const plays = [makePlay('p1', 7), makePlay('p2', 7), makePlay('p3', 3)];
    expect(resolveRound(plays)).toBeNull();
  });

  it('3-way unique values picks highest', () => {
    const plays = [makePlay('p1', 5), makePlay('p2', 9), makePlay('p3', 3)];
    expect(resolveRound(plays)).toBe('p2');
  });
});
