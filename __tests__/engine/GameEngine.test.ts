import { createGame, dealCards, playCard, isGameOver, getFinalRanking } from '../../src/engine/GameEngine';
import { PlayerDef } from '../../src/engine/types';

const playerDefs: PlayerDef[] = [
  { id: 'p1', name: 'Alice', kind: 'human' },
  { id: 'p2', name: 'Bob', kind: 'human' },
];

describe('GameEngine', () => {
  it('createGame initializes players with empty hands', () => {
    const state = createGame(playerDefs);
    expect(state.players).toHaveLength(2);
    expect(state.players[0].hand).toHaveLength(0);
    expect(state.phase).toBe('idle');
  });

  it('dealCards gives 13 cards to each player', () => {
    const state = dealCards(createGame(playerDefs));
    expect(state.players[0].hand).toHaveLength(13);
    expect(state.players[1].hand).toHaveLength(13);
    expect(state.phase).toBe('selecting');
  });

  it('playCard removes card from hand', () => {
    let state = dealCards(createGame(playerDefs));
    const cardId = state.players[0].hand[0].id;
    state = playCard(state, 'p1', cardId);
    expect(state.players[0].hand).toHaveLength(12);
  });

  it('round resolves when all players have played', () => {
    let state = dealCards(createGame(playerDefs));
    const card1 = state.players[0].hand[0].id;
    const card2 = state.players[1].hand[0].id;
    state = playCard(state, 'p1', card1);
    state = playCard(state, 'p2', card2);
    expect(state.phase).toBe('revealing');
    expect(state.roundHistory).toHaveLength(1);
  });

  it('isGameOver returns true when all hands are empty', () => {
    let state = dealCards(createGame(playerDefs));
    // Simulate all cards played
    state = {
      ...state,
      players: state.players.map((p) => ({ ...p, hand: [] })),
    };
    expect(isGameOver(state)).toBe(true);
  });

  it('getFinalRanking sorts by wonCards descending', () => {
    let state = createGame(playerDefs);
    state = {
      ...state,
      players: [
        { ...state.players[0], wonCards: [{ value: 1, id: 'a' }, { value: 2, id: 'b' }] },
        { ...state.players[1], wonCards: [{ value: 3, id: 'c' }] },
      ],
    };
    const ranking = getFinalRanking(state);
    expect(ranking[0].id).toBe('p1');
    expect(ranking[1].id).toBe('p2');
  });
});
