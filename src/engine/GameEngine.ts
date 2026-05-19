import { GameState, Player, PlayerDef, RoundPlay, RoundResult } from './types';
import { buildDeck } from './DeckBuilder';
import { resolveRound } from './CardRanking';

export function createGame(playerDefs: PlayerDef[]): GameState {
  const players: Player[] = playerDefs.map((def) => ({
    id: def.id,
    name: def.name,
    kind: def.kind,
    difficulty: def.difficulty,
    hand: [],
    wonCards: [],
  }));

  return {
    phase: 'idle',
    players,
    currentRound: 0,
    totalRounds: 13,
    currentPlays: [],
    roundHistory: [],
    winnerId: null,
  };
}

export function dealCards(state: GameState): GameState {
  const hands = buildDeck(state.players.length);
  const players = state.players.map((p, i) => ({
    ...p,
    hand: hands[i],
    wonCards: [],
  }));

  return { ...state, phase: 'selecting', players, currentRound: 1, currentPlays: [] };
}

export function playCard(
  state: GameState,
  playerId: string,
  cardId: string
): GameState {
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return state;

  const card = player.hand.find((c) => c.id === cardId);
  if (!card) return state;

  const alreadyPlayed = state.currentPlays.some((cp) => cp.playerId === playerId);
  if (alreadyPlayed) return state;

  const newPlay: RoundPlay = { playerId, card };
  const updatedPlayers = state.players.map((p) =>
    p.id === playerId ? { ...p, hand: p.hand.filter((c) => c.id !== cardId) } : p
  );

  const newState: GameState = {
    ...state,
    players: updatedPlayers,
    currentPlays: [...state.currentPlays, newPlay],
  };

  return resolveRoundIfReady(newState);
}

export function resolveRoundIfReady(state: GameState): GameState {
  if (state.currentPlays.length < state.players.length) return state;

  const winnerId = resolveRound(state.currentPlays);

  let updatedPlayers = state.players;
  if (winnerId) {
    updatedPlayers = state.players.map((p) =>
      p.id === winnerId
        ? { ...p, wonCards: [...p.wonCards, ...state.currentPlays.map((cp) => cp.card)] }
        : p
    );
  }

  const result: RoundResult = {
    round: state.currentRound,
    plays: state.currentPlays,
    winnerId,
  };

  return {
    ...state,
    phase: 'revealing',
    players: updatedPlayers,
    roundHistory: [...state.roundHistory, result],
  };
}

export function advanceRound(state: GameState): GameState {
  if (isGameOver(state)) {
    const winner = getFinalRanking(state)[0];
    return { ...state, phase: 'game_over', winnerId: winner.id, currentPlays: [] };
  }

  return {
    ...state,
    phase: 'selecting',
    currentRound: state.currentRound + 1,
    currentPlays: [],
  };
}

export function isGameOver(state: GameState): boolean {
  return state.players.every((p) => p.hand.length === 0);
}

export function getFinalRanking(state: GameState): Player[] {
  return [...state.players].sort((a, b) => b.wonCards.length - a.wonCards.length);
}
